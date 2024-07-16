$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var asesoresList = [];
  var ventaActive;
  var sedeId;
  var turno;
  var lotesList = [];
  var cartItems = [];
  var detalleVentaActive = [];
  var cronograma_pagos = [];
  var cronograma_pagos_change = [];
  function calculo_programacion(fecha_programada) {
    const ahora = dayjs().startOf("day");
    const fecha_retrasada = dayjs(fecha_programada).startOf("day");
    const diferencia = fecha_retrasada.diff(ahora, "day", true); // Diferencia en días
    console.log(fecha_retrasada, ahora);
    let dias = Math.floor(diferencia);
    let tiempoRestante = "";
    let template_status = "";

    // Ajuste para considerar 0 cuando estamos en el mismo día
    if (diferencia >= 0) {
      if (dias > 0) {
        tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;
      }

      template_status +=
        tiempoRestante.length > 0
          ? `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Faltan ${tiempoRestante}</div>`
          : `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Programado para hoy</div>`;
    } else {
      dias = dias * -1;
      tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;

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
  }

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
          return `${dayjs(data.fecha).format("DD/MM/YYYY")}`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.tipo_venta === "VENTA") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold bg-[#310ecd]">VENTA</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">SEPARACION</p>
            `;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.status === "VENTA") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold bg-[#310ecd]">VENTA</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">SEPARACION</p>  <button target="_blank" keyVenta="${
            data?.id
          }" id="venderChange" class="rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center bg-green-500 text-white">Vender</button><br/>${calculo_programacion(
              data?.fecha_programacion
            )}<p class="text-xs font-bold">Programado para: ${dayjs(
              data.fecha_programacion
            ).format("DD/MM/YYYY")}</p>
            `;
          }
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
          if (data.tipo_pago === "0") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">AL CONTADO</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">FINANCIADO</p>
            `;
          }
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
          <div class="flex gap-3">`;

          template += `
          <button target="_blank" keyVenta="${data?.id}" id="print-venta" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="print" class="text-[15px]"></ion-icon></button>
          
          `;
          if (data.tipo_pago === "1") {
            template += `
          <button target="_blank" keyVenta="${data?.id}" id="print-cronograma" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="calendar" class="text-[15px]"></ion-icon></button>
          `;
          }

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
  // eventos de vender cmabir estado
  $(document).on("click", "#venderChange", async function () {
    const today = dayjs().format("YYYY-MM-DD");
    $("#fecha_pago_change").attr("min", today);
    let template_detalle_venta = "";
    let id_venta = $(this).attr("keyVenta");
    ventaActive = id_venta;
    const data_venta = ventasList.find((v) => v.id === id_venta);
    const detalle_venta = await buscar_detalle_venta(id_venta);
    detalleVentaActive = detalle_venta;
    detalle_venta.forEach((d) => {
      template_detalle_venta += `
      <tr>
      <td class="border px-4 py-2">${data_venta.tipo_venta} de Lote ${
        d.numero
      } MZ ${d.mz_zona} de ${d.ancho}x${d.largo} m2</td>
      <td class="border px-4 py-2">${d.cantidad}</td>
      <td class="border px-4 py-2 font-bold">S/${(
        (d.precio_final * 100) /
        100
      ).toFixed(2)}</td>
      <td class="border px-4 py-2 font-bold">S/${(
        (data_venta.total * 100) /
        100
      ).toFixed(2)}</td>
          
          </tr>
          `;
    });
    $("#detalleVentaSeparacion").html(template_detalle_venta);
    console.log(data_venta);
    $("#tipo_pago_change").val(data_venta.tipo_pago);
    $("#monto_separacion_change").val(data_venta.monto_separado);
    if (data_venta.tipo_pago === "0") {
      $("#monto_change").val(data_venta.total);
      $("#monto_change").prop("disabled", true);
      let restante = data_venta.total - data_venta.monto_separado;
      $("#monto_apagar").val(restante);
      $("#titleMontoPago").html("Total Venta");
      $("#totalapagarseparacion").html(
        `S/${((restante * 100) / 100).toFixed(2)}`
      );
      $("#container-financiamento-change").addClass("hidden");
      $("#numero_cuotas_change").val("");
      $("#monto_cuotas_change").val("");
      $("#fecha_pago_change").val("");
      cronograma_pagos_change = [];
      pintar_cronograma_change(cronograma_pagos_change);
    } else {
      $("#monto_apagar").val("");
      $("#monto_change").val("");
      $("#monto_change").prop("disabled", false);
      $("#titleMontoPago").html("Monto Inicial");
      $("#totalapagarseparacion").html(`no definido`);
      $("#container-financiamento-change").removeClass("hidden");
    }
    $("#modalChangeSeparacion").removeClass("md-hidden");
    setTimeout(() => {
      $("#modalChangeSeparacion .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modalChangeSeparacion .close-modal").on("click", function () {
    $("#modalChangeSeparacion .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modalChangeSeparacion").addClass("md-hidden");
    }, 300);
  });
  $("#tipo_pago_change").on("change", function (e) {
    let tipo = e.target.value;
    const data_venta = ventasList.find((v) => v.id === ventaActive);
    if (tipo === "0") {
      $("#monto_change").val(data_venta.total);
      $("#monto_change").prop("disabled", true);
      let restante = data_venta.total - data_venta.monto_separado;
      $("#monto_apagar").val(restante);
      $("#titleMontoPago").html("Total Venta");
      $("#totalapagarseparacion").html(
        `S/${((restante * 100) / 100).toFixed(2)}`
      );
      $("#container-financiamento-change").addClass("hidden");
      $("#numero_cuotas_change").val("");
      $("#monto_cuotas_change").val("");
      $("#fecha_pago_change").val("");
      cronograma_pagos_change = [];
      pintar_cronograma_change(cronograma_pagos_change);
    } else {
      $("#monto_apagar").val("");
      $("#container-financiamento-change").removeClass("hidden");
      $("#monto_change").val("");
      $("#monto_change").prop("disabled", false);
      $("#titleMontoPago").html("Monto Inicial");
      $("#totalapagarseparacion").html(`no definido`);
    }
  });
  $("#monto_change").on("change keyup", function (e) {
    let monto = e.target.value;
    if (monto === "" || monto === "0") {
      $("#totalapagarseparacion").html(`no definido`);
    } else {
      let monto_separado = $("#monto_separacion_change").val();
      let restante = monto - monto_separado;
      $("#monto_apagar").val(restante);
      $("#totalapagarseparacion").html(
        `S/${((restante * 100) / 100).toFixed(2)}`
      );
    }
  });

  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    if ($(event.target).attr("id") === "modalprintVenta") {
      console.log("click");
      $("#modalprintVenta").addClass("hidden");
      $("#financiamiento").addClass("hidden");
      $("#alContado").addClass("hidden");
      $("#separacion").addClass("hidden");
    }
  });
  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    if ($(event.target).attr("id") === "modalprintCronograma") {
      console.log("click");
      $("#modalprintCronograma").addClass("hidden");
    }
  });
  $(document).on("click", "#print-venta", async function () {
    $("#modalprintVenta").removeClass("hidden");
    $("#boletaContent").removeClass("hidden");
    let id_venta = $(this).attr("keyVenta");
    console.log(id_venta);
    console.log(ventasList);
    const data_venta = ventasList.find((v) => v.id === id_venta);
    console.log(data_venta);
    const detalle_venta = await buscar_detalle_venta(id_venta);
    console.log(detalle_venta);
    const data_empresa = await buscar_by_user_info_empresa();
    console.log(data_empresa);
    if (detalle_venta.length > 0 && data_empresa.length > 0) {
      var template_business = "";
      var template_cliente = "";
      var template_detalle_venta = "";

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
      detalle_venta.forEach((d) => {
        template_detalle_venta += `
        <tr>
        <td class="border px-4 py-2">${data_venta.tipo_venta} de Lote ${
          d.numero
        } MZ ${d.mz_zona} de ${d.ancho}x${d.largo} m2</td>
        <td class="border px-4 py-2">${d.cantidad}</td>
        <td class="border px-4 py-2 font-bold">S/${(
          (d.precio_final * 100) /
          100
        ).toFixed(2)}</td>
        <td class="border px-4 py-2 font-bold">S/${(
          (data_venta.total * 100) /
          100
        ).toFixed(2)}</td>
            
            </tr>
            `;
      });
      $("#datosBusiness").html(template_business);
      $("#datos_cliente").html(template_cliente);
      $("#detalleVenta").html(template_detalle_venta);
      $("#total_venta").html(
        `S/${((data_venta.total * 100) / 100).toFixed(2)} `
      );
      if (data_venta.status === "VENTA") {
        console.log("venta");
        if (data_venta.tipo_pago === "1") {
          // if (
          //   data_venta.monto_separado !== null &&
          //   data_venta.monto_separado !== ""
          // ) {
          //   $("#separacion").removeClass("hidden");

          //   $("#monto_separacion_print").html(
          //     `S/${((data_venta.monto_separado * 100) / 100).toFixed(2)}`
          //   );
          // } else {
          $("#financiamiento").removeClass("hidden");
          $("#monto_inicial_print").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
          $("#monto_al_contado_print").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
          $("#totalpagadoprint").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
        } else {
          $("#monto_al_contado_print").html(
            `S/${((data_venta.total * 100) / 100).toFixed(2)}`
          );
          $("#totalpagadoprint").html(
            `S/${((data_venta.total * 100) / 100).toFixed(2)}`
          );
          $("#alContado").removeClass("hidden");
        }
      } else {
        console.log("separacion");
        $("#separacion").removeClass("hidden");
        $("#fecha_prox_pago_print").html(
          dayjs(data_venta.fecha_programacion).format("DD/MM/YYYY")
        );
        $("#monto_separacion_print").html(
          `S/${((data_venta.monto_separado * 100) / 100).toFixed(2)}`
        );
        $("#totalpagadoprint").html(
          `S/${((data_venta.monto_separado * 100) / 100).toFixed(2)}`
        );
      }

      // Crear el PDF en memoria
      const element = document.getElementById("boletaContent");
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
          $("#pdfoutput").html(
            `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
          );
          $("#boletaContent").addClass("hidden");
        });
    }
  });
  $(document).on("click", "#print-cronograma", async function () {
    $("#modalprintCronograma").removeClass("hidden");
    $("#reciboPagosContent").removeClass("hidden");
    let id_venta = $(this).attr("keyVenta");
    console.log(id_venta);
    console.log(ventasList);
    const data_venta = ventasList.find((v) => v.id === id_venta);
    console.log(data_venta);
    const detalle_pagos = await buscar_cronograma_pagos_venta(id_venta);
    const data_empresa = await buscar_by_user_info_empresa();
    if (detalle_pagos.length > 0 && data_empresa.length > 0) {
      var template_business = "";
      var template_cliente = "";
      var template_detalle_pagos = "";

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
      detalle_pagos.forEach((d, index) => {
        template_detalle_pagos += `
        <tr>
        <td class="border px-4 py-2 font-bold">${index + 1}</td>
        <td class="border px-4 py-2 font-bold">${dayjs(d.fecha_pago).format(
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
      $("#datos_cliente_pagos").html(template_cliente);
      $("#detallePagos").html(template_detalle_pagos);

      if (data_venta.tipo_venta === "VENTA") {
        console.log("venta");
        if (data_venta.tipo_pago === "1") {
          $("#financiamiento").removeClass("hidden");
          $("#monto_inicial_print").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
          $("#monto_al_contado_print").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
          $("#totalpagadoprint").html(
            `S/${((data_venta.monto_inicial * 100) / 100).toFixed(2)}`
          );
        } else {
          $("#monto_al_contado_print").html(
            `S/${((data_venta.total * 100) / 100).toFixed(2)}`
          );
          $("#totalpagadoprint").html(
            `S/${((data_venta.total * 100) / 100).toFixed(2)}`
          );
          $("#alContado").removeClass("hidden");
        }
      } else {
        console.log("separacion");
        $("#separacion").removeClass("hidden");
        $("#fecha_prox_pago_print").html(
          dayjs(data_venta.fecha_programacion).format("DD/MM/YYYY")
        );
        $("#monto_separacion_print").html(
          `S/${((data_venta.monto_separado * 100) / 100).toFixed(2)}`
        );
        $("#totalpagadoprint").html(
          `S/${((data_venta.monto_separado * 100) / 100).toFixed(2)}`
        );
      }

      // Crear el PDF en memoria
      const element = document.getElementById("reciboPagosContent");
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
          $("#pdfoutputPagos").html(
            `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
          );
          $("#reciboPagosContent").addClass("hidden");
        });
    }
  });
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            add_toast("error", "No haz abierto ninguna caja");
            resolve("no-register");
          } else {
            add_toast("success", "tienes una caja abierta");
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
            ventasList = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            console.log(data);
            ventasList = data;
            resolve(data);
          }
        }
      );
    });
  }
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
  async function buscar_cronograma_pagos_venta(id_venta) {
    let funcion = "buscar_cronograma_pagos_venta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id_venta },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            cronograma_pagos = data;
            resolve(data);
          }
          resolve("exito");
        }
      );
    });
  }
  async function buscar_detalle_venta(id) {
    let funcion = "buscar_detalle_venta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id },
        (response) => {
          console.log(response);
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);

            resolve(data);
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

  function pintar_ventas(ventas) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

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
      // dataTable.rows.add(ventas).draw();

      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#ventasList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  async function buscar_sedes_by_usuario() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_usuario";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            listUsuariosSede = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listUsuariosSede = data;
            resolve(data);
          }
        }
      );
    });
  }
  var ventas_financiero = await buscar_ventas();
  ventas_financiero.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  pintar_ventas(ventas_financiero);
  var mysede = await buscar_sedes_by_usuario();
  sedeId = mysede[0].id;
  // buscar listas
  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            resolve([]);
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
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_clientes(id) {
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
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_asesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            // console.log(response);
            resolve([]);
          } else {
            let data = JSON.parse(response);
            asesoresList = data;
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
      <option value="${p.id}">${p.nombre_proyecto}</option>
      `;
    });
    let template2 = "";
    template2 += `
    <option value="0" disabled>Seleccione un proyecto</option>
    
    `;
    proyectos.forEach((p) => {
      template2 += `
      <option value="${p.id}">${p.nombre_proyecto}</option>
      `;
    });

    $("#proyectoList").html(template);
    $("#proyecto-lead").html(template2);
  }
  function pintar_lotes(lotes) {
    let template = "";
    template += `
    <option></option>
    
    `;
    if (lotes.length > 0) {
      lotes.forEach((l) => {
        template += `
        <option ${
          l.estado === "DISPONIBLE" || l.estado === "SIN PUBLICAR"
            ? ""
            : "disabled"
        } value="${l.id}">Lote ${l.numero}, Mz ${l.mz_zona} ${l.estado}</option>
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
        <option value="${c.id_cliente}">${c?.documento} ${c?.nombres} ${c?.apellidos}</option>
        `;
      });
    }

    $("#clientesList").html(template);
  }
  function pintar_asesores(asesores) {
    let template = "";
    template += `
    <option></option>
    
    `;
    if (asesores.length > 0) {
      asesores.forEach((a) => {
        template += `
        <option value="${a.id_usuario}">${a?.nombre} ${a?.apellido}</option>
        `;
      });
    }

    $("#asesorList").html(template);
  }
  var proyectos = await buscar_proyectos();
  pintar_proyectos(proyectos);
  var asesores = await buscar_asesores();
  pintar_asesores(asesores);
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
  $("#asesorList").select2({
    placeholder: "Seleccione un asesor",
    allowClear: true,
  });
  // proyecto eventos
  $("#proyectoList").on("select2:select", async function (e) {
    var data = e.params.data;

    var lotes = await buscar_lotes_proyecto(data.id);
    pintar_lotes(lotes);
    var clientes = await buscar_clientes(data.id);
    if (clientes.error) {
      let vacio = [];
      pintar_clientes(vacio);
    } else {
      let clientes_sede = clientes.filter((c) => c.sede_id === sedeId);
      console.log(clientes_sede);
      pintar_clientes(clientes_sede);
    }
    cartItems = [];
    renderCart();
    $("#precio-lote").val("");
    $("#precio-lote-final").val("");
  });
  $("#proyectoList").on("select2:unselect", function () {
    let lotes = [];
    pintar_lotes(lotes);
    let clientes = [];
    pintar_clientes(clientes);
    cartItems = [];
    renderCart();
    $("#precio-lote").val("");
    $("#precio-lote-final").val("");
  });
  // lotes eventos
  $("#lotesList").on("select2:select", async function (e) {
    var data = e.params.data;

    let loteSelect = lotesList.find((l) => l.id === data.id);

    $("#precio-lote").val(loteSelect.precio);
    $("#precio-lote-final").val(loteSelect.precio);
  });
  $("#lotesList").on("select2:unselect", function () {
    $("#precio-lote").val("");
    $("#precio-lote-final").val("");
  });
  // tipo venta eventos
  $("#tipoVenta").on("change", function () {
    cartItems = [];
    renderCart();
    cronograma_pagos = [];
    pintar_cronograma(cronograma_pagos);
    const now = dayjs().format("YYYY-MM-DDTHH:mm");
    if ($(this).val() === "SEPARACION") {
      $("#inputFinanciamiento").addClass("hidden");
      $("#container-financiamento").addClass("hidden");
      $("#financiamiento_check").val(false);
      $("#financiamiento_check").prop("checked", false);
      $("#monto_inicial").val("");
      $("#numero_cuotas").val("");
      $("#monto_cuotas").val("");
      $("#fecha_programacion").attr("min", now);
      $("#form_separacion").removeClass("hidden");
    } else {
      $("#form_separacion").addClass("hidden");
      $("#inputFinanciamiento").removeClass("hidden");
      $("#financiamiento_check").val(false);
      $("#financiamiento_check").prop("checked", false);
    }
  });
  // crear lead eventos
  $("#open-lead").on("click", function () {
    let proyecto_seleccionado = $("#proyectoList").val();
    console.log(proyecto_seleccionado);
    if (proyecto_seleccionado !== "") {
      $("#proyecto-lead").val(proyecto_seleccionado);
    }
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-lead .close-modal").on("click", function () {
    $("#nombre-lead").val("");
    $("#apellido-lead").val("");
    $("#documento-lead").val("");
    $("#celular-lead").val("");
    $("#telefono-lead").val("");
    $("#origen-lead").val("0");
    $("#ciudad-lead").val("");
    $("#pais-lead").val("");
    $("#campania-lead").val("");
    $("#email-lead").val("");
    $("#proyecto-lead").val("0");
    $("#crear-lead .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-lead").addClass("md-hidden");
    }, 300);
  });
  // registrar lead
  $("#registerLead").submit((e) => {
    e.preventDefault();
    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
    // return 0;
    let nombre = $("#nombre-lead").val();
    let apellido = $("#apellido-lead").val();
    let documento = $("#documento-lead").val();
    let celular = $("#celular-lead").val();
    let telefono = $("#telefono-lead").val();
    let origen = $("#origen-lead").val();
    let ciudad = $("#ciudad-lead").val();
    let pais = $("#pais-lead").val();
    let campania = $("#campania-lead").val();
    let correo = $("#email-lead").val();
    let proyecto_id = $("#proyecto-lead").val();
    let sede_id = sedeId;
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
      fecha: fecha_now,
      hora: hora_now,
    };
    if (proyecto_id !== "0" && sede_id !== "" && origen !== "0") {
      let funcion = "add_cliente";
      $("#registrar_lead_btn").prop("disabled", true);
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, sede_id },
        async (response) => {
          const data = JSON.parse(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            add_toast("error", data.error);
          } else {
            add_toast("success", "se subio correctamente el cliente");
            let id = data.id;
            console.log(id, proyecto_id);
            $("#crear-lead .form-create").removeClass("modal-show");
            setTimeout(function () {
              $("#crear-lead").addClass("md-hidden");
            }, 300);
            let clientes = await buscar_clientes(proyecto_id);
            pintar_clientes(clientes);
            $("#clientesList").val(id).trigger("change");
            $("#proyectoList").val(proyecto_id).trigger("change");
            // resetear form
            $("#nombre-lead").val("");
            $("#apellido-lead").val("");
            $("#documento-lead").val("");
            $("#celular-lead").val("");
            $("#telefono-lead").val("");
            $("#origen-lead").val("0");
            $("#ciudad-lead").val("");
            $("#pais-lead").val("");
            $("#campania-lead").val("");
            $("#email-lead").val("");
            $("#proyecto-lead").val("0");
          }

          $("#registrar_lead_btn").prop("disabled", false);
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar un proyecto y origen");
    }
  });

  $("#new-venta").on("click", function () {
    const today = dayjs().format("YYYY-MM-DD");
    $("#fecha_pago").attr("min", today);
    $("#crear-venta").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-venta .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-venta .close-modal").on("click", function () {
    $("#crear-venta .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-venta").addClass("md-hidden");
    }, 300);
  });
  function renderCart() {
    const cartTable = $("#cart-items");
    cartTable.empty();
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        const subtotal = item.quantity * item.price_final;
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.description
                  }</td>
                  <td class="border text-[14px] px-4 py-2">${item.quantity}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((item.price * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((subtotal * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">
                      <button class="text-red-500 hover:text-red-700" id="deleteItem" index-table="${index}"><ion-icon name="trash"></ion-icon></button>
                  </td>
              </tr>
          `;
        cartTable.append(row);
      });
    } else {
      cartTable.html("");
    }
  }

  // Función para agregar un elemento al carrito
  function addItem(id, description, quantity, price, price_final, currency) {
    cartItems.push({ id, description, quantity, price, price_final, currency });
    renderCart();
  }

  // Función para editar un elemento del carrito
  function editItem(index) {
    const row = $("#cart-items tr").eq(index); // Sumamos 1 para omitir la fila de encabezado
    const item = cartItems[index];

    // Convertir los campos en inputs editables
    row.find("td").each(function (i) {
      if (i > 0 && i < 4) {
        // Excluir el primer y último campo
        let fieldValue = $(this).text();
        if (i === 3) {
          // Campo de Precio
          // const currency = item.currency === "dolar" ? "$" : "S/";
          fieldValue = `<select class="currency-select">
                                  <option value="$" ${
                                    item.currency === "$" ? "selected" : ""
                                  }>$</option>
                                  <option value="S/" ${
                                    item.currency === "S/" ? "selected" : ""
                                  }>S/</option>
                              </select>
                              <input type="number" class="price-input" value="${
                                item.price
                              }">`;
        } else {
          fieldValue = `<input type="text" class="editable-field" value="${fieldValue}">`;
        }
        $(this).html(fieldValue);
      }
    });

    // Agregar botón de guardar
    const saveButton = $(
      `<button class="text-green-500 hover:text-green-700" index-table="${index}" id="saveItemChanges"><ion-icon name="save"></ion-icon></button>`
    );
    row.find("td:last-child").html(saveButton);
  }
  function saveItemChanges(index) {
    const row = $("#cart-items tr").eq(index);
    const item = cartItems[index];

    // Obtener los nuevos valores de los inputs editables
    const description = row.find(".editable-field").eq(0).val();
    const quantity = parseInt(row.find(".editable-field").eq(1).val());
    const currency = row.find(".currency-select").val();
    const price = parseFloat(row.find(".price-input").val());

    // Actualizar el objeto del carrito con los nuevos valores
    item.description = description;
    item.quantity = quantity;
    item.currency = currency;
    item.price = price;

    // Renderizar el carrito nuevamente
    renderCart();
  }
  // Función para eliminar un elemento del carrito
  function deleteItem(index) {
    cartItems.splice(index, 1);
    renderCart();
  }
  $("#cart-productos").on("click", function (e) {
    e.preventDefault();
    console.log(cartItems);
    let idLote = $("#lotesList").val();
    let precio = $("#precio-lote").val();
    let precio_final = $("#precio-lote-final").val();
    let tipo = $("#tipoVenta").val();
    if (cartItems.length === 1) {
      add_toast("warning", "Por lo pronto no puedes vender mas de un lote");
      return;
    }
    if (idLote !== "" && precio !== "" && tipo !== "0") {
      let selectLote = lotesList.find((l) => l.id === idLote);
      let description = `${tipo} de Lote ${selectLote.numero}, Mz: ${
        selectLote.mz_zona
      }${selectLote?.aerea ? ", Area:" + selectLote?.aerea : ""}`;
      addItem(idLote, description, 1, precio, precio_final, "S/");
    } else {
      add_toast("warning", "Aun no haz seleccionado ningun lote");
    }
  });
  $(document).on("click", "#editItem", function () {
    let index = $(this).attr("index-table");
    editItem(index);
  });
  $(document).on("click", "#deleteItem", function () {
    let index = $(this).attr("index-table");
    deleteItem(index);
  });
  $(document).on("click", "#saveItemChanges", function (e) {
    e.preventDefault();
    let index = $(this).attr("index-table");
    saveItemChanges(index);
  });
  async function registrar_venta(
    fecha,
    hora,
    proyecto_id,
    sede_id,
    cliente_id,
    asesor_id,
    tipo_venta,
    suma,
    tipo_pago,
    monto_inicial,
    monto_separacion,
    fecha_programacion,
    status
  ) {
    let funcion = "registrar_venta_financiero";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          tipo_pago,
          monto_inicial,
          fecha,
          hora,
          proyecto_id,
          sede_id,
          cliente_id,
          asesor_id,
          tipo_venta,
          suma,
          monto_separacion,
          fecha_programacion,
          status,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function actualizar_venta(tipo_pago, monto_change, status, id_venta) {
    let funcion = "actualizar_venta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          tipo_pago,
          monto_change,
          status,
          id_venta,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registrar_detalle_venta(cart, venta_id) {
    let funcion = "registrar_detalle_venta";

    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cart_items: JSON.stringify(cart), venta_id },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function cambiar_estado(cart, tipo_venta) {
    let funcion = "cambiar_estado";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cart_items: JSON.stringify(cart), tipo_venta },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
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
  async function registrar_cronograma_pagos(cronograma_pagos, venta_id) {
    let funcion = "registrar_cronograma_pagos";
    console.log(cronograma_pagos, venta_id);
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cronograma: JSON.stringify(cronograma_pagos), venta_id },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  function generarCronograma(
    fechaActual,
    tipo_fecha,
    fecha_pago,
    cuotas,
    monto
  ) {
    const cronograma = [];

    let fecha = dayjs(fecha_pago);
    switch (tipo_fecha) {
      case "Es igual a, cada 15 dias":
        for (let i = 0; i < cuotas; i++) {
          cronograma.push({
            fecha: fecha.format("YYYY-MM-DD"),
            monto: monto,
            status: "NO PAGADO",
            tipo: "CUOTAS",
            n_cuota: i + 1,
          });
          fecha = fecha.add(15, "day");
        }

        break;
      case "Es igual a, cada mes":
        for (let i = 0; i < cuotas; i++) {
          cronograma.push({
            fecha: fecha.format("YYYY-MM-DD"),
            monto: monto,
            status: "NO PAGADO",
            tipo: "CUOTAS",
            n_cuota: i + 1,
          });
          fecha = fecha.add(1, "month");
        }
        break;
      default:
        break;
    }

    return cronograma;
  }
  function pintar_cronograma(cronograma_pagos) {
    const cartTable = $("#cart-cronograma");
    cartTable.empty();
    if (cronograma_pagos.length > 0) {
      cronograma_pagos.forEach((item, index) => {
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${item.fecha}</td>
                  <td class="border text-[14px] px-4 py-2">${Math.round(
                    (item.monto * 100) / 100
                  ).toFixed(2)}</td>
              </tr>
          `;
        cartTable.append(row);
      });
    } else {
      cartTable.html("");
    }
  }
  function pintar_cronograma_change(cronograma_pagos_change) {
    const cartTable = $("#cart-cronograma-change");
    cartTable.empty();
    if (cronograma_pagos_change.length > 0) {
      cronograma_pagos_change.forEach((item, index) => {
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${item.fecha}</td>
                  <td class="border text-[14px] px-4 py-2">${Math.round(
                    (item.monto * 100) / 100
                  ).toFixed(2)}</td>
              </tr>
          `;
        cartTable.append(row);
      });
    } else {
      cartTable.html("");
    }
  }
  $("#generar-cronograma").on("click", function () {
    let monto_inicial = $("#monto_inicial").val();
    let numero_cuotas = $("#numero_cuotas").val();
    let monto_cuotas = $("#monto_cuotas").val();
    let tipo_fecha = $("#tipo_fecha").val();
    let fecha_pago = $("#fecha_pago").val();
    if (
      monto_inicial !== "" &&
      numero_cuotas !== "" &&
      numero_cuotas !== "" &&
      tipo_fecha !== "" &&
      fecha_pago !== ""
    ) {
      const fechaActual = dayjs();

      const cronograma = generarCronograma(
        fechaActual,
        tipo_fecha,
        fecha_pago,
        numero_cuotas,
        monto_cuotas
      );
      console.log(cronograma);
      cronograma_pagos = cronograma;
      pintar_cronograma(cronograma_pagos);
    } else {
      add_toast(
        "warning",
        "Debes llenar los campos de financiamiento para generar el cronograma"
      );
    }
  });
  $("#generar-cronograma_change").on("click", function () {
    let monto_inicial = $("#monto_change").val();
    let numero_cuotas = $("#numero_cuotas_change").val();
    let monto_cuotas = $("#monto_cuotas_change").val();
    let tipo_fecha = $("#tipo_fecha_change").val();
    let fecha_pago = $("#fecha_pago_change").val();
    if (
      monto_inicial !== "" &&
      numero_cuotas !== "" &&
      numero_cuotas !== "" &&
      tipo_fecha !== "" &&
      fecha_pago !== ""
    ) {
      const fechaActual = dayjs();

      const cronograma = generarCronograma(
        fechaActual,
        tipo_fecha,
        fecha_pago,
        numero_cuotas,
        monto_cuotas
      );
      console.log(cronograma);
      cronograma_pagos_change = cronograma;
      pintar_cronograma_change(cronograma_pagos_change);
    } else {
      add_toast(
        "warning",
        "Debes llenar los campos de financiamiento para generar el cronograma"
      );
    }
  });
  // change transferencia
  $("#metodo_pago").on("change", function (e) {
    let valor = e.target.value;
    if (valor === "TRANSFERENCIA") {
      $("#containerNumeroOperacion").removeClass("hidden");
      $("#numero_operacion").val("");
    } else {
      $("#containerNumeroOperacion").addClass("hidden");
      $("#numero_operacion").val("");
    }
  });
  $("#metodo_pago_change").on("change", function (e) {
    let valor = e.target.value;
    if (valor === "TRANSFERENCIA") {
      $("#containerNumeroOperacionChange").removeClass("hidden");
      $("#numero_operacion_change").val("");
    } else {
      $("#containerNumeroOperacionChange").addClass("hidden");
      $("#numero_operacion_change").val("");
    }
  });
  $("#registrar_venta_btn").on("click", async function () {
    $("#registrar_venta_btn").prop("disabled", true);
    let fecha = dayjs().format("YYYY-MM-DD");
    let hora = dayjs().format("HH:mm:ss");
    let proyecto_id = $("#proyectoList").val();
    let sede_id = sedeId;
    let cliente_id = $("#clientesList").val();
    let asesor_id = $("#asesorList").val();
    let tipo_venta = $("#tipoVenta").val();
    let suma = 0;
    let metodo_pago = $("#metodo_pago").val();

    let numeroOperacion = $("#numero_operacion").val();
    cartItems.forEach((c) => {
      suma = suma + c.price_final;
    });
    let monto_inicial = $("#monto_inicial").val();
    let numero_cuotas = $("#numero_cuotas").val();
    let monto_cuotas = $("#monto_cuotas").val();
    let tipo_pago = $("#financiamiento_check").prop("checked");
    let tipo_pago_separacion =
      $("#tipo_pago_separacion").val() === "AL CONTADO" ? 0 : 1;
    let monto_separacion = $("#monto_separacion").val();
    let fecha_programacion = $("#fecha_programacion").val();
    let splitfecha = fecha_programacion.split("T");
    let fecha_formated = `${splitfecha[0]} ${splitfecha[1]}:00`;
    console.log(fecha_formated);
    // return;
    if (
      proyecto_id !== "0" &&
      sede_id !== "" &&
      cliente_id !== "" &&
      asesor_id !== "" &&
      tipo_venta !== "" &&
      suma !== 0
    ) {
      if (metodo_pago === "TRANSFERENCIA") {
        if (numeroOperacion === "" || numeroOperacion === null) {
          add_toast(
            "warning",
            "Debes llenar el numero de operacion del comprobante"
          );
          return;
        }
      }
      if (tipo_pago) {
        if (
          monto_inicial === "" &&
          numero_cuotas === "" &&
          monto_cuotas === ""
        ) {
          add_toast("warning", "Debes llenar los campos del financimiento");
          return;
        } else {
          if (cronograma_pagos.length === 0) {
            add_toast("warning", "Debes generar un cronograma de pagos");
            return;
          }
        }
      }
      if (tipo_venta === "SEPARACION") {
        if (
          tipo_pago_separacion === 0 &&
          fecha_programacion === "" &&
          monto_separacion === ""
        ) {
          add_toast(
            "warning",
            "Debes llenar todos los campos para la separacion"
          );
          return;
        }
      }
      let tp = tipo_pago ? 1 : 0;
      console.log(tipo_pago_separacion);
      var venta;
      if (tipo_venta === "VENTA") {
        venta = await registrar_venta(
          fecha,
          hora,
          proyecto_id,
          sede_id,
          cliente_id,
          asesor_id,
          tipo_venta,
          suma,
          tp,
          monto_inicial,
          0,
          "",
          tipo_venta
        );
      } else {
        venta = await registrar_venta(
          fecha,
          hora,
          proyecto_id,
          sede_id,
          cliente_id,
          asesor_id,
          tipo_venta,
          suma,
          tipo_pago_separacion,
          0,
          monto_separacion,
          fecha_formated,
          tipo_venta
        );
      }
      if (venta[0].error) {
        add_toast("error", "Ocurrio un error");
        console.log(venta[0].error);
      } else {
        let venta_id = venta[0].venta_id;
        let detalle_venta = await registrar_detalle_venta(cartItems, venta_id);
        if (detalle_venta[0].error) {
          add_toast("error", "Ocurrio un error");
        } else {
          let monto_transaccion;
          let motivo_operacion;
          if (tipo_venta === "VENTA") {
            if (tipo_pago) {
              monto_transaccion = monto_inicial;
              motivo_operacion = "PAGO_INICIAL";
            } else {
              motivo_operacion = "PAGO_CONTADO";
              monto_transaccion = suma;
            }
          } else {
            motivo_operacion = "PAGO_SEPARACION";
            monto_transaccion = monto_separacion;
          }
          let transaccion = await registrar_transaccion(
            turno,
            monto_transaccion,
            metodo_pago,
            numeroOperacion,
            venta_id,
            fecha + " " + hora,
            motivo_operacion
          );
          if (transaccion[0].error) {
            add_toast("Ocurrio un error");
          } else {
            console.log(tipo_pago);
            if (tipo_pago) {
              let crono = await registrar_cronograma_pagos(
                cronograma_pagos,
                venta_id
              );
              if (crono[0].error) {
                add_toast(
                  "error",
                  "Ocurrio un error, no se registro el cronograma"
                );
                return;
              }
            }
            let newEstado = tipo_venta === "VENTA" ? "OCUPADO" : "SEPARADO";
            let estado = await cambiar_estado(cartItems, newEstado);
            if (estado[0].error) {
              add_toast("error", "Ocurrio un error");
            } else {
              let newlotes = await buscar_lotes_proyecto(proyecto_id);
              pintar_lotes(newlotes);
              $("#precio-lote").val("");
              $("#precio-lote-final").val("");
              cartItems = [];
              cronograma_pagos = [];
              renderCart();
              pintar_cronograma(cronograma_pagos);
              $("#financiamiento_check").val(false);
              $("#financiamiento_check").prop("checked", false);
              $("#monto_inicial").val("");
              $("#numero_cuotas").val("");
              $("#monto_cuotas").val("");
              $("#monto_separacion").val("");
              $("#fecha_programacion").val("");
              $("#clientesList").val("").trigger("change");
              $("#asesorList").val("").trigger("change");
              var ventas_financiero = await buscar_ventas();
              ventas_financiero.sort((a, b) =>
                dayjs(b.fecha).diff(dayjs(a.fecha))
              );
              pintar_ventas(ventas_financiero);
              $("#container-financiamento").addClass("hidden");
              $("#registrar_venta_btn").prop("disabled", false);
              add_toast(
                "success",
                `Se registro la ${tipo_venta} correctamente`
              );
            }
          }
        }
      }
    } else {
      $("#registrar_venta_btn").prop("disabled", false);
      add_toast(
        "warning",
        "Revisa todos los campos: cliente, proyecto tipo de venta, antes de registrar esta venta"
      );
    }
  });
  $("#actualizar_separacion").on("click", async function () {
    $("#actualizar_separacion").prop("disabled", true);

    let tipo_venta = "VENTA";
    let suma = 0;
    let metodo_pago = $("#metodo_pago_change").val();
    let numeroOperacion = $("#numero_operacion_change").val();
    let monto_change = $("#monto_change").val();
    let saldo_pagar = $("#monto_apagar").val();
    let monto_inicial = null;
    let monto_total = null;
    let numero_cuotas = $("#numero_cuotas_change").val();
    let monto_cuotas = $("#monto_cuotas_change").val();
    let tipo_pago = $("#tipo_pago_change").val();
    let monto_separacion = $("#monto_separacion_change").val();
    // return;
    if (tipo_venta !== "" && tipo_pago !== "" && saldo_pagar !== "") {
      var venta;
      if (metodo_pago === "TRANSFERENCIA") {
        if (numeroOperacion === "" || numeroOperacion === null) {
          add_toast(
            "warning",
            "Debes llenar el numero de operacion del comprobante"
          );
          return;
        }
      }
      if (tipo_pago === "1") {
        monto_inicial = monto_change;
        if (
          monto_inicial === "" &&
          monto_inicial !== null &&
          numero_cuotas === "" &&
          monto_cuotas === ""
        ) {
          add_toast("warning", "Debes llenar los campos del financimiento");
          $("#actualizar_separacion").prop("disabled", false);
          return;
        } else {
          if (cronograma_pagos_change.length === 0) {
            add_toast("warning", "Debes generar un cronograma de pagos");
            $("#actualizar_separacion").prop("disabled", false);
            return;
          }
        }
      }
      venta = await actualizar_venta(
        tipo_pago,
        monto_inicial,
        tipo_venta, //status de la venta
        ventaActive
      );

      if (venta[0].error) {
        add_toast("error", "Ocurrio un error");
        console.log(venta[0].error);
      } else {
        let monto_transaccion;
        let motivo_operacion;

        if (tipo_pago === "0") {
          monto_transaccion = saldo_pagar;
          motivo_operacion = "PAGO_RESTANTE_CONTADO";
        } else {
          motivo_operacion = "PAGO_RESTANTE_INICIAL";
          monto_transaccion = saldo_pagar;
        }
        let fecha = dayjs().format("YYYY-MM-DD HH::MM:SS");

        let transaccion = await registrar_transaccion(
          turno,
          monto_transaccion,
          metodo_pago,
          numeroOperacion,
          ventaActive,
          fecha,
          motivo_operacion
        );
        if (transaccion[0].error) {
          add_toast("Ocurrio un error");
        } else {
          if (tipo_pago === "1") {
            let crono = await registrar_cronograma_pagos(
              cronograma_pagos_change,
              ventaActive
            );
            if (crono[0].error) {
              add_toast(
                "error",
                "Ocurrio un error, no se registro el cronograma"
              );
              return;
            }
          }
          let newEstado = "OCUPADO";
          let estado = await cambiar_estado(detalleVentaActive, newEstado);
          if (estado[0].error) {
            add_toast("error", "Ocurrio un error");
          } else {
            cronograma_pagos_change = [];
            pintar_cronograma_change(cronograma_pagos_change);
            $("#monto_change").val("");
            $("#numero_cuotas_change").val("");
            $("#monto_cuotas_change").val("");
            $("#fecha_pago_change").val("");
            var ventas_financiero = await buscar_ventas();
            ventas_financiero.sort((a, b) =>
              dayjs(b.fecha).diff(dayjs(a.fecha))
            );
            pintar_ventas(ventas_financiero);
            $("#actualizar_separacion").prop("disabled", false);
            $("#modalChangeSeparacion .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#modalChangeSeparacion").addClass("md-hidden");
            }, 300);
            add_toast(
              "success",
              `Se actualizo la separacion a venta correctamente`
            );
          }
        }
      }
    } else {
      $("#actualizar_separacion").prop("disabled", false);
      add_toast(
        "warning",
        "Debe llenar toda la informacion tanto para vender al contado o financiado"
      );
    }
  });
  // ---------------FINANCIAMIENTO---------------------

  $("#financiamiento_check").on("click", function () {
    let actived = $(this).prop("checked");
    if (actived === false) {
      $("#monto_inicial").val("");
      $("#numero_cuotas").val("");
      $("#monto_cuotas").val("");
    }
    $("#container-financiamento").toggleClass("hidden");
    $("#proforma_financiamiento").toggleClass("hidden");
  });
});
