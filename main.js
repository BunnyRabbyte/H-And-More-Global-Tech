document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile nav toggle ---
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a[data-page]").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // --- Highlight active nav link ---
  const current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll("nav a[data-page]").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active-nav");
    }
  });

  // --- Dynamic year in footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Scroll reveal animations ---
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-fade"
  );

  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealEls.forEach(el => observer.observe(el));
  } else if (revealEls.length) {
    // Fallback: show everything if browser doesn't support IntersectionObserver
    revealEls.forEach(el => el.classList.add("reveal-visible"));
  }

  // --- Site Survey -> WhatsApp integration ---
  const surveyForm = document.getElementById("siteSurveyForm");
  if (surveyForm) {
    surveyForm.addEventListener("submit", (e) => {
      e.preventDefault(); // don't reload page

      const name = (document.getElementById("name")?.value || "").trim();
      const phone = (document.getElementById("phone")?.value || "").trim();
      const location = (document.getElementById("location")?.value || "").trim();
      const service = (document.getElementById("service")?.value || "").trim();
      const details = (document.getElementById("details")?.value || "").trim();

      let text = "New Site Survey Request - H & More Global Tech\n\n";
      if (name)      text += `Name: ${name}\n`;
      if (phone)     text += `Phone: ${phone}\n`;
      if (location)  text += `Location: ${location}\n`;
      if (service)   text += `Service Type: ${service}\n`;
      if (details)   text += `\nDetails:\n${details}\n`;

      // Nigerian WhatsApp number in international format (no leading 0, no '+')
      const whatsappNumber = "2347038947737";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      // Open WhatsApp (mobile app or WhatsApp Web)
      window.open(url, "_blank");
    });
  }
});
