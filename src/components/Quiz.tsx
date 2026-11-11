import { useRef, useState } from 'react';
import type { LessonMedia, Question } from '../content/types';
import { load, save } from '../lib/storage';
import { shuffledIndices } from '../lib/shuffle';
import { Rich } from './Rich';
import { StaticVis } from './Walkthrough';
import { QuestionWalkthrough } from './QuestionWalkthrough';

type Answers = Record<string, number | boolean>;

/** Mezcla las opciones, pero deja al final las del tipo "Todas las respuestas anteriores…". */
const TAIL = /^(todas|ninguna) (las|de las) (respuestas|anteriores)/i;
function orderOptions(options: string[], seed: string): number[] {
  const tail = options.map((o, i) => (TAIL.test(o) ? i : -1)).filter((i) => i >= 0);
  const body = options.map((_, i) => i).filter((i) => !tail.includes(i));
  return [...shuffledIndices(body.length, seed).map((k) => body[k]), ...tail];
}

const isRight = (q: Question, v: number | boolean | undefined) => v !== undefined && v === q.answer;

/** Cuestionario de corrección inmediata: al tocar una opción se marca y aparece el porqué. */
export function Quiz({ storageKey, items, tagOf, shorts = {}, oneAtATime = false }: { storageKey: string; items: Question[]; tagOf?: (q: Question) => string | undefined; shorts?: LessonMedia['shorts']; oneAtATime?: boolean }) {
  const [ans, setAns] = useState<Answers>(() => {
    const value = load<unknown>(storageKey, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).filter(([,v])=>typeof v==='boolean'||typeof v==='number')) : {};
  });
  const [position,setPosition] = useState(()=>oneAtATime?Math.max(0,items.findIndex(q=>ans[q.id]===undefined)):0);
  const questionStart = useRef<HTMLParagraphElement>(null);
  const move = (next: number) => {
    setPosition(next);
    questionStart.current?.scrollIntoView({block:'start',behavior:'instant'});
    questionStart.current?.focus({preventScroll:true});
  };
  const done = items.filter((q) => ans[q.id] !== undefined).length;
  const ok = items.filter((q) => isRight(q, ans[q.id])).length;
  const commit = (n: Answers) => { save(storageKey, n); return n; };
  const pick = (qid: string, v: number | boolean) => setAns((a) => (a[qid] !== undefined ? a : commit({ ...a, [qid]: v })));
  const reset = () => {setAns(commit({}));if(oneAtATime)move(0);};
  const retryWrong = () => {if(oneAtATime)move(Math.max(0,items.findIndex(q=>ans[q.id]!==undefined&&!isRight(q,ans[q.id]))));setAns((a) => commit(Object.fromEntries(Object.entries(a).filter(([k, v]) => {
    const q = items.find((x) => x.id === k);
    return q ? isRight(q, v) : true;
  }))));};

  if (!items.length) return <p className="empty">Todavía no hay preguntas cargadas para esta selección.</p>;
  return (
    <div className="quiz">
      <div className="quiz-bar" role="status">
        <span><b>{ok}</b> bien de <b>{done}</b> · {items.length} en total{done > 0 && <> · <b>{Math.round((ok / done) * 100)} %</b></>}</span>
        <span className="row">
          {done > ok && <button type="button" className="btn small" onClick={retryWrong}>Reintentar las que erré</button>}
          {done > 0 && <button type="button" className="btn small ghost" onClick={reset}>Empezar de nuevo</button>}
        </span>
      </div>
      {oneAtATime && <p ref={questionStart} className="question-position" tabIndex={-1} aria-live="polite">Pregunta {position+1} de {items.length}</p>}
      {(oneAtATime ? items.slice(position,position+1) : items).map((q, i) => <QuestionCard key={q.id} q={q} n={(oneAtATime?position:0)+i + 1} tag={tagOf?.(q)} v={ans[q.id]} onPick={(v) => pick(q.id, v)} short={shorts['q:' + q.id]} />)}
      {oneAtATime && <div className="study-next"><button className="btn" disabled={position===0} onClick={()=>move(position-1)}>Anterior</button><button className="btn primary" disabled={position===items.length-1} onClick={()=>move(position+1)}>Siguiente pregunta →</button></div>}
    </div>
  );
}

function QuestionCard({ q, n, tag, v, onPick, short }: { q: Question; n: number; tag?: string; v: number | boolean | undefined; onPick: (v: number | boolean) => void; short?: LessonMedia['shorts'][string] }) {
  const answered = v !== undefined;
  const right = isRight(q, v);
  const opts: { label: string; value: number | boolean }[] = q.type === 'tf'
    ? [{ label: 'Verdadero', value: true }, { label: 'Falso', value: false }]
    : orderOptions(q.options, q.id).map((i) => ({ label: q.options[i], value: i }));
  const wrongWhy = !right && q.type === 'mcq' && typeof v === 'number' ? q.why?.[v] : null;
  return (
    <article className={`qcard ${answered ? (right ? 'ok' : 'bad') : ''}`} data-qid={q.id}>
      <header className="qhead">
        <span className="qnum">{n}</span>
        <span className="qtype">{q.type === 'tf' ? 'Verdadero o falso' : 'Opción múltiple'}{tag ? ` · ${tag}` : ''}</span>
        {answered && <span className={`qscore ${right ? 'ok' : 'bad'}`}>{right ? '✔ Correcta' : '✘ Incorrecta'}</span>}
      </header>
      <p className="qprompt"><Rich text={q.prompt} /></p>
      {q.vis && <StaticVis v={q.vis} />}
      <div className={`opts ${q.type === 'tf' ? 'tf' : ''}`}>
        {opts.map((o) => {
          const cls = answered ? (o.value === q.answer ? 'right' : o.value === v ? 'wrong' : '') : '';
          return <button key={String(o.value)} type="button" className={`opt ${cls}`} disabled={answered} onClick={() => onPick(o.value)}><Rich text={o.label} /></button>;
        })}
      </div>
      {answered && (
        <div className="qfeedback">
          {wrongWhy && <p className="qwhy"><Rich text={wrongWhy} /></p>}
          <p><b>Por qué:</b> <Rich text={q.explain} /></p>
          <QuestionWalkthrough q={q} short={short} />
          {q.source && <p className="hint">Fuente: {q.source}</p>}
        </div>
      )}
    </article>
  );
}
