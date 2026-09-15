namespace Game.Engine.ECS;

/// <summary>
///     Co-located render path: encodes the signal into a pinned buffer and notifies the
///     host, which exposes the memory directly to the presentation layer (WASM heap view
///     or WebView2 shared buffer). No JSON, no per-entity interop calls.
/// </summary>
/// <typeparam name="TSignal">Batched render-signal record emitted by the simulation.</typeparam>
/// <typeparam name="T">Blittable scalar element type of the signal buffer.</typeparam>
public sealed class DirectRenderTransport<TSignal, T> : IRenderTransport<TSignal>
    where T : unmanaged
{
    private readonly string _eventName;
    private readonly Func<TSignal, int> _elementLength;
    private readonly Action<TSignal, Span<T>> _encode;
    private readonly PinnedRenderBuffer<T> _buffer;

    public DirectRenderTransport(
        string eventName,
        Func<TSignal, int> elementLength,
        Action<TSignal, Span<T>> encode,
        PinnedRenderBuffer<T> buffer)
    {
        _eventName = eventName;
        _elementLength = elementLength;
        _encode = encode;
        _buffer = buffer;
    }

    public event Action<TSignal>? OnSignal;

    public void Push(TSignal signal)
    {
        OnSignal?.Invoke(signal);
        var elementCount = _elementLength(signal);
        var span = _buffer.GetSpan(elementCount);
        _encode(signal, span);
        _buffer.Commit(_eventName);
    }
}
