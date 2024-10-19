$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("proyect");
  var nameProyecto = "";

  if (id) {
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
    L.Browser.retina = true;

    var map1 = L.map("map1", {
      crs: L.CRS.Simple,
      minZoom: -4,
      maxZoom: 4,
    });
    // buscarProyecto();
    // function buscarProyecto() {
    //   let funcion = "buscar_proyectos";
    //   $.post(
    //     "../../../controlador/MapaController.php",
    //     { funcion, proyecto: id },
    //     (response) => {
    //       console.log(response);
    //       const proyecto = JSON.parse(response);
    //       nameProyecto = proyecto[0].nombreProyecto;
    //     }
    //   );
    // }
    var imageBounds;
    // obtener imagen y escalarla en el centro
    $.post(
      "../../../controlador/MapaController.php",
      { funcion: "buscar-imagen-proyect", id_proyect: id },
      (response) => {
        if (response.trim() == "no-register") {
          $("body").html("No existe ningun proyecto");
        } else {
          const image = JSON.parse(response);
          imageUrl =
            "../../../" + image[0].imgURL + "?v=" + new Date().getTime();

          var img = new Image();
          img.src = imageUrl;

          img.onload = function () {
            var imageWidth = this.width;
            var imageHeight = this.height;
            console.log(imageHeight, imageWidth);

            imageBounds = [
              [0, 0],
              [imageHeight, imageWidth],
            ];
            var imageOverlay = L.imageOverlay(imageUrl, [
              [0, 0],
              [imageHeight, imageWidth],
            ]);
            imageOverlay.addTo(map1);
            map1.fitBounds(imageBounds);

            buscarLotes(id);
            setInterval(() => {
              $("#loading_lotizador").addClass("hidden");
            }, 2000);
          };
        }
      }
    );

    var lotesPintados = [];
    function buscarLotes(id) {
      let funcion = "buscar_lotes";
      $.post(
        "../../../controlador/MapaController.php",
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
    function formatoMiles(num) {
      return num.toLocaleString("es-MX");
    }
    function generarTemplate(mz_zona) {
      // Verificar si el string contiene un guion "-"
      if (mz_zona.includes("-")) {
        // Si contiene guion, dividir en dos partes
        const [bloque, manzana] = mz_zona.split("-");
        // Retornar el template con Bloque y Manzana
        return `Bloque: ${bloque}, Manzana: ${manzana}`;
      } else {
        // Si no contiene guion, retornar el template con solo la Manzana
        return `Manzana: ${mz_zona}`;
      }
    }

    function selectLotes(lotes) {
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
          rectangle.bindTooltip(
            `
              ${generarTemplate(lote.mz_zona)} Lote: ${
              lote.numero
            }<br> Precio: ${lote.precio}  <br> Area: ${lote.area}
              
              `
          );
          rectangle.on("click", function () {
            // Actualizar los valores en la tarjeta de HTML
            $("#mz_zonas").text(generarTemplate(lote.mz_zona));
            $("#lote").text(lote.numero);
            // $("#lote").attr("key", lote.numero + lote.mz_zona);
            // $("#lote").attr("numberKey", lote.id);
            $("#ancho").text(lote.ancho);
            $("#largo").text(lote.largo);
            $("#area").text(lote.area);
            $("#precio").text(`S/${formatoMiles(Number(lote.precio))}`);

            $(".container-edit-status").remove("md-hidden");
            $(".container-edit-status").addClass("md-hidden");
          });
        } else if (lote.tipo === "poligono") {
          let poligono = L.polygon(lote.cordinates, estiloPoligono).addTo(map1);
          poligono.bindTooltip(
            `
            ${generarTemplate(lote.mz_zona)} Lote: ${
              lote.numero
            } <br> Precio: ${lote.precio}  <br> Area: ${lote.area}
              
              `
          );
          // .openTooltip();
          poligono.on("click", function () {
            // Actualizar los valores en la tarjeta de HTML

            $("#mz_zonas").text(generarTemplate(lote.mz_zona));
            $("#lote").text(lote.numero);
            $("#ancho").text(lote.ancho);
            $("#largo").text(lote.largo);
            $("#area").text(lote.area);
            $("#precio").text(`S/${formatoMiles(Number(lote.precio))}`);

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

  // ...código posterior...ert("No hay un polígono seleccionado.");
});
