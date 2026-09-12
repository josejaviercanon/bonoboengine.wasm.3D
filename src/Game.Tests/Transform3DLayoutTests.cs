using Game.Engine.ECS;
using Xunit;

namespace Game.Tests;

/// <summary>
///     Unit tests for the 3D transform float32 signal layout:
///     <c>Transform3DState</c> + <c>SignalBufferEncoders</c> for
///     <c>Transform3DRenderSignal</c>. Mirrors the stride-indexed layout consumed
///     by the TypeScript <c>Transform3DDecoder</c>.
/// </summary>
public class Transform3DLayoutTests
{
    [Fact]
    public void Transform3D_Stride_Is_Eleven()
    {
        Assert.Equal(11, SignalBufferLayout.Transform3DStride);
    }

    [Fact]
    public void Encode_Writes_Header_And_Records_At_Expected_Offsets()
    {
        var states = new[]
        {
            new Transform3DState(3, 1f, 2f, 3f, 0f, 0f, 0f, 1f, 2f, 2f, 2f),
            new Transform3DState(7, -4f, 5f, 6f, 0f, 0f, 0.7071f, 0.7071f, 1f, 1f, 1f),
        };
        var signal = new Transform3DRenderSignal(42, states.Length, 16.67, states);

        var floats = new float[SignalBufferEncoders.FloatLength(signal)];
        SignalBufferEncoders.Encode(signal, floats);

        Assert.Equal(42f, floats[SignalBuffer.HeaderSeq]);
        Assert.Equal(0f, floats[SignalBuffer.HeaderEpoch]);
        Assert.Equal(2f, floats[SignalBuffer.HeaderEntityCount]);
        Assert.Equal(11f, floats[SignalBuffer.HeaderStride]);
        Assert.Equal(16.67f, floats[SignalBuffer.HeaderTickMs]);
        Assert.InRange(floats[SignalBuffer.HeaderStepMs], 16f, 17f);

        var stride = SignalBufferLayout.Transform3DStride;
        var b0 = SignalBuffer.HeaderLength;
        Assert.Equal(3f, floats[b0]);
        Assert.Equal(1f, floats[b0 + 1]);
        Assert.Equal(2f, floats[b0 + 2]);
        Assert.Equal(3f, floats[b0 + 3]);
        Assert.Equal(1f, floats[b0 + 7]);
        Assert.Equal(2f, floats[b0 + 8]);
        Assert.Equal(2f, floats[b0 + 9]);
        Assert.Equal(2f, floats[b0 + 10]);

        var b1 = b0 + stride;
        Assert.Equal(7f, floats[b1]);
        Assert.Equal(-4f, floats[b1 + 1]);
        Assert.Equal(5f, floats[b1 + 2]);
        Assert.Equal(6f, floats[b1 + 3]);
        Assert.Equal(0.7071f, floats[b1 + 6], 4);
        Assert.Equal(0.7071f, floats[b1 + 7], 4);
        Assert.Equal(1f, floats[b1 + 10]);
    }

    [Fact]
    public void FloatLength_Scales_With_Entity_Count()
    {
        var one = new Transform3DRenderSignal(1, 1, 16.67, new[]
        {
            new Transform3DState(0, 0f, 0f, 0f, 0f, 0f, 0f, 1f, 1f, 1f, 1f),
        });
        var three = new Transform3DRenderSignal(1, 3, 16.67, new[]
        {
            new Transform3DState(0, 0f, 0f, 0f, 0f, 0f, 0f, 1f, 1f, 1f, 1f),
            new Transform3DState(1, 0f, 0f, 0f, 0f, 0f, 0f, 1f, 1f, 1f, 1f),
            new Transform3DState(2, 0f, 0f, 0f, 0f, 0f, 0f, 1f, 1f, 1f, 1f),
        });

        Assert.Equal(
            SignalBuffer.HeaderLength + 1 * SignalBufferLayout.Transform3DStride,
            SignalBufferEncoders.FloatLength(one));
        Assert.Equal(
            SignalBuffer.HeaderLength + 3 * SignalBufferLayout.Transform3DStride,
            SignalBufferEncoders.FloatLength(three));
    }

    [Fact]
    public void Encode_Empty_Signal_Writes_Header_Only()
    {
        var signal = new Transform3DRenderSignal(9, 0, 16.67, Array.Empty<Transform3DState>());

        var floats = new float[SignalBufferEncoders.FloatLength(signal)];
        SignalBufferEncoders.Encode(signal, floats);

        Assert.Equal(SignalBuffer.HeaderLength, floats.Length);
        Assert.Equal(9f, floats[SignalBuffer.HeaderSeq]);
        Assert.Equal(0f, floats[SignalBuffer.HeaderEntityCount]);
    }
}