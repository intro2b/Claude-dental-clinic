/* ===================================================
   BrightSmile Dental Care — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Header ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    toggleBackToTop();
  });

  /* ── Mobile Menu ── */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  toggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  // Close on nav link click
  nav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.classList.remove('active');
    });
  });
  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav?.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Gallery Tabs ── */
  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.gallery-panel').forEach(panel => {
        panel.style.display = panel.dataset.panel === target ? 'grid' : 'none';
      });
    });
  });

  /* ── Scroll Animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  /* ── Back to Top ── */
  const btt = document.getElementById('backToTop');
  function toggleBackToTop() {
    btt?.classList.toggle('visible', window.scrollY > 400);
  }
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Appointment Form ── */
  const apptForm = document.getElementById('appointmentForm');
  apptForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = apptForm.querySelector('[type="submit"]');
    btn.textContent = '✅ Appointment Requested!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Book Appointment';
      btn.style.background = '';
      btn.disabled = false;
      apptForm.reset();
    }, 3500);
  });

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 25);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

});
