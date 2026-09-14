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
      const isOpen = navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Header state + active section navigation --- */
  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.nav-menu a')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const updateNavigation = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 18);

    const current = sections.reduce((active, section) => {
      return section.getBoundingClientRect().top <= 140 ? section : active;
    }, sections[0]);

    navLinks.forEach(link => {
      const isActive = current && link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('active', isActive);
    });

    document.documentElement.style.setProperty(
      '--scroll-progress',
      `${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1) * 100}%`
    );
  };

  updateNavigation();
  window.addEventListener('scroll', updateNavigation, { passive: true });

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 90;
          setTimeout(() => {
            entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
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

  /* --- Approved testimonials --- */
  const testimonialTrack = document.getElementById('testimonialTrack');
  if (testimonialTrack) {
    const testimonialButtons = document.querySelectorAll('[data-testimonial-direction]');
    testimonialButtons.forEach(button => {
      button.addEventListener('click', () => {
        const direction = button.dataset.testimonialDirection === 'prev' ? -1 : 1;
        const card = testimonialTrack.querySelector('.testimonial-card');
        const distance = card ? card.getBoundingClientRect().width + 20 : testimonialTrack.clientWidth * 0.8;
        testimonialTrack.scrollBy({ left: direction * distance, behavior: 'smooth' });
      });
    });

    const testimonialsEndpoint = window.TESTIMONIALS_ENDPOINT || 'testimonials.json';
    const renderTestimonials = testimonials => {
      if (!Array.isArray(testimonials) || testimonials.length === 0) return;
      testimonialTrack.replaceChildren();

      const validTestimonials = testimonials.filter(testimonial => {
        return testimonial && testimonial.name && testimonial.quote;
      });

      validTestimonials.forEach(testimonial => {
        const card = document.createElement('article');
        card.className = 'testimonial-card reveal visible';

        const person = document.createElement('div');
        person.className = 'testimonial-person';

        const photo = testimonial.photo || window.TESTIMONIAL_PHOTOS?.[testimonial.name];
        if (photo) {
          const image = document.createElement('img');
          image.src = photo;
          image.alt = `${testimonial.name} portrait`;
          image.loading = 'lazy';
          person.appendChild(image);
        }

        const identity = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = testimonial.name;
        identity.appendChild(name);

        if (testimonial.role) {
          const role = document.createElement('p');
          role.textContent = testimonial.role;
          identity.appendChild(role);
        }

        person.appendChild(identity);
        card.appendChild(person);

        const quote = document.createElement('blockquote');
        quote.textContent = `“${testimonial.quote}”`;
        card.appendChild(quote);
        testimonialTrack.appendChild(card);
      });
    };

    fetch(testimonialsEndpoint)
      .then(response => {
        if (!response.ok) throw new Error(`Testimonials request failed: ${response.status}`);
        return response.json();
      })
      .then(renderTestimonials)
      .catch(error => {
        console.error('Unable to load approved testimonials; using local fallback.', error);
        fetch('testimonials.json')
          .then(response => {
            if (!response.ok) throw new Error(`Fallback testimonials request failed: ${response.status}`);
            return response.json();
          })
          .then(renderTestimonials)
          .catch(fallbackError => {
            console.error('Unable to load local testimonial fallback.', fallbackError);
          });
      });
  }

  /* --- Subtle pointer depth for desktop cards --- */
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.project-card, .work-card, .pub-card, .speaking-card, .podcast-card').forEach(card => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -3;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
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
