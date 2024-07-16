$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("proyect");
  var nameProyecto = "";
  var numero = urlParams.get("phoneNumber");
  var agent = urlParams.get("agent");

  if (id && numero) {
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
    fetchLotes();
    var map1 = L.map("map1", {
      crs: L.CRS.Simple,
      minZoom: -4,
      maxZoom: 4,
      zoom: 0,
    });
    buscarProyecto();
    function buscarProyecto() {
      let funcion = "buscar_proyectos";
      $.post(
        "../../controlador/MapaController.php",
        { funcion, proyecto: id },
        (response) => {
          const proyecto = JSON.parse(response);
          console.log(proyecto);
          nameProyecto = proyecto[0].nombreproyecto;
        }
      );
    }

    // obtener imagen y escalarla en el centro
    $.post(
      "../../controlador/MapaController.php",
      { funcion: "buscar-imagen-proyect", id_proyect: id },
      (response) => {
        const image = JSON.parse(response);
        imageUrl = "../../" + image[0].imgURL;

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
        "../../controlador/MapaController.php",
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
        if (lote.tipo === "rectangulo") {
          let bounds = [
            [lote.cordinates[0][0], lote.cordinates[0][1]],
            [lote.cordinates[1][0], lote.cordinates[1][1]],
          ];
          let rectangle = L.rectangle(bounds, estiloPoligono).addTo(map1);
          rectangle
            .bindTooltip(
              `
            Lote: ${lote.numero} ${lote.mz_zona} <br> Precio: ${lote.precio}  <br> Area: ${lote.area}
            
            `
            )
            .openTooltip();
          rectangle.on("click", function () {
            let template = `
              Estado: <span key_status="${lote.estado}" class="status ${estado}" id="estado">${lote.estado}</span>
              `;
            let templateWhats = `
              <a target="_blank" href="https://api.whatsapp.com/send?phone=+51${numero}&text=Hola%20me%20interesa%20el%20lote%20${
              lote.numero + lote.mz_zona
            }%20del%20proyecto%20${nameProyecto}%20..." class="btnJsvm default" id="editEstate">Me interesa</a>
              `;
            // Actualizar los valores en la tarjeta de HTML
            $("#mz_zonas").text(lote.mz_zona);
            $("#lote").text(lote.numero);
            // $("#lote").attr("key", lote.numero + lote.mz_zona);
            // $("#lote").attr("numberKey", lote.id);
            $("#ancho").text(lote.ancho);
            $("#largo").text(lote.largo);
            $("#area").text(lote.area);
            $("#precio").text(lote.precio);
            $("#estadoLote").html(template);
            $(".containerWhats").html(templateWhats);
            $(".container-edit-status").remove("md-hidden");
            $(".container-edit-status").addClass("md-hidden");
          });
        } else if (lote.tipo === "poligono") {
          let poligono = L.polygon(lote.cordinates, estiloPoligono).addTo(map1);
          poligono
            .bindTooltip(
              `
            Lote: ${lote.numero} ${lote.mz_zona} <br> Precio: ${lote.precio}  <br> Area: ${lote.area}
            
            `
            )
            .openTooltip();
          poligono.on("click", function () {
            let template = `
            Estado: <span key_status="${lote.estado}" class="status ${estado}" id="estado">${lote.estado}</span>
            `;
            let templateWhats = `
            <a target="_blank" href="https://api.whatsapp.com/send?phone=+51${numero}&text=Hola%20me%20interesa%20el%20lote%20${
              lote.numero + lote.mz_zona
            }%20del%20proyecto%20${nameProyecto}%20..." class="btnJsvm default" id="editEstate">Me interesa</a>
            `;
            // Actualizar los valores en la tarjeta de HTML
            $("#mz_zonas").text(lote.mz_zona);
            $("#lote").text(lote.numero);
            $("#lote").attr("key", lote.numero + lote.mz_zona);
            $("#lote").attr("numberKey", lote.id);
            $("#ancho").text(lote.ancho);
            $("#largo").text(lote.largo);
            $("#area").text(lote.area);
            $("#precio").text(lote.precio);

            $("#estadoLote").html(template);
            $(".containerWhats").html(templateWhats);
            $(".container-edit-status").addClass("md-hidden");
          });
        }
      });
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

    // EVENTOS DE CLICK PARA CREAR UN LOTE
    $("#creaCotizacion").click(() => {
      $(".createdZone.addLote").addClass("active");
      $(".createdZone.carrito").removeClass("active");
    });
    $("#closeCreated").click(() => {
      $(".createdZone.addLote").removeClass("active");
    });
  } else {
    $("body").html("No se puede acceder a esta ruta");
  }

  register_visitas(agent);
  function register_visitas(agent) {
    let funcion = "register_visitas";
    $.post(
      "../../controlador/MapaController.php",
      { funcion, agent },
      (response) => {
        console.log(response);
      }
    );
  }

  // ...código posterior...ert("No hay un polígono seleccionado.");
});
