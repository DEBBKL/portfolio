function createBinaryRain() {
  const binaryRain = document.getElementById('binaryRain');
  const screenWidth = window.innerWidth;
  const columnCount = Math.floor(screenWidth / 30);
  const binaryChars = ['0', '1'];

  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.style.animationDuration = `${2 + Math.random() * 3}s`;
    column.style.animationDelay = `${Math.random() * 5}s`;

    for (let j = 0; j < 20; j++) {
      const char = document.createElement('span');
      char.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      column.appendChild(char);
    }

    binaryRain.appendChild(column);
  }
}

function createLogoGrid() {
  const container = document.getElementById('logoGrid');
  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12h18"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16"/></svg>`
    // Añade más SVGs o logos si lo deseas
  ];

  for (let i = 0; i < 15; i++) {
    const item = document.createElement('div');
    item.className = 'logo-item';
    item.innerHTML = icons[i % icons.length];
    container.appendChild(item);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createBinaryRain();
  createLogoGrid();
});
