import { n as e } from "./engineStore-D0BoPdea.js";
import { m as t, o as n, p as r } from "./thinEngine.pure-VEB8Fxe7.js";
import { n as i } from "./effectRenderer.pure-otg4q1-d.js";
import { l as a } from "./math.color.pure-DY3Xz9Wt.js";
import { a as o, i as s } from "./halfFloat-D-N8ggSr.js";
import { n as c } from "./baseTexture.pure-trvdITlt.js";
import { _ as l, a as u, r as d, v as f } from "./decorators-Dol0xxIL.js";
//#region node_modules/@babylonjs/core/Misc/smartArray.js
var p = class e {
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
p._GlobalId = 0;
var m = class extends p {
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
}, h = (() => {
	var t;
	let r = [], o, m = [], h = [], g, _, v = [], y = [], b, x = [], S = [], C, w = [], T = [], E, D = [], O = [], k, A = [], j = [], M, N = [], P = [], F, I, L = [], R = [], z, B = [], V = [], H, U = [], W = [], G, K = [], q = [], J, Y = [], X = [], Z, Q = [], $ = [], te, ne = [], re = [];
	return t = class {
		static get ForceGLSL() {
			return i.ForceGLSL;
		}
		static set ForceGLSL(e) {
			i.ForceGLSL = e;
		}
		static RegisterShaderCodeProcessing(e, t) {
			i.RegisterShaderCodeProcessing(e, t);
		}
		get name() {
			return this._effectWrapper.name;
		}
		set name(e) {
			this._effectWrapper.name = e;
		}
		get alphaMode() {
			return this._effectWrapper.alphaMode;
		}
		set alphaMode(e) {
			this._effectWrapper.alphaMode = e;
		}
		get samples() {
			return this._samples;
		}
		set samples(e) {
			this._samples = Math.min(e, this._engine.getCaps().maxMSAASamples), this._textures.forEach((e) => {
				e.setSamples(this._samples);
			});
		}
		get shaderLanguage() {
			return this._shaderLanguage;
		}
		getEffectName() {
			return this._fragmentUrl;
		}
		set onActivate(e) {
			this._onActivateObserver && this.onActivateObservable.remove(this._onActivateObserver), e && (this._onActivateObserver = this.onActivateObservable.add(e));
		}
		set onSizeChanged(e) {
			this._onSizeChangedObserver && this.onSizeChangedObservable.remove(this._onSizeChangedObserver), this._onSizeChangedObserver = this.onSizeChangedObservable.add(e);
		}
		set onApply(e) {
			this._onApplyObserver && this.onApplyObservable.remove(this._onApplyObserver), this._onApplyObserver = this.onApplyObservable.add(e);
		}
		set onBeforeRender(e) {
			this._onBeforeRenderObserver && this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver), this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(e);
		}
		set onAfterRender(e) {
			this._onAfterRenderObserver && this.onAfterRenderObservable.remove(this._onAfterRenderObserver), this._onAfterRenderObserver = this.onAfterRenderObservable.add(e);
		}
		get inputTexture() {
			return this._textures.data[this._currentRenderTextureInd];
		}
		set inputTexture(e) {
			this._forcedOutputTexture = e;
		}
		restoreDefaultInputTexture() {
			this._forcedOutputTexture && (this._forcedOutputTexture = null, this.markTextureDirty());
		}
		getCamera() {
			return this._camera;
		}
		get texelSize() {
			return this._shareOutputWithPostProcess ? this._shareOutputWithPostProcess.texelSize : (this._forcedOutputTexture && this._texelSize.copyFromFloats(1 / this._forcedOutputTexture.width, 1 / this._forcedOutputTexture.height), this._texelSize);
		}
		constructor(n, o, s, c, l, u, d = 1, g, _, b = null, C = 0, E = "postprocess", k, M = !1, F = 5, I, z) {
			this._parentContainer = (f(this, r), null), this.uniqueId = f(this, m, void 0), this.width = (f(this, h), f(this, v, -1)), this.height = (f(this, y), f(this, x, -1)), this.nodeMaterialSource = (f(this, S), null), this._outputTexture = null, this.renderTargetSamplingMode = f(this, w, void 0), this.clearColor = (f(this, T), f(this, D, void 0)), this.autoClear = (f(this, O), f(this, A, !0)), this.forceAutoClearInAlphaMode = (f(this, j), f(this, N, !1)), this.alphaConstants = (f(this, P), f(this, L, void 0)), this.animations = (f(this, R), []), this.enablePixelPerfectMode = f(this, B, !1), this.forceFullscreenViewport = (f(this, V), f(this, U, !0)), this.inspectableCustomProperties = f(this, W), this.scaleMode = f(this, K, 1), this.alwaysForcePOT = (f(this, q), f(this, Y, !1)), this._samples = (f(this, X), f(this, Q, 1)), this.adaptScaleToCurrentViewport = (f(this, $), f(this, ne, !1)), this.doNotSerialize = (f(this, re), !1), this._webGPUReady = !1, this._reusable = !1, this._renderId = 0, this.externalTextureSamplerBinding = !1, this._textures = new p(2), this._textureCache = [], this._currentRenderTextureInd = 0, this._scaleRatio = new a(1, 1), this._texelSize = a.Zero(), this.onActivateObservable = new e(), this.onSizeChangedObservable = new e(), this.onApplyObservable = new e(), this.onBeforeRenderObservable = new e(), this.onAfterRenderObservable = new e(), this.onDisposeObservable = new e(), ee();
			let H = 1, G = null, J;
			if (s && !Array.isArray(s)) {
				let e = s;
				s = e.uniforms ?? null, c = e.samplers ?? null, H = e.size ?? 1, u = e.camera ?? null, d = e.samplingMode ?? 1, g = e.engine, _ = e.reusable, b = Array.isArray(e.defines) ? e.defines.join("\n") : e.defines ?? null, C = e.textureType ?? 0, E = e.vertexUrl ?? "postprocess", k = e.indexParameters, M = e.blockCompilation ?? !1, F = e.textureFormat ?? 5, I = e.shaderLanguage ?? 0, G = e.uniformBuffers ?? null, z = e.extraInitializations, J = e.effectWrapper;
			} else l && (H = typeof l == "number" ? l : {
				width: l.width,
				height: l.height
			});
			if (this._useExistingThinPostProcess = !!J, this._effectWrapper = J ?? new i({
				name: n,
				useShaderStore: !0,
				useAsPostProcess: !0,
				fragmentShader: o,
				engine: g || u?.getScene().getEngine(),
				uniforms: s,
				samplers: c,
				uniformBuffers: G,
				defines: b,
				vertexUrl: E,
				indexParameters: k,
				blockCompilation: !0,
				shaderLanguage: I,
				extraInitializations: void 0
			}), this.name = n, this.onEffectCreatedObservable = this._effectWrapper.onEffectCreatedObservable, u == null ? g && (this._engine = g, this._engine.postProcesses.push(this)) : (this._camera = u, this._scene = u.getScene(), u.attachPostProcess(this), this._engine = this._scene.getEngine(), this._scene.addPostProcess(this), this.uniqueId = this._scene.getUniqueId()), this._options = H, this.renderTargetSamplingMode = d || 1, this._reusable = _ || !1, this._textureType = C, this._textureFormat = F, this._shaderLanguage = I || 0, this._samplers = c || [], this._samplers.indexOf("textureSampler") === -1 && this._samplers.push("textureSampler"), this._fragmentUrl = o, this._vertexUrl = E, this._parameters = s || [], this._parameters.indexOf("scale") === -1 && this._parameters.push("scale"), this._uniformBuffers = G || [], this._indexParameters = k, !this._useExistingThinPostProcess) {
				this._webGPUReady = this._shaderLanguage === 1;
				let e = [];
				this._gatherImports(this._engine.isWebGPU && !t.ForceGLSL, e), this._effectWrapper._webGPUReady = this._webGPUReady, this._effectWrapper._postConstructor(M, b, z, e);
			}
		}
		_gatherImports(e = !1, t) {
			e && this._webGPUReady ? t.push(Promise.all([import("./postprocess.vertex-DpZYH6av.js")])) : t.push(Promise.all([import("./postprocess.vertex-7rFBNJhZ.js")]));
		}
		getClassName() {
			return "PostProcess";
		}
		getEngine() {
			return this._engine;
		}
		getEffect() {
			return this._effectWrapper.drawWrapper.effect;
		}
		shareOutputWith(e) {
			return this._disposeTextures(), this._shareOutputWithPostProcess = e, this;
		}
		useOwnOutput() {
			this._textures.length == 0 && (this._textures = new p(2)), this._shareOutputWithPostProcess = null;
		}
		updateEffect(e = null, t = null, n = null, r, i, a, o, s) {
			this._effectWrapper.updateEffect(e, t, n, r, i, a, o, s), this._postProcessDefines = Array.isArray(this._effectWrapper.options.defines) ? this._effectWrapper.options.defines.join("\n") : this._effectWrapper.options.defines;
		}
		isReusable() {
			return this._reusable;
		}
		markTextureDirty() {
			this.width = -1;
		}
		_createRenderTargetTexture(e, t, n = 0) {
			for (let r = 0; r < this._textureCache.length; r++) if (this._textureCache[r].texture.width === e.width && this._textureCache[r].texture.height === e.height && this._textureCache[r].postProcessChannel === n && this._textureCache[r].texture._generateDepthBuffer === t.generateDepthBuffer && this._textureCache[r].texture.samples === t.samples) return this._textureCache[r].texture;
			let r = this._engine.createRenderTargetTexture(e, t);
			return this._textureCache.push({
				texture: r,
				postProcessChannel: n,
				lastUsedRenderId: -1
			}), r;
		}
		_flushTextureCache() {
			let e = this._renderId;
			for (let t = this._textureCache.length - 1; t >= 0; t--) if (e - this._textureCache[t].lastUsedRenderId > 100) {
				let e = !1;
				for (let n = 0; n < this._textures.length; n++) if (this._textures.data[n] === this._textureCache[t].texture) {
					e = !0;
					break;
				}
				e || (this._textureCache[t].texture.dispose(), this._textureCache.splice(t, 1));
			}
		}
		resize(e, t, n = null, r = !1, i = !1) {
			this._textures.length > 0 && this._textures.reset(), this.width = e, this.height = t;
			let a = null;
			if (n) {
				for (let e = 0; e < n._postProcesses.length; e++) if (n._postProcesses[e] !== null) {
					a = n._postProcesses[e];
					break;
				}
			}
			let o = {
				width: this.width,
				height: this.height
			}, s = {
				generateMipMaps: r,
				generateDepthBuffer: i || a === this,
				generateStencilBuffer: (i || a === this) && this._engine.isStencilEnable,
				samplingMode: this.renderTargetSamplingMode,
				type: this._textureType,
				format: this._textureFormat,
				samples: this._samples,
				label: "PostProcessRTT-" + this.name
			};
			this._textures.push(this._createRenderTargetTexture(o, s, 0)), this._reusable && this._textures.push(this._createRenderTargetTexture(o, s, 1)), this._texelSize.copyFromFloats(1 / this.width, 1 / this.height), this.onSizeChangedObservable.notifyObservers(this);
		}
		_getTarget() {
			let e;
			if (this._shareOutputWithPostProcess) e = this._shareOutputWithPostProcess.inputTexture;
			else if (this._forcedOutputTexture) e = this._forcedOutputTexture, this.width = this._forcedOutputTexture.width, this.height = this._forcedOutputTexture.height;
			else {
				e = this.inputTexture;
				let t;
				for (let n = 0; n < this._textureCache.length; n++) if (this._textureCache[n].texture === e) {
					t = this._textureCache[n];
					break;
				}
				t && (t.lastUsedRenderId = this._renderId);
			}
			return e;
		}
		activate(e, t = null, r) {
			let i = e === null || e.cameraRigMode !== void 0 ? e || this._camera : null, a = i?.getScene() ?? e, o = a.getEngine(), s = o.getCaps().maxTextureSize, c = (t ? t.width : this._engine.getRenderWidth(!0)) * this._options | 0, l = (t ? t.height : this._engine.getRenderHeight(!0)) * this._options | 0, u = this._options.width || c, d = this._options.height || l, f = this.renderTargetSamplingMode !== 7 && this.renderTargetSamplingMode !== 1 && this.renderTargetSamplingMode !== 2, p = null;
			if (!this._shareOutputWithPostProcess && !this._forcedOutputTexture) {
				if (this.adaptScaleToCurrentViewport) {
					let e = o.currentViewport;
					e && (u *= e.width, d *= e.height);
				}
				(f || this.alwaysForcePOT) && (this._options.width || (u = o.needPOTTextures ? n(u, s, this.scaleMode) : u), this._options.height || (d = o.needPOTTextures ? n(d, s, this.scaleMode) : d)), (this.width !== u || this.height !== d || !(p = this._getTarget())) && this.resize(u, d, i, f, r), this._textures.forEach((e) => {
					e.samples !== this.samples && this._engine.updateRenderTargetTextureSampleCount(e, this.samples);
				}), this._flushTextureCache(), this._renderId++;
			}
			return p ||= this._getTarget(), this.enablePixelPerfectMode ? (this._scaleRatio.copyFromFloats(c / u, l / d), this._engine.bindFramebuffer(p, 0, c, l, this.forceFullscreenViewport)) : (this._scaleRatio.copyFromFloats(1, 1), this._engine.bindFramebuffer(p, 0, void 0, void 0, this.forceFullscreenViewport)), this._engine._debugInsertMarker?.(`post process ${this.name} input`), this.onActivateObservable.notifyObservers(i), this.autoClear && (this.alphaMode === 0 || this.forceAutoClearInAlphaMode) && this._engine.clear(this.clearColor ? this.clearColor : a.clearColor, a._allowPostProcessClearColor, !0, !0), this._reusable && (this._currentRenderTextureInd = (this._currentRenderTextureInd + 1) % 2), p;
		}
		get isSupported() {
			return this._effectWrapper.drawWrapper.effect.isSupported;
		}
		get aspectRatio() {
			return this._shareOutputWithPostProcess ? this._shareOutputWithPostProcess.aspectRatio : this._forcedOutputTexture ? this._forcedOutputTexture.width / this._forcedOutputTexture.height : this.width / this.height;
		}
		isReady() {
			return this._effectWrapper.isReady();
		}
		apply() {
			if (!this._effectWrapper.isReady()) return null;
			this._engine.enableEffect(this._effectWrapper.drawWrapper), this._engine.setState(!1), this._engine.setDepthBuffer(!1), this._engine.setDepthWrite(!1), this.alphaConstants && this.getEngine().setAlphaConstants(this.alphaConstants.r, this.alphaConstants.g, this.alphaConstants.b, this.alphaConstants.a), this._engine.setAlphaMode(this.alphaMode);
			let e;
			return e = this._shareOutputWithPostProcess ? this._shareOutputWithPostProcess.inputTexture : this._forcedOutputTexture ? this._forcedOutputTexture : this.inputTexture, this.externalTextureSamplerBinding || this._effectWrapper.drawWrapper.effect._bindTexture("textureSampler", e?.texture), this._effectWrapper.drawWrapper.effect.setVector2("scale", this._scaleRatio), this.onApplyObservable.notifyObservers(this._effectWrapper.drawWrapper.effect), this._effectWrapper.bind(!0), this._effectWrapper.drawWrapper.effect;
		}
		_disposeTextures() {
			if (this._shareOutputWithPostProcess || this._forcedOutputTexture) {
				this._disposeTextureCache();
				return;
			}
			this._disposeTextureCache(), this._textures.dispose();
		}
		_disposeTextureCache() {
			for (let e = this._textureCache.length - 1; e >= 0; e--) this._textureCache[e].texture.dispose();
			this._textureCache.length = 0;
		}
		setPrePassRenderer(e) {
			return this._prePassEffectConfiguration ? (this._prePassEffectConfiguration = e.addEffectConfiguration(this._prePassEffectConfiguration), this._prePassEffectConfiguration.enabled = !0, !0) : !1;
		}
		dispose(e) {
			e ||= this._camera, this._useExistingThinPostProcess || this._effectWrapper.dispose(), this._disposeTextures(), this._scene && this._scene.removePostProcess(this);
			let t;
			if (this._parentContainer &&= (t = this._parentContainer.postProcesses.indexOf(this), t > -1 && this._parentContainer.postProcesses.splice(t, 1), null), t = this._engine.postProcesses.indexOf(this), t !== -1 && this._engine.postProcesses.splice(t, 1), this.onDisposeObservable.notifyObservers(), e) {
				if (e.detachPostProcess(this), t = e._postProcesses.indexOf(this), t === 0 && e._postProcesses.length > 0) {
					let e = this._camera._getFirstPostProcess();
					e && e.markTextureDirty();
				}
				this.onActivateObservable.clear(), this.onAfterRenderObservable.clear(), this.onApplyObservable.clear(), this.onBeforeRenderObservable.clear(), this.onSizeChangedObservable.clear(), this.onEffectCreatedObservable.clear();
			}
		}
		serialize() {
			let e = c.Serialize(this), t = this.getCamera() || this._scene && this._scene.activeCamera;
			return e.customType = "BABYLON." + this.getClassName(), e.cameraId = t ? t.id : null, e.reusable = this._reusable, e.textureType = this._textureType, e.fragmentUrl = this._fragmentUrl, e.parameters = this._parameters, e.samplers = this._samplers, e.uniformBuffers = this._uniformBuffers, e.options = this._options, e.defines = this._postProcessDefines, e.textureFormat = this._textureFormat, e.vertexUrl = this._vertexUrl, e.indexParameters = this._indexParameters, e;
		}
		clone() {
			let e = this.serialize();
			e._engine = this._engine, e.cameraId = null;
			let n = t.Parse(e, this._scene, "");
			return n ? (n.onActivateObservable = this.onActivateObservable.clone(), n.onSizeChangedObservable = this.onSizeChangedObservable.clone(), n.onApplyObservable = this.onApplyObservable.clone(), n.onBeforeRenderObservable = this.onBeforeRenderObservable.clone(), n.onAfterRenderObservable = this.onAfterRenderObservable.clone(), n._prePassEffectConfiguration = this._prePassEffectConfiguration, n) : null;
		}
		static Parse(e, t, n) {
			let r = s(e.customType);
			if (!r || !r._Parse) return null;
			let i = t ? t.getCameraById(e.cameraId) : null;
			return r._Parse(e, i, t, n);
		}
		static _Parse(e, n, r, i) {
			return c.Parse(() => new t(e.name, e.fragmentUrl, e.parameters, e.samplers, e.options, n, e.renderTargetSamplingMode, e._engine, e.reusable, e.defines, e.textureType, e.vertexUrl, e.indexParameters, !1, e.textureFormat), e, r, i);
		}
	}, (() => {
		let e = typeof Symbol == "function" && Symbol.metadata ? Object.create(null) : void 0;
		o = [d()], g = [d()], _ = [d()], b = [d()], C = [d()], E = [u()], k = [d()], M = [d()], F = [d()], I = [d()], z = [d()], H = [d()], G = [d()], J = [d()], Z = [d("samples")], te = [d()], l(t, null, g, {
			kind: "getter",
			name: "name",
			static: !1,
			private: !1,
			access: {
				has: (e) => "name" in e,
				get: (e) => e.name
			},
			metadata: e
		}, null, r), l(t, null, F, {
			kind: "getter",
			name: "alphaMode",
			static: !1,
			private: !1,
			access: {
				has: (e) => "alphaMode" in e,
				get: (e) => e.alphaMode
			},
			metadata: e
		}, null, r), l(null, null, o, {
			kind: "field",
			name: "uniqueId",
			static: !1,
			private: !1,
			access: {
				has: (e) => "uniqueId" in e,
				get: (e) => e.uniqueId,
				set: (e, t) => {
					e.uniqueId = t;
				}
			},
			metadata: e
		}, m, h), l(null, null, _, {
			kind: "field",
			name: "width",
			static: !1,
			private: !1,
			access: {
				has: (e) => "width" in e,
				get: (e) => e.width,
				set: (e, t) => {
					e.width = t;
				}
			},
			metadata: e
		}, v, y), l(null, null, b, {
			kind: "field",
			name: "height",
			static: !1,
			private: !1,
			access: {
				has: (e) => "height" in e,
				get: (e) => e.height,
				set: (e, t) => {
					e.height = t;
				}
			},
			metadata: e
		}, x, S), l(null, null, C, {
			kind: "field",
			name: "renderTargetSamplingMode",
			static: !1,
			private: !1,
			access: {
				has: (e) => "renderTargetSamplingMode" in e,
				get: (e) => e.renderTargetSamplingMode,
				set: (e, t) => {
					e.renderTargetSamplingMode = t;
				}
			},
			metadata: e
		}, w, T), l(null, null, E, {
			kind: "field",
			name: "clearColor",
			static: !1,
			private: !1,
			access: {
				has: (e) => "clearColor" in e,
				get: (e) => e.clearColor,
				set: (e, t) => {
					e.clearColor = t;
				}
			},
			metadata: e
		}, D, O), l(null, null, k, {
			kind: "field",
			name: "autoClear",
			static: !1,
			private: !1,
			access: {
				has: (e) => "autoClear" in e,
				get: (e) => e.autoClear,
				set: (e, t) => {
					e.autoClear = t;
				}
			},
			metadata: e
		}, A, j), l(null, null, M, {
			kind: "field",
			name: "forceAutoClearInAlphaMode",
			static: !1,
			private: !1,
			access: {
				has: (e) => "forceAutoClearInAlphaMode" in e,
				get: (e) => e.forceAutoClearInAlphaMode,
				set: (e, t) => {
					e.forceAutoClearInAlphaMode = t;
				}
			},
			metadata: e
		}, N, P), l(null, null, I, {
			kind: "field",
			name: "alphaConstants",
			static: !1,
			private: !1,
			access: {
				has: (e) => "alphaConstants" in e,
				get: (e) => e.alphaConstants,
				set: (e, t) => {
					e.alphaConstants = t;
				}
			},
			metadata: e
		}, L, R), l(null, null, z, {
			kind: "field",
			name: "enablePixelPerfectMode",
			static: !1,
			private: !1,
			access: {
				has: (e) => "enablePixelPerfectMode" in e,
				get: (e) => e.enablePixelPerfectMode,
				set: (e, t) => {
					e.enablePixelPerfectMode = t;
				}
			},
			metadata: e
		}, B, V), l(null, null, H, {
			kind: "field",
			name: "forceFullscreenViewport",
			static: !1,
			private: !1,
			access: {
				has: (e) => "forceFullscreenViewport" in e,
				get: (e) => e.forceFullscreenViewport,
				set: (e, t) => {
					e.forceFullscreenViewport = t;
				}
			},
			metadata: e
		}, U, W), l(null, null, G, {
			kind: "field",
			name: "scaleMode",
			static: !1,
			private: !1,
			access: {
				has: (e) => "scaleMode" in e,
				get: (e) => e.scaleMode,
				set: (e, t) => {
					e.scaleMode = t;
				}
			},
			metadata: e
		}, K, q), l(null, null, J, {
			kind: "field",
			name: "alwaysForcePOT",
			static: !1,
			private: !1,
			access: {
				has: (e) => "alwaysForcePOT" in e,
				get: (e) => e.alwaysForcePOT,
				set: (e, t) => {
					e.alwaysForcePOT = t;
				}
			},
			metadata: e
		}, Y, X), l(null, null, Z, {
			kind: "field",
			name: "_samples",
			static: !1,
			private: !1,
			access: {
				has: (e) => "_samples" in e,
				get: (e) => e._samples,
				set: (e, t) => {
					e._samples = t;
				}
			},
			metadata: e
		}, Q, $), l(null, null, te, {
			kind: "field",
			name: "adaptScaleToCurrentViewport",
			static: !1,
			private: !1,
			access: {
				has: (e) => "adaptScaleToCurrentViewport" in e,
				get: (e) => e.adaptScaleToCurrentViewport,
				set: (e, t) => {
					e.adaptScaleToCurrentViewport = t;
				}
			},
			metadata: e
		}, ne, re), e && Object.defineProperty(t, Symbol.metadata, {
			enumerable: !0,
			configurable: !0,
			writable: !0,
			value: e
		});
	})(), t;
})(), g = !1;
function ee() {
	g || (g = !0, r.prototype.setTextureFromPostProcess = function(e, t, n) {
		let r = null;
		t && (t._forcedOutputTexture ? r = t._forcedOutputTexture : t._textures.data[t._currentRenderTextureInd] && (r = t._textures.data[t._currentRenderTextureInd])), this._bindTexture(e, r?.texture ?? null, n);
	}, r.prototype.setTextureFromPostProcessOutput = function(e, t, n) {
		this._bindTexture(e, t?._outputTexture?.texture ?? null, n);
	}, t.prototype.setTextureFromPostProcess = function(e, t) {
		this._engine.setTextureFromPostProcess(this._samplers[e], t, e);
	}, t.prototype.setTextureFromPostProcessOutput = function(e, t) {
		this._engine.setTextureFromPostProcessOutput(this._samplers[e], t, e);
	}, o("BABYLON.PostProcess", h));
}
//#endregion
export { p as n, m as r, h as t };

//# sourceMappingURL=postProcess.pure-CrXYWp4P.js.map