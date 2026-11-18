import { SUBJECTS } from './subjects';

/** Fechas y estados confirmados por el usuario. No implican aprobación del examen. */
export interface CalendarExam {
  id:string;
  subject:string;
  date:string;
  kind:'final'|'recuperatorio';
  start?:string;
  end?:string;
  registration?:'registered'|'pending';
  pendingReason?:string;
  priority?:boolean;
}
export const CALENDAR_EXAMS:CalendarExam[]=[
  {id:'pye-recu-2026',subject:'pye',date:'2026-11-30',kind:'recuperatorio'},
  {id:'sym-final-2026',subject:'sym',date:'2026-12-02',kind:'final',start:'19:00',end:'21:00',registration:'registered'},
  {id:'iisw-final-2026',subject:'iisw',date:'2026-12-03',kind:'final',start:'19:00',end:'21:00',registration:'registered'},
  {id:'am2-final-2026',subject:'am2',date:'2026-12-09',kind:'final',start:'18:00',end:'20:00',registration:'pending',pendingReason:'Trámite de equivalencias',priority:true},
  {id:'bd-final-2026',subject:'bd',date:'2026-12-11',kind:'final',start:'18:00',end:'20:00',registration:'pending',pendingReason:'Pago de arancel',priority:true},
  {id:'ca-final-2026',subject:'ca',date:'2026-12-14',kind:'final',start:'19:00',end:'21:00',registration:'registered'},
  {id:'sd1-final-2026',subject:'sd1',date:'2026-12-17',kind:'final',start:'19:00',end:'21:00',registration:'registered',priority:true},
];
export const DAILY_STUDY_HOURS=4;
const examSubjects=[...new Set(CALENDAR_EXAMS.map(e=>e.subject))];
export const DIARY_SUBJECTS=[
  ...examSubjects.map(id=>SUBJECTS.find(s=>s.id===id)!),
  ...SUBJECTS.filter(s=>!examSubjects.includes(s.id)),
  {id:'ingles1',name:'Inglés I',short:'Inglés I'},
].map(s=>({id:s.id,name:s.name,short:s.short}));

export const calendarSubject=(id:string)=>DIARY_SUBJECTS.find(s=>s.id===id)!;
export const examStudyUrl=(exam:CalendarExam)=>exam.kind==='recuperatorio'?'/m/pye/recuperatorio':`/m/${exam.subject}?examen=final`;
