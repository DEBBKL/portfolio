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

<script>
async function loadGitHubRepos() {
  const container = document.getElementById('projects-container');
  const filter = document.getElementById('filter')?.value || 'newest';
  container.innerHTML = '';

  try {
    const response = await fetch('https://api.github.com/users/DEBBKL/repos');
    if (!response.ok) throw new Error('No se pudo obtener los repositorios.');

    let repos = await response.json();

    // Filtrar
    repos = repos.filter(repo => !repo.fork && !repo.private);

    // Ordenar según filtro seleccionado
    repos.sort((a, b) => {
      if (filter === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (filter === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (filter === 'az') return a.name.localeCompare(b.name);
      if (filter === 'za') return b.name.localeCompare(a.name);
      return 0;
    });

    // Pintar
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Sin descripción.'}</p>
        <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
      `;
      container.appendChild(card);
    });

    if (repos.length === 0) {
      container.innerHTML = '<p>No hay proyectos públicos disponibles.</p>';
    }
  } catch (error) {
    console.error('Error al cargar repositorios:', error);
    container.innerHTML = '<p>Error al cargar los proyectos desde GitHub.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadGitHubRepos);
</script>
