

// { INPUTS }
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
//Variable con los datos del Usuario
const usuario = localStorage.getItem("usuario");
const usuariojson = JSON.parse(usuario);



//Obtiene los datos locales Guardados
async function obtenerdatousuario(){
    
    //Llena los input con los valores correspondientes
    txtNombre.value = usuariojson.data.nombre;
    txtGenero.value = usuariojson.data.genero;
    txtCorreo.value = usuariojson.data.correo;
    txtUsuario.value = usuariojson.data.usuario;
    txtContraseña.value = usuariojson.data.pwd;

}

async function actualizardatos(){

    //Evalua input correctos
    inputscorrectos = await evaluarinputs();
    //BACKEND
    if (inputscorrectos == true) {
        //Crea usuario en Backend
        actualizarusuario();
    }

}

async function actualizarusuario(){
    //Empaqueta la informacion en un archivo JSON
    const data = {
        "id": usuariojson.data.id,
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
    const rawResponse = await fetch("http://127.0.0.1:4000/updateuser",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    //Respuesta servidor
    if (rawResponse.status == 200){
        //Mensaje
        await mensajeModal("Actualizar datos en UBlog", respuesta.data.mensaje);
    }else{
        await mensajeModal("Actualizar datos en UBlog", "Ocurrio un erro en el servidor");
    }
}

async function evaluarinputs(){
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

function mensajeModal(titulo, mensaje){
    //Titulo Modal
    txtTitulo.innerHTML = titulo;
    //Mensaje Modal
    txtMensaje.innerHTML = mensaje;
    //Abrir Modal
    $('#myModal').modal('show');
}