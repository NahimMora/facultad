import type { WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, bits, box, head, line, scene, seq, table, txt } from './h';

export const IEEE_FINAL_HEX = 'C38B0666';
export const FINAL_SCENES: Record<string, VisScene[]> = {
  'arq-final-e1': [scene([
    head('1 · Interrupción enmascarable'),
    seq(15, 70, 610, 390, [{ t: 'Dispositivo', c: 'blue' }, { t: 'CPU', c: 'orange' }, { t: 'Memoria', c: 'green' }], [
      { a: 0, b: 1, t: 'Solicitar interrupción', s: 0 },
      { a: 1, b: 2, t: 'Guardar contexto', s: 1 },
      { a: 1, b: 2, t: 'Obtener entrada de ISR', s: 2 },
      { a: 2, b: 1, t: 'Restaurar al retornar', s: 3, dash: true },
    ], { fs: 25, partFs: 24 }),
    box(20, 510, 600, 80, '8086: IF habilita aceptar INTR\nIRET recupera el contexto de retorno', { s: 3, fs: 25, c: 'purple' }),
  ], [
    'Una interrupción enmascarable puede posponer su aceptación según la habilitación de la CPU. En el modelo 8086, el indicador IF participa de esa condición para INTR. La solicitud no equivale a saltar inmediatamente en cualquier instante interno.',
    'Al aceptar la interrupción se conserva el contexto necesario para volver. En el modelo 8086 se guardan FLAGS, CS e IP en la pila. No se trata de reiniciar el programa desde su primera instrucción.',
    'La información de vector permite localizar la rutina de servicio y transferir el control. La rutina atiende el evento y preserva los registros adicionales que necesita según el acuerdo de uso del sistema.',
    'El retorno mediante IRET recupera el contexto correspondiente y permite continuar. Distinguí solicitar, aceptar, guardar estado, atender y volver. Enmascarable describe el control de aceptación, no que el periférico deje de existir ni que toda petición se descarte definitivamente.',
  ], 640, 620)],
  'arq-final-e2': [
    scene([
      head('2 · Una celda estática de un bit'),
      box(160, 75, 320, 90, 'Estado conservado: 0 o 1', { id: 'bit', fs: 28, c: 'blue' }),
      box(20, 295, 260, 80, 'Escribir: cambiar estado', { id: 'write', s: 1, fs: 26, c: 'orange' }),
      box(360, 295, 260, 80, 'Leer: obtener el estado', { id: 'read', s: 1, fs: 26, c: 'green' }),
      arr('write', 'bit', { s: 1 }), arr('bit', 'read', { s: 1 }),
      box(20, 475, 600, 80, 'Retención mientras haya alimentación\nSin refresco periódico de DRAM', { s: 2, fs: 25, c: 'purple' }),
    ], ['Una celda estática conserva uno de dos estados mientras se mantenga alimentada. El concepto se basa en un circuito biestable; no necesitás suponer que toda celda SRAM sea un flip-flop de reloj con las mismas entradas que un esquema didáctico.', 'La escritura fija el estado y la lectura obtiene su valor mediante los mecanismos de acceso de la memoria. Conservar un bit no es lo mismo que volver a escribirlo continuamente desde la CPU.', 'La memoria estática es volátil, pero no requiere el refresco periódico propio de DRAM. No confundas retener mientras hay alimentación con conservar datos después de apagar: esa segunda propiedad corresponde a memorias no volátiles.'], 640, 590),
    scene([
      head('2 · PROM, EPROM y EEPROM'),
      table(20, 70, 600, ['Tipo', 'Programación', 'Borrado'], [['PROM', 'Una vez', 'Sin borrado normal'], ['EPROM', 'Reprogramable', 'Luz UV'], ['EEPROM', 'Reprogramable', 'Eléctrico']], { fs: 25, rh: 90, cw: [0.8, 1.4, 1.8], rs: [0, 1, 1] }),
    ], ['PROM se programa una vez y conserva la información sin alimentación. El término programable no significa que admita ciclos normales de borrado y reescritura como una memoria de trabajo.', 'EPROM admite borrado por luz ultravioleta y posterior programación. EEPROM utiliza borrado eléctrico. Conservá esa diferencia al comparar tecnologías; no atribuyas a EPROM el mecanismo eléctrico de EEPROM o Flash.'], 640, 465),
  ],
  'arq-final-e3': [scene([
    head('3 · Punto fijo: la política importa'),
    box(20, 65, 600, 85, 'A = 17,89 · B = 21,2\n8 bits con signo · 2 fraccionarios', { fs: 28 }),
    table(20, 205, 600, ['Operando', 'Truncar', 'Más cercano'], [
      ['A', '01000111', '01001000'], ['B', '01010100', '01010101'], ['−B', '10101100', '10101011'], ['Z = A−B', '11110011', '11110011'],
    ], { fs: 25, rh: 65, cw: [1.1, 1.45, 1.45], rs: [1, 1, 2, 2] }),
    box(20, 600, 600, 80, '11110011₂ = −13 → −13/4 = −3,25', { s: 3, fs: 27, c: 'green' }),
    box(20, 725, 600, 90, 'Exacto decimal: −3,31\nEl modelo no indica la política de cuantización', { s: 3, fs: 25, c: 'purple' }),
  ], [
    'Con dos bits fraccionarios, los valores representables son múltiplos de un cuarto. Para codificar, escalá por cuatro y representá un entero con signo de ocho bits. Los decimales dados no son exactamente representables en esa escala.',
    'El modelo no especifica si se trunca o se redondea. La tabla muestra ambas políticas: truncando se codifican setenta y uno y ochenta y cuatro; al más cercano, setenta y dos y ochenta y cinco. No escondas esa decisión.',
    'Para restar, obtené el complemento a dos del entero codificado de be y sumalo al de a. En ambas variantes de este caso, los ocho bits del resultado son uno, uno, uno, uno, cero, cero, uno, uno.',
    'Ese patrón representa el entero menos trece. Dividilo por cuatro: menos tres coma veinticinco. El resultado decimal exacto de los operandos originales es menos tres coma treinta y uno; la diferencia proviene de cuantizar. La coincidencia de ambas políticas aquí no es una regla general.',
  ], 640, 850)],
  'arq-final-e4': [scene([
    head('4 · Virtual, física y caché'),
    box(20, 65, 600, 75, 'CPU: dirección virtual', { id: 'virtual', fs: 29 }),
    box(20, 200, 600, 85, 'MMU · TLB / tabla de páginas', { id: 'mmu', s: 1, fs: 28, c: 'yellow' }),
    arr('virtual', 'mmu', { s: 1 }),
    box(20, 355, 600, 75, 'Traducción a dirección física', { id: 'physical', s: 2, fs: 29, c: 'green' }),
    arr('mmu', 'physical', { s: 2 }),
    box(20, 505, 600, 85, 'Acceso a datos: caché / RAM\nPágina ausente → fallo y atención del SO', { id: 'data', s: 3, fs: 25, c: 'purple' }),
    arr('physical', 'data', { s: 3 }),
  ], [
    'La memoria virtual organiza el espacio de direcciones que utiliza un proceso. No es una memoria pequeña y rápida ubicada entre CPU y RAM: esa descripción corresponde a la caché y confunde dos mecanismos diferentes.',
    'La MMU realiza la traducción apoyándose en estructuras como tablas de páginas. La TLB conserva traducciones recientes; no guarda bloques de datos del programa como si fuera la caché de datos.',
    'Una página virtual se relaciona con un marco físico, junto con condiciones de presencia y permisos. El desplazamiento dentro de la página se conserva en la traducción. Un acierto en TLB no significa automáticamente un acierto en caché de datos.',
    'Si la página está presente y el acceso está permitido, puede atenderse mediante la jerarquía de datos. Si falta la página, interviene el sistema operativo para resolver el fallo, actualizar el estado y reintentar cuando corresponda. No todos los fallos implican necesariamente leer un archivo de intercambio.',
  ], 640, 625)],
  'arq-final-e5': [scene([
    head('5 · Correspondencia directa de caché'),
    bits(20, 70, 600, [{ t: 'Etiqueta', n: 2, c: 'blue' }, { t: 'Índice', n: 2, c: 'orange' }, { t: 'Offset', n: 2, c: 'green' }], { h: 65, fs: 26 }),
    box(20, 195, 600, 85, 'Bloque j = piso(dirección / B)\nOffset = dirección mod B', { s: 1, fs: 27, c: 'green' }),
    box(20, 335, 600, 85, 'Línea = j mod N\nEtiqueta = piso(j / N)', { s: 2, fs: 28, c: 'orange' }),
    box(20, 480, 600, 100, 'Una única línea candidata\nHit: entrada válida y etiqueta coincidente', { s: 3, fs: 26, c: 'purple' }),
  ], [
    'En correspondencia directa, cada bloque de memoria tiene una única línea candidata de caché. La dirección se interpreta mediante etiqueta, índice y desplazamiento; los anchos concretos dependen de la configuración que el problema proporcione.',
    'Si cada bloque tiene be bytes, dividí la dirección por be. La parte entera identifica el bloque y el resto es el desplazamiento dentro de él. No confundas número de bloque con número de línea de caché.',
    'Con ene líneas, el resto de dividir el bloque por ene da la línea y el cociente identifica la etiqueta. Bloques separados por múltiplos de ene compiten por esa misma ubicación, lo que explica los fallos por conflicto.',
    'La línea elegida no demuestra un acierto por sí sola. Debe ser válida y su etiqueta debe coincidir. El bit válido indica que la entrada puede usarse; no afirma que una línea modificada esté necesariamente sincronizada con memoria principal.',
  ], 640, 610)],
  'arq-final-e7': [scene([
    head('7 · E/S aislada y sondeo'),
    table(20, 65, 600, ['Espacio 8086', 'Ancho', 'Capacidad'], [['Memoria', '20 bits', '1 MiB'], ['Puertos E/S', '16 bits', '65.536 direcciones']], { fs: 25, rh: 65, cw: [1.2, 0.8, 2] }),
    box(180, 340, 280, 75, 'Consultar estado', { id: 'poll', fs: 28 }),
    box(210, 495, 220, 120, '¿Listo?', { id: 'ready', s: 1, shape: 'diamond', fs: 28, c: 'orange' }),
    arr('poll', 'ready', { s: 1 }),
    arr([210, 555], [70, 555], { s: 1, c: 'orange' }),
    line([[70, 555], [70, 380]], { s: 1, c: 'orange' }),
    arr([70, 380], [175, 380], { s: 1, c: 'orange', t: 'no' }),
    box(180, 700, 280, 75, 'Transferir dato', { id: 'transfer', s: 2, fs: 28, c: 'green' }),
    arr('ready', 'transfer', { s: 2, t: 'sí' }),
    box(20, 825, 600, 85, 'La CPU ejecuta consultas\nSin solicitud de atención por IRQ', { s: 3, fs: 26, c: 'purple' }),
  ], [
    'El 8086 distingue el espacio de memoria del espacio de puertos de entrada y salida. Las instrucciones IN y OUT acceden a puertos. Esa separación no es el mecanismo DMA ni significa que los dispositivos compartan por definición las direcciones de memoria.',
    'En sondeo, el programa consulta el estado del dispositivo y decide si puede continuar. Si todavía no está listo, vuelve a consultar o realiza otra actividad según la organización del programa. El dibujo muestra el caso de consulta repetida.',
    'Cuando el estado permite transferir, se realiza la operación de datos. El orden de las consultas puede definir una prioridad de atención, pero no elimina el trabajo de la CPU para verificar los estados.',
    'La espera activa puede consumir tiempo de CPU en consultas repetidas. Con interrupciones, el dispositivo solicita atención mediante otro mecanismo. Compará costo de consulta y costo de atención, sin afirmar que una técnica sea siempre superior para cualquier sistema.',
  ], 640, 940)],
  'arq-final-e8': [scene([
    head('8 · IEEE 754: −278,05'),
    box(20, 65, 600, 80, '278 = 100010110₂\n0,05 tiene desarrollo binario periódico', { fs: 26 }),
    box(20, 185, 600, 80, '−1.000101100000110011…₂ × 2⁸', { s: 1, fs: 27, c: 'yellow' }),
    table(20, 310, 600, ['Campo', 'Bits'], [['Signo', '1'], ['Exponente', '10000111'], ['Fracción', '00010110000011001100110']], { fs: 24, rh: 65, cw: [1, 3], rs: [2, 2, 3] }),
    box(20, 620, 600, 65, 'E = 8 + 127 = 135', { s: 2, fs: 29, c: 'orange' }),
    box(20, 735, 600, 85, 'C38B0666h\n≈ −278,04998779296875', { s: 4, fs: 27, c: 'green' }),
  ], [
    'El valor del enunciado es menos doscientos setenta y ocho coma cero cinco. La parte entera se convierte exactamente a binario, pero la fracción cero coma cero cinco tiene desarrollo periódico. No la sustituyas por un medio.',
    'Normalizá moviendo el punto hasta dejar un único uno antes de él. El exponente real es ocho. El uno inicial queda implícito para este número normal; el campo fracción conserva los bits que vienen después.',
    'El signo es uno porque el número es negativo. El exponente almacenado es ocho más el sesgo ciento veintisiete: ciento treinta y cinco, escrito como uno cero cero cero cero uno uno uno.',
    'Al limitar la fracción a veintitrés bits usamos redondeo al más cercano, con empates al par. El número no queda representado exactamente. La fracción de la tabla corresponde al valor redondeado de precisión simple, no a truncar el decimal a otra cifra.',
    'Al concatenar signo, exponente y fracción obtenés el hexadecimal ce tres ocho be cero seis seis seis. El valor almacenado es aproximadamente menos doscientos setenta y ocho coma cero cuatro nueve nueve ocho ocho. Comparar con el decimal original permite reconocer el error de representación.',
  ], 640, 850)],
  'arq-final-e9': [scene([
    head('9 · Computador, CPU y control'),
    box(20, 65, 600, 650, '', { c: 'gray' }), txt(320, 100, 'Computador', { fs: 29 }),
    box(60, 580, 520, 90, 'Memoria · E/S · interconexión', { fs: 26, c: 'blue' }),
    box(60, 155, 520, 375, '', { s: 1, c: 'orange' }), txt(320, 185, 'CPU', { s: 1, fs: 29, c: 'orange' }),
    box(90, 245, 190, 70, 'Registros', { s: 1, fs: 27 }),
    box(360, 245, 190, 70, 'ALU', { s: 1, fs: 29, c: 'green' }),
    box(90, 365, 460, 115, 'Unidad de control\nSecuenciar y decodificar', { s: 2, fs: 27, c: 'purple' }),
    txt(320, 775, 'UC microprogramada: memoria de control', { s: 3, fs: 26, c: 'purple' }),
  ], [
    'Distinguí niveles de organización. El computador incluye procesamiento, memoria, entrada y salida e interconexión. Un periférico o un módulo de memoria no es por sí mismo una parte interna de la unidad aritmético lógica.',
    'Dentro de la CPU, los registros conservan información de trabajo y la ALU realiza operaciones aritméticas o lógicas. La interconexión interna permite intercambiar datos y señales entre las partes que participan en la ejecución.',
    'La unidad de control coordina la secuencia y las señales necesarias. Decodificar una instrucción y dirigir las transferencias no es lo mismo que ejecutar una suma dentro de la ALU.',
    'En el modelo microprogramado de estudio, la memoria de control conserva microinstrucciones y el secuenciador organiza su recorrido. No generalices esa implementación a toda CPU posible: también existen unidades de control cableadas.',
  ], 640, 810)],
  'arq-final-e10': [scene([
    head('10 · Pipeline: superponer etapas'),
    table(20, 65, 600, ['Instr.', '1', '2', '3', '4', '5', '6'], [['I1', 'IF', 'ID', 'OF', 'EX', '', ''], ['I2', '', 'IF', 'ID', 'OF', 'EX', ''], ['I3', '', '', 'IF', 'ID', 'OF', 'EX']], { fs: 26, rh: 65, cw: [1.3, 1, 1, 1, 1, 1, 1], rs: [0, 1, 2] }),
    table(20, 430, 600, ['Riesgo', 'Respuesta posible'], [['Estructural', 'Separar recurso o esperar'], ['Datos', 'Forwarding o espera'], ['Control', 'Predicción y descarte']], { s: 3, fs: 25, rh: 75, cw: [1.2, 2] }),
  ], [
    'El esquema ilustra tres instrucciones y cuatro etapas sin paradas. La segmentación permite superponer trabajo de instrucciones diferentes. No significa que una instrucción deba completar todas sus etapas dentro de un único ciclo.',
    'La segunda instrucción comienza mientras la primera avanza. La mejora ideal corresponde a la cantidad de trabajo completado por unidad de tiempo, y no demuestra por sí sola una reducción de la latencia individual de cada instrucción.',
    'La tercera instrucción muestra la superposición una vez que varias etapas están ocupadas. El cálculo ideal requiere condiciones como etapas compatibles y ausencia de conflictos; no debe aplicarse sin considerar las restricciones del procesador y del programa.',
    'Los riesgos estructurales aparecen por recursos compartidos; los de datos, por dependencias; los de control, por cambios de flujo. Se usan medidas como espera, reenvío de datos y predicción de saltos. Si una predicción falla, deben descartarse las instrucciones del camino incorrecto.',
  ], 640, 770)],
};

const definitions = [
  ['arq-final-e1', 't5', 'Final · 1: interrupción enmascarable', 'Reconstruí la aceptación de una interrupción de hardware enmascarable del modelo 8086, el guardado de contexto y el retorno.', 'Solicitud y habilitación → guardar contexto → localizar y ejecutar ISR → retorno con restauración.'],
  ['arq-final-e2', 'u6', 'Final · 2: celda estática, PROM y EPROM', 'Diferenciá lectura, escritura y retención de una celda estática de un bit. Contrastá programación y borrado de PROM y EPROM.', 'SRAM conserva estado con alimentación y sin refresco DRAM; PROM se programa una vez; EPROM admite borrado UV.'],
  ['arq-final-e3', 'u2', 'Final · 3: resta con punto fijo', 'Con A=17,89 y B=21,2, estudiá A−B usando ocho bits con signo y dos fraccionarios. El modelo no aclara la política de cuantización: compará truncar y redondear.', 'Ambas políticas dan aquí 11110011₂, equivalente a −3,25; los patrones de los operandos son distintos.'],
  ['arq-final-e4', 'u7', 'Final · 4: memoria virtual y jerarquía', 'Seguí una dirección virtual desde la CPU hasta su traducción y el acceso a datos. Distinguí TLB, caché de datos y fallo de página.', 'MMU/TLB traducen direcciones; caché y RAM atienden datos; página ausente exige intervención del SO.'],
  ['arq-final-e5', 'u7', 'Final · 5: correspondencia directa', 'Identificá el bloque, la línea, el desplazamiento y la etiqueta en una caché directa de N líneas y bloques de B bytes.', 'Bloque=piso(dirección/B); offset=dirección mod B; línea=bloque mod N; etiqueta=piso(bloque/N).'],
  ['arq-final-e7', 't5', 'Final · 7: puertos 8086 y polling', 'Diferenciá los espacios de memoria y E/S del 8086 y seguí la atención de un dispositivo mediante consultas de estado.', 'E/S aislada con IN/OUT; el sondeo consulta estado antes de transferir y puede consumir tiempo de CPU.'],
  ['arq-final-e8', 'u3', 'Final · 8: IEEE de un decimal periódico', 'Representá −278,05 en IEEE 754 binary32, con redondeo al más cercano y empates al par. Separá signo, exponente y fracción.', '1 | 10000111 | 00010110000011001100110 → C38B0666h.'],
  ['arq-final-e9', 'u4', 'Final · 9: niveles de estructura', 'Ubicá los componentes del computador, de la CPU y de una unidad de control microprogramada sin confundir sus responsabilidades.', 'Computador: CPU, memoria, E/S e interconexión; CPU: registros, ALU y UC; UC microprogramada: control y secuenciación.'],
  ['arq-final-e10', 't3', 'Final · 10: segmentación y riesgos', 'Interpretá la superposición de etapas del pipeline y reconocé conflictos de recursos, dependencias de datos y cambios de flujo.', 'Pipeline mejora el rendimiento mediante superposición; los riesgos pueden exigir espera, forwarding o tratamiento de saltos.'],
];
export const FINAL_EXERCISES: WorkedExercise[] = definitions.map(([id, module, title, statement, result]) => ({
  id, module, title, statement, result,
  steps: FINAL_SCENES[id].flatMap((s) => s.say).map((body, i) => ({ title: `Paso ${i + 1}`, body })),
}));
