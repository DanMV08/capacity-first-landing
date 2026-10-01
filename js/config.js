/**
 * CONFIG.JS — Todos los textos, URLs y IDs editables
 * Sin programación necesaria: cambia aquí y la página se actualiza
 */

const CONFIG = {
  // ========== GENERAL ==========
  CTA_TEXT: "Aplicar ahora",
  TALLY_URL: "https://tally.so/r/placeholder", // Reemplazar con link real de Tally

  // ========== HEADER ==========
  HEADER: {
    LOGO: "CAPACITY FIRST",
  },

  // ========== HERO ==========
  HERO: {
    SUBTITLE: "Sin tener que usar más de 3 horas de tu semana.",
    // El título está en el HTML con spans de color; acá el copy ya está fijo
  },

  // VTurb embed — pegar el código que da VTurb aquí
  VTURB_EMBED: `
    <!-- Placeholder: pegar aquí el código embed de VTurb -->
  `,

  // Mostrar CTA solo después de X segundos del video (0 = siempre visible)
  CTA_DELAY_SECONDS: 0,

  // ========== MÉTODO ==========
  METHOD: {
    LABEL: "¿DE DÓNDE SALE EL MÉTODO?",
    TITLE: "Si yo desde Cuba, sin recursos, pude hacerlo, tú no tienes excusa para seguirte fallando.",
    QUOTE: "Puedes construir el negocio más grande del mundo. Pero si tu cuerpo no lo puede sostener, tarde o temprano se te va a caer encima.",
    ATTRIBUTION: "CARLOS · FUNDADOR, CAPACITY FIRST",
    IMAGE: "./assets/img/carlos.jpg", // Foto de Carlos ya cargada ✅
  },

  // ========== TESTIMONIOS ==========
  TESTIMONIALS: {
    LABEL: "CASOS DE ÉXITO",
    TITLE: "Esta es la realidad de las personas que ya toman acción",
    SUBTITLE: "EN SUS PROPIAS PALABRAS",
    ITEMS: [
      {
        name: "Petra",
        result: "-50 libras",
        videoUrl: "https://example.com/petra.mp4", // MP4, Vimeo o YouTube URL
        posterUrl: "./assets/img/petra-poster.jpg",
        platform: "mp4", // "mp4", "vimeo", "youtube"
      },
      {
        name: "Gabriel",
        result: "El mejor físico de su vida",
        videoUrl: "https://example.com/gabriel.mp4",
        posterUrl: "./assets/img/gabriel-poster.jpg",
        platform: "mp4",
      },
      {
        name: "Daiji",
        result: "Perdió grasa y ganó músculo, de forma sostenible",
        videoUrl: "https://example.com/daiji.mp4",
        posterUrl: "./assets/img/daiji-poster.jpg",
        platform: "mp4",
      },
      {
        name: "[Nombre]",
        result: "[Resultado]",
        videoUrl: "https://example.com/placeholder.mp4",
        posterUrl: "./assets/img/placeholder-poster.jpg",
        platform: "mp4",
      },
      {
        name: "[Nombre]",
        result: "[Resultado]",
        videoUrl: "https://example.com/placeholder.mp4",
        posterUrl: "./assets/img/placeholder-poster.jpg",
        platform: "mp4",
      },
      {
        name: "[Nombre]",
        result: "[Resultado]",
        videoUrl: "https://example.com/placeholder.mp4",
        posterUrl: "./assets/img/placeholder-poster.jpg",
        platform: "mp4",
      },
    ],
  },

  // ========== PROBLEMAS ==========
  PROBLEMS: {
    TITLE: "¿A ti también te pasa?",
    ITEMS: [
      {
        affirmation: "Vives cansado todo el día",
        innerVoice: "Necesito tirarme en el sofá cuando llegue a casa.",
      },
      {
        affirmation: "Entrenas unos días y después lo dejas",
        innerVoice: "Esta semana no fui, pero el mes que viene vuelvo todos los días.",
      },
      {
        affirmation: "Te duele todo el cuerpo",
        innerVoice: "Será la edad, ya qué le voy a hacer.",
      },
      {
        affirmation: "Duermes, pero no descansas",
        innerVoice: "Me despierto más cansado que cuando me acosté.",
      },
      {
        affirmation: "No sabes ni por dónde empezar con tanta información",
        innerVoice: "Todo el mundo dice algo distinto.",
      },
      {
        affirmation: "Sientes que no tienes tiempo para ti",
        innerVoice: "No tengo tiempo entre el trabajo y el hogar.",
      },
      {
        affirmation: "Cada vez que fallas una semana, lo vives como un fracaso",
        innerVoice: "Otra vez lo mismo. Ya ni sé para qué lo intento.",
      },
    ],
  },

  // ========== CTA FINAL ==========
  FINAL_CTA: {
    LABEL: "ÚLTIMA OPORTUNIDAD",
    TITLE: "¿Vas a seguir postergándolo, o vas a tomar acción de una vez por todas?",
    TEXT: "Cupos limitados. Solo trabajo con personas comprometidas a hacer el cambio de verdad.",
  },

  // ========== FOOTER ==========
  FOOTER: {
    BRAND: "Carlos · Capacity First",
    DESCRIPTION: "Transformación corporal sin tiempo.",
    PRIVACY_URL: "#",
    LEGAL_URL: "#",
    CONTACT_URL: "#",
  },

  // ========== TRACKING ==========
  TRACKING: {
    META_PIXEL_ID: "", // ej: "123456789"
    GA4_ID: "", // ej: "G-XXXXXXXXXX"
  },
};

// Exportar para uso en main.js y tracking.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
