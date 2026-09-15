using Game.Engine.ECS;
using Xunit;

namespace Game.Tests;

/// <summary>
///     Unit tests for the signal layout: <c>Transform3DState</c> + <c>SpriteState</c> and
///     <c>SignalBufferEncoders</c>. Every signal buffer is float64 (<c>double</c> /
///     <c>Float64Array</c>) — mirrored by the generated constants consumed in TypeScript.
/// </summary>
public class Transform3DLayoutTests
{
    [Fact]
    public void Transform3D_Stride_And_Scalar_Size_Match_Generated_Layout()
    {
        Assert.Equal(11, SignalBufferLayout.Transform3DStride);
        Assert.Equal(sizeof(double), SignalBufferLayout.Transform3DScalarSize);
        Assert.Equal(SignalBufferLayout.Transform3DStride, GeneratedSignalLayout.Transform3DStateStride);
        Assert.Equal(SignalBufferLayout.Transform3DScalarSize, GeneratedSignalLayout.Transform3DStateScalarSize);
        Assert.Equal(
            SignalBufferLayout.Transform3DStride * sizeof(double),
            GeneratedSignalLayout.Transform3DStateByteLength);
    }

    [Fact]
    public void Ecs_Sprite_Stays_Float64()
    {
        Assert.Equal(6, SignalBufferLayout.EcsStride);
        Assert.Equal(sizeof(double), SignalBufferLayout.EcsScalarSize);
        Assert.Equal(SignalBufferLayout.EcsScalarSize, GeneratedSignalLayout.SpriteStateScalarSize);
        Assert.Equal(
            SignalBufferLayout.EcsStride * sizeof(double),
            GeneratedSignalLayout.SpriteStateByteLength);
    }

    [Fact]
    public void Encode_Sprite_Writes_Double_Records_At_Expected_Offsets()
    {
        var sprites = new[]
        {
            new SpriteState(3, 1.5f, -2.25f, 10, 20, 30),
            new SpriteState(9, 0f, 4.75f, 255, 0, 128),
        };
        var signal = new EcsRenderSignal(7, sprites.Length, 16.67, sprites);

        var values = new double[SignalBufferEncoders.ElementLength(signal)];
        SignalBufferEncoders.Encode(signal, values);

        Assert.Equal(7d, values[SignalBuffer.HeaderSeq]);
        Assert.Equal(0d, values[SignalBuffer.HeaderEpoch]);
        Assert.Equal(2d, values[SignalBuffer.HeaderEntityCount]);
        Assert.Equal(6d, values[SignalBuffer.HeaderStride]);

        var stride = SignalBufferLayout.EcsStride;
        var b0 = SignalBuffer.HeaderLength;
        Assert.Equal(3d, values[b0]);
        Assert.Equal(1.5d, values[b0 + 1]);
        Assert.Equal(-2.25d, values[b0 + 2]);
        Assert.Equal(10d, values[b0 + 3]);
        Assert.Equal(20d, values[b0 + 4]);
        Assert.Equal(30d, values[b0 + 5]);

        var b1 = b0 + stride;
        Assert.Equal(9d, values[b1]);
        Assert.Equal(4.75d, values[b1 + 2]);
        Assert.Equal(255d, values[b1 + 3]);
        Assert.Equal(128d, values[b1 + 5]);
    }

    [Fact]
    public void Encode_Writes_Header_And_Records_At_Expected_Offsets()
    {
        var states = new[]
        {
            new Transform3DState(3, 1, 2, 3, 0, 0, 0, 1, 2, 2, 2),
            new Transform3DState(7, -4, 5, 6, 0, 0, 0.7071, 0.7071, 1, 1, 1),
        };
        var signal = new Transform3DRenderSignal(42, states.Length, 16.67, states);

        var values = new double[SignalBufferEncoders.ElementLength(signal)];
        SignalBufferEncoders.Encode(signal, values);

        Assert.Equal(42d, values[SignalBuffer.HeaderSeq]);
        Assert.Equal(0d, values[SignalBuffer.HeaderEpoch]);
        Assert.Equal(2d, values[SignalBuffer.HeaderEntityCount]);
        Assert.Equal(11d, values[SignalBuffer.HeaderStride]);
        Assert.Equal(16.67d, values[SignalBuffer.HeaderTickMs]);
        Assert.InRange(values[SignalBuffer.HeaderStepMs], 16d, 17d);

        var stride = SignalBufferLayout.Transform3DStride;
        var b0 = SignalBuffer.HeaderLength;
        Assert.Equal(3d, values[b0]);
        Assert.Equal(1d, values[b0 + 1]);
        Assert.Equal(2d, values[b0 + 2]);
        Assert.Equal(3d, values[b0 + 3]);
        Assert.Equal(1d, values[b0 + 7]);
        Assert.Equal(2d, values[b0 + 8]);
        Assert.Equal(2d, values[b0 + 9]);
        Assert.Equal(2d, values[b0 + 10]);

        var b1 = b0 + stride;
        Assert.Equal(7d, values[b1]);
        Assert.Equal(-4d, values[b1 + 1]);
        Assert.Equal(5d, values[b1 + 2]);
        Assert.Equal(6d, values[b1 + 3]);
        Assert.Equal(0.7071d, values[b1 + 6], 4);
        Assert.Equal(0.7071d, values[b1 + 7], 4);
        Assert.Equal(1d, values[b1 + 10]);
    }

    [Fact]
    public void ElementLength_Scales_With_Entity_Count()
    {
        var one = new Transform3DRenderSignal(1, 1, 16.67, new[]
        {
            new Transform3DState(0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1),
        });
        var three = new Transform3DRenderSignal(1, 3, 16.67, new[]
        {
            new Transform3DState(0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1),
            new Transform3DState(1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1),
            new Transform3DState(2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1),
        });

        Assert.Equal(
            SignalBuffer.HeaderLength + 1 * SignalBufferLayout.Transform3DStride,
            SignalBufferEncoders.ElementLength(one));
        Assert.Equal(
            SignalBuffer.HeaderLength + 3 * SignalBufferLayout.Transform3DStride,
            SignalBufferEncoders.ElementLength(three));
    }

    [Fact]
    public void Encode_Empty_Signal_Writes_Header_Only()
    {
        var signal = new Transform3DRenderSignal(9, 0, 16.67, Array.Empty<Transform3DState>());

        var values = new double[SignalBufferEncoders.ElementLength(signal)];
        SignalBufferEncoders.Encode(signal, values);

        Assert.Equal(SignalBuffer.HeaderLength, values.Length);
        Assert.Equal(9d, values[SignalBuffer.HeaderSeq]);
        Assert.Equal(0d, values[SignalBuffer.HeaderEntityCount]);
    }
}
