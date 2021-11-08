//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');


const txtjson = document.getElementById('txtjson');


////////////////////////////////////////////////////////////////

async function caragamamasivatexarea(){
    //Evaluar si no esta vacio
    if (txtjson.value == null || txtjson.value == undefined || txtjson.value == '' || txtjson.value == ' '){
        mensajeModal("UBLOG - carga masiva usaurios", "Porfavor llene el textarea para mandar el JSON correctamente.");
    }else{
        //Envia backend
        enviarjsontextarea();
    }
}

////////////////////////////////////////////////////////////////

async function enviarjsontextarea(){
    //Crea un archivo JSON con la informacion requerida para ingresar
    const data = txtjson.value
    console.log(data);
    //convierte en un arreglo
    let dataarreglo = JSON.parse(data)
    console.log(dataarreglo)
    //convierte en un arreglo JSON
    let dataJson = JSON.stringify(dataarreglo);
    console.log(dataJson)


    //Peticion a servidor con fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/carga-masiva/usuarios",{
        method: "POST",
        body: dataJson,
        headers: { 'Content-Type': 'application/json' }
    })
    
    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json()
    console.log(respuesta)

    if (rawResponse.status == 200){
        if (respuesta.mensaje == "OK"){
            mensajeModal("Carga Masiva Backend", "Datos cargados con exito")
        }else{
            mensajeModal("Carga Masiva Backend", respuesta.mensaje)
        }
        
    }else{
        mensajeModal("Carga Masiva Backend", "Error: "+respuesta.data.mensaje)
    }
}

////////////////////////////////////////////////////////////////



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


async function cargaMasiva(){
    //obtiene el archivo
    let archivo = document.getElementById('inputCM').files[0]
    console.log(archivo)
    //lee el archivo
    const reader = new FileReader()
    //carga a al servidor el archivo
    reader.addEventListener("load", (event) => {
        console.log(event.target.result)
        try {
            enviarInfo(JSON.parse(event.target.result))
        } catch (error) {
            console.error(error);
            mensajeModal("Error", "Verifique si es un archivo JSON, Error: "+ error)
        }
        
        
    })

    reader.readAsText(archivo, "UTF-8")
}

////////////////////////////////////////////////////////////////

async function enviarInfo(jsonCM){
    console.log("Backend")
    console.log(jsonCM)

    //Crea un archivo JSON con la informacion requerida para ingresar
    const data = jsonCM
    console.log(data);
    //convierte en un arreglo JSON
    let dataJson = JSON.stringify(data);
    console.log(dataJson)


    //Peticion a servidor con fetch
    const rawResponse = await fetch("http://127.0.0.1:4000/carga-masiva/usuarios",{
        method: "POST",
        body: dataJson,
        headers: { 'Content-Type': 'application/json' }
    })
    
    //Convierte la respuesta del servidor en un archivo JSON
    const respuesta = await rawResponse.json()
    console.log(respuesta)

    if (rawResponse.status == 200){
        if (respuesta.mensaje == "OK"){
            mensajeModal("Carga Masiva Backend", "Datos cargados con exito")
        }else{
            mensajeModal("Carga Masiva Backend", respuesta.mensaje)
        }
        
    }else{
        mensajeModal("Carga Masiva Backend", "Error: "+respuesta.data.mensaje)
    }
}
