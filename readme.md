# Parametric Robot Control

![Parametric Robot Control](https://raw.githubusercontent.com/jbraumann/PRC.Integrations/refs/heads/main/prc_logo.webp)

Parametric Robot Control uses [gRPC](https://grpc.io/) to establish a communication between the client software (e.g. Grasshopper) and the server, where the robot is simulated, real-time control is established etc.
The communication is based on *.proto files, which can be translated into various programming languages.

#### Please refer to our (beta) [documentation](https://prc.robotsinarchitecture.org/) for more details.

Currently, you can find code samples to integrate Parametric Robot Control into the following platforms/programming languages
- Unity (Game engine, using C#)
- Blender (3D modeling, using Python)
- Javascript (does not require node.js)
- Adobe Illustrator (graphic design, builds upon Javascript)
- C# (both direct implementation and using our wrapper library)
- Python (also used in Blender)

These integrations provide a starting point for developers but do not constitute a full plugin, accessible to end-users, as we provide in Grasshopper. For any questions, please use the ["Discussions"](https://github.com/jbraumann/PRC.Integrations/discussions) tab above.

# Caution!

#### Our expertise lies in robot simulation, not necessarily in writing beautiful code. Please consider the code snippets to be proof-of-concept rather than best-practise - especially Python and Javascript code can be quite "hacky"!
We welcome suggestions on how to improve the code, as well as entirely new integrations.

Please use the "Discussions" tab above for feedback. You can also contact the developer at johannes@robotsinarchitecture.org

**Disclaimer:** This software is provided “as is” without any warranties or guarantees. The creators and developers of this software do not accept any liability for any damages or losses arising from its use.
