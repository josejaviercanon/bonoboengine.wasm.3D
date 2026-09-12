
namespace Game.Engine.ECS;

/// <summary>
///     Canonical shared-memory float32 signal layout — the C# half of the
///     shared-memory float32 signal contract. The TypeScript half is <c>src/Game.UI/Frontend/scenes/bufferLayout.ts</c>;
///     both files MUST stay in sync (indices, extras order, entity stride).
///
///     Every signal buffer starts with a six-float standard header:
///         floats[0] seq, floats[1] epoch, floats[2] entityCount,
///         floats[3] stride, floats[4] stepMs, floats[5] tickMs
///     followed by scene-specific scalar extras, then entityCount × stride
///     entity records. Booleans are encoded as 0 / 1 (see <c>floatBool</c> in TS).
///     Ids ride in float32 — exact only up to 2^24, fine for these ECS id ranges.
/// </summary>
public static class SignalBuffer
{
    public const int HeaderLength = 6;
    public const int HeaderSeq = 0;
    public const int HeaderEpoch = 1;
    public const int HeaderEntityCount = 2;
    public const int HeaderStride = 3;
    public const int HeaderStepMs = 4;
    public const int HeaderTickMs = 5;

    public static void WriteHeader(
        Span<float> f, long seq, long epoch, int entityCount, int stride, double stepMs, double tickMs)
    {
        f[HeaderSeq] = seq;
        f[HeaderEpoch] = epoch;
        f[HeaderEntityCount] = entityCount;
        f[HeaderStride] = stride;
        f[HeaderStepMs] = (float)stepMs;
        f[HeaderTickMs] = (float)tickMs;
    }
}

/// <summary>
///     Per-game buffer geometry: scalar extras length and entity stride, one pair
///     per scene. Mirrors the <c>*_BUFFER_*</c> constants in the TypeScript scenes.
/// </summary>
public static class SignalBufferLayout
{
    // ecs (sprite-move): no extras, SpriteState record (id, x, y, r, g, b).
    public const int EcsStride = 6;
}

/// <summary>
///     Encoders for every batched render signal into the shared-memory float32
///     layout consumed by <c>DirectRenderTransport</c> and the TypeScript
///     <c>SnapshotBuffer.ingestFromBuffer</c> decoders.
///     One <c>FloatLength</c> + <c>Encode</c> pair per signal type; the transport
///     sizes its buffer from <c>FloatLength</c> before calling <c>Encode</c>.
/// </summary>
public static class SignalBufferEncoders
{
    // ---- ECS (sprite-move) -------------------------------------------------

    public static int FloatLength(EcsRenderSignal s) =>
        SignalBuffer.HeaderLength + s.Sprites.Count * SignalBufferLayout.EcsStride;

    public static void Encode(EcsRenderSignal s, Span<float> f)
    {
        // EcsRenderSignal carries no StepMs/Epoch; the client's interpolation
        // header still expects them, so encode the fixed 60 Hz step and epoch 0.
        SignalBuffer.WriteHeader(f, s.Seq, 0, s.Sprites.Count,
            SignalBufferLayout.EcsStride, (1d / 60d) * 1000d, s.TickMs);
        WriteSprites(f, SignalBuffer.HeaderLength, s.Sprites, SignalBufferLayout.EcsStride,
            static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.R;
                dst[4] = sp.G;
                dst[5] = sp.B;
            });
    }

    // ---- shared writer --------------------------------------------------------

    private static void WriteSprites<T>(
        Span<float> f, int entityBase, IReadOnlyList<T> sprites, int stride,
        WriteEntity<T> write)
    {
        for (var i = 0; i < sprites.Count; i++)
        {
            write(sprites[i], f.Slice(entityBase + i * stride, stride));
        }
    }

    private delegate void WriteEntity<in T>(T sprite, Span<float> destination);

    private static float Bool(bool value) => value ? 1f : 0f;
}
