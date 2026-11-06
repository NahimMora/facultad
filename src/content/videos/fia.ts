// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "fia-1-ia-busqueda",
  "module": "m3",
  "title": "1 · IA, problemas y búsqueda",
  "src": "videos/fia/fia-1-ia-busqueda.mp4",
  "poster": "videos/fia/fia-1-ia-busqueda.jpg",
  "minutes": 1.6,
  "transcript": "Fundamentos de la Inteligencia Artificial, preparación del final. Video uno: qué es la IA, cómo se define un problema y los métodos de búsqueda.\n\nLa IA intenta comprender las entidades inteligentes y construirlas. La IA es lo más amplio. Adentro está el machine learning, donde el usuario define las características. Y adentro el deep learning, donde la red aprende sola qué atributos importan.\n\nEn el final de diciembre preguntaron la definición de problema. Una entidad tiene un problema cuando tiene un objetivo y no conoce de antemano la secuencia de acciones para alcanzarlo.\n\nEl árbol de espacio de estados tiene todas las posibilidades; cada búsqueda genera solo una parte, el árbol de exploración. La búsqueda en amplitud recorre nivel por nivel: es completa y, con costos uniformes, óptima, pero gasta mucha memoria. La búsqueda en profundidad baja por una rama hasta el fondo: gasta poca memoria, pero no es completa ni óptima. Las búsquedas informadas usan una heurística: ascenso en colina, búsqueda en haz y primero el mejor.\n\nEl conocimiento se representa con cuatro técnicas: redes semánticas, con nodos y arcos rotulados; guiones; marcos, con ranuras; y reglas de producción, del tipo si entonces.\n\nProlog es programación lógica. Un programa son hechos y reglas, y se usa con consultas. Las variables empiezan con mayúscula. Funciona con unificación, instanciación y retroceso: si una unificación falla, vuelve atrás y prueba otra.\n\nSiguiente video: sistemas expertos y lógica difusa."
 },
 {
  "id": "fia-2-expertos-difusa",
  "module": "m5",
  "title": "2 · Sistemas expertos y lógica difusa",
  "src": "videos/fia/fia-2-expertos-difusa.mp4",
  "poster": "videos/fia/fia-2-expertos-difusa.jpg",
  "minutes": 1.6,
  "transcript": "Video dos: sistemas expertos y razonamiento aproximado. Son de los temas que más aparecen en los finales.\n\nUn sistema experto simula la conducta de un experto humano en un dominio, y es un tipo de sistema basado en conocimiento. Tiene cuatro componentes: la base de reglas, con el conocimiento del dominio; el motor de inferencias, que razona; la memoria de trabajo, con los hechos del caso; y el trazador de explicaciones, que explica cómo llegó a la conclusión.\n\nEl motor razona de dos formas. Hacia adelante: dirigido por los datos, dispara las reglas cuyos antecedentes son verdaderos. Hacia atrás: dirigido por el objetivo, verifica los consecuentes.\n\nLa metodología tiene cinco etapas. Adquisición del conocimiento. Conceptualización, que arma el árbol de causalidad. Formalización, donde ese árbol se transforma en reglas si entonces: esto lo preguntaron en diciembre. Implementación, con un shell, que es un sistema experto con la base de reglas vacía. Y validación.\n\nRazonamiento aproximado. La lógica binaria solo admite verdadero o falso. La lógica difusa gradúa la verdad en el intervalo de cero a uno, con funciones de pertenencia. El proceso es fuzzificación, inferencia y defuzzificación, que convierte el conjunto difuso de nuevo en un valor nítido.\n\nY la otra rama es la probabilística: las redes bayesianas, grafos acíclicos dirigidos que representan variables y sus dependencias condicionales. Siguiente video: redes neuronales y perceptrón."
 },
 {
  "id": "fia-3-neuronas",
  "module": "m7",
  "title": "3 · Redes neuronales y perceptrón",
  "src": "videos/fia/fia-3-neuronas.mp4",
  "poster": "videos/fia/fia-3-neuronas.jpg",
  "minutes": 1.2,
  "transcript": "Video tres: redes neuronales artificiales y el perceptrón.\n\nLa analogía con la neurona biológica: las dendritas son las entradas, las sinapsis son los pesos, el núcleo procesa y el axón es la salida.\n\nEl cálculo: primero la suma ponderada de entradas por pesos, más el bias. Después la función de activación, que es no lineal, da la salida. Ojo: en el final preguntaron cuál de las dos aplica la función no lineal, y es la función de activación.\n\nAprender es modificar los pesos. Supervisado: hay una respuesta deseada y se corrige el error. No supervisado: la red se autoorganiza, como en clustering. Por refuerzo: solo recibe éxito o fracaso. Y recordá: las capas ocultas son opcionales.\n\nEl perceptrón separa con una recta: dos clases y problemas linealmente separables. Por eso resuelve AND pero no XOR. Ajusta los pesos con w nuevo igual a w viejo más alfa por error por x. La solución para XOR o más clases es el perceptrón multicapa.\n\nSiguiente video: algoritmos genéticos, meméticos, agentes y robótica."
 },
 {
  "id": "fia-4-evolutivos-agentes",
  "module": "m9",
  "title": "4 · Evolutivos, meméticos, agentes y robótica",
  "src": "videos/fia/fia-4-evolutivos-agentes.mp4",
  "poster": "videos/fia/fia-4-evolutivos-agentes.jpg",
  "minutes": 1.5,
  "transcript": "Video cuatro, el último: algoritmos evolutivos, meméticos, agentes y robótica.\n\nLos algoritmos genéticos se inspiran en Darwin. Tienen una población de individuos, cada uno con un cromosoma de genes, y una función fitness que mide su aptitud. Los operadores son tres: selección, que elige a los padres; cruce, que mezcla sus genes; y mutación, que introduce diversidad y evita estancarse en óptimos locales. No garantiza mejorar.\n\nLos meméticos suman búsqueda local al evolutivo. Buscan equilibrar exploración, que hace bien el evolutivo, con explotación, que hace la búsqueda local. En el enfoque de Lamarck lo aprendido se hereda. En el de Baldwin no se modifica el genotipo: solo se hereda el fitness.\n\nUn agente percibe con sensores y actúa con efectores. Es racional si maximiza su rendimiento con lo que sabe, aunque puede equivocarse. El reactivo responde a estímulos directos. El inteligente razona y planifica. Y en los sistemas multiagente varios agentes se comunican intencionalmente.\n\nY la trampa de robótica del final de diciembre: la robótica es más específica que la automatización, pero lo que se define por procesos sin intervención humana es la automatización, no la robótica. Por eso la afirmación era falsa.\n\nListo, con esto repasaste los doce módulos. Practicá con las preguntas de la web, que tienen el formato de los finales. Éxitos."
 }
];
