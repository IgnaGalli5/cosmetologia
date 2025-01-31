document.addEventListener("DOMContentLoaded", () => {
  const wandCursor = document.getElementById("wand-cursor")
  const spellEffect = document.getElementById("spell-effect")
  const hogwartsCastle = document.querySelector(".hogwarts-castle")
  const bannerImage = document.getElementById("banner-image")
  const houseButtons = document.querySelectorAll(".house-button")
  const studiesContainer = document.querySelector(".studies-container")
  const leftBanner = document.getElementById("left-banner")
  const rightBanner = document.getElementById("right-banner")
  const footer = document.querySelector(".magic-footer")

  const studyItems = [
    {
      name: "C#",
      image: "imagen/c-sharp.png",
      description: "El lenguaje de los magos avanzados, poderoso y versátil.",
    },
    {
      name: "Python",
      image: "imagen/python.png",
      description: "Ágil como un hipogrifo, capaz de realizar tareas complejas con elegancia.",
    },
    {
      name: "SQL",
      image: "imagen/sql.png",
      description: "El lenguaje de las bases de datos, tan vasto como la biblioteca de Hogwarts.",
    },
    {
      name: "HTML y CSS",
      image: "imagen/html-css.png",
      description: "Los cimientos de la web, tan fundamentales como los hechizos básicos.",
    },
    {
      name: "JavaScript",
      image: "imagen/javascript.png",
      description: "Dinámico y poderoso, como la magia de Dumbledore.",
    },
    {
      name: "React",
      image: "imagen/react.png",
      description: "Una herramienta moderna, forjada con el poder de la magia avanzada.",
    },
  ]

  let isMouseDown = false
  let lightEffect = null

  // Cursor personalizado
  document.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      wandCursor.style.left = `${e.clientX}px`
      wandCursor.style.top = `${e.clientY}px`
    })
  })

  // Efecto de hechizo
  document.addEventListener("mousedown", (e) => {
    isMouseDown = true
    updateSpellEffect(e)
  })

  document.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      updateSpellEffect(e)
    }
  })

  document.addEventListener("mouseup", () => {
    isMouseDown = false
    if (lightEffect) {
      lightEffect.remove()
      lightEffect = null
    }
    spellEffect.style.opacity = "0" // Ocultar el efecto de hechizo
  })

  function updateSpellEffect(e) {
    const radius = 150 // Radio del efecto de luz
    spellEffect.style.left = `${e.clientX}px`
    spellEffect.style.top = `${e.clientY}px`
    spellEffect.style.opacity = "1"
    spellEffect.innerHTML = `<img src='imagen/lumos.png' alt='Lumos' class='spell-image'>`

    // Crear o actualizar efecto de luz
    if (!lightEffect) {
      lightEffect = document.createElement("div")
      lightEffect.style.position = "fixed"
      lightEffect.style.pointerEvents = "none"
      lightEffect.style.zIndex = "9999"
      document.body.appendChild(lightEffect)
    }

    lightEffect.style.left = `${e.clientX - radius}px`
    lightEffect.style.top = `${e.clientY - radius}px`
    lightEffect.style.width = `${radius * 2}px`
    lightEffect.style.height = `${radius * 2}px`
    lightEffect.style.borderRadius = "50%"
    lightEffect.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
  }

  // Cambiar estilos según la casa seleccionada
  function changeHouseTheme(house) {
    const themes = {
      default: {
        background: "url('/imagen/nada.jpg')",
        banner: "/imagen/casas/hoba.png",
        color: "#808080",
        flag: null,
        footerColor: "rgba(14, 26, 64, 0.8)",
      },
      gryffindor: {
        background: "url('/imagen/casas/head-gry.jpg')",
        banner: "/imagen/casas/head-gry.jpg",
        color: "#eb0e24",//letras
        flag: "imagen/casas/banner-gryffi.png",
        footerColor: "#eb0e10",
      },
      hufflepuff: {
        background: "url('/imagen/casas/head-uff.jpg')",
        banner: "/imagen/casas/head-uff.jpg",
        color: "#fae25a",
        flag: "imagen/casas/banner-uff.png",
        footerColor: "#ECB939",
      },
      ravenclaw: {
        background: "url('/imagen/casas/head-rave.jpg')",
        banner: "/imagen/casas/head-rave.jpg",
        color: "#6d85fc",
        flag: "imagen/casas/banner-rav.png",
        footerColor: "#0E1A40",
      },
      slytherin: {
        background: "url('/imagen/casas/head-sly.jpg')",
        banner: "/imagen/casas/head-sly.jpg",
        color: "#2db507",
        flag: "imagen/casas/banner-sly.png",
        footerColor: "#1A472A",
      },
    }

    const theme = themes[house] || themes.default
    hogwartsCastle.style.backgroundImage = theme.background
    bannerImage.src = theme.banner
    document.documentElement.style.setProperty("--accent-color", theme.color)
    leftBanner.style.backgroundImage = theme.flag ? `url('${theme.flag}')` : "none"
    rightBanner.style.backgroundImage = theme.flag ? `url('${theme.flag}')` : "none"
    footer.style.backgroundColor = theme.footerColor
  }

  // Agregar eventos a los botones de las casas
  houseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const house = button.dataset.house
      changeHouseTheme(house)
    })
  })

  // Generar elementos de estudio dinámicamente
  function createStudyItems() {
    studiesContainer.innerHTML = "" // Limpiar el contenedor antes de agregar elementos
    studyItems.forEach((item) => {
      const studyElement = document.createElement("div")
      studyElement.className = "study-item"
      studyElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      `

      studyElement.addEventListener("mouseenter", () => {
        if (!studyElement.classList.contains("fixed")) {
          revealStudyItem(studyElement)
        }
      })

      studyElement.addEventListener("mouseleave", () => {
        if (!studyElement.classList.contains("fixed")) {
          hideStudyItem(studyElement)
        }
      })

      studyElement.addEventListener("click", () => {
        if (studyElement.classList.contains("fixed")) {
          hideStudyItem(studyElement)
          studyElement.classList.remove("fixed")
        } else {
          revealStudyItem(studyElement)
          studyElement.classList.add("fixed")
        }
      })

      studiesContainer.appendChild(studyElement)
    })
  }

  function revealStudyItem(item) {
    item.classList.add("revealed")
    const spellImage = document.createElement("img")
    spellImage.src = "imagen/revelio.png"
    spellImage.alt = "Revelio"
    spellImage.classList.add("spell-image", "revelio")
    item.appendChild(spellImage)
    setTimeout(() => {
      spellImage.remove()
    }, 1000)
  }

  function hideStudyItem(item) {
    if (!item.classList.contains("fixed")) {
      item.classList.remove("revealed")
    }
  }

  // Modificar los enlaces de redes sociales para el efecto Avada Kedavra
  document.querySelectorAll(".redes a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      const targetUrl = event.currentTarget.href
      const logo = event.currentTarget.querySelector(".logos")

      spellEffect.style.left = `${event.clientX}px`
      spellEffect.style.top = `${event.clientY - 25}px`
      spellEffect.style.opacity = "1"
      spellEffect.innerHTML = `<img src='imagen/avada-kadabra.png' alt='Avada Kedavra' class='avada-kedavra'>`

      // Aplicar efecto de blanco y negro
      logo.classList.add("bw")

      setTimeout(() => {
        spellEffect.style.opacity = "0"
        window.open(targetUrl, "_blank")
      }, 1000)
    })
  })

  createStudyItems()

  // Inicializar con el tema por defecto
  changeHouseTheme("default")

  const textElement = document.getElementById("textoAnimado")
  if (textElement) {
    const originalText = textElement.textContent
    let isOrdered = false

    function renderText(text, scramble = true) {
      textElement.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="word">${(scramble ? shuffleText(word) : word)
              .split("")
              .map((letter) => `<span class="letter">${letter}</span>`)
              .join("")}</span>`,
        )
        .join(" ")
    }

    // Generar texto desordenado al inicio
    renderText(originalText, true)

    textElement.addEventListener("mouseenter", () => {
      if (!isOrdered) {
        animateText(originalText)
      }
    })

    textElement.addEventListener("mouseleave", () => {
      if (!isOrdered) {
        renderText(originalText, true)
      }
    })

    textElement.addEventListener("click", () => {
      isOrdered = true
      animateText(originalText)
    })

    function animateText(finalText) {
      const words = finalText.split(" ")
      const wordElements = textElement.querySelectorAll(".word")

      words.forEach((word, wordIndex) => {
        const letters = wordElements[wordIndex].querySelectorAll(".letter")
        word.split("").forEach((letter, letterIndex) => {
          setTimeout(() => {
            letters[letterIndex].textContent = letter
            letters[letterIndex].classList.remove("glitch")
            letters[letterIndex].style.transform = "translate(0, 0)"
          }, letterIndex * 100)
        })
      })
    }

    function shuffleText(text) {
      return text
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    }
  }
})

