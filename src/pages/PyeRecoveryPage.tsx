import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ORIGINAL_TASKS, SKILLS, TASK_BY_ID, VARIANT_TASKS, fmt } from '../content/recovery/pyeTasks';
import { DIAGNOSIS, RECOVERY_LESSONS } from '../content/recovery/pyeLessons';
import { gradeTask, type RecoveryTask } from '../lib/recoveryGrading';
import { finishRecovery, hasMastery, readRecovery, recoveryResult, startRecovery, writeRecovery, type RecoverySession, type RecoveryState } from '../lib/recoveryState';
import { proportionMargin } from '../lib/statistics';
import { Rich } from '../components/Rich';
import { ShortVideo, Walkthrough } from '../components/Walkthrough';
import media from '../content/lessons/pye-clase-3.json';
import './pyeRecovery.css';

const VIEWS=[['inicio','Mi recorrido'],['parcial','Mi examen corregido'],['tutor','Aprender'],['practica','Practicar'],['simulacro','Simulacro'],['historial','Historial']];
const clockText=(seconds:number)=>`${Math.floor(seconds/60)}:${String(Math.max(0,seconds)%60).padStart(2,'0')}`;
const dateText=(ms:number)=>new Date(ms).toLocaleString('es-AR',{dateStyle:'short',timeStyle:'short'});

export function PyeRecoveryPage() {
  const [params,setParams]=useSearchParams();
  const view=VIEWS.some(([id])=>id===params.get('vista'))?params.get('vista')!:'inicio';
  const skill=SKILLS.find(s=>s.id===params.get('habilidad'))??SKILLS[2];
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
  const pickSkill=(id:string)=>go(view==='practica'?'practica':'tutor',id);
  const resume=()=>{setReviewId(null);setParams({vista:'resolver'});};
  const hasDraft=!!active&&!review&&(active.mode!=='guided'||params.get('vista')==='resolver'||!params.has('vista'));
  const examLock=hasDraft&&active.mode!=='guided';
  const completed=state.history.filter(s=>s.mode==='exam');
  return <div className="page recovery" style={{['--h' as string]:152}}>
    <header className="shead"><Link className="back" to="/m/pye">← Probabilidad y Estadística</Link><h1>Recuperatorio PyE</h1><p>Segundo parcial · Respuestas desarrolladas</p></header>
    {!examLock&&<nav className="recovery-tabs" aria-label="Entrenador del recuperatorio">{VIEWS.map(([id,label])=><button key={id} className={`pill ${view===id?'on':''}`} aria-current={view===id?'page':undefined} onClick={()=>go(id)}>{label}</button>)}</nav>}
    <p className="hint recovery-limit">Corrección local por criterios explícitos. La nota es una estimación de práctica, no una calificación oficial ni una evaluación semántica docente. Si una redacción válida no se reconoce, contrastala con la rúbrica.</p>
    {storageFailed&&<p className="recovery-warning" role="status">Este navegador no pudo guardar el progreso. Podés practicar, pero copiá tus respuestas antes de salir o recargar.</p>}
    {active&&!hasDraft&&<button className="btn" onClick={resume}>Retomar borrador guardado</button>}
    {review?<div ref={resultRef} tabIndex={-1}><SessionResult session={review} onPractice={id=>{const task=TASK_BY_ID.get(id)!;start('guided',task.skill,task.id);}} onClose={()=>{setReviewId(null);go('historial');}}/></div>:hasDraft?<section className="recovery-session">
      <header className="card recovery-session-bar"><h2>{active.mode==='exam'?'Simulacro con desarrollo':active.mode==='original'?'Rehacer el parcial analizado':'Práctica escrita'}</h2><p>{active.mode==='exam'?(active.fresh?'Consignas nuevas para tu historial de práctica.':'Incluye consignas ya practicadas: este intento no acredita dos simulacros nuevos.'):active.mode==='original'?'Reconstrucción propia del examen; los modelos se muestran al entregar.':'Pistas opcionales; los intentos guiados no acreditan dominio por simulacro.'}</p>
        <span role="timer" aria-label={active.limitSeconds?'Tiempo restante':'Tiempo transcurrido'}>{active.limitSeconds?'Restante':'Transcurrido'}: {clockText(Math.max(0,Math.floor(active.limitSeconds?active.limitSeconds-(now-active.startedAt)/1000:(now-active.startedAt)/1000)))}</span>
        <p className="hint">{active.taskIds.reduce((n,id)=>n+TASK_BY_ID.get(id)!.parts.filter(p=>active.answers[`${id}:${p.id}`]?.trim()).length,0)} de {active.taskIds.reduce((n,id)=>n+TASK_BY_ID.get(id)!.parts.length,0)} subítems escritos. Se conserva el borrador al recargar.</p>
      </header>
      {active.taskIds.map((id,i)=><WrittenTask key={id} task={TASK_BY_ID.get(id)!} index={i} session={active} onAnswer={(key,text)=>commit({...state,active:{...active,answers:{...active.answers,[key]:text}}})} onHint={()=>commit({...state,active:{...active,assisted:true}})}/>)}
      <p>Los subítems vacíos valen 0. Si falta el desarrollo pedido, no se otorga el puntaje del resultado.</p>
      <button className="btn primary" onClick={finish}>Entregar y corregir</button>
      {!examLock&&<p><button className="linklike" onClick={()=>{setReviewId(null);setParams({vista:'tutor',habilidad:skill.id});}}>Consultar teoría (el borrador sigue guardado)</button></p>}
    </section>:<>
      {view==='inicio'&&<>
        <section className="card"><h2>De reconocer conceptos a desarrollar respuestas</h2><div className="recovery-metrics"><div><b>48/100</b><span>Parcial analizado</span></div><div><b>60/100</b><span>Mínimo del parcial</span></div><div><b>80/100</b><span>Meta de práctica</span></div></div><p>El PDF muestra que el resultado correcto no alcanzó cuando faltaron variables, hipótesis, cálculos o conclusiones. El recuperatorio se entrena escribiendo cada inciso.</p><p className="hint">Fecha y duración real del recuperatorio: a confirmar. Los pesos globales son 24 + 24 + 10 + 24 + 18. El reparto interno de la rúbrica es pedagógico; el PDF no publica ese detalle.</p><button className="btn primary" onClick={()=>go('tutor','chi')}>Empezar por chi² y la conclusión</button></section>
        <section className="card"><h2>Tu mapa de trabajo</h2><SkillProgress history={state.history}/><p>{hasMastery(state.history)?'Meta orientativa alcanzada: dos simulacros nuevos consecutivos de al menos 80, sin omisiones ni fallos críticos detectados.':'Meta pendiente: dos simulacros nuevos consecutivos ≥80/100, sin omisiones ni errores críticos detectados.'}</p><p className="hint">Esto acredita los criterios del entrenador; no garantiza aprobación ni reemplaza la revisión de la redacción.</p></section>
        <section className="card"><h2>Cómo usar el recorrido</h2><ol><li>Revisá dónde se perdieron puntos en «Mi examen corregido».</li><li>En «Aprender», recorré los diagramas, escribí las respuestas de control y contrastá la resolución guiada.</li><li>Resolvé variantes sin pistas y revisá cada criterio que quedó sin crédito.</li><li>Hacé un simulacro nuevo; reforzá las dos habilidades con mayor pérdida y repetí con otras consignas.</li></ol><p>{completed.length} simulacros completos guardados · 20 variantes nuevas disponibles.</p></section>
      </>}
      {view==='parcial'&&<>
        <h2>Mi examen corregido</h2><p>Reconstrucción con palabras propias de las cinco consignas. Las frases entre comillas son fragmentos literales de la corrección; las respuestas modelo y la rúbrica son reconstrucciones de estudio.</p>
        {ORIGINAL_TASKS.map((task,i)=><details className="card recovery-original" key={task.id}><summary>{i+1}. {SKILLS[i].title} · {SKILLS[i].score}/{SKILLS[i].max}</summary><TaskStatement task={task}/><h3>Respuesta presentada · síntesis</h3><p>{DIAGNOSIS[i].answer}</p><h3>Hecho del PDF · comentarios</h3>{DIAGNOSIS[i].comments.map(c=><blockquote key={c}>“{c}”</blockquote>)}<h3>Reconstrucción del descuento</h3><p>{DIAGNOSIS[i].loss}</p><h3>Respuesta modelo verificada</h3>{task.parts.map(p=><div key={p.id}><b>{p.id})</b><p className="recovery-model"><Rich text={p.model}/></p></div>)}<p className="hint">Recomendación pedagógica: {SKILLS[i].tip}</p></details>)}
        <button className="btn primary" disabled={!!active} onClick={()=>start('original')}>Rehacer las cinco consignas</button>
      </>}
      {(view==='tutor'||view==='practica')&&<>
        <SkillPicker selected={skill.id} onPick={pickSkill}/>
        {view==='tutor'?<Tutor key={skill.id} skillId={skill.id} onPractice={()=>start('guided',skill.id)} disabled={!!active}/>:<section className="card"><h2>{skill.title}: escribí tu desarrollo</h2><p>Hay cuatro variantes con otras historias y datos. La práctica prioriza una variante que todavía no completaste. Cada intento pide todos sus subítems.</p><p>{skill.tip}</p><button className="btn primary" disabled={!!active} onClick={()=>start('guided',skill.id)}>Empezar ejercicio nuevo</button><button className="btn" onClick={()=>go('tutor',skill.id)}>Revisar cómo responder</button></section>}
      </>}
      {view==='simulacro'&&<section className="card"><h2>Cinco consignas, 100 puntos</h2><p>Una variante de cada habilidad, con pesos 24, 24, 10, 24 y 18. Sin modelos ni pistas hasta entregar. Las consignas se seleccionan entre las que todavía no completaste.</p><label className="recovery-duration">Límite de práctica en minutos (opcional)<input inputMode="numeric" type="number" min={1} max={240} value={minutes} onChange={e=>setMinutes(e.target.value)}/></label><p className="hint">Vacío: cronómetro sin límite. No es la duración oficial. Con límite, al vencer se entrega el borrador y los subítems vacíos quedan en cero.</p><button className="btn primary" disabled={!!active||!!minutes&&(!Number.isInteger(Number(minutes))||Number(minutes)<1||Number(minutes)>240)} onClick={()=>start('exam')}>Empezar simulacro escrito</button><p className="hint">Después de agotar las 20 variantes se pueden repetir para practicar; un intento repetido se identifica y no suma como simulacro nuevo.</p></section>}
      {view==='historial'&&<section className="card"><h2>Historial y errores recurrentes</h2><p>Referencia real: 48/100. Los demás resultados son estimaciones del entrenador, calculadas desde tus respuestas.</p><SkillProgress history={state.history}/>{state.history.length?<ol className="recovery-history">{[...state.history].reverse().map(s=>{const r=recoveryResult(s);return <li key={s.id}><button className="linklike" onClick={()=>setReviewId(s.id)}>{dateText(s.finishedAt!)} · {s.mode==='exam'?'Simulacro':s.mode==='original'?'Parcial reconstruido':'Práctica'} · {r.score}/{r.max}</button><small>{r.omissions} omisiones · {s.mode==='exam'?(s.fresh?'nuevo':'repetido'):'guiado'}{s.assisted?' · usaste pistas':''}</small></li>;})}</ol>:<p>Todavía no completaste intentos. El borrador se guarda mientras escribís.</p>}</section>}
    </>}
  </div>;
}

function SkillPicker({selected,onPick}:{selected:string;onPick:(id:string)=>void}) {
  return <div className="recovery-skills" role="group" aria-label="Elegir habilidad">{SKILLS.map(s=><button key={s.id} className={`pill ${selected===s.id?'on':''}`} aria-pressed={selected===s.id} onClick={()=>onPick(s.id)}>{s.title}</button>)}</div>;
}
function Tutor({skillId,onPractice,disabled}:{skillId:string;onPractice:()=>void;disabled:boolean}) {
  const skill=SKILLS.find(s=>s.id===skillId)!;
  const lesson=RECOVERY_LESSONS[skillId], example=ORIGINAL_TASKS[skill.original];
  const [step,setStep]=useState(0);
  const [reflection,setReflection]=useState('');
  const [model,setModel]=useState(false);
  const short=media.shorts[lesson.videoTopic as keyof typeof media.shorts];
  return <section className="recovery-tutor" key={skillId}>
    <h2>{skill.title}: cómo construir la respuesta</h2><p className="hint">Recorrido sugerido de 5–10 minutos: diagrama, explicación, respuesta de control y ejemplo. El tiempo depende de tu ritmo.</p><p><b>Reconocelo:</b> {lesson.recognize}</p>
    <Walkthrough key={skillId} scene={lesson.scene} title={skill.title}/>
    {short&&<ShortVideo {...short} label="Repasar este tema en la clase existente"/>}
    <div className="card"><p className="hint">Paso {step+1} de {lesson.steps.length}</p><h3>{lesson.steps[Math.min(step,lesson.steps.length-1)].title}</h3><p>{lesson.steps[Math.min(step,lesson.steps.length-1)].text}</p><label>Control de comprensión: {lesson.steps[Math.min(step,lesson.steps.length-1)].check}<textarea value={reflection} onChange={e=>setReflection(e.target.value)} rows={3}/></label><p className="hint">Esta reflexión es para contrastar y defender tu razonamiento; no recibe una nota automática.</p><div className="study-next"><button className="btn" disabled={step===0} onClick={()=>{setStep(i=>i-1);setReflection('');}}>Paso anterior</button><button className="btn primary" disabled={step>=lesson.steps.length-1} onClick={()=>{setStep(i=>i+1);setReflection('');}}>Paso siguiente</button></div></div>
    <section className="card"><h3>Resolución guiada</h3><TaskStatement task={example}/><p>Antes de mirar, escribí cómo empezarías cada inciso. Después compará con la respuesta modelo.</p><button className="btn" aria-expanded={model} onClick={()=>setModel(v=>!v)}>{model?'Ocultar':'Ver'} resolución guiada</button>{model&&example.parts.map(p=><p key={p.id} className="recovery-model"><b>{p.id}) </b><Rich text={p.model}/></p>)}</section>
    {skillId==='intervalos'&&<IntervalExplorer/>}
    <section className="card"><h3>Errores a evitar</h3><ul>{lesson.traps.map(t=><li key={t}>{t}</li>)}</ul><h3>Plantilla de cierre</h3><p>{lesson.conclusion}</p><button className="btn primary" disabled={disabled} onClick={onPractice}>Practicar esta habilidad sin modelo</button></section>
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
  return <div className="recovery-progress">{SKILLS.map(s=>{const attempts=history.flatMap(h=>h.taskIds.filter(id=>TASK_BY_ID.get(id)!.skill===s.id).map(id=>gradeTask(TASK_BY_ID.get(id)!,h.answers)));const last=attempts[attempts.length-1];const misses=new Map<string,number>();attempts.forEach(a=>a.parts.forEach(p=>p.checks.filter(c=>!c.passed).forEach(c=>misses.set(c.label,(misses.get(c.label)??0)+1))));const recurrent=[...misses].sort((a,b)=>b[1]-a[1])[0];return <div key={s.id}><b>{s.title}</b><p>Parcial: {s.score}/{s.max} · {last?`Último: ${last.score}/${last.max}`:'Sin práctica todavía'} · {attempts.length} intentos</p>{recurrent&&<small>Para reforzar: {recurrent[0]} ({recurrent[1]} veces).</small>}</div>;})}</div>;
}
function IntervalExplorer() {
  const [confidence,setConfidence]=useState(.95),[n,setN]=useState(200);
  const em=proportionMargin(.85,n,confidence);
  return <section className="card"><h3>Mové confianza y tamaño de muestra</h3><p>Exploración de un intervalo normal simétrico de práctica, phat=0,85. Se mantienen phat y el método; esto no reconstruye un n desconocido del parcial.</p><label>Confianza: {fmt(confidence*100,0)}%<input type="range" min={.8} max={.99} step={.01} value={confidence} onChange={e=>setConfidence(Number(e.target.value))}/></label><label>Tamaño n: {n}<input type="range" min={100} max={1600} step={100} value={n} onChange={e=>setN(Number(e.target.value))}/></label><div className="interval-axis" aria-label={`Intervalo de ${fmt(.85-em)} a ${fmt(.85+em)}`}><span style={{left:`${(.85-em)*100}%`,width:`${2*em*100}%`}}/></div><p aria-live="polite">alfa={fmt(1-confidence)} · EM={fmt(em)} · amplitud={fmt(2*em)}<br/>IC: [{fmt(.85-em)}; {fmt(.85+em)}]</p><p>EM = z × sqrt(phat × (1−phat) / n). Al subir confianza con n fijo, el intervalo se ensancha.</p></section>;
}
