import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CALENDAR_EXAMS, DAILY_STUDY_HOURS, DIARY_SUBJECTS, calendarSubject, examStudyUrl, type CalendarExam } from '../content/examCalendar';
import { adjacentMonth, diaryKey, emptyStudyDay, fullDayLabel, hasStudyEntry, localISODate, monthCells, monthLabel, validDiary, type StudyDay, type StudyDiary } from '../lib/studyCalendar';
import { load, save } from '../lib/storage';
import { dateLabel } from '../lib/plan';
import './calendar.css';

export function CalendarPage() {
  const today=localISODate();
  const initial=today>='2026-11-01'&&today<='2026-12-31'?today:'2026-11-30';
  const [month,setMonth]=useState(()=>initial.slice(0,7));
  const [selected,setSelected]=useState(initial);
  const [diary,setDiary]=useState<StudyDiary>(()=>validDiary(load<unknown>(diaryKey,{})));
  const [message,setMessage]=useState('');
  const [failed,setFailed]=useState(false);
  const [cleared,setCleared]=useState<{date:string;entry:StudyDay}|null>(null);
  const dayHeading=useRef<HTMLHeadingElement>(null);
  const day=diary[selected]??emptyStudyDay();
  const events=CALENDAR_EXAMS.filter(e=>e.date===selected);
  const core=DIARY_SUBJECTS.filter(s=>CALENDAR_EXAMS.some(e=>e.subject===s.id));
  const others=DIARY_SUBJECTS.filter(s=>!core.some(c=>c.id===s.id));
  const entries=Object.entries(diary).filter(([date])=>date.startsWith(month));
  const hours=entries.reduce((sum,[,d])=>sum+(d.hours??0),0);
  const persist=(next:StudyDiary)=>{
    setDiary(next);
    if(save(diaryKey,next)){setFailed(false);setMessage('Guardado en este navegador.');}
    else{setFailed(true);setMessage('No se pudo guardar en este navegador. Tus cambios funcionan mientras mantengas esta página abierta.');}
  };
  const edit=(next:StudyDay)=>{
    const updated={...diary};
    if(hasStudyEntry(next))updated[selected]=next;else delete updated[selected];
    setCleared(null);persist(updated);
  };
  const toggle=(id:string,checked:boolean)=>edit({...day,subjects:checked?[...new Set([...day.subjects,id])]:day.subjects.filter(s=>s!==id)});
  const selectDay=(date:string,focus=false)=>{
    setSelected(date);setMonth(date.slice(0,7));setMessage('');
    if(focus)requestAnimationFrame(()=>{dayHeading.current?.scrollIntoView({block:'start',behavior:'instant'});dayHeading.current?.focus({preventScroll:true});});
  };
  const moveMonth=(offset:number)=>{const next=adjacentMonth(month,offset);setMonth(next);setSelected(`${next}-01`);setMessage('');};
  const clear=()=>{const next={...diary};delete next[selected];setCleared({date:selected,entry:day});persist(next);};
  const undo=()=>{if(!cleared)return;persist({...diary,[cleared.date]:cleared.entry});setCleared(null);};
  return <div className="page calendar-page">
    <header className="dash-heading"><p className="eyebrow">Noviembre y diciembre · 2026</p><h1>Tu calendario de estudio</h1><p>6 finales previstos —4 inscriptos y 2 pendientes— + 1 recuperatorio.</p><p className="hint">Disponibilidad: {DAILY_STUDY_HOURS} horas diarias, incluidos sábados y domingos. Tocá un día y registrá lo que realmente estudiaste.</p></header>
    <div className="calendar-layout">
      <section className="card calendar-month" aria-labelledby="calendar-month-title">
        <div className="calendar-month-nav"><button className="btn" aria-label="Mes anterior" onClick={()=>moveMonth(-1)}>←</button><h2 id="calendar-month-title">{monthLabel(month)}</h2><button className="btn" aria-label="Mes siguiente" onClick={()=>moveMonth(1)}>→</button></div>
        <div className="calendar-shortcuts"><button className="linklike" onClick={()=>selectDay(today)}>Ir a hoy</button><button className="linklike" onClick={()=>selectDay('2026-11-30')}>Noviembre</button><button className="linklike" onClick={()=>selectDay('2026-12-01')}>Diciembre</button></div>
        <div className="calendar-weekdays" aria-hidden="true">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(label=><span key={label}>{label}</span>)}</div>
        <div className="calendar-days" role="group" aria-label={`Días de ${monthLabel(month)}`}>
          {monthCells(month).map((date,i)=>{
            if(!date)return <span className="calendar-empty" key={`blank-${i}`} aria-hidden="true"/>;
            const exams=CALENDAR_EXAMS.filter(e=>e.date===date),record=diary[date],logged=!!record&&hasStudyEntry(record);
            const label=`${fullDayLabel(date)}${exams.map(e=>`, ${e.kind==='final'?'final de':'recuperatorio de'} ${calendarSubject(e.subject).name}`).join('')}${logged?`, registro guardado${record.subjects.length?`: ${record.subjects.map(id=>calendarSubject(id).short).join(', ')}`:''}`:''}`;
            return <button key={date} type="button" data-day={date} className={`calendar-day${selected===date?' selected':''}${exams.length?' exam-day':''}${logged?' logged-day':''}`} aria-label={label} aria-pressed={selected===date} aria-current={date===today?'date':undefined} onClick={()=>selectDay(date,true)}><b>{Number(date.slice(-2))}</b><span className="calendar-day-flags" aria-hidden="true">{exams.length>0&&<span className="calendar-exam-dot">●</span>}{logged&&<span className="calendar-log-mark">✓</span>}</span></button>;
          })}
        </div>
        <p className="calendar-legend"><span><b className="calendar-exam-dot">●</b> Examen</span><span><b className="calendar-log-mark">✓</b> Registro de estudio</span></p>
        <p className="hint">Este mes: {entries.length} días registrados · {hours.toLocaleString('es-AR')} h anotadas. Las casillas no se completan solas.</p>
      </section>
      <section className="card calendar-journal" aria-labelledby="day-log-title">
        <h2 id="day-log-title" ref={dayHeading} tabIndex={-1}>{fullDayLabel(selected)}</h2>
        {events.map(exam=><ExamCard key={exam.id} exam={exam} compact/>)}
        <fieldset className="calendar-subjects"><legend>¿Qué materias viste este día?</legend>{core.map(s=><label key={s.id}><input type="checkbox" checked={day.subjects.includes(s.id)} onChange={e=>toggle(s.id,e.target.checked)}/><span>{s.name}</span></label>)}</fieldset>
        <details className="calendar-other"><summary>Otras materias{day.subjects.filter(id=>others.some(s=>s.id===id)).length?` (${day.subjects.filter(id=>others.some(s=>s.id===id)).length} marcadas)`:''}</summary><div className="calendar-subjects">{others.map(s=><label key={s.id}><input type="checkbox" checked={day.subjects.includes(s.id)} onChange={e=>toggle(s.id,e.target.checked)}/><span>{s.name}</span></label>)}</div></details>
        <label className="calendar-notes">Temas o ejercicios que repasaste<textarea rows={3} maxLength={3000} placeholder="Ej.: PyE: hipótesis y valor p. AM II: integración por partes." value={day.notes} onChange={e=>edit({...day,notes:e.target.value})}/></label>
        <label className="calendar-hours">Horas estudiadas en total (opcional)<input type="number" inputMode="decimal" min={0} max={24} step={.25} value={day.hours??''} onChange={e=>{const n=e.target.value===''?undefined:Number(e.target.value);if(n===undefined||Number.isFinite(n)&&n>=0&&n<=24)edit({...day,hours:n});}}/></label>
        <p className={failed?'calendar-save-failed':'hint'} role="status">{failed?'No se pudo guardar en este navegador. Tus cambios funcionan mientras mantengas esta página abierta.':message||'Se guarda automáticamente en este navegador y dispositivo.'}</p>
        {hasStudyEntry(day)&&<button className="btn small ghost" onClick={clear}>Vaciar registro de este día</button>}
        {cleared&&<button className="btn small" onClick={undo}>Restaurar registro del {dateLabel(cleared.date)}</button>}
      </section>
    </div>
    <section className="calendar-agenda" aria-labelledby="calendar-agenda-title"><h2 id="calendar-agenda-title">Tus fechas de examen</h2><p className="hint">Fechas y estados que confirmaste. AM II, BD y SD I son prioritarias porque destraban correlativas.</p><ol>{CALENDAR_EXAMS.map(exam=><li key={exam.id}><ExamCard exam={exam} onSelect={()=>selectDay(exam.date,true)}/></li>)}</ol></section>
    <p className="hint">El registro diario es independiente de las respuestas de práctica y de tu checklist por tema. <Link to="/plan">Abrir checklist por materia</Link>.</p>
  </div>;
}

function ExamCard({exam,compact=false,onSelect}:{exam:CalendarExam;compact?:boolean;onSelect?:()=>void}) {
  const subject=calendarSubject(exam.subject);
  return <article className={`calendar-exam${compact?' compact':''}`} data-calendar-exam={exam.id}>
    {!compact&&<time dateTime={exam.date}>{dateLabel(exam.date)}</time>}
    <div><h3>{exam.kind==='recuperatorio'?'Recuperatorio':'Final'} de {subject.name}</h3><p className="calendar-time">{exam.start&&exam.end?`${exam.start} a ${exam.end}`:'Horario no informado'}</p>
      {exam.registration&&<p className={exam.registration==='registered'?'calendar-registered':'calendar-pending'}>{exam.registration==='registered'?'Inscripto':`Pendiente de inscripción · ${exam.pendingReason}`}</p>}
      {exam.priority&&<p className="hint">Prioritaria · abre correlativas</p>}
      <div className="calendar-exam-links"><Link to={examStudyUrl(exam)}>Estudiar {subject.short} →</Link>{onSelect&&<button className="linklike" onClick={onSelect}>Ver día</button>}</div>
    </div>
  </article>;
}
