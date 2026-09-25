using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using Prc = PRC.GRPC;

namespace PRC.UnityClient
{
    /// <summary>
    /// PRC measures in millimetres in a right-handed, Z-up world; Unity in metres, left-handed
    /// and Y-up. Swapping Y and Z converts one into the other (and mirrors triangle winding).
    /// Every conversion between PRC.GRPC's types and Unity's goes through this class.
    /// </summary>
    public static class PrcConvert
    {
        const float MetresPerMillimetre = 0.001f;

        public static Vector3 ToUnity(Prc.Vector3 point) => new Vector3(point.X, point.Z, point.Y) * MetresPerMillimetre;

        public static Prc.Vector3 ToPrc(Vector3 point) => Vector(point.x * 1000f, point.z * 1000f, point.y * 1000f);

        /// <summary>
        /// A PRC frame as a Unity pose. PRC matrices keep the X, Y and Z axis in the first three
        /// rows and the origin (in mm) in the last one.
        /// </summary>
        public static Pose ToUnity(Prc.Matrix4x4 frame)
        {
            // The frame's PRC Y axis becomes Unity's forward (Z), its PRC Z axis Unity's up (Y).
            var forward = new Vector3(frame.M21, frame.M23, frame.M22);
            var up = new Vector3(frame.M31, frame.M33, frame.M32);
            var position = new Vector3(frame.M41, frame.M43, frame.M42) * MetresPerMillimetre;
            return new Pose(position, Quaternion.LookRotation(forward, up));
        }

        /// <summary>A PRC mesh colour ({A, R, G, B}, 0-255) as a Unity colour; grey when unset.</summary>
        public static Color32 ToUnity(Prc.Int4 argb) =>
            argb == null ? new Color32(200, 200, 200, 255) : new Color32((byte)argb.Y, (byte)argb.Z, (byte)argb.W, (byte)argb.X);

        public static Prc.Int4 ToPrc(Color32 colour) => new Prc.Int4 { X = colour.a, Y = colour.r, Z = colour.g, W = colour.b };

        /// <summary>
        /// One Unity mesh from several PRC meshes, one submesh each: PRC colours whole meshes,
        /// so every submesh gets its own material.
        /// </summary>
        public static Mesh ToUnityMesh(IList<Prc.Mesh> meshes, string name)
        {
            var vertices = new List<Vector3>();
            var normals = new List<Vector3>();
            var submeshes = new List<List<int>>();
            bool allHaveNormals = true;

            foreach (var mesh in meshes)
            {
                int first = vertices.Count;
                foreach (var v in mesh.Vertices) vertices.Add(ToUnity(v));
                if (mesh.Normals.Count == mesh.Vertices.Count)
                    foreach (var n in mesh.Normals) normals.Add(new Vector3(n.X, n.Z, n.Y));
                else
                    allHaveNormals = false;

                // Faces are quads (x, y, z, w) or triangles (z == w). Mirroring Y and Z reverses
                // the winding, so the triangle (a, b, c) is written as (a, c, b).
                var triangles = new List<int>(mesh.Faces.Count * 6);
                foreach (var f in mesh.Faces)
                {
                    triangles.Add(first + f.X); triangles.Add(first + f.Z); triangles.Add(first + f.Y);
                    if (f.W != f.Z) { triangles.Add(first + f.X); triangles.Add(first + f.W); triangles.Add(first + f.Z); }
                }
                submeshes.Add(triangles);
            }

            var result = new Mesh { name = name };
            if (vertices.Count > 65535) result.indexFormat = IndexFormat.UInt32;
            result.SetVertices(vertices);
            result.subMeshCount = submeshes.Count;
            for (int i = 0; i < submeshes.Count; i++) result.SetTriangles(submeshes[i], i, false);
            if (allHaveNormals) result.SetNormals(normals); else result.RecalculateNormals();
            result.RecalculateBounds();
            return result;
        }

        /// <summary>A frame for PRC from an origin and two axes, all in PRC coordinates (mm).</summary>
        public static Prc.CartesianPosition Frame(Prc.Vector3 origin, Prc.Vector3 xAxis, Prc.Vector3 yAxis) =>
            new Prc.CartesianPosition { Cs = new Prc.CoordinateSystem { Origin = origin, XAxis = xAxis, YAxis = yAxis } };

        public static Prc.Vector3 Vector(float x, float y, float z) => new Prc.Vector3 { X = x, Y = y, Z = z };
    }
}
