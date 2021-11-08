
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
//Texto Modal
const txtMensaje = document.getElementById('txtmodal');
const txtTitulo = document.getElementById('txtmodaltitle');
//Botones Modal
const btnClose = document.getElementById('btnclose');
const btnOk = document.getElementById('btnok');
//Datos Usuario
const usuario = localStorage.getItem("usuario");
const usuariojson = JSON.parse(usuario);





function actualizarfechahoy(){
    //FECHA
    let fecha = new Date();
    let fechatexto = String(fecha.getDate() + '/' + ( fecha.getMonth() + 1 ) + '/' + fecha.getFullYear());
    //HORA
    let hora = String(fecha.getHours() + ":"+ fecha.getMinutes() + ":"  +fecha.getSeconds());
    //FEHA Y HORA
    let Fechayhora = fechatexto + ' ' + hora
    //Colocar Fecha hoy en input
    txtfecha.value = Fechayhora;
    //Actualizar Fecha
    setTimeout("actualizarfechahoy()",1000);
    //console.log(new Date(Fechayhora));
}

function mensajeModal(titulo, mensaje){
    //Titulo Modal
    txtTitulo.innerHTML = titulo;
    //Mensaje Modal
    txtMensaje.innerHTML = mensaje;
    //Abrir Modal
    $('#myModal').modal('show');
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
        await mensajeModal("Nuevo Post en UBlog", mensajeerror);
        return false;
    }
}

async function nuevopost(){ 
    //Evalua input correctos
    inputscorrectos = await evaluarinputs();
    console.log(inputscorrectos)
    //BACKEND
    if (inputscorrectos == true) {
        //Crea post en Backend
        await backendnuevopost();
    }
}

async function backendnuevopost(){ 
        //Empaqueta la informacion en un archivo JSON
        
        const data = {
            "portada" : txtLink.value,
            "tipo" : txtTipo.value,
            "descripcion" : txtDescripcion.value,
            "categoria" : txtCategoria.value,
            "fecha" : txtfecha.value,
            "usuario": usuariojson.data.usuario,
            "likes" : "0"
        };
    
        //Convertir en archivo JSON
        const datajson = await JSON.stringify(data);
        console.log(datajson);
        
        //Peticion a servidor on fetch
        const rawResponse = await fetch("http://proyecto2-ipc1v2.herokuapp.com/createpost",{
            method: "PUT",
            body: datajson,
            headers: { 'Content-Type': 'application/json' }
        })
    
        //Convierte la respuesta del servidor en un archivo JSON
        const respuesta = await rawResponse.json();
        console.log(respuesta);

        
    
        //Respuesta correcta del Backend
        if (rawResponse.status == 200){
            if (respuesta.data.mensaje != null){
                //Muestra botones
                btnOk.style.visibility = "visible";
                btnClose.style.visibility = "hidden";
                //Mensaje
                mensajeModal("Registro Usuario en UBlog", respuesta.data.mensaje);
            }else{
                await mensajeModal("Nuevo Post en UBlog1", respuesta.data.mensaje);
            }
        }else{
            await mensajeModal("Registro Usuario en UBlog2", "Ocurrio un erro en el servidor");
        }
}


function redireccionar(){
    window.location.href = "1_4_myposts.html";
}

function test(){
    //alert(txtLink.value + txtfecha.value + txtTipo.value + txtCategoria.value + txtDescripcion.value)
    nuevopost();
}



