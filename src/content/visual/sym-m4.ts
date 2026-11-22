/**
 * SyM · Módulo 4 (La dirección), tema por tema.
 * Fuentes revisadas (privadas): apunte "Fundamentos de la dirección y habilidades gerenciales", presentación e
 * introducción del módulo, y finales anteriores. Redacción y diagramas propios. Empresa ficticia: Yerbatera Ñandú.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { box, head, txt } from './h';
import { asker, flow, list, sc, VIDEO_NOTE } from './kit';

const module = 'm4';
const F = 'final anterior (Drive de estudiantes)';

export const M4_THEORY: TheoryBlock[] = [
  {
    id: 'y4', module, title: 'Dirigir: las habilidades del líder', videoNote: VIDEO_NOTE,
    lead: [
      'Dirigir no es solo administrar recursos: es **guiar, inspirar y coordinar personas** hacia objetivos comunes. El apunte lo baja a **seis habilidades**, y "detalle las habilidades del líder" salió de desarrollo en un final.',
      'Para recordarlas: **L**idera, **M**otiva, **C**omunica, **D**elega, **N**egocia, **D**ecide.',
    ],
    scenes: [list('La gerenta de Planta de Ñandú', [
      ['Liderazgo', 'muestra a dónde va la planta', '**Liderazgo**: influir en el grupo para que logre las metas. Es crear una visión, no solo dar órdenes.'],
      ['Motivación', 'sabe qué mueve a cada uno', '**Motivación**: entender y canalizar lo que impulsa la conducta, para sostener el esfuerzo en el tiempo.'],
      ['Comunicación', 'explica y escucha', '**Comunicación**: compartir significados con mensajes y dar retroalimentación.'],
      ['Delegación', 'da autoridad al jefe de turno', '**Delegación**: asignar autoridad y responsabilidad. No es pasar trabajo: es dar poder de decisión.'],
      ['Negociación', 'acuerda vacaciones con el equipo', '**Negociación**: manejar conflictos y llegar a acuerdos satisfactorios para las partes.'],
      ['Decisiones', 'elige qué secadora reparar', '**Toma de decisiones**: identificar problemas, evaluar alternativas y elegir el curso de acción.'],
    ])],
    points: [
      '**Liderazgo gerencial:** proceso de dirigir las actividades laborales de un grupo e influir en ellas.',
      '**Cuatro implicaciones:** involucra a otras personas; hay distribución desigual del poder; se usa ese poder para influir en la conducta; es una cuestión de valores.',
      '**Seis habilidades:** liderazgo, motivación, comunicación, delegación, negociación, y toma de decisiones y solución de problemas.',
    ],
    written: 'El líder debe dominar habilidades interconectadas: **liderazgo** (influir en el grupo para lograr las metas), **motivación** (canalizar lo que impulsa la conducta), **comunicación** (compartir significados y dar retroalimentación), **delegación** (asignar autoridad y responsabilidad), **negociación** (resolver conflictos con acuerdos satisfactorios) y **toma de decisiones** (identificar problemas, evaluar alternativas y elegir).',
    trap: 'En el final piden **detallar**: cada habilidad con su definición de una línea. La lista pelada no alcanza.',
  },
  {
    id: 'y4l', module, title: 'Estilos de liderazgo: la rejilla de Blake y Mouton',
    lead: ['Son dos preguntas con nota del 1 al 9: **¿cuánto le importa la producción?** y **¿cuánto le importa la gente?** El primer número es producción, el segundo es gente.'],
    scenes: [sc([
      head('Producción → · gente ↑'),
      box(40, 55, 170, 100, '1.9', { c: 'green', fs: 22, sub: 'club campestre', s: 1 }),
      box(390, 55, 170, 100, '9.9', { c: 'blue', fs: 22, sub: 'equipo: el ideal', s: 3 }),
      box(215, 170, 170, 100, '5.5', { c: 'yellow', fs: 22, sub: 'mitad de camino', s: 4 }),
      box(40, 285, 170, 100, '1.1', { c: 'gray', fs: 22, sub: 'empobrecida', s: 0 }),
      box(390, 285, 170, 100, '9.1', { c: 'red', fs: 22, sub: 'tareas / autoritaria', s: 2 }),
      txt(300, 418, 'primer número: producción · segundo: gente', { fs: 16, b: true, c: 'gray' }),
    ], [
      '**1.1, empobrecida**: poca preocupación por todo. El jefe que nunca está y hace lo mínimo.',
      '**1.9, club campestre**: mucha gente y poca producción. Evita conflictos y quiere caer bien aunque no se llegue a la meta.',
      '**9.1, dirección de tareas o autoritaria**: mucha producción y poca gente. Cronometra, controla y no escucha.',
      '**9.9, dirección de equipo**: lo máximo en las dos. Integra las tareas con las necesidades de las personas. Es el ideal del modelo.',
      '**5.5, mitad de camino o péndulo amortiguado**: equilibrio sin excelencia. Justo pero firme.',
    ])],
    points: [
      '**Estilos:** patrones de actuación que asume el líder para influir y dirigir.',
      '**Eje X:** preocupación por la producción. **Eje Y:** preocupación por la gente.',
      '**Transformacional:** inspira a trascender el interés propio con visión compartida, inspiración y estímulo intelectual.',
      '**Situacional (Hersey y Blanchard):** no hay un mejor estilo; el líder se adapta a la madurez (competencia y compromiso) del colaborador.',
    ],
    table: { head: ['Estilo', 'Producción', 'Gente', 'Frase'], rows: [['1.1 empobrecida', 'baja', 'baja', '"arréglense"'], ['1.9 club campestre', 'baja', 'alta', '"lo importante es llevarnos bien"'], ['5.5 mitad de camino', 'media', 'media', '"justo pero firme"'], ['9.1 tareas', 'alta', 'baja', '"cueste lo que cueste"'], ['9.9 equipo', 'alta', 'alta', '"lo logramos entre todos"']] },
    example: { title: 'dos capataces de Ñandú', body: ['Uno cronometra el envasado y no deja opinar: **9.1**. El otro organiza asados y nunca marca un error, aunque falten 300 paquetes: **1.9**. Si el primero se vuelve más participativo con los operarios expertos y sigue encima de los nuevos, aplica liderazgo **situacional**.'] },
    written: 'La rejilla administrativa de Blake y Mouton clasifica los estilos según la preocupación por la producción y por la gente: empobrecida (1.1), club campestre (1.9), mitad de camino (5.5), tareas o autoritaria (9.1) y equipo (9.9), considerado el ideal porque integra altos resultados con las necesidades de las personas.',
    trap: '**9.1 es tareas y 1.9 es club campestre.** El primer número siempre es la producción.',
  },
  {
    id: 'y4m', module, title: 'Motivación y pirámide de Maslow',
    lead: ['La motivación es el **porqué** de lo que hacemos: los factores que **ocasionan, canalizan y sostienen** la conducta. Maslow ordena las necesidades: primero las de abajo, después las de arriba.'],
    scenes: [
      flow('El ciclo de la motivación', [
        ['Necesidad', 'algo falta: tensión', 'Todo empieza con una **necesidad insatisfecha**, una privación que genera tensión.'],
        ['Impulso', 'ganas de resolverlo', 'La tensión se vuelve un **impulso** o motivo para actuar.'],
        ['Acciones', 'conducta hacia la meta', 'Se realizan **acciones** para alcanzar la meta.'],
        ['Satisfacción', 'baja el impulso, hasta la próxima', 'Con la **satisfacción** el impulso disminuye, hasta que aparece otra necesidad.'],
      ]),
      sc([
        head('Maslow: se sube desde la base'),
        box(15, 352, 570, 70, 'Fisiológicas', { c: 'red', fs: 19, sub: 'comer, descansar · sueldo', s: 0 }),
        box(60, 276, 480, 70, 'Seguridad', { c: 'orange', fs: 19, sub: 'empleo estable, obra social', s: 1 }),
        box(105, 200, 390, 70, 'Sociales', { c: 'yellow', fs: 19, sub: 'pertenencia, equipo', s: 2 }),
        box(150, 124, 300, 70, 'Estima', { c: 'green', fs: 19, sub: 'reconocimiento', s: 3 }),
        box(185, 48, 230, 70, 'Autorrealización', { c: 'blue', fs: 18, sub: 'desarrollo pleno', s: 4 }),
      ], [
        'En la base, las **fisiológicas**: comer, descansar. En el trabajo las cubre el salario.',
        'Después la **seguridad**: estabilidad laboral, ambiente seguro, cobertura médica.',
        'Las **sociales, de afiliación o pertenencia**: amistad, afecto, buen clima, equipo.',
        'La **estima**: logros propios y reconocimiento de los demás. Un ascenso, un premio.',
        'En la cima, la **autorrealización**: desplegar el potencial con desafíos y autonomía.',
      ]),
    ],
    points: [
      '**Motivación:** factores que ocasionan, canalizan y sostienen la conducta.',
      '**Ciclo:** necesidad → impulso → acciones → satisfacción.',
      '**Maslow, de abajo hacia arriba:** fisiológicas, seguridad, sociales, estima, autorrealización.',
    ],
    example: { title: 'qué necesidad cubre cada medida', body: ['Ñandú pasa contratados a planta permanente: **seguridad**. Arma un torneo interno: **sociales**. Premia al mejor turno en público: **estima**. Le da a una técnica el diseño de una línea nueva: **autorrealización**.'] },
    written: 'La motivación es el conjunto de factores que ocasionan, canalizan y sostienen la conducta. Según Maslow las necesidades están jerarquizadas y deben satisfacerse primero las básicas: fisiológicas, de seguridad, sociales o de afiliación, de estima y de autorrealización.',
    trap: 'Final: "¿cuál está **más cerca de la base**: estima, pertenencia, autorrealización o seguridad?" → **seguridad**, aunque la base sea fisiológicas.',
  },
  {
    id: 'y4t', module, title: 'Vroom, Skinner y tipos de recompensa',
    lead: ['Maslow dice **qué** necesita la gente. Estas teorías dicen **cómo decide esforzarse**: calculando si le conviene (Vroom) o aprendiendo de las consecuencias (Skinner).'],
    scenes: [flow('Vroom: ¿me esfuerzo por el bono?', [
      ['Expectativa', '¿si me esfuerzo, llego?', '**Expectativa**: si me esfuerzo, ¿puedo lograr el objetivo? Si la meta es imposible, no hay motivación.'],
      ['Instrumentalidad', '¿si llego, me lo dan?', '**Instrumentalidad**: si lo logro, ¿recibo la recompensa? Si la empresa nunca cumple, tampoco.'],
      ['Valencia', '¿me importa ese premio?', '**Valencia**: ¿valoro esa recompensa? Un premio que no me interesa no motiva.'],
      ['Producto', 'uno en cero → todo en cero', 'La motivación es el **producto** de las tres: si una vale cero, la motivación es nula.'],
    ])],
    points: [
      '**Expectativas (Vroom):** motivación = expectativa × instrumentalidad × valencia.',
      '**Reforzamiento (Skinner):** la conducta es función de sus consecuencias. Lo reforzado se repite; lo castigado o ignorado tiende a no repetirse (modificación de la conducta).',
      '**Extrínseca:** la da otro (dinero, ascenso). **Intrínseca:** sale de la tarea misma (logro, orgullo).',
    ],
    table: { head: ['Teoría', 'Pregunta', 'Autor'], rows: [['Necesidades', '¿qué le falta?', 'Maslow'], ['Expectativas', '¿le conviene esforzarse?', 'Vroom'], ['Reforzamiento', '¿qué pasó la última vez?', 'Skinner']] },
    example: { title: 'el bono de envasado', body: ['Hay bono por 10.000 paquetes diarios y la máquina hace 8.000: **expectativa cero**. Elogiar cada semana sin accidentes para que se repita: **reforzamiento positivo**. El orgullo de un paquete bien hecho: **intrínseca**.'] },
    written: 'Para Vroom la motivación es el producto de expectativa, instrumentalidad y valencia; si una es nula, no hay motivación. Para Skinner la conducta depende de sus consecuencias: la que recibe refuerzos positivos tiende a repetirse.',
  },
  {
    id: 'y4c', module, title: 'Comunicación organizacional',
    lead: ['Comunicar es **compartir significados con mensajes simbólicos**. Si el otro no responde, no sabés si entendió: por eso el proceso termina en la **retroalimentación**.'],
    scenes: [flow('Quién dice qué, cómo, a quién', [
      ['Emisor', 'quién: la gerenta', 'El **emisor** origina el mensaje.'],
      ['Mensaje', 'qué: cambia el horario', 'El **mensaje** es la información que se transmite.'],
      ['Medio', 'en qué forma: correo', 'El **medio** es el canal: oral, escrito, gráfico o digital.'],
      ['Receptor', 'a quién: el turno noche', 'El **receptor** recibe e interpreta el mensaje.'],
      ['Retroalimentación', 'con qué efecto: confirman', 'La **retroalimentación** es la respuesta que permite saber si se entendió.'],
    ])],
    points: [
      '**Tres puntos esenciales:** participan personas, se comparten significados y requiere símbolos.',
      '**Formal:** canales oficiales, respaldada por la gerencia. **Interna** o **externa** (clientes, proveedores).',
      '**Informal:** espontánea (pasillo, rumores). Puede desinformar, pero agiliza y une.',
      '**Vertical:** sube o baja por la cadena de mando.',
    ],
    table: { head: ['Caso', 'Tipo'], rows: [['acta de reunión', 'formal interna'], ['carta a un proveedor', 'formal externa'], ['rumor de ascensos', 'informal'], ['informe del supervisor al gerente', 'formal, vertical']] },
    written: 'La comunicación es el proceso por el cual se comparten significados mediante mensajes simbólicos. Sus elementos son emisor, mensaje, medio, receptor y retroalimentación. Puede ser formal (canales oficiales, interna o externa) o informal (espontánea).',
    trap: 'Final: "la respuesta que el receptor envía al emisor y garantiza la eficacia" → **retroalimentación**, no ruido ni filtro.',
  },
  {
    id: 'y4n', module, title: 'Conflicto y negociación',
    lead: ['Se negocia porque hay **conflicto**: un desacuerdo por recursos escasos, metas o valores. Lo que se pregunta es **reconocer el enfoque** por cómo se comporta la persona.'],
    scenes: [list('Ventas y Producción se disputan el camión', [
      ['Duro', '"es mío y punto"', '**Duro**: posición rígida, desconfianza y el único objetivo es ganar.'],
      ['Suave', '"llevátelo, no discutamos"', '**Suave**: evita el conflicto a toda costa, cede y ofrece hasta acordar.'],
      ['Por principios', '"¿para qué hora lo necesitás?"', '**Por principios, de Harvard**: se centra en los intereses de fondo y no en las posiciones. Busca ganar-ganar.'],
    ])],
    points: [
      '**Conflicto:** desacuerdo sobre recursos escasos o diferencias de metas o valores.',
      '**Negociación:** aplicar comunicación, liderazgo y motivación para manejar conflictos con resultados satisfactorios para ambas partes.',
      '**Duro:** ganar. **Suave:** no pelear. **Principios:** resolver los intereses de ambos.',
    ],
    example: { title: 'posición e interés', body: ['**Posición:** "quiero el camión el lunes". **Interés:** "el pedido tiene que llegar el martes a las 8". Mirando intereses aparece la salida: Producción lo usa de mañana y Ventas carga de noche.'] },
    written: 'La negociación es la aplicación de habilidades de comunicación, liderazgo y motivación para manejar un conflicto y obtener resultados satisfactorios para las partes. Puede ser dura, suave o basada en principios.',
  },
  {
    id: 'y4d', module, title: 'Proceso racional de toma de decisiones',
    lead: ['"Detalle las etapas" fue pregunta de desarrollo en un final. Son **cinco pasos del apunte**, en orden, más el seguimiento.'],
    scenes: [flow('Se rompe una secadora de Ñandú', [
      ['1 · Definir', 'se seca 30 % menos', '**Definir el problema**: decir con precisión qué hay que resolver.'],
      ['2 · Analizar', 'quemador vencido', '**Analizar el problema**: juntar información y entender causas y alcance.'],
      ['3 · Evaluar', 'reparar, comprar o tercerizar', '**Evaluar las alternativas**: generar opciones y valorar sus pros y contras.'],
      ['4 · Elegir', 'reparar', '**Elegir la alternativa** más efectiva y eficiente.'],
      ['5 · Aplicar', 'repararla y avisar', '**Aplicar la decisión** y comunicarla. Después se monitorea y se ajusta.'],
    ])],
    points: ['**Definir → analizar → evaluar → elegir → aplicar.**', 'Evaluar incluye **generar** las alternativas.', 'Cierra con **retroalimentación**: monitorear y ajustar.'],
    written: 'El proceso racional de toma de decisiones consta de: 1) **definir el problema**; 2) **analizarlo**, recopilando información sobre causas y alcance; 3) **evaluar las alternativas**, generándolas y valorando pros y contras; 4) **elegir la alternativa** más efectiva y eficiente; 5) **aplicar la decisión** y comunicarla. Luego se monitorean los resultados para ajustar.',
    trap: 'No te saltees **analizar**, que va antes de buscar soluciones.',
  },
];

const { mcq, tf } = asker(module);

export const M4_QUESTIONS: Question[] = [
  mcq('sym-m4-01', 'y4', 'Darle a un supervisor autoridad para aprobar compras, con su responsabilidad, es:', 'Delegación', ['Motivación', 'Negociación', 'Comunicación'], 'Delegar es asignar autoridad y responsabilidad.'),
  tf('sym-m4-02', 'y4', 'El liderazgo implica una distribución desigual del poder, aunque los seguidores también tienen poder.', true, 'Es una de las cuatro implicaciones del liderazgo según el apunte.'),
  mcq('sym-m4-03', 'y4l', 'Un jefe evita dar feedback negativo y prioriza el buen clima aunque no se cumplan las metas. Es:', 'Club campestre (1.9)', ['Tareas (9.1)', 'Equipo (9.9)', 'Empobrecida (1.1)'], 'Alta preocupación por la gente y baja por la producción.'),
  mcq('sym-m4-04', 'y4l', 'Adaptar el estilo a la madurez de cada colaborador es liderazgo:', 'Situacional', ['Transformacional', 'Autoritario', 'De mitad de camino'], 'Hersey y Blanchard: no existe un único mejor estilo.'),
  mcq('sym-m4-05', 'y4m', '¿Cuál está más cerca de la base de Maslow?', 'Seguridad', ['Estima', 'Pertenencia', 'Autorrealización'], 'Seguridad es el segundo escalón; las otras tres están más arriba.', F),
  mcq('sym-m4-06', 'y4m', 'Un premio público al mejor empleado satisface una necesidad de:', 'Estima', ['Seguridad', 'Afiliación', 'Autorrealización'], 'El reconocimiento de los demás es estima.'),
  mcq('sym-m4-07', 'y4t', 'El bono es atractivo y lo pagan, pero nadie cree posible llegar. Falla la:', 'Expectativa', ['Valencia', 'Instrumentalidad', 'Retroalimentación'], 'Expectativa: si me esfuerzo, ¿puedo lograrlo?'),
  mcq('sym-m4-08', 'y4t', 'El orgullo por resolver un problema difícil es una recompensa:', 'Intrínseca', ['Extrínseca', 'Negativa', 'Formal'], 'Surge de la tarea misma, no la da un tercero.'),
  mcq('sym-m4-09', 'y4c', 'La respuesta del receptor al emisor que asegura la eficacia de la comunicación es:', 'La retroalimentación', ['El ruido', 'El filtro', 'El medio'], 'Cierra el circuito y muestra si el mensaje se entendió.', F),
  mcq('sym-m4-10', 'y4n', 'Buscar una solución que cubra los intereses de fondo de las dos partes es negociar:', 'Por principios', ['Duro', 'Suave', 'De forma informal'], 'Harvard: intereses y no posiciones, ganar-ganar.'),
  mcq('sym-m4-11', 'y4d', 'Ya definiste el problema. ¿Qué sigue en el proceso racional?', 'Analizar sus causas y alcance', ['Elegir una alternativa', 'Aplicar la decisión', 'Comunicar la solución'], 'Definir → analizar → evaluar → elegir → aplicar.', F),
];

export const M4_MAP: ConceptMap = {
  module, root: 'La dirección',
  branches: [
    { t: 'Habilidades del líder', d: 'liderar, motivar, comunicar, delegar, negociar, decidir', topic: 'y4', kids: [
      { rel: 'lidera con un', t: 'Estilo', d: 'rejilla 1.1, 1.9, 5.5, 9.1, 9.9 · transformacional · situacional', topic: 'y4l' },
    ] },
    { t: 'Motivación', d: 'ocasiona, canaliza y sostiene la conducta', topic: 'y4m', kids: [
      { rel: 'según necesidades', t: 'Maslow', d: 'fisiológicas, seguridad, sociales, estima, autorrealización', topic: 'y4m' },
      { rel: 'según el proceso', t: 'Vroom y Skinner', d: 'expectativa × instrumentalidad × valencia · consecuencias', topic: 'y4t' },
    ] },
    { t: 'Comunicación', d: 'emisor, mensaje, medio, receptor, retroalimentación', topic: 'y4c' },
    { t: 'Conflictos', d: 'negociar: duro, suave o por principios', topic: 'y4n' },
    { t: 'Decisiones', d: 'definir → analizar → evaluar → elegir → aplicar', topic: 'y4d' },
  ],
  links: ['Liderar usa las **fuentes del poder** y delegar distribuye **autoridad** (Módulo 3).', 'Decidir y corregir reaparece en el **control** (Módulo 5).', 'La comunicación se amplía en el **Módulo 12**.'],
};
