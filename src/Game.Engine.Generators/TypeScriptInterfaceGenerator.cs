using System;
using System.Collections.Immutable;
using System.IO;
using System.Text;
using System.Threading;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;

namespace Game.Engine.Generators;

/// <summary>
///     Emits the TypeScript half of the shared-memory signal contract from the C#
///     structs marked <c>[TypeScriptExport]</c>, and a fail-fast <c>[ModuleInitializer]</c>
///     that asserts the computed strides and scalar sizes match
///     <c>Game.Engine.ECS.SignalBufferLayout</c> at boot (WASM and WinApp alike). Single
///     source of truth: the C# struct — the frontend can no longer drift from the backend
///     layout.
/// </summary>
[Generator(LanguageNames.CSharp)]
public sealed class TypeScriptInterfaceGenerator : IIncrementalGenerator
{
    private static readonly DiagnosticDescriptor IoError = new DiagnosticDescriptor(
        "BNOBO099",
        "TypeScript generation failed",
        "Could not write generated TypeScript: {0}",
        "Generation", DiagnosticSeverity.Warning, isEnabledByDefault: true);

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        context.RegisterPostInitializationOutput(static ctx =>
            ctx.AddSource("TypeScriptExportAttribute.g.cs",
                SourceText.From(InteropNames.AttributeSource, Encoding.UTF8)));

        var targets = context.SyntaxProvider
            .CreateSyntaxProvider(
                // record struct / struct / record — all are TypeDeclarationSyntax with attributes.
                static (node, _) => node is TypeDeclarationSyntax t && t.AttributeLists.Count > 0,
                static (ctx, ct) => GetExportTarget(ctx, ct))
            .Where(static t => t is not null)
            .Select(static (t, _) => t!);

        var projectDir = context.AnalyzerConfigOptionsProvider
            .Select(static (p, _) =>
            {
                var g = p.GlobalOptions;
                if (g.TryGetValue("build_property.projectdir", out var d) && !string.IsNullOrEmpty(d)) return d;
                if (g.TryGetValue("build_property.MSBuildProjectDirectory", out var d2) && !string.IsNullOrEmpty(d2)) return d2;
                return null;
            });

        context.RegisterSourceOutput(
            targets.Collect().Combine(projectDir),
            static (spc, pair) => Execute(pair.Left, pair.Right, spc));
    }

    private static ExportTarget? GetExportTarget(GeneratorSyntaxContext ctx, CancellationToken cancellationToken)
    {
        var typeSyntax = (TypeDeclarationSyntax)ctx.Node;
        if (ctx.SemanticModel.GetDeclaredSymbol(typeSyntax, cancellationToken) is not INamedTypeSymbol symbol)
            return null;
        if (symbol.TypeKind != TypeKind.Struct)
            return null;

        var declaredStride = 0;
        var scalarSize = InteropNames.Float32Size;
        var hasAttribute = false;
        foreach (var ad in symbol.GetAttributes())
        {
            if (ad.AttributeClass is null) continue;
            if (ad.AttributeClass.ToDisplayString(SymbolDisplayFormat.FullyQualifiedFormat) !=
                InteropNames.AttributeFullyQualifiedName) continue;

            hasAttribute = true;
            if (ad.ConstructorArguments.Length > 0 && ad.ConstructorArguments[0].Value is int stride)
                declaredStride = stride;
            scalarSize = StructLayoutInspector.GetScalarSize(ad);
            break;
        }

        if (!hasAttribute) return null;

        var members = StructLayoutInspector.GetMembers(symbol);
        var computed = 0;
        foreach (var m in members)
        {
            var width = StructLayoutInspector.ScalarWidth(m.Type!);
            if (width > 0) computed += width;
        }

        return new ExportTarget
        {
            Name = symbol.Name,
            Namespace = symbol.ContainingNamespace.ToDisplayString(),
            DeclaredStride = declaredStride,
            ComputedStride = computed,
            ScalarSize = scalarSize,
            Members = members
        };
    }

    private static void Execute(ImmutableArray<ExportTarget> targets, string? projectDir, SourceProductionContext ctx)
    {
        if (targets.IsDefaultOrEmpty) return;

        // 1. C# half: generated stride/scalar constants + module-initializer fail-fast.
        ctx.AddSource("GeneratedSignalLayout.g.cs", SourceText.From(BuildCSharp(targets), Encoding.UTF8));

        // 2. TypeScript half: interfaces + layout constants written to Game.UI's frontend tree.
        if (string.IsNullOrEmpty(projectDir)) return;
        try
        {
            var outDir = Path.GetFullPath(Path.Combine(projectDir, "..", "Game.UI", "Frontend", "scenes", "generated"));
            Directory.CreateDirectory(outDir);
            var outPath = Path.Combine(outDir, "signalLayout.ts");
            var ts = BuildTypeScript(targets);
            if (!File.Exists(outPath) || File.ReadAllText(outPath) != ts)
                File.WriteAllText(outPath, ts);
        }
        catch (Exception ex)
        {
            ctx.ReportDiagnostic(Diagnostic.Create(IoError, Location.None, ex.Message));
        }
    }

    private static string BuildCSharp(ImmutableArray<ExportTarget> targets)
    {
        var sb = new StringBuilder();
        sb.AppendLine("// <auto-generated/>");
        sb.AppendLine("// Generated by Game.Engine.Generators (TypeScriptInterfaceGenerator). Do not edit.");
        sb.AppendLine();
        sb.AppendLine("namespace " + InteropNames.EngineEcsNamespace);
        sb.AppendLine("{");
        sb.AppendLine("    public static class GeneratedSignalLayout");
        sb.AppendLine("    {");
        foreach (var t in targets)
        {
            sb.AppendLine("        public const int " + t.Name + "Stride = " + t.ComputedStride + ";");
            sb.AppendLine("        public const int " + t.Name + "ScalarSize = " + t.ScalarSize + ";");
            sb.AppendLine("        public const int " + t.Name + "ByteLength = " + (t.ComputedStride * t.ScalarSize) + ";");
        }
        sb.AppendLine("    }");
        sb.AppendLine();
        sb.AppendLine("    internal static class GeneratedLayoutStaticAssert");
        sb.AppendLine("    {");
        sb.AppendLine("        [global::System.Runtime.CompilerServices.ModuleInitializer]");
        sb.AppendLine("        internal static void ValidateSignalLayouts()");
        sb.AppendLine("        {");
        sb.AppendLine("            if (global::System.Runtime.CompilerServices.Unsafe.SizeOf<float>() != 4)");
        sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: sizeof(float) != 4; zero-copy Float32Array interop requires 4-byte floats.\");");
        sb.AppendLine("            if (global::System.Runtime.CompilerServices.Unsafe.SizeOf<double>() != 8)");
        sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: sizeof(double) != 8; zero-copy Float64Array interop requires 8-byte doubles.\");");
        foreach (var t in targets)
        {
            var constName = StructLayoutInspector.LayoutConstName(t.Name);
            sb.AppendLine("            if (GeneratedSignalLayout." + t.Name + "Stride != global::" + InteropNames.EngineEcsNamespace + ".SignalBufferLayout." + constName + "Stride)");
            sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: " + t.Name + " element-stride drifted from SignalBufferLayout." + constName + "Stride.\");");
            sb.AppendLine("            if (GeneratedSignalLayout." + t.Name + "ScalarSize != global::" + InteropNames.EngineEcsNamespace + ".SignalBufferLayout." + constName + "ScalarSize)");
            sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: " + t.Name + " scalar size (" + StructLayoutInspector.ScalarName(t.ScalarSize) + ") drifted from SignalBufferLayout." + constName + "ScalarSize.\");");
        }
        sb.AppendLine("        }");
        sb.AppendLine("    }");
        sb.AppendLine("}");
        return sb.ToString();
    }

    private static string BuildTypeScript(ImmutableArray<ExportTarget> targets)
    {
        var sb = new StringBuilder();
        sb.AppendLine("// <auto-generated />");
        sb.AppendLine("// Generated by Game.Engine.Generators (TypeScriptInterfaceGenerator). Do not edit.");
        sb.AppendLine("// Single source of truth: the C# [TypeScriptExport] structs and Game.Engine.ECS.SignalBufferLayout.");
        sb.AppendLine("// Regenerated on every `dotnet build` of Game.Engine.");
        sb.AppendLine();
        sb.AppendLine("/** Scalar element type of the shared-memory signal buffer. */");
        sb.AppendLine("export type ScalarArray = Float32Array | Float64Array;");
        sb.AppendLine();
        sb.AppendLine("/** Scalar element sizes in bytes; keep in sync with ScalarPrecision. */");
        sb.AppendLine("export const ScalarSizes = { Float32: 4, Float64: 8 } as const;");
        sb.AppendLine();
        sb.AppendLine("/** Standard signal header: the first six elements of every signal buffer. */");
        sb.AppendLine("export interface BufferHeader {");
        sb.AppendLine("    seq: number;");
        sb.AppendLine("    epoch: number;");
        sb.AppendLine("    entityCount: number;");
        sb.AppendLine("    stride: number;");
        sb.AppendLine("    stepMs: number;");
        sb.AppendLine("    tickMs: number;");
        sb.AppendLine("}");
        sb.AppendLine();
        sb.AppendLine("export const BUFFER_HEADER_LENGTH = 6;");
        sb.AppendLine();
        foreach (var t in targets)
        {
            sb.AppendLine("export interface " + t.Name + " {");
            foreach (var m in t.Members)
                sb.AppendLine("    " + StructLayoutInspector.CamelCase(m.Name) + ": " + StructLayoutInspector.TsType(m.Type!) + ";");
            sb.AppendLine("}");
            sb.AppendLine("export const " + t.Name + "Stride = " + t.ComputedStride + ";");
            sb.AppendLine("export const " + t.Name + "ScalarSize = " + t.ScalarSize + ";");
            sb.AppendLine("export const " + t.Name + "ByteLength = " + (t.ComputedStride * t.ScalarSize) + ";");
            sb.AppendLine();
        }
        return sb.ToString();
    }
}
