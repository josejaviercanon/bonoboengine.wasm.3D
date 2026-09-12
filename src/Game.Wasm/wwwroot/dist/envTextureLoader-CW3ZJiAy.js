import { t as e } from "./internalTexture-BAv1VWAH.js";
import { t } from "./logger-DQIzSR_y.js";
import { s as n } from "./thinEngine.pure-VEB8Fxe7.js";
import { u as r } from "./math.color.pure-DY3Xz9Wt.js";
import { n as i } from "./math.scalar.functions-DcC_Ew_o.js";
import { t as a } from "./baseTexture.pure-trvdITlt.js";
import { n as o } from "./sphericalPolynomial.pure-BcS1xpZz.js";
import { f as s } from "./tools.pure-C-hH3Ika.js";
import { t as c } from "./postProcess.pure-CrXYWp4P.js";
import { t as l } from "./cubemapToSphericalPolynomial-BrdoDd_Y.js";
//#region node_modules/@babylonjs/core/Misc/environmentTextureTools.pure.js
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
async function x(t, r, o, l = u) {
	if (!n(t.width)) throw Error("Texture size must be a power of two");
	let d = i(t.width) + 1, f = t.getEngine(), p = !1, m = !1, h = null, g = null, _ = null, y = f.getCaps();
	y.textureLOD ? f._features.supportRenderAndCopyToLodForFloatTextures ? y.textureHalfFloatRender && y.textureHalfFloatLinearFiltering ? (p = !0, t.type = 2) : y.textureFloatRender && y.textureFloatLinearFiltering && (p = !0, t.type = 1) : p = !1 : (p = !1, m = o);
	let b = 0;
	if (p) f.isWebGPU ? (b = 1, await import("./rgbdDecode.fragment-CKa8YGsB.js")) : await import("./rgbdDecode.fragment-zGWpG1jY.js"), h = new c("rgbdDecode", "rgbdDecode", null, null, 1, null, 3, f, !1, void 0, t.type, void 0, null, !1, void 0, b), t._isRGBD = !1, t.invertY = !1, g = f.createRenderTargetCubeTexture(t.width, {
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
	for (let e = 0; e < r.length; e++) for (let n = 0; n < 6; n++) {
		let i = r[e][n], a = s(i), o = new Blob([a], { type: l }), c = URL.createObjectURL(o), u;
		if (f._features.forceBitmapOverHTMLImageElement) u = f.createImageBitmap(o, {
			premultiplyAlpha: "none",
			colorSpaceConversion: "none"
		}).then(async (r) => await v(r, f, p, h, c, n, e, m, _, g, t));
		else {
			let r = new Image();
			r.src = c, u = new Promise((i, a) => {
				r.onload = () => {
					v(r, f, p, h, c, n, e, m, _, g, t).then(() => i()).catch((e) => {
						a(e);
					});
				}, r.onerror = (e) => {
					a(e);
				};
			});
		}
		x.push(u);
	}
	if (await Promise.all(x), r.length < d) {
		let e, n = 2 ** (d - 1 - r.length), i = n * n * 4;
		switch (t.type) {
			case 0:
				e = new Uint8Array(i);
				break;
			case 2:
				e = new Uint16Array(i);
				break;
			case 1: e = new Float32Array(i);
		}
		for (let n = r.length; n < d; n++) for (let r = 0; r < 6; r++) f._uploadArrayBufferViewToTexture(g?.texture || t, e, r, n);
	}
	if (g) {
		let e = t._irradianceTexture;
		t._irradianceTexture = null, f._releaseTexture(t), g._swapAndDie(t), t._irradianceTexture = e;
	}
	h && h.dispose(), m && (t._lodTextureHigh && t._lodTextureHigh._texture && (t._lodTextureHigh._texture.isReady = !0), t._lodTextureMid && t._lodTextureMid._texture && (t._lodTextureMid._texture.isReady = !0), t._lodTextureLow && t._lodTextureLow._texture && (t._lodTextureLow._texture.isReady = !0));
}
function S(e, t) {
	t = m(t);
	let n = t.irradiance;
	if (!n) return;
	let i = new o();
	r.FromArrayToRef(n.x, 0, i.x), r.FromArrayToRef(n.y, 0, i.y), r.FromArrayToRef(n.z, 0, i.z), r.FromArrayToRef(n.xx, 0, i.xx), r.FromArrayToRef(n.yy, 0, i.yy), r.FromArrayToRef(n.zz, 0, i.zz), r.FromArrayToRef(n.yz, 0, i.yz), r.FromArrayToRef(n.zx, 0, i.zx), r.FromArrayToRef(n.xy, 0, i.xy), e._sphericalPolynomial = i;
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/Textures/baseTexture.polynomial.pure.js
var C = !1;
function w() {
	C || (C = !0, a.prototype._sphericalPolynomialTargetSize = 0, a.prototype.forceSphericalPolynomialsRecompute = function() {
		this._texture && (this._texture._sphericalPolynomial = null, this._texture._sphericalPolynomialPromise = null, this._texture._sphericalPolynomialComputed = !1);
	}, Object.defineProperty(a.prototype, "sphericalPolynomial", {
		get: function() {
			if (this._texture) {
				if (this._texture._sphericalPolynomial || this._texture._sphericalPolynomialComputed) return this._texture._sphericalPolynomial;
				if (this._texture.isReady) return this._texture._sphericalPolynomialPromise || (this._texture._sphericalPolynomialPromise = l.ConvertCubeMapTextureToSphericalPolynomial(this), this._texture._sphericalPolynomialPromise === null ? this._texture._sphericalPolynomialComputed = !0 : this._texture._sphericalPolynomialPromise.then((e) => {
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
	}));
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/Textures/Loaders/envTextureLoader.js
var T = class {
	constructor() {
		this.supportCascades = !1;
	}
	loadCubeData(e, t, n, r, i) {
		if (Array.isArray(e)) return;
		let a = p(e);
		if (a) {
			t.width = a.width, t.height = a.width;
			try {
				w(), S(t, a), _(t, e, a).then(() => {
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
export { T as _ENVTextureLoader };

//# sourceMappingURL=envTextureLoader-CW3ZJiAy.js.map