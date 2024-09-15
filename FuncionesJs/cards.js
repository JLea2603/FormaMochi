const items = [
    "../Images/pruebita.jpg", "../Images/pruebita2.jpg",
    "../Images/pruebita.jpg", "../Images/pruebita2.jpg" // Asegúrate de tener pares de imágenes
];

// Mezcla los elementos
const shuffledItems = items.sort(() => Math.random() - 0.5);

// Crear las cajas de juego
shuffledItems.forEach(item => {
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

    // Funcionalidad al hacer clic en el box
    box.onclick = function () {
        if (!this.classList.contains('boxOpen') && document.querySelectorAll('.boxOpen').length < 2) {
            this.classList.add('boxOpen');
            this.querySelector('img').style.display = 'block'; // Mostrar la imagen al hacer clic

            let openBoxes = document.querySelectorAll('.boxOpen');
            if (openBoxes.length === 2) {
                let [firstBox, secondBox] = openBoxes;

                if (firstBox.dataset.value === secondBox.dataset.value) {
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


// Intenta iniciar la reproducción al hacer clic en la página
document.body.addEventListener('click', function () {
    var audio = document.getElementById('background-music');
    audio.play().catch(function (error) {
        console.error('Error al intentar reproducir el audio:', error);
    });
});