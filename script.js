window.addEventListener('load', () => {
 
  // ---------- Mobile Nav ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
 
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
 
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }
 
  // ---------- Scroll Fade-in (ENDAST för element som INTE animeras av GSAP) ----------
  // Team-member och testimonial sköts av GSAP nedan – ta INTE med dem här
  const fadeEls = document.querySelectorAll(
    '.fade-in:not(.team-member):not(.testimonial):not(.card):not(.trust-item)'
  );
 
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
 
    fadeEls.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 80;
      observer.observe(el);
    });
  }
 
  // ---------- GSAP Animations ----------
  if (typeof gsap !== 'undefined') {
 
    // Hero startsida
    if (document.querySelector('.hero')) {
      gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero h1',    { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.35 });
      gsap.from('.hero p',     { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.5 });
      gsap.from('.cta',        { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.65 });
    }
 
    // Hero undersidor
    if (document.querySelector('.hero-sub')) {
      gsap.from('.hero-sub .hero-badge', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', delay: 0.15 });
      gsap.from('.hero-sub h2',          { opacity: 0, y: 28, duration: 0.75, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-sub p',           { opacity: 0, y: 16, duration: 0.65, ease: 'power3.out', delay: 0.45 });
    }
 
    // ScrollTrigger-animationer
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
 
      // Trust-bar (startsida)
      if (document.querySelector('.trust-item')) {
        gsap.from('.trust-item', {
          scrollTrigger: { trigger: '.trust', start: 'top 88%' },
          opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease: 'power3.out'
        });
      }
 
      // Tjänstekort
      if (document.querySelector('.card')) {
        gsap.from('.card', {
          scrollTrigger: { trigger: '.grid', start: 'top 88%' },
          opacity: 0, y: 40, stagger: 0.12, duration: 0.65, ease: 'power3.out'
        });
      }
 
      if (document.querySelector('.team-member')) {
        gsap.set('.team-member', { opacity: 0, y: 40 });
        gsap.to('.team-member', {
          scrollTrigger: { trigger: '.team-grid', start: 'top 88%' },
          opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out'
        });
      }
 
      if (document.querySelector('.testimonial')) {
        gsap.set('.testimonial', { opacity: 0, y: 40 });
        gsap.to('.testimonial', {
          scrollTrigger: { trigger: '.testimonials', start: 'top 88%' },
          opacity: 1, y: 0, stagger: 0.18, duration: 0.75, ease: 'power3.out'
        });
      }
 
      // Service blocks
      if (document.querySelector('.service-block-content')) {
        gsap.from('.service-block-content', {
          scrollTrigger: { trigger: '.service-block', start: 'top 82%' },
          opacity: 0, x: -30, duration: 0.7, ease: 'power3.out'
        });
      }
    }
 
  } else {
    // Fallback om GSAP inte laddas – visa allt direkt
    document.querySelectorAll('.team-member, .testimonial, .card, .trust-item, .fade-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
 
  // ---------- Navbar Scroll Effect ----------
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(8,13,22,0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      } else {
        nav.style.background = '';
        nav.style.boxShadow = '';
      }
    }, { passive: true });
  }
 
  // ---------- Kontaktformulär ----------
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.textContent = 'Skickar...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Skicka meddelande →';
          btn.style.opacity = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }
 
  // ---------- Aktiv nav-länk ----------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.style.color = 'var(--white)';
    }
  });
 
});
 
