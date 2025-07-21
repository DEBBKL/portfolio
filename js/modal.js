// modal.js: Control de apertura y cierre del modal del CV

// Elementos DOM para modal CV
const openCvBtn = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');
const cvIframe = document.getElementById('cv-iframe');
const loader = document.getElementById('cv-loader');

let lastFocusedElement = null;

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
    // Focus trap
    if (cvModal.style.display === 'flex' && e.key === 'Tab') {
      const focusable = cvModal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
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

  lastFocusedElement = document.activeElement;

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  // Reiniciar animación para fade-in
  cvModal.classList.remove('fade-out');
  void cvModal.offsetWidth; // fuerza reflow para reiniciar animación
  cvModal.classList.add('fade-in');

  // Mostrar loader y ocultar iframe hasta que se cargue
  if (loader) loader.style.display = 'block';
  if (cvIframe) cvIframe.style.display = 'none';

  // Focus first focusable element in modal
  const focusable = cvModal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();
}

// Función para cerrar modal CV con animación fade-out
function closeModal() {
  if (!cvModal) return;

  function onAnimationEnd() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.classList.remove('fade-out');
    cvModal.removeEventListener('animationend', onAnimationEnd);
    // Return focus to the button that opened the modal
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  cvModal.classList.remove('fade-in');
  cvModal.classList.add('fade-out');
  cvModal.addEventListener('animationend', onAnimationEnd);
}

// Fallback for browsers that do not support PDF in iframe
if (cvIframe) {
  cvIframe.onerror = () => {
    loader.style.display = 'none';
    cvIframe.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.innerHTML = '<p>Tu navegador no puede mostrar PDFs. <a href="' + cvIframe.src + '" target="_blank">Descárgalo aquí</a>.</p>';
    cvIframe.parentNode.appendChild(fallback);
  };
}
