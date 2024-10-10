$(document).ready(async function () {
  var funcion = "";
  var clientesList;
  var asesoresList;
  var idCliente;
  var proyectosList;
  var lotesListClientes;
  var lotesListModal;
  var dataClientesList;
  var selectedCount = 0;
  var idVentaActive;
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
      { data: "id" },
      // { data: "id" },
      {
        data: null,
        render: function name(data) {
          return data?.id_cliente !== null
            ? `${data?.nombres}<br/> ${data.apellidos}`
            : `<span class="w-max inline-block rounded-full p-2 bg-yellow-300 text-black font-bold text-xs">sin registrar</span>`;
        },
      },

      {
        data: null,
        render: function (data) {
          return `<b>${data.name_reference} <br/> ${data.direccion}-${data.ciudad_sede}</b>`;
        },
      },
      { data: "fecha" },
      // { data: "telefono" },
      // { data: "origen" },
      // { data: "ciudad" },

      {
        data: null,
        render: function (data) {
          return data.lote_id === null
            ? `<span class="p-2 text-xs bg-yellow-400 rounded-full font-bold text-black">Sin registrar</span>`
            : `<b>lote:${data.numero} Mz:${data.mz_zona} Area: ${data.area}m2</b> <br/>
            <p  class="text-xs">${data.nombre_proyecto}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          return data?.asesor_id === null
            ? `<span class="w-max inline-block rounded-full p-2 bg-yellow-300 text-black font-bold text-xs">sin registrar</span>`
            : `${data?.nombre_user} <br/> ${data?.apellido_user}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `${data.nombre_creador} ${data.apellido_creador} <br/> <span class="w-max inline-block rounded-full p-2 bg-blue-500 text-white text-xs">${data.nombrerol}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template_status = imprimirStatus(data?.tipo);
          template_status += `<span class="p-2 text-xs font-bold bg-black text-white rounded inline-block">${data.status}</span> <br/>`;
          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          //   template += `<span class="p-2 text-xs font-bold bg-black text-white rounded inline-block mb-2">${data.status}</span> <br/>`;

          switch (data.status) {
            case "VALIDADO":
              template += `
                <button target="_blank" id_task="${data?.id}" id="novalidartask" class="p-2 bg-red-600 rounded text-white font-bold text-sm">Cambiar a No Validado</button>
                <button target="_blank" id_task="${data?.id}" id="anulartask" class="p-2 bg-yellow-300 rounded text-black font-bold text-sm">Anular</button>
                `;
              break;
            case "NO VALIDADO":
              template += `no se pueden hacer mas acciones`;
              break;
            case "ANULADO":
              template += `no se pueden hacer mas acciones`;
              break;

            default:
              template += `
                  <div class="flex-actions">
                  <button target="_blank" keyClient="${data?.id_cliente}" id="historialCliente" class="btnJsvm normal">Historial</button>
                  <button target="_blank" id_task="${data?.id}" id="validartask" class="px-4 py-3 bg-yellow-400 rounded text-gray-800 fonot-bold">Validar</button>
                  <button target="_blank" id_task="${data?.id}" id="novalidartask" class="px-4 py-3 bg-red-600 rounded text-white fonot-bold">No Validar</button>
                   
                  </div>
        
                  `;
              break;
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
    select: {
      style: "multi",
    },
  });
  async function validartask(id_task, status) {
    return new Promise((resolve, reject) => {
      let fecha_validacion = dayjs().format("YYYY-MM-DD");
      let funcion = "validar_venta";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_task, status, fecha_validacion },
        (response) => {
          console.log(response);
          if (response.trim() === status) {
            resolve(status);
          } else {
            reject("ERROR");
          }
        }
      );
    });
  }
  async function update_lote(id, status) {
    return new Promise((resolve, reject) => {
      let funcion = "update_lote";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id, status },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  async function buscar_lotes_by_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_lotes_by_proyecto";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto: id },
        (response) => {
          let data;
          if (response.trim() === "no-register") {
            data = [];
          } else {
            data = response === false ? false : JSON.parse(response);
          }
          resolve(data);
        }
      );
    });
  }
  $(document).on("click", "#validartask", async function () {
    let id_task = $(this).attr("id_task");
    const dataSearch = clientesList.find((c) => c.id === id_task);
    console.log(dataSearch);
    if (dataSearch) {
      if (dataSearch.lote_id !== null && dataSearch.lote_id !== "") {
        if (dataSearch.cliente_id !== null && dataSearch.cliente_id !== "") {
          let confirmado = confirm(
            "estas seguro de validar esta venta, despues no habra marcha atras"
          );
          if (confirmado) {
            const validar = await validartask(id_task, "VALIDADO");

            if (validar === "VALIDADO") {
              let status =
                dataSearch.tipo === "SEPARACION" ? "SEPARADO" : "OCUPADO";
              const updateLote = await update_lote(dataSearch.lote_id, status);

              if (updateLote.message === "update_status") {
                add_toast("success", "Se valido correctamente");
              } else {
                alert(
                  "No se pudo actualizar el estado del lote por un error , vaya al lotizador para arreglarlo"
                );
              }
            } else {
              alert("Hubo un error contacta al aministrador");
            }
            var clientes = await buscar_ventas();
            filtrarProyectos();
          }
        } else {
          alert("Hubo un error contacta al aministrador");
        }
      } else {
        alert(
          "No se puede validar la " +
            dataSearch.tipo +
            " porque no se encuentra registro un lote"
        );
        const lotes = await buscar_lotes_by_proyecto(dataSearch.proyecto_id);
        if (lotes !== false) {
          lotesListClientes = lotes;
          let template_lotes = "";
          template_lotes += `
        <option value="0" disabled selected>Seleccione un lote</option>
        `;
          lotes.forEach((l) => {
            if (l.estado !== "DISPONIBLE" && l.estado !== "SIN PUBLICAR") {
              template_lotes += `
            <option disabled value="${l.id}">${l.estado} Lote ${l.numero} Mz:${l.mz_zona} Area: ${l.area}m2 Precio: ${l.precio}</option>
            `;
            } else {
              template_lotes += `
            <option value="${l.id}">${l.estado} Lote ${l.numero} Mz:${l.mz_zona} Area: ${l.area}m2 Precio: ${l.precio}</option>
            `;
            }
          });
          idVentaActive = dataSearch.id;
          $("#loteslist").html(template_lotes);
          $("#register_lote_edit").removeClass("md-hidden");
          setTimeout(() => {
            $("#register_lote_edit .form-create").addClass("modal-show");
          }, 300);
        } else {
          lotesListClientes = [];
        }
      }
    } else {
      alert(
        "No existe un lote producto seleccionado, porfavor edite la venta y establezca el lote"
      );
    }
  });
  $(document).on("click", "#anulartask", async function () {
    let id_task = $(this).attr("id_task");
    const dataSearch = clientesList.find((c) => c.id === id_task);
    let confirmado = confirm(
      "Estas seguro de anular la venta, no se podran hacer mas acciones si haces esto pero si hay un asesor asignado no afectara a su rendimiento"
    );
    if (confirmado) {
      const validar = await validartask(id_task, "ANULADO");
      if (validar === "ANULADO") {
        let status = "DISPONIBLE";
        const updateLote = await update_lote(dataSearch.lote_id, status);

        if (updateLote.message === "update_status") {
          add_toast("success", "Se cambio el estado de un lote");
        } else {
          alert(
            "No se pudo actualizar el estado del lote por un error , vaya al lotizador para arreglarlo"
          );
        }
        var clientes = await buscar_ventas();
        filtrarProyectos();
      } else {
        alert("Hubo un error contacta al aministrador");
      }
    }
  });
  $("#loteslist").on("change", function (e) {
    let valor = e.target.value;
    let precio = lotesListClientes.find((l) => l.id === valor).precio;
    $("#precio_final_lote").val(precio);
  });
  $("#register_lote_venta").on("click", async function (e) {
    $(this).attr("disabled", true);
    let funcion = "update_lote_venta";
    let lote_id = $("#loteslist").val();
    let precio = $("#precio_final_lote").val();

    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, lote_id, id_task: idVentaActive, precio },
      async (response) => {
        console.log(response);
        $("#register_lote_edit .form-create").removeClass("modal-show");
        setTimeout(() => {
          $("#register_lote_edit").addClass("md-hidden");
        }, 300);
        await buscar_ventas();
        filtrarProyectos();
        $(this).attr("disabled", false);
      }
    );
  });
  async function registrar_venta(data_venta) {
    return new Promise((resolve, reject) => {
      let funcion = "register_venta_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, data_venta },
        (response) => {
          console.log(response);
          resolve(response);
        }
      );
    });
  }
  // agregar un nuevo cliente
  $("#add-cliente").on("click", function () {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-lead .close-modal").on("click", function () {
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
    let sede_id = $("#sede-lead").val();
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
            let clientes = await buscar_clientes_empresa();

            pintar_clientes_empresa(sede_id);
            $("#clientesList").val(id).trigger("change");
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
            $("#proyecto-lead").val("");
          }

          $("#registrar_lead_btn").prop("disabled", false);
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar un proyecto y origen");
    }
  });
  // registrar venta
  $("#register_venta").on("click", async function (e) {
    $(this).attr("disabled", true);
    let funcion = "regiter_venta";
    let lote_id = $("#loteslistModal").val();
    let proyecto_id = $("#proyectosListModal").val();
    let sede_id = $("#sedesListModal").val();
    let tipo = $("#ventaTipo").val();

    let precio = $("#precio_final_modal").val();

    let cliente_id = $("#clientesList").val();
    let observaciones = $("#observacionesModal").val();
    console.log(cliente_id);
    console.log(lote_id);
    let select_asesor = $("#select_asesor").val();
    let user_id;
    let fecha_venta = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let status = "SEND_VALIDAR";
    if (tipo !== null) {
      if (lote_id !== null) {
        if (select_asesor === "SI") {
          user_id = $("#asesoresList").val();
          if (user_id === "") {
            add_toast("warning", "Debe seleccionar un asesor");
            $(this).attr("disabled", false);
            return;
          }
        } else {
          user_id = null;
        }
        if (cliente_id !== null) {
          let newData = {
            tipo,
            lote_id,
            user_id,
            cliente_id,
            precio,
            fecha_venta,
            status,
            observaciones,
            sede_id,
          };
          console.log(newData);
          const send_venta = await registrar_venta(newData);

          if (send_venta.trim() === "add-register-venta") {
            let staus_lote = tipo === "SEPARACION" ? "SEPARADO" : "OCUPADO";
            const updateLote = await update_lote(lote_id, staus_lote);
            await buscar_ventas();
            filtrarProyectos();
            const lotes = await buscar_lotes_by_proyecto(proyecto_id);
            pintar_lotes_modal(lotes);
            $("#register_venta_form .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#register_venta_form").addClass("md-hidden");
            }, 300);

            $("#ventaTipo").val("");
            $("#loteslistModal").val("");
            $("#precio_final_modal").val("");
            $("#observacionesModal").val("");
            $("#clientesList").val(null).trigger("change");
            $("#asesoresList").val(null).trigger("change");
            // register_venta_form
            add_toast("success", "Se registro correctamente la venta");
            if (updateLote.message === "update_status") {
              add_toast("success", "El estado de un lote se actualizo");
            } else {
              alert(
                "No se pudo actualizar el estado del lote por un error , vaya al lotizador para arreglarlo"
              );
            }
          } else {
            add_toast("error", "Hubo un error Contacta al administrador");
            console.log(send_venta);
          }
          $(this).attr("disabled", false);
        } else {
          add_toast("warning", "Debe seleccionar un cliente");
          $(this).attr("disabled", false);
        }
      } else {
        add_toast("warning", "Debe seleccionar un lote");
        $(this).attr("disabled", false);
      }
    } else {
      add_toast("warning", "Debe seleccionar el tipo de venta");
      $(this).attr("disabled", false);
    }
  });
  $(document).on("click", "#novalidartask", async function () {
    let id_task = $(this).attr("id_task");
    const dataSearch = clientesList.find((c) => c.id === id_task);
    let confirmado = confirm(
      "Estas seguro de rechazar la venta, no se podran hacer mas acciones si haces esto y si hay un asesor asignado no sumara a su rendimiento"
    );
    if (confirmado) {
      const validar = await validartask(id_task, "NO VALIDADO");
      if (validar === "NO VALIDADO") {
        let status = "DISPONIBLE";
        const updateLote = await update_lote(dataSearch.lote_id, status);

        if (updateLote.message === "update_status") {
          add_toast("success", "Se cambio a no validado");
        } else {
          alert(
            "No se pudo actualizar el estado del lote por un error , vaya al lotizador para arreglarlo"
          );
        }
        var clientes = await buscar_ventas();
        filtrarProyectos();
      } else {
        alert("Hubo un error contacta al aministrador");
      }
    }
  });
  // busca a todos los asesores
  async function fetchasesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            return;
          } else {
            const asesores = JSON.parse(response);
            asesoresList = asesores;
            resolve(asesores);
          }
        }
      );
    });
  }
  function pintar_results_asesores(sede_id) {
    const asesoresFilter = asesoresList.filter((a) => a.sede_id === sede_id);
    let template = `<option value="" selected></option>`;
    asesoresFilter.forEach((asesor) => {
      let option = `<option value=${asesor.id_usuario}>${asesor.nombre} ${asesor.apellido}</option>`;

      template += option;
    });

    $("#asesoresList").html(template);
    $("#asesoresList").select2({
      allowClear: true,
      placeholder: "Selecciona un asesor",
      data: [],
    });
  }
  async function buscar_clientes_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_clientes_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          const data = JSON.parse(response);
          dataClientesList = data;
          resolve(data);
        }
      );
    });
  }
  function pintar_clientes_empresa(sede_id) {
    const dataFilter = dataClientesList.filter((d) => d.sede_id === sede_id);
    let template = `<option value="" disabled selected>Seleccione un cliente</option>`;
    dataFilter.forEach((d) => {
      template += `<option value="${d.id_cliente}">Doc:${d?.documento} -- ${d.nombres} ${d.apellidos}</option>`;
    });
    $("#clientesList").html(template);
    $("#clientesList").select2({
      allowClear: true,
      placeholder: "Selecciona un cliente",
      width: "resolve",
    });
  }
  // opcion habilitado asesor register
  $("#select_asesor").on("change", function (e) {
    const select = e.target.value;
    if (select === "SI") {
      $("#viewListAsesores").removeClass("hidden");
    } else {
      $("#viewListAsesores").addClass("hidden");
    }
  });

  // nueva venta o separacion
  $("#new-venta").on("click", function () {
    $("#register_venta_form").removeClass("md-hidden");
    setTimeout(() => {
      $("#register_venta_form .form-create").addClass("modal-show");
    }, 300);
  });
  $("#register_venta_form .close-modal").on("click", function () {
    $("#register_venta_form .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#register_venta_form").addClass("md-hidden");
    }, 300);

    $("#ventaTipo").val("0");
    $("#loteslistModal").val("");
    $("#precio_final_modal").val("");
    $("#observacionesModal").val("");
    $("#clientesList").val(null).trigger("change");
    $("#asesoresList").val(null).trigger("change");
  });

  // buscar asesores con id cliente asignado
  function buscar_asesores(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesor_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          if (response.trim() == "no-register") {
            resolve(null);
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
    return dayjs(b.fecha).diff(dayjs(a.fecha));
  }
  // BUSCAR CLIENTES
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
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
    console.log(idCliente);
    let funcion = "removed_asigned_asesor";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente: idCliente, usuario: id_asesor },
      async (response) => {
        console.log(response);
        if (response.trim() === "remove-asigned") {
          alert("se elimino correctamente al asesor");
          const asesores = await buscar_asesores(id_cliente);
          // let template;
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

          const result = clientesList.find(
            (elemento) => elemento.id === idCliente
          );

          $("#nombre_user").html(
            result.nombres +
              " " +
              (result.apellidos !== "" && result.apellidos !== null
                ? result.apellidos
                : "")
          );
          buscar_ventas();
        } else {
          alert("Hubo un error, contacta al administrador");
        }
      }
    );
  });

  // fin de delete asigneed asesor

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

  async function buscar_ventas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_ventas_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          let template = "";
          if (response.trim() == "no-register-clientes") {
            resolve([]);
            clientesList = [];
          } else {
            const clientes = JSON.parse(response);
            clientesList = clientes;
            clientes.sort(compareDatesDesc);
            console.log(clientes);
            resolve(clientes);
          }
        }
      );
    });
  }
  // agregar lead
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
  async function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
        },
        (response) => {
          if (response.trim() === "no-register") {
            proyectosList = [];
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
  function pintar_sedes_lead(sedes) {
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
    llenar_proyectos_sede_lead(sedes[0].id);
  }
  $("#filter-sede").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos_sede(sede_id);
    filtrarProyectos();
  });
  $("#sede-lead").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos_sede_lead(sede_id);
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
  function llenar_proyectos_sede_lead(sede_id) {
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);
    let template = "";
    template += `<option value="" disabled>Seleccione un proyecto</option>`;

    // console.log(proyectosList);
    proyectos.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    console.log(template);
    $("#proyecto-lead").html(template);
  }
  // funciones para pintar modal
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
    $("#sedesListModal").html(template);
    llenar_proyectos_sede_modal(sedes[0].id);
    filtrarClientesModal();
  }
  function filtrarClientesModal() {
    console.log(clientes);
  }
  $("#sedesListModal").on("change", function (e) {
    let sede_id = e.target.value;
    pintar_clientes_empresa(sede_id);
    llenar_proyectos_sede_modal(sede_id);
    pintar_results_asesores(sede_id);
    filtrarClientesModal();
  });
  function pintar_lotes_modal(lotes) {
    lotesListModal = lotes;
    let template = `<option value="" disabled selected>Seleccione un lote</option>`;
    lotes.forEach((l) => {
      template += `
      <option value="${l.id}" ${
        l.estado !== "DISPONIBLE" && l.estado !== "SIN PUBLICAR"
          ? "disabled"
          : null
      }> ${l.estado} -- N: ${l.numero} Mz: ${l.mz_zona} Area:${
        l.area
      } S/${Number(l.precio).toFixed(2)}</option>
      `;
    });
    $("#loteslistModal").html(template);
  }
  $("#loteslistModal").on("change", function (e) {
    const id_lote = e.target.value;
    const precio = lotesListModal.find((l) => l.id === id_lote).precio;
    console.log(id_lote);
    console.log(precio);
    console.log(lotesListModal);
    $("#precio_final_modal").val(Number(precio));
  });
  $("#proyectosListModal").on("change", async function (e) {
    const id = e.target.value;
    const lotes = await buscar_lotes_by_proyecto(id);
    pintar_lotes_modal(lotes);
    $("#precio_final_modal").val("");
  });
  async function llenar_proyectos_sede_modal(sede_id) {
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);
    let template = "";
    template += `<option value="" disabled>Seleccione un proyecto</option>`;
    // console.log(proyectosList);
    proyectos.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#proyectosListModal").html(template);
    const lotes = await buscar_lotes_by_proyecto(proyectos[0].id);
    pintar_lotes_modal(lotes);
  }

  var clientes = await buscar_ventas();
  var sedes = await buscar_sedes_by_usuario();
  const data = await buscar_clientes_empresa();

  var proyectos = await buscar_proyectos();
  const asesores = await fetchasesores();
  pintar_sedes(sedes);
  pintar_sedes_lead(sedes);
  pintar_sedes_modal(sedes);
  pintar_clientes_empresa(sedes[0].id);

  pintar_results_asesores(sedes[0].id);
  // Event listeners para los cambios en el select y el input
  $(
    "#cliente-search, #filter-proyecto, #filter-selected, #filter-validacion"
  ).on("change", filtrarProyectos);
  function filtrarProyectos() {
    const selected = $("#filter-selected").val();
    const validacion = $("#filter-validacion").val();
    const nombreProyecto = $("#filter-proyecto").val();
    const sede = $("#filter-sede").val();
    const nombreCliente = $("#cliente-search").val().toLowerCase();

    const ventas = clientesList.filter((cliente) => {
      if (sede !== "Todas" && cliente.sede_id !== sede) {
        return false;
      }
      if (
        nombreProyecto !== "Todos" &&
        cliente.proyecto_id !== nombreProyecto
      ) {
        return false;
      }
      if (validacion !== "Todos" && cliente.status !== validacion) {
        return false;
      }
      if (selected === "SI" && cliente.asignado_usuario === "No asignado") {
        return false;
      }
      if (selected === "NO" && cliente.asignado_usuario !== "No asignado") {
        return false;
      }
      if (
        nombreCliente !== "" &&
        !contienenombreCliente(cliente, nombreCliente)
      ) {
        console.log(nombreCliente);
        return false;
      }
      return true;
    });
    console.log(ventas);

    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    dataTable.rows.add(ventas).draw(false);
    // Agregar las nuevas filas
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
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
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
    let arrayClientes = [];
    $.each(rows_selected, function (key, clienteId) {
      const cliente = clientesList.find((e) => e.id === clienteId);
      arrayClientes.push(cliente);
    });
    selectClientes = arrayClientes;
    console.log(arrayClientes.length);
    console.log(bolCount);
    if (arrayClientes.length === 0) {
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
        // $("#asigned_asesores_multiclient").removeClass("md-hidden");
        // setTimeout(function () {
        //   $("#asigned_asesores_multiclient .form-create").addClass(
        //     "modal-show"
        //   );
        // }, 10);
        console.log(rows_selected);
      } else {
        alert("aun no ha seleccionado ningun cliente");
      }
    } else {
      alert("No se selecciono a un cliente");
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
          id: cliente.id,
          fecha_now,
          hora_now,
        },
        (response) => {
          console.log(response);
        }
      );
    });
    alert("Se asignaron todos los clientes");
    $("#asesor-user-multi").val(null).trigger("change");

    $(".modal-create").addClass("md-hidden");

    buscar_ventas();
  });
  // fin de asignar varios clientes a un asesor

  function llenarFiltros() {
    let template = "";
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
    // llenar_modal_lead();
  }

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

  // FIN DE MODAL ASIGNES
  $("#historial-event .form-create .close-modal").click(() => {
    $("#historial-event").addClass("md-hidden");
    setTimeout(function () {
      $("#historial-event .form-create").removeClass("modal-show");
    }, 10);
  });
  $("#asigned_asesores .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $(".modal-create").addClass("md-hidden");
  });
  // FIN DE MODAL multi ASIGNES
  $("#asigned_asesores_multiclient .form-create .close-modal").click(() => {
    $("#asesor-user-multi").val(null).trigger("change");

    $(".modal-create").addClass("md-hidden");
  });

  // fin de presentation modal
});
