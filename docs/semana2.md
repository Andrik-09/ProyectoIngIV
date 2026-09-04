---
hide:
  - navigation
---

# Semana 2 — Búsqueda de Oportunidades (Modo Explorador)

**Andrik Pérez Luna** · Número de cuenta 200851 · Ingeniería Mecatrónica

## Objetivo de la semana

Identificar una oportunidad de producto concreta, arraigada en un problema observable en mercados latinoamericanos, usando IA como acelerador de búsqueda y síntesis, y elegir la oportunidad a desarrollar durante el semestre — antes de escribir una sola línea de código o hacer un solo modelo 3D.

El equipo trabajó en **Modo Explorador**: sin una idea de negocio previa, buscando una oportunidad real desde cero. Se usaron dos IAs con roles deliberadamente distintos y complementarios en cada paso:

| | Perplexity | Claude |
|---|---|---|
| **Fortaleza** | Datos reales, fuentes verificables, cifras de mercado | Síntesis creativa, conexiones no obvias, reencuadre |
| **Debilidad** | Tiende a lo obvio, repite el consenso del mercado | Sin datos propios — necesita contexto |
| **Uso** | Anclar en realidad: ¿el problema existe, qué tan grande es? | Romper el consenso: ¿qué nadie está viendo? |

El reto de fondo: construir un negocio en México con **tres componentes articulados** — una aplicación con IA, un artefacto físico inteligente y una página web de venta — con capacidades de software/IA y de hardware conectado (ESP32, sensores, PCB, manufactura), y **seis meses** para llegar a un MVP comercializable.

## Los 7 pasos del proceso

| # | Paso | IA |
|---|---|---|
| 1 | Búsqueda de oportunidades en LATAM | Perplexity → Claude |
| 2 | Síntesis de insights | Claude → Perplexity |
| 3 | Pain-Gain Map | Sin IA (equipo) |
| 4 | SCAMPER + Remix de ideas | Claude |
| 5 | Validación preliminar de deseabilidad | Perplexity → Claude |
| 6 | Criterios de selección de oportunidad | Sin IA |
| 7 | Elección y defensa de la oportunidad | — |

---

## Paso 1 — Búsqueda de oportunidades en LATAM con IA

### Prompt 1 (Perplexity) → Anclar en realidad

Se pidió identificar 4 oportunidades de negocio no resueltas en el sector de **educación técnica y formación para el trabajo** en México y LATAM, con problema frecuente, evidencia de pago por soluciones imperfectas, y mercado potencial superior a 50,000 personas.

| Oportunidad | Problema concreto | Por qué la solución actual no basta | Mercado LATAM |
|---|---|---|---|
| **1. Bancos de prueba de electrónica** | En laboratorios técnicos (CONALEP, DGETI) hay un osciloscopio por cada 5–6 alumnos; más del 65% no interactúa con señales reales | Los simuladores de software (Proteus, Tinkercad) aíslan al alumno de tolerancias reales, ruido y fallas físicas | >1,200,000 estudiantes |
| **2. Práctica de soldadura y ensamble** | Talleres de soldadura desperdician consumibles por mala técnica repetida; hasta 40% del presupuesto de consumibles se pierde en ejercicios que hay que repetir | Los simuladores de RV industrial (licencias cerradas, hardware propietario) son inaccesibles para el 95% de las escuelas | >450,000 matriculados/año |
| **3. Formación técnica agropecuaria** | Estudiantes y pequeños productores monitorean cultivos con bitácora de papel o medidores analógicos aislados | No hay registro histórico ni advertencias predictivas de plagas o estrés hídrico | >280,000 estudiantes/productores |
| **4. Diagnóstico automotriz técnico** | Técnicos en formación pierden 4–10 horas en diagnósticos erróneos por no interpretar tramas de datos o señales de osciloscopio | Los escáneres OBD-II genéricos solo dan códigos de falla (DTC) sin contexto ni causa raíz | >500,000 talleres/estudiantes |

### Prompt 2 (Claude) → Romper el consenso

**Romper el consenso.** La oportunidad más predecible es la #2 (soldadura): el artefacto descrito ya existe como categoría madura (Soldamatic, VRTEX de Lincoln Electric, LiveArc de Miller), con quince años de ventaja competitiva. El supuesto compartido detrás de las 4 oportunidades — "practicar es caro, hay que sustituir la práctica por simulación" — es falso en México: soldar no es caro, lo caro es que **nadie puede demostrar que sabe soldar**. El dinero real está en la certificación y la responsabilidad civil, no en la enseñanza. El ángulo contraintuitivo: un artefacto que no enseña, **atestigua** — una caja negra que registra cada arco real de la vida laboral del soldador, reconfigurando quién compra (el soldador, no la escuela), qué es la app (una cartera de historial verificable, no un control remoto) y qué es la web (un punto de verificación para contratistas y aseguradoras, no una tienda).

**El problema oculto.** Debajo de las 4 oportunidades hay una misma falla, económica y no pedagógica: *en el trabajo técnico mexicano, quien ejecuta o recomienda es la misma persona que cobra, y no existe ningún tercero que atestigüe el acto físico* — el mecánico diagnostica y vende la refacción, el vendedor de fertilizante recomienda lo que vende, nadie puede verificar una junta soldada sin destruirla. El problema raíz es **asimetría de información sobre actos físicos irreversibles**. El negocio que emerge: instrumentación notarial de trabajo técnico — un núcleo de hardware común con cabezales intercambiables (pinza/OBD para automotriz, módulo de arco para soldadura, sonda para suelo) que vende **evidencia verificable** de que un acto técnico ocurrió, no el instrumento ni el curso.

**El segmento ignorado.** El corredor laboral México–Estados Unidos/Canadá: aspirantes y retornados que no tienen voz digital (no escriben en foros, no aparecen en reportes) pero cuyo saber vale cero al regresar porque no tienen ningún papel que lo demuestre — con disposición a pagar extraordinaria y ya demostrada (gastan en trámites, cursos, gestores) y un mecanismo de pago poco modelado: la remesa. Dos segmentos secundarios igual de mudos: la administradora del taller (quien cobra y decide compras, casi nunca la persona "con las manos sucias" que aparece en los estudios) y el vendedor de herramienta a crédito puerta por puerta, canal de distribución real en México que ningún análisis de mercado convencional captura.

!!! note "Qué se llevó al Paso 2"
    De Perplexity: las oportunidades de **soldadura** y **diagnóstico automotriz**, las de evidencia de mercado más sólida. De Claude: el ángulo no obvio — el problema raíz de "asimetría de información sobre actos físicos irreversibles" y su aplicación al diagnóstico automotriz.

---

## Paso 2 — Síntesis de insights con IA

### Prompt 1 (Claude) → Construir el insight

Se sintetizaron las 4 oportunidades en insights estructurados (quién, qué le cuesta, por qué no está resuelto, dónde está el espacio) y se comparó su viabilidad real:

- **Electrónica**: espacio angosto — el comprador es una institución pública con licitación de 12–18 meses, no cabe en la ventana de seis meses.
- **Soldadura**: espacio grande y limpio, pero el ciclo de venta B2B con contratistas industriales no se cierra en seis meses sin contactos previos.
- **Agropecuario**: la compra ocurre en una ventana estacional al año, la conectividad en parcela es mala, y una sonda de campo confiable es lo más difícil de manufacturar de las cuatro.
- **Diagnóstico automotriz** ✅ *(elegida)*: es la única donde quien tiene el problema, decide la compra y paga son la misma persona, en un solo día — y ya está demostrado que este usuario compra herramienta (hay un mercado activo de escáneres en Mercado Libre y venta en abonos).

**Por qué automotriz.** Los tres componentes son realizables en seis meses: el hardware (ESP32 + CAN + adquisición analógica) es lo que el equipo ya sabe construir, sin sellado de campo ni calibración compleja; la IA no necesita prometer causa raíz desde el día uno (evita depender de un corpus de fallas que no existe todavía) — el MVP vale por capturar, ordenar y presentar evidencia; y el canal de venta (WhatsApp, redes) coincide con donde este usuario ya compra y recomienda.

**Insight ganador.** En México hay decenas de miles de talleres pequeños que arreglan carros con computadora, pero sus herramientas solo les dicen que algo falla, no qué lo está causando. El mecánico termina cambiando piezas para ver si le atina, y cuando se equivoca pierde el costo de la refacción y la confianza del cliente, que se va contando que en ese taller lo robaron. El taller honesto no tiene ninguna forma de demostrar que sí hizo bien su trabajo, así que compite contra el deshonesto por precio y los dos ganan lo mismo.

### Prompt 2 (Perplexity) → Verificar los números

Se verificó cada afirmación del insight con fuentes citables (INEGI/DENUE, Industria Nacional de Autopartes, PROFECO):

| Afirmación | Veredicto |
|---|:---:|
| Segmento (tamaño y perfil) | ✅ Verificada — 261,800+ establecimientos SCIAN 8111 en INEGI/DENUE; parque vehicular de 36M+ unidades, edad promedio 16.2 años |
| Costo del problema | ✅ Verificada — refacciones eléctricas sin garantía ($800–$4,500 MXN); talleres entre los giros con más quejas en PROFECO por cobro indebido |
| Soluciones actuales insuficientes | ✅ Verificada — escáneres genéricos ($3,500–$11,500) y profesionales ($22,000–$48,000) leen códigos DTC pero no aíslan causa raíz |
| Disposición a pagar por el modelo propuesto | ⚠️ Plausible sin dato directo — hay pago activo por hardware, pero la disposición a una suscripción recurrente debe validarse en campo |

**INSIGHT DE OPORTUNIDAD — Diagnóstico Automotriz Confiable**

- **Quién:** dueños y técnicos de micro y pequeños talleres mecánicos independientes en México (261,800+ establecimientos).
- **El problema:** los escáneres actuales dan códigos de falla genéricos, no la causa raíz; el mecánico cambia piezas a prueba y error.
- **Lo que les cuesta:** $800–$4,500 MXN por refacción eléctrica sin garantía, más pérdida recurrente de clientes por reclamos de cobro injustificado.
- **Por qué no está resuelto:** las herramientas dominantes (Autel, Launch) están diseñadas para técnicos especializados, no generan evidencia comprensible para el cliente final.
- **El espacio:** un sistema integrado (dispositivo OBD2 + asistente de diagnóstico guiado + reporte de transparencia por WhatsApp) que convierte la medición técnica en prueba de que el cobro estaba justificado.

---

## Paso 3 — Pain-Gain Map

**Usuario / segmento:** dueños y técnicos de micro y pequeños talleres mecánicos independientes en México que atienden vehículos fuera del periodo de garantía.

**Dolores (Pains)**
: **D1.** Los escáneres actuales entregan códigos de falla genéricos que solo describen síntomas, obligando a diagnosticar y reemplazar componentes a prueba y error.
: **D2.** Pérdidas económicas directas ($800–$4,500 MXN) por refacciones eléctricas que no resuelven la falla y no tienen derecho a devolución.
: **D3.** Tensiones constantes con los clientes y pérdida de clientela recurrente por reclamos de cobros injustificados al no poder demostrar la falla.
: **D4.** Las herramientas actuales exportan diagnósticos crudos y muy técnicos, imposibles de entender para el consumidor promedio.

**Ganancias (Gains)**
: **G1.** Contar con un diagnóstico guiado que indique la causa raíz exacta y evite el reemplazo innecesario de piezas.
: **G2.** Eliminar las fugas de dinero por refacciones eléctricas equivocadas.
: **G3.** Generar confianza inmediata y justificar los cobros con reportes visuales y comprensibles, fáciles de enviar por WhatsApp.
: **G4.** Retener a los clientes recurrentes al transformar el trabajo técnico en una prueba de valor transparente y profesional.

!!! tip "El cruce más poderoso"
    **Dolor más intenso:** la pérdida económica en refacciones sin devolución y la pérdida de clientes por no poder justificar el trabajo con evidencia comprensible.

    **Ganancia más deseada:** transformar la medición técnica en un reporte de transparencia automático que respalde el cobro, genere confianza y evite las reparaciones a prueba y error.

**La oportunidad en una frase:** *Existe una oportunidad para dueños y técnicos de pequeños talleres mecánicos independientes que necesitan justificar sus cobros y generar confianza con evidencia clara, porque hoy sus escáneres solo entregan datos técnicos crudos sin causa raíz y no generan reportes comprensibles para el consumidor.*

---

## Paso 4 — SCAMPER + Remix de ideas

**Dolor ⭐:** gastan dinero y tiempo cambiando piezas a prueba y error, y pierden clientes porque no pueden demostrar que la falla existía.

### Prompt 1 (Claude) → SCAMPER completo (14 ideas)

**S — Sustituir**
: **S1 · Sustituir el diagnóstico por el registro.** Una caja negra instalada 7–15 días en el auto del cliente que graba la falla cuando realmente ocurre (la mayoría son intermitentes y no aparecen en el taller).
: **S2 · Sustituir el reporte por el video.** El entregable no es un PDF con gráficas, sino un clip de 30 segundos donde se ve el instrumento marcando el valor fuera de rango, con el número de serie y la fecha sobreimpresos.

**C — Combinar**
: **C1 · Combinar el diagnóstico con la garantía de la refaccionaria.** El dispositivo registra la firma eléctrica de la pieza al instalarla y al fallar, dando al taller con qué exigir reposición — y al distribuidor un motivo propio para regalar dispositivos.
: **C2 · Combinar el reporte con la venta de autos usados.** El mismo expediente que justifica un cobro sirve para probarle a un comprador que el auto está sano — un "estado de salud verificado" que el taller cobra como certificación, sin refacciones de por medio.

**A — Adaptar**
: **A1 · Adaptar la telemetría de flotillas al taller de barrio** (origen: Geotab, telemática de aseguradoras). El taller coloca dispositivos en los autos de sus 200 mejores clientes y se vuelve el operador de telemetría de su propia cartera.
: **A2 · Adaptar la lógica del laboratorio clínico** (origen: laboratorios de análisis, teleradiología). El taller captura la señal con un dispositivo barato y la envía; la interpretación difícil la resuelve la nube más un técnico senior de guardia.

**M — Modificar al extremo**
: **M1 · Llevar el precio del hardware a cero.** El dispositivo se regala con la suscripción; el negocio deja de ser vender herramienta y pasa a ser vender el flujo de evidencia.
: **M2 · Llevar la interfaz al extremo de un solo botón.** Sin pantalla ni menús — el ayudante de 19 años puede operarlo sin capacitación, resolviendo el cuello de botella del dueño que hoy tiene que hacerlo todo.

**P — Poner en otro uso**
: **P1 · Usar el WhatsApp que el taller ya tiene** como el producto entero: se manda una foto o audio y por ahí mismo se recibe la guía y se arma el reporte con el logo del taller.
: **P2 · Usar el archivo muerto del taller.** Digitalizar años de notas de servicio en papel y convertirlas en historial por VIN — memoria local de qué falla en los autos de esa ciudad.

**E — Eliminar**
: **E1 · Eliminar el diagnóstico automático del MVP.** El producto no promete decir la causa (evita depender de un corpus de fallas que no existirá en seis meses), solo capturar, ordenar y presentar evidencia — y va acumulando el corpus que sí permitirá la inferencia en el año dos.
: **E2 · Eliminar la venta.** El taller no compra nada: recibe el equipo gratis y paga un porcentaje por diagnóstico cobrado, o una cuota semanal — eliminando la única objeción que de verdad detiene la venta en un mercado sin tarjeta de crédito.

**R — Reordenar**
: **R1 · Invertir quién paga.** El dueño del auto paga una mensualidad baja por saber el estado de su carro; el taller cobra comisión por instalación y cada alerta llega con su nombre.
: **R2 · Invertir cuándo ocurre la intervención.** De reparación reactiva a mantenimiento anticipado: el sistema detecta la degradación semanas antes y el taller agenda primero, en vez de reaccionar cuando el cliente ya llegó enojado.

### Prompt 2 (Claude) → Remix de ideas

**Base:** existe una oportunidad para los dueños de talleres que necesitan convertir el diagnóstico en un servicio que puedan cobrar y defender, porque hoy lo regalan por no tener con qué demostrar que hicieron un trabajo.

**Bahía Cero**
: *Ideas cruzadas: M2 (un solo botón) + E1 (sin inferencia) + Estudio de Salud Vehicular.* Un rito de entrada que se aplica a todos los autos que cruzan el portón, no solo a las fallas difíciles: el ayudante junior conecta el dispositivo, oprime un botón, hace un barrido estandarizado de doce minutos, y la app arma sola un Estudio de Salud con semáforos y el logo del taller, cobrado como tarifa fija de recepción.
: **Lo que el cruce genera:** convierte el diagnóstico de evento excepcional en procedimiento de volumen — multiplica los ingresos del taller y genera desde el día uno el corpus etiquetado para la IA de causa raíz del año dos.

**El Aval**
: *Ideas cruzadas: S2 (video como prueba) + fusión con inventario de la refaccionaria.* Invierte quién paga: el cliente es la refaccionaria o el distribuidor de autopartes, que hoy vive atrapado entre devoluciones abusivas y garantías legítimas que rechaza por default. El video con firma eléctrica de la pieza resuelve la disputa sin discusión; el distribuidor regala los dispositivos a su red de talleres y paga suscripción por taller activo.
: **Lo que el cruce genera:** la misma evidencia sirve para cobrarle al dueño del auto y para reclamarle al proveedor — un actor con dinero y flota de vendedores financia la adopción.

**La Cartilla**
: *Ideas cruzadas: S2 (video) + P1 (WhatsApp como producto) + M2 (un solo botón).* El expediente de evidencia se mueve del taller al auto: cada video y medición se acumula bajo el número de serie, como una cartilla de vacunación. El taller captura y manda todo por WhatsApp sin instalar nada; el dueño del auto paga una cuota anual baja por conservar el historial, porque le sube el precio de reventa.
: **Lo que el cruce genera:** cambia quién paga y cuándo — la evidencia vale meses después, en la reventa, con el dueño y el comprador financiando un sistema que el taller usa gratis.

### Prompt 3 (Claude) → Filtro DVN

!!! note "Antes de evaluar"
    El campo "usuario/segmento" original decía "educación técnica", pero los tres conceptos ya están construidos para talleres comerciales — evaluados contra ese segmento real, no el de origen.

| Concepto | 🔴 Deseable | 🟣 Novedoso | 🟢 Viable | Puntaje | Veredicto |
|---|:---:|:---:|:---:|:---:|---|
| **Bahía Cero** | ⚠️ | ⚠️ | ✅ | 1/3 | Refinar antes — validación de campo |
| **El Aval** | ⚠️ | ✅ | ❌ | 1/3 | Descartar como MVP — estrategia de canal para año 2 |
| **La Cartilla** | ❌ | ⚠️ | ❌ | 0/3 | Descartar |

- **Bahía Cero:** el dolor que ataca (regalar horas de bahía) es diario y real, y crea una línea de ingreso nueva. Riesgo: asume que el taller logrará cobrar una tarifa que hoy no cobra. Es viable porque nada del camino crítico depende de un tercero.
- **El Aval:** novedoso (nadie usa firma eléctrica para arbitrar garantías en LATAM), pero el camino crítico es comercial — cerrar un distribuidor de autopartes es una venta B2B de 9–18 meses que no cabe en el plazo.
- **La Cartilla:** el dueño de auto en México no paga cuotas por un historial cuyo valor solo se realiza en una venta hipotética; además es un negocio de red de dos lados sin masa crítica financiable en seis meses.

**Concepto recomendado: Bahía Cero.** Es el único donde quien tiene el dolor, quien usa el producto y quien paga son la misma persona, con decisión en un día — sin depender de un socio corporativo ni de masa crítica de red. Riesgo principal a vigilar: la deseabilidad, no la viabilidad — el supuesto frágil es que el taller pueda trasladar la tarifa al cliente final.

---

## Paso 5 — Validación preliminar de deseabilidad

### Prompt 1 (Perplexity) → Verificar las 5 señales

| Señal | Veredicto | Evidencia |
|---|:---:|---|
| **1. Pago por soluciones imperfectas** | ✅ | Escáneres OBD2 semiprofesionales $3,500–$11,500 MXN y profesionales $22,000–$48,000 MXN ya se compran activamente |
| **2. Comunidades activas** | ✅ | Grupos de Facebook ("Mecánicos Cuauti", "La Caja de Herramientas GRUPO") con posts diarios pidiendo recomendación de escáner; canales de YouTube sobre "dejar de adivinar códigos" |
| **3. Frecuencia del problema** | ✅ | Parque vehicular de 36.1M de unidades, edad promedio 16.2 años, 261,800+ talleres — diagnóstico es operación diaria |
| **4. Costo observable** | ✅ | Refacción perdida ($800–$4,500 MXN), tiempo de bahía no recuperable, talleres entre los giros con más quejas en PROFECO |
| **5. Workarounds en uso** | ✅ | Cobro de diagnóstico por adelantado descontable si se acepta la reparación; solicitud de piezas viejas y fotos antes/después como protección |

**Resumen:** 5 de 5 señales confirmadas ✅. Observación crítica: el riesgo no es la existencia del dolor, sino la capacidad del taller de trasladar la tarifa al cliente final — algunos talleres ya cobran, otros regalan el diagnóstico para atraer la reparación.

### Prompt 2 (Claude) → Diagnóstico y mapa de hipótesis

**Nivel de deseabilidad actual: Medio** — evidencia parcial, zona de riesgo controlable. Un 5 de 5 verifica que el dolor existe, no que la solución específica (Bahía Cero) sea la que resuelva de una forma por la que alguien pague.

**Fortaleza principal:** la Señal 5 — ya existen listas de precio recomendando cobrar $350–$400 MXN por diagnóstico, descontables si el cliente acepta la reparación. El comportamiento que el producto necesita ya existe, aunque sea minoritario.

**Riesgo principal:** "algunos talleres ya cobran, otros lo regalan para atraer el trabajo" — si regalar el diagnóstico le funciona al taller como estrategia comercial, no tiene un problema, tiene un modelo de negocio, y Bahía Cero no le sirve.

**Patrón de las señales:** el dinero que hoy se mueve en este mercado se mueve por **interpretación** (escáneres caros, cursos, comunidades preguntando "qué me está fallando"), no por **presentación**. La decisión E1 (quitar la inferencia) fue correcta para la ejecución, pero eliminó justo la capa por la que el mercado ya demostró que paga.

!!! warning "Riesgo de suicidio creativo"
    **Tipo más probable:** producto sin dolor real — el usuario lo aprobaría en una conversación pero no cambiaría su comportamiento de compra para tenerlo.

    **Nivel de riesgo:** Medio-Alto. Toda la evidencia muestra que el mecánico paga por *encontrar* la falla, ninguna muestra que pague por *comunicarla*.

    **Cómo reducirlo esta semana, sin construir nada:** revisar los grupos de Facebook ya identificados y contar la proporción de posts técnicos ("qué escáner comprar") contra posts sobre problemas con el cliente o cobros injustificados. Esa proporción decide si Bahía Cero ataca el dolor correcto.

**Mapa de hipótesis a probar en entrevistas:**

1. **Sobre el dolor** — el dueño de taller regala 3–8 diagnósticos por semana ($1,000–$3,000 MXN semanales en tiempo no facturado) porque no tiene con qué demostrar que hizo un trabajo. *Cómo probarla: reconstruir la semana pasada del taller y preguntar "el último carro que se fue sin dejarte el trabajo, ¿qué le cobraste? ¿por qué no le cobraste más?"*
2. **Sobre la solución** — preferiría un reporte visual por WhatsApp sobre su método actual (fotos + explicación verbal) porque lo hace ver profesional. *Cómo probarla: mostrar un Estudio de Salud de muestra y observar la reacción de los primeros cinco segundos.*
3. **Sobre el pago** — pagaría $3,000–$6,000 MXN por el dispositivo o $400–$800 MXN mensuales. *Cómo probarla: pedir un anticipo reembolsable real ("¿te aparto una con $500 de anticipo?"), no preguntar cuánto pagaría.*

**Veredicto final:** el concepto está listo para entrevistas, pero no para hardware — el problema existe y este usuario compra herramienta; lo que sigue sin probar es la premisa central de que el taller pagará por *presentar* evidencia en lugar de por *interpretarla*.

---

## Paso 6 — Criterios de selección de oportunidad

Paso sin IA: antes de comprometerse con una oportunidad, el equipo la contrasta contra los criterios que ya arrojó todo el proceso — deseabilidad (¿el dolor es real y frecuente?), novedad (¿hay un ángulo que el mercado no está atacando?) y viabilidad (¿los tres componentes son construibles en seis meses con las capacidades del equipo?). El Filtro DVN del Paso 4 y la validación del Paso 5 ya funcionan como esa base de criterios objetiva.

## Paso 7 — Elección y defensa de la oportunidad

**Oportunidad elegida: Bahía Cero.**

Es la única de las tres direcciones evaluadas (Bahía Cero, El Aval, La Cartilla) donde quien sufre el dolor, quien usa el producto y quien paga son la misma persona, y la decisión de compra se toma en un solo día — sin depender de que un distribuidor firme un acuerdo B2B (El Aval) ni de alcanzar una masa crítica de red (La Cartilla). Es también la única cuyos tres componentes (artefacto de un botón, app que ordena y presenta, canal de venta directo) son íntegramente construibles con las capacidades del equipo dentro de los seis meses, precisamente porque la idea E1 sacó del camino crítico la parte más riesgosa: inferir la causa raíz de la falla.

La deseabilidad del problema está verificada con evidencia real (5 de 5 señales), pero la premisa específica del concepto —que el taller logre trasladar la tarifa del diagnóstico al cliente final, y que pague por *presentar* evidencia y no solo por *interpretarla*— sigue sin probarse. Por eso la oportunidad se elige con una condición explícita: antes de tocar hardware, validar con el experimento de humo que el propio proceso definió (armar 3–4 Estudios de Salud a mano con datos de talleres reales y medir si el mecánico logra cobrarlos).

## Conclusión de la semana

El proceso completo —de 4 oportunidades genéricas en educación técnica a un concepto específico y validado en talleres automotrices— muestra el valor de usar dos IAs con roles distintos en tensión constante: Perplexity ancló cada afirmación en datos reales de INEGI, PROFECO y comunidades activas, mientras Claude empujó a romper el consenso obvio, encontrar el problema raíz compartido entre las cuatro oportunidades, y someter el concepto ganador a una autocrítica que ninguna búsqueda documental hubiera dado sola. El resultado no es una idea que "suena bien": es una oportunidad con evidencia de mercado verificada, un Pain-Gain Map que la sostiene, 14 ideas de SCAMPER exploradas antes de converger, y un mapa explícito de qué hipótesis hay que probar con usuarios reales antes de comprometer el resto del semestre.
