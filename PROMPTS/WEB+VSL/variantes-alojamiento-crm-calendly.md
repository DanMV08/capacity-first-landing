# Variantes de alojamiento + CRM para el funnel high-ticket
### (complemento del prompt maestro — la web es la misma, cambia dónde vive y a dónde van los leads)

La web que genera el prompt maestro son 2 archivos HTML autocontenidos. Eso te da libertad total: **cualquier sitio que sirva HTML la puede alojar**, y los leads viajan por **un webhook** hacia el CRM que quieras. Estas son las 4 configuraciones que tienen sentido, de más a menos recomendada.

---

## OPCIÓN A — Hosting estático + Make + CRM ligero ⭐ (recomendada)

**Stack:** Cloudflare Pages / Netlify / Vercel (gratis) + dominio del cliente + webhook de Make.com (o n8n/Zapier) + el CRM que ya use el cliente.

- **Alojamiento:** arrastras los 2 archivos y tienes la web en el dominio del cliente con SSL, gratis y sin límite práctico de visitas. Cero mensualidad tuya.
- **Leads:** el formulario hace POST al webhook de Make. Desde Make enrutas a donde sea: Google Sheets (registro), CRM, email al cliente, WhatsApp vía API, etc.
- **Por qué es la mejor:** máxima libertad de diseño (el look editorial se conserva 100%), coste cero de plataforma, y si el cliente cambia de CRM solo tocas el escenario de Make, no la web.
- **Contra:** las automatizaciones de email no vienen incluidas; las montas en el CRM/herramienta de email del cliente.

**Flujo del score en Make:** webhook → router por campo `valor`:
- `Alto` → crear contacto con etiqueta *lead-caliente* + notificación inmediata al vendedor (WhatsApp/Slack/email) — el lead ya viene con llamada agendada por Calendly.
- `Medio` → etiqueta *lead-tibio* + secuencia de seguimiento a 24-48h.
- `Bajo` → etiqueta *nurture* + secuencia larga de contenido (no llamar).

---

## OPCIÓN B — Systeme.io (todo-en-uno económico)

**¿Vale la pena? Sí, con matices.** Es el todo-en-uno con mejor relación precio/función del mercado: plan gratis real (hasta 2.000 contactos, funnels, email marketing, automatizaciones) y planes de pago muy baratos comparado con GHL/Kajabi. Para clientes que quieren *una sola factura* y tú no quieres administrar piezas sueltas, es una gran opción. **Ideal si además el cliente venderá el programa/curso dentro** (Systeme incluye áreas de miembros y pagos).

**Matices importantes para ESTE diseño:**
1. Su editor de páginas es limitado, pero **acepta bloques de código HTML/CSS/JS personalizado**: pegas la página completa del prompt maestro en un bloque de código y el diseño premium se conserva. No uses sus bloques nativos para esta plantilla (se pierde el look).
2. **No tiene lead scoring nativo.** No es problema: el scoring ya lo hace el JS de tu formulario. Solo necesitas que el resultado llegue como **etiqueta** (`score-alto` / `score-medio` / `score-bajo`).
3. **Cómo entra el lead a Systeme.io:** su API pública no debe llamarse desde el navegador (expondría la API key). Lo correcto: el formulario dispara el webhook → **Make crea/actualiza el contacto en Systeme.io** (módulo oficial) con sus etiquetas → las **automatizaciones de Systeme** (regla: "cuando se añade etiqueta X → iniciar campaña Y") hacen el seguimiento por email.
4. El dominio del cliente se conecta directo a Systeme (incluido gratis).

**Veredicto:** perfecto como CRM + email + hosting todo-en-uno para clientes pequeños/medianos. La única pieza externa que sigues necesitando es Make (su plan gratis suele bastar) para puentear el webhook.

---

## OPCIÓN C — WordPress (si el cliente ya lo tiene)

- Crea una página en blanco (plantilla "sin cabecera/footer" del tema, o un tema blank) y pega cada página con un bloque HTML personalizado, o súbelas como archivos estáticos al hosting por FTP.
- Leads: mismo webhook a Make. No instales plugins de formularios: el formulario propio ya funciona.
- **Solo tiene sentido si el WP ya existe.** No montes WordPress nuevo para esto: es más lento, más frágil y sin ventaja.

## OPCIÓN D — Webflow / Framer

- Posible (ambos aceptan custom code embeds), pero pagas mensualidad por sitio y el embed de página completa es incómodo. Elígelo solo si el cliente ya vive en ese ecosistema. Para esta plantilla no aporta nada sobre la Opción A.

---

## CRMs destino (vía Make, cualquiera sirve)

| CRM | Cuándo elegirlo |
|---|---|
| **Systeme.io** | Cliente pequeño/mediano que quiere email marketing + todo-en-uno barato |
| **Brevo** | Solo necesitas email marketing potente + CRM simple, plan gratis generoso |
| **HubSpot Free** | Cliente con equipo de ventas que necesita pipeline de llamadas serio |
| **Google Sheets/Airtable** | Fase de validación: barato, visible, migras después |
| **Close / Pipedrive** | Operación de ventas por llamada de alto volumen |

En todos los casos el payload es el mismo JSON; solo cambia el módulo final en Make. **Guarda siempre una copia en Google Sheets además del CRM** (backup barato de todos los leads con su puntaje).

---

## Calendly bien implementado (lo que a Darsys le faltó)

Su web decía literalmente "(Falta conectar el link de Calendly)". Así se hace completo:

**1. Embed inline en la thank-you page** (no un link que saca al lead de la página):
```html
<div class="calendly-inline-widget" data-url="URL_EVENTO" style="min-width:320px;height:700px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

**2. Prefill — el detalle que multiplica el agendamiento:** el lead ya escribió nombre y email en tu formulario; no le hagas repetirlos. Construye la `data-url` dinámicamente:
```
URL_EVENTO?name={nombre}&email={email}&utm_content=score-alto&utm_campaign={nombre-funnel}
```
Calendly rellena sus campos solo, y los `utm_*` viajan con el evento: el vendedor ve en la invitación **qué score tenía el lead** y de qué funnel vino.

**3. Confirmación dentro de tu página:** escucha el evento del widget para reaccionar cuando agenda:
```js
window.addEventListener('message', (e) => {
  if (e.data?.event === 'calendly.event_scheduled') {
    // mostrar "Llamada agendada ✓ Revisa tu correo" y/o avisar al webhook
  }
});
```

**4. Qué plan de Calendly hace falta:** el **gratis** ya permite embed + prefill + UTMs con 1 tipo de evento (suficiente para empezar). El plan de pago añade recordatorios automáticos por email/SMS (los "workflows") — reducen mucho el no-show en high-ticket; si el cliente no lo paga, monta los recordatorios en Make (evento de Calendly → WhatsApp/email a las 24h y 1h antes).

**Alternativas a Calendly:** **Cal.com** (open source, plan gratis muy completo, embed y prefill equivalentes) o **TidyCal** (pago único ~$29, sin mensualidad — bueno para clientes que no quieren cuotas). El código del prompt maestro funciona con los tres cambiando el embed.

---

## Resumen de decisión rápida
- Tú controlas la web y quieres coste cero → **A (estático + Make)** y CRM el que tenga el cliente.
- El cliente quiere una sola plataforma con email y área de miembros → **B (Systeme.io)** con la página pegada como código y leads vía Make.
- En ambos casos: Calendly embebido con prefill + UTM del score, y router en Make por `valor` (Alto/Medio/Bajo) para etiquetas y seguimientos distintos.
