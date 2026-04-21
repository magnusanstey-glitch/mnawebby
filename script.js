// Registrera ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation för hero
gsap.from(".hero h1", { y: 50, opacity: 0, duration: 1 });
gsap.from(".hero p", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
gsap.from(".cta a", { opacity: 0, y: 20, duration: 1, delay: 0.6, stagger: 0.3 });

// Scroll-triggerade animationer
gsap.from(".trust-item", {
  scrollTrigger: ".trust",
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.3
});

gsap.from(".grid .card", {
  scrollTrigger: ".grid",
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.2
});

gsap.from(".section h2", {
  scrollTrigger: ".section h2",
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2
});

gsap.from(".section p, .section ul", {
  scrollTrigger: ".section",
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.2
});

gsap.from(".team-grid .member", {
  scrollTrigger: ".team-grid",
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.2
});

gsap.from(".testimonial", {
  scrollTrigger: ".testimonials",
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.3
});

gsap.from(".contact-container", {
  scrollTrigger: ".contact-container",
  opacity: 0,
  y: 30,
  duration: 1
});

  
const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});


