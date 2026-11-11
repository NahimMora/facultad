/** IISW · final (módulos 1 a 7) · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { SECOND_SCENES } from './iisw-segunda';
import { arr, bars, bits, box, head, ico, line, scene, table, txt } from './h';

const spiral: [number, number][] = Array.from({ length: 90 }, (_, i) => {
  const a = i * 0.21, r = 12 + i * 2.1;
  return [210 + r * Math.cos(a), 250 + r * Math.sin(a)] as [number, number];
});

export const SCENES: Record<string, VisScene[]> = {
  ...SECOND_SCENES,
  'm1-def': [
    scene([
      head('Ingeniería de software: por qué nace'),
      box(60, 70, 220, 100, '1968 · OTAN', { c: 'red', sub: 'crisis del software: proyectos fuera de costo y plazo', fs: 20 }),
      box(310, 70, 220, 100, 'IEEE 1993', { c: 'blue', sub: 'métodos sistemáticos, disciplinados y cuantificables', fs: 20, s: 1 }),
      box(560, 70, 220, 100, 'Producto', { c: 'green', sub: 'ejecutable + documentación, diseño, pruebas, manuales', fs: 20, s: 2 }),
      box(40, 210, 420, 220, '', { c: 'purple', s: 3 }), txt(250, 235, 'SISTEMA basado en computadora', { b: true, fs: 18, c: 'purple', s: 3 }),
      ...['software', 'hardware', 'gente', 'base de datos', 'documentación', 'procedimientos manuales'].map((t, i) => box(60 + (i % 2) * 200, 255 + Math.floor(i / 2) * 58, 180, 48, t, { c: i === 0 ? 'yellow' : 'gray', fs: 15, s: 3, solid: i === 0 })),
      box(490, 210, 290, 100, 'Brooks: dificultades ESENCIALES (no desaparecen)', { c: 'orange', fs: 16, sub: 'complejidad, conformidad, variabilidad, invisibilidad', s: 4 }),
      box(490, 325, 290, 105, 'y ACCIDENTALES (las herramientas las reducen)', { c: 'cyan', fs: 16, s: 4 }),
    ], [
      'La ingeniería de software nace en **1968**, en una conferencia de la OTAN, junto con un término: la **crisis del software**. Proyectos que se pasaban de costo y de plazo, o se cancelaban.',
      'La IEEE la define como aplicar métodos **sistemáticos, disciplinados y cuantificables** al desarrollo, la operación y el mantenimiento del software.',
      'Y el **producto de software** no es solo el ejecutable: incluye requerimientos, diseño, código, datos de prueba y manuales.',
      'Ojo con esta diferencia que toman en el final: un **sistema** basado en computadora combina software, hardware, gente, base de datos, documentación y **procedimientos manuales**. El **software** es solo la parte lógica, computarizada.',
      'Brooks, en "No hay balas de plata", separa las dificultades **esenciales**, que no desaparecen con la tecnología, de las **accidentales**, que las herramientas sí reducen.',
    ]),
  ],
  'm1-cual': [
    scene([
      head('Cualidades del software (Ghezzi)'),
      box(30, 55, 470, 260, '', { c: 'blue' }), txt(265, 80, 'del PRODUCTO', { b: true, fs: 20, c: 'blue' }),
      ...[['Correctitud', 'cumple la especificación'], ['Confiabilidad', 'opera bien en el tiempo'], ['Robustez', 'razonable ante lo imprevisto'], ['Performance', 'usa bien los recursos'], ['Amigabilidad', 'fácil de usar'], ['Interoperabilidad', 'coopera con otros sistemas']].map(([t, sub], i) =>
        box(45 + (i % 2) * 230, 100 + Math.floor(i / 2) * 70, 215, 60, t, { c: 'blue', sub, fs: 16, s: i < 2 ? 0 : 1 })),
      box(520, 55, 260, 260, '', { c: 'orange', s: 2 }), txt(650, 80, 'del PROCESO', { b: true, fs: 20, c: 'orange', s: 2 }),
      box(535, 100, 230, 60, 'Productividad', { c: 'orange', sub: 'eficiencia en recursos', fs: 16, s: 2 }),
      box(535, 170, 230, 60, 'OPORTUNIDAD', { c: 'yellow', sub: 'entregar A TIEMPO', fs: 16, s: 3 }),
      box(535, 240, 230, 60, 'Visibilidad', { c: 'orange', sub: 'pasos y estado documentados', fs: 16, s: 2 }),
      box(30, 340, 750, 90, 'Internas (las ven los desarrolladores) vs externas (las ve el usuario) · Performance es del producto; productividad, del proceso', { c: 'purple', fs: 17, s: 4 }),
    ], [
      'Ghezzi clasifica las cualidades del software. Del **producto**: **correctitud**, cumple la especificación; **confiabilidad**, opera como se espera durante un tiempo.',
      '**Robustez**, se comporta razonablemente ante lo imprevisto; **performance**, usa bien tiempo y memoria; **amigabilidad**; e **interoperabilidad**, coexistir y cooperar con otros sistemas.',
      'Del **proceso**: **productividad**, eficiencia en el uso de recursos, y **visibilidad**, pasos y estado documentados y accesibles.',
      'Y la que más preguntan: **oportunidad**, entregar **a tiempo**, con buena estimación y metas claras.',
      'Además hay internas y externas. Una trampa de final mezcla **performance** y **productividad**: la primera es del producto, la segunda del proceso.',
    ]),
  ],
  'm1-princ': [
    scene([
      head('Principios: modularidad con alta cohesión y bajo acoplamiento'),
      ...[0, 1, 2].map((i) => box(40 + i * 130, 90, 110, 110, `M${i + 1}`, { c: 'red', fs: 20, id: 'a' + i })),
      arr('a0', 'a1', { c: 'red', two: true, bend: 30 }), arr('a1', 'a2', { c: 'red', two: true, bend: 30 }), arr('a0', 'a2', { c: 'red', two: true, bend: -60 }),
      arr('a0', 'a1', { c: 'red', bend: -30 }), arr('a2', 'a1', { c: 'red', bend: -30 }),
      txt(235, 260, 'ALTO acoplamiento: todo depende de todo ✘', { b: true, fs: 17, c: 'red' }),
      ...[0, 1, 2].map((i) => box(430 + i * 120, 90, 100, 110, `M${i + 1}`, { c: 'green', fs: 20, id: 'b' + i, s: 1 })),
      arr('b0', 'b1', { c: 'green', s: 1 }), arr('b1', 'b2', { c: 'green', s: 1 }),
      txt(600, 260, 'BAJO acoplamiento, ALTA cohesión ✔', { b: true, fs: 17, c: 'green', s: 1 }),
      table(40, 300, 720, undefined, [['Rigor y formalidad', 'Separación de incumbencias', 'Modularidad', 'Abstracción'], ['Anticipación al cambio', 'Generalización', 'Incrementalidad', 'en TODO el proceso']], { rh: 50, fs: 15, s: 2 }),
    ], [
      'La **modularidad** divide un sistema complejo en módulos. Pero no de cualquier forma: si cada módulo depende de todos los demás, hay **alto acoplamiento**, y un cambio en uno rompe a los otros.',
      'Un buen diseño tiene **alta cohesión**, cada módulo con partes muy relacionadas entre sí, y **bajo acoplamiento**, pocas dependencias entre módulos. En el final ponen la frase al revés para que la marques como falsa.',
      'Los siete principios se aplican **durante todo el proceso**, no en una sola fase: rigor y formalidad, separación de incumbencias, modularidad, abstracción, **anticipación al cambio**, generalización e incrementalidad.',
    ]),
  ],
  'm2-ciclos': [
    scene([
      head('Cascada vs incremental'),
      ...['Requerimientos', 'Diseño', 'Codificación', 'Pruebas', 'Operación'].map((t, i) => box(20 + i * 70, 60 + i * 55, 150, 46, t, { c: 'blue', fs: 15, id: 'c' + i })),
      ...[0, 1, 2, 3].map((i) => arr('c' + i, 'c' + (i + 1), { c: 'blue' })),
      txt(200, 370, 'CASCADA: secuencial y rígido', { b: true, fs: 17, c: 'blue' }),
      txt(200, 400, 'el cliente ve el producto AL FINAL ✘', { b: true, fs: 16, c: 'red', s: 1 }),
      bars(450, 80, 330, 260, [{ t: 'entrega 1', v: 1, c: 'green' }, { t: 'entrega 2', v: 2, c: 'green' }, { t: 'entrega 3', v: 3, c: 'green' }, { t: 'entrega 4', v: 4, c: 'green' }], { s: 2, unit: '' }),
      txt(615, 400, 'INCREMENTAL: subsistemas operativos', { b: true, fs: 17, c: 'green', s: 2 }),
      txt(615, 430, '→ subsana la desventaja de cascada', { b: true, fs: 16, c: 'yellow', s: 3 }),
    ], [
      'El modelo en **cascada** recorre las etapas una tras otra: requerimientos, diseño, codificación, pruebas y operación. Sirve cuando los requisitos están **completamente definidos y estables**.',
      'Su gran desventaja: el cliente **ve el producto recién al final**, y si algo estaba mal entendido, se descubre tarde.',
      'El **incremental** entrega **subsistemas operativos** de a partes: cada entrega suma funcionalidad que el cliente ya puede usar.',
      'Por eso es la respuesta a "quién subsana la desventaja de cascada": el **incremental**, porque el cliente ve avances.',
    ]),
    scene([
      head('Espiral, prototipos y UP'),
      line(spiral, { c: 'orange', sw: 3 }),
      line([[210, 60], [210, 440]], { c: 'gray', dash: true }), line([[20, 250], [400, 250]], { c: 'gray', dash: true }),
      txt(110, 80, 'planificación', { fs: 15, b: true, c: 'blue' }), txt(320, 80, 'análisis de RIESGOS', { fs: 15, b: true, c: 'red' }),
      txt(320, 430, 'ingeniería', { fs: 15, b: true, c: 'green' }), txt(110, 430, 'evaluación del cliente', { fs: 15, b: true, c: 'purple' }),
      box(430, 55, 350, 90, 'Prototipos: el cliente no sabe qué quiere · descartables o evolutivos', { c: 'pink', fs: 16, s: 1 }),
      bits(430, 195, 350, [{ t: 'Inicio', c: 'blue' }, { t: 'Elaboración', c: 'green' }, { t: 'Construcción', c: 'orange' }, { t: 'Transición', c: 'purple' }], { h: 50, fs: 13, s: 2, title: 'UP / RUP: iterativo e incremental' }),
      box(430, 280, 350, 70, 'cada fase en iteraciones que recorren requisitos, análisis, diseño, implementación y pruebas', { c: 'gray', fs: 14, s: 2 }),
      box(430, 365, 350, 70, 'No hay un modelo mejor: se elige (y se combinan)', { c: 'yellow', fs: 16, s: 3 }),
    ], [
      'El **espiral**, de Boehm, da vueltas por cuatro cuadrantes: planificación, **análisis de riesgos**, ingeniería y evaluación del cliente. Lo distintivo es el **análisis de riesgos**: subsana esa falta de los otros modelos.',
      'Los **prototipos** sirven cuando el cliente **no sabe describir** lo que quiere. Pueden ser **descartables** o **evolutivos**, y ligeros, como bocetos, u operativos.',
      'El **Proceso Unificado** es híbrido, **iterativo e incremental**, ligado a UML, con cuatro fases: **inicio, elaboración, construcción y transición**.',
      'No hay un modelo mejor: se elige según la estabilidad de los requisitos, los riesgos y los plazos, y se pueden combinar.',
    ]),
  ],
  'm3-agiles': [
    scene([
      head('Scrum'),
      box(30, 70, 190, 110, 'Product backlog', { c: 'blue', sub: 'lista priorizada', fs: 19, id: 'pb' }),
      box(300, 70, 200, 110, 'SPRINT', { shape: 'circle', c: 'orange', sub: '1 a 4 semanas', fs: 24, id: 'sp', s: 1 }),
      box(580, 70, 190, 110, 'Incremento', { c: 'green', sub: 'producto que funciona', fs: 19, id: 'in', s: 2 }),
      arr('pb', 'sp', { c: 'blue', s: 1 }), arr('sp', 'in', { c: 'green', s: 2 }),
      arr([400, 70], [430, 95], { bend: -60, c: 'orange', s: 1, t: 'daily' }),
      ico(110, 290, 'user', { t: 'Product Owner', c: 'blue', s: 3, fs: 16 }), txt(110, 375, 'administra y prioriza el backlog', { fs: 14, c: 'gray', s: 3 }),
      ico(400, 290, 'user', { t: 'Equipo (7 ± 2)', c: 'orange', s: 3, fs: 16 }), txt(400, 375, 'autogestionado, sin jerarquías', { fs: 14, c: 'gray', s: 3 }),
      ico(690, 290, 'user', { t: 'Scrum Master', c: 'green', s: 3, fs: 16 }), txt(690, 375, 'coach, quita impedimentos', { fs: 14, c: 'gray', s: 3 }),
      txt(400, 425, 'PO y Scrum Master NUNCA son la misma persona · el SM no es el jefe', { b: true, fs: 17, c: 'red', s: 4 }),
    ], [
      'Las metodologías **ágiles** nacen con el manifiesto de 2001: personas antes que procesos, cliente involucrado, entregas incrementales y aceptar el cambio. En **Scrum** todo parte del **product backlog**, la lista priorizada de requisitos.',
      'El equipo toma requisitos y trabaja en un **sprint** de 1 a 4 semanas, con una reunión diaria.',
      'Cada sprint termina en un **incremento** de producto que funciona.',
      'Roles: el **Product Owner**, una persona que administra y prioriza el backlog; el **equipo**, multidisciplinario y autogestionado, de unas 7 personas; y el **Scrum Master**, un coach que quita impedimentos.',
      'Dos trampas: el Scrum Master **no es el jefe**, y Product Owner y Scrum Master **nunca** son la misma persona. **XP**, en cambio, se enfoca en la ingeniería: programación en pares, cliente en el sitio e historias de usuario.',
    ]),
  ],
  'm4-extraccion': [
    scene([
      head('Estructuras de entrevista'),
      line([[130, 80], [40, 280], [220, 280], [130, 80]], { c: 'blue', sw: 3 }),
      txt(130, 150, 'cerradas', { fs: 15, b: true }), txt(130, 255, 'abiertas', { fs: 15, b: true }),
      txt(130, 320, 'PIRÁMIDE (inductiva)', { b: true, fs: 17, c: 'blue' }), txt(130, 350, 'entrevistado poco\nparticipativo', { fs: 14, c: 'gray' }),
      line([[310, 80], [490, 80], [400, 280], [310, 80]], { c: 'orange', sw: 3, s: 1 }),
      txt(400, 105, 'abiertas', { fs: 15, b: true, s: 1 }), txt(400, 210, 'cerradas', { fs: 15, b: true, s: 1 }),
      txt(400, 320, 'EMBUDO (deductiva)', { b: true, fs: 17, c: 'orange', s: 1 }), txt(400, 350, 'necesita\nexpresarse', { fs: 14, c: 'gray', s: 1 }),
      line([[670, 80], [580, 180], [670, 280], [760, 180], [670, 80]], { c: 'green', sw: 3, s: 2 }),
      txt(670, 115, 'cerradas', { fs: 14, b: true, s: 2 }), txt(670, 185, 'abiertas', { fs: 14, b: true, s: 2 }), txt(670, 255, 'cerradas', { fs: 14, b: true, s: 2 }),
      txt(670, 320, 'DIAMANTE', { b: true, fs: 17, c: 'green', s: 2 }),
      box(30, 395, 360, 45, 'Cuestionario: muchas personas o dispersas', { c: 'purple', fs: 15, s: 3 }),
      box(410, 395, 360, 45, 'Evitar: tendenciosas y dobles', { c: 'red', fs: 15, s: 4 }),
    ], [
      'La **entrevista** combina preguntas **abiertas**, donde el entrevistado se explaya, **cerradas**, de respuesta acotada, y de **sondeo**. La estructura **pirámide** empieza con cerradas y termina con abiertas: es **inductiva** y sirve con un entrevistado **poco participativo**, para entrar en calor.',
      'El **embudo** es al revés: empieza abierto y cierra con preguntas puntuales. Es **deductiva**, para quien **necesita expresarse**.',
      'El **diamante** combina: cerradas, abiertas y otra vez cerradas.',
      'El **cuestionario** se usa cuando hay **muchas personas** o están **dispersas**, para estudios preliminares. Y la **observación directa** descubre los procedimientos informales que nadie documentó.',
      'Errores a evitar: preguntas **tendenciosas**, que muestran tu opinión, y **dobles**, dos preguntas en una.',
    ]),
  ],
  'm5-modelado': [
    scene([
      head('Diagrama de actividad'),
      box(10, 50, 380, 390, '', { c: 'gray' }), box(390, 50, 400, 390, '', { c: 'gray' }),
      txt(200, 72, 'Cliente', { b: true, fs: 17, c: 'gray' }), txt(590, 72, 'Empresa', { b: true, fs: 17, c: 'gray' }),
      box(185, 95, 30, 30, '', { shape: 'circle', c: 'white', solid: true, id: 'i' }),
      box(110, 150, 180, 50, 'Hace el pedido', { shape: 'pill', c: 'blue', fs: 16, id: 'a1', s: 1 }),
      box(510, 145, 160, 60, '¿Hay stock?', { shape: 'diamond', c: 'yellow', fs: 15, id: 'd', s: 2 }),
      box(420, 255, 160, 50, 'Prepara', { shape: 'pill', c: 'blue', fs: 16, id: 'a2', s: 3 }),
      box(610, 255, 160, 50, 'Factura', { shape: 'pill', c: 'blue', fs: 16, id: 'a3', s: 3 }),
      box(430, 330, 330, 8, '', { c: 'white', solid: true, id: 'j', s: 3 }),
      box(575, 385, 34, 34, '', { shape: 'circle', c: 'white', id: 'f', s: 4 }),
      arr('i', 'a1', { s: 1 }), arr('a1', 'd', { s: 2 }), arr('d', 'a2', { s: 3, t: '[sí]' }), arr('d', 'a3', { s: 3 }), arr('a2', 'j', { s: 3 }), arr('a3', 'j', { s: 3 }), arr('j', 'f', { s: 4 }),
      txt(200, 300, 'carriles = quién hace qué', { fs: 15, b: true, c: 'gray', s: 1 }),
      txt(200, 380, '▬ barra = paralelismo', { fs: 15, b: true, c: 'white', s: 3 }),
    ], [
      'El **diagrama de actividad** modela un proceso de negocio. Empieza con un círculo negro, el **inicio**, y cada **carril** muestra quién hace cada cosa.',
      'Las **actividades** son cajas redondeadas: el cliente hace el pedido.',
      'Las **decisiones** son rombos, con salidas mutuamente excluyentes y **condiciones de guarda** entre corchetes.',
      'La **barra de sincronización** abre y cierra **paralelismo**: preparar y facturar a la vez. Es su gran aporte.',
      'Y termina en el **fin**, el círculo con punto. En **BPMN** la idea es la misma con eventos, actividades, **compuertas** y pools; en el final suelen pedir **marcar tres errores** de un BPMN: falta de inicio o fin, compuertas sin condición, o flujo de secuencia cruzando pools, donde corresponde flujo de mensaje.',
    ]),
  ],
  'm6-ir': [
    scene([
      head('Ingeniería de requerimientos'),
      ...['Extracción', 'Análisis', 'Especificación (SRS)', 'Validación'].map((t, i) => box(20 + i * 195, 60, 175, 70, t, { c: (['blue', 'purple', 'orange', 'green'] as const)[i], fs: 17, id: 'r' + i, s: i === 0 ? 0 : 1 })),
      ...[0, 1, 2].map((i) => arr('r' + i, 'r' + (i + 1), { s: 1 })),
      bits(40, 230, 380, [{ t: 'requisitos', c: 'green' }, { t: 'diseño', c: 'yellow' }, { t: 'código', c: 'orange' }, { t: 'pruebas', c: 'red' }], { h: 60, fs: 15, s: 2, title: 'dónde se descubre el error' }),
      txt(230, 340, 'en pruebas: hasta 5000 veces más caro', { b: true, fs: 18, c: 'red', s: 2 }),
      bars(460, 175, 320, 200, [{ t: 'exitosos', v: 28, c: 'green' }, { t: 'cancelados', v: 23, c: 'red' }, { t: 'con demoras', v: 49, c: 'orange' }], { s: 3, unit: ' %' }),
      txt(620, 420, 'Standish 2000', { fs: 15, b: true, c: 'gray', s: 3 }),
    ], [
      'La **ingeniería de requerimientos** tiene cuatro pasos: **extracción**…',
      '…**análisis**, **especificación**, que produce la **SRS**, y **validación**, donde el cliente confirma que eso es lo que espera. Describe el **comportamiento externo**; **no** diseña estructuras de datos ni módulos.',
      '¿Por qué importa? Porque un error de requerimientos cuesta cada vez más cuanto más tarde se descubre: si recién aparece en las pruebas, corregirlo puede costar **hasta 5000 veces más**.',
      'Según Standish, solo el **28 %** de los proyectos terminaba bien. Las causas: requisitos **ambiguos** o cambiantes y **poca participación del usuario**. Esos son los defectos que pregunta el final.',
    ]),
  ],
  'm7-srs': [
    scene([
      head('SRS: qué incluye y qué no'),
      box(30, 55, 360, 230, '', { c: 'green' }), txt(210, 80, 'INCLUYE ✔', { b: true, fs: 20, c: 'green' }),
      ...['Funcionalidad', 'Interfaces externas', 'Rendimiento', 'Atributos (seguridad, portabilidad)', 'Restricciones de diseño'].map((t, i) => txt(50, 115 + i * 34, '• ' + t, { anchor: 'start', fs: 17 })),
      box(410, 55, 360, 230, '', { c: 'red', s: 1 }), txt(590, 80, 'NO INCLUYE ✘', { b: true, fs: 20, c: 'red', s: 1 }),
      ...['Costos', 'Cronogramas', 'Diseño', 'Planes de prueba o de configuración'].map((t, i) => txt(430, 115 + i * 34, '• ' + t, { anchor: 'start', fs: 17, s: 1 })),
      table(30, 305, 740, ['IEEE 830: una buena SRS es…'], [['correcta · no ambigua · completa · consistente'], ['clasificada por importancia · verificable · modificable · trazable']], { rh: 38, fs: 16, s: 2 }),
      txt(400, 435, 'Cuantificar SÍ cambia la solución (volumen inicial, crecimiento, máximo)', { b: true, fs: 16, c: 'yellow', s: 3 }),
    ], [
      'La **SRS** describe el comportamiento externo completo del software. Incluye la funcionalidad, las interfaces externas, el rendimiento, los atributos de calidad y las restricciones de diseño.',
      'Y **no** incluye costos, cronogramas, diseño ni planes de prueba.',
      'Según el estándar **IEEE 830**, que es una **guía**, una buena SRS es correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y **trazable**.',
      'Y hay que **cuantificar**: el mismo problema con distinto volumen lleva a soluciones distintas. En un verdadero o falso dicen que cuantificar "no afecta la solución": es **falso**.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'iswf-e1': [
    scene([
      head('Final: objetos entidad del caso "Motores"'),
      box(30, 55, 740, 120, 'Los pedidos se hacen por teléfono, solo para CLIENTES (con número de cliente). Se consultan las existencias de cada REPUESTO; el PEDIDO queda cumplido o pendiente; se emiten REMITO y FACTURA.', { c: 'gray', fs: 16, align: 'l' }),
      ...['Cliente', 'Repuesto', 'Pedido', 'Remito', 'Factura'].map((t, i) => box(30 + i * 152, 210, 136, 70, t, { c: 'green', fs: 20, s: 1 + Math.min(i, 2) })),
      box(30, 320, 360, 110, 'Descartar: teléfono (medio), expedición (área externa), existencias (atributo)', { c: 'red', fs: 16, s: 3 }),
      box(410, 320, 360, 110, 'Entidad = información que PERSISTE más allá del caso de uso', { c: 'yellow', fs: 17, s: 0 }),
    ], [
      'En el práctico piden los **objetos entidad**: la información que **persiste** más allá del caso de uso. Se buscan los sustantivos que se registran.',
      '**Cliente**, que tiene datos y número, y **Repuesto**, con su existencia.',
      'El **Pedido**, con su estado, y los comprobantes: **Remito** y **Factura**.',
      'Y se descartan el teléfono, que es un medio; expedición, un área externa; y existencias, que es un atributo del repuesto.',
    ]),
  ],
};
