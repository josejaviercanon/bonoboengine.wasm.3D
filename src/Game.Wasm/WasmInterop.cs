using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using Game.Engine.ECS;

namespace Game.Wasm;

/// <summary>
///     Browser-wasm interop bridge. Simulation logic and buffer ownership live in
///     <see cref="SimulationHost"/>/<c>Game.Engine</c>; this type only exposes the
///     low-frequency verbs to JavaScript and forwards committed buffer notifications
///     through <c>notifyRender</c>, which projects a typed array over the WASM heap.
/// </summary>
[SupportedOSPlatform("browser")]
public static partial class WasmInterop
{
    private static readonly SimulationHost _simHost = new(Notify);

    internal static void Initialize()
    {
    }

    [JSExport]
    internal static void ConnectGame(string game)
    {
        _simHost.Connect(game);
    }

    [JSExport]
    internal static void SetPaused(bool paused)
    {
        _simHost.SetPaused(paused);
    }

    /// <summary>
    ///     Receives <c>assets/config.bin</c> bytes fetched by the JS bootstrap. One-time,
    ///     low-frequency, primitive payload — never part of the per-frame path.
    /// </summary>
    [JSExport]
    internal static void LoadConfiguration([JSMarshalAs<JSType.Array<JSType.Number>>] byte[] data)
    {
        _simHost.LoadConfiguration(data);
    }

    [JSExport]
    internal static void SpawnEntity()
    {
        _simHost.SpawnTransform3D();
    }

    [JSExport]
    internal static void DespawnEntity()
    {
        _simHost.DespawnTransform3D();
    }

    /// <summary>Forwarded to JS after every committed buffer (scalar elements are always float64).</summary>
    private static void Notify(string eventName, nint bufferPtr, int elementCount)
    {
        // The WASM heap is a 32-bit linear memory, so the pointer fits the JSImport int contract.
        NotifyRender(eventName, (int)bufferPtr, elementCount);
    }

    [JSImport("notifyRender", "WasmInterop")]
    internal static partial void NotifyRender(string eventName, int bufferPtr, int elementCount);
}
