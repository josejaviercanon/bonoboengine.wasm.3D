using Game.Engine.Interop;

namespace Game.Engine.ECS;

/// <summary>
///     Plain-data snapshot of one 3D entity transform, serializable into the
///     shared-memory float32 signal buffer. Layout: id + position (x, y, z) +
///     rotation quaternion (qx, qy, qz, qw) + scale (sx, sy, sz) = 11 floats.
///     Quaternion component order matches both BepuPhysics2 <c>RigidPose.Orientation</c>
///     and Babylon.js <c>Quaternion</c> (x, y, z, w).
/// </summary>
[TypeScriptExport(11)]
public record struct Transform3DState(
    int Id,
    float X, float Y, float Z,
    float Qx, float Qy, float Qz, float Qw,
    float Sx, float Sy, float Sz);

/// <summary>
///     Batched 3D transform render signal consumed by
///     <see cref="SignalBufferEncoders"/> and the TypeScript
///     <c>Transform3DDecoder</c>.
/// </summary>
public sealed record Transform3DRenderSignal(
    long Seq,
    int EntityCount,
    double TickMs,
    IReadOnlyList<Transform3DState> States);