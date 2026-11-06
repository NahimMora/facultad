import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { allModules, examModules, subjectById } from '../content/subjects';
import { emptyContent, type Exam, type Subject, type SubjectContent } from '../content/types';
import { hasContent, loadContent } from '../content/loaders';
import { ModuleTracker } from '../components/ModuleTracker';
import { ExamDate } from '../components/ExamDate';
import { Quiz } from '../components/Quiz';
import { CheatsheetView, ExercisesView, TheoryView, VideosView } from '../components/Study';
import { keys } from '../lib/storage';

const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'teoria', label: 'Teoría' },
  { id: 'practica', label: 'Práctica' },
  { id: 'ejercicios', label: 'Ejercicios' },
  { id: 'videos', label: 'Videos' },
  { id: 'machete', label: 'Machete' },
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
  const ready = hasContent(s.id);
  const [content, setContent] = useState<SubjectContent>(() => emptyContent(s.id));
  const counts: Record<TabId, number> = { resumen: 1, falta: 1, teoria: content.theory.length, practica: content.questions.length, ejercicios: content.exercises.length, videos: content.videos.length, machete: content.cheatsheet.length };
  const visibleTabs = TABS.filter((t) => counts[t.id] > 0);
  const tab = (visibleTabs.find((t) => t.id === params.get('tab'))?.id ?? 'resumen') as TabId;
  const examId = s.exams.some((e) => e.id === params.get('examen')) ? params.get('examen')! : s.focus.examId;
  const exam = s.exams.find((e) => e.id === examId)!;
  const mods = useMemo(() => examModules(s, examId).map((m) => m.id), [s, examId]);

  useEffect(() => {
    if (!ready) return;
    let alive = true;
    loadContent(s.id).then((c) => { if (alive) setContent(c); });
    return () => { alive = false; };
  }, [s.id, ready]);

  const go = (next: Partial<{ tab: TabId; examen: string }>) => {
    const p = new URLSearchParams(params);
    if (next.tab) p.set('tab', next.tab);
    if (next.examen) p.set('examen', next.examen);
    setParams(p, { replace: true });
  };

  const studyExams = s.exams.filter((e) => e.kind !== 'tp');
  const modTitle = (mid: string) => allModules(s).find((m) => m.id === mid)?.label;

  return (
    <div className="page subject" style={{ ['--h' as string]: s.hue }}>
      <header className="shead">
        <Link to="/" className="back">← Inicio</Link>
        <h1><span aria-hidden>{s.icon}</span> {s.name}</h1>
        <p className="hint">{s.term} · {s.status === 'cursando' ? 'Cursando' : s.status === 'regular' ? 'Regularizada: falta el final' : 'Aprobada'}</p>
      </header>

      <div className="exam-pick" role="group" aria-label="Preparar para">
        <span>Preparar para:</span>
        {studyExams.map((e) => (
          <button key={e.id} type="button" className={`pill ${e.id === examId ? 'on' : ''}`} onClick={() => go({ examen: e.id })} aria-pressed={e.id === examId}>
            {e.name}{e.state === 'rendido' ? ' ✓' : ''}
          </button>
        ))}
      </div>

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
            {exam.format && (
              <ul className="format">
                {exam.format.map((f, i) => <li key={i} className={f.sure ? 'sure' : 'guess'}><span className="ftag">{f.sure ? 'Confirmado' : 'Probable'}</span> {f.text} <span className="hint">({f.source})</span></li>)}
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

      {tab === 'teoria' && <TheoryView subject={s} content={content} modules={mods} />}
      {tab === 'practica' && (
        <section>
          <p className="hint">Opción múltiple y verdadero o falso. Al tocar una respuesta ves si está bien y por qué.</p>
          <Quiz key={examId} storageKey={keys.quiz(s.id, examId)} items={content.questions.filter((q) => mods.includes(q.module))} tagOf={(q) => modTitle(q.module)} />
        </section>
      )}
      {tab === 'ejercicios' && <ExercisesView content={content} modules={mods} />}
      {tab === 'videos' && <VideosView content={content} modules={mods} />}
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
