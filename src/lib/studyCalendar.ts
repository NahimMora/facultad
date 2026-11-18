import { DIARY_SUBJECTS } from '../content/examCalendar';
import { isISODate } from './plan';

export interface StudyDay { subjects:string[]; notes:string; hours?:number }
export type StudyDiary=Record<string,StudyDay>;
export const diaryKey='study-calendar-v1';
export const emptyStudyDay=():StudyDay=>({subjects:[],notes:''});
export const hasStudyEntry=(day:StudyDay)=>day.subjects.length>0||day.notes.trim().length>0||(day.hours??0)>0;

/** No convierte objetos o textos corruptos en progreso completado. */
export function validDiary(value:unknown):StudyDiary {
  if(!value||typeof value!=='object'||Array.isArray(value))return {};
  const result:StudyDiary={};
  for(const [date,raw] of Object.entries(value)){
    if(!isISODate(date)||!raw||typeof raw!=='object'||Array.isArray(raw))continue;
    const d=raw as StudyDay;
    const subjects=Array.isArray(d.subjects)?[...new Set(d.subjects.filter(id=>typeof id==='string'&&DIARY_SUBJECTS.some(s=>s.id===id)))]:[];
    const day:StudyDay={subjects,notes:typeof d.notes==='string'?d.notes.slice(0,3000):''};
    if(typeof d.hours==='number'&&Number.isFinite(d.hours)&&d.hours>=0&&d.hours<=24)day.hours=d.hours;
    if(hasStudyEntry(day))result[date]=day;
  }
  return result;
}
export function localISODate(now=new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
export function dateFromISO(date:string) {
  if(!isISODate(date))throw new Error('Fecha inválida.');
  const [y,m,d]=date.split('-').map(Number);
  return new Date(y,m-1,d,12);
}
export const fullDayLabel=(date:string)=>dateFromISO(date).toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
export const monthLabel=(month:string)=>dateFromISO(`${month}-01`).toLocaleDateString('es-AR',{month:'long',year:'numeric'});
export function adjacentMonth(month:string,offset:number) {
  const date=dateFromISO(`${month}-01`);
  date.setMonth(date.getMonth()+offset);
  return localISODate(date).slice(0,7);
}
/** Semanas de lunes a domingo, con casilleros vacíos para alinear los días. */
export function monthCells(month:string):(string|null)[] {
  const start=dateFromISO(`${month}-01`),leading=(start.getDay()+6)%7;
  const days=new Date(start.getFullYear(),start.getMonth()+1,0,12).getDate();
  const length=Math.ceil((leading+days)/7)*7;
  return Array.from({length},(_,i)=>i<leading||i>=leading+days?null:`${month}-${String(i-leading+1).padStart(2,'0')}`);
}
