/* Kami's Pet Groomer — main.js (IIFE, no build step) */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); } }

  /* ------------------------------------------------------------------ */
  /* Nav */
  function initNav() {
    var nav = $("[data-nav]");
    var toggle = $("[data-nav-toggle]");
    var links = $("[data-nav-links]");
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", links).forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveals */
  function initReveals() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (typeof IntersectionObserver === "undefined") {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ------------------------------------------------------------------ */
  /* Nav scrollspy — highlight the link matching the section in view */
  function initScrollspy() {
    var links = $$("[data-nav-links] a");
    if (!links.length || typeof IntersectionObserver === "undefined") return;

    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href");
      if (id && id.charAt(0) === "#") map[id.slice(1)] = a;
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  /* ------------------------------------------------------------------ */
  /* GSAP staggered reveal for repeated-item grids (gallery, testimonials, timeline) */
  function initGsapStagger() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var groups = $$("[data-stagger-group]");
    if (!groups.length) return;

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.children);
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: reduced ? 0.3 : 0.6,
        ease: "power2.out",
        stagger: reduced ? 0 : 0.08,
        scrollTrigger: { trigger: group, start: "top 90%" }
      });
    });

    /* Safety net: if ScrollTrigger never fires for a group, force full visibility */
    setTimeout(function () {
      groups.forEach(function (group) {
        var rect = group.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          Array.prototype.slice.call(group.children).forEach(function (el) {
            if (getComputedStyle(el).opacity === "0") { el.style.opacity = "1"; el.style.transform = "none"; }
          });
        }
      });
    }, 8000);
  }

  /* ------------------------------------------------------------------ */
  /* Back to top */
  function initBackToTop() {
    var btn = $("[data-back-to-top]");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Footer year */
  function initYear() {
    var el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* Language toggle: EN (default) / ES — swaps [data-i18n*] content site-wide */
  var LANG_KEY = "kami_lang";
  var currentLang = "en";

  function applyLang(lang) {
    var dict = (window.__I18N__ && window.__I18N__[lang]) || {};
    currentLang = lang;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    $$("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    ["alt", "aria-label", "title", "placeholder"].forEach(function (attr) {
      $$("[data-i18n-" + attr + "]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-" + attr);
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    $$("[data-lang-btn]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function initLangSwitch() {
    var buttons = $$("[data-lang-btn]");
    if (!buttons.length) return;

    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (_) {}
    applyLang(stored === "es" ? "es" : "en");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        if (lang === currentLang) return;
        applyLang(lang);
        try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Agendar cita -> formulario corto -> gracias -> link externo a Woof Gang Bakery */
  function initBookingModal() {
    var dialog = $("#booking-modal");
    if (!dialog || typeof dialog.showModal !== "function") return;

    var form = $("[data-booking-form]", dialog);
    var steps = $$(".modal-step", dialog);
    var dots = $$("[data-step-dot]", dialog);
    var thanksName = $("[data-thanks-name]", dialog);
    var bookingUrl = data.bookingUrl || "https://shop.woofgangbakery.com/202733/booking";

    function goToStep(n) {
      steps.forEach(function (s) { s.classList.toggle("is-active", Number(s.dataset.step) === n); });
      dots.forEach(function (d) { d.classList.toggle("is-active", Number(d.dataset.stepDot) === n); });
    }

    function openModal() {
      form.reset();
      var phone = form.elements.phone;
      if (phone) phone.setCustomValidity("");
      goToStep(1);
      dialog.showModal();
    }
    function closeModal() { dialog.close(); }

    $$("[data-open-modal]").forEach(function (btn) { btn.addEventListener("click", openModal); });
    $$("[data-close-modal]", dialog).forEach(function (btn) { btn.addEventListener("click", closeModal); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeModal(); });

    var bookBtn = $("[data-booking-link]", dialog);
    if (bookBtn) bookBtn.href = bookingUrl;

    /* Nombre / Apellido / Mascota: strip anything that isn't a letter (any language), space, hyphen or apostrophe as they type */
    var NAME_DISALLOWED = /[^\p{L}\p{M}\s'-]/gu;
    ["firstName", "lastName", "petName"].forEach(function (fieldName) {
      var input = form.elements[fieldName];
      if (!input) return;
      input.addEventListener("input", function () {
        var clean = input.value.replace(NAME_DISALLOWED, "");
        if (clean !== input.value) input.value = clean;
      });
    });

    /* Teléfono: keep digits only, auto-format as a US number, cap at 10 digits */
    var phoneInput = form.elements.phone;
    function phoneDigits() { return phoneInput.value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10); }
    function phoneInvalidMsg() {
      var dict = (window.__I18N__ && window.__I18N__[currentLang]) || {};
      return dict["modal.phoneInvalid"] || "Please enter a valid 10-digit US phone number.";
    }
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        var d = phoneDigits();
        var formatted = d;
        if (d.length > 6) formatted = "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
        else if (d.length > 3) formatted = "(" + d.slice(0, 3) + ") " + d.slice(3);
        else if (d.length > 0) formatted = "(" + d;
        phoneInput.value = formatted;
        phoneInput.setCustomValidity(d.length === 10 ? "" : phoneInvalidMsg());
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (phoneInput) phoneInput.setCustomValidity(phoneDigits().length === 10 ? "" : phoneInvalidMsg());
      if (!form.reportValidity()) return;

      var fd = new FormData(form);
      var firstName = (fd.get("firstName") || "").toString().trim();
      var lastName = (fd.get("lastName") || "").toString().trim();
      var petName = (fd.get("petName") || "").toString().trim();
      var phone = (fd.get("phone") || "").toString().trim();

      /* Envío silencioso a Google Forms -> cae como fila nueva en el Sheet conectado.
         mode:"no-cors" es obligatorio (Google no responde con headers CORS); la
         respuesta queda opaca pero el envío sí se registra del lado de Google. */
      var gf = data.googleForm;
      if (gf && gf.action && gf.entries) {
        try {
          var payload = new URLSearchParams();
          payload.append(gf.entries.firstName, firstName);
          payload.append(gf.entries.lastName, lastName);
          payload.append(gf.entries.petName, petName);
          payload.append(gf.entries.phone, phone);
          fetch(gf.action, { method: "POST", mode: "no-cors", body: payload });
        } catch (_) {}
      }

      if (thanksName) thanksName.textContent = firstName ? ", " + firstName : "";
      goToStep(2);
    });
  }

  /* ------------------------------------------------------------------ */
  function boot() {
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initScrollspy, "initScrollspy");
    safe(initBackToTop, "initBackToTop");
    safe(initYear, "initYear");
    safe(initLangSwitch, "initLangSwitch");
    safe(initBookingModal, "initBookingModal");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initGsapStagger, "initGsapStagger");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
