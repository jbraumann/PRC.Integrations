using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UIElements;
using Prc = PRC.GRPC;

/// <summary>
/// The overlay, built in code with UI Toolkit (styles in Showcase.uss): the robot picker, the
/// score, the pin dock with its buttons, the generated robot program and the pin numbers.
/// </summary>
[RequireComponent(typeof(UIDocument))]
public class ShowcaseUI : MonoBehaviour
{
    public StyleSheet Style;

    ClearTheTable game;
    VisualElement root, pinLayer, drawer, errorCard, stars;
    Label robotName, robotDetail, connection, status, pinCount, cycleTime, programName, programCode, scoreValue, scoreDetail, errorTitle, errorDetail, banner;
    Button runButton, undoButton, clearButton, resetButton, demoButton, programButton, previousButton, nextButton, retryButton;
    readonly List<Label> pinLabels = new List<Label>();
    string programText = "", programFile = "";
    float bannerUntil;

    public void Bind(ClearTheTable owner)
    {
        game = owner;
        root = GetComponent<UIDocument>().rootVisualElement;
        root.Clear();
        root.styleSheets.Add(Style);
        root.pickingMode = PickingMode.Ignore;

        // Pin numbers sit below the cards. Full-screen containers ignore the mouse, so only
        // clicks on the cards count as clicks on the UI.
        pinLayer = Passive(Add(root, new VisualElement(), "layer"));

        var hud = Passive(Add(root, new VisualElement(), "hud"));
        var top = Passive(Add(hud, new VisualElement(), "top-row"));

        var brand = Add(top, new VisualElement(), "card", "brand");
        var brandRow = Add(brand, new VisualElement(), "row");
        Add(brandRow, new Label("PRC"), "badge");
        Add(brandRow, new Label("Clear the Table"), "title");
        var robotRow = Add(brand, new VisualElement(), "row", "robot-row");
        previousButton = Add(robotRow, new Button(() => game.ChangeRobot(-1)) { text = "‹" }, "button", "round");
        var names = Add(robotRow, new VisualElement(), "robot-names");
        robotName = Add(names, new Label("…"), "robot-name");
        robotDetail = Add(names, new Label(""), "meta");
        nextButton = Add(robotRow, new Button(() => game.ChangeRobot(+1)) { text = "›" }, "button", "round");
        connection = Add(brand, new Label("Connecting…"), "meta");

        var score = Add(top, new VisualElement(), "card", "score");
        Add(score, new Label("BOXES CLEARED"), "caption");
        scoreValue = Add(score, new Label("0"), "score-value");
        stars = Add(score, new VisualElement(), "row", "stars");
        for (int i = 0; i < 3; i++) Add(stars, new VisualElement(), "star");
        scoreDetail = Add(score, new Label("No run yet"), "meta");

        banner = Passive(Add(hud, new Label(""), "banner"));
        banner.style.display = DisplayStyle.None;

        var bottom = Passive(Add(hud, new VisualElement(), "bottom-row"));
        var dock = Add(bottom, new VisualElement(), "card", "dock");
        var dockRow = Add(dock, new VisualElement(), "row", "dock-row");
        var plan = Add(dockRow, new VisualElement(), "plan");
        pinCount = Add(plan, new Label("Pins 0"), "pins");
        cycleTime = Add(plan, new Label("PTP · click the table"), "meta");
        runButton = Add(dockRow, new Button(game.Run) { text = "Run" }, "button", "primary");
        undoButton = Add(dockRow, new Button(game.Undo) { text = "Undo" }, "button");
        clearButton = Add(dockRow, new Button(game.ClearPins) { text = "Clear pins" }, "button");
        resetButton = Add(dockRow, new Button(game.ResetTable) { text = "Reset table" }, "button");
        demoButton = Add(dockRow, new Button(game.Demo) { text = "Demo" }, "button");
        programButton = Add(dockRow, new Button(ToggleProgram) { text = "Program" }, "button");
        status = Add(dock, new Label(""), "status");

        drawer = Add(root, new VisualElement(), "card", "drawer");
        var drawerHead = Add(drawer, new VisualElement(), "row", "drawer-head");
        var titles = Add(drawerHead, new VisualElement(), "grow");
        Add(titles, new Label("ROBOT PROGRAM"), "caption");
        programName = Add(titles, new Label("Place pins to generate one"), "program-name");
        Add(drawerHead, new Button(ToggleProgram) { text = "×" }, "button", "round");
        var scroll = Add(drawer, new ScrollView(ScrollViewMode.VerticalAndHorizontal), "code-scroll");
        programCode = Add(scroll, new Label(""), "code");
        var drawerButtons = Add(drawer, new VisualElement(), "row", "drawer-buttons");
        Add(drawerButtons, new Button(CopyProgram) { text = "Copy" }, "button");
        Add(drawerButtons, new Button(SaveProgram) { text = "Save to Desktop" }, "button");
        drawer.style.display = DisplayStyle.None;
        UseMonospace(programCode);

        errorCard = Add(root, new VisualElement(), "card", "error");
        errorTitle = Add(errorCard, new Label(""), "error-title");
        errorDetail = Add(errorCard, new Label(""), "meta", "error-detail");
        retryButton = Add(errorCard, new Button(game.Retry) { text = "Retry" }, "button", "primary");
        errorCard.style.display = DisplayStyle.None;

        SetBusy(true);
    }

    public void SetConnection(string text) => connection.text = text;

    public void SetRobot(Prc.RobotPreset robot, string driver, int index, int count)
    {
        robotName.text = robot.Name;
        robotDetail.text = $"{index + 1} of {count} · driver {driver}";
    }

    public void SetStatus(string text, bool warning = false)
    {
        status.text = text;
        status.EnableInClassList("warning", warning);
    }

    public void SetBusy(bool busy)
    {
        foreach (var b in new[] { undoButton, clearButton, resetButton, demoButton, previousButton, nextButton })
            b.SetEnabled(!busy);
        if (busy) runButton.SetEnabled(false);
    }

    /// <summary>
    /// Shows PRC's answer for the current pins: cycle time, reach and the program. Without a
    /// plan (no pins, or PRC still planning) the last program stays in the Program panel.
    /// </summary>
    public void SetPlan(int pins, int maxPins, Prc.SimulationResult plan, int unreachable)
    {
        pinCount.text = $"Pins {pins} / {maxPins}";
        if (plan == null)
        {
            cycleTime.text = pins == 0 ? "PTP · click the table" : "PRC is planning…";
            cycleTime.RemoveFromClassList("warning");
            runButton.SetEnabled(false);
            return;
        }
        cycleTime.text = unreachable > 0
            ? $"{unreachable} pin{(unreachable > 1 ? "s" : "")} out of reach"
            : $"PTP · {plan.Time:0.0} s robot time";
        cycleTime.EnableInClassList("warning", unreachable > 0);
        runButton.SetEnabled(unreachable == 0);

        programFile = plan.Files.Count > 0 ? plan.Files[0].Name : "program.txt";
        programText = plan.Files.Count > 0 ? plan.Files[0].Content : plan.Code;
        programName.text = programFile;
        programCode.text = programText.Replace("\t", "    ");
    }

    public void ClearProgram()
    {
        programText = "";
        programFile = "";
        programName.text = "Place pins to generate one";
        programCode.text = "";
    }

    public void ShowScore(int cleared, int total, int runs, float robotTime)
    {
        scoreValue.text = $"{cleared} / {total}";
        int starCount = cleared >= total ? 3 : cleared >= total * 0.8f ? 2 : cleared >= total * 0.5f ? 1 : 0;
        for (int i = 0; i < 3; i++) stars[i].EnableInClassList("on", i < starCount);
        scoreDetail.text = runs == 0 ? "No run yet" : $"{runs} run{(runs > 1 ? "s" : "")} · {robotTime:0.0} s robot time";
    }

    public void ShowBanner(string text, float seconds = 3f)
    {
        banner.text = text;
        banner.style.display = DisplayStyle.Flex;
        bannerUntil = Time.unscaledTime + seconds;
    }

    public void ShowError(string title, string detail, bool canRetry = true)
    {
        errorTitle.text = title;
        errorDetail.text = detail;
        retryButton.style.display = canRetry ? DisplayStyle.Flex : DisplayStyle.None;
        errorCard.style.display = DisplayStyle.Flex;
    }

    public void HideError() => errorCard.style.display = DisplayStyle.None;

    /// <summary>Puts a numbered label above every pin.</summary>
    public void UpdatePinLabels(IReadOnlyList<Vector3> pins, IReadOnlyList<bool> reachable, Camera camera, float lift)
    {
        while (pinLabels.Count < pins.Count) pinLabels.Add(Passive(Add(pinLayer, new Label((pinLabels.Count + 1).ToString()), "pin-label")));
        for (int i = 0; i < pinLabels.Count; i++)
        {
            var label = pinLabels[i];
            bool visible = i < pins.Count && Vector3.Dot(camera.transform.forward, pins[i] - camera.transform.position) > 0f;
            label.style.display = visible ? DisplayStyle.Flex : DisplayStyle.None;
            if (!visible) continue;
            var p = RuntimePanelUtils.CameraTransformWorldToPanel(root.panel, pins[i] + Vector3.up * lift, camera);
            label.style.left = p.x - 14f;
            label.style.top = p.y - 36f;
            label.EnableInClassList("alarm", i < reachable.Count && !reachable[i]);
        }
    }

    /// <summary>True when the mouse is over a card, so the click is not meant for the scene.</summary>
    public bool IsPointerOverUI(Vector2 screenPosition)
    {
        if (root == null || root.panel == null) return false;
        var panelPosition = RuntimePanelUtils.ScreenToPanel(root.panel, new Vector2(screenPosition.x, Screen.height - screenPosition.y));
        return root.panel.Pick(panelPosition) != null;
    }

    void Update()
    {
        if (banner != null && banner.style.display == DisplayStyle.Flex && Time.unscaledTime > bannerUntil)
            banner.style.display = DisplayStyle.None;
    }

    public void ShowProgram() => drawer.style.display = DisplayStyle.Flex;

    void ToggleProgram() =>
        drawer.style.display = drawer.style.display == DisplayStyle.None ? DisplayStyle.Flex : DisplayStyle.None;

    void CopyProgram()
    {
        GUIUtility.systemCopyBuffer = programText;
        SetStatus("Program copied to the clipboard.");
    }

    void SaveProgram()
    {
        if (string.IsNullOrEmpty(programText)) return;
        try
        {
            var path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), programFile);
            File.WriteAllText(path, programText);
            SetStatus("Saved " + path);
        }
        catch (Exception e)
        {
            SetStatus("Could not save the program: " + e.Message, true);
        }
    }

    // A monospaced system font for the program, if the OS has one of these.
    static void UseMonospace(Label label)
    {
        foreach (var family in new[] { "Consolas", "Menlo", "DejaVu Sans Mono" })
        {
            try
            {
                var font = UnityEngine.TextCore.Text.FontAsset.CreateFontAsset(family, "Regular");
                if (font == null) continue;
                label.style.unityFontDefinition = new StyleFontDefinition(FontDefinition.FromSDFFont(font));
                return;
            }
            catch (Exception) { }
        }
    }

    static T Add<T>(VisualElement parent, T child, params string[] classes) where T : VisualElement
    {
        foreach (var c in classes) child.AddToClassList(c);
        parent.Add(child);
        return child;
    }

    static T Passive<T>(T element) where T : VisualElement
    {
        element.pickingMode = PickingMode.Ignore;
        return element;
    }
}
