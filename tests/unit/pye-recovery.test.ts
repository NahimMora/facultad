import { describe, expect, it } from 'vitest';
import { ALL_RECOVERY_TASKS, ORIGINAL_TASKS, SKILLS, VARIANT_TASKS } from '../../src/content/recovery/pyeTasks';
import { RECOVERY_LESSONS } from '../../src/content/recovery/pyeLessons';
import { contradictions, gradeTask, type WrittenAnswers } from '../../src/lib/recoveryGrading';
import { finishRecovery, hasMastery, readRecovery, recoveryKey, recoveryResult, startRecovery, validRecoverySession } from '../../src/lib/recoveryState';
import { oneSampleT, proportionMargin, studentP, twoSampleT, leveneTest, sampleWithSummary, contingencyTest } from '../../src/lib/statistics';
import { save } from '../../src/lib/storage';
import { arithmetic, numericWork } from '../../src/lib/arithmetic';

const models=(task:typeof ORIGINAL_TASKS[number]):WrittenAnswers=>Object.fromEntries(task.parts.map(p=>[`${task.id}:${p.id}`,p.model]));

describe('cálculos independientes del recuperatorio',()=>{
  it('evalúa sustituciones reales y no ejecuta código arbitrario',()=>{
    expect(arithmetic('(5,9−6,7)/(1,68/sqrt(10))')).toBeCloseTo(-1.505846504842085,12);
    expect(arithmetic('Math.random()')).toBeNull();expect(arithmetic('1/0')).toBeNull();
    expect(arithmetic('-2^2')).toBe(-4);expect(arithmetic('2^-2')).toBe(.25);
    expect(numericWork('t=(5,9-6,7)/(1,68/sqrt(10))=-1,5058',-1.5058465048)).toBe(true);
    expect(numericWork('t=(5,9+6,7)/(1,68/sqrt(10))=-1,5058',-1.5058465048)).toBe(false);
  });
  it('reproduce t, gl y p del parcial y de cuatro variantes (referencia SciPy)',()=>{
    const cases:[number,number,number,number,'left'|'right'|'two',number,number][]=[
      [10,5.9,1.68,6.7,'left',-1.505846504842085,.08318482967956914],
      [12,45,6,50,'left',-2.886751345948129,.007395778068720355],
      [16,10.4,1.6,10,'right',1.0000000000000009,.16658506791397046],
      [9,5.8,.6,5,'two',3.999999999999999,.003949772803445326],
      [20,8.2,1.1,8,'right',.813115628181739,.21311204154569702],
    ];
    for(const [n,m,s,u,tail,t,p] of cases){const actual=oneSampleT(m,u,s,n,tail);expect(actual.t).toBeCloseTo(t,9);expect(actual.df).toBe(n-1);expect(actual.p).toBeCloseTo(p,7);}
  });
  it('t coincide con Cauchy para gl=1; simetría, límites y dos colas',()=>{
    for(const t of [-20,-3,-.1,0,.1,3,20])expect(studentP(t,1)).toBeCloseTo(.5+Math.atan(t)/Math.PI,12);
    expect(studentP(0,9)).toBe(.5);
    expect(studentP(-1.5,9,'left')+studentP(-1.5,9,'right')).toBeCloseTo(1,14);
    expect(studentP(-1.5,9,'two')).toBeCloseTo(2*studentP(-1.5,9,'left'),14);
  });
  it('Student agrupada y Welch coinciden con referencias independientes de SciPy',()=>{
    const pooled=twoSampleT({mean:18,sd:2,n:15},{mean:20,sd:2.2,n:15},true,'left');
    expect(pooled.t).toBeCloseTo(-2.605250528594531,12);expect(pooled.df).toBe(28);expect(pooled.p).toBeCloseTo(.014536548146365444/2,12);
    const welch=twoSampleT({mean:52,sd:12,n:18},{mean:48,sd:4,n:14},false,'right');
    expect(welch.t).toBeCloseTo(1.3228756555322954,12);expect(welch.p).toBeCloseTo(.19969477205444547/2,12);
  });
  it('los p de Levene provienen de muestras reproducibles, no de salidas inventadas',()=>{
    for(const [ma,sa,na,mb,sb,nb,f,p] of [[18,2,15,20,2.2,15,.18671112169564172,.6689776503201373],[52,12,18,48,4,14,16.460718398148998,.0003262398825731798]]){
      const samples=[sampleWithSummary(ma,sa,na),sampleWithSummary(mb,sb,nb)];
      const r=leveneTest(samples);expect(r.statistic).toBeCloseTo(f,10);expect(r.p).toBeCloseTo(p,12);
      for(const [i,targetMean,targetSd] of [[0,ma,sa],[1,mb,sb]]){const s=samples[i],mean=s.reduce((a,b)=>a+b,0)/s.length;expect(mean).toBeCloseTo(targetMean,12);expect(Math.sqrt(s.reduce((sum,v)=>sum+(v-mean)**2,0)/(s.length-1))).toBeCloseTo(targetSd,12);}
    }
  });
  it('las tablas chi² reproducen probabilidades de SciPy y tienen esperadas suficientes',()=>{
    for(const [rows,cols,strength,statistic,p] of [[3,4,6,19.393939393939394,.0035475625501433386],[4,3,3,4.81203007518797,.5681380023445695],[2,5,5,12.030075187969924,.017129014116133198],[3,3,7,18.602713916165943,.0009405165352654549]]){
      const counts=Array.from({length:rows},(_,i)=>Array.from({length:cols},(_,j)=>20+strength*(i%2===j%2?1:-1)));
      const r=contingencyTest(counts);expect(r.statistic).toBeCloseTo(statistic,12);expect(r.p).toBeCloseTo(p,12);expect(r.expected.flat().every(e=>e>=5)).toBe(true);
    }
  });
  it('EM crece con confianza y se reduce a la mitad al cuadruplicar n',()=>{
    expect(proportionMargin(.85,200,.99)).toBeGreaterThan(proportionMargin(.85,200,.95));
    expect(proportionMargin(.85,800,.95)).toBeCloseTo(proportionMargin(.85,200,.95)/2,12);
    expect(()=>oneSampleT(1,0,0,2,'left')).toThrow();
  });
});

describe('rúbrica estricta por desarrollo',()=>{
  it('hay 4 variantes por habilidad, pesos correctos, ids únicos y modelos completos',()=>{
    expect(VARIANT_TASKS).toHaveLength(20);
    expect(new Set(ALL_RECOVERY_TASKS.map(t=>t.id)).size).toBe(25);
    const failures:string[]=[];
    for(const skill of SKILLS){
      expect(VARIANT_TASKS.filter(t=>t.skill===skill.id)).toHaveLength(4);
      for(const task of ALL_RECOVERY_TASKS.filter(t=>t.skill===skill.id)){
        const g=gradeTask(task,models(task));
        expect(g.max,task.id).toBe(skill.max);
        failures.push(...g.parts.flatMap(p=>p.checks.filter(c=>!c.passed).map(c=>`${task.id}:${p.id}:${c.id}`)));
      }
    }
    expect(failures).toEqual([]);
  });
  it('vacíos y respuestas con solo resultados no reciben crédito de desarrollo',()=>{
    for(const task of ALL_RECOVERY_TASKS){expect(gradeTask(task,{}).score).toBe(0);expect(gradeTask(task,Object.fromEntries(task.parts.map(p=>[`${task.id}:${p.id}`,'0,0832; no rechazo H0']))).score).toBe(0);}
  });
  it('confundir constante con pendiente no supera la rúbrica de regresión',()=>{
    const t=ORIGINAL_TASKS[0],a=models(t);
    a[`${t.id}:a`]='ŷ = 5,1809 + 2,3507x. Por cada miles de registros aumenta en promedio 2,3507 minutos.';
    expect(gradeTask(t,a).parts[0].checks.find(c=>c.id==='pendiente')!.passed).toBe(false);
    expect(gradeTask(t,a).score).toBeLessThan(24);
  });
  it('normalidad no demuestra independencia y la omisión de factor anula a)',()=>{
    const t=ORIGINAL_TASKS[1],a=models(t);
    a[`${t.id}:a`]='El error de medición es normal; son independientes porque los errores son normales.';
    expect(gradeTask(t,a).parts[0].score).toBe(0);
    a[`${t.id}:b`]='H0: mu_A >= mu_B; H1: mu_A < mu_B. Sin datos no concluyo. Student se utiliza para comparar medias.';
    expect(gradeTask(t,a).parts[1].checks.find(c=>c.id==='auxiliares')!.passed).toBe(false);
  });
  it('chi exige variables exactas, gl=12 y una conclusión al p=0,07',()=>{
    const t=ORIGINAL_TASKS[2],a=models(t);
    expect(gradeTask(t,a).score).toBe(10);
    a[`${t.id}:a`]='H1: hay relación entre frecuencia e interacción porque son variables cualitativas.';
    expect(gradeTask(t,a).parts[0].score).toBeLessThan(3);
    a[`${t.id}:c`]='';expect(gradeTask(t,a).omissions).toBe(1);
  });
  it('una media exige parámetro, cálculo, probabilidad y error II',()=>{
    const t=ORIGINAL_TASKS[3],a=models(t);
    a[`${t.id}:a`]='mu0=6,7; mu1=5,9. H0: mu1>=mu0; H1: mu1<mu0. Porque son dos parámetros.';
    expect(gradeTask(t,a).parts[0].score).toBe(0);
    a[`${t.id}:b`]='p=0,0832 > alfa=0,05. No rechazo H0 porque no hay evidencia suficiente de menor consumo de memoria RAM.';
    const g=gradeTask(t,a).parts[1];expect(g.score).toBeLessThan(g.max);
    expect(g.checks.find(c=>c.id==='probabilidad')!.passed).toBe(false);
    const correct=models(t);correct[`${t.id}:b`]=correct[`${t.id}:b`].replace('T_9','T_10');
    expect(gradeTask(t,correct).parts[1].checks.find(c=>c.id==='probabilidad')!.passed).toBe(false);
    correct[`${t.id}:b`]=t.parts[1].model.replace('(5,9−6,7)','(5,9+6,7)');
    expect(gradeTask(t,correct).parts[1].checks.find(c=>c.id==='calculo')!.passed).toBe(false);
  });
  it('rechaza afirmaciones de H0 verdadera y causalidad; permite negar esas afirmaciones',()=>{
    expect(contradictions('No rechazo H0; H0 es verdadera.').length).toBeGreaterThan(0);
    expect(contradictions('La correlación demuestra causalidad.').length).toBeGreaterThan(0);
    expect(contradictions('No rechazar no demuestra independencia. La asociación no prueba causalidad.')).toEqual([]);
    const t=ORIGINAL_TASKS[2],a=models(t);a[`${t.id}:c`]+=' H0 es verdadera.';
    expect(gradeTask(t,a).parts[2].score).toBe(0);
  });
  it('el original de IC no inventa confianza y exige margen positivo y flechas correctas',()=>{
    const t=ORIGINAL_TASKS[4];expect(t.story).toContain('no está informada');
    const a=models(t);a[`${t.id}:b`]='Verdadero. Porque al bajar alfa aumenta la precisión y la confianza disminuye con n fijo.';
    expect(gradeTask(t,a).parts[1].score).toBe(0);
  });
  it('las escenas nuevas tienen narración para cada paso usado',()=>{
    for(const l of Object.values(RECOVERY_LESSONS)){
      expect(l.scene.say.length).toBe(4);
      for(const p of l.scene.v.items)expect(p.s??0).toBeLessThan(l.scene.say.length);
    }
  });
});

describe('sesiones y dominio',()=>{
  it('guarda y valida respuestas; descarta datos corruptos sin romper',()=>{
    const s=startRecovery('exam',[],undefined);
    expect(validRecoverySession(s)).toBe(true);
    expect(validRecoverySession({...s,taskIds:['inexistente']})).toBe(false);
    expect(validRecoverySession({...s,answers:{inventada:'texto'}})).toBe(false);
    save(recoveryKey,{active:'corrupto',history:[null]});expect(readRecovery()).toEqual({version:1,active:null,history:[],seenTaskIds:[]});
  });
  it('exige dos simulacros nuevos consecutivos, ≥80, sin fallos críticos u omisiones',()=>{
    const s1=startRecovery('exam',[],undefined);s1.answers=Object.assign({},...s1.taskIds.map(id=>models(ALL_RECOVERY_TASKS.find(t=>t.id===id)!)));
    const st1=finishRecovery({version:1,active:s1,history:[]});
    expect(recoveryResult(st1.history[0]).score).toBe(100);
    expect(hasMastery(st1.history)).toBe(false);
    const s2=startRecovery('exam',st1.history,undefined);expect(s2.taskIds.some(id=>s1.taskIds.includes(id))).toBe(false);s2.answers=Object.assign({},...s2.taskIds.map(id=>models(ALL_RECOVERY_TASKS.find(t=>t.id===id)!)));
    const st2=finishRecovery({...st1,active:s2});expect(hasMastery(st2.history)).toBe(true);
    expect(hasMastery([...st1.history,{...st2.history[1],fresh:false}])).toBe(false);
    expect(hasMastery([...st1.history,{...st2.history[1],assisted:true}])).toBe(false);
    expect(hasMastery([...st1.history,{...st2.history[1],answers:{}}])).toBe(false);
  });
  it('rotar el historial detallado no convierte una consigna usada en nueva',()=>{
    const seen=VARIANT_TASKS.map(t=>t.id);
    const session=startRecovery('exam',[],undefined,undefined,seen);
    expect(session.fresh).toBe(false);
  });
});
