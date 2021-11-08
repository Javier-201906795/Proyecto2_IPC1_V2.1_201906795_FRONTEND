const panelAdmin = document.getElementById('paneladmin');
const arealogin = document.getElementById('arealogin');
const areauser = document.getElementById('areauser');
const nombreusuario = document.getElementById('nombreusuario');



//verifica si esta iniciada la secion
function verificarLogin(){
    
    const usuario = localStorage.getItem("usuario");
    const usuariojson = JSON.parse(usuario);
    //Verifica si esta vacio
    if(!usuario){
        //Si es asi redirige a login
        window.location.href = "1_2_login.html"
    }else{
        //Si si esta logeado
        //Oculta el area de login
        arealogin.innerHTML = '';
        //Mostrar opciones usuario
        areauser.style.visibility = "visible";
        //Coloca el nombre del usuario logeado
        nombreusuario.innerHTML = usuariojson.data.usuario
        //Verificar si es un usuario ADMIN
        if (usuariojson.data.id == "0"){
            //Mostrar panel admin
            panelAdmin.style.visibility = "visible";
        }
    }
}


//verifica si esta iniciada la secion
function verificarLoginINDEX(){
    
    const usuario = localStorage.getItem("usuario");
    const usuariojson = JSON.parse(usuario);
    //Verifica si esta vacio
    if(!usuario){
        //Si es asi redirige a login
        
    }else{
        //Si si esta logeado
        //Oculta el area de login
        arealogin.innerHTML = '';
        //Mostrar opciones usuario
        areauser.style.visibility = "visible";
        //Coloca el nombre del usuario logeado
        nombreusuario.innerHTML = usuariojson.data.usuario
        //Verificar si es un usuario ADMIN
        if (usuariojson.data.id == "0"){
            //Mostrar panel admin
            panelAdmin.style.visibility = "visible";
        }
    }
}


//verifica si esta iniciada la secion
function verificarLoginADMIN(){
    
    const usuario = localStorage.getItem("usuario");
    const usuariojson = JSON.parse(usuario);
    //Verifica si esta vacio
    if(!usuario){
        //Si es asi redirige a login
        window.location.href = "1_2_login.html"
    }else{
        //Si si esta logeado
        //Oculta el area de login
        arealogin.innerHTML = '';
        //Mostrar opciones usuario
        areauser.style.visibility = "visible";
        //Coloca el nombre del usuario logeado
        nombreusuario.innerHTML = usuariojson.data.usuario
        //Verificar si es un usuario ADMIN
        if (usuariojson.data.id == "0"){
            //Mostrar panel admin
            panelAdmin.style.visibility = "visible";
        }else{
            window.location.href = "1_3_actualizardatos.html"
        }
    }
}


//Cerrar secion 
function cerrarSecion(){
    //Elmina la informacion local de inicio de secion
    localStorage.removeItem("usuario");
    //Verifica si esta iniciado nuevamente
    verificarLogin();
}

//Cerrar secion 
function cerrarSecionINDEX(){
    //Elmina la informacion local de inicio de secion
    localStorage.removeItem("usuario");
    //verifica el login
    verificarLoginINDEX();
    setTimeout(function(){
        window.location.reload();
    },500)
}