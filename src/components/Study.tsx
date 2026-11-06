import { useState } from 'react';
import type { Subject, SubjectContent, WorkedExercise } from '../content/types';
import { allModules } from '../content/subjects';
import { Rich } from './Rich';

const modName = (s: Subject, id: string) => {
  const m = allModules(s).find((x) => x.id === id);
  return m ? `${m.label} · ${m.title}` : id;
};

export function TheoryView({ subject, content, modules }: { subject: Subject; content: SubjectContent; modules: string[] }) {
  const blocks = content.theory.filter((b) => modules.includes(b.module));
  if (!blocks.length) return <p className="empty">Todavía no hay teoría cargada para estos módulos.</p>;
  return (
    <div className="theory">
      {blocks.map((b) => (
        <article key={b.id} className="tblock" id={`t-${b.id}`}>
          <span className="tmod">{modName(subject, b.module)}</span>
          <h3>{b.title}</h3>
          <ul>{b.points.map((p, i) => <li key={i}><Rich text={p} /></li>)}</ul>
          {b.table && (
            <div className="tablewrap"><table>
              <thead><tr>{b.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>)}</tbody>
            </table></div>
          )}
          {b.trap && <p className="trap"><b>Ojo en el examen:</b> <Rich text={b.trap} /></p>}
        </article>
      ))}
    </div>
  );
}

export function ExercisesView({ content, modules }: { content: SubjectContent; modules: string[] }) {
  const ex = content.exercises.filter((e) => modules.includes(e.module));
  if (!ex.length) return <p className="empty">Todavía no hay ejercicios resueltos para estos módulos.</p>;
  return <div className="exercises">{ex.map((e) => <Exercise key={e.id} e={e} />)}</div>;
}

function Exercise({ e }: { e: WorkedExercise }) {
  const [shown, setShown] = useState(0);
  return (
    <article className="exercise">
      <h3>{e.title}</h3>
      <p className="statement"><Rich text={e.statement} /></p>
      <ol className="steps">
        {e.steps.slice(0, shown).map((s, i) => <li key={i}><b>{s.title}</b><div><Rich text={s.body} /></div></li>)}
      </ol>
      <div className="row">
        {shown < e.steps.length
          ? <button type="button" className="btn small primary" onClick={() => setShown(shown + 1)}>Ver paso {shown + 1} de {e.steps.length}</button>
          : e.result && <p className="result"><b>Resultado:</b> <Rich text={e.result} /></p>}
        {shown > 0 && <button type="button" className="btn small ghost" onClick={() => setShown(0)}>Ocultar</button>}
      </div>
    </article>
  );
}

export function VideosView({ content, modules }: { content: SubjectContent; modules: string[] }) {
  const vids = content.videos.filter((v) => !v.module || modules.includes(v.module));
  if (!vids.length) return <p className="empty">Todavía no hay videos para estos módulos.</p>;
  const base = import.meta.env.BASE_URL;
  const abs = (u: string) => (/^https?:/.test(u) ? u : base + u);
  return (
    <div className="videos">
      {vids.map((v) => (
        <figure key={v.id} className="video">
          <video controls preload="none" playsInline src={abs(v.src)} poster={v.poster ? abs(v.poster) : undefined} />
          <figcaption><b>{v.title}</b> <span className="hint">· {v.minutes} min</span></figcaption>
          {v.transcript && <details><summary>Transcripción</summary><p className="transcript">{v.transcript}</p></details>}
        </figure>
      ))}
    </div>
  );
}

export function CheatsheetView({ content }: { content: SubjectContent }) {
  if (!content.cheatsheet.length) return <p className="empty">Todavía no hay machete para esta materia.</p>;
  return <dl className="cheat">{content.cheatsheet.map((c) => <div key={c.t}><dt>{c.t}</dt><dd><Rich text={c.d} /></dd></div>)}</dl>;
}
