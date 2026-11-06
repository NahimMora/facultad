import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/arq';

/** Arq · final. Redacción propia sobre los apuntes de la cátedra (módulos 2 a 14) y finales 2022–2023 (Drive). */
const F = 'final 2023 (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'r1', module: 'u2', title: 'Sistemas numéricos y desbordes', points: [
    'Con signo en complemento a 2 y n bits: rango −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1. Sin signo: 0 … 2ⁿ − 1.',
    '**Overflow (sobreflujo)**: el resultado supera el **máximo** del rango representable. **Underflow (bajoflujo)**: el valor es tan chico que no se puede representar (la ALU lo aproxima a 0; se habla de números con coma).',
    'Con signo **siempre** hay overflow si dos números del mismo signo dan un resultado de signo contrario (negativo + negativo = positivo). **Nunca** hay overflow si los signos son distintos.',
    'Sin signo, el desborde lo marca el **carry** (CF): 1111 + 0100 → CF = 1 (15 + 4 = 19 > 15). Con signo lo marca **OF**: 1001 + 1101 (−7 + −3) → OF = 1.',
  ], trap: 'CF y OF son banderas distintas: CF es para sin signo, OF para con signo. Una suma puede prender una y no la otra.' },
  { id: 'r2', module: 'u3', title: 'Números reales y códigos', points: [
    '**IEEE 754 precisión simple** (32 bits): 1 bit de **signo**, 8 de **exponente sesgado** (sesgo 127) y 23 de **mantisa** (lo que sigue al "1," implícito). Valor = (−1)ˢ · 1,m · 2^(e − 127).',
    'Ejemplo: −6,5 = −110,1₂ = −1,101 · 2² → s = 1, e = 2 + 127 = 129 = 10000001, m = 1010…0 → **C0D00000h**.',
    '**BCD**: cada dígito decimal en 4 bits. **ASCII**: 7 bits (128 símbolos), extendido a 8. **Paridad**: un bit extra detecta errores de **un** bit (no de dos); agrega overhead (de 4 a 5 bits = 25 %).',
  ] },
  { id: 'r3', module: 'u4', title: 'El computador y la ALU', points: [
    '**Von Neumann**: CPU (unidad de control + ALU + registros), memoria **única** para datos e instrucciones, E/S y buses.',
    'Registros: **PC/IP** (dirección de la próxima instrucción), **IR** (instrucción actual), MAR (dirección), MBR (dato), acumulador, banderas.',
    'La **ALU** hace operaciones aritméticas, lógicas y de **desplazamiento/rotación**, y actualiza las banderas: Z (cero), S (signo), C (carry), O (overflow).',
  ] },
  { id: 'r4', module: 'u6', title: 'Memorias físicas', points: [
    '**SRAM**: celdas con flip-flops, **rápida** (~10 ns), cara, sin refresco → **caché**. **DRAM**: celda = capacitor que se descarga, necesita **refresco**, ~100 ns, barata → **memoria principal**.',
    '**DDR SDRAM**: duplica las transferencias por ciclo de reloj; DDR2…DDR5 bajan la tensión y suben la velocidad. **HBM**: pilas de DRAM con bus ancho (GPU).',
    'No volátiles: **ROM** (de fábrica), **PROM** (se programa una vez), **EPROM** (se borra con **luz UV**), **EEPROM** (se borra eléctricamente celda por celda), **Flash** (eléctrica, por bloques: USB, SSD).',
  ] },
  { id: 'r5', module: 'u7', title: 'Memoria caché', points: [
    'Funciona por **localidad de referencia**: **temporal** (lo usado se vuelve a usar pronto) y **espacial** (se usa lo que está al lado). "El 90 % del tiempo se ejecuta el 10 % del código".',
    '**Hit**: el dato está en caché. **Miss**: se trae el **bloque** completo desde la memoria principal. Lo coordina la **MMU**.',
    'Funciones de correspondencia: **directa** (cada bloque va a **un solo** renglón: renglón = bloque mod cantidad de renglones; simple, más conflictos) · **asociativa** (cualquier renglón; búsqueda por etiqueta, cara) · **asociativa por conjuntos de N vías** (compromiso: renglón fijo, vía libre).',
    'Reemplazo: **FIFO**, **LRU** (el menos usado recientemente), aleatorio.',
    'Escritura: **write-through** (escritura directa: caché y memoria a la vez, siempre sincronizadas, más lenta) · **write-back** (retrograbado: solo en caché; el bloque queda **sucio** y se copia al desalojarlo).',
    'Multinúcleo: **coherencia de caché** con protocolos inspectores (**snooping**: invalidan la línea en los otros núcleos) o con **directorio** (muchos nodos).',
  ], trap: 'Directa = un solo lugar posible; asociativa = cualquier lugar; N vías = un conjunto fijo con N lugares.' },
  { id: 'r6', module: 'u7', title: 'Memoria virtual', points: [
    'El sistema operativo da a cada programa un espacio de direcciones **virtual** más grande que la RAM, respaldado en **disco**.',
    '**Paginación**: memoria dividida en **páginas** (lógicas, ~4 KB) y **marcos** (físicos). La **tabla de páginas** traduce página → marco; la **MMU** hace la traducción y la **TLB** guarda las traducciones recientes.',
    '**Page fault**: la página no está en memoria principal → se desaloja una (FIFO, LRU…) y se trae del disco. Si pasa mucho (**swapping**), todo se vuelve lento (el disco es ~1000 veces más lento).',
    '**Segmentación**: divide por unidades lógicas (código, datos, pila) de tamaño variable.',
  ] },
  { id: 'r7', module: 't2', title: 'Unidad de control y ciclo de instrucción', points: [
    'Ciclo: **IF** (búsqueda) → **ID** (decodificación) → **OF** (búsqueda de operandos) → **EX** (ejecución).',
    '**IF**: se busca en memoria principal la **instrucción** (su código de operación) apuntada por el **IP/PC** (en el 8086, CS:IP). **Little-endian**: el byte **menos** significativo va en la dirección **más baja**.',
    '**ID** en UC **microprogramada**: cada instrucción corresponde a un **microprograma** en la memoria de control; cada microtarea lleva **un ciclo de reloj**; cada 1 o 0 de la palabra de control **activa o desactiva una señal de control**.',
    '**OF**: trae los operandos de memoria; **puede no hacer falta** si los operandos están en registros o son inmediatos. **EX**: aritméticas, lógicas y desplazamientos en la **ALU**.',
    'UC **cableada** (rápida, rígida: RISC), **microprogramada** (flexible: CISC) o híbrida.',
  ] },
  { id: 'r8', module: 't3', title: 'Paralelismo y procesadores', points: [
    '**Pipeline** de k etapas: n instrucciones tardan k + n − 1 ciclos (ideal: una por ciclo). **IPC**: instrucciones por ciclo.',
    'Riesgos: **estructurales** (recurso compartido), **de datos** (una instrucción necesita el resultado de otra) y **de control** (saltos). Soluciones: adelantamiento, burbujas, predicción de saltos.',
    '**Superescalar**: varias unidades/pipelines en paralelo (IPC > 1). **Superpipeline**: más etapas, más cortas. Ejecución fuera de orden con **ROB** (reorder buffer).',
    '**Flynn**: SISD, **SIMD** (una instrucción, muchos datos: vectoriales, GPU), MISD, **MIMD** (multinúcleo). **CISC** (instrucciones complejas) vs **RISC** (simples, de largo fijo, cableada). **SMP**: multiprocesador simétrico con memoria compartida.',
  ] },
  { id: 'r9', module: 't4', title: 'Buses', points: [
    'Tres buses: **datos**, **direcciones** (n líneas → 2ⁿ posiciones direccionables) y **control** (lectura, escritura, reloj, interrupciones).',
    'Síncronos (con reloj común) o asíncronos (handshake). Arbitraje centralizado o distribuido. **PCI Express**: serie, punto a punto, por carriles (lanes).',
  ] },
  { id: 'r10', module: 't5', title: 'Entrada/salida e interrupciones', points: [
    'Técnicas: **E/S programada o sondeo** (la CPU pregunta todo el tiempo: desperdicia CPU) · **interrupciones** (el dispositivo avisa) · **DMA** (un controlador transfiere bloques directo a memoria sin la CPU).',
    '**IRQ**: pedido de interrupción. **ISR**: rutina de servicio. **Vector de interrupciones**: tabla con las direcciones de las ISR. **NMI**: no enmascarable (errores graves).',
    'Al atender: termina la instrucción actual → guarda el contexto (banderas, CS:IP) en la pila → ejecuta la ISR → IRET restaura.',
  ] },
  { id: 'r11', module: 't6', title: 'Ensamblador 8086 (debug)', points: [
    'Registros generales AX, BX, CX, DX; de segmento CS, DS, SS, ES; IP, SP y banderas. Dirección física = **segmento · 16 + desplazamiento**.',
    'Instrucciones: MOV, ADD, SUB, INC, DEC, CMP, JMP, saltos condicionales (JZ, JNZ…), LOOP (usa CX), INT.',
    'DEBUG: **a** (ensamblar), **r** (registros), **t** (ejecutar paso a paso), **g** (ejecutar), **d** (ver memoria), **u** (desensamblar).',
  ] },
  { id: 'r12', module: 't7', title: 'Nuevas tecnologías', points: [
    '**SoC**: CPU, GPU, memoria y controladores en un solo chip (celulares, Apple M). **GPU**: miles de núcleos simples para paralelismo de datos (gráficos, IA). **Nube**: cómputo como servicio.',
  ] },
];

const q: Question[] = [
  { id: 'arq-01', module: 'u2', type: 'mcq', prompt: 'En una suma con signo, ¿cuándo hay overflow **seguro**?', options: ['Cuando dos números del mismo signo dan un resultado de signo opuesto', 'Siempre que hay carry', 'Cuando los signos son distintos', 'Cuando el resultado es cero'], answer: 0, explain: 'Negativo + negativo = positivo (o al revés) es imposible: el resultado salió del rango.', source: F },
  { id: 'arq-02', module: 'u2', type: 'mcq', prompt: '¿Cuándo **nunca** hay overflow en una suma con signo?', options: ['Cuando se suma un positivo y un negativo', 'Cuando los dos son negativos', 'Cuando hay carry', 'Nunca se puede asegurar'], answer: 0, explain: 'El resultado queda entre los dos operandos, siempre dentro del rango.', source: F },
  { id: 'arq-03', module: 'u2', type: 'mcq', prompt: '1111 + 0100 sin signo (4 bits):', options: ['Desborda: CF = 1 (15 + 4 = 19)', 'Da 0011 sin error', 'Prende OF', 'Da 19'], answer: 0, explain: 'Sin signo, el desborde lo marca el carry.', source: F },
  { id: 'arq-04', module: 'u2', type: 'mcq', prompt: 'Underflow (bajoflujo) es:', options: ['Un valor tan chico que no se puede representar', 'Superar el máximo del rango', 'Un carry negativo', 'Un error de paridad'], answer: 0, explain: 'Se da en coma flotante: la ALU lo aproxima a 0.', source: F },
  { id: 'arq-05', module: 'u3', type: 'mcq', prompt: 'En IEEE 754 de precisión simple, el sesgo del exponente es:', options: ['127', '128', '1023', '255'], answer: 0, explain: '2⁸⁻¹ − 1 = 127. (1023 es el de doble precisión).' },
  { id: 'arq-06', module: 'u3', type: 'mcq', prompt: '−6,5 en IEEE 754 simple es:', options: ['C0D00000h', '40D00000h', 'C0A00000h', 'C1500000h'], answer: 0, explain: '−1,101·2² → s = 1, e = 129 = 10000001, m = 101… → 1100 0000 1101 0000… = C0D00000h. (40D00000h sería +6,5).' },
  { id: 'arq-07', module: 'u3', type: 'tf', prompt: 'Un bit de paridad detecta errores de dos bits.', answer: false, explain: 'Si cambian dos bits, la paridad se mantiene: solo detecta errores de **un** bit.' },
  { id: 'arq-08', module: 'u4', type: 'mcq', prompt: 'En la arquitectura de Von Neumann:', options: ['Datos e instrucciones comparten la misma memoria', 'Hay una memoria para datos y otra para instrucciones', 'No hay unidad de control', 'La ALU guarda el programa'], answer: 0, explain: 'Memorias separadas es la arquitectura Harvard.' },
  { id: 'arq-09', module: 'u6', type: 'mcq', prompt: '¿Qué memoria necesita refresco y se usa como memoria principal?', options: ['DRAM', 'SRAM', 'EEPROM', 'Flash'], answer: 0, explain: 'La celda DRAM es un capacitor que se descarga. La SRAM (flip-flops) se usa para caché.' },
  { id: 'arq-10', module: 'u6', type: 'mcq', prompt: 'La EPROM se borra con:', options: ['Luz ultravioleta', 'Un pulso eléctrico celda por celda', 'No se puede borrar', 'Por bloques eléctricamente'], answer: 0, explain: 'EEPROM: eléctrica celda por celda · Flash: eléctrica por bloques.' },
  { id: 'arq-11', module: 'u7', type: 'mcq', prompt: 'La caché funciona gracias a:', options: ['La localidad de referencia temporal y espacial', 'El refresco de la DRAM', 'La paginación', 'El DMA'], answer: 0, explain: 'Lo que se usó se vuelve a usar (temporal) y se usa lo cercano (espacial).' },
  { id: 'arq-12', module: 'u7', type: 'mcq', prompt: 'En correspondencia **directa**, un bloque de memoria principal:', options: ['Solo puede ir a un renglón determinado de la caché', 'Puede ir a cualquier renglón', 'Va a cualquier vía de un conjunto', 'No se copia'], answer: 0, explain: 'Renglón = bloque mod cantidad de renglones. Asociativa = cualquiera; N vías = cualquier vía del conjunto.' },
  { id: 'arq-13', module: 'u7', type: 'mcq', prompt: 'Con **write-back**, al escribir un dato que está en caché:', options: ['Se escribe solo en caché y el bloque queda marcado como sucio', 'Se escribe en caché y en memoria a la vez', 'Se escribe solo en memoria', 'Se invalida la caché'], answer: 0, explain: 'Se copia a memoria recién al desalojar el bloque. Escribir en los dos lados a la vez es write-through.' },
  { id: 'arq-14', module: 'u7', type: 'mcq', prompt: 'LRU desaloja:', options: ['El bloque menos usado recientemente', 'El primero que entró', 'Uno al azar', 'El más usado'], answer: 0, explain: 'El primero que entró es FIFO.' },
  { id: 'arq-15', module: 'u7', type: 'mcq', prompt: 'La TLB guarda:', options: ['Traducciones recientes de página virtual a marco físico', 'Bloques de datos', 'El vector de interrupciones', 'Microinstrucciones'], answer: 0, explain: 'Es una caché de la tabla de páginas que usa la MMU.' },
  { id: 'arq-16', module: 'u7', type: 'mcq', prompt: 'Un page fault ocurre cuando:', options: ['La página pedida no está en memoria principal y hay que traerla del disco', 'Hay un miss de caché', 'Se llena la TLB', 'Hay overflow'], answer: 0, explain: 'Se desaloja una página (FIFO, LRU…) y se trae la nueva desde el disco.' },
  { id: 'arq-17', module: 't2', type: 'mcq', prompt: 'Que el 8086 sea little-endian significa que:', options: ['El byte menos significativo se guarda en la dirección más baja', 'El byte más significativo va primero', 'Solo usa 8 bits', 'Lee de derecha a izquierda las instrucciones'], answer: 0, explain: 'Ej.: 1234h se guarda como 34h, 12h.', source: F },
  { id: 'arq-18', module: 't2', type: 'mcq', prompt: 'En la etapa de búsqueda (IF), ¿dónde está el puntero a la instrucción?', options: ['En el IP/PC (CS:IP en el 8086)', 'En el acumulador', 'En la memoria de control', 'En el MBR'], answer: 0, explain: 'El contador de programa apunta a la próxima instrucción.', source: F },
  { id: 'arq-19', module: 't2', type: 'mcq', prompt: 'En una UC microprogramada, cada 1 o 0 de la memoria de control corresponde a:', options: ['Una señal de control que se activa o desactiva', 'Un dato del programa', 'Una dirección de memoria principal', 'Un registro'], answer: 0, explain: 'Cada instrucción = un microprograma; cada microtarea, un ciclo de reloj.', source: F },
  { id: 'arq-20', module: 't2', type: 'tf', prompt: 'La etapa de búsqueda de operandos (OF) siempre es necesaria.', answer: false, explain: 'No hace falta si los operandos están en registros, son inmediatos o la instrucción no tiene operandos.', source: F },
  { id: 'arq-21', module: 't2', type: 'mcq', prompt: 'Las instrucciones de desplazamiento y rotación se ejecutan en:', options: ['La ALU', 'La unidad de control', 'La memoria caché', 'El bus de datos'], answer: 0, explain: 'La ALU hace aritmética, lógica y desplazamientos.', source: F },
  { id: 'arq-22', module: 't3', type: 'mcq', prompt: 'Un pipeline de 5 etapas ejecuta 10 instrucciones (ideal) en:', options: ['14 ciclos', '50 ciclos', '10 ciclos', '15 ciclos'], answer: 0, explain: 'k + n − 1 = 5 + 10 − 1 = 14.' },
  { id: 'arq-23', module: 't3', type: 'mcq', prompt: 'Una instrucción necesita el resultado de la anterior que todavía no terminó. Es un riesgo:', options: ['De datos', 'Estructural', 'De control', 'De memoria'], answer: 0, explain: 'Los de control vienen de los saltos; los estructurales, de recursos compartidos.' },
  { id: 'arq-24', module: 't3', type: 'mcq', prompt: 'Una GPU es principalmente una arquitectura:', options: ['SIMD', 'SISD', 'MISD', 'Von Neumann pura'], answer: 0, explain: 'Una instrucción aplicada a muchos datos. Los multinúcleo son MIMD.' },
  { id: 'arq-25', module: 't3', type: 'mcq', prompt: 'Un procesador superescalar:', options: ['Tiene varias unidades en paralelo y puede lograr IPC > 1', 'Solo tiene más etapas de pipeline', 'No usa pipeline', 'Es siempre CISC'], answer: 0, explain: 'Más etapas más cortas es superpipeline.' },
  { id: 'arq-26', module: 't4', type: 'mcq', prompt: 'Un bus de direcciones de 20 líneas (8086) direcciona:', options: ['1 MB (2²⁰ posiciones)', '20 bytes', '64 KB', '4 GB'], answer: 0, explain: 'n líneas direccionan 2ⁿ posiciones: 2²⁰ = 1.048.576 bytes = 1 MB.' },
  { id: 'arq-27', module: 't5', type: 'mcq', prompt: 'El DMA:', options: ['Transfiere bloques entre un dispositivo y la memoria sin usar la CPU', 'Es una interrupción no enmascarable', 'Es la CPU preguntando al dispositivo', 'Es un tipo de caché'], answer: 0, explain: 'Sondeo = la CPU pregunta; interrupción = el dispositivo avisa.' },
  { id: 'arq-28', module: 't5', type: 'mcq', prompt: 'NMI es:', options: ['Una interrupción no enmascarable', 'Una rutina de servicio', 'Un registro', 'Un modo de direccionamiento'], answer: 0, explain: 'No se puede deshabilitar: errores graves de hardware.' },
  { id: 'arq-29', module: 't6', type: 'mcq', prompt: 'En el 8086, la dirección física de CS = 1000h, IP = 0020h es:', options: ['10020h', '1020h', '11000h', '01020h'], answer: 0, explain: 'Segmento · 16 + desplazamiento = 10000h + 20h.' },
  { id: 'arq-30', module: 't6', type: 'mcq', prompt: 'En DEBUG, el comando para ejecutar paso a paso es:', options: ['t', 'g', 'd', 'a'], answer: 0, explain: 't (trace) · g (go) · d (dump) · a (assemble) · r (registros) · u (desensamblar).' },
  { id: 'arq-31', module: 't7', type: 'mcq', prompt: 'Un SoC (system on a chip) es:', options: ['Un chip que integra CPU, GPU, memoria y controladores', 'Un servidor en la nube', 'Un tipo de bus', 'Una memoria flash'], answer: 0, explain: 'Integra casi todo el sistema en un solo chip: celulares, Apple M. Reduce consumo y latencia.' },
];

const ex: WorkedExercise[] = [
  { id: 'arq-e1', module: 'u2', title: 'Final · overflow con y sin signo (4 bits)', statement: 'Dar un ejemplo de 4 bits con sobreflujo con signo y otro sin signo.', steps: [
    { title: 'Con signo', body: '1001 + 1101 = (1)0110 → −7 + (−3) = −10, fuera de −8 … 7. Dos negativos dieron positivo → **OF = 1**.' },
    { title: 'Sin signo', body: '1111 + 0100 = (1)0011 → 15 + 4 = 19 > 15 → **CF = 1**.' },
    { title: 'Nunca', body: 'Positivo + negativo nunca desborda: OF = 0.' },
  ] },
  { id: 'arq-e2', module: 'u3', title: 'IEEE 754: −6,5 en precisión simple', statement: 'Representar −6,5 en IEEE 754 de 32 bits.', steps: [
    { title: 'Binario', body: '6,5 = 110,1₂ = 1,101 · 2².' },
    { title: 'Campos', body: 's = 1 · e = 2 + 127 = 129 = 10000001 · m = 1010 0000 … (23 bits).' },
    { title: 'Hexa', body: '1 10000001 10100000000000000000000 = **C0D00000h**.' },
  ] },
  { id: 'arq-e3', module: 't2', title: 'Final · ciclo de instrucción', statement: 'Responder por etapa del ciclo de instrucción (como en el final 2023).', steps: [
    { title: 'IF', body: 'Se busca en memoria principal la instrucción (código de operación) apuntada por CS:IP. Little-endian: byte menos significativo en la dirección más baja.' },
    { title: 'ID', body: 'Cada instrucción corresponde a un microprograma en la memoria de control; cada microtarea lleva un ciclo de reloj; cada 1/0 activa o desactiva una señal de control.' },
    { title: 'OF', body: 'Trae los operandos de memoria; puede no ser necesaria (registros, inmediatos o sin operandos).' },
    { title: 'EX', body: 'Aritméticas, lógicas, desplazamientos y rotaciones: en la ALU.' },
  ] },
];

const content: SubjectContent = {
  subjectId: 'arq', theory, questions: q, exercises: ex, videos: VIDEOS,
  cheatsheet: [
    { t: 'Desbordes', d: 'OF con signo: mismo signo → signo opuesto · nunca con signos distintos · CF sin signo · underflow: demasiado chico.' },
    { t: 'IEEE 754 simple', d: '1 + 8 + 23 bits · sesgo 127 · valor (−1)ˢ·1,m·2^(e−127) · −6,5 = C0D00000h.' },
    { t: 'Memorias', d: 'SRAM caché (rápida) · DRAM principal (refresco) · EPROM UV · EEPROM eléctrica por celda · Flash por bloques.' },
    { t: 'Caché', d: 'localidad temporal/espacial · directa (un renglón) · asociativa (cualquiera) · N vías · LRU/FIFO · write-through vs write-back (bloque sucio).' },
    { t: 'Memoria virtual', d: 'páginas y marcos · tabla de páginas · MMU · TLB · page fault → disco · swapping lento.' },
    { t: 'Ciclo', d: 'IF (CS:IP, little-endian) → ID (microprograma, 1 ciclo por microtarea) → OF (puede omitirse) → EX (ALU).' },
    { t: 'Paralelismo', d: 'pipeline k + n − 1 · riesgos estructurales, de datos, de control · superescalar IPC > 1 · Flynn: SIMD GPU, MIMD multinúcleo.' },
    { t: 'E/S', d: 'sondeo · interrupciones (IRQ → ISR vía vector; NMI) · DMA sin CPU · física = segmento·16 + offset.' },
  ],
};

export default content;
