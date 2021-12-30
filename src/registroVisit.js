//-----Reloj -----//
function startTime() {
    var today = new Date(); //Los objetos de fecha se crean con el new Date() constructor (crea un nuevo objeto de fecha con una fecha y hora específicas)
    var hr = today.getHours(); //getHours() devuelve la hora (0 a 23) de una fecha.
    var min = today.getMinutes();//getMinutes() devuelve minutos (0 a 59) de una fecha.
    var sec = today.getSeconds();//getSeconds() devuelve segundos (0 a 59) de una fecha.
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>"; //(reloj de am y pm)
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr; //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap; //impresión de los datos del reloj
//-----Calendario-----//
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var days = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'];
    var curWeekDay = days[today.getDay()];//getDay() método devuelve el día de la semana (0 a 6) de una fecha.
    var curDay = today.getDate();//getDate() método devuelve el día del mes (0 a 31) de una fecha.
    var curMonth = months[today.getMonth()];//getMonth() método devuelve el mes del año (0 a 11) de una fecha.
    var curYear = today.getFullYear();//getFullYear() devuelve el año completo (4 dígitos) de una fecha.
    var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    document.getElementById("date").innerHTML = date ; //impresión de la fecha en pantalla
    var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//-----Función que muestra la webcam disponible
const tieneSoporteUserMedia = () =>
    !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

//-----Declaramos elementos del DOM
 let canvas = document.getElementById("canvas");
 let context = canvas.getContext("2d");
 let video = document.getElementById("video");
 let boton = document.getElementById("boton");
 let $listaDeDispositivos = document.getElementById("listaDeDispositivos");

 const limpiarSelect = () => {
    for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
        $listaDeDispositivos.remove(x);
 };
 const obtenerDispositivos = () => navigator
    .mediaDevices
    .enumerateDevices();

//-----La función que es llamada después de que ya se dieron los permisos
//-----Lo que hace es llenar el select con los dispositivos obtenidos

const llenarSelectConDispositivosDisponibles = () => {

    limpiarSelect();
    obtenerDispositivos()
        .then(dispositivos => {
            const dispositivosDeVideo = [];
            dispositivos.forEach(dispositivo => {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });

//-----Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
            if (dispositivosDeVideo.length > 0) {
//-----Llenar el select
                dispositivosDeVideo.forEach(dispositivo => {
                    const option = document.createElement('option');
                    option.value = dispositivo.deviceId;
                    option.text = dispositivo.label;
                    $listaDeDispositivos.appendChild(option);
                });
            }
        });
}

//-----Aquí guardaremos el stream globalmente
let stream;
//-----Comenzamos pidiendo los dispositivos
    obtenerDispositivos()
        .then(dispositivos => {
//-----Vamos a filtrarlos y guardar aquí los de vídeo
            const dispositivosDeVideo = [];
//-----Recorrer y filtrar
            dispositivos.forEach(function(dispositivo) {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });

//-----Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función y le pasamos el id de dispositivo
            if (dispositivosDeVideo.length > 0) {
//-----Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
                mostrarStream(dispositivosDeVideo[0].deviceId);
            }
        });

    const mostrarStream = idDeDispositivo => {
        _getUserMedia({
                video: {
//-----Justo aquí indicamos cuál dispositivo usar
                    deviceId: idDeDispositivo,
                }
            },
            (streamObtenido) => {
//-----Aquí ya tenemos permisos, ahora sí llenamos el select, de lo contrario, no nos daría el nombre de los dispositivos
                llenarSelectConDispositivosDisponibles();

//-----Escuchar cuando seleccionen otra opción y entonces llamar a esta función
                $listaDeDispositivos.onchange = () => {
//-----Detener el stream
                    if (stream) {
                        stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    }
//-----Mostrar el nuevo stream con el dispositivo seleccionado
                    mostrarStream($listaDeDispositivos.value);
                }

//-----Simple asignación
                stream = streamObtenido;

//-----Mandamos el stream de la cámara al elemento de vídeo
                video.srcObject = stream;
                video.play();

 //------ Botón para capturar la fotografía
 let captFoto = document.getElementById("boton")
 captFoto.addEventListener("click", () => {
  //------Función para la captura de la foto codificada
     function fotoImg(video) {
         let canvas = document.createElement("canvas"); //----Se muestra el video capturado por la cámara para tomar la fotografía
         canvas.width = video.width;
         canvas.height = video.height;
         let context = canvas.getContext("2d");//----Se genera la imagen en 2d dentro del div
         context.drawImage(video, 0, 0, canvas.width, canvas.height);
         let dataURL = canvas.toDataURL(); //--------- Esta es la fotografía en base64
         return dataURL;
      }

     let fotoFb = fotoImg(document.getElementById("canvas"));//------ Se pinta la imagen capturada por la cámara 
     context.drawImage(video, 0, 0, 250, 120); 
     console.log(fotoFb);
    
     //------- Funcionalidad para llamar a firebase y guardarlos 

     const db = firebase.firestore();

      const regVis = document.getElementById('register');
      regVis.addEventListener('click', async (e)=> {
        e.preventDefault();
        const obj = {

        //saludo:'hola'
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('lastName').value,
        telefono: document.getElementById('numberCall').value,
        email: document.getElementById('eMail').value,
        compañia: document.getElementById('oficina').value,
        personal: document.getElementById('gente').value,
        motivo: document.getElementById('reason').value,
        cita: document.getElementById('cita').value,
        fotografia: '',
        checkin: ''
  //---checkout: document.getElementById('').value,
    }

        obj.checkin = new Date();
        obj.fotografia = fotoFb;
        console.log(obj)
        await saveObj(obj);
        alert("Sea usted bienvenid@ a Torre Insurgentes Sur");
            //--- window.location.href = "./index.html";

     })

    const saveObj = (obj) => {
        db.collection('visitantes').doc().set(obj);
        console.log(obj)
    }
  });

  registrarVisit()

  limpiarPersonal = () => {
      document.getElementById('personal').innerHTML = "";
  }
  limpiarMotivos = () => {
      document.getElementById('razon').innerHTML = "";
  }

    }, (error) => {
        console.log("Permiso denegado o error: ", error);
    });
}

    
//-----Iterar datos de JSON------
const registrar = "../data/TorreInsurgentes.json"

let pisoArr = [];
let personalArr = [];
let genteArr = [];

const registrarVisit = () => {
fetch(registrar)
.then((response) => response.json())
.then((data) => {
    pisoArr.push(data);
    console.log(pisoArr);

    for (const piso in pisoArr[0].Empresas) {
        console.log(piso)
        personalArr.push(piso)
        console.log(personalArr);
// iterando pisos
    const printFloor = document.getElementById("pisos")
    printFloor.innerHTML += `
        <option value="${piso}">`
// elección de piso para iterar al personal
    const seleccion = document.getElementById("oficina");
    seleccion.addEventListener('change', () => {
        const seleccionOficina = document.getElementById('oficina').value;
        console.log(seleccionOficina);
        console.log(pisoArr[0].Empresas[seleccionOficina].Personal);
        limpiarPersonal();
        for (const gente of pisoArr[0].Empresas[seleccionOficina].Personal) {
            console.log(gente);
            genteArr.push(pisoArr[0].Empresas[seleccionOficina].Personal)            
            const imprimirPersonal = document.getElementById('personal')
            imprimirPersonal.innerHTML += `
            <option value="${gente}">`
            }
            // iterar motivos de visita
            const motivosVisita = document.getElementById('reason').value
            console.log(motivosVisita);
            console.log(pisoArr[0].Empresas[seleccionOficina].Registro["Motivo de la visita"]);
            limpiarMotivos();
            for (const razon of pisoArr[0].Empresas[seleccionOficina].Registro["Motivo de la visita"]) {
                console.log(razon);
                const imprimirMotivosVisita = document.getElementById('razon')
                imprimirMotivosVisita.innerHTML += `
                <option value="${razon}">`
            }
        })
    }
    })
}





