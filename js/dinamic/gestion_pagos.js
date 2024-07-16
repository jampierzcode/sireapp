$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var turno;
  var lotesList = [];
  var cartItems = [];
  var cuotaIdActive;
  var montoPagadoActive = 0;
  let keyVentaActive;
  var cronograma_pagos = [];
  var dataTable = $("#ventasList").DataTable({
    // select: true,
    stateSave: false,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Total _TOTAL_ registros, mostrando _START_ a _END_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Busqueda avanzada",
      paginate: {
        first: "|<",
        last: ">|",
        next: ">",
        previous: "<",
      },
      select: true,
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        $(api.column(0).footer()).html(
          "Seleccionados: " + api.rows({ selected: true }).count()
        );
      },
    },
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,

    columns: [
      {
        data: null,
        render: function (data) {
          return `${data?.nombre_cliente} <br/> ${data?.apellido_cliente}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `${data?.nombre_proyecto}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `${dayjs(data.fecha).format("DD / MM / YYYY")}`;
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          if (data.cantidad_cuotas !== data.cuotas_pagadas) {
            template += `
              <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold ${
                data.cuotas_retrasadas > 0 ? "bg-red-500" : "bg-green-500"
              }">${data.cuotas_retrasadas} cuotas retrasadas</p>
                `;
            template += `<br/>`;
            template += `<p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">${data.cuotas_pagadas} cuotas pagadas</p>
                `;
          } else {
            template += `
              <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold bg-[#310ecd]">DEUDA PAGADA</p>
                `;
          }
          return template;
        },
      },

      {
        data: null,
        render: function (data) {
          const ahora = dayjs();
          const fecha_retrasada = dayjs(data.fecha_retrasada);
          const diferencia = fecha_retrasada.diff(ahora, "minute", true); // Diferencia en minutos
          var dias = Math.floor(diferencia / (24 * 60));
          let tiempoRestante = "";
          let template_status = "";

          // Ajuste para considerar 0 cuando estamos en el mismo día y hora
          if (
            diferencia > 0 ||
            (diferencia === 0 && fecha_retrasada.isAfter(ahora))
          ) {
            if (dias > 1) {
              tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;
            }

            template_status +=
              tiempoRestante.length > 0
                ? `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Faltan ${tiempoRestante}</div>`
                : `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">La visita está programada para ahora</div>`;
          } else {
            dias = dias * -1;
            if (dias > 1) {
              tiempoRestante += `${dias - 1} día${dias > 2 ? "s" : ""}`;
            }

            template_status +=
              tiempoRestante.length > 0
                ? `<div class="px-4 py-2 bg-red-100 border-red-500 text-red-500 font-bold text-xs rounded">Retrasado por ${tiempoRestante}</div>`
                : ""; // No mostrar nada si no hay retraso
          }
          if (template_status === "") {
            template_status += `
            <div class="px-4 py-2 bg-blue-100 border-blue-500 text-blue-500 font-bold text-xs rounded">Deuda Pagada</div>
            `;
          }
          return template_status;
        },
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.total * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },

      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_inicial * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          //   if (data.financiamiento === "0") {
          //     template += `
          //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">AL CONTADO</p>
          //       `;
          //   } else {
          //     template += `
          //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">FINANCIADO</p>
          //       `;
          //   }
          template += `
                S/${(
                  ((Number(data.monto_pagado_now) +
                    Number(data.monto_inicial)) *
                    100) /
                  100
                ).toFixed(2)}
                `;
          return template;
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
            <div class="flex gap-3">
            <button target="_blank" keyVenta="${data?.id}" id="pagar-cuota" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white">Ver cronograma</button>
            `;
          template += `</div>`;
          return template;
        },
      },
    ],
    order: [],
    // columnDefs: [{ orderable: false, targets: 0 }],
    // columnDefs: [{ checkboxes: { selectRow: true }, targets: 0 }],
    columnDefs: [
      {
        targets: 0,
        checkboxes: {
          selectRow: true,
        },
      },
    ],
  });
  var dataTableCronograma = $("#cronogramaList").DataTable({
    // select: true,
    stateSave: false,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Total _TOTAL_ registros, mostrando _START_ a _END_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Busqueda avanzada",
      paginate: {
        first: "|<",
        last: ">|",
        next: ">",
        previous: "<",
      },
      select: true,
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        $(api.column(0).footer()).html(
          "Seleccionados: " + api.rows({ selected: true }).count()
        );
      },
    },
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,

    columns: [
      {
        data: null,
        render: function (data) {
          return `${dayjs(data.fecha_pago).format("DD / MM / YYYY")}`;
        },
      },

      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_pago * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          console.log(data);
          console.log(data.monto_pago);
          console.log(data.monto_pagado);
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_pagado * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.status === "NO PAGADO") {
            if (dayjs(data.fecha_pago).isBefore(dayjs().format("YYYY-MM-DD"))) {
              return `<p class="px-3 py-2 rounded bg-yellow-400 text-black text-[10px] whitespace-nowrap inline-flex">PAGO RETRASADO</p>`;
            } else {
              return `<p class="px-3 py-2 rounded bg-green-200 text-green-700 border border-green-700 text-[10px] whitespace-nowrap inline-flex">A TIEMPO</p>`;
            }
          } else {
            return `${dayjs(data.fecha_pagada).format("DD / MM / YYYY")}`;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          if (data.status === "NO PAGADO") {
            template += `
                        <p class="px-3 py-2 text-[10px] rounded bg-red-500 text-white whitespace-nowrap inline-flex">NO PAGADO</p>
                        `;
          } else {
            template += `
                          <p class="px-3 py-2 text-[10px] rounded bg-green-600 text-white whitespace-nowrap inline-flex">PAGADO</p>
                          `;
          }
          return template;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          if (data.status === "NO PAGADO") {
            template += `
                  <button target="_blank" montoPagado="${data?.monto_pagado}" montoPago="${data?.monto_pago}" keyVenta="${data?.venta_id}" keyCuota="${data?.id}" id="pagar-is-cuota" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white text-[10px]">Pagar esta Cuota</button>
                  `;
          } else {
            template += `
                      <p class="px-3 text-[10px] py-2 rounded bg-green-600 text-white whitespace-nowrap inline-flex">PAGADO</p>
                      <button target="_blank" keyVenta="${data?.id}" id="print-cuota" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="print" class="text-[15px]"></ion-icon></button>
                      `;
            template += `<br/>`;
          }
          return template;
        },
      },
    ],
    order: [],
    // columnDefs: [{ orderable: false, targets: 0 }],
    // columnDefs: [{ checkboxes: { selectRow: true }, targets: 0 }],
    columnDefs: [
      {
        targets: 0,
        checkboxes: {
          selectRow: true,
        },
      },
    ],
  });
  function getpagosTable(cuota_id) {}
  async function buscar_by_user_info_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_by_user_info_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-business") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
        }
      );
    });
  }
  $(document).on("click", "#print-cuota", async function () {
    $("#modalprintCuota").removeClass("hidden");
    $("#reciboPagoCuota").removeClass("hidden");
    let id_cuota = $(this).attr("keyVenta");
    console.log(id_cuota);
    // return;
    const detalle_cuota = cronograma_pagos.filter((c) => c.id === id_cuota);
    const data_venta = ventasList.find(
      (c) => c.id === detalle_cuota[0].venta_id
    );
    console.log(data_venta);
    // return;
    const data_empresa = await buscar_by_user_info_empresa();
    if (detalle_cuota.length > 0 && data_empresa.length > 0) {
      var template_business = "";
      var template_cliente = "";
      var template_detalle_cuota = "";

      template_business += `
          <img width="120px" class="mx-auto block" src="../../${
            data_empresa[0].logo
          }" alt="">
          <h1 class="courier-prime text-center w-full block text-xl font-bold ">${
            data_empresa[0].nombre_razon
          }</h1>
          <h1 class="courier-prime text-center w-full block text-sm">Correo electrónico: ${
            data_empresa[0].email
          }</h1>
          <h1 class="courier-prime text-center w-full block text-sm">Teléfono: ${
            data_empresa[0].phone_contact
          }</h1>
          <h1 class="courier-prime text-center w-full block text-sm">Fecha: ${dayjs(
            data_venta.fecha
          ).format("DD/MM/YYYY")}</h1>
          `;
      template_cliente += `
          <h1 class="text-center w-full block text-sm">${data_venta.nombre_cliente} ${data_venta.apellido_cliente}</h1>
         
          `;
      detalle_cuota.forEach((d, index) => {
        template_detalle_cuota += `
        <tr>
        <td class="border px-4 py-2 font-bold">CUOTA ${d.n_cuota}</td>
        <td class="border px-4 py-2 font-bold">${dayjs(d.fecha_pagada).format(
          "DD/MM/YYYY"
        )}</td>
        <td class="border px-4 py-2 font-bold">S/${(
          (d.monto_pago * 100) /
          100
        ).toFixed(2)}</td>
        <td class="border px-4 py-2 font-bold">${
          d.status === "PAGADO"
            ? d.status + "<br />" + dayjs(d.fecha_pagada).format("DD/MM/YYYY")
            : d.status
        }</td>            
            </tr>
            `;
      });
      $("#datosBusinessRecibo").html(template_business);
      $("#datos_cliente_cuota").html(template_cliente);
      $("#detalleCuota").html(template_detalle_cuota);
      $("#totalpagadocuota").html(`
        S/${((detalle_cuota[0].monto_pago * 100) / 100).toFixed(2)}`);

      // Crear el PDF en memoria
      const element = document.getElementById("reciboPagoCuota");
      html2pdf()
        .from(element)
        .set({
          margin: 10, // márgenes en orden: arriba, derecha, abajo, izquierda
        })
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          // Mostrar el PDF en el modal
          const pdfDataUri = pdf.output("datauristring");
          console.log(pdfDataUri);
          $("#pdfoutputCuota").html(
            `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
          );
          $("#reciboPagoCuota").addClass("hidden");
        });
    }
  });
  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    if ($(event.target).attr("id") === "modalprintCuota") {
      console.log("click");
      $("#modalprintCuota").addClass("hidden");
    }
  });
  $(document).on("click", "#print-venta", function () {
    const url = "ruta/al/pdf.pdf";
    const pdfjsLib = window["pdfjs-dist/build/pdf"];
    let id_venta = $(this).attr("keyVenta");
    console.log(id_venta);
    const products = [
      { descripcion: "Producto 1", cantidad: 2, subtotal: 20 },
      { descripcion: "Producto 2", cantidad: 3, subtotal: 30 },
      { descripcion: "Producto 3", cantidad: 1, subtotal: 10 },
      { descripcion: "Producto 4", cantidad: 5, subtotal: 50 },
      { descripcion: "Producto 5", cantidad: 4, subtotal: 40 },
    ];
    $("#pdf-modal").removeClass("hidden");
    $("#close-pdf-modal").click(function () {
      $("#pdf-modal").addClass("hidden");
    });

    let total = 0;
    $("#pdf-table-body").empty();
    $.each(products, function (index, product) {
      $("#pdf-table-body").append(`
          <tr>
            <td>${product.descripcion}</td>
            <td>${product.cantidad}</td>
            <td>${product.subtotal}</td>
          </tr>
        `);
      total += product.subtotal;
    });
    $("#pdf-total").text(total);
    // Crear el PDF en memoria
    const element = document.getElementById("pdf-table");
    html2pdf()
      .from(element)
      .set({
        margin: 10, // márgenes en orden: arriba, derecha, abajo, izquierda
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        // Mostrar el PDF en el modal
        const pdfDataUri = pdf.output("datauristring");
        console.log(pdfDataUri);
        $("#pdf-content").html(
          `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        );
      });
  });
  function pintar_cronograma(cronograma) {
    console.log(cronograma);
    var estadoActual = {
      page: dataTableCronograma.page(), // Página actual
      scrollLeft: $("#cronogramaList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };
    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTableCronograma.clear().draw(false);

    // Agregar las nuevas filas
    dataTableCronograma.rows.add(cronograma).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTableCronograma.page.info();
    var totalPaginas = pageInfo.pages;
    console.log(totalPaginas);
    if (estadoActual.page < totalPaginas) {
      console.log(estadoActual.page);
      dataTableCronograma.page(estadoActual.page);
    } else {
      dataTableCronograma.clear().draw();

      // Agregar las nuevas filas
      dataTableCronograma.rows.add(cronograma).draw();
      console.log(totalPaginas - 1);
      dataTableCronograma.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#cronogramaList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  // pagar cuota eventos
  async function pagar_cuota(cuota_id, fecha_pagada, monto, status) {
    let funcion = "pagar_cuota";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: cuota_id, fecha_pagada, monto, status },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  async function update_cuota(cuota_id, fecha_pagada, status) {
    let funcion = "update_cuota";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: cuota_id, fecha_pagada, status },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }

  $(document).on("click", "#pagar-cuota", function () {
    let keyVenta = $(this).attr("keyVenta");
    console.log(keyVenta);
    $("#pago_cuota_modal").removeClass("md-hidden");
    let crono = cronograma_pagos.filter((c) => c.venta_id === keyVenta);
    console.log(crono);
    pintar_cronograma(crono);
    setTimeout(() => {
      $("#pago_cuota_modal .form-create").addClass("modal-show");
    }, 300);
  });
  $("#pago_cuota_modal .close-modal").on("click", function () {
    $("#pago_cuota_modal .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#pago_cuota_modal").addClass("md-hidden");
    }, 300);
  });
  async function getPagosCuota(id) {
    return new Promise((resolve, reject) => {
      let funcion = "get_pagos_cuota";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  $(document).on("click", "#pagar-is-cuota", async function () {
    $("#pagar_cuota_modal").removeClass("md-hidden");
    setTimeout(() => {
      $("#pagar_cuota_modal .form-create").addClass("modal-show");
    }, 300);
    let monto_pago = $(this).attr("montoPago");
    let monto_pagado = $(this).attr("montoPagado");
    $("#monto_pago_cuota").val(monto_pago);
    let cuota_id = $(this).attr("keyCuota");
    cuotaIdActive = cuota_id;
    let keyVenta = $(this).attr("keyVenta");
    keyVentaActive = keyVenta;
    montoPagadoActive = monto_pagado;
    if (Number(monto_pagado) !== 0) {
      let deuda = Number(monto_pago) - Number(monto_pagado);
      // $("#tipo_pago_cuota").prop("disabled", true);
      // $("#tipo_pago_cuota").prop("disabled", true);
      $("#deuda_pago_cuota").val(deuda);
      $("#containerTotalaPagar").addClass("hidden");
      $("#containerDeuda").removeClass("hidden");
    } else {
      $("#containerTotalaPagar").removeClass("hidden");
      $("#containerDeuda").addClass("hidden");
      $("#deuda_pago_cuota").val(0);
    }
  });
  // $("#monto_parcial_cuota").on("change", function (e) {
  //   let valor = e.target.value;
  //   let deuda = 0;
  //   let getcuota = cronograma_pagos.find((c) => c.id === cuotaIdActive);
  //   if (montoPagadoActive !== 0) {
  //     deuda = Number(
  //       getcuota.monto_pago - Number(montoPagadoActive) - Number(valor)
  //     );
  //   } else {
  //     deuda = Number(getcuota.monto_pago - Number(valor));
  //   }
  //   if (deuda < 0) {
  //     $("#deuda_pago_cuota").val(
  //       Number(getcuota.monto_pago - Number(montoPagadoActive))
  //     );
  //     add_toast("warning", "El pago parcial no debe superar la deuda");
  //     return;
  //   } else {
  //     $("#deuda_pago_cuota").val(deuda);
  //   }
  // });
  $("#metodo_pago_cuota").on("change", function (e) {
    let valor = e.target.value;
    if (valor === "TRANSFERENCIA") {
      $("#containerNumeroOperacion").removeClass("hidden");
      $("#numero_operacion_cuota").val("");
    } else {
      $("#containerNumeroOperacion").addClass("hidden");
      $("#numero_operacion_cuota").val("");
    }
  });
  $("#tipo_pago_cuota").on("change", function (e) {
    let valor = e.target.value;
    if (valor === "PARCIAL") {
      let getcuota = cronograma_pagos.find((c) => c.id === cuotaIdActive);
      if (montoPagadoActive !== 0) {
        deuda = Number(getcuota.monto_pago - Number(montoPagadoActive));
      } else {
        deuda = Number(getcuota.monto_pago);
      }
      $("#deuda_pago_cuota").val(deuda);
      $("#containerTipoPago").removeClass("hidden");
      $("#monto_parcial_cuota").val("");
      $("#containerTotalaPagar").addClass("hidden");
      $("#containerDeuda").removeClass("hidden");
    } else {
      console.log(montoPagadoActive);
      if (Number(montoPagadoActive) === 0) {
        $("#containerTotalaPagar").removeClass("hidden");
        $("#containerDeuda").addClass("hidden");
        $("#containerTipoPago").addClass("hidden");
        $("#monto_parcial_cuota").val("");
      } else {
        $("#containerTotalaPagar").addClass("hidden");
        $("#containerDeuda").removeClass("hidden");
        $("#containerTipoPago").addClass("hidden");
        $("#monto_parcial_cuota").val("");
      }
    }
  });
  $("#pagar_cuota_btn").on("click", async function () {
    $("#pagar_cuota_btn").prop("disabled", true);
    let tipoPago = $("#tipo_pago_cuota").val();
    let montoPagoParcial = $("#monto_parcial_cuota").val();
    let montoPagoTotal = $("#monto_pago_cuota").val();
    let montoDeuda = $("#deuda_pago_cuota").val();

    let metodoPago = $("#metodo_pago_cuota").val();
    let numeroOperacion = $("#numero_operacion_cuota").val();
    let fecha_now = dayjs().format("YYYY-MM-DD");
    let status = "PAGADO";

    // if (metodoPago === "" || metodoPago === null) {
    //   add_toast("warning", "El metodo de pago no puede ir vacio");
    //   return;
    // } else {

    // }

    let confirmado = false;
    if (tipoPago === "PARCIAL") {
      confirmado = confirm("Quiere pagar un monto parcial");
    } else {
      confirmado = confirm("Quiere pagar esta couta");
    }
    if (confirmado) {
      console.log(cuotaIdActive, keyVentaActive, fecha_now, status);
      if (metodoPago === "TRANSFERENCIA") {
        if (numeroOperacion === "" || numeroOperacion === null) {
          add_toast(
            "warning",
            "Debes llenar el numero de operacion del comprobante"
          );
          $("#pagar_cuota_btn").prop("disabled", false);
          return;
        }
      }
      let montoSend = 0;
      // monto parcial
      // monto pagado
      // monto total
      // monto deuda
      console.log(montoPagadoActive);
      console.log(montoDeuda);
      console.log(montoPagoParcial);
      if (Number(montoPagadoActive) === 0) {
        if (tipoPago === "PARCIAL") {
          if (Number(montoPagoParcial) > Number(montoDeuda)) {
            add_toast("warning", "El monto parcial debe ser menor a la deuda");
            $("#pagar_cuota_btn").prop("disabled", false);
            return;
          }
          montoSend = montoPagoParcial;
        } else {
          montoSend = montoPagoTotal;
          let actualizarIsCuota = await update_cuota(
            cuotaIdActive,
            fecha_now,
            status
          );
        }
      } else {
        if (tipoPago === "PARCIAL") {
          if (Number(montoPagoParcial) > Number(montoDeuda)) {
            add_toast("warning", "El monto parcial debe ser menor a la deuda");
            $("#pagar_cuota_btn").prop("disabled", false);
            return;
          }
          if (Number(montoDeuda) === 0) {
            let actualizarIsCuota = await update_cuota(
              cuotaIdActive,
              fecha_now,
              status
            );
          }
          montoSend = montoPagoParcial;
        } else {
          montoSend = montoDeuda;
          let actualizarIsCuota = await update_cuota(
            cuotaIdActive,
            fecha_now,
            status
          );
        }
      }

      let pagarIsCuota = await pagar_cuota(
        cuotaIdActive,
        fecha_now,
        montoSend,
        tipoPago
      );

      // let actualizarIsCuota = await update_cuota(
      //   cuotaIdActive,
      //   fecha_now,
      //   status
      // );
      if (pagarIsCuota.error) {
        add_toast("error", "No se pudo registrar esta cuota");
        console.log(pagarIsCuota.error);
      } else {
        let transaccion = await registrar_transaccion(
          turno,
          montoSend,
          metodoPago,
          numeroOperacion,
          keyVentaActive,
          fecha_now,
          `PAGO_${tipoPago}_CUOTA`
        );
        if (transaccion.error) {
          add_toast("error", "No se registro la transaccion del dinero");
        } else {
          add_toast("success", "Se hizo el pago correcto para esta cuota");
          var ventas_financiero = await buscar_ventas();
          ventas_financiero.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
          var cronograma = await buscar_cronograma_pagos();
          montoPagadoActive = 0;
          $("#tipo_pago_cuota").val("TOTAL");
          $("#containerTotalaPagar").removeClass("hidden");
          $("#metodo_pago_cuota").val("EFECTIVO");
          $("#containerNumeroOperacion").addClass("hidden");
          $("#containerDeuda").addClass("hidden");
          $("#containerTipoPago").addClass("hidden");
          $("#monto_parcial_cuota").val("");
          pintar_ventas(ventas_financiero, cronograma);
          let crono = cronograma.filter((c) => c.venta_id === keyVentaActive);
          console.log(crono);
          pintar_cronograma(crono);
          $("#pagar_cuota_modal .form-create").removeClass("modal-show");
          setTimeout(() => {
            $("#pagar_cuota_modal").addClass("md-hidden");
          }, 300);
          $("#pagar_cuota_btn").prop("disabled", false);
        }
      }
    } else {
      $("#pagar_cuota_btn").prop("disabled", false);
      add_toast("warning", "Operacion cancelada");
      $("#pagar_cuota_modal .form-create").removeClass("modal-show");
      setTimeout(() => {
        $("#pagar_cuota_modal").addClass("md-hidden");
      }, 300);
    }
  });
  $("#pagar_cuota_modal .close-modal").on("click", function () {
    add_toast("warning", "Operacion cancelada");
    $("#pagar_cuota_modal .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#pagar_cuota_modal").addClass("md-hidden");
    }, 300);
  });

  // fin de pagar cuota
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve("no-register");
            add_toast("error", "No haz abierto ninguna caja");
          } else {
            add_toast("success", "Tienes una caja abierta");
            let data = JSON.parse(response);
            turno = data[0].id;
            resolve("si-register");
          }
        }
      );
    });
  }

  async function buscar_ventas() {
    let funcion = "buscar_ventas_caja";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            let filter_pagos = data.filter(
              (d) => d.status === "VENTA" && d.tipo_pago === "1"
            );
            ventasList = filter_pagos;
            resolve(filter_pagos);
          }
          resolve("exito");
        }
      );
    });
  }
  async function buscar_cronograma_pagos() {
    let funcion = "buscar_cronograma_pagos";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        async (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            let updatedData = await Promise.all(
              data.map(async (cuota) => {
                let pagos_cuota = await getPagosCuota(cuota.id);
                let suma = pagos_cuota.reduce(
                  (total, pago) => total + Number(pago.monto),
                  0
                );
                cuota.monto_pagado = String(suma);
                return cuota;
              })
            );
            cronograma_pagos = updatedData;
            resolve(updatedData);
          }
        }
      );
    });
  }
  var apertura = await buscar_caja_abierta();
  if (apertura === "no-register") {
    $("#aperturar_caja").removeClass("md-hidden");
    setTimeout(() => {
      $("#aperturar_caja .form-create").addClass("modal-show");
    }, 300);
    return;
  }

  function pintar_ventas(ventas, cronograma) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };
    ventas.forEach((v) => {
      let cantidad_cuotas = cronograma.filter(
        (cuota) => v.id === cuota.venta_id
      ).length;
      let cuotasPagadas = cronograma.filter(
        (cuota) => cuota.status === "PAGADO" && v.id === cuota.venta_id
      ).length;
      let cuotasRetrasadas = cronograma.filter(
        (cuota) =>
          dayjs(cuota.fecha_pago) < dayjs() &&
          v.id === cuota.venta_id &&
          cuota.status === "NO PAGADO"
      ).length;
      v.cantidad_cuotas = cantidad_cuotas;
      v.cuotas_pagadas = cuotasPagadas;
      v.cuotas_retrasadas = cuotasRetrasadas;
      let fechas_nopagadas = cronograma.filter(
        (cuota) => cuota.status === "NO PAGADO" && v.id === cuota.venta_id
      );
      let fechaMasProxima;
      if (fechas_nopagadas.length > 0) {
        // Encontrar la fecha más pequeña entre las fechas 'NO PAGADO'
        fechaMasProxima = fechas_nopagadas.reduce((prev, current) =>
          dayjs(current.fecha).isBefore(dayjs(prev.fecha)) ? current : prev
        );
      } else {
        fechaMasProxima = { fecha_pago: null };
      }
      v.fecha_retrasada = fechaMasProxima.fecha_pago;
      let proximaCuota = cronograma.find(
        (cuota) => dayjs(cuota.fecha_pago) > dayjs() && v.id === cuota.venta_id
      );

      var pagado_monto_now = 0;
      cronograma.forEach((c) => {
        if (c.status === "PAGADO" && c.venta_id === v.id) {
          pagado_monto_now = pagado_monto_now + Number(c.monto_pago);
        }
      });
      v.monto_pagado_now = pagado_monto_now;
      v.proxima_cuota = proximaCuota;
    });

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(ventas).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    if (estadoActual.page < totalPaginas) {
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      dataTable.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#ventasList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  var ventas_financiero = await buscar_ventas();
  ventas_financiero.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  var cronograma = await buscar_cronograma_pagos();
  console.log(cronograma);
  pintar_ventas(ventas_financiero, cronograma);
  // buscar listas
  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_mi_creator";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            reject({ error: response });
          } else {
            let data = JSON.parse(response);
            proyectosList = data;
            resolve(data);
          }
        }
      );
    });
  }
  function buscar_lotes_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_lotes";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            reject({ error: response });
          } else {
            let data = JSON.parse(response);
            lotesList = data;
            console.log(data);
            resolve(data);
          }
        }
      );
    });
  }
  function buscar_clientes(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_cliente_proyecto";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            // console.log(response);
            resolve({ error: response });
          } else {
            let data = JSON.parse(response);
            clientesList = data;
            console.log(data);
            resolve(data);
          }
        }
      );
    });
  }
  // pintar listas
  function pintar_proyectos(proyectos) {
    let template = "";
    template += `
      <option></option>
      
      `;
    proyectos.forEach((p) => {
      template += `
        <option value="${p.proyecto_id}">${p.nombre_proyecto}</option>
        `;
    });
    let template2 = "";
    template2 += `
      <option value="0" disabled>Seleccione un proyecto</option>
      
      `;
    proyectos.forEach((p) => {
      template2 += `
        <option value="${p.proyecto_id}">${p.nombre_proyecto}</option>
        `;
    });

    $("#proyectoList").html(template);
    $("#proyecto-lead").html(template2);
    $("#proyecto-lead").val("0");
  }
  function pintar_lotes(lotes) {
    let template = "";
    template += `
      <option></option>
      
      `;
    if (lotes.length > 0) {
      lotes.forEach((l) => {
        template += `
          <option ${l.estado === "DISPONIBLE" ? "" : "disabled"} value="${
          l.id
        }">Lote ${l.numero}, Mz ${l.mz_zona} ${l.estado}</option>
          `;
      });
    }

    $("#lotesList").html(template);
  }
  function pintar_clientes(clientes) {
    let template = "";
    template += `
      <option></option>
      
      `;
    if (clientes.length > 0) {
      clientes.forEach((c) => {
        template += `
          <option value="${c.id_cliente}">${c?.nombres} ${c?.apellidos}</option>
          `;
      });
    }

    $("#clientesList").html(template);
  }
  var proyectos = await buscar_proyectos();
  pintar_proyectos(proyectos);
  $("#lotesList").select2({
    placeholder: "Seleccione un lote",
    allowClear: true,
  });
  $("#proyectoList").select2({
    placeholder: "Seleccione un proyecto",
    allowClear: true,
  });
  $("#clientesList").select2({
    placeholder: "Seleccione un cliente",
    allowClear: true,
  });

  async function registrar_transaccion(
    turno,
    suma,
    metodo_pago,
    numero_operacion,
    venta_id,
    fecha,
    motivo_operacion
  ) {
    let funcion = "registrar_transaccion";

    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          turno,
          suma,
          metodo_pago,
          numero_operacion,
          venta_id,
          fecha,
          motivo_operacion,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
});
