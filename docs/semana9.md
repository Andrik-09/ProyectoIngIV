---
hide:
  - navigation
---

# Semana 9 — Integración, go-to-market y pitch

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

Es la última clase de contenido. Esta semana tuvimos que juntar las tres partes de Nervik: el dispositivo, la app del centro de control y la página de venta. A diferencia de las semanas anteriores, aquí no basta con diseñar: hay que demostrar que funcionan juntas, que una persona ajena las puede usar y que el negocio se sostiene con números. Este documento reúne cinco cosas: la integración real del prototipo de la Fase 1 con sus fallas, el protocolo de pruebas con usuarios, la economía unitaria de lanzamiento, el checklist regulatorio y la preparación del pitch de 3 minutos y de la demostración de 7. Al final está la ruta de las dos semanas de trabajo que quedan antes de la evaluación.

Nervik sigue siendo lo que se definió desde la Semana 5. Es un equipo que se conecta al puerto de diagnóstico de un tractocamión, detecta en el propio dispositivo un ataque con inhibidor de señal y guarda un expediente firmado que nadie puede alterar. Ese expediente sirve como evidencia frente a la aseguradora.

---

## Bloque 1 — Integración del sistema

### Lo que se integró esta semana

Para la demostración se construyó la **Fase 1** del producto: una PCB propia de una sola cara, fresada y soldada a mano. Lleva una Raspberry Pi Pico 2 W, un receptor GPS NEO-8M, tres LED de 3 mm (energía, comunicación y alerta), un buzzer con su transistor y los botones de prueba y reinicio. La placa se alimenta con una fuente de 5 V porque todavía no hay camión donde probarla. La versión para camión (Fase 2) agrega el módem celular SIM7080G, la lectura del bus J1939, la IMU y la alimentación de 12/24 V.

<figure class="figure-card">
  <img src="../recursos/imgs/semana9/pcb-fase1-render.png" alt="Render en KiCad de la PCB de una cara de la Fase 1 de Nervik, con la Pico 2 W al centro, los LED y botones en el borde frontal y el zócalo del GPS">
  <figcaption>PCB de la Fase 1 en KiCad. Pistas en F.Cu, contorno en Edge.Cuts y todas las perforaciones en User.2, sin nada en B.Cu ni en F.Paste. Los puentes son resistencias de 0 Ω.</figcaption>
</figure>

La PCB pasó por tres versiones en esta semana:

1. **Primera versión.** Se rutó con la Pico en huella SMD y con puentes de alambre.
2. **Revisión del profesor.** Pidió quitar las capas B.Cu y F.Paste que quedaban en los agujeros, usar la Pico con sus 40 perforaciones y dibujar todas las perforaciones en User.2.
3. **Versión final.** Con la Pico de agujero pasante, las dos filas de pines forman "paredes" que una resistencia de 0 Ω no puede brincar, y el ruteo salía con 15 puentes. Para bajar a 7, el GPS se movió a GP20/GP21 y el buzzer a GP28, de modo que las señales salen por el mismo lado de la Pico donde están sus componentes. El DRC terminó con **0 errores y 0 pistas sin conectar**, y el ERC con 0 errores.

La carcasa "Cuña Guardián" también se rehizo en SolidWorks para que cierre sin tornillos:

- **Medidas:** 139.5 × 91.5 mm por fuera, con 33 mm de alto al frente y 48 mm atrás. La altura extra deja espacio a la antena del GPS.
- **Cierre:** cuatro pilares en las esquinas encajan con pernos de 3.8 mm de la base, y cuatro dientes a presión se meten en ventanas de los costados.
- **Frente:** los hoyos de los LED (4.6 mm) y de los botones (6 mm) quedan centrados con la posición de cada pieza en la placa.

### Las fronteras del sistema

El sistema tiene cuatro fronteras. Si algo falla, se busca la primera frontera donde el dato ya viene mal, en lugar de revisar todo a la vez.

```
F1  GPS NEO-8M → Pico 2 W              UART a 9600 baud, sentencias NMEA (GGA, GSV, RMC)
                                       ¿La Pico recibe posición y C/N0 confiables?
F2  Pico 2 W → red → servidor           Wi-Fi 2.4 GHz, HTTP con JSON firmado (ECDSA P-256)
                                       ¿El mensaje sale, llega y la firma se acepta?
F3  Servidor → detección e IA           La detección corre en el dispositivo; el servidor solo verifica,
                                       guarda y arma el expediente
                                       ¿El servidor interpreta bien el nivel de alerta?
F4  Servidor → app y landing            API REST → app web instalable (PWA); landing en GitHub Pages
                                       ¿El monitorista ve lo correcto y a tiempo?
```

La decisión de la Semana 5 de procesar en el borde cambia el sentido de F3. La detección no depende de la nube: el dispositivo decide aunque no tenga red, y por eso el requisito F-05 pide que el 100% de las funciones operen sin enlace.

### Fallas encontradas al integrar

Todas las fallas de la semana estuvieron en una frontera o en la placa, no dentro de un componente. Varias se encontraron poniendo registros en el monitor serie, como recomienda la clase.

| Frontera | Síntoma | Causa | Corrección |
|---|---|---|---|
| Placa | La prueba de alerta solo hacía parpadear el LED azul | Por confirmar en banco: LED verde y rojo al revés o soldadura de R1/R3. La autoprueba de arranque ya los enciende | Revisar la polaridad; el diagnóstico (toque corto en PRUEBA) hace destellar los tres LED |
| Placa | Una red de GND quedaba partida en dos islas | El ruteo pasaba por el pad de C2 sin terminar en él y el suavizado de pistas lo esquivaba | Se anclaron los puntos que pasan por pads de su propia red |
| F1 | Sin posición dentro del salón | El NEO-8M necesita cielo; en frío tarda de 1 a 5 min | La antena va junto a una ventana; la demo lo declara |
| F1 | La detección real no arranca si el GPS nunca tuvo posición | La línea base de C/N0 solo se aprende con posición y C/N0 > 25 dB-Hz | Requisito nuevo para la Fase 2: aprender la línea base en los primeros minutos de cada viaje |
| F2 | La Pico no se conecta en la universidad | La Pico W solo usa 2.4 GHz y no soporta WPA2-Enterprise | La laptop comparte su conexión como zona inalámbrica `Nervik-Demo` en 2.4 GHz |
| F2 | El servidor no recibía los mensajes | El firewall de Windows bloqueaba Node.js en la red de la zona inalámbrica | Se permitió Node.js en redes privadas y públicas |
| F4 | La prueba automática de la app se quedaba "cargando" | La app espera el primer reporte del dispositivo y no tiene tiempo límite | Pendiente: mostrar "sin conexión con el dispositivo" a los 30 s |

### Pruebas de sistema y definición de listo

Las seis pruebas van de la más barata a la más cara. Cada criterio sale del PDS de la Semana 5. Cuando el PDS no tenía un número, se marca como propuesto.

| # | Prueba | Qué se mide | Aprobado si | Estado al 27 de noviembre |
|---|---|---|---|---|
| T1 | Instalación sin ayuda | Tiempo de alta con el QR o el código, del paso 1 al 3 de la app | ≤ 10 min sin herramienta (U-01) | Hecha por el equipo; falta con una persona externa |
| T2 | Latencia de punta a punta | De la caída de C/N0 a la alerta en cabina, y de ahí a la app | Detección ≤ 5 s (F-01). Alerta en la app ≤ 15 s (propuesto: un periodo de telemetría de 10 s más el envío) | Probada con la prueba de alerta desde la app; falta registrar los tiempos |
| T3 | Desconexión y recuperación | Cortar la red durante el evento y esperar | Sigue detectando sin red (F-05), no pierde eventos (P-05) y sube la cola al reconectar | El simulacro corta la red 100 s y el expediente llega completo al volver |
| T4 | Energía | Corriente con medidor USB en operación y en reposo | ≤ 2 W en operación (E-02) y ≥ 72 h de respaldo (E-04) | Por medir |
| T5 | Falla de la IA o del servidor | Apagar el servidor durante el evento | La alerta en cabina no depende del servidor | Por diseño la detección es local; falta la prueba |
| T6 | Operación continua | 48 h encendido, con registro serie | Autoprueba ≤ 30 s (R-04), sin reinicios ni datos perdidos | Por hacer en la semana de trabajo B |

**T4 con números.** Antes de medir, la cuenta ya muestra un problema en el PDS:

```
Batería de respaldo del diseño (Semana 8): celda LiFePO4 18650 de 1,500 mAh a 3.2 V
  Energía útil (80%) = 1.5 Ah × 3.2 V × 0.8            = 3.84 Wh

Requisito E-04: 72 h de respaldo
  Si el equipo sigue en operación (E-02, 2 W):  72 h × 2 W     = 144 Wh   →  no cumple (37 veces más)
  Si al perder la alimentación pasa a reposo (E-03, 50 mW):
                                                72 h × 0.05 W  = 3.6 Wh   →  cumple (75 h)
```

La conclusión es que el firmware de la Fase 2 debe pasar a reposo en cuanto detecte que se perdió la alimentación del camión, despertando solo para registrar eventos. Esto queda como requisito nuevo del PDS.

**Definición de listo.** Hoy se cumplen dos de las cuatro condiciones:

- **El dato fluye del sensor a la pantalla sin intervención.** Se cumple.
- **La landing está publicada en internet.** Se cumple: [andrik-09.github.io/Nervik](https://andrik-09.github.io/Nervik/){:target="_blank"}.
- **El hardware funciona sin la laptop.** Se cumple solo a medias: la Pico detecta y alarma sola, pero llega a la app a través de la zona inalámbrica de la laptop.
- **La app está desplegada fuera del entorno de desarrollo.** Pendiente: hoy corre en la laptop con `npm run prototipo`. Publicarla en Render es la primera tarea de la semana de trabajo A.

---

## Bloque 2 — Pruebas con usuarios

En la Semana 8 se probó una idea con un prototipo de baja resolución. Ahora se prueba el **sistema completo** con cinco personas que nunca lo han visto:

- **Tres del segmento:** un monitorista o jefe de seguridad de una flota mediana, un operador de tractocamión y un agente de seguros de transporte.
- **Dos de otro equipo del curso:** son la revisión cruzada entre pares.

### Protocolo de 30 minutos adaptado a Nervik

| Min | Tarea | Qué se observa |
|---|---|---|
| 0–3 | Introducción con guion fijo: "probamos el producto, no a usted; piense en voz alta" | Nada se explica del producto |
| 3–10 | **Tarea 1:** conectar el dispositivo a la fuente y darlo de alta en la app con el código o el QR | ¿Lo logra sin ayuda? Tiempo, errores y en qué paso duda |
| 10–20 | **Tarea 2:** el equipo lanza la prueba de alerta; el usuario explica qué pasó y qué haría | ¿Entiende los niveles, la luz roja y el expediente? ¿Sabe a quién llamar? |
| 20–25 | **Tarea 3:** encontrar el precio en la landing y apartar una unidad del lote piloto | ¿Encuentra el precio? ¿Completa el formulario? |
| 25–30 | Entrevista de cierre | Qué esperaba, qué le costó, cuánto pagaría y a qué otra flota se lo recomendaría |

**Qué se registra por tarea:**
- Si la completó sin ayuda.
- El tiempo que tardó.
- Los errores y cuántas veces dudó.
- El SEQ: qué tan fácil le pareció, de 1 a 7.
- Las citas textuales.

El observador no explica ni defiende el diseño. Si el usuario se atora, anota el minuto y espera 30 segundos antes de intervenir.

Para precio y recomendación cuenta el **compromiso**, no la opinión. Que deje sus datos en el formulario o el contacto de su jefe de flota es evidencia; que diga "me gusta" no lo es.

### Severidad

- **Crítico:** impide completar la tarea y se corrige primero.
- **Mayor:** la tarea se completa con ayuda o con un error recuperable.
- **Menor:** molesta, pero no cambia el resultado.

Por lo que se vio al integrar, ya se pueden anticipar tres hipótesis:

1. El monitorista **no distinguirá** el nivel 2 (red perdida) del nivel 3 (ataque confirmado) si solo ve los colores.
2. El código de alta largo será **un error crítico** si el usuario lo tiene que escribir a mano.
3. El precio de $300 al mes **solo se acepta** si la persona entiende que el expediente le sirve frente a la aseguradora.

Las sesiones se hacen en la semana de trabajo B y sus resultados se sintetizan con el Prompt 2 de la clase.

---

## Bloque 3 — Go-to-market y economía unitaria

### El cliente número 1

El primer cliente no es "el mercado de 46 mil tractocamiones". Es una flota mediana de Puebla, de 20 a 200 unidades, que cumple estas cuatro condiciones:

1. **Le robaron una carga** en los últimos 12 meses en el corredor México–Puebla–Veracruz.
2. **Ya paga rastreo GPS** y sabe que se queda mudo cuando hay un inhibidor.
3. **El dueño o el gerente de operaciones decide** la compra sin pasar por un corporativo.
4. **Pertenece a CANACAR Puebla**, donde su experiencia se comenta con otros transportistas.

La meta de las dos semanas es tener nombre y teléfono de tres flotas así. La primera pista ya existe: la familia de uno de los integrantes del equipo vivió un robo de carga.

### Canales

| Canal | Por qué para Nervik | Qué aprende el equipo | Riesgo |
|---|---|---|---|
| **Venta directa** (primeros 20 clientes) | El comprador es una persona con nombre en cada flota | Objeciones reales, tiempo de instalación, qué valora la aseguradora | Consume las horas del equipo |
| **Brokers de seguros de transporte** | El expediente firmado les sirve para negociar primas | Si la aseguradora reconoce la evidencia (hipótesis H3 de la Semana 7) | El broker se queda con parte del margen |
| **Landing con apartado del lote piloto** | Ya está publicada, con precio y formulario | Si una flota deja sus datos sin hablar con nosotros | Sin video de demostración convierte poco |

En el curso **no se cobra anticipo**. Se mide la intención con el formulario y con el precio visible. El embudo de la landing tiene tres números: visitas, clics en "Apartar unidad" y formularios enviados. Se miden durante las dos semanas de trabajo.

### Economía unitaria con los datos de la Semana 7

Un **cliente** es una flota que equipa 5 unidades en su primera compra. Ningún dato de adquisición está medido todavía; todos son supuestos a validar en el piloto.

| Dato | Valor | Origen |
|---|---|---|
| Precio de suscripción | $300 / mes por unidad | Semana 7, decisión del equipo (C-03) |
| Costo operativo por unidad | $29.96 / mes (nube, IA, SIM y soporte) | Semana 7, modelo de costos |
| Subsidio del hardware | $2,095.37 de costo − $1,800 de precio = **$295.37** por unidad a 100 u | Semanas 7 y 8 |
| Demos por cliente cerrado | 4 | Supuesto: en venta a empresas cierra 1 de cada 4 |
| Horas por demo, traslado incluido | 4 h a $240/h (2 personas × $120/h) | Supuesto; tarifa de la Semana 7 |
| Viáticos, muestras e instalación de prueba | $3,500 por cliente cerrado | Supuesto |
| Churn mensual | 3% | Supuesto conservador para una empresa nueva |

| Concepto | Aritmética | Resultado |
|---|---|---|
| Contribución mensual | ($300 − $29.96) × 5 | **$1,350.20** |
| CAC | 4 demos × 4 h × $240 + $3,500 | **$7,340** |
| Inversión por cliente | $7,340 + $295.37 × 5 | **$8,816.85** |
| Vida media | 1 ÷ 0.03 | **33.3 meses** |
| LTV | $1,350.20 × 33.33 | **$45,006.67** |
| LTV ÷ inversión | $45,006.67 ÷ $8,816.85 | **5.10** |
| Payback | $8,816.85 ÷ $1,350.20 | **6.5 meses** |

!!! success "¿Cumple la regla práctica?"
    Sí, con los supuestos actuales: 5.10 contra la meta de 3 o más, y 6.5 meses de payback contra el tope de 12. Pero si la flota compra **una sola unidad** en vez de cinco, la razón cae a **1.18** y el payback sube a **28 meses**. Vender por flota es indispensable.

**Qué insumo mueve más el resultado** (cada uno se cambia 25% por separado):

| Cambio de 25% | LTV ÷ inversión | Payback |
|---|:---:|:---:|
| Caso base | 5.10 | 6.5 meses |
| Precio sube a $375 | 6.52 | 5.1 meses |
| Precio baja a $225 | 3.69 | 9.0 meses |
| Churn baja a 2.25% | 6.81 | 6.5 meses |
| Churn sube a 3.75% | 4.08 | 6.5 meses |
| CAC baja a $5,505 | 6.45 | 5.2 meses |
| CAC sube a $9,175 | 4.23 | 7.9 meses |

El precio es la palanca que más mueve el resultado: una baja de 25% le quita 28% a la contribución. Le siguen el churn y después el CAC. Las tres palancas concretas son:

1. **Vender por flota.** Con 10 unidades por cliente y el mismo CAC, la razón sube a 8.74 y el payback baja a 3.8 meses.
2. **Contrato anual.** Si baja el churn de 3% a 2%, la razón llega a 7.66.
3. **El hardware de la revisión DFM-B** de la Semana 8, que deja de necesitar subsidio. La razón queda en 6.13 y el payback en 5.4 meses.

Ninguno de estos números está medido. Lo que el piloto tiene que comprobar en el mundo real es justo lo que hace cerrar el modelo: cuántas demos cuesta cerrar una flota y cuántas se quedan después de un año.

### La landing frente a la anatomía de la clase

La landing de la Semana 8 ya está publicada en GitHub Pages, con metadatos para compartirse por WhatsApp. Así se compara con las siete partes que pide la clase:

| Elemento | Estado en [andrik-09.github.io/Nervik](https://andrik-09.github.io/Nervik/){:target="_blank"} |
|---|---|
| Headline con la propuesta de valor | Hecho |
| Visual del producto en uso | Hecho: el dispositivo en 3D, que se puede girar |
| Tres beneficios para el usuario | Hecho |
| Demo de 30 segundos | **Falta:** se graba el video de la prueba de alerta con el prototipo real |
| Evidencia (cita o cifra) | Hay cifras de AMIS y SICT; **falta una cita real** de las pruebas con usuarios |
| Precio visible | Hecho: $1,800 + $300 al mes |
| Un solo CTA | Hecho: "Apartar unidad del lote piloto" |

Al lanzar se harán tres publicaciones:

1. **El problema**, con la historia real de la familia del equipo.
2. **El producto en uso**, con el video de la alarma activándose.
3. **Cómo se construye**, con la PCB fresada, las tres versiones de la carcasa y las fallas de este bloque.

---

## Bloque 4 — Regulación mínima viable

Nervik lleva radios, recolecta la ubicación de vehículos y se instala en el sistema eléctrico de un camión, así que la regulación sí le aplica. La tabla da una ruta de verificación, no un dictamen legal. Cada tema se marca como **VERIFICADO**, cuando se revisó la fuente directa, o **POR VERIFICAR**. Dos marcos cambiaron en 2025, según la página de la Semana 9 del curso: hay una nueva Ley Federal de Protección de Datos Personales en Posesión de los Particulares, vigente desde el 21 de marzo de 2025, y la homologación pasa del IFT a la Comisión Reguladora de Telecomunicaciones (CRT).

| Tema | ¿Aplica a Nervik? | Qué exige | Documento o trámite | Estatus |
|---|---|---|---|---|
| Radio y homologación | Sí: Wi-Fi en la Fase 1; LTE-M/NB-IoT y GNSS en la Fase 2 | El producto final con radio debe estar homologado aunque los módulos ya lo estén (requisito N-01 del PDS) | Certificado de homologación ante la CRT; pruebas en un laboratorio acreditado | POR VERIFICAR: si el SIM7080G y la Pico 2 W tienen homologación vigente en México |
| Datos personales | Sí: ubicación del vehículo y del operador, contactos de la flota | Aviso de privacidad, consentimiento y derechos ARCO | Aviso de privacidad de la app y de la landing | POR VERIFICAR contra el texto vigente en el DOF |
| Seguridad eléctrica | Sí: equipo electrónico conectado a 12/24 V | NOM de seguridad para equipo electrónico y de compatibilidad para uso automotriz | Certificado de un organismo acreditado (ANCE o NYCE) | POR VERIFICAR qué NOM aplica |
| Baterías | Sí, en la Fase 2: celda LiFePO4 de respaldo | Etiquetado y transporte de baterías de litio | Pruebas UN 38.3 del fabricante de la celda | POR VERIFICAR |
| Evidencia digital | Sí: el expediente firmado es la propuesta de valor | Conservación de mensajes de datos (requisito N-03 del PDS: NOM-151) | Sello de tiempo de un prestador de servicios de certificación | POR VERIFICAR el costo por sello |
| Licencias de software | Sí | Que cada dependencia permita el uso comercial | Archivos de licencia de cada repositorio | **VERIFICADO**: ArduinoJson, QRCode, autowp-mcp2515, Express, React y cors son MIT; micro-ecc es BSD de 2 cláusulas; el núcleo arduino-pico es LGPL-2.1, que exige poder reenlazar el firmware y publicar los cambios al núcleo |
| Modelo de IA | Sí: la detección en el dispositivo es propia; la app usa una API de terceros para redactar los expedientes (Semana 7) | Términos comerciales de la API | Términos de uso del proveedor | POR VERIFICAR |
| Términos de venta | Sí | Garantía, devoluciones y contrato de suscripción | Términos de servicio conforme a la Ley Federal de Protección al Consumidor (PROFECO) | POR VERIFICAR |
| Economía circular | Sí: equipo electrónico con batería | Responsabilidad extendida del productor al fin de vida | Plan de recuperación de equipos (Semana 8) | POR VERIFICAR |
| Inhibidores de señal | Solo para la prueba | Nervik **detecta** inhibidores, no los usa; usar uno para probar es ilegal | Por eso la prueba del ataque se simula en software | Criterio del equipo; POR VERIFICAR el artículo exacto |
| Marca | Sí | Registro de "Nervik" en las clases 9 y 42 de Niza (Semana 3) | Solicitud ante el IMPI | POR VERIFICAR el estado en MARCia |

**Durante una prueba de mercado de 5 a 10 unidades** se puede operar con módulos de radio precertificados, siempre que el aviso de privacidad esté publicado y cada flota piloto firme un acuerdo de prueba sin costo. **Antes de vender a un tercero** tienen que estar resueltas la homologación del producto completo, la NOM de seguridad, los términos de venta y el registro de la marca. La separación entre ambas listas es un criterio del equipo y no tiene todavía una fuente oficial que la respalde, así que también queda POR VERIFICAR con un organismo de certificación.

---

## Bloque 5 — Pitch de 3 minutos

El pitch tiene que vender, no demostrar: la demostración tiene sus propios 7 minutos. Cada cifra sale de un documento del semestre, y lo que todavía no tiene evidencia se dice como pendiente.

!!! quote "1. Impacto y problema · 35 s"
    A un familiar de nuestro equipo le robaron la carga mientras manejaba su tractocamión. Así trabajan muchas bandas en México: encienden un inhibidor, el rastreo GPS se queda mudo y la central se entera cuando ya no hay nada que hacer. No es un caso aislado. En un año se robaron más de cuatro mil tractocamiones asegurados, y las pérdidas por robo de carga superan los siete mil millones de pesos.

!!! quote "2. Solución y por qué nosotros · 35 s"
    Nervik se conecta al puerto de diagnóstico del camión y detecta el inhibidor en menos de cinco segundos, dentro del propio equipo, sin depender de internet. Enciende la alerta en cabina y guarda un expediente firmado que nadie puede alterar, y lo entrega a la central en cuanto vuelve la señal. Un GPS normal solo se queda callado; Nervik explica qué pasó. En la demostración lo verán reaccionar en vivo.

!!! quote "3. Mercado y modelo · 35 s"
    En México hay cuarenta y seis mil tractocamiones de flotas medianas que circulan por corredores de riesgo: un mercado de ciento sesenta y seis millones de pesos al año. Vendemos el equipo en mil ochocientos pesos, por debajo de su costo, y lo recuperamos con una suscripción de trescientos pesos al mes. Cada flota de cinco unidades nos deja mil trescientos cincuenta pesos mensuales.

!!! quote "4. Tracción · 35 s"
    Hoy el sistema completo funciona. Nuestro prototipo detecta el ataque, enciende la alarma y la alerta aparece en la app con su expediente. Nuestra página ya está publicada, con precio y un formulario para apartar unidades del lote piloto. Lo que todavía no tenemos es lo más importante: cuántas flotas se registran. Con nuestros supuestos, cada cliente vale cinco veces lo que cuesta conseguirlo, y eso es lo que vamos a medir.

!!! quote "5. Equipo · 15 s"
    Somos tres ingenieros de la Ibero Puebla: Andrik en hardware, firmware y app; Juan Pablo y Mauro en electrónica, mercado y validación con flotas.

!!! quote "6. Ask y cierre · 25 s"
    Buscamos cuatrocientos ochenta mil pesos a cambio del doce por ciento de Nervik. Es lo que necesitamos para fabricar el lote piloto y operar hasta el mes catorce, cuando el flujo de caja se vuelve positivo. Cuando el GPS se calla, Nervik habla.

| Parte | Palabras | Segundos hablados | Presupuesto |
|---|:---:|:---:|:---:|
| 1. Impacto y problema | 71 | 32.8 | 35 s |
| 2. Solución y por qué nosotros | 70 | 32.3 | 35 s |
| 3. Mercado y modelo | 64 | 29.5 | 35 s |
| 4. Tracción | 72 | 33.2 | 35 s |
| 5. Equipo | 24 | 11.1 | 15 s |
| 6. Ask y cierre | 43 | 19.8 | 25 s |
| **Total** | **344** | **158.8 (2:39)** | **180 s** |

Quedan 21 segundos de aire para pausas. Así se ve la regla de "la confesión honesta" y el origen de cada cifra:

- **Cifras con origen:**
  - 4,103 tractocamiones asegurados robados en 12 meses y más de $7,000 millones de pérdidas al año: AMIS, Semana 4.
  - 46,023 tractocamiones y $166 millones al año (SAM): Semana 4.
  - Precio, subsidio y contribución: Semana 7 y Bloque 3.
  - Necesidad de $480,000 y flujo positivo desde el mes 14: Semana 7.
- **La confesión:** todavía no hay flotas registradas.
- **La promesa repetida al cierre:** "Nervik explica qué pasó" se convierte en "Cuando el GPS se calla, Nervik habla".
- **La valuación del ask:** 12% por $480,000 implica $4 millones post-money. Si el jurado negocia, el equipo acordó llegar como máximo al 15%.

**Pendientes, sin evidencia todavía:**
- **Detección en menos de 5 s.** Es el requisito F-01; en banco solo se ha visto en simulacro y falta medirlo con registro.
- **Flotas pre-registradas.** Hoy son cero.
- **La historia del familiar.** Falta confirmar que el robo fue con inhibidor y en qué corredor.

**Las cinco preguntas más difíciles y de dónde sale la respuesta:**

| Pregunta del jurado | Respuesta en |
|---|---|
| ¿Cuánto cuesta fabricarlo y cómo lo saben? | BOM de la Semana 7 y revisión DFM de la Semana 8: $2,095 a 100 u, o $1,789 con DFM-B |
| ¿Por qué no lo hace su proveedor de GPS actual? | Mapa competitivo y Blue Ocean de la Semana 4: el rastreo depende de la red que el inhibidor tumba; nadie entrega evidencia firmada sin conexión |
| ¿Cómo distinguen un inhibidor de un túnel? | PDS F-03: se decide con 3 señales a la vez (cae el C/N0 en todos los satélites, se pierde la red y el camión se detiene con el motor encendido) |
| ¿Cuántos clientes necesitan para no perder dinero? | Semana 7: 123 suscripciones activas cubren la operación |
| ¿Qué necesitan para vender legalmente? | Bloque 4 de esta semana: homologación ante la CRT y la NOM de seguridad son los bloqueantes |

---

## Bloque 6 — Guion de la demostración de 7 minutos

La demo recorre un solo camino: el de un camión en el corredor Puebla–Veracruz, desde que se conecta el equipo hasta que la flota decide comprarlo. Lo opera una persona y lo narra otra.

| Tiempo | Quién | Qué se hace y se dice | Plan B |
|---|---|---|---|
| 0:00 – 0:45 | Narrador | Muestra la cuña en la mano. "Esto va en la cabina de un tractocamión y vigila la señal de los satélites. Les vamos a mostrar el camino completo: conectarlo, el ataque, la recuperación y la compra." | Foto del prototipo |
| 0:45 – 3:15 | Operador | Conecta la fuente de 5 V, que hace las veces del puerto de 9 pines del camión. Las tres luces y el buzzer hacen la autoprueba; en unos 20 s quedan fijos el verde y el azul. En la app proyectada la unidad aparece en línea, con su posición y el C/N0 de cada satélite. Un toque corto en PRUEBA manda el diagnóstico y aparece en la app. | Video de 90 s de este tramo |
| 3:15 – 4:45 | Operador | En la app, **Iniciar prueba**. La señal cae y el LED rojo parpadea lento (nivel 1). Se pierde la red, el azul parpadea y suenan pitidos (nivel 2). Rojo fijo y alarma (nivel 3: ataque confirmado). El narrador declara el atajo en voz alta: "la caída de señal se simula en el firmware, porque usar un inhibidor real es ilegal; todo lo demás es real". | Mantener PRUEBA 3 s en la placa lanza la misma secuencia sin la app |
| 4:45 – 5:45 | Operador | **Fallo manejado.** Durante el ataque el dispositivo no tiene red y la app lo marca sin comunicación, con la hora de su último dato. Al terminar, el equipo se reconecta solo y sube el expediente completo, con cada evento firmado. | Video de la prueba T3 |
| 5:45 – 6:30 | Narrador | Muestra un QR. El jurado abre la landing en su teléfono, ve el precio de $1,800 + $300 al mes y aparta una unidad. | Captura de la landing |
| 6:30 – 7:00 | Narrador | "Hoy funciona la detección, la alarma, la app y la página. Falta el módem celular, la lectura del camión y probarlo con flotas reales. Siguiente paso: el piloto de 10 unidades." | Solo voz |

**Cómo se ensaya.** Son tres ensayos completos con cronómetro, el tercero sin detenerse aunque algo falle. Un día antes se graba el video de respaldo de cada tramo. No se depende del Wi-Fi del salón: la Pico usa la zona inalámbrica de la laptop, y la laptop se configura para no suspenderse ni apagar esa zona por ahorro de energía.

Quince minutos antes se deja todo listo: el firmware congelado (versión de demostración, sin la marca de simulacro), la app abierta con la unidad dada de alta, el GPS junto a una ventana, la landing en una pestaña con el QR impreso y los videos de respaldo en la laptop y en el teléfono.

---

## Bloque 7 — Ruta de cierre

La evaluación dura 15 minutos por equipo: 3 de pitch, 7 de demostración y 5 de retroalimentación. Las dos semanas de trabajo se planean hacia atrás desde ese momento.

| Semana de trabajo | Entregable | Responsable |
|---|---|---|
| **A — construir y conectar** | App publicada en Render, fuera de la laptop | Andrik |
| | Confirmar los LED y la placa; firmware congelado | Andrik |
| | Pruebas T1 a T3 con tiempos registrados | Andrik y Juan Pablo |
| | Checklist regulatorio con fuentes oficiales | Juan Pablo y Mauro |
| | Video de 30 s para la landing y medición del embudo | Mauro |
| | **Punto de control:** el dato fluye del GPS a la app sin intervención y sin la laptop como servidor | Todo el equipo |
| **B — probar, corregir y contar** | Cinco pruebas de usuario, dos cruzadas con otro equipo | Juan Pablo y Mauro |
| | Pruebas T4 a T6 y correcciones críticas | Andrik |
| | Pitch grabado, visto y reescrito | Todo el equipo |
| | Demo ensayada tres veces, con videos de respaldo | Todo el equipo |
| | README, diagrama de arquitectura actualizado y manual de usuario básico | Andrik |
| | **Congelamiento:** desde el último ensayo solo se corrigen fallas críticas | Todo el equipo |

El código vive en el repositorio [Andrik-09/Nervik](https://github.com/Andrik-09/Nervik){:target="_blank"}: firmware, app, servidor y landing, con commits por sesión de trabajo.

---

## Resultados de la semana

| Área | Resultado |
|---|---|
| Integración | Dispositivo, servidor, app y landing conectados; cuatro fronteras identificadas y siete fallas documentadas con su causa |
| PCB | Una cara, capas según la revisión del profesor, Pico con agujeros, 7 puentes de 0 Ω; DRC y ERC sin errores |
| Carcasa | Cierre a presión sin tornillos; hoyos del frente centrados con los LED y botones |
| Pruebas de sistema | T1 a T3 ejecutadas en banco; T4 a T6 planeadas, con un requisito nuevo de reposo tras perder la alimentación |
| Pruebas con usuarios | Protocolo listo para 5 personas; sesiones en la semana de trabajo B |
| Economía unitaria | LTV ÷ inversión de 5.10 y payback de 6.5 meses, con supuestos; vender por flota es indispensable |
| Regulación | Once temas revisados; licencias de software verificadas; homologación y NOM, por verificar |
| Pitch | Guion de 344 palabras (2:39) con tres pendientes marcados; ask de $480,000 por el 12% |
| Demo | Guion de 7 minutos con plan B en cada tramo |

## Conclusión de la semana

Por primera vez Nervik funciona como un sistema y no como tres piezas sueltas. El GPS alimenta la detección en la Pico, la Pico alarma en cabina y firma lo que ve, y la app recibe la alerta y el expediente aunque la red se haya caído a la mitad. Las fallas de la semana confirmaron lo que plantea la clase: ninguna estuvo dentro de un componente, todas estuvieron en una frontera (la red de 5 GHz, el firewall, la posición sin cielo) o en la placa.

El negocio cierra en papel con un margen holgado, pero solo si se vende por flota. Lo que falta no es otro cálculo, sino evidencia: que una persona ajena lo instale sola, que una flota aparte una unidad y que el ataque se detecte en menos de cinco segundos con un registro que lo demuestre. Eso es lo que se va a medir en las dos semanas de trabajo antes de la evaluación.
