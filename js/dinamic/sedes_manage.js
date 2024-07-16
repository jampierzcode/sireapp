$(document).ready(async function () {
  var listEmpresas = [];
  var listSedes = [];
  var listProyectos = [];
  var listProyectosSede = [];
  var listUsuariosSede = [];
  var listUsuariosAdmin = [];
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
  async function buscar_sedes_by_empresa(empresa_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, empresa_id },
        (response) => {
          if (response.trim() === "no-register") {
            listSedes = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listSedes = data;
            resolve(data);
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
            listProyectos = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listProyectos = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_usuarios_by_empresa(empresa_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_usuarios_by_empresa";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, empresa_id },
        (response) => {
          if (response.trim() === "no-register") {
            listProyectos = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listProyectos = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_usuarios_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_usuarios_admin";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            listUsuariosAdmin = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listUsuariosAdmin = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_proyectos_by_sede(sede_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_by_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, sede_id },
        (response) => {
          if (response.trim() === "no-register") {
            listProyectosSede = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            listProyectosSede = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_usuarios_by_sede(sede_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_usuarios_by_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, sede_id },
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
  async function buscar_cajas_by_sede(sede_id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_cajas_by_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, sede_id },
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

  function pintar_empresas(empresas) {
    let template = "";
    template += `
    <option value="0" disabled>Selecciona una empresa</option>`;
    empresas.forEach((e) => {
      template += `
      <option value="${e.id}">
      ${e.nombre_razon}
      </option>
      `;
    });
    $("#empresasList").html(template);
  }
  function pintar_sedes(sedes, indice) {
    let template = "";
    if (sedes.length > 0) {
      sedes.forEach((s, index) => {
        template += `
        <div key="${index}" data-id="${
          s.id
        }" class="item-sede w-full px-4 py-3 rounded  cursor-pointer ${
          indice === index
            ? "bg-[#e9e4ff] text-[#310ecd]"
            : "bg-gray-100 text-gray-900"
        }">
            <div class="flex items-center gap-4">
            <p class="font-bold text-sm">${s.name_reference}</p>
            </div>
            </div>
            `;
      });
    } else {
      template += `
      <p class="text-sm font-normal">No hay proyectos registrados en esta empresa</p>
      `;
    }
    $("#sedesList").html(template);
  }
  $(document).on("click", ".item-sede", function () {
    var sede_id = $(this).data("id");
    $(".item-sede").removeClass("bg-[#e9e4ff] text-[#310ecd]");
    $(".item-sede").addClass("bg-gray-100 text-gray-900");
    $(this).removeClass("text-gray-900");
    $(this).addClass("bg-[#e9e4ff] text-[#310ecd]");

    var sede_activo = listSedes.find((s) => s.id === String(sede_id));

    pintar_sede_activo(sede_activo);
  });
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
        <button class="px-3 py-2  whitespace-nowrap rounded text-red-500 bg-red-100 text-sm font-bold">Desasignar</button>
        </div>
        </div>
        </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de un proyecto asignado, asigne uno nuevo</p>`;
    }
    $("#proyectosListSede").html(template);
  }
  function pintar_usuarios(usuarios) {
    let template = "";
    if (usuarios.length > 0) {
      usuarios.forEach((u, index) => {
        template += `
        <div key="${index} data-id="${u.id_usuario}" class="w-full px-4 py-3 rounded bg-gray-50 text-gray-900">
        <div class="flex items-center gap-4">
        <div class="w-full overflow-hidden">
        <p class="font-bold text-sm">${u.nombre} ${u.apellido}</p>
        <p class="font-normal text-sm overflow-hidden text-ellipsis whitespace-nowrap">${u?.correo}</p>
        </div>
        <div>
        <button class="px-3 py-2  whitespace-nowrap rounded text-red-500 bg-red-100 text-sm font-bold">Desasignar</button>
        </div>
        </div>
        </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de un usuario asignado, asigne uno nuevo</p>`;
    }
    $("#usuariosListSede").html(template);
  }
  function pintar_cajas(cajas) {
    let template = "";
    if (cajas.length > 0) {
      cajas.forEach((c, index) => {
        template += `
        <div key="${index} data-id="${
          c.id
        }" class="w-full px-4 py-3 rounded bg-gray-50 text-gray-900">
        <div class="flex items-center gap-4">
        <div class="w-full overflow-hidden">
        <p class="font-bold text-sm">${c.nombre}</p>
        <p class="font-normal text-sm overflow-hidden text-ellipsis whitespace-nowrap">${dayjs(
          c.fecha_creation
        ).format("DD/MM/YYYY")}</p>
        </div>
        <div>
        <button class="px-3 py-2  whitespace-nowrap rounded text-red-500 bg-red-100 text-sm font-bold">Eliminar</button>
        </div>
        </div>
        </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de cajas en esta sede, cree una nueva</p>`;
    }
    $("#cajasListSede").html(template);
  }
  function pintar_usuarios_no_asignados(usuarios) {
    let template = "";
    if (usuarios.length > 0) {
      usuarios.forEach((u, index) => {
        template += `
        <div key="${index} data-id="${u.id_usuario}" class="w-full px-4 py-3 rounded bg-gray-100 text-gray-900">
        <div class="flex items-center gap-4">
        <div class="w-full overflow-hidden">
        <p class="font-bold text-sm">${u.nombre} ${u.apellido}</p>
        <p class="font-normal text-sm overflow-hidden text-ellipsis whitespace-nowrap">${u?.correo}</p>
        <p class="font-bold text-sm">Rol: ${u.nombre_rol}</p>
        </div>
        <div>
        <button id="asigned_usuario" data-id="${u.id_usuario}" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm font-bold">Asignar</button>
        </div>
        </div>
        </div>
          `;
      });
    } else {
      template += `<p class="text-sm text-gray-500">No hay registros de un usuario asignado, asigne uno nuevo</p>`;
    }
    $("#listUsuariosNoAsignados").html(template);
  }
  async function pintar_sede_activo(sede) {
    let template = "";
    template += `
    <div class="w-full">
    <div class="flex gap-4 justify-bettween items-center">
    <div>
        <p class="font-bold text-sm">Sede: ${sede.name_reference}</p>
        <p class="font-bold text-sm">Dirección: <span class="font-normal text-sm">${sede.direccion}</span></p>
        <p class="font-bold text-sm">Ciudad: <span class="font-normal text-sm">${sede.ciudad}</span></p>
        </div>
        
        <div class="flex gap-4">
            <button data-id="${sede.id}" id="edit_sede" class="whitespace-nowrap bg-white inline-block font-bold rounded inline-flex px-3 py-2 text-sm">Editar</button>
             </div>
    </div>
    `;
    $("#datos_sede").html(template);
    $("#datos_sede").attr("key_sede", sede.id);
    let proyectos = await buscar_proyectos_by_sede(sede.id);
    console.log(proyectos);
    pintar_proyectos(proyectos);
    let usuarios = await buscar_usuarios_by_sede(sede.id);
    pintar_usuarios(usuarios);

    // let proyectos = await buscar_proyectos_by_empresa(empresa.id);

    // pintar_sedes(sedes);
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
  let empresas = await buscar_empresas();
  let sedes = await buscar_sedes_by_empresa(empresas[0].id);
  console.log(empresas);
  console.log(sedes);
  pintar_empresas(empresas);
  pintar_sedes(sedes, 0);
  if (sedes.length > 0) {
    pintar_sede_activo(sedes[0]);
    $("#no-search").addClass("hidden");
    $(".main-sedes").removeClass("hidden");

    $(".container_usuarios").addClass("hidden");
    $(".container_proyectos").removeClass("hidden");
  } else {
    $(".main-sedes").addClass("hidden");
    $("#no-search").removeClass("hidden");
  }
  $("#empresasList").on("change", async function (e) {
    let empresa_id = e.target.value;
    let sedes = await buscar_sedes_by_empresa(empresa_id);
    pintar_sedes(sedes, 0);
    if (sedes.length > 0) {
      pintar_sede_activo(sedes[0]);
      $("#no-search").addClass("hidden");
      $(".main-sedes").removeClass("hidden");
    } else {
      $(".main-sedes").addClass("hidden");
      $("#no-search").removeClass("hidden");
    }
  });

  // TABS CLICKS
  $("#proyectosBtn").on("click", async function () {
    let sede_id = $("#datos_sede").attr("key_sede");
    let proyectos = await buscar_proyectos_by_sede(sede_id);

    $(".container_usuarios").addClass("hidden");
    $(".container_cajas").addClass("hidden");
    $(".container_proyectos").removeClass("hidden");
    pintar_proyectos(proyectos);
  });
  $("#usuariosBtn").on("click", async function () {
    let sede_id = $("#datos_sede").attr("key_sede");
    let usuarios = await buscar_usuarios_by_sede(sede_id);

    $(".container_proyectos").addClass("hidden");
    $(".container_cajas").addClass("hidden");
    $(".container_usuarios").removeClass("hidden");

    pintar_usuarios(usuarios);
  });
  $("#cajasBtn").on("click", async function () {
    let sede_id = $("#datos_sede").attr("key_sede");
    let cajas = await buscar_cajas_by_sede(sede_id);
    $(".container_proyectos").addClass("hidden");
    $(".container_usuarios").addClass("hidden");
    $(".container_cajas").removeClass("hidden");
    pintar_cajas(cajas);
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
    let empresa_id = $("#empresasList").val();
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

      if (send_sede.msg === "add-sede") {
        let sedes = await buscar_sedes_by_empresa(empresa_id);
        pintar_sedes(sedes, 0);
        pintar_sede_activo(sedes[0]);
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
  // MODAL CREAR CAJA PARA SEDE
  async function registrar_caja(data_caja) {
    return new Promise((resolve, reject) => {
      let funcion = "register_caja";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, data: JSON.stringify(data_caja) },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  function reset_values_caja() {
    $("#name_caja").val("");
  }
  $("#registrar_caja").on("click", async function () {
    let sede_id = $("#datos_sede").attr("key_sede");
    let nombre = $("#name_caja").val();
    let fecha_creation = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(sede_id, nombre, fecha_creation);
    if (nombre !== "" && sede_id !== "") {
      let data_caja = {
        sede_id,
        nombre,
        fecha_creation,
      };
      let send_caja = await registrar_caja(data_caja);

      if (send_caja.msg === "add-caja") {
        let cajas = await buscar_cajas_by_sede(sede_id);
        pintar_cajas(cajas);
        reset_values_caja();
        $("#modal_caja .form-create").removeClass("modal-show");
        setTimeout(() => {
          $("#modal_caja").addClass("md-hidden");
        }, 300);
        add_toast("success", "Se registro la caja correctamente");
      } else {
        add_toast("error", "No se registro la caja");
      }
    } else {
      add_toast("warning", "Debes llenar todos los campos de la caja");
    }
  });
  $("#modal_caja .close-modal").on("click", function () {
    $("#modal_caja .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_caja").addClass("md-hidden");
    }, 300);
  });
  // MODAL ASIGNED PROYECTOS
  function pintar_proyectos_empresa(proyectos) {
    let template = "";
    proyectos.forEach((p) => {
      template += `
            <div class="px-4 py-3 items-center rounded bg-gray-100 flex justify-between gap-4">
                <img src="../../${p.logo}" class="w-12 h-12 object-contain" alt="">
                <div class="flex-1">
                    <p class="text-sm font-bold">${p.nombreproyecto}</p>
                </div>
                <button id="asigned_proyecto" data-id="${p.id}" class="px-3 py-2 rounded bg-[#310ecd] text-white">Asignar</button>
            </div>
            `;
    });
    $("#listProyectosNoAsignados").html(template);
  }
  function asignar_proyecto_sede(proyecto_id, sede_id) {
    let fecha_asigned = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
      let funcion = "asignar_proyecto_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, proyecto_id, sede_id, fecha_asigned },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  async function asignar_usuario_sede(usuario_id, sede_id) {
    let fecha_asigned = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
      let funcion = "asignar_usuario_sede";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion, usuario_id, sede_id, fecha_asigned },
        (response) => {
          console.log(response);
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  $(document).on("click", "#asigned_proyecto", async function () {
    let empresa_id = $("#empresasList").val();
    let sede_id = $("#datos_sede").attr("key_sede");
    let proyecto_id = $(this).data("id");
    let asigned_proyecto = await asignar_proyecto_sede(proyecto_id, sede_id);
    if (asigned_proyecto.msg === "add-asigned") {
      let proyectos_sede = await buscar_proyectos_by_sede(empresa_id);
      pintar_proyectos(proyectos_sede);
      $("#modal_asigned_proyecto .form-create").removeClass("modal-show");
      setTimeout(() => {
        $("#modal_asigned_proyecto").addClass("md-hidden");
      }, 300);
      let proyectosNew = await buscar_proyectos_by_sede(sede_id);
      console.log(proyectosNew);
      pintar_proyectos(proyectosNew);
      add_toast("success", "Se asigno el proyecto a la sede");
    } else {
      add_toast("error", "No se pudo asignar el proyecto a la sede");
    }
  });
  $(document).on("click", "#asigned_usuario", async function () {
    let sede_id = $("#datos_sede").attr("key_sede");
    let usuario_id = $(this).data("id");
    let asigned_usuario = await asignar_usuario_sede(usuario_id, sede_id);
    if (asigned_usuario.msg === "add-asigned") {
      let usuarios_sede = await buscar_usuarios_by_sede(sede_id);
      pintar_usuarios(usuarios_sede);
      $("#modal_asigned_usuario .form-create").removeClass("modal-show");
      setTimeout(() => {
        $("#modal_asigned_usuario").addClass("md-hidden");
      }, 300);
      add_toast("success", "Se asigno el usuario a la sede");
    } else {
      add_toast("error", "No se pudo asignar el proyecto a la sede");
    }
  });
  $("#newAsignedProyecto").on("click", async function () {
    let empresa_id = $("#empresasList").val();
    let proyectos_empresa = await buscar_proyectos_by_empresa(empresa_id);

    // Filtrar los proyectos de la empresa que no están asignados
    const proyectosNoAsignados = proyectos_empresa.filter(
      (proyectoEmpresa) =>
        !listProyectosSede.some(
          (proyectoAsignado) => proyectoAsignado.id === proyectoEmpresa.id
        )
    );

    console.log(proyectosNoAsignados);

    pintar_proyectos_empresa(proyectosNoAsignados);
    $("#modal_asigned_proyecto").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_asigned_proyecto .form-create").addClass("modal-show");
    }, 300);
  });
  $("#newAsignedUsuario").on("click", async function () {
    let empresa_id = $("#empresasList").val();
    let usuarios_admin = await buscar_usuarios_by_empresa(empresa_id);
    console.log(usuarios_admin, listUsuariosSede);
    const usuariosNoasignados = usuarios_admin.filter(
      (usuarioadmin) =>
        !listUsuariosSede.some(
          (usuarioasignado) =>
            usuarioasignado.id_usuario === usuarioadmin.id_usuario
        )
    );
    console.log(usuariosNoasignados);
    pintar_usuarios_no_asignados(usuariosNoasignados);
    $("#modal_asigned_usuario").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_asigned_usuario .form-create").addClass("modal-show");
    }, 300);
  });
  $("#newCaja").on("click", async function () {
    $("#modal_caja").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_caja .form-create").addClass("modal-show");
    }, 300);
  });
  $("#modal_asigned_usuario .close-modal").on("click", function () {
    $("#modal_asigned_usuario .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_asigned_usuario").addClass("md-hidden");
    }, 300);
  });
  $("#modal_asigned_proyecto .close-modal").on("click", function () {
    $("#modal_asigned_proyecto .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_asigned_proyecto").addClass("md-hidden");
    }, 300);
  });
});
