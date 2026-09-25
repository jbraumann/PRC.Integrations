using UnityEngine;
using UnityEngine.InputSystem;

/// <summary>Orbits the camera around the robot: right-drag turns, the wheel zooms.</summary>
public class OrbitCamera : MonoBehaviour
{
    public ShowcaseUI UI;
    public Vector3 Target;
    public float Distance = 3f;
    public float Yaw = -125f;
    public float Pitch = 26f;

    float minDistance = 0.5f, maxDistance = 20f;
    float smoothDistance, smoothYaw, smoothPitch;

    void Awake()
    {
        smoothDistance = Distance;
        smoothYaw = Yaw;
        smoothPitch = Pitch;
    }

    /// <summary>Frames a robot of the given reach standing at <paramref name="target"/>.</summary>
    public void Frame(Vector3 target, float reach)
    {
        Target = target;
        Distance = reach * 3.3f;
        minDistance = reach * 0.8f;
        maxDistance = reach * 8f;
        smoothDistance = Distance;
        var camera = GetComponent<Camera>();
        if (camera != null) camera.nearClipPlane = Mathf.Max(0.01f, reach * 0.02f);
    }

    void LateUpdate()
    {
        var mouse = Mouse.current;
        if (mouse != null && (UI == null || !UI.IsPointerOverUI(mouse.position.ReadValue())))
        {
            if (mouse.rightButton.isPressed)
            {
                var delta = mouse.delta.ReadValue();
                Yaw += delta.x * 0.25f;
                Pitch = Mathf.Clamp(Pitch - delta.y * 0.25f, 4f, 85f);
            }
            float scroll = mouse.scroll.ReadValue().y;
            if (scroll != 0f) Distance = Mathf.Clamp(Distance * (scroll > 0f ? 0.9f : 1.1f), minDistance, maxDistance);
        }

        float t = 1f - Mathf.Exp(-Time.unscaledDeltaTime * 12f);
        smoothDistance = Mathf.Lerp(smoothDistance, Distance, t);
        smoothYaw = Mathf.LerpAngle(smoothYaw, Yaw, t);
        smoothPitch = Mathf.Lerp(smoothPitch, Pitch, t);
        var rotation = Quaternion.Euler(smoothPitch, smoothYaw, 0f);
        transform.SetPositionAndRotation(Target - rotation * Vector3.forward * smoothDistance, rotation);
    }
}
