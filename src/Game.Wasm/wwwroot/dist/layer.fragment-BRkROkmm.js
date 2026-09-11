import { t as e } from "./shaderStore-CXjvw9c2.js";
import { t } from "./helperFunctions-DT2snLI9.js";
//#region node_modules/@babylonjs/core/Shaders/layer.fragment.js
var n = "layerPixelShader", r = "varying vec2 vUV;uniform sampler2D textureSampler;uniform vec4 color;\n#include<helperFunctions>\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nvec4 baseColor=texture2D(textureSampler,vUV);\n#if defined(CONVERT_TO_GAMMA)\nbaseColor.rgb=toGammaSpace(baseColor.rgb);\n#elif defined(CONVERT_TO_LINEAR)\nbaseColor.rgb=toLinearSpace(baseColor.rgb);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\ngl_FragColor=baseColor*color;\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
e.ShadersStore[n] || (e.ShadersStore[n] = r);
var i = [t];
for (let t of i) e.IncludesShadersStore[t.name] || (e.IncludesShadersStore[t.name] = t.shader);
var a = {
	name: n,
	shader: r
};
//#endregion
export { a as layerPixelShader };

//# sourceMappingURL=layer.fragment-BRkROkmm.js.map