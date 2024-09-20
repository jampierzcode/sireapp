$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  console.log("entro");
  var imageUrl;
  var lotesArray = [];
  var poligonoSeleccionado = null;
  var creacionHabilitada = false;
  var loteAncho;
  var loteLargo;
  var loteArea;
  var loteMz;
  var loteNumero;
  var lotePrecio;
  var formaActual = null;
  var formaDibujada = null;
  var idLayer;
  fetchLotes();
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
  buscarLotes(id);
  var lotesPintados = [];
  function buscarLotes(id) {
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
        } else {
          const lotes = JSON.parse(response);
          selectLotes(lotes);
        }
      }
    );
  }
  function pintarLotes(lotes) {
    let template = "";
    lotes.map((lote) => {
      template += `
        <button id="${
          lote.mz_zona + "" + lote.numero
        }" class="btnLotizador dragSquare">Manzana: ${lote.mz_zona} Lote: ${
        lote.numero
      } Precio: ${lote.precio} Area: ${lote.area}</button>
        `;
    });
    $("#listLotes").html(template);
    selectLotes(lotes);
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
        lote.estado !== "DISPONIBLE" && lote.estado !== "SIN PUBLICAR"
          ? // e.preventDefault();
            showContextMenu(e.originalEvent, layer)
          : null;
      });
    });
  }
  function showContextMenu(event, layer) {
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

    // Añadir opciones al menú
    let options = ["Informacion"];
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
  async function menuAction(action, layer) {
    idLayer = layer.options.id;
    console.log(idLayer);
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

      default:
        console.log("Acción no reconocida");
    }
  }
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

  // Capa de dibujo para cada mapa
  var drawnItems1 = new L.FeatureGroup().addTo(map1);
  // var drawnItems2 = new L.FeatureGroup().addTo(map2);

  // Configurar el control de dibujo para el mapa
  var drawControl1 = new L.Control.Draw({
    draw: {
      polygon: false,
      marker: false,
      circlemarker: false,
      circle: false,
      polyline: false,
      rectangle: false,
    },
    edit: {
      featureGroup: drawnItems1,
    },
  });
  map1.addControl(drawControl1);

  // CRUD DE DIBUJO EN EL MAPA

  // crear FORMA DIBUJADA en el mapa
  map1.on(L.Draw.Event.CREATED, function (event) {
    if (!creacionHabilitada) {
      // La creación de polígonos no está habilitada
      return;
    }
    var layer = event.layer;
    formaDibujada = layer;
    drawnItems1.addLayer(layer);

    if (layer instanceof L.Rectangle) {
      formaActual = {
        estado: "DISPONIBLE",
        lotePrecio,
        loteArea,
        loteAncho,
        loteLargo,
        loteMz,
        loteNumero,
        tipo: "rectangulo",
        coordenadas: [
          [layer.getBounds().getNorth(), layer.getBounds().getWest()],
          [layer.getBounds().getSouth(), layer.getBounds().getEast()],
        ],
      };
    } else if (layer instanceof L.Polygon) {
      formaActual = {
        estado: "DISPONIBLE",
        lotePrecio,
        loteArea,
        loteAncho,
        loteLargo,
        loteMz,
        loteNumero,
        tipo: "poligono",
        coordenadas: layer
          .getLatLngs()[0]
          .map((latLng) => [latLng.lat, latLng.lng]), // lng,lat
      };
    }
    console.log(formaActual);
    $(".showCarrito").addClass("active");

    // agregarPoligonos(layer, coordinates);
    drawControl1.setDrawingOptions({ polygon: false }); // Habilitar la creación de polígonos
    drawControl1.setDrawingOptions({ rectangle: false }); // Habilitar la creación de polígonos
    map1.addControl(drawControl1);
  });
  // editar la FORMA DIBUJADA en el mapa
  map1.on("draw:edited", function (event) {
    const layers = event.layers;
    console.log(formaDibujada);
    console.log(layers);
    layers.eachLayer(function (layer) {
      if (layer === formaDibujada) {
        formaDibujada = layer;
        console.log("forma editada");
        var newCoordinates;

        if (layer instanceof L.Rectangle) {
          newCoordinates = [
            [layer.getBounds().getNorth(), layer.getBounds().getWest()],
            [layer.getBounds().getSouth(), layer.getBounds().getEast()],
          ];
        } else if (layer instanceof L.Polygon) {
          newCoordinates = layer.getLatLngs()[0].map(function (latLng) {
            return [latLng.lat, latLng.lng];
          });
        }

        // Actualizar las coordenadas de formaActual
        formaActual.coordenadas = newCoordinates;
        console.log(formaActual);
      }
    });
  });

  // eliminar la FORMA DIBUJADA en el mapa
  map1.on("draw:deleted", function (event) {
    const layers = event.layers;
    layers.eachLayer(function (layer) {
      if (layer === formaDibujada) {
        console.log("forma eliminada");
        // La forma dibujada ha sido eliminada
        // Realiza las acciones necesarias (por ejemplo, reiniciar variables, deshabilitar botón, etc.)
        // ...
        // Si deseas realizar alguna acción adicional después de eliminar, puedes hacerlo aquí
      }
    });
  });
  // FIN DE CRUD DE DIBUJO EN EL MAPA

  // seleccionar el poligono en el map
  drawnItems1.on("click", function (event) {
    var layer = event.layer;
    poligonoSeleccionado = layer;
  });

  // AGREGAR AL CARRITO DE LOTES

  $("#addCarritoLotes").click(guardarForma);
  function guardarForma() {
    if (formaActual !== null) {
      // Comprobar si la forma es un rectángulo
      lotesArray.push(formaActual);
      formaActual = null;
      fetchLotes();
    } else {
      alert("no hay ninguna forma dibujada");
    }
  }

  // FUNCION PARA PINTAR LOS LOTES EN EL CARRITO
  function fetchLotes() {
    let template = "";
    if (lotesArray.length > 0) {
      lotesArray.map((lote) => {
        template += `
          <button class="btnLotizador dragSquare">Manzana: ${lote.loteMz} Lote: ${lote.loteNumero} Precio: ${lote.lotePrecio} Area: ${lote.loteArea}</button>
          `;
      });
    } else {
      template += `
        <button class="btnLotizador dragSquare">No hay lotes</button>
        `;
    }
    $("#listCarrito").html(template);
    loteAncho = 0;
    loteLargo = 0;
    loteArea = 0;
    loteMz = 0;
    loteNumero = 0;
    lotePrecio = 0;
  }

  $("#guardarLotizador").click(() => {
    // let id = id;
    var funcion = "agregar_lotes";
    if (lotesArray.length > 0) {
      let lotes = JSON.stringify(lotesArray);
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, lotes, id },
        (response) => {
          console.log(response);
          buscarLotes(id);
          lotesArray = [];
          fetchLotes();
        }
      );
    } else {
      alert("aun no haz creado ningun lote");
    }
  });

  // EVENTOS DE CLICK PARA CREAR UN LOTE
  $("#creaCotizacion").click(() => {
    $(".createdZone.addLote").addClass("active");
    $(".createdZone.carrito").removeClass("active");
  });
  $("#closeCreated").click(() => {
    $(".createdZone.addLote").removeClass("active");
  });
  $("#addCarritoLotes").click(() => {
    $(".showCarrito").removeClass("active");
    $(".createdZone.carrito").addClass("active");
    $(".createdZone.addLote").removeClass("active");
  });
  $("#closeCarrito").click(() => {
    $(".createdZone.carrito").removeClass("active");
  });
  $("#crearLote").click(() => {
    loteAncho = $("#loteAncho").val();
    loteLargo = $("#loteLargo").val();
    loteArea = $("#loteArea").val();
    loteMz = $("#loteMz").val();
    loteNumero = $("#loteNumero").val();
    lotePrecio = $("#lotePrecio").val();
    if (
      (loteArea !== "" && loteMz !== "" && loteNumero > 0, lotePrecio !== "")
    ) {
      creacionHabilitada = true;
      drawControl1.setDrawingOptions({ polygon: true }); // Habilitar la creación de polígonos
      drawControl1.setDrawingOptions({ rectangle: true }); // Habilitar la creación de polígonos
      map1.addControl(drawControl1);
      $(".createdZone").removeClass("active");
    } else {
      // Nombre o precio no ingresados o inválidos
      creacionHabilitada = false;
      alert("Te faltan llenar campos para crear el poligono");
    }
  });

  // FUNCION PARA COPIAR EL POLIGONO DE ACUERDO AL TAMAÑO ETC.
  function copiarPoligono() {
    // Verificar si hay un polígono seleccionado
    if (poligonoSeleccionado) {
      console.log(poligonoSeleccionado);
      // Obtener las coordenadas del polígono seleccionado
      var coordenadas = poligonoSeleccionado.getLatLngs();
      console.log(coordenadas);

      // Calcular el ancho del polígono seleccionado
      var bounds = poligonoSeleccionado.getBounds();
      var ancho = bounds.getEast() - bounds.getWest();

      // Determinar la dirección de la copia (derecha o izquierda)
      var direccion = "derecha"; // Puedes cambiar a 'izquierda' si deseas la dirección opuesta

      // Crear una copia del polígono desplazada
      var copiaPoligono = L.polygon(coordenadas, { color: "#001529" }).addTo(
        map1
      );
      // copiaPoligono.enableEdit(); // Habilitar la edición del polígono

      // Establecer las coordenadas de la copia del polígono desplazadas según la dirección
      var desplazamientoX = direccion === "derecha" ? ancho : -ancho;
      var nuevasCoordenadas = coordenadas[0].map(function (coordenada) {
        return L.latLng(coordenada.lat, coordenada.lng + desplazamientoX);
      });
      copiaPoligono.setLatLngs(nuevasCoordenadas);

      // Agregar la copia del polígono al grupo de capas
      drawnItems1.addLayer(copiaPoligono);
    } else {
      alert("No hay un polígono seleccionado.");
    }
  }

  // ...código posterior...ert("No hay un polígono seleccionado.");
});
