import { Link } from 'react-router-dom';
import { SUBJECTS } from '../content/subjects';
import { useAcademic } from '../lib/useAcademic';
import { courseName, finalBlockers, nextCourses, nextFinal, stateCount, urgentSubject } from '../lib/academic';
import { readResume, resumeUrl } from '../lib/studyResume';

export function Home() {
  const {states} = useAcademic(); const resume = readResume(); const urgent = urgentSubject(states);
  const selected = resume && states[resume.subject] !== 'aprobada' ? resume.subject : urgent ?? nextFinal(states);
  const resuming = resume && selected === resume.subject;
  const isUrgent = urgent !== undefined && selected === urgent;
  const subject = SUBJECTS.find((s) => s.id === selected);
  const href = resume && selected === resume.subject ? resumeUrl(resume) : `/m/${selected}?examen=${selected === urgent ? 'p2' : 'final'}`;
  const next = nextCourses(states); const approved = stateCount(states,'aprobada');
  return <div className="page dashboard">
    <header className="dash-heading"><p className="eyebrow">Tu objetivo · avanzar y cursar hasta seis materias</p><h1>Hoy, un paso a la vez.</h1><p>Ya tenés {approved} finales aprobados. Este es tu camino para seguir.</p></header>
    <section className="next-action" aria-label="Tu próximo paso">
      <span className="action-kicker">{resuming ? 'Seguí donde quedaste' : isUrgent ? 'Primero, esta cursada' : 'Tu siguiente paso'}</span>
      <h2>{subject?.name ?? 'Tu material de estudio'}</h2>
      <p>{isUrgent ? 'El 2º parcial de ITc cierra el 13/11 a las 14 h. Trabajá con sus diagramas, ejercicios y preguntas.' : resuming ? 'Tu tema y tu modo de estudio quedaron guardados. Retomá desde ahí.' : selected==='am2' ? 'Aprobar AM II te permite rendir los finales de FIA y Probabilidad. Es la primera pieza de esa cadena.' : subject ? 'Empezá por una previa pendiente y avanzá con una explicación visual por vez.' : 'Podés volver a los diagramas, las clases y las preguntas de tu biblioteca.'}</p>
      <Link className="btn primary action-cta" to={subject ? href : '/estudiar'}>{resume && selected===resume.subject ? `Retomar ${subject?.short}` : subject ? `Estudiar ${subject.short}` : 'Elegir una materia'} <span aria-hidden>→</span></Link>
      <span className="action-foot">Diagrama paso a paso, video y práctica. Todo en el mismo lugar.</span>
    </section>
    <div className="dash-stats" aria-label="Tu situación académica"><span><b>{approved}</b> con final aprobado</span><span><b>{stateCount(states,'regularizada')}</b> finales pendientes</span><span><b>{stateCount(states,'cursando')}</b> en curso</span></div>
    <section className="dash-section"><p className="eyebrow">Finales · ventana del 30/11 al 18/12</p><h2>Estas bases abren el camino</h2>
      <p className="section-intro">Las flechas muestran qué final necesitás aprobar antes del siguiente. Conviene resolver las bases y aprovechar las cursadas recientes.</p>
      <div className="chains">{[
        {id:'am2',to:['fia','pye'],reason:'La base de tu recorrido en inteligencia artificial.'},
        {id:'bd',to:['aid'],reason:'Te permite cerrar AID y seguir la rama de datos.'},
        {id:'sd1',to:['arq'],reason:'La cadena que lleva a Sistemas Operativos.'},
      ].map((chain)=><article className="chain-card" key={chain.id}>
        <div className="chain-start"><span className={`status-dot ${states[chain.id]==='aprobada'?'done':''}`} aria-hidden /><b>{courseName(chain.id)}</b><span className="small-state">{states[chain.id]==='aprobada'?'Final aprobado':'Previa a cerrar'}</span></div>
        <div className="chain-arrow" aria-hidden>↓</div>
        <div className="chain-targets">{chain.to.map((id)=><span key={id}>{courseName(id)} <small>{states[id]==='aprobada'?'Final aprobado':finalBlockers(id,states).length?'Necesita la previa':'Previa aprobada'}</small></span>)}</div>
        <p>{chain.reason}</p><Link to={`/m/${chain.id}?examen=final`}>{states[chain.id]==='aprobada'?'Repasar':'Preparar'} {SUBJECTS.find(s=>s.id===chain.id)?.short} <span aria-hidden>→</span></Link>
      </article>)}</div>
      <details className="quiet-details"><summary>Cómo funciona rendir estas cadenas</summary><p>Para rendir una materia y su correlativa en el mismo turno necesitás autorización académica y aprobar primero la previa. Más de seis finales en diciembre también requiere autorización. Las fechas de mesa todavía no están confirmadas por materia.</p><a href="https://wwws.palermo.edu/Intranet/normas/Normas-Academicas.pdf" target="_blank" rel="noreferrer">Normas UP · §9.1.2 y §10.8.3 ↗</a></details>
    </section>
    <section className="dash-section"><p className="eyebrow">Próximo cuatrimestre</p><h2>{next.length} candidatas para seguir avanzando</h2><p className="section-intro">Sus previas ya están cursadas según tu estado actual. Para cursar suele alcanzar la cursada aprobada; para rendir el final necesitás los finales de las previas.</p>
      <ol className="next-course-list">{next.map((c,i)=><li key={c.id}><span className="step-disc">{i+1}</span><div><b>{c.name}</b><small>Previa cursada: {c.prerequisites.map(courseName).join(' + ')}</small></div></li>)}</ol>
      <p className="hint">Propuesta por correlativas del plan 2023. La oferta, los horarios y la habilitación definitiva se confirman en MyUP.</p>
    </section>
    <section className="dash-section"><h2>Cuidá las cursadas que estás terminando</h2><div className="current-courses">{SUBJECTS.filter(s=>states[s.id]==='cursando').map(s=><Link to={`/m/${s.id}?examen=p2`} className="current-course" key={s.id}><span aria-hidden>{s.icon}</span><div><b>{s.name}</b><small>{s.id==='aid'?'2º parcial + TP de Data Mining':'2º parcial de red, transporte y aplicaciones'}</small></div><span aria-hidden>→</span></Link>)}</div>{!stateCount(states,'cursando')&&<p>Ya no tenés cursadas marcadas como en curso.</p>}</section>
    <div className="dashboard-links"><Link className="btn" to="/estudiar">Ver todo para estudiar</Link><Link className="btn" to="/carrera">Ver mi carrera</Link></div>
  </div>;
}
