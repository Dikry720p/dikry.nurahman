// PARALLAX on scroll (subtle)
const stars = document.getElementById('stars');
const stars2 = document.getElementById('stars2');
const nebula = document.getElementById('nebula');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  stars.style.transform = `translateY(${y * 0.02}px)`;
  stars2.style.transform = `translateY(${y * 0.04}px)`;
  nebula.style.transform = `translateY(${y * 0.01}px)`;
});

// SUBTLE FLOATING for profile
const profile = document.getElementById('profileFrame');
let t = 0;

function floatProfile() {
  t += 0.02;
  const y = Math.sin(t) * 6;
  profile.style.transform = `translateY(${y}px)`;
  requestAnimationFrame(floatProfile);
}
floatProfile();

// TYPING EFFECT for tagline
const typedEl = document.getElementById('typed');
const texts = ['Web Developer', 'UI/UX Designer', 'IoT Enthusiast'];
let ti = 0, ci = 0, forward = true;

function typeLoop() {
  const current = texts[ti];

  if (forward) {
    typedEl.textContent = current.substring(0, ci + 1);
    ci++;

    if (ci === current.length) {
      forward = false;
      setTimeout(typeLoop, 800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, ci - 1);
    ci--;

    if (ci === 0) {
      forward = true;
      ti = (ti + 1) % texts.length;
    }
  }
  setTimeout(typeLoop, 80);
}

// Start typing with initial fade-in
window.addEventListener('load', () => {
  typedEl.style.opacity = 0;
  typedEl.parentElement.style.opacity = 0;

  // fade in
  setTimeout(() => {
    typedEl.parentElement.style.transition = 'opacity .9s ease';
    typedEl.parentElement.style.opacity = 1;
  }, 200);

  setTimeout(typeLoop, 900);
});

// SHOOTING STARS
const shootContainer = document.getElementById('shootingContainer');

function spawnShooting() {
  const el = document.createElement('div');
  el.classList.add('shooting');

  const startTop = Math.random() * 60 + 5; // 5% - 65%
  const length = Math.random() * 120 + 60; // px
  el.style.top = `${startTop}vh`;
  el.style.left = `${Math.random() * 100}%`;
  el.style.height = `${length}px`;
  el.style.opacity = 0.95;
  el.style.transform = `rotate(${ -12 - Math.random() * 30 }deg)`;

  // animation via keyframes
  const dur = Math.random() * 0.8 + 0.6;
  el.animate([
    { transform: 'translateX(-200vw) rotate(-25deg)', opacity: 0 },
    { transform: 'translateX(0) rotate(-25deg)', opacity: 1, offset: 0.1 },
    { transform: 'translateX(200vw) rotate(-25deg)', opacity: 0 }
  ], { duration: dur * 1200, easing: 'cubic-bezier(.2,.8,.2,1)' });

  shootContainer.appendChild(el);

  // remove after animation
  setTimeout(() => el.remove(), dur * 1200 + 100);
}

// spawn randomly every few seconds
setInterval(() => {
  if (Math.random() < 0.55) spawnShooting();
}, 700);

// CTA BUTTON small rocket burst on click
const cta = document.getElementById('ctaBtn');
cta.addEventListener('click', (e) => {
  // small confetti rocket effect
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '99px';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    dot.style.zIndex = 9999;
    dot.style.pointerEvents = 'none';
    dot.style.background = ['#5ce1ff', '#8a7cff', '#ffd166', '#d4af37'][Math.floor(Math.random() * 4)];
    document.body.appendChild(dot);

    const ang = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 120;

    dot.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(ang) * speed}px, ${Math.sin(ang) * speed}px) scale(.6)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.9,.3,1)' });

    setTimeout(() => dot.remove(), 1200);
  }

  // scroll to projects if exists
  const projects = document.querySelector('#projects');
  if (projects) projects.scrollIntoView({ behavior: 'smooth' });
});

// OPEN EMAIL on button click
document.getElementById('Btn').addEventListener('click', function() {
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=dikrynurahman49@gmail.com&su=Kolaborasi%20Proyek&body=Halo%20Dikri,%0A%0ASaya%20ingin%20berdiskusi...",
    "_blank"
  );
});

// FILTER PORTFOLIO ITEMS
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    portfolioItems.forEach(item => {
      item.style.display = (category === "all" || item.dataset.category === category)
        ? "block"
        : "none";
    });
  });
});
