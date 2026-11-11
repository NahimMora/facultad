import type { WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, scene, table, txt } from './h';

export const SQL_NEVER = `SELECT A.nombre
FROM Alumno A
WHERE NOT EXISTS (
  SELECT 1 FROM Examen E
  WHERE E.legajo = A.legajo
    AND E.profesor = :docente
    AND E.nota >= 6
);`;
export const SQL_TENS = `SELECT A.nombre
FROM Alumno A
WHERE A.legajo IN (
  SELECT E.legajo FROM Examen E
  WHERE E.nota = 10
  GROUP BY E.legajo
  HAVING COUNT(*) > 1
);`;
export const SQL_UPDATE = `UPDATE Alumno SET estado = 'baja'
WHERE legajo IN (
  SELECT legajo FROM Examen
  WHERE nota < 6
    AND fecha >= '2023-01-01'
    AND fecha <  '2025-01-01'
  GROUP BY legajo
  HAVING COUNT(*) > 10
);`;

function codeScene(title: string, code: string, steps: number[], say: string[], note: string): VisScene {
  const lines = code.split('\n');
  return scene([
    head(title),
    box(15, 65, 610, lines.length * 40 + 35, '', { c: 'blue' }),
    ...lines.map((t, i) => txt(30, 100 + i * 40, t, { fs: 24, mono: true, anchor: 'start', s: steps[i] ?? 0 })),
    box(15, lines.length * 40 + 130, 610, 150, note, { fs: 26, c: 'green', s: say.length - 1 }),
  ], say, 640, lines.length * 40 + 310);
}

export const FINAL_SCENES: Record<string, VisScene[]> = {
  'bd-e1': [
    scene([
      head('1 · Entidades y claves del recorrido'),
      box(20, 70, 600, 125, 'Ruta\ncódigo PK · nombre · duración\ndificultad FK', { id: 'ruta', fs: 26, c: 'blue' }),
      box(20, 265, 600, 90, 'Dificultad\ncódigo PK · descripción', { id: 'dif', s: 1, fs: 26, c: 'purple' }),
      arr('dif', 'ruta', { ea: '||', eb: 'o<', s: 1 }),
      box(20, 430, 600, 120, 'Guía\nmatrícula PK · nombre · apellido\ndomicilio · email · WhatsApp', { s: 2, fs: 26, c: 'orange' }),
      box(20, 595, 600, 110, 'Todos los guías están habilitados\nEso no registra paseos realizados ni fechas', { s: 3, fs: 26, c: 'green' }),
    ], [
      'Separá los objetos sobre los que necesitás guardar datos. Ruta tiene un código identificador, nombre y duración. El nivel de dificultad se representa mediante una referencia, porque también tiene código y descripción propios. La clave distingue rutas aunque dos tengan el mismo nombre.',
      'Cada ruta corresponde a una dificultad. Una dificultad puede clasificar varias rutas: la clave de Dificultad viaja como clave foránea a Ruta. El mínimo de rutas por dificultad no está precisado; el cero del dibujo es un supuesto explícito, no un dato adicional del modelo.',
      'Guía se identifica por matrícula y conserva los datos personales y de contacto que pide el caso. No uses el nombre como clave. Tampoco conviertas en obligatoriamente único un teléfono o un correo si esa regla no fue establecida.',
      'Que todos los guías estén habilitados para todas las rutas no obliga a almacenar cada combinación posible. El modelo no pide un historial de salidas. Si otro problema solicitara qué guía hizo qué paseo y en qué fecha, recién ahí agregarías una entidad para ese evento y justificarías su identificador.',
    ], 640, 740),
    scene([
      head('1 · Dos relaciones, dos decisiones'),
      box(20, 65, 260, 85, 'Ruta\ncódigo PK', { id: 'r', fs: 27, c: 'blue' }),
      box(360, 65, 260, 85, 'Equipo\ncódigo PK', { id: 'e', fs: 27, c: 'orange' }),
      arr('r', 'e', { ea: '|<', eb: '|<' }),
      txt(320, 200, 'Ruta N:M Equipo', { fs: 26, c: 'gray' }),
      box(20, 235, 600, 100, 'RutaEquipo\nPK (ruta FK, equipo FK)', { s: 1, fs: 27, c: 'green' }),
      box(20, 420, 260, 100, 'Proveedor\nCUIT PK', { id: 'p', s: 2, fs: 27, c: 'purple' }),
      box(360, 420, 260, 100, 'Equipo\nproveedor FK', { id: 'eq', s: 2, fs: 27, c: 'orange' }),
      arr('p', 'eq', { ea: '||', eb: '|<', s: 2 }),
      box(20, 590, 600, 110, 'Equipo: nombre, descripción y cantidad\nProveedor: nombre, domicilio y contacto', { s: 3, fs: 26 }),
    ], [
      'Una ruta requiere varios equipos y un equipo se usa en una o más rutas. Eso es muchos a muchos. Un solo campo con una lista de códigos mezclaría varios valores y dificultaría controlar las referencias. El dibujo usa participación mínima uno según la descripción de este caso.',
      'Creá RutaEquipo con una fila por combinación. Su clave primaria es el par código de ruta y código de equipo, y ambos componentes son claves foráneas. Así evitás repetir una asociación sin impedir que la misma ruta necesite distintos equipos.',
      'Cada equipo procede de un único proveedor y un proveedor suministra varios equipos. Es uno a muchos: guardá el CUIT del proveedor como clave foránea en Equipo. No hace falta una tabla intermedia para esta relación si no hay otros hechos que registrar.',
      'Completá los atributos pedidos: Equipo conserva nombre, descripción y cantidad disponible; Proveedor conserva nombre y contacto. Revisá cada relación en ambos sentidos y escribí cualquier supuesto. No agregues precios, fechas de compras ni asignaciones de guías como si estuvieran exigidos por el enunciado.',
    ], 640, 735),
  ],
  'bd-e2': [scene([
    head('2 · De dependencias a cuatro tablas'),
    box(20, 60, 600, 100, 'Consulta: clave (mascota, veterinario, fecha)\nLa clave completa determina el diagnóstico', { fs: 26 }),
    box(20, 205, 600, 90, 'Mascota → nombre\nDependencia parcial: separá Mascota', { s: 1, fs: 26, c: 'orange' }),
    box(20, 340, 600, 100, 'Veterinario → nombre, especialidad\nEspecialidad → nombre de especialidad', { s: 2, fs: 26, c: 'purple' }),
    table(20, 490, 600, ['Tabla', 'Clave y referencias'], [
      ['Mascota', 'número PK'], ['Veterinario', 'matrícula PK · esp. FK'], ['Especialidad', 'código PK'], ['Consulta', 'PK (mascota, vet., fecha)'],
    ], { fs: 24, rh: 65, cw: [1.1, 2.3], rs: [3, 3, 3, 3] }),
  ], [
    'Tomá una fila por consulta y asumí atributos atómicos. La combinación mascota, veterinario y fecha identifica la consulta en este ejercicio. El diagnóstico depende de esa combinación completa. Que un veterinario atienda muchas mascotas no viola por sí solo primera forma normal si cada fila ya tiene un único valor por atributo.',
    'El nombre de mascota depende únicamente de su número, una parte de la clave compuesta. Es una dependencia parcial de un atributo no primo y viola segunda forma normal. Separá Mascota y dejá su número como referencia en Consulta. El mismo razonamiento se aplica a los datos del veterinario.',
    'Una vez separado Veterinario, su matrícula determina nombre y código de especialidad. El nombre de especialidad depende del código, generando una dependencia transitiva. Separá Especialidad para llegar a tercera forma normal. Segunda forma normal elimina dependencias parciales; tercera elimina estas dependencias transitivas.',
    'Quedan Mascota, Veterinario, Especialidad y Consulta. Las dos primeras se conectan a Consulta mediante sus claves; Veterinario referencia Especialidad. Mantené el diagnóstico y la fecha en Consulta, porque describen el evento. La clave triple presupone que esa combinación distingue consultas; si el sistema admitiera varias consultas iguales en un mismo instante, habría que revisar ese supuesto.',
  ], 640, 850)],
  'bd-e3': [scene([
    head('3a · Álgebra: filtrar antes de proyectar'),
    box(20, 65, 600, 110, 'T = σ año=2023 ∧ cuatrimestre=1 (Cursa)', { id: 'c', fs: 27, c: 'blue' }),
    box(20, 230, 600, 110, 'M = σ descripción="Álgebra I" (Materia)', { id: 'm', s: 1, fs: 27, c: 'orange' }),
    box(20, 395, 600, 110, 'R = T ⋈ T.materia=M.cod_mat M', { id: 'r', s: 2, fs: 27, c: 'purple' }),
    box(20, 560, 600, 120, 'π atributos de Alumno\n(Alumno ⋈ Alumno.legajo=R.legajo R)', { s: 3, fs: 27, c: 'green' }),
  ], [
    'Para obtener los alumnos que cursaron Álgebra uno en el primer cuatrimestre de dos mil veintitrés, empezá por Cursa. Seleccioná año igual a dos mil veintitrés y cuatrimestre igual a uno. Las dos condiciones deben cumplirse en la misma inscripción.',
    'En Materia, seleccioná la descripción Álgebra uno. Conservá su código para poder relacionar esa materia con las inscripciones. El texto descriptivo permite encontrarla, pero la junta se construye con la clave correspondiente.',
    'Juntá los resultados por el código de materia: Cursa punto materia igual a Materia punto código. Evitá un producto cartesiano sin condición, que combinaría cada inscripción con materias ajenas. Nombrar los resultados intermedios ayuda a comprobar el recorrido.',
    'Juntá ahora con Alumno por legajo y proyectá todos los atributos de Alumno solicitados. La selección elige filas; la proyección elige columnas. En álgebra relacional clásica se trabaja con conjuntos, por lo que las repeticiones idénticas del alumno se eliminan en el resultado.',
  ], 640, 720)],
  'bd-e5': [scene([
    head('3b · Cursaron Y aprobaron la misma materia'),
    box(20, 65, 600, 100, 'M = σ descripción="Análisis I" (Materia)', { fs: 27 }),
    box(20, 220, 600, 110, 'C = π legajo (Cursa ⋈ por materia M)', { s: 1, fs: 27, c: 'blue' }),
    box(20, 385, 600, 110, 'P = π legajo (σ nota≥6 (Examen)\n⋈ por materia M)', { s: 2, fs: 27, c: 'orange' }),
    box(20, 550, 600, 110, 'π nombre (Alumno ⋈ por legajo (C ∩ P))', { s: 3, fs: 27, c: 'green' }),
    box(20, 715, 600, 90, 'Intersecá legajos, no nombres\nDos personas pueden llamarse igual', { s: 3, fs: 26, c: 'purple' }),
  ], [
    'El requisito es doble: haber cursado Análisis uno y haber aprobado el final de esa misma materia. Seleccioná primero la materia por descripción. No alcanza con encontrar a alguien que cursó una materia y aprobó cualquier otra.',
    'Construí el conjunto de legajos que aparecen en Cursa para esa materia. Usá la igualdad entre el campo materia y el código de Materia. Proyectá legajos para que el resultado represente estudiantes identificados y sea compatible con el otro conjunto.',
    'Construí por separado el conjunto de legajos con un examen de esa materia y nota al menos seis, el umbral utilizado en este modelo. Un examen desaprobado anterior no impide pertenecer al conjunto si también hay una aprobación posterior.',
    'Intersecá los dos conjuntos de legajos, juntá con Alumno y proyectá el nombre al final. Intersecar nombres primero podría confundir dos personas homónimas: una que cursó y otra que aprobó. También podrías resolverlo mediante juntas con condiciones explícitas por legajo y materia; la identidad debe conservarse hasta comprobar ambos requisitos.',
  ], 640, 845)],
  'bd-e4': [codeScene('4a · Nunca aprobó con el docente indicado', SQL_NEVER, [0, 0, 1, 1, 2, 2, 2, 3], [
    'Partí de todos los alumnos. El pedido incluye a quienes nunca rindieron con el docente indicado, además de quienes rindieron sin aprobar. Un inner join inicial con los exámenes de ese docente borraría del universo justamente a quienes no tienen esos registros.',
    'NOT EXISTS exige que no exista una fila de examen que cumpla la subconsulta. No necesitás contar desaprobaciones ni encontrar una nota baja. La condición describe ausencia de aprobaciones, aunque el alumno tenga otros exámenes o no tenga ninguno.',
    'Correlacioná por legajo y filtrá simultáneamente el docente indicado y una nota mayor o igual a seis. El parámetro docente representa el valor que recibiría la consulta; no es una columna nueva. Una aprobación con otra persona no excluye al alumno, porque no cumple los tres filtros.',
    'Si no hay ningún examen, la subconsulta está vacía y el alumno queda incluido. Si desaprobó y después aprobó con ese docente, queda excluido. Esta es la diferencia que señala la corrección del modelo anterior. NOT EXISTS también evita el problema de NOT IN cuando la subconsulta puede devolver valores nulos.',
  ], 'Sin exámenes o solo desaprobó: entra\nAprobó con ese docente: no entra')],
  'bd-e6': [codeScene('4b · Más de un diez', SQL_TENS, [0, 0, 0, 1, 1, 2, 3, 3], [
    'Buscá alumnos con más de una calificación diez en exámenes finales. La identidad es el legajo. La subconsulta devolverá esos legajos y la consulta exterior recuperará sus nombres, sin juntar por nombres que podrían repetirse entre personas.',
    'WHERE nota igual a diez filtra las filas antes de agrupar. Cada fila de Examen representa un examen en este esquema. Contar notas diferentes después de este filtro daría siempre uno, porque todas las filas retenidas tienen exactamente el mismo valor diez.',
    'GROUP BY legajo reúne los exámenes de cada alumno. COUNT asterisco cuenta esas filas del grupo. La cantidad que interesa es cuántos exámenes con diez obtuvo cada persona, no cuántos nombres distintos ni cuántas calificaciones diferentes aparecen.',
    'HAVING COUNT mayor que uno conserva a quienes obtuvieron diez al menos dos veces. Un solo diez no alcanza. HAVING actúa sobre grupos ya construidos, mientras WHERE filtra filas individuales. No escribas COUNT dentro del WHERE de ese mismo nivel de consulta.',
  ], 'WHERE: deja los dieces\nGROUP BY: reúne por alumno · HAVING: exige 2 o más')],
  'bd-e7': [codeScene('4c · Actualizar solo a quienes cumplen', SQL_UPDATE, [0, 0, 1, 1, 2, 2, 3, 3, 3], [
    'El cambio solicitado es dar de baja a alumnos que desaprobaron más de diez exámenes durante dos mil veintitrés y dos mil veinticuatro. UPDATE modifica Alumno, pero su WHERE restringe la operación a los legajos que devuelve la subconsulta.',
    'En Examen, filtrá notas menores que seis. Estás contando desaprobaciones, no la cantidad total de exámenes ni materias diferentes. Un examen aprobado no debe incrementar el contador y un estudiante sin desaprobaciones no aparecerá en los grupos seleccionados.',
    'Usá fechas desde el primero de enero de dos mil veintitrés inclusive hasta el primero de enero de dos mil veinticinco exclusivo. Así entran los dos años completos, incluso si fecha incluye horas. Un límite de diciembre treinta y uno a medianoche podría dejar afuera exámenes del último día.',
    'Agrupá por legajo y exigí COUNT mayor que diez. Diez desaprobaciones exactas no alcanzan; once sí. Antes de aplicar una actualización real, verificá los legajos con un SELECT equivalente y trabajá con la transacción que corresponda. Este ejemplo se comprueba con datos sintéticos aislados, sin modificar una base real.',
  ], '10 desaprobaciones: no cambia\n11 dentro del período: estado pasa a baja')],
};

export const FINAL_EXERCISES: WorkedExercise[] = [
  { id: 'bd-e1', module: 't2', title: 'Final · 1. DER de rutas y equipos', statement: 'Modelá rutas con dificultad, guías habilitados para todas las rutas, equipos requeridos por rutas y proveedores. Cada equipo corresponde a un proveedor. Redacción propia del modelo anterior; los mínimos no explicitados se declaran como supuestos.', steps: [{ title: 'Entidades', body: 'Ruta, Dificultad, Guía, Equipo y Proveedor, con sus claves y atributos pedidos.' }, { title: 'Relaciones', body: 'Dificultad 1:N Ruta; Proveedor 1:N Equipo; Ruta N:M Equipo → RutaEquipo, PK compuesta por ambas FK.' }, { title: 'Alcance', body: 'Habilitación universal de guías no exige almacenar paseos realizados. Agregá eventos y fechas solo si otro requisito los pide.' }], result: 'Cinco entidades y RutaEquipo; claves y supuestos explícitos.' },
  { id: 'bd-e2', module: 't4', title: 'Final · 2. Normalización veterinaria', statement: 'Una fila por consulta: mascota, nombre de mascota, matrícula y nombre del veterinario, código y nombre de especialidad, fecha y diagnóstico. Suponé valores atómicos y clave (mascota, veterinario, fecha). Usá las dependencias funcionales para llegar a 3FN.', steps: [{ title: '2FN', body: 'Separá Mascota y Veterinario: sus datos dependen de partes de la clave de Consulta.' }, { title: '3FN', body: 'Especialidad determina su nombre: separá Especialidad de Veterinario.' }, { title: 'Referencias', body: 'Consulta referencia Mascota y Veterinario; Veterinario referencia Especialidad.' }], result: 'Mascota · Veterinario · Especialidad · Consulta.' },
  { id: 'bd-e3', module: 't5', title: 'Final · 3a. Inscripciones de Álgebra I', statement: 'Alumno(legajo, nombre, dirección, teléfono, estado), Cursa(legajo, materia, año, cuatrimestre), Materia(cod_mat, descripción). Obtené todos los datos de alumnos que cursaron Álgebra I en el primer cuatrimestre de 2023.', steps: [{ title: 'Selecciones', body: 'Cursa: año=2023 y cuatrimestre=1. Materia: descripción=Álgebra I.' }, { title: 'Juntas', body: 'Cursa.materia=Materia.cod_mat; luego Alumno.legajo=Cursa.legajo.' }, { title: 'Proyección', body: 'Proyectá los atributos de Alumno.' }], result: 'Seleccionar → juntar por claves → proyectar datos del alumno.' },
  { id: 'bd-e5', module: 't5', title: 'Final · 3b. Cursaron y aprobaron Análisis I', statement: 'Con las mismas tablas y Examen(legajo, materia, nota, fecha, profesor), obtené nombres de quienes cursaron Análisis I y aprobaron su final. Usá nota≥6, como en el modelo.', steps: [{ title: 'Cursaron', body: 'Proyectá legajos de Cursa para Análisis I.' }, { title: 'Aprobaron', body: 'Proyectá legajos de Examen de Análisis I con nota≥6.' }, { title: 'Intersección', body: 'Intersecá por legajo; juntá con Alumno y recién entonces proyectá nombre.' }], result: 'La intersección conserva la identidad del alumno y la misma materia.' },
  { id: 'bd-e4', module: 't7', title: 'Final · 4a. Nunca aprobaron con un docente', statement: 'Devolvé nombres de alumnos sin ninguna aprobación con el docente recibido como parámetro. Incluí también a quienes nunca rindieron con esa persona. Umbral del modelo: 6.', steps: [{ title: 'Consulta corregida', body: SQL_NEVER }, { title: 'Caso límite', body: 'Sin exámenes también cumple. Un INNER JOIN inicial contra ese docente lo excluiría por error.' }], result: 'NOT EXISTS de una aprobación correlacionada por legajo y docente.' },
  { id: 'bd-e6', module: 't7', title: 'Final · 4b. Alumnos con más de un diez', statement: 'Devolvé nombres de alumnos que obtuvieron nota 10 en más de un examen. Cada fila de Examen representa un examen registrado.', steps: [{ title: 'SQL', body: SQL_TENS }, { title: 'Orden', body: 'WHERE nota=10 → GROUP BY legajo → HAVING COUNT(*)>1.' }], result: 'Contá exámenes por alumno, no notas distintas.' },
  { id: 'bd-e7', module: 't6', title: 'Final · 4c. Baja por desaprobaciones', statement: 'Cambiá estado a baja para alumnos con más de 10 exámenes desaprobados durante 2023 y 2024. En este modelo desaprueba una nota menor que 6.', steps: [{ title: 'SQL', body: SQL_UPDATE }, { title: 'Límites', body: 'Fechas: [2023-01-01, 2025-01-01). Cantidad: >10, por lo tanto 11 o más.' }], result: 'Solo se actualizan los legajos que cumplen los tres filtros.' },
];
