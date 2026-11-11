import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS, examModules } from '../content/subjects';
import { loadContent } from '../content/loaders';
import type { TheoryBlock } from '../content/types';
import { keys, load, save } from '../lib/storage';
import { byExamDate, dateLabel, isISODate, topicChecks } from '../lib/plan';
import { countdownLabel, daysUntil } from '../lib/dates';

const FINALS = SUBJECTS.filter((s) => s.exams.some((e) => e.kind === 'final' && e.state !== 'rendido'));

export function PlanPage() {
  const [dates, setDates] = useState<Record<string, string>>(() => Object.fromEntries(FINALS.map((s) => {
    const value = load<unknown>(keys.examDate(s.id, 'final'), '');
    return [s.id, isISODate(value) ? value : ''];
  })));
  const [checks, setChecks] = useState<Record<string, Record<string, boolean>>>(() => Object.fromEntries(FINALS.map((s) => [s.id, topicChecks(load<unknown>(keys.planTopics(s.id), {}))])));
  const [topics, setTopics] = useState<Record<string, TheoryBlock[]>>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all(FINALS.map(async (s) => {
      const content = await loadContent(s.id);
      const modules = new Map(examModules(s, 'final').map((m, index) => [m.id, index]));
      const blocks = content.theory.filter((b) => modules.has(b.module)).sort((a, b) => modules.get(a.module)! - modules.get(b.module)!);
      return [s.id, blocks] as const;
    })).then((entries) => { if (alive) setTopics(Object.fromEntries(entries)); }).catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, []);

  const changeDate = (id: string, value: string) => {
    if (value !== '' && !isISODate(value)) return;
    setDates((previous) => ({ ...previous, [id]: value }));
    save(keys.examDate(id, 'final'), value);
  };
  const changeTopic = (subject: string, id: string, checked: boolean) => {
    const next = { ...checks[subject], [id]: checked };
    setChecks((previous) => ({ ...previous, [subject]: next }));
    save(keys.planTopics(subject), next);
  };
  const dated = FINALS.filter((s) => dates[s.id]).length;

  return <div className="page plan-page">
    <header className="hero">
      <p className="eyebrow">Tus once materias</p>
      <h1>Plan de finales</h1>
      <Link to="/carrera">Ver el estado de todas las materias de la carrera</Link>
      <p>Los tenés repartidos del <b>30/11 al 18/12</b>. Cargá la fecha de cada materia para ordenar el repaso.</p>
      <p className="hint">{dated} de {FINALS.length} fechas cargadas. Primero aparecen las fechas conocidas; después, las que están <b>A confirmar</b>.</p>
    </header>
    <p className="hint">Abrí una materia y marcá cada tema cuando lo hayas repasado. Las fechas y la checklist se guardan en este navegador, en este dispositivo.</p>
    <p className="hint">Este plan reúne las once materias con material de estudio. Inglés I, regularizada, figura en Carrera.</p>
    {failed && <p role="alert" className="empty">No pude cargar los temas. Recargá la página para intentarlo de nuevo.</p>}
    <ol className="plan-list" aria-label="Finales ordenados por fecha">
      {byExamDate(FINALS, dates).map((s) => {
        const blocks = topics[s.id];
        const done = blocks?.filter((b) => checks[s.id]?.[b.id]).length ?? 0;
        const total = blocks?.length ?? 0;
        const confirmed = s.exams.find((e) => e.kind === 'final')?.format?.filter((f) => f.current) ?? [];
        const date = dates[s.id];
        return <li key={s.id}>
          <details className="plan-card" data-plan-subject={s.id} style={{ ['--h' as string]: s.hue }}>
            <summary>
              <span className="plan-card-top"><b>{s.icon} {s.name}</b><span className={`badge ${date ? 'ok' : 'wait'}`}>{date ? <time dateTime={date}>{dateLabel(date)}</time> : 'A confirmar'}</span></span>
              <span className="plan-progress"><span className="bar thin"><span style={{ width: `${total ? done / total * 100 : 0}%` }} /></span><span>{blocks ? `${done}/${total} temas repasados` : 'Cargando temas…'}</span></span>
            </summary>
            <div className="plan-body">
              <label className="plan-date"><span>Fecha de {s.short}</span><input type="date" aria-label={`Fecha del final de ${s.short}`} value={date} onChange={(e) => changeDate(s.id, e.target.value)} /></label>
              {date && <p className="hint">{countdownLabel(daysUntil(date))}</p>}
              <p className="plan-format"><b>Formato actual:</b> {confirmed.length ? confirmed.map((f) => f.text).join(' ') : 'A confirmar.'}</p>
              {confirmed.map((f) => <p className="hint" key={f.text}>Fuente: {f.source}.</p>)}
              <Link className="btn primary" to={`/m/${s.id}?examen=final`}>Preparar el final de {s.short}</Link>
              <h2 className="plan-topic-title">Checklist por tema</h2>
              {blocks ? <ul className="plan-topics">{blocks.map((b) => <li key={b.id}>
                <label><input type="checkbox" checked={checks[s.id]?.[b.id] === true} onChange={(e) => changeTopic(s.id, b.id, e.target.checked)} /><span>{b.title}</span></label>
                <Link to={`/m/${s.id}?examen=final&tab=teoria&tema=t-${b.id}`} aria-label={`Ver diagramas de ${b.title}`}>Ver</Link>
              </li>)}</ul> : <p className="hint">Cargando los temas de la materia…</p>}
            </div>
          </details>
        </li>;
      })}
    </ol>
  </div>;
}
