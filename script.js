/* =============================================
   VENKAT SAI KOLLI — PORTFOLIO JS
   Scroll reveal + nav toggle + form
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Year --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Mobile nav toggle --- */
  const menuBtn  = document.getElementById('menuBtn');
  const navMenu  = document.getElementById('navMenu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuBtn.textContent = navMenu.classList.contains('open') ? '\u00D7' : '\u2630';
    });
    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.textContent = '\u2630';
      });
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay per card within same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* --- Contact form --- */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('successMsg');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      // Simulate submission (replace with actual endpoint)
      success.textContent = 'Message sent! I\'ll get back to you soon.';
      form.reset();
      setTimeout(() => { success.textContent = ''; }, 5000);
    });
  }

  /* --- Active nav highlighting --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length && navLinks.length) {
    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}`
              ? 'var(--text)'
              : '';
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer2.observe(s));
  }

});
