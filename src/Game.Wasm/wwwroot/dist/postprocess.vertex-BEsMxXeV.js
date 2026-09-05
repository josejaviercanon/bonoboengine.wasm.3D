import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./shaderStore-CXjvw9c2.js";
//#region node_modules/@babylonjs/core/Shaders/postprocess.vertex.js
var n = /* @__PURE__ */ e({ postprocessVertexShader: () => a }), r = "postprocessVertexShader", i = "attribute vec2 position;uniform vec2 scale;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\nvUV=(position*madd+madd)*scale;gl_Position=vec4(position,0.0,1.0);\n#define CUSTOM_VERTEX_MAIN_END\n}";
t.ShadersStore[r] || (t.ShadersStore[r] = i);
var a = {
	name: r,
	shader: i
};
//#endregion
export { n as t };

//# sourceMappingURL=postprocess.vertex-BEsMxXeV.js.map