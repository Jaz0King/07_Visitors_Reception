
let btnComeBack = document.getElementById('button-comeback')
btnComeBack.addEventListener('click', () => {
    window.location.href = "./index.html"
  })


/*
//Se pintan dinamicamente las cards de los visitantes
  
export const ctx = document.getElementById("myChart").getContext("2d");
export const myChart = new Chart(ctx, {
  type: "pie",
  data: {

    datasets: [
      {
        label: "Estudiantes",
        data: [12, 19, 2],
        backgroundColor: [
          "rgba(200, 3, 255, .7)",
          "rgba(1, 255, 1, .7)",
          "rgba(255, 255, 0, .7)"

        ],
        borderColor: [
          "#fff",
          "#fff",
          "#fff"
        ],
        color: "#000",
        borderSadow: 1,
      },
    ],
    labels: ["Mas 90 %", "Menos 60 %", "Entre 60 y 90 %"],
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15
          },
          color: 'white'
        }
      }
    }
  },
});

//Se renderea la gráfica en el html 
export function renderGraph(sede, gen) {
  //Se limpian los datos de la gráfica para volver a graficar
  myChart.data.datasets[0].data = []
  //Se declaran las variables para reutilizar los valores
  let total = arr[sede].generacion[gen].estudiantes.length
  let mas90 = 0
  let menos60 = 0
  //Se compara alumna por alumna si tiene de completitud  menos 
  for (let i = 0; i < arr[sede].generacion[gen].estudiantes.length; i++) {
    //de 90% o mas
    if (arr[sede].generacion[gen].estudiantes[i].progreso.porcentajeCompletado > 90) {
      mas90++
    } else {
      //de 60% o menos
      if (arr[sede].generacion[gen].estudiantes[i].progreso.porcentajeCompletado < 60) {
        menos60++
      } else {

      }
    }
  }
  //entre 61% y el 89% de completitud
  let resto = total - mas90 - menos60
  //Se envian los valores a las variables 
  myChart.data['datasets'][0].data.push(mas90)
  myChart.data['datasets'][0].data.push(menos60)
  myChart.data['datasets'][0].data.push(resto)
  myChart.update()
}
*/ 
  

