import { POCKET } from '../cheatsheets';
import type { SubjectContent } from '../types';
import { VIDEOS } from '../videos/aid';
import { EX_SCENES, SCENES } from '../visual/aid';
import { REVIEW_QUESTIONS, REVIEW_THEORY, REVIEW_LESSONS } from '../visual/aid-repaso';

/**
 * AID · 2º parcial (módulos 8 a 12): Data Mining.
 * Redacción propia a partir de las presentaciones de la cátedra; ejemplos numéricos inventados.
 */
const content: SubjectContent = {
  subjectId: 'aid',
  theory: [
    /* ---------- Módulo 8 ---------- */
    {
      id: 'dm-def', module: 'm8', title: 'Qué es el Data Mining',
      points: [
        '**Definición de la cátedra:** exploración y análisis, **por medios automáticos o semiautomáticos**, de datos para **descubrir patrones y reglas**.',
        'Se apoya en otras disciplinas: **biología** (redes neuronales, algoritmos genéticos), **IA** (razonamiento basado en memoria), **teoría de grafos** (análisis de links) y **estadística** (muestras, regresión, correlación).',
        '**¿Por qué ahora?** Hay demasiada información para analizarla a mano: grandes bases OLTP y data warehouses, más poder de cómputo, más presión competitiva (todo negocio se vuelve de servicio) y productos comerciales que ya traen los algoritmos.',
        'Preguntas típicas que responde: qué productos poner en promoción, por qué alguien responde a una oferta, qué producto nuevo querrá un cliente, qué tienen en común los que cierran su cuenta, a quién darle un crédito.',
        'Áreas: **inteligencia** (patrones de conducta criminal), **medicina** (grupos de patologías, riesgo de enfermedad), **comercial** (retener buenos clientes aunque no sean rentables, perder los que cuestan más de lo que dejan, saber qué ofrecerle a un cliente nuevo según su grupo).',
      ],
    },
    {
      id: 'dm-tareas', module: 'm8', title: 'Las 6 tareas del Data Mining',
      points: [
        '**Clasificación:** asigna un objeto a una **clase predefinida** (ej.: buen o mal pagador).',
        '**Estimación:** calcula el valor de una **variable continua** que se puede confirmar **en el presente** (ej.: ingreso estimado).',
        '**Predicción:** es una clasificación o estimación cuyo resultado **solo se confirma en el futuro** (ej.: ¿se dará de baja el mes que viene?).',
        '**Grupos de afinidad o asociación:** determina si un hecho está **vinculado con la ocurrencia de otro** (qué se compra junto).',
        '**Clustering:** arma **grupos homogéneos** sin clases previas, según sus características.',
        '**Descripción:** explica las características de un suceso o las reglas que originan un comportamiento.',
      ],
      table: {
        head: ['Herramienta', 'Clasif.', 'Estim.', 'Predic.', 'Afinidad', 'Cluster', 'Descrip.'],
        rows: [
          ['Canasta de mercado', '', '', 'Sí', 'Sí', 'Sí', 'Sí'],
          ['MBR', 'Sí', '', 'Sí', 'Sí', 'Sí', ''],
          ['Algoritmos genéticos', 'Sí', '', 'Sí', '', '', ''],
          ['Cluster detection', '', '', '', '', 'Sí', ''],
          ['Árboles de decisión', 'Sí', '', 'Sí', '', 'Sí', 'Sí'],
          ['Redes neuronales', 'Sí', 'Sí', 'Sí', '', 'Sí', ''],
        ],
      },
      trap: 'La diferencia entre **estimación** y **predicción** es el momento en que se puede verificar el resultado: presente vs. futuro. Y en la tabla, la única herramienta que hace **estimación** es la red neuronal.',
    },
    {
      id: 'dm-circulo', module: 'm8', title: 'Herramientas y círculo virtuoso',
      points: [
        'Las 4 herramientas de la cursada: **Cluster, Razonamiento basado en memoria (MBR), Canasta de mercado y Árbol de decisión**. Elegir bien cuál usar es clave, junto con una metodología para preparar los datos y evaluar resultados.',
        'El DM es **un paso** dentro de un proceso de conocimiento del cliente, mercado y competencia. Lo que se busca es un **resultado ACCIONABLE**.',
        '**Círculo virtuoso = técnicas + poder computacional + datos justos + área justa.** Los algoritmos importan, pero aplicados en el área y sobre los datos correctos.',
        '**Área justa:** procesos que necesitan análisis previo (lanzar un producto, fijar precios, entender por qué se deteriora la relación con clientes o por qué una sucursal vende más), buenas preguntas informales y áreas donde los usuarios cooperan.',
        'Después de minar: **tomar acción** (incorporar el conocimiento a los procesos) y **medir**. Hay que planear la medición desde el principio; **demorar la medición es GRAVE**.',
        'Lo que corta el círculo: **datos malos o incompletos, datos que se borran, OLTP de origen con poca funcionalidad, resistencia de sectores al cambio y falta de oportunidad** (el resultado llega tarde y ya no es accionable).',
        'Caso del banco que pierde clientes: traer nuevos es caro, subir tasas atrae clientes volátiles y entrevistar a los que se fueron no sirve (no son honestos ni recuerdan). Solución: **DM + experiencia del banco**: comparar a los que se fueron con los que se quedaron, encontrar un grupo de riesgo, testear hipótesis, actuar y medir.',
      ],
    },
    {
      id: 'dm-modos', module: 'm8', title: 'Modos de aplicación: top-down y bottom-up',
      points: [
        '**Testeo de hipótesis (top-down):** se parte de una **hipótesis** y se la valida con los datos. Etapas: generar buenas ideas (hipótesis nulas, reuniones conjuntas) → determinar los datos necesarios → ubicarlos → prepararlos → crear el modelo → aplicarlo → **evaluar para confirmar o rechazar**.',
        '**Búsqueda de conocimiento (bottom-up):** se parte de los **datos** sin suponer nada antes. Puede ser **directa** (hay un campo objetivo para explicar o predecir) o **indirecta** (no hay objetivo; se buscan patrones sin clases predefinidas).',
        '**Directa:** explica el pasado para predecir el futuro. Ejemplos: permanencia prevista de un cliente, nivel de riesgo de un solicitante de crédito, qué ventas suben si hago descuento en quesos. **Es imprescindible contar con datos donde el objetivo ya es conocido.**',
        'En la directa los datos se dividen en **3 grupos**: **entrenamiento** (el modelo aprende), **testeo** (se autoajusta para ganar generalidad) y **evaluación** (se mide el porcentaje de error).',
        '**Indirecta:** ¿qué productos se venden juntos?, ¿cómo segmento a mis clientes? Al final suele **identificar oportunidades para una búsqueda directa** y **generar nuevas hipótesis**.',
        'Conviene usar un **DW** como fuente: datos limpios, integrados, históricos y verificados. Además se agregan **campos derivados** que hacen obvias relaciones que el analista ya conoce (índices, densidades, promedios).',
      ],
      trap: 'Testeo de hipótesis = **top-down** (de la hipótesis a los datos). Búsqueda de conocimiento = **bottom-up** (de los datos hacia la hipótesis).',
    },
    {
      id: 'dm-medir', module: 'm8', title: 'Medir la efectividad del modelo',
      points: [
        'Objetivos **ideales** (vagos: "conocer más a mis clientes") vs. **medibles** (concretos: "identificar clientes dispuestos a renovar", "rankear clientes según propensión a esquiar"). Preguntas guía: ¿cuál es mi objetivo?, ¿cómo lo logro?, ¿qué ventaja me da?',
        '**Modelos descriptivos:** buscan conocer y explicar; se prefiere **menos precisión con más simpleza** (70 % con 5 reglas antes que 75 % con 48). Se miden con **MDL (mínima longitud de la descripción)**.',
        '**Modelos predictivos:** clasifican o predicen; **requieren más precisión** sin descuidar la explicabilidad. Se miden por su comportamiento sobre una muestra: **% de error** (clasificación) o **diferencia entre valor predicho y real** (estimación).',
        'Precisión del **modelo como un todo** (% de registros bien clasificados) vs. precisión de **una predicción en particular** (cada hoja de un árbol tiene su propia certeza).',
        'Para comparar modelos de distinto tipo se usa el **LIFT**, que luego debe traducirse en **ROI**.',
        '**Soporte:** ocurrencias del evento sobre el total. **Confianza:** probabilidad del consecuente dado el antecedente. **Lift:** cuánto mejora la regla respecto de elegir al azar.',
        'El modelo depende del **input** (continuo → regresión o red neuronal; categorizable → árbol) o del **output** (categorización, variable continua, cluster).',
        'Riesgos: **sobreestimar los datos** (el modelo queda pegado al training, sobreajuste), **subestimarlos** (eliminar campos predictivos) y **poca explicabilidad** (típico del cluster).',
      ],
    },
    {
      id: 'dm-estad', module: 'm8', title: 'Conceptos estadísticos que entran',
      points: [
        '**Población:** todo el universo de estudio. **Muestra:** porción representativa. **Muestra sesgada:** elegida con un método **no aleatorio**.',
        '**Rango** = valor mayor − valor menor. **Media** = Σx / n. **Mediana:** valor central (si la cantidad es par, se promedian los dos centrales); la afectan menos los valores extremos. **Moda:** el valor más repetido.',
        '**Desviación:** diferencia entre un valor y la media. **Varianza:** promedio de los cuadrados de las desviaciones. **Desvío estándar:** raíz de la varianza.',
        'Ejemplo de un dado: media 3,5; varianza 2,92; desvío 1,71.',
        '**Correlación:** relación entre dos variables. **Regresión:** predecir una variable a partir de otra.',
        '**Distancia:** proximidad que permite detectar vecinos. **Distribución:** gama de valores posibles (normal, chi cuadrado, Poisson); conocerla permite predecir.',
        '**Chi cuadrado (χ²):** prueba **no paramétrica** para variables **cualitativas**. Compara lo observado con lo teórico: **cuanto mayor χ², menos verosímil es la hipótesis** (de independencia o de ajuste). Con 1 variable mide la **bondad de ajuste**; con 2 variables mide la **homogeneidad** entre muestras o la **independencia** entre variables.',
        'Contraste de independencia: tabla de contingencia r × c; frecuencia esperada `eij = (total fila i × total columna j) / n`; estadístico `χ² = Σ (nij − eij)² / eij`.',
      ],
    },
    {
      id: 'dm-casos', module: 'm8', title: 'Casos de ejemplo',
      points: [
        '**Fraude con tarjetas:** hipótesis de que el usuario no autorizado usa la tarjeta de forma **cualitativa y cuantitativamente distinta** al legítimo. La frecuencia de uso, los comercios y el respeto del límite forman una **"huella"** del usuario. Se usó **clustering borroso** para caracterizar tipos de fraude y separar uso fraudulento de normal. Recomendaciones: supervisar en tiempo real, analizar comercios sospechosos, consolidar datos de fraude y analizar vulnerabilidad.',
        '**Préstamos:** usar el **comportamiento pasado para clasificar** clientes y decidir si se les aprueba un préstamo o una tarjeta (clasificación, búsqueda directa).',
      ],
    },
    /* ---------- Módulo 9 ---------- */
    {
      id: 'arbol', module: 'm9', title: 'Árboles de decisión',
      points: [
        'Sirven para **clasificar y predecir**; estiman solo circunstancialmente y **con poca precisión**, porque todos los registros que caen en una hoja reciben el mismo valor.',
        'Se construyen con un **set de entrenamiento preclasificado**. Cada **camino de la raíz a una hoja es una regla única**. Conviene un training con muchos casos para minimizar errores.',
        '**Modalidad: directa. Resultado: reglas. Expresividad: alta.** A veces su salida alimenta a otras herramientas.',
        '**CART** (Classification and Regression Tree): divide **en dos** en cada nodo y requiere **menos preparación** de datos que CHAID.',
        '**CHAID:** usa **Chi cuadrado** para detectar interacciones; genera múltiples ramas y requiere **más preparación**.',
        '**C4.5:** **n ramas por nodo** (trato distinto de variables categóricas) y **poda pesimista** (puede reemplazar un subárbol por una de sus ramas). También se menciona **ID3**.',
        'Medidas: por nodo, **registros entrantes**; por hoja, **% de error = 1 − % de aciertos** y **peso** (probabilidad de que un dato nuevo caiga ahí); del árbol, **error = Σ (error de cada hoja × su peso)**.',
        'Al crecer se elige el split que **maximiza la ganancia de diversidad**: diversidad antes del split − (diversidad hijo izquierdo + diversidad hijo derecho).',
        '**Pruning (poda):** elimina ramas con bajo poder predictivo que no bajan el error del árbol.',
        '**Fortalezas:** reglas entendibles, bajo consumo de recursos, manejan datos continuos y categóricos. **Debilidades:** malos para estimar valores continuos, problemáticos con series temporales y con errores grandes si hay pocos datos de entrenamiento.',
      ],
    },
    {
      id: 'cluster', module: 'm9', title: 'Detección de clusters',
      points: [
        'Herramienta **indirecta**: agrupa objetos **similares** sin clases previas. Asigna cada objeto al grupo más representativo y **reorganiza los grupos de forma iterativa**.',
        'En cada iteración identifica el **centroide**: el objeto real más cercano a la media del cluster, o sea el más representativo.',
        '**K-means:** la **cantidad de grupos se fija de antemano**; en la primera iteración los centroides se eligen **al azar** y luego se van ajustando.',
        '**Jerárquicos:** la cantidad de grupos **resulta del algoritmo**. Pueden ser **top-down** (todo el conjunto es un cluster que se divide) o **bottom-up/aglomerativos** (cada objeto empieza siendo un cluster).',
        '**Modalidad: indirecta. Resultado: división del universo en grupos. Expresividad: baja.** Suele ser el **primer método** de un proyecto de DM y luego se combina con otros.',
        '**Distancia entre registros:** distancia entre puntos, ángulo entre vectores o cantidad de campos que coinciden. **Distancia entre clusters:** entre centros, entre puntos más cercanos o entre puntos más lejanos.',
        '**Varianza** del cluster: suma de los cuadrados de las distancias al centro. **Problema clásico:** campos en distintas unidades de medida.',
        '**Criterio de formación:** forma el cluster la variable cuyo promedio de distancias es mucho menor que el de la población total.',
        '**Fortalezas:** anda bien con datos categóricos, numéricos o textuales y es fácil de usar. **Debilidades:** cuesta elegir la distancia y los pesos, es sensible a los parámetros iniciales y los clusters son difíciles de interpretar.',
      ],
      trap: '"El centroide es el objeto real más cercano a la media" (más parecido a una mediana que a un promedio). Y en K-means la cantidad de grupos **se predefine**; en los jerárquicos **resulta** del algoritmo.',
    },
    /* ---------- Módulo 10 ---------- */
    {
      id: 'canasta', module: 'm10', title: 'Canasta de mercado (reglas de asociación)',
      points: [
        'Descubre, a partir de transacciones, **qué productos se compran con qué otros**. Resultado: reglas **X ⇒ Y** (antecedente ⇒ consecuente): si la transacción incluye X, entonces incluye Y.',
        'Nació en los puntos de venta, pero las reglas de asociación sirven para otros dominios.',
        'Las reglas las evalúa un experto y pueden ser **accionables** (comprensibles y útiles para decidir), **triviales** (cualquiera que conoce el rubro las sabe, como cafetera ⇒ café) o **inexplicables** (sin explicación ni acción posible).',
        'Dos formas de generarlas: **con generación de candidatos (APRIORI)** o **sin generación de candidatos (FP-TREE)**.',
        'Calidad de una regla: **soporte, confianza y lift**.',
        'Los ítems pertenecen a una **taxonomía**; si un producto aparece en pocos registros conviene **subir de nivel** (agruparlo). **Ítems virtuales:** no están en la taxonomía (ej.: forma de pago); usarlos solo si dan información accionable, porque pueden generar reglas triviales.',
        '**Modalidad: directa e indirecta. Resultado: reglas IF-THEN. Expresividad: alta. Pruning:** se exige un **soporte mínimo** a cada ítem.',
        '**Fortalezas:** resultado entendible, muy útil para DM indirecto, trabaja con datos de longitud variable y requiere poco cómputo. **Debilidades:** crecimiento exponencial, soporte limitado para atributos, cuesta elegir los ítems correctos y los ítems poco frecuentes son problemáticos.',
      ],
      table: {
        head: ['Medida', 'Fórmula', 'Se lee como'],
        rows: [
          ['Soporte', 'P(X y Y) = transacciones con X y Y / total', 'qué tan frecuente es la regla completa'],
          ['Confianza', 'P(X y Y) / P(X)', 'de las que tienen X, cuántas tienen Y'],
          ['Lift', 'P(X y Y) / (P(X) · P(Y))', 'cuánto mejor que el azar predice la regla'],
        ],
      },
      trap: '**Lift > 1:** la regla sirve. **Lift = 1:** independencia. **Lift < 1:** la regla es peor que el azar y **la regla negada (X ⇒ no Y) predice mejor**. El soporte de X ⇒ Y y de Y ⇒ X es el mismo; la confianza no.',
    },
    {
      id: 'mbr', module: 'm10', title: 'Razonamiento basado en memoria (MBR)',
      points: [
        'Se basa en la **similitud**: compara un caso nuevo con casos parecidos del pasado y predice según lo que pasó con ellos (vecinos más cercanos).',
        '**No requiere dar formato a los registros**, lo que lo hace útil con datos geográficos. Solo necesita dos operaciones: **función de distancia** y **función de combinación**.',
        '**Desventaja:** obtener un resultado es caro, porque hay que leer muchos registros históricos para encontrar vecinos.',
        '**Factor 1, set de entrenamiento:** debe estar **balanceado** y representar todas las categorías. Muy grande: buena clasificación pero mala performance. Muy chico: buena performance pero resultados pobres. Se puede reducir usando los **centroides de clusters** como set de entrenamiento.',
        '**Factor 2, función de distancia** con 4 propiedades: **bien definida** (real y positiva), **identidad** (d(A,A) = 0), **conmutatividad** (d(A,B) = d(B,A)) y **desigualdad triangular** (d(A,C) + d(C,B) ≥ d(A,B)).',
        'Cálculo típico: para cada campo numérico `|a − b| / distancia máxima`; para campos como sexo, 0 si coincide y 1 si no; luego se suman los campos.',
        '**Factor 3, cantidad de vecinos:** más vecinos dan más soporte y certeza a la predicción.',
        '**Factor 4, función de combinación:** **democrática** (todos los vecinos votan con igual peso; el resultado lleva un % de certeza, 100 % si coinciden) o **ponderada** (el voto pesa **inversamente a la distancia**).',
        'Medidas para asignación múltiple de categorías: **precisión** (de los códigos que asignó, qué % es correcto) y **recall** (del total de códigos correctos, qué % asignó).',
        '**Modalidad: directa. Resultado: clasifica según el vecino más cercano. Expresividad: no presenta.**',
        '**Fortalezas:** resultados entendibles y justificables, independiente de cómo se representan los datos, admite cualquier número de campos y requiere poco mantenimiento. **Debilidades:** mucho cómputo para predecir y clasificar, mucho almacenamiento para el training, y los resultados dependen de la distancia, la combinación y la cantidad de vecinos.',
      ],
    },
    /* ---------- Módulo 11 ---------- */
    {
      id: 'crisp', module: 'm11', title: 'Metodología CRISP-DM',
      points: [
        '**CRISP-DM** (CRoss-Industry Standard Process for Data Mining): proceso **jerárquico** de tareas que da estructura para obtener resultados mejores y más rápidos.',
        '**1. Comprensión del negocio:** objetivos de negocio y factores de éxito; entorno (restricciones, recursos, riesgos, costo-beneficio); objetivos de data mining; plan de proyecto.',
        '**2. Comprensión de los datos:** recolección inicial, descripción, exploración, verificación de calidad.',
        '**3. Preparación de los datos:** selección o limpieza, construcción, integración y formateo.',
        '**4. Modelado:** elección de la técnica (según problema, requerimientos y restricciones), testeo, construcción de modelos y selección del modelo definitivo.',
        '**5. Evaluación:** evaluar resultados, revisar el proceso, plantear nuevos pasos.',
        '**6. Implementación (despliegue):** plan de implementación, plan de monitoreo y mantenimiento, reporte final y documentación.',
      ],
      trap: 'Ordená: **Negocio → Datos (comprensión) → Preparación → Modelado → Evaluación → Implementación**. "Verificar la calidad" es de **comprensión** de datos; "limpiar, integrar y formatear" es de **preparación**.',
    },
    /* ---------- Módulo 12 ---------- */
    {
      id: 'text', module: 'm12', title: 'Text Mining',
      points: [
        'También llamado minería de datos textuales o descubrimiento de conocimiento en bases textuales **no estructuradas**. Busca lo mismo que el DM (relaciones y modelos), pero sobre **información no cuantitativa**.',
        'Permite saber no solo **qué** ocurrió sino también **por qué**.',
        'Beneficios: conocer el significado de un texto sin leerlo entero, leer resúmenes antes de ir al documento completo, navegar grandes bases de texto y recuperar información en el idioma original.',
        '**Problemática:** el lenguaje natural es **ambiguo** (conocimiento sintáctico, semántico y retórico implícito), con errores de tipeo, sinónimos, varias acepciones y distintos idiomas.',
        '**Metodología en 2 etapas:** **preprocesamiento** (el texto pasa a una representación estructurada) y **descubrimiento** (se buscan patrones en esa representación).',
        '**Modalidad: indirecta.**',
      ],
    },
    {
      id: 'web', module: 'm12', title: 'Web Mining',
      points: [
        'Proceso de descubrir conocimiento útil y previamente desconocido a partir de **datos de la Web** (Etzioni, 1996). Es multidisciplinario: recuperación de información, DM, estadística, visualización, lenguajes de etiquetas y tecnología web. Trabaja con información **desestructurada o semiestructurada**.',
        '**Web content mining:** sobre el **contenido**. Puede ser text mining (textos planos), hypertext mining (con enlaces), markup mining (semiestructurados, con marcas) o multimedia mining (imagen, audio, video).',
        '**Web structure mining:** descubre un modelo a partir de la **topología de enlaces**.',
        '**Web usage mining:** extrae hábitos y preferencias a partir de las **sesiones y el comportamiento** de los navegantes.',
        '**Fortalezas:** mejora la performance del servidor, permite reestructurar el sitio, descubre clientes potenciales de e-commerce e identifica horas pico y lugares preferidos para ubicar publicidad.',
        '**Debilidades:** no hay forma exacta de saber inicio y fin de sesión, no se registran las páginas servidas desde la **caché local** del cliente y los datos pueden ser ambiguos si cambian servidores o se reubican páginas.',
      ],
    },
  ],

  questions: [
    /* m8 */
    { id: 'aid-q01', module: 'm8', type: 'mcq', prompt: '¿Cuál es la definición de Data Mining que da la cátedra?', options: ['Exploración y análisis, por medios automáticos o semiautomáticos, de datos para descubrir patrones y reglas.', 'Almacenamiento integrado, histórico y no volátil de datos para la toma de decisiones.', 'Proceso de extracción, transformación y carga de datos desde los OLTP.', 'Todas las respuestas anteriores son correctas.', 'Todas las respuestas anteriores son incorrectas.'], answer: 0, explain: 'El DM **explora y analiza** datos para **descubrir patrones y reglas**. La opción del almacenamiento describe un **Data Warehouse** y la del proceso describe el **ETL**: son temas del 1er parcial.' },
    { id: 'aid-q02', module: 'm8', type: 'mcq', prompt: 'Una aseguradora quiere saber si un cliente **se dará de baja el mes próximo**. ¿Qué tarea de DM es?', options: ['Estimación', 'Predicción', 'Clustering', 'Descripción', 'Grupos de afinidad'], answer: 1, explain: 'Es una clasificación cuyo resultado **solo se puede confirmar en el futuro**: eso es **predicción**. La estimación se verifica en el presente y sobre una variable continua.' },
    { id: 'aid-q03', module: 'm8', type: 'mcq', prompt: 'Calcular el **ingreso anual actual** de un cliente a partir de sus consumos es una tarea de:', options: ['Clasificación', 'Predicción', 'Estimación', 'Asociación', 'Clustering'], answer: 2, explain: '**Estimación:** se calcula el valor de una **variable continua** que **ya se puede confirmar en el presente**.' },
    { id: 'aid-q04', module: 'm8', type: 'mcq', prompt: 'Armar **grupos homogéneos de clientes sin clases definidas de antemano** corresponde a:', options: ['Clasificación', 'Clustering', 'Estimación', 'Predicción', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: 'El **clustering** forma grupos homogéneos según las características. La clasificación, en cambio, asigna a **clases predefinidas**.' },
    { id: 'aid-q05', module: 'm8', type: 'tf', prompt: 'Según la tabla de tareas y herramientas de la cátedra, la única herramienta que realiza **estimación** es la red neuronal.', answer: true, explain: 'En la tabla, la columna "Estimation" solo tiene "Sí" para **Neural Networks**. Los árboles, por ejemplo, estiman con poca precisión porque toda una hoja recibe el mismo valor.' },
    { id: 'aid-q06', module: 'm8', type: 'mcq', prompt: 'El "círculo virtuoso" del Data Mining se compone de:', options: ['Técnicas + poder computacional + datos justos + área justa', 'Extracción + transformación + carga + consulta', 'Hipótesis + datos + modelo + reporte', 'Comprensión + preparación + modelado + implementación', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'La cátedra lo resume así: **ciclo virtuoso = técnicas + poder computacional + datos justos + área justa**. Lo que se busca es un resultado **accionable**.' },
    { id: 'aid-q07', module: 'm8', type: 'mcq', prompt: '¿Cuál de estos es un inconveniente que **interrumpe** el círculo virtuoso?', options: ['Datos incompletos o que se borran', 'Resistencia de sectores a cambiar sus políticas', 'Resultados que llegan fuera de tiempo', 'Falta de funcionalidad de los OLTP de origen', 'Todas las respuestas anteriores son correctas'], answer: 4, explain: 'Los cinco inconvenientes típicos son: **malos datos, datos que se borran, falta de funcionalidad de los OLTP, resistencia al cambio y falta de oportunidad**. Todas las opciones aparecen en esa lista.' },
    { id: 'aid-q08', module: 'm8', type: 'tf', prompt: 'En el círculo virtuoso, medir los resultados puede dejarse para el final del proyecto sin consecuencias.', answer: false, explain: 'La cátedra lo marca fuerte: **el retraso en medir resultados es GRAVE** y **la medición debe planearse desde el principio**.' },
    { id: 'aid-q09', module: 'm8', type: 'mcq', prompt: 'El **testeo de hipótesis** es un modo de aplicación:', options: ['Bottom-up', 'Top-down', 'Indirecto', 'Sin objetivo definido', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: 'Se parte de una **hipótesis** y se baja a los **datos** para validarla: **top-down**. La búsqueda de conocimiento es la que va de abajo hacia arriba (bottom-up).' },
    { id: 'aid-q10', module: 'm8', type: 'mcq', prompt: '"¿Cómo segmentar a mis clientes?" sin ningún campo objetivo es un ejemplo de:', options: ['Testeo de hipótesis', 'Búsqueda de conocimiento directa', 'Búsqueda de conocimiento indirecta', 'Estimación', 'Todas las respuestas anteriores son incorrectas'], answer: 2, explain: 'En la búsqueda **indirecta** **no existe un campo objetivo para predecir**; se buscan patrones sin clases predefinidas, como qué se vende junto o cómo segmentar.' },
    { id: 'aid-q11', module: 'm8', type: 'mcq', prompt: 'En la búsqueda de conocimiento **directa**, los datos se dividen en:', options: ['Entrenamiento, testeo y evaluación', 'Hechos y dimensiones', 'Antecedente y consecuente', 'Población y muestra sesgada', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: '**Entrenamiento** (aprende), **testeo** (se autoajusta para ganar generalidad) y **evaluación** (mide el % de error).' },
    { id: 'aid-q12', module: 'm8', type: 'tf', prompt: 'Para una búsqueda de conocimiento directa es importante contar con datos en los que el valor objetivo a predecir ya es conocido.', answer: true, explain: 'La cátedra lo destaca como **IMPORTANTE**: sin casos con el objetivo conocido no hay de dónde aprender.' },
    { id: 'aid-q13', module: 'm8', type: 'mcq', prompt: 'En un modelo **descriptivo**, la cátedra recomienda:', options: ['Maximizar la precisión aunque haya cientos de reglas', 'Optar por menos precisión con menos reglas (70 % con 5 reglas mejor que 75 % con 48)', 'Medirlo solo por el % de error sobre una muestra', 'No preocuparse por la explicabilidad', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: 'El objetivo del descriptivo es **conocer y explicar**, así que se prefiere un modelo simple y entendible. Se mide con **MDL (mínima longitud de la descripción)**. El % de error es para los predictivos.' },
    { id: 'aid-q14', module: 'm8', type: 'mcq', prompt: 'Una **muestra sesgada** es:', options: ['Una muestra seleccionada con un método no aleatorio', 'La diferencia entre el valor mayor y el menor', 'Todo el universo de estudio', 'Una muestra con distribución normal', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Sesgada = elegida **con un método no random**. La diferencia entre el mayor y el menor es el **rango**, y todo el universo es la **población**.' },
    { id: 'aid-q15', module: 'm8', type: 'mcq', prompt: 'Sobre el **Chi cuadrado (χ²)**:', options: ['Es una prueba no paramétrica para variables cualitativas', 'Cuanto mayor es χ², menos verosímil es la hipótesis', 'Con dos variables sirve para contrastar independencia u homogeneidad', 'Con una variable mide la bondad del ajuste', 'Todas las respuestas anteriores son correctas'], answer: 4, explain: 'Todas son ciertas: es **no paramétrica**, trabaja con **cualitativas**, un χ² **alto** aleja de la hipótesis, con 1 variable mide **bondad de ajuste** y con 2 mide **homogeneidad o independencia**.' },
    { id: 'aid-q16', module: 'm8', type: 'tf', prompt: 'La mediana se ve menos afectada que la media por los valores muy alejados.', answer: true, explain: 'La mediana es el valor central: un valor extremo no la mueve, mientras que la media sí lo incorpora en la suma.' },
    { id: 'aid-q17', module: 'm8', type: 'mcq', prompt: 'Para **comparar modelos de distinto tipo**, la cátedra propone usar:', options: ['El MDL', 'El LIFT, que luego debe transformarse en ROI', 'El rango de la muestra', 'La moda', 'Todas las respuestas anteriores son incorrectas'], answer: 1, explain: 'El **lift** permite comparar la performance de distintos modelos y después se traduce a un retorno económico (**ROI**).' },
    { id: 'aid-q18', module: 'm8', type: 'mcq', prompt: '¿Cuál es un riesgo de **sobreestimar los datos** al crear un modelo?', options: ['Que la predicción quede influenciada por los datos del training (sobreajuste)', 'Eliminar campos predictivos', 'Que el modelo tenga demasiada explicabilidad', 'Que no se pueda calcular el soporte', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: 'Sobreestimar = el modelo queda **pegado al training** y da resultados redundantes. **Eliminar campos predictivos** es el riesgo opuesto (subestimar).' },
    { id: 'aid-q19', module: 'm8', type: 'mcq', prompt: 'En el caso de **fraude con tarjetas**, ¿qué técnica se aplicó?', options: ['Canasta de mercado', 'Clustering borroso', 'Árbol CART', 'Text mining', 'Web usage mining'], answer: 1, explain: 'Se usó **clustering borroso** sobre datos del titular, el comercio y la transacción para caracterizar tipos de fraude y separarlos del uso normal (la "huella" del usuario legítimo).' },
    /* m9 */
    { id: 'aid-q20', module: 'm9', type: 'mcq', prompt: 'En un árbol de decisión, una **regla** es:', options: ['El camino desde la raíz hasta un nodo hoja', 'La cantidad de registros de un nodo', 'La distancia entre dos registros', 'Un centroide', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Cada camino raíz → hoja es **único** y constituye **una regla** de clasificación. Por eso los árboles tienen **expresividad alta**.' },
    { id: 'aid-q21', module: 'm9', type: 'mcq', prompt: '¿Qué algoritmo de árbol **divide en dos** cada nodo y requiere **menos preparación de datos** que CHAID?', options: ['CART', 'C4.5', 'K-means', 'APRIORI', 'FP-Tree'], answer: 0, explain: '**CART** segmenta en **dos divisiones** y pide menos preparación. **CHAID** usa Chi cuadrado y pide más preparación; **C4.5** permite n ramas y tiene poda pesimista.' },
    { id: 'aid-q22', module: 'm9', type: 'mcq', prompt: 'El algoritmo **C4.5**:', options: ['Produce n ramas por nodo y tiene poda pesimista', 'Siempre divide en dos', 'Se basa en Chi cuadrado', 'Es un algoritmo de clustering', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: 'C4.5 trata distinto las variables categóricas (**n ramas por nodo**) y su **poda pesimista** puede reemplazar un subárbol por una de sus ramas.' },
    { id: 'aid-q23', module: 'm9', type: 'mcq', prompt: 'El **% de error de un árbol** se calcula como:', options: ['La suma del error de cada hoja multiplicado por su peso', 'El error de la hoja con más registros', 'El promedio simple de los errores de las hojas', '1 − cantidad de hojas', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: '**Error del árbol = Σ (error de la hoja × peso de la hoja)**, donde el peso es la probabilidad de que un dato nuevo caiga en esa hoja. No es un promedio simple.' },
    { id: 'aid-q24', module: 'm9', type: 'tf', prompt: 'El pruning elimina las ramas del árbol con bajo poder predictivo, que no hacen bajar el porcentaje de error.', answer: true, explain: 'Esa es la definición de la cátedra. Podar simplifica el árbol sin empeorarlo.' },
    { id: 'aid-q25', module: 'm9', type: 'mcq', prompt: 'Una **debilidad** de los árboles de decisión es:', options: ['Generan reglas difíciles de entender', 'Son inapropiados para estimar valores continuos', 'Consumen muchos recursos para clasificar', 'No manejan datos categóricos', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: 'Son **malos para estimar continuos**, problemáticos con series temporales y fallan con pocos datos de entrenamiento. Las otras opciones son al revés: sus reglas son **entendibles**, consumen **pocos** recursos y manejan **continuos y categóricos**.' },
    { id: 'aid-q26', module: 'm9', type: 'mcq', prompt: 'La detección de clusters es una herramienta de modalidad ____ y expresividad ____.', options: ['directa / alta', 'indirecta / baja', 'indirecta / alta', 'directa / no presenta', 'directa e indirecta / alta'], answer: 1, explain: 'Cluster: **indirecta** (no hay clases previas) y **expresividad baja** (los grupos son difíciles de interpretar). Directa/alta = árbol; directa/no presenta = MBR; directa e indirecta/alta = canasta.' },
    { id: 'aid-q27', module: 'm9', type: 'mcq', prompt: 'En **K-means**:', options: ['La cantidad de grupos se predefine y los centroides iniciales se eligen al azar', 'La cantidad de grupos resulta del algoritmo', 'Cada objeto empieza siendo su propio cluster', 'No se usan centroides', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: 'K-means fija **k** de antemano y arranca con **centroides al azar** que se van refinando. Que la cantidad resulte del algoritmo, o que cada objeto empiece como un cluster, describe a los **jerárquicos**.' },
    { id: 'aid-q28', module: 'm9', type: 'mcq', prompt: 'Según la cátedra, el **centroide** de un cluster es:', options: ['El objeto real más cercano a la media del cluster', 'El objeto más lejano del cluster', 'El promedio de todos los clusters', 'La varianza del cluster', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Es el **objeto real** más cercano a la media, es decir el más representativo (como una mediana).' },
    { id: 'aid-q29', module: 'm9', type: 'mcq', prompt: 'Un problema típico al calcular distancias en clustering es:', options: ['Que los campos estén expresados en distintas unidades de medida', 'Que haya demasiadas reglas', 'Que el soporte sea muy bajo', 'Que el árbol no se pueda podar', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Si un campo está en pesos y otro en años, el de números más grandes domina la distancia. Por eso se normaliza.' },
    { id: 'aid-q30', module: 'm9', type: 'tf', prompt: 'La detección de clusters suele ser el primer método que se aplica en un proyecto de Data Mining, para luego profundizar con otros.', answer: true, explain: 'La cátedra lo dice así: generalmente es lo primero y después se combina con otro algoritmo (jerárquico, particional o genético).' },
    /* m10 */
    { id: 'aid-q31', module: 'm10', type: 'mcq', prompt: 'En la regla **X ⇒ Y**, X es:', options: ['El consecuente', 'El antecedente', 'El soporte', 'El lift', 'Un ítem virtual'], answer: 1, explain: 'La parte izquierda es el **antecedente** y la derecha el **consecuente**: si una transacción incluye X, incluirá Y.' },
    { id: 'aid-q32', module: 'm10', type: 'mcq', prompt: '"Quien compra una cafetera compra café" es una regla:', options: ['Accionable', 'Trivial', 'Inexplicable', 'Negada', 'Virtual'], answer: 1, explain: 'Es **trivial**: cualquiera que conoce el rubro la podría decir. Las **accionables** se entienden y sirven para decidir; las **inexplicables** no tienen explicación ni acción posible.' },
    { id: 'aid-q33', module: 'm10', type: 'mcq', prompt: 'Generación de reglas **sin generación de candidatos**:', options: ['APRIORI', 'FP-TREE', 'CART', 'K-means', 'CHAID'], answer: 1, explain: '**FP-TREE** no genera candidatos; **APRIORI** sí los genera.' },
    { id: 'aid-q34', module: 'm10', type: 'mcq', prompt: 'La **confianza** de la regla X ⇒ Y es:', options: ['P(X y Y)', 'P(X y Y) / P(X)', 'P(X y Y) / (P(X)·P(Y))', 'P(Y)', 'Todas las respuestas anteriores son incorrectas'], answer: 1, explain: 'Confianza = de las transacciones que tienen X, qué proporción tiene también Y: **P(X y Y) / P(X)**. P(X y Y) a secas es el **soporte** y la de abajo es el **lift**.' },
    { id: 'aid-q35', module: 'm10', type: 'mcq', prompt: 'Una regla tiene **lift = 0,8**. ¿Qué significa?', options: ['Es una muy buena regla', 'Es peor que una estimación al azar y la regla negada predice mejor', 'Tiene 80 % de confianza', 'Tiene 80 % de soporte', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: '**Lift < 1:** la regla es peor que elegir al azar, así que **la negación de la regla** (X ⇒ no Y) da mejor predicción.' },
    { id: 'aid-q36', module: 'm10', type: 'tf', prompt: 'El soporte de la regla "soda ⇒ jugo" es igual al soporte de "jugo ⇒ soda".', answer: true, explain: 'El soporte es **P(soda y jugo)**: no depende del orden. La **confianza** sí cambia, porque divide por P(soda) en un caso y por P(jugo) en el otro.' },
    { id: 'aid-q37', module: 'm10', type: 'mcq', prompt: 'Cuando un producto aparece en **muy pocos registros**, conviene:', options: ['Eliminarlo siempre', 'Agruparlo en un nivel más alto de la taxonomía', 'Convertirlo en ítem virtual', 'Duplicar sus transacciones', 'Todas las respuestas anteriores son incorrectas'], answer: 1, explain: 'Los ítems pertenecen a una **taxonomía**; subir de nivel (por ejemplo "gaseosas" en lugar de una marca) evita reglas con soporte ínfimo.' },
    { id: 'aid-q38', module: 'm10', type: 'mcq', prompt: 'El MBR necesita básicamente dos funciones:', options: ['Distancia y combinación', 'Soporte y confianza', 'Extracción y carga', 'Diversidad y poda', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'La **función de distancia** mide cuán parecidos son dos registros y la **función de combinación** junta los votos de los vecinos para dar la respuesta.' },
    { id: 'aid-q39', module: 'm10', type: 'mcq', prompt: 'Propiedad de la función de distancia según la cual d(A,B) = d(B,A):', options: ['Identidad', 'Conmutatividad', 'Desigualdad triangular', 'Bien definida', 'Ponderación'], answer: 1, explain: '**Conmutatividad.** Identidad: d(A,A) = 0. Bien definida: siempre un real positivo. Triangular: pasar por un punto intermedio nunca acorta la distancia.' },
    { id: 'aid-q40', module: 'm10', type: 'mcq', prompt: 'En la combinación **ponderada** del MBR:', options: ['Todos los vecinos votan con igual peso', 'El voto pesa de forma inversamente proporcional a la distancia', 'Solo vota el vecino más lejano', 'Se usa el soporte mínimo', 'Todas las respuestas anteriores son incorrectas'], answer: 1, explain: 'Ponderada: **cuanto más cerca está el vecino, más pesa su voto**. Que todos voten igual describe a la **democrática**.' },
    { id: 'aid-q41', module: 'm10', type: 'mcq', prompt: 'Una **desventaja** del MBR es:', options: ['Requiere formatear todos los registros', 'Requiere alto poder de cómputo para predecir y gran almacenamiento para el training', 'Sus resultados no se pueden justificar', 'Requiere mucho mantenimiento', 'Todas las respuestas anteriores son correctas'], answer: 1, explain: 'Para clasificar un caso hay que compararlo con muchos registros: **costo alto en predicción y en almacenamiento**. Las otras opciones son al revés: **no** necesita formato, es **justificable** y requiere **poco** mantenimiento.' },
    { id: 'aid-q42', module: 'm10', type: 'mcq', prompt: 'La herramienta asignó 10 códigos, de los cuales 8 son correctos; en total había 16 códigos correctos para asignar. Precisión y recall son:', options: ['80 % y 50 %', '50 % y 80 %', '80 % y 62,5 %', '62,5 % y 50 %', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: '**Precisión** = correctos asignados / asignados = 8/10 = 80 %. **Recall** = correctos asignados / total correctos = 8/16 = 50 %.' },
    /* m11 */
    { id: 'aid-q43', module: 'm11', type: 'mcq', prompt: '¿Cuál es el orden correcto de las fases de CRISP-DM?', options: ['Comprensión del negocio → Comprensión de los datos → Preparación → Modelado → Evaluación → Implementación', 'Comprensión de los datos → Comprensión del negocio → Modelado → Preparación → Implementación → Evaluación', 'Preparación → Modelado → Comprensión del negocio → Evaluación → Implementación', 'Modelado → Evaluación → Implementación → Preparación', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Siempre se arranca por el **negocio**, después se entienden y preparan los **datos**, se **modela**, se **evalúa** y se **implementa**.' },
    { id: 'aid-q44', module: 'm11', type: 'mcq', prompt: '"Verificación de la calidad de los datos" pertenece a la fase de:', options: ['Comprensión del negocio', 'Comprensión de los datos', 'Preparación de los datos', 'Modelado', 'Implementación'], answer: 1, explain: 'Comprensión de los datos = **recolección inicial, descripción, exploración y verificación de calidad**. La preparación es limpiar, construir, integrar y formatear.' },
    { id: 'aid-q45', module: 'm11', type: 'mcq', prompt: '"Determinar objetivos de negocio, factores de éxito y producir el plan de proyecto" corresponde a:', options: ['Comprensión del negocio', 'Evaluación', 'Modelado', 'Preparación de los datos', 'Implementación'], answer: 0, explain: 'Es la primera fase: objetivos de negocio, entorno (restricciones, recursos, riesgos, costo-beneficio), objetivos de DM y plan del proyecto.' },
    { id: 'aid-q46', module: 'm11', type: 'tf', prompt: 'El plan de monitoreo y mantenimiento y el reporte final pertenecen a la fase de Implementación.', answer: true, explain: 'Implementación: plan de implementación, plan de monitoreo y mantenimiento, reporte final y documentación.' },
    /* m12 */
    { id: 'aid-q47', module: 'm12', type: 'mcq', prompt: 'La principal diferencia del Text Mining con el Data Mining es que:', options: ['Trabaja sobre información no cuantitativa y no estructurada', 'Solo trabaja con números', 'No busca patrones', 'Es una técnica directa', 'Todas las respuestas anteriores son incorrectas'], answer: 0, explain: 'Persigue lo mismo (relaciones y patrones), pero sobre **texto**: datos **no cuantitativos** y sin estructura intrínseca. Su modalidad es **indirecta**.' },
    { id: 'aid-q48', module: 'm12', type: 'mcq', prompt: 'Las dos etapas de la metodología de Text Mining son:', options: ['Preprocesamiento y descubrimiento', 'Entrenamiento y testeo', 'Extracción y carga', 'Antecedente y consecuente', 'Comprensión y modelado'], answer: 0, explain: 'Primero se **preprocesa** (el texto pasa a una representación estructurada) y después viene el **descubrimiento** de patrones.' },
    { id: 'aid-q49', module: 'm12', type: 'mcq', prompt: 'Analizar los **logs de sesiones** para conocer hábitos de navegación de los usuarios es:', options: ['Web content mining', 'Web structure mining', 'Web usage mining', 'Markup mining', 'Text mining'], answer: 2, explain: '**Web usage:** extrae hábitos y preferencias a partir de las **sesiones y el comportamiento**. Structure analiza la topología de enlaces y content analiza el contenido.' },
    { id: 'aid-q50', module: 'm12', type: 'mcq', prompt: 'Descubrir un modelo a partir de la **topología de los enlaces** entre páginas es:', options: ['Web structure mining', 'Web usage mining', 'Multimedia mining', 'Hypertext mining', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: '**Web structure mining** trabaja con la estructura de links. (Hypertext mining es una variante de **content** para documentos con enlaces).' },
    { id: 'aid-q51', module: 'm12', type: 'mcq', prompt: 'Una **debilidad** del Web Mining es:', options: ['No hay forma exacta de determinar el inicio y el fin de la sesión del usuario', 'No sirve para ubicar publicidad', 'Empeora la performance del servidor', 'No permite reestructurar el sitio', 'Todas las respuestas anteriores son correctas'], answer: 0, explain: 'Además no se registran las páginas servidas desde la **caché local** y los datos pueden ser ambiguos si se reubican páginas. Las otras opciones contradicen sus **fortalezas**.' },
    { id: 'aid-q52', module: 'm12', type: 'tf', prompt: 'Markup mining es la variante de web content mining para documentos semiestructurados, con marcas.', answer: true, explain: 'Content se divide en text (plano), hypertext (con enlaces), **markup (semiestructurado)** y multimedia.' },
  ],

  exercises: [
    {
      id: 'aid-e1', module: 'm10', title: 'Canasta de mercado: soporte, confianza y lift',
      statement: 'Un almacén registró 6 tickets:\nT1: pan, leche · T2: pan, manteca, café · T3: leche, café · T4: pan, leche, café · T5: pan, leche, manteca · T6: café\nEvaluá las reglas **pan ⇒ leche** y **café ⇒ pan**. ¿Cuál conviene? ¿Qué pasa con la negada de la peor?',
      steps: [
        { title: 'Contar apariciones', body: 'pan: T1, T2, T4, T5 → **4/6**\nleche: T1, T3, T4, T5 → **4/6**\ncafé: T2, T3, T4, T6 → **4/6**\npan y leche: T1, T4, T5 → **3/6**\ncafé y pan: T2, T4 → **2/6**' },
        { title: 'Regla pan ⇒ leche', body: 'Soporte = P(pan y leche) = 3/6 = **0,50**\nConfianza = 3/4 = **0,75** (de 4 tickets con pan, 3 tienen leche)\nLift = 0,50 / (4/6 · 4/6) = 0,50 / 0,444 = **1,125**' },
        { title: 'Regla café ⇒ pan', body: 'Soporte = 2/6 = **0,33**\nConfianza = 2/4 = **0,50**\nLift = 0,333 / (4/6 · 4/6) = **0,75** → menor que 1' },
        { title: 'Regla negada café ⇒ NO pan', body: 'Tickets con café y sin pan: T3, T6 → 2/6. P(no pan) = 2/6.\nLift = (2/6) / (4/6 · 2/6) = **1,5** → la negada predice mejor que el azar.' },
      ],
      result: '**pan ⇒ leche** sirve (lift 1,125 > 1). **café ⇒ pan** tiene lift 0,75 < 1, así que conviene su negada **café ⇒ no pan** (lift 1,5).',
    },
    {
      id: 'aid-e2', module: 'm8', title: 'Elegir la mejor regla: la confianza alta no alcanza',
      statement: 'Se tienen 8 eventos (antecedente → consecuente): A→0, A→0, A→0, A→1, A→0, B→1, B→1, B→0. Reglas candidatas: **R1: A ⇒ 0** y **R2: B ⇒ 1**. ¿Cuál es mejor?',
      steps: [
        { title: 'Frecuencias', body: 'A aparece 5 veces, B 3. El consecuente 0 aparece 5 veces (P = 5/8) y el 1 aparece 3 veces (P = 3/8).' },
        { title: 'R1: A ⇒ 0', body: 'A→0 ocurre 4 veces. Soporte = 4/8 = 0,50. Confianza = 4/5 = **0,80**. Lift = 0,80 / (5/8) = **1,28**' },
        { title: 'R2: B ⇒ 1', body: 'B→1 ocurre 2 veces. Soporte = 2/8 = 0,25. Confianza = 2/3 = **0,67**. Lift = 0,67 / (3/8) = **1,78**' },
        { title: 'Comparar', body: 'R1 tiene más confianza, pero R2 mejora mucho más respecto del azar: su lift es mayor.' },
      ],
      result: 'Se elige **R2**: aunque la confianza de R1 es mayor, **el lift decide** (1,78 > 1,28). Es el mismo razonamiento del ejemplo de la cátedra.',
    },
    {
      id: 'aid-e3', module: 'm10', title: 'MBR: clasificar un cliente nuevo con 3 vecinos',
      statement: 'Set de entrenamiento (edad, ingreso en miles, sexo → ¿respondió la oferta?):\nC1: 25, 30, F → Sí · C2: 45, 80, M → No · C3: 30, 35, M → No · C4: 50, 60, F → No · C5: 28, 50, F → Sí\nCliente nuevo: **27 años, ingreso 40, F**. Usá distancia `|a−b| / rango` en los numéricos, 0 o 1 en sexo, y **k = 3**.',
      steps: [
        { title: 'Rangos para normalizar', body: 'Edad: 50 − 25 = **25**. Ingreso: 80 − 30 = **50**.' },
        { title: 'Distancias', body: 'C1: 2/25 + 10/50 + 0 = 0,08 + 0,20 = **0,28**\nC2: 18/25 + 40/50 + 1 = **2,52**\nC3: 3/25 + 5/50 + 1 = **1,22**\nC4: 23/25 + 20/50 + 0 = **1,32**\nC5: 1/25 + 10/50 + 0 = **0,24**' },
        { title: 'Elegir los 3 vecinos más cercanos', body: 'C5 (0,24, Sí), C1 (0,28, Sí), C3 (1,22, No).' },
        { title: 'Combinación democrática', body: 'Sí: 2 votos, No: 1 → **Sí con 67 % de certeza**.' },
        { title: 'Combinación ponderada (peso = 1/d)', body: 'Sí: 1/0,24 + 1/0,28 = 4,17 + 3,57 = 7,74. No: 1/1,22 = 0,82.\nSí = 7,74 / 8,56 ≈ **90 %**.' },
      ],
      result: 'Se predice que **sí responde**: 67 % con combinación democrática y ~90 % con ponderada, porque los dos vecinos que votan Sí están mucho más cerca.',
    },
    {
      id: 'aid-e4', module: 'm9', title: 'Error de un árbol de decisión',
      statement: 'Un árbol tiene dos hojas. A la hoja 1 llegan 60 de 100 registros de prueba y clasifica bien 54. A la hoja 2 llegan 40 y clasifica bien 30. ¿Cuál es el % de error del árbol?',
      steps: [
        { title: 'Error por hoja (1 − aciertos)', body: 'Hoja 1: 1 − 54/60 = **10 %**. Hoja 2: 1 − 30/40 = **25 %**.' },
        { title: 'Peso de cada hoja', body: 'Probabilidad de que un dato nuevo caiga ahí: hoja 1 = 60/100 = **0,6**, hoja 2 = **0,4**.' },
        { title: 'Error del árbol = Σ error × peso', body: '0,10 · 0,6 + 0,25 · 0,4 = 0,06 + 0,10 = **0,16**' },
      ],
      result: 'Error del árbol = **16 %**. El promedio simple daría 17,5 % y estaría mal, porque no considera el peso de cada hoja.',
    },
    {
      id: 'aid-e5', module: 'm8', title: 'Chi cuadrado: ¿el sexo influye en la compra?',
      statement: 'De 100 clientes: hombres que compran 30 y no compran 20; mujeres que compran 10 y no compran 40. ¿Hay relación entre sexo y compra?',
      steps: [
        { title: 'Totales', body: 'Filas: H = 50, M = 50. Columnas: compra = 40, no compra = 60. n = 100.' },
        { title: 'Frecuencias esperadas eij = fila × columna / n', body: 'H-compra: 50·40/100 = 20 · H-no: 30 · M-compra: 20 · M-no: 30' },
        { title: 'χ² = Σ (observado − esperado)² / esperado', body: '(30−20)²/20 + (20−30)²/30 + (10−20)²/20 + (40−30)²/30 = 5 + 3,33 + 5 + 3,33 = **16,67**' },
        { title: 'Interpretar', body: 'Un χ² grande indica que lo observado se aleja mucho de lo esperado bajo independencia, así que la hipótesis de independencia es poco verosímil.' },
      ],
      result: 'χ² ≈ **16,7**: hay **asociación** entre sexo y compra (los hombres compran más de lo esperado).',
    },
  ],

  videos: VIDEOS,

  cheatsheet: POCKET['aid'],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] }));
content.lessons = [
  {
    id: 'aid-clase-1', examId: 'p2', title: 'Clase 1 · Data Mining: tareas, modos y medición',
    summary: 'Definición, las 6 tareas, círculo virtuoso, top-down y bottom-up, directa e indirecta, cómo medir un modelo, estadística y Chi cuadrado.',
    intro: [
      'Bienvenido a la primera clase del segundo parcial de Análisis de la Información y la Decisión. Vamos a ver todo el módulo 8, de introducción al data mining.',
      'El recorrido: qué es el data mining, sus seis tareas y qué herramienta hace cada una, el círculo virtuoso, los modos de aplicación, cómo medir un modelo, los conceptos estadísticos con un Chi cuadrado resuelto, y un caso real.',
    ],
    parts: ['dm-def', 'dm-tareas', 'q:aid-q03', 'dm-circulo', 'dm-modos', 'dm-medir', 'dm-estad', 'ex:aid-e5', 'dm-casos'],
    outro: [
      'Tareas: clasificación, estimación (hoy), predicción (futuro), afinidad, clustering, descripción. Solo las redes neuronales estiman.',
      'Top-down = testeo de hipótesis; bottom-up = búsqueda de conocimiento (directa con objetivo, indirecta sin). Descriptivo: simple (MDL); predictivo: preciso; comparar con LIFT.',
      'En la próxima clase: árboles, clusters, canasta de mercado y MBR, con ejercicios.',
    ],
  },
  {
    id: 'aid-clase-2', examId: 'p2', title: 'Clase 2 · Árboles, clusters, canasta y MBR',
    summary: 'Las cuatro herramientas con ejercicios resueltos: error de un árbol, K-means, soporte/confianza/lift y vecinos más cercanos.',
    intro: [
      'Segunda clase: las cuatro herramientas de data mining de la cursada, cada una con un ejercicio resuelto.',
      'Vamos a ver árboles de decisión, detección de clusters, canasta de mercado y razonamiento basado en memoria.',
    ],
    parts: ['arbol', 'ex:aid-e4', 'cluster', 'q:aid-q27', 'canasta', 'ex:aid-e1', 'ex:aid-e2', 'mbr', 'ex:aid-e3'],
    outro: [
      'Árbol: directa, reglas, expresividad alta; error = Σ error de hoja × peso. CART 2 ramas, CHAID Chi², C4.5 n ramas y poda pesimista.',
      'Cluster: indirecta, expresividad baja; K-means fija k, jerárquico no. Canasta: soporte, confianza, lift (< 1 → la negada). MBR: distancia + combinación, democrática o ponderada.',
      'En la última clase: CRISP-DM, text mining y web mining.',
    ],
  },
  {
    id: 'aid-clase-3', examId: 'p2', title: 'Clase 3 · CRISP-DM, Text y Web Mining',
    summary: 'Las 6 fases de CRISP-DM con sus tareas, text mining en dos etapas y los tres tipos de web mining.',
    intro: [
      'Tercera y última clase del segundo parcial: la metodología CRISP-DM y la minería de texto y de la web.',
      'Son temas cortos pero muy preguntados: el orden de las fases y a qué fase pertenece cada tarea.',
    ],
    parts: ['crisp', 'q:aid-q44', 'text', 'web', 'q:aid-q43'],
    outro: [
      'CRISP-DM: negocio → datos (calidad) → preparación (limpiar, integrar) → modelado → evaluación → implementación (monitoreo, reporte final).',
      'Text mining: preprocesamiento + descubrimiento; ambigüedad; qué y por qué. Web mining: contenido, estructura y uso; la caché local no se registra.',
      'Ahora hacé la práctica de la web hasta llegar al 80 % de aciertos.',
    ],
  },
];

content.questions.push(...REVIEW_QUESTIONS);
content.theory.push(...REVIEW_THEORY);
content.lessons.push(...REVIEW_LESSONS);

export default content;
