// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "bd-1-der-normalizacion",
  "module": "t2",
  "title": "Final 1 · DER y normalización",
  "src": "videos/bd/bd-1-der-normalizacion.mp4",
  "poster": "videos/bd/bd-1-der-normalizacion.jpg",
  "minutes": 2.4,
  "transcript": "Base de Datos, preparación del final. El final tiene cuatro partes: un diagrama entidad relación, una normalización, álgebra relacional y SQL. Este primer video cubre las dos primeras.\n\nAntes, la teoría que entra en las preguntas. La base de datos son los datos más los metadatos. El sistema de base de datos suma el gestor, las aplicaciones, el hardware y los usuarios. El DBA define las políticas de backup y los permisos. Y la arquitectura ANSI SPARC, de tres niveles, da independencia lógica y física.\n\nEl diagrama, con notación pata de gallo. Dos barras: uno y solo uno. Círculo y pata: cero o muchos. Barra y pata: uno o muchos. Y toda relación de muchos a muchos se resuelve con una entidad intermedia.\n\nEl ejercicio del final: rutas, guías, equipos y proveedores. Un guía da paseos por muchas rutas y una ruta tiene muchos guías: entidad intermedia Paseo Guía, con la fecha adentro, porque depende de los dos. Una ruta usa muchos equipos y un equipo sirve a muchas rutas: Equipo Ruta. Un proveedor vende varios equipos: uno a muchos, con la clave foránea en Equipo.\n\nY lo que muchos se olvidan: escribir los supuestos. Si el enunciado no dice si un proveedor puede no vender nada, lo decidís y lo escribís. Por ejemplo: un proveedor puede vender varios equipos o ninguno.\n\nNormalización. Primera forma normal: sin grupos repetitivos, cada celda con un valor. Segunda: sin dependencias parciales, es decir, ningún atributo depende de una parte de la clave compuesta. Tercera: sin dependencias transitivas, ningún atributo no primo depende de otro no primo.\n\nEl caso del final: consultas veterinarias. Un veterinario atiende muchas mascotas: grupo repetitivo, se separa la consulta. El nombre de la mascota depende solo del número de mascota, que es parte de la clave: dependencia parcial, sale la tabla Mascota. Y el nombre de la especialidad depende del código de especialidad: transitiva, sale la tabla Especialidad.\n\nUn atajo útil: si la clave primaria es simple, la tabla ya está en segunda forma normal, porque no hay una parte de la clave de la que depender.\n\nSiguiente video: álgebra relacional y SQL."
 },
 {
  "id": "bd-2-algebra-sql",
  "module": "t5",
  "title": "Final 2 · Álgebra relacional y SQL",
  "src": "videos/bd/bd-2-algebra-sql.mp4",
  "poster": "videos/bd/bd-2-algebra-sql.jpg",
  "minutes": 1.9,
  "transcript": "Video dos: álgebra relacional y SQL, la segunda mitad del final.\n\nLos operadores. Sigma selecciona filas. Pi proyecta columnas. La junta combina tablas por una condición, y el producto cartesiano, todas las combinaciones, sin requisitos. Unión, diferencia e intersección exigen relaciones compatibles con la unión.\n\nLa regla para traducir el enunciado: si dice que NO, es una diferencia, todos menos los que sí. Si dice que cumplen las dos cosas, como cursaron y aprobaron, es una intersección. Así se resolvió el final: cursaron intersección aprobaron.\n\nSQL. El orden de la consulta: SELECT, las columnas; FROM y los JOIN; WHERE, que filtra filas antes de agrupar; GROUP BY; y HAVING, que filtra los grupos, donde van los COUNT.\n\nLas trampas de la autoevaluación. Comienza con: LIKE con el porcentaje al final. Sin mail: IS NULL, nunca igual a nulo. Un año: BETWEEN, que incluye los extremos.\n\nY la consulta más tramposa del final: alumnos que rindieron con una profesora y nunca aprobaron con ella. No alcanza con nota menor a seis, porque alguien pudo desaprobar y después aprobar. Hay que excluir con NOT IN a los que aprobaron alguna vez.\n\nLos conteos van en HAVING: alumnos con más de un diez, agrupás por legajo y pedís HAVING COUNT mayor que uno. Y para dar de baja a quienes desaprobaron más de diez exámenes, es un UPDATE con una subconsulta: SET estado igual a baja, WHERE legajo IN, y adentro el SELECT agrupado con su HAVING.\n\nResumen: supuestos escritos en el diagrama, dependencias parciales y transitivas en la normalización, diferencia para el no e intersección para el y, y HAVING para los conteos. Practicá con los ejercicios resueltos de esta sección. Éxitos."
 }
];
