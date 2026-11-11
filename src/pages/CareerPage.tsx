import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CAREER, CAREER_STATES, type CareerState } from '../content/career';
import { hasContent } from '../content/loaders';
import { useAcademic } from '../lib/useAcademic';
import { courseName, finalBlockers, stateCount } from '../lib/academic';

const FILTERS=[{id:'regularizada',label:'Finales pendientes'},{id:'cursando',label:'Cursando'},{id:'aprobada',label:'Aprobadas'},{id:'sin-cursar',label:'Sin cursar'},{id:'todas',label:'Plan completo'}] as const;
export function CareerPage() {
  const {states,update}=useAcademic(); const [params,setParams]=useSearchParams();
  const filter=FILTERS.some(f=>f.id===params.get('estado'))?params.get('estado')!:'regularizada';
  const [editing,setEditing]=useState<string|null>(null); const [message,setMessage]=useState('');
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(editing)dialog.current?.showModal();},[editing]);
  const approved=stateCount(states,'aprobada');
  const change=(state:CareerState)=>{if(!editing)return;update(editing,state);setMessage(`${courseName(editing)}: ${CAREER_STATES[state]}.`);dialog.current?.close();setEditing(null);};
  return <div className="page career-page">
    <header className="dash-heading"><p className="eyebrow">Tu avance académico</p><h1>Mi carrera</h1><p>Todo lo que ya cerraste y lo que viene después.</p></header>
    <section className="career-overview"><div className="degree-ring" style={{['--progress' as string]:`${approved/CAREER.length*100}%`}}><span><b>{approved}</b><small>de {CAREER.length}</small></span></div><div><h2>Finales aprobados</h2><p>Las materias regularizadas ya tienen la cursada aprobada. Falta cerrar su final.</p></div></section>
    <nav className="career-filters" aria-label="Ver materias por estado">{FILTERS.map(f=><button key={f.id} aria-pressed={filter===f.id} className={filter===f.id?'active':''} onClick={()=>setParams(f.id==='regularizada'?{}:{estado:f.id})}>{f.label}<span>{f.id==='todas'?CAREER.length:stateCount(states,f.id)}</span></button>)}</nav>
    <p className={message?'change-feedback':'sr-only'} role="status">{message}</p>
    {Array.from({length:10},(_,i)=>i+1).map(semester=>{
      const courses=CAREER.filter(c=>c.semester===semester&&(filter==='todas'||states[c.id]===filter));
      if(!courses.length)return null;
      return <section key={semester} className="career-semester"><h2>{Math.ceil(semester/2)}.º año <span>· {semester%2?1:2}.º semestre</span></h2>{courses.map(c=>{
        const blockers=finalBlockers(c.id,states);
        const following=CAREER.filter(n=>n.prerequisites.includes(c.id));
        return <article className="career-entry" key={c.id} data-course={c.id}>
          <div className="career-entry-title"><h3>{c.name}</h3><span className={`academic-badge state-${states[c.id]}`}>{CAREER_STATES[states[c.id]]}</span></div>
          {states[c.id]==='regularizada'&&<p className={blockers.length?'dependency':'dependency ready'}>{blockers.length?`Antes de su final: ${blockers.map(courseName).join(' + ')}.`:'Sus finales previos ya están aprobados.'}</p>}
          {states[c.id]==='sin-cursar'&&c.prerequisites.length>0&&<p className="dependency">Previas: {c.prerequisites.map(courseName).join(' + ')}.</p>}
          {following.length>0&&<p className="career-follows">Sigue con <b>{following.map(n=>n.name).join(' · ')}</b></p>}
          {c.note&&<p className="hint">{c.note}</p>}
          <div className="career-entry-actions">{hasContent(c.id)&&<Link to={`/m/${c.id}?examen=${states[c.id]==='cursando'?'p2':'final'}`}>{states[c.id]==='aprobada'?'Repasar':'Estudiar'} <span aria-hidden>→</span></Link>}<button className="linklike" aria-label={`Actualizar estado de ${c.name}`} onClick={()=>setEditing(c.id)}>Actualizar estado</button></div>
        </article>;
      })}</section>;
    })}
    {CAREER.filter(c=>filter==='todas'||states[c.id]===filter).length===0&&<p className="empty">No tenés materias en este estado.</p>}
    <details className="quiet-details"><summary>Fechas, checklist y más detalle</summary><p>Si ya tenés una mesa, podés guardarla junto con tu checklist de temas.</p><div className="dashboard-links"><Link className="btn" to="/plan">Mesas y checklist</Link><Link className="btn" to="/progreso">Progreso de estudio</Link></div></details>
    <p className="hint">Datos cargados a partir de lo que confirmaste y del plan 2023. La oferta y las condiciones de inscripción se verifican en MyUP. Tus cambios quedan guardados en este navegador.</p>
    <dialog ref={dialog} className="state-dialog" aria-labelledby="state-dialog-title" onClose={()=>setEditing(null)}>
      <div className="dialog-top"><h2 id="state-dialog-title">{editing?courseName(editing):'Actualizar estado'}</h2><button className="btn" aria-label="Cerrar" onClick={()=>dialog.current?.close()}>✕</button></div>
      <p>Elegí cómo está esta materia hoy.</p><div className="state-options">{Object.entries(CAREER_STATES).map(([state,label])=><button key={state} className={editing&&states[editing]===state?'active':''} onClick={()=>change(state as CareerState)}><b>{label}</b><small>{state==='aprobada'?'Ya aprobaste el final.':state==='regularizada'?'Cursada aprobada; final pendiente.':state==='cursando'?'La estás cursando ahora.':'Todavía no la cursaste.'}</small></button>)}</div>
    </dialog>
  </div>;
}
