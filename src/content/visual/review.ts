import type { Lesson, Question, TheoryBlock } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, ico, scene } from './h';

/** Casos propios de práctica. Los valores ilustrativos no describen un examen futuro. */
export interface ReviewItem {
  module: string;
  title: string;
  prompt: string;
  choices: [string, string, string, string]; // respuesta correcta primero al redactar
  explain: string;
  nodes: [string, string, string];
  say: [string, string, string];
  layout?: 'compare' | 'flow';
  scenes?: VisScene[];
}

export function reviewBank(subject: string, start: number, items: ReviewItem[]): Question[] {
  return items.map((item, i) => {
    const id = `${subject}-rep-${start + i}`;
    const rotation = (start + i) % 4;
    const options = item.choices.map((_, j) => item.choices[(j + rotation) % 4]);
    const compare = item.layout === 'compare';
    const positions = compare ? [[20, 100, 270, 160], [350, 100, 270, 160], [20, 435, 600, 145]] : [[70, 85, 500, 120], [70, 310, 500, 120], [70, 535, 500, 120]];
    const visual = scene([
      head(item.title),
      ...item.nodes.map((t, j) => {
        const [x, y, w, h] = positions[j];
        return box(x, y, w, h, t, { id: 'n' + j, fs: compare && j < 2 ? 27 : 29, s: j, c: (['blue', 'orange', 'green'] as const)[j] });
      }),
      ...(compare ? [arr('n0', 'n2', { s: 2 }), arr('n1', 'n2', { s: 2 })] : [arr('n0', 'n1', { s: 1 }), arr('n1', 'n2', { s: 2 })]),
      ...(compare ? [] : [ico(320, 255, 'gear', { size: 32, s: 1, c: 'gray' }), ico(320, 480, 'chart', { size: 32, s: 2, c: 'gray' })]),
    ], item.say, 640, compare ? 625 : 700);
    return { id, module: item.module, type: 'mcq', prompt: item.prompt, options, answer: (4 - rotation) % 4, explain: item.explain, scenes: item.scenes ?? [visual], source: 'práctica propia sobre los temas y modelos anteriores' };
  });
}

export function reviewLessons(subject: string, start: number, groups: Question[][], titles: string[]): Lesson[] {
  return groups.map((qs, i) => ({
    id: `${subject}-clase-${start + i}`, examId: 'final', title: titles[i],
    summary: `${qs.length} preguntas choice con explicación visual. Casos propios para practicar los temas del final; no representan su formato oficial.`,
    intro: [
      'Vamos a practicar con preguntas de opción múltiple. Leé el caso y elegí una respuesta antes de escuchar la corrección. Si necesitás más tiempo, pausá el video. Los ejemplos son propios y no anuncian el formato del próximo examen.',
      'Después de cada elección, seguí el diagrama: primero reconocemos los datos o condiciones, después la regla y finalmente la conclusión. En la web podés recorrer esos mismos pasos, mirar el corto y volver a practicar las preguntas que erraste.',
    ],
    parts: qs.map((q) => 'q:' + q.id),
    outro: [
      'Volvé al banco y respondé sin mirar la explicación. Si errás, identificá qué condición pasaste por alto y recorré el diagrama de nuevo. Una respuesta correcta por azar no reemplaza poder justificar el camino.',
      'Cuando te sientas seguro, usá el simulacro con cronómetro. La corrección aparece al terminar y podés repasar tus errores. La cantidad de preguntas y el tiempo son de práctica, no datos oficiales del examen.',
    ],
  }));
}

/** Da teoría visual a módulos que todavía no tenían un bloque propio. */
export function theoryFromReview(qs: Question[], titles: Record<string, string>): TheoryBlock[] {
  return Object.entries(titles).map(([module, title]) => {
    const selected = qs.filter((q) => q.module === module);
    return { id: `repaso-${module}`, module, title, points: selected.map((q) => q.explain), scenes: selected.flatMap((q) => q.scenes ?? []) };
  });
}
