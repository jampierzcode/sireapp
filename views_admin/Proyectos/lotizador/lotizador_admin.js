$(document).ready(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  console.log("entro");
  var imageUrl;
  var dataClientesList;
  var listUsuariosSede;
  var lotesList;
  var asesoresList;
  var idLayer;
  var map1 = L.map("map1", {
    crs: L.CRS.Simple,
    minZoom: -4,
    maxZoom: 4,
    zoom: 0,
  });

  // obtener imagen y escalarla en el centro
  $.post(
    "../../../controlador/UsuarioController.php",
    { funcion: "buscar-imagen-proyect", id_proyect: id },
    (response) => {
      console.log(response);
      const image = JSON.parse(response);
      imageUrl = "../../../" + image[0].imgURL;
      console.log(imageUrl);

      var img = new Image();
      img.src = imageUrl;

      img.onload = function () {
        var imageWidth = this.width;
        var imageHeight = this.height;
        console.log(imageHeight, imageWidth);

        var imageBounds = [
          [0, 0],
          [imageHeight, imageWidth],
        ];

        var imageOverlay = L.imageOverlay(imageUrl, imageBounds);
        imageOverlay.addTo(map1);
        map1.fitBounds(imageBounds); // Ajustar los límites del mapa a la imagen
        setInterval(() => {
          $("#loading_lotizador").addClass("hidden");
        }, 2000);
      };
    }
  );
  await buscarLotes(id);
  var lotesPintados = [];
  async function buscarLotes(id) {
    let funcion = "buscar_lotes";
    $.post(
      "../../../controlador/UsuarioController.php",
      { funcion, id },
      (response) => {
        var template = "";
        if (response.trim() === "no-register") {
          template += `
            <button class="btnLotizador dragSquare">No hay lotes</button>          
            `;
          $("#listLotes").html(template);
          lotesList = [];
        } else {
          const lotes = JSON.parse(response);
          lotesList = lotes;
          selectLotes(lotes);
        }
      }
    );
  }
  function selectLotes(lotes) {
    map1.eachLayer(function (layer) {
      // Verificar si la capa es un rectángulo o un polígono
      if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        // Eliminar la capa del mapa
        map1.removeLayer(layer);
      }
    });
    lotes.map((lote) => {
      let fillColor;
      let fillOpacit;
      let estado;
      switch (lote.estado) {
        case "DISPONIBLE":
          fillColor = "#71bf44"; // Verde
          estado = "disponible";
          fillOpacit = 0.5;
          break;
        case "SEPARADO":
          fillColor = "#e8db49"; // Amarillo
          estado = "separado";
          fillOpacit = 0.5;
          break;
        case "OCUPADO":
          fillColor = "#FF0000"; // Rojo
          estado = "ocupado";
          fillOpacit = 0.5;
          break;
        case "SIN PUBLICAR":
          fillColor = "#eaeaea"; // Rojo
          estado = "sinpublicar";
          fillOpacit = 0.2;
          break;
        default:
          fillColor = "#a81318"; // Negro (color por defecto en caso de estado no válido)
      }

      // Definir el estilo del polígono con el color obtenido
      const estiloPoligono = {
        color: "#5b5b5b", // Color del borde (negro en este ejemplo)
        fillColor: fillColor, // Color de relleno según el estado del lote
        fillOpacity: fillOpacit, // Opacidad del fondo
        weight: 1,
      };
      // map1.clearLayers();
      let layer;
      if (lote.tipo === "rectangulo") {
        let bounds = [
          [lote.cordinates[0][0], lote.cordinates[0][1]],
          [lote.cordinates[1][0], lote.cordinates[1][1]],
        ];
        layer = L.rectangle(bounds, estiloPoligono).addTo(map1);
        layer.bindTooltip(
          `
        Manzana: ${lote.mz_zona} Lote: ${lote.numero} <br> Precio: ${lote.precio}  <br> Area: ${lote.area}
        
        `
        );
        layer.on("click", function () {
          let template = `
          Estado: <span key_status="${lote.estado}" class="status ${estado}" id="estado">${lote.estado}</span> <button id="editEstate">Editar</button>
          `;
          // Actualizar los valores en la tarjeta de HTML
          $("#manzana").text(lote.mz_zona);
          $("#lote").text(lote.numero);
          $("#lote").attr("key", lote.numero + lote.mz_zona);
          $("#lote").attr("numberKey", lote.id);
          $("#ancho").text(lote.ancho);
          $("#largo").text(lote.largo);
          $("#area").text(lote.area);
          $("#precio").text(lote.precio);
          $("#estadoLote").html(template);
          $(".container-edit-status").remove("md-hidden");
          $(".container-edit-status").addClass("md-hidden");
        });
      } else if (lote.tipo === "poligono") {
        layer = L.polygon(lote.cordinates, estiloPoligono).addTo(map1);
        layer.bindTooltip(
          `
        Manzana: ${lote.mz_zona} Lote: ${lote.numero}<br> Precio: ${lote.precio}  <br> Area: ${lote.area}
        
        `
        );
        layer.on("click", function () {
          let template = `
          Estado: <span key_status="${lote.estado}" class="status ${estado}" id="estado">${lote.estado}</span> <button id="editEstate">Editar</button>
          `;
          // Actualizar los valores en la tarjeta de HTML
          $("#manzana").text(lote.mz_zona);
          $("#lote").text(lote.numero);
          $("#lote").attr("key", lote.numero + lote.mz_zona);
          $("#lote").attr("numberKey", lote.id);
          $("#ancho").text(lote.ancho);
          $("#largo").text(lote.largo);
          $("#area").text(lote.area);
          $("#precio").text(lote.precio);
          $("#estadoLote").html(template);
          $(".container-edit-status").addClass("md-hidden");
        });
      }

      layer.options.id = lote.id;
      // Evento click derecho (contextmenu)
      layer.on("contextmenu", function (e) {
        console.log(e);
        let id = e.target.options.id;

        showContextMenu(e.originalEvent, layer, lote.estado);
      });
    });
  }
  function showContextMenu(event, layer, status) {
    // Eliminar cualquier menú contextual existente
    let existingMenu = document.getElementById("context-menu");
    if (existingMenu) {
      existingMenu.remove();
    }

    // Crear el menú contextual
    let menu = document.createElement("div");
    menu.id = "context-menu";
    menu.style.position = "absolute";
    menu.style.left = event.pageX + "px";
    menu.style.top = event.pageY + "px";
    menu.style.backgroundColor = "#fff";
    menu.style.border = "1px solid #ccc";
    menu.style.padding = "10px";
    menu.style.zIndex = 10000;
    let options;
    if (status !== "DISPONIBLE" && status !== "SIN PUBLICAR") {
      options = ["Informacion"];
    } else {
      options = ["Separar/Vender"];
    }
    // Añadir opciones al menú
    options.forEach((option) => {
      let item = document.createElement("div");
      item.innerText = option;
      item.style.padding = "5px";
      item.style.cursor = "pointer";
      item.onclick = function () {
        menuAction(option, layer);
      };
      menu.appendChild(item);
    });

    // Añadir el menú al cuerpo del documento
    document.body.appendChild(menu);

    // Cerrar el menú si se hace clic en cualquier otro lugar
    document.addEventListener("click", function closeMenu(event) {
      if (!menu.contains(event.target)) {
        menu.remove();
        document.removeEventListener("click", closeMenu);
      }
    });
  }

  async function menuAction(action, layer) {
    idLayer = layer.options.id;

    switch (action) {
      case "Informacion":
        // Implementar la lógica para duplicar el lote
        const searchinfo = await buscar_venta_lote(idLayer);

        if (searchinfo !== false) {
          let data = searchinfo;
          console.log(data);
          let rol;
          switch (Number(data.usuariorol)) {
            case 2:
              rol = "admin";
              break;
            case 3:
              rol = "asesor";
              break;
            case 4:
              rol = "cajero";
              break;
            case 5:
              rol = "colaborador";
              break;

            default:
              break;
          }
          let template = "";
          template += ` <div class="w-full">
                        <h2 class="text-sm font-bold">Cliente</h2>
                        <p>${data.nombres} ${data.apellidos}</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Tipo de Venta</h2>
                        <p>${data.tipo}</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Fecha de registro</h2>
                        <p>${dayjs(data.fecha_venta).format(
                          "DD [de] MMMM [del] YYYY"
                        )}</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Registrado por</h2>
                        <p>${data.nombre_user} ${
            data.apellido_user
          } <span class="rounded-full bg-blue-800 text-xs text-white p-2 font-bold">${rol}</span></p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Monto</h2>
                        <p>S/${data?.precio}</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Validado por</h2>
                        <p>${data?.nombre_validador} ${
            data?.apellido_validador
          }</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Fecha Validacion</h2>
                        <p>${dayjs(data.fecha_validacion).format(
                          "DD [de] MMMM [del] YYYY"
                        )}</p>
                    </div>
                    <div class="w-full">
                        <h2 class="text-sm font-bold">Observacion</h2>
                        <p>${
                          data?.observacion === null
                            ? "no hay observaciones"
                            : data?.observacion
                        }</p>
                    </div>

          `;

          $("#data_info").html(template);
          $("#modal-manager-duplicar").removeClass("md-hidden");
          setTimeout(() => {
            $("#modal-manager-duplicar .form-create").addClass("modal-show");
          }, 300);
        } else {
          alert(
            "No hay informacion de este lote, revise en en el registro de ventas si es que aparece este lote"
          );
        }

        break;
      case "Separar/Vender":
        const id_lote = idLayer;
        const data_lote = lotesList.find((l) => l.id === id_lote);

        $("#detalle_selected_lote").html(
          `Lote N-${data_lote.numero}, Mz: ${data_lote.mz_zona} Area:${data_lote.area}m2 S/${data_lote.precio}`
        );
        $("#precio_final_modal").val(data_lote.precio);
        $("#modal-manager-venta").removeClass("md-hidden");
        setTimeout(() => {
          $("#modal-manager-venta .form-create").addClass("modal-show");
        }, 300);
        console.log(id_lote);

        break;

      default:
        console.log("Acción no reconocida");
    }
  }

  async function buscar_venta_lote(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_venta_by_lote";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          console.log(response);
          let data = response !== false ? JSON.parse(response) : response;
          resolve(data);
        }
      );
    });
  }

  async function buscar_sedes_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_proyecto";
      $.post(
        "../../../controlador/BusinessController.php",
        { funcion, id },
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
  async function buscar_clientes_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_clientes_empresa";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          const data = JSON.parse(response);
          console.log(data);
          dataClientesList = data;
          resolve(data);
        }
      );
    });
  }
  async function registrar_venta(data_venta) {
    return new Promise((resolve, reject) => {
      let funcion = "register_venta_admin";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, data_venta },
        (response) => {
          console.log(response);
          resolve(response);
        }
      );
    });
  }
  async function update_lote(id, status) {
    return new Promise((resolve, reject) => {
      let funcion = "update_lote";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, id, status },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  // registrar venta
  $("#register_venta").on("click", async function (e) {
    $(this).attr("disabled", true);

    let lote_id = idLayer;
    let sede_id = $("#sedesListModal").val();
    let tipo = $("#ventaTipo").val();

    let precio = $("#precio_final_modal").val();

    let cliente_id = $("#clientesList").val();
    let observaciones = $("#observacionesModal").val();

    let select_asesor = $("#select_asesor").val();
    let user_id;
    let fecha_venta = dayjs().format("YYYY-MM-DD");
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

            await buscarLotes(id);
            $("#modal-manager-venta .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#modal-manager-venta").addClass("md-hidden");
            }, 300);

            $("#ventaTipo").val("");
            $("#precio_final_modal").val("");
            $("#observacionesModal").val("");
            $("#clientesList").val(null).trigger("change");
            $("#asesoresList").val(null).trigger("change");
            // modal-manager-venta
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

  // funciones para pintar modal
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
    $("#sedesListModal").html(template);
  }

  $("#sedesListModal").on("change", function (e) {
    let sede_id = e.target.value;
    pintar_clientes_empresa(sede_id);
    pintar_results_asesores(sede_id);
  });
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
  // opcion habilitado asesor register
  $("#select_asesor").on("change", function (e) {
    const select = e.target.value;
    if (select === "SI") {
      $("#viewListAsesores").removeClass("hidden");
    } else {
      $("#viewListAsesores").addClass("hidden");
    }
  });

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
      width: "100%",
    });
  }
  // busca a todos los asesores
  async function fetchasesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesores";
      $.post(
        "../../../controlador/UsuarioController.php",
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

  const sedes = await buscar_sedes_proyecto(id);
  await buscar_clientes_empresa();
  await fetchasesores();
  pintar_sedes(sedes);
  pintar_clientes_empresa(sedes[0].id);

  pintar_results_asesores(sedes[0].id);

  $("#modal-manager-venta .close-modal").on("click", function () {
    $("#modal-manager-venta .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal-manager-venta").addClass("md-hidden");
    }, 300);
  });
  $("#modal-manager-duplicar .close-modal").on("click", function () {
    $("#modal-manager-duplicar .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal-manager-duplicar").addClass("md-hidden");
    }, 300);
  });
  $("#estadoLote").on("click", "#editEstate", function (e) {
    console.log(e.target);
    const estado = $("#estado").attr("key_status");
    const lote = $("#lote").attr("key");
    console.log(estado);
    $("#selectStatus").val(estado);
    $("#selectStatus").find("option").prop("disabled", false);
    $("#selectStatus").find("option:selected").prop("disabled", true);
    $(".container-edit-status").removeClass("md-hidden");
  });
  $("#cancelEdit").click(() => {
    $(".container-edit-status").addClass("md-hidden");
  });
  $("#changeEdit").click(() => {
    const id_lote = $("#lote").attr("numberKey");
    console.log(id_lote);
    const estado = $("#estado").attr("key_status");
    const select = $("#selectStatus").find("option:selected").val();
    console.log(estado, select);
    if (estado !== select) {
      let funcion = "edit_lote";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, id_lote, select },
        (response) => {
          console.log(response);
          buscarLotes(id);
          let template = `
          Estado: <span key_status="${select}" class="status ${select.toLowerCase()}" id="estado">${select}</span> <button id="editEstate">Editar</button>
          `;

          $("#estadoLote").html(template);
          $(".container-edit-status").addClass("md-hidden");
        }
      );
    } else {
      alert("El estado es el mismo, cambie a otro, o cancele la edicion");
    }
  });
});
