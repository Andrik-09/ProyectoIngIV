---
hide:
  - navigation
---

# Semana 3 — Propiedad intelectual, marca y vigilancia tecnológica

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

Con la oportunidad elegida, la Semana 3 responde tres preguntas antes de invertir en diseño: qué se puede proteger del proyecto, cómo se va a llamar sin chocar con otra marca, y si alguien ya patentó el mecanismo (libertad de operación, FTO). También prepara las entrevistas con usuarios reales que validarán las hipótesis de la Semana 2.

---

## Paso 2 — Panorama de propiedad intelectual

Se revisaron los cinco instrumentos de la Ley de la Propiedad Industrial: marca, patente, modelo de utilidad, diseño industrial y derechos de autor, más el secreto industrial.

- **Marca (prioridad 1):** es lo más barato y lo más doloroso de perder; se registrará **Nervik** en las clases de Niza 9 (aparatos y software) y 42 (servicios tecnológicos).
- **Secreto industrial:** el modelo TinyML, sus umbrales y el conjunto de datos de rutas no se publicarán; se firmará un acuerdo de confidencialidad.
- **Derechos de autor:** protegen el firmware y la app desde que se escriben.
- **Modelo de utilidad o diseño industrial:** se evaluarán con prototipo funcional; la patente de invención no se busca porque la detección de jammers en rastreadores tiene antecedentes desde 2009.
- **Licencias de software:** TensorFlow Lite Micro (Apache 2.0), SDK del RP2040 (BSD-3) y FreeRTOS (MIT) se pueden usar comercialmente; se evitará cualquier biblioteca GPL en el firmware.

## Paso 3 — Nombre de marca

### Prompt 1 (Claude) → Generación de 12 nombres

Se eligió Claude por su riqueza léxica para inventar palabras. Se le pidió generar 12 nombres de marca (3 evocadores, 3 compuestos, 3 inventados y 3 disruptivos), pronunciables en español e inglés, de 2 a 3 sílabas y sin términos genéricos, que transmitieran certeza, resiliencia y anticipación. Se corrieron **cuatro rondas** (48 nombres), porque los primeros candidatos ya estaban ocupados; el equipo probó cerca de 30. De la cuarta ronda salieron los finalistas: **Nervik** (de «nervio», reflejo instantáneo, + «-vik»), **Custodex** y **Wolfen**.

### Prompt 2 (Gemini) → Evaluación de los 3 finalistas

Se eligió Gemini por ser metódico para aplicar filtros estrictos:

| Nombre | Pronunciación ES/EN | Brevedad | Registrabilidad IMPI | Coherencia emocional |
|---|:---:|:---:|:---:|:---:|
| **Nervik** | ✅ casi idéntica | ✅ dos sílabas | ✅ término de fantasía | ⚠️ podría leerse "nervioso" |
| Custodex | ✅ | ⚠️ tres sílabas, se acorta a "Custo" | ❌ deriva de "custodia" | ⚠️ suena a empresa de guardias |
| Wolfen | ❌ la "W" genera dudas en México | ✅ | ⚠️ "Wolf" está saturado | ✅ |

### Prompt 3 (Perplexity) → Verificación digital

Se eligió Perplexity por ser la única con búsqueda en tiempo real. Resultado para Nervik:

!!! tip "🟢 Camino relativamente despejado"
    No hay una empresa activa de logística, seguridad, IoT o IA con ese nombre; solo aparecieron una sociedad inglesa disuelta en 2011, un vehículo de inversión noruego, el apellido Nervik y una cuenta de Medium sobre NFT, todos de riesgo bajo. La herramienta aclaró que esto no sustituye la búsqueda formal en el IMPI.

**Decisión:** la marca es **Nervik**; **Custodex** queda como segundo candidato evaluado.

!!! warning "Nota del proceso"
    El documento de PI conservaba un texto de prompt anterior con los finalistas Centinela, Lince y Blindex. Las evaluaciones que realmente se ejecutaron fueron con Nervik, Custodex y Wolfen.

## Paso 4 — Búsqueda fonética en el IMPI

El integrante encargado intentó entrar a Marcanet por el enlace del profesor y buscándola directamente, pero el portal no cargó. **Queda pendiente** con este procedimiento:

1. Entrar a `acervomarcas.impi.gob.mx:8181` y elegir la búsqueda fonética.
2. Buscar NERVIK, NERVIC, NERBIK y NERV en las clases 9, 38, 42 y 45.
3. Anotar denominación, expediente, clase y estado (vigente, en trámite, caducado o negado).
4. Tomar la captura de la lista de resultados.
5. Decidir: sin antecedentes similares en las clases 9 y 42 → Nervik; con antecedente vigente → repetir con Custodex.

Respaldo si el IMPI sigue caído: `tmdn.org` y `tmsearch.uspto.gov`.

## Paso 5 — Vigilancia tecnológica (los 7 pasos)

| Paso | Qué se hizo | Herramienta | Resultado |
|---|---|---|---|
| 1. Preparación | Términos ES/EN, combinaciones AND y códigos IPC | Claude | 6 códigos: H04K 3/00, G01S 19/21, B60R 25/33, G07C 5/08, G01C 21/34, G06N 20/00 |
| 2. México | Búsqueda en IMPI/SIGA | — | ⏳ Pendiente |
| 3. LATAM | Búsqueda en LATIPAT | — | ⏳ Pendiente |
| 4. Global | "jamming" + "vehicle tracking", "GNSS", "OBD" | Google Patents | 5 documentos relevantes |
| 5. Familias | Revisión de familia de cada documento | Google Patents | Solo 2 tienen protección en MX |
| 6. Reclamos | Análisis de reclamos | Claude | Veredicto por patente |
| 7. FTO | Conclusión de libertad de operación | Equipo + Claude | 🟡 Media |

### Prompt 1 (Claude) → Términos de búsqueda

Se pidió a Claude, a partir del concepto, del mecanismo técnico (telemetría del vehículo, microcontrolador local, detección de interferencia, alertas sin conexión) y del componente de IA (TinyML local), los términos principales y sus sinónimos en español e inglés, combinaciones AND para motores booleanos, los códigos IPC y la secuencia IMPI → LATIPAT → Lens.org.

### Patentes encontradas (pasos 4 y 5)

<div class="chart-card" markdown="1">

<div class="timeline" markdown="1">

<div class="timeline-row" markdown="1">
<span class="timeline-label"><strong>US 8,838,334 B2</strong> · Airbus (Astrium)<br>GNSS del rastreador detecta jammer</span>
<div class="timeline-track">
  <div class="timeline-bar atencion" style="left:5%; width:50%;">US activa; EP revocada</div>
  <div class="timeline-now" style="left:85%;"></div>
</div>
</div>

<div class="timeline-row" markdown="1">
<span class="timeline-label"><strong>US 8,319,615 B2</strong> · Continental (Aumovio)<br>RSSI y calidad celular: alerta previa</span>
<div class="timeline-track">
  <div class="timeline-bar fuera" style="left:0%; width:52%;">US activa; familia BR; sin familia MX</div>
  <div class="timeline-now" style="left:85%;"></div>
</div>
</div>

<div class="timeline-row" markdown="1">
<span class="timeline-label"><strong>US 10,598,795 B2</strong> · Verizon<br>GPS vs. triangulación celular</span>
<div class="timeline-track">
  <div class="timeline-bar expirada" style="left:30%; width:14%;">Expirada 2020</div>
  <div class="timeline-now" style="left:85%;"></div>
</div>
</div>

<div class="timeline-row" markdown="1">
<span class="timeline-label"><strong>MX 356554 B</strong> · TowerSec (Red Bend)<br>Ataques a canales de comunicación</span>
<div class="timeline-track">
  <div class="timeline-bar atencion" style="left:8%; width:52%;">MX vigente (concedida 2018)</div>
  <div class="timeline-now" style="left:85%;"></div>
</div>
</div>

<div class="timeline-row" markdown="1">
<span class="timeline-label"><strong>MX 2020/006907 A</strong> · solicitante por confirmar<br>Detector de inhibidor + baliza expulsable</span>
<div class="timeline-track">
  <div class="timeline-bar fuera" style="left:36%; width:64%;">Solicitud MX (2020); por confirmar en SIGA</div>
  <div class="timeline-now" style="left:85%;"></div>
</div>
</div>

</div>

<p class="chart-caption">Línea de tiempo aproximada (2010–2050). <span style="color:var(--ibero-red-light)">■</span> requiere atención (zona gris) · <span style="color:var(--text-gray)">■</span> fuera del alcance de Nervik · <span style="color:var(--text-gray)">▦</span> expirada (libre)</p>

</div>

| # | Documento | Titular | Vigencia | ¿Protección en MX? |
|---|---|---|---|:---:|
| 1 | US 8,838,334 B2 — Device for detecting and tracking motor vehicles | Airbus Defence and Space (orig. Astrium) | Activa en EE. UU. hasta 2032; EP revocada | No |
| 2 | US 8,319,615 B2 — Detecting jamming of communications | Continental (Aumovio) | Activa en EE. UU. hasta 2031; familia en Brasil | No |
| 3 | US 10,598,795 B2 — Detecting interference with a tracking device | Verizon | Expirada por falta de pago | No (libre) |
| 4 | MX 356554 B — Dispositivo para detección y prevención de ataque en vehículo | TowerSec / Red Bend | Vigente en México (concedida en 2018) | **Sí** |
| 5 | MX 2020/006907 A — Trazabilidad con medios de comunicación desprendibles | Por confirmar | Solicitud de 2020 | Sí (solicitud) |

### Prompt 2 (Claude) → Interpretar reclamos

A cada documento se le aplicó el mismo análisis: qué protege, qué no protege, si el concepto cae dentro o fuera y qué recomendación sigue.

| # | Qué protege | Veredicto | Recomendación |
|---|---|:---:|---|
| 1 | Receptor GNSS del rastreador que vigila sus parámetros para detectar un interferente; comparar posición con velocímetro; bloquear una función | ❌ Zona gris | Sin efecto en México; asesoría solo si se exporta a EE. UU. |
| 2 | Tasa de subida de RSSI y calidad celular → aviso previo a la estación base | ✅ Fuera | Ignorar en México; revisar Brasil antes de 2031 |
| 3 | GPS frente a triangulación celular durante un trayecto confirmado | ✅ Fuera (expirada) | Usar como guía: es dominio público |
| 4 | Detectar ataques a los canales de comunicación del vehículo vigilando contenido, metadatos y datos físicos, y cortar o cambiar el canal | ❌ Zona gris | Ajustar y documentar diferencias; opinión de PI antes de vender |
| 5 | Detector de inhibidor que expulsa una baliza del vehículo | ✅ Fuera | Ignorar; evidencia de que hay inventores mexicanos en el problema |

## Paso 7 — Conclusión FTO

!!! warning "🟡 FTO media"
    No hay patente vigente en México que cubra exactamente el mecanismo de Nervik (detección local multiseñal, alerta en cabina, bitácora firmada y transmisión diferida). Las dos más cercanas al mecanismo (Airbus y Continental) no protegen en México. El riesgo es MX 356554 B, por su redacción amplia.

    **Acción:** mantener el modo de solo escucha del bus, no actuar sobre ningún canal ni sistema del vehículo, describir el producto como "detector de interferencia y registrador de evidencia", y confirmar en SIGA y LATIPAT.

## Paso 6 — Mini-taller de entrevistas

Se aprendió el protocolo de 20 minutos (apertura, exploración, hipótesis y cierre), con la regla de hablar menos del 20% del tiempo y preguntar por comportamiento pasado, no por intención futura. Se adaptó el guion a Nervik (por ejemplo: *"Cuénteme la última vez que perdieron la señal de una unidad en ruta. ¿Qué hicieron en los primeros 10 minutos?"*).

**Tres personas identificadas:**

1. El familiar de un integrante que sufrió el robo mientras conducía un camión.
2. Un gerente de seguridad u operaciones de una flota mediana en Puebla (vía la delegación de CANACAR).
3. Un suscriptor, ajustador o broker de seguros de carga.

**Hipótesis actualizadas** (sin paro de motor):

- **H1:** frecuencia de al menos un evento al mes y disposición de $250 a $400 por unidad al mes.
- **H2:** preferencia por alerta y evidencia sobre el paro automático.
- **H3:** la aseguradora acepta la evidencia para reducir custodias o primas.

!!! note "Estado"
    Las entrevistas están pendientes. Las notas con citas textuales y la síntesis con el prompt de la semana se agregarán aquí cuando se realicen.

## Conclusión de la semana

La vigilancia confirmó que la detección de jammers en rastreadores no es nueva (hay patentes desde 2009), lo que descarta buscar una patente de invención, pero también que nadie protege en México la combinación de detección local, alerta sin conexión y evidencia firmada. La decisión de la Semana 2 de quitar el paro de motor resultó doblemente acertada: reduce el riesgo técnico y legal, y aleja al producto de los reclamos de las patentes más cercanas. Lo que falta son las voces de los usuarios: hasta hacer las entrevistas, todo lo demás sigue siendo hipótesis.
