$(document).ready(async function () {
  var funcion = "";
  var clientesList;
  var listSedes;
  var sedeId;
  var idTaskPendiente;
  var taskStatus;
  var asesoresList = [];
  var idCliente;
  var proyectosList = [];
  var selectedCount = 0;
  // lista de clientes seleccionados
  var selectClientes;
  var dataTable = $("#usuariosList").DataTable({
    // select: true,
    stateSave: false,
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
      leftColumns: 3,
    },

    columns: [
      { data: "id_cliente" },
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
      {
        data: null,
        render: (data) => {
          return `${data.fecha_creation} <br/> ${data.hora_creation}`;
        },
      },
      {
        data: null,
        render: (data) => {
          return `${data.name_reference} <br/> ${data.direccion} ${data.ciudad_sede}`;
        },
      },
      { data: "correo" },
      { data: "celular" },
      // { data: "telefono" },
      { data: "origen" },
      // { data: "ciudad" },
      { data: "nombre_proyecto" },
      {
        data: null,
        render: function (data) {
          return data.asignado_usuario === "No asignado"
            ? `<span>No</span> `
            : `${data.asignado_usuario}`;
        },
      },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     let template_status = imprimirStatus(data?.status);
      //     return template_status;
      //   },
      // },
      {
        data: null,
        render: function (data, type, row) {
          let template_status = `<div class="flex items-center gap-2">`;
          template_status += imprimirStatus(data?.status); // Cambiar de const a let

          if (data.task_status === "PENDIENTE") {
            const fechaVisita = dayjs(
              data.fecha_visita + " " + data.hora_visita
            );
            const ahora = dayjs();
            const diferencia = fechaVisita.diff(ahora, "minute", true); // Diferencia en minutos
            var dias = Math.floor(diferencia / (24 * 60));
            var horas = Math.floor((diferencia % (24 * 60)) / 60);
            var minutos = Math.floor(diferencia % 60);
            let tiempoRestante = "";

            // Ajuste para considerar 0 cuando estamos en el mismo día y hora
            if (
              diferencia > 0 ||
              (diferencia === 0 && fechaVisita.isAfter(ahora))
            ) {
              if (dias > 1) {
                tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;
              }

              if (horas > 1 || (dias === 0 && minutos === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${horas} hora${horas > 1 ? "s" : ""}`;
              }

              if (minutos > 0 || (dias === 0 && horas === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${minutos} minuto${minutos > 1 ? "s" : ""}`;
              }

              template_status +=
                tiempoRestante.length > 0
                  ? `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Faltan ${tiempoRestante}</div>`
                  : `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">La visita está programada para ahora</div>`;
            } else {
              dias = dias * -1;
              horas = horas * -1;
              minutos = minutos * -1;
              if (dias > 1) {
                tiempoRestante += `${dias - 1} día${dias > 2 ? "s" : ""}`;
              }

              if (horas > 1 || (dias === 0 && minutos === 0)) {
                tiempoRestante += `${tiempoRestante.length > 0 ? ", " : ""}${
                  horas - 1
                } hora${horas > 2 ? "s" : ""}`;
              }

              if (minutos > 0 || (dias === 0 && horas === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${minutos} minuto${minutos > 1 ? "s" : ""}`;
              }

              template_status +=
                tiempoRestante.length > 0
                  ? `<div class="px-4 py-2 bg-red-100 border-red-500 text-red-500 font-bold text-xs rounded">Retrasado por ${tiempoRestante}</div>`
                  : ""; // No mostrar nada si no hay retraso
            }

            template_status += `<span>${
              data.fecha_visita + " Hora: " + data.hora_visita
            }</span>`;
            if (
              data.status == "VISITA" ||
              data.status == "REPROGRAMACION VISITA"
            ) {
              if (data.asignado_usuario === "No asignado") {
                template_status += `
                    <div class="flex-actions">
                    <button target="_blank" keyTask="${data.id_task}" statusClient="ASISTIO" keyClient="${data?.id}" id="asistenciaYes" class="btnJsvm success mt-2">ASISTIO</button>
                    <button target="_blank" keyTask="${data.id_task}" statusClient="NO ASISTIO" keyClient="${data?.id}" id="asistenciaNot" class="btnJsvm danger mt-2">NO ASISTIO</button>
                  </div>
                    `;
              } else {
                template_status += ``;
              }
            } else {
              if (data.asignado_usuario === "No asignado") {
                template_status += `
                    <div class="flex-actions">
                    <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="completarTask" class="btnJsvm default mt-2">Completar Actividad</button>
                    </div>
                    `;
              } else {
                template_status += ``;
              }
            }
          } else {
            switch (data.status) {
              case "NO CONTACTADO":
                template_status += `
              <div class="flex-actions">
              <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id_cliente}" id="contactarSeguimiento" class="btnJsvm default mt-2">Contactar</button>
            </div>
              `;
                break;
              case "REPROGRAMACION CONTACTO":
                template_status += `COMPLETADO`;
                if (data.asignado_usuario === "No asignado") {
                  template_status += `
                <div class="flex-actions">
                <button target="_blank" statusClient="${data.status}" keyClient="${data?.id_cliente}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
                  </div>
                `;
                } else {
                  template_status += ``;
                }
                break;

              default:
                if (data.asignado_usuario === "No asignado") {
                  template_status += `
                  <div class="flex-actions">
                  <button target="_blank" statusClient="${data.status}" keyClient="${data?.id_cliente}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
                  </div>
                  `;
                } else {
                  template_status += ``;
                }
                break;
            }
          }
          template_status += `</div>`;

          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button target="_blank" keyTask="${data.id_task}" keyTaskStatus="${data.task_status}" keySede="${data.sede_id}" keyClient="${data?.id_cliente}" id="asignedClient" class="btnJsvm default"><ion-icon name="add-circle-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id_cliente}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
           
          <button target="_blank" keyClient="${data?.id_cliente}" id="historialCliente" class="btnJsvm normal">Historial</button>
           
          </div>

          `;
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
    select: {
      style: "multi",
    },
  });
  $(document).on("click", "#registerSeguimiento", function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let status = $(this).attr("statusClient");
    let template_status = imprimirStatus(status);
    console.log(clientesList);
    const result = clientesList.filter(
      (elemento) => elemento.id_cliente === id_cliente
    );
    console.log(result);
    $("#img-now-status").attr("src", "../../img/avatar_default.jpg");
    $("#name-now-status").html(result[0].nombres + " " + result[0].apellidos);
    $("#contact-now-status").html(result[0].celular);
    $("#status-now").html(template_status);
    $("#crear-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-event .form-create").addClass("modal-show");
    }, 10);

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  // SHOW MODAL registrar seguimiento
  async function seguimiento_cliente(observacion, cliente, status) {
    return new Promise((resolve, reject) => {
      let funcion = "seguimiento_cliente";
      var fecha = dayjs().format("DD/MM/YYYY");
      var hora = dayjs().format("HH:mm:ss");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, cliente, observacion, status, fecha, hora },
        async (response) => {
          if (response.trim() == "add-register-contact") {
            add_toast("success", "Se registro en el historial");
            resolve();
          } else {
            add_toast("error", "Hubo un error contacta con el administrador");
            reject({ err: "Hubo un error contacta con el administrador" });
          }
        }
      );
    });
  }
  function showSeguimientoCliente(id_cliente, status) {
    idCliente = id_cliente;
    let template_status = imprimirStatus(status);
    const result = clientesList.filter(
      (elemento) => elemento.id_cliente === id_cliente
    );
    $("#img-now-status").attr("src", "../../img/avatar_default.jpg");
    $("#name-now-status").html(result[0].nombres + " " + result[0].apellidos);
    $("#contact-now-status").html(result[0].celular);
    $("#status-now").html(template_status);
    $("#crear-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-event .form-create").addClass("modal-show");
    }, 10);
  }

  $(document).on("click", "#contactarSeguimiento", async function () {
    let id_cliente = $(this).attr("keyClient");

    let observacion = "Cliente contactado";
    let status = "CONTACTADO";
    await seguimiento_cliente(observacion, id_cliente, status);
    showSeguimientoCliente(id_cliente, status);
    await buscar_clientes();
    filtrarProyectos();
  });

  $("#status-evento").on("change", function (e) {
    let tipo = e.target.value;
    if (
      tipo === "VISITA" ||
      tipo === "REPROGRAMACION CONTACTO" ||
      tipo === "REPROGRAMACION VISITA"
    ) {
      $("#fecha_visita").removeClass("hidden");
      $("#addcalendar").removeClass("hidden");
    } else {
      $("#addcalendar").addClass("hidden");
      $("#fecha_visita").addClass("hidden");
    }
  });

  async function verificarAuthorizeCalendar() {
    handleAuthClick();
  }
  $("#registercalendar").on("change", function (e) {
    const ischeck = e.target.checked;
    if (ischeck) {
      verificarAuthorizeCalendar();
    }
  });
  async function registerVisita(fecha, hora, cliente, tipo, pendiente) {
    return new Promise((resolve, reject) => {
      let funcion = "add_visita_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha, hora, cliente, tipo, pendiente },
        (response) => {
          if (response.trim() === "add-register-visita") {
            add_toast("success", "Se registro" + tipo + " correctamente");
            animarProgress();
            resolve();
          } else {
            add_toast("error", "No se registro, contacta al administrador");
            reject({ err: "no se registro, contacta al adminitraor" });
          }
        }
      );
    });
  }
  function register_venta(fecha, cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "register_venta";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha, cliente },
        (response) => {
          if (response.trim() === "add-register-venta") {
            add_toast("success", "Se registro correctamente la venta");
            resolve();
          } else {
            add_toast("error", "Hubo un error Contacta al administrador");
            reject({ err: response });
          }
        }
      );
    });
  }
  $("#registerFormEvento").submit(async (e) => {
    e.preventDefault();
    $("#register_event_btn").prop("disabled", true);

    let status = $("#status-evento").val();
    let observaciones = $("#observaciones-evento").val();

    if (status !== "0") {
      if (
        status === "VISITA" ||
        status === "REPROGRAMACION CONTACTO" ||
        status === "REPROGRAMACION VISITA" ||
        status === "SEPARACION"
      ) {
        let pendiente = "PENDIENTE";
        let fecha = $("#date-visita").val();
        let hora = $("#time-visita").val() + ":00";

        const result = clientesList.filter(
          (elemento) => elemento.id_cliente === idCliente
        );
        let cliente = result[0].nombres + " " + result[0].apellidos;
        let summary = `${status} - Cliente:${cliente} ${result[0].celular}`;
        let description = `${observaciones} `;
        if (status === "SEPARACION") {
          let fecha_s = dayjs().format("YYYY-MM-DD");
          let hora_s = dayjs().format("HH:mm:ss");
          await registerVisita(
            fecha_s,
            hora_s,
            idCliente,
            status,
            "SEND_VALIDAR"
          );
        } else {
          if (fecha && hora) {
            await registerVisita(fecha, hora, idCliente, status, pendiente);
            if ($("#registercalendar").prop("checked") === true) {
              createCustomEvent(summary, description, fecha, hora);
              $("#addcalendar").addClass("hidden");
            }
            $("#date-visita").val(null);
            $("#time-visita").val(null);
          } else {
            // showToast();
            return;
          }
        }
      } else if (status === "VENTA") {
        let fecha = dayjs().format("YYYY-MM-DD");
        await register_venta(fecha, idCliente);
      }

      await seguimiento_cliente(observaciones, idCliente, status);

      let funcion = "buscar_historial_seguimiento";
      await buscar_clientes();
      await buscarHistorial(funcion, idCliente);
      $("#addcalendar").addClass("hidden");
      filtrarProyectos();

      $("#register_event_btn").prop("disabled", false);
      $("#status-evento").val("0");
      $("#observaciones-evento").val("");
      $("#crear-event .form-create").removeClass("modal-show");
      setTimeout(function () {
        $("#crear-event").addClass("md-hidden");
      }, 1000);
    } else {
      // showToast();
      add_toast("warning", "Debes seleccionar al menos un tipo");

      $("#register_event_btn").prop("disabled", false);
    }
  });

  var datatablesAsesores = $("#proyectsAsigned").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],
    columns: [
      { data: "id" },
      {
        data: null,
        render: function (data) {
          return `
        <p>${data.nombreAsesor + " " + data.apellidoAsesor}</p>
        `;
        },
      },
      { data: "asignado_usuario" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <button target="_blank" keySede="${data.sede_id}" keyAsesor="${data?.id}" id="deleteAsesor" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
          

          `;
        },
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });
  // busca a todos los asesores
  // fetchasesores();
  // function fetchasesores() {
  //   let funcion = "buscar_asesores";
  //   $.post(
  //     "../../controlador/UsuarioController.php",
  //     { funcion },
  //     (response) => {
  //       console.log(response);
  //       if (response.trim() === "no-register") {
  //         return;
  //       } else {
  //         const asesores = JSON.parse(response);
  //         asesoresList = asesores;
  //         pintar_results_asesores(asesoresList);
  //       }
  //     }
  //   );
  // }
  function pintar_results_asesores(asesores) {
    let template = `<option value="" selected></option>`;
    asesores.forEach((asesor) => {
      let option = `<option value=${asesor.id_usuario}>${asesor.nombre} ${asesor.apellido} - ${asesor.name_reference} ${asesor.direccion} ${asesor.ciudad}</option>`;

      template += option;
    });

    $("#asesor-user-multi").html(template);
    $("#asesor-user-multi").select2({
      allowClear: true,
      placeholder: "Selecciona un asesor",
      data: [],
    });
  }

  // buscar asesores con id cliente asignado
  async function buscar_asesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() == "no-register") {
            asesoresList = [];
            resolve([]);
          } else {
            const asesores = JSON.parse(response);
            asesoresList = asesores;
            resolve(asesores);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }

  var asesores = await buscar_asesores();

  function buscar_asesores_cliente(sede_id, id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesor_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente, sede_id },
        (response) => {
          if (response.trim() == "no-register") {
            resolve([]);
          } else {
            const asesores = JSON.parse(response);
            resolve(asesores);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }
  // BUSCAR CLIENTES
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
        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
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
  // delete asigneed asesor

  $(document).on("click", "#deleteAsesor", function () {
    const id_asesor = $(this).attr("keyAsesor");
    const sede_id = $(this).attr("keySede");
    console.log(idCliente);
    let funcion = "removed_asigned_asesor";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente: idCliente, usuario: id_asesor },
      async (response) => {
        console.log(response);
        if (response.trim() === "remove-asigned") {
          add_toast(
            "success",
            "se elimino la asignacion del asesor al cliente"
          );
          const asesores = await buscar_asesores_cliente(sede_id, idCliente);
          // let template;
          pintar_asesores_modal(asesores);

          buscar_clientes();
        } else {
          add_toast("error", "Hubo un error, contacta al administrador");
        }
      }
    );
  });

  // fin de delete asigneed asesor

  // editar lead
  $(document).on("click", "#editClient", function () {
    // console.log(e);
    // console.log("hola");
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#editar-lead #proyecto-lead").html(template);
    $("#editar-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#editar-lead .form-create").addClass("modal-show");
    }, 300);
    const id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    const clienteResult = clientesList.filter(
      (elemento) => elemento.id_cliente === id_cliente
    );
    console.log(id_cliente, clienteResult);

    $("#editar-lead #nombre-lead").val(clienteResult[0].nombres);
    $("#editar-lead #apellido-lead").val(clienteResult[0].apellidos);
    $("#editar-lead #documento-lead").val(clienteResult[0].documento);
    $("#editar-lead #celular-lead").val(clienteResult[0].celular);
    $("#editar-lead #telefono-lead").val(clienteResult[0].telefono);
    $("#editar-lead #origen-lead").val(clienteResult[0].origen);
    $("#editar-lead #ciudad-lead").val(clienteResult[0].ciudad);
    $("#editar-lead #pais-lead").val(clienteResult[0].Pais);
    $("#editar-lead #campania-lead").val(clienteResult[0].campania);
    $("#editar-lead #email-lead").val(clienteResult[0].correo);

    $("#editar-lead #proyecto-lead").val(clienteResult[0].proyet_id);
  });
  $("#editar-lead .close-modal").on("click", function () {
    $("#editar-lead .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#editar-lead").addClass("md-hidden");
    }, 300);
  });
  $("#editar-lead #editLead").submit((e) => {
    e.preventDefault();
    let nombre = $("#editar-lead #nombre-lead").val();
    let apellido = $("#editar-lead #apellido-lead").val();
    let documento = $("#editar-lead #documento-lead").val();
    let celular = $("#editar-lead #celular-lead").val();
    let telefono = $("#editar-lead #telefono-lead").val();
    let origen = $("#editar-lead #origen-lead").val();
    let ciudad = $("#editar-lead #ciudad-lead").val();
    let pais = $("#editar-lead #pais-lead").val();
    let campania = $("#editar-lead #campania-lead").val();
    let correo = $("#editar-lead #email-lead").val();
    let proyecto_id = $("#editar-lead #proyecto-lead").val();
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
    };
    console.log(result);
    if (proyecto_id !== "0") {
      let funcion = "edit_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, cliente: idCliente },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            add_toast("error", data.error);
          } else {
            add_toast("success", "Se edito correctamente al cliente");
            setTimeout(function () {
              $("#editar-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#editar-lead").addClass("md-hidden");
            buscar_clientes();

            $("#editar-lead #nombre-lead").val("");
            $("#editar-lead #apellido-lead").val("");
            $("#editar-lead #documento-lead").val("");
            $("#editar-lead #celular-lead").val("");
            $("#editar-lead #telefono-lead").val("");
            $("#editar-lead #origen-lead").val("");
            $("#editar-lead #ciudad-lead").val("");
            $("#editar-lead #pais-lead").val("");
            $("#editar-lead #campania-lead").val("");
            $("#editar-lead #email-lead").val("");
          }
        }
      );
    }
  });
  // fin de editar lead
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
          add_toast("warning", "no hay registro alguno, porfavor cree uno");
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

  async function buscar_clientes() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_clientes";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() == "no-register-clientes") {
            clientesList = [];
            resolve([]);
          } else {
            const clientes = JSON.parse(response);
            clientes.sort(compareDatesDesc);
            clientesList = clientes;
            resolve(clientes);
          }
        }
      );
    });
  }
  // agregar lead
  // async function buscar_proyectos() {
  //   funcion = "buscar_proyectos_agentes";
  //   const response = await $.post("../../controlador/UsuarioController.php", {
  //     funcion,
  //   });
  //   const proyectos = JSON.parse(response);
  //   proyectosList = proyectos;

  //   llenarFiltros();
  // }
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
    $("#filter-sede").html(template);
    llenar_proyectos_sede(sedes[0].id);
    filtrarProyectos();
  }
  $("#filter-sede").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos_sede(sede_id);
    filtrarProyectos();
  });
  function llenar_proyectos_sede(sede_id) {
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);
    let template = "";
    template += `<option value="" disabled>Seleccione un proyecto</option>`;
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectos.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
  }
  function pintar_sedes_modal(sedes) {
    let template = "";
    template += `
    <option value="" disabled>Seleccione una sede</option>
    `;
    sedes.forEach((s) => {
      template += `
      <option value="${s.id}">${s.name_reference} ${s.direccion}-${s.ciudad}</option>
      
      `;
    });
    $("#sede-lead").html(template);
    llenar_modal_lead(sedes[0].id);
  }
  $("#sede-lead").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_modal_lead(sede_id);
  });
  function llenar_modal_lead(sede_id) {
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);

    let template = "";
    template += `<option value="" disabled>Seleccione un proyecto</option>`;
    // console.log(proyectosList);
    proyectos.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#proyecto-lead").html(template);
  }
  await buscar_clientes();
  await buscar_proyectos();
  var sedes = await buscar_sedes_by_usuario();
  pintar_sedes(sedes);
  pintar_sedes_modal(sedes);
  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          let template = "";
          if (response.trim() == "no-register") {
            template += "<td>No hay registros</td>";
            proyectosList = [];
            resolve([]);
          } else {
            const proyectos = JSON.parse(response);
            // Reestructurar los proyectos para consolidar las sedes

            proyectosList = proyectos;
            resolve(proyectos);
            // console.log(proyectos);
            // llenarFiltros();
          }
        }
      );
    });
  }
  function reestructurar_proyectos(proyectos) {
    const proyectosReestructurados = proyectos.reduce((acc, proyecto) => {
      // Buscar si el proyecto ya está en el acumulador
      let proyectoExistente = acc.find((p) => p.id === proyecto.id);

      if (proyectoExistente) {
        // Si el proyecto ya existe, agregar la nueva sede al array de sedes
        proyectoExistente.sedes.push({
          sede_id: proyecto.sede_id,
          ciudad: proyecto.ciudad,
          direccion: proyecto.direccion,
          name_reference: proyecto.name_reference,
        });
      } else {
        // Si el proyecto no existe, crear un nuevo objeto de proyecto con el array de sedes
        acc.push({
          ...proyecto,
          sedes: [
            {
              sede_id: proyecto.sede_id,
              ciudad: proyecto.ciudad,
              direccion: proyecto.direccion,
              name_reference: proyecto.name_reference,
            },
          ],
        });
      }

      return acc;
    }, []);
    return proyectosReestructurados;
  }
  // filtro de pendientes
  $("#menu-pendientes").click(function () {
    typefilter = "PENDIENTE";
    const clientes = clientesList
      .filter((e) => e.task_status === "PENDIENTE") // Filtra por task_status igual a "PENDIENTE"
      .sort((a, b) => {
        // Ordena por fecha_visita y luego por hora_visita
        const fechaA = new Date(a.fecha_visita + " " + a.hora_visita);
        const fechaB = new Date(b.fecha_visita + " " + b.hora_visita);

        return fechaA - fechaB;
      });
    dataTable.clear().rows.add(clientes).draw();
  });

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto, #filter-selected").on(
    "change keyup",
    filtrarProyectos
  );
  function animarProgress() {
    const pendientes = clientesList.filter(
      (c) => c.task_status === "PENDIENTE"
    );
    $("#menu-pendientes").html("Pendientes: " + pendientes.length);
  }
  function filtrarProyectos() {
    const selected = $("#filter-selected").val();
    const nombreProyecto = $("#filter-proyecto").val();
    const sede = $("#filter-sede").val();

    const nombreCliente = $("#cliente-search").val().toLowerCase();

    const clientes = clientesList.filter((cliente) => {
      // si, asignado true
      //si, no asignado false
      // no, asignado false
      // no, no asignado true
      if (selected === "SI" && cliente.asignado_usuario === "No asignado") {
        return false;
      }
      if (selected === "NO" && cliente.asignado_usuario !== "No asignado") {
        return false;
      }
      if (sede !== "Todas" && cliente.sede_id !== sede) {
        return false;
      }
      if (nombreProyecto !== "Todos" && cliente.proyet_id !== nombreProyecto) {
        return false;
      }
      if (
        nombreCliente !== "" &&
        !contienenombreCliente(cliente, nombreCliente)
      ) {
        return false;
      }
      return true;
    });
    let newClientes = clientes.sort((a, b) => {
      var fechaA = new Date(a.fecha_creacion + " " + a.hora_creacion);
      var fechaB = new Date(b.fecha_creacion + " " + b.hora_creacion);

      // Compara las fechas
      if (fechaA < fechaB) {
        return 1;
      } else if (fechaA > fechaB) {
        return -1;
      } else {
        return 0; // Las fechas son iguales
      }
    });

    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(clientes).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    if (estadoActual.page < totalPaginas) {
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      dataTable.rows.add(clientes).draw();
      dataTable.page(totalPaginas - 1);
    }
    animarProgress();
    // Restaurar la posición de scroll horizontal
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  // --------reset filters
  $("#reset_filtros").click(function () {
    $("#cliente-search").val("");
    $("#filter-proyecto").val("Todos");

    $("#filter-sede").val(listSedes[0].id);
    $("#filter-selected").val("Todos");
    // dataTable.clear().rows.add(clientesList).draw();
    filtrarProyectos();
  });

  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contienenombreCliente(cliente, nombreCliente) {
    const nombreCompleto =
      `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreCliente);
  }
  // $("#usuariosList").on("click", ".dt-checkboxes", function () {
  //   console.log("check no check");
  //   if ($(this).prop("checked")) {
  //     selectedCount++;
  //   } else {
  //     selectedCount--;
  //   }

  //   // Actualiza el conteo en el elemento HTML
  //   $("#seleccionadosCount").text(selectedCount);
  // });
  // $("#menu-button-acciones").on("click", function () {
  //   var rows_selected = dataTable.column(0).checkboxes.selected();
  //   $.each(rows_selected, function (key, clienteId) {
  //     console.log(clienteId);
  //   });
  // });
  $(document).on("click", function () {
    var $expandAcciones = $("#expand-acciones");
    var $mostrarBoton = $("#menu-button-acciones");

    // Verifica si el clic no ocurrió en el botón ni en el elemento
    if (
      !$mostrarBoton.is(event.target) &&
      !$mostrarBoton.has(event.target).length &&
      !$expandAcciones.is(event.target) &&
      !$expandAcciones.has(event.target).length
    ) {
      // Si no tiene la clase "hidden", la agrega
      if (!$expandAcciones.hasClass("hidden")) {
        $mostrarBoton.attr("aria-expanded", "false");
        menu_acciones.style.transformOrigin = "left top";
        menu_acciones.style.opacity = "1";
        menu_acciones.style.transition =
          "transform 300ms ease-out, opacity 300ms ease-out";
        menu_acciones.style.transform = "scale(0)";
        menu_acciones.style.opacity = "0";
        setTimeout(function () {
          menu_acciones.classList.add("hidden");
        }, 300);
      }
    }
  });
  button_acciones.addEventListener("click", function () {
    let bolCount = 0;
    var expanded =
      button_acciones.getAttribute("aria-expanded") === "true" || false;
    button_acciones.setAttribute("aria-expanded", !expanded);
    var rows_selected = dataTable.column(0).checkboxes.selected();
    // console.log(rows_selected.length);
    let arrayClientes = [];
    $.each(rows_selected, function (key, clienteId) {
      const cliente = clientesList.find((e) => e.id_cliente === clienteId);
      arrayClientes.push(cliente);
      if (cliente.asignado_usuario !== "No asignado") {
        bolCount = bolCount + 1;
      }
    });
    selectClientes = arrayClientes;
    console.log(bolCount);
    if (bolCount > 0) {
      $("#asigned_usuarios_actions").attr("active", "false");
      $("#asigned_usuarios_actions").removeClass("cursor-pointer");
      $("#asigned_usuarios_actions").removeClass("hover:bg-slate-200");
      $("#asigned_usuarios_actions").removeClass("text-gray-700");
      $("#asigned_usuarios_actions").addClass("text-gray-200");
      $("#asigned_usuarios_actions").addClass("hover:bg-slate-100");
    } else {
      $("#asigned_usuarios_actions").attr("active", "true");
      $("#asigned_usuarios_actions").addClass("cursor-pointer");
      $("#asigned_usuarios_actions").addClass("hover:bg-slate-200");
      $("#asigned_usuarios_actions").addClass("text-gray-700");
      $("#asigned_usuarios_actions").removeClass("text-gray-200");
      $("#asigned_usuarios_actions").removeClass("hover:bg-slate-100");
    }

    if (!expanded) {
      menu_acciones.style.transformOrigin = "left top";
      menu_acciones.style.transform = "scale(0)";
      menu_acciones.style.opacity = "0";
      setTimeout(function () {
        menu_acciones.style.transition =
          "transform 300ms ease-out, opacity 300ms ease-out";
        menu_acciones.style.transform = "scale(1)";
        menu_acciones.style.opacity = "1";
      }, 0);
      menu_acciones.classList.remove("hidden");
    } else {
      menu_acciones.style.transformOrigin = "left top";
      menu_acciones.style.opacity = "1";
      menu_acciones.style.transition =
        "transform 300ms ease-out, opacity 300ms ease-out";
      menu_acciones.style.transform = "scale(0)";
      menu_acciones.style.opacity = "0";
      setTimeout(function () {
        menu_acciones.classList.add("hidden");
      }, 300);
    }
  });
  // asignar varios clientes a un asesor
  $("#asigned_usuarios_actions").click(function () {
    let active = $(this).attr("active");

    console.log(active);
    if (active === "true") {
      var rows_selected = dataTable.column(0).checkboxes.selected();
      if (rows_selected.length > 0) {
        let arrayClientes = [];
        $.each(rows_selected, function (key, clienteId) {
          const cliente = clientesList.find((e) => e.id_cliente === clienteId);
          arrayClientes.push(cliente);
          if (cliente.asignado_usuario !== "No asignado") {
            bolCount = bolCount + 1;
          }
        });
        let sede_id = arrayClientes[0].sede_id;

        var asesores = asesoresList.filter((a) => a.sede_id === sede_id);

        pintar_results_asesores(asesores);
        $("#asigned_asesores_multiclient").removeClass("md-hidden");
        setTimeout(function () {
          $("#asigned_asesores_multiclient .form-create").addClass(
            "modal-show"
          );
        }, 10);
      } else {
        add_toast("warning", "aun no ha seleccionado ningun cliente");
      }
    } else {
      add_toast(
        "warning",
        "Algunos clientes cuentan con asignacion, revisar selecciones"
      );
    }
  });
  $("#asesor-asigned-multiclient").click(function () {
    let funcion = "add_user_cliente";

    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
    let asesor = $("#asesor-user-multi").val();
    console.log(asesor);
    console.log(selectClientes);
    selectClientes.forEach((cliente) => {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          asesor,
          ids_clientes: JSON.stringify([cliente.id_cliente]),
          fecha_now,
          hora_now,
        },
        (response) => {
          console.log(response);
        }
      );
    });
    add_toast("success", "Se asignaron todos los clientes");
    $("#asesor-user-multi").val(null).trigger("change");

    $(".modal-create").addClass("md-hidden");

    buscar_clientes();
  });
  // fin de asignar varios clientes a un asesor

  function llenarFiltros() {
    let proyectosReestructurados = reestructurar_proyectos(proyectosList);

    let template = "";
    template += `<option value="" disabled>Selecione un proyecto</option>`;
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosReestructurados.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
    // llenar_modal_lead();
  }

  // filter cliente
  $("#cliente-search").on("keyup", function () {
    var nombre = $(this).val();
    console.log(clientesList);
    console.log(nombre);
    if (nombre !== "") {
      const result = clientesList.filter(function (persona) {
        var nombreCompleto = (
          persona.nombres +
          " " +
          persona.apellidos
        ).toLowerCase();
        return nombreCompleto.includes(nombre);
      });

      dataTable.clear().rows.add(result).draw();
    } else {
      dataTable.clear().rows.add(clientesList).draw();
    }
  });

  $("#modal-lead").click(() => {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 10);
  });
  $("#crear-lead .close-modal").click(function () {
    $("#crear-lead .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#crear-lead").addClass("md-hidden");
    }, 300);
  });
  $("#registerLead").submit((e) => {
    e.preventDefault();
    $("#registrar_lead_btn").prop("disabled", true);

    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
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
    let sede_id = $("#sede-lead").val();
    let proyecto_id = $("#proyecto-lead").val();
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
    console.log(result);
    if (proyecto_id !== "" && sede_id !== "") {
      let funcion = "add_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, sede_id },
        async (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            add_toast("error", data.error);
          } else {
            add_toast("success", "se subio correctamente el cliente");
            let id = data.id;
            setTimeout(function () {
              $("#crear-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#crear-lead").addClass("md-hidden");
            await buscar_clientes();
            filtrarProyectos();
            $("#nombre-lead").val("");
            $("#apellido-lead").val("");
            $("#documento-lead").val("");
            $("#celular-lead").val("");
            $("#telefono-lead").val("");
            $("#origen-lead").val("");
            $("#ciudad-lead").val("");
            $("#pais-lead").val("");
            $("#campania-lead").val("");
            $("#email-lead").val("");
            $("#proyecto-lead").val("");
          }
          $("#registrar_lead_btn").prop("disabled", false);
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar un proyecto");
    }
  });

  // asignar clientes
  $("#usuariosList tbody").on("click", ".cliente-checkbox", function () {
    var clientesSeleccionados = $(".cliente-checkbox:checked");
    console.log(clientesSeleccionados);
    var row = $(this).closest("tr");
    row.toggleClass("seleccion", $(this).checked);
    // Utiliza la variable "clientesSeleccionados" para asignarlos a un asesor u otras acciones que desees realizar.
  });
  $(document).on("click", "#checkAllClient", function () {
    if ($(this).is(":checked")) {
      $(".cliente-checkbox").prop("checked", true);
      var row = $(".cliente-checkbox").closest("tr");
      row.toggleClass("seleccion", $(".cliente-checkbox").checked);
    } else {
      $(".cliente-checkbox").prop("checked", false);
    }
    // Utiliza la variable "clientesSeleccionados" para asignarlos a un asesor u otras acciones que desees realizar.
  });

  // SHOW MODAL asigned
  function pintar_asesores_modal(asesores) {
    let template = `<option value="" selected></option>`;
    let asesoresAsigned = [];
    asesores.forEach((asesor) => {
      let option = `<option value=${asesor.id}>${asesor.nombreAsesor}</option>`;
      if (asesor.asignado_usuario === "Asignado") {
        asesoresAsigned.push(asesor);
        option = `<option value=${asesor.id} disabled>${asesor.nombreAsesor}</option>`;
      }
      template += option;
    });
    datatablesAsesores.clear().rows.add(asesoresAsigned).draw();

    $(".users_proyect").html(template);
    $(".users_proyect").select2({
      allowClear: true,
      placeholder: "Selecciona un asesor",
      data: [],
    });
  }
  $(".main-datatable").on("click", "#asignedClient", async function () {
    let id_task = $(this).attr("keyTask");
    let task_status = $(this).attr("keyTaskStatus");
    let id_cliente = $(this).attr("keyClient");
    let sede_id = $(this).attr("keySede");
    idTaskPendiente = id_task;
    taskStatus = task_status;
    idCliente = id_cliente;
    try {
      const asesores = await buscar_asesores_cliente(sede_id, id_cliente);
      console.log(asesores);
      // let template;
      if (asesores.length > 0) {
        pintar_asesores_modal(asesores);
        const result = clientesList.find(
          (elemento) => elemento.id_cliente === id_cliente
        );
        console.log(result);
        $("#nombre_user").html(
          result.nombres +
            " " +
            (result.apellidos !== "" && result.apellidos !== null
              ? result.apellidos
              : "")
        );

        $("#asigned_asesores").removeClass("md-hidden");
        setTimeout(function () {
          $("#asigned_asesores .form-create").addClass("modal-show");
        }, 10);
      } else {
        add_toast(
          "warning",
          "No hay asesores registrados en la sede donde esta el cliente"
        );
      }
    } catch (error) {
      // add_toast("error", "Hay un error de programacion");
      console.log(error);
    }
  });
  async function asignar_actividad_user(id_task, asesor_id) {
    return new Promise((resolve, reject) => {
      let funcion = "asignar_actividad_user";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_task, asesor_id },
        (response) => {
          resolve(JSON.parse(response));
        }
      );
    });
  }
  $("#update-asigned-form").click(async () => {
    funcion = "add_user_cliente";

    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
    let asesor = $("#asesor-user").val();
    const id = idCliente;
    const id_task = idTaskPendiente;
    const task_status = taskStatus;

    if (asesor !== "" && asesor !== "0") {
      if (task_status === "PENDIENTE") {
        let change_task = await asignar_actividad_user(id_task, asesor);
        if (change_task[0].msg === "update_task") {
          add_toast(
            "success",
            "La tarea pendiente se le asigno al asesor automaticamente"
          );
        } else {
          add_toast(
            "error",
            "La tarea pendiente no se asigno al asesor automaticamente"
          );
          return;
        }
      }
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          asesor,
          ids_clientes: JSON.stringify([id]),
          fecha_now,
          hora_now,
        },
        async (response) => {
          if (response.trim() == "add-user-cliente") {
            add_toast("success", "Se asigno el cliente al asesor");
            $("#asigned_asesores").addClass("md-hidden");
            setTimeout(function () {
              $("#asigned_asesores .form-create").removeClass("modal-show");
            }, 10);
            await buscar_clientes();
            filtrarProyectos();
          } else {
            add_toast("error", "No se asigno, contacta al administrador");
          }
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar al asesor para asignarlo");
    }
  });
  $();

  // FIN DE MODAL ASIGNES
  $("#crear-event .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#crear-event .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-event").addClass("md-hidden");
    }, 300);
  });
  $("#historial-event .form-create .close-modal").click(() => {
    $("#historial-event .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#historial-event").addClass("md-hidden");
    }, 300);
  });
  $("#asigned_asesores .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#asigned_asesores .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#asigned_asesores").addClass("md-hidden");
    }, 300);
  });
  // FIN DE MODAL multi ASIGNES
  $("#asigned_asesores_multiclient .form-create .close-modal").click(() => {
    $("#asesor-user-multi").val(null).trigger("change");
    $("#asigned_asesores_multiclient .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#asigned_asesores_multiclient").addClass("md-hidden");
    }, 300);
  });

  // fin de presentation modal
});
