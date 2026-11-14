import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Exam, LessonMedia, Subject, SubjectContent } from '../content/types';
import { examModules } from '../content/subjects';
import { keys, load, save } from '../lib/storage';
import { topicChecks } from '../lib/plan';
import { CheatsheetView, Exercise, LessonPlayer, shortsOf, TheoryCard } from './Study';
import { Quiz } from './Quiz';
import { MockExam } from './MockExam';
import { SelfAssessments } from './SelfAssessments';

const MODES = [{id:'aprender',label:'Aprender'},{id:'practicar',label:'Practicar'},{id:'simulacro',label:'Simulacro'},{id:'machete',label:'Machete'}];
export function StudyWorkspace({s,exam,content,media}:{s:Subject;exam:Exam;content:SubjectContent;media:LessonMedia[]}) {
  const [params,setParams] = useSearchParams();
  const modules = examModules(s,exam.id).map(m=>m.id);
  const selfAssessments = (content.selfAssessments ?? []).filter(q=>modules.includes(q.module));
  const mode = MODES.some(m=>m.id===params.get('modo')) || (params.get('modo')==='autoevaluaciones' && selfAssessments.length) ? params.get('modo')! : 'aprender';
  const blocks = content.theory.filter(b=>modules.includes(b.module)).sort((a,b)=>modules.indexOf(a.module)-modules.indexOf(b.module));
  const selected = params.get('tema')?.replace(/^t-/,'');
  const index = Math.max(0,blocks.findIndex(b=>b.id===selected));
  const block = blocks[index];
  const [checked,setChecked] = useState(()=>topicChecks(load<unknown>(keys.planTopics(s.id),{})));
  const [exerciseIndex,setExerciseIndex] = useState(0);
  const lessons = media.filter(m=>content.lessons?.some(l=>l.id===m.id&&(exam.kind==='final'||l.examId===exam.id)));
  const [lessonId,setLessonId] = useState('');
  const [classOpen,setClassOpen] = useState(false);
  const lesson = lessons.find(m=>m.id===lessonId) ?? lessons[0];
  const exercises = content.exercises.filter(e=>modules.includes(e.module));
  const exercise = exercises[Math.min(exerciseIndex,exercises.length-1)];
  const qs = content.questions.filter(q=>modules.includes(q.module));
  const shorts = shortsOf(media);
  useEffect(()=>{ if(block)save('study-resume',{subject:s.id,exam:exam.id,topic:block.id,mode}); },[s.id,exam.id,block,mode]);
  const go = (next: {modo?:string;tema?:string}) => {
    const p=new URLSearchParams(params);p.delete('tab');
    if(next.modo){p.set('modo',next.modo);setClassOpen(false);}if(next.tema)p.set('tema',next.tema);
    setParams(p,{replace:true});
    document.getElementById('study-controls')?.scrollIntoView({block:'start',behavior:'instant'});
  };
  const mark = () => { const next={...checked,[block.id]:!checked[block.id]};setChecked(next);save(keys.planTopics(s.id),next); };
  return <div className="study-workspace">
    <nav id="study-controls" className="study-modes" aria-label="Cómo querés estudiar">{MODES.map(m=><button key={m.id} className={mode===m.id?'active':''} aria-pressed={mode===m.id} onClick={()=>go({modo:m.id})}>{m.label}</button>)}</nav>
    {s.id==='pye'&&mode!=='machete'&&<Link className="btn self-assessments-entry" to="/m/pye/recuperatorio">Preparar el recuperatorio del 2º parcial · con desarrollo</Link>}
    {selfAssessments.length > 0 && mode!=='machete' && <button className="btn self-assessments-entry" aria-pressed={mode==='autoevaluaciones'} onClick={()=>go({modo:'autoevaluaciones'})}>Autoevaluaciones · {selfAssessments.length} preguntas del parcial</button>}
    {mode==='autoevaluaciones' && <SelfAssessments key={exam.id} subject={s} examId={exam.id} items={selfAssessments}/>}
    {mode==='aprender' && block && <>
      <div className="lesson-position"><span>Tema {index+1} de {blocks.length}</span><span>{blocks.filter(b=>checked[b.id]).length} repasados</span></div>
      <details className="topic-picker" key={block.id}><summary>Cambiar de tema</summary><div>{blocks.map((b,i)=><button key={b.id} className={i===index?'active':''} onClick={()=>go({tema:b.id})}><span>{checked[b.id]?'✓':i+1}</span>{b.title}</button>)}</div></details>
      <TheoryCard key={block.id} b={block} subject={s} short={shorts[block.id]??block.video}/>
      <div className="study-next"><button className={`btn ${checked[block.id]?'reviewed':''}`} aria-pressed={checked[block.id]===true} onClick={mark}>{checked[block.id]?'✓ Tema repasado':'Marcar como repasado'}</button>{index+1<blocks.length?<button className="btn primary" onClick={()=>go({tema:blocks[index+1].id})}>Tema siguiente →</button>:<button className="btn primary" onClick={()=>go({modo:'practicar'})}>Pasar a la práctica →</button>}</div>
      <details className="workspace-extra" id="int-clase" onToggle={e=>setClassOpen(e.currentTarget.open)}>
        <summary><span>Clases completas y finales resueltos</span><small>{lessons.length} clases disponibles</small></summary>
        {classOpen&&lesson&&<>
          <LessonPlayer key={lesson.id} m={lesson}/>
          <p className="hint">Elegí la clase por su tema:</p>
          <div className="class-picker">{lessons.map((m,i)=><button key={m.id} aria-pressed={m.id===lesson.id} className={m.id===lesson.id?'active':''} onClick={()=>{
            setLessonId(m.id);
            requestAnimationFrame(()=>document.querySelector('#int-clase figure')?.scrollIntoView({block:'start',behavior:'instant'}));
          }}><span className="class-number">{i+1}</span><span>{m.title}<small>{Math.round(m.minutes)} min</small></span></button>)}</div>
        </>}
      </details>
      {exercise&&<details className="workspace-extra"><summary><span>Resolver un ejercicio paso a paso</span><small>{exercises.length} resoluciones disponibles</small></summary><Exercise key={exercise.id} e={exercise} short={shorts['ex:'+exercise.id]}/><div className="study-next"><button className="btn" disabled={exerciseIndex===0} onClick={()=>setExerciseIndex(i=>i-1)}>Anterior</button><span>{exerciseIndex+1}/{exercises.length}</span><button className="btn" disabled={exerciseIndex>=exercises.length-1} onClick={()=>setExerciseIndex(i=>i+1)}>Siguiente ejercicio</button></div></details>}
    </>}
    {mode==='practicar'&&<section><h2>Una pregunta por vez</h2><p className="hint">Respondé y leé la explicación antes de avanzar. Tu práctica queda guardada.</p><Quiz key={exam.id} storageKey={keys.quiz(s.id,exam.id)} items={qs} shorts={shorts} oneAtATime/></section>}
    {mode==='simulacro'&&<section id="int-simulacro"><h2>Probate como en un examen</h2><MockExam key={exam.id} storageKey={`mock-${s.id}-${exam.id}`} items={qs} shorts={shorts}/></section>}
    {mode==='machete'&&<CheatsheetView content={content}/>}
  </div>;
}
