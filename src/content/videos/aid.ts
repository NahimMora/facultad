// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "aid-1-data-mining",
  "module": "m8",
  "title": "1 · Qué es el Data Mining",
  "src": "videos/aid/aid-1-data-mining.mp4",
  "poster": "videos/aid/aid-1-data-mining.jpg",
  "minutes": 2.0,
  "transcript": "Análisis de la Información y la Decisión, segundo parcial. Video uno: qué es el data mining, sus seis tareas y el círculo virtuoso.\n\nLa definición de la cátedra: exploración y análisis, por medios automáticos o semiautomáticos, de datos para descubrir patrones y reglas. Ojo con las opciones trampa: el almacenamiento integrado e histórico es el data warehouse, y extraer, transformar y cargar es el ETL.\n\n¿Por qué ahora? Porque hay grandes bases transaccionales y data warehouses, más poder de cómputo, más presión competitiva, y productos comerciales que ya traen los algoritmos.\n\nLas seis tareas. Clasificación: asignar a una clase predefinida. Estimación: una variable continua que se confirma en el presente. Predicción: un resultado que solo se confirma en el futuro. Afinidad o asociación: qué ocurre junto con qué. Clustering: grupos homogéneos sin clases previas. Y descripción: explicar un comportamiento.\n\nProbá. Una aseguradora quiere saber si un cliente se va a dar de baja el mes que viene. Como el resultado se confirma recién en el futuro, es predicción.\n\nEl círculo virtuoso tiene cuatro componentes: técnicas, poder computacional, datos justos y área justa. Lo que se busca es un resultado accionable: tomar acción y medir. Y medir hay que planearlo desde el principio, porque demorarlo es grave.\n\nLo que corta el círculo: datos malos o incompletos, datos que se borran, sistemas de origen con poca funcionalidad, resistencia de los sectores al cambio, y la falta de oportunidad: el resultado llega tarde y ya no es accionable.\n\nLas cuatro herramientas de la cursada: cluster, razonamiento basado en memoria, canasta de mercado y árbol de decisión. Las vemos en los próximos videos. En el siguiente: los modos de aplicación y cómo se mide un modelo."
 },
 {
  "id": "aid-2-modos-medicion",
  "module": "m8",
  "title": "2 · Modos de aplicación y medición",
  "src": "videos/aid/aid-2-modos-medicion.mp4",
  "poster": "videos/aid/aid-2-modos-medicion.jpg",
  "minutes": 1.8,
  "transcript": "Video dos: los modos de aplicación del data mining y cómo se mide la efectividad de un modelo.\n\nHay dos direcciones. El testeo de hipótesis es top-down: se parte de una hipótesis y se valida con los datos. La búsqueda de conocimiento es bottom-up: se parte de los datos sin suponer nada.\n\nLa búsqueda de conocimiento puede ser directa o indirecta. En la directa hay un campo objetivo que predecir, por ejemplo el riesgo de un solicitante de crédito, y es imprescindible tener casos donde el objetivo ya es conocido. En la indirecta no hay objetivo: qué productos se venden juntos, cómo segmentar a los clientes.\n\nEn la directa los datos se dividen en tres: entrenamiento, donde el modelo aprende; testeo, donde se autoajusta para ganar generalidad; y evaluación, donde se mide el porcentaje de error.\n\nPara medir: los modelos descriptivos buscan explicar, así que se prefiere uno simple: setenta por ciento con cinco reglas antes que setenta y cinco con cuarenta y ocho. Se miden con MDL. Los predictivos requieren precisión y se miden con el porcentaje de error. Y para comparar modelos distintos se usa el lift, que después se traduce en ROI.\n\nLas tres medidas de una regla. Soporte: qué tan frecuente es la regla completa. Confianza: de los que tienen el antecedente, cuántos tienen el consecuente. Lift: confianza dividido la probabilidad del consecuente. Si es mayor que uno, la regla mejora al azar.\n\nY los riesgos al crear un modelo. Sobreestimar los datos: queda pegado al entrenamiento. Subestimarlos: eliminar campos que predecían. Y la poca explicabilidad, típica del cluster.\n\nSiguiente video: árboles de decisión y detección de clusters."
 },
 {
  "id": "aid-3-arbol-cluster",
  "module": "m9",
  "title": "3 · Árboles de decisión y clusters",
  "src": "videos/aid/aid-3-arbol-cluster.mp4",
  "poster": "videos/aid/aid-3-arbol-cluster.jpg",
  "minutes": 1.8,
  "transcript": "Video tres: árboles de decisión y detección de clusters, el módulo nueve.\n\nEl árbol de decisión clasifica y predice. Se construye con un set de entrenamiento preclasificado. Cada camino de la raíz a una hoja es una regla. Modalidad: directa. Resultado: reglas. Expresividad: alta.\n\nLos algoritmos: CART divide en dos en cada nodo y requiere menos preparación. CHAID usa chi cuadrado y requiere más preparación. C cuatro punto cinco permite n ramas por nodo y tiene poda pesimista. Y también se menciona ID3.\n\nEl error del árbol se calcula como la suma del error de cada hoja por su peso. Si una hoja tiene diez por ciento de error y peso cero coma seis, y otra veinticinco por ciento con peso cero coma cuatro, el error es cero coma cero seis más cero coma diez: dieciséis por ciento. No es el promedio simple.\n\nFortalezas y debilidades. Genera reglas entendibles y consume pocos recursos. Pero es malo para estimar valores continuos, problemático con series temporales, y falla con pocos datos de entrenamiento.\n\nEl cluster es una herramienta indirecta: agrupa objetos similares sin clases previas. En K-means la cantidad de grupos se fija antes y los centroides iniciales son al azar. En los jerárquicos la cantidad resulta del algoritmo, top-down o bottom-up. El centroide es el objeto real más cercano a la media. Expresividad baja, y suele ser el primer método del proyecto.\n\nProbá: el cluster es de modalidad... indirecta, y expresividad... baja.\n\nSiguiente video: canasta de mercado, con un ejemplo calculado, y razonamiento basado en memoria."
 },
 {
  "id": "aid-4-canasta-mbr",
  "module": "m10",
  "title": "4 · Canasta de mercado y MBR",
  "src": "videos/aid/aid-4-canasta-mbr.mp4",
  "poster": "videos/aid/aid-4-canasta-mbr.jpg",
  "minutes": 2.2,
  "transcript": "Video cuatro: canasta de mercado y razonamiento basado en memoria. Acá suele haber cuentas.\n\nLa canasta descubre qué se compra con qué. Da reglas del tipo X implica Y: antecedente y consecuente. Las reglas pueden ser accionables, triviales, como cafetera implica café, o inexplicables. Se generan con Apriori, que genera candidatos, o con FP-Tree, que no.\n\nEjemplo con seis tickets. El pan aparece en cuatro, la leche en cuatro, y pan con leche juntos en tres. Soporte de pan implica leche: tres sextos, cero coma cinco. Confianza: tres sobre cuatro, cero coma setenta y cinco. Lift: cero coma cinco dividido cuatro sextos por cuatro sextos: uno coma uno dos cinco. Mayor que uno: la regla sirve.\n\nOtra regla del mismo ejemplo: café implica pan. Lift cero coma setenta y cinco, menor que uno. ¿Qué significa? Que la regla es peor que el azar, y conviene la regla negada: café implica no pan, con lift uno coma cinco.\n\nAhora el MBR, razonamiento basado en memoria. Clasifica un caso nuevo según sus vecinos más parecidos del pasado. Necesita dos funciones: la de distancia, que tiene que ser bien definida, con identidad, conmutativa y con desigualdad triangular; y la de combinación, que puede ser democrática, todos votan igual, o ponderada, donde el voto pesa más cuanto más cerca está el vecino.\n\nEjemplo: tres vecinos más cercanos, dos votan sí a cero coma veinticuatro y cero coma veintiocho de distancia, y uno vota no a uno coma veintidós. Democrática: sí, con sesenta y siete por ciento. Ponderada, con peso uno sobre la distancia: sí, con alrededor de noventa por ciento.\n\nY las medidas cuando se asignan varios códigos: precisión, qué porcentaje de lo asignado es correcto; y recall, qué porcentaje del total correcto se asignó. MBR: modalidad directa, expresividad no presenta, y caro de calcular al predecir.\n\nÚltimo video: la metodología CRISP, text mining y web mining."
 },
 {
  "id": "aid-5-crisp-text-web",
  "module": "m11",
  "title": "5 · CRISP-DM, Text y Web Mining",
  "src": "videos/aid/aid-5-crisp-text-web.mp4",
  "poster": "videos/aid/aid-5-crisp-text-web.jpg",
  "minutes": 1.7,
  "transcript": "Video cinco, el último: la metodología CRISP, text mining y web mining. Módulos once y doce.\n\nCRISP-DM tiene seis fases, en este orden. Comprensión del negocio. Comprensión de los datos. Preparación de los datos. Modelado. Evaluación. E implementación.\n\nLas tareas que más confunden. Comprensión del negocio: objetivos, factores de éxito, entorno y plan del proyecto. Comprensión de los datos: recolectar, describir, explorar y verificar la calidad. Preparación: limpiar, construir, integrar y formatear. Implementación: plan de monitoreo, reporte final y documentación.\n\nText mining busca patrones en información no cuantitativa y no estructurada. El problema es la ambigüedad del lenguaje natural. Tiene dos etapas: preprocesamiento, que pasa el texto a una representación estructurada, y descubrimiento. Su modalidad es indirecta.\n\nWeb mining tiene tres clases. Content: sobre el contenido, que puede ser texto, hipertexto, markup o multimedia. Structure: sobre la topología de los enlaces. Usage: sobre las sesiones y los hábitos de los usuarios.\n\nProbá: analizar los logs de sesiones para conocer los hábitos de navegación es web usage mining.\n\nUna debilidad que suelen preguntar: no hay forma exacta de saber cuándo empieza y termina una sesión, y las páginas servidas desde la caché del navegador no quedan registradas. Listo: ahora practicá en la web, con las preguntas y los ejercicios resueltos. Éxitos."
 }
];
