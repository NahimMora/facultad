import { has, normalize, numberIn, type Criterion, type RecoveryTask } from '../../lib/recoveryGrading';
import { oneSampleT, twoSampleT, sampleWithSummary, leveneTest, contingencyTest, type Tail } from '../../lib/statistics';
import { numericWork } from '../../lib/arithmetic';

export const fmt=(x:number,d=4)=>Number(x.toFixed(d)).toString().replace('.',',');
const criterion=(id:string,label:string,points:number,test:(s:string)=>boolean,feedback:string,critical=false,kind:Criterion['kind']='conceptual'):Criterion=>({id,label,points,test,feedback,critical,kind});
const calc=(s:string,...values:number[])=>/[=]/.test(s)&&values.every(v=>numberIn(s,v,.0011));
const context=(s:string,words:string[])=>words.every(w=>normalize(s).includes(normalize(w)));
const nearNumber=(s:string,anchor:RegExp,value:number)=>{const t=normalize(s),m=anchor.exec(t);return !!m&&numberIn(t.slice(m.index,m.index+140),value);};
const correctLine=(s:string,a:number,b:number)=>{
  const m=normalize(s).match(/=\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*(\d+(?:\.\d+)?)\s*\*?\s*x/);
  return !!m&&Math.abs(Number(m[1])-a)<.0011&&Math.abs((m[2]==='-'?-1:1)*Number(m[3])-b)<.0011;
};
const populationHyp=(s:string,label:string,op:string,mu0:number)=>{
  const match=normalize(s).match(new RegExp(`${label}\\s*:?\\s*mu\\s*${op}\\s*(mu0|-?\\d+(?:\\.\\d+)?)`));
  return !!match&&(match[1]==='mu0'||Math.abs(Number(match[1])-mu0)<.0001);
};
const decision=(s:string,reject:boolean)=>{
  const t=normalize(s),negative=/no\s+(?:se\s+)?rechaz(?:o|amos|ar|a)\s+h\s*0/g;
  const no=negative.test(t),yes=/(?:se\s+)?rechaz(?:o|amos|ar|a)\s+h\s*0/.test(t.replace(negative,''));
  return reject?yes&&!no:no&&!yes;
};
const comparison=(s:string,p:number,alpha:number)=>{
  const t=normalize(s),expected=p<=alpha?['<','<=','=']:['>','>='];
  const m=t.match(/\bp\s*(?:=\s*\d*\.?\d+\s*)?([<>]=?|=)\s*(?:(?:alfa|alpha)\s*(?:=\s*)?)?(\d*\.?\d+|alfa|alpha)/g)??[];
  return m.some(v=>{const op=v.match(/[<>]=?|=(?=[^=]*$)/)?.[0];const opMatch=v.match(/([<>]=?)\s*(?:(?:alfa|alpha)\s*(?:=\s*)?)?(\d*\.?\d+|alfa|alpha)\s*$/);return !!opMatch&&expected.includes(opMatch[1])&&(opMatch[2]==='alfa'||opMatch[2]==='alpha'||Math.abs(Number(opMatch[2])-alpha)<.00001)||p===alpha&&op==='=';});
};
const probability=(s:string,df:number,t:number,tail:Tail)=>{
  const text=normalize(s),m=text.match(/p\s*\(\s*(\|?t(?:_?(\d+))?\|?)\s*(<=|>=|<|>)\s*(-?\d+(?:\.\d+)?)/);
  if(!m)return false;
  if(m[2]&&Number(m[2])!==df)return false;
  if(!m[2]&&!has(s,/gl|libertad/))return false;
  const event=tail==='two'?m[1].includes('|')&&m[3].startsWith('>'):m[3].startsWith(tail==='left'?'<':'>');
  return event&&Math.abs(Number(m[4])-(tail==='two'?Math.abs(t):t))<.0011;
};
const evidence=(s:string,reject:boolean)=>{
  const negative=has(s,/no (?:hay|existe|existen|se dispone de).{0,30}(?:evidencia|prueba)|evidencia.{0,20}insuficiente|no (?:es|son) suficiente/);
  return reject?has(s,/(?:hay|existe|existen|suficiente)\s+(?:evidencia|evidencias)|evidencia\s+(?:estadistica\s+)?suficiente/)&&!negative:negative;
};
const tails:Record<Tail,{symbol:string;word:string;prob:string}>={left:{symbol:'<',word:'izquierda',prob:'<='},right:{symbol:'>',word:'derecha',prob:'>='},two:{symbol:'!=',word:'bilateral',prob:'|T| >='}};

function regression(id:string,subject:string,x:string,y:string,xunit:string,yunit:string,a:number,b:number,r:number,range:[number,number],original=false):RecoveryTask {
  const r2=original ? .9171 : r*r;
  const reliable=range[0]<=0&&range[1]>=0;
  const change=b>0?'aumenta':'disminuye';
  return {id,skill:'regresion',title:'Leer e interpretar una regresión',original,
    story:`${subject} X representa ${x}, medido en ${xunit}; Y representa ${y}, medido en ${yunit}. El rango observado de X es [${range.join('; ')}]. Interpretá el modelo sin atribuir causalidad.`,
    table:{head:['Fila / indicador','Estimación'],rows:[['Constante',fmt(a)],['X',fmt(b)],['R (magnitud)',fmt(Math.abs(r))],['R²',fmt(r2)]]},parts:[
      {id:'a',prompt:'a) Escribí la recta y explicá la pendiente, con las unidades de X e Y.',requiresWork:true,
        model:`ŷ = ${fmt(a)} ${b>=0?'+':'−'} ${fmt(Math.abs(b))}x. Por cada unidad de X (${xunit}), ${y} ${change} en promedio ${fmt(Math.abs(b))} ${yunit}. El coeficiente de X es la pendiente; la constante es el intercepto.`,criteria:[
          criterion('recta','Recta con intercepto y pendiente en su lugar',3,s=>correctLine(s,a,b),'Escribí ŷ=a+b·x con los dos coeficientes y su signo.',false,'numérico'),
          criterion('pendiente','Cambio medio correcto y dirección',3,s=>nearNumber(s,new RegExp(change),Math.abs(b))&&has(s,/promedio|medio|media|espera/),'La fila del predictor indica el cambio medio; no uses la constante.',true),
          criterion('unidades','Unidad de incremento y unidad de respuesta',2,s=>context(s,[xunit,yunit])&&has(s,/por cada|por un|unidad/),'Nombrá ambas unidades, incluida la escala de X.',true,'redacción') ]},
      {id:'b',prompt:'b) Evaluá el ajuste, distinguí R de R² y explicá la variabilidad explicada. No generalices fuera del rango.',requiresWork:true,
        model:`R² = ${fmt(r2)}; R² × 100 = ${fmt(r2*100,2)}%. El modelo explica ese porcentaje de la variabilidad de ${y}. La asociación lineal tiene magnitud ${fmt(Math.abs(r))}; el ajuste es ${r2>.5?'alto':'bajo'} según el criterio orientativo del curso. El pronóstico se limita al rango observado y no prueba causalidad.`,criteria:[
          criterion('r2','R² convertido a porcentaje, con cálculo',3,s=>calc(s,r2)&&numberIn(s,r2*100,.02)&&has(s,/100|%/),'Multiplicá R² por 100; R y R² son magnitudes distintas.',false,'numérico'),
          criterion('variabilidad','Interpretación sobre la variabilidad de Y',3,s=>has(s,/variab|variacion/,/explica/)&&context(s,[y]),'Explicá variabilidad de la variable respuesta, no porcentaje de individuos.',true,'redacción'),
          criterion('ajuste','Valoración del ajuste y límite de uso',2,s=>has(s,r2>.5?/alto|buen|fuerte/:/bajo|mal|debil/,/rango|observad|interpol/),'Valorá el ajuste dentro del rango observado, no como una garantía universal.') ]},
      {id:'c',prompt:'c) Interpretá el intercepto. Separá significado conceptual y confiabilidad según el rango.',requiresWork:true,
        model:`Al evaluar x = 0, ŷ(0) = ${fmt(a)} ${yunit}: es ${y} estimado cuando ${x} vale cero. ${reliable?'Cero está dentro del rango observado: es una interpolación; no hay objeción por extrapolación. Eso no garantiza precisión perfecta.':'Cero queda fuera del rango observado: es extrapolación y la predicción no es confiable. No corresponde declarar imposible el valor por defecto.'}`,criteria:[
          criterion('intercepto','Valor en X=0 y significado contextual',4,s=>calc(s,0,a)&&context(s,[y])&&has(s,/estimad|esperad|modelo/),'Sustituí X=0 y nombrá la variable Y: no cambies el fenómeno estudiado.',false,'numérico'),
          criterion('rango','Confiabilidad diferenciada del sentido conceptual',4,s=>has(s,reliable?/dentro/:/fuera/,reliable?/interpol/:/extrapol/,reliable?/rango/:/no.*confiable|poco.*confiable/),'Decidí si cero pertenece al rango. Fuera del rango, el problema es la extrapolación.',true) ]},
    ]};
}

interface Groups { id:string; story:string; dependent:string; factor:string; levels:[string,string]; paired?:boolean; unknownNormal?:boolean; original?:boolean; a?:{mean:number;sd:number;n:number}; b?:{mean:number;sd:number;n:number}; tail:Tail }
function groups(d:Groups):RecoveryTask {
  const paired=!!d.paired, unknown=!!d.unknownNormal;
  const samples=d.a&&d.b?[sampleWithSummary(d.a.mean,d.a.sd,d.a.n),sampleWithSummary(d.b.mean,d.b.sd,d.b.n)]:undefined;
  const levene=samples?leveneTest(samples):undefined;
  const pLevene=levene?.p;
  const meanHyp=paired?'H0: mu_d = 0; H1: mu_d != 0. d = después − antes.':`H0: mu_A ${d.tail==='left'?'>=':'<='} mu_B; H1: mu_A ${tails[d.tail].symbol} mu_B. A=${d.levels[0]}, B=${d.levels[1]}.`;
  const result=d.a&&d.b?twoSampleT(d.a,d.b,(pLevene??0)>.05,d.tail):null;
  const gate=(s:string)=>context(s,[d.dependent,d.factor,...d.levels])&&has(s,new RegExp(`(?:vd|variable dependiente)(?:\\s+(?:cuantitativa|medida))?\\s*:\\s*${normalize(d.dependent)}`),new RegExp(`factor(?:\\s+cualitativo)?\\s*:\\s*${normalize(d.factor)}`));
  const normalModel=unknown?'La normalidad no está informada: revisar gráficos y Shapiro-Wilk (H0: normalidad; H1: no normalidad) antes de elegir un contraste paramétrico. Sin ese resultado, la elección y conclusión quedan condicionadas.':'Se supone normalidad '+(paired?'de las diferencias.':'en ambas poblaciones.');
  const varianceModel=paired?'Uso t para muestras apareadas. No corresponde Levene para comparar dos grupos independientes: se analiza la diferencia dentro de cada unidad.':`Primero Levene: H0: sigma_A² = sigma_B²; H1: sigma_A² != sigma_B². ${pLevene===undefined?'Sin salida no invento su resultado. Si no rechazo uso Student con varianzas iguales; si rechazo uso Welch.':`p_Levene = ${fmt(pLevene)} ${pLevene>.05?'>':'<'} 0,05: ${pLevene>.05?'no rechazo homogeneidad; uso Student agrupada':'rechazo homogeneidad; uso Welch'}.`}`;
  let numericModel=' No hay datos suficientes para calcular un estadístico y una decisión numérica.';
  if(result&&d.a&&d.b){
    const a=d.a,b=d.b,va=a.sd**2/a.n,vb=b.sd**2/b.n;
    const standardError=(pLevene??0)>.05
      ?`sp² = ((${a.n}−1)×${fmt(a.sd)}²+(${b.n}−1)×${fmt(b.sd)}²)/(${a.n}+${b.n}−2) = ${fmt(((a.n-1)*a.sd**2+(b.n-1)*b.sd**2)/(a.n+b.n-2))}. SE = sqrt(sp²×(1/${a.n}+1/${b.n})) = ${fmt(result.se)}. gl = ${a.n}+${b.n}−2 = ${result.df}.`
      :`SE = sqrt(${fmt(a.sd)}²/${a.n}+${fmt(b.sd)}²/${b.n}) = ${fmt(result.se)}. gl = (${fmt(va)}+${fmt(vb)})²/(${fmt(va)}²/(${a.n}−1)+${fmt(vb)}²/(${b.n}−1)) = ${fmt(result.df)} (Welch).`;
    numericModel=` ${standardError} Con A−B, t = (${fmt(a.mean)} − ${fmt(b.mean)}) / ${fmt(result.se)} = ${fmt(result.t)}; p = P(T_${fmt(result.df)} ${tails[d.tail].prob} ${fmt(result.t)} | H0) = ${fmt(result.p)} (${tails[d.tail].word}). Al 5%, ${result.p<=.05?'rechazo':'no rechazo'} H0; ${result.p<=.05?'hay':'no hay'} evidencia suficiente para concluir que ${d.dependent} ${d.tail==='left'?'es menor':'es mayor'} con ${d.levels[0]}.`;
  }
  return {id:d.id,skill:'dos-medias',title:paired?'Reconocer un diseño apareado':'Comparar dos métodos sin omitir supuestos',original:d.original,audit:samples&&levene?{samples,...levene}:undefined,story:d.story+` Notación: A=${d.levels[0]}, B=${d.levels[1]}; usá mu_A y mu_B (o mu_d para diferencias apareadas).`+(result?` Datos de A: xbar=${fmt(d.a!.mean)}, s=${fmt(d.a!.sd)}, n=${d.a!.n}; B: xbar=${fmt(d.b!.mean)}, s=${fmt(d.b!.sd)}, n=${d.b!.n}. Levene p=${fmt(pLevene!)}. Usá alfa=0,05.`:''),parts:[
    {id:'a',prompt:'a) Identificá VD, factor y niveles; justificá el diseño y los supuestos. Si omitís VD, factor o niveles, este subítem vale cero.',requiresWork:true,gate,
      model:`VD cuantitativa: ${d.dependent}. Factor cualitativo: ${d.factor}; niveles: ${d.levels.join(' y ')}. ${paired?'Son las mismas unidades antes y después: muestras apareadas.':'Son unidades distintas en cada grupo: muestras independientes por el diseño, no por la normalidad.'} ${normalModel}`,criteria:[
        criterion('variables','VD, factor y ambos niveles explícitos',5,gate,'Incluí el nombre de la medida, el factor y los dos niveles.',true,'redacción'),
        criterion('diseno','Independencia o apareamiento por las unidades observadas',4,s=>has(s,paired?/aparead|paread|dependient/:/independient/,paired?/mismas|mismos|cada unidad/:/distint|diferentes|separad/),'La normalidad no determina el diseño; describí quién fue medido.',true),
        criterion('normalidad','Normalidad dada o evaluación pendiente',3,s=>has(s,/normal/)&&(unknown?has(s,/shapiro|grafico/,/no.*inform|sin.*resultado|condicion/):has(s,/supone|supuesto|dada|asum/)),'Indicá si la normalidad está dada; si falta, no la inventes.') ]},
    {id:'b',prompt:'b) Escribí todas las hipótesis auxiliares y principales; elegí Student/Welch o apareadas. Si hay datos, desarrollá t, gl, p, decisión y conclusión.',requiresWork:true,
      model:`${varianceModel} ${meanHyp}${numericModel}`,criteria:[
          criterion('auxiliares','Hipótesis auxiliares y procedimiento previo',4,s=>paired?has(s,/diferenc/,/no.*levene/):has(s,/levene/,/h0\s*:\s*sigma_[ab](?:²|\^2|2)?\s*=\s*sigma_[ab]/,/h1\s*:\s*sigma_[ab](?:²|\^2|2)?\s*!=\s*sigma_[ab]/),'En independientes, explicitá H0/H1 de Levene; en apareadas analizá diferencias.',true),
          criterion('hipotesis','Hipótesis de medias con dirección correcta',4,s=>has(s,/h0/,/h1/,/mu/)&&(paired?has(s,/h0\s*:\s*mu_d\s*=\s*0/,/h1\s*:\s*mu_d\s*!=\s*0/):has(s,new RegExp(`h1\\s*:\\s*mu_a\\s*${d.tail==='left'?'<(?![=])':'>(?![=])'}\\s*mu_b`))&&has(s,new RegExp(`h0\\s*:\\s*mu_a\\s*${d.tail==='left'?'>=':'<='}\\s*mu_b`))||has(s,new RegExp(`h1\\s*:\\s*mu_b\\s*${d.tail==='left'?'>(?![=])':'<(?![=])'}\\s*mu_a`))&&has(s,new RegExp(`h0\\s*:\\s*mu_b\\s*${d.tail==='left'?'<=':'>='}\\s*mu_a`))),'Definí qué población ocupa cada posición y planteá H1 de acuerdo con el objetivo.',true),
        criterion('metodo','Elección justificada y resultado sin inventar',4,s=>result?has(s,(pLevene??0)>.05?/student/:/welch/)&&calc(s,result.t)&&numberIn(s,result.df,.02)&&numberIn(s,result.p,.0002)&&decision(s,result.p<=.05)&&evidence(s,result.p<=.05):paired?has(s,/aparead|paread/,/sin.*datos|no hay.*datos|no.*suficiente/):has(s,/student/,/welch/,/si|condicion/,/sin.*salida|no.*resultado|no.*datos/),'Con datos, incluí cálculo, gl, p y conclusión. Sin datos, explicá las ramas y dejá la decisión pendiente.',false,'numérico') ]},
  ]};
}

function chi(id:string,v1:string,v2:string,rows:number,cols:number,p:number,alpha:number,original=false):RecoveryTask {
  const strength=p===.02?6:p===.18?3:p===.04?5:7;
  const counts=Array.from({length:rows},(_,i)=>Array.from({length:cols},(_,j)=>20+strength*(i%2===j%2?1:-1)));
  const calculated=original?undefined:contingencyTest(counts);
  if(calculated)p=calculated.p;
  const df=(rows-1)*(cols-1), reject=p<=alpha;
  return {id,skill:'chi',title:'Asociación entre dos variables categóricas',original,
    story:`Se estudia la asociación entre ${v1} (${rows} categorías) y ${v2} (${cols} categorías), con n=${calculated?.n??300}. Las observaciones son independientes. Se verificaron frecuencias esperadas adecuadas. El nivel mínimo de significación observado es ${fmt(p)}. Trabajá con alfa=${fmt(alpha)}.`,
    table:calculated?{head:['Fila',...Array.from({length:cols},(_,j)=>`C${j+1}`),'Total'],rows:[...counts.map((row,i)=>[`F${i+1}`,...row.map(String),String(calculated.rows[i])]),['Total',...calculated.cols.map(String),String(calculated.n)]]}:undefined,
    parts:[
      {id:'a',prompt:'a) Escribí solo H1 con los nombres completos de ambas variables y nombrá el contraste.',
        model:`H1: ${v1} está asociada con ${v2}. Se aplica chi-cuadrado de independencia porque son dos variables categóricas, observadas en una tabla de contingencia.`,criteria:[
          criterion('h1','Solo H1, con ambas variables exactas',2,s=>has(s,/h1/,/asocia|relacion|dependen/)&&!has(s,/h0/)&&context(s,[v1,v2]),'No escribas «frecuencia e interacción»: identificá ambas variables y solo H1.',true,'redacción'),
          criterion('test','Prueba y tipo de variables',1,s=>has(s,/chi|ji|χ/,/categori|cualitativ/),'Chi-cuadrado de independencia: dos variables categóricas.') ]},
      {id:'b',prompt:`b) Calculá los grados de libertad. Escribí también cómo se obtiene una frecuencia esperada.${calculated?' Calculá E11 con los marginales de la tabla.':''}`,requiresWork:true,
        model:`gl = (${rows}−1) × (${cols}−1) = ${df}. Para cada celda, Eij = total de su fila × total de su columna / total general.${calculated?` E11 = ${calculated.rows[0]} × ${calculated.cols[0]} / ${calculated.n} = ${fmt(calculated.expected[0][0])}. Chi² = suma de (observada−esperada)²/esperada = ${fmt(calculated.statistic)}; p de cola derecha = ${fmt(p)}.`:''}`,criteria:[
          criterion('gl','Fórmula y sustitución de gl',2,s=>calc(s,rows,cols,df)&&has(s,/gl|libertad/),'Usá (filas−1)(columnas−1), mostrando la sustitución.',false,'numérico'),
          criterion('esperada','Frecuencia esperada por marginales',1,s=>has(s,/fila/,/columna/,/total/,/\*|×|por|multiplic/,/\/|divid/)&&(!calculated||numberIn(s,calculated.expected[0][0],.001)),'Eij = total fila × total columna / n; si hay tabla, sustituí los marginales.') ]},
      {id:'c',prompt:'c) Identificá p, comparalo con alfa y concluí en contexto. ¿Qué cola usa chi-cuadrado?',requiresWork:true,
        model:`p = ${fmt(p)} ${reject?'≤':'>'} alfa = ${fmt(alpha)}; ${reject?'rechazo':'no rechazo'} H0. Al ${fmt(alpha*100)}%, ${reject?'hay':'no hay'} evidencia suficiente para concluir asociación entre ${v1} y ${v2}. Chi-cuadrado usa la cola derecha. ${reject?'La asociación no demuestra causalidad.':'No rechazar no demuestra independencia.'}`,criteria:[
          criterion('decision','Comparación y decisión correctas',2,s=>numberIn(s,p,.00006)&&numberIn(s,alpha,.000001)&&comparison(s,p,alpha)&&decision(s,reject),'Compará el p-valor con alfa y decidí sobre H0.',true,'numérico'),
          criterion('conclusion','Conclusión completa sin afirmar H0',2,s=>context(s,[v1,v2])&&evidence(s,reject)&&has(s,/derecha/),'Nombrá las variables, el grado de evidencia y la cola derecha.',true,'redacción') ]},
    ]};
}

function one(id:string,variable:string,unit:string,n:number,mean:number,sd:number,mu0:number,tail:Tail,alpha:number,original=false):RecoveryTask {
  const r=oneSampleT(mean,mu0,sd,n,tail), reject=r.p<=alpha, ts=tails[tail];
  const h0=tail==='left'?'>=':tail==='right'?'<=':'=';
  const target=tail==='left'?'menor':tail==='right'?'mayor':'diferente';
  const pv=tail==='two'?`P(|T_${r.df}| >= ${fmt(Math.abs(r.t))} | H0)`:`P(T_${r.df} ${ts.prob} ${fmt(r.t)} | H0)`;
  return {id,skill:'una-media',title:'Una media: de los datos al p-valor',original,
    story:`Se busca verificar si la media poblacional de ${variable} es ${target} que ${fmt(mu0)} ${unit}. Una muestra aleatoria de ${n} unidades independientes da xbar=${fmt(mean)} ${unit}, s=${fmt(sd)} ${unit}. Sigma es desconocido; se supone normalidad. Usá alfa=${fmt(alpha)}.`,
    warning:original?'El encabezado del parcial dice 4%, pero el inciso b pide 5%. Acá se respeta el 5% de b y se comprueba también el 4%; la decisión coincide.':undefined,
    table:{head:['Salida simulada','df','Probabilidad'],rows:[[ts.word,r.df.toString(),fmt(r.p)],[ts.word,n.toString(),fmt(studentAlternative(r.t,n,tail))],[tail==='left'?'derecha':'izquierda',r.df.toString(),fmt(oneSampleT(mean,mu0,sd,n,tail==='left'?'right':'left').p)],[tail==='left'?'derecha':'izquierda',n.toString(),fmt(studentAlternative(r.t,n,tail==='left'?'right':'left'))]]},parts:[
      {id:'a',prompt:'a) Definí mu, mu0, xbar, s y n. Planteá H0/H1 y justificá por qué es una t de una población.',requiresWork:true,
        model:`mu representa la media poblacional de ${variable}; mu0=${fmt(mu0)} es el valor de referencia. xbar=${fmt(mean)} es la media muestral; s=${fmt(sd)} y n=${n}. H0: mu ${h0} ${fmt(mu0)}; H1: mu ${ts.symbol} ${fmt(mu0)}. Es una t de una población porque sigma es desconocido, se estima con s y se supone normalidad.`,criteria:[
          criterion('parametros','Parámetro, referencia y estadísticos separados',4,s=>has(s,/mu/,/poblacional/,/xbar|media muestral/,/s\s*=/,/n\s*=/)&&[mu0,mean,sd,n].every(v=>numberIn(s,v)),'Hay una sola media poblacional: xbar es de la muestra.',true),
          criterion('hipotesis','H0 y H1 con el parámetro y dirección correcta',3,s=>populationHyp(s,'h0',h0,mu0)&&populationHyp(s,'h1',tail==='two'?'!=':tail==='left'?'<(?![=])':'>(?![=])',mu0),'Escribí H0 con igualdad y H1 según el objetivo; no uses xbar como parámetro.',true),
          criterion('test','Prueba y supuestos',1,s=>has(s,/t\b|student/,/una (?:poblacion|muestra)/,/desconoc/,/normal/),'Justificá Student por sigma desconocido y normalidad, con una sola población.') ]},
      {id:'b',prompt:'b) Mostrá fórmula, sustitución y valor de t; gl, cola, probabilidad p bajo H0, comparación y conclusión. Elegí la salida coherente.',requiresWork:true,
        model:`t = (xbar−mu0)/(s/raiz(n)) = (${fmt(mean)}−${fmt(mu0)})/(${fmt(sd)}/raiz(${n})) = ${fmt(r.t)}. gl = n−1 = ${r.df}. Cola ${ts.word}. p = ${pv} = ${fmt(r.p)}, bajo H0 en el límite mu=${fmt(mu0)}: probabilidad de un estadístico tan extremo o más en la dirección de H1. p ${reject?'≤':'>'} alfa=${fmt(alpha)}; ${reject?'rechazo':'no rechazo'} H0. ${reject?'Hay':'No hay'} evidencia suficiente para concluir que la media de ${variable} es ${target} que ${fmt(mu0)} ${unit}.${original?' También p > 0,04: al 4% tampoco rechazo.':''}`,criteria:[
          criterion('calculo','Fórmula, sustitución y t',4,s=>calc(s,mean,mu0,sd,n,r.t)&&numericWork(s,r.t)&&has(s,/raiz|sqrt|√/,/xbar|media/),'Escribí (xbar−mu0)/(s/√n), sustituí todos los datos y verificá que la expresión numérica dé tu resultado.',false,'numérico'),
          criterion('probabilidad','gl, cola y p expresado como probabilidad',4,s=>numberIn(s,r.df)&&numberIn(s,r.p,.0002)&&probability(s,r.df,r.t,tail)&&has(s,/gl|libertad/,new RegExp(ts.word),/h0/),'p no es P(H0): escribí la probabilidad de T, su gl y la cola bajo H0.',true),
          criterion('decision','Comparación y conclusión en contexto',4,s=>numberIn(s,alpha)&&comparison(s,r.p,alpha)&&decision(s,reject)&&evidence(s,reject)&&context(s,[variable]),'Compará con alfa y concluí sobre la media de la variable, sin dar H0 por cierta.',true,'redacción') ]},
      {id:'c',prompt:'c) Indicá el error posible según tu decisión y explicalo en el problema.',requiresWork:true,
        model:reject?`El error posible es tipo I: concluir que la media de ${variable} es ${target} que ${fmt(mu0)} ${unit} cuando en realidad H0 es verdadera y no ocurre ese cambio.`:`El error posible es tipo II: no detectar que la media de ${variable} es ${target} que ${fmt(mu0)} ${unit} cuando en realidad ese cambio existe.`,criteria:[
          criterion('error','Tipo de error y traducción al problema',4,s=>has(s,reject?/tipo\s*(?:i\b|1\b|uno\b)/:/tipo\s*(?:ii\b|2\b|dos\b)/,/en realidad|cuando|si realmente/)&&context(s,[variable]),'Rechazo → posible tipo I; no rechazo → posible tipo II. Explicalo con la variable.',true,'redacción') ]},
    ]};
}
// Importación separada para que todas las probabilidades de distractores también se calculen.
import { studentP } from '../../lib/statistics';
const studentAlternative=(t:number,df:number,tail:Tail)=>studentP(t,df,tail);

function interval(id:string,variable:string,lo:number,hi:number,alpha:number,riskDown:boolean,original=false):RecoveryTask {
  const phat=(lo+hi)/2, em=(hi-lo)/2;
  return {id,skill:'intervalos',title:'Confianza y precisión sin invertir las flechas',original,
    story:`Un intervalo simétrico para la proporción poblacional de ${variable} es [${fmt(lo)}; ${fmt(hi)}]. ${original?'La confianza numérica no está informada.':`Para este ejercicio usá confianza ${fmt((1-alpha)*100)}%.`} Se propone ${riskDown?'disminuir':'aumentar'} alfa, manteniendo n y el método de construcción. Evaluá si eso aumenta la precisión.`,warning:original?'El PDF no informa alfa ni confianza numérica para este intervalo. Los límites por sí solos no permiten reconstruirlos.':undefined,parts:[
      {id:'a',prompt:'a) Calculá phat, EM y amplitud con fórmulas, e interpretá qué parámetro estima el intervalo.',requiresWork:true,
        model:`phat = (${fmt(lo)}+${fmt(hi)})/2 = ${fmt(phat)}. EM = (${fmt(hi)}−${fmt(lo)})/2 = ${fmt(em)}. Amplitud = ${fmt(hi)}−${fmt(lo)} = ${fmt(2*em)}. El intervalo estima la proporción poblacional de ${variable}; no una proporción de individuos dentro de límites numéricos.`,criteria:[
          criterion('centro','Punto medio y fórmula',3,s=>calc(s,lo,hi,phat)&&has(s,/phat|p con|estimador/),'phat=(LI+LS)/2 para este intervalo simétrico.',false,'numérico'),
          criterion('margen','Margen positivo y amplitud',3,s=>calc(s,em,2*em)&&has(s,/em|margen/,/amplitud/)&&!has(s,/phat\s*-\s*(?:ls|limite superior)/),'EM=(LS−LI)/2, siempre positivo; amplitud=2·EM.',false,'numérico'),
          criterion('parametro','Interpretación poblacional contextual',3,s=>has(s,/proporcion poblacional/)&&context(s,[variable]),'El intervalo estima p poblacional, no el porcentaje de una muestra entre números.',false,'redacción') ]},
      {id:'b',prompt:'b) Respondé V/F a «la propuesta aumenta la precisión» y justificá toda la cadena alfa → confianza → valor crítico → EM/amplitud → precisión.',requiresWork:true,
        model:`${riskDown?'Falso':'Verdadero'}. Confianza = 1−alfa${original?' (su valor numérico no está informado).':` = ${fmt(1-alpha)}; alfa=${fmt(alpha)}.`} Con n fijo, si alfa ${riskDown?'disminuye':'aumenta'}, la confianza ${riskDown?'aumenta':'disminuye'}; el valor crítico ${riskDown?'aumenta':'disminuye'}; EM y amplitud ${riskDown?'aumentan':'disminuyen'} y la precisión ${riskDown?'disminuye':'aumenta'}. Para aumentar precisión sin bajar confianza hay que aumentar n.`,criteria:[
          criterion('riesgo','V/F correcto, alfa y confianza',3,s=>has(s,riskDown?/falso/:/verdadero/,/confianza/,/1\s*[-−]\s*(?:alfa|alpha)/)&&(original||calc(s,alpha,1-alpha)),'Usá confianza=1−alfa y respondé V/F sobre la propuesta.',true),
          criterion('cadena','Cadena causal de ancho y precisión, con n fijo',6,s=>has(s,/n fijo|n constante|manteniendo n/,/valor critico/,/em|margen/,/amplitud/,/precision/)&&has(s,new RegExp(`confianza.{0,25}${riskDown?'aumenta|confianza.{0,25}sube':'disminuye|confianza.{0,25}baja'}`))&&has(s,new RegExp(`precision.{0,25}${riskDown?'disminuye|precision.{0,25}baja':'aumenta|precision.{0,25}sube'}`)),'Con alfa menor: confianza mayor, crítico mayor, EM mayor, precisión menor.',true) ]},
    ]};
}

export const ORIGINAL_TASKS:RecoveryTask[]=[
  regression('original-regresion','Se analiza un modelo de entrenamiento.','volumen de datos','tiempo de entrenamiento','miles de registros','minutos',2.3507,5.1809,.9577,[7,20],true),
  groups({id:'original-dos',story:'Se compara el error de medición de dos grupos distintos de sensores, con calibración automatizada o tradicional. Se supone normalidad. Se busca menor error con el método automatizado. No se informan salidas de contraste.',dependent:'error de medición',factor:'método de calibración',levels:['automatizado','tradicional'],tail:'left',original:true}),
  chi('original-chi','frecuencia de publicación en redes sociales','tipo habitual de interacción con publicaciones ajenas',4,5,.07,.05,true),
  one('original-una','consumo de memoria RAM','GB',10,5.9,1.68,6.7,'left',.05,true),
  interval('original-ic','módulos sin errores críticos',.82,.88,.05,true,true),
];

export const VARIANT_TASKS:RecoveryTask[]=[
  regression('reg-1','Se estudia un servicio de impresión.','cantidad de páginas','tiempo de impresión','cientos de páginas','segundos',8,3.4,.9,[2,12]),
  regression('reg-2','Se estudia el mantenimiento preventivo.','horas de mantenimiento','cantidad media de fallas','horas','fallas',25,-1.8,-.8,[1,8]),
  regression('reg-3','Se estudia un circuito a temperaturas cercanas a cero.','temperatura','consumo de energía','grados Celsius','kWh',12,2.1,.75,[-2,6]),
  regression('reg-4','Se estudia un sistema de comunicaciones.','cantidad de equipos','latencia','decenas de equipos','milisegundos',4,1.6,.6,[1,15]),
  groups({id:'dos-1',story:'Dos grupos distintos de motores reciben control nuevo o habitual. Se supone normalidad. Se investiga si el nuevo reduce el consumo.',dependent:'consumo eléctrico',factor:'tipo de control',levels:['nuevo','habitual'],tail:'left',a:{mean:18,sd:2,n:15},b:{mean:20,sd:2.2,n:15}}),
  groups({id:'dos-2',story:'Grupos distintos de trabajadores usan dos interfaces. Se supone normalidad y se busca mayor productividad con la interfaz nueva.',dependent:'productividad',factor:'interfaz',levels:['nueva','anterior'],tail:'right',a:{mean:52,sd:12,n:18},b:{mean:48,sd:4,n:14}}),
  groups({id:'dos-3',story:'Se mide la latencia de los mismos servidores antes y después de un ajuste. Las diferencias son normales. Se busca cualquier cambio medio. No se dan datos numéricos.',dependent:'latencia',factor:'momento de medición',levels:['después','antes'],tail:'two',paired:true}),
  groups({id:'dos-4',story:'Dos grupos distintos de impresoras usan insumo nuevo o estándar. Se busca menor desgaste con el nuevo. La muestra es pequeña y no hay resultados de normalidad ni de Levene.',dependent:'desgaste',factor:'tipo de insumo',levels:['nuevo','estándar'],tail:'left',unknownNormal:true}),
  chi('chi-1','turno de trabajo','tipo de incidencia',3,4,.02,.05),
  chi('chi-2','frecuencia de lectura','género literario preferido',4,3,.18,.05),
  chi('chi-3','nivel de capacitación','categoría de reclamo',2,5,.04,.01),
  chi('chi-4','modalidad de cursada','tipo de recurso consultado',3,3,.008,.04),
  one('una-1','tiempo de respuesta','ms',12,45,6,50,'left',.05),
  one('una-2','duración de baterías','horas',16,10.4,1.6,10,'right',.05),
  one('una-3','peso de paquetes','kg',9,5.8,.6,5,'two',.01),
  one('una-4','consumo de combustible','litros',20,8.2,1.1,8,'right',.1),
  interval('ic-1','entregas a tiempo',.7,.8,.05,true),
  interval('ic-2','usuarios satisfechos',.6,.72,.1,false),
  interval('ic-3','piezas sin defectos',.9,.96,.01,true),
  interval('ic-4','consultas resueltas',.45,.55,.05,false),
];
export const ALL_RECOVERY_TASKS=[...ORIGINAL_TASKS,...VARIANT_TASKS];
export const TASK_BY_ID=new Map(ALL_RECOVERY_TASKS.map(t=>[t.id,t]));
export const SKILLS=[
  {id:'regresion',title:'Regresión y Jamovi',score:12,max:24,original:0,tip:'Leé primero Constante y predictor. Después poné nombre y unidad a cada coeficiente.'},
  {id:'dos-medias',title:'Dos medias y diseño',score:14,max:24,original:1,tip:'Primero quién fue medido, después VD, factor y niveles. Normalidad e independencia responden preguntas distintas.'},
  {id:'chi',title:'Chi² y conclusión',score:2,max:10,original:2,tip:'Empezá por esta habilidad: faltó una conclusión completa y los nombres exactos de las variables.'},
  {id:'una-media',title:'Una media y p-valor',score:12,max:24,original:3,tip:'Separá mu, mu0 y xbar antes de escribir hipótesis. El p-valor requiere una probabilidad bajo H0.'},
  {id:'intervalos',title:'Intervalos y precisión',score:8,max:18,original:4,tip:'Con n fijo, dibujá las cinco flechas: alfa, confianza, crítico, amplitud y precisión.'},
];
