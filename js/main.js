/**
 * MAIN.JS — Lógica completa de la página
 * Carga de config, generación de contenido, animaciones, interacción
 */

let currentPlayingVideo = null;

document.addEventListener('DOMContentLoaded', function () {
  initializeConfig();
  initializeTestimonials();
  initializeProblems();
  setupHeaderScroll();
  setupStickyCTA();
  setupScrollAnimations();
  setupModalVideos();
});

/**
 * Inicializar config: llenar todos los textos desde CONFIG
 */
function initializeConfig() {
  // Header
  const ctaButtons = document.querySelectorAll('#ctaText, #ctaHeroText, #ctaStickyText, #ctaFinalText');
  ctaButtons.forEach(btn => {
    btn.textContent = CONFIG.CTA_TEXT;
  });

  // Hero
  document.getElementById('heroSubtitle').textContent = CONFIG.HERO.SUBTITLE;

  // VTurb embed
  if (CONFIG.VTURB_EMBED && CONFIG.VTURB_EMBED.trim()) {
    document.getElementById('vturb-embed').innerHTML = CONFIG.VTURB_EMBED;
  }

  // Método
  document.getElementById('methodLabel').textContent = CONFIG.METHOD.LABEL;
  document.getElementById('methodTitle').textContent = CONFIG.METHOD.TITLE;
  document.getElementById('methodQuote').textContent = CONFIG.METHOD.QUOTE;
  document.getElementById('methodAttribution').textContent = CONFIG.METHOD.ATTRIBUTION;

  const methodImage = document.getElementById('methodImage');
  if (CONFIG.METHOD.IMAGE) {
    methodImage.style.backgroundImage = `url('${CONFIG.METHOD.IMAGE}')`;
  }

  // Testimonios
  document.getElementById('testimonialsLabel').textContent = CONFIG.TESTIMONIALS.LABEL;
  document.getElementById('testimonialsTitle').textContent = CONFIG.TESTIMONIALS.TITLE;
  document.getElementById('testimonialsSubtitle').textContent = CONFIG.TESTIMONIALS.SUBTITLE;

  // Problemas
  document.getElementById('problemsTitle').textContent = CONFIG.PROBLEMS.TITLE;

  // CTA Final
  document.getElementById('finalCtaLabel').textContent = CONFIG.FINAL_CTA.LABEL;
  document.getElementById('finalCtaTitle').textContent = CONFIG.FINAL_CTA.TITLE;
  document.getElementById('finalCtaText').textContent = CONFIG.FINAL_CTA.TEXT;

  // Footer
  document.getElementById('footerBrand').textContent = CONFIG.FOOTER.BRAND;
  document.getElementById('privacyLink').href = CONFIG.FOOTER.PRIVACY_URL;
  document.getElementById('legalLink').href = CONFIG.FOOTER.LEGAL_URL;
  document.getElementById('contactLink').href = CONFIG.FOOTER.CONTACT_URL;

  // Vincular botones CTA a Tally
  attachCtaListeners();
}

/**
 * Generar cards de testimonios
 */
function initializeTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = '';

  CONFIG.TESTIMONIALS.ITEMS.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'testimonials-grid__card';
    card.setAttribute('data-index', index);
    card.setAttribute('data-video-url', item.videoUrl);
    card.setAttribute('data-platform', item.platform);
    card.setAttribute('aria-label', `Testimonio de ${item.name}`);
    card.role = 'button';
    card.tabIndex = 0;

    card.innerHTML = `
      <img
        src="${item.posterUrl}"
        alt="${item.name} - ${item.result}"
        class="testimonials-grid__card-image"
        loading="lazy"
        width="300"
        height="533"
      />
      <div class="testimonials-grid__card-play"></div>
      <div class="testimonials-grid__card-info">
        <div class="testimonials-grid__card-name">${item.name}</div>
        <div class="testimonials-grid__card-result">${item.result}</div>
      </div>
    `;

    card.addEventListener('click', () => playTestimonialVideo(item, index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playTestimonialVideo(item, index);
      }
    });

    grid.appendChild(card);
  });
}

/**
 * Generar filas de problemas
 */
function initializeProblems() {
  const container = document.getElementById('problemsRows');
  container.innerHTML = '';

  CONFIG.PROBLEMS.ITEMS.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'problems-section__row';
    row.setAttribute('data-scroll', 'true');

    row.innerHTML = `
      <div class="problems-section__affirmation">${item.affirmation}</div>
      <div class="problems-section__row-divider"></div>
      <div class="problems-section__inner-voice">«${item.innerVoice}»</div>
    `;

    container.appendChild(row);
  });
}

/**
 * Reproducir video de testimonio
 */
function playTestimonialVideo(item, index) {
  const modal = document.getElementById('videoModal');
  const wrapper = document.getElementById('videoWrapper');

  wrapper.innerHTML = '';

  if (item.platform === 'youtube') {
    const videoId = extractYouTubeId(item.videoUrl);
    wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen allow="autoplay"></iframe>`;
  } else if (item.platform === 'vimeo') {
    const videoId = extractVimeoId(item.videoUrl);
    wrapper.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" allowfullscreen allow="autoplay"></iframe>`;
  } else {
    wrapper.innerHTML = `<video autoplay controls style="width: 100%; height: 100%;"><source src="${item.videoUrl}" type="video/mp4"></video>`;
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  currentPlayingVideo = index;

  // Tracking
  trackEvent('testimonial_play', { name: item.name, index: index });
}

/**
 * Cerrar modal de video
 */
function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentPlayingVideo = null;
}

/**
 * Setup del modal de videos
 */
function setupModalVideos() {
  const modal = document.getElementById('videoModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeVideoModal);
  overlay.addEventListener('click', closeVideoModal);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

/**
 * Extraer ID de YouTube
 */
function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

/**
 * Extraer ID de Vimeo
 */
function extractVimeoId(url) {
  const regExp = /(?:www\.)?vimeo.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

/**
 * Vincular botones CTA a Tally
 */
function attachCtaListeners() {
  const buttons = [
    document.querySelector('.header__cta'),
    document.getElementById('ctaHero'),
    document.getElementById('ctaFinal'),
    document.getElementById('ctaSticky'),
  ];

  buttons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const position = btn.id === 'ctaHero' ? 'hero'
                        : btn.id === 'ctaFinal' ? 'final'
                        : btn.id === 'ctaSticky' ? 'sticky_mobile'
                        : 'header';
        redirectToTally(position);
      });
    }
  });
}

/**
 * Redirigir a Tally con UTMs
 */
function redirectToTally(position) {
  let url = CONFIG.TALLY_URL;

  if (url && url !== 'https://tally.so/r/placeholder') {
    // Leer UTMs de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = new URLSearchParams();

    const utm_source = urlParams.get('utm_source') || 'direct';
    const utm_medium = urlParams.get('utm_medium') || 'landing';
    const utm_campaign = urlParams.get('utm_campaign') || 'capacityfirst';
    const utm_content = urlParams.get('utm_content') || position;

    // Agregar como parámetros a Tally (si el URL lo soporta)
    if (url.includes('?')) {
      url += `&utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}&utm_content=${utm_content}`;
    } else {
      url += `?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}&utm_content=${utm_content}`;
    }

    window.location.href = url;
  } else {
    console.warn('TALLY_URL no está configurada');
  }
}

/**
 * Detectar si header debe tener background (scroll)
 */
function setupHeaderScroll() {
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPos = window.scrollY;

    if (scrollPos > heroBottom - 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mostrar/ocultar barra CTA fija en móvil
 */
function setupStickyCTA() {
  const stickyCtaEl = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');
  const finalCta = document.getElementById('finalCta');

  if (window.innerWidth > 768) {
    stickyCtaEl.classList.add('hidden');
    return;
  }

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const finalCtaTop = finalCta.offsetTop;
    const scrollPos = window.scrollY;

    // Mostrar después de pasar el Hero
    if (scrollPos > heroBottom && scrollPos < finalCtaTop) {
      stickyCtaEl.classList.remove('hidden');
      stickyCtaEl.classList.add('visible');
    } else {
      stickyCtaEl.classList.remove('visible');
      stickyCtaEl.classList.add('hidden');
    }
  });
}

/**
 * Setup de animaciones con Scroll (IntersectionObserver)
 */
function setupScrollAnimations() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Solo animar una vez
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observar todos los elementos con data-scroll
  document.querySelectorAll('[data-scroll]').forEach((el) => {
    observer.observe(el);
  });

  // Observar secciones
  document.querySelectorAll('.method-section, .problems-section, .final-cta-section').forEach((section) => {
    if (!section.hasAttribute('data-scroll')) {
      section.setAttribute('data-scroll', 'true');
      observer.observe(section);
    }
  });
}

/**
 * Evento personalizado de tracking
 */
function trackEvent(eventName, params = {}) {
  if (CONFIG.TRACKING.META_PIXEL_ID && window.fbq) {
    if (eventName === 'cta_click') {
      fbq('track', 'Lead');
    }
  }

  if (CONFIG.TRACKING.GA4_ID && window.gtag) {
    gtag('event', eventName, params);
  }

  console.log(`[Tracking] ${eventName}`, params);
}

// Inicializar tracking al cargar
document.addEventListener('DOMContentLoaded', function () {
  if (CONFIG.TRACKING.META_PIXEL_ID && window.fbq) {
    fbq('track', 'PageView');
  }

  if (CONFIG.TRACKING.GA4_ID && window.gtag) {
    gtag('event', 'page_view');
  }
});
