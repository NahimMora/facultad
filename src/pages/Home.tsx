import { Link } from 'react-router-dom';
import { SUBJECTS, examModules } from '../content/subjects';
import type { Subject } from '../content/types';
import { hasContent } from '../content/loaders';
import { countdownLabel, daysUntil } from '../lib/dates';
import { keys, load, moduleStates } from '../lib/storage';

function progress(s: Subject, examId: string) {
  const mods = examModules(s, examId);
  const st = moduleStates(s.id);
  const pts = mods.reduce((a, m) => a + (st[m.id] ?? 0), 0);
  return mods.length ? Math.round((pts / (mods.length * 2)) * 100) : 0;
}

function countdown(s: Subject, examId: string) {
  const v = load<string>(keys.examDate(s.id, examId), '');
  return v ? daysUntil(v) : null;
}

export function Home() {
  const cursando = SUBJECTS.filter((s) => s.status === 'cursando');
  const finales = SUBJECTS.filter((s) => s.status === 'regular');
  return (
    <div className="page">
      <header className="hero">
        <h1>Mi carrera</h1>
        <p><b>{cursando.length}</b> materias con 2º parcial por rendir · <b>{finales.length}</b> regularizadas, con el final pendiente</p>
      </header>

      <h2 className="sec">Ahora: segundos parciales</h2>
      <div className="now-grid">
        {cursando.map((s) => <NowCard key={s.id} s={s} />)}
      </div>

      <h2 className="sec">Finales pendientes</h2>
      <p className="hint">Están organizadas por módulo y el material quedó guardado. El contenido de estudio de cada final se arma cuando decidas rendirlo.</p>
      <div className="fin-grid">
        {finales.map((s) => <FinalCard key={s.id} s={s} />)}
      </div>
    </div>
  );
}

function NowCard({ s }: { s: Subject }) {
  const exam = s.exams.find((e) => e.id === s.focus.examId)!;
  const p = progress(s, exam.id);
  const d = countdown(s, exam.id);
  const ready = hasContent(s.id);
  return (
    <Link to={`/m/${s.id}`} className="now-card" style={{ ['--h' as string]: s.hue }} data-testid={`now-${s.id}`}>
      <div className="nc-top">
        <span className="nc-icon" aria-hidden>{s.icon}</span>
        <span className={`badge ${ready ? 'ok' : 'wait'}`}>{ready ? 'Contenido listo' : 'Esperando material'}</span>
      </div>
      <h3>{s.name}</h3>
      <p className="nc-exam">{exam.name}{exam.when ? ` · ${exam.when}` : ''}{d !== null && <> · <b className={d <= 3 && d >= 0 ? 'soon' : ''}>{countdownLabel(d)}</b></>}</p>
      <p className="nc-note">{s.focus.note}</p>
      <div className="bar" aria-label={`Avance ${p} %`}><span style={{ width: `${p}%` }} /></div>
      <span className="hint">{p} % de los módulos que entran marcados como vistos o dominados</span>
    </Link>
  );
}

function FinalCard({ s }: { s: Subject }) {
  const p = progress(s, 'final');
  return (
    <Link to={`/m/${s.id}`} className="fin-card" style={{ ['--h' as string]: s.hue }} data-testid={`fin-${s.id}`}>
      <span className="fc-icon" aria-hidden>{s.icon}</span>
      <span className="fc-body">
        <b>{s.name}</b>
        <span className="hint">{s.term} · {s.units.reduce((a, u) => a + u.modules.length, 0)} módulos · {s.material.apuntes + s.material.parciales + s.material.practica + s.material.clases} archivos guardados</span>
        <span className="bar thin"><span style={{ width: `${p}%` }} /></span>
      </span>
    </Link>
  );
}
