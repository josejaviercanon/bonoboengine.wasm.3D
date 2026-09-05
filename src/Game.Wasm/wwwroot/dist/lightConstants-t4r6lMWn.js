import { n as e, r as t } from "./performanceConfigurator-DKR9RfNv.js";
import { F as n, N as r, d as i, f as a, j as o, k as s, o as c, r as l, t as u } from "./abstractEngine-C4dI3NwB.js";
import { a as d, i as f, r as p, t as m } from "./thinEngine-U-D1z5pZ.js";
import { t as h } from "./logger-DQIzSR_y.js";
import { a as g, r as _ } from "./math.vector-BskpwSKn.js";
import { r as v, s as y } from "./texture-XPOS5lxO.js";
import { r as b } from "./drawWrapper-B2Z7Hhiz.js";
import { n as ee } from "./tools-CL3QBXT6.js";
//#region node_modules/@babylonjs/core/Misc/performanceMonitor.js
var te = class {
	constructor(e = 30) {
		this._enabled = !0, this._rollingFrameTime = new x(e);
	}
	sampleFrame(e = l.Now) {
		if (this._enabled) {
			if (this._lastFrameTimeMs != null) {
				let t = e - this._lastFrameTimeMs;
				this._rollingFrameTime.add(t);
			}
			this._lastFrameTimeMs = e;
		}
	}
	get averageFrameTime() {
		return this._rollingFrameTime.average;
	}
	get averageFrameTimeVariance() {
		return this._rollingFrameTime.variance;
	}
	get instantaneousFrameTime() {
		return this._rollingFrameTime.history(0);
	}
	get averageFPS() {
		return 1e3 / this._rollingFrameTime.average;
	}
	get instantaneousFPS() {
		let e = this._rollingFrameTime.history(0);
		return e === 0 ? 0 : 1e3 / e;
	}
	get isSaturated() {
		return this._rollingFrameTime.isSaturated();
	}
	enable() {
		this._enabled = !0;
	}
	disable() {
		this._enabled = !1, this._lastFrameTimeMs = null;
	}
	get isEnabled() {
		return this._enabled;
	}
	reset() {
		this._lastFrameTimeMs = null, this._rollingFrameTime.reset();
	}
}, x = class {
	constructor(e) {
		this._samples = Array(e), this.reset();
	}
	add(e) {
		let t;
		if (this.isSaturated()) {
			let e = this._samples[this._pos];
			t = e - this.average, this.average -= t / (this._sampleCount - 1), this._m2 -= t * (e - this.average);
		} else this._sampleCount++;
		t = e - this.average, this.average += t / this._sampleCount, this._m2 += t * (e - this.average), this.variance = this._m2 / (this._sampleCount - 1), this._samples[this._pos] = e, this._pos++, this._pos %= this._samples.length;
	}
	history(e) {
		if (e >= this._sampleCount || e >= this._samples.length) return 0;
		let t = this._wrapPosition(this._pos - 1);
		return this._samples[this._wrapPosition(t - e)];
	}
	isSaturated() {
		return this._sampleCount >= this._samples.length;
	}
	reset() {
		this.average = 0, this.variance = 0, this._sampleCount = 0, this._pos = 0, this._m2 = 0;
	}
	_wrapPosition(e) {
		let t = this._samples.length;
		return (e % t + t) % t;
	}
};
m.prototype.setAlphaMode = function(e, t = !1, n = 0) {
	if (this._alphaMode[n] === e) {
		if (!t) {
			let t = e === 0;
			this.depthCullingState.depthMask !== t && (this.depthCullingState.depthMask = t);
		}
		return;
	}
	let r = e === 0;
	this._alphaState.setAlphaBlend(!r, n), this._alphaState.setAlphaMode(e, n), t || (this.depthCullingState.depthMask = r), this._alphaMode[n] = e;
}, m.prototype.updateRawTexture = function(e, t, n, r, i = null, a = 0, o = !1) {
	if (!e) return;
	let s = this._getRGBABufferInternalSizedFormat(a, n, o), c = this._getInternalFormat(n), l = this._getWebGLTextureType(a);
	this._bindTextureDirectly(this._gl.TEXTURE_2D, e, !0), this._unpackFlipY(r === void 0 || !!r), this._doNotHandleContextLost || (e._bufferView = t, e.format = n, e.type = a, e.invertY = r, e._compression = i), e.width % 4 != 0 && this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1), i && t ? this._gl.compressedTexImage2D(this._gl.TEXTURE_2D, 0, this.getCaps().s3tc[i], e.width, e.height, 0, t) : this._gl.texImage2D(this._gl.TEXTURE_2D, 0, s, e.width, e.height, 0, c, l, t), e.generateMipMaps && this._gl.generateMipmap(this._gl.TEXTURE_2D), this._bindTextureDirectly(this._gl.TEXTURE_2D, null), e.isReady = !0;
}, m.prototype.createRawTexture = function(e, t, r, i, a, o, s, c = null, l = 0, u = 0, d = !1) {
	let f = new n(this, 3);
	f.baseWidth = t, f.baseHeight = r, f.width = t, f.height = r, f.format = i, f.generateMipMaps = a, f.samplingMode = s, f.invertY = o, f._compression = c, f.type = l, f._useSRGBBuffer = this._getUseSRGBBuffer(d, !a), this._doNotHandleContextLost || (f._bufferView = e), this.updateRawTexture(f, e, i, o, c, l, f._useSRGBBuffer), this._bindTextureDirectly(this._gl.TEXTURE_2D, f, !0);
	let p = this._getSamplingParameters(s, a);
	return this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, p.mag), this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, p.min), a && this._gl.generateMipmap(this._gl.TEXTURE_2D), this._bindTextureDirectly(this._gl.TEXTURE_2D, null), this._internalTexturesCache.push(f), f;
}, m.prototype.createRawCubeTexture = function(e, t, r, i, o, s, c, l = null) {
	let u = this._gl, d = new n(this, 8);
	d.isCube = !0, d.format = r, d.type = i, this._doNotHandleContextLost || (d._bufferViewArray = e);
	let f = this._getWebGLTextureType(i), p = this._getInternalFormat(r);
	p === u.RGB && (p = u.RGBA), f === u.FLOAT && !this._caps.textureFloatLinearFiltering ? (o = !1, c = 1, h.Warn("Float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.")) : f === this._gl.HALF_FLOAT_OES && !this._caps.textureHalfFloatLinearFiltering ? (o = !1, c = 1, h.Warn("Half float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.")) : f === u.FLOAT && !this._caps.textureFloatRender ? (o = !1, h.Warn("Render to float textures is not supported. Mipmap generation forced to false.")) : f === u.HALF_FLOAT && !this._caps.colorBufferFloat && (o = !1, h.Warn("Render to half float textures is not supported. Mipmap generation forced to false."));
	let m = t, g = m;
	if (d.width = m, d.height = g, d.invertY = s, d._compression = l, !this.needPOTTextures || a(d.width) && a(d.height) || (o = !1), e) this.updateRawCubeTexture(d, e, r, i, s, l);
	else {
		let e = this._getRGBABufferInternalSizedFormat(i);
		this._bindTextureDirectly(u.TEXTURE_CUBE_MAP, d, !0);
		for (let t = 0; t < 6; t++) l ? u.compressedTexImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, this.getCaps().s3tc[l], d.width, d.height, 0, void 0) : u.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, e, d.width, d.height, 0, p, f, null);
		this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
	}
	this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, d, !0), e && o && this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
	let _ = this._getSamplingParameters(c, o);
	return u.texParameteri(u.TEXTURE_CUBE_MAP, u.TEXTURE_MAG_FILTER, _.mag), u.texParameteri(u.TEXTURE_CUBE_MAP, u.TEXTURE_MIN_FILTER, _.min), u.texParameteri(u.TEXTURE_CUBE_MAP, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE), u.texParameteri(u.TEXTURE_CUBE_MAP, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE), this._bindTextureDirectly(u.TEXTURE_CUBE_MAP, null), d.generateMipMaps = o, d.samplingMode = c, d.isReady = !0, d;
}, m.prototype.updateRawCubeTexture = function(e, t, n, r, i, o = null, s = 0) {
	e._bufferViewArray = t, e.format = n, e.type = r, e.invertY = i, e._compression = o;
	let c = this._gl, l = this._getWebGLTextureType(r), u = this._getInternalFormat(n), d = this._getRGBABufferInternalSizedFormat(r), f = !1;
	u === c.RGB && (u = c.RGBA, f = !0), this._bindTextureDirectly(c.TEXTURE_CUBE_MAP, e, !0), this._unpackFlipY(i === void 0 || !!i), e.width % 4 != 0 && c.pixelStorei(c.UNPACK_ALIGNMENT, 1);
	for (let n = 0; n < 6; n++) {
		let i = t[n];
		o ? c.compressedTexImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + n, s, this.getCaps().s3tc[o], e.width, e.height, 0, i) : (f && (i = S(i, e.width, e.height, r)), c.texImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + n, s, d, e.width, e.height, 0, u, l, i));
	}
	(!this.needPOTTextures || a(e.width) && a(e.height)) && e.generateMipMaps && s === 0 && this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP), this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null), e.isReady = !0;
}, m.prototype.createRawCubeTextureFromUrl = function(e, t, n, r, i, a, o, s, c = null, l = null, u = 3, d = !1) {
	let f = this._gl, p = this.createRawCubeTexture(null, n, r, i, !a, d, u, null);
	t?.addPendingData(p), p.url = e, p.isReady = !1, this._internalTexturesCache.push(p);
	let m = (e, n) => {
		t?.removePendingData(p), l && l(e ? e.status + " " + e.statusText : "Failed to parse texture data", n);
	}, h = async (e) => {
		if (!p._hardwareTexture) return;
		let n = o(e);
		if (!n) return;
		let a = n instanceof Promise ? await n : n, l = p.width;
		if (s) {
			let e = this._getWebGLTextureType(i), t = this._getInternalFormat(r), n = this._getRGBABufferInternalSizedFormat(i), o = !1;
			t === f.RGB && (t = f.RGBA, o = !0), this._bindTextureDirectly(f.TEXTURE_CUBE_MAP, p, !0), this._unpackFlipY(!1);
			let c = s(a);
			for (let r = 0; r < c.length; r++) {
				let a = l >> r;
				for (let s = 0; s < 6; s++) {
					let l = c[r][s];
					o && (l = S(l, a, a, i)), f.texImage2D(s, r, n, a, a, 0, t, e, l);
				}
			}
			this._bindTextureDirectly(f.TEXTURE_CUBE_MAP, null);
		} else this.updateRawCubeTexture(p, a, r, i, d);
		p.isReady = !0, t?.removePendingData(p), p.onLoadedObservable.notifyObservers(p), p.onLoadedObservable.clear(), c && c();
	};
	return this._loadFile(e, (e) => {
		h(e).catch((e) => {
			m(void 0, e);
		});
	}, void 0, t?.offlineProvider, !0, m), p;
};
function S(e, t, n, r) {
	let i, a = 1;
	r === 1 ? i = new Float32Array(t * n * 4) : r === 2 ? (i = new Uint16Array(t * n * 4), a = 15360) : i = r === 7 ? new Uint32Array(t * n * 4) : new Uint8Array(t * n * 4);
	for (let r = 0; r < t; r++) for (let o = 0; o < n; o++) {
		let n = (o * t + r) * 3, s = (o * t + r) * 4;
		i[s + 0] = e[n + 0], i[s + 1] = e[n + 1], i[s + 2] = e[n + 2], i[s + 3] = a;
	}
	return i;
}
function C(e) {
	return function(t, r, i, a, o, s, c, l, u = null, d = 0) {
		let f = e ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY, p = e ? 10 : 11, m = new n(this, p);
		m.baseWidth = r, m.baseHeight = i, m.baseDepth = a, m.width = r, m.height = i, m.depth = a, m.format = o, m.type = d, m.generateMipMaps = s, m.samplingMode = l, e ? m.is3D = !0 : m.is2DArray = !0, this._doNotHandleContextLost || (m._bufferView = t), e ? this.updateRawTexture3D(m, t, o, c, u, d) : this.updateRawTexture2DArray(m, t, o, c, u, d), this._bindTextureDirectly(f, m, !0);
		let h = this._getSamplingParameters(l, s);
		return this._gl.texParameteri(f, this._gl.TEXTURE_MAG_FILTER, h.mag), this._gl.texParameteri(f, this._gl.TEXTURE_MIN_FILTER, h.min), s && this._gl.generateMipmap(f), this._bindTextureDirectly(f, null), this._internalTexturesCache.push(m), m;
	};
}
m.prototype.createRawTexture2DArray = C(!1), m.prototype.createRawTexture3D = C(!0);
function w(e) {
	return function(t, n, r, i, a = null, o = 0) {
		let s = e ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY, c = this._getWebGLTextureType(o), l = this._getInternalFormat(r), u = this._getRGBABufferInternalSizedFormat(o, r);
		this._bindTextureDirectly(s, t, !0), this._unpackFlipY(i === void 0 || !!i), this._doNotHandleContextLost || (t._bufferView = n, t.format = r, t.invertY = i, t._compression = a), t.width % 4 != 0 && this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1), a && n ? this._gl.compressedTexImage3D(s, 0, this.getCaps().s3tc[a], t.width, t.height, t.depth, 0, n) : this._gl.texImage3D(s, 0, u, t.width, t.height, t.depth, 0, l, c, n), t.generateMipMaps && this._gl.generateMipmap(s), this._bindTextureDirectly(s, null), t.isReady = !0;
	};
}
m.prototype.updateRawTexture2DArray = w(!1), m.prototype.updateRawTexture3D = w(!0), m.prototype._readTexturePixelsSync = function(e, t, n, r = -1, i = 0, a = null, o = !0, c = !1, l = 0, u = 0) {
	let d = this._gl;
	if (!d) throw Error("Engine does not have gl rendering context.");
	if (!this._dummyFramebuffer) {
		let e = d.createFramebuffer();
		if (!e) throw Error("Unable to create dummy framebuffer");
		this._dummyFramebuffer = e;
	}
	d.bindFramebuffer(d.FRAMEBUFFER, this._dummyFramebuffer), r > -1 && (e.is2DArray || e.is3D) ? d.framebufferTextureLayer(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, e._hardwareTexture?.underlyingResource, i, r) : r > -1 ? d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_CUBE_MAP_POSITIVE_X + r, e._hardwareTexture?.underlyingResource, i) : d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, e._hardwareTexture?.underlyingResource, i);
	let f = e.type === void 0 ? d.UNSIGNED_BYTE : this._getWebGLTextureType(e.type);
	if (c) a ||= s(e.type, 4 * t * n);
	else switch (f) {
		case d.UNSIGNED_BYTE:
			a ||= new Uint8Array(4 * t * n), f = d.UNSIGNED_BYTE;
			break;
		default: a ||= new Float32Array(4 * t * n), f = d.FLOAT;
	}
	return o && this.flushFramebuffer(), d.readPixels(l, u, t, n, d.RGBA, f, a), d.bindFramebuffer(d.FRAMEBUFFER, this._currentFramebuffer), a;
}, m.prototype._readTexturePixels = function(e, t, n, r = -1, i = 0, a = null, o = !0, s = !1, c = 0, l = 0) {
	return Promise.resolve(this._readTexturePixelsSync(e, t, n, r, i, a, o, s, c, l));
}, m.prototype.updateDynamicIndexBuffer = function(e, t, n = 0) {
	this._currentBoundBuffer[this._gl.ELEMENT_ARRAY_BUFFER] = null, this.bindIndexBuffer(e);
	let r;
	r = e.is32Bits ? t instanceof Uint32Array ? t : new Uint32Array(t) : t instanceof Uint16Array ? t : new Uint16Array(t), this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, r, this._gl.DYNAMIC_DRAW), this._resetIndexBufferBinding();
}, m.prototype.updateDynamicVertexBuffer = function(e, t, n, r) {
	this.bindArrayBuffer(e), n === void 0 && (n = 0);
	let i = t.byteLength || t.length;
	r === void 0 || r >= i && n === 0 ? t instanceof Array ? this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, new Float32Array(t)) : this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, t) : t instanceof Array ? this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, new Float32Array(t).subarray(0, r / 4)) : (t = ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, r) : new Uint8Array(t, 0, r), this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, t)), this._resetVertexBufferBinding();
}, m.prototype._createDepthStencilCubeTexture = function(e, t) {
	let r = new n(this, 12);
	if (r.isCube = !0, this.webGLVersion === 1) return h.Error("Depth cube texture is not supported by WebGL 1."), r;
	let i = {
		bilinearFiltering: !1,
		comparisonFunction: 0,
		generateStencil: !1,
		...t
	}, a = this._gl;
	this._bindTextureDirectly(a.TEXTURE_CUBE_MAP, r, !0), this._setupDepthStencilTexture(r, e, i.bilinearFiltering, i.comparisonFunction);
	for (let t = 0; t < 6; t++) i.generateStencil ? a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, a.DEPTH24_STENCIL8, e, e, 0, a.DEPTH_STENCIL, a.UNSIGNED_INT_24_8, null) : a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, a.DEPTH_COMPONENT24, e, e, 0, a.DEPTH_COMPONENT, a.UNSIGNED_INT, null);
	return this._bindTextureDirectly(a.TEXTURE_CUBE_MAP, null), this._internalTexturesCache.push(r), r;
}, m.prototype._setCubeMapTextureParams = function(e, t, n) {
	let r = this._gl;
	r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_MIN_FILTER, t ? r.LINEAR_MIPMAP_LINEAR : r.LINEAR), r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), e.samplingMode = t ? 3 : 2, t && this.getCaps().textureMaxLevel && n !== void 0 && n > 0 && (r.texParameteri(r.TEXTURE_CUBE_MAP, r.TEXTURE_MAX_LEVEL, n), e._maxLodLevel = n), this._bindTextureDirectly(r.TEXTURE_CUBE_MAP, null);
}, m.prototype.createCubeTexture = function(e, t, n, r, a = null, o = null, s, c = null, l = !1, u = 0, d = 0, f = null, p, m = !1, g = null) {
	let _ = this._gl;
	return this.createCubeTextureBase(e, t, n, !!r, a, o, s, c, l, u, d, f, (e) => this._bindTextureDirectly(_.TEXTURE_CUBE_MAP, e, !0), (e, t) => {
		let n = this.needPOTTextures ? i(t[0].width, this._caps.maxCubemapTextureSize) : t[0].width, o = n, c = [
			_.TEXTURE_CUBE_MAP_POSITIVE_X,
			_.TEXTURE_CUBE_MAP_POSITIVE_Y,
			_.TEXTURE_CUBE_MAP_POSITIVE_Z,
			_.TEXTURE_CUBE_MAP_NEGATIVE_X,
			_.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			_.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];
		this._bindTextureDirectly(_.TEXTURE_CUBE_MAP, e, !0), this._unpackFlipY(!1);
		let l = s ? this._getInternalFormat(s, e._useSRGBBuffer) : e._useSRGBBuffer ? this._glSRGBExtensionValues.SRGB8_ALPHA8 : _.RGBA, u = s ? this._getInternalFormat(s) : _.RGBA;
		e._useSRGBBuffer && this.webGLVersion === 1 && (u = l);
		for (let e = 0; e < c.length; e++) if (t[e].width !== n || t[e].height !== o) {
			if (this._prepareWorkingCanvas(), !this._workingCanvas || !this._workingContext) {
				h.Warn("Cannot create canvas to resize texture.");
				return;
			}
			this._workingCanvas.width = n, this._workingCanvas.height = o, this._workingContext.drawImage(t[e], 0, 0, t[e].width, t[e].height, 0, 0, n, o), _.texImage2D(c[e], 0, l, u, _.UNSIGNED_BYTE, this._workingCanvas);
		} else _.texImage2D(c[e], 0, l, u, _.UNSIGNED_BYTE, t[e]);
		r || _.generateMipmap(_.TEXTURE_CUBE_MAP), this._setCubeMapTextureParams(e, !r), e.width = n, e.height = o, e.isReady = !0, s && (e.format = s), e.onLoadedObservable.notifyObservers(e), e.onLoadedObservable.clear(), a && a();
	}, !!m, g);
}, m.prototype.generateMipMapsForCubemap = function(e, t = !0) {
	if (e.generateMipMaps) {
		let n = this._gl;
		this._bindTextureDirectly(n.TEXTURE_CUBE_MAP, e, !0), n.generateMipmap(n.TEXTURE_CUBE_MAP), t && this._bindTextureDirectly(n.TEXTURE_CUBE_MAP, null);
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Engines/renderTargetWrapper.js
var ne = class {
	get depthStencilTexture() {
		return this._depthStencilTexture;
	}
	setDepthStencilTexture(e, t = !0) {
		t && this._depthStencilTexture && this._depthStencilTexture.dispose(), this._depthStencilTexture = e, this._generateDepthBuffer = this._generateStencilBuffer = this._depthStencilTextureWithStencil = !1, e && (this._generateDepthBuffer = !0, this._generateStencilBuffer = this._depthStencilTextureWithStencil = p(e.format));
	}
	get depthStencilTextureWithStencil() {
		return this._depthStencilTextureWithStencil;
	}
	get isCube() {
		return this._isCube;
	}
	get isMulti() {
		return this._isMulti;
	}
	get is2DArray() {
		return this.layers > 0;
	}
	get is3D() {
		return this.depth > 0;
	}
	get size() {
		return this.width;
	}
	get width() {
		return this._size.width ?? this._size;
	}
	get height() {
		return this._size.height ?? this._size;
	}
	get layers() {
		return this._size.layers || 0;
	}
	get depth() {
		return this._size.depth || 0;
	}
	get texture() {
		return this._textures?.[0] ?? null;
	}
	get textures() {
		return this._textures;
	}
	get faceIndices() {
		return this._faceIndices;
	}
	get layerIndices() {
		return this._layerIndices;
	}
	getBaseArrayLayer(e) {
		if (!this._textures) return -1;
		let t = this._textures[e], n = this._layerIndices?.[e] ?? 0, r = this._faceIndices?.[e] ?? 0;
		return t.isCube ? n * 6 + r : t.is3D ? 0 : n;
	}
	get samples() {
		return this._samples;
	}
	setSamples(e, t = !0, n = !1) {
		if (this.samples === e && !n) return e;
		let r = this._isMulti ? this._engine.updateMultipleRenderTargetTextureSampleCount(this, e, t) : this._engine.updateRenderTargetTextureSampleCount(this, e);
		return this._samples = e, r;
	}
	resolveMSAATextures() {
		this.isMulti ? this._engine.resolveMultiFramebuffer(this) : this._engine.resolveFramebuffer(this);
	}
	generateMipMaps() {
		this._engine._currentRenderTarget === this && (this.isMulti ? this._engine.unBindMultiColorAttachmentFramebuffer(this, !0) : this._engine.unBindFramebuffer(this, !0)), this.isMulti ? this._engine.generateMipMapsMultiFramebuffer(this) : this._engine.generateMipMapsFramebuffer(this);
	}
	constructor(e, t, n, r, i) {
		this._textures = null, this._faceIndices = null, this._layerIndices = null, this._samples = 1, this._attachments = null, this._generateStencilBuffer = !1, this._generateDepthBuffer = !1, this._depthStencilTextureWithStencil = !1, this.disableAutomaticMSAAResolve = !1, this.resolveMSAAColors = !0, this.resolveMSAADepth = !1, this.resolveMSAAStencil = !1, this.depthReadOnly = !1, this.stencilReadOnly = !1, this._isMulti = e, this._isCube = t, this._size = n, this._engine = r, this._depthStencilTexture = null, this.label = i;
	}
	setTextures(e) {
		this._textures = Array.isArray(e) ? e : e ? [e] : null;
	}
	setTexture(e, t = 0, n = !0) {
		this._textures ||= [], this._textures[t] !== e && (this._textures[t] && n && this._textures[t].dispose(), this._textures[t] = e);
	}
	setLayerAndFaceIndices(e, t) {
		this._layerIndices = e, this._faceIndices = t;
	}
	setLayerAndFaceIndex(e = 0, t, n) {
		this._layerIndices ||= [], this._faceIndices ||= [], t !== void 0 && t >= 0 && (this._layerIndices[e] = t), n !== void 0 && n >= 0 && (this._faceIndices[e] = n);
	}
	createDepthStencilTexture(e = 0, t = !0, n = !1, r = 1, i = 14, a) {
		return this._depthStencilTexture?.dispose(), this._depthStencilTextureWithStencil = n, this._depthStencilTextureLabel = a, this._depthStencilTexture = this._engine.createDepthStencilTexture(this._size, {
			bilinearFiltering: t,
			comparisonFunction: e,
			generateStencil: n,
			isCube: this._isCube,
			samples: r,
			depthTextureFormat: i,
			label: a
		}, this), this._depthStencilTexture;
	}
	_shareDepth(e) {
		this.shareDepth(e);
	}
	shareDepth(e) {
		this._depthStencilTexture && (e._depthStencilTexture && e._depthStencilTexture.dispose(), e._depthStencilTexture = this._depthStencilTexture, e._depthStencilTextureWithStencil = this._depthStencilTextureWithStencil, this._depthStencilTexture.incrementReferences());
	}
	_swapAndDie(e) {
		this.texture && this.texture._swapAndDie(e), this._textures = null, this.dispose(!0);
	}
	_cloneRenderTargetWrapper() {
		let e = null;
		if (this._isMulti) {
			let t = this.textures;
			if (t && t.length > 0) {
				let n = !1, r = t.length, i = -1, a = t[t.length - 1]._source;
				(a === 14 || a === 12) && (n = !0, i = t[t.length - 1].format, r--);
				let o = [], s = [], c = [], l = [], u = [], d = [], f = [], p = {};
				for (let e = 0; e < r; ++e) {
					let n = t[e];
					o.push(n.samplingMode), s.push(n.type), c.push(n.format), p[n.uniqueId] === void 0 ? (p[n.uniqueId] = e, n.is2DArray ? (l.push(35866), f.push(n.depth)) : n.isCube ? (l.push(34067), f.push(0)) : n.is3D ? (l.push(32879), f.push(n.depth)) : (l.push(3553), f.push(0))) : (l.push(-1), f.push(0)), this._faceIndices && u.push(this._faceIndices[e] ?? 0), this._layerIndices && d.push(this._layerIndices[e] ?? 0);
				}
				let m = {
					samplingModes: o,
					generateMipMaps: t[0].generateMipMaps,
					generateDepthBuffer: this._generateDepthBuffer,
					generateStencilBuffer: this._generateStencilBuffer,
					generateDepthTexture: n,
					depthTextureFormat: i,
					types: s,
					formats: c,
					textureCount: r,
					targetTypes: l,
					faceIndex: u,
					layerIndex: d,
					layerCounts: f,
					label: this.label
				}, h = {
					width: this.width,
					height: this.height,
					depth: this.depth
				};
				e = this._engine.createMultipleRenderTarget(h, m);
				for (let n = 0; n < r; ++n) {
					if (l[n] !== -1) continue;
					let r = p[t[n].uniqueId];
					e.setTexture(e.textures[r], n);
				}
			}
		} else {
			let t = {};
			if (t.generateDepthBuffer = this._generateDepthBuffer, t.generateMipMaps = this.texture?.generateMipMaps ?? !1, t.generateStencilBuffer = this._generateStencilBuffer, t.samplingMode = this.texture?.samplingMode, t.type = this.texture?.type, t.format = this.texture?.format, t.noColorAttachment = !this._textures, t.label = this.label, this.isCube) e = this._engine.createRenderTargetCubeTexture(this.width, t);
			else {
				let n = {
					width: this.width,
					height: this.height,
					layers: this.is2DArray || this.is3D ? this.texture?.depth : void 0
				};
				e = this._engine.createRenderTargetTexture(n, t);
			}
			e.texture && (e.texture.isReady = !0);
		}
		return e;
	}
	_swapRenderTargetWrapper(e) {
		if (this._textures && e._textures) for (let t = 0; t < this._textures.length; ++t) this._textures[t]._swapAndDie(e._textures[t], !1), e._textures[t].isReady = !0;
		this._depthStencilTexture && e._depthStencilTexture && (this._depthStencilTexture._swapAndDie(e._depthStencilTexture), e._depthStencilTexture.isReady = !0), this._textures = null, this._depthStencilTexture = null;
	}
	_rebuild() {
		let e = this._cloneRenderTargetWrapper();
		if (e) {
			if (this._depthStencilTexture) {
				let t = this._depthStencilTexture.samplingMode, n = this._depthStencilTexture.format, r = t === 2 || t === 3 || t === 11;
				e.createDepthStencilTexture(this._depthStencilTexture._comparisonFunction, r, this._depthStencilTextureWithStencil, this._depthStencilTexture.samples, n, this._depthStencilTextureLabel);
			}
			this.samples > 1 && e.setSamples(this.samples), e._swapRenderTargetWrapper(this), e.dispose();
		}
	}
	releaseTextures() {
		if (this._textures) for (let e = 0; e < this._textures.length; ++e) this._textures[e].dispose();
		this._textures = null;
	}
	dispose(e = !1) {
		e || (this._depthStencilTexture?.dispose(), this._depthStencilTexture = null, this.releaseTextures()), this._engine._releaseRenderTargetWrapper(this);
	}
}, re = class extends ne {
	setDepthStencilTexture(e, t = !0) {
		if (super.setDepthStencilTexture(e, t), !e) return;
		let n = this._engine, r = this._context, i = e._hardwareTexture;
		if (i && e._autoMSAAManagement && this._MSAAFramebuffer) {
			let t = n._currentFramebuffer;
			n._bindUnboundFramebuffer(this._MSAAFramebuffer), r.framebufferRenderbuffer(r.FRAMEBUFFER, p(e.format) ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT, r.RENDERBUFFER, i.getMSAARenderBuffer()), n._bindUnboundFramebuffer(t);
		}
	}
	constructor(e, t, n, r, i) {
		super(e, t, n, r), this._framebuffer = null, this._depthStencilBuffer = null, this._MSAAFramebuffer = null, this._colorTextureArray = null, this._depthStencilTextureArray = null, this._disposeOnlyFramebuffers = !1, this._currentLOD = 0, this._context = i;
	}
	_cloneRenderTargetWrapper() {
		let e;
		return this._colorTextureArray && this._depthStencilTextureArray ? (e = this._engine.createMultiviewRenderTargetTexture(this.width, this.height), e.texture.isReady = !0) : e = super._cloneRenderTargetWrapper(), e;
	}
	_swapRenderTargetWrapper(e) {
		super._swapRenderTargetWrapper(e), e._framebuffer = this._framebuffer, e._depthStencilBuffer = this._depthStencilBuffer, e._MSAAFramebuffer = this._MSAAFramebuffer, e._colorTextureArray = this._colorTextureArray, e._depthStencilTextureArray = this._depthStencilTextureArray, this._framebuffer = this._depthStencilBuffer = this._MSAAFramebuffer = this._colorTextureArray = this._depthStencilTextureArray = null;
	}
	createDepthStencilTexture(e = 0, t = !0, n = !1, r = 1, i = 14, a) {
		if (this._depthStencilBuffer) {
			let e = this._engine, t = e._currentFramebuffer, n = this._context;
			e._bindUnboundFramebuffer(this._framebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, null), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.RENDERBUFFER, null), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.STENCIL_ATTACHMENT, n.RENDERBUFFER, null), e._bindUnboundFramebuffer(t), n.deleteRenderbuffer(this._depthStencilBuffer), this._depthStencilBuffer = null;
		}
		return super.createDepthStencilTexture(e, t, n, r, i, a);
	}
	shareDepth(e) {
		super.shareDepth(e);
		let t = this._context, n = this._depthStencilBuffer, r = e._MSAAFramebuffer || e._framebuffer, i = this._engine;
		e._depthStencilBuffer && e._depthStencilBuffer !== n && t.deleteRenderbuffer(e._depthStencilBuffer), e._depthStencilBuffer = n;
		let a = e._generateStencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT;
		i._bindUnboundFramebuffer(r), t.framebufferRenderbuffer(t.FRAMEBUFFER, a, t.RENDERBUFFER, n), i._bindUnboundFramebuffer(null);
	}
	_bindTextureRenderTarget(e, t = 0, n, r = 0) {
		let i = e._hardwareTexture;
		if (!i) return;
		let a = this._framebuffer, o = this._engine, s = o._currentFramebuffer;
		o._bindUnboundFramebuffer(a);
		let c;
		if (o.webGLVersion > 1) {
			let a = this._context;
			c = a["COLOR_ATTACHMENT" + t], e.is2DArray || e.is3D ? (n = n ?? this.layerIndices?.[t] ?? 0, a.framebufferTextureLayer(a.FRAMEBUFFER, c, i.underlyingResource, r, n)) : e.isCube ? (n = n ?? this.faceIndices?.[t] ?? 0, a.framebufferTexture2D(a.FRAMEBUFFER, c, a.TEXTURE_CUBE_MAP_POSITIVE_X + n, i.underlyingResource, r)) : a.framebufferTexture2D(a.FRAMEBUFFER, c, a.TEXTURE_2D, i.underlyingResource, r);
		} else {
			let e = this._context;
			c = e["COLOR_ATTACHMENT" + t + "_WEBGL"];
			let a = n === void 0 ? e.TEXTURE_2D : e.TEXTURE_CUBE_MAP_POSITIVE_X + n;
			e.framebufferTexture2D(e.FRAMEBUFFER, c, a, i.underlyingResource, r);
		}
		if (e._autoMSAAManagement && this._MSAAFramebuffer) {
			let e = this._context;
			o._bindUnboundFramebuffer(this._MSAAFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, c, e.RENDERBUFFER, i.getMSAARenderBuffer());
		}
		o._bindUnboundFramebuffer(s);
	}
	setTexture(e, t = 0, n = !0) {
		super.setTexture(e, t, n), this._bindTextureRenderTarget(e, t);
	}
	setLayerAndFaceIndices(e, t) {
		if (super.setLayerAndFaceIndices(e, t), !this.textures || !this.layerIndices || !this.faceIndices) return;
		let n = this._attachments?.length ?? this.textures.length;
		for (let e = 0; e < n; e++) {
			let t = this.textures[e];
			t && (t.is2DArray || t.is3D ? this._bindTextureRenderTarget(t, e, this.layerIndices[e]) : t.isCube ? this._bindTextureRenderTarget(t, e, this.faceIndices[e]) : this._bindTextureRenderTarget(t, e));
		}
	}
	setLayerAndFaceIndex(e = 0, t, n) {
		if (super.setLayerAndFaceIndex(e, t, n), !this.textures || !this.layerIndices || !this.faceIndices) return;
		let r = this.textures[e];
		r.is2DArray || r.is3D ? this._bindTextureRenderTarget(this.textures[e], e, this.layerIndices[e]) : r.isCube && this._bindTextureRenderTarget(this.textures[e], e, this.faceIndices[e]);
	}
	resolveMSAATextures() {
		let e = this._engine, t = e._currentFramebuffer;
		e._bindUnboundFramebuffer(this._MSAAFramebuffer), super.resolveMSAATextures(), e._bindUnboundFramebuffer(t);
	}
	dispose(e = this._disposeOnlyFramebuffers) {
		let t = this._context;
		e || (this._colorTextureArray &&= (this._context.deleteTexture(this._colorTextureArray), null), this._depthStencilTextureArray &&= (this._context.deleteTexture(this._depthStencilTextureArray), null)), this._framebuffer &&= (t.deleteFramebuffer(this._framebuffer), null), this._depthStencilBuffer &&= (t.deleteRenderbuffer(this._depthStencilBuffer), null), this._MSAAFramebuffer &&= (t.deleteFramebuffer(this._MSAAFramebuffer), null), super.dispose(e);
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Engines/Extensions/engine.renderTargetCube.js
u.prototype.createDepthStencilTexture = function(e, t, n) {
	if (t.isCube) {
		let n = e.width || e;
		return this._createDepthStencilCubeTexture(n, t);
	}
	return this._createDepthStencilTexture(e, t, n);
}, m.prototype._createHardwareRenderTargetWrapper = function(e, t, n) {
	let r = new re(e, t, n, this, this._gl);
	return this._renderTargetWrapperCache.push(r), r;
}, m.prototype.createRenderTargetTexture = function(e, t) {
	let n = this._createHardwareRenderTargetWrapper(!1, !1, e), r = !0, i = !1, a = !1, o, s = 1, c;
	t !== void 0 && typeof t == "object" && (r = t.generateDepthBuffer ?? !0, i = !!t.generateStencilBuffer, a = !!t.noColorAttachment, o = t.colorAttachment, s = t.samples ?? 1, c = t.label);
	let l = o || (a ? null : this._createInternalTexture(e, t, !0, 5)), u = e.width || e, d = e.height || e, f = this._currentFramebuffer, p = this._gl, m = p.createFramebuffer();
	if (this._bindUnboundFramebuffer(m), n._depthStencilBuffer = this._setupFramebufferDepthAttachments(i, r, u, d), l && !l.is2DArray && !l.is3D && p.framebufferTexture2D(p.FRAMEBUFFER, p.COLOR_ATTACHMENT0, p.TEXTURE_2D, l._hardwareTexture.underlyingResource, 0), this._bindUnboundFramebuffer(f), n.label = c ?? "RenderTargetWrapper", n._framebuffer = m, n._generateDepthBuffer = r, n._generateStencilBuffer = i, n.setTextures(l), !o) this.updateRenderTargetTextureSampleCount(n, s);
	else if (n._samples = o.samples, o.samples > 1) {
		let e = o._hardwareTexture.getMSAARenderBuffer(0);
		n._MSAAFramebuffer = p.createFramebuffer(), this._bindUnboundFramebuffer(n._MSAAFramebuffer), p.framebufferRenderbuffer(p.FRAMEBUFFER, p.COLOR_ATTACHMENT0, p.RENDERBUFFER, e), this._bindUnboundFramebuffer(null);
	}
	return n;
}, m.prototype._createDepthStencilTexture = function(e, t, r) {
	let i = this._gl, a = e.layers || 0, o = e.depth || 0, s = i.TEXTURE_2D;
	a === 0 ? o !== 0 && (s = i.TEXTURE_3D) : s = i.TEXTURE_2D_ARRAY;
	let c = new n(this, 12);
	if (c.label = t.label, !this._caps.depthTextureExtension) return h.Error("Depth texture is not supported by your browser or hardware."), c;
	let l = {
		bilinearFiltering: !1,
		comparisonFunction: 0,
		generateStencil: !1,
		...t
	};
	if (this._bindTextureDirectly(s, c, !0), this._setupDepthStencilTexture(c, e, l.comparisonFunction !== 0 && l.bilinearFiltering, l.comparisonFunction, l.samples), l.depthTextureFormat !== void 0) {
		if (l.depthTextureFormat !== 15 && l.depthTextureFormat !== 16 && l.depthTextureFormat !== 17 && l.depthTextureFormat !== 13 && l.depthTextureFormat !== 14 && l.depthTextureFormat !== 18) return h.Error(`Depth texture ${l.depthTextureFormat} format is not supported.`), c;
		c.format = l.depthTextureFormat;
	} else c.format = l.generateStencil ? 13 : 16;
	let u = p(c.format), d = this._getWebGLTextureTypeFromDepthTextureFormat(c.format), f = u ? i.DEPTH_STENCIL : i.DEPTH_COMPONENT, m = this._getInternalFormatFromDepthTextureFormat(c.format, !0, u);
	return c.is2DArray ? i.texImage3D(s, 0, m, c.width, c.height, a, 0, f, d, null) : c.is3D ? i.texImage3D(s, 0, m, c.width, c.height, o, 0, f, d, null) : i.texImage2D(s, 0, m, c.width, c.height, 0, f, d, null), this._bindTextureDirectly(s, null), this._internalTexturesCache.push(c), r._depthStencilBuffer &&= (i.deleteRenderbuffer(r._depthStencilBuffer), null), this._bindUnboundFramebuffer(r._MSAAFramebuffer ?? r._framebuffer), r._generateStencilBuffer = u, r._depthStencilTextureWithStencil = u, r._depthStencilBuffer = this._setupFramebufferDepthAttachments(r._generateStencilBuffer, r._generateDepthBuffer, r.width, r.height, r.samples, c.format), this._bindUnboundFramebuffer(null), c;
}, m.prototype.updateRenderTargetTextureSampleCount = function(e, t) {
	if (this.webGLVersion < 2 || !e) return 1;
	if (e.samples === t) return t;
	let n = this._gl;
	t = Math.min(t, this.getCaps().maxMSAASamples), e._depthStencilBuffer &&= (n.deleteRenderbuffer(e._depthStencilBuffer), null), e._MSAAFramebuffer &&= (n.deleteFramebuffer(e._MSAAFramebuffer), null);
	let r = e.texture?._hardwareTexture;
	if (r?.releaseMSAARenderBuffers(), e.texture && t > 1 && typeof n.renderbufferStorageMultisample == "function") {
		let i = n.createFramebuffer();
		if (!i) throw Error("Unable to create multi sampled framebuffer");
		e._MSAAFramebuffer = i, this._bindUnboundFramebuffer(e._MSAAFramebuffer);
		let a = this._createRenderBuffer(e.texture.width, e.texture.height, t, -1, this._getRGBABufferInternalSizedFormat(e.texture.type, e.texture.format, e.texture._useSRGBBuffer), n.COLOR_ATTACHMENT0, !1);
		if (!a) throw Error("Unable to create multi sampled framebuffer");
		r?.addMSAARenderBuffer(a);
	}
	this._bindUnboundFramebuffer(e._MSAAFramebuffer ?? e._framebuffer), e.texture && (e.texture.samples = t), e._samples = t;
	let i = e._depthStencilTexture ? e._depthStencilTexture.format : void 0;
	return e._depthStencilBuffer = this._setupFramebufferDepthAttachments(e._generateStencilBuffer, e._generateDepthBuffer, e.width, e.height, t, i), this._bindUnboundFramebuffer(null), t;
}, m.prototype._setupDepthStencilTexture = function(e, t, n, r, i = 1) {
	let a = t.width ?? t, o = t.height ?? t, s = t.layers || 0, c = t.depth || 0;
	e.baseWidth = a, e.baseHeight = o, e.width = a, e.height = o, e.is2DArray = s > 0, e.depth = s || c, e.isReady = !0, e.samples = i, e.generateMipMaps = !1, e.samplingMode = n ? 2 : 1, e.type = 0, e._comparisonFunction = r;
	let l = this._gl, u = this._getTextureTarget(e), d = this._getSamplingParameters(e.samplingMode, !1);
	l.texParameteri(u, l.TEXTURE_MAG_FILTER, d.mag), l.texParameteri(u, l.TEXTURE_MIN_FILTER, d.min), l.texParameteri(u, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE), l.texParameteri(u, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE), this.webGLVersion > 1 && (r === 0 ? (l.texParameteri(u, l.TEXTURE_COMPARE_FUNC, 515), l.texParameteri(u, l.TEXTURE_COMPARE_MODE, l.NONE)) : (l.texParameteri(u, l.TEXTURE_COMPARE_FUNC, r), l.texParameteri(u, l.TEXTURE_COMPARE_MODE, l.COMPARE_REF_TO_TEXTURE)));
}, m.prototype.setDepthStencilTexture = function(e, t, n, r) {
	e !== void 0 && (t && (this._boundUniforms[e] = t), !n || !n.depthStencilTexture ? this._setTexture(e, null, void 0, void 0, r) : this._setTexture(e, n, !1, !0, r));
}, m.prototype.createRenderTargetCubeTexture = function(e, t) {
	let r = this._createHardwareRenderTargetWrapper(!1, !0, e), i = {
		generateMipMaps: !0,
		generateDepthBuffer: !0,
		generateStencilBuffer: !1,
		type: 0,
		samplingMode: 3,
		format: 5,
		...t
	};
	i.generateStencilBuffer = i.generateDepthBuffer && i.generateStencilBuffer, (i.type === 1 && !this._caps.textureFloatLinearFiltering || i.type === 2 && !this._caps.textureHalfFloatLinearFiltering) && (i.samplingMode = 1);
	let a = this._gl, o = new n(this, 5);
	this._bindTextureDirectly(a.TEXTURE_CUBE_MAP, o, !0);
	let s = this._getSamplingParameters(i.samplingMode, i.generateMipMaps);
	i.type === 1 && !this._caps.textureFloat && (i.type = 0, h.Warn("Float textures are not supported. Cube render target forced to TEXTURETYPE_UNESIGNED_BYTE type")), a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_MAG_FILTER, s.mag), a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_MIN_FILTER, s.min), a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
	for (let t = 0; t < 6; t++) a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, this._getRGBABufferInternalSizedFormat(i.type, i.format), e, e, 0, this._getInternalFormat(i.format), this._getWebGLTextureType(i.type), null);
	let c = a.createFramebuffer();
	return this._bindUnboundFramebuffer(c), r._depthStencilBuffer = this._setupFramebufferDepthAttachments(i.generateStencilBuffer, i.generateDepthBuffer, e, e), i.generateMipMaps && a.generateMipmap(a.TEXTURE_CUBE_MAP), this._bindTextureDirectly(a.TEXTURE_CUBE_MAP, null), this._bindUnboundFramebuffer(null), r._framebuffer = c, r._generateDepthBuffer = i.generateDepthBuffer, r._generateStencilBuffer = i.generateStencilBuffer, o.width = e, o.height = e, o.isReady = !0, o.isCube = !0, o.samples = 1, o.generateMipMaps = i.generateMipMaps, o.samplingMode = i.samplingMode, o.type = i.type, o.format = i.format, this._internalTexturesCache.push(o), r.setTextures(o), r;
};
//#endregion
//#region node_modules/@babylonjs/core/Maths/math.axis.js
var ie;
(function(e) {
	e[e.LOCAL = 0] = "LOCAL", e[e.WORLD = 1] = "WORLD", e[e.BONE = 2] = "BONE";
})(ie ||= {});
var T = class {};
T.X = new g(1, 0, 0), T.Y = new g(0, 1, 0), T.Z = new g(0, 0, 1);
var ae;
(function(e) {
	e[e.X = 0] = "X", e[e.Y = 1] = "Y", e[e.Z = 2] = "Z";
})(ae ||= {});
//#endregion
//#region node_modules/@babylonjs/core/Maths/math.frustum.js
var oe = class e {
	static GetPlanes(t) {
		let n = [];
		for (let e = 0; e < 6; e++) n.push(new y(0, 0, 0, 0));
		return e.GetPlanesToRef(t, n), n;
	}
	static GetNearPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] + n[2], t.normal.y = n[7] + n[6], t.normal.z = n[11] + n[10], t.d = n[15] + n[14], t.normalize();
	}
	static GetFarPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] - n[2], t.normal.y = n[7] - n[6], t.normal.z = n[11] - n[10], t.d = n[15] - n[14], t.normalize();
	}
	static GetLeftPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] + n[0], t.normal.y = n[7] + n[4], t.normal.z = n[11] + n[8], t.d = n[15] + n[12], t.normalize();
	}
	static GetRightPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] - n[0], t.normal.y = n[7] - n[4], t.normal.z = n[11] - n[8], t.d = n[15] - n[12], t.normalize();
	}
	static GetTopPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] - n[1], t.normal.y = n[7] - n[5], t.normal.z = n[11] - n[9], t.d = n[15] - n[13], t.normalize();
	}
	static GetBottomPlaneToRef(e, t) {
		let n = e.m;
		t.normal.x = n[3] + n[1], t.normal.y = n[7] + n[5], t.normal.z = n[11] + n[9], t.d = n[15] + n[13], t.normalize();
	}
	static GetPlanesToRef(t, n) {
		e.GetNearPlaneToRef(t, n[0]), e.GetFarPlaneToRef(t, n[1]), e.GetLeftPlaneToRef(t, n[2]), e.GetRightPlaneToRef(t, n[3]), e.GetTopPlaneToRef(t, n[4]), e.GetBottomPlaneToRef(t, n[5]);
	}
	static IsPointInFrustum(e, t) {
		for (let n = 0; n < 6; n++) if (t[n].dotCoordinate(e) < 0) return !1;
		return !0;
	}
}, se;
(function(e) {
	e[e.CW = 0] = "CW", e[e.CCW = 1] = "CCW";
})(se ||= {});
//#endregion
//#region node_modules/@babylonjs/core/Maths/sphericalPolynomial.js
var E = [
	Math.sqrt(1 / (4 * Math.PI)),
	-Math.sqrt(3 / (4 * Math.PI)),
	Math.sqrt(3 / (4 * Math.PI)),
	-Math.sqrt(3 / (4 * Math.PI)),
	Math.sqrt(15 / (4 * Math.PI)),
	-Math.sqrt(15 / (4 * Math.PI)),
	Math.sqrt(5 / (16 * Math.PI)),
	-Math.sqrt(15 / (4 * Math.PI)),
	Math.sqrt(15 / (16 * Math.PI))
], D = [
	() => 1,
	(e) => e.y,
	(e) => e.z,
	(e) => e.x,
	(e) => e.x * e.y,
	(e) => e.y * e.z,
	(e) => 3 * e.z * e.z - 1,
	(e) => e.x * e.z,
	(e) => e.x * e.x - e.y * e.y
], O = (e, t) => E[e] * D[e](t), k = [
	Math.PI,
	2 * Math.PI / 3,
	2 * Math.PI / 3,
	2 * Math.PI / 3,
	Math.PI / 4,
	Math.PI / 4,
	Math.PI / 4,
	Math.PI / 4,
	Math.PI / 4
], A = class e {
	constructor() {
		this.preScaled = !1, this.l00 = g.Zero(), this.l1_1 = g.Zero(), this.l10 = g.Zero(), this.l11 = g.Zero(), this.l2_2 = g.Zero(), this.l2_1 = g.Zero(), this.l20 = g.Zero(), this.l21 = g.Zero(), this.l22 = g.Zero();
	}
	addLight(e, t, n) {
		_.Vector3[0].set(t.r, t.g, t.b);
		let r = _.Vector3[0], i = _.Vector3[1];
		r.scaleToRef(n, i), i.scaleToRef(O(0, e), _.Vector3[2]), this.l00.addInPlace(_.Vector3[2]), i.scaleToRef(O(1, e), _.Vector3[2]), this.l1_1.addInPlace(_.Vector3[2]), i.scaleToRef(O(2, e), _.Vector3[2]), this.l10.addInPlace(_.Vector3[2]), i.scaleToRef(O(3, e), _.Vector3[2]), this.l11.addInPlace(_.Vector3[2]), i.scaleToRef(O(4, e), _.Vector3[2]), this.l2_2.addInPlace(_.Vector3[2]), i.scaleToRef(O(5, e), _.Vector3[2]), this.l2_1.addInPlace(_.Vector3[2]), i.scaleToRef(O(6, e), _.Vector3[2]), this.l20.addInPlace(_.Vector3[2]), i.scaleToRef(O(7, e), _.Vector3[2]), this.l21.addInPlace(_.Vector3[2]), i.scaleToRef(O(8, e), _.Vector3[2]), this.l22.addInPlace(_.Vector3[2]);
	}
	scaleInPlace(e) {
		this.l00.scaleInPlace(e), this.l1_1.scaleInPlace(e), this.l10.scaleInPlace(e), this.l11.scaleInPlace(e), this.l2_2.scaleInPlace(e), this.l2_1.scaleInPlace(e), this.l20.scaleInPlace(e), this.l21.scaleInPlace(e), this.l22.scaleInPlace(e);
	}
	convertIncidentRadianceToIrradiance() {
		this.l00.scaleInPlace(k[0]), this.l1_1.scaleInPlace(k[1]), this.l10.scaleInPlace(k[2]), this.l11.scaleInPlace(k[3]), this.l2_2.scaleInPlace(k[4]), this.l2_1.scaleInPlace(k[5]), this.l20.scaleInPlace(k[6]), this.l21.scaleInPlace(k[7]), this.l22.scaleInPlace(k[8]);
	}
	convertIrradianceToLambertianRadiance() {
		this.scaleInPlace(1 / Math.PI);
	}
	preScaleForRendering() {
		this.preScaled = !0, this.l00.scaleInPlace(E[0]), this.l1_1.scaleInPlace(E[1]), this.l10.scaleInPlace(E[2]), this.l11.scaleInPlace(E[3]), this.l2_2.scaleInPlace(E[4]), this.l2_1.scaleInPlace(E[5]), this.l20.scaleInPlace(E[6]), this.l21.scaleInPlace(E[7]), this.l22.scaleInPlace(E[8]);
	}
	updateFromArray(e) {
		return g.FromArrayToRef(e[0], 0, this.l00), g.FromArrayToRef(e[1], 0, this.l1_1), g.FromArrayToRef(e[2], 0, this.l10), g.FromArrayToRef(e[3], 0, this.l11), g.FromArrayToRef(e[4], 0, this.l2_2), g.FromArrayToRef(e[5], 0, this.l2_1), g.FromArrayToRef(e[6], 0, this.l20), g.FromArrayToRef(e[7], 0, this.l21), g.FromArrayToRef(e[8], 0, this.l22), this;
	}
	updateFromFloatsArray(e) {
		return g.FromFloatsToRef(e[0], e[1], e[2], this.l00), g.FromFloatsToRef(e[3], e[4], e[5], this.l1_1), g.FromFloatsToRef(e[6], e[7], e[8], this.l10), g.FromFloatsToRef(e[9], e[10], e[11], this.l11), g.FromFloatsToRef(e[12], e[13], e[14], this.l2_2), g.FromFloatsToRef(e[15], e[16], e[17], this.l2_1), g.FromFloatsToRef(e[18], e[19], e[20], this.l20), g.FromFloatsToRef(e[21], e[22], e[23], this.l21), g.FromFloatsToRef(e[24], e[25], e[26], this.l22), this;
	}
	static FromArray(t) {
		return new e().updateFromArray(t);
	}
	static FromPolynomial(t) {
		let n = new e();
		return n.l00 = t.xx.scale(.376127).add(t.yy.scale(.376127)).add(t.zz.scale(.376126)), n.l1_1 = t.y.scale(.977204), n.l10 = t.z.scale(.977204), n.l11 = t.x.scale(.977204), n.l2_2 = t.xy.scale(1.16538), n.l2_1 = t.yz.scale(1.16538), n.l20 = t.zz.scale(1.34567).subtract(t.xx.scale(.672834)).subtract(t.yy.scale(.672834)), n.l21 = t.zx.scale(1.16538), n.l22 = t.xx.scale(1.16538).subtract(t.yy.scale(1.16538)), n.l1_1.scaleInPlace(-1), n.l11.scaleInPlace(-1), n.l2_1.scaleInPlace(-1), n.l21.scaleInPlace(-1), n.scaleInPlace(Math.PI), n;
	}
}, j = class e {
	constructor() {
		this.x = g.Zero(), this.y = g.Zero(), this.z = g.Zero(), this.xx = g.Zero(), this.yy = g.Zero(), this.zz = g.Zero(), this.xy = g.Zero(), this.yz = g.Zero(), this.zx = g.Zero();
	}
	get preScaledHarmonics() {
		return this._harmonics ||= A.FromPolynomial(this), this._harmonics.preScaled || this._harmonics.preScaleForRendering(), this._harmonics;
	}
	addAmbient(e) {
		_.Vector3[0].copyFromFloats(e.r, e.g, e.b);
		let t = _.Vector3[0];
		this.xx.addInPlace(t), this.yy.addInPlace(t), this.zz.addInPlace(t);
	}
	scaleInPlace(e) {
		this.x.scaleInPlace(e), this.y.scaleInPlace(e), this.z.scaleInPlace(e), this.xx.scaleInPlace(e), this.yy.scaleInPlace(e), this.zz.scaleInPlace(e), this.yz.scaleInPlace(e), this.zx.scaleInPlace(e), this.xy.scaleInPlace(e);
	}
	updateFromHarmonics(e) {
		return this._harmonics = e, this.x.copyFrom(e.l11), this.x.scaleInPlace(1.02333).scaleInPlace(-1), this.y.copyFrom(e.l1_1), this.y.scaleInPlace(1.02333).scaleInPlace(-1), this.z.copyFrom(e.l10), this.z.scaleInPlace(1.02333), this.xx.copyFrom(e.l00), _.Vector3[0].copyFrom(e.l20).scaleInPlace(.247708), _.Vector3[1].copyFrom(e.l22).scaleInPlace(.429043), this.xx.scaleInPlace(.886277).subtractInPlace(_.Vector3[0]).addInPlace(_.Vector3[1]), this.yy.copyFrom(e.l00), this.yy.scaleInPlace(.886277).subtractInPlace(_.Vector3[0]).subtractInPlace(_.Vector3[1]), this.zz.copyFrom(e.l00), _.Vector3[0].copyFrom(e.l20).scaleInPlace(.495417), this.zz.scaleInPlace(.886277).addInPlace(_.Vector3[0]), this.yz.copyFrom(e.l2_1), this.yz.scaleInPlace(.858086).scaleInPlace(-1), this.zx.copyFrom(e.l21), this.zx.scaleInPlace(.858086).scaleInPlace(-1), this.xy.copyFrom(e.l2_2), this.xy.scaleInPlace(.858086), this.scaleInPlace(1 / Math.PI), this;
	}
	static FromHarmonics(t) {
		return new e().updateFromHarmonics(t);
	}
	static FromArray(t) {
		let n = new e();
		return g.FromArrayToRef(t[0], 0, n.x), g.FromArrayToRef(t[1], 0, n.y), g.FromArrayToRef(t[2], 0, n.z), g.FromArrayToRef(t[3], 0, n.xx), g.FromArrayToRef(t[4], 0, n.yy), g.FromArrayToRef(t[5], 0, n.zz), g.FromArrayToRef(t[6], 0, n.yz), g.FromArrayToRef(t[7], 0, n.zx), g.FromArrayToRef(t[8], 0, n.xy), n;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.loadFile.js
m.prototype.createPrefilteredCubeTexture = function(e, t, r, i, a = null, o = null, s, c = null, l = !0) {
	return this.createCubeTexture(e, t, null, !1, async (e) => {
		if (!e) {
			a && a(null);
			return;
		}
		let o = e.texture;
		if (l ? e.info.sphericalPolynomial && (o._sphericalPolynomial = e.info.sphericalPolynomial) : o._sphericalPolynomial = o._sphericalPolynomial ?? new j(), o._source = 9, this.getCaps().textureLOD) {
			a && a(o);
			return;
		}
		let s = this._gl, c = e.width;
		if (!c) return;
		let { DDSTools: u } = await import("./dds-ZlL-iQOp.js"), d = [];
		for (let a = 0; a < 3; a++) {
			let l = 1 - a / 2, f = i, p = Math.log2(c) * r + i, m = f + (p - f) * l, g = Math.round(Math.min(Math.max(m, 0), p)), _ = new n(this, 2);
			if (_.type = o.type, _.format = o.format, _.width = 2 ** Math.max(Math.log2(c) - g, 0), _.height = _.width, _.isCube = !0, _._cachedWrapU = 0, _._cachedWrapV = 0, this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, _, !0), _.samplingMode = 2, s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MAG_FILTER, s.LINEAR), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MIN_FILTER, s.LINEAR), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), e.isDDS) {
				let t = e.info, n = e.data;
				this._unpackFlipY(t.isCompressed), u.UploadDDSLevels(this, _, n, t, !0, 6, g);
			} else h.Warn("DDS is the only prefiltered cube map supported so far.");
			this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, null);
			let y = new v(t);
			y._isCube = !0, y._texture = _, _.isReady = !0, d.push(y);
		}
		o._lodTextureHigh = d[2], o._lodTextureMid = d[1], o._lodTextureLow = d[0], a && a(o);
	}, o, s, c, l, r, i);
}, m.prototype.createUniformBuffer = function(e, t) {
	let n = this._gl.createBuffer();
	if (!n) throw Error("Unable to create uniform buffer");
	let r = new d(n);
	return this.bindUniformBuffer(r), e instanceof Float32Array ? this._gl.bufferData(this._gl.UNIFORM_BUFFER, e, this._gl.STATIC_DRAW) : this._gl.bufferData(this._gl.UNIFORM_BUFFER, new Float32Array(e), this._gl.STATIC_DRAW), this.bindUniformBuffer(null), r.references = 1, r;
}, m.prototype.createDynamicUniformBuffer = function(e, t) {
	let n = this._gl.createBuffer();
	if (!n) throw Error("Unable to create dynamic uniform buffer");
	let r = new d(n);
	return this.bindUniformBuffer(r), e instanceof Float32Array ? this._gl.bufferData(this._gl.UNIFORM_BUFFER, e, this._gl.DYNAMIC_DRAW) : this._gl.bufferData(this._gl.UNIFORM_BUFFER, new Float32Array(e), this._gl.DYNAMIC_DRAW), this.bindUniformBuffer(null), r.references = 1, r;
}, m.prototype.updateUniformBuffer = function(e, t, n, r) {
	this.bindUniformBuffer(e), n === void 0 && (n = 0), r === void 0 ? t instanceof Float32Array ? this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, n, t) : this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, n, new Float32Array(t)) : t instanceof Float32Array ? this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, 0, t.subarray(n, n + r)) : this._gl.bufferSubData(this._gl.UNIFORM_BUFFER, 0, new Float32Array(t).subarray(n, n + r)), this.bindUniformBuffer(null);
}, m.prototype.bindUniformBuffer = function(e) {
	this._gl.bindBuffer(this._gl.UNIFORM_BUFFER, e ? e.underlyingResource : null);
}, m.prototype.bindUniformBufferBase = function(e, t, n) {
	this._gl.bindBufferBase(this._gl.UNIFORM_BUFFER, t, e ? e.underlyingResource : null);
}, m.prototype.bindUniformBlock = function(e, t, n) {
	let r = e.program, i = this._gl.getUniformBlockIndex(r, t);
	i !== 4294967295 && this._gl.uniformBlockBinding(r, i, n);
}, u.prototype.displayLoadingUI = function() {
	if (!r()) return;
	let e = this.loadingScreen;
	e && e.displayLoadingUI();
}, u.prototype.hideLoadingUI = function() {
	if (!r()) return;
	let e = this._loadingScreen;
	e && e.hideLoadingUI();
}, Object.defineProperty(u.prototype, "loadingScreen", {
	get: function() {
		return !this._loadingScreen && this._renderingCanvas && (this._loadingScreen = u.DefaultLoadingScreenFactory(this._renderingCanvas)), this._loadingScreen;
	},
	set: function(e) {
		this._loadingScreen = e;
	},
	enumerable: !0,
	configurable: !0
}), Object.defineProperty(u.prototype, "loadingUIText", {
	set: function(e) {
		this.loadingScreen.loadingUIText = e;
	},
	enumerable: !0,
	configurable: !0
}), Object.defineProperty(u.prototype, "loadingUIBackgroundColor", {
	set: function(e) {
		this.loadingScreen.loadingUIBackgroundColor = e;
	},
	enumerable: !0,
	configurable: !0
}), u.prototype.getInputElement = function() {
	return this._renderingCanvas;
}, u.prototype.getRenderingCanvasClientRect = function() {
	return this._renderingCanvas ? this._renderingCanvas.getBoundingClientRect() : null;
}, u.prototype.getInputElementClientRect = function() {
	return this._renderingCanvas ? this.getInputElement().getBoundingClientRect() : null;
}, u.prototype.getAspectRatio = function(e, t = !1) {
	let n = e.viewport;
	return this.getRenderWidth(t) * n.width / (this.getRenderHeight(t) * n.height);
}, u.prototype.getScreenAspectRatio = function() {
	return this.getRenderWidth(!0) / this.getRenderHeight(!0);
}, u.prototype._verifyPointerLock = function() {
	this._onPointerLockChange?.();
}, u.prototype.setAlphaEquation = function(e, t = 0) {
	if (this._alphaEquation[t] !== e) {
		switch (e) {
			case 0:
				this._alphaState.setAlphaEquationParameters(32774, 32774, t);
				break;
			case 1:
				this._alphaState.setAlphaEquationParameters(32778, 32778, t);
				break;
			case 2:
				this._alphaState.setAlphaEquationParameters(32779, 32779, t);
				break;
			case 3:
				this._alphaState.setAlphaEquationParameters(32776, 32776, t);
				break;
			case 4:
				this._alphaState.setAlphaEquationParameters(32775, 32775, t);
				break;
			case 5: this._alphaState.setAlphaEquationParameters(32775, 32774, t);
		}
		this._alphaEquation[t] = e;
	}
}, u.prototype.getInputElement = function() {
	return this._renderingCanvas;
}, u.prototype.getDepthFunction = function() {
	return this._depthCullingState.depthFunc;
}, u.prototype.setDepthFunction = function(e) {
	this._depthCullingState.depthFunc = e;
}, u.prototype.setDepthFunctionToGreater = function() {
	this.setDepthFunction(516);
}, u.prototype.setDepthFunctionToGreaterOrEqual = function() {
	this.setDepthFunction(518);
}, u.prototype.setDepthFunctionToLess = function() {
	this.setDepthFunction(513);
}, u.prototype.setDepthFunctionToLessOrEqual = function() {
	this.setDepthFunction(515);
}, u.prototype.getDepthWrite = function() {
	return this._depthCullingState.depthMask;
}, u.prototype.setDepthWrite = function(e) {
	this._depthCullingState.depthMask = e;
}, u.prototype.setAlphaConstants = function(e, t, n, r) {
	this._alphaState.setAlphaBlendConstants(e, t, n, r);
}, u.prototype.getAlphaMode = function(e = 0) {
	return this._alphaMode[e];
}, u.prototype.getAlphaEquation = function(e = 0) {
	return this._alphaEquation[e];
}, u.prototype.getStencilBuffer = function() {
	return this._stencilState.stencilTest;
}, u.prototype.setStencilBuffer = function(e) {
	this._stencilState.stencilTest = e;
}, u.prototype.getStencilMask = function() {
	return this._stencilState.stencilMask;
}, u.prototype.setStencilMask = function(e) {
	this._stencilState.stencilMask = e;
}, u.prototype.getStencilFunction = function() {
	return this._stencilState.stencilFunc;
}, u.prototype.getStencilBackFunction = function() {
	return this._stencilState.stencilBackFunc;
}, u.prototype.getStencilFunctionReference = function() {
	return this._stencilState.stencilFuncRef;
}, u.prototype.getStencilFunctionMask = function() {
	return this._stencilState.stencilFuncMask;
}, u.prototype.setStencilFunction = function(e) {
	this._stencilState.stencilFunc = e;
}, u.prototype.setStencilBackFunction = function(e) {
	this._stencilState.stencilBackFunc = e;
}, u.prototype.setStencilFunctionReference = function(e) {
	this._stencilState.stencilFuncRef = e;
}, u.prototype.setStencilFunctionMask = function(e) {
	this._stencilState.stencilFuncMask = e;
}, u.prototype.getStencilOperationFail = function() {
	return this._stencilState.stencilOpStencilFail;
}, u.prototype.getStencilBackOperationFail = function() {
	return this._stencilState.stencilBackOpStencilFail;
}, u.prototype.getStencilOperationDepthFail = function() {
	return this._stencilState.stencilOpDepthFail;
}, u.prototype.getStencilBackOperationDepthFail = function() {
	return this._stencilState.stencilBackOpDepthFail;
}, u.prototype.getStencilOperationPass = function() {
	return this._stencilState.stencilOpStencilDepthPass;
}, u.prototype.getStencilBackOperationPass = function() {
	return this._stencilState.stencilBackOpStencilDepthPass;
}, u.prototype.setStencilOperationFail = function(e) {
	this._stencilState.stencilOpStencilFail = e;
}, u.prototype.setStencilBackOperationFail = function(e) {
	this._stencilState.stencilBackOpStencilFail = e;
}, u.prototype.setStencilOperationDepthFail = function(e) {
	this._stencilState.stencilOpDepthFail = e;
}, u.prototype.setStencilBackOperationDepthFail = function(e) {
	this._stencilState.stencilBackOpDepthFail = e;
}, u.prototype.setStencilOperationPass = function(e) {
	this._stencilState.stencilOpStencilDepthPass = e;
}, u.prototype.setStencilBackOperationPass = function(e) {
	this._stencilState.stencilBackOpStencilDepthPass = e;
}, u.prototype.cacheStencilState = function() {
	this._cachedStencilBuffer = this.getStencilBuffer(), this._cachedStencilFunction = this.getStencilFunction(), this._cachedStencilMask = this.getStencilMask(), this._cachedStencilOperationPass = this.getStencilOperationPass(), this._cachedStencilOperationFail = this.getStencilOperationFail(), this._cachedStencilOperationDepthFail = this.getStencilOperationDepthFail(), this._cachedStencilReference = this.getStencilFunctionReference();
}, u.prototype.restoreStencilState = function() {
	this.setStencilFunction(this._cachedStencilFunction), this.setStencilMask(this._cachedStencilMask), this.setStencilBuffer(this._cachedStencilBuffer), this.setStencilOperationPass(this._cachedStencilOperationPass), this.setStencilOperationFail(this._cachedStencilOperationFail), this.setStencilOperationDepthFail(this._cachedStencilOperationDepthFail), this.setStencilFunctionReference(this._cachedStencilReference);
}, u.prototype.getRenderPassNames = function() {
	return this._renderPassNames;
}, u.prototype.getCurrentRenderPassName = function() {
	return this._renderPassNames[this.currentRenderPassId];
}, u.prototype.createRenderPassId = function(e) {
	let t = ++u._RenderPassIdCounter;
	return this._renderPassNames[t] = e ?? "NONAME", t;
}, u.prototype.releaseRenderPassId = function(e) {
	this._renderPassNames[e] = void 0;
	for (let t = 0; t < this.scenes.length; ++t) {
		let n = this.scenes[t];
		for (let t = 0; t < n.meshes.length; ++t) {
			let r = n.meshes[t];
			if (r._releaseRenderPassId(e), r.subMeshes) for (let t = 0; t < r.subMeshes.length; ++t) r.subMeshes[t]._removeDrawWrapper(e);
		}
	}
}, u.prototype._loadFileAsync = async function(e, t, n) {
	return await new Promise((r, i) => {
		this._loadFile(e, (e) => {
			r(e);
		}, void 0, t, n, (e, t) => {
			i(t);
		});
	});
};
//#endregion
//#region node_modules/@babylonjs/core/Materials/Textures/Loaders/textureLoaderManager.js
var M = /* @__PURE__ */ new Map();
function N(e, t) {
	P(e) && h.Warn(`Extension with the name '${e}' already exists`), M.set(e, t);
}
function P(e) {
	return M.delete(e);
}
function F(e, t) {
	(t === "image/ktx" || t === "image/ktx2") && (e = ".ktx"), M.has(e) || (e.endsWith(".ies") && N(".ies", async () => await import("./iesTextureLoader-D8Nub8Hz.js").then((e) => new e._IESTextureLoader())), e.endsWith(".dds") && N(".dds", async () => await import("./ddsTextureLoader-CIJfe516.js").then((e) => new e._DDSTextureLoader())), e.endsWith(".basis") && N(".basis", async () => await import("./basisTextureLoader-CWywKT1W.js").then((e) => new e._BasisTextureLoader())), e.endsWith(".env") && N(".env", async () => await import("./envTextureLoader-CSAjlCI2.js").then((e) => new e._ENVTextureLoader())), e.endsWith(".hdr") && N(".hdr", async () => await import("./hdrTextureLoader-Ti8ll7um.js").then((e) => new e._HDRTextureLoader())), (e.endsWith(".ktx") || e.endsWith(".ktx2")) && (N(".ktx", async () => await import("./ktxTextureLoader-DWXGDWQf.js").then((e) => new e._KTXTextureLoader())), N(".ktx2", async () => await import("./ktxTextureLoader-DWXGDWQf.js").then((e) => new e._KTXTextureLoader()))), e.endsWith(".tga") && N(".tga", async () => await import("./tgaTextureLoader-BzYgQgvv.js").then((e) => new e._TGATextureLoader())), e.endsWith(".exr") && N(".exr", async () => await import("./exrTextureLoader-B4CHwBph.js").then((e) => new e._ExrTextureLoader())));
	let n = M.get(e);
	return n ? Promise.resolve(n(t)) : null;
}
//#endregion
//#region node_modules/@babylonjs/core/Engines/AbstractEngine/abstractEngine.textureLoaders.js
u.GetCompatibleTextureLoader = F;
//#endregion
//#region node_modules/@babylonjs/core/Engines/engine.common.js
function I(e) {
	!e || !e.setAttribute || (e.setAttribute("touch-action", "none"), e.style.touchAction = "none", e.style.webkitTapHighlightColor = "transparent");
}
function L(e, t, n) {
	e._onCanvasFocus = () => {
		e.onCanvasFocusObservable.notifyObservers(e);
	}, e._onCanvasBlur = () => {
		e.onCanvasBlurObservable.notifyObservers(e);
	}, e._onCanvasContextMenu = (t) => {
		e.disableContextMenu && t.preventDefault();
	}, t.addEventListener("focus", e._onCanvasFocus), t.addEventListener("blur", e._onCanvasBlur), t.addEventListener("contextmenu", e._onCanvasContextMenu), e._onBlur = () => {
		e.disablePerformanceMonitorInBackground && e.performanceMonitor.disable(), e._windowIsBackground = !0;
	}, e._onFocus = () => {
		e.disablePerformanceMonitorInBackground && e.performanceMonitor.enable(), e._windowIsBackground = !1;
	}, e._onCanvasPointerOut = (n) => {
		document.elementFromPoint(n.clientX, n.clientY) !== t && e.onCanvasPointerOutObservable.notifyObservers(n);
	};
	let r = e.getHostWindow();
	r && typeof r.addEventListener == "function" && (r.addEventListener("blur", e._onBlur), r.addEventListener("focus", e._onFocus)), t.addEventListener("pointerout", e._onCanvasPointerOut), n.doNotHandleTouchAction || I(t), !u.audioEngine && n.audioEngine && u.AudioEngineFactory && (u.audioEngine = u.AudioEngineFactory(e.getRenderingCanvas(), e.getAudioContext(), e.getAudioDestination())), o() && (e._onFullscreenChange = () => {
		e.isFullscreen = !!document.fullscreenElement, e.isFullscreen && e._pointerLockRequested && t && W(t);
	}, document.addEventListener("fullscreenchange", e._onFullscreenChange, !1), document.addEventListener("webkitfullscreenchange", e._onFullscreenChange, !1), e._onPointerLockChange = () => {
		e.isPointerLock = document.pointerLockElement === t;
	}, document.addEventListener("pointerlockchange", e._onPointerLockChange, !1), document.addEventListener("webkitpointerlockchange", e._onPointerLockChange, !1)), e.enableOfflineSupport = u.OfflineProviderFactory !== void 0, e._deterministicLockstep = !!n.deterministicLockstep, e._lockstepMaxSteps = n.lockstepMaxSteps || 0, e._timeStep = n.timeStep || 1 / 60;
}
function R(t, n) {
	e.Instances.length === 1 && u.audioEngine && (u.audioEngine.dispose(), u.audioEngine = null);
	let r = t.getHostWindow();
	r && typeof r.removeEventListener == "function" && (r.removeEventListener("blur", t._onBlur), r.removeEventListener("focus", t._onFocus)), n && (n.removeEventListener("focus", t._onCanvasFocus), n.removeEventListener("blur", t._onCanvasBlur), n.removeEventListener("pointerout", t._onCanvasPointerOut), n.removeEventListener("contextmenu", t._onCanvasContextMenu)), o() && (document.removeEventListener("fullscreenchange", t._onFullscreenChange), document.removeEventListener("mozfullscreenchange", t._onFullscreenChange), document.removeEventListener("webkitfullscreenchange", t._onFullscreenChange), document.removeEventListener("msfullscreenchange", t._onFullscreenChange), document.removeEventListener("pointerlockchange", t._onPointerLockChange), document.removeEventListener("mspointerlockchange", t._onPointerLockChange), document.removeEventListener("mozpointerlockchange", t._onPointerLockChange), document.removeEventListener("webkitpointerlockchange", t._onPointerLockChange));
}
function z(e) {
	let t = document.createElement("span");
	t.textContent = "Hg", t.style.font = e;
	let n = document.createElement("div");
	n.style.display = "inline-block", n.style.width = "1px", n.style.height = "0px", n.style.verticalAlign = "bottom";
	let r = document.createElement("div");
	r.style.whiteSpace = "nowrap", r.appendChild(t), r.appendChild(n), document.body.appendChild(r);
	let i, a;
	try {
		a = n.getBoundingClientRect().top - t.getBoundingClientRect().top, n.style.verticalAlign = "baseline", i = n.getBoundingClientRect().top - t.getBoundingClientRect().top;
	} finally {
		document.body.removeChild(r);
	}
	return {
		ascent: i,
		height: a,
		descent: a - i
	};
}
async function B(e, t, n) {
	return await new Promise((r, i) => {
		let a = new Image();
		a.onload = () => {
			a.decode().then(() => {
				e.createImageBitmap(a, n).then((e) => {
					r(e);
				});
			});
		}, a.onerror = () => {
			i(`Error loading image ${a.src}`);
		}, a.src = t;
	});
}
function V(e, t, n, r) {
	let i = e.createCanvas(n, r).getContext("2d");
	if (!i) throw Error("Unable to get 2d context for resizeImageBitmap");
	return i.drawImage(t, 0, 0), i.getImageData(0, 0, n, r).data;
}
function H(e) {
	let t = e.requestFullscreen || e.webkitRequestFullscreen;
	t && t.call(e);
}
function U() {
	let e = document;
	document.exitFullscreen ? document.exitFullscreen() : e.webkitCancelFullScreen && e.webkitCancelFullScreen();
}
function W(e) {
	if (e.requestPointerLock) {
		let t = e.requestPointerLock();
		t instanceof Promise ? t.then(() => {
			e.focus();
		}).catch(() => {}) : e.focus();
	}
}
function G() {
	document.exitPointerLock && document.exitPointerLock();
}
//#endregion
//#region node_modules/@babylonjs/core/Misc/perfCounter.js
var K = class e {
	get min() {
		return this._min;
	}
	get max() {
		return this._max;
	}
	get average() {
		return this._average;
	}
	get lastSecAverage() {
		return this._lastSecAverage;
	}
	get current() {
		return this._current;
	}
	get total() {
		return this._totalAccumulated;
	}
	get count() {
		return this._totalValueCount;
	}
	constructor() {
		this._startMonitoringTime = 0, this._min = 0, this._max = 0, this._average = 0, this._lastSecAverage = 0, this._current = 0, this._totalValueCount = 0, this._totalAccumulated = 0, this._lastSecAccumulated = 0, this._lastSecTime = 0, this._lastSecValueCount = 0;
	}
	fetchNewFrame() {
		this._totalValueCount++, this._current = 0, this._lastSecValueCount++;
	}
	addCount(t, n) {
		e.Enabled && (this._current += t, n && this._fetchResult());
	}
	beginMonitoring() {
		e.Enabled && (this._startMonitoringTime = l.Now);
	}
	endMonitoring(t = !0) {
		if (!e.Enabled) return;
		t && this.fetchNewFrame();
		let n = l.Now;
		this._current = n - this._startMonitoringTime, t && this._fetchResult();
	}
	endFrame() {
		this._fetchResult();
	}
	_fetchResult() {
		this._totalAccumulated += this._current, this._lastSecAccumulated += this._current, this._min = Math.min(this._min, this._current), this._max = Math.max(this._max, this._current), this._average = this._totalAccumulated / this._totalValueCount;
		let e = l.Now;
		e - this._lastSecTime > 1e3 && (this._lastSecAverage = this._lastSecAccumulated / this._lastSecValueCount, this._lastSecTime = e, this._lastSecAccumulated = 0, this._lastSecValueCount = 0);
	}
};
K.Enabled = !0;
//#endregion
//#region node_modules/@babylonjs/core/Engines/engine.js
var q = class t extends m {
	static get NpmPackage() {
		return u.NpmPackage;
	}
	static get Version() {
		return u.Version;
	}
	static get Instances() {
		return e.Instances;
	}
	static get LastCreatedEngine() {
		return e.LastCreatedEngine;
	}
	static get LastCreatedScene() {
		return e.LastCreatedScene;
	}
	static DefaultLoadingScreenFactory(e) {
		return u.DefaultLoadingScreenFactory(e);
	}
	get _supportsHardwareTextureRescaling() {
		return !!t._RescalePostProcessFactory;
	}
	_measureFps() {
		this._performanceMonitor.sampleFrame(), this._fps = this._performanceMonitor.averageFPS, this._deltaTime = this._performanceMonitor.instantaneousFrameTime || 0;
	}
	get performanceMonitor() {
		return this._performanceMonitor;
	}
	constructor(e, t, n, r = !1) {
		super(e, t, n, r), this.customAnimationFrameRequester = null, this._performanceMonitor = new te(), this._drawCalls = new K(), e && (this._features.supportRenderPasses = !0);
	}
	_initGLContext() {
		super._initGLContext(), this._rescalePostProcess = null;
	}
	_sharedInit(e) {
		super._sharedInit(e), L(this, e, this._creationOptions);
	}
	resizeImageBitmap(e, t, n) {
		return V(this, e, t, n);
	}
	async _createImageBitmapFromSource(e, t) {
		return await B(this, e, t);
	}
	switchFullscreen(e) {
		this.isFullscreen ? this.exitFullscreen() : this.enterFullscreen(e);
	}
	enterFullscreen(e) {
		this.isFullscreen || (this._pointerLockRequested = e, this._renderingCanvas && H(this._renderingCanvas));
	}
	exitFullscreen() {
		this.isFullscreen && U();
	}
	setDitheringState(e) {
		e ? this._gl.enable(this._gl.DITHER) : this._gl.disable(this._gl.DITHER);
	}
	setRasterizerState(e) {
		e ? this._gl.disable(this._gl.RASTERIZER_DISCARD) : this._gl.enable(this._gl.RASTERIZER_DISCARD);
	}
	setDirectViewport(e, t, n, r) {
		let i = this._cachedViewport;
		return this._cachedViewport = null, this._viewport(e, t, n, r), i;
	}
	scissorClear(e, t, n, r, i) {
		this.enableScissor(e, t, n, r), this.clear(i, !0, !0, !0), this.disableScissor();
	}
	enableScissor(e, t, n, r) {
		let i = this._gl;
		i.enable(i.SCISSOR_TEST), i.scissor(e, t, n, r);
	}
	disableScissor() {
		let e = this._gl;
		e.disable(e.SCISSOR_TEST);
	}
	getVertexShaderSource(e) {
		let t = this._gl.getAttachedShaders(e);
		return t ? this._gl.getShaderSource(t[0]) : null;
	}
	getFragmentShaderSource(e) {
		let t = this._gl.getAttachedShaders(e);
		return t ? this._gl.getShaderSource(t[1]) : null;
	}
	set framebufferDimensionsObject(e) {
		this._framebufferDimensionsObject = e, this._framebufferDimensionsObject && this.onResizeObservable.notifyObservers(this);
	}
	_rebuildBuffers() {
		for (let e of this.scenes) e.resetCachedMaterial(), e._rebuildGeometries();
		for (let e of this._virtualScenes) e.resetCachedMaterial(), e._rebuildGeometries();
		super._rebuildBuffers();
	}
	getFontOffset(e) {
		return z(e);
	}
	_cancelFrame() {
		if (this.customAnimationFrameRequester) {
			if (this._frameHandler !== 0) {
				this._frameHandler = 0;
				let { cancelAnimationFrame: e } = this.customAnimationFrameRequester;
				e && e(this.customAnimationFrameRequester.requestID);
			}
		} else super._cancelFrame();
	}
	_renderLoop(e) {
		this._processFrame(e), this._activeRenderLoops.length > 0 && this._frameHandler === 0 && (this.customAnimationFrameRequester ? (this.customAnimationFrameRequester.requestID = this._queueNewFrame(this.customAnimationFrameRequester.renderFunction || this._boundRenderFunction, this.customAnimationFrameRequester), this._frameHandler = this.customAnimationFrameRequester.requestID) : this._frameHandler = this._queueNewFrame(this._boundRenderFunction, this.getHostWindow()));
	}
	enterPointerlock() {
		this._renderingCanvas && W(this._renderingCanvas);
	}
	exitPointerlock() {
		G();
	}
	beginFrame() {
		this._measureFps(), super.beginFrame();
	}
	_deletePipelineContext(e) {
		let t = e;
		t && t.program && (t.transformFeedback &&= (this.deleteTransformFeedback(t.transformFeedback), null)), super._deletePipelineContext(e);
	}
	createShaderProgram(e, t, n, r, i, a = null) {
		i ||= this._gl, this.onBeforeShaderCompilationObservable.notifyObservers(this);
		let o = super.createShaderProgram(e, t, n, r, i, a);
		return this.onAfterShaderCompilationObservable.notifyObservers(this), o;
	}
	_createShaderProgram(e, t, n, r, i = null) {
		let a = r.createProgram();
		if (e.program = a, !a) throw Error("Unable to create program");
		if (r.attachShader(a, t), r.attachShader(a, n), this.webGLVersion > 1 && i) {
			let t = this.createTransformFeedback();
			this.bindTransformFeedback(t), this.setTranformFeedbackVaryings(a, i), e.transformFeedback = t;
		}
		return r.linkProgram(a), this.webGLVersion > 1 && i && this.bindTransformFeedback(null), e.context = r, e.vertexShader = t, e.fragmentShader = n, e.isParallelCompiled || this._finalizePipelineContext(e), a;
	}
	_releaseTexture(e) {
		super._releaseTexture(e);
	}
	_releaseRenderTargetWrapper(e) {
		super._releaseRenderTargetWrapper(e);
		for (let t of this.scenes) {
			for (let n of t.postProcesses) n._outputTexture === e && (n._outputTexture = null);
			for (let n of t.cameras) for (let t of n._postProcesses) t && t._outputTexture === e && (t._outputTexture = null);
		}
	}
	_rescaleTexture(e, n, r, i, a) {
		this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR), this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR), this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE), this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
		let o = this.createRenderTargetTexture({
			width: n.width,
			height: n.height
		}, {
			generateMipMaps: !1,
			type: 0,
			samplingMode: 2,
			generateDepthBuffer: !1,
			generateStencilBuffer: !1
		});
		if (!this._rescalePostProcess && t._RescalePostProcessFactory && (this._rescalePostProcess = t._RescalePostProcessFactory(this)), this._rescalePostProcess) {
			this._rescalePostProcess.externalTextureSamplerBinding = !0;
			let t = () => {
				this._rescalePostProcess.onApply = function(t) {
					t._bindTexture("textureSampler", e);
				};
				let t = r;
				t ||= this.scenes[this.scenes.length - 1], t.postProcessManager.directRender([this._rescalePostProcess], o, !0), this._bindTextureDirectly(this._gl.TEXTURE_2D, n, !0), this._gl.copyTexImage2D(this._gl.TEXTURE_2D, 0, i, 0, 0, n.width, n.height, 0), this.unBindFramebuffer(o), o.dispose(), a && a();
			}, s = this._rescalePostProcess.getEffect();
			s ? s.executeWhenCompiled(t) : this._rescalePostProcess.onEffectCreatedObservable.addOnce((e) => {
				e.executeWhenCompiled(t);
			});
		}
	}
	wrapWebGLTexture(e, t = !1, r = 3, i = 0, a = 0) {
		let o = new f(e, this._gl), s = new n(this, 0, !0);
		return s._hardwareTexture = o, s.baseWidth = i, s.baseHeight = a, s.width = i, s.height = a, s.isReady = !0, s.useMipMaps = t, this.updateTextureSamplingMode(r, s), s;
	}
	_uploadImageToTexture(e, t, n = 0, r = 0) {
		let i = this._gl, a = this._getWebGLTextureType(e.type), o = this._getInternalFormat(e.format), s = this._getRGBABufferInternalSizedFormat(e.type, o), c = e.isCube ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D;
		this._bindTextureDirectly(c, e, !0), this._unpackFlipY(e.invertY);
		let l = i.TEXTURE_2D;
		e.isCube && (l = i.TEXTURE_CUBE_MAP_POSITIVE_X + n), i.texImage2D(l, r, s, o, a, t), this._bindTextureDirectly(c, null, !0);
	}
	updateTextureComparisonFunction(e, t) {
		if (this.webGLVersion === 1) {
			h.Error("WebGL 1 does not support texture comparison.");
			return;
		}
		let n = this._gl;
		e.isCube ? (this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, e, !0), t === 0 ? (n.texParameteri(n.TEXTURE_CUBE_MAP, n.TEXTURE_COMPARE_FUNC, 515), n.texParameteri(n.TEXTURE_CUBE_MAP, n.TEXTURE_COMPARE_MODE, n.NONE)) : (n.texParameteri(n.TEXTURE_CUBE_MAP, n.TEXTURE_COMPARE_FUNC, t), n.texParameteri(n.TEXTURE_CUBE_MAP, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE)), this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null)) : (this._bindTextureDirectly(this._gl.TEXTURE_2D, e, !0), t === 0 ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_COMPARE_FUNC, 515), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_COMPARE_MODE, n.NONE)) : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_COMPARE_FUNC, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE)), this._bindTextureDirectly(this._gl.TEXTURE_2D, null)), e._comparisonFunction = t;
	}
	createInstancesBuffer(e) {
		let t = this._gl.createBuffer();
		if (!t) throw Error("Unable to create instance buffer");
		let n = new d(t);
		return n.capacity = e, this.bindArrayBuffer(n), this._gl.bufferData(this._gl.ARRAY_BUFFER, e, this._gl.DYNAMIC_DRAW), n.references = 1, n;
	}
	deleteInstancesBuffer(e) {
		this._gl.deleteBuffer(e);
	}
	async _clientWaitAsync(e, t = 0, n = 10) {
		let r = this._gl;
		return await new Promise((i, a) => {
			c(() => {
				let n = r.clientWaitSync(e, t, 0);
				if (n == r.WAIT_FAILED) throw Error("clientWaitSync failed");
				return n != r.TIMEOUT_EXPIRED;
			}, i, a, n);
		});
	}
	_readPixelsAsync(e, t, n, r, i, a, o) {
		if (this._webGLVersion < 2) throw Error("_readPixelsAsync only work on WebGL2+");
		let s = this._gl, c = s.createBuffer();
		s.bindBuffer(s.PIXEL_PACK_BUFFER, c), s.bufferData(s.PIXEL_PACK_BUFFER, o.byteLength, s.STREAM_READ), s.readPixels(e, t, n, r, i, a, 0), s.bindBuffer(s.PIXEL_PACK_BUFFER, null);
		let l = s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE, 0);
		return l ? (s.flush(), this._clientWaitAsync(l, 0, 10).then(() => (s.deleteSync(l), s.bindBuffer(s.PIXEL_PACK_BUFFER, c), s.getBufferSubData(s.PIXEL_PACK_BUFFER, 0, o), s.bindBuffer(s.PIXEL_PACK_BUFFER, null), s.deleteBuffer(c), o))) : null;
	}
	dispose() {
		this.hideLoadingUI(), this._rescalePostProcess && this._rescalePostProcess.dispose(), R(this, this._renderingCanvas), super.dispose();
	}
};
q.ALPHA_DISABLE = 0, q.ALPHA_ADD = 1, q.ALPHA_COMBINE = 2, q.ALPHA_SUBTRACT = 3, q.ALPHA_MULTIPLY = 4, q.ALPHA_MAXIMIZED = 5, q.ALPHA_ONEONE = 6, q.ALPHA_PREMULTIPLIED = 7, q.ALPHA_PREMULTIPLIED_PORTERDUFF = 8, q.ALPHA_INTERPOLATE = 9, q.ALPHA_SCREENMODE = 10, q.DELAYLOADSTATE_NONE = 0, q.DELAYLOADSTATE_LOADED = 1, q.DELAYLOADSTATE_LOADING = 2, q.DELAYLOADSTATE_NOTLOADED = 4, q.NEVER = 512, q.ALWAYS = 519, q.LESS = 513, q.EQUAL = 514, q.LEQUAL = 515, q.GREATER = 516, q.GEQUAL = 518, q.NOTEQUAL = 517, q.KEEP = 7680, q.REPLACE = 7681, q.INCR = 7682, q.DECR = 7683, q.INVERT = 5386, q.INCR_WRAP = 34055, q.DECR_WRAP = 34056, q.TEXTURE_CLAMP_ADDRESSMODE = 0, q.TEXTURE_WRAP_ADDRESSMODE = 1, q.TEXTURE_MIRROR_ADDRESSMODE = 2, q.TEXTUREFORMAT_ALPHA = 0, q.TEXTUREFORMAT_LUMINANCE = 1, q.TEXTUREFORMAT_LUMINANCE_ALPHA = 2, q.TEXTUREFORMAT_RGB = 4, q.TEXTUREFORMAT_RGBA = 5, q.TEXTUREFORMAT_RED = 6, q.TEXTUREFORMAT_R = 6, q.TEXTUREFORMAT_R16_UNORM = 33322, q.TEXTUREFORMAT_RG16_UNORM = 33324, q.TEXTUREFORMAT_RGB16_UNORM = 32852, q.TEXTUREFORMAT_RGBA16_UNORM = 32859, q.TEXTUREFORMAT_R16_SNORM = 36760, q.TEXTUREFORMAT_RG16_SNORM = 36761, q.TEXTUREFORMAT_RGB16_SNORM = 36762, q.TEXTUREFORMAT_RGBA16_SNORM = 36763, q.TEXTUREFORMAT_RG = 7, q.TEXTUREFORMAT_RED_INTEGER = 8, q.TEXTUREFORMAT_R_INTEGER = 8, q.TEXTUREFORMAT_RG_INTEGER = 9, q.TEXTUREFORMAT_RGB_INTEGER = 10, q.TEXTUREFORMAT_RGBA_INTEGER = 11, q.TEXTURETYPE_UNSIGNED_BYTE = 0, q.TEXTURETYPE_UNSIGNED_INT = 0, q.TEXTURETYPE_FLOAT = 1, q.TEXTURETYPE_HALF_FLOAT = 2, q.TEXTURETYPE_BYTE = 3, q.TEXTURETYPE_SHORT = 4, q.TEXTURETYPE_UNSIGNED_SHORT = 5, q.TEXTURETYPE_INT = 6, q.TEXTURETYPE_UNSIGNED_INTEGER = 7, q.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 = 8, q.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 = 9, q.TEXTURETYPE_UNSIGNED_SHORT_5_6_5 = 10, q.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV = 11, q.TEXTURETYPE_UNSIGNED_INT_24_8 = 12, q.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV = 13, q.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV = 14, q.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV = 15, q.TEXTURE_NEAREST_SAMPLINGMODE = 1, q.TEXTURE_BILINEAR_SAMPLINGMODE = 2, q.TEXTURE_TRILINEAR_SAMPLINGMODE = 3, q.TEXTURE_NEAREST_NEAREST_MIPLINEAR = 8, q.TEXTURE_LINEAR_LINEAR_MIPNEAREST = 11, q.TEXTURE_LINEAR_LINEAR_MIPLINEAR = 3, q.TEXTURE_NEAREST_NEAREST_MIPNEAREST = 4, q.TEXTURE_NEAREST_LINEAR_MIPNEAREST = 5, q.TEXTURE_NEAREST_LINEAR_MIPLINEAR = 6, q.TEXTURE_NEAREST_LINEAR = 7, q.TEXTURE_NEAREST_NEAREST = 1, q.TEXTURE_LINEAR_NEAREST_MIPNEAREST = 9, q.TEXTURE_LINEAR_NEAREST_MIPLINEAR = 10, q.TEXTURE_LINEAR_LINEAR = 2, q.TEXTURE_LINEAR_NEAREST = 12, q.TEXTURE_EXPLICIT_MODE = 0, q.TEXTURE_SPHERICAL_MODE = 1, q.TEXTURE_PLANAR_MODE = 2, q.TEXTURE_CUBIC_MODE = 3, q.TEXTURE_PROJECTION_MODE = 4, q.TEXTURE_SKYBOX_MODE = 5, q.TEXTURE_INVCUBIC_MODE = 6, q.TEXTURE_EQUIRECTANGULAR_MODE = 7, q.TEXTURE_FIXED_EQUIRECTANGULAR_MODE = 8, q.TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9, q.SCALEMODE_FLOOR = 1, q.SCALEMODE_NEAREST = 2, q.SCALEMODE_CEILING = 3;
//#endregion
//#region node_modules/@babylonjs/core/Misc/smartArray.js
var J = class e {
	constructor(t) {
		this.length = 0, this.data = Array(t), this._id = e._GlobalId++;
	}
	push(e) {
		this.data[this.length++] = e, this.length > this.data.length && (this.data.length *= 2);
	}
	forEach(e) {
		for (let t = 0; t < this.length; t++) e(this.data[t]);
	}
	sort(e) {
		this.data.sort(e);
	}
	reset() {
		this.length = 0;
	}
	dispose() {
		this.reset(), this.data && (this.data.length = 0);
	}
	concat(e) {
		if (e.length !== 0) {
			this.length + e.length > this.data.length && (this.data.length = (this.length + e.length) * 2);
			for (let t = 0; t < e.length; t++) this.data[this.length++] = (e.data || e)[t];
		}
	}
	indexOf(e) {
		let t = this.data.indexOf(e);
		return t >= this.length ? -1 : t;
	}
	contains(e) {
		return this.indexOf(e) !== -1;
	}
};
J._GlobalId = 0;
var Y = class extends J {
	constructor() {
		super(...arguments), this._duplicateId = 0;
	}
	push(e) {
		super.push(e), e.__smartArrayFlags ||= {}, e.__smartArrayFlags[this._id] = this._duplicateId;
	}
	pushNoDuplicate(e) {
		return e.__smartArrayFlags && e.__smartArrayFlags[this._id] === this._duplicateId ? !1 : (this.push(e), !0);
	}
	reset() {
		super.reset(), this._duplicateId++;
	}
	concatWithNoDuplicate(e) {
		if (e.length !== 0) {
			this.length + e.length > this.data.length && (this.data.length = (this.length + e.length) * 2);
			for (let t = 0; t < e.length; t++) {
				let n = (e.data || e)[t];
				this.pushNoDuplicate(n);
			}
		}
	}
}, X = class e {
	constructor(e, t, n = !1, r, i = !1, a) {
		this._uniformNames = [], this._valueCache = {}, this._engine = e, this._noUBO = !e.supportsUniformBuffers || i, this._dynamic = n, this._name = r ?? "no-name", this._data = t || [], this._uniformLocations = {}, this._uniformSizes = {}, this._uniformArraySizes = {}, this._uniformLocationPointer = 0, this._needSync = !1, this._trackUBOsInFrame = !1, (a === void 0 && this._engine._features.trackUbosInFrame || a === !0) && (this._buffers = [], this._bufferIndex = -1, this._bufferUpdatedLastFrame = !1, this._createBufferOnWrite = !1, this._currentFrameId = 0, this._trackUBOsInFrame = !0), this._noUBO ? (this.updateMatrix3x3 = this._updateMatrix3x3ForEffect, this.updateMatrix2x2 = this._updateMatrix2x2ForEffect, this.updateFloat = this._updateFloatForEffect, this.updateFloat2 = this._updateFloat2ForEffect, this.updateFloat3 = this._updateFloat3ForEffect, this.updateFloat4 = this._updateFloat4ForEffect, this.updateFloatArray = this._updateFloatArrayForEffect, this.updateArray = this._updateArrayForEffect, this.updateIntArray = this._updateIntArrayForEffect, this.updateUIntArray = this._updateUIntArrayForEffect, this.updateMatrix = this._updateMatrixForEffect, this.updateMatrices = this._updateMatricesForEffect, this.updateVector3 = this._updateVector3ForEffect, this.updateVector4 = this._updateVector4ForEffect, this.updateColor3 = this._updateColor3ForEffect, this.updateColor4 = this._updateColor4ForEffect, this.updateDirectColor4 = this._updateDirectColor4ForEffect, this.updateInt = this._updateIntForEffect, this.updateInt2 = this._updateInt2ForEffect, this.updateInt3 = this._updateInt3ForEffect, this.updateInt4 = this._updateInt4ForEffect, this.updateUInt = this._updateUIntForEffect, this.updateUInt2 = this._updateUInt2ForEffect, this.updateUInt3 = this._updateUInt3ForEffect, this.updateUInt4 = this._updateUInt4ForEffect) : (this._engine._uniformBuffers.push(this), this.updateMatrix3x3 = this._updateMatrix3x3ForUniform, this.updateMatrix2x2 = this._updateMatrix2x2ForUniform, this.updateFloat = this._updateFloatForUniform, this.updateFloat2 = this._updateFloat2ForUniform, this.updateFloat3 = this._updateFloat3ForUniform, this.updateFloat4 = this._updateFloat4ForUniform, this.updateFloatArray = this._updateFloatArrayForUniform, this.updateArray = this._updateArrayForUniform, this.updateIntArray = this._updateIntArrayForUniform, this.updateUIntArray = this._updateUIntArrayForUniform, this.updateMatrix = this._updateMatrixForUniform, this.updateMatrices = this._updateMatricesForUniform, this.updateVector3 = this._updateVector3ForUniform, this.updateVector4 = this._updateVector4ForUniform, this.updateColor3 = this._updateColor3ForUniform, this.updateColor4 = this._updateColor4ForUniform, this.updateDirectColor4 = this._updateDirectColor4ForUniform, this.updateInt = this._updateIntForUniform, this.updateInt2 = this._updateInt2ForUniform, this.updateInt3 = this._updateInt3ForUniform, this.updateInt4 = this._updateInt4ForUniform, this.updateUInt = this._updateUIntForUniform, this.updateUInt2 = this._updateUInt2ForUniform, this.updateUInt3 = this._updateUInt3ForUniform, this.updateUInt4 = this._updateUInt4ForUniform);
	}
	get useUbo() {
		return !this._noUBO;
	}
	get isSync() {
		return !this._needSync;
	}
	isDynamic() {
		return this._dynamic;
	}
	getData() {
		return this._bufferData;
	}
	getBuffer() {
		return this._buffer;
	}
	getUniformNames() {
		return this._uniformNames;
	}
	_fillAlignment(e) {
		let t;
		if (t = e <= 2 ? e : 4, this._uniformLocationPointer % t !== 0) {
			let e = this._uniformLocationPointer;
			this._uniformLocationPointer += t - this._uniformLocationPointer % t;
			let n = this._uniformLocationPointer - e;
			for (let e = 0; e < n; e++) this._data.push(0);
		}
	}
	addUniform(e, t, n = 0) {
		if (n > 0 && typeof t == "number" && (this._uniformArraySizes[e] = {
			strideSize: t,
			arraySize: n
		}), this._uniformLocations[e] !== void 0 || (this._uniformNames.push(e), this._noUBO)) return;
		let r;
		if (n > 0) {
			if (t instanceof Array) throw "addUniform should not be use with Array in UBO: " + e;
			if (this._fillAlignment(4), t == 16) t *= n;
			else {
				let e = (4 - t) * n;
				t = t * n + e;
			}
			r = [];
			for (let e = 0; e < t; e++) r.push(0);
		} else {
			if (t instanceof Array) r = t, t = r.length;
			else {
				r = [];
				for (let e = 0; e < t; e++) r.push(0);
			}
			this._fillAlignment(t);
		}
		this._uniformSizes[e] = t, this._uniformLocations[e] = this._uniformLocationPointer, this._uniformLocationPointer += t;
		for (let e = 0; e < t; e++) this._data.push(r[e]);
		this._needSync = !0;
	}
	addMatrix(e, t) {
		this.addUniform(e, Array.prototype.slice.call(t.asArray()));
	}
	addFloat2(e, t, n) {
		let r = [t, n];
		this.addUniform(e, r);
	}
	addFloat3(e, t, n, r) {
		let i = [
			t,
			n,
			r
		];
		this.addUniform(e, i);
	}
	addColor3(e, t) {
		let n = [
			t.r,
			t.g,
			t.b
		];
		this.addUniform(e, n);
	}
	addColor4(e, t, n) {
		let r = [
			t.r,
			t.g,
			t.b,
			n
		];
		this.addUniform(e, r);
	}
	addVector3(e, t) {
		let n = [
			t.x,
			t.y,
			t.z
		];
		this.addUniform(e, n);
	}
	addMatrix3x3(e) {
		this.addUniform(e, 12);
	}
	addMatrix2x2(e) {
		this.addUniform(e, 8);
	}
	create() {
		this._noUBO || this._buffer || (this._fillAlignment(4), this._bufferData = new Float32Array(this._data), this._rebuild(), this._needSync = !0);
	}
	_getNamesDebug() {
		let e = [], t = 0;
		for (let n in this._uniformLocations) if (e.push(n), ++t === 10) break;
		return e.join(",");
	}
	_rebuild() {
		this._noUBO || !this._bufferData || (this._buffer = this._dynamic ? this._engine.createDynamicUniformBuffer(this._bufferData, this._name + "_UniformList:" + this._getNamesDebug()) : this._engine.createUniformBuffer(this._bufferData, this._name + "_UniformList:" + this._getNamesDebug()), this._trackUBOsInFrame && (this._buffers.push([this._buffer, this._engine._features.checkUbosContentBeforeUpload ? this._bufferData.slice() : void 0]), this._bufferIndex = this._buffers.length - 1, this._createBufferOnWrite = !1));
	}
	_rebuildAfterContextLost() {
		this._trackUBOsInFrame && (this._buffers = [], this._currentFrameId = 0), this._rebuild();
	}
	get _numBuffers() {
		return this._buffers.length;
	}
	get _indexBuffer() {
		return this._bufferIndex;
	}
	get name() {
		return this._name;
	}
	set name(e) {
		this._name = e;
	}
	get currentEffect() {
		return this._currentEffect;
	}
	_buffersEqual(e, t) {
		for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
		return !0;
	}
	_copyBuffer(e, t) {
		for (let n = 0; n < e.length; ++n) t[n] = e[n];
	}
	update() {
		if (!this._noUBO) {
			if (this.bindUniformBuffer(), !this._buffer) {
				this.create();
				return;
			}
			if (!this._dynamic && !this._needSync) {
				this._createBufferOnWrite = this._trackUBOsInFrame;
				return;
			}
			if (this._buffers && this._buffers.length > 1 && this._buffers[this._bufferIndex][1]) {
				if (this._buffersEqual(this._bufferData, this._buffers[this._bufferIndex][1])) {
					this._needSync = !1, this._createBufferOnWrite = this._trackUBOsInFrame;
					return;
				}
				this._copyBuffer(this._bufferData, this._buffers[this._bufferIndex][1]);
			}
			this._bufferUpdatedLastFrame = !0, this._engine.updateUniformBuffer(this._buffer, this._bufferData), this._needSync = !1, this._createBufferOnWrite = this._trackUBOsInFrame;
		}
	}
	_createNewBuffer() {
		this._bufferIndex + 1 < this._buffers.length ? (this._bufferIndex++, this._buffer = this._buffers[this._bufferIndex][0], this._createBufferOnWrite = !1, this._needSync = !0) : this._rebuild();
	}
	_checkNewFrame() {
		this._trackUBOsInFrame && this._currentFrameId !== this._engine.frameId && (this._currentFrameId = this._engine.frameId, this._createBufferOnWrite = !1, this._buffers && this._buffers.length > 0 ? (this._needSync = this._buffers.length === 1 ? !this._bufferUpdatedLastFrame : this._bufferIndex !== 0, this._bufferIndex = 0, this._buffer = this._buffers[this._bufferIndex][0]) : this._bufferIndex = -1);
	}
	updateUniform(e, t, n) {
		this._checkNewFrame();
		let r = this._uniformLocations[e];
		if (r === void 0) {
			if (this._buffer) {
				h.Error("Cannot add an uniform after UBO has been created. uniformName=" + e);
				return;
			}
			this.addUniform(e, n), r = this._uniformLocations[e];
		}
		if (this._buffer || this.create(), this._dynamic) for (let e = 0; e < n; e++) this._bufferData[r + e] = t[e];
		else {
			let e = !1;
			for (let i = 0; i < n; i++) (n === 16 && !this._engine._features.uniformBufferHardCheckMatrix || this._bufferData[r + i] !== Math.fround(t[i])) && (e = !0, this._createBufferOnWrite && this._createNewBuffer(), this._bufferData[r + i] = t[i]);
			this._needSync = this._needSync || e;
		}
	}
	updateUniformArray(e, t, n) {
		this._checkNewFrame();
		let r = this._uniformLocations[e];
		if (r === void 0) {
			h.Error("Cannot add an uniform Array dynamically. Please, add it using addUniform and make sure that uniform buffers are supported by the current engine.");
			return;
		}
		this._buffer || this.create();
		let i = this._uniformArraySizes[e];
		if (this._dynamic) for (let e = 0; e < n; e++) this._bufferData[r + e] = t[e];
		else {
			let e = !1, a = 0, o = 0;
			for (let s = 0; s < n; s++) if (this._bufferData[r + o * 4 + a] !== ee.FloatRound(t[s]) && (e = !0, this._createBufferOnWrite && this._createNewBuffer(), this._bufferData[r + o * 4 + a] = t[s]), a++, a === i.strideSize) {
				for (; a < 4; a++) this._bufferData[r + o * 4 + a] = 0;
				a = 0, o++;
			}
			this._needSync = this._needSync || e;
		}
	}
	_cacheMatrix(e, t) {
		this._checkNewFrame();
		let n = this._valueCache[e], r = t.updateFlag;
		return n !== void 0 && n === r ? !1 : (this._valueCache[e] = r, !0);
	}
	_updateMatrix3x3ForUniform(t, n) {
		for (let t = 0; t < 3; t++) e._TempBuffer[t * 4] = n[t * 3], e._TempBuffer[t * 4 + 1] = n[t * 3 + 1], e._TempBuffer[t * 4 + 2] = n[t * 3 + 2], e._TempBuffer[t * 4 + 3] = 0;
		this.updateUniform(t, e._TempBuffer, 12);
	}
	_updateMatrix3x3ForEffect(e, t) {
		this._currentEffect.setMatrix3x3(e, t);
	}
	_updateMatrix2x2ForEffect(e, t) {
		this._currentEffect.setMatrix2x2(e, t);
	}
	_updateMatrix2x2ForUniform(t, n) {
		for (let t = 0; t < 2; t++) e._TempBuffer[t * 4] = n[t * 2], e._TempBuffer[t * 4 + 1] = n[t * 2 + 1], e._TempBuffer[t * 4 + 2] = 0, e._TempBuffer[t * 4 + 3] = 0;
		this.updateUniform(t, e._TempBuffer, 8);
	}
	_updateFloatForEffect(e, t, n = "") {
		this._currentEffect.setFloat(e + n, t);
	}
	_updateFloatForUniform(t, n) {
		e._TempBuffer[0] = n, this.updateUniform(t, e._TempBuffer, 1);
	}
	_updateFloat2ForEffect(e, t, n, r = "") {
		this._currentEffect.setFloat2(e + r, t, n);
	}
	_updateFloat2ForUniform(t, n, r) {
		e._TempBuffer[0] = n, e._TempBuffer[1] = r, this.updateUniform(t, e._TempBuffer, 2);
	}
	_updateFloat3ForEffect(e, t, n, r, i = "") {
		this._currentEffect.setFloat3(e + i, t, n, r);
	}
	_updateFloat3ForUniform(t, n, r, i) {
		e._TempBuffer[0] = n, e._TempBuffer[1] = r, e._TempBuffer[2] = i, this.updateUniform(t, e._TempBuffer, 3);
	}
	_updateFloat4ForEffect(e, t, n, r, i, a = "") {
		this._currentEffect.setFloat4(e + a, t, n, r, i);
	}
	_updateFloat4ForUniform(t, n, r, i, a) {
		e._TempBuffer[0] = n, e._TempBuffer[1] = r, e._TempBuffer[2] = i, e._TempBuffer[3] = a, this.updateUniform(t, e._TempBuffer, 4);
	}
	_updateFloatArrayForEffect(e, t, n = "") {
		switch (this._uniformArraySizes[e]?.strideSize) {
			case 2:
				this._currentEffect.setFloatArray2(e + n, t);
				break;
			case 3:
				this._currentEffect.setFloatArray3(e + n, t);
				break;
			case 4:
				this._currentEffect.setFloatArray4(e + n, t);
				break;
			default: this._currentEffect.setFloatArray(e + n, t);
		}
	}
	_updateFloatArrayForUniform(e, t) {
		this.updateUniformArray(e, t, t.length);
	}
	_updateArrayForEffect(e, t) {
		this._currentEffect.setArray(e, t);
	}
	_updateArrayForUniform(e, t) {
		this.updateUniformArray(e, t, t.length);
	}
	_updateIntArrayForEffect(e, t) {
		this._currentEffect.setIntArray(e, t);
	}
	_updateIntArrayForUniform(t, n) {
		e._TempBufferInt32View.set(n), this.updateUniformArray(t, e._TempBuffer, n.length);
	}
	_updateUIntArrayForEffect(e, t) {
		this._currentEffect.setUIntArray(e, t);
	}
	_updateUIntArrayForUniform(t, n) {
		e._TempBufferUInt32View.set(n), this.updateUniformArray(t, e._TempBuffer, n.length);
	}
	_updateMatrixForEffect(e, t) {
		this._currentEffect.setMatrix(e, t);
	}
	_updateMatrixForUniform(e, t) {
		this._cacheMatrix(e, t) && this.updateUniform(e, t.asArray(), 16);
	}
	_updateMatricesForEffect(e, t) {
		this._currentEffect.setMatrices(e, t);
	}
	_updateMatricesForUniform(e, t) {
		this.updateUniform(e, t, t.length);
	}
	_updateVector3ForEffect(e, t) {
		this._currentEffect.setVector3(e, t);
	}
	_updateVector3ForUniform(t, n) {
		e._TempBuffer[0] = n.x, e._TempBuffer[1] = n.y, e._TempBuffer[2] = n.z, this.updateUniform(t, e._TempBuffer, 3);
	}
	_updateVector4ForEffect(e, t) {
		this._currentEffect.setVector4(e, t);
	}
	_updateVector4ForUniform(t, n) {
		e._TempBuffer[0] = n.x, e._TempBuffer[1] = n.y, e._TempBuffer[2] = n.z, e._TempBuffer[3] = n.w, this.updateUniform(t, e._TempBuffer, 4);
	}
	_updateColor3ForEffect(e, t, n = "") {
		this._currentEffect.setColor3(e + n, t);
	}
	_updateColor3ForUniform(t, n) {
		e._TempBuffer[0] = n.r, e._TempBuffer[1] = n.g, e._TempBuffer[2] = n.b, this.updateUniform(t, e._TempBuffer, 3);
	}
	_updateColor4ForEffect(e, t, n, r = "") {
		this._currentEffect.setColor4(e + r, t, n);
	}
	_updateDirectColor4ForEffect(e, t, n = "") {
		this._currentEffect.setDirectColor4(e + n, t);
	}
	_updateColor4ForUniform(t, n, r) {
		e._TempBuffer[0] = n.r, e._TempBuffer[1] = n.g, e._TempBuffer[2] = n.b, e._TempBuffer[3] = r, this.updateUniform(t, e._TempBuffer, 4);
	}
	_updateDirectColor4ForUniform(t, n) {
		e._TempBuffer[0] = n.r, e._TempBuffer[1] = n.g, e._TempBuffer[2] = n.b, e._TempBuffer[3] = n.a, this.updateUniform(t, e._TempBuffer, 4);
	}
	_updateIntForEffect(e, t, n = "") {
		this._currentEffect.setInt(e + n, t);
	}
	_updateIntForUniform(t, n) {
		e._TempBufferInt32View[0] = n, this.updateUniform(t, e._TempBuffer, 1);
	}
	_updateInt2ForEffect(e, t, n, r = "") {
		this._currentEffect.setInt2(e + r, t, n);
	}
	_updateInt2ForUniform(t, n, r) {
		e._TempBufferInt32View[0] = n, e._TempBufferInt32View[1] = r, this.updateUniform(t, e._TempBuffer, 2);
	}
	_updateInt3ForEffect(e, t, n, r, i = "") {
		this._currentEffect.setInt3(e + i, t, n, r);
	}
	_updateInt3ForUniform(t, n, r, i) {
		e._TempBufferInt32View[0] = n, e._TempBufferInt32View[1] = r, e._TempBufferInt32View[2] = i, this.updateUniform(t, e._TempBuffer, 3);
	}
	_updateInt4ForEffect(e, t, n, r, i, a = "") {
		this._currentEffect.setInt4(e + a, t, n, r, i);
	}
	_updateInt4ForUniform(t, n, r, i, a) {
		e._TempBufferInt32View[0] = n, e._TempBufferInt32View[1] = r, e._TempBufferInt32View[2] = i, e._TempBufferInt32View[3] = a, this.updateUniform(t, e._TempBuffer, 4);
	}
	_updateUIntForEffect(e, t, n = "") {
		this._currentEffect.setUInt(e + n, t);
	}
	_updateUIntForUniform(t, n) {
		e._TempBufferUInt32View[0] = n, this.updateUniform(t, e._TempBuffer, 1);
	}
	_updateUInt2ForEffect(e, t, n, r = "") {
		this._currentEffect.setUInt2(e + r, t, n);
	}
	_updateUInt2ForUniform(t, n, r) {
		e._TempBufferUInt32View[0] = n, e._TempBufferUInt32View[1] = r, this.updateUniform(t, e._TempBuffer, 2);
	}
	_updateUInt3ForEffect(e, t, n, r, i = "") {
		this._currentEffect.setUInt3(e + i, t, n, r);
	}
	_updateUInt3ForUniform(t, n, r, i) {
		e._TempBufferUInt32View[0] = n, e._TempBufferUInt32View[1] = r, e._TempBufferUInt32View[2] = i, this.updateUniform(t, e._TempBuffer, 3);
	}
	_updateUInt4ForEffect(e, t, n, r, i, a = "") {
		this._currentEffect.setUInt4(e + a, t, n, r, i);
	}
	_updateUInt4ForUniform(t, n, r, i, a) {
		e._TempBufferUInt32View[0] = n, e._TempBufferUInt32View[1] = r, e._TempBufferUInt32View[2] = i, e._TempBufferUInt32View[3] = a, this.updateUniform(t, e._TempBuffer, 4);
	}
	setTexture(e, t) {
		this._currentEffect.setTexture(e, t);
	}
	setTextureArray(e, t) {
		this._currentEffect.setTextureArray(e, t);
	}
	bindTexture(e, t) {
		this._currentEffect._bindTexture(e, t);
	}
	updateUniformDirectly(e, t) {
		this.updateUniform(e, t, t.length), this.update();
	}
	bindToEffect(e, t) {
		this._currentEffect = e, this._currentEffectName = t;
	}
	bindUniformBuffer() {
		!this._noUBO && this._buffer && this._currentEffect && this._currentEffect.bindUniformBuffer(this._buffer, this._currentEffectName);
	}
	unbindEffect() {
		this._currentEffect = void 0, this._currentEffectName = void 0;
	}
	setDataBuffer(e) {
		if (!this._buffers) return this._buffer === e;
		for (let t = 0; t < this._buffers.length; ++t) if (this._buffers[t][0] === e) return this._bufferIndex = t, this._buffer = e, this._createBufferOnWrite = !1, this._currentEffect = void 0, this._buffers.length > 1 && this._buffers[t][1] && this._bufferData.set(this._buffers[t][1]), this._valueCache = {}, this._currentFrameId = this._engine.frameId, !0;
		return !1;
	}
	has(e) {
		return this._uniformLocations[e] !== void 0;
	}
	dispose() {
		if (this._noUBO) return;
		let e = this._engine._uniformBuffers, t = e.indexOf(this);
		if (t !== -1 && (e[t] = e[e.length - 1], e.pop()), this._trackUBOsInFrame && this._buffers) for (let e = 0; e < this._buffers.length; ++e) {
			let t = this._buffers[e][0];
			this._engine._releaseBuffer(t);
		}
		else this._buffer && this._engine._releaseBuffer(this._buffer) && (this._buffer = null);
	}
};
X._MAX_UNIFORM_SIZE = 256, X._TempBuffer = new Float32Array(X._MAX_UNIFORM_SIZE), X._TempBufferInt32View = new Int32Array(X._TempBuffer.buffer), X._TempBufferUInt32View = new Uint32Array(X._TempBuffer.buffer);
//#endregion
//#region node_modules/@babylonjs/core/PostProcesses/postProcessManager.js
var ce = class {
	constructor(e) {
		this._vertexBuffers = {}, this.onBeforeRenderObservable = new t(), this._scene = e;
	}
	_prepareBuffers() {
		if (this._vertexBuffers[b.PositionKind]) return;
		let e = [];
		e.push(1, 1), e.push(-1, 1), e.push(-1, -1), e.push(1, -1), this._vertexBuffers[b.PositionKind] = new b(this._scene.getEngine(), e, b.PositionKind, !1, !1, 2), this._buildIndexBuffer();
	}
	_buildIndexBuffer() {
		let e = [];
		e.push(0), e.push(1), e.push(2), e.push(0), e.push(2), e.push(3), this._indexBuffer = this._scene.getEngine().createIndexBuffer(e);
	}
	_rebuild() {
		let e = this._vertexBuffers[b.PositionKind];
		e && (e._rebuild(), this._buildIndexBuffer());
	}
	_prepareFrame(e = null, t = null) {
		let n = this._scene.activeCamera;
		return !n || (t ||= n._postProcesses.filter((e) => e != null), !t || t.length === 0 || !this._scene.postProcessesEnabled) ? !1 : (t[0].activate(n, e, t != null), !0);
	}
	directRender(e, t = null, n = !1, r = 0, i = 0, a = !1, o = e.length) {
		let s = this._scene.getEngine();
		for (let c = 0; c < o; c++) {
			c < e.length - 1 ? e[c + 1].activate(this._scene.activeCamera || this._scene, t?.texture) : (t ? s.bindFramebuffer(t, r, void 0, void 0, n, i) : a || s.restoreDefaultFramebuffer(), s._debugInsertMarker?.(`post process ${e[c].name} output`));
			let o = e[c], l = o.apply();
			l && (o.onBeforeRenderObservable.notifyObservers(l), this._prepareBuffers(), s.bindBuffers(this._vertexBuffers, this._indexBuffer, l), s.drawElementsType(0, 0, 6), o.onAfterRenderObservable.notifyObservers(l));
		}
		s.setDepthBuffer(!0), s.setDepthWrite(!0);
	}
	_finalizeFrame(e, t, n, r, i = !1) {
		let a = this._scene.activeCamera;
		if (!a || (this.onBeforeRenderObservable.notifyObservers(this), r ||= a._postProcesses.filter((e) => e != null), r.length === 0 || !this._scene.postProcessesEnabled)) return;
		let o = this._scene.getEngine();
		for (let s = 0, c = r.length; s < c; s++) {
			let l = r[s];
			if (s < c - 1 ? l._outputTexture = r[s + 1].activate(a, t?.texture) : (t ? (o.bindFramebuffer(t, n, void 0, void 0, i), l._outputTexture = t) : (o.restoreDefaultFramebuffer(), l._outputTexture = null), o._debugInsertMarker?.(`post process ${r[s].name} output`)), e) break;
			let u = l.apply();
			u && (l.onBeforeRenderObservable.notifyObservers(u), this._prepareBuffers(), o.bindBuffers(this._vertexBuffers, this._indexBuffer, u), o.drawElementsType(0, 0, 6), l.onAfterRenderObservable.notifyObservers(u));
		}
		o.setDepthBuffer(!0), o.setDepthWrite(!0), o.setAlphaMode(0);
	}
	dispose() {
		let e = this._vertexBuffers[b.PositionKind];
		e && (e.dispose(), this._vertexBuffers[b.PositionKind] = null), this._indexBuffer &&= (this._scene.getEngine()._releaseBuffer(this._indexBuffer), null);
	}
}, Z = class e {
	set opaqueSortCompareFn(t) {
		this._opaqueSortCompareFn = t || e.PainterSortCompare, this._renderOpaque = this._renderOpaqueSorted;
	}
	set alphaTestSortCompareFn(t) {
		this._alphaTestSortCompareFn = t || e.PainterSortCompare, this._renderAlphaTest = this._renderAlphaTestSorted;
	}
	set transparentSortCompareFn(t) {
		this._transparentSortCompareFn = t || e.defaultTransparentSortCompare, this._renderTransparent = this._renderTransparentSorted;
	}
	constructor(e, t, n = null, r = null, i = null) {
		this.index = e, this._opaqueSubMeshes = new J(256), this._transparentSubMeshes = new J(256), this._alphaTestSubMeshes = new J(256), this._depthOnlySubMeshes = new J(256), this._particleSystems = new J(256), this._spriteManagers = new J(256), this._empty = !0, this._edgesRenderers = new Y(16), this.disableDepthPrePass = !1, this._scene = t, this.opaqueSortCompareFn = n, this.alphaTestSortCompareFn = r, this.transparentSortCompareFn = i;
	}
	render(e, t, n, r, i = !0, a = !0, o = !0, s = !0, c) {
		if (e) {
			e(this._opaqueSubMeshes, this._alphaTestSubMeshes, this._transparentSubMeshes, this._depthOnlySubMeshes);
			return;
		}
		let l = this._scene.getEngine();
		i && this._depthOnlySubMeshes.length !== 0 && (l.setColorWrite(!1), this._renderAlphaTest(this._depthOnlySubMeshes), l.setColorWrite(!0)), a && this._opaqueSubMeshes.length !== 0 && this._renderOpaque(this._opaqueSubMeshes), o && this._alphaTestSubMeshes.length !== 0 && this._renderAlphaTest(this._alphaTestSubMeshes);
		let u = l.getStencilBuffer();
		if (l.setStencilBuffer(!1), t && this._renderSprites(), n && this._renderParticles(r), this.onBeforeTransparentRendering && this.onBeforeTransparentRendering(), s && (c || this._transparentSubMeshes.length !== 0 || this._scene.useOrderIndependentTransparency)) {
			if (l.setStencilBuffer(u), c) c(this._transparentSubMeshes, this);
			else if (this._scene.useOrderIndependentTransparency) {
				let e = this._scene.depthPeelingRenderer.render(this._transparentSubMeshes);
				e.length && this._renderTransparent(e);
			} else this._renderTransparent(this._transparentSubMeshes);
			l.setAlphaMode(0);
		}
		if (l.setStencilBuffer(!1), a && this._edgesRenderers.length) {
			for (let e = 0; e < this._edgesRenderers.length; e++) this._edgesRenderers.data[e].render();
			l.setAlphaMode(0);
		}
		l.setStencilBuffer(u);
	}
	_renderOpaqueSorted(t) {
		e._RenderSorted(t, this._opaqueSortCompareFn, this._scene.activeCamera, !1, this.disableDepthPrePass);
	}
	_renderAlphaTestSorted(t) {
		e._RenderSorted(t, this._alphaTestSortCompareFn, this._scene.activeCamera, !1, this.disableDepthPrePass);
	}
	_renderTransparentSorted(t) {
		e._RenderSorted(t, this._transparentSortCompareFn, this._scene.activeCamera, !0, this.disableDepthPrePass);
	}
	static _RenderSorted(t, n, r, i, a) {
		let o = 0, s, c = r ? r.globalPosition : e._ZeroVector;
		if (i) for (; o < t.length; o++) s = t.data[o], s._alphaIndex = s.getMesh().alphaIndex, s._distanceToCamera = g.Distance(s.getBoundingInfo().boundingSphere.centerWorld, c);
		let l = t.length === t.data.length ? t.data : t.data.slice(0, t.length);
		n && l.sort(n);
		let u = l[0].getMesh().getScene();
		for (o = 0; o < l.length; o++) if (s = l[o], !(u._activeMeshesFrozenButKeepClipping && !s.isInFrustum(u._frustumPlanes))) {
			if (i) {
				let e = s.getMaterial();
				if (e && e.needDepthPrePass && !a) {
					let t = e.getScene().getEngine();
					t.setColorWrite(!1), t.setAlphaMode(0), s.render(!1), t.setColorWrite(!0);
				}
			}
			s.render(i);
		}
	}
	static defaultTransparentSortCompare(t, n) {
		return t._alphaIndex > n._alphaIndex ? 1 : t._alphaIndex < n._alphaIndex ? -1 : e.backToFrontSortCompare(t, n);
	}
	static backToFrontSortCompare(e, t) {
		return e._distanceToCamera < t._distanceToCamera ? 1 : e._distanceToCamera > t._distanceToCamera ? -1 : 0;
	}
	static frontToBackSortCompare(e, t) {
		return e._distanceToCamera < t._distanceToCamera ? -1 : +(e._distanceToCamera > t._distanceToCamera);
	}
	static PainterSortCompare(e, t) {
		let n = e.getMesh(), r = t.getMesh();
		return n.material && r.material ? n.material.uniqueId - r.material.uniqueId : n.uniqueId - r.uniqueId;
	}
	prepare() {
		this._opaqueSubMeshes.reset(), this._transparentSubMeshes.reset(), this._alphaTestSubMeshes.reset(), this._depthOnlySubMeshes.reset(), this._particleSystems.reset(), this.prepareSprites(), this._edgesRenderers.reset(), this._empty = !0;
	}
	prepareSprites() {
		this._spriteManagers.reset();
	}
	dispose() {
		this._opaqueSubMeshes.dispose(), this._transparentSubMeshes.dispose(), this._alphaTestSubMeshes.dispose(), this._depthOnlySubMeshes.dispose(), this._particleSystems.dispose(), this._spriteManagers.dispose(), this._edgesRenderers.dispose();
	}
	dispatch(e, t, n) {
		t === void 0 && (t = e.getMesh()), n === void 0 && (n = e.getMaterial()), n != null && (n.needAlphaBlendingForMesh(t) ? this._transparentSubMeshes.push(e) : n.needAlphaTestingForMesh(t) ? (n.needDepthPrePass && !this.disableDepthPrePass && this._depthOnlySubMeshes.push(e), this._alphaTestSubMeshes.push(e)) : (n.needDepthPrePass && !this.disableDepthPrePass && this._depthOnlySubMeshes.push(e), this._opaqueSubMeshes.push(e)), t._renderingGroup = this, t._edgesRenderer && t.isEnabled() && t.isVisible && t._edgesRenderer.isEnabled && this._edgesRenderers.pushNoDuplicate(t._edgesRenderer), this._empty = !1);
	}
	dispatchSprites(e) {
		this._spriteManagers.push(e), this._empty = !1;
	}
	dispatchParticles(e) {
		this._particleSystems.push(e), this._empty = !1;
	}
	_renderParticles(e) {
		if (this._particleSystems.length === 0) return;
		let t = this._scene.activeCamera;
		this._scene.onBeforeParticlesRenderingObservable.notifyObservers(this._scene);
		for (let n = 0; n < this._particleSystems.length; n++) {
			let r = this._particleSystems.data[n];
			if ((t && t.layerMask & r.layerMask) === 0) continue;
			let i = r.emitter;
			(!i.position || !e || e.indexOf(i) !== -1) && this._scene._activeParticles.addCount(r.render(), !1);
		}
		this._scene.onAfterParticlesRenderingObservable.notifyObservers(this._scene);
	}
	_renderSprites() {
		if (!this._scene.spritesEnabled || this._spriteManagers.length === 0) return;
		let e = this._scene.activeCamera;
		this._scene.onBeforeSpritesRenderingObservable.notifyObservers(this._scene);
		for (let t = 0; t < this._spriteManagers.length; t++) {
			let n = this._spriteManagers.data[t];
			(e && e.layerMask & n.layerMask) !== 0 && n.render();
		}
		this._scene.onAfterSpritesRenderingObservable.notifyObservers(this._scene);
	}
};
Z._ZeroVector = g.Zero();
//#endregion
//#region node_modules/@babylonjs/core/Rendering/renderingManager.js
var le = class {}, Q = class e {
	get disableDepthPrePass() {
		return this._disableDepthPrePass;
	}
	set disableDepthPrePass(e) {
		this._disableDepthPrePass = e;
		for (let t of this._renderingGroups) t.disableDepthPrePass = e;
	}
	get maintainStateBetweenFrames() {
		return this._maintainStateBetweenFrames;
	}
	set maintainStateBetweenFrames(e) {
		e !== this._maintainStateBetweenFrames && (this._maintainStateBetweenFrames = e, this._maintainStateBetweenFrames || this.restoreDispachedFlags());
	}
	restoreDispachedFlags() {
		for (let e of this._scene.meshes) if (e.subMeshes) for (let t of e.subMeshes) t._wasDispatched = !1;
		if (this._scene.spriteManagers) for (let e of this._scene.spriteManagers) e._wasDispatched = !1;
		for (let e of this._scene.particleSystems) e._wasDispatched = !1;
	}
	constructor(t) {
		this._useSceneAutoClearSetup = !1, this._disableDepthPrePass = !1, this._renderingGroups = [], this._autoClearDepthStencil = {}, this._customOpaqueSortCompareFn = {}, this._customAlphaTestSortCompareFn = {}, this._customTransparentSortCompareFn = {}, this._renderingGroupInfo = new le(), this._maintainStateBetweenFrames = !1, this._scene = t;
		for (let t = e.MIN_RENDERINGGROUPS; t < e.MAX_RENDERINGGROUPS; t++) this._autoClearDepthStencil[t] = {
			autoClear: !0,
			depth: !0,
			stencil: !0
		};
	}
	get renderingGroups() {
		return this._renderingGroups;
	}
	getRenderingGroup(e) {
		let t = e || 0;
		return this._prepareRenderingGroup(t), this._renderingGroups[t];
	}
	_clearDepthStencilBuffer(e = !0, t = !0) {
		this._depthStencilBufferAlreadyCleaned ||= (this._scene.getEngine().clear(null, !1, e, t), !0);
	}
	render(t, n, r, i, a = !0, o = !0, s = !0, c = !0, l) {
		let u = this._renderingGroupInfo;
		if (u.scene = this._scene, u.camera = this._scene.activeCamera, u.renderingManager = this, this._scene.spriteManagers && i) for (let e = 0; e < this._scene.spriteManagers.length; e++) {
			let t = this._scene.spriteManagers[e];
			this.dispatchSprites(t);
		}
		for (let d = e.MIN_RENDERINGGROUPS; d < e.MAX_RENDERINGGROUPS; d++) {
			this._depthStencilBufferAlreadyCleaned = d === e.MIN_RENDERINGGROUPS;
			let f = this._renderingGroups[d];
			if (!f || f._empty) continue;
			let p = 1 << d;
			if (u.renderingGroupId = d, this._scene.onBeforeRenderingGroupObservable.notifyObservers(u, p), e.AUTOCLEAR) {
				let e = this._useSceneAutoClearSetup ? this._scene.getAutoClearDepthStencilSetup(d) : this._autoClearDepthStencil[d];
				e && e.autoClear && this._clearDepthStencilBuffer(e.depth, e.stencil);
			}
			for (let e of this._scene._beforeRenderingGroupDrawStage) e.action(d);
			f.render(t, i, r, n, a, o, s, c, l);
			for (let e of this._scene._afterRenderingGroupDrawStage) e.action(d);
			this._scene.onAfterRenderingGroupObservable.notifyObservers(u, p);
		}
	}
	reset() {
		if (!this.maintainStateBetweenFrames) for (let t = e.MIN_RENDERINGGROUPS; t < e.MAX_RENDERINGGROUPS; t++) {
			let e = this._renderingGroups[t];
			e && e.prepare();
		}
	}
	resetSprites() {
		if (!this.maintainStateBetweenFrames) for (let t = e.MIN_RENDERINGGROUPS; t < e.MAX_RENDERINGGROUPS; t++) {
			let e = this._renderingGroups[t];
			e && e.prepareSprites();
		}
	}
	dispose() {
		this.freeRenderingGroups(), this._renderingGroups.length = 0, this._renderingGroupInfo = null;
	}
	freeRenderingGroups() {
		for (let t = e.MIN_RENDERINGGROUPS; t < e.MAX_RENDERINGGROUPS; t++) {
			let e = this._renderingGroups[t];
			e && e.dispose();
		}
	}
	_prepareRenderingGroup(e) {
		this._renderingGroups[e] === void 0 && (this._renderingGroups[e] = new Z(e, this._scene, this._customOpaqueSortCompareFn[e], this._customAlphaTestSortCompareFn[e], this._customTransparentSortCompareFn[e]), this._renderingGroups[e].disableDepthPrePass = this._disableDepthPrePass);
	}
	dispatchSprites(e) {
		this.maintainStateBetweenFrames && e._wasDispatched || (e._wasDispatched = !0, this.getRenderingGroup(e.renderingGroupId).dispatchSprites(e));
	}
	dispatchParticles(e) {
		this.maintainStateBetweenFrames && e._wasDispatched || (e._wasDispatched = !0, this.getRenderingGroup(e.renderingGroupId).dispatchParticles(e));
	}
	dispatch(e, t, n) {
		t === void 0 && (t = e.getMesh()), !(this.maintainStateBetweenFrames && e._wasDispatched) && (e._wasDispatched = !0, this.getRenderingGroup(t.renderingGroupId).dispatch(e, t, n));
	}
	setRenderingOrder(e, t = null, n = null, r = null) {
		if (this._customOpaqueSortCompareFn[e] = t, this._customAlphaTestSortCompareFn[e] = n, this._customTransparentSortCompareFn[e] = r, this._renderingGroups[e]) {
			let t = this._renderingGroups[e];
			t.opaqueSortCompareFn = this._customOpaqueSortCompareFn[e], t.alphaTestSortCompareFn = this._customAlphaTestSortCompareFn[e], t.transparentSortCompareFn = this._customTransparentSortCompareFn[e];
		}
	}
	setRenderingAutoClearDepthStencil(e, t, n = !0, r = !0) {
		this._autoClearDepthStencil[e] = {
			autoClear: t,
			depth: n,
			stencil: r
		};
	}
	getAutoClearDepthStencilSetup(e) {
		return this._autoClearDepthStencil[e];
	}
};
Q.MAX_RENDERINGGROUPS = 4, Q.MIN_RENDERINGGROUPS = 0, Q.AUTOCLEAR = !0;
//#endregion
//#region node_modules/@babylonjs/core/Lights/lightConstants.js
var $ = class {
	static CompareLightsPriority(e, t) {
		return e.shadowEnabled === t.shadowEnabled ? t.renderPriority - e.renderPriority : !!t.shadowEnabled - +!!e.shadowEnabled;
	}
};
$.FALLOFF_DEFAULT = 0, $.FALLOFF_PHYSICAL = 1, $.FALLOFF_GLTF = 2, $.FALLOFF_STANDARD = 3, $.LIGHTMAP_DEFAULT = 0, $.LIGHTMAP_SPECULAR = 1, $.LIGHTMAP_SHADOWSONLY = 2, $.INTENSITYMODE_AUTOMATIC = 0, $.INTENSITYMODE_LUMINOUSPOWER = 1, $.INTENSITYMODE_LUMINOUSINTENSITY = 2, $.INTENSITYMODE_ILLUMINANCE = 3, $.INTENSITYMODE_LUMINANCE = 4, $.LIGHTTYPEID_POINTLIGHT = 0, $.LIGHTTYPEID_DIRECTIONALLIGHT = 1, $.LIGHTTYPEID_SPOTLIGHT = 2, $.LIGHTTYPEID_HEMISPHERICLIGHT = 3, $.LIGHTTYPEID_RECT_AREALIGHT = 4, $.LIGHTTYPEID_CLUSTERED_CONTAINER = 5;
//#endregion
export { J as a, K as c, j as d, oe as f, X as i, F as l, Q as n, Y as o, T as p, ce as r, q as s, $ as t, A as u };

//# sourceMappingURL=lightConstants-t4r6lMWn.js.map