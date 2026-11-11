import { useState } from 'react';
import type { LessonMedia, Subject, SubjectContent, TheoryBlock, WorkedExercise } from '../content/types';
import { allModules } from '../content/subjects';
import { Rich } from './Rich';
import { ShortVideo, Walkthrough } from './Walkthrough';

const BASE = import.meta.env.BASE_URL;
const abs = (u: string) => (/^https?:/.test(u) ? u : BASE + u);

const modName = (s: Subject, id: string) => {
  const m = allModules(s).find((x) => x.id === id);
  return m ? `${m.label} · ${m.title}` : id;
};

export type Shorts = LessonMedia['shorts'];
export const shortsOf = (media: LessonMedia[]): Shorts => Object.assign({}, ...media.map((m) => m.shorts));

export function TheoryView({ subject, content, modules, shorts }: { subject: Subject; content: SubjectContent; modules: string[]; shorts: Shorts }) {
  const blocks = content.theory.filter((b) => modules.includes(b.module));
  if (!blocks.length) return <p className="empty">Todavía no hay teoría cargada para estos módulos.</p>;
  const mods = [...new Set(blocks.map((b) => b.module))];
  return (
    <div className="theory">
      <nav className="toc" aria-label="Temas">
        {mods.map((m) => (
          <div key={m} className="toc-mod">
            <span className="tmod">{modName(subject, m)}</span>
            <div className="toc-list">{blocks.filter((b) => b.module === m).map((b) => <a key={b.id} href={`#t-${b.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`t-${b.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{b.title}</a>)}</div>
          </div>
        ))}
      </nav>
      {blocks.map((b) => <TheoryCard key={b.id} b={b} subject={subject} short={shorts[b.id] ?? b.video} />)}
    </div>
  );
}

export function TheoryCard({ b, subject, short }: { b: TheoryBlock; subject: Subject; short?: Shorts[string] }) {
  const visual = !!b.scenes?.length;
  return (
    <article className="tblock" id={`t-${b.id}`}>
      <span className="tmod">{modName(subject, b.module)}</span>
      <h3>{b.title}</h3>
      {b.scenes?.map((sc, i) => <Walkthrough key={i} scene={sc} title={b.title} />)}
      {short && <ShortVideo src={short.src} poster={short.poster} minutes={short.minutes} />}
      {b.trap && <p className="trap"><b>Ojo en el examen:</b> <Rich text={b.trap} /></p>}
      {visual ? (
        <details className="tdetail">
          <summary>Leer el detalle en texto</summary>
          <Points b={b} />
        </details>
      ) : <Points b={b} />}
    </article>
  );
}

function Points({ b }: { b: TheoryBlock }) {
  return (
    <>
      <ul>{b.points.map((p, i) => <li key={i}><Rich text={p} /></li>)}</ul>
      {b.table && (
        <div className="tablewrap"><table>
          <thead><tr>{b.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>)}</tbody>
        </table></div>
      )}
    </>
  );
}

export function ExercisesView({ content, modules, shorts }: { content: SubjectContent; modules: string[]; shorts: Shorts }) {
  const ex = content.exercises.filter((e) => modules.includes(e.module));
  if (!ex.length) return <p className="empty">Todavía no hay ejercicios resueltos para estos módulos.</p>;
  return <div className="exercises">{ex.map((e) => <Exercise key={e.id} e={e} short={shorts['ex:' + e.id]} />)}</div>;
}

export function Exercise({ e, short }: { e: WorkedExercise; short?: Shorts[string] }) {
  const [shown, setShown] = useState(0);
  return (
    <article className="exercise" id={`e-${e.id}`}>
      <h3>{e.title}</h3>
      <p className="statement"><Rich text={e.statement} /></p>
      {e.scenes?.map((sc, i) => <Walkthrough key={i} scene={sc} title={e.title} />)}
      {short && <ShortVideo src={short.src} poster={short.poster} minutes={short.minutes} label="Ver la resolución en video" />}
      {e.scenes?.length ? <p className="hint">Resolución escrita, paso por paso:</p> : null}
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

/** Video largo con índice de temas (tocar un tema salta a ese minuto). */
export function LessonPlayer({ m }: { m: LessonMedia }) {
  const [el, setEl] = useState<HTMLVideoElement | null>(null);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  return (
    <figure className="video lesson">
      <video ref={setEl} controls preload="metadata" playsInline src={abs(m.src)} poster={abs(m.poster)} />
      <figcaption><b>{m.title}</b> <span className="hint">· {Math.round(m.minutes)} min</span></figcaption>
      <details className="chapters">
        <summary>Índice ({m.chapters.length} temas): tocá uno para saltar</summary>
        <ol>{m.chapters.map((c) => <li key={c.part + c.at}><button type="button" className="linklike" onClick={() => { if (el) { el.currentTime = c.at; void el.play(); } }}><span className="hint">{fmt(c.at)}</span> {c.title}</button></li>)}</ol>
      </details>
    </figure>
  );
}

export function VideosView({ content, modules, media }: { content: SubjectContent; modules: string[]; media: LessonMedia[] }) {
  const vids = content.videos.filter((v) => !v.module || modules.includes(v.module));
  if (!vids.length && !media.length) return <p className="empty">Todavía no hay videos para estos módulos.</p>;
  return (
    <div className="videos">
      {media.length > 0 && <h2>Clases completas</h2>}
      {media.map((m) => <LessonPlayer key={m.id} m={m} />)}
      {vids.length > 0 && <h2>{media.length ? 'Videos anteriores' : 'Videos'}</h2>}
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
  return <><p className="pocket-scope">Machete · toda la materia</p><dl className="cheat">{content.cheatsheet.map((c) => <div key={c.t}><dt>{c.t}</dt><dd><Rich text={c.d} /></dd></div>)}</dl></>;
}
