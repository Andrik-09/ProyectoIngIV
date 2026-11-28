---
hide:
  - navigation
---

# Semana 9 — Integración, go-to-market y pitch

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

Esta es la última semana de contenido antes de dos semanas de trabajo propio y la evaluación final. Ya no se trata de analizar un escenario más, sino de responder si los tres componentes del producto —el equipo físico, la app y la landing— funcionan juntos, con quién se probaría cada uno, cómo se lanzaría y cómo se cuenta en 3 minutos. Todo lo que sigue se escribió con el estándar de honestidad del proyecto: lo que no tiene evidencia se marca como <span class="status-badge hipotesis">hipótesis</span> o <span class="status-badge pendiente">pendiente</span>, no se inventa.

---

## Bloque 1 — Integración del sistema

Nervik tiene cuatro fronteras, heredadas de la arquitectura de la Semana 5: del sensor al microcontrolador, del equipo al servidor, del servidor al modelo de riesgo y del servidor a la app y la landing. Las fallas de un producto mecatrónico con IA casi siempre viven ahí, en el cruce entre dos partes, no dentro de una sola.

| Frontera | Pregunta | Registro | Estado |
|---|---|---|---|
| F1 · Sensor → microcontrolador | ¿La lectura es confiable? | Monitor serie: C/N0, satélites, PGN del bus, IMU | <span class="status-badge pendiente">pendiente</span> hardware en armado |
| F2 · Equipo → servidor | ¿El dato sale y llega? | Contador y firma de cada sobre; cola en flash | <span class="status-badge ok">probado</span> en simulación |
| F3 · Servidor → modelo | ¿La respuesta es utilizable? | Zonas de riesgo v0 en `/riesgo/zonas` | <span class="status-badge ok">probado</span> (los simulacros no cuentan) |
| F4 · Servidor → app y landing | ¿Se ve lo correcto a tiempo? | Eventos SSE; métricas del embudo | <span class="status-badge ok">probado</span> en local · landing sin API publicada |

### Pruebas mínimas, con criterios del PDS

Seis pruebas de sistema, de la más barata a la más cara. Los criterios no salen de la intuición: son los mismos requisitos verificables de la Semana 5.

| # | Prueba | Criterio | Resultado |
|---|---|---|---|
| T1 | Instalación sin ayuda | Menos de 5 min sin intervención | <span class="status-badge pendiente">pendiente</span> |
| T2 | Latencia de punta a punta | ≤ 60 s (requisito de desempeño del PDS) | <span class="status-badge ok">medido</span> en simulación: mediana 1.6 ms, p95 5.1 ms (20 repeticiones). Falta sumar la red celular real |
| T3 | Desconexión y recuperación | Se recupera sin perder lecturas tras 10 min sin red | <span class="status-badge pendiente">pendiente</span> — la API ya rechaza reenvíos y acepta la cola en orden |
| T4 | Autonomía de batería | Proyección de 72 h (requisito E-04) | <span class="status-badge no-cumple">no cumple</span> el prototipo todavía no tiene batería |
| T5 | Falla del modelo o de la API | Degrada con mensaje claro, sin datos perdidos | Por diseño no depende de la nube para detectar; <span class="status-badge pendiente">pendiente</span> provocar la caída con el equipo conectado |
| T6 | 48 h en campo | Sin reinicios ni datos perdidos | <span class="status-badge pendiente">pendiente</span> |

!!! quote "Si no pueden decir en qué frontera falló, el problema no es el bug: es que no hay registros"
    Por eso cada frontera de la tabla de arriba tiene su propio registro definido antes de necesitarlo, no después de una falla en campo.

**Bugs reales encontrados al integrar** (no hipotéticos): en F1, el mapa de pines de la PCB no coincidía con el del protoboard porque el GPS quedó en otro UART — se separó con una bandera de compilación (`-DPINES_PCB`); también en F1, las huellas de KiCad de un compañero no cargaban por bibliotecas desactualizadas. En F2, se descubrió que el módem BG95 no puede usar GNSS y LTE al mismo tiempo — el mismo hallazgo que forzó el cambio a SIM7080G en la revisión DFM de la Semana 8. En F4, GitHub Pages no tiene backend: la tienda y el formulario no pueden guardar nada sin una API publicada, así que se decidió mostrar un aviso de vista previa en vez de simular datos falsos.

**Checklist de listo:** hardware funcionando sin laptop <span class="status-badge no-cumple">no</span> · app desplegada <span class="status-badge ok">sí</span>, en modo demostración · landing publicada <span class="status-badge ok">sí</span> · dato del sensor a la pantalla sin intervención <span class="status-badge hipotesis">solo en simulación</span>.

## Bloque 2 — Pruebas con usuarios

Se diseñó un protocolo de 30 minutos para probar tres tareas con 5 personas (3 del segmento objetivo, 2 de otro equipo como control): instalar el equipo desde la caja, conectar la app e interpretar una alerta simulada, y encontrar el precio y apartar una unidad. El observador no ayuda ni defiende el diseño; si la persona se atora, anota el minuto y espera 30 segundos antes de intervenir.

| Tarea | Éxito sin ayuda | Tiempo | SEQ (1–7) | Hallazgos |
|---|:---:|:---:|:---:|---|
| 1 · Instalar | <span class="status-badge pendiente">pendiente</span> | — | — | Las 5 sesiones no se han hecho |
| 2 · Interpretar la alerta | <span class="status-badge pendiente">pendiente</span> | — | — | — |
| 3 · Precio y apartado | <span class="status-badge pendiente">pendiente</span> | — | — | — |

Sin esas sesiones no hay tasas de éxito, tiempos ni puntajes SEQ que reportar — y el método prohíbe inventarlos.

!!! tip "Qué cuenta como señal de negocio"
    Solo se cuenta como compromiso real un apartado con folio, un pre-registro verificado o una cita agendada con el dueño de la flota. Un "me interesa" en la conversación es una opinión, no una señal.

## Bloque 3 — Go-to-market y economía unitaria

### El primer cliente

**Hipótesis de early adopter:** flota de 31 a 100 unidades con base en Puebla, que mueve carga de alto valor o perecedera por los corredores Puebla–Oaxaca o Puebla–Veracruz, con un asalto reciente, que ya paga GPS y custodias, y cuyo dueño decide la compra directamente — los cuatro rasgos que distinguen a un early adopter de un cliente de mercado masivo. <span class="status-badge hipotesis">hipótesis</span>

**Canales:** venta directa de los fundadores para los primeros 20 clientes (no escala), la delegación Puebla de CANACAR como puerta de entrada, brokers de seguros como recomendadores, y la [landing](https://andrik-09.github.io/Nervik/web/) con pre-registro activo desde ya.

**El piloto:** 10 unidades durante 90 días en 2 flotas ancla con suscripción prepagada. El criterio de éxito no es instalarlas: es que la aseguradora de alguna de esas flotas acepte un expediente real como evidencia.

### Las métricas que definen si el lanzamiento cierra

| Métrica | Valor | Origen |
|---|---:|---|
| Precio de suscripción | $300 / mes | Decisión (Semana 7) |
| Costo operativo por unidad | $29.96 / mes | <span class="status-badge hipotesis">supuesto</span> SIM, nube y soporte |
| Contribución mensual | $270.04 | Cálculo |
| CAC | $720 | <span class="status-badge hipotesis">supuesto</span> presupuesto de demo y visita |
| Hardware subsidiado | $295 | Costo cotizado $2,095 − precio $1,800 |
| **Inversión por cliente** | **$1,015** | CAC + subsidio de hardware |
| Churn mensual | 3% | <span class="status-badge hipotesis">supuesto</span> sin dato del piloto |
| **LTV** | **$9,001** | Cálculo |
| **LTV ÷ inversión** | **8.9** | Cálculo |
| **Payback** | **3.8 meses** | Cálculo |

!!! danger "Sensibilidad: el precio manda, el churn es el supuesto más débil"
    Con variaciones de ±25%: si el precio baja a $225, LTV ÷ inversión cae a 6.4 y el payback sube a 5.2 meses. Si el churn sube a 3.75%, LTV ÷ inversión baja a 7.1. Si el CAC sube a $900, baja a 7.5 y el payback sube a 4.4 meses. La regla práctica del método (recuperar la inversión en 3 meses) se rompe si el churn real pasa de 8.9% mensual — y hoy ese número es un supuesto, no un dato.

**Palancas identificadas:** el cambio de módem a SIM7080G (decidido en la revisión DFM) elimina el subsidio de hardware y baja el payback a 2.7 meses; el prepago anual en las flotas ancla adelanta el flujo de caja; el autodiagnóstico a distancia desde la app reduce el costo de soporte por unidad.

## Bloque 4 — Regulación mínima viable

No se necesita resolver todo el marco legal para correr un piloto, pero sí saber qué puede impedir vender a un tercero — y con qué fuente oficial se confirma cada punto.

| Tema | Qué aplica | Estatus |
|---|---|---|
| Inhibidores de señal | Prohibido fabricar, vender, portar y usar equipos que bloqueen señales (art. 190 Bis LFTR y 168 Ter del Código Penal Federal, DOF 24-ene-2020). Nervik solo detecta; el simulacro recrea la huella sin emitir nada | <span class="status-badge ok">verificado</span> |
| Radio y homologación | Un equipo que usa el espectro necesita certificado de homologación (lineamientos del IFT) | <span class="status-badge pendiente">por verificar</span> si el SIM7080G ya está homologado en México |
| Datos personales | La app trata ubicación de unidades y datos de contacto: aplica la LFPDPPP (DOF 20-mar-2025), con aviso de privacidad y derechos ARCO | <span class="status-badge ok">verificada la ley</span> · aviso en borrador |
| Valor probatorio del expediente | La NOM-151-SCFI-2016 fija la constancia de conservación de mensajes de datos de un prestador acreditado | <span class="status-badge pendiente">por verificar</span> si la aseguradora la exige |
| Seguridad eléctrica y etiquetado | Información comercial del equipo; transitorios de 12/24 V (referencia ISO 7637-2) | <span class="status-badge pendiente">por verificar</span> |
| Baterías | Transporte de celdas de litio (prueba UN 38.3); el prototipo aún no lleva batería | <span class="status-badge pendiente">por verificar</span> |
| Licencias de software | Arduino-Pico y TinyGSM (LGPL), micro-ecc (BSD-2), ArduinoJson, QRCode y MCP2515 (MIT), React (MIT), Leaflet (BSD-2), datos de OpenStreetMap (ODbL, con atribución). No se usa ningún modelo de IA de terceros | <span class="status-badge ok">verificado</span> en el repositorio |
| Términos de venta | El carrito aparta sin cobrar; falta la facturación electrónica y los términos del plan | <span class="status-badge pendiente">pendiente</span> |

**Lo que sí se puede hacer en una prueba de mercado sin resolver todo lo anterior:** pre-registro, apartado sin cobro y un piloto con consentimiento por escrito. **Antes de vender a un tercero** hacen falta: homologación del módem, aviso de privacidad revisado por un abogado, términos del plan y facturación, y la opinión de un especialista en propiedad intelectual sobre la zona gris detectada en la Semana 3 (MX 356554 B).

## Bloque 5 — El pitch de 3 minutos

Un pitch de 3 minutos tiene que cerrar seis preguntas, no una sola: qué duele, por qué esta solución, qué tan grande es el mercado, qué tan avanzado está el equipo, quién lo construye y qué se pide. El guion siguiente marca con llaves la evidencia de este documento que respalda cada frase — nada se afirma sin esa referencia.

Impacto (35 s)
: «Un transportista de Puebla lleva carne a Oaxaca. Lo han asaltado dos veces. Cada cargamento vale medio millón de pesos. Cuando lo atacan, un inhibidor apaga su GPS y su central se queda ciega justo en esos minutos.» — respaldo: entrevista de campo (Semana 4) y cifras de AMESIS/AMIS (Semana 2).

Solución y por qué nosotros (35 s)
: «Nervik es una cuña en la cabina que reconoce el ataque aunque no haya señal, avisa en cuanto puede y guarda un expediente firmado que la aseguradora comprueba sin confiar en nadie. No apaga el motor: solo escucha. Somos tres ingenieros con firmware, app y PCB propios.» — respaldo: propuesta de valor (Semana 4) y arquitectura (Semana 5).

Mercado y modelo (35 s)
: «Hay 46 mil tractocamiones en flotas medianas de los corredores del centro. Cobramos $1,800 por equipo y $300 al mes; una custodia cuesta de 25 a 45 mil pesos por viaje.» — respaldo: mercado (Semana 4) y modelo económico (Semana 7).

Tracción (35 s)
: «La app, el servidor y la firma ya funcionan con pruebas automáticas. Nuestra confesión: aún no lo probamos en un camión y solo un transportista ha escuchado la propuesta.» — respaldo: Bloque 1 de esta semana y prueba de campo (Semana 4).

Equipo (15 s)
: «Andrik, Juan Pablo y Mauro; empezamos porque a un familiar le robaron la carga.» — respaldo: bitácora de la Semana 1.

Ask y cierre (25 s)
: «Buscamos 2 flotas y un broker para el piloto de 10 unidades. Cuando el jammer apaga todo, Nervik sigue contando lo que pasó.»

### Preguntas difíciles, ensayadas de antemano

Motive ya detecta el bloqueo, ¿por qué ustedes?
: Motive avisa al reconectar y su respuesta es el paro de motor; Nervik entrega evidencia verificable por un tercero, a menor precio (Semana 4).

¿Y si la aseguradora no acepta el expediente?
: El precio baja a un techo de $37 al mes sin ese supuesto; por eso la entrevista con un broker es lo primero del plan de 90 días (Semana 7, Bloque 3 de esta semana).

¿Es legal?
: No se emite interferencia ni se toca el motor; lo prohibido es el inhibidor, no detectarlo (Bloque 4 de esta semana).

¿Cuándo dejan de perder dinero?
: El flujo es positivo desde el mes 14, con unos $480,000 de financiamiento (Semana 7).

## Bloque 6 — La demo de 7 minutos

La demo no es el pitch otra vez: el pitch convence de que vale la pena mirar, la demo prueba que el sistema existe. Cada tramo tiene un plan B porque algo en vivo siempre puede fallar.

| Tramo | Qué se muestra | Plan B |
|---|---|---|
| 0:00–0:45 · Contexto | Equipo, app abierta y landing en pantalla | Capturas de pantalla |
| 0:45–3:15 · Camino principal | Alta por código QR, prueba automática y unidad marcada "Protegida" | Gemelo digital (`npm run simular`) |
| 3:15–4:45 · Provocar el evento | Botón de prueba de 3 s: simulacro N1 → N3 y alerta, declarando el atajo (sin usar un inhibidor real) | Video de respaldo |
| 4:45–5:45 · Fallo manejado | Se corta la red: la unidad queda "muda", la cola se envía al volver y la firma se verifica | Hotspot propio |
| 5:45–6:30 · La compra | Landing → "Aparta tu unidad del piloto" → folio | API local |
| 6:30–7:00 · Cierre | Qué falta: batería, prueba en camión, entrevistas con flotas y brokers | — |

## Lo que el equipo debe poder responder al salir

¿En cuál de las cuatro fronteras es más probable que falle, y qué registro pondrán ahí?
: F1 (sensor → microcontrolador): es la única que todavía no se probó con hardware real, y su registro ya está definido (monitor serie de C/N0, satélites, PGN y IMU).

¿Cuál es su CAC, su LTV y su relación LTV ÷ inversión, y qué palanca mueve más el resultado?
: CAC $720, LTV $9,001, LTV ÷ inversión 8.9. La palanca más sensible es el precio de suscripción, no el CAC ni el churn.

¿Cuál de los temas regulatorios puede impedirles vender a un tercero, y qué fuente oficial lo confirma?
: La homologación del módem ante el IFT — sin ese certificado no se puede vender legalmente el equipo con radio, y hoy está marcada como por verificar.

¿Qué evidencia tienen para cada una de las seis partes de su pitch, y cuáles son pendientes?
: Cinco de seis partes tienen respaldo documentado (impacto, solución, mercado, equipo y ask); la parte de tracción es honesta sobre lo que falta: el prototipo físico no se ha probado en un camión.

¿Cuál es el camino principal de su demo de 7 minutos, qué evento provocan en vivo y cuál es su plan B?
: El camino principal es alta por QR → prueba automática → simulacro de ataque con el botón de prueba (sin inhibidor real) → corte de red → compra en la landing; el plan B de cada tramo está documentado en el Bloque 6.

## Conclusión de la semana

Esta semana no agregó una idea nueva: puso a prueba si las ocho semanas anteriores embonan. La respuesta es parcialmente sí — la app, el servidor y la firma ya funcionan juntos en simulación — y parcialmente no: el prototipo físico sigue en protoboard, nadie lo ha instalado en un camión y cero de las cinco sesiones de prueba con usuarios se han hecho. La economía unitaria confirma lo que ya se sabía desde la Semana 7 y se profundizó en la Semana 8: el negocio solo cierra si el churn se mantiene bajo y, sobre todo, si una aseguradora valida el expediente — esa sigue siendo la entrevista más importante, y todavía no se ha hecho. El plan de 90 días es ahora el documento que manda: prototipo probado y API publicada en el primer mes, dos equipos en una flota ancla en el segundo, y un expediente real revisado por una aseguradora en el tercero.
