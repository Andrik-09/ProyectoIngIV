---
hide:
  - navigation
---

# Semana 8 — Revisión DFM y prototipo de validación

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

La Semana 7 dejó dos problemas abiertos: el costo de componentes **excede en $104 el requisito C-01** del PDS a 100 unidades, y el módem celular por sí solo pesa casi la mitad del BOM. Esta semana se hizo una **revisión DFM (Diseño para Manufactura)** del concepto "Cuña Guardián" para atacar ambos problemas desde el ensamble y desde la lista de materiales, y en paralelo se construyó un **prototipo de baja resolución** —una página de aterrizaje con un expediente de ejemplo— para poner la propuesta de valor frente a transportistas reales antes de comprometer la inversión en herramental.

Se compararon tres escenarios: **ACTUAL** (el BOM cotizado en la Semana 7), **DFM-A** (mejoras de manufactura y ensamble sin tocar ningún requisito del PDS) y **DFM-B** (DFM-A más un cambio de módem que obliga a renunciar al respaldo 2G del requisito I-04). Todo se calculó en una hoja de cálculo con fórmulas visibles, igual que en la Semana 7.

---

## Bloque 1 — Supuestos de la revisión

| Supuesto | Valor | Fuente / justificación |
|---|---|---|
| Tipo de cambio | 18.65 MXN/USD | Banxico FIX 27-oct-2026 (igual que la Semana 7) |
| Factor de envío e importación | 20% del costo de componentes | Supuesto de la Semana 7 |
| Mano de obra | 120 MXN/h | Supuesto de la Semana 7 |
| Overhead sobre el costo directo | 15% | Método del curso |
| Contingencias sobre el BOM | 25% | Método de la Semana 7 |
| Ensamble y prueba ACTUAL | 25 min/u a 10 u · 15 min/u a 100 u | Semana 7 (15 piezas, con fixture de pogo pins a volumen) |
| Ensamble y prueba DFM | 15 min/u a 10 u · 10 min/u a 100 u | 11 piezas, inserción desde arriba, sin cautín (ver Bloque 4) |
| Límite de componentes del PDS (C-01) | ≤ $650 MXN a 100 u | PDS v1.0, requisito C-01 |

## Bloque 2 — Comparación del BOM por componente

A 100 unidades, en USD por unidad. Los renglones sin cambio conservan el precio cotizado en la Semana 7.

| # | Componente | ACTUAL | DFM-A | DFM-B | Cambio DFM |
|---|---|---:|---:|---:|---|
| 1 | Microcontrolador RP2040 | 0.76 | 0.76 | 0.76 | — |
| 2 | Flash W25Q64JV | 0.38 | 0.38 | 0.38 | — |
| 3 | Cristal y pasivos del MCU | 0.30 | 0.30 | 0.30 | — |
| 4 | Controlador CAN MCP2515 | 1.05 | 1.05 | 1.05 | Se conserva: su modo *listen-only* por registro refuerza el requisito I-02 |
| 5 | Transceptor CAN aislado ISO1042 | 1.60 | 1.60 | 1.60 | Se conserva por el aislamiento de bus de 70 V |
| 6 | IMU LSM6DSOX | 1.66 | 1.66 | 1.66 | — |
| **7** | **Módem celular** | **19.91** | **19.11** | **10.50** | **A:** BG95-M3 comprado a distribuidor autorizado (DigiKey/Avnet) en vez del estimado. **B:** SIMCom SIM7080G (Cat-M/NB-IoT, **sin 2G**), en existencia en LCSC, montable por JLCPCB |
| 8 | Receptor GNSS LC76G | 5.48 | 5.48 | 5.48 | Se conserva: el GNSS no opera al mismo tiempo que el LTE del módem (multiplexado en el tiempo) |
| 9 | Antenas LTE y GNSS | 3.00 | 3.00 | 3.00 | Mismo costo; la antena GNSS pasa a montaje fijo junto al receptor |
| 10 | Etapa de potencia 60 V | 1.60 | 1.60 | 1.60 | — |
| 11 | Batería LiFePO4 18650 | 2.50 | 2.50 | 2.50 | Mismo costo; celda con lengüetas y conector JST en vez de portapilas soldado |
| 12 | Cargador LiFePO4 | 0.30 | 0.30 | 0.30 | — |
| 13 | Interfaz local (3 LED + 2 botones) | 0.40 | 0.40 | 0.40 | Mismo costo; LED alineados bajo un solo peine de guías de luz |
| 14 | Pasivos, conectores y ESD | 1.50 | 1.50 | 1.50 | — |

| Concepto | ACTUAL | DFM-A | DFM-B |
|---|---|---|---|
| Subtotal componentes (USD) | $40.43 (100 u) · $51.61 (10 u) | $39.63 · $46.52 | $31.02 · $37.54 |
| Cable J1939 Y Deutsch 9 pines (USD) | $7.68 · $8.00 | $7.68 · $8.00 | $7.68 · $8.00 |
| SIM IoT 1NCE, 10 años (USD) | $16.00 — no es costo de manufactura, es conectividad prepagada del servicio | $16.00 | $16.00 |
| Envío e importación (MXN) | $179 (100 u) · $222 (10 u) | $176 · $203 | $144 · $170 |
| **BOM total puesto en México (MXN)** | **$1,375 (100 u) · $1,633 (10 u)** | **$1,357 · $1,519** | **$1,165 · $1,318** |

!!! danger "¿Cumple el requisito C-01 (componentes ≤ $650 MXN a 100 u)?"
    **ACTUAL:** no — excede en $104. **DFM-A:** no — excede en $89. **DFM-B:** **sí — sobran $71**. El peso del módem dentro de los componentes baja de **49.2%** (ACTUAL) a **48.2%** (DFM-A) y a **33.8%** (DFM-B): cambiar el módem es la única palanca que realmente mueve el cumplimiento del requisito.

## Bloque 3 — Costo unitario de manufactura

| Concepto | ACTUAL | DFM-A | DFM-B |
|---|---|---|---|
| BOM total puesto en México | $1,375 (100 u) · $1,633 (10 u) | $1,357 · $1,519 | $1,165 · $1,318 |
| PCB 4 capas + ensamble SMT (JLCPCB) | $65 · $170 | $65 · $170 | $65 · $170 |
| Envío de PCBA | $8 · $47 | $8 · $47 | $8 · $47 |
| Carcasa PETG, guías de luz y soporte | $45 · $60 | $45 · $60 | $45 · $60 |
| Ensamble y prueba | $30 · $50 | $20 · $30 | $20 · $30 |
| Costo directo | $1,523 · $1,960 | $1,495 · $1,826 | $1,303 · $1,625 |
| Overhead (15%) | $228 · $294 | $224 · $274 | $195 · $244 |
| Contingencias (25% del BOM) | $344 · $408 | $339 · $380 | $291 · $329 |
| **Costo unitario del hardware** | **$2,095 (100 u) · $2,662 (10 u)** | **$2,059 · $2,479** | **$1,789 · $2,198** |
| Reducción contra ACTUAL | — | $37 (100 u) · $182 (10 u) | $306 (100 u) · $464 (10 u) |
| Reducción porcentual | — | 1.7% · 6.9% | 14.6% · 17.4% |
| **Margen contra el precio de venta de $1,800** | **−$295 · −$862** | **−$259 · −$679** | **+$11 (100 u) · −$398 (10 u)** |

<div class="chart-card">
<svg viewBox="0 0 700 300" role="img" aria-label="Margen por unidad frente al precio de venta de 1800 pesos, comparando ACTUAL, DFM-A y DFM-B a 10 y 100 unidades">
  <line x1="150" y1="270" x2="620" y2="270" stroke="#333"/>
  <line x1="580" y1="12" x2="580" y2="270" stroke="#E3000F" stroke-width="2"/>
  <text x="580" y="9" text-anchor="middle" font-size="11" font-weight="700" fill="#E3000F">precio $1,800</text>
  <g font-size="10" fill="#999" text-anchor="middle">
    <text x="196" y="288">−800</text>
    <text x="292" y="288">−600</text>
    <text x="388" y="288">−400</text>
    <text x="484" y="288">−200</text>
    <text x="580" y="288">0</text>
  </g>
  <g stroke="#333">
    <line x1="196" y1="265" x2="196" y2="272"/>
    <line x1="292" y1="265" x2="292" y2="272"/>
    <line x1="388" y1="265" x2="388" y2="272"/>
    <line x1="484" y1="265" x2="484" y2="272"/>
  </g>
  <g font-size="10.5" fill="#ccc">
    <text x="8" y="44">ACTUAL · 10 u</text>
    <text x="8" y="86">ACTUAL · 100 u</text>
    <text x="8" y="128">DFM-A · 10 u</text>
    <text x="8" y="170">DFM-A · 100 u</text>
    <text x="8" y="212">DFM-B · 10 u</text>
    <text x="8" y="254" font-weight="700" fill="#fff">DFM-B · 100 u</text>
  </g>
  <rect x="166.2" y="26" width="413.8" height="28" rx="3" fill="#E3000F" opacity="0.85"/>
  <rect x="438.4" y="68" width="141.6" height="28" rx="3" fill="#E3000F" opacity="0.85"/>
  <rect x="254.1" y="110" width="325.9" height="28" rx="3" fill="#E3000F" opacity="0.85"/>
  <rect x="455.7" y="152" width="124.3" height="28" rx="3" fill="#E3000F" opacity="0.85"/>
  <rect x="389.0" y="194" width="191.0" height="28" rx="3" fill="#E3000F" opacity="0.85"/>
  <rect x="580" y="236" width="5.3" height="28" rx="2" fill="#fff" stroke="#E3000F" stroke-width="2"/>
  <g font-size="11" fill="#fff" font-weight="700" text-anchor="end">
    <text x="160.2" y="44">−$862</text>
    <text x="432.4" y="86">−$295</text>
    <text x="248.1" y="128">−$679</text>
    <text x="449.7" y="170">−$259</text>
    <text x="383.0" y="212">−$398</text>
  </g>
  <text x="592" y="254" font-size="11" fill="#fff" font-weight="700">+$11</text>
</svg>
<p class="chart-caption">Margen por unidad en pesos mexicanos frente al precio de venta de $1,800 — DFM-B a 100 unidades es el único escenario que cruza a positivo, y por apenas $11 MXN.</p>
</div>

## Bloque 4 — DFA: simplificar el ensamble

El cambio de módem no es la única palanca: la mitad de la reducción de ensamble (de 25 a 10 minutos por unidad a volumen) viene de rediseñar cómo se manipulan las piezas en la estación final, sin tocar la electrónica.

<div class="dfm-compare" markdown="1">
<div class="dfm-stat" markdown="1">
<span class="dfm-value">17</span>
<span class="dfm-sub">piezas de ensamble — ACTUAL</span>
</div>
<span class="dfm-arrow">→</span>
<div class="dfm-stat highlight" markdown="1">
<span class="dfm-value">13</span>
<span class="dfm-sub">piezas de ensamble — DFM</span>
</div>
</div>

<div class="dfm-compare" markdown="1">
<div class="dfm-stat" markdown="1">
<span class="dfm-value">5</span>
<span class="dfm-sub">piezas que exigen cautín u orientación manual — ACTUAL</span>
</div>
<span class="dfm-arrow">→</span>
<div class="dfm-stat highlight" markdown="1">
<span class="dfm-value">1</span>
<span class="dfm-sub">pieza con orientación manual — DFM (antena LTE)</span>
</div>
</div>

| Pieza | ACTUAL | DFM | Principio DFA aplicado |
|---|:---:|:---:|---|
| Base de la cuña (PETG) | 1 | 1 | Pieza de referencia; se apoya en la mesa sin voltear |
| Tapa (PETG) | 1 | 1 | Entra desde arriba; 2 ganchos impresos en el plano XY |
| Tornillos autorroscantes | 2 | 2 | Se conservan para abrir y cambiar la batería (reparabilidad) |
| Guías de luz | 3 | 1 | Peine de 3 guías en una sola pieza: se orienta solo |
| Junta de silicón IP54 | 1 | 1 | Cordón en ranura de la base; no requiere orientación |
| PCBA | 1 | 1 | Sobre rieles, muesca asimétrica: solo entra en una posición |
| Batería 18650 | 1 | 1 | Con lengüetas y conector JST: se conecta sin cautín |
| Portapilas soldado | 1 | 0 | Eliminado por la batería con conector |
| Antena GNSS con cable | 1 | 0 | Antena cerámica fija junto al receptor, montada por JLCPCB |
| Antena LTE flexible | 1 | 1 | Adhesiva en la pared interior, conector U.FL |
| Prensaestopa del cable | 1 | 1 | Se conserva por el requisito de hermeticidad IP54 |
| Cable J1939 (lado del equipo) | 1 | 1 | Conector con seguro y polarizado |
| Cinchos de nailon | 2 | 2 | Los coloca el instalador, no el ensamble |

## Bloque 5 — Decisión

**DFM-A se adopta sin discusión:** no cambia ningún requisito del PDS, reduce el ensamble de 17 a 13 piezas y recorta el costo unitario entre 1.7% y 6.9%. Es manufactura más barata y más simple, gratis en términos de alcance.

**DFM-B es otra categoría de decisión.** Es el único escenario que cumple C-01 y el único con margen positivo a 100 unidades, pero lo logra renunciando al respaldo 2G del requisito I-04 — exactamente el tipo de cobertura que importa en corredores rurales donde la red LTE es débil fuera del evento de interferencia. Y aun así el margen es de **apenas $11 MXN por unidad**: no resuelve el problema de fondo que dejó la Semana 7 (el negocio se paga con la suscripción, no con el hardware).

!!! tip "Lo que se lleva a campo"
    Se adopta DFM-A en el diseño. El cambio de módem (DFM-B) queda condicionado a validar en el prototipo piloto si las flotas realmente operan en tramos sin cobertura 2G de respaldo — esa respuesta, no una hoja de cálculo, es la que debe decidir si vale la pena renunciar a I-04 por $11 MXN de margen.

## Bloque 6 — Prototipo de aterrizaje para validar con usuarios

En paralelo a la revisión de costos, el equipo construyó un prototipo de baja resolución: una página de aterrizaje real, con la propuesta de valor, el modelo de precio y un formulario para apartar una unidad del lote piloto de 10. El objetivo no es vender todavía, sino medir si una flota mediana da el siguiente paso (dejar sus datos de contacto) frente a la propuesta tal como quedaría frente a un cliente.

<iframe
    src="../recursos/presentaciones/semana8-landing-prototipo.html"
    width="100%"
    height="650"
    style="border: 1px solid #444; border-radius: 8px;"
    title="Prototipo de aterrizaje - Semana 8">
</iframe>

¿No se ve bien el reproductor? [Abre el prototipo en una pestaña nueva](recursos/presentaciones/semana8-landing-prototipo.html){:target="_blank"}.

## Bloque 7 — Así se ve un expediente (ejemplo ilustrativo)

Dentro del prototipo, la sección "Así se ve un expediente" se apoya en un documento de una página que muestra, con datos ficticios, lo que el dispositivo entrega después de un evento de interferencia: una cronología con sello de tiempo y una firma que invalida el documento si alguien lo modifica después.

<div class="expediente-card" markdown="1">
<span class="expediente-stamp">Ejemplo ilustrativo · datos ficticios</span>

<div class="expediente-fields" markdown="1">
<div class="canvas-field" markdown="1">
<span class="flabel">Expediente</span>
N-2026-0014
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Flota</span>
Transportes Ejemplo S.A. de C.V.
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Unidad</span>
ECO-14 · Tractocamión Clase 8
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Corredor</span>
Puebla–Oaxaca (federal 135D)
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Carga declarada</span>
Perecederos refrigerados
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Dispositivo</span>
NVK-0003 · firmware 0.4
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Inicio del evento</span>
02:14:07 (hora del centro)
</div>
<div class="canvas-field" markdown="1">
<span class="flabel">Duración</span>
17 min 48 s
</div>
</div>

<p class="canvas-field"><span class="flabel">Clasificación del modelo</span> Inhibidor GNSS + celular (confianza 0.94)</p>

<div class="expediente-chrono" markdown="1">
<div class="expediente-row"><span class="etime">02:13:50</span><span class="etext">Última posición válida — km 92, 82 km/h</span></div>
<div class="expediente-row"><span class="etime">02:14:07</span><span class="etext">Caída simultánea de señal-ruido en 14 satélites</span></div>
<div class="expediente-row"><span class="etime">02:14:20</span><span class="etext">Pérdida de red celular; alerta encendida en cabina</span></div>
<div class="expediente-row"><span class="etime">02:16:41</span><span class="etext">Parada no programada — 0 km/h, motor encendido, freno aplicado</span></div>
<div class="expediente-row"><span class="etime">02:22:03</span><span class="etext">Sacudida lateral — pico de IMU de 1.8 g</span></div>
<div class="expediente-row"><span class="etime">02:31:55</span><span class="etext">Fin de la interferencia — expediente sellado y enviado (02:32:10)</span></div>
</div>

<p class="canvas-field"><span class="flabel">Estado de verificación</span> Firma válida · cadena completa (412 registros) · sello de tiempo del servidor 02:32:11</p>

<div class="expediente-hash">Huella del expediente: 9f3c 61d2 0b7e 44a9 c5f1 8e20 7d33 a71e — cualquier cambio posterior invalida la firma</div>
</div>

**Qué no contiene:** el dispositivo solo escucha el bus J1939, nunca apagó el motor, no envió órdenes al camión y no graba audio ni video — es evidencia, no control.

[Descargar el expediente de ejemplo (PDF)](recursos/archivos/semana8-expediente-ejemplo.pdf){:target="_blank"} · [Descargar la hoja de cálculo completa de la revisión DFM (XLSX)](recursos/archivos/semana8-bom-dfm.xlsx){:target="_blank"}

## Conclusión de la semana

La revisión DFM confirma, desde otro ángulo, lo que ya había encontrado la Semana 7: el hardware de Nervik no deja margen fácil. Simplificar el ensamble (DFM-A) es ganancia pura y ya se adoptó; forzar el cumplimiento de C-01 (DFM-B) solo se logra sacrificando un requisito del PDS, y aun así el margen por unidad es de centavos, no de pesos. La suscripción sigue siendo donde vive el negocio. El prototipo de aterrizaje, por su parte, mueve el proyecto de la hoja de cálculo a algo que un transportista real puede ver y usar: la siguiente evidencia que necesita el equipo no es otro escenario de costos, sino si alguien está dispuesto a apartar una unidad del lote piloto.
