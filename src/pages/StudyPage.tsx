import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../content/subjects';
import { useAcademic } from '../lib/useAcademic';
import { finalBlockers, courseName } from '../lib/academic';
export function StudyPage() {
  const {states}=useAcademic();const [query,setQuery]=useState('');
  const norm=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const subjects=SUBJECTS.filter(s=>norm(s.name+' '+s.short).includes(norm(query)));
  return <div className="page study-library"><header className="dash-heading"><p className="eyebrow">Tu biblioteca de estudio</p><h1>Elegí y empezá.</h1><p>El diagrama, el video y la práctica te esperan juntos en cada materia.</p></header>
    <label className="library-search"><span className="sr-only">Buscar materia</span><input type="search" name="materia" autoComplete="off" placeholder="Buscá una materia…" value={query} onChange={e=>setQuery(e.target.value)}/></label>
    <div className="library-grid">{subjects.map(s=>{
      const blockers=finalBlockers(s.id,states);const current=states[s.id]==='cursando';
      return <Link className="library-card" style={{['--h' as string]:s.hue}} key={s.id} to={`/m/${s.id}?examen=${current?'p2':'final'}`}><span className="library-icon" aria-hidden>{s.icon}</span><div><span className="eyebrow">{current?'Cursando · 2º parcial':states[s.id]==='aprobada'?'Final aprobado · material para repasar':'Preparar el final'}</span><h2>{s.name}</h2><p>Diagramas · clases · preguntas explicadas</p>{!current&&states[s.id]!=='aprobada'&&blockers.length>0&&<small>Para rendir: primero {blockers.map(courseName).join(' y ')}.</small>}</div><span className="library-arrow" aria-hidden>→</span></Link>;
    })}</div>
    {!subjects.length&&<p className="empty">No encontré esa materia. Probá con su nombre o sigla.</p>}
    <p className="hint">Inglés I está regularizada y figura en Mi carrera. Todavía no hay material de estudio de esa materia en la web.</p>
  </div>;
}
