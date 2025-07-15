const openCvBtn  = document.getElementById('open-cv');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');
const cvIframe   = document.getElementById('cv-iframe');
const loader     = document.getElementById('cv-loader');

if (openCvBtn) openCvBtn.addEventListener('click', openModal);
const openCvLink = document.getElementById('open-cv-link');
if (openCvLink) openCvLink.addEventListener('click', openModal);
if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);

// Evento para cerrar modal con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cvModal.style.display === 'flex') {
    closeModal();
  }
});

// Cerrar modal clicando fuera del contenido
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) {
    closeModal();
  }
});

// Asignar onload solo una vez
cvIframe.onload = () => {
  loader.style.display = 'none';
  cvIframe.style.display = 'block';
};

function openModal(e) {
  if (e) e.preventDefault();

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  // Reinicia la animación si se reabre rápidamente
  cvModal.classList.remove('fade-out');
  void cvModal.offsetWidth; // fuerza reflow
  cvModal.classList.add('fade-in');

  // Mostrar loader y ocultar iframe
  loader.style.display = 'block';
  cvIframe.style.display = 'none';
}

function closeModal() {
  // Transición de salida
  cvModal.classList.remove('fade-in');
  cvModal.classList.add('fade-out');

  cvModal.addEventListener('animationend', function handler() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.removeEventListener('animationend', handler);
  });
}

async function loadGitHubRepos() {
  const response = await fetch("https://api.github.com/users/DEBBKL/repos");
  const repos = await response.json();

  const excludedRepos = [
    "portfolio",
    "debbkl",
    "skills-introduction-to-github",
    "chaosmonkey",
    "portafolio-template",
    "profile-readme-generator"
  ].map(name => name.toLowerCase());

  const filteredRepos = repos.filter(repo => 
    !repo.fork &&
    !excludedRepos.includes(repo.name.toLowerCase())
  );

  console.log("Repos filtrados:", filteredRepos.map(r => r.name));

  const sortBy = document.getElementById("filter").value;

  switch (sortBy) {
    case "newest":
      filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case "oldest":
      filteredRepos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case "az":
      filteredRepos.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      filteredRepos.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  filteredRepos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
      <p>${repo.description || "Sin descripción."}</p>
      <p><strong>Lenguaje:</strong> ${repo.language || "N/A"}</p>
      <p><strong>Actualizado:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadGitHubRepos);
