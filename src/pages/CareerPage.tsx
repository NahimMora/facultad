import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREER, CAREER_STATES, initialCareerStates, type CareerState } from '../content/career';
import { hasContent } from '../content/loaders';
import { load, save } from '../lib/storage';

const KEY = 'career-states';
export function CareerPage() {
  const [states,setStates] = useState(() => initialCareerStates(load<unknown>(KEY,null)));
  const [filter,setFilter] = useState<CareerState | 'todas'>('todas');
  const counts = Object.fromEntries(Object.keys(CAREER_STATES).map((key) => [key,CAREER.filter((c) => states[c.id]===key).length]));
  const update = (id:string,state:CareerState) => { const next={...states,[id]:state};setStates(next);save(KEY,next); };
  return <div className="page career-page">
    <h1>Estado de mi carrera</h1>
    <p>Las {CAREER.length} materias del plan, ordenadas por año y semestre. Podés actualizar cada estado; se guarda en este navegador.</p>
    <div className="career-counts" aria-label="Resumen de estados">{Object.entries(CAREER_STATES).map(([key,label]) => <div className="card" key={key}><b>{counts[key]}</b><span>{label}</span></div>)}</div>
    <p className="hint">Una materia regularizada tiene la cursada aprobada y el final pendiente. Los estados iniciales incluyen las cuatro aprobadas que confirmaste e Inglés I regularizada.</p>
    <label className="career-filter">Mostrar <select aria-label="Mostrar" value={filter} onChange={(e)=>setFilter(e.target.value as CareerState|'todas')}><option value="todas">Todas las materias</option>{Object.entries(CAREER_STATES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
    {Array.from({length:10},(_,i)=>i+1).map((semester)=>{
      const courses=CAREER.filter((c)=>c.semester===semester&&(filter==='todas'||states[c.id]===filter));
      if(!courses.length)return null;
      return <section key={semester} className="career-semester"><h2>{Math.ceil(semester/2)}.º año · {semester%2?1:2}.º semestre</h2>
        {courses.map((c)=><article className="card career-course" key={c.id} data-course={c.id}>
          <h3>{c.name}</h3>
          <label><span>Estado</span><select aria-label={`Estado de ${c.name}`} value={states[c.id]} onChange={(e)=>update(c.id,e.target.value as CareerState)}>{Object.entries(CAREER_STATES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
          <p className="hint">{c.prerequisites.length ? `Correlativas: ${c.prerequisites.map((id)=>CAREER.find((p)=>p.id===id)!.name).join(' · ')}` : 'Sin correlativas indicadas en la tabla del plan.'}</p>
          {c.note&&<p className="hint">{c.note}</p>}
          {hasContent(c.id)&&<Link to={`/m/${c.id}?examen=final`}>Abrir material de estudio</Link>}
        </article>)}
      </section>;
    })}
    <p className="hint">Referencia: plan de carrera 2023 que compartiste. La oferta de materias, la inscripción y las condiciones particulares se verifican en MyUP. Estos estados registran tu avance académico; son independientes de la checklist de temas del Plan.</p>
  </div>;
}
