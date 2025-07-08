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
  const container = document.getElementById('projects-container');
  container.innerHTML = ''; // limpio por si acaso

  try {
    const response = await fetch('https://api.github.com/users/DEBBKL/repos');
    if (!response.ok) throw new Error('Error al obtener repos');
    const repos = await response.json();

    if (repos.length === 0) {
      container.innerHTML = '<p>No hay repositorios disponibles.</p>';
      return;
    }

    repos.forEach(repo => {
      const card = document.createElement('article');
      card.className = 'project-card';

      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <p class="project-description">${repo.description || 'Sin descripción.'}</p>
        <div class="project-meta">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🛠 ${repo.language || 'N/A'}</span>
          <span>Última actualización: ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `<p>Error cargando repositorios: ${error.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadGitHubRepos);
