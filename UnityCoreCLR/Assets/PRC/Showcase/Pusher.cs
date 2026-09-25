using PRC.UnityClient;
using UnityEngine;
using Prc = PRC.GRPC;

/// <summary>
/// The showcase's tool: a stick with a puck, as a PRC tool. Its geometry is modelled in flange
/// coordinates (Z points away from the flange), its tool centre point sits in the middle of the
/// puck, and the same meshes go to PRC (which plans for the puck and shows it in its 3D view)
/// and, through the robot's data, into the scene.
/// </summary>
public static class Pusher
{
    /// <summary>A pusher sized for a robot of <paramref name="reachMm"/> and boxes of <paramref name="boxMm"/>.</summary>
    public static Prc.Tool Create(string toolId, float reachMm, float boxMm, string robotVariable)
    {
        float tcp = Mathf.Clamp(reachMm * 0.16f, 60f, 450f);
        float puckRadius = boxMm * 0.6f, puckHeight = boxMm * 0.7f;
        float stickRadius = Mathf.Max(6f, reachMm * 0.012f);
        float puckStart = tcp - puckHeight * 0.5f, puckEnd = tcp + puckHeight * 0.5f;

        var geometry = new Prc.PolyMesh { Name = "Pusher" };
        geometry.Meshes.Add(Cylinder(stickRadius, 0f, puckStart, 16, new Color32(58, 62, 70, 255)));
        geometry.Meshes.Add(Cylinder(puckRadius, puckStart, puckEnd, 32, new Color32(255, 186, 0, 255)));
        geometry.CollisionConvexHull.Add(Cylinder(stickRadius, 0f, puckStart, 8, default));
        geometry.CollisionConvexHull.Add(Cylinder(puckRadius, puckStart, puckEnd, 16, default));

        return new Prc.Tool
        {
            ToolId = toolId,
            ToolType = Prc.FrameType.Fixed,
            Tcp = PrcConvert.Frame(PrcConvert.Vector(0f, 0f, tcp), PrcConvert.Vector(1f, 0f, 0f), PrcConvert.Vector(0f, 1f, 0f)),
            ToolGeometry = geometry,
            ToolRobotVariable = robotVariable, // KRL and LS programs select their tool by number
        };
    }

    /// <summary>A closed cylinder along Z as a PRC mesh (mm, faces counter-clockwise from outside).</summary>
    static Prc.Mesh Cylinder(float radius, float z0, float z1, int segments, Color32 colour)
    {
        var mesh = new Prc.Mesh { MeshColor = PrcConvert.ToPrc(colour) };
        for (int end = 0; end < 2; end++)
            for (int i = 0; i < segments; i++)
            {
                float a = i * Mathf.PI * 2f / segments;
                mesh.Vertices.Add(PrcConvert.Vector(Mathf.Cos(a) * radius, Mathf.Sin(a) * radius, end == 0 ? z0 : z1));
                mesh.Normals.Add(PrcConvert.Vector(Mathf.Cos(a), Mathf.Sin(a), 0f));
            }
        for (int i = 0; i < segments; i++)
        {
            int next = (i + 1) % segments;
            mesh.Faces.Add(new Prc.Int4 { X = i, Y = next, Z = segments + next, W = segments + i });
        }
        for (int end = 0; end < 2; end++)
        {
            float z = end == 0 ? z0 : z1, normal = end == 0 ? -1f : 1f;
            int centre = mesh.Vertices.Count;
            mesh.Vertices.Add(PrcConvert.Vector(0f, 0f, z));
            mesh.Normals.Add(PrcConvert.Vector(0f, 0f, normal));
            for (int i = 0; i < segments; i++)
            {
                float a = i * Mathf.PI * 2f / segments;
                mesh.Vertices.Add(PrcConvert.Vector(Mathf.Cos(a) * radius, Mathf.Sin(a) * radius, z));
                mesh.Normals.Add(PrcConvert.Vector(0f, 0f, normal));
            }
            for (int i = 0; i < segments; i++)
            {
                int a = centre + 1 + i, b = centre + 1 + (i + 1) % segments;
                // Triangles repeat their last index (z == w).
                mesh.Faces.Add(end == 0 ? new Prc.Int4 { X = centre, Y = b, Z = a, W = a } : new Prc.Int4 { X = centre, Y = a, Z = b, W = b });
            }
        }
        return mesh;
    }
}
