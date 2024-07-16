$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var idCliente;
  var dataTable = $("#usuariosList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    // ordering: false,
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,
    fixedColumns: {
      leftColumns: 2, //Le indico que deje fijas solo las 2 primeras columnas
      // rightColumns: 1,
    },
    // aoColumnDefs: [
    //   {
    //     bSortable: false,
    //     aTargets: ["nosort"],
    //   },
    // ],

    columns: [
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
      {
        data: null,
        render: function (data) {
          let template = "";
          template += `<div class="flex flex-col gap-2 ">`;
          if (data.etiquetas === null) {
            template += `<p>Sin etiquetas</p>`;
          } else {
            // Convertir la cadena a un array
            const etiquetas = JSON.parse(data.etiquetas);
            console.log(etiquetas);
            const etiquetasArray = etiquetas[0].nombre.split(",");
            etiquetasArray.forEach((e) => {
              template += `<div class="p-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span class="font-medium whitespace-nowrap">${e}</span> </div>`;
            });
          }
          template += `</div>`;
          return template;
        },
      },
      // { data: "correo" },
      { data: "celular" },
      { data: "telefono" },
      { data: "origen" },
      { data: "ciudad" },
      { data: "nombre_proyecto" },
      {
        data: null,
        render: function (data, type, row) {
          let template_status = imprimirStatus(data?.status); // Cambiar de const a let

          if (data.task_status === "PENDIENTE") {
            template_status += `<span>${
              data.fecha_visita + " Hora: " + data.hora_visita
            }</span>`;
          } else {
            switch (data.status) {
              case "NO CONTACTADO":
                template_status += `
              <div class="flex-actions">
              </div>
              `;
                break;
              case "REPROGRAMACION CONTACTO":
                template_status += `COMPLETADO`;
                template_status += `
                  <div class="flex-actions">
                  </div>
                  `;
                break;
              case "REPROGRAMACION VISITA":
                template_status += `COMPLETADO`;
                template_status += `
                  <div class="flex-actions">
                </div>
                  `;
                break;
              case "VISITA":
                template_status += `COMPLETADO`;
                template_status += `
                  <div class="flex-actions">
                 </div>
                  `;
                break;

              default:
                template_status += `
                  <div class="flex-actions">
                  </div>
                  `;
                break;
            }
          }

          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
                <div class="flex-actions">
                <button target="_blank" keyClient="${data?.id}" id="restaurarClient" class="bg-green-600 text-white p-2 rounded-md flex items-center gap-2"><ion-icon name="arrow-back"></ion-icon> Restaurar</button>
                <button target="_blank" keyClient="${data?.id}" id="removeClient" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
                <button target="_blank" keyClient="${data?.id}" id="historialCliente" class="btnJsvm normal">Historial</button>
                
                
                </div>
      
                `;
        },
      },
    ],
    // columnDefs: [{ type: "date-dd-mm-yyyy", aTargets: [5] }],
    // order: false,
    // bLengthChange: false,
    // dom: '<"top">ct<"top"p><"clear">',
  });
  // registrar lead indiidual
  //   buscar_proyectos();
  //   async function buscar_proyectos() {
  //     funcion = "buscar_proyectos_agentes";
  //     const response = await $.post("../../controlador/UsuarioController.php", {
  //       funcion,
  //     });
  //     const proyectos = JSON.parse(response);
  //     proyectosList = proyectos;
  //   }

  //   function compareDatesDesc(a, b) {
  //     return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  //   }
  $(document).on("click", "#removeClient", function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let funcion = "delete_cliente_asesor";
    const confirmed = confirm("Estas seguro de eliminar al cliente?");
    if (confirmed) {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() === "delete-user-cliente") {
            alert("Se elimino correctamente");
            buscar_clientes();
          } else {
            alert("Ocurrio un error, contacta al administrador");
          }
        }
      );
    }

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  $(document).on("click", "#restaurarClient", function () {
    const id_cliente = $(this).attr("keyClient");
    console.log(id_cliente);
    let funcion = "restaurar_cliente";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente: id_cliente },
      (response) => {
        if (response.trim() === "restaurar-cliente") {
          buscar_clientes();
        } else {
          alert("Ocurrio un error al restaurar, contacte al administrador");
        }
      }
    );
  });
  buscar_clientes();
  // BUSCAR CLIENTES
  function buscar_clientes() {
    funcion = "buscar_clientes_by_asesor_papelera";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        $("#spin-load").html("");
        if (response.trim() === "no-register-clientes") {
          dataTable.clear().draw();
        } else {
          const clientes = JSON.parse(response);
          console.log(clientes);
          // console.log(clientes);
          clientesList = clientes;
          clientesList.sort(compareDatesDesc);
          filtrarProyectos();
        }
      }
    );
  }
  function filtrarProyectos() {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(clientesList).draw(false);
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
      dataTable.rows.add(clientes).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }

    // Restaurar la posición de scroll horizontal
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }

  const compareDates = (a, b) => {
    // Parsear las fechas con el formato "dd/mm/yyyy"
    const [dayA, monthA, yearA] = a.fecha.split("/");
    const [dayB, monthB, yearB] = b.fecha.split("/");

    // Crear las instancias de Date con el formato "YYYY-MM-DD"
    const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.hora}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.hora}`);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  };
  // show modal de historial de cliente
  $(document).on("click", "#historialCliente", function () {
    let cliente = $(this).attr("keyClient");
    idCliente = cliente;
    let funcion = "buscar_historial_seguimiento";
    buscarHistorial(funcion, cliente);
  });
  function buscarHistorial(funcion, cliente) {
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente },
      (response) => {
        console.log(response);
        if (response.trim() === "no-data") {
          alert("no hay registro alguno, porfavor cree uno");
        } else {
          const historial = JSON.parse(response);
          console.log(historial);
          const sortedData = historial.sort(compareDates);
          console.log(historial);
          console.log(sortedData);
          let template = "";
          sortedData.forEach((history) => {
            template += `
              <li class="mb-10 ml-4">
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${
                history.fecha + " " + history.hora
              }</time>
                              <h3 class="flex items-center gap-4 text-lg font-semibold text-gray-900 dark:text-white">Estado Registrado: ${imprimirStatus(
                                history.status
                              )}</h3>
                              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">${
                                history.observacion !== null
                                  ? history.observacion
                                  : "Sin observaciones"
                              }</p>
                              </li>
                              `;
          });
          $("#list-historial").html(template);
          $("#historial-event").removeClass("md-hidden");
          setTimeout(function () {
            $("#historial-event .form-create").addClass("modal-show");
          }, 10);
        }
      }
    );
  }
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;
      case "NO INTERESADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;

      case "CONTACTADO":
        template += `<span class="target_tab info flex items-center gap-2">CONTACTANDO <div role="status">
        <ion-icon name="checkbox-outline"></ion-icon>
          <span class="sr-only">Loading...</span>
      </div></span>`;

        break;
      case "NO RESPONDIO":
        template += `<span class="target_tab warning">${status}</span>`;

        break;
      case "VISITA":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "ASISTIO":
        template += `<span class="target_tab success">${status} a la visita</span>`;

        break;
      case "NO ASISTIO":
        template += `<span class="target_tab danger">${status}</span>`;

        break;
      case "REPROGRAMACION CONTACTO":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "REPROGRAMACION VISITA":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "SEPARACION":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "VENTA":
        template += `<span style="display: flex; gap: 10px; align-items: center" class="target_tab success"> 
          <img style="width: 20px;" src="../../img/corona.png" alt=""> ${status}</span>`;

        break;

      default:
        break;
    }
    return template;
  }

  function buscar_etiquetas_cliente(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_etiquetas_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const etiquetas = JSON.parse(response);
            resolve(etiquetas);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  $(document).on("click", "#verEtiquetasCliente", async function () {
    let id_cliente = $(this).attr("keyCliente");
    console.log(id_cliente);
    idCliente = id_cliente;
    try {
      const etiquetas = await buscar_etiquetas_cliente(id_cliente);
      console.log(etiquetas);
      let template;
      // let template = `<option value="" selected></option>`;
      let etiquetasAsigned = [];
      etiquetas.forEach((etiqueta) => {
        let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
        if (etiqueta.asignado_cliente === "asignado") {
          etiquetasAsigned.push(etiqueta);
          option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
        }
        template += option;
      });
      etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

      $("#etiquetas-user").html(template);
      $("#etiquetas-user").select2({
        allowClear: true,
        placeholder: "Selecciona una etiqueta",
      });
    } catch (error) {
      console.log(error);
    }
    $("#ver-etiquetas-clientes").removeClass("md-hidden");
    setTimeout(function () {
      $("#ver-etiquetas-clientes .form-create").addClass("modal-show");
    }, 10);
  });
  $("#ver-etiquetas-clientes .close-modal").click(() => {
    $("#ver-etiquetas-clientes .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#ver-etiquetas-clientes").addClass("md-hidden");
    }, 500);
  });
  $("#update-asigned-etiqueta").click(function () {
    let funcion = "update_asigned_etiqueta";
    let etiquetas = $("#etiquetas-user").val();
    let fecha = dayjs().format("YYYY-MM-DD");
    console.log(etiquetas);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, etiquetas, cliente: idCliente, fecha },
      async (response) => {
        if (response.trim() === "add-etiquetas-lead") {
          alert("Se asigno correctamente");
          buscar_clientes();
          const etiquetas = await buscar_etiquetas_cliente(idCliente);
          console.log(etiquetas);
          let template;
          // let template = `<option value="" selected></option>`;
          let etiquetasAsigned = [];
          etiquetas.forEach((etiqueta) => {
            let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
            if (etiqueta.asignado_cliente === "asignado") {
              etiquetasAsigned.push(etiqueta);
              option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
            }
            template += option;
          });
          etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

          $("#etiquetas-user").html(template);
          $("#etiquetas-user").select2({
            allowClear: true,
            placeholder: "Selecciona una etiqueta",
          });
        } else {
          alert("Hubo un error contacta con el administrador");
          console.log(response);
        }
      }
    );
  });
  // -----------------------------------------------

  $("#historial-event .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#historial-event").addClass("md-hidden");
    $("#historial-event .form-create").removeClass("modal-show");
  });
  // fin de presentation modal
});
