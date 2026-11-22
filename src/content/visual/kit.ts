/**
 * Armado de temas "módulo por módulo": escenas con la medida del celular (600 × 440) y preguntas de aplicación.
 * En las escenas cada fila trae su narración, así un paso nunca queda desfasado de lo que se explica.
 */
import type { Col, Prim, VisScene } from '../../vis/types';
import type { McqQuestion, TfQuestion } from '../types';
import { arr, box, head, plot, scene, table, txt } from './h';

export const sc = (items: Prim[], say: string[]): VisScene => scene(items, say, 600, 440);

/** [rótulo, texto del diagrama, narración del paso] */
export type Row = [label: string, detail: string, say: string];
const PALETTE: Col[] = ['blue', 'green', 'orange', 'purple', 'cyan', 'pink', 'yellow'];
const TOP = 52;
const SPACE = 376;

function rows(title: string, items: Row[], arrows: boolean): VisScene {
  const gap = arrows ? 20 : 10;
  const h = Math.min(92, (SPACE - (items.length - 1) * gap) / items.length);
  const fs = items.length > 5 ? 18 : 19;
  return sc([
    head(title),
    ...items.flatMap(([label, detail], i) => {
      const y = TOP + i * (h + gap);
      const c = PALETTE[i % PALETTE.length];
      return [
        box(15, y, 190, h, label, { c, fs, s: i, id: `r${i}` }),
        box(217, y, 368, h, detail, { c: 'gray', fs: fs - 1, s: i }),
        ...(arrows && i ? [arr(`r${i - 1}`, `r${i}`, { c: 'gray', s: i })] : []),
      ];
    }),
  ], items.map((r) => r[2]));
}

/** Secuencia: el orden importa. */
export const flow = (title: string, items: Row[]) => rows(title, items, true);
/** Clasificación: conceptos sin orden. */
export const list = (title: string, items: Row[]) => rows(title, items, false);

/** Grilla de dos columnas, para cuadrantes y pares opuestos. */
export function cards(title: string, items: Row[]): VisScene {
  const lines = Math.ceil(items.length / 2);
  const h = Math.min(170, (SPACE - (lines - 1) * 12) / lines);
  return sc([
    head(title),
    ...items.map(([t, sub], i) => box(i % 2 ? 306 : 15, TOP + Math.floor(i / 2) * (h + 12), i === items.length - 1 && i % 2 === 0 ? 570 : 279, h, t, { c: PALETTE[i % PALETTE.length], fs: 20, sub, s: i })),
  ], items.map((r) => r[2]));
}

/** Tabla que aparece fila por fila. */
export function grow(title: string, cols: string[], items: [cells: string[], say: string][], cw?: number[]): VisScene {
  const rh = Math.min(64, SPACE / (items.length + 1));
  return sc([head(title), table(15, TOP, 570, cols, items.map((r) => r[0]), { rs: items.map((_, i) => i), rh, fs: 18, cw })], items.map((r) => r[1]));
}

/** Campana con una zona pintada; las cuentas aparecen debajo, una por paso. */
export function bell(title: string, o: { area?: [number, number]; df?: number; marks?: { x: number; t: string }[]; lines: [text: string, say: string][] }): VisScene {
  const f = o.df
    ? `0.39*pow(1+x*x/${o.df},${-(o.df + 1) / 2})`
    : '0.399*exp(-x*x/2)';
  return sc([
    head(title),
    plot(30, 60, 540, 175, [-4, 4], [0, 0.44], {
      ticks: false,
      fns: [{ f, c: 'blue', ...(o.area ? { area: o.area } : {}) }],
      vl: o.marks?.map((m) => ({ x: m.x, t: m.t, c: 'yellow' as Col })),
    }),
    ...o.lines.map(([t], i) => txt(300, 278 + i * (150 / o.lines.length), t, { fs: 18, b: true, c: PALETTE[i % PALETTE.length], s: i, w: 565 })),
  ], o.lines.map((l) => l[1]));
}

/** Fábrica de preguntas de un módulo. La correcta va primera: el Quiz mezcla las opciones al mostrarlas. */
export function asker(module: string, source?: string) {
  return {
    mcq: (id: string, topic: string, prompt: string, right: string, wrong: string[], explain: string, from = source): McqQuestion =>
      ({ id, module, topic, type: 'mcq', prompt, options: [right, ...wrong], answer: 0, explain, source: from }),
    tf: (id: string, topic: string, prompt: string, answer: boolean, explain: string, from = source): TfQuestion =>
      ({ id, module, topic, type: 'tf', prompt, answer, explain, source: from }),
  };
}

export const VIDEO_NOTE = 'El video es un resumen anterior de todo el módulo: el detalle actualizado está en los temas.';
