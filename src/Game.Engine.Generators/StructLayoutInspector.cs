using System.Collections.Generic;
using System.Linq;
using Microsoft.CodeAnalysis;

namespace Game.Engine.Generators;

/// <summary>One field of an exported struct, in declaration order.</summary>
internal sealed class ExportMember
{
    public string Name = string.Empty;
    public ITypeSymbol? Type;
}

/// <summary>An [TypeScriptExport] struct and its derived signal-buffer layout.</summary>
internal sealed class ExportTarget
{
    public string Name = string.Empty;
    public string Namespace = string.Empty;
    public int DeclaredStride;
    public int ComputedStride;
    public int ScalarSize = InteropNames.Float64Size;
    public List<ExportMember> Members = new();
}

/// <summary>
///     Shared layout math for the analyzer and generator. Every scalar field widens to
///     exactly one element in the signal buffer (ids, bytes and bools ride in the scalar
///     type — see <c>SignalBuffer</c>), so the stride of a struct is simply the count of its
///     fields; the scalar element type (8-byte double by default) comes from the
///     attribute's <c>Precision</c>. This mirrors the encoding performed by
///     <c>SignalBufferEncoders</c>.
/// </summary>
internal static class StructLayoutInspector
{
    /// <summary>Reads the declared <c>Precision</c> named argument; Float64 when absent.</summary>
    public static int GetScalarSize(AttributeData attribute)
    {
        foreach (var named in attribute.NamedArguments)
        {
            if (named.Key == "Precision" &&
                named.Value.Value is int size &&
                (size == InteropNames.Float32Size || size == InteropNames.Float64Size))
                return size;
        }

        return InteropNames.Float64Size;
    }

    /// <summary>Precision identifier used by generated C#/TypeScript constants.</summary>
    public static string ScalarName(int scalarSize) =>
        scalarSize == InteropNames.Float64Size ? "Float64" : "Float32";

    /// <summary>Extracts the ordered member list for a struct (record structs use the primary constructor).</summary>
    public static List<ExportMember> GetMembers(INamedTypeSymbol symbol)
    {
        // Record structs: the primary-constructor parameters ARE the members, in order.
        var ctor = symbol.InstanceConstructors.FirstOrDefault(c => c.Parameters.Length > 0);
        if (ctor != null)
        {
            var list = new List<ExportMember>(ctor.Parameters.Length);
            foreach (var p in ctor.Parameters)
                list.Add(new ExportMember { Name = p.Name, Type = p.Type });
            return list;
        }

        // Explicit struct: public instance properties first, then public fields.
        var props = symbol.GetMembers().OfType<IPropertySymbol>()
            .Where(p => !p.IsStatic && p.DeclaredAccessibility == Accessibility.Public && !p.IsIndexer)
            .ToList();
        if (props.Count > 0)
        {
            var list = new List<ExportMember>(props.Count);
            foreach (var p in props)
                list.Add(new ExportMember { Name = p.Name, Type = p.Type });
            return list;
        }

        var fields = symbol.GetMembers().OfType<IFieldSymbol>()
            .Where(f => !f.IsStatic && f.DeclaredAccessibility == Accessibility.Public)
            .ToList();
        var fieldList = new List<ExportMember>(fields.Count);
        foreach (var f in fields)
            fieldList.Add(new ExportMember { Name = f.Name, Type = f.Type });
        return fieldList;
    }

    /// <summary>Number of scalar elements a field type occupies in the signal buffer; -1 = unsupported.</summary>
    public static int ScalarWidth(ITypeSymbol type)
    {
        if (type.TypeKind == TypeKind.Enum) return 1;
        switch (type.SpecialType)
        {
            case SpecialType.System_Boolean:
            case SpecialType.System_Byte:
            case SpecialType.System_SByte:
            case SpecialType.System_Int16:
            case SpecialType.System_UInt16:
            case SpecialType.System_Int32:
            case SpecialType.System_UInt32:
            case SpecialType.System_Int64:
            case SpecialType.System_UInt64:
            case SpecialType.System_Single:
            case SpecialType.System_Double:
                return 1;
            default:
                return -1;
        }
    }

    /// <summary>True when the field is a 64-bit integer (unsafe past 2^53 once widened to a JS number).</summary>
    public static bool IsWideInteger(ITypeSymbol type) =>
        type.SpecialType == SpecialType.System_Int64 || type.SpecialType == SpecialType.System_UInt64;

    /// <summary>TypeScript type for a field: everything signal-encodable is <c>number</c> except bool.</summary>
    public static string TsType(ITypeSymbol type) =>
        type.SpecialType == SpecialType.System_Boolean ? "boolean" : "number";

    /// <summary>Maps a struct name to the matching <c>SignalBufferLayout</c> const prefix.</summary>
    public static string LayoutConstName(string structName)
    {
        if (structName == "SpriteState") return "Ecs";
        if (structName.EndsWith("SpriteState"))
            return structName.Substring(0, structName.Length - "SpriteState".Length);
        if (structName.EndsWith("State"))
            return structName.Substring(0, structName.Length - "State".Length);
        return structName;
    }

    /// <summary>Lower-camel-cases the first character for TS convention.</summary>
    public static string CamelCase(string name) =>
        name.Length == 0 ? name : char.ToLowerInvariant(name[0]) + name.Substring(1);
}
