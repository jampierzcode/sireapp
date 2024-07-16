$(document).ready(async function () {
  var funcion = "";
  var usuariosArray = [];
  var listEmpresas = [];
  var selectedValues = [];
  var idCliente = "";
  var listServicios = [];
  var dataTable = $("#usuariosList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return `${data.nombre_rol}`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return data.nombre + " " + data.apellido;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<p class="font-bold">${data.user}</p>`;
        },
      },
      { data: "dni" },
      { data: "correo" },
      {
        data: null,
        render: function (data, type, row) {
          return `<p class="font-bold">${data.creator}</p>`;
        },
      },
      // { data: 'office' }
      {
        data: null,
        render: function (data, type, row) {
          return `
        <div class="flex items-start gap-4">        
        <button  key_user="${data.id_usuario}" class="shadow bg-white px-3 py-2 rounded" id="edit_permisos">
        Permisos
        </button>       
        <button class="px-3 py-2 rounded  bg-red-100 text-red-500 font-bold inline-flex gap-2 items-center" keyUsuario=${data.id_usuario} id="remove-usuario"><ion-icon name="trash-outline"></ion-icon> Eliminar Usuario</button></
        
        </div>`;
        },
      },
    ],
  });

  async function buscar_empresas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_empresas";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            listEmpresas = [];
          } else {
            let data = JSON.parse(response);
            resolve(data);
            listEmpresas = data;
          }
        }
      );
    });
  }
  function pintar_empresas(empresas) {
    let template = "";
    template += `
    <option value="0" disabled>Seleccione una empresa</option>
    
    `;
    empresas.forEach((e) => {
      template += `
      <option value="${e.id}">${e.nombre_razon}</option>
      `;
    });
    $("#empresasList").html(template);
  }
  var empresas = await buscar_empresas();
  console.log(empresas);
  empresas.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  //   var cronograma = await buscar_cronograma_pagos();
  pintar_empresas(empresas);
  buscar_usuarios();

  // BUSCAR CLIENTES
  function buscar_usuarios() {
    funcion = "buscar_usuarios_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() == "no-users-admin") {
          template += "No hay registros de clientes";
        } else {
          const result = JSON.parse(response);
          const usuarios = result.reverse();
          usuariosArray = usuarios;
          dataTable.clear().rows.add(usuarios).draw();
        }
      }
    );
  }
  buscar_servicios();
  function buscar_servicios() {
    let funcion = "buscar_servicios";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() === "no-services") {
          template += "No hay registros";
          listServicios = [];
        } else {
          const permisos = JSON.parse(response);
          permisos.forEach((permiso) => {
            template += `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${permiso.id}" id="check-${permiso.nombre}">
            <label class="form-check-label" for="check-${permiso.nombre}">
                ${permiso.nombre}
            </label>
        </div>
            `;
          });
          listServicios = permisos;
          $("#listPermisos").html(template);
        }
      }
    );
  }
  // ----------------------------
  // ELIMINAR USUARIO
  $(document).on("click", "#remove-usuario", function () {
    let id_usuario = $(this).attr("keyUsuario");
    console.log(id_usuario);
    idCliente = id_usuario;
    $("#confirm-delete-usuario").removeClass("hidden");
  });
  $("#cancel-modal-confirm").click(() => {
    $("#confirm-delete-usuario").addClass("hidden");
  });
  $("#cancel-delete-response").click(() => {
    $("#confirm-delete-usuario").addClass("hidden");
  });

  $("#confirm-delete-response").click(() => {
    let funcion = "delete_user";
    $.post(
      "../../controlador/UsuarioController.php",
      {
        funcion,
        id: Number(idCliente),
      },
      (response) => {
        console.log(response);
        if (response.trim() === "delete-usuario") {
          $("#confirm-delete-usuario").addClass("hidden");
          buscar_usuarios();
        } else {
          console.log("error");
        }
      }
    );
  });

  // ------------------
  //   CREATE usuarios
  $("#tipo-documento-modal").change(() => {
    if ($("#tipo-documento-modal").val() > 0) {
      $("#documento-modal").attr("disabled", false);
    } else {
      $("#documento-modal").attr("disabled", "true");
    }
    $("#documento-modal").val("");
  });

  $("#search-client").click(() => {
    let cen = 0;
    let tipo_documento = $("#tipo-documento-modal").val();
    let documento = $("#documento-modal").val();
    if (tipo_documento == 1) {
      var funcion = "dni";
      if (documento.length != 8) {
        alert(
          "La cantidad de digitos para el DNI son incorrectos, DNI de 8 digitos"
        );
      } else {
        cen = 1;
      }
    } else {
      var funcion = "ruc";
      if (documento.length != 11) {
        alert(
          "La cantidad de digitos para el RUC son incorrectos, RUC de 11 digitos"
        );
      } else {
        cen = 1;
      }
    }
    if (cen == 1) {
      $.post(
        "../../components/consultas_api.php",
        { funcion, documento },
        (response) => {
          console.log(response);
          const clientes = JSON.parse(response);
          console.log(clientes);
          if (tipo_documento == 1) {
            $("#nombres-modal").val(`${clientes.nombres}`);
            $("#apellidos-modal").val(
              `${clientes.apellidoPaterno} ${clientes.apellidoMaterno}`
            );
          } else {
            $("#nombres-modal").val(`${clientes.razonSocial}`);
          }
        }
      );
    }
  });
  // Detectar cambio en las etiquetas checkbox
  $(document).on("change", 'input[type="checkbox"]', function () {
    var value = $(this).val(); // Obtener el valor de la casilla seleccionada

    if ($(this).is(":checked")) {
      // Agregar el valor al array si la casilla se selecciona
      selectedValues.push(value);
    } else {
      // Remover el valor del array si la casilla se deselecciona
      var index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }
  });
  async function registrar_usuario(
    documento,
    nombres,
    apellidos,
    correo,
    phone,
    username,
    password,
    rol_id
  ) {
    return new Promise((resolve, reject) => {
      let funcion = "add_user";
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          documento,
          nombres,
          apellidos,
          correo,
          phone,
          username,
          password,
          rol_id,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registar_servicios(permisos, usuario_id) {
    return new Promise((resolve, reject) => {
      let funcion = "registar_servicios";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, permisos: JSON.stringify(permisos), id: usuario_id },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registrar_usuario_empresa(usuario_id, empresa_id) {
    return new Promise((resolve, reject) => {
      let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let funcion = "registar_usuario_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, usuario_id, empresa_id, fecha },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  function reset_form_usuario() {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#phone-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
  }

  $("#add-user-form").click(async () => {
    let empresa_id = $("#empresasList").val();
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    let apellidos = $("#apellidos-modal").val();
    let correo = $("#correo-modal").val();
    let phone = $("#phone-modal").val();
    let username = $("#username-modal").val();
    let password = $("#password-modal").val();
    let permisos = selectedValues;
    let rol_id = 2;
    if (nombres !== "undefined" && nombres && username && password) {
      let send_user = await registrar_usuario(
        documento,
        nombres,
        apellidos,
        correo,
        phone,
        username,
        password,
        rol_id
      );
      if (send_user[0].msg === "exist-user") {
        add_toast(
          "warning",
          "Cambie el nombre de usuario, porque ya existe en la plataforma"
        );
      } else {
        if (send_user[0].msg === "add-user") {
          if (permisos.length > 0) {
            let send_permisos = await registar_servicios(
              permisos,
              send_user[0].usuario_id
            );
            if (send_permisos[0].msg === "add-permisos") {
              let send_user_empresa = await registrar_usuario_empresa(
                send_user[0].usuario_id,
                empresa_id
              );
              if (send_user_empresa[0].msg === "add-business") {
                add_toast("success", "Se registro el usuario Correctamente");
                buscar_usuarios();
                reset_form_usuario();

                $("#modal-create-user .form-create").removeClass("modal-show");
                setTimeout(() => {
                  $("#modal-create-user").addClass("md-hidden");
                }, 300);
              } else {
                console.log(error);
                add_toast(
                  "error",
                  "Ocurrio un error contacta al administrador"
                );
              }
            } else {
              add_toast("error", "Ocurrio un error contacta al administrador");
            }
          }
        } else {
          console.log(send_user[0].error);
        }
      }
    } else {
      let template = "";
      if (nombres == "") {
        template += `Falta llenar el nombre \n`;
      }
      if (username == "") {
        template += `Falta llenar el userame para Login \n`;
      }
      if (password == "") {
        template += `Falta llenar el password para Login \n`;
      }
      alert(template);
    }
  });
  async function ver_permisos(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_permisos_usuario";
      $.post(
        "../../controlador/UsuarioController.php",
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
  // EDIT PERMISOS
  async function delete_permiso(id_servicio, id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "delete_permiso_user";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_servicio, id_cliente },
        (response) => {
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function add_permiso(id_servicio, id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "add_permiso_user";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_servicio, id_cliente },
        (response) => {
          resolve(JSON.parse(response));
        }
      );
    });
  }
  $(document).on("click", "#edit_permisos", async function () {
    $("#listPermisosUser").html("");
    let id_cliente = $(this).attr("key_user");
    console.log(id_cliente);
    $("#modal-edit-permisos").removeClass("md-hidden");
    let permisos = await ver_permisos(id_cliente);
    console.log(permisos);
    console.log(listServicios);
    // Crear checkboxes
    listServicios.forEach(function (servicio) {
      var isChecked;
      if (permisos.length > 0) {
        isChecked = permisos.some(function (permiso) {
          return permiso.id === servicio.id;
        });
      } else {
        isChecked = false;
      }

      var checkbox = $("<input>", {
        type: "checkbox",
        id: "servicio_" + servicio.id,
        value: servicio.id,
        checked: isChecked,
      });

      var label = $("<label>", {
        for: "servicio_" + servicio.id,
        text: servicio.nombre,
      });

      $("#listPermisosUser").append(checkbox).append(label).append("<br>");

      // Detectar cambios en los checkboxes
      checkbox.change(async function () {
        var idServicio = $(this).val();
        var isChecked = $(this).prop("checked");
        if (isChecked) {
          let addFrom = await add_permiso(idServicio, id_cliente);
          console.log(addFrom);
          if (addFrom[0].error) {
            console.log(addFrom[0].error);
            add_toast("error", "Ocurrio un error");
          } else {
            add_toast("success", "Se agrego el permiso");
          }
        } else {
          let deleteFrom = await delete_permiso(idServicio, id_cliente);
          console.log(deleteFrom);
          if (deleteFrom[0].error) {
            console.log(deleteFrom[0].error);
            add_toast("error", "Ocurrio un error");
          } else {
            add_toast("success", "Se elimino el permiso");
          }
        }
      });
    });
    setTimeout(() => {
      $("#modal-edit-permisos .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal-edit-permisos .close-modal").on("click", function () {
    $("#modal-edit-permisos .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal-edit-permisos").addClass("md-hidden");
    }, 300);
  });

  //   //  EDIT CLIENTES
  $(document).on("click", "#edit_usuario", function () {
    let id_cliente = $(this).attr("key_user");
    idCliente = id_cliente;
    console.log(id_cliente);
    const result = usuariosArray.find(
      (elemento) => elemento.id_usuario === id_cliente
    );
    console.log(result);
    $("#documento-modal-edit").val(result.dni == 0 ? "" : result.dni);
    $("#nombres-modal-edit").val(result.nombre);
    $("#apellidos-modal-edit").val(result.apellido);
    $("#correo-modal-edit").val(result.correo);
    $("#modal-edit-user").removeClass("md-hidden");
    setTimeout(function () {
      $("#modal-edit-user .form-create").addClass("modal-show");
    }, 10);
  });
  $("#user-form-edit").click(() => {
    let funcion = "update_user";
    const user_documento = $("#documento-modal-edit").val();
    const user_nombres = $("#nombres-modal-edit").val();
    const user_apellidos = $("#apellidos-modal-edit").val();
    const user_correo = $("#correo-modal-edit").val();
    const data_user = {
      user_documento: Number(user_documento),
      user_nombres,
      user_apellidos,
      user_correo,
      id: Number(idCliente),
    };
    if (user_nombres !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          data_user,
        },
        (response) => {
          console.log(response);
          if (response.trim() === "update-usuario") {
            setTimeout(function () {
              $("#modal-edit-user .form-create").removeClass("modal-show");
            }, 10);
            $("#modal-edit-user").addClass("md-hidden");
            buscar_usuarios();
          } else {
            console.log("error");
          }
        }
      );
    } else {
      alert("Por lo menos deberia escribir un nombre para el usuario");
    }
  });

  // SHOW MODAL CREATE
  $("#create-clients").click(() => {
    $("#modal-create-user").removeClass("md-hidden");
    setTimeout(function () {
      $("#modal-create-user .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal-create-user .close-modal").click(() => {
    $("#documento-modal").attr("disabled", "true");
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    $(".modal-create .form-create").removeClass("modal-show");
    setTimeout(function () {
      $(".modal-create").addClass("md-hidden");
    }, 300);
  });

  $("#cancel-form").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    setTimeout(function () {
      $(".modal-create .form-create").removeClass("modal-show");
    }, 10);
    $(".modal-create").addClass("md-hidden");
  });

  // modal edit

  $("#modal-edit-user .close-modal").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    setTimeout(function () {
      $("#modal-edit-user .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-edit-user").addClass("md-hidden");
  });

  $("#cancel-form-edit").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    setTimeout(function () {
      $("#modal-edit-user .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-edit-user").addClass("md-hidden");
  });

  // fin de presentation modal
});
