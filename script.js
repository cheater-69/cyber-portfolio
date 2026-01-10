// Navbar mobile
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");
hamburger.addEventListener("click", () => {
  navlinks.classList.toggle("open");
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.15 });

reveals.forEach((el) => io.observe(el));

// Load projects from JSON
async function loadProjects(){
  try{
    const res = await fetch("projects.json");
    const data = await res.json();
    const grid = document.getElementById("projects-grid");
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
  } catch(err){
    console.log("projects.json load error:", err);
  }
}
loadProjects();

// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function draw(){
  ctx.fillStyle = "rgba(2, 6, 23, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px JetBrains Mono`;
  ctx.fillStyle = "rgba(0, 255, 213, 0.35)";

  for(let i=0; i<drops.length; i++){
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 40);
