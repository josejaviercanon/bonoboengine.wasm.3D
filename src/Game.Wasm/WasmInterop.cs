using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using Game.Engine.ECS;

namespace Game.Wasm;

[SupportedOSPlatform("browser")]
public static partial class WasmInterop
{
    private static readonly Dictionary<string, PinnedRenderBuffer> _buffers = new();

    internal static void Initialize()
    {
    }

    internal static void RegisterBuffer(string eventName, PinnedRenderBuffer buffer)
    {
        _buffers[eventName] = buffer;
    }

    internal static void UnregisterBuffer(string eventName)
    {
        if (_buffers.TryGetValue(eventName, out var buffer))
        {
            buffer.Dispose();
            _buffers.Remove(eventName);
        }
    }

    internal static void Notify(string eventName)
    {
        if (_buffers.TryGetValue(eventName, out var buffer))
            NotifyRender(eventName, (int)buffer.Ptr, buffer.FloatCount);
    }

    [JSImport("notifyRender", "WasmInterop")]
    internal static partial void NotifyRender(string eventName, int bufferPtr, int floatCount);

    [JSExport]
    internal static int GetBufferPtr(string eventName)
    {
        return _buffers.TryGetValue(eventName, out var b) ? (int)b.Ptr : 0;
    }

    [JSExport]
    internal static int GetBufferLen(string eventName)
    {
        return _buffers.TryGetValue(eventName, out var b) ? b.FloatCount : 0;
    }
}