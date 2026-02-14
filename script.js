/* =========================
   MOBILE NAV MENU
========================= */
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("open");
  });

  // close menu after click (mobile)
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
   REVEAL ANIMATION (SAFE)
========================= */
const reveals = document.querySelectorAll(".reveal");

function revealFallback() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("show");
    }
  });
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => io.observe(el));
} else {
  // fallback for older/mobile browsers
  window.addEventListener("scroll", revealFallback);
  revealFallback();
}


/* =========================
   LOAD PROJECTS FROM JSON
========================= */
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  try {
    const res = await fetch("projects.json");
    const data = await res.json();

    grid.innerHTML = "";

    data.projects.forEach(p => {
      const el = document.createElement("div");
      el.className = "card project";

      const tags = p.stack.map(t => `<span class="tag">${t}</span>`).join("");
      const items = p.highlights.map(h => `<li>${h}</li>`).join("");

      el.innerHTML = `
        <div class="meta">${p.timeline}</div>
        <h3>${p.title}</h3>
        <div class="tags">${tags}</div>
        <ul>${items}</ul>
      `;

      grid.appendChild(el);
    });

  } catch (err) {
    console.log("projects.json load error:", err);
  }
}
loadProjects();


/* =========================
   MATRIX RAIN EFFECT
========================= */
const canvas = document.getElementById("matrix");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
  const fontSize = 16;
  let columns = Math.floor(window.innerWidth / fontSize);
  let drops = Array(columns).fill(1);

  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px JetBrains Mono`;
    ctx.fillStyle = "rgba(0, 255, 213, 0.35)";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 40);
          }
