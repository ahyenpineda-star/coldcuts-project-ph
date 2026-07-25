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

  // Scroll-triggered animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .package-card, .gallery-item');
    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.style.transitionDelay = `${(i % 6) * 0.08}s`;
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = el.style.transform || 'translateY(0)';
      }
    });
  };

  document.querySelectorAll('.service-card, .package-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;
  let lightbox, lightboxImg, lightboxCounter;

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector('.lightbox-img');
    lightboxCounter = lightbox.querySelector('.lightbox-counter');

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(index) {
    if (!lightbox) createLightbox();
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
});
