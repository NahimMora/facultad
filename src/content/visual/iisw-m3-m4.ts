/**
 * IISW · Módulos 3 (ágiles) y 4 (extracción de requerimientos), tema por tema.
 * Fuentes revisadas (privadas): apuntes de los módulos 3 y 4 y finales anteriores.
 * Redacción y diagramas propios. Caso ficticio: la app de reservas del club.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { head, line, txt } from './h';
import { asker, cards, flow, list, sc, VIDEO_NOTE } from './kit';


export const M3_THEORY: TheoryBlock[] = [
  {
    id: 'm3-agiles', module: 'm3', title: 'Por qué surgen los ágiles y el Manifiesto', videoNote: VIDEO_NOTE,
    lead: ['Los modelos rígidos servían para sistemas enormes. En proyectos chicos **se tardaba más en planificar que en programar**. La respuesta de los 90: software funcionando rápido, con el cliente al lado.'],
    scenes: [list('Los cinco principios', [
      ['Cliente', 'participa del desarrollo', '**Participación del cliente** en el proceso de desarrollo.'],
      ['Incremental', 'entregar de a partes', '**Desarrollo incremental** del software.'],
      ['Personas', 'antes que los procesos', '**Personas, no procesos**: que el equipo desarrolle su propia forma de trabajo.'],
      ['Cambio', 'los requisitos cambian', '**Aceptar el cambio** de los requerimientos.'],
      ['Simplicidad', 'en producto y proceso', '**Simplicidad**, en el producto y en el proceso.'],
    ])],
    points: [
      '**Años 90:** métodos ágiles; diseño y documentación acompañan, no preceden.',
      '**2001: Manifiesto Ágil**, firmado por Beck, Cockburn, Fowler, Schwaber, Sutherland y otros.',
      '**Métodos:** XP, Scrum, Crystal Clear, ASD, FDD.',
    ],
    written: 'Las metodologías ágiles surgen porque los modelos tradicionales eran rígidos para proyectos pequeños y entornos cambiantes. Sus principios son participación del cliente, desarrollo incremental, priorizar personas sobre procesos, aceptar el cambio de requerimientos y mantener la simplicidad.',
    trap: 'Ágil no es "sin documentación": la documentación **acompaña**.',
  },
  {
    id: 'm3-xp', module: 'm3', title: 'Programación extrema (XP)',
    lead: ['De Kent Beck: **cuatro prácticas** y un ciclo que arranca con **historias de usuario** elegidas por el cliente.'],
    scenes: [
      cards('Cuatro prácticas', [
        ['Liberación limitada', 'entregar ya, aunque incompleto', '**Liberación limitada**: entregar rápido lo urgente y completarlo después.'],
        ['Semana de 40 horas', 'sin horas extra', '**Semana de 40 horas**: evitar el agotamiento.'],
        ['Cliente en el sitio', 'define y prioriza', '**Cliente en el sitio**: involucrado para determinar requerimientos.'],
        ['Pares', 'dos programan juntos', '**Programación en pares**: más eficiente y eficaz.'],
      ]),
      flow('El ciclo de una entrega', [
        ['Elegir', 'historias para esta entrega', 'El cliente y el equipo **seleccionan las historias** de usuario.'],
        ['Dividir', 'historias en tareas', 'Las historias se **dividen en tareas**.'],
        ['Planificar', 'la entrega', 'Se **planifica la entrega**.'],
        ['Construir', 'desarrollar, integrar, probar', 'Se **desarrolla, integra y prueba**.'],
        ['Entregar', 'software funcionando', 'Se **entrega** el software.'],
        ['Evaluar', 'y vuelve a empezar', 'El cliente **evalúa** y se repite con las siguientes historias.'],
      ]),
    ],
    points: ['**Liberación limitada, 40 horas, cliente en el sitio, programación en pares.**', 'En vez de una lista de funciones, **escenarios o historias de usuario** priorizados por el cliente.'],
    written: 'XP, de Kent Beck, se basa en liberación limitada, semana de 40 horas, cliente en el sitio y programación en pares. El cliente describe y prioriza historias de usuario que se dividen en tareas, se desarrollan, prueban, entregan y evalúan en ciclos.',
  },
  {
    id: 'm3-scrum', module: 'm3', title: 'Scrum: características y roles',
    lead: ['**Salió de desarrollo en dos finales, por 10 puntos.** La respuesta tiene tres partes: qué es, cómo avanza y los tres roles con la regla de oro.'],
    scenes: [
      flow('Cómo avanza', [
        ['Product backlog', 'lista priorizada', 'El **product backlog** es la lista priorizada de requisitos del cliente.'],
        ['Selección', 'el equipo se compromete', 'Al empezar, el **equipo elige** qué requisitos se compromete a terminar.'],
        ['Sprint', '1 a 4 semanas', 'El **sprint** dura de una a cuatro semanas. Equipo, calidad y alcance no se tocan.'],
        ['Incremento', 'valor para el negocio', 'Termina con un **incremento que agrega valor**, y empieza otro sprint.'],
      ]),
      list('Tres roles', [
        ['Product Owner', 'una persona: prioriza el backlog', '**Product Owner**: única persona responsable del backlog y de que se agregue valor. Sus decisiones se respetan.'],
        ['Equipo', '7 ± 2, sin jefe', '**Equipo**: construye. Multidisciplinario, autogestionado, sin jerarquías, siete más o menos dos.'],
        ['Scrum Master', 'coach: no es jefe', '**Scrum Master**: ayuda a entender y usar Scrum, hace coaching y quita impedimentos. **No es jefe.**'],
        ['Regla de oro', 'PO ≠ Scrum Master', 'Y la regla: **Product Owner y Scrum Master nunca son la misma persona**.'],
      ]),
    ],
    points: [
      '**Qué es:** proceso ágil, iterativo e incremental, para agregar valor en el menor tiempo.',
      'Se centra en la **gestión, no en la ingeniería**.',
      '**Sprints de 1 a 4 semanas**; equipo, calidad y alcance inalterables.',
      '**Roles:** Product Owner, equipo, Scrum Master.',
    ],
    written: 'Scrum es un método ágil, iterativo e incremental, que busca agregar valor al negocio en el menor tiempo y se centra en la gestión. Avanza por sprints de 1 a 4 semanas, en los que el equipo toma requisitos de un product backlog priorizado y se compromete a terminarlos, sin alterar equipo, calidad ni alcance. Roles: el Product Owner, única persona que administra y prioriza el backlog; el equipo, multidisciplinario, autogestionado y sin jefe, de 7 ± 2 integrantes; y el Scrum Master, que hace coaching y resuelve impedimentos sin ser jefe. Product Owner y Scrum Master nunca pueden ser la misma persona.',
    trap: 'Equipo, calidad y alcance son **tres cosas que no cambian**. No escribas "equipo de calidad y equipo de alcance".',
  },
  {
    id: 'm3-elegir', module: 'm3', title: 'Elegir y combinar modelos',
    lead: ['**No hay un modelo mejor.** Se mira el proyecto y se arma el que le sirve, incluso combinando.'],
    scenes: [flow('Responsabilidades de quien dirige', [
      ['Analizar', 'las circunstancias', '**Analizar** las circunstancias ambientales del proyecto.'],
      ['Diseñar', 'el modelo para este proyecto', '**Diseñar** el modelo específico de ciclo de vida.'],
      ['Definir', 'las actividades', '**Definir las actividades** sobre ese modelo.'],
      ['Planificar', 'su gestión', '**Desarrollar el plan** para gestionar el ciclo de vida.'],
    ])],
    points: [
      '**Se puede combinar:** cascada dentro del espiral.',
      '**Criterios:** descomposición en subsistemas, estabilidad de requisitos, novedad para el cliente, criticidad de agenda y presupuesto, complejidad de la interfaz, conocimiento del entorno, riesgos, visibilidad del avance.',
      'Una mala elección puede llevar el proyecto al fracaso.',
    ],
    example: { title: 'la app del club', body: ['Requisitos cambiantes, torneo en dos meses y gerente disponible: **Scrum**. Si fuera integrar una pasarela regulada con requisitos fijos, esa parte podría ir en **cascada**.'] },
  },
];

const shape = (title: string, pts: [number, number][], steps: [label: string, y: number, say: string][]) => sc([
  head(title),
  line(pts, { c: 'blue', sw: 3 }),
  ...steps.map(([t, y], i) => txt(300, y, t, { fs: 18, b: true, c: i % 2 ? 'orange' : 'green', s: i })),
], steps.map((s) => s[2]));

export const M4_THEORY: TheoryBlock[] = [
  {
    id: 'm4-extraccion', module: 'm4', title: 'Las tres técnicas de extracción', videoNote: VIDEO_NOTE,
    lead: ['Extraer requerimientos es el **primer paso del desarrollo**. Hay tres técnicas básicas y se eligen por **cuánta gente** y **qué querés descubrir**.'],
    scenes: [list('Relevar el club', [
      ['Entrevista', 'al gerente, en profundidad', '**Entrevista**: conversación dirigida con un propósito específico. Da opiniones, metas, cultura, procedimientos.'],
      ['Cuestionario', 'a los 800 socios', '**Cuestionario**: preguntas con un objetivo, para mucha gente o dispersa.'],
      ['Observación', 'un sábado en recepción', '**Observación directa**: ir a ver cómo se trabaja. Descubre lo que nadie cuenta.'],
    ])],
    points: ['**Entrevista, cuestionario, observación directa.**', 'Se complementan: la observación muestra lo que no aparece al preguntar.'],
    written: 'Las técnicas básicas de extracción son la entrevista (conversación dirigida con un propósito específico), el cuestionario (preguntas con un objetivo, útil para muchas personas o dispersas) y la observación directa (ver cómo se ejecuta el trabajo en la organización).',
  },
  {
    id: 'm4-entrevista', module: 'm4', title: 'Preparar una entrevista',
    lead: ['Una entrevista improvisada se nota. Son **cinco pasos antes de sentarte**.'],
    scenes: [flow('Cinco pasos', [
      ['1 · Antecedentes', 'empresa, persona, vocabulario', '**Leer antecedentes** de la organización y de la persona, y aprender su vocabulario.'],
      ['2 · Objetivos', '4 a 6 puntos', '**Determinar los objetivos**: entre cuatro y seis puntos principales.'],
      ['3 · A quién', 'todos los niveles', '**Seleccionar a quién**: personas de todos los niveles involucrados.'],
      ['4 · Avisar', 'máximo 45 a 60 minutos', '**Preparar al entrevistado**: avisar con tiempo. Dura como máximo entre 45 minutos y una hora.'],
      ['5 · Preguntas', 'tipo y estructura', '**Definir tipo y estructura** de las preguntas, sabiendo que puede cambiar sobre la marcha.'],
    ])],
    points: [
      '**Antes definir:** motivo, preguntas, a quién, y que sea exitosa para ambos.',
      '**No busca solo opiniones:** también metas, procedimientos formales e informales y cultura.',
      '**Registro:** grabar libera las manos, pero si pone nervioso, tomar notas.',
    ],
    written: 'La planificación de una entrevista incluye leer antecedentes, determinar objetivos, seleccionar a los entrevistados de todos los niveles, prepararlos con anticipación y determinar el tipo y la estructura de las preguntas.',
  },
  {
    id: 'm4-preguntas', module: 'm4', title: 'Tipos de preguntas',
    lead: ['Se clasifican por **cuánta libertad** tiene el que responde. Y hay **dos errores** prohibidos.'],
    scenes: [list('En la recepción del club', [
      ['Abierta', '"¿cómo es una reserva?"', '**Abierta**: se explaya. Da riqueza y vocabulario, pero se puede perder el control.'],
      ['Cerrada', '"¿cuántas canchas hay?"', '**Cerrada**: acota la respuesta. Es rápida, pero pierde detalle y puede aburrir.'],
      ['Sondeo', '"¿por qué? ¿un ejemplo?"', '**De sondeo o exploratoria**: va más allá de la primera respuesta.'],
      ['✗ Tendenciosa', '"¿qué opina de este método obsoleto?"', 'Error uno, **tendenciosa**: muestra tu opinión y condiciona.'],
      ['✗ Doble', '"¿cómo reservan y cómo cobran?"', 'Error dos, **doble**: junta dos preguntas y una queda sin responder.'],
    ])],
    points: ['**Abiertas, cerradas, de sondeo.**', 'Una cerrada puede responderse con un número, no solo sí o no.', '**Evitar:** tendenciosas y dobles; mantener orden y secuencia lógica.'],
    table: { head: ['Tipo', 'A favor', 'En contra'], rows: [['Abierta', 'riqueza, detalle', 'pérdida de control'], ['Cerrada', 'rápida, concreta', 'sin detalle, aburre']] },
  },
  {
    id: 'm4-estructura', module: 'm4', title: 'Pirámide, embudo y diamante',
    lead: ['**Salió de desarrollo por 10 puntos:** cómo se conforma cada una y cuándo se usa. La forma lo dice: **angosto es cerrado, ancho es abierto**.'],
    scenes: [
      shape('Pirámide · inductiva', [[300, 70], [530, 310], [70, 310], [300, 70]], [
        ['cerradas', 185, '**Pirámide**: arriba, angosta. Empieza con preguntas **cerradas** y detalladas.'],
        ['abiertas', 275, 'Se ensancha hacia preguntas **abiertas**.'],
        ['para quien no participa', 375, 'Se usa cuando el entrevistado **no se muestra participativo**: lo vas involucrando.'],
      ]),
      shape('Embudo · deductiva', [[70, 80], [530, 80], [300, 320], [70, 80]], [
        ['abiertas', 115, '**Embudo**: arriba, ancho. Empieza con preguntas **abiertas** y generales.'],
        ['cerradas', 230, 'Se angosta hacia preguntas **cerradas**.'],
        ['para quien necesita expresarse', 375, 'Se usa cuando la persona **necesita expresarse** o plantear sus sentimientos.'],
      ]),
      shape('Diamante · combinada', [[300, 55], [510, 200], [300, 345], [90, 200], [300, 55]], [
        ['cerradas', 120, '**Diamante**: empieza con preguntas **cerradas** y específicas.'],
        ['abiertas', 200, 'En el medio se abre a **aspectos generales**.'],
        ['cerradas', 280, 'Termina **cerrando** para llegar a una conclusión.'],
      ]),
    ],
    points: ['**Pirámide (inductiva):** cerradas → abiertas; poco participativo.', '**Embudo (deductiva):** abiertas → cerradas; necesita expresarse.', '**Diamante:** cerradas → abiertas → cerradas; combina y busca una conclusión.'],
    written: 'La estructura **piramidal** es inductiva: comienza con preguntas cerradas y detalladas y se amplía a abiertas; se aplica cuando el entrevistado es poco participativo. La de **embudo** es deductiva: comienza con preguntas abiertas y generales y se reduce a cerradas; se usa cuando necesita expresarse. La de **diamante** combina ambas: comienza con cerradas, sigue con abiertas y finaliza con cerradas para llegar a una conclusión.',
    trap: 'Te piden **tres cosas de cada una**: nombre, cómo se conforma y cuándo se aplica.',
  },
  {
    id: 'm4-cuest', module: 'm4', title: 'Cuestionarios',
    lead: ['"¿Qué es un cuestionario y cuándo se usa?" salió en un final. Sirve cuando **no podés entrevistar a todos**.'],
    scenes: [list('Cuándo conviene', [
      ['Dispersos', 'otras áreas o filiales', 'Cuando las personas están en **ubicaciones separadas**.'],
      ['Muchos', 'imposible entrevistar a todos', 'Cuando hay **muchas personas** involucradas.'],
      ['Exploratorio', 'antes de empezar', 'Como **estudio preliminar** antes de un proyecto.'],
      ['Sondear', 'problemas del sistema actual', 'Para **sondear problemas** del sistema actual.'],
    ])],
    points: [
      '**Recoge:** opiniones, creencias, posturas, conductas y características de personas clave.',
      '**Redacción:** vocabulario del destinatario, específico, preguntas cortas y precisas.',
      '**Orden:** primero lo importante para quien responde, **lo controvertido al final**.',
      '**Aplicación:** reunirlos, entregar en mano, dejar un buzón o mandar por mail con fecha e instrucciones.',
    ],
    written: 'El cuestionario es una técnica de recopilación de información que permite recoger opiniones, creencias, conductas y características de personas clave de la organización. Se usa cuando están en ubicaciones separadas, cuando son muchas para entrevistarlas, como estudio exploratorio o para sondear problemas del sistema actual.',
    trap: 'Importante primero, pero **lo controvertido al final**.',
  },
  {
    id: 'm4-obs', module: 'm4', title: 'Observación directa',
    lead: ['La gente cuenta cómo **debería** trabajar. Mirando ves cómo **trabaja**.'],
    scenes: [list('Un sábado en recepción', [
      ['Cómo se hace', 'el cuaderno paralelo', 'Ves **cómo se hacen las cosas**, sin depender de las respuestas.'],
      ['Quién decide', 'el canchero confirma', 'Aparecen **relaciones** entre quienes deciden y el resto.'],
      ['Lo informal', 'turnos guardados por WhatsApp', 'Detectás **procedimientos informales** no documentados.'],
      ['Lo físico', 'fichas de colores', 'Y **elementos físicos** que se usan y nadie mencionó.'],
    ])],
    points: ['Visita presencial a los sectores afectados.', 'Profundiza más allá de las entrevistas.', 'Detecta relaciones, motivos, procedimientos informales y elementos físicos.'],
    written: 'La observación directa consiste en visitar la organización para ver cómo se ejecuta el trabajo. Permite detectar relaciones, procedimientos informales no documentados y elementos físicos que no surgen en entrevistas.',
  },
];

const a = asker('m3');
export const M3_QUESTIONS: Question[] = [
  a.mcq('iisw-m3-01', 'm3-agiles', '¿Cuál es un principio de los métodos ágiles?', 'Aceptar que los requerimientos cambian', ['Cerrar cada etapa antes de seguir', 'Priorizar procesos sobre personas', 'Aislar al cliente'], 'Junto con cliente, incrementalidad, personas y simplicidad.'),
  a.tf('iisw-m3-05', 'm3-elegir', 'Elegido un modelo de ciclo de vida, no se lo puede combinar con otro.', false, 'Se combinan, por ejemplo cascada dentro del espiral.'),
];

const b = asker('m4');
export const M4_QUESTIONS: Question[] = [
  b.mcq('iisw-m4-01', 'm4-extraccion', 'Para descubrir un procedimiento informal que nadie menciona conviene:', 'Observación directa', ['Cuestionario cerrado', 'Leer el manual', 'Una pregunta doble'], 'Se ve cómo se trabaja realmente.'),
  b.mcq('iisw-m4-02', 'm4-entrevista', 'El primer paso al planificar una entrevista es:', 'Leer antecedentes', ['Redactar las preguntas', 'Avisar al entrevistado', 'Elegir si se graba'], 'Antecedentes, objetivos, a quién, avisar, preguntas.'),
  b.mcq('iisw-m4-03', 'm4-preguntas', '"¿Cómo emiten la orden y cómo eligen al proveedor?" es una pregunta:', 'Doble', ['Tendenciosa', 'Cerrada', 'De sondeo'], 'Junta dos preguntas en una.'),
  b.mcq('iisw-m4-05', 'm4-cuest', 'Las preguntas más controvertidas de un cuestionario van:', 'Al final', ['Primero', 'En el título', 'Repetidas en cada sección'], 'Primero lo importante para quien responde.'),
  b.tf('iisw-m4-06', 'm4-obs', 'La observación directa puede revelar elementos físicos que no surgieron en las entrevistas.', true, 'Es una de sus ventajas.'),
];

export const M3_MAP: ConceptMap = {
  module: 'm3', root: 'Metodologías ágiles',
  branches: [
    { t: 'Manifiesto Ágil (2001)', d: 'cinco principios', topic: 'm3-agiles' },
    { t: 'XP', d: 'cuatro prácticas, historias de usuario', topic: 'm3-xp' },
    { t: 'Scrum', d: 'sprints; PO, equipo, Scrum Master', topic: 'm3-scrum' },
    { t: 'Elegir el modelo', d: 'según el proyecto; se combinan', topic: 'm3-elegir' },
  ],
  links: ['Las **historias de usuario** se desarrollan en el Módulo 8.', 'Los criterios de elección aplican también a los modelos del **Módulo 2**.'],
};

export const M4_MAP: ConceptMap = {
  module: 'm4', root: 'Extracción de requerimientos',
  branches: [
    { t: 'Técnicas', d: 'el primer paso del desarrollo', topic: 'm4-extraccion', kids: [
      { t: 'Entrevista', d: 'cinco pasos', topic: 'm4-entrevista', kids: [
        { rel: 'usa', t: 'Tipos de preguntas', d: 'abiertas, cerradas, sondeo', topic: 'm4-preguntas' },
        { rel: 'se estructura en', t: 'Pirámide, embudo, diamante', topic: 'm4-estructura' },
      ] },
      { t: 'Cuestionario', d: 'muchos o dispersos', topic: 'm4-cuest' },
      { t: 'Observación', d: 'ver el trabajo real', topic: 'm4-obs' },
    ] },
  ],
  links: ['Lo relevado se **modela** (Módulo 5) y se **especifica** (Módulos 6 y 7).'],
};
