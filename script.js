const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

document.documentElement.classList.add('js-ready');

const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-art, .trust-strip div:not(.strip-spark), .about .section-kicker, .about-grid > *, .approach .section-kicker, .approach-heading > *, .step, .services .section-kicker, .services-heading > *, .service-list article, .service-foot, .quote-band > *, .faq .section-kicker, .faq-grid > *, .faq-list details, .contact-left > *, .contact-card, .site-footer > *'
);

revealTargets.forEach((element, index) => {
  element.dataset.reveal = '';
  element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.revealed = 'true';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => { element.dataset.revealed = 'true'; });
}

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !expanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
