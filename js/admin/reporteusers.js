// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
//Grafica
var ctxBarChart = document.getElementById("myPieChart");

//Areglo con los datos
let arraydatos = [{"likes": 5}];


async function toppostsbackend(){
    //Frontend
    const data = {
        "usuario": "test"
    };

    //Convertir en archivo JSON
    const datajson = await JSON.stringify(data);
    console.log(datajson);
    
    //Peticion a servidor on fetch
    const rawResponse = await fetch("https://flaskserver-h4l9s.ondigitalocean.app/reporteposts",{
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
            const arregloposts = respuesta.data.datacrud;
            console.log(arregloposts);
            //Pasar datos del array a la tabla 
            arraydatos = arregloposts
            //Iniciar tabla 
            await graficabarras();
            return arregloposts;
        
    }else{
        await mensajeModal("Posts en UBlog1", "Ocurrio un erro en el servidor " + rawResponse.status);
    }
}



function exportarBarrasPDF(){

    // Crear imagen de la grafica

    let imgCanvas = ctxBarChart.toDataURL("image/png", 1.5);

    // Crear PDF desde la imagen
    let documento = new jsPDF('landscape');
	documento.setFontSize(20);
	documento.text(100, 25, "Usuarios con mas Posts en UBLOG");
    documento.setFillColor(204, 204,204,0);
	documento.addImage(imgCanvas, 'JPEG', 15, 50, 150, 75 );
    documento.setFontSize(14);
    // documento.text(180, 60, "Ranking  |  ID-Posts   |     Autor    |     Likes ");
    // documento.text(180, 70, "    1         |        "+String(arraydatos[0].id)+"         |     "+String(arraydatos[0].usuario)+"   |     "+String(arraydatos[0].likes)+" ");
    // documento.text(180, 80, "    2         |        "+String(arraydatos[1].id)+"         |     "+String(arraydatos[1].usuario)+"   |     "+String(arraydatos[1].likes)+" ");
    // documento.text(180, 90, "    3         |        "+String(arraydatos[2].id)+"         |     "+String(arraydatos[2].usuario)+"   |     "+String(arraydatos[2].likes)+" ");
    // documento.text(180, 100, "    4         |        "+String(arraydatos[3].id)+"         |     "+String(arraydatos[3].usuario)+"   |     "+String(arraydatos[3].likes)+" ");
    // documento.text(180, 110, "    5         |        "+String(arraydatos[4].id)+"         |     "+String(arraydatos[4].usuario)+"   |     "+String(arraydatos[4].likes)+" ");
    

	documento.save('graficaBarras.pdf');
}










function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
    }

    

function graficabarras(){
    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Direct", "Referral", "Social"],
        datasets: [{
        data: [55, 30, 15],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });
}
