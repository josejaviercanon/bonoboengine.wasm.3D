import { t as e } from "./shaderStore-CXjvw9c2.js";
import { t } from "./kernelBlurVaryingDeclaration-CCvSdp5D.js";
import { t as n } from "./packingFunctions-BK99CVQO.js";
//#region node_modules/@babylonjs/core/Shaders/ShadersInclude/kernelBlurFragment.js
var r = "kernelBlurFragment", i = "#ifdef DOF\nfactor=sampleCoC(sampleCoord{X}); \ncomputedWeight=KERNEL_WEIGHT{X}*factor;sumOfWeights+=computedWeight;\n#else\ncomputedWeight=KERNEL_WEIGHT{X};\n#endif\n#ifdef PACKEDFLOAT\nblend+=unpack(texture2D(textureSampler,sampleCoord{X}))*computedWeight;\n#else\nblend+=texture2D(textureSampler,sampleCoord{X})*computedWeight;\n#endif\n";
e.IncludesShadersStore[r] || (e.IncludesShadersStore[r] = i);
var a = {
	name: r,
	shader: i
}, o = "kernelBlurFragment2", s = "#ifdef DOF\nfactor=sampleCoC(sampleCenter+delta*KERNEL_DEP_OFFSET{X});computedWeight=KERNEL_DEP_WEIGHT{X}*factor;sumOfWeights+=computedWeight;\n#else\ncomputedWeight=KERNEL_DEP_WEIGHT{X};\n#endif\n#ifdef PACKEDFLOAT\nblend+=unpack(texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X}))*computedWeight;\n#else\nblend+=texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X})*computedWeight;\n#endif\n";
e.IncludesShadersStore[o] || (e.IncludesShadersStore[o] = s);
var c = {
	name: o,
	shader: s
}, l = "kernelBlurPixelShader", u = "uniform sampler2D textureSampler;uniform vec2 delta;varying vec2 sampleCenter;\n#ifdef DOF\nuniform sampler2D circleOfConfusionSampler;float sampleCoC(in vec2 offset) {float coc=texture2D(circleOfConfusionSampler,offset).r;return coc; }\n#endif\n#include<kernelBlurVaryingDeclaration>[0..varyingCount]\n#ifdef PACKEDFLOAT\n#include<packingFunctions>\n#endif\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void)\n{float computedWeight=0.0;\n#ifdef PACKEDFLOAT\nfloat blend=0.;\n#else\nvec4 blend=vec4(0.);\n#endif\n#ifdef DOF\nfloat sumOfWeights=CENTER_WEIGHT; \nfloat factor=0.0;\n#ifdef PACKEDFLOAT\nblend+=unpack(texture2D(textureSampler,sampleCenter))*CENTER_WEIGHT;\n#else\nblend+=texture2D(textureSampler,sampleCenter)*CENTER_WEIGHT;\n#endif\n#endif\n#include<kernelBlurFragment>[0..varyingCount]\n#include<kernelBlurFragment2>[0..depCount]\n#ifdef PACKEDFLOAT\ngl_FragColor=pack(blend);\n#else\ngl_FragColor=blend;\n#endif\n#ifdef DOF\ngl_FragColor/=sumOfWeights;\n#endif\n}";
e.ShadersStore[l] || (e.ShadersStore[l] = u);
var d = [
	t,
	n,
	a,
	c
];
for (let t of d) e.IncludesShadersStore[t.name] || (e.IncludesShadersStore[t.name] = t.shader);
var f = {
	name: l,
	shader: u
};
//#endregion
export { f as kernelBlurPixelShader };

//# sourceMappingURL=kernelBlur.fragment-DYk3ik-0.js.map