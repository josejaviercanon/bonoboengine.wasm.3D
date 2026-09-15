using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Game.Engine.ECS;

/// <summary>
///     Zero-copy render buffer: a pinned managed array (<typeparamref name="T"/> =
///     <c>double</c> for every production signal) whose address is handed to the
///     presentation layer. The WASM host projects a <c>Float64Array</c> over the heap at
///     <see cref="Ptr"/>; the WinApp host memcpy's the same span into a WebView2 shared
///     buffer. Growing the buffer re-pins (the pointer changes), so consumers must always
///     read the pointer passed with the notification — never cache it.
/// </summary>
/// <typeparam name="T">Blittable scalar element type of the signal buffer.</typeparam>
public sealed class PinnedRenderBuffer<T> : IDisposable
    where T : unmanaged
{
    private T[] _buffer;
    private GCHandle _handle;
    private Action<string>? _notify;

    public Action<string>? OnNotify { set => _notify = value; }

    public PinnedRenderBuffer(int initialCapacity)
    {
        _buffer = new T[initialCapacity];
        _handle = GCHandle.Alloc(_buffer, GCHandleType.Pinned);
    }

    /// <summary>Address of the pinned array; valid until the next growth or dispose.</summary>
    public IntPtr Ptr => _handle.AddrOfPinnedObject();

    /// <summary>Number of elements written by the last <see cref="GetSpan"/> call.</summary>
    public int ElementCount { get; private set; }

    /// <summary>Size in bytes of one element (8 for double).</summary>
    public int ElementSize => Unsafe.SizeOf<T>();

    public Span<T> GetSpan(int elementCount)
    {
        EnsureCapacity(elementCount);
        ElementCount = elementCount;
        return _buffer.AsSpan(0, elementCount);
    }

    public void Commit(string eventName)
    {
        _notify?.Invoke(eventName);
    }

    private void EnsureCapacity(int needed)
    {
        if (needed <= _buffer.Length) return;
        _handle.Free();
        var newSize = Math.Max(needed, _buffer.Length * 2);
        _buffer = new T[newSize];
        _handle = GCHandle.Alloc(_buffer, GCHandleType.Pinned);
    }

    public void Dispose()
    {
        if (_handle.IsAllocated)
            _handle.Free();
    }
}
