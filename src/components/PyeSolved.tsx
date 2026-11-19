import { useState } from 'react';
import { RULES, SOLVED } from '../content/recovery/pyeSolved';
import { Rich } from './Rich';
import { Walkthrough } from './Walkthrough';

/** Parcial y recuperatorio resueltos: reglas de corrección + un punto por vez, con diagrama y respuesta modelo. */
export function PyeSolved({ go }: { go: (vista: string) => void }) {
  const [exam, setExam] = useState<'parcial' | 'recu'>('parcial');
  const [i, setI] = useState(0);
  const items = SOLVED.filter((s) => s.exam === exam);
  const it = items[Math.min(i, items.length - 1)];
  const pick = (e: 'parcial' | 'recu') => { setExam(e); setI(0); };
  const move = (k: number) => { setI(k); document.getElementById('solved-item')?.scrollIntoView({ block: 'start', behavior: 'instant' }); };
  return <div className="solved">
    <ol className="route" aria-label="Cómo usar esta página">
      <li className="on"><div><b>1</b><span>Leé las reglas de la profe<small>5 min · abajo</small></span></div></li>
      <li className="on"><div><b>2</b><span>Recorré los 9 puntos resueltos<small>diagrama + respuesta modelo</small></span></div></li>
      <li><button onClick={() => go('tutor')}><b>3</b><span>Aprender por habilidad<small>teoría con diagramas</small></span></button></li>
      <li><button onClick={() => go('practica')}><b>4</b><span>Practicar escribiendo<small>y después un simulacro</small></span></button></li>
    </ol>

    <section className="card rules">
      <h2>📏 Cómo corrige la profe</h2>
      <p className="hint">Sale de sus comentarios en tu parcial y en el recu. Cada regla dice dónde te costó puntos.</p>
      <ol>{RULES.map((r, k) => <li key={k}><Rich text={r.rule} /><small>{r.cost}</small></li>)}</ol>
    </section>

    <div className="solved-pick" role="group" aria-label="Qué examen ver">
      <button className={`pill ${exam === 'parcial' ? 'on' : ''}`} aria-pressed={exam === 'parcial'} onClick={() => pick('parcial')}>2º parcial · 48/100</button>
      <button className={`pill ${exam === 'recu' ? 'on' : ''}`} aria-pressed={exam === 'recu'} onClick={() => pick('recu')}>Recu 16/11 · 40/100</button>
    </div>
    <ol className="topic-strip solved-strip" aria-label="Puntos del examen">{items.map((s, k) => <li key={s.id}><button className={k === i ? 'active' : ''} aria-current={k === i ? 'step' : undefined} onClick={() => move(k)}><span>{s.n}</span><small>{s.points[0]}/{s.points[1]}</small></button></li>)}</ol>

    <article className="tblock solved-item" id="solved-item" data-solved={it.id}>
      <span className="tmod">{exam === 'parcial' ? '2º parcial' : 'Recuperatorio 16/11'} · Punto {it.n} · sacaste {it.points[0]}/{it.points[1]}</span>
      <h3>{it.title}</h3>
      <p className="topic-lead">{it.prompt}</p>
      <Walkthrough scene={it.scene} title={it.title} />
      <div className="solved-grid">
        <section className="solved-mine"><h4>📝 Lo que respondiste</h4><p><Rich text={it.mine} /></p></section>
        <section className="solved-comment"><h4>💬 Comentario de la profe</h4><p>“{it.comment}”</p></section>
      </div>
      <p className="trap"><b><span aria-hidden>⚠️</span> Por qué perdiste puntos:</b> <Rich text={it.lost} /></p>
      <section className="topic-sec solved-model"><h4><span aria-hidden>✅</span> Respuesta para escribir en el editor</h4>{it.model.map((m, k) => <p key={k}><Rich text={m} /></p>)}</section>
      {it.note && <p className="hint solved-note">ℹ️ {it.note}</p>}
      <section className="topic-sec"><h4><span aria-hidden>🔎</span> Lo que la profe busca en este tipo de punto</h4><ul>{it.checklist.map((c) => <li key={c}>{c}</li>)}</ul></section>
    </article>
    <div className="study-next">
      <button className="btn" disabled={i === 0} onClick={() => move(i - 1)}>← Anterior</button>
      {i + 1 < items.length ? <button className="btn primary" onClick={() => move(i + 1)}>Punto siguiente →</button>
        : exam === 'parcial' ? <button className="btn primary" onClick={() => { pick('recu'); document.getElementById('solved-item')?.scrollIntoView({ block: 'start', behavior: 'instant' }); }}>Seguir con el recu →</button>
          : <button className="btn primary" onClick={() => go('practica')}>Practicar escribiendo →</button>}
    </div>
  </div>;
}
