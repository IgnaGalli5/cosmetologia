// Banner animado
const bannerAnimado = document.querySelector('.banner-animado');
const imagenes = [
    'img/1.jpg',
    'img/2.jpeg',
    'img/3.jpeg',
    'img/4.jpeg'
];
let indiceActual = 3;

function cambiarImagen() {
    bannerAnimado.style.backgroundImage = `url(${imagenes[indiceActual]})`;
    indiceActual = (indiceActual + 1) % imagenes.length;
}

// Cambia la imagen cada 5 segundos
setInterval(cambiarImagen,3000);

// Inicia el banner con la primera imagen
cambiarImagen();

// Precargar imágenes
imagenes.forEach(src => {
    const img = new Image();
    img.src = src;
});



// Formulario de contacto -> Enviar mensaje por WhatsApp
const formularioContacto = document.querySelector("#formulario-contacto");
if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const consulta = document.getElementById("consulta").value;

        if (!nombre || !email || !telefono || !consulta) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        let mensaje = `Hola, mi nombre es ${nombre}. 
        Mi correo es: ${email} 
        Mi teléfono es: ${telefono} 
        Consulta: ${consulta}`;

        let numeroWhatsApp = "5491168489667"; // Reemplaza con tu número de WhatsApp
        let url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank"); // Abre WhatsApp con el mensaje listo
    });
}


// Carrito de compras
let carrito = [];

function agregarAlCarrito(producto, precio, boton) {
    const cantidadInput = boton.previousElementSibling;
    const cantidad = parseInt(cantidadInput.value);
    
    if (cantidad > 0) {
        const item = carrito.find(i => i.producto === producto);
        if (item) {
            item.cantidad += cantidad;
        } else {
            carrito.push({producto, precio, cantidad});
        }
        actualizarCarrito();
        cantidadInput.value = 1;
    }
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(item => item.producto !== producto);
    actualizarCarrito();
}

function modificarCantidad(producto, cantidad) {
    const item = carrito.find(i => i.producto === producto);
    if (item) {
        item.cantidad += cantidad;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(producto);
        }
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    let total = 0;
    let contenido = '';

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        contenido += `
            <div class="lista-productos">
                <span class="producto-nombre">${item.producto}</span>
                <span class="producto-precio">$${item.precio} x ${item.cantidad}</span>
                <div class="botones">
                    <button class="btn-ventas" onclick="modificarCantidad('${item.producto}', 1)">+</button>
                    <button class="btn-ventas" onclick="modificarCantidad('${item.producto}', -1)">-</button>
                    <button class="btn-ventas eliminar" onclick="eliminarDelCarrito('${item.producto}')">X</button>
                </div>
            </div>
        `;
    });

    carritoItems.innerHTML = contenido;
    carritoTotal.textContent = `Total: $${total}`;
}

function enviarPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "🛍 *Nuevo Pedido:* \n\n";
    carrito.forEach(item => {
        mensaje += `🛒 ${item.producto} - $${item.precio} x ${item.cantidad}\n`;
    });
    mensaje += `\n💰 *Total: $${carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)}*`;

    let numeroWhatsApp = "549XXXXXXXXXX"; // Reemplaza con tu número de WhatsApp
    let url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank"); // Abre WhatsApp con el pedido listo

    // Vaciar el carrito después de enviar el pedido
    carrito = [];
    actualizarCarrito();
}


// Inicializar carrito si estamos en la página de ventas
if (document.querySelector('.productos')) {
    actualizarCarrito();
}
    // Aquí deberías integrar con la API de WhatsApp para enviar el pedido
    console.log("Pedido a enviar por WhatsApp:", mensaje);
    alert("Gracias por tu pedido. Te contactaremos pronto para confirmarlo.");
    carrito = [];
    actualizarCarrito();



// Inicializar carrito si estamos en la página de ventas
if (document.querySelector('.productos')) {
    actualizarCarrito();
}

