$(document).ready(async function () {
  var cajasList = [];
  var historialList;
  var dataTable = $("#gastosList").DataTable({
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
        data: "nombre",
      },
      {
        data: null,
        render: function (data) {
          return `${dayjs(data.fecha_creation).format("DD/MM/YYYY")}`;
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
              <div class="flex gap-3">
              <button target="_blank" keyCaja="${data?.id}" id="viewHistorial" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500">Ver Historial</button>
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
  var dataTableHistorial = $("#historialList").DataTable({
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
          return `${dayjs(data.fecha_apertura).format("DD/MM/YYYY")}`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.fecha_cierre === null) {
            return `No hay cierre`;
          } else {
            return `${dayjs(data.fecha_cierre).format("DD/MM/YYYY")}`;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_apertura * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_cierre * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.status === "ABIERTO") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">ABIERTO</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">CERRADO</p>
            `;
          }
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
              <div class="flex gap-3">
              <button target="_blank" keyTurno="${data?.id}" id="printHistorialTurno" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="print" class="text-[15px]"></ion-icon></button>
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

  async function buscar_cajas(sede_id) {
    let funcion = "buscar_cajas";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, sede_id },
        (response) => {
          console.log(response);
          if (response.trim() === "no-register") {
            add_toast(
              "error",
              "No hay cajas registradas, contacta al administrador"
            );
            resolve([]);
          } else {
            let cajas = JSON.parse(response);
            resolve(cajas);
          }
        }
      );
    });
  }
  async function buscar_historial(id) {
    let funcion = "buscar_historial_caja";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
          resolve("exito");
        }
      );
    });
  }
  async function finanzas(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_finanzas_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id },
        (response) => {
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
  async function gastos(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_gastos_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id },
        (response) => {
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
  async function ingresos(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_ingresos_turno";
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
  async function buscar_by_user_info_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_by_user_info_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-business") {
            resolve({ msg: "No se encontraron registros" });
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
  function pintar_cajas(cajas) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(cajas).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    if (estadoActual.page < totalPaginas) {
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();
      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#gastosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  function pintar_historial(turnos) {
    var estadoActual = {
      page: dataTableHistorial.page(), // Página actual
      scrollLeft: $("#historialList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTableHistorial.clear().draw(false);

    // Agregar las nuevas filas
    dataTableHistorial.rows.add(turnos).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTableHistorial.page.info();
    var totalPaginas = pageInfo.pages;
    if (estadoActual.page < totalPaginas) {
      dataTableHistorial.page(estadoActual.page);
    } else {
      dataTableHistorial.clear().draw();
      dataTableHistorial.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#historialList").parent().scrollLeft(estadoActual.scrollLeft);
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
  var mysede = await buscar_sedes_by_usuario();
  sedeId = mysede[0].id;
  var cajas = await buscar_cajas(sedeId);
  console.log(cajas);
  pintar_cajas(cajas);
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
  var proyectos = await buscar_proyectos();
  pintar_proyectos(proyectos);

  $("#proyectoList").select2({
    placeholder: "Seleccione un proyecto",
    allowClear: true,
  });
  // proyecto eventos
  $("#proyectoList").on("select2:select", async function (e) {
    var data = e.params.data;
    console.log(data);
  });
  $("#proyectoList").on("select2:unselect", function () {
    var data = e.params.data;
    console.log(data);
  });
  // historial modal

  $(document).on("click", "#viewHistorial", async function () {
    let id_caja = $(this).attr("keyCaja");
    let cajaActive = cajasList.find((c) => c.id === id_caja);
    $("#activeCaja").html(cajaActive?.nombre);
    const data_historial = await buscar_historial(id_caja);
    historialList = data_historial;
    pintar_historial(data_historial);
    if (data_historial) $("#historialCaja").removeClass("md-hidden");
    setTimeout(() => {
      $("#historialCaja .form-create").addClass("modal-show");
    }, 300);
  });
  $("#historialCaja .close-modal").on("click", function () {
    $("#historialCaja .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#historialCaja").addClass("md-hidden");
    }, 300);
  });
  // print historial turno
  $(document).on("click", "#printHistorialTurno", async function () {
    let id_turno = $(this).attr("keyturno");
    let data_turno = historialList.find((h) => h.id === id_turno);
    const data_empresa = await buscar_by_user_info_empresa();
    const data_finanzas = await finanzas(id_turno);
    const data_gastos = await gastos(id_turno);
    const data_ingresos = await ingresos(id_turno);
    console.log(data_empresa);
    console.log(data_turno);
    console.log(data_finanzas);
    console.log(data_gastos);
    generatePDF(
      data_turno,
      data_empresa,
      data_finanzas,
      data_gastos,
      data_ingresos
    );
    $("#modalPrintHistorial").removeClass("hidden");
  });

  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    console.log(event.target);
    if ($(event.target).attr("id") === "modalPrintHistorial") {
      console.log("click");
      $("#modalPrintHistorial").addClass("hidden");
    }
  });

  // Generar PDF y cargar en el visor al abrir el modal
  function generatePDF(
    data_turno,
    data_empresa,
    data_finanzas,
    data_gastos,
    data_ingresos
  ) {
    $("#boletaContent").removeClass("hidden");
    var total_finanzas = 0;
    var monto_inicial = data_turno.monto_apertura;
    var total_finanzas_efectivo = 0;
    var total_finanzas_transferencias = 0;
    var total_rendir = 0;
    var total_rendir_efectivo = 0;
    var total_gastos = 0;
    var total_ingresos = 0;
    var template_business = "";
    var template_transacciones = "";
    var template_gastos = "";
    var template_ingresos = "";
    $("#monto_inicial").html(
      `S/${((data_turno.monto_apertura * 100) / 100).toFixed(2)}`
    );
    template_business += `
        <img width="80px" class="mx-auto block" src="../../${data_empresa[0].logo}" alt="">
        <h1 class="text-center w-full block text-sm">${data_empresa[0].nombre_razon}</h1>
        <h1 class="text-center w-full block text-sm">${data_empresa[0].email}</h1>
        <h1 class="text-center w-full block text-sm">${data_empresa[0].phone_contact}</h1>
        `;
    if (data_finanzas.length > 0) {
      data_finanzas.forEach((data) => {
        total_finanzas = total_finanzas + Number(data.monto);
        switch (data.metodo_pago) {
          case "EFECTIVO":
            total_finanzas_efectivo =
              total_finanzas_efectivo + Number(data.monto);
            break;
          case "TRANSFERENCIA":
            total_finanzas_transferencias =
              total_finanzas_transferencias + Number(data.monto);
            break;

          default:
            break;
        }
        template_transacciones += `
              <tr>
              <td class="border px-2 py-2 text-xs">${data.motivo_operacion}</td>
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_cliente} ${
          data.apellido_cliente
        } <br/> ${data?.documento}</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_proyecto}</td>
              <td class="border px-2 py-2 text-xs font-bold">${
                data.metodo_pago
              }  ${
          data?.numero_operacion !== null ? data?.numero_operacion : ""
        }</td>
              <td class="border px-2 py-2 text-xs font-bold">S/${(
                (data.monto * 100) /
                100
              ).toFixed(2)}</td>
                  
                  </tr>
                  `;
      });
    }
    console.log(template_transacciones);
    $("#transacciones").html(template_transacciones);

    $("#total_finanzas").html(`S/${((total_finanzas * 100) / 100).toFixed(2)}`);
    $("#total_finanzas_efectivo").html(
      `S/${((total_finanzas_efectivo * 100) / 100).toFixed(2)}`
    );
    $("#total_finanzas_transferencias").html(
      `S/${((total_finanzas_transferencias * 100) / 100).toFixed(2)}`
    );
    if (data_gastos.length > 0) {
      data_gastos.forEach((data) => {
        total_gastos = total_gastos + Number(data.monto_gasto);
        template_gastos += `
            <tr>
              <td class="border px-2 py-2 text-xs">${data.descripcion}</td>
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 text-xs font-bold">${
                data.tipo_gasto
              }</td>
              <td class="border px-2 py-2 text-xs font-bold">S/${(
                (data.monto_gasto * 100) /
                100
              ).toFixed(2)}</td>
              
            </tr>
              `;
      });
    }
    if (data_ingresos.length > 0) {
      data_ingresos.forEach((data) => {
        total_ingresos = total_ingresos + Number(data.monto_ingreso);
        template_ingresos += `
            <tr>
              <td class="border px-2 py-2 text-xs">${data.descripcion}</td>
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 text-xs font-bold">${
                data.tipo_ingreso
              }</td>
              <td class="border px-2 py-2 text-xs font-bold">S/${(
                (data.monto_ingreso * 100) /
                100
              ).toFixed(2)}</td>
              
            </tr>
              `;
      });
    }

    $("#gastos").html(template_gastos);
    $("#ingresos").html(template_ingresos);
    $("#total_gastos").html(`S/${((total_gastos * 100) / 100).toFixed(2)}`);
    $("#total_ingresos").html(`S/${((total_ingresos * 100) / 100).toFixed(2)}`);
    total_rendir =
      Number(monto_inicial) + total_finanzas - total_gastos + total_ingresos;
    total_rendir_efectivo =
      Number(monto_inicial) +
      total_finanzas_efectivo +
      total_ingresos -
      total_gastos;
    $("#datosBusiness").html(template_business);
    $("#rendirTotal").html(`S/${((total_rendir * 100) / 100).toFixed(2)}`);
    $("#rendirTotalEfectivo").html(
      `S/${((total_rendir_efectivo * 100) / 100).toFixed(2)}`
    );

    const element = document.getElementById("boletaContent");

    // Generar PDF con html2pdf
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "boleta.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        // Mostrar PDF en el visor
        const pdfDataUri = pdf.output("datauristring");
        console.log(pdfDataUri);
        $("#pdfoutput").html(
          `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        );
        $("#boletaContent").addClass("hidden");
      });
  }
});
