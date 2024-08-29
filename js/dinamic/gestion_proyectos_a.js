$(document).ready(async function () {
  var idProyecto;
  var nombreProyecto;
  var descriptionProyecto;
  var changedescriptionProyecto;
  var dominio = "https://appsire.mcsolucionesti.com";
  // var dominio = "https://lotizador.vivelainmobiliaria.pe";
  // url video variables
  var videoProyecto;
  var changevideoProyecto;
  var mapsProyecto;
  var changemapsProyecto;
  var proyectosList = [];
  var logoFile;
  var funcion = "";
  var imagenesCargadas = [];
  var dataTable = $("#proyectosList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],

    columns: [
      {
        data: null,
        render: function (data, type, row) {
          return `
          <span class="font-bold text-sm inline-block text-black">${data.nombre_proyecto}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let sedes = data.sedes;
          let template = "";
          template += `<div class="w-[400px] grid gap-2 grid-cols-3">`;
          sedes.forEach((s) => {
            template += `<div class="w-full">
            <span class="px-2 py-1 rounded-full bg-yellow-300 font-bold text-sm inline-block text-black">${s.name_reference}</span> <br/> ${s.direccion}</div>
            `;
          });
          template += `</div>`;
          return template;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<span class="mode mode_on">${data.proyect_status}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">   
          <a target="_blank" href="lotizador?id=${data.id}" class="btnLotes"> Ver lotes </a>
          <button target="_blank" keyProyect="${dominio}/views/Lotizador/Clientes/?proyect=${data.id}" id="rutaEnlace" class="btnLotes"> Copiar Link </button>
          <button id="manager_lotes" key_proyect=${data.id} name="${data.nombreProyecto} type="button" class="p-2 whitespace-nowrap text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Administrar Lotes</button>
<a target="_blank" class="btnJsvm default" key="${data.id}" href="./schemalotizador.php?proyect=${data.id}">PDF <ion-icon name="document-text-outline"></ion-icon></a>
             <button key="${data.id}" id="change_settings"><ion-icon name="settings"></ion-icon></button>   
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

  var dataTableLotes = $("#managerLotesList").DataTable({
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
      { data: "numero" },
      { data: "mz_zona" },
      { data: "ancho" },
      { data: "largo" },
      { data: "area" },
      { data: "costo" },
      { data: "precio" },
      { data: "estado" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button key_lote="${data.id}" id="editLote" type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"><ion-icon name="create"></ion-icon></button>
          
          <button id="saveLote" keyLote=${data.id} type="button" style="display: none;" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
          
          <button id="cancelLote" type="button" style="display: none;" class="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>

          
          </div>

          `;
        },
      },
    ],
  });
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
  function pintar_sedes(sedes) {
    let template = "";
    template += `
    <option value="" disabled>Seleccione una sede</option>
    <option value="Todas" >Todas</option>
    `;
    sedes.forEach((s) => {
      template += `
      <option value="${s.id}">${s.name_reference} ${s.direccion}-${s.ciudad}</option>
      
      `;
    });
    $("#sedesList").html(template);
  }
  var sedes = await buscar_sedes_by_usuario();
  pintar_sedes(sedes);
  $("#sedesList").on("change", function (e) {
    let sede_id = e.target.value;
    console.log(sede_id);
    let filter_proyectos;
    if (sede_id === "Todas") {
      let proyectosReestructurados = reestructurar_proyectos(proyectosList);
      filter_proyectos = proyectosReestructurados;
    } else {
      let proyectos_prev_filter = proyectosList.filter(
        (p) => p.sede_id === sede_id
      );
      console.log(proyectos_prev_filter);
      filter_proyectos = reestructurar_proyectos(proyectos_prev_filter);
    }
    pintar_proyectos(filter_proyectos);
  });

  // change logo
  $(document).on("click", "#edit-logo", function () {
    $("#upload_logo").click();
  });
  $("#upload_logo").change(function (e) {
    var file = e.target.files[0];
    if (file) {
      // Verifica si el tamaño del archivo es mayor que 10 MB (10 * 1024 * 1024 bytes)
      if (file.size > 15 * 1024 * 1024) {
        add_toast(
          "warning",
          "La imagen seleccionada supera los 15 MB. Por favor, elija una imagen más pequeña."
        );
        // Restablece el valor del input de tipo "file"
        $("#upload_logo").val("");
      } else {
        logoFile = file;
        mostrarVistaPrevia(file);
      }
    }
  });
  function mostrarVistaPrevia(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#edit-logo").remove();
        // $("#portada_overlay").html(
        //   `<img class="rounded-lg object-cover w-full h-full dark:ring-gray-500" src="${e.target.result}" alt="rofile picture">`
        // );
        $("#logo-preview").attr("src", e.target.result);
        $("#content-logo").append(
          ` <div id="botones-event" class="flex ml-3 items-center gap-3">
          <button id="save_img_perfil" class="p-2 rounded-lg text-[10px] inline-block max-h-max text-white bg-success">Guardar</button>
          <button id="cancelar_img_perfil" class="p-2 rounded-lg border-1 border-[#ececec] text-[10px] inline-block max-h-max bg-white text-gray-500">Cancelar</button>
      </div>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  // $("#save_img_perfil, #cancelar_img_perfi")
  $(document).on("click", "#save_img_perfil", function () {
    if (
      idProyecto !== "" ||
      (idProyecto !== undefined && logoFile !== "") ||
      logoFile !== null
    ) {
      console.log(idProyecto);
      console.log("si tiene info del logo como el id del proyecto");
      let result;
      if (logo !== "") {
        result = updateImagenLogo(logo, logoFile);
      } else {
        result = enviarImagen(logoFile);
      }
      result
        .then((ruta) => {
          console.log(ruta);
          let funcion = "update_img_proyect";
          $.post(
            "../../controlador/UsuarioController.php",
            { funcion, ruta, id: idProyecto },
            (response) => {
              console.log(response);
              if (response.trim() === "update-sucess") {
                add_toast("success", "Se cambio el logo correctamente");
                $("#content-avatar-logo").append(
                  `<span id="edit-logo" class="bottom-0 cursor-pointer left-7 absolute flex items-center jutify-center  w-[30px] h-[30px] bg-[#ffde00] border-2 border-white dark:border-gray-800 rounded-full">
                                            <ion-icon class="w-full" aria-hidden="true" name="create"></ion-icon>
            
                                        </span>
                  `
                );

                $("#botones-event").remove();
              } else {
                add_toast("error", "Hubo un error contacta al administrador");
                console.log(error);
              }
            }
          );
        })
        .catch((error) => console.log(error));
    } else {
      console.log("No tiene");
    }
  });
  $(document).on("click", "#cancelar_img_perfil", function () {
    if (logo !== "") {
      $("#content-avatar-logo").html(
        `
        <img id="logo-preview" class="w-[60px] h-[60px] rounded-full object-cover" src="../../${logo}" alt="logo_proyect">
                              <span id="edit-logo" class="bottom-0 cursor-pointer left-7 absolute flex items-center jutify-center  w-[30px] h-[30px] bg-[#ffde00] border-2 border-white dark:border-gray-800 rounded-full">
                                  <ion-icon class="w-full" aria-hidden="true" name="create"></ion-icon>
  
                              </span>
        `
      );
    } else {
      $("#content-avatar-logo").html(
        `
        <img id="logo-preview" class="w-[60px] h-[60px] rounded-full object-cover" src="../../img/avatar_default.jpg" alt="logo_proyect">
                              <span id="edit-logo" class="bottom-0 cursor-pointer left-7 absolute flex items-center jutify-center  w-[30px] h-[30px] bg-[#ffde00] border-2 border-white dark:border-gray-800 rounded-full">
                                  <ion-icon class="w-full" aria-hidden="true" name="create"></ion-icon>
  
                              </span>
        `
      );
    }
    $("#botones-event").remove();
    $("#upload_logo").val("");
  });
  function updateImagenLogo(route, file) {
    return new Promise((resolve, reject) => {
      const funcion = "update_logo_proyecto";
      const formData = new FormData();
      formData.append("funcion", funcion);
      formData.append("route", route);
      formData.append("targetimagenupdate", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  function enviarImagen(file) {
    return new Promise((resolve, reject) => {
      const carpeta = "logos";
      const formData = new FormData();
      formData.append("carpeta", carpeta);
      formData.append("targetimagen", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  function fetchMultimediaProyecto(id) {
    let funcion = "multimedia_proyecto";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]); // Resolvemos la promesa con un array vacío
          } else {
            const multimedia = JSON.parse(response);
            resolve(multimedia); // Resolvemos la promesa con los datos obtenidos
          }
        }
      ).fail((error) => {
        reject(error); // En caso de error, rechazamos la promesa con el error
      });
    });
  }
  var logo = "";
  var multimedia = [];
  function pintarMultimediaProeyctos() {
    if (logo !== "") {
      $("#logo-preview").attr("src", "../../" + logo);
    } else {
      $("#logo-preview").attr("src", "../../img/avatar_default.jpg");
    }
    console.log(multimedia);
    if (multimedia.length > 0) {
      let template = `
      <div>
      <div id="drag-gallery" class="p-3 h-full cursor-pointer justify-center items-center rounded-lg border-2 border-dashed border-[#ececec] flex flex-col gap-3">
          <ion-icon name="add-outline" class="font-bold"></ion-icon>
          <span class="text-sm text-center font-bold">Agregar fotos</span>
      </div>
      <input accept="image/*" multiple type="file" class="hidden" id="upload-gallery">
  </div>`;

      multimedia.reverse().forEach((multimedia) => {
        template += `
      <div class="image-container flex items-center justify-center border-1 border-gray-100">
        <div class="overlay">
        <button data-id="${multimedia.id}" class="text-[8px] eliminar_multimedia rounded px-1 py-1"><ion-icon name="trash"></ion-icon></button>
        </div>
      <img class="h-[100px] w-full object-center object-cover rounded-lg" src="../../${multimedia.url}" alt="">
      </div>
      `;
      });
      $("#multimedia_photos_preview").html(template);
    } else {
      let template = `
      <div>
      <div id="drag-gallery" class="p-3 cursor-pointer justify-center items-center rounded-lg border-2 border-dashed border-[#ececec] flex flex-col gap-3">
          <ion-icon name="add-outline" class="font-bold"></ion-icon>
          <span class="text-sm text-center font-bold">Agregar fotos</span>
      </div>
      <input accept="image/*" multiple type="file" class="hidden" id="upload-gallery">
  </div>
        `;
      $("#multimedia_photos_preview").html(template);
    }
    $("#modal-manager-proyect").removeClass("md-hidden");
    setTimeout(function () {
      $("#modal-manager-proyect .form-create").addClass("modal-show");
    }, 10);
  }
  $(document).on("click", ".eliminar_multimedia", function () {
    let id_img = $(this).attr("data-id");
    console.log(id_img);
    let funcion = "eliminar_img";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: id_img },
      (response) => {
        console.log(response);
        if (response.trim() === "deleted-success") {
          add_toast("success", "Imagen eliminada");
          multimedia = multimedia.filter(function (img) {
            return img.id !== id_img;
          });
          pintarMultimediaProeyctos();
        } else {
          add_toast("error", "Hubo un error contacta al administrador");
        }
      }
    );
  });
  // change setting logo y galery
  $(document).on("click", "#change_settings", function () {
    var id = $(this).attr("key");
    idProyecto = id;
    const proyecto = proyectosList.find((e) => e.id == id);
    console.log(proyecto);
    nombreProyecto = proyecto.nombreProyecto;
    // description module agregado recientemente
    descriptionProyecto =
      proyecto.description !== null && proyecto.description !== ""
        ? proyecto.description
        : "";
    changedescriptionProyecto =
      proyecto.description !== null && proyecto.description !== ""
        ? proyecto.description
        : "";
    // video module agregado recientemente
    videoProyecto =
      proyecto.video_url !== null && proyecto.video_url !== ""
        ? proyecto.video_url
        : "";
    changevideoProyecto =
      proyecto.video_url !== null && proyecto.video_url !== ""
        ? proyecto.video_url
        : "";
    // maps module agregado recientemente
    mapsProyecto =
      proyecto.maps_url !== null && proyecto.maps_url !== ""
        ? proyecto.maps_url
        : "";
    changemapsProyecto =
      proyecto.maps_url !== null && proyecto.maps_url !== ""
        ? proyecto.maps_url
        : "";
    if (changevideoProyecto !== "") {
      let codigovideo = obtenerCodigoVideo(changevideoProyecto);
      let videosrc = construirURLDeEmbed(codigovideo);
      $("#iframeVideoY").attr("src", videosrc);
      $("#iframeVideoY").removeClass("hidden");
    } else {
      $("#iframeVideoY").addClass("hidden");
      $("#iframeVideoY").attr("src", "");
    }
    $("#description-proyect").val(proyecto.description);
    $("#videoUrlProyecto").val(proyecto.video_url);
    $("#mapsUrlProyecto").val(proyecto.maps_url);
    let resultado = fetchMultimediaProyecto(id);
    resultado
      .then((response) => {
        let contenido = response;
        if (contenido.logo !== "") {
          logo = contenido.logo;
        } else {
          logo = "";
        }
        if (contenido.multimedia.length > 0) {
          multimedia = contenido.multimedia;
        } else {
          multimedia = [];
        }
        pintarMultimediaProeyctos();
      })
      .catch((error) => console.log(error));
  });

  // cambios para description del proyecto
  $("#description-proyect").on("change, keyup", function (e) {
    let valor = e.target.value;
    changedescriptionProyecto = valor;
    console.log(descriptionProyecto);
    console.log(changedescriptionProyecto);

    if (descriptionProyecto !== changedescriptionProyecto) {
      $("#viewbuttonsdescription").removeClass("hidden");
    } else {
      $("#viewbuttonsdescription").addClass("hidden");
    }
  });
  $("#cancelardescription").click(function () {
    $("#description-proyect").val(descriptionProyecto);
    changedescriptionProyecto == descriptionProyecto;

    $("#viewbuttonsdescription").addClass("hidden");
  });
  $("#savedescription").click(function () {
    let valor = $("#description-proyect").val();
    let funcion = "subir_description_proyect";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: idProyecto, description: valor },
      (response) => {
        if (response.trim() === "update-sucess") {
          add_toast(
            "success",
            "Se actualizo correctamente la descripcion del proyecto"
          );
          descriptionProyecto = valor;
          changedescriptionProyecto = valor;
          $("#viewbuttonsdescription").addClass("hidden");
        } else {
          console.log(response);
        }
      }
    );
  });
  // cambios para maps del proyecto
  $("#mapsUrlProyecto").on("change, keyup", function (e) {
    let valor = e.target.value;
    changemapsProyecto = valor;

    if (mapsProyecto !== changemapsProyecto) {
      $("#viewbuttonsmaps").removeClass("hidden");
    } else {
      $("#viewbuttonsmaps").addClass("hidden");
    }
  });
  $("#cancelarmaps").click(function () {
    $("#mapsUrlProyecto").val(mapsProyecto);
    changemapsProyecto == mapsProyecto;

    $("#viewbuttonsmaps").addClass("hidden");
  });
  $("#savemaps").click(function () {
    let valor = $("#mapsUrlProyecto").val();
    let funcion = "subir_maps_proyect";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: idProyecto, maps_url: valor },
      (response) => {
        if (response.trim() === "update-sucess") {
          add_toast(
            "success",
            "Se actualizo correctamente el link de Google maps del proyecto"
          );
          mapsProyecto = valor;
          changemapsProyecto = valor;
          $("#viewbuttonsmaps").addClass("hidden");
        } else {
          console.log(response);
        }
      }
    );
  });
  // cambios para video url del proyecto
  $("#videoUrlProyecto").on("change, keyup", function (e) {
    let valor = e.target.value;
    changevideoProyecto = valor;
    console.log(videoProyecto);
    console.log(changevideoProyecto);

    if (videoProyecto !== changevideoProyecto) {
      if (changevideoProyecto !== "") {
        let codigovideo = obtenerCodigoVideo(valor);
        let videosrc = construirURLDeEmbed(codigovideo);

        $("#iframeVideoY").attr("src", videosrc);
        $("#iframeVideoY").removeClass("hidden");
      } else {
        $("#iframeVideoY").attr("src", "");
        $("#iframeVideoY").addClass("hidden");
      }
      $("#viewbuttonsvideo").removeClass("hidden");
    } else {
      $("#viewbuttonsvideo").addClass("hidden");
    }
  });
  $("#cancelarvideo").click(function () {
    $("#videoUrlProyecto").val(videoProyecto);

    $("#iframeVideoY").attr("src", "");
    changevideoProyecto == videoProyecto;

    $("#viewbuttonsvideo").addClass("hidden");
  });
  $("#savevideo").click(function () {
    let valor = $("#videoUrlProyecto").val();
    let funcion = "subir_video_proyect";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id: idProyecto, video: valor },
      (response) => {
        if (response.trim() === "update-sucess") {
          add_toast(
            "success",
            "Se actualizo correctamente el url del video del proyecto"
          );
          videoProyecto = valor;
          changevideoProyecto = valor;
          $("#viewbuttonsvideo").addClass("hidden");
        } else {
          console.log(response);
        }
      }
    );
  });

  $("#modal-manager-proyect .close-modal").click(function () {
    $("#modal-manager-proyect .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-manager-proyect").addClass("md-hidden");
    }, 300);
  });
  // subir fotos
  $(document).on("click", "#drag-gallery", function () {
    $("#upload-gallery").click();
  });
  $(document).on("change", "#upload-gallery", function (e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Aquí puedes llamar a la función para procesar la imagen, por ejemplo:
      preMostrarGallery(file);
    }
    $("#botones-event-gallery").removeClass("hidden");
  });
  // cancelare y guardar gallery
  $(document).on("click", "#save_img_gallery", function () {
    $("#change_load_imagenes").removeClass("hidden");
    let result = subirImagenesGallery(nombreProyecto);
    result
      .then((gallery) => {
        let funcion = "subirimagenesgallery";
        console.log(gallery);
        const galeria = JSON.parse(gallery);
        console.log(galeria);
        $.post(
          "../../controlador/UsuarioController.php",
          {
            funcion,
            id: idProyecto,
            galeria,
          },
          (response) => {
            $("#change_load_imagenes").addClass("hidden");
            if (response.trim() == "create-sucess") {
              add_toast("success", "se subieron todas las imagenes");
              imagenesCargadas = [];
              $(".image-card>span").remove();

              $("#botones-event-gallery").addClass("hidden");
            } else {
              add_toast("error", "ocurrio un error, contacta a soporte");
              console.log(response);
            }
          }
        );
      })
      .catch((error) => console.log(error));
  });
  $(document).on("click", "#cancelar_img_gallery", function () {
    console.log(imagenesCargadas);
    imagenesCargadas = [];
    $(".image-card").remove();
    $("#botones-event-gallery").addClass("hidden");
    console.log(imagenesCargadas);
  });

  // fin de cancelar y guiardar gallery
  function preMostrarGallery(file) {
    const imagePreviews = $("#multimedia_photos_preview");
    var reader = new FileReader();
    const index = imagenesCargadas.length;
    reader.onload = function (e) {
      let template = "";
      template += `      
        <div class="flex items-center justify-center border-1 border-gray-100 relative image-card">
            <img class="h-auto max-w-full rounded-lg" src=${e.target.result} alt="">
            <span class="cursor-pointer z-[5000] eliminar-gallery absolute top-0 right-0 p-1 bg-[#f00] leading-1 text-white" data-index="${index}">&times;</span>
        </div>
        `;
      // imagePreviews.insertBefore(template, imagePreviews.firstChild);
      const firstChild = imagePreviews.children().eq(0);
      firstChild.after(template);
      imagenesCargadas.push(file);
    };
    reader.readAsDataURL(file);
  }
  // eliminar gallery index
  $(document).on("click", ".eliminar-gallery", function () {
    let template = "";
    const count = imagenesCargadas.length;
    console.log(count);

    const index = $(this).data("index");
    imagenesCargadas.splice(index, 1);
    $(this).closest(".image-card").remove();
  });
  function subirImagenesGallery(proyecto_nombre) {
    return new Promise((resolve, reject) => {
      const carpeta = "multimedia";
      const formData = new FormData();

      for (let i = 0; i < imagenesCargadas.length; i++) {
        formData.append("imagengallery[]", imagenesCargadas[i]);
      }
      formData.append("carpeta", carpeta);
      formData.append("proyecto", proyecto_nombre);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  // fin de subir fotos de galeria

  $(document).on("click", "#editLote", function () {
    var row = $(this).closest("tr");
    console.log(row);
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = [];
    cells.each(function (index) {
      if (index === 7) {
        // Índice 4 corresponde al campo "estado"
        var currentValue = $(this).text().trim();
        var selectOptions = [
          "DISPONIBLE",
          "SEPARADO",
          "OCUPADO",
          "SIN PUBLICAR",
        ];
        var selectHTML = `<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        `;
        for (var i = 0; i < selectOptions.length; i++) {
          var option = selectOptions[i];
          var selected = option === currentValue ? "selected" : "";
          selectHTML += "<option " + selected + ">" + option + "</option>";
        }
        selectHTML += "</select>";
        originalValues.push(currentValue);
        $(this).html(selectHTML);
      } else {
        var text = $(this).text();
        $(this).html(`
        <input value="${text}" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
        `);
        originalValues.push(text);
      }
    });

    // Alternar la visibilidad de los botones "Editar" y "Guardar"
    row.find("#editLote").hide();
    row.find("#saveLote").show();
    row.find("#cancelLote").show();

    // Guardar los valores originales para el botón "Cancelar"
    row.data("originalValues", originalValues);

    let id_lote = $(this).attr("key_lote");
    console.log(id_lote);
    const result = lotesArray.find((e) => e.id === id_lote);
    console.log(result);
  });
  // Cuando se hace clic en el botón "Cancelar"
  $(document).on("click", "#cancelLote", function () {
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = row.data("originalValues");
    console.log(originalValues);

    cells.each(function (index) {
      var originalValue = originalValues[index];
      $(this).text(originalValue);
    });

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    row.find("#editLote").show();
    row.find("#saveLote").hide();
    row.find("#cancelLote").hide();
  });

  // Cuando se hace clic en el botón "Guardar"
  $(document).on("click", "#saveLote", function () {
    var idLote = $(this).attr("keyLote");
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"

    var data = {};
    cells.each(function (index) {
      if (index === 7) {
        // Índice 4 corresponde al campo "estado"
        var selectedValue = $(this).find("select").val();
        data["estado"] = selectedValue;
        // $(this).text(selectedValue);
      } else {
        var fieldName = [
          "numero",
          "mz_zona",
          "ancho",
          "largo",
          "area",
          "costo",
          "precio",
        ][index];
        var inputValue = $(this).find("input").val();
        console.log(inputValue);
        data[fieldName] = inputValue;
        // $(this).text(inputValue);
      }
    });
    data.id = idLote;
    console.log(data);

    // Realizar la petición POST para guardar los cambios en la base de datos
    let funcion = "editar_lote_info";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, data: JSON.stringify(data) },
      (response) => {
        console.log(response);
        if (response.trim() === "edit-sucess") {
          cells.each(function (index) {
            if (index === 7) {
              // Índice 4 corresponde al campo "estado"
              var selectedValue = $(this).find("select").val();
              $(this).text(selectedValue);
            } else {
              var inputValue = $(this).find("input").val();
              $(this).text(inputValue);
            }
          });
          row.find("#editLote").show();
          row.find("#saveLote").hide();
          row.find("#cancelLote").hide();
        } else {
          add_toast(
            "error",
            "No se pudo actualizar, contacta al administrador"
          );
        }
      }
    );

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    // row.find("#editLote").show();
    // row.find("#saveLote").hide();
    // row.find("#cancelLote").hide();
  });

  function buscar_lotes(id_proyecto) {
    let funcion = "buscar_lotes_by_proyecto";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]); // Resolvemos la promesa con un array vacío
          } else {
            const proyectos = JSON.parse(response);
            resolve(proyectos); // Resolvemos la promesa con los datos obtenidos
          }
        }
      ).fail((error) => {
        reject(error); // En caso de error, rechazamos la promesa con el error
      });
    });
  }

  $(document).on("click", "#manager_lotes", async function () {
    id_proyecto = $(this).attr("key_proyect");
    let nombre = $(this).attr("name");
    $("#nombre_proyecto_lotes").html(nombre);
    // console.log(id_proyecto);
    try {
      const lotes = await buscar_lotes(id_proyecto);
      console.log(lotes);
      lotesArray = lotes;
      if (lotes.length > 0) {
        $("#modal-manager-lotes").removeClass("md-hidden");
        setTimeout(function () {
          $("#modal-manager-lotes .form-create").addClass("modal-show");
        }, 10);
        dataTableLotes.clear().rows.add(lotes).draw();
      } else {
        add_toast("warning", "Aun no hay lotes registrados");
      }
    } catch (error) {
      console.error("Error al buscar lotes:", error);
      // Manejo de errores aquí
    }
  });
  // EDIT LOTES MODAL
  $("#modal-manager-lotes .close-modal").click(() => {
    $("#modal-manager-lotes .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-manager-lotes").addClass("md-hidden");
    }, 300);
  });
  // ---------
  buscar_proyectos();
  function buscar_proyectos() {
    funcion = "buscar_proyectos_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() == "no-register") {
          template += "<td>No hay registros</td>";
        } else {
          const proyectos = JSON.parse(response);
          // Reestructurar los proyectos para consolidar las sedes
          let proyectosReestructurados = reestructurar_proyectos(proyectos);

          proyectosList = proyectos;
          // console.log(proyectos);
          dataTable.clear().rows.add(proyectosReestructurados).draw();
        }
      }
    );
  }
  function reestructurar_proyectos(proyectos) {
    const proyectosReestructurados = proyectos.reduce((acc, proyecto) => {
      // Buscar si el proyecto ya está en el acumulador
      let proyectoExistente = acc.find((p) => p.id === proyecto.id);

      if (proyectoExistente) {
        // Si el proyecto ya existe, agregar la nueva sede al array de sedes
        proyectoExistente.sedes.push({
          sede_id: proyecto.sede_id,
          ciudad: proyecto.ciudad,
          direccion: proyecto.direccion,
          name_reference: proyecto.name_reference,
        });
      } else {
        // Si el proyecto no existe, crear un nuevo objeto de proyecto con el array de sedes
        acc.push({
          ...proyecto,
          sedes: [
            {
              sede_id: proyecto.sede_id,
              ciudad: proyecto.ciudad,
              direccion: proyecto.direccion,
              name_reference: proyecto.name_reference,
            },
          ],
        });
      }

      return acc;
    }, []);
    return proyectosReestructurados;
  }
  function pintar_proyectos(proyectos) {
    dataTable.clear().rows.add(proyectos).draw();
  }
  $(document).on("click", "#rutaEnlace", function (event) {
    event.preventDefault(); // Evita la acción de navegación predeterminada

    // Copiar la ruta al portapapeles
    var ruta = $(this).attr("keyProyect");
    var btn = $(this);
    console.log($(this));
    navigator.clipboard
      .writeText(ruta)
      .then(function () {
        // alert("La ruta se ha copiado al portapapeles.");
        $(btn).text("Copiado!");
        $(btn).addClass("success");
        setTimeout(function () {
          $(btn).text("Copiar Link");
          $(btn).removeClass("success");
        }, 3000);
      })
      .catch(function (error) {
        console.error("Error al copiar la ruta: ", error);
      });
  });
  // Función para extraer el código del video de la URL original
  function obtenerCodigoVideo(url) {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v\/|.*&v=|.*embed\/|.*be\/|.*watch\?v=))([^"&?\/\s]{11})/
    );
    return match && match[1] ? match[1] : null;
  }

  // Función para construir la URL de embed
  function construirURLDeEmbed(codigoVideo) {
    return `https://www.youtube.com/embed/${codigoVideo}`;
  }

  // URL original del video
  // const urlOriginal =
  //   "https://www.youtube.com/watch?v=LpTdmXOfORs&ab_channel=SayianJimmy";
  const urlOriginal = "https://youtu.be/JRhP2M2YodM";

  // Extraer el código del video
  const codigoVideo = obtenerCodigoVideo(urlOriginal);

  // Construir la URL de embed
  const urlEmbed = construirURLDeEmbed(codigoVideo);
  console.log(urlEmbed);
});
