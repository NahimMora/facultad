import type { ConceptMap, MapNode } from '../content/types';
import { Rich } from './Rich';

/** Mapa conceptual legible en el celular: árbol vertical con frases de enlace y acceso a cada tema. */
export function ConceptMapView({ map, open }: { map: ConceptMap; open: (topic: string) => void }) {
  return <div className="cmap">
    <div className="cmap-root">{map.root}</div>
    <ul className="cmap-branches">
      {map.branches.map((b, i) => <li key={i} className="cmap-branch" style={{ ['--bh' as string]: (i * 67 + 200) % 360 }}><Node n={b} open={open} depth={1} /></li>)}
    </ul>
    {map.links?.length ? <section className="cmap-links"><h4><span aria-hidden>🔗</span> Conexiones</h4><ul>{map.links.map((l, i) => <li key={i}><Rich text={l} /></li>)}</ul></section> : null}
  </div>;
}

function Node({ n, open, depth }: { n: MapNode; open: (topic: string) => void; depth: number }) {
  const body = <><b><Rich text={n.t} /></b>{n.d && <span><Rich text={n.d} /></span>}</>;
  return <>
    {n.rel && <span className="cmap-rel">{n.rel}</span>}
    {n.topic
      ? <button className={`cmap-node d${depth}`} onClick={() => open(n.topic!)} aria-label={`${n.t}: abrir el tema`}>{body}<i aria-hidden>›</i></button>
      : <div className={`cmap-node d${depth}`}>{body}</div>}
    {n.kids?.length ? <ul>{n.kids.map((k, i) => <li key={i}><Node n={k} open={open} depth={depth + 1} /></li>)}</ul> : null}
  </>;
}
