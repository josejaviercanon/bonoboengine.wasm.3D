import { t as e } from "./shaderStore-CXjvw9c2.js";
import { t } from "./kernelBlurVaryingDeclaration-9oHgCyiK.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/kernelBlurVertex.js
var n = "kernelBlurVertex", r = "vertexOutputs.sampleCoord{X}=vertexOutputs.sampleCenter+uniforms.delta*KERNEL_OFFSET{X};";
e.IncludesShadersStoreWGSL[n] || (e.IncludesShadersStoreWGSL[n] = r);
var i = {
	name: n,
	shader: r
}, a = "kernelBlurVertexShader", o = "attribute position: vec2f;uniform delta: vec2f;varying sampleCenter: vec2f;\n#include<kernelBlurVaryingDeclaration>[0..varyingCount]\n#define CUSTOM_VERTEX_DEFINITIONS\n@vertex\nfn main(input : VertexInputs)->FragmentInputs {const madd: vec2f= vec2f(0.5,0.5);\n#define CUSTOM_VERTEX_MAIN_BEGIN\nvertexOutputs.sampleCenter=(vertexInputs.position*madd+madd);\n#include<kernelBlurVertex>[0..varyingCount]\nvertexOutputs.position= vec4f(vertexInputs.position,0.0,1.0);\n#define CUSTOM_VERTEX_MAIN_END\n}";
e.ShadersStoreWGSL[a] || (e.ShadersStoreWGSL[a] = o);
var s = [t, i];
for (let t of s) e.IncludesShadersStoreWGSL[t.name] || (e.IncludesShadersStoreWGSL[t.name] = t.shader);
var c = {
	name: a,
	shader: o
};
//#endregion
export { c as kernelBlurVertexShaderWGSL };

//# sourceMappingURL=kernelBlur.vertex-Ds4ZOFVf.js.map