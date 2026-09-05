import { a as e } from "./abstractEngine-C4dI3NwB.js";
import { t } from "./logger-DQIzSR_y.js";
import { t as n } from "./dataBuffer-D0yU3uxD.js";
import { f as r, p as i, u as a } from "./tools-CL3QBXT6.js";
//#region node_modules/@babylonjs/core/Maths/math.viewport.js
var o = class e {
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
}, s = class {
	get isDisposed() {
		return this._isDisposed;
	}
	constructor(e, t, r, i = 0, a = !1, o = !1, s = !1, c, l) {
		this._isAlreadyOwned = !1, this._isDisposed = !1, this._engine = e && e.getScene ? e.getScene().getEngine() : e, this._updatable = r, this._instanced = o, this._divisor = c || 1, this._label = l, t instanceof n ? (this._data = null, this._buffer = t) : (this._data = t, this._buffer = null), this.byteStride = s ? i : i * Float32Array.BYTES_PER_ELEMENT, a || this.create();
	}
	createVertexBuffer(e, t, n, r, i, a = !1, o) {
		let s = a ? t : t * Float32Array.BYTES_PER_ELEMENT, l = r ? a ? r : r * Float32Array.BYTES_PER_ELEMENT : this.byteStride;
		return new c(this._engine, this, e, this._updatable, !0, l, i === void 0 ? this._instanced : i, s, n, void 0, void 0, !0, this._divisor || o);
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
}, c = class e {
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
	constructor(t, n, r, a, o, c, l, u, d, f, p = !1, m = !1, h = 1, g = !1) {
		this._isDisposed = !1;
		let _;
		if (this.engine = t, typeof a == "object" && a ? (_ = a.updatable ?? !1, o = a.postponeInternalCreation, c = a.stride, l = a.instanced, u = a.offset, d = a.size, f = a.type, p = a.normalized ?? !1, m = a.useBytes ?? !1, h = a.divisor ?? 1, g = a.takeBufferOwnership ?? !1, this._label = a.label) : _ = !!a, n instanceof s ? (this._buffer = n, this._ownsBuffer = g) : (this._buffer = new s(t, n, _, c, o, l, m, h, this._label), this._ownsBuffer = !0), this.uniqueId = e._Counter++, this._kind = r, f === void 0) {
			let t = this.getData();
			this.type = t ? e.GetDataType(t) : e.FLOAT;
		} else this.type = f;
		let v = i(this.type);
		m ? (this._size = d || (c ? c / v : e.DeduceStride(r)), this.byteStride = c || this._buffer.byteStride || this._size * v, this.byteOffset = u || 0) : (this._size = d || c || e.DeduceStride(r), this.byteStride = c ? c * v : this._buffer.byteStride || this._size * v, this.byteOffset = (u || 0) * v), this.normalized = p, this._instanced = l !== void 0 && l, this._instanceDivisor = l ? h : 0, this._alignBuffer(), this._computeHashCode();
	}
	_computeHashCode() {
		this.hashCode = (this.type - 5120 << 0) + (!!this.normalized << 3) + (this._size << 4) + (!!this._instanced << 6) + (this.byteStride << 12);
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
		return n ? r(n, this._size, this.type, this.byteOffset, this.byteStride, this.normalized, e, t) : null;
	}
	getBuffer() {
		return this._buffer.getBuffer();
	}
	getWrapperBuffer() {
		return this._buffer;
	}
	getStrideSize() {
		return this.byteStride / i(this.type);
	}
	getOffset() {
		return this.byteOffset / i(this.type);
	}
	getSize(e = !1) {
		return e ? this._size * i(this.type) : this._size;
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
		a(this._buffer.getData(), this.byteOffset, this.byteStride, this._size, this.type, e, this.normalized, (e, n) => {
			for (let r = 0; r < this._size; r++) t(e[r], n + r);
		});
	}
	_alignBuffer() {}
	static DeduceStride(t) {
		switch (t) {
			case e.UVKind:
			case e.UV2Kind:
			case e.UV3Kind:
			case e.UV4Kind:
			case e.UV5Kind:
			case e.UV6Kind: return 2;
			case e.NormalKind:
			case e.PositionKind: return 3;
			case e.ColorKind:
			case e.ColorInstanceKind:
			case e.MatricesIndicesKind:
			case e.MatricesIndicesExtraKind:
			case e.MatricesWeightsKind:
			case e.MatricesWeightsExtraKind:
			case e.TangentKind: return 4;
			default: throw Error("Invalid kind '" + t + "'");
		}
	}
	static GetDataType(t) {
		return t instanceof Int8Array ? e.BYTE : t instanceof Uint8Array ? e.UNSIGNED_BYTE : t instanceof Int16Array ? e.SHORT : t instanceof Uint16Array ? e.UNSIGNED_SHORT : t instanceof Int32Array ? e.INT : t instanceof Uint32Array ? e.UNSIGNED_INT : e.FLOAT;
	}
	static GetTypeByteLength(e) {
		return i(e);
	}
	static ForEach(e, t, n, r, i, o, s, c) {
		a(e, t, n, r, i, o, s, (e, t) => {
			for (let n = 0; n < r; n++) c(e[n], t + n);
		});
	}
	static GetFloatData(e, t, n, i, a, o, s, c) {
		return r(e, t, n, i, a, o, s, c);
	}
};
c._Counter = 0, c.BYTE = 5120, c.UNSIGNED_BYTE = 5121, c.SHORT = 5122, c.UNSIGNED_SHORT = 5123, c.INT = 5124, c.UNSIGNED_INT = 5125, c.FLOAT = 5126, c.PositionKind = "position", c.NormalKind = "normal", c.TangentKind = "tangent", c.UVKind = "uv", c.UV2Kind = "uv2", c.UV3Kind = "uv3", c.UV4Kind = "uv4", c.UV5Kind = "uv5", c.UV6Kind = "uv6", c.ColorKind = "color", c.ColorInstanceKind = "instanceColor", c.MatricesIndicesKind = "matricesIndices", c.MatricesWeightsKind = "matricesWeights", c.MatricesIndicesExtraKind = "matricesIndicesExtra", c.MatricesWeightsExtraKind = "matricesWeightsExtra";
//#endregion
//#region node_modules/@babylonjs/core/Materials/drawWrapper.js
var l = class {
	static GetEffect(e) {
		return e.getPipelineContext === void 0 ? e.effect : e;
	}
	constructor(e, t = !0) {
		this._wasPreviouslyReady = !1, this._forceRebindOnNextCall = !0, this._wasPreviouslyUsingInstances = null, this.effect = null, this.defines = null, this.drawContext = e.createDrawContext(), t && (this.materialContext = e.createMaterialContext());
	}
	setEffect(e, t, n = !0) {
		this.effect = e, t !== void 0 && (this.defines = t), n && this.drawContext?.reset();
	}
	dispose(t = !1) {
		if (this.effect) {
			let n = this.effect;
			t ? n.dispose() : e.SetImmediate(() => {
				n.getEngine().onEndFrameObservable.addOnce(() => {
					n.dispose();
				});
			}), this.effect = null;
		}
		this.drawContext?.dispose();
	}
};
//#endregion
export { o as i, s as n, c as r, l as t };

//# sourceMappingURL=drawWrapper-B2Z7Hhiz.js.map