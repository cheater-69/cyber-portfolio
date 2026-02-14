// mobile menu
const hamburger=document.getElementById("hamburger");
const nav=document.getElementById("navlinks");

hamburger.onclick=()=>nav.classList.toggle("open");

// year
document.getElementById("year").textContent=new Date().getFullYear();

// reveal animation
const reveals=document.querySelectorAll(".reveal");
function reveal(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-80){
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll",reveal);
window.addEventListener("load",reveal);

// scroll progress
window.addEventListener("scroll",()=>{
  const scrollTop=document.documentElement.scrollTop;
  const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById("progress-bar").style.width=(scrollTop/height)*100+"%";
});
