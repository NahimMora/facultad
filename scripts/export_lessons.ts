/**
 * Arma el guion de cada clase en video a partir del contenido de la materia (teoría con escenas, ejercicios, preguntas).
 * Uso (desde hub/):  npx vite-node scripts/export_lessons.ts <materia> [<materia> ...]
 * Escribe ../video/src/videos/<leccion>/script.json  (beats + visuals) y copia src/vis y public/img al proyecto de video.
 */
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allModules, subjectById } from '../src/content/subjects';
import type { Question, SubjectContent } from '../src/content/types';
import type { VisScene, VisSpec } from '../src/vis/types';

const HUB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VIDEO = resolve(HUB, '..', 'video');

type Scene = Record<string, unknown>;
interface Beat { text: string; part: string; scene?: Scene; hold?: number }

/** Texto para narrar: sin marcado y con lecturas más naturales. */
export function speakable(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/→/g, ', entonces, ')
    .replace(/≈/g, ' aproximadamente ')
    .replace(/≤/g, ' menor o igual que ')
    .replace(/≥/g, ' mayor o igual que ')
    .replace(/≠/g, ' distinto de ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sceneBeats(part: string, heading: string, scenes: VisScene[], visuals: Record<string, VisSpec>): Beat[] {
  const out: Beat[] = [];
  scenes.forEach((sc, k) => {
    const key = `${part}#${k}`;
    visuals[key] = sc.v;
    sc.say.forEach((say, i) => out.push({ text: speakable(say), part, scene: { type: 'vis', key, step: i, heading } }));
  });
  return out;
}

function quizBeats(q: Question, visuals: Record<string, VisSpec>): Beat[] {
  const opts = q.type === 'tf' ? ['Verdadero', 'Falso'] : q.options;
  const ans = q.type === 'tf' ? (q.answer ? 0 : 1) : q.answer;
  const scene = { type: 'quiz', heading: 'Pregunta de repaso', q: speakable(q.prompt), options: opts.map(speakable), answer: ans, at: q.vis ? 10 : 0.99, why: speakable(q.explain).slice(0, 220) };
  const given: Beat[] = [];
  if (q.vis) {
    const key = `q:${q.id}#given`;
    visuals[key] = q.vis;
    given.push({ text: 'Observá los datos del diagrama y pausá si necesitás más tiempo para elegir.', part: 'q:' + q.id, scene: { type: 'vis', key, step: 999, heading: 'Datos para interpretar' }, hold: 4 });
  }
  return [
    { text: `Pregunta de repaso. ${speakable(q.prompt)} Pensalo un momento.`, part: 'q:' + q.id, scene, hold: 2.5 },
    ...given,
    { text: `La correcta es: ${speakable(opts[ans])}. ${speakable(q.explain)}`, part: 'q:' + q.id, ...(q.vis ? { scene: { ...scene, at: 0 } } : {}) },
    ...sceneBeats('q:' + q.id, q.prompt, q.scenes ?? [], visuals),
  ];
}

function build(c: SubjectContent) {
  const s = subjectById(c.subjectId)!;
  const modName = (id: string) => { const m = allModules(s).find((x) => x.id === id); return m ? `${m.label} · ${m.title}` : ''; };
  for (const L of c.lessons ?? []) {
    const visuals: Record<string, VisSpec> = {};
    const beats: Beat[] = [];
    const exam = s.exams.find((e) => e.id === L.examId);
    const titles = L.parts.map((p) => (p.startsWith('ex:') ? 'Ejercicio: ' + c.exercises.find((e) => e.id === p.slice(3))?.title : p.startsWith('q:') ? '' : c.theory.find((b) => b.id === p)?.title)).filter(Boolean) as string[];
    L.intro.forEach((t, i) => beats.push({
      text: speakable(t), part: 'intro',
      scene: i === 0 ? { type: 'title', title: L.title, sub: `${s.name} · ${exam?.name ?? ''}` } : i === 1 ? { type: 'agenda', heading: 'Qué vamos a ver', items: titles } : undefined,
    }));
    for (const part of L.parts) {
      if (part.startsWith('q:')) {
        const q = c.questions.find((x) => x.id === part.slice(2));
        if (!q) throw new Error(`${L.id}: no existe la pregunta ${part}`);
        beats.push(...quizBeats(q, visuals));
      } else if (part.startsWith('ex:')) {
        const e = c.exercises.find((x) => x.id === part.slice(3));
        if (!e) throw new Error(`${L.id}: no existe el ejercicio ${part}`);
        beats.push({ text: `Ejercicio. ${speakable(e.title)}.`, part, scene: { type: 'title', title: e.title, sub: 'Ejercicio resuelto · ' + modName(e.module) } });
        beats.push({ text: speakable(e.statement), part, scene: { type: 'big', heading: 'Enunciado', text: e.statement } });
        if (e.scenes?.length) beats.push(...sceneBeats(part, e.title, e.scenes, visuals));
        else e.steps.forEach((st) => beats.push({ text: `${speakable(st.title)}. ${speakable(st.body)}`, part, scene: { type: 'big', heading: st.title, text: st.body } }));
        if (e.result) beats.push({ text: `Resultado: ${speakable(e.result)}`, part, scene: { type: 'big', heading: 'Resultado', text: e.result, tone: 'good' } });
      } else {
        const b = c.theory.find((x) => x.id === part);
        if (!b) throw new Error(`${L.id}: no existe el bloque ${part}`);
        beats.push({ text: `${speakable(b.title)}.`, part, scene: { type: 'title', title: b.title, sub: modName(b.module) } });
        if (b.scenes?.length) beats.push(...sceneBeats(part, b.title, b.scenes, visuals));
        else b.points.slice(0, 4).forEach((pt) => beats.push({ text: speakable(pt), part, scene: { type: 'big', heading: b.title, text: pt } }));
        if (b.trap) beats.push({ text: `Ojo en el examen: ${speakable(b.trap)}`, part, scene: { type: 'big', heading: 'Ojo en el examen', text: b.trap, tone: 'warn' } });
      }
    }
    L.outro.forEach((t, i) => beats.push({ text: speakable(t), part: 'outro', scene: i === 0 ? { type: 'big', heading: 'Para llevarte', text: L.outro.slice(0, 3).join('\n') } : undefined }));

    const dir = join(VIDEO, 'src', 'videos', L.id);
    mkdirSync(dir, { recursive: true });
    const clipAliases = c.theory.filter((b) => b.videoParts?.length && b.videoParts.every((p) => L.parts.includes(p))).map((b) => ({ id: b.id, title: b.title, parts: b.videoParts }));
    const script = { voice: 'es-AR-TomasNeural', rate: '+4%', title: `${s.short} · ${L.title}`, beats: beats.map((b, i) => ({ id: `b${String(i + 1).padStart(3, '0')}`, ...b })), visuals, clipAliases };
    writeFileSync(join(dir, 'script.json'), JSON.stringify(script, null, 1), 'utf-8');
    const words = beats.reduce((a, b) => a + b.text.split(/\s+/).length, 0);
    console.log(`${L.id}: ${beats.length} beats, ${words} palabras (~${(words / 150).toFixed(1)} min)`);
  }
}

async function main() {
  cpSync(join(HUB, 'src', 'vis'), join(VIDEO, 'src', 'vis'), { recursive: true });
  for (const id of process.argv.slice(2)) {
    const img = join(HUB, 'public', 'img', id);
    if (existsSync(img)) cpSync(img, join(VIDEO, 'public', 'img', id), { recursive: true });
    const mod = await import(`../src/content/subjects/${id}.ts`);
    build(mod.default as SubjectContent);
  }
}

void main();
