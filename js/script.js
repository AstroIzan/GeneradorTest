"use strict";
// Obtenemos el elemento con id formulario y lo seteamos para que se muestre
var formulario = $("#crearTest");
formulario.css("display", "flex");

// Obtenemos el elemento con id crearRespuestas y lo seteamos para que no se muestre
var crearRespuestas = $("#crearRespuestas");
crearRespuestas.css("display", "none");

// Obtenemos el elemento con id verTest y lo seteamos para que no se muestre
var verTest = $("#verTest");
verTest.css("display", "none");

// Obtenemos el elemento con id resultados y lo seteamos para que no se muestre
var resultados = $("#resultados");
resultados.css("display", "none");

/**
 * Metodo que crea el formulario para crear el test
 *  - Evalua que los datos no estén vacíos
 *  - Evalua que el número de preguntas sea mayor que 0ç
 *  - Si todo está correcto, crea el formulario con las preguntas y las respuestas
 *  - Si no está correcto, muestra un alert
 *  - Si todo está correcto, crea el formulario con las preguntas y las respuestas
 * @returns {undefined} En caso de que los datos no estén rellenos, muestra un alert
 */
function crearTest() {
    // Obtenemos los datos del formulario (Nombre, Descripción y Número de preguntas)
    var nombre = $("#nombreTest").val();
    var descripcion = $("#descripcionTest").val();
    var preguntas = $("#numeroPreguntas").val();

    // Si alguno de los datos está vacío, muestra un alert y sale del método
    if (nombre == "" || descripcion == "" || preguntas == "") {
        alert("Debes rellenar todos los campos");
        return;
    }

    // Si el número de preguntas es menor que 1, muestra un alert y sale del método
    if (preguntas < 1) {
        alert("El número de preguntas debe ser mayor que 0");
        return;
    }

    // Oculta el formulario y muestra el div con id crearRespuestas
    formulario.css("display", "none");
    crearRespuestas.css("display", "flex");
    verTest.css("display", "none");
    resultados.css("display", "none");

    // Crea el formulario con las preguntas y las respuestas
    var numberPregunta = 0;
    var numberRespuesta = 0;

    // Crea el formulario con las preguntas y las respuestas 
    var texto = "<h1 class='titulo_preguntas'> Creacion de preguntas </h1>";
    texto += "<form class='column-start container'>";
        for (var i = 0; i < preguntas; i++) {
            numberPregunta = i + 1;
            texto += "<div class='pregunta column'>";
                texto += "<h2>Pregunta " + numberPregunta + "</h2>";
                texto += "<input type='text' name='pregunta" + i + "' id='pregunta" + i + "' class='tituloPregunta' placeholder='Escribe aqui tu pregunta...'>";
                    texto += "<div class='opciones'>";
                    for (var j = 0; j < 4; j++) {
                        numberRespuesta = j + 1;
                        texto += "<div class='row'>";
                            texto += "<input type='text' name='opcion" + i + j + "' id='opcion" + i + j + "' class='respuestasPregunta' placeholder='Respuesta " + numberRespuesta + "'>";
                            texto += "<input type='radio' name='respuesta" + i + "' id='respuesta" + i + j + "' class='checkerRespuesta' value='opcion" + i + j + "'>";
                        texto += "</div>";
                    }
                    texto += "</div>";
            texto += "</div>";
        }
        texto += "<div class='column buttonBackground'>";
        texto += "<input type='button' value='Crear Test' onclick='enviarTest()'>";
        texto += "</div>";
    texto += "</form>";

    // Inserta el formulario en el div con id crearRespuestas
    $("#crearRespuestas").html(texto);
}


/**
 * Metodo que crea el test con las preguntas y las respuestas
 * - Evalua que los datos de la pregunta no estén vacíos
 * - Evalua que los datos de la respuesta no estén vacíos
 * - Evalua que se haya seleccionado una respuesta correcta
 * - Si todo está correcto, crea el formulario con las preguntas y las respuestas
 * - Si no está correcto, muestra un alert
 * @returns {undefined} En caso de que los datos no estén rellenos, muestra un alert
 */
function enviarTest() {
    // Obtenemos los datos del formulario (Nombre y Número de preguntas)
    var nombre = $("#nombreTest").val();
    var preguntas = $("#numeroPreguntas").val();

    // Crea el formulario con las preguntas y las respuestas
    var texto = "<h1 class='titulo_preguntas'> Test: " + nombre + " </h1>";
    texto += "<p class='titulo_preguntas'> Todas aquellas preguntas que no respondas se daran como erroneas </p>";
    texto += "<form class='column-start container'>";
        // Inserta cada una de las preguntas y cuatro opciones de respuesta
        for (var i = 0; i < preguntas; i++) {
            var pregunta = $("#pregunta" + i).val();
            // Evalua que las preguntas no estén vacías
            if (pregunta == "") {
                alert("Debes rellenar todas las preguntas");
                return; 
            }
            texto += "<div class='pregunta column'>";
                texto += "<h2>Pregunta " + (i + 1) + "</h2>";
                texto += "<h3>" + pregunta + "</h3>";
                    texto += "<div class='opciones'>";
                    for (var j = 0; j < 4; j++) {
                        var respuesta = $("#opcion" + i + j).val();        
                        var respuestaCheck = $("input[name='respuesta" + i + "']:checked").val();
                        // Evalua que las respuestas no estén vacías y que se haya seleccionado una respuesta correcta
                        if (respuesta == "" || respuestaCheck == undefined) {
                            alert("Debes rellenar todas las respuestas");
                            return;
                        }
                        texto += "<div class='row'>";
                            // En la respuesta correcta pone el value en "true" para que se pueda comprobar
                            if (respuestaCheck == "opcion" + i + j) {
                                texto += "<input type='radio' name='respuesta" + i + j + "' id='respuesta" + i + j + "' class='checkerRespuesta' value='true'>";
                            } else {
                                texto += "<input type='radio' name='respuesta" + i + j + "' id='respuesta" + i + j + "' class='checkerRespuesta' value='false'>";
                            }
                            texto += "<label>" + respuesta + "</label>";
                        texto += "</div>";
                    }
                    texto += "</div>";
            texto += "</div>";
        }
        texto += "<div class='column buttonBackground'>";
        texto += "<input type='button' value='Enviar Test' onclick='verResultados()'>";
        texto += "</div>";
    texto += "</form>";

    // Inserta el formulario en el div con id formulario
    $("#verTest").html(texto);

    // Si ha llegado hasta aquí, es que no ha habido ningún error y muestra el test
    formulario.css("display", "none");
    crearRespuestas.css("display", "none");
    verTest.css("display", "flex");
    resultados.css("display", "none");
}

/**
 * Metodo que comprueba las respuestas del test
 * - Comprueba cuantas preguntas ha acertado
 * - Calcula la nota sobre 10 del test dependiendo del numero de preguntas
 * - Crea el formulario con los resultados del test
 * - Si no está correcto, muestra un alert
 * @returns {undefined} En caso de que los datos no estén rellenos, muestra un alert
 */
function verResultados() {
    // Obtenemos los datos del formulario (Nombre, Descripcion y Número de preguntas)
    var nombre = $("#nombreTest").val();
    var descripcion = $("#descripcionTest").val();
    var preguntas = $("#numeroPreguntas").val();

    // Comprueba cuantas preguntas ha acertado
    var correctas = 0;
    for (var i = 0; i < preguntas; i++) {
        for (var j = 0; j < 4; j++) {
            var respuesta = $("input[name='respuesta" + i + j + "']:checked").val();
            if (respuesta == "true") {
                correctas++;
                break;
            }
        }
    }

    // Calcula la nota sobre 10 del test dependiendo del numero de preguntas
    var nota = Math.round((correctas / preguntas) * 10);

    // Crea el formulario con los resultados del test
    var texto = "<h1 class='titulo_preguntas'> Resultados: " + nombre + " </h1>";
    texto += "<form class='column-start container'>";
        texto += "<div class='pregunta column'>";
            texto += "<h2 class='notaTest'> Has acertado " + correctas + " preguntas de " + preguntas + "</h2>";
            texto += "<p class='descripcionTest'>" + descripcion + "</p>";
            texto += "<h2 class='notaTest'> Nota: " + nota + "</h2>";
            // En caso de ser mayor de 5, se muestra un mensaje de felicitación
            if (nota >= 5) {
                texto += "<h2 class='notaTestRes green'> ¡Enhorabuena! Has aprovado!</h2>";
            } else {
                texto += "<h2 class='notaTestRes red'> ¡Vaya! Has suspendido...</h2>";
            }
            texto += "<input type='button' value='Volver a empezar' onclick='volverEmpezar()'>";
        texto += "</div>";
    texto += "</form>";

    // Inserta el formulario en el div con id formulario
    $("#resultados").html(texto);

    // Si ha llegado hasta aquí, es que no ha habido ningún error, muestra los resultados y oculta el test
    formulario.css("display", "none");
    crearRespuestas.css("display", "none");
    verTest.css("display", "none");
    resultados.css("display", "flex");
}

/**
 * Metodo que vuelve a empezar el test
 * - Recarga la página
 */
function volverEmpezar() { window.location.reload(); }