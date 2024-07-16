var carrito = [];
var bandera = 0;
var productos = [];

function sumar_total_precio() {
  console.log("suma_total");
  let suma = 0;
  for (let index = 0; index < carrito.length; index++) {
    suma = suma + Number(carrito[index]["precio"] * carrito[index]["cantidad"]);
  }
  console.log(suma);
  $("#total-price-product").html(`S/${suma.toFixed(2)}`);
}
function actualizar_registro() {
  let template = "";
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      let subtotal = Number(producto.cantidad) * Number(producto.precio);
      let precio = Number(producto.precio);
      template += `
      <div class="card_producto">        
      <p class="deleted_product"><button id="deleted_register_cart" key_producto="${
        producto.id
      }" class="btn-remove">-</button></p>
      <p>${producto.nombre}</p>
      <p>S/${precio.toFixed(2)}</p>
      <p>${producto.cantidad}</p>
      <p>S/${subtotal.toFixed(2)}</p>
      </div>
    `;
      console.log(producto.cantidad, producto.precio);
      console.log(3 * 1.2);
    });
  } else {
    template += ``;
  }
  $("#list_campos").html(template);
  sumar_total_precio();

  // AL DARLE EN QUITAR SE ELIMINAR EL CARRITO

  $(".deleted_product>button").click((e) => {
    let id = $(e.target).attr("key_producto");
    console.log(id);
    for (let index = 0; index < carrito.length; index++) {
      if (carrito[index]["id"] == id) {
        carrito.splice(index, 1);
        console.log(carrito);
        actualizar_registro();
        sumar_total_precio();
      }
    }
  });
}

$("#guardar_venta").click((e) => {
  funcion = "registrar_ventas_productos";
  let option = $("[type='radio']:checked").val();

  if (carrito.length > 0 && option >= 0) {
    let id_reserva = $("#reserva_key").attr("key_reserva");

    console.log(id_reserva);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, carrito, id_reserva, option },
      (response) => {
        console.log(response);
        if (response.trim() == "add-producto") {
          alert("Venta realizada correctamente");
          $("input[type=radio]").prop("checked", false);
          carrito.length = 0;
          actualizar_registro();
        }
      }
    );
  } else {
    if (carrito.length == 0) {
      alert("Carrito vacio, no se puede registrar venta");
    } else {
      alert("Seleccion un metodo de pago ");
    }
  }
});

$("#add-carrito").click(() => {
  let name_producto = $("#carrito_producto option:selected").text();
  let key_producto = $("#carrito_producto").val();
  let cantidad = $("#carrito_cantidad").val();
  let precio = $("#carrito_precio").val();
  if (key_producto > 0) {
    if (name_producto && cantidad && precio) {
      let json_producto = {
        id: key_producto,
        nombre: name_producto,
        precio: precio,
        cantidad: cantidad,
      };
      let bandera_encontro = false;
      let indice_encontro = 0;
      if (bandera == 0) {
        carrito.push(json_producto);
        bandera++;
      } else {
        for (let index = 1; index <= carrito.length; index++) {
          if (carrito[index - 1]["id"] == key_producto) {
            bandera_encontro = true;
            indice_encontro = index - 1;
          }
        }

        if (bandera_encontro == true) {
          carrito[indice_encontro]["cantidad"] =
            Number(carrito[indice_encontro]["cantidad"]) + Number(cantidad);
        } else {
          carrito.push(json_producto);
        }
      }
      console.log(carrito);
      actualizar_registro();
      sumar_total_precio();
    }
  } else {
    alert("Seleccione un producto para agregar a la cesta");
  }
});
