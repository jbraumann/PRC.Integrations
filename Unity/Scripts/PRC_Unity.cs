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

            foreach (var matrix in client.state.RobotTransformations[0].Transformation)
            {
                UnityEngine.Matrix4x4 unityMatrix = new UnityEngine.Matrix4x4();
                unityMatrix.SetRow(0, new UnityEngine.Vector4(matrix.M11, matrix.M12, matrix.M13, matrix.M14));
                unityMatrix.SetRow(1, new UnityEngine.Vector4(matrix.M21, matrix.M22, matrix.M23, matrix.M24));
                unityMatrix.SetRow(2, new UnityEngine.Vector4(matrix.M31, matrix.M32, matrix.M33, matrix.M34));
                unityMatrix.SetRow(3, new UnityEngine.Vector4(matrix.M41, matrix.M42, matrix.M43, matrix.M44));
                unityMatrices.Add(unityMatrix);
            }

            for (int i = 0; i < unityMatrices.Count; i++)
            {
                GameObject.Find("Robot").transform.GetChild(i).transform.position = unityMatrices[i].GetColumn(3);
                GameObject.Find("Robot").transform.GetChild(i).transform.rotation = unityMatrices[i].rotation;
            }
        }

        if (simBuffer != simulationSlider.value && hasInitialized)
        {
            simBuffer = simulationSlider.value;
            client.UpdateSimulation(simulationSlider.value);
        }
    }
}
