// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "iisw-f1-conceptos-ciclos",
  "module": "m1",
  "title": "Final 1 · Conceptos y ciclos de vida",
  "src": "videos/iisw/iisw-f1-conceptos-ciclos.mp4",
  "poster": "videos/iisw/iisw-f1-conceptos-ciclos.jpg",
  "minutes": 2.0,
  "transcript": "Introducción a la Ingeniería de Software, preparación del final. Video uno: conceptos básicos, cualidades, principios y ciclos de vida.\n\nPregunta clásica de final: la diferencia entre sistema y software. Un sistema combina software, hardware, gente, datos, documentación y procedimientos: procesos computarizados y manuales. El software es solo la parte lógica, la computacional.\n\nCualidades. Del producto: correctitud, cumplir la especificación; robustez, aguantar lo no previsto; confiabilidad, performance y amigabilidad. Y del proceso: productividad, visibilidad y oportunidad, que es entregar a tiempo.\n\nPrincipios: rigor, separación de incumbencias, modularidad, abstracción, anticipación al cambio, generalización e incrementalidad. Y la modularidad, que preguntan siempre, exige alta cohesión y bajo acoplamiento.\n\nCiclos de vida. Cascada: secuencial y rígido, para requisitos estables; el cliente ve el producto recién al final. Espiral, de Boehm: suma el análisis de riesgos. Incremental: entrega subsistemas operativos, y así subsana que en cascada el cliente no ve avances. Prototipos: para cuando el cliente no sabe lo que quiere. Y UP: iterativo e incremental, con cuatro fases: inicio, elaboración, construcción y transición.\n\nY las ágiles. En Scrum se trabaja en sprints de una a cuatro semanas. El Product Owner administra el backlog y define prioridades. El equipo es autogestionado, de unas siete personas. El Scrum Master es un coach, no un jefe. Y Product Owner y Scrum Master nunca son la misma persona. En XP: programación en pares y cliente en el sitio.\n\nSiguiente video: extracción de requerimientos y modelado del negocio."
 },
 {
  "id": "iisw-f2-extraccion-modelado",
  "module": "m4",
  "title": "Final 2 · Extracción y modelado del negocio",
  "src": "videos/iisw/iisw-f2-extraccion-modelado.mp4",
  "poster": "videos/iisw/iisw-f2-extraccion-modelado.jpg",
  "minutes": 1.5,
  "transcript": "Video dos: técnicas de extracción de requerimientos y modelado del negocio.\n\nTres técnicas. La entrevista: conversación dirigida con un propósito. El cuestionario: para muchas personas o lugares dispersos. Y la observación directa, que detecta procedimientos informales que nadie documentó.\n\nLas estructuras de entrevista, que piden en el final. Pirámide: de cerradas a abiertas, para un entrevistado poco participativo. Embudo: de abiertas a cerradas, para quien necesita expresarse. Diamante: cerradas, abiertas y otra vez cerradas.\n\nErrores a evitar: las preguntas tendenciosas, que muestran tu opinión, como \"qué opina de este obsoleto sistema\", y las preguntas dobles, dos en una.\n\nEl modelo de negocio describe los procesos de la empresa y sirve para entender qué conviene informatizar. Se grafica con el diagrama de actividad: inicio y fin, actividades, decisiones con condiciones de guarda, barras de sincronización para el paralelismo y carriles para los responsables.\n\nY BPMN, con eventos, actividades, compuertas, pools y lanes. En el final te dan un BPMN para marcar tres errores, y las marcas incorrectas descuentan. Los típicos: falta un evento de inicio o de fin, una compuerta sin condición, o un flujo de secuencia que cruza pools donde debería ir un flujo de mensaje.\n\nSiguiente video: ingeniería de requerimientos y especificación."
 },
 {
  "id": "iisw-f3-requerimientos-srs",
  "module": "m6",
  "title": "Final 3 · Requerimientos y SRS",
  "src": "videos/iisw/iisw-f3-requerimientos-srs.mp4",
  "poster": "videos/iisw/iisw-f3-requerimientos-srs.jpg",
  "minutes": 1.5,
  "transcript": "Video tres: ingeniería de requerimientos y especificación.\n\nLa ingeniería de requerimientos tiene cuatro etapas: extracción, análisis, especificación y validación con el cliente. Debe describir el comportamiento externo completo y generar la SRS. No diseña estructuras de datos ni módulos.\n\n¿Por qué hacerla? Porque un error de requerimientos detectado en pruebas puede costar miles de veces más que detectarlo al principio. Y los defectos típicos son los requisitos ambiguos y el usuario poco involucrado.\n\nLa SRS. Incluye funcionalidad, interfaces externas, rendimiento, atributos y restricciones de diseño. No incluye costos, cronogramas ni diseño. Una buena SRS, según IEEE ochocientos treinta, es correcta, no ambigua, completa, consistente, verificable, modificable y trazable. Y el estándar es una guía que cada organización adapta.\n\nLa trampa de verdadero o falso más repetida: \"hay que cuantificar, aunque eso no afectará la solución\". Es falso: un mismo problema con distinto volumen lleva a soluciones distintas. Se cuantifican requisitos estáticos, como usuarios simultáneos, y dinámicos, como transacciones por hora.\n\nCon esto tenés la primera mitad. La segunda, casos de uso, descripción, secuencia, pruebas, tipos de sistemas y métodos formales, está en los otros siete videos de esta misma sección. Éxitos en el final."
 }
];
