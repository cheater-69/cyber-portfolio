/* =========================
   MOBILE MENU
========================= */
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


/* =========================
   AUTO YEAR
========================= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =========================
   REVEAL ANIMATION
========================= */
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


/* =========================
   SCROLL PROGRESS BAR
========================= */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;

  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = progress + "%";
});


/* =========================
   LOADER SAFE REMOVAL
========================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.remove();
    }, 500);
  }
});


/* =========================
   MATRIX RAIN (OPTIMIZED)
========================= */

const canvas = document.getElementById("matrix");

if (canvas && window.innerWidth > 768) {  // disable on small phones for stability
  const ctx = canvas.getContext("2d");

  let columns;
  let drops;
  const fontSize = 16;
  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(14,165,233,0.35)";
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

  function animateMatrix() {
    draw();
    requestAnimationFrame(animateMatrix);
  }

  animateMatrix();
}
