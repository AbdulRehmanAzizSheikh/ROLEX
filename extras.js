const revealItems = document.querySelectorAll('.feature-rail, .service-section, .journal-section, .rail-card, .service-grid article, .journal-grid article');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll('.gold-button, .appointment-button, .enquire-button').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const box = button.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  button.addEventListener('pointerleave', () => { button.style.transform = ''; });
});

document.querySelectorAll('.watch-card, .rail-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(max-width: 800px)').matches) return;
    const box = card.getBoundingClientRect();
    const rotateX = ((event.clientY - box.top) / box.height - 0.5) * -4;
    const rotateY = ((event.clientX - box.left) / box.width - 0.5) * 4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
    card.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
