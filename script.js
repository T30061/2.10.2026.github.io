document.documentElement.classList.add("has-js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroElements = document.querySelectorAll(
  ".hero .eyebrow, .hero h1, .hero .hero-role, .hero .hero-intro, .hero .hero-actions, .hero .hero-visual, .hero .hero-bottom"
);

if (!prefersReducedMotion && typeof Element.prototype.animate === "function") {
  heroElements.forEach((element, index) => {
    element.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 620,
        delay: index * 85,
        easing: "cubic-bezier(.2, .7, .2, 1)",
        fill: "both",
      }
    );
  });
}

const revealItems = document.querySelectorAll(".reveal");

if (!("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--reveal-delay", `${index * 70}ms`);
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}