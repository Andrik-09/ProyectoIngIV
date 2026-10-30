---
hide:
  - navigation
---

# Semana 5 — Diseño de producto: PDS y arquitectura del sistema

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

Convertir la propuesta de valor en una **especificación verificable** (Product Design Specification, PDS) y en una **arquitectura de sistema**: qué debe cumplir Nervik en números que otra persona pueda comprobar sin preguntarle al equipo, dónde corre la IA, qué módulos tiene el dispositivo y cómo se comunican. Sin el PDS no se puede costear (Semana 7) ni diseñar la forma (Semana 6).

---

## Paso 1 — Esqueleto del PDS

En el taller se escribieron las primeras restricciones de diseño, que después se usaron como insumo en la Semana 6:

- **Ambiente:** IP54 o superior; operación aproximada de −10 °C a 60 °C; vibración de vehículo de carga.
- **Costo de prototipo:** máximo $2,500 MXN por unidad, incluyendo carcasa, PCB, microcontrolador, sensores, módulo GNSS y comunicación, conectores y montaje.
- **Instalación:** *plug-and-play* en cabina, con montaje removible y sin perforar.
- **Dimensiones:** objetivo máximo de 150 × 100 × 50 mm.

!!! warning "Hueco detectado al revisar el avance"
    Había arquitectura descrita en prosa, pero **no existía un PDS con métricas verificables**. Sin valores (voltaje de entrada, consumo, tiempo de detección, autonomía, temperatura, grado IP, dimensiones, costo y vida útil) la Semana 7 no tenía contra qué costear.

## Paso 2 — Decisión de arquitectura de IA: edge

El equipo decidió que el modelo de detección corra **en el dispositivo (edge)**, no en la nube:

1. **El problema ocurre sin conexión.** Un modelo en la nube deja de existir justo cuando el jammer corta la red; es la razón de ser del producto.
2. **Latencia.** La clasificación debe ocurrir en segundos (requisito F-01 ≤ 5 s) para registrar el evento desde su inicio.
3. **Costo.** Un modelo TinyML no tiene costo por inferencia; la nube solo se usa para redactar expedientes cuando hay conexión (en la Semana 7 se confirmó: $0.29 MXN por unidad al mes).

## Paso 3 — Diagrama de bloques

### Prompt 1 (Claude) → Arquitectura del sistema

Se dieron a Claude el nombre del concepto, su descripción, la propuesta de valor, los requerimientos técnicos clave y la decisión de IA, y se le pidió el diagrama de bloques con módulos, interfaces y protocolos.

!!! warning "Corrección técnica importante"
    Los documentos previos decían "puerto OBD-II". El tractocamión de carga pesada usa **SAE J1939 sobre conector Deutsch de 9 pines**, así que el PDS lo adopta como interfaz principal.

<div class="arch-diagram" markdown="1">

<div class="arch-row" markdown="1">
<div class="arch-card in" markdown="1"><span class="arch-title">Bus del vehículo</span><span class="arch-items">SAE J1939 / CAN 2.0B<br>Deutsch 9 pines · 250 kbit/s</span></div>
<div class="arch-card in" markdown="1"><span class="arch-title">Alimentación</span><span class="arch-items">12/24 V nominal, 9–36 V DC<br>desde el vehículo</span></div>
<div class="arch-card in" markdown="1"><span class="arch-title">Entorno RF</span><span class="arch-items">Señal GNSS · portadora celular<br>interferencia (jammer)</span></div>
</div>

<div class="arch-flow-label">↓ CAN · V+ · RF ↓</div>

<div class="arch-row" markdown="1">
<div class="arch-card sense" markdown="1"><span class="arch-title">M1 · Interfaz vehicular</span><span class="arch-items">Transceptor CAN aislado · modo listen-only<br>Protección ISO 7637-2 · sin actuador de motor</span></div>
<div class="arch-card power" markdown="1"><span class="arch-title">M2 · Gestión de energía</span><span class="arch-items">DC-DC 9–36 V · protección de polaridad<br>LiFePO₄ · respaldo ≥ 72 h · reposo &lt; 50 mW</span></div>
<div class="arch-card sense" markdown="1"><span class="arch-title">M3 · Sensado</span><span class="arch-items">GNSS multiconstelación · IMU 6 ejes ±16 g<br>Monitor RF (RSSI, C/N₀) · sensor de manipulación</span></div>
</div>

<div class="arch-flow-label">↓ PGN · 3V3 · SPI/I²C/UART ↓</div>

<div class="arch-row" markdown="1">
<div class="arch-card proc" markdown="1"><span class="arch-title">M4 · Núcleo de procesamiento</span><span class="arch-items">MCU ARM Cortex-M ≥ 133 MHz · ≥ 264 kB RAM<br>TinyML ≤ 256 kB · inferencia ≤ 100 ms · máquina de estados</span></div>
<div class="arch-card proc" markdown="1"><span class="arch-title">M5 · Registro local</span><span class="arch-items">Flash ≥ 8 MB · bitácora ≥ 30 días<br>Eventos firmados HMAC · sincroniza al reconectar</span></div>
<div class="arch-card proc" markdown="1"><span class="arch-title">M6 · Interfaz local</span><span class="arch-items">3 LED: energía / enlace / alerta<br>2 botones: reinicio y prueba</span></div>
</div>

<div class="arch-flow-label">↓ eventos / comandos ↓</div>

<div class="arch-row" markdown="1">
<div class="arch-card comm" markdown="1" style="grid-column: span 3;"><span class="arch-title">M7 · Comunicación</span><span class="arch-items">LTE Cat-M1 / NB-IoT con respaldo 2G · cola y reintento · módulo homologado por el IFT</span></div>
</div>

<div class="arch-flow-label">↓</div>

<div class="arch-row" markdown="1">
<div class="arch-card out" markdown="1"><span class="arch-title">App centro de control</span><span class="arch-items">Mapa y alertas · bitácora del viaje<br>protocolo de reacción</span></div>
<div class="arch-card out" markdown="1"><span class="arch-title">Nube / API</span><span class="arch-items">Expediente de evento · reporte de riesgo<br>exportación a aseguradora</span></div>
<div class="arch-card out" markdown="1"><span class="arch-title">Portal web B2B</span><span class="arch-items">Alta de pilotos · gestión de flota</span></div>
</div>

</div>

<p class="chart-caption">Dispositivo Nervik — frontera física: carcasa Variante B, PETG, IP54. Módulos M1–M7 dentro de la carcasa; de M7 salen los eventos hacia app, nube y portal web.</p>

| Módulo | Función | Elementos |
|---|---|---|
| M1 · Interfaz vehicular | Adquirir telemetría | Transceptor CAN aislado, modo listen-only, protección ISO 7637-2, **sin actuador de motor** |
| M2 · Energía | Alimentar y sostener ante corte | DC-DC de 9 a 36 V, protección de polaridad, batería LiFePO₄ ≥ 72 h, reposo < 50 mW |
| M3 · Sensado | Observar el entorno físico y de radio | GNSS multiconstelación, IMU de 6 ejes ±16 g, monitor RF (RSSI y C/N₀), sensor de manipulación |
| M4 · Procesamiento | Decidir localmente | MCU ARM Cortex-M ≥ 133 MHz y ≥ 264 kB de RAM, firmware en C con interrupciones GPIO, TinyML ≤ 256 kB, inferencia ≤ 100 ms |
| M5 · Registro local | Conservar evidencia | Flash ≥ 8 MB, bitácora de ≥ 30 días, eventos firmados con HMAC |
| M6 · Interfaz local | Informar al instalador | 3 LED y 2 botones |
| M7 · Comunicación | Enlazar cuando se pueda | LTE Cat-M1/NB-IoT con respaldo 2G, cola y reintento, módulo homologado por el IFT |

Interfaces clave: J1939/CAN 2.0B a 250 kbit/s por conector Deutsch de 9 pines (IF-1); SPI, I²C y UART hacia el núcleo (IF-2 a IF-6); MQTT o HTTPS sobre TLS hacia la nube, con autenticación mutua (IF-8).

## Paso 4 — PDS completo

### Prompt 2 (Claude) → Validar y completar el PDS

Se pidió a Claude un diagnóstico de lo que faltaba y que completara el PDS con valores objetivo defendibles. El resultado fue el **PDS v1.0**, de 14 páginas: 56 requisitos en 10 categorías, cada uno con métrica, valor objetivo, prioridad (O = obligatorio, D = deseable) y método de verificación.

| Categoría | Ejemplos de requisitos |
|---|---|
| Desempeño (F) | Detección ≤ 5 s (F-01); ≤ 1 falso positivo por cada 1,000 km (F-02); decisión con ≥ 3 señales (F-03); 100% de funciones sin enlace (F-05) |
| Interfaces (I) | J1939 por Deutsch de 9 pines (I-01); **cero tramas transmitidas al bus** (I-02); LTE-M/NB-IoT + 2G (I-04) |
| Energía (E) | 9 a 36 V (E-01); ≤ 2 W en operación (E-02); ≤ 50 mW en reposo (E-03); ≥ 72 h de respaldo (E-04) |
| Procesamiento (P) | Cortex-M ≥ 133 MHz (P-01); modelo ≤ 256 kB (P-02); HMAC-SHA256 por evento (P-04); registro imposible de borrar (P-05) |
| Físico (M) | 90 × 60 × 25 mm (M-01); ≤ 150 g (M-02); cuña Variante B (M-03); IP54 (M-05) |
| Ambiente (A) | −10 a +70 °C de operación (A-01) |
| Fiabilidad (R) | 5 años de vida (R-01); autoprueba ≤ 30 s (R-04) |
| Normatividad (N) | Módem homologado por el IFT (N-01); NOM-151 (N-03); protección de datos personales (N-04); falla segura (N-06) |
| Costo (C) | BOM ≤ $650 a 100 unidades (C-01); precio de $1,800 + $300 al mes (C-03) |
| Instalación (U) | ≤ 10 min sin herramienta especializada (U-01); sin cortar cables (U-02) |

El PDS incluye además una **máquina de estados de alerta** de cuatro niveles (N0 normal, N1 observación, N2 sospecha, N3 evento confirmado), en la que **ningún nivel actúa sobre el vehículo**, y una matriz de trazabilidad necesidad → requisito → módulo → prueba.

!!! note "Tres observaciones que dejó la revisión"
    - El modo **listen-only (I-02)** queda como requisito obligatorio: es la justificación formal de por qué se eliminó el actuador, como decisión de diseño que retira un riesgo.
    - **F-02 (falsos positivos)** es el único requisito obligatorio que no se puede verificar en banco; exige kilómetros de ruta reales, así que conviene empezar a recolectar datos ya.
    - Los valores son objetivos, no mediciones; C-01 y E-03 son los más apretados.

## Paso 5 — Investigación de componentes y BOM preliminar

### Prompt (Perplexity) → Componentes, precios y tiempos de entrega

Se pidió desglosar el costo de un MVP de 10 unidades con componentes, proveedores mexicanos e internacionales y precios. El BOM preliminar se basó en un ESP32-S3, CAN MCP2515 + TJA1050, módulo RF, LoRa, SIM800L, flash, RTC y PCB de JLCPCB:

| Concepto | Resultado |
|---|---|
| BOM electrónico con GSM | $1,810 por unidad |
| BOM ajustado sin GSM | $1,531 por unidad |
| Carcasa y manufactura (10 u) | $1,170 por unidad |
| Desarrollo embebido e IA (estimado por horas) | $375,000 |
| App y plataforma web (6 meses) | $185,900 |

!!! danger "Hallazgo para la Semana 7"
    El BOM preliminar no coincide con el PDS (usa ESP32-S3 y LoRa, mientras que el PDS pide Cortex-M y LTE-M). En la Semana 7 se recotizó todo con la arquitectura del PDS.

## Conclusión de la semana

El PDS transformó una idea defendible en un contrato de diseño: cada decisión posterior (forma, componentes, precio) se justifica contra un requisito numerado. Tres decisiones definen el producto: la IA en el borde, el modo de solo escucha y J1939 en lugar de OBD-II. El mayor riesgo técnico no está en el hardware sino en los datos: sin kilómetros reales no hay forma de demostrar F-02.
