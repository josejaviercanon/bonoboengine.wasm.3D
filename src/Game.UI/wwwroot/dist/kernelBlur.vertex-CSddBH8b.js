import { t as e } from "./shaderStore-CXjvw9c2.js";
import { t } from "./kernelBlurVaryingDeclaration-CCvSdp5D.js";
//#region node_modules/@babylonjs/core/Shaders/ShadersInclude/kernelBlurVertex.js
var n = "kernelBlurVertex", r = "sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";
e.IncludesShadersStore[n] || (e.IncludesShadersStore[n] = r);
var i = {
	name: n,
	shader: r
}, a = "kernelBlurVertexShader", o = "attribute vec2 position;uniform vec2 delta;varying vec2 sampleCenter;\n#include<kernelBlurVaryingDeclaration>[0..varyingCount]\nconst vec2 madd=vec2(0.5,0.5);\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\nsampleCenter=(position*madd+madd);\n#include<kernelBlurVertex>[0..varyingCount]\ngl_Position=vec4(position,0.0,1.0);\n#define CUSTOM_VERTEX_MAIN_END\n}";
e.ShadersStore[a] || (e.ShadersStore[a] = o);
var s = [t, i];
for (let t of s) e.IncludesShadersStore[t.name] || (e.IncludesShadersStore[t.name] = t.shader);
var c = {
	name: a,
	shader: o
};
//#endregion
export { c as kernelBlurVertexShader };

//# sourceMappingURL=kernelBlur.vertex-CSddBH8b.js.map