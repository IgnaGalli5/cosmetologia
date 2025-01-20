// Espera a que el DOM esté completamente cargado antes de ejecutar el código
// Esto asegura que todos los elementos estén disponibles

document.addEventListener("DOMContentLoaded", (event) => {
    const wandCursor = document.getElementById("wand-cursor"); // Selecciona el cursor personalizado (varita mágica)
    const spellEffect = document.getElementById("spell-effect"); // Selecciona el efecto visual de los hechizos
    const studyItems = document.querySelectorAll(".study-item"); // Obtiene todos los elementos de estudio
    const socialLinks = document.querySelectorAll(".redes a"); // Selecciona los enlaces de redes sociales

    let isMouseDown = false; // Bandera para detectar si el botón del ratón está presionado

    // Cursor personalizado: mueve la varita siguiendo el ratón
    document.addEventListener("mousemove", (e) => {
        wandCursor.style.left = e.clientX + "px"; // Establece la posición horizontal del cursor
        wandCursor.style.top = e.clientY + "px"; // Establece la posición vertical del cursor
    });

    // Efecto de hechizo Lumos al hacer clic
    document.addEventListener("mousedown", (e) => {
        isMouseDown = true; // Marca que el ratón está presionado
        updateLumosEffect(e); // Activa el efecto Lumos
    });

    document.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
            updateLumosEffect(e); // Actualiza el efecto Lumos mientras el ratón se mueve
        }
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false; // Marca que el ratón ya no está presionado
        spellEffect.style.opacity = "0"; // Oculta el efecto del hechizo
        document.body.style.background = ""; // Restablece el fondo de la página
    });

    function updateLumosEffect(e) {
        spellEffect.style.left = e.clientX + "px"; // Posición horizontal del efecto
        spellEffect.style.top = e.clientY + "px"; // Posición vertical del efecto
        spellEffect.style.opacity = "1"; // Muestra el efecto
        spellEffect.innerHTML = "<img src='imagen/lumos.png' alt='Lumos' class='spell-image'>"; // Imagen del hechizo Lumos

        const radius = 150; // Tamaño del área del efecto Lumos
        const gradient = `radial-gradient(circle ${radius}px at ${e.clientX}px ${e.clientY}px, 
                              rgba(255, 255, 255, 0.8) 0%, 
                              rgba(255, 255, 255, 0.6) 25%, 
                              rgba(255, 255, 255, 0.4) 50%, 
                              rgba(255, 255, 255, 0.2) 75%, 
                              rgba(255, 255, 255, 0) 100%)`;

        document.body.style.background = gradient; // Aplica el efecto de luz al fondo
    }

    // Revela elementos de estudio con imágenes
    studyItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            if (!item.classList.contains("fixed")) {
                revealStudyItem(item);
            }
        });

        item.addEventListener("mouseleave", () => {
            if (!item.classList.contains("fixed")) {
                hideStudyItem(item);
            }
        });

        item.addEventListener("click", () => {
            if (item.classList.contains("fixed")) {
                hideStudyItem(item);
                item.classList.remove("fixed");
            } else {
                revealStudyItem(item);
                item.classList.add("fixed");
            }
        });
    });

    function revealStudyItem(item) {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";

        if (!item.querySelector(".spell-image")) {
            const spellImage = document.createElement("img"); // Crea un elemento de imagen
            spellImage.src = "imagen/revelio.png"; // Ruta de la imagen para "Revelio"
            spellImage.alt = "Revelio"; // Texto alternativo para accesibilidad
            spellImage.classList.add("spell-image"); // Agrega una clase para estilizar

            item.appendChild(spellImage); // Agrega la imagen al elemento

            setTimeout(() => {
                spellImage.remove(); // Elimina la imagen después de 1.5 segundos
            }, 1500);
        }
    }

    function hideStudyItem(item) {
        if (!item.classList.contains("fixed")) {
            item.style.opacity = "0";
            item.style.transform = "scale(0.9)";
        }
    }

    // Efecto Avada Kedavra para los enlaces sociales
    socialLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Previene la acción predeterminada del enlace

            const spellText = document.createElement("div"); // Crea el texto del hechizo
            spellText.innerHTML = "<img src='imagen/avadakedavra.png' alt='Avada Kedavra' class='spell-image'>"; // Imagen del hechizo
            spellText.style.position = "fixed"; // Posición fija en la pantalla
            spellText.style.top = `${e.clientY}px`;
            spellText.style.left = `${e.clientX}px`;
            spellText.style.transform = "translate(-50%, -50%)"; // Centra la imagen en el clic
            spellText.style.zIndex = "9999"; // Se asegura que esté encima de otros elementos
            spellText.style.pointerEvents = "none"; // Evita interacción con el texto

            document.body.appendChild(spellText); // Agrega el texto a la página

            setTimeout(() => {
                spellText.remove(); // Elimina la imagen del hechizo después de 2 segundos
            }, 2000);
        });
    });
});
