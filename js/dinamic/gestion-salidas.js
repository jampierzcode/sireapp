$(document).ready(function () {
  var funcion = "";
  var carrito_consumo = new Array();
  buscar_reserva();

  function buscar_reserva() {
    let id_habitacion = $("#get-id").val();
    funcion = "buscar_reserva";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_habitacion },
      (response) => {
        const reserva = JSON.parse(response);
        reserva.forEach((detail) => {
          $("#reserva_key").attr("key_reserva", `${detail.id_reservas}`);
          $("#hab-ncuarto").html(`${detail.n_cuarto}`);
          $("#hab-cliente").html(`${detail.cliente}`);
          $("#hab-cliente_documento").html(`${detail.documento}`);
          $("#hab-precio").html(`S/${detail.precio}.00`);
          $("#hab-categoria").html(`${detail.nombre_categoria}`);
          $("#hab-categoria").html(`${detail.nombre_categoria}`);
          $("#hab-fecha_entrada").html(`${detail.fecha_entrada}`);
          $("#hab-fecha_salida").html(`${detail.fecha_salida}`);
          buscar_detail_reserva(detail.id_reservas);
          buscar_detail_consumo(detail.id_reservas);
        });
      }
    );
  }
  function buscar_detail_reserva(id_reserva) {
    funcion = "buscar_detail_reserva";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_reserva },
      (response) => {
        let template = "";
        const reserva = JSON.parse(response);
        reserva.forEach((detail_reserva) => {
          let total = Number(detail_reserva.total);
          let descuento = Number(detail_reserva.descuento);
          let adelanto = Number(detail_reserva.adelanto);
          template += `          
          <div class="row_list">
            <p class="column_valors">S/${total.toFixed(2)}</p>
            <p class="column_valors">S/${descuento.toFixed(2)}</p>
            <p class="column_valors">S/${adelanto.toFixed(2)}</p>
            <p class="column_valors"><input id="penalidad_reserva" type="number"></p>
            <p id="porpagar_hospedaje" class="column_valors danger" key_porpagar="${
              total - descuento - adelanto
            }">S/${(total - descuento - adelanto).toFixed(2)}</p>
        </div>
          `;
        });
        $("#list_campos_reserva").html(template);
      }
    );
  }
  function buscar_detail_consumo(id_reserva) {
    funcion = "buscar_detail_consumo";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_reserva },
      (response) => {
        if (
          response.trim() ==
          "No existen registros de ventas para esta habitacion"
        ) {
          $("#table_consumo").html(response);
          let por_pagar_host = $("#porpagar_hospedaje").attr("key_porpagar");
          $("#total-pagar").attr("key_pagar_total", por_pagar_host);
          $("#total-pagar").html(`S/${Number(por_pagar_host).toFixed(2)}`);
          let por_pagar = $("#total-pagar").attr("key_pagar_total");
          $(document).on("keyup", "#penalidad_reserva", (e) => {
            aplicar_descuento(por_pagar_host, por_pagar);
          });
        } else {
          $("#table_consumo").html(`
          <div class="header-table">
              <p class="column_tabla">Producto</p>
              <p class="column_tabla">Cantidad</p>
              <p class="column_tabla">Precio Unitario</p>
              <p class="column_tabla">Estado</p>
              <p class="column_tabla">Subtotal</p>
          </div>
          <div id="list_campos_consumo" class="body-table">

          </div>

          <div class="total_price">
              <h1>Total Consumo:</h1>
              <div class="last-option" id="total-consumo">s/0.00</div>
          </div>
          <div class="total_price">
              <h1 class="danger">Por pagar:</h1>
              <div id="por_pagar" class="select_pago_modo last-option">s/0.00
              </div>
          </div>`);
          let template = "";
          const consumo = JSON.parse(response);
          let suma_consumo = 0;
          let suma_porpagar = 0;
          consumo.forEach((detail_consumo) => {
            let cantidad = Number(detail_consumo.cantidad);
            let precio = Number(detail_consumo.precio);
            let subtotal = Number(detail_consumo.subtotal);
            template += `          
          <div class="row_list">
            <p class="column_valors">${detail_consumo.nombre}</p>
            <p class="column_valors">${cantidad} und</p>
            <p class="column_valors">S/${precio.toFixed(2)}</p>`;
            if (detail_consumo.estado_pago == "PAGADO") {
              template += `<p class="column_valors pay">${detail_consumo.estado_pago}</p>`;
            } else {
              let json_producto = {
                id: detail_consumo.id_detalle_venta,
              };

              carrito_consumo.push(json_producto);
              suma_porpagar = suma_porpagar + subtotal;
              template += `<p class="column_valors no_pay">${detail_consumo.estado_pago}</p>`;
            }
            template += `
            <p class="column_valors">S/${subtotal.toFixed(2)}</p>
        </div>
          `;
            suma_consumo = suma_consumo + subtotal;
          });
          let porpagar_host = $("#porpagar_hospedaje").attr("key_porpagar");
          let por_pagar = suma_porpagar + Number(porpagar_host);
          $("#list_campos_consumo").html(template);
          $("#por_pagar").html(`S/${suma_porpagar.toFixed(2)}`);
          $("#total-pagar").html(`S/${por_pagar.toFixed(2)}`);
          $("#total-pagar").attr("key_pagar_total", por_pagar);
          $("#total-consumo").html(`S/${suma_consumo.toFixed(2)}`);

          $(document).on("keyup", "#penalidad_reserva", (e) => {
            aplicar_descuento(porpagar_host, por_pagar);
          });
        }
      }
    );
  }
  function aplicar_descuento(porpagar_host, total) {
    let penalidad = $("#penalidad_reserva").val();
    let suma = Number(porpagar_host) + Number(penalidad);
    let suma_total = Number(total) + Number(penalidad);
    $("#porpagar_hospedaje").html(`S/${suma.toFixed(2)}`);
    $("#total-pagar").html(`S/${suma_total.toFixed(2)}`);
    $("#total-pagar").attr("key_pagar_total", suma_total);
  }
  $("#cerrar_reserva").click(() => {
    funcion = "cerrar_reserva";
    console.log("cerrar reserva");
    let total_pagar = $("#total-pagar").attr("key_pagar_total");
    let id_reserva = $("#reserva_key").attr("key_reserva");
    let id_hab = $("#get-id").val();
    // Obtener fecha actual
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
    if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
    let fecha_today = ano + "-" + mes + "-" + dia;
    console.log(carrito_consumo.length);
    if (carrito_consumo.length == 0) {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          total_pagar,
          id_hab,
          id_reserva,
          fecha_today,
        },
        (response) => {
          console.log(response);
          alert(response);

          // document.location = "../Recepcion";
        }
      );
    } else {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          total_pagar,
          id_hab,
          id_reserva,
          fecha_today,
          carrito_consumo,
        },
        (response) => {
          console.log(response);
          alert(response);

          document.location = "../Recepcion";
        }
      );
    }
  });
});
