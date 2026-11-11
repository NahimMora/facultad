import type { Question, SubjectContent, TheoryBlock } from '../types';
import { VIDEOS } from '../videos/bd';
import { EX_SCENES, SCENES } from '../visual/bd';
import { FINAL_EXERCISES } from '../visual/bd-final';

/** BD · final. Redacción propia sobre los apuntes de la cátedra, las autoevaluaciones y un final resuelto (2024). */
const F = 'final 2024 resuelto (Drive de estudiantes)';
const A = 'autoevaluación de la cátedra';

const theory: TheoryBlock[] = [
  { id: 'b1', module: 't1', title: 'Sistema de base de datos', points: [
    'El **sistema de base de datos** está formado por la base de datos, el **SGBD** (DBMS), el software de aplicaciones y utilerías, el hardware y los usuarios.',
    'La **base de datos** son los **datos + los metadatos** (el catálogo o diccionario: descripción de la estructura).',
    'El **DBA** es el usuario principal: define esquemas, permisos y **políticas de backup**.',
    'El **procesador de consultas** traduce SQL a operaciones internas; el **gestor de almacenamiento** maneja el acceso físico.',
    '**Arquitectura ANSI-SPARC** (3 niveles: externo, conceptual, interno): da **independencia lógica y física** de los datos. Los niveles de abstracción facilitan el uso a los **usuarios finales**.',
    'Bases **transaccionales (OLTP)**: muchas operaciones de la operatoria diaria. Las **analíticas** (data warehouse) sirven al análisis de negocio.',
  ], trap: 'Las **reglas de integridad** sirven para que los datos estén correctamente relacionados; no para acelerar consultas ni para controlar accesos (eso es seguridad).' },
  { id: 'b2', module: 't2', title: 'Modelo entidad-relación (DER)', points: [
    '**Entidad**: objeto del negocio sobre el que se guardan datos (Cliente, Ruta). **Atributo**: propiedad. **Identificador** (clave): el que la distingue (marcado con *).',
    '**Cardinalidad** (máxima): 1:1, 1:N o N:M. **Modalidad** (mínima): opcional (0, círculo) u obligatoria (1, barra).',
    'Notación pata de gallo: **||** = uno y solo uno · **o<** = cero o muchos · **|<** = uno o muchos.',
    'Una relación **N:M** se resuelve con una **entidad intermedia** (asociativa) cuya clave es la combinación de las claves de ambas (Comida–Ingrediente → Receta).',
    'Las **reglas de negocio** del enunciado definen la cardinalidad: "cada jugador pertenece a un solo equipo y un equipo tiene varios" → 1:N.',
  ], trap: 'En el final hay que **escribir los supuestos**: cada vez que el enunciado no aclara la modalidad, la justificás (ej.: "un proveedor puede vender varios equipos o ninguno").' },
  { id: 'b3', module: 't3', title: 'Modelado avanzado', points: [
    '**Entidad débil**: depende de otra para identificarse (Línea de pedido depende de Pedido).',
    '**Relación recursiva**: una entidad se relaciona consigo misma (Empleado jefe de Empleado).',
    '**Generalización / especialización** (supertipo y subtipos): atributos comunes arriba, específicos abajo.',
    'Atributo de la relación: si un dato depende de **ambas** entidades (la **fecha** del paseo con un guía), va en la entidad intermedia.',
  ] },
  { id: 'b4', module: 't4', title: 'Modelo relacional y normalización', points: [
    'Paso DER → tablas: cada entidad es una tabla; **1:N** → la clave del lado "1" va como **FK** en la tabla del lado "N"; **N:M** → tabla intermedia con PK compuesta por ambas FK.',
    '**PK**: identifica cada fila, única y no nula. **FK**: referencia a la PK de otra tabla (**integridad referencial**).',
    '**1FN**: sin grupos repetitivos (cada celda, un valor atómico). Se separa el grupo repetitivo en otra estructura llevando la clave como FK.',
    '**2FN**: 1FN + **sin dependencias parciales** (ningún atributo no primo depende de **parte** de una clave compuesta).',
    '**3FN**: 2FN + **sin dependencias transitivas** (ningún atributo no primo depende de otro no primo).',
  ], table: { head: ['Forma normal', 'Qué elimina', 'Ejemplo del final 2024'], rows: [
    ['1FN', 'grupos repetitivos', 'un veterinario atiende varias mascotas → se separan las consultas'],
    ['2FN', 'dependencias parciales', 'Nom_Mascota depende solo de Nro_Mascota (parte de la PK)'],
    ['3FN', 'dependencias transitivas', 'Nom_Especialidad depende de Cod_Especialidad, no de la matrícula'],
  ] }, trap: 'Si la PK es **simple**, la estructura ya está en 2FN automáticamente: la dependencia parcial solo existe con claves compuestas.' },
  { id: 'b5', module: 't5', title: 'Álgebra relacional', points: [
    '**σ selección**: filtra filas por condición. **π proyección**: elige columnas (y elimina duplicados).',
    '**⨝ junta (join)**: combina tablas por una condición (A.legajo = C.legajo). **× producto cartesiano**: todas las combinaciones, **sin requisitos**.',
    '**∪ unión, − diferencia, ∩ intersección**: requieren relaciones **compatibles con la unión** (mismo grado y dominios).',
    '**Diferencia** para "los que NO": todos − los que sí. **Intersección** para "los que cumplen ambas cosas" (cursaron Y aprobaron).',
    'Convención de la cátedra: **alias** para cada tabla (A ← Alumno) y resultados intermedios con nombre (AlgI1erC2023 ← …).',
  ], trap: '"Proveedores con un único artículo": todos los que tienen artículos **menos** los que tienen dos o más (junta de Artículo consigo misma con codProv igual y nroArtic distinto). No es "stock = 1".' },
  { id: 'b6', module: 't6', title: 'SQL: definición de datos y actualización', points: [
    '**DDL**: CREATE TABLE (tipos, PRIMARY KEY, FOREIGN KEY … REFERENCES, NOT NULL, UNIQUE, CHECK), ALTER TABLE, DROP TABLE.',
    '**DML de actualización**: INSERT INTO … VALUES, **UPDATE … SET … WHERE**, DELETE FROM … WHERE.',
    'UPDATE o DELETE **sin WHERE** afecta **todas** las filas.',
    'Para actualizar según otra tabla se usa una **subconsulta**: UPDATE Alumno SET estado = \'baja\' WHERE legajo IN (SELECT …).',
  ] },
  { id: 'b7', module: 't7', title: 'SQL: consultas', points: [
    'Orden: **SELECT** columnas **FROM** tablas **WHERE** filtro de filas **GROUP BY** grupos **HAVING** filtro de grupos **ORDER BY**.',
    '**LIKE** con comodines: \'LIB%\' (empieza con LIB, cualquier cosa después) · \'_\' un carácter.',
    'Valores nulos: **IS NULL** / IS NOT NULL (nunca = NULL ni = \'\').',
    'Rangos: **BETWEEN** a AND b (incluye los extremos) o fecha > … AND fecha < ….',
    '**JOIN**: INNER JOIN Examen E ON A.legajo = E.legajo. **Agregadas**: COUNT, SUM, AVG, MIN, MAX; con GROUP BY, el SELECT solo puede tener columnas agrupadas o agregadas.',
    '**Subconsultas**: IN / **NOT IN** (los que no aparecen), EXISTS / NOT EXISTS, comparación con un valor.',
  ], trap: '**WHERE** filtra filas **antes** de agrupar (no admite COUNT); **HAVING** filtra **grupos** después (HAVING COUNT(*) > 1).' },
];

const q: Question[] = [
  { id: 'bd-01', module: 't1', type: 'mcq', prompt: 'La base de datos está compuesta por los datos y:', options: ['Los metadatos', 'El SGBD', 'El DBA', 'Los programas de aplicación'], answer: 0, explain: 'Datos + metadatos (catálogo). El SGBD es otro componente del **sistema** de base de datos.', source: A },
  { id: 'bd-02', module: 't1', type: 'mcq', prompt: 'Las políticas de backup las establece:', options: ['El DBA', 'El SGBD', 'El gestor de almacenamiento', 'El gestor de consultas'], answer: 0, explain: 'Es una decisión de administración: la toma el **DBA**.', source: A },
  { id: 'bd-03', module: 't1', type: 'mcq', prompt: 'La arquitectura ANSI-SPARC permite:', options: ['Independencia lógica y física de los datos', 'Accesos más rápidos', 'Mayor seguridad', 'Simplificar la integridad'], answer: 0, explain: 'Los tres niveles separan cómo se ven, cómo se modelan y cómo se guardan los datos.', source: A },
  { id: 'bd-04', module: 't1', type: 'mcq', prompt: '¿Quién convierte una petición SQL en operaciones internas?', options: ['El procesador de consultas', 'El DBA', 'El generador de catálogo', 'El gestor de almacenamiento'], answer: 0, explain: 'El procesador (u optimizador) de consultas analiza y traduce la consulta.', source: A },
  { id: 'bd-05', module: 't1', type: 'mcq', prompt: 'Las reglas de integridad sirven para:', options: ['Controlar que los datos estén correctamente relacionados', 'Encontrar datos más rápido', 'Evitar la concurrencia', 'Controlar el acceso de cada usuario'], answer: 0, explain: 'Integridad = coherencia de los datos (PK, FK, dominios). El acceso es **seguridad**.', source: A },
  { id: 'bd-06', module: 't1', type: 'mcq', prompt: 'Las bases de datos transaccionales soportan:', options: ['Muchas operaciones de la operatoria diaria', 'Muchas operaciones de análisis de negocio', 'Pocas operaciones operativas', 'Solo datos históricos'], answer: 0, explain: 'OLTP: altas, bajas, modificaciones y consultas del día a día.', source: A },
  { id: 'bd-07', module: 't1', type: 'tf', prompt: 'El SGBD es el componente principal del catálogo de la base de datos.', answer: false, explain: 'El SGBD es un componente importante del **sistema** de base de datos; el catálogo son los metadatos que el SGBD administra.', source: A },
  { id: 'bd-08', module: 't2', type: 'mcq', prompt: '"Un equipo tiene varios jugadores y cada jugador pertenece a un solo equipo." La cardinalidad es:', options: ['1:N (Equipo 1 — N Jugador)', 'N:M', '1:1', 'N:1 con Jugador del lado 1'], answer: 0, explain: 'Del lado del jugador el máximo es 1 equipo; del lado del equipo, muchos jugadores.', source: A },
  { id: 'bd-09', module: 't2', type: 'mcq', prompt: '"Cada comida tiene varios ingredientes y cada ingrediente se usa en varias comidas." ¿Cómo se modela?', options: ['N:M resuelta con una entidad intermedia', '1:N de Comida a Ingrediente', '1:1', 'Ingrediente como atributo multivaluado de Comida'], answer: 0, explain: 'Muchos a muchos → entidad asociativa (Receta) con las dos claves.', source: A },
  { id: 'bd-10', module: 't2', type: 'mcq', prompt: '"Cada vehículo tiene un número de motor y cada motor corresponde a un solo vehículo." La relación es:', options: ['1:1', '1:N', 'N:M', 'No hay relación'], answer: 0, explain: 'Máximo 1 de cada lado.', source: A },
  { id: 'bd-11', module: 't2', type: 'mcq', prompt: 'En pata de gallo, el símbolo **o<** del lado de una entidad indica:', options: ['Cero o muchos (opcional, máximo N)', 'Uno y solo uno', 'Uno o muchos', 'Exactamente cero'], answer: 0, explain: 'El círculo es la modalidad mínima 0; la pata de gallo, el máximo N.' },
  { id: 'bd-12', module: 't2', type: 'mcq', prompt: '"Un proveedor puede vender varios equipos o ninguno." Del lado de Equipo, la modalidad es:', options: ['Opcional (cero o muchos)', 'Obligatoria (uno o muchos)', 'Uno y solo uno', 'No se puede saber'], answer: 0, explain: '"o ninguno" → mínimo 0. En el final se escribe como **supuesto**.', source: F },
  { id: 'bd-13', module: 't2', type: 'mcq', prompt: '"Cada departamento tiene un solo jefe, pero cada jefe puede dirigir varios departamentos." ¿Dónde va la FK?', options: ['En Departamento (id del empleado jefe)', 'En Empleado (id del departamento)', 'En una tabla intermedia', 'En ambas'], answer: 0, explain: 'Es 1:N (jefe 1 — N departamentos): la FK va del lado N, Departamento.', source: A },
  { id: 'bd-14', module: 't3', type: 'mcq', prompt: 'La **fecha** en que un guía da un paseo por una ruta (un guía hace muchas rutas y una ruta tiene muchos guías) va en:', options: ['La entidad intermedia Paseo_Guía', 'Guía', 'Ruta', 'Una tabla Fecha aparte'], answer: 0, explain: 'En este supuesto se pide registrar salidas realizadas. La fecha describe el evento guía–ruta; no es un requisito del modelo que solo indica habilitación universal.', source: F },
  { id: 'bd-15', module: 't3', type: 'tf', prompt: 'Una entidad débil puede identificarse por sí sola, sin la entidad de la que depende.', answer: false, explain: 'Justamente la débil **necesita** la clave de la fuerte para identificarse.' },
  { id: 'bd-16', module: 't4', type: 'mcq', prompt: 'Al pasar una relación 1:N al modelo relacional:', options: ['La PK del lado 1 va como FK en la tabla del lado N', 'La PK del lado N va como FK en el lado 1', 'Siempre se crea una tabla intermedia', 'Se fusionan las tablas'], answer: 0, explain: 'Cada fila del lado N apunta a una sola fila del lado 1.' },
  { id: 'bd-17', module: 't4', type: 'mcq', prompt: 'Una estructura **no** está en 1FN cuando:', options: ['Tiene grupos repetitivos (un veterinario con varias mascotas en la misma fila)', 'Tiene una dependencia transitiva', 'Tiene una dependencia parcial', 'Tiene clave compuesta'], answer: 0, explain: '1FN exige valores atómicos: se separa el grupo repetitivo en otra estructura con la clave como FK.', source: F },
  { id: 'bd-18', module: 't4', type: 'mcq', prompt: 'PK (Matr_Veterinario, Nro_Mascota, Fecha_Consulta). Nom_Mascota depende solo de Nro_Mascota. Eso viola:', options: ['2FN (dependencia parcial)', '1FN', '3FN (transitiva)', 'Ninguna'], answer: 0, explain: 'Depende de **parte** de la clave compuesta → se lleva a una estructura Mascota.', source: F },
  { id: 'bd-19', module: 't4', type: 'mcq', prompt: 'En Veterinario (Matr*, Nom, Cod_Esp, Nom_Esp), Nom_Esp depende de Cod_Esp. Eso viola:', options: ['3FN (dependencia transitiva)', '2FN', '1FN', 'La integridad referencial'], answer: 0, explain: 'Un no primo depende de otro no primo → se crea Especialidad (Cod_Esp*, Nom_Esp) y Cod_Esp queda como FK.', source: F },
  { id: 'bd-20', module: 't4', type: 'tf', prompt: 'Una tabla en 1FN con clave primaria simple está automáticamente en 2FN.', answer: true, explain: 'Sin clave compuesta no puede haber dependencia de **parte** de la clave.' },
  { id: 'bd-21', module: 't5', type: 'mcq', prompt: 'Para **restar** dos relaciones se requiere que:', options: ['Sean compatibles con la unión', 'Tengan el mismo número de filas', 'Sean iguales', 'Nada'], answer: 0, explain: 'Diferencia, unión e intersección piden mismo grado y dominios compatibles.', source: A },
  { id: 'bd-22', module: 't5', type: 'mcq', prompt: 'Para el **producto cartesiano** se requiere:', options: ['Nada en particular', 'Compatibilidad con la unión', 'Que sean iguales', 'Que tengan la misma clave'], answer: 0, explain: 'El producto combina cada fila de una con cada fila de otra, sin condiciones.', source: A },
  { id: 'bd-23', module: 't5', type: 'mcq', prompt: '"Nombres de alumnos que cursaron Análisis I **y** aprobaron su final." La operación final es:', options: ['Intersección (Cursaron ∩ Aprobaron)', 'Unión', 'Diferencia', 'Producto cartesiano'], answer: 0, explain: 'Se calculan los dos conjuntos por separado y se intersecan (así lo resolvió el final 2024).', source: F },
  { id: 'bd-24', module: 't5', type: 'mcq', prompt: '"Artículos que **no** son del rubro Bazar." En álgebra se resuelve con:', options: ['π codArt(Artículo) − π codArt(Artículo ⨝ σ nombre=\'Bazar\'(Rubro))', 'σ nombre=\'Bazar\'(Rubro)', 'Artículo × Rubro', 'π codArt(Artículo) ∪ π codRubro(Rubro)'], answer: 0, explain: 'Todos menos los que sí son de Bazar. (También vale seleccionar nombre ≠ \'Bazar\' tras la junta, si cada artículo tiene un solo rubro).', source: A },
  { id: 'bd-25', module: 't5', type: 'mcq', prompt: 'La proyección π:', options: ['Elige columnas y elimina filas duplicadas', 'Filtra filas', 'Combina tablas', 'Ordena el resultado'], answer: 0, explain: 'σ filtra filas; π elige columnas.' },
  { id: 'bd-26', module: 't6', type: 'mcq', prompt: 'Dar de baja a los alumnos con más de 10 exámenes desaprobados entre 2023 y 2024:', options: ['UPDATE Alumno SET estado = \'baja\' WHERE legajo IN (SELECT legajo FROM Examen WHERE nota < 6 AND fecha BETWEEN … GROUP BY legajo HAVING COUNT(*) > 10)', 'DELETE FROM Alumno WHERE nota < 6', 'UPDATE Alumno SET estado = \'baja\' WHERE COUNT(nota < 6) > 10', 'UPDATE Examen SET estado = \'baja\''], answer: 0, explain: 'UPDATE con subconsulta: el conteo va en HAVING dentro del SELECT. "Dar de baja" es cambiar un estado, no borrar.', source: F },
  { id: 'bd-27', module: 't6', type: 'tf', prompt: 'Un UPDATE sin cláusula WHERE modifica todas las filas de la tabla.', answer: true, explain: 'Sin filtro, aplica a todas.' },
  { id: 'bd-28', module: 't7', type: 'mcq', prompt: 'Artículos cuyo código **comienza** con LIB:', options: ['WHERE CodArt LIKE \'LIB%\'', 'WHERE CodArt >= \'LIB\'', 'WHERE CodArt = \'LIB%\'', 'WHERE CodArt LIKE \'%LIB\''], answer: 0, explain: '% = cualquier secuencia. \'%LIB\' sería "termina con". Ojo: \'LIB %\' con espacio exigiría un espacio después de LIB.', source: A },
  { id: 'bd-29', module: 't7', type: 'mcq', prompt: 'Clientes **sin** e-mail:', options: ['WHERE email IS NULL', 'WHERE email = \' \'', 'WHERE email = NULL', 'WHERE email NOT LIKE \'%\''], answer: 0, explain: 'El nulo no se compara con =: se usa IS NULL.', source: A },
  { id: 'bd-30', module: 't7', type: 'mcq', prompt: 'Pedidos del año 2017:', options: ['WHERE fecha BETWEEN \'01-01-2017\' AND \'31-12-2017\'', 'WHERE fecha = 2017', 'WHERE fecha LIKE 2017', 'WHERE YEAR = 2017'], answer: 0, explain: 'BETWEEN incluye los extremos. También sirve fecha > \'31-12-2016\' AND fecha < \'01-01-2018\'.', source: A },
  { id: 'bd-31', module: 't7', type: 'mcq', prompt: 'Alumnos que rindieron con la profesora X y **nunca** aprobaron con ella:', options: ['… WHERE E.profesor = \'X\' AND A.legajo NOT IN (SELECT legajo FROM Examen WHERE profesor = \'X\' AND nota >= 6)', '… WHERE E.profesor = \'X\' AND E.nota < 6', '… WHERE nota NOT IN (6)', '… HAVING nota < 6'], answer: 0, explain: '"Nunca aprobó" no es "tuvo una nota < 6": alguien pudo desaprobar y después aprobar. Hace falta NOT IN (o NOT EXISTS) sobre los aprobados.', source: F },
  { id: 'bd-32', module: 't7', type: 'mcq', prompt: 'Para filtrar "alumnos con más de un 10" se usa:', options: ['GROUP BY legajo HAVING COUNT(*) > 1 (con WHERE nota = 10)', 'WHERE COUNT(*) > 1', 'ORDER BY nota', 'WHERE nota > 1'], answer: 0, explain: 'WHERE no admite funciones de agregado: el conteo por grupo va en HAVING.', source: F },
  { id: 'bd-33', module: 't7', type: 'tf', prompt: 'Con GROUP BY, el SELECT puede incluir cualquier columna aunque no esté agrupada ni agregada.', answer: false, explain: 'Solo columnas del GROUP BY o funciones de agregado.' },
  { id: 'bd-34', module: 't7', type: 'mcq', prompt: 'Nombre y apellido en una sola columna separados por un espacio:', options: ['SELECT nombre + \' \' + apellido FROM cliente', 'SELECT \'nombre\' + \' \' + \'apellido\' FROM cliente', 'SELECT nombre, apellido FROM cliente', 'SELECT nombre AND apellido FROM cliente'], answer: 0, explain: 'Con comillas, \'nombre\' es un texto literal, no la columna.', source: A },
];

const ex = FINAL_EXERCISES;

const content: SubjectContent = {
  subjectId: 'bd', theory, questions: q, exercises: ex, videos: VIDEOS,
  cheatsheet: [
    { t: 'Sistema de BD', d: 'BD = datos + metadatos · sistema = BD + SGBD + aplicaciones + hardware + usuarios · DBA: backups y permisos · ANSI-SPARC: independencia lógica y física.' },
    { t: 'DER', d: '|| uno y solo uno · o< cero o muchos · |< uno o muchos · N:M → entidad intermedia · escribir SUPUESTOS.' },
    { t: 'Paso a tablas', d: '1:N → FK en el lado N · N:M → tabla con PK compuesta por las dos FK · atributo de la relación va en la intermedia.' },
    { t: 'Normalización', d: '1FN sin grupos repetitivos · 2FN sin dependencias parciales (solo con PK compuesta) · 3FN sin transitivas.' },
    { t: 'Álgebra', d: 'σ filas · π columnas · ⨝ junta · × sin requisitos · ∪ − ∩ compatibles con la unión · "NO" = diferencia · "Y" = intersección.' },
    { t: 'SQL', d: 'WHERE filtra filas · HAVING filtra grupos (COUNT) · LIKE \'X%\' · IS NULL · BETWEEN incluye extremos · "nunca" → NOT IN / NOT EXISTS · UPDATE … WHERE campo IN (SELECT …).' },
  ],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] }));
content.lessons = [
  {
    id: 'bd-clase-1', examId: 'final', title: 'Final completo: diseño, álgebra y SQL',
    summary: 'Sistema, DER, normalización, álgebra y SQL con ejemplos del modelo anterior. La clase siguiente recorre todos sus incisos.',
    intro: [
      'Esta es la clase completa para el final de Base de Datos. El modelo anterior reúne cuatro partes: DER, normalización, álgebra y SQL. Su estructura no confirma el formato del próximo examen.',
      'Arrancamos por el sistema de base de datos, después el modelo entidad-relación y la normalización, y cerramos con álgebra relacional y SQL.',
    ],
    parts: ['b1', 'b2', 'b3', 'b4', 'q:bd-18', 'b5', 'ex:bd-e5', 'b6', 'b7', 'q:bd-21'],
    outro: [
      '1:N → la PK del lado 1 viaja como FK al lado N. N:M → entidad intermedia. 1FN sin grupos repetitivos · 2FN sin parciales · 3FN sin transitivas.',
      'σ filtra filas, π columnas, ⨝ combina; "y" → ∩, "no" → todos − los que sí. FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
      'Escribí siempre los supuestos del DER y practicá con las preguntas de la web hasta el 80 %.',
    ],
  },
  {
    id: 'bd-clase-2', examId: 'final', title: 'Final resuelto: DER, dependencias y consultas',
    summary: 'Los siete incisos de un modelo anterior: DER, 3FN, dos consultas de álgebra y tres de SQL. Incluye las correcciones y los casos límite.',
    intro: [
      'Vamos a resolver un modelo anterior de Base de Datos, con redacción y dibujos propios. No confirma el formato de tu próximo final. Vamos a justificar las relaciones, seguir las claves y comprobar qué filas debe devolver cada consulta.',
      'Primero rutas y equipos; después consultas veterinarias y normalización; luego álgebra relacional y las tres consultas SQL. Prestá atención a quienes nunca rindieron, los nombres repetidos y los límites del período de fechas.',
    ],
    parts: ['ex:bd-e1', 'ex:bd-e2', 'ex:bd-e3', 'ex:bd-e5', 'ex:bd-e4', 'ex:bd-e6', 'ex:bd-e7'],
    outro: [
      'Identificá primero el universo de filas y conservá las claves hasta el último paso. En un DER no agregues eventos que el problema no pide. En normalización seguí las dependencias funcionales.',
      'Nunca aprobó se comprueba buscando la ausencia de una aprobación. Para contar, filtrá filas, agrupá por legajo y aplicá HAVING. En fechas con hora, un intervalo semiabierto evita perder el último día.',
    ],
  },
];

export default content;
