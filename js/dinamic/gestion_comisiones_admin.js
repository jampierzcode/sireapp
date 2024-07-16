$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var turno;
  var lotesList = [];
  var cartItems = [];
  var cuotaIdActive;
  let keyVentaActive;
  var cronograma_pagos = [];
  var comisionesList = [];
  async function buscar_comisiones_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_comisiones_admin";
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            comisionesList = [];
          } else {
            let data = JSON.parse(response);
            comisionesList = data;
            resolve(data);
          }
        }
      );
    });
  }
  await buscar_comisiones_admin();
  function verificar_comision_generada(venta_id) {
    let comision = comisionesList.filter((c) => c.venta_id === venta_id);
    return comision;
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
          return `${dayjs(data.fecha).format("DD / MM / YYYY")}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]">${
            data?.tipo_pago === "1" ? "FINANCIADO" : "AL CONTADO"
          }</p>`;
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

      //   {
      //     data: null,
      //     render: function (data) {
      //       return `<p class="font-bold text-[12px]"> S/${(
      //         (data.monto_inicial * 100) /
      //         100
      //       ).toFixed(2)}</p>`;
      //     },
      //   },
      //   {
      //     data: null,
      //     render: function (data) {
      //       let template = "";
      //       if (data.cantidad_cuotas !== data.cuotas_pagadas) {
      //         template += `
      //               <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold ${
      //                 data.cuotas_retrasadas > 0 ? "bg-red-500" : "bg-green-500"
      //               }">${data.cuotas_retrasadas} cuotas retrasadas</p>
      //                 `;
      //         template += `<br/>`;
      //         template += `<p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">${data.cuotas_pagadas} cuotas pagadas</p>
      //                 `;
      //       } else {
      //         template += `
      //               <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold bg-[#310ecd]">DEUDA PAGADA</p>
      //                 `;
      //       }
      //       return template;
      //     },
      //   },
      //   {
      //     data: null,
      //     render: function (data) {
      //       let template = "";
      //       //   if (data.financiamiento === "0") {
      //       //     template += `
      //       //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">AL CONTADO</p>
      //       //       `;
      //       //   } else {
      //       //     template += `
      //       //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">FINANCIADO</p>
      //       //       `;
      //       //   }
      //       template += `
      //               S/${(
      //                 ((Number(data.monto_pagado_now) +
      //                   Number(data.monto_inicial)) *
      //                   100) /
      //                 100
      //               ).toFixed(2)}
      //               `;
      //       return template;
      //     },
      //   },
      {
        data: null,
        render: function (data) {
          let verificar = verificar_comision_generada(data.id);
          let isvericado = verificar.length > 0 ? true : false;
          return isvericado ? `GENERADA` : `NO GENERADA`;
        },
      },
      {
        data: null,
        render: function (data) {
          let verificar = verificar_comision_generada(data.id);
          let isvericado = verificar.length > 0 ? true : false;
          return isvericado
            ? `S/${((verificar[0].monto_comision * 100) / 100).toFixed(
                2
              )} <br/> ${dayjs(verificar[0].fecha).format("DD/MM/YYYY")}`
            : `NO GENERADA`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template_generada = "";
          let template_no_generada = "";
          template_no_generada += `
              <div class="flex gap-3">
              <button target="_blank" keyVenta="${data?.id}" id="generar-comision" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white">Generar comision</button>
              `;
          template_no_generada += `</div>`;
          let verificar = verificar_comision_generada(data.id);
          let isvericado = verificar.length > 0 ? true : false;
          return isvericado ? template_generada : template_no_generada;
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
                    <button target="_blank" montoPago="${data?.monto_pago}" keyVenta="${data?.venta_id}" keyCuota="${data?.id}" id="pagar-is-cuota" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white text-[10px]">Pagar esta Cuota</button>
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
      dataTableCronograma.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTableCronograma.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#cronogramaList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  // pagar cuota eventos
  async function generar_comision(
    id_venta,
    asesor_id,
    tipo_comision,
    monto_tipo_comision,
    monto_comision,
    tipo_pago_comision
  ) {
    let funcion = "generar_comision";
    let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          id_venta,
          asesor_id,
          tipo_comision,
          monto_tipo_comision,
          monto_comision,
          tipo_pago_comision,
          fecha,
        },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  // generar comisiones
  $(document).on("click", "#generar-comision", function () {
    let keyVenta = $(this).attr("keyVenta");
    console.log(keyVenta);
    let data_venta = ventasList.filter((v) => v.id === keyVenta);
    keyVentaActive = data_venta[0].id;
    console.log(data_venta);
    let total_venta = data_venta[0].total;
    $("#total_venta_comision").val(total_venta);
    $("#generarcomision_modal").removeClass("md-hidden");
    setTimeout(() => {
      $("#generarcomision_modal .form-create").addClass("modal-show");
    }, 300);
  });
  $("#generarcomision_modal .close-modal").on("click", function () {
    $("#generarcomision_modal .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#generarcomision_modal").addClass("md-hidden");
    }, 300);
  });
  $("#tipoComision").on("change", function (e) {
    let valor = e.target.value;
    if (valor === "%") {
      $("#container_monto_tipo").removeClass("hidden");
      $("#monto_comision").prop("disabled", true);
    } else {
      $("#container_monto_tipo").addClass("hidden");
      $("#monto_comision").prop("disabled", false);
    }
  });
  $("#monto_tipo_comision").on("change", function (e) {
    let valor = e.target.value;
    let total_venta = $("#total_venta_comision").val();
    let monto_final = (total_venta * valor) / 100;
    $("#monto_comision").val(monto_final.toFixed(2));
  });

  $("#generate_comision_btn").on("click", async function () {
    let data_venta = ventasList.filter((v) => v.id === keyVentaActive);
    console.log(data_venta);
    let id_venta = data_venta[0].id;
    let asesor_id = data_venta[0].asesor_id;
    let tipo_comision = $("#tipoComision").val();
    let monto_tipo_comision = $("#monto_tipo_comision").val();
    let monto_comision = $("#monto_comision").val();
    let tipo_pago_comision = $("#tipo_pago_comision").val();
    var newcomision;
    newcomision = await generar_comision(
      id_venta,
      asesor_id,
      tipo_comision,
      monto_tipo_comision,
      monto_comision,
      tipo_pago_comision
    );
    if (newcomision[0].error) {
      add_toast("error", "ocurrio un error y no se genero la comision");
    } else {
      $("#tipoComision").val();
      $("#monto_tipo_comision").val("");
      $("#monto_comision").val("");
      $("#tipo_pago_comision").val("");
      $("#generarcomision_modal .form-create").removeClass("modal-show");
      await buscar_comisiones_admin();
      let data_ventas = await buscar_ventas();
      data_ventas.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
      pintar_ventas(data_ventas, cronograma_pagos);
      add_toast("success", "se genero la comision correctamente");
      setTimeout(() => {
        $("#generarcomision_modal").addClass("md-hidden");
      }, 300);
    }
  });

  async function buscar_ventas() {
    let funcion = "buscar_ventas_admin";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            let filter_pagos = data.filter((d) => d.status === "VENTA");
            ventasList = filter_pagos;
            resolve(filter_pagos);
          }
          resolve("exito");
        }
      );
    });
  }
  async function buscar_cronograma_pagos() {
    let funcion = "buscar_cronograma_pagos_admin";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
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
  console.log(ventas_financiero);
  var cronograma = await buscar_cronograma_pagos();
  ventas_financiero.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  pintar_ventas(ventas_financiero, cronograma);
  // buscar listas
  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos";
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
