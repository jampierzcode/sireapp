$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var turno;
  var lotesList = [];
  var cartItems = [];
  var cronograma_pagos = [];
  var dataTable = $("#ingresosList").DataTable({
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
        data: "descripcion",
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_ingreso * 100) /
            100
          ).toFixed(2)}</p>`;
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
          return `${data.tipo_ingreso}`;
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
              <div class="flex gap-3">
              <button target="_blank" keyGasto="${data?.id}" id="print-venta" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="print" class="text-[15px]"></ion-icon></button>
              
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
            console.log(data);
            turno = data[0].id;
            resolve("si-register");
          }
        }
      );
    });
  }

  async function buscar_ingresos() {
    let funcion = "buscar_ingresos_caja";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          console.log(response);
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
  var apertura = await buscar_caja_abierta();
  console.log(apertura);
  if (apertura === "no-register") {
    $("#aperturar_caja").removeClass("md-hidden");
    setTimeout(() => {
      $("#aperturar_caja .form-create").addClass("modal-show");
    }, 300);
    return;
  }
  function pintar_ingresos(gastos) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(gastos).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    console.log(totalPaginas);
    if (estadoActual.page < totalPaginas) {
      console.log(estadoActual.page);
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      // dataTable.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#ingresosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  var gastos_financiero = await buscar_ingresos();
  pintar_ingresos(gastos_financiero);
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

  $("#new-ingreso").on("click", function () {
    $("#crear-ingreso").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-ingreso .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-ingreso .close-modal").on("click", function () {
    $("#crear-ingreso .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-ingreso").addClass("md-hidden");
    }, 300);
  });
  $("#tipo_ingreso").on("change", function () {
    let tipo = $(this).val();
    if (tipo === "PROYECTO") {
      $("#proyectoShow").removeClass("hidden");
    } else {
      $("#proyectoShow").addClass("hidden");
    }
  });
  async function registrar_ingreso(
    fecha,
    proyecto_id,
    tipo_ingreso,
    monto_ingreso,
    descripcion,
    turno_id
  ) {
    console.log(tipo_ingreso);
    let funcion = "registrar_ingreso_financiero";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          fecha,
          proyecto_id,
          tipo_ingreso,
          monto_ingreso,
          descripcion,
          turno_id,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  $("#registrar_ingreso_btn").on("click", async function () {
    $("#registrar_ingreso_btn").prop("disabled", true);

    let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let proyecto_id = $("#proyectoList").val();
    let tipo_ingreso = $("#tipo_ingreso").val();
    let descripcion = $("#descripcion_ingreso").val();

    let monto_ingreso = $("#monto_ingreso").val();
    // return;
    if (
      descripcion !== "" &&
      tipo_ingreso !== "" &&
      monto_ingreso !== 0 &&
      monto_ingreso !== ""
    ) {
      var tp;
      if (tipo_ingreso === "PROYECTO") {
        if (proyecto_id === "") {
          add_toast("warning", "Debes seleccionar un proyecto");
          $("#registrar_ingreso_btn").prop("disabled", false);
          return;
        } else {
          tp = proyecto_id;
        }
      } else {
        tp = null;
      }
      var gasto;
      console.log(turno);
      gasto = await registrar_ingreso(
        fecha,
        tp,
        tipo_ingreso,
        monto_ingreso,
        descripcion,
        turno
      );
      if (gasto[0].error) {
        add_toast("error", "Ocurrio un error");
        console.log(gasto[0].error);
      } else {
        $("#descripcion_ingreso").val("");
        $("#monto_ingreso").val("");
        var ventas_financiero = await buscar_ingresos();
        pintar_ingresos(ventas_financiero);
        $("#registrar_ingreso_btn").prop("disabled", false);
        add_toast("success", `Se registro el gasto correctamente`);
      }
    } else {
      $("#registrar_ingreso_btn").prop("disabled", false);
      add_toast(
        "warning",
        "Revisa todos los campos: descripcion, monto, tipo de venta que no tengan valores vacios"
      );
    }
  });
});
