/* ============================================================
   Xtreme Trade International — Global Scripts
   ============================================================ */

/* 🔧 CONFIG — company contact details */
const WHATSAPP_NUMBER = "8801711956298";   // +880 1711-956298
const COMPANY_EMAIL   = "ks.ritaplas@gmail.com";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile navigation ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks  = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      })
    );
  }

  /* ---------- Sticky header shadow ---------- */
  const navbar = document.querySelector(".navbar");
  const toTop  = document.querySelector(".to-top");
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 10);
    if (toTop)  toTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1600, t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- Project progress bars ---------- */
  const bars = document.querySelectorAll(".progress i[data-progress]");
  if (bars.length) {
    const pio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.progress + "%";
        pio.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    bars.forEach(el => pio.observe(el));
  }

  /* ---------- Project filter tabs ---------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card[data-cat]");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = cat === "all" || card.dataset.cat === cat;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- Testimonial slider ---------- */
  const slides = document.querySelector(".testi-slides");
  const dotsWrap = document.querySelector(".testi-nav");
  if (slides && dotsWrap) {
    const total = slides.children.length;
    let idx = 0, timer;
    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");
      d.className = "testi-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Testimonial " + (i + 1));
      d.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(d);
    }
    const dots = dotsWrap.querySelectorAll(".testi-dot");
    function go(i, manual) {
      idx = (i + total) % total;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle("active", k === idx));
      if (manual) restart();
    }
    function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5500); }
    restart();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(o => {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Appointment modal ---------- */
  const backdrop = document.getElementById("appointmentModal");
  const openers  = document.querySelectorAll("[data-modal-open]");
  const closers  = document.querySelectorAll("[data-modal-close]");

  function openModal() {
    if (!backdrop) return;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    const dateInput = document.getElementById("apptDate");
    if (dateInput && !dateInput.min) dateInput.min = new Date().toISOString().split("T")[0];
  }
  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  openers.forEach(b => b.addEventListener("click", (e) => { e.preventDefault(); openModal(); }));
  closers.forEach(b => b.addEventListener("click", closeModal));
  if (backdrop) backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- Appointment form → WhatsApp / Email ---------- */
  const apptForm = document.getElementById("apptForm");
  if (apptForm) {
    apptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(apptForm);
      const data = Object.fromEntries(f.entries());
      if (!data.name || !data.phone || !data.date) return;

      const msg =
`Hello Xtreme Trade International! 👋
I would like to book an appointment.

• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email || "-"}
• Preferred Date: ${data.date}
• Preferred Time: ${data.time}
• Interested In: ${data.interest}
• Notes: ${data.notes || "-"}`;

      /* Show success state */
      const formWrap = document.getElementById("apptFormWrap");
      const success  = document.getElementById("apptSuccess");
      if (formWrap && success) {
        formWrap.style.display = "none";
        success.classList.add("show");
      }

      /* Open WhatsApp with the prepared message */
      const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waURL, "_blank", "noopener");

      /* Also prepare an email draft (kept as backup channel) */
      const mailto = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Appointment Request — " + data.name)}&body=${encodeURIComponent(msg)}`;
      const emailLink = document.getElementById("apptEmailLink");
      if (emailLink) emailLink.href = mailto;
    });
  }

  /* ---------- Quick contact form → Email ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(contactForm);
      const data = Object.fromEntries(f.entries());
      if (!data.name || !data.email || !data.message) return;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\n${data.message}`;
      window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Website Enquiry — " + data.name)}&body=${encodeURIComponent(body)}`;
      const note = document.getElementById("contactNote");
      if (note) {
        note.textContent = "✓ Your email app should open — press Send! Or message us on WhatsApp.";
        note.style.color = "#1B7F4D";
      }
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
