# PROMPT MAESTRO — Web de aplicación high-ticket (estrategia "Darsys")

> **Cómo usarlo:** copia TODO el bloque de abajo (desde "Actúa como…" hasta el final) y pégalo en una conversación nueva con Claude junto con el nombre del cliente y su nicho. Claude te pedirá únicamente los materiales que faltan (textos, imágenes, videos, enlaces) mediante un checklist, y con eso construirá las páginas completas. No necesitas explicar nada más.

---

```
Actúa como desarrollador web senior especializado en funnels de aplicación high-ticket
con diseño editorial premium. Vas a construirme una web de 2 páginas para un cliente:

  PÁGINA A — Landing de venta/aplicación
  PÁGINA B — Formulario de aplicación multi-paso con cualificación de lead
             y thank-you page personalizada según el puntaje

Trabaja en DOS FASES obligatorias:

──────────────────────────────────────────────
FASE 1 — INTAKE (antes de escribir código)
──────────────────────────────────────────────
Pídeme SOLO los materiales de esta lista, agrupados y numerados, indicando cuáles son
obligatorios y cuáles opcionales (para los opcionales que no entregue, usa un
placeholder claramente marcado con [PENDIENTE] para sustituirlo después).
No me preguntes nada de estructura, estrategia ni diseño: eso ya está definido abajo.
Si en mi primer mensaje ya te di parte de esto, no lo vuelvas a pedir.

TEXTOS (obligatorios):
 1. Nombre de la marca / mentor(a) y nombre del programa.
 2. Avatar del cliente ideal (nicho + género gramatical a usar en los textos).
 3. Transformación numérica: cifra actual típica → cifra objetivo (ej. $1.500 → $10.000+/mes).
 4. Historia personal del mentor en 4 momentos: golpe inicial → años de lucha →
    momento de giro → situación actual de éxito.
 5. 4 credenciales de autoridad (años de experiencia, un "primero en…", una
    colaboración o cliente reconocible, una cifra invertida en su propia formación).
 6. Los 3 pilares de su método (nombre corto + 1 frase de beneficio cada uno).
 7. Lista de entregables del programa (5 a 8 ítems).
 8. 2 testimonios textuales que incluyan cifras o resultados concretos.
 9. Nombres de 3 a 5 alumnos/clientes para el carrusel de resultados.
10. Ticket aproximado del programa (para calibrar los rangos de las preguntas de
    facturación e inversión del formulario — el precio NO se muestra en la web).

IMÁGENES (obligatorias, pedir como URL o archivo):
11. Foto profesional del mentor (vertical, para el bloque historia).
12. 3–5 fotos de alumnos/clientes con resultado (para el carrusel).
13. Logo si existe (si no, se genera un logotipo tipográfico con la fuente de titulares).

VIDEO (opcional pero recomendado):
14. Video de ventas VSL en .mp4 o link de YouTube/Vimeo (si no hay, el hero
    lleva la foto del mentor en su lugar).

ENLACES / PLATAFORMAS EXTERNAS:
15. Link de calendario para agendar llamadas (Calendly u otro) — obligatorio
    para la thank-you page de leads cualificados.
16. URL de webhook para recibir los datos del formulario (Make, Zapier, n8n o el
    CRM directo) — si aún no existe, deja una constante WEBHOOK_URL vacía y
    documentada al inicio del JS.
17. Número de WhatsApp del equipo (para la thank-you page de leads no cualificados).
18. Dominio o slug previsto para la página B (para enlazar los CTAs; si no se sabe,
    usa el enlace relativo ./aplicar.html).

MARCA VISUAL (opcional):
19. Colores de marca del cliente (si no hay, propone 2-3 paletas según el nicho y
    que yo elija; la paleta por defecto es la de "beauty premium" definida abajo).
20. Tipografías de marca (si no hay, usa el par por defecto o propone alternativas
    del mismo carácter: serif editorial + sans geométrica).

Cuando tengas los obligatorios, resume lo recibido en una tabla y pasa a FASE 2
sin esperar confirmación adicional.

──────────────────────────────────────────────
FASE 2 — CONSTRUCCIÓN
──────────────────────────────────────────────
Requisitos técnicos (innegociables):
- HTML + CSS + JS vanilla, un solo archivo autocontenido por página
  (index.html y aplicar.html). Sin frameworks ni librerías, salvo Google Fonts
  y el widget de Calendly.
- Mobile-first, responsive perfecto en 375px, 768px y 1280px.
- Todas las URLs de imágenes, video, webhook, calendario y WhatsApp declaradas como
  constantes/variables al inicio (CSS vars y JS const) para cambiarlas en un solo lugar.
- Código comentado por bloques con el nombre de cada sección para editar textos fácil.
- SEO básico: title, meta description, og:title, og:image.

SISTEMA DE DISEÑO
Variables CSS en :root. Paleta por defecto (adaptar si el cliente tiene marca):
  --oscuro:#2C1810      (fondos oscuros y texto principal)
  --oscuro-suave:#3D2316
  --claro:#FEFCF9       (blanco cálido)
  --crema:#F5EDE3  --nude:#EDE0D4          (fondos claros)
  --acento:#C4795F --acento-suave:#E0AB92  (acento cálido: cursivas y eyebrows)
  --premium:#C9A25A --premium-claro:#E3C889 (oro: botones y detalles)
  --muted:#9B7060  --muted-claro:#CDBFB3   (textos secundarios)
Regla al adaptar paletas: mantener SIEMPRE los 4 roles → un oscuro profundo, un
claro cálido, un color acento (para énfasis tipográfico) y un color "premium"
(para CTAs), con sus variantes. Nunca blanco puro ni negro puro.

Tipografía: titulares en serif editorial (por defecto Playfair Display 500–700),
cuerpo y UI en sans geométrica (por defecto Poppins 300–800).
Regla de oro: en cada H1/H2, envolver 2-3 palabras clave en <em> con itálica y
color --acento. Eyebrows/kickers: sans 12px, uppercase, letter-spacing 2.5px,
weight 600, color --acento.

Botones CTA (idénticos en toda la web):
  linear-gradient(135deg, var(--premium-claro), var(--premium)), texto --oscuro,
  uppercase, letter-spacing 1.8px, border-radius 2px, padding 18px 46px,
  box-shadow 0 14px 32px (color premium al 32%), hover con leve lift.

Animaciones y detalles de marca:
- Clase .reveal en cada bloque: opacity 0 + translateY(28px) → visible al entrar en
  viewport (IntersectionObserver), transición 0.8s cubic-bezier(.2,.7,.2,1).
- Divisor entre secciones: medallón 3D girando (animación CSS rotateY infinita,
  cara frontal con el nombre de la marca, trasera con la inicial).
- 2 orbes decorativos difuminados (blur alto, colores acento/premium al 10-20%)
  detrás de las secciones claras.
- Ritmo de fondos: oscuro (hero) → gradiente claro (cuerpo) → oscuro (CTA final).

PÁGINA A — LANDING (bloques en este orden exacto, cada uno cumple una función
psicológica; los textos se redactan con los materiales del intake):

1. TOPBAR de urgencia (fondo casi negro, siempre visible): "🔒 Cupos limitados —
   solo para [avatar] listas para [objetivo] este mes" + mini botón premium
   "Aplica ahora →". Función: urgencia + CTA desde el segundo 0.
2. HERO oscuro (radial-gradient sutil del color premium arriba):
   kicker → H1 con la transformación numérica (con <em>) → subtítulo en primera
   persona del mentor que termina en "No fue el talento. Fue el sistema." →
   VSL (video HTML5 con botón de play circular personalizado; si no hay video,
   foto del mentor con marco editorial) → CTA "SÍ, QUIERO MI LUGAR" → microcopy
   "5 preguntas rápidas · Sin compromiso · Sin presión" → 4 trust-pills con las
   credenciales (dato en color premium + descripción en muted-claro).
3. TRANSICIÓN a claro + divisor medallón.
4. AGITACIÓN SIN CULPA: eyebrow "LA VERDAD QUE NADIE TE DICE" + H2 "No estás
   estancad@ porque seas mal@ en esto" + párrafo que reencuadra: "te enseñaron
   [habilidad], nunca te enseñaron a cobrar… eres empresari@, no autoemplead@.
   Y eso no es tu culpa." + 3 pain-cards numeradas en romanos (I: contraste de
   dos personas con el mismo talento y resultados opuestos → la diferencia es el
   sistema; II: creencia sobre cobrar lo que vales; III: "no es talento, es
   estructura — y la estructura se aprende") + callout-quote grande firmada.
5. HISTORIA (split 2 columnas, foto + texto): arco golpe → lucha → giro → presente,
   con firma. Función: conexión emocional + prueba de que el camino existe.
6. OFERTA COMO SISTEMA: eyebrow "EL SISTEMA COMPLETO, NO OTRO CURSO DE [X]" +
   H2 "Los 3 pilares que separan a l@s que facturan de l@s que sobreviven" +
   3 cards numeradas 01/02/03 con los pilares (beneficios, no características) +
   grid "incluye" con los entregables (check en badge premium) + sello "VIP".
7. PRUEBA SOCIAL: eyebrow "RESULTADOS REALES" + H2 "Ell@s ya dieron el salto — y
   hoy cobran diferente" + carrusel en arco de fotos de alumnos (central grande,
   laterales rotadas/escaladas, dots, auto-rotación) con badge "CERTIFICAD@" +
   nombre + 2 cards estilo captura de WhatsApp (fondo #DCF8C6, burbuja de chat)
   con los testimonios con cifras.
8. FILTRO DE AUTOSELECCIÓN: eyebrow "ANTES DE APLICAR" + H2 "¿Es esto para ti?" +
   dos columnas espejo "ESTO ES PARA TI SI…" (✓) / "ESTO NO ES PARA TI SI…" (✗),
   3 bullets cada una; el tercer bullet de ambas es el mismo tema (invertir en
   ti mism@) en positivo y negativo. Función: exclusividad + pre-frame del precio.
9. PROCESO SIN FRICCIÓN: eyebrow "CÓMO FUNCIONA" + H2 "3 pasos simples" + pasos
   ①responde 5 preguntas ②revisamos tus respuestas ③conectas con el equipo +
   stat gigante en serif con la cifra que el mentor ha invertido en formarse.
   Función: aplicar ≠ comprar; quitar miedo al botón.
10. CTA FINAL oscuro: H2 "Ahora es tu turno" + párrafo de costo de oportunidad
    ("Cada día que sigues [acción actual] igual, es un día menos para empezar a
    cobrar lo que vales") + CTA + microcopy.
11. FOOTER minimal fondo nude: © marca — derechos reservados.
Todos los CTAs enlazan a la Página B.

PÁGINA B — FORMULARIO DE APLICACIÓN CON CUALIFICACIÓN

UI: logo arriba, barra de progreso fina, card central con UNA pregunta por
pantalla (estilo Typeform), opciones como cards clicables grandes (área táctil
completa), botones "← Atrás" / "Siguiente", misma paleta y fuentes que la landing.

Las 6 pantallas (adaptar contenido al nicho, MANTENER la función de cada una):
P1 CALIFICACIÓN BASE: "¿Tienes experiencia previa [actividad] de forma
   profesional?" — Sí / No, pero estoy dispuest@ a aprender.
   LÓGICA CONDICIONAL: si responde "No", saltar P2.
P2 SITUACIÓN ACTUAL: "¿Cuánto estás facturando actualmente al mes con
   [actividad]?" — 4 rangos calibrados al ticket del programa.
P3 AMBICIÓN: "¿Cuánto te gustaría estar facturando al mes?" — 3 rangos.
P4 COMPROMISO (multi-select): "¿Cuáles de estas estás dispuest@ a hacer?" —
   4 compromisos reales del programa (asistir, dedicar tiempo, aplicar con
   clientes reales, participar en comunidad).
P5 CAPACIDAD DE INVERSIÓN: "Si esto es exactamente lo que necesitas, ¿cuánto
   estás dispuest@ a invertir en tu crecimiento?" — 4 rangos donde el segundo
   rango cubre el precio real del programa.
P6 DATOS: "Ya casi terminamos — déjanos tus datos para enviarte tu resultado."
   Nombre completo + WhatsApp + Email, con validación de los 3 campos.

LEAD SCORING (en JS, exactamente esta lógica):
- P2: 3/2/1/0 puntos según rango (solo cuenta para el máximo si tiene experiencia)
- P3: 3/2/1 puntos · P4: 1 punto por compromiso (máx 4) · P5: 3/2/1/0 puntos
- pct = puntos/máximo → "Alto" si ≥70%, "Medio" si ≥40%, si no "Bajo".

AL ENVIAR:
1) POST por fetch a WEBHOOK_URL con JSON: cada respuesta en texto legible,
   valor (Alto/Medio/Bajo), puntaje "X/Y (Z%)", nombre, whatsapp, email y un
   campo origen con el nombre del funnel. Si WEBHOOK_URL está vacía, log en
   consola del payload completo (para test).
2) THANK-YOU PAGE PERSONALIZADA (misma página, se muestra el paso final según
   el score, saludando por nombre):
   - ALTO → "¡Perfecto, [Nombre]! Ya puedes agendar tu llamada" + Calendly
     INLINE embebido (widget oficial assets.calendly.com/assets/external/widget.js)
     con PREFILL por URL: ?name=[nombre]&email=[email]&utm_content=score-alto
     — así el lead no reescribe sus datos y el score llega al evento de Calendly.
   - MEDIO → mismo calendario, con copy de menor presión: "Nos encantaría
     conocerte — agenda una llamada con el equipo".
   - BAJO → SIN calendario: "¡Gracias por responder, [Nombre]! En breve un
     miembro del equipo te contactará por WhatsApp." + opcionalmente un botón
     wa.me con mensaje predefinido. (Protege la agenda del cliente: solo los
     leads cualificados llegan al calendario.)
   Escuchar el postMessage calendly.event_scheduled para mostrar un mensaje
   de confirmación final ("Llamada agendada ✓ Revisa tu correo").

ENTREGA FINAL
Entrega los 2 archivos completos + una lista breve de "pendientes de conexión"
(webhook, dominio, cualquier [PENDIENTE]) + instrucciones de 3 líneas para
probar el formulario en local. No expliques el código: coméntalo dentro.
```

---

## Checklist rápido para ti (antes de enviar el prompt)
Ten a mano del cliente: nombre y programa · avatar · cifras antes/después · historia en 4 momentos · 4 credenciales · 3 pilares · entregables · 2 testimonios con cifras · 3-5 fotos de alumnos · foto del mentor · VSL (si hay) · link de Calendly · webhook (si ya existe) · WhatsApp del equipo · colores/fuentes de marca (si existen). Cuanto más completes en el primer mensaje, menos te preguntará Claude.
