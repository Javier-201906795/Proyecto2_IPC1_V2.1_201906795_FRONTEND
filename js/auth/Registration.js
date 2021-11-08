//Obtiene los inputs
const txtNombre = document.getElementById('txtnombre');
const txtGenero = document.getElementById('txtgenero');
const txtCorreo = document.getElementById('txtcorreo');
const txtUsuario = document.getElementById('txtusuario');
const txtContraseña = document.getElementById('txtcontraseña');
//Aray inputs
//                  0           1              2           3           4
const inputs = [txtNombre, txtContraseña, txtCorreo, txtUsuario,  txtGenero];
const inputsnombre = [" Nombre ", " Contraseña ", " Correo ", " Usuario ",  " Genero "];
//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');

async function register(){
    

    //Evalua input correctos
    inputscorrectos = await evaluarinputs();
    //BACKEND
    if (inputscorrectos == true) {
        //Crea usuario en Backend
        await createuser();
    }

}



async function evaluarinputs(){
    btnOk.style.visibility = "hidden";

    //EVALUAR
    var mensajeerror = "";

    //{ ESPACIOS VACIOS }
    var mensajeespacios = "";
    //Evaluar Espacios Vacios
    for (var i = 0; i < inputs.length; i++){
        if (inputs[i].value == "" || inputs[i].value == " "){
            mensajeespacios += " Espacio Vacio en " + inputsnombre[i] + ", ";
        }
    }

    //{ GENERO }
    var mensajegenero = "";
    if (txtGenero.value == "Genero"){
        mensajegenero += " | Porfavor seleccione un genero. "
    }

    //{ MENSAJE ERROR }
    //Mensaje ERROR concatenar datos
    if (mensajeespacios != "" ){
        mensajeerror += "Por favor llene los siguientes inputs:" + mensajeespacios;
    }
    if (mensajegenero != ""){
        mensajeerror += mensajegenero;
    }

    //{ RETORNAR }
    if (mensajeerror == ""){
        return true;
    }else{
        //{ MODAL }
        await mensajeModal("Registro Usuario en UBlog", mensajeerror);
        return false;
    }
}

async function createuser(){
    //Empaqueta la informacion en un archivo JSON
    const data = {
        "correo": txtCorreo.value,
        "pwd": txtContraseña.value,
        "nombre": txtNombre.value,
        "genero": txtGenero.value,
        "usuario": txtUsuario.value
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/crateuser",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
        if (respuesta.data == "Usuario creado exitosamente"){
            //Limpiar input
            limpiarinput();
            //Mensaje usuario creado
            usuariocreado();
        }else{
            await mensajeModal("Registro Usuario en UBlog", respuesta.data);
        }
    }else{
        await mensajeModal("Registro Usuario en UBlog", "Ocurrio un erro en el servidor");
    }
}


function limpiarinput(){
    //Ciclo for limpiando inputs
    for (var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    //Select
        txtGenero.value = "Genero";
}

function mensajeModal(titulo, mensaje){
    //Titulo Modal
    txtTitulo.innerHTML = titulo;
    //Mensaje Modal
    txtMensaje.innerHTML = mensaje;
    //Abrir Modal
    $('#myModal').modal('show');
}


async function usuariocreado(){
    //Mensaje
    await mensajeModal("Registro Usuario en UBlog", "Se registro correctamente el usuario.");
    //Muestra botones
    btnOk.style.visibility = "visible";
    btnClose.style.visibility = "hidden";
}

function redirigirlogin(){
    //Redirigir a Login
    window.location.href = "1_2_login.html";
}

function test(){

    usuariocreado();
}

