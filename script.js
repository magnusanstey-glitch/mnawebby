 
document.addEventListener('DOMContentLoaded', () => {
 
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
 
    // Close on link click
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
 
  // ---------- Scroll Fade-in ----------
  const fadeEls = document.querySelectorAll('.fade-in');
 
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
 
    fadeEls.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 80;
      observer.observe(el);
    });
  }
 
  // ---------- GSAP Animations (if available) ----------
  if (typeof gsap !== 'undefined') {
    // Hero entrance
    gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.2 });
    gsap.from('.hero h1',    { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    gsap.from('.hero p',     { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.6 });
    gsap.from('.cta',        { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.75 });
 
    // Hero sub-page entrance
    gsap.from('.hero-sub h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    gsap.from('.hero-sub p',  { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.5 });
 
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
 
      // Trust bar
      gsap.from('.trust-item', {
        scrollTrigger: { trigger: '.trust', start: 'top 85%' },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease: 'power3.out'
      });
 
      // Cards
      gsap.from('.card', {
        scrollTrigger: { trigger: '.grid', start: 'top 85%' },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.65, ease: 'power3.out'
      });
 
      // Team members
      gsap.from('.team-member', {
        scrollTrigger: { trigger: '.team-grid', start: 'top 85%' },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.65, ease: 'power3.out'
      });
 
      // Testimonials
      gsap.from('.testimonial', {
        scrollTrigger: { trigger: '.testimonials', start: 'top 85%' },
        opacity: 0, y: 40, stagger: 0.15, duration: 0.7, ease: 'power3.out'
      });
 
      // Service blocks
      gsap.from('.service-block-content', {
        scrollTrigger: { trigger: '.service-block', start: 'top 80%' },
        opacity: 0, x: -30, duration: 0.7, ease: 'power3.out'
      });
    }
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
 
  // ---------- Contact Form ----------
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      const btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.textContent = 'Skickar...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
      // Formspree handles the actual submission
      // Re-enable after 3s as fallback
      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Skicka meddelande →';
          btn.style.opacity = '';
          btn.disabled = false;
        }
      }, 3000);
    });
  }
 
  // ---------- Active Nav Link ----------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.style.color = 'var(--white)';
    }
  });
 
});
