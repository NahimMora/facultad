import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { allModules, examModules, subjectById } from '../content/subjects';
import { emptyContent, type Exam, type LessonMedia, type Subject, type SubjectContent } from '../content/types';
import { hasContent, loadContent, loadLessonMedia } from '../content/loaders';
import { ModuleTracker } from '../components/ModuleTracker';
import { ExamDate } from '../components/ExamDate';
import { Quiz } from '../components/Quiz';
import { CheatsheetView, ExercisesView, shortsOf, TheoryView, VideosView } from '../components/Study';
import { IntensiveView } from '../components/Intensive';
import { keys } from '../lib/storage';
import { StudyWorkspace } from '../components/StudyWorkspace';
import { useAcademic } from '../lib/useAcademic';
import { finalBlockers, courseName } from '../lib/academic';

const TABS = [
  { id: 'intensivo', label: 'Repaso intensivo' },
  { id: 'teoria', label: 'Teoría visual' },
  { id: 'practica', label: 'Práctica' },
  { id: 'ejercicios', label: 'Ejercicios' },
  { id: 'videos', label: 'Videos' },
  { id: 'machete', label: 'Machete' },
  { id: 'resumen', label: 'Módulos y fechas' },
  { id: 'falta', label: 'Qué falta' },
] as const;
type TabId = (typeof TABS)[number]['id'];

const STATE_LABEL: Record<Exam['state'], string> = { proximo: 'Próximo', rendido: 'Rendido', entregado: 'Entregado', pendiente: 'Pendiente' };

export function SubjectPage() {
  const { id = '' } = useParams();
  const s = subjectById(id);
  if (!s) return <div className="page"><div className="card"><h2>No encontré esa materia</h2><Link to="/" className="btn">Volver al inicio</Link></div></div>;
  return <SubjectView key={s.id} s={s} />;
}

function SubjectView({ s }: { s: Subject }) {
  const [params, setParams] = useSearchParams();
  const {states}=useAcademic();
  const ready = hasContent(s.id);
  const [content, setContent] = useState<SubjectContent>(() => emptyContent(s.id));
  const [media, setMedia] = useState<LessonMedia[]>([]);
  const shorts = useMemo(() => shortsOf(media), [media]);
  const counts: Record<TabId, number> = { intensivo: content.theory.length + content.questions.length, resumen: 1, falta: 1, teoria: content.theory.length, practica: content.questions.length, ejercicios: content.exercises.length, videos: content.videos.length + media.length, machete: content.cheatsheet.length };
  const visibleTabs = TABS.filter((t) => counts[t.id] > 0);
  const tab = (visibleTabs.find((t) => t.id === params.get('tab'))?.id ?? (ready ? 'intensivo' : 'resumen')) as TabId;
  const focus = params.get('tema');
  const examId = s.exams.some((e) => e.id === params.get('examen')) ? params.get('examen')! : s.focus.examId;
  const exam = s.exams.find((e) => e.id === examId)!;
  const mods = useMemo(() => examModules(s, examId).map((m) => m.id), [s, examId]);

  useEffect(() => {
    if (!ready) return;
    let alive = true;
    loadContent(s.id).then((c) => { if (alive) setContent(c); });
    loadLessonMedia(s.id).then((m) => { if (alive) setMedia(m); });
    return () => { alive = false; };
  }, [s.id, ready]);

  // abrir un tema o ejercicio concreto (?tema=<id>) cuando ya cargó el contenido
  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(focus);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, [focus, tab, content]);

  const go = (next: Partial<{ tab: TabId; examen: string; tema: string }>) => {
    const p = new URLSearchParams(params);
    if (next.tab) p.set('tab', next.tab);
    if (next.examen) p.set('examen', next.examen);
    if (next.tema) p.set('tema', next.tema); else p.delete('tema');
    setParams(p, { replace: !next.tema });
    if (!next.tema) window.scrollTo({ top: 0 });
  };

  const studyExams = s.exams.filter((e) => e.kind !== 'tp');
  const modTitle = (mid: string) => allModules(s).find((m) => m.id === mid)?.label;

  if (!params.has('tab') || params.get('tab') === 'intensivo') {
    const blockers=exam.kind==='final'?finalBlockers(s.id,states):[];
    return <div className={`page subject guided-subject${params.get('modo')==='machete'?' pocket-page':''}`} style={{['--h' as string]:s.hue}}>
      <header className="shead"><Link className="back" to="/estudiar">← Estudiar</Link><h1><span aria-hidden>{s.icon}</span> {s.name}</h1></header>
      <details className="exam-switch"><summary>Preparando: {exam.kind==='final'?'Final':exam.name} <small>· cambiar</small></summary><div className="exam-pick" role="group" aria-label="Preparar para">{studyExams.map(e=><button className={`pill ${e.id===examId?'on':''}`} key={e.id} aria-pressed={e.id===examId} onClick={()=>go({examen:e.id})}>{e.kind==='final'?'Final':e.name}{e.state==='rendido'?' ✓':''}</button>)}</div></details>
      {blockers.length>0&&<p className="prerequisite-note">Podés preparar este final. Para rendirlo necesitás aprobar {blockers.map(courseName).join(' y ')}.</p>}
      {content.theory.length ? <StudyWorkspace key={exam.id} s={s} exam={exam} content={content} media={media}/> : <p className="empty" role="status">Abriendo tus diagramas y clases…</p>}
      <details className="quiet-details subject-options"><summary>Información del examen y más material</summary>
        <div id="int-formato"><h2>{exam.kind==='final'?'Formato y antecedentes':'Cómo es el examen'}</h2>{exam.kind==='final'&&!exam.format?.some(f=>f.current)&&<p>Formato actual: <b>A confirmar.</b></p>}{exam.format?.map((f,i)=><p key={i}><span className="ftag">{exam.kind==='final'&&!f.current?'Modelo anterior':f.sure?'Confirmado':'Probable'}</span>{f.text} <small>({f.source})</small></p>)}</div>
        <div className="secondary-tools">{visibleTabs.filter(t=>t.id!=='intensivo').map(t=><button className="btn" key={t.id} onClick={()=>go({tab:t.id})}>{t.label}</button>)}</div>
      </details>
    </div>;
  }

  return (
    <div className={`page subject${tab === 'machete' ? ' pocket-page' : ''}`} style={{ ['--h' as string]: s.hue }}>
      <header className="shead">
        <Link to="/" className="back">← Inicio</Link>
        <h1><span aria-hidden>{s.icon}</span> {s.name}</h1>
        <p className="hint">{s.term} · {s.status === 'cursando' ? 'Cursando' : s.status === 'regular' ? 'Regularizada: falta el final' : 'Aprobada'}</p>
      </header>

      {tab !== 'machete' && <div className="exam-pick" role="group" aria-label="Preparar para">
        <span>Preparar para:</span>
        {studyExams.map((e) => (
          <button key={e.id} type="button" className={`pill ${e.id === examId ? 'on' : ''}`} onClick={() => go({ examen: e.id })} aria-pressed={e.id === examId}>
            {e.name}{e.state === 'rendido' ? ' ✓' : ''}
          </button>
        ))}
      </div>}

      <nav className="tabs" aria-label="Secciones">
        {visibleTabs.map((t) => (
          <button key={t.id} type="button" className={`tab ${t.id === tab ? 'on' : ''}`} onClick={() => go({ tab: t.id })} aria-current={t.id === tab ? 'page' : undefined}>
            {t.label}{t.id === 'falta' && s.missing.length ? <span className="count" aria-label={`${s.missing.length} pendientes`}>{s.missing.length}</span> : null}
          </button>
        ))}
      </nav>

      {!ready && (
        <div className="card wait-card">
          <b>Esta materia todavía no tiene contenido de estudio.</b>
          <p>{s.status === 'cursando'
            ? 'Estoy esperando el material del 2º parcial. En cuanto lo tenga, armo teoría, preguntas con explicación, ejercicios resueltos y videos.'
            : 'Ya está guardado el material para el final. El contenido se arma cuando decidas rendirla.'} En <button type="button" className="linklike" onClick={() => go({ tab: 'falta' })}>Qué falta</button> está la lista.</p>
        </div>
      )}

      {tab === 'resumen' && (
        <>
          <section className="card">
            <div className="exam-head">
              <div>
                <h2>{exam.name}</h2>
                <p className="hint">{STATE_LABEL[exam.state]}{exam.when ? ` · ${exam.when}` : ''} · {exam.modules.length ? `entran: ${exam.modules.map(modTitle).join(', ')}` : 'entra toda la materia'}</p>
              </div>
              {exam.state !== 'rendido' && exam.state !== 'entregado' && <ExamDate subject={s.id} exam={exam.id} />}
            </div>
            {exam.kind === 'final' && !exam.format?.some((f) => f.current) && <p>Formato actual: <b>A confirmar.</b></p>}
            {exam.format && (
              <ul className="format">
                {exam.format.map((f, i) => <li key={i} className={f.sure ? 'sure' : 'guess'}><span className="ftag">{exam.kind === 'final' && !f.current ? 'Modelo anterior' : f.sure ? 'Confirmado' : 'Probable'}</span> {f.text} <span className="hint">({f.source})</span></li>)}
              </ul>
            )}
            {s.links?.map((l) => <a key={l.url} className="btn primary" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
          </section>
          <section className="card">
            <h2>Módulos</h2>
            <p className="hint">Tocá el estado de cada módulo para marcar tu avance: Sin ver → Visto → Lo domino. Se guarda en este navegador.</p>
            <ModuleTracker subject={s} highlight={exam.modules.length ? exam.modules : undefined} />
          </section>
          <section className="card mat">
            <h2>Material guardado</h2>
            <div className="stats">
              <Stat n={s.material.apuntes} l="apuntes" /><Stat n={s.material.parciales} l="parciales" /><Stat n={s.material.practica} l="prácticas" /><Stat n={s.material.clases} l="clases grabadas" />
            </div>
            {s.material.nota && <p className="hint">{s.material.nota}</p>}
            <p className="hint">Los archivos quedan solo en tu carpeta privada. Acá se publica únicamente el contenido redactado para estudiar.</p>
          </section>
        </>
      )}

      {tab === 'intensivo' && <IntensiveView s={s} exam={exam} content={content} media={media} mods={mods}
        openTopic={(id) => go({ tab: 'teoria', tema: `t-${id}` })} openExercise={(id) => go({ tab: 'ejercicios', tema: `e-${id}` })} />}
      {tab === 'teoria' && <TheoryView subject={s} content={content} modules={mods} shorts={shorts} />}
      {tab === 'practica' && (
        <section>
          <p className="hint">Opción múltiple y verdadero o falso. Al tocar una respuesta ves si está bien y por qué.</p>
          <Quiz key={examId} storageKey={keys.quiz(s.id, examId)} items={content.questions.filter((q) => mods.includes(q.module))} tagOf={(q) => modTitle(q.module)} shorts={shorts} />
        </section>
      )}
      {tab === 'ejercicios' && <ExercisesView content={content} modules={mods} shorts={shorts} />}
      {tab === 'videos' && <VideosView content={content} modules={mods} media={media.filter((m) => (content.lessons ?? []).some((l) => l.id === m.id && (exam.kind === 'final' || l.examId === examId)))} />}
      {tab === 'machete' && <CheatsheetView content={content} />}
      {tab === 'falta' && (
        <section className="card">
          <h2>Qué falta para armar el contenido</h2>
          {s.missing.length ? <ul className="missing">{s.missing.map((m) => <li key={m}>{m}</li>)}</ul> : <p>No falta nada.</p>}
        </section>
      )}
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return <div className={`stat ${n ? '' : 'zero'}`}><b>{n}</b><span>{l}</span></div>;
}
