---
hide:
  - navigation
---

# Semana 4 — Mercado, valor y propuesta de valor

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

Pasar de la solución técnica a la oportunidad de mercado: describir con precisión quién es el cliente, cuántos hay, contra quién compite Nervik, en qué atributo se diferencia y cómo se dice en una oración por qué alguien lo compraría. La regla de la semana fue describir al segmento del que **se tiene evidencia**, no al que se quisiera tener.

---

## Bloque 1 — Cierre de la Semana 3

Marca: **Nervik** (respaldo: Custodex). FTO: 🟡 **media**, con zona gris en MX 356554 B. Ajuste: mantener el modo de solo escucha. Síntesis de entrevistas: **pendiente**, porque las entrevistas no se han hecho; por eso el análisis de esta semana se apoya en fuentes públicas.

## Bloque 2 — Perfil de segmento accionable

### Prompt (Claude) → Perfil en cuatro capas

Se pidió a Claude construir el perfil en cuatro capas, marcando cada dato como **VERIFICADO** (fuente real) o **HIPÓTESIS**, y sin rellenar las capas sin evidencia:

| Capa | Dato | Estado |
|---|---|:---:|
| Demográfica | 5,386 permisionarios medianos (31–100 unidades) con 274,275 vehículos; 1,531 grandes con 468,264 (SICT DGAF, mayo 2026) | ✅ Verificado |
| Demográfica | El Estado de México y Puebla concentran la mayor incidencia de robo (AMESIS) | ✅ Verificado |
| Demográfica | Decide el dueño o el gerente de seguridad, de 35 a 55 años, afiliado a CANACAR | ⚠️ Hipótesis |
| Conductual | La póliza exige GPS en caja, monitoreo 24/7 y protocolo (GNP); AIG contempla señuelos y detección de inhibidor | ✅ Verificado |
| Conductual | Se contrata custodia por viaje y se viaja en convoy | ✅ Verificado |
| Conductual | Durante el ataque se depende de que la central lo note; el gerente se entera después | ⚠️ Hipótesis |
| Psicográfica | Transportista de carne de res, asaltado dos veces en la carretera Oaxaca–Puebla, considera la propuesta interesante por seguridad y prefiere pagar una suscripción a perder un cargamento de ≈$500,000 | 🟡 Parcial (una persona) |
| Económica | Pérdidas mayores a $7,000 millones al año; 4,103 tractocamiones asegurados robados en 12 meses (AMIS) | ✅ Verificado |
| Económica | Pagan de $220 a $2,200 al mes en rastreo y de $25,000 a $45,000 por custodia | ✅ Verificado |
| Económica | Pagarían $300 al mes; decide el dueño con visto bueno del broker | ⚠️ Hipótesis |

**Hipótesis críticas:** (1) la frecuencia de pérdidas de señal por flota; (2) que el comprador prefiera evidencia sobre paro de motor; (3) que la aseguradora reconozca la evidencia.

!!! tip "Perfil en una oración"
    Flotas mexicanas de 31 a 100 unidades que mueven carga asegurada por los corredores México–Puebla–Veracruz y México–Querétaro–Bajío, que ya pagan GPS, monitoreo y custodias exigidos por su póliza, y que pierden visibilidad justo cuando un inhibidor bloquea la señal.

## Bloque 4 — TAM / SAM / SOM

### Prompt (búsqueda de fuentes + Claude) → Dimensionamiento con fuentes reales

Se buscaron las cifras oficiales del boletín de mayo 2026 de la Dirección General de Autotransporte Federal (SICT) y se construyó el embudo con lógica explícita.

<div class="funnel" markdown="1">

<div class="funnel-tier tam" markdown="1">
<span class="tier-name">TAM</span>
<span class="tier-detail">249,180 tractocamiones en 6,917 empresas con 31+ unidades · ≈ $897 M MXN/año</span>
</div>

<div class="funnel-tier sam" markdown="1">
<span class="tier-name">SAM</span>
<span class="tier-detail">46,023 tractocamiones de flotas medianas (31–100 u) expuestas a corredores del centro · ≈ $166 M MXN/año</span>
</div>

<div class="funnel-tier som" markdown="1">
<span class="tier-name">SOM</span>
<span class="tier-detail">≈ 410 unidades en 2 años (≈ 20 flotas) · ≈ $1.5 M MXN/año al cierre del año 2</span>
</div>

</div>

| Nivel | Razonamiento | Resultado |
|---|---|---|
| **TAM** | 1,535,710 vehículos de carga → empresas con 31+ unidades (6,917 empresas, 742,539 vehículos) × 33.6% tractocamiones | 249,180 tractocamiones · ≈ $897 M/año |
| **SAM** | Solo flotas medianas (las grandes compran plataformas corporativas) → 92,045 tractocamiones × 50% expuestos a corredores del centro (hipótesis) | 46,023 tractocamiones · ≈ $166 M/año |
| **SOM** | Venta directa en Puebla + CANACAR + 1–2 brokers; 110 unidades el año 1 y 300 el año 2 | ≈ 410 unidades · ≈ $1.5 M/año |

!!! warning "Señal de viabilidad"
    Marginal. Cubre la operación con becas de fundador, pero no cuatro sueldos de mercado; mejora en el año 3.

## Bloque 5 — Análisis competitivo y Blue Ocean

### Prompt (Perplexity + Claude) → Mapa competitivo

Se pidió mapear competidores directos, indirectos y sustitutos con su debilidad específica para el segmento. Una búsqueda adicional encontró que **Motive ya ofrece en México alertas de detección de bloqueo de señal**.

| Tipo | Competidor | Debilidad para este segmento |
|---|---|---|
| Directo | Motive (≈ US$35/vehículo/mes) | Avisa al reconectar; caro; contrato anual; foco en paro de motor |
| Directo | Black GPS ($1,799 + $220–250/mes) | Ciego sin red celular; sin evidencia verificable |
| Directo | MexTracker y rastreadores anti-jammer | Responden cortando el motor; sin expediente para la aseguradora |
| Indirecto | Geotab / Samsara | Generalistas, configuración compleja |
| Indirecto | GPS en caja + central 24/7 | El mismo jammer lo ciega; depende de una persona a distancia |
| Indirecto | Custodia armada ($25,000–45,000 por ruta) | Se paga por viaje; no escala a toda la flota |
| Sustituto | Convoy y restricción de horarios | Tiempo de operación perdido |
| Sustituto | Absorber el riesgo con el seguro | Deducible, prima creciente, cobertura negada |

!!! danger "El más peligroso"
    El GPS en caja con central de monitoreo, porque la póliza ya lo exige; Nervik tiene que convertirse en un control que la aseguradora reconozca.

### Mapa de posicionamiento

<div class="chart-card">
<svg viewBox="0 0 760 420" role="img" aria-label="Mapa de posicionamiento: costo mensual contra capacidad de respuesta">
  <line x1="60" y1="370" x2="740" y2="370" stroke="#444" stroke-width="1.5"/>
  <line x1="60" y1="20" x2="60" y2="370" stroke="#444" stroke-width="1.5"/>
  <text x="400" y="405" text-anchor="middle" font-size="12" fill="#ccc">Costo mensual equivalente por tractocamión → más caro</text>
  <text x="22" y="195" text-anchor="middle" font-size="12" fill="#ccc" transform="rotate(-90 22 195)">Capacidad de respuesta y evidencia durante un jammer → mayor</text>
  <rect x="155" y="48" width="211" height="95" fill="none" stroke="#E3000F" stroke-width="1.5" stroke-dasharray="5,4" rx="4"/>
  <text x="260" y="70" text-anchor="middle" font-size="12" fill="#ff3b3b" font-weight="700">hueco de Nervik</text>
  <text x="260" y="130" text-anchor="middle" font-size="10" fill="#ff3b3b">alta capacidad, costo medio, sin red</text>
  <circle cx="162" cy="335" r="6" fill="#9a9a9a"/>
  <text x="172" y="338" font-size="11" fill="#ccc">Viajar en convoy (sustituto)</text>
  <circle cx="142" cy="282" r="6" fill="#9a9a9a"/>
  <text x="152" y="285" font-size="11" fill="#ccc">GPS convencional ($220–250/mes)</text>
  <circle cx="250" cy="212" r="6" fill="#9a9a9a"/>
  <text x="260" y="215" font-size="11" fill="#ccc">Rastreador anti-jammer con paro (MexTracker)</text>
  <circle cx="346" cy="202" r="6" fill="#9a9a9a"/>
  <text x="356" y="205" font-size="11" fill="#ccc">GPS en caja + central 24/7</text>
  <circle cx="386" cy="237" r="6" fill="#9a9a9a"/>
  <text x="396" y="240" font-size="11" fill="#ccc">Geotab / Samsara</text>
  <circle cx="454" cy="125" r="6" fill="#9a9a9a"/>
  <text x="464" y="128" font-size="11" fill="#ccc">Motive</text>
  <circle cx="658" cy="62" r="6" fill="#9a9a9a"/>
  <text x="730" y="48" text-anchor="end" font-size="11" fill="#ccc">Custodia armada ($25–45 mil/ruta)</text>
  <text x="250" y="101" text-anchor="middle" font-size="18" fill="#ff3b3b" font-weight="700">✕ NERVIK</text>
</svg>
<p class="chart-caption">Posicionamiento cualitativo: Nervik busca el hueco de alta capacidad de respuesta sin depender de la red, a un costo medio.</p>
</div>

### Prompt (Claude) → Lienzo estratégico Blue Ocean

Primero se aplicó el marco de las cuatro acciones y luego se construyó el lienzo:

- **Eliminar:** el paro de motor y el video con IA.
- **Reducir:** las funciones de gestión de flota y el precio mensual.
- **Incrementar:** la detección local de interferencia y la alerta en cabina sin conexión.
- **Crear:** el expediente de evento con evidencia firmada para la aseguradora.

<div class="chart-card">
<svg viewBox="0 0 785 400" role="img" aria-label="Lienzo estratégico Blue Ocean">
  <line x1="60" y1="320" x2="725" y2="320" stroke="#444"/>
  <line x1="60" y1="264" x2="725" y2="264" stroke="#333"/>
  <line x1="60" y1="208" x2="725" y2="208" stroke="#333"/>
  <line x1="60" y1="152" x2="725" y2="152" stroke="#333"/>
  <line x1="60" y1="96"  x2="725" y2="96"  stroke="#333"/>
  <line x1="60" y1="40"  x2="725" y2="40"  stroke="#333"/>
  <line x1="60" y1="40" x2="60" y2="320" stroke="#444"/>
  <text x="48" y="324" text-anchor="end" font-size="11" fill="#ccc">0</text>
  <text x="48" y="212" text-anchor="end" font-size="11" fill="#ccc">2.5</text>
  <text x="48" y="44" text-anchor="end" font-size="11" fill="#ccc">5</text>
  <text x="20" y="180" font-size="11" fill="#ccc" transform="rotate(-90 20 180)">Nivel ofrecido</text>
  <polyline points="60,152 155,40 250,40 345,96 440,152 535,264 630,320 725,152" fill="none" stroke="#9a9a9a" stroke-width="2" stroke-dasharray="6,3"/>
  <polyline points="60,208 155,264 250,264 345,96 440,208 535,208 630,320 725,208" fill="none" stroke="#6b6b6b" stroke-width="2" stroke-dasharray="2,3"/>
  <polyline points="60,40 155,264 250,264 345,264 440,264 535,152 630,320 725,40" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="8,3,2,3"/>
  <polyline points="60,208 155,264 250,320 345,320 440,40 535,96 630,40 725,40" fill="none" stroke="#E3000F" stroke-width="3.5"/>
  <g fill="#E3000F">
    <circle cx="60" cy="208" r="4"/><circle cx="155" cy="264" r="4"/><circle cx="250" cy="320" r="4"/><circle cx="345" cy="320" r="4"/>
    <circle cx="440" cy="40" r="4"/><circle cx="535" cy="96" r="4"/><circle cx="630" cy="40" r="4"/><circle cx="725" cy="40" r="4"/>
  </g>
  <g font-size="9.5" fill="#ccc" text-anchor="middle">
    <text x="60" y="336">Precio</text><text x="60" y="347">mensual</text>
    <text x="155" y="336">Gestión</text><text x="155" y="347">de flota</text>
    <text x="250" y="336">Video</text><text x="250" y="347">con IA</text>
    <text x="345" y="336">Paro de</text><text x="345" y="347">motor</text>
    <text x="440" y="336">Detec. local</text><text x="440" y="347">de jammer</text>
    <text x="535" y="336">Alerta en cabina</text><text x="535" y="347">sin conexión</text>
    <text x="630" y="336">Evidencia</text><text x="630" y="347">para aseguradora</text>
    <text x="725" y="336">Instalación sin</text><text x="725" y="347">cortar cables</text>
  </g>
</svg>
<div class="chart-legend">
  <span><span class="swatch" style="background:#9a9a9a"></span>Motive</span>
  <span><span class="swatch" style="background:#6b6b6b"></span>GPS convencional</span>
  <span><span class="swatch" style="background:#ffffff"></span>Custodia armada</span>
  <span><span class="swatch" style="background:#E3000F"></span>Nervik</span>
</div>
</div>

!!! tip "Océano azul en una oración"
    La capa de evidencia que funciona justo cuando todas las demás se quedan ciegas, a un costo que una flota mediana puede pagar.

!!! danger "Advertencia de océano rojo"
    Motive ya compite en detección local. **Pregunta clave:** ¿la aseguradora reconoce la evidencia?

## Bloque 6 — Propuesta de valor

### Prompt (Claude) → Bain + IDEO + tres versiones

- **Pirámide de Bain:** nivel **funcional** (reduce riesgo y costo; da información), con oportunidad de subir a **emocional** (reduce la ansiedad del gerente).
- **IDEO:** Insightful ✅ · Unique ⚠️ · Targeted ✅.

| Versión | Texto (máximo 25 palabras) |
|---|---|
| 1 · Funcional | «Cuando un jammer deja al tractocamión sin señal, Nervik sigue detectando, alertando en cabina y registrando la evidencia, sin depender de la nube.» |
| 2 · Emocional | «Gerente de seguridad: deja de enterarte del robo horas después; aun sin señal, cada unidad de tu flota te dirá qué pasó y dónde.» |
| **3 · La más fuerte** | **«Flotas medianas en corredores de riesgo saben qué pasó durante un jammer, con evidencia firmada para negociar con su aseguradora en lugar de pagar custodia.»** |

**Oferta frente a propuesta:** la oferta es «dispositivo J1939 + GNSS + IMU + LTE-M con TinyML y bitácora firmada»; la propuesta es la Versión 3. **Error de la primera versión:** describía la tecnología («Edge AI en microsegundos») y prometía el bloqueo del motor.

### Prueba de la propuesta en voz alta

Como tarea de la semana, la Versión 3 se leyó en voz alta a una persona ajena al equipo: un transportista que mueve cargamento de carne de res y que ha sido asaltado **dos veces en la carretera Oaxaca–Puebla**. Su respuesta fue que la propuesta está bien y le parece interesante **por seguridad**, y que **prefiere pagar una suscripción a que le roben un cargamento de alrededor de medio millón de pesos**.

Lo que aporta este resultado:

- La propuesta se entendió sin explicar la tecnología: el oyente identificó de inmediato el problema (el asalto en carretera) y el beneficio (seguridad).
- Es la primera evidencia directa del segmento sobre **disposición a pagar por suscripción**, y la pérdida que menciona (≈ $500,000 por cargamento) es del mismo orden que la pérdida media por evento estimada con datos de AMESIS ($466,667).
- Amplía el corredor de interés: además de México–Puebla–Veracruz y el Bajío, aparece **Oaxaca–Puebla**, y un tipo de carga (perecederos de alto valor) que no estaba en el perfil.
- Es una sola persona y no una entrevista con el protocolo completo, por lo que la capa psicográfica pasa de «sin evidencia» a «parcial»; las hipótesis H1 (frecuencia y monto a pagar) y H3 (aseguradora) siguen por confirmar en las entrevistas.

## Bloque 7 — Canvas de mercado

El canvas de una página (segmento, tamaño de mercado, mapa competitivo, lienzo y propuesta) está en el documento de entrega de la semana.

## Conclusión de la semana

El mercado existe y es medible con fuentes oficiales, pero el análisis cambió el centro de gravedad del proyecto: el competidor más difícil no es un producto sino un hábito exigido por la póliza, y el atributo que realmente diferencia a Nervik (la evidencia firmada) solo tiene valor si la aseguradora lo acepta. La propuesta de valor dejó de hablar del aparato y pasó a hablar de lo que gana el gerente. La agenda para la siguiente etapa quedó clara: diseñar con las restricciones del PDS y, en paralelo, conseguir la conversación con una aseguradora.
