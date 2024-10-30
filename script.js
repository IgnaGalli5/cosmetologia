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

// ... (mantén el resto del código JavaScript)

// Formulario de contacto
const formularioContacto = document.querySelector('#formulario-contacto');
if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = this.querySelector('#nombre').value;
        const email = this.querySelector('#email').value;
        const telefono = this.querySelector('#telefono').value;
        const consulta = this.querySelector('#consulta').value;
        
        const mensaje = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta: ${consulta}`;
        
        // Aquí deberías integrar con la API de WhatsApp para enviar el mensaje
        console.log("Mensaje a enviar por WhatsApp:", mensaje);
        alert("Gracias por tu consulta. Te contactaremos pronto.");
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
            <div>
                ${item.producto} - $${item.precio} x ${item.cantidad}
                <button onclick="modificarCantidad('${item.producto}', 1)">+</button>
                <button onclick="modificarCantidad('${item.producto}', -1)">-</button>
                <button onclick="eliminarDelCarrito('${item.producto}')">Eliminar</button>
            </div>
        `;
    });

    carritoItems.innerHTML = contenido;
    carritoTotal.textContent = `Total: $${total}`;
}

function enviarPedido() {
    let mensaje = "Nuevo Pedido:\n\n";
    carrito.forEach(item => {
        mensaje += `${item.producto} - $${item.precio} x ${item.cantidad}\n`;
    });
    mensaje += `\nTotal: $${carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)}`;

    // Aquí deberías integrar con la API de WhatsApp para enviar el pedido
    console.log("Pedido a enviar por WhatsApp:", mensaje);
    alert("Gracias por tu pedido. Te contactaremos pronto para confirmarlo.");
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

