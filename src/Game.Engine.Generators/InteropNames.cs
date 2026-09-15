namespace Game.Engine.Generators;

/// <summary>Shared names and attribute source used by both the generator and the analyzer.</summary>
internal static class InteropNames
{
    /// <summary>Namespace the emitted attribute is registered under.</summary>
    public const string AttributeNamespace = "Game.Engine.Interop";

    /// <summary>Fully-qualified name of the attribute emitted into the consumer compilation.</summary>
    public const string AttributeFullyQualifiedName = "global::Game.Engine.Interop.TypeScriptExportAttribute";

    /// <summary>Namespace of <c>SignalBufferLayout</c> and the sprite-state structs.</summary>
    public const string EngineEcsNamespace = "Game.Engine.ECS";

    /// <summary>Scalar element sizes (bytes) supported by the shared-memory signal buffer.</summary>
    public const int Float32Size = 4;
    public const int Float64Size = 8;

    /// <summary>
    ///     Marker attribute emitted post-init (same pattern as Arch's <c>ComponentAttribute</c>).
    ///     <c>floatStride</c> is the number of scalar elements the struct occupies in the
    ///     shared-memory buffer; 0 means "compute from fields, do not assert" (the module
    ///     initializer still cross-checks the computed stride against <c>SignalBufferLayout</c>).
    ///     <c>Precision</c> selects the scalar element type of the buffer that carries the
    ///     struct: Float32 (default, 4-byte elements) or Float64 (8-byte elements).
    ///     The attribute type name is kept for backwards compatibility with existing
    ///     <c>[TypeScriptExport(n)]</c> usages.
    /// </summary>
    public const string AttributeSource =
        "using System;\n" +
        "\n" +
        "namespace Game.Engine.Interop\n" +
        "{\n" +
        "    /// <summary>Scalar element type (and byte size) of the shared-memory signal buffer.</summary>\n" +
        "    public enum ScalarPrecision\n" +
        "    {\n" +
        "        Float32 = 4,\n" +
        "        Float64 = 8\n" +
        "    }\n" +
        "\n" +
        "    [AttributeUsage(AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]\n" +
        "    public sealed class TypeScriptExportAttribute : Attribute\n" +
        "    {\n" +
        "        public TypeScriptExportAttribute(int floatStride = 0)\n" +
        "        {\n" +
        "            FloatStride = floatStride;\n" +
        "        }\n" +
        "\n" +
        "        public int FloatStride { get; }\n" +
        "\n" +
        "        /// <summary>Scalar element type used for this struct (default Float32).</summary>\n" +
        "        public ScalarPrecision Precision { get; set; } = ScalarPrecision.Float32;\n" +
        "\n" +
        "        /// <summary>Scalar element size in bytes (4 or 8).</summary>\n" +
        "        public int ScalarSize => (int)Precision;\n" +
        "\n" +
        "        /// <summary>Total bytes this struct occupies in the signal buffer.</summary>\n" +
        "        public int ByteLength => FloatStride * ScalarSize;\n" +
        "    }\n" +
        "}\n";
}
