// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    const wandCursor = document.getElementById("wand-cursor")
    const spellEffect = document.getElementById("spell-effect")
    const studyItems = document.querySelectorAll(".study-item")
    const houseButtons = document.querySelectorAll(".house-button")
    const bannerImage = document.getElementById("banner-image")
    const navBar = document.querySelector("nav")
    const navLinks = document.querySelectorAll("nav a")
    const titles = document.querySelectorAll("h2")
    const footer = document.querySelector(".magic-footer")
    const footerSparkles = document.querySelectorAll(".magic-sparkle")
  
    let isMouseDown = false
  
    // Cursor personalizado: mueve la varita siguiendo el ratón
    document.addEventListener("mousemove", (e) => {
      wandCursor.style.left = `${e.clientX}px`
      wandCursor.style.top = `${e.clientY}px`
    })
  
    // Efecto de hechizo al hacer clic
    document.addEventListener("mousedown", (e) => {
      isMouseDown = true
      updateLumosEffect(e)
    })
  
    document.addEventListener("mousemove", (e) => {
      if (isMouseDown) {
        updateLumosEffect(e)
      }
    })
  
    document.addEventListener("mouseup", () => {
      isMouseDown = false
      spellEffect.style.opacity = "0"
      document.body.style.background = ""
    })
  
    function updateLumosEffect(e) {
      spellEffect.style.left = `${e.clientX}px`
      spellEffect.style.top = `${e.clientY - 50}px` // Ajuste para subir la imagen del hechizo
      spellEffect.style.opacity = "1"
      spellEffect.innerHTML = `<img src='imagen/lumos.png' alt='Lumos' class='spell-image'>`
  
      const radius = 150
      const gradient = `radial-gradient(circle ${radius}px at ${e.clientX}px ${e.clientY}px, 
                                rgba(255, 255, 255, 0.8) 0%, 
                                rgba(255, 255, 255, 0.6) 25%, 
                                rgba(255, 255, 255, 0.4) 50%, 
                                rgba(255, 255, 255, 0.2) 75%, 
                                rgba(255, 255, 255, 0) 100%)`
  
      document.body.style.background = gradient
    }
  
    // Cambiar estilos según la casa seleccionada
  
    function changeHouseTheme(house) {
      const themes = {
        gryffindor: {
          color: "#1c0b0b",
          background: "url('/imagen/casas/head-gry.jpg')",
          banner: "/imagen/casas/head-gry.jpg",
          navColor: "#9E1A1A",
          footerColor: "#B71C1C",
          bannerEffect: "linear-gradient(135deg, rgba(255,0,0,0.5), rgba(255,215,0,0.5))",
          leftFlag: "imagen/casas/banner-gryffi.png",
          rightFlag: "imagen/casas/banner-gryffi.png",
        },
        hufflepuff: {
          color: "#5c5932",
          background: "url('/imagen/casas/head-uff.jpg')",
          banner: "/imagen/casas/head-uff.jpg",
          navColor: "#E0C340",
          footerColor: "#FFD700",
          bannerEffect: "linear-gradient(135deg, rgba(255,223,0,0.5), rgba(255,255,255,0.5))",
          leftFlag: "imagen/casas/banner-uff.png",
          rightFlag: "imagen/casas/banner-uff.png",
        },
        ravenclaw: {
          color: "#0a0d3d",
          background: "url('imagen/casas/banner-rav.png')",
          banner: "/imagen/casas/head-rave.jpg",
          navColor: "#273B81",
          footerColor: "#1D1F90",
          bannerEffect: "linear-gradient(135deg, rgba(0,0,128,0.5), rgba(173,216,230,0.5))",
          leftFlag: "imagen/casas/banner-rav.png",
          rightFlag: "imagen/casas/banner-rav.png",
        },
        slytherin: {
          color: "#15261b",
          background: "url('imagen/casas/banner-sly.png')",
          banner: "/imagen/casas/head-sly.jpg",
          navColor: "#347D39",
          footerColor: "#1A472A",
          bannerEffect: "linear-gradient(135deg, rgba(0,100,0,0.5), rgba(192,192,192,0.5))",
          leftFlag: "imagen/casas/banner-sly.png",
          rightFlag: "imagen/casas/banner-sly.png",
        },
      }
  
      const theme = themes[house]
      if (theme) {
        document.body.style.setProperty("--primary-color", theme.color)
        document.body.style.setProperty("--background-image", theme.background)
        bannerImage.src = theme.banner
        bannerImage.style.backgroundImage = theme.bannerEffect
        bannerImage.style.backgroundBlendMode = "overlay"
  
        navBar.style.backgroundColor = theme.navColor
        navLinks.forEach((link) => {
          link.style.color = theme.color
        })
        titles.forEach((title) => {
          title.style.color = theme.color
        })
        footer.style.backgroundColor = theme.footerColor
        footerSparkles.forEach((sparkle) => {
          sparkle.style.backgroundImage = `radial-gradient(circle, ${theme.color} 0%, rgba(0,0,0,0) 60%)`
        })
  
        // Cambiar banderas
        document.getElementById("left-banner").style.backgroundImage = `url('${theme.leftFlag}')`
        document.getElementById("right-banner").style.backgroundImage = `url('${theme.rightFlag}')`
      }
    }

    document.querySelectorAll(".redes a").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault(); // Evita que el enlace se abra inmediatamente
        const targetUrl = event.currentTarget.href;
    
        // Aplicar efecto "Avada Kedavra"
        const spellEffect = document.getElementById("spell-effect");
        spellEffect.style.left = `${event.clientX}px`;
        spellEffect.style.top = `${event.clientY - 50}px`;
        spellEffect.style.opacity = "1";
        spellEffect.innerHTML = `<img src='imagen/avada-kadabra.png' alt='Avada Kedavra' class='spell-image'>`;
    
        // Retrasar la apertura del enlace
        setTimeout(() => {
          spellEffect.style.opacity = "0"; // Esconde el efecto después de 1 segundo
          window.open(targetUrl, "_blank");
        }, 1000);
      });
    });
  
    // Revelar elementos de estudio con imágenes
    studyItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (!item.classList.contains("fixed")) {
          revealStudyItem(item)
        }
      })
  
      item.addEventListener("mouseleave", () => {
        if (!item.classList.contains("fixed")) {
          hideStudyItem(item)
        }
      })
  
      item.addEventListener("click", () => {
        if (item.classList.contains("fixed")) {
          hideStudyItem(item)
          item.classList.remove("fixed")
        } else {
          revealStudyItem(item)
          item.classList.add("fixed")
        }
      })
    })
  
    function revealStudyItem(item) {
      item.style.opacity = "1"
      item.style.transform = "scale(1)"
  
      if (!item.querySelector(".spell-image")) {
        const spellImage = document.createElement("img")
        spellImage.src = "imagen/revelio.png"
        spellImage.alt = "Revelio"
        spellImage.classList.add("spell-image")
  
        item.appendChild(spellImage)
  
        setTimeout(() => {
          spellImage.remove()
        }, 1500)
      }
    }
  
    function hideStudyItem(item) {
      if (!item.classList.contains("fixed")) {
        item.style.opacity = "0"
        item.style.transform = "scale(0.9)"
      }
    }
  
    // Iniciar las animaciones mágicas
    function animateSparkles() {
      const sparkles = document.querySelectorAll(".magic-sparkle")
      sparkles.forEach((sparkle) => {
        sparkle.style.left = `${Math.random() * 100}%`
        sparkle.style.top = `${Math.random() * 100}%`
        sparkle.style.animationDuration = `${3 + Math.random() * 2}s`
      })
    }
  
    animateSparkles()
    setInterval(animateSparkles, 5000)
  
    // Set default house (e.g., Gryffindor)
    changeHouseTheme("gryffindor")
  
    // Add click event listeners to house buttons
    houseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const house = button.dataset.house
        changeHouseTheme(house)
      })
    })
  })
  
  