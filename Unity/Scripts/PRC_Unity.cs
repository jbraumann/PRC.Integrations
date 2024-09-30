using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using PRC.GRPC;
using UnityEngine.UI;
using TMPro;
using System;


public class PRC_Unity : MonoBehaviour
{
    // Start is called before the first frame update
    PRC_GRPC_Client client = new PRC_GRPC_Client();
    float simBuffer = -1.0f;
    bool hasInitialized = false;
    float simulationValue = 0.0f;
    public Slider simulationSlider;
    public TMP_Text Text;


    async void Start()
    {
        await client.SetupPRC();
        await client.AddCommands();
        hasInitialized = true;
    }
    
    // Update is called once per frame
    void Update()
    {
        if (client.state != null && client.state.ActualAxisPosition != null)
        {
            Text.text = "A01: " + client.state.ActualAxisPosition.AxisValues[0] + Environment.NewLine
                + "A02: " + client.state.ActualAxisPosition.AxisValues[1] + Environment.NewLine
                + "A03: " + client.state.ActualAxisPosition.AxisValues[2] + Environment.NewLine
                + "A04: " + client.state.ActualAxisPosition.AxisValues[3] + Environment.NewLine
                + "A05: " + client.state.ActualAxisPosition.AxisValues[4] + Environment.NewLine
                + "A06: " + client.state.ActualAxisPosition.AxisValues[5] + Environment.NewLine;

            List<UnityEngine.Matrix4x4> unityMatrices = new List<UnityEngine.Matrix4x4>();
            List<UnityEngine.Vector3> translations = new List<UnityEngine.Vector3>();
            List<UnityEngine.Quaternion> rotations = new List<UnityEngine.Quaternion>();

            for (global::System.Int32 i = 0; i < client.state.RobotTransformations[0].Transformation.Count; i++)
            {
                var matrix = client.state.RobotTransformations[0].Transformation[i];
                UnityEngine.Matrix4x4 unityMatrix = new UnityEngine.Matrix4x4();

                unityMatrix.m00 = matrix.M11;
                unityMatrix.m01 = matrix.M12;
                unityMatrix.m02 = matrix.M13;
                unityMatrix.m03 = matrix.M14; 
                unityMatrix.m10 = matrix.M21;
                unityMatrix.m11 = matrix.M22;
                unityMatrix.m12 = matrix.M23;
                unityMatrix.m13 = matrix.M24 ;
                unityMatrix.m20 = matrix.M31;
                unityMatrix.m21 = matrix.M32;
                unityMatrix.m22 = matrix.M33;
                unityMatrix.m23 = matrix.M34 ;
                unityMatrix.m30 = matrix.M41 / 1000f;
                unityMatrix.m31 = matrix.M42 / 1000f;
                unityMatrix.m32 = matrix.M43 / 1000f;
                unityMatrix.m33 = matrix.M44;

                UnityEngine.Matrix4x4 other = new UnityEngine.Matrix4x4();
                other.SetColumn(0, new Vector4(1, 0, 0, 0));
                other.SetColumn(1, new Vector4(0, 0, 1, 0));
                other.SetColumn(2, new Vector4(0, 1, 0, 0));
                other.SetColumn(3, new Vector4(0, 0, 0, 1));

                unityMatrix = unityMatrix.transpose;

                unityMatrix = other * unityMatrix;

                var gameobj = GameObject.Find("Robot").transform.GetChild(i).gameObject;

                gameobj.transform.rotation = Quaternion.LookRotation(unityMatrix.GetColumn(2), unityMatrix.GetColumn(1));

                gameobj.transform.position = unityMatrix.GetColumn(3);

            }

        }

        if (simBuffer != simulationSlider.value && hasInitialized)
        {
            simBuffer = simulationSlider.value;
            client.UpdateSimulation(simulationSlider.value);
        }
    }

    
}
