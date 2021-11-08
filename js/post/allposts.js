//Elementos HTML
PostPanel = document.getElementById('postspanel');

//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');

let filtrolike = false;





async function backendposts(){
        
     //Frontend
        const data = {
        "key": "5"
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/allposts",{
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
            const arregloposts = respuesta.data;
            console.log(arregloposts);
            //Pasar datos del array a la tabla 
            agregarpanelposts(arregloposts);
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }




    
}

function agregarpanelposts(arreglo){
    PostPanel.innerHTML = '';
    console.log("my arreglo")
    console.log(arreglo);
    
    //Recorre array
    for (let i=0; i < arreglo.length; i++){
        //Evaluar si es un video o Imagen
        console.log(arreglo[i.tipo]);
        //Imagen
        if(arreglo[i].tipo == "video"){
            PostPanel.innerHTML += '<!-- POST video  -->'+
            '<div class="col-md-4 col-sm-12" style="margin-bottom: 15px;">'+
                '<div class="card shadow ">'+
                '<a href="1_5_readpost.html">'+
                    '<center><iframe class="embed-responsive-item" src="' + arreglo[i].portada + '"  style="width:100%; height: 200px; margin-bottom: -8px;} " ></iframe></center>'+
                '</a>'+
                    '<div class="row no-gutters align-items-center">'+
                        '<div class="col card-body" style="padding: 5px;">'+
                            '<div class="row">'+
                                '<div class="col-md-4" style="padding-right: 0px;">'+
                                    '<a style="cursor: pointer;" onclick="nuevolike('+ arreglo[i].id +')" ><img  class="img-rounded float-left" style="padding-left: 5px;" width="40px" height="40px" src="https://images.vexels.com/media/users/3/157338/isolated/preview/4952c5bde17896bea3e8c16524cd5485-icono-de-me-gusta-de-facebook.png"></a>'+
                                    '<div style="padding-top: 15px; font-size: 14px; padding-left: 5px;" class="font-weight-bold text-gray-800 ">&nbsp;&nbsp; ' + arreglo[i].likes + '</div>'+
                                '</div>'+
                                '<a href="1_5_readpost.html?'+ arreglo[i].id +'">'+
                                '<div class="col-md-8" style=" padding-left: 5px;">'+
                                    '<div style="padding-top: 17px; font-size: 12px;" class="text-gray-800">- ' + arreglo[i].usuario + ' - ' + arreglo[i].fecha + '</div>'+
                                '</div>'+
                                '</a>'
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<br>'+'<br>'+
            '</div>'+
            '<!-- FIN POST -->';




        }else{
            PostPanel.innerHTML += '<!-- POST imagen  -->'+
            '<div class="col-md-4 col-sm-12" style="margin-bottom: 15px;">'+
                '<div class="card shadow ">'+
                    '<a href="1_5_readpost.html?'+ arreglo[i].id +'">'+
                        '<center><img  class="img-rounded text-center" style="width: 100%; height: 200px; "  src="' + arreglo[i].portada + '"></center>'+
                    '</a>'+
                    '<div class="row no-gutters align-items-center">'+
                        '<div class="col card-body" style="padding: 5px;">'+
                            '<div class="row">'+
                                '<div class="col-md-4" style="padding-right: 0px;">'+
                                    '<a style="cursor: pointer;" onclick="nuevolike('+ arreglo[i].id +')" ><img  class="img-rounded float-left" style="padding-left: 5px;" width="40px" height="40px" src="https://images.vexels.com/media/users/3/157338/isolated/preview/4952c5bde17896bea3e8c16524cd5485-icono-de-me-gusta-de-facebook.png"></a>'+
                                    '<div style="padding-top: 15px; font-size: 14px; padding-left: 5px;" class="font-weight-bold text-gray-800 ">&nbsp;&nbsp; ' + arreglo[i].likes + '</div>'+
                                '</div>'+
                                '<a href="1_5_readpost.html?'+ arreglo[i].id +'">'+
                                    '<div class="col-md-8" style=" padding-left: 5px;">'+
                                        '<div style="padding-top: 17px; font-size: 12px;" class="text-gray-800">- ' + arreglo[i].usuario + ' - ' + arreglo[i].fecha + '</div>'+
                                    '</div>'+
                                '</a>'
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<!-- FIN POST -->';
        }
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

async function nuevolike(id){


    //Frontend
    const data = {
        "id": String(id)
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/likepost",{
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
            const arregloposts = respuesta.data;
            console.log(arregloposts);
            setTimeout(function(){
                if (filtrolike == true){
                    ordenporlike()
                }else{
                    backendposts();
                }
            },1000)
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }

    


}



////////////////////////////////////////////////////////////////



async function ordenporlike(){
    filtrolike = true;
    //Frontend
    const data = {
        "usuario": "test"
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/filterlike",{
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
            console.log("informacion posts2");
            const arregloposts = respuesta.data.datacrud;
            console.log(arregloposts);
            agregarpanelposts(arregloposts);
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }

}