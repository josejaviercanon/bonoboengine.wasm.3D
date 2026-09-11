import { t as e } from "./shaderStore-CXjvw9c2.js";
import { n as t, t as n } from "./clipPlaneFragment-CA1pANeG.js";
import { t as r } from "./packingFunctions-CJVrf8Av.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/bayerDitherFunctions.js
var i = "bayerDitherFunctions", a = "fn bayerDither2(_P: vec2f)->f32 {return ((2.0*_P.y+_P.x+1.0)%(4.0));}\nfn bayerDither4(_P: vec2f)->f32 {var P1: vec2f=((_P)%(2.0)); \nvar P2: vec2f=floor(0.5*((_P)%(4.0))); \nreturn 4.0*bayerDither2(P1)+bayerDither2(P2);}\nfn bayerDither8(_P: vec2f)->f32 {var P1: vec2f=((_P)%(2.0)); \nvar P2: vec2f=floor(0.5 *((_P)%(4.0))); \nvar P4: vec2f=floor(0.25*((_P)%(8.0))); \nreturn 4.0*(4.0*bayerDither2(P1)+bayerDither2(P2))+bayerDither2(P4);}\n";
e.IncludesShadersStoreWGSL[i] || (e.IncludesShadersStoreWGSL[i] = a);
var o = {
	name: i,
	shader: a
}, s = "shadowMapFragmentExtraDeclaration", c = "#if SM_FLOAT==0\n#include<packingFunctions>\n#endif\n#if SM_SOFTTRANSPARENTSHADOW==1\n#include<bayerDitherFunctions>\nuniform softTransparentShadowSM: vec2f;\n#endif\nvarying vDepthMetricSM: f32;\n#if SM_USEDISTANCE==1\nuniform lightDataSM: vec3f;varying vPositionWSM: vec3f;\n#endif\nuniform biasAndScaleSM: vec3f;uniform depthValuesSM: vec2f;\n#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1\nvarying zSM: f32;\n#endif\n";
e.IncludesShadersStoreWGSL[s] || (e.IncludesShadersStoreWGSL[s] = c);
var l = {
	name: s,
	shader: c
}, u = "shadowMapFragment", d = "var depthSM: f32=fragmentInputs.vDepthMetricSM;\n#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1\n#if SM_USEDISTANCE==1\ndepthSM=(length(fragmentInputs.vPositionWSM-uniforms.lightDataSM)+uniforms.depthValuesSM.x)/uniforms.depthValuesSM.y+uniforms.biasAndScaleSM.x;\n#else\n#ifdef USE_REVERSE_DEPTHBUFFER\ndepthSM=(-fragmentInputs.zSM+uniforms.depthValuesSM.x)/uniforms.depthValuesSM.y+uniforms.biasAndScaleSM.x;\n#else\ndepthSM=(fragmentInputs.zSM+uniforms.depthValuesSM.x)/uniforms.depthValuesSM.y+uniforms.biasAndScaleSM.x;\n#endif\n#endif\ndepthSM=clamp(depthSM,0.0,1.0);\n#ifdef USE_REVERSE_DEPTHBUFFER\nfragmentOutputs.fragDepth=clamp(1.0-depthSM,0.0,1.0);\n#else\nfragmentOutputs.fragDepth=clamp(depthSM,0.0,1.0); \n#endif\n#elif SM_USEDISTANCE==1\ndepthSM=(length(fragmentInputs.vPositionWSM-uniforms.lightDataSM)+uniforms.depthValuesSM.x)/uniforms.depthValuesSM.y+uniforms.biasAndScaleSM.x;\n#endif\n#if SM_ESM==1\ndepthSM=clamp(exp(-min(87.,uniforms.biasAndScaleSM.z*depthSM)),0.,1.);\n#endif\n#if SM_FLOAT==1\nfragmentOutputs.color= vec4f(depthSM,1.0,1.0,1.0);\n#else\nfragmentOutputs.color=pack(depthSM);\n#endif\n";
e.IncludesShadersStoreWGSL[u] || (e.IncludesShadersStoreWGSL[u] = d);
var f = {
	name: u,
	shader: d
}, p = "shadowMapPixelShader", m = "#include<shadowMapFragmentExtraDeclaration>\n#ifdef ALPHATEXTURE\nvarying vUV: vec2f;var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;\n#endif\n#include<clipPlaneFragmentDeclaration>\n#define CUSTOM_FRAGMENT_DEFINITIONS\n@fragment\nfn main(input: FragmentInputs)->FragmentOutputs {\n#include<clipPlaneFragment>\n#ifdef ALPHATEXTURE\nvar opacityMap: vec4f=textureSample(diffuseSampler,diffuseSamplerSampler,fragmentInputs.vUV);var alphaFromAlphaTexture: f32=opacityMap.a;\n#if SM_SOFTTRANSPARENTSHADOW==1\nif (uniforms.softTransparentShadowSM.y==1.0) {opacityMap=vec4f(opacityMap.rgb* vec3f(0.3,0.59,0.11),opacityMap.a);alphaFromAlphaTexture=opacityMap.x+opacityMap.y+opacityMap.z;}\n#endif\n#ifdef ALPHATESTVALUE\nif (alphaFromAlphaTexture<ALPHATESTVALUE) {discard;}\n#endif\n#endif\n#if SM_SOFTTRANSPARENTSHADOW==1\n#ifdef ALPHATEXTURE\nif ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x*alphaFromAlphaTexture) {discard;}\n#else\nif ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x) {discard;} \n#endif\n#endif\n#include<shadowMapFragment>\n}";
e.ShadersStoreWGSL[p] || (e.ShadersStoreWGSL[p] = m);
var h = [
	r,
	o,
	l,
	t,
	n,
	f
];
for (let t of h) e.IncludesShadersStoreWGSL[t.name] || (e.IncludesShadersStoreWGSL[t.name] = t.shader);
var g = {
	name: p,
	shader: m
};
//#endregion
export { g as shadowMapPixelShaderWGSL };

//# sourceMappingURL=shadowMap.fragment-JXSgKwAg.js.map