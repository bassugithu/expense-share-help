const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function closeMenu(){
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
menuBtn?.addEventListener("click",()=>{
  sidebar.classList.add("open");
  overlay.classList.add("show");
});
overlay?.addEventListener("click", closeMenu);
document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click", closeMenu);
});

const search = document.getElementById("search");
const results = document.getElementById("searchResults");
const cards = [...document.querySelectorAll("[data-search]")];

search.addEventListener("input",()=>{
  const q = search.value.trim().toLowerCase();
  results.innerHTML = "";
  if(!q){ results.style.display="none"; return; }

  const matches = cards.filter(c => c.dataset.search.includes(q));
  if(!matches.length){
    results.innerHTML = '<div style="padding:14px 16px;color:#667085;font-size:13px">No matching guide found.</div>';
  }else{
    matches.slice(0,6).forEach(card=>{
      const link = card.querySelector(".guide-link");
      const item = document.createElement("a");
      item.href = link.href;
      item.textContent = card.querySelector("h3").textContent;
      item.addEventListener("click",()=>{ results.style.display="none"; search.value=""; });
      results.appendChild(item);
    });
  }
  results.style.display="block";
});

document.querySelectorAll("a[href^='#']").forEach(a=>{
  a.addEventListener("click",()=>{
    document.querySelectorAll(".nav-link").forEach(x=>x.classList.remove("active"));
    const target = document.querySelector(`.nav-link[href="${a.getAttribute("href")}"]`);
    target?.classList.add("active");
  });
});
