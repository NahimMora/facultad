/** Evaluador de expresiones numéricas sin eval/Function ni acceso al entorno. */
export function arithmetic(source:string):number|null {
  const input=source.toLowerCase().replace(/,/g,'.').replace(/[−–]/g,'-').replace(/[×·]/g,'*').replace(/raiz|√/g,'sqrt').replace(/\s/g,'');
  if(!input||input.length>400)return null;
  let at=0;
  const expression=():number=>{let n=term();while(input[at]==='+'||input[at]==='-'){const op=input[at++];n=op==='+'?n+term():n-term();}return n;};
  const term=():number=>{let n=unary();while(input[at]==='*'||input[at]==='/'){const op=input[at++];n=op==='*'?n*unary():n/unary();}return n;};
  const unary=():number=>{if(input[at]==='+'||input[at]==='-'){const sign=input[at++];return (sign==='-'?-1:1)*unary();}return power();};
  const power=():number=>{const n=factor();if(input[at]==='^'){at++;return n**unary();}return n;};
  const factor=():number=>{
    if(input.startsWith('sqrt(',at)){at+=5;const n=expression();if(input[at++]!==')')throw new Error('Paréntesis');return Math.sqrt(n);}
    if(input[at]==='('){at++;const n=expression();if(input[at++]!==')')throw new Error('Paréntesis');return n;}
    const m=input.slice(at).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if(!m)throw new Error('Número');at+=m[0].length;return Number(m[0]);
  };
  try{const n=expression();return at===input.length&&Number.isFinite(n)?n:null;}catch{return null;}
}

/** Busca sustitución numérica = resultado y verifica ambos, con tolerancia de redondeo. */
export function numericWork(text:string,expected:number,tolerance=.0015) {
  const pieces=text.replace(/≈|≃/g,'=').split('=');
  return pieces.some((piece,i)=>{
    if(i===pieces.length-1)return false;
    const value=arithmetic(piece.trim());
    const next=pieces[i+1].trim().match(/^-?\d+(?:[.,]\d+)?/);
    return value!==null&&!!next&&Math.abs(value-expected)<=tolerance&&Math.abs(Number(next[0].replace(',','.'))-expected)<=tolerance;
  });
}
