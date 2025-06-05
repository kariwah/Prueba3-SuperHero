//Usando Jquery y Ajax

//url: "https://superheroapi.com/api/3033707663582647/character-"+$("#buscaSuperHero").val(),
//no puede acceder a la api de superHero original, ya que el navegador devuelve error CORS, por lo tanto se accede a api superHero de github, con el fin realizar la prueba
$(document).ready(function () {
  // al presionar Enter en el campo, se ejecuta el botón
  $("#buscaSuperHero").on("keypress", function (e) {
    if (e.which === 13) { // tecla Enter
      e.preventDefault(); // previene que el formulario se envíe
      $(".miBtn").click(); // simula clic en el botón
    }
  });

  // evento click del botón
  $(".miBtn").on("click", function () {
    const idHero = $("#buscaSuperHero").val();

    if (isNaN(idHero) || idHero === "") {
      alert("Favor de ingresar un número");
      return;
    }

    $.ajax({
      type: "GET",
      url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + idHero + ".json",
      success: function (datosApi) {
        console.log("llegaron los datos");

        // limpiar resultados anteriores
        $(".card").remove();

        // muestra tarjeta con datos
        $(".resultado").append(`
          <div class="card mb-3 mt-4 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${datosApi.images.md}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">            
                  <p class="card-text">Nombre: ${datosApi.name}</p>
                  <p class="card-text">Conexiones: ${datosApi.connections.groupAffiliation}</p>
                  <p class="card-text">Publicado por: ${datosApi.biography.publisher}</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Ocupación: ${datosApi.work.occupation}</li>
                    <li class="list-group-item">Primera aparición: ${datosApi.biography.firstAppearance}</li>
                    <li class="list-group-item">Altura: ${datosApi.appearance.height}</li>
                    <li class="list-group-item">Peso: ${datosApi.appearance.weight}</li>
                    <li class="list-group-item">Alianzas: ${datosApi.biography.aliases}</li>
                  </ul>                  
                </div>
              </div>
            </div>
          </div>
        `);

        // gráfico 
        const stats = datosApi.powerstats;
        const chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2",
          exportEnabled: true,
          animationEnabled: true,
          title: {
            text: `Estadísticas de poder para ${datosApi.name}`
          },
          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
              { y: stats.intelligence, label: "intelligence" },
              { y: stats.strength, label: "strength" },
              { y: stats.speed, label: "speed" },
              { y: stats.durability, label: "durability" },
              { y: stats.power, label: "power" },
              { y: stats.combat, label: "combat" }
            ]
          }]
        });
        chart.render();

        // limpia el campo
        $("#buscaSuperHero").val("");
      },
      error: function () {
        alert("No se puede acceder a la API, intenta nuevamente.");
      }
    });
  });
});
