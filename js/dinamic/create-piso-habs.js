$(document).ready(function () {
  $("#piso-habs-btn-add").click(() => {
    console.log("click");
    funcion = "crear_piso-habitacion";
    let piso_nombre = $("#piso-nombre").val();

    if (piso_nombre) {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          piso_nombre,
        },
        (response) => {
          console.log(response);
          $("#piso-nombre").val("");
        }
      );
    } else {
      let template = "";
      if (!piso_nombre) {
        template += "Falta registrar nombre ";
      }
      alert(template);
    }
  });
});
