// Header entrance
gsap.from("header", { duration: 1, y: -60, opacity: 0, ease: "power2.out" });
gsap.from(".content h2", { duration: 1, x: -120, opacity: 0, delay: 0.4, ease: "power3.out" });
gsap.from(".content p", { duration: 1, x: 120, opacity: 0, delay: 0.7, ease: "power3.out" });
gsap.from(".btn", { duration: 0.8, scale: 0.8, opacity: 0, delay: 1.1, ease: "back.out(1.4)" });

// animate cards on hover already via CSS; animate on scroll using IntersectionObserver + GSAP
const sections = document.querySelectorAll('.section');

const obsOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, { duration: 0.9, opacity: 1, y: 0, ease: "power3.out", overwrite: true });
      observer.unobserve(entry.target);
    } else {
      // initially set offset for hidden sections
      gsap.set(entry.target, { opacity: 0, y: 40 });
    }
  });
}, obsOptions);

sections.forEach(sec => observer.observe(sec));
