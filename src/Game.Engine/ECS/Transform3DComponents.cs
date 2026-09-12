using Arch.AOT.SourceGenerator;

namespace Game.Engine.ECS;

/// <summary>
///     3D world-space position of an entity. Feeds <c>Transform3DState.X/Y/Z</c>.
/// </summary>
[Component]
public struct Position3
{
    public float X;
    public float Y;
    public float Z;

    public Position3(float x, float y, float z)
    {
        X = x;
        Y = y;
        Z = z;
    }
}

/// <summary>
///     3D rotation as a unit quaternion (x, y, z, w). Component order matches
///     <c>Transform3DState</c>, BepuPhysics2 <c>RigidPose.Orientation</c> and
///     Babylon.js <c>Quaternion</c>.
/// </summary>
[Component]
public struct Rotation3
{
    public float Qx;
    public float Qy;
    public float Qz;
    public float Qw;

    public Rotation3(float qx, float qy, float qz, float qw)
    {
        Qx = qx;
        Qy = qy;
        Qz = qz;
        Qw = qw;
    }

    public static readonly Rotation3 Identity = new(0f, 0f, 0f, 1f);
}

/// <summary>
///     Uniform non-uniform scale along the three world axes.
/// </summary>
[Component]
public struct Scale3
{
    public float X;
    public float Y;
    public float Z;

    public Scale3(float x, float y, float z)
    {
        X = x;
        Y = y;
        Z = z;
    }

    public static readonly Scale3 One = new(1f, 1f, 1f);
}

/// <summary>
///     Linear velocity in units per second.
/// </summary>
[Component]
public struct Velocity3
{
    public float X;
    public float Y;
    public float Z;

    public Velocity3(float x, float y, float z)
    {
        X = x;
        Y = y;
        Z = z;
    }
}

/// <summary>
///     Angular velocity as an axis-scaled rotation vector (rad/s). Integrated
///     into <see cref="Rotation3"/> each tick with a normalized quaternion step.
/// </summary>
[Component]
public struct AngularVelocity3
{
    public float X;
    public float Y;
    public float Z;

    public AngularVelocity3(float x, float y, float z)
    {
        X = x;
        Y = y;
        Z = z;
    }
}