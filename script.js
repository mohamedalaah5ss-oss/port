(function(){
  lucide.createIcons();
  document.getElementById("year")&&(document.getElementById("year").textContent=new Date().getFullYear());

  // Scroll progress
  const bar=document.getElementById("sp");
  const upd=()=>{if(bar){const p=window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);bar.style.transform="scaleX("+Math.min(1,p)+")";}};
  window.addEventListener("scroll",upd,{passive:true}); upd();

  // Mobile nav
  const tog=document.querySelector(".nav-toggle"),menu=document.querySelector("#navMenu");
  const closeMn=()=>{if(menu&&menu.classList.contains("open")){menu.classList.remove("open");tog?.setAttribute("aria-expanded","false");}};
  if(tog&&menu){
    tog.addEventListener("click",()=>{const o=menu.classList.toggle("open");tog.setAttribute("aria-expanded",String(o));});
    menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMn));
    document.addEventListener("click",e=>{if(menu.classList.contains("open")&&!menu.contains(e.target)&&!tog.contains(e.target))closeMn();});
  }

  // Reveal
  const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("in")),{threshold:.07});
  document.querySelectorAll(".r0").forEach(el=>io.observe(el));

  // Nav spy
  const nls=document.querySelectorAll(".nl");
  const spy=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      nls.forEach(l=>{l.classList.remove("active");l.removeAttribute("aria-current");});
      const a=document.querySelector(`.nl[href="#${e.target.id}"]`);
      if(a){a.classList.add("active");a.setAttribute("aria-current","page");}
    });
  },{rootMargin:"-40% 0px -55% 0px"});
  ["home","about","usp","education","skills","experience","services","packages","certificates","testimonials","cta"]
    .map(id=>document.getElementById(id)).filter(Boolean).forEach(s=>spy.observe(s));

  // Tilt
  if(window.matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".usp-item,.sk-card,.exp-card,.pcard,.svc-card,.pkg-card,.cert-card,.tcard,.cta-card").forEach(c=>{
      c.addEventListener("mousemove",e=>{
        const r=c.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        c.style.transform=`translateY(-2px) perspective(800px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`;
      });
      c.addEventListener("mouseleave",()=>{c.style.transform="";});
    });
  }

  // Copy email
  const cb=document.getElementById("copyEmail");
  if(cb){cb.addEventListener("click",async()=>{
    try{
      if(navigator.clipboard)await navigator.clipboard.writeText("mohamedalaah5ss@gmail.com");
      else{const t=document.createElement("textarea");t.value="mohamedalaah5ss@gmail.com";t.style.cssText="position:fixed;left:-9999px";document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);}
      const m=document.getElementById("copyMsg");
      if(m){m.classList.remove("hidden");setTimeout(()=>m.classList.add("hidden"),1800);}
    }catch(_){}
  });}

  // Projects modal
  const P={
    etl:{title:"End-to-End ETL Pipeline",subtitle:"Ingest → Validate → Transform → Load",
      desc:"A complete pipeline workflow: raw inputs → validation rules → clean schema → analytics-ready tables. Built with reproducibility and maintainability as first-class constraints.",
      stack:["Python","SQL","ETL/ELT","Validation","Logging","Git"],
      highlights:["Designed a clean target schema for reporting and consistent KPIs.","Validation checks catch bad inputs before they corrupt downstream data.","Structured logs make every run debuggable and auditable.","Full documentation allows anyone to operate the pipeline from day one."],
      repo:"https://github.com/mohamedalaah5ss-oss",docs:"https://github.com/mohamedalaah5ss-oss"},
    model:{title:"Analytics Data Model",subtitle:"Star schema + metric consistency",
      desc:"A data modeling case study: fact/dimension tables, clear metric definitions, naming standards, and query-performance-aware design — so dashboards stay consistent at scale.",
      stack:["SQL","Star Schema","Dimensions/Facts","KPI Definitions"],
      highlights:["Star schema supports consistent KPIs across all reports.","Clear naming standards and inline documentation.","Optimised for fast analytics queries with minimal joins."],
      repo:"https://github.com/mohamedalaah5ss-oss",docs:"https://github.com/mohamedalaah5ss-oss"},
    quality:{title:"Data Quality System",subtitle:"Validation + structured logging",
      desc:"A lightweight quality layer: reusable validation rules, structured error output, and run logs — so failures surface fast and pipelines become trustworthy.",
      stack:["Python","Validation Rules","Structured Logging","Data Quality"],
      highlights:["Reusable checks for the most common data issues.","Standardised error messages to speed up troubleshooting.","Makes pipeline runs predictable and easy to audit."],
      repo:"https://github.com/mohamedalaah5ss-oss",docs:"https://github.com/mohamedalaah5ss-oss"}
  };

  const modal=document.getElementById("projectModal"),closeBtn=document.getElementById("closeModal");
  const titleEl=document.getElementById("projectTitle"),subEl=document.getElementById("projectSubtitle"),
        descEl=document.getElementById("projectDesc"),stackEl=document.getElementById("projectStack"),
        hilEl=document.getElementById("projectHighlights"),repoEl=document.getElementById("projectRepo"),
        docsEl=document.getElementById("projectDocs");
  let lf=null;

  function openM(key){
    const p=P[key]; if(!p||!modal) return;
    lf=document.activeElement;
    titleEl.textContent=p.title; subEl.textContent=p.subtitle; descEl.textContent=p.desc;
    stackEl.innerHTML="";
    p.stack.forEach(s=>{const sp=document.createElement("span");sp.className="sk";sp.textContent=s;stackEl.appendChild(sp);});
    hilEl.innerHTML="";
    p.highlights.forEach(h=>{
      const li=document.createElement("li");li.style.cssText="display:flex;align-items:flex-start;gap:7px";
      li.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--amb)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:3px;flex-shrink:0"><polyline points="9 18 15 12 9 6"></polyline></svg><span>${h}</span>`;
      hilEl.appendChild(li);
    });
    repoEl.href=p.repo; docsEl.href=p.docs;
    modal.classList.remove("hidden"); document.body.style.overflow="hidden"; closeBtn.focus();
  }
  function closeM(){if(!modal)return;modal.classList.add("hidden");document.body.style.overflow="";lf?.focus?.();}
  document.querySelectorAll(".pcard").forEach(b=>b.addEventListener("click",()=>openM(b.dataset.project)));
  closeBtn?.addEventListener("click",closeM);
  modal?.addEventListener("click",e=>{if(e.target.dataset.close==="true")closeM();});
  document.addEventListener("keydown",e=>{if(!modal?.classList.contains("hidden")&&e.key==="Escape")closeM();});
})();
