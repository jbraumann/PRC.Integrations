using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Prc = PRC.GRPC;

namespace PRC.UnityClient
{
    /// <summary>
    /// What a client needs to know about PRC's presets and drivers that the server does not
    /// tell it: which offline driver goes with a robot, how its posture codes read, the unit of
    /// its PTP speed, where its start position lives and how its programs pick a tool.
    /// </summary>
    public static class PrcPresets
    {
        /// <summary>Each vendor's offline program generator (Sunrise for the seven-axis LBR iiwa).</summary>
        public static string OfflineDriver(Prc.RobotPreset robot)
        {
            if (robot.Solver == "KUKA.KUKA_7DOF") return "KUKA.KUKA_Sunrise_Driver";
            switch (robot.Vendor)
            {
                case "KUKA": return "KUKA.KSS_KRL_Driver";
                case "ABB": return "ABB.ABB_RAPID_Driver";
                case "UR": return "UR.UR_Driver";
                case "FANUC": return "FANUC.FANUC_LS_Driver";
                case "NEURA": return "NEURA.NEURA_SIM_Driver";
                case "IGUS": return "IGUS.IGUS_Driver";
                default: return null;
            }
        }

        /// <summary>
        /// The usual arm configuration (in front, elbow up, wrist down) in the vendor's posture
        /// notation. On a UR that is "001": an empty posture is the solver's default branch,
        /// which on a UR bends the elbow down, below a target on the robot's own level.
        /// </summary>
        public static string FrontElbowUp(string vendor) => vendor == "ABB" ? "0" : vendor == "UR" ? "001" : "010";

        /// <summary>
        /// A PTP speed of <paramref name="percent"/> in the unit the vendor's driver reads:
        /// percent of the axes' maximum; mm/s of the tool for ABB, whose simulation times a joint
        /// move by the tool's path; rad/s of the leading joint for UR (URScript's movej v).
        /// </summary>
        public static float PtpSpeed(string vendor, float percent, IEnumerable<float> axisSpeedsDegPerSecond)
        {
            switch (vendor)
            {
                case "ABB": return percent * 50f; // 100 % = 5000 mm/s, faster than any arm moves
                case "UR": return percent / 100f * axisSpeedsDegPerSecond.Max() * (float)Math.PI / 180f;
                default: return percent;
            }
        }

        /// <summary>
        /// The driver's start position in degrees (settings AxisStartA1…, FANUC AxisStartJ1…),
        /// all zero without one. Not every driver moves there on its own (UR and NEURA do not),
        /// so a task that should start there begins with an axis move to it.
        /// </summary>
        public static float[] StartPosition(Prc.Settings settings, int axisCount)
        {
            var axes = new float[axisCount];
            for (int i = 0; i < axisCount; i++)
            {
                if (!settings.SettingsDictionary.TryGetValue("AxisStartA" + (i + 1), out var value))
                    settings.SettingsDictionary.TryGetValue("AxisStartJ" + (i + 1), out value);
                float.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out axes[i]);
            }
            return axes;
        }

        /// <summary>KRL and LS programs select their tool by number, the others by name.</summary>
        public static string ToolVariable(string vendor, int number) =>
            vendor == "KUKA" || vendor == "FANUC" ? number.ToString(CultureInfo.InvariantCulture) : "";
    }
}
