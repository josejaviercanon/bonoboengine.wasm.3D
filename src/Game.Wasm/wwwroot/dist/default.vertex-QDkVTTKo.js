import { t as e } from "./shaderStore-CXjvw9c2.js";
import { a as t, i as ee, n as te, r as ne, t as re } from "./logDepthDeclaration-DGUZR5C_.js";
import { t as ie } from "./helperFunctions-DT2snLI9.js";
//#region node_modules/@babylonjs/core/Shaders/ShadersInclude/decalVertexDeclaration.js
var n = "decalVertexDeclaration", r = "#ifdef DECAL\nuniform vec4 vDecalInfos;uniform mat4 decalMatrix;\n#endif\n";
e.IncludesShadersStore[n] || (e.IncludesShadersStore[n] = r);
var ae = {
	name: n,
	shader: r
}, i = "defaultVertexDeclaration", a = "uniform mat4 viewProjection;\n#ifdef MULTIVIEW\nmat4 viewProjectionR;\n#endif \nuniform mat4 view;\n#ifdef DIFFUSE\nuniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;\n#endif\n#ifdef AMBIENT\nuniform mat4 ambientMatrix;uniform vec2 vAmbientInfos;\n#endif\n#ifdef OPACITY\nuniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;\n#endif\n#ifdef EMISSIVE\nuniform vec2 vEmissiveInfos;uniform mat4 emissiveMatrix;\n#endif\n#ifdef LIGHTMAP\nuniform vec2 vLightmapInfos;uniform mat4 lightmapMatrix;\n#endif\n#if defined(SPECULAR) && defined(SPECULARTERM)\nuniform vec2 vSpecularInfos;uniform mat4 specularMatrix;\n#endif\n#ifdef BUMP\nuniform vec3 vBumpInfos;uniform mat4 bumpMatrix;\n#endif\n#ifdef REFLECTION\nuniform mat4 reflectionMatrix;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n#ifdef DETAIL\nuniform vec4 vDetailInfos;uniform mat4 detailMatrix;\n#endif\nuniform vec4 cameraInfo;uniform vec4 vTextureRepetitionHexTilingParams;\n#include<decalVertexDeclaration>\n#define ADDITIONAL_VERTEX_DECLARATION\n";
e.IncludesShadersStore[i] || (e.IncludesShadersStore[i] = a);
var oe = {
	name: i,
	shader: a
}, o = "uvAttributeDeclaration", s = "#ifdef UV{X}\nattribute vec2 uv{X};\n#endif\n";
e.IncludesShadersStore[o] || (e.IncludesShadersStore[o] = s);
var se = {
	name: o,
	shader: s
}, c = "bonesDeclaration", l = "#if NUM_BONE_INFLUENCERS>0\nattribute vec4 matricesIndices;attribute vec4 matricesWeights;\n#if NUM_BONE_INFLUENCERS>4\nattribute vec4 matricesIndicesExtra;attribute vec4 matricesWeightsExtra;\n#endif\n#ifndef BAKED_VERTEX_ANIMATION_TEXTURE\n#ifdef BONETEXTURE\nuniform highp sampler2D boneSampler;uniform vec2 boneTextureInfo;\n#else\nuniform mat4 mBones[BonesPerMesh];\n#endif\n#ifdef BONES_VELOCITY_ENABLED\nuniform mat4 mPreviousBones[BonesPerMesh];\n#endif\n#ifdef BONETEXTURE\n#define inline\nmat4 readMatrixFromRawSampler(sampler2D smp,float index)\n{\n#if defined(WEBGL2) || defined(WEBGPU)\nint offset=int(index)*4; \nint textureWidth=int(boneTextureInfo.x);int y=int(offset)/textureWidth;int x=int(offset) % textureWidth;vec4 m0=texelFetch(smp,ivec2(x+0,y),0);vec4 m1=texelFetch(smp,ivec2(x+1,y),0);vec4 m2=texelFetch(smp,ivec2(x+2,y),0);vec4 m3=texelFetch(smp,ivec2(x+3,y),0);return mat4(m0,m1,m2,m3);\n#else\nfloat offset=index*4.0;float y=floor(offset/boneTextureInfo.x);float x=offset-y*boneTextureInfo.x;float dy=1.0/boneTextureInfo.y;float dx=1.0/boneTextureInfo.x;vec4 m0=texture2D(smp,vec2(dx*(x+0.5),dy*(y+0.5)));vec4 m1=texture2D(smp,vec2(dx*(x+1.5),dy*(y+0.5)));vec4 m2=texture2D(smp,vec2(dx*(x+2.5),dy*(y+0.5)));vec4 m3=texture2D(smp,vec2(dx*(x+3.5),dy*(y+0.5))); \nreturn mat4(m0,m1,m2,m3);\n#endif\n}\n#endif\n#endif\n#endif\n";
e.IncludesShadersStore[c] || (e.IncludesShadersStore[c] = l);
var ce = {
	name: c,
	shader: l
}, u = "bakedVertexAnimationDeclaration", d = "#ifdef BAKED_VERTEX_ANIMATION_TEXTURE\nuniform float bakedVertexAnimationTime;\n#if !defined(WEBGL2) && !defined(WEBGPU)\nuniform vec2 bakedVertexAnimationTextureSizeInverted;\n#endif\nuniform vec4 bakedVertexAnimationSettings;uniform sampler2D bakedVertexAnimationTexture;\n#ifdef INSTANCES\nattribute vec4 bakedVertexAnimationSettingsInstanced;\n#endif\n#define inline\nmat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)\n{\n#if defined(WEBGL2) || defined(WEBGPU)\nint offset=int(index)*4;int frameUV=int(frame);vec4 m0=texelFetch(smp,ivec2(offset+0,frameUV),0);vec4 m1=texelFetch(smp,ivec2(offset+1,frameUV),0);vec4 m2=texelFetch(smp,ivec2(offset+2,frameUV),0);vec4 m3=texelFetch(smp,ivec2(offset+3,frameUV),0);return mat4(m0,m1,m2,m3);\n#else\nfloat offset=index*4.0;float frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;float dx=bakedVertexAnimationTextureSizeInverted.x;vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));return mat4(m0,m1,m2,m3);\n#endif\n}\n#endif\n";
e.IncludesShadersStore[u] || (e.IncludesShadersStore[u] = d);
var le = {
	name: u,
	shader: d
}, f = "instancesDeclaration", p = "#ifdef INSTANCES\nattribute vec4 world0;attribute vec4 world1;attribute vec4 world2;attribute vec4 world3;\n#ifdef INSTANCESCOLOR\nattribute vec4 instanceColor;\n#endif\n#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)\nuniform mat4 world;\n#endif\n#if defined(VELOCITY) || defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)\nattribute vec4 previousWorld0;attribute vec4 previousWorld1;attribute vec4 previousWorld2;attribute vec4 previousWorld3;\n#ifdef THIN_INSTANCES\nuniform mat4 previousWorld;\n#endif\n#endif\n#else\n#if !defined(WORLD_UBO)\nuniform mat4 world;\n#endif\n#if defined(VELOCITY) || defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)\nuniform mat4 previousWorld;\n#endif\n#endif\n";
e.IncludesShadersStore[f] || (e.IncludesShadersStore[f] = p);
var ue = {
	name: f,
	shader: p
}, m = "prePassVertexDeclaration", h = "#ifdef PREPASS\n#ifdef PREPASS_LOCAL_POSITION\nvarying vec3 vPosition;\n#endif\n#ifdef PREPASS_DEPTH\nvarying vec3 vViewPos;\n#endif\n#ifdef PREPASS_NORMALIZED_VIEW_DEPTH\nvarying float vNormViewDepth;\n#endif\n#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)\nuniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;\n#endif\n#endif\n";
e.IncludesShadersStore[m] || (e.IncludesShadersStore[m] = h);
var de = {
	name: m,
	shader: h
}, g = "samplerVertexDeclaration", fe = "#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0\nvarying vec2 v_VARYINGNAME_UV;\n#endif\n";
e.IncludesShadersStore[g] || (e.IncludesShadersStore[g] = fe);
var pe = {
	name: g,
	shader: fe
}, _ = "bumpVertexDeclaration", me = "#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)\n#if defined(TANGENT) && defined(NORMAL) \nvarying mat3 vTBN;\n#endif\n#endif\n";
e.IncludesShadersStore[_] || (e.IncludesShadersStore[_] = me);
var he = {
	name: _,
	shader: me
}, v = "clipPlaneVertexDeclaration", y = "#ifdef CLIPPLANE\nuniform vec4 vClipPlane;varying float fClipDistance;\n#endif\n#ifdef CLIPPLANE2\nuniform vec4 vClipPlane2;varying float fClipDistance2;\n#endif\n#ifdef CLIPPLANE3\nuniform vec4 vClipPlane3;varying float fClipDistance3;\n#endif\n#ifdef CLIPPLANE4\nuniform vec4 vClipPlane4;varying float fClipDistance4;\n#endif\n#ifdef CLIPPLANE5\nuniform vec4 vClipPlane5;varying float fClipDistance5;\n#endif\n#ifdef CLIPPLANE6\nuniform vec4 vClipPlane6;varying float fClipDistance6;\n#endif\n";
e.IncludesShadersStore[v] || (e.IncludesShadersStore[v] = y);
var ge = {
	name: v,
	shader: y
}, b = "fogVertexDeclaration", x = "#ifdef FOG\nvarying vec3 vFogDistance;\n#endif\n";
e.IncludesShadersStore[b] || (e.IncludesShadersStore[b] = x);
var _e = {
	name: b,
	shader: x
}, S = "lightVxFragmentDeclaration", C = "#ifdef LIGHT{X}\nuniform vec4 vLightData{X};uniform vec4 vLightDiffuse{X};\n#ifdef SPECULARTERM\nuniform vec4 vLightSpecular{X};\n#else\nvec4 vLightSpecular{X}=vec4(0.);\n#endif\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};\n#elif defined(SHADOWCUBE{X})\n#else\nvarying vec4 vPositionFromLight{X};varying float vDepthMetric{X};uniform mat4 lightMatrix{X};\n#endif\nuniform vec4 shadowsInfo{X};uniform vec2 depthValues{X};\n#endif\n#ifdef SPOTLIGHT{X}\nuniform vec4 vLightDirection{X};uniform vec4 vLightFalloff{X};\n#elif defined(POINTLIGHT{X})\nuniform vec4 vLightFalloff{X};\n#elif defined(HEMILIGHT{X})\nuniform vec3 vLightGround{X};\n#endif\n#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)\nuniform vec4 vLightWidth{X};uniform vec4 vLightHeight{X};\n#endif\n#endif\n";
e.IncludesShadersStore[S] || (e.IncludesShadersStore[S] = C);
var ve = {
	name: S,
	shader: C
}, w = "lightVxUboDeclaration", T = "#ifdef LIGHT{X}\nuniform Light{X}\n{vec4 vLightData;vec4 vLightDiffuse;vec4 vLightSpecular;\n#ifdef SPOTLIGHT{X}\nvec4 vLightDirection;vec4 vLightFalloff;\n#elif defined(POINTLIGHT{X})\nvec4 vLightFalloff;\n#elif defined(HEMILIGHT{X})\nvec3 vLightGround;\n#elif defined(CLUSTLIGHT{X})\nvec2 vSliceData;vec2 vSliceRanges[CLUSTLIGHT_SLICES];\n#endif\n#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)\nvec4 vLightWidth;vec4 vLightHeight;\n#endif\nvec4 shadowsInfo;vec2 depthValues;} light{X};\n#ifdef SHADOW{X}\n#ifdef SHADOWCSM{X}\nuniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];varying vec4 vPositionFromCamera{X};\n#elif defined(SHADOWCUBE{X})\n#else\nvarying vec4 vPositionFromLight{X};varying float vDepthMetric{X};uniform mat4 lightMatrix{X};\n#endif\n#endif\n#endif\n";
e.IncludesShadersStore[w] || (e.IncludesShadersStore[w] = T);
var ye = {
	name: w,
	shader: T
}, E = "morphTargetsVertexGlobalDeclaration", D = "#ifdef MORPHTARGETS\nuniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];\n#ifdef MORPHTARGETS_TEXTURE \nuniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];uniform vec3 morphTargetTextureInfo;uniform highp sampler2DArray morphTargets;vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)\n{ \n#if defined(WEBGL2) || defined(WEBGPU)\nint textureWidth=int(morphTargetTextureInfo.y);int y=int(vertexIndex)/textureWidth;int x=int(vertexIndex) % textureWidth;return texelFetch(morphTargets,ivec3(x,y,int(morphTargetTextureIndices[targetIndex])),0).xyz;\n#else\nfloat y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV).xyz;\n#endif\n}\nvec4 readVector4FromRawSampler(int targetIndex,float vertexIndex)\n{ \n#if defined(WEBGL2) || defined(WEBGPU)\nint textureWidth=int(morphTargetTextureInfo.y);int y=int(vertexIndex)/textureWidth;int x=int(vertexIndex) % textureWidth;return texelFetch(morphTargets,ivec3(x,y,int(morphTargetTextureIndices[targetIndex])),0);\n#else\nfloat y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV);\n#endif\n}\n#endif\n#endif\n";
e.IncludesShadersStore[E] || (e.IncludesShadersStore[E] = D);
var be = {
	name: E,
	shader: D
}, O = "morphTargetsVertexDeclaration", k = "#ifdef MORPHTARGETS\n#ifndef MORPHTARGETS_TEXTURE\n#ifdef MORPHTARGETS_POSITION\nattribute vec3 position{X};\n#endif\n#ifdef MORPHTARGETS_NORMAL\nattribute vec3 normal{X};\n#endif\n#ifdef MORPHTARGETS_TANGENT\nattribute vec3 tangent{X};\n#endif\n#ifdef MORPHTARGETS_UV\nattribute vec2 uv_{X};\n#endif\n#ifdef MORPHTARGETS_UV2\nattribute vec2 uv2_{X};\n#endif\n#ifdef MORPHTARGETS_COLOR\nattribute vec4 color{X};\n#endif\n#elif {X}==0\nuniform float morphTargetCount;\n#endif\n#endif\n";
e.IncludesShadersStore[O] || (e.IncludesShadersStore[O] = k);
var xe = {
	name: O,
	shader: k
}, A = "morphTargetsVertexGlobal", j = "#ifdef MORPHTARGETS\n#ifdef MORPHTARGETS_TEXTURE\nfloat vertexID;\n#endif\n#endif\n";
e.IncludesShadersStore[A] || (e.IncludesShadersStore[A] = j);
var Se = {
	name: A,
	shader: j
}, M = "morphTargetsVertex", N = "#ifdef MORPHTARGETS\n#ifdef MORPHTARGETS_TEXTURE\n#if {X}==0\nfor (int i=0; i<NUM_MORPH_INFLUENCERS; i++) {if (float(i)>=morphTargetCount) break;vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;\n#ifdef MORPHTARGETS_POSITION\npositionUpdated+=(readVector3FromRawSampler(i,vertexID)-position)*morphTargetInfluences[i];\n#endif\n#ifdef MORPHTARGETTEXTURE_HASPOSITIONS\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_NORMAL\nnormalUpdated+=(readVector3FromRawSampler(i,vertexID) -normal)*morphTargetInfluences[i];\n#endif\n#ifdef MORPHTARGETTEXTURE_HASNORMALS\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_UV\nuvUpdated+=(readVector3FromRawSampler(i,vertexID).xy-uv)*morphTargetInfluences[i];\n#endif\n#ifdef MORPHTARGETTEXTURE_HASUVS\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_TANGENT\ntangentUpdated.xyz+=(readVector3FromRawSampler(i,vertexID) -tangent.xyz)*morphTargetInfluences[i];\n#endif\n#ifdef MORPHTARGETTEXTURE_HASTANGENTS\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_UV2\nuv2Updated+=(readVector3FromRawSampler(i,vertexID).xy-uv2)*morphTargetInfluences[i];\n#endif\n#ifdef MORPHTARGETTEXTURE_HASUV2S\nvertexID+=1.0;\n#endif\n#ifdef MORPHTARGETS_COLOR\ncolorUpdated+=(readVector4FromRawSampler(i,vertexID)-color)*morphTargetInfluences[i];\n#endif\n}\n#endif\n#else\n#ifdef MORPHTARGETS_POSITION\npositionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_NORMAL\nnormalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_TANGENT\ntangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_UV\nuvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_UV2\nuv2Updated+=(uv2_{X}-uv2)*morphTargetInfluences[{X}];\n#endif\n#ifdef MORPHTARGETS_COLOR\ncolorUpdated+=(color{X}-color)*morphTargetInfluences[{X}];\n#endif\n#endif\n#endif\n";
e.IncludesShadersStore[M] || (e.IncludesShadersStore[M] = N);
var Ce = {
	name: M,
	shader: N
}, P = "instancesVertex", F = "#ifdef INSTANCES\nmat4 finalWorld=mat4(world0,world1,world2,world3);\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)\nmat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,\npreviousWorld2,previousWorld3);\n#endif\n#ifdef THIN_INSTANCES\nfinalWorld=world*finalWorld;\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)\nfinalPreviousWorld=previousWorld*finalPreviousWorld;\n#endif\n#endif\n#else\nmat4 finalWorld=world;\n#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)\nmat4 finalPreviousWorld=previousWorld;\n#endif\n#endif\n";
e.IncludesShadersStore[P] || (e.IncludesShadersStore[P] = F);
var we = {
	name: P,
	shader: F
}, I = "bonesVertex", L = "#ifndef BAKED_VERTEX_ANIMATION_TEXTURE\n#if NUM_BONE_INFLUENCERS>0\nmat4 influence;\n#ifdef BONETEXTURE\ninfluence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\ninfluence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];\n#endif\n#else\ninfluence=mBones[int(matricesIndices[0])]*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\ninfluence+=mBones[int(matricesIndices[1])]*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\ninfluence+=mBones[int(matricesIndices[2])]*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\ninfluence+=mBones[int(matricesIndices[3])]*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\ninfluence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\ninfluence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\ninfluence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\ninfluence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];\n#endif\n#endif\nfinalWorld=finalWorld*influence;\n#endif\n#endif\n";
e.IncludesShadersStore[I] || (e.IncludesShadersStore[I] = L);
var Te = {
	name: I,
	shader: L
}, R = "bakedVertexAnimation", z = "#ifdef BAKED_VERTEX_ANIMATION_TEXTURE\n{\n#ifdef INSTANCES\n#define BVASNAME bakedVertexAnimationSettingsInstanced\n#else\n#define BVASNAME bakedVertexAnimationSettings\n#endif\nfloat VATStartFrame=BVASNAME.x;float VATEndFrame=BVASNAME.y;float VATOffsetFrame=BVASNAME.z;float VATSpeed=BVASNAME.w;float totalFrames=VATEndFrame-VATStartFrame+1.0;float time=bakedVertexAnimationTime*VATSpeed/totalFrames;float frameCorrection=time<1.0 ? 0.0 : 1.0;float numOfFrames=totalFrames-frameCorrection;float VATFrameNum=fract(time)*numOfFrames;VATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);VATFrameNum=floor(VATFrameNum);VATFrameNum+=VATStartFrame+frameCorrection;mat4 VATInfluence;VATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];\n#endif\n#if NUM_BONE_INFLUENCERS>2\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];\n#endif\n#if NUM_BONE_INFLUENCERS>3\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];\n#endif\n#if NUM_BONE_INFLUENCERS>5\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];\n#endif\n#if NUM_BONE_INFLUENCERS>6\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];\n#endif\n#if NUM_BONE_INFLUENCERS>7\nVATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];\n#endif\nfinalWorld=finalWorld*VATInfluence;}\n#endif\n";
e.IncludesShadersStore[R] || (e.IncludesShadersStore[R] = z);
var Ee = {
	name: R,
	shader: z
}, B = "prePassVertex", V = "#ifdef PREPASS_DEPTH\nvViewPos=(view*worldPos).rgb;\n#endif\n#ifdef PREPASS_NORMALIZED_VIEW_DEPTH\nvNormViewDepth=((view*worldPos).z-cameraInfo.x)/(cameraInfo.y-cameraInfo.x);\n#endif\n#ifdef PREPASS_LOCAL_POSITION\nvPosition=positionUpdated.xyz;\n#endif\n#if (defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)) && defined(BONES_VELOCITY_ENABLED)\nvCurrentPosition=viewProjection*worldPos;\n#if NUM_BONE_INFLUENCERS>0\nmat4 previousInfluence;previousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];\n#if NUM_BONE_INFLUENCERS>1\npreviousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];\n#endif \n#if NUM_BONE_INFLUENCERS>2\npreviousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];\n#endif \n#if NUM_BONE_INFLUENCERS>3\npreviousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];\n#endif\n#if NUM_BONE_INFLUENCERS>4\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];\n#endif \n#if NUM_BONE_INFLUENCERS>5\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];\n#endif \n#if NUM_BONE_INFLUENCERS>6\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];\n#endif \n#if NUM_BONE_INFLUENCERS>7\npreviousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];\n#endif\nvPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);\n#else\nvPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);\n#endif\n#endif\n";
e.IncludesShadersStore[B] || (e.IncludesShadersStore[B] = V);
var De = {
	name: B,
	shader: V
}, H = "uvVariableDeclaration", U = "#if !defined(UV{X}) && defined(MAINUV{X})\nvec2 uv{X}=vec2(0.,0.);\n#endif\n#ifdef MAINUV{X}\nvMainUV{X}=uv{X};\n#endif\n";
e.IncludesShadersStore[H] || (e.IncludesShadersStore[H] = U);
var Oe = {
	name: H,
	shader: U
}, W = "samplerVertexImplementation", G = "#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0\nif (v_INFONAME_==0.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uvUpdated,1.0,0.0));}\n#ifdef UV2\nelse if (v_INFONAME_==1.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv2Updated,1.0,0.0));}\n#endif\n#ifdef UV3\nelse if (v_INFONAME_==2.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv3,1.0,0.0));}\n#endif\n#ifdef UV4\nelse if (v_INFONAME_==3.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv4,1.0,0.0));}\n#endif\n#ifdef UV5\nelse if (v_INFONAME_==4.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv5,1.0,0.0));}\n#endif\n#ifdef UV6\nelse if (v_INFONAME_==5.)\n{v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv6,1.0,0.0));}\n#endif\n#endif\n";
e.IncludesShadersStore[W] || (e.IncludesShadersStore[W] = G);
var ke = {
	name: W,
	shader: G
}, K = "bumpVertex", Ae = "#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)\n#if defined(TANGENT) && defined(NORMAL)\nvec3 tbnNormal=normalize(normalUpdated);vec3 tbnTangent=normalize(tangentUpdated.xyz);vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);\n#endif\n#endif\n";
e.IncludesShadersStore[K] || (e.IncludesShadersStore[K] = Ae);
var je = {
	name: K,
	shader: Ae
}, q = "clipPlaneVertex", Me = "#ifdef CLIPPLANE\nfClipDistance=dot(worldPos,vClipPlane);\n#endif\n#ifdef CLIPPLANE2\nfClipDistance2=dot(worldPos,vClipPlane2);\n#endif\n#ifdef CLIPPLANE3\nfClipDistance3=dot(worldPos,vClipPlane3);\n#endif\n#ifdef CLIPPLANE4\nfClipDistance4=dot(worldPos,vClipPlane4);\n#endif\n#ifdef CLIPPLANE5\nfClipDistance5=dot(worldPos,vClipPlane5);\n#endif\n#ifdef CLIPPLANE6\nfClipDistance6=dot(worldPos,vClipPlane6);\n#endif\n";
e.IncludesShadersStore[q] || (e.IncludesShadersStore[q] = Me);
var Ne = {
	name: q,
	shader: Me
}, J = "fogVertex", Pe = "#ifdef FOG\nvFogDistance=(view*worldPos).xyz;\n#endif\n";
e.IncludesShadersStore[J] || (e.IncludesShadersStore[J] = Pe);
var Fe = {
	name: J,
	shader: Pe
}, Y = "shadowsVertex", Ie = "#ifdef SHADOWS\n#if defined(SHADOWCSM{X})\nvPositionFromCamera{X}=view*worldPos;for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) {vPositionFromLight{X}[i]=lightMatrix{X}[i]*worldPos;\n#ifdef USE_REVERSE_DEPTHBUFFER\nvDepthMetric{X}[i]=(-vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#else\nvDepthMetric{X}[i]=(vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#endif\n}\n#elif defined(SHADOW{X}) && !defined(SHADOWCUBE{X})\nvPositionFromLight{X}=lightMatrix{X}*worldPos;\n#ifdef USE_REVERSE_DEPTHBUFFER\nvDepthMetric{X}=(-vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#else\nvDepthMetric{X}=(vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;\n#endif\n#endif\n#endif\n";
e.IncludesShadersStore[Y] || (e.IncludesShadersStore[Y] = Ie);
var Le = {
	name: Y,
	shader: Ie
}, X = "vertexColorMixing", Re = "#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nvColor=vec4(1.0);\n#ifdef VERTEXCOLOR\n#ifdef VERTEXALPHA\nvColor*=colorUpdated;\n#else\nvColor.rgb*=colorUpdated.rgb;\n#endif\n#endif\n#ifdef INSTANCESCOLOR\nvColor*=instanceColor;\n#endif\n#endif\n";
e.IncludesShadersStore[X] || (e.IncludesShadersStore[X] = Re);
var ze = {
	name: X,
	shader: Re
}, Z = "pointCloudVertex", Be = "#if defined(POINTSIZE) && !defined(WEBGPU)\ngl_PointSize=pointSize;\n#endif\n";
e.IncludesShadersStore[Z] || (e.IncludesShadersStore[Z] = Be);
var Ve = {
	name: Z,
	shader: Be
}, Q = "logDepthVertex", He = "#ifdef LOGARITHMICDEPTH\nvFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;\n#endif\n";
e.IncludesShadersStore[Q] || (e.IncludesShadersStore[Q] = He);
var Ue = {
	name: Q,
	shader: He
}, $ = "defaultVertexShader", We = "#define CUSTOM_VERTEX_EXTENSION\n#include<__decl__defaultVertex>\n#define CUSTOM_VERTEX_BEGIN\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef TANGENT\nattribute vec4 tangent;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#include<uvAttributeDeclaration>[2..7]\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<helperFunctions>\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\n#include<instancesDeclaration>\n#include<prePassVertexDeclaration>\n#include<mainUVVaryingDeclaration>[1..7]\n#include<samplerVertexDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse)\n#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)\n#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)\n#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)\n#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)\n#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)\n#if defined(SPECULARTERM)\n#include<samplerVertexDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular)\n#endif\n#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)\n#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nvarying vec4 vColor;\n#endif\n#include<bumpVertexDeclaration>\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightVxFragment>[0..maxSimultaneousLights]\n#include<morphTargetsVertexGlobalDeclaration>\n#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]\n#ifdef REFLECTIONMAP_SKYBOX\nvarying vec3 vPositionUVW;\n#endif\n#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)\nvarying vec3 vDirectionW;\n#endif\n#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0\nvarying float vViewDepth;\n#endif\n#include<logDepthDeclaration>\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\nvec3 positionUpdated=position;\n#ifdef NORMAL\nvec3 normalUpdated=normal;\n#endif\n#ifdef TANGENT\nvec4 tangentUpdated=tangent;\n#endif\n#ifdef UV1\nvec2 uvUpdated=uv;\n#endif\n#ifdef UV2\nvec2 uv2Updated=uv2;\n#endif\n#ifdef VERTEXCOLOR\nvec4 colorUpdated=color;\n#endif\n#include<morphTargetsVertexGlobal>\n#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]\n#ifdef REFLECTIONMAP_SKYBOX\nvPositionUVW=positionUpdated;\n#endif\n#define CUSTOM_VERTEX_UPDATE_POSITION\n#define CUSTOM_VERTEX_UPDATE_NORMAL\n#include<instancesVertex>\n#if defined(PREPASS) && ((defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)) && !defined(BONES_VELOCITY_ENABLED)\nvCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);\n#endif\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nvec4 worldPos=finalWorld*vec4(positionUpdated,1.0);\n#ifdef NORMAL\nmat3 normalWorld=mat3(finalWorld);\n#if defined(INSTANCES) && defined(THIN_INSTANCES)\nvNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));vNormalW=normalize(normalWorld*vNormalW);\n#else\n#ifdef NONUNIFORMSCALING\nnormalWorld=transposeMat3(inverseMat3(normalWorld));\n#endif\nvNormalW=normalize(normalWorld*normalUpdated);\n#endif\n#endif\n#define CUSTOM_VERTEX_UPDATE_WORLDPOS\n#ifdef MULTIVIEW\nif (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}\n#else\ngl_Position=viewProjection*worldPos;\n#endif\nvPositionW=vec3(worldPos);\n#ifdef PREPASS\n#include<prePassVertex>\n#endif\n#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)\nvDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));\n#endif\n#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0\n#ifdef RIGHT_HANDED\nvViewDepth=-(view*worldPos).z;\n#else\nvViewDepth=(view*worldPos).z;\n#endif\n#endif\n#ifndef UV1\nvec2 uvUpdated=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2Updated=vec2(0.,0.);\n#endif\n#ifdef MAINUV1\nvMainUV1=uvUpdated;\n#endif\n#ifdef MAINUV2\nvMainUV2=uv2Updated;\n#endif\n#include<uvVariableDeclaration>[3..7]\n#include<samplerVertexImplementation>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_MATRIXNAME_,diffuse,_INFONAME_,DiffuseInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)\n#if defined(SPECULARTERM)\n#include<samplerVertexImplementation>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_MATRIXNAME_,specular,_INFONAME_,SpecularInfos.x)\n#endif\n#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)\n#include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)\n#include<bumpVertex>\n#include<clipPlaneVertex>\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n#include<vertexColorMixing>\n#include<pointCloudVertex>\n#include<logDepthVertex>\n#define CUSTOM_VERTEX_MAIN_END\n}\n";
e.ShadersStore[$] || (e.ShadersStore[$] = We);
var Ge = [
	ae,
	oe,
	t,
	ee,
	ne,
	se,
	ie,
	ce,
	le,
	ue,
	de,
	te,
	pe,
	he,
	ge,
	_e,
	ve,
	ye,
	be,
	xe,
	re,
	Se,
	Ce,
	we,
	Te,
	Ee,
	De,
	Oe,
	ke,
	je,
	Ne,
	Fe,
	Le,
	ze,
	Ve,
	Ue
];
for (let t of Ge) e.IncludesShadersStore[t.name] || (e.IncludesShadersStore[t.name] = t.shader);
var Ke = {
	name: $,
	shader: We
};
//#endregion
export { Ke as defaultVertexShader };

//# sourceMappingURL=default.vertex-QDkVTTKo.js.map