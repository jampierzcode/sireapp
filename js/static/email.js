$(document).ready(function () {
  var tipo_hab = $(".hab-type-sec").attr("hab-type");
  console.log(tipo_hab);
  $.getJSON("../../js/habitaciones.json", function (data) {
    position = data.filter((p) => p.slug == tipo_hab);
    console.log(position);
    $("#key_img_main").attr("src", "../../img/" + position[0].img_url);
    $("#key_img_thumb").attr("src", "../../img/" + position[0].img_url);
    $(".title-simple-hab").html(position[0].categoria);
    template = "";
    for (let index = 0; index < position[0].caracteristicas.length; index++) {
      
      template+=`
      <li>${position[0].caracteristicas[index]}</li>
      `
    }
    $(".caracteristicas").html(template);
    $(".description-hab").html(position[0].caracteristicas);

    // formulario de envio
    $("#form-contact").on("submit", function (event) {
      console.log("click");
      event.preventDefault(); // prevent reload
      let name = $("#user_name").val();
      let email = $("#user_email").val();
      let telefono = $("#user_telefono").val();
      let fecha = $("#fecha").val();
      let cant_huespedes = $("#user_cant_huespedes").val();
      let habitacion = position[0].categoria;
      console.log(name, email, telefono, cant_huespedes, fecha, habitacion);
      var settings = {
        "url": "../../sendemail.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "user_name": name,
          "user_email": email,
          "user_telefono": telefono,
          "user_fecha": fecha,
          "user_cant_huespedes": cant_huespedes,
          "user_habitacion": habitacion,
        }
      };

      $.ajax(settings).done(function (response) {
        console.log(response)
        if(response === "El mensaje ha sido enviado"){
          $("#form-contact")[0].reset();
          $(".response-email").html("!Tu mensaje se ha enviado correctamente, Revisa tu correo!");
          $(".response-email").addClass("sucess");

        }
        // console.log(response);
      });
    });
  });
});
