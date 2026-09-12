import { t as e } from "./shaderStore-CXjvw9c2.js";
import { a as t, i as n, n as r, o as i, r as a, s as o, t as s } from "./clipPlaneVertex-C7nmPQ-E.js";
import { n as c, t as l } from "./meshUboDeclaration-CngvDj28.js";
import { t as u } from "./helperFunctions-DT2snLI9.js";
import { i as d, n as f, r as p, t as m } from "./morphTargetsVertex-BaK3QguC.js";
//#region node_modules/@babylonjs/core/Shaders/ShadersInclude/sceneVertexDeclaration.js
var h = "sceneVertexDeclaration", g = "uniform mat4 viewProjection;\n#ifdef MULTIVIEW\nuniform mat4 viewProjectionR;\n#endif\nuniform mat4 view;uniform mat4 projection;uniform vec4 vEyePosition;\n";
e.IncludesShadersStore[h] || (e.IncludesShadersStore[h] = g);
var _ = {
	name: h,
	shader: g
}, v = "meshVertexDeclaration", y = "uniform mat4 world;uniform float visibility;\n";
e.IncludesShadersStore[v] || (e.IncludesShadersStore[v] = y);
var b = {
	name: v,
	shader: y
}, x = "shadowMapVertexDeclaration", S = "#include<sceneVertexDeclaration>\n#include<meshVertexDeclaration>\n";
e.IncludesShadersStore[x] || (e.IncludesShadersStore[x] = S);
var C = {
	name: x,
	shader: S
}, w = "shadowMapUboDeclaration", T = "layout(std140,column_major) uniform;\n#include<sceneUboDeclaration>\n#include<meshUboDeclaration>\n";
e.IncludesShadersStore[w] || (e.IncludesShadersStore[w] = T);
var E = {
	name: w,
	shader: T
}, D = "shadowMapVertexExtraDeclaration", O = "#if SM_NORMALBIAS==1\nuniform vec3 lightDataSM;\n#endif\nuniform vec3 biasAndScaleSM;uniform vec2 depthValuesSM;varying float vDepthMetricSM;\n#if SM_USEDISTANCE==1\nvarying vec3 vPositionWSM;\n#endif\n#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1\nvarying float zSM;\n#endif\n";
e.IncludesShadersStore[D] || (e.IncludesShadersStore[D] = O);
var k = {
	name: D,
	shader: O
}, A = "shadowMapVertexNormalBias", j = "#if SM_NORMALBIAS==1\n#if SM_DIRECTIONINLIGHTDATA==1\nvec3 worldLightDirSM=normalize(-lightDataSM.xyz);\n#else\nvec3 directionToLightSM=lightDataSM.xyz-worldPos.xyz;vec3 worldLightDirSM=normalize(directionToLightSM);\n#endif\nfloat ndlSM=dot(vNormalW,worldLightDirSM);float sinNLSM=sqrt(1.0-ndlSM*ndlSM);float normalBiasSM=biasAndScaleSM.y*sinNLSM;worldPos.xyz-=vNormalW*normalBiasSM;\n#endif\n";
e.IncludesShadersStore[A] || (e.IncludesShadersStore[A] = j);
var M = {
	name: A,
	shader: j
}, N = "shadowMapVertexMetric", P = "#if SM_USEDISTANCE==1\nvPositionWSM=worldPos.xyz;\n#endif\n#if SM_DEPTHTEXTURE==1\n#ifdef IS_NDC_HALF_ZRANGE\n#define BIASFACTOR 0.5\n#else\n#define BIASFACTOR 1.0\n#endif\n#ifdef USE_REVERSE_DEPTHBUFFER\ngl_Position.z-=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;\n#else\ngl_Position.z+=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;\n#endif\n#endif\n#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1\nzSM=gl_Position.z;gl_Position.z=0.0;\n#elif SM_USEDISTANCE==0\n#ifdef USE_REVERSE_DEPTHBUFFER\nvDepthMetricSM=(-gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;\n#else\nvDepthMetricSM=(gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;\n#endif\n#endif\n";
e.IncludesShadersStore[N] || (e.IncludesShadersStore[N] = P);
var F = {
	name: N,
	shader: P
}, I = "shadowMapVertexShader", L = "attribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\n#include<morphTargetsVertexGlobalDeclaration>\n#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]\n#ifdef INSTANCES\nattribute vec4 world0;attribute vec4 world1;attribute vec4 world2;attribute vec4 world3;\n#endif\n#include<helperFunctions>\n#include<__decl__shadowMapVertex>\n#ifdef ALPHATEXTURE\nvarying vec2 vUV;uniform mat4 diffuseMatrix;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#endif\n#include<shadowMapVertexExtraDeclaration>\n#include<clipPlaneVertexDeclaration>\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void)\n{vec3 positionUpdated=position;\n#ifdef UV1\nvec2 uvUpdated=uv;\n#endif\n#ifdef UV2\nvec2 uv2Updated=uv2;\n#endif\n#ifdef NORMAL\nvec3 normalUpdated=normal;\n#endif\n#include<morphTargetsVertexGlobal>\n#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]\n#include<instancesVertex>\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nvec4 worldPos=finalWorld*vec4(positionUpdated,1.0);\n#ifdef NORMAL\nmat3 normWorldSM=mat3(finalWorld);\n#if defined(INSTANCES) && defined(THIN_INSTANCES)\nvec3 vNormalW=normalUpdated/vec3(dot(normWorldSM[0],normWorldSM[0]),dot(normWorldSM[1],normWorldSM[1]),dot(normWorldSM[2],normWorldSM[2]));vNormalW=normalize(normWorldSM*vNormalW);\n#else\n#ifdef NONUNIFORMSCALING\nnormWorldSM=transposeMat3(inverseMat3(normWorldSM));\n#endif\nvec3 vNormalW=normalize(normWorldSM*normalUpdated);\n#endif\n#endif\n#include<shadowMapVertexNormalBias>\ngl_Position=viewProjection*worldPos;\n#include<shadowMapVertexMetric>\n#ifdef ALPHATEXTURE\n#ifdef UV1\nvUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));\n#endif\n#ifdef UV2\nvUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));\n#endif\n#endif\n#include<clipPlaneVertex>\n}";
e.ShadersStore[I] || (e.ShadersStore[I] = L);
var R = [
	o,
	i,
	d,
	p,
	u,
	_,
	b,
	C,
	c,
	l,
	E,
	k,
	t,
	f,
	m,
	n,
	a,
	r,
	M,
	F,
	s
];
for (let t of R) e.IncludesShadersStore[t.name] || (e.IncludesShadersStore[t.name] = t.shader);
var z = {
	name: I,
	shader: L
};
//#endregion
export { z as shadowMapVertexShader };

//# sourceMappingURL=shadowMap.vertex-Z1IwBM2o.js.map