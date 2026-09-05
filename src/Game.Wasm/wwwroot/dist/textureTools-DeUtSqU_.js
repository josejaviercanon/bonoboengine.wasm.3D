import { r as e } from "./performanceConfigurator-DKR9RfNv.js";
import { d as t, i as n, m as r, o as i, t as a, u as o } from "./abstractEngine-C4dI3NwB.js";
import { t as s } from "./logger-DQIzSR_y.js";
import { a as c, d as l, i as u, n as d, r as f, s as p, t as m, u as h } from "./lightConstants-t4r6lMWn.js";
import { a as g, i as _, p as v, t as y, u as b } from "./math.vector-BskpwSKn.js";
import { n as x, t as S } from "./typeStore-pENEWnX2.js";
import { t as C } from "./math.scalar.functions-BQvmU5eh.js";
import { c as w, i as T, t as E } from "./texture-XPOS5lxO.js";
import { i as D, r as O, t as k } from "./drawWrapper-B2Z7Hhiz.js";
import { a as A, h as j, r as M } from "./decorators-BjxgwLXx.js";
import "./postprocess.vertex-BEsMxXeV.js";
import "./postprocess.vertex-6eCiY1T2.js";
//#region node_modules/@babylonjs/core/Misc/HighDynamicRange/cubemapToSphericalPolynomial.js
var N = class {
	constructor(e, t, n, r) {
		this.name = e, this.worldAxisForNormal = t, this.worldAxisForFileX = n, this.worldAxisForFileY = r;
	}
}, P = class {
	static ConvertCubeMapTextureToSphericalPolynomial(e) {
		if (!e.isCube) return null;
		e.getScene()?.getEngine().flushFramebuffer();
		let t = e.getSize().width, n = e.readPixels(0, void 0, void 0, !1), r = e.readPixels(1, void 0, void 0, !1), i, a;
		e.isRenderTarget ? (i = e.readPixels(3, void 0, void 0, !1), a = e.readPixels(2, void 0, void 0, !1)) : (i = e.readPixels(2, void 0, void 0, !1), a = e.readPixels(3, void 0, void 0, !1));
		let o = e.readPixels(4, void 0, void 0, !1), s = e.readPixels(5, void 0, void 0, !1), c = e.gammaSpace;
		return new Promise((e) => {
			Promise.all([
				r,
				n,
				i,
				a,
				o,
				s
			]).then(([n, r, i, a, o, s]) => {
				let l = {
					size: t,
					right: r,
					left: n,
					up: i,
					down: a,
					front: o,
					back: s,
					format: 5,
					type: +(n instanceof Float32Array),
					gammaSpace: c
				};
				e(this.ConvertCubeMapToSphericalPolynomial(l));
			});
		});
	}
	static _AreaElement(e, t) {
		return Math.atan2(e * t, Math.sqrt(e * e + t * t + 1));
	}
	static ConvertCubeMapToSphericalPolynomial(e) {
		let t = new h(), n = 0, r = 2 / e.size, i = r, a = .5 * r, o = a - 1;
		for (let s = 0; s < 6; s++) {
			let c = this._FileFaces[s], l = e[c.name], u = o, d = e.format === 5 ? 4 : 3;
			for (let s = 0; s < e.size; s++) {
				let f = o;
				for (let i = 0; i < e.size; i++) {
					let o = c.worldAxisForFileX.scale(f).add(c.worldAxisForFileY.scale(u)).add(c.worldAxisForNormal);
					o.normalize();
					let p = this._AreaElement(f - a, u - a) - this._AreaElement(f - a, u + a) - this._AreaElement(f + a, u - a) + this._AreaElement(f + a, u + a), m = l[s * e.size * d + i * d + 0], h = l[s * e.size * d + i * d + 1], g = l[s * e.size * d + i * d + 2];
					isNaN(m) && (m = 0), isNaN(h) && (h = 0), isNaN(g) && (g = 0), e.type === 0 && (m /= 255, h /= 255, g /= 255), e.gammaSpace && (m = C(m) ** +v, h = C(h) ** +v, g = C(g) ** +v);
					let _ = this.MAX_HDRI_VALUE;
					if (this.PRESERVE_CLAMPED_COLORS) {
						let e = Math.max(m, h, g);
						if (e > _) {
							let t = _ / e;
							m *= t, h *= t, g *= t;
						}
					} else m = C(m, 0, _), h = C(h, 0, _), g = C(g, 0, _);
					let y = new w(m, h, g);
					t.addLight(o, y, p), n += p, f += r;
				}
				u += i;
			}
		}
		let s = 4 * Math.PI * 6 / 6 / n;
		return t.scaleInPlace(s), t.convertIncidentRadianceToIrradiance(), t.convertIrradianceToLambertianRadiance(), l.FromHarmonics(t);
	}
};
P._FileFaces = [
	new N("right", new g(1, 0, 0), new g(0, 0, -1), new g(0, -1, 0)),
	new N("left", new g(-1, 0, 0), new g(0, 0, 1), new g(0, -1, 0)),
	new N("up", new g(0, 1, 0), new g(1, 0, 0), new g(0, 0, 1)),
	new N("down", new g(0, -1, 0), new g(1, 0, 0), new g(0, 0, -1)),
	new N("front", new g(0, 0, 1), new g(1, 0, 0), new g(0, -1, 0)),
	new N("back", new g(0, 0, -1), new g(-1, 0, 0), new g(0, -1, 0))
], P.MAX_HDRI_VALUE = 4096, P.PRESERVE_CLAMPED_COLORS = !1;
//#endregion
//#region node_modules/@babylonjs/core/Rendering/objectRenderer.js
var F = class t {
	get renderList() {
		return this._renderList;
	}
	set renderList(e) {
		this._renderList !== e && (this._unObserveRenderList &&= (this._unObserveRenderList(), null), e && (this._unObserveRenderList = b(e, this._renderListHasChanged)), this._renderList = e);
	}
	get disableImageProcessing() {
		return this._disableImageProcessing;
	}
	set disableImageProcessing(e) {
		e !== this._disableImageProcessing && (this._disableImageProcessing = e, this._scene.markAllMaterialsAsDirty(64));
	}
	get disableDepthPrePass() {
		return this._disableDepthPrePass;
	}
	set disableDepthPrePass(e) {
		this._disableDepthPrePass = e, this._renderingManager.disableDepthPrePass = e;
	}
	get name() {
		return this._name;
	}
	set name(e) {
		if (this._name !== e) {
			if (this._name = e, this._sceneUBOs) for (let e = 0; e < this._sceneUBOs.length; ++e) this._sceneUBOs[e].name = `Scene ubo #${e} for ${this.name}`;
			if (this._scene) for (let e = 0; e < this._renderPassIds.length; ++e) {
				let t = this._renderPassIds[e];
				this._engine._renderPassNames[t] = `${this._name}#${e}`;
			}
		}
	}
	get renderPassIds() {
		return this._renderPassIds;
	}
	get currentRefreshId() {
		return this._currentRefreshId;
	}
	getActiveMeshes() {
		return this._activeMeshes;
	}
	setMaterialForRendering(e, t) {
		let n;
		n = Array.isArray(e) ? e : [e];
		for (let e = 0; e < n.length; ++e) for (let r = 0; r < this.options.numPasses; ++r) {
			let i = n[e];
			n[e].isAnInstance && (i = n[e].sourceMesh), i.setMaterialForRenderPass(this._renderPassIds[r], t === void 0 ? void 0 : Array.isArray(t) ? t[r] : t);
		}
	}
	_freezeActiveMeshes(e) {
		this._freezeActiveMeshesCancel = i(() => this._checkReadiness(), () => {
			if (this._freezeActiveMeshesCancel = null, e) for (let e = 0; e < this._activeMeshes.length; e++) this._activeMeshes.data[e]._freeze();
			this._prepareRenderingManager(0, !0), this._isFrozen = !0;
		}, (e, t) => {
			this._freezeActiveMeshesCancel = null, t ? (s.Error("ObjectRenderer: Timeout while waiting for the renderer to be ready."), e && s.Error(e)) : (s.Error("ObjectRenderer: An unexpected error occurred while waiting for the renderer to be ready."), e && (s.Error(e), e.stack && s.Error(e.stack)));
		});
	}
	_unfreezeActiveMeshes() {
		this._freezeActiveMeshesCancel?.(), this._freezeActiveMeshesCancel = null;
		for (let e = 0; e < this._activeMeshes.length; e++) this._activeMeshes.data[e]._unFreeze();
		this._isFrozen = !1;
	}
	constructor(t, n, r) {
		this._unObserveRenderList = null, this._renderListHasChanged = (e, t) => {
			let n = this._renderList ? this._renderList.length : 0;
			if (t === 0 && n > 0 || n === 0) for (let e of this._scene.meshes) e._markSubMeshesAsLightDirty();
		}, this.particleSystemList = null, this.getCustomRenderList = null, this.renderMeshes = !0, this.renderDepthOnlyMeshes = !0, this.renderOpaqueMeshes = !0, this.renderAlphaTestMeshes = !0, this.renderTransparentMeshes = !0, this.renderParticles = !0, this.renderSprites = !1, this.forceLayerMaskCheck = !1, this.enableBoundingBoxRendering = !1, this.enableOutlineRendering = !0, this._disableImageProcessing = !1, this.dontSetTransformationMatrix = !1, this._disableDepthPrePass = !1, this.onBeforeRenderObservable = new e(), this.onAfterRenderObservable = new e(), this.onBeforeRenderingManagerRenderObservable = new e(), this.onAfterRenderingManagerRenderObservable = new e(), this.onInitRenderingObservable = new e(), this.onFinishRenderingObservable = new e(), this.onFastPathRenderObservable = new e(), this._currentRefreshId = -1, this._refreshRate = 1, this._currentApplyByPostProcessSetting = !1, this._activeMeshes = new c(256), this._activeBoundingBoxes = new c(32), this._currentFrameId = -1, this._currentSceneUBOIndex = 0, this._isFrozen = !1, this._freezeActiveMeshesCancel = null, this._currentSceneCamera = null, this.name = t, this._scene = n, this._engine = this._scene.getEngine(), this._useUBO = this._engine.supportsUniformBuffers, this.renderList = [], this._renderPassIds = [], this.options = {
			numPasses: 1,
			doNotChangeAspectRatio: !0,
			enableClusteredLights: !1,
			...r
		}, this._createRenderPassId(), this.renderPassId = this._renderPassIds[0], this._renderingManager = new d(n), this._renderingManager._useSceneAutoClearSetup = !0, this.options.enableClusteredLights && this.onInitRenderingObservable.add(() => {
			for (let e of this._scene.lights) e.getTypeID() === m.LIGHTTYPEID_CLUSTERED_CONTAINER && e.isSupported && e._updateBatches(this.activeCamera).render();
		}), this._scene.addObjectRenderer(this);
	}
	_releaseRenderPassId() {
		for (let e = 0; e < this.options.numPasses; ++e) this._engine.releaseRenderPassId(this._renderPassIds[e]);
		this._renderPassIds.length = 0;
	}
	_createRenderPassId() {
		this._releaseRenderPassId();
		for (let e = 0; e < this.options.numPasses; ++e) this._renderPassIds[e] = this._engine.createRenderPassId(`${this.name}#${e}`);
	}
	_createSceneUBO(e, t) {
		let n = this._scene.getEngine(), r = new u(n, void 0, t, e, void 0, !1);
		return r.addUniform("viewProjection", 16), t && r.addUniform("viewProjectionR", 16), r.addUniform("view", 16), r.addUniform("projection", 16), r.addUniform("vEyePosition", 4), r;
	}
	_getSceneUBO() {
		this._currentFrameId !== this._engine.frameId && (this._currentSceneUBOIndex = 0, this._currentFrameId = this._engine.frameId), this._sceneUBOs || (this._sceneUBOs = [], this._sceneUBOIsMultiview = []);
		let e = this._engine._currentRenderTarget, t = !!(e && e.texture?.isMultiview) || !!this._scene._multiviewSceneUboIsActive;
		if (this._currentSceneUBOIndex >= this._sceneUBOs.length) {
			let e = this._sceneUBOs.length;
			this._sceneUBOs.push(this._createSceneUBO(`Scene ubo #${e} for ${this.name}`, t)), this._sceneUBOIsMultiview.push(t);
		} else this._sceneUBOIsMultiview[this._currentSceneUBOIndex] !== t && (this._sceneUBOs[this._currentSceneUBOIndex].dispose(), this._sceneUBOs[this._currentSceneUBOIndex] = this._createSceneUBO(`Scene ubo #${this._currentSceneUBOIndex} for ${this.name}`, t), this._sceneUBOIsMultiview[this._currentSceneUBOIndex] = t);
		let n = this._sceneUBOs[this._currentSceneUBOIndex++];
		return n.unbindEffect(), n;
	}
	resetRefreshCounter() {
		this._currentRefreshId = -1;
	}
	get refreshRate() {
		return this._refreshRate;
	}
	set refreshRate(e) {
		this._refreshRate = e, this.resetRefreshCounter();
	}
	shouldRender() {
		return this._currentRefreshId === -1 || this.refreshRate === this._currentRefreshId ? (this._currentRefreshId = 1, !0) : (this._currentRefreshId++, !1);
	}
	isReadyForRendering(e, t) {
		this.prepareRenderList(), this.initRender(e, t);
		let n = this._checkReadiness();
		return this.finishRender(), n;
	}
	prepareRenderList() {
		let e = this._scene;
		if (this._waitingRenderList) {
			if (!this.renderListPredicate) {
				this.renderList = [];
				for (let t = 0; t < this._waitingRenderList.length; t++) {
					let n = this._waitingRenderList[t], r = e.getMeshById(n);
					r && this.renderList.push(r);
				}
			}
			this._waitingRenderList = void 0;
		}
		if (this.renderListPredicate) {
			this.renderList ? this.renderList.length = 0 : this.renderList = [];
			let e = this._scene.meshes;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				this.renderListPredicate(n) && this.renderList.push(n);
			}
		}
		this._currentApplyByPostProcessSetting = this._scene.imageProcessingConfiguration.applyByPostProcess, this._disableImageProcessing && (this._scene.imageProcessingConfiguration._applyByPostProcess = this._disableImageProcessing);
	}
	initRender(e, t) {
		let n = this.activeCamera ?? this._scene.activeCamera;
		this._currentSceneCamera = this._scene.activeCamera, this._useUBO && (this._currentSceneUBO = this._scene.getSceneUniformBuffer(), this._currentSceneUBO.unbindEffect(), this._scene.setSceneUniformBuffer(this._getSceneUBO())), this.onInitRenderingObservable.notifyObservers(this), n && (this.dontSetTransformationMatrix || this._scene.setTransformMatrix(n.getViewMatrix(), n.getProjectionMatrix(!0)), this._scene.activeCamera = n, this._engine.setViewport(n.rigParent ? n.rigParent.viewport : n.viewport, e, t)), this._useUBO && this._scene.finalizeSceneUbo(), this._defaultRenderListPrepared = !1;
	}
	finishRender() {
		let e = this._scene;
		this._useUBO && this._scene.setSceneUniformBuffer(this._currentSceneUBO), this._disableImageProcessing && (e.imageProcessingConfiguration._applyByPostProcess = this._currentApplyByPostProcessSetting), e.activeCamera = this._currentSceneCamera, this._currentSceneCamera && (this.activeCamera && this.activeCamera !== e.activeCamera && e.setTransformMatrix(this._currentSceneCamera.getViewMatrix(), this._currentSceneCamera.getProjectionMatrix(!0)), this._engine.setViewport(this._currentSceneCamera.viewport)), e.resetCachedMaterial(), this.onFinishRenderingObservable.notifyObservers(this);
	}
	render(e = 0, t = !1) {
		let n = this._engine.currentRenderPassId;
		if (this._engine.currentRenderPassId = this._renderPassIds[e], this.onBeforeRenderObservable.notifyObservers(e), this._engine.snapshotRendering && this._engine.snapshotRenderingMode === 1) this.onFastPathRenderObservable.notifyObservers(e);
		else {
			let t = this._prepareRenderingManager(e), n = this._scene.getOutlineRenderer?.(), r = n?.enabled;
			n && (n.enabled = this.enableOutlineRendering), this.onBeforeRenderingManagerRenderObservable.notifyObservers(e), this._renderingManager.render(this.customRenderFunction, t, this.renderParticles, this.renderSprites, this.renderDepthOnlyMeshes, this.renderOpaqueMeshes, this.renderAlphaTestMeshes, this.renderTransparentMeshes, this.customRenderTransparentSubMeshes), this.onAfterRenderingManagerRenderObservable.notifyObservers(e), n && (n.enabled = r);
		}
		t || this.onAfterRenderObservable.notifyObservers(e), this._engine.currentRenderPassId = n;
	}
	_checkReadiness() {
		let e = this._scene, t = this._engine.currentRenderPassId, n = !0;
		e.getViewMatrix() || e.updateTransformMatrix();
		let r = this.options.numPasses;
		for (let t = 0; t < r && n; t++) {
			let i = this.renderList ? this.renderList : e.frameGraph ? e.meshes : e.getActiveMeshes().data, a = this.renderList || e.frameGraph ? i.length : e.getActiveMeshes().length;
			this._engine.currentRenderPassId = this._renderPassIds[t], this.onBeforeRenderObservable.notifyObservers(t);
			let o = null, s = a;
			this.getCustomRenderList && (o = this.getCustomRenderList(t, i, a), o && (s = o.length)), o ||= i, this.options.doNotChangeAspectRatio || e.updateTransformMatrix(!0);
			for (let e = 0; e < s && n; ++e) {
				let t = o[e];
				if (!(!t.isEnabled() || t.isBlocked || !t.isVisible || !t.subMeshes)) {
					if (this.customIsReadyFunction) {
						if (!this.customIsReadyFunction(t, this.refreshRate, !0)) {
							n = !1;
							continue;
						}
					} else if (!t.isReady(!0)) {
						n = !1;
						continue;
					}
				}
			}
			this.onAfterRenderObservable.notifyObservers(t), r > 1 && (e.incrementRenderId(), e.resetCachedMaterial());
		}
		let i = this.particleSystemList || e.particleSystems;
		for (let e of i) e.isReady() || (n = !1);
		return this._engine.currentRenderPassId = t, n;
	}
	_prepareRenderingManager(e = 0, t = !1) {
		let n = this._scene, r = null, i, a, o = this.renderList ? this.renderList : n.frameGraph ? n.meshes : n.getActiveMeshes().data, s = this.renderList || n.frameGraph ? o.length : n.getActiveMeshes().length;
		if (this.getCustomRenderList && (r = this.getCustomRenderList(e, o, s)), r) i = r.length, a = this.forceLayerMaskCheck;
		else {
			if (this._defaultRenderListPrepared && !t && !this._engine.isWebGPU) return o;
			this._defaultRenderListPrepared = !0, r = o, i = s, a = !this.renderList || this.forceLayerMaskCheck;
		}
		let c = n.activeCamera, l = this.cameraForLOD ?? c, u = n.getBoundingBoxRenderer?.();
		if (n._activeMeshesFrozen && this._isFrozen) {
			if (this._renderingManager.resetSprites(), this.enableBoundingBoxRendering && u) {
				u.reset();
				for (let e = 0; e < this._activeBoundingBoxes.length; e++) {
					let t = this._activeBoundingBoxes.data[e];
					u.renderList.push(t);
				}
			}
			return r;
		}
		if (this._renderingManager.reset(), this._activeMeshes.reset(), this._activeBoundingBoxes.reset(), u && u.reset(), this.renderMeshes) {
			let e = n.getRenderId(), t = n.getFrameId();
			for (let o = 0; o < i; o++) {
				let i = r[o];
				if (i && !i.isBlocked) {
					if (this.customIsReadyFunction) {
						if (!this.customIsReadyFunction(i, this.refreshRate, !1)) {
							this.resetRefreshCounter();
							continue;
						}
					} else if (!i.isReady(this.refreshRate === 0)) {
						this.resetRefreshCounter();
						continue;
					}
					let r;
					if (l) {
						let e = i._internalAbstractMeshDataInfo._currentLOD.get(l);
						!e || e[1] !== t ? (r = n.customLODSelector ? n.customLODSelector(i, l) : i.getLOD(l), e ? (e[0] = r, e[1] = t) : i._internalAbstractMeshDataInfo._currentLOD.set(l, [r, t])) : r = e[0];
					} else r = i;
					if (!r) continue;
					r !== i && r.billboardMode !== 0 && r.computeWorldMatrix(), r._preActivateForIntermediateRendering(e);
					let o;
					if (o = a && c ? (i.layerMask & c.layerMask) === 0 : !1, i.isEnabled() && i.isVisible && i.subMeshes && !o) {
						if (this._activeMeshes.push(i), r._internalAbstractMeshDataInfo._wasActiveLastFrame = !0, r !== i && r._activate(e, !0), this.enableBoundingBoxRendering && u && u._preActiveMesh(i), i._activate(e, !0) && i.subMeshes.length) {
							i.isAnInstance ? i._internalAbstractMeshDataInfo._actAsRegularMesh && (r = i) : r._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = !1, r._internalAbstractMeshDataInfo._isActiveIntermediate = !0, n._prepareSkeleton(r);
							for (let e = 0; e < r.subMeshes.length; e++) {
								let t = r.subMeshes[e];
								this.enableBoundingBoxRendering && u && u._evaluateSubMesh(i, t), this._renderingManager.dispatch(t, r);
							}
						}
						i._postActivate();
					}
				}
			}
		}
		if (this.enableBoundingBoxRendering && u && t) for (let e = 0; e < u.renderList.length; e++) {
			let t = u.renderList.data[e];
			this._activeBoundingBoxes.push(t);
		}
		if (this._scene.particlesEnabled && this.renderParticles) {
			this._scene.onBeforeParticlesRenderingObservable.notifyObservers(this._scene);
			let e = this.particleSystemList || n.particleSystems;
			for (let t = 0; t < e.length; t++) {
				let n = e[t], r = n.emitter;
				!n.isStarted() || !r || r.position && !r.isEnabled() || this._renderingManager.dispatchParticles(n);
			}
			this._scene.onAfterParticlesRenderingObservable.notifyObservers(this._scene);
		}
		return r;
	}
	get renderingManager() {
		return this._renderingManager;
	}
	setRenderingOrder(e, t = null, n = null, r = null) {
		this._renderingManager.setRenderingOrder(e, t, n, r);
	}
	setRenderingAutoClearDepthStencil(e, t, n = !0, r = !0) {
		this._renderingManager.setRenderingAutoClearDepthStencil(e, t, n, r), this._renderingManager._useSceneAutoClearSetup = !1;
	}
	clone() {
		let e = new t(this.name, this._scene, this.options);
		return this.renderList && (e.renderList = this.renderList.slice(0)), e;
	}
	dispose() {
		let e = this.renderList ? this.renderList : this._scene.getActiveMeshes().data, t = this.renderList ? this.renderList.length : this._scene.getActiveMeshes().length;
		for (let n = 0; n < t; n++) {
			let t = e[n];
			t && t.getMaterialForRenderPass(this.renderPassId) !== void 0 && t.setMaterialForRenderPass(this.renderPassId, void 0);
		}
		if (this.onInitRenderingObservable.clear(), this.onFinishRenderingObservable.clear(), this.onBeforeRenderObservable.clear(), this.onAfterRenderObservable.clear(), this.onBeforeRenderingManagerRenderObservable.clear(), this.onAfterRenderingManagerRenderObservable.clear(), this.onFastPathRenderObservable.clear(), this._releaseRenderPassId(), this.renderList = null, this._sceneUBOs) for (let e of this._sceneUBOs) e.dispose();
		this._sceneUBOs = void 0, this._scene.removeObjectRenderer(this);
	}
	_rebuild() {
		this.refreshRate === t.REFRESHRATE_RENDER_ONCE && (this.refreshRate = t.REFRESHRATE_RENDER_ONCE);
	}
	freeRenderingGroups() {
		this._renderingManager && this._renderingManager.freeRenderingGroups();
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Materials/Textures/renderTargetTexture.js
F.REFRESHRATE_RENDER_ONCE = 0, F.REFRESHRATE_RENDER_ONEVERYFRAME = 1, F.REFRESHRATE_RENDER_ONEVERYTWOFRAMES = 2, n.prototype.setDepthStencilTexture = function(e, t) {
	this._engine.setDepthStencilTexture(this._samplers[e], this._uniforms[e], t, e);
};
var I = class t extends E {
	get renderListPredicate() {
		return this._objectRenderer.renderListPredicate;
	}
	set renderListPredicate(e) {
		this._objectRenderer.renderListPredicate = e;
	}
	get renderList() {
		return this._objectRenderer.renderList;
	}
	set renderList(e) {
		this._objectRenderer.renderList = e;
	}
	get particleSystemList() {
		return this._objectRenderer.particleSystemList;
	}
	set particleSystemList(e) {
		this._objectRenderer.particleSystemList = e;
	}
	get getCustomRenderList() {
		return this._objectRenderer.getCustomRenderList;
	}
	set getCustomRenderList(e) {
		this._objectRenderer.getCustomRenderList = e;
	}
	get renderParticles() {
		return this._objectRenderer.renderParticles;
	}
	set renderParticles(e) {
		this._objectRenderer.renderParticles = e;
	}
	get renderSprites() {
		return this._objectRenderer.renderSprites;
	}
	set renderSprites(e) {
		this._objectRenderer.renderSprites = e;
	}
	get enableBoundingBoxRendering() {
		return this._objectRenderer.enableBoundingBoxRendering;
	}
	set enableBoundingBoxRendering(e) {
		this._objectRenderer.enableBoundingBoxRendering = e;
	}
	get enableOutlineRendering() {
		return this._objectRenderer.enableOutlineRendering;
	}
	set enableOutlineRendering(e) {
		this._objectRenderer.enableOutlineRendering = e;
	}
	get forceLayerMaskCheck() {
		return this._objectRenderer.forceLayerMaskCheck;
	}
	set forceLayerMaskCheck(e) {
		this._objectRenderer.forceLayerMaskCheck = e;
	}
	get activeCamera() {
		return this._objectRenderer.activeCamera;
	}
	set activeCamera(e) {
		this._objectRenderer.activeCamera = e;
	}
	get cameraForLOD() {
		return this._objectRenderer.cameraForLOD;
	}
	set cameraForLOD(e) {
		this._objectRenderer.cameraForLOD = e;
	}
	get disableImageProcessing() {
		return this._objectRenderer.disableImageProcessing;
	}
	set disableImageProcessing(e) {
		this._objectRenderer.disableImageProcessing = e;
	}
	get customIsReadyFunction() {
		return this._objectRenderer.customIsReadyFunction;
	}
	set customIsReadyFunction(e) {
		this._objectRenderer.customIsReadyFunction = e;
	}
	get customRenderFunction() {
		return this._objectRenderer.customRenderFunction;
	}
	set customRenderFunction(e) {
		this._objectRenderer.customRenderFunction = e;
	}
	get postProcesses() {
		return this._postProcesses;
	}
	get _prePassEnabled() {
		return !!this._prePassRenderTarget && this._prePassRenderTarget.enabled;
	}
	set onAfterUnbind(e) {
		this._onAfterUnbindObserver && this.onAfterUnbindObservable.remove(this._onAfterUnbindObserver), this._onAfterUnbindObserver = this.onAfterUnbindObservable.add(e);
	}
	get onBeforeRenderObservable() {
		return this._objectRenderer.onBeforeRenderObservable;
	}
	set onBeforeRender(e) {
		this._onBeforeRenderObserver && this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver), this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(e);
	}
	get onAfterRenderObservable() {
		return this._objectRenderer.onAfterRenderObservable;
	}
	set onAfterRender(e) {
		this._onAfterRenderObserver && this.onAfterRenderObservable.remove(this._onAfterRenderObserver), this._onAfterRenderObserver = this.onAfterRenderObservable.add(e);
	}
	set onClear(e) {
		this._onClearObserver && this.onClearObservable.remove(this._onClearObserver), this._onClearObserver = this.onClearObservable.add(e);
	}
	get _waitingRenderList() {
		return this._objectRenderer._waitingRenderList;
	}
	set _waitingRenderList(e) {
		this._objectRenderer._waitingRenderList = e;
	}
	get renderPassId() {
		return this._objectRenderer.renderPassId;
	}
	get renderPassIds() {
		return this._objectRenderer.renderPassIds;
	}
	get currentRefreshId() {
		return this._objectRenderer.currentRefreshId;
	}
	setMaterialForRendering(e, t) {
		this._objectRenderer.setMaterialForRendering(e, t);
	}
	get isMulti() {
		return this._renderTarget?.isMulti ?? !1;
	}
	get renderTargetOptions() {
		return this._renderTargetOptions;
	}
	get renderTarget() {
		return this._renderTarget;
	}
	_onRatioRescale() {
		this._sizeRatio && this.resize(this._initialSizeParameter);
	}
	set boundingBoxSize(e) {
		if (this._boundingBoxSize && this._boundingBoxSize.equals(e)) return;
		this._boundingBoxSize = e;
		let t = this.getScene();
		t && t.markAllMaterialsAsDirty(1);
	}
	get boundingBoxSize() {
		return this._boundingBoxSize;
	}
	get depthStencilTexture() {
		return this._renderTarget?._depthStencilTexture ?? null;
	}
	constructor(t, n, r, i = !1, a = !0, o = 0, c = !1, l = E.TRILINEAR_SAMPLINGMODE, u = !0, d = !1, f = !1, p = 5, m = !1, h, _, v = !1, b = !1) {
		let x, S = !0, C, w = !1;
		if (typeof i == "object") {
			let e = i;
			i = !!e.generateMipMaps, a = e.doNotChangeAspectRatio ?? !0, o = e.type ?? 0, c = !!e.isCube, l = e.samplingMode ?? E.TRILINEAR_SAMPLINGMODE, u = e.generateDepthBuffer ?? !0, d = !!e.generateStencilBuffer, f = !!e.isMulti, p = e.format ?? 5, m = !!e.delayAllocation, h = e.samples, _ = e.creationFlags, v = !!e.noColorAttachment, b = !!e.useSRGBBuffer, x = e.colorAttachment, S = e.gammaSpace ?? S, C = e.existingObjectRenderer, w = !!e.enableClusteredLights;
		}
		if (super(null, r, !i, void 0, l, void 0, void 0, void 0, void 0, p), this.ignoreCameraViewport = !1, this.onBeforeBindObservable = new e(), this.onAfterUnbindObservable = new e(), this.onClearObservable = new e(), this.onResizeObservable = new e(), this._cleared = !1, this.skipInitialClear = !1, this._samples = 1, this._canRescale = !0, this._renderTarget = null, this._dontDisposeObjectRenderer = !1, this.boundingBoxPosition = g.Zero(), this._disableEngineStages = !1, this._dumpToolsLoading = !1, r = this.getScene(), !r) return;
		let T = this.getScene().getEngine();
		this._gammaSpace = S, this._coordinatesMode = E.PROJECTION_MODE, this.name = t, this.isRenderTarget = !0, this._initialSizeParameter = n, this._dontDisposeObjectRenderer = !!C, this._processSizeParameter(n), this._objectRenderer = C ?? new F(t, r, {
			numPasses: c ? 6 : this.getRenderLayers() || 1,
			doNotChangeAspectRatio: a,
			enableClusteredLights: w
		}), this._onBeforeRenderingManagerRenderObserver = this._objectRenderer.onBeforeRenderingManagerRenderObservable.add(() => {
			let e = this._scene;
			if (!this._disableEngineStages) for (let t of e._beforeRenderTargetClearStage) t.action(this, this._currentFaceIndex, this._currentLayer);
			if (this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(T) : this.skipInitialClear || T.clear(this.clearColor ?? e.clearColor, !0, !0, !0), this._doNotChangeAspectRatio || e.updateTransformMatrix(!0), !this._disableEngineStages) for (let t of e._beforeRenderTargetDrawStage) t.action(this, this._currentFaceIndex, this._currentLayer);
			T._debugPushGroup && T._debugPushGroup(`Render to ${this.name} (face #${this._currentFaceIndex} layer #${this._currentLayer})`);
		}), this._onAfterRenderingManagerRenderObserver = this._objectRenderer.onAfterRenderingManagerRenderObservable.add(() => {
			if (T._debugPopGroup && T._debugPopGroup(), !this._disableEngineStages) for (let e of this._scene._afterRenderTargetDrawStage) e.action(this, this._currentFaceIndex, this._currentLayer);
			let e = this._texture?.generateMipMaps ?? !1;
			if (this._texture && (this._texture.generateMipMaps = !1), this._postProcessManager ? this._postProcessManager._finalizeFrame(!1, this._renderTarget ?? void 0, this._currentFaceIndex, this._postProcesses, this.ignoreCameraViewport) : this._currentUseCameraPostProcess && this._scene.postProcessManager._finalizeFrame(!1, this._renderTarget ?? void 0, this._currentFaceIndex), !this._disableEngineStages) for (let e of this._scene._afterRenderTargetPostProcessStage) e.action(this, this._currentFaceIndex, this._currentLayer);
			this._texture && (this._texture.generateMipMaps = e), this._doNotChangeAspectRatio || this._scene.updateTransformMatrix(!0), this._currentDumpForDebug && (this._dumpTools ? this._dumpTools.DumpFramebuffer(this.getRenderWidth(), this.getRenderHeight(), T) : s.Error("dumpTools module is still being loaded. To speed up the process import dump tools directly in your project"));
		}), this._onFastPathRenderObserver = this._objectRenderer.onFastPathRenderObservable.add(() => {
			this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(T) : this.skipInitialClear || T.clear(this.clearColor || this._scene.clearColor, !0, !0, !0);
		}), this._resizeObserver = T.onResizeObservable.add(() => {}), this._generateMipMaps = !!i, this._doNotChangeAspectRatio = a, !f && (this._renderTargetOptions = {
			generateMipMaps: i,
			type: o,
			format: this._format ?? void 0,
			samplingMode: this.samplingMode,
			generateDepthBuffer: u,
			generateStencilBuffer: d,
			samples: h,
			creationFlags: _,
			noColorAttachment: v,
			useSRGBBuffer: b,
			colorAttachment: x,
			label: this.name
		}, this.samplingMode === E.NEAREST_SAMPLINGMODE && (this.wrapU = E.CLAMP_ADDRESSMODE, this.wrapV = E.CLAMP_ADDRESSMODE), m || (c ? (this._renderTarget = r.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions), this.coordinatesMode = E.INVCUBIC_MODE, this._textureMatrix = y.Identity()) : this._renderTarget = r.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, h !== void 0 && (this.samples = h)));
	}
	createDepthStencilTexture(e = 0, t = !0, n = !1, r = 1, i = 14, a) {
		this._renderTarget?.createDepthStencilTexture(e, t, n, r, i, a);
	}
	_processSizeParameter(e) {
		if (e.ratio) {
			this._sizeRatio = e.ratio;
			let t = this._getEngine();
			this._size = {
				width: this._bestReflectionRenderTargetDimension(t.getRenderWidth(), this._sizeRatio),
				height: this._bestReflectionRenderTargetDimension(t.getRenderHeight(), this._sizeRatio)
			};
		} else this._size = e;
	}
	get samples() {
		return this._renderTarget?.samples ?? this._samples;
	}
	set samples(e) {
		this._renderTarget && (this._samples = this._renderTarget.setSamples(e));
	}
	addPostProcess(e) {
		if (!this._postProcessManager) {
			let e = this.getScene();
			if (!e) return;
			this._postProcessManager = new f(e), this._postProcesses = [];
		}
		this._postProcesses.push(e), this._postProcesses[0].autoClear = !1;
	}
	clearPostProcesses(e = !1) {
		if (this._postProcesses) {
			if (e) for (let e of this._postProcesses) e.dispose();
			this._postProcesses = [];
		}
	}
	removePostProcess(e) {
		if (!this._postProcesses) return;
		let t = this._postProcesses.indexOf(e);
		t !== -1 && (this._postProcesses.splice(t, 1), this._postProcesses.length > 0 && (this._postProcesses[0].autoClear = !1));
	}
	resetRefreshCounter() {
		this._objectRenderer.resetRefreshCounter();
	}
	get refreshRate() {
		return this._objectRenderer.refreshRate;
	}
	set refreshRate(e) {
		this._objectRenderer.refreshRate = e;
	}
	_shouldRender() {
		return this._objectRenderer.shouldRender();
	}
	getRenderSize() {
		return this.getRenderWidth();
	}
	getRenderWidth() {
		return this._size.width ? this._size.width : this._size;
	}
	getRenderHeight() {
		return this._size.width ? this._size.height : this._size;
	}
	getRenderLayers() {
		return this._size.layers || this._size.depth || 0;
	}
	disableRescaling() {
		this._canRescale = !1;
	}
	get canRescale() {
		return this._canRescale;
	}
	scale(e) {
		let t = Math.max(1, this.getRenderSize() * e);
		this.resize(t);
	}
	getReflectionTextureMatrix() {
		return this.isCube ? this._textureMatrix : super.getReflectionTextureMatrix();
	}
	resize(e) {
		let t = this.isCube;
		this._renderTarget?.dispose(), this._renderTarget = null;
		let n = this.getScene();
		n && (this._processSizeParameter(e), this._renderTarget = t ? n.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions) : n.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, this._renderTargetOptions.samples !== void 0 && (this.samples = this._renderTargetOptions.samples), this.onResizeObservable.hasObservers() && this.onResizeObservable.notifyObservers(this));
	}
	render(e = !1, t = !1) {
		this._render(e, t);
	}
	isReadyForRendering() {
		this._dumpToolsLoading || (this._dumpToolsLoading = !0, import("./dumpTools-miUbe922.js").then((e) => e.t).then((e) => this._dumpTools = e)), this._objectRenderer.prepareRenderList(), this.onBeforeBindObservable.notifyObservers(this), this._objectRenderer.initRender(this.getRenderWidth(), this.getRenderHeight());
		let e = this._objectRenderer._checkReadiness();
		return this.onAfterUnbindObservable.notifyObservers(this), this._objectRenderer.finishRender(), e;
	}
	_render(e = !1, t = !1) {
		let n = this.getScene();
		if (!n) return;
		this.useCameraPostProcesses !== void 0 && (e = this.useCameraPostProcesses);
		let r = n.getEngine();
		if (r._debugPushGroup && r._debugPushGroup(`Render to ${this.name}`), this._objectRenderer.prepareRenderList(), this.onBeforeBindObservable.notifyObservers(this), this._objectRenderer.initRender(this.getRenderWidth(), this.getRenderHeight()), (this.is2DArray || this.is3D) && !this.isMulti) for (let r = 0; r < this.getRenderLayers(); r++) this._renderToTarget(0, e, t, r), n.incrementRenderId(), n.resetCachedMaterial();
		else if (this.isCube && !this.isMulti) for (let r = 0; r < 6; r++) this._renderToTarget(r, e, t), n.incrementRenderId(), n.resetCachedMaterial();
		else this._renderToTarget(0, e, t);
		this.onAfterUnbindObservable.notifyObservers(this), this._objectRenderer.finishRender(), r._debugPopGroup && r._debugPopGroup();
	}
	_bestReflectionRenderTargetDimension(e, t) {
		let n = e * t, i = r(n + 16384 / (128 + n));
		return Math.min(o(e), i);
	}
	_bindFrameBuffer(e = 0, t = 0) {
		let n = this.getScene();
		if (!n) return;
		let r = n.getEngine();
		this._renderTarget && r.bindFramebuffer(this._renderTarget, this.isCube ? e : void 0, void 0, void 0, this.ignoreCameraViewport, 0, t);
	}
	_unbindFrameBuffer(e, t) {
		this._renderTarget && e.unBindFramebuffer(this._renderTarget, this.isCube, () => {
			this.onAfterRenderObservable.notifyObservers(t);
		});
	}
	_prepareFrame(e, t, n, r) {
		this._postProcessManager ? this._prePassEnabled || this._postProcessManager._prepareFrame(this._texture, this._postProcesses) || this._bindFrameBuffer(t, n) : (!r || !e.postProcessManager._prepareFrame(this._texture)) && this._bindFrameBuffer(t, n);
	}
	_renderToTarget(e, t, n, r = 0) {
		let i = this.getScene();
		if (!i) return;
		let a = i.getEngine();
		this._currentFaceIndex = e, this._currentLayer = r, this._currentUseCameraPostProcess = t, this._currentDumpForDebug = n, this._prepareFrame(i, e, r, t), this._objectRenderer.render(e + r, !0), this._unbindFrameBuffer(a, e), this._texture && this.isCube && e === 5 && a.generateMipMapsForCubemap(this._texture, !0);
	}
	setRenderingOrder(e, t = null, n = null, r = null) {
		this._objectRenderer.setRenderingOrder(e, t, n, r);
	}
	setRenderingAutoClearDepthStencil(e, t) {
		this._objectRenderer.setRenderingAutoClearDepthStencil(e, t);
	}
	clone() {
		let e = this.getSize(), n = new t(this.name, e, this.getScene(), this._renderTargetOptions.generateMipMaps, this._doNotChangeAspectRatio, this._renderTargetOptions.type, this.isCube, this._renderTargetOptions.samplingMode, this._renderTargetOptions.generateDepthBuffer, this._renderTargetOptions.generateStencilBuffer, void 0, this._renderTargetOptions.format, void 0, this._renderTargetOptions.samples);
		return n.hasAlpha = this.hasAlpha, n.level = this.level, n.coordinatesMode = this.coordinatesMode, this.renderList && (n.renderList = this.renderList.slice(0)), n;
	}
	serialize() {
		if (!this.name) return null;
		let e = super.serialize();
		if (e.renderTargetSize = this.getRenderSize(), e.renderList = [], this.renderList) for (let t = 0; t < this.renderList.length; t++) e.renderList.push(this.renderList[t].id);
		return e;
	}
	disposeFramebufferObjects() {
		this._renderTarget?.dispose(!0);
	}
	releaseInternalTexture() {
		this._renderTarget?.releaseTextures(), this._texture = null;
	}
	dispose() {
		this.onResizeObservable.clear(), this.onClearObservable.clear(), this.onAfterUnbindObservable.clear(), this.onBeforeBindObservable.clear(), this._postProcessManager &&= (this._postProcessManager.dispose(), null), this._prePassRenderTarget && this._prePassRenderTarget.dispose(), this._objectRenderer.onBeforeRenderingManagerRenderObservable.remove(this._onBeforeRenderingManagerRenderObserver), this._objectRenderer.onAfterRenderingManagerRenderObservable.remove(this._onAfterRenderingManagerRenderObserver), this._objectRenderer.onFastPathRenderObservable.remove(this._onFastPathRenderObserver), this._dontDisposeObjectRenderer || this._objectRenderer.dispose(), this.clearPostProcesses(!0), this._resizeObserver &&= (this.getScene().getEngine().onResizeObservable.remove(this._resizeObserver), null);
		let e = this.getScene();
		if (!e) return;
		let t = e.customRenderTargets.indexOf(this);
		t >= 0 && e.customRenderTargets.splice(t, 1);
		for (let n of e.cameras) t = n.customRenderTargets.indexOf(this), t >= 0 && n.customRenderTargets.splice(t, 1);
		this._renderTarget?.dispose(), this._renderTarget = null, this._texture = null, super.dispose();
	}
	_rebuild() {
		this._objectRenderer._rebuild(), this._postProcessManager && this._postProcessManager._rebuild();
	}
	freeRenderingGroups() {
		this._objectRenderer.freeRenderingGroups();
	}
	getViewCount() {
		return 1;
	}
};
I.REFRESHRATE_RENDER_ONCE = F.REFRESHRATE_RENDER_ONCE, I.REFRESHRATE_RENDER_ONEVERYFRAME = F.REFRESHRATE_RENDER_ONEVERYFRAME, I.REFRESHRATE_RENDER_ONEVERYTWOFRAMES = F.REFRESHRATE_RENDER_ONEVERYTWOFRAMES, E._CreateRenderTargetTexture = (e, t, n, r, i) => new I(e, t, n, r);
//#endregion
//#region node_modules/@babylonjs/core/Materials/effectRenderer.js
var L = {
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
}, R = class {
	constructor(e, t = L) {
		this._fullscreenViewport = new D(0, 0, 1, 1);
		let n = t.positions ?? L.positions, r = t.indices ?? L.indices;
		this.engine = e, this._vertexBuffers = { [O.PositionKind]: new O(e, n, O.PositionKind, !1, !1, 2) }, this._indexBuffer = e.createIndexBuffer(r), this._indexBufferLength = r.length, this._onContextRestoredObserver = e.onContextRestoredObservable.add(() => {
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
		let e = this._vertexBuffers[O.PositionKind];
		e && (e.dispose(), delete this._vertexBuffers[O.PositionKind]), this._indexBuffer && this.engine._releaseBuffer(this._indexBuffer), this._onContextRestoredObserver &&= (this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver), null);
	}
}, z = class t {
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
		})), this._drawWrapper = new k(this.options.engine), this._webGPUReady = this.options.shaderLanguage === 1;
		let n = Array.isArray(this.options.defines) ? this.options.defines.join("\n") : this.options.defines;
		this._postConstructor(this.options.blockCompilation, n, this.options.extraInitializations);
	}
	_gatherImports(e = !1, t) {}
	_postConstructor(e, n = null, r, i) {
		this._importPromises.length = 0, i && this._importPromises.push(...i);
		let a = this.options.engine.isWebGPU && !t.ForceGLSL;
		this._gatherImports(a, this._importPromises), r !== void 0 && r(a, this._importPromises), a && this._webGPUReady && (this.options.shaderLanguage = 1), e || this.updateEffect(n);
	}
	updateEffect(e = null, r = null, i = null, a, o, s, c, l) {
		let u = t._GetShaderCodeProcessing(this.name);
		if (u?.defineCustomBindings) {
			let t = r?.slice() ?? [];
			t.push(...this.options.uniforms);
			let n = i?.slice() ?? [];
			n.push(...this.options.samplers), e = u.defineCustomBindings(this.name, e, t, n), r = t, i = n;
		}
		this.options.defines = e || "";
		let d = this._shadersLoaded || this._importPromises.length === 0 ? void 0 : async () => {
			await Promise.all(this._importPromises), this._shadersLoaded = !0;
		}, f;
		f = this.options.extraInitializationsAsync ? async () => {
			d?.(), await this.options.extraInitializationsAsync();
		} : d, this.options.useShaderStore ? this._drawWrapper.effect = this.options.engine.createEffect({
			vertex: c ?? this._shaderPath.vertex,
			fragment: l ?? this._shaderPath.fragment
		}, {
			attributes: this.options.attributeNames,
			uniformsNames: r || this.options.uniforms,
			uniformBuffersNames: this.options.uniformBuffers,
			samplers: i || this.options.samplers,
			defines: e === null ? "" : e,
			fallbacks: null,
			onCompiled: o ?? this.options.onCompiled,
			onError: s ?? null,
			indexParameters: a || this.options.indexParameters,
			processCodeAfterIncludes: u?.processCodeAfterIncludes ? (e, t) => u.processCodeAfterIncludes(this.name, e, t) : null,
			processFinalCode: u?.processFinalCode ? (e, t) => u.processFinalCode(this.name, e, t) : null,
			shaderLanguage: this.options.shaderLanguage,
			extraInitializationsAsync: f
		}, this.options.engine) : this._drawWrapper.effect = new n(this._shaderPath, this.options.attributeNames, r || this.options.uniforms, i || this.options.samplerNames, this.options.engine, e, void 0, o || this.options.onCompiled, void 0, void 0, void 0, this.options.shaderLanguage, f), this.onEffectCreatedObservable.notifyObservers(this._drawWrapper.effect);
	}
	bind(e = !1) {
		this.options.useAsPostProcess && !e && (this.options.engine.setAlphaMode(this.alphaMode), this.drawWrapper.effect.setFloat2("scale", 1, 1)), t._GetShaderCodeProcessing(this.name)?.bindCustomBindings?.(this.name, this._drawWrapper.effect);
	}
	dispose(e = !1) {
		this._onContextRestoredObserver &&= (this.effect.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver), null), this.onEffectCreatedObservable.clear(), this._drawWrapper.dispose(!0);
	}
};
z.ForceGLSL = !1, z._CustomShaderCodeProcessing = {}, a.prototype.setTextureFromPostProcess = function(e, t, n) {
	let r = null;
	t && (t._forcedOutputTexture ? r = t._forcedOutputTexture : t._textures.data[t._currentRenderTextureInd] && (r = t._textures.data[t._currentRenderTextureInd])), this._bindTexture(e, r?.texture ?? null, n);
}, a.prototype.setTextureFromPostProcessOutput = function(e, t, n) {
	this._bindTexture(e, t?._outputTexture?.texture ?? null, n);
}, n.prototype.setTextureFromPostProcess = function(e, t) {
	this._engine.setTextureFromPostProcess(this._samplers[e], t, e);
}, n.prototype.setTextureFromPostProcessOutput = function(e, t) {
	this._engine.setTextureFromPostProcessOutput(this._samplers[e], t, e);
};
var B = class n {
	static get ForceGLSL() {
		return z.ForceGLSL;
	}
	static set ForceGLSL(e) {
		z.ForceGLSL = e;
	}
	static RegisterShaderCodeProcessing(e, t) {
		z.RegisterShaderCodeProcessing(e, t);
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
	constructor(t, r, i, a, o, s, l = 1, u, d, f = null, p = 0, m = "postprocess", h, g = !1, v = 5, y, b) {
		this._parentContainer = null, this.width = -1, this.height = -1, this.nodeMaterialSource = null, this._outputTexture = null, this.autoClear = !0, this.forceAutoClearInAlphaMode = !1, this.animations = [], this.enablePixelPerfectMode = !1, this.forceFullscreenViewport = !0, this.scaleMode = 1, this.alwaysForcePOT = !1, this._samples = 1, this.adaptScaleToCurrentViewport = !1, this.doNotSerialize = !1, this._webGPUReady = !1, this._reusable = !1, this._renderId = 0, this.externalTextureSamplerBinding = !1, this._textures = new c(2), this._textureCache = [], this._currentRenderTextureInd = 0, this._scaleRatio = new _(1, 1), this._texelSize = _.Zero(), this.onActivateObservable = new e(), this.onSizeChangedObservable = new e(), this.onApplyObservable = new e(), this.onBeforeRenderObservable = new e(), this.onAfterRenderObservable = new e(), this.onDisposeObservable = new e();
		let x = 1, S = null, C;
		if (i && !Array.isArray(i)) {
			let e = i;
			i = e.uniforms ?? null, a = e.samplers ?? null, x = e.size ?? 1, s = e.camera ?? null, l = e.samplingMode ?? 1, u = e.engine, d = e.reusable, f = Array.isArray(e.defines) ? e.defines.join("\n") : e.defines ?? null, p = e.textureType ?? 0, m = e.vertexUrl ?? "postprocess", h = e.indexParameters, g = e.blockCompilation ?? !1, v = e.textureFormat ?? 5, y = e.shaderLanguage ?? 0, S = e.uniformBuffers ?? null, b = e.extraInitializations, C = e.effectWrapper;
		} else o && (x = typeof o == "number" ? o : {
			width: o.width,
			height: o.height
		});
		if (this._useExistingThinPostProcess = !!C, this._effectWrapper = C ?? new z({
			name: t,
			useShaderStore: !0,
			useAsPostProcess: !0,
			fragmentShader: r,
			engine: u || s?.getScene().getEngine(),
			uniforms: i,
			samplers: a,
			uniformBuffers: S,
			defines: f,
			vertexUrl: m,
			indexParameters: h,
			blockCompilation: !0,
			shaderLanguage: y,
			extraInitializations: void 0
		}), this.name = t, this.onEffectCreatedObservable = this._effectWrapper.onEffectCreatedObservable, s == null ? u && (this._engine = u, this._engine.postProcesses.push(this)) : (this._camera = s, this._scene = s.getScene(), s.attachPostProcess(this), this._engine = this._scene.getEngine(), this._scene.addPostProcess(this), this.uniqueId = this._scene.getUniqueId()), this._options = x, this.renderTargetSamplingMode = l || 1, this._reusable = d || !1, this._textureType = p, this._textureFormat = v, this._shaderLanguage = y || 0, this._samplers = a || [], this._samplers.indexOf("textureSampler") === -1 && this._samplers.push("textureSampler"), this._fragmentUrl = r, this._vertexUrl = m, this._parameters = i || [], this._parameters.indexOf("scale") === -1 && this._parameters.push("scale"), this._uniformBuffers = S || [], this._indexParameters = h, !this._useExistingThinPostProcess) {
			this._webGPUReady = this._shaderLanguage === 1;
			let e = [];
			this._gatherImports(this._engine.isWebGPU && !n.ForceGLSL, e), this._effectWrapper._webGPUReady = this._webGPUReady, this._effectWrapper._postConstructor(g, f, b, e);
		}
	}
	_gatherImports(e = !1, t) {
		e && this._webGPUReady ? t.push(Promise.all([import("./postprocess.vertex-6eCiY1T2.js").then((e) => e.t)])) : t.push(Promise.all([import("./postprocess.vertex-BEsMxXeV.js").then((e) => e.t)]));
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
		this._textures.length == 0 && (this._textures = new c(2)), this._shareOutputWithPostProcess = null;
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
	activate(e, n = null, r) {
		let i = e === null || e.cameraRigMode !== void 0 ? e || this._camera : null, a = i?.getScene() ?? e, o = a.getEngine(), s = o.getCaps().maxTextureSize, c = (n ? n.width : this._engine.getRenderWidth(!0)) * this._options | 0, l = (n ? n.height : this._engine.getRenderHeight(!0)) * this._options | 0, u = this._options.width || c, d = this._options.height || l, f = this.renderTargetSamplingMode !== 7 && this.renderTargetSamplingMode !== 1 && this.renderTargetSamplingMode !== 2, p = null;
		if (!this._shareOutputWithPostProcess && !this._forcedOutputTexture) {
			if (this.adaptScaleToCurrentViewport) {
				let e = o.currentViewport;
				e && (u *= e.width, d *= e.height);
			}
			(f || this.alwaysForcePOT) && (this._options.width || (u = o.needPOTTextures ? t(u, s, this.scaleMode) : u), this._options.height || (d = o.needPOTTextures ? t(d, s, this.scaleMode) : d)), (this.width !== u || this.height !== d || !(p = this._getTarget())) && this.resize(u, d, i, f, r), this._textures.forEach((e) => {
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
		let e = T.Serialize(this), t = this.getCamera() || this._scene && this._scene.activeCamera;
		return e.customType = "BABYLON." + this.getClassName(), e.cameraId = t ? t.id : null, e.reusable = this._reusable, e.textureType = this._textureType, e.fragmentUrl = this._fragmentUrl, e.parameters = this._parameters, e.samplers = this._samplers, e.uniformBuffers = this._uniformBuffers, e.options = this._options, e.defines = this._postProcessDefines, e.textureFormat = this._textureFormat, e.vertexUrl = this._vertexUrl, e.indexParameters = this._indexParameters, e;
	}
	clone() {
		let e = this.serialize();
		e._engine = this._engine, e.cameraId = null;
		let t = n.Parse(e, this._scene, "");
		return t ? (t.onActivateObservable = this.onActivateObservable.clone(), t.onSizeChangedObservable = this.onSizeChangedObservable.clone(), t.onApplyObservable = this.onApplyObservable.clone(), t.onBeforeRenderObservable = this.onBeforeRenderObservable.clone(), t.onAfterRenderObservable = this.onAfterRenderObservable.clone(), t._prePassEffectConfiguration = this._prePassEffectConfiguration, t) : null;
	}
	static Parse(e, t, n) {
		let r = S(e.customType);
		if (!r || !r._Parse) return null;
		let i = t ? t.getCameraById(e.cameraId) : null;
		return r._Parse(e, i, t, n);
	}
	static _Parse(e, t, r, i) {
		return T.Parse(() => new n(e.name, e.fragmentUrl, e.parameters, e.samplers, e.options, t, e.renderTargetSamplingMode, e._engine, e.reusable, e.defines, e.textureType, e.vertexUrl, e.indexParameters, !1, e.textureFormat), e, r, i);
	}
};
j([M()], B.prototype, "uniqueId", void 0), j([M()], B.prototype, "name", null), j([M()], B.prototype, "width", void 0), j([M()], B.prototype, "height", void 0), j([M()], B.prototype, "renderTargetSamplingMode", void 0), j([A()], B.prototype, "clearColor", void 0), j([M()], B.prototype, "autoClear", void 0), j([M()], B.prototype, "forceAutoClearInAlphaMode", void 0), j([M()], B.prototype, "alphaMode", null), j([M()], B.prototype, "alphaConstants", void 0), j([M()], B.prototype, "enablePixelPerfectMode", void 0), j([M()], B.prototype, "forceFullscreenViewport", void 0), j([M()], B.prototype, "scaleMode", void 0), j([M()], B.prototype, "alwaysForcePOT", void 0), j([M("samples")], B.prototype, "_samples", void 0), j([M()], B.prototype, "adaptScaleToCurrentViewport", void 0), x("BABYLON.PostProcess", B);
//#endregion
//#region node_modules/@babylonjs/core/PostProcesses/thinPassPostProcess.js
var V = class e extends z {
	_gatherImports(e, t) {
		e ? (this._webGPUReady = !0, t.push(Promise.all([import("./pass.fragment-DModQby-.js")]))) : t.push(Promise.all([import("./pass.fragment-DUzd5yX2.js")])), super._gatherImports(e, t);
	}
	constructor(t, n = null, r) {
		let i = {
			name: t,
			engine: n || p.LastCreatedEngine,
			useShaderStore: !0,
			useAsPostProcess: !0,
			fragmentShader: e.FragmentUrl,
			...r
		};
		i.engine ||= p.LastCreatedEngine, super(i);
	}
};
V.FragmentUrl = "pass";
var H = class e extends z {
	_gatherImports(e, t) {
		e ? (this._webGPUReady = !0, t.push(Promise.all([import("./passCube.fragment-BukVk-Dy.js")]))) : t.push(Promise.all([import("./passCube.fragment-Ajj0ucFp.js")])), super._gatherImports(e, t);
	}
	constructor(t, n = null, r) {
		super({
			...r,
			name: t,
			engine: n || p.LastCreatedEngine,
			useShaderStore: !0,
			useAsPostProcess: !0,
			fragmentShader: e.FragmentUrl,
			defines: "#define POSITIVEX"
		}), this._face = 0;
	}
	get face() {
		return this._face;
	}
	set face(e) {
		if (!(e < 0 || e > 5)) switch (this._face = e, this._face) {
			case 0:
				this.updateEffect("#define POSITIVEX");
				break;
			case 1:
				this.updateEffect("#define NEGATIVEX");
				break;
			case 2:
				this.updateEffect("#define POSITIVEY");
				break;
			case 3:
				this.updateEffect("#define NEGATIVEY");
				break;
			case 4:
				this.updateEffect("#define POSITIVEZ");
				break;
			case 5: this.updateEffect("#define NEGATIVEZ");
		}
	}
};
H.FragmentUrl = "passCube";
//#endregion
//#region node_modules/@babylonjs/core/PostProcesses/passPostProcess.js
var U = class e extends B {
	getClassName() {
		return "PassPostProcess";
	}
	constructor(e, t, n = null, r, i, a, o = 0, s = !1) {
		let c = {
			size: typeof t == "number" ? t : void 0,
			camera: n,
			samplingMode: r,
			engine: i,
			reusable: a,
			textureType: o,
			blockCompilation: s,
			...t
		};
		super(e, V.FragmentUrl, {
			effectWrapper: typeof t == "number" || !t.effectWrapper ? new V(e, i, c) : void 0,
			...c
		});
	}
	static _Parse(t, n, r, i) {
		return T.Parse(() => new e(t.name, t.options, n, t.renderTargetSamplingMode, t._engine, t.reusable), t, r, i);
	}
};
x("BABYLON.PassPostProcess", U);
var W = class e extends B {
	get face() {
		return this._effectWrapper.face;
	}
	set face(e) {
		this._effectWrapper.face = e;
	}
	getClassName() {
		return "PassCubePostProcess";
	}
	constructor(e, t, n = null, r, i, a, o = 0, s = !1) {
		let c = {
			size: typeof t == "number" ? t : void 0,
			camera: n,
			samplingMode: r,
			engine: i,
			reusable: a,
			textureType: o,
			blockCompilation: s,
			...t
		};
		super(e, V.FragmentUrl, {
			effectWrapper: typeof t == "number" || !t.effectWrapper ? new H(e, i, c) : void 0,
			...c
		});
	}
	static _Parse(t, n, r, i) {
		return T.Parse(() => new e(t.name, t.options, n, t.renderTargetSamplingMode, t._engine, t.reusable), t, r, i);
	}
};
j([M()], W.prototype, "face", null), a._RescalePostProcessFactory = (e) => new U("rescale", 1, null, 2, e, !1, 0);
//#endregion
//#region node_modules/@babylonjs/core/Misc/textureTools.js
var G, K;
function q(e) {
	G || (G = /* @__PURE__ */ new Float32Array(1), K = new Int32Array(G.buffer)), G[0] = e;
	let t = K[0], n = t >> 16 & 32768, r = t >> 12 & 2047, i = t >> 23 & 255;
	return i < 103 ? n : i > 142 ? (n |= 31744, n |= (i == 255 ? 0 : 1) && t & 8388607, n) : i < 113 ? (r |= 2048, n |= (r >> 114 - i) + (r >> 113 - i & 1), n) : (n |= i - 112 << 10 | r >> 1, n += r & 1, n);
}
function J(e) {
	let t = (e & 32768) >> 15, n = (e & 31744) >> 10, r = e & 1023;
	return n === 0 ? (t ? -1 : 1) * 2 ** -14 * (r / 1024) : n == 31 ? r ? NaN : (t ? -1 : 1) * Infinity : (t ? -1 : 1) * 2 ** (n - 15) * (1 + r / 1024);
}
//#endregion
export { z as a, R as i, q as n, P as o, B as r, J as t };

//# sourceMappingURL=textureTools-DeUtSqU_.js.map