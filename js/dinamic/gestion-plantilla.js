$(document).ready(function () {
  var funcion = "";
  var listMsg;
  var idPlantilla;
  var dataTable = $("#msgList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],

    columns: [
      { data: "id" },
      { data: "nombre" },
      {
        data: null,
        render: function (data) {
          return `<div class="max-w-[200px] overflow-x-hidden">
              <p class="text-ellipsis overflow-hidden text-nowrap">${data.mensaje}</p>
            </div>`;
        },
      },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     return `
      //     <a target="_blank" href="../../${data.imgUrl}">
      //     <ion-icon name="cloud-done-outline"></ion-icon> Ver
      //     archivo
      //     </a>`;
      //   },
      // },
      {
        data: null,
        render: function (data, type, row) {
          // <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
          return `
            <div class="flex-actions">
            <button target="_blank" keyMsg="${data?.id}" id="editMsg" class="btnJsvm warning"><ion-icon name="create"></ion-icon></button>
            <button target="_blank" keyMsg="${data?.id}" id="deleteMsg" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
            </div>
  
            `;
        },
      },
    ],
    // columnDefs: [{ type: "date-dd-mm-yyyy", aTargets: [5] }],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });
  $("#message-plantilla").on("keyup", function () {
    let value = $(this).val();

    $("#preview-insert-text").text(value);
    console.log(value);
  });
  $("#message-plantilla-edit").on("keyup", function () {
    let value = $(this).val();

    $("#preview-insert-text-edit").text(value);
    console.log(value);
  });
  buscar_msg();
  function buscar_msg() {
    let funcion = "buscar_msg_template";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        $("#spin-load").html("");
        let msg;
        if (response.trim() !== "no-register") {
          msg = JSON.parse(response);
          listMsg = msg;
        } else {
          msg = [];
        }
        dataTable.clear().rows.add(msg).draw();
      }
    );
  }
  $(document).on("click", "#deleteMsg", function () {
    const idMsg = $(this).attr("keyMsg");
    let confirmado = confirm("Esta seguro de eliminar el mensaje");
    if (confirmado) {
      let funcion = "delete_msg_plantilla";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id: idMsg },
        (response) => {
          if (response.trim() === "delete-msg") {
            buscar_msg();
            alert("Se elimino correctamente la plantilla");
          } else {
            alert("Hubo un error contacta al administrador");
          }
        }
      );
    }
  });
  $(document).on("click", "#editMsg", function () {
    const idMsg = $(this).attr("keyMsg");
    console.log(idMsg);
    idPlantilla = idMsg;
    let plantilla = listMsg.find((m) => m.id === idMsg);
    console.log(plantilla);
    $("#name-message-edit").val(plantilla.nombre);
    $("#message-plantilla-edit").val(plantilla.mensaje);
    $("#preview-insert-text-edit").text(plantilla.mensaje);
    $("#editar-plantilla").removeClass("md-hidden");
    setTimeout(() => {
      $("#editar-plantilla .form-create").addClass("modal-show");
    }, 10);
  });
  $("#editar-plantilla .close-modal").click(function () {
    $("#editar-plantilla .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#editar-plantilla").addClass("md-hidden");
    }, 300);
  });
  $(document).on("click", "#emojiList li", function () {
    let emoji = $(this).html();
    console.log(emoji);
    let text = $("#message-plantilla").val();
    const mensajeTextarea = document.getElementById("message-plantilla");
    const cursorPos = mensajeTextarea.selectionStart;
    const newContent =
      text.substring(0, cursorPos) + emoji + text.substring(cursorPos);
    // text = text + emoji;
    $("#message-plantilla").val(newContent);
    $("#preview-insert-text").text(newContent);
    $("#emojiSelector").toggleClass("hidden");
  });
  $(document).on("click", "#emojiListEdit li", function () {
    let emoji = $(this).html();
    console.log(emoji);
    let text = $("#message-plantilla-edit").val();
    const mensajeTextarea = document.getElementById("message-plantilla-edit");
    const cursorPos = mensajeTextarea.selectionStart;
    const newContent =
      text.substring(0, cursorPos) + emoji + text.substring(cursorPos);

    $("#message-plantilla-edit").val(newContent);
    $("#preview-insert-text-edit").text(newContent);
    $("#emojiSelectorEdit").toggleClass("hidden");
  });
  $("#active-created").click(function () {
    $("#crear-plantilla").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-plantilla .form-create").addClass("modal-show");
    }, 10);
  });
  $("#created-submit-msj").click(function () {
    let funcion = "register-msg";
    let nombre = $("#name-message").val();
    let msg = $("#message-plantilla").val();

    if (nombre !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, msg },
        (response) => {
          console.log(response);
          if (response.trim() === "add-msg") {
            alert("Se creo correctamente la plantilla");
            $("#name-message").val("");
            $("#message-plantilla").val("");
            buscar_msg();
          } else {
            alert("Hubo un error, conatcta al administrador");
          }
        }
      );
    } else {
      alert("Te faltan llenar los campos del formulario");
    }
  });
  $("#edit-submit-msj").click(function () {
    let funcion = "edit-msg-plantilla";
    let nombre = $("#name-message-edit").val();
    let msg = $("#message-plantilla-edit").val();

    if (nombre !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, msg, id: idPlantilla },
        (response) => {
          console.log(response);
          if (response.trim() === "edit-msg") {
            alert("Se actualizo correctamente la plantilla");
            $("#name-message-edit").val("");
            $("#message-plantilla-edit").val("");
            buscar_msg();
            $("#editar-plantilla .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#editar-plantilla").addClass("md-hidden");
            }, 300);
          } else {
            alert("Hubo un error, conatcta al administrador");
          }
        }
      );
    } else {
      alert("Te faltan llenar los campos del formulario");
    }
  });
  $("#crear-plantilla .close-modal").click(function () {
    $("#crear-plantilla .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-plantilla").addClass("md-hidden");
    }, 300);
  });

  // gestion droplist sortable
  // const sortableList = document.querySelector(".sortable-list");
  // const items = sortableList.querySelectorAll(".item");
  // items.forEach((item) => {
  //   item.addEventListener("dragstart", () => {
  //     // Adding dragging class to item after a delay
  //     setTimeout(() => item.classList.add("dragging"), 0);
  //   });
  //   // Removing dragging class from item on dragend event
  //   item.addEventListener("dragend", () => item.classList.remove("dragging"));
  // });
  // const initSortableList = (e) => {
  //   // e.preventDefault();
  //   const draggingItem = document.querySelector(".dragging");
  //   // Getting all items except currently dragging and making array of them
  //   let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  //   // Finding the sibling after which the dragging item should be placed
  //   let nextSibling = siblings.find((sibling) => {
  //     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  //   });
  //   // Inserting the dragging item before the found sibling
  //   sortableList.insertBefore(draggingItem, nextSibling);
  // };
  // sortableList.addEventListener("dragover", initSortableList);
  // sortableList.addEventListener("dragenter", (e) => e.preventDefault());
});
