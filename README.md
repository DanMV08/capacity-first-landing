# Capacity First — Landing VSL

Landing page de conversión estática para el método Capacity First de Carlos.

## 📁 Estructura

```
/
├── index.html                 # Página principal
├── css/
│   └── styles.css            # Estilos y sistema de diseño
├── js/
│   ├── config.js             # ⭐ Todos los textos y links
│   ├── main.js               # Lógica de la página
│   └── tracking.js           # Medición (Meta Pixel, GA4)
├── assets/
│   ├── img/                  # Imágenes, posters, logos
│   └── fonts/                # (opcional)
└── README.md                 # Este archivo
```

## ✏️ Cómo editar textos y links

**Todos los textos, URLs e IDs de tracking viven en `js/config.js`.**

No es necesario tocar `index.html` ni los archivos CSS para cambiar textos. Abre `config.js` y busca lo que quieras cambiar:

### Ejemplos

#### Cambiar el botón CTA
```javascript
CTA_TEXT: "Aplicar ahora",  // ← Cambiar aquí
```

#### Cambiar el link de Tally
```javascript
TALLY_URL: "https://tally.so/r/nXL23Jw",  // ← Pegar link real aquí
```

#### Cambiar subtitle del Hero
```javascript
HERO: {
  SUBTITLE: "Sin tener que usar más de 3 horas de tu semana.",  // ← Editar aquí
}
```

#### Cambiar un testimonio
```javascript
TESTIMONIALS: {
  ITEMS: [
    {
      name: "Petra",                          // ← Nombre
      result: "-50 libras",                   // ← Resultado
      videoUrl: "https://example.com/petra.mp4",  // ← Video
      posterUrl: "./assets/img/petra-poster.jpg", // ← Poster
      platform: "mp4",                        // "mp4", "vimeo", o "youtube"
    },
    // ... más testimonios
  ]
}
```

#### Activar Meta Pixel y GA4
```javascript
TRACKING: {
  META_PIXEL_ID: "123456789",  // ← Tu ID de Meta
  GA4_ID: "G-XXXXXXXXXX",      // ← Tu ID de GA4
}
```

## 🎬 Cómo insertar el embed de VTurb

1. Ve a tu panel de VTurb
2. Copia el código embed del video
3. Pégalo en `config.js`:

```javascript
VTURB_EMBED: `
  <iframe src="https://..." width="..." height="..."></iframe>
  <!-- O el código que te dé VTurb -->
`,
```

Si no tienes el embed aún, déjalo vacío:
```javascript
VTURB_EMBED: ``,
```

La página mostrará un placeholder hasta que lo agregues.

## 📸 Cómo agregar/cambiar imágenes

1. Coloca las imágenes en `/assets/img/`
2. Actualiza las rutas en `config.js`:

```javascript
METHOD: {
  IMAGE: "./assets/img/carlos.jpg",  // ← Ruta de la foto
}

TESTIMONIALS: {
  ITEMS: [
    {
      posterUrl: "./assets/img/petra-poster.jpg",  // ← Poster del testimonio
    }
  ]
}
```

### Imagen Open Graph (para compartir en WhatsApp/IG)
Coloca una imagen de 1200×630px en `/assets/img/og-image.jpg`.

## 🎨 Cómo cambiar colores (CSS)

En `css/styles.css`, busca `:root`:

```css
:root {
  --bg: #0B0B0D;           /* Fondo principal */
  --bg-wood: #1F1611;      /* Fondo secundario */
  --gold: #E4A731;         /* Color principal */
  --gold-bright: #F5C458;  /* Acentos brillantes */
  --white: #FFFFFF;        /* Texto */
  --muted: #C9C2B8;        /* Texto secundario */
}
```

Cambia los valores hexadecimales. Todos los elementos usarán automáticamente los nuevos colores.

## 📊 Cómo ver los UTMs en Tally

En Tally, configura hidden fields para recibir:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

La landing automáticamente:
1. Lee los UTMs de la URL (ej: `?utm_source=instagram&utm_medium=story`)
2. Los pasa al link de Tally (opcional)
3. Los registra en Meta Pixel y GA4

## 🚀 Cómo desplegar

### Opción 1: Netlify (recomendado)

1. Crea cuenta en [netlify.com](https://netlify.com)
2. Conecta tu repositorio Git
3. Netlify detecta automáticamente que es un sitio estático
4. Deploy automático en cada push

### Opción 2: Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Importa el repositorio
3. Vercel despliega automáticamente

### Opción 3: Hostinger / Hosting estático

1. Descarga los archivos localmente
2. Sube vía FTP o panel del hosting:
   - `index.html`
   - `/css/`
   - `/js/`
   - `/assets/`
3. Apunta el dominio al hosting

## ✅ Checklist antes de lanzar

- [ ] Link de Tally actualizado en `config.js`
- [ ] Embed de VTurb insertado
- [ ] Foto de Carlos agregada
- [ ] 6 testimonios con videos y posters
- [ ] Imágenes en WebP (para velocidad)
- [ ] Open Graph image (og-image.jpg)
- [ ] Meta Pixel ID configurado
- [ ] GA4 ID configurado
- [ ] Links de política, legal y contacto en footer
- [ ] Testeado en móvil, tablet y desktop
- [ ] Lighthouse ≥ 90 en Performance

## 🔍 Debug

### Ver logs de tracking
Abre la consola del navegador (`F12`) y haz clic en un botón CTA. Deberías ver:
```
[Tracking] cta_click {position: "hero"}
```

### Si el video de VTurb no aparece
1. Verifica que el embed en `config.js` esté correcto
2. Abre DevTools → Pestaña Network → recarga
3. Busca la URL de VTurb. Si hay error 403/404, revisa el embed

### Si los testimonios no se cargan
1. Verifica que los archivos existan:
   - `./assets/img/petra-poster.jpg`
   - Que el URL del video sea accesible
2. Abre DevTools → Pestaña Network → busca 404s

## 📝 Licencia

Privado. No distribuir sin autorización.

---

**¿Preguntas?** Contacta a Carlos o al equipo técnico.
