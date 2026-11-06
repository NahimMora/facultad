/** Arquitectura de Computadores · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bits, box, head, ico, scene, seq, stack, table, txt } from './h';

const B = (s: string, c: 'blue' | 'orange' | 'green' | 'pink' | 'yellow' | 'gray' | 'red' | 'purple' = 'blue') => s.split('').map((t) => ({ t, c }));

export const SCENES: Record<string, VisScene[]> = {
  r1: [
    scene([
      head('Overflow con signo (OF) y sin signo (CF)'),
      txt(120, 92, '−7 =', { fs: 22, b: true, anchor: 'end', mono: true }), bits(140, 70, 280, B('1001'), { h: 44, fs: 22, mono: true }),
      txt(120, 147, '−3 =', { fs: 22, b: true, anchor: 'end', mono: true }), bits(140, 125, 280, B('1101'), { h: 44, fs: 22, mono: true }),
      bits(70, 190, 350, [{ t: '1', c: 'gray' }, ...B('0110', 'red')], { h: 44, fs: 22, mono: true, s: 1 }),
      txt(245, 260, 'neg + neg = POSITIVO (+6) → OF = 1', { b: true, fs: 17, c: 'red', s: 1 }),
      txt(530, 92, '15 =', { fs: 22, b: true, anchor: 'end', mono: true, s: 2 }), bits(550, 70, 220, B('1111', 'orange'), { h: 44, fs: 22, mono: true, s: 2 }),
      txt(530, 147, '4 =', { fs: 22, b: true, anchor: 'end', mono: true, s: 2 }), bits(550, 125, 220, B('0100', 'orange'), { h: 44, fs: 22, mono: true, s: 2 }),
      bits(495, 190, 275, [{ t: '1', c: 'yellow' }, ...B('0011', 'orange')], { h: 44, fs: 22, mono: true, s: 2 }),
      txt(630, 260, 'sin signo: 19 > 15 → CF = 1', { b: true, fs: 17, c: 'yellow', s: 2 }),
      box(30, 300, 740, 60, 'Con signos DISTINTOS nunca hay overflow', { c: 'green', fs: 20, s: 3 }),
      box(30, 375, 740, 60, 'Underflow: el valor es tan chico que no se representa (coma flotante → 0)', { c: 'purple', fs: 17, s: 4 }),
    ], [
      'Con 4 bits en complemento a 2, el rango es de menos 8 a 7. Sumemos menos 7 y menos 3.',
      'El resultado de 4 bits es 0110: **positivo**. Dos negativos dieron positivo, así que hay **overflow** con signo: se prende la bandera **OF**.',
      'Ahora sin signo: 15 más 4 da 19, que no entra en 4 bits. El bit que sobra es el **carry**: se prende **CF**. CF es la bandera de **sin signo**; OF, la de **con signo**.',
      'Regla: si los dos operandos tienen **signos distintos**, **nunca** hay overflow.',
      'Y el **underflow** es lo opuesto: un número tan chico que no se puede representar, típico de coma flotante, donde se aproxima a cero.',
    ]),
  ],
  r2: [
    scene([
      head('IEEE 754 simple: −6,5'),
      bits(30, 80, 740, [{ t: 'S', n: 1, c: 'red', sub: '1 bit' }, { t: 'exponente sesgado', n: 8, c: 'orange', sub: '8 bits (sesgo 127)' }, { t: 'mantisa (después del "1,")', n: 23, c: 'blue', sub: '23 bits' }], { h: 54, fs: 17 }),
      box(30, 175, 360, 60, '6,5 = 110,1₂ = 1,101 × 2²', { c: 'white', fs: 22, s: 1 }),
      box(410, 175, 360, 60, 'e = 2 + 127 = 129 = 10000001', { c: 'orange', fs: 19, s: 2 }),
      bits(30, 275, 740, [{ t: '1', n: 1, c: 'red' }, { t: '10000001', n: 8, c: 'orange' }, { t: '1010000…0', n: 23, c: 'blue' }], { h: 54, fs: 20, mono: true, s: 3 }),
      box(240, 360, 320, 70, 'C0D00000h', { c: 'green', fs: 32, s: 4 }),
    ], [
      'En **IEEE 754** de precisión simple, 32 bits: **1 de signo**, **8 de exponente** con sesgo 127, y **23 de mantisa**, lo que va después del uno coma implícito.',
      'Pasamos 6,5 a binario: 110,1. Normalizado: **1,101 por 2 a la 2**.',
      'El exponente se guarda **sesgado**: 2 más 127, **129**, que en binario es 10000001.',
      'Armamos: signo 1 porque es negativo, el exponente, y la mantisa 101 seguida de ceros.',
      'Agrupando de a 4 bits en hexadecimal: **C0D00000**. Y otros códigos: BCD, 4 bits por dígito; ASCII de 7 bits; y la **paridad**, que detecta errores de un solo bit.',
    ]),
  ],
  r3: [
    scene([
      head('Arquitectura Von Neumann'),
      box(30, 60, 380, 250, '', { c: 'purple' }), txt(220, 85, 'CPU', { b: true, fs: 22, c: 'purple' }),
      box(50, 110, 160, 80, 'Unidad de control', { c: 'orange', fs: 16, id: 'uc' }),
      box(230, 110, 160, 80, 'ALU', { c: 'red', fs: 22, sub: 'Z S C O', id: 'alu', s: 1 }),
      bits(50, 215, 340, [{ t: 'PC/IP' }, { t: 'IR' }, { t: 'MAR' }, { t: 'MBR' }, { t: 'ACC' }], { h: 44, fs: 14, s: 2, title: 'registros' }),
      box(560, 60, 210, 250, 'MEMORIA ÚNICA', { c: 'blue', fs: 20, sub: 'datos E instrucciones', id: 'mem' }),
      box(30, 360, 740, 60, 'buses: datos · direcciones · control', { c: 'green', fs: 19, id: 'bus', s: 3 }),
      arr([220, 310], [220, 355], { c: 'green', two: true, s: 3 }), arr([665, 310], [665, 355], { c: 'green', two: true, s: 3 }),
      txt(485, 200, 'E/S', { b: true, fs: 20, c: 'gray', s: 3 }),
    ], [
      'En la arquitectura **Von Neumann**, la CPU tiene una **unidad de control**, que dirige todo…',
      '…y una **ALU**, que hace las operaciones aritméticas, lógicas y de desplazamiento, y actualiza las banderas: cero, signo, carry y overflow.',
      'Los **registros**: el **PC o IP** con la dirección de la próxima instrucción, el **IR** con la instrucción actual, MAR y MBR para dirección y dato.',
      'Y una **memoria única** para datos e instrucciones, conectada por los **buses** de datos, direcciones y control, junto con la entrada y salida.',
    ]),
  ],
  r4: [
    scene([
      head('Memorias: velocidad vs costo'),
      stack(240, 55, 320, 300, [{ t: 'Registros', c: 'red' }, { t: 'Caché · SRAM', c: 'orange' }, { t: 'RAM · DRAM', c: 'blue' }, { t: 'SSD / Flash', c: 'green' }, { t: 'Disco', c: 'gray' }], { fs: 18 }),
      txt(120, 80, '↑ más rápida', { b: true, fs: 17, c: 'red' }), txt(120, 340, '↓ más barata y grande', { b: true, fs: 17, c: 'gray' }),
      box(580, 80, 200, 110, 'SRAM: flip-flops, ~10 ns, sin refresco', { c: 'orange', fs: 15, s: 1 }),
      box(580, 205, 200, 110, 'DRAM: capacitor, ~100 ns, necesita REFRESCO', { c: 'blue', fs: 15, s: 1 }),
      table(20, 375, 760, undefined, [['ROM: fábrica', 'PROM: 1 vez', 'EPROM: luz UV', 'EEPROM: eléctrica por celda', 'Flash: por bloques']], { rh: 56, fs: 13, s: 2 }),
    ], [
      'La **jerarquía de memoria**: arriba lo más rápido y caro, los registros y la caché; abajo lo más barato y grande, la RAM, el SSD y el disco.',
      'La **SRAM** usa flip-flops: rápida, unos 10 nanosegundos, sin refresco, cara: por eso es la **caché**. La **DRAM** guarda cada bit en un capacitor que se descarga: necesita **refresco**, es más lenta y barata: es la **memoria principal**. DDR duplica las transferencias por ciclo.',
      'Las no volátiles: **ROM** de fábrica, **PROM** que se programa una vez, **EPROM** que se borra con **luz ultravioleta**, **EEPROM** que se borra eléctricamente celda por celda, y **Flash**, eléctrica por bloques.',
    ]),
  ],
  r5: [
    scene([
      head('Caché: directa, asociativa y por conjuntos'),
      ...Array.from({ length: 8 }, (_, i) => box(40, 60 + i * 40, 100, 34, `bloque ${i}`, { c: 'gray', fs: 13, id: 'm' + i })),
      txt(90, 400, 'memoria', { b: true, fs: 15, c: 'gray' }),
      ...Array.from({ length: 4 }, (_, i) => box(330, 100 + i * 60, 110, 46, `renglón ${i}`, { c: 'blue', fs: 14, id: 'c' + i })),
      txt(385, 400, 'caché (4 renglones)', { b: true, fs: 15, c: 'blue' }),
      arr('m5', 'c1', { c: 'orange', s: 1, t: '5 mod 4 = 1' }),
      txt(250, 60, 'DIRECTA: un solo lugar', { b: true, fs: 16, c: 'orange', s: 1, out: 2 }),
      arr('m5', 'c0', { c: 'green', s: 2, dash: true }), arr('m5', 'c2', { c: 'green', s: 2, dash: true }), arr('m5', 'c3', { c: 'green', s: 2, dash: true }),
      txt(250, 60, 'ASOCIATIVA: cualquier renglón', { b: true, fs: 16, c: 'green', s: 2, out: 3 }),
      txt(250, 60, 'N VÍAS: conjunto fijo, vía libre', { b: true, fs: 16, c: 'purple', s: 3 }),
      box(480, 60, 300, 90, 'Localidad TEMPORAL y ESPACIAL · hit / miss (se trae el bloque)', { c: 'cyan', fs: 15, s: 0 }),
      box(480, 165, 300, 80, 'Reemplazo: FIFO · LRU · aleatorio', { c: 'yellow', fs: 16, s: 4 }),
      box(480, 260, 300, 85, 'Write-through: caché y memoria a la vez', { c: 'blue', fs: 15, s: 5 }),
      box(480, 355, 300, 80, 'Write-back: solo caché, bloque SUCIO', { c: 'pink', fs: 15, s: 5 }),
    ], [
      'La caché funciona por **localidad**: lo que usaste lo vas a volver a usar, y lo que está al lado también. Si el dato está, es un **hit**; si no, un **miss**, y se trae el **bloque** completo.',
      'En la correspondencia **directa**, cada bloque tiene **un solo** renglón posible: el número de bloque módulo la cantidad de renglones. El bloque 5 va al renglón 1. Es simple, pero genera conflictos.',
      'En la **asociativa**, el bloque puede ir a **cualquier** renglón: flexible, pero hay que buscar por etiqueta en todos.',
      'La **asociativa por conjuntos de N vías** es el punto medio: el conjunto es fijo, y dentro de él, cualquier vía libre.',
      'Si no hay lugar, se reemplaza: **FIFO**, **LRU**, el menos usado recientemente, o al azar.',
      'Al escribir: **write-through** escribe en caché y memoria a la vez; **write-back** solo en caché, y marca el bloque como **sucio** hasta desalojarlo. En multinúcleo, la coherencia se mantiene con **snooping** o con directorio.',
    ]),
  ],
  r6: [
    scene([
      head('Memoria virtual: paginación'),
      ...Array.from({ length: 5 }, (_, i) => box(30, 60 + i * 52, 130, 44, `página ${i}`, { c: 'purple', fs: 15, id: 'p' + i })),
      txt(95, 340, 'espacio virtual', { b: true, fs: 15, c: 'purple' }),
      table(210, 70, 200, ['pág.', 'marco'], [['0', '3'], ['1', '—  (disco)'], ['2', '0'], ['3', '1'], ['4', '—']], { rh: 40, fs: 16, s: 1, hi: [{ r: 1, s: 3, c: 'red' }] }),
      txt(310, 330, 'tabla de páginas (MMU + TLB)', { b: true, fs: 14, c: 'gray', s: 1 }),
      ...Array.from({ length: 4 }, (_, i) => box(470, 70 + i * 60, 140, 48, `marco ${i}`, { c: 'blue', fs: 15, id: 'f' + i, s: 2 })),
      arr('p0', 'f3', { c: 'green', s: 2, bend: -20 }), arr('p2', 'f0', { c: 'green', s: 2, bend: 20 }),
      ico(705, 290, 'disk', { t: 'disco', c: 'gray', s: 3, id: 'd' }), txt(705, 230, 'PAGE FAULT', { b: true, fs: 17, c: 'red', s: 3 }),
      arr('d', 'f1', { c: 'red', s: 3 }),
      box(30, 380, 740, 55, 'Mucho page fault = swapping: el disco es ~1000 veces más lento · Segmentación: partes lógicas de tamaño variable', { c: 'red', fs: 15, s: 4 }),
    ], [
      'La **memoria virtual** le da a cada programa un espacio de direcciones más grande que la RAM, dividido en **páginas**.',
      'La **tabla de páginas** dice en qué **marco** físico está cada página. La traducción la hace la **MMU**, y la **TLB** guarda las traducciones recientes.',
      'La memoria física está dividida en marcos del mismo tamaño que las páginas.',
      'Si se pide una página que **no está** en memoria, ocurre un **page fault**: se desaloja una página y se trae la pedida desde el disco.',
      'Si pasa todo el tiempo, el sistema hace **swapping** y se vuelve lentísimo, porque el disco es unas mil veces más lento. La **segmentación**, en cambio, divide en partes lógicas de tamaño variable.',
    ]),
  ],
  r7: [
    scene([
      head('Ciclo de instrucción'),
      ...[['IF', 'búsqueda', 'blue'], ['ID', 'decodificación', 'purple'], ['OF', 'operandos', 'orange'], ['EX', 'ejecución', 'green']].map(([t, sub, c], i) => box(20 + i * 195, 60, 175, 90, t, { c, sub, fs: 26, id: 'k' + i, s: i })),
      ...[0, 1, 2].map((i) => arr('k' + i, 'k' + (i + 1), { s: i + 1 })),
      box(20, 175, 370, 120, 'IF: trae el código de operación apuntado por CS:IP · little-endian: byte MENOS significativo en la dirección más baja', { c: 'blue', fs: 14, s: 0 }),
      box(410, 175, 370, 120, 'ID microprogramada: un microprograma por instrucción · cada microtarea = 1 ciclo · cada bit activa una señal de control', { c: 'purple', fs: 14, s: 1 }),
      box(20, 315, 370, 115, 'OF: puede NO hacer falta (registros o inmediatos)', { c: 'orange', fs: 16, s: 2 }),
      box(410, 315, 370, 115, 'EX: ALU · UC cableada (RISC, rápida) vs microprogramada (CISC, flexible)', { c: 'green', fs: 15, s: 3 }),
    ], [
      'El ciclo de instrucción tiene cuatro etapas. **IF**, búsqueda: se trae de memoria el código de operación apuntado por **CS:IP**. En **little-endian**, el byte menos significativo está en la dirección más baja.',
      '**ID**, decodificación: en una unidad de control **microprogramada**, cada instrucción corresponde a un **microprograma**; cada microtarea lleva un ciclo de reloj, y cada uno o cero de la palabra de control **activa o desactiva** una señal.',
      '**OF**, búsqueda de operandos: trae los operandos de memoria, y **puede no hacer falta** si están en registros o son inmediatos.',
      '**EX**, ejecución, en la ALU. La unidad de control puede ser **cableada**, rápida y rígida, típica de RISC, o **microprogramada**, flexible, típica de CISC.',
    ]),
  ],
  r8: [
    scene([
      head('Pipeline de 4 etapas'),
      ...Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => box(140 + (r + c) * 80, 70 + r * 52, 76, 44, ['IF', 'ID', 'OF', 'EX'][c], { c: (['blue', 'purple', 'orange', 'green'] as const)[c], fs: 15, s: r === 0 ? 0 : 1 }))).flat(),
      ...Array.from({ length: 4 }, (_, r) => txt(100, 92 + r * 52, `I${r + 1}`, { b: true, fs: 17, s: r === 0 ? 0 : 1 })),
      txt(450, 300, 'k + n − 1 = 4 + 4 − 1 = 7 ciclos (vs 16 sin pipeline)', { b: true, fs: 17, c: 'yellow', s: 2 }),
      table(30, 330, 740, undefined, [['Riesgos: estructurales · de DATOS · de CONTROL (saltos)', 'Flynn: SISD · SIMD (GPU) · MISD · MIMD (multinúcleo)']], { rh: 50, fs: 14, s: 3 }),
      txt(400, 420, 'Superescalar: IPC > 1 · CISC vs RISC', { b: true, fs: 16, c: 'cyan', s: 4 }),
    ], [
      'Sin pipeline, cada instrucción recorre las cuatro etapas antes de empezar la siguiente.',
      'Con **pipeline**, mientras una instrucción se ejecuta, la siguiente busca operandos, la otra se decodifica… Se superponen como una línea de montaje.',
      'Con k etapas y n instrucciones tarda **k más n menos 1** ciclos: acá, 7 en lugar de 16.',
      'Los **riesgos**: estructurales, de **datos**, cuando una instrucción necesita el resultado de otra, y de **control**, por los saltos. La clasificación de **Flynn**: SISD, **SIMD** como las GPU, MISD y **MIMD** como los multinúcleo.',
      'Un procesador **superescalar** tiene varios pipelines y logra más de una instrucción por ciclo.',
    ]),
  ],
  r9: [
    scene([
      head('Buses'),
      ico(110, 200, 'cpu', { t: 'CPU', c: 'purple', size: 90, id: 'cpu' }),
      box(560, 140, 200, 120, 'Memoria / E/S', { c: 'blue', fs: 20, id: 'm' }),
      arr([170, 150], [555, 150], { c: 'green', two: true, t: 'DATOS' }),
      arr([170, 200], [555, 200], { c: 'orange', t: 'DIRECCIONES (n líneas → 2ⁿ posiciones)', s: 1 }),
      arr([170, 250], [555, 250], { c: 'pink', two: true, t: 'CONTROL (lectura, escritura, reloj, IRQ)', s: 2 }),
      box(30, 320, 360, 110, 'Síncrono (reloj común) o asíncrono (handshake)', { c: 'gray', fs: 16, s: 3 }),
      box(410, 320, 360, 110, 'PCI Express: serie, punto a punto, por carriles', { c: 'cyan', fs: 16, s: 3 }),
    ], [
      'La CPU se comunica por tres buses. El de **datos**, bidireccional.',
      'El de **direcciones**: con n líneas se pueden direccionar **2 a la n** posiciones.',
      'Y el de **control**: lectura, escritura, reloj e interrupciones.',
      'Pueden ser síncronos, con reloj común, o asíncronos, con handshake. **PCI Express** es serie, punto a punto, por carriles.',
    ]),
  ],
  r10: [
    scene([
      head('Entrada/salida: sondeo, interrupciones y DMA'),
      box(30, 60, 240, 130, 'Sondeo', { c: 'red', fs: 22, sub: 'la CPU pregunta todo el tiempo: desperdicia CPU' }),
      box(285, 60, 240, 130, 'Interrupciones', { c: 'orange', fs: 21, sub: 'el dispositivo AVISA (IRQ)', s: 1 }),
      box(540, 60, 240, 130, 'DMA', { c: 'green', fs: 22, sub: 'transfiere bloques a memoria sin la CPU', s: 2 }),
      seq(30, 210, 740, 225, [{ t: 'Programa', c: 'blue' }, { t: 'CPU', c: 'purple' }, { t: 'ISR', c: 'orange' }], [
        { a: 0, b: 1, t: 'IRQ: termina la instrucción actual', s: 3, c: 'orange' },
        { a: 1, b: 1, t: 'guarda banderas y CS:IP en la pila', s: 3, c: 'yellow' },
        { a: 1, b: 2, t: 'vector de interrupciones → ISR', s: 4, c: 'orange' },
        { a: 2, b: 0, t: 'IRET restaura y sigue', s: 4, c: 'green', dash: true },
      ], { fs: 15 }),
    ], [
      'Tres técnicas de entrada y salida. **Sondeo** o E/S programada: la CPU pregunta todo el tiempo si el dispositivo está listo, y desperdicia ciclos.',
      '**Interrupciones**: el dispositivo **avisa** con un pedido de interrupción, una IRQ.',
      '**DMA**: un controlador transfiere bloques directo a memoria, sin pasar por la CPU.',
      'Al atender una interrupción, la CPU termina la instrucción actual y **guarda el contexto**, banderas y CS:IP, en la pila.',
      'Busca la dirección de la rutina de servicio en el **vector de interrupciones**, la ejecuta, y con **IRET** restaura todo y sigue. La **NMI** no se puede enmascarar.',
    ]),
  ],
  r11: [
    scene([
      head('8086: segmento · 16 + desplazamiento'),
      bits(60, 80, 400, B('1000', 'blue').map((x, i) => ({ ...x, t: ['1', '0', '0', '0'][i] })), { h: 50, fs: 22, mono: true, title: 'segmento 1000h × 16 = 10000h' }),
      bits(60, 170, 400, [{ t: '0', c: 'orange' }, { t: '1', c: 'orange' }, { t: '2', c: 'orange' }, { t: '3', c: 'orange' }], { h: 50, fs: 22, mono: true, title: '+ desplazamiento 0123h', s: 1 }),
      bits(60, 260, 400, [{ t: '1', c: 'green' }, { t: '0', c: 'green' }, { t: '1', c: 'green' }, { t: '2', c: 'green' }, { t: '3', c: 'green' }], { h: 50, fs: 22, mono: true, title: '= dirección física 10123h (20 bits)', s: 2 }),
      table(500, 70, 280, ['Registros'], [['AX BX CX DX'], ['CS DS SS ES'], ['IP SP · banderas']], { rh: 40, fs: 16, mono: true }),
      table(500, 250, 280, ['DEBUG'], [['a ensamblar · r registros'], ['t paso a paso · g ejecutar'], ['d memoria · u desensamblar']], { rh: 40, fs: 14, s: 3 }),
      txt(260, 370, 'MOV · ADD · CMP · JZ · LOOP (usa CX) · INT', { b: true, fs: 17, c: 'cyan', s: 3 }),
    ], [
      'En el 8086, la dirección física se arma con el **segmento por 16 más el desplazamiento**. El segmento 1000 hexa, por 16, es 10000.',
      'Le sumamos el desplazamiento, 0123.',
      'Y da la dirección física de 20 bits: **10123** hexa.',
      'Los registros: generales AX, BX, CX y DX; de segmento CS, DS, SS y ES; IP, SP y banderas. En DEBUG: **a** ensambla, **r** muestra registros, **t** ejecuta paso a paso, **g** ejecuta, **d** muestra memoria y **u** desensambla. LOOP usa CX como contador.',
    ]),
  ],
  r12: [
    scene([
      head('Nuevas tecnologías'),
      box(30, 60, 360, 180, 'SoC', { c: 'blue', fs: 30, sub: 'CPU + GPU + memoria + controladores en UN chip (celulares, Apple M)' }),
      box(410, 60, 360, 180, 'GPU', { c: 'green', fs: 30, sub: 'miles de núcleos simples: paralelismo de datos (gráficos, IA)', s: 1 }),
      box(30, 270, 740, 150, 'Nube: cómputo como servicio', { c: 'purple', fs: 26, s: 2 }),
    ], [
      'Un **SoC**, sistema en un chip, integra CPU, GPU, memoria y controladores en un solo chip, como en los celulares o los procesadores Apple M.',
      'Una **GPU** tiene miles de núcleos simples pensados para el **paralelismo de datos**: gráficos e inteligencia artificial. Es el caso típico de SIMD.',
      'Y la **nube** ofrece el cómputo como un servicio.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'arq-e1': [
    scene([
      head('Final: overflow con y sin signo (4 bits)'),
      box(30, 60, 360, 150, 'Con signo: 1001 + 1101 = (1)0110 · −7 + (−3) = −10 fuera de −8…7 → OF = 1', { c: 'red', fs: 17 }),
      box(410, 60, 360, 150, 'Sin signo: 1111 + 0100 = (1)0011 · 15 + 4 = 19 > 15 → CF = 1', { c: 'yellow', fs: 17, s: 1 }),
      box(30, 240, 740, 90, 'Positivo + negativo nunca desborda: OF = 0', { c: 'green', fs: 22, s: 2 }),
    ], [
      'Con signo: menos 7 más menos 3 da menos 10, fuera del rango de menos 8 a 7. En binario dio 0110, positivo: **OF en 1**.',
      'Sin signo: 15 más 4 da 19, mayor que 15: sobra un bit y se prende **CF**.',
      'Y con signos distintos nunca hay overflow.',
    ]),
  ],
  'arq-e2': [
    scene([
      head('IEEE 754: −6,5'),
      ...['6,5 = 110,1₂ = 1,101 × 2²', 's = 1 · e = 129 = 10000001 · m = 1010…0', '1 10000001 10100000000000000000000', 'C0D00000h'].map((t, i) => box(60, 60 + i * 92, 680, 72, t, { c: (['white', 'orange', 'blue', 'green'] as const)[i], fs: i === 3 ? 32 : 19, s: i })),
    ], [
      'Pasamos a binario y normalizamos: 1,101 por 2 a la 2.',
      'Signo 1, exponente 2 más 127 igual a 129, mantisa 101 y ceros.',
      'Los 32 bits juntos.',
      'En hexadecimal: **C0D00000**.',
    ]),
  ],
  'arq-e3': [
    scene([
      head('Final 2023: el ciclo por etapas'),
      table(20, 60, 760, ['Etapa', 'Qué responder'], [['IF', 'busca el código de operación en CS:IP · little-endian'], ['ID', 'microprograma · 1 ciclo por microtarea · bits = señales'], ['OF', 'trae operandos · puede no ser necesaria'], ['EX', 'ALU: aritméticas, lógicas, desplazamientos']], { rh: 70, fs: 16, cw: [0.6, 4], rs: [0, 1, 2, 3] }),
    ], [
      'IF: se busca la instrucción apuntada por CS:IP, recordando little-endian.',
      'ID: cada instrucción es un microprograma; cada microtarea, un ciclo; cada bit, una señal de control.',
      'OF: trae los operandos de memoria y puede no ser necesaria.',
      'EX: la ALU ejecuta aritméticas, lógicas, desplazamientos y rotaciones.',
    ]),
  ],
};
