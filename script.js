const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu when clicking a nav link (mobile)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

const successMsg = document.getElementById('successMsg');
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  // Replace this with your real API endpoint integration
  console.log('Contact message', data);

  successMsg.textContent = 'Thanks! I got your message and will respond soon.';
  contactForm.reset();

  setTimeout(() => {
    successMsg.textContent = '';
  }, 5000);
});

document.getElementById('year').textContent = new Date().getFullYear();
