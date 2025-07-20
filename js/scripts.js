// scripts.js: Funcionalidades generales del portfolio

// Inicialización cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function() {
  // Inicializar animaciones de timeline
  initTimelineAnimations();
  
  // Inicializar menú móvil
  initMobileMenu();
  
  // Inicializar filtros de proyectos
  initProjectFilters();
});

// Animaciones para la sección de timeline (formación)
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  
  if (timelineItems.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => observer.observe(item));
}

// hamburger-menu.js: Control del menú hamburguesa para móviles

document.addEventListener("DOMContentLoaded", function() {
  initHamburgerMenu();
});

function initHamburgerMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  
  if (!menuToggle || !navUl) {
    console.warn('Hamburger menu elements not found');
    return;
  }

  // Evento click en el botón hamburguesa
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle de la clase active en el menú
    navUl.classList.toggle('active');
    
    // Cambiar el ícono del botón (opcional)
    if (navUl.classList.contains('active')) {
      menuToggle.innerHTML = '&#10005;'; // ×
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuToggle.innerHTML = '&#9776;'; // ≡
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú cuando se hace click en un enlace
  const navLinks = navUl.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navUl.classList.remove('active');
      menuToggle.innerHTML = '&#9776;';
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú cuando se hace click fuera
  document.addEventListener('click', function(e) {
    if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
      navUl.classList.remove('active');
      menuToggle.innerHTML = '&#9776;';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navUl.classList.contains('active')) {
      navUl.classList.remove('active');
      menuToggle.innerHTML = '&#9776;';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Manejar redimensionamiento de ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navUl.classList.remove('active');
      menuToggle.innerHTML = '&#9776;';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
// Filtros de proyectos por tecnología
function initProjectFilters() {
  const techFilterSelect = document.getElementById('techFilter');
  
  if (techFilterSelect) {
    techFilterSelect.addEventListener('change', filterProjects);
  }
}

// Función para filtrar proyectos por tecnología
function filterProjects() {
  const filter = document.getElementById("techFilter")?.value || 'all';
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const techs = card.getAttribute("data-tech") || "";
    if (filter === "all" || techs.includes(filter)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Función para cargar repositorios públicos desde GitHub (opcional)
async function loadGitHubRepos() {
  const container = document.getElementById('github-projects-container');
  if (!container) return; // Solo ejecuta si existe el contenedor

  container.innerHTML = '<p>Cargando proyectos...</p>';

  try {
    const response = await fetch('https://api.github.com/users/DEBBKL/repos');
    if (!response.ok) throw new Error('No se pudo obtener los repositorios.');

    let repos = await response.json();

    // Filtrar repos que no son forks ni privados
    repos = repos.filter(repo => !repo.fork && !repo.private);

    // Ordenar por fecha de creación (más recientes primero)
    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (repos.length === 0) {
      container.innerHTML = '<p>No hay proyectos públicos disponibles.</p>';
      return;
    }

    // Limpiar contenedor
    container.innerHTML = '';

    // Crear y añadir tarjetas para cada repositorio
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      // Formatear fecha
      const date = new Date(repo.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short'
      });

      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <p class="project-description">${repo.description || 'Sin descripción disponible.'}</p>
        <div class="project-meta">
          <span>Creado: ${date}</span>
          ${repo.language ? `<span>Lenguaje: ${repo.language}</span>` : ''}
          <a href="${repo.html_url}" target="_blank" class="btn-ver-mas">Ver más</a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Error al cargar proyectos: ${error.message}</p>`;
    console.error('Error loading GitHub repos:', error);
  }
}

// Funciones de utilidad
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Inicializar Google Translate si está disponible
function googleTranslateElementInit() {
  if (typeof google !== 'undefined' && google.translate) {
    new google.translate.TranslateElement({
      pageLanguage: 'es',
      includedLanguages: 'es,en,fr,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }
}
