import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Exam, LessonMedia, Module, Subject, SubjectContent, TheoryBlock } from '../content/types';
import { examModules } from '../content/subjects';
import { keys, load, save } from '../lib/storage';
import { topicChecks } from '../lib/plan';
import { CheatsheetView, Exercise, LessonPlayer, shortsOf, TheoryCard } from './Study';
import { Quiz } from './Quiz';
import { MockExam } from './MockExam';
import { SelfAssessments } from './SelfAssessments';

/**
 * Espacio de estudio de una materia. Recorrido:
 *   Temas (índice de módulos → un tema por vez) · Practicar (por módulo) · Simulacro · Machete.
 * Ejercicios resueltos y clases en video se abren desde el índice.
 */
const MODES = [{ id: 'aprender', label: 'Temas' }, { id: 'practicar', label: 'Practicar' }, { id: 'simulacro', label: 'Simulacro' }, { id: 'machete', label: 'Machete' }];
const EXTRA = ['ejercicios', 'clases'];

export function StudyWorkspace({ s, exam, content, media }: { s: Subject; exam: Exam; content: SubjectContent; media: LessonMedia[] }) {
  const [params, setParams] = useSearchParams();
  const modules = examModules(s, exam.id);
  const modIds = modules.map((m) => m.id);
  const selfAssessments = (content.selfAssessments ?? []).filter((q) => modIds.includes(q.module));
  const raw = params.get('modo') ?? '';
  const mode = MODES.some((m) => m.id === raw) || EXTRA.includes(raw) || (raw === 'autoevaluaciones' && selfAssessments.length) ? raw : 'aprender';
  const blocks = content.theory.filter((b) => modIds.includes(b.module)).sort((a, b) => modIds.indexOf(a.module) - modIds.indexOf(b.module));
  const selected = params.get('tema')?.replace(/^t-/, '');
  const block = blocks.find((b) => b.id === selected);
  const [checked, setChecked] = useState(() => topicChecks(load<unknown>(keys.planTopics(s.id), {})));
  const lessons = media.filter((m) => content.lessons?.some((l) => l.id === m.id && (exam.kind === 'final' || l.examId === exam.id)));
  const exercises = content.exercises.filter((e) => modIds.includes(e.module));
  const qs = content.questions.filter((q) => modIds.includes(q.module));
  const shorts = shortsOf(media);

  useEffect(() => { if (block && mode === 'aprender') save('study-resume', { subject: s.id, exam: exam.id, topic: block.id, mode }); }, [s.id, exam.id, block, mode]);

  const go = (next: { modo?: string; tema?: string | null; mod?: string | null }) => {
    const p = new URLSearchParams(params); p.delete('tab');
    if (next.modo) p.set('modo', next.modo);
    if (next.tema === null) p.delete('tema'); else if (next.tema) p.set('tema', next.tema);
    if (next.mod === null) p.delete('mod'); else if (next.mod) p.set('mod', next.mod);
    setParams(p, { replace: true });
    document.getElementById('study-controls')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  const toggle = (id: string) => { const next = { ...checked, [id]: !checked[id] }; setChecked(next); save(keys.planTopics(s.id), next); };
  const navMode = EXTRA.includes(mode) || mode === 'autoevaluaciones' ? 'aprender' : mode;

  return <div className="study-workspace">
    <nav id="study-controls" className="study-modes" aria-label="Cómo querés estudiar">{MODES.map((m) => <button key={m.id} className={navMode === m.id ? 'active' : ''} aria-pressed={navMode === m.id} onClick={() => go({ modo: m.id, tema: m.id === 'aprender' ? null : undefined })}>{m.label}</button>)}</nav>
    {mode === 'aprender' && !block && <ModuleIndex s={s} modules={modules} blocks={blocks} checked={checked} questions={qs.length} exercises={exercises.length} lessons={lessons.length} selfAssessments={selfAssessments.length} go={go} />}
    {mode === 'aprender' && block && <TopicView s={s} modules={modules} blocks={blocks} block={block} checked={checked} toggle={toggle} content={content} shorts={shorts} go={go} />}
    {mode === 'practicar' && <Practice s={s} exam={exam} modules={modules} qs={qs} shorts={shorts} mod={params.get('mod')} go={go} />}
    {mode === 'simulacro' && <section id="int-simulacro"><h2>Probate como en un examen</h2><MockExam key={exam.id} storageKey={`mock-${s.id}-${exam.id}`} items={qs} shorts={shorts} /></section>}
    {mode === 'machete' && <CheatsheetView content={content} />}
    {mode === 'autoevaluaciones' && <SelfAssessments key={exam.id} subject={s} examId={exam.id} items={selfAssessments} />}
    {mode === 'ejercicios' && <Exercises list={exercises} shorts={shorts} go={go} />}
    {mode === 'clases' && <Classes lessons={lessons} go={go} />}
  </div>;
}

type Go = (next: { modo?: string; tema?: string | null; mod?: string | null }) => void;
type Shorts = ReturnType<typeof shortsOf>;

function ModuleIndex({ s, modules, blocks, checked, questions, exercises, lessons, selfAssessments, go }: { s: Subject; modules: Module[]; blocks: TheoryBlock[]; checked: Record<string, boolean>; questions: number; exercises: number; lessons: number; selfAssessments: number; go: Go }) {
  const done = blocks.filter((b) => checked[b.id]).length;
  const next = blocks.find((b) => !checked[b.id]) ?? blocks[0];
  const units = s.units.map((u) => ({ title: u.title, modules: u.modules.filter((m) => modules.some((x) => x.id === m.id)) })).filter((u) => u.modules.length);
  return <div className="module-index">
    {s.id === 'pye' && <Link className="btn self-assessments-entry" to="/m/pye/recuperatorio">Preparar el recuperatorio del 2º parcial · con desarrollo</Link>}
    {selfAssessments > 0 && <button className="btn self-assessments-entry" onClick={() => go({ modo: 'autoevaluaciones' })}>Autoevaluaciones · {selfAssessments} preguntas del parcial</button>}
    {next && <div className="index-resume">
      <div><small>{done ? `${done} de ${blocks.length} temas repasados` : `${blocks.length} temas para estudiar`}</small><b>{done ? 'Seguí con' : 'Empezá por'}: {next.title}</b></div>
      <button className="btn primary" onClick={() => go({ tema: next.id })}>{done ? 'Continuar →' : 'Empezar →'}</button>
    </div>}
    {units.map((u) => <section key={u.title} className="index-unit">
      {units.length > 1 && <h2>{u.title}</h2>}
      {u.modules.map((m) => {
        const list = blocks.filter((b) => b.module === m.id);
        const ok = list.filter((b) => checked[b.id]).length;
        return <article key={m.id} className="index-module" id={`mod-${m.id}`}>
          <header><span className="tmod">{m.label}</span><h3>{m.title}</h3><small className={ok && ok === list.length ? 'complete' : ''}>{list.length ? `${ok}/${list.length}` : 'sin temas'}</small></header>
          {list.length > 0 && <ol>{list.map((b) => <li key={b.id}><button onClick={() => go({ tema: b.id })}><span aria-hidden>{checked[b.id] ? '✓' : ''}</span>{b.title}{b.scenes?.length ? null : <em> · solo texto</em>}</button></li>)}</ol>}
          {list.length > 0 && questions > 0 && <button className="linklike index-practice" onClick={() => go({ modo: 'practicar', mod: m.id })}>Practicar este módulo</button>}
        </article>;
      })}
    </section>)}
    <section className="index-extras" aria-label="Más material">
      {exercises > 0 && <button className="index-extra" onClick={() => go({ modo: 'ejercicios' })}><b>Ejercicios y finales resueltos</b><small>{exercises} resoluciones paso a paso</small></button>}
      {lessons > 0 && <button className="index-extra" onClick={() => go({ modo: 'clases' })}><b>Clases en video</b><small>{lessons} clases · son resúmenes: el detalle está en los temas</small></button>}
    </section>
  </div>;
}

function TopicView({ s, modules, blocks, block, checked, toggle, content, shorts, go }: { s: Subject; modules: Module[]; blocks: TheoryBlock[]; block: TheoryBlock; checked: Record<string, boolean>; toggle: (id: string) => void; content: SubjectContent; shorts: Shorts; go: Go }) {
  const mod = modules.find((m) => m.id === block.module);
  const siblings = blocks.filter((b) => b.module === block.module);
  const i = siblings.indexOf(block);
  const nextModule = blocks[blocks.indexOf(siblings[siblings.length - 1]) + 1];
  const checks = content.questions.filter((q) => q.topic === block.id);
  const hasModuleQs = content.questions.some((q) => q.module === block.module);
  return <>
    <div className="topic-crumbs">
      <button className="linklike" onClick={() => go({ tema: null })}>← Índice de módulos</button>
      <span>{mod ? `${mod.label} · ${mod.title}` : ''}</span>
    </div>
    <div className="lesson-position"><span>Tema {i + 1} de {siblings.length}</span><span>{blocks.filter((b) => checked[b.id]).length} repasados de {blocks.length}</span></div>
    {siblings.length > 1 && <ol className="topic-strip" aria-label="Temas del módulo">{siblings.map((b, k) => <li key={b.id}><button className={`${b.id === block.id ? 'active' : ''} ${checked[b.id] ? 'done' : ''}`} aria-current={b.id === block.id ? 'step' : undefined} onClick={() => go({ tema: b.id })} title={b.title}><span>{checked[b.id] ? '✓' : k + 1}</span><small>{b.title}</small></button></li>)}</ol>}
    <TheoryCard key={block.id} b={block} subject={s} short={shorts[block.id] ?? block.video} checks={checks} checksKey={`topic-${s.id}-${block.id}`} />
    <div className="study-next">
      <button className={`btn ${checked[block.id] ? 'reviewed' : ''}`} aria-pressed={checked[block.id] === true} onClick={() => toggle(block.id)}>{checked[block.id] ? '✓ Tema repasado' : 'Marcar como repasado'}</button>
      {i + 1 < siblings.length
        ? <button className="btn primary" onClick={() => go({ tema: siblings[i + 1].id })}>Tema siguiente →</button>
        : <>
          {hasModuleQs && <button className="btn" onClick={() => go({ modo: 'practicar', mod: block.module, tema: null })}>Practicar el módulo</button>}
          {nextModule ? <button className="btn primary" onClick={() => go({ tema: nextModule.id })}>Tema siguiente →</button> : <button className="btn primary" onClick={() => go({ modo: 'simulacro', tema: null })}>Ir al simulacro →</button>}
        </>}
    </div>
  </>;
}

function Practice({ s, exam, modules, qs, shorts, mod, go }: { s: Subject; exam: Exam; modules: Module[]; qs: SubjectContent['questions']; shorts: Shorts; mod: string | null; go: Go }) {
  const withQs = modules.filter((m) => qs.some((q) => q.module === m.id));
  const current = withQs.some((m) => m.id === mod) ? mod : null;
  const items = current ? qs.filter((q) => q.module === current) : qs;
  return <section>
    <h2>Una pregunta por vez</h2>
    <p className="hint">Respondé y leé la explicación antes de avanzar. Tu práctica queda guardada.</p>
    {withQs.length > 1 && <div className="practice-filter" role="group" aria-label="Qué módulo practicar">
      <button className={`pill ${!current ? 'on' : ''}`} aria-pressed={!current} onClick={() => go({ mod: null })}>Todo ({qs.length})</button>
      {withQs.map((m) => <button key={m.id} className={`pill ${current === m.id ? 'on' : ''}`} aria-pressed={current === m.id} onClick={() => go({ mod: m.id })} title={m.title}>{m.label.replace('Módulo ', 'M')}</button>)}
    </div>}
    <Quiz key={`${exam.id}-${current ?? 'todo'}`} storageKey={keys.quiz(s.id, exam.id)} items={items} shorts={shorts} oneAtATime />
  </section>;
}

function Exercises({ list, shorts, go }: { list: SubjectContent['exercises']; shorts: Shorts; go: Go }) {
  const [i, setI] = useState(0);
  const e = list[Math.min(i, list.length - 1)];
  return <section>
    <button className="linklike" onClick={() => go({ modo: 'aprender', tema: null })}>← Índice de módulos</button>
    <h2>Ejercicios y finales resueltos</h2>
    {!e ? <p className="empty">Todavía no hay ejercicios resueltos para este examen.</p> : <>
      <Exercise key={e.id} e={e} short={shorts['ex:' + e.id]} />
      <div className="study-next"><button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>Anterior</button><span>{i + 1}/{list.length}</span><button className="btn" disabled={i >= list.length - 1} onClick={() => setI(i + 1)}>Siguiente ejercicio</button></div>
    </>}
  </section>;
}

function Classes({ lessons, go }: { lessons: LessonMedia[]; go: Go }) {
  const [id, setId] = useState('');
  const lesson = lessons.find((m) => m.id === id) ?? lessons[0];
  return <section id="int-clase">
    <button className="linklike" onClick={() => go({ modo: 'aprender', tema: null })}>← Índice de módulos</button>
    <h2>Clases en video</h2>
    <p className="hint">Son resúmenes narrados de los diagramas. Si un tema se amplió después, la ampliación está en el tema y no en el video.</p>
    {lesson && <LessonPlayer key={lesson.id} m={lesson} />}
    <div className="class-picker">{lessons.map((m, k) => <button key={m.id} aria-pressed={m.id === lesson?.id} className={m.id === lesson?.id ? 'active' : ''} onClick={() => {
      setId(m.id);
      requestAnimationFrame(() => document.querySelector('#int-clase figure')?.scrollIntoView({ block: 'start', behavior: 'instant' }));
    }}><span className="class-number">{k + 1}</span><span>{m.title}<small>{Math.round(m.minutes)} min</small></span></button>)}</div>
  </section>;
}
