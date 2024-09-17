const items = [
    "../Images/CardsImages/BienComun.png", "../Images/CardsImages/BienComunImagen.png",
    "../Images/CardsImages/DestinoUniversal.png", "../Images/CardsImages/DestinoImagen.png",
    "../Images/CardsImages/Participacion.png", "../Images/CardsImages/ParticipacionImagen.png",
    "../Images/CardsImages/Solidaridad.png", "../Images/CardsImages/SolidaridadImagen.png",
    "../Images/CardsImages/Subsidiaridad.png", "../Images/CardsImages/SubsidiaridadImagen.png",
    "../Images/CardsImages/Valores.png", "../Images/CardsImages/ValoresImagen.png",
];

const imagePairs = {
    // -- Bien común --
    "../Images/CardsImages/BienComun.png": "../Images/CardsImages/BienComunImagen.png",
    "../Images/CardsImages/BienComunImagen.png": "../Images/CardsImages/BienComun.png", 
    // -- Destino universal --
    "../Images/CardsImages/DestinoUniversal.png": "../Images/CardsImages/DestinoImagen.png", 
    "../Images/CardsImages/DestinoImagen.png": "../Images/CardsImages/DestinoUniversal.png",
    // -- Participación --
    "../Images/CardsImages/Participacion.png": "../Images/CardsImages/ParticipacionImagen.png", 
    "../Images/CardsImages/ParticipacionImagen.png": "../Images/CardsImages/Participacion.png", 
    // -- Solidaridad --
    "../Images/CardsImages/Solidaridad.png": "../Images/CardsImages/SolidaridadImagen.png", 
    "../Images/CardsImages/SolidaridadImagen.png": "../Images/CardsImages/Solidaridad.png", 
    
};


// Cargar las imágenes y convertirlas en datos de píxeles
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Permitir carga de imágenes desde otros dominios
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

async function getImageData(url) {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// async function imagesAreEqual(url1, url2) {
//     // const [data1, data2] = await Promise.all([getImageData(url1), getImageData(url2)]);
//     // if (data1.width !== data2.width || data1.height !== data2.height) {
//     //     return false;
//     // }
//     // for (let i = 0; i < data1.data.length; i++) {
//     //     if (data1.data[i] !== data2.data[i]) {
//     //         return false;
//     //     }
//     // }
//     // return true;
//     return imagePairs[url1] === url2 || imagePairs[url2] === url1;
// }

async function imagesAreEqual(url1, url2) {
    return imagePairs[url1] === url2 || imagePairs[url2] === url1;
}


// Mezcla los elementos
const shuffledItems = items.sort(() => Math.random() - 0.5);

// Crear las cajas de juego
const boxes = shuffledItems.map(async item => {
    let box = document.createElement('div');
    box.className = 'item';
    box.dataset.value = item; // Guardar la ruta de la imagen para comparación

    // Crear una etiqueta <img> para cada imagen
    let img = document.createElement('img');
    img.src = item;
    img.alt = 'Imagen';
    img.style.width = '100px';  // Ajusta el tamaño si es necesario
    img.style.height = '100px';
    img.style.display = 'none'; // Ocultar la imagen inicialmente

    // Insertar la imagen dentro del div
    box.appendChild(img);

    return box;
});

Promise.all(boxes).then(boxes => {
    boxes.forEach(box => {
        // Funcionalidad al hacer clic en el box
        box.onclick = async function () {
            if (!this.classList.contains('boxOpen') && document.querySelectorAll('.boxOpen').length < 2) {
                this.classList.add('boxOpen');
                this.querySelector('img').style.display = 'block'; // Mostrar la imagen al hacer clic

                let openBoxes = document.querySelectorAll('.boxOpen');
                if (openBoxes.length === 2) {
                    let [firstBox, secondBox] = openBoxes;

                    // Comparar las imágenes
                    const areEqual = await imagesAreEqual(firstBox.dataset.value, secondBox.dataset.value);
                    
                    if (areEqual) {
                        // Marcar como pareja encontrada
                        firstBox.classList.add('boxMatch');
                        secondBox.classList.add('boxMatch');

                        // Limpiar las cajas abiertas
                        firstBox.classList.remove('boxOpen');
                        secondBox.classList.remove('boxOpen');
                    } else {
                        // No es una pareja, cerrar las cajas después de un pequeño retraso
                        setTimeout(() => {
                            firstBox.classList.remove('boxOpen');
                            secondBox.classList.remove('boxOpen');
                            firstBox.querySelector('img').style.display = 'none'; // Ocultar la imagen
                            secondBox.querySelector('img').style.display = 'none'; // Ocultar la imagen
                        }, 500);
                    }

                    // Verificar si se han encontrado todas las parejas
                    checkForWin();
                }
            }
        };

        // Añadir el box a la sección del juego
        document.querySelector('.game').appendChild(box);
    });
});

// Cerrar el modal al hacer clic en la "x"
document.querySelector(".close").onclick = function () {
    document.getElementById("winModal").style.display = "none";
};

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    if (event.target === document.getElementById("winModal")) {
        document.getElementById("winModal").style.display = "none";
    }
};

// Verificar si se han encontrado todas las parejas
function checkForWin() {
    if (document.querySelectorAll('.boxMatch').length === items.length) {
        // Mostrar el modal al ganar
        document.getElementById("winModal").style.display = "block";
    }
}


// Funcion para musica de fondo
document.body.addEventListener('click', function () {
    var audio = document.getElementById('background-music');
    audio.play().catch(function (error) {
        console.error('Error al intentar reproducir el audio:', error);
    });
});