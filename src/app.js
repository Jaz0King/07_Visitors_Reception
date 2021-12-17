//Funcionalidad para el login del administrador 
let entrar = document.getElementById('botonEntrar')
let btnComeBack = document.getElementById('button-comeback')
//Al momento de dar click en el botón entrar se ejecuta la función
entrar.addEventListener('click', () =>{
    usuario= document.getElementById('inputP1').value
    contraseña= document.getElementById('inputP2').value 
    console.log(usuario,contraseña)
//Y se redirige a la página del dashboard    
    if(usuario=="Admin" && contraseña=="123") {
        window.location.href = "./admin.html"             
    } else {    
        alert ('contraseña incorrecta')
        console.log(error)
    }
})

btnComeBack.addEventListener('click', () => {
    window.location.href = "./index.html"
  })

//Se pintan dinamicamente las cards de los visitantes
  

 
  

