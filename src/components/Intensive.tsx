import type { Exam, LessonMedia, Subject, SubjectContent } from '../content/types';
import { allModules } from '../content/subjects';
import { keys } from '../lib/storage';
import { Quiz } from './Quiz';
import { MockExam } from './MockExam';
import { Rich } from './Rich';
import { CheatsheetView, LessonPlayer } from './Study';

/**
 * Repaso intensivo de un examen, en el orden en que conviene estudiarlo:
 * formato → clase completa en video → temas (recorridos visuales) → ejercicios modelo → práctica → machete.
 */
export function IntensiveView({ s, exam, content, media, mods, openTopic, openExercise }: {
  s: Subject; exam: Exam; content: SubjectContent; media: LessonMedia[]; mods: string[];
  openTopic: (id: string) => void; openExercise: (id: string) => void;
}) {
  const lessonIds = new Set((content.lessons ?? []).filter((l) => l.examId === exam.id).map((l) => l.id));
  const lessons = media.filter((m) => lessonIds.has(m.id));
  const pending = (content.lessons ?? []).filter((l) => l.examId === exam.id && !media.some((m) => m.id === l.id));
  const blocks = content.theory.filter((b) => mods.includes(b.module));
  const ex = content.exercises.filter((e) => mods.includes(e.module));
  const qs = content.questions.filter((q) => mods.includes(q.module));
  const modTitle = (mid: string) => allModules(s).find((m) => m.id === mid)?.label;
  const vmin = Math.round(lessons.reduce((a, m) => a + m.minutes, 0));

  const steps = [
    { id: 'formato', t: 'Cómo es el examen', min: 3, show: !!exam.format?.length },
    { id: 'clase', t: 'Clase completa en video', min: vmin || 15, show: lessons.length > 0 || pending.length > 0 },
    { id: 'temas', t: 'Tema por tema, con diagramas', min: blocks.length * 3, show: blocks.length > 0 },
    { id: 'ejercicios', t: 'Ejercicios modelo', min: ex.length * 5, show: ex.length > 0 },
    { id: 'practica', t: 'Práctica con corrección', min: Math.round(qs.length * 0.7), show: qs.length > 0 },
    { id: 'simulacro', t: 'Simulacro con cronómetro', min: 20, show: qs.length > 0 },
    { id: 'machete', t: 'Machete final', min: 8, show: content.cheatsheet.length > 0 },
  ].filter((x) => x.show);
  const jump = (id: string) => document.getElementById(`int-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="intensive">
      <section className="card int-hero">
        <p className="eyebrow">Repaso intensivo · {exam.name}</p>
        <h2>Seguí estos pasos en orden</h2>
        <ol className="int-steps">
          {steps.map((x, i) => <li key={x.id}><button type="button" className="linklike" onClick={() => jump(x.id)}><span className="int-n">{i + 1}</span>{x.t}</button><span className="hint">~{x.min}′</span></li>)}
        </ol>
        <p className="hint">Total aproximado: {Math.round(steps.reduce((a, x) => a + x.min, 0) / 6) / 10} h. Tu avance en la práctica se guarda en este navegador.</p>
      </section>

      {exam.format?.length ? (
        <section id="int-formato" className="card">
          <h2>1. Cómo es el examen</h2>
          <div className="int-grid">{exam.format.map((f, i) => <div key={i} className={`int-tile ${f.sure ? 'sure' : 'guess'}`}><span className="ftag">{f.sure ? 'Confirmado' : 'Probable'}</span><p><Rich text={f.text} /></p><span className="hint">{f.source}</span></div>)}</div>
        </section>
      ) : null}

      {(lessons.length > 0 || pending.length > 0) && (
        <section id="int-clase" className="card">
          <h2>{steps.findIndex((x) => x.id === 'clase') + 1}. Clase completa en video</h2>
          <p className="hint">Miralo de punta a punta la primera vez. Con el celular, girá la pantalla y usá pantalla completa. El índice te deja saltar a un tema.</p>
          {lessons.map((m) => <LessonPlayer key={m.id} m={m} />)}
          {pending.map((l) => <div key={l.id} className="empty">⏳ “{l.title}” se está renderizando. Mientras tanto, seguí con los temas de abajo: son los mismos diagramas, paso a paso.</div>)}
        </section>
      )}

      {blocks.length > 0 && (
        <section id="int-temas" className="card">
          <h2>{steps.findIndex((x) => x.id === 'temas') + 1}. Tema por tema</h2>
          <p className="hint">Cada tema tiene un diagrama que se arma paso a paso con su explicación, y un video corto. Tocá uno para abrirlo.</p>
          <div className="int-topics">
            {blocks.map((b) => (
              <button key={b.id} type="button" className="int-topic" onClick={() => openTopic(b.id)}>
                <span className="hint">{modTitle(b.module)}</span>
                <b>{b.title}</b>
                <span className="hint">{b.scenes?.length ? `${b.scenes.reduce((a, sc) => a + sc.say.length, 0)} pasos visuales` : 'texto'}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {ex.length > 0 && (
        <section id="int-ejercicios" className="card">
          <h2>{steps.findIndex((x) => x.id === 'ejercicios') + 1}. Ejercicios modelo</h2>
          <p className="hint">Intentalo en papel y después mirá la resolución visual.</p>
          <div className="int-topics">
            {ex.map((e) => <button key={e.id} type="button" className="int-topic" onClick={() => openExercise(e.id)}><span className="hint">{modTitle(e.module)}</span><b>{e.title}</b></button>)}
          </div>
        </section>
      )}

      {qs.length > 0 && (
        <section id="int-practica" className="card">
          <h2>{steps.findIndex((x) => x.id === 'practica') + 1}. Práctica</h2>
          <p className="hint">Opción múltiple y verdadero o falso. Al tocar una respuesta ves al instante si está bien y por qué.</p>
          <Quiz storageKey={keys.quiz(s.id, exam.id)} items={qs} tagOf={(q) => modTitle(q.module)} />
        </section>
      )}

      {qs.length > 0 && <section id="int-simulacro" className="card">
        <h2>Simulacro con cronómetro</h2>
        <MockExam key={`${s.id}-${exam.id}`} storageKey={`mock-${s.id}-${exam.id}`} items={qs} />
      </section>}

      {content.cheatsheet.length > 0 && (
        <section id="int-machete" className="card">
          <h2>{steps.findIndex((x) => x.id === 'machete') + 1}. Machete (leelo dos veces antes de entrar)</h2>
          <CheatsheetView content={content} />
        </section>
      )}
    </div>
  );
}
