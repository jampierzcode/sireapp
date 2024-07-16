$(document).ready(function () {
  var funcion = "";

  // Obtener fecha actual
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  $("#reserva-ingreso").val(ano + "-" + mes + "-" + dia);
  dia = dia + 1;
  $("#reserva-salida").val(ano + "-" + mes + "-" + dia);

  //   Buscar habitacion por id
  var id_habitacion = $("#get-id").val();

  buscar_habitacion();
  function buscar_habitacion() {
    funcion = "buscar_habitacion";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_habitacion },
      (response) => {
        const habitacion = JSON.parse(response);
        habitacion.forEach((hab) => {
          $("#hab-ncuarto").html(hab.n_cuarto);
          $("#hab-categoria").html(hab.nombre_categoria);
          $("#hab-estado").html(hab.estado);
          let precio = `S/${hab.precio}.00`;
          $("#hab-precio").html(precio);
          $("#reserva-total").val(hab.precio);
          $("#reserva-total-descuento").val(hab.precio);
        });

        var total = $("#reserva-total").val();
        $(document).on("keyup", "#reserva-descuento", (e) => {
          aplicar_descuento(total);
        });

        $("#reserva-salida").change((e) => {
          aplicar_descuento(total);
        });
      }
    );
  }
  function aplicar_descuento(total) {
    var resta;
    var fecha_s = $("#reserva-salida").val();
    var f_s = new Date(fecha_s); //Fecha actual
    var dia_s = f_s.getDate();

    //

    var fecha_i = $("#reserva-ingreso").val();
    var f_i = new Date(fecha_i);
    var dia_i = f_i.getDate();

    //
    var descuento = $("#reserva-descuento").val();
    resta = dia_s - dia_i;
    $("#reserva-total").val(total * resta);
    $("#reserva-total-descuento").val(total * resta - descuento);
  }
  $("#add-reserva-btn").click(() => {
    funcion = "crear_reserva";
    let cliente = $("#reserva-cliente").val();
    let documento = $("#reserva-documento").val();
    let ingreso = $("#reserva-ingreso").val();
    let salida = $("#reserva-salida").val();
    let descuento = $("#reserva-descuento").val();
    let adelanto = $("#reserva-adelanto").val();
    let observacion = $("#reserva-observacion").val();
    let id_hab = $("#get-id").val();
    let total = $("#reserva-total").val();
    let total_descuento = $("#reserva-total-descuento").val();
    if (cliente && id_hab && ingreso && salida && total && total_descuento) {
      if (
        $("#reserva-cliente").val() ==
        "No existen registro de este cliente cree uno nuevo"
      ) {
        alert("Falta agregar datos del cliente");
      } else {
        $.post(
          "../../controlador/UsuarioController.php",
          {
            funcion,
            cliente,
            documento,
            id_hab,
            ingreso,
            salida,
            descuento,
            adelanto,
            observacion,
            total,
            total_descuento,
          },
          (response) => {
            if (response.trim() == "add-reserva") {
              document.location = "../Recepcion";
            } else {
              alert("No se registro la reserva");
            }
          }
        );
      }
    } else {
      if ($("#reserva-documento").val() == 0) {
        alert("falta agregar documento del cliente");
      } else {
        if ($("#reserva-cliente").val() == "") {
          alert("Falta agregar DNI o RUC, para cargar el cliente");
        } else {
          alert("algo salio mal recargue la pagina");
        }
      }
    }
  });

  // section presentation modal

  $("#new_cliente").click(() => {
    $(".modal-create-client").removeClass("md-hidden");
  });
  $(".form-create-cliente .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $(".modal-create-client").addClass("md-hidden");
  });

  $("#cancel-form-client").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $(".modal-create-client").addClass("md-hidden");
  });

  // fin de presentation modal

  // CHANGE TIPO DE DOCMUENTO
  $("#reserva-tipo-documento").change(() => {
    if ($("#reserva-tipo-documento").val() > 0) {
      $("#reserva-documento").attr("disabled", false);
    } else {
      $("#reserva-documento").attr("disabled", "true");
    }
    $("#reserva-documento").val("");
  });
  // fin de change

  // BUSCAR CLICK CLIENTE
  $("#btn-search-dni-ruc").click(() => {
    let tipo_documento = $("#reserva-tipo-documento").val();
    if (tipo_documento > 0) {
      if (tipo_documento == 1) {
        let documento = $("#reserva-documento").val();
        if (documento.length != 8) {
          alert("la cantidad de digitos para el dni es incorrecto");
        } else {
          funcion = "buscar_cliente";
          $.post(
            "../../controlador/UsuarioController.php",
            { funcion, documento },
            (response) => {
              if (
                response == "No existen registro de este cliente cree uno nuevo"
              ) {
                $("#reserva-cliente").val(`${response}`);
                $("#reserva-cliente").attr("key-documento", "undefined");
              } else {
                const clientes = JSON.parse(response);

                clientes.forEach((cliente) => {
                  $("#reserva-cliente").val(`${cliente.nombres}`);
                  $("#reserva-cliente").attr(
                    "key-documento",
                    `${cliente.documento}`
                  );
                });
              }
            }
          );
        }
      } else {
        let documento = $("#reserva-documento").val();
        if (documento.length != 11) {
          alert("la cantidad de digitos para el ruc es incorrecto");
        } else {
          funcion = "ruc";
          $.post(
            "../../components/consultas_api.php",
            { funcion, documento },
            (response) => {
              const clientes = JSON.parse(response);

              $("#reserva-cliente").val(`${clientes.razonSocial}`);
            }
          );
        }
      }
    } else {
      alert("no selecciono el tipo de documento");
    }
  });
  // FIN DE CHANGE

  // Crear cliente
  $("#tipo-documento-modal").change(() => {
    if ($("#tipo-documento-modal").val() > 0) {
      $("#documento-modal").attr("disabled", false);
    } else {
      $("#documento-modal").attr("disabled", "true");
    }
    $("#documento-modal").val("");
  });

  $("#add-client-form").click(() => {
    funcion = "add_cliente";
    let tipo_documento = $("#tipo-documento-modal").val();
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    // if ((tipo_documento && $documento, $nombres)) {
    //   if (tipo_documento == 0) {
    //     alert("Escoja el tipo de documento");
    //   }
    // } else {
    //   alert("Le faltan agregar campos en el formulario");
    // }
    console.log(tipo_documento);
    console.log(documento);
    console.log(nombres);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, tipo_documento, documento, nombres },
      (response) => {
        console.log(response);
        if (response.trim() == "add-cliente") {
          alert("Cliente agregado correctamente");
        }
      }
    );
  });
});
