# Kami's Pet Groomer — Guía de entrega

## Ver el sitio
- Ya está corriendo en modo local en tu preview.
- Para abrirlo directo: doble clic en `index.html` (funciona sin servidor también).
- Para subirlo: arrastra **toda la carpeta** `kamis-pet-groomer` al administrador de archivos de Hostinger (o cualquier hosting), dentro de `public_html`. Incluye el archivo `.htaccess` (empieza con punto, puede estar oculto en tu explorador de archivos — actívalo con "mostrar archivos ocultos").

## Agendar cita — formulario corto + Woof Gang Bakery

Los 3 botones "Agendar cita" del sitio (header, hero y CTA final) abren un modal con un formulario corto: Nombre, Apellido, Mascota y Teléfono. Al enviarlo:

1. Se abre automáticamente el cliente de correo del visitante con un mensaje pre-armado a `lluviakamila@gmail.com` con los datos que llenó (esto es un **envío del lado del cliente vía `mailto:`** — no hay backend ni base de datos detrás, así que si el visitante no tiene un programa de correo configurado en su dispositivo, ese paso no hace nada visible. Ver "Próximo paso recomendado" abajo).
2. Se muestra una pantalla de agradecimiento personalizada ("¡Gracias, {nombre}!") con un botón que lleva a la página oficial de reservas de Woof Gang Bakery: `https://shop.woofgangbakery.com/202733/booking`, con la instrucción de seleccionar a **Lluvia Véliz** como groomer.

Ese link vive en un solo lugar del código — `lib/manifest.js`, propiedad `bookingUrl`:

```js
bookingUrl: "https://shop.woofgangbakery.com/202733/booking",
```

### ⚠️ Próximo paso recomendado — captura de datos confiable
El `mailto:` es un parche de cero-configuración, pero depende de que el navegador del cliente tenga una app de correo por defecto — en muchos celulares no la tiene. Para no perder leads, recomiendo conectar el formulario a un servicio gratuito tipo:
- **Formspree** o **Getform** (gratis hasta cierto volumen, solo pegas un endpoint) — el formulario te llega por email de forma confiable sin depender del cliente de correo del visitante.
- O una automatización con **Zapier/Make** que guarde cada envío en una Google Sheet.

Cuando quieras, puedo conectarlo — solo necesito que crees una cuenta gratis en el servicio que prefieras y me pases el endpoint/API key.

## Dónde editar contenido
- **Precios (matriz por tamaño), Gatos, testimonios/casos, experiencia, horario**: casi todo está directamente en `index.html` (búscalo por texto o por el `id` de la sección: `#servicios`, `#clientes`, `#experiencia`).
- **Datos de contacto y el link de Woof Gang**: en `lib/manifest.js`.
- Para cambiar fotos, reemplaza los archivos en `assets/img/` manteniendo el mismo nombre, o edita las rutas `src="assets/img/..."` en `index.html`.
- **Galería "Antes y después"** (`#galeria`): son 16 parejas de placeholders. Reemplaza cada `<div class="ba-slot">` por una imagen real cuando la tengas.

## Notas menores
- El mapa de Google del footer puede no cargar dentro de la vista previa de este entorno (bloqueo del sandbox de preview) — en el hosting real (Hostinger/Netlify) carga con normalidad, sin necesidad de tocar nada.
- Cada vez que cambies `styles.css` o `main.js` y subas al hosting, actualiza también el número `?v=` en `index.html` por la fecha del día, para evitar que el navegador muestre una versión vieja en caché.
