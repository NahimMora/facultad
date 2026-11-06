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
}

export interface McqQuestion {
  id: string;
  module: string;
  type: 'mcq';
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
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

export interface SubjectContent {
  subjectId: string;
  theory: TheoryBlock[];
  questions: Question[];
  exercises: WorkedExercise[];
  videos: VideoItem[];
  cheatsheet: { t: string; d: string }[];
}

export const emptyContent = (subjectId: string): SubjectContent => ({ subjectId, theory: [], questions: [], exercises: [], videos: [], cheatsheet: [] });
