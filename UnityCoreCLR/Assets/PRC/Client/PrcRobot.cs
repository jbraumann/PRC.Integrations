using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Net.Client;
using UnityEngine;
using Prc = PRC.GRPC;

namespace PRC.UnityClient
{
    /// <summary>
    /// A PRC robot in the scene. Through the PRC.GRPC service it sets a robot up on a PRC server,
    /// builds it from the geometry the server sends (one GameObject per link, each a kinematic
    /// rigidbody carrying PRC's convex collision hulls, so the robot pushes whatever physics
    /// objects it meets), plans tasks and plays them straight from PRC's simulation. This
    /// GameObject is the robot's world frame (PRC's origin): move or turn it to place the robot.
    /// Destroying it releases the robot on the server.
    /// </summary>
    public class PrcRobot : MonoBehaviour
    {
        [Tooltip("Lit material the link colours are applied to (one copy per colour).")]
        public Material LitMaterial;

        /// <summary>The PRC.GRPC service, for every call not wrapped here (DescribeLibrary, variables, …).</summary>
        public Prc.ParametricRobotControlService.ParametricRobotControlServiceClient Service { get; private set; }

        /// <summary>The robot's id on the server, from its setup.</summary>
        public string Id { get; private set; }

        /// <summary>The driver's settings from the setup; every plan sends them back, so change them here.</summary>
        public Prc.Settings Settings { get; private set; }

        /// <summary>The robot as the server resolved it: links, axis centres, speeds and ranges, flange and root frame.</summary>
        public Prc.CustomRobot Definition => robotData?.CustomRobot;

        /// <summary>How far the robot reaches in metres: shoulder offset, upper arm, elbow to flange.</summary>
        public float Reach { get; private set; }

        public bool IsPlaying => motion != null;

        readonly List<Rigidbody> links = new List<Rigidbody>();
        readonly List<Mesh> meshes = new List<Mesh>();
        readonly Dictionary<uint, Material> materials = new Dictionary<uint, Material>();
        GrpcChannel channel;
        CancellationTokenSource lifetime;
        Prc.Robot robotData;
        LiveMotion motion;
        Pose[] poses = new Pose[0];

        // ---------------------------------------------------------------- server

        /// <summary>
        /// Connects to a PRC server. Throws <see cref="PrcNotSupportedException"/> where PRC cannot
        /// run (<see cref="PrcChannel.IsSupported"/>), an RpcException when nobody answers.
        /// </summary>
        public async Task ConnectAsync(string address = PrcChannel.DefaultAddress)
        {
            Release();
            channel = PrcChannel.Open(address);
            Service = new Prc.ParametricRobotControlService.ParametricRobotControlServiceClient(channel);
            await Service.SendPingAsync(new Prc.Ping { Payload = "PRC for Unity" });
        }

        /// <summary>
        /// Sets a robot up (a preset class or a custom robot, its driver, tools and base) and
        /// reads back what the server made of it: <see cref="Definition"/>, <see cref="Settings"/>,
        /// <see cref="Reach"/>. With <paramref name="build"/> the robot appears in the scene. The
        /// server keeps it while its feedback stream is open, which this robot holds until the
        /// next setup or until it is destroyed.
        /// </summary>
        public async Task SetupAsync(string clientId, Prc.Robot robot, bool build = true)
        {
            Stop();
            var reply = await Service.SetupRobotAsync(new Prc.SetupRobotRequest { ClientId = clientId, SoftwareVersion = "PRC for Unity", RobotSetup = robot });
            if (string.IsNullOrEmpty(reply.Id)) throw new PrcException(reply.Status);
            Id = reply.Id;
            Settings = reply.RobotSettings;
            KeepAlive();

            var data = await Service.GetRobotDataAsync(new Prc.GetRobotDataRequest { Id = Id });
            if (data.Status != "OK") throw new PrcException(data.Status);
            robotData = data.RobotData;

            Vector3 At(Prc.Vector3 v) => new Vector3(v.X, v.Y, v.Z);
            var shoulder = At(Definition.AxisCenter[1]);
            var elbow = At(Definition.AxisCenter[2]);
            var flange = new Vector3(Definition.FlangeCs.M41, Definition.FlangeCs.M42, Definition.FlangeCs.M43);
            Reach = (new Vector2(shoulder.x, shoulder.y).magnitude + Vector3.Distance(shoulder, elbow) + Vector3.Distance(elbow, flange)) * 0.001f;

            if (build) Build();
        }

        /// <summary>Simulates a task and generates its program. The robot keeps it for <see cref="ShowAsync"/> and <see cref="PlayAsync"/>.</summary>
        public async Task<Prc.SimulationResult> PlanAsync(Prc.Task task)
        {
            var reply = await Service.AddRobotTaskAsync(new Prc.AddRobotTaskRequest { Id = Id, RobotTask = task, RobotSettings = Settings });
            return reply.SimulationResultData ?? throw new PrcException(reply.Status);
        }

        /// <summary>Poses the robot at a moment of its plan (0 = start, 1 = end).</summary>
        public async Task ShowAsync(float normalized)
        {
            Stop();
            SetPose(await StateAt(normalized));
        }

        /// <summary>
        /// Plays the robot's plan straight from PRC's simulation: every physics step, the links
        /// move to where PRC puts them at that moment, requested a few steps ahead. The physics
        /// engine hands their momentum on to whatever they hit. Completes when the motion is
        /// over or <see cref="Stop"/> ends it.
        /// </summary>
        public async Task PlayAsync(float duration)
        {
            Stop();
            var run = new LiveMotion(this, duration, Time.fixedDeltaTime);
            try
            {
                await run.Ready; // the first poses are in, so the robot starts without a hitch
                motion = run;
                await run.Finished;
            }
            finally
            {
                if (motion == run) motion = null;
                run.Dispose();
            }
        }

        public void Stop()
        {
            motion?.Dispose();
            motion = null;
        }

        async Task<Prc.RobotState> StateAt(float normalized)
        {
            var request = new Prc.GetSimulatedRobotStateRequest { Id = Id, NormalizedState = normalized, OmitVariables = true };
            var state = await Service.GetSimulatedRobotStateAsync(request).ResponseAsync.ConfigureAwait(false);
            if (state.RobotTransformations.Count == 0) throw new PrcException("PRC sent no robot state: " + state.ConnectionFeedback);
            return state;
        }

        /// <summary>
        /// PRC keeps a robot set up only while its feedback stream (SubscribeRobotFeedback) is
        /// open, and removes it when the stream ends: when this robot is destroyed, the
        /// application quits or crashes. The stream only carries a heartbeat a second.
        /// </summary>
        void KeepAlive()
        {
            lifetime?.Cancel();
            var stream = lifetime = new CancellationTokenSource();
            var request = new Prc.SubscribeRobotFeedbackRequest { Id = Id };
            _ = Task.Run(async () =>
            {
                try
                {
                    using (var feedback = Service.SubscribeRobotFeedback(request, cancellationToken: stream.Token))
                        while (await feedback.ResponseStream.MoveNext(stream.Token).ConfigureAwait(false)) { }
                }
                catch (Exception) when (stream.IsCancellationRequested) { } // a newer setup, or released
                catch (Exception e) { Debug.LogWarning($"[PRC] The feedback stream of {request.Id} ended: {e.Message}"); }
            });
        }

        void Release()
        {
            Stop();
            lifetime?.Cancel();
            channel?.Dispose(); // closes the connection: the server removes the robot
            channel = null;
        }

        void OnDestroy()
        {
            Release();
            foreach (var mesh in meshes) Destroy(mesh);
            foreach (var material in materials.Values) Destroy(material);
        }

        // ---------------------------------------------------------------- scene

        /// <summary>
        /// Creates one GameObject per link from the server's robot data, each a kinematic
        /// rigidbody with PRC's collision hulls, and mounts the tools on the last link.
        /// </summary>
        public void Build()
        {
            Clear();
            for (int i = 0; i < Definition.Geometry.Count; i++)
            {
                var link = new GameObject("Link " + i);
                link.transform.SetParent(transform, false);
                AddGeometry(link, Definition.Geometry[i], "Link " + i);

                var body = link.AddComponent<Rigidbody>();
                body.isKinematic = true;
                body.interpolation = RigidbodyInterpolation.Interpolate;
                body.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
                links.Add(body);
            }
            poses = new Pose[links.Count];

            // Tools are modelled in flange coordinates; the flange frame of the geometry pose,
            // where every link frame is the identity, mounts them on the last link.
            var flange = PrcConvert.ToUnity(Definition.FlangeCs);
            foreach (var tool in robotData.ToolDictionary.Values)
            {
                if (tool.ToolGeometry == null || links.Count == 0) continue;
                var mount = new GameObject("Tool " + tool.ToolId);
                mount.transform.SetParent(links[links.Count - 1].transform, false);
                mount.transform.SetLocalPositionAndRotation(flange.position, flange.rotation);
                AddGeometry(mount, tool.ToolGeometry, "Tool " + tool.ToolId);
            }
        }

        /// <summary>Poses the robot at once with the link frames of a PRC robot state.</summary>
        public void SetPose(Prc.RobotState state)
        {
            var frames = state.RobotTransformations[0].Transformation;
            for (int i = 0; i < links.Count && i < frames.Count; i++)
            {
                var pose = PrcConvert.ToUnity(frames[i]);
                var link = links[i].transform;
                link.SetLocalPositionAndRotation(pose.position, pose.rotation);
                links[i].position = link.position; // teleport, no interpolation from the old pose
                links[i].rotation = link.rotation;
            }
        }

        void FixedUpdate()
        {
            if (motion == null || !motion.TryNext(poses)) return; // PRC has not answered yet: wait a step

            // MovePosition/MoveRotation give the kinematic links a velocity, so the physics
            // engine hands their momentum on to everything they hit.
            for (int i = 0; i < links.Count; i++)
            {
                links[i].MovePosition(transform.TransformPoint(poses[i].position));
                links[i].MoveRotation(transform.rotation * poses[i].rotation);
            }
        }

        void AddGeometry(GameObject owner, Prc.PolyMesh geometry, string name)
        {
            if (geometry.Meshes.Count > 0)
            {
                var mesh = PrcConvert.ToUnityMesh(geometry.Meshes, name);
                meshes.Add(mesh);
                owner.AddComponent<MeshFilter>().sharedMesh = mesh;
                owner.AddComponent<MeshRenderer>().sharedMaterials = geometry.Meshes.Select(m => MaterialFor(PrcConvert.ToUnity(m.MeshColor))).ToArray();
            }

            // PRC's collision hulls (convex, at most 64 vertices each) become the physics shape.
            for (int h = 0; h < geometry.CollisionConvexHull.Count; h++)
            {
                var hull = new GameObject("Hull " + h);
                hull.transform.SetParent(owner.transform, false);
                var hullMesh = PrcConvert.ToUnityMesh(new[] { geometry.CollisionConvexHull[h] }, name + " hull " + h);
                meshes.Add(hullMesh);
                var collider = hull.AddComponent<MeshCollider>();
                collider.sharedMesh = hullMesh;
                collider.convex = true;
            }
        }

        Material MaterialFor(Color32 colour)
        {
            uint key = (uint)(colour.r << 24 | colour.g << 16 | colour.b << 8 | colour.a);
            if (!materials.TryGetValue(key, out var material))
            {
                material = new Material(LitMaterial) { color = colour, name = "PRC " + ColorUtility.ToHtmlStringRGB(colour) };
                materials.Add(key, material);
            }
            return material;
        }

        void Clear()
        {
            Stop();
            foreach (Transform child in transform) Destroy(child.gameObject);
            foreach (var mesh in meshes) Destroy(mesh);
            meshes.Clear();
            links.Clear();
        }

        /// <summary>
        /// The poses of a playing motion, one per physics step, fetched from PRC ahead of the
        /// physics: at most <see cref="Lead"/> requested or waiting. PRC's normalized state is
        /// time-based (0 = start of the task, 1 = its end).
        /// </summary>
        sealed class LiveMotion : IDisposable
        {
            const int Lead = 6;
            readonly Queue<Prc.RobotState> states = new Queue<Prc.RobotState>();
            readonly SemaphoreSlim room = new SemaphoreSlim(Lead);
            readonly CancellationTokenSource stop = new CancellationTokenSource();
            readonly TaskCompletionSource<bool> ready = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);
            readonly TaskCompletionSource<bool> finished = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);
            readonly int count;
            int taken;

            public Task Ready => ready.Task;
            public Task Finished => finished.Task;

            public LiveMotion(PrcRobot robot, float duration, float step)
            {
                count = Mathf.Max(2, Mathf.CeilToInt(duration / step) + 1);
                _ = Task.Run(() => Fetch(robot, duration, step));
            }

            async Task Fetch(PrcRobot robot, float duration, float step)
            {
                try
                {
                    for (int i = 0; i < count; i++)
                    {
                        await room.WaitAsync(stop.Token).ConfigureAwait(false);
                        float normalized = i == count - 1 || duration <= 0f ? 1f : Math.Min(i * step / duration, 1f);
                        var state = await robot.StateAt(normalized).ConfigureAwait(false);
                        lock (states) states.Enqueue(state);
                        if (i + 1 == Math.Min(Lead, count)) ready.TrySetResult(true);
                    }
                }
                catch (Exception e) when (!stop.IsCancellationRequested)
                {
                    ready.TrySetException(e);
                    finished.TrySetException(e);
                }
                catch (Exception) { } // stopped
            }

            /// <summary>The link poses of the next step, in order; false while PRC has not answered for it.</summary>
            public bool TryNext(Pose[] poses)
            {
                Prc.RobotState state;
                lock (states)
                {
                    if (states.Count == 0) return false;
                    state = states.Dequeue();
                }
                room.Release();
                var frames = state.RobotTransformations[0].Transformation;
                for (int i = 0; i < poses.Length && i < frames.Count; i++) poses[i] = PrcConvert.ToUnity(frames[i]);
                if (++taken == count) finished.TrySetResult(true);
                return true;
            }

            public void Dispose()
            {
                stop.Cancel();
                ready.TrySetResult(false);
                finished.TrySetResult(false);
            }
        }
    }

    /// <summary>An answer from PRC that the robot cannot use, with PRC's own message.</summary>
    public class PrcException : Exception
    {
        public PrcException(string message) : base(message) { }
    }

    /// <summary>PRC cannot run on this scripting backend; the message says what to do instead.</summary>
    public class PrcNotSupportedException : PrcException
    {
        public PrcNotSupportedException(string message) : base(message) { }
    }
}
