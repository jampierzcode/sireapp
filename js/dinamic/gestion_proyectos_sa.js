$(document).ready(async function () {
  proyectosArray = [];
  var listProyectos = [];
  var lotesArray;
  var id_proyecto = "";
  var dataTableInstance; // Variable para almacenar la instancia de DataTables

  var dataTableUsers = $("#usersASigneds").DataTable({
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
        <p>${data.clienteNombre} ${data.clienteApellido}</p>
        `;
        },
      },
      { data: "asignado_proyecto" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <div class="dropdown">
            <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" id="no-asigned_user" key_user=${data.id}>- Quitar usuario</button></li>
              </ul>
          </div>
          </div>

          `;
        },
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });
  var dataTableLotes = $("#managerLotesList").DataTable({
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
    columns: [
      { data: "numero" },
      { data: "mz_zona" },
      { data: "ancho" },
      { data: "largo" },
      { data: "area" },
      { data: "precio" },
      { data: "estado" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button key_lote="${data.id}" id="editLote" type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"><ion-icon name="create"></ion-icon></button>
          
          <button id="saveLote" keyLote=${data.id} type="button" style="display: none;" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
          
          <button id="cancelLote" type="button" style="display: none;" class="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>

          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><ion-icon name="trash"></ion-icon></button>

          </div>

          `;
        },
      },
    ],
  });
  $(document).on("click", "#editLote", function () {
    var row = $(this).closest("tr");
    console.log(row);
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = [];
    cells.each(function (index) {
      if (index === 6) {
        // Índice 4 corresponde al campo "estado"
        var currentValue = $(this).text().trim();
        var selectOptions = [
          "DISPONIBLE",
          "SEPARADO",
          "OCUPADO",
          "SIN PUBLICAR",
        ];
        var selectHTML = `<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        `;
        for (var i = 0; i < selectOptions.length; i++) {
          var option = selectOptions[i];
          var selected = option === currentValue ? "selected" : "";
          selectHTML += "<option " + selected + ">" + option + "</option>";
        }
        selectHTML += "</select>";
        originalValues.push(currentValue);
        $(this).html(selectHTML);
      } else {
        var text = $(this).text();
        $(this).html(`
        <input value="${text}" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
        `);
        originalValues.push(text);
      }
    });

    // Alternar la visibilidad de los botones "Editar" y "Guardar"
    row.find("#editLote").hide();
    row.find("#saveLote").show();
    row.find("#cancelLote").show();

    // Guardar los valores originales para el botón "Cancelar"
    row.data("originalValues", originalValues);

    let id_lote = $(this).attr("key_lote");
    console.log(id_lote);
    const result = lotesArray.find((e) => e.id === id_lote);
    console.log(result);
  });
  // Cuando se hace clic en el botón "Cancelar"
  $(document).on("click", "#cancelLote", function () {
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = row.data("originalValues");
    console.log(originalValues);

    cells.each(function (index) {
      var originalValue = originalValues[index];
      $(this).text(originalValue);
    });

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    row.find("#editLote").show();
    row.find("#saveLote").hide();
    row.find("#cancelLote").hide();
  });

  // Cuando se hace clic en el botón "Guardar"
  $(document).on("click", "#saveLote", function () {
    var idLote = $(this).attr("keyLote");
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"

    var data = {};
    cells.each(function (index) {
      if (index === 6) {
        // Índice 4 corresponde al campo "estado"
        var selectedValue = $(this).find("select").val();
        data["estado"] = selectedValue;
        // $(this).text(selectedValue);
      } else {
        var fieldName = [
          "numero",
          "mz_zona",
          "ancho",
          "largo",
          "area",
          "precio",
        ][index];
        var inputValue = $(this).find("input").val();
        data[fieldName] = inputValue;
        // $(this).text(inputValue);
      }
    });
    data.id = idLote;
    console.log(data);

    // Realizar la petición POST para guardar los cambios en la base de datos
    let funcion = "editar_lote_info";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, data: JSON.stringify(data) },
      (response) => {
        console.log(response);
        if (response.trim() === "edit-sucess") {
          cells.each(function (index) {
            if (index === 6) {
              // Índice 4 corresponde al campo "estado"
              var selectedValue = $(this).find("select").val();
              $(this).text(selectedValue);
            } else {
              var inputValue = $(this).find("input").val();
              $(this).text(inputValue);
            }
          });
          row.find("#editLote").show();
          row.find("#saveLote").hide();
          row.find("#cancelLote").hide();
        } else {
          alert("No se pudo actualizar, contacta al administrador");
        }
      }
    );

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    // row.find("#editLote").show();
    // row.find("#saveLote").hide();
    // row.find("#cancelLote").hide();
  });

  function buscar_lotes(id_proyecto) {
    let funcion = "buscar_lotes_by_proyecto";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]); // Resolvemos la promesa con un array vacío
          } else {
            const proyectos = JSON.parse(response);
            resolve(proyectos); // Resolvemos la promesa con los datos obtenidos
          }
        }
      ).fail((error) => {
        reject(error); // En caso de error, rechazamos la promesa con el error
      });
    });
  }

  $(document).on("click", "#manager_lotes", async function () {
    id_proyecto = $(this).attr("key_proyect");
    let nombre = $(this).attr("name");
    $("#nombre_proyecto_lotes").html(nombre);
    // console.log(id_proyecto);
    try {
      const lotes = await buscar_lotes(id_proyecto);
      lotesArray = lotes;
      if (lotes.length > 0) {
        $("#modal-manager-lotes").removeClass("md-hidden");
        setTimeout(function () {
          $("#modal-manager-lotes .form-create").addClass("modal-show");
        }, 10);
        dataTableLotes.clear().rows.add(lotes).draw();
      } else {
        alert("Aun no hay lotes registrados");
      }
    } catch (error) {
      console.error("Error al buscar lotes:", error);
      // Manejo de errores aquí
    }
  });
  async function buscar_user_proyect(id_proyecto) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_user_proyect";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto },
        (response) => {
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const users = JSON.parse(response);
            resolve(users);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  async function buscar_empresas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_empresas";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
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
  async function buscar_proyectos_by_empresa(empresa_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_by_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, empresa_id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            listProyectos = [];
          } else {
            let data = JSON.parse(response);
            resolve(data);
            listProyectos = data;
          }
        }
      );
    });
  }
  function pintar_proyectos(proyectos, indice) {
    let template = "";
    if (proyectos.length > 0) {
      proyectos.forEach((p, index) => {
        template += `
        <div key="${index}" data-id="${
          p.id
        }" class="item-proyecto w-full px-4 py-3 rounded  cursor-pointer ${
          indice === index
            ? "bg-[#e9e4ff] text-[#310ecd]"
            : "bg-gray-100 text-gray-900"
        }">
            <div class="flex items-center gap-4">
            <img class="rounded h-8 w-8 object-contain" src="../../${
              p.logo
            }" alt="${p.nombreproyecto}">
            <p class="font-bold text-sm">${p.nombreproyecto}</p>
            </div>
            </div>
            `;
      });
    } else {
      template += `
      <p class="text-sm font-normal">No hay proyectos registrados en esta empresa</p>
      `;
    }
    $("#proyectosList").html(template);
  }
  $(document).on("click", ".item-proyecto", function () {
    var proyecto_id = $(this).data("id");
    $(".item-proyecto").removeClass("bg-[#e9e4ff] text-[#310ecd]");
    $(".item-proyecto").addClass("bg-gray-100 text-gray-900");
    $(this).removeClass("text-gray-900");
    $(this).addClass("bg-[#e9e4ff] text-[#310ecd]");
    console.log(listProyectos);
    var proyecto_activo = listProyectos.find(
      (p) => p.id === String(proyecto_id)
    );
    console.log(proyecto_activo);
    pintar_proyecto_activo(proyecto_activo);
  });
  function pintar_empresas(empresas) {
    let template = "";
    template += `
    <option value="0" disabled>Selecciona una empresa</option>`;
    empresas.forEach((e) => {
      template += `
      <option value="${e.id}">
      ${e.nombre_razon}
      </option>
      `;
    });
    $("#empresasList").html(template);
  }
  async function pintar_proyecto_activo(proyecto) {
    let template = "";
    template += `
    <img class="rounded h-12 w-12 object-contain" src="../../${proyecto.logo}" alt="">
    <div class="w-full">
    <div class="flex gap-4 justify-bettween items-center">
    <div>
        <p class="font-bold text-sm">Proyecto: ${proyecto.nombreproyecto}</p>
        <p class="font-bold text-sm">N Lotes: <span class="font-normal text-sm">${proyecto.cantlotes}</span></p>
        </div>
        
        <div class="flex gap-4">
            <button data-id="${proyecto.id}" id="edit_empresa" class="whitespace-nowrap bg-white inline-block font-bold rounded inline-flex px-3 py-2 text-sm">Editar</button>
            <button name="${proyecto.nombreproyecto}" key_proyect="${proyecto.id}" data-id="${proyecto.id}" id="manager_lotes" class="whitespace-nowrap bg-white inline-block font-bold rounded inline-flex px-3 py-2 text-sm">Ver lotes</button>
            <a target="_blank" href="./lotizador?id=${proyecto.id}" class="whitespace-nowrap bg-white inline-block font-bold rounded inline-flex px-3 py-2 text-sm">Config Plano</a>
        </div>
    </div>
    `;
    $("#datos_proyecto").html(template);
    $("#datos_proyecto").attr("key_proyecto", proyecto.id);
  }
  let empresas = await buscar_empresas();
  let proyectos = await buscar_proyectos_by_empresa(empresas[0].id);
  console.log(empresas);
  console.log(proyectos);
  pintar_empresas(empresas);
  pintar_proyectos(proyectos, 0, empresas[0].id);
  pintar_proyecto_activo(proyectos[0]);
  if (proyectos.length > 0) {
    pintar_proyecto_activo(proyectos[0]);
    $("#no-search").addClass("hidden");
    $(".main-proyectos").removeClass("hidden");
  } else {
    $(".main-proyectos").addClass("hidden");
    $("#no-search").removeClass("hidden");
  }
  $("#empresasList").on("change", async function (e) {
    let empresa_id = e.target.value;
    let proyectos = await buscar_proyectos_by_empresa(empresa_id);
    pintar_proyectos(proyectos, 0, empresa_id);
    if (proyectos.length > 0) {
      pintar_proyecto_activo(proyectos[0]);
      $("#no-search").addClass("hidden");
      $(".main-proyectos").removeClass("hidden");
    } else {
      $(".main-proyectos").addClass("hidden");
      $("#no-search").removeClass("hidden");
    }
  });
  // MODAL PROYECTOS
  function enviarImagenes(file, carpeta) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("carpeta", carpeta);
      formData.append("businesslogo", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          let mensaje = { msg: "add_file", url: response };
          resolve(mensaje);
        },
        error: function (error) {
          let mensaje = { msg: "error", error: error };
          reject(mensaje);
        },
      });
    });
  }

  function resetear_values_proyecto() {
    $("#logoProyecto").val("");
    $("#nombreProyecto").val("");
    $("#lotesProyecto").val("");
    let template = "";
    const count = imagenesCargadas.length;
    console.log(count);
    if (count == 1) {
      template += `
      <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
      <header class="title-drag">Drag & Drop to Upload File</header>
      <span>OR</span>
      `;
      $(".drag-area").html(template);
      $(".drag-area").removeClass("list-imagens");
    }
    const index = $(".eliminar-imagen").data("index");
    imagenesCargadas.splice(index, 1);
    $(".eliminar-imagen").closest(".image-card").remove();
  }
  $("#newProyecto").on("click", function () {
    // resetear valores
    resetear_values_proyecto();
    $("#modal_proyecto").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_proyecto .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal_proyecto .close-modal").on("click", function () {
    // resetear valores
    resetear_values_proyecto();
    $("#modal_proyecto .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_proyecto").addClass("md-hidden");
    }, 300);
  });
  async function registrar_proyecto(data_sede) {
    return new Promise((resolve, reject) => {
      let funcion = "register_proyecto";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, data: JSON.stringify(data_sede) },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  // drag imagen
  var imagenesCargadas = [];
  $("#img_dsct").on("change", (e) => {
    if ($(".drag-area").hasClass("list-imagens") == false) {
      $(".drag-area").addClass("list-imagens");
    }
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Aquí puedes llamar a la función para procesar la imagen, por ejemplo:
      mostrarImagen(file);
    }
    console.log(imagenesCargadas);
  });
  $(".drag-area").on("drop", (e) => {
    e.preventDefault();
    if ($(".drag-area").hasClass("list-imagens") == false) {
      $(".drag-area").addClass("list-imagens");
    }
    const files = e.originalEvent.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Aquí puedes llamar a la función para procesar la imagen, por ejemplo:
      mostrarImagen(file);
    }
    console.log(imagenesCargadas);
  });

  function mostrarImagen(file) {
    var reader = new FileReader();
    const index = imagenesCargadas.length;
    reader.onload = function (e) {
      let template = "";
      if (imagenesCargadas.length === 0) {
        $(".drag-area").html("");
      }
      template += `      
      <div class="image-card">
          <img src=${e.target.result} alt="">
          <span class="eliminar-imagen" data-index="${index}">&times;</span>
      </div>
      `;
      $(".drag-area").append(template);
      imagenesCargadas.push(file);
    };
    reader.readAsDataURL(file);
  }
  $(document).on("click", ".eliminar-imagen", function () {
    let template = "";
    const count = imagenesCargadas.length;
    console.log(count);
    if (count == 1) {
      template += `
    <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
    <header class="title-drag">Drag & Drop to Upload File</header>
    <span>OR</span>
    `;
      $(".drag-area").html(template);
      $(".drag-area").removeClass("list-imagens");
    }
    const index = $(this).data("index");
    imagenesCargadas.splice(index, 1);
    $(this).closest(".image-card").remove();
  });
  $("#registrar_proyecto").on("click", async function () {
    let nombreProyecto = $("#nombreProyecto").val();
    let cantLotes = $("#lotesProyecto").val();
    let empresa_id = $("#empresasList").val();
    let plano_upload = $("#img_dsct").prop("files")[0];
    let logo = $("#logoProyecto").prop("files")[0];
    let fecha_created = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (nombreProyecto !== "" && cantLotes !== "" && empresa_id !== "") {
      let data_proyecto = {
        nombreProyecto,
        cantLotes,
        fecha_created,
        empresa_id,
        logo: "",
        imgUrl: "",
      };
      $("#change_register_proyecto").removeClass("hidden");
      let send_logo = await enviarImagenes(logo, "logos");
      if (send_logo.msg === "add_file") {
        data_proyecto.logo = send_logo.url;
        let send_plano = await enviarImagenes(plano_upload, "proyectos");
        if (send_plano.msg === "add_file") {
          data_proyecto.imgUrl = send_plano.url;
          let registro = await registrar_proyecto(data_proyecto);

          if (registro.msg === "add-proyecto") {
            resetear_values_proyecto();
            let proyectos = await buscar_proyectos_by_empresa(empresa_id);
            pintar_proyectos(proyectos);
            $("#modal_proyecto .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#modal_proyecto").addClass("md-hidden");
            }, 300);
            add_toast("success", "Se registro la empresa correctamente");
          } else {
            add_toast("error", "No se pudo registrar la empresa");
          }
          $("#change_register_proyecto").addClass("hidden");
        } else {
        }
      } else {
        $("#change_register_proyecto").addClass("hidden");
        console.log(send_imagen.error);
        add_toast("error", "ocurrio un error al subir la imagen");
      }
    } else {
      add_toast(
        "warning",
        "Por lo menos debes llenar el ruc y el nombre de la empresa"
      );
    }
  });

  //  asigned proyectos
  $(document).on("click", "#asigned_user", async function () {
    let id_proyect = $(this).attr("key_proyect");
    id_proyecto = id_proyect;
    console.log(id_proyect);
    const result = proyectosArray.find(
      (elemento) => elemento.id === id_proyect
    );
    try {
      const usuarios = await buscar_user_proyect(id_proyect);
      console.log(usuarios);
      let template = `<option value="" selected></option>`;
      let usuariosAsigned = [];
      usuarios.forEach((user) => {
        let option = `<option value=${user.id}>${user.clienteNombre} ${user.clienteApellido}</option>`;
        if (user.asignado_proyecto === "Asignado") {
          usuariosAsigned.push(user);
          option = `<option value=${user.id} disabled>${user.clienteNombre} ${user.clienteApellido}</option>`;
        }
        template += option;
      });
      dataTableUsers.clear().rows.add(usuariosAsigned).draw();

      $(".users_proyect").html(template);
      $(".users_proyect").select2({
        allowClear: true,
        placeholder: "Selecciona un usuario",
      });

      $("#nombre_proyecto").html(result.nombreProyecto);
      $("#modal-asigned").removeClass("md-hidden");
      setTimeout(function () {
        $("#modal-asigned .form-create").addClass("modal-show");
      }, 10);
    } catch (error) {
      console.log(error);
    }
  });
  $(document).on("click", "#no-asigned_user", function () {
    if (confirm("¿Estás seguro de quitar usuario de proyecto?")) {
      let funcion = "removed_asigned_user";
      let id_usuario = $(this).attr("key_user");
      console.log(id_proyecto, id_usuario);
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_usuario, id_proyecto },
        async (response) => {
          if (response.trim() == "remove-asigned") {
            alert("Se removio correctamente la asignacion del usuario");
            buscar_proyectos();

            const usuarios = await buscar_user_proyect(id_proyecto);
            console.log(usuarios);
            let template = `<option value="" selected></option>`;
            let usuariosAsigned = [];
            usuarios.forEach((user) => {
              let option = `<option value=${user.id}>${user.clienteNombre} ${user.clienteApellido}</option>`;
              if (user.asignado_proyecto === "Asignado") {
                usuariosAsigned.push(user);
                option = `<option value=${user.id} disabled>${user.clienteNombre} ${user.clienteApellido}</option>`;
              }
              template += option;
            });
            dataTableUsers.clear().rows.add(usuariosAsigned).draw();

            $(".users_proyect").html(template);
            $(".users_proyect").select2({
              allowClear: true,
              placeholder: "Selecciona un usuario",
            });
          } else {
            alert("Hubo un error inesperado" + response);
          }
        }
      );
    } else {
      // Aquí puedes realizar la acción correspondiente si el usuario cancela
      alert("Acción cancelada");
    }
  });
  $(document).on("click", "#remove-proyect", function () {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
      let funcion = "removed_proyecto";
      let id_proyect = $(this).attr("key_proyect");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyect },
        async (response) => {
          if (response.trim() == "delete-proyect") {
            alert(
              "Se removio correctamente el proyecto, lotes y usuarios asignados"
            );
            buscar_proyectos();
          } else {
            alert("Hubo un error inesperado" + response);
          }
        }
      );
      // Aquí puedes realizar la acción correspondiente si el usuario confirma
      alert("Acción confirmada");
    } else {
      // Aquí puedes realizar la acción correspondiente si el usuario cancela
      alert("Acción cancelada");
    }
  });

  $("#update-asigned-form").click(() => {
    let funcion = "asigned_user_proyecto";
    const user = $("#user-proyect").val();
    console.log(user);
    if (user !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          user: Number(user),
          id_proyecto: Number(id_proyecto),
        },
        (response) => {
          console.log(response);
          if (response.trim() === "user-asigned") {
            $("#modal-asigned .form-create").removeClass("modal-show");
            setTimeout(function () {
              $("#modal-asigned").addClass("md-hidden");
            }, 300);
            buscar_proyectos();
          } else {
            console.log("error");
          }
        }
      );
    } else {
      alert("Por lo menos deberia escribir un nombre para el usuario");
    }
  });
  $("#modal-asigned .close-modal").click(() => {
    $("#user-form-edit .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-asigned").addClass("md-hidden");
    }, 300);
  });
  // EDIT LOTES MODAL
  $("#modal-manager-lotes .close-modal").click(() => {
    $("#modal-manager-lotes .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-manager-lotes").addClass("md-hidden");
    }, 300);
  });
  // -------

  $("#cancel-form-asigned").click(() => {
    setTimeout(function () {
      $("#modal-asigned .form-create").removeClass("modal-show");
    }, 300);
    $("#modal-asigned").addClass("md-hidden");
  });
});
