/* ===============================
   MOBILE MENU
=============================== */
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("open");
  });

  document.querySelectorAll(".navlinks a").forEach(link => {
    link.addEventListener("click", () => {
      navlinks.classList.remove("open");
    });
  });
}


/* ===============================
   AUTO YEAR
=============================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ===============================
   REVEAL ANIMATION
=============================== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);


/* ===============================
   MATRIX RAIN EFFECT
=============================== */
const canvas = document.getElementById("matrix");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
  const fontSize = 16;
  const columns = Math.floor(window.innerWidth / fontSize);

  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(2,6,23,0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0,255,213,0.35)";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);
}
