/**
 * Diagramas declarativos y animables. El mismo spec se dibuja:
 *  - en la web, como recorrido paso a paso (cada paso agrega elementos y muestra su explicación);
 *  - en los videos (Remotion), sincronizado con la narración.
 * Cada elemento tiene `s` = paso en el que aparece (0 = desde el inicio) y opcionalmente `out` = paso en el que se va.
 * Este archivo y Vis.tsx se copian tal cual al proyecto de video: no importar nada de fuera de esta carpeta.
 */

export type Col = 'blue' | 'orange' | 'green' | 'pink' | 'purple' | 'yellow' | 'red' | 'gray' | 'white' | 'cyan';
export type IconName =
  | 'pc' | 'laptop' | 'phone' | 'server' | 'router' | 'switch' | 'hub' | 'cloud' | 'user' | 'db' | 'doc' | 'lock'
  | 'mail' | 'globe' | 'cpu' | 'disk' | 'gear' | 'chart' | 'wifi' | 'clock' | 'cube' | 'brain' | 'factory' | 'money';

interface Base {
  /** Paso en el que aparece (0 por defecto). */
  s?: number;
  /** Paso desde el que deja de verse. */
  out?: number;
  /** Pasos en los que se resalta (brillo amarillo). */
  hl?: number[];
  c?: Col;
}

/** Extremos en notación pata de gallo: || uno y solo uno · o| cero o uno · |< uno o muchos · o< cero o muchos. */
export type End = '||' | 'o|' | '|<' | 'o<';

export interface TNode { t: string; c?: Col; s?: number; e?: string; kids?: TNode[] }

export type Prim =
  | (Base & { k: 'box'; id?: string; x: number; y: number; w: number; h: number; t?: string; sub?: string; shape?: 'rect' | 'pill' | 'circle' | 'diamond' | 'db' | 'cloud' | 'note'; fs?: number; solid?: boolean; dash?: boolean; align?: 'c' | 'l' })
  | (Base & { k: 'text'; x: number; y: number; t: string; fs?: number; anchor?: 'start' | 'middle' | 'end'; b?: boolean; w?: number; mono?: boolean })
  | (Base & { k: 'arrow'; a: string | [number, number]; b: string | [number, number]; t?: string; dash?: boolean; two?: boolean; bend?: number; head?: boolean; sw?: number; fs?: number; ea?: End; eb?: End })
  | (Base & { k: 'line'; pts: [number, number][]; dash?: boolean; sw?: number; arrow?: boolean })
  | (Base & { k: 'icon'; id?: string; x: number; y: number; n: IconName; t?: string; size?: number; fs?: number })
  | (Base & { k: 'bits'; x: number; y: number; w: number; h?: number; cells: { t: string; n?: number; c?: Col; sub?: string; s?: number }[]; fs?: number; title?: string; mono?: boolean })
  | (Base & { k: 'table'; x: number; y: number; w: number; head?: string[]; rows: string[][]; rs?: number[]; hi?: { r: number; s: number; c?: Col; to?: number }[]; cw?: number[]; fs?: number; rh?: number; mono?: boolean })
  | (Base & { k: 'seq'; x: number; y: number; w: number; h: number; parts: { t: string; n?: IconName; c?: Col }[]; msgs: { a: number; b: number; t: string; s?: number; c?: Col; dash?: boolean }[]; fs?: number })
  | (Base & { k: 'stack'; x: number; y: number; w: number; h: number; layers: { t: string; d?: string; c?: Col; s?: number }[]; fs?: number })
  | (Base & { k: 'tree'; x: number; y: number; w: number; h: number; root: TNode; fs?: number })
  | (Base & { k: 'plot'; x: number; y: number; w: number; h: number; xr: [number, number]; yr: [number, number]; fns?: { f?: string; pts?: [number, number][]; c?: Col; s?: number; t?: string; area?: [number, number]; between?: string; dash?: boolean; step?: boolean; out?: number }[]; dots?: { x: number; y: number; t?: string; c?: Col; s?: number; out?: number }[]; vl?: { x: number; t?: string; c?: Col; s?: number; out?: number }[]; hlines?: { y: number; t?: string; c?: Col; s?: number; out?: number }[]; xl?: string; yl?: string; ticks?: boolean; xt?: number; yt?: number })
  | (Base & { k: 'bars'; x: number; y: number; w: number; h: number; items: { t: string; v: number; c?: Col; s?: number }[]; max?: number; unit?: string })
  | (Base & { k: 'grid'; x: number; y: number; cs: number; cells: string[][]; top?: string[]; left?: string[]; corner?: string; groups?: { r: number; c: number; h: number; w: number; col?: Col; s?: number }[]; marks?: { r: number; c: number; col?: Col; s?: number }[]; fs?: number })
  | (Base & { k: 'img'; x: number; y: number; w: number; h: number; src: string });

export interface VisSpec { w?: number; h?: number; items: Prim[] }

/** Una escena de recorrido: un diagrama + la explicación de cada paso (say.length = cantidad de pasos). */
export interface VisScene { v: VisSpec; say: string[] }

export const visSteps = (sc: VisScene) => Math.max(1, sc.say.length);
