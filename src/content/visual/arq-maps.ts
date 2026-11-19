/**
 * Arquitectura de Computadores · mapas y preguntas de oral del 2º parcial (temas 8 a 14 de la cátedra).
 * Redacción propia sobre los apuntes de Blackboard (Unidad de control, Paralelismo, Buses, E/S, Interrupciones,
 * Ensamblador y Nuevas tecnologías). Las respuestas de oral son modelos breves para decir en voz alta.
 */
import type { ConceptMap } from '../types';

export const ARQ_MAPS: ConceptMap[] = [
  {
    module: 't2', root: 'Unidad de control y ciclo de instrucción',
    branches: [
      { t: 'Ciclo de instrucción', d: 'lo que la CPU repite para cada instrucción', topic: 'r7', kids: [
        { t: 'IF · búsqueda', d: 'trae de memoria la instrucción apuntada por el PC/IP (en el 8086, CS:IP). Little-endian: el byte menos significativo en la dirección más baja' },
        { t: 'ID · decodificación', d: 'la UC interpreta el código de operación (COP) y genera las señales de control' },
        { t: 'OF · búsqueda de operandos', d: 'trae los operandos; no hace falta si están en registros o son inmediatos' },
        { t: 'EX · ejecución', d: 'la ALU hace la operación aritmética, lógica o de desplazamiento' },
      ] },
      { t: 'Tipos de unidad de control', topic: 'r7', kids: [
        { t: 'Cableada', d: 'circuitos lógicos fijos generan las señales: **más rápida**, pero rígida. Típica de RISC' },
        { t: 'Microprogramada', d: 'cada COP dispara un **microprograma** (microinstrucciones en la memoria de control). Más **flexible**, más lenta. Típica de CISC (el 80386 era microprogramado)' },
        { t: 'Híbrida', d: 'Intel y AMD actuales combinan las dos' },
      ] },
      { t: 'Modos de direccionamiento', d: 'dónde está el operando', topic: 'r7', kids: [
        { t: 'Inmediato · por registro · directo', d: 'el dato viene en la instrucción · está en un registro · la instrucción trae la dirección de memoria' },
        { t: 'Indirecto · indirecto de registro · indexado', d: 'la instrucción apunta a una dirección que contiene la dirección · un registro contiene la dirección · base + registro índice' },
      ] },
    ],
    oral: [
      { q: '¿Qué pasa en cada etapa del ciclo de instrucción?', a: 'En **IF** la CPU busca en memoria la instrucción que apunta el contador de programa. En **ID** la unidad de control decodifica el código de operación y prepara las señales. En **OF** busca los operandos, si están en memoria. En **EX** la ALU ejecuta la operación. Después el PC avanza y el ciclo se repite.' },
      { q: '¿Cuál es la diferencia entre una UC cableada y una microprogramada?', a: 'La **cableada** genera las señales de control con circuitos lógicos fijos: es más rápida pero no se puede modificar, por eso se usa en RISC. La **microprogramada** guarda un microprograma por instrucción en una memoria de control: es más flexible y facilita instrucciones complejas, típica de CISC. Los procesadores actuales son **híbridos**.' },
      { q: '¿Cuándo no hace falta la etapa OF?', a: 'Cuando el operando ya está en un **registro** o viene **en la propia instrucción** (direccionamiento inmediato): no hay que ir a memoria a buscarlo.' },
      { q: 'Explicá el direccionamiento indirecto.', a: 'La instrucción no trae el dato ni su dirección final: trae una dirección donde está **guardada la dirección** del dato. Hacen falta dos accesos a memoria. En el indirecto de registro, esa dirección está en un registro.' },
    ],
  },
  {
    module: 't3', root: 'Paralelismo y procesadores de alta prestación',
    branches: [
      { t: 'Pipeline (segmentación)', d: 'superpone etapas de instrucciones distintas: con k etapas, n instrucciones tardan k + n − 1 ciclos', topic: 'r8', kids: [
        { rel: 'lo frenan los', t: 'Riesgos', d: '**estructurales** (dos instrucciones quieren el mismo recurso) · **de datos** (una necesita el resultado de otra) · **de control** (saltos)' },
        { rel: 'soluciones', t: 'Adelantamiento · burbujas · predicción de saltos' },
      ] },
      { t: 'Más paralelismo', topic: 'r8', kids: [
        { t: 'Superescalar', d: 'varias unidades de ejecución: **más de una instrucción por ciclo** (IPC > 1)' },
        { t: 'Superpipeline', d: 'pipeline más profundo: etapas más cortas, reloj más rápido' },
        { t: 'Front end / back end', d: 'el front end decodifica (en x86, cada instrucción CISC en 1 a 4 micro-ops); el back end ejecuta **fuera de orden**, y el **ROB** retira los resultados en orden' },
      ] },
      { t: 'Clasificaciones', topic: 'r8', kids: [
        { t: 'Flynn', d: 'SISD · **SIMD** (una instrucción, muchos datos: unidades vectoriales, GPU) · MISD · **MIMD** (multinúcleo)' },
        { t: 'CISC vs RISC', d: 'CISC: instrucciones complejas y de longitud variable (x86) · RISC: simples, de longitud fija, UC cableada (ARM)' },
        { t: 'Multiprocesadores', d: '**SMP**: procesadores iguales con memoria compartida · **NUMA**: acceso a memoria no uniforme. Chiplets / MCM: varios chips en un encapsulado' },
      ] },
    ],
    oral: [
      { q: '¿Qué es el pipeline y qué lo limita?', a: 'Es dividir la ejecución en etapas y superponerlas, como una línea de montaje: mientras una instrucción se ejecuta, la siguiente se decodifica y otra se busca. Lo limitan los **riesgos**: estructurales, de datos y de control. Se resuelven con adelantamiento de resultados, burbujas o predicción de saltos.' },
      { q: 'Diferencia entre superescalar y superpipeline.', a: '**Superescalar** agrega unidades de ejecución en paralelo para terminar más de una instrucción por ciclo. **Superpipeline** hace el pipeline más profundo, con etapas más cortas, para subir la frecuencia.' },
      { q: '¿Para qué sirve el ROB?', a: 'El back end ejecuta las micro-ops **fuera de orden** para no esperar. El **buffer de reordenamiento** las recibe en orden y retira los resultados también **en orden**, para que el programa vea el mismo efecto que si se hubiera ejecutado secuencialmente.' },
      { q: 'Explicá la taxonomía de Flynn.', a: 'Clasifica según flujos de instrucciones y de datos: **SISD** (un procesador clásico), **SIMD** (una instrucción sobre muchos datos, como las unidades vectoriales y las GPU), **MISD** (casi no se usa) y **MIMD** (varios núcleos con sus propias instrucciones y datos).' },
    ],
  },
  {
    module: 't4', root: 'Buses',
    branches: [
      { t: 'Bus de sistema', d: 'líneas compartidas que conectan CPU, memoria y E/S', topic: 'r9', kids: [
        { t: 'Datos · direcciones · control', d: 'datos: lo que viaja · direcciones: a dónde (n líneas → 2ⁿ posiciones; también direccionan puertos de E/S) · control: lectura, escritura, reloj, interrupciones' },
      ] },
      { t: 'Características', topic: 'r9', kids: [
        { t: 'Paralelo vs serial', d: 'los actuales son seriales y punto a punto (PCIe, USB, SATA)' },
        { t: 'Ancho de bus vs ancho de banda', d: 'cantidad de líneas · datos transmitidos por unidad de tiempo' },
        { t: 'Síncrono vs asíncrono', d: 'reloj común · protocolo de handshake' },
        { t: 'Arbitraje', d: '**centralizado** (un árbitro) o **distribuido** (cada módulo tiene lógica de acceso). La interconexión **punto a punto** elimina el arbitraje' },
      ] },
      { t: 'Jerarquía de interconexión', d: 'como la jerarquía de memoria: lo más rápido cerca de la CPU', topic: 'r9', kids: [
        { t: 'CPU → memoria (controlador integrado) → PCIe → chipset → buses lentos (USB, SATA, red)', d: 'el chipset hace de puente hacia los dispositivos más lentos' },
      ] },
    ],
    oral: [
      { q: '¿Qué tipos de líneas tiene un bus y qué hace cada una?', a: 'Líneas de **datos**, por donde viaja la información; de **direcciones**, que indican la posición de memoria o el puerto de E/S (con n líneas se direccionan 2ⁿ posiciones), y de **control**, que coordinan lectura, escritura, reloj e interrupciones.' },
      { q: '¿Qué diferencia hay entre ancho de bus y ancho de banda?', a: 'El **ancho de bus** es la cantidad de líneas en paralelo. El **ancho de banda** es cuántos datos transmite por unidad de tiempo; depende del ancho y de la velocidad de transferencia.' },
      { q: '¿Por qué hoy se usan buses seriales punto a punto?', a: 'Porque a altas frecuencias las líneas paralelas se interfieren y se desincronizan. Un enlace serial punto a punto como **PCIe** alcanza más ancho de banda, se escala por carriles y **elimina el arbitraje**, porque el enlace no se comparte.' },
      { q: '¿Qué es el arbitraje del bus?', a: 'Decidir quién usa el bus cuando varios módulos lo quieren a la vez. Puede ser **centralizado**, con un árbitro, o **distribuido**, donde cada módulo tiene su lógica de control de acceso.' },
    ],
  },
  {
    module: 't5', root: 'Entrada/salida e interrupciones',
    branches: [
      { t: 'Técnicas de E/S', topic: 'r10', kids: [
        { t: 'Programada (sondeo)', d: 'la CPU pregunta una y otra vez si el dispositivo está listo: desperdicia CPU' },
        { t: 'Por interrupciones', d: 'el dispositivo avisa cuando está listo; la CPU hace otra cosa mientras' },
        { t: 'DMA', d: 'un controlador (motor DMA) transfiere bloques directo a memoria; la CPU solo lo configura y recibe una interrupción al terminar. Puede tomar el bus cuando la CPU no lo usa o forzarla a cederlo. **Bus mastering**: dispositivos que controlan el bus' },
      ] },
      { t: 'Interrupciones', topic: 'r10', kids: [
        { t: 'IRQ → ISR', d: 'pedido de interrupción → rutina de servicio (el "controlador" del dispositivo)' },
        { t: 'Vector de interrupciones (IVT)', d: '256 entradas de 32 bits en memoria con la dirección de cada ISR' },
        { t: 'Enmascarables vs NMI', d: 'el bit **IF** de banderas decide: 1 = se atienden, 0 = se ignoran. La **NMI** no se puede ignorar (errores graves)' },
        { t: 'Prioridades', d: 'PIC 8259A: IR0 la mayor, IR7 la menor. Hoy: APIC/LAPIC y mensajes MSI por PCIe. Las de software (INT) no respetan prioridades' },
        { rel: 'al atender una', t: 'Secuencia', d: 'termina la instrucción actual → guarda banderas y CS:IP en la pila → deshabilita las enmascarables → ejecuta la ISR → IRET restaura' },
      ] },
    ],
    oral: [
      { q: 'Compará sondeo, interrupciones y DMA.', a: 'Con **sondeo** la CPU consulta constantemente al dispositivo y pierde tiempo. Con **interrupciones** el dispositivo avisa y la CPU solo interviene cuando hace falta. Con **DMA** un controlador mueve bloques enteros entre el dispositivo y la memoria sin pasar por la CPU, que solo lo configura y recibe una interrupción al final. Es lo mejor para grandes volúmenes.' },
      { q: '¿Qué hace la CPU cuando llega una interrupción enmascarable?', a: 'Si el bit **IF** está en 1, termina la instrucción en curso, guarda las banderas y CS:IP en la pila, deshabilita las enmascarables, busca en el **vector de interrupciones** la dirección de la ISR y la ejecuta. Al final, **IRET** restaura lo guardado y sigue el programa.' },
      { q: '¿Qué es el vector de interrupciones?', a: 'Una tabla en memoria principal con **256 entradas**: cada una guarda la dirección de la rutina de servicio de un tipo de interrupción. El número de interrupción indica qué entrada usar.' },
      { q: '¿Qué diferencia hay entre una interrupción enmascarable y una NMI?', a: 'La **enmascarable** puede ignorarse poniendo el bit IF en 0. La **NMI** (no enmascarable) siempre se atiende; se usa para eventos críticos como errores de hardware.' },
    ],
  },
  {
    module: 't6', root: 'Lenguaje ensamblador (8086 y DEBUG)',
    branches: [
      { t: 'Registros del 8086', topic: 'r11', kids: [
        { t: 'Generales AX, BX, CX, DX', d: 'CX se usa como contador en LOOP' },
        { t: 'Segmento CS, DS, SS, ES · IP, SP, banderas', d: 'dirección física = **segmento × 16 + desplazamiento**' },
      ] },
      { t: 'Instrucciones', topic: 'r11', kids: [
        { t: 'MOV · ADD · SUB · INC · DEC · CMP', d: 'mover datos, aritmética y comparar (actualiza banderas)' },
        { t: 'JMP · JZ / JNZ · LOOP · INT', d: 'saltos incondicionales y condicionales según banderas, bucle con CX, llamada a interrupción' },
        { t: 'x86 es CISC', d: 'instrucciones de longitud variable' },
      ] },
      { t: 'Comandos de DEBUG', topic: 'r11', kids: [
        { t: 'a · r · t · g · d · u', d: 'ensamblar · ver registros · paso a paso · ejecutar · volcar memoria · desensamblar' },
      ] },
    ],
    oral: [
      { q: '¿Cómo se calcula la dirección física en el 8086?', a: 'Se multiplica el registro de **segmento por 16** (se le agrega un 0 en hexadecimal) y se le suma el **desplazamiento**. Por ejemplo, CS = 1000h e IP = 0020h dan 10020h.' },
      { q: '¿Cómo funciona LOOP?', a: 'Decrementa **CX** y, si no llegó a cero, salta a la etiqueta. Por eso antes del bucle se carga en CX la cantidad de repeticiones.' },
      { q: '¿Para qué sirve CMP si no guarda el resultado?', a: 'Resta los operandos solo para **actualizar las banderas** (cero, signo, acarreo). Después un salto condicional, como JZ o JNZ, decide según esas banderas.' },
    ],
  },
  {
    module: 't7', root: 'Nuevas tecnologías',
    branches: [
      { t: 'SoC (System on a Chip)', d: 'CPU, GPU, memoria y controladores en un solo chip: menos área y menos consumo', topic: 'r12', kids: [
        { t: 'Ejemplos', d: 'Apple A13 (iPhone 11, CPU ARM big.LITTLE de 6 núcleos), Apple M1/M2/M3, Raspberry Pi, consolas, sistemas embebidos y edge' },
        { t: 'big.LITTLE', d: 'núcleos potentes (fuera de orden) + núcleos eficientes (en orden) para ahorrar energía' },
      ] },
      { t: 'GPU', d: 'miles de núcleos simples para paralelismo de datos (SIMD): gráficos e IA', topic: 'r12' },
      { t: 'Computación en la nube', d: 'servidores y recursos como servicio (AWS, Azure, Google): se paga por uso y se escala sin comprar hardware', topic: 'r12' },
    ],
    oral: [
      { q: '¿Qué es un SoC y qué ventaja tiene?', a: 'Un **sistema en un chip**: integra CPU, GPU, memoria y controladores en un solo circuito. Ocupa poco espacio, las distancias son cortas y **consume menos energía**, por eso se usa en celulares, notebooks como las Apple M y sistemas embebidos.' },
      { q: '¿Qué es big.LITTLE?', a: 'Una organización con dos tipos de núcleo: unos **potentes**, para tareas pesadas, y otros **eficientes**, para tareas livianas. El sistema usa unos u otros según la carga, para ahorrar batería.' },
      { q: '¿Por qué la GPU sirve para IA?', a: 'Porque tiene miles de núcleos simples que aplican la **misma operación a muchos datos a la vez** (SIMD), y el entrenamiento de redes son justamente muchas operaciones iguales sobre matrices.' },
    ],
  },
];
