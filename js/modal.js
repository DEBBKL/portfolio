// modal.js: Control de apertura y cierre del modal con mejoras

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const openModalBtns = document.querySelectorAll('.btn-cv');
const closeModalBtn = document.querySelector('.close-btn');

function openModal() {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Abrir modal al click en botones
openModalBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// Cerrar modal con botón
closeModalBtn.addEventListener('click', closeModal);

// Evitar cierre cuando se clica dentro del contenido
modalContent.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Cerrar modal al clicar fuera del contenido
modal.addEventListener('click', closeModal);

// Cerrar modal con tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});
