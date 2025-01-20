document.addEventListener("DOMContentLoaded", (event) => {
    const wandCursor = document.getElementById("wand-cursor")
    const spellEffect = document.getElementById("spell-effect")
    const studyItems = document.querySelectorAll(".study-item")
    const socialLinks = document.querySelectorAll(".redes a")
  
    let isMouseDown = false
  
    // Cursor personalizado
    document.addEventListener("mousemove", (e) => {
      wandCursor.style.left = e.clientX + "px"
      wandCursor.style.top = e.clientY + "px"
    })
  
    // Efecto de hechizo Lumos
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
      spellEffect.style.background = ""
    })
  
    function updateLumosEffect(e) {
      spellEffect.style.left = e.clientX + "px"
      spellEffect.style.top = e.clientY + "px"
      spellEffect.style.opacity = "1"
      spellEffect.textContent = "Lumos"
  
      const radius = 150 // Aumentamos el radio para un efecto más amplio
      const gradient = `radial-gradient(circle ${radius}px at ${e.clientX}px ${e.clientY}px, 
                            rgba(255, 255, 255, 0.8) 0%, 
                            rgba(255, 255, 255, 0.6) 25%, 
                            rgba(255, 255, 255, 0.4) 50%, 
                            rgba(255, 255, 255, 0.2) 75%, 
                            rgba(255, 255, 255, 0) 100%)`
  
      spellEffect.style.background = gradient
      spellEffect.style.width = "100vw"
      spellEffect.style.height = "100vh"
      spellEffect.style.left = "0"
      spellEffect.style.top = "0"
    }
  
    // Manejo de elementos de estudio
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
  
      if (!item.querySelector(".spell-text")) {
        const spellText = document.createElement("div")
        spellText.textContent = "Revelio"
        spellText.classList.add("spell-text")
        spellText.style.position = "absolute"
        spellText.style.top = "50%"
        spellText.style.left = "50%"
        spellText.style.transform = "translate(-50%, -50%)"
        spellText.style.fontSize = "24px"
        spellText.style.color = "#FFD700"
        spellText.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.5)"
        spellText.style.opacity = "0"
        spellText.style.transition = "opacity 0.5s"
        spellText.style.pointerEvents = "none"
        spellText.style.zIndex = "2"
  
        item.appendChild(spellText)
  
        setTimeout(() => {
          spellText.style.opacity = "1"
        }, 100)
  
        setTimeout(() => {
          spellText.remove()
        }, 1500)
      }
    }
  
    function hideStudyItem(item) {
      if (!item.classList.contains("fixed")) {
        item.style.opacity = "0"
        item.style.transform = "scale(0.9)"
      }
    }
  
    // Efecto Avada Kedavra para los enlaces sociales
    socialLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
  
        const spellText = document.createElement("div")
        spellText.textContent = "Avada Kedavra"
        spellText.style.position = "fixed"
        spellText.style.top = `${e.clientY}px`
        spellText.style.left = `${e.clientX}px`
        spellText.style.transform = "translate(-50%, -50%)"
        spellText.style.fontSize = "24px"
        spellText.style.color = "#00FF00"
        spellText.style.textShadow = "0 0 10px rgba(0, 255, 0, 0.5)"
        spellText.style.zIndex = "9999"
        spellText.style.pointerEvents = "none"
  
        document.body.appendChild(spellText)
  
        const logo = link.querySelector(".logos")
        logo.classList.add("destroying")
  
        setTimeout(() => {
          logo.classList.remove("destroying")
          logo.style.opacity = "0"
  
          setTimeout(() => {
            spellText.remove()
            logo.style.opacity = "1"
          }, 2000)
        }, 500)
      })
    })
  })
  
  