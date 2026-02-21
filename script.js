// MOBILE MENU
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

hamburger.onclick = () => navlinks.classList.toggle("open");

// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.classList.add("show");
    }
  });
});

// SCROLL PROGRESS BAR
window.onscroll = () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("scrollProgress").style.width = (winScroll / height) * 100 + "%";
};

// MATRIX EFFECT
const canvas = document.getElementById("matrix");
if(canvas){
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01ABCDEF";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw(){
    ctx.fillStyle="rgba(2,6,23,0.07)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#00e0b8";
    ctx.font=fontSize+"px monospace";

    drops.forEach((y,i)=>{
      const text=letters[Math.floor(Math.random()*letters.length)];
      ctx.fillText(text,i*fontSize,y*fontSize);
      if(y*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    });
  }
  setInterval(draw,40);
       }

