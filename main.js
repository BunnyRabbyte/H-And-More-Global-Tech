document.addEventListener("DOMContentLoaded", () => {
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

  // Highlight active nav link
  const current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll("nav a[data-page]").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active-nav");
    }
  });

  // Dynamic year for footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
