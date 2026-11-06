import type { SubjectContent } from '../types';
import { VIDEOS } from '../videos/itc';
import { BANCO, BANCO_EJERCICIOS } from '../banks/itc-banco';

/**
 * ITc · 2º parcial (unidades 4 a 7 = módulos 6 a 13).
 * Redacción propia basada en las presentaciones de la cátedra; ejercicios resueltos propios
 * (los de subnetting y supernetting siguen la guía 5.2 de la materia).
 */
const content: SubjectContent = {
  subjectId: 'itc',
  theory: [
    /* ---------- Módulo 6: LAN ---------- */
    {
      id: 'eth', module: 'm6', title: 'Ethernet: qué es y cómo evolucionó',
      points: [
        '**LAN:** corto alcance (un edificio o un grupo), de una sola organización (que la gestiona) y con velocidades altas.',
        'Ethernet nace en Xerox (Metcalfe, 1972, 2,94 Mbps; nombre "Ethernet" en 1973). Fue **abierta y no propietaria**, y eso explica buena parte de su éxito.',
        'Hitos: DIX V1/V2 a 10 Mbps (1980/82) → **IEEE 802.3 CSMA/CD** (1985) → 802.3i par trenzado 10 Mbps → **802.3u Fast Ethernet 100 Mbps + autonegociación** (1995) → **802.3x full duplex** (1997) → 802.3z/ab Gigabit (fibra/par) → 802.3ac frame de 1522 bytes para VLAN → 10G, 40/100G, 200/400G (2017).',
        'Identificadores: **10Base5** (coaxial grueso, 500 m), **10Base2** (coaxial fino, 185 m), **10Base-T** (par trenzado), **10Base-F** (fibra; FL es el más usado), **100Base-TX** (2 pares Cat 5), **100Base-FX** (fibra multimodo), **1000Base-SX** (onda corta, multimodo, ~220 m), **1000Base-LX** (onda larga, monomodo, ~5 km), **1000Base-CX** (cobre, 25 m), **1000Base-T** (4 pares Cat 5).',
        '4 elementos básicos: **medio físico**, **componentes de señalización** (transceivers), **reglas de acceso al medio** (half o full duplex) y el **frame**.',
        'La subcapa **MAC** no cambia según el medio físico; la **LLC** es independiente de 802.3 y sirve para cualquier LAN.',
      ],
    },
    {
      id: 'frame', module: 'm6', title: 'El frame Ethernet y las direcciones MAC',
      points: [
        '**Ethernet V2 (DIX):** preámbulo 8 bytes · destino 6 · origen 6 · **Tipo** 2 · datos **46 a 1500** · FCS (chequeo).',
        '**IEEE 802.3:** preámbulo 7 + **SFD** 1 · destino · origen · **Longitud** 2 · datos 46–1500 · FCS.',
        'Cómo se distinguen: si el campo después del origen vale **≤ 1500** es la **longitud** (802.3); si vale **≥ 1536 (0x0600)** es el **EtherType**, que indica el protocolo de capa superior (V2).',
        '**MTU** de Ethernet = **1500 bytes**: la PDU más grande que se puede mandar de una vez. **PDU:** unidad de datos de cada protocolo (control + datos).',
        '**MAC:** 48 bits (6 bytes) en hexadecimal, grabada en la ROM de la placa de red, única por interfaz. Todas las placas leen los primeros 6 bytes del frame y solo siguen si la dirección es la suya o broadcast.',
        '**Unicast:** primer byte **par** (bit menos significativo en 0). **Multicast:** primer byte **impar**. **Broadcast:** FF:FF:FF:FF:FF:FF (todos unos; es un caso especial de multicast y no sale de la red).',
      ],
      trap: 'Ejemplos: `4A:…` → 4A = 01001010, termina en 0 → **unicast**. `65:…` → termina en 1 → **multicast**. `F2:…` → par → unicast.',
    },
    {
      id: 'csma', module: 'm6', title: 'CSMA/CD, colisiones y backoff',
      points: [
        'Ethernet half duplex **no tiene control central**: cada estación escucha el canal, espera que esté libre y transmite.',
        '**Carrier Sense:** antes de transmitir se espera que no haya portadora durante el **IFG de 96 bit-times** (9,6 µs a 10 Mbps, 0,96 µs a 100 Mbps).',
        '**Multiple Access:** nadie tiene prioridad. **Collision Detect:** mientras transmite sigue escuchando; si detecta colisión envía una señal **jam de 32 bits** y aplica **backoff**.',
        '**Backoff exponencial binario truncado:** espera = aleatorio × **slot time** (512 bit-times = **51,2 µs a 10 Mbps**, 5,12 µs a 100 Mbps; en Gigabit 4096 bit-times). El aleatorio va de 0 a 2ⁿ − 1, con n = número de intento hasta 10 (después n queda en 10). **Tras 16 intentos se descarta el frame.**',
        'Las colisiones son **normales** y no implican pérdida de datos: se resuelven en microsegundos. Muchas colisiones seguidas indican congestión. Las **colisiones tardías** sí son síntoma de problemas (half/full mal configurado, cable largo, NEXT).',
        '**Dominio de colisión:** zona donde dos nodos que transmiten a la vez colisionan. Hubs y repetidores **extienden** el dominio; **switches y bridges lo separan** (cada puerto es un dominio).',
        'Una estación **adquirió el canal** cuando envió 512 bits sin colisión. Ethernet es **best effort**: no garantiza la entrega (de eso se encarga TCP).',
      ],
    },
    {
      id: 'fullduplex', module: 'm6', title: 'Full duplex, control de flujo y autonegociación',
      points: [
        '**Full duplex:** envía y recibe a la vez (teóricamente el doble de ancho de banda). Solo dos dispositivos por enlace, ambos configurados en full, con caminos separados de Tx y Rx. **Se deshabilita CSMA/CD** (pero se respeta el IFG). **No existen repetidores full duplex.**',
        'Sin CSMA/CD desaparecen las restricciones de ida y vuelta: en **fibra** el enlace puede ser más largo (100Base-FX: 412 m en half → **2 km en full**, hasta 20 km en monomodo). **En cobre no aumenta la distancia.**',
        'Si un extremo está en full y el otro en half aparecen **colisiones tardías**.',
        '**Control de flujo (802.3x):** frame **PAUSE**; los frames de control MAC tienen tipo **0x8808**.',
        '**Autonegociación (802.3u, 1995):** los dispositivos acuerdan velocidad y modo (half o full). Es opcional y **no sensa el cable**: dos placas 100 Mbps sobre cable Cat 3 negocian 100 y el enlace tiene errores. La solución es bajar la velocidad a mano.',
      ],
      trap: 'Pregunta del 1er parcial: cuando dos switches negocian velocidad en full duplex, **¿tienen en cuenta el medio físico? No.** La autonegociación no sensa el cable.',
    },
    {
      id: 'wifi', module: 'm6', title: 'LAN inalámbricas: IEEE 802.11 (Wi-Fi)',
      points: [
        'Wi-Fi es el nombre comercial de **IEEE 802.11** (certificado por la Wi-Fi Alliance). Cubre las capas **física y de enlace** y se la llama "Ethernet inalámbrica".',
        '**CSMA/CD no funciona en wireless** porque los hosts no pueden enviar y recibir a la vez, porque está el **problema de la estación oculta** y porque las distancias pueden ser grandes. Por eso se usa **CSMA/CA** (evita colisiones, con RTS/CTS).',
        'Arquitectura: **BSS** (conjunto básico con AP), **ESS** (varios BSS unidos), **IBSS** (ad-hoc, sin AP).',
        'Subcapas MAC: **DCF** (función de coordinación distribuida) y **PCF** (coordinación de punto).',
        'Dispositivo de capa 2: el **Access Point**, que hace de bridge entre Ethernet y Wi-Fi. Frames de **gestión** (asociación, beacon, probe), de **control** (RTS/CTS) y de **datos** (0 a 2312 bytes de datos).',
        'Opera en bandas **ISM** sin licencia (902–928 MHz, 2,4 GHz, 5,7 GHz). Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6 = 802.11ax.',
        'Topología: Ethernet suele ser estrella; Wi-Fi puede ser estrella o full mesh.',
      ],
    },
    {
      id: 'medios', module: 'm6', title: 'Medios: par trenzado y fibra',
      points: [
        '**UTP** (sin blindaje) y **STP** (blindado, menos interferencia y menos NEXT). A mayor categoría, más ancho de banda: Cat 5e 100 MHz, Cat 6 250 MHz, Cat 6A 500 MHz.',
        'En el par trenzado, los hilos más finos (más AWG) tienen más resistencia.',
        '**Fibra óptica:** transmite luz; núcleo y cubierta con distinto índice de refracción (por eso la luz no se escapa). **Multimodo:** núcleo grande y muchos modos; distancias cortas, uso en datos. **Monomodo:** núcleo chico y distancias largas.',
        'Señalización **baseband** (digital: Manchester en Ethernet, Manchester diferencial en Token Ring) vs **broadband** (analógica, modulada).',
      ],
    },
    /* ---------- Módulo 7: interconexión ---------- */
    {
      id: 'equipos', module: 'm7', title: 'Equipos de interconexión por capa',
      points: [
        '**Repetidor / hub (capa 1):** amplifica, corrige la fase (jitter), regenera el preámbulo y **repite a todos los puertos**. Un hub **no separa dominios de colisión**. Segmento de hasta 100 m.',
        '**Regla 5-4-3:** en un dominio de colisión, máximo **5 segmentos**, **4 repetidores** y solo **3 segmentos con nodos**.',
        '**Switch / bridge (capa 2):** decide el reenvío según la **MAC destino**, no mira capas superiores, **extiende la red y separa dominios de colisión**.',
        '**Router (capa 3):** conecta redes lógicas, elige la siguiente red según la **dirección IP**, mantiene tablas de rutas, puede filtrar por IP, protocolo o puerto, **separa dominios de broadcast** (subredes, VLAN) y une LAN con WAN.',
        '**Switch vs bridge:** el switch conmuta **en hardware** (más rápido), tiene más puertos, puede hacer **cut-through** y da ancho de banda dedicado por segmento. El bridge conmuta en software y solo hace store-and-forward.',
        'Tipos de switch: **cut-through** (reenvía apenas lee el destino; muy rápido pero puede reenviar frames malos), **store-and-forward** (revisa el frame entero antes), **fragment-free** (espera los primeros **64 bytes**), switches de capa 3 y ATM (celdas fijas).',
        'Tipos de bridge: **locales**, **remotos** (por enlaces de telecomunicaciones), **MAC-layer** (redes iguales, 802.3 con 802.3) y **mixed-media** (traducen, 802.3 con 802.5).',
      ],
      table: {
        head: ['Equipo', 'Capa', 'Mira', 'Dominio de colisión', 'Dominio de broadcast'],
        rows: [['Hub / repetidor', '1', 'bits', 'no separa', 'no separa'], ['Switch / bridge', '2', 'MAC', '**separa** (uno por puerto)', 'no separa'], ['Router', '3', 'IP', 'separa', '**separa**']],
      },
    },
    {
      id: 'switch', module: 'm7', title: 'Cómo trabaja un switch',
      points: [
        '**3 funciones:** **aprender** las MAC, **decidir el reenvío** y **evitar loops**.',
        'Aprende mirando la **MAC de origen** de cada frame y anota en la tabla MAC por qué puerto está esa estación (la tabla se actualiza todo el tiempo).',
        'Si la MAC destino está en la tabla, envía el frame **solo por ese puerto**. Si **no está**, lo envía por **todos los puertos menos el de entrada** (inundación); cuando alguien responde, aprende su puerto.',
        'Los **broadcast siempre se reenvían por todos los puertos**.',
        'Con enlaces redundantes entre switches aparecen **loops**; para cortarlos se usa **Spanning Tree (802.1D)**, que bloquea caminos redundantes.',
        'Cada puerto es un dominio de colisión y puede trabajar a distinta velocidad. Normas a considerar: 802.1D (bridging/STP), 802.1Q (VLAN), 802.1p (prioridad).',
      ],
    },
    /* ---------- Módulo 8: IP ---------- */
    {
      id: 'ip', module: 'm8', title: 'Protocolo IP y el modelo TCP/IP',
      points: [
        'IP es popular porque es **abierto** (estándares en **RFC**), independiente del medio físico, con direccionamiento amplio y común, y con protocolos de alto nivel estandarizados.',
        'Modelo TCP/IP en 4 capas: **Acceso a la red** (OSI 1–2), **Internet** (IP), **Transporte** (TCP/UDP) y **Aplicación**. Cada capa agrega su encabezado (**encapsulamiento**).',
        'Nombres de las PDU: TCP → **segmento**; UDP → **mensaje/paquete**; IP → **datagrama**; acceso a red → **frame**.',
        'Funciones de IP: define el **datagrama**, define el **direccionamiento** y mueve datos entre la capa de acceso y la de transporte.',
        'IP es **no orientado a conexión** (sin handshake) y **no confiable** (no detecta ni corrige errores en los datos). Internet es una red de **conmutación de paquetes**: cada paquete viaja independiente.',
        'Encabezado IPv4: 5 o 6 palabras de 32 bits (**mínimo 20 bytes**; el **IHL** indica su largo). Campos: versión, IHL, tipo de servicio, longitud total, identificación, flags, offset de fragmentación, **TTL**, **número de protocolo** (TCP = 6, UDP = 17, ICMP = 1), checksum del header, IP origen, IP destino y opciones.',
        'Con el número de protocolo IP sabe a qué protocolo de transporte entregar los datos.',
      ],
    },
    {
      id: 'clases', module: 'm8', title: 'Direcciones IPv4: clases, especiales y privadas',
      points: [
        '32 bits en notación decimal con puntos. Identifican una **interfaz** (un router tiene varias). Parte de **red** + parte de **host**.',
        '**Clase A:** primer octeto 0–127 · máscara /8 · 126 redes de 16.777.214 hosts.',
        '**Clase B:** 128–191 · /16 · ~16.382 redes de 65.534 hosts.',
        '**Clase C:** 192–223 · /24 · ~2.097.150 redes de 254 hosts.',
        '**Clase D:** 224–239, **multicast** (224.0.0.1 = todos los sistemas de la LAN, 224.0.0.2 = todos los routers; los grupos se gestionan con IGMP). **Clase E:** 240 en adelante, experimental.',
        'Especiales: **127.x.x.x loopback** (nunca sale a la red); host todo en 0 = **dirección de la red**; host todo en 1 = **broadcast de esa red** (ej.: 192.168.1.255); 255.255.255.255 = broadcast en mi red; 0.0.0.0 = mi propio host durante el arranque.',
        '**Privadas (RFC 1918), no se rutean en Internet:** `10.0.0.0/8`, `172.16.0.0/12` (172.16 a 172.31) y `192.168.0.0/16`.',
        'Problemas del esquema con clases: si un host cambia de red cambia su IP, el prefijo fijo desperdicia direcciones y la escala no alcanza (se agotaron las clase B). Las soluciones de corto plazo son subnetting, CIDR y NAT; la definitiva es **IPv6**.',
      ],
      table: {
        head: ['Clase', '1er octeto', 'Máscara por defecto', 'Hosts por red'],
        rows: [['A', '1–126', '255.0.0.0 (/8)', '16.777.214'], ['B', '128–191', '255.255.0.0 (/16)', '65.534'], ['C', '192–223', '255.255.255.0 (/24)', '254'], ['D', '224–239', '—', 'multicast'], ['E', '240+', '—', 'experimental']],
      },
    },
    {
      id: 'subnet', module: 'm8', title: 'Máscaras y subnetting',
      points: [
        '**Máscara:** 32 bits donde los **1 marcan la parte de red** (incluida la subred) y los 0 la de host. Se escribe en decimal (255.255.255.224) o como prefijo (/27).',
        '**Dirección de red = IP AND máscara** (bit a bit).',
        '**Subnetting:** tomar bits de la parte de host para crear subredes. Agrega un nivel jerárquico (red · subred · host) que **solo se interpreta localmente** y es invisible desde afuera. Beneficios: uso eficiente de direcciones, salvar límites de hardware y adaptarse a la organización. Además reduce el tráfico.',
        '**Hosts útiles por subred = 2ⁿ − 2** (n = bits de host): se restan la dirección de red (todos 0) y el broadcast (todos 1).',
        'Con la regla clásica de la cátedra, las subredes con el campo subred todo en 0 o todo en 1 **no se usan**: **subredes útiles = 2ˢ − 2** (s = bits prestados).',
        '**Salto (tamaño de bloque) = 256 − valor de la máscara en el octeto que cambia.** Con /27 (…224) el salto es 32: subredes .0, .32, .64, .96…',
      ],
      table: {
        head: ['Prefijo', 'Máscara (último octeto)', 'Salto', 'Hosts útiles'],
        rows: [['/25', '128', '128', '126'], ['/26', '192', '64', '62'], ['/27', '224', '32', '30'], ['/28', '240', '16', '14'], ['/29', '248', '8', '6'], ['/30', '252', '4', '2']],
      },
    },
    {
      id: 'ipv6', module: 'm8', title: 'IPv6',
      points: [
        'Direcciones de **128 bits** (IPv4 tiene 32): más niveles de jerarquía, muchísimos más nodos y autoconfiguración más simple.',
        '**Encabezado simplificado** (menos procesamiento en routers): versión, clase de tráfico, **etiqueta de flujo** (para QoS), longitud de datos, **siguiente header** (encadena extensiones), **límite de saltos** (equivale al TTL), origen y destino.',
        'Tipos de direcciones: **unicast, anycast** (a uno cualquiera de un grupo) y **multicast**. **No hay broadcast.** Las direcciones se asignan a **interfaces**.',
        'Escritura: 8 grupos de 16 bits en hexadecimal. Se pueden omitir los ceros a la izquierda de cada grupo y **"::" reemplaza uno o más grupos de ceros, pero solo una vez**. Loopback `::1`; no especificada `::`.',
        'IPv4 embebida: **IPv4-compatible** (`::13.1.68.3`) y **IPv4-mapped** (`::FFFF:129.144.52.38`), usadas en la transición (túneles).',
        'Rangos: **global unicast 2000::/3**, **link-local FE80::/10** (solo en el enlace; autoconfiguración y descubrimiento de vecinos), **unique local FC00::/7** (equivalen a las privadas).',
        'Dirección global: **48 bits** de ruteo (ISP) + **16 bits de subred** + **64 bits de ID de interfaz** (formato **EUI-64**, armado a partir de la MAC).',
        'Mejoras extra: multicast con campo de alcance (scope), mejor soporte de opciones y extensiones de autenticación y privacidad.',
      ],
    },
    /* ---------- Módulo 9: ruteo ---------- */
    {
      id: 'ruteo', module: 'm9', title: 'Ruteo (reenvío) y tablas de ruteo',
      points: [
        'Rutear es una función de **IP**: según la IP destino del datagrama se decide a qué equipo mandarlo, consultando la **tabla de ruteo**.',
        'Las tablas pueden ser **estáticas** (cargadas a mano) o **dinámicas** (con un protocolo de ruteo). Un equipo que es solo host **no reenvía** datagramas.',
        'Columnas típicas: **red destino**, **d/i** (entrega directa o vía un router intermedio), **dirección del router** (siguiente salto) e **interfaz** de salida.',
        'Para la entrega final en cada red, el router usa su **tabla ARP** por interfaz (IP → MAC).',
        '**Fragmentación:** si un datagrama pasa a una red con **MTU** menor, IP lo divide en datagramas más chicos (campos identificación, flags y offset).',
        '**Classful:** los routers solo aceptan los prefijos de clase y las máscaras locales, y los protocolos no transmiten el prefijo. **Classless:** los prefijos son de largo variable y los protocolos de ruteo **transmiten la longitud del prefijo**.',
        'Algoritmos de enrutamiento (programa): **Dijkstra** (estado de enlace: cada router conoce la topología y calcula el camino más corto) y **Bellman-Ford** (vector distancia: cada router intercambia distancias con sus vecinos).',
      ],
    },
    /* ---------- Módulo 10: VLSM, CIDR, ARP, ICMP ---------- */
    {
      id: 'vlsm', module: 'm10', title: 'VLSM, CIDR y supernetting',
      points: [
        '**VLSM:** usar **máscaras de distinta longitud** dentro de la misma red para no desperdiciar direcciones (subredes grandes para LAN grandes, /30 para enlaces punto a punto). Regla: el espacio asignado con una máscara **no puede reasignarse** con otra.',
        'Se asignan primero las subredes **más grandes** y después las más chicas, en bloques alineados a su tamaño.',
        '**CIDR (RFC 1519, 1992):** direcciones **sin clase** con prefijo variable (200.2.2.0/24), asignación jerárquica de bloques de clase C (por ejemplo, 200–201.x para América Central y del Sur) y **agregación de rutas**. Los routers usan el **matching más largo (longest match)**.',
        '**Supernetting:** lo inverso al subnetting. Se combinan varias redes en una sola publicación usando una máscara **más corta** que la natural, convirtiendo bits de red en bits de host. Así se achican las tablas de ruteo.',
        'Método: pasar las redes a binario, quedarse con los **bits comunes de izquierda a derecha**, poner en 0 el resto (eso da la red) y poner en 1 tantos bits como coincidieron (eso da la máscara).',
      ],
    },
    {
      id: 'arp', module: 'm10', title: 'ARP',
      points: [
        'El software de red conoce **su** IP y **su** MAC, pero **no las MAC de los demás**. ARP resuelve **IPv4 → MAC** y mantiene una **caché (tabla ARP)**.',
        'Proceso: **ARP request por broadcast** (FF:FF:FF:FF:FF:FF): "¿quién tiene la IP X?". Todos lo reciben, pero solo responde el dueño con un **ARP reply unicast** que trae su MAC. La respuesta se guarda en la tabla.',
        'Si el destino está **en otra red**, el host no busca la MAC del destino sino la del **gateway** (la interfaz del router), comparando su red con la IP destino.',
        'Si nadie responde, el paquete se descarta (no se puede armar el frame) y, si quien falla es un router, puede avisarle al origen con **ICMP**.',
      ],
    },
    {
      id: 'icmp', module: 'm10', title: 'ICMP, ping y traceroute',
      points: [
        '**ICMP (RFC 792):** informa errores y control. Viaja dentro de IP con **protocolo = 1**. Lo genera quien detecta el problema y le avisa al origen. **No hace confiable a IP.**',
        'Funciones: control de flujo, **destino inalcanzable**, **redirección** de rutas, chequeo de nodos remotos (ping), informes de congestión y de timeouts.',
        '**Destination unreachable (tipo 3):** no hay ruta o el paquete no se puede fragmentar. **Echo request (tipo 8) / echo reply (tipo 0):** los usa **ping**. **Redirect (tipo 5):** el router avisa que hay una ruta mejor en la misma red. **Time exceeded:** el TTL llegó a 0 (código 0, router) o venció el reensamblado (código 1, host). **Timestamp:** estima el tiempo de tránsito. **Source quench:** pedía bajar el tráfico, pero empeoraba la congestión y no se usa.',
        '**No se generan ICMP** sobre errores de otros ICMP, sobre datagramas multicast o broadcast, ni sobre fragmentos que no sean el primero.',
        '**Traceroute:** manda datagramas con **TTL = 1, 2, 3…**; cada router que lo deja en 0 responde **Time Exceeded** y así se descubre el camino. En Unix usa UDP (o ICMP con -I); **tracert** de Windows usa ICMP.',
      ],
    },
    /* ---------- Módulo 11: transporte ---------- */
    {
      id: 'transporte', module: 'm11', title: 'Capa de transporte: puertos, sockets, UDP',
      points: [
        'Dos protocolos: **TCP** (confiable, con detección y corrección de errores) y **UDP** (liviano, no confiable). Se elige según la aplicación.',
        'Lo que piden **VoIP y streaming**: rapidez, poca carga y entregar a medida que llega, sin acuses ni reenvíos → **UDP**. Lo que piden **mail y web**: confiabilidad, acuses, reenvío de lo perdido y orden → **TCP**.',
        '**Puertos:** identifican la aplicación o proceso. **0–1023 well-known** (asignados por IANA) · **1024–49151 registrados** · **49152–65535 efímeros** (los usan los clientes).',
        '**Socket = dirección IP + número de puerto.** Tipos: **stream** (TCP: bidireccional, ordenado, sin duplicados ni errores), **datagram** (UDP: puede llegar desordenado, duplicado o no llegar) y **raw** (paquetes IP directos).',
        '**UDP:** acceso directo al servicio de datagramas de IP. **No orientado a conexión**, control de errores **opcional**, ideal para aplicaciones **solicitud/respuesta** y mensajes chicos. Encabezado de **4 campos (8 bytes)**: puerto origen (opcional), puerto destino, longitud (header + datos) y checksum.',
        '¿Por qué un protocolo no confiable? La confiabilidad cuesta **muchos mensajes de control**; solo se justifica cuando hay muchos datos en relación con esos mensajes.',
        '**Multiplexación:** TCP y UDP entregan a la aplicación correcta según el puerto. Una conexión TCP se identifica por **4 valores** (IP y puerto de cada extremo); si cambia uno, es otra conexión.',
      ],
    },
    {
      id: 'tcp', module: 'm11', title: 'TCP: confiable, orientado a conexión, flujo de bytes',
      points: [
        '**Confiable** por **PAR** (Positive Acknowledgment with Retransmission): reenvía hasta recibir el ACK positivo.',
        '**Orientado a conexión:** antes de los datos hace el **three-way handshake**: **SYN** (el cliente propone su número de secuencia inicial) → **SYN + ACK** (el servidor confirma y propone el suyo) → **ACK** (el cliente confirma; puede llevar datos).',
        '**Cierre en 4 pasos:** FIN → ACK → FIN → ACK. Después del primer par, ese sentido ya no manda datos nuevos (cierre de un solo sentido). Quien manda el último ACK queda en **TIME_WAIT** por si tiene que reenviarlo.',
        '**Flujo de bytes:** TCP no ve paquetes sino un stream continuo. El **número de secuencia** es la posición del **primer byte** del segmento; el **número de ACK** es el **próximo byte que se espera** (ACK acumulado). **SYN y FIN consumen 1 número de secuencia.**',
        'Encabezado: puertos origen y destino, nº de secuencia, nº de ACK, largo del header, flags **URG, ACK, PSH, RST, SYN, FIN**, **ventana** (en bytes, la que se anuncia al emisor), checksum, puntero urgente y opciones.',
        '**Piggybacking:** los ACK viajan en el encabezado de los segmentos de datos del sentido contrario.',
        'Puertos conocidos: **HTTP 80, HTTPS 443, SMTP 25, POP3 110, IMAP 143, DNS 53, DHCP 67/68 (UDP), FTP 20/21, Telnet 23, SSH 22.**',
      ],
    },
    /* ---------- Módulo 12: transporte 2 ---------- */
    {
      id: 'ventana', module: 'm12', title: 'Stop-and-wait, pipelining y ventana deslizante',
      points: [
        '**Stop-and-wait:** se envía un segmento y se espera su ACK antes del próximo; si no llega a tiempo, se retransmite. Es muy ineficiente: con 1 Gbps, 15 ms de extremo a extremo y paquetes de 1 KB se usa el enlace el **0,027 %** del tiempo (~33 KB/s).',
        '**Pipelining:** se envían varios segmentos sin esperar confirmación (con buffers), lo que **aumenta la utilización** del canal.',
        '**Ventana deslizante:** el emisor puede tener hasta **winsize** segmentos (o bytes) sin confirmar. Cuando llegan ACK, el límite inferior avanza y la ventana se **desliza**. Siempre se confirma el último dato consecutivo recibido (sin huecos).',
        '**Control de flujo en TCP:** el receptor anuncia su **receive window** (espacio libre en su buffer) y el emisor no puede mandar más allá del último byte confirmado más esa ventana.',
        'Fórmula útil: con ventana de k bits de numeración caben **2ᵏ − 1** tramas en la ventana (módulo 8 → ventana de 7).',
      ],
    },
    {
      id: 'nat', module: 'm12', title: 'MSS, NAT/PAT y port forwarding',
      points: [
        '**Fragmentación en TCP:** el propio TCP divide los datos de la aplicación para que entren en los paquetes IP y los numera por el byte inicial. **MSS** (Maximum Segment Size) = máximo de datos que un host acepta en un segmento; se anuncia en el **SYN** y **puede ser distinto en cada sentido**.',
        '**NAT:** traduce direcciones **privadas** (no ruteables) a **públicas** en el borde de la red. Motivos: escasez de IPs, seguridad (oculta la topología interna) y no depender de los bloques del ISP.',
        '**NAT básico:** una IP pública; el router cambia la IP origen y anota la traducción. Problema: si dos hosts internos acceden al mismo servidor, no sabe a quién devolver. **NAT múltiple:** un rango de IPs públicas.',
        '**PAT / NAPT / NAT overload:** también traduce **puertos**, así **muchas IPs privadas comparten una sola pública** (el router asigna un puerto distinto a cada conexión interna).',
        '**NAT estático:** relación fija privada ↔ pública, útil para **publicar un servidor interno** (ej.: 192.168.0.5:80 → 203.132.165.9:8080).',
        '**Port forwarding:** redirigir tráfico de un puerto a otro puerto o dirección (ej.: lo que llega al 80 público se manda al 8080 de un servidor interno).',
        '**Limitaciones de NAT:** protocolos que llevan IP o puerto en los datos (**FTP, SIP/H.323, ICMP**, algunos SNMP), más carga en el router y problemas con cifrado extremo a extremo (IPsec), porque el checksum de TCP incluye las direcciones.',
      ],
    },
    {
      id: 'congestion', module: 'm12', title: 'Control de congestión en TCP',
      points: [
        '**Control de flujo ≠ control de congestión.** Flujo: que el emisor **no desborde al receptor** (capas de enlace y transporte). Congestión: que los emisores **no saturen la red** (capas de red y transporte).',
        'Síntomas de congestión: **paquetes perdidos** (buffers de routers desbordados) y **retardos** (colas que crecen). Costos: retransmisiones innecesarias y capacidad desperdiciada en paquetes que se descartan.',
        'Dos enfoques: **extremo a extremo** (sin ayuda de la red; se detecta por pérdidas o retardos; **es el de TCP**) y **asistido por la red** (los routers avisan explícitamente, por ejemplo con un bit).',
        'Evento de pérdida = **timeout** o **3 ACK duplicados**. Tasa ≈ **CongWin / RTT**.',
        '**AIMD:** crecimiento aditivo (+1 MSS por RTT) y decrecimiento multiplicativo (CongWin / 2 tras una pérdida). Genera el "diente de sierra".',
        '**Slow start:** al empezar, CongWin = 1 MSS y crece **exponencialmente** (se duplica por RTT) hasta el **umbral** o hasta una pérdida. Ejemplo: MSS 500 B y RTT 200 ms → arranca a 20 kbps.',
        '**Congestion avoidance:** por encima del umbral, crece **linealmente**.',
        '**3 ACK duplicados:** umbral = CongWin/2 y **CongWin = umbral** (sigue lineal; fast recovery). **Timeout:** umbral = CongWin/2 y **CongWin = 1 MSS** (vuelve a slow start). El timeout es la señal más alarmante.',
        '**Tahoe** no distinguía timeout de ACK duplicados; **Reno** sí los distingue. Slow start y congestion avoidance son obligatorios; fast recovery es recomendado.',
      ],
    },
    /* ---------- Módulo 13: aplicación ---------- */
    {
      id: 'dhcp', module: 'm13', title: 'DHCP',
      points: [
        'Asigna automáticamente la configuración IP (dirección, máscara, gateway, DNS, dominio). El servidor sabe quién tuvo cada IP, cuánto tiempo y a quién se la dio después.',
        'Cliente-servidor sobre **UDP: servidor 67, cliente 68**. Ventajas: asignación a demanda, sin configuración manual y soporte de movilidad.',
        'Intercambio **DORA:** **Discover** (el cliente busca servidores, por broadcast) → **Offer** (el servidor propone parámetros) → **Request** (el cliente pide esa oferta) → **Ack** (el servidor confirma). Otros mensajes: **Nak** (concesión vencida o configuración errónea), **Decline** (la dirección ya está en uso), **Release** (el cliente libera la IP), **Inform**.',
        'Métodos de asignación: **automática** (IP permanente), **dinámica** (por un tiempo, la **concesión** o lease; es la única que reutiliza direcciones liberadas) y **manual** (la elige el administrador y DHCP solo la entrega).',
        'Configuración del servidor: ámbitos por subred, rango de direcciones, **exclusiones** (IPs estáticas del propio servidor, gateway, impresoras), duración de la concesión, router por defecto, dominio y DNS.',
      ],
    },
    {
      id: 'dns', module: 'm13', title: 'DNS',
      points: [
        'Traduce **nombres a IPs** y viceversa ("la guía telefónica de Internet"). Antes había un archivo **hosts.txt** que se descargaba cada noche, y eso no escalaba.',
        'Es una **base de datos distribuida y jerárquica** (árbol). **FQDN:** nombre completo, por ejemplo www.palermo.edu. **TLD** genéricos (.com, .edu, .org, .gov, .mil, .int) y de país (ccTLD).',
        '**Zona:** porción del espacio de nombres que maneja un servidor, guardada en un archivo de zona. El servidor tiene **autoridad** sobre sus zonas.',
        '**Primario:** toma los datos de sus archivos locales (ahí se hacen los cambios). **Secundario (slave):** los obtiene del primario por **transferencia de zona**; da redundancia, cercanía a clientes remotos y menos carga al primario. **Caching-only:** no es autoritativo de nada; solo guarda en caché lo que consulta.',
        '**Forwarders:** solo algunos servidores designados salen a Internet y el resto les reenvía las consultas (por seguridad y disponibilidad).',
        'Consultas: **recursiva** (el servidor debe responder con el dato o con un error; la hace el cliente o resolver, y también un servidor a su forwarder), **iterativa** (el servidor da la mejor respuesta que tiene, una referencia; la hacen los servidores entre sí) e **inversa** (IP → nombre, en el árbol **in-addr.arpa**, con los octetos **invertidos**).',
        'Registros: **SOA** (parámetros de la zona), **A** (IP del host), **MX** (servidor de correo y prioridad), **NS** (servidor de nombres), **CNAME** (alias), **PTR** (resolución inversa), HINFO, TXT. Cada registro tiene un **TTL**.',
      ],
    },
    {
      id: 'mail', module: 'm13', title: 'Correo electrónico: SMTP, POP, IMAP, MIME',
      points: [
        'Componentes: **UA/MUA** (cliente para leer y escribir), **MTA** (servidor que transfiere y guarda colas y buzones) y **MDA** (copia el mensaje al buzón). Funciona con **buzones**: el receptor no necesita estar conectado.',
        'Recorrido: el UA de A envía por **SMTP** a su MTA → el MTA consulta el **DNS (registro MX)** del dominio de B → por SMTP llega al MTA de B → B lo lee con **POP3 o IMAP**.',
        '**SMTP (RFC 5321):** **TCP puerto 25**, ASCII de **7 bits**, 3 fases (saludo, transferencia, cierre). Comandos **HELO, MAIL FROM, RCPT TO, DATA** (termina con una línea con un punto) y **QUIT**. Códigos de respuesta: **4xx error temporal, 5xx permanente**.',
        '**IMF (RFC 5322):** formato del mensaje con encabezados (To, From, Subject, Date), línea en blanco y cuerpo; líneas de hasta 998 caracteres.',
        '**MIME:** extensiones para **adjuntos**, ASCII extendido y nuevos encabezados (MIME-Version, **Content-Type**, Content-Transfer-Encoding). Codificaciones **base64** y **quoted-printable** (ej.: ó → =F3).',
        '**POP3 (RFC 1939):** **TCP 110**, muy simple. Por defecto **borra** los mensajes que descarga. Fases: autorización (user/pass), transacción (list, retr, dele) y actualización.',
        '**IMAP (RFC 3501):** más complejo. Permite **carpetas en el servidor** (los nuevos van a INBOX), acceder a **partes** de un mensaje y **conserva el estado entre sesiones**.',
      ],
    },
    {
      id: 'http', module: 'm13', title: 'HTTP y FTP',
      points: [
        '**HTTP:** protocolo de aplicación sobre **TCP (puerto 80; HTTPS 443)**, de **petición-respuesta** y **sin estado** (no guarda nada de conexiones anteriores). Al recurso se lo identifica con una **URL**.',
        '**URL = protocolo + nombre DNS del host + ruta** (https · www.palermo.edu · /index.html).',
        'Al pedir una página: el navegador obtiene la URL → pregunta la IP al **DNS** → abre una **conexión TCP** → envía el **GET** → recibe la página → pide igual los recursos incrustados → muestra la página → libera las conexiones.',
        'Métodos: **GET** (trae el recurso), **HEAD** (solo los encabezados), **POST** (envía datos, por ejemplo de formularios), **PUT** (sube un recurso), **DELETE** (lo borra), **OPTIONS** (consulta las capacidades del servidor), **TRACE** (depuración: devuelve lo que recibió el servidor) y **CONNECT** (para proxies).',
        'Arquitectura web cliente/servidor en 3 capas: cliente (navegador), servidor web/aplicaciones y backend (base de datos).',
        '**FTP:** transferencia de archivos con conexión de **control (TCP 21)** y de **datos (TCP 20)**. Como manda la IP y el puerto del cliente dentro de los datos, tiene problemas con NAT.',
      ],
    },
  ],

  questions: [
    /* m6 */
    { id: 'itc-q01', module: 'm6', type: 'mcq', prompt: 'En un frame Ethernet, el campo de 2 bytes que sigue a la dirección origen vale **0x0800 (2048)**. Eso indica que:', options: ['Es un frame IEEE 802.3 con 2048 bytes de datos', 'Es un frame Ethernet V2 y el campo es el EtherType (protocolo de capa superior)', 'Es un frame de broadcast', 'El frame tiene error de FCS'], answer: 1, explain: 'Si el valor es **≥ 1536 (0x0600)**, el campo es **EtherType** (Ethernet V2) e indica el protocolo encapsulado: 0x0800 es IPv4. Si fuera **≤ 1500** sería la **longitud** de un frame 802.3, y además ningún frame lleva 2048 bytes de datos porque el máximo es 1500.' },
    { id: 'itc-q02', module: 'm6', type: 'mcq', prompt: 'El campo de datos de un frame Ethernet tiene un tamaño de:', options: ['46 a 1500 bytes', '64 a 1518 bytes', '0 a 2312 bytes', '20 a 65.535 bytes'], answer: 0, explain: 'Datos: **46 a 1500 bytes** (MTU = 1500). 64–1518 es el frame completo con encabezados y FCS, 0–2312 es el campo de datos de **Wi-Fi** y 65.535 es el máximo de un datagrama IP.' },
    { id: 'itc-q03', module: 'm6', type: 'mcq', prompt: 'La dirección MAC **65:30:10:21:10:1A** es:', options: ['Unicast', 'Multicast', 'Broadcast', 'Inválida'], answer: 1, explain: '0x65 = 0110 0101: el bit menos significativo del primer byte es **1** (número impar) → **multicast**. Unicast tiene ese bit en 0 (primer byte par) y broadcast es FF:FF:FF:FF:FF:FF.' },
    { id: 'itc-q04', module: 'm6', type: 'tf', prompt: 'Una dirección de broadcast Ethernet es un caso especial de dirección multicast.', answer: true, explain: 'FF:FF:FF:FF:FF:FF tiene en 1 el bit de multicast: es un multicast que reciben **todas** las estaciones. La cátedra lo dice tal cual.' },
    { id: 'itc-q05', module: 'm6', type: 'mcq', prompt: 'En CSMA/CD, después de detectar una colisión la estación:', options: ['Descarta el frame inmediatamente', 'Envía una señal jam de 32 bits y espera un tiempo aleatorio (backoff) antes de reintentar', 'Pide permiso a un controlador central', 'Pasa automáticamente a full duplex'], answer: 1, explain: 'Refuerza la colisión con un **jam de 32 bits** y reprograma con **backoff exponencial binario truncado**. Recién descarta el frame tras **16 intentos**. En Ethernet no hay control central.' },
    { id: 'itc-q06', module: 'm6', type: 'mcq', prompt: 'A 10 Mbps, después de la **3ª colisión** de un mismo frame, ¿cuál es el máximo tiempo de backoff?', options: ['51,2 µs', '153,6 µs', '358,4 µs', '768 µs'], answer: 2, explain: 'Tras n = 3 colisiones, el aleatorio va de 0 a 2³ − 1 = **7**. El máximo es 7 × slot time (51,2 µs) = **358,4 µs**. (1ª: 51,2; 2ª: 153,6; 4ª: 768).' },
    { id: 'itc-q07', module: 'm6', type: 'mcq', prompt: '¿Después de cuántos intentos de retransmisión fallidos Ethernet descarta el frame?', options: ['3', '10', '16', '32'], answer: 2, explain: '**16 intentos.** El exponente del backoff deja de crecer en 10, pero los reintentos siguen hasta 16.' },
    { id: 'itc-q08', module: 'm6', type: 'tf', prompt: 'Las colisiones en una red Ethernet half duplex son siempre síntoma de una falla.', answer: false, explain: 'Son **normales**: indican que CSMA/CD funciona como fue diseñado y no implican pérdida de datos. Lo anormal son las **colisiones tardías** o las repetidas en exceso, que indican congestión.' },
    { id: 'itc-q09', module: 'm6', type: 'mcq', prompt: 'Al pasar un enlace 100Base-FX de half a **full duplex**:', options: ['Se mantiene CSMA/CD', 'Desaparecen las restricciones de ida y vuelta y la fibra puede ser mucho más larga (de 412 m a ~2 km)', 'Se puede usar un repetidor full duplex', 'El cable de cobre también puede ser más largo'], answer: 1, explain: 'En full duplex **se deshabilita CSMA/CD** y ya no hay límite por round-trip: 100Base-FX pasa de 412 m a ~2 km. **No existen repetidores full duplex** y en cobre la distancia **no** aumenta.' },
    { id: 'itc-q10', module: 'm6', type: 'mcq', prompt: 'Dos switches con autonegociación conectados con un cable categoría 3 intentan 100 Mbps. ¿Qué pasa?', options: ['La autonegociación detecta el cable y baja a 10 Mbps', 'Negocian 100 Mbps porque la autonegociación no sensa el cable, y el enlace tiene muchos errores', 'No levanta el enlace nunca', 'Pasan a CSMA/CA'], answer: 1, explain: 'La autonegociación acuerda capacidades de los extremos pero **no sensa el medio físico**. La solución es fijar 10 Mbps a mano o cambiar el cable.' },
    { id: 'itc-q11', module: 'm6', type: 'mcq', prompt: '¿Por qué Wi-Fi no usa CSMA/CD?', options: ['Porque los hosts no pueden enviar y recibir a la vez, existe el problema de la estación oculta y las distancias pueden ser grandes', 'Porque es más caro', 'Porque Wi-Fi no tiene capa MAC', 'Porque Wi-Fi usa conmutación de circuitos'], answer: 0, explain: 'Son las 3 razones de la cátedra. Por eso 802.11 usa **CSMA/CA**: evita las colisiones en vez de detectarlas, con RTS/CTS.' },
    { id: 'itc-q12', module: 'm6', type: 'mcq', prompt: 'Una red 802.11 **ad-hoc**, sin access point, se denomina:', options: ['BSS', 'ESS', 'IBSS', 'DCF'], answer: 2, explain: '**IBSS** (Independent BSS) = ad-hoc. **BSS** es el conjunto básico con AP, **ESS** une varios BSS y **DCF** es una subcapa MAC.' },
    { id: 'itc-q13', module: 'm6', type: 'mcq', prompt: 'Wi-Fi 6 corresponde al estándar:', options: ['802.11n', '802.11ac', '802.11ax', '802.11g'], answer: 2, explain: 'Wi-Fi 4 = **n**, Wi-Fi 5 = **ac**, Wi-Fi 6 = **ax**.' },
    { id: 'itc-q14', module: 'm6', type: 'mcq', prompt: '¿Qué fibra se usa para **largas distancias**?', options: ['Multimodo, núcleo grande', 'Monomodo, núcleo chico', 'UTP Cat 6', 'Coaxial fino'], answer: 1, explain: 'La **monomodo** propaga un solo modo de luz y llega lejos (1000Base-LX ~5 km). La **multimodo** tiene núcleo grande, muchos modos y distancias cortas (1000Base-SX ~220 m).' },
    /* m7 */
    { id: 'itc-q15', module: 'm7', type: 'mcq', prompt: 'Una red tiene 4 hubs en cascada. ¿Cuántos **dominios de colisión** hay?', options: ['1', '4', '5', 'Uno por puerto'], answer: 0, explain: 'Los hubs son repetidores de capa 1: **repiten todo** y no separan dominios de colisión. Toda la red es **un solo dominio**.' },
    { id: 'itc-q16', module: 'm7', type: 'mcq', prompt: 'Un switch de 24 puertos con una PC en cada puerto, sin VLAN. ¿Cuántos dominios de colisión y de broadcast hay?', options: ['1 de colisión y 1 de broadcast', '24 de colisión y 1 de broadcast', '24 de colisión y 24 de broadcast', '1 de colisión y 24 de broadcast'], answer: 1, explain: 'Cada puerto de switch es un **dominio de colisión** (24), pero el switch **reenvía los broadcast por todos los puertos**: 1 solo dominio de broadcast. Para separar broadcast hace falta un **router** (o VLAN).' },
    { id: 'itc-q17', module: 'm7', type: 'mcq', prompt: 'Un switch recibe un frame cuya **MAC destino no está en su tabla**. ¿Qué hace?', options: ['Lo descarta', 'Lo envía por todos los puertos activos excepto por el que llegó', 'Lo devuelve al origen', 'Manda un ARP request'], answer: 1, explain: '**Inunda** el frame por todos los puertos menos el de entrada. Cuando el destino responde, el switch aprende en qué puerto está (aprende siempre de la **MAC origen**).' },
    { id: 'itc-q18', module: 'm7', type: 'mcq', prompt: 'Las 3 funciones de un switch LAN son:', options: ['Aprender MAC, decidir el reenvío y evitar loops', 'Rutear, filtrar puertos y hacer NAT', 'Amplificar, regenerar el preámbulo y repetir', 'Asignar IPs, resolver nombres y cifrar'], answer: 0, explain: 'Aprende direcciones físicas, **toma decisiones de forwarding** y **evita loops** con el algoritmo de **spanning tree**.' },
    { id: 'itc-q19', module: 'm7', type: 'mcq', prompt: '¿Qué tipo de switch espera recibir los primeros **64 bytes** antes de reenviar?', options: ['Cut-through', 'Store-and-forward', 'Fragment-free', 'ATM'], answer: 2, explain: '**Fragment-free** (cut-through modificado) espera 64 bytes, lo que alcanza para descartar fragmentos de colisión. **Cut-through** reenvía apenas lee el destino (puede reenviar frames malos); **store-and-forward** revisa el frame entero.' },
    { id: 'itc-q20', module: 'm7', type: 'tf', prompt: 'Según la regla 5-4-3, en un dominio de colisión puede haber hasta 5 segmentos, 4 repetidores y solo 3 segmentos con nodos.', answer: true, explain: 'Así es: **5** segmentos, **4** repetidores y **3** segmentos poblados.' },
    { id: 'itc-q21', module: 'm7', type: 'mcq', prompt: 'La diferencia principal entre un switch y un bridge es que el switch:', options: ['Trabaja en capa 3', 'Conmuta en hardware (más rápido), tiene más puertos y puede hacer cut-through', 'No separa dominios de colisión', 'Solo hace store-and-forward'], answer: 1, explain: 'Los dos son de capa 2 y separan dominios de colisión. El **switch** conmuta en **hardware**, tiene alta densidad de puertos y soporta **cut-through**; el bridge conmuta en software y solo hace store-and-forward.' },
    /* m8 */
    { id: 'itc-q22', module: 'm8', type: 'mcq', prompt: 'IP es un protocolo:', options: ['Orientado a conexión y confiable', 'No orientado a conexión y no confiable (best effort)', 'Orientado a conexión y no confiable', 'No orientado a conexión y confiable'], answer: 1, explain: 'IP **no hace handshake** (connectionless) y **no detecta ni corrige errores en los datos** (unreliable). La confiabilidad la agrega TCP.' },
    { id: 'itc-q23', module: 'm8', type: 'mcq', prompt: 'La dirección **151.10.15.5** es de clase:', options: ['A', 'B', 'C', 'D'], answer: 1, explain: 'El primer octeto 151 está entre **128 y 191** → **clase B** (máscara por defecto 255.255.0.0).' },
    { id: 'itc-q24', module: 'm8', type: 'mcq', prompt: 'Máscara por defecto de **118.17.45.0**:', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], answer: 0, explain: '118 está entre 1 y 126 → **clase A** → /8 = **255.0.0.0**. El último octeto en 0 no indica clase C: la clase la da el **primer** octeto.' },
    { id: 'itc-q25', module: 'm8', type: 'mcq', prompt: '¿Cuál de estas direcciones es **privada**?', options: ['172.32.10.1', '172.20.5.4', '192.169.1.1', '11.0.0.1'], answer: 1, explain: 'Las privadas son 10.0.0.0/8, **172.16.0.0–172.31.255.255** y 192.168.0.0/16. 172.20.5.4 está dentro; 172.32 se pasa del rango y 192.169 no es 192.168.' },
    { id: 'itc-q26', module: 'm8', type: 'mcq', prompt: 'En **192.168.10.77/26**, la dirección de red y la de broadcast son:', options: ['192.168.10.0 y .63', '192.168.10.64 y .127', '192.168.10.76 y .79', '192.168.10.64 y .255'], answer: 1, explain: '/26 → máscara .192 → salto 64. Bloques: 0–63, **64–127**, 128–191, 192–255. El 77 cae en el segundo: red **.64**, broadcast **.127**, hosts .65 a .126 (62 útiles).' },
    { id: 'itc-q27', module: 'm8', type: 'mcq', prompt: '¿Cuántos hosts útiles tiene una subred **/28**?', options: ['16', '14', '30', '6'], answer: 1, explain: 'Quedan 32 − 28 = 4 bits de host → 2⁴ − 2 = **14** (se restan la dirección de red y el broadcast).' },
    { id: 'itc-q28', module: 'm8', type: 'mcq', prompt: 'La dirección de red se obtiene haciendo:', options: ['IP OR máscara', 'IP AND máscara', 'IP XOR máscara', 'IP + máscara'], answer: 1, explain: 'Un **AND lógico bit a bit** entre la IP y la máscara deja la parte de red y pone en 0 la de host.' },
    { id: 'itc-q29', module: 'm8', type: 'tf', prompt: 'El subnetting agrega un nivel jerárquico a la dirección que solo se interpreta localmente y es invisible para las redes externas.', answer: true, explain: 'Desde afuera se ve solo la red; la división en subredes es interna (red · subred · host).' },
    { id: 'itc-q30', module: 'm8', type: 'mcq', prompt: 'Sobre IPv6, es **correcto**:', options: ['Tiene direcciones de 64 bits', 'Tiene direcciones broadcast', 'Usa direcciones unicast, anycast y multicast, y no tiene broadcast', '"::" puede aparecer varias veces en una dirección'], answer: 2, explain: 'IPv6 usa **128 bits**, tipos **unicast, anycast y multicast**, y **no tiene broadcast**. El "::" se puede usar **una sola vez** (si no, sería ambiguo cuántos ceros reemplaza).' },
    { id: 'itc-q31', module: 'm8', type: 'mcq', prompt: 'La forma comprimida correcta de **2001:0DB8:0000:0000:0008:0800:200C:417A** es:', options: ['2001:DB8::8:800:200C:417A', '2001:DB8:0:8:800:200C:417A', '2001::DB8::8:800:200C:417A', '21:DB8::8:8:2C:417A'], answer: 0, explain: 'Se quitan los ceros a la izquierda de cada grupo (0DB8 → DB8, 0008 → 8, 0800 → 800) y los dos grupos de ceros consecutivos se reemplazan por **una sola vez "::"**.' },
    { id: 'itc-q32', module: 'm8', type: 'mcq', prompt: 'En IPv6, las direcciones **link-local** empiezan con:', options: ['FE80::/10', 'FC00::/7', '2000::/3', 'FF00::/8'], answer: 0, explain: '**FE80::/10** = link-local (solo en el enlace; autoconfiguración y descubrimiento de vecinos). FC00::/7 son las unique local (como las privadas), 2000::/3 las global unicast y FF00::/8 las multicast.' },
    { id: 'itc-q33', module: 'm8', type: 'mcq', prompt: 'En una dirección global IPv6 típica, los 64 bits menos significativos son:', options: ['El prefijo del ISP', 'El ID de subred', 'El ID de interfaz (por ejemplo en formato EUI-64, a partir de la MAC)', 'La dirección IPv4 embebida'], answer: 2, explain: 'Global = **48 bits** de ruteo + **16 bits** de subred + **64 bits** de ID de interfaz (EUI-64).' },
    /* m9 */
    { id: 'itc-q34', module: 'm9', type: 'mcq', prompt: 'Cuando un datagrama de 1500 bytes debe atravesar una red con MTU de 576 bytes, IP:', options: ['Lo descarta siempre', 'Lo fragmenta en datagramas más chicos', 'Lo convierte a IPv6', 'Pide a TCP que reduzca la ventana'], answer: 1, explain: 'IP **fragmenta** usando los campos identificación, flags y offset. (Si el datagrama tiene el bit "no fragmentar", se descarta y se avisa con ICMP destino inalcanzable).' },
    { id: 'itc-q35', module: 'm9', type: 'mcq', prompt: 'En una tabla de ruteo, la marca **"d"** en una red destino indica que:', options: ['La red está caída', 'El datagrama se entrega directamente porque la red está conectada a una interfaz del equipo', 'Hay que usar DNS', 'Es una ruta por defecto'], answer: 1, explain: '**d = directa** (la red está conectada) e **i = indirecta** (se envía a un router intermedio, el siguiente salto).' },
    { id: 'itc-q36', module: 'm9', type: 'tf', prompt: 'En el direccionamiento classless, los protocolos de ruteo transmiten la longitud del prefijo junto con cada red.', answer: true, explain: 'Esa es la diferencia con classful: en classful los protocolos no transmiten el prefijo porque se deduce de la clase.' },
    { id: 'itc-q37', module: 'm9', type: 'mcq', prompt: 'Un equipo que funciona **solo como host**:', options: ['Reenvía datagramas de otros', 'No reenvía datagramas', 'Actúa como router por defecto', 'Hace NAT'], answer: 1, explain: 'Solo los routers (o hosts configurados como tales) reenvían datagramas que no son para ellos.' },
    /* m10 */
    { id: 'itc-q38', module: 'm10', type: 'mcq', prompt: '¿Qué supernet agrupa 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24 y 192.168.3.0/24?', options: ['192.168.0.0/22', '192.168.0.0/23', '192.168.0.0/16', '192.168.3.0/22'], answer: 0, explain: 'En el 3er octeto, 0 a 3 = 000000**00** a 000000**11**: coinciden los primeros 6 bits → 16 + 6 = **22 bits** → **192.168.0.0/22** (255.255.252.0).' },
    { id: 'itc-q39', module: 'm10', type: 'mcq', prompt: 'El principal objetivo de **CIDR y la agregación de rutas** es:', options: ['Cifrar el tráfico', 'Usar mejor las direcciones y achicar las tablas de ruteo', 'Reemplazar a ARP', 'Eliminar la fragmentación'], answer: 1, explain: 'CIDR permite prefijos variables (uso eficiente de direcciones) y que los routers **resuman** muchas redes en una sola entrada.' },
    { id: 'itc-q40', module: 'm10', type: 'mcq', prompt: 'Un host quiere enviar un paquete a una IP de **otra red**. ¿De quién busca la MAC con ARP?', options: ['Del host destino final', 'De la interfaz del router (gateway por defecto)', 'Del servidor DNS', 'De nadie: usa broadcast'], answer: 1, explain: 'Si el destino no está en su red, el frame va al **gateway**: el host resuelve con ARP la MAC del router. La MAC del destino final nunca la conoce.' },
    { id: 'itc-q41', module: 'm10', type: 'mcq', prompt: 'El ARP **request** se envía por ____ y el ARP **reply** por ____.', options: ['unicast / broadcast', 'broadcast / unicast', 'multicast / multicast', 'broadcast / broadcast'], answer: 1, explain: 'La pregunta va a **todos** (FF:FF:FF:FF:FF:FF) porque no se conoce la MAC; responde solo el dueño de la IP, **directo** al que preguntó.' },
    { id: 'itc-q42', module: 'm10', type: 'mcq', prompt: '**Ping** utiliza los mensajes ICMP:', options: ['Echo request (8) y echo reply (0)', 'Destination unreachable (3)', 'Redirect (5)', 'Source quench (4)'], answer: 0, explain: 'Ping envía **Echo Request (tipo 8)** y espera **Echo Reply (tipo 0)**, con el mismo identificador y secuencia.' },
    { id: 'itc-q43', module: 'm10', type: 'mcq', prompt: '¿En qué se basa **traceroute** para descubrir los routers del camino?', options: ['En enviar paquetes con TTL creciente (1, 2, 3…) y recibir ICMP Time Exceeded', 'En consultas DNS inversas', 'En ARP request a cada router', 'En el registro MX'], answer: 0, explain: 'Cada router que deja el TTL en 0 descarta el paquete y responde **Time Exceeded**; así se identifica cada salto.' },
    { id: 'itc-q44', module: 'm10', type: 'tf', prompt: 'Un router genera un mensaje ICMP cuando descarta un datagrama ICMP de error o un datagrama de broadcast.', answer: false, explain: '**No** se generan ICMP sobre errores producidos por ICMP, ni sobre datagramas multicast o broadcast, ni sobre fragmentos que no sean el primero. Así se evitan tormentas de mensajes.' },
    /* m11 */
    { id: 'itc-q45', module: 'm11', type: 'mcq', prompt: 'Para **VoIP** conviene usar:', options: ['TCP, porque garantiza el orden', 'UDP, porque es rápido, liviano y entrega a medida que llega, sin reenvíos', 'ICMP', 'ARP'], answer: 1, explain: 'En voz en tiempo real un dato que llega tarde no sirve: se prefiere **UDP**. TCP es para mail y web, donde importan la confiabilidad y el orden.' },
    { id: 'itc-q46', module: 'm11', type: 'mcq', prompt: 'Los **puertos efímeros**, que usan los clientes, son:', options: ['0–1023', '1024–49151', '49152–65535', '1–255'], answer: 2, explain: '0–1023 well-known (IANA), 1024–49151 registrados y **49152–65535 efímeros**.' },
    { id: 'itc-q47', module: 'm11', type: 'mcq', prompt: 'Un **socket** está formado por:', options: ['MAC + IP', 'Dirección IP + número de puerto', 'Puerto origen + puerto destino', 'Número de secuencia + ACK'], answer: 1, explain: '**Socket = IP + puerto.** Una conexión TCP se identifica con **dos** sockets (cuatro valores).' },
    { id: 'itc-q48', module: 'm11', type: 'mcq', prompt: 'El encabezado UDP tiene:', options: ['Puerto origen, puerto destino, longitud y checksum (8 bytes)', 'Número de secuencia y ACK', 'Ventana y flags', 'TTL y protocolo'], answer: 0, explain: 'UDP es mínimo: **4 campos de 16 bits**. Secuencia, ACK, ventana y flags son de TCP; TTL y protocolo son de IP.' },
    { id: 'itc-q49', module: 'm11', type: 'mcq', prompt: 'El orden del **three-way handshake** de TCP es:', options: ['SYN → SYN+ACK → ACK', 'SYN → ACK → FIN', 'ACK → SYN → SYN+ACK', 'FIN → ACK → FIN → ACK'], answer: 0, explain: 'Cliente **SYN** (propone su secuencia) → servidor **SYN+ACK** → cliente **ACK**. FIN → ACK → FIN → ACK es el **cierre**.' },
    { id: 'itc-q50', module: 'm11', type: 'mcq', prompt: 'Un segmento TCP lleva los bytes 1001 a 1500. Si llega bien, el receptor responde con **ACK =**', options: ['1000', '1500', '1501', '500'], answer: 2, explain: 'El ACK indica el **próximo byte que se espera**: **1501**. Es acumulado: confirma todo lo anterior.' },
    { id: 'itc-q51', module: 'm11', type: 'tf', prompt: 'Los segmentos SYN y FIN consumen un número de secuencia aunque no lleven datos.', answer: true, explain: 'Así se pueden confirmar con un ACK como cualquier dato.' },
    { id: 'itc-q52', module: 'm11', type: 'mcq', prompt: 'TCP es confiable porque usa:', options: ['PAR: reconocimiento positivo con retransmisión', 'Broadcast', 'CSMA/CD', 'Checksum opcional'], answer: 0, explain: '**Positive Acknowledgment with Retransmission:** reenvía hasta recibir el ACK positivo.' },
    /* m12 */
    { id: 'itc-q53', module: 'm12', type: 'mcq', prompt: '¿Cuál es la diferencia entre **control de flujo** y **control de congestión**?', options: ['Son lo mismo', 'El de flujo evita desbordar al receptor; el de congestión evita saturar la red', 'El de flujo es de capa física; el de congestión, de aplicación', 'El de congestión evita desbordar al receptor; el de flujo, la red'], answer: 1, explain: '**Flujo:** emisor rápido vs receptor lento (ventana de recepción). **Congestión:** demasiados emisores para la capacidad de la red (CongWin).' },
    { id: 'itc-q54', module: 'm12', type: 'mcq', prompt: 'En TCP, ante un **timeout**:', options: ['Umbral = CongWin/2 y CongWin = 1 MSS (vuelve a slow start)', 'Umbral = CongWin/2 y CongWin = umbral', 'CongWin se duplica', 'No pasa nada'], answer: 0, explain: 'El timeout es la señal más grave: **CongWin = 1 MSS** y vuelve a slow start hasta el nuevo umbral. Con **3 ACK duplicados** (Reno) CongWin queda en el umbral y sigue lineal.' },
    { id: 'itc-q55', module: 'm12', type: 'mcq', prompt: 'Durante **slow start**, la ventana de congestión:', options: ['Crece linealmente (+1 MSS por RTT)', 'Crece exponencialmente (se duplica por RTT) hasta el umbral', 'Se mantiene fija', 'Se reduce a la mitad por RTT'], answer: 1, explain: 'Empieza en 1 MSS y **se duplica** cada RTT hasta el **umbral**; después entra en **congestion avoidance**, que es lineal.' },
    { id: 'itc-q56', module: 'm12', type: 'mcq', prompt: 'Muchas PCs de una oficina salen a Internet con **una sola IP pública** gracias a:', options: ['NAT estático', 'PAT (NAT overload / NAPT)', 'DNS', 'ARP proxy'], answer: 1, explain: '**PAT** también traduce **puertos**: a cada conexión interna le asigna un puerto distinto de la IP pública. El NAT estático es una relación fija uno a uno.' },
    { id: 'itc-q57', module: 'm12', type: 'mcq', prompt: '¿Qué protocolo tiene **problemas con NAT** porque lleva la IP y el puerto del cliente dentro de los datos?', options: ['HTTP', 'FTP', 'DNS', 'UDP'], answer: 1, explain: 'FTP (y también SIP/H.323 o algunos ICMP) llevan direcciones en el **payload**, que el NAT básico no reescribe.' },
    { id: 'itc-q58', module: 'm12', type: 'mcq', prompt: 'El **MSS** de TCP:', options: ['Es igual en ambos sentidos siempre', 'Se anuncia en el SYN y puede ser distinto en cada sentido', 'Es el tamaño de la ventana de congestión', 'Lo fija el router'], answer: 1, explain: 'El MSS es la máxima cantidad de datos por segmento que acepta **cada host**; se manda en el SYN del handshake y **no se sincroniza** entre los extremos.' },
    { id: 'itc-q59', module: 'm12', type: 'tf', prompt: 'TCP Tahoe distingue entre timeout y 3 ACK duplicados; TCP Reno no.', answer: false, explain: 'Es al revés: **Tahoe no distinguía**; **Reno sí** (con 3 ACK duplicados no vuelve a 1 MSS).' },
    /* m13 */
    { id: 'itc-q60', module: 'm13', type: 'mcq', prompt: 'El orden de los mensajes DHCP para obtener una IP es:', options: ['Discover → Offer → Request → Ack', 'Request → Offer → Discover → Ack', 'Offer → Discover → Ack → Request', 'Discover → Request → Offer → Ack'], answer: 0, explain: '**DORA:** Discover (el cliente busca) → Offer (el servidor ofrece) → Request (el cliente acepta) → Ack (el servidor confirma).' },
    { id: 'itc-q61', module: 'm13', type: 'mcq', prompt: 'DHCP usa:', options: ['TCP 67/68', 'UDP 67 (servidor) y 68 (cliente)', 'UDP 53', 'TCP 25'], answer: 1, explain: '**UDP 67 servidor / 68 cliente.** UDP 53 es DNS y TCP 25 es SMTP.' },
    { id: 'itc-q62', module: 'm13', type: 'mcq', prompt: 'El método DHCP que asigna una IP **por un tiempo** y es el único que reutiliza direcciones liberadas es:', options: ['Automático', 'Dinámico', 'Manual', 'Estático'], answer: 1, explain: '**Dinámico** (concesión o lease). El automático da una IP **permanente** y el manual entrega la que eligió el administrador.' },
    { id: 'itc-q63', module: 'm13', type: 'mcq', prompt: 'Un servidor DNS **secundario**:', options: ['Obtiene los datos de la zona desde el primario mediante una transferencia de zona', 'Es donde se hacen los cambios de la zona', 'No tiene autoridad sobre ninguna zona', 'Solo resuelve consultas inversas'], answer: 0, explain: 'El **secundario** copia la zona del primario (**transferencia de zona**) y da redundancia. Los cambios se hacen en el **primario**; el que no tiene autoridad es el **caching-only**.' },
    { id: 'itc-q64', module: 'm13', type: 'mcq', prompt: 'La consulta que hace un **cliente (resolver)** a su servidor DNS, y que debe responderse con el dato o con un error, es:', options: ['Iterativa', 'Recursiva', 'Inversa', 'Transferencia de zona'], answer: 1, explain: '**Recursiva.** Entre servidores se usan consultas **iterativas**, que devuelven la mejor respuesta disponible o una referencia.' },
    { id: 'itc-q65', module: 'm13', type: 'mcq', prompt: '¿Qué registro DNS indica el **servidor de correo** de un dominio?', options: ['A', 'MX', 'CNAME', 'PTR'], answer: 1, explain: '**MX** (Mail Exchange), con prioridad. A = IP del host, CNAME = alias, PTR = resolución inversa.' },
    { id: 'itc-q66', module: 'm13', type: 'mcq', prompt: 'La resolución **inversa** (IP → nombre) usa el dominio:', options: ['in-addr.arpa, con los octetos invertidos', 'reverse.dns', 'root.net', '.int'], answer: 0, explain: 'Como las IP son más específicas a la derecha y los nombres a la izquierda, en **in-addr.arpa** los octetos se escriben **al revés**.' },
    { id: 'itc-q67', module: 'm13', type: 'mcq', prompt: 'SMTP trabaja sobre:', options: ['UDP 25', 'TCP 25', 'TCP 110', 'TCP 143'], answer: 1, explain: '**SMTP = TCP 25.** POP3 = TCP 110 e IMAP = TCP 143.' },
    { id: 'itc-q68', module: 'm13', type: 'mcq', prompt: 'Diferencia entre **POP3 e IMAP**:', options: ['POP3 permite carpetas en el servidor; IMAP no', 'IMAP permite organizar carpetas en el servidor y conserva el estado entre sesiones; POP3 por defecto borra lo descargado', 'Los dos envían correo', 'IMAP usa UDP'], answer: 1, explain: '**POP3** es simple (autorización, transacción, actualización) y por defecto **borra** los mensajes. **IMAP** maneja **carpetas** en el servidor, partes de mensajes y estado.' },
    { id: 'itc-q69', module: 'm13', type: 'mcq', prompt: '¿Qué permite enviar **adjuntos** y caracteres no ASCII en el correo?', options: ['MIME', 'IMF', 'SMTP', 'POP3'], answer: 0, explain: '**MIME** agrega Content-Type, multipart y codificaciones como **base64** o **quoted-printable**. SMTP solo transporta ASCII de 7 bits.' },
    { id: 'itc-q70', module: 'm13', type: 'mcq', prompt: 'HTTP es un protocolo **sin estado**. Esto significa que:', options: ['No usa TCP', 'No guarda información de las conexiones o peticiones anteriores', 'No tiene métodos', 'Solo transfiere texto'], answer: 1, explain: 'Cada petición es independiente; el servidor no recuerda las anteriores (para eso se agregan cookies o sesiones a nivel de aplicación).' },
    { id: 'itc-q71', module: 'm13', type: 'mcq', prompt: 'El método HTTP que devuelve **solo los encabezados**, sin el cuerpo, es:', options: ['GET', 'HEAD', 'POST', 'TRACE'], answer: 1, explain: '**HEAD** es como GET pero sin el cuerpo. POST envía datos (formularios) y TRACE devuelve lo que recibió el servidor (depuración).' },
    { id: 'itc-q72', module: 'm13', type: 'mcq', prompt: 'Las 3 partes de la URL https://www.palermo.edu/index.html son:', options: ['Protocolo, nombre DNS del host y ruta', 'IP, puerto y MAC', 'Dominio, zona y registro', 'Método, versión y código'], answer: 0, explain: '**https** (protocolo) · **www.palermo.edu** (host, que se resuelve por DNS) · **/index.html** (ruta).' },
    ...BANCO,
  ],

  exercises: [
    {
      id: 'itc-e1', module: 'm8', title: 'Guía 5.2 · Ej. 1 a 3: clase, red/host y máscara por defecto',
      statement: 'Para 148.18.9.3 · 10.250.2.2 · 215.40.45.45 · 178.101.18.4 · 55.251.5.4 indicá la clase, la parte de red y de host y la máscara por defecto.',
      steps: [
        { title: 'Mirar solo el primer octeto', body: '1–126 → A · 128–191 → B · 192–223 → C.' },
        { title: '148.18.9.3', body: '148 → **B** · red `148.18` · host `9.3` · máscara **255.255.0.0**' },
        { title: '10.250.2.2', body: '10 → **A** · red `10` · host `250.2.2` · **255.0.0.0**' },
        { title: '215.40.45.45', body: '215 → **C** · red `215.40.45` · host `45` · **255.255.255.0**' },
        { title: '178.101.18.4 y 55.251.5.4', body: '178 → **B** (red 178.101, host 18.4). 55 → **A** (red 55, host 251.5.4).' },
      ],
      result: 'Clase A: 1 octeto de red. Clase B: 2. Clase C: 3. La máscara por defecto es 255 en los octetos de red.',
    },
    {
      id: 'itc-e2', module: 'm8', title: 'Guía 5.2 · Ej. 4a: subnetting de 210.100.56.0',
      statement: 'Para la red 210.100.56.0 se necesitan **6 subredes útiles** con **30 hosts** cada una. Hallá la máscara y el total de hosts útiles.',
      steps: [
        { title: 'Clase y bits disponibles', body: '210 → clase C, máscara natural /24. Hay 8 bits de host para repartir.' },
        { title: 'Bits de subred', body: 'Se necesitan 6 subredes útiles: 2ˢ − 2 ≥ 6 → **s = 3** (2³ − 2 = 6).' },
        { title: 'Verificar los hosts', body: 'Quedan 8 − 3 = 5 bits: 2⁵ − 2 = **30 hosts** por subred. Justo lo pedido.' },
        { title: 'Máscara', body: '/24 + 3 = **/27** → **255.255.255.224** (11100000 = 224). Salto = 256 − 224 = 32.' },
        { title: 'Subredes', body: '.0 (no útil) · **.32 · .64 · .96 · .128 · .160 · .192** · .224 (no útil). Ej.: la subred .32 tiene hosts .33 a .62 y broadcast .63.' },
      ],
      result: 'Máscara **255.255.255.224 (/27)**, **30 hosts por subred**, **6 × 30 = 180 hosts útiles** en total.',
    },
    {
      id: 'itc-e3', module: 'm8', title: 'Guía 5.2 · Ej. 4b: 126 subredes en 118.0.0.0',
      statement: 'Para la red 118.0.0.0 se necesitan **126 subredes útiles**. Hallá la máscara y los hosts útiles por subred.',
      steps: [
        { title: 'Clase', body: '118 → clase A, /8.' },
        { title: 'Bits de subred', body: '2ˢ − 2 ≥ 126 → **s = 7** (2⁷ − 2 = 126).' },
        { title: 'Máscara', body: '/8 + 7 = **/15** → 11111111.11111110.00000000.00000000 = **255.254.0.0**' },
        { title: 'Hosts', body: 'Quedan 32 − 15 = 17 bits → 2¹⁷ − 2 = **131.070 hosts** por subred.' },
      ],
      result: 'Máscara **255.254.0.0 (/15)**, **131.070 hosts útiles por subred**.',
    },
    {
      id: 'itc-e4', module: 'm10', title: 'Guía 5.2 · Ej. 5: supernetting de un ISP',
      statement: 'Consolidar en una sola ruta: Red A 192.168.3.192/28 · Red B 192.168.3.208/28 · Red C 192.168.3.240/28.',
      steps: [
        { title: 'Pasar a binario el octeto que cambia (el 4º)', body: '192 = **11**000000\n208 = **11**010000\n240 = **11**110000' },
        { title: 'Bits comunes de izquierda a derecha', body: 'Coinciden los 2 primeros bits del 4º octeto ("11"). Prefijo = 24 + 2 = **/26**.' },
        { title: 'Red y máscara', body: 'Copiar los bits comunes y poner 0 en el resto: 11000000 = **192** → red 192.168.3.192. Máscara /26 = **255.255.255.192**.' },
        { title: 'Verificar', body: '192.168.3.192/26 cubre de .192 a .255: incluye A (.192–.207), B (.208–.223) y C (.240–.255).' },
      ],
      result: 'Supernet **192.168.3.192/26** (255.255.255.192).',
    },
    {
      id: 'itc-e5', module: 'm10', title: 'VLSM: repartir 192.168.1.0/24',
      statement: 'Con 192.168.1.0/24 hay que armar: LAN1 de **100 hosts**, LAN2 de **50**, LAN3 de **20** y un enlace punto a punto entre routers (**2 hosts**).',
      steps: [
        { title: 'Ordenar de mayor a menor', body: '100 → 50 → 20 → 2. Siempre se asignan primero los bloques grandes.' },
        { title: 'LAN1: 100 hosts', body: '2⁷ − 2 = 126 ≥ 100 → 7 bits de host → **/25**. Bloque **192.168.1.0/25** (hosts .1–.126, broadcast .127).' },
        { title: 'LAN2: 50 hosts', body: '2⁶ − 2 = 62 → **/26**. Siguiente bloque libre: **192.168.1.128/26** (.129–.190, broadcast .191).' },
        { title: 'LAN3: 20 hosts', body: '2⁵ − 2 = 30 → **/27**. **192.168.1.192/27** (.193–.222, broadcast .223).' },
        { title: 'Enlace: 2 hosts', body: '2² − 2 = 2 → **/30**. **192.168.1.224/30** (.225–.226, broadcast .227). Queda libre desde .228.' },
      ],
      result: '/25, /26, /27 y /30 sin solaparse: eso es **VLSM** (máscaras de distinta longitud en la misma red).',
    },
    {
      id: 'itc-e6', module: 'm12', title: 'Ventana de congestión de TCP paso a paso',
      statement: 'Una conexión arranca con CongWin = 1 MSS y umbral = 16 MSS. ¿Cómo evoluciona la ventana? En el RTT donde CongWin = 20 ocurre una pérdida. Compará qué pasa si la pérdida es por **timeout** y si es por **3 ACK duplicados** (Reno).',
      steps: [
        { title: 'Slow start (exponencial)', body: '1 → 2 → 4 → 8 → **16** (llega al umbral).' },
        { title: 'Congestion avoidance (lineal, +1 por RTT)', body: '17 → 18 → 19 → **20** → pérdida.' },
        { title: 'Nuevo umbral', body: 'En los dos casos: umbral = 20 / 2 = **10**.' },
        { title: 'Si fue timeout', body: 'CongWin = **1 MSS** y vuelve a slow start: 1 → 2 → 4 → 8 → 10, y después lineal.' },
        { title: 'Si fueron 3 ACK duplicados (Reno)', body: 'CongWin = umbral = **10** y sigue lineal: 11 → 12 → … (fast recovery).' },
      ],
      result: 'Timeout → ventana a 1 MSS (más drástico). 3 ACK duplicados → ventana a la mitad (10). En los dos casos el umbral queda en 10.',
    },
    {
      id: 'itc-e7', module: 'm6', title: 'Backoff exponencial binario truncado',
      statement: 'En Ethernet a 10 Mbps, ¿qué rango de espera puede elegir una estación tras su 1ª, 2ª y 4ª colisión con el mismo frame?',
      steps: [
        { title: 'Fórmula', body: 'Espera = k × slot time, con k aleatorio entre 0 y 2ⁿ − 1 (n = número de colisión, tope 10). Slot time = 512 bit-times = **51,2 µs** a 10 Mbps.' },
        { title: '1ª colisión (n = 1)', body: 'k ∈ {0, 1} → espera de **0 a 51,2 µs**.' },
        { title: '2ª colisión (n = 2)', body: 'k ∈ {0…3} → **0 a 153,6 µs**.' },
        { title: '4ª colisión (n = 4)', body: 'k ∈ {0…15} → **0 a 768 µs**.' },
      ],
      result: 'El rango se **duplica** con cada colisión (hasta n = 10). Tras **16 intentos** el frame se descarta.',
    },
    ...BANCO_EJERCICIOS,
  ],

  videos: VIDEOS,

  cheatsheet: [
    { t: 'Frame Ethernet', d: 'V2: preámbulo 8 · dest 6 · origen 6 · **Tipo** · datos 46–1500 · FCS 4. 802.3: preámbulo 7 + SFD 1 · **Longitud**. Campo ≤ 1500 → longitud; ≥ 1536 → EtherType.' },
    { t: 'MAC', d: '48 bits. 1er byte par → unicast; impar → multicast; FF…FF → broadcast.' },
    { t: 'CSMA/CD', d: 'IFG 96 bit-times · jam 32 bits · backoff k·51,2 µs con k ∈ [0, 2ⁿ−1], n ≤ 10 · se descarta tras 16 intentos. Full duplex = sin CSMA/CD.' },
    { t: 'Dominios', d: 'Hub: 1 dominio de colisión. Switch: 1 dominio de colisión por puerto y 1 de broadcast. Router: separa broadcast. Regla 5-4-3.' },
    { t: 'Switch', d: 'Aprende de la MAC **origen**; destino desconocido → inunda menos el puerto de entrada; broadcast → todos; loops → Spanning Tree 802.1D. Cut-through / store-and-forward / fragment-free (64 B).' },
    { t: 'Wi-Fi', d: '802.11 · **CSMA/CA** (estación oculta) · BSS / ESS / IBSS (ad-hoc) · DCF / PCF · Wi-Fi 4 n, 5 ac, 6 ax.' },
    { t: 'Clases IPv4', d: 'A 1–126 /8 · B 128–191 /16 · C 192–223 /24 · D 224–239 multicast · 127 loopback. Privadas: 10/8, 172.16/12, 192.168/16.' },
    { t: 'Subnetting', d: 'Hosts = 2ⁿ − 2 · subredes útiles = 2ˢ − 2 · salto = 256 − máscara · red = IP AND máscara · broadcast = siguiente red − 1.' },
    { t: 'Supernetting / CIDR', d: 'Bits comunes de izquierda a derecha → prefijo más corto. Ej.: 192.168.0–3.0/24 → 192.168.0.0/22. Longest match.' },
    { t: 'IPv6', d: '128 bits · unicast / anycast / multicast · **sin broadcast** · "::" una sola vez · ::1 loopback · FE80::/10 link-local · FC00::/7 local · 2000::/3 global · 48 + 16 + 64 (EUI-64).' },
    { t: 'ARP e ICMP', d: 'ARP: request broadcast, reply unicast; fuera de la red → MAC del gateway. ICMP (protocolo 1): echo 8/0 (ping), unreachable 3, redirect 5, time exceeded (traceroute).' },
    { t: 'Puertos', d: '0–1023 well-known · 1024–49151 registrados · 49152+ efímeros. HTTP 80 · HTTPS 443 · SMTP 25 · POP3 110 · IMAP 143 · DNS 53 · DHCP 67/68 UDP · FTP 20/21.' },
    { t: 'TCP', d: 'PAR · SYN → SYN+ACK → ACK · cierre FIN/ACK ×2 + TIME_WAIT · seq = 1er byte · ACK = próximo byte esperado · SYN y FIN consumen 1 nº. UDP: 8 bytes, sin conexión.' },
    { t: 'Congestión', d: 'Slow start ×2 hasta el umbral → lineal. 3 ACK duplicados: umbral = cwnd/2, cwnd = umbral. Timeout: umbral = cwnd/2, cwnd = 1 MSS. Tahoe no distingue; Reno sí.' },
    { t: 'NAT', d: 'Básico (1 IP) · múltiple (rango) · **PAT/overload** (también puertos: muchas privadas → 1 pública) · estático (publicar servidores) · port forwarding. Choca con FTP, SIP, IPsec.' },
    { t: 'Aplicación', d: 'DHCP: DORA; automático, dinámico (lease) o manual. DNS: recursiva (cliente) / iterativa (servidores) / inversa (in-addr.arpa); A, MX, NS, CNAME, PTR, SOA. Mail: SMTP envía; POP3 descarga y borra; IMAP carpetas; MIME adjuntos. HTTP: sin estado; GET, HEAD, POST, PUT, DELETE.' },
  ],
};

export default content;
