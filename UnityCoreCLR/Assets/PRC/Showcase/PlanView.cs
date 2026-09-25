using System.Collections.Generic;
using PRC.UnityClient;
using UnityEngine;
using Prc = PRC.GRPC;

/// <summary>
/// Pins and the planned tool path. The path is PRC's own simulation: the tool centre point of
/// every simulated sample. A PTP move therefore shows the curve the joints really make, not a
/// straight line, and every sample PRC flags (out of reach, collision) turns red.
/// </summary>
public class PlanView : MonoBehaviour
{
    public Material UnlitMaterial;
    public Color PathColour = new Color(0.12f, 0.45f, 0.95f);
    public Color AlarmColour = new Color(0.93f, 0.23f, 0.25f);

    readonly List<GameObject> parts = new List<GameObject>();
    Material pathMaterial, alarmMaterial;

    void Awake()
    {
        pathMaterial = new Material(UnlitMaterial) { color = PathColour };
        alarmMaterial = new Material(UnlitMaterial) { color = AlarmColour };
    }

    /// <summary>Draws the pins and, if there is one, PRC's planned path through them.</summary>
    public void Show(IReadOnlyList<Vector3> pins, IReadOnlyList<bool> reachable, Prc.SimulationResult plan, Transform robotFrame, TableLevel table)
    {
        Clear();
        float size = table.BoxSize;
        for (int i = 0; i < pins.Count; i++)
            AddPin(i, pins[i], reachable == null || i >= reachable.Count || reachable[i], size, table);

        if (plan == null || plan.SimulationResults.Count < 2) return;

        // One line per stretch of samples with the same alarm state.
        var points = new List<Vector3>();
        bool alarm = plan.SimulationResults[0].Alarm;
        foreach (var sample in plan.SimulationResults)
        {
            var point = robotFrame.TransformPoint(PrcConvert.ToUnity(sample.Position).position);
            if (sample.Alarm != alarm && points.Count > 0)
            {
                points.Add(point); // close the gap between the two stretches
                AddLine(points, alarm, size);
                points.Clear();
                alarm = sample.Alarm;
            }
            points.Add(point);
        }
        AddLine(points, alarm, size);
    }

    public void Clear()
    {
        foreach (var part in parts) Destroy(part);
        parts.Clear();
    }

    void AddPin(int index, Vector3 position, bool isReachable, float size, TableLevel table)
    {
        var material = isReachable ? pathMaterial : alarmMaterial;
        var head = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        head.name = "Pin " + (index + 1);
        head.transform.SetParent(transform, false);
        head.transform.position = position;
        head.transform.localScale = Vector3.one * size * 0.35f;
        head.GetComponent<Renderer>().sharedMaterial = material;
        head.GetComponent<Collider>().isTrigger = true; // clickable, but boxes pass through
        head.AddComponent<PinMarker>().Index = index;
        parts.Add(head);

        // A thin stake down to whatever is below the pin (table or floor).
        float ground = new Vector2(position.x, position.z).magnitude <= table.Radius ? table.Top : 0f;
        var stake = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        stake.name = "Stake " + (index + 1);
        stake.transform.SetParent(head.transform.parent, false);
        stake.transform.position = new Vector3(position.x, (position.y + ground) * 0.5f, position.z);
        stake.transform.localScale = new Vector3(size * 0.05f, (position.y - ground) * 0.5f, size * 0.05f);
        stake.GetComponent<Renderer>().sharedMaterial = material;
        Destroy(stake.GetComponent<Collider>());
        parts.Add(stake);
    }

    void AddLine(List<Vector3> points, bool alarm, float size)
    {
        if (points.Count < 2) return;
        var line = new GameObject(alarm ? "Path (PRC alarm)" : "Path").AddComponent<LineRenderer>();
        line.transform.SetParent(transform, false);
        line.useWorldSpace = true;
        line.positionCount = points.Count;
        line.SetPositions(points.ToArray());
        line.widthMultiplier = size * 0.09f;
        line.numCornerVertices = 2;
        line.numCapVertices = 2;
        line.sharedMaterial = alarm ? alarmMaterial : pathMaterial;
        line.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
        parts.Add(line.gameObject);
    }

    void OnDestroy()
    {
        Destroy(pathMaterial);
        Destroy(alarmMaterial);
    }
}
