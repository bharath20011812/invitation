/* ============ EDIT HERE: everything the site shows comes from this object ============ */
const weddingConfig = {
  brideName: "Dr. M. Gayathri (Poongodi)", brideNameTa: "காயத்ரி", brideDegree: "BNYS · Assistant Professor, Swami Vivekananda Naturopathy & Yoga Medical College",
  groomName: "Er. K.R. Sriram", groomNameTa: "ஸ்ரீராம்", groomDegree: "B.E. · M.D., Shree Harsha Power Tech",
  brideParents: "Thiru V. Manikumar & Thirumathi M. Rani, Jeeyapuram",
  groomParents: "Thiru K.R. Raveendran & Thirumathi R. Chithra, Coimbatore",
  monogram: "ஸ்ரீ & கா",
  weddingDate: "2026-11-22T04:30:00+05:30",     // countdown target (Muhurtham)
  dateTa: "22.11.2026 – ஞாயிற்றுக்கிழமை", weddingDay: "Sunday", timeText: "4:30 AM – 6:00 AM (Viruchiga Lagnam)",
  venueTa: "சங்கர நாராயணா கல்யாண மண்டபம்", venueName: "Sankara Narayana Kalyana Mandapam",
  venueAddress: "Vadavalli – Marudhamalai Main Road, Vadavalli, Coimbatore – Tamil Nadu",
  busNote: "பஸ் ரூட்: வடவள்ளி வழியாக மருதமலை செல்லும் அனைத்துப் பேருந்துகளும் – திருவள்ளுவர் நகர் பேருந்து நிறுத்தம்.",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sankara+Narayana+Kalyana+Mandapam+Vadavalli+Coimbatore", // replace with exact pin link
  whatsappNumber: "919944832797", phoneNumber: "+919944832797",   // groom side; bride side: 94883 82257
  inviters: "இங்ஙனம்: திரு. K.R. ரவீந்திரன் – திருமதி R. சித்ரா · திரு. V. மணிக்குமார் – திருமதி M. ராணி",
  events: [
    { icon: "🪔", title: "Mapillai Azhaippu", ta: "மாப்பிள்ளை அழைப்பு", date: "Sat, 21 Nov 2026", time: "6:00 PM", venue: "Sankara Narayana Kalyana Mandapam" },
    { icon: "🌸", title: "Varaverppu (Reception)", ta: "வரவேற்பு", date: "Sat, 21 Nov 2026", time: "6:30 PM onwards", venue: "Sankara Narayana Kalyana Mandapam" },
    { icon: "💍", title: "Muhurtham", ta: "முகூர்த்தம்", date: "Sun, 22 Nov 2026", time: "4:30 – 6:00 AM", venue: "Sri Kattu Vinayagar Kovil & Mandapam" },
    { icon: "🍛", title: "Wedding Feast", ta: "விருந்து", date: "Sun, 22 Nov 2026", time: "Breakfast 7:00 AM · Lunch 12:00 PM", venue: "Sankara Narayana Kalyana Mandapam" }
  ],
  story: [  // replace with your own words
    { t: "The First Meeting", d: "[DATE] – Add your story here." },
    { t: "A Beautiful Beginning", d: "[DATE] – Add your story here." },
    { t: "The Proposal", d: "[DATE] – Add your story here." },
    { t: "Forever Begins", d: "22 November 2026" }
  ],
  gallery: ["assets/images/gallery/1.jpg","assets/images/gallery/2.jpg","assets/images/gallery/3.jpg","assets/images/gallery/4.jpg","assets/images/gallery/5.jpg","assets/images/gallery/6.jpg"],
  musicFile: "assets/music/wedding-music.mp3"
};
/* ======================================================================================= */

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const C = weddingConfig, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmtDate = new Date(C.weddingDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const derived = { ...C,
  groomLine: C.groomName + " · " + C.groomDegree, brideLine: C.brideName + " · " + C.brideDegree,
  whenLine: C.weddingDay + " | " + C.timeText };

/* placeholder image fallback (global so inline onerror works) */
window.ph = (img, label) => { img.onerror = null;
  img.src = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750'><rect width='100%' height='100%' fill='#f3e3b8'/><text x='50%' y='50%' text-anchor='middle' font-family='serif' font-size='28' fill='#7a1f2b'>${label || "REPLACE PHOTO"}</text></svg>`); };

/* bind config text */
$$("[data-bind]").forEach(el => el.textContent = derived[el.dataset.bind] ?? "");
$("#mapBtn").href = C.googleMapsUrl;
const msg = encodeURIComponent(`Vanakkam! We are happy to attend the wedding of ${C.groomName} & ${C.brideName} on ${fmtDate}.`);
$("#waBtn").href = `https://wa.me/${C.whatsappNumber}`;
$("#rsvpBtn").href = `https://wa.me/${C.whatsappNumber}?text=${msg}`;
$("#callBtn").href = `tel:${C.phoneNumber}`;

/* build events, story, gallery */
$("#eventCards").innerHTML = C.events.map((e, i) => `<article class="ecard rv" style="--d:${i * .1}s"><div class="ei">${e.icon}</div><h3 class="ta">${e.ta}</h3><p class="et">${e.title}</p><p>${e.date}</p><p class="tm">${e.time}</p><p class="vv">${e.venue}</p></article>`).join("");
$("#timeline").innerHTML = C.story.map((s, i) => `<li class="rv ${i % 2 ? "r" : "l"}"><h3>${s.t}</h3><p>${s.d}</p></li>`).join("");
$("#galleryGrid").innerHTML = C.gallery.map((src, i) => `<figure class="rv" data-i="${i}"><img src="${src}" alt="Wedding photo ${i + 1}" loading="lazy" onerror="ph(this)"></figure>`).join("");

/* particles + petals (kept light) */
const fx = $("#fx");
if (!reduce) for (let i = 0; i < 16; i++) {
  const p = document.createElement("i"); p.className = i % 3 ? "petal" : "gold";
  p.style.cssText = `left:${Math.random() * 100}%;animation-duration:${9 + Math.random() * 9}s;animation-delay:${-Math.random() * 14}s;--s:${.6 + Math.random() * .8}`;
  fx.appendChild(p);
}

/* audio: only after the guest taps the music button; bell is synthesised with WebAudio */
const bgm = $("#bgm"), musicBtn = $("#musicBtn"); bgm.src = C.musicFile; let soundOn = false, ac;
function bell() { if (!soundOn) return; try {
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  [523, 1046, 1568].forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f; o.type = "sine";
    g.gain.setValueAtTime(.12 / (i + 1), ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + 3);
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + 3); }); } catch (e) {} }
musicBtn.onclick = () => {
  if (bgm.paused) { const on = () => { soundOn = true; musicBtn.classList.add("on"); bell(); }; bgm.play().then(on).catch(on); }
  else { bgm.pause(); soundOn = false; musicBtn.classList.remove("on"); } };

/* scroll reveal */
const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .15 });
const observeAll = () => $$(".rv").forEach(el => io.observe(el));

/* intro sequence: loader -> closed doors -> slow opening -> site */
const wait = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 300) : ms));
(async function intro() {
  const loader = $("#loader"), doors = $("#doors");
  await wait(3200); loader.classList.add("out");
  await wait(1200); loader.remove();
  doors.classList.add("show"); await wait(1500);   // closed doors, bell + light line
  bell(); doors.classList.add("open"); document.body.classList.add("ready"); // doors open over ~5.5s
  await wait(5800); doors.classList.add("done");
  await wait(1200); doors.remove();
  document.body.classList.remove("locked"); observeAll();
})();

/* nav */
const burger = $("#burger"), menu = $("#menu");
const setMenu = o => { menu.classList.toggle("open", o); burger.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
burger.onclick = () => setMenu(!menu.classList.contains("open"));
$$("a[href^='#']").forEach(a => a.addEventListener("click", e => { e.preventDefault(); setMenu(false);
  $(a.getAttribute("href")).scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }));
addEventListener("scroll", () => $("#nav").classList.toggle("solid", scrollY > 60), { passive: true });

/* countdown */
const target = new Date(C.weddingDate).getTime(), pad = n => String(n).padStart(2, "0");
function tick() { const d = target - Date.now();
  if (d <= 0) { $("#countdown").innerHTML = `<p class="today">Today is the Day! ❤️</p>`; clearInterval(timer); return; }
  $("#cd-d").textContent = pad(Math.floor(d / 864e5)); $("#cd-h").textContent = pad(Math.floor(d % 864e5 / 36e5));
  $("#cd-m").textContent = pad(Math.floor(d % 36e5 / 6e4)); $("#cd-s").textContent = pad(Math.floor(d % 6e4 / 1e3)); }
const timer = setInterval(tick, 1000); tick();

/* lightbox with swipe */
const lb = $("#lightbox"), lbImg = $("img", lb); let cur = 0;
const show = i => { cur = (i + C.gallery.length) % C.gallery.length; const s = $$("#galleryGrid img")[cur]; lbImg.src = s.src; lbImg.alt = s.alt; };
$("#galleryGrid").addEventListener("click", e => { const f = e.target.closest("figure"); if (f) { show(+f.dataset.i); lb.hidden = false; document.body.classList.add("locked"); } });
const close = () => { lb.hidden = true; document.body.classList.remove("locked"); };
$(".x", lb).onclick = close; $(".pv", lb).onclick = () => show(cur - 1); $(".nx", lb).onclick = () => show(cur + 1);
lb.addEventListener("click", e => { if (e.target === lb) close(); });
addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
let sx = 0; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); });
