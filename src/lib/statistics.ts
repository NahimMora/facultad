/** Cálculos locales de práctica. t mediante beta incompleta (fracción continua). */
function logGamma(z: number): number {
  const c = [676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -0.13857109526572012, 9.984369578019572e-6, 1.5056327351493116e-7];
  if (z < .5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let x = .9999999999998099;
  c.forEach((v, i) => { x += v / (z + i + 1); });
  const t = z + 7.5;
  return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x);
}

function betaFraction(a: number, b: number, x: number): number {
  const tiny = 1e-300;
  let c = 1, d = 1 - (a + b) * x / (a + 1);
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 300; m++) {
    const terms=[m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m)), -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1))];
    for (let j=0;j<terms.length;j++) {
      const aa=terms[j];
      d = 1 + aa * d; if (Math.abs(d) < tiny) d = tiny;
      c = 1 + aa / c; if (Math.abs(c) < tiny) c = tiny;
      d = 1 / d;
      const delta = d * c; h *= delta;
      if (j===1 && Math.abs(delta - 1) < 3e-14) return h;
    }
  }
  throw new Error('La beta incompleta no convergió.');
}

export function regularizedBeta(x: number, a: number, b: number): number {
  if (!(a > 0 && b > 0 && x >= 0 && x <= 1)) throw new Error('Parámetros de beta inválidos.');
  if (x === 0 || x === 1) return x;
  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log1p(-x));
  return x < (a + 1) / (a + b + 2) ? bt * betaFraction(a, b, x) / a : 1 - bt * betaFraction(b, a, 1 - x) / b;
}

export type Tail = 'left' | 'right' | 'two';
export function studentP(t: number, df: number, tail: Tail = 'left'): number {
  if (!Number.isFinite(t) || !Number.isFinite(df) || df <= 0) throw new Error('t o grados de libertad inválidos.');
  const half = .5 * regularizedBeta(df / (df + t * t), df / 2, .5);
  return tail === 'two' ? Math.min(1, 2 * half) : tail === 'left' ? (t < 0 ? half : 1 - half) : (t > 0 ? half : 1 - half);
}

export function oneSampleT(mean: number, mu0: number, sd: number, n: number, tail: Tail) {
  if (!(sd > 0 && Number.isInteger(n) && n > 1)) throw new Error('Muestra inválida.');
  const se = sd / Math.sqrt(n), t = (mean - mu0) / se, df = n - 1;
  return { se, t, df, p: studentP(t, df, tail) };
}

export function twoSampleT(a: {mean:number; sd:number; n:number}, b: {mean:number; sd:number; n:number}, pooled: boolean, tail: Tail) {
  if (![a,b].every(v=>v.sd>0&&Number.isInteger(v.n)&&v.n>1)) throw new Error('Muestras inválidas.');
  const va = a.sd ** 2 / a.n, vb = b.sd ** 2 / b.n;
  const se = pooled ? Math.sqrt(((a.n-1)*a.sd**2+(b.n-1)*b.sd**2)/(a.n+b.n-2)*(1/a.n+1/b.n)) : Math.sqrt(va+vb);
  const df = pooled ? a.n+b.n-2 : (va+vb)**2/(va**2/(a.n-1)+vb**2/(b.n-1));
  const t = (a.mean-b.mean)/se;
  return {se,t,df,p:studentP(t,df,tail)};
}

/** Muestra sintética reproducible, con media y desvío muestral especificados. */
export function sampleWithSummary(mean:number,sd:number,n:number) {
  if(!(sd>0&&Number.isInteger(n)&&n>2))throw new Error('Resumen inválido.');
  const raw=Array.from({length:n},(_,i)=>i-(n-1)/2);
  const rawSd=Math.sqrt(raw.reduce((s,v)=>s+v*v,0)/(n-1));
  return raw.map(v=>mean+sd*v/rawSd);
}
/** Levene centrado en la media; ANOVA sobre desviaciones absolutas. */
export function leveneTest(samples:number[][]) {
  if(samples.length<2||samples.some(s=>s.length<3||s.some(v=>!Number.isFinite(v))))throw new Error('Muestras de Levene inválidas.');
  const zs=samples.map(s=>{const mean=s.reduce((a,b)=>a+b,0)/s.length;return s.map(v=>Math.abs(v-mean));});
  const n=zs.reduce((sum,z)=>sum+z.length,0),k=zs.length;
  const means=zs.map(z=>z.reduce((a,b)=>a+b,0)/z.length);
  const grand=zs.reduce((sum,z)=>sum+z.reduce((a,b)=>a+b,0),0)/n;
  const between=means.reduce((sum,m,i)=>sum+zs[i].length*(m-grand)**2,0);
  const within=zs.reduce((sum,z,i)=>sum+z.reduce((a,v)=>a+(v-means[i])**2,0),0);
  if(within===0)throw new Error('Levene indeterminado por falta de variación.');
  const statistic=(n-k)*between/((k-1)*within),df1=k-1,df2=n-k;
  const p=regularizedBeta(df2/(df2+df1*statistic),df2/2,df1/2);
  return {statistic,df1,df2,p};
}

/** Supervivencia chi² para gl pares (todos los cruces de este banco). */
export function chiSquareP(statistic:number,df:number) {
  if(!(statistic>=0&&Number.isFinite(statistic)&&Number.isInteger(df)&&df>0&&df%2===0))throw new Error('Se requieren gl pares y chi² no negativo.');
  const x=statistic/2;
  let sum=1,term=1;
  for(let k=1;k<df/2;k++){term*=x/k;sum+=term;}
  return Math.exp(-x)*sum;
}
export function contingencyTest(counts:number[][]) {
  const r=counts.length,c=counts[0]?.length??0;
  if(r<2||c<2||counts.some(row=>row.length!==c||row.some(n=>!Number.isInteger(n)||n<0)))throw new Error('Tabla de contingencia inválida.');
  const rows=counts.map(row=>row.reduce((a,b)=>a+b,0));
  const cols=Array.from({length:c},(_,j)=>counts.reduce((s,row)=>s+row[j],0));
  const n=rows.reduce((a,b)=>a+b,0);
  if(!n||rows.some(x=>!x)||cols.some(x=>!x))throw new Error('Marginal vacío.');
  const expected=counts.map((row,i)=>row.map((_,j)=>rows[i]*cols[j]/n));
  const statistic=counts.reduce((s,row,i)=>s+row.reduce((sum,o,j)=>sum+(o-expected[i][j])**2/expected[i][j],0),0);
  const df=(r-1)*(c-1);
  return {expected,statistic,df,p:chiSquareP(statistic,df),rows,cols,n};
}

/** Cuantil normal por búsqueda sobre la CDF, aproximación de erf (< 1.5e-7). */
function normalCDF(x: number) {
  const z = Math.abs(x)/Math.SQRT2, t = 1/(1+.3275911*z);
  const erf = 1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-z*z);
  return .5*(1+(x<0?-erf:erf));
}
export function normalQuantile(p: number) {
  if (!(p>0&&p<1)) throw new Error('Probabilidad inválida.');
  let lo=-9,hi=9;
  for(let i=0;i<70;i++){const m=(lo+hi)/2;if(normalCDF(m)<p)lo=m;else hi=m;}
  return (lo+hi)/2;
}
export function proportionMargin(phat: number, n: number, confidence: number) {
  if (!(phat>0&&phat<1&&Number.isInteger(n)&&n>0&&confidence>0&&confidence<1)) throw new Error('Intervalo inválido.');
  return normalQuantile((1+confidence)/2)*Math.sqrt(phat*(1-phat)/n);
}
