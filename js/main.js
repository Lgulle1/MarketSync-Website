(() => {
  'use strict';

  // ─── CUSTOM CURSOR ──────────────────────
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(min-width: 969px)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .proof-tile, .cap-row').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('is-hover');
        cursorDot.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('is-hover');
        cursorDot.classList.remove('is-hover');
      });
    });
  }

  // ─── NAV SCROLL ──────────────────────────
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── MOBILE MENU ─────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => document.body.classList.toggle('is-menu-open'));
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
      link.addEventListener('click', () => document.body.classList.remove('is-menu-open'));
    });
  }

  // ─── REVEAL ON SCROLL ────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

  // ─── MARQUEE DUPLICATION ─────────────────
  document.querySelectorAll('.client-marquee-track').forEach(track => {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  // ─── LIVE TIME ───────────────────────────
  const liveTime = document.querySelector('[data-live-time]');
  if (liveTime) {
    const update = () => {
      const t = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true
      }).format(new Date());
      liveTime.textContent = t + ' EST';
    };
    update();
    setInterval(update, 30000);
  }
})();
