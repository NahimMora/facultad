export type ErrorKind = 'conceptual' | 'numérico' | 'redacción';
export interface Criterion { id:string; label:string; points:number; kind:ErrorKind; test:(text:string)=>boolean; feedback:string; critical?:boolean }
export interface AnswerPart { id:string; prompt:string; model:string; criteria:Criterion[]; requiresWork?:boolean; gate?:(text:string)=>boolean }
export interface RecoveryTask { id:string; skill:string; title:string; story:string; table?:{head:string[];rows:string[][]}; parts:AnswerPart[]; original?:boolean; warning?:string; audit?:{samples:number[][];statistic:number;df1:number;df2:number;p:number} }
export type WrittenAnswers = Record<string,string>;
export const normalize = (s:string) => s.replace(/x̄/g,'xbar').replace(/p̂/g,'phat').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[μµ]/g,'mu').replace(/[σ]/g,'sigma').replace(/α/g,'alfa').replace(/β/g,'beta').replace(/[₀₁₂₉]/g,c=>({'₀':'0','₁':'1','₂':'2','₉':'9'}[c]!)).replace(/−|–/g,'-').replace(/≥/g,'>=').replace(/≤/g,'<=').replace(/≠/g,'!=').replace(/,/g,'.');
export const has = (s:string,...groups:RegExp[]) => groups.every(r=>r.test(normalize(s)));
export function numberIn(s:string,value:number,tolerance=.00011) {
  return [...normalize(s).matchAll(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g)].some(m=>Math.abs(Number(m[0])-value)<=tolerance);
}
export const developed = (s:string) => normalize(s).length >= 45 && /[=]|porque|ya que|por lo|dado|entonces|por cada|por tanto|por el|por la|se supone|cuando/.test(normalize(s));
/** Las expresiones contradictorias bloquean el subítem, aunque también tenga términos correctos. */
export function contradictions(s:string): string[] {
  const t=normalize(s);
  const rules:[RegExp,string][] = [
    [/(?<!no )(?<!nunca )(?:acepto|aceptamos|se acepta|aceptar)\s+(?:la\s+)?h\s*0|(?:^|[.;]\s*|entonces\s+|por tanto\s+|concluyo que\s+)h\s*0\s+(?:es|resulta)\s+verdadera/, 'No rechazar H0 no demuestra que H0 sea verdadera.'],
    [/(?<!no )(?<!nunca )(?:demuestra|prueba|implica|concluyo)\s+(?:la\s+)?(?:independencia|causalidad)|(?:son|es)\s+independientes\s+porque\s+.*normal/, 'La decisión no demuestra independencia ni causalidad; la normalidad tampoco demuestra independencia.'],
    [/(?:mu1|mu_1|mu\s*1)\s*=\s*5\.9/, '5,9 es xbar, un estadístico muestral, no una segunda media poblacional.'],
  ];
  return rules.flatMap(([r,message])=>{const match=r.exec(t);return match?[`Se detectó «${match[0].trim()}». ${message}`]:[];});
}
export function gradeTask(task:RecoveryTask,answers:WrittenAnswers) {
  const parts=task.parts.map(part=>{
    const text=answers[`${task.id}:${part.id}`]??'';
    const empty=!text.trim(), conflicts=contradictions(text);
    const blocked=empty||conflicts.length>0||(part.requiresWork&&!developed(text))||(part.gate&&!part.gate(text));
    const checks=part.criteria.map(c=>({id:c.id,label:c.label,points:c.points,kind:c.kind,critical:!!c.critical,passed:!blocked&&c.test(text),feedback:c.feedback}));
    return {id:part.id,text,empty,conflicts,blocked,checks,score:checks.filter(c=>c.passed).reduce((n,c)=>n+c.points,0),max:checks.reduce((n,c)=>n+c.points,0)};
  });
  return {id:task.id,skill:task.skill,parts,score:parts.reduce((n,p)=>n+p.score,0),max:parts.reduce((n,p)=>n+p.max,0),omissions:parts.filter(p=>p.empty).length,critical:parts.some(p=>p.conflicts.length>0||p.checks.some(c=>c.critical&&!c.passed))};
}
