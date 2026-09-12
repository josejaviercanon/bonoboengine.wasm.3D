import { n as e } from "./engineStore-D0BoPdea.js";
import { t } from "./logger-DQIzSR_y.js";
import { n } from "./precisionDate-BBQlwGEL.js";
import { d as r, m as i, t as a } from "./thinEngine.pure-VEB8Fxe7.js";
import { d as o, m as s, p as c } from "./tools.pure-C-hH3Ika.js";
//#region node_modules/@babylonjs/core/Engines/Extensions/engine.dynamicBuffer.pure.js
var l = !1;
function u() {
	l || (l = !0, a.prototype.updateDynamicIndexBuffer = function(e, t, n = 0) {
		this._currentBoundBuffer[this._gl.ELEMENT_ARRAY_BUFFER] = null, this.bindIndexBuffer(e);
		let r;
		r = e.is32Bits ? t instanceof Uint32Array ? t : new Uint32Array(t) : t instanceof Uint16Array ? t : new Uint16Array(t), this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, r, this._gl.DYNAMIC_DRAW), this._resetIndexBufferBinding();
	}, a.prototype.updateDynamicVertexBuffer = function(e, t, n, r) {
		this.bindArrayBuffer(e), n === void 0 && (n = 0);
		let i = t.byteLength || t.length;
		r === void 0 || r >= i && n === 0 ? t instanceof Array ? this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, new Float32Array(t)) : this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, t) : t instanceof Array ? this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, new Float32Array(t).subarray(0, r / 4)) : (t = ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, r) : new Uint8Array(t, 0, r), this._gl.bufferSubData(this._gl.ARRAY_BUFFER, n, t)), this._resetVertexBufferBinding();
	});
}
//#endregion
//#region node_modules/@babylonjs/core/Maths/math.viewport.js
var d = class e {
	constructor(e, t, n, r) {
		this.x = e, this.y = t, this.width = n, this.height = r;
	}
	toGlobal(t, n) {
		return new e(this.x * t, this.y * n, this.width * t, this.height * n);
	}
	toGlobalToRef(e, t, n) {
		return n.x = this.x * e, n.y = this.y * t, n.width = this.width * e, n.height = this.height * t, this;
	}
	clone() {
		return new e(this.x, this.y, this.width, this.height);
	}
}, f = class {
	get isDisposed() {
		return this._isDisposed;
	}
	constructor(e, t, n, i = 0, a = !1, o = !1, s = !1, c, l) {
		this._isAlreadyOwned = !1, this._isDisposed = !1, u(), this._engine = e && e.getScene ? e.getScene().getEngine() : e, this._updatable = n, this._instanced = o, this._divisor = c || 1, this._label = l, t instanceof r ? (this._data = null, this._buffer = t) : (this._data = t, this._buffer = null), this.byteStride = s ? i : i * Float32Array.BYTES_PER_ELEMENT, a || this.create();
	}
	createVertexBuffer(e, t, n, r, i, a = !1, o) {
		let s = a ? t : t * Float32Array.BYTES_PER_ELEMENT, c = r ? a ? r : r * Float32Array.BYTES_PER_ELEMENT : this.byteStride;
		return new p(this._engine, this, e, this._updatable, !0, c, i === void 0 ? this._instanced : i, s, n, void 0, void 0, !0, this._divisor || o);
	}
	isUpdatable() {
		return this._updatable;
	}
	getData() {
		return this._data;
	}
	getBuffer() {
		return this._buffer;
	}
	getStrideSize() {
		return this.byteStride / Float32Array.BYTES_PER_ELEMENT;
	}
	create(e = null) {
		!e && this._buffer || (e ||= this._data, e && (this._buffer ? this._updatable && (this._engine.updateDynamicVertexBuffer(this._buffer, e), this._data = e) : this._updatable ? (this._buffer = this._engine.createDynamicVertexBuffer(e, this._label), this._data = e) : this._buffer = this._engine.createVertexBuffer(e, void 0, this._label)));
	}
	_rebuild() {
		if (this._data) this._buffer = null, this.create(this._data);
		else {
			if (!this._buffer) return;
			if (this._buffer.capacity > 0) {
				this._buffer = this._updatable ? this._engine.createDynamicVertexBuffer(this._buffer.capacity, this._label) : this._engine.createVertexBuffer(this._buffer.capacity, void 0, this._label);
				return;
			}
			t.Warn(`Missing data for buffer "${this._label}" ${this._buffer ? "(uniqueId: " + this._buffer.uniqueId + ")" : ""}. Buffer reconstruction failed.`), this._buffer = null;
		}
	}
	update(e) {
		this.create(e);
	}
	updateDirectly(e, t, n, r = !1) {
		this._buffer && this._updatable && (this._engine.updateDynamicVertexBuffer(this._buffer, e, r ? t : t * Float32Array.BYTES_PER_ELEMENT, n ? n * this.byteStride : void 0), this._data = t === 0 && n === void 0 ? e : null);
	}
	_increaseReferences() {
		if (this._buffer) {
			if (!this._isAlreadyOwned) {
				this._isAlreadyOwned = !0;
				return;
			}
			this._buffer.references++;
		}
	}
	dispose() {
		this._buffer && this._engine._releaseBuffer(this._buffer) && (this._isDisposed = !0, this._data = null, this._buffer = null);
	}
}, p = class e {
	get isDisposed() {
		return this._isDisposed;
	}
	get instanceDivisor() {
		return this._instanceDivisor;
	}
	set instanceDivisor(e) {
		let t = e != 0;
		this._instanceDivisor = e, t !== this._instanced && (this._instanced = t, this._computeHashCode());
	}
	get _maxVerticesCount() {
		let e = this.getData();
		return e ? Array.isArray(e) ? e.length / (this.byteStride / 4) - this.byteOffset / 4 : (e.byteLength - this.byteOffset) / this.byteStride : 0;
	}
	constructor(t, n, r, i, a, o, c, l, u, d, p = !1, g = !1, _ = 1, v = !1) {
		this._isDisposed = !1;
		let y;
		if (this.engine = t, typeof i == "object" && i ? (y = i.updatable ?? !1, a = i.postponeInternalCreation, o = i.stride, c = i.instanced, l = i.offset, u = i.size, d = i.type, p = i.normalized ?? !1, g = i.useBytes ?? !1, _ = i.divisor ?? 1, v = i.takeBufferOwnership ?? !1, this._label = i.label) : y = !!i, n instanceof f ? (this._buffer = n, this._ownsBuffer = v) : (this._buffer = new f(t, n, y, o, a, c, g, _, this._label), this._ownsBuffer = !0), this.uniqueId = e._Counter++, this._kind = r, d === void 0) {
			let t = this.getData();
			this.type = t ? h(t) : e.FLOAT;
		} else this.type = d;
		let b = s(this.type);
		g ? (this._size = u || (o ? o / b : m(r)), this.byteStride = o || this._buffer.byteStride || this._size * b, this.byteOffset = l || 0) : (this._size = u || o || m(r), this.byteStride = o ? o * b : this._buffer.byteStride || this._size * b, this.byteOffset = (l || 0) * b), this.normalized = p, this._instanced = c !== void 0 && c, this._instanceDivisor = c ? _ : 0, this._alignBuffer(), this._computeHashCode();
	}
	static _GetTypeHashIndex(t) {
		switch (t) {
			case e.BYTE: return 0;
			case e.UNSIGNED_BYTE: return 1;
			case e.SHORT: return 2;
			case e.UNSIGNED_SHORT: return 3;
			case e.INT: return 4;
			case e.UNSIGNED_INT: return 5;
			case e.FLOAT: return 6;
			case e.HALF_FLOAT: return 7;
			default: throw Error(`Invalid vertex buffer type '${t}'`);
		}
	}
	_computeHashCode() {
		this.hashCode = (e._GetTypeHashIndex(this.type) << 0) + (!!this.normalized << 3) + (this._size - 1 << 4) + (!!this._instanced << 6) + (this.byteStride << 12);
	}
	_rebuild() {
		this._buffer?._rebuild();
	}
	getKind() {
		return this._kind;
	}
	isUpdatable() {
		return this._buffer.isUpdatable();
	}
	getData() {
		return this._buffer.getData();
	}
	getFloatData(e, t) {
		let n = this.getData();
		return n ? c(n, this._size, this.type, this.byteOffset, this.byteStride, this.normalized, e, t) : null;
	}
	getBuffer() {
		return this._buffer.getBuffer();
	}
	getWrapperBuffer() {
		return this._buffer;
	}
	getStrideSize() {
		return this.byteStride / s(this.type);
	}
	getOffset() {
		return this.byteOffset / s(this.type);
	}
	getSize(e = !1) {
		return e ? this._size * s(this.type) : this._size;
	}
	getIsInstanced() {
		return this._instanced;
	}
	getInstanceDivisor() {
		return this._instanceDivisor;
	}
	create(e) {
		this._buffer.create(e), this._alignBuffer();
	}
	update(e) {
		this._buffer.update(e), this._alignBuffer();
	}
	updateDirectly(e, t, n = !1) {
		this._buffer.updateDirectly(e, t, void 0, n), this._alignBuffer();
	}
	dispose() {
		this._ownsBuffer && this._buffer.dispose(), this._isDisposed = !0;
	}
	forEach(e, t) {
		o(this._buffer.getData(), this.byteOffset, this.byteStride, this._size, this.type, e, this.normalized, (e, n) => {
			for (let r = 0; r < this._size; r++) t(e[r], n + r);
		});
	}
	_alignBuffer() {}
};
p._Counter = 0, p.BYTE = 5120, p.UNSIGNED_BYTE = 5121, p.SHORT = 5122, p.UNSIGNED_SHORT = 5123, p.INT = 5124, p.UNSIGNED_INT = 5125, p.FLOAT = 5126, p.HALF_FLOAT = 5131, p.PositionKind = "position", p.NormalKind = "normal", p.TangentKind = "tangent", p.UVKind = "uv", p.UV2Kind = "uv2", p.UV3Kind = "uv3", p.UV4Kind = "uv4", p.UV5Kind = "uv5", p.UV6Kind = "uv6", p.ColorKind = "color", p.ColorInstanceKind = "instanceColor", p.MatricesIndicesKind = "matricesIndices", p.MatricesWeightsKind = "matricesWeights", p.MatricesIndicesExtraKind = "matricesIndicesExtra", p.MatricesWeightsExtraKind = "matricesWeightsExtra";
function m(e) {
	switch (e) {
		case p.UVKind:
		case p.UV2Kind:
		case p.UV3Kind:
		case p.UV4Kind:
		case p.UV5Kind:
		case p.UV6Kind: return 2;
		case p.NormalKind:
		case p.PositionKind: return 3;
		case p.ColorKind:
		case p.ColorInstanceKind:
		case p.MatricesIndicesKind:
		case p.MatricesIndicesExtraKind:
		case p.MatricesWeightsKind:
		case p.MatricesWeightsExtraKind:
		case p.TangentKind: return 4;
		default: throw Error("Invalid kind '" + e + "'");
	}
}
function h(e) {
	return e instanceof Int8Array ? p.BYTE : e instanceof Uint8Array ? p.UNSIGNED_BYTE : e instanceof Int16Array ? p.SHORT : e instanceof Uint16Array ? p.UNSIGNED_SHORT : e instanceof Int32Array ? p.INT : e instanceof Uint32Array ? p.UNSIGNED_INT : p.FLOAT;
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/drawWrapper.js
var g = class {
	static GetEffect(e) {
		return e.getPipelineContext === void 0 ? e.effect : e;
	}
	constructor(e, t = !0) {
		this._wasPreviouslyReady = !1, this._forceRebindOnNextCall = !0, this._wasPreviouslyUsingInstances = null, this.effect = null, this.defines = null, this.drawContext = e.createDrawContext(), t && (this.materialContext = e.createMaterialContext());
	}
	setEffect(e, t, n = !0) {
		this.effect = e, t !== void 0 && (this.defines = t), n && this.drawContext?.reset();
	}
	dispose(e = !1) {
		if (this.effect) {
			let t = this.effect;
			e ? t.dispose() : n.SetImmediate(() => {
				t.getEngine().onEndFrameObservable.addOnce(() => {
					t.dispose();
				});
			}), this.effect = null;
		}
		this.drawContext?.dispose();
	}
}, _ = {
	positions: [
		1,
		1,
		-1,
		1,
		-1,
		-1,
		1,
		-1
	],
	indices: [
		0,
		1,
		2,
		0,
		2,
		3
	]
}, v = class {
	constructor(e, t = _) {
		this._fullscreenViewport = new d(0, 0, 1, 1);
		let n = t.positions ?? _.positions, r = t.indices ?? _.indices;
		this.engine = e, this._vertexBuffers = { [p.PositionKind]: new p(e, n, p.PositionKind, !1, !1, 2) }, this._indexBuffer = e.createIndexBuffer(r), this._indexBufferLength = r.length, this._onContextRestoredObserver = e.onContextRestoredObservable.add(() => {
			this._indexBuffer = e.createIndexBuffer(r);
			for (let e in this._vertexBuffers) this._vertexBuffers[e]._rebuild();
		});
	}
	setViewport(e = this._fullscreenViewport) {
		this.engine.setViewport(e);
	}
	bindBuffers(e) {
		this.engine.bindBuffers(this._vertexBuffers, this._indexBuffer, e);
	}
	applyEffectWrapper(e, t = !1, n = !1) {
		this.engine.setState(!0), this.engine.depthCullingState.depthTest = t, this.engine.stencilState.stencilTest = n, this.engine.enableEffect(e.drawWrapper), this.bindBuffers(e.effect), e.onApplyObservable.notifyObservers({});
	}
	saveStates() {
		this._savedStateDepthTest = this.engine.depthCullingState.depthTest, this._savedStateStencilTest = this.engine.stencilState.stencilTest;
	}
	restoreStates() {
		this.engine.depthCullingState.depthTest = this._savedStateDepthTest, this.engine.stencilState.stencilTest = this._savedStateStencilTest;
	}
	draw() {
		this.engine.drawElementsType(0, 0, this._indexBufferLength);
	}
	_isRenderTargetTexture(e) {
		return e.renderTarget !== void 0;
	}
	render(e, t = null) {
		if (!e.effect.isReady()) return;
		this.saveStates(), this.setViewport();
		let n = t === null ? null : this._isRenderTargetTexture(t) ? t.renderTarget : t;
		n && this.engine.bindFramebuffer(n), this.applyEffectWrapper(e), this.draw(), n && this.engine.unBindFramebuffer(n), this.restoreStates();
	}
	dispose() {
		let e = this._vertexBuffers[p.PositionKind];
		e && (e.dispose(), delete this._vertexBuffers[p.PositionKind]), this._indexBuffer && this.engine._releaseBuffer(this._indexBuffer), this._onContextRestoredObserver &&= (this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver), null);
	}
}, y = class t {
	static RegisterShaderCodeProcessing(e, n) {
		if (!n) {
			delete t._CustomShaderCodeProcessing[e ?? ""];
			return;
		}
		t._CustomShaderCodeProcessing[e ?? ""] = n;
	}
	static _GetShaderCodeProcessing(e) {
		return t._CustomShaderCodeProcessing[e] ?? t._CustomShaderCodeProcessing[""];
	}
	get name() {
		return this.options.name;
	}
	set name(e) {
		this.options.name = e;
	}
	isReady() {
		return this._drawWrapper.effect?.isReady() ?? !1;
	}
	get drawWrapper() {
		return this._drawWrapper;
	}
	get effect() {
		return this._drawWrapper.effect;
	}
	set effect(e) {
		this._drawWrapper.effect = e;
	}
	constructor(t) {
		this.alphaMode = 0, this.onEffectCreatedObservable = new e(void 0, !0), this.onApplyObservable = new e(), this._shadersLoaded = !1, this._webGPUReady = !1, this._importPromises = [], this.options = {
			...t,
			name: t.name || "effectWrapper",
			engine: t.engine,
			uniforms: t.uniforms || t.uniformNames || [],
			uniformNames: void 0,
			samplers: t.samplers || t.samplerNames || [],
			samplerNames: void 0,
			attributeNames: t.attributeNames || ["position"],
			uniformBuffers: t.uniformBuffers || [],
			defines: t.defines || "",
			useShaderStore: t.useShaderStore || !1,
			vertexUrl: t.vertexUrl || t.vertexShader || "postprocess",
			vertexShader: void 0,
			fragmentShader: t.fragmentShader || "pass",
			indexParameters: t.indexParameters,
			blockCompilation: t.blockCompilation || !1,
			shaderLanguage: t.shaderLanguage || 0,
			onCompiled: t.onCompiled || void 0,
			extraInitializations: t.extraInitializations || void 0,
			extraInitializationsAsync: t.extraInitializationsAsync || void 0,
			useAsPostProcess: t.useAsPostProcess ?? !1,
			allowEmptySourceTexture: t.allowEmptySourceTexture ?? !1
		}, this.options.uniformNames = this.options.uniforms, this.options.samplerNames = this.options.samplers, this.options.vertexShader = this.options.vertexUrl, this.options.useAsPostProcess && (!this.options.allowEmptySourceTexture && this.options.samplers.indexOf("textureSampler") === -1 && this.options.samplers.push("textureSampler"), this.options.uniforms.indexOf("scale") === -1 && this.options.uniforms.push("scale")), t.vertexUrl || t.vertexShader ? this._shaderPath = { vertexSource: this.options.vertexShader } : (this.options.useAsPostProcess || (this.options.uniforms.push("scale"), this.onApplyObservable.add(() => {
			this.effect.setFloat2("scale", 1, 1);
		})), this._shaderPath = { vertex: this.options.vertexShader }), this._shaderPath.fragmentSource = this.options.fragmentShader, this._shaderPath.spectorName = this.options.name, this.options.useShaderStore && (this._shaderPath.fragment = this._shaderPath.fragmentSource, this._shaderPath.vertex || (this._shaderPath.vertex = this._shaderPath.vertexSource), delete this._shaderPath.fragmentSource, delete this._shaderPath.vertexSource), this.onApplyObservable.add(() => {
			this.bind();
		}), this.options.useShaderStore || (this._onContextRestoredObserver = this.options.engine.onContextRestoredObservable.add(() => {
			this.effect._pipelineContext = null, this.effect._prepareEffect();
		})), this._drawWrapper = new g(this.options.engine), this._webGPUReady = this.options.shaderLanguage === 1;
		let n = Array.isArray(this.options.defines) ? this.options.defines.join("\n") : this.options.defines;
		this._postConstructor(this.options.blockCompilation, n, this.options.extraInitializations);
	}
	_gatherImports(e = !1, t) {}
	_postConstructor(e, n = null, r, i) {
		this._importPromises.length = 0, i && this._importPromises.push(...i);
		let a = this.options.engine.isWebGPU && !t.ForceGLSL;
		this._gatherImports(a, this._importPromises), this.options.useShaderStore && this._shaderPath.vertex === "postprocess" && this._importPromises.push(a && this._webGPUReady ? import("./postprocess.vertex-DpZYH6av.js") : import("./postprocess.vertex-7rFBNJhZ.js")), r !== void 0 && r(a, this._importPromises), a && this._webGPUReady && (this.options.shaderLanguage = 1), e || this.updateEffect(n);
	}
	updateEffect(e = null, n = null, r = null, a, o, s, c, l) {
		let u = t._GetShaderCodeProcessing(this.name);
		if (u?.defineCustomBindings) {
			let t = n?.slice() ?? [];
			t.push(...this.options.uniforms);
			let i = r?.slice() ?? [];
			i.push(...this.options.samplers), e = u.defineCustomBindings(this.name, e, t, i), n = t, r = i;
		}
		this.options.defines = e || "";
		let d = this._shadersLoaded || this._importPromises.length === 0 ? void 0 : async () => {
			await Promise.all(this._importPromises), this._shadersLoaded = !0;
		}, f;
		f = this.options.extraInitializationsAsync ? async () => {
			await d?.(), await this.options.extraInitializationsAsync();
		} : d, this.options.useShaderStore ? this._drawWrapper.effect = this.options.engine.createEffect({
			vertex: c ?? this._shaderPath.vertex,
			fragment: l ?? this._shaderPath.fragment
		}, {
			attributes: this.options.attributeNames,
			uniformsNames: n || this.options.uniforms,
			uniformBuffersNames: this.options.uniformBuffers,
			samplers: r || this.options.samplers,
			defines: e === null ? "" : e,
			fallbacks: null,
			onCompiled: o ?? this.options.onCompiled,
			onError: s ?? null,
			indexParameters: a || this.options.indexParameters,
			processCodeAfterIncludes: u?.processCodeAfterIncludes ? (e, t) => u.processCodeAfterIncludes(this.name, e, t) : null,
			processFinalCode: u?.processFinalCode ? (e, t) => u.processFinalCode(this.name, e, t) : null,
			shaderLanguage: this.options.shaderLanguage,
			extraInitializationsAsync: f
		}, this.options.engine) : this._drawWrapper.effect = new i(this._shaderPath, this.options.attributeNames, n || this.options.uniforms, r || this.options.samplerNames, this.options.engine, e, void 0, o || this.options.onCompiled, void 0, void 0, void 0, this.options.shaderLanguage, f), this.onEffectCreatedObservable.notifyObservers(this._drawWrapper.effect);
	}
	bind(e = !1) {
		this.options.useAsPostProcess && !e && (this.options.engine.setAlphaMode(this.alphaMode), this.drawWrapper.effect.setFloat2("scale", 1, 1)), t._GetShaderCodeProcessing(this.name)?.bindCustomBindings?.(this.name, this._drawWrapper.effect);
	}
	dispose(e = !1) {
		this._onContextRestoredObserver &&= (this.effect.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver), null), this.onEffectCreatedObservable.clear(), this._drawWrapper.dispose(!0);
	}
};
y.ForceGLSL = !1, y._CustomShaderCodeProcessing = {};
//#endregion
export { p as a, u as c, f as i, y as n, m as o, g as r, d as s, v as t };

//# sourceMappingURL=effectRenderer.pure-otg4q1-d.js.map