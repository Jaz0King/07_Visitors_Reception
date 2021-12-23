let data = [];

const db = firebase.firestore();

const traer = () => db.collection("visitantes").get();

export async function traerDatos() { 
  const querySnapshot = await traer()
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  })
  renderVis()
  ordenar = data.slice
  console.log(data)
}

function renderVis() {
  let cards = data[0]
  for (let card of data) {
    document.getElementById('nombres').innerHTML += `
    <div class="card" style="width: 18rem;">
            <h4 class="card-header" value="${cards}">${card.nombre}</h4>
            <div class="card-body">
              <img id="visitor" src="../assets/IMG/visitor.png">
              <h6>Check-In: 16:40hrs 15/12/21 </h6>
              <h6>Check-Out: </h6> 
              <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=#id${i}>Check-Out</a>
            </div>
          </div>`

  }
}
console.log(data)