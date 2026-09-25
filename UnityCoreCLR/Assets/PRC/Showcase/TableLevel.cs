using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// The studio (an endless white floor that fades into the background) and a round table with
/// towers of boxes. Everything is sized from the robot's reach, so a desktop robot plays with
/// sugar cubes and a KR 800 with crates.
/// </summary>
public class TableLevel : MonoBehaviour
{
    public Material LitMaterial;
    public Color StudioColour = new Color(0.965f, 0.968f, 0.972f);
    public Color TableColour = new Color(0.8f, 0.83f, 0.87f);
    public Color[] BoxColours =
    {
        new Color(1f, 0.42f, 0.27f),  // coral
        new Color(1f, 0.74f, 0.2f),   // amber
        new Color(0.2f, 0.72f, 0.62f), // teal
        new Color(0.3f, 0.55f, 0.95f), // sky
        new Color(0.62f, 0.45f, 0.9f), // violet
    };
    [Range(3, 12)] public int Towers = 7;

    /// <summary>Height of the table top above the floor, in metres.</summary>
    public float Top { get; private set; }
    public float Radius { get; private set; }
    public float BoxSize { get; private set; }
    /// <summary>The height the tool sweeps at: halfway up the bottom row of boxes.</summary>
    public float SweepHeight => Top + BoxSize * 0.5f;
    public IReadOnlyList<Vector3> TowerPositions => towerPositions;
    public int BoxCount => boxes.Count;

    readonly List<Rigidbody> boxes = new List<Rigidbody>();
    readonly List<Vector3> towerPositions = new List<Vector3>();
    readonly List<Material> materials = new List<Material>();
    readonly List<Material> boxMaterials = new List<Material>();
    readonly List<Mesh> meshes = new List<Mesh>();
    PhysicsMaterial boxSurface;
    float reach;

    /// <summary>Builds floor, table and boxes for a robot with the given reach (metres).</summary>
    public void Build(float robotReach)
    {
        Clear();
        reach = robotReach;
        BoxSize = Mathf.Clamp(reach * 0.085f, 0.04f, 0.25f);
        Radius = reach * 0.74f; // the edge is about where a downward tool stops reaching
        Top = Mathf.Clamp(reach * 0.12f, 0.06f, 0.35f);

        // Floor and background share one colour and the fog fades the floor into it: the
        // classic endless photo studio.
        var floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
        floor.name = "Studio floor";
        floor.transform.SetParent(transform, false);
        floor.transform.localScale = Vector3.one * reach * 4f; // a plane primitive is 10 m wide
        floor.GetComponent<Renderer>().sharedMaterial = NewMaterial(StudioColour);

        // A round table: a smooth mesh to look at, a coarser one for the physics (convex
        // colliders allow at most 255 faces).
        var table = new GameObject("Table");
        table.transform.SetParent(transform, false);
        table.AddComponent<MeshFilter>().sharedMesh = TableMesh(Radius, Top, 96);
        table.AddComponent<MeshRenderer>().sharedMaterial = NewMaterial(TableColour);
        var tableCollider = table.AddComponent<MeshCollider>();
        tableCollider.sharedMesh = TableMesh(Radius, Top, 40);
        tableCollider.convex = true;

        var camera = Camera.main;
        if (camera != null)
        {
            camera.clearFlags = CameraClearFlags.SolidColor;
            camera.backgroundColor = StudioColour;
        }
        RenderSettings.fog = true;
        RenderSettings.fogMode = FogMode.Linear;
        RenderSettings.fogColor = StudioColour;
        RenderSettings.fogStartDistance = reach * 5f;
        RenderSettings.fogEndDistance = reach * 16f;

        boxSurface = new PhysicsMaterial("Box") { dynamicFriction = 0.45f, staticFriction = 0.6f, bounciness = 0.05f };
        foreach (var colour in BoxColours) boxMaterials.Add(NewMaterial(colour));
        ResetBoxes();
    }

    /// <summary>Stacks the towers again. The layout is the same every time, so runs compare.</summary>
    public void ResetBoxes()
    {
        foreach (var box in boxes) Destroy(box.gameObject);
        boxes.Clear();
        towerPositions.Clear();

        var random = new System.Random(7);
        for (int t = 0; t < Towers; t++)
        {
            float angle = (t + 0.5f) / Towers * Mathf.PI * 2f + (float)random.NextDouble() * 0.3f;
            float distance = Mathf.Lerp(0.36f, 0.58f, (float)random.NextDouble()) * reach;
            var foot = new Vector3(Mathf.Cos(angle) * distance, Top, Mathf.Sin(angle) * distance);
            towerPositions.Add(transform.TransformPoint(foot));

            int height = 2 + random.Next(3);
            for (int level = 0; level < height; level++)
            {
                float turn = (float)random.NextDouble() * 30f;
                AddBox(foot + Vector3.up * (BoxSize * (level + 0.5f) + 0.001f * level), turn, boxMaterials[(t + level) % boxMaterials.Count]);
            }
        }
    }

    /// <summary>Boxes that left the table: fallen below its top or off its edge.</summary>
    public int Cleared()
    {
        int cleared = 0;
        foreach (var box in boxes)
        {
            var p = transform.InverseTransformPoint(box.position);
            if (p.y < Top - BoxSize * 0.25f || new Vector2(p.x, p.z).magnitude > Radius) cleared++;
        }
        return cleared;
    }

    /// <summary>True once no box moves any more.</summary>
    public bool Settled()
    {
        foreach (var box in boxes)
            if (!box.IsSleeping() && box.linearVelocity.sqrMagnitude > 0.0004f) return false;
        return true;
    }

    void AddBox(Vector3 localPosition, float turn, Material material)
    {
        var box = GameObject.CreatePrimitive(PrimitiveType.Cube);
        box.name = "Box " + boxes.Count;
        box.transform.SetParent(transform, false);
        box.transform.SetLocalPositionAndRotation(localPosition, Quaternion.Euler(0f, turn, 0f));
        box.transform.localScale = Vector3.one * BoxSize;
        box.GetComponent<Renderer>().sharedMaterial = material;
        box.GetComponent<Collider>().sharedMaterial = boxSurface;

        var body = box.AddComponent<Rigidbody>();
        body.mass = 1f;
        body.linearDamping = 0.05f;
        body.angularDamping = 0.2f;
        body.interpolation = RigidbodyInterpolation.Interpolate;
        body.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic; // fast robot links
        body.maxDepenetrationVelocity = 2f;
        boxes.Add(body);
    }

    /// <summary>A closed cylinder standing on y = 0: smooth sides, flat top.</summary>
    Mesh TableMesh(float radius, float height, int segments)
    {
        var vertices = new List<Vector3>();
        var normals = new List<Vector3>();
        var triangles = new List<int>();
        for (int i = 0; i <= segments; i++)
        {
            float a = i * Mathf.PI * 2f / segments;
            var outward = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
            vertices.Add(outward * radius);
            vertices.Add(outward * radius + Vector3.up * height);
            normals.Add(outward);
            normals.Add(outward);
            if (i < segments)
            {
                int b = i * 2;
                triangles.AddRange(new[] { b, b + 1, b + 3, b, b + 3, b + 2 });
            }
        }
        int centre = vertices.Count;
        vertices.Add(Vector3.up * height);
        normals.Add(Vector3.up);
        for (int i = 0; i <= segments; i++)
        {
            float a = i * Mathf.PI * 2f / segments;
            vertices.Add(new Vector3(Mathf.Cos(a) * radius, height, Mathf.Sin(a) * radius));
            normals.Add(Vector3.up);
            if (i < segments) triangles.AddRange(new[] { centre, centre + 2 + i, centre + 1 + i });
        }
        var mesh = new Mesh { name = "Table" };
        mesh.SetVertices(vertices);
        mesh.SetNormals(normals);
        mesh.SetTriangles(triangles, 0);
        mesh.RecalculateBounds();
        meshes.Add(mesh);
        return mesh;
    }

    Material NewMaterial(Color colour)
    {
        var material = new Material(LitMaterial) { color = colour };
        materials.Add(material);
        return material;
    }

    void Clear()
    {
        foreach (Transform child in transform) Destroy(child.gameObject);
        foreach (var material in materials) Destroy(material);
        foreach (var mesh in meshes) Destroy(mesh);
        materials.Clear();
        boxMaterials.Clear();
        meshes.Clear();
        boxes.Clear();
    }

    void OnDestroy() => Clear();
}
