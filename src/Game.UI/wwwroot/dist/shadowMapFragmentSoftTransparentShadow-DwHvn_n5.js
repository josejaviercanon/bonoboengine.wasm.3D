import { t as e } from "./shaderStore-CXjvw9c2.js";
//#region node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/shadowMapFragmentSoftTransparentShadow.js
var t = "shadowMapFragmentSoftTransparentShadow", n = "#if SM_SOFTTRANSPARENTSHADOW==1\nif ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x*alpha) {discard;}\n#endif\n";
e.IncludesShadersStoreWGSL[t] || (e.IncludesShadersStoreWGSL[t] = n);
var r = {
	name: t,
	shader: n
};
//#endregion
export { r as shadowMapFragmentSoftTransparentShadowWGSL };

//# sourceMappingURL=shadowMapFragmentSoftTransparentShadow-DwHvn_n5.js.map