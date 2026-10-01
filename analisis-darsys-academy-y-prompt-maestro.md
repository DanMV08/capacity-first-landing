# Análisis completo — Funnel "Darsys Academy Mastermind" + Prompt maestro reutilizable

> Analizado el 13/07/2026 desde https://darsysacademymastermind.com/darsys-academy
> Documento en 3 partes: (1) cómo está construida, (2) estructura bloque a bloque, (3) prompt maestro para replicarla con cualquier cliente.

---

## PARTE 1 — Cómo está construida (tecnología y sistema de diseño)

### Plataforma
- **GoHighLevel (LeadConnector)** como hosting del funnel (se ve en `stcdn.leadconnectorhq.com` y assets en `assets.cdn.filesafe.space`).
- **PERO el diseño NO usa los bloques nativos de GHL**: toda la página es **un solo elemento de "Custom Code" (HTML + CSS + JS a medida)** dentro de una sección GHL. Eso explica por qué se ve muy superior a un funnel típico de GHL.
- Son **2 páginas**: la landing (`/darsys-academy`) y la página de aplicación (`/aplicar-vip`), que también es 100% código personalizado (no es el survey nativo de GHL) y envía los datos por **webhook POST** al CRM.

### Sistema de diseño (design tokens reales extraídos del CSS)

**Paleta** (definida como variables CSS `:root`):
| Token | Valor | Uso |
|---|---|---|
| `--negro` | `#2C1810` | Marrón chocolate — texto principal y fondos oscuros |
| `--negro-suave` | `#3D2316` | Variante de fondo oscuro |
| `--blanco` | `#FEFCF9` | Blanco cálido (texto sobre oscuro) |
| `--crema` | `#F5EDE3` | Fondo claro |
| `--nude` | `#EDE0D4` | Fondo claro secundario (footer, gradientes) |
| `--blush` | `#C4795F` | Acento terracota — *cursivas del titular, eyebrows* |
| `--blush-suave` | `#E0AB92` | Acento suave |
| `--dorado` | `#C9A25A` | Oro — botones, detalles premium |
| `--dorado-claro` | `#E3C889` | Oro claro — gradiente de botones |
| `--texto-muted` | `#9B7060` | Texto secundario sobre claro |
| `--texto-muted-claro` | `#CDBFB3` | Texto secundario sobre oscuro |

**Tipografía** (Google Fonts):
- Titulares: **Playfair Display** (serif editorial, weight 500–700, con `<em>` en *itálica color blush* para resaltar 2-3 palabras clave dentro de cada H1/H2 — este es EL detalle que le da el look premium).
- Cuerpo y UI: **Poppins** (300–800).
- Eyebrows/kickers: Poppins 12px, uppercase, `letter-spacing: 2.5px`, weight 600, color blush.

**Botones CTA** (idénticos en toda la página):
- `linear-gradient(135deg, #E3C889, #C9A25A)` (oro), texto oscuro `#1A1209`
- Uppercase, Poppins 600, `letter-spacing: 1.8px`, `border-radius: 2px` (casi recto = lujo)
- Padding `18px 46px`, sombra dorada `0 14px 32px rgba(201,162,90,0.32)`

**Animaciones y detalles**:
- Clase `.reveal`: entrada al hacer scroll — `opacity: 0; translateY(28px)` → visible con transición `0.8s cubic-bezier(0.2,0.7,0.2,1)` (IntersectionObserver añade `.in-view`).
- **Divisores con medallón 3D girando** (`.medallion-3d` con caras front/back "Darsys"/"D") entre secciones — sello de marca.
- **Orbes decorativos** difuminados de fondo (`.orbe`) en las secciones claras.
- Ritmo visual **oscuro → claro → oscuro**: hero chocolate con radial-gradient dorado → cuerpo con gradiente crema (`#EDE0D4 → #E8D8CC → #F5EDE3`) → CTA final oscuro de nuevo.
- Video VSL: `<video>` HTML5 nativo con botón de play personalizado (SVG), sin controles visibles hasta reproducir.

---

## PARTE 2 — Estructura de arriba a abajo (bloque a bloque)

### PÁGINA 1: Landing (`/darsys-academy`)

**BLOQUE 1 — Topbar de urgencia** (`.topbar`, fondo `#1A0C08`)
- Texto de escasez: "🔒 Cupos limitados — solo para maquillistas listas para escalar este mes"
- Mini-CTA dorado a la derecha: "Aplica ahora →"
- *Función: urgencia + CTA siempre visible desde el segundo 0.*

**BLOQUE 2 — Hero oscuro con VSL** (`.hero-vip`)
1. `kicker-vip` (eyebrow): "PARA [AVATAR] LISTAS PARA [DESEO] Y [DESEO 2]"
2. `H1` Playfair 44px: la **transformación numérica** "pasar de facturar $1,500/mes a $10,000+/mes con tu talento" (cifras concretas antes/después)
3. `subtitulo`: mini-historia en primera persona (yo estaba como tú → hoy tengo X → "No fue el talento. Fue el sistema")
4. `video-wrap`: **VSL** (video de ventas MP4) con play button dorado custom
5. `cta-btn`: "SÍ, QUIERO MI LUGAR" (afirmación en primera persona, no "enviar")
6. `cta-sub` (micro-copy anti-fricción): "5 preguntas rápidas · Sin compromiso · Sin presión"
7. `trust-pills`: 4 píldoras de autoridad — "10+ años…", "Primer estudio especializado…", "Ha dado clases junto a Make Up by Mario", "+$60,000 invertidos en su propio crecimiento"
- *Función: promesa + prueba + video + conversión inmediata para tráfico caliente.*

**BLOQUE 3 — Divisor medallón 3D** (transición a sección clara con gradiente crema)

**BLOQUE 4 — "La verdad que nadie te dice" (agitación del problema)** 
- `bloque-titulo`: eyebrow "LA VERDAD QUE NADIE TE DICE" + H2 "No estás estancada porque seas mala en esto" + párrafo que reencuadra la culpa ("te enseñaron a maquillar, nunca a cobrar… eres empresaria, no autoempleada. No es tu culpa")
- `pain-grid`: **3 pain-cards numeradas (I, II, III)** con creencias/dolores:
  - I. Contraste: brochas de $10 facturando $10K vs kits de $5K facturando $1,500 → "la diferencia es el sistema"
  - II. "El mundo te paga lo que tú vales… mientras lo trates como hobby…"
  - III. "No es problema de talento. Es de estructura — y la estructura se aprende."
- `callout-quote`: cita destacada firmada por la mentora
- *Función: quitar la culpa al lead + instalar la creencia "me falta un sistema" (que es lo que se vende).*

**BLOQUE 5 — Historia personal (storytelling)** (`.story-split`)
- Layout 2 columnas: **foto de la mentora** + relato con arco dramático:
  - Golpe: "A los 15 años mi papá sufrió un stroke… pasé a ser el sostén de mi casa"
  - Lucha: Victoria's Secret, Sephora, prerrequisitos de enfermería
  - Momento de giro: frase de un profesor → "ese día aposté por mí"
  - Presente: salón de 10 años, academia, venue, clases con Make Up by Mario
- Firma "— Darsys Milian"
- *Función: conexión emocional + prueba de que el camino existe.*

**BLOQUE 6 — Divisor**

**BLOQUE 7 — La oferta: los 3 pilares** 
- Eyebrow "EL SISTEMA COMPLETO, NO OTRO CURSO DE TÉCNICAS" + H2 "Los 3 pilares que separan a las que facturan de las que sobreviven"
- `pilares`: 3 cards numeradas **01 TU MARCA / 02 TU NEGOCIO / 03 TUS TÉCNICAS**, cada una con beneficio (no características)
- `incluye`: lista de **7 entregables** con icon-badges (evento presencial mensual, formación de marca, formación de negocio, formación de técnicas, mentorías grabadas, certificado, comunidad privada) + sello "VIP"
- *Función: presentar el programa como sistema (marca+negocio+técnica), no como curso.*

**BLOQUE 8 — Divisor medallón 3D**

**BLOQUE 9 — Prueba social** 
- Eyebrow "RESULTADOS REALES" + H2 "Ellas ya dieron el salto — y hoy cobran diferente"
- `arco-wrap`: **carrusel en arco de 5 fotos de graduadas** con overlay (badge "CERTIFICADA" + nombre) y dots de navegación
- `mensajes-reales`: 2 cards **estilo captura de WhatsApp** (fondo verde chat `#DCF8C6`) con testimonios textuales que incluyen cifras ("estoy generando alrededor de $5,000 mensuales")
- *Función: prueba visual (caras reales) + prueba conversacional (chats se sienten auténticos).*

**BLOQUE 10 — Filtro de calificación** (`.calificacion`)
- Eyebrow "ANTES DE APLICAR" + H2 "¿Es esto para ti?"
- 2 columnas espejo: **"ESTO ES PARA TI SI…"** (3 bullets ✓) vs **"ESTO NO ES PARA TI SI…"** (3 bullets ✗)
- Nota: el último bullet de cada columna es el mismo tema (invertir en ti misma) en positivo/negativo → prepara la conversación de precio.
- *Función: auto-selección + exclusividad ("no todos entran") + pre-frame de la inversión.*

**BLOQUE 11 — Cómo funciona (reducción de fricción)** 
- Eyebrow "CÓMO FUNCIONA" + H2 "3 pasos simples" + "Sin compromiso…"
- 3 pasos numerados: ① Responde 5 preguntas ② Revisamos tus respuestas ③ Conectas con el equipo
- Stat destacado repetido: "+$60,000 invertidos por Darsys en cursos, masterminds y mentores para llegar aquí"
- *Función: quitar miedo al botón (aplicar ≠ comprar) + coherencia ("ella también invierte en mentores").*

**BLOQUE 12 — CTA final oscuro** (`.cta-final`)
- H2 "Ahora es tu turno" + urgencia por costo de oportunidad ("Cada día que sigues maquillando igual, es un día menos…")
- Botón "SÍ, QUIERO APLICAR AHORA" + micro-copy "Sin compromiso · Sin presión"

**BLOQUE 13 — Footer minimal** (fondo nude): "© Darsys Academy — Todos los derechos reservados."

### PÁGINA 2: Aplicación (`/aplicar-vip`) — survey personalizado con lead scoring

**UI**: fondo de marca, logo arriba, **barra de progreso**, una pregunta por pantalla (tipo Typeform), botones Atrás/Siguiente.

**Las 5 preguntas reales**:
1. **Experiencia**: "¿Tienes experiencia previa maquillando de forma profesional?" — Sí / No pero dispuesta a aprender *(con lógica condicional: si "No", se salta la P2)*
2. **Facturación actual**: Más de $5,000 / $3,000–5,000 / $1,000–3,000 / Menos de $1,000
3. **Meta de facturación**: Más de $10,000 / $5,000–10,000 / $2,000–5,000
4. **Compromiso** (multi-select): asistir al evento presencial / dedicar tiempo semanal / aplicar con clientas reales / participar en la comunidad
5. **Inversión disponible**: "Si esto es exactamente lo que necesitas, ¿cuánto estás dispuesta a invertir en tu crecimiento?" — Más de $5,000 / $3,000–5,000 / $1,500–3,000 / Menos de $1,500

**Paso 6 — Datos**: "Ya casi terminamos" → Nombre completo, WhatsApp, Email.

**Lead scoring (extraído del JS real)**:
- Facturación actual: 3/2/1/0 puntos (solo si tiene experiencia)
- Meta: 3/2/1 puntos · Compromiso: 1 punto por opción marcada (máx 4) · Inversión: 3/2/1/0 puntos
- Porcentaje sobre el máximo → **Alto ≥70% / Medio ≥40% / Bajo <40%**
- **Ruta según score**: Alto/Medio → pantalla "¡Perfecto! Ya puedes agendar tu llamada" con **calendario embebido** (Calendly/GHL Calendar). Bajo → "¡Gracias! Te contactaremos por WhatsApp" (sin calendario).
- Todo el payload (respuestas + puntaje + valor + datos) se envía por **webhook** al CRM con campo `origen`.

### Resumen de la psicología del funnel
Urgencia → Promesa numérica → Autoridad → Agitación sin culpa → Historia → Sistema de 3 pilares → Prueba social → Filtro de exclusividad → Fricción cero → Urgencia final → **Aplicación que califica al lead y solo da calendario a los leads valiosos**. Es un funnel clásico de **high-ticket application** ejecutado con diseño editorial premium.

---

## PARTE 3 — PROMPT MAESTRO (copiar, rellenar corchetes y usar)

> Instrucciones de uso: rellena la sección "DATOS DEL CLIENTE" y pega el prompt completo en Claude. Genera 2 archivos de código listos para pegar en un elemento Custom Code de GoHighLevel (o cualquier builder que acepte HTML), uno por página.

```
Actúa como desarrollador web experto en funnels de high-ticket con diseño editorial premium.
Crea una landing page de aplicación a mentoría/programa high-ticket + una página de
formulario de aplicación multi-paso, en HTML + CSS + JS vanilla, 100% self-contained
(un solo archivo por página, sin librerías externas salvo Google Fonts), lista para
pegar en un elemento de Custom Code de GoHighLevel. Mobile-first y responsive.

=== DATOS DEL CLIENTE (rellenar) ===
- Nombre de la marca/mentor(a): [NOMBRE]
- Nicho y avatar: [ej. "maquillistas", "fotógrafos", "coaches"] (ajustar género gramatical en todos los textos)
- Transformación numérica: de [CIFRA ACTUAL]/mes a [CIFRA DESEADA]/mes
- Nombre del programa: [ej. "Mentoría VIP"]
- Historia personal del mentor (golpe → lucha → giro → éxito actual): [3-4 frases]
- 4 credenciales de autoridad: [años, "primer X en Y", colaboración famosa, cifra invertida en formación]
- Los 3 pilares del método: [PILAR 1], [PILAR 2], [PILAR 3] con 1 beneficio cada uno
- 7 entregables del programa: [lista]
- 5 nombres de alumnos con foto + 2 testimonios textuales con cifras: [lista]
- URL del video VSL (mp4): [URL]
- URLs de imágenes (foto mentor, 5 fotos alumnos): [URLs]
- URL del calendario (Calendly o GHL): [URL]
- URL del webhook del CRM: [URL]
- Slug de la página de aplicación: [/aplicar]

=== PALETA Y TIPOGRAFÍA (personalizar o dejar por defecto) ===
Define variables CSS en :root. Por defecto (estética "beauty premium" chocolate/oro):
--oscuro:[#2C1810] --oscuro-suave:[#3D2316] --claro:[#FEFCF9] --crema:[#F5EDE3]
--nude:[#EDE0D4] --acento:[#C4795F] --acento-suave:[#E0AB92] --premium:[#C9A25A]
--premium-claro:[#E3C889] --muted:[#9B7060] --muted-claro:[#CDBFB3]
Tipografías: titulares [Playfair Display] (serif, 500-700), cuerpo/UI [Poppins] (300-800).
Regla de estilo: en cada H1/H2, envolver 2-3 palabras clave en <em> con itálica y color
--acento. Eyebrows en Poppins 12px uppercase letter-spacing 2.5px color --acento.
Botones: linear-gradient(135deg, var(--premium-claro), var(--premium)), texto oscuro,
uppercase, letter-spacing 1.8px, border-radius 2px, padding 18px 46px, sombra del color
premium al 32%.

=== PÁGINA 1: LANDING (estructura exacta, en este orden) ===
1. TOPBAR fija de urgencia (fondo casi negro): "🔒 Cupos limitados — solo para [AVATAR]
   listas para [OBJETIVO] este mes" + mini botón dorado "Aplica ahora →" (link a [/aplicar]).
2. HERO oscuro (fondo --oscuro con radial-gradient sutil del color premium arriba):
   a) kicker eyebrow: "PARA [AVATAR] LISTAS PARA [DESEO 1] Y [DESEO 2]"
   b) H1 (serif 44px, con <em>): "El camino para pasar de [CIFRA ACTUAL] al mes a
      [CIFRA DESEADA]+ al mes con tu [TALENTO]"
   c) Subtítulo en primera persona del mentor: "[Yo estaba como tú] ... [hoy tengo X].
      No fue el talento. Fue el sistema que hoy te voy a enseñar."
   d) Video VSL: <video> HTML5 con [URL_VIDEO], poster, y botón de play circular
      personalizado (SVG) en color premium; sin controles hasta hacer play.
   e) CTA dorado: "SÍ, QUIERO MI LUGAR" + microcopy debajo: "5 preguntas rápidas ·
      Sin compromiso · Sin presión"
   f) 4 trust-pills en fila (wrap en móvil) con las credenciales: cifra/dato en dorado
      + descripción en muted-claro.
3. TRANSICIÓN a sección clara: fondo gradiente (--nude → tono medio → --crema), con
   2 "orbes" decorativos blur de fondo, y un DIVISOR con medallón 3D girando (CSS
   animation rotateY infinita, caras "[NOMBRE]"/"[INICIAL]") que se repite entre bloques.
4. BLOQUE AGITACIÓN: eyebrow "LA VERDAD QUE NADIE TE DICE" + H2 "No estás estancad[a/o]
   porque seas mal[a/o] en esto" + párrafo que quita la culpa ("te enseñaron [HABILIDAD],
   nunca te enseñaron a cobrar... eres empresari[a/o], no autoemplead[a/o]. No es tu culpa").
   Luego 3 pain-cards numeradas en romanos (I, II, III): [contraste de dos personas con
   mismo talento y resultados opuestos → "la diferencia es el sistema"], [creencia sobre
   cobrar lo que vales], ["no es talento, es estructura — y la estructura se aprende"].
   Cierra con callout-quote grande firmada: "[CITA DEL MENTOR]" — [NOMBRE].
5. BLOQUE HISTORIA (story-split 2 columnas, foto izquierda [FOTO_MENTOR] con marco
   elegante): H3 "[De X a construir Y]" + 3 párrafos con arco golpe→lucha→giro→presente
   + firma. En móvil, foto arriba.
6. BLOQUE OFERTA: eyebrow "EL SISTEMA COMPLETO, NO OTRO CURSO DE [TÉCNICAS]" + H2
   "Los 3 pilares que separan a l[a/o]s que facturan de l[a/o]s que sobreviven".
   3 cards numeradas 01/02/03 ([PILAR 1/2/3]) con beneficio. Debajo, grid "incluye"
   con los 7 entregables con icono check en badge dorado + sello "VIP".
7. BLOQUE PRUEBA SOCIAL: eyebrow "RESULTADOS REALES" + H2 "Ell[a/o]s ya dieron el salto —
   y hoy cobran diferente". Carrusel de 5 fotos en arco (la central más grande, laterales
   rotadas/escaladas, dots debajo, auto-rotación JS) con overlay: badge "CERTIFICAD[A/O]"
   + nombre. Debajo, 2 cards estilo captura de WhatsApp (fondo #DCF8C6, esquina de burbuja,
   tipografía de chat) con los 2 testimonios textuales.
8. BLOQUE FILTRO: eyebrow "ANTES DE APLICAR" + H2 "¿Es esto para ti?". Dos columnas:
   "ESTO ES PARA TI SI..." (3 bullets ✓, borde/acento positivo) y "ESTO NO ES PARA TI
   SI..." (3 bullets ✗, apagado). El bullet 3 de ambas debe ser espejo sobre "invertir
   en ti mism[a/o]".
9. BLOQUE PROCESO: eyebrow "CÓMO FUNCIONA" + H2 "3 pasos simples" + "Sin compromiso...".
   3 pasos numerados: responde [N] preguntas / revisamos tus respuestas / conectas con
   el equipo de [NOMBRE]. Debajo, stat gigante en serif: "+[CIFRA] invertidos por
   [NOMBRE] en cursos, masterminds y mentores para llegar aquí".
10. CTA FINAL (vuelve a fondo oscuro): H2 "Ahora es tu turno" + párrafo de costo de
    oportunidad ("Cada día que sigues [ACCIÓN ACTUAL] igual, es un día menos para
    empezar a cobrar lo que vales") + CTA "SÍ, QUIERO APLICAR AHORA" + microcopy.
11. FOOTER minimal fondo --nude: "© [MARCA] — Todos los derechos reservados."

Animaciones: clase .reveal en cada bloque (opacity 0 + translateY(28px) → visible al
entrar en viewport vía IntersectionObserver, transición 0.8s cubic-bezier(.2,.7,.2,1)).
Todos los CTAs enlazan a [/aplicar].

=== PÁGINA 2: FORMULARIO DE APLICACIÓN ===
UI: fondo de marca oscuro/claro según paleta, logo de texto arriba, barra de progreso
fina que avanza por paso, card central con UNA pregunta por pantalla (estilo Typeform),
opciones como cards clicables, botones "← Atrás" y "Siguiente".

Pasos (adaptar las preguntas al nicho manteniendo la función de cada una):
P1 [CALIFICACIÓN BASE]: "¿Tienes experiencia previa [ACTIVIDAD] de forma profesional?"
   — Sí / No pero estoy dispuest[a/o] a aprender. LÓGICA: si "No", saltar P2.
P2 [SITUACIÓN ACTUAL]: "¿Cuánto estás facturando actualmente al mes con [ACTIVIDAD]?"
   — 4 rangos: [RANGOS].
P3 [AMBICIÓN]: "¿Cuánto te gustaría estar facturando al mes?" — 3 rangos: [RANGOS].
P4 [COMPROMISO, multi-select]: "¿Cuáles de estas estás dispuest[a/o] a hacer?" — 4
   compromisos reales del programa: [LISTA].
P5 [CAPACIDAD DE INVERSIÓN]: "Si esto es exactamente lo que necesitas, ¿cuánto estás
   dispuest[a/o] a invertir en tu crecimiento?" — 4 rangos: [RANGOS].
P6 [DATOS]: "Ya casi terminamos — déjanos tus datos para enviarte tu resultado."
   Campos: Nombre completo, Teléfono/WhatsApp, Email (validar los 3).

LEAD SCORING (implementar en JS exactamente así):
- P2: 3/2/1/0 puntos según rango (solo suma al máximo si tiene experiencia)
- P3: 3/2/1 · P4: 1 punto por compromiso marcado (máx 4) · P5: 3/2/1/0
- pct = puntos/máximo → valor = "Alto" si ≥70%, "Medio" si ≥40%, si no "Bajo".
AL FINALIZAR:
- Enviar por fetch POST a [WEBHOOK_URL] un JSON con: todas las respuestas en texto
  legible, valor, puntaje "X/Y (Z%)", nombre, whatsapp, email y origen "[NOMBRE FUNNEL]".
- Si valor es Alto o Medio → mostrar pantalla "¡Perfecto! Ya puedes agendar tu llamada"
  con el calendario embebido [URL_CALENDARIO].
- Si valor es Bajo → mostrar "¡Gracias por responder! En breve el equipo de [NOMBRE]
  te contactará por WhatsApp." (sin calendario).

Requisitos finales: textos en español neutro adaptados al género del avatar, código
comentado por bloques para poder editar textos fácilmente, y todas las imágenes/video
referenciadas por URL (variables al inicio del archivo para cambiarlas en un solo lugar).
```

---

### Checklist de personalización por cliente (lo único que cambias)
1. **Textos**: avatar, cifras antes/después, historia, credenciales, pilares, entregables, testimonios.
2. **Imágenes**: foto del mentor + 5 fotos de alumnos/clientes (subidas al Media Storage de GHL).
3. **Video**: VSL en mp4 (GHL Media o hosting propio).
4. **Preguntas**: mantén la FUNCIÓN de cada pregunta (calificación → situación → ambición → compromiso → inversión → datos) y adapta solo el contenido y los rangos al ticket del cliente.
5. **Colores/tipografía**: cambia solo las variables `:root` y las 2 Google Fonts.
6. **Integraciones**: webhook del CRM + link de calendario + slug de la página 2.
