$(document).ready(function () {
  var funcion = "";
  var usuariosArray = [];
  var idCliente = "";
  buscar_usuarios();

  // BUSCAR CLIENTES
  function buscar_usuarios() {
    funcion = "buscar_usuarios_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "no-register-clientes") {
          template += "No hay registros de clientes";
        } else {
          console.log(response);
          const result = JSON.parse(response);
          const usuarios = result.reverse();
          $("#usuariosList").DataTable({
            pageLength: 5,
            aoColumnDefs: [
              {
                bSortable: false,
                aTargets: ["nosort"],
              },
            ],
            data: usuarios,
            order: false,
            bLengthChange: false,
            dom: '<"top">ct<"top"p><"clear">',
            columns: [
              { data: "id_usuario" },
              {
                data: null,
                render: function (data, type, row) {
                  return data.nombre + " " + data.apellido;
                },
              },
              { data: "user" },
              { data: "dni" },
              { data: "correo" },
              { data: "creator" },
              // { data: 'office' }
              {
                data: null,
                render: function (data, type, row) {
                  return `
                    <div class="flex-actions">
                    <button  key_user="${data.id_usuario}" class="btnLotes default" id="edit_usuario">
                    <ion-icon name="create-outline"></ion-icon>
                    </button>
                    <div class="dropdown">
                    <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#" key_proyect=${data.id_usuario}>+ Asigar agentes</a></li>
                      <li><a class="dropdown-item" href="#"><ion-icon key_hab=${data.id_usuario} id="remove-hab" name="trash-outline"></ion-icon> Eliminar Usuario</a></li>
                    </ul>
                  </div>
                    </div>`;
                },
              },
            ],
          });
          usuariosArray = usuarios;
          usuarios.forEach((usuario) => {
            template += `
                      <tr>
                      <td class="campo_tabla">${usuario.id_usuario}
                      </td>
                      <td class="campo_tabla">${usuario.nombre} ${
              usuario.apellido === null ? "" : usuario.apellido
            }
                      </td>
                      <td class="campo_tabla">${usuario.user}
                      </td>
                      <td class="campo_tabla">${
                        usuario.dni === "0" ? "sin agregar" : usuario.dni
                      }</p>
                      <td class="campo_tabla">${
                        usuario.correo === null ? "sin agregar" : usuario.correo
                      }</p>
                      <td class="campo_tabla">${usuario.creator}</p>
                      <td>
                          <button  key_user="${
                            usuario.id_usuario
                          }" class="btnJsvm default" id="edit_usuario">
                              <ion-icon name="pencil-sharp"></ion-icon>
                          </button>
                          <button key_user="${
                            usuario.id_usuario
                          }" class="btnJsvm danger" id="remove_usuario">
                              <ion-icon  name="trash-sharp"></ion-icon>
                          </button>
                      </td>
                  </tr>
                      `;
          });
        }
        $("#clientes-body-table").html(template);
      }
    );
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

  $("#add-user-form").click(() => {
    funcion = "add_user";
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    let apellidos = $("#apellidos-modal").val();
    let correo = $("#correo-modal").val();
    let username = $("#username-modal").val();
    let password = $("#password-modal").val();
    if (nombres !== "undefined" && nombres && username && password) {
      let cen = 1;
      if (cen == 1) {
        $.post(
          "../../controlador/UsuarioController.php",
          {
            funcion,
            documento,
            nombres,
            apellidos,
            correo,
            username,
            password,
          },
          (response) => {
            if (response.trim() == "add-cliente") {
              alert("Cliente agregado correctamente");
              buscar_usuarios();
              $("#documento-modal").val("");
              $("#nombres-modal").val("");
              $("#apellidos-modal").val("");
              $("#correo-modal").val("");
              $("#username-modal").val("");
              $("#password-modal").val("");
              $(".modal-create").addClass("md-hidden");

              //   $("#documento-modal").val("");
              //   $("#nombres-modal").val("");
            } else {
              if (response.trim() == "Existe el usuario") {
                alert(
                  "El usuario ya esta registrado en la base de datos, puede eliminarlo o editarlo para luego agregarlo"
                );
              } else {
                alert(
                  "No se pudo agregar el usuario, revise conexion o consulte a tecnico encargado"
                );
                console.log(response);
              }
            }
          }
        );
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

  // REMOVE PRODUCTOS
  $(document).on("click", "#remove_usuario", function () {
    let id_cliente = $(this).attr("key_user");
    idCliente = id_cliente;
    console.log(id_cliente);
    $(".confirm-popup").removeClass("md-hidden");
    setTimeout(function () {
      $(".confirm-popup .formConfirm").addClass("modal-show");
    }, 10);
  });

  $("#cancelConfirm").click(() => {
    setTimeout(function () {
      $(".confirm-popup .formConfirm").removeClass("modal-show");
    }, 10);
    $(".confirm-popup").addClass("md-hidden");
  });
  $("#okConfirm").click(() => {
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
          setTimeout(function () {
            $(".confirm-popup .formConfirm").removeClass("modal-show");
          }, 10);
          $(".confirm-popup").addClass("md-hidden");
          buscar_usuarios();
        } else {
          console.log("error");
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
    $("#documento-modal-edit").val(result.dni !== 0 ? "" : result.dni);
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
    $(".modal-create").removeClass("md-hidden");
    setTimeout(function () {
      $(".modal-create .form-create").addClass("modal-show");
    }, 10);
  });
  $(".form-create .close-modal").click(() => {
    $("#documento-modal").attr("disabled", "true");
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

  $("#cancel-form").click(() => {
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
