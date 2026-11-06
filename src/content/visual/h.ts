/** Atajos para escribir diagramas (src/vis) de forma compacta. */
import type { Col, IconName, Prim, TNode, VisScene } from '../../vis/types';

type O = Record<string, unknown>;
export const box = (x: number, y: number, w: number, h: number, t: string, o: O = {}) => ({ k: 'box', x, y, w, h, t, ...o }) as Prim;
export const txt = (x: number, y: number, t: string, o: O = {}) => ({ k: 'text', x, y, t, ...o }) as Prim;
export const arr = (a: string | [number, number], b: string | [number, number], o: O = {}) => ({ k: 'arrow', a, b, ...o }) as Prim;
export const ico = (x: number, y: number, n: IconName, o: O = {}) => ({ k: 'icon', x, y, n, ...o }) as Prim;
export const line = (pts: [number, number][], o: O = {}) => ({ k: 'line', pts, ...o }) as Prim;
export const bits = (x: number, y: number, w: number, cells: { t: string; n?: number; c?: Col; sub?: string; s?: number }[], o: O = {}) => ({ k: 'bits', x, y, w, cells, ...o }) as Prim;
export const table = (x: number, y: number, w: number, head: string[] | undefined, rows: string[][], o: O = {}) => ({ k: 'table', x, y, w, head, rows, ...o }) as Prim;
export const seq = (x: number, y: number, w: number, h: number, parts: { t: string; n?: IconName; c?: Col }[], msgs: { a: number; b: number; t: string; s?: number; c?: Col; dash?: boolean }[], o: O = {}) => ({ k: 'seq', x, y, w, h, parts, msgs, ...o }) as Prim;
export const stack = (x: number, y: number, w: number, h: number, layers: { t: string; d?: string; c?: Col; s?: number }[], o: O = {}) => ({ k: 'stack', x, y, w, h, layers, ...o }) as Prim;
export const tree = (x: number, y: number, w: number, h: number, root: TNode, o: O = {}) => ({ k: 'tree', x, y, w, h, root, ...o }) as Prim;
export const plot = (x: number, y: number, w: number, h: number, xr: [number, number], yr: [number, number], o: O = {}) => ({ k: 'plot', x, y, w, h, xr, yr, ...o }) as Prim;
export const bars = (x: number, y: number, w: number, h: number, items: { t: string; v: number; c?: Col; s?: number }[], o: O = {}) => ({ k: 'bars', x, y, w, h, items, ...o }) as Prim;
export const grid = (x: number, y: number, cs: number, cells: string[][], o: O = {}) => ({ k: 'grid', x, y, cs, cells, ...o }) as Prim;
/** Título chico arriba a la izquierda del diagrama. */
export const head = (t: string, o: O = {}) => txt(20, 24, t, { anchor: 'start', fs: 22, b: true, c: 'gray', ...o });
export const scene = (items: Prim[], say: string[], w = 800, h = 450): VisScene => ({ v: { w, h, items }, say });
