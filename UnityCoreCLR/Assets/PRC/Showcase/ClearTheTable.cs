using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PRC.UnityClient;
using UnityEngine;
using UnityEngine.InputSystem;
using Prc = PRC.GRPC;

/// <summary>
/// Clear the Table, a PRC showcase. Click the table or a box to place pins, and PRC plans a
/// point-to-point (PTP) motion through them for the robot you picked, with that robot's real
/// kinematics, reach and speed. Press Run and the robot swings through the pins, pushing the
/// boxes with its collision hulls. Clear the table in as few runs as you can.
///
/// This script is the game: pins, runs and score. The robot is a <see cref="PrcRobot"/>, which
/// does everything PRC (connection, setup, geometry, planning, playback), and
/// <see cref="PrcPresets"/> knows what each vendor's driver expects.
/// </summary>
public class ClearTheTable : MonoBehaviour
{
    [Header("PRC server")]
    public string ServerAddress = PrcChannel.DefaultAddress;
    [Tooltip("Preset robot the showcase starts with; DescribeLibrary lists them all.")]
    public string StartRobot = "KUKA.KUKA_KR6R700";

    [Header("Game")]
    [Range(1, 9)] public int MaxPins = 5;
    [Tooltip("PTP speed in percent of the robot's maximum.")]
    [Range(10, 100)] public int SpeedPercent = 100;
    [Tooltip("Blend through the pins (PRC's motion interpolation): the robot keeps its speed instead of stopping at every pin.")]
    public bool BlendThroughPins = true;

    [Header("Scene")]
    public PrcRobot Robot;
    public TableLevel Table;
    public PlanView Plan;
    public ShowcaseUI UI;
    public OrbitCamera CameraRig;

    const string ClientId = "unity-clear-the-table";
    const string ToolId = "pusher";

    List<Prc.RobotPreset> robots = new List<Prc.RobotPreset>();
    Dictionary<string, Prc.DriverPreset> drivers = new Dictionary<string, Prc.DriverPreset>();
    int robotIndex;
    Prc.RobotPreset preset; // the robot that is set up right now
    float[] home;           // the driver's start position; every run starts and ends there
    readonly Prc.Base world = new Prc.Base { BaseId = "0", BaseFrame = PrcConvert.Frame(PrcConvert.Vector(0f, 0f, 0f), PrcConvert.Vector(1f, 0f, 0f), PrcConvert.Vector(0f, 1f, 0f)) };

    readonly List<Vector3> pins = new List<Vector3>();
    readonly List<bool> reachable = new List<bool>();
    Prc.SimulationResult plan;
    int planVersion, plannedVersion;
    bool busy, running;
    int runs;
    float robotTime;

    // Command line options for players and automated checks.
    bool demoOnStart, quitAfterDemo, programAfterDemo;
    string screenshotPath;

    void Start()
    {
        Time.fixedDeltaTime = 1f / 120f; // robot links move fast; short physics steps keep boxes from tunnelling
        ReadCommandLine();
        UI.Bind(this);
        Connect();
    }

    // ---------------------------------------------------------------- connect and set up

    async void Connect()
    {
        SetBusy(true);
        UI.HideError();
        UI.SetConnection($"Connecting to {ServerAddress}…");
        try
        {
            await Robot.ConnectAsync(ServerAddress);

            // Which robots and drivers does this PRC installation offer, under which license?
            var library = await Robot.Service.DescribeLibraryAsync(new Prc.DescribeLibraryRequest());
            if (!this) return;
            var license = JsonUtility.FromJson<LicenseInfo>(string.IsNullOrEmpty(library.LicenseState) ? "{}" : library.LicenseState);
            drivers = library.Drivers.ToDictionary(d => d.RobotDriverClass);
            robots = library.Robots.Where(r => r.AxisCount >= 6 && IsAvailable(r, license)).ToList();
            if (robots.Count == 0) throw new PrcException("This PRC installation offers no robot for its license.");

            UI.SetConnection($"PRC {library.LibraryVersion} at {ServerAddress} · {license}");
            Debug.Log($"[PRC] Connected to {ServerAddress}: {robots.Count} robots, {license}");
            robotIndex = Mathf.Max(0, robots.FindIndex(r => r.PresetRobotClass == StartRobot));
            await LoadRobot();
            if (demoOnStart) { demoOnStart = false; await DemoFromCommandLine(); }
        }
        catch (PrcNotSupportedException e)
        {
            if (!this) return;
            Debug.LogWarning("[PRC] " + e.Message);
            UI.SetConnection("PRC needs the CoreCLR scripting backend");
            UI.ShowError("PRC needs a CoreCLR player", e.Message, canRetry: false);
            if (quitAfterDemo) Application.Quit(2);
        }
        catch (Exception e)
        {
            if (!this) return;
            Debug.LogWarning("[PRC] " + Message(e));
            UI.ShowError("Can't reach the PRC server", $"{ServerAddress} did not answer ({Message(e)}).\nStart the PRC server, then press Retry.");
            if (quitAfterDemo) Application.Quit(1);
        }
    }

    async Task LoadRobot()
    {
        SetBusy(true);
        ClearPinsSilently();
        UI.ClearProgram();
        preset = robots[robotIndex];
        string driver = PrcPresets.OfflineDriver(preset);
        UI.SetRobot(preset, drivers[driver].Name, robotIndex, robots.Count);
        UI.SetStatus($"Setting up the {preset.Name}…");
        try
        {
            // 1. Set the robot up to learn how far it reaches.
            var robot = new Prc.Robot { PresetRobotClass = preset.PresetRobotClass, RobotDriverClass = driver, FriendlyId = "Clear the Table", InitialBase = world };
            await Robot.SetupAsync(ClientId, robot, build: false);
            if (!this) return;

            // 2. The table is sized from the reach, the pusher from the boxes. The tool is part of
            //    the setup, so set the robot up again with it: PRC then plans for the puck, not
            //    the flange, and its own 3D view shows the pusher too.
            Table.Build(Robot.Reach);
            robot.ToolDictionary[ToolId] = Pusher.Create(ToolId, Robot.Reach * 1000f, Table.BoxSize * 1000f, PrcPresets.ToolVariable(preset.Vendor, 1));
            await Robot.SetupAsync(ClientId, robot);
            if (!this) return;
            // The showcase displays the program; the driver does not need to write it to disk.
            if (Robot.Settings.SettingsDictionary.ContainsKey("SaveFile")) Robot.Settings.SettingsDictionary["SaveFile"] = "False";

            // The robot's base plate stands on the table (the root frame is its base in PRC's world).
            float baseHeight = Robot.Definition.RootCs == null ? 0f : Robot.Definition.RootCs.M43 * 0.001f;
            Robot.transform.SetPositionAndRotation(new Vector3(0f, Table.Top - baseHeight, 0f), Quaternion.identity);

            // 3. Home is the driver's start position; a plan of just the home move poses the robot.
            home = PrcPresets.StartPosition(Robot.Settings, Robot.Definition.AxisCenter.Count);
            await Robot.PlanAsync(Motions());
            await Robot.ShowAsync(0f);
            if (!this) return;

            // Frame table and robot: tall robots (a cobot standing upright at home) need more room.
            float robotHeight = Robot.GetComponentsInChildren<Renderer>().Aggregate(0f, (top, r) => Mathf.Max(top, r.bounds.max.y)) - Table.Top;
            CameraRig.Frame(new Vector3(0f, Table.Top + Mathf.Max(Robot.Reach * 0.3f, robotHeight * 0.4f), 0f), Mathf.Max(Robot.Reach, robotHeight * 0.75f));
            runs = 0;
            robotTime = 0f;
            UI.ShowScore(0, Table.BoxCount, 0, 0f);
            UI.SetStatus("Click the table or a box to place a pin; PRC plans a PTP motion through your pins. Right-drag to orbit, scroll to zoom.");
            Debug.Log($"[PRC] {preset.Name} ready: driver {driver}, reach {Robot.Reach:0.00} m, {Robot.Definition.Geometry.Count} links");
        }
        catch (Exception e)
        {
            if (!this) return;
            UI.SetStatus($"PRC could not set up the {preset.Name}: {Message(e)}", true);
            Debug.LogWarning($"[PRC] {preset.PresetRobotClass}: {Message(e)}");
        }
        finally
        {
            if (this) SetBusy(false);
        }
    }

    // ---------------------------------------------------------------- pins and planning

    void Update()
    {
        var keyboard = Keyboard.current;
        if (keyboard != null)
        {
            if (keyboard.spaceKey.wasPressedThisFrame) Run();
            if (keyboard.backspaceKey.wasPressedThisFrame) Undo();
            if (keyboard.rKey.wasPressedThisFrame) ResetTable();
            if (keyboard.leftBracketKey.wasPressedThisFrame) ChangeRobot(-1);
            if (keyboard.rightBracketKey.wasPressedThisFrame) ChangeRobot(+1);
        }

        var mouse = Mouse.current;
        if (mouse != null && mouse.leftButton.wasPressedThisFrame && !busy && !running)
        {
            var position = mouse.position.ReadValue();
            if (!UI.IsPointerOverUI(position)) Click(position);
        }
    }

    void LateUpdate()
    {
        var camera = Camera.main;
        if (camera != null) UI.UpdatePinLabels(pins, reachable, camera, Table.BoxSize * 0.3f);
    }

    void Click(Vector2 screenPosition)
    {
        var hits = Physics.RaycastAll(Camera.main.ScreenPointToRay(screenPosition), 1000f, ~0, QueryTriggerInteraction.Collide);
        Array.Sort(hits, (a, b) => a.distance.CompareTo(b.distance));
        foreach (var hit in hits)
        {
            if (hit.collider.GetComponentInParent<PrcRobot>() != null) continue; // clicks pass through the robot

            var marker = hit.collider.GetComponent<PinMarker>();
            if (marker != null)
            {
                pins.RemoveAt(marker.Index);
                PinsChanged();
                return;
            }
            if (pins.Count >= MaxPins)
            {
                UI.SetStatus($"{MaxPins} pins per run. Press Run, or click a pin to remove it.", true);
                return;
            }
            // Pins sit at sweep height, halfway up the bottom row of boxes.
            pins.Add(new Vector3(hit.point.x, Table.SweepHeight, hit.point.z));
            PinsChanged();
            return;
        }
    }

    void PinsChanged()
    {
        reachable.Clear();
        for (int i = 0; i < pins.Count; i++) reachable.Add(true); // until PRC says otherwise
        Plan.Show(pins, reachable, null, Robot.transform, Table);
        UI.SetPlan(pins.Count, MaxPins, null, 0);
        Replan();
    }

    /// <summary>Asks PRC for a plan through the current pins; a newer request wins.</summary>
    async void Replan()
    {
        int version = ++planVersion;
        if (pins.Count == 0)
        {
            plan = null;
            plannedVersion = version;
            return;
        }
        UI.SetStatus("PRC is planning…");
        try
        {
            var result = await Robot.PlanAsync(Motions());
            if (!this || version != planVersion) return; // pins changed meanwhile, a newer plan follows

            plan = result;
            plannedVersion = version;
            reachable.Clear();
            for (int i = 0; i < pins.Count; i++) reachable.Add(IsReachable(result, PinId(i)));
            int unreachable = reachable.Count(r => !r);
            Plan.Show(pins, reachable, plan, Robot.transform, Table);
            UI.SetPlan(pins.Count, MaxPins, plan, unreachable);
            UI.SetStatus(unreachable > 0
                ? "Red pins are out of this robot's reach. Click them to remove them."
                : "The blue line is PRC's plan: a PTP move turns the joints, so the tool travels in curves. Press Run!",
                unreachable > 0);
        }
        catch (Exception e)
        {
            if (this && version == planVersion) UI.SetStatus("PRC could not plan this: " + Message(e), true);
        }
    }

    /// <summary>
    /// Home → pins → home as one PTP motion group. PRC answers with the simulation (every
    /// sample's joints, tool frame, time and alarms) and the program for the robot's controller.
    /// </summary>
    Prc.Task Motions()
    {
        float speed = PrcPresets.PtpSpeed(preset.Vendor, SpeedPercent, Robot.Definition.AxisSpeed);
        string posture = PrcPresets.FrontElbowUp(preset.Vendor);

        // "C_PTP" is PRC's cross-vendor blending token. The simulation carries the axes' speed
        // through the pins, and each program generator writes its own form: C_PTP in KRL,
        // the default zone in RAPID, the default blend radius in URScript and NEURA, the
        // default CNT in LS, smooth in iRC, blend in Sunrise.
        var group = new Prc.MotionGroup { MotionGroupType = Prc.MotionGroupType.Ptp, ToolId = ToolId, RobotBase = world, Interpolation = BlendThroughPins ? "C_PTP" : "" };
        group.Commands.Add(AxisMove(home, speed, "home"));
        for (int i = 0; i < pins.Count; i++)
        {
            var target = new Prc.CartesianTarget { Position = PinFrame(pins[i]), Posture = posture };
            target.Speed.Add(speed);
            group.Commands.Add(new Prc.MotionCommand { PtpMotion = new Prc.PTPMotion { Target = target, Data = new Prc.MetaData { Id = PinId(i) } } });
        }
        if (pins.Count > 0) group.Commands.Add(AxisMove(home, speed, "return"));

        var task = new Prc.Task { Name = "ClearTheTable", Type = Prc.TaskType.SimulateAndExecuteTask };
        task.Payload.Add(new Prc.TaskPayload { MotionGroupTask = group });
        return task;
    }

    static Prc.MotionCommand AxisMove(float[] axes, float speed, string id)
    {
        var target = new Prc.JointTarget();
        target.AxisValues.Add(axes);
        target.Speed.Add(speed);
        return new Prc.MotionCommand { AxisMotion = new Prc.AxisMotion { Target = target, Data = new Prc.MetaData { Id = id } } };
    }

    /// <summary>
    /// A pin as a PRC target frame, in millimetres relative to the robot's base. The tool
    /// points straight down, its X axis towards the robot: the wrist stays close to how the
    /// robot stands at home, so it hardly has to turn.
    /// </summary>
    Prc.CartesianPosition PinFrame(Vector3 pin)
    {
        var p = PrcConvert.ToPrc(Robot.transform.InverseTransformPoint(pin));
        var radial = new Vector2(p.X, p.Y).normalized;
        if (radial == Vector2.zero) radial = Vector2.right;
        return PrcConvert.Frame(p, PrcConvert.Vector(-radial.x, -radial.y, 0f), PrcConvert.Vector(-radial.y, radial.x, 0f));
    }

    static bool IsReachable(Prc.SimulationResult result, string pinId) =>
        !result.SimulationResults.Any(sample => sample.Id == pinId && sample.InterpolationFactor >= 1f && sample.Outofreach.Any(flag => flag));

    static string PinId(int index) => "pin" + (index + 1);

    // ---------------------------------------------------------------- run

    public void Run() => _ = RunAsync();

    async Task RunAsync()
    {
        if (busy || running || plan == null || pins.Count == 0) return;
        if (plannedVersion != planVersion) { UI.SetStatus("PRC is still planning…"); return; }
        if (reachable.Any(r => !r)) { UI.SetStatus("Remove the red pins first: they are out of reach.", true); return; }

        running = true;
        SetBusy(true);
        try
        {
            int before = Table.Cleared();
            UI.SetStatus($"Running {pins.Count} PTP move{(pins.Count > 1 ? "s" : "")}: {plan.Time:0.0} s of robot time.");
            await Robot.PlayAsync(plan.Time); // PRC keeps the task it planned last
            if (!this) return;
            float settleUntil = Time.time + 4f;
            while (Time.time < settleUntil && !Table.Settled()) { await Task.Yield(); if (!this) return; }

            runs++;
            robotTime += plan.Time;
            int cleared = Table.Cleared();
            UI.ShowScore(cleared, Table.BoxCount, runs, robotTime);
            int gained = cleared - before;
            UI.ShowBanner(cleared >= Table.BoxCount ? "Table cleared!" : gained > 0 ? $"+{gained} box{(gained > 1 ? "es" : "")}" : "Missed!");
            Debug.Log($"[PRC] Run {runs}: {pins.Count} pins, {plan.Time:0.00} s robot time, {cleared}/{Table.BoxCount} boxes cleared");
            ClearPinsSilently();
            UI.SetStatus(cleared >= Table.BoxCount
                ? $"All {Table.BoxCount} boxes in {runs} run{(runs > 1 ? "s" : "")}. Reset the table or try another robot."
                : "Place the next pins. The program of the last run stays in the Program panel.");
        }
        catch (Exception e)
        {
            if (this) UI.SetStatus("The run failed: " + Message(e), true);
        }
        finally
        {
            if (this)
            {
                running = false;
                SetBusy(false);
            }
        }
    }

    // ---------------------------------------------------------------- buttons

    public void Undo()
    {
        if (busy || running || pins.Count == 0) return;
        pins.RemoveAt(pins.Count - 1);
        PinsChanged();
    }

    public void ClearPins()
    {
        if (busy || running) return;
        ClearPinsSilently();
    }

    public void ResetTable()
    {
        if (busy || running) return;
        Table.ResetBoxes();
        runs = 0;
        robotTime = 0f;
        UI.ShowScore(0, Table.BoxCount, 0, 0f);
        ClearPinsSilently();
    }

    public void ChangeRobot(int step)
    {
        if (busy || running || robots.Count == 0) return;
        robotIndex = (robotIndex + step + robots.Count) % robots.Count;
        _ = LoadRobot();
    }

    public void Retry() => Connect();

    public void Demo() => _ = DemoAsync();

    /// <summary>
    /// Pins through every other tower, then a run. Pins PRC reports out of reach are dropped
    /// first, which is also how the demo adapts to small robots.
    /// </summary>
    async Task DemoAsync()
    {
        if (busy || running) return;
        ClearPinsSilently();
        var towers = Table.TowerPositions.OrderBy(t => Mathf.Atan2(t.z, t.x)).ToList();
        for (int i = 0; i < towers.Count && pins.Count < Mathf.Min(4, MaxPins); i += 2)
        {
            var outward = new Vector3(towers[i].x, 0f, towers[i].z).normalized;
            pins.Add(new Vector3(towers[i].x, Table.SweepHeight, towers[i].z) + outward * Table.BoxSize * 0.5f);
        }
        PinsChanged();
        for (int attempt = 0; attempt < 3; attempt++)
        {
            float timeout = Time.time + 10f;
            while (plannedVersion != planVersion && Time.time < timeout) { await Task.Yield(); if (!this) return; }
            if (!reachable.Any(r => !r)) break;
            for (int i = pins.Count - 1; i >= 0; i--)
                if (!reachable[i]) pins.RemoveAt(i);
            PinsChanged();
        }
        if (pins.Count > 0) await RunAsync();
    }

    void ClearPinsSilently()
    {
        pins.Clear();
        reachable.Clear();
        plan = null;
        plannedVersion = ++planVersion;
        Plan.Clear();
        UI.SetPlan(0, MaxPins, null, 0);
    }

    void SetBusy(bool value)
    {
        busy = value;
        UI.SetBusy(busy || running);
    }

    // ---------------------------------------------------------------- small helpers

    /// <summary>The license part of DescribeLibrary (PRC's serialized license state).</summary>
    [Serializable]
    public class LicenseInfo
    {
        public string Name;
        public bool IsCommunity;
        public override string ToString() => IsCommunity ? "Community license" : string.IsNullOrEmpty(Name) ? "licensed" : Name;
    }

    bool IsAvailable(Prc.RobotPreset robot, LicenseInfo license)
    {
        var driver = PrcPresets.OfflineDriver(robot);
        return driver != null && drivers.TryGetValue(driver, out var info) && !(license.IsCommunity && info.RequiresLicense);
    }

    static string Message(Exception e)
    {
        if (e is Grpc.Core.RpcException rpc) return string.IsNullOrEmpty(rpc.Status.Detail) ? rpc.StatusCode.ToString() : rpc.Status.Detail;
        return e.GetBaseException().Message;
    }

    void ReadCommandLine()
    {
        // -prcServer <address>, -prcRobot <class>, -prcDemo, -prcProgram (open the program after
        // the demo), -prcScreenshot <file.png>, -prcQuit
        var args = Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
        {
            string next = i + 1 < args.Length ? args[i + 1] : null;
            switch (args[i])
            {
                case "-prcRobot": if (next != null) StartRobot = next; break;
                case "-prcServer": if (next != null) ServerAddress = next; break;
                case "-prcDemo": demoOnStart = true; break;
                case "-prcProgram": programAfterDemo = true; break;
                case "-prcScreenshot": screenshotPath = next; break;
                case "-prcQuit": quitAfterDemo = true; break;
            }
        }
    }

    async Task DemoFromCommandLine()
    {
        await DemoAsync();
        if (!this) return;
        Debug.Log($"[PRC] Demo on {preset?.Name}: {Table.Cleared()}/{Table.BoxCount} boxes cleared, {robotTime:0.00} s robot time");
        if (programAfterDemo) UI.ShowProgram();
        if (!string.IsNullOrEmpty(screenshotPath))
        {
            ScreenCapture.CaptureScreenshot(screenshotPath);
            for (int i = 0; i < 10; i++) await Task.Yield();
        }
        if (quitAfterDemo) Application.Quit();
    }
}
