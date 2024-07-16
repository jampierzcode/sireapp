$(document).ready(async function () {
  var listEmpresas = [];
  // manage proyectos
  $(document).on("click", "#manage-proyecto", async function (e) {
    let empresa_id = $(this).attr("keyEmpresa");
    let proyectos = await buscar_proyectos_by_empresa(empresa_id);
    console.log(proyectos);
    $("#modal-manager-proyectos").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal-manager-proyectos .form-create").addClass("modal-show");
    }, 300);
  });
  async function buscar_empresas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_empresas";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            listEmpresas = [];
          } else {
            let data = JSON.parse(response);
            resolve(data);
            listEmpresas = data;
          }
        }
      );
    });
  }
  async function buscar_proyectos_by_empresa(empresa_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_by_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, empresa_id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_sedes_by_empresa(empresa_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, empresa_id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
        }
      );
    });
  }

  function pintar_empresas(empresas, indice) {
    let template = "";
    empresas.forEach((e, index) => {
      template += `
        <div key="${index}" data-id="${
        e.id
      }" class="item-empresa w-full px-4 py-3 rounded  cursor-pointer ${
        indice === index
          ? "bg-[#e9e4ff] text-[#310ecd]"
          : "bg-gray-100 text-gray-900"
      }">
            <div class="flex items-center gap-4">
                <img class="rounded h-8 w-8 object-contain" src="../../${
                  e.logo
                }" alt="${e.nombre_razon}">
                <p class="font-bold text-sm">${e.nombre_razon}</p>
            </div>
        </div>
        `;
    });
    $("#empresasList").html(template);
  }
  $(document).on("click", ".item-empresa", function () {
    var empresa_id = $(this).data("id");
    $(".item-empresa").removeClass("bg-[#e9e4ff] text-[#310ecd]");
    $(".item-empresa").addClass("bg-gray-100 text-gray-900");
    $(this).removeClass("text-gray-900");
    $(this).addClass("bg-[#e9e4ff] text-[#310ecd]");
    console.log(empresa_id);
    var empresa_activa = listEmpresas.find((e) => e.id === String(empresa_id));
    console.log(empresa_activa);
    pintar_empresa_activa(empresa_activa);
  });
  function pintar_sedes(sedes) {
    let template = "";
    if (sedes.length > 0) {
      sedes.forEach((s, index) => {
        template += `
          <div key="${index} data-id="${s.id}" class="w-full px-4 py-3 rounded bg-gray-50">
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <p class="font-bold text-sm">${s.name_reference}</p>
                  <p class="font-normal text-sm">${s.direccion}</p>
                  <p class="font-normal text-sm">${s.phone_contact}</p>
                  <p class="font-normal text-sm">${s.ciudad}</p>
                </div>
                <button class="px-3 py-2 rounded bg-gray-100 text-sm font-bold">Editar</button>
              </div>
          </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de una sede, cree una nueva</p>`;
    }
    $("#sedesListEmpresa").html(template);
    // $(".container_proyectos").addClass("hidden");
    // $(".container_sedes").removeClass("hidden");
  }
  function pintar_proyectos(proyectos) {
    let template = "";
    if (proyectos.length > 0) {
      proyectos.forEach((p, index) => {
        template += `
        <div key="${index} data-id="${p.id}" class="w-full px-4 py-3 rounded bg-gray-50 text-gray-900">
        <div class="flex items-center gap-4">
        <img class="h-8 w-8 object-contain" src="../../${p.logo}" />
        <div class="w-full overflow-hidden">
        <p class="font-bold text-sm">${p.nombreproyecto}</p>
        <p class="font-normal text-sm overflow-hidden text-ellipsis whitespace-nowrap">${p?.description}</p>
        </div>
        <div>
        <button class="px-3 py-2 rounded bg-gray-100 text-sm font-bold">Editar</button>
        </div>
        </div>
        </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de un proyecto, cree uno nuevo</p>`;
    }
    $("#proyectosListEmpresa").html(template);
    // $(".container_sedes").addClass("hidden");
    // $(".container_proyectos").removeClass("hidden");
  }
  async function pintar_empresa_activa(empresa) {
    let template = "";
    template += `
    <img class="rounded h-12 w-12 object-contain" src="../../${empresa.logo}" alt="">
    <div class="w-full">
    <div class="flex gap-4 justify-bettween items-center">
    <div>
        <p class="font-bold text-sm">${empresa.nombre_razon}</p>
        <p class="font-bold text-sm">Email: <span class="font-normal text-sm">${empresa.email}</span></p>
        <p class="font-bold text-sm">Sitio Web: <span class="font-normal text-sm">${empresa.website}</span></p>
        </div>
        
        <div class="flex gap-4">
            <button data-id="${empresa.id}" id="edit_empresa" class="bg-white inline-block font-bold rounded inline-flex px-3 py-2 text-sm">Editar</button>
        </div>
    </div>
    `;
    $("#datos_empresa").html(template);
    $("#datos_empresa").attr("key_business", empresa.id);
    let sedes = await buscar_sedes_by_empresa(empresa.id);

    let proyectos = await buscar_proyectos_by_empresa(empresa.id);

    pintar_sedes(sedes);
    pintar_proyectos(proyectos);
  }
  var tabs = document.querySelectorAll(".tab_btn");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((tab) => {
        tab.classList.remove("text-[#310ecd]");
      });
      tab.classList.remove("text-gray-500");
      tab.classList.add("text-[#310ecd]");
      var line = document.querySelector(".line");
      line.style.width = e.target.offsetWidth + "px";
      line.style.left = e.target.offsetLeft + "px";
    });
  });
  var empresas = await buscar_empresas();
  console.log(empresas);
  empresas.sort((a, b) => dayjs(b.fecha).diff(dayjs(a.fecha)));
  //   var cronograma = await buscar_cronograma_pagos();
  pintar_empresas(empresas, 0);
  pintar_empresa_activa(empresas[0]);
  $(".container_proyectos").addClass("hidden");
  $(".container_sedes").removeClass("hidden");

  // TABS CLICKS
  $("#proyectosBtn").on("click", async function () {
    let empresa_id = $("#datos_empresa").attr("key_business");
    let proyectos = await buscar_proyectos_by_empresa(empresa_id);
    $(".container_sedes").addClass("hidden");
    $(".container_proyectos").removeClass("hidden");

    pintar_proyectos(proyectos);
  });
  $("#sedesBtn").on("click", async function () {
    let empresa_id = $("#datos_empresa").attr("key_business");
    let sedes = await buscar_sedes_by_empresa(empresa_id);
    $(".container_proyectos").addClass("hidden");
    $(".container_sedes").removeClass("hidden");

    pintar_sedes(sedes);
  });
  // FINDE TABS CLICKS
  // MODAL SEDES
  function resetear_values_sede() {
    $("#namereference_sede").val("");
    $("#direction_sede").val("");
    $("#phonecontact_sede").val("");
    $("#ciudad_sede").val("");
    $("#googlemaps_sede").val("");
  }
  $("#newSede").on("click", function () {
    // resetear valores
    resetear_values_sede();
    $("#modal_sede").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_sede .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal_sede .close-modal").on("click", function () {
    // resetear valores
    resetear_values_sede();
    $("#modal_sede .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_sede").addClass("md-hidden");
    }, 300);
  });
  async function registrar_sede(data_sede) {
    return new Promise((resolve, reject) => {
      let funcion = "register_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, data: JSON.stringify(data_sede) },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  $("#registrar_sede").on("click", async function () {
    let empresa_id = $("#datos_empresa").attr("key_business");
    let name_reference = $("#namereference_sede").val();
    let direccion = $("#direction_sede").val();
    let phone_contact = $("#phonecontact_sede").val();
    let ciudad = $("#ciudad_sede").val();
    let ubicacion_google = $("#googlemaps_sede").val();
    if (
      empresa_id &&
      empresa_id !== "" &&
      name_reference !== "" &&
      direccion !== "" &&
      phone_contact !== "" &&
      ciudad !== "" &&
      ubicacion_google !== ""
    ) {
      let data_sede = {
        empresa_id,
        name_reference,
        direccion,
        phone_contact,
        ciudad,
        ubicacion_google,
      };
      let send_sede = await registrar_sede(data_sede);
      console.log(send_sede);
      if (send_sede.msg === "add-sede") {
        let sedes = await buscar_sedes_by_empresa(empresa_id);
        pintar_sedes(sedes);
        resetear_values_sede();
        $("#modal_sede .form-create").removeClass("modal-show");
        setTimeout(() => {
          $("#modal_sede").addClass("md-hidden");
        }, 300);
        add_toast("success", "Se registro la sede correctamente");
      } else {
        add_toast("error", "No se registro la sede");
      }
    } else {
      add_toast("warning", "Debes llenar todos los campos de la sede");
    }
  });

  // MODAL PROYECTOS

  function resetear_values_proyecto() {
    $("#logoProyecto").val("");
    $("#nombreProyecto").val("");
    $("#lotesProyecto").val("");
    let template = "";
    const count = imagenesCargadas.length;
    console.log(count);
    if (count == 1) {
      template += `
        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <header class="title-drag">Drag & Drop to Upload File</header>
        <span>OR</span>
        `;
      $(".drag-area").html(template);
      $(".drag-area").removeClass("list-imagens");
    }
    const index = $(".eliminar-imagen").data("index");
    imagenesCargadas.splice(index, 1);
    $(".eliminar-imagen").closest(".image-card").remove();
  }
  $("#newProyecto").on("click", function () {
    // resetear valores
    resetear_values_proyecto();
    $("#modal_proyecto").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_proyecto .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal_proyecto .close-modal").on("click", function () {
    // resetear valores
    resetear_values_proyecto();
    $("#modal_proyecto .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_proyecto").addClass("md-hidden");
    }, 300);
  });
  async function registrar_proyecto(data_sede) {
    return new Promise((resolve, reject) => {
      let funcion = "register_proyecto";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, data: JSON.stringify(data_sede) },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  // drag imagen
  var imagenesCargadas = [];
  $("#img_dsct").on("change", (e) => {
    if ($(".drag-area").hasClass("list-imagens") == false) {
      $(".drag-area").addClass("list-imagens");
    }
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Aquí puedes llamar a la función para procesar la imagen, por ejemplo:
      mostrarImagen(file);
    }
    console.log(imagenesCargadas);
  });
  $(".drag-area").on("drop", (e) => {
    e.preventDefault();
    if ($(".drag-area").hasClass("list-imagens") == false) {
      $(".drag-area").addClass("list-imagens");
    }
    const files = e.originalEvent.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Aquí puedes llamar a la función para procesar la imagen, por ejemplo:
      mostrarImagen(file);
    }
    console.log(imagenesCargadas);
  });

  function mostrarImagen(file) {
    var reader = new FileReader();
    const index = imagenesCargadas.length;
    reader.onload = function (e) {
      let template = "";
      if (imagenesCargadas.length === 0) {
        $(".drag-area").html("");
      }
      template += `      
        <div class="image-card">
            <img src=${e.target.result} alt="">
            <span class="eliminar-imagen" data-index="${index}">&times;</span>
        </div>
        `;
      $(".drag-area").append(template);
      imagenesCargadas.push(file);
    };
    reader.readAsDataURL(file);
  }
  $(document).on("click", ".eliminar-imagen", function () {
    let template = "";
    const count = imagenesCargadas.length;
    console.log(count);
    if (count == 1) {
      template += `
      <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
      <header class="title-drag">Drag & Drop to Upload File</header>
      <span>OR</span>
      `;
      $(".drag-area").html(template);
      $(".drag-area").removeClass("list-imagens");
    }
    const index = $(this).data("index");
    imagenesCargadas.splice(index, 1);
    $(this).closest(".image-card").remove();
  });
  $("#registrar_proyecto").on("click", async function () {
    let nombreProyecto = $("#nombreProyecto").val();
    let cantLotes = $("#lotesProyecto").val();
    let empresa_id = $("#datos_empresa").attr("key_business");
    let plano_upload = $("#img_dsct").prop("files")[0];
    let logo = $("#logoProyecto").prop("files")[0];
    let fecha_created = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (nombreProyecto !== "" && cantLotes !== "" && empresa_id !== "") {
      let data_proyecto = {
        nombreProyecto,
        cantLotes,
        fecha_created,
        empresa_id,
        logo: "",
        imgUrl: "",
      };
      $("#change_register_proyecto").removeClass("hidden");
      let send_logo = await enviarImagenes(logo, "logos");
      if (send_logo.msg === "add_file") {
        data_proyecto.logo = send_logo.url;
        let send_plano = await enviarImagenes(plano_upload, "proyectos");
        if (send_plano.msg === "add_file") {
          data_proyecto.imgUrl = send_plano.url;
          let registro = await registrar_proyecto(data_proyecto);

          if (registro.msg === "add-proyecto") {
            resetear_values_proyecto();
            let proyectos = await buscar_proyectos_by_empresa(empresa_id);
            pintar_proyectos(proyectos);
            $("#modal_proyecto .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#modal_proyecto").addClass("md-hidden");
            }, 300);
            add_toast("success", "Se registro la empresa correctamente");
          } else {
            add_toast("error", "No se pudo registrar la empresa");
          }
          $("#change_register_proyecto").addClass("hidden");
        } else {
        }
      } else {
        $("#change_register_proyecto").addClass("hidden");
        console.log(send_imagen.error);
        add_toast("error", "ocurrio un error al subir la imagen");
      }
    } else {
      add_toast(
        "warning",
        "Por lo menos debes llenar el ruc y el nombre de la empresa"
      );
    }
  });
  // MODAL BUSINESS
  // change img profile

  var imgPerfil = $("#perfil_upload");
  $("#perfil_overlay").click(function () {
    $(imgPerfil).click();
  });
  $(imgPerfil).change(function (e) {
    const file = e.target.files[0];
    // profileFile = file;

    mostrarVistaPreviaPerfil(file);
  });
  function mostrarVistaPreviaPerfil(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#perfil_overlay").html(
          `<img class="w-[80px] h-[80px] p-1 rounded-full object-cover" src="${e.target.result}" alt="rofile picture">`
        );
        $("#content-perfil").append(
          `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  $(document).on("click", "#delete_perfil_photo", function () {
    $(this).remove();
    $("#perfil_overlay").html(`
  <ion-icon class="text-[25px]" name="business-outline"></ion-icon>
  <p class="text-[8px] w-[70%] text-center">Selecciona un logo para tu empresa</p>
    `);

    $(imgPerfil).val("");
  });
  // --------fin de change img profile---------

  $("#newBusiness").on("click", function () {
    $("#modal_business").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_business .form-create").addClass("modal-show");
    }, 300);
  });
  async function registrar_business(data_empresa) {
    return new Promise((resolve, reject) => {
      let funcion = "register_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, data: JSON.stringify(data_empresa) },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  function enviarImagenes(file, carpeta) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("carpeta", carpeta);
      formData.append("businesslogo", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          let mensaje = { msg: "add_file", url: response };
          resolve(mensaje);
        },
        error: function (error) {
          let mensaje = { msg: "error", error: error };
          reject(mensaje);
        },
      });
    });
  }
  $("#registrar_business").on("click", async function () {
    let documento = $("#documento_business").val();
    let name = $("#name_business").val();
    let email = $("#email_business").val();
    let phone_contact = $("#phone_business").val();
    let website = $("#website_business").val();
    var profileFile = $("#perfil_upload").prop("files")[0];
    let fecha_created = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (documento !== "" && name_business !== "") {
      let data_empresa = {
        documento,
        name,
        email,
        phone_contact,
        website,
        fecha_created,
        logo: "",
      };
      $("#change_register_empresa").removeClass("hidden");
      let send_imagen = await enviarImagenes(profileFile, "business");
      if (send_imagen.msg === "add_file") {
        data_empresa.logo = send_imagen.url;
        let registro = await registrar_business(data_empresa);

        if (registro.msg === "add-business") {
          $("#documento_business").val("");
          $("#name_business").val("");
          $("#email_business").val("");
          $("#phone_business").val();
          $("#website_business").val("");
          // quitar logo
          $("#delete_perfil_photo").remove();
          $("#perfil_overlay").html(`
        <ion-icon class="text-[25px]" name="business-outline"></ion-icon>
        <p class="text-[8px] w-[70%] text-center">Selecciona un logo para tu empresa</p>
          `);

          $("#perfil_upload").val("");
          add_toast("success", "Se registro la empresa correctamente");
        } else {
          add_toast("error", "No se pudo registrar la empresa");
        }
        $("#change_register_empresa").addClass("hidden");
      } else {
        $("#change_register_empresa").addClass("hidden");
        console.log(send_imagen.error);
        add_toast("error", "ocurrio un error al subir la imagen");
      }
    } else {
      add_toast(
        "warning",
        "Por lo menos debes llenar el ruc y el nombre de la empresa"
      );
    }
  });
  $("#cancelar_business").on("click", function () {
    $("#modal_business .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_business").addClass("md-hidden");
    }, 300);
  });
  $("#modal_business .close-modal").on("click", function () {
    $("#modal_business .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_business").addClass("md-hidden");
    }, 300);
  });
});
