//{ Datos Usuario }
const usuario = localStorage.getItem("usuario");
const usuariojson = JSON.parse(usuario);
//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');
//{ Tabla }
const tabla = document.getElementById("dataTable");
const tablaitems = document.getElementById('tablaitems');

//Obtiene los inputs
const txtfecha = document.getElementById('txtfecha');
const txtLink = document.getElementById('txtlink');
const txtTipo = document.getElementById('txttipo')
const txtCategoria = document.getElementById('txtcategoria');
const txtDescripcion = document.getElementById('txtdescripcion');

//Aray inputs
//                  0        1            2             3             
const inputs = [ txtLink, txtTipo, txtDescripcion, txtCategoria ];
const inputsnombre = [" Link ", " Tipo ", " Descripcion ", " Categoria "];

const txtId = document.getElementById('txtid');

////////////////////////////////////////////////////////////////

// // Busca post del usaurio 

async function buscarposts(){
    //Frontend
    const data = {
        "usuario": usuariojson.data.usuario
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/postsuser",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
        if (respuesta.data.mensajecrud == "Post encontrados exitosamente"){
            //Array con Post
            console.log("informacion posts");
            const arregloposts = respuesta.data.datacrud;
            console.log(arregloposts);
            //Pasar datos del array a la tabla 
            imprimirtabla(arregloposts);
        }else{
            await mensajeModal("Posts en UBlog1", respuesta.data.mensajecrud);
            //Redireccionar
            setTimeout(function(){
                window.location.href = "1_4_nuevopost.html";
            },4000)
        }
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }


}

////////////////////////////////////////////////////////////////

async function imprimirtabla(arreglo){
    //Limpia tabla
    tablaitems.innerHTML = '';
    //Recorre array
    for (let i=0; i < arreglo.length; i++){
        //Evaluar si es un video o Imagen
        console.log(arreglo[i.tipo]);
        //Video
        if( arreglo[i].tipo == "video"){
            tablaitems.innerHTML += '<tr>' + 
                '<td> <iframe class="embed-responsive-item" src="' + arreglo[i].portada + '"  style="max-width:200px; max-height: 200px;" ></iframe> </td>'+
                '<td>'+ arreglo[i].tipo +'</td>' +
                '<td>'+ arreglo[i].categoria +'</td>' +
                '<td>'+ arreglo[i].descripcion +'</td>'+
                '<td>'+ arreglo[i].fecha +'</td>'+
                '<td>'+ arreglo[i].likes +'</td>'+
                '<td>'+ parseInt(arreglo[i].ranking + 1) +'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-primary"  id="btneditar"  onclick="editarpost('+ arreglo[i].id +')">Editar</button>'+
                    '<br><br>'+
                    '<button type="button" class="btn btn-danger"  id="btneliminar" onclick="eliminarpost('+ arreglo[i].id +')" >Eliminar</button>'+
                '</td>'+
            '</tr>'
        }else{
            //Imagen
            //Crea items en la tabla
            tablaitems.innerHTML += '<tr>' + 
                '<td><img src="' + arreglo[i].portada + '" class="img-thumbnail" style="max-width:200px;  max-height: 200px;"></td>'+
                '<td>'+ arreglo[i].tipo +'</td>' +
                '<td>'+ arreglo[i].categoria +'</td>' +
                '<td>'+ arreglo[i].descripcion +'</td>'+
                '<td>'+ arreglo[i].fecha +'</td>'+
                '<td>'+ arreglo[i].likes +'</td>'+
                '<td>'+ parseInt(arreglo[i].ranking + 1) +'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-primary"  id="btneditar"  onclick="editarpost('+ arreglo[i].id +')">Editar</button>'+
                    '<br><br>'+
                    '<button type="button" class="btn btn-danger"  id="btneliminar" onclick="eliminarpost('+ arreglo[i].id +')" >Eliminar</button>'+
                '</td>'+
            '</tr>'
        }

        
        console.log(arreglo[i]);
    }
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

async function eliminarpost(id){
    console.log("Id psot " + id);
    //Frontend
    const data = {
        "id": String(id)
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/deletepost",{
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
            mensajeModal("Posts en UBlog1", respuesta.data.mensajecrud);
            //actualiza la tabla
            setTimeout(function(){
                buscarposts();
            },1000)
        }else{
            await mensajeModal("Posts en UBlog1", respuesta.data.mensajecrud);
        }
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }
}

////////////////////////////////////////////////////////////////

async function editarpost(id){
    //Obtner datos del POST
    arraypost = await datospost(id);
    console.log("paso aqui");
    //Llenar inputs
    txtfecha.value = arraypost.fecha;
    txtLink.value = arraypost.portada;
    txtTipo.value = arraypost.tipo;
    txtCategoria.value = arraypost.categoria;
    txtDescripcion.value = arraypost.descripcion;
    txtId.value = arraypost.id;
    console.log(arraypost)
    //Formulario edicion
    $('#myModal2').modal('show');
}

////////////////////////////////////////////////////////////////

async function  datospost(id){
    console.log("////////")
    //Frontend
    const data = {
        "id": String(id)
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/leerpost",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
        console.log(respuesta.data.datacrud);
        return respuesta.data.datacrud
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }
}

////////////////////////////////////////////////////////////////

async function actualizarpost(){
    //Evalua input correctos
    inputscorrectos = await evaluarinputs();
    
    //BACKEND
    if (inputscorrectos == true) {
        //Crea post en Backend
        console.log(inputscorrectos)
        await updatepost();
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

    //{ TIPO }
    var mensajegenero = "";
    if (txtTipo.value == "Tipo" || txtTipo.value == null){
        mensajegenero += " | Porfavor seleccione un Tipo. "
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
        alert(mensajeerror);
        return false;
    }
}

////////////////////////////////////////////////////////////////

async function updatepost(){
    //Frontend
    const data = {
        "id": txtId.value,
        "portada": txtLink.value,
        "tipo": txtTipo.value,
        "categoria": txtCategoria.value,
        "descripcion": txtDescripcion.value,
        "fecha": txtfecha.value,
        "usuario": usuariojson.data.usuario
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/editpost",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    console.log(respuesta);

    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
        //cierra el cuadro de modificaciones
        $('#myModal2').modal('hide');
        //actualiza la tabla
        setTimeout(function(){
            buscarposts();
        },1000)
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }

}

////////////////////////////////////////////////////////////////

