import { useEffect, useState } from 'react';
import type { LessonMedia, Question } from '../content/types';
import { load, save } from '../lib/storage';
import { startMock, validMock, type MockSession } from '../lib/mockExam';
import { Rich } from './Rich';
import { StaticVis } from './Walkthrough';
import { QuestionWalkthrough } from './QuestionWalkthrough';

export function MockExam({ storageKey, items, shorts = {} }: { storageKey: string; items: Question[]; shorts?: LessonMedia['shorts'] }) {
  const [count, setCount] = useState(Math.min(20, items.length));
  const [session, setSession] = useState<MockSession | null>(() => {
    const s = load<unknown>(storageKey, null);
    return validMock(s, items) ? s : null;
  });
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!session || session.finishedAt !== undefined) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [session]);
  const commit = (s: MockSession | null) => { setSession(s); save(storageKey, s); setNow(Date.now()); };
  if (!items.length) return <p className="empty">Todavía no hay preguntas para este examen.</p>;
  if (!session) return <div className="mock-exam">
    <p>Practicá con preguntas al azar. Al terminar vas a ver el resultado y la explicación de cada respuesta.</p>
    <p className="hint">El tiempo y la cantidad son para practicar. El formato real se confirma por materia.</p>
    <div className="row"><label>Preguntas <input aria-label="Cantidad de preguntas" type="number" min={1} max={items.length} value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ width: '5rem' }} /></label><span className="hint">de {items.length} disponibles</span>
      <button type="button" className="btn primary" disabled={!Number.isInteger(count) || count < 1 || count > items.length} onClick={() => commit(startMock(items, count))}>Empezar simulacro</button></div>
  </div>;
  const qs = session.ids.map((id) => items.find((q) => q.id === id)!);
  const finished = session.finishedAt !== undefined;
  const answered = qs.filter((q) => session.answers[q.id] !== undefined).length;
  const wrong = qs.filter((q) => session.answers[q.id] !== q.answer);
  const seconds = Math.max(0, Math.floor(((session.finishedAt ?? now) - session.startedAt) / 1000));
  const elapsed = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return <div className="mock-exam">
    <div className="quiz-bar"><span role="timer" aria-label="Tiempo transcurrido">⏱ {elapsed}</span><span>{answered}/{qs.length} respondidas</span></div>
    {finished && <div className="card" role="status"><h3>Resultado: {qs.length - wrong.length} de {qs.length}</h3><p>{wrong.length ? `Tenés ${wrong.length} preguntas para repasar, incluyendo las que dejaste sin responder.` : 'Respondiste todas correctamente.'}</p>
      <div className="row">{wrong.length > 0 && <button className="btn primary" type="button" onClick={() => commit(startMock(wrong, wrong.length))}>Repasar mis errores</button>}<button className="btn ghost" type="button" onClick={() => commit(null)}>Nuevo simulacro</button></div></div>}
    {qs.map((q, i) => {
      const value = session.answers[q.id];
      const opts = q.type === 'tf' ? [{ text: 'Verdadero', value: true }, { text: 'Falso', value: false }] : q.options.map((text, value) => ({ text, value }));
      const right = value === q.answer;
      return <article key={q.id} className={`qcard ${finished ? right ? 'ok' : 'bad' : ''}`} data-qid={q.id}>
        <header className="qhead"><span className="qnum">{i + 1}</span><span className="qtype">{q.type === 'tf' ? 'Verdadero o falso' : 'Opción múltiple'}</span></header>
        <p className="qprompt"><Rich text={q.prompt} /></p>{q.vis && <StaticVis v={q.vis} />}
        <div className={`opts ${q.type === 'tf' ? 'tf' : ''}`}>{opts.map((o) => <button type="button" key={String(o.value)} disabled={finished} aria-pressed={value === o.value} className={`opt ${finished ? o.value === q.answer ? 'right' : value === o.value ? 'wrong' : '' : ''}`} style={!finished && value === o.value ? { outline: '2px solid var(--accent, #6ea8ff)' } : undefined} onClick={() => commit({ ...session, answers: { ...session.answers, [q.id]: o.value } })}><Rich text={o.text} /></button>)}</div>
        {finished && <div className="qfeedback"><p><b>{right ? 'Correcta.' : value === undefined ? 'Sin responder.' : 'Incorrecta.'}</b> <Rich text={q.explain} /></p><QuestionWalkthrough q={q} short={shorts['q:' + q.id]} />{q.source && <p className="hint">Fuente: {q.source}</p>}</div>}
      </article>;
    })}
    {!finished && <div className="row"><p className="hint">Podés cambiar tus respuestas antes de entregar. {qs.length - answered} sin responder.</p><button type="button" className="btn primary" onClick={() => commit({ ...session, finishedAt: Date.now() })}>Terminar y corregir</button></div>}
  </div>;
}
