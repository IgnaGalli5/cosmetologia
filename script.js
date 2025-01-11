// Función para crear un láser (sin cambios)
function createLaser(endX, endY) {
  const starship = document.getElementById("starship-interior");
  if (!starship) return null;

  const starshipRect = starship.getBoundingClientRect();
  const startX = starshipRect.left + starshipRect.width / 2;
  const startY = starshipRect.top + starshipRect.height / 2;

  const laser = document.createElement('div');
  laser.classList.add('laser');
  
  const angle = Math.atan2(endY - startY, endX - startX);
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  
  laser.style.width = `${length}px`;
  laser.style.left = `${startX}px`;
  laser.style.top = `${startY}px`;
  laser.style.transform = `rotate(${angle}rad)`;
  
  return laser;
}

// Listener para el evento de clic en todo el documento
document.addEventListener("click", (event) => {
  const laser = createLaser(event.clientX, event.clientY);
  if (laser) {
    document.body.appendChild(laser);
    setTimeout(() => laser.remove(), 1000);
  }
});

// Función para crear partículas
function createParticles(target) {
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container');
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.left = '0';
  particlesContainer.style.top = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '1000';
  document.body.appendChild(particlesContainer);

  const particleCount = 50;
  const colors = ['#FFD700', '#FFA500', '#FF4500', '#FF0000']; // Colores de fuego

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 200 + 100;
    const size = Math.random() * 6 + 4;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const destinationX = Math.cos(angle) * speed;
    const destinationY = Math.sin(angle) * speed;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    particlesContainer.appendChild(particle);
  }

  // Efecto de destrucción del icono
  target.classList.add('icon-destruction');

  setTimeout(() => {
    particlesContainer.remove();
    target.classList.remove('icon-destruction');
    target.style.opacity = '1';
  }, 1000);
}

// Listener para los iconos de redes sociales
document.querySelectorAll('.redes a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const img = event.target.closest('img');
    if (img) {
      createParticles(img);
      setTimeout(() => {
        window.open(link.href, '_blank');
      }, 1000);
    }
  });
});

console.log("Script cargado correctamente.");

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM cargado. Iniciando animaciones...");
});

