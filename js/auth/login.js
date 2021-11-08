//import * as inputs from '../generales/inputvalidator';
//import { pi } from '../generales/inputvalidator';

const txtCorreo = document.getElementById('txtemail')
const txtPassword = document.getElementById('txtcontraseña')
//Aray inputs
//                  0           1      
const inputs = [txtCorreo, txtPassword];
const inputsnombre = [" Correo ", " Contraseña "];
//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');

async function login(){
    //{ EVALUAR INPUTS }
    inputscorrectos = await verificarinput();
    if(inputscorrectos == true){
        await loginbackend();
    }
}

async function loginbackend(){
    //Crea un archivo JSON con la informacion requerida para ingresar
    const data = {"correo": txtCorreo.value, "pwd": txtPassword.value}
    let datajson = JSON.stringify(data)
    console.log(datajson)


    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/login",{
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    
    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json()
    console.log(respuesta)

    //Guardar informacion
    //LocalStorage para alamacer informacion
    if (rawResponse.status == 200){
        localStorage.setItem("usuario", JSON.stringify(respuesta))
        window.location.href = "1_3_actualizardatos.html"
    }else{
        await mensajeModal("Inicio secion en UBlog", respuesta.mensaje);
    }
}

async function verificarinput(){
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

    //{ MENSAJE ERROR }
    //Mensaje ERROR concatenar datos
    if (mensajeespacios != "" ){
        mensajeerror += "Por favor llene los siguientes inputs:" + mensajeespacios;
    }


    //{ RETORNAR }
    if (mensajeerror == ""){
        return true;
    }else{
        //{ MODAL }
        await mensajeModal("Inicio secion en UBlog", mensajeerror);
        return false;
    }

}


function mensajeModal(titulo, mensaje){
    // //Titulo Modal
    txtTitulo.innerHTML = titulo;
    // //Mensaje Modal
    txtMensaje.innerHTML = mensaje;
    //Abrir Modal
    $('#myModal').modal('show');
}

