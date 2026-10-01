/* ===== Initialize GSAP ScrollTrigger ===== */
gsap.registerPlugin(ScrollTrigger);

/* ===== Smooth Scroll with Lenis ===== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ===== Scroll-triggered reveals ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not([data-split])');

  reveals.forEach((el, index) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  });
}

/* ===== Split text reveal (for hero & CTA) ===== */
function initSplitText() {
  const splitElements = document.querySelectorAll('[data-split]');

  splitElements.forEach((el) => {
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ');

    const wordSpans = el.querySelectorAll('.word');

    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2,
    });
  });
}

/* ===== Service cards on scroll ===== */
function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out',
        });
      },
    });
  });
}

/* ===== Case studies stagger ===== */
function initCaseStudies() {
  const cases = document.querySelectorAll('.caso-card');

  gsap.to(cases, {
    scrollTrigger: {
      trigger: '.casos',
      start: 'top center',
    },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
  });
}

/* ===== FAQ Accordion ===== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');

      // Close all others
      faqItems.forEach((otherItem) => {
        otherItem.querySelector('.faq-question').classList.remove('active');
        otherItem.querySelector('.faq-answer').classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
      }
    });
  });

  // Reveal on scroll
  faqItems.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });
  });
}

/* ===== Navigation scroll effect ===== */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  });
}

/* ===== Smooth anchor links ===== */
function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.2,
        });
      }
    });
  });
}

/* ===== Stat counter animation ===== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach((stat) => {
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        const endValue = parseFloat(stat.textContent.replace(/[^\d.]/g, ''));
        const isPercentage = stat.textContent.includes('%');
        const isPlus = stat.textContent.includes('+');

        gsap.to(stat, {
          innerText: endValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            let value = this.targets()[0].innerText;
            if (isPercentage) {
              stat.textContent = Math.round(value) + '%';
            } else if (isPlus) {
              stat.textContent = '+' + Math.round(value) + '%';
            } else {
              stat.textContent = Math.round(value) + '+';
            }
          },
        });
      },
    });
  });
}

/* ===== Mouse move gradient effect ===== */
function initMouseGradient() {
  const cta = document.querySelector('.cta-section');
  if (!cta) return;

  cta.addEventListener('mousemove', (e) => {
    const rect = cta.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cta, {
      '--mouse-x': x + 'px',
      '--mouse-y': y + 'px',
      duration: 0.5,
      overwrite: false,
    });
  });
}

/* ===== Safe initialization wrapper ===== */
function safe(fn, name) {
  try {
    fn();
  } catch (error) {
    console.error(`Error in ${name}:`, error);
  }
}

/* ===== Initialize all on DOM ready ===== */
document.addEventListener('DOMContentLoaded', () => {
  safe(initScrollReveal, 'initScrollReveal');
  safe(initSplitText, 'initSplitText');
  safe(initServiceCards, 'initServiceCards');
  safe(initCaseStudies, 'initCaseStudies');
  safe(initFAQ, 'initFAQ');
  safe(initNavScroll, 'initNavScroll');
  safe(initAnchorLinks, 'initAnchorLinks');
  safe(initStatCounters, 'initStatCounters');
  safe(initMouseGradient, 'initMouseGradient');

  // Refresh ScrollTrigger after all animations are set
  ScrollTrigger.refresh();
});

/* ===== Refresh on window resize ===== */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
