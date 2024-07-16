$(document).ready(function () {
  var funcion = "";
  buscar_habs_ocupadas();
  function buscar_habs_ocupadas() {
    funcion = "buscar_habs_ocupaded";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "No existen registro de habitaciones") {
          template += "No hay registros";
          let estado = "";
        } else {
          const habitaciones = JSON.parse(response);
          habitaciones.forEach((habitacion) => {
            estado = habitacion.estado.toLowerCase();
            template += `
              <div class="card-habs bg-salida">
              <div class="body-card">
                  <ion-icon name="bed-outline"></ion-icon>
                  <h1>Nro: ${habitacion.n_cuarto}</h1>
                  <h1>${habitacion.numero_piso}</h1>
                  <span>${habitacion.nombre_categoria}</span>
              </div>
              <div class="footer-card">`;
            template += `
                  <a href="?id=${habitacion.id_habitaciones}&&view=verificacion">
                      <span>Ver detalles</span>
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                  </a>`;
            template += `
              </div>
              </div>
              `;
          });
        }
        $(".list-habitaciones").html(template);
      }
    );
  }
});
