// Referencias a los elementos que abren el modal
const openCvBtn = document.getElementById('open-cv');
const openCvLink = document.getElementById('open-cv-link');
const closeCvBtn = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');

function openModal(event) {
  event.preventDefault();
  cvModal.style.display = 'flex'; // display flex para centrar contenido modal
}

function closeModal() {
  cvModal.style.display = 'none';
}

// Asignar eventos click a los triggers de abrir modal
openCvBtn.addEventListener('click', openModal);
openCvLink.addEventListener('click', openModal);

// Evento click para cerrar modal
closeCvBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer click fuera del contenido
window.addEventListener('click', function(event) {
  if(event.target === cvModal) {
    closeModal();
  }
});

