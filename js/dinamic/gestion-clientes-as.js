$(document).ready(async function () {
  var funcion = "";
  var clientesList;
  var sedeId;
  var plantillasList;
  var templateMsg;
  var idCliente;
  var proyectosList = [];
  var businessInfo;
  var typefilter;
  var clientesFilter;
  var dataTable = $("#usuariosList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    // ordering: false,
    stateSave: false,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,
    scrollCollapse: true,
    // paging: false,
    // fixedColumns: {
    //   leftColumns: 2, //Le indico que deje fijas solo las 2 primeras columnas
    //   // rightColumns: 1,
    // },
    // aoColumnDefs: [
    //   {
    //     bSortable: false,
    //     aTargets: ["nosort"],
    //   },
    // ],
    aoColumnDefs: [
      { bSortable: false, aTargets: [0] }, // 0 es el índice de la primera columna, ajusta según tus necesidades
    ],
    aaSorting: [],

    columns: [
      // { data: "id" },

      {
        data: null,
        render: (data) => {
          return `${data.fecha_creacion} <br/> ${data.hora_creacion}`;
        },
      },
      {
        data: null,
        render: (data) => {
          let separaciones = "";
          if (data.nombres !== null) {
            const splinombre = data.nombres.split(" ");
            splinombre.map((s, index) => {
              let news = s;
              if (index === 1) {
                news += `<br/>`;
              } else {
                news += ` `;
              }
              separaciones += news;
            });
          }
          if (data.asignedUser === "si") {
            return `<div class="flex items-center gap-4"><img style="width: 20px;" src="../../img/corona.png" alt=""> ${separaciones} <br/> ${
              data.apellidos === null ? "" : data.apellidos
            }</div>`;
          } else {
            return `<div class="flex items-center gap-4">${separaciones} <br/> ${
              data.apellidos === null ? "" : data.apellidos
            }</div>`;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          let template = `<h1 class="font-bold">`;
          template += data.nombre_proyecto;
          template += `</h1>`;
          return template;
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          template += `<div class="flex items-center gap-2 ">`;
          if (data.etiquetas === null) {
            template += `<p class="text-sm">Sin etiquetas</p>`;
          } else {
            // Convertir la cadena a un array
            const etiquetas = JSON.parse(data.etiquetas);
            const etiquetasArray = etiquetas[0].nombre.split(",");
            etiquetasArray.forEach((e) => {
              template += `<div class="p-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium whitespace-nowrap text-sm">${e}</span> </div>`;
            });
          }
          template += `
          <button id="verEtiquetasCliente" keyCliente=${data.id} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><ion-icon name="eye"></ion-icon></button>
          `;
          template += `</div>`;
          return template;
        },
      },
      // { data: "correo" },
      {
        data: null,
        render: function (data, type, row) {
          return `<p class="text-[14px] font-bold">${data.celular}</p>`;
        },
      },
      // { data: "telefono" },
      // { data: "origen" },
      // { data: "ciudad" },
      {
        data: null,
        render: function (data, type, row) {
          let template_status = `<div class="flex items-center gap-2">`;
          // Cambiar de const a let

          if (data.task_status === "PENDIENTE") {
            template_status += `<div class="flex flex-col gap-3">`; // Cambiar de const a let
            template_status += `<div class="flex items-center gap-2">`; // Cambiar de const a let
            template_status += imprimirStatus(data?.status); // Cambiar de const a let

            if (
              data.status == "VISITA" ||
              data.status == "REPROGRAMACION VISITA"
            ) {
              template_status += `
              <div class="flex-actions">
              <button target="_blank" keyTask="${data.id_task}" statusClient="ASISTIO" keyClient="${data?.id}" id="asistenciaYes" class="btnJsvm success mt-2">ASISTIO</button>
              <button target="_blank" keyTask="${data.id_task}" statusClient="NO ASISTIO" keyClient="${data?.id}" id="asistenciaNot" class="btnJsvm danger mt-2">NO ASISTIO</button>
              </div>
              `;
            } else {
              template_status += `
              <div class="flex-actions">
              <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="completarTask" class="btnJsvm default mt-2">Completar Actividad</button>
              </div>
              `;
            }
            template_status += `</div>`; // Cambiar de const a let
            const fechaVisita = dayjs(
              data.fecha_visita + " " + data.hora_visita
            );
            const ahora = dayjs();
            const diferencia = fechaVisita.diff(ahora, "minute", true); // Diferencia en minutos
            var dias = Math.floor(diferencia / (24 * 60));

            var horas = Math.floor((diferencia % (24 * 60)) / 60);
            var minutos = Math.floor(diferencia % 60);
            let tiempoRestante = "";

            // Ajuste para considerar 0 cuando estamos en el mismo día y hora
            if (
              diferencia > 0 ||
              (diferencia === 0 && fechaVisita.isAfter(ahora))
            ) {
              if (dias >= 1) {
                tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;
              }

              if (horas >= 1 || (dias === 0 && minutos === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${horas} hora${horas > 1 ? "s" : ""}`;
              }

              if (minutos > 0 || (dias === 0 && horas === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${minutos} minuto${minutos > 1 ? "s" : ""}`;
              }

              template_status +=
                tiempoRestante.length > 0
                  ? `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Faltan ${tiempoRestante}</div>`
                  : `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">La visita está programada para ahora</div>`;
            } else {
              dias = dias * -1;
              horas = horas * -1;
              minutos = minutos * -1;
              if (dias >= 1) {
                tiempoRestante += `${dias - 1} día${dias > 2 ? "s" : ""}`;
              }

              if (horas >= 1 || (dias === 0 && minutos === 0)) {
                tiempoRestante += `${tiempoRestante.length > 0 ? ", " : ""}${
                  horas - 1
                } hora${horas > 2 ? "s" : ""}`;
              }

              if (minutos > 0 || (dias === 0 && horas === 0)) {
                tiempoRestante += `${
                  tiempoRestante.length > 0 ? ", " : ""
                }${minutos} minuto${minutos > 1 ? "s" : ""}`;
              }

              template_status +=
                tiempoRestante.length > 0
                  ? `<div class="px-4 py-2 bg-red-100 border-red-500 text-red-500 font-bold text-xs rounded">Retrasado por ${tiempoRestante}</div>`
                  : ""; // No mostrar nada si no hay retraso
            }

            template_status += `</div>`;
            // template_status += `<span>${
            //   data.fecha_visita + " Hora: " + data.hora_visita
            // }</span>`;
          } else {
            template_status += imprimirStatus(data?.status); // Cambiar de const a let

            switch (data.status) {
              case "NO CONTACTADO":
                template_status += `
              <div class="flex-actions">
              <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="contactarSeguimiento" class="btnJsvm default mt-2">Contactar</button>
            </div>
              `;
                break;
              case "REPROGRAMACION CONTACTO":
                template_status += `COMPLETADO`;
                template_status += `
              <div class="flex-actions">
              <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
                </div>
              `;
                break;

              default:
                template_status += `
                  <div class="flex-actions">
                  <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
                </div>
                  `;
                break;
            }
          }

          template_status += `</div>`;

          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              <button target="_blank" keyClient="${data?.id}" id="historialCliente" class="btnJsvm normal">Historial</button>
              <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
              <button target="_blank" keyClient="${data?.id}" id="removeClient" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              </div>
              `;
        },
      },
      {
        data: null,
        render: function (data) {
          return `<button id="open-plantilla" keyClient="${data.id}" class="p-2 rounded-md flex whitespace-nowrap text-sm bg-green-500 text-white">
              Enviar msg
            </button> <button id="open-proforma" keyProyecto="${data.proyecto_id}" keyClient="${data.id}" class="p-2 rounded-md flex whitespace-nowrap text-sm bg-gray-500 text-white">
              Enviar proforma
            </button>`;
        },
      },
    ],
  });
  async function send_validar(id_task) {
    let funcion = "validar_tarea";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_task },
        async (response) => {
          if (response.trim() === "SEND_VALIDAR") {
            resolve("SEND_VALIDAR");
          } else {
            reject("ERROR");
          }
        }
      );
    });
  }
  $(document).on("click", "#sendValidar", async function () {
    let id_task = $(this).attr("id_task");
    const validar = await send_validar(id_task);
    if (validar === "SEND_VALIDAR") {
      alert("Se envio actividad a VALIDACION");
    } else {
      alert("Hubo un error contacta al aministrador");
    }
    await buscar_clientes();
    animarProgress();
  });

  var cartItems = [];
  function llenarproforma() {
    template = "";
    var total = 0;
    cartItems.forEach((item) => {
      const subtotal = item.quantity * item.price;

      template += `
    <tr>
      <td>${item.description}</td>
      <td>${item.currency} ${Math.round((item.price * 100) / 100).toFixed(
        2
      )}</td>
      <td>${item.quantity}</td>
      <td class="text-end">${item.currency} ${Math.round(
        (subtotal * 100) / 100
      ).toFixed(2)}</td>
    </tr>
    `;
      total = total + subtotal;
    });
    $("#fecha-proforma").html(dayjs().format("DD/MM/YYYY"));
    $("#carrito-proforma").html(template);
    $("#total-proforma").html(`${Math.round((total * 100) / 100).toFixed(2)}`);
  }
  function renderCart() {
    const cartTable = $("#cart-items");
    cartTable.empty();
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        const subtotal = item.quantity * item.price;
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.description
                  }</td>
                  <td class="border text-[14px] px-4 py-2">${item.quantity}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((item.price * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((subtotal * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">
                      <button class="text-blue-500 hover:text-blue-700 mr-2" id="editItem" index-table="${index}"><ion-icon name="create"></ion-icon></button>
                      <button class="text-red-500 hover:text-red-700" id="deleteItem" index-table="${index}"><ion-icon name="trash"></ion-icon></button>
                  </td>
              </tr>
          `;
        cartTable.append(row);
      });
      llenarproforma();
    } else {
      cartTable.html("");
    }
  }

  // Función para agregar un elemento al carrito
  function addItem(description, quantity, price, currency) {
    cartItems.push({ description, quantity, price, currency });
    renderCart();
  }

  // Función para editar un elemento del carrito
  function editItem(index) {
    const row = $("#cart-items tr").eq(index); // Sumamos 1 para omitir la fila de encabezado
    const item = cartItems[index];

    // Convertir los campos en inputs editables
    row.find("td").each(function (i) {
      if (i > 0 && i < 4) {
        // Excluir el primer y último campo
        let fieldValue = $(this).text();
        if (i === 3) {
          // Campo de Precio
          // const currency = item.currency === "dolar" ? "$" : "S/";
          fieldValue = `<select class="currency-select">
                                  <option value="$" ${
                                    item.currency === "$" ? "selected" : ""
                                  }>$</option>
                                  <option value="S/" ${
                                    item.currency === "S/" ? "selected" : ""
                                  }>S/</option>
                              </select>
                              <input type="number" class="price-input" value="${
                                item.price
                              }">`;
        } else {
          fieldValue = `<input type="text" class="editable-field" value="${fieldValue}">`;
        }
        $(this).html(fieldValue);
      }
    });

    // Agregar botón de guardar
    const saveButton = $(
      `<button class="text-green-500 hover:text-green-700" index-table="${index}" id="saveItemChanges"><ion-icon name="save"></ion-icon></button>`
    );
    row.find("td:last-child").html(saveButton);
  }
  function saveItemChanges(index) {
    const row = $("#cart-items tr").eq(index);
    const item = cartItems[index];

    // Obtener los nuevos valores de los inputs editables
    const description = row.find(".editable-field").eq(0).val();
    const quantity = parseInt(row.find(".editable-field").eq(1).val());
    const currency = row.find(".currency-select").val();
    const price = parseFloat(row.find(".price-input").val());

    // Actualizar el objeto del carrito con los nuevos valores
    item.description = description;
    item.quantity = quantity;
    item.currency = currency;
    item.price = price;

    // Renderizar el carrito nuevamente
    renderCart();
  }

  // Función para eliminar un elemento del carrito
  function deleteItem(index) {
    cartItems.splice(index, 1);
    renderCart();
  }
  $("#cart-proforma").on("click", function () {
    let description = $("#description-proforma").val();
    let tipo_moneda = $("#tipomoneda").val();
    let precio = $("#precio-proforma").val();
    addItem(description, 1, precio, tipo_moneda);
  });
  $(document).on("click", "#editItem", function () {
    let index = $(this).attr("index-table");
    editItem(index);
  });
  $(document).on("click", "#deleteItem", function () {
    let index = $(this).attr("index-table");
    deleteItem(index);
  });
  $(document).on("click", "#saveItemChanges", function () {
    let index = $(this).attr("index-table");
    saveItemChanges(index);
  });
  // $("#description-proforma, #tipomoneda, #precio-proforma").on(
  //   "change keyup",
  //   llenarproforma
  // );
  // ---------------FINANCIAMIENTO---------------------
  function llenar_financiamiento() {
    let inicial = $("#monto_inicial_fn").val();
    let numero_cuotas = $("#numero_cuotas_fn").val();
    let monto_cuotas = $("#monto_cuotas_fn").val();
    let currency = $("#tipomoneda").val();
    $("#inicial_fn_pr").html(
      `${currency}${Math.round((inicial * 100) / 100).toFixed(2)}`
    );
    $("#ncuotas_fn_pr").html(numero_cuotas);
    $("#montocuotas_fn_pr").html(
      `${currency}${Math.round((monto_cuotas * 100) / 100).toFixed(2)}`
    );
  }
  $("#financiamiento_check").on("click", function () {
    // let actived = $(this).prop("checked");
    $("#container-financiamento").toggleClass("hidden");
    $("#proforma_financiamiento").toggleClass("hidden");
  });
  $("#monto_inicial_fn, #numero_cuotas_fn, #monto_cuotas_fn").on(
    "change keyup",
    llenar_financiamiento
  );

  $("#generar-proforma .close-modal").on("click", function () {
    cartItems = [];
    renderCart();
    $("#description-proforma").val("");
    $("#precio-proforma").val("");
    $("#generar-proforma .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#generar-proforma").addClass("md-hidden");
    }, 300);
  });

  var map1;
  function waitForMapLoad() {
    return new Promise((resolve, reject) => {
      map1.on("load", () => {
        resolve();
      });
    });
  }
  $("#generar-proforma-pdf").on("click", function () {
    if (cartItems.length > 0) {
      var mapContainer = document.querySelector("#mapacontainer");
      var texto_html = document.querySelector("#text-lotizador");
      var options = {
        filename: "proformanew.pdf",
        margin: 0.5,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
      };
      var contenidoPDF = document.createElement("div");

      // Clonar el contenido de proforma-print y agregar el clon al PDF
      $("#proforma-print").clone().appendTo(contenidoPDF);

      // Generar y guardar el PDF
      html2pdf()
        .set(options)
        .from(contenidoPDF)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          // Capturar el mapa con HTML2Canvas
          domtoimage.toPng(mapContainer).then(function (dataUrl) {
            // Convertir el lienzo en una imagen
            var img = new Image();
            img.src = dataUrl;

            // Calcular tamaño del mapa
            var mapWidthInches = mapContainer.offsetWidth / 96; // 96 pixels per inch

            var mapHeightInches = mapContainer.offsetHeight / 96;

            var anchodocumento =
              pdf.internal.pageSize.getWidth() - 2 * options.margin;
            var restaImage = anchodocumento - mapWidthInches;

            // Calcular espacio disponible en la página actual
            var currentPageHeightInches =
              pdf.internal.pageSize.getHeight - 2 * options.margin; // Subtracting margins
            var remainingPageHeightInches = currentPageHeightInches - pdf.y;
            // Verificar si el mapa cabe en la página actual
            if (mapHeightInches <= remainingPageHeightInches) {
              pdf.addHTML(texto_html);
              // Agregar la imagen al PDF en la página actual
              pdf.addImage(
                img,
                "JPEG",
                options.margin,
                pdf.y + options.margin,
                anchodocumento,
                mapHeightInches + restaImage
              );
            } else {
              // Agregar nueva página al PDF
              pdf.addPage();
              // Agregar la imagen al PDF en la página siguiente
              pdf.addImage(
                img,
                "JPEG",
                options.margin,
                options.margin,
                anchodocumento,
                mapHeightInches + restaImage
              );
            }

            // Guardar el PDF
            pdf.save();
          });
        });
    } else {
      alert("Debe llenar todos los campos");
    }
  });

  function pintarmapa(proformaproyecto) {
    console.log(proformaproyecto);
    if (!map1) {
      // Inicializar Leaflet.draw y configurar los controles de dibujo
      map1 = L.map("map1", {
        crs: L.CRS.Simple,
        minZoom: -4,
        maxZoom: 2,
        zoom: 0.1,
      });
      var drawnItems = new L.FeatureGroup();
      map1.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
        },
      });
      map1.addControl(drawControl);
    } else {
      // Eliminar todas las capas existentes del mapa
      map1.eachLayer(function (layer) {
        map1.removeLayer(layer);
      });
      // Agregar de nuevo el control de dibujo y la capa de dibujo
      var drawnItems = new L.FeatureGroup();
      map1.addLayer(drawnItems);
    }
    map1.on("draw:created", function (e) {
      var layer = e.layer;
      drawnItems.addLayer(layer);
    });

    var img = new Image();
    var imageUrl = "../../" + proformaproyecto.img_url;
    img.src = imageUrl;

    img.onload = function () {
      var imageWidth = this.width;
      var imageHeight = this.height;

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
  function buscar_amenidades(proformaproyecto) {
    let funcion = "buscar_amenidades";
    $.post(
      "../../controlador/UsuarioController.php",
      {
        funcion,
        id: proformaproyecto.id,
      },
      (response) => {
        if (response.trim() !== "no-register-amenidades") {
          let amenidades = JSON.parse(response);
          let template = "";
          amenidades.forEach((amenidad) => {
            template += `
          <div class="w-full mt-6">
            <img src="../../imagenes/amenidades/${amenidad.icono}.png" class="w-[40%] mx-auto" alt="">
            <p class="text-sm text-center">${amenidad.nombre}</p>
          </div>  
          `;
          });
          $("#list-amenidades-proforma").html(template);
          $(".view-amenidades").removeClass("hidden");
        } else {
          $(".view-amenidades").addClass("hidden");
        }
      }
    );
  }
  async function buscar_me_target() {
    let funcion = "buscar_user_target";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-target") {
            resolve(response);
          } else {
            let targeta = JSON.parse(response);
            resolve(targeta[0]);
          }
        }
      );
    });
  }
  async function buscar_user_asesor() {
    let funcion = "buscar_user_asesor";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-target") {
            resolve(response);
          } else {
            let targeta = JSON.parse(response);
            resolve(targeta[0]);
          }
        }
      );
    });
  }
  async function buscar_user_target_socials() {
    let funcion = "buscar_user_target_socials";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-socials") {
            resolve(response);
          } else {
            let targeta = JSON.parse(response);
            resolve(targeta);
          }
        }
      );
    });
  }

  $(document).on("click", "#open-proforma", async function () {
    const targeta = await buscar_me_target();
    const meuser = await buscar_user_asesor();
    let template_asesor = "";
    template_asesor += `
    <div class="w-full flex flex-col items-end">
    <img class="w-16 h-16 border border-gray-200 rounded-full" src="../../${targeta.picture_perfil}" alt="">
    
    <li class='text-bold'>Asesor</li>
    <li class='text-bold text-end text-sm'>${meuser?.nombre} ${meuser?.apellido}</li>
    <li class='text-end text-sm'>${meuser?.phone_number}</li>
    <li class='text-end text-sm'>${meuser?.correo}</li>
    </div>
    `;
    $("#datos-asesor").html(template_asesor);
    let cliente = $(this).attr("keyClient");
    // pintar proyecto
    let proyectokey = $(this).attr("keyProyecto");
    let proformaproyecto = proyectosList.find((p) => p.id === proyectokey);
    console.log(proformaproyecto);
    pintarmapa(proformaproyecto);
    buscar_amenidades(proformaproyecto);
    let clienteproforma = clientesList.find((c) => c.id === cliente);
    $("#logoproyecto-proforma").attr("src", "");
    $("#logoproyecto-proforma").attr("src", `../../${proformaproyecto.logo}`);
    $("#name-proyecto-proforma").html(proformaproyecto.nombreProyecto);
    // fin de pintar proyecto

    // pintar cliente
    $("#name-cliente-proforma").html(
      `${clienteproforma.nombres} ${clienteproforma?.apellidos || ""}`
    );
    $("#contact-cliente-proforma").html(`${clienteproforma.celular}`);
    // fin de pintar cliente

    // pintar empresa
    if (businessInfo.length > 0) {
      $("#info_empresa").removeClass("hidden");
      $("#logobusiness-proforma").attr("src", "");
      $("#logobusiness-proforma").attr("src", `../../${businessInfo[0]?.logo}`);
      $("#name-business-proforma").html(businessInfo[0]?.nombre_razon);
      $("#email-business-proforma").html(businessInfo[0]?.email);
      $("#phonecontact-business-proforma").html(businessInfo[0]?.phone_contact);
      $("#website-business-proforma").html(businessInfo[0]?.website);
    } else {
      $("#info_empresa").addClass("hidden");
    }
    // fin de pintar empresa
    $("#generar-proforma").removeClass("md-hidden");
    setTimeout(() => {
      $("#generar-proforma .form-create").addClass("modal-show");
    }, 300);
    // link generaar
    // $("");
  });
  var dataTableEtiquetas = $("#etiquetasList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,

    columns: [
      // { data: "id" },
      { data: "nombre" },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              
              <button target="_blank" keyClient="${data?.id}" id="removeEtiquetaUser" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              </div>
    
              `;
          // <button target="_blank" keyClient="${data?.id}" id="editEtiquetaUser" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
        },
      },
    ],
  });
  var etiquetasClienteList = $("#etiquetasClienteList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,

    columns: [
      // { data: "id" },
      { data: "nombre" },
      { data: "asignado_cliente" },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              <button target="_blank" keyEtiqueta="${data?.id}" id="removeEtiqueta" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              </div>
    
              `;
        },
      },
    ],
  });
  // analisis modal
  $("#analysis-leads").on("click", function () {
    $("#rendimiento-asesor").removeClass("md-hidden");

    setTimeout(() => {
      $("#rendimiento-asesor .form-create").addClass("modal-show");
    }, 300);
    // modal rendimiento
    let fecha_start_month = dayjs().startOf("month");
    let fecha_fin_month = dayjs().endOf("month");
    $("#filter_date_analisis").val("this-month");

    $("#fecha_analisis_start").val(fecha_start_month.format("YYYY-MM-DD"));
    $("#fecha_analisis_end").val(fecha_fin_month.format("YYYY-MM-DD"));
    analisis_rendimiento(
      fecha_start_month.format("YYYY-MM-DD"),
      fecha_fin_month.format("YYYY-MM-DD"),
      "Todos"
    );
  });
  $("#rendimiento-asesor .close-modal").on("click", function () {
    $("#rendimiento-asesor .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#rendimiento-asesor").addClass("md-hidden");
    }, 300);
  });

  // fin de analisis modal
  revisarLogin();
  function revisarLogin() {
    const authInfo = JSON.parse(localStorage.getItem("authInfo"));
    if (authInfo !== "" && authInfo !== undefined && authInfo !== null) {
      $("#registercalendar").attr("checked", true);
    } else {
      $("#registercalendar").attr("checked", false);
    }
  }
  buscar_registros_status();
  function buscar_registros_status() {
    let funcion = "buscar_historial_status";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        if (response.trim() !== "no-data") {
          const clientes = JSON.parse(response);

          const clientesAgroup = obtenerUltimoEstadoPorCliente(clientes);
          clientesLastStatus = clientesAgroup;
        }
      }
    );
  }
  function cambiarFormatoFecha(cadenaFecha) {
    // Dividir la cadena en día, mes y año
    const partes = cadenaFecha.split("/");
    const dia = partes[0];
    const mes = partes[1];
    const año = partes[2];

    // Crear una nueva cadena en el formato deseado (yyyy/mm/dd)
    const nuevaCadenaFecha = `${año}/${mes}/${dia}`;

    return nuevaCadenaFecha;
  }
  function obtenerUltimoEstadoPorCliente(registros) {
    const clienteEstados = [];

    registros.forEach((registro) => {
      const clienteID = registro.cliente_id;
      const fechaChange = cambiarFormatoFecha(registro.fecha);
      const formatoPersonalizado = "DD/MM/YYYY HH:mm:ss";
      const fechaRegistro = dayjs(`${fechaChange} ${registro.hora}`, {
        format: formatoPersonalizado,
      });
      const estado = registro.status;

      const clienteExistente = clienteEstados.find(
        (cliente) => cliente.cliente_id === clienteID
      );
      if (clienteExistente) {
        if (
          fechaRegistro.isAfter(
            dayjs(clienteExistente.fechaRegistro, {
              format: formatoPersonalizado,
            })
          )
        ) {
          clienteEstados.splice(clienteEstados.indexOf(clienteExistente), 1);
          const nuevoCliente = {
            cliente_id: clienteID,
            status: estado,
            fechaRegistro: `${fechaChange} ${registro.hora}`,
          };
          clienteEstados.push(nuevoCliente);
        }
      } else {
        const nuevoCliente = {
          cliente_id: clienteID,
          status: estado,
          fechaRegistro: `${fechaChange} ${registro.hora}`,
        };
        clienteEstados.push(nuevoCliente);
      }
    });
    clientesFilter = clienteEstados;

    return clienteEstados;
  }
  // send plantilla
  buscar_plantillas_user();
  function buscar_plantillas_user() {
    let funcion = "buscar_msg_template";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() === "no-register") {
          template += `<option value="0">No hay plantillas</option>`;
        } else {
          const plantillas = JSON.parse(response);
          template += `<option value="0" selected>Seleccione una plantilla</option>`;
          plantillas.forEach((plantilla) => {
            template += `<option value="${plantilla.id}">${plantilla.nombre}</option>`;
          });
          plantillasList = plantillas;
        }
        $("#listPlantillas").html(template);
      }
    );
  }
  $("#listPlantillas").change(function () {
    let id_msg = $(this).val();
    if (id_msg !== "0") {
      const msg = plantillasList.find((e) => e.id === id_msg);

      $("#message-modal-plantilla").val(msg.mensaje);
      let saltoMsg = $("#message-modal-plantilla").val();

      // Reemplazar saltos de línea con %0A en el mensaje
      const mensajeFormateado = encodeURIComponent(
        saltoMsg.replace(/\n/g, "\n")
      );

      // Actualizar el atributo href con el mensaje formateado
      $("#link-w-send").attr(
        "href",
        `https://api.whatsapp.com/send?phone=${templateMsg}&text=${mensajeFormateado}`
      );
    } else {
      $("#message-modal-plantilla").val("");
      $("#link-w-send").attr("href", "");
    }
  });
  $("#message-modal-plantilla").on("keyup", function () {
    let value = $(this).val();
    const mensajeFormateado = encodeURIComponent(value.replace(/\n/g, "\n"));
    $("#link-w-send").attr(
      "href",
      `https://api.whatsapp.com/send?phone=${templateMsg}&text=${mensajeFormateado}`
    );
  });

  $(document).on("click", "#open-plantilla", function () {
    let id = $(this).attr("keyClient");
    const cliente = clientesList.find((e) => e.id === id);
    templateMsg = cliente.celular;
    $("#send-modal-event").removeClass("md-hidden");
    let message = $("#message-modal-plantilla").val();
    $("#link-w-send").attr(
      "href",
      `https://api.whatsapp.com/send?phone=${templateMsg}&text=${message}`
    );
    setTimeout(() => {
      $("#send-modal-event .form-create").addClass("modal-show");
    }, 300);
  });
  $("#send-modal-event .close-modal").click(function () {
    setTimeout(() => {
      $("#send-modal-event .form-create").removeClass("modal-show");
    }, 300);
    $("#send-modal-event").addClass("md-hidden");
  });
  // mis leads
  $("#meusers-filtros").click(function () {
    const meclientes = clientesList.filter((e) => e.asignedUser === "si");

    clientesFilter = meclientes;
    dataTable.clear().rows.add(meclientes).draw();
  });
  $("#asignedusers-filtros").click(function () {
    const meclientes = clientesList.filter((e) => e.asignedUser === "no");

    clientesFilter = meclientes;
    dataTable.clear().rows.add(meclientes).draw();
  });

  // exportar leads
  function exportar_leads() {
    let clientes = clientesFilter;

    if (clientes !== "" && clientes.length > 0 && clientes !== undefined) {
      for (let index = 0; index < clientes.length; index++) {
        delete clientes[index].id;
        delete clientes[index].createdBy;
        delete clientes[index].proyecto_id;
        delete clientes[index].id_task;
        delete clientes[index].asignedUser;
      }

      // Crear un objeto de libro de Excel
      var workbook = XLSX.utils.book_new();

      // Convertir el array de JSON a una hoja de trabajo
      var worksheet = XLSX.utils.json_to_sheet(clientesFilter);

      // Agregar la hoja de trabajo al libro
      XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
      XLSX.writeFile(workbook, "Leads.xlsx", { compression: true });
      add_toast("success", "Se exportaron correctamente los clientes");
    } else {
      add_toast("error", "No se pudo exportar los leads");
      add_toast(
        "warning",
        "No puedes exportar leads que no existan o esten vacios"
      );
    }
  }
  $("#export_leads").on("click", exportar_leads);

  // -------register asistencia
  async function register_visita_agenda(task, cliente, status) {
    return new Promise((resolve, reject) => {
      let funcion = "register_visita_agenda";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, task, cliente, status },
        (response) => {
          if (response.trim() === "register") {
            add_toast("success", "Se paso asistencia al cliente");
          } else {
            add_toast("error", "Ocurrio un error, contacta a soporte");
            console.log(response);
          }
          resolve();
        }
      );
    });
  }

  $(document).on("click", "#asistenciaYes", async function () {
    let observacion = "";
    let cliente = $(this).attr("keyClient");
    let task = $(this).attr("keyTask");
    let status = $(this).attr("statusClient");
    let confirmado = confirm("Esta seguro de esta eleccion");
    if (confirmado) {
      await seguimiento_cliente(observacion, cliente, status);
      // await completarTask(task, cliente, status);
      await register_visita_agenda(task, cliente, status);

      const validar = await send_validar(task);
      if (validar === "SEND_VALIDAR") {
        add_toast("success", "Se envio actividad a VALIDACION");
      } else {
        add_toast("error", "Hubo un error contacta al aministrador");
      }
      await buscar_clientes();
      await encontrar_ventas();
      animarProgress();
      showSeguimientoCliente(cliente, status);
    }
  });
  $(document).on("click", "#asistenciaNot", async function () {
    let observacion = "";
    let cliente = $(this).attr("keyClient");
    let task = $(this).attr("keyTask");
    let status = $(this).attr("statusClient");
    let confirmado = confirm("Esta seguro de esta eleccion");
    if (confirmado) {
      await seguimiento_cliente(observacion, cliente, status);
      // await completarTask(task, cliente, status);
      await completarTask(task);
      await register_visita_agenda(task, cliente, status);
      await encontrar_ventas();
      showSeguimientoCliente(cliente, status);
    }
  });
  async function completarTask(id_task) {
    return new Promise((resolve, reject) => {
      if (id_task) {
        let funcion = "completar_tarea";
        $.post(
          "../../controlador/UsuarioController.php",
          { funcion, id_task },
          async (response) => {
            if (response.trim() == "COMPLETADO") {
              add_toast("success", "Tarea completada satisfactoriamente");
              await buscar_clientes();
              animarProgress();
              resolve();
            } else {
              add_toast("error", "Ocurrio un error, contacta a soporte");
              console.log(response);

              reject({
                err: response,
              });
            }
          }
        );
      } else {
        alert(
          "No es un estado pendiente, al parecer ocurrio un error, contacta al administrado"
        );
      }
    });
  }

  $(document).on("click", "#completarTask", function () {
    let id_cliente = $(this).attr("keyClient");
    let status = $(this).attr("statusClient");
    let id_task = $(this).attr("keyTask");
    let confirmado = confirm("Esta seguro de completar actividad");
    if (confirmado) {
      completarTask(id_task);
      showSeguimientoCliente(id_cliente, status);
    }
  });
  encontrar_ventas();
  async function encontrar_ventas() {
    return new Promise((resolve, reject) => {
      const startOfMonth = dayjs().startOf("month");
      const endOfMonth = dayjs().endOf("month");
      dayjs().locale("es");
      const mesActual = dayjs().format("MMMM");
      $("#mesNow").html(mesActual);
      const fecha_inicio = startOfMonth.format("YYYY-MM-DD"); // Primer día del mes en formato YYYY-MM-DD
      const fecha_fin = endOfMonth.format("YYYY-MM-DD");
      let funcion = "buscar_resumen_eficiencia_usuario";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          let visitas_concretadas;
          let separaciones;
          let ventas;
          if (response.trim() === "no-register") {
            visitas = 0;
            separaciones = 0;
            ventas = 0;
          } else {
            let resumen = JSON.parse(response);
            visitas_concretadas = resumen[0].visitas_concretadas;
            separaciones = resumen[0].separaciones;
            ventas = resumen[0].ventas;
          }
          $("#ventas_count").html(ventas);
          $("#separaciones_count").html(separaciones);
          $("#visits_concretadas").html(visitas_concretadas);
          resolve();
        }
      );
    });
  }

  async function analisis_rendimiento(fecha_inicio, fecha_fin, proyecto) {
    return new Promise((resolve, reject) => {
      var dom = document.getElementById("resumen-vsv");
      var rvsv = echarts.init(dom, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });
      var option;
      if (proyecto === "Todos") {
        let funcion = "buscar_resumen_eficiencia_usuario";
        $.post(
          "../../controlador/UsuarioController.php",
          { funcion, fecha_inicio, fecha_fin },
          (response) => {
            console.log(response);
            let visitas_concretadas;
            let visitas_no_concretadas;
            let separaciones;
            let ventas;
            if (response.trim() === "no-register") {
              visitas = 0;
              visitas_no_concretadas = 0;
              separaciones = 0;
              ventas = 0;
            } else {
              let resumen = JSON.parse(response);
              visitas_concretadas = resumen[0].visitas_concretadas;
              visitas_no_concretadas = resumen[0].visitas_no_concretadas;
              separaciones = resumen[0].separaciones;
              ventas = resumen[0].ventas;
            }
            $("#ventas_analisis").html(ventas);
            $("#separaciones_analisis").html(separaciones);
            $("#visitas_analisis").html(visitas_concretadas);
            $("#no_visitas_analisis").html(visitas_no_concretadas);

            option = {
              tooltip: {
                trigger: "item",
              },
              legend: {
                top: "5%",
                left: "center",
              },
              series: [
                {
                  name: "Eficiencia",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                  label: {
                    show: false,
                    position: "center",
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 14,
                      fontWeight: "bold",
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    {
                      value: visitas_concretadas,
                      name: "VISITAS CONCRETADAS",
                    },
                    {
                      value: visitas_no_concretadas,
                      name: "VISITAS NO CONCRETADAS",
                    },
                    { value: separaciones, name: "SEPARACIONES" },
                    { value: ventas, name: "VENTAS" },
                  ],
                  color: [
                    "#5208DD",
                    "#0A9597",
                    "#0A3397",
                    "#4A40E2",
                    "#5BB8E0",
                  ],
                },
              ],
            };

            if (option && typeof option === "object") {
              rvsv.setOption(option);
            }

            window.addEventListener("resize", rvsv.resize);
            resolve();
          }
        );
      } else {
        let funcion = "buscar_resumen_eficiencia_usuario_proyecto";

        $.post(
          "../../controlador/UsuarioController.php",
          { funcion, fecha_inicio, fecha_fin, proyecto },
          (response) => {
            console.log(response);
            let visitas_concretadas;
            let visitas_no_concretadas;
            let separaciones;
            let ventas;
            if (response.trim() === "no-register") {
              visitas_concretadas = 0;
              visitas_no_concretadas = 0;
              separaciones = 0;
              ventas = 0;
            } else {
              let resumen = JSON.parse(response);
              visitas_concretadas = resumen[0].visitas_concretadas;
              visitas_no_concretadas = resumen[0].visitas_no_concretadas;
              separaciones = resumen[0].separaciones;
              ventas = resumen[0].ventas;
            }
            $("#ventas_analisis").html(ventas);
            $("#separaciones_analisis").html(separaciones);
            $("#visitas_analisis").html(visitas_concretadas);
            $("#no_visitas_analisis").html(visitas_no_concretadas);
            option = {
              tooltip: {
                trigger: "item",
              },
              legend: {
                top: "5%",
                left: "center",
              },
              series: [
                {
                  name: "Eficiencia",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                  label: {
                    show: false,
                    position: "center",
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 14,
                      fontWeight: "bold",
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    {
                      value: visitas_concretadas,
                      name: "VISITAS CONCRETADAS",
                    },
                    {
                      value: visitas_no_concretadas,
                      name: "VISITAS NO CONCRETADAS",
                    },
                    { value: separaciones, name: "SEPARACIONES" },
                    { value: ventas, name: "VENTAS" },
                  ],
                  color: [
                    "#5208DD",
                    "#0A9597",
                    "#0A3397",
                    "#4A40E2",
                    "#5BB8E0",
                  ],
                },
              ],
            };

            if (option && typeof option === "object") {
              rvsv.setOption(option);
            }

            window.addEventListener("resize", rvsv.resize);
            resolve();
          }
        );
      }
      encontrar_clientes_rendimiento(fecha_inicio, fecha_fin, proyecto);
    });
  }
  async function encontrar_clientes_rendimiento(
    fecha_inicio,
    fecha_fin,
    proyecto
  ) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_clientes_rendimiento";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          let visitas_concretadas;
          let visitas_no_concretadas;
          let separaciones;
          let ventas;
          // templates
          let template_separaciones = "";
          let template_ventas = "";
          let template_visitas_concretadas = "";
          let template_visitas_no_concretadas = "";

          if (response.trim() === "no-register") {
            $("#table-visitas-concretadas tbody").html(
              template_visitas_concretadas
            );
            $("#table-visitas-no-concretadas tbody").html(
              template_visitas_no_concretadas
            );
            $("#table-separaciones tbody").html(template_separaciones);
            $("#table-ventas tbody").html(template_ventas);
          } else {
            let data = JSON.parse(response);
            let template_separaciones = "";
            let template_ventas = "";
            let template_visitas_concretadas = "";
            let template_visitas_no_concretadas = "";
            if (proyecto === "Todos") {
              visitas_concretadas = data.filter(
                (c) =>
                  (c.tipo == "VISITA" || c.tipo == "REPROGRAMACION VISITA") &&
                  c.asistencia == "ASISTIO"
              );
              visitas_concretadas.length > 0 &&
                visitas_concretadas.forEach((s) => {
                  template_visitas_concretadas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              visitas_no_concretadas = data.filter(
                (c) =>
                  (c.tipo == "VISITA" || c.tipo == "REPROGRAMACION VISITA") &&
                  c.asistencia == "NO ASISTIO"
              );
              visitas_no_concretadas.length > 0 &&
                visitas_no_concretadas.forEach((s) => {
                  template_visitas_no_concretadas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              separaciones = data.filter((c) => c.tipo == "SEPARACION");
              separaciones.length > 0 &&
                separaciones.forEach((s) => {
                  template_separaciones += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              ventas = data.filter((c) => c.tipo == "VENTA");
              ventas.length > 0 &&
                ventas.forEach((s) => {
                  template_ventas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
            } else {
              visitas_concretadas = data.filter(
                (c) =>
                  (c.tipo == "VISITA" || c.tipo == "REPROGRAMACION VISITA") &&
                  c.asistencia == "ASISTIO" &&
                  c.proyet_id == proyecto
              );
              visitas_concretadas.length > 0 &&
                visitas_concretadas.forEach((s) => {
                  template_visitas_concretadas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              visitas_no_concretadas = data.filter(
                (c) =>
                  (c.tipo == "VISITA" || c.tipo == "REPROGRAMACION VISITA") &&
                  c.asistencia == "NO ASISTIO" &&
                  c.proyet_id == proyecto
              );
              visitas_no_concretadas.length > 0 &&
                visitas_no_concretadas.forEach((s) => {
                  template_visitas_no_concretadas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              separaciones = data.filter(
                (c) => c.tipo == "SEPARACION" && c.proyet_id == proyecto
              );
              separaciones.length > 0 &&
                separaciones.forEach((s) => {
                  template_separaciones += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
              ventas = data.filter(
                (c) => c.tipo == "VENTA" && c.proyet_id == proyecto
              );
              ventas.length > 0 &&
                ventas.forEach((s) => {
                  template_ventas += `
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.nombres} ${s.apellidos}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              ${s.fecha_registro}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.proyecto}
              </td>
              <td class="font-bold px-6 py-4 whitespace-nowrap">
                  ${s.status}
              </td>
              </tr>
              `;
                });
            }
            $("#table-visitas-concretadas tbody").html(
              template_visitas_concretadas
            );
            $("#table-visitas-no-concretadas tbody").html(
              template_visitas_no_concretadas
            );
            $("#table-separaciones tbody").html(template_separaciones);
            $("#table-ventas tbody").html(template_ventas);
            //   visitas_concretadas = resumen[0].visitas_concretadas;
            //   visitas_no_concretadas = resumen[0].visitas_no_concretadas;
            //   separaciones = resumen[0].separaciones;
            //   ventas = resumen[0].ventas;
          }
          // $("#ventas_analisis").html(ventas);
          // $("#separaciones_analisis").html(separaciones);
          // $("#visitas_analisis").html(visitas_concretadas);
          // $("#no_visitas_analisis").html(visitas_no_concretadas);

          resolve();
        }
      );
    });
  }
  $("#fecha_analisis_start, #fecha_analisis_end, #proyectos_analisis").on(
    "change",
    async function () {
      let fecha_inicio = $("#fecha_analisis_start").val();
      let fecha_fin = $("#fecha_analisis_end").val();
      let proyecto = $("#proyectos_analisis").val();
      await analisis_rendimiento(fecha_inicio, fecha_fin, proyecto);
    }
  );
  $("#filter_date_analisis").on("change", async function (e) {
    let valor = e.target.value;
    let actualdia;
    let proyecto = $("#proyectos_analisis").val();
    let fecha_inicio;
    let fecha_fin;
    let fecha_start;
    switch (valor) {
      case "this-month":
        fecha_inicio = dayjs().startOf("month").format("YYYY-MM-DD");
        fecha_fin = dayjs().endOf("month").format("YYYY-MM-DD");
        $("#fecha_analisis_end").val(fecha_fin);
        $("#fecha_analisis_start").val(fecha_inicio);
        break;
      case "last-month":
        actualdia = dayjs();
        fecha_fin = actualdia.format("YYYY-MM-DD");
        $("#fecha_analisis_end").val(fecha_fin);
        fecha_start = actualdia.subtract(1, "month");
        fecha_inicio = fecha_start.format("YYYY-MM-DD");
        $("#fecha_analisis_start").val(fecha_inicio);

        break;
      case "last-week":
        actualdia = dayjs();
        fecha_fin = actualdia.format("YYYY-MM-DD");
        $("#fecha_analisis_end").val(fecha_fin);
        fecha_start = actualdia.subtract(7, "days");
        fecha_inicio = fecha_start.format("YYYY-MM-DD");
        $("#fecha_analisis_start").val(fecha_inicio);

      default:
        break;
    }
    await analisis_rendimiento(fecha_inicio, fecha_fin, proyecto);
  });

  // fon modal rendimiento
  function animarProgress() {
    // let funcion = "buscar_visitas_programadas";
    // $.post(
    //   "../../controlador/UsuarioController.php",
    //   { funcion },
    //   (response) => {
    //     let count;
    //     let pendientes;
    //     let separaciones;
    //     let ventas;
    //     if (response === "") {
    //       count = 0;
    //       pendientes = 0;
    //     } else {
    //       const interaccion = JSON.parse(response);
    //       const pendientesList = interaccion.filter(
    //         (data) => data.status === "PENDIENTE"
    //       );
    //       pendientes = pendientesList.length;
    //     }
    //     let total = 10;
    //     // var progressBar = document.querySelector(".progreessbar .barSize");

    //     // progressBar.style.width = `${(count / total) * 100}%`;
    //     $("#menu-pendientes").html("Pendientes: " + pendientes);
    //   }
    // );
    const pendientes = clientesList.filter(
      (c) => c.task_status === "PENDIENTE"
    );
    $("#menu-pendientes").html("Pendientes: " + pendientes.length);
  }
  // registrar lead indiidual
  buscar_proyectos();

  async function buscar_proyectos() {
    let funcion = "buscar_proyectos_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "no-register") {
          template += "<td>No hay registros</td>";
        } else {
          const proyectos = JSON.parse(response);
          // Reestructurar los proyectos para consolidar las sedes

          proyectosList = proyectos;
          // console.log(proyectos);
          llenarFiltros();
          llenarFiltrosRendimiento();
        }
      }
    );
  }
  buscar_info_business();
  async function buscar_info_business() {
    funcion = "buscar_by_user_info_empresa";
    const response = await $.post("../../controlador/UsuarioController.php", {
      funcion,
    });
    const info = JSON.parse(response);
    businessInfo = info;
  }

  // Llamar a la función de animación

  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }

  buscar_clientes();
  // BUSCAR CLIENTES
  async function buscar_clientes() {
    return new Promise((resolve, reject) => {
      funcion = "buscar_clientes_by_asesor";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          $("#spin-load").html("");
          if (response.trim() === "no-register-clientes") {
            dataTable.clear().draw();
          } else {
            const clientes = JSON.parse(response);
            clientesList = clientes;
            clientesList.sort(compareDatesDesc);

            filtrarProyectos();
          }
          resolve();
        }
      );
    });
  }
  async function buscar_sedes_by_usuario() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_usuario";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
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
  var mysede = await buscar_sedes_by_usuario();
  sedeId = mysede[0].id;
  const compareDates = (a, b) => {
    // Parsear las fechas con el formato "dd/mm/yyyy"
    const [dayA, monthA, yearA] = a.fecha.split("/");
    const [dayB, monthB, yearB] = b.fecha.split("/");

    // Crear las instancias de Date con el formato "YYYY-MM-DD"
    const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.hora}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.hora}`);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  };
  // show modal de historial de cliente
  $(document).on("click", "#historialCliente", function () {
    let cliente = $(this).attr("keyClient");
    idCliente = cliente;
    let funcion = "buscar_historial_seguimiento";
    buscarHistorial(funcion, cliente);
  });
  function buscarHistorial(funcion, cliente) {
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, cliente },
        (response) => {
          if (response.trim() === "no-data") {
            alert("no hay registro alguno, porfavor cree uno");
            resolve({ msg: "no hay registro alguno" });
          } else {
            const historial = JSON.parse(response);

            const sortedData = historial.sort(compareDates);

            let template = "";
            sortedData.forEach((history) => {
              template += `
            <li class="mb-10 ml-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${
              history.fecha + " " + history.hora
            }</time>
                            <h3 class="flex items-center gap-4 text-lg font-semibold text-gray-900 dark:text-white">Estado Registrado: ${imprimirStatus(
                              history.status
                            )}</h3>
                            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">${
                              history.observacion !== null
                                ? history.observacion
                                : "Sin observaciones"
                            }</p>
                            </li>
                            `;
            });
            $("#list-historial").html(template);
            $("#historial-event").removeClass("md-hidden");
            setTimeout(function () {
              $("#historial-event .form-create").addClass("modal-show");
            }, 10);
            resolve();
          }
        }
      );
    });
  }
  // INTERACCION CON CLIENTES

  // SHOW MODAL registrar seguimiento
  $(document).on("click", "#contactarSeguimiento", async function () {
    let id_cliente = $(this).attr("keyClient");

    let observacion = "Cliente contactado";
    let status = "CONTACTADO";
    await seguimiento_cliente(observacion, id_cliente, status);
    showSeguimientoCliente(id_cliente, status);
  });
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;
      case "NO INTERESADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;

      case "CONTACTADO":
        template += `<span class="target_tab info flex items-center gap-2">CONTACTANDO <div role="status">
        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div></span>`;

        break;
      case "NO RESPONDIO":
        template += `<span class="target_tab warning">${status}</span>`;

        break;
      case "VISITA":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "ASISTIO":
        template += `<span class="target_tab success">${status} a la visita</span>`;

        break;
      case "NO ASISTIO":
        template += `<span class="target_tab danger">${status}</span>`;

        break;
      case "REPROGRAMACION CONTACTO":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "REPROGRAMACION VISITA":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "SEPARACION":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "VENTA":
        template += `<span style="display: flex; gap: 10px; align-items: center" class="target_tab success"> 
        <img style="width: 20px;" src="../../img/corona.png" alt=""> ${status}</span>`;

        break;

      default:
        break;
    }
    return template;
  }
  // $("#table-visitas-concretadas")

  $("#modal-lead").click(() => {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 10);
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#crear-lead #proyecto-lead").html(template);
  });
  $(document).on("click", "#editClient", function () {
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#editar-lead #proyecto-lead").html(template);
    $("#editar-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#editar-lead .form-create").addClass("modal-show");
    }, 10);
    const id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    const clienteResult = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    if (clienteResult[0].asignedUser === "si") {
      $("#asignedcliente_user").html("Es tu lead");
      $("#editar-lead #proyecto-lead").removeAttr("disabled");
      $("#detalle_lead_asignado").html("");
    } else {
      $("#asignedcliente_user").html("Es un lead asignado");
      $("#editar-lead #proyecto-lead").attr("disabled", "disabled");
      $("#detalle_lead_asignado").html(
        "No puedes hacer modificaciones porque es un lead asignado"
      );
    }

    $("#editar-lead #nombre-lead").val(clienteResult[0].nombres);
    $("#editar-lead #apellido-lead").val(clienteResult[0].apellidos);
    $("#editar-lead #documento-lead").val(clienteResult[0].documento);
    $("#editar-lead #celular-lead").val(clienteResult[0].celular);
    $("#editar-lead #telefono-lead").val(clienteResult[0].telefono);
    $("#editar-lead #origen-lead").val(clienteResult[0].origen);
    $("#editar-lead #ciudad-lead").val(clienteResult[0].ciudad);
    $("#editar-lead #pais-lead").val(clienteResult[0].Pais);
    $("#editar-lead #campania-lead").val(clienteResult[0].campania);
    $("#editar-lead #email-lead").val(clienteResult[0].correo);

    $("#editar-lead #proyecto-lead").val(clienteResult[0].proyecto_id);
  });

  function llenarFiltros() {
    let template = "";
    template += `<option selected value="Todos">Todos</option>`;

    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.nombre_proyecto}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
  }
  function llenarFiltrosRendimiento() {
    let template = "";
    template += `<option selected value="Todos">Todos</option>`;

    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#proyectos_analisis").html(template);
  }
  function filtrarProyectos() {
    const nombreProyecto = $("#filter-proyecto").val();
    const nombreCliente = $("#cliente-search").val().toLowerCase();
    const nombreEtiqueta = $("#filter-etiqueta").val();
    let status = $("#filter-status").val();
    let fecha_inicio = dayjs($("#fecha-inicio-status").val() + " 23:59:00");
    let fecha_fin = dayjs($("#fecha-fin-status").val() + " 23:59:00");

    const clientes = clientesList.filter((cliente) => {
      let etiquetasList;
      let etiquetas = JSON.parse(cliente.etiquetas);

      let fecha_registro = cliente.fecha_creacion;

      if (etiquetas === null) {
        etiquetasList = [];
      } else {
        etiquetasList = etiquetas[0].nombre.split(", ");
      }
      let count = 0;
      etiquetasList.forEach((etiqueta) => {
        if (etiqueta === nombreEtiqueta) {
          count = count + 1;
        }
      });

      if (count === 0 && nombreEtiqueta !== "Todos") {
        return false;
      }
      if (
        nombreProyecto !== "Todos" &&
        cliente.nombre_proyecto !== nombreProyecto
      ) {
        return false;
      }

      if (status !== "Todas" && status !== cliente.status) {
        return false;
      }
      if (
        nombreCliente !== "" &&
        !contienenombreCliente(cliente, nombreCliente)
      ) {
        return false;
      }
      if (
        fecha_inicio.format("YYYY/MM/DD") !== "Invalid Date" &&
        fecha_fin.format("YYYY/MM/DD") !== "Invalid Date"
      ) {
        if (
          !dayjs(fecha_registro, "YYYY/MM/DD").isSame(fecha_fin) ||
          !dayjs(fecha_registro, "YYYY/MM/DD").isSame(fecha_inicio)
        ) {
          if (
            dayjs(fecha_registro, "YYYY/MM/DD").isAfter(fecha_fin) ||
            dayjs(fecha_registro, "YYYY/MM/DD").isBefore(fecha_inicio)
          ) {
            return false;
          }
        }
      }
      return true;
    });
    let newClientes = clientes.sort((a, b) => {
      var fechaA = new Date(a.fecha_creacion + " " + a.hora_creacion);
      var fechaB = new Date(b.fecha_creacion + " " + b.hora_creacion);

      // Compara las fechas
      if (fechaA < fechaB) {
        return 1;
      } else if (fechaA > fechaB) {
        return -1;
      } else {
        return 0; // Las fechas son iguales
      }
    });
    clientesFilter = newClientes;
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(clientes).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    if (estadoActual.page < totalPaginas) {
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      dataTable.rows.add(clientes).draw();
      dataTable.page(totalPaginas - 1);
    }
    animarProgress();
    // Restaurar la posición de scroll horizontal
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  function filtrarCreacion() {
    let fecha_inicio = dayjs($("#fecha-inicio-status").val() + " 23:59:00");
    let fecha_fin = dayjs($("#fecha-fin-status").val() + " 23:59:00");
    let status = $("#filter-status").val();
    let nombreProyecto = $("#filter-proyecto").val();
    const clientes = clientesList.filter((cliente) => {
      let fecha_registro = cliente.created_cliente.split(" ")[0];
      if (
        nombreProyecto !== "Todos" &&
        cliente.nombre_proyecto !== nombreProyecto
      ) {
        return false;
      }
      if (status !== "Todas" && status !== cliente.status) {
        return false;
      }
      if (
        fecha_inicio.format("YYYY/MM/DD") !== "Invalid Date" &&
        fecha_fin.format("YYYY/MM/DD") !== "Invalid Date"
      ) {
        if (
          !dayjs(fecha_registro, "YYYY/MM/DD").isSame(fecha_fin) ||
          !dayjs(fecha_registro, "YYYY/MM/DD").isSame(fecha_inicio)
        ) {
          if (
            dayjs(fecha_registro, "YYYY/MM/DD").isAfter(fecha_fin) ||
            dayjs(fecha_registro, "YYYY/MM/DD").isBefore(fecha_inicio)
          ) {
            return false;
          }
        }
      }

      return true;
    });
    clientesFilter = clientes;

    dataTable.clear().rows.add(clientesFilter).draw();
  }

  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contienenombreCliente(cliente, nombreCliente) {
    const nombreCompleto =
      `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreCliente);
  }

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto").on("change keyup", filtrarProyectos);
  $("#filter-etiqueta").on("change", filtrarProyectos);

  // filtro de pendientes
  $("#menu-pendientes").click(function () {
    typefilter = "PENDIENTE";
    const clientes = clientesList
      .filter((e) => e.task_status === "PENDIENTE") // Filtra por task_status igual a "PENDIENTE"
      .sort((a, b) => {
        // Ordena por fecha_visita y luego por hora_visita
        const fechaA = new Date(a.fecha_visita + " " + a.hora_visita);
        const fechaB = new Date(b.fecha_visita + " " + b.hora_visita);

        return fechaA - fechaB;
      });
    dataTable.clear().rows.add(clientes).draw();
  });

  // --------reset filters
  $("#reset_filtros").click(function () {
    $("#cliente-search").val("");
    $("#filter-proyecto").val("Todos");
    $("#filter-etiqueta").val("Todos");
    $("#fecha-inicio-status").val(null);
    $("#fecha-fin-status").val(null);
    $("#filter-status").val("Todas");
    // dataTable.clear().rows.add(clientesList).draw();
    filtrarProyectos();
  });

  $("#fecha-inicio-status").on("change", function () {
    const fechaInicio = dayjs($(this).val());

    // Habilitar "fechaFin"
    $("#fecha-fin-status").prop("disabled", false);

    // Establecer el valor mínimo para "fechaFin" como un día después de "fechaInicio"
    $("#fecha-fin-status").attr("min", fechaInicio.format("YYYY-MM-DD"));
  });
  $("#fecha-inicio-status, #fecha-fin-status, #filter-status").on(
    "change",
    filtrarProyectos
  );

  // filtro de etiquetas

  // Llama a la función inicialmente para mostrar todos los proyectos

  // filtrarProyectos();

  $("#editar-lead #editLead").submit(async (e) => {
    e.preventDefault();
    let nombre = $("#editar-lead #nombre-lead").val();
    let apellido = $("#editar-lead #apellido-lead").val();
    let documento = $("#editar-lead #documento-lead").val();
    let celular = $("#editar-lead #celular-lead").val();
    let telefono = $("#editar-lead #telefono-lead").val();
    let origen = $("#editar-lead #origen-lead").val();
    let ciudad = $("#editar-lead #ciudad-lead").val();
    let pais = $("#editar-lead #pais-lead").val();
    let campania = $("#editar-lead #campania-lead").val();
    let correo = $("#editar-lead #email-lead").val();
    let proyecto_id = $("#editar-lead #proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
    };
    if (proyecto_id !== "0") {
      let funcion = "edit_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, cliente: idCliente },
        async (response) => {
          const data = JSON.parse(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            alert(data.error);
          } else {
            alert("Se edito correctamente al cliente");
            setTimeout(function () {
              $("#editar-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#editar-lead").addClass("md-hidden");
            await buscar_clientes();

            $("#editar-lead #nombre-lead").val("");
            $("#editar-lead #apellido-lead").val("");
            $("#editar-lead #documento-lead").val("");
            $("#editar-lead #celular-lead").val("");
            $("#editar-lead #telefono-lead").val("");
            $("#editar-lead #origen-lead").val("");
            $("#editar-lead #ciudad-lead").val("");
            $("#editar-lead #pais-lead").val("");
            $("#editar-lead #campania-lead").val("");
            $("#editar-lead #email-lead").val("");
          }
        }
      );
    }
  });
  function showSeguimientoCliente(id_cliente, status) {
    idCliente = id_cliente;
    let template_status = imprimirStatus(status);
    const result = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    $("#img-now-status").attr("src", "../../img/avatar_default.jpg");
    $("#name-now-status").html(result[0].nombres + " " + result[0].apellidos);
    $("#contact-now-status").html(result[0].celular);
    $("#status-now").html(template_status);
    $("#crear-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-event .form-create").addClass("modal-show");
    }, 300);
  }
  async function buscar_lotes_by_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_lotes_by_proyecto";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto: id },
        (response) => {
          console.log(response);
          const data =
            response === "no-register" ? false : JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  var lotesListClientes = [];
  // change loteslist del cliente
  $("#lisLotesCliente").on("change", function (e) {
    const lote_id = e.target.value;
    const lote_encontrado = lotesListClientes.find((l) => l.id === lote_id);
    $("#precio_final_lote_cliente").val(lote_encontrado.precio);
  });
  $(document).on("click", "#registerSeguimiento", async function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let status = $(this).attr("statusClient");
    let template_status = imprimirStatus(status);
    const result = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    const lotes = await buscar_lotes_by_proyecto(result[0].proyecto_id);
    console.log(lotes);
    if (lotes !== false) {
      lotesListClientes = lotes;
      let template_lotes = "";
      template_lotes += `
    <option value="0" disabled selected>Seleccione un lote</option>
    `;
      lotes.forEach((l) => {
        if (l.estado !== "DISPONIBLE" && l.estado !== "SIN PUBLICAR") {
          template_lotes += `
        <option disabled value="${l.id}">${l.estado} Lote ${l.numero} Mz:${l.mz_zona} Area: ${l.area}m2 Precio: ${l.precio}</option>
        `;
        } else {
          template_lotes += `
        <option value="${l.id}">${l.estado} Lote ${l.numero} Mz:${l.mz_zona} Area: ${l.area}m2 Precio: ${l.precio}</option>
        `;
        }
      });
      $("#lisLotesCliente").html(template_lotes);
    } else {
      lotesListClientes = [];
    }
    $("#img-now-status").attr("src", "../../img/avatar_default.jpg");
    $("#name-now-status").html(result[0].nombres + " " + result[0].apellidos);
    $("#contact-now-status").html(result[0].celular);
    $("#status-now").html(template_status);
    $("#crear-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-event .form-create").addClass("modal-show");
    }, 300);

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  $(document).on("click", "#removeClient", function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let funcion = "archived_cliente_asesor";
    const confirmed = confirm("Estas seguro de archivar al cliente?");
    if (confirmed) {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        async (response) => {
          if (response.trim() === "archived-user-cliente") {
            alert("Se archivo correctamente");
            await buscar_clientes();
            animarProgress();
          } else {
            alert("Ocurrio un error, contacta al administrador");
          }
        }
      );
    }

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  $("#status-evento").on("change", function (e) {
    let tipo = e.target.value;
    if (
      tipo === "VISITA" ||
      tipo === "REPROGRAMACION CONTACTO" ||
      tipo === "REPROGRAMACION VISITA"
    ) {
      $("#fecha_visita").removeClass("hidden");
      $("#addcalendar").removeClass("hidden");
    } else {
      $("#addcalendar").addClass("hidden");
      $("#fecha_visita").addClass("hidden");
    }
    if (tipo === "SEPARACION" || tipo === "VENTA") {
      $("#sectionlotes").removeClass("hidden");
    } else {
      $("#sectionlotes").addClass("hidden");
    }
  });

  async function verificarAuthorizeCalendar() {
    handleAuthClick();
  }
  $("#registercalendar").on("change", function (e) {
    const ischeck = e.target.checked;
    if (ischeck) {
      verificarAuthorizeCalendar();
    }
  });
  async function registerVisita(fecha, hora, cliente, tipo, pendiente) {
    return new Promise((resolve, reject) => {
      let funcion = "add_visita_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha, hora, cliente, tipo, pendiente },
        (response) => {
          if (response.trim() === "add-register-visita") {
            add_toast("success", "Se registro" + tipo + " correctamente");
            animarProgress();
            resolve();
          } else {
            add_toast("error", "No se registro, contacta al administrador");
            reject({ err: "no se registro, contacta al adminitraor" });
          }
        }
      );
    });
  }
  function register_venta(
    fecha,
    cliente,
    status,
    lote_id,
    precio_final,
    observaciones,
    sede_id
  ) {
    return new Promise((resolve, reject) => {
      let funcion = "register_venta";
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          fecha,
          cliente,
          status,
          lote_id,
          precio_final,
          observaciones,
          sede_id,
        },
        (response) => {
          console.log(response);
          if (response.trim() === "add-register-venta") {
            add_toast("success", "Se registro correctamente la venta");
            resolve();
          } else {
            add_toast("error", "Hubo un error Contacta al administrador");
            reject({ err: response });
          }
        }
      );
    });
  }
  $("#registerFormEvento").submit(async (e) => {
    e.preventDefault();
    $("#register_event_btn").prop("disabled", true);
    console.log(clientesList);
    console.log(idCliente);
    let sede_id = clientesList.find((c) => c.id === idCliente).sede_id;

    let status = $("#status-evento").val();
    let observaciones = $("#observaciones-evento").val();

    if (status !== "0") {
      if (
        status === "VISITA" ||
        status === "REPROGRAMACION CONTACTO" ||
        status === "REPROGRAMACION VISITA"
      ) {
        let pendiente = "PENDIENTE";
        let fecha = $("#date-visita").val();
        let hora = $("#time-visita").val() + ":00";

        const result = clientesList.filter(
          (elemento) => elemento.id === idCliente
        );
        let cliente = result[0].nombres + " " + result[0].apellidos;
        let summary = `${status} - Cliente:${cliente} ${result[0].celular}`;
        let description = `${observaciones} `;
        if (status === "SEPARACION") {
          let fecha_s = dayjs().format("YYYY-MM-DD");
          let hora_s = dayjs().format("HH:mm:ss");
          await registerVisita(
            fecha_s,
            hora_s,
            idCliente,
            status,
            "SEND_VALIDAR"
          );
        } else {
          if (fecha && hora) {
            await registerVisita(fecha, hora, idCliente, status, pendiente);
            if ($("#registercalendar").prop("checked") === true) {
              createCustomEvent(summary, description, fecha, hora);
              $("#addcalendar").addClass("hidden");
            }
            $("#date-visita").val(null);
            $("#time-visita").val(null);
          } else {
            // showToast();
            return;
          }
        }
      } else if (status === "VENTA" || status === "SEPARACION") {
        let lote_id = $("#lisLotesCliente").val();
        let precio_final = $("#precio_final_lote_cliente").val();
        if (Number(lote_id) !== 0) {
          let fecha = dayjs().format("YYYY-MM-DD");
          await register_venta(
            fecha,
            idCliente,
            status,
            lote_id,
            precio_final,
            observaciones,
            sede_id
          );
        } else {
          add_toast("warning", `Debes seleccionar un lote para la ${status}`);
        }
      }

      await seguimiento_cliente(observaciones, idCliente, status);

      let funcion = "buscar_historial_seguimiento";
      await buscar_clientes();
      await buscarHistorial(funcion, idCliente);
      await encontrar_ventas();
      $("#addcalendar").addClass("hidden");
      $("#register_event_btn").prop("disabled", false);
      $("#status-evento").val("0");
      $("#observaciones-evento").val("");
      setTimeout(function () {
        $("#crear-event .form-create").removeClass("modal-show");
      }, 1000);
      $("#crear-event").addClass("md-hidden");
    } else {
      // showToast();
      add_toast("warning", "Debes seleccionar al menos un tipo");

      $("#register_event_btn").prop("disabled", false);
    }
  });

  // registrar lead
  $("#registerLead").submit((e) => {
    e.preventDefault();
    $("#registrar_lead_btn").prop("disabled", true);
    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
    // return 0;
    let sede_id = sedeId;
    let nombre = $("#nombre-lead").val();
    let apellido = $("#apellido-lead").val();
    let documento = $("#documento-lead").val();
    let celular = $("#celular-lead").val();
    let telefono = $("#telefono-lead").val();
    let origen = $("#origen-lead").val();
    let ciudad = $("#ciudad-lead").val();
    let pais = $("#pais-lead").val();
    let campania = $("#campania-lead").val();
    let correo = $("#email-lead").val();
    let proyecto_id = $("#proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
      fecha: fecha_now,
      hora: hora_now,
    };
    console.log(result);
    if (proyecto_id !== "0" && sede_id !== "" && origen !== "0") {
      let funcion = "add_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, sede_id },
        (response) => {
          const data = JSON.parse(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            add_toast("error", data.error);
          } else {
            funcion = "add_user_cliente_asesor";
            add_toast("success", "se subio correctamente el cliente");
            let id = data.id;

            let fecha_now = dayjs().format("YYYY-MM-DD");
            let hora_now = dayjs().format("HH:mm:ss");
            $.post(
              "../../controlador/UsuarioController.php",
              {
                funcion,
                ids_clientes: JSON.stringify([id]),
                fecha_now,
                hora_now,
              },
              async (response) => {
                if (response.trim() == "add-user-cliente") {
                  add_toast("success", "Se asigno cliente al asesor");
                  $("#crear-lead .form-create").removeClass("modal-show");
                  setTimeout(function () {
                    $("#crear-lead").addClass("md-hidden");
                  }, 300);
                  await buscar_clientes();
                  $("#nombre-lead").val("");
                  $("#apellido-lead").val("");
                  $("#documento-lead").val("");
                  $("#celular-lead").val("");
                  $("#telefono-lead").val("");
                  $("#origen-lead").val("");
                  $("#ciudad-lead").val("");
                  $("#pais-lead").val("");
                  $("#campania-lead").val("");
                  $("#email-lead").val("");
                  $("#proyecto-lead").val("");
                } else {
                  add_toast("error", "No se asigno, contacta al administrador");
                }
              }
            );
          }

          $("#registrar_lead_btn").prop("disabled", false);
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar un proyecto y origen");
    }
  });
  const showToast = () => {
    // Muestra el toast agregando la clase "flex" y eliminando la clase "hidden-toast"
    const toast = document.getElementById("toast-warning");
    toast.classList.add("toast-app");
    setTimeout(() => {
      toast.classList.remove("toast-app");
    }, 3000);
  };

  // Función para ocultar el toast al hacer clic en el botón de cerrar
  const hideToast = () => {
    // Oculta el toast agregando la clase "hidden-toast" y eliminando la clase "flex"
    const toast = document.getElementById("toast-warning");
    // toast.classList.add("hidden-toast");
    toast.classList.remove("toast-app");
  };

  // Agrega el evento onclick al botón de cerrar para ocultar el toast
  const closeButton = document.querySelector(
    '#toast-warning [data-dismiss-target="#toast-warning"]'
  );
  closeButton.addEventListener("click", hideToast);

  async function seguimiento_cliente(observacion, cliente, status) {
    return new Promise((resolve, reject) => {
      let funcion = "seguimiento_cliente";
      var fecha = dayjs().format("DD/MM/YYYY");
      var hora = dayjs().format("HH:mm:ss");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, cliente, observacion, status, fecha, hora },
        async (response) => {
          if (response.trim() == "add-register-contact") {
            add_toast("success", "Se registro en el historial");
            await buscar_clientes();
            resolve();
          } else {
            add_toast("error", "Hubo un error contacta con el administrador");
            reject({ err: "Hubo un error contacta con el administrador" });
          }
        }
      );
    });
  }

  // remover etiqueta de lead
  $(document).on("click", "#removeEtiqueta", function () {
    let id_etiqueta = $(this).attr("keyEtiqueta");
    let funcion = "remove_etiqueta_lead";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_etiqueta, cliente: idCliente },
      async (response) => {
        if (response.trim() === "remove-asigned") {
          await buscar_clientes();
          const etiquetas = await buscar_etiquetas_cliente(idCliente);

          let template;
          let etiquetasAsigned = [];
          etiquetas.forEach((etiqueta) => {
            let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
            if (etiqueta.asignado_cliente === "asignado") {
              etiquetasAsigned.push(etiqueta);
              option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
            }
            template += option;
          });
          etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

          $("#etiquetas-user").html(template);
          $("#etiquetas-user").select2({
            allowClear: true,
            placeholder: "Selecciona una etiqueta",
          });
        } else {
          alert("Ocurrio un error, contacta al administrador");
        }
      }
    );
  });

  // modal crear etiqueta
  $("#modal-etiqueta").click(() => {
    $("#crear-etiqueta").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-etiqueta .form-create").addClass("modal-show");
    }, 10);
  });
  $("#crear-etiqueta .close-modal").click(() => {
    $("#crear-etiqueta .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#crear-etiqueta").addClass("md-hidden");
    }, 500);
  });
  $("#registerEtiqueta").submit(function (e) {
    e.preventDefault();
    let nombre = $("#nombre-etiqueta").val();
    if (nombre !== "") {
      let funcion = "add_etiqueta";
      let fecha = dayjs().format("YYYY-MM-DD");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, fecha },
        (response) => {
          if (response.trim() === "add-etiqueta") {
            $("#nombre-etiqueta").val("");
            buscar_etiquetas();
            add_toast("success", "La etiqueta se creo correctamente");
          } else {
            add_toast("error", "Hubo un error contacta con el administrador");
          }
        }
      );
    } else {
      add_toast("warning", "El nombre de la etiqueta no puede estar vacio");
    }
  });
  buscar_etiquetas();
  function buscar_etiquetas() {
    let funcion = "buscar_etiquetas";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        if (response !== "") {
          const etiquetas = JSON.parse(response);
          let template = `<option value="Todos">Todos</option>`;
          etiquetas.forEach((e) => {
            template += `<option value="${e.nombre}">${e.nombre}</option>`;
          });
          $("#filter-etiqueta").html(template);

          dataTableEtiquetas.clear().rows.add(etiquetas).draw();
        }
      }
    );
  }
  function buscar_etiquetas_cliente(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_etiquetas_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const etiquetas = JSON.parse(response);
            resolve(etiquetas);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  $(document).on("click", "#verEtiquetasCliente", async function () {
    let id_cliente = $(this).attr("keyCliente");
    idCliente = id_cliente;
    try {
      const etiquetas = await buscar_etiquetas_cliente(id_cliente);

      let template;
      // let template = `<option value="" selected></option>`;
      let etiquetasAsigned = [];
      etiquetas.forEach((etiqueta) => {
        let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
        if (etiqueta.asignado_cliente === "asignado") {
          etiquetasAsigned.push(etiqueta);
          option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
        }
        template += option;
      });
      etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

      $("#etiquetas-user").html(template);
      $("#etiquetas-user").select2({
        allowClear: true,
        placeholder: "Selecciona una etiqueta",
      });
    } catch (error) {
      console.log(error);
    }
    $("#ver-etiquetas-clientes").removeClass("md-hidden");
    setTimeout(function () {
      $("#ver-etiquetas-clientes .form-create").addClass("modal-show");
    }, 10);
  });
  $("#ver-etiquetas-clientes .close-modal").click(() => {
    $("#ver-etiquetas-clientes .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#ver-etiquetas-clientes").addClass("md-hidden");
    }, 500);
  });
  $("#update-asigned-etiqueta").click(function () {
    let funcion = "update_asigned_etiqueta";
    let etiquetas = $("#etiquetas-user").val();
    let fecha = dayjs().format("YYYY-MM-DD");
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, etiquetas, cliente: idCliente, fecha },
      async (response) => {
        if (response.trim() === "add-etiquetas-lead") {
          alert("Se asigno correctamente");
          await buscar_clientes();
          const etiquetas = await buscar_etiquetas_cliente(idCliente);

          let template;
          // let template = `<option value="" selected></option>`;
          let etiquetasAsigned = [];
          etiquetas.forEach((etiqueta) => {
            let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
            if (etiqueta.asignado_cliente === "asignado") {
              etiquetasAsigned.push(etiqueta);
              option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
            }
            template += option;
          });
          etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

          $("#etiquetas-user").html(template);
          $("#etiquetas-user").select2({
            allowClear: true,
            placeholder: "Selecciona una etiqueta",
          });
        } else {
          alert("Hubo un error contacta con el administrador");
          console.log(response);
        }
      }
    );
  });
  // -----------------------------------------------

  $("#crear-event .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#crear-event .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-event").addClass("md-hidden");
    }, 300);
  });
  $("#historial-event .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#historial-event .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#historial-event").addClass("md-hidden");
    }, 300);
  });
  $("#crear-lead .form-create .close-modal").click(() => {
    $("#crear-lead .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-lead").addClass("md-hidden");
    }, 300);
  });
  $("#editar-lead .form-create .close-modal").click(() => {
    $("#editar-lead").addClass("md-hidden");
    $("#editar-lead .form-create").removeClass("modal-show");
  });
  // fin de presentation modal
});
