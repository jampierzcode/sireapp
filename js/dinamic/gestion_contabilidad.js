$(document).ready(function () {
  var funcion = "";
  buscar_datos_contabilidad();
  function buscar_datos_contabilidad() {
    funcion = "buscar_datos_contabilidad";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        const datos = JSON.parse(response);
        datos.forEach((dato) => {
          $("#data-proyectos").html(dato.proyectos);
          $("#data-asesores").html(dato.asesores);
        });
      }
    );
  }
});
