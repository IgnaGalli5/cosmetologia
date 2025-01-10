// Función para crear un láser desde la nave espacial
function createLaser(endX, endY) {
  const starship = document.getElementById("starship-interior");
  if (!starship) return null;

  // Calcula la posición inicial del láser
  const starshipRect = starship.getBoundingClientRect();
  const startX = starshipRect.left + starshipRect.width / 2;
  const startY = starshipRect.top + starshipRect.height / 2;

  // Crea el elemento SVG para el láser
  const laser = document.createElementNS("http://www.w3.org/2000/svg", "line");
  laser.setAttribute("x1", startX);
  laser.setAttribute("y1", startY);
  laser.setAttribute("x2", endX);
  laser.setAttribute("y2", endY);
  laser.setAttribute("stroke", "red");
  laser.setAttribute("stroke-width", "2");
  laser.classList.add("laser");

  return laser;
}

// Maneja eventos de clic en el documento
document.addEventListener("click", (event) => {
  const laserContainer = document.getElementById("laser-container");

  // Crear un láser cuando el usuario hace clic
  const laser = createLaser(event.clientX, event.clientY);
  if (laser && laserContainer) {
    laserContainer.appendChild(laser);
    setTimeout(() => laser.remove(), 1000); // Remueve el láser después de 1s
  }
});

console.log("Script cargado correctamente.");
