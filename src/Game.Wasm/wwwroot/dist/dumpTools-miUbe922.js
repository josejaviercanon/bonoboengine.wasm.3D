import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t } from "./performanceConfigurator-DKR9RfNv.js";
import { t as n } from "./logger-DQIzSR_y.js";
import { t as r } from "./math.scalar.functions-BQvmU5eh.js";
import { h as i, n as a } from "./decorators-BjxgwLXx.js";
import { h as o, n as s } from "./tools-CL3QBXT6.js";
import { a as c, i as l } from "./textureTools-DeUtSqU_.js";
//#region node_modules/@babylonjs/core/Misc/dumpTools.js
var u = /* @__PURE__ */ e({
	Dispose: () => y,
	DumpData: () => v,
	DumpDataAsync: () => _,
	DumpFramebuffer: () => g,
	DumpTools: () => b,
	EncodeImageAsync: () => h
}), d = null;
async function f() {
	let e = t.LastCreatedEngine?.createCanvas(100, 100) ?? new OffscreenCanvas(100, 100);
	e instanceof OffscreenCanvas && n.Warn("DumpData: OffscreenCanvas will be used for dumping data. This may result in lossy alpha values.");
	let { ThinEngine: r } = await import("./thinEngine-U-D1z5pZ.js").then((e) => e.n);
	if (!r.IsSupported) throw Error("DumpData: No WebGL context available. Cannot dump data.");
	let i = new r(e, !1, {
		preserveDrawingBuffer: !0,
		depth: !1,
		stencil: !1,
		alpha: !0,
		premultipliedAlpha: !1,
		antialias: !1,
		failIfMajorPerformanceCaveat: !1
	});
	t.Instances.pop(), t.OnEnginesDisposedObservable.add((e) => {
		i && e !== i && !i.isDisposed && t.Instances.length === 0 && y();
	}), i.getCaps().parallelShaderCompile = void 0;
	let a = new l(i), { passPixelShader: o } = await import("./pass.fragment-DUzd5yX2.js");
	return {
		canvas: e,
		dumpEngine: {
			engine: i,
			renderer: a,
			wrapper: new c({
				engine: i,
				name: o.name,
				fragmentShader: o.shader,
				samplerNames: ["textureSampler"]
			})
		}
	};
}
async function p() {
	return d ||= f(), await d;
}
var m = class {
	static async EncodeImageAsync(e, t, n, r, i, a) {
		let o = await p(), c = o.dumpEngine;
		c.engine.setSize(t, n, !0);
		let l = c.engine.createRawTexture(e, t, n, 5, !1, !i, 1);
		return c.renderer.setViewport(), c.renderer.applyEffectWrapper(c.wrapper), c.wrapper.effect._bindTexture("textureSampler", l), c.renderer.draw(), l.dispose(), await new Promise((e, t) => {
			s.ToBlob(o.canvas, (n) => {
				n ? e(n) : t(/* @__PURE__ */ Error("EncodeImageAsync: Failed to convert canvas to blob."));
			}, r, a);
		});
	}
};
i([a], m, "EncodeImageAsync", null);
var h = m.EncodeImageAsync;
async function g(e, t, n, r, i = "image/png", a, o) {
	let s = await n.readPixels(0, 0, e, t);
	v(e, t, new Uint8Array(s.buffer), r, i, a, !0, void 0, o);
}
async function _(e, t, i, a = "image/png", c, l = !1, u = !1, d) {
	if (i instanceof Float32Array) {
		let e = new Uint8Array(i.length), t = i.length;
		for (; t--;) {
			let n = i[t];
			e[t] = Math.round(r(n) * 255);
		}
		i = e;
	}
	let f = await m.EncodeImageAsync(i, e, t, a, l, d);
	c !== void 0 && s.DownloadBlob(f, c), f.type !== a && n.Warn(`DumpData: The requested mimeType '${a}' is not supported. The result has mimeType '${f.type}' instead.`);
	let p = await f.arrayBuffer();
	return u ? p : `data:${a};base64,${o(p)}`;
}
function v(e, t, n, r, i = "image/png", a, o = !1, s = !1, c) {
	a === void 0 && !r && (a = ""), _(e, t, n, i, a, o, s, c).then((e) => {
		r && r(e);
	});
}
function y() {
	d &&= (d?.then((e) => {
		e.canvas instanceof HTMLCanvasElement && e.canvas.remove(), e.dumpEngine && (e.dumpEngine.engine.dispose(), e.dumpEngine.renderer.dispose(), e.dumpEngine.wrapper.dispose());
	}), null);
}
var b = {
	DumpData: v,
	DumpDataAsync: _,
	DumpFramebuffer: g,
	Dispose: y
};
s.DumpData = v, s.DumpDataAsync = _, s.DumpFramebuffer = g;
//#endregion
export { u as t };

//# sourceMappingURL=dumpTools-miUbe922.js.map