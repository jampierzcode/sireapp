//  var form = document.querySelector('#form-agenda')

//  form.addEventListener('submit', function (event) {
//      event.preventDefault()
//      if (!form.checkValidity()) {
//       event.stopPropagation()
//     }

//     form.classList.add('was-validated')
//   }, false)

$("#form-agenda").submit((e) => {
  e.preventDefault();
  let name = $("#validationCustom01").val();
  let apellido = $("#validationCustom02").val();
  let celular = $("#validationCustom03").val();
  let email = $("#validationCustom04").val();
  let ciudad = $("#validationCustom05").val();
  let fecha = $("#validationCustom06").val();
  let hora = $("#validationCustom07").val();

  console.log(name, celular, apellido, email, ciudad, fecha)

  var settings = {
    url: "sendagenda.php",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      user_name: name,
      user_apellido: apellido,
      user_email: email,
      user_telefono: celular,
      user_ciudad:ciudad,
      fecha: fecha,
      hora: hora,
    },
  };

  $.ajax(settings).done(function (response) {
    if (response === "El mensaje ha sido enviado") {
      $("#form-agenda")[0].reset();
      $("#response-agenda").html(
        "!Tu mensaje se ha enviado correctamente, Revisa tu correo!"
      );
      $("#response-agenda").addClass("sucess");
    }else{
      console.log(response);
    }
    // console.log(response);
  });
});
