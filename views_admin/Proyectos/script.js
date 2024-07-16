// Array para almacenar amenidades
var idAmenidad;
var amenidadactive;
var amenidades = [];
var amenidadesChange = [];
var idProyecto;
// Función para mostrar el modal de iconos
$("#btnAgregarAmenidad").click(function () {
  $("#modalIconos").removeClass("hidden");
});
// change setting logo y galery
$(document).on("click", "#change_settings", function () {
  var id = $(this).attr("key");
  idProyecto = id;
  amenidades = [];
  buscar_amenidades();
});
// Función para seleccionar un ícono
$(".icono").click(function () {
  $(".icono").removeClass("border-[#38a169]");
  $(".icono").removeClass("selected-icon");
  $(this).addClass("border-[#38a169]");
  $(this).addClass("selected-icon");
});

// Función para continuar al modal de nombre de amenidad
$("#btnContinuarIconos").click(function () {
  $("#modalIconos").addClass("hidden");
  $("#modalNombreAmenidad").removeClass("hidden");
});
$("#btnCancelarIconos").click(function () {
  $("#modalIconos").addClass("hidden");
  reiniciarModalIconos();
});
$("#cancelarIconoEditado").click(function () {
  $("#modalEditarIcono").addClass("hidden");
});
$("#btnRegresarIconoAmenidad").click(function () {
  $("#modalNombreAmenidad").addClass("hidden");
  $("#modalIconos").removeClass("hidden");
});
function verificarCambios() {
  console.log(amenidades, amenidadesChange);
  if (JSON.stringify(amenidadesChange) !== JSON.stringify(amenidades)) {
    $("#changeBtn").removeClass("hidden");
  } else {
    $("#changeBtn").addClass("hidden");
  }
}

// Función para guardar la amenidad
$("#btnGuardarAmenidad").click(function () {
  // Obtener el nombre del ícono seleccionado y el nombre de la amenidad
  var iconoSeleccionado = $(".selected-icon").data("icon");
  var nombreAmenidad = $("#inputNombreAmenidad").val();

  // Validar que se haya seleccionado un ícono y se haya ingresado un nombre
  if (iconoSeleccionado && nombreAmenidad) {
    // Crear un objeto JSON con la información
    var nuevaAmenidad = {
      icono: iconoSeleccionado,
      nombre: nombreAmenidad,
      activo: true,
    };
    let id_proyecto = idProyecto;
    console.log(id_proyecto);
    let funcion = "subir_amenidades";
    const jsonData = JSON.stringify([nuevaAmenidad]);
    console.log(jsonData);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: id_proyecto, amenidades: jsonData },
      (response) => {
        add_toast("success", "Se creo correctamente la amenidad");
        console.log(response);
        // Agregar la amenidad al array
        amenidadesChange.push(nuevaAmenidad);

        // Mostrar amenidades en la interfaz
        buscar_amenidades();

        // Cerrar el modal de nombre de amenidad
        $("#modalNombreAmenidad").addClass("hidden");

        // Reiniciar el modal de iconos y el input de nombre
        reiniciarModalIconos();
        $("#inputNombreAmenidad").val("");
      }
    );
  } else {
    add_toast(
      "warning",
      "Por favor, selecciona un ícono y proporciona un nombre para la amenidad."
    );
  }
});
// Función para mostrar amenidades en la interfaz
function mostrarAmenidades() {
  var amenidadesList = $("#amenidadesList");
  amenidadesList.empty(); // Limpiar la lista antes de mostrar las amenidades

  amenidadesChange.forEach(function (amenidad, index) {
    var listItem = $(`<li class="flex items-center gap-3">`).html(`
      <img
      class="w-[40px] icono-amenidad"
      src="../../imagenes/amenidades/${amenidad.icono}.png"
      alt="${amenidad.icono}"
    />
            <input disabled="true" type="text" class="nombre-amenidad border bg-gray-200 rounded px-3 py-2 text-sm" value="${amenidad.nombre}" data-index="${index}">
            <span data-id="${amenidad.id}" class="editar-btn bg-yellow-300 flex items-center gap-3 rounded p-2 cursor-pointer text-sm" data-index="${index}"><ion-icon name="create"></ion-icon></span>
            <span data-id="${amenidad.id}" class="eliminar-btn bg-red-600 text-white rounded p-2 flex items-center gap-3 text-sm" data-index="${index}"><ion-icon name="trash"></ion-icon></span>
        `);
    amenidadesList.append(listItem);

    // Agregar evento de cambio para el input de nombre
    listItem.find(".nombre-amenidad").on("change, keyup", function () {
      var newIndex = $(this).data("index");
      editarAmenidad(newIndex, $(this).val());
    });
  });

  // Agregar evento de clic para el botón de eliminar
  $(".eliminar-btn").click(function () {
    var index = $(this).data("index");
    console.log(index);
    eliminarAmenidad(index);
  });
}
function buscar_amenidades() {
  let funcion = "buscar_amenidades";
  $.post(
    "../../controlador/UsuarioController.php",
    { funcion, id: idProyecto },
    (response) => {
      // console.log(response);
      if (response.trim() !== "no-register-amenidades") {
        amenidades = JSON.parse(response);
        amenidadesChange = JSON.parse(response);
        console.log(amenidades);
        mostrarAmenidades();
      } else {
        amenidades = [];
        $("#amenidadesList").html("");
      }
    }
  );
}

// subir cambios
$("#subirCambiosAmenidades").click(function () {
  console.log(amenidades);
  let cambiosChange = [];
  // se agrego o se elimino de la lista original?

  if (amenidades.length > 0) {
    let id_proyecto = idProyecto;
    console.log(id_proyecto);
    let funcion = "subir_amenidades";
    const jsonData = JSON.stringify(amenidades);
    console.log(jsonData);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: id_proyecto, amenidades: jsonData },
      (response) => {
        console.log(response);
      }
    );
  }
});
$("#cancelarCambiosAmenidades").click(function () {
  amenidadesChange = [];
  amenidadesChange = amenidades.map((a) => ({ ...a }));
  mostrarAmenidades();
  verificarCambios();
});
// cancelar cambios

// Función para editar el nombre de una amenidad
function editarAmenidad(index, nuevoNombre) {
  amenidadesChange[index].nombre = nuevoNombre;
  verificarCambios();
}

// Función para eliminar una amenidad del array
function eliminarAmenidad(index) {
  let amenidad_delete = amenidades[index];
  console.log(amenidad_delete.id);
  let funcion = "eliminar_amenidad";
  $.post(
    "../../controlador/UsuarioController.php",
    { funcion, id: amenidad_delete.id },
    (response) => {
      if (response.trim() === "delete-amenidad") {
        amenidadesChange.splice(index, 1);
        console.log(amenidadesChange);
        mostrarAmenidades();
        add_toast("success", "La amenidad se elimino correctamente");
      } else {
        console.log(response);
        add_toast("error", "Ocurrio un error al eliminar la amenidad");
      }
    }
  );
}

// Función para reiniciar el modal de iconos
function reiniciarModalIconos() {
  $(".selected-icon").removeClass("border-[#38a169]");
  $(".icono").removeClass("selected-icon");
}

// Función para mostrar el modal de editar icono
// $(document).on("click", ".icono-amenidad", function () {
//   var index = $(this).parent().find(".eliminar-btn").data("index");
//   var amenidad = amenidadesChange[index];
//   mostrarModalEditarIcono(amenidad.icono, index);
// });
$(document).on("click", ".editar-btn", function () {
  var id = $(this).attr("data-id");
  console.log(id);
  idAmenidad = id;
  const searchamenidad = amenidades.find((a) => a.id === idAmenidad);
  amenidadactive = { ...searchamenidad };
  console.log(amenidadactive);
  $("#iconoAmenidadEdit").attr(
    "src",
    `../../imagenes/amenidades/${amenidadactive.icono}.png`
  );
  $("#nombreAmenidadEdit").val(amenidadactive.nombre);
  $("#editarAmenidad").removeClass("hidden");
});
$("#cancelarEditAmenidad").click(function () {
  $("#editarAmenidad").addClass("hidden");
  amenidadactive = "";
  console.log(amenidadactive);
});
$("#saveEditAmenidad").click(function () {
  let funcion = "update_amenidad";
  $.post(
    "../../controlador/UsuarioController.php",
    { funcion, data: JSON.stringify(amenidadactive) },
    (response) => {
      if (response.trim() === "update-sucess") {
        add_toast("success", "Se actualizo correctamente la amenidad");
        amenidadactive = "";
        $("#editarAmenidad").addClass("hidden");
        buscar_amenidades();
      } else {
        add_toast("error", "Hubo un error, contacta al administrador");
      }
    }
  );
});
$("#iconoAmenidadEdit").click(function () {
  mostrarModalEditarIcono(amenidadactive.icono);
});
$("#nombreAmenidadEdit").on("change, keyup", function (e) {
  amenidadactive.nombre = e.target.value;
  console.log(amenidadactive);
  console.log(amenidades);
});
// Función para mostrar el modal de editar icono
function mostrarModalEditarIcono(iconoActual) {
  // Mostrar el modal de editar icono
  $("#modalEditarIcono").removeClass("hidden");

  // Limpiar la selección actual
  $(".icono-editar").removeClass("selected-icon");

  // Establecer el icono actual como seleccionado
  $(".icono-editar[data-icon='" + iconoActual + "']").addClass("selected-icon");

  // Manejar clic en un nuevo icono
  $(".icono-editar")
    .off("click")
    .on("click", function () {
      $(".icono-editar").removeClass("selected-icon");
      $(this).addClass("selected-icon");
    });

  // Manejar clic en "Guardar Cambios"
  $("#btnGuardarIconoEditado")
    .off("click")
    .on("click", function () {
      // Obtener el nuevo ícono seleccionado
      var nuevoIcono = $(".selected-icon").data("icon");

      // Validar que se haya seleccionado un ícono
      if (nuevoIcono) {
        // Actualizar el ícono en el array y en la interfaz
        amenidadactive.icono = nuevoIcono;
        console.log(amenidadactive);
        $("#iconoAmenidadEdit").attr(
          "src",
          `../../imagenes/amenidades/${amenidadactive.icono}.png`
        );
        $("#modalEditarIcono").addClass("hidden");
      } else {
        add_toast("warning", "Por favor, selecciona un ícono.");
      }
    });
}
