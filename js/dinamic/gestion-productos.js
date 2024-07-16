$(document).ready(function () {
  var funcion = "";
  buscar_productos();

  // BUSCAR PRODUCTOS
  function buscar_productos() {
    funcion = "buscar_productos";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "no-create-products") {
          template += "No existen registros de productos";
        } else {
          const productos = JSON.parse(response);
          productos.forEach((producto) => {
            template += `
                <div class="card-product">
                <p class="campo_tabla">${producto.nombre}
                </p>
                <p class="campo_tabla">s/${Number(producto.precio).toFixed(
                  2
                )}</p>
                <p class="campo_tabla">${producto.inventario} und</p>
                <div class="actions-button-products">
                    <button class="btn-edit" id="edit_product">
                        <ion-icon name="pencil-sharp"  key_product="${
                          producto.id_productos
                        }"></ion-icon>
                    </button>
                    <button class="btn-remove" id="remove_product">
                    <i class="fas fa-trash-alt"  key_product="${
                      producto.id_productos
                    }"></i>
                    </button>
                </div>
            </div>
                `;
          });
        }

        $("#productos-body-table").html(template);
      }
    );
  }

  //   CREATE PRODUCTOS
  $("#add-producto-form").click((e) => {
    funcion = "crear_productos";
    e.preventDefault();

    let nombre = $("#producto-nombre").val();
    let precio = $("#producto-precio").val();
    let inventario = $("#producto-inventario").val();

    if ((nombre, precio, inventario)) {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, precio, inventario },
        (response) => {
          alert("Producto agregado correctamente");
          $("#producto-nombre").val("");
          $("#producto-precio").val("");
          $("#producto-inventario").val("");
          buscar_productos();
        }
      );
    } else {
      alert("te faltan llenar campos en el formulario");
    }

    // let file = new FormData($("#form_producto_add")[0]);
    // $.ajax({
    //   url: "../../controlador/UsuarioController.php",
    //   type: "POST",
    //   data: file,
    //   cache: false,
    //   processData: false,
    //   contentType: false,
    // }).done(function (response) {
    //   if (response.trim() == "no_format_imagen") {
    //     alert(
    //       "No se admite este tipo de formato, revisa si la imagen es: jpg, jpeg, png"
    //     );
    //   } else {
    //     console.log("imagen subida con exito");
    //   }
    // });
  });

  // REMOVE PRODUCTOS
  $(document).on(
    "click",
    ".actions-button-products .btn-remove#remove_product",
    (e) => {
      funcion = "borrar_producto";
      let id_producto = $(e.target).attr("key_product");
      console.log(id_producto);
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_producto },
        (response) => {
          console.log(response);
          if (response.trim() == "remove-producto") {
            buscar_productos();
          } else {
            alert("No se pudo eliminar el producto");
          }
        }
      );
    }
  );
  //  EDIT PRODUCTOS POR ACTION BUTTON EDIT
  $(document).on(
    "click",
    ".actions-button-products .btn-edit#edit_product",
    (e) => {
      $("#modal-edit-product").removeClass("md-hidden");
      funcion = "buscar_producto_id";
      let id_producto = $(e.target).attr("key_product");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_producto },
        (response) => {
          const producto = JSON.parse(response);
          producto.forEach((element) => {
            $("#modal-edit-product").attr(
              "key_producto",
              `${element.id_productos}`
            );
            $("#modal-edit-product #producto-nombre").val(`${element.nombre}`);
            $("#modal-edit-product #producto-precio").val(`${element.precio}`);
            $("#modal-edit-product #producto-inventario").val(
              `${element.inventario}`
            );
          });
        }
      );
    }
  );
  // EDIT PRODUCTOS POR ACTION DE ACTUALIZAR CLIENTE
  $(document).on("click", "#update-producto-form", (e) => {
    funcion = "edit_producto";
    let id_producto = $("#modal-edit-product").attr("key_producto");
    let nombre = $("#modal-edit-product #producto-nombre").val();
    let precio = $("#modal-edit-product #producto-precio").val();
    let inventario = $("#modal-edit-product #producto-inventario").val();
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_producto, nombre, precio, inventario },
      (response) => {
        if (response.trim() == "update-producto") {
          buscar_productos();
          alert("Producto actualizado correctamente");
          $("#modal-edit-product").addClass("md-hidden");

          $("#modal-edit-product #producto-nombre").val("");
          $("#modal-edit-product #producto-precio").val("");
          $("#modal-edit-product #producto-inventario").val("");
        } else {
          alert(
            "No se pudo actualizar el producto, revise conexion a internet"
          );
        }
      }
    );
  });

  // MODAL SHOW CREATE
  $("#create-productos").click(() => {
    $("#modal-create-product").removeClass("md-hidden");
  });
  $(".close-modal").click(() => {
    $("#modal-create-product").addClass("md-hidden");

    $("#modal-create-product #producto-nombre").val("");
    $("#modal-create-product #producto-precio").val("");
    $("#modal-create-product #producto-inventario").val("");
  });
  $("#modal-create-product #cancel-form").click(() => {
    $("#modal-create-product").addClass("md-hidden");

    $("#modal-create-product #producto-nombre").val("");
    $("#modal-create-product #producto-precio").val("");
    $("#modal-create-product #producto-inventario").val("");
  });
  // MODAL SHOW EDIT
  $("#modal-edit-product .close-modal").click(() => {
    $("#modal-edit-product").addClass("md-hidden");

    $("#modal-edit-product #producto-nombre").val("");
    $("#modal-edit-product #producto-precio").val("");
    $("#modal-edit-product #producto-inventario").val("");
  });
  $("#modal-edit-product #cancel-form").click(() => {
    $("#modal-edit-product").addClass("md-hidden");

    $("#modal-edit-product #producto-nombre").val("");
    $("#modal-edit-product #producto-precio").val("");
    $("#modal-edit-product #producto-inventario").val("");
  });

  // FIN DE MODAL SHOW

  // FIN DE CREATE PRODCUTOS
});
