
//Usando Jquery y Ajax

//url: "https://superheroapi.com/api/3033707663582647/character-"+$("#buscaSuperHero").val(),
//no puede acceder a la api de superHero original, ya que el navegador devuelve error CORS, por lo tanto se accede a api superHero de github, con el fin realizar la prueba

$(document).ready(function () {
    $('.miBtn').on('click', function () {

      if(isNaN($("#buscaSuperHero").val())){
        //cuando el valor ingresado es false
        alert("Favor de igresar un numero");
      }else{
        //alert("holi");
        $.ajax({
            type: "GET",            
            url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + $("#buscaSuperHero").val() + ".json",
            success: function (datosApi) {
                console.log("llegaron los datos");

                //valida si existe un elemento con clase card creado, se ser true lo elimina y se crea uno nuevo
                if( $('.card') ){
                  console.log("card");
                  $('.card'). remove();
                }else{
                  console.log("no card");
              }
                //se crean elementos html con datos obtenidos de la api
                $('.resultado')
                    .append(`<div class="card mb-3 mt-4 mx-auto" style="max-width: 540px;">
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
                                <li class="list-group-item">Ocupacion: ${datosApi.work.occupation}</li>
                                <li class="list-group-item">Primera aparicion: ${datosApi.biography.firstAppearance}</li>
                                <li class="list-group-item">Altura: ${datosApi.appearance.height}</li>
                                <li class="list-group-item">Peso: ${datosApi.appearance.weight}</li>
                                <li class="list-group-item">Alianzas: ${datosApi.biography.aliases}</li>
                              </ul>                  
                            </div>
                          </div>
                        </div>
                      </div>`);

                // se inicializan variables que se usaran en el grafico      
                var intelligence = datosApi.powerstats.intelligence;
                var strength = datosApi.powerstats.strength;
                var speed = datosApi.powerstats.speed;
                var durability = datosApi.powerstats.durability;
                var power = datosApi.powerstats.power;
                var combat = datosApi.powerstats.combat;
           
                //se inicia el grafico y se asigna variables que contienen los datos recogidos de la api
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de poder para ${datosApi.name}`
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
                            { y: intelligence, label: "intelligence" },
                            { y: strength, label: "strength" },
                            { y: speed, label: "speed" },
                            { y: durability, label: "durability" },
                            { y: power, label: "power" },
                            { y: combat, label: "combat" }
                        ]
                    }]
                });
                chart.render();
            },
            error: function (error) {
                //si algo sale mal, se agrega la funcionalidad aquí.

                alert ("No se puede acceder a la api, favor de intertar nuevamente");
                console.log("no llegaron los datos");
            },
        });//ajax
      }//else
    });//funcion inicio
});//document ready

