/* Motor de diagramas compartido web/video. Componentes puros (sin hooks) para poder usarse en Remotion. */
import type { CSSProperties, ReactNode } from 'react';
import type { Col, End, IconName, Prim, TNode, VisSpec } from './types';

export const VC: Record<Col, string> = {
  blue: '#6ea8ff', orange: '#ffb35c', green: '#6fd69a', pink: '#ff8fab', purple: '#b39dff',
  yellow: '#ffd166', red: '#ff6b6b', gray: '#8f9bb8', white: '#eef2fb', cyan: '#5fd4e8',
};
export const VBG = '#0f1626';
const INK = '#eef2fb';
const MUTED = '#9aa6c2';
const FONT = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';
const MONO = 'Consolas, Menlo, "Courier New", monospace';
const col = (c?: Col, d: Col = 'blue') => VC[c ?? d];

interface Ctx { step: number; t: number; anim: boolean; imgBase: string; geo: Record<string, { x: number; y: number; w: number; h: number }> }

/** Visible en este paso. */
function shown(s: number | undefined, out: number | undefined, step: number) {
  return (s ?? 0) <= step && (out === undefined || step < out);
}

function G({ s, out, hl, ctx, draw, children }: { s?: number; out?: number; hl?: number[]; ctx: Ctx; draw?: boolean; children: ReactNode }) {
  if (!shown(s, out, ctx.step)) return null;
  const isNew = (s ?? 0) === ctx.step;
  const glow = hl?.includes(ctx.step);
  if (ctx.anim) {
    return <g className={isNew ? (draw ? 'vdraw' : 'vin') : undefined} filter={glow ? 'url(#vglow)' : undefined}>{children}</g>;
  }
  const p = isNew ? ctx.t : 1;
  return <g opacity={draw ? Math.min(1, p * 3) : p} transform={draw ? undefined : `translate(0 ${(1 - p) * 10})`} filter={glow ? 'url(#vglow)' : undefined}>{children}</g>;
}

/** Trazo progresivo para líneas nuevas en video. */
function dashFor(ctx: Ctx, s?: number) {
  if (ctx.anim) return {};
  const isNew = (s ?? 0) === ctx.step;
  return isNew ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - ctx.t } : {};
}

export function wrap(text: string, fs: number, w: number): string[] {
  const max = Math.max(4, Math.floor(w / (fs * 0.53)));
  const out: string[] = [];
  for (const para of text.split('\n')) {
    let cur = '';
    for (const word of para.split(' ')) {
      if (!cur) cur = word;
      else if ((cur + ' ' + word).length <= max) cur += ' ' + word;
      else { out.push(cur); cur = word; }
    }
    out.push(cur);
  }
  return out;
}

function Lines({ x, y, lines, fs, color = INK, b, anchor = 'middle', mono, lh = 1.2 }: { x: number; y: number; lines: string[]; fs: number; color?: string; b?: boolean; anchor?: 'start' | 'middle' | 'end'; mono?: boolean; lh?: number }) {
  const y0 = y - ((lines.length - 1) * fs * lh) / 2;
  return (
    <text x={x} y={y0} fontSize={fs} fill={color} fontWeight={b ? 700 : 500} textAnchor={anchor} dominantBaseline="central" fontFamily={mono ? MONO : FONT}>
      {lines.map((l, i) => <tspan key={i} x={x} y={y0 + i * fs * lh}>{l}</tspan>)}
    </text>
  );
}

const fnCache = new Map<string, (x: number) => number>();
function fn(expr: string): (x: number) => number {
  let f = fnCache.get(expr);
  if (!f) {
    try {
      f = new Function('x', `const {sin,cos,tan,exp,log,sqrt,abs,PI,E,pow,floor,ceil,max,min,sign,atan,round}=Math; return (${expr});`) as (x: number) => number;
    } catch {
      f = () => NaN; // expresión inválida: no dibuja la curva, pero no rompe la página
    }
    fnCache.set(expr, f);
  }
  return f;
}

function niceStep(range: number) {
  const raw = range / 6;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

function edgePoint(r: { x: number; y: number; w: number; h: number }, tx: number, ty: number, pad = 5) {
  const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
  const dx = tx - cx, dy = ty - cy;
  if (!dx && !dy) return [cx, cy] as const;
  const hw = r.w / 2 + pad, hh = r.h / 2 + pad;
  const k = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
  return [cx + dx * k, cy + dy * k] as const;
}

/* ---------------- íconos ---------------- */
function Icon({ n, x, y, size, color }: { n: IconName; x: number; y: number; size: number; color: string }) {
  const s = size / 64;
  const st = { stroke: color, strokeWidth: 3.2 / s, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const fl = `${color}33`;
  const body = (() => {
    switch (n) {
      case 'pc': return <><rect x={-26} y={-24} width={52} height={36} rx={4} {...st} fill={fl} /><path d="M-10,22 h20 M0,12 v10" {...st} /></>;
      case 'laptop': return <><rect x={-22} y={-20} width={44} height={30} rx={3} {...st} fill={fl} /><path d="M-30,16 h60 l-4,6 h-52 z" {...st} /></>;
      case 'phone': return <><rect x={-14} y={-28} width={28} height={56} rx={6} {...st} fill={fl} /><path d="M-4,20 h8" {...st} /></>;
      case 'server': return <><rect x={-22} y={-28} width={44} height={16} rx={3} {...st} fill={fl} /><rect x={-22} y={-8} width={44} height={16} rx={3} {...st} fill={fl} /><rect x={-22} y={12} width={44} height={16} rx={3} {...st} fill={fl} /><circle cx={12} cy={-20} r={2} fill={color} /><circle cx={12} cy={0} r={2} fill={color} /><circle cx={12} cy={20} r={2} fill={color} /></>;
      case 'router': return <><ellipse cx={0} cy={6} rx={28} ry={12} {...st} fill={fl} /><path d="M-28,6 v-10 M28,6 v-10" {...st} /><ellipse cx={0} cy={-4} rx={28} ry={12} {...st} fill={fl} /><path d="M-12,-4 h24 M6,-9 l6,5 l-6,5 M-6,-9 l-6,5 l6,5" {...st} strokeWidth={2.4 / s} /></>;
      case 'switch': return <><rect x={-30} y={-12} width={60} height={24} rx={4} {...st} fill={fl} /><path d="M-18,-4 h22 l-5,-4 M18,4 h-22 l5,4" {...st} strokeWidth={2.4 / s} /></>;
      case 'hub': return <><rect x={-30} y={-10} width={60} height={20} rx={4} {...st} fill={fl} /><circle cx={-16} cy={0} r={2.5} fill={color} /><circle cx={-5} cy={0} r={2.5} fill={color} /><circle cx={6} cy={0} r={2.5} fill={color} /><circle cx={17} cy={0} r={2.5} fill={color} /></>;
      case 'cloud': return <path d="M-20,16 a12,12 0 0 1 -2,-24 a16,16 0 0 1 30,-6 a12,12 0 0 1 14,14 a9,9 0 0 1 -2,16 z" {...st} fill={fl} />;
      case 'user': return <><circle cx={0} cy={-14} r={11} {...st} fill={fl} /><path d="M-22,26 a22,20 0 0 1 44,0 z" {...st} fill={fl} /></>;
      case 'db': return <><path d="M-22,-18 v36 a22,8 0 0 0 44,0 v-36" {...st} fill={fl} /><ellipse cx={0} cy={-18} rx={22} ry={8} {...st} fill={fl} /><path d="M-22,0 a22,8 0 0 0 44,0" {...st} /></>;
      case 'doc': return <><path d="M-18,-26 h24 l12,12 v40 h-36 z" {...st} fill={fl} /><path d="M6,-26 v12 h12 M-10,-2 h20 M-10,8 h20 M-10,18 h14" {...st} strokeWidth={2.4 / s} /></>;
      case 'lock': return <><rect x={-18} y={-4} width={36} height={28} rx={4} {...st} fill={fl} /><path d="M-11,-4 v-8 a11,11 0 0 1 22,0 v8" {...st} /></>;
      case 'mail': return <><rect x={-26} y={-18} width={52} height={36} rx={4} {...st} fill={fl} /><path d="M-26,-16 l26,20 l26,-20" {...st} /></>;
      case 'globe': return <><circle cx={0} cy={0} r={26} {...st} fill={fl} /><ellipse cx={0} cy={0} rx={11} ry={26} {...st} /><path d="M-26,0 h52 M-22,-13 h44 M-22,13 h44" {...st} strokeWidth={2.2 / s} /></>;
      case 'cpu': return <><rect x={-18} y={-18} width={36} height={36} rx={4} {...st} fill={fl} /><rect x={-8} y={-8} width={16} height={16} {...st} /><path d="M-10,-18 v-8 M0,-18 v-8 M10,-18 v-8 M-10,18 v8 M0,18 v8 M10,18 v8 M-18,-10 h-8 M-18,0 h-8 M-18,10 h-8 M18,-10 h8 M18,0 h8 M18,10 h8" {...st} strokeWidth={2.4 / s} /></>;
      case 'disk': return <><circle cx={0} cy={0} r={26} {...st} fill={fl} /><circle cx={0} cy={0} r={6} {...st} /><path d="M6,-4 l14,-12" {...st} /></>;
      case 'gear': return <><circle cx={0} cy={0} r={10} {...st} /><path d="M0,-26 v8 M0,18 v8 M-26,0 h8 M18,0 h8 M-18,-18 l6,6 M12,12 l6,6 M18,-18 l-6,6 M-12,12 l-6,6" {...st} strokeWidth={5 / s} /><circle cx={0} cy={0} r={18} {...st} fill={fl} /><circle cx={0} cy={0} r={7} {...st} /></>;
      case 'chart': return <><path d="M-26,24 h52 M-26,24 v-50" {...st} /><rect x={-18} y={0} width={10} height={24} {...st} fill={fl} /><rect x={-3} y={-14} width={10} height={38} {...st} fill={fl} /><rect x={12} y={-6} width={10} height={30} {...st} fill={fl} /></>;
      case 'wifi': return <><path d="M-26,-6 a36,36 0 0 1 52,0 M-17,4 a24,24 0 0 1 34,0 M-8,13 a12,12 0 0 1 16,0" {...st} /><circle cx={0} cy={22} r={3.5} fill={color} /></>;
      case 'clock': return <><circle cx={0} cy={0} r={26} {...st} fill={fl} /><path d="M0,-16 v16 l11,8" {...st} /></>;
      case 'cube': return <><path d="M0,-26 l24,12 v28 l-24,12 l-24,-12 v-28 z" {...st} fill={fl} /><path d="M-24,-14 l24,12 l24,-12 M0,-2 v28" {...st} /></>;
      case 'brain': return <><path d="M-4,-24 a12,12 0 0 0 -20,8 a11,11 0 0 0 -2,20 a12,12 0 0 0 22,12 z M4,-24 a12,12 0 0 1 20,8 a11,11 0 0 1 2,20 a12,12 0 0 1 -22,12 z" {...st} fill={fl} /></>;
      case 'factory': return <><path d="M-28,26 v-30 l14,-8 v8 l14,-8 v8 l14,-8 v-16 h10 v54 z" {...st} fill={fl} /></>;
      case 'money': return <><rect x={-28} y={-16} width={56} height={32} rx={4} {...st} fill={fl} /><circle cx={0} cy={0} r={9} {...st} /></>;
    }
  })();
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{body}</g>;
}

/** Símbolo pata de gallo en el extremo P de una línea; (ux, uy) apunta desde P hacia el interior de la línea. */
function CrowEnd({ P, ux, uy, end, color }: { P: readonly [number, number]; ux: number; uy: number; end: End; color: string }) {
  const nx = -uy, ny = ux;
  const pt = (d: number, k: number) => [P[0] + ux * d + nx * k, P[1] + uy * d + ny * k] as const;
  const bar = (d: number) => { const a = pt(d, 10), b = pt(d, -10); return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={2.6} />; };
  const many = end.endsWith('<');
  const zero = end.startsWith('o');
  const f1 = pt(0, 11), f2 = pt(16, 0), f3 = pt(0, -11);
  return (
    <g>
      {many ? <path d={`M${f1[0]},${f1[1]} L${f2[0]},${f2[1]} L${f3[0]},${f3[1]}`} stroke={color} strokeWidth={2.6} fill="none" /> : bar(9)}
      {zero ? <circle cx={P[0] + ux * 28} cy={P[1] + uy * 28} r={6} fill={VBG} stroke={color} strokeWidth={2.4} /> : bar(23)}
    </g>
  );
}

/* ---------------- primitivas ---------------- */
function boxShape(p: Extract<Prim, { k: 'box' }>, color: string) {
  const { x, y, w, h } = p;
  const fill = p.solid ? color : `${color}22`;
  const common = { fill, stroke: color, strokeWidth: 2.6, strokeDasharray: p.dash ? '8 6' : undefined };
  switch (p.shape) {
    case 'pill': return <rect x={x} y={y} width={w} height={h} rx={h / 2} {...common} />;
    case 'circle': return <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} {...common} />;
    case 'diamond': return <polygon points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`} {...common} />;
    case 'db': return <><path d={`M${x},${y + 10} v${h - 20} a${w / 2},10 0 0 0 ${w},0 v${-(h - 20)}`} {...common} /><ellipse cx={x + w / 2} cy={y + 10} rx={w / 2} ry={10} {...common} /></>;
    case 'cloud': return <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} {...common} strokeDasharray="3 5" />;
    case 'note': return <path d={`M${x},${y} h${w - 16} l16,16 v${h - 16} h${-w} z`} {...common} />;
    default: return <rect x={x} y={y} width={w} height={h} rx={10} {...common} />;
  }
}

function PrimView({ p, ctx }: { p: Prim; ctx: Ctx }): ReactNode {
  const g = (children: ReactNode, draw?: boolean) => <G s={p.s} out={p.out} hl={p.hl} ctx={ctx} draw={draw}>{children}</G>;
  switch (p.k) {
    case 'box': {
      const color = col(p.c);
      const fs = p.fs ?? 24;
      const tl = p.t ? wrap(p.t, fs, p.w - 18) : [];
      const sl = p.sub ? wrap(p.sub, fs * 0.72, p.w - 18) : [];
      const tot = tl.length * fs * 1.2 + (sl.length ? sl.length * fs * 0.72 * 1.2 + 4 : 0);
      const cy = p.y + p.h / 2 + (p.shape === 'db' ? 6 : 0);
      const top = cy - tot / 2;
      const ax = p.align === 'l' ? p.x + 14 : p.x + p.w / 2;
      const an = p.align === 'l' ? 'start' : 'middle';
      return g(<>
        {boxShape(p, color)}
        {tl.length > 0 && <Lines x={ax} y={top + (tl.length * fs * 1.2) / 2} lines={tl} fs={fs} b color={p.solid ? VBG : INK} anchor={an} />}
        {sl.length > 0 && <Lines x={ax} y={top + tl.length * fs * 1.2 + 4 + (sl.length * fs * 0.72 * 1.2) / 2} lines={sl} fs={fs * 0.72} color={p.solid ? VBG : MUTED} anchor={an} />}
      </>);
    }
    case 'text': {
      const fs = p.fs ?? 24;
      const lines = p.w ? wrap(p.t, fs, p.w) : p.t.split('\n');
      return g(<Lines x={p.x} y={p.y} lines={lines} fs={fs} b={p.b} color={p.c ? col(p.c) : INK} anchor={p.anchor ?? 'middle'} mono={p.mono} />);
    }
    case 'icon': {
      const size = p.size ?? 64;
      const color = col(p.c);
      return g(<>
        <Icon n={p.n} x={p.x} y={p.y} size={size} color={color} />
        {p.t && <Lines x={p.x} y={p.y + size / 2 + 8 + (p.fs ?? 19) * 0.6 * p.t.split('\n').length} lines={p.t.split('\n')} fs={p.fs ?? 19} color={INK} b />}
      </>);
    }
    case 'arrow': {
      const color = col(p.c, 'white');
      const pt = (e: string | [number, number]) => (typeof e === 'string' ? ctx.geo[e] : undefined);
      const center = (e: string | [number, number]): [number, number] => {
        const r = pt(e);
        return r ? [r.x + r.w / 2, r.y + r.h / 2] : (e as [number, number]);
      };
      const ca = center(p.a), cb = center(p.b);
      const mx = (ca[0] + cb[0]) / 2, my = (ca[1] + cb[1]) / 2;
      const len = Math.hypot(cb[0] - ca[0], cb[1] - ca[1]) || 1;
      const bend = p.bend ?? 0;
      const ctrl: [number, number] = [mx - ((cb[1] - ca[1]) / len) * bend, my + ((cb[0] - ca[0]) / len) * bend];
      const ra = pt(p.a), rb = pt(p.b);
      const A = ra ? edgePoint(ra, ctrl[0], ctrl[1]) : ca;
      const B = rb ? edgePoint(rb, ctrl[0], ctrl[1]) : cb;
      const d = bend ? `M${A[0]},${A[1]} Q${ctrl[0]},${ctrl[1]} ${B[0]},${B[1]}` : `M${A[0]},${A[1]} L${B[0]},${B[1]}`;
      const head = p.head !== false;
      const lx = bend ? (A[0] + 2 * ctrl[0] + B[0]) / 4 : (A[0] + B[0]) / 2;
      const ly = bend ? (A[1] + 2 * ctrl[1] + B[1]) / 4 : (A[1] + B[1]) / 2;
      const showHead = ctx.anim || (p.s ?? 0) !== ctx.step || ctx.t > 0.9;
      const fs = p.fs ?? 19;
      return g(<>
        <path d={d} fill="none" stroke={color} strokeWidth={p.sw ?? 2.8} strokeLinecap="round" strokeDasharray={p.dash ? '9 7' : undefined}
          markerEnd={head && showHead ? `url(#va-${p.c ?? 'white'})` : undefined} markerStart={p.two && showHead ? `url(#vs-${p.c ?? 'white'})` : undefined}
          {...(p.dash ? {} : dashFor(ctx, p.s))} />
        {p.t && <Lines x={lx} y={ly - fs * 0.85} lines={p.t.split('\n')} fs={fs} color={color} b />}
        {p.ea && (() => { const dx = (bend ? ctrl[0] : B[0]) - A[0], dy = (bend ? ctrl[1] : B[1]) - A[1], l = Math.hypot(dx, dy) || 1; return <CrowEnd P={A} ux={dx / l} uy={dy / l} end={p.ea} color={color} />; })()}
        {p.eb && (() => { const dx = (bend ? ctrl[0] : A[0]) - B[0], dy = (bend ? ctrl[1] : A[1]) - B[1], l = Math.hypot(dx, dy) || 1; return <CrowEnd P={B} ux={dx / l} uy={dy / l} end={p.eb} color={color} />; })()}
      </>, !p.dash);
    }
    case 'line': {
      const color = col(p.c, 'gray');
      return g(<polyline points={p.pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={p.sw ?? 2.4} strokeDasharray={p.dash ? '8 6' : undefined} markerEnd={p.arrow ? `url(#va-${p.c ?? 'gray'})` : undefined} {...(p.dash ? {} : dashFor(ctx, p.s))} />, !p.dash);
    }
    case 'bits': {
      const h = p.h ?? 56;
      const fs = p.fs ?? 22;
      const total = p.cells.reduce((a, c) => a + (c.n ?? 1), 0);
      let acc = 0;
      return g(<>
        {p.title && <Lines x={p.x} y={p.y - 20} lines={[p.title]} fs={17} color={MUTED} anchor="start" b />}
        {p.cells.map((c, i) => {
          const cw = (p.w * (c.n ?? 1)) / total;
          const cx = p.x + (p.w * acc) / total;
          acc += c.n ?? 1;
          const color = col(c.c ?? p.c);
          return (
            <G key={i} s={c.s} ctx={ctx}>
              <rect x={cx} y={p.y} width={cw} height={h} fill={`${color}26`} stroke={color} strokeWidth={2.2} />
              <Lines x={cx + cw / 2} y={p.y + h / 2} lines={wrap(c.t, fs, cw - 6)} fs={fs} b mono={p.mono} />
              {c.sub && <Lines x={cx + cw / 2} y={p.y + h + 16} lines={[c.sub]} fs={15} color={MUTED} />}
            </G>
          );
        })}
      </>);
    }
    case 'table': {
      const fs = p.fs ?? 20;
      const rh = p.rh ?? 40;
      const ncol = Math.max(p.head?.length ?? 0, ...p.rows.map((r) => r.length));
      const weights = p.cw ?? Array.from({ length: ncol }, () => 1);
      const tw = weights.reduce((a, b) => a + b, 0);
      const xs: number[] = [];
      weights.reduce((a, w) => { xs.push(p.x + (p.w * a) / tw); return a + w; }, 0);
      const cwid = (j: number) => (p.w * weights[j]) / tw;
      const y0 = p.y + (p.head ? rh : 0);
      const color = col(p.c, 'blue');
      return g(<>
        {p.head && <>
          <rect x={p.x} y={p.y} width={p.w} height={rh} fill={`${color}40`} stroke={color} strokeWidth={1.6} />
          {p.head.map((hd, j) => <Lines key={j} x={xs[j] + cwid(j) / 2} y={p.y + rh / 2} lines={[hd]} fs={fs * 0.9} b />)}
        </>}
        {p.rows.map((r, i) => {
          const hi = p.hi?.find((x) => x.r === i && x.s <= ctx.step && (x.to === undefined || ctx.step < x.to));
          const hc = hi ? col(hi.c, 'yellow') : undefined;
          return (
            <G key={i} s={p.rs?.[i]} ctx={ctx}>
              <rect x={p.x} y={y0 + i * rh} width={p.w} height={rh} fill={hc ? `${hc}38` : i % 2 ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.07)'} stroke={hc ?? 'rgba(255,255,255,.14)'} strokeWidth={hc ? 2.4 : 1} />
              {r.map((cell, j) => <Lines key={j} x={xs[j] + cwid(j) / 2} y={y0 + i * rh + rh / 2} lines={[cell]} fs={fs} mono={p.mono} color={hc ? '#fff' : INK} />)}
            </G>
          );
        })}
      </>);
    }
    case 'seq': {
      const n = p.parts.length;
      const fs = p.fs ?? 19;
      const partFs = p.partFs ?? 18;
      const px = (i: number) => p.x + (p.w * (i + 0.5)) / n;
      const hasIcon = p.parts.some((q) => q.n);
      const top = p.y + (hasIcon ? 104 : 58);
      const gap = (p.y + p.h - top) / (p.msgs.length + 0.6);
      return g(<>
        {p.parts.map((q, i) => {
          const color = col(q.c, 'blue');
          return (
            <g key={i}>
              {q.n ? <><Icon n={q.n} x={px(i)} y={p.y + 30} size={54} color={color} /><Lines x={px(i)} y={p.y + 80} lines={[q.t]} fs={partFs} b /></>
                : <><rect x={px(i) - Math.min(90, p.w / n / 2 - 6)} y={p.y} width={Math.min(180, p.w / n - 12)} height={46} rx={10} fill={`${color}26`} stroke={color} strokeWidth={2.4} /><Lines x={px(i)} y={p.y + 23} lines={[q.t]} fs={partFs} b /></>}
              <line x1={px(i)} y1={top - 6} x2={px(i)} y2={p.y + p.h} stroke={color} strokeOpacity={0.55} strokeWidth={2} strokeDasharray="6 6" />
            </g>
          );
        })}
        {p.msgs.map((m, j) => {
          const yy = top + gap * (j + 0.7);
          const color = col(m.c, 'white');
          const x1 = px(m.a), x2 = px(m.b);
          const dir = x2 >= x1 ? 1 : -1;
          const self = x1 > p.x + p.w / 2 ? -1 : 1;
          return (
            <G key={j} s={m.s} ctx={ctx} draw>
              {m.a === m.b
                ? <path d={`M${x1},${yy - 10} h${self * 40} v20 h${-self * 34}`} fill="none" stroke={color} strokeWidth={2.6} markerEnd={`url(#va-${m.c ?? 'white'})`} />
                : <path d={`M${x1 + dir * 4},${yy} L${x2 - dir * 6},${yy}`} fill="none" stroke={color} strokeWidth={2.8} strokeDasharray={m.dash ? '9 7' : undefined} markerEnd={`url(#va-${m.c ?? 'white'})`} {...(m.dash ? {} : dashFor(ctx, m.s))} />}
              <Lines x={m.a === m.b ? x1 + self * 48 : (x1 + x2) / 2} y={m.a === m.b ? yy : yy - fs * 0.85} lines={[m.t]} fs={fs} color={color} b anchor={m.a === m.b ? (self > 0 ? 'start' : 'end') : 'middle'} />
            </G>
          );
        })}
      </>);
    }
    case 'stack': {
      const n = p.layers.length;
      const lh = (p.h - (n - 1) * 6) / n;
      const fs = p.fs ?? Math.min(24, lh * 0.42);
      return g(<>{p.layers.map((l, i) => {
        const color = col(l.c, (['blue', 'green', 'orange', 'purple', 'pink', 'cyan', 'yellow'] as Col[])[i % 7]);
        const yy = p.y + i * (lh + 6);
        return (
          <G key={i} s={l.s} ctx={ctx}>
            <rect x={p.x} y={yy} width={p.w} height={lh} rx={8} fill={`${color}2b`} stroke={color} strokeWidth={2.4} />
            {l.d ? <>
              <Lines x={p.x + 16} y={yy + lh / 2} lines={[l.t]} fs={fs} b anchor="start" color={color} />
              <Lines x={p.x + p.w * 0.36} y={yy + lh / 2} lines={wrap(l.d, fs * 0.8, p.w * 0.62)} fs={fs * 0.8} anchor="start" />
            </> : <Lines x={p.x + p.w / 2} y={yy + lh / 2} lines={[l.t]} fs={fs} b color={color} />}
          </G>
        );
      })}</>);
    }
    case 'tree': {
      const fs = p.fs ?? 19;
      type L = { n: TNode; x: number; d: number; parent?: L };
      const all: L[] = [];
      let leaf = 0, maxD = 0;
      const leaves = (n: TNode): number => (n.kids?.length ? n.kids.reduce((a, k) => a + leaves(k), 0) : 1);
      const nl = leaves(p.root);
      const walk = (n: TNode, d: number, parent?: L): L => {
        maxD = Math.max(maxD, d);
        const me: L = { n, x: 0, d, parent };
        all.push(me);
        if (n.kids?.length) {
          const xs = n.kids.map((k) => walk(k, d + 1, me).x);
          me.x = (xs[0] + xs[xs.length - 1]) / 2;
        } else { me.x = p.x + (p.w * (leaf + 0.5)) / nl; leaf++; }
        return me;
      };
      walk(p.root, 0);
      const nh = 48;
      const nw = Math.min(200, p.w / nl - 12);
      const ly = (d: number) => p.y + (maxD ? ((p.h - nh) * d) / maxD : 0);
      return g(<>
        {all.filter((l) => l.parent).map((l, i) => (
          <G key={'e' + i} s={l.n.s} ctx={ctx} draw>
            <line x1={l.parent!.x} y1={ly(l.parent!.d) + nh} x2={l.x} y2={ly(l.d)} stroke={col(l.n.c, 'gray')} strokeWidth={2.4} {...dashFor(ctx, l.n.s)} />
            {l.n.e && <Lines x={(l.parent!.x + l.x) / 2 + 6} y={(ly(l.parent!.d) + nh + ly(l.d)) / 2} lines={[l.n.e]} fs={fs * 0.85} color={col(l.n.c, 'yellow')} b anchor="start" />}
          </G>
        ))}
        {all.map((l, i) => {
          const color = col(l.n.c, 'blue');
          return (
            <G key={'n' + i} s={l.n.s} ctx={ctx}>
              <rect x={l.x - nw / 2} y={ly(l.d)} width={nw} height={nh} rx={10} fill={`${color}26`} stroke={color} strokeWidth={2.4} />
              <Lines x={l.x} y={ly(l.d) + nh / 2} lines={wrap(l.n.t, fs, nw - 8)} fs={fs} b />
            </G>
          );
        })}
      </>);
    }
    case 'plot': {
      const [x0, x1] = p.xr, [y0, y1] = p.yr;
      const X = (v: number) => p.x + ((v - x0) / (x1 - x0)) * p.w;
      const Y = (v: number) => p.y + p.h - ((v - y0) / (y1 - y0)) * p.h;
      const ax = y0 <= 0 && y1 >= 0 ? Y(0) : p.y + p.h;
      const ay = x0 <= 0 && x1 >= 0 ? X(0) : p.x;
      const xs = p.xt ?? niceStep(x1 - x0), ys = p.yt ?? niceStep(y1 - y0);
      const ticks = p.ticks !== false;
      const fmt = (v: number) => (Math.abs(v) < 1e-9 ? '0' : Number(v.toFixed(3)).toString().replace('.', ','));
      const clip = `vclip${Math.round(p.x)}_${Math.round(p.y)}_${Math.round(p.w)}`;
      const sample = (f: (x: number) => number, a: number, b: number, N = 220) => {
        const segs: [number, number][][] = [[]];
        for (let i = 0; i <= N; i++) {
          const xv = a + ((b - a) * i) / N;
          let yv: number;
          try { yv = f(xv); } catch { yv = NaN; }
          if (!Number.isFinite(yv) || Math.abs(yv) > 1e6) { if (segs[segs.length - 1].length) segs.push([]); continue; }
          segs[segs.length - 1].push([X(xv), Y(Math.max(y0 - (y1 - y0), Math.min(y1 + (y1 - y0), yv)))]);
        }
        return segs.filter((sg) => sg.length > 1);
      };
      return g(<>
        <defs><clipPath id={clip}><rect x={p.x} y={p.y} width={p.w} height={p.h} /></clipPath></defs>
        {ticks && Array.from({ length: Math.floor((x1 - x0) / xs) + 1 }, (_, i) => Math.ceil(x0 / xs) * xs + i * xs).filter((v) => v <= x1 + 1e-9).map((v) => (
          <g key={'x' + v}><line x1={X(v)} y1={p.y} x2={X(v)} y2={p.y + p.h} stroke="rgba(255,255,255,.07)" /><text x={X(v)} y={ax + 20} fontSize={15} fill={MUTED} textAnchor="middle" fontFamily={FONT}>{fmt(v)}</text></g>
        ))}
        {ticks && Array.from({ length: Math.floor((y1 - y0) / ys) + 1 }, (_, i) => Math.ceil(y0 / ys) * ys + i * ys).filter((v) => v <= y1 + 1e-9).map((v) => (
          <g key={'y' + v}><line x1={p.x} y1={Y(v)} x2={p.x + p.w} y2={Y(v)} stroke="rgba(255,255,255,.07)" />{Math.abs(v) > 1e-9 && <text x={ay - 8} y={Y(v) + 5} fontSize={15} fill={MUTED} textAnchor="end" fontFamily={FONT}>{fmt(v)}</text>}</g>
        ))}
        <line x1={p.x} y1={ax} x2={p.x + p.w + 6} y2={ax} stroke={MUTED} strokeWidth={2} markerEnd="url(#va-gray)" />
        <line x1={ay} y1={p.y + p.h} x2={ay} y2={p.y - 6} stroke={MUTED} strokeWidth={2} markerEnd="url(#va-gray)" />
        {p.xl && <text x={p.x + p.w} y={ax - 10} fontSize={17} fill={MUTED} textAnchor="end" fontFamily={FONT} fontWeight={700}>{p.xl}</text>}
        {p.yl && <text x={ay + 10} y={p.y + 4} fontSize={17} fill={MUTED} fontFamily={FONT} fontWeight={700}>{p.yl}</text>}
        <g clipPath={`url(#${clip})`}>
          {p.fns?.map((f, i) => {
            const color = col(f.c, (['blue', 'orange', 'green', 'pink'] as Col[])[i % 4]);
            let d = '';
            let area = '';
            if (f.pts) {
              const pts = f.step ? f.pts.flatMap((q, j) => (j ? [[q[0], f.pts![j - 1][1]] as [number, number], q] : [q])) : f.pts;
              d = 'M' + pts.map((q) => `${X(q[0])},${Y(q[1])}`).join(' L');
            } else if (f.f) {
              const F = fn(f.f);
              d = sample(F, x0, x1).map((sg) => 'M' + sg.map((q) => q.join(',')).join(' L')).join(' ');
              if (f.area && f.between) {
                const top = sample(F, f.area[0], f.area[1], 120)[0] ?? [];
                const bot = sample(fn(f.between), f.area[0], f.area[1], 120)[0] ?? [];
                if (top.length && bot.length) area = 'M' + top.map((q) => q.join(',')).join(' L') + ' L' + [...bot].reverse().map((q) => q.join(',')).join(' L') + ' Z';
              } else if (f.area) {
                const sg = sample(F, f.area[0], f.area[1], 120)[0] ?? [];
                if (sg.length) area = `M${sg[0][0]},${Y(Math.max(y0, 0))} L` + sg.map((q) => q.join(',')).join(' L') + ` L${sg[sg.length - 1][0]},${Y(Math.max(y0, 0))} Z`;
              }
            }
            return (
              <G key={i} s={f.s} out={f.out} ctx={ctx} draw>
                {area && <path d={area} fill={`${color}40`} stroke="none" />}
                <path d={d} fill="none" stroke={color} strokeWidth={3.4} strokeDasharray={f.dash ? '10 8' : undefined} strokeLinejoin="round" {...(f.dash ? {} : dashFor(ctx, f.s))} />
              </G>
            );
          })}
        </g>
        {p.fns?.map((f, i) => f.t && (
          <G key={'l' + i} s={f.s} out={f.out} ctx={ctx}><text x={p.x + p.w - 6} y={p.y + 22 + i * 24} fontSize={18} fill={col(f.c, (['blue', 'orange', 'green', 'pink'] as Col[])[i % 4])} textAnchor="end" fontWeight={700} fontFamily={FONT}>{f.t}</text></G>
        ))}
        {p.vl?.map((v, i) => (
          <G key={'v' + i} s={v.s} out={v.out} ctx={ctx}><line x1={X(v.x)} y1={p.y} x2={X(v.x)} y2={p.y + p.h} stroke={col(v.c, 'yellow')} strokeWidth={2.2} strokeDasharray="7 6" />{v.t && <text x={X(v.x) + 6} y={p.y + 18} fontSize={17} fill={col(v.c, 'yellow')} fontWeight={700} fontFamily={FONT}>{v.t}</text>}</G>
        ))}
        {p.hlines?.map((v, i) => (
          <G key={'h' + i} s={v.s} out={v.out} ctx={ctx}><line x1={p.x} y1={Y(v.y)} x2={p.x + p.w} y2={Y(v.y)} stroke={col(v.c, 'yellow')} strokeWidth={2.2} strokeDasharray="7 6" />{v.t && <text x={p.x + 6} y={Y(v.y) - 8} fontSize={17} fill={col(v.c, 'yellow')} fontWeight={700} fontFamily={FONT}>{v.t}</text>}</G>
        ))}
        {p.dots?.map((d, i) => (
          <G key={'d' + i} s={d.s} out={d.out} ctx={ctx}><circle cx={X(d.x)} cy={Y(d.y)} r={6.5} fill={d.open ? VBG : col(d.c, 'yellow')} stroke={d.open ? col(d.c, 'yellow') : VBG} strokeWidth={2} />{d.t && <text x={X(d.x) + 10} y={Y(d.y) - 10} fontSize={17} fill={col(d.c, 'yellow')} fontWeight={700} fontFamily={FONT}>{d.t}</text>}</G>
        ))}
      </>);
    }
    case 'bars': {
      const n = p.items.length;
      const max = p.max ?? Math.max(...p.items.map((i) => i.v));
      const bw = (p.w / n) * 0.62;
      return g(<>
        <line x1={p.x} y1={p.y + p.h} x2={p.x + p.w} y2={p.y + p.h} stroke={MUTED} strokeWidth={2} />
        {p.items.map((it, i) => {
          const bh = (it.v / max) * (p.h - 30);
          const cx = p.x + (p.w * (i + 0.5)) / n;
          const color = col(it.c, (['blue', 'orange', 'green', 'pink', 'purple', 'cyan'] as Col[])[i % 6]);
          const isNew = (it.s ?? p.s ?? 0) === ctx.step && !ctx.anim;
          const k = isNew ? ctx.t : 1;
          return (
            <G key={i} s={it.s} ctx={ctx}>
              <rect x={cx - bw / 2} y={p.y + p.h - bh * k} width={bw} height={bh * k} rx={4} fill={`${color}55`} stroke={color} strokeWidth={2.2} className={ctx.anim && (it.s ?? 0) === ctx.step ? 'vgrow' : undefined} />
              <text x={cx} y={p.y + p.h - bh * k - 8} fontSize={17} fill={INK} textAnchor="middle" fontWeight={700} fontFamily={FONT}>{String(it.v).replace('.', ',')}{p.unit ?? ''}</text>
              <Lines x={cx} y={p.y + p.h + 22} lines={wrap(it.t, 16, p.w / n - 4)} fs={16} color={MUTED} />
            </G>
          );
        })}
      </>);
    }
    case 'grid': {
      const cs = p.cs;
      const fs = p.fs ?? cs * 0.42;
      const ox = p.x + (p.left ? cs : 0), oy = p.y + (p.top ? cs * 0.75 : 0);
      return g(<>
        {p.corner && <Lines x={p.x + cs / 2} y={p.y + cs * 0.375} lines={[p.corner]} fs={fs * 0.7} color={MUTED} />}
        {p.top?.map((t, j) => <Lines key={'t' + j} x={ox + j * cs + cs / 2} y={p.y + cs * 0.375} lines={[t]} fs={fs * 0.8} color={MUTED} b mono />)}
        {p.left?.map((t, i) => <Lines key={'l' + i} x={p.x + cs / 2} y={oy + i * cs + cs / 2} lines={[t]} fs={fs * 0.8} color={MUTED} b mono />)}
        {p.cells.map((r, i) => r.map((v, j) => {
          const mk = p.marks?.find((m) => m.r === i && m.c === j && (m.s ?? 0) <= ctx.step);
          const mc = mk ? col(mk.col, 'yellow') : undefined;
          return (
            <g key={i + '-' + j}>
              <rect x={ox + j * cs} y={oy + i * cs} width={cs} height={cs} fill={mc ? `${mc}40` : 'rgba(255,255,255,.04)'} stroke="rgba(255,255,255,.35)" strokeWidth={1.4} />
              <Lines x={ox + j * cs + cs / 2} y={oy + i * cs + cs / 2} lines={[v]} fs={fs} b mono />
            </g>
          );
        }))}
        {p.groups?.map((gr, i) => {
          const color = col(gr.col, (['orange', 'green', 'pink', 'cyan', 'purple'] as Col[])[i % 5]);
          return <G key={'g' + i} s={gr.s} ctx={ctx}><rect x={ox + gr.c * cs + 5 + i * 1.5} y={oy + gr.r * cs + 5 + i * 1.5} width={gr.w * cs - 10 - i * 3} height={gr.h * cs - 10 - i * 3} rx={cs * 0.3} fill={`${color}1f`} stroke={color} strokeWidth={3.4} /></G>;
        })}
      </>);
    }
    case 'img':
      return g(<>
        <rect x={p.x - 2} y={p.y - 2} width={p.w + 4} height={p.h + 4} rx={6} fill="#fff" />
        <image href={ctx.imgBase + p.src} x={p.x} y={p.y} width={p.w} height={p.h} preserveAspectRatio="xMidYMid meet" />
      </>);
  }
}

function collectGeo(items: Prim[]) {
  const geo: Ctx['geo'] = {};
  for (const p of items) {
    if (p.k === 'box' && p.id) geo[p.id] = { x: p.x, y: p.y, w: p.w, h: p.h };
    if (p.k === 'icon' && p.id) { const s = p.size ?? 64; geo[p.id] = { x: p.x - s / 2, y: p.y - s / 2, w: s, h: s }; }
  }
  return geo;
}

/**
 * Dibuja un VisSpec en el paso `step`.
 * - Web: anim=true (los elementos nuevos entran con CSS: clases vin/vdraw/vgrow).
 * - Video: anim=false y t=progreso 0..1 de la entrada del paso actual.
 */
export function Vis({ v, step = 999, t = 1, anim = false, imgBase = '', className, style, title }: { v: VisSpec; step?: number; t?: number; anim?: boolean; imgBase?: string; className?: string; style?: CSSProperties; title?: string }) {
  const W = v.w ?? 800, H = v.h ?? 450;
  const ctx: Ctx = { step, t, anim, imgBase, geo: collectGeo(v.items) };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} style={style} role="img" aria-label={title} fontFamily={FONT}>
      <defs>
        {(Object.keys(VC) as Col[]).map((k) => (
          <g key={k}>
            <marker id={`va-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill={VC[k]} /></marker>
            <marker id={`vs-${k}`} viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10,0 L0,5 L10,10 Z" fill={VC[k]} /></marker>
          </g>
        ))}
        <filter id="vglow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffd166" floodOpacity="0.9" /></filter>
      </defs>
      {v.items.map((p, i) => <PrimView key={i} p={p} ctx={ctx} />)}
    </svg>
  );
}
