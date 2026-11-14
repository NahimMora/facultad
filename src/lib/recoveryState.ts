import { ALL_RECOVERY_TASKS, SKILLS, TASK_BY_ID, VARIANT_TASKS } from '../content/recovery/pyeTasks';
import { gradeTask, type WrittenAnswers } from './recoveryGrading';
import { load, save } from './storage';

export interface RecoverySession { version:1; id:string; mode:'guided'|'exam'|'original'; taskIds:string[]; answers:WrittenAnswers; startedAt:number; limitSeconds?:number; finishedAt?:number; assisted:boolean; fresh:boolean }
export interface RecoveryState { version:1; active:RecoverySession|null; history:RecoverySession[]; seenTaskIds?:string[] }
export const recoveryKey='pye-recovery-v1';
export function validRecoverySession(value:unknown):value is RecoverySession {
  if(!value||typeof value!=='object')return false;
  const s=value as RecoverySession;
  if(s.version!==1||typeof s.id!=='string'||!['guided','exam','original'].includes(s.mode)||!Array.isArray(s.taskIds)||!s.taskIds.length||new Set(s.taskIds).size!==s.taskIds.length||!s.taskIds.every(id=>TASK_BY_ID.has(id)))return false;
  if(s.mode!=='guided'&&(s.taskIds.length!==5||SKILLS.some(k=>!s.taskIds.some(id=>TASK_BY_ID.get(id)?.skill===k.id))))return false;
  if(!Number.isFinite(s.startedAt)||s.startedAt<=0||s.startedAt>Date.now()+60_000||typeof s.assisted!=='boolean'||typeof s.fresh!=='boolean')return false;
  if(s.limitSeconds!==undefined&&(!Number.isInteger(s.limitSeconds)||s.limitSeconds<60||s.limitSeconds>86400))return false;
  if(s.finishedAt!==undefined&&(!Number.isFinite(s.finishedAt)||s.finishedAt<s.startedAt))return false;
  if(!s.answers||typeof s.answers!=='object'||Array.isArray(s.answers))return false;
  const keys=s.taskIds.flatMap(id=>TASK_BY_ID.get(id)!.parts.map(p=>`${id}:${p.id}`));
  return Object.entries(s.answers).every(([k,v])=>keys.includes(k)&&typeof v==='string'&&v.length<=12000);
}
export function readRecovery():RecoveryState {
  const v=load<unknown>(recoveryKey,null);
  if(!v||typeof v!=='object')return {version:1,active:null,history:[]};
  const s=v as RecoveryState;
  return {version:1,active:validRecoverySession(s.active)&&s.active.finishedAt===undefined?s.active:null,history:Array.isArray(s.history)?s.history.filter(v=>validRecoverySession(v)&&v.finishedAt!==undefined).slice(-60):[],seenTaskIds:Array.isArray(s.seenTaskIds)?s.seenTaskIds.filter(id=>TASK_BY_ID.has(id)):[]};
}
export function writeRecovery(state:RecoveryState){return save(recoveryKey,state);}
export function startRecovery(mode:RecoverySession['mode'],history:RecoverySession[],minutes:number|undefined,skill?:string,seenTaskIds:string[]=[]):RecoverySession {
  const seen=new Set([...seenTaskIds,...history.flatMap(s=>s.taskIds)]);
  let ids:string[];
  if(mode==='original')ids=ALL_RECOVERY_TASKS.filter(t=>t.original).map(t=>t.id);
  else if(mode==='guided') {
    const pool=VARIANT_TASKS.filter(t=>t.skill===skill), task=pool.find(t=>!seen.has(t.id))??pool[Math.floor(Math.random()*pool.length)];
    ids=[task.id];
  } else ids=SKILLS.map(k=>{
    const pool=VARIANT_TASKS.filter(t=>t.skill===k.id), available=pool.filter(t=>!seen.has(t.id));
    const choices=available.length?available:pool;
    return choices[Math.floor(Math.random()*choices.length)].id;
  });
  const now=Date.now();
  return {version:1,id:`${now}-${Math.random().toString(36).slice(2,9)}`,mode,taskIds:ids,answers:{},startedAt:now,limitSeconds:minutes?Math.round(minutes*60):undefined,assisted:false,fresh:mode==='exam'&&ids.every(id=>!seen.has(id))};
}
export function recoveryResult(s:RecoverySession) {
  const tasks=s.taskIds.map(id=>gradeTask(TASK_BY_ID.get(id)!,s.answers));
  return {tasks,score:tasks.reduce((n,t)=>n+t.score,0),max:tasks.reduce((n,t)=>n+t.max,0),omissions:tasks.reduce((n,t)=>n+t.omissions,0),critical:tasks.some(t=>t.critical)};
}
export function hasMastery(history:RecoverySession[]) {
  const exams=history.filter(s=>s.mode==='exam');
  return exams.length>=2&&exams.slice(-2).every(s=>{
    const r=recoveryResult(s);
    return s.fresh&&!s.assisted&&r.max===100&&r.score>=80&&!r.omissions&&!r.critical;
  });
}
export function finishRecovery(state:RecoveryState,now=Date.now()):RecoveryState {
  if(!state.active)return state;
  const s={...state.active,finishedAt:Math.max(now,state.active.startedAt)};
  return {version:1,active:null,history:[...state.history.filter(h=>h.id!==s.id),s].slice(-60),seenTaskIds:[...new Set([...(state.seenTaskIds??[]),...state.history.flatMap(h=>h.taskIds),...s.taskIds])]};
}
