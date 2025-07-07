// Modal Currículum
const openCvBtn  = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');
const cvIframe   = document.getElementById('cv-iframe');
const loader     = document.getElementById('cv-loader');

// Si existe un segundo enlace, lo añadimos de forma segura
const openCvLink = document.getElementById('open-cv-link');
if (openCvLink) {
  openCvLink.addEventListener('click', openModal);
}

function openModal(e) {
  if (e) e.preventDefault();

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  // Reinicia la animación si se reabre rápidamente
  cvModal.classList.remove('fade-out');
  void cvModal.offsetWidth; // ← fuerza reflow
  cvModal.classList.add('fade-in');

  // Mostrar loader y ocultar iframe
  loader.style.display = 'block';
  cvIframe.style.display = 'none';

  cvIframe.onload = () => {
    loader.style.display = 'none';
    cvIframe.style.display = 'block';
  };
}

function closeModal() {
  // Transición de salida
  cvModal.classList.remove('fade-in');
  cvModal.classList.add('fade-out');

  cvModal.addEventListener('animationend', function handler() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.removeEventListener('animationend', handler);
  });
}

