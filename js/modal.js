const openCvBtn  = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');
const cvIframe   = document.getElementById('cv-iframe');
const loader     = document.getElementById('cv-loader');

let lastFocusedElement;

function getFocusableElements() {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];
  return [...cvModal.querySelectorAll(selectors.join(','))];
}

function openModal(e) {
  e.preventDefault();
  lastFocusedElement = document.activeElement;

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  loader.style.display = 'block';
  cvIframe.style.display = 'none';

  cvIframe.onload = () => {
    loader.style.display = 'none';
    cvIframe.style.display = 'block';
  };

  // Foco en primer elemento focusable (normalmente el botón cerrar)
  const focusables = getFocusableElements();
  if (focusables.length) focusables[0].focus();

  document.addEventListener('keydown', handleKeyDown);
}

function closeModal() {
  cvModal.style.display = 'none';
  document.body.classList.remove('modal-open');

  if (lastFocusedElement) lastFocusedElement.focus();

  document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
  const focusables = getFocusableElements();
  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
  } else if (e.key === 'Tab') {
    // Focus trap
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];
    if (e.shiftKey) {
      // shift + tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }
}

openCvBtn.addEventListener('click', openModal);
closeCvBtn.addEventListener('click', closeModal);

// Cerrar modal si se clica fuera del contenido modal
cvModal.addEventListener('click', e => {
  if (e.target === cvModal) closeModal();
});
