
/* Detectar si se a cargado nuestro contexco en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
window.onload = function () {
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
}
// Funcion para musica de fondo
document.body.addEventListener('click', function () {
    var audio = document.getElementById('background-music');
    audio.play().catch(function (error) {
        console.error('Error al intentar reproducir el audio:', error);
    });
});