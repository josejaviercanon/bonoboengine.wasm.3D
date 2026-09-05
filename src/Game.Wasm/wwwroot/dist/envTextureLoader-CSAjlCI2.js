import { F as e } from "./abstractEngine-C4dI3NwB.js";
import { t } from "./logger-DQIzSR_y.js";
import { d as n } from "./lightConstants-t4r6lMWn.js";
import { a as r } from "./math.vector-BskpwSKn.js";
import { r as i } from "./math.scalar.functions-BQvmU5eh.js";
import { r as a } from "./texture-XPOS5lxO.js";
import { d as o, n as s } from "./tools-CL3QBXT6.js";
import "./scene-DOrQhig3.js";
import { o as c, r as l } from "./textureTools-DeUtSqU_.js";
import "./dumpTools-miUbe922.js";
a.prototype.forceSphericalPolynomialsRecompute = function() {
	this._texture && (this._texture._sphericalPolynomial = null, this._texture._sphericalPolynomialPromise = null, this._texture._sphericalPolynomialComputed = !1);
}, Object.defineProperty(a.prototype, "sphericalPolynomial", {
	get: function() {
		if (this._texture) {
			if (this._texture._sphericalPolynomial || this._texture._sphericalPolynomialComputed) return this._texture._sphericalPolynomial;
			if (this._texture.isReady) return this._texture._sphericalPolynomialPromise || (this._texture._sphericalPolynomialPromise = c.ConvertCubeMapTextureToSphericalPolynomial(this), this._texture._sphericalPolynomialPromise === null ? this._texture._sphericalPolynomialComputed = !0 : this._texture._sphericalPolynomialPromise.then((e) => {
				this._texture._sphericalPolynomial = e, this._texture._sphericalPolynomialComputed = !0;
			})), null;
		}
		return null;
	},
	set: function(e) {
		this._texture && (this._texture._sphericalPolynomial = e);
	},
	enumerable: !0,
	configurable: !0
});
//#endregion
//#region node_modules/@babylonjs/core/Misc/environmentTextureTools.js
var u = "image/png", d = 2, f = [
	134,
	22,
	135,
	150,
	246,
	214,
	150,
	54
];
function p(e) {
	let n = new DataView(e.buffer, e.byteOffset, e.byteLength), r = 0;
	for (let e = 0; e < f.length; e++) if (n.getUint8(r++) !== f[e]) return t.Error("Not a babylon environment map"), null;
	let i = "", a;
	for (; a = n.getUint8(r++);) i += String.fromCharCode(a);
	let o = JSON.parse(i);
	return o = m(o), o.binaryDataPosition = r, o.specular && (o.specular.lodGenerationScale = o.specular.lodGenerationScale || .8), o;
}
function m(e) {
	if (e.version > d) throw Error(`Unsupported babylon environment map version "${e.version}". Latest supported version is "${d}".`);
	return e.version === 2 || (e = {
		...e,
		version: 2,
		imageType: u
	}), e;
}
function h(e, t) {
	t = m(t);
	let n = t.specular, r = Math.log2(t.width);
	if (r = Math.round(r) + 1, n.mipmaps.length !== 6 * r) throw Error(`Unsupported specular mipmaps number "${n.mipmaps.length}"`);
	let i = Array(r);
	for (let a = 0; a < r; a++) {
		i[a] = [
			,
			,
			,
			,
			,
			,
		];
		for (let r = 0; r < 6; r++) {
			let o = n.mipmaps[a * 6 + r];
			i[a][r] = new Uint8Array(e.buffer, e.byteOffset + t.binaryDataPosition + o.position, o.length);
		}
	}
	return i;
}
function g(e, t) {
	t = m(t);
	let n = [
		,
		,
		,
		,
		,
		,
	], r = t.irradiance?.irradianceTexture;
	if (r) {
		if (r.faces.length !== 6) throw Error(`Incorrect irradiance texture faces number "${r.faces.length}"`);
		for (let i = 0; i < 6; i++) {
			let a = r.faces[i];
			n[i] = new Uint8Array(e.buffer, e.byteOffset + t.binaryDataPosition + a.position, a.length);
		}
	}
	return n;
}
function _(e, t, n) {
	n = m(n);
	let i = n.specular;
	if (!i) return Promise.resolve([]);
	e._lodGenerationScale = i.lodGenerationScale;
	let a = [], o = h(t, n);
	a.push(y(e, o, n.imageType));
	let s = n.irradiance?.irradianceTexture;
	if (s) {
		let i = g(t, n), o = null;
		n.irradiance?.irradianceTexture?.dominantDirection && (o = r.FromArray(n.irradiance.irradianceTexture.dominantDirection)), a.push(b(e, i, s.size, n.imageType, o));
	}
	return Promise.all(a);
}
async function v(e, t, n, r, i, a, o, s, c, l, u) {
	return await new Promise((d, f) => {
		if (n) {
			let n = t.createTexture(null, !0, !0, null, 1, null, (e) => {
				f(e);
			}, e);
			r?.onEffectCreatedObservable.addOnce((s) => {
				s.executeWhenCompiled(() => {
					r.externalTextureSamplerBinding = !0, r.onApply = (r) => {
						r._bindTexture("textureSampler", n), r.setFloat2("scale", 1, t._features.needsInvertingBitmap && e instanceof ImageBitmap ? -1 : 1);
					}, t.scenes.length && (t.scenes[0].postProcessManager.directRender([r], l, !0, a, o), t.restoreDefaultFramebuffer(), n.dispose(), URL.revokeObjectURL(i), d());
				});
			});
		} else {
			if (t._uploadImageToTexture(u, e, a, o), s) {
				let n = c[o];
				n && t._uploadImageToTexture(n._texture, e, a, 0);
			}
			d();
		}
	});
}
async function y(e, t, n = u) {
	let r = e.getEngine();
	e.format = 5, e.type = 0, e.generateMipMaps = !0, e._cachedAnisotropicFilteringLevel = null, r.updateTextureSamplingMode(3, e), await x(e, t, !0, n), e.isReady = !0;
}
async function b(t, n, r, i = u, o = null) {
	let s = t.getEngine(), c = new e(s, 5), l = new a(s, c);
	t._irradianceTexture = l, l._dominantDirection = o, c.isCube = !0, c.format = 5, c.type = 0, c.generateMipMaps = !0, c._cachedAnisotropicFilteringLevel = null, c.generateMipMaps = !0, c.width = r, c.height = r, s.updateTextureSamplingMode(3, c), await x(c, [n], !1, i), s.generateMipMapsForCubemap(c), c.isReady = !0;
}
async function x(t, n, r, c = u) {
	if (!s.IsExponentOfTwo(t.width)) throw Error("Texture size must be a power of two");
	let d = i(t.width) + 1, f = t.getEngine(), p = !1, m = !1, h = null, g = null, _ = null, y = f.getCaps();
	y.textureLOD ? f._features.supportRenderAndCopyToLodForFloatTextures ? y.textureHalfFloatRender && y.textureHalfFloatLinearFiltering ? (p = !0, t.type = 2) : y.textureFloatRender && y.textureFloatLinearFiltering && (p = !0, t.type = 1) : p = !1 : (p = !1, m = r);
	let b = 0;
	if (p) f.isWebGPU ? (b = 1, await import("./rgbdDecode.fragment-BdSJyJam.js")) : await import("./rgbdDecode.fragment-CeUkqH9p.js"), h = new l("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, f, !1, void 0, t.type, void 0, null, !1, void 0, b), t._isRGBD = !1, t.invertY = !1, g = f.createRenderTargetCubeTexture(t.width, {
		generateDepthBuffer: !1,
		generateMipMaps: !0,
		generateStencilBuffer: !1,
		samplingMode: 3,
		type: t.type,
		format: 5
	});
	else if (t._isRGBD = !0, t.invertY = !0, m) {
		_ = {};
		let n = t._lodGenerationScale, r = t._lodGenerationOffset;
		for (let i = 0; i < 3; i++) {
			let o = 1 - i / 2, s = r, c = (d - 1) * n + r, l = s + (c - s) * o, u = Math.round(Math.min(Math.max(l, 0), c)), p = new e(f, 2);
			p.isCube = !0, p.invertY = !0, p.generateMipMaps = !1, f.updateTextureSamplingMode(2, p);
			let m = new a(null);
			switch (m._isCube = !0, m._texture = p, _[u] = m, i) {
				case 0:
					t._lodTextureLow = m;
					break;
				case 1:
					t._lodTextureMid = m;
					break;
				case 2: t._lodTextureHigh = m;
			}
		}
	}
	let x = [];
	for (let e = 0; e < n.length; e++) for (let r = 0; r < 6; r++) {
		let i = n[e][r], a = o(i), s = new Blob([a], { type: c }), l = URL.createObjectURL(s), u;
		if (f._features.forceBitmapOverHTMLImageElement) u = f.createImageBitmap(s, {
			premultiplyAlpha: "none",
			colorSpaceConversion: "none"
		}).then(async (n) => await v(n, f, p, h, l, r, e, m, _, g, t));
		else {
			let n = new Image();
			n.src = l, u = new Promise((i, a) => {
				n.onload = () => {
					v(n, f, p, h, l, r, e, m, _, g, t).then(() => i()).catch((e) => {
						a(e);
					});
				}, n.onerror = (e) => {
					a(e);
				};
			});
		}
		x.push(u);
	}
	if (await Promise.all(x), n.length < d) {
		let e, r = 2 ** (d - 1 - n.length), i = r * r * 4;
		switch (t.type) {
			case 0:
				e = new Uint8Array(i);
				break;
			case 2:
				e = new Uint16Array(i);
				break;
			case 1: e = new Float32Array(i);
		}
		for (let r = n.length; r < d; r++) for (let n = 0; n < 6; n++) f._uploadArrayBufferViewToTexture(g?.texture || t, e, n, r);
	}
	if (g) {
		let e = t._irradianceTexture;
		t._irradianceTexture = null, f._releaseTexture(t), g._swapAndDie(t), t._irradianceTexture = e;
	}
	h && h.dispose(), m && (t._lodTextureHigh && t._lodTextureHigh._texture && (t._lodTextureHigh._texture.isReady = !0), t._lodTextureMid && t._lodTextureMid._texture && (t._lodTextureMid._texture.isReady = !0), t._lodTextureLow && t._lodTextureLow._texture && (t._lodTextureLow._texture.isReady = !0));
}
function S(e, t) {
	t = m(t);
	let i = t.irradiance;
	if (!i) return;
	let a = new n();
	r.FromArrayToRef(i.x, 0, a.x), r.FromArrayToRef(i.y, 0, a.y), r.FromArrayToRef(i.z, 0, a.z), r.FromArrayToRef(i.xx, 0, a.xx), r.FromArrayToRef(i.yy, 0, a.yy), r.FromArrayToRef(i.zz, 0, a.zz), r.FromArrayToRef(i.yz, 0, a.yz), r.FromArrayToRef(i.zx, 0, a.zx), r.FromArrayToRef(i.xy, 0, a.xy), e._sphericalPolynomial = a;
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/Textures/Loaders/envTextureLoader.js
var C = class {
	constructor() {
		this.supportCascades = !1;
	}
	loadCubeData(e, t, n, r, i) {
		if (Array.isArray(e)) return;
		let a = p(e);
		if (a) {
			t.width = a.width, t.height = a.width;
			try {
				S(t, a), _(t, e, a).then(() => {
					t.isReady = !0, t.onLoadedObservable.notifyObservers(t), t.onLoadedObservable.clear(), r && r();
				}, (e) => {
					i?.("Can not upload environment levels", e);
				});
			} catch (e) {
				i?.("Can not upload environment file", e);
			}
		} else i && i("Can not parse the environment file", null);
	}
	loadData() {
		throw ".env not supported in 2d.";
	}
};
//#endregion
export { C as _ENVTextureLoader };

//# sourceMappingURL=envTextureLoader-CSAjlCI2.js.map