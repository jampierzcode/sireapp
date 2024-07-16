$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var turno;
  var lotesList = [];
  var cartItems = [];
  var cronograma_pagos = [];
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
        data: "descripcion",
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_gasto * 100) /
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
          return `${data.tipo_gasto}`;
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

  async function buscar_gastos() {
    let funcion = "buscar_gastos_total_admin";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
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
  function pintar_gastos(gastos) {
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
    $("#gastosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  var gastos_financiero = await buscar_gastos();
  gastos_financiero.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  pintar_gastos(gastos_financiero);
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
  function pintar_proyectos(sede_id) {
    console.log(proyectosList);
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);

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
  }
  // SEDE SECTION
  async function buscar_sedes_by_usuario() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_usuario";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            listSedes = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listSedes = data;
            resolve(data);
          }
        }
      );
    });
  }
  function pintar_sedes(sedes) {
    let template = "";
    template += `
    <option value="" disabled>Seleccione una sede</option>
    `;
    sedes.forEach((s) => {
      template += `
      <option value="${s.id}">${s.name_reference} ${s.direccion}-${s.ciudad}</option>
      
      `;
    });
    $("#sedeList").html(template);
    pintar_proyectos(sedes[0].id);
  }
  $("#sedeList").on("change", function (e) {
    let sede_id = e.target.value;
    pintar_proyectos(sede_id);
    // filtrarProyectos();
  });
  var proyectos = await buscar_proyectos();
  var sedes = await buscar_sedes_by_usuario();
  console.log(sedes);
  pintar_sedes(sedes);

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

  $("#new-gasto").on("click", function () {
    $("#crear-gasto").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-gasto .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-gasto .close-modal").on("click", function () {
    $("#crear-gasto .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-gasto").addClass("md-hidden");
    }, 300);
  });
  $("#tipo_gasto").on("change", function () {
    let tipo = $(this).val();
    if (tipo === "PROYECTO") {
      $("#proyectoShow").removeClass("hidden");
    } else {
      $("#proyectoShow").addClass("hidden");
    }
  });
  async function registrar_gasto(
    sede_id,
    fecha,
    proyecto_id,
    tipo_gasto,
    monto_gasto,
    descripcion
  ) {
    let funcion = "registrar_gasto_admin";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          sede_id,
          fecha,
          proyecto_id,
          tipo_gasto,
          monto_gasto,
          descripcion,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  $("#registrar_gasto_btn").on("click", async function () {
    $("#registrar_gasto_btn").prop("disabled", true);
    let sede_id = $("#sedeList").val();
    let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let proyecto_id = $("#proyectoList").val();
    let tipo_gasto = $("#tipo_gasto").val();
    let descripcion = $("#descripcion_gasto").val();

    let monto_gasto = $("#monto_gasto").val();
    // return;
    if (
      descripcion !== "" &&
      tipo_gasto !== "" &&
      monto_gasto !== 0 &&
      monto_gasto !== ""
    ) {
      var tp;
      if (tipo_gasto === "PROYECTO") {
        if (proyecto_id === "") {
          add_toast("warning", "Debes seleccionar un proyecto");
          $("#registrar_gasto_btn").prop("disabled", false);
          return;
        } else {
          tp = proyecto_id;
        }
      } else {
        tp = null;
      }
      var gasto;
      console.log(sede_id);
      gasto = await registrar_gasto(
        sede_id,
        fecha,
        tp,
        tipo_gasto,
        monto_gasto,
        descripcion
      );
      console.log(gasto);
      if (gasto[0].error) {
        add_toast("error", "Ocurrio un error");
        console.log(gasto[0].error);
      } else {
        $("#descripcion_gasto").val("");
        $("#monto_gasto").val("");
        var gastos = await buscar_gastos();
        gastos.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
        pintar_gastos(gastos);
        $("#registrar_gasto_btn").prop("disabled", false);
        add_toast("success", `Se registro el gasto correctamente`);
      }
    } else {
      $("#registrar_gasto_btn").prop("disabled", false);
      add_toast(
        "warning",
        "Revisa todos los campos: descripcion, monto, tipo de venta que no tengan valores vacios"
      );
    }
  });
});
