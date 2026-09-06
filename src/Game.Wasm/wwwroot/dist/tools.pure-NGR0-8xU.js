import { i as e, o as t, s as n } from "./halfFloat-LObL5q18.js";
import { t as r } from "./logger-DQIzSR_y.js";
import { D as i, O as a, T as o, c as s, g as c, h as l, l as u, r as d, s as f, w as p } from "./bufferUtils-D__onkuC.js";
//#region node_modules/@babylonjs/core/Misc/webRequest.js
function m() {
	return typeof _native < "u" && _native.XMLHttpRequest ? new _native.XMLHttpRequest() : new XMLHttpRequest();
}
var h = class e {
	constructor() {
		this._xhr = m(), this._requestURL = "";
	}
	static get IsCustomRequestAvailable() {
		return Object.keys(e.CustomRequestHeaders).length > 0 || e.CustomRequestModifiers.length > 0;
	}
	static _CleanUrl(e) {
		return e = e.replace("file:http:", "http:"), e = e.replace("file:https:", "https:"), e;
	}
	static _ShouldSkipRequestModifications(t) {
		return e.SkipRequestModificationForBabylonCDN && (t.includes("preview.babylonjs.com") || t.includes("cdn.babylonjs.com"));
	}
	static _CollectCustomizations(t, n = {}) {
		let r = { ...n };
		if (e._ShouldSkipRequestModifications(t)) return {
			url: t,
			headers: r
		};
		for (let t in e.CustomRequestHeaders) {
			let n = e.CustomRequestHeaders[t];
			n && (r[t] = n);
		}
		let i = { setRequestHeader: (e, t) => {
			r[e] = t;
		} };
		for (let n of e.CustomRequestModifiers) {
			if (e._ShouldSkipRequestModifications(t)) break;
			let r = n(i, t);
			typeof r == "string" && (t = r);
		}
		return {
			url: t,
			headers: r
		};
	}
	static async FetchAsync(t, n = {}) {
		let r = n.method ?? "GET";
		if (typeof fetch < "u") {
			let { url: i, headers: a } = e._CollectCustomizations(e._CleanUrl(t), n.headers ?? {});
			return await fetch(i, {
				method: r,
				headers: a,
				body: n.body ?? void 0
			});
		}
		return await new Promise((i, a) => {
			let o = new e();
			o.responseType = "arraybuffer", o.addEventListener("readystatechange", () => {
				if (o.readyState === 4) {
					if (o.status >= 200 && o.status < 300) {
						let e = typeof Headers < "u" ? new Headers() : void 0, t = o.getResponseHeader("Content-Type");
						t && e && e.set("Content-Type", t), i(typeof Response < "u" ? new Response(o.response, {
							status: o.status,
							statusText: o.statusText,
							headers: e
						}) : {
							ok: !0,
							status: o.status,
							statusText: o.statusText,
							headers: { get: (e) => o.getResponseHeader(e) },
							arrayBuffer: async () => await Promise.resolve(o.response)
						});
					} else a(/* @__PURE__ */ Error(`HTTP ${o.status} loading '${o.requestURL}': ${o.statusText}`));
				}
			}), o.open(r, t, n.headers), o.send(n.body ?? null);
		});
	}
	get requestURL() {
		return this._requestURL;
	}
	get onprogress() {
		return this._xhr.onprogress;
	}
	set onprogress(e) {
		this._xhr.onprogress = e;
	}
	get readyState() {
		return this._xhr.readyState;
	}
	get status() {
		return this._xhr.status;
	}
	get statusText() {
		return this._xhr.statusText;
	}
	get response() {
		return this._xhr.response;
	}
	get responseURL() {
		return this._xhr.responseURL;
	}
	get responseText() {
		return this._xhr.responseText;
	}
	get responseType() {
		return this._xhr.responseType;
	}
	set responseType(e) {
		this._xhr.responseType = e;
	}
	get timeout() {
		return this._xhr.timeout;
	}
	set timeout(e) {
		this._xhr.timeout = e;
	}
	addEventListener(e, t, n) {
		this._xhr.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		this._xhr.removeEventListener(e, t, n);
	}
	abort() {
		this._xhr.abort();
	}
	send(e) {
		this._xhr.send(e);
	}
	open(t, n, r) {
		let { url: i, headers: a } = e._CollectCustomizations(n, r);
		this._requestURL = e._CleanUrl(i), this._xhr.open(t, this._requestURL, !0);
		for (let e in a) this._xhr.setRequestHeader(e, a[e]);
	}
	setRequestHeader(e, t) {
		this._xhr.setRequestHeader(e, t);
	}
	getResponseHeader(e) {
		return this._xhr.getResponseHeader(e);
	}
};
h.CustomRequestHeaders = {}, h.CustomRequestModifiers = [], h.SkipRequestModificationForBabylonCDN = !0;
//#endregion
//#region node_modules/@babylonjs/core/Misc/filesInputStore.js
var g = class {};
g.FilesToLoad = {};
//#endregion
//#region node_modules/@babylonjs/core/Misc/retryStrategy.js
var _ = class {
	static ExponentialBackoff(e = 3, t = 500) {
		return (n, r, i) => r.status !== 0 || i >= e || n.indexOf("file:") !== -1 ? -1 : 2 ** i * t;
	}
}, v = class extends Error {};
v._setPrototypeOf = Object.setPrototypeOf || ((e, t) => (e.__proto__ = t, e));
var y = {
	MeshInvalidPositionsError: 0,
	UnsupportedTextureError: 1e3,
	GLTFLoaderUnexpectedMagicError: 2e3,
	SceneLoaderError: 3e3,
	LoadFileError: 4e3,
	RequestFileError: 4001,
	ReadFileError: 4002
}, b = class e extends v {
	constructor(t, n, r) {
		super(t), this.errorCode = n, this.innerError = r, this.name = "RuntimeError", v._setPrototypeOf(this, e.prototype);
	}
};
//#endregion
//#region node_modules/@babylonjs/core/Misc/stringTools.js
function x(e) {
	let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = "", r, i, a, o, s, c, l, u = 0;
	for (; u < e.length;) r = e[u++], i = u < e.length ? e[u++] : NaN, a = u < e.length ? e[u++] : NaN, o = r >> 2, s = (r & 3) << 4 | i >> 4, c = (i & 15) << 2 | a >> 6, l = a & 63, isNaN(i) ? c = l = 64 : isNaN(a) && (l = 64), n += t.charAt(o) + t.charAt(s) + t.charAt(c) + t.charAt(l);
	return n;
}
function S(e) {
	let t = w(e), n = t.length, r = new Uint8Array(new ArrayBuffer(n));
	for (let e = 0; e < n; e++) r[e] = t.charCodeAt(e);
	return r.buffer;
}
var C = (e) => {
	let t = ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e);
	return typeof t.toBase64 == "function" ? t.toBase64() : x(t);
}, w = (e) => atob(e), T = (e) => typeof Uint8Array.fromBase64 == "function" ? Uint8Array.fromBase64(e).buffer : S(e), E = /*#__PURE__*/ new RegExp(/^data:([^,]+\/[^,]+)?;base64,/i), D = class e extends b {
	constructor(t, n) {
		super(t, y.LoadFileError), this.name = "LoadFileError", v._setPrototypeOf(this, e.prototype), n instanceof h ? this.request = n : this.file = n;
	}
}, O = class e extends b {
	constructor(t, n) {
		super(t, y.RequestFileError), this.request = n, this.name = "RequestFileError", v._setPrototypeOf(this, e.prototype);
	}
}, k = class e extends b {
	constructor(t, n) {
		super(t, y.ReadFileError), this.file = n, this.name = "ReadFileError", v._setPrototypeOf(this, e.prototype);
	}
}, A = {
	DefaultRetryStrategy: _.ExponentialBackoff(),
	BaseUrl: "",
	CorsBehavior: "anonymous",
	PreprocessUrl: (e) => e,
	ScriptBaseUrl: "",
	ScriptPreprocessUrl: (e) => e,
	CleanUrl: (e) => (e = e.replace(/#/gm, "%23"), e)
}, j = (e, t) => {
	if (!(e && e.indexOf("data:") === 0) && A.CorsBehavior) {
		if (typeof A.CorsBehavior == "string" || A.CorsBehavior instanceof String) t.crossOrigin = A.CorsBehavior;
		else {
			let n = A.CorsBehavior(e);
			n && (t.crossOrigin = n);
		}
	}
}, M = { getRequiredSize: null }, N = (e, n, r, i, a = "", o, s = t.LastCreatedEngine) => {
	if (typeof HTMLImageElement > "u" && !s?._features.forceBitmapOverHTMLImageElement) return r("LoadImage is only supported in web or BabylonNative environments."), null;
	let c, l = !1;
	if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) {
		if (typeof Blob < "u" && typeof URL < "u") {
			let t;
			t = e instanceof ArrayBuffer ? e : d(e), c = URL.createObjectURL(new Blob([t], { type: a })), l = !0;
		} else c = `data:${a};base64,` + C(e);
	} else e instanceof Blob ? (c = URL.createObjectURL(e), l = !0) : (c = A.CleanUrl(e), c = A.PreprocessUrl(c));
	let u = (t) => {
		if (r) {
			let n = c || e.toString();
			r(`Error while trying to load image: ${n.indexOf("http") === 0 || n.length <= 128 ? n : n.slice(0, 128) + "..."}`, t);
		}
	};
	if (s?._features.forceBitmapOverHTMLImageElement) return F(c, (t) => {
		s.createImageBitmap(new Blob([t], { type: a }), {
			premultiplyAlpha: "none",
			colorSpaceConversion: "none",
			...o
		}).then((e) => {
			n(e), l && URL.revokeObjectURL(c);
		}).catch((t) => {
			r && r("Error while trying to load image: " + e, t);
		});
	}, void 0, i || void 0, !0, (e, t) => {
		u(t);
	}), null;
	let f = new Image();
	if (M.getRequiredSize) {
		let t = M.getRequiredSize(e);
		t.width && (f.width = t.width), t.height && (f.height = t.height);
	}
	j(c, f);
	let p = [], m = () => {
		for (let e of p) e.target.addEventListener(e.name, e.handler);
	}, _ = () => {
		for (let e of p) e.target.removeEventListener(e.name, e.handler);
		p.length = 0;
	};
	p.push({
		target: f,
		name: "load",
		handler: () => {
			_(), n(f), l && f.src && URL.revokeObjectURL(f.src);
		}
	}), p.push({
		target: f,
		name: "error",
		handler: (e) => {
			_(), u(e), l && f.src && URL.revokeObjectURL(f.src);
		}
	}), p.push({
		target: document,
		name: "securitypolicyviolation",
		handler: (e) => {
			if (e.blockedURI !== f.src || e.disposition === "report") return;
			_();
			let n = /* @__PURE__ */ Error(`CSP violation of policy ${e.effectiveDirective} ${e.blockedURI}. Current policy is ${e.originalPolicy}`);
			t.UseFallbackTexture = !1, u(n), l && f.src && URL.revokeObjectURL(f.src), f.src = "";
		}
	}), m();
	let v = c.substring(0, 5) === "blob:", y = c.substring(0, 5) === "data:", b = () => {
		v || y || !h.IsCustomRequestAvailable ? f.src = c : F(c, (e, t, n) => {
			let r = new Blob([e], { type: !a && n ? n : a }), i = URL.createObjectURL(r);
			l = !0, f.src = i;
		}, void 0, i || void 0, !0, (e, t) => {
			u(t);
		});
	}, x = () => {
		i && i.loadImage(c, f);
	};
	if (!v && !y && i && i.enableTexturesOffline) i.open(x, b);
	else {
		if (c.indexOf("file:") !== -1) {
			let e = decodeURIComponent(c.substring(5).toLowerCase());
			if (g.FilesToLoad[e] && typeof URL < "u") {
				try {
					let t;
					try {
						t = URL.createObjectURL(g.FilesToLoad[e]);
					} catch {
						t = URL.createObjectURL(g.FilesToLoad[e]);
					}
					f.src = t, l = !0;
				} catch {
					f.src = "";
				}
				return f;
			}
		}
		b();
	}
	return f;
}, P = (e, t, r, i, a) => {
	let o = new FileReader(), s = {
		onCompleteObservable: new n(),
		abort: () => o.abort()
	};
	return o.onloadend = () => s.onCompleteObservable.notifyObservers(s), a && (o.onerror = () => {
		a(new k(`Unable to read ${e.name}`, e));
	}), o.onload = (e) => {
		t(e.target.result);
	}, r && (o.onprogress = r), i ? o.readAsArrayBuffer(e) : o.readAsText(e), s;
}, F = (e, t, i, a, o, s, c) => {
	if (e.name) return P(e, t, i, o, s ? (e) => {
		s(void 0, e);
	} : void 0);
	let l = e;
	if (l.indexOf("file:") !== -1) {
		let e = decodeURIComponent(l.substring(5).toLowerCase());
		e.indexOf("./") === 0 && (e = e.substring(2));
		let n = g.FilesToLoad[e];
		if (n) return P(n, t, i, o, s ? (e) => s(void 0, new D(e.message, e.file)) : void 0);
	}
	let { match: d, type: f } = z(l);
	if (d) {
		let e = {
			onCompleteObservable: new n(),
			abort: () => () => {}
		};
		try {
			t(o ? B(l) : V(l), void 0, f);
		} catch (e) {
			s ? s(void 0, e) : r.Error(e.message || "Failed to parse the Data URL");
		}
		return u.SetImmediate(() => {
			e.onCompleteObservable.notifyObservers(e);
		}), e;
	}
	return I(l, (e, n) => {
		t(e, n?.responseURL, n?.getResponseHeader("content-type"));
	}, i, a, o, s ? (e) => {
		s(e.request, new D(e.message, e.request));
	} : void 0, c);
}, I = (e, i, o, s, c, l, u) => {
	s !== null && (s ??= t.LastCreatedScene?.offlineProvider), e = A.CleanUrl(e), e = A.PreprocessUrl(e);
	let d = A.BaseUrl + e, f = !1, p = {
		onCompleteObservable: new n(),
		abort: () => f = !0
	}, m = () => {
		let e = new h(), t = null, n, s = () => {
			e && (o && e.removeEventListener("progress", o), n && e.removeEventListener("readystatechange", n), e.removeEventListener("loadend", m));
		}, m = () => {
			s(), p.onCompleteObservable.notifyObservers(p), p.onCompleteObservable.clear(), o = void 0, n = null, m = null, l = void 0, u = void 0, i = void 0;
		};
		p.abort = () => {
			f = !0, m && m(), e && e.readyState !== (XMLHttpRequest.DONE || 4) && e.abort(), t !== null && (clearTimeout(t), t = null), e = null;
		};
		let g = (t) => {
			let n = t.message || "Unknown error";
			l && e ? l(new O(n, e)) : r.Error(n);
		}, _ = (r) => {
			if (e) {
				if (e.open("GET", d), u) try {
					u(e);
				} catch (e) {
					g(e);
					return;
				}
				c && (e.responseType = "arraybuffer"), o && e.addEventListener("progress", o), m && e.addEventListener("loadend", m), n = () => {
					if (!(f || !e) && e.readyState === (XMLHttpRequest.DONE || 4)) {
						if (n && e.removeEventListener("readystatechange", n), e.status >= 200 && e.status < 300 || e.status === 0 && (!a() || L())) {
							let t = c ? e.response : e.responseText;
							if (t !== null) {
								try {
									i && i(t, e);
								} catch (e) {
									g(e);
								}
								return;
							}
						}
						let o = A.DefaultRetryStrategy;
						if (o) {
							let n = o(d, e, r);
							if (n !== -1) {
								s(), e = new h(), t = setTimeout(() => _(r + 1), n);
								return;
							}
						}
						let u = new O("Error status: " + e.status + " " + e.statusText + " - Unable to load " + d, e);
						l && l(u);
					}
				}, e.addEventListener("readystatechange", n), e.send();
			}
		};
		_(0);
	};
	if (s && s.enableSceneOffline && !e.startsWith("blob:")) {
		let t = (e) => {
			e && e.status > 400 ? l && l(e) : m();
		};
		s.open(() => {
			s && s.loadFile(A.BaseUrl + e, (e) => {
				!f && i && i(e), p.onCompleteObservable.notifyObservers(p);
			}, o ? (e) => {
				!f && o && o(e);
			} : void 0, t, c);
		}, t);
	} else m();
	return p;
}, L = () => typeof location < "u" && location.protocol === "file:", R = (e) => E.test(e), z = (e) => {
	let t = E.exec(e);
	return t === null || t.length === 0 ? {
		match: !1,
		type: ""
	} : {
		match: !0,
		type: t[0].replace("data:", "").replace(";base64,", "")
	};
};
function B(e) {
	return T(e.split(",")[1]);
}
var V = (e) => w(e.split(",")[1]), H, U = (e, t, n, r, i, a, o, s, c, l) => {
	H = {
		DecodeBase64UrlToBinary: e,
		DecodeBase64UrlToString: t,
		DefaultRetryStrategy: n.DefaultRetryStrategy,
		BaseUrl: n.BaseUrl,
		CorsBehavior: n.CorsBehavior,
		PreprocessUrl: n.PreprocessUrl,
		IsBase64DataUrl: r,
		IsFileURL: i,
		LoadFile: a,
		LoadImage: o,
		ReadFile: s,
		RequestFile: c,
		SetCorsBehavior: l
	}, Object.defineProperty(H, "DefaultRetryStrategy", {
		get: function() {
			return n.DefaultRetryStrategy;
		},
		set: function(e) {
			n.DefaultRetryStrategy = e;
		}
	}), Object.defineProperty(H, "BaseUrl", {
		get: function() {
			return n.BaseUrl;
		},
		set: function(e) {
			n.BaseUrl = e;
		}
	}), Object.defineProperty(H, "PreprocessUrl", {
		get: function() {
			return n.PreprocessUrl;
		},
		set: function(e) {
			n.PreprocessUrl = e;
		}
	}), Object.defineProperty(H, "CorsBehavior", {
		get: function() {
			return n.CorsBehavior;
		},
		set: function(e) {
			n.CorsBehavior = e;
		}
	});
}, W = !1;
function G() {
	W || (W = !0, U(B, V, A, R, L, F, N, P, I, j), c.loadFile = F, c.loadImage = N, l.loadFile = F);
}
//#endregion
//#region node_modules/@babylonjs/core/Misc/deepCopier.js
var K = (e, t, n) => !e || e.getClassName && e.getClassName() === "Mesh" ? null : e.getClassName && (e.getClassName() === "SubMesh" || e.getClassName() === "PhysicsBody") ? e.clone(t) : e.clone ? e.clone() : Array.isArray(e) ? e.slice() : n && typeof e == "object" ? { ...e } : null;
function q(e) {
	let t = [];
	do {
		let n = Object.getOwnPropertyNames(e);
		for (let e of n) t.indexOf(e) === -1 && t.push(e);
	} while (e = Object.getPrototypeOf(e));
	return t;
}
var J = class {
	static DeepCopy(e, t, n, i, a = !1) {
		let o = q(e);
		for (let s of o) {
			if (s[0] === "_" && (!i || i.indexOf(s) === -1) || s.endsWith("Observable") || n && n.indexOf(s) !== -1) continue;
			let o = e[s], c = typeof o;
			if (c !== "function") try {
				if (c === "object") {
					if (o instanceof Uint8Array) t[s] = Uint8Array.from(o);
					else if (o instanceof Array) {
						if (t[s] = [], o.length > 0) {
							if (typeof o[0] == "object") for (let e = 0; e < o.length; e++) {
								let n = K(o[e], t, a);
								t[s].indexOf(n) === -1 && t[s].push(n);
							}
							else t[s] = o.slice(0);
						}
					} else t[s] = K(o, t, a);
				} else t[s] = o;
			} catch (e) {
				r.Warn(e.message);
			}
		}
	}
}, Y = class {
	static Instantiate(t) {
		if (this.RegisteredExternalClasses && this.RegisteredExternalClasses[t]) return this.RegisteredExternalClasses[t];
		let n = e(t);
		if (n) return n;
		r.Warn(t + " not found, you may have missed an import.");
		let i = t.split("."), a = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : this;
		for (let e = 0, t = i.length; e < t; e++) a = a[i[e]];
		return typeof a == "function" ? a : null;
	}
};
Y.RegisteredExternalClasses = {};
//#endregion
//#region node_modules/@babylonjs/core/Misc/tools.pure.js
var X, Z = class {
	static get BaseUrl() {
		return A.BaseUrl;
	}
	static set BaseUrl(e) {
		A.BaseUrl = e;
	}
	static get CleanUrl() {
		return A.CleanUrl;
	}
	static set CleanUrl(e) {
		A.CleanUrl = e;
	}
	static IsAbsoluteUrl(e) {
		return e.indexOf("//") === 0 ? !0 : e.indexOf("://") === -1 || e.indexOf(".") === -1 || e.indexOf("/") === -1 || e.indexOf(":") > e.indexOf("/") ? !1 : e.indexOf("://") < e.indexOf(".") || e.indexOf("data:") === 0 || e.indexOf("blob:") === 0;
	}
	static set ScriptBaseUrl(e) {
		A.ScriptBaseUrl = e;
	}
	static get ScriptBaseUrl() {
		return A.ScriptBaseUrl;
	}
	static set CDNBaseUrl(e) {
		X.ScriptBaseUrl = e, X.AssetBaseUrl = e;
	}
	static set ScriptPreprocessUrl(e) {
		A.ScriptPreprocessUrl = e;
	}
	static get ScriptPreprocessUrl() {
		return A.ScriptPreprocessUrl;
	}
	static get DefaultRetryStrategy() {
		return A.DefaultRetryStrategy;
	}
	static set DefaultRetryStrategy(e) {
		A.DefaultRetryStrategy = e;
	}
	static get CorsBehavior() {
		return A.CorsBehavior;
	}
	static set CorsBehavior(e) {
		A.CorsBehavior = e;
	}
	static get UseFallbackTexture() {
		return t.UseFallbackTexture;
	}
	static set UseFallbackTexture(e) {
		t.UseFallbackTexture = e;
	}
	static get RegisteredExternalClasses() {
		return Y.RegisteredExternalClasses;
	}
	static set RegisteredExternalClasses(e) {
		Y.RegisteredExternalClasses = e;
	}
	static get fallbackTexture() {
		return t.FallbackTexture;
	}
	static set fallbackTexture(e) {
		t.FallbackTexture = e;
	}
	static FetchToRef(e, t, n, r, i, a) {
		let o = ((Math.abs(e) * n % n | 0) + (Math.abs(t) * r % r | 0) * n) * 4;
		a.r = i[o] / 255, a.g = i[o + 1] / 255, a.b = i[o + 2] / 255, a.a = i[o + 3] / 255;
	}
	static Mix(e, t, n) {
		return 0;
	}
	static Instantiate(e) {
		return Y.Instantiate(e);
	}
	static SetImmediate(e) {
		u.SetImmediate(e);
	}
	static IsExponentOfTwo(e) {
		return !0;
	}
	static FloatRound(e) {
		return Math.fround(e);
	}
	static GetFilename(e) {
		let t = e.lastIndexOf("/");
		return t < 0 ? e : e.substring(t + 1);
	}
	static GetFolderPath(e, t = !1) {
		let n = e.lastIndexOf("/");
		return n < 0 ? t ? e : "" : e.substring(0, n + 1);
	}
	static ToDegrees(e) {
		return e * 180 / Math.PI;
	}
	static ToRadians(e) {
		return e * Math.PI / 180;
	}
	static SmoothAngleChange(e, t, n = .9) {
		let r = this.ToRadians(e), i = this.ToRadians(t);
		return this.ToDegrees(Math.atan2((1 - n) * Math.sin(i) + n * Math.sin(r), (1 - n) * Math.cos(i) + n * Math.cos(r)));
	}
	static MakeArray(e, t) {
		return t !== !0 && (e === void 0 || e == null) ? null : Array.isArray(e) ? e : [e];
	}
	static GetPointerPrefix(e) {
		return a() && !window.PointerEvent ? "mouse" : "pointer";
	}
	static SetCorsBehavior(e, t) {
		j(e, t);
	}
	static SetReferrerPolicyBehavior(e, t) {
		t.referrerPolicy = e;
	}
	static get PreprocessUrl() {
		return A.PreprocessUrl;
	}
	static set PreprocessUrl(e) {
		A.PreprocessUrl = e;
	}
	static LoadImage(e, t, n, r, i, a) {
		return N(e, t, n, r, i, a);
	}
	static LoadFile(e, t, n, r, i, a) {
		return F(e, t, n, r, i, a);
	}
	static async LoadFileAsync(e, t = !0) {
		return await new Promise((n, r) => {
			F(e, (e) => {
				n(e);
			}, void 0, void 0, t, (e, t) => {
				r(t);
			});
		});
	}
	static GetAssetUrl(e) {
		if (!e) return "";
		if (X.AssetBaseUrl && e.startsWith(X._DefaultAssetsUrl)) {
			let t = X.AssetBaseUrl.endsWith("/") ? X.AssetBaseUrl.slice(0, -1) : X.AssetBaseUrl;
			return e.replace(X._DefaultAssetsUrl, t);
		}
		return e;
	}
	static GetBabylonScriptURL(e, t) {
		if (!e) return "";
		if (e.startsWith(X._DefaultCdnUrl)) {
			if (X.ScriptBaseUrl) {
				let t = X.ScriptBaseUrl.endsWith("/") ? X.ScriptBaseUrl.slice(0, -1) : X.ScriptBaseUrl;
				e = e.replace(X._DefaultCdnUrl, t);
			} else if (X._CdnVersion) {
				let t = `${X._DefaultCdnUrl}/v${X._CdnVersion}`;
				e.startsWith(t) || (e = e.replace(X._DefaultCdnUrl, t));
			}
		}
		return e = X.ScriptPreprocessUrl(e), t && !X.IsAbsoluteUrl(e) && (e = X.GetAbsoluteUrl(e)), e;
	}
	static LoadBabylonScript(e, t, n, r) {
		e = X.GetBabylonScriptURL(e), X.LoadScript(e, t, n);
	}
	static async LoadBabylonScriptAsync(e) {
		return e = X.GetBabylonScriptURL(e), await X.LoadScriptAsync(e);
	}
	static _LoadScriptNative(e, t, n, r, i = !1) {
		if (_native) {
			if (i) {
				let e = "Loading a script as an ES module is not supported in Babylon Native";
				n?.(e, /* @__PURE__ */ Error(e));
				return;
			}
			X.LoadFile(e, (e) => {
				try {
					Function(e).apply(null), t && t();
				} catch (e) {
					n && n("LoadScript Error", e);
				}
			}, void 0, void 0, !1, (e, t) => {
				n && n("LoadScript Error", t);
			});
		}
	}
	static _LoadScriptWeb(e, t, n, r, i = !1) {
		if (typeof importScripts == "function") {
			try {
				importScripts(e), t && t();
			} catch (t) {
				n?.(`Unable to load script '${e}' in worker`, t);
			}
			return;
		}
		if (!a()) {
			n?.(`Cannot load script '${e}' outside of a window or a worker`);
			return;
		}
		let o = document.getElementsByTagName("head")[0], s = document.createElement("script");
		i ? (s.setAttribute("type", "module"), s.innerText = e) : (s.setAttribute("type", "text/javascript"), s.setAttribute("src", e)), r && (s.id = r), s.onload = () => {
			t && t();
		}, s.onerror = (t) => {
			n && n(`Unable to load script '${e}'`, t);
		}, o.appendChild(s);
	}
	static async LoadScriptAsync(e, t) {
		return await new Promise((n, r) => {
			this.LoadScript(e, () => {
				n();
			}, (e, t) => {
				r(t || Error(e));
			}, t);
		});
	}
	static ReadFileAsDataURL(e, t, r) {
		let i = new FileReader(), a = {
			onCompleteObservable: new n(),
			abort: () => i.abort()
		};
		return i.onloadend = () => {
			a.onCompleteObservable.notifyObservers(a);
		}, i.onload = (e) => {
			t(e.target.result);
		}, i.onprogress = r, i.readAsDataURL(e), a;
	}
	static ReadFile(e, t, n, r, i) {
		return P(e, t, n, r, i);
	}
	static FileAsURL(e) {
		let t = new Blob([e]);
		return window.URL.createObjectURL(t);
	}
	static Format(e, t = 2) {
		return e.toFixed(t);
	}
	static DeepCopy(e, t, n, r) {
		J.DeepCopy(e, t, n, r);
	}
	static IsEmpty(e) {
		for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
		return !0;
	}
	static RegisterTopRootEvents(e, t) {
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e.addEventListener(r.name, r.handler, !1);
			try {
				window.parent && window.parent.addEventListener(r.name, r.handler, !1);
			} catch {}
		}
	}
	static UnregisterTopRootEvents(e, t) {
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e.removeEventListener(r.name, r.handler);
			try {
				e.parent && e.parent.removeEventListener(r.name, r.handler);
			} catch {}
		}
	}
	static async DumpFramebuffer(e, t, n, r, i = "image/png", a, o) {
		throw p("DumpTools");
	}
	static DumpData(e, t, n, r, i = "image/png", a, o = !1, s = !1, c) {
		throw p("DumpTools");
	}
	static async DumpDataAsync(e, t, n, r = "image/png", i, a = !1, o = !1, s) {
		throw p("DumpTools");
	}
	static _IsOffScreenCanvas(e) {
		return e.convertToBlob !== void 0;
	}
	static ToBlob(e, t, n = "image/png", r) {
		!X._IsOffScreenCanvas(e) && !e.toBlob && (e.toBlob = function(e, t, n) {
			setTimeout(() => {
				let r = atob(this.toDataURL(t, n).split(",")[1]), i = r.length, a = new Uint8Array(i);
				for (let e = 0; e < i; e++) a[e] = r.charCodeAt(e);
				e(new Blob([a]));
			});
		}), X._IsOffScreenCanvas(e) ? e.convertToBlob({
			type: n,
			quality: r
		}).then((e) => t(e)) : e.toBlob(function(e) {
			t(e);
		}, n, r);
	}
	static DownloadBlob(e, t) {
		if ("download" in document.createElement("a")) {
			if (!t) {
				let e = /* @__PURE__ */ new Date();
				t = "screenshot_" + ((e.getFullYear() + "-" + (e.getMonth() + 1)).slice(2) + "-" + e.getDate() + "_" + e.getHours() + "-" + ("0" + e.getMinutes()).slice(-2)) + ".png";
			}
			X.Download(e, t);
		} else if (e && typeof URL < "u") {
			let t = URL.createObjectURL(e), n = window.open("");
			if (!n) return;
			let r = n.document.createElement("img");
			r.onload = function() {
				URL.revokeObjectURL(t);
			}, r.src = t, n.document.body.appendChild(r);
		}
	}
	static EncodeScreenshotCanvasData(e, t, n = "image/png", r, i) {
		if (typeof r == "string" || !t) this.ToBlob(e, function(e) {
			e && X.DownloadBlob(e, r), t && t("");
		}, n, i);
		else if (t) {
			if (X._IsOffScreenCanvas(e)) {
				e.convertToBlob({
					type: n,
					quality: i
				}).then((e) => {
					let n = new FileReader();
					n.readAsDataURL(e), n.onloadend = () => {
						let e = n.result;
						t(e);
					};
				});
				return;
			}
			t(e.toDataURL(n, i));
		}
	}
	static Download(e, t) {
		if (typeof URL > "u") return;
		let n = window.URL.createObjectURL(e), r = document.createElement("a");
		document.body.appendChild(r), r.style.display = "none", r.href = n, r.download = t, r.addEventListener("click", () => {
			r.parentElement && r.parentElement.removeChild(r);
		}), r.click(), window.URL.revokeObjectURL(n);
	}
	static BackCompatCameraNoPreventDefault(e) {
		return typeof e[0] == "boolean" ? e[0] : typeof e[1] == "boolean" && e[1];
	}
	static CreateScreenshot(e, t, n, r, i = "image/png", a = !1, o) {
		throw p("ScreenshotTools");
	}
	static async CreateScreenshotAsync(e, t, n, r = "image/png", i) {
		throw p("ScreenshotTools");
	}
	static CreateScreenshotUsingRenderTarget(e, t, n, r, i = "image/png", a = 1, o = !1, s, c = !1, l = !1, u = !0, d, f) {
		throw p("ScreenshotTools");
	}
	static async CreateScreenshotUsingRenderTargetAsync(e, t, n, r = "image/png", i = 1, a = !1, o, s = !1, c = !1, l = !0, u, d) {
		throw p("ScreenshotTools");
	}
	static RandomId() {
		return f();
	}
	static IsBase64(e) {
		return R(e);
	}
	static DecodeBase64(e) {
		return B(e);
	}
	static get errorsCount() {
		return r.errorsCount;
	}
	static Log(e) {
		r.Log(e);
	}
	static Warn(e) {
		r.Warn(e);
	}
	static Error(e) {
		r.Error(e);
	}
	static get LogCache() {
		return r.LogCache;
	}
	static ClearLogCache() {
		r.ClearLogCache();
	}
	static set LogLevels(e) {
		r.LogLevels = e;
	}
	static set PerformanceLogLevel(e) {
		if ((e & X.PerformanceUserMarkLogLevel) === X.PerformanceUserMarkLogLevel) {
			_native?.enablePerformanceLogging ? (_native.enablePerformanceLogging(1), X.StartPerformanceCounter = X._StartMarkNative, X.EndPerformanceCounter = X._EndMarkNative) : (X.StartPerformanceCounter = X._StartUserMark, X.EndPerformanceCounter = X._EndUserMark);
			return;
		}
		if ((e & X.PerformanceConsoleLogLevel) === X.PerformanceConsoleLogLevel) {
			_native?.enablePerformanceLogging ? (_native.enablePerformanceLogging(2), X.StartPerformanceCounter = X._StartMarkNative, X.EndPerformanceCounter = X._EndMarkNative) : (X.StartPerformanceCounter = X._StartPerformanceConsole, X.EndPerformanceCounter = X._EndPerformanceConsole);
			return;
		}
		X.StartPerformanceCounter = X._StartPerformanceCounterDisabled, X.EndPerformanceCounter = X._EndPerformanceCounterDisabled, _native?.disablePerformanceLogging?.();
	}
	static _StartPerformanceCounterDisabled(e, t) {}
	static _EndPerformanceCounterDisabled(e, t) {}
	static _StartUserMark(e, t = !0) {
		if (!X._Performance) {
			if (!a()) return;
			X._Performance = window.performance;
		}
		!t || !X._Performance.mark || X._Performance.mark(e + "-Begin");
	}
	static _EndUserMark(e, t = !0) {
		!t || !X._Performance.mark || (X._Performance.mark(e + "-End"), X._Performance.measure(e, e + "-Begin", e + "-End"));
	}
	static _StartPerformanceConsole(e, t = !0) {
		t && (X._StartUserMark(e, t), console.time && console.time(e));
	}
	static _EndPerformanceConsole(e, t = !0) {
		t && (X._EndUserMark(e, t), console.timeEnd(e));
	}
	static _StartMarkNative(e, t = !0) {
		if (t && _native?.startPerformanceCounter) {
			if (X._NativePerformanceCounterHandles.has(e)) X.Warn(`Performance counter with name ${e} is already started.`);
			else {
				let t = _native.startPerformanceCounter(e);
				X._NativePerformanceCounterHandles.set(e, t);
			}
		}
	}
	static _EndMarkNative(e, t = !0) {
		if (t && _native?.endPerformanceCounter) {
			let t = X._NativePerformanceCounterHandles.get(e);
			t ? (_native.endPerformanceCounter(t), X._NativePerformanceCounterHandles.delete(e)) : X.Warn(`Performance counter with name ${e} was not started.`);
		}
	}
	static get Now() {
		return s.Now;
	}
	static GetClassName(e, t = !1) {
		let n = null;
		return !t && e.getClassName ? n = e.getClassName() : (e instanceof Object && (n = (t ? e : Object.getPrototypeOf(e)).constructor.__bjsclassName__), n ||= typeof e), n;
	}
	static First(e, t) {
		for (let n of e) if (t(n)) return n;
		return null;
	}
	static getFullClassName(e, t = !1) {
		let n = null, r = null;
		if (!t && e.getClassName) n = e.getClassName();
		else {
			if (e instanceof Object) {
				let i = t ? e : Object.getPrototypeOf(e);
				n = i.constructor.__bjsclassName__, r = i.constructor.__bjsmoduleName__;
			}
			n ||= typeof e;
		}
		return n ? (r == null ? "" : r + ".") + n : null;
	}
	static async DelayAsync(e) {
		await new Promise((t) => {
			setTimeout(() => {
				t();
			}, e);
		});
	}
	static IsSafari() {
		return i() ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
	}
};
X = Z, Z.AssetBaseUrl = "", Z.UseCustomRequestHeaders = !1, Z.CustomRequestHeaders = h.CustomRequestHeaders, Z.GetDOMTextContent = o, Z._DefaultCdnUrl = "https://cdn.babylonjs.com", Z._CdnVersion = "9.25.0", Z._DefaultAssetsUrl = "https://assets.babylonjs.com/core", Z.LoadScript = typeof _native > "u" ? X._LoadScriptWeb : X._LoadScriptNative, Z.GetAbsoluteUrl = typeof document == "object" ? (e) => {
	let t = document.createElement("a");
	return t.href = e, t.href;
} : typeof URL == "function" && typeof location == "object" ? (e) => new URL(e, location.origin).href : () => {
	throw Error("Unable to get absolute URL. Override BABYLON.Tools.GetAbsoluteUrl to a custom implementation for the current context.");
}, Z.NoneLogLevel = r.NoneLogLevel, Z.MessageLogLevel = r.MessageLogLevel, Z.WarningLogLevel = r.WarningLogLevel, Z.ErrorLogLevel = r.ErrorLogLevel, Z.AllLogLevel = r.AllLogLevel, Z.IsWindowObjectExist = a, Z.PerformanceNoneLogLevel = 0, Z.PerformanceUserMarkLogLevel = 1, Z.PerformanceConsoleLogLevel = 2, Z._NativePerformanceCounterHandles = /*#__PURE__*/ new Map(), Z.StartPerformanceCounter = X._StartPerformanceCounterDisabled, Z.EndPerformanceCounter = X._EndPerformanceCounterDisabled;
var Q = class e {
	constructor(e, t, n, r = 0) {
		this.iterations = e, this.index = r - 1, this._done = !1, this._fn = t, this._successCallback = n;
	}
	executeNext() {
		this._done || (this.index + 1 < this.iterations ? (++this.index, this._fn(this)) : this.breakLoop());
	}
	breakLoop() {
		this._done = !0, this._successCallback();
	}
	static Run(t, n, r, i = 0) {
		let a = new e(t, n, r, i);
		return a.executeNext(), a;
	}
	static SyncAsyncForLoop(t, n, r, i, a, o = 0) {
		return e.Run(Math.ceil(t / n), (e) => {
			a && a() ? e.breakLoop() : setTimeout(() => {
				for (let i = 0; i < n; ++i) {
					let o = e.index * n + i;
					if (o >= t) break;
					if (r(o), a && a()) {
						e.breakLoop();
						break;
					}
				}
				e.executeNext();
			}, o);
		}, i);
	}
};
//#endregion
export { F as a, G as c, y as d, b as f, J as i, I as l, Z as n, N as o, Y as r, P as s, Q as t, C as u };

//# sourceMappingURL=tools.pure-NGR0-8xU.js.map