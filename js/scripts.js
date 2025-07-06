const openCvBtn = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');

openCvBtn.addEventListener('click', function(event) {
  event.preventDefault();
  cvModal.style.display = 'block';
});

closeCvBtn.addEventListener('click', function() {
  cvModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if(event.target === cvModal) {
    cvModal.style.display = 'none';
  }
});
