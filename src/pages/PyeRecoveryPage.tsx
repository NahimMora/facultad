import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ORIGINAL_TASKS, SKILLS, TASK_BY_ID, VARIANT_TASKS, fmt, type Skill } from '../content/recovery/pyeTasks';
import { RECOVERY_LESSONS } from '../content/recovery/pyeLessons';
import { gradeTask, type RecoveryTask } from '../lib/recoveryGrading';
import { finishRecovery, hasMastery, readRecovery, recoveryResult, startRecovery, writeRecovery, type RecoverySession, type RecoveryState } from '../lib/recoveryState';
import { proportionMargin } from '../lib/statistics';
import { Rich } from '../components/Rich';
import { PyeSolved } from '../components/PyeSolved';
import { Walkthrough } from '../components/Walkthrough';
import './pyeRecovery.css';

/**
 * Entrenador de escritura del recuperatorio de PyE.
 * Propósito único: pasar de entender un tema a escribir la respuesta completa que suma puntos.
 * La teoría vive en los temas (?examen=recu); acá solo se ve lo necesario para armar la respuesta.
 */
const VIEWS=[['inicio','Empezar'],['errores','1 · Mis errores'],['practica','2 · Escribir'],['simulacro','3 · Simulacro'],['progreso','Mi progreso']] as const;
/** Direcciones viejas que pueden estar guardadas o compartidas. */
const LEGACY:Record<string,string>={resueltos:'errores',parcial:'errores',tutor:'practica',historial:'progreso'};
const TOPICS='/m/pye?examen=recu';
const examName=(s:Skill)=>s.from==='recu'?'recu del 16/11':'2º parcial';
const clockText=(seconds:number)=>`${Math.floor(seconds/60)}:${String(Math.max(0,seconds)%60).padStart(2,'0')}`;
const dateText=(ms:number)=>new Date(ms).toLocaleString('es-AR',{dateStyle:'short',timeStyle:'short'});
const attemptsOf=(skill:string,history:RecoverySession[])=>history.flatMap(h=>h.taskIds.filter(id=>TASK_BY_ID.get(id)!.skill===skill).map(id=>gradeTask(TASK_BY_ID.get(id)!,h.answers)));

export function PyeRecoveryPage() {
  const [params,setParams]=useSearchParams();
  const asked=params.get('vista')??'inicio';
  const view=LEGACY[asked]??(VIEWS.some(([id])=>id===asked)?asked:'inicio');
  const skill=SKILLS.find(s=>s.id===params.get('habilidad'))??SKILLS[0];
  const [state,setState]=useState<RecoveryState>(readRecovery);
  const [reviewId,setReviewId]=useState<string|null>(null);
  const [minutes,setMinutes]=useState('');
  const [now,setNow]=useState(Date.now);
  const [storageFailed,setStorageFailed]=useState(false);
  const active=state.active;
  const activeId=active?.id;
  const review=state.history.find(s=>s.id===reviewId);
  const resultRef=useRef<HTMLDivElement>(null);
  const commit=(next:RecoveryState)=>{setState(next);if(!writeRecovery(next))setStorageFailed(true);};
  const go=(vista:string,habilidad?:string)=>{setReviewId(null);setParams({vista,...(habilidad?{habilidad}:{})});window.scrollTo({top:0});};
  const finish=()=>{
    if(!active)return;
    const next=finishRecovery(state);
    commit(next);setReviewId(active.id);
    requestAnimationFrame(()=>resultRef.current?.focus());
  };
  useEffect(()=>{
    if(!activeId)return;
    const timer=setInterval(()=>setNow(Date.now()),1000);
    return ()=>clearInterval(timer);
  },[activeId]);
  useEffect(()=>{
    if(!active?.limitSeconds||now<active.startedAt+active.limitSeconds*1000)return;
    const next=finishRecovery(state,active.startedAt+active.limitSeconds*1000);
    setState(next);if(!writeRecovery(next))setStorageFailed(true);setReviewId(active.id);
  },[now,active,state]);
  const start=(mode:RecoverySession['mode'],selectedSkill?:string,taskId?:string)=>{
    if(active)return;
    const session=startRecovery(mode,state.history,mode==='guided'||!minutes?undefined:Number(minutes),selectedSkill,state.seenTaskIds);
    if(mode==='guided'&&taskId&&TASK_BY_ID.get(taskId)?.skill===selectedSkill)session.taskIds=[taskId];
    commit({...state,active:session});setReviewId(null);setNow(Date.now());setParams({vista:'resolver'});window.scrollTo({top:0});
  };
  const resume=()=>{setReviewId(null);setParams({vista:'resolver'});};
  const hasDraft=!!active&&!review&&(active.mode!=='guided'||params.get('vista')==='resolver'||!params.has('vista'));
  const examLock=hasDraft&&active.mode!=='guided';
  const activeSkill=active?TASK_BY_ID.get(active.taskIds[0])!.skill:skill.id;
  /** Sugerencia: la primera habilidad, en orden de puntos perdidos, que todavía no practicaste. */
  const next=SKILLS.find(s=>!attemptsOf(s.id,state.history).length);
  const exams=state.history.filter(s=>s.mode==='exam');
  return <div className="page recovery" style={{['--h' as string]:152}}>
    <header className="shead"><Link className="back" to={TOPICS}>← PyE · Recuperatorio</Link><h1>Entrenador de escritura</h1><p>Practicá cómo escribir cada respuesta del recu del 30/11 para que sume todos los puntos.</p></header>
    {!examLock&&<nav className="recovery-tabs" aria-label="Entrenador de escritura">{VIEWS.map(([id,label])=><button key={id} className={`pill ${view===id&&!hasDraft&&!review?'on':''}`} aria-current={view===id?'page':undefined} onClick={()=>go(id)}>{label}</button>)}</nav>}
    {storageFailed&&<p className="recovery-warning" role="status">Este navegador no pudo guardar el progreso. Podés practicar, pero copiá tus respuestas antes de salir o recargar.</p>}
    {active&&!hasDraft&&<button className="btn" onClick={resume}>Retomar borrador guardado</button>}
    {review?<div ref={resultRef} tabIndex={-1}><SessionResult session={review} onPractice={id=>{const task=TASK_BY_ID.get(id)!;start('guided',task.skill,task.id);}} onClose={()=>{setReviewId(null);go('progreso');}}/></div>:hasDraft?<section className="recovery-session">
      <header className="card recovery-session-bar"><h2>{active.mode==='exam'?'Simulacro con desarrollo':active.mode==='original'?'Rehacer el 2º parcial':'Práctica escrita'}</h2><p>{active.mode==='exam'?(active.fresh?'Consignas nuevas para tu historial de práctica.':'Incluye consignas ya practicadas: este intento no acredita dos simulacros nuevos.'):active.mode==='original'?'Las cinco consignas de tu parcial; los modelos se muestran al entregar.':'Pistas opcionales; los intentos guiados no cuentan como simulacro.'}</p>
        <span role="timer" aria-label={active.limitSeconds?'Tiempo restante':'Tiempo transcurrido'}>{active.limitSeconds?'Restante':'Transcurrido'}: {clockText(Math.max(0,Math.floor(active.limitSeconds?active.limitSeconds-(now-active.startedAt)/1000:(now-active.startedAt)/1000)))}</span>
        <p className="hint">{active.taskIds.reduce((n,id)=>n+TASK_BY_ID.get(id)!.parts.filter(p=>active.answers[`${id}:${p.id}`]?.trim()).length,0)} de {active.taskIds.reduce((n,id)=>n+TASK_BY_ID.get(id)!.parts.length,0)} subítems escritos. Se conserva el borrador al recargar.</p>
      </header>
      {active.taskIds.map((id,i)=><WrittenTask key={id} task={TASK_BY_ID.get(id)!} index={i} session={active} onAnswer={(key,text)=>commit({...state,active:{...active,answers:{...active.answers,[key]:text}}})} onHint={()=>commit({...state,active:{...active,assisted:true}})}/>)}
      <p>Los subítems vacíos valen 0. Si falta el desarrollo pedido, no se otorga el puntaje del resultado.</p>
      <button className="btn primary" onClick={finish}>Entregar y corregir</button>
      {!examLock&&<p><button className="linklike" onClick={()=>go('practica',activeSkill)}>Ver cómo armar la respuesta (el borrador sigue guardado)</button></p>}
    </section>:<>
      {view==='inicio'&&<>
        <section className="card recovery-purpose">
          <h2>Para qué sirve</h2>
          <p>En el parcial y en el recu del 16/11 perdiste puntos aunque <b>sabías el tema</b>: faltaron cálculos, hipótesis, nombres de variables o la conclusión. Acá practicás eso: <b>escribir la respuesta completa</b>, y la corrección te marca qué faltó.</p>
          <p>Si un tema no lo entendés, primero estudialo en <Link to={TOPICS}>los temas de las unidades 6 a 9</Link> y después volvé.</p>
          <div className="recovery-metrics"><div><b>48/100</b><span>2º parcial</span></div><div><b>40/100</b><span>Recu 16/11</span></div><div><b>60/100</b><span>Para aprobar</span></div></div>
          <p className="hint">Recu del lunes 30/11: si lo aprobás, ese mismo día a las 10 h es el oral eliminatorio. Confirmá el horario y la duración del escrito: no figuran en el material.</p>
        </section>
        <section className="card">
          <h2>Cómo usarlo</h2>
          <ol className="recovery-steps">
            <li><button className="linklike" onClick={()=>go('errores')}><b>Mis errores</b></button> · cómo corrige la profe y cada punto de tus dos exámenes, con la respuesta que sumaba. Una vez, al principio.</li>
            <li><button className="linklike" onClick={()=>go('practica')}><b>Escribir</b></button> · una habilidad por vez: mirás cómo se arma la respuesta y escribís un ejercicio nuevo. Empezá por las que más puntos te costaron.</li>
            <li><button className="linklike" onClick={()=>go('simulacro')}><b>Simulacro</b></button> · cinco consignas de 100 puntos, sin pistas. Ideal el 28 y el 29.</li>
          </ol>
          {next?<button className="btn primary" onClick={()=>go('practica',next.id)}>Seguir con: {next.title} ({examName(next)}: {next.score}/{next.max})</button>
            :<button className="btn primary" onClick={()=>go('simulacro')}>Ya practicaste todas: hacé un simulacro</button>}
        </section>
      </>}
      {view==='errores'&&<>
        <PyeSolved go={go} start={params.get('punto')??undefined}/>
        <section className="card"><h2>Rehacer tu 2º parcial</h2><p>Las mismas cinco consignas, sin mirar las respuestas. Sirve para comprobar que ya no repetís los errores.</p><button className="btn" disabled={!!active} onClick={()=>start('original')}>Rehacer las cinco consignas</button></section>
      </>}
      {view==='practica'&&<>
        <SkillPicker selected={skill.id} history={state.history} onPick={id=>go('practica',id)}/>
        <Guide key={skill.id} skill={skill} done={attemptsOf(skill.id,state.history).length} onPractice={()=>start('guided',skill.id)} onSolved={()=>{setParams({vista:'errores',punto:'r4'});window.scrollTo({top:0});}} disabled={!!active}/>
      </>}
      {view==='simulacro'&&<section className="card"><h2>Simulacro: cinco consignas, 100 puntos</h2><p>Una consigna de cada habilidad del 2º parcial, con sus pesos (24, 24, 10, 24 y 18). No hay modelos ni pistas hasta entregar, y se eligen consignas que todavía no hiciste.</p><p className="hint">«Elegir la prueba» se practica aparte, en Escribir: no se sabe cuánto pesa en el recu del 30/11.</p><label className="recovery-duration">Límite de práctica en minutos (opcional)<input inputMode="numeric" type="number" min={1} max={240} value={minutes} onChange={e=>setMinutes(e.target.value)}/></label><p className="hint">Vacío: cronómetro sin límite. No es la duración oficial. Con límite, al vencer se entrega el borrador y los subítems vacíos quedan en cero.</p><button className="btn primary" disabled={!!active||!!minutes&&(!Number.isInteger(Number(minutes))||Number(minutes)<1||Number(minutes)>240)} onClick={()=>start('exam')}>Empezar simulacro escrito</button><p className="hint">{exams.length} simulacros hechos. Meta: dos seguidos con 80 o más, sin subítems vacíos.</p></section>}
      {view==='progreso'&&<section className="card"><h2>Mi progreso</h2><p>{hasMastery(state.history)?'Meta alcanzada: dos simulacros nuevos seguidos de al menos 80, sin omisiones ni fallos críticos.':'Meta: dos simulacros nuevos seguidos de al menos 80/100, sin omisiones ni fallos críticos.'}</p><p className="hint">Las notas de práctica son estimaciones por criterios, no una nota oficial.</p><SkillProgress history={state.history}/><h3>Intentos</h3>{state.history.length?<ol className="recovery-history">{[...state.history].reverse().map(s=>{const r=recoveryResult(s);return <li key={s.id}><button className="linklike" onClick={()=>setReviewId(s.id)}>{dateText(s.finishedAt!)} · {s.mode==='exam'?'Simulacro':s.mode==='original'?'Parcial rehecho':'Práctica'} · {r.score}/{r.max}</button><small>{r.omissions} omisiones · {s.mode==='exam'?(s.fresh?'nuevo':'repetido'):'guiado'}{s.assisted?' · usaste pistas':''}</small></li>;})}</ol>:<p>Todavía no completaste intentos. El borrador se guarda mientras escribís.</p>}</section>}
    </>}
  </div>;
}

function SkillPicker({selected,history,onPick}:{selected:string;history:RecoverySession[];onPick:(id:string)=>void}) {
  return <div className="recovery-skills" role="group" aria-label="Elegir habilidad">{SKILLS.map(s=><button key={s.id} className={`pill ${selected===s.id?'on':''}`} aria-pressed={selected===s.id} onClick={()=>onPick(s.id)}>{s.title} <small>{s.score}/{s.max}{attemptsOf(s.id,history).length?' · ✓':''}</small></button>)}</div>;
}
/** Cómo se arma la respuesta de una habilidad: todo a la vista, sin teoría de más, y el botón para escribir. */
function Guide({skill,done,onPractice,onSolved,disabled}:{skill:Skill;done:number;onPractice:()=>void;onSolved:()=>void;disabled:boolean}) {
  const lesson=RECOVERY_LESSONS[skill.id], example=skill.original!==undefined?ORIGINAL_TASKS[skill.original]:undefined;
  const [model,setModel]=useState(false);
  const variants=VARIANT_TASKS.filter(t=>t.skill===skill.id).length;
  return <section className="recovery-tutor">
    <div className="card">
      <h2>{skill.title}</h2>
      <p className="recovery-lost">En el {examName(skill)} sacaste <b>{skill.score}/{skill.max}</b>. {skill.tip}</p>
      <p><b>Reconocelo:</b> {lesson.recognize}</p>
      <p className="hint">¿No te acordás del tema? <Link to={`${TOPICS}&tema=${skill.topic}`}>Repasalo en los temas</Link>.</p>
      <button className="btn primary" disabled={disabled} onClick={onPractice}>Escribir un ejercicio nuevo</button>
      <p className="hint">{done?`Hiciste ${done} de ${variants} variantes.`:`${variants} variantes con otros datos.`} {disabled?'Terminá o entregá el borrador abierto antes de empezar otro.':''}</p>
    </div>
    <Walkthrough key={skill.id} scene={lesson.scene} title={skill.title}/>
    <section className="card"><h3>Cómo armar la respuesta</h3><ol className="recovery-steps">{lesson.steps.map(s=><li key={s.title}><b>{s.title.replace(/^\d+\.\s*/,'').replace(/([^?!])$/,'$1.')}</b> {s.text}<small>Control: {s.check}</small></li>)}</ol></section>
    <section className="card"><h3>Plantilla para escribir</h3><p className="recovery-model">{lesson.conclusion}</p><h3>Errores que restan puntos</h3><ul>{lesson.traps.map(t=><li key={t}>{t}</li>)}</ul></section>
    {example?<section className="card"><h3>Tu consigna del parcial, resuelta</h3><TaskStatement task={example}/><p>Antes de mirar, pensá cómo empezarías cada inciso.</p><button className="btn" aria-expanded={model} onClick={()=>setModel(v=>!v)}>{model?'Ocultar':'Ver'} respuesta modelo</button>{model&&example.parts.map(p=><p key={p.id} className="recovery-model"><b>{p.id}) </b><Rich text={p.model}/></p>)}</section>
      :<section className="card"><h3>Tu consigna del recu, resuelta</h3><p>Está en Mis errores, recu del 16/11, punto 4: qué respondiste, el comentario de la profe y la respuesta que sumaba.</p><button className="btn" onClick={onSolved}>Verla en Mis errores</button></section>}
    {skill.id==='intervalos'&&<IntervalExplorer/>}
    <button className="btn primary" disabled={disabled} onClick={onPractice}>Escribir un ejercicio nuevo</button>
  </section>;
}
function TaskStatement({task}:{task:RecoveryTask}) {
  return <><p>{task.story}</p>{task.warning&&<p className="recovery-warning">{task.warning}</p>}{task.table&&<div className="recovery-table"><table><caption>Tabla de lectura · {task.original?'datos reconstruidos del parcial':'datos de práctica calculados'}</caption><thead><tr>{task.table.head.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{task.table.rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}</>;
}
function WrittenTask({task,index,session,onAnswer,onHint}:{task:RecoveryTask;index:number;session:RecoverySession;onAnswer:(key:string,text:string)=>void;onHint:()=>void}) {
  const [hints,setHints]=useState(false);
  const refs=useRef<Record<string,HTMLTextAreaElement|null>>({});
  const insert=(key:string,token:string)=>{const el=refs.current[key], text=session.answers[key]??'';const at=el?.selectionStart??text.length,end=el?.selectionEnd??at;onAnswer(key,text.slice(0,at)+token+text.slice(end));requestAnimationFrame(()=>{el?.focus();el?.setSelectionRange(at+token.length,at+token.length);});};
  return <article className="card recovery-task" data-task={task.id}><h2>{index+1}. {task.title} <small>({task.parts.flatMap(p=>p.criteria).reduce((n,c)=>n+c.points,0)} puntos)</small></h2><TaskStatement task={task}/>
    {session.mode==='guided'&&<><button className="btn small" aria-expanded={hints} onClick={()=>{setHints(v=>!v);onHint();}}>Pistas de desarrollo</button>{hints&&<p className="recovery-hint">{RECOVERY_LESSONS[task.skill].conclusion}</p>}</>}
    {task.parts.map(part=>{const key=`${task.id}:${part.id}`;return <div className="recovery-answer" key={key}><label htmlFor={key}>{part.prompt}</label><div className="recovery-symbols" role="group" aria-label={`Notación para inciso ${part.id}`}>{['mu','mu0','xbar','sigma','H0: ','H1: ','<=','>=','!=','sqrt()','P(T <= )'].map(token=><button className="btn small" type="button" key={token} onClick={()=>insert(key,token)}>{token}</button>)}</div><textarea ref={el=>{refs.current[key]=el;}} id={key} data-answer={part.id} rows={6} maxLength={12000} value={session.answers[key]??''} onChange={e=>onAnswer(key,e.target.value)} placeholder="Escribí fórmula, sustitución, explicación y conclusión según lo pedido. Se acepta coma decimal y notación simple."/><span className="hint">{session.answers[key]?.trim()?'Borrador escrito':'Sin responder · si entregás así: 0 puntos'}</span></div>;})}
  </article>;
}
function SessionResult({session,onPractice,onClose}:{session:RecoverySession;onPractice:(skill:string)=>void;onClose:()=>void}) {
  const r=recoveryResult(session), weak=[...r.tasks].sort((a,b)=>a.score/a.max-b.score/b.max).slice(0,2);
  const reinforcements=weak.length===1?VARIANT_TASKS.filter(t=>t.skill===weak[0].skill&&!session.taskIds.includes(t.id)).slice(0,2):weak.map(g=>VARIANT_TASKS.find(t=>t.skill===g.skill&&!session.taskIds.includes(t.id))!);
  return <section className="recovery-result"><div className="card" role="status"><h2>Resultado estimado: {r.score}/{r.max}</h2><p>{r.max===100?`${r.score>=60?`${r.score-60} puntos sobre`:`${60-r.score} puntos para`} el mínimo de 60. Meta de práctica: 80/100.`:'Práctica de una habilidad; no es un simulacro de 100 puntos.'}</p><p>{r.omissions} subítems vacíos. {r.critical?'Hay criterios críticos sin cumplir.':'No se detectaron fallos críticos en la rúbrica.'}</p><p className="hint">Puntos por criterios detectados, no nota oficial. El reparto interno es pedagógico. Una palabra clave aislada no reemplaza el desarrollo; la corrección automática puede no interpretar todas las redacciones.</p></div>
    {r.tasks.map(g=>{const task=TASK_BY_ID.get(g.id)!;return <article className="card" key={g.id}><h3>{task.title} · {g.score}/{g.max}</h3>{g.parts.map(part=>{const spec=task.parts.find(p=>p.id===part.id)!;return <section key={part.id} className="recovery-feedback" data-feedback={`${g.id}:${part.id}`}><h4>Inciso {part.id} · {part.score}/{part.max}</h4><p className="recovery-written">{part.text||'Sin responder.'}</p>{part.blocked&&<p className="recovery-warning">{part.empty?'Subítem vacío: 0 puntos.':part.conflicts.length?part.conflicts.join(' '):'Falta el desarrollo o un requisito indispensable del inciso: 0 puntos. Revisá la respuesta modelo.'}</p>}<ul>{part.checks.map(c=><li key={c.id} className={c.passed?'criterion-pass':'criterion-miss'}><b>{c.passed?'✓':'×'} {c.label}: {c.passed?c.points:0}/{c.points}</b>{!c.passed&&<><span> · {c.kind}{c.critical?' · crítico':''}</span><p>{c.feedback}</p></>}</li>)}</ul><details><summary>Comparar con la respuesta modelo</summary><p className="recovery-model"><Rich text={spec.model}/></p></details></section>;})}</article>;})}
    <section className="card"><h3>Dos refuerzos para recuperar puntos</h3>{reinforcements.map((next,i)=>{return <div key={next.id}><p>{i+1}. {SKILLS.find(s=>s.id===next.skill)!.title}: {next.story}</p><button className="btn" onClick={()=>onPractice(next.id)}>Practicar {SKILLS.find(s=>s.id===next.skill)!.title}</button></div>;})}<button className="btn" onClick={onClose}>Ver historial</button></section>
  </section>;
}
function SkillProgress({history}:{history:RecoverySession[]}) {
  return <div className="recovery-progress">{SKILLS.map(s=>{const attempts=attemptsOf(s.id,history);const last=attempts[attempts.length-1];const misses=new Map<string,number>();attempts.forEach(a=>a.parts.forEach(p=>p.checks.filter(c=>!c.passed).forEach(c=>misses.set(c.label,(misses.get(c.label)??0)+1))));const recurrent=[...misses].sort((a,b)=>b[1]-a[1])[0];return <div key={s.id}><b>{s.title}</b><p>{examName(s)}: {s.score}/{s.max} · {last?`Último: ${last.score}/${last.max}`:'Sin práctica todavía'} · {attempts.length} intentos</p>{recurrent&&<small>Para reforzar: {recurrent[0]} ({recurrent[1]} veces).</small>}</div>;})}</div>;
}
function IntervalExplorer() {
  const [confidence,setConfidence]=useState(.95),[n,setN]=useState(200);
  const em=proportionMargin(.85,n,confidence);
  return <section className="card"><h3>Mové confianza y tamaño de muestra</h3><p>Exploración de un intervalo normal simétrico de práctica, phat=0,85. Se mantienen phat y el método; esto no reconstruye un n desconocido del parcial.</p><label>Confianza: {fmt(confidence*100,0)}%<input type="range" min={.8} max={.99} step={.01} value={confidence} onChange={e=>setConfidence(Number(e.target.value))}/></label><label>Tamaño n: {n}<input type="range" min={100} max={1600} step={100} value={n} onChange={e=>setN(Number(e.target.value))}/></label><div className="interval-axis" aria-label={`Intervalo de ${fmt(.85-em)} a ${fmt(.85+em)}`}><span style={{left:`${(.85-em)*100}%`,width:`${2*em*100}%`}}/></div><p aria-live="polite">alfa={fmt(1-confidence)} · EM={fmt(em)} · amplitud={fmt(2*em)}<br/>IC: [{fmt(.85-em)}; {fmt(.85+em)}]</p><p>EM = z × sqrt(phat × (1−phat) / n). Al subir confianza con n fijo, el intervalo se ensancha.</p></section>;
}
