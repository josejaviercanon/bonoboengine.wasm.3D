using System.Runtime.CompilerServices;
using Arch.Core;
using Arch.Systems;

namespace Game.Engine.ECS.Systems;

/// <summary>
///     Integrates <see cref="Position3"/> from <see cref="Velocity3"/> and bounces
///     entities inside the demo arena bounds. Deterministic, allocation-free.
/// </summary>
public partial class MoveBounce3DSystem : BaseSystem<World, double>
{
    private readonly float _minX;
    private readonly float _maxX;
    private readonly float _minY;
    private readonly float _maxY;
    private readonly float _minZ;
    private readonly float _maxZ;

    public MoveBounce3DSystem(World world, float minX, float maxX, float minY, float maxY, float minZ, float maxZ)
        : base(world)
    {
        _minX = minX;
        _maxX = maxX;
        _minY = minY;
        _maxY = maxY;
        _minZ = minZ;
        _maxZ = maxZ;
    }

    [Query]
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public void Move([Data] double dt, ref Position3 pos, ref Velocity3 vel)
    {
        pos.X += (float)(dt * vel.X);
        pos.Y += (float)(dt * vel.Y);
        pos.Z += (float)(dt * vel.Z);

        if (pos.X < _minX) { pos.X = _minX; vel.X = -vel.X; }
        if (pos.X > _maxX) { pos.X = _maxX; vel.X = -vel.X; }
        if (pos.Y < _minY) { pos.Y = _minY; vel.Y = -vel.Y; }
        if (pos.Y > _maxY) { pos.Y = _maxY; vel.Y = -vel.Y; }
        if (pos.Z < _minZ) { pos.Z = _minZ; vel.Z = -vel.Z; }
        if (pos.Z > _maxZ) { pos.Z = _maxZ; vel.Z = -vel.Z; }
    }
}

/// <summary>
///     Rotates <see cref="Rotation3"/> from <see cref="AngularVelocity3"/> using
///     the normalized quaternion step q += 0.5 * w * q * dt (axis-angle form).
/// </summary>
public partial class SpinSystem : BaseSystem<World, double>
{
    public SpinSystem(World world) : base(world) { }

    [Query]
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public void Spin([Data] double dt, ref Rotation3 rot, ref AngularVelocity3 ang)
    {
        var w = (float)Math.Sqrt(ang.X * ang.X + ang.Y * ang.Y + ang.Z * ang.Z);
        if (w < 1e-6f) return;

        var half = 0.5f * w * (float)dt;
        var sin = (float)Math.Sin(half);
        var cos = (float)Math.Cos(half);

        // Axis-angle increment quaternion: (sin * axis, cos).
        var ix = sin * (ang.X / w);
        var iy = sin * (ang.Y / w);
        var iz = sin * (ang.Z / w);
        var iw = cos;

        // q' = q * increment.
        var qx = rot.Qw * ix + rot.Qx * iw + rot.Qy * iz - rot.Qz * iy;
        var qy = rot.Qw * iy - rot.Qx * iz + rot.Qy * iw + rot.Qz * ix;
        var qz = rot.Qw * iz + rot.Qx * iy - rot.Qy * ix + rot.Qz * iw;
        var qw = rot.Qw * iw - rot.Qx * ix - rot.Qy * iy - rot.Qz * iz;

        var norm = (float)Math.Sqrt(qx * qx + qy * qy + qz * qz + qw * qw);
        if (norm < 1e-6f) return;

        rot.Qx = qx / norm;
        rot.Qy = qy / norm;
        rot.Qz = qz / norm;
        rot.Qw = qw / norm;
    }
}

/// <summary>
///     Pulses <see cref="Scale3"/> deterministically: 1 + amplitude * sin(t * speed + phase(id)).
///     Phase derives from <see cref="RenderId"/> so entities never sync up.
/// </summary>
public partial class ScalePulseSystem : BaseSystem<World, double>
{
    private readonly float _amplitude;
    private readonly float _speed;
    private double _elapsed;

    public ScalePulseSystem(World world, float amplitude = 0.25f, float speed = 2.0f) : base(world)
    {
        _amplitude = amplitude;
        _speed = speed;
    }

    public override void BeforeUpdate(in double t)
    {
        _elapsed += t;
    }

    [Query]
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public void Pulse(ref Scale3 scale, ref RenderId id)
    {
        var phase = (id.Id * 1.7f) % (2f * MathF.PI);
        var s = 1f + _amplitude * MathF.Sin((float)(_elapsed * _speed) + phase);
        scale.X = s;
        scale.Y = s;
        scale.Z = s;
    }
}