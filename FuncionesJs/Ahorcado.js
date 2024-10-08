/* Variables */
var ctx;
var canvas;
var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "#585858";
var colorMargen = "red";
var inicioX = 200;
var inicioY = 300;
var lon = 35;
var margen = 20;
var pistaText = "";

/* Arreglos */
var teclas_array = new Array();
var letras_array = new Array();
var palabras_array = new Array();

/* Variables de control */
var aciertos = 0;
var errores = 0;

/* Palabras */
palabras_array.push("JUSTICIA");
palabras_array.push("PAZ");
palabras_array.push("DIGNIDAD");
palabras_array.push("SOLIDARIDAD");
palabras_array.push("BIEN");
palabras_array.push("DERECHOS");
palabras_array.push("COMUNIDAD");
palabras_array.push("RESPETO");
palabras_array.push("AMOR");
palabras_array.push("SERVICIO");
palabras_array.push("EQUIDAD");
palabras_array.push("OPCION");
palabras_array.push("RESPONSABILIDAD");
palabras_array.push("ESPERANZA");

/* Objetos */
function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

/* Funciones */

/* Dibujar Teclas*/
function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

/* Dibua la letra y su caja */
function dibujaLetraLetra() {
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier";
    ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
}
function dibujaCajaLetra() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}


/// Funcion para dar una pista la usuario ////
function pistaFunction(palabra) {
    let pista = ""; // Se crea la variable local pista que contendra nuestra frase de pista
    switch (palabra) {  // Se crea un switch para poder controlar las pistas segun la palabra 
        case 'JUSTICIA':   // Se debera hacer un case por cada palabra 
            pista = "Equidad en el trato y distribución de recursos y derechos.";
            break;     // Es importante el break en cada case 
        case 'PAZ':
            pista = "Estado de armonía y ausencia de conflictos entre individuos y comunidades.";
            break;
        case 'DIGNIDAD':
            pista = "Valor intrínseco de cada persona, independientemente de su condición.";
            break;
        case 'SOLIDARIDAD':
            pista = "Compromiso con el bienestar de los demás y apoyo mutuo";
            break;
        case 'ESPERANZA':
            pista = "Confianza en un futuro mejor, motivando la acción hacia el cambio positivo";
            break;
        case 'RESPONSABILIDAD':
            pista = "Compromiso personal y social en las acciones y decisiones que afectan a otros.";
            break;
        case 'OPCION':
            pista = "Preferencia por ayudar a los más necesitados y vulnerables en la sociedad.";
            break;
        case 'EQUIDAD':
            pista = "Justicia que se adapta a las circunstancias individuales para lograr un trato justo.";
            break;
        case 'SERVICIO':
            pista = "Acción de ayudar a otros, poniendo sus necesidades por encima de las propias.";
            break;
        case 'AMOR':
            pista = "Actitud de entrega y cuidado hacia los demás, promoviendo el bien común.";
            break;
        case 'RESPETO':
            pista = " Consideración y valoración hacia los demás y sus derechos.";
            break;
        case 'COMUNIDAD':
            pista = "Conjunto de personas que comparten intereses, valores y objetivos comunes.";
            break;
        case 'DERECHOS':
            pista = "Libertades y garantías fundamentales que corresponden a cada ser humano";
            break;
        case 'BIEN':
            pista = "Lo que promueve la felicidad y el desarrollo integral de las personas.";
            break;
        default:  // El defaul se puede omitir // 
            pista = "No hay pista aun xP";
    }
    // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
    ctx.fillStyle = "black";  // Aqui ponemos el color de la letra
    ctx.font = "bold 20px Arial";  // aqui ponemos el tipo y tamaño de la letra
    ctx.fillText(pista, 20, 15);  // aqui ponemos la frase en nuestro caso la variable pista , seguido de la posx y posy
}


/* Distribuir nuestro teclado con sus letras respectivas al acomodo de nuestro array */
function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}
/* Dibujar Teclas */
function dibujaTecla() {
    ctx.fillStyle = "#ffffff"; // Cambia este valor al color que desees
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

    ctx.fillStyle = "black";
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}


/* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras */
function pintaPalabra() {
    var p = Math.floor(Math.random() * palabras_array.length);
    palabra = palabras_array[p];

    pistaFunction(palabra);

    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon + margen) * len) / 2;
    for (var i = 0; i < palabra.length; i++) {
        letra = palabra.substr(i, 1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}

/* dibujar cadalzo y partes del pj segun sea el caso */
function horca(errores) {
    var imagen = new Image();
    imagen.src = "../Images/ahorcado" + errores + ".png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 390, 0, 230, 230);
    }
    /*************************************************
    // Imagen 2 mas pequeña a un lado de la horca //       
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado"+errores+".png";
    imagen.onload = function(){
        ctx.drawImage(imagen, 620, 0, 100, 100);
    }
    *************************************************/
}

/* ajustar coordenadas */
function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y }
}

/* Detecta tecla clickeada y la compara con las de la palabra ya elegida al azar */
function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++) {
        tecla = teclas_array[i];
        if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                break;
            }
        }
    }
    if (i < teclas_array.length) {
        for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) { /* comparamos y vemos si acerto la letra */
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false) { /* Si falla aumenta los errores y checa si perdio para mandar a la funcion gameover */
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
        }
        /* Borra la tecla que se a presionado */
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        /* checa si se gano y manda a la funcion gameover */
        if (aciertos == palabra.length) gameOver(errores);
    }
}

/* Borramos las teclas y la palabra con sus cajas y mandamos msj segun el caso si se gano o se perdio */
function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    ctx.font = "bold 50px Courier";
    if (errores < 5) {
        ctx.fillText("Muy bien, la palabra es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
    }

    ctx.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length * 48)) / 2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}

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