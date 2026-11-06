import { useState } from 'react';
import type { Subject } from '../content/types';
import { keys, moduleStates, save, type ModState } from '../lib/storage';

const LABEL: Record<ModState, string> = { 0: 'Sin ver', 1: 'Visto', 2: 'Lo domino' };

/** Lista de módulos por unidad, con estado de estudio que se guarda en el navegador. */
export function ModuleTracker({ subject, highlight }: { subject: Subject; highlight?: string[] }) {
  const [st, setSt] = useState(() => moduleStates(subject.id));
  const cycle = (id: string) => setSt((s) => {
    const next = { ...s, [id]: (((s[id] ?? 0) + 1) % 3) as ModState };
    save(keys.modules(subject.id), next);
    return next;
  });
  return (
    <div className="units">
      {subject.units.map((u) => (
        <section key={u.title} className="unit">
          <h3>{u.title}</h3>
          <ul className="mods">
            {u.modules.map((m) => {
              const s = st[m.id] ?? 0;
              const hot = highlight?.includes(m.id);
              return (
                <li key={m.id} className={`mod ${hot ? 'hot' : ''}`}>
                  <div className="mod-main">
                    <span className="mod-label">{m.label}{hot && <span className="mod-flag">entra</span>}</span>
                    <span className="mod-title">{m.title}</span>
                    {m.topics && <span className="mod-topics">{m.topics.join(' · ')}</span>}
                  </div>
                  <button type="button" className={`mstate s${s}`} onClick={() => cycle(m.id)} aria-label={`${m.title}: ${LABEL[s]}. Tocar para cambiar`}>{LABEL[s]}</button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
