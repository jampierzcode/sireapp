$(document).ready(async function () {
  var funcion = "";
  var usuariosArray = [];
  var proyectosList = [];
  var selectedValues = [];
  var listUsuariosSede = [];
  var idCliente = "";
  var empresaId = "";
  var sedesList = "";
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
          return `<p class="font-bold text-sm"> ${data.nombrerol}</p>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `${data.nombre} <br/> ${data.apellido}`;
        },
      },
      { data: "user" },
      {
        data: null,
        render: function (data, type, row) {
          return `<span class="font-bold text-sm">${data.name_reference}</span> <br/> ${data.direccion} ${data.ciudad}`;
        },
      },
      { data: "dni" },
      { data: "correo" },
      { data: "phone_number" },
      {
        data: null,
        render: function (data, type, row) {
          if (data.usuariostatus == "1") {
            let template = "";
            template = `<span class="mode mode_done">activo</span>`;
            return template;
          } else {
            return `<span class="mode mode_off">Desactivado</span>`;
          }
        },
      },
      // { data: 'office' }
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button  key_user="${data.id_usuario}" class="btnLotes default" id="edit_usuario">
          <ion-icon name="create-outline"></ion-icon>
          </button>
             <button class="bg-red-100 text-red-500 border border-red-500 px-2 py-1 font-bold text-sm rounded flex items-center gap-1" keyUsuario=${data.id_usuario} id="remove-usuario"><ion-icon name="trash-outline"></ion-icon> Desactivar</button>
            </ul>
        
          </div>`;
        },
      },
    ],
  });
  $("#sedesList").on("change", function (e) {
    let sede_id = e.target.value;
    console.log(sede_id);
    let filter_usuarios;
    if (sede_id === "Todas") {
      filter_usuarios = usuariosArray;
    } else {
      filter_usuarios = usuariosArray.filter((u) => u.sede_id === sede_id);
    }
    pintar_usuarios(filter_usuarios);
  });
  function pintar_usuarios(usuarios) {
    dataTable.clear().rows.add(usuarios).draw();
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
  async function buscar_empresa_usuario() {
    //tanto los envios que salen de la sede, como los que llegan a la sede
    let funcion = "buscar_empresa_usuario";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
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
  function pintar_sedes(sedes) {
    let template = "";
    template += `
      <option value="" disabled>Selecione una sede</option>
      <option value="Todas">Todas</option>
      
      `;
    if (sedes.length > 0) {
      sedes.forEach((s) => {
        template += `
                  <option value="${s.id}">${s.name_reference} ${s.ciudad} ${s?.direccion}</option>
                  `;
      });
    }

    $("#sedesList").html(template);
  }
  function pintar_sedes_modal(sedes) {
    let template = "";
    template += `
      <option value="" disabled>Selecione una sede</option>
      
      `;
    if (sedes.length > 0) {
      sedes.forEach((s) => {
        template += `
                  <option value="${s.id}">${s.name_reference} ${s.ciudad} ${s?.direccion}</option>
                  `;
      });
    }

    $("#sedesListModal").html(template);
  }
  async function getRoles() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_roles";
      $.post(
        "../../controlador/UsuarioController.php",
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
  function pintar_roles(roles) {
    let template_roles = "";
    template_roles += `
    <option value="" disabled>Seleccione un rol para este usuario</option>
    
    `;
    roles.forEach((r) => {
      if (r.nombrerol !== "superadmin" && r.nombrerol !== "admin") {
        template_roles += `
        <option value="${r.id}">${r.nombrerol}</option>
        
        `;
      }
    });
    $("#rolesList").html(template_roles);
  }
  let roles = await getRoles();
  pintar_roles(roles);
  let empresa_user = await buscar_empresa_usuario();
  empresaId = empresa_user[0].id;
  var sedes_usuario = await buscar_sedes_by_usuario();

  pintar_sedes(sedes_usuario);
  pintar_sedes_modal(sedes_usuario);

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
  // ---------

  buscar_usuarios();

  // BUSCAR CLIENTES
  function buscar_usuarios() {
    funcion = "buscar_usuarios";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        if (response.trim() == "no-register") {
          usuariosArray = [];
        } else {
          const result = JSON.parse(response);
          const usuarios = result.reverse();
          usuariosArray = usuarios;
          dataTable.clear().rows.add(usuarios).draw();
        }
      }
    );
  }
  // buscar proeyectos
  async function buscar_proyectos(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_user";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const proyects = JSON.parse(response);
            resolve(proyects);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }

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
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function asignar_usuario_sede(usuario_id, sede_id) {
    let fecha_asigned = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
      let funcion = "asignar_usuario_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, usuario_id, sede_id, fecha_asigned },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
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
  async function buscar_proyectos_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          let template = "";
          if (response.trim() == "no-register") {
            proyectosList = [];
            resolve([]);
          } else {
            const proyectos = JSON.parse(response);
            proyectosList = proyectos;
            resolve(proyectos);
          }
        }
      );
    });
  }
  var proyectos_admin = await buscar_proyectos_admin();

  $("#add-user-form").click(async () => {
    funcion = "add_user_asesor";
    let empresa_id = empresaId;
    let documento = $("#documento-modal").val();
    let sede_id = $("#sedesListModal").val();
    let rol_id = $("#rolesList").val();
    let nombres = $("#nombres-modal").val();
    let apellidos = $("#apellidos-modal").val();
    let correo = $("#correo-modal").val();
    let phone = $("#phone-modal").val();
    let username = $("#username-modal").val();
    let password = $("#password-modal").val();
    if (nombres !== "undefined" && nombres && phone && username && password) {
      let send_usuario = await registrar_usuario(
        documento,
        nombres,
        apellidos,
        correo,
        phone,
        username,
        password,
        rol_id
      );
      if (send_usuario[0].msg === "exist-user") {
        add_toast(
          "warning",
          "El nombre de usuario existe, porfavor cambie por otro nombre de usuario"
        );
      } else {
        if (send_usuario[0].msg === "add-user") {
          let send_user_empresa = await registrar_usuario_empresa(
            send_usuario[0].usuario_id,
            empresa_id
          );
          if (send_user_empresa[0].msg === "add-business") {
            let send_user_sede = await asignar_usuario_sede(
              send_usuario[0].usuario_id,
              sede_id
            );
            if (send_user_sede.msg === "add-asigned") {
              // let proyectos_sede = proyectosList
              //   .filter((p) => p.sede_id === sede_id)
              //   .map((p) => ({
              //     id: proyecto.id,
              //   }));
              // let send_proyectos = asignar_proyectos_usuario(
              //   send_usuario[0].usuario_id,
              //   proyectos_sede
              // );
              buscar_usuarios();
              reset_form_usuario();
              add_toast("success", "Se creo el usuario asesor");

              $("#crear-users .form-create").removeClass("modal-show");
              setTimeout(() => {
                $("#crear-users").addClass("md-hidden");
              }, 300);
            }
          }
        } else {
          console.log(send_usuario[0].error);
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
      if (phone == "") {
        template += `Falta llenar el numero de telefono para link \n`;
      }
      alert(template);
    }
  });
  var datatablesProyects = $("#proyectsAsigned").DataTable({
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
        <p>${data.nombreProyecto}</p>
        `;
        },
      },
      { data: "asignado_usuario" },
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
              <li><button class="dropdown-item" id="no-asigned_user" key_proyect=${data.id}>- Quitar usuario</button></li>
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
  $(document).on("click", "#no-asigned_user", function () {
    let proyecto = $(this).attr("key_proyect");
    let funcion = "removed_asigned_user";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_usuario: idCliente, id_proyecto: proyecto },
      async (response) => {
        if (response.trim() === "remove-asigned") {
          alert("se quito la asignacion a este proyecto");
          const proyectos = await buscar_proyectos(idCliente);
          console.log(proyectos);
          let template;
          // let template = `<option value="" selected></option>`;
          let proyectsAsigned = [];
          proyectos.forEach((proyect) => {
            let option = `<option value=${proyect.id}>${proyect.nombreProyecto}</option>`;
            if (proyect.asignado_usuario === "Asignado") {
              proyectsAsigned.push(proyect);
              option = `<option value=${proyect.id} disabled>${proyect.nombreProyecto}</option>`;
            }
            template += option;
          });
          datatablesProyects.clear().rows.add(proyectsAsigned).draw();

          $(".users_proyect").html(template);
        } else {
          alert("Ocurrioi un error contacta al administrador");
          console.log(response);
        }
      }
    );
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
    $("#phone-modal-edit").val(result.phone_number);
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
    const user_phone = $("#phone-modal-edit").val();
    const data_user = {
      user_documento: Number(user_documento),
      user_nombres,
      user_apellidos,
      user_correo,
      user_phone,
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

  // ASIGNAR PROYECTOS
  $(document).on("click", "#asigned_proyect", async function () {
    let id_cliente = $(this).attr("key_asesor");
    idCliente = id_cliente;
    console.log(id_cliente);
    const result = usuariosArray.find(
      (elemento) => elemento.id_usuario === id_cliente
    );
    console.log(result);
    //
    try {
      const proyectos = await buscar_proyectos(id_cliente);
      console.log(proyectos);
      let template;
      // let template = `<option value="" selected></option>`;
      let proyectsAsigned = [];
      proyectos.forEach((proyect) => {
        let option = `<option value=${proyect.id}>${proyect.nombreProyecto}</option>`;
        if (proyect.asignado_usuario === "Asignado") {
          proyectsAsigned.push(proyect);
          option = `<option value=${proyect.id} disabled>${proyect.nombreProyecto}</option>`;
        }
        template += option;
      });
      datatablesProyects.clear().rows.add(proyectsAsigned).draw();

      $(".users_proyect").html(template);
      $(".users_proyect").select2({
        allowClear: true,
        placeholder: "Selecciona un Proyecto",
      });

      $("#nombre_user").html(
        result.nombre +
          " " +
          (result.apellido !== "" && result.apellido !== null
            ? result.apellido
            : "")
      );
      $("#modal-asigned").removeClass("md-hidden");
      setTimeout(function () {
        $("#modal-asigned .form-create").addClass("modal-show");
      }, 10);
    } catch (error) {
      console.log(error);
    }
    //
    $("#asigned_proyects").removeClass("md-hidden");
    setTimeout(function () {
      $("#asigned_proyects .form-create").addClass("modal-show");
    }, 10);
  });
  $("#update-asigned-form").click(() => {
    funcion = "add_user_proyect";
    let proyectos = $("#proyect-user").val();
    const id = idCliente;

    console.log(proyectos);
    console.log(idCliente);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, proyectos, id },
      (response) => {
        console.log(response);
        if (response.trim() == "add-user-proyects") {
          alert("Se asigno proyectos al usuarios");
          $("#asigned_proyects").addClass("md-hidden");
          setTimeout(function () {
            $("#asigned_proyects .form-create").removeClass("modal-show");
          }, 10);
        } else {
          alert("No se asigno, contacta al administrador");
        }
      }
    );
  });

  // SHOW MODAL CREATE
  $("#create-clients").click(() => {
    $("#crear-users").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-users .form-create").addClass("modal-show");
    }, 10);
  });
  $("#crear-users .close-modal").click(() => {
    $("#documento-modal").attr("disabled", "true");
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    $("#crear-users .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#crear-users").addClass("md-hidden");
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
    $("#modal-edit-user .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-edit-user").addClass("md-hidden");
    }, 300);
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
