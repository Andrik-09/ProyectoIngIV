---
hide:
  - navigation
---

# Semana 2 — Búsqueda de Oportunidades (Modo Estresor): de Kallpa Route AI a Nervik

<span class="bitacora-meta"><strong>Andrik Pérez Luna</strong> · Ingeniería Mecatrónica · Equipo 2: Andrik Pérez Luna, Juan Pablo y Mauro David Sánchez Arenas</span>

## Objetivo de la semana

El equipo llegó a la Semana 2 con una idea propia: **Kallpa Route AI**, un dispositivo conectado al puerto de diagnóstico del tractocamión que bloquearía el motor sin necesitar internet cuando un inhibidor de señal (*jammer*) deja ciego al rastreo. Por eso se trabajó en **Modo Estresor**: en lugar de buscar oportunidades desde cero, se sometió la idea a prueba para ver qué tan saturado está su espacio, qué supuestos la sostienen y si existe una arista con más evidencia.

Se usaron dos IAs con funciones distintas: **Perplexity** para anclar en datos verificables (auditar el ecosistema y verificar las señales de deseabilidad con fuentes) y **Claude** para romper el consenso (encontrar el supuesto peligroso, generar ideas disruptivas y diagnosticar).

---

## Paso 1 — Auditoría de ecosistema y estrés de la idea

### Prompt 1 (Perplexity) → Auditar el ecosistema

Se pidió a Perplexity revisar quién ataca ya el robo de carga con soluciones de hardware y software en México, qué brechas quedan sin cubrir y si el mercado está listo. La respuesta mostró un espacio con muchos actores de rastreo GPS, monitoreo humano 24/7 y custodia armada, pero todos dependientes de la conexión: **el momento del jammer es justo donde fallan**.

### Prompt 2 (Claude) → Estrés profundo

Se pidió a Claude el supuesto más peligroso y una arista alternativa. El supuesto más peligroso fue que **el bloqueo físico del motor es la mejor forma de detener un robo**. La arista que apareció fue la de las aseguradoras:

> «Existe una oportunidad adicional para aseguradoras, brokers y transportistas medianos de carga de alto valor que necesitan medir y demostrar el riesgo real de cada flota y de cada siniestro, porque hoy dependen del GPS del propio asegurado, sin cadena de custodia ni registro durante la ceguera del jammer».

!!! note "Qué se llevó al Paso 2"
    El supuesto peligroso (bloqueo de motor) y la arista de aseguradoras.

## Paso 2 — Síntesis de insights

Con los insumos del Paso 1 se formularon dos insights:

- **Insight A (idea original):** el transportista queda indefenso en el momento en que el jammer corta la señal, y necesita autonomía en la unidad.
- **Insight B (arista):** la aseguradora no puede medir el riesgo real de cada flota ni de cada siniestro porque no hay registro confiable durante la ceguera.

Los dos se llevaron al Pain-Gain Map para decidir con más evidencia.

## Paso 3 — Pain-Gain Map

**Segmento:** empresas transportistas, operadores logísticos (3PL/4PL) y aseguradoras de carga en corredores de alto riesgo en México.

**Dolores**
: **D1.** Pérdida total de comunicación y control cuando se usan jammers durante un asalto. ✅
: **D2.** Aumento de 30% a 70% en las pólizas, o negación de cobertura para mercancía de alto valor. ⚠️
: **D3.** Los GPS actuales son reactivos: dependen de la nube y avisan cuando el robo ya ocurrió. ✅

**Ganancias**
: **G1.** Autonomía en la unidad (Edge AI) para actuar sin internet.
: **G2.** Menos siniestros, lo que facilita negociar primas más bajas.
: **G3.** Anticiparse al riesgo con inteligencia predictiva de rutas.

!!! tip "El cruce más poderoso"
    **Dolor ⭐:** la indefensión total del camión y del operador en el momento en que el jammer corta la señal.

    **Ganancia ⭐:** la certeza de que el sistema a bordo responde sin depender del centro de monitoreo.

**Oportunidad en una oración:** *Existe una oportunidad para empresas de transporte de carga que necesitan asegurar sus mercancías en tránsito, porque hoy los sistemas de rastreo tradicionales quedan inútiles ante los inhibidores de señal.*

## Paso 4 — SCAMPER + Remix de ideas

### Prompt 1 (Claude) → SCAMPER disruptivo (14 ideas)

Se pidió a Claude aplicar SCAMPER a Kallpa Route AI buscando reencuadres, no mejoras:

**S — Sustituir**
: **S1.** Aerosol marcador forense en lugar de bloquear el motor.
: **S2.** Un tag en la carga y no en el camión.

**C — Combinar**
: **C1.** El dispositivo como «notario digital de siniestros» para la aseguradora.
: **C2.** Un botón de pánico biométrico del operador.

**A — Adaptar**
: **A1.** «Caja negra» controlada por un tercero neutral, como en aviación.
: **A2.** Telemática de seguros basada en uso, donde la aseguradora regala el equipo.

**M — Modificar al extremo**
: **M1.** Un chip pasivo casi gratuito con la «última posición antes del jammer».
: **M2.** Defensa colectiva y autónoma de toda la flota.

**P — Poner en otro uso**
: **P1.** Maquinaria minera y agrícola sin cobertura celular.
: **P2.** Un tablero de riesgo por tramo carretero para gobiernos.

**E — Eliminar**
: **E1.** Eliminar el bloqueo de motor — el valor real es la evidencia.
: **E2.** Eliminar la app y entregar los datos por API a la aseguradora.

**R — Reordenar**
: **R1.** Que pague la aseguradora como condición de la póliza.
: **R2.** Intervenir antes de entrar a la zona de riesgo.

El equipo eligió **S2, M1, P2 y R1** para el remix. **E1** se guardó: terminó siendo la decisión del Paso 7.

### Prompt 2 (Claude) → Remix de ideas

| Remix | Ideas cruzadas | Concepto |
|---|---|---|
| **Pasaporte de Carga** | S2 + R1 | Tag por pallet que la aseguradora compra para activar la póliza por embarque; historial de custodia a través de varios transportistas |
| **Mapa de Riesgo Vivo** | M1 + P2 | Chips baratos distribuidos masivamente que alimentan un tablero de riesgo vial vendido a gobiernos estatales |
| **Prima que se Paga Sola** | R1 + S2 + P2 | Tag pagado por la aseguradora cuyos datos agregados también se venden al gobierno; dos pagadores que se subsidian |

### Prompt 3 (Claude) → Filtro DVN

| Concepto | 🔴 Deseable | 🟣 Novedoso | 🟢 Viable | Puntaje | Veredicto |
|---|:---:|:---:|:---:|:---:|---|
| A — Pasaporte de Carga | ⚠️ | ⚠️ | ⚠️ | 0/3 | Refinar antes |
| B — Mapa de Riesgo Vivo | ❌ | ⚠️ | ❌ | 0/3 | Descartar |
| C — Prima que se Paga Sola | ⚠️ | ✅ | ❌ | 1/3 | Descartar |

**Concepto recomendado para el Paso 5: Pasaporte de Carga**, por tener la ruta comercial más corta. Riesgo a vigilar: la novedad, porque ya existen Tive, Overhaul y Sensitech.

## Paso 5 — Validación preliminar de deseabilidad

### Prompt 1 (Perplexity) → Verificar las 5 señales (parte A y parte B)

Se verificaron por separado la idea original (A) y el concepto de la arista (B):

| Señal | A — Kallpa (bloqueo OBD-II) | B — Pasaporte de Carga |
|---|---|---|
| Pago por soluciones imperfectas | ✅ GPS de $220 a $2,200/mes, custodias de $25,000 a $45,000 | ⚠️ Hay gasto en GPS y RFID, pero no en tags por pallet |
| Comunidades activas | ⚠️ Publicaciones dispersas, no una comunidad de compradores | ❌ No se encontró |
| Frecuencia | ✅ Más de 15,000 robos en 2024 (≈60 al día) | ⚠️ No medida para el subproblema |
| Costo observable | ✅ Más de $7,000 millones (AMESIS) | ⚠️ No se separa el costo de la falta de evidencia |
| Workarounds | ✅ GPS en caja, señuelos, custodia | ✅ Rastreo por capas y RFID |
| **Total** | **4 ✅ · 1 ⚠️ · 0 ❌** | **1 ✅ · 3 ⚠️ · 1 ❌** |

### Prompt 2 (Claude) → Diagnóstico comparativo e hipótesis

El diagnóstico dio **deseabilidad alta para A** y **baja para B**. El riesgo de «suicidio creativo» de A es «ya existe» (hay rastreadores con paro de motor desde 2017); el de B es «sin dolor real», que es más grave porque ningún buen diseño lo compensa.

**Hipótesis para las entrevistas de la Semana 3:**

1. **A-H1:** las flotas medianas viven al menos un evento de jammer al mes y pagarían de $500 a $1,500 al mes por unidad.
2. **A-H2:** prefieren una intervención local autónoma sobre GPS en caja + monitoreo + custodia.
3. **B-H1:** las aseguradoras tienen disputas de ajuste por falta de evidencia en más del 10% de los siniestros.
4. **B-H2:** preferirían un registro que el asegurado no pueda manipular.

## Paso 6 — Criterios de selección de oportunidad

| Criterio | A — Kallpa Route AI | B — Pasaporte de Carga |
|---|---|---|
| Pasión | Sí: interés en telemetría y un familiar de un integrante sufrió un robo de carga | Sí: el reto de una PCB compacta de bajo consumo |
| Habilidad | No: el actuador que interviene el bus J1939 con el camión en movimiento es un riesgo técnico para 6 meses | Parcial: optimización energética extrema del tag |
| Mercado | 4 de 5 señales. Pasa | 1 de 5. No pasa |
| **Resultado** | **2 de 3 → ajustar** | **2 de 3 → ajustar** |

## Paso 7 — Elección y defensa de la oportunidad

**Oportunidad elegida: Kallpa Route AI, con el hardware ajustado a lectura del bus y procesamiento local, eliminando el actuador de paro de motor.**

El dolor del mercado está confirmado (4 de 5 señales) y la capacidad del equipo en dispositivos de diagnóstico y diseño de circuitos lo respalda. Es mucho más seguro ajustar el hardware para alertar y registrar de forma autónoma que intentar educar a un mercado asegurador que hoy no busca tags por pallet. La idea **E1** del SCAMPER («eliminar el bloqueo; el valor es la evidencia») se integró a la decisión, y la arista de aseguradoras quedó como modelo de ingresos a explorar.

!!! tip "El concepto toma nombre"
    En la Semana 3 el concepto tomó el nombre de **Nervik**.

## Conclusión de la semana

El Modo Estresor cumplió su función: la idea original sobrevivió, pero sin la parte que la hacía más riesgosa. El hallazgo más importante no fue una idea nueva, sino descubrir que lo que compra el mercado es la evidencia y la respuesta durante la ceguera, no el bloqueo del motor. El concepto alternativo (Pasaporte de Carga) se descartó con datos, no por preferencia, y dejó como herencia la pregunta que seguirá todo el semestre: ¿pagaría la aseguradora por esa evidencia?
