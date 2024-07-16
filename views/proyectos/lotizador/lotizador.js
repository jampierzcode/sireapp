$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  console.log(id);
  var layersArray = []; //array para almacenar en el carrito
  var lotesList = []; //array para guardar los obtenidos actuales
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
  var loteEstado;
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
          <button class="btnLotizador items-center justify-center dragSquare">No hay lotes</button>          
          `;
          $("#listLotes").html(template);
        } else {
          const lotes = JSON.parse(response);
          lotesList = lotes;
          console.log(lotes);
          pintarLotes(lotes);
        }
      }
    );
  }
  function pintarLotes(lotes) {
    let template = "";
    lotes.map((lote) => {
      template += `
      <button id="${lote.id}" class="btnLotizador dragSquare">Manzana: ${lote.mz_zona} Lote: ${lote.numero} Precio: ${lote.precio} Area: ${lote.area}</button>
      `;
    });
    $("#listLotes").html(template);
    selectLotes(lotes);
  }
  function selectLotes(lotes) {
    drawnItems1.eachLayer(function (layer) {
      if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        drawnItems1.removeLayer(layer);
        // También podrías limpiar el array layersArray si lo necesitas
        layersArray = layersArray.filter(function (item) {
          return item !== layer;
        });
      }
    });
    lotes.map((lote) => {
      let fillColor;
      switch (lote.estado) {
        case "DISPONIBLE":
          fillColor = "#71bf44"; // Verde
          break;
        case "SEPARADO":
          fillColor = "#e8db49"; // Amarillo
          break;
        case "OCUPADO":
          fillColor = "#FF0000"; // Rojo
          break;
        case "SIN PUBLICAR":
          fillColor = "#eaeaea"; // Rojo
          break;
        default:
          fillColor = "#a81318"; // Negro (color por defecto en caso de estado no válido)
      }

      const estiloPoligono = {
        color: "#5b5b5b", // Color del borde (negro en este ejemplo)
        fillColor: fillColor, // Color de relleno según el estado del lote
        fillOpacity: 0.25, // Opacidad del fondo
        weight: 1,
      };
      let layer;
      if (lote.tipo === "rectangulo") {
        let bounds = [
          [lote.cordinates[0][0], lote.cordinates[0][1]],
          [lote.cordinates[1][0], lote.cordinates[1][1]],
        ];
        layer = L.rectangle(bounds, estiloPoligono).addTo(map1);
      } else if (lote.tipo === "poligono") {
        layer = L.polygon(lote.cordinates, estiloPoligono).addTo(map1);
      }

      layer.options.id = lote.id;

      // Evento click izquierdo
      layer.on("click", function () {
        toggleLayerEditing(layer);
        $(`#${lote.mz_zona}${lote.numero}`).addClass("active");
      });

      // Evento click derecho (contextmenu)
      layer.on("contextmenu", function (e) {
        let id = e.target.options.id;
        console.log(id);
        // e.preventDefault();
        showContextMenu(e.originalEvent, layer);
      });

      layer.bindTooltip(
        `
        Lote: ${lote.numero} ${lote.mz_zona} <br> Precio: ${lote.precio}  <br> Area: ${lote.area}
        `
      );
      // .openTooltip();

      drawnItems1.addLayer(layer);
      layersArray.push(layer);
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
    let options = ["Duplicar", "Editar", "Eliminar"];
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
  // Función para calcular el ancho y la altura de un rectángulo
  function calculateDimensionsRect(rect) {
    const [coord1, coord2] = rect.cordinates;
    console.log(coord1[1], coord2[1]);
    console.log(coord1[0], coord2[0]);
    const width = Math.abs(coord1[1] - coord2[1]);
    const height = Math.abs(coord1[0] - coord2[0]);
    return { width, height };
  }

  // Función para calcular el ancho y la altura de un polígono
  function calculateDimensionsPoly(poly) {
    const xCoords = poly.cordinates.map((coord) => parseFloat(coord[0]));
    const yCoords = poly.cordinates.map((coord) => parseFloat(coord[1]));
    const width = Math.max(...xCoords) - Math.min(...xCoords);
    const height = Math.max(...yCoords) - Math.min(...yCoords);
    return { width, height };
  }

  // Función para desplazar coordenadas
  function shiftCoordinates(coords, dx, dy) {
    return coords.map((coord) => [
      parseFloat(coord[0]) + dy,
      parseFloat(coord[1]) + dx,
    ]);
  }

  // Función para duplicar una forma n veces en una dirección específica
  function duplicateShape(shape, n, direction) {
    const duplicatedShapes = [];
    console.log(shape.tipo, direction, n);

    // Calcular el desplazamiento según el tipo de forma y la dirección
    let dx = 0,
      dy = 0;
    if (shape.tipo === "rectangulo") {
      const { width, height } = calculateDimensionsRect(shape);
      if (direction === "derecha") dx = width;
      if (direction === "izquierda") dx = -width;
      if (direction === "arriba") dy = height;
      if (direction === "abajo") dy = -height;
    } else if (shape.tipo === "poligono") {
      const { width, height } = calculateDimensionsPoly(shape);
      console.log(width, height);
      if (direction === "derecha") dx = height;
      if (direction === "izquierda") dx = -height;
      if (direction === "arriba") dy = width;
      if (direction === "abajo") dy = -width;
    }

    // Desplazar y duplicar la forma
    for (let i = 1; i <= n; i++) {
      let newCoordinates;
      if (shape.tipo === "rectangulo") {
        newCoordinates = shape.cordinates.map((coord) => [
          coord[0] + dy * i,
          coord[1] + dx * i,
        ]);
      } else if (shape.tipo === "poligono") {
        newCoordinates = shiftCoordinates(shape.cordinates, dx * i, dy * i);
      }
      console.log(newCoordinates);
      const newShape = {
        coordenadas: newCoordinates,
        loteAncho: shape.ancho, // Asigna un nuevo ID único
        loteArea: shape.area, // Asigna un nuevo ID único
        loteLargo: shape.largo, // Asigna un nuevo ID único
        loteMz: shape.mz_zona, // Asigna un nuevo ID único
        loteNumero: Number(shape.numero) + i, // Asigna un nuevo ID único
        lotePrecio: shape.precio, // Asigna un nuevo ID único
        tipo: shape.tipo, // Asigna un nuevo ID único
        estado: shape.estado, // Asigna un nuevo ID único
      };
      console.log(newShape);
      duplicatedShapes.push(newShape);
    }

    return duplicatedShapes;
  }

  $("#duplicar_lotes").on("click", function () {
    let direccion = $(".direcction-btn.active").attr("keyDirection");
    if (direccion !== "" && direccion !== null) {
      let copias = $("#number_duplicados").val();
      let layerSelect = lotesList.find((l) => l.id === idLayer);
      console.log(layerSelect);
      const duplicados = duplicateShape(layerSelect, copias, direccion);
      console.log(duplicados);
      var funcion = "agregar_lotes";
      if (duplicados.length > 0) {
        let lotes = JSON.stringify(duplicados);
        $.post(
          "../../../controlador/UsuarioController.php",
          { funcion, lotes, id },
          (response) => {
            console.log(response);
            buscarLotes(id);
            fetchLotes(); //pinta lotes del carrito cuando se agregan
            $("#modal-manager-duplicar .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#modal-manager-duplicar").addClass("md-hidden");
            }, 300);
          }
        );
      } else {
        alert("aun no haz creado ningun lote");
      }
    } else {
      alert("Debes seleccionar la direccion a duplicar");
    }
  });
  async function eliminar_lote_seleccionado(id_layer) {
    return new Promise((resolve, reject) => {
      let funcion = "eliminar_lote";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, id_layer },
        (response) => {
          resolve(JSON.parse(response));
        }
      );
    });
  }
  $(".direcction-btn").click(function () {
    $(".direcction-btn").removeClass("text-blue-800 border-blue-800 border-2");
    $(".direcction-btn").removeClass("active");
    $(this).addClass("active");
    $(this).addClass("text-blue-800 border-blue-800 border-2");
  });
  async function menuAction(action, layer) {
    idLayer = layer.options.id;
    console.log(idLayer);
    switch (action) {
      case "Duplicar":
        // Implementar la lógica para duplicar el lote
        console.log("Duplicar", layer);
        $("#modal-manager-duplicar").removeClass("md-hidden");
        setTimeout(() => {
          $("#modal-manager-duplicar .form-create").addClass("modal-show");
        }, 300);
        break;
      case "Editar":
        // Implementar la lógica para editar el lote
        console.log("Editar", layer);
        break;
      case "Eliminar":
        // Implementar la lógica para eliminar el lote
        let confirmacion = confirm("Esta seguro de eliminar este lote?");
        if (confirmacion) {
          let eliminar_lote = await eliminar_lote_seleccionado(idLayer);
          if (eliminar_lote[0].msg === "remove_lote") {
            console.log("Eliminar", layer);
            buscarLotes(id);
            fetchLotes();
          } else {
            console.log("Ocurrio un error", eliminar_lote[0].error);
          }
        } else {
          console.log("Cancelado");
        }
        break;
      default:
        console.log("Acción no reconocida");
    }
  }

  // Función para activar/desactivar la edición en los layers
  function toggleLayerEditing(activeLayer) {
    layersArray.forEach((layer) => {
      if (layer === activeLayer) {
        // Activar edición solo en el layer clicado
        // layer.editing.enable();
        layer.setStyle({ color: "blue", weight: 2 });
      } else {
        // Desactivar edición en el resto de los layers
        // layer.editing.disable();
        layer.setStyle({ color: "#5b5b5b", weight: 1 });
      }
    });
  }

  function saveEditedLayer(selectedLayer) {
    console.log(selectedLayer);
  }

  // Capa de dibujo para cada mapa
  // var drawnItems2 = new L.FeatureGroup().addTo(map2);
  var drawnItems1 = new L.FeatureGroup();
  map1.addLayer(drawnItems1);
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
      edit: true,
    },
  });
  map1.addControl(drawControl1);
  buscarLotes(id);
  // Capturar el evento click en el botón "Editar" del controlador
  // map1.on("draw:editstart", function (e) {
  //   console.log("boton control");
  //   // Obtener las capas editadas
  //   const layers = e.layers;
  //   console.log(layers);
  // });

  // var selectedLayer = null;

  // // Manejador de eventos para hacer clic en el polígono o rectángulo
  // drawnItems1.on("click", function (e) {
  //   selectedLayer = e.layer;
  // });

  // Capturar el evento click en un rectángulo
  // map1.on("layeradd", function (e) {
  //   const addedLayer = e.layer;

  //   // Verificar si la capa es un rectángulo
  //   if (addedLayer instanceof L.Rectangle) {
  //     // Asignar el evento click a la capa
  //     addedLayer.on("click", function () {
  //       // Desactivar la edición de las demás capas
  //       drawnItems1.eachLayer(function (layer) {
  //         if (layer !== addedLayer) {
  //           layer.editing.disable();
  //         }
  //       });

  //       // Activar la edición solo para la capa seleccionada
  //       addedLayer.editing.enable();
  //     });
  //   }
  // });

  var selectedLayer = null;

  // Capturar el evento click en el botón "Editar" del controlador

  // CRUD DE DIBUJO EN EL MAPA

  // crear FORMA DIBUJADA en el mapa
  map1.on(L.Draw.Event.CREATED, function (event) {
    if (!creacionHabilitada) {
      // La creación de polígonos no está habilitada
      return;
    }
    var layer = event.layer;
    layer.options.id = loteNumero.toString() + "" + loteMz.toString();
    console.log(layer);
    formaDibujada = layer;
    drawnItems1.addLayer(layer);

    if (layer instanceof L.Rectangle) {
      formaActual = {
        estado: loteEstado,
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
        estado: loteEstado,
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
    drawControl1.setDrawingOptions({ polygon: false }); // DesHabilitar la creación de polígonos
    drawControl1.setDrawingOptions({ rectangle: false }); // DesHabilitar la creación de polígonos
    map1.addControl(drawControl1);
  });
  // editar la FORMA DIBUJADA en el mapa
  map1.on("draw:edited", function (event) {
    const layers = event.layers;
    console.log(layers);
    let newLotes = [];
    layers.eachLayer(function (layer) {
      // Obtener el lote asociado al layer (puedes usar algún identificador para relacionarlos)
      // console.log(layer);
      const lote = getLoteByLayer(layer);
      console.log(lote);
      let coordenadas;
      if (lote instanceof L.rectangle) {
        coordenadas = [
          [lote.getBounds().getNorth(), lote.getBounds().getWest()],
          [lote.getBounds().getSouth(), lote.getBounds().getEast()],
        ];
      } else {
        coordenadas = lote
          .getLatLngs()[0]
          .map((latLng) => [latLng.lat, latLng.lng]); // lng,lat
      }

      console.log(coordenadas);
      lotesList.forEach((mylote) => {
        if (mylote.id === lote.options.id) {
          const loteEdit = {
            id: mylote.id,
            coordenadas: coordenadas,
          };
          newLotes.push(loteEdit);
        }
      });
    });
    console.log(newLotes);
    editar_lotes(newLotes)
      .then(() => {
        // Aquí puedes mostrar el mensaje de éxito o realizar cualquier otra acción necesaria
        alert("Proceso de envío de lotes completado");
        drawnItems1.clearLayers();
        buscarLotes(id);
        lotesArray = [];
      })
      .catch((error) => {
        // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
        alert("Error al enviar los lotes:", error);
      });
  });
  async function editar_lotes(newLotes) {
    await Promise.all(newLotes.map(enviarLote));
  }
  function enviarLote(lote) {
    return new Promise((resolve, reject) => {
      let funcion = "editar_lotes";
      $.post(
        "../../../controlador/UsuarioController.php",
        { funcion, lote },
        (response) => {
          console.log(response);
          resolve();
        }
      );
    });
  }
  function getLoteByLayer(layer) {
    // Retorna el lote encontrado o null si no se encuentra
    return layersArray.find((lote) => lote.options.id === layer.options.id);
  }

  // eliminar la FORMA DIBUJADA en el mapa
  // map1.on("draw:deleted", function (event) {
  //   const layers = event.layers;
  //   layers.eachLayer(function (layer) {
  //     if (layer === formaDibujada) {
  //       console.log("forma eliminada");
  //       // La forma dibujada ha sido eliminada
  //       // Realiza las acciones necesarias (por ejemplo, reiniciar variables, deshabilitar botón, etc.)
  //       // ...
  //       // Si deseas realizar alguna acción adicional después de eliminar, puedes hacerlo aquí
  //     }
  //   });
  // });

  // AGREGAR AL CARRITO DE LOTES

  $("#addCarritoLotes").click(guardarForma);
  function guardarForma() {
    if (formaActual !== null) {
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
        <button class="btnLotizador dragSquare">MZ: ${lote.loteMz} NLote: ${lote.loteNumero} Precio: ${lote.lotePrecio} Area: ${lote.loteArea}</button>
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
    console.log(lotesArray);
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
          fetchLotes(); //pinta lotes del carrito cuando se agregan
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
    loteEstado = $("#loteEstado").val();
    if (
      loteArea !== "" &&
      loteMz !== "" &&
      loteNumero > 0 &&
      loteEstado !== ""
    ) {
      creacionHabilitada = true;
      drawControl1.setDrawingOptions({ polygon: true }); // Habilitar la creación de polígonos
      drawControl1.setDrawingOptions({ rectangle: true }); // Habilitar la creación de rectangulos
      map1.addControl(drawControl1);
      $(".createdZone").removeClass("active");
    } else {
      // Nombre o precio no ingresados o inválidos
      creacionHabilitada = false;
      alert("Te faltan llenar campos para crear el poligono");
    }
  });
  function calcularArea() {
    let ancho = $("#loteAncho").val();
    let largo = $("#loteLargo").val();
    let suma;
    suma = Number(ancho) * Number(largo);
    $("#loteArea").val(suma);
  }
  $("#loteAncho").on("keyup", calcularArea);
  $("#loteLargo").on("keyup", calcularArea);

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
