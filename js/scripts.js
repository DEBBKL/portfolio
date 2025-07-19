// Elementos DOM para modal CV
const openCvBtn  = document.getElementById('open-cv');
const openCvLink = document.getElementById('open-cv-link');
const closeCvBtn = document.getElementById('close-cv');
const cvModal    = document.getElementById('cv-modal');
const cvIframe   = document.getElementById('cv-iframe');
const loader     = document.getElementById('cv-loader');

// Añadir eventos para abrir/cerrar modal
if (openCvBtn) openCvBtn.addEventListener('click', openModal);
if (openCvLink) openCvLink.addEventListener('click', openModal);
if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cvModal.style.display === 'flex') {
    closeModal();
  }
});

// Cerrar modal clicando fuera del contenido (fondo)
if (cvModal) {
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeModal();
    }
  });
}

// Cuando se carga el iframe del CV, ocultar loader y mostrar iframe
if (cvIframe && loader) {
  cvIframe.onload = () => {
    loader.style.display = 'none';
    cvIframe.style.display = 'block';
  };
}

// Función para abrir modal CV
function openModal(e) {
  if (e) e.preventDefault();

  cvModal.style.display = 'flex';
  document.body.classList.add('modal-open');

  // Reiniciar animación para fade-in
  cvModal.classList.remove('fade-out');
  void cvModal.offsetWidth; // fuerza reflow para reiniciar animación
  cvModal.classList.add('fade-in');

  // Mostrar loader y ocultar iframe hasta que se cargue
  loader.style.display = 'block';
  cvIframe.style.display = 'none';
}

// Función para cerrar modal CV con animación fade-out
function closeModal() {
  function onAnimationEnd() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.removeEventListener('animationend', onAnimationEnd);
  }

  cvModal.classList.remove('fade-in');
  cvModal.classList.add('fade-out');
  cvModal.addEventListener('animationend', onAnimationEnd);
}


  // Al terminar la animación, ocultar modal y limpiar clases
  cvModal.addEventListener('animationend', function handler() {
    cvModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    cvModal.removeEventListener('animationend', handler);
  });
}

// Función para cargar repositorios públicos desde GitHub y mostrarlos
async function loadGitHubRepos() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = '';

  const filter = document.getElementById('filter')?.value || 'newest';

  try {
    const response = await fetch('https://api.github.com/users/DEBBKL/repos');
    if (!response.ok) throw new Error('No se pudo obtener los repositorios.');

    let repos = await response.json();

    // Filtrar repos que no son forks ni privados
    repos = repos.filter(repo => !repo.fork && !repo.private);

    // Ordenar según filtro seleccionado
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

    // Crear y añadir tarjetas para cada repositorio
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      // Asigna data-tech si tienes tecnología, aquí lo dejo vacío (puedes añadir según tu lógica)
      // card.setAttribute('data-tech', 'javascript,css'); 

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

// Cargar repositorios al cargar la página
document.addEventListener("DOMContentLoaded", loadGitHubRepos);

// Filtrar proyectos por tecnología
function filterProjects() {
  const filter = document.getElementById("techFilter")?.value || 'all';
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const techs = card.getAttribute("data-tech") || "";
    card.style.display = (filter === "all" || techs.includes(filter)) ? "flex" : "none";
  });
}

