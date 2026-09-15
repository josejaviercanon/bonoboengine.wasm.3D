using Game.Engine.Interop;

namespace Game.Engine.ECS;

/// <summary>
///     Plain-data snapshot of one 3D entity transform, serialized into the shared-memory
///     float64 signal buffer. Layout: id + position (x, y, z) + rotation quaternion
///     (qx, qy, qz, qw) + scale (sx, sy, sz) = 11 elements.
///     Quaternion component order matches both BepuPhysics2 <c>RigidPose.Orientation</c>
///     and Babylon.js <c>Quaternion</c> (x, y, z, w).
///     Scalar type is <c>double</c> (<see cref="ScalarPrecision.Float64"/>): the WASM host
///     hands the buffer to JavaScript as a <c>Float64Array</c> and the WinApp host copies it
///     into a WebView2 shared buffer consumed as <c>Float64Array</c> — one element type on
///     both host paths, no down-cast at the boundary.
/// </summary>
[TypeScriptExport(11, Precision = ScalarPrecision.Float64)]
public record struct Transform3DState(
    int Id,
    double X, double Y, double Z,
    double Qx, double Qy, double Qz, double Qw,
    double Sx, double Sy, double Sz);

public sealed record Transform3DRenderSignal(
    long Seq,
    int EntityCount,
    double TickMs,
    IReadOnlyList<Transform3DState> States);
