const drawer = document.querySelector('#appointment-drawer');
const backdrop = document.querySelector('#drawer-backdrop');
const searchPanel = document.querySelector('#search-panel');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function openDrawer(watchName = '') {
  drawer.classList.add('open');
  backdrop.classList.add('open');
  if (watchName) document.querySelector('#guest-interest').value = watchName;
}

function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
}

document.querySelector('#appointment-button').addEventListener('click', () => openDrawer());
document.querySelector('#close-drawer').addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

document.querySelectorAll('.enquire-button').forEach((button) => {
  button.addEventListener('click', () => openDrawer(button.dataset.watch));
});

document.querySelector('#appointment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#guest-name').value.trim();
  const phone = document.querySelector('#guest-phone').value.trim();
  const interest = document.querySelector('#guest-interest').value;
  const message = `Hello Crown & Calibre, I am ${name}. I would like a private viewing for ${interest}. My number is ${phone}.`;
  showToast('Your private viewing request is ready');
  window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, '_blank');
});

document.querySelector('#search-button').addEventListener('click', () => {
  searchPanel.classList.add('open');
  document.querySelector('#search-input').focus();
});
document.querySelector('#close-search').addEventListener('click', () => searchPanel.classList.remove('open'));
document.querySelector('#search-input').addEventListener('input', (event) => {
  const query = event.target.value.trim();
  document.querySelector('#search-result').textContent = query ? `Searching the atelier for “${query}” — try our collection or concierge.` : 'Explore our signature pieces, the craft, and private concierge.';
});

document.querySelector('#menu-button').addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('mobile-open'));
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('mobile-open')));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeDrawer(); searchPanel.classList.remove('open'); } });
