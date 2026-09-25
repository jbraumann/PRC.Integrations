The PRC.Protos.dll simply contains the prc.proto file built for C# using the default settings: a netstandard2.1 class library that references the Google.Protobuf, Grpc.Core.Api and Grpc.Tools NuGet packages and includes prc.proto as a Protobuf item. Rebuild it after a proto change and copy the resulting DLL here.

The scripts additionally expect the Grpc.Net.Client and YetAnotherHttpHandler packages inside the Unity project, e.g. via NuGetForUnity.
