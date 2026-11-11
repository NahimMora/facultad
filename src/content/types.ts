import type { VisScene, VisSpec } from '../vis/types';

/**
 * Modelo de datos de la plataforma.
 * - `Subject` (en subjects.ts) es liviano y siempre se carga: nombre, estado, módulos, exámenes, qué falta.
 * - `SubjectContent` (en subjects/<id>.ts) es pesado y se carga a demanda al abrir la materia.
 * Todo el contenido es redacción propia (resúmenes, preguntas, ejemplos): nunca copias de PDFs de la cátedra.
 */

export type SubjectStatus = 'cursando' | 'regular' | 'aprobada';
export type ExamKind = 'parcial' | 'recuperatorio' | 'tp' | 'final';
export type ExamState = 'proximo' | 'rendido' | 'entregado' | 'pendiente';

export interface Unit {
  title: string;
  modules: Module[];
}

export interface Module {
  /** Identificador estable dentro de la materia: 'm8', 't3'… */
  id: string;
  /** Etiqueta visible: "Módulo 8", "Tema 3". */
  label: string;
  title: string;
  topics?: string[];
}

export interface Exam {
  id: string;
  name: string;
  kind: ExamKind;
  state: ExamState;
  /** Módulos que entran (ids de Module). Vacío = toda la materia. */
  modules: string[];
  /** Cuándo es según la hoja de ruta (texto libre: "semana 14"). La fecha exacta la carga el usuario en la web. */
  when?: string;
  /** Formato conocido. Cada ítem indica de dónde sale el dato. */
  format?: { text: string; source: string; sure: boolean }[];
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  term: string;
  status: SubjectStatus;
  /** Tono de la tarjeta (hue HSL 0-360). */
  hue: number;
  icon: string;
  units: Unit[];
  exams: Exam[];
  /** Objetivo actual de estudio. */
  focus: { examId: string; note: string };
  /** Material conseguido (solo conteos: los archivos quedan en la carpeta privada). */
  material: { apuntes: number; parciales: number; practica: number; clases: number; nota?: string };
  /** Lo que falta para poder armar el contenido del objetivo actual. */
  missing: string[];
  links?: { label: string; url: string }[];
}

/* ---------- contenido de estudio (a demanda) ---------- */

export interface TheoryBlock {
  id: string;
  module: string;
  title: string;
  /** Párrafos o viñetas con marcado simple: **negrita**, `código`, saltos de línea. */
  points: string[];
  /** Comparaciones o tablas cortas. */
  table?: { head: string[]; rows: string[][] };
  /** Lo que suelen preguntar / trampa típica. */
  trap?: string;
  /** Recorridos visuales paso a paso (lo principal del bloque). */
  scenes?: VisScene[];
  /** Video del tema cuando no sale de una clase (p. ej., los del sitio anterior de IISW). */
  video?: { src: string; poster?: string; minutes: number };
  /** Partes contiguas de una clase que también explican este bloque de teoría. */
  videoParts?: string[];
}

export interface McqQuestion {
  id: string;
  module: string;
  type: 'mcq';
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
  /** Diagrama de apoyo para la pregunta. */
  vis?: VisSpec;
  /** Resolución visual: se muestra recién después de corregir. */
  scenes?: VisScene[];
  /** Explicación específica de por qué cada opción incorrecta está mal (mismo índice que options). */
  why?: (string | null)[];
  source?: string;
}

export interface TfQuestion {
  id: string;
  module: string;
  type: 'tf';
  prompt: string;
  answer: boolean;
  explain: string;
  vis?: VisSpec;
  scenes?: VisScene[];
  source?: string;
}

export type Question = McqQuestion | TfQuestion;

export interface WorkedExercise {
  id: string;
  module: string;
  title: string;
  statement: string;
  steps: { title: string; body: string }[];
  result?: string;
  /** Resolución visual paso a paso. */
  scenes?: VisScene[];
}

export interface VideoItem {
  id: string;
  module?: string;
  title: string;
  /** Ruta relativa dentro de public/ (videos/<materia>/<id>.mp4). */
  src: string;
  poster?: string;
  minutes: number;
  transcript?: string;
}

/** Clase completa en video (10-15 min) armada con los bloques de teoría y ejercicios, en orden. */
export interface Lesson {
  /** id del video: '<materia>-clase-<n>' */
  id: string;
  examId: string;
  title: string;
  /** Qué se ve, en una línea. */
  summary: string;
  /** Narración de apertura (cada frase = un paso). */
  intro: string[];
  /** Secuencia: id de bloque de teoría, 'ex:<id>' para ejercicio, 'q:<id>' para pregunta de repaso. */
  parts: string[];
  /** Cierre. */
  outro: string[];
}

/** Lo que deja el render de una clase (scripts/slice_lesson.py): video largo + cortos por bloque. */
export interface LessonMedia {
  id: string;
  title: string;
  src: string;
  poster: string;
  minutes: number;
  chapters: { part: string; title: string; at: number }[];
  shorts: Record<string, { src: string; poster: string; minutes: number }>;
}

export interface SubjectContent {
  subjectId: string;
  theory: TheoryBlock[];
  questions: Question[];
  exercises: WorkedExercise[];
  videos: VideoItem[];
  cheatsheet: { t: string; d: string }[];
  lessons?: Lesson[];
}

export const emptyContent = (subjectId: string): SubjectContent => ({ subjectId, theory: [], questions: [], exercises: [], videos: [], cheatsheet: [] });
