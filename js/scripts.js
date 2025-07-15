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
  container.innerHTML = '';

  const filter = document.getElementById('filter').value;

  try {
    const response = await fetch('https://api.github.com/users/DEBBKL/repos');
    if (!response.ok) throw new Error('No se pudo obtener los repositorios.');

    let repos = await response.json();

    repos = repos.filter(repo => !repo.fork && !repo.private);

    // Ordenar según filtro
    repos.sort((a, b) => {
      switch(filter) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'az':
          return a.name.localeCompare(b.name);
        case 'za':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    if (repos.length === 0) {
      container.innerHTML = '<p>No hay proyectos públicos disponibles.</p>';
      return;
    }

    repos.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Sin descripción.'}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Error al cargar proyectos: ${error.message}</p>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubRepos);

<script>
function filterProjects() {
  const filter = document.getElementById("techFilter").value;
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const techs = card.getAttribute("data-tech");
    if (filter === "all" || techs.includes(filter)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
</script>
