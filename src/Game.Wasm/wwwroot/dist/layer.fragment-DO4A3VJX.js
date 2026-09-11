import { t as e } from "./shaderStore-CXjvw9c2.js";
import { t } from "./helperFunctions-CxnQE4lK.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/layer.fragment.js
var n = "layerPixelShader", r = "varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;uniform color: vec4f;\n#include<helperFunctions>\n#define CUSTOM_FRAGMENT_DEFINITIONS\n@fragment\nfn main(input: FragmentInputs)->FragmentOutputs {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nvar baseColor: vec4f=textureSample(textureSampler,textureSamplerSampler,input.vUV);\n#if defined(CONVERT_TO_GAMMA)\nbaseColor=toGammaSpace(baseColor);\n#elif defined(CONVERT_TO_LINEAR)\nbaseColor=toLinearSpaceVec4(baseColor);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4) {discard;}\n#endif\nfragmentOutputs.color=baseColor*uniforms.color;\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
e.ShadersStoreWGSL[n] || (e.ShadersStoreWGSL[n] = r);
var i = [t];
for (let t of i) e.IncludesShadersStoreWGSL[t.name] || (e.IncludesShadersStoreWGSL[t.name] = t.shader);
var a = {
	name: n,
	shader: r
};
//#endregion
export { a as layerPixelShaderWGSL };

//# sourceMappingURL=layer.fragment-DO4A3VJX.js.map