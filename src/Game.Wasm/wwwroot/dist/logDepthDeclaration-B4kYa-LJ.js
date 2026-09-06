import { t as e } from "./shaderStore-CXjvw9c2.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/sceneUboDeclaration.js
var t = "sceneUboDeclaration", n = "struct Scene {viewProjection : mat4x4<f32>,\n#ifdef MULTIVIEW\nviewProjectionR : mat4x4<f32>,\n#endif \nview : mat4x4<f32>,\nprojection : mat4x4<f32>,\nvEyePosition : vec4<f32>,\ninverseProjection : mat4x4<f32>,};\n#define SCENE_UBO\nvar<uniform> scene : Scene;\n";
e.IncludesShadersStoreWGSL[t] || (e.IncludesShadersStoreWGSL[t] = n);
var r = {
	name: t,
	shader: n
}, i = "meshUboDeclaration", a = "struct Mesh {world : mat4x4<f32>,\nvisibility : f32,};var<uniform> mesh : Mesh;\n#define WORLD_UBO\n";
e.IncludesShadersStoreWGSL[i] || (e.IncludesShadersStoreWGSL[i] = a);
var o = {
	name: i,
	shader: a
}, s = "defaultUboDeclaration", c = "uniform diffuseLeftColor: vec4f;uniform diffuseRightColor: vec4f;uniform opacityParts: vec4f;uniform reflectionLeftColor: vec4f;uniform reflectionRightColor: vec4f;uniform refractionLeftColor: vec4f;uniform refractionRightColor: vec4f;uniform emissiveLeftColor: vec4f;uniform emissiveRightColor: vec4f;uniform vDiffuseInfos: vec2f;uniform vAmbientInfos: vec2f;uniform vOpacityInfos: vec2f;uniform vEmissiveInfos: vec2f;uniform vLightmapInfos: vec2f;uniform vSpecularInfos: vec2f;uniform vBumpInfos: vec3f;uniform diffuseMatrix: mat4x4f;uniform ambientMatrix: mat4x4f;uniform opacityMatrix: mat4x4f;uniform emissiveMatrix: mat4x4f;uniform lightmapMatrix: mat4x4f;uniform specularMatrix: mat4x4f;uniform bumpMatrix: mat4x4f;uniform vTangentSpaceParams: vec2f;uniform pointSize: f32;uniform alphaCutOff: f32;uniform refractionMatrix: mat4x4f;uniform vRefractionInfos: vec4f;uniform vRefractionPosition: vec3f;uniform vRefractionSize: vec3f;uniform vSpecularColor: vec4f;uniform vEmissiveColor: vec3f;uniform vDiffuseColor: vec4f;uniform vAmbientColor: vec3f;uniform cameraInfo: vec4f;uniform vTextureRepetitionHexTilingParams: vec4f;uniform vReflectionInfos: vec2f;uniform reflectionMatrix: mat4x4f;uniform vReflectionPosition: vec3f;uniform vReflectionSize: vec3f;\n#define ADDITIONAL_UBO_DECLARATION\n#include<sceneUboDeclaration>\n#include<meshUboDeclaration>\n";
e.IncludesShadersStoreWGSL[s] || (e.IncludesShadersStoreWGSL[s] = c);
var l = {
	name: s,
	shader: c
}, u = "mainUVVaryingDeclaration", d = "#ifdef MAINUV{X}\nvarying vMainUV{X}: vec2f;\n#endif\n";
e.IncludesShadersStoreWGSL[u] || (e.IncludesShadersStoreWGSL[u] = d);
var f = {
	name: u,
	shader: d
}, p = "logDepthDeclaration", m = "#ifdef LOGARITHMICDEPTH\nuniform logarithmicDepthConstant: f32;varying vFragmentDepth: f32;\n#endif\n";
e.IncludesShadersStoreWGSL[p] || (e.IncludesShadersStoreWGSL[p] = m);
var h = {
	name: p,
	shader: m
};
//#endregion
export { r as a, o as i, f as n, l as r, h as t };

//# sourceMappingURL=logDepthDeclaration-B4kYa-LJ.js.map