import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./shaderStore-CXjvw9c2.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/postprocess.vertex.js
var n = /* @__PURE__ */ e({ postprocessVertexShaderWGSL: () => a }), r = "postprocessVertexShader", i = "attribute position: vec2<f32>;uniform scale: vec2<f32>;varying vUV: vec2<f32>;const madd=vec2(0.5,0.5);\n#define CUSTOM_VERTEX_DEFINITIONS\n@vertex\nfn main(input : VertexInputs)->FragmentInputs {\n#define CUSTOM_VERTEX_MAIN_BEGIN\nvertexOutputs.vUV=(vertexInputs.position*madd+madd)*uniforms.scale;vertexOutputs.position=vec4(vertexInputs.position,0.0,1.0);\n#define CUSTOM_VERTEX_MAIN_END\n}\n";
t.ShadersStoreWGSL[r] || (t.ShadersStoreWGSL[r] = i);
var a = {
	name: r,
	shader: i
};
//#endregion
export { n as t };

//# sourceMappingURL=postprocess.vertex-6eCiY1T2.js.map