/**
 * TRACKING.JS — Medición de eventos (UTMs, Pixel, GA4)
 * Integración con Meta Pixel y Google Analytics 4
 */

document.addEventListener('DOMContentLoaded', function () {
  initializeTracking();
});

/**
 * Inicializar tracking
 */
function initializeTracking() {
  // Meta Pixel
  if (CONFIG.TRACKING.META_PIXEL_ID && CONFIG.TRACKING.META_PIXEL_ID.trim()) {
    loadMetaPixel();
  }

  // Google Analytics 4
  if (CONFIG.TRACKING.GA4_ID && CONFIG.TRACKING.GA4_ID.trim()) {
    loadGA4();
  }

  // Event listeners para tracking
  trackCTAClicks();
}

/**
 * Cargar Meta Pixel
 */
function loadMetaPixel() {
  const pixelId = CONFIG.TRACKING.META_PIXEL_ID;

  window.fbq =
    window.fbq ||
    function () {
      (window.fbq.q = window.fbq.q || []).push(arguments);
    };

  window.fbq('init', pixelId);
  fbq('track', 'PageView');

  // Script del pixel
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  console.log('[Tracking] Meta Pixel inicializado:', pixelId);
}

/**
 * Cargar Google Analytics 4
 */
function loadGA4() {
  const gaId = CONFIG.TRACKING.GA4_ID;

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId, {
    anonymize_ip: true,
    allow_google_signals: false,
  });

  // Script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  console.log('[Tracking] Google Analytics 4 inicializado:', gaId);
}

/**
 * Rastrear clics en CTA
 */
function trackCTAClicks() {
  const buttons = [
    { el: document.getElementById('ctaHero'), position: 'hero' },
    { el: document.getElementById('ctaFinal'), position: 'final' },
    { el: document.getElementById('ctaSticky'), position: 'sticky_mobile' },
    { el: document.querySelector('.header__cta'), position: 'header' },
  ];

  buttons.forEach(({ el, position }) => {
    if (el) {
      el.addEventListener('click', () => {
        trackCTAEvent(position);
      });
    }
  });
}

/**
 * Rastrear evento de CTA click
 */
function trackCTAEvent(position) {
  const params = { position: position };

  // Meta Pixel
  if (window.fbq) {
    fbq('track', 'Lead', { content_name: `CTA_${position}` });
  }

  // GA4
  if (window.gtag) {
    gtag('event', 'cta_click', params);
  }

  console.log('[Tracking] CTA click:', params);
}

/**
 * Rastrear reproducción de videos de testimonios
 */
window.trackEvent = function (eventName, params = {}) {
  // Meta Pixel - custom event
  if (window.fbq) {
    fbq('trackCustom', eventName, params);
  }

  // GA4
  if (window.gtag) {
    gtag('event', eventName, params);
  }

  console.log(`[Tracking] ${eventName}:`, params);
};

/**
 * Obtener y pasar UTMs a Tally (si está disponible)
 */
function injectUTMsToTally() {
  const tallyLink = CONFIG.TALLY_URL;
  if (!tallyLink) return;

  const urlParams = new URLSearchParams(window.location.search);
  const utm = {
    source: urlParams.get('utm_source') || 'direct',
    medium: urlParams.get('utm_medium') || 'landing',
    campaign: urlParams.get('utm_campaign') || 'capacityfirst',
    content: urlParams.get('utm_content') || '',
  };

  // Guardar en sessionStorage para referencia
  sessionStorage.setItem(
    'utm_params',
    JSON.stringify(utm)
  );

  console.log('[Tracking] UTM parameters:', utm);
}

// Ejecutar al cargar
injectUTMsToTally();

/**
 * Tracking de página con UTMs (para GA4)
 */
document.addEventListener('DOMContentLoaded', function () {
  if (window.gtag) {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParams = {
      utm_source: urlParams.get('utm_source') || 'direct',
      utm_medium: urlParams.get('utm_medium') || 'landing',
      utm_campaign: urlParams.get('utm_campaign') || 'capacityfirst',
      utm_content: urlParams.get('utm_content') || '',
    };

    gtag('event', 'page_view', pageParams);
  }
});
