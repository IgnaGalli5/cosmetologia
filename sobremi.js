const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: { default: 'arcade' },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let personaje, puntosInteres, destino;
let frameIndex = 0;

function preload() {
    this.load.image('mapa', 'img2/map1.jpg');
    this.load.image('g1', 'img2/g1.png');
    this.load.image('g2', 'img2/g2.png');
    this.load.image('g3', 'img2/g3.png');
    this.load.image('ga1', 'img2/ga1.png');
    this.load.image('ga2', 'img2/ga2.png');
    this.load.image('ga3', 'img2/ga3.png');
    this.load.image('gc1', 'img2/gc1.png');
    this.load.image('gc2', 'img2/gc2.png');
    this.load.image('gc3', 'img2/gc3.png');
    this.load.image('gf1', 'img2/gf1.png');
    this.load.image('gf2', 'img2/gf2.png');
    this.load.image('gf3', 'img2/gf3.png');
}

function create() {
    let fondo = this.add.image(400, 300, 'mapa');
    fondo.setOrigin(0.5, 0.5);

    personaje = this.physics.add.sprite(400, 300, 'g1').setScale(2);
    personaje.setOrigin(0.5, 0.5);

    puntosInteres = [
        { x: 200, y: 250, info: 'Aquí están mis gustos musicales' },
        { x: 600, y: 400, info: 'Mis videojuegos favoritos' },
        { x: 320, y: 150, info: 'Aquí están mis gustos musicales' },
        { x: 500, y: 350, info: 'Mis videojuegos favoritos' },
        { x: 450, y: 350, info: 'Aquí están mis gustos musicales' },
        { x: 250, y: 450, info: 'Mis videojuegos favoritos' }
    ];

    puntosInteres.forEach(punto => {
        let grafico = this.add.circle(punto.x, punto.y, 10, 0xff0000);
        grafico.setInteractive();
        grafico.on('pointerdown', () => moverPersonaje.call(this, punto.x, punto.y, punto.info));
    });
}

function moverPersonaje(destX, destY, info) {
    let dx = destX - personaje.x;
    let dy = destY - personaje.y;
    let direccion;
    let frames;

    if (Math.abs(dx) > Math.abs(dy)) {
        direccion = dx > 0 ? 'gf' : 'gc'; // Derecha o izquierda
        frames = dx > 0 ? ['gf1', 'gf2', 'gf3'] : ['gc1', 'gc2', 'gc3'];
    } else {
        direccion = dy > 0 ? 'g' : 'ga'; // Frente o atrás
        frames = dy > 0 ? ['g1', 'g2', 'g3'] : ['ga1', 'ga2', 'ga3'];
    }

    let frameIndex = 0;
    let interval = setInterval(() => {
        personaje.setTexture(frames[frameIndex]);
        frameIndex = (frameIndex + 1) % frames.length;
    }, 150);

    this.tweens.add({
        targets: personaje,
        x: destX,
        y: destY,
        duration: 1000,
        ease: 'Sine.easeInOut',
        onComplete: () => {
            clearInterval(interval);
            personaje.setTexture(frames[0]); // Dejarlo en la primera imagen
            mostrarInfo(info);
        }
    });
}

function mostrarInfo(texto) {
    let infoBox = document.createElement('div');
    infoBox.className = 'info';
    infoBox.innerText = texto;
    infoBox.style.position = 'absolute';
    infoBox.style.top = '20px';
    infoBox.style.left = '20px';
    infoBox.style.background = 'white';
    infoBox.style.padding = '10px';
    infoBox.style.border = '1px solid black';
    document.body.appendChild(infoBox);

    setTimeout(() => infoBox.remove(), 3000);
}

function update() {
    // Se puede agregar lógica adicional aquí si es necesario
}
