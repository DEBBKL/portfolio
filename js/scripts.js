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


