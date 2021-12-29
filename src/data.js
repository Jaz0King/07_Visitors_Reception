//Se declaran los arreglos para añadir los registros 
let dataRegistro =[]
let arrVisit =[]

const db = firebase.firestore();

const onGetData = (callback) => db.collection('visitantes').onSnapshot(callback)


export async function traerDatos() {
  onGetData((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       let visitante = doc.data()
        visitante.id = doc.id
     //console.log(visitante)
      dataRegistro.push(visitante)
    })
           //se pasa la data de firebasea una variable 
    arrVisit = dataRegistro
    console.log(arrVisit)
    pintarVisit()

  })
}

function pintarVisit() {
  //console.log(arrVisit.length);
  let cards = arrVisit[0];
  console.log(cards.nombre);

  for (let cards of arrVisit) {
    document.getElementById("nombresCards").innerHTML += `
            <div class="card" style="width: 18rem;">
             <h4 class="card-header" value="${cards}" data-bs-target="#staticBackdrop${cards.id}"> ${cards.nombre} ${cards.apellido} </h4>
              <div class="card-body">
               <img id="visit" src="${cards.fotografia}">

               <!-- Button trigger modal -->
               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${cards.id}">
                 Ver Mas
               </button>
               
               <!-- Modal -->
               <div class="modal fade" id="staticBackdrop${cards.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                 <div class="modal-dialog">
                   <div class="modal-content">
                     <div class="modal-header">
                       <h5 class="modal-title"  id="staticBackdropLabel"> ${cards.nombre} ${cards.apellido} </h5>
                     </div>
                     <div class="modal-body">
                     <ul class="list-group list-group-flush">
                    <li class="list-group-item">Compañía: ${cards.compañia}</li>
                    <li class="list-group-item">Motivo: ${cards.motivo}</li>
                    <li class="list-group-item">Cita: ${cards.cita}</li>
                    <li class="list-group-item">A quien visita: ${cards.personal}</li>
                    <li class="list-group-item">Telefono: ${cards.telefono}</li>
                    <li class="list-group-item">E-mail: ${cards.email}</li>
                    </ul>
                     </div>
                     <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                       <button type="button" class="btn btn-primary">Check-Out</button>
                     </div>
                   </div>
                 </div>
               </div>   

               </div>
            </div> ` 
  }
}


