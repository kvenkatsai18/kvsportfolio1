/* =============================================
   VENKAT SAI KOLLI — PORTFOLIO JS
   Scroll reveal + nav toggle + form
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Year --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Mobile nav toggle --- */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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
      threshold: 0.06,
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
      success.textContent = "Message sent! I'll get back to you soon.";
      form.reset();
      setTimeout(() => { success.textContent = ''; }, 5000);
    });
  }

});
