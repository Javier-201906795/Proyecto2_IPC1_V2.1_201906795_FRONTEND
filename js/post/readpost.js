
ContendioPagina = document.getElementById('contenido');


//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');


async function backenddatos(id){
      //Frontend
    const data = {
        "id": String(id)
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/leerpost",{
        method: "PUT",
        body: datajson,
        headers: { 'Content-Type': 'application/json' }
    })

    console.log(await rawResponse);

    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json();
    
    

    //Respuesta correcta del Backend
    if (rawResponse.status == 200){
            //Array con Post
            console.log("informacion posts");
            const arregloposts = respuesta.data.datacrud;
            console.log(arregloposts);
            return arregloposts;
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }

}

async function cargardatos(){
    //OBTIENE ID DEL URL
    var id = window.location.search.substring(1);
    
    //Obtener array con datos
    array = await backenddatos(String(id));
    console.log(array)
    //imprimir
    ContendioPagina.innerHTML = '';
    if (array.tipo == "video"){
        ContendioPagina.innerHTML += '<div class="row">'+
            '<div class="col-md-12 col-sm-12">'+
                '<center><iframe class="embed-responsive-item" src="' + array.portada + '"  style="max-width:500px; height: 35%;" ></iframe></center>'+
            '</div>'+
            '</div>'+
            '<br>'+
            '<div class="row">'+
                '<div class="card shadow mb-4 col-md-12 col-sm-12">'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Categoria:</h6>'+ array.categoria +
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Author</h6>' + array.usuario+
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Fecha Publicacion</h6>'+ array.fecha +
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Likes</h6>'+ array.likes + '<h6 class="m-0 font-weight-bold text-primary">Ranking</h6>'+ (parseInt(array.ranking) + 1) +
                    '</div>'+
                    '<div class="card-body">'+
                        array.descripcion +
                    '</div>'+
                '</div>'+
            '</div>' ;
    }else{
        ContendioPagina.innerHTML += '<div class="row">'+
            '<div class="col-md-12 col-sm-12">'+
                '<center><img  class="img-rounded text-center" style="max-width: 90%; max-height: 25%; "  src="'+array.portada+'"></center>'+
            '</div>'+
            '</div>'+
            '<br>'+
            '<div class="row">'+
                '<div class="card shadow mb-4 col-md-12 col-sm-12">'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Categoria:</h6>'+ array.categoria +
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Author</h6>' + array.usuario+
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Fecha Publicacion</h6>'+ array.fecha +
                    '</div>'+
                    '<div class="card-header py-3">'+
                        '<h6 class="m-0 font-weight-bold text-primary">Likes</h6>'+ array.likes + '<h6 class="m-0 font-weight-bold text-primary">Ranking</h6>'+ (parseInt(array.ranking) + 1) +
                    '</div>'+
                    '<div class="card-body">'+
                        array.descripcion +
                    '</div>'+
                '</div>'+
            '</div>' ;
    }
}