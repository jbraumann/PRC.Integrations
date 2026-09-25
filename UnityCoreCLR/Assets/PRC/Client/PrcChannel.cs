using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Grpc.Net.Client;
using Unity.Scripting.LifecycleManagement;
using UnityEngine;

namespace PRC.UnityClient
{
    /// <summary>
    /// The gRPC channel to a PRC server, and where one can run. gRPC needs an HTTP/2 client:
    /// .NET has one, so a player on Unity's CoreCLR scripting backend connects. Mono and IL2CPP
    /// have none, and the Unity 6.7 Editor's Play Mode runs on Mono.
    /// </summary>
    public static class PrcChannel
    {
        public const string DefaultAddress = "https://127.0.0.1:5001";

        /// <summary>True on Unity's CoreCLR scripting backend, the only one with an HTTP/2 client.</summary>
        public static bool IsSupported
        {
            get
            {
#if ENABLE_CORECLR
                return true;
#else
                return false;
#endif
            }
        }

        /// <summary>Why PRC cannot run here, and what to do instead.</summary>
        public static string NotSupportedReason
        {
            get
            {
                if (Application.isEditor)
                    return "Play Mode in this Unity Editor runs on Mono, which has no HTTP/2 client for gRPC. " +
                           "Build and run a player instead (File > Build And Run) with the CoreCLR scripting backend.";
#if ENABLE_IL2CPP
                const string backend = "IL2CPP";
#else
                const string backend = "Mono";
#endif
                return $"This player was built with the {backend} scripting backend, which has no HTTP/2 client for gRPC. " +
                       "Build it again with Player Settings > Other Settings > Scripting Backend set to CoreCLR.";
            }
        }

        /// <summary>Opens a channel to a PRC server. Throws <see cref="PrcNotSupportedException"/> where gRPC cannot run.</summary>
        public static GrpcChannel Open(string address = DefaultAddress)
        {
            if (!IsSupported) throw new PrcNotSupportedException(NotSupportedReason);
            return GrpcChannel.ForAddress(address, new GrpcChannelOptions
            {
                HttpHandler = new HttpClientHandler { ServerCertificateCustomValidationCallback = IsTrustedServer },
                DisposeHttpClient = true,     // disposing the channel closes the connection too
                MaxReceiveMessageSize = null, // robot geometry is a few megabytes
                MaxSendMessageSize = null,
            });
        }

        // The PRC server signs its TLS certificate with its own root CA and installs that CA in the
        // system store on its first start. Where the store does not know it (another machine),
        // the chain is accepted only if it ends in the PRC root below.
        static bool IsTrustedServer(HttpRequestMessage request, X509Certificate2 certificate, X509Chain chain, SslPolicyErrors errors)
        {
            if (errors == SslPolicyErrors.None) return true;
            if (errors != SslPolicyErrors.RemoteCertificateChainErrors || certificate == null) return false;

            using (var prcChain = new X509Chain())
            {
                prcChain.ChainPolicy.RevocationMode = X509RevocationMode.NoCheck;
                prcChain.ChainPolicy.VerificationFlags = X509VerificationFlags.AllowUnknownCertificateAuthority;
                prcChain.ChainPolicy.ExtraStore.Add(PrcRoot);
                if (!prcChain.Build(certificate)) return false;
                var root = prcChain.ChainElements[prcChain.ChainElements.Count - 1].Certificate;
                return root.Thumbprint == PrcRoot.Thumbprint;
            }
        }

        // "Parametric Robot Control CA" (Server/Certificates/PRCRootCertificate.pem), valid until 2054.
        [NoAutoStaticsCleanup] // immutable, safe to keep across Play Mode sessions
        static readonly X509Certificate2 PrcRoot = new X509Certificate2(System.Convert.FromBase64String(
            "MIIDbDCCAlSgAwIBAgIQepbGKh13s5ROLPfzImJVeTANBgkqhkiG9w0BAQsFADAmMSQwIgYDVQQDDBtQYXJhbWV0cmljIFJvYm90" +
            "IENvbnRyb2wgQ0EwIBcNMjQwOTI2MjA0MzQ0WhgPMjA1NDA5MjYyMDUzNDNaMCYxJDAiBgNVBAMMG1BhcmFtZXRyaWMgUm9ib3Qg" +
            "Q29udHJvbCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANE6wUXygZ5DlTiq5fcjp2QrGMaBYLdmLTcmrgtENWKg" +
            "DH1OLKzYj1duigKtQk/kLkTSqTs+sC82SlxrqLt0VVUIpUN5JIMRg8JBMBxxlmEgmz/1us5r9ESeq7JqMESocAF2x7mckrApColJ" +
            "uKPc0z+NO7Mlw0r967m2spi0QhUv630SlDjCRrHrXiCwqiNrgcnydydOq4AJTjVQCFMM6SUl5iyhhOZVLxPWu+kMo567GgOx8jhV" +
            "lPuya6Ui407tomc2FoZZuBIU+CGZyJ2WCD5rGgV/XFKQsR1HOW+3yj+7wvKsk+kk6GgD1t3caJ7QDIfa9C3D6mpgX/9ES6+Bk+EC" +
            "AwEAAaOBkzCBkDAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMBMC8GA1UdEQEB/wQlMCOCCWxv" +
            "Y2FsaG9zdIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAATAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBT+waeFNf4KPCd1gvZGzq7q" +
            "wWQKrzANBgkqhkiG9w0BAQsFAAOCAQEAu7BGN7eilyb2QjknMkyQoIEZDw5H7+PlpIr18/nlXCJqpVk4N6Zo5lv1Yrv1Lu30+ZJF" +
            "Rgmj9DGpx0yzmBxcqbwNcYcVn7baWlqzHUWM7fDIPNTbBbiyNE4m3LQ8n6IgBpGXIXDByZuMbulKgVSwpC/o+GWy8y9KiKE7/Erz" +
            "1sTktHaKye/nvqRbtioewCdDXZzkskHs6XKKtXLnucxZYBUcNGEISSTaE6iEMjzs1ZKXDT+fjrUj9/L08s0Ixy12VBs9dIKfQF6N" +
            "63gTmtHUYf5BvxGq7DccUulkzSc49InjPJSUTCs96VTu5O/ALkdCyu8bjTT/AtFEbHMv7oIOQg=="));
    }
}
