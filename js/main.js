// Manejo del modal del currículum vitae

const openCvBtn = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');

openCvBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cvModal.setAttribute('aria-hidden', 'false');
  cvModal.focus();
});

closeCvBtn.addEventListener('click', () => {
  cvModal.setAttribute('aria-hidden', 'true');
  openCvBtn.focus();
});

// Cerrar modal con tecla Escape
window.addEventListener('keydown', (e) => {
  if(e.key === "Escape" && cvModal.getAttribute('aria-hidden') === 'false'){
    cvModal.setAttribute('aria-hidden', 'true');
    openCvBtn.focus();
  }
});
