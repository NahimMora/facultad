/**
 * SyM · Módulo 1 (Tipos de organización), reescrito tema por tema.
 * Fuentes revisadas (privadas): apunte "Tipos de organización", presentación "La organización",
 * "La organización · tipos de estructura", "Introducción a SyM" y un final 2023 de estudiantes.
 * Redacción y diagramas propios. Empresa ficticia que conecta los temas: Yerbatera Ñandú (Misiones).
 */
import type { Question, TheoryBlock } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, scene, txt, tree } from './h';

const W = 600, H = 440;
const sc = (items: Parameters<typeof scene>[0], say: string[]): VisScene => scene(items, say, W, H);

const AP = 'apunte del módulo 1';
const F23 = 'final 2023 (Drive de estudiantes)';

export const M1_THEORY: TheoryBlock[] = [
  {
    id: 'y1o', module: 'm1', title: 'La organización y cómo se mide su desempeño',
    lead: [
      'Una **organización** son dos o más personas que trabajan de forma **coordinada y estructurada** para alcanzar metas. No importa si es una pyme, un club o un ministerio: todas tienen una **meta**, un **plan** para llegar y **recursos** que consiguen y asignan.',
      'La **administración** es el proceso que la hace funcionar: **planificar, organizar, dirigir y controlar**. El **gerente** es quien conduce esas actividades. Y para saber si lo hace bien, la materia usa dos medidas que no son lo mismo: **eficacia** y **eficiencia**.',
    ],
    scenes: [
      sc([
        head('Qué es una organización'),
        box(190, 50, 220, 70, 'Organización', { c: 'blue', fs: 22, sub: '2 o más personas, coordinadas', id: 'o' }),
        box(30, 170, 160, 70, 'Meta', { c: 'green', fs: 20, sub: 'el fin que persigue', id: 'm', s: 1 }),
        box(220, 170, 160, 70, 'Plan o método', { c: 'green', fs: 18, sub: 'cómo llegar', id: 'p', s: 1 }),
        box(410, 170, 160, 70, 'Recursos', { c: 'green', fs: 20, sub: 'se consiguen y asignan', id: 'r', s: 1 }),
        arr('o', 'm', { s: 1 }), arr('o', 'p', { s: 1 }), arr('o', 'r', { s: 1 }),
        txt(300, 280, 'Administración: el gerente…', { fs: 17, b: true, c: 'gray', s: 2 }),
        ...['Planificar', 'Organizar', 'Dirigir', 'Controlar'].map((t, i) => box(20 + i * 145, 295, 130, 50, t, { c: 'purple', fs: 17, s: 2 })),
        box(20, 365, 560, 60, 'Organización y Métodos (O&M)', { c: 'orange', fs: 18, sub: 'analiza estructura y procedimientos para optimizar la administración', s: 3 }),
      ], [
        'Una organización no es un edificio ni un organigrama: son **personas coordinadas** detrás de un objetivo común.',
        'Toda organización comparte tres rasgos: tiene una **meta**, un **plan o método** para alcanzarla, y **consigue y asigna recursos** (dinero, gente, equipos, información).',
        'La **administración** es el proceso de **planificar, organizar, dirigir y controlar** el trabajo y los recursos. El **gerente** es quien lo conduce. Cada una de esas actividades tiene su propio módulo en la materia.',
        'La función de **Organización y Métodos** (de ahí el nombre de la materia) analiza los problemas de **estructura** y de **procedimientos** de la empresa para optimizar su funcionamiento administrativo.',
      ]),
      sc([
        head('Eficacia y eficiencia: dos preguntas distintas'),
        txt(20, 70, '¿Es el objetivo correcto? → EFICACIA', { anchor: 'start', fs: 16, b: true, c: 'green' }),
        txt(20, 96, '¿Usa pocos recursos? → EFICIENCIA', { anchor: 'start', fs: 16, b: true, c: 'cyan' }),
        txt(150, 130, 'derrocha recursos', { fs: 14, c: 'gray' }), txt(440, 130, 'ahorra recursos', { fs: 14, c: 'gray' }),
        box(20, 145, 270, 130, 'Eficaz, no eficiente', { c: 'yellow', fs: 17, sub: 'el producto se vende, pero cuesta tanto que no deja ganancia', s: 2 }),
        box(310, 145, 270, 130, 'Eficaz y eficiente', { c: 'green', fs: 18, sub: 'el objetivo correcto, al menor costo: la meta', s: 3, hl: [3] }),
        box(20, 290, 270, 130, 'Ni una ni otra', { c: 'gray', fs: 17, sub: 'producto equivocado y caro' }),
        box(310, 290, 270, 130, 'Eficiente, no eficaz', { c: 'red', fs: 17, sub: 'lo fabrica barato… pero nadie lo quiere', s: 1 }),
      ], [
        'Son dos preguntas diferentes. **Eficacia**: ¿elegiste y lograste el objetivo correcto? ("hacer lo que se debe hacer"). **Eficiencia**: ¿usaste la menor cantidad de recursos? ("hacerlo al menor costo").',
        '**Eficiente sin ser eficaz**: una empresa desarrolla una app con muy pocos recursos, pero el mercado no la necesita. Ahorró, pero hizo lo equivocado.',
        '**Eficaz sin ser eficiente**: logra el resultado correcto (el producto se vende), pero gastando de más. Si cuesta tanto que no deja ganancia, tampoco sirve.',
        'La clave del desempeño es lograr las dos **a la vez**. Por eso la materia define el desempeño gerencial y el organizacional como una medida de **eficiencia y eficacia** juntas.',
      ]),
    ],
    points: [
      '**Organización**: dos o más personas que trabajan juntas, coordinadas y de forma estructurada, para alcanzar una o varias metas. Rasgos comunes: meta, plan o método, y recursos.',
      '**Administración**: planificar, organizar, dirigir y controlar el trabajo y los recursos para alcanzar las metas de forma eficiente y eficaz. **Gerente**: quien dirige esas actividades.',
      '**Eficacia** = determinar y lograr los objetivos apropiados ("hacer lo que se debe hacer"). **Eficiencia** = minimizar los recursos usados ("hacer al menor costo").',
      '**Desempeño** gerencial u organizacional: medida de la eficiencia **y** la eficacia.',
      '**Procedimiento**: serie detallada de instrucciones para acciones que se repiten con regularidad. **Método**: manera ordenada de proceder.',
      '**Función de Organización y Métodos**: analiza problemas de estructura y procedimientos para optimizar la infraestructura administrativa.',
    ],
    example: { title: 'Yerbatera Ñandú', body: [
      'Ñandú envasa 10.000 paquetes por día. Antes necesitaba 100 horas-hombre; después de reordenar la línea de envasado lo hace con 80. Mismo resultado con menos recursos: ganó **eficiencia**.',
      'Ese mismo año lanzó una yerba saborizada a frutilla, producida muy barato, que casi nadie compró. Fue **eficiente pero no eficaz**: el objetivo (ese producto para ese mercado) era el equivocado.',
    ] },
    written: 'La **eficacia** es la capacidad de determinar y alcanzar los objetivos apropiados ("hacer lo que se debe hacer"); la **eficiencia**, la de lograrlos usando la menor cantidad de recursos ("hacerlo al menor costo"). Una organización puede ser eficiente sin ser eficaz si produce barato algo que nadie necesita; el buen desempeño exige ambas.',
    trap: 'Si el caso habla de **recursos, costos u horas**, pregunta por eficiencia. Si habla de **elegir o lograr el objetivo correcto**, por eficacia.',
  },
  {
    id: 'y1e', module: 'm1', title: 'El entorno y las cinco fuerzas de Porter',
    lead: [
      'Ninguna organización es una isla. Su **entorno** son los elementos externos que pueden modificar sus objetivos. La materia lo divide en dos niveles según **cuánto puede hacer la empresa frente a ellos**.',
      'Para analizar la competencia dentro del sector, Michael Porter propuso **cinco fuerzas**. Es la lista que más se pregunta, junto con la trampa de qué **no** es una fuerza.',
    ],
    scenes: [
      sc([
        head('Microambiente y macroambiente'),
        box(15, 46, 570, 388, '', { c: 'purple', dash: true }),
        txt(300, 68, 'MACROAMBIENTE · la empresa solo puede adaptarse', { fs: 15, b: true, c: 'purple', s: 2 }),
        box(95, 90, 410, 250, '', { c: 'blue' }),
        txt(300, 112, 'MICROAMBIENTE · la empresa puede decidir', { fs: 15, b: true, c: 'blue', s: 1 }),
        box(220, 180, 160, 70, 'Ñandú', { c: 'green', fs: 22, solid: true }),
        box(110, 130, 120, 44, 'Clientes', { c: 'blue', fs: 15, s: 1 }),
        box(370, 130, 120, 44, 'Proveedores', { c: 'blue', fs: 15, s: 1 }),
        box(110, 280, 120, 44, 'Competencia', { c: 'blue', fs: 15, s: 1 }),
        box(345, 280, 150, 44, 'Grupos reguladores', { c: 'blue', fs: 14, s: 1 }),
        ...[['Económicas', 30, 360], ['Político-legales', 175, 360], ['Socioculturales', 320, 360], ['Tecnológicas', 465, 360]].map(([t, x, y]) => box(x as number, (y as number) - 8, 110, 50, t as string, { c: 'purple', fs: 13, s: 2 })),
        txt(300, 418, '+ ecológicas (ambiente, sustentabilidad)', { fs: 13, c: 'purple', s: 2 }),
      ], [
        'En el centro está la organización. Todo lo que la rodea y puede cambiar sus objetivos es su **entorno**.',
        'El **microambiente** (ambiente de operaciones) son los actores cercanos: **clientes, proveedores, competencia y grupos reguladores** (organismos de control, sindicatos, grupos de interés). Frente a ellos la empresa **puede tomar decisiones**: negociar, elegir otro proveedor, cambiar precios.',
        'El **macroambiente** (ambiente general) son fuerzas amplias que afectan a todos: **económicas, político-legales, socioculturales, tecnológicas y ecológicas**. La empresa no las controla: **solo debe cumplirlas o adaptarse**. Una ley nueva o la inflación son ejemplos.',
      ]),
      sc([
        head('Las cinco fuerzas de Porter'),
        box(200, 170, 200, 90, 'Rivalidad entre competidores', { c: 'red', fs: 18, id: 'r' }),
        box(200, 45, 200, 70, 'Nuevos participantes', { c: 'orange', fs: 17, sub: 'amenaza de entrada', id: 'n', s: 1 }),
        box(200, 315, 200, 70, 'Sustitutos', { c: 'orange', fs: 18, sub: 'otra forma de cubrir la necesidad', id: 'su', s: 1 }),
        box(15, 175, 150, 80, 'Proveedores', { c: 'purple', fs: 17, sub: 'poder de negociación', id: 'p', s: 2 }),
        box(435, 175, 150, 80, 'Clientes', { c: 'purple', fs: 17, sub: 'poder de negociación', id: 'c', s: 2 }),
        arr('n', 'r', { s: 1 }), arr('su', 'r', { s: 1 }), arr('p', 'r', { s: 2 }), arr('c', 'r', { s: 2 }),
        box(420, 335, 170, 90, '✘ Grupos reguladores', { c: 'gray', fs: 15, sub: 'son microambiente, pero NO una fuerza de Porter', s: 3, dash: true }),
      ], [
        'En el centro, la fuerza que todas alimentan: la **rivalidad entre los competidores tradicionales** del sector. Para Ñandú, las otras yerbateras grandes que pelean por la misma góndola.',
        'Dos **amenazas**: los **nuevos participantes** (una marca nueva de yerba orgánica que entra al mercado) y los **sustitutos**, productos de otro sector que cubren la misma necesidad (café, té, energizantes).',
        'Dos **poderes de negociación**: el de los **proveedores** (los productores de hoja verde pueden imponer precio) y el de los **clientes** (una gran cadena de supermercados exige descuentos y plazos de pago).',
        'Trampa clásica: los **grupos reguladores** forman parte del microambiente, pero **no son una de las cinco fuerzas**. Si la pregunta dice "¿cuál no es una fuerza?", casi siempre es esa.',
      ]),
    ],
    points: [
      '**Entorno**: elementos externos que pueden modificar o cambiar los objetivos de la organización.',
      '**Microambiente** (específico u operativo): clientes, proveedores, competencia y grupos reguladores. La empresa puede tomar decisiones frente a ellos.',
      '**Macroambiente** (general): fuerzas económicas, político-legales, socioculturales, tecnológicas y ecológicas. La empresa solo puede cumplirlas o adaptarse.',
      '**Cinco fuerzas de Porter**: 1) competidores tradicionales (rivalidad), 2) nuevos participantes, 3) productos y servicios sustitutos, 4) proveedores, 5) clientes.',
    ],
    table: { head: ['Fuerza', 'Pregunta que responde', 'Ñandú'], rows: [
      ['Rivalidad', '¿Cuánto pelean los que ya están?', 'Otras yerbateras grandes'],
      ['Nuevos participantes', '¿Es fácil entrar al sector?', 'Marca nueva de yerba orgánica'],
      ['Sustitutos', '¿Qué otra cosa cubre la necesidad?', 'Café, té, energizantes'],
      ['Proveedores', '¿Pueden imponer precios o condiciones?', 'Productores de hoja verde'],
      ['Clientes', '¿Pueden exigir precio o calidad?', 'Cadenas de supermercados'],
    ] },
    written: 'Las cinco fuerzas de Porter determinan la intensidad de la competencia en un sector: la rivalidad entre competidores existentes, la amenaza de nuevos participantes, la amenaza de productos sustitutos, el poder de negociación de los proveedores y el poder de negociación de los clientes.',
    trap: '**Sustituto ≠ competidor.** Otra marca de yerba es rivalidad; el café es sustituto. Y los **grupos reguladores no son una fuerza**.',
  },
  {
    id: 'y1s', module: 'm1', title: 'La estructura: dividir, agrupar y coordinar',
    lead: [
      'La **estructura** es la forma en que el trabajo de una organización se **divide, agrupa y coordina**. El **diseño organizacional** es el proceso de decidir qué estructura conviene según la estrategia, el personal, la tecnología y las tareas.',
      'Hay cuatro elementos que conviene no mezclar, porque el final los preguntó con definiciones cruzadas: **división del trabajo, departamentalización, jerarquía y coordinación**.',
    ],
    scenes: [
      sc([
        head('De un trabajo total a una estructura'),
        box(150, 45, 300, 60, 'Producir y vender yerba', { c: 'gray', fs: 19, out: 3 }),
        ...['Cosechar', 'Secar', 'Envasar', 'Vender', 'Facturar', 'Contratar'].map((t, i) => box(10 + i * 98, 140, 90, 50, t, { c: 'yellow', fs: 14, s: 1, out: 3 })),
        box(10, 240, 185, 90, 'Producción', { c: 'blue', fs: 19, sub: 'cosechar · secar · envasar', id: 'd1', s: 2 }),
        box(208, 240, 185, 90, 'Comercial', { c: 'blue', fs: 19, sub: 'vender', id: 'd2', s: 2 }),
        box(406, 240, 185, 90, 'Administración', { c: 'blue', fs: 18, sub: 'facturar · contratar', id: 'd3', s: 2 }),
        box(200, 50, 200, 60, 'Gerencia general', { c: 'purple', fs: 18, id: 'gg', s: 3 }),
        arr('gg', 'd1', { s: 3, head: false }), arr('gg', 'd2', { s: 3, head: false }), arr('gg', 'd3', { s: 3, head: false }),
        txt(500, 70, 'jerarquía:', { fs: 15, c: 'purple', b: true, s: 3 }),
        txt(500, 92, 'quién reporta a quién', { fs: 14, c: 'purple', s: 3 }),
        box(10, 350, 580, 75, 'Coordinación: que Comercial no prometa lo que Producción no puede entregar', { c: 'green', fs: 16, s: 4 }),
      ], [
        'Partimos del **trabajo total** que la empresa necesita hacer: producir y vender yerba.',
        '**División del trabajo** (especialización): descomponer esa tarea compleja en **subtareas** más simples, para que cada persona se ocupe de una parte. Adam Smith lo mostró con una fábrica de alfileres: diez personas haciendo todo producían unos 200 por día; especializadas y coordinadas, unos 48.000.',
        '**Departamentalización**: una vez dividido el trabajo, **agrupar** tareas y puestos con relación lógica en departamentos o gerencias. Primero se separa, después se agrupa.',
        '**Jerarquía**: los niveles de autoridad y responsabilidad. Define quién reporta a quién y los niveles de mando.',
        '**Coordinación**: integrar las actividades de las distintas áreas para que trabajen sincronizadas hacia la meta. Sin coordinación, la división del trabajo produce piezas que no encajan.',
      ]),
    ],
    points: [
      '**Estructura organizacional**: forma de dividir, organizar (agrupar) y coordinar las actividades. Mintzberg: la suma de las formas en que el trabajo se divide en tareas y se logra su coordinación.',
      '**Diseño organizacional**: decidir la estructura más conveniente para la estrategia, el personal, la tecnología y las tareas.',
      '**División del trabajo**: descomponer una tarea compleja en subtareas; cada persona es responsable de un conjunto limitado de actividades (Adam Smith, *La riqueza de las naciones*; después, la línea de montaje de Ford).',
      '**Departamentalización**: agrupar tareas, puestos o gerencias con actividades similares o relación lógica, para que persigan un objetivo común. Criterios: por **función, producto, cliente, área geográfica o proceso**.',
      '**Jerarquía**: niveles de autoridad y responsabilidad; quién reporta a quién.',
      '**Coordinación**: integrar las actividades de las distintas áreas para lograr las metas de forma eficaz y eficiente.',
    ],
    table: { head: ['Criterio de departamentalización', 'Agrupa según', 'En Ñandú'], rows: [
      ['Función', 'la especialidad', 'Producción, Comercial, Administración'],
      ['Producto', 'lo que se vende', 'Yerba, Té e infusiones'],
      ['Cliente', 'a quién se vende', 'Supermercados, Almacenes'],
      ['Área geográfica', 'dónde se vende', 'NEA, AMBA, Exterior'],
      ['Proceso', 'la etapa de producción', 'Secado, Estacionamiento, Envasado'],
    ] },
    example: { title: 'Yerbatera Ñandú', body: [
      'Cuando Ñandú tenía seis empleados, todos hacían de todo. Al crecer, el dueño **dividió** el trabajo (unos cosechan, otros envasan, otro vende) y después **agrupó** esas tareas en tres áreas. Ese segundo paso es la departamentalización.',
    ] },
    written: 'La **división del trabajo** consiste en descomponer una tarea compleja en subtareas menores, de modo que cada persona sea responsable de un conjunto limitado de actividades. La **departamentalización** es el paso siguiente: agrupar esas tareas o gerencias con actividades similares o relación lógica para que persigan un objetivo común.',
    trap: 'El final dio la definición de **departamentalización** con el nombre de "división del trabajo" para marcar V/F: era **falso**. Dividir = separar tareas; departamentalizar = agruparlas.',
  },
  {
    id: 'y1', module: 'm1', title: 'Las cuatro estructuras organizacionales',
    lead: [
      'Las estructuras clásicas son cuatro: **lineal, funcional, por producto/mercado (divisional) y matricial**. Cada una responde de otra forma a dos preguntas: **¿con qué criterio se agrupa el trabajo?** y **¿cuántos jefes tiene cada persona?**',
      'Seguí a Ñandú: a medida que crece y se diversifica, su estructura cambia. Mirá en cada diagrama cómo circula la autoridad.',
    ],
    scenes: [
      sc([
        head('1 · Lineal (piramidal)'),
        tree(40, 50, 520, 190, { t: 'Dueño', c: 'purple', kids: [
          { t: 'Capataz', c: 'blue', kids: [{ t: 'Operario' }, { t: 'Operario' }, { t: 'Operario' }] },
          { t: 'Vendedor', c: 'blue' },
        ] }, { fs: 16 }),
        box(20, 280, 270, 145, '✔ Simple y rápida', { c: 'green', fs: 18, sub: 'autoridad clara, cada uno sabe a quién responde, se decide rápido', s: 1 }),
        box(310, 280, 270, 145, '✘ Rígida', { c: 'red', fs: 18, sub: 'el dueño se sobrecarga; no fomenta la especialización', s: 2 }),
      ], [
        'La **lineal** es la más simple y antigua. La autoridad baja **directo** de la cima a la base, sin áreas especializadas ni tramos administrativos definidos. Ñandú en sus comienzos: el dueño decide todo.',
        'Ventaja: es fácil de entender, la autoridad y la responsabilidad están claras y las decisiones son **rápidas**.',
        'Limitación: es **rígida**, sobrecarga a quien dirige y no aprovecha especialistas. Conviene en organizaciones **muy pequeñas**, como un taller o una empresa familiar.',
      ]),
      sc([
        head('2 · Funcional'),
        tree(20, 50, 560, 150, { t: 'Gerencia general', c: 'purple', kids: [
          { t: 'Producción', c: 'blue' }, { t: 'Comercial', c: 'blue' }, { t: 'Administración y Finanzas', c: 'blue' }, { t: 'RR. HH.', c: 'blue' },
        ] }, { fs: 15 }),
        box(20, 240, 270, 120, '✔ Especialización', { c: 'green', fs: 18, sub: 'cada área concentra expertos; es más fácil supervisar', s: 1 }),
        box(310, 240, 270, 120, '✘ "Silos"', { c: 'red', fs: 18, sub: 'las áreas se comunican mal; responde lento a los cambios', s: 2 }),
        txt(300, 395, 'Comercial promete entregas → Producción no llega', { fs: 16, b: true, c: 'red', s: 2 }),
      ], [
        'La **funcional** agrupa a las personas según la **función o especialidad**: producción, comercial, finanzas, recursos humanos. Ñandú, ya mediana y con pocos productos, se organiza así.',
        'Ventaja: fomenta la **especialización** y la eficiencia dentro de cada función, y facilita la supervisión (el jefe de cada área entiende el trabajo).',
        'Limitación: aparecen los **silos**, áreas que miran solo su objetivo y se coordinan mal entre sí, y la respuesta al mercado es lenta. Conviene en organizaciones **medianas con pocos productos**.',
      ]),
      sc([
        head('3 · Por producto o mercado (divisional)'),
        tree(10, 50, 580, 200, { t: 'Dirección general', c: 'purple', kids: [
          { t: 'División Yerba', c: 'blue', kids: [{ t: 'Producción' }, { t: 'Ventas', c: 'orange' }] },
          { t: 'División Té', c: 'blue', kids: [{ t: 'Producción' }, { t: 'Ventas', c: 'orange' }] },
          { t: 'División Exterior', c: 'blue', kids: [{ t: 'Logística' }, { t: 'Ventas', c: 'orange' }] },
        ] }, { fs: 14 }),
        box(20, 290, 270, 135, '✔ Foco y adaptación', { c: 'green', fs: 18, sub: 'cada división responde por sus resultados; libera a la dirección', s: 1 }),
        box(310, 290, 270, 135, '✘ Duplicación', { c: 'red', fs: 18, sub: 'tres áreas de Ventas = más costo; divisiones que compiten entre sí', s: 2 }),
      ], [
        'La **divisional** divide la empresa en **divisiones semiautónomas**, cada una enfocada en un **producto, mercado, cliente o región**. Cada división tiene su propio gerente y sus propias áreas funcionales: funciona casi como una empresa aparte.',
        'Ventaja: mayor foco en los resultados de cada línea y más **adaptación** a su mercado. La alta dirección se libera de la gestión diaria.',
        'Limitación: **duplicación de recursos y costos**. Fijate que Ventas aparece tres veces. Además, las divisiones pueden competir entre sí de forma destructiva. Conviene en **grandes empresas diversificadas**.',
      ]),
      sc([
        head('4 · Matricial'),
        ...['Sistemas', 'Marketing', 'Logística'].map((t, i) => box(190 + i * 135, 45, 120, 50, t, { c: 'blue', fs: 16, id: `f${i}` })),
        txt(470, 122, '↓ autoridad funcional', { fs: 14, c: 'blue', b: true }),
        ...['Tienda online', 'Nueva planta'].map((t, j) => box(15, 145 + j * 95, 150, 60, t, { c: 'orange', fs: 16, id: `p${j}`, s: 1 })),
        txt(90, 345, '→ autoridad de proyecto', { fs: 14, c: 'orange', b: true, s: 1 }),
        ...[0, 1, 2].flatMap((i) => [0, 1].map((j) => box(225 + i * 135, 150 + j * 95, 50, 50, i === 0 && j === 0 ? 'Ana' : '', { shape: 'circle', c: i === 0 && j === 0 ? 'yellow' : 'gray', fs: 13, id: `x${i}${j}`, s: 1 }))),
        arr('x00', 'f0', { s: 2, c: 'yellow', sw: 3 }), arr('x00', 'p0', { s: 2, c: 'yellow', sw: 3 }),
        box(20, 360, 560, 70, '¿Esta semana Ana programa lo que pide Sistemas o lo que pide el proyecto?', { c: 'red', fs: 16, s: 3 }),
      ], [
        'La **matricial** combina **dos criterios** de departamentalización, en general el funcional y el de producto o proyecto. Arriba, las áreas funcionales con su autoridad vertical.',
        'A la vez, Ñandú arma **proyectos** (una tienda online, una planta nueva) con un gerente responsable de cada uno: la autoridad horizontal. Las personas quedan en los cruces.',
        'Ana, analista de Sistemas, trabaja en la tienda online: **depende de dos jefes**, la gerenta de Sistemas y el gerente del proyecto. Es **mando múltiple** y rompe la **unidad de mando**.',
        'Ventaja: flexibilidad y uso eficiente de especialistas en varios proyectos. Limitación: **confusión y conflictos de poder** cuando los dos jefes piden cosas distintas. Exige mucha comunicación. Conviene en entornos complejos y cambiantes: consultoras, agencias, aeroespacial.',
      ]),
    ],
    videoNote: 'Video resumen anterior: muestra sobre todo la matricial, Porter y eficacia/eficiencia. Lineal, funcional y divisional están desarrolladas solo en los diagramas de arriba.',
    points: [
      '**Lineal (piramidal)**: autoridad directa de arriba hacia abajo, sin tramos administrativos definidos. Simple, clara y rápida; rígida, sobrecarga a la dirección, no especializa. Para empresas muy pequeñas.',
      '**Funcional**: agrupa por especialidad (finanzas, marketing, operaciones…). Especialización y supervisión fácil; silos y respuesta lenta. Para medianas con pocos productos.',
      '**Por producto/mercado (divisional)**: divisiones semiautónomas por producto, mercado, cliente o región, cada una con sus áreas. Foco y adaptación; duplicación de recursos y competencia interna. Para grandes diversificadas.',
      '**Matricial**: combina funcional + producto/proyecto; cada persona depende de un gerente funcional y de uno de proyecto (mando múltiple). Flexible; rompe la unidad de mando y genera conflictos. Para entornos complejos y dinámicos.',
      'En la matricial, el responsable de un producto o servicio coordina funciones **sobre las que no tiene autoridad formal**, pero responde por que se ejecuten en tiempo y forma.',
    ],
    table: { head: ['', 'Lineal', 'Funcional', 'Divisional', 'Matricial'], rows: [
      ['Agrupa por', 'no hay áreas especializadas', 'especialidad', 'producto, mercado o región', 'dos criterios a la vez'],
      ['Jefes por persona', 'uno', 'uno', 'uno', '**dos**'],
      ['Fortaleza', 'rapidez y claridad', 'especialización', 'foco y adaptación', 'flexibilidad'],
      ['Problema típico', 'sobrecarga del dueño', 'silos', 'duplicación', 'conflicto de mando'],
      ['Tamaño típico', 'muy pequeña', 'mediana, pocos productos', 'grande, diversificada', 'entorno complejo'],
    ] },
    written: 'Las estructuras clásicas son cuatro. **Lineal**: la autoridad fluye directamente de la cima a la base, sin tramos administrativos definidos. **Funcional**: agrupa a las personas por especialidad (finanzas, marketing, operaciones). **Por producto o mercado**: organiza divisiones semiautónomas por producto, mercado, cliente o región, cada una con sus propias funciones. **Matricial**: combina la departamentalización funcional con la de producto o proyecto, de modo que cada empleado depende de dos gerentes.',
    trap: 'Un final preguntó cuál **no** es una estructura clásica: la respuesta era **horizontal**. Las cuatro son lineal, funcional, producto/mercado y matricial.',
  },
  {
    id: 'y1c', module: 'm1', title: 'Cómo reconocer la estructura en un caso',
    lead: [
      'En el examen no te van a pedir solo la definición: te van a describir una empresa. Para clasificarla, no mires el tamaño ni el rubro primero. Hacé **tres preguntas en orden**, de la más distintiva a la más general.',
    ],
    scenes: [
      sc([
        head('Tres preguntas, en este orden'),
        box(15, 40, 360, 60, '1 · ¿Alguien responde a dos jefes a la vez?', { c: 'yellow', fs: 16, id: 'q1' }),
        box(420, 40, 165, 60, 'MATRICIAL', { c: 'orange', fs: 18, solid: true, id: 'a1', s: 1 }),
        arr('q1', 'a1', { t: 'sí', s: 1 }),
        box(15, 140, 360, 80, '2 · ¿Hay divisiones por producto, mercado o región, cada una con sus propias áreas?', { c: 'yellow', fs: 15, id: 'q2', s: 2 }),
        box(420, 150, 165, 60, 'DIVISIONAL', { c: 'blue', fs: 18, solid: true, id: 'a2', s: 2 }),
        arr('q1', 'q2', { t: 'no', s: 2 }), arr('q2', 'a2', { t: 'sí', s: 2 }),
        box(15, 262, 360, 60, '3 · ¿Hay áreas por especialidad (ventas, finanzas…)?', { c: 'yellow', fs: 15, id: 'q3', s: 3 }),
        box(420, 262, 165, 60, 'FUNCIONAL', { c: 'green', fs: 18, solid: true, id: 'a3', s: 3 }),
        arr('q2', 'q3', { t: 'no', s: 3 }), arr('q3', 'a3', { t: 'sí', s: 3 }),
        box(110, 368, 170, 60, 'LINEAL', { c: 'purple', fs: 18, solid: true, id: 'a4', s: 4 }),
        arr('q3', 'a4', { t: 'no', s: 4 }),
        txt(440, 400, 'mando directo, sin áreas', { fs: 14, c: 'purple', b: true, s: 4 }),
      ], [
        'Empezá por la pregunta que **solo una estructura** cumple. Así no te confunde un caso que mezcla datos.',
        'Si alguien **depende de dos jefes a la vez** (uno de su especialidad y otro de un proyecto o producto), es **matricial**. Ninguna otra tiene doble dependencia.',
        'Si no, preguntá si la empresa está partida en **divisiones por producto, mercado, cliente o región**, y si cada división tiene **sus propias** áreas (su propio marketing, su propia producción). Entonces es **divisional**.',
        'Si las áreas de primer nivel son **especialidades** compartidas por toda la empresa (un solo marketing, una sola producción), es **funcional**.',
        'Si no hay áreas especializadas y la autoridad baja directo del dueño a los empleados, es **lineal**.',
      ]),
    ],
    points: [
      'Pista de la **matricial**: "depende también de", "doble reporte", "gerente de proyecto y gerente de área".',
      'Pista de la **divisional**: "cada unidad de negocio tiene su propio…", "división Norte / Sur", "línea hogar / línea industrial". Costo característico: **duplicación**.',
      'Pista de la **funcional**: un solo departamento por especialidad para toda la empresa. Problema característico: **silos**.',
      'Pista de la **lineal**: empresa chica, el dueño decide todo, no hay áreas. Problema característico: **sobrecarga** y rigidez.',
      'Ojo: tener un área de "Ventas" no alcanza para decir funcional. Si hay **tres** áreas de Ventas, una por división, es divisional.',
    ],
    example: { title: 'tres casos rápidos', body: [
      '**A.** Una consultora asigna cada analista a un cliente durante seis meses, pero su evaluación anual la hace el jefe de su área técnica. → Dos jefes: **matricial**.',
      '**B.** Una alimenticia tiene una unidad de Lácteos y otra de Galletitas; cada una con planta, marketing y ventas propios. → **Divisional** (por producto), con duplicación.',
      '**C.** Una software factory de 40 personas tiene Desarrollo, Testing, Comercial y Administración, que atienden a todos los clientes. → **Funcional**.',
    ] },
  },
  {
    id: 'y1f', module: 'm1', title: 'Organización formal e informal',
    lead: [
      'En toda organización conviven dos estructuras superpuestas. La **formal** es la que diseñó la dirección y aparece en el **organigrama**. La **informal** es la red de relaciones que surge sola entre las personas. No es una "mala" versión de la formal: cumple funciones que la formal no cubre.',
    ],
    scenes: [
      sc([
        head('Lo que dice el organigrama y lo que pasa'),
        box(220, 45, 160, 55, 'Gerente general', { c: 'purple', fs: 15, id: 'gg' }),
        box(25, 150, 160, 55, 'Producción', { c: 'blue', fs: 16, id: 'pr' }),
        box(220, 150, 160, 55, 'Comercial', { c: 'blue', fs: 16, id: 'co' }),
        box(415, 150, 160, 55, 'Administración', { c: 'blue', fs: 15, id: 'ad' }),
        box(45, 260, 120, 50, 'Pedro', { c: 'gray', fs: 16, id: 'pe' }),
        box(240, 260, 120, 50, 'Lucía', { c: 'gray', fs: 16, id: 'lu', hl: [2] }),
        box(435, 260, 120, 50, 'Marta', { c: 'gray', fs: 16, id: 'ma' }),
        arr('gg', 'pr', { head: false }), arr('gg', 'co', { head: false }), arr('gg', 'ad', { head: false }),
        arr('pr', 'pe', { head: false }), arr('co', 'lu', { head: false }), arr('ad', 'ma', { head: false }),
        arr('pe', 'lu', { dash: true, c: 'orange', two: true, s: 1, bend: 0.3 }),
        arr('lu', 'ma', { dash: true, c: 'orange', two: true, s: 1, bend: 0.3 }),
        txt(300, 345, 'mate de las 10, el grupo del fútbol, el radiopasillo', { fs: 15, c: 'orange', b: true, s: 1 }),
        box(20, 370, 560, 60, 'Lucía: líder informal. Si ella apoya un cambio, el resto la sigue.', { c: 'orange', fs: 16, s: 2 }),
      ], [
        'Lo **formal**: el organigrama, creado **deliberadamente** por la dirección. Define la división del trabajo, la autoridad formal, la delegación y la coordinación, y funciona con políticas, procedimientos y reglas predefinidas.',
        'Lo **informal**: relaciones que surgen **espontáneamente** por amistad o intereses comunes, aunque crucen áreas. No están planificadas ni escritas, y se comunican por canales informales: el **radiopasillo**.',
        'La informal tiene **líderes informales**, que no figuran en el organigrama pero influyen. Un buen gerente no intenta eliminarla: la entiende y la **alinea** con los objetivos formales.',
      ]),
    ],
    points: [
      '**Formal**: estructura creada deliberadamente, con autoridad formal, reglas y canales oficiales. Se basa en la teoría clásica (división del trabajo, departamentalización, delegación, coordinación). Se representa con el **organigrama**.',
      'Beneficios de la formal: objetivos y responsabilidades claros, uso óptimo de recursos, evita superposición de tareas, carrera y promociones definidas, menos rotación y ausentismo.',
      'Limitaciones de la formal: **pérdida de iniciativa** y **necesidades sociales insatisfechas**.',
      '**Informal**: relaciones sociales no planificadas, por amistad o intereses comunes; grupos pequeños, líderes informales, valores de grupo en vez de reglas, sus miembros son iguales en jerarquía.',
      'Beneficios de la informal: satisface necesidades sociales, alivia a la alta dirección, comunicación y feedback rápidos, mejores relaciones, resuelve temas de trabajo, autocontrol.',
      'Limitaciones de la informal: **conformidad**, conflicto de roles, **resistencia al cambio**, rumores (radiopasillo) y la actitud de los líderes informales.',
    ],
    table: { head: ['', 'Formal', 'Informal'], rows: [
      ['Origen', 'deliberado, lo diseña la dirección', 'espontáneo, por afinidad'],
      ['Se ve en', 'el organigrama y las normas', 'ningún documento'],
      ['Autoridad', 'del puesto', 'de líderes informales'],
      ['Comunicación', 'canales oficiales', 'radiopasillo'],
      ['Riesgo', 'rigidez, pérdida de iniciativa', 'rumores, resistencia al cambio'],
    ] },
    example: { title: 'Yerbatera Ñandú', body: [
      'Ñandú quiere cambiar el sistema de turnos de la planta. Por el organigrama, la orden baja de la gerencia a Producción. Pero los operarios escuchan primero a Lucía, de Comercial, con quien comparten el mate de las 10. Si la gerencia ignora ese vínculo, el cambio encuentra **resistencia**; si le explica el plan a Lucía, gana una aliada.',
    ] },
    written: 'La **organización formal** es la estructura creada deliberadamente por la dirección, con autoridad, reglas y canales definidos, y se representa en el organigrama. La **informal** es la red de relaciones sociales que surge espontáneamente por amistad o intereses comunes, con líderes informales y canales no oficiales. Coexisten: el gerente no debe eliminar la informal, sino alinearla con los objetivos.',
    trap: 'Ser **formal** depende del origen deliberado, no de figurar en el organigrama: un comité es formal aunque no aparezca dibujado (lo ves en el Módulo 2).',
  },
  {
    id: 'y1a', module: 'm1', title: 'La organización que aprende (Senge)',
    lead: [
      'Peter Senge describe la **organización que aprende**: aquella donde las personas amplían continuamente su capacidad de crear los resultados que buscan. No solo se adapta al entorno: aprende a crear su propio futuro. Lo logra con **cinco disciplinas**.',
    ],
    scenes: [
      sc([
        head('Las cinco disciplinas'),
        box(195, 165, 210, 110, 'Pensamiento sistémico', { c: 'yellow', fs: 18, sub: 'la 5ª disciplina: integra a las demás', id: 'ps', s: 1, hl: [1] }),
        box(20, 50, 220, 80, 'Dominio personal', { c: 'blue', fs: 17, sub: 'aclarar la propia visión', id: 'd1' }),
        box(360, 50, 220, 80, 'Modelos mentales', { c: 'blue', fs: 17, sub: 'revisar los supuestos', id: 'd2' }),
        box(20, 315, 220, 80, 'Visión compartida', { c: 'blue', fs: 17, sub: 'de "mi" visión a "nuestra"', id: 'd3' }),
        box(360, 315, 220, 80, 'Aprendizaje en equipo', { c: 'blue', fs: 17, sub: 'diálogo: el equipo supera a la suma', id: 'd4' }),
        arr('ps', 'd1', { s: 1, two: true }), arr('ps', 'd2', { s: 1, two: true }), arr('ps', 'd3', { s: 1, two: true }), arr('ps', 'd4', { s: 1, two: true }),
      ], [
        'Cuatro disciplinas trabajan sobre las personas y los equipos: **dominio personal** (aclarar la propia visión y ver la realidad con objetividad), **modelos mentales** (descubrir y revisar los supuestos con los que interpretamos el mundo), **visión compartida** (compromiso genuino, no mero acatamiento) y **aprendizaje en equipo** (diálogo; la inteligencia del equipo supera a la de sus integrantes).',
        'La quinta, el **pensamiento sistémico**, las integra: es ver la **totalidad y las interrelaciones** en lugar de hechos aislados. Esta idea vuelve en el Módulo 7, teoría de sistemas.',
      ]),
    ],
    points: [
      '**Organización que aprende**: las personas expanden continuamente su aptitud para crear los resultados que desean; no solo se adapta, crea su futuro.',
      'Cinco disciplinas: **pensamiento sistémico** (la quinta, integra a las otras), **dominio personal**, **modelos mentales**, **visión compartida** y **aprendizaje en equipo**.',
    ],
    trap: 'Si preguntan cuál es "la quinta disciplina" o cuál **integra** a las demás: **pensamiento sistémico**.',
  },
];

const q = (id: string, topic: string, prompt: string, options: string[], answer: number, explain: string, why: (string | null)[], source = AP): Question =>
  ({ id, module: 'm1', topic, type: 'mcq', prompt, options, answer, explain, why, source });
const tf = (id: string, topic: string, prompt: string, answer: boolean, explain: string, source = AP): Question =>
  ({ id, module: 'm1', topic, type: 'tf', prompt, answer, explain, source });

export const M1_QUESTIONS: Question[] = [
  q('sym-m1-01', 'y1o', 'Una software factory termina a tiempo y con la mitad de las horas presupuestadas un sistema que el cliente después no usa porque no resolvía su problema. ¿Cómo la evaluás?', ['Eficiente, pero no eficaz', 'Eficaz, pero no eficiente', 'Eficaz y eficiente', 'Ni eficaz ni eficiente'], 0,
    'Usó pocos recursos (eficiente), pero el objetivo elegido no era el correcto (no eficaz). La eficacia mira si se hizo lo que había que hacer; la eficiencia, cuánto costó.',
    [null, 'Al revés: los recursos fueron pocos (eso es eficiencia) y el objetivo fue el equivocado.', 'Falta eficacia: el producto no sirve para lo que el cliente necesitaba.', 'Sí fue eficiente: terminó con la mitad de las horas.']),
  q('sym-m1-02', 'y1o', '¿Qué analiza la función de Organización y Métodos dentro de una empresa?', ['Los problemas de estructura y de procedimientos, para optimizar la administración', 'Solo la contabilidad y los balances', 'Las campañas de publicidad', 'La programación de los sistemas informáticos'], 0,
    'O&M estudia cómo está organizada la empresa (estructura) y cómo se hacen las cosas (procedimientos) para mejorar su funcionamiento administrativo.',
    [null, 'Eso es tarea del área contable y financiera.', 'Es una actividad de marketing.', 'La programación puede apoyar los procedimientos, pero no es el objeto de O&M.']),
  q('sym-m1-03', 'y1e', 'Se aprueba una ley que obliga a todas las yerbateras a cambiar el etiquetado. Para Ñandú, ¿qué es?', ['Una fuerza político-legal del macroambiente', 'El poder de negociación de los clientes', 'Un nuevo participante en el mercado', 'Una debilidad interna'], 0,
    'Una ley afecta a todo el sector y la empresa no puede decidir sobre ella: solo cumplirla. Es macroambiente, fuerza político-legal.',
    [null, 'Los clientes negocian precio o condiciones; acá nadie negocia, es una norma general.', 'Un nuevo participante es una empresa que entra al sector.', 'Lo interno (fortalezas y debilidades) se ve en el FODA, Módulo 5; una ley es externa.']),
  q('sym-m1-04', 'y1e', 'Para una cadena de cines, ¿qué representa el crecimiento de las plataformas de streaming según Porter?', ['Amenaza de productos sustitutos', 'Rivalidad entre competidores tradicionales', 'Poder de negociación de los proveedores', 'Un grupo regulador'], 0,
    'El streaming cubre la misma necesidad (ver películas) desde otro sector. Eso es un sustituto; otra cadena de cines sería rivalidad.',
    [null, 'Los competidores tradicionales serían otras cadenas de cines.', 'Los proveedores serían, por ejemplo, las distribuidoras de películas.', 'Los grupos reguladores son parte del microambiente, pero no una fuerza de Porter.']),
  q('sym-m1-05', 'y1e', 'Un supermercado mayorista concentra el 40 % de las ventas de una pyme y le exige plazos de pago de 90 días. ¿Qué fuerza de Porter describe?', ['El poder de negociación de los clientes', 'El poder de negociación de los proveedores', 'La amenaza de nuevos participantes', 'La amenaza de sustitutos'], 0,
    'Quien compra es el cliente. Cuanto más concentradas están sus compras, más poder tiene para imponer condiciones.',
    [null, 'El supermercado le compra a la pyme: es cliente, no proveedor.', 'No entra ninguna empresa nueva al sector.', 'No hay otro producto que reemplace al de la pyme.']),
  q('sym-m1-06', 'y1s', 'En un restaurante, una persona corta, otra cocina y otra emplata. Después, la gerencia agrupa a esas tres personas en el área "Cocina". ¿Qué describen esos dos momentos, en orden?', ['División del trabajo y después departamentalización', 'Departamentalización y después división del trabajo', 'Jerarquía y después coordinación', 'Coordinación y después jerarquía'], 0,
    'Primero se separa la tarea en partes (división) y después se agrupan partes relacionadas en un área (departamentalización).',
    [null, 'Es el orden inverso: no se puede agrupar lo que todavía no se separó.', 'La jerarquía define quién reporta a quién; acá se describen tareas y su agrupación.', 'La coordinación integra áreas; el caso describe cómo se forma un área.']),
  tf('sym-m1-07', 'y1s', 'La división del trabajo es la forma en que se agrupan departamentos o gerencias con actividades similares o relación lógica, para que persigan un objetivo común.', false,
    'Esa es la definición de **departamentalización**. La división del trabajo descompone una tarea compleja en subtareas. Este V/F apareció en un final.', F23),
  q('sym-m1-08', 'y1s', 'Una empresa de seguros arma un área para Pymes y otra para Particulares, cada una con su propio equipo comercial. ¿Qué criterio de departamentalización usa?', ['Por cliente', 'Por función', 'Por proceso', 'Por área geográfica'], 0,
    'Agrupa según a quién atiende: pymes o particulares. Eso es departamentalización por cliente.',
    [null, 'Por función serían áreas como Comercial, Siniestros o Finanzas para todos los clientes.', 'Por proceso serían etapas, por ejemplo emisión de pólizas y liquidación de siniestros.', 'Por área geográfica serían zonas, como Norte y Sur.']),
  q('sym-m1-09', 'y1', 'En una empresa, los diseñadores dependen de la jefa de Diseño, pero cada uno también responde al gerente del proyecto al que fue asignado. ¿Qué rasgo de esta estructura puede generar conflictos?', ['Rompe la unidad de mando: cada persona tiene dos jefes', 'Duplica áreas enteras en cada división', 'Concentra todas las decisiones en el dueño', 'No permite la especialización'], 0,
    'Es una matricial: hay doble dependencia (funcional y de proyecto). Su riesgo típico es el conflicto entre los dos jefes.',
    [null, 'La duplicación es el problema típico de la divisional.', 'Eso describe la lineal.', 'Al contrario: la matricial aprovecha especialistas en varios proyectos.']),
  q('sym-m1-10', 'y1', 'Una empresa grande vende electrodomésticos y seguros. Cada negocio tiene su propio marketing, finanzas y ventas, y la dirección se dedica a la estrategia. ¿Cuál es la principal desventaja de esta estructura?', ['La duplicación de recursos y costos', 'La sobrecarga del dueño', 'Los conflictos por doble dependencia', 'Que no puede adaptarse a cada mercado'], 0,
    'Es divisional (por producto): cada división replica las funciones, y eso duplica costos. A cambio gana foco y adaptación.',
    [null, 'Es el problema de la lineal, en empresas muy chicas.', 'La doble dependencia es propia de la matricial.', 'Al contrario: la adaptación a cada mercado es su ventaja.']),
  q('sym-m1-11', 'y1', 'Una empresa mediana con dos productos tiene un área de Producción, una de Ventas y una de Finanzas para todo. Ventas promete fechas que Producción no puede cumplir. ¿Qué problema típico aparece y de qué estructura?', ['Silos de la estructura funcional', 'Duplicación de la estructura divisional', 'Doble mando de la estructura matricial', 'Sobrecarga de la estructura lineal'], 0,
    'Áreas por especialidad para toda la empresa = funcional. Cuando cada área mira solo su objetivo y se coordina mal con las otras, se habla de silos.',
    [null, 'No hay divisiones con funciones propias; hay una sola área de cada especialidad.', 'Nadie tiene dos jefes en el caso.', 'Hay áreas especializadas, así que no es lineal.']),
  q('sym-m1-12', 'y1', '¿Cuál de estas **no** es una de las cuatro estructuras organizacionales clásicas que presenta la materia?', ['Horizontal', 'Lineal', 'Funcional', 'Por producto/mercado'], 0,
    'Las cuatro clásicas son lineal, funcional, por producto/mercado y matricial. Esta pregunta apareció en un final.',
    [null, 'Es una de las cuatro.', 'Es una de las cuatro.', 'Es una de las cuatro (también llamada divisional).'], F23),
  tf('sym-m1-13', 'y1', 'La estructura lineal es aquella en la que básicamente no se encuentran tramos administrativos definidos; también se la llama piramidal.', true,
    'Es la definición de la cátedra y apareció como V/F en un final. La autoridad baja directo, sin áreas especializadas intermedias.', F23),
  q('sym-m1-14', 'y1c', 'Una cadena de farmacias tiene una gerencia para Región Norte y otra para Región Sur. Cada una tiene compras, ventas y recursos humanos propios. ¿Qué estructura es?', ['Por producto/mercado (divisional), por región', 'Funcional', 'Matricial', 'Lineal'], 0,
    'Hay divisiones por región y cada una tiene sus propias funciones. Eso es divisional por área geográfica.',
    [null, 'En la funcional habría un solo departamento de compras para toda la empresa.', 'Nadie depende de dos jefes a la vez.', 'Hay áreas especializadas y niveles intermedios.']),
  q('sym-m1-15', 'y1c', 'Un estudio contable de cinco personas: el titular asigna los trabajos, revisa todo y decide cada tema. No hay áreas. ¿Qué estructura es y cuál es su riesgo?', ['Lineal; sobrecarga del titular', 'Funcional; silos', 'Matricial; conflicto de mando', 'Divisional; duplicación'], 0,
    'Mando directo, sin áreas: lineal. Es rápida y clara, pero todo pasa por una persona.',
    [null, 'No hay áreas por especialidad.', 'Cada persona tiene un solo jefe.', 'No hay divisiones.']),
  q('sym-m1-16', 'y1c', 'En una consultora, cada analista pertenece al área de Datos, que lo capacita y lo evalúa, y además trabaja seis meses para el gerente de la cuenta de un cliente. ¿Qué estructura es?', ['Matricial', 'Funcional', 'Divisional', 'Lineal'], 0,
    'Responde a dos jefes a la vez (área técnica y gerente de cuenta): es la pregunta 1 del diagrama, y solo la matricial la cumple.',
    [null, 'Tiene áreas por especialidad, pero además una segunda línea de mando.', 'No hay divisiones con funciones propias.', 'Hay especialización y doble dependencia.']),
  q('sym-m1-17', 'y1f', 'Los empleados se enteran de una reestructuración por comentarios en el comedor antes del anuncio oficial. ¿Qué canal funcionó y de qué estructura forma parte?', ['El radiopasillo, de la organización informal', 'Un canal oficial de la organización formal', 'El organigrama', 'Un procedimiento escrito'], 0,
    'El rumor circula por canales informales que nadie diseñó. Es rápido, pero puede distorsionar la información: es una limitación de la informal.',
    [null, 'Un canal formal sería el anuncio oficial, que todavía no había ocurrido.', 'El organigrama representa la estructura formal, no los comentarios.', 'Un procedimiento escrito es parte de lo formal.']),
  q('sym-m1-18', 'y1f', '¿Cuál es una limitación propia de la organización **formal**?', ['Puede reducir la iniciativa y no satisfacer necesidades sociales', 'Favorece los rumores', 'Genera conformidad con el grupo de pares', 'Sus líderes no figuran en ningún documento'], 0,
    'La formal ordena y clarifica, pero sus reglas pueden ahogar la iniciativa y no cubren las necesidades sociales. Las otras opciones son limitaciones de la informal.',
    [null, 'Es una limitación de la informal.', 'Es una limitación de la informal.', 'Describe a los líderes informales.']),
  q('sym-m1-19', 'y1a', 'Según Senge, ¿qué disciplina integra a las demás y permite ver la totalidad y sus interrelaciones?', ['Pensamiento sistémico', 'Dominio personal', 'Modelos mentales', 'Visión compartida'], 0,
    'Es "la quinta disciplina": integra las otras cuatro y es la base de la mirada sistémica que retoma el Módulo 7.',
    [null, 'Trabaja sobre la visión personal, no integra a las demás.', 'Revisa supuestos, pero no es la que integra.', 'Construye compromiso común, pero no es la que integra.']),
];
