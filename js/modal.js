// modal.js: Control de apertura y cierre del modal del CV

// Elementos DOM para modal CV
const openCvBtn = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');
const cvIframe = document.getElementById('cv-iframe');
const loader = document.getElementById('cv-loader');

// Verificar que existen los elementos necesarios
if (!cvModal || !closeCvBtn) {
  console.warn('Modal CV elements not found');
} else {
  
  // Añadir eventos para abrir/cerrar modal
  if (openCvBtn) openCvBtn.addEventListener('click', openModal);
  if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.style.display === 'flex') {
      closeModal();
    }
  });

  // Cerrar modal clicando fuera del contenido (fondo)
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeModal();
    }
  });

  // Cuando se carga el iframe del CV, ocultar loader y mostrar iframe
  if (cvIframe && loader) {
    cvIframe.onload = () => {
      loader.style.display = 'none';
      cvIframe.style.display = 'block';
    };
  }
}

// Función para abrir modal CV
function openModal(e) {
  if (e) e.preventDefault();
  
  if (!cvModal) return;

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  // Reiniciar animación para fade-in
  cvModal.classList.remove('fade-out');
  void cvModal.offsetWidth; // fuerza reflow para reiniciar animación
  cvModal.classList.add('fade-in');

  // Mostrar loader y ocultar iframe hasta que se cargue
  if (loader) loader.style.display = 'block';
  if (cvIframe) cvIframe.style.display = 'none';
}

// Función para cerrar modal CV con animación fade-out
function closeModal() {
  if (!cvModal) return;

  function onAnimationEnd() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.classList.remove('fade-out');
    cvModal.removeEventListener('animationend', onAnimationEnd);
  }

  cvModal.classList.remove('fade-in');
  cvModal.classList.add('fade-out');
  cvModal.addEventListener('animationend', onAnimationEnd);
}
