document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '0.5rem 0';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.padding = '0.8rem 0';
      navbar.style.boxShadow = 'none';
    }
  });

  const sections = document.querySelectorAll('.section, .hero');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const date = formData.get('date');
      const eventType = formData.get('eventType');
      const pax = formData.get('pax');
      const pkg = formData.get('package');
      const message = formData.get('message');

      const whatsappMessage = encodeURIComponent(
        `Hi Cold Cuts Project PH! 🎉\n\n` +
        `I'd like to book an event:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Date: ${date}\n` +
        `Event Type: ${eventType}\n` +
        `Pax: ${pax}\n` +
        `Package: ${pkg}\n` +
        (message ? `Message: ${message}\n` : '')
      );

      window.open(`https://wa.me/639163791792?text=${whatsappMessage}`, '_blank');

      const btn = contactForm.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Redirecting to WhatsApp...';
      btn.style.background = '#25d366';
      btn.style.borderColor = '#25d366';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3000);
    });
  }

  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .package-card, .gallery-item');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.style.opacity = '1';
        el.style.transform = el.style.transform || 'translateY(0)';
      }
    });
  };

  document.querySelectorAll('.service-card, .package-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
