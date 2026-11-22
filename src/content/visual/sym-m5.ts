/**
 * SyM · Módulo 5 (La planificación y el control), tema por tema.
 * Fuentes revisadas (privadas): apunte "La planificación y el control en la gestión organizacional", presentación,
 * introducción del módulo y finales anteriores. Redacción y diagramas propios. Empresa ficticia: Yerbatera Ñandú.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { box, head } from './h';
import { asker, cards, flow, list, sc, VIDEO_NOTE } from './kit';

const module = 'm5';
const F = 'final anterior (Drive de estudiantes)';

export const M5_THEORY: TheoryBlock[] = [
  {
    id: 'y5', module, title: 'Planificar: misión, visión y metas', videoNote: VIDEO_NOTE,
    lead: ['Planificar es **construir el futuro deseado**: decidir a dónde ir (objetivos) y cómo llegar (estrategias y planes). Todo cuelga de tres cosas: por qué existo, qué quiero ser y qué resultado concreto busco.'],
    scenes: [flow('Del propósito al número', [
      ['Misión', 'hacer yerba de calidad para el país', 'La **misión** es la razón de ser: qué hace, para quién y cómo. Justifica la existencia de la organización.'],
      ['Visión', 'ser la orgánica líder de la región', 'La **visión** es lo que aspira a ser en el futuro, una imagen que inspira.'],
      ['Metas', '+10 % de exportación en un año', 'Las **metas y objetivos** son resultados concretos, medibles y con plazo.'],
      ['Planes', 'quién hace qué y cuándo', 'La **planificación** traza el camino considerando los recursos y el entorno. Es continua.'],
    ])],
    points: [
      '**Planificación organizacional:** proceso sistemático y continuo de fijar objetivos y trazar cómo alcanzarlos, según recursos y entorno.',
      '**Misión:** razón de ser, basada en premisas y valores. **Visión:** lo que aspira a ser.',
      '**Las metas importan por cuatro motivos:** dan sentido de dirección, enfocan los esfuerzos, guían planes y decisiones, y sirven para evaluar el avance.',
    ],
    table: { head: ['', 'Responde', 'Tiempo'], rows: [['Misión', '¿para qué existimos?', 'hoy'], ['Visión', '¿qué queremos ser?', 'futuro'], ['Meta', '¿qué resultado y para cuándo?', 'con plazo']] },
    written: 'La planificación es el proceso sistemático y continuo de establecer objetivos y trazar el camino para alcanzarlos, considerando los recursos y el entorno. Se guía por la misión (razón de ser), la visión (lo que aspira a ser) y las metas (resultados medibles con plazo).',
    trap: 'Misión es **presente**, visión es **futuro**.',
  },
  {
    id: 'y5n', module, title: 'Planes: estratégico, táctico y operativo',
    lead: ['Es una misma decisión bajando por la pirámide: cada escalón la hace **más corta, más detallada y más programada**.'],
    scenes: [sc([
      head('La misma decisión, tres niveles'),
      box(170, 52, 260, 112, 'Estratégico', { c: 'purple', fs: 19, sub: 'alta dirección · 3 a 5 años o más · exportar a Europa', s: 0 }),
      box(95, 176, 410, 112, 'Táctico', { c: 'blue', fs: 19, sub: 'gerentes de área · 1 a 3 años · plan de marketing para España', s: 1 }),
      box(15, 300, 570, 112, 'Operativo', { c: 'green', fs: 19, sub: 'supervisores · hasta 1 año · turnos de envasado de la semana', s: 2 }),
    ], [
      '**Estratégico**: el plan maestro de toda la organización. Lo hace la alta dirección, a largo plazo, con decisiones complejas y **no programadas**.',
      '**Táctico**: traduce la estrategia para cada área. Gerentes medios, mediano plazo, decisiones **programadas y no programadas**.',
      '**Operativo**: el cómo hacer de todos los días. Primera línea, corto plazo, muy detallado, decisiones **mayormente programadas**.',
    ])],
    points: [
      '**Decisión programada:** rutinaria, con regla o procedimiento. **No programada:** nueva o compleja.',
      '**Jerarquía de los planes:** los operativos respaldan a los tácticos y estos a los estratégicos.',
    ],
    table: { head: ['Nivel', 'Quién', 'Plazo', 'Decisiones'], rows: [['Estratégico', 'alta dirección', '3–5 años o más', 'no programadas'], ['Táctico', 'mandos medios', '1–3 años', 'ambas'], ['Operativo', 'supervisores', 'hasta 1 año', 'programadas']] },
    written: 'Existen tres niveles de planes: **estratégico** (alta dirección, largo plazo, toda la organización, decisiones no programadas), **táctico** (mandos medios, mediano plazo, por área, decisiones de ambos tipos) y **operativo** (primera línea, corto plazo, tareas cotidianas, decisiones programadas).',
    trap: 'Estos son niveles de **planes**. Los niveles de **estrategia** son otros tres (tema siguiente).',
  },
  {
    id: 'y5e', module, title: 'Administración estratégica y niveles de estrategia',
    lead: ['La administración estratégica es **más amplia que planificar**: incluye formular, implementar y evaluar. Su esencia es **adaptar lo de adentro a lo que cambia afuera**.'],
    scenes: [list('¿Para quién es la estrategia?', [
      ['Corporativo', 'todo el grupo: ¿en qué negocios estar?', '**Corporativo**: la alta dirección supervisa los intereses de una corporación con varios negocios.'],
      ['Unidad de negocio', 'solo la yerba: ¿cómo competir?', '**Unidad de negocios**: alcanzar las metas de un negocio concreto.'],
      ['Funcional', 'un área: ¿cómo aporta Marketing?', '**Funcional**: un área de funciones pone en práctica la estrategia de su negocio.'],
    ])],
    points: [
      '**Administración estratégica:** arte y ciencia de formular, implementar y evaluar decisiones multifuncionales para alcanzar los objetivos; adapta recursos y habilidades al entorno cambiante.',
      '**Proceso:** 1) planificación estratégica (metas y estrategias); 2) implantación (administración y control estratégico).',
      '**Tres niveles de estrategia:** corporativo, de unidad de negocios y funcional.',
      '**Pensamiento sistémico (Senge):** une el diagnóstico con el control; mira el todo, las interrelaciones y las causas profundas.',
    ],
    example: { title: 'Grupo Ñandú', body: ['Entrar al negocio del té: **corporativo**. Que la yerba compita por calidad orgánica: **unidad de negocio**. Que RR. HH. capacite en certificación orgánica: **funcional**.'] },
    written: 'La administración estratégica formula, implementa y evalúa decisiones multifuncionales para alcanzar los objetivos, adaptando recursos y habilidades al entorno cambiante. La estrategia tiene tres niveles: corporativo, de unidad de negocios y funcional.',
    trap: 'Final: "los niveles de estrategia son: 2, 3, 4 o 5" → **3**.',
  },
  {
    id: 'y5f', module, title: 'Análisis FODA',
    lead: ['"Explique la matriz FODA" salió de desarrollo. Son dos preguntas: **¿es de adentro o de afuera?** y **¿ayuda o perjudica?**'],
    scenes: [cards('FODA de Ñandú', [
      ['Fortalezas', 'interno y a favor: marca reconocida', '**Fortalezas**: atributos internos que dan ventaja, como una marca reconocida.'],
      ['Debilidades', 'interno y en contra: poca publicidad', '**Debilidades**: atributos internos que dejan en desventaja, como la poca presencia publicitaria.'],
      ['Oportunidades', 'externo y a favor: crece la demanda', '**Oportunidades**: factores del entorno que se pueden aprovechar.'],
      ['Amenazas', 'externo y en contra: nuevos rivales', '**Amenazas**: factores del entorno que pueden perjudicar, como competidores más tecnificados.'],
    ])],
    points: [
      '**Internos** (la empresa los controla): fortalezas y debilidades.',
      '**Externos** (no los controla): oportunidades y amenazas.',
      'No es solo listar: es **formular estrategias** cruzando los cuadrantes.',
    ],
    table: { head: ['Cruce', 'Estrategia'], rows: [['F + O', 'usar fortalezas para aprovechar oportunidades'], ['D + O', 'superar debilidades con las oportunidades'], ['F + A', 'usar fortalezas para mitigar amenazas'], ['D + A', 'reducir debilidades y evitar amenazas']] },
    written: 'La matriz FODA analiza la situación competitiva con factores internos, **fortalezas** (ventajas propias) y **debilidades** (desventajas propias), y externos, **oportunidades** (factores favorables del entorno) y **amenazas** (desfavorables). Su objetivo es formular estrategias que usen las fortalezas para aprovechar oportunidades y mitigar amenazas, y que reduzcan las debilidades.',
    trap: 'FODA diagnostica la situación. "Analizar las **fuerzas competitivas**" es **Porter** (Módulo 1): esa trampa salió en el final.',
  },
  {
    id: 'y5v', module, title: 'Cadena de valor',
    lead: ['Porter parte la empresa en actividades para ver **dónde se crea valor**: las que tocan el producto o al cliente (**primarias**) y las que las sostienen (**apoyo**).'],
    scenes: [
      flow('Primarias: el camino de la yerba', [
        ['Logística interna', 'recibir y guardar hoja verde', '**Logística interna**: recepción, almacenamiento y gestión de insumos.'],
        ['Operaciones', 'secar, moler, envasar', '**Operaciones**: transformar los insumos en producto final.'],
        ['Logística externa', 'distribuir pedidos', '**Logística externa**: procesar pedidos, almacenar y distribuir lo terminado.'],
        ['Marketing y ventas', 'publicidad y vendedores', '**Marketing y ventas**: persuadir a los clientes de comprar.'],
        ['Posventa', 'atender reclamos', '**Servicios posventa**: apoyo al cliente después de la compra.'],
      ]),
      cards('De apoyo: sostienen a las primarias', [
        ['Infraestructura', 'finanzas, contabilidad', '**Infraestructura**: planificación, finanzas, contabilidad.'],
        ['RR. HH.', 'selección, capacitación', '**Gestión de recursos humanos**: reclutar, capacitar, remunerar.'],
        ['Tecnología', 'I+D, diseño', '**Desarrollo de tecnología**: investigación, desarrollo y diseño.'],
        ['Compras', 'adquirir insumos', '**Compras o abastecimiento**: adquirir lo necesario.'],
      ]),
    ],
    points: [
      '**Cinco primarias:** logística interna, operaciones, logística externa, marketing y ventas, posventa.',
      '**Cuatro de apoyo:** infraestructura, RR. HH., tecnología, compras.',
      '**Sirve para:** encontrar fuentes de ventaja competitiva y optimizar procesos.',
    ],
    written: 'La cadena de valor de Porter describe las actividades que crean valor para el cliente. Las primarias son logística interna, operaciones, logística externa, marketing y ventas, y servicio posventa. Las de apoyo son infraestructura, recursos humanos, desarrollo tecnológico y abastecimiento.',
    trap: '**Compras es de apoyo**; recibir y almacenar lo comprado es primaria.',
  },
  {
    id: 'y5c', module, title: 'El control y sus cuatro fases',
    lead: ['Control es **comparar lo que pasó con lo planeado y corregir**. Sin él planificar no sirve: el mejor plan se desvía y el ambiente cambia.'],
    scenes: [flow('Meta: vender 10 % más', [
      ['1 · Parámetros', 'indicador: % de crecimiento', '**Establecer parámetros**: los estándares salen de los objetivos del plan.'],
      ['2 · Medir', 'crecimos 8 %', '**Medir los resultados**: recopilar el desempeño real.'],
      ['3 · Evaluar', 'desvío: −2 puntos', '**Evaluar**: comparar lo real con el estándar y detectar la desviación.'],
      ['4 · Retroalimentar', 'más promociones el próximo trimestre', '**Retroalimentar**: tomar medidas correctivas o ajustar el plan. Y el ciclo vuelve a empezar.'],
    ])],
    points: [
      '**Control:** proceso de establecer normas y métodos para medir el desempeño y asegurar que lo real se ajuste a lo proyectado.',
      '**Por qué hace falta:** los planes se desvían y hay que vigilar los cambios del ambiente.',
      '**Cuatro fases (Mockler):** establecer parámetros, medir, evaluar, retroalimentar.',
      '**Niveles de control:** corporativo, divisional, funcional e individual.',
      '**Control estratégico:** evalúa si se logran eficiencia, calidad, innovación y satisfacción del cliente superiores.',
    ],
    written: 'El control es el proceso que asegura que las actividades reales se ajusten a las planificadas. Se necesita porque los planes pueden desviarse y el ambiente cambia. Sus fases son: establecer los parámetros de medición, medir los resultados, evaluarlos comparándolos con los parámetros y retroalimentar con acciones correctivas.',
    trap: 'Final: "dos de las cuatro fases" → **medir** y **evaluar**. Establecer la misión y contratar auditorías **no** son fases.',
  },
  {
    id: 'y5t', module, title: 'Controles: financieros, presupuesto y auditorías',
    lead: ['Tres herramientas que se distinguen por **qué miran**: la contabilidad, el plan en plata o la verificación formal.'],
    scenes: [list('¿Qué mira cada control?', [
      ['Financiero', 'balance, estado de resultados', '**Financieros**: usan información contable. El balance muestra activos, pasivos y patrimonio en un momento; el estado de resultados, ingresos y egresos de un período.'],
      ['Presupuestario', 'real contra proyectado', '**Presupuestarios**: comparan lo real con lo presupuestado de ingresos, egresos, compras y utilidades.'],
      ['Auditoría externa', 'independientes: ¿son ciertos los números?', '**Auditoría externa**: auditores independientes verifican los estados financieros.'],
      ['Auditoría interna', 'propios: ¿funcionan los procesos?', '**Auditoría interna**: personal de la empresa evalúa procesos, políticas, calidad, gestión y sistemas.'],
    ])],
    points: [
      '**Financiero:** análisis monetario de lo que entra y sale.',
      '**Presupuesto:** estado cuantitativo formal de los recursos asignados a lo proyectado para un plazo.',
      '**Auditoría:** verificación formal y sistemática, interna o externa.',
    ],
    table: { head: ['Caso', 'Control'], rows: [['leer el balance', 'financiero'], ['gastamos 12 % más de lo previsto', 'presupuestario'], ['un estudio revisa los estados contables', 'auditoría externa'], ['Calidad revisa si se cumple el manual', 'auditoría interna']] },
  },
  {
    id: 'y5b', module, title: 'Balanced Scorecard',
    lead: ['El tablero de control existe porque **mirar solo la plata llega tarde**. Traduce la visión y la estrategia en indicadores de **cuatro perspectivas equilibradas**.'],
    scenes: [cards('Visión y estrategia, desde cuatro lados', [
      ['Financiera', '¿cómo nos ven los inversores?', '**Financiera**: cómo aparecer ante los inversores. Rentabilidad, crecimiento de ingresos.'],
      ['Cliente', '¿cómo nos ven los clientes?', '**Cliente**: cómo ser vistos por los clientes. Satisfacción, cuota de mercado.'],
      ['Procesos internos', '¿en qué procesos sobresalir?', '**Procesos internos**: en qué procesos sobresalir para satisfacer al cliente. Calidad, eficiencia.'],
      ['Aprendizaje', '¿cómo seguimos mejorando?', '**Aprendizaje y crecimiento**: cómo sostener la capacidad de cambiar. Capacitación, cultura, tecnología.'],
    ])],
    points: ['**Herramienta de control estratégico.**', '**Financiera, cliente, procesos internos, aprendizaje y crecimiento.**', 'Alinea los esfuerzos con los objetivos de largo plazo.'],
    written: 'El Balanced Scorecard o cuadro de mando integral es una herramienta de control estratégico que traduce la visión y la estrategia en objetivos e indicadores desde cuatro perspectivas equilibradas: financiera, del cliente, de procesos internos, y de aprendizaje y crecimiento.',
    trap: 'Las horas de capacitación son **aprendizaje y crecimiento**, no procesos internos.',
  },
];

const { mcq, tf } = asker(module);

export const M5_QUESTIONS: Question[] = [
  mcq('sym-m5-01', 'y5', '"Ser la marca orgánica líder de la región en diez años" es:', 'La visión', ['La misión', 'Un plan operativo', 'Un control'], 'Describe lo que la organización aspira a ser.'),
  mcq('sym-m5-02', 'y5n', 'Organizar los turnos de envasado de la próxima semana es planificación:', 'Operativa', ['Táctica', 'Estratégica', 'Corporativa'], 'Corto plazo, primera línea y tareas cotidianas.'),
  mcq('sym-m5-03', 'y5n', 'Las decisiones programadas y no programadas conviven típicamente en el nivel:', 'Táctico', ['Operativo', 'Estratégico', 'Técnico de primera línea'], 'El estratégico es no programado y el operativo, mayormente programado.'),
  mcq('sym-m5-04', 'y5e', 'Los niveles de estrategia son:', 'Tres: corporativo, de negocio y funcional', ['Dos: estratégico y operativo', 'Cuatro: los del Balanced Scorecard', 'Cinco: los de Porter'], 'El apunte define tres niveles de estrategia.', F),
  mcq('sym-m5-05', 'y5f', 'Que un producto sea fácil de imitar es, en el FODA:', 'Una debilidad', ['Una amenaza', 'Una oportunidad', 'Una fortaleza'], 'Es un atributo propio (interno) que pone en desventaja.'),
  mcq('sym-m5-06', 'y5v', '¿Cuál es una actividad de apoyo en la cadena de valor?', 'Compras', ['Operaciones', 'Logística externa', 'Servicio posventa'], 'Compras es abastecimiento, de apoyo. Las otras son primarias.'),
  mcq('sym-m5-07', 'y5c', '¿Qué par pertenece a las cuatro fases del proceso de control?', 'Medir y evaluar los resultados', ['Fijar la misión y medir', 'Contratar auditorías y evaluar', 'Fijar la visión y delegar'], 'Parámetros, medir, evaluar, retroalimentar.', F),
  tf('sym-m5-08', 'y5c', 'El control se necesita tanto porque los planes se desvían como para vigilar los cambios del ambiente.', true, 'En el final la correcta era "todas las anteriores" con esas dos razones.', F),
  mcq('sym-m5-09', 'y5t', 'Comparar las compras reales con las proyectadas es un control:', 'Presupuestario', ['De auditoría externa', 'De calidad', 'Informal'], 'Compara lo real contra el presupuesto.'),
  mcq('sym-m5-10', 'y5b', 'Las horas de capacitación por empleado pertenecen a la perspectiva:', 'Aprendizaje y crecimiento', ['Financiera', 'Cliente', 'Procesos internos'], 'Miden la capacidad de cambiar y mejorar.'),
  tf('sym-m5-11', 'y5b', 'El Balanced Scorecard contempla el desempeño desde cuatro perspectivas equilibradas.', true, 'Financiera, cliente, procesos internos, y aprendizaje y crecimiento.', F),
];

export const M5_MAP: ConceptMap = {
  module, root: 'Planificación y control',
  branches: [
    { t: 'Planificar', d: 'a dónde y cómo', kids: [
      { rel: 'parte de', t: 'Misión, visión y metas', topic: 'y5' },
      { rel: 'baja en', t: 'Tres tipos de planes', d: 'estratégico, táctico, operativo', topic: 'y5n' },
      { rel: 'dentro de la', t: 'Administración estratégica', d: 'corporativo, negocio, funcional', topic: 'y5e' },
    ] },
    { t: 'Diagnosticar', kids: [
      { t: 'FODA', d: 'interno F y D · externo O y A', topic: 'y5f' },
      { t: 'Cadena de valor', d: '5 primarias y 4 de apoyo', topic: 'y5v' },
    ] },
    { t: 'Controlar', d: 'parámetros → medir → evaluar → retroalimentar', topic: 'y5c', kids: [
      { rel: 'con', t: 'Financieros, presupuesto, auditorías', topic: 'y5t' },
      { rel: 'en forma integral con', t: 'Balanced Scorecard', d: 'cuatro perspectivas', topic: 'y5b' },
    ] },
  ],
  links: ['**Porter** firma la cadena de valor y las **cinco fuerzas** (Módulo 1): son herramientas distintas.', 'El pensamiento sistémico de **Senge** viene del Módulo 1 y sigue en el 7.'],
};
