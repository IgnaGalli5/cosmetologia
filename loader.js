document.addEventListener('DOMContentLoaded', function() {
    // Simula un tiempo de carga
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('content');

        // Oculta el preloader
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        // Muestra el contenido principal
        content.style.display = 'block';

        // Elimina el preloader del DOM después de la transición
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 3000); // Cambia este valor para ajustar el tiempo de carga simulado (en milisegundos)
});
