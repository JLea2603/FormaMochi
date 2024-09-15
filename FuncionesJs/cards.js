const items = [
    "../Images/pruebita.jpg", "../Images/pruebita2.jpg",
    "../Images/pruebita.jpg", "../Images/pruebita2.jpg" // Asegúrate de tener pares de imágenes
];

// Mezcla los elementos
var shuffledItems = items.sort(() => Math.random() - 0.5);

// Crear las cajas de juego
for (var i = 0; i < shuffledItems.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.dataset.value = shuffledItems[i]; // Guardar el valor original para comparación

    // Crear una etiqueta <img> para cada imagen
    let img = document.createElement('img');
    img.src = shuffledItems[i];
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
            img.style.display = 'block'; // Mostrar la imagen al hacer clic

            setTimeout(function () {
                let openBoxes = document.querySelectorAll('.boxOpen');

                if (openBoxes.length === 2) {
                    let firstBox = openBoxes[0];
                    let secondBox = openBoxes[1];

                    if (firstBox.dataset.value === secondBox.dataset.value) {
                        // Marcar como pareja encontrada
                        firstBox.classList.add('boxMatch');
                        secondBox.classList.add('boxMatch');
                    } else {
                        // No es una pareja, cerrar las cajas después de un pequeño retraso
                        setTimeout(function () {
                            firstBox.classList.remove('boxOpen');
                            secondBox.classList.remove('boxOpen');
                            firstBox.querySelector('img').style.display = 'none'; // Ocultar la imagen
                            secondBox.querySelector('img').style.display = 'none'; // Ocultar la imagen
                        }, 500);
                    }

                    // Verificar si se han encontrado todas las parejas
                    checkForWin();
                }
            }, 500);
        }
    };

    // Añadir el box a la sección del juego
    document.querySelector('.game').appendChild(box);
}

// Cerrar el modal al hacer clic en la "x"
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    var modal = document.getElementById("winModal");
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    var modal = document.getElementById("winModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Verificar si se han encontrado todas las parejas
function checkForWin() {
    if (document.querySelectorAll('.boxMatch').length === items.length) {
        // Mostrar el modal al ganar
        var modal = document.getElementById("winModal");
        modal.style.display = "block";
    }
}


// Intenta iniciar la reproducción al hacer clic en la página
document.body.addEventListener('click', function () {
    var audio = document.getElementById('background-music');
    audio.play().catch(function (error) {
        console.error('Error al intentar reproducir el audio:', error);
    });
});