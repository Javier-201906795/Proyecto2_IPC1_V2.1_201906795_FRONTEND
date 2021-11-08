//{ Datos Usuario }
const usuario = localStorage.getItem("usuario");
const usuariojson = JSON.parse(usuario);
//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');
//Obtiene los inputs
const txtNombre = document.getElementById('txtnombre');
const txtGenero = document.getElementById('txtgenero');
const txtCorreo = document.getElementById('txtcorreo');
const txtUsuario = document.getElementById('txtusuario');
const txtContraseña = document.getElementById('txtcontraseña');
const txtid = document.getElementById('txtid');
//Aray inputs
//                  0           1              2           3           4
const inputs = [txtNombre, txtContraseña, txtCorreo, txtUsuario,  txtGenero];
const inputsnombre = [" Nombre ", " Contraseña ", " Correo ", " Usuario ",  " Genero "];

const txtadvertencia = document.getElementById('txtadvertencia');



//Tabla
const tabla = document.getElementById('dataTable');
const cuerpotabla = document.getElementById('cuerpotabla');

////////////////////////////////////////////////////////////////



async function listadousuarios(){
    //Frontend
    const data = {
        "usuario": usuariojson.data.usuario
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/allusers",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
            //Array con Post
            console.log("informacion posts");
            const arreglousuarios = respuesta.data;
            console.log(arreglousuarios);
            //Pasar datos del array a la tabla 
            imprimirtabla(arreglousuarios);

    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }


}


////////////////////////////////////////////////////////////////

async function imprimirtabla(arreglo){
    //Limpia tabla
    cuerpotabla.innerHTML = '';
    console.log("arreglo tabla");
    console.log(arreglo);
    //Recorre array
    for (let i=0; i < arreglo.length; i++){
        //Evaluar si es un video o Imagen
        console.log(arreglo[i]);
        //Imprimi los valores
            cuerpotabla.innerHTML += '<tr>' + 
                '<td>'+ arreglo[i].id +'</td>'+
                '<td>'+ arreglo[i].nombre +'</td>' +
                '<td>'+ arreglo[i].correo +'</td>' +
                '<td>'+ arreglo[i].usuario +'</td>'+
                '<td>'+ arreglo[i].genero +'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-primary"  id="btneditarusuario"  onclick="editarusuario('+ arreglo[i].id +')">Editar</button>'+
                    '<br><br>'+
                    '<button type="button" class="btn btn-danger"  id="btneliminarusuario" onclick="eliminarusuario('+ arreglo[i].id +')" >Eliminar</button>'+
                '</td>'+
            '</tr>'
    }
}



////////////////////////////////////////////////////////////////

async function editarusuario(id){
    //quita advertencias anteriores
    txtadvertencia.style.visibility = "hidden"
    //Muestra modal
    $('#myModal2').modal('show');
    
    //Colocar id
    txtid.value = id;
    
    //Llenar datos
    arraydatos = await datosusuariobackend(id);

    if (arraydatos != null || arraydatos != undefined) {
        txtNombre.value = arraydatos.nombre;
        txtGenero.value = arraydatos.genero;
        txtCorreo.value = arraydatos.correo;
        txtUsuario.value = arraydatos.usuario;
        txtContraseña.value = arraydatos.pwd;
        txtid.value = arraydatos.id;
    }

    console.log(arraydatos);
}



async function datosusuariobackend(id){
    //Empaqueta la informacion en un archivo JSON
    const data = {
        "id": id,
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/userdata",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    //Respuesta servidor
    if (rawResponse.status == 200){
        return respuesta.data
    }else{
        txtadvertencia.innerHTML =  "Ocurrio un erro en el servidor";
    }

}


////////////////////////////////////////////////////////////////


async function actualizarusuario(){
    

    //Evalua input correctos
    inputscorrectos = await evaluarinputs();
    //BACKEND
    if (inputscorrectos == true) {
        //Actualizar usuario en Backend
        await editarusuariobackend();
    }

}

////////////////////////////////////////////////////////////////

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
        txtadvertencia.style.visibility = "visible"
        txtadvertencia.innerHTML =mensajeerror;
        return false;
    }
}



////////////////////////////////////////////////////////////////


async function editarusuariobackend(){
     //Empaqueta la informacion en un archivo JSON
    const data = {
        "id": txtid.value,
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
        //Oculta modificador form
        $('#myModal2').modal('hide');
        //Actualiza el cuadro
        listadousuarios();
        //Mensaje
        await mensajeModal("Actualizar datos en UBlog", respuesta.data.mensaje);
    }else{
        await mensajeModal("Actualizar datos en UBlog", "Ocurrio un erro en el servidor");
    }
}

////////////////////////////////////////////////////////////////

function test(){
    editarusuario(0)
}




////////////////////////////////////////////////////////////////


function mensajeModal(titulo, mensaje){
    //Titulo Modal
    txtTitulo.innerHTML = titulo;
    //Mensaje Modal
    txtMensaje.innerHTML = mensaje;
    //Abrir Modal
    $('#myModal').modal('show');
}

////////////////////////////////////////////////////////////////


async function eliminarusuario(id){
    console.log("Id " + id);
    //Frontend
    const data = {
        "id": String(id)
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/deleteuser",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
        if (respuesta.data.codigo == 200){
            mensajeModal("Usuario en UBlog1", respuesta.data.mensajecrud);
            //actualiza la tabla
            setTimeout(function(){
                listadousuarios();
            },1000)
        }else{
            await mensajeModal("Posts en UBlog1", respuesta.data.mensajecrud);
        }
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }
}