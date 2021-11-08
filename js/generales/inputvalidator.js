
export async function verificarinput(){
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