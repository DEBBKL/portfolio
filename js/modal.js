// modal.js

const openCvBtn  = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');
const cvIframe   = document.getElementById('cv-iframe');
const loader     = document.getElementById('cv-loader');

function openModal(e) {
  e.preventDefault();
  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');
  loader.style.display = 'block';
  cvIframe.style.display = 'none';

  // Cuando el iframe cargue, ocultamos loader y mostramos el iframe
  cvIframe.onload = () => {
    loader.style.display = 'none';
    cvIframe.style.display = 'block';
  };
}

function closeModal() {
  cvModal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

openCvBtn.addEventListener('click', openModal);
closeCvBtn.addEventListener('click', closeModal);

// Cerrar modal al clicar fuera del contenido
window.addEventListener('click', e => {
  if (e.target === cvModal) closeModal();
});
