$(document).ready(function () {
  $("#ancla-add").click(function () {
    $("#ancla-add").toggleClass("hidden");
    $(".create-clients").toggleClass("hidden");
  });
  $(".btn-cancel-create").click(function () {
    $("#ancla-add").toggleClass("hidden");
    $(".create-clients").toggleClass("hidden");
  });

  var funcion = "";

  $("#client-btn-add").click(() => {
    funcion = "ruc";
    console.log("click");
    var names = $("#client-names").val();
    var ruc = $("#client-dni").val();
    var email = $("#client-email").val();
    var phone = $("#client-phone").val();
    var pais = $("#client-pais").val();
    $.post(
      "../../components/consultas_api.php",
      { funcion, ruc },
      (response) => {
        const datos_ruc = JSON.parse(response);
        console.log(datos_ruc.razonSocial);
      }
    );
  });
});
