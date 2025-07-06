// Manejo de pestañas
const tabs       = document.querySelectorAll('.tab-btn');
const sections   = document.querySelectorAll('.tab-section');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1) Actualizar botón activo
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 2) Mostrar sección correspondiente
    const target = btn.dataset.target;
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === target);
    });
  });
});

// Código modal igual que antes
const openCvBtn  = document.getElementById('open-cv');
const openCvLink = document.getElementById('open-cv-link');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');

function openModal(e) {
  e.preventDefault();
  cvModal.style.display = 'flex';
}
function closeModal() {
  cvModal.style.display = 'none';
}

openCvBtn.addEventListener('click', openModal);
openCvLink.addEventListener('click', openModal);
closeCvBtn.addEventListener('click', closeModal);
window.addEventListener('click', e => {
  if (e.target === cvModal) closeModal();
});


