document.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('map');
    const locations = document.querySelectorAll('.location');

    locations.forEach(location => {
        location.addEventListener('mouseover', () => {
            const newMap = location.getAttribute('data-map');
            map.className = newMap; // Cambia la clase del mapa
        });

        location.addEventListener('mouseout', () => {
            map.className = 'default-map'; // Vuelve al mapa inicial
        });

        location.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            const href = location.querySelector('a').getAttribute('href');
            if (href) {
                window.location.href = href; // Navega a la página correspondiente
            }
        });
    });
});

