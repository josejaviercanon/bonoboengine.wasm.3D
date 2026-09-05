import { n as e, r as t } from "./performanceConfigurator-DKR9RfNv.js";
import { P as n, c as r, r as i, t as a } from "./abstractEngine-C4dI3NwB.js";
import { o } from "./thinEngine-U-D1z5pZ.js";
import { t as s } from "./logger-DQIzSR_y.js";
import { t as c } from "./shaderStore-CXjvw9c2.js";
import { a as l, f as u, i as d, p as f, s as p, t as m } from "./lightConstants-t4r6lMWn.js";
import { a as h, d as g, i as _, l as v, n as y, o as b, r as x, t as S } from "./math.vector-BskpwSKn.js";
import { n as C, t as ee } from "./typeStore-pENEWnX2.js";
import { i as te, n as ne, t as w } from "./math.scalar.functions-BQvmU5eh.js";
import { a as T, c as E, i as D, l as O, n as k, o as re, s as ie, t as A, u as ae } from "./texture-XPOS5lxO.js";
import { i as oe, n as se, r as j, t as ce } from "./drawWrapper-B2Z7Hhiz.js";
import { c as le, d as ue, f as de, h as M, i as fe, l as pe, n as me, p as he, r as N, s as ge, t as P, u as _e } from "./decorators-BjxgwLXx.js";
import { _ as ve, g as ye, i as be, l as xe, m as Se, n as F, t as Ce, v as we } from "./tools-CL3QBXT6.js";
import { a as Te, c as Ee, i as I, n as De, o as Oe, r as ke, s as Ae, t as je } from "./scene-DOrQhig3.js";
//#region node_modules/@babylonjs/core/node.js
var Me = class {
	constructor() {
		this._doNotSerialize = !1, this._isDisposed = !1, this._sceneRootNodesIndex = -1, this._isEnabled = !0, this._isParentEnabled = !0, this._isReady = !0, this._onEnabledStateChangedObservable = new t(), this._onClonedObservable = new t(), this._inheritVisibility = !1, this._isVisible = !0;
	}
}, L = class n {
	static AddNodeConstructor(e, t) {
		this._NodeConstructors[e] = t;
	}
	static Construct(e, t, n, r) {
		let i = this._NodeConstructors[e];
		return i ? i(t, n, r) : null;
	}
	set accessibilityTag(e) {
		this._accessibilityTag = e, this.onAccessibilityTagChangedObservable.notifyObservers(e);
	}
	get accessibilityTag() {
		return this._accessibilityTag;
	}
	get doNotSerialize() {
		return this._nodeDataStorage._doNotSerialize ? !0 : this._parentNode ? this._parentNode.doNotSerialize : !1;
	}
	set doNotSerialize(e) {
		this._nodeDataStorage._doNotSerialize = e;
	}
	isDisposed() {
		return this._nodeDataStorage._isDisposed;
	}
	set parent(e) {
		if (this._parentNode === e) return;
		let t = this._parentNode;
		if (this._parentNode && this._parentNode._children !== void 0 && this._parentNode._children !== null) {
			let t = this._parentNode._children.indexOf(this);
			t !== -1 && this._parentNode._children.splice(t, 1), !e && !this._nodeDataStorage._isDisposed && this._addToSceneRootNodes();
		}
		this._parentNode = e, this._isDirty = !0, this._parentNode && ((this._parentNode._children === void 0 || this._parentNode._children === null) && (this._parentNode._children = []), this._parentNode._children.push(this), t || this._removeFromSceneRootNodes()), this._syncParentEnabledState();
	}
	get parent() {
		return this._parentNode;
	}
	get inheritVisibility() {
		return this._nodeDataStorage._inheritVisibility;
	}
	set inheritVisibility(e) {
		this._nodeDataStorage._inheritVisibility = e;
	}
	get isVisible() {
		return this.inheritVisibility && this._parentNode && !this._parentNode.isVisible ? !1 : this._nodeDataStorage._isVisible;
	}
	set isVisible(e) {
		this._nodeDataStorage._isVisible = e;
	}
	_serializeAsParent(e) {
		e.parentId = this.uniqueId;
	}
	_addToSceneRootNodes() {
		this._nodeDataStorage._sceneRootNodesIndex === -1 && (this._nodeDataStorage._sceneRootNodesIndex = this._scene.rootNodes.length, this._scene.rootNodes.push(this));
	}
	_removeFromSceneRootNodes() {
		if (this._nodeDataStorage._sceneRootNodesIndex !== -1) {
			let e = this._scene.rootNodes, t = e.length - 1;
			e[this._nodeDataStorage._sceneRootNodesIndex] = e[t], e[this._nodeDataStorage._sceneRootNodesIndex]._nodeDataStorage._sceneRootNodesIndex = this._nodeDataStorage._sceneRootNodesIndex, this._scene.rootNodes.pop(), this._nodeDataStorage._sceneRootNodesIndex = -1;
		}
	}
	get animationPropertiesOverride() {
		return this._animationPropertiesOverride ? this._animationPropertiesOverride : this._scene.animationPropertiesOverride;
	}
	set animationPropertiesOverride(e) {
		this._animationPropertiesOverride = e;
	}
	getClassName() {
		return "Node";
	}
	set onDispose(e) {
		this._onDisposeObserver && this.onDisposeObservable.remove(this._onDisposeObserver), this._onDisposeObserver = this.onDisposeObservable.add(e);
	}
	get onEnabledStateChangedObservable() {
		return this._nodeDataStorage._onEnabledStateChangedObservable;
	}
	get onClonedObservable() {
		return this._nodeDataStorage._onClonedObservable;
	}
	constructor(n, r = null, i = !0) {
		this._isDirty = !1, this._nodeDataStorage = new Me(), this.state = "", this.metadata = null, this.reservedDataStore = null, this._accessibilityTag = null, this.onAccessibilityTagChangedObservable = new t(), this._parentContainer = null, this.animations = [], this._ranges = {}, this.onReady = null, this._currentRenderId = -1, this._parentUpdateId = -1, this._childUpdateId = -1, this._waitingParentId = null, this._waitingParentInstanceIndex = null, this._waitingParsedUniqueId = null, this._cache = {}, this._parentNode = null, this._children = null, this._worldMatrix = S.Identity(), this._worldMatrixDeterminant = 0, this._worldMatrixDeterminantIsDirty = !0, this._animationPropertiesOverride = null, this._isNode = !0, this.onDisposeObservable = new t(), this._onDisposeObserver = null, this._behaviors = [], this.name = n, this.id = n, this._scene = r || e.LastCreatedScene, this.uniqueId = this._scene.getUniqueId(), this._initCache(), i && this._addToSceneRootNodes();
	}
	getScene() {
		return this._scene;
	}
	getEngine() {
		return this._scene.getEngine();
	}
	addBehavior(e, t = !1) {
		return this._behaviors.indexOf(e) === -1 ? (e.init(), this._scene.isLoading && !t ? this._scene.onDataLoadedObservable.addOnce(() => {
			this._behaviors.includes(e) && e.attach(this);
		}) : e.attach(this), this._behaviors.push(e), this) : this;
	}
	removeBehavior(e) {
		let t = this._behaviors.indexOf(e);
		return t === -1 ? this : (this._behaviors[t].detach(), this._behaviors.splice(t, 1), this);
	}
	get behaviors() {
		return this._behaviors;
	}
	getBehaviorByName(e) {
		for (let t of this._behaviors) if (t.name === e) return t;
		return null;
	}
	getWorldMatrix() {
		return this._currentRenderId !== this._scene.getRenderId() && this.computeWorldMatrix(), this._worldMatrix;
	}
	_getWorldMatrixDeterminant() {
		return this._worldMatrixDeterminantIsDirty && (this._worldMatrixDeterminantIsDirty = !1, this._worldMatrixDeterminant = this._worldMatrix.determinant()), this._worldMatrixDeterminant;
	}
	get worldMatrixFromCache() {
		return this._worldMatrix;
	}
	_initCache() {
		this._cache = {};
	}
	updateCache(e) {
		!e && this.isSynchronized() || this._updateCache();
	}
	_getActionManagerForTrigger(e, t = !0) {
		return this.parent ? this.parent._getActionManagerForTrigger(e, !1) : null;
	}
	_updateCache(e) {}
	_isSynchronized() {
		return !0;
	}
	_markSyncedWithParent() {
		this._parentNode && (this._parentUpdateId = this._parentNode._childUpdateId);
	}
	isSynchronizedWithParent() {
		return this._parentNode ? this._parentNode._isDirty || this._parentUpdateId !== this._parentNode._childUpdateId ? !1 : this._parentNode.isSynchronized() : !0;
	}
	isSynchronized() {
		return this._parentNode && !this.isSynchronizedWithParent() ? !1 : this._isSynchronized();
	}
	isReady(e = !1) {
		return this._nodeDataStorage._isReady;
	}
	markAsDirty(e) {
		return this._currentRenderId = Number.MAX_VALUE, this._isDirty = !0, this;
	}
	isEnabled(e = !0) {
		return e === !1 ? this._nodeDataStorage._isEnabled : this._nodeDataStorage._isEnabled ? this._nodeDataStorage._isParentEnabled : !1;
	}
	_syncParentEnabledState() {
		if (this._nodeDataStorage._isParentEnabled = !this._parentNode || this._parentNode.isEnabled(), this._children) for (let e of this._children) e._syncParentEnabledState();
	}
	setEnabled(e) {
		this._nodeDataStorage._isEnabled !== e && (this._nodeDataStorage._isEnabled = e, this._syncParentEnabledState(), this._nodeDataStorage._onEnabledStateChangedObservable.notifyObservers(e));
	}
	isDescendantOf(e) {
		return this.parent ? this.parent === e || this.parent.isDescendantOf(e) : !1;
	}
	_getDescendants(e, t = !1, n) {
		if (this._children) for (let r = 0; r < this._children.length; r++) {
			let i = this._children[r];
			(!n || n(i)) && e.push(i), t || i._getDescendants(e, !1, n);
		}
	}
	getDescendants(e, t) {
		let n = [];
		return this._getDescendants(n, e, t), n;
	}
	getChildMeshes(e, t) {
		let n = [];
		return this._getDescendants(n, e, (e) => (!t || t(e)) && e.cullingStrategy !== void 0), n;
	}
	getChildren(e, t = !0) {
		return this.getDescendants(t, e);
	}
	_setReady(e) {
		if (e !== this._nodeDataStorage._isReady) {
			if (!e) {
				this._nodeDataStorage._isReady = !1;
				return;
			}
			this.onReady && this.onReady(this), this._nodeDataStorage._isReady = !0;
		}
	}
	getAnimationByName(e) {
		for (let t = 0; t < this.animations.length; t++) {
			let n = this.animations[t];
			if (n.name === e) return n;
		}
		return null;
	}
	createAnimationRange(e, t, r) {
		if (!this._ranges[e]) {
			this._ranges[e] = n._AnimationRangeFactory(e, t, r);
			for (let n = 0, i = this.animations.length; n < i; n++) this.animations[n] && this.animations[n].createRange(e, t, r);
		}
	}
	deleteAnimationRange(e, t = !0) {
		for (let n = 0, r = this.animations.length; n < r; n++) this.animations[n] && this.animations[n].deleteRange(e, t);
		this._ranges[e] = null;
	}
	getAnimationRange(e) {
		return this._ranges[e] || null;
	}
	clone(e, t, r) {
		let i = D.Clone(() => new n(e, this.getScene()), this);
		if (t && (i.parent = t), !r) {
			let t = this.getDescendants(!0);
			for (let n = 0; n < t.length; n++) {
				let r = t[n];
				r.clone(e + "." + r.name, i);
			}
		}
		return i;
	}
	getAnimationRanges() {
		let e = [], t;
		for (t in this._ranges) e.push(this._ranges[t]);
		return e;
	}
	beginAnimation(e, t, n, r) {
		let i = this.getAnimationRange(e);
		return i ? this._scene.beginAnimation(this, i.from, i.to, t, n, r) : null;
	}
	serializeAnimationRanges() {
		let e = [];
		for (let t in this._ranges) {
			let n = this._ranges[t];
			if (!n) continue;
			let r = {};
			r.name = t, r.from = n.from, r.to = n.to, e.push(r);
		}
		return e;
	}
	computeWorldMatrix(e) {
		return this._worldMatrix ||= S.Identity(), this._worldMatrix;
	}
	dispose(e, t = !1) {
		if (this._nodeDataStorage._isDisposed = !0, !e) {
			let n = this.getDescendants(!0);
			for (let r of n) r.dispose(e, t);
		}
		this.parent ? this.parent = null : this._removeFromSceneRootNodes(), this.onDisposeObservable.notifyObservers(this), this.onDisposeObservable.clear(), this.onEnabledStateChangedObservable.clear(), this.onClonedObservable.clear();
		for (let e of this._behaviors) e.detach();
		this._behaviors.length = 0, this.metadata = null;
	}
	static ParseAnimationRanges(e, t, n) {
		if (t.ranges) for (let n = 0; n < t.ranges.length; n++) {
			let r = t.ranges[n];
			e.createAnimationRange(r.name, r.from, r.to);
		}
	}
	getHierarchyBoundingVectors(e = !0, t = null) {
		this.getScene().incrementRenderId(), this.computeWorldMatrix(!0);
		let n, r, i = this;
		if (i.getBoundingInfo && i.subMeshes) {
			let e = i.getBoundingInfo();
			n = e.boundingBox.minimumWorld.clone(), r = e.boundingBox.maximumWorld.clone();
		} else n = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), r = new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
		if (e) {
			let e = this.getDescendants(!1);
			for (let i of e) {
				let e = i;
				if (e.computeWorldMatrix(!0), t && !t(e) || !e.getBoundingInfo || e.getTotalVertices() === 0) continue;
				let a = e.getBoundingInfo().boundingBox, o = a.minimumWorld, s = a.maximumWorld;
				h.CheckExtends(o, n, r), h.CheckExtends(s, n, r);
			}
		}
		return {
			min: n,
			max: r
		};
	}
};
L._AnimationRangeFactory = (e, t, r) => {
	throw n("AnimationRange");
}, L._NodeConstructors = {}, M([N()], L.prototype, "name", void 0), M([N()], L.prototype, "id", void 0), M([N()], L.prototype, "uniqueId", void 0), M([N()], L.prototype, "state", void 0), M([N()], L.prototype, "metadata", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Misc/coroutine.js
function Ne(e, t, n) {
	try {
		let r = e.next();
		r.done ? t(r) : r.value ? r.value.then(() => {
			r.value = void 0, t(r);
		}, n) : t(r);
	} catch (e) {
		n(e);
	}
}
function Pe(e = 25) {
	let t;
	return (n, r, i) => {
		let a = performance.now();
		t === void 0 || a - t > e ? (t = a, setTimeout(() => {
			Ne(n, r, i);
		}, 0)) : Ne(n, r, i);
	};
}
function Fe(e, t, n, r, i) {
	let a = () => {
		let o, s = (e) => {
			e.done ? n(e.value) : o === void 0 ? o = !0 : a();
		};
		do
			o = void 0, !i || !i.aborted ? t(e, s, r) : r(/* @__PURE__ */ Error("Aborted")), o === void 0 && (o = !1);
		while (o);
	};
	a();
}
function Ie(e, t) {
	let n;
	return Fe(e, Ne, (e) => n = e, (e) => {
		throw e;
	}, t), n;
}
async function Le(e, t, n) {
	return await new Promise((r, i) => {
		Fe(e, t, r, i, n);
	});
}
function Re(e, t) {
	return (...n) => Ie(e(...n), t);
}
//#endregion
//#region node_modules/@babylonjs/core/Cameras/camera.js
var R = class e extends L {
	get position() {
		return this._position;
	}
	set position(e) {
		this._position = e;
	}
	set upVector(e) {
		this._upVector = e;
	}
	get upVector() {
		return this._upVector;
	}
	get screenArea() {
		let t, n;
		if (this.mode === e.PERSPECTIVE_CAMERA) this.fovMode === e.FOVMODE_VERTICAL_FIXED ? (n = this.minZ * 2 * Math.tan(this.fov / 2), t = this.getEngine().getAspectRatio(this) * n) : (t = this.minZ * 2 * Math.tan(this.fov / 2), n = t / this.getEngine().getAspectRatio(this));
		else {
			let e = this.getEngine().getRenderWidth() / 2, r = this.getEngine().getRenderHeight() / 2;
			t = (this.orthoRight ?? e) - (this.orthoLeft ?? -e), n = (this.orthoTop ?? r) - (this.orthoBottom ?? -r);
		}
		return t * n;
	}
	set orthoLeft(e) {
		this._orthoLeft = e;
		for (let t of this._rigCameras) t.orthoLeft = e;
	}
	get orthoLeft() {
		return this._orthoLeft;
	}
	set orthoRight(e) {
		this._orthoRight = e;
		for (let t of this._rigCameras) t.orthoRight = e;
	}
	get orthoRight() {
		return this._orthoRight;
	}
	set orthoBottom(e) {
		this._orthoBottom = e;
		for (let t of this._rigCameras) t.orthoBottom = e;
	}
	get orthoBottom() {
		return this._orthoBottom;
	}
	set orthoTop(e) {
		this._orthoTop = e;
		for (let t of this._rigCameras) t.orthoTop = e;
	}
	get orthoTop() {
		return this._orthoTop;
	}
	setFocalLength(e, t = 36) {
		this.fov = 2 * Math.atan(t / (2 * e));
	}
	set mode(e) {
		this._mode = e;
		for (let t of this._rigCameras) t.mode = e;
	}
	get mode() {
		return this._mode;
	}
	get hasMoved() {
		return this._hasMoved;
	}
	constructor(n, r, i, a = !0) {
		super(n, i, !1), this._position = h.Zero(), this._upVector = h.Up(), this.oblique = null, this._orthoLeft = null, this._orthoRight = null, this._orthoBottom = null, this._orthoTop = null, this.fov = .8, this.projectionPlaneTilt = 0, this.minZ = 1, this.maxZ = 1e4, this.inertia = .9, this._mode = e.PERSPECTIVE_CAMERA, this.isIntermediate = !1, this.viewport = new oe(0, 0, 1, 1), this.layerMask = 268435455, this.fovMode = e.FOVMODE_VERTICAL_FIXED, this.cameraRigMode = e.RIG_MODE_NONE, this.ignoreCameraMaxZ = !1, this.customRenderTargets = [], this.outputRenderTarget = null, this.onViewMatrixChangedObservable = new t(), this.onProjectionMatrixChangedObservable = new t(), this.onAfterCheckInputsObservable = new t(), this.onRestoreStateObservable = new t(), this.isRigCamera = !1, this._hasMoved = !1, this._rigCameras = [], this._skipRendering = !1, this._projectionMatrix = new S(), this._postProcesses = [], this._activeMeshes = new l(256), this._globalPosition = h.Zero(), this._computedViewMatrix = S.Identity(), this._doNotComputeProjectionMatrix = !1, this._transformMatrix = S.Zero(), this._refreshFrustumPlanes = !0, this._absoluteRotation = y.Identity(), this._isCamera = !0, this._isLeftCamera = !1, this._isRightCamera = !1, this.getScene().addCamera(this), a && !this.getScene().activeCamera && (this.getScene().activeCamera = this), this.position = r, this.renderPassId = this.getScene().getEngine().createRenderPassId(`Camera ${n}`);
	}
	storeState() {
		return this._stateStored = !0, this._storedFov = this.fov, this;
	}
	hasStateStored() {
		return !!this._stateStored;
	}
	_restoreStateValues() {
		return this._stateStored ? (this.fov = this._storedFov, !0) : !1;
	}
	restoreState() {
		return this._restoreStateValues() ? (this.onRestoreStateObservable.notifyObservers(this), !0) : !1;
	}
	getClassName() {
		return "Camera";
	}
	toString(e) {
		let t = "Name: " + this.name;
		if (t += ", type: " + this.getClassName(), this.animations) for (let n = 0; n < this.animations.length; n++) t += ", animation[0]: " + this.animations[n].toString(e);
		return t;
	}
	applyVerticalCorrection() {
		let e = this.absoluteRotation.toEulerAngles();
		this.projectionPlaneTilt = this._scene.useRightHandedSystem ? -e.x : e.x;
	}
	get globalPosition() {
		return this._globalPosition;
	}
	getActiveMeshes() {
		return this._activeMeshes;
	}
	isActiveMesh(e) {
		return this._activeMeshes.indexOf(e) !== -1;
	}
	isReady(e = !1) {
		if (e) {
			for (let e of this._postProcesses) if (e && !e.isReady()) return !1;
		}
		return super.isReady(e);
	}
	_initCache() {
		super._initCache(), this._cache.position = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.upVector = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.mode = void 0, this._cache.minZ = void 0, this._cache.maxZ = void 0, this._cache.fov = void 0, this._cache.fovMode = void 0, this._cache.aspectRatio = void 0, this._cache.orthoLeft = void 0, this._cache.orthoRight = void 0, this._cache.orthoBottom = void 0, this._cache.orthoTop = void 0, this._cache.obliqueAngle = void 0, this._cache.obliqueLength = void 0, this._cache.obliqueOffset = void 0, this._cache.renderWidth = void 0, this._cache.renderHeight = void 0;
	}
	_updateCache(e) {
		e || super._updateCache(), this._cache.position.copyFrom(this.position), this._cache.upVector.copyFrom(this.upVector);
	}
	_isSynchronized() {
		return this._isSynchronizedViewMatrix() && this._isSynchronizedProjectionMatrix();
	}
	_isSynchronizedViewMatrix() {
		return super._isSynchronized() ? this._cache.position.equals(this.position) && this._cache.upVector.equals(this.upVector) && this.isSynchronizedWithParent() : !1;
	}
	_isSynchronizedProjectionMatrix() {
		let t = this.ignoreCameraMaxZ ? 0 : this.maxZ, n = this._cache.mode === this.mode && this._cache.minZ === this.minZ && this._cache.maxZ === t;
		if (!n) return !1;
		let r = this.getEngine();
		return this.mode === e.PERSPECTIVE_CAMERA ? n = this._cache.fov === this.fov && this._cache.fovMode === this.fovMode && this._cache.aspectRatio === r.getAspectRatio(this) && this._cache.projectionPlaneTilt === this.projectionPlaneTilt : (n = this._cache.orthoLeft === this.orthoLeft && this._cache.orthoRight === this.orthoRight && this._cache.orthoBottom === this.orthoBottom && this._cache.orthoTop === this.orthoTop && this._cache.renderWidth === r.getRenderWidth() && this._cache.renderHeight === r.getRenderHeight(), this.oblique && (n = n && this._cache.obliqueAngle === this.oblique.angle && this._cache.obliqueLength === this.oblique.length && this._cache.obliqueOffset === this.oblique.offset)), n;
	}
	attachControl(e, t) {}
	detachControl(e) {}
	update() {
		this._hasMoved = !1, this._checkInputs(), this.cameraRigMode !== e.RIG_MODE_NONE && this._updateRigCameras(), this.getViewMatrix(), this.getProjectionMatrix();
	}
	_checkInputs() {
		this.onAfterCheckInputsObservable.notifyObservers(this);
	}
	get rigCameras() {
		return this._rigCameras;
	}
	get rigPostProcess() {
		return this._rigPostProcess;
	}
	_getFirstPostProcess() {
		for (let e = 0; e < this._postProcesses.length; e++) if (this._postProcesses[e] !== null) return this._postProcesses[e];
		return null;
	}
	_cascadePostProcessesToRigCams() {
		let e = this._getFirstPostProcess();
		e && e.markTextureDirty();
		for (let e = 0, t = this._rigCameras.length; e < t; e++) {
			let t = this._rigCameras[e], n = t._rigPostProcess;
			n ? (n.getEffectName() === "pass" && (t.isIntermediate = this._postProcesses.length === 0), t._postProcesses = this._postProcesses.slice(0).concat(n), n.markTextureDirty()) : t._postProcesses = this._postProcesses.slice(0);
		}
	}
	attachPostProcess(e, t = null) {
		return !e.isReusable() && this._postProcesses.indexOf(e) > -1 ? (s.Error("You're trying to reuse a post process not defined as reusable."), 0) : (t == null || t < 0 ? this._postProcesses.push(e) : this._postProcesses[t] === null ? this._postProcesses[t] = e : this._postProcesses.splice(t, 0, e), this._cascadePostProcessesToRigCams(), this._scene.prePassRenderer && this._scene.prePassRenderer.markAsDirty(), this._postProcesses.indexOf(e));
	}
	detachPostProcess(e) {
		let t = this._postProcesses.indexOf(e);
		t !== -1 && (this._postProcesses[t] = null), this._scene.prePassRenderer && this._scene.prePassRenderer.markAsDirty(), this._cascadePostProcessesToRigCams();
	}
	getWorldMatrix() {
		return this._isSynchronizedViewMatrix() || this.getViewMatrix(), this._worldMatrix;
	}
	_getViewMatrix() {
		return S.Identity();
	}
	getViewMatrix(e) {
		return !e && this._isSynchronizedViewMatrix() ? this._computedViewMatrix : (this._hasMoved = !0, this.updateCache(), this._computedViewMatrix = this._getViewMatrix(), this._currentRenderId = this.getScene().getRenderId(), this._childUpdateId++, this._refreshFrustumPlanes = !0, this._cameraRigParams && this._cameraRigParams.vrPreViewMatrix && this._computedViewMatrix.multiplyToRef(this._cameraRigParams.vrPreViewMatrix, this._computedViewMatrix), this.parent && this.parent.onViewMatrixChangedObservable && this.parent.onViewMatrixChangedObservable.notifyObservers(this.parent), this.onViewMatrixChangedObservable.notifyObservers(this), this._computedViewMatrix.invertToRef(this._worldMatrix), this._worldMatrix.getTranslationToRef(this._globalPosition), this._computedViewMatrix);
	}
	freezeProjectionMatrix(e) {
		this._doNotComputeProjectionMatrix = !0, e !== void 0 && (this._projectionMatrix = e);
	}
	unfreezeProjectionMatrix() {
		this._doNotComputeProjectionMatrix = !1;
	}
	getProjectionMatrix(t) {
		if (this._doNotComputeProjectionMatrix || !t && this._isSynchronizedProjectionMatrix()) return this._projectionMatrix;
		let n = this.ignoreCameraMaxZ ? 0 : this.maxZ;
		this._cache.mode = this.mode, this._cache.minZ = this.minZ, this._cache.maxZ = n, this._refreshFrustumPlanes = !0;
		let r = this.getEngine(), i = this.getScene(), a = r.useReverseDepthBuffer;
		if (this.mode === e.PERSPECTIVE_CAMERA) {
			this._cache.fov = this.fov, this._cache.fovMode = this.fovMode, this._cache.aspectRatio = r.getAspectRatio(this), this._cache.projectionPlaneTilt = this.projectionPlaneTilt, this.minZ <= 0 && (this.minZ = .1);
			let t;
			t = i.useRightHandedSystem ? S.PerspectiveFovRHToRef : S.PerspectiveFovLHToRef, t(this.fov, r.getAspectRatio(this), a ? n : this.minZ, a ? this.minZ : n, this._projectionMatrix, this.fovMode === e.FOVMODE_VERTICAL_FIXED, r.isNDCHalfZRange, this.projectionPlaneTilt, a);
		} else {
			let e = r.getRenderWidth() / 2, t = r.getRenderHeight() / 2;
			i.useRightHandedSystem ? this.oblique ? S.ObliqueOffCenterRHToRef(this.orthoLeft ?? -e, this.orthoRight ?? e, this.orthoBottom ?? -t, this.orthoTop ?? t, a ? n : this.minZ, a ? this.minZ : n, this.oblique.length, this.oblique.angle, this._computeObliqueDistance(this.oblique.offset), this._projectionMatrix, r.isNDCHalfZRange) : S.OrthoOffCenterRHToRef(this.orthoLeft ?? -e, this.orthoRight ?? e, this.orthoBottom ?? -t, this.orthoTop ?? t, a ? n : this.minZ, a ? this.minZ : n, this._projectionMatrix, r.isNDCHalfZRange) : this.oblique ? S.ObliqueOffCenterLHToRef(this.orthoLeft ?? -e, this.orthoRight ?? e, this.orthoBottom ?? -t, this.orthoTop ?? t, a ? n : this.minZ, a ? this.minZ : n, this.oblique.length, this.oblique.angle, this._computeObliqueDistance(this.oblique.offset), this._projectionMatrix, r.isNDCHalfZRange) : S.OrthoOffCenterLHToRef(this.orthoLeft ?? -e, this.orthoRight ?? e, this.orthoBottom ?? -t, this.orthoTop ?? t, a ? n : this.minZ, a ? this.minZ : n, this._projectionMatrix, r.isNDCHalfZRange), this._cache.orthoLeft = this.orthoLeft, this._cache.orthoRight = this.orthoRight, this._cache.orthoBottom = this.orthoBottom, this._cache.orthoTop = this.orthoTop, this._cache.obliqueAngle = this.oblique?.angle, this._cache.obliqueLength = this.oblique?.length, this._cache.obliqueOffset = this.oblique?.offset, this._cache.renderWidth = r.getRenderWidth(), this._cache.renderHeight = r.getRenderHeight();
		}
		return this.onProjectionMatrixChangedObservable.notifyObservers(this), this._projectionMatrix;
	}
	getTransformationMatrix() {
		return this._computedViewMatrix.multiplyToRef(this._projectionMatrix, this._transformMatrix), this._transformMatrix;
	}
	_computeObliqueDistance(e) {
		let t = this, n = this;
		return (t.radius || (n.target ? h.Distance(this.position, n.target) : this.position.length())) + e;
	}
	_updateFrustumPlanes() {
		this._refreshFrustumPlanes &&= (this.getTransformationMatrix(), this._frustumPlanes ? u.GetPlanesToRef(this._transformMatrix, this._frustumPlanes) : this._frustumPlanes = u.GetPlanes(this._transformMatrix), !1);
	}
	isInFrustum(e, t = !1) {
		if (this._updateFrustumPlanes(), t && this.rigCameras.length > 0) {
			let t = !1;
			for (let n of this.rigCameras) n._updateFrustumPlanes(), t ||= e.isInFrustum(n._frustumPlanes);
			return t;
		}
		return e.isInFrustum(this._frustumPlanes);
	}
	isCompletelyInFrustum(e) {
		return this._updateFrustumPlanes(), e.isCompletelyInFrustum(this._frustumPlanes);
	}
	getForwardRay(e = 100, t, r) {
		throw n("Ray");
	}
	getForwardRayToRef(e, t = 100, r, i) {
		throw n("Ray");
	}
	dispose(t, n = !1) {
		for (this.onViewMatrixChangedObservable.clear(), this.onProjectionMatrixChangedObservable.clear(), this.onAfterCheckInputsObservable.clear(), this.onRestoreStateObservable.clear(), this.inputs && this.inputs.clear(), this.getScene().stopAnimation(this), this.getScene().removeCamera(this); this._rigCameras.length > 0;) {
			let e = this._rigCameras.pop();
			e && e.dispose();
		}
		if (this._parentContainer) {
			let e = this._parentContainer.cameras.indexOf(this);
			e > -1 && this._parentContainer.cameras.splice(e, 1), this._parentContainer = null;
		}
		if (this._rigPostProcess) this._rigPostProcess.dispose(this), this._rigPostProcess = null, this._postProcesses.length = 0;
		else if (this.cameraRigMode !== e.RIG_MODE_NONE) this._rigPostProcess = null, this._postProcesses.length = 0;
		else {
			let e = this._postProcesses.length;
			for (; --e >= 0;) {
				let t = this._postProcesses[e];
				t && t.dispose(this);
			}
		}
		let r = this.customRenderTargets.length;
		for (; --r >= 0;) this.customRenderTargets[r].dispose();
		this.customRenderTargets.length = 0, this._activeMeshes.dispose(), this.getScene().getEngine().releaseRenderPassId(this.renderPassId), super.dispose(t, n);
	}
	get isLeftCamera() {
		return this._isLeftCamera;
	}
	get isRightCamera() {
		return this._isRightCamera;
	}
	get leftCamera() {
		return this._rigCameras.length < 1 ? null : this._rigCameras[0];
	}
	get rightCamera() {
		return this._rigCameras.length < 2 ? null : this._rigCameras[1];
	}
	getLeftTarget() {
		return this._rigCameras.length < 1 ? null : this._rigCameras[0].getTarget();
	}
	getRightTarget() {
		return this._rigCameras.length < 2 ? null : this._rigCameras[1].getTarget();
	}
	setCameraRigMode(t, n) {
		if (this.cameraRigMode !== t) {
			for (; this._rigCameras.length > 0;) {
				let e = this._rigCameras.pop();
				e && e.dispose();
			}
			if (this.cameraRigMode = t, this._cameraRigParams = {}, this._cameraRigParams.interaxialDistance = n.interaxialDistance || .0637, this._cameraRigParams.stereoHalfAngle = F.ToRadians(this._cameraRigParams.interaxialDistance / .0637), this.cameraRigMode !== e.RIG_MODE_NONE) {
				let e = this.createRigCamera(this.name + "_L", 0);
				e && (e._isLeftCamera = !0);
				let t = this.createRigCamera(this.name + "_R", 1);
				t && (t._isRightCamera = !0), e && t && (this._rigCameras.push(e), this._rigCameras.push(t));
			}
			this._setRigMode(n), this._cascadePostProcessesToRigCams(), this.update();
		}
	}
	_setRigMode(e) {}
	_getVRProjectionMatrix() {
		return S.PerspectiveFovLHToRef(this._cameraRigParams.vrMetrics.aspectRatioFov, this._cameraRigParams.vrMetrics.aspectRatio, this.minZ, this.ignoreCameraMaxZ ? 0 : this.maxZ, this._cameraRigParams.vrWorkMatrix, !0, this.getEngine().isNDCHalfZRange), this._cameraRigParams.vrWorkMatrix.multiplyToRef(this._cameraRigParams.vrHMatrix, this._projectionMatrix), this._projectionMatrix;
	}
	setCameraRigParameter(e, t) {
		this._cameraRigParams ||= {}, this._cameraRigParams[e] = t, e === "interaxialDistance" && (this._cameraRigParams.stereoHalfAngle = F.ToRadians(t / .0637));
	}
	createRigCamera(e, t) {
		return null;
	}
	_updateRigCameras() {
		for (let e = 0; e < this._rigCameras.length; e++) this._rigCameras[e].minZ = this.minZ, this._rigCameras[e].maxZ = this.ignoreCameraMaxZ ? 0 : this.maxZ, this._rigCameras[e].fov = this.fov, this._rigCameras[e].upVector.copyFrom(this.upVector);
		this.cameraRigMode === e.RIG_MODE_STEREOSCOPIC_ANAGLYPH && (this._rigCameras[0].viewport = this._rigCameras[1].viewport = this.viewport);
	}
	_setupInputs() {}
	serialize() {
		let e = D.Serialize(this);
		return e.uniqueId = this.uniqueId, e.type = this.getClassName(), this.parent && this.parent._serializeAsParent(e), this.inputs && this.inputs.serialize(e), D.AppendSerializedAnimations(this, e), e.ranges = this.serializeAnimationRanges(), e.isEnabled = this.isEnabled(), e;
	}
	clone(t, n = null) {
		let r = D.Clone(e.GetConstructorFromName(this.getClassName(), t, this.getScene(), this.interaxialDistance, this.isStereoscopicSideBySide), this);
		return r.name = t, r.parent = n, this.onClonedObservable.notifyObservers(r), r;
	}
	getDirection(e) {
		let t = h.Zero();
		return this.getDirectionToRef(e, t), t;
	}
	get absoluteRotation() {
		return this.getWorldMatrix().decompose(void 0, this._absoluteRotation), this._absoluteRotation;
	}
	getDirectionToRef(e, t) {
		h.TransformNormalToRef(e, this.getWorldMatrix(), t);
	}
	static GetConstructorFromName(t, n, r, i = 0, a = !0) {
		return L.Construct(t, n, r, {
			interaxial_distance: i,
			isStereoscopicSideBySide: a
		}) || (() => e._CreateDefaultParsedCamera(n, r));
	}
	computeWorldMatrix() {
		return this.getWorldMatrix();
	}
	static Parse(t, n) {
		let r = t.type, i = e.GetConstructorFromName(r, t.name, n, t.interaxial_distance, t.isStereoscopicSideBySide), a = D.Parse(i, t, n);
		if (t.parentId !== void 0 && (a._waitingParentId = t.parentId), t.parentInstanceIndex !== void 0 && (a._waitingParentInstanceIndex = t.parentInstanceIndex), a.inputs && (a.inputs.parse(t), a._setupInputs()), t.upVector && (a.upVector = h.FromArray(t.upVector)), a.setPosition && (a.position.copyFromFloats(0, 0, 0), a.setPosition(h.FromArray(t.position))), t.target && a.setTarget && a.setTarget(h.FromArray(t.target)), t.cameraRigMode) {
			let e = t.interaxial_distance ? { interaxialDistance: t.interaxial_distance } : {};
			a.setCameraRigMode(t.cameraRigMode, e);
		}
		if (t.animations) {
			for (let e = 0; e < t.animations.length; e++) {
				let n = t.animations[e], r = ee("BABYLON.Animation");
				r && a.animations.push(r.Parse(n));
			}
			L.ParseAnimationRanges(a, t, n);
		}
		return t.autoAnimate && n.beginAnimation(a, t.autoAnimateFrom, t.autoAnimateTo, t.autoAnimateLoop, t.autoAnimateSpeed || 1), t.isEnabled !== void 0 && a.setEnabled(t.isEnabled), a;
	}
	_calculateHandednessMultiplier() {
		let e = this.getScene().useRightHandedSystem ? -1 : 1;
		return this.parent && this.parent._getWorldMatrixDeterminant() < 0 && (e *= -1), e;
	}
};
R._CreateDefaultParsedCamera = (e, t) => {
	throw n("UniversalCamera");
}, R.PERSPECTIVE_CAMERA = 0, R.ORTHOGRAPHIC_CAMERA = 1, R.FOVMODE_VERTICAL_FIXED = 0, R.FOVMODE_HORIZONTAL_FIXED = 1, R.RIG_MODE_NONE = 0, R.RIG_MODE_STEREOSCOPIC_ANAGLYPH = 10, R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL = 11, R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED = 12, R.RIG_MODE_STEREOSCOPIC_OVERUNDER = 13, R.RIG_MODE_STEREOSCOPIC_INTERLACED = 14, R.RIG_MODE_VR = 20, R.RIG_MODE_CUSTOM = 22, R.ForceAttachControlToAlwaysPreventDefault = !1, M([he("position")], R.prototype, "_position", void 0), M([he("upVector")], R.prototype, "_upVector", void 0), M([N()], R.prototype, "orthoLeft", null), M([N()], R.prototype, "orthoRight", null), M([N()], R.prototype, "orthoBottom", null), M([N()], R.prototype, "orthoTop", null), M([N()], R.prototype, "fov", void 0), M([N()], R.prototype, "projectionPlaneTilt", void 0), M([N()], R.prototype, "minZ", void 0), M([N()], R.prototype, "maxZ", void 0), M([N()], R.prototype, "inertia", void 0), M([N()], R.prototype, "mode", null), M([N()], R.prototype, "layerMask", void 0), M([N()], R.prototype, "fovMode", void 0), M([N()], R.prototype, "cameraRigMode", void 0), M([N()], R.prototype, "interaxialDistance", void 0), M([N()], R.prototype, "isStereoscopicSideBySide", void 0), M([N()], R.prototype, "ignoreCameraMaxZ", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Collisions/intersectionInfo.js
var ze = class {
	constructor(e, t, n) {
		this.bu = e, this.bv = t, this.distance = n, this.faceId = 0, this.subMeshId = 0, this._internalSubMeshId = 0;
	}
}, Be = class e {
	constructor(e, t, n) {
		this.vectors = v(8, h.Zero), this.center = h.Zero(), this.centerWorld = h.Zero(), this.extendSize = h.Zero(), this.extendSizeWorld = h.Zero(), this.directions = v(3, h.Zero), this.vectorsWorld = v(8, h.Zero), this.minimumWorld = h.Zero(), this.maximumWorld = h.Zero(), this.minimum = h.Zero(), this.maximum = h.Zero(), this._drawWrapperFront = null, this._drawWrapperBack = null, this.reConstruct(e, t, n);
	}
	reConstruct(e, t, n) {
		let r = e.x, i = e.y, a = e.z, o = t.x, s = t.y, c = t.z, l = this.vectors;
		this.minimum.copyFromFloats(r, i, a), this.maximum.copyFromFloats(o, s, c), l[0].copyFromFloats(r, i, a), l[1].copyFromFloats(o, s, c), l[2].copyFromFloats(o, i, a), l[3].copyFromFloats(r, s, a), l[4].copyFromFloats(r, i, c), l[5].copyFromFloats(o, s, a), l[6].copyFromFloats(r, s, c), l[7].copyFromFloats(o, i, c), t.addToRef(e, this.center).scaleInPlace(.5), t.subtractToRef(e, this.extendSize).scaleInPlace(.5), this._worldMatrix = n || S.IdentityReadOnly, this._update(this._worldMatrix);
	}
	scale(t) {
		let n = e._TmpVector3, r = this.maximum.subtractToRef(this.minimum, n[0]), i = r.length();
		r.normalizeFromLength(i);
		let a = i * t, o = r.scaleInPlace(a * .5), s = this.center.subtractToRef(o, n[1]), c = this.center.addToRef(o, n[2]);
		return this.reConstruct(s, c, this._worldMatrix), this;
	}
	getWorldMatrix() {
		return this._worldMatrix;
	}
	_update(e) {
		let t = this.minimumWorld, n = this.maximumWorld, r = this.directions, i = this.vectorsWorld, a = this.vectors;
		if (e.isIdentity()) {
			t.copyFrom(this.minimum), n.copyFrom(this.maximum);
			for (let e = 0; e < 8; ++e) i[e].copyFrom(a[e]);
			this.extendSizeWorld.copyFrom(this.extendSize), this.centerWorld.copyFrom(this.center);
		} else {
			t.setAll(Number.MAX_VALUE), n.setAll(-Number.MAX_VALUE);
			for (let r = 0; r < 8; ++r) {
				let o = i[r];
				h.TransformCoordinatesToRef(a[r], e, o), t.minimizeInPlace(o), n.maximizeInPlace(o);
			}
			n.subtractToRef(t, this.extendSizeWorld).scaleInPlace(.5), n.addToRef(t, this.centerWorld).scaleInPlace(.5);
		}
		h.FromArrayToRef(e.m, 0, r[0]), h.FromArrayToRef(e.m, 4, r[1]), h.FromArrayToRef(e.m, 8, r[2]), this._worldMatrix = e;
	}
	isInFrustum(t) {
		return e.IsInFrustum(this.vectorsWorld, t);
	}
	isCompletelyInFrustum(t) {
		return e.IsCompletelyInFrustum(this.vectorsWorld, t);
	}
	intersectsPoint(e) {
		let t = this.minimumWorld, n = this.maximumWorld, r = t.x, i = t.y, a = t.z, o = n.x, s = n.y, c = n.z, l = e.x, u = e.y, d = e.z, f = -g;
		return !(o - l < f || f > l - r || s - u < f || f > u - i || c - d < f || f > d - a);
	}
	intersectsSphere(t) {
		return e.IntersectsSphere(this.minimumWorld, this.maximumWorld, t.centerWorld, t.radiusWorld);
	}
	intersectsMinMax(e, t) {
		let n = this.minimumWorld, r = this.maximumWorld, i = n.x, a = n.y, o = n.z, s = r.x, c = r.y, l = r.z, u = e.x, d = e.y, f = e.z, p = t.x, m = t.y, h = t.z;
		return !(s < u || i > p || c < d || a > m || l < f || o > h);
	}
	dispose() {
		this._drawWrapperFront?.dispose(), this._drawWrapperBack?.dispose();
	}
	static Intersects(e, t) {
		return e.intersectsMinMax(t.minimumWorld, t.maximumWorld);
	}
	static IntersectsSphere(t, n, r, i) {
		let a = e._TmpVector3[0];
		return h.ClampToRef(r, t, n, a), h.DistanceSquared(r, a) <= i * i;
	}
	static IsCompletelyInFrustum(e, t) {
		for (let n = 0; n < 6; ++n) {
			let r = t[n];
			for (let t = 0; t < 8; ++t) if (r.dotCoordinate(e[t]) < 0) return !1;
		}
		return !0;
	}
	static IsInFrustum(e, t) {
		for (let n = 0; n < 6; ++n) {
			let r = !0, i = t[n];
			for (let t = 0; t < 8; ++t) if (i.dotCoordinate(e[t]) >= 0) {
				r = !1;
				break;
			}
			if (r) return !1;
		}
		return !0;
	}
};
Be._TmpVector3 = v(3, h.Zero);
//#endregion
//#region node_modules/@babylonjs/core/Culling/boundingSphere.js
var Ve = class e {
	constructor(e, t, n) {
		this.center = h.Zero(), this.centerWorld = h.Zero(), this.minimum = h.Zero(), this.maximum = h.Zero(), this.reConstruct(e, t, n);
	}
	reConstruct(e, t, n) {
		this.minimum.copyFrom(e), this.maximum.copyFrom(t);
		let r = h.Distance(e, t);
		t.addToRef(e, this.center).scaleInPlace(.5), this.radius = r * .5, this._update(n || S.IdentityReadOnly);
	}
	scale(t) {
		let n = this.radius * t, r = e._TmpVector3, i = r[0].setAll(n), a = this.center.subtractToRef(i, r[1]), o = this.center.addToRef(i, r[2]);
		return this.reConstruct(a, o, this._worldMatrix), this;
	}
	getWorldMatrix() {
		return this._worldMatrix;
	}
	_update(t) {
		if (t.isIdentity()) this.centerWorld.copyFrom(this.center), this.radiusWorld = this.radius;
		else {
			h.TransformCoordinatesToRef(this.center, t, this.centerWorld);
			let n = e._TmpVector3[0];
			h.TransformNormalFromFloatsToRef(1, 1, 1, t, n), this.radiusWorld = Math.max(Math.abs(n.x), Math.abs(n.y), Math.abs(n.z)) * this.radius;
		}
	}
	isInFrustum(e) {
		let t = this.centerWorld, n = this.radiusWorld;
		for (let r = 0; r < 6; r++) if (e[r].dotCoordinate(t) <= -n) return !1;
		return !0;
	}
	isCenterInFrustum(e) {
		let t = this.centerWorld;
		for (let n = 0; n < 6; n++) if (e[n].dotCoordinate(t) < 0) return !1;
		return !0;
	}
	intersectsPoint(e) {
		let t = h.DistanceSquared(this.centerWorld, e);
		return !(this.radiusWorld * this.radiusWorld < t);
	}
	static Intersects(e, t) {
		let n = h.DistanceSquared(e.centerWorld, t.centerWorld), r = e.radiusWorld + t.radiusWorld;
		return !(r * r < n);
	}
	static CreateFromCenterAndRadius(t, n, r) {
		this._TmpVector3[0].copyFrom(t), this._TmpVector3[1].copyFromFloats(0, 0, n), this._TmpVector3[2].copyFrom(t), this._TmpVector3[0].addInPlace(this._TmpVector3[1]), this._TmpVector3[2].subtractInPlace(this._TmpVector3[1]);
		let i = new e(this._TmpVector3[0], this._TmpVector3[2]);
		return i._worldMatrix = r || S.Identity(), i;
	}
};
Ve._TmpVector3 = v(3, h.Zero);
//#endregion
//#region node_modules/@babylonjs/core/Culling/boundingInfo.js
var He = {
	min: 0,
	max: 0
}, Ue = {
	min: 0,
	max: 0
}, We = (e, t, n) => {
	let r = h.Dot(t.centerWorld, e), i = Math.abs(h.Dot(t.directions[0], e)) * t.extendSize.x, a = Math.abs(h.Dot(t.directions[1], e)) * t.extendSize.y, o = Math.abs(h.Dot(t.directions[2], e)) * t.extendSize.z, s = i + a + o;
	n.min = r - s, n.max = r + s;
}, z = (e, t, n) => (We(e, t, He), We(e, n, Ue), !(He.min > Ue.max || Ue.min > He.max)), Ge = class e {
	constructor(e, t, n) {
		this._isLocked = !1, this.boundingBox = new Be(e, t, n), this.boundingSphere = new Ve(e, t, n);
	}
	reConstruct(e, t, n) {
		this.boundingBox.reConstruct(e, t, n), this.boundingSphere.reConstruct(e, t, n);
	}
	get minimum() {
		return this.boundingBox.minimum;
	}
	get maximum() {
		return this.boundingBox.maximum;
	}
	get isLocked() {
		return this._isLocked;
	}
	set isLocked(e) {
		this._isLocked = e;
	}
	update(e) {
		this._isLocked || (this.boundingBox._update(e), this.boundingSphere._update(e));
	}
	centerOn(t, n) {
		let r = e._TmpVector3[0].copyFrom(t).subtractInPlace(n), i = e._TmpVector3[1].copyFrom(t).addInPlace(n);
		return this.boundingBox.reConstruct(r, i, this.boundingBox.getWorldMatrix()), this.boundingSphere.reConstruct(r, i, this.boundingBox.getWorldMatrix()), this;
	}
	encapsulate(e) {
		let t = h.Minimize(this.minimum, e), n = h.Maximize(this.maximum, e);
		return this.reConstruct(t, n, this.boundingBox.getWorldMatrix()), this;
	}
	encapsulateBoundingInfo(e) {
		let t = x.Matrix[0];
		this.boundingBox.getWorldMatrix().invertToRef(t);
		let n = x.Vector3[0];
		return h.TransformCoordinatesToRef(e.boundingBox.minimumWorld, t, n), this.encapsulate(n), h.TransformCoordinatesToRef(e.boundingBox.maximumWorld, t, n), this.encapsulate(n), this;
	}
	scale(e) {
		return this.boundingBox.scale(e), this.boundingSphere.scale(e), this;
	}
	isInFrustum(e, t = 0) {
		return (t === 2 || t === 3) && this.boundingSphere.isCenterInFrustum(e) ? !0 : this.boundingSphere.isInFrustum(e) ? t === 1 || t === 3 || this.boundingBox.isInFrustum(e) : !1;
	}
	get diagonalLength() {
		let t = this.boundingBox;
		return t.maximumWorld.subtractToRef(t.minimumWorld, e._TmpVector3[0]).length();
	}
	isCompletelyInFrustum(e) {
		return this.boundingBox.isCompletelyInFrustum(e);
	}
	_checkCollision(e) {
		return e._canDoCollision(this.boundingSphere.centerWorld, this.boundingSphere.radiusWorld, this.boundingBox.minimumWorld, this.boundingBox.maximumWorld);
	}
	intersectsPoint(e) {
		return !(!this.boundingSphere.centerWorld || !this.boundingSphere.intersectsPoint(e) || !this.boundingBox.intersectsPoint(e));
	}
	intersects(e, t) {
		if (!Ve.Intersects(this.boundingSphere, e.boundingSphere) || !Be.Intersects(this.boundingBox, e.boundingBox)) return !1;
		if (!t) return !0;
		let n = this.boundingBox, r = e.boundingBox;
		return !(!z(n.directions[0], n, r) || !z(n.directions[1], n, r) || !z(n.directions[2], n, r) || !z(r.directions[0], n, r) || !z(r.directions[1], n, r) || !z(r.directions[2], n, r) || !z(h.Cross(n.directions[0], r.directions[0]), n, r) || !z(h.Cross(n.directions[0], r.directions[1]), n, r) || !z(h.Cross(n.directions[0], r.directions[2]), n, r) || !z(h.Cross(n.directions[1], r.directions[0]), n, r) || !z(h.Cross(n.directions[1], r.directions[1]), n, r) || !z(h.Cross(n.directions[1], r.directions[2]), n, r) || !z(h.Cross(n.directions[2], r.directions[0]), n, r) || !z(h.Cross(n.directions[2], r.directions[1]), n, r) || !z(h.Cross(n.directions[2], r.directions[2]), n, r));
	}
};
Ge._TmpVector3 = v(2, h.Zero);
//#endregion
//#region node_modules/@babylonjs/core/Maths/math.functions.js
var Ke = class {
	static extractMinAndMaxIndexed(e, t, n, r, i, a) {
		for (let o = n; o < n + r; o++) {
			let n = t[o] * 3, r = e[n], s = e[n + 1], c = e[n + 2];
			i.minimizeInPlaceFromFloats(r, s, c), a.maximizeInPlaceFromFloats(r, s, c);
		}
	}
	static extractMinAndMax(e, t, n, r, i, a) {
		for (let o = t, s = t * r; o < t + n; o++, s += r) {
			let t = e[s], n = e[s + 1], r = e[s + 2];
			i.minimizeInPlaceFromFloats(t, n, r), a.maximizeInPlaceFromFloats(t, n, r);
		}
	}
};
M([me.filter((...[e, t]) => !Array.isArray(e) && !Array.isArray(t))], Ke, "extractMinAndMaxIndexed", null), M([me.filter((...[e]) => !Array.isArray(e))], Ke, "extractMinAndMax", null);
function qe(e, t, n, r, i = null) {
	let a = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), o = new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	return Ke.extractMinAndMaxIndexed(e, t, n, r, a, o), i && (a.x -= a.x * i.x + i.y, a.y -= a.y * i.x + i.y, a.z -= a.z * i.x + i.y, o.x += o.x * i.x + i.y, o.y += o.y * i.x + i.y, o.z += o.z * i.x + i.y), {
		minimum: a,
		maximum: o
	};
}
function Je(e, t, n, r = null, i) {
	let a = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), o = new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	return i ||= 3, Ke.extractMinAndMax(e, t, n, i, a, o), r && (a.x -= a.x * r.x + r.y, a.y -= a.y * r.x + r.y, a.z -= a.z * r.x + r.y, o.x += o.x * r.x + r.y, o.y += o.y * r.x + r.y, o.z += o.z * r.x + r.y), {
		minimum: a,
		maximum: o
	};
}
//#endregion
//#region node_modules/@babylonjs/core/Meshes/subMesh.js
var Ye = class e {
	get materialDefines() {
		let e = this._mainDrawWrapperOverride ? this._mainDrawWrapperOverride.defines : this._getDrawWrapper()?.defines;
		return typeof e == "string" ? null : e;
	}
	set materialDefines(e) {
		let t = this._mainDrawWrapperOverride ?? this._getDrawWrapper(void 0, !0);
		t.defines = e;
	}
	_getDrawWrapper(e, t = !1) {
		e ??= this._engine.currentRenderPassId;
		let n = this._drawWrappers[e];
		return !n && t && (this._drawWrappers[e] = n = new ce(this._mesh.getScene().getEngine())), n;
	}
	_removeDrawWrapper(e, t = !0, n = !1) {
		t && this._drawWrappers[e]?.dispose(n), this._drawWrappers[e] = void 0;
	}
	get effect() {
		return this._mainDrawWrapperOverride ? this._mainDrawWrapperOverride.effect : this._getDrawWrapper()?.effect ?? null;
	}
	get _drawWrapper() {
		return this._mainDrawWrapperOverride ?? this._getDrawWrapper(void 0, !0);
	}
	get _drawWrapperOverride() {
		return this._mainDrawWrapperOverride;
	}
	_setMainDrawWrapperOverride(e) {
		this._mainDrawWrapperOverride = e;
	}
	setEffect(e, t = null, n, r = !0) {
		let i = this._drawWrapper;
		i.setEffect(e, t, r), n !== void 0 && (i.materialContext = n), e || (i.defines = null, i.materialContext = void 0);
	}
	resetDrawCache(e, t = !1) {
		if (this._drawWrappers) {
			if (e !== void 0) {
				this._removeDrawWrapper(e, !0, t);
				return;
			}
			for (let e of this._drawWrappers) e?.dispose(t);
		}
		this._drawWrappers = [];
	}
	static AddToMesh(t, n, r, i, a, o, s, c = !0) {
		return new e(t, n, r, i, a, o, s, c);
	}
	constructor(e, t, n, r, i, a, o, s = !0, c = !0) {
		this.materialIndex = e, this.verticesStart = t, this.verticesCount = n, this.indexStart = r, this.indexCount = i, this._mainDrawWrapperOverride = null, this._linesIndexCount = 0, this._linesIndexBuffer = null, this._lastColliderWorldVertices = null, this._lastColliderTransformMatrix = null, this._wasDispatched = !1, this._renderId = 0, this._alphaIndex = 0, this._distanceToCamera = 0, this._currentMaterial = null, this._mesh = a, this._renderingMesh = o || a, c && a.subMeshes.push(this), this._engine = this._mesh.getScene().getEngine(), this.resetDrawCache(), this._trianglePlanes = [], this._id = a.subMeshes.length - 1, s && (this.refreshBoundingInfo(), a.computeWorldMatrix(!0));
	}
	get IsGlobal() {
		return this.verticesStart === 0 && this.verticesCount === this._mesh.getTotalVertices() && this.indexStart === 0 && this.indexCount === this._mesh.getTotalIndices();
	}
	getBoundingInfo() {
		return this.IsGlobal || this._mesh.hasThinInstances ? this._mesh.getBoundingInfo() : this._boundingInfo;
	}
	setBoundingInfo(e) {
		return this._boundingInfo = e, this;
	}
	getMesh() {
		return this._mesh;
	}
	getRenderingMesh() {
		return this._renderingMesh;
	}
	getReplacementMesh() {
		return this._mesh._internalAbstractMeshDataInfo._actAsRegularMesh ? this._mesh : null;
	}
	getEffectiveMesh() {
		return (this._mesh._internalAbstractMeshDataInfo._actAsRegularMesh ? this._mesh : null) || this._renderingMesh;
	}
	getMaterial(e = !0) {
		let t = this._renderingMesh.getMaterialForRenderPass(this._engine.currentRenderPassId) ?? this._renderingMesh.material;
		if (!t) return e && this._mesh.getScene()._hasDefaultMaterial ? this._mesh.getScene().defaultMaterial : null;
		if (this._isMultiMaterial(t)) {
			let e = t.getSubMaterial(this.materialIndex);
			return this._currentMaterial !== e && (this._currentMaterial = e, this.resetDrawCache()), e;
		}
		return t;
	}
	_isMultiMaterial(e) {
		return e.getSubMaterial !== void 0;
	}
	refreshBoundingInfo(e = null) {
		if (this._lastColliderWorldVertices = null, this.IsGlobal || !this._renderingMesh || !this._renderingMesh.geometry) return this;
		if (e ||= this._renderingMesh.getVerticesData(j.PositionKind), !e) return this._boundingInfo = this._mesh.getBoundingInfo(), this;
		let t = this._renderingMesh.getIndices(), n;
		if (this.indexStart === 0 && this.indexCount === t.length) {
			let e = this._renderingMesh.getBoundingInfo();
			n = {
				minimum: e.minimum.clone(),
				maximum: e.maximum.clone()
			};
		} else n = qe(e, t, this.indexStart, this.indexCount, this._renderingMesh.geometry.boundingBias);
		return this._boundingInfo ? this._boundingInfo.reConstruct(n.minimum, n.maximum) : this._boundingInfo = new Ge(n.minimum, n.maximum), this;
	}
	_checkCollision(e) {
		return this.getBoundingInfo()._checkCollision(e);
	}
	updateBoundingInfo(e) {
		let t = this.getBoundingInfo();
		return t ||= (this.refreshBoundingInfo(), this.getBoundingInfo()), t && t.update(e), this;
	}
	isInFrustum(e) {
		let t = this.getBoundingInfo();
		return t ? t.isInFrustum(e, this._mesh.cullingStrategy) : !1;
	}
	isCompletelyInFrustum(e) {
		let t = this.getBoundingInfo();
		return t ? t.isCompletelyInFrustum(e) : !1;
	}
	render(e) {
		return this._renderingMesh.render(this, e, this._mesh._internalAbstractMeshDataInfo._actAsRegularMesh ? this._mesh : void 0), this;
	}
	_getLinesIndexBuffer(e, t) {
		if (!this._linesIndexBuffer) {
			let n = Math.floor(this.indexCount / 3) * 6, r = this.verticesStart + this.verticesCount > 65535 ? new Uint32Array(n) : new Uint16Array(n), i = 0;
			if (e.length === 0) for (let e = this.indexStart; e < this.indexStart + this.indexCount; e += 3) r[i++] = e, r[i++] = e + 1, r[i++] = e + 1, r[i++] = e + 2, r[i++] = e + 2, r[i++] = e;
			else for (let t = this.indexStart; t < this.indexStart + this.indexCount; t += 3) r[i++] = e[t], r[i++] = e[t + 1], r[i++] = e[t + 1], r[i++] = e[t + 2], r[i++] = e[t + 2], r[i++] = e[t];
			this._linesIndexBuffer = t.createIndexBuffer(r), this._linesIndexCount = r.length;
		}
		return this._linesIndexBuffer;
	}
	canIntersects(e) {
		let t = this.getBoundingInfo();
		return t ? e.intersectsBox(t.boundingBox) : !1;
	}
	intersects(e, t, n, r, i) {
		let a = this.getMaterial();
		if (!a) return null;
		let o = 3, s = !1;
		switch (a.fillMode) {
			case 3:
			case 5:
			case 6:
			case 8: return null;
			case 7: o = 1, s = !0;
		}
		return a.fillMode === 4 ? n.length ? this._intersectLines(e, t, n, this._mesh.intersectionThreshold, r) : this._intersectUnIndexedLines(e, t, n, this._mesh.intersectionThreshold, r) : !n.length && this._mesh._unIndexed ? this._intersectUnIndexedTriangles(e, t, n, r, i) : this._intersectTriangles(e, t, n, o, s, r, i);
	}
	_intersectLines(e, t, n, r, i) {
		let a = null;
		for (let o = this.indexStart; o < this.indexStart + this.indexCount; o += 2) {
			let s = t[n[o]], c = t[n[o + 1]], l = e.intersectionSegment(s, c, r);
			if (!(l < 0) && (i || !a || l < a.distance) && (a = new ze(null, null, l), a.faceId = o / 2, i)) break;
		}
		return a;
	}
	_intersectUnIndexedLines(e, t, n, r, i) {
		let a = null;
		for (let n = this.verticesStart; n < this.verticesStart + this.verticesCount; n += 2) {
			let o = t[n], s = t[n + 1], c = e.intersectionSegment(o, s, r);
			if (!(c < 0) && (i || !a || c < a.distance) && (a = new ze(null, null, c), a.faceId = n / 2, i)) break;
		}
		return a;
	}
	_intersectTriangles(e, t, n, r, i, a, o) {
		let s = null, c = -1;
		for (let l = this.indexStart; l < this.indexStart + this.indexCount - (3 - r); l += r) {
			c++;
			let r = n[l], u = n[l + 1], d = n[l + 2];
			if (i && d === 4294967295) {
				l += 2;
				continue;
			}
			let f = t[r], p = t[u], m = t[d];
			if (!f || !p || !m || o && !o(f, p, m, e, r, u, d)) continue;
			let h = e.intersectsTriangle(f, p, m);
			if (h) {
				if (h.distance < 0) continue;
				if ((a || !s || h.distance < s.distance) && (s = h, s.faceId = c, a)) break;
			}
		}
		return s;
	}
	_intersectUnIndexedTriangles(e, t, n, r, i) {
		let a = null;
		for (let n = this.verticesStart; n < this.verticesStart + this.verticesCount; n += 3) {
			let o = t[n], s = t[n + 1], c = t[n + 2];
			if (i && !i(o, s, c, e, -1, -1, -1)) continue;
			let l = e.intersectsTriangle(o, s, c);
			if (l) {
				if (l.distance < 0) continue;
				if ((r || !a || l.distance < a.distance) && (a = l, a.faceId = n / 3, r)) break;
			}
		}
		return a;
	}
	_rebuild() {
		this._linesIndexBuffer &&= null;
	}
	clone(t, n) {
		let r = new e(this.materialIndex, this.verticesStart, this.verticesCount, this.indexStart, this.indexCount, t, n, !1);
		if (!this.IsGlobal) {
			let e = this.getBoundingInfo();
			if (!e) return r;
			r._boundingInfo = new Ge(e.minimum, e.maximum);
		}
		return r;
	}
	dispose(e = !1) {
		this._linesIndexBuffer &&= (this._mesh.getScene().getEngine()._releaseBuffer(this._linesIndexBuffer), null);
		let t = this._mesh.subMeshes.indexOf(this);
		this._mesh.subMeshes.splice(t, 1), this.resetDrawCache(void 0, e);
	}
	getClassName() {
		return "SubMesh";
	}
	static CreateFromIndices(t, n, r, i, a, o = !0) {
		let s = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = (a || i).getIndices();
		for (let e = n; e < n + r; e++) {
			let t = l[e];
			t < s && (s = t), t > c && (c = t);
		}
		return new e(t, s, c - s + 1, n, r, i, a, o);
	}
}, Xe = class {}, B = class e {
	constructor() {
		this.uniqueId = 0, this.metadata = {}, this._applyTo = Re(this._applyToCoroutine.bind(this)), this.uniqueId = e._UniqueIdGenerator, e._UniqueIdGenerator++;
	}
	set(e, t) {
		switch (e.length || s.Warn(`Setting vertex data kind '${t}' with an empty array`), t) {
			case j.PositionKind:
				this.positions = e;
				break;
			case j.NormalKind:
				this.normals = e;
				break;
			case j.TangentKind:
				this.tangents = e;
				break;
			case j.UVKind:
				this.uvs = e;
				break;
			case j.UV2Kind:
				this.uvs2 = e;
				break;
			case j.UV3Kind:
				this.uvs3 = e;
				break;
			case j.UV4Kind:
				this.uvs4 = e;
				break;
			case j.UV5Kind:
				this.uvs5 = e;
				break;
			case j.UV6Kind:
				this.uvs6 = e;
				break;
			case j.ColorKind:
				this.colors = e;
				break;
			case j.MatricesIndicesKind:
				this.matricesIndices = e;
				break;
			case j.MatricesWeightsKind:
				this.matricesWeights = e;
				break;
			case j.MatricesIndicesExtraKind:
				this.matricesIndicesExtra = e;
				break;
			case j.MatricesWeightsExtraKind: this.matricesWeightsExtra = e;
		}
	}
	applyToMesh(e, t) {
		return this._applyTo(e, t, !1), this;
	}
	applyToGeometry(e, t) {
		return this._applyTo(e, t, !1), this;
	}
	updateMesh(e) {
		return this._update(e), this;
	}
	updateGeometry(e) {
		return this._update(e), this;
	}
	*_applyToCoroutine(e, t = !1, n) {
		if (this.positions && (e.setVerticesData(j.PositionKind, this.positions, t), n && (yield)), this.normals && (e.setVerticesData(j.NormalKind, this.normals, t), n && (yield)), this.tangents && (e.setVerticesData(j.TangentKind, this.tangents, t), n && (yield)), this.uvs && (e.setVerticesData(j.UVKind, this.uvs, t), n && (yield)), this.uvs2 && (e.setVerticesData(j.UV2Kind, this.uvs2, t), n && (yield)), this.uvs3 && (e.setVerticesData(j.UV3Kind, this.uvs3, t), n && (yield)), this.uvs4 && (e.setVerticesData(j.UV4Kind, this.uvs4, t), n && (yield)), this.uvs5 && (e.setVerticesData(j.UV5Kind, this.uvs5, t), n && (yield)), this.uvs6 && (e.setVerticesData(j.UV6Kind, this.uvs6, t), n && (yield)), this.colors) {
			let r = this.positions && this.colors.length === this.positions.length ? 3 : 4;
			e.setVerticesData(j.ColorKind, this.colors, t, r), this.hasVertexAlpha && e.hasVertexAlpha !== void 0 && (e.hasVertexAlpha = !0), n && (yield);
		}
		if (this.matricesIndices && (e.setVerticesData(j.MatricesIndicesKind, this.matricesIndices, t), n && (yield)), this.matricesWeights && (e.setVerticesData(j.MatricesWeightsKind, this.matricesWeights, t), n && (yield)), this.matricesIndicesExtra && (e.setVerticesData(j.MatricesIndicesExtraKind, this.matricesIndicesExtra, t), n && (yield)), this.matricesWeightsExtra && (e.setVerticesData(j.MatricesWeightsExtraKind, this.matricesWeightsExtra, t), n && (yield)), this.indices ? (e.setIndices(this.indices, null, t), n && (yield)) : e.setIndices([], null), e.subMeshes && this.materialInfos && this.materialInfos.length > 1) {
			let t = e;
			t.subMeshes = [];
			for (let e of this.materialInfos) new Ye(e.materialIndex, e.verticesStart, e.verticesCount, e.indexStart, e.indexCount, t);
		}
		return this;
	}
	_update(e, t, n) {
		return this.positions && e.updateVerticesData(j.PositionKind, this.positions, t, n), this.normals && e.updateVerticesData(j.NormalKind, this.normals, t, n), this.tangents && e.updateVerticesData(j.TangentKind, this.tangents, t, n), this.uvs && e.updateVerticesData(j.UVKind, this.uvs, t, n), this.uvs2 && e.updateVerticesData(j.UV2Kind, this.uvs2, t, n), this.uvs3 && e.updateVerticesData(j.UV3Kind, this.uvs3, t, n), this.uvs4 && e.updateVerticesData(j.UV4Kind, this.uvs4, t, n), this.uvs5 && e.updateVerticesData(j.UV5Kind, this.uvs5, t, n), this.uvs6 && e.updateVerticesData(j.UV6Kind, this.uvs6, t, n), this.colors && e.updateVerticesData(j.ColorKind, this.colors, t, n), this.matricesIndices && e.updateVerticesData(j.MatricesIndicesKind, this.matricesIndices, t, n), this.matricesWeights && e.updateVerticesData(j.MatricesWeightsKind, this.matricesWeights, t, n), this.matricesIndicesExtra && e.updateVerticesData(j.MatricesIndicesExtraKind, this.matricesIndicesExtra, t, n), this.matricesWeightsExtra && e.updateVerticesData(j.MatricesWeightsExtraKind, this.matricesWeightsExtra, t, n), this.indices && e.setIndices(this.indices, null), this;
	}
	static _TransformVector3Coordinates(e, t, n = 0, r = e.length) {
		let i = x.Vector3[0], a = x.Vector3[1];
		for (let o = n; o < n + r; o += 3) h.FromArrayToRef(e, o, i), h.TransformCoordinatesToRef(i, t, a), e[o] = a.x, e[o + 1] = a.y, e[o + 2] = a.z;
	}
	static _TransformVector3Normals(e, t, n = 0, r = e.length) {
		let i = x.Vector3[0], a = x.Vector3[1];
		for (let o = n; o < n + r; o += 3) h.FromArrayToRef(e, o, i), h.TransformNormalToRef(i, t, a), e[o] = a.x, e[o + 1] = a.y, e[o + 2] = a.z;
	}
	static _TransformVector4Normals(e, t, n = 0, r = e.length) {
		let i = x.Vector4[0], a = x.Vector4[1];
		for (let o = n; o < n + r; o += 4) b.FromArrayToRef(e, o, i), b.TransformNormalToRef(i, t, a), e[o] = a.x, e[o + 1] = a.y, e[o + 2] = a.z, e[o + 3] = a.w;
	}
	static _FlipFaces(e, t = 0, n = e.length) {
		for (let r = t; r < t + n; r += 3) {
			let t = e[r + 1];
			e[r + 1] = e[r + 2], e[r + 2] = t;
		}
	}
	transform(t) {
		let n = t.determinant() < 0;
		return this.positions && e._TransformVector3Coordinates(this.positions, t), this.normals && e._TransformVector3Normals(this.normals, t), this.tangents && e._TransformVector4Normals(this.tangents, t), n && this.indices && e._FlipFaces(this.indices), this;
	}
	splitBasedOnMaterialID() {
		if (!this.materialInfos || this.materialInfos.length < 2) return [this];
		let t = [];
		for (let n of this.materialInfos) {
			let r = new e();
			if (this.positions && (r.positions = this.positions.slice(n.verticesStart * 3, (n.verticesCount + n.verticesStart) * 3)), this.normals && (r.normals = this.normals.slice(n.verticesStart * 3, (n.verticesCount + n.verticesStart) * 3)), this.tangents && (r.tangents = this.tangents.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.colors && (r.colors = this.colors.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.uvs && (r.uvs = this.uvs.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.uvs2 && (r.uvs2 = this.uvs2.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.uvs3 && (r.uvs3 = this.uvs3.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.uvs4 && (r.uvs4 = this.uvs4.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.uvs5 && (r.uvs5 = this.uvs5.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.uvs6 && (r.uvs6 = this.uvs6.slice(n.verticesStart * 2, (n.verticesCount + n.verticesStart) * 2)), this.matricesIndices && (r.matricesIndices = this.matricesIndices.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.matricesIndicesExtra && (r.matricesIndicesExtra = this.matricesIndicesExtra.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.matricesWeights && (r.matricesWeights = this.matricesWeights.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.matricesWeightsExtra && (r.matricesWeightsExtra = this.matricesWeightsExtra.slice(n.verticesStart * 4, (n.verticesCount + n.verticesStart) * 4)), this.indices) {
				r.indices = [];
				for (let e = n.indexStart; e < n.indexStart + n.indexCount; e++) r.indices.push(this.indices[e] - n.verticesStart);
			}
			let i = new Xe();
			i.indexStart = 0, i.indexCount = r.indices ? r.indices.length : 0, i.materialIndex = n.materialIndex, i.verticesStart = 0, i.verticesCount = (r.positions ? r.positions.length : 0) / 3, r.materialInfos = [i], t.push(r);
		}
		return t;
	}
	merge(e, t = !1, n = !1, r = !1, i = !1) {
		let a = Array.isArray(e) ? e.map((e) => ({ vertexData: e })) : [{ vertexData: e }];
		return Ie(this._mergeCoroutine(void 0, a, t, !1, n, r, i));
	}
	*_mergeCoroutine(t, n, r = !1, i, a, o = !1, s = !1) {
		this._validate();
		let c = n.map((e) => e.vertexData), l = this;
		if (s) for (let e of c) e && (e._validate(), !this.normals && e.normals && (this.normals = new Float32Array(this.positions.length)), !this.tangents && e.tangents && (this.tangents = new Float32Array(this.positions.length / 3 * 4)), !this.uvs && e.uvs && (this.uvs = new Float32Array(this.positions.length / 3 * 2)), !this.uvs2 && e.uvs2 && (this.uvs2 = new Float32Array(this.positions.length / 3 * 2)), !this.uvs3 && e.uvs3 && (this.uvs3 = new Float32Array(this.positions.length / 3 * 2)), !this.uvs4 && e.uvs4 && (this.uvs4 = new Float32Array(this.positions.length / 3 * 2)), !this.uvs5 && e.uvs5 && (this.uvs5 = new Float32Array(this.positions.length / 3 * 2)), !this.uvs6 && e.uvs6 && (this.uvs6 = new Float32Array(this.positions.length / 3 * 2)), !this.colors && e.colors && (this.colors = new Float32Array(this.positions.length / 3 * 4), this.colors.fill(1)), !this.matricesIndices && e.matricesIndices && (this.matricesIndices = new Float32Array(this.positions.length / 3 * 4)), !this.matricesWeights && e.matricesWeights && (this.matricesWeights = new Float32Array(this.positions.length / 3 * 4)), !this.matricesIndicesExtra && e.matricesIndicesExtra && (this.matricesIndicesExtra = new Float32Array(this.positions.length / 3 * 4)), !this.matricesWeightsExtra && e.matricesWeightsExtra && (this.matricesWeightsExtra = new Float32Array(this.positions.length / 3 * 4)));
		for (let e of c) if (e) {
			if (s) this.normals && !e.normals && (e.normals = new Float32Array(e.positions.length)), this.tangents && !e.tangents && (e.tangents = new Float32Array(e.positions.length / 3 * 4)), this.uvs && !e.uvs && (e.uvs = new Float32Array(e.positions.length / 3 * 2)), this.uvs2 && !e.uvs2 && (e.uvs2 = new Float32Array(e.positions.length / 3 * 2)), this.uvs3 && !e.uvs3 && (e.uvs3 = new Float32Array(e.positions.length / 3 * 2)), this.uvs4 && !e.uvs4 && (e.uvs4 = new Float32Array(e.positions.length / 3 * 2)), this.uvs5 && !e.uvs5 && (e.uvs5 = new Float32Array(e.positions.length / 3 * 2)), this.uvs6 && !e.uvs6 && (e.uvs6 = new Float32Array(e.positions.length / 3 * 2)), this.colors && !e.colors && (e.colors = new Float32Array(e.positions.length / 3 * 4), e.colors.fill(1)), this.matricesIndices && !e.matricesIndices && (e.matricesIndices = new Float32Array(e.positions.length / 3 * 4)), this.matricesWeights && !e.matricesWeights && (e.matricesWeights = new Float32Array(e.positions.length / 3 * 4)), this.matricesIndicesExtra && !e.matricesIndicesExtra && (e.matricesIndicesExtra = new Float32Array(e.positions.length / 3 * 4)), this.matricesWeightsExtra && !e.matricesWeightsExtra && (e.matricesWeightsExtra = new Float32Array(e.positions.length / 3 * 4));
			else if (e._validate(), !this.normals != !e.normals || !this.tangents != !e.tangents || !this.uvs != !e.uvs || !this.uvs2 != !e.uvs2 || !this.uvs3 != !e.uvs3 || !this.uvs4 != !e.uvs4 || !this.uvs5 != !e.uvs5 || !this.uvs6 != !e.uvs6 || !this.colors != !e.colors || !this.matricesIndices != !e.matricesIndices || !this.matricesWeights != !e.matricesWeights || !this.matricesIndicesExtra != !e.matricesIndicesExtra || !this.matricesWeightsExtra != !e.matricesWeightsExtra) throw Error("Cannot merge vertex data that do not have the same set of attributes");
		}
		if (o) {
			let e, r = 0, i = 0, a = [], o = null, s = [];
			for (let e of this.splitBasedOnMaterialID()) s.push({
				vertexData: e,
				transform: t
			});
			for (let e of n) if (e.vertexData) for (let t of e.vertexData.splitBasedOnMaterialID()) s.push({
				vertexData: t,
				transform: e.transform
			});
			s.sort((e, t) => {
				let n = e.vertexData.materialInfos ? e.vertexData.materialInfos[0].materialIndex : 0, r = t.vertexData.materialInfos ? t.vertexData.materialInfos[0].materialIndex : 0;
				return n > r ? 1 : n === r ? 0 : -1;
			});
			for (let t of s) {
				let n = t.vertexData;
				if (e = n.materialInfos ? n.materialInfos[0].materialIndex : 0, o && o.materialIndex === e) o.indexCount += n.indices.length, o.verticesCount += n.positions.length / 3;
				else {
					let t = new Xe();
					t.materialIndex = e, t.indexStart = r, t.indexCount = n.indices.length, t.verticesStart = i, t.verticesCount = n.positions.length / 3, a.push(t), o = t;
				}
				r += n.indices.length, i += n.positions.length / 3;
			}
			let u = s.splice(0, 1)[0];
			l = u.vertexData, t = u.transform, c = s.map((e) => e.vertexData), n = s, this.materialInfos = a;
		}
		let u = c.reduce((e, t) => e + (t.indices?.length ?? 0), l.indices?.length ?? 0), d = a || c.some((e) => e.indices === l.indices) ? l.indices?.slice() : l.indices;
		if (u > 0) {
			let a = d?.length ?? 0;
			if (d ||= Array(u), d.length !== u) {
				if (Array.isArray(d)) d.length = u;
				else {
					let e = r || d instanceof Uint32Array ? new Uint32Array(u) : new Uint16Array(u);
					e.set(d), d = e;
				}
				t && t.determinant() < 0 && e._FlipFaces(d, 0, a);
			}
			let o = l.positions ? l.positions.length / 3 : 0;
			for (let { vertexData: t, transform: r } of n) if (t.indices) {
				for (let e = 0; e < t.indices.length; e++) d[a + e] = t.indices[e] + o;
				r && r.determinant() < 0 && e._FlipFaces(d, a, t.indices.length), o += t.positions.length / 3, a += t.indices.length, i && (yield);
			}
		}
		return this.indices = d, this.positions = e._MergeElement(j.PositionKind, l.positions, t, n.map((e) => [e.vertexData.positions, e.transform])), i && (yield), l.normals && (this.normals = e._MergeElement(j.NormalKind, l.normals, t, n.map((e) => [e.vertexData.normals, e.transform])), i && (yield)), l.tangents && (this.tangents = e._MergeElement(j.TangentKind, l.tangents, t, n.map((e) => [e.vertexData.tangents, e.transform])), i && (yield)), l.uvs && (this.uvs = e._MergeElement(j.UVKind, l.uvs, t, n.map((e) => [e.vertexData.uvs, e.transform])), i && (yield)), l.uvs2 && (this.uvs2 = e._MergeElement(j.UV2Kind, l.uvs2, t, n.map((e) => [e.vertexData.uvs2, e.transform])), i && (yield)), l.uvs3 && (this.uvs3 = e._MergeElement(j.UV3Kind, l.uvs3, t, n.map((e) => [e.vertexData.uvs3, e.transform])), i && (yield)), l.uvs4 && (this.uvs4 = e._MergeElement(j.UV4Kind, l.uvs4, t, n.map((e) => [e.vertexData.uvs4, e.transform])), i && (yield)), l.uvs5 && (this.uvs5 = e._MergeElement(j.UV5Kind, l.uvs5, t, n.map((e) => [e.vertexData.uvs5, e.transform])), i && (yield)), l.uvs6 && (this.uvs6 = e._MergeElement(j.UV6Kind, l.uvs6, t, n.map((e) => [e.vertexData.uvs6, e.transform])), i && (yield)), l.colors && (this.colors = e._MergeElement(j.ColorKind, l.colors, t, n.map((e) => [e.vertexData.colors, e.transform])), (l.hasVertexAlpha !== void 0 || n.some((e) => e.vertexData.hasVertexAlpha !== void 0)) && (this.hasVertexAlpha = l.hasVertexAlpha || n.some((e) => e.vertexData.hasVertexAlpha)), i && (yield)), l.matricesIndices && (this.matricesIndices = e._MergeElement(j.MatricesIndicesKind, l.matricesIndices, t, n.map((e) => [e.vertexData.matricesIndices, e.transform])), i && (yield)), l.matricesWeights && (this.matricesWeights = e._MergeElement(j.MatricesWeightsKind, l.matricesWeights, t, n.map((e) => [e.vertexData.matricesWeights, e.transform])), i && (yield)), l.matricesIndicesExtra && (this.matricesIndicesExtra = e._MergeElement(j.MatricesIndicesExtraKind, l.matricesIndicesExtra, t, n.map((e) => [e.vertexData.matricesIndicesExtra, e.transform])), i && (yield)), l.matricesWeightsExtra && (this.matricesWeightsExtra = e._MergeElement(j.MatricesWeightsExtraKind, l.matricesWeightsExtra, t, n.map((e) => [e.vertexData.matricesWeightsExtra, e.transform]))), this;
	}
	static _MergeElement(t, n, r, i) {
		let a = i.filter((e) => e[0] !== null && e[0] !== void 0);
		if (!n && a.length == 0) return n;
		if (!n) return this._MergeElement(t, a[0][0], a[0][1], a.slice(1));
		let o = a.reduce((e, t) => e + t[0].length, n.length), s = t === j.PositionKind ? e._TransformVector3Coordinates : t === j.NormalKind ? e._TransformVector3Normals : t === j.TangentKind ? e._TransformVector4Normals : () => {};
		if (n instanceof Float32Array) {
			let e = new Float32Array(o);
			e.set(n), r && s(e, r, 0, n.length);
			let t = n.length;
			for (let [n, r] of a) e.set(n, t), r && s(e, r, t, n.length), t += n.length;
			return e;
		}
		{
			let e = Array(o);
			for (let t = 0; t < n.length; t++) e[t] = n[t];
			r && s(e, r, 0, n.length);
			let t = n.length;
			for (let [n, r] of a) {
				for (let r = 0; r < n.length; r++) e[t + r] = n[r];
				r && s(e, r, t, n.length), t += n.length;
			}
			return e;
		}
	}
	_validate() {
		if (!this.positions) throw new ve("Positions are required", ye.MeshInvalidPositionsError);
		let e = (e, t) => {
			let n = j.DeduceStride(e);
			if (t.length % n !== 0) throw Error("The " + e + "s array count must be a multiple of " + n);
			return t.length / n;
		}, t = e(j.PositionKind, this.positions), n = (n, r) => {
			let i = e(n, r);
			if (i !== t) throw Error("The " + n + "s element count (" + i + ") does not match the positions count (" + t + ")");
		};
		this.normals && n(j.NormalKind, this.normals), this.tangents && n(j.TangentKind, this.tangents), this.uvs && n(j.UVKind, this.uvs), this.uvs2 && n(j.UV2Kind, this.uvs2), this.uvs3 && n(j.UV3Kind, this.uvs3), this.uvs4 && n(j.UV4Kind, this.uvs4), this.uvs5 && n(j.UV5Kind, this.uvs5), this.uvs6 && n(j.UV6Kind, this.uvs6), this.colors && n(j.ColorKind, this.colors), this.matricesIndices && n(j.MatricesIndicesKind, this.matricesIndices), this.matricesWeights && n(j.MatricesWeightsKind, this.matricesWeights), this.matricesIndicesExtra && n(j.MatricesIndicesExtraKind, this.matricesIndicesExtra), this.matricesWeightsExtra && n(j.MatricesWeightsExtraKind, this.matricesWeightsExtra);
	}
	clone() {
		let t = this.serialize();
		return e.Parse(t);
	}
	serialize() {
		let e = {};
		if (this.positions && (e.positions = Array.from(this.positions)), this.normals && (e.normals = Array.from(this.normals)), this.tangents && (e.tangents = Array.from(this.tangents)), this.uvs && (e.uvs = Array.from(this.uvs)), this.uvs2 && (e.uvs2 = Array.from(this.uvs2)), this.uvs3 && (e.uvs3 = Array.from(this.uvs3)), this.uvs4 && (e.uvs4 = Array.from(this.uvs4)), this.uvs5 && (e.uvs5 = Array.from(this.uvs5)), this.uvs6 && (e.uvs6 = Array.from(this.uvs6)), this.colors && (e.colors = Array.from(this.colors), e.hasVertexAlpha = this.hasVertexAlpha), this.matricesIndices && (e.matricesIndices = Array.from(this.matricesIndices), e.matricesIndicesExpanded = !0), this.matricesWeights && (e.matricesWeights = Array.from(this.matricesWeights)), this.matricesIndicesExtra && (e.matricesIndicesExtra = Array.from(this.matricesIndicesExtra), e.matricesIndicesExtraExpanded = !0), this.matricesWeightsExtra && (e.matricesWeightsExtra = Array.from(this.matricesWeightsExtra)), e.indices = this.indices ? Array.from(this.indices) : [], this.materialInfos) {
			e.materialInfos = [];
			for (let t of this.materialInfos) {
				let n = {
					indexStart: t.indexStart,
					indexCount: t.indexCount,
					materialIndex: t.materialIndex,
					verticesStart: t.verticesStart,
					verticesCount: t.verticesCount
				};
				e.materialInfos.push(n);
			}
		}
		return e;
	}
	static ExtractFromMesh(t, n, r) {
		return e._ExtractFrom(t, n, r);
	}
	static ExtractFromGeometry(t, n, r) {
		return e._ExtractFrom(t, n, r);
	}
	static _ExtractFrom(t, n, r) {
		let i = new e();
		if (t.isVerticesDataPresent(j.PositionKind) && (i.positions = t.getVerticesData(j.PositionKind, n, r)), t.isVerticesDataPresent(j.NormalKind) && (i.normals = t.getVerticesData(j.NormalKind, n, r)), t.isVerticesDataPresent(j.TangentKind) && (i.tangents = t.getVerticesData(j.TangentKind, n, r)), t.isVerticesDataPresent(j.UVKind) && (i.uvs = t.getVerticesData(j.UVKind, n, r)), t.isVerticesDataPresent(j.UV2Kind) && (i.uvs2 = t.getVerticesData(j.UV2Kind, n, r)), t.isVerticesDataPresent(j.UV3Kind) && (i.uvs3 = t.getVerticesData(j.UV3Kind, n, r)), t.isVerticesDataPresent(j.UV4Kind) && (i.uvs4 = t.getVerticesData(j.UV4Kind, n, r)), t.isVerticesDataPresent(j.UV5Kind) && (i.uvs5 = t.getVerticesData(j.UV5Kind, n, r)), t.isVerticesDataPresent(j.UV6Kind) && (i.uvs6 = t.getVerticesData(j.UV6Kind, n, r)), t.isVerticesDataPresent(j.ColorKind)) {
			let e = t.geometry || t, a = e.getVertexBuffer(j.ColorKind), o = e.getVerticesData(j.ColorKind, n, r);
			if (a.getSize() === 3) {
				let e = new Float32Array(o.length * 4 / 3);
				for (let t = 0, n = 0; t < o.length; t += 3, n += 4) e[n] = o[t], e[n + 1] = o[t + 1], e[n + 2] = o[t + 2], e[n + 3] = 1;
				i.colors = e;
			} else if (a.getSize() === 4) i.colors = o;
			else throw Error(`Unexpected number of color components: ${a.getSize()}`);
		}
		return t.isVerticesDataPresent(j.MatricesIndicesKind) && (i.matricesIndices = t.getVerticesData(j.MatricesIndicesKind, n, r)), t.isVerticesDataPresent(j.MatricesWeightsKind) && (i.matricesWeights = t.getVerticesData(j.MatricesWeightsKind, n, r)), t.isVerticesDataPresent(j.MatricesIndicesExtraKind) && (i.matricesIndicesExtra = t.getVerticesData(j.MatricesIndicesExtraKind, n, r)), t.isVerticesDataPresent(j.MatricesWeightsExtraKind) && (i.matricesWeightsExtra = t.getVerticesData(j.MatricesWeightsExtraKind, n, r)), i.indices = t.getIndices(n, r), i;
	}
	static CreateRibbon(e) {
		throw n("ribbonBuilder");
	}
	static CreateBox(e) {
		throw n("boxBuilder");
	}
	static CreateTiledBox(e) {
		throw n("tiledBoxBuilder");
	}
	static CreateTiledPlane(e) {
		throw n("tiledPlaneBuilder");
	}
	static CreateSphere(e) {
		throw n("sphereBuilder");
	}
	static CreateCylinder(e) {
		throw n("cylinderBuilder");
	}
	static CreateTorus(e) {
		throw n("torusBuilder");
	}
	static CreateLineSystem(e) {
		throw n("linesBuilder");
	}
	static CreateDashedLines(e) {
		throw n("linesBuilder");
	}
	static CreateGround(e) {
		throw n("groundBuilder");
	}
	static CreateTiledGround(e) {
		throw n("groundBuilder");
	}
	static CreateGroundFromHeightMap(e) {
		throw n("groundBuilder");
	}
	static CreatePlane(e) {
		throw n("planeBuilder");
	}
	static CreateDisc(e) {
		throw n("discBuilder");
	}
	static CreatePolygon(e, t, r, i, a, o, s) {
		throw n("polygonBuilder");
	}
	static CreateIcoSphere(e) {
		throw n("icoSphereBuilder");
	}
	static CreatePolyhedron(e) {
		throw n("polyhedronBuilder");
	}
	static CreateCapsule(e = {
		orientation: h.Up(),
		subdivisions: 2,
		tessellation: 16,
		height: 1,
		radius: .25,
		capSubdivisions: 6
	}) {
		throw n("capsuleBuilder");
	}
	static CreateTorusKnot(e) {
		throw n("torusKnotBuilder");
	}
	static ComputeNormals(e, t, n, r) {
		let i, a, o, s, c, l, u, d, f, p, m, g, _, v, y, b, x, S, C, ee, te = !1, ne = !1, w = !1, T = !1, E = 1, D = 0, O = null;
		r && (te = !!r.facetNormals, ne = !!r.facetPositions, w = !!r.facetPartitioning, E = r.useRightHandedSystem === !0 ? -1 : 1, D = r.ratio || 0, T = !!r.depthSort, O = r.distanceTo, T && O === void 0 && (O = h.Zero()));
		let k = 0, re = 0, ie = 0, A = 0;
		for (w && r && r.bbSize && (k = r.subDiv.X * D / r.bbSize.x, re = r.subDiv.Y * D / r.bbSize.y, ie = r.subDiv.Z * D / r.bbSize.z, A = r.subDiv.max * r.subDiv.max, r.facetPartitioning.length = 0), i = 0; i < e.length; i++) n[i] = 0;
		let ae = t.length / 3 | 0;
		for (i = 0; i < ae; i++) {
			if (g = t[i * 3] * 3, _ = g + 1, v = g + 2, y = t[i * 3 + 1] * 3, b = y + 1, x = y + 2, S = t[i * 3 + 2] * 3, C = S + 1, ee = S + 2, a = e[g] - e[y], o = e[_] - e[b], s = e[v] - e[x], c = e[S] - e[y], l = e[C] - e[b], u = e[ee] - e[x], d = E * (o * u - s * l), f = E * (s * c - a * u), p = E * (a * l - o * c), m = Math.sqrt(d * d + f * f + p * p), m = m === 0 ? 1 : m, d /= m, f /= m, p /= m, te && r && (r.facetNormals[i].x = d, r.facetNormals[i].y = f, r.facetNormals[i].z = p), ne && r && (r.facetPositions[i].x = (e[g] + e[y] + e[S]) / 3, r.facetPositions[i].y = (e[_] + e[b] + e[C]) / 3, r.facetPositions[i].z = (e[v] + e[x] + e[ee]) / 3), w && r) {
				let t = Math.floor((r.facetPositions[i].x - r.bInfo.minimum.x * D) * k), n = Math.floor((r.facetPositions[i].y - r.bInfo.minimum.y * D) * re), a = Math.floor((r.facetPositions[i].z - r.bInfo.minimum.z * D) * ie), o = Math.floor((e[g] - r.bInfo.minimum.x * D) * k), s = Math.floor((e[_] - r.bInfo.minimum.y * D) * re), c = Math.floor((e[v] - r.bInfo.minimum.z * D) * ie), l = Math.floor((e[y] - r.bInfo.minimum.x * D) * k), u = Math.floor((e[b] - r.bInfo.minimum.y * D) * re), d = Math.floor((e[x] - r.bInfo.minimum.z * D) * ie), f = Math.floor((e[S] - r.bInfo.minimum.x * D) * k), p = Math.floor((e[C] - r.bInfo.minimum.y * D) * re), m = Math.floor((e[ee] - r.bInfo.minimum.z * D) * ie), h = o + r.subDiv.max * s + A * c, te = l + r.subDiv.max * u + A * d, ne = f + r.subDiv.max * p + A * m, w = t + r.subDiv.max * n + A * a;
				r.facetPartitioning[w] = r.facetPartitioning[w] ? r.facetPartitioning[w] : [], r.facetPartitioning[h] = r.facetPartitioning[h] ? r.facetPartitioning[h] : [], r.facetPartitioning[te] = r.facetPartitioning[te] ? r.facetPartitioning[te] : [], r.facetPartitioning[ne] = r.facetPartitioning[ne] ? r.facetPartitioning[ne] : [], r.facetPartitioning[h].push(i), te != h && r.facetPartitioning[te].push(i), ne != te && ne != h && r.facetPartitioning[ne].push(i), w != h && w != te && w != ne && r.facetPartitioning[w].push(i);
			}
			if (T && r && r.facetPositions) {
				let e = r.depthSortedFacets[i];
				e.ind = i * 3, e.sqDistance = h.DistanceSquared(r.facetPositions[i], O);
			}
			n[g] += d, n[_] += f, n[v] += p, n[y] += d, n[b] += f, n[x] += p, n[S] += d, n[C] += f, n[ee] += p;
		}
		for (i = 0; i < n.length / 3; i++) d = n[i * 3], f = n[i * 3 + 1], p = n[i * 3 + 2], m = Math.sqrt(d * d + f * f + p * p), m = m === 0 ? 1 : m, d /= m, f /= m, p /= m, n[i * 3] = d, n[i * 3 + 1] = f, n[i * 3 + 2] = p;
	}
	static _ComputeSides(t, n, r, i, a, o, s) {
		let c = r.length, l = i.length, u, d;
		switch (t ||= e.DEFAULTSIDE, t) {
			case e.FRONTSIDE: break;
			case e.BACKSIDE:
				for (u = 0; u < c; u += 3) {
					let e = r[u];
					r[u] = r[u + 2], r[u + 2] = e;
				}
				for (d = 0; d < l; d++) i[d] = -i[d];
				break;
			case e.DOUBLESIDE: {
				let e = n.length, t = e / 3;
				for (let t = 0; t < e; t++) n[e + t] = n[t];
				for (u = 0; u < c; u += 3) r[u + c] = r[u + 2] + t, r[u + 1 + c] = r[u + 1] + t, r[u + 2 + c] = r[u] + t;
				for (d = 0; d < l; d++) i[l + d] = -i[d];
				let f = a.length, p;
				for (p = 0; p < f; p++) a[p + f] = a[p];
				for (o ||= new b(0, 0, 1, 1), s ||= new b(0, 0, 1, 1), p = 0, u = 0; u < f / 2; u++) a[p] = o.x + (o.z - o.x) * a[p], a[p + 1] = o.y + (o.w - o.y) * a[p + 1], a[p + f] = s.x + (s.z - s.x) * a[p + f], a[p + f + 1] = s.y + (s.w - s.y) * a[p + f + 1], p += 2;
				break;
			}
		}
	}
	static Parse(t) {
		let n = new e(), r = t.positions;
		r && n.set(r, j.PositionKind);
		let i = t.normals;
		i && n.set(i, j.NormalKind);
		let a = t.tangents;
		a && n.set(a, j.TangentKind);
		let o = t.uvs;
		o && n.set(o, j.UVKind);
		let s = t.uvs2;
		s && n.set(s, j.UV2Kind);
		let c = t.uvs3;
		c && n.set(c, j.UV3Kind);
		let l = t.uvs4;
		l && n.set(l, j.UV4Kind);
		let u = t.uvs5;
		u && n.set(u, j.UV5Kind);
		let d = t.uvs6;
		d && n.set(d, j.UV6Kind);
		let f = t.colors;
		f && (n.set(O.CheckColors4(f, r.length / 3), j.ColorKind), t.hasVertexAlpha !== void 0 && (n.hasVertexAlpha = t.hasVertexAlpha));
		let p = t.matricesIndices;
		p && n.set(p, j.MatricesIndicesKind);
		let m = t.matricesWeights;
		m && n.set(m, j.MatricesWeightsKind);
		let h = t.indices;
		h && (n.indices = h);
		let g = t.materialInfos;
		if (g) {
			n.materialInfos = [];
			for (let e of g) {
				let t = new Xe();
				t.indexCount = e.indexCount, t.indexStart = e.indexStart, t.verticesCount = e.verticesCount, t.verticesStart = e.verticesStart, t.materialIndex = e.materialIndex, n.materialInfos.push(t);
			}
		}
		return n;
	}
	static ImportVertexData(t, n) {
		let r = e.Parse(t);
		n.setAllVerticesData(r, t.updatable);
	}
};
B.FRONTSIDE = 0, B.BACKSIDE = 1, B.DOUBLESIDE = 2, B.DEFAULTSIDE = 0, B._UniqueIdGenerator = 0, M([me.filter((...[e]) => !Array.isArray(e))], B, "_TransformVector3Coordinates", null), M([me.filter((...[e]) => !Array.isArray(e))], B, "_TransformVector3Normals", null), M([me.filter((...[e]) => !Array.isArray(e))], B, "_TransformVector4Normals", null), M([me.filter((...[e]) => !Array.isArray(e))], B, "_FlipFaces", null);
//#endregion
//#region node_modules/@babylonjs/core/Loading/sceneLoaderFlags.js
var Ze = class e {
	static get ForceFullSceneLoadingForIncremental() {
		return e._ForceFullSceneLoadingForIncremental;
	}
	static set ForceFullSceneLoadingForIncremental(t) {
		e._ForceFullSceneLoadingForIncremental = t;
	}
	static get ShowLoadingScreen() {
		return e._ShowLoadingScreen;
	}
	static set ShowLoadingScreen(t) {
		e._ShowLoadingScreen = t;
	}
	static get loggingLevel() {
		return e._LoggingLevel;
	}
	static set loggingLevel(t) {
		e._LoggingLevel = t;
	}
	static get CleanBoneMatrixWeights() {
		return e._CleanBoneMatrixWeights;
	}
	static set CleanBoneMatrixWeights(t) {
		e._CleanBoneMatrixWeights = t;
	}
};
Ze._ForceFullSceneLoadingForIncremental = !1, Ze._ShowLoadingScreen = !0, Ze._CleanBoneMatrixWeights = !1, Ze._LoggingLevel = 0;
//#endregion
//#region node_modules/@babylonjs/core/Meshes/geometry.js
var Qe = class t {
	get boundingBias() {
		return this._boundingBias;
	}
	set boundingBias(e) {
		this._boundingBias ? this._boundingBias.copyFrom(e) : this._boundingBias = e.clone(), this._updateBoundingInfo(!0, null);
	}
	static CreateGeometryForMesh(e) {
		let n = new t(t.RandomId(), e.getScene());
		return n.applyToMesh(e), n;
	}
	get meshes() {
		return this._meshes;
	}
	constructor(t, n, r, i = !1, a = null, o = null) {
		this.delayLoadState = 0, this._totalVertices = 0, this._isDisposed = !1, this._extend = {
			minimum: new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE),
			maximum: new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
		}, this._indexBufferIsUpdatable = !1, this._positionsCache = [], this._parentContainer = null, this.useBoundingInfoFromGeometry = !1, this._scene = n || e.LastCreatedScene, this._scene && (this.id = t, this.uniqueId = this._scene.getUniqueId(), this._engine = this._scene.getEngine(), this._meshes = [], this._vertexBuffers = {}, this._indices = [], this._updatable = i, o !== null && (this._totalVertices = o), r ? this.setAllVerticesData(r, i) : o === null && (this._totalVertices = 0), this._engine.getCaps().vertexArrayObject && (this._vertexArrayObjects = {}), a && (this.applyToMesh(a), a.computeWorldMatrix(!0)));
	}
	get extend() {
		return this._extend;
	}
	getScene() {
		return this._scene;
	}
	getEngine() {
		return this._engine;
	}
	isReady() {
		return this.delayLoadState === 1 || this.delayLoadState === 0;
	}
	get doNotSerialize() {
		for (let e = 0; e < this._meshes.length; e++) if (!this._meshes[e].doNotSerialize) return !1;
		return !0;
	}
	_rebuild() {
		this._vertexArrayObjects &&= {}, this._meshes.length !== 0 && this._indices && (this._indexBuffer = this._engine.createIndexBuffer(this._indices, this._updatable, "Geometry_" + this.id + "_IndexBuffer"));
		let e = /* @__PURE__ */ new Set();
		for (let t in this._vertexBuffers) e.add(this._vertexBuffers[t].getWrapperBuffer());
		e.forEach((e) => {
			e._rebuild();
		});
	}
	setAllVerticesData(e, t) {
		e.applyToGeometry(this, t), this._notifyUpdate();
	}
	setVerticesData(e, t, n = !1, r) {
		n && Array.isArray(t) && (t = new Float32Array(t));
		let i = new j(this._engine, t, e, {
			updatable: n,
			postponeInternalCreation: this._meshes.length === 0,
			stride: r,
			label: "Geometry_" + this.id + "_" + e
		});
		this.setVerticesBuffer(i);
	}
	removeVerticesData(e) {
		this._vertexBuffers[e] && (this._vertexBuffers[e].dispose(), delete this._vertexBuffers[e]), this._vertexArrayObjects && this._disposeVertexArrayObjects();
	}
	setVerticesBuffer(e, t = null, n = !0) {
		let r = e.getKind();
		this._vertexBuffers[r] && n && this._vertexBuffers[r].dispose(), e._buffer && e._ownsBuffer && e._buffer._increaseReferences(), this._vertexBuffers[r] = e;
		let i = this._meshes, a = i.length;
		if (r === j.PositionKind) {
			this._totalVertices = t ?? e._maxVerticesCount, this._updateExtend(this.useBoundingInfoFromGeometry && this._boundingInfo ? null : e.getFloatData(this._totalVertices)), this._resetPointsArrayCache();
			let n = this._extend && this._extend.minimum || new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), r = this._extend && this._extend.maximum || new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
			for (let e = 0; e < a; e++) {
				let t = i[e];
				t.buildBoundingInfo(n, r), t._createGlobalSubMesh(t.isUnIndexed), t.computeWorldMatrix(!0), t.synchronizeInstances();
			}
		}
		this._notifyUpdate(r);
	}
	updateVerticesDataDirectly(e, t, n, r = !1) {
		let i = this.getVertexBuffer(e);
		i && (i.updateDirectly(t, n, r), this._notifyUpdate(e));
	}
	updateVerticesData(e, t, n = !1) {
		let r = this.getVertexBuffer(e);
		r && (r.update(t), e === j.PositionKind && this._updateBoundingInfo(n, t), this._notifyUpdate(e));
	}
	_updateBoundingInfo(e, t) {
		if (e && this._updateExtend(t), this._resetPointsArrayCache(), e) {
			let e = this._meshes;
			for (let t of e) {
				t.hasBoundingInfo ? t.getBoundingInfo().reConstruct(this._extend.minimum, this._extend.maximum) : t.buildBoundingInfo(this._extend.minimum, this._extend.maximum);
				let e = t.subMeshes;
				for (let t of e) t.refreshBoundingInfo();
			}
		}
	}
	_bind(e, t, n, r) {
		if (!e) return;
		t === void 0 && (t = this._indexBuffer);
		let i = this.getVertexBuffers();
		if (!i) return;
		if (t != this._indexBuffer || !this._vertexArrayObjects && !r) {
			this._engine.bindBuffers(i, t, e, n);
			return;
		}
		let a = r || this._vertexArrayObjects, o = this._engine;
		a[e.key] || (a[e.key] = o.recordVertexArrayObject(i, t, e, n)), o.bindVertexArrayObject(a[e.key], t);
	}
	getTotalVertices() {
		return this.isReady() ? this._totalVertices : 0;
	}
	getVerticesData(e, t, n) {
		let r = this.getVertexBuffer(e);
		return r ? r.getFloatData(this._totalVertices, n || t && this._meshes.length !== 1) : null;
	}
	copyVerticesData(e, t) {
		let n = this.getVertexBuffer(e);
		if (!n) return;
		t[e] || (t[e] = new Float32Array(this._totalVertices * n.getSize()));
		let r = n.getData();
		r && xe(r, n.getSize(), n.type, n.byteOffset, n.byteStride, n.normalized, this._totalVertices, t[e]);
	}
	isVertexBufferUpdatable(e) {
		let t = this._vertexBuffers[e];
		return t ? t.isUpdatable() : !1;
	}
	getVertexBuffer(e) {
		return this.isReady() ? this._vertexBuffers[e] : null;
	}
	getVertexBuffers() {
		return this.isReady() ? this._vertexBuffers : null;
	}
	isVerticesDataPresent(e) {
		return this._vertexBuffers ? this._vertexBuffers[e] !== void 0 : this._delayInfo ? this._delayInfo.indexOf(e) !== -1 : !1;
	}
	getVerticesDataKinds() {
		let e = [], t;
		if (!this._vertexBuffers && this._delayInfo) for (t in this._delayInfo) e.push(t);
		else for (t in this._vertexBuffers) e.push(t);
		return e;
	}
	updateIndices(e, t, n = !1) {
		if (this._indexBuffer) {
			if (!this._indexBufferIsUpdatable) this.setIndices(e, null, !0);
			else {
				let r = e.length !== this._indices.length;
				if (n || (this._indices = e.slice()), this._engine.updateDynamicIndexBuffer(this._indexBuffer, e, t), r) for (let e of this._meshes) e._createGlobalSubMesh(!0);
			}
		}
	}
	setIndexBuffer(e, t, n, r = null) {
		this._indices = [], this._indexBufferIsUpdatable = !1, this._indexBuffer = e, this._totalVertices = t, this._totalIndices = n, e.is32Bits = r === null ? t > 65535 : r;
		for (let e of this._meshes) e._createGlobalSubMesh(!0), e.synchronizeInstances();
		this._notifyUpdate();
	}
	setIndices(e, t = null, n = !1, r = !1) {
		this._indexBuffer && this._engine._releaseBuffer(this._indexBuffer), this._indices = e, this._indexBufferIsUpdatable = n, this._meshes.length !== 0 && this._indices && (this._indexBuffer = this._engine.createIndexBuffer(this._indices, n, "Geometry_" + this.id + "_IndexBuffer")), t != null && (this._totalVertices = t);
		for (let e of this._meshes) e._createGlobalSubMesh(!r), e.synchronizeInstances();
		this._notifyUpdate();
	}
	getTotalIndices() {
		return this.isReady() ? this._totalIndices === void 0 ? this._indices.length : this._totalIndices : 0;
	}
	getIndices(e, t) {
		if (!this.isReady()) return null;
		let n = this._indices;
		return !t && (!e || this._meshes.length === 1) ? n : n.slice();
	}
	getIndexBuffer() {
		return this.isReady() ? this._indexBuffer : null;
	}
	_releaseVertexArrayObject(e = null) {
		!e || !this._vertexArrayObjects || this._vertexArrayObjects[e.key] && (this._engine.releaseVertexArrayObject(this._vertexArrayObjects[e.key]), delete this._vertexArrayObjects[e.key]);
	}
	releaseForMesh(e, t) {
		let n = this._meshes, r = n.indexOf(e);
		r !== -1 && (n.splice(r, 1), this._vertexArrayObjects && e._invalidateInstanceVertexArrayObject(), e._geometry = null, n.length === 0 && t && this.dispose());
	}
	applyToMesh(e) {
		if (e._geometry === this) return;
		let t = e._geometry;
		t && t.releaseForMesh(e), this._vertexArrayObjects && e._invalidateInstanceVertexArrayObject();
		let n = this._meshes;
		e._geometry = this, e._internalAbstractMeshDataInfo._positions = null, this._scene.pushGeometry(this), n.push(e), this.isReady() ? this._applyToMesh(e) : this._boundingInfo && e.setBoundingInfo(this._boundingInfo);
	}
	_updateExtend(e = null) {
		if (this.useBoundingInfoFromGeometry && this._boundingInfo) this._extend = {
			minimum: this._boundingInfo.minimum.clone(),
			maximum: this._boundingInfo.maximum.clone()
		};
		else {
			if (!e && (e = this.getVerticesData(j.PositionKind), !e)) return;
			this._extend = Je(e, 0, this._totalVertices, this.boundingBias, 3);
		}
	}
	_applyToMesh(e) {
		for (let t in this._vertexBuffers) {
			let n = this._vertexBuffers[t];
			n._buffer.getBuffer() || n.create(), t === j.PositionKind && (this._extend || this._updateExtend(), e.buildBoundingInfo(this._extend.minimum, this._extend.maximum), e._createGlobalSubMesh(e.isUnIndexed), e._updateBoundingInfo());
		}
		!this._indexBuffer && this._indices && this._indices.length > 0 && (this._indexBuffer = this._engine.createIndexBuffer(this._indices, this._updatable, "Geometry_" + this.id + "_IndexBuffer")), e._syncGeometryWithMorphTargetManager(), e.synchronizeInstances();
	}
	_notifyUpdate(e) {
		this.onGeometryUpdated && this.onGeometryUpdated(this, e), this._vertexArrayObjects && this._disposeVertexArrayObjects();
		for (let e of this._meshes) e._markSubMeshesAsAttributesDirty();
	}
	load(e, t) {
		if (this.delayLoadState !== 2) {
			if (this.isReady()) {
				t && t();
				return;
			}
			this.delayLoadState = 2, this._queueLoad(e, t);
		}
	}
	_queueLoad(e, t) {
		this.delayLoadingFile && (e.addPendingData(this), e._loadFile(this.delayLoadingFile, (n) => {
			if (!this._delayLoadingFunction) return;
			this._delayLoadingFunction(JSON.parse(n), this), this.delayLoadState = 1, this._delayInfo = [], e.removePendingData(this);
			let r = this._meshes, i = r.length;
			for (let e = 0; e < i; e++) this._applyToMesh(r[e]);
			t && t();
		}, void 0, !0));
	}
	toLeftHanded() {
		let e = this.getIndices(!1);
		if (e != null && e.length > 0) {
			for (let t = 0; t < e.length; t += 3) {
				let n = e[t + 0];
				e[t + 0] = e[t + 2], e[t + 2] = n;
			}
			this.setIndices(e);
		}
		let t = this.getVerticesData(j.PositionKind, !1);
		if (t != null && t.length > 0) {
			for (let e = 0; e < t.length; e += 3) t[e + 2] = -t[e + 2];
			this.setVerticesData(j.PositionKind, t, !1);
		}
		let n = this.getVerticesData(j.NormalKind, !1);
		if (n != null && n.length > 0) {
			for (let e = 0; e < n.length; e += 3) n[e + 2] = -n[e + 2];
			this.setVerticesData(j.NormalKind, n, !1);
		}
	}
	_resetPointsArrayCache() {
		this._positions = null;
	}
	_generatePointsArray() {
		if (this._positions) return !0;
		let e = this.getVerticesData(j.PositionKind);
		if (!e || e.length === 0) return !1;
		for (let t = this._positionsCache.length * 3, n = this._positionsCache.length; t < e.length; t += 3, ++n) this._positionsCache[n] = h.FromArray(e, t);
		for (let t = 0, n = 0; t < e.length; t += 3, ++n) this._positionsCache[n].set(e[0 + t], e[1 + t], e[2 + t]);
		return this._positionsCache.length = e.length / 3, this._positions = this._positionsCache, !0;
	}
	isDisposed() {
		return this._isDisposed;
	}
	_disposeVertexArrayObjects() {
		if (this._vertexArrayObjects) {
			for (let e in this._vertexArrayObjects) this._engine.releaseVertexArrayObject(this._vertexArrayObjects[e]);
			this._vertexArrayObjects = {};
			let e = this._meshes, t = e.length;
			for (let n = 0; n < t; n++) e[n]._invalidateInstanceVertexArrayObject();
		}
	}
	dispose() {
		let e = this._meshes, t = e.length, n;
		for (n = 0; n < t; n++) this.releaseForMesh(e[n]);
		this._meshes.length = 0, this._disposeVertexArrayObjects();
		for (let e in this._vertexBuffers) this._vertexBuffers[e].dispose();
		if (this._vertexBuffers = {}, this._totalVertices = 0, this._indexBuffer && this._engine._releaseBuffer(this._indexBuffer), this._indexBuffer = null, this._indices = [], this.delayLoadState = 0, this.delayLoadingFile = null, this._delayLoadingFunction = null, this._delayInfo = [], this._boundingInfo = null, this._scene.removeGeometry(this), this._parentContainer) {
			let e = this._parentContainer.geometries.indexOf(this);
			e > -1 && this._parentContainer.geometries.splice(e, 1), this._parentContainer = null;
		}
		this._isDisposed = !0;
	}
	copy(e) {
		let n = new t(e, this._scene), r = this.getIndices(void 0, !0);
		r && n.setIndices(r);
		let i = !1, a;
		for (a in this._vertexBuffers) {
			let e = this.getVertexBuffer(a), t = e.getData();
			if (!t) continue;
			let r = e.isUpdatable(), o = e.getSize(), { type: s, byteOffset: c, byteStride: l, normalized: u } = e;
			i ||= r;
			let d = this._totalVertices;
			if (e.getIsInstanced()) {
				let e;
				e = t instanceof Array ? t.length * 4 : t.byteLength, d = e / l;
			}
			let f = Se(t, o, s, c, l, d, !0), p = new j(this._engine, f, a, {
				updatable: r,
				useBytes: !1,
				stride: o,
				size: o,
				offset: 0,
				type: s,
				normalized: u,
				takeBufferOwnership: !0,
				instanced: e.getIsInstanced()
			});
			n.setVerticesBuffer(p, d);
		}
		for (a in n._updatable = i, n.delayLoadState = this.delayLoadState, n.delayLoadingFile = this.delayLoadingFile, n._delayLoadingFunction = this._delayLoadingFunction, this._delayInfo) n._delayInfo = n._delayInfo || [], n._delayInfo.push(a);
		return n._boundingInfo = new Ge(this._extend.minimum, this._extend.maximum), n;
	}
	serialize() {
		let e = {};
		return e.id = this.id, e.uniqueId = this.uniqueId, e.updatable = this._updatable, T && T.HasTags(this) && (e.tags = T.GetTags(this)), e;
	}
	_toNumberArray(e) {
		return Array.isArray(e) ? e : Array.prototype.slice.call(e);
	}
	clearCachedData() {
		this._totalIndices = this._indices.length, this._indices = [], this._resetPointsArrayCache();
		for (let e in this._vertexBuffers) Object.prototype.hasOwnProperty.call(this._vertexBuffers, e) && (this._vertexBuffers[e]._buffer._data = null);
	}
	serializeVerticeData() {
		let e = this.serialize();
		return this.isVerticesDataPresent(j.PositionKind) && (e.positions = this._toNumberArray(this.getVerticesData(j.PositionKind)), this.isVertexBufferUpdatable(j.PositionKind) && (e.positionsUpdatable = !0)), this.isVerticesDataPresent(j.NormalKind) && (e.normals = this._toNumberArray(this.getVerticesData(j.NormalKind)), this.isVertexBufferUpdatable(j.NormalKind) && (e.normalsUpdatable = !0)), this.isVerticesDataPresent(j.TangentKind) && (e.tangents = this._toNumberArray(this.getVerticesData(j.TangentKind)), this.isVertexBufferUpdatable(j.TangentKind) && (e.tangentsUpdatable = !0)), this.isVerticesDataPresent(j.UVKind) && (e.uvs = this._toNumberArray(this.getVerticesData(j.UVKind)), this.isVertexBufferUpdatable(j.UVKind) && (e.uvsUpdatable = !0)), this.isVerticesDataPresent(j.UV2Kind) && (e.uvs2 = this._toNumberArray(this.getVerticesData(j.UV2Kind)), this.isVertexBufferUpdatable(j.UV2Kind) && (e.uvs2Updatable = !0)), this.isVerticesDataPresent(j.UV3Kind) && (e.uvs3 = this._toNumberArray(this.getVerticesData(j.UV3Kind)), this.isVertexBufferUpdatable(j.UV3Kind) && (e.uvs3Updatable = !0)), this.isVerticesDataPresent(j.UV4Kind) && (e.uvs4 = this._toNumberArray(this.getVerticesData(j.UV4Kind)), this.isVertexBufferUpdatable(j.UV4Kind) && (e.uvs4Updatable = !0)), this.isVerticesDataPresent(j.UV5Kind) && (e.uvs5 = this._toNumberArray(this.getVerticesData(j.UV5Kind)), this.isVertexBufferUpdatable(j.UV5Kind) && (e.uvs5Updatable = !0)), this.isVerticesDataPresent(j.UV6Kind) && (e.uvs6 = this._toNumberArray(this.getVerticesData(j.UV6Kind)), this.isVertexBufferUpdatable(j.UV6Kind) && (e.uvs6Updatable = !0)), this.isVerticesDataPresent(j.ColorKind) && (e.colors = this._toNumberArray(this.getVerticesData(j.ColorKind)), this.isVertexBufferUpdatable(j.ColorKind) && (e.colorsUpdatable = !0)), this.isVerticesDataPresent(j.MatricesIndicesKind) && (e.matricesIndices = this._toNumberArray(this.getVerticesData(j.MatricesIndicesKind)), e.matricesIndicesExpanded = !0, this.isVertexBufferUpdatable(j.MatricesIndicesKind) && (e.matricesIndicesUpdatable = !0)), this.isVerticesDataPresent(j.MatricesWeightsKind) && (e.matricesWeights = this._toNumberArray(this.getVerticesData(j.MatricesWeightsKind)), this.isVertexBufferUpdatable(j.MatricesWeightsKind) && (e.matricesWeightsUpdatable = !0)), e.indices = this._toNumberArray(this.getIndices()), e;
	}
	static ExtractFromMesh(e, t) {
		let n = e._geometry;
		return n ? n.copy(t) : null;
	}
	static RandomId() {
		return F.RandomId();
	}
	static _GetGeometryByLoadedUniqueId(e, t) {
		for (let n = 0; n < t.geometries.length; n++) if (t.geometries[n]._loadedUniqueId === e) return t.geometries[n];
		return null;
	}
	static _ImportGeometry(e, n) {
		let r = n.getScene(), i = e.geometryUniqueId, a = e.geometryId;
		if (i || a) {
			let e = i ? this._GetGeometryByLoadedUniqueId(i, r) : r.getGeometryById(a);
			e && e.applyToMesh(n);
		} else if (e instanceof ArrayBuffer) {
			let t = n._binaryInfo;
			if (t.positionsAttrDesc && t.positionsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.positionsAttrDesc.offset, t.positionsAttrDesc.count);
				n.setVerticesData(j.PositionKind, r, !1);
			}
			if (t.normalsAttrDesc && t.normalsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.normalsAttrDesc.offset, t.normalsAttrDesc.count);
				n.setVerticesData(j.NormalKind, r, !1);
			}
			if (t.tangetsAttrDesc && t.tangetsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.tangetsAttrDesc.offset, t.tangetsAttrDesc.count);
				n.setVerticesData(j.TangentKind, r, !1);
			}
			if (t.uvsAttrDesc && t.uvsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvsAttrDesc.offset, t.uvsAttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UVKind, r, !1);
			}
			if (t.uvs2AttrDesc && t.uvs2AttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvs2AttrDesc.offset, t.uvs2AttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UV2Kind, r, !1);
			}
			if (t.uvs3AttrDesc && t.uvs3AttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvs3AttrDesc.offset, t.uvs3AttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UV3Kind, r, !1);
			}
			if (t.uvs4AttrDesc && t.uvs4AttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvs4AttrDesc.offset, t.uvs4AttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UV4Kind, r, !1);
			}
			if (t.uvs5AttrDesc && t.uvs5AttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvs5AttrDesc.offset, t.uvs5AttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UV5Kind, r, !1);
			}
			if (t.uvs6AttrDesc && t.uvs6AttrDesc.count > 0) {
				let r = new Float32Array(e, t.uvs6AttrDesc.offset, t.uvs6AttrDesc.count);
				if (k) for (let e = 1; e < r.length; e += 2) r[e] = 1 - r[e];
				n.setVerticesData(j.UV6Kind, r, !1);
			}
			if (t.colorsAttrDesc && t.colorsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.colorsAttrDesc.offset, t.colorsAttrDesc.count);
				n.setVerticesData(j.ColorKind, r, !1, t.colorsAttrDesc.stride);
			}
			if (t.matricesIndicesAttrDesc && t.matricesIndicesAttrDesc.count > 0) {
				let r = new Int32Array(e, t.matricesIndicesAttrDesc.offset, t.matricesIndicesAttrDesc.count), i = [];
				for (let e = 0; e < r.length; e++) {
					let t = r[e];
					i.push(t & 255), i.push((t & 65280) >> 8), i.push((t & 16711680) >> 16), i.push(t >> 24 & 255);
				}
				n.setVerticesData(j.MatricesIndicesKind, i, !1);
			}
			if (t.matricesIndicesExtraAttrDesc && t.matricesIndicesExtraAttrDesc.count > 0) {
				let r = new Int32Array(e, t.matricesIndicesExtraAttrDesc.offset, t.matricesIndicesExtraAttrDesc.count), i = [];
				for (let e = 0; e < r.length; e++) {
					let t = r[e];
					i.push(t & 255), i.push((t & 65280) >> 8), i.push((t & 16711680) >> 16), i.push(t >> 24 & 255);
				}
				n.setVerticesData(j.MatricesIndicesExtraKind, i, !1);
			}
			if (t.matricesWeightsAttrDesc && t.matricesWeightsAttrDesc.count > 0) {
				let r = new Float32Array(e, t.matricesWeightsAttrDesc.offset, t.matricesWeightsAttrDesc.count);
				n.setVerticesData(j.MatricesWeightsKind, r, !1);
			}
			if (t.indicesAttrDesc && t.indicesAttrDesc.count > 0) {
				let r = new Int32Array(e, t.indicesAttrDesc.offset, t.indicesAttrDesc.count);
				n.setIndices(r, null);
			}
			if (t.subMeshesAttrDesc && t.subMeshesAttrDesc.count > 0) {
				let r = new Int32Array(e, t.subMeshesAttrDesc.offset, t.subMeshesAttrDesc.count * 5);
				n.subMeshes = [];
				for (let e = 0; e < t.subMeshesAttrDesc.count; e++) {
					let t = r[e * 5 + 0], i = r[e * 5 + 1], a = r[e * 5 + 2], o = r[e * 5 + 3], s = r[e * 5 + 4];
					Ye.AddToMesh(t, i, a, o, s, n);
				}
			}
		} else if (e.positions && e.normals && e.indices) {
			if (n.setVerticesData(j.PositionKind, e.positions, e.positions._updatable || e.positionsUpdatable), n.setVerticesData(j.NormalKind, e.normals, e.normals._updatable || e.normalsUpdatable), e.tangents && n.setVerticesData(j.TangentKind, e.tangents, e.tangents._updatable || e.tangentsUpdatable), e.uvs && n.setVerticesData(j.UVKind, e.uvs, e.uvs._updatable || e.uvsUpdatable), e.uvs2 && n.setVerticesData(j.UV2Kind, e.uvs2, e.uvs2._updatable || e.uvs2Updatable), e.uvs3 && n.setVerticesData(j.UV3Kind, e.uvs3, e.uvs3._updatable || e.uvs3Updatable), e.uvs4 && n.setVerticesData(j.UV4Kind, e.uvs4, e.uvs4._updatable || e.uvs4Updatable), e.uvs5 && n.setVerticesData(j.UV5Kind, e.uvs5, e.uvs5._updatable || e.uvs5Updatable), e.uvs6 && n.setVerticesData(j.UV6Kind, e.uvs6, e.uvs6._updatable || e.uvs6Updatable), e.colors && n.setVerticesData(j.ColorKind, O.CheckColors4(e.colors, e.positions.length / 3), e.colors._updatable), e.matricesIndices) {
				if (!e.matricesIndices._isExpanded && !e.matricesIndicesExpanded) {
					let t = [];
					for (let n = 0; n < e.matricesIndices.length; n++) {
						let r = e.matricesIndices[n];
						t.push(r & 255), t.push((r & 65280) >> 8), t.push((r & 16711680) >> 16), t.push(r >> 24 & 255);
					}
					n.setVerticesData(j.MatricesIndicesKind, t, e.matricesIndices._updatable || e.matricesIndicesUpdatable);
				} else delete e.matricesIndices._isExpanded, delete e.matricesIndicesExpanded, n.setVerticesData(j.MatricesIndicesKind, e.matricesIndices, e.matricesIndices._updatable || e.matricesIndicesUpdatable);
			}
			if (e.matricesIndicesExtra) {
				if (e.matricesIndicesExtraExpanded || e.matricesIndicesExtra._isExpanded) delete e.matricesIndices._isExpanded, delete e.matricesIndicesExtraExpanded, n.setVerticesData(j.MatricesIndicesExtraKind, e.matricesIndicesExtra, e.matricesIndicesExtra._updatable || e.matricesIndicesExtraUpdatable);
				else {
					let t = [];
					for (let n = 0; n < e.matricesIndicesExtra.length; n++) {
						let r = e.matricesIndicesExtra[n];
						t.push(r & 255), t.push((r & 65280) >> 8), t.push((r & 16711680) >> 16), t.push(r >> 24 & 255);
					}
					n.setVerticesData(j.MatricesIndicesExtraKind, t, e.matricesIndicesExtra._updatable || e.matricesIndicesExtraUpdatable);
				}
			}
			e.matricesWeights && (t._CleanMatricesWeights(e, n), n.setVerticesData(j.MatricesWeightsKind, e.matricesWeights, e.matricesWeights._updatable)), e.matricesWeightsExtra && n.setVerticesData(j.MatricesWeightsExtraKind, e.matricesWeightsExtra, e.matricesWeights._updatable), n.setIndices(e.indices, null);
		}
		if (e.subMeshes) {
			n.subMeshes = [];
			for (let t = 0; t < e.subMeshes.length; t++) {
				let r = e.subMeshes[t];
				Ye.AddToMesh(r.materialIndex, r.verticesStart, r.verticesCount, r.indexStart, r.indexCount, n);
			}
		}
		n._shouldGenerateFlatShading &&= (n.convertToFlatShadedMesh(), !1), n.computeWorldMatrix(!0), r.onMeshImportedObservable.notifyObservers(n);
	}
	static _CleanMatricesWeights(e, t) {
		let n = .001;
		if (!Ze.CleanBoneMatrixWeights) return;
		let r;
		if (e.skeletonId > -1) {
			let n = t.getScene().getLastSkeletonById(e.skeletonId);
			if (!n) return;
			r = n.bones.length;
		} else return;
		let i = t.getVerticesData(j.MatricesIndicesKind), a = t.getVerticesData(j.MatricesIndicesExtraKind), o = e.matricesWeights, s = e.matricesWeightsExtra, c = e.numBoneInfluencer, l = o.length;
		for (let e = 0; e < l; e += 4) {
			let t = 0, l = -1;
			for (let r = 0; r < 4; r++) {
				let i = o[e + r];
				t += i, i < n && l < 0 && (l = r);
			}
			if (s) for (let r = 0; r < 4; r++) {
				let i = s[e + r];
				t += i, i < n && l < 0 && (l = r + 4);
			}
			if ((l < 0 || l > c - 1) && (l = c - 1), t > n) {
				let n = 1 / t;
				for (let t = 0; t < 4; t++) o[e + t] *= n;
				if (s) for (let t = 0; t < 4; t++) s[e + t] *= n;
			} else l >= 4 ? (s[e + l - 4] = 1 - t, a[e + l - 4] = r) : (o[e + l] = 1 - t, i[e + l] = r);
		}
		t.setVerticesData(j.MatricesIndicesKind, i), e.matricesWeightsExtra && t.setVerticesData(j.MatricesIndicesExtraKind, a);
	}
	static Parse(e, n, r) {
		let i = new t(e.id, n, void 0, e.updatable);
		return i._loadedUniqueId = e.uniqueId, T && T.AddTagsTo(i, e.tags), e.delayLoadingFile ? (i.delayLoadState = 4, i.delayLoadingFile = r + e.delayLoadingFile, i._boundingInfo = new Ge(h.FromArray(e.boundingBoxMinimum), h.FromArray(e.boundingBoxMaximum)), i._delayInfo = [], e.hasUVs && i._delayInfo.push(j.UVKind), e.hasUVs2 && i._delayInfo.push(j.UV2Kind), e.hasUVs3 && i._delayInfo.push(j.UV3Kind), e.hasUVs4 && i._delayInfo.push(j.UV4Kind), e.hasUVs5 && i._delayInfo.push(j.UV5Kind), e.hasUVs6 && i._delayInfo.push(j.UV6Kind), e.hasColors && i._delayInfo.push(j.ColorKind), e.hasMatricesIndices && i._delayInfo.push(j.MatricesIndicesKind), e.hasMatricesWeights && i._delayInfo.push(j.MatricesWeightsKind), i._delayLoadingFunction = B.ImportVertexData) : B.ImportVertexData(e, i), n.pushGeometry(i, !0), i;
	}
}, V = class e extends L {
	get billboardMode() {
		return this._billboardMode;
	}
	set billboardMode(t) {
		this._billboardMode !== t && (this._billboardMode = t, this._cache.useBillboardPosition = (this._billboardMode & e.BILLBOARDMODE_USE_POSITION) !== 0);
	}
	get infiniteDistance() {
		return this._infiniteDistance;
	}
	set infiniteDistance(e) {
		this._infiniteDistance !== e && (this._infiniteDistance = e);
	}
	constructor(n, r = null, i = !0) {
		super(n, r, !1), this._forward = new h(0, 0, 1), this._up = new h(0, 1, 0), this._right = new h(1, 0, 0), this._position = h.Zero(), this._rotation = h.Zero(), this._rotationQuaternion = null, this._scaling = h.One(), this._transformToBoneReferal = null, this._isAbsoluteSynced = !1, this._billboardMode = e.BILLBOARDMODE_NONE, this.scalingDeterminant = 1, this._infiniteDistance = !1, this.ignoreNonUniformScaling = !1, this.reIntegrateRotationIntoRotationQuaternion = !1, this._poseMatrix = null, this._localMatrix = S.Zero(), this._usePivotMatrix = !1, this._absolutePosition = h.Zero(), this._absoluteScaling = h.Zero(), this._absoluteRotationQuaternion = y.Identity(), this._pivotMatrix = S.Identity(), this._postMultiplyPivotMatrix = !1, this._isWorldMatrixFrozen = !1, this._indexInSceneTransformNodesArray = -1, this.onAfterWorldMatrixUpdateObservable = new t(), this._nonUniformScaling = !1, i && this.getScene().addTransformNode(this);
	}
	getClassName() {
		return "TransformNode";
	}
	get position() {
		return this._position;
	}
	set position(e) {
		this._position = e, this._markAsDirtyInternal();
	}
	isUsingPivotMatrix() {
		return this._usePivotMatrix;
	}
	isUsingPostMultiplyPivotMatrix() {
		return this._postMultiplyPivotMatrix;
	}
	get rotation() {
		return this._rotation;
	}
	set rotation(e) {
		this._rotation = e, this._rotationQuaternion = null, this._markAsDirtyInternal();
	}
	get scaling() {
		return this._scaling;
	}
	set scaling(e) {
		this._scaling = e, this._markAsDirtyInternal();
	}
	get rotationQuaternion() {
		return this._rotationQuaternion;
	}
	set rotationQuaternion(e) {
		this._rotationQuaternion = e, e && this._rotation.setAll(0), this._markAsDirtyInternal();
	}
	_markAsDirtyInternal() {
		this._isDirty || (this._isDirty = !0, this.customMarkAsDirty && this.customMarkAsDirty());
	}
	get forward() {
		return h.TransformNormalFromFloatsToRef(0, 0, this.getScene().useRightHandedSystem ? -1 : 1, this.getWorldMatrix(), this._forward), this._forward.normalize();
	}
	get up() {
		return h.TransformNormalFromFloatsToRef(0, 1, 0, this.getWorldMatrix(), this._up), this._up.normalize();
	}
	get right() {
		return h.TransformNormalFromFloatsToRef(this.getScene().useRightHandedSystem ? -1 : 1, 0, 0, this.getWorldMatrix(), this._right), this._right.normalize();
	}
	updatePoseMatrix(e) {
		return this._poseMatrix ? (this._poseMatrix.copyFrom(e), this) : (this._poseMatrix = e.clone(), this);
	}
	getPoseMatrix() {
		return this._poseMatrix ||= S.Identity(), this._poseMatrix;
	}
	_isSynchronized() {
		let t = this._cache;
		return !(this._billboardMode !== t.billboardMode || this._billboardMode !== e.BILLBOARDMODE_NONE || t.pivotMatrixUpdated || this._infiniteDistance || this._position._isDirty || this._scaling._isDirty || this._rotationQuaternion && this._rotationQuaternion._isDirty || this._rotation._isDirty);
	}
	_initCache() {
		super._initCache();
		let e = this._cache;
		e.localMatrixUpdated = !1, e.billboardMode = -1, e.infiniteDistance = !1, e.useBillboardPosition = !1;
	}
	get absolutePosition() {
		return this.getAbsolutePosition();
	}
	get absoluteScaling() {
		return this._syncAbsoluteScalingAndRotation(), this._absoluteScaling;
	}
	get absoluteRotationQuaternion() {
		return this._syncAbsoluteScalingAndRotation(), this._absoluteRotationQuaternion;
	}
	setPreTransformMatrix(e) {
		return this.setPivotMatrix(e, !1);
	}
	setPivotMatrix(e, t = !0) {
		return this._pivotMatrix.copyFrom(e), this._usePivotMatrix = !this._pivotMatrix.isIdentity(), this._cache.pivotMatrixUpdated = !0, this._postMultiplyPivotMatrix = t, this._postMultiplyPivotMatrix && (this._pivotMatrixInverse ? this._pivotMatrix.invertToRef(this._pivotMatrixInverse) : this._pivotMatrixInverse = S.Invert(this._pivotMatrix)), this;
	}
	getPivotMatrix() {
		return this._pivotMatrix;
	}
	instantiateHierarchy(e = null, t, n) {
		let r = this.clone("Clone of " + (this.name || this.id), e || this.parent, !0);
		r && n && n(this, r);
		for (let e of this.getChildTransformNodes(!0)) e.instantiateHierarchy(r, t, n);
		return r;
	}
	freezeWorldMatrix(e = null, t = !1) {
		return e ? t ? (this._rotation.setAll(0), this._rotationQuaternion = this._rotationQuaternion || y.Identity(), e.decompose(this._scaling, this._rotationQuaternion, this._position), this.computeWorldMatrix(!0)) : (this._worldMatrix = e, this._absolutePosition.copyFromFloats(this._worldMatrix.m[12], this._worldMatrix.m[13], this._worldMatrix.m[14]), this._afterComputeWorldMatrix()) : (this._isWorldMatrixFrozen = !1, this.computeWorldMatrix(!0)), this._isDirty = !1, this._isWorldMatrixFrozen = !0, this;
	}
	unfreezeWorldMatrix() {
		return this._isWorldMatrixFrozen = !1, this.computeWorldMatrix(!0), this;
	}
	get isWorldMatrixFrozen() {
		return this._isWorldMatrixFrozen;
	}
	getAbsolutePosition() {
		return this.computeWorldMatrix(), this._absolutePosition;
	}
	setAbsolutePosition(e) {
		if (!e) return this;
		let t, n, r;
		if (e.x === void 0) {
			if (arguments.length < 3) return this;
			t = arguments[0], n = arguments[1], r = arguments[2];
		} else t = e.x, n = e.y, r = e.z;
		if (this.parent) {
			let e = x.Matrix[0];
			this.parent.getWorldMatrix().invertToRef(e), h.TransformCoordinatesFromFloatsToRef(t, n, r, e, this.position);
		} else this.position.x = t, this.position.y = n, this.position.z = r;
		return this._absolutePosition.copyFrom(e), this;
	}
	setPositionWithLocalVector(e) {
		return this.computeWorldMatrix(), this.position = h.TransformNormal(e, this._localMatrix), this;
	}
	getPositionExpressedInLocalSpace() {
		this.computeWorldMatrix();
		let e = x.Matrix[0];
		return this._localMatrix.invertToRef(e), h.TransformNormal(this.position, e);
	}
	locallyTranslate(e) {
		return this.computeWorldMatrix(!0), this.position = h.TransformCoordinates(e, this._localMatrix), this;
	}
	lookAt(t, n = 0, r = 0, i = 0, a = 0) {
		let o = e._LookAtVectorCache, s = a === 0 ? this.position : this.getAbsolutePosition();
		if (t.subtractToRef(s, o), this.setDirection(o, n, r, i), a === 1 && this.parent) {
			if (this.rotationQuaternion) {
				let e = x.Matrix[0];
				this.rotationQuaternion.toRotationMatrix(e);
				let t = x.Matrix[1];
				this.parent.getWorldMatrix().getRotationMatrixToRef(t), t.invert(), e.multiplyToRef(t, e), this.rotationQuaternion.fromRotationMatrix(e);
			} else {
				let e = x.Quaternion[0];
				y.FromEulerVectorToRef(this.rotation, e);
				let t = x.Matrix[0];
				e.toRotationMatrix(t);
				let n = x.Matrix[1];
				this.parent.getWorldMatrix().getRotationMatrixToRef(n), n.invert(), t.multiplyToRef(n, t), e.fromRotationMatrix(t), e.toEulerAnglesToRef(this.rotation);
			}
		}
		return this;
	}
	getDirection(e) {
		let t = h.Zero();
		return this.getDirectionToRef(e, t), t;
	}
	getDirectionToRef(e, t) {
		return h.TransformNormalToRef(e, this.getWorldMatrix(), t), this;
	}
	setDirection(e, t = 0, n = 0, r = 0) {
		let i = -Math.atan2(e.z, e.x) + Math.PI / 2, a = Math.sqrt(e.x * e.x + e.z * e.z), o = -Math.atan2(e.y, a);
		return this.rotationQuaternion ? y.RotationYawPitchRollToRef(i + t, o + n, r, this.rotationQuaternion) : (this.rotation.x = o + n, this.rotation.y = i + t, this.rotation.z = r), this;
	}
	setPivotPoint(e, t = 0) {
		this.getScene().getRenderId() == 0 && this.computeWorldMatrix(!0);
		let n = this.getWorldMatrix();
		if (t == 1) {
			let t = x.Matrix[0];
			n.invertToRef(t), e = h.TransformCoordinates(e, t);
		}
		return this.setPivotMatrix(S.Translation(-e.x, -e.y, -e.z), !0);
	}
	getPivotPoint() {
		let e = h.Zero();
		return this.getPivotPointToRef(e), e;
	}
	getPivotPointToRef(e) {
		return e.x = -this._pivotMatrix.m[12], e.y = -this._pivotMatrix.m[13], e.z = -this._pivotMatrix.m[14], this;
	}
	getAbsolutePivotPoint() {
		let e = h.Zero();
		return this.getAbsolutePivotPointToRef(e), e;
	}
	getAbsolutePivotPointToRef(e) {
		return this.getPivotPointToRef(e), h.TransformCoordinatesToRef(e, this.getWorldMatrix(), e), this;
	}
	markAsDirty(e) {
		if (this._isDirty) return this;
		if (this._children) for (let t of this._children) t.markAsDirty(e);
		return super.markAsDirty(e);
	}
	setParent(t, n = !1, r = !1) {
		if (!t && !this.parent) return this;
		let i = x.Quaternion[0], a = x.Vector3[0], o = x.Vector3[1], s = x.Matrix[1];
		S.IdentityToRef(s);
		let c = x.Matrix[0];
		this.computeWorldMatrix(!0);
		let l = this.rotationQuaternion;
		return l || (l = e._TmpRotation, y.RotationYawPitchRollToRef(this._rotation.y, this._rotation.x, this._rotation.z, l)), S.ComposeToRef(this.scaling, l, this.position, c), this.parent && c.multiplyToRef(this.parent.computeWorldMatrix(!0), c), t && (t.computeWorldMatrix(!0).invertToRef(s), c.multiplyToRef(s, c)), c.decompose(o, i, a, n ? this : void 0), this.rotationQuaternion ? this.rotationQuaternion.copyFrom(i) : i.toEulerAnglesToRef(this.rotation), this.scaling.copyFrom(o), this.position.copyFrom(a), this.parent = t, r && this.setPivotMatrix(S.Identity()), this;
	}
	addChild(e, t = !1) {
		return e.setParent(this, t), this;
	}
	removeChild(e, t = !1) {
		return e.parent === this && e.setParent(null, t), this;
	}
	get nonUniformScaling() {
		return this._nonUniformScaling;
	}
	_updateNonUniformScalingState(e) {
		return this._nonUniformScaling !== e && (this._nonUniformScaling = e, !0);
	}
	attachToBone(e, t) {
		return this._currentParentWhenAttachingToBone = this.parent, this._transformToBoneReferal = t, this.parent = e, e.getSkeleton().prepare(!0), e.getFinalMatrix().determinant() < 0 && (this.scalingDeterminant *= -1), this;
	}
	detachFromBone(e = !1) {
		return this.parent ? (this.parent.getWorldMatrix().determinant() < 0 && (this.scalingDeterminant *= -1), this._transformToBoneReferal = null, this.parent = e ? this._currentParentWhenAttachingToBone : null, this) : (e && (this.parent = this._currentParentWhenAttachingToBone), this);
	}
	rotate(t, n, r) {
		t.normalize(), this.rotationQuaternion || (this.rotationQuaternion = this.rotation.toQuaternion(), this.rotation.setAll(0));
		let i;
		if (!r || r === 0) i = y.RotationAxisToRef(t, n, e._RotationAxisCache), this.rotationQuaternion.multiplyToRef(i, this.rotationQuaternion);
		else {
			if (this.parent) {
				let e = this.parent.getWorldMatrix(), r = x.Matrix[0];
				e.invertToRef(r), t = h.TransformNormal(t, r), e.determinant() < 0 && (n *= -1);
			}
			i = y.RotationAxisToRef(t, n, e._RotationAxisCache), i.multiplyToRef(this.rotationQuaternion, this.rotationQuaternion);
		}
		return this;
	}
	rotateAround(e, t, n) {
		t.normalize(), this.rotationQuaternion || (this.rotationQuaternion = y.RotationYawPitchRoll(this.rotation.y, this.rotation.x, this.rotation.z), this.rotation.setAll(0));
		let r = x.Vector3[0], i = x.Vector3[1], a = x.Vector3[2], o = x.Quaternion[0], s = x.Matrix[0], c = x.Matrix[1], l = x.Matrix[2], u = x.Matrix[3];
		return e.subtractToRef(this.position, r), S.TranslationToRef(r.x, r.y, r.z, s), S.TranslationToRef(-r.x, -r.y, -r.z, c), S.RotationAxisToRef(t, n, l), c.multiplyToRef(l, u), u.multiplyToRef(s, u), u.decompose(i, o, a), this.position.addInPlace(a), o.multiplyToRef(this.rotationQuaternion, this.rotationQuaternion), this;
	}
	translate(e, t, n) {
		let r = e.scale(t);
		if (!n || n === 0) {
			let e = this.getPositionExpressedInLocalSpace().add(r);
			this.setPositionWithLocalVector(e);
		} else this.setAbsolutePosition(this.getAbsolutePosition().add(r));
		return this;
	}
	addRotation(e, t, n) {
		let r;
		this.rotationQuaternion ? r = this.rotationQuaternion : (r = x.Quaternion[1], y.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, r));
		let i = x.Quaternion[0];
		return y.RotationYawPitchRollToRef(t, e, n, i), r.multiplyInPlace(i), this.rotationQuaternion || r.toEulerAnglesToRef(this.rotation), this;
	}
	_getEffectiveParent() {
		return this.parent;
	}
	isWorldMatrixCameraDependent() {
		return this._infiniteDistance && !this.parent || this._billboardMode !== e.BILLBOARDMODE_NONE;
	}
	computeWorldMatrix(t = !1, n = null) {
		if (this._isWorldMatrixFrozen && !this._isDirty) return this._worldMatrix;
		let r = this.getScene().getRenderId();
		if (!this._isDirty && !t && (this._currentRenderId === r || this.isSynchronized())) return this._currentRenderId = r, this._worldMatrix;
		n ||= this.getScene().activeCamera, this._updateCache();
		let i = this._cache;
		i.pivotMatrixUpdated = !1, i.billboardMode = this.billboardMode, i.infiniteDistance = this.infiniteDistance, i.parent = this._parentNode, this._currentRenderId = r, this._childUpdateId += 1, this._isDirty = !1, this._position._isDirty = !1, this._rotation._isDirty = !1, this._scaling._isDirty = !1;
		let a = this._getEffectiveParent(), o = e._TmpScaling, s = this._position;
		if (this._infiniteDistance && !this.parent && n) {
			let t = n.getWorldMatrix(), r = new h(t.m[12], t.m[13], t.m[14]);
			s = e._TmpTranslation, s.copyFromFloats(this._position.x + r.x, this._position.y + r.y, this._position.z + r.z);
		}
		o.copyFromFloats(this._scaling.x * this.scalingDeterminant, this._scaling.y * this.scalingDeterminant, this._scaling.z * this.scalingDeterminant);
		let c;
		if (this._rotationQuaternion ? (this._rotationQuaternion._isDirty = !1, c = this._rotationQuaternion, this.reIntegrateRotationIntoRotationQuaternion && this.rotation.lengthSquared() && (this._rotationQuaternion.multiplyInPlace(y.RotationYawPitchRoll(this._rotation.y, this._rotation.x, this._rotation.z)), this._rotation.copyFromFloats(0, 0, 0))) : (c = e._TmpRotation, y.RotationYawPitchRollToRef(this._rotation.y, this._rotation.x, this._rotation.z, c)), this._usePivotMatrix) {
			let e = x.Matrix[1];
			S.ScalingToRef(o.x, o.y, o.z, e);
			let t = x.Matrix[0];
			c.toRotationMatrix(t), this._pivotMatrix.multiplyToRef(e, x.Matrix[4]), x.Matrix[4].multiplyToRef(t, this._localMatrix), this._postMultiplyPivotMatrix && this._localMatrix.multiplyToRef(this._pivotMatrixInverse, this._localMatrix), this._localMatrix.addTranslationFromFloats(s.x, s.y, s.z);
		} else S.ComposeToRef(o, c, s, this._localMatrix);
		if (a && a.getWorldMatrix) {
			if (t && a.computeWorldMatrix(t), this.billboardMode) {
				if (this._transformToBoneReferal) {
					let e = this.parent;
					e.getSkeleton().prepare(), e.getFinalMatrix().multiplyToRef(this._transformToBoneReferal.getWorldMatrix(), x.Matrix[7]);
				} else x.Matrix[7].copyFrom(a.getWorldMatrix());
				let t = x.Vector3[5], n = x.Vector3[6], r = x.Quaternion[0];
				x.Matrix[7].decompose(n, r, t), S.ScalingToRef(n.x, n.y, n.z, x.Matrix[7]), x.Matrix[7].setTranslation(t), e.BillboardUseParentOrientation && (this._position.applyRotationQuaternionToRef(r, t), this._localMatrix.setTranslation(t)), this._localMatrix.multiplyToRef(x.Matrix[7], this._worldMatrix);
			} else if (this._transformToBoneReferal) {
				let e = this.parent;
				e.getSkeleton().prepare(), this._localMatrix.multiplyToRef(e.getFinalMatrix(), x.Matrix[6]), x.Matrix[6].multiplyToRef(this._transformToBoneReferal.getWorldMatrix(), this._worldMatrix);
			} else this._localMatrix.multiplyToRef(a.getWorldMatrix(), this._worldMatrix);
			this._markSyncedWithParent();
		} else this._worldMatrix.copyFrom(this._localMatrix);
		if (n && this.billboardMode) {
			if (i.useBillboardPosition) {
				let t = x.Vector3[0];
				this._worldMatrix.getTranslationToRef(t);
				let r = n.globalPosition;
				this._worldMatrix.invertToRef(x.Matrix[1]);
				let i = x.Vector3[1];
				h.TransformCoordinatesToRef(r, x.Matrix[1], i), i.normalize();
				let a = -Math.atan2(i.z, i.x) + Math.PI / 2, o = Math.sqrt(i.x * i.x + i.z * i.z), s = -Math.atan2(i.y, o);
				if (y.RotationYawPitchRollToRef(a, s, 0, x.Quaternion[0]), (this.billboardMode & e.BILLBOARDMODE_ALL) !== e.BILLBOARDMODE_ALL) {
					let t = x.Vector3[1];
					x.Quaternion[0].toEulerAnglesToRef(t), (this.billboardMode & e.BILLBOARDMODE_X) !== e.BILLBOARDMODE_X && (t.x = 0), (this.billboardMode & e.BILLBOARDMODE_Y) !== e.BILLBOARDMODE_Y && (t.y = 0), (this.billboardMode & e.BILLBOARDMODE_Z) !== e.BILLBOARDMODE_Z && (t.z = 0), S.RotationYawPitchRollToRef(t.y, t.x, t.z, x.Matrix[0]);
				} else S.FromQuaternionToRef(x.Quaternion[0], x.Matrix[0]);
				this._worldMatrix.setTranslationFromFloats(0, 0, 0), this._worldMatrix.multiplyToRef(x.Matrix[0], this._worldMatrix), this._worldMatrix.setTranslation(x.Vector3[0]);
			} else {
				let t = x.Vector3[0];
				this._worldMatrix.getTranslationToRef(t), x.Matrix[1].copyFrom(n.getViewMatrix());
				let r = this.getScene().useRightHandedSystem;
				if (r && x.Matrix[1].multiplyToRef(e._TmpRHRestore, x.Matrix[1]), x.Matrix[1].setTranslationFromFloats(0, 0, 0), x.Matrix[1].invertToRef(x.Matrix[0]), (this.billboardMode & e.BILLBOARDMODE_ALL) !== e.BILLBOARDMODE_ALL) {
					x.Matrix[0].decompose(void 0, x.Quaternion[0], void 0);
					let t = x.Vector3[1];
					x.Quaternion[0].toEulerAnglesToRef(t), (this.billboardMode & e.BILLBOARDMODE_X) !== e.BILLBOARDMODE_X && (t.x = 0), (this.billboardMode & e.BILLBOARDMODE_Y) !== e.BILLBOARDMODE_Y && (t.y = 0), (this.billboardMode & e.BILLBOARDMODE_Z) !== e.BILLBOARDMODE_Z && (t.z = 0), r && (t.y += Math.PI), S.RotationYawPitchRollToRef(t.y, t.x, t.z, x.Matrix[0]);
				}
				this._worldMatrix.setTranslationFromFloats(0, 0, 0), this._worldMatrix.multiplyToRef(x.Matrix[0], this._worldMatrix), this._worldMatrix.setTranslation(x.Vector3[0]);
			}
		}
		return this.ignoreNonUniformScaling ? this._updateNonUniformScalingState(!1) : this._scaling.isNonUniformWithinEpsilon(1e-6) ? this._updateNonUniformScalingState(!0) : a && a._nonUniformScaling ? this._updateNonUniformScalingState(a._nonUniformScaling) : this._updateNonUniformScalingState(!1), this._afterComputeWorldMatrix(), this._absolutePosition.copyFromFloats(this._worldMatrix.m[12], this._worldMatrix.m[13], this._worldMatrix.m[14]), this._isAbsoluteSynced = !1, this.onAfterWorldMatrixUpdateObservable.notifyObservers(this), this._poseMatrix ||= S.Invert(this._worldMatrix), this._worldMatrixDeterminantIsDirty = !0, this._worldMatrix;
	}
	resetLocalMatrix(e = !0) {
		if (this.computeWorldMatrix(), e) {
			let e = this.getChildren();
			for (let t = 0; t < e.length; ++t) {
				let n = e[t];
				if (n) {
					n.computeWorldMatrix();
					let e = x.Matrix[0];
					n._localMatrix.multiplyToRef(this._localMatrix, e);
					let t = x.Quaternion[0];
					e.decompose(n.scaling, t, n.position), n.rotationQuaternion ? n.rotationQuaternion.copyFrom(t) : t.toEulerAnglesToRef(n.rotation);
				}
			}
		}
		this.scaling.copyFromFloats(1, 1, 1), this.position.copyFromFloats(0, 0, 0), this.rotation.copyFromFloats(0, 0, 0), this.rotationQuaternion &&= y.Identity(), this._worldMatrix = S.Identity();
	}
	_afterComputeWorldMatrix() {}
	registerAfterWorldMatrixUpdate(e) {
		return this.onAfterWorldMatrixUpdateObservable.add(e), this;
	}
	unregisterAfterWorldMatrixUpdate(e) {
		return this.onAfterWorldMatrixUpdateObservable.removeCallback(e), this;
	}
	getPositionInCameraSpace(e = null) {
		return e ||= this.getScene().activeCamera, h.TransformCoordinates(this.getAbsolutePosition(), e.getViewMatrix());
	}
	getDistanceToCamera(e = null) {
		return e ||= this.getScene().activeCamera, this.getAbsolutePosition().subtract(e.globalPosition).length();
	}
	clone(t, n, r) {
		let i = D.Clone(() => new e(t, this.getScene()), this);
		if (i.name = t, i.id = t, n && (i.parent = n), !r) {
			let e = this.getDescendants(!0);
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				r.clone && r.clone(t + "." + r.name, i);
			}
		}
		return i;
	}
	serialize(e) {
		let t = D.Serialize(this, e);
		return t.type = this.getClassName(), t.uniqueId = this.uniqueId, this.parent && this.parent._serializeAsParent(t), t.localMatrix = this.getPivotMatrix().asArray(), t.isEnabled = this.isEnabled(), D.AppendSerializedAnimations(this, t), t.ranges = this.serializeAnimationRanges(), t;
	}
	static Parse(t, n, r) {
		let i = D.Parse(() => new e(t.name, n), t, n, r);
		if (t.localMatrix ? i.setPreTransformMatrix(S.FromArray(t.localMatrix)) : t.pivotMatrix && i.setPivotMatrix(S.FromArray(t.pivotMatrix)), i.setEnabled(t.isEnabled), i._waitingParsedUniqueId = t.uniqueId, t.parentId !== void 0 && (i._waitingParentId = t.parentId), t.parentInstanceIndex !== void 0 && (i._waitingParentInstanceIndex = t.parentInstanceIndex), t.animations) {
			for (let e = 0; e < t.animations.length; e++) {
				let n = t.animations[e], r = ee("BABYLON.Animation");
				r && i.animations.push(r.Parse(n));
			}
			L.ParseAnimationRanges(i, t, n);
		}
		return t.autoAnimate && n.beginAnimation(i, t.autoAnimateFrom, t.autoAnimateTo, t.autoAnimateLoop, t.autoAnimateSpeed || 1), i;
	}
	getChildTransformNodes(t, n) {
		let r = [];
		return this._getDescendants(r, t, (t) => (!n || n(t)) && t instanceof e), r;
	}
	dispose(e, t = !1) {
		if (this.getScene().stopAnimation(this), this.getScene().removeTransformNode(this), this._parentContainer) {
			let e = this._parentContainer.transformNodes.indexOf(this);
			e > -1 && this._parentContainer.transformNodes.splice(e, 1), this._parentContainer = null;
		}
		if (this.onAfterWorldMatrixUpdateObservable.clear(), e) {
			let e = this.getChildTransformNodes(!0);
			for (let t of e) t.parent = null, t.computeWorldMatrix(!0);
		}
		super.dispose(e, t);
	}
	normalizeToUnitCube(e = !0, t = !1, n) {
		let r = null, i = null;
		t && (this.rotationQuaternion ? (i = this.rotationQuaternion.clone(), this.rotationQuaternion.copyFromFloats(0, 0, 0, 1)) : this.rotation && (r = this.rotation.clone(), this.rotation.copyFromFloats(0, 0, 0)));
		let a = this.getHierarchyBoundingVectors(e, n), o = a.max.subtract(a.min), s = Math.max(o.x, o.y, o.z);
		if (s === 0) return this;
		let c = 1 / s;
		return this.scaling.scaleInPlace(c), t && (this.rotationQuaternion && i ? this.rotationQuaternion.copyFrom(i) : this.rotation && r && this.rotation.copyFrom(r)), this;
	}
	_syncAbsoluteScalingAndRotation() {
		this._isAbsoluteSynced ||= (this._worldMatrix.decompose(this._absoluteScaling, this._absoluteRotationQuaternion), !0);
	}
};
V.BILLBOARDMODE_NONE = 0, V.BILLBOARDMODE_X = 1, V.BILLBOARDMODE_Y = 2, V.BILLBOARDMODE_Z = 4, V.BILLBOARDMODE_ALL = 7, V.BILLBOARDMODE_USE_POSITION = 128, V.BillboardUseParentOrientation = !1, V._TmpRotation = y.Zero(), V._TmpScaling = h.Zero(), V._TmpTranslation = h.Zero(), V._TmpRHRestore = S.Scaling(1, 1, -1), V._LookAtVectorCache = new h(0, 0, 0), V._RotationAxisCache = new y(), M([he("position")], V.prototype, "_position", void 0), M([he("rotation")], V.prototype, "_rotation", void 0), M([_e("rotationQuaternion")], V.prototype, "_rotationQuaternion", void 0), M([he("scaling")], V.prototype, "_scaling", void 0), M([N("billboardMode")], V.prototype, "_billboardMode", void 0), M([N()], V.prototype, "scalingDeterminant", void 0), M([N("infiniteDistance")], V.prototype, "_infiniteDistance", void 0), M([N()], V.prototype, "ignoreNonUniformScaling", void 0), M([N()], V.prototype, "reIntegrateRotationIntoRotationQuaternion", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Collisions/meshCollisionData.js
var $e = class {
	constructor() {
		this._checkCollisions = !1, this._collisionMask = -1, this._collisionGroup = -1, this._surroundingMeshes = null, this._collider = null, this._oldPositionForCollisions = new h(0, 0, 0), this._diffPositionForCollisions = new h(0, 0, 0), this._collisionResponse = !0;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Meshes/abstractMesh.js
function et(e, t, n) {
	let r;
	switch (t) {
		case j.PositionKind:
			r = (e) => e.getPositions();
			break;
		case j.NormalKind:
			r = (e) => e.getNormals();
			break;
		case j.TangentKind:
			r = (e) => e.getTangents();
			break;
		case j.UVKind:
			r = (e) => e.getUVs();
			break;
		case j.UV2Kind:
			r = (e) => e.getUV2s();
			break;
		case j.ColorKind:
			r = (e) => e.getColors();
			break;
		default: return;
	}
	for (let t = 0; t < e.length; t++) {
		let i = e[t];
		for (let a = 0; a < n.numTargets; a++) {
			let o = n.getTarget(a), s = o.influence;
			if (s !== 0) {
				let n = r(o);
				n && (i += (n[t] - e[t]) * s);
			}
		}
		e[t] = i;
	}
}
function tt(e, t, n, r, i, a, o) {
	let s = x.Vector3[0], c = x.Matrix[0], l = x.Matrix[1], u = t === j.NormalKind ? h.TransformNormalFromFloatsToRef : h.TransformCoordinatesFromFloatsToRef;
	for (let t = 0, d = 0; t < e.length; t += 3, d += 4) {
		c.reset();
		let f, p;
		for (f = 0; f < 4; f++) p = i[d + f], p > 0 && (S.FromFloat32ArrayToRefScaled(n, Math.floor(r[d + f] * 16), p, l), c.addToSelf(l));
		if (a && o) for (f = 0; f < 4; f++) p = o[d + f], p > 0 && (S.FromFloat32ArrayToRefScaled(n, Math.floor(a[d + f] * 16), p, l), c.addToSelf(l));
		u(e[t], e[t + 1], e[t + 2], c, s), s.toArray(e, t);
	}
}
var nt = class {
	constructor() {
		this.facetNb = 0, this.partitioningSubdivisions = 10, this.partitioningBBoxRatio = 1.01, this.facetDataEnabled = !1, this.facetParameters = {}, this.bbSize = h.Zero(), this.subDiv = {
			max: 1,
			X: 1,
			Y: 1,
			Z: 1
		}, this.facetDepthSort = !1, this.facetDepthSortEnabled = !1;
	}
}, rt = class {
	constructor() {
		this._hasVertexAlpha = !1, this._useVertexColors = !0, this._numBoneInfluencers = 4, this._applyFog = !0, this._receiveShadows = !1, this._facetData = new nt(), this._visibility = 1, this._skeleton = null, this._layerMask = 268435455, this._computeBonesUsingShaders = !0, this._isActive = !1, this._onlyForInstances = !1, this._isActiveIntermediate = !1, this._onlyForInstancesIntermediate = !1, this._actAsRegularMesh = !1, this._currentLOD = /* @__PURE__ */ new Map(), this._collisionRetryCount = 3, this._morphTargetManager = null, this._renderingGroupId = 0, this._bakedVertexAnimationManager = null, this._material = null, this._positions = null, this._pointerOverDisableMeshTesting = !1, this._meshCollisionData = new $e(), this._enableDistantPicking = !1, this._rawBoundingInfo = null, this._sideOrientationHint = !1, this._wasActiveLastFrame = !1;
	}
}, H = class e extends V {
	static get BILLBOARDMODE_NONE() {
		return V.BILLBOARDMODE_NONE;
	}
	static get BILLBOARDMODE_X() {
		return V.BILLBOARDMODE_X;
	}
	static get BILLBOARDMODE_Y() {
		return V.BILLBOARDMODE_Y;
	}
	static get BILLBOARDMODE_Z() {
		return V.BILLBOARDMODE_Z;
	}
	static get BILLBOARDMODE_ALL() {
		return V.BILLBOARDMODE_ALL;
	}
	static get BILLBOARDMODE_USE_POSITION() {
		return V.BILLBOARDMODE_USE_POSITION;
	}
	get facetNb() {
		return this._internalAbstractMeshDataInfo._facetData.facetNb;
	}
	get partitioningSubdivisions() {
		return this._internalAbstractMeshDataInfo._facetData.partitioningSubdivisions;
	}
	set partitioningSubdivisions(e) {
		this._internalAbstractMeshDataInfo._facetData.partitioningSubdivisions = e;
	}
	get partitioningBBoxRatio() {
		return this._internalAbstractMeshDataInfo._facetData.partitioningBBoxRatio;
	}
	set partitioningBBoxRatio(e) {
		this._internalAbstractMeshDataInfo._facetData.partitioningBBoxRatio = e;
	}
	get mustDepthSortFacets() {
		return this._internalAbstractMeshDataInfo._facetData.facetDepthSort;
	}
	set mustDepthSortFacets(e) {
		this._internalAbstractMeshDataInfo._facetData.facetDepthSort = e;
	}
	get facetDepthSortFrom() {
		return this._internalAbstractMeshDataInfo._facetData.facetDepthSortFrom;
	}
	set facetDepthSortFrom(e) {
		this._internalAbstractMeshDataInfo._facetData.facetDepthSortFrom = e;
	}
	get collisionRetryCount() {
		return this._internalAbstractMeshDataInfo._collisionRetryCount;
	}
	set collisionRetryCount(e) {
		this._internalAbstractMeshDataInfo._collisionRetryCount = e;
	}
	get isFacetDataEnabled() {
		return this._internalAbstractMeshDataInfo._facetData.facetDataEnabled;
	}
	get morphTargetManager() {
		return this._internalAbstractMeshDataInfo._morphTargetManager;
	}
	set morphTargetManager(e) {
		this._internalAbstractMeshDataInfo._morphTargetManager !== e && (this._internalAbstractMeshDataInfo._morphTargetManager = e, this._syncGeometryWithMorphTargetManager());
	}
	get bakedVertexAnimationManager() {
		return this._internalAbstractMeshDataInfo._bakedVertexAnimationManager;
	}
	set bakedVertexAnimationManager(e) {
		this._internalAbstractMeshDataInfo._bakedVertexAnimationManager !== e && (this._internalAbstractMeshDataInfo._bakedVertexAnimationManager = e, this._markSubMeshesAsAttributesDirty());
	}
	_syncGeometryWithMorphTargetManager() {}
	_updateNonUniformScalingState(e) {
		return super._updateNonUniformScalingState(e) ? (this._markSubMeshesAsMiscDirty(), !0) : !1;
	}
	get rawBoundingInfo() {
		return this._internalAbstractMeshDataInfo._rawBoundingInfo;
	}
	set rawBoundingInfo(e) {
		this._internalAbstractMeshDataInfo._rawBoundingInfo = e;
	}
	set onCollide(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver && this.onCollideObservable.remove(this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver), this._internalAbstractMeshDataInfo._meshCollisionData._onCollideObserver = this.onCollideObservable.add(e);
	}
	set onCollisionPositionChange(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver && this.onCollisionPositionChangeObservable.remove(this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver), this._internalAbstractMeshDataInfo._meshCollisionData._onCollisionPositionChangeObserver = this.onCollisionPositionChangeObservable.add(e);
	}
	get visibility() {
		return this._internalAbstractMeshDataInfo._visibility;
	}
	set visibility(e) {
		if (this._internalAbstractMeshDataInfo._visibility === e) return;
		let t = this._internalAbstractMeshDataInfo._visibility;
		this._internalAbstractMeshDataInfo._visibility = e, (t === 1 && e !== 1 || t !== 1 && e === 1) && this._markSubMeshesAsDirty((e) => {
			e.markAsMiscDirty(), e.markAsPrePassDirty();
		});
	}
	get pointerOverDisableMeshTesting() {
		return this._internalAbstractMeshDataInfo._pointerOverDisableMeshTesting;
	}
	set pointerOverDisableMeshTesting(e) {
		this._internalAbstractMeshDataInfo._pointerOverDisableMeshTesting = e;
	}
	get renderingGroupId() {
		return this._internalAbstractMeshDataInfo._renderingGroupId;
	}
	set renderingGroupId(e) {
		this._internalAbstractMeshDataInfo._renderingGroupId = e;
	}
	get material() {
		return this._internalAbstractMeshDataInfo._material;
	}
	set material(e) {
		this._setMaterial(e);
	}
	_setMaterial(e) {
		this._internalAbstractMeshDataInfo._material !== e && (this._internalAbstractMeshDataInfo._material && this._internalAbstractMeshDataInfo._material.meshMap && (this._internalAbstractMeshDataInfo._material.meshMap[this.uniqueId] = void 0), this._internalAbstractMeshDataInfo._material = e, e && e.meshMap && (e.meshMap[this.uniqueId] = this), this.onMaterialChangedObservable.hasObservers() && this.onMaterialChangedObservable.notifyObservers(this), this.subMeshes && (this.resetDrawCache(void 0, e == null), this._unBindEffect()));
	}
	getMaterialForRenderPass(e) {
		return this._internalAbstractMeshDataInfo._materialForRenderPass?.[e];
	}
	setMaterialForRenderPass(e, t) {
		this.resetDrawCache(e), this._internalAbstractMeshDataInfo._materialForRenderPass || (this._internalAbstractMeshDataInfo._materialForRenderPass = []);
		let n = this._internalAbstractMeshDataInfo._materialForRenderPass[e];
		n?.meshMap?.[this.uniqueId] && (n.meshMap[this.uniqueId] = void 0), this._internalAbstractMeshDataInfo._materialForRenderPass[e] = t, t && t.meshMap && (t.meshMap[this.uniqueId] = this);
	}
	get receiveShadows() {
		return this._internalAbstractMeshDataInfo._receiveShadows;
	}
	set receiveShadows(e) {
		this._internalAbstractMeshDataInfo._receiveShadows !== e && (this._internalAbstractMeshDataInfo._receiveShadows = e, this._markSubMeshesAsLightDirty());
	}
	get hasVertexAlpha() {
		return this._internalAbstractMeshDataInfo._hasVertexAlpha;
	}
	set hasVertexAlpha(e) {
		this._internalAbstractMeshDataInfo._hasVertexAlpha !== e && (this._internalAbstractMeshDataInfo._hasVertexAlpha = e, this._markSubMeshesAsAttributesDirty(), this._markSubMeshesAsMiscDirty());
	}
	get useVertexColors() {
		return this._internalAbstractMeshDataInfo._useVertexColors;
	}
	set useVertexColors(e) {
		this._internalAbstractMeshDataInfo._useVertexColors !== e && (this._internalAbstractMeshDataInfo._useVertexColors = e, this._markSubMeshesAsAttributesDirty());
	}
	get computeBonesUsingShaders() {
		return this._internalAbstractMeshDataInfo._computeBonesUsingShaders;
	}
	set computeBonesUsingShaders(e) {
		this._internalAbstractMeshDataInfo._computeBonesUsingShaders !== e && (this._internalAbstractMeshDataInfo._computeBonesUsingShaders = e, this._markSubMeshesAsAttributesDirty());
	}
	get numBoneInfluencers() {
		return this._internalAbstractMeshDataInfo._numBoneInfluencers;
	}
	set numBoneInfluencers(e) {
		this._internalAbstractMeshDataInfo._numBoneInfluencers !== e && (this._internalAbstractMeshDataInfo._numBoneInfluencers = e, this._markSubMeshesAsAttributesDirty());
	}
	get applyFog() {
		return this._internalAbstractMeshDataInfo._applyFog;
	}
	set applyFog(e) {
		this._internalAbstractMeshDataInfo._applyFog !== e && (this._internalAbstractMeshDataInfo._applyFog = e, this._markSubMeshesAsMiscDirty());
	}
	get enableDistantPicking() {
		return this._internalAbstractMeshDataInfo._enableDistantPicking;
	}
	set enableDistantPicking(e) {
		this._internalAbstractMeshDataInfo._enableDistantPicking = e;
	}
	get layerMask() {
		return this._internalAbstractMeshDataInfo._layerMask;
	}
	set layerMask(e) {
		e !== this._internalAbstractMeshDataInfo._layerMask && (this._internalAbstractMeshDataInfo._layerMask = e, this._resyncLightSources());
	}
	get collisionMask() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._collisionMask;
	}
	set collisionMask(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._collisionMask = isNaN(e) ? -1 : e;
	}
	get collisionResponse() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._collisionResponse;
	}
	set collisionResponse(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._collisionResponse = e;
	}
	get collisionGroup() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._collisionGroup;
	}
	set collisionGroup(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._collisionGroup = isNaN(e) ? -1 : e;
	}
	get surroundingMeshes() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._surroundingMeshes;
	}
	set surroundingMeshes(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._surroundingMeshes = e;
	}
	get lightSources() {
		return this._lightSources;
	}
	set skeleton(e) {
		let t = this._internalAbstractMeshDataInfo._skeleton;
		t && t.needInitialSkinMatrix && t._unregisterMeshWithPoseMatrix(this), e && e.needInitialSkinMatrix && e._registerMeshWithPoseMatrix(this), this._internalAbstractMeshDataInfo._skeleton = e, this._internalAbstractMeshDataInfo._skeleton || (this._bonesTransformMatrices = null), this._markSubMeshesAsAttributesDirty();
	}
	get skeleton() {
		return this._internalAbstractMeshDataInfo._skeleton;
	}
	constructor(n, r = null) {
		switch (super(n, r, !1), this._internalAbstractMeshDataInfo = new rt(), this._waitingMaterialId = null, this._waitingMorphTargetManagerId = null, this._waitingSkeletonId = null, this._waitingSkeletonUniqueId = null, this.cullingStrategy = e.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY, this.onCollideObservable = new t(), this.onCollisionPositionChangeObservable = new t(), this.onMaterialChangedObservable = new t(), this.definedFacingForward = !0, this._occlusionQuery = null, this._renderingGroup = null, this.alphaIndex = Number.MAX_VALUE, this.isPickable = !0, this.isNearPickable = !1, this.isNearGrabbable = !1, this.showSubMeshesBoundingBox = !1, this.isBlocker = !1, this.enablePointerMoveEvents = !1, this.outlineColor = E.Red(), this.outlineWidth = .02, this.overlayColor = E.Red(), this.overlayAlpha = .5, this.useOctreeForRenderingSelection = !0, this.useOctreeForPicking = !0, this.useOctreeForCollisions = !0, this.alwaysSelectAsActiveMesh = !1, this.doNotSyncBoundingInfo = !1, this.actionManager = null, this.ellipsoid = new h(.5, 1, .5), this.ellipsoidOffset = new h(0, 0, 0), this.edgesWidth = 1, this.edgesColor = new O(1, 0, 0, 1), this._edgesRenderer = null, this._masterMesh = null, this._boundingInfo = null, this._boundingInfoIsDirty = !0, this._renderId = 0, this._intersectionsInProgress = [], this._unIndexed = !1, this._lightSources = [], this._waitingData = {
			lods: null,
			actions: null,
			freezeWorldMatrix: null
		}, this._bonesTransformMatrices = null, this._transformMatrixTexture = null, this.onRebuildObservable = new t(), this._onCollisionPositionChange = (e, t, n = null) => {
			t.subtractToRef(this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions, this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions), this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions.length() > a.CollisionsEpsilon && this.position.addInPlace(this._internalAbstractMeshDataInfo._meshCollisionData._diffPositionForCollisions), n && this.onCollideObservable.notifyObservers(n), this.onCollisionPositionChangeObservable.notifyObservers(this.position);
		}, r = this.getScene(), r.addMesh(this), this._resyncLightSources(), this._uniformBuffer = new d(this.getScene().getEngine(), void 0, void 0, n, !this.getScene().getEngine().isWebGPU), this._buildUniformLayout(), r.performancePriority) {
			case 2: this.doNotSyncBoundingInfo = !0;
			case 1: this.alwaysSelectAsActiveMesh = !0, this.isPickable = !1;
		}
	}
	_buildUniformLayout() {
		this._uniformBuffer.addUniform("world", 16), this._uniformBuffer.addUniform("visibility", 1), this._uniformBuffer.create();
	}
	transferToEffect(e) {
		let t = this._uniformBuffer;
		t.updateMatrix("world", e), t.updateFloat("visibility", this._internalAbstractMeshDataInfo._visibility), t.update();
	}
	getMeshUniformBuffer() {
		return this._uniformBuffer;
	}
	getClassName() {
		return "AbstractMesh";
	}
	toString(e) {
		let t = "Name: " + this.name + ", isInstance: " + (this.getClassName() === "InstancedMesh" ? "YES" : "NO");
		t += ", # of submeshes: " + (this.subMeshes ? this.subMeshes.length : 0);
		let n = this._internalAbstractMeshDataInfo._skeleton;
		return n && (t += ", skeleton: " + n.name), e && (t += ", billboard mode: " + [
			"NONE",
			"X",
			"Y",
			null,
			"Z",
			null,
			null,
			"ALL"
		][this.billboardMode], t += ", freeze wrld mat: " + (this._isWorldMatrixFrozen || this._waitingData.freezeWorldMatrix ? "YES" : "NO")), t;
	}
	_getEffectiveParent() {
		return this._masterMesh && this.billboardMode !== V.BILLBOARDMODE_NONE ? this._masterMesh : super._getEffectiveParent();
	}
	_getActionManagerForTrigger(e, t = !0) {
		if (this.actionManager && (t || this.actionManager.isRecursive)) {
			if (e) {
				if (this.actionManager.hasSpecificTrigger(e)) return this.actionManager;
			} else return this.actionManager;
		}
		return this.parent ? this.parent._getActionManagerForTrigger(e, !1) : null;
	}
	_releaseRenderPassId(e) {}
	_rebuild(e = !1) {
		if (this.onRebuildObservable.notifyObservers(this), this._occlusionQuery !== null && (this._occlusionQuery = null), this.subMeshes) {
			for (let e of this.subMeshes) e._rebuild();
			this.resetDrawCache();
		}
	}
	_resyncLightSources() {
		this._lightSources.length = 0;
		for (let e of this.getScene().lights) e.isEnabled() && e.canAffectMesh(this) && this._lightSources.push(e);
		this._markSubMeshesAsLightDirty();
	}
	_resyncLightSource(e) {
		let t = e.isEnabled() && e.canAffectMesh(this), n = this._lightSources.indexOf(e), r = !1;
		if (n === -1) {
			if (!t) return;
			this._lightSources.push(e);
		} else {
			if (t) return;
			r = !0, this._lightSources.splice(n, 1);
		}
		this._markSubMeshesAsLightDirty(r);
	}
	_unBindEffect() {
		for (let e of this.subMeshes) e.setEffect(null);
	}
	_removeLightSource(e, t) {
		let n = this._lightSources.indexOf(e);
		n !== -1 && (this._lightSources.splice(n, 1), this._markSubMeshesAsLightDirty(t));
	}
	_markSubMeshesAsDirty(e) {
		if (this.subMeshes) for (let t of this.subMeshes) for (let n = 0; n < t._drawWrappers.length; ++n) {
			let r = t._drawWrappers[n];
			!r || !r.defines || !r.defines.markAllAsDirty || e(r.defines);
		}
	}
	_markSubMeshesAsLightDirty(e = !1) {
		this._markSubMeshesAsDirty((t) => t.markAsLightDirty(e));
	}
	_markSubMeshesAsAttributesDirty() {
		this._markSubMeshesAsDirty((e) => e.markAsAttributesDirty());
	}
	_markSubMeshesAsMiscDirty() {
		this._markSubMeshesAsDirty((e) => e.markAsMiscDirty());
	}
	markAsDirty(e) {
		return this._currentRenderId = Number.MAX_VALUE, super.markAsDirty(e), this._isDirty = !0, this;
	}
	resetDrawCache(e, t = !1) {
		if (this.subMeshes) for (let n of this.subMeshes) n.resetDrawCache(e, t);
	}
	get isBlocked() {
		return !1;
	}
	getLOD(e) {
		return this;
	}
	getTotalVertices() {
		return 0;
	}
	getTotalIndices() {
		return 0;
	}
	getIndices() {
		return null;
	}
	getVerticesData(e) {
		return null;
	}
	setVerticesData(e, t, n, r) {
		return this;
	}
	updateVerticesData(e, t, n, r) {
		return this;
	}
	setIndices(e, t) {
		return this;
	}
	isVerticesDataPresent(e) {
		return !1;
	}
	getBoundingInfo() {
		return this._masterMesh ? this._masterMesh.getBoundingInfo() : (this._boundingInfoIsDirty && (this._boundingInfoIsDirty = !1, this._updateBoundingInfo()), this._boundingInfo);
	}
	getRawBoundingInfo() {
		return this.rawBoundingInfo ?? this.getBoundingInfo();
	}
	setBoundingInfo(e) {
		return this._boundingInfo = e, this;
	}
	get hasBoundingInfo() {
		return this._boundingInfo !== null;
	}
	buildBoundingInfo(e, t, n) {
		return this._boundingInfo = new Ge(e, t, n), this._boundingInfo;
	}
	normalizeToUnitCube(e = !0, t = !1, n) {
		return super.normalizeToUnitCube(e, t, n);
	}
	get useBones() {
		return this.skeleton && this.getScene().skeletonsEnabled && this.isVerticesDataPresent(j.MatricesIndicesKind) && this.isVerticesDataPresent(j.MatricesWeightsKind);
	}
	_preActivate() {}
	_preActivateForIntermediateRendering(e) {}
	_activate(e, t) {
		return this._renderId = e, !0;
	}
	_postActivate() {}
	_freeze() {}
	_unFreeze() {}
	getWorldMatrix() {
		return this._masterMesh && this.billboardMode === V.BILLBOARDMODE_NONE ? this._masterMesh.getWorldMatrix() : super.getWorldMatrix();
	}
	_getWorldMatrixDeterminant() {
		return this._masterMesh ? this._masterMesh._getWorldMatrixDeterminant() : super._getWorldMatrixDeterminant();
	}
	get isAnInstance() {
		return !1;
	}
	get hasInstances() {
		return !1;
	}
	get hasThinInstances() {
		return !1;
	}
	movePOV(e, t, n) {
		return this.position.addInPlace(this.calcMovePOV(e, t, n)), this;
	}
	calcMovePOV(e, t, n) {
		let r = new S();
		(this.rotationQuaternion ? this.rotationQuaternion : y.RotationYawPitchRoll(this.rotation.y, this.rotation.x, this.rotation.z)).toRotationMatrix(r);
		let i = h.Zero(), a = this.definedFacingForward ? -1 : 1;
		return h.TransformCoordinatesFromFloatsToRef(e * a, t, n * a, r, i), i;
	}
	rotatePOV(e, t, n) {
		return this.rotation.addInPlace(this.calcRotatePOV(e, t, n)), this;
	}
	calcRotatePOV(e, t, n) {
		let r = this.definedFacingForward ? 1 : -1;
		return new h(e * r, t, n * r);
	}
	_refreshBoundingInfo(e, t) {
		if (e) {
			let n = Je(e, 0, this.getTotalVertices(), t);
			this._boundingInfo ? this._boundingInfo.reConstruct(n.minimum, n.maximum) : this._boundingInfo = new Ge(n.minimum, n.maximum);
		}
		if (this.subMeshes) for (let t = 0; t < this.subMeshes.length; t++) this.subMeshes[t].refreshBoundingInfo(e);
		this._updateBoundingInfo();
	}
	_refreshBoundingInfoDirect(e) {
		if (this._boundingInfo ? this._boundingInfo.reConstruct(e.minimum, e.maximum) : this._boundingInfo = new Ge(e.minimum, e.maximum), this.subMeshes) for (let e = 0; e < this.subMeshes.length; e++) this.subMeshes[e].refreshBoundingInfo(null);
		this._updateBoundingInfo();
	}
	static _ApplySkeleton(e, t, n, r, i, a, o) {
		tt(e, t, n, r, i, a, o);
	}
	_getData(t, n, r = j.PositionKind) {
		let i = t.cache, a = (e) => {
			if (i) {
				let t = i._vertexData ||= {};
				return t[e] || this.copyVerticesData(e, t), t[e];
			}
			return this.getVerticesData(e);
		};
		if (n ||= a(r), !n) return null;
		if (i ? (i._outputData ? i._outputData.set(n) : i._outputData = new Float32Array(n), n = i._outputData) : (t.applyMorph && this.morphTargetManager || t.applySkeleton && this.skeleton) && (n = n.slice()), t.applyMorph && this.morphTargetManager && et(n, r, this.morphTargetManager), t.applySkeleton && this.skeleton) {
			let t = a(j.MatricesIndicesKind), i = a(j.MatricesWeightsKind);
			if (i && t) {
				let o = this.numBoneInfluencers > 4, s = o ? a(j.MatricesIndicesExtraKind) : null, c = o ? a(j.MatricesWeightsExtraKind) : null, l = this.skeleton.getTransformMatrices(this);
				e._ApplySkeleton(n, r, l, t, i, s, c);
			}
		}
		if (t.updatePositionsArray !== !1 && r === j.PositionKind) {
			let e = this._internalAbstractMeshDataInfo._positions || [], t = e.length;
			if (e.length = n.length / 3, t < e.length) for (let n = t; n < e.length; n++) e[n] = new h();
			for (let t = 0, r = 0; t < e.length; t++, r += 3) e[t].copyFromFloats(n[r], n[r + 1], n[r + 2]);
			this._internalAbstractMeshDataInfo._positions = e;
		}
		return n;
	}
	getNormalsData(e = !1, t = !1) {
		return this._getData({
			applySkeleton: e,
			applyMorph: t,
			updatePositionsArray: !1
		}, null, j.NormalKind);
	}
	getPositionData(e = !1, t = !1, n = null) {
		return this._getData({
			applySkeleton: e,
			applyMorph: t,
			updatePositionsArray: !1
		}, n, j.PositionKind);
	}
	_updateBoundingInfo() {
		return this._boundingInfo ? this._boundingInfo.update(this.worldMatrixFromCache) : this._boundingInfo = new Ge(h.Zero(), h.Zero(), this.worldMatrixFromCache), this._updateSubMeshesBoundingInfo(this.worldMatrixFromCache), this;
	}
	_updateSubMeshesBoundingInfo(e) {
		if (!this.subMeshes) return this;
		let t = this.subMeshes.length;
		for (let n = 0; n < t; n++) {
			let r = this.subMeshes[n];
			(t > 1 || !r.IsGlobal) && r.updateBoundingInfo(e);
		}
		return this;
	}
	_afterComputeWorldMatrix() {
		this.doNotSyncBoundingInfo || (this._boundingInfoIsDirty = !0);
	}
	isInFrustum(e) {
		return this.getBoundingInfo().isInFrustum(e, this.cullingStrategy);
	}
	isCompletelyInFrustum(e) {
		return this.getBoundingInfo().isCompletelyInFrustum(e);
	}
	intersectsMesh(e, t = !1, n) {
		let r = this.getBoundingInfo(), i = e.getBoundingInfo();
		if (r.intersects(i, t)) return !0;
		if (n) {
			for (let n of this.getChildMeshes()) if (n.intersectsMesh(e, t, !0)) return !0;
		}
		return !1;
	}
	intersectsPoint(e) {
		return this.getBoundingInfo().intersectsPoint(e);
	}
	get checkCollisions() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._checkCollisions;
	}
	set checkCollisions(e) {
		this._internalAbstractMeshDataInfo._meshCollisionData._checkCollisions = e;
	}
	get collider() {
		return this._internalAbstractMeshDataInfo._meshCollisionData._collider;
	}
	moveWithCollisions(e, t = !0) {
		this.getAbsolutePosition().addToRef(this.ellipsoidOffset, this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions);
		let n = this.getScene().collisionCoordinator;
		return this._internalAbstractMeshDataInfo._meshCollisionData._collider || (this._internalAbstractMeshDataInfo._meshCollisionData._collider = n.createCollider()), this._internalAbstractMeshDataInfo._meshCollisionData._collider._radius = this.ellipsoid, n.getNewPosition(this._internalAbstractMeshDataInfo._meshCollisionData._oldPositionForCollisions, e, this._internalAbstractMeshDataInfo._meshCollisionData._collider, this.collisionRetryCount, this, this._onCollisionPositionChange, this.uniqueId, t), this;
	}
	_collideForSubMesh(e, t, n) {
		if (this._generatePointsArray(), !this._positions) return this;
		if (!e._lastColliderWorldVertices || !e._lastColliderTransformMatrix.equals(t)) {
			e._lastColliderTransformMatrix = t.clone(), e._lastColliderWorldVertices = [], e._trianglePlanes = [];
			let n = e.verticesStart, r = e.verticesStart + e.verticesCount;
			for (let i = n; i < r; i++) e._lastColliderWorldVertices.push(h.TransformCoordinates(this._positions[i], t));
		}
		return n._collide(e._trianglePlanes, e._lastColliderWorldVertices, this.getIndices(), e.indexStart, e.indexStart + e.indexCount, e.verticesStart, !!e.getMaterial(), this, this._shouldConvertRHS(), e.getMaterial()?.fillMode === 7), this;
	}
	_processCollisionsForSubMeshes(e, t) {
		let n = this._scene.getCollidingSubMeshCandidates(this, e), r = n.length;
		for (let i = 0; i < r; i++) {
			let a = n.data[i];
			r > 1 && !a._checkCollision(e) || this._collideForSubMesh(a, t, e);
		}
		return this;
	}
	_shouldConvertRHS() {
		return !1;
	}
	_checkCollision(e) {
		if (!this.getBoundingInfo()._checkCollision(e)) return this;
		let t = x.Matrix[0], n = x.Matrix[1];
		return S.ScalingToRef(1 / e._radius.x, 1 / e._radius.y, 1 / e._radius.z, t), this.worldMatrixFromCache.multiplyToRef(t, n), this._processCollisionsForSubMeshes(e, n), this;
	}
	_generatePointsArray() {
		return !1;
	}
	intersects(e, t, n, r = !1, i, a = !1) {
		let o = new Ae(), s = this.getClassName(), c = s === "InstancedLinesMesh" || s === "LinesMesh" || s === "GreasedLineMesh" ? this.intersectionThreshold : 0, l = this.getBoundingInfo();
		if (!this.subMeshes || !a && (!e.intersectsSphere(l.boundingSphere, c) || !e.intersectsBox(l.boundingBox, c))) return o;
		if (r) return o.hit = !a, o.pickedMesh = a ? null : this, o.distance = a ? 0 : h.Distance(e.origin, l.boundingSphere.center), o.subMeshId = 0, o;
		if (!this._generatePointsArray()) return o;
		let u = null, d = this._scene.getIntersectingSubMeshCandidates(this, e), f = d.length, p = !1;
		for (let e = 0; e < f; e++) {
			let t = d.data[e].getMaterial();
			if (t && (t.fillMode == 7 || t.fillMode == 0 || t.fillMode == 1 || t.fillMode == 2 || t.fillMode == 4)) {
				p = !0;
				break;
			}
		}
		if (!p) return o.hit = !0, o.pickedMesh = this, o.distance = h.Distance(e.origin, l.boundingSphere.center), o.subMeshId = -1, o;
		for (let r = 0; r < f; r++) {
			let i = d.data[r];
			if (f > 1 && !a && !i.canIntersects(e)) continue;
			let o = i.intersects(e, this._positions, this.getIndices(), t, n);
			if (o && (t || !u || o.distance < u.distance) && (u = o, u.subMeshId = i._id, u._internalSubMeshId = r, t)) break;
		}
		if (u) {
			let t = i ?? this.getWorldMatrix(), n = x.Vector3[0], r = x.Vector3[1];
			h.TransformCoordinatesToRef(e.origin, t, n), e.direction.scaleToRef(u.distance, r);
			let a = h.TransformNormal(r, t).addInPlace(n);
			return o.hit = !0, o.distance = h.Distance(n, a), o.pickedPoint = a, o.pickedMesh = this, o.bu = u.bu || 0, o.bv = u.bv || 0, o.subMeshFaceId = u.faceId, o.faceId = u.faceId + d.data[u._internalSubMeshId].indexStart / (this.getClassName().indexOf("LinesMesh") === -1 ? 3 : 2), o.subMeshId = u.subMeshId, o;
		}
		return o;
	}
	clone(e, t, n) {
		return null;
	}
	releaseSubMeshes(e = !1) {
		if (this.subMeshes) for (; this.subMeshes.length;) this.subMeshes[0].dispose(e);
		else this.subMeshes = [];
		return this;
	}
	dispose(e, t = !1) {
		let n, r = this.getScene();
		for (this._scene.useMaterialMeshMap && this._internalAbstractMeshDataInfo._material && this._internalAbstractMeshDataInfo._material.meshMap && (this._internalAbstractMeshDataInfo._material.meshMap[this.uniqueId] = void 0), r.freeActiveMeshes(), r.freeRenderingGroups(), r.renderingManager.maintainStateBetweenFrames && r.renderingManager.restoreDispachedFlags(), this.actionManager !== void 0 && this.actionManager !== null && (this.actionManager.disposeWhenUnowned && !this._scene.meshes.some((e) => e !== this && e.actionManager === this.actionManager) && this.actionManager.dispose(), this.actionManager = null), this._internalAbstractMeshDataInfo._skeleton = null, this._transformMatrixTexture &&= (this._transformMatrixTexture.dispose(), null), n = 0; n < this._intersectionsInProgress.length; n++) {
			let e = this._intersectionsInProgress[n], t = e._intersectionsInProgress.indexOf(this);
			e._intersectionsInProgress.splice(t, 1);
		}
		this._intersectionsInProgress.length = 0;
		let i = r.lights;
		for (let e of i) {
			let t = e.includedOnlyMeshes.indexOf(this);
			t !== -1 && e.includedOnlyMeshes.splice(t, 1), t = e.excludedMeshes.indexOf(this), t !== -1 && e.excludedMeshes.splice(t, 1);
			let n = e.getShadowGenerators();
			if (n) {
				let e = n.values();
				for (let n = e.next(); n.done !== !0; n = e.next()) {
					let e = n.value.getShadowMap();
					e && e.renderList && (t = e.renderList.indexOf(this), t !== -1 && e.renderList.splice(t, 1));
				}
			}
		}
		(this.getClassName() !== "InstancedMesh" || this.getClassName() !== "InstancedLinesMesh") && this.releaseSubMeshes(!0);
		let a = r.getEngine();
		if (this._occlusionQuery !== null && (this.isOcclusionQueryInProgress = !1, a.deleteQuery(this._occlusionQuery), this._occlusionQuery = null), a.wipeCaches(), r.removeMesh(this), this._parentContainer) {
			let e = this._parentContainer.meshes.indexOf(this);
			e > -1 && this._parentContainer.meshes.splice(e, 1), this._parentContainer = null;
		}
		if (t && this.material && (this.material.getClassName() === "MultiMaterial" ? this.material.dispose(!1, !0, !0) : this.material.dispose(!1, !0)), !e) for (n = 0; n < r.particleSystems.length; n++) r.particleSystems[n].emitter === this && (r.particleSystems[n].dispose(), n--);
		this._internalAbstractMeshDataInfo._facetData.facetDataEnabled && this.disableFacetData(), this._uniformBuffer.dispose(), this.onAfterWorldMatrixUpdateObservable.clear(), this.onCollideObservable.clear(), this.onCollisionPositionChangeObservable.clear(), this.onRebuildObservable.clear(), super.dispose(e, t);
	}
	_initFacetData() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		e.facetNormals ||= [], e.facetPositions ||= [], e.facetPartitioning ||= [], e.facetNb = this.getIndices().length / 3 | 0, e.partitioningSubdivisions = e.partitioningSubdivisions ? e.partitioningSubdivisions : 10, e.partitioningBBoxRatio = e.partitioningBBoxRatio ? e.partitioningBBoxRatio : 1.01;
		for (let t = 0; t < e.facetNb; t++) e.facetNormals[t] = h.Zero(), e.facetPositions[t] = h.Zero();
		return e.facetDataEnabled = !0, this;
	}
	updateFacetData() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		e.facetDataEnabled || this._initFacetData();
		let t = this.getVerticesData(j.PositionKind), n = this.getIndices(), r = this.getVerticesData(j.NormalKind)?.slice(), i = this.getBoundingInfo();
		if (e.facetDepthSort && !e.facetDepthSortEnabled) {
			if (e.facetDepthSortEnabled = !0, n instanceof Uint16Array) e.depthSortedIndices = new Uint16Array(n);
			else if (n instanceof Uint32Array) e.depthSortedIndices = new Uint32Array(n);
			else {
				let t = !1;
				for (let e = 0; e < n.length; e++) if (n[e] > 65535) {
					t = !0;
					break;
				}
				e.depthSortedIndices = t ? new Uint32Array(n) : new Uint16Array(n);
			}
			if (e.facetDepthSortFunction = function(e, t) {
				return t.sqDistance - e.sqDistance;
			}, !e.facetDepthSortFrom) {
				let t = this.getScene().activeCamera;
				e.facetDepthSortFrom = t ? t.position : h.Zero();
			}
			e.depthSortedFacets = [];
			for (let t = 0; t < e.facetNb; t++) {
				let n = {
					ind: t * 3,
					sqDistance: 0
				};
				e.depthSortedFacets.push(n);
			}
			e.invertedMatrix = S.Identity(), e.facetDepthSortOrigin = h.Zero();
		}
		e.bbSize.x = i.maximum.x - i.minimum.x > .001 ? i.maximum.x - i.minimum.x : g, e.bbSize.y = i.maximum.y - i.minimum.y > .001 ? i.maximum.y - i.minimum.y : g, e.bbSize.z = i.maximum.z - i.minimum.z > .001 ? i.maximum.z - i.minimum.z : g;
		let a = e.bbSize.x > e.bbSize.y ? e.bbSize.x : e.bbSize.y;
		if (a = a > e.bbSize.z ? a : e.bbSize.z, e.subDiv.max = e.partitioningSubdivisions, e.subDiv.X = Math.floor(e.subDiv.max * e.bbSize.x / a), e.subDiv.Y = Math.floor(e.subDiv.max * e.bbSize.y / a), e.subDiv.Z = Math.floor(e.subDiv.max * e.bbSize.z / a), e.subDiv.X = e.subDiv.X < 1 ? 1 : e.subDiv.X, e.subDiv.Y = e.subDiv.Y < 1 ? 1 : e.subDiv.Y, e.subDiv.Z = e.subDiv.Z < 1 ? 1 : e.subDiv.Z, e.facetParameters.facetNormals = this.getFacetLocalNormals(), e.facetParameters.facetPositions = this.getFacetLocalPositions(), e.facetParameters.facetPartitioning = this.getFacetLocalPartitioning(), e.facetParameters.bInfo = i, e.facetParameters.bbSize = e.bbSize, e.facetParameters.subDiv = e.subDiv, e.facetParameters.ratio = this.partitioningBBoxRatio, e.facetParameters.depthSort = e.facetDepthSort, e.facetDepthSort && e.facetDepthSortEnabled && (this.computeWorldMatrix(!0), this._worldMatrix.invertToRef(e.invertedMatrix), h.TransformCoordinatesToRef(e.facetDepthSortFrom, e.invertedMatrix, e.facetDepthSortOrigin), e.facetParameters.distanceTo = e.facetDepthSortOrigin), e.facetParameters.depthSortedFacets = e.depthSortedFacets, r && B.ComputeNormals(t, n, r, e.facetParameters), e.facetDepthSort && e.facetDepthSortEnabled) {
			e.depthSortedFacets.sort(e.facetDepthSortFunction);
			let t = e.depthSortedIndices.length / 3 | 0;
			for (let r = 0; r < t; r++) {
				let t = e.depthSortedFacets[r].ind;
				e.depthSortedIndices[r * 3] = n[t], e.depthSortedIndices[r * 3 + 1] = n[t + 1], e.depthSortedIndices[r * 3 + 2] = n[t + 2];
			}
			this.updateIndices(e.depthSortedIndices, void 0, !0);
		}
		return this;
	}
	getFacetLocalNormals() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		return e.facetNormals || this.updateFacetData(), e.facetNormals;
	}
	getFacetLocalPositions() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		return e.facetPositions || this.updateFacetData(), e.facetPositions;
	}
	getFacetLocalPartitioning() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		return e.facetPartitioning || this.updateFacetData(), e.facetPartitioning;
	}
	getFacetPosition(e) {
		let t = h.Zero();
		return this.getFacetPositionToRef(e, t), t;
	}
	getFacetPositionToRef(e, t) {
		let n = this.getFacetLocalPositions()[e], r = this.getWorldMatrix();
		return h.TransformCoordinatesToRef(n, r, t), this;
	}
	getFacetNormal(e) {
		let t = h.Zero();
		return this.getFacetNormalToRef(e, t), t;
	}
	getFacetNormalToRef(e, t) {
		let n = this.getFacetLocalNormals()[e];
		return h.TransformNormalToRef(n, this.getWorldMatrix(), t), this;
	}
	getFacetsAtLocalCoordinates(e, t, n) {
		let r = this.getBoundingInfo(), i = this._internalAbstractMeshDataInfo._facetData, a = Math.floor((e - r.minimum.x * i.partitioningBBoxRatio) * i.subDiv.X * i.partitioningBBoxRatio / i.bbSize.x), o = Math.floor((t - r.minimum.y * i.partitioningBBoxRatio) * i.subDiv.Y * i.partitioningBBoxRatio / i.bbSize.y), s = Math.floor((n - r.minimum.z * i.partitioningBBoxRatio) * i.subDiv.Z * i.partitioningBBoxRatio / i.bbSize.z);
		return a < 0 || a > i.subDiv.max || o < 0 || o > i.subDiv.max || s < 0 || s > i.subDiv.max ? null : i.facetPartitioning[a + i.subDiv.max * o + i.subDiv.max * i.subDiv.max * s];
	}
	getClosestFacetAtCoordinates(e, t, n, r, i = !1, a = !0) {
		let o = this.getWorldMatrix(), s = x.Matrix[5];
		o.invertToRef(s);
		let c = x.Vector3[8];
		h.TransformCoordinatesFromFloatsToRef(e, t, n, s, c);
		let l = this.getClosestFacetAtLocalCoordinates(c.x, c.y, c.z, r, i, a);
		return r && h.TransformCoordinatesFromFloatsToRef(r.x, r.y, r.z, o, r), l;
	}
	getClosestFacetAtLocalCoordinates(e, t, n, r, i = !1, a = !0) {
		let o = null, s, c, l, u, d, f, p, m, h = this.getFacetLocalPositions(), g = this.getFacetLocalNormals(), _ = this.getFacetsAtLocalCoordinates(e, t, n);
		if (!_) return null;
		let v = Number.MAX_VALUE, y, b, x, S;
		for (let C = 0; C < _.length; C++) b = _[C], x = g[b], S = h[b], u = (e - S.x) * x.x + (t - S.y) * x.y + (n - S.z) * x.z, (!i || i && a && u >= 0 || i && !a && u <= 0) && (u = x.x * S.x + x.y * S.y + x.z * S.z, d = -(x.x * e + x.y * t + x.z * n - u) / (x.x * x.x + x.y * x.y + x.z * x.z), f = e + x.x * d, p = t + x.y * d, m = n + x.z * d, s = f - e, c = p - t, l = m - n, y = s * s + c * c + l * l, y < v && (v = y, o = b, r && (r.x = f, r.y = p, r.z = m)));
		return o;
	}
	getFacetDataParameters() {
		return this._internalAbstractMeshDataInfo._facetData.facetParameters;
	}
	disableFacetData() {
		let e = this._internalAbstractMeshDataInfo._facetData;
		return e.facetDataEnabled && (e.facetDataEnabled = !1, e.facetPositions = [], e.facetNormals = [], e.facetPartitioning = [], e.facetParameters = {}, e.depthSortedIndices = /* @__PURE__ */ new Uint32Array()), this;
	}
	updateIndices(e, t, n = !1) {
		return this;
	}
	createNormals(e) {
		let t = this.getVerticesData(j.PositionKind), n = this.getIndices(), r;
		return r = this.isVerticesDataPresent(j.NormalKind) ? this.getVerticesData(j.NormalKind) : [], B.ComputeNormals(t, n, r, { useRightHandedSystem: this.getScene().useRightHandedSystem }), this.setVerticesData(j.NormalKind, r, e), this;
	}
	async optimizeIndicesAsync() {
		let e = this.getIndices();
		if (!e) return this;
		let { OptimizeIndices: t } = await import("./mesh.vertexData.functions-BCSCkO4f.js");
		return t(e), this.setIndices(e, this.getTotalVertices()), this;
	}
	alignWithNormal(e, t) {
		t ||= f.Y;
		let n = x.Vector3[0], r = x.Vector3[1];
		return h.CrossToRef(t, e, r), h.CrossToRef(e, r, n), this.rotationQuaternion ? y.RotationQuaternionFromAxisToRef(n, e, r, this.rotationQuaternion) : h.RotationFromAxisToRef(n, e, r, this.rotation), this;
	}
	_checkOcclusionQuery(e = !1) {
		return !1;
	}
	disableEdgesRendering() {
		throw n("EdgesRenderer");
	}
	enableEdgesRendering(e, t, r) {
		throw n("EdgesRenderer");
	}
	getConnectedParticleSystems() {
		return this._scene.particleSystems.filter((e) => e.emitter === this);
	}
};
H.OCCLUSION_TYPE_NONE = 0, H.OCCLUSION_TYPE_OPTIMISTIC = 1, H.OCCLUSION_TYPE_STRICT = 2, H.OCCLUSION_ALGORITHM_TYPE_ACCURATE = 0, H.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE = 1, H.CULLINGSTRATEGY_STANDARD = 0, H.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY = 1, H.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION = 2, H.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY = 3, M([me.filter((...[e, t, n, r, i]) => !Array.isArray(e) && !Array.isArray(t) && !Array.isArray(n) && !Array.isArray(r) && !Array.isArray(i))], H, "_ApplySkeleton", null), C("BABYLON.AbstractMesh", H);
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialStencilState.js
var U = class {
	constructor() {
		this.reset();
	}
	reset() {
		this.enabled = !1, this.mask = 255, this.funcRef = 1, this.funcMask = 255, this.func = 519, this.opStencilFail = 7680, this.opDepthFail = 7680, this.opStencilDepthPass = 7681, this.backFunc = 519, this.backOpStencilFail = 7680, this.backOpDepthFail = 7680, this.backOpStencilDepthPass = 7681;
	}
	get func() {
		return this._func;
	}
	set func(e) {
		this._func = e;
	}
	get backFunc() {
		return this._backFunc;
	}
	set backFunc(e) {
		this._backFunc = e;
	}
	get funcRef() {
		return this._funcRef;
	}
	set funcRef(e) {
		this._funcRef = e;
	}
	get funcMask() {
		return this._funcMask;
	}
	set funcMask(e) {
		this._funcMask = e;
	}
	get opStencilFail() {
		return this._opStencilFail;
	}
	set opStencilFail(e) {
		this._opStencilFail = e;
	}
	get opDepthFail() {
		return this._opDepthFail;
	}
	set opDepthFail(e) {
		this._opDepthFail = e;
	}
	get opStencilDepthPass() {
		return this._opStencilDepthPass;
	}
	set opStencilDepthPass(e) {
		this._opStencilDepthPass = e;
	}
	get backOpStencilFail() {
		return this._backOpStencilFail;
	}
	set backOpStencilFail(e) {
		this._backOpStencilFail = e;
	}
	get backOpDepthFail() {
		return this._backOpDepthFail;
	}
	set backOpDepthFail(e) {
		this._backOpDepthFail = e;
	}
	get backOpStencilDepthPass() {
		return this._backOpStencilDepthPass;
	}
	set backOpStencilDepthPass(e) {
		this._backOpStencilDepthPass = e;
	}
	get mask() {
		return this._mask;
	}
	set mask(e) {
		this._mask = e;
	}
	get enabled() {
		return this._enabled;
	}
	set enabled(e) {
		this._enabled = e;
	}
	getClassName() {
		return "MaterialStencilState";
	}
	copyTo(e) {
		D.Clone(() => e, this);
	}
	serialize() {
		return D.Serialize(this);
	}
	parse(e, t, n) {
		D.Parse(() => this, e, t, n);
	}
};
M([N()], U.prototype, "func", null), M([N()], U.prototype, "backFunc", null), M([N()], U.prototype, "funcRef", null), M([N()], U.prototype, "funcMask", null), M([N()], U.prototype, "opStencilFail", null), M([N()], U.prototype, "opDepthFail", null), M([N()], U.prototype, "opStencilDepthPass", null), M([N()], U.prototype, "backOpStencilFail", null), M([N()], U.prototype, "backOpDepthFail", null), M([N()], U.prototype, "backOpStencilDepthPass", null), M([N()], U.prototype, "mask", null), M([N()], U.prototype, "enabled", null);
//#endregion
//#region node_modules/@babylonjs/core/Materials/clipPlaneMaterialHelper.js
function it(e) {
	e.indexOf("vClipPlane") === -1 && e.push("vClipPlane"), e.indexOf("vClipPlane2") === -1 && e.push("vClipPlane2"), e.indexOf("vClipPlane3") === -1 && e.push("vClipPlane3"), e.indexOf("vClipPlane4") === -1 && e.push("vClipPlane4"), e.indexOf("vClipPlane5") === -1 && e.push("vClipPlane5"), e.indexOf("vClipPlane6") === -1 && e.push("vClipPlane6");
}
function at(e, t, n) {
	let r = !1, i = !!(e.clipPlane ?? t.clipPlane), a = !!(e.clipPlane2 ?? t.clipPlane2), o = !!(e.clipPlane3 ?? t.clipPlane3), s = !!(e.clipPlane4 ?? t.clipPlane4), c = !!(e.clipPlane5 ?? t.clipPlane5), l = !!(e.clipPlane6 ?? t.clipPlane6);
	return n.CLIPPLANE !== i && (n.CLIPPLANE = i, r = !0), n.CLIPPLANE2 !== a && (n.CLIPPLANE2 = a, r = !0), n.CLIPPLANE3 !== o && (n.CLIPPLANE3 = o, r = !0), n.CLIPPLANE4 !== s && (n.CLIPPLANE4 = s, r = !0), n.CLIPPLANE5 !== c && (n.CLIPPLANE5 = c, r = !0), n.CLIPPLANE6 !== l && (n.CLIPPLANE6 = l, r = !0), r;
}
function ot(e, t, n) {
	let r = t.clipPlane ?? n.clipPlane;
	st(e, "vClipPlane", r), r = t.clipPlane2 ?? n.clipPlane2, st(e, "vClipPlane2", r), r = t.clipPlane3 ?? n.clipPlane3, st(e, "vClipPlane3", r), r = t.clipPlane4 ?? n.clipPlane4, st(e, "vClipPlane4", r), r = t.clipPlane5 ?? n.clipPlane5, st(e, "vClipPlane5", r), r = t.clipPlane6 ?? n.clipPlane6, st(e, "vClipPlane6", r);
}
function st(e, t, n) {
	if (n) {
		let r = Oe.getScene()?.floatingOriginOffset || h.ZeroReadOnly;
		e.setFloat4(t, n.normal.x, n.normal.y, n.normal.z, n.d + h.Dot(n.normal, r));
	}
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialFlags.js
var W = class {
	static get DiffuseTextureEnabled() {
		return this._DiffuseTextureEnabled;
	}
	static set DiffuseTextureEnabled(e) {
		this._DiffuseTextureEnabled !== e && (this._DiffuseTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get BaseWeightTextureEnabled() {
		return this._BaseWeightTextureEnabled;
	}
	static set BaseWeightTextureEnabled(e) {
		this._BaseWeightTextureEnabled !== e && (this._BaseWeightTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get BaseDiffuseRoughnessTextureEnabled() {
		return this._BaseDiffuseRoughnessTextureEnabled;
	}
	static set BaseDiffuseRoughnessTextureEnabled(e) {
		this._BaseDiffuseRoughnessTextureEnabled !== e && (this._BaseDiffuseRoughnessTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get DetailTextureEnabled() {
		return this._DetailTextureEnabled;
	}
	static set DetailTextureEnabled(e) {
		this._DetailTextureEnabled !== e && (this._DetailTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get DecalMapEnabled() {
		return this._DecalMapEnabled;
	}
	static set DecalMapEnabled(e) {
		this._DecalMapEnabled !== e && (this._DecalMapEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get AmbientTextureEnabled() {
		return this._AmbientTextureEnabled;
	}
	static set AmbientTextureEnabled(e) {
		this._AmbientTextureEnabled !== e && (this._AmbientTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get OpacityTextureEnabled() {
		return this._OpacityTextureEnabled;
	}
	static set OpacityTextureEnabled(e) {
		this._OpacityTextureEnabled !== e && (this._OpacityTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get ReflectionTextureEnabled() {
		return this._ReflectionTextureEnabled;
	}
	static set ReflectionTextureEnabled(e) {
		this._ReflectionTextureEnabled !== e && (this._ReflectionTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get EmissiveTextureEnabled() {
		return this._EmissiveTextureEnabled;
	}
	static set EmissiveTextureEnabled(e) {
		this._EmissiveTextureEnabled !== e && (this._EmissiveTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get SpecularTextureEnabled() {
		return this._SpecularTextureEnabled;
	}
	static set SpecularTextureEnabled(e) {
		this._SpecularTextureEnabled !== e && (this._SpecularTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get BumpTextureEnabled() {
		return this._BumpTextureEnabled;
	}
	static set BumpTextureEnabled(e) {
		this._BumpTextureEnabled !== e && (this._BumpTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get LightmapTextureEnabled() {
		return this._LightmapTextureEnabled;
	}
	static set LightmapTextureEnabled(e) {
		this._LightmapTextureEnabled !== e && (this._LightmapTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get RefractionTextureEnabled() {
		return this._RefractionTextureEnabled;
	}
	static set RefractionTextureEnabled(e) {
		this._RefractionTextureEnabled !== e && (this._RefractionTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get ColorGradingTextureEnabled() {
		return this._ColorGradingTextureEnabled;
	}
	static set ColorGradingTextureEnabled(e) {
		this._ColorGradingTextureEnabled !== e && (this._ColorGradingTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get FresnelEnabled() {
		return this._FresnelEnabled;
	}
	static set FresnelEnabled(e) {
		this._FresnelEnabled !== e && (this._FresnelEnabled = e, a.MarkAllMaterialsAsDirty(4));
	}
	static get ClearCoatTextureEnabled() {
		return this._ClearCoatTextureEnabled;
	}
	static set ClearCoatTextureEnabled(e) {
		this._ClearCoatTextureEnabled !== e && (this._ClearCoatTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get ClearCoatBumpTextureEnabled() {
		return this._ClearCoatBumpTextureEnabled;
	}
	static set ClearCoatBumpTextureEnabled(e) {
		this._ClearCoatBumpTextureEnabled !== e && (this._ClearCoatBumpTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get ClearCoatTintTextureEnabled() {
		return this._ClearCoatTintTextureEnabled;
	}
	static set ClearCoatTintTextureEnabled(e) {
		this._ClearCoatTintTextureEnabled !== e && (this._ClearCoatTintTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get SheenTextureEnabled() {
		return this._SheenTextureEnabled;
	}
	static set SheenTextureEnabled(e) {
		this._SheenTextureEnabled !== e && (this._SheenTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get AnisotropicTextureEnabled() {
		return this._AnisotropicTextureEnabled;
	}
	static set AnisotropicTextureEnabled(e) {
		this._AnisotropicTextureEnabled !== e && (this._AnisotropicTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get ThicknessTextureEnabled() {
		return this._ThicknessTextureEnabled;
	}
	static set ThicknessTextureEnabled(e) {
		this._ThicknessTextureEnabled !== e && (this._ThicknessTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get RefractionIntensityTextureEnabled() {
		return this._ThicknessTextureEnabled;
	}
	static set RefractionIntensityTextureEnabled(e) {
		this._RefractionIntensityTextureEnabled !== e && (this._RefractionIntensityTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get TranslucencyIntensityTextureEnabled() {
		return this._TranslucencyIntensityTextureEnabled;
	}
	static set TranslucencyIntensityTextureEnabled(e) {
		this._TranslucencyIntensityTextureEnabled !== e && (this._TranslucencyIntensityTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get TranslucencyColorTextureEnabled() {
		return this._TranslucencyColorTextureEnabled;
	}
	static set TranslucencyColorTextureEnabled(e) {
		this._TranslucencyColorTextureEnabled !== e && (this._TranslucencyColorTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
	static get IridescenceTextureEnabled() {
		return this._IridescenceTextureEnabled;
	}
	static set IridescenceTextureEnabled(e) {
		this._IridescenceTextureEnabled !== e && (this._IridescenceTextureEnabled = e, a.MarkAllMaterialsAsDirty(1));
	}
};
W._DiffuseTextureEnabled = !0, W._BaseWeightTextureEnabled = !0, W._BaseDiffuseRoughnessTextureEnabled = !0, W._DetailTextureEnabled = !0, W._DecalMapEnabled = !0, W._AmbientTextureEnabled = !0, W._OpacityTextureEnabled = !0, W._ReflectionTextureEnabled = !0, W._EmissiveTextureEnabled = !0, W._SpecularTextureEnabled = !0, W._BumpTextureEnabled = !0, W._LightmapTextureEnabled = !0, W._RefractionTextureEnabled = !0, W._ColorGradingTextureEnabled = !0, W._FresnelEnabled = !0, W._ClearCoatTextureEnabled = !0, W._ClearCoatBumpTextureEnabled = !0, W._ClearCoatTintTextureEnabled = !0, W._SheenTextureEnabled = !0, W._AnisotropicTextureEnabled = !0, W._ThicknessTextureEnabled = !0, W._RefractionIntensityTextureEnabled = !0, W._TranslucencyIntensityTextureEnabled = !0, W._TranslucencyColorTextureEnabled = !0, W._IridescenceTextureEnabled = !0;
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialHelper.functions.pure.js
function ct(e, t, n) {
	if (!e || e.LOGARITHMICDEPTH || e.indexOf && e.indexOf("LOGARITHMICDEPTH") >= 0) {
		let e = n.activeCamera;
		e.mode === 1 && s.Error("Logarithmic depth is not compatible with orthographic cameras!", 20), t.setFloat("logarithmicDepthConstant", 2 / (Math.log(e.maxZ + 1) / Math.LN2));
	}
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialHelper.functions.js
var lt = {
	r: 0,
	g: 0,
	b: 0
};
function ut(e, t, n, r = !1) {
	n && e.fogEnabled && (!t || t.applyFog) && e.fogMode !== 0 && (n.setFloat4("vFogInfos", e.fogMode, e.fogStart, e.fogEnd, e.fogDensity), r ? (e.fogColor.toLinearSpaceToRef(lt, e.getEngine().useExactSrgbConversions), n.setColor3("vFogColor", lt)) : n.setColor3("vFogColor", e.fogColor));
}
function dt(t, n, r, i = !0) {
	let a = r.NUM_MORPH_INFLUENCERS;
	if (a > 0 && e.LastCreatedEngine) {
		let o = e.LastCreatedEngine.getCaps().maxVertexAttribs, c = n.morphTargetManager;
		if (c?.isUsingTextureForTargets) return;
		let l = c && c.supportsPositions && i, u = c && c.supportsNormals && r.NORMAL, d = c && c.supportsTangents && r.TANGENT, f = c && c.supportsUVs && r.UV1, p = c && c.supportsUV2s && r.UV2, m = c && c.supportsColors && r.VERTEXCOLOR;
		for (let e = 0; e < a; e++) l && t.push("position" + e), u && t.push("normal" + e), d && t.push("tangent" + e), f && t.push("uv_" + e), p && t.push("uv2_" + e), m && t.push("color" + e), t.length > o && s.Error("Cannot add more vertex attributes for mesh " + n.name);
	}
}
function ft(e, t = !1) {
	e.push("world0"), e.push("world1"), e.push("world2"), e.push("world3"), t && (e.push("previousWorld0"), e.push("previousWorld1"), e.push("previousWorld2"), e.push("previousWorld3"));
}
function pt(e, t) {
	let n = e.morphTargetManager;
	!e || !n || t.setFloatArray("morphTargetInfluences", n.influences);
}
function mt(e, t) {
	t.bindToEffect(e, "Scene");
}
function ht(e, t, n, r, i = null, a = !1, o = !1, s = !1, c = !1, l = !1, u = !1, d = 0) {
	if (e.texturesEnabled && i && W.ReflectionTextureEnabled) {
		if (n.updateMatrix("reflectionMatrix", i.getReflectionTextureMatrix()), n.updateFloat2("vReflectionInfos", i.level * e.iblIntensity, d), s && i.boundingBoxSize) {
			let e = i;
			n.updateVector3("vReflectionPosition", e.boundingBoxPosition), n.updateVector3("vReflectionSize", e.boundingBoxSize);
		}
		if (a) {
			let e = i.getSize().width;
			n.updateFloat2("vReflectionFilteringInfo", e, Math.log2(e));
		}
		if (l && !t.USEIRRADIANCEMAP) {
			let e = i.sphericalPolynomial;
			if (t.USESPHERICALFROMREFLECTIONMAP && e) {
				if (t.SPHERICAL_HARMONICS) {
					let t = e.preScaledHarmonics;
					n.updateVector3("vSphericalL00", t.l00), n.updateVector3("vSphericalL1_1", t.l1_1), n.updateVector3("vSphericalL10", t.l10), n.updateVector3("vSphericalL11", t.l11), n.updateVector3("vSphericalL2_2", t.l2_2), n.updateVector3("vSphericalL2_1", t.l2_1), n.updateVector3("vSphericalL20", t.l20), n.updateVector3("vSphericalL21", t.l21), n.updateVector3("vSphericalL22", t.l22);
				} else n.updateFloat3("vSphericalX", e.x.x, e.x.y, e.x.z), n.updateFloat3("vSphericalY", e.y.x, e.y.y, e.y.z), n.updateFloat3("vSphericalZ", e.z.x, e.z.y, e.z.z), n.updateFloat3("vSphericalXX_ZZ", e.xx.x - e.zz.x, e.xx.y - e.zz.y, e.xx.z - e.zz.z), n.updateFloat3("vSphericalYY_ZZ", e.yy.x - e.zz.x, e.yy.y - e.zz.y, e.yy.z - e.zz.z), n.updateFloat3("vSphericalZZ", e.zz.x, e.zz.y, e.zz.z), n.updateFloat3("vSphericalXY", e.xy.x, e.xy.y, e.xy.z), n.updateFloat3("vSphericalYZ", e.yz.x, e.yz.y, e.yz.z), n.updateFloat3("vSphericalZX", e.zx.x, e.zx.y, e.zx.z);
			}
		} else c && t.USEIRRADIANCEMAP && t.USE_IRRADIANCE_DOMINANT_DIRECTION && n.updateVector3("vReflectionDominantDirection", i.irradianceTexture._dominantDirection);
		o && n.updateFloat3("vReflectionMicrosurfaceInfos", i.getSize().width, i.lodGenerationScale, i.lodGenerationOffset);
	}
	u && n.updateColor3("vReflectionColor", r);
}
function gt(e, t, n) {
	t._needUVs = !0, t[n] = !0, e.optimizeUVAllocation && e.getTextureMatrix().isIdentityAs3x2() ? (t[n + "DIRECTUV"] = e.coordinatesIndex + 1, t["MAINUV" + (e.coordinatesIndex + 1)] = !0) : t[n + "DIRECTUV"] = 0;
}
function _t(e, t, n) {
	let r = e.getTextureMatrix();
	t.updateMatrix(n + "Matrix", r);
}
function vt(e, t, n) {
	n.BAKED_VERTEX_ANIMATION_TEXTURE && n.INSTANCES && e.push("bakedVertexAnimationSettingsInstanced");
}
function yt(e, t) {
	return t.set(e), t;
}
function bt(e, t, n) {
	if (!(!t || !e) && (e.computeBonesUsingShaders && t._bonesComputationForcedToCPU && (e.computeBonesUsingShaders = !1), e.useBones && e.computeBonesUsingShaders && e.skeleton)) {
		let r = e.skeleton;
		if (r.isUsingTextureForMatrices && t.getUniformIndex("boneTextureWidth") > -1) {
			let n = r.getTransformMatrixTexture(e);
			t.setTexture("boneSampler", n), t.setFloat("boneTextureWidth", 4 * (r.bones.length + 1));
		} else {
			let i = r.getTransformMatrices(e);
			i && (t.setMatrices("mBones", i), n && e.getScene().prePassRenderer && e.getScene().prePassRenderer.getIndex(2) && (n.previousBones[e.uniqueId] || (n.previousBones[e.uniqueId] = i.slice()), t.setMatrices("mPreviousBones", n.previousBones[e.uniqueId]), yt(i, n.previousBones[e.uniqueId])));
		}
	}
}
function xt(e, t, n, r, i, a = !0) {
	e._bindLight(t, n, r, i, a);
}
function St(e, t, n, r, i = 4) {
	let a = Math.min(t.lightSources.length, i);
	for (let i = 0; i < a; i++) {
		let a = t.lightSources[i];
		xt(a, i, e, n, typeof r == "boolean" ? r : r.SPECULARTERM, t.receiveShadows);
	}
}
function Ct(e, t, n, r) {
	n.NUM_BONE_INFLUENCERS > 0 && (r.addCPUSkinningFallback(0, t), e.push("matricesIndices"), e.push("matricesWeights"), n.NUM_BONE_INFLUENCERS > 4 && (e.push("matricesIndicesExtra"), e.push("matricesWeightsExtra")));
}
function wt(e, t) {
	(t.INSTANCES || t.THIN_INSTANCES) && ft(e, !!t.PREPASS_VELOCITY), t.INSTANCESCOLOR && e.push("instanceColor");
}
function Tt(e, t, n = 4, r = 0) {
	let i = 0;
	for (let a = 0; a < n && e["LIGHT" + a]; a++) a > 0 && (i = r + a, t.addFallback(i, "LIGHT" + a)), e.SHADOWS || (e["SHADOW" + a] && t.addFallback(r, "SHADOW" + a), e["SHADOWPCF" + a] && t.addFallback(r, "SHADOWPCF" + a), e["SHADOWPCSS" + a] && t.addFallback(r, "SHADOWPCSS" + a), e["SHADOWPOISSON" + a] && t.addFallback(r, "SHADOWPOISSON" + a), e["SHADOWESM" + a] && t.addFallback(r, "SHADOWESM" + a), e["SHADOWCLOSEESM" + a] && t.addFallback(r, "SHADOWCLOSEESM" + a));
	return i;
}
function Et(e, t) {
	return t.fogEnabled && e.applyFog && t.fogMode !== 0;
}
function Dt(e, t, n, r, i, a, o, s = !1, c = !1, l, u) {
	if (o._areMiscDirty) {
		o.LOGARITHMICDEPTH = n, o.POINTSIZE = r, o.FOG = i && Et(e, t), o.NONUNIFORMSCALING = e.nonUniformScaling, o.ALPHATEST = a, o.DECAL_AFTER_DETAIL = s, o.USE_VERTEX_PULLING = c, o.RIGHT_HANDED = t.useRightHandedSystem;
		let d = l?.geometry?.getIndexBuffer();
		o.VERTEX_PULLING_USE_INDEX_BUFFER = !!d, o.VERTEX_PULLING_INDEX_BUFFER_32BITS = d ? d.is32Bits : !1, o.VERTEXOUTPUT_INVARIANT = !!u;
	}
}
function Ot(e, t, n, r, i = 4, a = !1) {
	if (!n._areLightsDirty) return n._needNormals;
	let o = 0, s = {
		needNormals: n._needNormals,
		needRebuild: !1,
		lightmapMode: !1,
		shadowEnabled: !1,
		specularEnabled: !1
	};
	if (e.lightsEnabled && !a) {
		for (let a of t.lightSources) if (At(e, t, a, o, n, r, s), o++, o === i) break;
	}
	n.SPECULARTERM = s.specularEnabled, n.SHADOWS = s.shadowEnabled;
	let c = Math.max(i, n.MAXLIGHTCOUNT || 0);
	for (let e = o; e < c; e++) n["LIGHT" + e] !== void 0 && (n["LIGHT" + e] = !1, n["HEMILIGHT" + e] = !1, n["POINTLIGHT" + e] = !1, n["DIRLIGHT" + e] = !1, n["SPOTLIGHT" + e] = !1, n["AREALIGHT" + e] = !1, n["CLUSTLIGHT" + e] = !1, n["SHADOW" + e] = !1, n["SHADOWCSM" + e] = !1, n["SHADOWCSMDEBUG" + e] = !1, n["SHADOWCSMNUM_CASCADES" + e] = !1, n["SHADOWCSMUSESHADOWMAXZ" + e] = !1, n["SHADOWCSMNOBLEND" + e] = !1, n["SHADOWCSM_RIGHTHANDED" + e] = !1, n["SHADOWPCF" + e] = !1, n["SHADOWPCSS" + e] = !1, n["SHADOWPOISSON" + e] = !1, n["SHADOWESM" + e] = !1, n["SHADOWCLOSEESM" + e] = !1, n["SHADOWCUBE" + e] = !1, n["SHADOWLOWQUALITY" + e] = !1, n["SHADOWMEDIUMQUALITY" + e] = !1);
	n.LIGHTCOUNT = o, n.MAXLIGHTCOUNT = i;
	let l = e.getEngine().getCaps();
	return n.SHADOWFLOAT === void 0 && (s.needRebuild = !0), n.SHADOWFLOAT = s.shadowEnabled && (l.textureFloatRender && l.textureFloatLinearFiltering || l.textureHalfFloatRender && l.textureHalfFloatLinearFiltering), n.LIGHTMAPEXCLUDED = s.lightmapMode, s.needRebuild && n.rebuild(), s.needNormals;
}
function kt(e, t, n, r = !1, i = 8, a = !1) {
	if (t && W.ReflectionTextureEnabled) {
		if (!t.isReadyOrNotBlocking()) return !1;
		n._needNormals = !0, n.REFLECTION = !0, n.GAMMAREFLECTION = t.gammaSpace, n.RGBDREFLECTION = t.isRGBD, n.LODINREFLECTIONALPHA = t.lodLevelInAlpha, n.LINEARSPECULARREFLECTION = t.linearSpecularLOD, n.USEIRRADIANCEMAP = !1;
		let o = e.getEngine();
		switch (r && i > 0 ? (n.NUM_SAMPLES = "" + i, o._features.needTypeSuffixInShaderConstants && (n.NUM_SAMPLES += "u"), n.REALTIME_FILTERING = !0, e.iblCdfGenerator && (n.IBL_CDF_FILTERING = !0)) : n.REALTIME_FILTERING = !1, n.INVERTCUBICMAP = t.coordinatesMode === A.INVCUBIC_MODE, n.REFLECTIONMAP_3D = t.isCube, n.REFLECTIONMAP_OPPOSITEZ = n.REFLECTIONMAP_3D && e.useRightHandedSystem ? !t.invertZ : t.invertZ, n.REFLECTIONMAP_CUBIC = !1, n.REFLECTIONMAP_EXPLICIT = !1, n.REFLECTIONMAP_PLANAR = !1, n.REFLECTIONMAP_PROJECTION = !1, n.REFLECTIONMAP_SKYBOX = !1, n.REFLECTIONMAP_SPHERICAL = !1, n.REFLECTIONMAP_EQUIRECTANGULAR = !1, n.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !1, n.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !1, t.coordinatesMode) {
			case A.EXPLICIT_MODE:
				n.REFLECTIONMAP_EXPLICIT = !0;
				break;
			case A.PLANAR_MODE:
				n.REFLECTIONMAP_PLANAR = !0;
				break;
			case A.PROJECTION_MODE:
				n.REFLECTIONMAP_PROJECTION = !0;
				break;
			case A.SKYBOX_MODE:
				n.REFLECTIONMAP_SKYBOX = !0;
				break;
			case A.SPHERICAL_MODE:
				n.REFLECTIONMAP_SPHERICAL = !0;
				break;
			case A.EQUIRECTANGULAR_MODE:
				n.REFLECTIONMAP_EQUIRECTANGULAR = !0;
				break;
			case A.FIXED_EQUIRECTANGULAR_MODE:
				n.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !0;
				break;
			case A.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
				n.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !0;
				break;
			case A.CUBIC_MODE:
			case A.INVCUBIC_MODE:
			default: n.REFLECTIONMAP_CUBIC = !0, n.USE_LOCAL_REFLECTIONMAP_CUBIC = !!t.boundingBoxSize;
		}
		t.coordinatesMode !== A.SKYBOX_MODE && (t.irradianceTexture ? (n.USEIRRADIANCEMAP = !0, n.USESPHERICALFROMREFLECTIONMAP = !1, n.USESPHERICALINVERTEX = !1, n.USE_IRRADIANCE_DOMINANT_DIRECTION = !!t.irradianceTexture._dominantDirection) : t.isCube && (n.USESPHERICALFROMREFLECTIONMAP = !0, n.USEIRRADIANCEMAP = !1, n.USE_IRRADIANCE_DOMINANT_DIRECTION = !1, n.USESPHERICALINVERTEX = a));
	} else n.REFLECTION = !1, n.REFLECTIONMAP_3D = !1, n.REFLECTIONMAP_SPHERICAL = !1, n.REFLECTIONMAP_PLANAR = !1, n.REFLECTIONMAP_CUBIC = !1, n.USE_LOCAL_REFLECTIONMAP_CUBIC = !1, n.REFLECTIONMAP_PROJECTION = !1, n.REFLECTIONMAP_SKYBOX = !1, n.REFLECTIONMAP_EXPLICIT = !1, n.REFLECTIONMAP_EQUIRECTANGULAR = !1, n.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !1, n.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !1, n.INVERTCUBICMAP = !1, n.USESPHERICALFROMREFLECTIONMAP = !1, n.USEIRRADIANCEMAP = !1, n.USE_IRRADIANCE_DOMINANT_DIRECTION = !1, n.USESPHERICALINVERTEX = !1, n.REFLECTIONMAP_OPPOSITEZ = !1, n.LODINREFLECTIONALPHA = !1, n.GAMMAREFLECTION = !1, n.RGBDREFLECTION = !1, n.LINEARSPECULARREFLECTION = !1;
	return !0;
}
function At(e, t, n, r, i, a, o) {
	switch (o.needNormals = !0, i["LIGHT" + r] === void 0 && (o.needRebuild = !0), i["LIGHT" + r] = !0, i["SPOTLIGHT" + r] = !1, i["HEMILIGHT" + r] = !1, i["POINTLIGHT" + r] = !1, i["DIRLIGHT" + r] = !1, i["AREALIGHT" + r] = !1, i["CLUSTLIGHT" + r] = !1, n.prepareLightSpecificDefines(i, r), i["LIGHT_FALLOFF_PHYSICAL" + r] = !1, i["LIGHT_FALLOFF_GLTF" + r] = !1, i["LIGHT_FALLOFF_STANDARD" + r] = !1, n.falloffType) {
		case m.FALLOFF_GLTF:
			i["LIGHT_FALLOFF_GLTF" + r] = !0;
			break;
		case m.FALLOFF_PHYSICAL:
			i["LIGHT_FALLOFF_PHYSICAL" + r] = !0;
			break;
		case m.FALLOFF_STANDARD: i["LIGHT_FALLOFF_STANDARD" + r] = !0;
	}
	if (a && !n.specular.equalsFloats(0, 0, 0) && (o.specularEnabled = !0), i["SHADOW" + r] = !1, i["SHADOWCSM" + r] = !1, i["SHADOWCSMDEBUG" + r] = !1, i["SHADOWCSMNUM_CASCADES" + r] = !1, i["SHADOWCSMUSESHADOWMAXZ" + r] = !1, i["SHADOWCSMNOBLEND" + r] = !1, i["SHADOWCSM_RIGHTHANDED" + r] = !1, i["SHADOWPCF" + r] = !1, i["SHADOWPCSS" + r] = !1, i["SHADOWPOISSON" + r] = !1, i["SHADOWESM" + r] = !1, i["SHADOWCLOSEESM" + r] = !1, i["SHADOWCUBE" + r] = !1, i["SHADOWLOWQUALITY" + r] = !1, i["SHADOWMEDIUMQUALITY" + r] = !1, t && t.receiveShadows && e.shadowsEnabled && n.shadowEnabled) {
		let t = n.getShadowGenerator(e.activeCamera) ?? n.getShadowGenerator();
		if (t) {
			let e = t.getShadowMap();
			e && e.renderList && e.renderList.length > 0 && (o.shadowEnabled = !0, t.prepareDefines(i, r));
		}
	}
	n.lightmapMode == m.LIGHTMAP_DEFAULT ? (i["LIGHTMAPEXCLUDED" + r] = !1, i["LIGHTMAPNOSPECULAR" + r] = !1) : (o.lightmapMode = !0, i["LIGHTMAPEXCLUDED" + r] = !0, i["LIGHTMAPNOSPECULAR" + r] = n.lightmapMode == m.LIGHTMAP_SHADOWSONLY);
}
function jt(e, t, n, r, i, a = null, o = !1) {
	let s = zt(e, r);
	a !== !1 && (s = at(n, e, r)), r.DEPTHPREPASS !== !t.getColorWrite() && (r.DEPTHPREPASS = !r.DEPTHPREPASS, s = !0), r.INSTANCES !== i && (r.INSTANCES = i, s = !0), r.THIN_INSTANCES !== o && (r.THIN_INSTANCES = o, s = !0), s && r.markAsUnprocessed();
}
function Mt(e, t) {
	if (e.useBones && e.computeBonesUsingShaders && e.skeleton) {
		t.NUM_BONE_INFLUENCERS = e.numBoneInfluencers;
		let n = t.BONETEXTURE !== void 0;
		if (e.skeleton.isUsingTextureForMatrices && n) t.BONETEXTURE = !0;
		else {
			t.BonesPerMesh = e.skeleton.bones.length + 1, t.BONETEXTURE = !n && void 0;
			let r = e.getScene().prePassRenderer;
			r && r.enabled && (t.BONES_VELOCITY_ENABLED = r.excludedSkinnedMesh.indexOf(e) === -1);
		}
	} else t.NUM_BONE_INFLUENCERS = 0, t.BonesPerMesh = 0, t.BONETEXTURE !== void 0 && (t.BONETEXTURE = !1);
}
function Nt(e, t) {
	let n = e.morphTargetManager;
	n ? (t.MORPHTARGETS_UV = n.supportsUVs && t.UV1, t.MORPHTARGETS_UV2 = n.supportsUV2s && t.UV2, t.MORPHTARGETS_TANGENT = n.supportsTangents && t.TANGENT, t.MORPHTARGETS_NORMAL = n.supportsNormals && t.NORMAL, t.MORPHTARGETS_POSITION = n.supportsPositions, t.MORPHTARGETS_COLOR = n.supportsColors, t.MORPHTARGETTEXTURE_HASUVS = n.hasUVs, t.MORPHTARGETTEXTURE_HASUV2S = n.hasUV2s, t.MORPHTARGETTEXTURE_HASTANGENTS = n.hasTangents, t.MORPHTARGETTEXTURE_HASNORMALS = n.hasNormals, t.MORPHTARGETTEXTURE_HASPOSITIONS = n.hasPositions, t.MORPHTARGETTEXTURE_HASCOLORS = n.hasColors, t.NUM_MORPH_INFLUENCERS = n.numMaxInfluencers || n.numInfluencers, t.MORPHTARGETS = t.NUM_MORPH_INFLUENCERS > 0, t.MORPHTARGETS_TEXTURE = n.isUsingTextureForTargets) : (t.MORPHTARGETS_UV = !1, t.MORPHTARGETS_UV2 = !1, t.MORPHTARGETS_TANGENT = !1, t.MORPHTARGETS_NORMAL = !1, t.MORPHTARGETS_POSITION = !1, t.MORPHTARGETS_COLOR = !1, t.MORPHTARGETTEXTURE_HASUVS = !1, t.MORPHTARGETTEXTURE_HASUV2S = !1, t.MORPHTARGETTEXTURE_HASTANGENTS = !1, t.MORPHTARGETTEXTURE_HASNORMALS = !1, t.MORPHTARGETTEXTURE_HASPOSITIONS = !1, t.MORPHTARGETTEXTURE_HAS_COLORS = !1, t.MORPHTARGETS = !1, t.NUM_MORPH_INFLUENCERS = 0);
}
function Pt(e, t) {
	let n = e.bakedVertexAnimationManager;
	t.BAKED_VERTEX_ANIMATION_TEXTURE = !!(n && n.isEnabled);
}
function Ft(e, t, n, r, i = !1, a = !0, o = !0) {
	if (!t._areAttributesDirty && t._needNormals === t._normals && t._needUVs === t._uvs) return !1;
	t._normals = t._needNormals, t._uvs = t._needUVs, t.NORMAL = t._needNormals && e.isVerticesDataPresent("normal"), t._needNormals && e.isVerticesDataPresent("tangent") && (t.TANGENT = !0);
	for (let n = 1; n <= 6; ++n) t["UV" + n] = t._needUVs ? e.isVerticesDataPresent(`uv${n === 1 ? "" : n}`) : !1;
	if (n) {
		let n = e.useVertexColors && e.isVerticesDataPresent("color");
		t.VERTEXCOLOR = n, t.VERTEXALPHA = e.hasVertexAlpha && n && a;
	}
	return e.isVerticesDataPresent("instanceColor") && (e.hasInstances || e.hasThinInstances) && (t.INSTANCESCOLOR = !0), r && Mt(e, t), i && Nt(e, t), o && Pt(e, t), !0;
}
function It(e, t) {
	if (e.activeCamera) {
		let n = t.MULTIVIEW;
		t.MULTIVIEW = e.activeCamera.outputRenderTarget !== null && e.activeCamera.outputRenderTarget.getViewCount() > 1, t.MULTIVIEW != n && t.markAsUnprocessed();
	}
}
function Lt(e, t, n) {
	let r = t.ORDER_INDEPENDENT_TRANSPARENCY, i = t.ORDER_INDEPENDENT_TRANSPARENCY_16BITS;
	t.ORDER_INDEPENDENT_TRANSPARENCY = e.useOrderIndependentTransparency && n, t.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = !e.getEngine().getCaps().textureFloatLinearFiltering, (r !== t.ORDER_INDEPENDENT_TRANSPARENCY || i !== t.ORDER_INDEPENDENT_TRANSPARENCY_16BITS) && t.markAsUnprocessed();
}
function Rt(e, t, n) {
	let r = t.PREPASS;
	if (!t._arePrePassDirty) return;
	let i = [
		{
			type: 1,
			define: "PREPASS_POSITION",
			index: "PREPASS_POSITION_INDEX"
		},
		{
			type: 9,
			define: "PREPASS_LOCAL_POSITION",
			index: "PREPASS_LOCAL_POSITION_INDEX"
		},
		{
			type: 2,
			define: "PREPASS_VELOCITY",
			index: "PREPASS_VELOCITY_INDEX"
		},
		{
			type: 11,
			define: "PREPASS_VELOCITY_LINEAR",
			index: "PREPASS_VELOCITY_LINEAR_INDEX"
		},
		{
			type: 3,
			define: "PREPASS_REFLECTIVITY",
			index: "PREPASS_REFLECTIVITY_INDEX"
		},
		{
			type: 0,
			define: "PREPASS_IRRADIANCE",
			index: "PREPASS_IRRADIANCE_INDEX"
		},
		{
			type: 7,
			define: "PREPASS_ALBEDO_SQRT",
			index: "PREPASS_ALBEDO_SQRT_INDEX"
		},
		{
			type: 5,
			define: "PREPASS_DEPTH",
			index: "PREPASS_DEPTH_INDEX"
		},
		{
			type: 10,
			define: "PREPASS_SCREENSPACE_DEPTH",
			index: "PREPASS_SCREENSPACE_DEPTH_INDEX"
		},
		{
			type: 6,
			define: "PREPASS_NORMAL",
			index: "PREPASS_NORMAL_INDEX"
		},
		{
			type: 8,
			define: "PREPASS_WORLD_NORMAL",
			index: "PREPASS_WORLD_NORMAL_INDEX"
		}
	];
	if (e.prePassRenderer && e.prePassRenderer.enabled && n) {
		t.PREPASS = !0, t.SCENE_MRT_COUNT = e.prePassRenderer.mrtCount, t.PREPASS_NORMAL_WORLDSPACE = e.prePassRenderer.generateNormalsInWorldSpace, t.PREPASS_COLOR = !0, t.PREPASS_COLOR_INDEX = 0;
		for (let n = 0; n < i.length; n++) {
			let r = e.prePassRenderer.getIndex(i[n].type);
			r === -1 ? t[i[n].define] = !1 : (t[i[n].define] = !0, t[i[n].index] = r);
		}
	} else {
		t.PREPASS = !1;
		for (let e = 0; e < i.length; e++) t[i[e].define] = !1;
	}
	t.PREPASS != r && (t.markAsUnprocessed(), t.markAsImageProcessingDirty());
}
function zt(e, t) {
	let n = !1;
	if (e.activeCamera) {
		let r = +!!t.CAMERA_ORTHOGRAPHIC, i = +!!t.CAMERA_PERSPECTIVE, a = +(e.activeCamera.mode === 1), o = +(e.activeCamera.mode === 0);
		(r ^ a || i ^ o) && (t.CAMERA_ORTHOGRAPHIC = a === 1, t.CAMERA_PERSPECTIVE = o === 1, n = !0);
	}
	return n;
}
function Bt(e, t, n, r, i = null, a = !1, o = !1, s = !1, c = !1) {
	i && i.push("Light" + e), !a && (t.push("vLightData" + e, "vLightDiffuse" + e, "vLightSpecular" + e, "vLightDirection" + e, "vLightWidth" + e, "vLightHeight" + e, "vLightFalloff" + e, "vLightGround" + e, "vSliceData" + e, "vSliceRanges" + e, "lightMatrix" + e, "shadowsInfo" + e, "depthValues" + e), n.push("shadowTexture" + e), n.push("depthTexture" + e), t.push("viewFrustumZ" + e, "cascadeBlendFactor" + e, "lightSizeUVCorrection" + e, "depthCorrection" + e, "penumbraDarkness" + e, "frustumLengths" + e), r && (n.push("projectionLightTexture" + e), t.push("textureProjectionMatrix" + e)), o && n.push("iesLightTexture" + e), c && n.push("rectAreaLightEmissionTexture" + e), s && (n.push("lightDataTexture" + e), n.push("tileMaskTexture" + e)));
}
function Vt(e, t, n) {
	let r = [
		"vReflectionMicrosurfaceInfos",
		"vReflectionDominantDirection",
		"reflectionMatrix",
		"vReflectionInfos",
		"vReflectionPosition",
		"vReflectionSize",
		"vReflectionColor",
		"vReflectionFilteringInfo"
	];
	n && r.push("vSphericalX", "vSphericalY", "vSphericalZ", "vSphericalXX_ZZ", "vSphericalYY_ZZ", "vSphericalZZ", "vSphericalXY", "vSphericalYZ", "vSphericalZX", "vSphericalL00", "vSphericalL1_1", "vSphericalL10", "vSphericalL11", "vSphericalL2_2", "vSphericalL2_1", "vSphericalL20", "vSphericalL21", "vSphericalL22"), e.push(...r), t.push("reflectionSampler", "reflectionSamplerLow", "reflectionSamplerHigh", "irradianceSampler", "icdfSampler");
}
function Ht(e, t, n, r = 4) {
	let i, a;
	if (e.uniformsNames) {
		let o = e;
		i = o.uniformsNames, a = o.uniformBuffersNames, t = o.samplers, n = o.defines, r = o.maxSimultaneousLights || 0;
	} else i = e, t ||= [];
	for (let e = 0; e < r && n["LIGHT" + e]; e++) Bt(e, i, t, n["PROJECTEDLIGHTTEXTURE" + e], a, !1, n["IESLIGHTTEXTURE" + e], n["CLUSTLIGHT" + e], n["RECTAREALIGHTEMISSIONTEXTURE" + e]);
	n.NUM_MORPH_INFLUENCERS && (i.push("morphTargetInfluences"), i.push("morphTargetCount")), n.BAKED_VERTEX_ANIMATION_TEXTURE && (i.push("bakedVertexAnimationSettings"), i.push("bakedVertexAnimationTextureSizeInverted"), i.push("bakedVertexAnimationTime"), t.push("bakedVertexAnimationTexture"));
}
function Ut(e, t = !1, n = !1, r = !1, i = !1, a = !1) {
	e.addUniform("vReflectionInfos", 2), e.addUniform("reflectionMatrix", 16), t && e.addUniform("vReflectionMicrosurfaceInfos", 3), n && (e.addUniform("vReflectionPosition", 3), e.addUniform("vReflectionSize", 3)), r && (e.addUniform("vReflectionFilteringInfo", 2), e.addUniform("vReflectionDominantDirection", 3)), a && e.addUniform("vReflectionColor", 3), i && (e.addUniform("vSphericalL00", 3), e.addUniform("vSphericalL1_1", 3), e.addUniform("vSphericalL10", 3), e.addUniform("vSphericalL11", 3), e.addUniform("vSphericalL2_2", 3), e.addUniform("vSphericalL2_1", 3), e.addUniform("vSphericalL20", 3), e.addUniform("vSphericalL21", 3), e.addUniform("vSphericalL22", 3), e.addUniform("vSphericalX", 3), e.addUniform("vSphericalY", 3), e.addUniform("vSphericalZ", 3), e.addUniform("vSphericalXX_ZZ", 3), e.addUniform("vSphericalYY_ZZ", 3), e.addUniform("vSphericalZZ", 3), e.addUniform("vSphericalXY", 3), e.addUniform("vSphericalYZ", 3), e.addUniform("vSphericalZX", 3));
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/material.js
var G = class n {
	get useVertexPulling() {
		return this._useVertexPulling;
	}
	set useVertexPulling(e) {
		this._useVertexPulling !== e && (this._useVertexPulling = e, this.markAsDirty(n.MiscDirtyFlag));
	}
	get _supportGlowLayer() {
		return !1;
	}
	set _glowModeEnabled(e) {}
	get shaderLanguage() {
		return this._shaderLanguage;
	}
	get canRenderToMRT() {
		return !1;
	}
	set alpha(e) {
		if (this._alpha === e) return;
		let t = this._alpha;
		this._alpha = e, (t === 1 || e === 1) && this.markAsDirty(n.MiscDirtyFlag + n.PrePassDirtyFlag);
	}
	get alpha() {
		return this._alpha;
	}
	set backFaceCulling(e) {
		this._backFaceCulling !== e && (this._backFaceCulling = e, this.markAsDirty(n.TextureDirtyFlag));
	}
	get backFaceCulling() {
		return this._backFaceCulling;
	}
	set cullBackFaces(e) {
		this._cullBackFaces !== e && (this._cullBackFaces = e, this.markAsDirty(n.TextureDirtyFlag));
	}
	get cullBackFaces() {
		return this._cullBackFaces;
	}
	get blockDirtyMechanism() {
		return this._blockDirtyMechanism;
	}
	set blockDirtyMechanism(e) {
		this._blockDirtyMechanism !== e && (this._blockDirtyMechanism = e, e || this.markDirty());
	}
	atomicMaterialsUpdate(e) {
		this.blockDirtyMechanism = !0;
		try {
			e(this);
		} finally {
			this.blockDirtyMechanism = !1;
		}
	}
	get hasRenderTargetTextures() {
		return this._eventInfo.hasRenderTargetTextures = !1, this._callbackPluginEventHasRenderTargetTextures(this._eventInfo), this._eventInfo.hasRenderTargetTextures;
	}
	set onDispose(e) {
		this._onDisposeObserver && this.onDisposeObservable.remove(this._onDisposeObserver), this._onDisposeObserver = this.onDisposeObservable.add(e);
	}
	get onBindObservable() {
		return this._onBindObservable ||= new t(), this._onBindObservable;
	}
	set onBind(e) {
		this._onBindObserver && this.onBindObservable.remove(this._onBindObserver), this._onBindObserver = this.onBindObservable.add(e);
	}
	get onUnBindObservable() {
		return this._onUnBindObservable ||= new t(), this._onUnBindObservable;
	}
	get onEffectCreatedObservable() {
		return this._onEffectCreatedObservable ||= new t(), this._onEffectCreatedObservable;
	}
	set alphaMode(e) {
		this._alphaMode[0] !== e && (this._alphaMode[0] = e, this.markAsDirty(n.TextureDirtyFlag));
	}
	get alphaMode() {
		return this._alphaMode[0];
	}
	get alphaModes() {
		return this._alphaMode;
	}
	setAlphaMode(e, t = 0) {
		this._alphaMode[t] !== e && (this._alphaMode[t] = e, this.markAsDirty(n.TextureDirtyFlag));
	}
	set needDepthPrePass(e) {
		this._needDepthPrePass !== e && (this._needDepthPrePass = e, this._needDepthPrePass && (this.checkReadyOnEveryCall = !0));
	}
	get needDepthPrePass() {
		return this._needDepthPrePass;
	}
	get isPrePassCapable() {
		return !1;
	}
	set fogEnabled(e) {
		this._fogEnabled !== e && (this._fogEnabled = e, this.markAsDirty(n.MiscDirtyFlag));
	}
	get fogEnabled() {
		return this._fogEnabled;
	}
	get wireframe() {
		switch (this._fillMode) {
			case n.WireFrameFillMode:
			case n.LineListDrawMode:
			case n.LineLoopDrawMode:
			case n.LineStripDrawMode: return !0;
		}
		return this._scene.forceWireframe;
	}
	set wireframe(e) {
		this.fillMode = e ? n.WireFrameFillMode : n.TriangleFillMode;
	}
	get pointsCloud() {
		switch (this._fillMode) {
			case n.PointFillMode:
			case n.PointListDrawMode: return !0;
		}
		return this._scene.forcePointsCloud;
	}
	set pointsCloud(e) {
		this.fillMode = e ? n.PointFillMode : n.TriangleFillMode;
	}
	get fillMode() {
		return this._fillMode;
	}
	set fillMode(e) {
		this._fillMode !== e && (this._fillMode = e, this.markAsDirty(n.MiscDirtyFlag));
	}
	get useLogarithmicDepth() {
		return this._useLogarithmicDepth;
	}
	set useLogarithmicDepth(e) {
		let t = this.getScene().getEngine().getCaps().fragmentDepthSupported;
		e && !t && s.Warn("Logarithmic depth has been requested for a material on a device that doesn't support it."), this._useLogarithmicDepth = e && t, this._markAllSubMeshesAsMiscDirty();
	}
	get isVertexOutputInvariant() {
		return this._isVertexOutputInvariant;
	}
	set isVertexOutputInvariant(e) {
		this._isVertexOutputInvariant !== e && (this._isVertexOutputInvariant = e, this._markAllSubMeshesAsMiscDirty());
	}
	_getDrawWrapper() {
		return this._drawWrapper;
	}
	_setDrawWrapper(e) {
		this._drawWrapper = e;
	}
	constructor(r, i, a, o = !1) {
		this.shadowDepthWrapper = null, this.allowShaderHotSwapping = !0, this._shaderLanguage = 0, this._forceGLSL = !1, this._useVertexPulling = !1, this.metadata = null, this.reservedDataStore = null, this.checkReadyOnEveryCall = !1, this.checkReadyOnlyOnce = !1, this.state = "", this._alpha = 1, this._backFaceCulling = !0, this._cullBackFaces = !0, this._blockDirtyMechanism = !1, this.sideOrientation = null, this.onCompiled = null, this.onError = null, this.getRenderTargetTextures = null, this.doNotSerialize = !1, this._storeEffectOnSubMeshes = !1, this.animations = null, this.onDisposeObservable = new t(), this._onDisposeObserver = null, this._onUnBindObservable = null, this._onBindObserver = null, this._alphaMode = [2], this._needDepthPrePass = !1, this.disableDepthWrite = !1, this.disableColorWrite = !1, this.forceDepthWrite = !1, this.depthFunction = 0, this.separateCullingPass = !1, this._fogEnabled = !0, this.pointSize = 1, this.zOffset = 0, this.zOffsetUnits = 0, this.stencil = new U(), this._isVertexOutputInvariant = n.ForceVertexOutputInvariant, this._useUBO = !1, this._fillMode = n.TriangleFillMode, this._cachedDepthWriteState = !1, this._cachedColorWriteState = !1, this._cachedDepthFunctionState = 0, this._indexInSceneMaterialArray = -1, this.meshMap = null, this._parentContainer = null, this._uniformBufferLayoutBuilt = !1, this._eventInfo = {}, this._callbackPluginEventGeneric = () => void 0, this._callbackPluginEventIsReadyForSubMesh = () => void 0, this._callbackPluginEventPrepareDefines = () => void 0, this._callbackPluginEventPrepareDefinesBeforeAttributes = () => void 0, this._callbackPluginEventHardBindForSubMesh = () => void 0, this._callbackPluginEventBindForSubMesh = () => void 0, this._callbackPluginEventHasRenderTargetTextures = () => void 0, this._callbackPluginEventFillRenderTargetTextures = () => void 0, this._transparencyMode = null, this.name = r;
		let s = i || e.LastCreatedScene;
		s && (this._scene = s, this._dirtyCallbacks = {}, this._forceGLSL = o, this._dirtyCallbacks[1] = this._markAllSubMeshesAsTexturesDirty.bind(this), this._dirtyCallbacks[2] = this._markAllSubMeshesAsLightsDirty.bind(this), this._dirtyCallbacks[4] = this._markAllSubMeshesAsFresnelDirty.bind(this), this._dirtyCallbacks[8] = this._markAllSubMeshesAsAttributesDirty.bind(this), this._dirtyCallbacks[16] = this._markAllSubMeshesAsMiscDirty.bind(this), this._dirtyCallbacks[32] = this._markAllSubMeshesAsPrePassDirty.bind(this), this._dirtyCallbacks[127] = this._markAllSubMeshesAsAllDirty.bind(this), this.id = r || F.RandomId(), this.uniqueId = this._scene.getUniqueId(), this._materialContext = this._scene.getEngine().createMaterialContext(), this._drawWrapper = new ce(this._scene.getEngine(), !1), this._drawWrapper.materialContext = this._materialContext, this._uniformBuffer = new d(this._scene.getEngine(), void 0, void 0, r), this._useUBO = this.getScene().getEngine().supportsUniformBuffers, this._createUniformBuffer(), a || this._scene.addMaterial(this), this._scene.useMaterialMeshMap && (this.meshMap = {}), n.OnEventObservable.notifyObservers(this, 1));
	}
	_createUniformBuffer() {
		let e = this.getScene().getEngine();
		this._uniformBuffer?.dispose(), e.isWebGPU && !this._forceGLSL ? (this._uniformBuffer = new d(e, void 0, void 0, this.name, !0), this._shaderLanguage = 1) : this._uniformBuffer = new d(this._scene.getEngine(), void 0, void 0, this.name), this._uniformBufferLayoutBuilt = !1;
	}
	toString(e) {
		return "Name: " + this.name;
	}
	getClassName() {
		return "Material";
	}
	get _isMaterial() {
		return !0;
	}
	get isFrozen() {
		return this.checkReadyOnlyOnce;
	}
	freeze() {
		this.markDirty(), this.checkReadyOnlyOnce = !0;
	}
	unfreeze() {
		this.markDirty(), this.checkReadyOnlyOnce = !1;
	}
	isReady(e, t) {
		return !0;
	}
	isReadyForSubMesh(e, t, n) {
		let r = t.materialDefines;
		return r ? (this._eventInfo.isReadyForSubMesh = !0, this._eventInfo.defines = r, this._callbackPluginEventIsReadyForSubMesh(this._eventInfo), this._eventInfo.isReadyForSubMesh) : !1;
	}
	getEffect() {
		return this._drawWrapper.effect;
	}
	getScene() {
		return this._scene;
	}
	_getEffectiveOrientation(e) {
		return this.sideOrientation === null ? e.sideOrientation : this.sideOrientation;
	}
	get transparencyMode() {
		return this._transparencyMode;
	}
	set transparencyMode(e) {
		this._transparencyMode !== e && (this._transparencyMode = e, this._markAllSubMeshesAsTexturesAndMiscDirty());
	}
	get _hasTransparencyMode() {
		return this._transparencyMode != null;
	}
	get _transparencyModeIsBlend() {
		return this._transparencyMode === n.MATERIAL_ALPHABLEND || this._transparencyMode === n.MATERIAL_ALPHATESTANDBLEND;
	}
	get _transparencyModeIsTest() {
		return this._transparencyMode === n.MATERIAL_ALPHATEST || this._transparencyMode === n.MATERIAL_ALPHATESTANDBLEND;
	}
	get _disableAlphaBlending() {
		return this._transparencyMode === n.MATERIAL_OPAQUE || this._transparencyMode === n.MATERIAL_ALPHATEST;
	}
	needAlphaBlending() {
		return this._hasTransparencyMode ? this._transparencyModeIsBlend : !this._disableAlphaBlending && this.alpha < 1;
	}
	needAlphaBlendingForMesh(e) {
		return this._hasTransparencyMode ? this._transparencyModeIsBlend : e.visibility < 1 ? !0 : this._disableAlphaBlending ? !1 : e.hasVertexAlpha || this.needAlphaBlending();
	}
	needAlphaTesting() {
		return this._hasTransparencyMode ? this._transparencyModeIsTest : !1;
	}
	needAlphaTestingForMesh(e) {
		return this._hasTransparencyMode ? this._transparencyModeIsTest : !this.needAlphaBlendingForMesh(e) && this.needAlphaTesting();
	}
	getAlphaTestTexture() {
		return null;
	}
	markDirty(e = !1) {
		let t = this.getScene().meshes;
		for (let n of t) if (n.subMeshes) {
			for (let t of n.subMeshes) if (t.getMaterial() === this) for (let n of t._drawWrappers) n && this._materialContext === n.materialContext && (n._wasPreviouslyReady = !1, n._wasPreviouslyUsingInstances = null, n._forceRebindOnNextCall = e);
		}
		e && this.markAsDirty(n.AllDirtyFlag);
	}
	_preBind(e, t = null) {
		let r = this._scene.getEngine(), i = (t ?? this.sideOrientation) === n.ClockWiseSideOrientation, a = e || this._getDrawWrapper();
		return o(a) && a.materialContext && (a.materialContext.useVertexPulling = this.useVertexPulling), r.enableEffect(a), r.setState(this.backFaceCulling, this.zOffset, !1, i, this._scene._mirroredCameraPosition ? !this.cullBackFaces : this.cullBackFaces, this.stencil, this.zOffsetUnits), i;
	}
	bind(e, t) {}
	buildUniformLayout() {
		let e = this._uniformBuffer;
		this._eventInfo.ubo = e, this._callbackPluginEventGeneric(8, this._eventInfo), e.create(), this._uniformBufferLayoutBuilt = !0;
	}
	bindForSubMesh(e, t, n) {
		let r = n._drawWrapper;
		this._eventInfo.subMesh = n, this._callbackPluginEventBindForSubMesh(this._eventInfo), r._forceRebindOnNextCall = !1;
	}
	bindOnlyWorldMatrix(e) {}
	bindView(e) {
		this._useUBO ? this._needToBindSceneUbo = !0 : e.setMatrix("view", this.getScene().getViewMatrix());
	}
	bindViewProjection(e) {
		this._useUBO ? this._needToBindSceneUbo = !0 : (e.setMatrix("viewProjection", this.getScene().getTransformMatrix()), e.setMatrix("projection", this.getScene().getProjectionMatrix()));
	}
	bindEyePosition(e, t) {
		this._useUBO ? this._needToBindSceneUbo = !0 : this._scene.bindEyePosition(e, t);
	}
	_afterBind(e, t = null, n) {
		if (this._scene._cachedMaterial = this, this._needToBindSceneUbo && t && (this._needToBindSceneUbo = !1, mt(t, this.getScene().getSceneUniformBuffer()), this._scene.finalizeSceneUbo()), e ? this._scene._cachedVisibility = e.visibility : this._scene._cachedVisibility = 1, this._onBindObservable && e && this._onBindObservable.notifyObservers(e), this.disableDepthWrite) {
			let e = this._scene.getEngine();
			this._cachedDepthWriteState = e.getDepthWrite(), e.setDepthWrite(!1);
		}
		if (this.disableColorWrite) {
			let e = this._scene.getEngine();
			this._cachedColorWriteState = e.getColorWrite(), e.setColorWrite(!1);
		}
		if (this.depthFunction !== 0) {
			let e = this._scene.getEngine();
			this._cachedDepthFunctionState = e.getDepthFunction() || 0, e.setDepthFunction(this.depthFunction);
		}
	}
	unbind() {
		this._scene.getSceneUniformBuffer().unbindEffect(), this._onUnBindObservable && this._onUnBindObservable.notifyObservers(this), this.depthFunction !== 0 && this._scene.getEngine().setDepthFunction(this._cachedDepthFunctionState), this.disableDepthWrite && this._scene.getEngine().setDepthWrite(this._cachedDepthWriteState), this.disableColorWrite && this._scene.getEngine().setColorWrite(this._cachedColorWriteState);
	}
	getAnimatables() {
		return this._eventInfo.animatables = [], this._callbackPluginEventGeneric(256, this._eventInfo), this._eventInfo.animatables;
	}
	getActiveTextures() {
		return this._eventInfo.activeTextures = [], this._callbackPluginEventGeneric(512, this._eventInfo), this._eventInfo.activeTextures;
	}
	hasTexture(e) {
		return this._eventInfo.hasTexture = !1, this._eventInfo.texture = e, this._callbackPluginEventGeneric(1024, this._eventInfo), this._eventInfo.hasTexture;
	}
	clone(e) {
		return null;
	}
	_clonePlugins(e, t) {
		let r = {};
		if (this._serializePlugins(r), n._ParsePlugins(r, e, this._scene, t), this.pluginManager) for (let t of this.pluginManager._plugins) {
			let n = e.pluginManager.getPlugin(t.name);
			n && t.copyTo(n);
		}
	}
	getBindedMeshes() {
		if (this.meshMap) {
			let e = [];
			for (let t in this.meshMap) {
				let n = this.meshMap[t];
				n && e.push(n);
			}
			return e;
		}
		return this._scene.meshes.filter((e) => e.material === this);
	}
	forceCompilation(e, t, n, r) {
		let i = {
			clipPlane: !1,
			useInstances: !1,
			...n
		}, a = this.getScene(), o = this.allowShaderHotSwapping;
		this.allowShaderHotSwapping = !1;
		let s = () => {
			if (!this._scene || !this._scene.getEngine()) return;
			let n = a.clipPlane;
			if (i.clipPlane && (a.clipPlane = new ie(0, 0, 0, 1)), this._storeEffectOnSubMeshes) {
				let n = !0, a = null;
				if (e.subMeshes) {
					let t = new Ye(0, 0, 0, 0, 0, e, void 0, !1, !1);
					t.materialDefines && (t.materialDefines._renderId = -1), this.isReadyForSubMesh(e, t, i.useInstances) || (t.effect && t.effect.getCompilationError() && t.effect.allFallbacksProcessed() ? a = t.effect.getCompilationError() : (n = !1, setTimeout(s, 16)));
				}
				n && (this.allowShaderHotSwapping = o, a && r && r(a), t && t(this));
			} else this.isReady() ? (this.allowShaderHotSwapping = o, t && t(this)) : setTimeout(s, 16);
			i.clipPlane && (a.clipPlane = n);
		};
		s();
	}
	async forceCompilationAsync(e, t) {
		return await new Promise((n, r) => {
			this.forceCompilation(e, () => {
				n();
			}, t, (e) => {
				r(e);
			});
		});
	}
	markAsDirty(e) {
		this.getScene().blockMaterialDirtyMechanism || this._blockDirtyMechanism || (n._DirtyCallbackArray.length = 0, e & n.ImageProcessingDirtyFlag && n._DirtyCallbackArray.push(n._ImageProcessingDirtyCallBack), e & n.TextureDirtyFlag && n._DirtyCallbackArray.push(n._TextureDirtyCallBack), e & n.LightDirtyFlag && n._DirtyCallbackArray.push(n._LightsDirtyCallBack), e & n.FresnelDirtyFlag && n._DirtyCallbackArray.push(n._FresnelDirtyCallBack), e & n.AttributesDirtyFlag && n._DirtyCallbackArray.push(n._AttributeDirtyCallBack), e & n.MiscDirtyFlag && n._DirtyCallbackArray.push(n._MiscDirtyCallBack), e & n.PrePassDirtyFlag && n._DirtyCallbackArray.push(n._PrePassDirtyCallBack), n._DirtyCallbackArray.length && this._markAllSubMeshesAsDirty(n._RunDirtyCallBacks), this.getScene().resetCachedMaterial());
	}
	resetDrawCache() {
		let e = this.getScene().meshes;
		for (let t of e) if (t.subMeshes) for (let e of t.subMeshes) e.getMaterial() === this && e.resetDrawCache();
	}
	_markAllSubMeshesAsDirty(e) {
		let t = this.getScene();
		if (t.blockMaterialDirtyMechanism || this._blockDirtyMechanism) return;
		let n = t.meshes;
		for (let r of n) if (r.subMeshes) {
			for (let n of r.subMeshes) if ((n.getMaterial() || (t._hasDefaultMaterial ? t.defaultMaterial : null)) === this) for (let t of n._drawWrappers) !t || !t.defines || !t.defines.markAllAsDirty || this._materialContext === t.materialContext && e(t.defines);
		}
	}
	_markScenePrePassDirty() {
		if (this.getScene().blockMaterialDirtyMechanism || this._blockDirtyMechanism) return;
		let e = this.getScene().enablePrePassRenderer();
		e && e.markAsDirty();
	}
	_markAllSubMeshesAsAllDirty() {
		this._markAllSubMeshesAsDirty(n._AllDirtyCallBack);
	}
	_markAllSubMeshesAsImageProcessingDirty() {
		this._markAllSubMeshesAsDirty(n._ImageProcessingDirtyCallBack);
	}
	_markAllSubMeshesAsTexturesDirty() {
		this._markAllSubMeshesAsDirty(n._TextureDirtyCallBack);
	}
	_markAllSubMeshesAsFresnelDirty() {
		this._markAllSubMeshesAsDirty(n._FresnelDirtyCallBack);
	}
	_markAllSubMeshesAsFresnelAndMiscDirty() {
		this._markAllSubMeshesAsDirty(n._FresnelAndMiscDirtyCallBack);
	}
	_markAllSubMeshesAsLightsDirty() {
		this._markAllSubMeshesAsDirty(n._LightsDirtyCallBack);
	}
	_markAllSubMeshesAsAttributesDirty() {
		this._markAllSubMeshesAsDirty(n._AttributeDirtyCallBack);
	}
	_markAllSubMeshesAsMiscDirty() {
		this._markAllSubMeshesAsDirty(n._MiscDirtyCallBack);
	}
	_markAllSubMeshesAsPrePassDirty() {
		this._markAllSubMeshesAsDirty(n._PrePassDirtyCallBack);
	}
	_markAllSubMeshesAsTexturesAndMiscDirty() {
		this._markAllSubMeshesAsDirty(n._TextureAndMiscDirtyCallBack);
	}
	_checkScenePerformancePriority() {
		if (this._scene.performancePriority !== 0) {
			this.checkReadyOnlyOnce = !0;
			let e = this._scene.onScenePerformancePriorityChangedObservable.addOnce(() => {
				this.checkReadyOnlyOnce = !1;
			});
			this.onDisposeObservable.add(() => {
				this._scene.onScenePerformancePriorityChangedObservable.remove(e);
			});
		}
	}
	setPrePassRenderer(e) {
		return !1;
	}
	dispose(e, t, n) {
		let r = this.getScene();
		if (r.stopAnimation(this), r.freeProcessedMaterials(), r.removeMaterial(this), this._eventInfo.forceDisposeTextures = t, this._callbackPluginEventGeneric(2, this._eventInfo), this._parentContainer) {
			let e = this._parentContainer.materials.indexOf(this);
			e > -1 && this._parentContainer.materials.splice(e, 1), this._parentContainer = null;
		}
		if (n !== !0) {
			if (this.meshMap) for (let e in this.meshMap) {
				let t = this.meshMap[e];
				this._disposeMeshResources(t);
			}
			else {
				let e = r.meshes;
				for (let t of e) this._disposeMeshResources(t);
			}
		}
		this._uniformBuffer.dispose(), this._drawWrapper.effect && (this._storeEffectOnSubMeshes || this._drawWrapper.effect.dispose(), this._drawWrapper.effect = null), this.metadata = null, this.onDisposeObservable.notifyObservers(this), this.onDisposeObservable.clear(), this._onBindObservable && this._onBindObservable.clear(), this._onUnBindObservable && this._onUnBindObservable.clear(), this._onEffectCreatedObservable && this._onEffectCreatedObservable.clear(), this._eventInfo &&= {};
	}
	_disposeMeshResources(e) {
		if (!e) return;
		let t = e.geometry, n = e._internalAbstractMeshDataInfo._materialForRenderPass;
		if (this._storeEffectOnSubMeshes) {
			if (e.subMeshes && n) for (let r of e.subMeshes) {
				let e = r._drawWrappers;
				for (let i = 0; i < e.length; i++) {
					let a = e[i]?.effect;
					a && n[i] === this && (t?._releaseVertexArrayObject(a), r._removeDrawWrapper(i, !0, !0));
				}
			}
		} else t?._releaseVertexArrayObject(this._drawWrapper.effect);
		e.material === this && !e.sourceMesh && (e.material = null);
	}
	serialize() {
		let e = D.Serialize(this);
		return e.stencil = this.stencil.serialize(), e.uniqueId = this.uniqueId, this._serializePlugins(e), e;
	}
	_serializePlugins(e) {
		if (e.plugins = {}, this.pluginManager) for (let t of this.pluginManager._plugins) t.doNotSerialize || (e.plugins[t.getClassName()] = t.serialize());
	}
	static ParseAlphaMode(e, t) {
		t._alphaMode = e._alphaMode === void 0 ? e.alphaMode === void 0 ? [2] : Array.isArray(e.alphaMode) ? e.alphaMode : [e.alphaMode] : Array.isArray(e._alphaMode) ? e._alphaMode : [e._alphaMode];
	}
	static Parse(e, t, r) {
		if (!e.customType) e.customType = "BABYLON.StandardMaterial";
		else if (e.customType === "BABYLON.PBRMaterial" && e.overloadedAlbedo && (e.customType = "BABYLON.LegacyPBRMaterial", !BABYLON.LegacyPBRMaterial)) return s.Error("Your scene is trying to load a legacy version of the PBRMaterial, please, include it from the materials library."), null;
		let i = F.Instantiate(e.customType).Parse(e, t, r);
		return i._loadedUniqueId = e.uniqueId, n.ParseAlphaMode(e, i), i;
	}
	static _ParsePlugins(e, t, n, r) {
		if (e.plugins) for (let i in e.plugins) {
			let a = e.plugins[i], o = t.pluginManager?.getPlugin(a.name);
			if (!o) {
				let e = F.Instantiate("BABYLON." + i);
				e && (o = new e(t));
			}
			o?.parse(a, n, r);
		}
	}
};
G.TriangleFillMode = 0, G.WireFrameFillMode = 1, G.PointFillMode = 2, G.PointListDrawMode = 3, G.LineListDrawMode = 4, G.LineLoopDrawMode = 5, G.LineStripDrawMode = 6, G.TriangleStripDrawMode = 7, G.TriangleFanDrawMode = 8, G.ClockWiseSideOrientation = 0, G.CounterClockWiseSideOrientation = 1, G.ImageProcessingDirtyFlag = 64, G.TextureDirtyFlag = 1, G.LightDirtyFlag = 2, G.FresnelDirtyFlag = 4, G.AttributesDirtyFlag = 8, G.MiscDirtyFlag = 16, G.PrePassDirtyFlag = 32, G.AllDirtyFlag = 127, G.MATERIAL_OPAQUE = 0, G.MATERIAL_ALPHATEST = 1, G.MATERIAL_ALPHABLEND = 2, G.MATERIAL_ALPHATESTANDBLEND = 3, G.MATERIAL_NORMALBLENDMETHOD_WHITEOUT = 0, G.MATERIAL_NORMALBLENDMETHOD_RNM = 1, G.LIGHTFALLOFF_PHYSICAL = 0, G.LIGHTFALLOFF_GLTF = 1, G.LIGHTFALLOFF_STANDARD = 2, G.OnEventObservable = new t(), G.ForceVertexOutputInvariant = !1, G._AllDirtyCallBack = (e) => e.markAllAsDirty(), G._ImageProcessingDirtyCallBack = (e) => e.markAsImageProcessingDirty(), G._TextureDirtyCallBack = (e) => e.markAsTexturesDirty(), G._FresnelDirtyCallBack = (e) => e.markAsFresnelDirty(), G._MiscDirtyCallBack = (e) => e.markAsMiscDirty(), G._PrePassDirtyCallBack = (e) => e.markAsPrePassDirty(), G._LightsDirtyCallBack = (e) => e.markAsLightDirty(), G._AttributeDirtyCallBack = (e) => e.markAsAttributesDirty(), G._FresnelAndMiscDirtyCallBack = (e) => {
	G._FresnelDirtyCallBack(e), G._MiscDirtyCallBack(e);
}, G._TextureAndMiscDirtyCallBack = (e) => {
	G._TextureDirtyCallBack(e), G._MiscDirtyCallBack(e);
}, G._DirtyCallbackArray = [], G._RunDirtyCallBacks = (e) => {
	for (let t of G._DirtyCallbackArray) t(e);
}, M([N()], G.prototype, "id", void 0), M([N()], G.prototype, "uniqueId", void 0), M([N()], G.prototype, "name", void 0), M([N()], G.prototype, "metadata", void 0), M([N()], G.prototype, "checkReadyOnEveryCall", void 0), M([N()], G.prototype, "checkReadyOnlyOnce", void 0), M([N()], G.prototype, "state", void 0), M([N("alpha")], G.prototype, "_alpha", void 0), M([N("backFaceCulling")], G.prototype, "_backFaceCulling", void 0), M([N("cullBackFaces")], G.prototype, "_cullBackFaces", void 0), M([N()], G.prototype, "sideOrientation", void 0), M([N()], G.prototype, "_alphaMode", void 0), M([N()], G.prototype, "_needDepthPrePass", void 0), M([N()], G.prototype, "disableDepthWrite", void 0), M([N()], G.prototype, "disableColorWrite", void 0), M([N()], G.prototype, "forceDepthWrite", void 0), M([N()], G.prototype, "depthFunction", void 0), M([N()], G.prototype, "separateCullingPass", void 0), M([N("fogEnabled")], G.prototype, "_fogEnabled", void 0), M([N()], G.prototype, "pointSize", void 0), M([N()], G.prototype, "zOffset", void 0), M([N()], G.prototype, "zOffsetUnits", void 0), M([N()], G.prototype, "pointsCloud", null), M([N()], G.prototype, "fillMode", null), M([N()], G.prototype, "useLogarithmicDepth", null), M([N()], G.prototype, "_isVertexOutputInvariant", void 0), M([N()], G.prototype, "transparencyMode", null);
//#endregion
//#region node_modules/@babylonjs/core/Materials/multiMaterial.js
var Wt = class e extends G {
	get subMaterials() {
		return this._subMaterials;
	}
	set subMaterials(e) {
		this._subMaterials = e, this._hookArray(e);
	}
	getChildren() {
		return this.subMaterials;
	}
	constructor(e, t) {
		super(e, t, !0), this._waitingSubMaterialsUniqueIds = [], this.getScene().addMultiMaterial(this), this.subMaterials = [], this._storeEffectOnSubMeshes = !0;
	}
	_hookArray(e) {
		let t = e.push;
		e.push = (...n) => {
			let r = t.apply(e, n);
			return this._markAllSubMeshesAsTexturesDirty(), r;
		};
		let n = e.splice;
		e.splice = (t, r) => {
			let i = n.apply(e, [t, r]);
			return this._markAllSubMeshesAsTexturesDirty(), i;
		};
	}
	getSubMaterial(e) {
		return e < 0 || e >= this.subMaterials.length ? this.getScene().defaultMaterial : this.subMaterials[e];
	}
	getActiveTextures() {
		return super.getActiveTextures().concat(...this.subMaterials.map((e) => e ? e.getActiveTextures() : []));
	}
	hasTexture(e) {
		if (super.hasTexture(e)) return !0;
		for (let t = 0; t < this.subMaterials.length; t++) if (this.subMaterials[t]?.hasTexture(e)) return !0;
		return !1;
	}
	getClassName() {
		return "MultiMaterial";
	}
	isReadyForSubMesh(e, t, n) {
		for (let r = 0; r < this.subMaterials.length; r++) {
			let i = this.subMaterials[r];
			if (i) {
				if (i._storeEffectOnSubMeshes) {
					if (!i.isReadyForSubMesh(e, t, n)) return !1;
					continue;
				}
				if (!i.isReady(e)) return !1;
			}
		}
		return !0;
	}
	clone(t, n) {
		let r = new e(t, this.getScene());
		for (let e = 0; e < this.subMaterials.length; e++) {
			let i, a = this.subMaterials[e];
			i = n && a ? a.clone(t + "-" + a.name) : this.subMaterials[e], r.subMaterials.push(i);
		}
		return r;
	}
	serialize() {
		let e = {};
		e.name = this.name, e.id = this.id, e.uniqueId = this.uniqueId, T && (e.tags = T.GetTags(this)), e.materialsUniqueIds = [], e.materials = [];
		for (let t = 0; t < this.subMaterials.length; t++) {
			let n = this.subMaterials[t];
			n ? (e.materialsUniqueIds.push(n.uniqueId), e.materials.push(n.id)) : (e.materialsUniqueIds.push(null), e.materials.push(null));
		}
		return e;
	}
	dispose(e, t, n) {
		let r = this.getScene();
		if (!r) return;
		if (n) for (let n = 0; n < this.subMaterials.length; n++) {
			let r = this.subMaterials[n];
			r && r.dispose(e, t);
		}
		let i = r.multiMaterials.indexOf(this);
		i >= 0 && r.multiMaterials.splice(i, 1), super.dispose(e, t);
	}
	static ParseMultiMaterial(t, n) {
		let r = new e(t.name, n);
		if (r.id = t.id, r._loadedUniqueId = t.uniqueId, T && T.AddTagsTo(r, t.tags), t.materialsUniqueIds) r._waitingSubMaterialsUniqueIds = t.materialsUniqueIds;
		else for (let e of t.materials) r.subMaterials.push(n.getLastMaterialById(e));
		return r;
	}
};
C("BABYLON.MultiMaterial", Wt);
//#endregion
//#region node_modules/@babylonjs/core/Meshes/meshLODLevel.js
var Gt = class {
	constructor(e, t) {
		this.distanceOrScreenCoverage = e, this.mesh = t;
	}
}, Kt = class {
	constructor() {
		this.batchCache = new Jt(this), this.batchCacheReplacementModeInFrozenMode = new Jt(this), this.instancesBufferSize = 2048;
	}
}, qt = class {
	constructor() {
		this.renderPasses = {};
	}
}, Jt = class {
	constructor(e) {
		this.parent = e, this.mustReturn = !1, this.visibleInstances = [], this.renderSelf = [], this.hardwareInstancedRendering = [];
	}
}, Yt = class {
	constructor() {
		this.instancesCount = 0, this.matrixBuffer = null, this.previousMatrixBuffer = null, this.matrixBufferSize = 512, this.matrixData = null, this.boundingVectors = [], this.worldMatrices = null;
	}
}, Xt = class {
	constructor() {
		this._areNormalsFrozen = !1, this._source = null, this.meshMap = null, this._preActivateId = -1, this._LODLevels = [], this._useLODScreenCoverage = !1, this._effectiveMaterial = null, this._forcedInstanceCount = 0, this._overrideRenderingFillMode = null;
	}
}, Zt = {
	source: null,
	parent: null,
	doNotCloneChildren: !1,
	clonePhysicsImpostor: !0,
	cloneThinInstances: !1
}, K = class e extends H {
	static _GetDefaultSideOrientation(t) {
		return t || e.FRONTSIDE;
	}
	get useLODScreenCoverage() {
		return this._internalMeshDataInfo._useLODScreenCoverage;
	}
	set useLODScreenCoverage(e) {
		this._internalMeshDataInfo._useLODScreenCoverage = e, this._sortLODLevels();
	}
	get computeBonesUsingShaders() {
		return this._internalAbstractMeshDataInfo._computeBonesUsingShaders;
	}
	set computeBonesUsingShaders(e) {
		this._internalAbstractMeshDataInfo._computeBonesUsingShaders !== e && (e && this._internalMeshDataInfo._sourcePositions && (this.setVerticesData(j.PositionKind, this._internalMeshDataInfo._sourcePositions, !0), this._internalMeshDataInfo._sourceNormals && this.setVerticesData(j.NormalKind, this._internalMeshDataInfo._sourceNormals, !0), this._internalMeshDataInfo._sourcePositions = null, this._internalMeshDataInfo._sourceNormals = null), this._internalAbstractMeshDataInfo._computeBonesUsingShaders = e, this._markSubMeshesAsAttributesDirty());
	}
	get onBeforeRenderObservable() {
		return this._internalMeshDataInfo._onBeforeRenderObservable || (this._internalMeshDataInfo._onBeforeRenderObservable = new t()), this._internalMeshDataInfo._onBeforeRenderObservable;
	}
	get onBeforeBindObservable() {
		return this._internalMeshDataInfo._onBeforeBindObservable || (this._internalMeshDataInfo._onBeforeBindObservable = new t()), this._internalMeshDataInfo._onBeforeBindObservable;
	}
	get onAfterRenderObservable() {
		return this._internalMeshDataInfo._onAfterRenderObservable || (this._internalMeshDataInfo._onAfterRenderObservable = new t()), this._internalMeshDataInfo._onAfterRenderObservable;
	}
	get onBetweenPassObservable() {
		return this._internalMeshDataInfo._onBetweenPassObservable || (this._internalMeshDataInfo._onBetweenPassObservable = new t()), this._internalMeshDataInfo._onBetweenPassObservable;
	}
	get onBeforeDrawObservable() {
		return this._internalMeshDataInfo._onBeforeDrawObservable || (this._internalMeshDataInfo._onBeforeDrawObservable = new t()), this._internalMeshDataInfo._onBeforeDrawObservable;
	}
	set onBeforeDraw(e) {
		this._onBeforeDrawObserver && this.onBeforeDrawObservable.remove(this._onBeforeDrawObserver), this._onBeforeDrawObserver = this.onBeforeDrawObservable.add(e);
	}
	get hasInstances() {
		return this.instances.length > 0;
	}
	get hasThinInstances() {
		return (this.forcedInstanceCount || this._thinInstanceDataStorage.instancesCount || 0) > 0;
	}
	get forcedInstanceCount() {
		return this._internalMeshDataInfo._forcedInstanceCount;
	}
	set forcedInstanceCount(e) {
		this._internalMeshDataInfo._forcedInstanceCount = e;
	}
	get sideOrientation() {
		return this._internalMeshDataInfo._sideOrientation;
	}
	set sideOrientation(e) {
		this._internalMeshDataInfo._sideOrientation = e, this._internalAbstractMeshDataInfo._sideOrientationHint = this._scene.useRightHandedSystem && e === 1 || !this._scene.useRightHandedSystem && e === 0;
	}
	get _effectiveSideOrientation() {
		return this._internalMeshDataInfo._effectiveSideOrientation;
	}
	get overrideMaterialSideOrientation() {
		return this.sideOrientation;
	}
	set overrideMaterialSideOrientation(e) {
		this.sideOrientation = e, this.material && (this.material.sideOrientation = null);
	}
	get overrideRenderingFillMode() {
		return this._internalMeshDataInfo._overrideRenderingFillMode;
	}
	set overrideRenderingFillMode(e) {
		this._internalMeshDataInfo._overrideRenderingFillMode = e;
	}
	get material() {
		return this._internalAbstractMeshDataInfo._material;
	}
	set material(e) {
		e && (this.material && this.material.sideOrientation === null || this._internalAbstractMeshDataInfo._sideOrientationHint) && (e.sideOrientation = null), this._setMaterial(e);
	}
	get source() {
		return this._internalMeshDataInfo._source;
	}
	get cloneMeshMap() {
		return this._internalMeshDataInfo.meshMap;
	}
	get isUnIndexed() {
		return this._unIndexed;
	}
	set isUnIndexed(e) {
		this._unIndexed !== e && (this._unIndexed = e, this._markSubMeshesAsAttributesDirty());
	}
	get worldMatrixInstancedBuffer() {
		let e = this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass : this._instanceDataStorage.renderPasses[this._instanceDataStorage.engine.currentRenderPassId];
		return e ? e.instancesData : void 0;
	}
	get previousWorldMatrixInstancedBuffer() {
		let e = this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass : this._instanceDataStorage.renderPasses[this._instanceDataStorage.engine.currentRenderPassId];
		return e ? e.instancesPreviousData : void 0;
	}
	get manualUpdateOfWorldMatrixInstancedBuffer() {
		return this._instanceDataStorage.manualUpdate;
	}
	set manualUpdateOfWorldMatrixInstancedBuffer(e) {
		this._instanceDataStorage.manualUpdate = e;
	}
	get manualUpdateOfPreviousWorldMatrixInstancedBuffer() {
		return this._instanceDataStorage.previousManualUpdate;
	}
	set manualUpdateOfPreviousWorldMatrixInstancedBuffer(e) {
		this._instanceDataStorage.previousManualUpdate = e;
	}
	get forceWorldMatrixInstancedBufferUpdate() {
		return this._instanceDataStorage.forceMatrixUpdates;
	}
	set forceWorldMatrixInstancedBufferUpdate(e) {
		this._instanceDataStorage.forceMatrixUpdates = e;
	}
	_copySource(e, t, n = !0, r = !1) {
		let i = this.getScene();
		if (e._geometry && e._geometry.applyToMesh(this), be.DeepCopy(e, this, /* @__PURE__ */ "name.material.skeleton.instances.parent.uniqueId.source.metadata.morphTargetManager.hasInstances.worldMatrixInstancedBuffer.previousWorldMatrixInstancedBuffer.hasLODLevels.geometry.isBlocked.areNormalsFrozen.facetNb.isFacetDataEnabled.lightSources.useBones.isAnInstance.collider.edgesRenderer.forward.up.right.absolutePosition.absoluteScaling.absoluteRotationQuaternion.isWorldMatrixFrozen.nonUniformScaling.behaviors.worldMatrixFromCache.hasThinInstances.cloneMeshMap.hasBoundingInfo.physicsBody.physicsImpostor".split("."), ["_poseMatrix"]), this._internalMeshDataInfo._source = e, i.useClonedMeshMap && (e._internalMeshDataInfo.meshMap || (e._internalMeshDataInfo.meshMap = {}), e._internalMeshDataInfo.meshMap[this.uniqueId] = this), this._originalBuilderSideOrientation = e._originalBuilderSideOrientation, this._creationDataStorage = e._creationDataStorage, e._ranges) {
			let t = e._ranges;
			for (let e in t) Object.prototype.hasOwnProperty.call(t, e) && t[e] && this.createAnimationRange(e, t[e].from, t[e].to);
		}
		if (this.metadata = e.metadata && e.metadata.clone ? e.metadata.clone() : e.metadata, this._internalMetadata = e._internalMetadata, T && T.HasTags(e) && T.AddTagsTo(this, T.GetTags(e, !0)), this.setEnabled(e.isEnabled(!1)), this.parent = e.parent, this.setPivotMatrix(e.getPivotMatrix(), this._postMultiplyPivotMatrix), this.id = this.name + "." + e.id, this.material = e.material, !t) {
			let i = e.getDescendants(!0);
			for (let e = 0; e < i.length; e++) {
				let a = i[e];
				a._isMesh ? (Zt.parent = this, Zt.doNotCloneChildren = t, Zt.clonePhysicsImpostor = n, Zt.cloneThinInstances = r, a.clone(this.name + "." + a.name, Zt)) : a.clone && a.clone(this.name + "." + a.name, this);
			}
		}
		if (e.morphTargetManager && (this.morphTargetManager = e.morphTargetManager), i.getPhysicsEngine) {
			let t = i.getPhysicsEngine();
			if (n && t) {
				if (t.getPluginVersion() === 1) {
					let n = t.getImpostorForPhysicsObject(e);
					n && (this.physicsImpostor = n.clone(this));
				} else t.getPluginVersion() === 2 && e.physicsBody && e.physicsBody.clone(this);
			}
		}
		for (let t = 0; t < i.particleSystems.length; t++) {
			let n = i.particleSystems[t];
			n.emitter === e && n.clone(n.name, this);
		}
		if (this.skeleton = e.skeleton, r && (e._thinInstanceDataStorage.matrixData ? (this.thinInstanceSetBuffer("matrix", new Float32Array(e._thinInstanceDataStorage.matrixData), 16, !e._thinInstanceDataStorage.matrixBuffer.isUpdatable()), this._thinInstanceDataStorage.matrixBufferSize = e._thinInstanceDataStorage.matrixBufferSize, this._thinInstanceDataStorage.instancesCount = e._thinInstanceDataStorage.instancesCount) : this._thinInstanceDataStorage.matrixBufferSize = e._thinInstanceDataStorage.matrixBufferSize, e._userThinInstanceBuffersStorage)) {
			let t = e._userThinInstanceBuffersStorage;
			for (let e in t.data) this.thinInstanceSetBuffer(e, new Float32Array(t.data[e]), t.strides[e], !t.vertexBuffers?.[e]?.isUpdatable()), this._userThinInstanceBuffersStorage.sizes[e] = t.sizes[e];
		}
		this.refreshBoundingInfo(!0, !0), this.computeWorldMatrix(!0);
	}
	constructor(n, r = null, i = null, a = null, o, s = !0) {
		super(n, r), this._internalMeshDataInfo = new Xt(), this.delayLoadState = 0, this.instances = [], this._creationDataStorage = null, this._geometry = null, this._thinInstanceDataStorage = new Yt(), this._shouldGenerateFlatShading = !1, this._originalBuilderSideOrientation = e.DEFAULTSIDE, this.ignoreCameraMaxZ = !1, r = this.getScene(), this._instanceDataStorage = new qt(), this._instanceDataStorage.engine = r.getEngine(), this._instanceDataStorage.useMonoDataStorageRenderPass = !this._instanceDataStorage.engine.isWebGPU, this._instanceDataStorage.useMonoDataStorageRenderPass && (this._instanceDataStorage.dataStorageRenderPass = new Kt()), this.sideOrientation = +!this._scene.useRightHandedSystem, this._onBeforeDraw = (e, t, n) => {
			e && n && (this._uniformBuffer ? this.transferToEffect(t) : n.bindOnlyWorldMatrix(t));
		};
		let c, l = !1;
		if (i && i._addToSceneRootNodes === void 0) {
			let e = i;
			c = e.parent ?? null, a = e.source ?? null, o = e.doNotCloneChildren ?? !1, s = e.clonePhysicsImpostor ?? !0, l = e.cloneThinInstances ?? !1;
		} else c = i;
		a && this._copySource(a, o, s, l), c !== null && (this.parent = c), this._instanceDataStorage.hardwareInstancedRendering = this.getEngine().getCaps().instancedArrays, this._internalMeshDataInfo._onMeshReadyObserverAdded = (e) => {
			e.unregisterOnNextCall = !0, this.isReady(!0) ? this.onMeshReadyObservable.notifyObservers(this) : this._internalMeshDataInfo._checkReadinessObserver || (this._internalMeshDataInfo._checkReadinessObserver = this._scene.onBeforeRenderObservable.add(() => {
				this.isReady(!0) && (this._scene.onBeforeRenderObservable.remove(this._internalMeshDataInfo._checkReadinessObserver), this._internalMeshDataInfo._checkReadinessObserver = null, this.onMeshReadyObservable.notifyObservers(this));
			}));
		}, this.onMeshReadyObservable = new t(this._internalMeshDataInfo._onMeshReadyObserverAdded), a && a.onClonedObservable.notifyObservers(this);
	}
	instantiateHierarchy(e = null, t, n) {
		let r = this.getTotalVertices() === 0 || t && t.doNotInstantiate && (t.doNotInstantiate === !0 || t.doNotInstantiate(this)) ? this.clone("Clone of " + (this.name || this.id), e || this.parent, !0) : this.createInstance("instance of " + (this.name || this.id));
		r.parent = e || this.parent, r.position = this.position.clone(), r.scaling = this.scaling.clone(), this.rotationQuaternion ? r.rotationQuaternion = this.rotationQuaternion.clone() : r.rotation = this.rotation.clone(), n && n(this, r);
		for (let e of this.getChildTransformNodes(!0)) e.getClassName() === "InstancedMesh" && r.getClassName() === "Mesh" && e.sourceMesh === this ? e.instantiateHierarchy(r, {
			doNotInstantiate: t && t.doNotInstantiate || !1,
			newSourcedMesh: r
		}, n) : e.instantiateHierarchy(r, t, n);
		return r;
	}
	getClassName() {
		return "Mesh";
	}
	get _isMesh() {
		return !0;
	}
	toString(e) {
		let t = super.toString(e);
		if (t += ", n vertices: " + this.getTotalVertices(), t += ", parent: " + (this._waitingParentId ? this._waitingParentId : this.parent ? this.parent.name : "NONE"), this.animations) for (let n = 0; n < this.animations.length; n++) t += ", animation[0]: " + this.animations[n].toString(e);
		if (e) {
			if (this._geometry) {
				let e = this.getIndices(), n = this.getVerticesData(j.PositionKind);
				n && e && (t += ", flat shading: " + (n.length / 3 === e.length ? "YES" : "NO"));
			} else t += ", flat shading: UNKNOWN";
		}
		return t;
	}
	_unBindEffect() {
		super._unBindEffect();
		for (let e of this.instances) e._unBindEffect();
	}
	get hasLODLevels() {
		return this._internalMeshDataInfo._LODLevels.length > 0;
	}
	getLODLevels() {
		return this._internalMeshDataInfo._LODLevels;
	}
	_sortLODLevels() {
		let e = this._internalMeshDataInfo._useLODScreenCoverage ? -1 : 1;
		this._internalMeshDataInfo._LODLevels.sort((t, n) => t.distanceOrScreenCoverage < n.distanceOrScreenCoverage ? e : t.distanceOrScreenCoverage > n.distanceOrScreenCoverage ? -e : 0);
	}
	addLODLevel(e, t) {
		if (t && t._masterMesh) return s.Warn("You cannot use a mesh as LOD level twice"), this;
		let n = new Gt(e, t);
		return this._internalMeshDataInfo._LODLevels.push(n), t && (t._masterMesh = this), this._sortLODLevels(), this;
	}
	getLODLevelAtDistance(e) {
		let t = this._internalMeshDataInfo;
		for (let n = 0; n < t._LODLevels.length; n++) {
			let r = t._LODLevels[n];
			if (r.distanceOrScreenCoverage === e) return r.mesh;
		}
		return null;
	}
	removeLODLevel(e) {
		let t = this._internalMeshDataInfo;
		for (let n = 0; n < t._LODLevels.length; n++) t._LODLevels[n].mesh === e && (t._LODLevels.splice(n, 1), e && (e._masterMesh = null));
		return this._sortLODLevels(), this;
	}
	getLOD(e, t) {
		let n = this._internalMeshDataInfo;
		if (!n._LODLevels || n._LODLevels.length === 0) return this;
		let r = t || this.getBoundingInfo().boundingSphere, i = e.mode === R.ORTHOGRAPHIC_CAMERA ? e.minZ : r.centerWorld.subtract(e.globalPosition).length(), a = i, o = 1;
		if (n._useLODScreenCoverage) {
			let t = e.screenArea, n = r.radiusWorld * e.minZ / i;
			n = n * n * Math.PI, a = n / t, o = -1;
		}
		if (o * n._LODLevels[n._LODLevels.length - 1].distanceOrScreenCoverage > o * a) return this.onLODLevelSelection && this.onLODLevelSelection(a, this, this), this;
		for (let e = 0; e < n._LODLevels.length; e++) {
			let t = n._LODLevels[e];
			if (o * t.distanceOrScreenCoverage < o * a) {
				if (t.mesh) {
					if (t.mesh.delayLoadState === 4) return t.mesh._checkDelayState(), this;
					if (t.mesh.delayLoadState === 2) return this;
					t.mesh._preActivate(), t.mesh._updateSubMeshesBoundingInfo(this.worldMatrixFromCache);
				}
				return this.onLODLevelSelection && this.onLODLevelSelection(a, this, t.mesh), t.mesh;
			}
		}
		return this.onLODLevelSelection && this.onLODLevelSelection(a, this, this), this;
	}
	get geometry() {
		return this._geometry;
	}
	getTotalVertices() {
		return this._geometry === null || this._geometry === void 0 ? 0 : this._geometry.getTotalVertices();
	}
	getVerticesData(e, t, n, r) {
		if (!this._geometry) return null;
		let i = r ? void 0 : this._userInstancedBuffersStorage?.vertexBuffers[e]?.getFloatData(this.instances.length + 1, n || t && this._geometry.meshes.length !== 1);
		return i ||= this._geometry.getVerticesData(e, t, n), i;
	}
	copyVerticesData(e, t) {
		this._geometry && this._geometry.copyVerticesData(e, t);
	}
	getVertexBuffer(e, t) {
		return this._geometry ? (t ? void 0 : this._userInstancedBuffersStorage?.vertexBuffers[e]) ?? this._geometry.getVertexBuffer(e) : null;
	}
	isVerticesDataPresent(e, t) {
		return this._geometry ? !t && this._userInstancedBuffersStorage?.vertexBuffers[e] !== void 0 || this._geometry.isVerticesDataPresent(e) : this._delayInfo ? this._delayInfo.indexOf(e) !== -1 : !1;
	}
	isVertexBufferUpdatable(e, t) {
		if (!this._geometry) return this._delayInfo ? this._delayInfo.indexOf(e) !== -1 : !1;
		if (!t) {
			let t = this._userInstancedBuffersStorage?.vertexBuffers[e];
			if (t) return t.isUpdatable();
		}
		return this._geometry.isVertexBufferUpdatable(e);
	}
	getVerticesDataKinds(e) {
		if (!this._geometry) {
			let e = [];
			if (this._delayInfo) for (let t of this._delayInfo) e.push(t);
			return e;
		}
		let t = this._geometry.getVerticesDataKinds();
		if (!e && this._userInstancedBuffersStorage) for (let e in this._userInstancedBuffersStorage.vertexBuffers) t.indexOf(e) === -1 && t.push(e);
		return t;
	}
	getTotalIndices() {
		return this._geometry ? this._geometry.getTotalIndices() : 0;
	}
	getIndices(e, t) {
		return this._geometry ? this._geometry.getIndices(e, t) : [];
	}
	get isBlocked() {
		return this._masterMesh !== null && this._masterMesh !== void 0;
	}
	isReady(e = !1, t = !1) {
		if (this.delayLoadState === 2 || !super.isReady(e)) return !1;
		if (!this.subMeshes || this.subMeshes.length === 0 || !e) return !0;
		let n = this.getEngine(), r = this.getScene(), i = t || n.getCaps().instancedArrays && (this.instances.length > 0 || this.hasThinInstances);
		this.computeWorldMatrix();
		let a = this.material || r.defaultMaterial;
		if (a) {
			if (a._storeEffectOnSubMeshes) for (let e of this.subMeshes) {
				let t = e.getMaterial();
				if (t) {
					if (t._storeEffectOnSubMeshes) {
						if (!t.isReadyForSubMesh(this, e, i)) return !1;
					} else if (!t.isReady(this, i)) return !1;
				}
			}
			else if (!a.isReady(this, i)) return !1;
		}
		let o = n.currentRenderPassId;
		for (let e of this.lightSources) {
			let t = e.getShadowGenerators();
			if (!t) continue;
			let r = t.values();
			for (let e = r.next(); e.done !== !0; e = r.next()) {
				let t = e.value;
				if (t && (!t.getShadowMap()?.renderList || t.getShadowMap()?.renderList && t.getShadowMap()?.renderList?.indexOf(this) !== -1)) {
					let e = t.getShadowMap().renderPassIds ?? [n.currentRenderPassId];
					for (let r = 0; r < e.length; ++r) {
						n.currentRenderPassId = e[r];
						for (let e of this.subMeshes) if (!t.isReady(e, i, e.getMaterial()?.needAlphaBlendingForMesh(this) ?? !1)) return n.currentRenderPassId = o, !1;
					}
					n.currentRenderPassId = o;
				}
			}
		}
		for (let e of this._internalMeshDataInfo._LODLevels) if (e.mesh && !e.mesh.isReady(i)) return !1;
		return !0;
	}
	get areNormalsFrozen() {
		return this._internalMeshDataInfo._areNormalsFrozen;
	}
	freezeNormals() {
		return this._internalMeshDataInfo._areNormalsFrozen = !0, this;
	}
	unfreezeNormals() {
		return this._internalMeshDataInfo._areNormalsFrozen = !1, this;
	}
	set overridenInstanceCount(e) {
		this._instanceDataStorage.overridenInstanceCount = e;
	}
	_getInstanceDataStorage() {
		if (this._instanceDataStorage.useMonoDataStorageRenderPass) return this._instanceDataStorage.dataStorageRenderPass;
		let e = this._instanceDataStorage.engine.currentRenderPassId, t = this._instanceDataStorage.renderPasses[e];
		return t || (t = new Kt(), this._instanceDataStorage.renderPasses[e] = t), t;
	}
	_preActivate() {
		let e = this._internalMeshDataInfo, t = this.getScene().getRenderId();
		return e._preActivateId === t ? this : (e._preActivateId = t, this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass.visibleInstances = null : this._getInstanceDataStorage().visibleInstances = null, this);
	}
	_preActivateForIntermediateRendering(e) {
		let t = this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass : this._getInstanceDataStorage();
		return t.visibleInstances && (t.visibleInstances.intermediateDefaultRenderId = e), this;
	}
	_registerInstanceForRenderId(e, t) {
		let n = this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass : this._getInstanceDataStorage();
		return n.visibleInstances ||= {
			defaultRenderId: t,
			selfDefaultRenderId: this._renderId,
			intermediateDefaultRenderId: -1
		}, n.visibleInstances[t] || (n.previousRenderId !== void 0 && (!this._instanceDataStorage.useMonoDataStorageRenderPass || this._instanceDataStorage.isFrozen) && delete n.visibleInstances[n.previousRenderId], n.previousRenderId = t, n.visibleInstances[t] = []), n.visibleInstances[t].push(e), this;
	}
	_afterComputeWorldMatrix() {
		super._afterComputeWorldMatrix(), this.hasThinInstances && (this.doNotSyncBoundingInfo || this.thinInstanceRefreshBoundingInfo(!1));
	}
	_postActivate() {
		this.edgesShareWithInstances && this.edgesRenderer && this.edgesRenderer.isEnabled && this._renderingGroup && (this._renderingGroup._edgesRenderers.pushNoDuplicate(this.edgesRenderer), this.edgesRenderer.customInstances.push(this.getWorldMatrix()));
	}
	refreshBoundingInfo(e = !1, t = !1) {
		if (this.hasBoundingInfo && this.getBoundingInfo().isLocked) return this;
		let n;
		n = typeof e == "object" ? e : {
			applySkeleton: e,
			applyMorph: t
		};
		let r = this.geometry ? this.geometry.boundingBias : null;
		return this._refreshBoundingInfo(this._getData(n, null, j.PositionKind), r), this;
	}
	_createGlobalSubMesh(e) {
		let t = this.getTotalVertices();
		if (!t || !this.getIndices()) return null;
		if (this.subMeshes && this.subMeshes.length > 0) {
			let n = this.getIndices();
			if (!n) return null;
			let r = n.length, i = !1;
			if (e) i = !0;
			else for (let e of this.subMeshes) {
				if (e.indexStart + e.indexCount > r) {
					i = !0;
					break;
				}
				if (e.verticesStart + e.verticesCount > t) {
					i = !0;
					break;
				}
			}
			if (!i) return this.subMeshes[0];
		}
		return this.releaseSubMeshes(), new Ye(0, 0, t, 0, this.getTotalIndices() || (this.isUnIndexed ? t : 0), this);
	}
	subdivide(e) {
		if (e < 1) return;
		let t = this.getTotalIndices(), n = t / e | 0, r = 0;
		for (; n % 3 != 0;) n++;
		this.releaseSubMeshes();
		for (let i = 0; i < e && !(r >= t); i++) Ye.CreateFromIndices(0, r, r + n >= t ? t - r : n, this, void 0, !1), r += n;
		this.refreshBoundingInfo(), this.synchronizeInstances();
	}
	setVerticesData(e, t, n = !1, r) {
		if (this._geometry) this._geometry.setVerticesData(e, t, n, r);
		else {
			let r = new B();
			r.set(t, e);
			let i = this.getScene();
			new Qe(Qe.RandomId(), i, r, n, this);
		}
		return this;
	}
	removeVerticesData(e) {
		this._geometry && this._geometry.removeVerticesData(e);
	}
	markVerticesDataAsUpdatable(e, t = !0) {
		let n = this.getVertexBuffer(e);
		!n || n.isUpdatable() === t || this.setVerticesData(e, this.getVerticesData(e), t);
	}
	setVerticesBuffer(e, t = !0, n = null) {
		return this._geometry ||= Qe.CreateGeometryForMesh(this), this._geometry.setVerticesBuffer(e, n, t), this;
	}
	updateVerticesData(e, t, n, r) {
		return this._geometry && (r ? (this.makeGeometryUnique(), this.updateVerticesData(e, t, n, !1)) : this._geometry.updateVerticesData(e, t, n)), this;
	}
	updateMeshPositions(e, t = !0) {
		let n = this.getVerticesData(j.PositionKind);
		if (!n) return this;
		if (e(n), this.updateVerticesData(j.PositionKind, n, !1, !1), t) {
			let e = this.getIndices(), t = this.getVerticesData(j.NormalKind);
			if (!t) return this;
			B.ComputeNormals(n, e, t), this.updateVerticesData(j.NormalKind, t, !1, !1);
		}
		return this;
	}
	makeGeometryUnique() {
		if (!this._geometry || this._geometry.meshes.length === 1) return this;
		let e = this._geometry, t = this._geometry.copy(Qe.RandomId());
		return e.releaseForMesh(this, !0), t.applyToMesh(this), this;
	}
	setIndexBuffer(e, t, n, r = null) {
		let i = this._geometry;
		i ||= new Qe(Qe.RandomId(), this.getScene(), void 0, void 0, this), i.setIndexBuffer(e, t, n, r);
	}
	setIndices(e, t = null, n = !1, r = !1) {
		if (this._geometry) this._geometry.setIndices(e, t, n, r);
		else {
			let r = new B();
			r.indices = e;
			let i = this.getScene();
			new Qe(Qe.RandomId(), i, r, n, this, t);
		}
		return this;
	}
	updateIndices(e, t, n = !1) {
		return this._geometry && this._geometry.updateIndices(e, t, n), this;
	}
	toLeftHanded() {
		return this._geometry && this._geometry.toLeftHanded(), this;
	}
	_bind(e, t, n, r = !0) {
		if (!this._geometry) return this;
		let i = this.getScene().getEngine(), a;
		if (this._unIndexed) switch (this._getRenderingFillMode(n)) {
			case G.WireFrameFillMode:
				a = e._getLinesIndexBuffer(this.getIndices(), i);
				break;
			default: a = null;
		}
		else switch (this._getRenderingFillMode(n)) {
			case G.PointFillMode:
				a = null;
				break;
			case G.WireFrameFillMode:
				a = e._getLinesIndexBuffer(this.getIndices(), i);
				break;
			default:
			case G.TriangleFillMode: a = this._geometry.getIndexBuffer();
		}
		return this._bindDirect(t, a, r);
	}
	_bindDirect(e, t, n = !0) {
		if (!this._geometry) return this;
		if (this.morphTargetManager && this.morphTargetManager.isUsingTextureForTargets && this.morphTargetManager._bind(e), !n || !this._userInstancedBuffersStorage || this.hasThinInstances) this._geometry._bind(e, t);
		else {
			if (!this._instanceDataStorage.useMonoDataStorageRenderPass && this._userInstancedBuffersStorage.renderPasses && this._userInstancedBuffersStorage.renderPasses[this._instanceDataStorage.engine.currentRenderPassId]) {
				let e = this._userInstancedBuffersStorage.renderPasses[this._instanceDataStorage.engine.currentRenderPassId];
				for (let t in e) this._userInstancedBuffersStorage.vertexBuffers[t] = e[t];
			}
			this._geometry._bind(e, t, this._userInstancedBuffersStorage.vertexBuffers, this._userInstancedBuffersStorage.vertexArrayObjects);
		}
		return this;
	}
	_draw(e, t, n) {
		if (!this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) return this;
		this._internalMeshDataInfo._onBeforeDrawObservable && this._internalMeshDataInfo._onBeforeDrawObservable.notifyObservers(this);
		let r = this.getScene().getEngine(), i = r._currentMaterialContext, a = i && i.useVertexPulling;
		return this._unIndexed && t !== G.WireFrameFillMode || t == G.PointFillMode ? r.drawArraysType(t, e.verticesStart, e.verticesCount, this.forcedInstanceCount || n) : t == G.WireFrameFillMode ? r.drawElementsType(t, 0, e._linesIndexCount, this.forcedInstanceCount || n) : a ? r.drawArraysType(t, e.indexStart, e.indexCount, this.forcedInstanceCount || n) : r.drawElementsType(t, e.indexStart, e.indexCount, this.forcedInstanceCount || n), this;
	}
	registerBeforeRender(e) {
		return this.onBeforeRenderObservable.add(e), this;
	}
	unregisterBeforeRender(e) {
		return this.onBeforeRenderObservable.removeCallback(e), this;
	}
	registerAfterRender(e) {
		return this.onAfterRenderObservable.add(e), this;
	}
	unregisterAfterRender(e) {
		return this.onAfterRenderObservable.removeCallback(e), this;
	}
	_getInstancesRenderList(e, t = !1) {
		let n = this._instanceDataStorage.useMonoDataStorageRenderPass ? this._instanceDataStorage.dataStorageRenderPass : this._getInstanceDataStorage();
		if (this._instanceDataStorage.isFrozen) {
			if (t) return n.batchCacheReplacementModeInFrozenMode.hardwareInstancedRendering[e] = !1, n.batchCacheReplacementModeInFrozenMode.renderSelf[e] = !0, n.batchCacheReplacementModeInFrozenMode;
			if (n.previousBatch) return n.previousBatch;
		}
		let r = this.getScene(), i = r._isInIntermediateRendering(), a = i ? this._internalAbstractMeshDataInfo._onlyForInstancesIntermediate : this._internalAbstractMeshDataInfo._onlyForInstances, o = n.batchCache;
		if (o.mustReturn = !1, o.renderSelf[e] = t || !a && this.isEnabled() && this.isVisible, o.visibleInstances[e] = null, n.visibleInstances && !t) {
			let t = n.visibleInstances, a = r.getRenderId(), s = i ? t.intermediateDefaultRenderId : t.defaultRenderId;
			o.visibleInstances[e] = t[a], !o.visibleInstances[e] && s && (o.visibleInstances[e] = t[s]);
		}
		return o.hardwareInstancedRendering[e] = !t && this._instanceDataStorage.hardwareInstancedRendering && o.visibleInstances[e] !== null && o.visibleInstances[e] !== void 0, n.previousBatch = o, o;
	}
	_updateInstancedBuffers(t, n, r, i, a, o) {
		let s = n.visibleInstances[t._id], c = s ? s.length : 0, l = n.parent, u = this._instanceDataStorage, d = l.instancesBuffer, f = l.instancesPreviousBuffer, p = 0, m = 0, g = n.renderSelf[t._id], _ = this._scene.floatingOriginOffset, v = !d || r !== l.instancesBufferSize || this._scene.needsPreviousWorldMatrices && !l.instancesPreviousBuffer;
		if (!this._instanceDataStorage.manualUpdate && (!u.isFrozen || v)) {
			let n = this.getWorldMatrix();
			if (g) {
				this._scene.needsPreviousWorldMatrices && (u.masterMeshPreviousWorldMatrix ? (u.masterMeshPreviousWorldMatrix.copyToArray(l.instancesPreviousData, p), u.masterMeshPreviousWorldMatrix.copyFrom(n)) : (u.masterMeshPreviousWorldMatrix = n.clone(), u.masterMeshPreviousWorldMatrix.copyToArray(l.instancesPreviousData, p))), n.copyToArray(l.instancesData, p);
				let e = n.asArray();
				l.instancesData[p + 12] = e[12] - _.x, l.instancesData[p + 13] = e[13] - _.y, l.instancesData[p + 14] = e[14] - _.z, p += 16, m++;
			}
			if (s) {
				if (e.INSTANCEDMESH_SORT_TRANSPARENT && this._scene.activeCamera && t.getMaterial()?.needAlphaBlendingForMesh(t.getRenderingMesh())) {
					let e = this._scene.activeCamera.globalPosition;
					for (let t = 0; t < s.length; t++) {
						let n = s[t];
						n._distanceToCamera = h.Distance(n.getBoundingInfo().boundingSphere.centerWorld, e);
					}
					s.sort((e, t) => e._distanceToCamera > t._distanceToCamera ? -1 : +(e._distanceToCamera < t._distanceToCamera));
				}
				for (let e = 0; e < s.length; e++) {
					let t = s[e], n = t.getWorldMatrix();
					n.copyToArray(l.instancesData, p), this._scene.needsPreviousWorldMatrices && (t._previousWorldMatrix ? (t._previousWorldMatrix.copyToArray(l.instancesPreviousData, p), t._previousWorldMatrix.copyFrom(n)) : (t._previousWorldMatrix = n.clone(), t._previousWorldMatrix.copyToArray(l.instancesPreviousData, p)));
					let r = n.asArray();
					l.instancesData[p + 12] = r[12] - _.x, l.instancesData[p + 13] = r[13] - _.y, l.instancesData[p + 14] = r[14] - _.z, p += 16, m++;
				}
			}
		} else m = +!!g + c;
		if (v) {
			d && d.dispose(), f && f.dispose(), d = new se(i, l.instancesData, !0, 16, !1, !0), l.instancesBuffer = d, this._userInstancedBuffersStorage ||= {
				data: {},
				vertexBuffers: {},
				strides: {},
				sizes: {},
				vertexArrayObjects: this.getEngine().getCaps().vertexArrayObject ? {} : void 0
			};
			let e;
			if (this._instanceDataStorage.useMonoDataStorageRenderPass) e = this._userInstancedBuffersStorage.vertexBuffers;
			else {
				this._userInstancedBuffersStorage.renderPasses || (this._userInstancedBuffersStorage.renderPasses = {});
				let t = this._instanceDataStorage.engine.currentRenderPassId;
				e = this._userInstancedBuffersStorage.renderPasses[t], e || (this._userInstancedBuffersStorage.renderPasses[t] = e = {});
			}
			e.world0 = d.createVertexBuffer("world0", 0, 4), e.world1 = d.createVertexBuffer("world1", 4, 4), e.world2 = d.createVertexBuffer("world2", 8, 4), e.world3 = d.createVertexBuffer("world3", 12, 4), this._scene.needsPreviousWorldMatrices && (f = new se(i, l.instancesPreviousData, !0, 16, !1, !0), l.instancesPreviousBuffer = f, e.previousWorld0 = f.createVertexBuffer("previousWorld0", 0, 4), e.previousWorld1 = f.createVertexBuffer("previousWorld1", 4, 4), e.previousWorld2 = f.createVertexBuffer("previousWorld2", 8, 4), e.previousWorld3 = f.createVertexBuffer("previousWorld3", 12, 4)), this._invalidateInstanceVertexArrayObject();
		} else (!this._instanceDataStorage.isFrozen || this._instanceDataStorage.forceMatrixUpdates) && (d.updateDirectly(l.instancesData, 0, m), this._scene.needsPreviousWorldMatrices && (!this._instanceDataStorage.manualUpdate || this._instanceDataStorage.previousManualUpdate) && f.updateDirectly(l.instancesPreviousData, 0, m));
		this._processInstancedBuffers(s, g), o && a !== void 0 && (this.getScene()._activeIndices.addCount(t.indexCount * m, !1), i._currentDrawContext && (i._currentDrawContext.useInstancing = !0), this._bind(t, o, a), this._draw(t, a, m)), this._scene.needsPreviousWorldMatrices && !v && this._instanceDataStorage.manualUpdate && (!this._instanceDataStorage.isFrozen || this._instanceDataStorage.forceMatrixUpdates) && !this._instanceDataStorage.previousManualUpdate && f.updateDirectly(l.instancesData, 0, m);
	}
	_renderWithInstances(e, t, n, r, i) {
		let a = n.visibleInstances[e._id], o = a ? a.length : 0, s = n.parent, c = s.instancesBufferSize, l = (o + 1) * 16 * 4;
		for (; s.instancesBufferSize < l;) s.instancesBufferSize *= 2;
		return (!s.instancesData || c != s.instancesBufferSize) && (s.instancesData = new Float32Array(s.instancesBufferSize / 4)), (this._scene.needsPreviousWorldMatrices && !s.instancesPreviousData || c != s.instancesBufferSize) && (s.instancesPreviousData = new Float32Array(s.instancesBufferSize / 4)), this._updateInstancedBuffers(e, n, c, i, t, r), i.unbindInstanceAttributes(), this;
	}
	_renderWithThinInstances(e, t, n, r) {
		let i = this._thinInstanceDataStorage?.instancesCount ?? 0;
		this.getScene()._activeIndices.addCount(e.indexCount * i, !1), r._currentDrawContext && (r._currentDrawContext.useInstancing = !0), this._bind(e, n, t), this._draw(e, t, i), this._scene.needsPreviousWorldMatrices && !this._thinInstanceDataStorage.previousMatrixData && this._thinInstanceDataStorage.matrixData && (this._thinInstanceDataStorage.previousMatrixBuffer ? this._thinInstanceDataStorage.previousMatrixBuffer.updateDirectly(this._thinInstanceDataStorage.matrixData, 0, i) : this._thinInstanceDataStorage.previousMatrixBuffer = this._thinInstanceCreateMatrixBuffer("previousWorld", this._thinInstanceDataStorage.matrixData, !1)), r.unbindInstanceAttributes();
	}
	_processInstancedBuffers(e, t) {}
	_processRendering(e, t, n, r, i, a, o, s) {
		let c = this.getScene(), l = c.getEngine();
		if (r = this._getRenderingFillMode(r), a && t.getRenderingMesh().hasThinInstances) return this._renderWithThinInstances(t, r, n, l), this;
		if (a) this._renderWithInstances(t, r, i, n, l);
		else {
			l._currentDrawContext && (l._currentDrawContext.useInstancing = !1);
			let n = 0;
			i.renderSelf[t._id] && (o && o(!1, e.getWorldMatrix(), s), n++, this._draw(t, r, this._instanceDataStorage.overridenInstanceCount));
			let a = i.visibleInstances[t._id];
			if (a) {
				let e = a.length;
				n += e;
				for (let n = 0; n < e; n++) {
					let e = a[n].getWorldMatrix();
					o && o(!0, e, s), this._draw(t, r);
				}
			}
			c._activeIndices.addCount(t.indexCount * n, !1);
		}
		return this;
	}
	_disposeInstanceDataStorageRenderPass(e, t = !1) {
		e?.instancesBuffer && (t && e.instancesBuffer.dispose(), e.instancesBuffer = null), e?.instancesPreviousBuffer && (t && e.instancesPreviousBuffer.dispose(), e.instancesPreviousBuffer = null);
	}
	_rebuild(e = !1) {
		for (let t in this._instanceDataStorage.renderPasses) {
			let n = this._instanceDataStorage.renderPasses[t];
			this._disposeInstanceDataStorageRenderPass(n, e);
		}
		if (this._disposeInstanceDataStorageRenderPass(this._instanceDataStorage.dataStorageRenderPass, e), this._userInstancedBuffersStorage) {
			for (let t in this._userInstancedBuffersStorage.vertexBuffers) {
				let n = this._userInstancedBuffersStorage.vertexBuffers[t];
				n && (e && n.dispose(), this._userInstancedBuffersStorage.vertexBuffers[t] = null);
			}
			this._userInstancedBuffersStorage.vertexArrayObjects && (this._userInstancedBuffersStorage.vertexArrayObjects = {});
		}
		this._internalMeshDataInfo._effectiveMaterial = null, super._rebuild(e);
	}
	_releaseRenderPassId(e) {
		let t = this._instanceDataStorage.renderPasses[e];
		if (t && (this._disposeInstanceDataStorageRenderPass(t, !0), delete this._instanceDataStorage.renderPasses[e]), this._userInstancedBuffersStorage?.renderPasses) {
			let t = this._userInstancedBuffersStorage.renderPasses[e];
			if (t) for (let e in t) t[e]?.dispose();
			delete this._userInstancedBuffersStorage.renderPasses[e];
		}
	}
	_freeze() {
		if (this.subMeshes) {
			for (let e = 0; e < this.subMeshes.length; e++) this._getInstancesRenderList(e);
			this._internalMeshDataInfo._effectiveMaterial = null, this._instanceDataStorage.isFrozen = !0;
		}
	}
	_unFreeze() {
		this._instanceDataStorage.isFrozen = !1;
		for (let e in this._instanceDataStorage.renderPasses) {
			let t = this._instanceDataStorage.renderPasses[e];
			t.previousBatch = null;
		}
		this._instanceDataStorage.dataStorageRenderPass && (this._instanceDataStorage.dataStorageRenderPass.previousBatch = null);
	}
	renderWithRenderPassId(e, t, n, r, i = !0) {
		let a = this._scene.getEngine(), o = a.currentRenderPassId;
		if (e !== void 0 && (a.currentRenderPassId = e), r) (!i || i && r.isInFrustum(this._scene._frustumPlanes)) && this.render(r, !!t, n);
		else for (let e = 0; e < this.subMeshes.length; e++) {
			let r = this.subMeshes[e];
			(!i || i && r.isInFrustum(this._scene._frustumPlanes)) && this.render(r, !!t, n);
		}
		return e !== void 0 && (a.currentRenderPassId = o), this;
	}
	directRender() {
		if (!this.subMeshes) return this;
		for (let e of this.subMeshes) this.render(e, !1);
		return this;
	}
	render(e, t, n) {
		let r = this.getScene(), i = r.getEngine();
		this._internalAbstractMeshDataInfo._isActiveIntermediate ? this._internalAbstractMeshDataInfo._isActiveIntermediate = !1 : this._internalAbstractMeshDataInfo._isActive = !1;
		let a = r.activeCameras?.length ?? 0, o = a > 1 && r.activeCamera === r.activeCameras[0] || a <= 1, s = this._occlusionDataStorage && this._occlusionDataStorage.occlusionForRenderPassId !== -1 && this._occlusionDataStorage.occlusionForRenderPassId !== i.currentRenderPassId;
		if (o && this._checkOcclusionQuery(s) && !this._occlusionDataStorage.forceRenderingWhenOccluded) return this;
		let c = this._getInstancesRenderList(e._id, !!n);
		if (c.mustReturn || !this._geometry || !this._geometry.getVertexBuffers() || !this._unIndexed && !this._geometry.getIndexBuffer()) return this;
		let l = 0, u = null;
		this.ignoreCameraMaxZ && r.activeCamera && !r._isInIntermediateRendering() && (l = r.activeCamera.maxZ, u = r.activeCamera, r.activeCamera.maxZ = 0, r.updateTransformMatrix(!0)), this._internalMeshDataInfo._onBeforeRenderObservable && this._internalMeshDataInfo._onBeforeRenderObservable.notifyObservers(this);
		let d = e.getRenderingMesh(), f = c.hardwareInstancedRendering[e._id] || d.hasThinInstances || !!this._userInstancedBuffersStorage && !e.getMesh()._internalAbstractMeshDataInfo._actAsRegularMesh, p = this._instanceDataStorage, m = e.getMaterial();
		if (!m) return u && (u.maxZ = l, r.updateTransformMatrix(!0)), this;
		if (!p.isFrozen || !this._internalMeshDataInfo._effectiveMaterial || this._internalMeshDataInfo._effectiveMaterial !== m) {
			if (m._storeEffectOnSubMeshes) {
				if (!m.isReadyForSubMesh(this, e, f)) return u && (u.maxZ = l, r.updateTransformMatrix(!0)), this;
			} else if (!m.isReady(this, f)) return u && (u.maxZ = l, r.updateTransformMatrix(!0)), this;
			this._internalMeshDataInfo._effectiveMaterial = m;
		} else if (m._storeEffectOnSubMeshes && !e._drawWrapper?._wasPreviouslyReady || !m._storeEffectOnSubMeshes && !m._getDrawWrapper()._wasPreviouslyReady) return u && (u.maxZ = l, r.updateTransformMatrix(!0)), this;
		if (t) {
			let e = this._internalMeshDataInfo._effectiveMaterial;
			if (e.alphaModes.length === 1) i.setAlphaMode(e.alphaMode);
			else for (let t = 0; t < e.alphaModes.length; t++) {
				let n = e.alphaModes[t];
				i.setAlphaMode(n === void 0 ? 2 : n, !1, t);
			}
		}
		let h;
		h = this._internalMeshDataInfo._effectiveMaterial._storeEffectOnSubMeshes ? e._drawWrapper : this._internalMeshDataInfo._effectiveMaterial._getDrawWrapper();
		let g = h?.effect ?? null;
		for (let t of r._beforeRenderingMeshStage) t.action(this, e, c, g);
		if (!h || !g) return u && (u.maxZ = l, r.updateTransformMatrix(!0)), this;
		let _ = n || this, v;
		if (!p.isFrozen && (this._internalMeshDataInfo._effectiveMaterial.backFaceCulling || this._internalMeshDataInfo._effectiveMaterial.sideOrientation !== null || this._internalMeshDataInfo._effectiveMaterial._twoSidedLighting)) {
			let e = _._getWorldMatrixDeterminant();
			v = this._internalMeshDataInfo._effectiveMaterial._getEffectiveOrientation(this), e < 0 && (v = v === G.ClockWiseSideOrientation ? G.CounterClockWiseSideOrientation : G.ClockWiseSideOrientation), this._internalMeshDataInfo._effectiveSideOrientation = v;
		}
		let y = this._internalMeshDataInfo._effectiveMaterial._preBind(h, this._internalMeshDataInfo._effectiveSideOrientation);
		this._internalMeshDataInfo._effectiveMaterial.forceDepthWrite && i.setDepthWrite(!0);
		let b = this._internalMeshDataInfo._effectiveMaterial, x = b.fillMode;
		this._internalMeshDataInfo._onBeforeBindObservable && this._internalMeshDataInfo._onBeforeBindObservable.notifyObservers(this), f || this._bind(e, g, x, !1);
		let S = _.getWorldMatrix();
		b._storeEffectOnSubMeshes ? b.bindForSubMesh(S, this, e) : b.bind(S, this), !b.backFaceCulling && b.separateCullingPass && (i.setState(!0, b.zOffset, !1, !y, b.cullBackFaces, b.stencil, b.zOffsetUnits), this._processRendering(this, e, g, x, c, f, this._onBeforeDraw, this._internalMeshDataInfo._effectiveMaterial), i.setState(!0, b.zOffset, !1, y, b.cullBackFaces, b.stencil, b.zOffsetUnits), this._internalMeshDataInfo._onBetweenPassObservable && this._internalMeshDataInfo._onBetweenPassObservable.notifyObservers(e)), this._processRendering(this, e, g, x, c, f, this._onBeforeDraw, this._internalMeshDataInfo._effectiveMaterial), this._internalMeshDataInfo._effectiveMaterial.unbind();
		for (let t of r._afterRenderingMeshStage) t.action(this, e, c, g);
		return this._internalMeshDataInfo._onAfterRenderObservable && this._internalMeshDataInfo._onAfterRenderObservable.notifyObservers(this), u && (u.maxZ = l, r.updateTransformMatrix(!0)), r.performancePriority === 2 && !p.isFrozen && this._freeze(), this;
	}
	cleanMatrixWeights() {
		this.isVerticesDataPresent(j.MatricesWeightsKind) && (this.isVerticesDataPresent(j.MatricesWeightsExtraKind) ? this._normalizeSkinWeightsAndExtra() : this._normalizeSkinFourWeights());
	}
	_normalizeSkinFourWeights() {
		let e = this.getVerticesData(j.MatricesWeightsKind), t = e.length;
		for (let n = 0; n < t; n += 4) {
			let t = e[n] + e[n + 1] + e[n + 2] + e[n + 3];
			if (t === 0) e[n] = 1;
			else {
				let r = 1 / t;
				e[n] *= r, e[n + 1] *= r, e[n + 2] *= r, e[n + 3] *= r;
			}
		}
		this.setVerticesData(j.MatricesWeightsKind, e);
	}
	_normalizeSkinWeightsAndExtra() {
		let e = this.getVerticesData(j.MatricesWeightsExtraKind), t = this.getVerticesData(j.MatricesWeightsKind), n = t.length;
		for (let r = 0; r < n; r += 4) {
			let n = t[r] + t[r + 1] + t[r + 2] + t[r + 3];
			if (n += e[r] + e[r + 1] + e[r + 2] + e[r + 3], n === 0) t[r] = 1;
			else {
				let i = 1 / n;
				t[r] *= i, t[r + 1] *= i, t[r + 2] *= i, t[r + 3] *= i, e[r] *= i, e[r + 1] *= i, e[r + 2] *= i, e[r + 3] *= i;
			}
		}
		this.setVerticesData(j.MatricesWeightsKind, t), this.setVerticesData(j.MatricesWeightsKind, e);
	}
	validateSkinning() {
		let e = this.getVerticesData(j.MatricesWeightsExtraKind), t = this.getVerticesData(j.MatricesWeightsKind);
		if (t === null || this.skeleton == null) return {
			skinned: !1,
			valid: !0,
			report: "not skinned"
		};
		let n = t.length, r = 0, i = 0, a = 0, o = 0, s = e === null ? 4 : 8, c = [];
		for (let e = 0; e <= s; e++) c[e] = 0;
		for (let l = 0; l < n; l += 4) {
			let n = t[l], u = n, d = u === 0 ? 0 : 1;
			for (let i = 1; i < s; i++) {
				let a = i < 4 ? t[l + i] : e[l + i - 4];
				a > n && r++, a !== 0 && d++, u += a, n = a;
			}
			if (c[d]++, d > a && (a = d), u === 0) i++;
			else {
				let n = 1 / u, r = 0;
				for (let i = 0; i < s; i++) r += Math.abs(i < 4 ? t[l + i] - t[l + i] * n : e[l + i - 4] - e[l + i - 4] * n);
				r > .001 && o++;
			}
		}
		let l = this.skeleton.bones.length, u = this.getVerticesData(j.MatricesIndicesKind), d = this.getVerticesData(j.MatricesIndicesExtraKind), f = 0;
		for (let e = 0; e < n; e += 4) for (let t = 0; t < s; t++) {
			let n = t < 4 ? u[e + t] : d[e + t - 4];
			(n >= l || n < 0) && f++;
		}
		let p = "Number of Weights = " + n / 4 + "\nMaximum influences = " + a + "\nMissing Weights = " + i + "\nNot Sorted = " + r + "\nNot Normalized = " + o + "\nWeightCounts = [" + c + "]\nNumber of bones = " + l + "\nBad Bone Indices = " + f;
		return {
			skinned: !0,
			valid: i === 0 && o === 0 && f === 0,
			report: p
		};
	}
	_checkDelayState() {
		let e = this.getScene();
		return this._geometry ? this._geometry.load(e) : this.delayLoadState === 4 && (this.delayLoadState = 2, this._queueLoad(e)), this;
	}
	_queueLoad(e) {
		e.addPendingData(this);
		let t = this.delayLoadingFile.indexOf(".babylonbinarymeshdata") !== -1;
		return F.LoadFile(this.delayLoadingFile, (t) => {
			t instanceof ArrayBuffer ? this._delayLoadingFunction(t, this) : this._delayLoadingFunction(JSON.parse(t), this);
			for (let e of this.instances) e.refreshBoundingInfo(), e._syncSubMeshes();
			this.delayLoadState = 1, e.removePendingData(this);
		}, () => {}, e.offlineProvider, t), this;
	}
	isInFrustum(e) {
		return this.delayLoadState === 2 || !super.isInFrustum(e) ? !1 : (this._checkDelayState(), !0);
	}
	setMaterialById(e) {
		let t = this.getScene().materials, n;
		for (n = t.length - 1; n > -1; n--) if (t[n].id === e) return this.material = t[n], this;
		let r = this.getScene().multiMaterials;
		for (n = r.length - 1; n > -1; n--) if (r[n].id === e) return this.material = r[n], this;
		return this;
	}
	getAnimatables() {
		let e = [];
		return this.material && e.push(this.material), this.skeleton && e.push(this.skeleton), e;
	}
	bakeTransformIntoVertices(e) {
		if (!this.isVerticesDataPresent(j.PositionKind)) return this;
		let t = this.subMeshes.splice(0);
		this._resetPointsArrayCache();
		let n = this.getVerticesData(j.PositionKind), r = h.Zero(), i;
		for (i = 0; i < n.length; i += 3) h.TransformCoordinatesFromFloatsToRef(n[i], n[i + 1], n[i + 2], e, r).toArray(n, i);
		if (this.setVerticesData(j.PositionKind, n, this.getVertexBuffer(j.PositionKind).isUpdatable()), this.isVerticesDataPresent(j.NormalKind)) {
			for (n = this.getVerticesData(j.NormalKind), i = 0; i < n.length; i += 3) h.TransformNormalFromFloatsToRef(n[i], n[i + 1], n[i + 2], e, r).normalize().toArray(n, i);
			this.setVerticesData(j.NormalKind, n, this.getVertexBuffer(j.NormalKind).isUpdatable());
		}
		if (this.isVerticesDataPresent(j.TangentKind)) {
			for (n = this.getVerticesData(j.TangentKind), i = 0; i < n.length; i += 4) h.TransformNormalFromFloatsToRef(n[i], n[i + 1], n[i + 2], e, r).normalize().toArray(n, i);
			this.setVerticesData(j.TangentKind, n, this.getVertexBuffer(j.TangentKind).isUpdatable());
		}
		return e.determinant() < 0 && this.flipFaces(), this.releaseSubMeshes(), this.subMeshes = t, this;
	}
	bakeCurrentTransformIntoVertices(e = !0, t = !1) {
		return t && this.makeGeometryUnique(), this.bakeTransformIntoVertices(this.computeWorldMatrix(!0)), this.resetLocalMatrix(e), this;
	}
	get _positions() {
		return this._internalAbstractMeshDataInfo._positions || this._geometry && this._geometry._positions || null;
	}
	_resetPointsArrayCache() {
		return this._geometry && this._geometry._resetPointsArrayCache(), this;
	}
	_generatePointsArray() {
		return this._geometry ? this._geometry._generatePointsArray() : !1;
	}
	clone(t = "", n = null, r, i = !0) {
		if (n && n._addToSceneRootNodes === void 0) {
			let r = n;
			return Zt.source = this, Zt.doNotCloneChildren = r.doNotCloneChildren, Zt.clonePhysicsImpostor = r.clonePhysicsImpostor, Zt.cloneThinInstances = r.cloneThinInstances, new e(t, this.getScene(), Zt);
		}
		return new e(t, this.getScene(), n, this, r, i);
	}
	dispose(e, t = !1) {
		this.morphTargetManager = null, this._geometry && this._geometry.releaseForMesh(this, !0);
		let n = this._internalMeshDataInfo;
		if (n._onBeforeDrawObservable && n._onBeforeDrawObservable.clear(), n._onBeforeBindObservable && n._onBeforeBindObservable.clear(), n._onBeforeRenderObservable && n._onBeforeRenderObservable.clear(), n._onAfterRenderObservable && n._onAfterRenderObservable.clear(), n._onBetweenPassObservable && n._onBetweenPassObservable.clear(), this._scene.useClonedMeshMap) {
			if (n.meshMap) for (let e in n.meshMap) {
				let t = n.meshMap[e];
				t && (t._internalMeshDataInfo._source = null, n.meshMap[e] = void 0);
			}
			n._source && n._source._internalMeshDataInfo.meshMap && (n._source._internalMeshDataInfo.meshMap[this.uniqueId] = void 0);
		} else {
			let e = this.getScene().meshes;
			for (let t of e) {
				let e = t;
				e._internalMeshDataInfo && e._internalMeshDataInfo._source && e._internalMeshDataInfo._source === this && (e._internalMeshDataInfo._source = null);
			}
		}
		n._source = null, this._disposeInstanceSpecificData(), this._disposeThinInstanceSpecificData(), this._internalMeshDataInfo._checkReadinessObserver && this._scene.onBeforeRenderObservable.remove(this._internalMeshDataInfo._checkReadinessObserver), super.dispose(e, t);
	}
	_disposeInstanceSpecificData() {}
	_disposeThinInstanceSpecificData() {}
	_invalidateInstanceVertexArrayObject() {}
	applyDisplacementMap(e, t, n, r, i, a, o = !1, s) {
		let c = this.getScene();
		return F.LoadImage(e, (e) => {
			let s = e.width, c = e.height, l = this.getEngine().createCanvas(s, c).getContext("2d");
			l.drawImage(e, 0, 0);
			let u = l.getImageData(0, 0, s, c).data;
			this.applyDisplacementMapFromBuffer(u, s, c, t, n, i, a, o), r && r(this);
		}, s || (() => {}), c.offlineProvider), this;
	}
	applyDisplacementMapFromBuffer(e, t, n, r, i, a, o, c = !1) {
		if (!this.isVerticesDataPresent(j.PositionKind) || !this.isVerticesDataPresent(j.NormalKind) || !this.isVerticesDataPresent(j.UVKind)) return s.Warn("Cannot call applyDisplacementMap: Given mesh is not complete. Position, Normal or UV are missing"), this;
		let l = this.getVerticesData(j.PositionKind, !0, !0), u = this.getVerticesData(j.NormalKind), d = this.getVerticesData(j.UVKind), f = h.Zero(), p = h.Zero(), m = _.Zero();
		a ||= _.Zero(), o ||= new _(1, 1);
		for (let s = 0; s < l.length; s += 3) {
			h.FromArrayToRef(l, s, f), h.FromArrayToRef(u, s, p), _.FromArrayToRef(d, s / 3 * 2, m);
			let c = ((Math.abs(m.x * o.x + a.x % 1) * (t - 1) % t | 0) + (Math.abs(m.y * o.y + a.y % 1) * (n - 1) % n | 0) * t) * 4, g = e[c] / 255, v = e[c + 1] / 255, y = e[c + 2] / 255, b = g * .3 + v * .59 + y * .11;
			p.normalize(), p.scaleInPlace(r + (i - r) * b), f = f.add(p), f.toArray(l, s);
		}
		return B.ComputeNormals(l, this.getIndices(), u), c ? (this.setVerticesData(j.PositionKind, l), this.setVerticesData(j.NormalKind, u), this.setVerticesData(j.UVKind, d)) : (this.updateVerticesData(j.PositionKind, l), this.updateVerticesData(j.NormalKind, u)), this;
	}
	_getFlattenedNormals(e, t) {
		let n = new Float32Array(e.length * 3), r = 0, i = this.sideOrientation === +!!this._scene.useRightHandedSystem;
		for (let a = 0; a < e.length; a += 3) {
			let o = h.FromArray(t, e[a] * 3), s = h.FromArray(t, e[a + 1] * 3), c = h.FromArray(t, e[a + 2] * 3), l = o.subtract(s), u = c.subtract(s), d = h.Normalize(h.Cross(l, u));
			i && d.scaleInPlace(-1);
			for (let e = 0; e < 3; e++) n[r++] = d.x, n[r++] = d.y, n[r++] = d.z;
		}
		return n;
	}
	_convertToUnIndexedMesh(e = !1) {
		let t = this.getVerticesDataKinds().filter((e) => !this.getVertexBuffer(e)?.getIsInstanced()), n = this.getIndices(!1, !0), r = {}, i = (e, t) => {
			let r = new Float32Array(n.length * t), i = 0;
			for (let a = 0; a < n.length; a++) for (let o = 0; o < t; o++) r[i++] = e[n[a] * t + o];
			return r;
		}, a = this.getBoundingInfo(), o = this.geometry ? this.subMeshes.slice(0) : [];
		for (let e of t) r[e] = this.getVerticesData(e);
		for (let a of t) {
			let t = this.getVertexBuffer(a), o = t.getSize();
			if (e && a === j.NormalKind) {
				let e = this._getFlattenedNormals(n, r[j.PositionKind]);
				this.setVerticesData(j.NormalKind, e, t.isUpdatable(), o);
			} else this.setVerticesData(a, i(r[a], o), t.isUpdatable(), o);
		}
		if (this.morphTargetManager) {
			for (let t = 0; t < this.morphTargetManager.numTargets; t++) {
				let r = this.morphTargetManager.getTarget(t), a = r.getPositions();
				r.setPositions(i(a, 3));
				let o = r.getNormals();
				o && r.setNormals(e ? this._getFlattenedNormals(n, a) : i(o, 3));
				let s = r.getTangents();
				s && r.setTangents(i(s, 3));
				let c = r.getUVs();
				c && r.setUVs(i(c, 2));
				let l = r.getColors();
				l && r.setColors(i(l, 4));
			}
			this.morphTargetManager.synchronize();
		}
		for (let e = 0; e < n.length; e++) n[e] = e;
		this.setIndices(n), this._unIndexed = !0, this.releaseSubMeshes();
		for (let e of o) {
			let t = e.getBoundingInfo();
			Ye.AddToMesh(e.materialIndex, e.indexStart, e.indexCount, e.indexStart, e.indexCount, this).setBoundingInfo(t);
		}
		return this.setBoundingInfo(a), this.synchronizeInstances(), this;
	}
	convertToFlatShadedMesh() {
		return this._convertToUnIndexedMesh(!0);
	}
	convertToUnIndexedMesh() {
		return this._convertToUnIndexedMesh();
	}
	flipFaces(e = !1) {
		let t = B.ExtractFromMesh(this), n;
		if (e && this.isVerticesDataPresent(j.NormalKind) && t.normals) {
			for (n = 0; n < t.normals.length; n++) t.normals[n] *= -1;
			this.setVerticesData(j.NormalKind, t.normals, this.isVertexBufferUpdatable(j.NormalKind));
		}
		if (t.indices) {
			let e;
			for (n = 0; n < t.indices.length; n += 3) e = t.indices[n + 1], t.indices[n + 1] = t.indices[n + 2], t.indices[n + 2] = e;
			this.setIndices(t.indices, null, this.isVertexBufferUpdatable(j.PositionKind), !0);
		}
		return this;
	}
	increaseVertices(e = 1) {
		let t = B.ExtractFromMesh(this), n = t.indices && !Array.isArray(t.indices) && Array.from ? Array.from(t.indices) : t.indices, r = t.positions && !Array.isArray(t.positions) && Array.from ? Array.from(t.positions) : t.positions, i = t.uvs && !Array.isArray(t.uvs) && Array.from ? Array.from(t.uvs) : t.uvs, a = t.normals && !Array.isArray(t.normals) && Array.from ? Array.from(t.normals) : t.normals;
		if (!n || !r) s.Warn("Couldn't increase number of vertices : VertexData must contain at least indices and positions");
		else {
			t.indices = n, t.positions = r, i && (t.uvs = i), a && (t.normals = a);
			let o = e + 1, s = [];
			for (let e = 0; e < o + 1; e++) s[e] = [];
			let c, l, u = new h(0, 0, 0), d = new h(0, 0, 0), f = new _(0, 0), p = [], m = [], g = [], v, y = r.length, b;
			i && (b = i.length);
			let x;
			a && (x = a.length);
			for (let e = 0; e < n.length; e += 3) {
				m[0] = n[e], m[1] = n[e + 1], m[2] = n[e + 2];
				for (let e = 0; e < 3; e++) if (c = m[e], l = m[(e + 1) % 3], g[c] === void 0 && g[l] === void 0 ? (g[c] = [], g[l] = []) : (g[c] === void 0 && (g[c] = []), g[l] === void 0 && (g[l] = [])), g[c][l] === void 0 && g[l][c] === void 0) {
					g[c][l] = [], u.x = (r[3 * l] - r[3 * c]) / o, u.y = (r[3 * l + 1] - r[3 * c + 1]) / o, u.z = (r[3 * l + 2] - r[3 * c + 2]) / o, a && (d.x = (a[3 * l] - a[3 * c]) / o, d.y = (a[3 * l + 1] - a[3 * c + 1]) / o, d.z = (a[3 * l + 2] - a[3 * c + 2]) / o), i && (f.x = (i[2 * l] - i[2 * c]) / o, f.y = (i[2 * l + 1] - i[2 * c + 1]) / o), g[c][l].push(c);
					for (let e = 1; e < o; e++) g[c][l].push(r.length / 3), r[y++] = r[3 * c] + e * u.x, r[y++] = r[3 * c + 1] + e * u.y, r[y++] = r[3 * c + 2] + e * u.z, a && (a[x++] = a[3 * c] + e * d.x, a[x++] = a[3 * c + 1] + e * d.y, a[x++] = a[3 * c + 2] + e * d.z), i && (i[b++] = i[2 * c] + e * f.x, i[b++] = i[2 * c + 1] + e * f.y);
					g[c][l].push(l), g[l][c] = [], v = g[c][l].length;
					for (let e = 0; e < v; e++) g[l][c][e] = g[c][l][v - 1 - e];
				}
				s[0][0] = n[e], s[1][0] = g[n[e]][n[e + 1]][1], s[1][1] = g[n[e]][n[e + 2]][1];
				for (let t = 2; t < o; t++) {
					s[t][0] = g[n[e]][n[e + 1]][t], s[t][t] = g[n[e]][n[e + 2]][t], u.x = (r[3 * s[t][t]] - r[3 * s[t][0]]) / t, u.y = (r[3 * s[t][t] + 1] - r[3 * s[t][0] + 1]) / t, u.z = (r[3 * s[t][t] + 2] - r[3 * s[t][0] + 2]) / t, a && (d.x = (a[3 * s[t][t]] - a[3 * s[t][0]]) / t, d.y = (a[3 * s[t][t] + 1] - a[3 * s[t][0] + 1]) / t, d.z = (a[3 * s[t][t] + 2] - a[3 * s[t][0] + 2]) / t), i && (f.x = (i[2 * s[t][t]] - i[2 * s[t][0]]) / t, f.y = (i[2 * s[t][t] + 1] - i[2 * s[t][0] + 1]) / t);
					for (let e = 1; e < t; e++) s[t][e] = r.length / 3, r[y++] = r[3 * s[t][0]] + e * u.x, r[y++] = r[3 * s[t][0] + 1] + e * u.y, r[y++] = r[3 * s[t][0] + 2] + e * u.z, a && (a[x++] = a[3 * s[t][0]] + e * d.x, a[x++] = a[3 * s[t][0] + 1] + e * d.y, a[x++] = a[3 * s[t][0] + 2] + e * d.z), i && (i[b++] = i[2 * s[t][0]] + e * f.x, i[b++] = i[2 * s[t][0] + 1] + e * f.y);
				}
				s[o] = g[n[e + 1]][n[e + 2]], p.push(s[0][0], s[1][0], s[1][1]);
				for (let e = 1; e < o; e++) {
					let t;
					for (t = 0; t < e; t++) p.push(s[e][t], s[e + 1][t], s[e + 1][t + 1]), p.push(s[e][t], s[e + 1][t + 1], s[e][t + 1]);
					p.push(s[e][t], s[e + 1][t], s[e + 1][t + 1]);
				}
			}
			t.indices = p, t.applyToMesh(this, this.isVertexBufferUpdatable(j.PositionKind));
		}
	}
	forceSharedVertices() {
		let e = B.ExtractFromMesh(this), t = e.uvs, n = e.indices, r = e.positions, i = e.colors, a = e.matricesIndices, o = e.matricesWeights, c = e.matricesIndicesExtra, l = e.matricesWeightsExtra;
		if (n === void 0 || r === void 0 || n === null || r === null) s.Warn("VertexData contains empty entries");
		else {
			let s = [], u = [], d = [], f = [], p = [], m = [], h = [], g = [], _, v = 0, y = {}, b, x;
			for (let e = 0; e < n.length; e += 3) {
				x = [
					n[e],
					n[e + 1],
					n[e + 2]
				], _ = [];
				for (let e = 0; e < 3; e++) {
					_[e] = "";
					for (let t = 0; t < 3; t++) Math.abs(r[3 * x[e] + t]) < 1e-8 && (r[3 * x[e] + t] = 0), _[e] += r[3 * x[e] + t] + "|";
				}
				if (_[0] != _[1] && _[0] != _[2] && _[1] != _[2]) for (let e = 0; e < 3; e++) {
					if (b = y[_[e]], b === void 0) {
						y[_[e]] = v, b = v++;
						for (let t = 0; t < 3; t++) s.push(r[3 * x[e] + t]);
						if (i != null) for (let t = 0; t < 4; t++) f.push(i[4 * x[e] + t]);
						if (t != null) for (let n = 0; n < 2; n++) d.push(t[2 * x[e] + n]);
						if (a != null) for (let t = 0; t < 4; t++) p.push(a[4 * x[e] + t]);
						if (o != null) for (let t = 0; t < 4; t++) m.push(o[4 * x[e] + t]);
						if (c != null) for (let t = 0; t < 4; t++) h.push(c[4 * x[e] + t]);
						if (l != null) for (let t = 0; t < 4; t++) g.push(l[4 * x[e] + t]);
					}
					u.push(b);
				}
			}
			let S = [];
			B.ComputeNormals(s, u, S), e.positions = s, e.indices = u, e.normals = S, t != null && (e.uvs = d), i != null && (e.colors = f), a != null && (e.matricesIndices = p), o != null && (e.matricesWeights = m), c != null && (e.matricesIndicesExtra = h), o != null && (e.matricesWeightsExtra = g), e.applyToMesh(this, this.isVertexBufferUpdatable(j.PositionKind));
		}
	}
	static _instancedMeshFactory(e, t) {
		throw n("InstancedMesh");
	}
	static _PhysicsImpostorParser(e, t, r) {
		throw n("PhysicsImpostor");
	}
	createInstance(t) {
		let n = e._instancedMeshFactory(t, this);
		return n.parent = this.parent, n;
	}
	synchronizeInstances() {
		for (let e = 0; e < this.instances.length; e++) this.instances[e]._syncSubMeshes();
		return this;
	}
	optimizeIndices(e) {
		let t = this.getIndices(), n = this.getVerticesData(j.PositionKind);
		if (!n || !t) return this;
		let r = [];
		for (let e = 0; e < n.length; e += 3) r.push(h.FromArray(n, e));
		let i = [];
		return Ce.SyncAsyncForLoop(r.length, 40, (e) => {
			let t = r.length - 1 - e, n = r[t];
			for (let e = 0; e < t; ++e) {
				let a = r[e];
				if (n.equals(a)) {
					i[t] = e;
					break;
				}
			}
		}, () => {
			for (let e = 0; e < t.length; ++e) t[e] = i[t[e]] || t[e];
			let n = this.subMeshes.slice(0);
			this.setIndices(t), this.subMeshes = n, e && e(this);
		}), this;
	}
	serialize(e = {}) {
		e.name = this.name, e.id = this.id, e.uniqueId = this.uniqueId, e.type = this.getClassName(), T && T.HasTags(this) && (e.tags = T.GetTags(this)), e.position = this.position.asArray(), this.rotationQuaternion ? e.rotationQuaternion = this.rotationQuaternion.asArray() : this.rotation && (e.rotation = this.rotation.asArray()), e.scaling = this.scaling.asArray(), this._postMultiplyPivotMatrix ? e.pivotMatrix = this.getPivotMatrix().asArray() : e.localMatrix = this.getPivotMatrix().asArray(), e.isEnabled = this.isEnabled(!1), e.isVisible = this.isVisible, e.infiniteDistance = this.infiniteDistance, e.pickable = this.isPickable, e.receiveShadows = this.receiveShadows, e.billboardMode = this.billboardMode, e.visibility = this.visibility, e.alwaysSelectAsActiveMesh = this.alwaysSelectAsActiveMesh, e.checkCollisions = this.checkCollisions, e.ellipsoid = this.ellipsoid.asArray(), e.ellipsoidOffset = this.ellipsoidOffset.asArray(), e.doNotSyncBoundingInfo = this.doNotSyncBoundingInfo, e.isBlocker = this.isBlocker, e.sideOrientation = this.sideOrientation, this.parent && this.parent._serializeAsParent(e), e.isUnIndexed = this.isUnIndexed;
		let t = this._geometry;
		if (t && this.subMeshes) {
			e.geometryUniqueId = t.uniqueId, e.geometryId = t.id, e.subMeshes = [];
			for (let t = 0; t < this.subMeshes.length; t++) {
				let n = this.subMeshes[t];
				e.subMeshes.push({
					materialIndex: n.materialIndex,
					verticesStart: n.verticesStart,
					verticesCount: n.verticesCount,
					indexStart: n.indexStart,
					indexCount: n.indexCount
				});
			}
		}
		if (this.material ? this.material.doNotSerialize || (e.materialUniqueId = this.material.uniqueId, e.materialId = this.material.id) : (this.material = null, e.materialUniqueId = this._scene.defaultMaterial.uniqueId, e.materialId = this._scene.defaultMaterial.id), this.morphTargetManager && (e.morphTargetManagerId = this.morphTargetManager.uniqueId), this.skeleton && (e.skeletonId = this.skeleton.id, e.skeletonUniqueId = this.skeleton.uniqueId, e.numBoneInfluencers = this.numBoneInfluencers), this.getScene()._getComponent(Te.NAME_PHYSICSENGINE)) {
			let t = this.getPhysicsImpostor();
			t && (e.physicsMass = t.getParam("mass"), e.physicsFriction = t.getParam("friction"), e.physicsRestitution = t.getParam("mass"), e.physicsImpostor = t.type);
		}
		this.metadata && (e.metadata = this.metadata), e.instances = [];
		for (let t = 0; t < this.instances.length; t++) {
			let n = this.instances[t];
			if (n.doNotSerialize) continue;
			let r = {
				name: n.name,
				id: n.id,
				isEnabled: n.isEnabled(!1),
				isVisible: n.isVisible,
				isPickable: n.isPickable,
				checkCollisions: n.checkCollisions,
				position: n.position.asArray(),
				scaling: n.scaling.asArray()
			};
			if (n.parent && n.parent._serializeAsParent(r), n.rotationQuaternion ? r.rotationQuaternion = n.rotationQuaternion.asArray() : n.rotation && (r.rotation = n.rotation.asArray()), this.getScene()._getComponent(Te.NAME_PHYSICSENGINE)) {
				let e = n.getPhysicsImpostor();
				e && (r.physicsMass = e.getParam("mass"), r.physicsFriction = e.getParam("friction"), r.physicsRestitution = e.getParam("mass"), r.physicsImpostor = e.type);
			}
			n.metadata && (r.metadata = n.metadata), n.actionManager && (r.actions = n.actionManager.serialize(n.name)), e.instances.push(r), D.AppendSerializedAnimations(n, r), r.ranges = n.serializeAnimationRanges();
		}
		if (this._thinInstanceDataStorage.instancesCount && this._thinInstanceDataStorage.matrixData && (e.thinInstances = {
			instancesCount: this._thinInstanceDataStorage.instancesCount,
			matrixData: Array.from(this._thinInstanceDataStorage.matrixData),
			matrixBufferSize: this._thinInstanceDataStorage.matrixBufferSize,
			enablePicking: this.thinInstanceEnablePicking
		}, this._userThinInstanceBuffersStorage)) {
			let t = {
				data: {},
				sizes: {},
				strides: {}
			};
			for (let e in this._userThinInstanceBuffersStorage.data) t.data[e] = Array.from(this._userThinInstanceBuffersStorage.data[e]), t.sizes[e] = this._userThinInstanceBuffersStorage.sizes[e], t.strides[e] = this._userThinInstanceBuffersStorage.strides[e];
			e.thinInstances.userThinInstance = t;
		}
		return D.AppendSerializedAnimations(this, e), e.ranges = this.serializeAnimationRanges(), e.layerMask = this.layerMask, e.alphaIndex = this.alphaIndex, e.hasVertexAlpha = this.hasVertexAlpha, e.overlayAlpha = this.overlayAlpha, e.overlayColor = this.overlayColor.asArray(), e.renderOverlay = this.renderOverlay, e.applyFog = this.applyFog, this.actionManager && (e.actions = this.actionManager.serialize(this.name)), e;
	}
	_syncGeometryWithMorphTargetManager() {
		if (!this.geometry) return;
		this._markSubMeshesAsAttributesDirty();
		let e = this._internalAbstractMeshDataInfo._morphTargetManager;
		if (e && e.vertexCount) {
			if (e.vertexCount !== this.getTotalVertices()) {
				s.Error("Mesh is incompatible with morph targets. Targets and mesh must all have the same vertices count."), this.morphTargetManager = null;
				return;
			}
			if (e.isUsingTextureForTargets) return;
			for (let t = 0; t < e.numInfluencers; t++) {
				let n = e.getActiveTarget(t), r = n.getPositions();
				if (!r) {
					s.Error("Invalid morph target. Target must have positions.");
					return;
				}
				this.geometry.setVerticesData(j.PositionKind + t, r, !1, 3);
				let i = n.getNormals();
				i && this.geometry.setVerticesData(j.NormalKind + t, i, !1, 3);
				let a = n.getTangents();
				a && this.geometry.setVerticesData(j.TangentKind + t, a, !1, 3);
				let o = n.getUVs();
				o && this.geometry.setVerticesData(j.UVKind + "_" + t, o, !1, 2);
				let c = n.getUV2s();
				c && this.geometry.setVerticesData(j.UV2Kind + "_" + t, c, !1, 2);
				let l = n.getColors();
				l && this.geometry.setVerticesData(j.ColorKind + t, l, !1, 4);
			}
		} else {
			let e = 0;
			for (; this.geometry.isVerticesDataPresent(j.PositionKind + e);) this.geometry.removeVerticesData(j.PositionKind + e), this.geometry.isVerticesDataPresent(j.NormalKind + e) && this.geometry.removeVerticesData(j.NormalKind + e), this.geometry.isVerticesDataPresent(j.TangentKind + e) && this.geometry.removeVerticesData(j.TangentKind + e), this.geometry.isVerticesDataPresent(j.UVKind + e) && this.geometry.removeVerticesData(j.UVKind + "_" + e), this.geometry.isVerticesDataPresent(j.UV2Kind + e) && this.geometry.removeVerticesData(j.UV2Kind + "_" + e), this.geometry.isVerticesDataPresent(j.ColorKind + e) && this.geometry.removeVerticesData(j.ColorKind + e), e++;
		}
	}
	static Parse(t, n, r) {
		let i;
		if (i = t.type && t.type === "LinesMesh" ? e._LinesMeshParser(t, n) : t.type && t.type === "GroundMesh" ? e._GroundMeshParser(t, n) : t.type && t.type === "GoldbergMesh" ? e._GoldbergMeshParser(t, n) : t.type && t.type === "GreasedLineMesh" ? e._GreasedLineMeshParser(t, n) : t.type && t.type === "TrailMesh" ? e._TrailMeshParser(t, n) : new e(t.name, n), i.id = t.id, i._waitingParsedUniqueId = t.uniqueId, T && T.AddTagsTo(i, t.tags), i.position = h.FromArray(t.position), t.metadata !== void 0 && (i.metadata = t.metadata), t.rotationQuaternion ? i.rotationQuaternion = y.FromArray(t.rotationQuaternion) : t.rotation && (i.rotation = h.FromArray(t.rotation)), i.scaling = h.FromArray(t.scaling), t.localMatrix ? i.setPreTransformMatrix(S.FromArray(t.localMatrix)) : t.pivotMatrix && i.setPivotMatrix(S.FromArray(t.pivotMatrix)), i.setEnabled(t.isEnabled), i.isVisible = t.isVisible, i.infiniteDistance = t.infiniteDistance, i.alwaysSelectAsActiveMesh = !!t.alwaysSelectAsActiveMesh, i.showBoundingBox = t.showBoundingBox, i.showSubMeshesBoundingBox = t.showSubMeshesBoundingBox, t.applyFog !== void 0 && (i.applyFog = t.applyFog), t.pickable !== void 0 && (i.isPickable = t.pickable), t.alphaIndex !== void 0 && (i.alphaIndex = t.alphaIndex), i.receiveShadows = t.receiveShadows, t.billboardMode !== void 0 && (i.billboardMode = t.billboardMode), t.visibility !== void 0 && (i.visibility = t.visibility), i.checkCollisions = t.checkCollisions, i.doNotSyncBoundingInfo = !!t.doNotSyncBoundingInfo, t.ellipsoid && (i.ellipsoid = h.FromArray(t.ellipsoid)), t.ellipsoidOffset && (i.ellipsoidOffset = h.FromArray(t.ellipsoidOffset)), t.overrideMaterialSideOrientation != null && (i.sideOrientation = t.overrideMaterialSideOrientation), t.sideOrientation !== void 0 && (i.sideOrientation = t.sideOrientation), t.isBlocker !== void 0 && (i.isBlocker = t.isBlocker), i._shouldGenerateFlatShading = t.useFlatShading, t.freezeWorldMatrix && (i._waitingData.freezeWorldMatrix = t.freezeWorldMatrix), t.parentId !== void 0 && (i._waitingParentId = t.parentId), t.parentInstanceIndex !== void 0 && (i._waitingParentInstanceIndex = t.parentInstanceIndex), t.actions !== void 0 && (i._waitingData.actions = t.actions), t.overlayAlpha !== void 0 && (i.overlayAlpha = t.overlayAlpha), t.overlayColor !== void 0 && (i.overlayColor = E.FromArray(t.overlayColor)), t.renderOverlay !== void 0 && (i.renderOverlay = t.renderOverlay), i.isUnIndexed = !!t.isUnIndexed, i.hasVertexAlpha = t.hasVertexAlpha, t.delayLoadingFile ? (i.delayLoadState = 4, i.delayLoadingFile = r + t.delayLoadingFile, i.buildBoundingInfo(h.FromArray(t.boundingBoxMinimum), h.FromArray(t.boundingBoxMaximum)), t._binaryInfo && (i._binaryInfo = t._binaryInfo), i._delayInfo = [], t.hasUVs && i._delayInfo.push(j.UVKind), t.hasUVs2 && i._delayInfo.push(j.UV2Kind), t.hasUVs3 && i._delayInfo.push(j.UV3Kind), t.hasUVs4 && i._delayInfo.push(j.UV4Kind), t.hasUVs5 && i._delayInfo.push(j.UV5Kind), t.hasUVs6 && i._delayInfo.push(j.UV6Kind), t.hasColors && i._delayInfo.push(j.ColorKind), t.hasMatricesIndices && i._delayInfo.push(j.MatricesIndicesKind), t.hasMatricesWeights && i._delayInfo.push(j.MatricesWeightsKind), i._delayLoadingFunction = Qe._ImportGeometry, Ze.ForceFullSceneLoadingForIncremental && i._checkDelayState()) : Qe._ImportGeometry(t, i), t.materialUniqueId ? i._waitingMaterialId = t.materialUniqueId : t.materialId && (i._waitingMaterialId = t.materialId), t.morphTargetManagerId > -1 && (i._waitingMorphTargetManagerId = t.morphTargetManagerId), t.skeletonId !== void 0 && t.skeletonId !== null && (i.skeleton = n.getLastSkeletonById(t.skeletonId), i._waitingSkeletonId = t.skeletonId, t.numBoneInfluencers && (i.numBoneInfluencers = t.numBoneInfluencers)), t.skeletonUniqueId !== void 0 && t.skeletonUniqueId !== null && (i._waitingSkeletonUniqueId = t.skeletonUniqueId), t.animations) {
			for (let e = 0; e < t.animations.length; e++) {
				let n = t.animations[e], r = ee("BABYLON.Animation");
				r && i.animations.push(r.Parse(n));
			}
			L.ParseAnimationRanges(i, t, n);
		}
		if (t.autoAnimate && n.beginAnimation(i, t.autoAnimateFrom, t.autoAnimateTo, t.autoAnimateLoop, t.autoAnimateSpeed || 1), t.layerMask && !isNaN(t.layerMask) ? i.layerMask = Math.abs(parseInt(t.layerMask)) : i.layerMask = 268435455, t.physicsImpostor && (i.physicsImpostor = e._PhysicsImpostorParser(n, i, t)), t.lodMeshIds && (i._waitingData.lods = {
			ids: t.lodMeshIds,
			distances: t.lodDistances ? t.lodDistances : null,
			coverages: t.lodCoverages ? t.lodCoverages : null
		}), t.instances) for (let r = 0; r < t.instances.length; r++) {
			let a = t.instances[r], o = i.createInstance(a.name);
			if (a.id && (o.id = a.id), T && (a.tags ? T.AddTagsTo(o, a.tags) : T.AddTagsTo(o, t.tags)), o.position = h.FromArray(a.position), a.metadata !== void 0 && (o.metadata = a.metadata), a.parentId !== void 0 && (o._waitingParentId = a.parentId), a.parentInstanceIndex !== void 0 && (o._waitingParentInstanceIndex = a.parentInstanceIndex), a.isEnabled !== void 0 && a.isEnabled !== null && o.setEnabled(a.isEnabled), a.isVisible !== void 0 && a.isVisible !== null && (o.isVisible = a.isVisible), a.isPickable !== void 0 && a.isPickable !== null && (o.isPickable = a.isPickable), a.rotationQuaternion ? o.rotationQuaternion = y.FromArray(a.rotationQuaternion) : a.rotation && (o.rotation = h.FromArray(a.rotation)), o.scaling = h.FromArray(a.scaling), a.checkCollisions != null && a.checkCollisions != null && (o.checkCollisions = a.checkCollisions), a.pickable != null && a.pickable != null && (o.isPickable = a.pickable), a.showBoundingBox != null && a.showBoundingBox != null && (o.showBoundingBox = a.showBoundingBox), a.showSubMeshesBoundingBox != null && a.showSubMeshesBoundingBox != null && (o.showSubMeshesBoundingBox = a.showSubMeshesBoundingBox), a.alphaIndex != null && a.showSubMeshesBoundingBox != null && (o.alphaIndex = a.alphaIndex), a.physicsImpostor && (o.physicsImpostor = e._PhysicsImpostorParser(n, o, a)), a.actions !== void 0 && (o._waitingData.actions = a.actions), a.animations) {
				for (let e = 0; e < a.animations.length; e++) {
					let t = a.animations[e], n = ee("BABYLON.Animation");
					n && o.animations.push(n.Parse(t));
				}
				L.ParseAnimationRanges(o, a, n), a.autoAnimate && n.beginAnimation(o, a.autoAnimateFrom, a.autoAnimateTo, a.autoAnimateLoop, a.autoAnimateSpeed || 1);
			}
		}
		if (t.thinInstances) {
			let e = t.thinInstances;
			if (i.thinInstanceEnablePicking = !!e.enablePicking, e.matrixData ? (i.thinInstanceSetBuffer("matrix", new Float32Array(e.matrixData), 16, !1), i._thinInstanceDataStorage.matrixBufferSize = e.matrixBufferSize, i._thinInstanceDataStorage.instancesCount = e.instancesCount) : i._thinInstanceDataStorage.matrixBufferSize = e.matrixBufferSize, t.thinInstances.userThinInstance) {
				let e = t.thinInstances.userThinInstance;
				for (let t in e.data) i.thinInstanceSetBuffer(t, new Float32Array(e.data[t]), e.strides[t], !1), i._userThinInstanceBuffersStorage.sizes[t] = e.sizes[t];
			}
		}
		return i;
	}
	setPositionsForCPUSkinning() {
		let e = this._internalMeshDataInfo;
		if (!e._sourcePositions) {
			let t = this.getVerticesData(j.PositionKind);
			if (!t) return e._sourcePositions;
			e._sourcePositions = new Float32Array(t), this.isVertexBufferUpdatable(j.PositionKind) || this.setVerticesData(j.PositionKind, t, !0);
		}
		return e._sourcePositions;
	}
	setNormalsForCPUSkinning() {
		let e = this._internalMeshDataInfo;
		if (!e._sourceNormals) {
			let t = this.getVerticesData(j.NormalKind);
			if (!t) return e._sourceNormals;
			e._sourceNormals = new Float32Array(t), this.isVertexBufferUpdatable(j.NormalKind) || this.setVerticesData(j.NormalKind, t, !0);
		}
		return e._sourceNormals;
	}
	applySkeleton(e) {
		if (!this.geometry || this.geometry._softwareSkinningFrameId == this.getScene().getFrameId() || (this.geometry._softwareSkinningFrameId = this.getScene().getFrameId(), !this.isVerticesDataPresent(j.PositionKind)) || !this.isVerticesDataPresent(j.MatricesIndicesKind) || !this.isVerticesDataPresent(j.MatricesWeightsKind)) return this;
		let t = this.isVerticesDataPresent(j.NormalKind), n = this._internalMeshDataInfo;
		if (!n._sourcePositions) {
			let e = this.subMeshes.slice();
			this.setPositionsForCPUSkinning(), this.subMeshes = e;
		}
		t && !n._sourceNormals && this.setNormalsForCPUSkinning();
		let r = this.getVerticesData(j.PositionKind);
		if (!r) return this;
		r instanceof Float32Array || (r = new Float32Array(r));
		let i = this.getVerticesData(j.NormalKind);
		if (t) {
			if (!i) return this;
			i instanceof Float32Array || (i = new Float32Array(i));
		}
		let a = this.getVerticesData(j.MatricesIndicesKind), o = this.getVerticesData(j.MatricesWeightsKind);
		if (!o || !a) return this;
		let s = this.numBoneInfluencers > 4, c = s ? this.getVerticesData(j.MatricesIndicesExtraKind) : null, l = s ? this.getVerticesData(j.MatricesWeightsExtraKind) : null, u = e.getTransformMatrices(this), d = h.Zero(), f = new S(), p = new S(), m = 0, g;
		for (let e = 0; e < r.length; e += 3, m += 4) {
			let _;
			for (g = 0; g < 4; g++) _ = o[m + g], _ > 0 && (S.FromFloat32ArrayToRefScaled(u, Math.floor(a[m + g] * 16), _, p), f.addToSelf(p));
			if (s) for (g = 0; g < 4; g++) _ = l[m + g], _ > 0 && (S.FromFloat32ArrayToRefScaled(u, Math.floor(c[m + g] * 16), _, p), f.addToSelf(p));
			h.TransformCoordinatesFromFloatsToRef(n._sourcePositions[e], n._sourcePositions[e + 1], n._sourcePositions[e + 2], f, d), d.toArray(r, e), t && (h.TransformNormalFromFloatsToRef(n._sourceNormals[e], n._sourceNormals[e + 1], n._sourceNormals[e + 2], f, d), d.toArray(i, e)), f.reset();
		}
		return this.updateVerticesData(j.PositionKind, r), t && this.updateVerticesData(j.NormalKind, i), this;
	}
	static MinMax(e) {
		let t = null, n = null;
		for (let r of e) {
			let e = r.getBoundingInfo().boundingBox;
			!t || !n ? (t = e.minimumWorld.clone(), n = e.maximumWorld.clone()) : (t.minimizeInPlace(e.minimumWorld), n.maximizeInPlace(e.maximumWorld));
		}
		return !t || !n ? {
			min: h.Zero(),
			max: h.Zero()
		} : {
			min: t,
			max: n
		};
	}
	static Center(t) {
		let n = t instanceof Array ? e.MinMax(t) : t;
		return h.Center(n.min, n.max);
	}
	static MergeMeshes(t, n = !0, r, i, a, o) {
		return Ie(e._MergeMeshesCoroutine(t, n, r, i, a, o, !1));
	}
	static async MergeMeshesAsync(t, n = !0, r, i, a, o) {
		return await Le(e._MergeMeshesCoroutine(t, n, r, i, a, o, !0), Pe());
	}
	static *_MergeMeshesCoroutine(t, n = !0, r, i, a, o, c) {
		if (t = t.filter(Boolean), t.length === 0) return null;
		let l;
		if (!r) {
			let e = 0;
			for (l = 0; l < t.length; l++) if (e += t[l].getTotalVertices(), e >= 65536) return s.Warn("Cannot merge meshes because resulting mesh will have more than 65536 vertices. Please use allow32BitsIndices = true to use 32 bits indices"), null;
		}
		o && (a = !1);
		let u = [], d = [], f = [], p = t[0].sideOrientation;
		for (l = 0; l < t.length; l++) {
			let e = t[l];
			if (e.isAnInstance) return s.Warn("Cannot merge instance meshes."), null;
			if (p !== e.sideOrientation) return s.Warn("Cannot merge meshes with different sideOrientation values."), null;
			if (a || o) {
				let t = f.reduce((e, t) => Math.max(e, t.start + t.count), 0);
				if (o) {
					if (e.material) {
						let n = e.material;
						if (n instanceof Wt) {
							for (let e = 0; e < n.subMaterials.length; e++) u.indexOf(n.subMaterials[e]) < 0 && u.push(n.subMaterials[e]);
							for (let r = 0; r < e.subMeshes.length; r++) d.push(u.indexOf(n.subMaterials[e.subMeshes[r].materialIndex])), f.push({
								start: t + e.subMeshes[r].indexStart,
								count: e.subMeshes[r].indexCount
							});
						} else {
							u.indexOf(n) < 0 && u.push(n);
							for (let r = 0; r < e.subMeshes.length; r++) d.push(u.indexOf(n)), f.push({
								start: t + e.subMeshes[r].indexStart,
								count: e.subMeshes[r].indexCount
							});
						}
					} else for (let n = 0; n < e.subMeshes.length; n++) d.push(0), f.push({
						start: t + e.subMeshes[n].indexStart,
						count: e.subMeshes[n].indexCount
					});
				} else f.push({
					start: t,
					count: e.getTotalIndices()
				});
			}
		}
		let m = t[0], h = (e) => {
			let t = e.computeWorldMatrix(!0);
			return {
				vertexData: B.ExtractFromMesh(e, !1, !1),
				transform: t
			};
		}, { vertexData: g, transform: _ } = h(m);
		c && (yield);
		let v = Array(t.length - 1);
		for (let e = 1; e < t.length; e++) v[e - 1] = h(t[e]), c && (yield);
		let y = g._mergeCoroutine(_, v, r, c, !n), b = y.next();
		for (; !b.done;) c && (yield), b = y.next();
		let x = b.value;
		i ||= new e(m.name + "_merged", m.getScene());
		let S = x._applyToCoroutine(i, void 0, c), C = S.next();
		for (; !C.done;) c && (yield), C = S.next();
		if (i.checkCollisions = m.checkCollisions, i.sideOrientation = m.sideOrientation, n) for (l = 0; l < t.length; l++) t[l].dispose();
		if (a || o) {
			for (i.releaseSubMeshes(), l = 0; l < f.length;) Ye.CreateFromIndices(0, f[l].start, f[l].count, i, void 0, !1), l++;
			for (let e of i.subMeshes) e.refreshBoundingInfo();
			i.computeWorldMatrix(!0);
		}
		if (o) {
			let e = new Wt(m.name + "_merged", m.getScene());
			e.subMaterials = u;
			for (let e = 0; e < i.subMeshes.length; e++) i.subMeshes[e].materialIndex = d[e];
			i.material = e;
		} else i.material = m.material;
		return i;
	}
	addInstance(e) {
		e._indexInSourceMeshInstanceArray = this.instances.length, this.instances.push(e);
	}
	removeInstance(e) {
		let t = e._indexInSourceMeshInstanceArray;
		if (t != -1) {
			if (t !== this.instances.length - 1) {
				let e = this.instances[this.instances.length - 1];
				this.instances[t] = e, e._indexInSourceMeshInstanceArray = t;
			}
			e._indexInSourceMeshInstanceArray = -1, this.instances.pop();
		}
	}
	_shouldConvertRHS() {
		return this._scene.useRightHandedSystem && this.sideOrientation === G.CounterClockWiseSideOrientation;
	}
	_getRenderingFillMode(e) {
		let t = this.getScene();
		return t.forcePointsCloud ? G.PointFillMode : t.forceWireframe ? G.WireFrameFillMode : this.overrideRenderingFillMode ?? e;
	}
	setMaterialByID(e) {
		return this.setMaterialById(e);
	}
	static CreateRibbon(e, t, n, r, i, a, o, s, c) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateDisc(e, t, n, r, i, a) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateBox(e, t, n, r, i) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateSphere(e, t, n, r, i, a) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateHemisphere(e, t, n, r) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateCylinder(e, t, n, r, i, a, o, s, c) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateTorus(e, t, n, r, i, a, o) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateTorusKnot(e, t, n, r, i, a, o, s, c, l) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateLines(e, t, n, r, i) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateDashedLines(e, t, n, r, i, a, o, s) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreatePolygon(e, t, n, r, i, a, o) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static ExtrudePolygon(e, t, n, r, i, a, o, s) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static ExtrudeShape(e, t, n, r, i, a, o, s, c, l) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static ExtrudeShapeCustom(e, t, n, r, i, a, o, s, c, l, u, d) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateLathe(e, t, n, r, i, a, o) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreatePlane(e, t, n, r, i) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateGround(e, t, n, r, i, a) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateTiledGround(e, t, n, r, i, a, o, s, c) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateGroundFromHeightMap(e, t, n, r, i, a, o, s, c, l, u) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateTube(e, t, n, r, i, a, o, s, c, l) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreatePolyhedron(e, t, n) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateIcoSphere(e, t, n) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateDecal(e, t, n, r, i, a) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static CreateCapsule(e, t, n) {
		throw Error("Import MeshBuilder to populate this function");
	}
	static ExtendToGoldberg(e) {
		throw Error("Import MeshBuilder to populate this function");
	}
};
K.FRONTSIDE = B.FRONTSIDE, K.BACKSIDE = B.BACKSIDE, K.DOUBLESIDE = B.DOUBLESIDE, K.DEFAULTSIDE = B.DEFAULTSIDE, K.NO_CAP = 0, K.CAP_START = 1, K.CAP_END = 2, K.CAP_ALL = 3, K.NO_FLIP = 0, K.FLIP_TILE = 1, K.ROTATE_TILE = 2, K.FLIP_ROW = 3, K.ROTATE_ROW = 4, K.FLIP_N_ROTATE_TILE = 5, K.FLIP_N_ROTATE_ROW = 6, K.CENTER = 0, K.LEFT = 1, K.RIGHT = 2, K.TOP = 3, K.BOTTOM = 4, K.INSTANCEDMESH_SORT_TRANSPARENT = !1, K._GroundMeshParser = (e, t) => {
	throw n("GroundMesh");
}, K._GoldbergMeshParser = (e, t) => {
	throw n("GoldbergMesh");
}, K._LinesMeshParser = (e, t) => {
	throw n("LinesMesh");
}, K._GreasedLineMeshParser = (e, t) => {
	throw n("GreasedLineMesh");
}, K._GreasedLineRibbonMeshParser = (e, t) => {
	throw n("GreasedLineRibbonMesh");
}, K._TrailMeshParser = (e, t) => {
	throw n("TrailMesh");
}, C("BABYLON.Mesh", K);
//#endregion
//#region node_modules/@babylonjs/core/Behaviors/Cameras/autoRotationBehavior.js
var Qt = class {
	constructor() {
		this._zoomStopsAnimation = !1, this._idleRotationSpeed = .05, this._idleRotationWaitTime = 2e3, this._idleRotationSpinupTime = 2e3, this.targetAlpha = null, this._attachedCamera = null, this._isPointerDown = !1, this._lastFrameTime = null, this._lastInteractionTime = -Infinity, this._cameraRotationSpeed = 0, this._lastFrameRadius = 0;
	}
	get name() {
		return "AutoRotation";
	}
	set zoomStopsAnimation(e) {
		this._zoomStopsAnimation = e;
	}
	get zoomStopsAnimation() {
		return this._zoomStopsAnimation;
	}
	set idleRotationSpeed(e) {
		this._idleRotationSpeed = e;
	}
	get idleRotationSpeed() {
		return this._idleRotationSpeed;
	}
	set idleRotationWaitTime(e) {
		this._idleRotationWaitTime = e;
	}
	get idleRotationWaitTime() {
		return this._idleRotationWaitTime;
	}
	set idleRotationSpinupTime(e) {
		this._idleRotationSpinupTime = e;
	}
	get idleRotationSpinupTime() {
		return this._idleRotationSpinupTime;
	}
	get rotationInProgress() {
		return Math.abs(this._cameraRotationSpeed) > 0;
	}
	get attachedNode() {
		return this._attachedCamera;
	}
	init() {}
	attach(e) {
		this._attachedCamera = e;
		let t = this._attachedCamera.getScene();
		this._onPrePointerObservableObserver = t.onPrePointerObservable.add((e) => {
			if (e.type === I.POINTERDOWN) {
				this._isPointerDown = !0;
				return;
			}
			e.type === I.POINTERUP && (this._isPointerDown = !1);
		}), this._onAfterCheckInputsObserver = e.onAfterCheckInputsObservable.add(() => {
			if (this._reachTargetAlpha()) return;
			let e = i.Now, t = 0;
			this._lastFrameTime != null && (t = e - this._lastFrameTime), this._lastFrameTime = e, this._applyUserInteraction();
			let n = e - this._lastInteractionTime - this._idleRotationWaitTime, r = Math.max(Math.min(n / this._idleRotationSpinupTime, 1), 0);
			this._cameraRotationSpeed = this._idleRotationSpeed * r, this._attachedCamera && (this._attachedCamera.alpha -= this._cameraRotationSpeed * (t / 1e3));
		});
	}
	detach() {
		if (!this._attachedCamera) return;
		let e = this._attachedCamera.getScene();
		this._onPrePointerObservableObserver && e.onPrePointerObservable.remove(this._onPrePointerObservableObserver), this._attachedCamera.onAfterCheckInputsObservable.remove(this._onAfterCheckInputsObserver), this._attachedCamera = null, this._lastFrameTime = null;
	}
	resetLastInteractionTime(e) {
		this._lastInteractionTime = e ?? i.Now;
	}
	_reachTargetAlpha() {
		return this._attachedCamera && this.targetAlpha ? Math.abs(this._attachedCamera.alpha - this.targetAlpha) < g : !1;
	}
	_userIsZooming() {
		return this._attachedCamera ? this._attachedCamera.inertialRadiusOffset !== 0 : !1;
	}
	_shouldAnimationStopForInteraction() {
		if (!this._attachedCamera) return !1;
		let e = !1;
		return this._lastFrameRadius === this._attachedCamera.radius && this._attachedCamera.inertialRadiusOffset !== 0 && (e = !0), this._lastFrameRadius = this._attachedCamera.radius, this._zoomStopsAnimation ? e : this._userIsZooming();
	}
	_applyUserInteraction() {
		this._userIsMoving() && !this._shouldAnimationStopForInteraction() && (this._lastInteractionTime = i.Now);
	}
	_userIsMoving() {
		return this._attachedCamera ? this._attachedCamera.inertialAlphaOffset !== 0 || this._attachedCamera.inertialBetaOffset !== 0 || this._attachedCamera.inertialRadiusOffset !== 0 || this._attachedCamera.inertialPanningX !== 0 || this._attachedCamera.inertialPanningY !== 0 || this._isPointerDown : !1;
	}
}, $t = class e {
	constructor() {
		this._easingMode = e.EASINGMODE_EASEIN;
	}
	setEasingMode(e) {
		let t = Math.min(Math.max(e, 0), 2);
		this._easingMode = t;
	}
	getEasingMode() {
		return this._easingMode;
	}
	easeInCore(e) {
		throw Error("You must implement this method");
	}
	ease(t) {
		switch (this._easingMode) {
			case e.EASINGMODE_EASEIN: return this.easeInCore(t);
			case e.EASINGMODE_EASEOUT: return 1 - this.easeInCore(1 - t);
		}
		return t >= .5 ? (1 - this.easeInCore((1 - t) * 2)) * .5 + .5 : this.easeInCore(t * 2) * .5;
	}
};
$t.EASINGMODE_EASEIN = 0, $t.EASINGMODE_EASEOUT = 1, $t.EASINGMODE_EASEINOUT = 2;
var en = class extends $t {
	constructor(e = 1) {
		super(), this.amplitude = e;
	}
	easeInCore(e) {
		let t = Math.max(0, this.amplitude);
		return e ** 3 - e * t * Math.sin(3.141592653589793 * e);
	}
}, tn = class extends $t {
	constructor(e = 2) {
		super(), this.exponent = e;
	}
	easeInCore(e) {
		return this.exponent <= 0 ? e : (Math.exp(this.exponent * e) - 1) / (Math.exp(this.exponent) - 1);
	}
}, nn = class e {
	constructor(e, t, n) {
		this.name = e, this.from = t, this.to = n;
	}
	clone() {
		return new e(this.name, this.from, this.to);
	}
}, rn = Object.freeze(new y(0, 0, 0, 0)), an = Object.freeze(h.Zero()), on = Object.freeze(_.Zero()), sn = Object.freeze(re.Zero()), cn = Object.freeze(E.Black()), ln = Object.freeze(new O(0, 0, 0, 0)), q = {
	key: 0,
	repeatCount: 0,
	loopMode: 2
}, J = class e {
	static _PrepareAnimation(t, n, r, i, a, o, s, c) {
		let l;
		if (!isNaN(parseFloat(a)) && isFinite(a) ? l = e.ANIMATIONTYPE_FLOAT : a instanceof y ? l = e.ANIMATIONTYPE_QUATERNION : a instanceof h ? l = e.ANIMATIONTYPE_VECTOR3 : a instanceof _ ? l = e.ANIMATIONTYPE_VECTOR2 : a instanceof E ? l = e.ANIMATIONTYPE_COLOR3 : a instanceof O ? l = e.ANIMATIONTYPE_COLOR4 : a instanceof re && (l = e.ANIMATIONTYPE_SIZE), l == null) return null;
		let u = new e(t, n, r, l, s), d = [{
			frame: 0,
			value: a
		}, {
			frame: i,
			value: o
		}];
		return u.setKeys(d), c !== void 0 && u.setEasingFunction(c), u;
	}
	static CreateAnimation(t, n, r, i) {
		let a = new e(t + "Animation", t, r, n, e.ANIMATIONLOOPMODE_CONSTANT);
		return a.setEasingFunction(i), a;
	}
	static CreateAndStartAnimation(t, n, r, i, a, o, s, c, l, u, d) {
		let f = e._PrepareAnimation(t, r, i, a, o, s, c, l);
		return !f || (n.getScene && (d = n.getScene()), !d) ? null : d.beginDirectAnimation(n, [f], 0, a, f.loopMode !== e.ANIMATIONLOOPMODE_CONSTANT, 1, u);
	}
	static CreateAndStartHierarchyAnimation(t, n, r, i, a, o, s, c, l, u, d) {
		let f = e._PrepareAnimation(t, i, a, o, s, c, l, u);
		return f ? n.getScene().beginDirectHierarchyAnimation(n, r, [f], 0, o, f.loopMode === 1, 1, d) : null;
	}
	static CreateMergeAndStartAnimation(t, n, r, i, a, o, s, c, l, u) {
		let d = e._PrepareAnimation(t, r, i, a, o, s, c, l);
		return d ? (n.animations.push(d), n.getScene().beginAnimation(n, 0, a, d.loopMode === 1, 1, u)) : null;
	}
	static MakeAnimationAdditive(t, n, r, i = !1, a) {
		let o;
		o = typeof n == "object" ? n : {
			referenceFrame: n ?? 0,
			range: r,
			cloneOriginalAnimation: i,
			clonedAnimationName: a
		};
		let s = t;
		if (o.cloneOriginalAnimation && (s = t.clone(), s.name = o.clonedAnimationName || s.name), !s._keys.length) return s;
		let c = o.referenceFrame && o.referenceFrame >= 0 ? o.referenceFrame : 0, l = 0, u = s._keys[0], d = s._keys.length - 1, f = s._keys[d], p = {
			referenceValue: u.value,
			referencePosition: x.Vector3[0],
			referenceQuaternion: x.Quaternion[0],
			referenceScaling: x.Vector3[1],
			keyPosition: x.Vector3[2],
			keyQuaternion: x.Quaternion[1],
			keyScaling: x.Vector3[3]
		}, m = u.frame, h = f.frame;
		if (o.range) {
			let e = s.getRange(o.range);
			e && (m = e.from, h = e.to);
		} else m = o.fromFrame ?? m, h = o.toFrame ?? h;
		if (m !== u.frame && (l = s.createKeyForFrame(m)), h !== f.frame && (d = s.createKeyForFrame(h)), s._keys.length === 1) {
			let e = s._getKeyValue(s._keys[0]);
			p.referenceValue = e.clone ? e.clone() : e;
		} else if (c <= u.frame) {
			let e = s._getKeyValue(u.value);
			p.referenceValue = e.clone ? e.clone() : e;
		} else if (c >= f.frame) {
			let e = s._getKeyValue(f.value);
			p.referenceValue = e.clone ? e.clone() : e;
		} else {
			q.key = 0;
			let e = s._interpolate(c, q);
			p.referenceValue = e.clone ? e.clone() : e;
		}
		s.dataType === e.ANIMATIONTYPE_QUATERNION ? p.referenceValue.normalize().conjugateInPlace() : s.dataType === e.ANIMATIONTYPE_MATRIX && (p.referenceValue.decompose(p.referenceScaling, p.referenceQuaternion, p.referencePosition), p.referenceQuaternion.normalize().conjugateInPlace());
		let g = Number.MAX_VALUE, _ = o.clipKeys ? [] : null;
		for (let t = l; t <= d; t++) {
			let n = s._keys[t];
			if ((_ || o.cloneOriginalAnimation) && (n = {
				frame: n.frame,
				value: n.value.clone ? n.value.clone() : n.value,
				inTangent: n.inTangent,
				outTangent: n.outTangent,
				interpolation: n.interpolation,
				lockedTangent: n.lockedTangent,
				easingFunction: n.easingFunction
			}, _ && (g === Number.MAX_VALUE && (g = n.frame), n.frame -= g, _.push(n))), !(t && s.dataType !== e.ANIMATIONTYPE_FLOAT && n.value === u.value)) switch (s.dataType) {
				case e.ANIMATIONTYPE_MATRIX:
					n.value.decompose(p.keyScaling, p.keyQuaternion, p.keyPosition), p.keyPosition.subtractInPlace(p.referencePosition), p.keyScaling.divideInPlace(p.referenceScaling), p.referenceQuaternion.multiplyToRef(p.keyQuaternion, p.keyQuaternion), S.ComposeToRef(p.keyScaling, p.keyQuaternion, p.keyPosition, n.value);
					break;
				case e.ANIMATIONTYPE_QUATERNION:
					p.referenceValue.multiplyToRef(n.value, n.value);
					break;
				case e.ANIMATIONTYPE_VECTOR2:
				case e.ANIMATIONTYPE_VECTOR3:
				case e.ANIMATIONTYPE_COLOR3:
				case e.ANIMATIONTYPE_COLOR4:
					n.value.subtractToRef(p.referenceValue, n.value);
					break;
				case e.ANIMATIONTYPE_SIZE:
					n.value.width -= p.referenceValue.width, n.value.height -= p.referenceValue.height;
					break;
				default: n.value -= p.referenceValue;
			}
		}
		return _ && s.setKeys(_, !0), s;
	}
	static TransitionTo(e, t, n, r, i, a, o, s = null, c = !0, l) {
		if (o <= 0) return n[e] = t, s && s(), null;
		let u = o / 1e3 * i;
		return a.setKeys(l ?? [{
			frame: 0,
			value: n[e].clone ? n[e].clone() : n[e]
		}, {
			frame: u,
			value: t
		}]), n.animations ||= [], n.animations.push(a), r.beginAnimation(n, 0, u, !1, 1, s ?? void 0, void 0, c);
	}
	get runtimeAnimations() {
		return this._runtimeAnimations;
	}
	get hasRunningRuntimeAnimations() {
		for (let e of this._runtimeAnimations) if (!e.isStopped()) return !0;
		return !1;
	}
	constructor(t, n, r, i, a, o) {
		this.name = t, this.targetProperty = n, this.framePerSecond = r, this.dataType = i, this.loopMode = a, this.enableBlending = o, this._easingFunction = null, this._runtimeAnimations = [], this._events = [], this.blendingSpeed = .01, this._ranges = {}, this._coreAnimation = null, this.targetPropertyPath = n.split("."), this.dataType = i, this.loopMode = a === void 0 ? e.ANIMATIONLOOPMODE_CYCLE : a, this.uniqueId = e._UniqueIdGenerator++;
	}
	toString(e) {
		let t = "Name: " + this.name + ", property: " + this.targetProperty;
		if (t += ", datatype: " + [
			"Float",
			"Vector3",
			"Quaternion",
			"Matrix",
			"Color3",
			"Vector2"
		][this.dataType], t += ", nKeys: " + (this._keys ? this._keys.length : "none"), t += ", nRanges: " + (this._ranges ? Object.keys(this._ranges).length : "none"), e) {
			t += ", Ranges: {";
			let e = !0;
			for (let n in this._ranges) e &&= (t += ", ", !1), t += n;
			t += "}";
		}
		return t;
	}
	addEvent(e) {
		this._events.push(e), this._events.sort((e, t) => e.frame - t.frame);
	}
	removeEvents(e) {
		for (let t = 0; t < this._events.length; t++) this._events[t].frame === e && (this._events.splice(t, 1), t--);
	}
	getEvents() {
		return this._events;
	}
	createRange(e, t, n) {
		this._ranges[e] || (this._ranges[e] = new nn(e, t, n));
	}
	deleteRange(e, t = !0) {
		let n = this._ranges[e];
		if (n) {
			if (t) {
				let e = n.from, t = n.to;
				for (let n = this._keys.length - 1; n >= 0; n--) this._keys[n].frame >= e && this._keys[n].frame <= t && this._keys.splice(n, 1);
			}
			this._ranges[e] = null;
		}
	}
	getRange(e) {
		return this._ranges[e];
	}
	getKeys() {
		return this._keys;
	}
	getHighestFrame() {
		let e = 0;
		for (let t = 0, n = this._keys.length; t < n; t++) e < this._keys[t].frame && (e = this._keys[t].frame);
		return e;
	}
	getEasingFunction() {
		return this._easingFunction;
	}
	setEasingFunction(e) {
		this._easingFunction = e;
	}
	floatInterpolateFunction(e, t, n) {
		return te(e, t, n);
	}
	floatInterpolateFunctionWithTangents(e, t, n, r, i) {
		return ne(e, t, n, r, i);
	}
	quaternionInterpolateFunction(e, t, n) {
		return y.Slerp(e, t, n);
	}
	quaternionInterpolateFunctionWithTangents(e, t, n, r, i) {
		return y.Hermite(e, t, n, r, i).normalize();
	}
	vector3InterpolateFunction(e, t, n) {
		return h.Lerp(e, t, n);
	}
	vector3InterpolateFunctionWithTangents(e, t, n, r, i) {
		return h.Hermite(e, t, n, r, i);
	}
	vector2InterpolateFunction(e, t, n) {
		return _.Lerp(e, t, n);
	}
	vector2InterpolateFunctionWithTangents(e, t, n, r, i) {
		return _.Hermite(e, t, n, r, i);
	}
	sizeInterpolateFunction(e, t, n) {
		return re.Lerp(e, t, n);
	}
	color3InterpolateFunction(e, t, n) {
		return E.Lerp(e, t, n);
	}
	color3InterpolateFunctionWithTangents(e, t, n, r, i) {
		return E.Hermite(e, t, n, r, i);
	}
	color4InterpolateFunction(e, t, n) {
		return O.Lerp(e, t, n);
	}
	color4InterpolateFunctionWithTangents(e, t, n, r, i) {
		return O.Hermite(e, t, n, r, i);
	}
	_getKeyValue(e) {
		return typeof e == "function" ? e() : e;
	}
	evaluate(e) {
		return q.key = 0, this._interpolate(e, q);
	}
	_interpolate(t, n, r = !1) {
		if (n.loopMode === e.ANIMATIONLOOPMODE_CONSTANT && n.repeatCount > 0) return n.highLimitValue.clone ? n.highLimitValue.clone() : n.highLimitValue;
		let i = this._keys, a;
		if (this._coreAnimation) a = this._coreAnimation._key;
		else {
			let e = i.length;
			for (a = n.key; a >= 0 && t < i[a].frame;) --a;
			for (; a + 1 <= e - 1 && t >= i[a + 1].frame;) ++a;
			if (n.key = a, a < 0) return r ? void 0 : this._getKeyValue(i[0].value);
			if (a + 1 > e - 1) return r ? void 0 : this._getKeyValue(i[e - 1].value);
			this._key = a;
		}
		let o = i[a], s = i[a + 1];
		if (r && (t === o.frame || t === s.frame)) return;
		let c = this._getKeyValue(o.value), l = this._getKeyValue(s.value);
		if (o.interpolation === 1) return s.frame > t ? c : l;
		let u = o.outTangent !== void 0 && s.inTangent !== void 0, d = s.frame - o.frame, f = (t - o.frame) / d, p = o.easingFunction || this.getEasingFunction();
		switch (p && (f = p.ease(f)), this.dataType) {
			case e.ANIMATIONTYPE_FLOAT: {
				let t = u ? this.floatInterpolateFunctionWithTangents(c, o.outTangent * d, l, s.inTangent * d, f) : this.floatInterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return (n.offsetValue ?? 0) * n.repeatCount + t;
				}
				break;
			}
			case e.ANIMATIONTYPE_QUATERNION: {
				let t = u ? this.quaternionInterpolateFunctionWithTangents(c, o.outTangent.scale(d), l, s.inTangent.scale(d), f) : this.quaternionInterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return t.addInPlace((n.offsetValue || rn).scale(n.repeatCount));
				}
				return t;
			}
			case e.ANIMATIONTYPE_VECTOR3: {
				let t = u ? this.vector3InterpolateFunctionWithTangents(c, o.outTangent.scale(d), l, s.inTangent.scale(d), f) : this.vector3InterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return t.add((n.offsetValue || an).scale(n.repeatCount));
				}
				break;
			}
			case e.ANIMATIONTYPE_VECTOR2: {
				let t = u ? this.vector2InterpolateFunctionWithTangents(c, o.outTangent.scale(d), l, s.inTangent.scale(d), f) : this.vector2InterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return t.add((n.offsetValue || on).scale(n.repeatCount));
				}
				break;
			}
			case e.ANIMATIONTYPE_SIZE:
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return this.sizeInterpolateFunction(c, l, f);
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return this.sizeInterpolateFunction(c, l, f).add((n.offsetValue || sn).scale(n.repeatCount));
				}
				break;
			case e.ANIMATIONTYPE_COLOR3: {
				let t = u ? this.color3InterpolateFunctionWithTangents(c, o.outTangent.scale(d), l, s.inTangent.scale(d), f) : this.color3InterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return t.add((n.offsetValue || cn).scale(n.repeatCount));
				}
				break;
			}
			case e.ANIMATIONTYPE_COLOR4: {
				let t = u ? this.color4InterpolateFunctionWithTangents(c, o.outTangent.scale(d), l, s.inTangent.scale(d), f) : this.color4InterpolateFunction(c, l, f);
				switch (n.loopMode) {
					case e.ANIMATIONLOOPMODE_CYCLE:
					case e.ANIMATIONLOOPMODE_CONSTANT:
					case e.ANIMATIONLOOPMODE_YOYO: return t;
					case e.ANIMATIONLOOPMODE_RELATIVE:
					case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return t.add((n.offsetValue || ln).scale(n.repeatCount));
				}
				break;
			}
			case e.ANIMATIONTYPE_MATRIX: switch (n.loopMode) {
				case e.ANIMATIONLOOPMODE_CYCLE:
				case e.ANIMATIONLOOPMODE_CONSTANT:
				case e.ANIMATIONLOOPMODE_YOYO: return e.AllowMatricesInterpolation ? this.matrixInterpolateFunction(c, l, f, n.workValue) : c;
				case e.ANIMATIONLOOPMODE_RELATIVE:
				case e.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT: return c;
			}
		}
		return 0;
	}
	matrixInterpolateFunction(t, n, r, i) {
		return e.AllowMatrixDecomposeForInterpolation ? i ? (S.DecomposeLerpToRef(t, n, r, i), i) : S.DecomposeLerp(t, n, r) : i ? (S.LerpToRef(t, n, r, i), i) : S.Lerp(t, n, r);
	}
	clone(t = !1) {
		let n = new e(this.name, this.targetPropertyPath.join("."), this.framePerSecond, this.dataType, this.loopMode);
		if (n.enableBlending = this.enableBlending, n.blendingSpeed = this.blendingSpeed, this._keys && n.setKeys(this._keys, !1, t), this._ranges) {
			n._ranges = {};
			for (let e in this._ranges) {
				let t = this._ranges[e];
				t && (n._ranges[e] = t.clone());
			}
		}
		return n;
	}
	setKeys(e, t = !1, n = !1) {
		if (t) this._keys = e;
		else if (this._keys = e.slice(0), n) for (let e = 0; e < this._keys.length; e++) {
			let t = this._keys[e];
			this._keys[e] = {
				frame: t.frame,
				value: t.value.clone ? t.value.clone() : t.value,
				inTangent: t.inTangent && t.inTangent.clone ? t.inTangent.clone() : t.inTangent,
				outTangent: t.outTangent && t.outTangent.clone ? t.outTangent.clone() : t.outTangent,
				interpolation: t.interpolation,
				lockedTangent: t.lockedTangent,
				easingFunction: t.easingFunction
			};
		}
	}
	createKeyForFrame(e) {
		q.key = 0;
		let t = this._interpolate(e, q, !0);
		if (!t) return this._keys[q.key].frame === e ? q.key : q.key + 1;
		let n = {
			frame: e,
			value: t.clone ? t.clone() : t
		};
		return this._keys.splice(q.key + 1, 0, n), q.key + 1;
	}
	serialize() {
		let t = {};
		t.name = this.name, t.property = this.targetProperty, t.framePerSecond = this.framePerSecond, t.dataType = this.dataType, t.loopBehavior = this.loopMode, t.enableBlending = this.enableBlending, t.blendingSpeed = this.blendingSpeed;
		let n = this.dataType;
		t.keys = [];
		let r = this.getKeys();
		for (let i = 0; i < r.length; i++) {
			let a = r[i], o = {};
			switch (o.frame = a.frame, n) {
				case e.ANIMATIONTYPE_FLOAT:
					o.values = [a.value], a.inTangent !== void 0 && o.values.push(a.inTangent), a.outTangent !== void 0 && (a.inTangent === void 0 && o.values.push(void 0), o.values.push(a.outTangent)), a.interpolation !== void 0 && (a.inTangent === void 0 && o.values.push(void 0), a.outTangent === void 0 && o.values.push(void 0), o.values.push(a.interpolation));
					break;
				case e.ANIMATIONTYPE_QUATERNION:
				case e.ANIMATIONTYPE_MATRIX:
				case e.ANIMATIONTYPE_VECTOR3:
				case e.ANIMATIONTYPE_COLOR3:
				case e.ANIMATIONTYPE_COLOR4: o.values = a.value.asArray(), a.inTangent != null && o.values.push(a.inTangent.asArray()), a.outTangent != null && (a.inTangent === void 0 && o.values.push(void 0), o.values.push(a.outTangent.asArray())), a.interpolation !== void 0 && (a.inTangent === void 0 && o.values.push(void 0), a.outTangent === void 0 && o.values.push(void 0), o.values.push(a.interpolation));
			}
			t.keys.push(o);
		}
		t.ranges = [];
		for (let e in this._ranges) {
			let n = this._ranges[e];
			if (!n) continue;
			let r = {};
			r.name = e, r.from = n.from, r.to = n.to, t.ranges.push(r);
		}
		return t;
	}
	static _UniversalLerp(e, t, n) {
		let r = e.constructor;
		return r.Lerp ? r.Lerp(e, t, n) : r.Slerp ? r.Slerp(e, t, n) : e.toFixed ? e * (1 - n) + n * t : t;
	}
	static Parse(t) {
		let n = new e(t.name, t.property, t.framePerSecond, t.dataType, t.loopBehavior), r = t.dataType, i = [], a, o;
		for (t.enableBlending && (n.enableBlending = t.enableBlending), t.blendingSpeed && (n.blendingSpeed = t.blendingSpeed), o = 0; o < t.keys.length; o++) {
			let n = t.keys[o], s, c, l;
			switch (r) {
				case e.ANIMATIONTYPE_FLOAT:
					a = n.values[0], n.values.length >= 2 && (s = n.values[1]), n.values.length >= 3 && (c = n.values[2]), n.values.length >= 4 && (l = n.values[3]);
					break;
				case e.ANIMATIONTYPE_QUATERNION:
					if (a = y.FromArray(n.values), n.values.length >= 8) {
						let e = y.FromArray(n.values.slice(4, 8));
						e.equals(y.Zero()) || (s = e);
					}
					if (n.values.length >= 12) {
						let e = y.FromArray(n.values.slice(8, 12));
						e.equals(y.Zero()) || (c = e);
					}
					n.values.length >= 13 && (l = n.values[12]);
					break;
				case e.ANIMATIONTYPE_MATRIX:
					a = S.FromArray(n.values), n.values.length >= 17 && (l = n.values[16]);
					break;
				case e.ANIMATIONTYPE_COLOR3:
					a = E.FromArray(n.values), n.values[3] && (s = E.FromArray(n.values[3])), n.values[4] && (c = E.FromArray(n.values[4])), n.values[5] && (l = n.values[5]);
					break;
				case e.ANIMATIONTYPE_COLOR4:
					a = O.FromArray(n.values), n.values[4] && (s = O.FromArray(n.values[4])), n.values[5] && (c = O.FromArray(n.values[5])), n.values[6] && (l = O.FromArray(n.values[6]));
					break;
				case e.ANIMATIONTYPE_VECTOR3:
				default: a = h.FromArray(n.values), n.values[3] && (s = h.FromArray(n.values[3])), n.values[4] && (c = h.FromArray(n.values[4])), n.values[5] && (l = n.values[5]);
			}
			let u = {};
			u.frame = n.frame, u.value = a, s != null && (u.inTangent = s), c != null && (u.outTangent = c), l != null && (u.interpolation = l), i.push(u);
		}
		if (n.setKeys(i), t.ranges) for (o = 0; o < t.ranges.length; o++) a = t.ranges[o], n.createRange(a.name, a.from, a.to);
		return n;
	}
	static AppendSerializedAnimations(e, t) {
		D.AppendSerializedAnimations(e, t);
	}
	static async ParseFromFileAsync(e, t) {
		return await new Promise((n, r) => {
			let i = new we();
			i.addEventListener("readystatechange", () => {
				if (i.readyState == 4) {
					if (i.status == 200) {
						let t = JSON.parse(i.responseText);
						if (t.animations && (t = t.animations), t.length) {
							let e = [];
							for (let n of t) e.push(this.Parse(n));
							n(e);
						} else {
							let r = this.Parse(t);
							e && (r.name = e), n(r);
						}
					} else r("Unable to load the animation");
				}
			}), i.open("GET", t), i.send();
		});
	}
	static async ParseFromSnippetAsync(e) {
		return await new Promise((t, n) => {
			let r = new we();
			r.addEventListener("readystatechange", () => {
				if (r.readyState == 4) {
					if (r.status == 200) {
						let n = JSON.parse(JSON.parse(r.responseText).jsonPayload);
						if (n.animations) {
							let r = JSON.parse(n.animations), i = [];
							for (let t of r.animations) {
								let n = this.Parse(t);
								n.snippetId = e, i.push(n);
							}
							t(i);
						} else {
							let r = JSON.parse(n.animation), i = this.Parse(r);
							i.snippetId = e, t(i);
						}
					} else n("Unable to load the snippet " + e);
				}
			}), r.open("GET", this.SnippetUrl + "/" + e.replace(/#/g, "/")), r.send();
		});
	}
};
J._UniqueIdGenerator = 0, J.AllowMatricesInterpolation = !1, J.AllowMatrixDecomposeForInterpolation = !0, J.SnippetUrl = "https://snippet.babylonjs.com", J.ANIMATIONTYPE_FLOAT = 0, J.ANIMATIONTYPE_VECTOR3 = 1, J.ANIMATIONTYPE_QUATERNION = 2, J.ANIMATIONTYPE_MATRIX = 3, J.ANIMATIONTYPE_COLOR3 = 4, J.ANIMATIONTYPE_COLOR4 = 7, J.ANIMATIONTYPE_VECTOR2 = 5, J.ANIMATIONTYPE_SIZE = 6, J.ANIMATIONLOOPMODE_RELATIVE = 0, J.ANIMATIONLOOPMODE_CYCLE = 1, J.ANIMATIONLOOPMODE_CONSTANT = 2, J.ANIMATIONLOOPMODE_YOYO = 4, J.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT = 5, J.CreateFromSnippetAsync = J.ParseFromSnippetAsync, C("BABYLON.Animation", J), L._AnimationRangeFactory = (e, t, n) => new nn(e, t, n);
//#endregion
//#region node_modules/@babylonjs/core/Behaviors/Cameras/bouncingBehavior.js
var un = class e {
	constructor() {
		this.transitionDuration = 450, this.lowerRadiusTransitionRange = 2, this.upperRadiusTransitionRange = -2, this._autoTransitionRange = !1, this._attachedCamera = null, this._radiusIsAnimating = !1, this._radiusBounceTransition = null, this._animatables = [];
	}
	get name() {
		return "Bouncing";
	}
	get autoTransitionRange() {
		return this._autoTransitionRange;
	}
	set autoTransitionRange(e) {
		if (this._autoTransitionRange === e) return;
		this._autoTransitionRange = e;
		let t = this._attachedCamera;
		t && (e ? this._onMeshTargetChangedObserver = t.onMeshTargetChangedObservable.add((e) => {
			if (e && (e.computeWorldMatrix(!0), e.getBoundingInfo)) {
				let t = e.getBoundingInfo().diagonalLength;
				this.lowerRadiusTransitionRange = t * .05, this.upperRadiusTransitionRange = t * .05;
			}
		}) : this._onMeshTargetChangedObserver && t.onMeshTargetChangedObservable.remove(this._onMeshTargetChangedObserver));
	}
	get attachedNode() {
		return this._attachedCamera;
	}
	init() {}
	attach(e) {
		this._attachedCamera = e, this._onAfterCheckInputsObserver = e.onAfterCheckInputsObservable.add(() => {
			this._attachedCamera && (this._isRadiusAtLimit(this._attachedCamera.lowerRadiusLimit) && this._applyBoundRadiusAnimation(this.lowerRadiusTransitionRange), this._isRadiusAtLimit(this._attachedCamera.upperRadiusLimit) && this._applyBoundRadiusAnimation(this.upperRadiusTransitionRange));
		});
	}
	detach() {
		this._attachedCamera &&= (this._onAfterCheckInputsObserver && this._attachedCamera.onAfterCheckInputsObservable.remove(this._onAfterCheckInputsObserver), this._onMeshTargetChangedObserver && this._attachedCamera.onMeshTargetChangedObservable.remove(this._onMeshTargetChangedObserver), null);
	}
	_isRadiusAtLimit(e) {
		return this._attachedCamera ? this._attachedCamera.radius === e && !this._radiusIsAnimating : !1;
	}
	_applyBoundRadiusAnimation(t) {
		if (!this._attachedCamera) return;
		this._radiusBounceTransition ||= (e.EasingFunction.setEasingMode(e.EasingMode), J.CreateAnimation("radius", J.ANIMATIONTYPE_FLOAT, 60, e.EasingFunction)), this._cachedWheelPrecision = this._attachedCamera.wheelPrecision, this._attachedCamera.wheelPrecision = Infinity, this._attachedCamera.inertialRadiusOffset = 0, this.stopAllAnimations(), this._radiusIsAnimating = !0;
		let n = J.TransitionTo("radius", this._attachedCamera.radius + t, this._attachedCamera, this._attachedCamera.getScene(), 60, this._radiusBounceTransition, this.transitionDuration, () => this._clearAnimationLocks());
		n && this._animatables.push(n);
	}
	_clearAnimationLocks() {
		this._radiusIsAnimating = !1, this._attachedCamera && (this._attachedCamera.wheelPrecision = this._cachedWheelPrecision);
	}
	stopAllAnimations() {
		for (this._attachedCamera && (this._attachedCamera.animations = []); this._animatables.length;) this._animatables[0].onAnimationEnd = null, this._animatables[0].stop(), this._animatables.shift();
	}
};
un.EasingFunction = new en(.3), un.EasingMode = $t.EASINGMODE_EASEOUT;
//#endregion
//#region node_modules/@babylonjs/core/Behaviors/Cameras/framingBehavior.js
var dn = class e {
	constructor() {
		this.onTargetFramingAnimationEndObservable = new t(), this._mode = e.FitFrustumSidesMode, this._radiusScale = 1, this._positionScale = .5, this._defaultElevation = .3, this._elevationReturnTime = 1500, this._elevationReturnWaitTime = 1e3, this._zoomStopsAnimation = !1, this._framingTime = 1500, this.autoCorrectCameraLimitsAndSensibility = !0, this._attachedCamera = null, this._isPointerDown = !1, this._lastInteractionTime = -Infinity, this._animatables = [], this._betaIsAnimating = !1;
	}
	get name() {
		return "Framing";
	}
	set mode(e) {
		this._mode = e;
	}
	get mode() {
		return this._mode;
	}
	set radiusScale(e) {
		this._radiusScale = e;
	}
	get radiusScale() {
		return this._radiusScale;
	}
	set positionScale(e) {
		this._positionScale = e;
	}
	get positionScale() {
		return this._positionScale;
	}
	set defaultElevation(e) {
		this._defaultElevation = e;
	}
	get defaultElevation() {
		return this._defaultElevation;
	}
	set elevationReturnTime(e) {
		this._elevationReturnTime = e;
	}
	get elevationReturnTime() {
		return this._elevationReturnTime;
	}
	set elevationReturnWaitTime(e) {
		this._elevationReturnWaitTime = e;
	}
	get elevationReturnWaitTime() {
		return this._elevationReturnWaitTime;
	}
	set zoomStopsAnimation(e) {
		this._zoomStopsAnimation = e;
	}
	get zoomStopsAnimation() {
		return this._zoomStopsAnimation;
	}
	set framingTime(e) {
		this._framingTime = e;
	}
	get framingTime() {
		return this._framingTime;
	}
	get attachedNode() {
		return this._attachedCamera;
	}
	init() {}
	attach(t) {
		this._attachedCamera = t;
		let n = this._attachedCamera.getScene();
		e.EasingFunction.setEasingMode(e.EasingMode), this._onPrePointerObservableObserver = n.onPrePointerObservable.add((e) => {
			if (e.type === I.POINTERDOWN) {
				this._isPointerDown = !0;
				return;
			}
			e.type === I.POINTERUP && (this._isPointerDown = !1);
		}), this._onMeshTargetChangedObserver = t.onMeshTargetChangedObservable.add((e) => {
			e && e.getBoundingInfo && this.zoomOnMesh(e, void 0, () => {
				this.onTargetFramingAnimationEndObservable.notifyObservers();
			});
		}), this._onAfterCheckInputsObserver = t.onAfterCheckInputsObservable.add(() => {
			this._applyUserInteraction(), this._maintainCameraAboveGround();
		});
	}
	detach() {
		if (!this._attachedCamera) return;
		let e = this._attachedCamera.getScene();
		this._onPrePointerObservableObserver && e.onPrePointerObservable.remove(this._onPrePointerObservableObserver), this._onAfterCheckInputsObserver && this._attachedCamera.onAfterCheckInputsObservable.remove(this._onAfterCheckInputsObserver), this._onMeshTargetChangedObserver && this._attachedCamera.onMeshTargetChangedObservable.remove(this._onMeshTargetChangedObserver), this._attachedCamera = null;
	}
	zoomOnMesh(e, t = !1, n = null) {
		e.computeWorldMatrix(!0);
		let r = e.getBoundingInfo().boundingBox;
		this.zoomOnBoundingInfo(r.minimumWorld, r.maximumWorld, t, n);
	}
	zoomOnMeshHierarchy(e, t = !1, n = null) {
		e.computeWorldMatrix(!0);
		let r = e.getHierarchyBoundingVectors(!0);
		this.zoomOnBoundingInfo(r.min, r.max, t, n);
	}
	zoomOnMeshesHierarchy(e, t = !1, n = null) {
		let r = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), i = new h(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
		for (let t = 0; t < e.length; t++) {
			let n = e[t].getHierarchyBoundingVectors(!0);
			h.CheckExtends(n.min, r, i), h.CheckExtends(n.max, r, i);
		}
		this.zoomOnBoundingInfo(r, i, t, n);
	}
	zoomOnBoundingInfo(t, n, r = !1, i = null) {
		let a;
		if (!this._attachedCamera) return !1;
		let o = t.y, s = o + (n.y - o) * this._positionScale, c = n.subtract(t).scale(.5);
		if (!isFinite(s)) return !1;
		if (r) a = new h(0, s, 0);
		else {
			let e = t.add(c);
			a = new h(e.x, s, e.z);
		}
		this._vectorTransition ||= J.CreateAnimation("target", J.ANIMATIONTYPE_VECTOR3, 60, e.EasingFunction), this._betaIsAnimating = !0;
		let l = J.TransitionTo("target", a, this._attachedCamera, this._attachedCamera.getScene(), 60, this._vectorTransition, this._framingTime);
		l && this._animatables.push(l);
		let u = 0;
		if (this._mode === e.FitFrustumSidesMode) {
			let e = this._calculateLowerRadiusFromModelBoundingSphere(t, n);
			this.autoCorrectCameraLimitsAndSensibility && (this._attachedCamera.lowerRadiusLimit = c.length() + this._attachedCamera.minZ), u = e;
		} else this._mode === e.IgnoreBoundsSizeMode && (u = this._calculateLowerRadiusFromModelBoundingSphere(t, n), this.autoCorrectCameraLimitsAndSensibility && this._attachedCamera.lowerRadiusLimit === null && (this._attachedCamera.lowerRadiusLimit = this._attachedCamera.minZ));
		if (this.autoCorrectCameraLimitsAndSensibility) {
			let e = n.subtract(t).length();
			this._attachedCamera.panningSensibility = 5e3 / e, this._attachedCamera.wheelPrecision = 100 / u;
		}
		return this._radiusTransition ||= J.CreateAnimation("radius", J.ANIMATIONTYPE_FLOAT, 60, e.EasingFunction), l = J.TransitionTo("radius", u, this._attachedCamera, this._attachedCamera.getScene(), 60, this._radiusTransition, this._framingTime, () => {
			this.stopAllAnimations(), i && i(), this._attachedCamera && this._attachedCamera.useInputToRestoreState && this._attachedCamera.storeState();
		}), l && this._animatables.push(l), !0;
	}
	_calculateLowerRadiusFromModelBoundingSphere(t, n) {
		let r = this._attachedCamera;
		if (!r) return 0;
		let i = r._calculateLowerRadiusFromModelBoundingSphere(t, n, this._radiusScale);
		return r.lowerRadiusLimit && this._mode === e.IgnoreBoundsSizeMode && (i = i < r.lowerRadiusLimit ? r.lowerRadiusLimit : i), r.upperRadiusLimit && (i = i > r.upperRadiusLimit ? r.upperRadiusLimit : i), i;
	}
	_maintainCameraAboveGround() {
		if (this._elevationReturnTime < 0) return;
		let t = i.Now - this._lastInteractionTime, n = Math.PI * .5 - this._defaultElevation, r = Math.PI * .5;
		if (this._attachedCamera && !this._betaIsAnimating && this._attachedCamera.beta > r && t >= this._elevationReturnWaitTime) {
			this._betaIsAnimating = !0, this.stopAllAnimations(), this._betaTransition ||= J.CreateAnimation("beta", J.ANIMATIONTYPE_FLOAT, 60, e.EasingFunction);
			let t = J.TransitionTo("beta", n, this._attachedCamera, this._attachedCamera.getScene(), 60, this._betaTransition, this._elevationReturnTime, () => {
				this._clearAnimationLocks(), this.stopAllAnimations();
			});
			t && this._animatables.push(t);
		}
	}
	_clearAnimationLocks() {
		this._betaIsAnimating = !1;
	}
	_applyUserInteraction() {
		this.isUserIsMoving && (this._lastInteractionTime = i.Now, this.stopAllAnimations(), this._clearAnimationLocks());
	}
	stopAllAnimations() {
		for (this._attachedCamera && (this._attachedCamera.animations = []); this._animatables.length;) this._animatables[0] && (this._animatables[0].onAnimationEnd = null, this._animatables[0].stop()), this._animatables.shift();
	}
	get isUserIsMoving() {
		return this._attachedCamera ? this._attachedCamera.inertialAlphaOffset !== 0 || this._attachedCamera.inertialBetaOffset !== 0 || this._attachedCamera.inertialRadiusOffset !== 0 || this._attachedCamera.inertialPanningX !== 0 || this._attachedCamera.inertialPanningY !== 0 || this._isPointerDown : !1;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Cameras/targetCamera.js
dn.EasingFunction = new tn(), dn.EasingMode = $t.EASINGMODE_EASEINOUT, dn.IgnoreBoundsSizeMode = 0, dn.FitFrustumSidesMode = 1, L.AddNodeConstructor("TargetCamera", (e, t) => () => new mn(e, h.Zero(), t));
var fn = S.Zero(), pn = y.Identity(), mn = class e extends R {
	constructor(e, t, n, r = !0) {
		super(e, t, n, r), this.cameraDirection = new h(0, 0, 0), this.cameraRotation = new _(0, 0), this.updateUpVectorFromRotation = !1, this.speed = 2, this.noRotationConstraint = !1, this.invertRotation = !1, this.inverseRotationSpeed = .2, this._panningEpsilon = g, this._rotationEpsilon = g, this.lockedTarget = null, this._currentTarget = h.Zero(), this._initialFocalDistance = 1, this._viewMatrix = S.Zero(), this._cameraTransformMatrix = S.Zero(), this._cameraRotationMatrix = S.Zero(), this._transformedReferencePoint = h.Zero(), this._deferredPositionUpdate = new h(), this._deferredRotationQuaternionUpdate = new y(), this._deferredRotationUpdate = new h(), this._deferredUpdated = !1, this._deferOnly = !1, this._cachedRotationZ = 0, this._cachedQuaternionRotationZ = 0, this._referencePoint = h.Forward(this.getScene().useRightHandedSystem), this.rotation = new h(0, this.getScene().useRightHandedSystem ? Math.PI : 0, 0);
	}
	getFrontPosition(e) {
		this.getWorldMatrix();
		let t = x.Vector3[0], n = x.Vector3[1];
		return n.set(0, 0, this._scene.useRightHandedSystem ? -1 : 1), this.getDirectionToRef(n, t), t.scaleInPlace(e), this.globalPosition.add(t);
	}
	_getLockedTargetPosition() {
		if (!this.lockedTarget) return null;
		if (this.lockedTarget.absolutePosition) {
			let e = this.lockedTarget;
			e.computeWorldMatrix().getTranslationToRef(e.absolutePosition);
		}
		return this.lockedTarget.absolutePosition || this.lockedTarget;
	}
	storeState() {
		return this._storedPosition = this.position.clone(), this._storedRotation = this.rotation.clone(), this.rotationQuaternion && (this._storedRotationQuaternion = this.rotationQuaternion.clone()), super.storeState();
	}
	_restoreStateValues() {
		return super._restoreStateValues() ? (this.position = this._storedPosition.clone(), this.rotation = this._storedRotation.clone(), this.rotationQuaternion && this._storedRotationQuaternion && (this.rotationQuaternion = this._storedRotationQuaternion.clone()), this.cameraDirection.copyFromFloats(0, 0, 0), this.cameraRotation.copyFromFloats(0, 0), !0) : !1;
	}
	_initCache() {
		super._initCache(), this._cache.lockedTarget = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotation = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotationQuaternion = new y(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	}
	_updateCache(e) {
		e || super._updateCache();
		let t = this._getLockedTargetPosition();
		t ? this._cache.lockedTarget ? this._cache.lockedTarget.copyFrom(t) : this._cache.lockedTarget = t.clone() : this._cache.lockedTarget = null, this._cache.rotation.copyFrom(this.rotation), this.rotationQuaternion && this._cache.rotationQuaternion.copyFrom(this.rotationQuaternion);
	}
	_isSynchronizedViewMatrix() {
		if (!super._isSynchronizedViewMatrix()) return !1;
		let e = this._getLockedTargetPosition();
		return (this._cache.lockedTarget ? this._cache.lockedTarget.equals(e) : !e) && (this.rotationQuaternion ? this.rotationQuaternion.equals(this._cache.rotationQuaternion) : this._cache.rotation.equals(this.rotation));
	}
	_computeLocalCameraSpeed() {
		let e = this.getEngine();
		return this.speed * Math.sqrt(e.getDeltaTime() / (e.getFps() * 100));
	}
	setTarget(e) {
		this.upVector.normalize(), this._initialFocalDistance = e.subtract(this.position).length(), this.position.z === e.z && (this.position.z += g), this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance), this.getScene().useRightHandedSystem ? S.LookAtRHToRef(this.position, e, h.UpReadOnly, fn) : S.LookAtLHToRef(this.position, e, h.UpReadOnly, fn), fn.invert();
		let t = this.rotationQuaternion || pn;
		y.FromRotationMatrixToRef(fn, t), t.toEulerAnglesToRef(this.rotation), this.rotation.z = 0;
	}
	get target() {
		return this.getTarget();
	}
	set target(e) {
		this.setTarget(e);
	}
	getTarget() {
		return this._currentTarget;
	}
	_decideIfNeedsToMove() {
		return Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
	}
	_updatePosition() {
		if (this.parent) {
			this.parent.getWorldMatrix().invertToRef(x.Matrix[0]), h.TransformNormalToRef(this.cameraDirection, x.Matrix[0], x.Vector3[0]), this._deferredPositionUpdate.addInPlace(x.Vector3[0]), this._deferOnly ? this._deferredUpdated = !0 : this.position.copyFrom(this._deferredPositionUpdate);
			return;
		}
		this._deferredPositionUpdate.addInPlace(this.cameraDirection), this._deferOnly ? this._deferredUpdated = !0 : this.position.copyFrom(this._deferredPositionUpdate);
	}
	_checkInputs() {
		let e = this.invertRotation ? -this.inverseRotationSpeed : 1, t = this._decideIfNeedsToMove(), n = this.cameraRotation.x || this.cameraRotation.y;
		if (this._deferredUpdated = !1, this._deferredRotationUpdate.copyFrom(this.rotation), this._deferredPositionUpdate.copyFrom(this.position), this.rotationQuaternion && this._deferredRotationQuaternionUpdate.copyFrom(this.rotationQuaternion), t && this._updatePosition(), n) {
			if (this.rotationQuaternion && this.rotationQuaternion.toEulerAnglesToRef(this._deferredRotationUpdate), this._deferredRotationUpdate.x += this.cameraRotation.x * e, this._deferredRotationUpdate.y += this.cameraRotation.y * e, !this.noRotationConstraint) {
				let e = 1.570796;
				this._deferredRotationUpdate.x > e && (this._deferredRotationUpdate.x = e), this._deferredRotationUpdate.x < -1.570796 && (this._deferredRotationUpdate.x = -1.570796);
			}
			this._deferOnly ? this._deferredUpdated = !0 : this.rotation.copyFrom(this._deferredRotationUpdate), this.rotationQuaternion && this._deferredRotationUpdate.lengthSquared() && (y.RotationYawPitchRollToRef(this._deferredRotationUpdate.y, this._deferredRotationUpdate.x, this._deferredRotationUpdate.z, this._deferredRotationQuaternionUpdate), this._deferOnly ? this._deferredUpdated = !0 : this.rotationQuaternion.copyFrom(this._deferredRotationQuaternionUpdate));
		}
		let r = this.speed * this._panningEpsilon, i = this.speed * this._rotationEpsilon;
		t && (Math.abs(this.cameraDirection.x) < r && (this.cameraDirection.x = 0), Math.abs(this.cameraDirection.y) < r && (this.cameraDirection.y = 0), Math.abs(this.cameraDirection.z) < r && (this.cameraDirection.z = 0), this.cameraDirection.scaleInPlace(this.inertia)), n && (Math.abs(this.cameraRotation.x) < i && (this.cameraRotation.x = 0), Math.abs(this.cameraRotation.y) < i && (this.cameraRotation.y = 0), this.cameraRotation.scaleInPlace(this.inertia)), super._checkInputs();
	}
	_updateCameraRotationMatrix() {
		this.rotationQuaternion ? this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix) : S.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
	}
	_rotateUpVectorWithCameraRotationMatrix() {
		return h.TransformNormalToRef(h.UpReadOnly, this._cameraRotationMatrix, this.upVector), this;
	}
	_getViewMatrix() {
		return this.lockedTarget && this.setTarget(this._getLockedTargetPosition()), this._updateCameraRotationMatrix(), this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z ? (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedQuaternionRotationZ = this.rotationQuaternion.z) : this._cachedRotationZ !== this.rotation.z && (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedRotationZ = this.rotation.z), h.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint), this.position.addToRef(this._transformedReferencePoint, this._currentTarget), this.updateUpVectorFromRotation && (this.rotationQuaternion ? f.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector) : (y.FromEulerVectorToRef(this.rotation, pn), f.Y.rotateByQuaternionToRef(pn, this.upVector))), this._computeViewMatrix(this.position, this._currentTarget, this.upVector), this._viewMatrix;
	}
	_computeViewMatrix(e, t, n) {
		if (this.getScene().useRightHandedSystem ? S.LookAtRHToRef(e, t, n, this._viewMatrix) : S.LookAtLHToRef(e, t, n, this._viewMatrix), this.parent) {
			let e = this.parent.getWorldMatrix();
			this._viewMatrix.invert(), this._viewMatrix.multiplyToRef(e, this._viewMatrix), this._viewMatrix.invert(), this._markSyncedWithParent();
		}
	}
	createRigCamera(t, n) {
		if (this.cameraRigMode !== R.RIG_MODE_NONE) {
			let n = new e(t, this.position.clone(), this.getScene());
			return n.isRigCamera = !0, n.rigParent = this, this.cameraRigMode === R.RIG_MODE_VR && (this.rotationQuaternion ||= new y(), n._cameraRigParams = {}, n.rotationQuaternion = new y()), n.mode = this.mode, n.orthoLeft = this.orthoLeft, n.orthoRight = this.orthoRight, n.orthoTop = this.orthoTop, n.orthoBottom = this.orthoBottom, n;
		}
		return null;
	}
	_updateRigCameras() {
		let e = this._rigCameras[0], t = this._rigCameras[1];
		switch (this.computeWorldMatrix(), this.cameraRigMode) {
			case R.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
			case R.RIG_MODE_STEREOSCOPIC_OVERUNDER:
			case R.RIG_MODE_STEREOSCOPIC_INTERLACED: {
				let n = this.cameraRigMode === R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1, r = this.cameraRigMode === R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;
				this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * n, e), this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * r, t);
				break;
			}
			case R.RIG_MODE_VR: e.rotationQuaternion && t.rotationQuaternion && this.rotationQuaternion ? (e.rotationQuaternion.copyFrom(this.rotationQuaternion), t.rotationQuaternion.copyFrom(this.rotationQuaternion)) : (e.rotation.copyFrom(this.rotation), t.rotation.copyFrom(this.rotation)), e.position.copyFrom(this.position), t.position.copyFrom(this.position);
		}
		super._updateRigCameras();
	}
	_getRigCamPositionAndTarget(t, n) {
		this.getTarget().subtractToRef(this.position, e._TargetFocalPoint), e._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
		let r = e._TargetFocalPoint.addInPlace(this.position);
		S.TranslationToRef(-r.x, -r.y, -r.z, e._TargetTransformMatrix), e._TargetTransformMatrix.multiplyToRef(S.RotationAxis(n.upVector, t), e._RigCamTransformMatrix), S.TranslationToRef(r.x, r.y, r.z, e._TargetTransformMatrix), e._RigCamTransformMatrix.multiplyToRef(e._TargetTransformMatrix, e._RigCamTransformMatrix), h.TransformCoordinatesToRef(this.position, e._RigCamTransformMatrix, n.position), n.setTarget(r);
	}
	getClassName() {
		return "TargetCamera";
	}
};
mn._RigCamTransformMatrix = new S(), mn._TargetTransformMatrix = new S(), mn._TargetFocalPoint = new h(), M([N()], mn.prototype, "updateUpVectorFromRotation", void 0), M([he()], mn.prototype, "rotation", void 0), M([N()], mn.prototype, "speed", void 0), M([pe("lockedTargetId")], mn.prototype, "lockedTarget", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Cameras/cameraInputsManager.js
var hn = {}, gn = class {
	constructor(e) {
		this.attachedToElement = !1, this.attached = {}, this.camera = e, this.checkInputs = () => {};
	}
	add(e) {
		let t = e.getSimpleName();
		if (this.attached[t]) {
			s.Warn("camera input of type " + t + " already exists on camera");
			return;
		}
		this.attached[t] = e, e.camera = this.camera, e.checkInputs && (this.checkInputs = this._addCheckInputs(e.checkInputs.bind(e))), this.attachedToElement && e.attachControl(this.noPreventDefault);
	}
	remove(e) {
		for (let t in this.attached) {
			let n = this.attached[t];
			if (n === e) {
				n.detachControl(), n.camera = null, delete this.attached[t], this.rebuildInputCheck();
				return;
			}
		}
	}
	removeByType(e) {
		for (let t in this.attached) {
			let n = this.attached[t];
			n.getClassName() === e && (n.detachControl(), n.camera = null, delete this.attached[t], this.rebuildInputCheck());
		}
	}
	_addCheckInputs(e) {
		let t = this.checkInputs;
		return () => {
			t(), e();
		};
	}
	attachInput(e) {
		this.attachedToElement && e.attachControl(this.noPreventDefault);
	}
	attachElement(e = !1) {
		if (!this.attachedToElement) {
			e = !R.ForceAttachControlToAlwaysPreventDefault && e, this.attachedToElement = !0, this.noPreventDefault = e;
			for (let t in this.attached) this.attached[t].attachControl(e);
		}
	}
	detachElement(e = !1) {
		for (let t in this.attached) this.attached[t].detachControl(), e && (this.attached[t].camera = null);
		this.attachedToElement = !1;
	}
	rebuildInputCheck() {
		this.checkInputs = () => {};
		for (let e in this.attached) {
			let t = this.attached[e];
			t.checkInputs && (this.checkInputs = this._addCheckInputs(t.checkInputs.bind(t)));
		}
	}
	clear() {
		this.attachedToElement && this.detachElement(!0), this.attached = {}, this.attachedToElement = !1, this.checkInputs = () => {};
	}
	serialize(e) {
		let t = {};
		for (let e in this.attached) {
			let n = this.attached[e], r = D.Serialize(n);
			t[n.getClassName()] = r;
		}
		e.inputsmgr = t;
	}
	parse(e) {
		let t = e.inputsmgr;
		if (t) {
			this.clear();
			for (let e in t) {
				let n = hn[e];
				if (n) {
					let r = t[e], i = D.Parse(() => new n(), r, null);
					this.add(i);
				}
			}
		} else for (let t in this.attached) {
			let n = hn[this.attached[t].getClassName()];
			if (n) {
				let r = D.Parse(() => new n(), e, null);
				this.remove(this.attached[t]), this.add(r);
			}
		}
	}
}, _n = class {
	constructor() {
		this._currentMousePointerIdDown = -1, this.buttons = [
			0,
			1,
			2
		];
	}
	attachControl(e) {
		e = F.BackCompatCameraNoPreventDefault(arguments);
		let t = this.camera.getEngine(), n = t.getInputElement(), r = 0, i = null;
		this._pointA = null, this._pointB = null, this._altKey = !1, this._ctrlKey = !1, this._metaKey = !1, this._shiftKey = !1, this._buttonsPressed = 0, this._pointerInput = (a) => {
			let o = a.event, s = o.pointerType === "touch";
			if (a.type !== I.POINTERMOVE && this.buttons.indexOf(o.button) === -1) return;
			let c = o.target;
			if (this._altKey = o.altKey, this._ctrlKey = o.ctrlKey, this._metaKey = o.metaKey, this._shiftKey = o.shiftKey, this._buttonsPressed = o.buttons, t.isPointerLock) {
				let e = o.movementX, t = o.movementY;
				this.onTouch(null, e, t), this._pointA = null, this._pointB = null;
			} else if (a.type !== I.POINTERDOWN && a.type !== I.POINTERDOUBLETAP && s && this._pointA?.pointerId !== o.pointerId && this._pointB?.pointerId !== o.pointerId) return;
			else if (a.type === I.POINTERDOWN && (this._currentMousePointerIdDown === -1 || s)) {
				try {
					c?.setPointerCapture(o.pointerId);
				} catch {}
				if (this._pointA === null) this._pointA = {
					x: o.clientX,
					y: o.clientY,
					pointerId: o.pointerId,
					type: o.pointerType,
					button: o.button
				};
				else if (this._pointB === null) this._pointB = {
					x: o.clientX,
					y: o.clientY,
					pointerId: o.pointerId,
					type: o.pointerType,
					button: o.button
				};
				else return;
				this._currentMousePointerIdDown === -1 && !s && (this._currentMousePointerIdDown = o.pointerId), this.onButtonDown(o), e || (o.preventDefault(), n && n.focus());
			} else if (a.type === I.POINTERDOUBLETAP) this.onDoubleTap(o.pointerType);
			else if (a.type === I.POINTERUP && (this._currentMousePointerIdDown === o.pointerId || s)) {
				try {
					c?.releasePointerCapture(o.pointerId);
				} catch {}
				s || (this._pointB = null), t._badOS ? this._pointA = this._pointB = null : this._pointB && this._pointA && this._pointA.pointerId == o.pointerId ? (this._pointA = this._pointB, this._pointB = null) : this._pointA && this._pointB && this._pointB.pointerId == o.pointerId ? this._pointB = null : this._pointA = this._pointB = null, (r !== 0 || i) && (this.onMultiTouch(this._pointA, this._pointB, r, 0, i, null), r = 0, i = null), this._currentMousePointerIdDown = -1, this.onButtonUp(o), e || o.preventDefault();
			} else if (a.type === I.POINTERMOVE) {
				if (e || o.preventDefault(), this._pointA && this._pointB === null) {
					let e = o.clientX - this._pointA.x, t = o.clientY - this._pointA.y;
					this._pointA.x = o.clientX, this._pointA.y = o.clientY, this.onTouch(this._pointA, e, t);
				} else if (this._pointA && this._pointB) {
					let e = this._pointA.pointerId === o.pointerId ? this._pointA : this._pointB;
					e.x = o.clientX, e.y = o.clientY;
					let t = this._pointA.x - this._pointB.x, n = this._pointA.y - this._pointB.y, s = t * t + n * n, c = {
						x: (this._pointA.x + this._pointB.x) / 2,
						y: (this._pointA.y + this._pointB.y) / 2,
						pointerId: o.pointerId,
						type: a.type
					};
					this.onMultiTouch(this._pointA, this._pointB, r, s, i, c), i = c, r = s;
				}
			}
		}, this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._pointerInput, I.POINTERDOWN | I.POINTERUP | I.POINTERMOVE | I.POINTERDOUBLETAP), this._onLostFocus = () => {
			this._pointA = this._pointB = null, r = 0, i = null, this.onLostFocus();
		}, this._contextMenuBind = (e) => this.onContextMenu(e), n && n.addEventListener("contextmenu", this._contextMenuBind, !1);
		let a = this.camera.getScene().getEngine().getHostWindow();
		a && F.RegisterTopRootEvents(a, [{
			name: "blur",
			handler: this._onLostFocus
		}]);
	}
	detachControl() {
		if (this._onLostFocus) {
			let e = this.camera.getScene().getEngine().getHostWindow();
			e && F.UnregisterTopRootEvents(e, [{
				name: "blur",
				handler: this._onLostFocus
			}]);
		}
		if (this._observer) {
			if (this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer), this._observer = null, this._contextMenuBind) {
				let e = this.camera.getScene().getEngine().getInputElement();
				e && e.removeEventListener("contextmenu", this._contextMenuBind);
			}
			this._onLostFocus = null;
		}
		this._altKey = !1, this._ctrlKey = !1, this._metaKey = !1, this._shiftKey = !1, this._buttonsPressed = 0, this._currentMousePointerIdDown = -1;
	}
	getClassName() {
		return "BaseCameraPointersInput";
	}
	getSimpleName() {
		return "pointers";
	}
	onDoubleTap(e) {}
	onTouch(e, t, n) {}
	onMultiTouch(e, t, n, r, i, a) {}
	onContextMenu(e) {
		e.preventDefault();
	}
	onButtonDown(e) {}
	onButtonUp(e) {}
	onLostFocus() {}
};
M([N()], _n.prototype, "buttons", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Cameras/Inputs/orbitCameraPointersInput.js
var vn = class extends _n {
	constructor() {
		super(...arguments), this.pinchZoom = !0, this.multiTouchPanning = !0, this.multiTouchPanAndZoom = !0, this._isPinching = !1, this._twoFingerActivityCount = 0, this._shouldStartPinchZoom = !1;
	}
	_computePinchZoom(e, t) {}
	_computeMultiTouchPanning(e, t) {}
	onMultiTouch(e, t, n, r, i, a) {
		(n !== 0 || i !== null) && (r !== 0 || a !== null) && (this.multiTouchPanAndZoom ? (this._computePinchZoom(n, r), this._computeMultiTouchPanning(i, a)) : this.multiTouchPanning && this.pinchZoom ? (this._twoFingerActivityCount++, this._isPinching || this._shouldStartPinchZoom ? (this._computePinchZoom(n, r), this._isPinching = !0) : this._computeMultiTouchPanning(i, a)) : this.multiTouchPanning ? this._computeMultiTouchPanning(i, a) : this.pinchZoom && this._computePinchZoom(n, r));
	}
	onButtonUp(e) {
		this._twoFingerActivityCount = 0, this._isPinching = !1;
	}
	onLostFocus() {
		this._twoFingerActivityCount = 0, this._isPinching = !1;
	}
};
M([N()], vn.prototype, "pinchZoom", void 0), M([N()], vn.prototype, "multiTouchPanning", void 0), M([N()], vn.prototype, "multiTouchPanAndZoom", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraPointersInput.js
var yn = class e extends vn {
	constructor() {
		super(...arguments), this.buttons = [
			0,
			1,
			2
		], this.angularSensibilityX = 1e3, this.angularSensibilityY = 1e3, this.pinchPrecision = 12, this.pinchDeltaPercentage = 0, this.useNaturalPinchZoom = !1, this.panningSensibility = 1e3, this.pinchInwards = !0, this._isPanClick = !1;
	}
	getClassName() {
		return "ArcRotateCameraPointersInput";
	}
	_computeMultiTouchPanning(e, t) {
		if (this.panningSensibility !== 0 && e && t) {
			let n = t.x - e.x, r = t.y - e.y;
			this.camera.inertialPanningX += -n / this.panningSensibility, this.camera.inertialPanningY += r / this.panningSensibility;
		}
	}
	_computePinchZoom(t, n) {
		let r = this.camera.radius || e.MinimumRadiusForPinch;
		this.useNaturalPinchZoom ? this.camera.radius = r * Math.sqrt(t) / Math.sqrt(n) : this.pinchDeltaPercentage ? this.camera.inertialRadiusOffset += (n - t) * .001 * r * this.pinchDeltaPercentage : this.camera.inertialRadiusOffset += (n - t) / (this.pinchPrecision * (this.pinchInwards ? 1 : -1) * (this.angularSensibilityX + this.angularSensibilityY) / 2);
	}
	onTouch(e, t, n) {
		this.panningSensibility !== 0 && (this._ctrlKey && this.camera._useCtrlForPanning || this._isPanClick) ? (this.camera.inertialPanningX += -t / this.panningSensibility, this.camera.inertialPanningY += n / this.panningSensibility) : (this.camera.inertialAlphaOffset -= t / this.angularSensibilityX, this.camera.inertialBetaOffset -= n / this.angularSensibilityY);
	}
	onDoubleTap() {
		this.camera.useInputToRestoreState && this.camera.restoreState();
	}
	onMultiTouch(e, t, n, r, i, a) {
		this._shouldStartPinchZoom = this._twoFingerActivityCount < 20 && Math.abs(Math.sqrt(r) - Math.sqrt(n)) > this.camera.pinchToPanMaxDistance, super.onMultiTouch(e, t, n, r, i, a);
	}
	onButtonDown(e) {
		this._isPanClick = e.button === this.camera._panningMouseButton, super.onButtonDown(e);
	}
	onButtonUp(e) {
		super.onButtonUp(e);
	}
	onLostFocus() {
		this._isPanClick = !1, super.onLostFocus();
	}
};
yn.MinimumRadiusForPinch = .001, M([N()], yn.prototype, "buttons", void 0), M([N()], yn.prototype, "angularSensibilityX", void 0), M([N()], yn.prototype, "angularSensibilityY", void 0), M([N()], yn.prototype, "pinchPrecision", void 0), M([N()], yn.prototype, "pinchDeltaPercentage", void 0), M([N()], yn.prototype, "useNaturalPinchZoom", void 0), M([N()], yn.prototype, "panningSensibility", void 0), hn.ArcRotateCameraPointersInput = yn;
//#endregion
//#region node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraKeyboardMoveInput.js
var Y = class {
	constructor() {
		this.keysUp = [38], this.keysDown = [40], this.keysLeft = [37], this.keysRight = [39], this.keysReset = [220], this.panningSensibility = 50, this.zoomingSensibility = 25, this.useAltToZoom = !0, this.angularSpeed = .01, this._keys = [];
	}
	attachControl(e) {
		e = F.BackCompatCameraNoPreventDefault(arguments), !this._onCanvasBlurObserver && (this._scene = this.camera.getScene(), this._engine = this._scene.getEngine(), this._onCanvasBlurObserver = this._engine.onCanvasBlurObservable.add(() => {
			this._keys.length = 0;
		}), this._onKeyboardObserver = this._scene.onKeyboardObservable.add((t) => {
			let n = t.event;
			if (!n.metaKey) {
				if (t.type === ke.KEYDOWN) this._ctrlPressed = n.ctrlKey, this._altPressed = n.altKey, (this.keysUp.indexOf(n.keyCode) !== -1 || this.keysDown.indexOf(n.keyCode) !== -1 || this.keysLeft.indexOf(n.keyCode) !== -1 || this.keysRight.indexOf(n.keyCode) !== -1 || this.keysReset.indexOf(n.keyCode) !== -1) && (this._keys.indexOf(n.keyCode) === -1 && this._keys.push(n.keyCode), n.preventDefault && (e || n.preventDefault()));
				else if (this.keysUp.indexOf(n.keyCode) !== -1 || this.keysDown.indexOf(n.keyCode) !== -1 || this.keysLeft.indexOf(n.keyCode) !== -1 || this.keysRight.indexOf(n.keyCode) !== -1 || this.keysReset.indexOf(n.keyCode) !== -1) {
					let t = this._keys.indexOf(n.keyCode);
					t >= 0 && this._keys.splice(t, 1), n.preventDefault && (e || n.preventDefault());
				}
			}
		}));
	}
	detachControl() {
		this._scene && (this._onKeyboardObserver && this._scene.onKeyboardObservable.remove(this._onKeyboardObserver), this._onCanvasBlurObserver && this._engine.onCanvasBlurObservable.remove(this._onCanvasBlurObserver), this._onKeyboardObserver = null, this._onCanvasBlurObserver = null), this._keys.length = 0;
	}
	checkInputs() {
		if (this._onKeyboardObserver) {
			let e = this.camera;
			for (let t = 0; t < this._keys.length; t++) {
				let n = this._keys[t];
				this.keysLeft.indexOf(n) === -1 ? this.keysUp.indexOf(n) === -1 ? this.keysRight.indexOf(n) === -1 ? this.keysDown.indexOf(n) === -1 ? this.keysReset.indexOf(n) !== -1 && e.useInputToRestoreState && e.restoreState() : this._ctrlPressed && this.camera._useCtrlForPanning ? e.inertialPanningY -= 1 / this.panningSensibility : this._altPressed && this.useAltToZoom ? e.inertialRadiusOffset -= 1 / this.zoomingSensibility : e.inertialBetaOffset += this.angularSpeed : this._ctrlPressed && this.camera._useCtrlForPanning ? e.inertialPanningX += 1 / this.panningSensibility : e.inertialAlphaOffset += this.angularSpeed : this._ctrlPressed && this.camera._useCtrlForPanning ? e.inertialPanningY += 1 / this.panningSensibility : this._altPressed && this.useAltToZoom ? e.inertialRadiusOffset += 1 / this.zoomingSensibility : e.inertialBetaOffset -= this.angularSpeed : this._ctrlPressed && this.camera._useCtrlForPanning ? e.inertialPanningX -= 1 / this.panningSensibility : e.inertialAlphaOffset -= this.angularSpeed;
			}
		}
	}
	getClassName() {
		return "ArcRotateCameraKeyboardMoveInput";
	}
	getSimpleName() {
		return "keyboard";
	}
};
M([N()], Y.prototype, "keysUp", void 0), M([N()], Y.prototype, "keysDown", void 0), M([N()], Y.prototype, "keysLeft", void 0), M([N()], Y.prototype, "keysRight", void 0), M([N()], Y.prototype, "keysReset", void 0), M([N()], Y.prototype, "panningSensibility", void 0), M([N()], Y.prototype, "zoomingSensibility", void 0), M([N()], Y.prototype, "useAltToZoom", void 0), M([N()], Y.prototype, "angularSpeed", void 0), hn.ArcRotateCameraKeyboardMoveInput = Y;
//#endregion
//#region node_modules/@babylonjs/core/Cameras/Inputs/arcRotateCameraMouseWheelInput.js
var bn = 40, xn = class {
	constructor() {
		this.wheelPrecision = 3, this.zoomToMouseLocation = !1, this.wheelDeltaPercentage = 0, this.customComputeDeltaFromMouseWheel = null, this._viewOffset = new h(0, 0, 0), this._globalOffset = new h(0, 0, 0), this._inertialPanning = h.Zero();
	}
	_computeDeltaFromMouseWheelLegacyEvent(e, t) {
		let n, r = e * .01 * this.wheelDeltaPercentage * t;
		return n = e > 0 ? r / (1 + this.wheelDeltaPercentage) : r * (1 + this.wheelDeltaPercentage), n;
	}
	attachControl(e) {
		e = F.BackCompatCameraNoPreventDefault(arguments), this._wheel = (t) => {
			if (t.type !== I.POINTERWHEEL) return;
			let n = t.event, r, i = n.deltaMode === De.DOM_DELTA_LINE ? bn : 1, a = -(n.deltaY * i);
			if (this.customComputeDeltaFromMouseWheel) r = this.customComputeDeltaFromMouseWheel(a, this, n);
			else if (this.wheelDeltaPercentage) {
				if (r = this._computeDeltaFromMouseWheelLegacyEvent(a, this.camera.radius), r > 0) {
					let e = this.camera.radius, t = this.camera.inertialRadiusOffset + r;
					for (let n = 0; n < 20 && !(e <= t || Math.abs(t * this.camera.inertia) < .001); n++) e -= t, t *= this.camera.inertia;
					e = w(e, 0, Number.MAX_VALUE), r = this._computeDeltaFromMouseWheelLegacyEvent(a, e);
				}
			} else r = a / (this.wheelPrecision * 40);
			r && (this.zoomToMouseLocation ? (this._hitPlane || this._updateHitPlane(), this._zoomToMouse(r)) : this.camera.inertialRadiusOffset += r), n.preventDefault && (e || n.preventDefault());
		}, this._observer = this.camera.getScene()._inputManager._addCameraPointerObserver(this._wheel, I.POINTERWHEEL), this.zoomToMouseLocation && this._inertialPanning.setAll(0);
	}
	detachControl() {
		this._observer && (this.camera.getScene()._inputManager._removeCameraPointerObserver(this._observer), this._observer = null, this._wheel = null);
	}
	checkInputs() {
		if (!this.zoomToMouseLocation) return;
		let e = this.camera;
		0 + e.inertialAlphaOffset + e.inertialBetaOffset + e.inertialRadiusOffset && (this._updateHitPlane(), e.target.addInPlace(this._inertialPanning), this._inertialPanning.scaleInPlace(e.inertia), this._zeroIfClose(this._inertialPanning));
	}
	getClassName() {
		return "ArcRotateCameraMouseWheelInput";
	}
	getSimpleName() {
		return "mousewheel";
	}
	_updateHitPlane() {
		let e = this.camera, t = e.target.subtract(e.position);
		this._hitPlane = ie.FromPositionAndNormal(e.target, t);
	}
	_getPosition() {
		let e = this.camera, t = e.getScene(), n = t.createPickingRay(t.pointerX, t.pointerY, S.Identity(), e, !1);
		(e.targetScreenOffset.x !== 0 || e.targetScreenOffset.y !== 0) && (this._viewOffset.set(e.targetScreenOffset.x, e.targetScreenOffset.y, 0), e.getViewMatrix().invertToRef(e._cameraTransformMatrix), this._globalOffset = h.TransformNormal(this._viewOffset, e._cameraTransformMatrix), n.origin.addInPlace(this._globalOffset));
		let r = 0;
		return this._hitPlane && (r = n.intersectsPlane(this._hitPlane) ?? 0), n.origin.addInPlace(n.direction.scaleInPlace(r));
	}
	_zoomToMouse(e) {
		let t = this.camera, n = 1 - t.inertia;
		if (t.lowerRadiusLimit) {
			let r = t.lowerRadiusLimit ?? 0;
			t.radius - (t.inertialRadiusOffset + e) / n < r && (e = (t.radius - r) * n - t.inertialRadiusOffset);
		}
		if (t.upperRadiusLimit) {
			let r = t.upperRadiusLimit ?? 0;
			t.radius - (t.inertialRadiusOffset + e) / n > r && (e = (t.radius - r) * n - t.inertialRadiusOffset);
		}
		let r = e / n / t.radius, i = this._getPosition(), a = x.Vector3[6];
		i.subtractToRef(t.target, a), a.scaleInPlace(r), a.scaleInPlace(n), this._inertialPanning.addInPlace(a), t.inertialRadiusOffset += e;
	}
	_zeroIfClose(e) {
		Math.abs(e.x) < .001 && (e.x = 0), Math.abs(e.y) < .001 && (e.y = 0), Math.abs(e.z) < .001 && (e.z = 0);
	}
};
M([N()], xn.prototype, "wheelPrecision", void 0), M([N()], xn.prototype, "zoomToMouseLocation", void 0), M([N()], xn.prototype, "wheelDeltaPercentage", void 0), hn.ArcRotateCameraMouseWheelInput = xn;
//#endregion
//#region node_modules/@babylonjs/core/Cameras/arcRotateCameraInputsManager.js
var Sn = class extends gn {
	constructor(e) {
		super(e);
	}
	addMouseWheel() {
		return this.add(new xn()), this;
	}
	addPointers() {
		return this.add(new yn()), this;
	}
	addKeyboard() {
		return this.add(new Y()), this;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Cameras/arcRotateCamera.js
L.AddNodeConstructor("ArcRotateCamera", (e, t) => () => new Z(e, 0, 0, 1, h.Zero(), t));
function Cn(e) {
	let t = Math.PI / 2;
	return (e.x !== 0 || e.z !== 0) && (t = Math.acos(e.x / Math.sqrt(e.x ** 2 + e.z ** 2))), e.z < 0 && (t = 2 * Math.PI - t), t;
}
function wn(e, t) {
	return Math.acos(e / t);
}
function X(e, t) {
	return isNaN(e) ? t : e;
}
var Z = class e extends mn {
	get target() {
		return this._target;
	}
	set target(e) {
		this.setTarget(e);
	}
	get targetHost() {
		return this._targetHost;
	}
	set targetHost(e) {
		e && this.setTarget(e);
	}
	getTarget() {
		return this.target;
	}
	get position() {
		return this._position;
	}
	set position(e) {
		this.setPosition(e);
	}
	set upVector(e) {
		this._upToYMatrix || (this._yToUpMatrix = new S(), this._upToYMatrix = new S(), this._upVector = h.Zero()), e.normalize(), this._upVector.copyFrom(e), this.setMatUp();
	}
	get upVector() {
		return this._upVector;
	}
	setMatUp() {
		S.RotationAlignToRef(h.UpReadOnly, this._upVector, this._yToUpMatrix), S.RotationAlignToRef(this._upVector, h.UpReadOnly, this._upToYMatrix);
	}
	get angularSensibilityX() {
		let e = this.inputs.attached.pointers;
		return e ? e.angularSensibilityX : 0;
	}
	set angularSensibilityX(e) {
		let t = this.inputs.attached.pointers;
		t && (t.angularSensibilityX = e);
	}
	get angularSensibilityY() {
		let e = this.inputs.attached.pointers;
		return e ? e.angularSensibilityY : 0;
	}
	set angularSensibilityY(e) {
		let t = this.inputs.attached.pointers;
		t && (t.angularSensibilityY = e);
	}
	get pinchPrecision() {
		let e = this.inputs.attached.pointers;
		return e ? e.pinchPrecision : 0;
	}
	set pinchPrecision(e) {
		let t = this.inputs.attached.pointers;
		t && (t.pinchPrecision = e);
	}
	get pinchDeltaPercentage() {
		let e = this.inputs.attached.pointers;
		return e ? e.pinchDeltaPercentage : 0;
	}
	set pinchDeltaPercentage(e) {
		let t = this.inputs.attached.pointers;
		t && (t.pinchDeltaPercentage = e);
	}
	get useNaturalPinchZoom() {
		let e = this.inputs.attached.pointers;
		return e ? e.useNaturalPinchZoom : !1;
	}
	set useNaturalPinchZoom(e) {
		let t = this.inputs.attached.pointers;
		t && (t.useNaturalPinchZoom = e);
	}
	get panningSensibility() {
		let e = this.inputs.attached.pointers;
		return e ? e.panningSensibility : 0;
	}
	set panningSensibility(e) {
		let t = this.inputs.attached.pointers;
		t && (t.panningSensibility = e);
	}
	get keysUp() {
		let e = this.inputs.attached.keyboard;
		return e ? e.keysUp : [];
	}
	set keysUp(e) {
		let t = this.inputs.attached.keyboard;
		t && (t.keysUp = e);
	}
	get keysDown() {
		let e = this.inputs.attached.keyboard;
		return e ? e.keysDown : [];
	}
	set keysDown(e) {
		let t = this.inputs.attached.keyboard;
		t && (t.keysDown = e);
	}
	get keysLeft() {
		let e = this.inputs.attached.keyboard;
		return e ? e.keysLeft : [];
	}
	set keysLeft(e) {
		let t = this.inputs.attached.keyboard;
		t && (t.keysLeft = e);
	}
	get keysRight() {
		let e = this.inputs.attached.keyboard;
		return e ? e.keysRight : [];
	}
	set keysRight(e) {
		let t = this.inputs.attached.keyboard;
		t && (t.keysRight = e);
	}
	get wheelPrecision() {
		let e = this.inputs.attached.mousewheel;
		return e ? e.wheelPrecision : 0;
	}
	set wheelPrecision(e) {
		let t = this.inputs.attached.mousewheel;
		t && (t.wheelPrecision = e);
	}
	get zoomToMouseLocation() {
		let e = this.inputs.attached.mousewheel;
		return e ? e.zoomToMouseLocation : !1;
	}
	set zoomToMouseLocation(e) {
		let t = this.inputs.attached.mousewheel;
		t && (t.zoomToMouseLocation = e);
	}
	get wheelDeltaPercentage() {
		let e = this.inputs.attached.mousewheel;
		return e ? e.wheelDeltaPercentage : 0;
	}
	set wheelDeltaPercentage(e) {
		let t = this.inputs.attached.mousewheel;
		t && (t.wheelDeltaPercentage = e);
	}
	get isInterpolating() {
		return this._isInterpolating;
	}
	get bouncingBehavior() {
		return this._bouncingBehavior;
	}
	get useBouncingBehavior() {
		return this._bouncingBehavior != null;
	}
	set useBouncingBehavior(e) {
		e !== this.useBouncingBehavior && (e ? (this._bouncingBehavior = new un(), this.addBehavior(this._bouncingBehavior)) : this._bouncingBehavior &&= (this.removeBehavior(this._bouncingBehavior), null));
	}
	get framingBehavior() {
		return this._framingBehavior;
	}
	get useFramingBehavior() {
		return this._framingBehavior != null;
	}
	set useFramingBehavior(e) {
		e !== this.useFramingBehavior && (e ? (this._framingBehavior = new dn(), this.addBehavior(this._framingBehavior)) : this._framingBehavior &&= (this.removeBehavior(this._framingBehavior), null));
	}
	get autoRotationBehavior() {
		return this._autoRotationBehavior;
	}
	get useAutoRotationBehavior() {
		return this._autoRotationBehavior != null;
	}
	set useAutoRotationBehavior(e) {
		e !== this.useAutoRotationBehavior && (e ? (this._autoRotationBehavior = new Qt(), this.addBehavior(this._autoRotationBehavior)) : this._autoRotationBehavior &&= (this.removeBehavior(this._autoRotationBehavior), null));
	}
	constructor(e, n, r, i, a, o, s = !0) {
		super(e, h.Zero(), o, s), this.inertialAlphaOffset = 0, this.inertialBetaOffset = 0, this.inertialRadiusOffset = 0, this.lowerAlphaLimit = null, this.upperAlphaLimit = null, this.lowerBetaLimit = .01, this.upperBetaLimit = Math.PI - .01, this.lowerRadiusLimit = null, this.upperRadiusLimit = null, this.lowerTargetYLimit = -Infinity, this.inertialPanningX = 0, this.inertialPanningY = 0, this.pinchToPanMaxDistance = 20, this.panningDistanceLimit = null, this.panningOriginTarget = h.Zero(), this.panningInertia = .9, this.zoomOnFactor = 1, this.targetScreenOffset = _.Zero(), this.allowUpsideDown = !0, this.useInputToRestoreState = !0, this.restoreStateInterpolationFactor = 0, this._currentInterpolationFactor = 0, this._viewMatrix = new S(), this.panningAxis = new h(1, 1, 0), this._transformedDirection = new h(), this.mapPanning = !1, this._isInterpolating = !1, this.onMeshTargetChangedObservable = new t(), this.checkCollisions = !1, this.collisionRadius = new h(.5, .5, .5), this._previousPosition = h.Zero(), this._collisionVelocity = h.Zero(), this._newPosition = h.Zero(), this._computationVector = h.Zero(), this._goalAlpha = NaN, this._goalBeta = NaN, this._goalRadius = NaN, this._goalTarget = new h(NaN, NaN, NaN), this._goalTargetScreenOffset = new _(NaN, NaN), this._onCollisionPositionChange = (e, t, n = null) => {
			n ? (this.setPosition(t), this.onCollide && this.onCollide(n)) : this._previousPosition.copyFrom(this._position);
			let r = Math.cos(this.alpha), i = Math.sin(this.alpha), a = Math.cos(this.beta), o = Math.sin(this.beta);
			o === 0 && (o = 1e-4);
			let s = this._getTargetPosition();
			this._computationVector.copyFromFloats(this.radius * r * o, this.radius * a, this.radius * i * o), s.addToRef(this._computationVector, this._newPosition), this._position.copyFrom(this._newPosition);
			let c = this.upVector;
			this.allowUpsideDown && this.beta < 0 && (c = c.clone(), c = c.negate()), this._computeViewMatrix(this._position, s, c), this._viewMatrix.addAtIndex(12, this.targetScreenOffset.x), this._viewMatrix.addAtIndex(13, this.targetScreenOffset.y), this._collisionTriggered = !1;
		}, this._target = h.Zero(), a && this.setTarget(a), this.alpha = n, this.beta = r, this.radius = i, this.getViewMatrix(), this.inputs = new Sn(this), this.inputs.addKeyboard().addMouseWheel().addPointers();
	}
	_initCache() {
		super._initCache(), this._cache._target = new h(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.alpha = void 0, this._cache.beta = void 0, this._cache.radius = void 0, this._cache.targetScreenOffset = _.Zero();
	}
	_updateCache(e) {
		e || super._updateCache(), this._cache._target.copyFrom(this._getTargetPosition()), this._cache.alpha = this.alpha, this._cache.beta = this.beta, this._cache.radius = this.radius, this._cache.targetScreenOffset.copyFrom(this.targetScreenOffset);
	}
	_getTargetPosition() {
		if (this._targetHost && this._targetHost.getAbsolutePosition) {
			let e = this._targetHost.getAbsolutePosition();
			this._targetBoundingCenter ? e.addToRef(this._targetBoundingCenter, this._target) : this._target.copyFrom(e);
		}
		return this._getLockedTargetPosition() || this._target;
	}
	storeState() {
		return this._storedAlpha = this.alpha, this._storedBeta = this.beta, this._storedRadius = this.radius, this._storedTarget = this._getTargetPosition().clone(), this._storedTargetScreenOffset = this.targetScreenOffset.clone(), super.storeState();
	}
	_restoreStateValues() {
		return this.hasStateStored() && this.restoreStateInterpolationFactor > .001 && this.restoreStateInterpolationFactor < 1 ? (this.interpolateTo(this._storedAlpha, this._storedBeta, this._storedRadius, this._storedTarget, this._storedTargetScreenOffset, this.restoreStateInterpolationFactor), !0) : super._restoreStateValues() ? (this.setTarget(this._storedTarget.clone()), this.alpha = this._storedAlpha, this.beta = this._storedBeta, this.radius = this._storedRadius, this.targetScreenOffset = this._storedTargetScreenOffset.clone(), this.inertialAlphaOffset = 0, this.inertialBetaOffset = 0, this.inertialRadiusOffset = 0, this.inertialPanningX = 0, this.inertialPanningY = 0, !0) : !1;
	}
	stopInterpolation() {
		this._goalAlpha = NaN, this._goalBeta = NaN, this._goalRadius = NaN, this._goalTarget.set(NaN, NaN, NaN), this._goalTargetScreenOffset.set(NaN, NaN);
	}
	interpolateTo(e = this.alpha, t = this.beta, n = this.radius, r = this.target, i = this.targetScreenOffset, a) {
		this.inertialAlphaOffset = 0, this.inertialBetaOffset = 0, this.inertialRadiusOffset = 0, this.inertialPanningX = 0, this.inertialPanningY = 0, this._currentInterpolationFactor = a ?? (this.restoreStateInterpolationFactor === 0 ? .1 : this.restoreStateInterpolationFactor), this._goalAlpha = X(e, this._goalAlpha), this._goalBeta = X(t, this._goalBeta), this._goalRadius = X(n, this._goalRadius), this._goalTarget.set(X(r.x, this._goalTarget.x), X(r.y, this._goalTarget.y), X(r.z, this._goalTarget.z)), this._goalTargetScreenOffset.set(X(i.x, this._goalTargetScreenOffset.x), X(i.y, this._goalTargetScreenOffset.y)), this._goalAlpha = w(this._goalAlpha, this.lowerAlphaLimit ?? -Infinity, this.upperAlphaLimit ?? Infinity), this._goalBeta = w(this._goalBeta, this.lowerBetaLimit ?? -Infinity, this.upperBetaLimit ?? Infinity), this._goalRadius = w(this._goalRadius, this.lowerRadiusLimit ?? -Infinity, this.upperRadiusLimit ?? Infinity), this._goalTarget.y = w(this._goalTarget.y, this.lowerTargetYLimit ?? -Infinity, Infinity), this._isInterpolating = !0;
	}
	_isSynchronizedViewMatrix() {
		return super._isSynchronizedViewMatrix() ? this._cache._target.equals(this._getTargetPosition()) && this._cache.alpha === this.alpha && this._cache.beta === this.beta && this._cache.radius === this.radius && this._cache.targetScreenOffset.equals(this.targetScreenOffset) : !1;
	}
	attachControl(e, t, n = !0, r = 2) {
		let i = arguments;
		t = F.BackCompatCameraNoPreventDefault(i), this._useCtrlForPanning = n, this._panningMouseButton = r, typeof i[0] == "boolean" && (i.length > 1 && (this._useCtrlForPanning = i[1]), i.length > 2 && (this._panningMouseButton = i[2])), this.inputs.attachElement(t), this._reset = () => {
			this.inertialAlphaOffset = 0, this.inertialBetaOffset = 0, this.inertialRadiusOffset = 0, this.inertialPanningX = 0, this.inertialPanningY = 0;
		};
	}
	detachControl() {
		this.inputs.detachElement(), this._reset && this._reset();
	}
	_checkInputs() {
		if (this._collisionTriggered) return;
		this.inputs.checkInputs();
		let e = !1;
		if (this.inertialAlphaOffset !== 0 || this.inertialBetaOffset !== 0 || this.inertialRadiusOffset !== 0) {
			e = !0;
			let t = this.invertRotation ? -1 : 1, n = this._calculateHandednessMultiplier(), r = this.inertialAlphaOffset * n;
			this.beta < 0 && (r *= -1), this.alpha += r * t, this.beta += this.inertialBetaOffset * t, this.radius -= this.inertialRadiusOffset, this.inertialAlphaOffset *= this.inertia, this.inertialBetaOffset *= this.inertia, this.inertialRadiusOffset *= this.inertia, Math.abs(this.inertialAlphaOffset) < this._rotationEpsilon && (this.inertialAlphaOffset = 0), Math.abs(this.inertialBetaOffset) < this._rotationEpsilon && (this.inertialBetaOffset = 0), Math.abs(this.inertialRadiusOffset) < this.speed * this._rotationEpsilon && (this.inertialRadiusOffset = 0);
		}
		if (this.inertialPanningX !== 0 || this.inertialPanningY !== 0) {
			e = !0;
			let t = new h(this.inertialPanningX, this.inertialPanningY, this.inertialPanningY);
			if (this._viewMatrix.invertToRef(this._cameraTransformMatrix), t.multiplyInPlace(this.panningAxis), h.TransformNormalToRef(t, this._cameraTransformMatrix, this._transformedDirection), this.mapPanning) {
				let e = this.upVector, t = h.CrossToRef(this._transformedDirection, e, this._transformedDirection);
				h.CrossToRef(e, t, this._transformedDirection);
			} else this.panningAxis.y || (this._transformedDirection.y = 0);
			if (!this._targetHost) {
				if (this.panningDistanceLimit) this._transformedDirection.addInPlace(this._target), h.DistanceSquared(this._transformedDirection, this.panningOriginTarget) <= this.panningDistanceLimit * this.panningDistanceLimit && this._target.copyFrom(this._transformedDirection);
				else {
					if (this.parent) {
						let e = x.Matrix[0];
						this.parent.getWorldMatrix().getRotationMatrixToRef(e), e.transposeToRef(e), h.TransformCoordinatesToRef(this._transformedDirection, e, this._transformedDirection);
					}
					this._target.addInPlace(this._transformedDirection);
				}
			}
			this.inertialPanningX *= this.panningInertia, this.inertialPanningY *= this.panningInertia;
			let n = this.speed * this._panningEpsilon;
			Math.abs(this.inertialPanningX) < n && (this.inertialPanningX = 0), Math.abs(this.inertialPanningY) < n && (this.inertialPanningY = 0);
		}
		if (e) this.stopInterpolation();
		else if (this._isInterpolating) {
			let e = !1, t = 1 - 2 ** (-(this._scene.getEngine().getDeltaTime() / 1e3) / this._currentInterpolationFactor), n = X(this._goalRadius, this.radius);
			if (!isNaN(this._goalTarget.x) || !isNaN(this._goalTarget.y) || !isNaN(this._goalTarget.z)) {
				let r = x.Vector3[0].set(X(this._goalTarget.x, this._target.x), X(this._goalTarget.y, this._target.y), X(this._goalTarget.z, this._target.z));
				h.LerpToRef(this.target, r, t, this._target), h.Distance(this.target, r) * 10 / n < .001 ? (this._goalTarget.set(NaN, NaN, NaN), this.target.copyFrom(r), this.setTarget(this.target, !1, !0, !0)) : e = !0;
			}
			if (!isNaN(this._goalAlpha) || !isNaN(this._goalBeta)) {
				let n = y.RotationAlphaBetaGammaToRef(X(this._goalAlpha, this.alpha), X(this._goalBeta, this.beta), 0, x.Quaternion[0]), r = y.RotationAlphaBetaGammaToRef(this.alpha, this.beta, 0, x.Quaternion[1]), i = y.SlerpToRef(r, n, t, x.Quaternion[2]);
				i.normalize();
				let a = i.toAlphaBetaGammaToRef(x.Vector3[0]);
				if (this.alpha = a.x, this.beta = a.y, i.isApprox(n, .001 / 5)) {
					this._goalAlpha = NaN, this._goalBeta = NaN;
					let e = n.toAlphaBetaGammaToRef(x.Vector3[0]);
					this.alpha = e.x, this.beta = e.y;
				} else e = !0;
			}
			if (isNaN(this._goalRadius) || (this.radius += (n - this.radius) * t, Math.abs(n / this.radius - 1) < .001 ? (this._goalRadius = NaN, this.radius = n) : e = !0), !isNaN(this._goalTargetScreenOffset.x) || !isNaN(this._goalTargetScreenOffset.y)) {
				let n = x.Vector2[0].set(X(this._goalTargetScreenOffset.x, this.targetScreenOffset.x), X(this._goalTargetScreenOffset.y, this.targetScreenOffset.y));
				_.LerpToRef(this.targetScreenOffset, n, t, this.targetScreenOffset), _.Distance(this.targetScreenOffset, n) < .001 ? (this._goalTargetScreenOffset.set(NaN, NaN), this.targetScreenOffset.copyFrom(n)) : e = !0;
			}
			this._isInterpolating = e;
		}
		this._checkLimits(), super._checkInputs();
	}
	_checkLimits() {
		this.lowerBetaLimit === null || this.lowerBetaLimit === void 0 ? this.allowUpsideDown && this.beta > Math.PI && (this.beta -= 2 * Math.PI) : this.beta < this.lowerBetaLimit && (this.beta = this.lowerBetaLimit), this.upperBetaLimit === null || this.upperBetaLimit === void 0 ? this.allowUpsideDown && this.beta < -Math.PI && (this.beta += 2 * Math.PI) : this.beta > this.upperBetaLimit && (this.beta = this.upperBetaLimit), this.lowerAlphaLimit !== null && this.alpha < this.lowerAlphaLimit && (this.alpha = this.lowerAlphaLimit), this.upperAlphaLimit !== null && this.alpha > this.upperAlphaLimit && (this.alpha = this.upperAlphaLimit), this.lowerRadiusLimit !== null && this.radius < this.lowerRadiusLimit && (this.radius = this.lowerRadiusLimit, this.inertialRadiusOffset = 0), this.upperRadiusLimit !== null && this.radius > this.upperRadiusLimit && (this.radius = this.upperRadiusLimit, this.inertialRadiusOffset = 0), this.target.y = Math.max(this.target.y, this.lowerTargetYLimit);
	}
	rebuildAnglesAndRadius() {
		this._position.subtractToRef(this._getTargetPosition(), this._computationVector), (this._upVector.x !== 0 || this._upVector.y !== 1 || this._upVector.z !== 0) && h.TransformCoordinatesToRef(this._computationVector, this._upToYMatrix, this._computationVector), this.radius = this._computationVector.length(), this.radius === 0 && (this.radius = 1e-4);
		let e = this.alpha;
		this.alpha = Cn(this._computationVector), this.beta = wn(this._computationVector.y, this.radius);
		let t = Math.round((e - this.alpha) / (2 * Math.PI));
		this.alpha += t * 2 * Math.PI, this._checkLimits();
	}
	setPosition(e) {
		this._position.equals(e) || (this._position.copyFrom(e), this.rebuildAnglesAndRadius());
	}
	setTarget(e, t = !1, n = !1, r = !1) {
		if (r = this.overrideCloneAlphaBetaRadius ?? r, e.computeWorldMatrix) this._targetBoundingCenter = t && e.getBoundingInfo ? e.getBoundingInfo().boundingBox.centerWorld.clone() : null, e.computeWorldMatrix(), this._targetHost = e, this._target = this._getTargetPosition(), this.onMeshTargetChangedObservable.notifyObservers(this._targetHost);
		else {
			let t = e, r = this._getTargetPosition();
			if (r && !n && r.equals(t)) return;
			this._targetHost = null, this._target = t, this._targetBoundingCenter = null, this.onMeshTargetChangedObservable.notifyObservers(null);
		}
		r || this.rebuildAnglesAndRadius();
	}
	_getViewMatrix() {
		let e = Math.cos(this.alpha), t = Math.sin(this.alpha), n = Math.cos(this.beta), r = Math.sin(this.beta);
		r === 0 && (r = 1e-4), this.radius === 0 && (this.radius = 1e-4);
		let i = this._getTargetPosition();
		if (this._computationVector.copyFromFloats(this.radius * e * r, this.radius * n, this.radius * t * r), (this._upVector.x !== 0 || this._upVector.y !== 1 || this._upVector.z !== 0) && h.TransformCoordinatesToRef(this._computationVector, this._yToUpMatrix, this._computationVector), i.addToRef(this._computationVector, this._newPosition), this.getScene().collisionsEnabled && this.checkCollisions) {
			let e = this.getScene().collisionCoordinator;
			this._collider ||= e.createCollider(), this._collider._radius = this.collisionRadius, this._newPosition.subtractToRef(this._position, this._collisionVelocity), this._collisionTriggered = !0, e.getNewPosition(this._position, this._collisionVelocity, this._collider, 3, null, this._onCollisionPositionChange, this.uniqueId);
		} else {
			this._position.copyFrom(this._newPosition);
			let e = this.upVector;
			this.allowUpsideDown && r < 0 && (e = e.negate()), this._computeViewMatrix(this._position, i, e), this._viewMatrix.addAtIndex(12, this.targetScreenOffset.x), this._viewMatrix.addAtIndex(13, this.targetScreenOffset.y);
		}
		return this._currentTarget.copyFrom(i), this._viewMatrix;
	}
	zoomOn(e, t = !1) {
		e ||= this.getScene().meshes;
		let n = K.MinMax(e), r = this._calculateLowerRadiusFromModelBoundingSphere(n.min, n.max);
		if (r = Math.max(Math.min(r, this.upperRadiusLimit || Number.MAX_VALUE), this.lowerRadiusLimit || 0), this.radius = r * this.zoomOnFactor, this.mode === R.ORTHOGRAPHIC_CAMERA) {
			let e = this.getScene().getEngine().getAspectRatio(this), t = r * this.zoomOnFactor / 2;
			this.orthoLeft = -t * e, this.orthoRight = t * e, this.orthoBottom = -t, this.orthoTop = t;
		}
		this.focusOn({
			min: n.min,
			max: n.max,
			distance: r
		}, t);
	}
	focusOn(e, t = !1) {
		let n, r;
		if (e.min === void 0) {
			let t = e || this.getScene().meshes;
			n = K.MinMax(t), r = h.Distance(n.min, n.max);
		} else {
			let t = e;
			n = t, r = t.distance;
		}
		this._target = K.Center(n), t || (this.maxZ = r * 2);
	}
	createRigCamera(t, n) {
		let r = 0;
		switch (this.cameraRigMode) {
			case R.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
			case R.RIG_MODE_STEREOSCOPIC_OVERUNDER:
			case R.RIG_MODE_STEREOSCOPIC_INTERLACED:
			case R.RIG_MODE_VR:
				r = this._cameraRigParams.stereoHalfAngle * (n === 0 ? 1 : -1);
				break;
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED: r = this._cameraRigParams.stereoHalfAngle * (n === 0 ? -1 : 1);
		}
		let i = new e(t, this.alpha + r, this.beta, this.radius, this._target, this.getScene());
		return i._cameraRigParams = {}, i.isRigCamera = !0, i.rigParent = this, i.upVector = this.upVector, i.mode = this.mode, i.orthoLeft = this.orthoLeft, i.orthoRight = this.orthoRight, i.orthoBottom = this.orthoBottom, i.orthoTop = this.orthoTop, i;
	}
	_updateRigCameras() {
		let e = this._rigCameras[0], t = this._rigCameras[1];
		switch (e.beta = t.beta = this.beta, this.cameraRigMode) {
			case R.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
			case R.RIG_MODE_STEREOSCOPIC_OVERUNDER:
			case R.RIG_MODE_STEREOSCOPIC_INTERLACED:
			case R.RIG_MODE_VR:
				e.alpha = this.alpha - this._cameraRigParams.stereoHalfAngle, t.alpha = this.alpha + this._cameraRigParams.stereoHalfAngle;
				break;
			case R.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED: e.alpha = this.alpha + this._cameraRigParams.stereoHalfAngle, t.alpha = this.alpha - this._cameraRigParams.stereoHalfAngle;
		}
		super._updateRigCameras();
	}
	_calculateLowerRadiusFromModelBoundingSphere(e, t, n = 1) {
		let r = h.Distance(e, t), i = this.getScene().getEngine().getAspectRatio(this), a = Math.tan(this.fov / 2), o = a * i, s = r * .5 * n, c = s * Math.sqrt(1 + 1 / (o * o)), l = s * Math.sqrt(1 + 1 / (a * a));
		return Math.max(c, l);
	}
	dispose() {
		this.inputs.clear(), super.dispose();
	}
	getClassName() {
		return "ArcRotateCamera";
	}
};
M([N()], Z.prototype, "alpha", void 0), M([N()], Z.prototype, "beta", void 0), M([N()], Z.prototype, "radius", void 0), M([N()], Z.prototype, "overrideCloneAlphaBetaRadius", void 0), M([he("target")], Z.prototype, "_target", void 0), M([pe("targetHost")], Z.prototype, "_targetHost", void 0), M([N()], Z.prototype, "inertialAlphaOffset", void 0), M([N()], Z.prototype, "inertialBetaOffset", void 0), M([N()], Z.prototype, "inertialRadiusOffset", void 0), M([N()], Z.prototype, "lowerAlphaLimit", void 0), M([N()], Z.prototype, "upperAlphaLimit", void 0), M([N()], Z.prototype, "lowerBetaLimit", void 0), M([N()], Z.prototype, "upperBetaLimit", void 0), M([N()], Z.prototype, "lowerRadiusLimit", void 0), M([N()], Z.prototype, "upperRadiusLimit", void 0), M([N()], Z.prototype, "lowerTargetYLimit", void 0), M([N()], Z.prototype, "inertialPanningX", void 0), M([N()], Z.prototype, "inertialPanningY", void 0), M([N()], Z.prototype, "pinchToPanMaxDistance", void 0), M([N()], Z.prototype, "panningDistanceLimit", void 0), M([he()], Z.prototype, "panningOriginTarget", void 0), M([N()], Z.prototype, "panningInertia", void 0), M([N()], Z.prototype, "zoomToMouseLocation", null), M([N()], Z.prototype, "zoomOnFactor", void 0), M([de()], Z.prototype, "targetScreenOffset", void 0), M([N()], Z.prototype, "allowUpsideDown", void 0), M([N()], Z.prototype, "useInputToRestoreState", void 0), M([N()], Z.prototype, "restoreStateInterpolationFactor", void 0), C("BABYLON.ArcRotateCamera", Z);
//#endregion
//#region node_modules/@babylonjs/core/Lights/light.js
var Q = class e extends L {
	get range() {
		return this._range;
	}
	set range(e) {
		this._range = e, this._inverseSquaredRange = 1 / (this.range * this.range);
	}
	get intensityMode() {
		return this._intensityMode;
	}
	set intensityMode(e) {
		this._intensityMode = e, this._computePhotometricScale();
	}
	get radius() {
		return this._radius;
	}
	set radius(e) {
		this._radius = e, this._computePhotometricScale();
	}
	get shadowEnabled() {
		return this._shadowEnabled;
	}
	set shadowEnabled(e) {
		this._shadowEnabled !== e && (this._shadowEnabled = e, this._markMeshesAsLightDirty());
	}
	get includedOnlyMeshes() {
		return this._includedOnlyMeshes;
	}
	set includedOnlyMeshes(e) {
		this._includedOnlyMeshes = e, this._hookArrayForIncludedOnly(e);
	}
	get excludedMeshes() {
		return this._excludedMeshes;
	}
	set excludedMeshes(e) {
		this._excludedMeshes = e, this._hookArrayForExcluded(e);
	}
	get excludeWithLayerMask() {
		return this._excludeWithLayerMask;
	}
	set excludeWithLayerMask(e) {
		this._excludeWithLayerMask = e, this._resyncMeshes();
	}
	get includeOnlyWithLayerMask() {
		return this._includeOnlyWithLayerMask;
	}
	set includeOnlyWithLayerMask(e) {
		this._includeOnlyWithLayerMask = e, this._resyncMeshes();
	}
	get lightmapMode() {
		return this._lightmapMode;
	}
	set lightmapMode(e) {
		this._lightmapMode !== e && (this._lightmapMode = e, this._markMeshesAsLightDirty());
	}
	getViewMatrix(e) {
		return null;
	}
	getProjectionMatrix(e, t) {
		return null;
	}
	constructor(t, n, r) {
		super(t, n, !1), this.diffuse = new E(1, 1, 1), this.specular = new E(1, 1, 1), this.falloffType = e.FALLOFF_DEFAULT, this.intensity = 1, this._range = Number.MAX_VALUE, this._inverseSquaredRange = 0, this._photometricScale = 1, this._intensityMode = e.INTENSITYMODE_AUTOMATIC, this._radius = 1e-5, this.renderPriority = 0, this._shadowEnabled = !0, this._excludeWithLayerMask = 0, this._includeOnlyWithLayerMask = 0, this._lightmapMode = 0, this._shadowGenerators = null, this._excludedMeshesIds = [], this._includedOnlyMeshesIds = [], this._currentViewDepth = 0, this._isLight = !0, r || this.getScene().addLight(this), this._uniformBuffer = new d(this.getScene().getEngine(), void 0, void 0, t), this._buildUniformLayout(), this.includedOnlyMeshes = [], this.excludedMeshes = [], r || this._resyncMeshes();
	}
	transferTexturesToEffect(e, t) {
		return this;
	}
	_bindLight(e, t, n, r, i = !0) {
		let a = e.toString(), o = !1;
		if (this._uniformBuffer.bindToEffect(n, "Light" + a), this._renderId !== t.getRenderId() || this._lastUseSpecular !== r || !this._uniformBuffer.useUbo) {
			this._renderId = t.getRenderId(), this._lastUseSpecular = r;
			let e = this.getScaledIntensity();
			this.transferToEffect(n, a), this.diffuse.scaleToRef(e, ae.Color3[0]), this._uniformBuffer.updateColor4("vLightDiffuse", ae.Color3[0], this.range, a), r && (this.specular.scaleToRef(e, ae.Color3[1]), this._uniformBuffer.updateColor4("vLightSpecular", ae.Color3[1], this.radius, a)), o = !0;
		}
		if (this.transferTexturesToEffect(n, a), t.shadowsEnabled && this.shadowEnabled && i) {
			let e = this.getShadowGenerator(t.activeCamera) ?? this.getShadowGenerator();
			e && (e.bindShadowLight(a, n), o = !0);
		}
		o ? this._uniformBuffer.update() : this._uniformBuffer.bindUniformBuffer();
	}
	getClassName() {
		return "Light";
	}
	toString(e) {
		let t = "Name: " + this.name;
		if (t += ", type: " + [
			"Point",
			"Directional",
			"Spot",
			"Hemispheric",
			"Clustered"
		][this.getTypeID()], this.animations) for (let n = 0; n < this.animations.length; n++) t += ", animation[0]: " + this.animations[n].toString(e);
		return t;
	}
	_syncParentEnabledState() {
		super._syncParentEnabledState(), this.isDisposed() || this._resyncMeshes();
	}
	setEnabled(e) {
		super.setEnabled(e), this._resyncMeshes();
	}
	getShadowGenerator(e = null) {
		return this._shadowGenerators === null ? null : this._shadowGenerators.get(e) ?? null;
	}
	getShadowGenerators() {
		return this._shadowGenerators;
	}
	getAbsolutePosition() {
		return h.Zero();
	}
	canAffectMesh(e) {
		return !e || !(this.includedOnlyMeshes && this.includedOnlyMeshes.length > 0 && this.includedOnlyMeshes.indexOf(e) === -1 || this.excludedMeshes && this.excludedMeshes.length > 0 && this.excludedMeshes.indexOf(e) !== -1 || this.includeOnlyWithLayerMask !== 0 && (this.includeOnlyWithLayerMask & e.layerMask) === 0 || this.excludeWithLayerMask !== 0 && this.excludeWithLayerMask & e.layerMask);
	}
	dispose(e, t = !1) {
		if (this._shadowGenerators) {
			let e = this._shadowGenerators.values();
			for (let t = e.next(); t.done !== !0; t = e.next()) t.value.dispose();
			this._shadowGenerators = null;
		}
		if (this.getScene().stopAnimation(this), this._parentContainer) {
			let e = this._parentContainer.lights.indexOf(this);
			e > -1 && this._parentContainer.lights.splice(e, 1), this._parentContainer = null;
		}
		for (let e of this.getScene().meshes) e._removeLightSource(this, !0);
		this._uniformBuffer.dispose(), this.getScene().removeLight(this), super.dispose(e, t);
	}
	getTypeID() {
		return 0;
	}
	getScaledIntensity() {
		return this._photometricScale * this.intensity;
	}
	clone(t, n = null) {
		let r = e.GetConstructorFromName(this.getTypeID(), t, this.getScene());
		if (!r) return null;
		let i = D.Clone(r, this);
		return t && (i.name = t), n && (i.parent = n), i.setEnabled(this.isEnabled()), this.onClonedObservable.notifyObservers(i), i;
	}
	serialize() {
		let e = D.Serialize(this);
		if (e.uniqueId = this.uniqueId, e.type = this.getTypeID(), this.parent && this.parent._serializeAsParent(e), this.excludedMeshes.length > 0) {
			e.excludedMeshesIds = [];
			for (let t of this.excludedMeshes) e.excludedMeshesIds.push(t.id);
		}
		if (this.includedOnlyMeshes.length > 0) {
			e.includedOnlyMeshesIds = [];
			for (let t of this.includedOnlyMeshes) e.includedOnlyMeshesIds.push(t.id);
		}
		return D.AppendSerializedAnimations(this, e), e.ranges = this.serializeAnimationRanges(), e.isEnabled = this.isEnabled(), e;
	}
	static GetConstructorFromName(e, t, n) {
		return L.Construct("Light_Type_" + e, t, n) || null;
	}
	static Parse(t, n) {
		let r = e.GetConstructorFromName(t.type, t.name, n);
		if (!r) return null;
		let i = D.Parse(r, t, n);
		if (t.excludedMeshesIds && (i._excludedMeshesIds = t.excludedMeshesIds), t.includedOnlyMeshesIds && (i._includedOnlyMeshesIds = t.includedOnlyMeshesIds), t.parentId !== void 0 && (i._waitingParentId = t.parentId), t.parentInstanceIndex !== void 0 && (i._waitingParentInstanceIndex = t.parentInstanceIndex), t.falloffType !== void 0 && (i.falloffType = t.falloffType), t.lightmapMode !== void 0 && (i.lightmapMode = t.lightmapMode), t.animations) {
			for (let e = 0; e < t.animations.length; e++) {
				let n = t.animations[e], r = ee("BABYLON.Animation");
				r && i.animations.push(r.Parse(n));
			}
			L.ParseAnimationRanges(i, t, n);
		}
		return t.autoAnimate && n.beginAnimation(i, t.autoAnimateFrom, t.autoAnimateTo, t.autoAnimateLoop, t.autoAnimateSpeed || 1), t.isEnabled !== void 0 && i.setEnabled(t.isEnabled), i;
	}
	_hookArrayForExcluded(e) {
		let t = e.push;
		e.push = (...n) => {
			let r = t.apply(e, n);
			for (let e of n) e._resyncLightSource(this);
			return r;
		};
		let n = e.splice;
		e.splice = (t, r) => {
			let i = n.apply(e, [t, r]);
			for (let e of i) e._resyncLightSource(this);
			return i;
		};
		for (let t of e) t._resyncLightSource(this);
	}
	_hookArrayForIncludedOnly(e) {
		let t = e.push;
		e.push = (...n) => {
			let r = t.apply(e, n);
			return this._resyncMeshes(), r;
		};
		let n = e.splice;
		e.splice = (t, r) => {
			let i = n.apply(e, [t, r]);
			return this._resyncMeshes(), i;
		}, this._resyncMeshes();
	}
	_resyncMeshes() {
		for (let e of this.getScene().meshes) e._resyncLightSource(this);
	}
	_markMeshesAsLightDirty() {
		for (let e of this.getScene().meshes) e.lightSources.indexOf(this) !== -1 && e._markSubMeshesAsLightDirty();
	}
	_computePhotometricScale() {
		this._photometricScale = this._getPhotometricScale(), this.getScene().resetCachedMaterial();
	}
	_getPhotometricScale() {
		let t = 0, n = this.getTypeID(), r = this.intensityMode;
		switch (r === e.INTENSITYMODE_AUTOMATIC && (r = n === e.LIGHTTYPEID_DIRECTIONALLIGHT ? e.INTENSITYMODE_ILLUMINANCE : e.INTENSITYMODE_LUMINOUSINTENSITY), n) {
			case e.LIGHTTYPEID_POINTLIGHT:
			case e.LIGHTTYPEID_SPOTLIGHT:
				switch (r) {
					case e.INTENSITYMODE_LUMINOUSPOWER:
						t = 1 / (4 * Math.PI);
						break;
					case e.INTENSITYMODE_LUMINOUSINTENSITY:
						t = 1;
						break;
					case e.INTENSITYMODE_LUMINANCE: t = this.radius * this.radius;
				}
				break;
			case e.LIGHTTYPEID_DIRECTIONALLIGHT:
				switch (r) {
					case e.INTENSITYMODE_ILLUMINANCE:
						t = 1;
						break;
					case e.INTENSITYMODE_LUMINANCE: {
						let e = this.radius;
						e = Math.max(e, .001), t = 2 * Math.PI * (1 - Math.cos(e));
						break;
					}
				}
				break;
			case e.LIGHTTYPEID_HEMISPHERICLIGHT: t = 1;
		}
		return t;
	}
	_reorderLightsInScene() {
		let e = this.getScene();
		this._renderPriority != 0 && (e.requireLightSorting = !0), this.getScene().sortLightsByPriority();
	}
	_isReady() {
		return !0;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Lights/hemisphericLight.js
Q.FALLOFF_DEFAULT = m.FALLOFF_DEFAULT, Q.FALLOFF_PHYSICAL = m.FALLOFF_PHYSICAL, Q.FALLOFF_GLTF = m.FALLOFF_GLTF, Q.FALLOFF_STANDARD = m.FALLOFF_STANDARD, Q.LIGHTMAP_DEFAULT = m.LIGHTMAP_DEFAULT, Q.LIGHTMAP_SPECULAR = m.LIGHTMAP_SPECULAR, Q.LIGHTMAP_SHADOWSONLY = m.LIGHTMAP_SHADOWSONLY, Q.INTENSITYMODE_AUTOMATIC = m.INTENSITYMODE_AUTOMATIC, Q.INTENSITYMODE_LUMINOUSPOWER = m.INTENSITYMODE_LUMINOUSPOWER, Q.INTENSITYMODE_LUMINOUSINTENSITY = m.INTENSITYMODE_LUMINOUSINTENSITY, Q.INTENSITYMODE_ILLUMINANCE = m.INTENSITYMODE_ILLUMINANCE, Q.INTENSITYMODE_LUMINANCE = m.INTENSITYMODE_LUMINANCE, Q.LIGHTTYPEID_POINTLIGHT = m.LIGHTTYPEID_POINTLIGHT, Q.LIGHTTYPEID_DIRECTIONALLIGHT = m.LIGHTTYPEID_DIRECTIONALLIGHT, Q.LIGHTTYPEID_SPOTLIGHT = m.LIGHTTYPEID_SPOTLIGHT, Q.LIGHTTYPEID_HEMISPHERICLIGHT = m.LIGHTTYPEID_HEMISPHERICLIGHT, Q.LIGHTTYPEID_RECT_AREALIGHT = m.LIGHTTYPEID_RECT_AREALIGHT, M([fe()], Q.prototype, "diffuse", void 0), M([fe()], Q.prototype, "specular", void 0), M([N()], Q.prototype, "falloffType", void 0), M([N()], Q.prototype, "intensity", void 0), M([N()], Q.prototype, "range", null), M([N()], Q.prototype, "intensityMode", null), M([N()], Q.prototype, "radius", null), M([N()], Q.prototype, "_renderPriority", void 0), M([P("_reorderLightsInScene")], Q.prototype, "renderPriority", void 0), M([N("shadowEnabled")], Q.prototype, "_shadowEnabled", void 0), M([N("excludeWithLayerMask")], Q.prototype, "_excludeWithLayerMask", void 0), M([N("includeOnlyWithLayerMask")], Q.prototype, "_includeOnlyWithLayerMask", void 0), M([N("lightmapMode")], Q.prototype, "_lightmapMode", void 0), L.AddNodeConstructor("Light_Type_3", (e, t) => () => new Tn(e, h.Zero(), t));
var Tn = class extends Q {
	constructor(e, t, n, r) {
		super(e, n, r), this.groundColor = new E(0, 0, 0), this.direction = t || h.Up();
	}
	_buildUniformLayout() {
		this._uniformBuffer.addUniform("vLightData", 4), this._uniformBuffer.addUniform("vLightDiffuse", 4), this._uniformBuffer.addUniform("vLightSpecular", 4), this._uniformBuffer.addUniform("vLightGround", 3), this._uniformBuffer.addUniform("shadowsInfo", 3), this._uniformBuffer.addUniform("depthValues", 2), this._uniformBuffer.create();
	}
	getClassName() {
		return "HemisphericLight";
	}
	setDirectionToTarget(e) {
		return this.direction = h.Normalize(e.subtract(h.Zero())), this.direction;
	}
	getShadowGenerator() {
		return null;
	}
	transferToEffect(e, t) {
		let n = h.Normalize(this.direction);
		return this._uniformBuffer.updateFloat4("vLightData", n.x, n.y, n.z, 0, t), this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), t), this;
	}
	transferToNodeMaterialEffect(e, t) {
		let n = h.Normalize(this.direction);
		return e.setFloat3(t, n.x, n.y, n.z), this;
	}
	computeWorldMatrix() {
		return this._worldMatrix ||= S.Identity(), this._worldMatrix;
	}
	getTypeID() {
		return Q.LIGHTTYPEID_HEMISPHERICLIGHT;
	}
	prepareLightSpecificDefines(e, t) {
		e["HEMILIGHT" + t] = !0;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Meshes/groundMesh.js
M([fe()], Tn.prototype, "groundColor", void 0), M([he()], Tn.prototype, "direction", void 0), C("BABYLON.HemisphericLight", Tn), K._GroundMeshParser = (e, t) => En.Parse(e, t);
var En = class e extends K {
	constructor(e, t) {
		super(e, t), this.generateOctree = !1;
	}
	getClassName() {
		return "GroundMesh";
	}
	get subdivisions() {
		return Math.min(this._subdivisionsX, this._subdivisionsY);
	}
	get subdivisionsX() {
		return this._subdivisionsX;
	}
	get subdivisionsY() {
		return this._subdivisionsY;
	}
	optimize(e, t = 32) {
		this._subdivisionsX = e, this._subdivisionsY = e, this.subdivide(e);
		let n = this;
		n.createOrUpdateSubmeshesOctree && n.createOrUpdateSubmeshesOctree(t);
	}
	getHeightAtCoordinates(e, t) {
		let n = this.getWorldMatrix(), r = x.Matrix[5];
		n.invertToRef(r);
		let i = x.Vector3[8];
		if (h.TransformCoordinatesFromFloatsToRef(e, 0, t, r, i), e = i.x, t = i.z, e < this._minX || e >= this._maxX || t <= this._minZ || t > this._maxZ) return this.position.y;
		(!this._heightQuads || this._heightQuads.length == 0) && (this._initHeightQuads(), this._computeHeightQuads());
		let a = this._getFacetAt(e, t), o = -(a.x * e + a.z * t + a.w) / a.y;
		return h.TransformCoordinatesFromFloatsToRef(0, o, 0, n, i), i.y;
	}
	getNormalAtCoordinates(e, t) {
		let n = new h(0, 1, 0);
		return this.getNormalAtCoordinatesToRef(e, t, n), n;
	}
	getNormalAtCoordinatesToRef(e, t, n) {
		let r = this.getWorldMatrix(), i = x.Matrix[5];
		r.invertToRef(i);
		let a = x.Vector3[8];
		if (h.TransformCoordinatesFromFloatsToRef(e, 0, t, i, a), e = a.x, t = a.z, e < this._minX || e > this._maxX || t < this._minZ || t > this._maxZ) return this;
		(!this._heightQuads || this._heightQuads.length == 0) && (this._initHeightQuads(), this._computeHeightQuads());
		let o = this._getFacetAt(e, t);
		return h.TransformNormalFromFloatsToRef(o.x, o.y, o.z, r, n), this;
	}
	updateCoordinateHeights() {
		return (!this._heightQuads || this._heightQuads.length == 0) && this._initHeightQuads(), this._computeHeightQuads(), this;
	}
	_getFacetAt(e, t) {
		let n = Math.floor((e + this._maxX) * this._subdivisionsX / this._width), r = Math.floor(-(t + this._maxZ) * this._subdivisionsY / this._height + this._subdivisionsY), i = this._heightQuads[r * this._subdivisionsX + n], a;
		return a = t < i.slope.x * e + i.slope.y ? i.facet1 : i.facet2, a;
	}
	_initHeightQuads() {
		let e = this._subdivisionsX, t = this._subdivisionsY;
		this._heightQuads = [];
		for (let n = 0; n < t; n++) for (let t = 0; t < e; t++) {
			let r = {
				slope: _.Zero(),
				facet1: new b(0, 0, 0, 0),
				facet2: new b(0, 0, 0, 0)
			};
			this._heightQuads[n * e + t] = r;
		}
		return this;
	}
	_computeHeightQuads() {
		let e = this.getVerticesData(j.PositionKind);
		if (!e) return this;
		let t = x.Vector3[3], n = x.Vector3[2], r = x.Vector3[1], i = x.Vector3[0], a = x.Vector3[4], o = x.Vector3[5], s = x.Vector3[6], c = x.Vector3[7], l = x.Vector3[8], u, d, f, p, m, g, _, v = this._subdivisionsX, y = this._subdivisionsY;
		for (let b = 0; b < y; b++) for (let y = 0; y < v; y++) {
			u = y * 3, d = b * (v + 1) * 3, f = (b + 1) * (v + 1) * 3, t.x = e[d + u], t.y = e[d + u + 1], t.z = e[d + u + 2], n.x = e[d + u + 3], n.y = e[d + u + 4], n.z = e[d + u + 5], r.x = e[f + u], r.y = e[f + u + 1], r.z = e[f + u + 2], i.x = e[f + u + 3], i.y = e[f + u + 4], i.z = e[f + u + 5], p = (i.z - t.z) / (i.x - t.x), m = t.z - p * t.x, n.subtractToRef(t, a), r.subtractToRef(t, o), i.subtractToRef(t, s), h.CrossToRef(s, o, c), h.CrossToRef(a, s, l), c.normalize(), l.normalize(), g = -(c.x * t.x + c.y * t.y + c.z * t.z), _ = -(l.x * n.x + l.y * n.y + l.z * n.z);
			let x = this._heightQuads[b * v + y];
			x.slope.copyFromFloats(p, m), x.facet1.copyFromFloats(c.x, c.y, c.z, g), x.facet2.copyFromFloats(l.x, l.y, l.z, _);
		}
		return this;
	}
	serialize(e) {
		super.serialize(e), e.subdivisionsX = this._subdivisionsX, e.subdivisionsY = this._subdivisionsY, e.minX = this._minX, e.maxX = this._maxX, e.minZ = this._minZ, e.maxZ = this._maxZ, e.width = this._width, e.height = this._height;
	}
	static Parse(t, n) {
		let r = new e(t.name, n);
		return r._subdivisionsX = t.subdivisionsX || 1, r._subdivisionsY = t.subdivisionsY || 1, r._minX = t.minX, r._maxX = t.maxX, r._minZ = t.minZ, r._maxZ = t.maxZ, r._width = t.width, r._height = t.height, r;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Meshes/Builders/groundBuilder.js
function Dn(e) {
	let t = [], n = [], r = [], i = [], a, o, s = e.width || e.size || 1, c = e.height || e.size || 1, l = (e.subdivisionsX || e.subdivisions || 1) | 0, u = (e.subdivisionsY || e.subdivisions || 1) | 0;
	for (a = 0; a <= u; a++) for (o = 0; o <= l; o++) {
		let e = new h(o * s / l - s / 2, 0, (u - a) * c / u - c / 2), t = new h(0, 1, 0);
		n.push(e.x, e.y, e.z), r.push(t.x, t.y, t.z), i.push(o / l, k ? a / u : 1 - a / u);
	}
	for (a = 0; a < u; a++) for (o = 0; o < l; o++) t.push(o + 1 + (a + 1) * (l + 1)), t.push(o + 1 + a * (l + 1)), t.push(o + a * (l + 1)), t.push(o + (a + 1) * (l + 1)), t.push(o + 1 + (a + 1) * (l + 1)), t.push(o + a * (l + 1));
	let d = new B();
	return d.indices = t, d.positions = n, d.normals = r, d.uvs = i, d;
}
function On(e) {
	let t = e.xmin !== void 0 && e.xmin !== null ? e.xmin : -1, n = e.zmin !== void 0 && e.zmin !== null ? e.zmin : -1, r = e.xmax !== void 0 && e.xmax !== null ? e.xmax : 1, i = e.zmax !== void 0 && e.zmax !== null ? e.zmax : 1, a = e.subdivisions || {
		w: 1,
		h: 1
	}, o = e.precision || {
		w: 1,
		h: 1
	}, s = [], c = [], l = [], u = [], d, f, p, m;
	a.h = a.h < 1 ? 1 : a.h, a.w = a.w < 1 ? 1 : a.w, o.w = o.w < 1 ? 1 : o.w, o.h = o.h < 1 ? 1 : o.h;
	let g = {
		w: (r - t) / a.w,
		h: (i - n) / a.h
	};
	function _(e, t, n, r) {
		let i = c.length / 3, a = o.w + 1;
		for (d = 0; d < o.h; d++) for (f = 0; f < o.w; f++) {
			let e = [
				i + f + d * a,
				i + (f + 1) + d * a,
				i + (f + 1) + (d + 1) * a,
				i + f + (d + 1) * a
			];
			s.push(e[1]), s.push(e[2]), s.push(e[3]), s.push(e[0]), s.push(e[1]), s.push(e[3]);
		}
		let p = h.Zero(), m = new h(0, 1, 0);
		for (d = 0; d <= o.h; d++) for (p.z = d * (r - t) / o.h + t, f = 0; f <= o.w; f++) p.x = f * (n - e) / o.w + e, p.y = 0, c.push(p.x, p.y, p.z), l.push(m.x, m.y, m.z), u.push(f / o.w, d / o.h);
	}
	for (p = 0; p < a.h; p++) for (m = 0; m < a.w; m++) _(t + m * g.w, n + p * g.h, t + (m + 1) * g.w, n + (p + 1) * g.h);
	let v = new B();
	return v.indices = s, v.positions = c, v.normals = l, v.uvs = u, v;
}
function kn(e) {
	let t = [], n = [], r = [], i = [], a, o, s = e.colorFilter || new E(.3, .59, .11), c = e.alphaFilter || 0, l = !1;
	if (e.minHeight > e.maxHeight) {
		l = !0;
		let t = e.maxHeight;
		e.maxHeight = e.minHeight, e.minHeight = t;
	}
	for (a = 0; a <= e.subdivisions; a++) for (o = 0; o <= e.subdivisions; o++) {
		let t = new h(o * e.width / e.subdivisions - e.width / 2, 0, (e.subdivisions - a) * e.height / e.subdivisions - e.height / 2), u = (((t.x + e.width / 2) / e.width * (e.bufferWidth - 1) | 0) + ((1 - (t.z + e.height / 2) / e.height) * (e.bufferHeight - 1) | 0) * e.bufferWidth) * 4, d = e.buffer[u] / 255, f = e.buffer[u + 1] / 255, p = e.buffer[u + 2] / 255, m = e.buffer[u + 3] / 255;
		l && (d = 1 - d, f = 1 - f, p = 1 - p);
		let _ = d * s.r + f * s.g + p * s.b;
		t.y = m >= c ? e.minHeight + (e.maxHeight - e.minHeight) * _ : e.minHeight - g, e.heightBuffer && (e.heightBuffer[a * (e.subdivisions + 1) + o] = t.y), n.push(t.x, t.y, t.z), r.push(0, 0, 0), i.push(o / e.subdivisions, 1 - a / e.subdivisions);
	}
	for (a = 0; a < e.subdivisions; a++) for (o = 0; o < e.subdivisions; o++) {
		let r = o + 1 + (a + 1) * (e.subdivisions + 1), i = o + 1 + a * (e.subdivisions + 1), s = o + a * (e.subdivisions + 1), c = o + (a + 1) * (e.subdivisions + 1), l = n[r * 3 + 1] >= e.minHeight, u = n[i * 3 + 1] >= e.minHeight, d = n[s * 3 + 1] >= e.minHeight;
		l && u && d && (t.push(r), t.push(i), t.push(s)), n[c * 3 + 1] >= e.minHeight && l && d && (t.push(c), t.push(r), t.push(s));
	}
	B.ComputeNormals(n, t, r);
	let u = new B();
	return u.indices = t, u.positions = n, u.normals = r, u.uvs = i, u;
}
function An(e, t = {}, n) {
	let r = new En(e, n);
	return r._setReady(!1), r._subdivisionsX = t.subdivisionsX || t.subdivisions || 1, r._subdivisionsY = t.subdivisionsY || t.subdivisions || 1, r._width = t.width || 1, r._height = t.height || 1, r._maxX = r._width / 2, r._maxZ = r._height / 2, r._minX = -r._maxX, r._minZ = -r._maxZ, Dn(t).applyToMesh(r, t.updatable), r._setReady(!0), r;
}
function jn(e, t, n = null) {
	let r = new K(e, n);
	return On(t).applyToMesh(r, t.updatable), r;
}
function Mn(t, n, r = {}, i = null) {
	let a = r.width || 10, o = r.height || 10, s = r.subdivisions || 1, c = r.minHeight || 0, l = r.maxHeight || 1, u = r.colorFilter || new E(.3, .59, .11), d = r.alphaFilter || 0, f = r.updatable, p = r.onReady;
	i ||= e.LastCreatedScene;
	let m = new En(t, i);
	m._subdivisionsX = s, m._subdivisionsY = s, m._width = a, m._height = o, m._maxX = m._width / 2, m._maxZ = m._height / 2, m._minX = -m._maxX, m._minZ = -m._maxZ, m._setReady(!1);
	let h;
	r.passHeightBufferInCallback && (h = new Float32Array((s + 1) * (s + 1)));
	let g = (e, t, n) => {
		kn({
			width: a,
			height: o,
			subdivisions: s,
			minHeight: c,
			maxHeight: l,
			colorFilter: u,
			buffer: e,
			bufferWidth: t,
			bufferHeight: n,
			alphaFilter: d,
			heightBuffer: h
		}).applyToMesh(m, f), p && p(m, h), m._setReady(!0);
	};
	return typeof n == "string" ? F.LoadImage(n, (e) => {
		let t = e.width, n = e.height;
		if (i.isDisposed) return;
		let r = i?.getEngine().resizeImageBitmap(e, t, n);
		g(r, t, n);
	}, r.onError ? r.onError : () => {}, i.offlineProvider) : g(n.data, n.width, n.height), m;
}
B.CreateGround = Dn, B.CreateTiledGround = On, B.CreateGroundFromHeightMap = kn, K.CreateGround = (e, t, n, r, i, a) => An(e, {
	width: t,
	height: n,
	subdivisions: r,
	updatable: a
}, i), K.CreateTiledGround = (e, t, n, r, i, a, o, s, c) => jn(e, {
	xmin: t,
	zmin: n,
	xmax: r,
	zmax: i,
	subdivisions: a,
	precision: o,
	updatable: c
}, s), K.CreateGroundFromHeightMap = (e, t, n, r, i, a, o, s, c, l, u) => Mn(e, t, {
	width: n,
	height: r,
	subdivisions: i,
	minHeight: a,
	maxHeight: o,
	updatable: c,
	onReady: l,
	alphaFilter: u
}, s);
//#endregion
//#region node_modules/@babylonjs/core/Meshes/Builders/boxBuilder.js
function Nn(e) {
	let t = [
		0,
		1,
		2,
		0,
		2,
		3,
		4,
		5,
		6,
		4,
		6,
		7,
		8,
		9,
		10,
		8,
		10,
		11,
		12,
		13,
		14,
		12,
		14,
		15,
		16,
		17,
		18,
		16,
		18,
		19,
		20,
		21,
		22,
		20,
		22,
		23
	], n = [
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0,
		0,
		-1,
		0
	], r = [], i = e.width || e.size || 1, a = e.height || e.size || 1, o = e.depth || e.size || 1, s = e.wrap || !1, c = e.topBaseAt === void 0 ? 1 : e.topBaseAt, l = e.bottomBaseAt === void 0 ? 0 : e.bottomBaseAt;
	c = (c + 4) % 4, l = (l + 4) % 4;
	let u = [
		2,
		0,
		3,
		1
	], d = [
		2,
		0,
		1,
		3
	], f = u[c], p = d[l], m = [
		1,
		-1,
		1,
		-1,
		-1,
		1,
		-1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		-1,
		-1,
		1,
		-1,
		-1,
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		-1,
		1,
		-1,
		-1,
		1,
		-1,
		1,
		1,
		1,
		1,
		-1,
		1,
		1,
		-1,
		-1,
		1,
		-1,
		-1,
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		-1,
		1,
		-1,
		1,
		1,
		-1,
		1,
		1,
		1,
		1,
		-1,
		1,
		1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		1
	];
	if (s) {
		t = [
			2,
			3,
			0,
			2,
			0,
			1,
			4,
			5,
			6,
			4,
			6,
			7,
			9,
			10,
			11,
			9,
			11,
			8,
			12,
			14,
			15,
			12,
			13,
			14
		], m = [
			-1,
			1,
			1,
			1,
			1,
			1,
			1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1,
			-1,
			-1,
			1,
			-1,
			-1,
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1,
			1,
			1,
			-1,
			1,
			-1,
			-1,
			1,
			-1,
			1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			-1,
			-1,
			1,
			-1,
			-1,
			-1
		];
		let e = [
			[
				1,
				1,
				1
			],
			[
				-1,
				1,
				1
			],
			[
				-1,
				1,
				-1
			],
			[
				1,
				1,
				-1
			]
		], n = [
			[
				-1,
				-1,
				1
			],
			[
				1,
				-1,
				1
			],
			[
				1,
				-1,
				-1
			],
			[
				-1,
				-1,
				-1
			]
		], r = [
			17,
			18,
			19,
			16
		], i = [
			22,
			23,
			20,
			21
		];
		for (; f > 0;) e.unshift(e.pop()), r.unshift(r.pop()), f--;
		for (; p > 0;) n.unshift(n.pop()), i.unshift(i.pop()), p--;
		e = e.flat(), n = n.flat(), m = m.concat(e).concat(n), t.push(r[0], r[2], r[3], r[0], r[1], r[2]), t.push(i[0], i[2], i[3], i[0], i[1], i[2]);
	}
	let h = [
		i / 2,
		a / 2,
		o / 2
	], g = m.reduce((e, t, n) => e.concat(t * h[n % 3]), []), _ = e.sideOrientation === 0 ? 0 : e.sideOrientation || B.DEFAULTSIDE, v = e.faceUV || [
		,
		,
		,
		,
		,
		,
	], y = e.faceColors, x = [];
	for (let e = 0; e < 6; e++) v[e] === void 0 && (v[e] = new b(0, 0, 1, 1)), y && y[e] === void 0 && (y[e] = new O(1, 1, 1, 1));
	for (let e = 0; e < 6; e++) if (r.push(v[e].z, k ? 1 - v[e].w : v[e].w), r.push(v[e].x, k ? 1 - v[e].w : v[e].w), r.push(v[e].x, k ? 1 - v[e].y : v[e].y), r.push(v[e].z, k ? 1 - v[e].y : v[e].y), y) for (let t = 0; t < 4; t++) x.push(y[e].r, y[e].g, y[e].b, y[e].a);
	B._ComputeSides(_, g, t, n, r, e.frontUVs, e.backUVs);
	let S = new B();
	return S.indices = t, S.positions = g, S.normals = n, S.uvs = r, y && (S.colors = _ === B.DOUBLESIDE ? x.concat(x) : x), S;
}
function Pn(e, t = {}, n = null) {
	let r = new K(e, n);
	return t.sideOrientation = K._GetDefaultSideOrientation(t.sideOrientation), r._originalBuilderSideOrientation = t.sideOrientation, Nn(t).applyToMesh(r, t.updatable), r;
}
B.CreateBox = Nn, K.CreateBox = (e, t, n = null, r, i) => Pn(e, {
	size: t,
	sideOrientation: i,
	updatable: r
}, n);
//#endregion
//#region node_modules/@babylonjs/core/Materials/prePassConfiguration.js
var Fn = class {
	constructor() {
		this.previousWorldMatrices = {}, this.previousBones = {};
	}
	static AddUniforms(e) {
		e.push("previousWorld", "previousViewProjection", "mPreviousBones");
	}
	static AddSamplers(e) {}
	bindForSubMesh(e, t, n, r, i) {
		if (t.prePassRenderer && t.prePassRenderer.enabled && t.prePassRenderer.currentRTisSceneRT && (t.prePassRenderer.getIndex(2) !== -1 || t.prePassRenderer.getIndex(11) !== -1)) {
			this.previousWorldMatrices[n.uniqueId] || (this.previousWorldMatrices[n.uniqueId] = r.clone()), this.previousViewProjection || (this.previousViewProjection = t.getTransformMatrix().clone(), this.currentViewProjection = t.getTransformMatrix().clone());
			let i = t.getEngine();
			this.currentViewProjection.updateFlag === t.getTransformMatrix().updateFlag ? this._lastUpdateFrameId !== i.frameId && (this._lastUpdateFrameId = i.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection)) : (this._lastUpdateFrameId = i.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection), this.currentViewProjection.copyFrom(t.getTransformMatrix())), e.setMatrix("previousWorld", this.previousWorldMatrices[n.uniqueId]), e.setMatrix("previousViewProjection", this.previousViewProjection), this.previousWorldMatrices[n.uniqueId] = r.clone();
		}
	}
}, In = class {
	constructor(e) {
		if (this.VERTEXOUTPUT_INVARIANT = !1, this._keys = [], this._isDirty = !0, this._areLightsDirty = !0, this._areLightsDisposed = !1, this._areAttributesDirty = !0, this._areTexturesDirty = !0, this._areFresnelDirty = !0, this._areMiscDirty = !0, this._arePrePassDirty = !0, this._areImageProcessingDirty = !0, this._normals = !1, this._uvs = !1, this._needNormals = !1, this._needUVs = !1, this._externalProperties = e, e) for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && this._setDefaultValue(t);
	}
	get isDirty() {
		return this._isDirty;
	}
	markAsProcessed() {
		this._isDirty = !1, this._areAttributesDirty = !1, this._areTexturesDirty = !1, this._areFresnelDirty = !1, this._areLightsDirty = !1, this._areLightsDisposed = !1, this._areMiscDirty = !1, this._arePrePassDirty = !1, this._areImageProcessingDirty = !1;
	}
	markAsUnprocessed() {
		this._isDirty = !0;
	}
	markAllAsDirty() {
		this._areTexturesDirty = !0, this._areAttributesDirty = !0, this._areLightsDirty = !0, this._areFresnelDirty = !0, this._areMiscDirty = !0, this._arePrePassDirty = !0, this._areImageProcessingDirty = !0, this._isDirty = !0;
	}
	markAsImageProcessingDirty() {
		this._areImageProcessingDirty = !0, this._isDirty = !0;
	}
	markAsLightDirty(e = !1) {
		this._areLightsDirty = !0, this._areLightsDisposed = this._areLightsDisposed || e, this._isDirty = !0;
	}
	markAsAttributesDirty() {
		this._areAttributesDirty = !0, this._isDirty = !0;
	}
	markAsTexturesDirty() {
		this._areTexturesDirty = !0, this._isDirty = !0;
	}
	markAsFresnelDirty() {
		this._areFresnelDirty = !0, this._isDirty = !0;
	}
	markAsMiscDirty() {
		this._areMiscDirty = !0, this._isDirty = !0;
	}
	markAsPrePassDirty() {
		this._arePrePassDirty = !0, this._isDirty = !0;
	}
	rebuild() {
		this._keys.length = 0;
		for (let e of Object.keys(this)) e[0] !== "_" && this._keys.push(e);
		if (this._externalProperties) for (let e in this._externalProperties) this._keys.indexOf(e) === -1 && this._keys.push(e);
	}
	isEqual(e) {
		if (this._keys.length !== e._keys.length) return !1;
		for (let t = 0; t < this._keys.length; t++) {
			let n = this._keys[t];
			if (this[n] !== e[n]) return !1;
		}
		return !0;
	}
	cloneTo(e) {
		this._keys.length !== e._keys.length && (e._keys = this._keys.slice(0));
		for (let t = 0; t < this._keys.length; t++) {
			let n = this._keys[t];
			e[n] = this[n];
		}
	}
	reset() {
		for (let e of this._keys) this._setDefaultValue(e);
	}
	_setDefaultValue(e) {
		let t = this._externalProperties?.[e]?.type ?? typeof this[e], n = this._externalProperties?.[e]?.default;
		switch (t) {
			case "number":
				this[e] = n ?? 0;
				break;
			case "string":
				this[e] = n ?? "";
				break;
			default: this[e] = n ?? !1;
		}
	}
	toString() {
		let e = "";
		for (let t = 0; t < this._keys.length; t++) {
			let n = this._keys[t], r = this[n];
			switch (typeof r) {
				case "number":
				case "string":
					e += "#define " + n + " " + r + "\n";
					break;
				default: r && (e += "#define " + n + "\n");
			}
		}
		return e;
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Materials/imageProcessingConfiguration.defines.js
function Ln(e) {
	return class extends e {
		constructor() {
			super(...arguments), this.IMAGEPROCESSING = !1, this.VIGNETTE = !1, this.VIGNETTEBLENDMODEMULTIPLY = !1, this.VIGNETTEBLENDMODEOPAQUE = !1, this.TONEMAPPING = 0, this.CONTRAST = !1, this.COLORCURVES = !1, this.COLORGRADING = !1, this.COLORGRADING3D = !1, this.SAMPLER3DGREENDEPTH = !1, this.SAMPLER3DBGRMAP = !1, this.DITHER = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.EXPOSURE = !1;
		}
	};
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/pushMaterial.js
var Rn = class extends G {
	constructor(e, t, n = !0, r = !1) {
		super(e, t, void 0, r), this._normalMatrix = new S(), this._storeEffectOnSubMeshes = n;
	}
	getEffect() {
		return this._storeEffectOnSubMeshes ? this._activeEffect : super.getEffect();
	}
	isReady(e, t) {
		return e ? !this._storeEffectOnSubMeshes || !e.subMeshes || e.subMeshes.length === 0 || this.isReadyForSubMesh(e, e.subMeshes[0], t) : !1;
	}
	_isReadyForSubMesh(e) {
		let t = e.materialDefines;
		return !!(!this.checkReadyOnEveryCall && e.effect && t && t._renderId === this.getScene().getRenderId());
	}
	bindOnlyWorldMatrix(e) {
		this._activeEffect.setMatrix("world", e);
	}
	bindOnlyNormalMatrix(e) {
		this._activeEffect.setMatrix("normalMatrix", e);
	}
	bind(e, t) {
		t && this.bindForSubMesh(e, t, t.subMeshes[0]);
	}
	_afterBind(e, t = null, n) {
		super._afterBind(e, t, n), this.getScene()._cachedEffect = t, n ? n._drawWrapper._forceRebindOnNextCall = !1 : this._drawWrapper._forceRebindOnNextCall = !1;
	}
	_mustRebind(e, t, n, r = 1) {
		return n._drawWrapper._forceRebindOnNextCall || e.isCachedMaterialInvalid(this, t, r);
	}
	dispose(e, t, n) {
		this._activeEffect = void 0, super.dispose(e, t, n);
	}
}, zn = class {
	constructor() {
		this._defines = {}, this._currentRank = 32, this._maxRank = -1, this._mesh = null;
	}
	unBindMesh() {
		this._mesh = null;
	}
	addFallback(e, t) {
		this._defines[e] || (e < this._currentRank && (this._currentRank = e), e > this._maxRank && (this._maxRank = e), this._defines[e] = []), this._defines[e].push(t);
	}
	addCPUSkinningFallback(e, t) {
		this._mesh = t, e < this._currentRank && (this._currentRank = e), e > this._maxRank && (this._maxRank = e);
	}
	get hasMoreFallbacks() {
		return this._currentRank <= this._maxRank;
	}
	reduce(e, t) {
		if (this._mesh && this._mesh.computeBonesUsingShaders && this._mesh.numBoneInfluencers > 0) {
			this._mesh.computeBonesUsingShaders = !1, e = e.replace("#define NUM_BONE_INFLUENCERS " + this._mesh.numBoneInfluencers, "#define NUM_BONE_INFLUENCERS 0"), t._bonesComputationForcedToCPU = !0;
			let n = this._mesh.getScene();
			for (let e = 0; e < n.meshes.length; e++) {
				let r = n.meshes[e];
				if (!r.material) {
					!this._mesh.material && r.computeBonesUsingShaders && r.numBoneInfluencers > 0 && (r.computeBonesUsingShaders = !1);
					continue;
				}
				if (!(!r.computeBonesUsingShaders || r.numBoneInfluencers === 0)) {
					if (r.material.getEffect() === t) r.computeBonesUsingShaders = !1;
					else if (r.subMeshes) {
						for (let e of r.subMeshes) if (e.effect === t) {
							r.computeBonesUsingShaders = !1;
							break;
						}
					}
				}
			}
		} else {
			let t = this._defines[this._currentRank];
			if (t) for (let n = 0; n < t.length; n++) e = e.replace("#define " + t[n], "");
			this._currentRank++;
		}
		return e;
	}
}, Bn = /* @__PURE__ */ RegExp("^([gimus]+)!"), Vn = class e {
	constructor(e) {
		this._plugins = [], this._activePlugins = [], this._activePluginsForExtraEvents = [], this._material = e, this._scene = e.getScene(), this._engine = this._scene.getEngine();
	}
	_addPlugin(t) {
		for (let e = 0; e < this._plugins.length; ++e) if (this._plugins[e].name === t.name) return !1;
		if (this._material._uniformBufferLayoutBuilt && (this._material.resetDrawCache(), this._material._createUniformBuffer()), !t.isCompatible(this._material.shaderLanguage)) throw `The plugin "${t.name}" can't be added to the material "${this._material.name}" because the plugin is not compatible with the shader language of the material.`;
		let n = t.getClassName();
		e._MaterialPluginClassToMainDefine[n] || (e._MaterialPluginClassToMainDefine[n] = "MATERIALPLUGIN_" + ++e._MaterialPluginCounter), this._material._callbackPluginEventGeneric = (e, t) => this._handlePluginEvent(e, t), this._plugins.push(t), this._plugins.sort((e, t) => e.priority - t.priority), this._codeInjectionPoints = {};
		let r = {};
		r[e._MaterialPluginClassToMainDefine[n]] = {
			type: "boolean",
			default: !0
		};
		for (let e of this._plugins) e.collectDefines(r), this._collectPointNames("vertex", e.getCustomCode("vertex", this._material.shaderLanguage)), this._collectPointNames("fragment", e.getCustomCode("fragment", this._material.shaderLanguage));
		return this._defineNamesFromPlugins = r, !0;
	}
	_activatePlugin(e) {
		this._activePlugins.indexOf(e) === -1 && (this._activePlugins.push(e), this._activePlugins.sort((e, t) => e.priority - t.priority), this._material._callbackPluginEventIsReadyForSubMesh = this._handlePluginEventIsReadyForSubMesh.bind(this), this._material._callbackPluginEventPrepareDefinesBeforeAttributes = this._handlePluginEventPrepareDefinesBeforeAttributes.bind(this), this._material._callbackPluginEventPrepareDefines = this._handlePluginEventPrepareDefines.bind(this), this._material._callbackPluginEventBindForSubMesh = this._handlePluginEventBindForSubMesh.bind(this), e.registerForExtraEvents && (this._activePluginsForExtraEvents.push(e), this._activePluginsForExtraEvents.sort((e, t) => e.priority - t.priority), this._material._callbackPluginEventHasRenderTargetTextures = this._handlePluginEventHasRenderTargetTextures.bind(this), this._material._callbackPluginEventFillRenderTargetTextures = this._handlePluginEventFillRenderTargetTextures.bind(this), this._material._callbackPluginEventHardBindForSubMesh = this._handlePluginEventHardBindForSubMesh.bind(this)));
	}
	getPlugin(e) {
		for (let t = 0; t < this._plugins.length; ++t) if (this._plugins[t].name === e) return this._plugins[t];
		return null;
	}
	_handlePluginEventIsReadyForSubMesh(e) {
		let t = !0;
		for (let n of this._activePlugins) t &&= n.isReadyForSubMesh(e.defines, this._scene, this._engine, e.subMesh);
		e.isReadyForSubMesh = t;
	}
	_handlePluginEventPrepareDefinesBeforeAttributes(e) {
		for (let t of this._activePlugins) t.prepareDefinesBeforeAttributes(e.defines, this._scene, e.mesh);
	}
	_handlePluginEventPrepareDefines(e) {
		for (let t of this._activePlugins) t.prepareDefines(e.defines, this._scene, e.mesh);
	}
	_handlePluginEventHardBindForSubMesh(e) {
		for (let t of this._activePluginsForExtraEvents) t.hardBindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, e.subMesh);
	}
	_handlePluginEventBindForSubMesh(e) {
		for (let t of this._activePlugins) t.bindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, e.subMesh);
	}
	_handlePluginEventHasRenderTargetTextures(e) {
		let t = !1;
		for (let e of this._activePluginsForExtraEvents) if (t = e.hasRenderTargetTextures(), t) break;
		e.hasRenderTargetTextures = t;
	}
	_handlePluginEventFillRenderTargetTextures(e) {
		for (let t of this._activePluginsForExtraEvents) t.fillRenderTargetTextures(e.renderTargets);
	}
	_handlePluginEvent(e, t) {
		switch (e) {
			case 512: {
				let e = t;
				for (let t of this._activePlugins) t.getActiveTextures(e.activeTextures);
				break;
			}
			case 256: {
				let e = t;
				for (let t of this._activePlugins) t.getAnimatables(e.animatables);
				break;
			}
			case 1024: {
				let e = t, n = !1;
				for (let t of this._activePlugins) if (n = t.hasTexture(e.texture), n) break;
				e.hasTexture = n;
				break;
			}
			case 2: {
				let e = t;
				for (let t of this._plugins) t.dispose(e.forceDisposeTextures);
				break;
			}
			case 4: {
				let e = t;
				e.defineNames = this._defineNamesFromPlugins;
				break;
			}
			case 128: {
				let e = t;
				for (let t of this._activePlugins) e.fallbackRank = t.addFallbacks(e.defines, e.fallbacks, e.fallbackRank), t.getAttributes(e.attributes, this._scene, e.mesh);
				this._uniformList.length > 0 && e.uniforms.push(...this._uniformList), this._samplerList.length > 0 && e.samplers.push(...this._samplerList), this._uboList.length > 0 && e.uniformBuffersNames.push(...this._uboList), e.customCode = this._injectCustomCode(e, e.customCode);
				break;
			}
			case 8: {
				let e = t;
				this._uboDeclaration = "", this._vertexDeclaration = "", this._fragmentDeclaration = "", this._uniformList = [], this._samplerList = [], this._uboList = [];
				let n = this._material.shaderLanguage === 1;
				for (let t of this._plugins) {
					let r = t.getUniforms(this._material.shaderLanguage);
					if (r) {
						if (r.ubo) for (let t of r.ubo) {
							if (t.size && t.type) {
								let r = t.arraySize ?? 0;
								if (e.ubo.addUniform(t.name, t.size, r), n) {
									let e;
									switch (t.type) {
										case "mat4":
											e = "mat4x4f";
											break;
										case "float":
											e = "f32";
											break;
										default: e = `${t.type}f`;
									}
									r > 0 ? this._uboDeclaration += `uniform ${t.name}: array<${e}, ${r}>;\n` : this._uboDeclaration += `uniform ${t.name}: ${e};\n`;
								} else this._uboDeclaration += `${t.type} ${t.name}${r > 0 ? `[${r}]` : ""};\n`;
							}
							this._uniformList.push(t.name);
						}
						r.vertex && (this._vertexDeclaration += r.vertex + "\n"), r.fragment && (this._fragmentDeclaration += r.fragment + "\n"), r.externalUniforms && this._uniformList.push(...r.externalUniforms);
					}
					t.getSamplers(this._samplerList), t.getUniformBuffersNames(this._uboList);
				}
				break;
			}
		}
	}
	_collectPointNames(e, t) {
		if (t) for (let n in t) this._codeInjectionPoints[e] || (this._codeInjectionPoints[e] = {}), this._codeInjectionPoints[e][n] = !0;
	}
	_injectCustomCode(e, t) {
		return (n, i) => {
			t && (i = t(n, i)), this._uboDeclaration && (i = i.replace("#define ADDITIONAL_UBO_DECLARATION", this._uboDeclaration)), this._vertexDeclaration && (i = i.replace("#define ADDITIONAL_VERTEX_DECLARATION", this._vertexDeclaration)), this._fragmentDeclaration && (i = i.replace("#define ADDITIONAL_FRAGMENT_DECLARATION", this._fragmentDeclaration));
			let a = this._codeInjectionPoints?.[n];
			if (!a) return i;
			let o = null;
			for (let t in a) {
				let a = "";
				for (let i of this._activePlugins) {
					let s = this._material.shaderLanguage, l = i.getCustomCode(n, s)?.[t];
					l && (i.resolveIncludes && (o === null && (o = {
						defines: [],
						indexParameters: e.indexParameters,
						isFragment: !1,
						shouldUseHighPrecisionShader: this._engine._shouldUseHighPrecisionShader,
						processor: void 0,
						supportsUniformBuffers: this._engine.supportsUniformBuffers,
						shadersRepository: c.GetShadersRepository(s),
						includesShadersStore: c.GetIncludesShadersStore(s),
						version: void 0,
						platformName: this._engine.shaderPlatformName,
						processingContext: void 0,
						isNDCHalfZRange: this._engine.isNDCHalfZRange,
						useReverseDepthBuffer: this._engine.useReverseDepthBuffer,
						processCodeAfterIncludes: void 0
					}), o.isFragment = n === "fragment", r(l, o, (e) => l = e)), a += l + "\n");
				}
				if (a.length > 0) {
					if (t.charAt(0) === "!") {
						t = t.substring(1);
						let e = "g";
						if (t.charAt(0) === "!") e = "", t = t.substring(1);
						else {
							let n = Bn.exec(t);
							n && n.length >= 2 && (e = n[1], t = t.substring(e.length + 1));
						}
						e.indexOf("g") < 0 && (e += "g");
						let n = i, r = new RegExp(t, e), o = r.exec(n);
						for (; o !== null;) {
							let e = a;
							for (let t = 0; t < o.length; ++t) e = e.replace("$" + t, o[t]);
							i = i.replace(o[0], e), o = r.exec(n);
						}
					} else {
						let e = "#define " + t;
						i = i.replace(e, "\n" + a + "\n" + e);
					}
				}
			}
			return i;
		};
	}
};
Vn._MaterialPluginClassToMainDefine = {}, Vn._MaterialPluginCounter = 0, e.OnEnginesDisposedObservable.add(() => {
	Wn();
});
var Hn = [], Un = null;
function Wn() {
	Hn.length = 0, G.OnEventObservable.remove(Un), Un = null;
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialPluginBase.js
var Gn = class {
	isCompatible(e) {
		switch (e) {
			case 0: return !0;
			default: return !1;
		}
	}
	_enable(e) {
		e && this._pluginManager._activatePlugin(this);
	}
	constructor(e, t, n, r, i = !0, a = !1, o = !1) {
		this.priority = 500, this.resolveIncludes = !1, this.registerForExtraEvents = !1, this.doNotSerialize = !1, this._material = e, this.name = t, this.priority = n, this.resolveIncludes = o, e.pluginManager || (e.pluginManager = new Vn(e), e.onDisposeObservable.add(() => {
			e.pluginManager = void 0;
		})), this._pluginDefineNames = r, this._pluginManager = e.pluginManager, i && this._pluginManager._addPlugin(this), a && this._enable(!0), this.markAllDefinesAsDirty = e._dirtyCallbacks[127];
	}
	getClassName() {
		return "MaterialPluginBase";
	}
	isReadyForSubMesh(e, t, n, r) {
		return !0;
	}
	hardBindForSubMesh(e, t, n, r) {}
	bindForSubMesh(e, t, n, r) {}
	dispose(e) {}
	getCustomCode(e, t = 0) {
		return null;
	}
	collectDefines(e) {
		if (this._pluginDefineNames) for (let t of Object.keys(this._pluginDefineNames)) {
			if (t[0] === "_") continue;
			let n = typeof this._pluginDefineNames[t];
			e[t] = {
				type: n === "number" ? "number" : n === "string" ? "string" : n === "boolean" ? "boolean" : "object",
				default: this._pluginDefineNames[t]
			};
		}
	}
	prepareDefinesBeforeAttributes(e, t, n) {}
	prepareDefines(e, t, n) {}
	hasTexture(e) {
		return !1;
	}
	hasRenderTargetTextures() {
		return !1;
	}
	fillRenderTargetTextures(e) {}
	getActiveTextures(e) {}
	getAnimatables(e) {}
	addFallbacks(e, t, n) {
		return n;
	}
	getSamplers(e) {}
	getAttributes(e, t, n) {}
	getUniformBuffersNames(e) {}
	getUniforms(e = 0) {
		return {};
	}
	copyTo(e) {
		D.Clone(() => e, this);
	}
	serialize() {
		return D.Serialize(this);
	}
	parse(e, t, n) {
		D.Parse(() => this, e, t, n);
	}
};
M([N()], Gn.prototype, "name", void 0), M([N()], Gn.prototype, "priority", void 0), M([N()], Gn.prototype, "resolveIncludes", void 0), M([N()], Gn.prototype, "registerForExtraEvents", void 0), C("BABYLON.MaterialPluginBase", Gn);
//#endregion
//#region node_modules/@babylonjs/core/Materials/material.detailMapConfiguration.js
var Kn = class extends In {
	constructor() {
		super(...arguments), this.DETAIL = !1, this.DETAILDIRECTUV = 0, this.DETAIL_NORMALBLENDMETHOD = 0;
	}
}, qn = class extends Gn {
	_markAllSubMeshesAsTexturesDirty() {
		this._enable(this._isEnabled), this._internalMarkAllSubMeshesAsTexturesDirty();
	}
	isCompatible() {
		return !0;
	}
	constructor(e, t = !0) {
		super(e, "DetailMap", 140, new Kn(), t), this._texture = null, this.diffuseBlendLevel = 1, this.roughnessBlendLevel = 1, this.bumpLevel = 1, this._normalBlendMethod = G.MATERIAL_NORMALBLENDMETHOD_WHITEOUT, this._isEnabled = !1, this.isEnabled = !1, this._internalMarkAllSubMeshesAsTexturesDirty = e._dirtyCallbacks[1];
	}
	isReadyForSubMesh(e, t, n) {
		return !this._isEnabled || !(e._areTexturesDirty && t.texturesEnabled && n.getCaps().standardDerivatives && this._texture && W.DetailTextureEnabled && !this._texture.isReady());
	}
	prepareDefines(e, t) {
		if (this._isEnabled) {
			e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
			let n = t.getEngine();
			e._areTexturesDirty && (n.getCaps().standardDerivatives && this._texture && W.DetailTextureEnabled && this._isEnabled ? (gt(this._texture, e, "DETAIL"), e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod) : e.DETAIL = !1);
		} else e.DETAIL = !1;
	}
	bindForSubMesh(e, t) {
		if (!this._isEnabled) return;
		let n = this._material.isFrozen;
		(!e.useUbo || !n || !e.isSync) && this._texture && W.DetailTextureEnabled && (e.updateFloat4("vDetailInfos", this._texture.coordinatesIndex, this.diffuseBlendLevel, this.bumpLevel, this.roughnessBlendLevel), _t(this._texture, e, "detail")), t.texturesEnabled && this._texture && W.DetailTextureEnabled && e.setTexture("detailSampler", this._texture);
	}
	hasTexture(e) {
		return this._texture === e;
	}
	getActiveTextures(e) {
		this._texture && e.push(this._texture);
	}
	getAnimatables(e) {
		this._texture && this._texture.animations && this._texture.animations.length > 0 && e.push(this._texture);
	}
	dispose(e) {
		e && this._texture?.dispose();
	}
	getClassName() {
		return "DetailMapConfiguration";
	}
	getSamplers(e) {
		e.push("detailSampler");
	}
	getUniforms() {
		return { ubo: [{
			name: "vDetailInfos",
			size: 4,
			type: "vec4"
		}, {
			name: "detailMatrix",
			size: 16,
			type: "mat4"
		}] };
	}
};
M([ue("detailTexture"), P("_markAllSubMeshesAsTexturesDirty")], qn.prototype, "texture", void 0), M([N()], qn.prototype, "diffuseBlendLevel", void 0), M([N()], qn.prototype, "roughnessBlendLevel", void 0), M([N()], qn.prototype, "bumpLevel", void 0), M([N(), P("_markAllSubMeshesAsTexturesDirty")], qn.prototype, "normalBlendMethod", void 0), M([N(), P("_markAllSubMeshesAsTexturesDirty")], qn.prototype, "isEnabled", void 0);
//#endregion
//#region node_modules/@babylonjs/core/Materials/materialHelper.geometryrendering.js
var Jn;
(function(e) {
	e[e.Zero = 0] = "Zero", e[e.One = 1] = "One", e[e.MaxViewZ = 2] = "MaxViewZ", e[e.NoClear = 3] = "NoClear";
})(Jn ||= {});
var Yn = class e {
	static CreateConfiguration(t) {
		return e._Configurations[t] = {
			defines: {},
			previousWorldMatrices: {},
			previousViewProjection: S.Zero(),
			currentViewProjection: S.Zero(),
			previousBones: {},
			lastUpdateFrameId: -1,
			excludedSkinnedMesh: [],
			reverseCulling: !1
		}, e._Configurations[t];
	}
	static DeleteConfiguration(t) {
		delete e._Configurations[t];
	}
	static GetConfiguration(t) {
		return e._Configurations[t];
	}
	static AddUniformsAndSamplers(e, t) {
		e.push("previousWorld", "previousViewProjection", "mPreviousBones");
	}
	static MarkAsDirty(e, t) {
		for (let n of t) if (n.subMeshes) for (let t of n.subMeshes) t._removeDrawWrapper(e);
	}
	static PrepareDefines(t, n, r) {
		if (!r._arePrePassDirty) return;
		let i = e._Configurations[t];
		if (!i) return;
		r.PREPASS = !0;
		let a = 0;
		for (let t = 0; t < e.GeometryTextureDescriptions.length; t++) {
			let n = e.GeometryTextureDescriptions[t], o = n.define, s = n.defineIndex, c = i.defines[s];
			c === void 0 ? (r[o] = !1, delete r[s]) : (r[o] = !0, r[s] = c, a++);
		}
		r.SCENE_MRT_COUNT = a, r.BONES_VELOCITY_ENABLED = n.useBones && n.computeBonesUsingShaders && n.skeleton && !n.skeleton.isUsingTextureForMatrices && i.excludedSkinnedMesh.indexOf(n) === -1;
	}
	static Bind(t, n, r, i, a) {
		let o = e._Configurations[t];
		if (!o) return;
		let s = r.getScene(), c = s.getEngine();
		if (o.reverseCulling && c.setStateCullFaceType(s._mirroredCameraPosition ? a.cullBackFaces : !a.cullBackFaces), (o.defines.PREPASS_VELOCITY_INDEX !== void 0 || o.defines.PREPASS_VELOCITY_LINEAR_INDEX !== void 0) && (o.previousWorldMatrices[r.uniqueId] || (o.previousWorldMatrices[r.uniqueId] = i.clone()), o.previousViewProjection || (o.previousViewProjection = s.getTransformMatrix().clone(), o.currentViewProjection = s.getTransformMatrix().clone()), o.currentViewProjection.updateFlag === s.getTransformMatrix().updateFlag ? o.lastUpdateFrameId !== c.frameId && (o.lastUpdateFrameId = c.frameId, o.previousViewProjection.copyFrom(o.currentViewProjection)) : (o.lastUpdateFrameId = c.frameId, o.previousViewProjection.copyFrom(o.currentViewProjection), o.currentViewProjection.copyFrom(s.getTransformMatrix())), n.setMatrix("previousWorld", o.previousWorldMatrices[r.uniqueId]), n.setMatrix("previousViewProjection", o.previousViewProjection), o.previousWorldMatrices[r.uniqueId] = i.clone(), r.useBones && r.computeBonesUsingShaders && r.skeleton)) {
			let e = r.skeleton;
			if (!e.isUsingTextureForMatrices || n.getUniformIndex("boneTextureWidth") === -1) {
				let t = e.getTransformMatrices(r);
				t && (o.previousBones[r.uniqueId] || (o.previousBones[r.uniqueId] = t.slice()), n.setMatrices("mPreviousBones", o.previousBones[r.uniqueId]), o.previousBones[r.uniqueId].set(t));
			}
		}
	}
};
Yn.GeometryTextureDescriptions = [
	{
		type: 0,
		name: "Irradiance",
		clearType: 0,
		define: "PREPASS_IRRADIANCE",
		defineIndex: "PREPASS_IRRADIANCE_INDEX"
	},
	{
		type: 1,
		name: "WorldPosition",
		clearType: 0,
		define: "PREPASS_POSITION",
		defineIndex: "PREPASS_POSITION_INDEX"
	},
	{
		type: 2,
		name: "Velocity",
		clearType: 0,
		define: "PREPASS_VELOCITY",
		defineIndex: "PREPASS_VELOCITY_INDEX"
	},
	{
		type: 3,
		name: "Reflectivity",
		clearType: 0,
		define: "PREPASS_REFLECTIVITY",
		defineIndex: "PREPASS_REFLECTIVITY_INDEX"
	},
	{
		type: 5,
		name: "ViewDepth",
		clearType: 2,
		define: "PREPASS_DEPTH",
		defineIndex: "PREPASS_DEPTH_INDEX"
	},
	{
		type: 6,
		name: "ViewNormal",
		clearType: 0,
		define: "PREPASS_NORMAL",
		defineIndex: "PREPASS_NORMAL_INDEX"
	},
	{
		type: 7,
		name: "AlbedoSqrt",
		clearType: 0,
		define: "PREPASS_ALBEDO_SQRT",
		defineIndex: "PREPASS_ALBEDO_SQRT_INDEX"
	},
	{
		type: 8,
		name: "WorldNormal",
		clearType: 0,
		define: "PREPASS_WORLD_NORMAL",
		defineIndex: "PREPASS_WORLD_NORMAL_INDEX"
	},
	{
		type: 9,
		name: "LocalPosition",
		clearType: 0,
		define: "PREPASS_LOCAL_POSITION",
		defineIndex: "PREPASS_LOCAL_POSITION_INDEX"
	},
	{
		type: 10,
		name: "ScreenDepth",
		clearType: 1,
		define: "PREPASS_SCREENSPACE_DEPTH",
		defineIndex: "PREPASS_SCREENSPACE_DEPTH_INDEX"
	},
	{
		type: 11,
		name: "LinearVelocity",
		clearType: 0,
		define: "PREPASS_VELOCITY_LINEAR",
		defineIndex: "PREPASS_VELOCITY_LINEAR_INDEX"
	},
	{
		type: 12,
		name: "Albedo",
		clearType: 0,
		define: "PREPASS_ALBEDO",
		defineIndex: "PREPASS_ALBEDO_INDEX"
	},
	{
		type: 13,
		name: "NormalizedViewDepth",
		clearType: 1,
		define: "PREPASS_NORMALIZED_VIEW_DEPTH",
		defineIndex: "PREPASS_NORMALIZED_VIEW_DEPTH_INDEX"
	},
	{
		type: 4,
		name: "Color",
		clearType: 3,
		define: "PREPASS_COLOR",
		defineIndex: "PREPASS_COLOR_INDEX"
	}
], Yn._Configurations = {};
//#endregion
//#region node_modules/@babylonjs/core/Materials/uv.defines.js
function Xn(e) {
	return class extends e {
		constructor() {
			super(...arguments), this.MAINUV1 = !1, this.MAINUV2 = !1, this.MAINUV3 = !1, this.MAINUV4 = !1, this.MAINUV5 = !1, this.MAINUV6 = !1, this.UV1 = !1, this.UV2 = !1, this.UV3 = !1, this.UV4 = !1, this.UV5 = !1, this.UV6 = !1;
		}
	};
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/imageProcessing.js
function Zn(e) {
	return class extends e {
		constructor(...e) {
			super(...e), le()(this, "_imageProcessingConfiguration");
		}
		get imageProcessingConfiguration() {
			return this._imageProcessingConfiguration;
		}
		set imageProcessingConfiguration(e) {
			this._attachImageProcessingConfiguration(e), this._markAllSubMeshesAsImageProcessingDirty && this._markAllSubMeshesAsImageProcessingDirty();
		}
		_attachImageProcessingConfiguration(e) {
			e !== this._imageProcessingConfiguration && (this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), !e && this.getScene ? this._imageProcessingConfiguration = this.getScene().imageProcessingConfiguration : e && (this._imageProcessingConfiguration = e), this._imageProcessingConfiguration && (this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(() => {
				this._markAllSubMeshesAsImageProcessingDirty && this._markAllSubMeshesAsImageProcessingDirty();
			})));
		}
		get cameraColorCurvesEnabled() {
			return this.imageProcessingConfiguration.colorCurvesEnabled;
		}
		set cameraColorCurvesEnabled(e) {
			this.imageProcessingConfiguration.colorCurvesEnabled = e;
		}
		get cameraColorGradingEnabled() {
			return this.imageProcessingConfiguration.colorGradingEnabled;
		}
		set cameraColorGradingEnabled(e) {
			this.imageProcessingConfiguration.colorGradingEnabled = e;
		}
		get cameraToneMappingEnabled() {
			return this._imageProcessingConfiguration.toneMappingEnabled;
		}
		set cameraToneMappingEnabled(e) {
			this._imageProcessingConfiguration.toneMappingEnabled = e;
		}
		get cameraExposure() {
			return this._imageProcessingConfiguration.exposure;
		}
		set cameraExposure(e) {
			this._imageProcessingConfiguration.exposure = e;
		}
		get cameraContrast() {
			return this._imageProcessingConfiguration.contrast;
		}
		set cameraContrast(e) {
			this._imageProcessingConfiguration.contrast = e;
		}
		get cameraColorGradingTexture() {
			return this._imageProcessingConfiguration.colorGradingTexture;
		}
		set cameraColorGradingTexture(e) {
			this._imageProcessingConfiguration.colorGradingTexture = e;
		}
		get cameraColorCurves() {
			return this._imageProcessingConfiguration.colorCurves;
		}
		set cameraColorCurves(e) {
			this._imageProcessingConfiguration.colorCurves = e;
		}
	};
}
//#endregion
//#region node_modules/@babylonjs/core/Materials/standardMaterial.js
var Qn = {
	effect: null,
	subMesh: null
}, $n = class extends Xn(In) {}, er = class extends Ln($n) {
	constructor(e) {
		super(e), this.DIFFUSE = !1, this.DIFFUSEDIRECTUV = 0, this.BAKED_VERTEX_ANIMATION_TEXTURE = !1, this.AMBIENT = !1, this.AMBIENTDIRECTUV = 0, this.OPACITY = !1, this.OPACITYDIRECTUV = 0, this.OPACITYRGB = !1, this.REFLECTION = !1, this.EMISSIVE = !1, this.EMISSIVEDIRECTUV = 0, this.SPECULAR = !1, this.SPECULARDIRECTUV = 0, this.BUMP = !1, this.BUMPDIRECTUV = 0, this.PARALLAX = !1, this.PARALLAX_RHS = !1, this.PARALLAXOCCLUSION = !1, this.SPECULAROVERALPHA = !1, this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.ALPHATEST = !1, this.DEPTHPREPASS = !1, this.ALPHAFROMDIFFUSE = !1, this.POINTSIZE = !1, this.FOG = !1, this.SPECULARTERM = !1, this.DIFFUSEFRESNEL = !1, this.OPACITYFRESNEL = !1, this.REFLECTIONFRESNEL = !1, this.REFRACTIONFRESNEL = !1, this.EMISSIVEFRESNEL = !1, this.FRESNEL = !1, this.NORMAL = !1, this.TANGENT = !1, this.VERTEXCOLOR = !1, this.VERTEXALPHA = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.BONETEXTURE = !1, this.BONES_VELOCITY_ENABLED = !1, this.INSTANCES = !1, this.THIN_INSTANCES = !1, this.INSTANCESCOLOR = !1, this.GLOSSINESS = !1, this.ROUGHNESS = !1, this.EMISSIVEASILLUMINATION = !1, this.LINKEMISSIVEWITHDIFFUSE = !1, this.REFLECTIONFRESNELFROMSPECULAR = !1, this.LIGHTMAP = !1, this.LIGHTMAPDIRECTUV = 0, this.OBJECTSPACE_NORMALMAP = !1, this.USELIGHTMAPASSHADOWMAP = !1, this.REFLECTIONMAP_3D = !1, this.REFLECTIONMAP_SPHERICAL = !1, this.REFLECTIONMAP_PLANAR = !1, this.REFLECTIONMAP_CUBIC = !1, this.USE_LOCAL_REFLECTIONMAP_CUBIC = !1, this.USE_LOCAL_REFRACTIONMAP_CUBIC = !1, this.REFLECTIONMAP_PROJECTION = !1, this.REFLECTIONMAP_SKYBOX = !1, this.REFLECTIONMAP_EXPLICIT = !1, this.REFLECTIONMAP_EQUIRECTANGULAR = !1, this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !1, this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !1, this.REFLECTIONMAP_OPPOSITEZ = !1, this.INVERTCUBICMAP = !1, this.LOGARITHMICDEPTH = !1, this.REFRACTION = !1, this.REFRACTIONMAP_3D = !1, this.REFLECTIONOVERALPHA = !1, this.TWOSIDEDLIGHTING = !1, this.SHADOWFLOAT = !1, this.MORPHTARGETS = !1, this.MORPHTARGETS_POSITION = !1, this.MORPHTARGETS_NORMAL = !1, this.MORPHTARGETS_TANGENT = !1, this.MORPHTARGETS_UV = !1, this.MORPHTARGETS_UV2 = !1, this.MORPHTARGETS_COLOR = !1, this.MORPHTARGETTEXTURE_HASPOSITIONS = !1, this.MORPHTARGETTEXTURE_HASNORMALS = !1, this.MORPHTARGETTEXTURE_HASTANGENTS = !1, this.MORPHTARGETTEXTURE_HASUVS = !1, this.MORPHTARGETTEXTURE_HASUV2S = !1, this.MORPHTARGETTEXTURE_HASCOLORS = !1, this.NUM_MORPH_INFLUENCERS = 0, this.MORPHTARGETS_TEXTURE = !1, this.NONUNIFORMSCALING = !1, this.PREMULTIPLYALPHA = !1, this.ALPHATEST_AFTERALLALPHACOMPUTATIONS = !1, this.ALPHABLEND = !0, this.PREPASS = !1, this.PREPASS_COLOR = !1, this.PREPASS_COLOR_INDEX = -1, this.PREPASS_IRRADIANCE = !1, this.PREPASS_IRRADIANCE_INDEX = -1, this.PREPASS_ALBEDO = !1, this.PREPASS_ALBEDO_INDEX = -1, this.PREPASS_ALBEDO_SQRT = !1, this.PREPASS_ALBEDO_SQRT_INDEX = -1, this.PREPASS_DEPTH = !1, this.PREPASS_DEPTH_INDEX = -1, this.PREPASS_SCREENSPACE_DEPTH = !1, this.PREPASS_SCREENSPACE_DEPTH_INDEX = -1, this.PREPASS_NORMALIZED_VIEW_DEPTH = !1, this.PREPASS_NORMALIZED_VIEW_DEPTH_INDEX = -1, this.PREPASS_NORMAL = !1, this.PREPASS_NORMAL_INDEX = -1, this.PREPASS_NORMAL_WORLDSPACE = !1, this.PREPASS_WORLD_NORMAL = !1, this.PREPASS_WORLD_NORMAL_INDEX = -1, this.PREPASS_POSITION = !1, this.PREPASS_POSITION_INDEX = -1, this.PREPASS_LOCAL_POSITION = !1, this.PREPASS_LOCAL_POSITION_INDEX = -1, this.PREPASS_VELOCITY = !1, this.PREPASS_VELOCITY_INDEX = -1, this.PREPASS_VELOCITY_LINEAR = !1, this.PREPASS_VELOCITY_LINEAR_INDEX = -1, this.PREPASS_REFLECTIVITY = !1, this.PREPASS_REFLECTIVITY_INDEX = -1, this.SCENE_MRT_COUNT = 0, this.RGBDLIGHTMAP = !1, this.RGBDREFLECTION = !1, this.RGBDREFRACTION = !1, this.MULTIVIEW = !1, this.ORDER_INDEPENDENT_TRANSPARENCY = !1, this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = !1, this.CAMERA_ORTHOGRAPHIC = !1, this.CAMERA_PERSPECTIVE = !1, this.AREALIGHTSUPPORTED = !0, this.USE_VERTEX_PULLING = !1, this.RIGHT_HANDED = !1, this.CLUSTLIGHT_SLICES = 0, this.CLUSTLIGHT_BATCH = 0, this.IS_REFLECTION_LINEAR = !1, this.IS_REFRACTION_LINEAR = !1, this.DECAL_AFTER_DETAIL = !1, this.rebuild();
	}
}, tr = class extends Zn(Rn) {}, $ = class e extends tr {
	get isPrePassCapable() {
		return !this.disableDepthWrite;
	}
	get canRenderToMRT() {
		return !0;
	}
	constructor(t, n, r = !1) {
		super(t, n, void 0, r || e.ForceGLSL), this._diffuseTexture = null, this._ambientTexture = null, this._opacityTexture = null, this._reflectionTexture = null, this._emissiveTexture = null, this._specularTexture = null, this._bumpTexture = null, this._lightmapTexture = null, this._refractionTexture = null, this.ambientColor = new E(0, 0, 0), this.diffuseColor = new E(1, 1, 1), this.specularColor = new E(1, 1, 1), this.emissiveColor = new E(0, 0, 0), this.specularPower = 64, this._useAlphaFromDiffuseTexture = !1, this._useEmissiveAsIllumination = !1, this._linkEmissiveWithDiffuse = !1, this._useSpecularOverAlpha = !1, this._useReflectionOverAlpha = !1, this._disableLighting = !1, this._useObjectSpaceNormalMap = !1, this._useParallax = !1, this._useParallaxOcclusion = !1, this.parallaxScaleBias = .05, this._roughness = 0, this.indexOfRefraction = .98, this.invertRefractionY = !0, this.alphaCutOff = .4, this._useLightmapAsShadowmap = !1, this._useReflectionFresnelFromSpecular = !1, this._useGlossinessFromSpecularMapAlpha = !1, this._maxSimultaneousLights = 4, this._invertNormalMapX = !1, this._invertNormalMapY = !1, this._twoSidedLighting = !1, this._applyDecalMapAfterDetailMap = !1, this._shadersLoaded = !1, this._renderTargets = new l(16), this._globalAmbientColor = new E(0, 0, 0), this._cacheHasRenderTargetTextures = !1, this.detailMap = new qn(this), this._attachImageProcessingConfiguration(null), this.prePassConfiguration = new Fn(), this.getRenderTargetTextures = () => (this._renderTargets.reset(), e.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget && this._renderTargets.push(this._reflectionTexture), e.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget && this._renderTargets.push(this._refractionTexture), this._eventInfo.renderTargets = this._renderTargets, this._callbackPluginEventFillRenderTargetTextures(this._eventInfo), this._renderTargets);
	}
	get hasRenderTargetTextures() {
		return e.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget || e.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget ? !0 : this._cacheHasRenderTargetTextures;
	}
	getClassName() {
		return "StandardMaterial";
	}
	needAlphaBlending() {
		return this._hasTransparencyMode ? this._transparencyModeIsBlend : this._disableAlphaBlending ? !1 : this.alpha < 1 || this._opacityTexture != null || this._shouldUseAlphaFromDiffuseTexture() || this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled;
	}
	needAlphaTesting() {
		return this._hasTransparencyMode ? this._transparencyModeIsTest : this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === G.MATERIAL_ALPHATEST);
	}
	_shouldUseAlphaFromDiffuseTexture() {
		return this._diffuseTexture != null && this._diffuseTexture.hasAlpha && this._useAlphaFromDiffuseTexture && this._transparencyMode !== G.MATERIAL_OPAQUE;
	}
	_hasAlphaChannel() {
		return this._diffuseTexture != null && this._diffuseTexture.hasAlpha || this._opacityTexture != null;
	}
	getAlphaTestTexture() {
		return this._diffuseTexture;
	}
	isReadyForSubMesh(t, n, r = !1) {
		this._uniformBufferLayoutBuilt || this.buildUniformLayout();
		let i = n._drawWrapper;
		if (i.effect && this.isFrozen && i._wasPreviouslyReady && i._wasPreviouslyUsingInstances === r) return !0;
		n.materialDefines ||= (this._callbackPluginEventGeneric(4, this._eventInfo), new er(this._eventInfo.defineNames));
		let a = this.getScene(), o = n.materialDefines;
		if (this._isReadyForSubMesh(n)) return !0;
		let s = a.getEngine();
		o._needNormals = Ot(a, t, o, !0, this._maxSimultaneousLights, this._disableLighting), It(a, o);
		let c = this.needAlphaBlendingForMesh(t) && this.getScene().useOrderIndependentTransparency;
		if (Rt(a, o, this.canRenderToMRT && !c), Lt(a, o, c), Yn.PrepareDefines(s.currentRenderPassId, t, o), o._areTexturesDirty) {
			this._eventInfo.hasRenderTargetTextures = !1, this._callbackPluginEventHasRenderTargetTextures(this._eventInfo), this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures, o._needUVs = !1;
			for (let e = 1; e <= 6; ++e) o["MAINUV" + e] = !1;
			if (a.texturesEnabled) {
				if (o.DIFFUSEDIRECTUV = 0, o.BUMPDIRECTUV = 0, o.AMBIENTDIRECTUV = 0, o.OPACITYDIRECTUV = 0, o.EMISSIVEDIRECTUV = 0, o.SPECULARDIRECTUV = 0, o.LIGHTMAPDIRECTUV = 0, this._diffuseTexture && e.DiffuseTextureEnabled) {
					if (this._diffuseTexture.isReadyOrNotBlocking()) gt(this._diffuseTexture, o, "DIFFUSE");
					else return !1;
				} else o.DIFFUSE = !1;
				if (this._ambientTexture && e.AmbientTextureEnabled) {
					if (this._ambientTexture.isReadyOrNotBlocking()) gt(this._ambientTexture, o, "AMBIENT");
					else return !1;
				} else o.AMBIENT = !1;
				if (this._opacityTexture && e.OpacityTextureEnabled) {
					if (this._opacityTexture.isReadyOrNotBlocking()) gt(this._opacityTexture, o, "OPACITY"), o.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
					else return !1;
				} else o.OPACITY = !1;
				if (this._reflectionTexture && e.ReflectionTextureEnabled ? (o.ROUGHNESS = this._roughness > 0, o.REFLECTIONOVERALPHA = this._useReflectionOverAlpha) : (o.ROUGHNESS = !1, o.REFLECTIONOVERALPHA = !1), !kt(a, this._reflectionTexture, o)) return !1;
				if (this._emissiveTexture && e.EmissiveTextureEnabled) {
					if (this._emissiveTexture.isReadyOrNotBlocking()) gt(this._emissiveTexture, o, "EMISSIVE");
					else return !1;
				} else o.EMISSIVE = !1;
				if (this._lightmapTexture && e.LightmapTextureEnabled) {
					if (this._lightmapTexture.isReadyOrNotBlocking()) gt(this._lightmapTexture, o, "LIGHTMAP"), o.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap, o.RGBDLIGHTMAP = this._lightmapTexture.isRGBD;
					else return !1;
				} else o.LIGHTMAP = !1;
				if (this._specularTexture && e.SpecularTextureEnabled) {
					if (this._specularTexture.isReadyOrNotBlocking()) gt(this._specularTexture, o, "SPECULAR"), o.GLOSSINESS = this._useGlossinessFromSpecularMapAlpha;
					else return !1;
				} else o.SPECULAR = !1;
				if (a.getEngine().getCaps().standardDerivatives && this._bumpTexture && e.BumpTextureEnabled) {
					if (this._bumpTexture.isReady()) gt(this._bumpTexture, o, "BUMP"), o.PARALLAX = this._useParallax, o.PARALLAX_RHS = a.useRightHandedSystem, o.PARALLAXOCCLUSION = this._useParallaxOcclusion;
					else return !1;
					o.OBJECTSPACE_NORMALMAP = this._useObjectSpaceNormalMap;
				} else o.BUMP = !1, o.PARALLAX = !1, o.PARALLAX_RHS = !1, o.PARALLAXOCCLUSION = !1;
				if (this._refractionTexture && e.RefractionTextureEnabled) {
					if (this._refractionTexture.isReadyOrNotBlocking()) o._needUVs = !0, o.REFRACTION = !0, o.REFRACTIONMAP_3D = this._refractionTexture.isCube, o.RGBDREFRACTION = this._refractionTexture.isRGBD, o.USE_LOCAL_REFRACTIONMAP_CUBIC = !!this._refractionTexture.boundingBoxSize;
					else return !1;
				} else o.REFRACTION = !1;
				o.TWOSIDEDLIGHTING = !this._backFaceCulling && this._twoSidedLighting;
			} else o.DIFFUSE = !1, o.AMBIENT = !1, o.OPACITY = !1, o.REFLECTION = !1, o.EMISSIVE = !1, o.LIGHTMAP = !1, o.BUMP = !1, o.REFRACTION = !1;
			o.ALPHAFROMDIFFUSE = this._shouldUseAlphaFromDiffuseTexture(), o.EMISSIVEASILLUMINATION = this._useEmissiveAsIllumination, o.LINKEMISSIVEWITHDIFFUSE = this._linkEmissiveWithDiffuse, o.SPECULAROVERALPHA = this._useSpecularOverAlpha, o.PREMULTIPLYALPHA = this.alphaMode === 7 || this.alphaMode === 8, o.ALPHATEST_AFTERALLALPHACOMPUTATIONS = this.transparencyMode !== null, o.ALPHABLEND = this.transparencyMode === null || this.needAlphaBlendingForMesh(t);
		}
		if (this._eventInfo.isReadyForSubMesh = !0, this._eventInfo.defines = o, this._eventInfo.subMesh = n, this._callbackPluginEventIsReadyForSubMesh(this._eventInfo), !this._eventInfo.isReadyForSubMesh) return !1;
		if (o._areImageProcessingDirty && this._imageProcessingConfiguration) {
			if (!this._imageProcessingConfiguration.isReady()) return !1;
			this._imageProcessingConfiguration.prepareDefines(o), o.IS_REFLECTION_LINEAR = this.reflectionTexture != null && !this.reflectionTexture.gammaSpace, o.IS_REFRACTION_LINEAR = this.refractionTexture != null && !this.refractionTexture.gammaSpace;
		}
		if (o._areFresnelDirty && (e.FresnelEnabled ? (this._diffuseFresnelParameters || this._opacityFresnelParameters || this._emissiveFresnelParameters || this._refractionFresnelParameters || this._reflectionFresnelParameters) && (o.DIFFUSEFRESNEL = this._diffuseFresnelParameters && this._diffuseFresnelParameters.isEnabled, o.OPACITYFRESNEL = this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled, o.REFLECTIONFRESNEL = this._reflectionFresnelParameters && this._reflectionFresnelParameters.isEnabled, o.REFLECTIONFRESNELFROMSPECULAR = this._useReflectionFresnelFromSpecular, o.REFRACTIONFRESNEL = this._refractionFresnelParameters && this._refractionFresnelParameters.isEnabled, o.EMISSIVEFRESNEL = this._emissiveFresnelParameters && this._emissiveFresnelParameters.isEnabled, o._needNormals = !0, o.FRESNEL = !0) : o.FRESNEL = !1), o.AREALIGHTUSED || o.CLUSTLIGHT_BATCH) {
			for (let e = 0; e < t.lightSources.length; e++) if (!t.lightSources[e]._isReady()) return !1;
		}
		Dt(t, a, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this.needAlphaTestingForMesh(t), o, this._applyDecalMapAfterDetailMap, this._useVertexPulling, n.getRenderingMesh(), this._isVertexOutputInvariant), jt(a, s, this, o, r, null, n.getRenderingMesh().hasThinInstances), this._eventInfo.defines = o, this._eventInfo.mesh = t, this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo), Ft(t, o, !0, !0, !0), this._callbackPluginEventPrepareDefines(this._eventInfo);
		let l = !1;
		if (o.isDirty) {
			let e = o._areLightsDisposed;
			o.markAsProcessed();
			let r = new zn();
			o.REFLECTION && r.addFallback(0, "REFLECTION"), o.SPECULAR && r.addFallback(0, "SPECULAR"), o.BUMP && r.addFallback(0, "BUMP"), o.PARALLAX && r.addFallback(1, "PARALLAX"), o.PARALLAX_RHS && r.addFallback(1, "PARALLAX_RHS"), o.PARALLAXOCCLUSION && r.addFallback(0, "PARALLAXOCCLUSION"), o.SPECULAROVERALPHA && r.addFallback(0, "SPECULAROVERALPHA"), o.FOG && r.addFallback(1, "FOG"), o.POINTSIZE && r.addFallback(0, "POINTSIZE"), o.LOGARITHMICDEPTH && r.addFallback(0, "LOGARITHMICDEPTH"), Tt(o, r, this._maxSimultaneousLights), o.SPECULARTERM && r.addFallback(0, "SPECULARTERM"), o.DIFFUSEFRESNEL && r.addFallback(1, "DIFFUSEFRESNEL"), o.OPACITYFRESNEL && r.addFallback(2, "OPACITYFRESNEL"), o.REFLECTIONFRESNEL && r.addFallback(3, "REFLECTIONFRESNEL"), o.EMISSIVEFRESNEL && r.addFallback(4, "EMISSIVEFRESNEL"), o.FRESNEL && r.addFallback(4, "FRESNEL"), o.MULTIVIEW && r.addFallback(0, "MULTIVIEW");
			let i = [j.PositionKind];
			o.NORMAL && i.push(j.NormalKind), o.TANGENT && i.push(j.TangentKind);
			for (let e = 1; e <= 6; ++e) o["UV" + e] && i.push(`uv${e === 1 ? "" : e}`);
			o.VERTEXCOLOR && i.push(j.ColorKind), Ct(i, t, o, r), wt(i, o), dt(i, t, o), vt(i, t, o);
			let c = "default", u = /* @__PURE__ */ "world.view.viewProjection.vEyePosition.vLightsType.vAmbientColor.vDiffuseColor.vSpecularColor.vEmissiveColor.visibility.vFogInfos.vFogColor.pointSize.vDiffuseInfos.vAmbientInfos.vOpacityInfos.vEmissiveInfos.vSpecularInfos.vBumpInfos.vLightmapInfos.vRefractionInfos.mBones.diffuseMatrix.ambientMatrix.opacityMatrix.emissiveMatrix.specularMatrix.bumpMatrix.normalMatrix.lightmapMatrix.refractionMatrix.diffuseLeftColor.diffuseRightColor.opacityParts.reflectionLeftColor.reflectionRightColor.emissiveLeftColor.emissiveRightColor.refractionLeftColor.refractionRightColor.vRefractionPosition.vRefractionSize.logarithmicDepthConstant.vTangentSpaceParams.alphaCutOff.boneTextureWidth.morphTargetTextureInfo.morphTargetTextureIndices.cameraInfo".split("."), d = [
				"diffuseSampler",
				"ambientSampler",
				"opacitySampler",
				"reflectionCubeSampler",
				"reflection2DSampler",
				"emissiveSampler",
				"specularSampler",
				"bumpSampler",
				"lightmapSampler",
				"refractionCubeSampler",
				"refraction2DSampler",
				"boneSampler",
				"morphTargets",
				"oitDepthSampler",
				"oitFrontColorSampler",
				"areaLightsLTC1Sampler",
				"areaLightsLTC2Sampler"
			];
			Vt(u, d, !1);
			let f = [
				"Material",
				"Scene",
				"Mesh"
			], p = {
				maxSimultaneousLights: this._maxSimultaneousLights,
				maxSimultaneousMorphTargets: o.NUM_MORPH_INFLUENCERS
			};
			this._eventInfo.fallbacks = r, this._eventInfo.fallbackRank = 0, this._eventInfo.defines = o, this._eventInfo.uniforms = u, this._eventInfo.attributes = i, this._eventInfo.samplers = d, this._eventInfo.uniformBuffersNames = f, this._eventInfo.customCode = void 0, this._eventInfo.mesh = t, this._eventInfo.indexParameters = p, this._callbackPluginEventGeneric(128, this._eventInfo), Yn.AddUniformsAndSamplers(u, d), Fn.AddUniforms(u), Fn.AddSamplers(d), Ee && (Ee.PrepareUniforms(u, o), Ee.PrepareSamplers(d, o)), Ht({
				uniformsNames: u,
				uniformBuffersNames: f,
				samplers: d,
				defines: o,
				maxSimultaneousLights: this._maxSimultaneousLights
			}), it(u);
			let m = {};
			this.customShaderNameResolve && (c = this.customShaderNameResolve(c, u, f, d, o, i, m));
			let h = o.toString(), g = n.effect, _ = a.getEngine().createEffect(c, {
				attributes: i,
				uniformsNames: u,
				uniformBuffersNames: f,
				samplers: d,
				defines: h,
				fallbacks: r,
				onCompiled: this.onCompiled,
				onError: this.onError,
				indexParameters: p,
				processFinalCode: m.processFinalCode,
				processCodeAfterIncludes: this._eventInfo.customCode,
				multiTarget: o.PREPASS,
				shaderLanguage: this._shaderLanguage,
				extraInitializationsAsync: this._shadersLoaded ? void 0 : async () => {
					this._shaderLanguage === 1 ? await Promise.all([import("./default.vertex-D7BfzJTV.js"), import("./default.fragment-_Mc83NRX.js")]) : await Promise.all([import("./default.vertex-pLpVRFSo.js"), import("./default.fragment-B8flr6-H.js")]), this._shadersLoaded = !0;
				}
			}, s);
			if (this._eventInfo.customCode = void 0, _) {
				if (this._onEffectCreatedObservable && (Qn.effect = _, Qn.subMesh = n, this._onEffectCreatedObservable.notifyObservers(Qn)), this.allowShaderHotSwapping && g && !_.isReady()) {
					if (o.markAsUnprocessed(), l = this.isFrozen, e) return o._areLightsDisposed = !0, !1;
				} else a.resetCachedMaterial(), n.setEffect(_, o, this._materialContext);
			}
		}
		return !n.effect || !n.effect.isReady() ? !1 : (o._renderId = a.getRenderId(), i._wasPreviouslyReady = !l, i._wasPreviouslyUsingInstances = r, this._checkScenePerformancePriority(), !0);
	}
	buildUniformLayout() {
		let e = this._uniformBuffer;
		e.addUniform("diffuseLeftColor", 4), e.addUniform("diffuseRightColor", 4), e.addUniform("opacityParts", 4), e.addUniform("reflectionLeftColor", 4), e.addUniform("reflectionRightColor", 4), e.addUniform("refractionLeftColor", 4), e.addUniform("refractionRightColor", 4), e.addUniform("emissiveLeftColor", 4), e.addUniform("emissiveRightColor", 4), e.addUniform("vDiffuseInfos", 2), e.addUniform("vAmbientInfos", 2), e.addUniform("vOpacityInfos", 2), e.addUniform("vEmissiveInfos", 2), e.addUniform("vLightmapInfos", 2), e.addUniform("vSpecularInfos", 2), e.addUniform("vBumpInfos", 3), e.addUniform("diffuseMatrix", 16), e.addUniform("ambientMatrix", 16), e.addUniform("opacityMatrix", 16), e.addUniform("emissiveMatrix", 16), e.addUniform("lightmapMatrix", 16), e.addUniform("specularMatrix", 16), e.addUniform("bumpMatrix", 16), e.addUniform("vTangentSpaceParams", 2), e.addUniform("pointSize", 1), e.addUniform("alphaCutOff", 1), e.addUniform("refractionMatrix", 16), e.addUniform("vRefractionInfos", 4), e.addUniform("vRefractionPosition", 3), e.addUniform("vRefractionSize", 3), e.addUniform("vSpecularColor", 4), e.addUniform("vEmissiveColor", 3), e.addUniform("vDiffuseColor", 4), e.addUniform("vAmbientColor", 3), e.addUniform("cameraInfo", 4), Ut(e, !1, !0), super.buildUniformLayout();
	}
	bindForSubMesh(t, n, r) {
		let i = this.getScene(), a = r.materialDefines;
		if (!a) return;
		let o = r.effect;
		if (!o) return;
		this._activeEffect = o, n.getMeshUniformBuffer().bindToEffect(o, "Mesh"), n.transferToEffect(t), this._uniformBuffer.bindToEffect(o, "Material"), this.prePassConfiguration.bindForSubMesh(this._activeEffect, i, n, t, this.isFrozen), Yn.Bind(i.getEngine().currentRenderPassId, this._activeEffect, n, t, this);
		let s = i.activeCamera;
		s ? this._uniformBuffer.updateFloat4("cameraInfo", s.minZ, s.maxZ, 0, 0) : this._uniformBuffer.updateFloat4("cameraInfo", 0, 0, 0, 0), this._eventInfo.subMesh = r, this._callbackPluginEventHardBindForSubMesh(this._eventInfo), a.OBJECTSPACE_NORMALMAP && (t.toNormalMatrix(this._normalMatrix), this.bindOnlyNormalMatrix(this._normalMatrix));
		let c = this._mustRebind(i, o, r, n.visibility);
		bt(n, o);
		let l = this._uniformBuffer;
		if (c) {
			if (this.bindViewProjection(o), !l.useUbo || !this.isFrozen || !l.isSync || r._drawWrapper._forceRebindOnNextCall) {
				if (e.FresnelEnabled && a.FRESNEL && (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled && (l.updateColor4("diffuseLeftColor", this.diffuseFresnelParameters.leftColor, this.diffuseFresnelParameters.power), l.updateColor4("diffuseRightColor", this.diffuseFresnelParameters.rightColor, this.diffuseFresnelParameters.bias)), this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled && l.updateColor4("opacityParts", new E(this.opacityFresnelParameters.leftColor.toLuminance(), this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power), this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled && (l.updateColor4("reflectionLeftColor", this.reflectionFresnelParameters.leftColor, this.reflectionFresnelParameters.power), l.updateColor4("reflectionRightColor", this.reflectionFresnelParameters.rightColor, this.reflectionFresnelParameters.bias)), this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled && (l.updateColor4("refractionLeftColor", this.refractionFresnelParameters.leftColor, this.refractionFresnelParameters.power), l.updateColor4("refractionRightColor", this.refractionFresnelParameters.rightColor, this.refractionFresnelParameters.bias)), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled && (l.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power), l.updateColor4("emissiveRightColor", this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias))), i.texturesEnabled && (this._diffuseTexture && e.DiffuseTextureEnabled && (l.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level), _t(this._diffuseTexture, l, "diffuse")), this._ambientTexture && e.AmbientTextureEnabled && (l.updateFloat2("vAmbientInfos", this._ambientTexture.coordinatesIndex, this._ambientTexture.level), _t(this._ambientTexture, l, "ambient")), this._opacityTexture && e.OpacityTextureEnabled && (l.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level), _t(this._opacityTexture, l, "opacity")), this._hasAlphaChannel() && l.updateFloat("alphaCutOff", this.alphaCutOff), ht(i, a, l, E.White(), this._reflectionTexture, !1, !1, !0, !1, !1, !1, this.roughness), (!this._reflectionTexture || !e.ReflectionTextureEnabled) && l.updateFloat2("vReflectionInfos", 0, this.roughness), this._emissiveTexture && e.EmissiveTextureEnabled && (l.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level), _t(this._emissiveTexture, l, "emissive")), this._lightmapTexture && e.LightmapTextureEnabled && (l.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level), _t(this._lightmapTexture, l, "lightmap")), this._specularTexture && e.SpecularTextureEnabled && (l.updateFloat2("vSpecularInfos", this._specularTexture.coordinatesIndex, this._specularTexture.level), _t(this._specularTexture, l, "specular")), this._bumpTexture && i.getEngine().getCaps().standardDerivatives && e.BumpTextureEnabled && (l.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, 1 / this._bumpTexture.level, this.parallaxScaleBias), _t(this._bumpTexture, l, "bump"), i._mirroredCameraPosition ? l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? 1 : -1, this._invertNormalMapY ? 1 : -1) : l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? -1 : 1, this._invertNormalMapY ? -1 : 1)), this._refractionTexture && e.RefractionTextureEnabled)) {
					let e = 1;
					if (this._refractionTexture.isCube || (l.updateMatrix("refractionMatrix", this._refractionTexture.getReflectionTextureMatrix()), this._refractionTexture.depth && (e = this._refractionTexture.depth)), l.updateFloat4("vRefractionInfos", this._refractionTexture.level, this.indexOfRefraction, e, this.invertRefractionY ? -1 : 1), this._refractionTexture.boundingBoxSize) {
						let e = this._refractionTexture;
						l.updateVector3("vRefractionPosition", e.boundingBoxPosition), l.updateVector3("vRefractionSize", e.boundingBoxSize);
					}
				}
				this.pointsCloud && l.updateFloat("pointSize", this.pointSize), l.updateColor4("vSpecularColor", this.specularColor, this.specularPower), l.updateColor3("vEmissiveColor", e.EmissiveTextureEnabled ? this.emissiveColor : E.BlackReadOnly), l.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha), i.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor), l.updateColor3("vAmbientColor", this._globalAmbientColor);
			}
			i.texturesEnabled && (this._diffuseTexture && e.DiffuseTextureEnabled && o.setTexture("diffuseSampler", this._diffuseTexture), this._ambientTexture && e.AmbientTextureEnabled && o.setTexture("ambientSampler", this._ambientTexture), this._opacityTexture && e.OpacityTextureEnabled && o.setTexture("opacitySampler", this._opacityTexture), this._reflectionTexture && e.ReflectionTextureEnabled && (this._reflectionTexture.isCube ? o.setTexture("reflectionCubeSampler", this._reflectionTexture) : o.setTexture("reflection2DSampler", this._reflectionTexture)), this._emissiveTexture && e.EmissiveTextureEnabled && o.setTexture("emissiveSampler", this._emissiveTexture), this._lightmapTexture && e.LightmapTextureEnabled && o.setTexture("lightmapSampler", this._lightmapTexture), this._specularTexture && e.SpecularTextureEnabled && o.setTexture("specularSampler", this._specularTexture), this._bumpTexture && i.getEngine().getCaps().standardDerivatives && e.BumpTextureEnabled && o.setTexture("bumpSampler", this._bumpTexture), this._refractionTexture && e.RefractionTextureEnabled && (this._refractionTexture.isCube ? o.setTexture("refractionCubeSampler", this._refractionTexture) : o.setTexture("refraction2DSampler", this._refractionTexture))), this.getScene().useOrderIndependentTransparency && this.needAlphaBlendingForMesh(n) && this.getScene().depthPeelingRenderer.bind(o), this._eventInfo.subMesh = r, this._callbackPluginEventBindForSubMesh(this._eventInfo), ot(o, this, i), this.bindEyePosition(o);
		} else i.getEngine()._features.needToAlwaysBindUniformBuffers && (this._needToBindSceneUbo = !0);
		(c || !this.isFrozen) && (i.lightsEnabled && !this._disableLighting && St(i, n, o, a, this._maxSimultaneousLights), (i.fogEnabled && n.applyFog && i.fogMode !== je.FOGMODE_NONE || this._reflectionTexture || this._refractionTexture || n.receiveShadows || a.PREPASS || a.CLUSTLIGHT_BATCH) && this.bindView(o), ut(i, n, o), a.NUM_MORPH_INFLUENCERS && pt(n, o), a.BAKED_VERTEX_ANIMATION_TEXTURE && n.bakedVertexAnimationManager?.bind(o, a.INSTANCES), this.useLogarithmicDepth && ct(a, o, i), this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess && this._imageProcessingConfiguration.bind(this._activeEffect)), this._afterBind(n, this._activeEffect, r), l.update();
	}
	getAnimatables() {
		let e = super.getAnimatables();
		return this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0 && e.push(this._diffuseTexture), this._ambientTexture && this._ambientTexture.animations && this._ambientTexture.animations.length > 0 && e.push(this._ambientTexture), this._opacityTexture && this._opacityTexture.animations && this._opacityTexture.animations.length > 0 && e.push(this._opacityTexture), this._reflectionTexture && this._reflectionTexture.animations && this._reflectionTexture.animations.length > 0 && e.push(this._reflectionTexture), this._emissiveTexture && this._emissiveTexture.animations && this._emissiveTexture.animations.length > 0 && e.push(this._emissiveTexture), this._specularTexture && this._specularTexture.animations && this._specularTexture.animations.length > 0 && e.push(this._specularTexture), this._bumpTexture && this._bumpTexture.animations && this._bumpTexture.animations.length > 0 && e.push(this._bumpTexture), this._lightmapTexture && this._lightmapTexture.animations && this._lightmapTexture.animations.length > 0 && e.push(this._lightmapTexture), this._refractionTexture && this._refractionTexture.animations && this._refractionTexture.animations.length > 0 && e.push(this._refractionTexture), e;
	}
	getActiveTextures() {
		let e = super.getActiveTextures();
		return this._diffuseTexture && e.push(this._diffuseTexture), this._ambientTexture && e.push(this._ambientTexture), this._opacityTexture && e.push(this._opacityTexture), this._reflectionTexture && e.push(this._reflectionTexture), this._emissiveTexture && e.push(this._emissiveTexture), this._specularTexture && e.push(this._specularTexture), this._bumpTexture && e.push(this._bumpTexture), this._lightmapTexture && e.push(this._lightmapTexture), this._refractionTexture && e.push(this._refractionTexture), e;
	}
	hasTexture(e) {
		return !!(super.hasTexture(e) || this._diffuseTexture === e || this._ambientTexture === e || this._opacityTexture === e || this._reflectionTexture === e || this._emissiveTexture === e || this._specularTexture === e || this._bumpTexture === e || this._lightmapTexture === e || this._refractionTexture === e);
	}
	dispose(e, t) {
		t && (this._diffuseTexture?.dispose(), this._ambientTexture?.dispose(), this._opacityTexture?.dispose(), this._reflectionTexture?.dispose(), this._emissiveTexture?.dispose(), this._specularTexture?.dispose(), this._bumpTexture?.dispose(), this._lightmapTexture?.dispose(), this._refractionTexture?.dispose()), this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), super.dispose(e, t);
	}
	clone(t, n = !0, r = "") {
		let i = D.Clone(() => new e(t, this.getScene()), this, { cloneTexturesOnlyOnce: n });
		return i.name = t, i.id = t, this.stencil.copyTo(i.stencil), this._clonePlugins(i, r), i;
	}
	static Parse(t, n, r) {
		let i = D.Parse(() => new e(t.name, n), t, n, r);
		return t.stencil && i.stencil.parse(t.stencil, n, r), G._ParsePlugins(t, i, n, r), i;
	}
	static get DiffuseTextureEnabled() {
		return W.DiffuseTextureEnabled;
	}
	static set DiffuseTextureEnabled(e) {
		W.DiffuseTextureEnabled = e;
	}
	static get DetailTextureEnabled() {
		return W.DetailTextureEnabled;
	}
	static set DetailTextureEnabled(e) {
		W.DetailTextureEnabled = e;
	}
	static get AmbientTextureEnabled() {
		return W.AmbientTextureEnabled;
	}
	static set AmbientTextureEnabled(e) {
		W.AmbientTextureEnabled = e;
	}
	static get OpacityTextureEnabled() {
		return W.OpacityTextureEnabled;
	}
	static set OpacityTextureEnabled(e) {
		W.OpacityTextureEnabled = e;
	}
	static get ReflectionTextureEnabled() {
		return W.ReflectionTextureEnabled;
	}
	static set ReflectionTextureEnabled(e) {
		W.ReflectionTextureEnabled = e;
	}
	static get EmissiveTextureEnabled() {
		return W.EmissiveTextureEnabled;
	}
	static set EmissiveTextureEnabled(e) {
		W.EmissiveTextureEnabled = e;
	}
	static get SpecularTextureEnabled() {
		return W.SpecularTextureEnabled;
	}
	static set SpecularTextureEnabled(e) {
		W.SpecularTextureEnabled = e;
	}
	static get BumpTextureEnabled() {
		return W.BumpTextureEnabled;
	}
	static set BumpTextureEnabled(e) {
		W.BumpTextureEnabled = e;
	}
	static get LightmapTextureEnabled() {
		return W.LightmapTextureEnabled;
	}
	static set LightmapTextureEnabled(e) {
		W.LightmapTextureEnabled = e;
	}
	static get RefractionTextureEnabled() {
		return W.RefractionTextureEnabled;
	}
	static set RefractionTextureEnabled(e) {
		W.RefractionTextureEnabled = e;
	}
	static get ColorGradingTextureEnabled() {
		return W.ColorGradingTextureEnabled;
	}
	static set ColorGradingTextureEnabled(e) {
		W.ColorGradingTextureEnabled = e;
	}
	static get FresnelEnabled() {
		return W.FresnelEnabled;
	}
	static set FresnelEnabled(e) {
		W.FresnelEnabled = e;
	}
};
$.ForceGLSL = !1, M([ue("diffuseTexture")], $.prototype, "_diffuseTexture", void 0), M([P("_markAllSubMeshesAsTexturesAndMiscDirty")], $.prototype, "diffuseTexture", void 0), M([ue("ambientTexture")], $.prototype, "_ambientTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "ambientTexture", void 0), M([ue("opacityTexture")], $.prototype, "_opacityTexture", void 0), M([P("_markAllSubMeshesAsTexturesAndMiscDirty")], $.prototype, "opacityTexture", void 0), M([ue("reflectionTexture")], $.prototype, "_reflectionTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "reflectionTexture", void 0), M([ue("emissiveTexture")], $.prototype, "_emissiveTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "emissiveTexture", void 0), M([ue("specularTexture")], $.prototype, "_specularTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "specularTexture", void 0), M([ue("bumpTexture")], $.prototype, "_bumpTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "bumpTexture", void 0), M([ue("lightmapTexture")], $.prototype, "_lightmapTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "lightmapTexture", void 0), M([ue("refractionTexture")], $.prototype, "_refractionTexture", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "refractionTexture", void 0), M([fe("ambient")], $.prototype, "ambientColor", void 0), M([fe("diffuse")], $.prototype, "diffuseColor", void 0), M([fe("specular")], $.prototype, "specularColor", void 0), M([fe("emissive")], $.prototype, "emissiveColor", void 0), M([N()], $.prototype, "specularPower", void 0), M([N("useAlphaFromDiffuseTexture")], $.prototype, "_useAlphaFromDiffuseTexture", void 0), M([P("_markAllSubMeshesAsTexturesAndMiscDirty")], $.prototype, "useAlphaFromDiffuseTexture", void 0), M([N("useEmissiveAsIllumination")], $.prototype, "_useEmissiveAsIllumination", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useEmissiveAsIllumination", void 0), M([N("linkEmissiveWithDiffuse")], $.prototype, "_linkEmissiveWithDiffuse", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "linkEmissiveWithDiffuse", void 0), M([N("useSpecularOverAlpha")], $.prototype, "_useSpecularOverAlpha", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useSpecularOverAlpha", void 0), M([N("useReflectionOverAlpha")], $.prototype, "_useReflectionOverAlpha", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useReflectionOverAlpha", void 0), M([N("disableLighting")], $.prototype, "_disableLighting", void 0), M([P("_markAllSubMeshesAsLightsDirty")], $.prototype, "disableLighting", void 0), M([N("useObjectSpaceNormalMap")], $.prototype, "_useObjectSpaceNormalMap", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useObjectSpaceNormalMap", void 0), M([N("useParallax")], $.prototype, "_useParallax", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useParallax", void 0), M([N("useParallaxOcclusion")], $.prototype, "_useParallaxOcclusion", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useParallaxOcclusion", void 0), M([N()], $.prototype, "parallaxScaleBias", void 0), M([N("roughness")], $.prototype, "_roughness", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "roughness", void 0), M([N()], $.prototype, "indexOfRefraction", void 0), M([N()], $.prototype, "invertRefractionY", void 0), M([N()], $.prototype, "alphaCutOff", void 0), M([N("useLightmapAsShadowmap")], $.prototype, "_useLightmapAsShadowmap", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useLightmapAsShadowmap", void 0), M([ge("diffuseFresnelParameters")], $.prototype, "_diffuseFresnelParameters", void 0), M([P("_markAllSubMeshesAsFresnelDirty")], $.prototype, "diffuseFresnelParameters", void 0), M([ge("opacityFresnelParameters")], $.prototype, "_opacityFresnelParameters", void 0), M([P("_markAllSubMeshesAsFresnelAndMiscDirty")], $.prototype, "opacityFresnelParameters", void 0), M([ge("reflectionFresnelParameters")], $.prototype, "_reflectionFresnelParameters", void 0), M([P("_markAllSubMeshesAsFresnelDirty")], $.prototype, "reflectionFresnelParameters", void 0), M([ge("refractionFresnelParameters")], $.prototype, "_refractionFresnelParameters", void 0), M([P("_markAllSubMeshesAsFresnelDirty")], $.prototype, "refractionFresnelParameters", void 0), M([ge("emissiveFresnelParameters")], $.prototype, "_emissiveFresnelParameters", void 0), M([P("_markAllSubMeshesAsFresnelDirty")], $.prototype, "emissiveFresnelParameters", void 0), M([N("useReflectionFresnelFromSpecular")], $.prototype, "_useReflectionFresnelFromSpecular", void 0), M([P("_markAllSubMeshesAsFresnelDirty")], $.prototype, "useReflectionFresnelFromSpecular", void 0), M([N("useGlossinessFromSpecularMapAlpha")], $.prototype, "_useGlossinessFromSpecularMapAlpha", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "useGlossinessFromSpecularMapAlpha", void 0), M([N("maxSimultaneousLights")], $.prototype, "_maxSimultaneousLights", void 0), M([P("_markAllSubMeshesAsLightsDirty")], $.prototype, "maxSimultaneousLights", void 0), M([N("invertNormalMapX")], $.prototype, "_invertNormalMapX", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "invertNormalMapX", void 0), M([N("invertNormalMapY")], $.prototype, "_invertNormalMapY", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "invertNormalMapY", void 0), M([N("twoSidedLighting")], $.prototype, "_twoSidedLighting", void 0), M([P("_markAllSubMeshesAsTexturesDirty")], $.prototype, "twoSidedLighting", void 0), M([N("applyDecalMapAfterDetailMap")], $.prototype, "_applyDecalMapAfterDetailMap", void 0), M([P("_markAllSubMeshesAsMiscDirty")], $.prototype, "applyDecalMapAfterDetailMap", void 0), C("BABYLON.StandardMaterial", $), je.DefaultMaterialFactory = (e) => new $("default material", e);
function nr(e) {}
//#endregion
//#region Frontend/game.ts
var rr = (...e) => console.log("[babylon-debug]", ...e), ir = null, ar = null, or = null;
async function sr(e) {
	if (rr("initGame called, containerId =", e), or = document.getElementById(e), !or) {
		console.error(`[babylon-debug] container '#${e}' NOT found in DOM`);
		return;
	}
	rr("container found, client size =", or.clientWidth, "x", or.clientHeight), await new Promise((e) => setTimeout(e, 50)), rr("layout wait done, client size now =", or.clientWidth, "x", or.clientHeight), (or.clientWidth === 0 || or.clientHeight === 0) && (console.warn(`[babylon-debug] render target '#${e}' has a 0px boundary. Forcing fallback dimensions.`), or.style.width = "100vw", or.style.height = "100vh");
	let t = document.createElement("canvas");
	t.id = "render-canvas", t.style.width = "100%", t.style.height = "100%", t.style.display = "block", or.appendChild(t), ir = new p(t, !0, {
		antialias: !0,
		stencil: !0,
		preserveDrawingBuffer: !0
	}), ar = new je(ir), ar.clearColor = new O(.012, .016, .031, 1);
	let n = new Z("camera", -Math.PI / 2, Math.PI / 3, 24, h.Zero(), ar);
	n.attachControl(t, !0), n.minZ = .1, n.maxZ = 500;
	let r = new Tn("light", new h(.4, 1, .2), ar);
	r.intensity = .9;
	let i = An("ground", {
		width: 40,
		height: 40
	}, ar), a = new $("ground-mat", ar);
	a.diffuseColor = new E(.07, .1, .2), a.specularColor = new E(.02, .02, .02), i.material = a;
	let o = Pn("demo-box", { size: 2 }, ar), s = new $("box-mat", ar);
	s.diffuseColor = new E(.98, .45, .22), s.specularColor = new E(.2, .2, .2), o.material = s, o.position = new h(0, 1.6, 0), ar.onBeforeRenderObservable.add(() => {
		o.rotation.y += .01;
	}), ir.runRenderLoop(() => ar?.render()), window.addEventListener("resize", () => ir?.resize()), rr("Babylon engine initialized:", ir.getClassName(), "canvas", t.width, "x", t.height);
}
function cr(e) {
	rr("renderText called (no DOM overlay yet), message =", JSON.stringify(e));
}
async function lr(e) {
	if (rr("renderScene called, message =", JSON.stringify(e)), !ir || !ar) {
		console.error("[babylon-debug] renderScene skipped: Babylon engine not initialized");
		return;
	}
}
rr("game-bundle loaded, exposing window.initGame / window.renderText / window.renderScene"), window.initGame = sr, window.renderText = cr, window.renderScene = lr, window.registerLocalBufferProvider = nr, window.dispatchEvent(new Event("babylon-bundle-ready"));
//#endregion
export { sr as initGame, lr as renderScene, cr as renderText };

//# sourceMappingURL=game-bundle.js.map