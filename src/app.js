
import {traerDatos} from "./data.js"
traerDatos()

let btnComeBack = document.getElementById('button-comeback')
btnComeBack.addEventListener('click', () => {
    window.location.href = "./index.html"
  })


