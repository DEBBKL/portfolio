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
  e.preventDefault();
  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');
  loader.style.display = 'block';
  cvIframe.style.display = 'none';

  // Espera a que el iframe cargue el PDF
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
window.addEventListener('click', e => {
  if (e.target === cvModal) closeModal();
});
