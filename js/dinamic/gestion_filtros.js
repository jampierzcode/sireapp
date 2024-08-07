$(document).ready(async function () {
  var asesoresArray;
  var proyectosList;
  var listSedes;

  async function buscar_asesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_usuarios_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-users-asesor") {
            asesoresArray = [];
            resolve([]);
          } else {
            const asesores = JSON.parse(response);
            asesoresArray = asesores;
            resolve(asesores);
          }
        }
      );
    });
  }
  function pintar_asesores(sede_id) {
    let asesores = asesoresArray.filter((a) => a.sede_id === sede_id);
    let template = "";
    asesores.forEach((asesor) => {
      template += `
      <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
      <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
          </div>
          <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  ${asesor.nombre}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  ${asesor.apellido}
              </p>
          </div>
      </div>
  </li>
      `;
    });
    $("#listAsesores").html(template);
  }

  // SEDE SECTION
  async function buscar_sedes_by_usuario() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_sedes_by_usuario";
      $.post(
        "../../controlador/BusinessController.php",
        { funcion },
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
    $("#filter-sede").html(template);
    llenar_proyectos_sede(sedes[0].id);
    pintar_asesores(sedes[0].id);
  }
  $("#filter-sede").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos_sede(sede_id);
    pintar_asesores(sede_id);
    // filtrarProyectos();
  });
  function llenar_proyectos_sede(sede_id) {
    console.log(proyectosList);
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);

    let template = "";
    template += `
      <li id="select_proyecto" key_proyecto="Todos" class="px-4 py-3 hover:bg-blue-100 rounded duration-300 cursor-pointer"> <img src="" alt="">
        <p class="text-sm">Todos Los proyectos</p>
      </li>
      `;
    proyectos.forEach((p) => {
      template += `
      <li id="select_proyecto" key_proyecto="${p.id}" class="flex items-center gap-3 px-4 py-3 hover:bg-blue-100 rounded duration-300 cursor-pointer"> 
        <img class="w-5 h-5 rounded-full" src="../../${p.logo}" alt="logo-${p.nombre_proyecto}">
        <p class="text-sm">${p.nombre_proyecto}</p>
      </li>
      `;
    });
    $("#span-proyecto").text("Todos los proyectos");
    $("#span-proyecto").attr("key_proyecto", "Todos");
    $("#list-proyectos").html(template);
  }
  var proyectos = await buscar_proyectos();
  var sedes = await buscar_sedes_by_usuario();
  var asesores = await buscar_asesores();
  console.log(asesores);
  pintar_sedes(sedes);
  semanaGrafico();
  // pintar_asesores();
  $("#search_date_visitas").click(function () {
    let fecha_inicio = dayjs(
      $("#fecha-inicio-search").val(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let fecha_fin = dayjs($("#fecha-fin-search").val(), "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    console.log(fecha_inicio, fecha_fin);
    if (fecha_inicio && fecha_fin) {
      pintar_grafico(fecha_inicio, fecha_fin);
      leads_subidos(fecha_inicio, fecha_fin);
      leads_asignados(fecha_inicio, fecha_fin);
    }
  });
  async function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
        },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            proyectosList = [];
            resolve([]);
          } else {
            const proyectos = JSON.parse(response);
            proyectosList = proyectos;
            resolve(proyectos);
          }
        }
      );
    });
  }
  $("#refresh_date_visitas").click(function () {
    semanaGrafico();
    $("#asesor-search").removeAttr("keyAsesor");
    $("#asesor-search span").html("Seleccione un asesor");
  });
  function pintar_grafico(fecha_inicio, fecha_fin) {
    let sede_id = $("#filter-sede").val();
    console.log(sede_id);
    let usuario = $("#asesor-search").attr("keyAsesor");
    let proyecto = $("#span-proyecto").attr("key_proyecto");
    console.log(usuario);
    if (usuario === "Todos") {
      // let funcion = "buscar_resumen_eficiencia_group_asesor";
      let funcion = "buscar_clientes_rendimiento_group_asesor";
      let asesores = asesoresArray.filter((a) => a.sede_id === sede_id);

      console.log(asesores);
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          asesores: JSON.stringify({ asesores: asesores }),
          fecha_inicio,
          fecha_fin,
        },
        (response) => {
          let template = "";
          if (response.trim() === "no-register") {
            asesores.forEach((usuario) => {
              template += `
              <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${
                              usuario?.nombre
                            }</h5>
                            <p>${usuario?.apellido}</p>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS NO CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
              `;
            });
          } else {
            const usuarios = JSON.parse(response);
            console.log(usuarios);
            // let visitas_concretadas;
            // let visitas_no_concretadas;
            // let separaciones;
            // let ventas;
            if (proyecto === "Todos") {
              asesores.forEach((usuario) => {
                let visitas_concretadas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.asistencia === "ASISTIO" &&
                    u.status === "VALIDADO"
                );
                let visitas_no_concretadas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.asistencia === "NO ASISTIO"
                );
                let separaciones = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.tipo === "SEPARACION" &&
                    u.status === "VALIDADO"
                );
                let ventas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.tipo === "VENTA" &&
                    u.status === "VALIDADO"
                );
                template += `
              <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${usuario?.nombre}</h5>
                            <p>${usuario?.apellido}</p>

                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS CONCRETADAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${visitas_concretadas.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS NO CONCRETADAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${visitas_no_concretadas.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${separaciones.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${ventas.length}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
              `;
              });
            } else {
              asesores.forEach((usuario) => {
                let visitas_concretadas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.asistencia === "ASISTIO" &&
                    u.proyet_id === proyecto &&
                    u.status === "VALIDADO"
                );
                let visitas_no_concretadas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.asistencia === "NO ASISTIO" &&
                    u.proyet_id === proyecto
                );
                let separaciones = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.tipo === "SEPARACION" &&
                    u.proyet_id === proyecto &&
                    u.status === "VALIDADO"
                );
                let ventas = usuarios.filter(
                  (u) =>
                    u.user_id === usuario.id_usuario &&
                    u.tipo === "VENTA" &&
                    u.proyet_id === proyecto &&
                    u.status === "VALIDADO"
                );
                template += `
              <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${usuario?.nombre}</h5>
                            <p>${usuario?.apellido}</p>

                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS CONCRETADAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${visitas_concretadas.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS NO CONCRETADAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${visitas_no_concretadas.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${separaciones.length}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${ventas.length}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
              `;
              });
            }
          }
          $("#allAsesoresResumen").html(template);
          $("#estadistics-box").addClass("hidden");
        }
      );
    } else {
      let funcion = "buscar_clientes_rendimiento_by_asesor";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin, usuario },
        (response) => {
          let template = "";
          let datos = asesoresArray.find((a) => a.id_usuario === usuario);

          if (response.trim() === "no-register") {
            console.log("no -register");
            template += `
            <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                      <div class="mb-4">
                          <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${
                            datos?.nombre
                          }</h5>
                          <p>${datos?.apellido}</p>
                      </div>
                      <div class="flow-root">
                          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                              <li class="py-3 sm:py-4">
                                  <div class="flex items-center space-x-4">
                                      <div class="flex-1 min-w-0">
                                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                              VISITAS CONCRETADAS
                                          </p>
                                      </div>
                                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                      ${0}
                                      </div>
                                  </div>
                              </li>
                              <li class="py-3 sm:py-4">
                                  <div class="flex items-center space-x-4">
                                      <div class="flex-1 min-w-0">
                                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                              VISITAS NO CONCRETADAS
                                          </p>
                                      </div>
                                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                      ${0}
                                      </div>
                                  </div>
                              </li>
                              <li class="py-3 sm:py-4">
                                  <div class="flex items-center space-x-4">
                                      <div class="flex-1 min-w-0">
                                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                              SEPARACIONES
                                          </p>
                                      </div>
                                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                      ${0}
                                      </div>
                                  </div>
                              </li>
                              <li class="py-3 sm:py-4">
                                  <div class="flex items-center space-x-4">
                                      <div class="flex-1 min-w-0">
                                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                              VENTAS
                                          </p>
                                      </div>
                                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${0}
                                      </div>
                                  </div>
                              </li>
                          </ul>
                      </div>

                  </div>
            `;
          } else {
            const usuarios = JSON.parse(response);
            console.log(usuarios);
            if (proyecto !== "Todos") {
              let visitas_concretadas = usuarios.filter(
                (u) => u.asistencia === "ASISTIO" && u.proyet_id === proyecto
              );
              let visitas_no_concretadas = usuarios.filter(
                (u) => u.asistencia === "NO ASISTIO" && u.proyet_id === proyecto
              );
              let separaciones = usuarios.filter(
                (u) => u.tipo === "SEPARACION" && u.proyet_id === proyecto
              );
              let ventas = usuarios.filter(
                (u) => u.tipo === "VENTA" && u.proyet_id === proyecto
              );
              template += `
                <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                          <div class="mb-4">
                              <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${datos?.nombre}</h5>
                              <p>${datos?.apellido}</p>
                          </div>
                          <div class="flow-root">
                              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VISITAS CONCRETADAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${visitas_concretadas.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VISITAS NO CONCRETADAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${visitas_no_concretadas.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  SEPARACIONES
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${separaciones.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VENTAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                              ${ventas.length}
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
    
                      </div>
                `;
            } else {
              let visitas_concretadas = usuarios.filter(
                (u) => u.asistencia === "ASISTIO"
              );
              let visitas_no_concretadas = usuarios.filter(
                (u) => u.asistencia === "NO ASISTIO"
              );
              let separaciones = usuarios.filter(
                (u) => u.tipo === "SEPARACION"
              );
              let ventas = usuarios.filter((u) => u.tipo === "VENTA");
              template += `
                <div class="w-full max-w-[250px] p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                          <div class="mb-4">
                              <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">${datos?.nombre}</h5>
                              <p>${datos?.apellido}</p>
                          </div>
                          <div class="flow-root">
                              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VISITAS CONCRETADAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${visitas_concretadas.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VISITAS NO CONCRETADAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${visitas_no_concretadas.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  SEPARACIONES
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                          ${separaciones.length}
                                          </div>
                                      </div>
                                  </li>
                                  <li class="py-3 sm:py-4">
                                      <div class="flex items-center space-x-4">
                                          <div class="flex-1 min-w-0">
                                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                  VENTAS
                                              </p>
                                          </div>
                                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                              ${ventas.length}
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
    
                      </div>
                `;
            }
          }
          $("#allAsesoresResumen").html(template);

          $("#estadistics-box").addClass("hidden");
        }
      );
    }
    // }
  }
  function getTimeLabel(startDate, endDate) {
    console.log(startDate, endDate);
    var dateDiff = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
    console.log(dateDiff);

    if (dateDiff === 0) {
      return dayjs(startDate).format("D MMM");
    } else if (dateDiff < 7) {
      return dayjs(startDate).format("D MMM");
    } else if (dateDiff >= 7 && dateDiff <= 30) {
      return `Semana ${
        dayjs(startDate).format("D MMM") +
        " - " +
        dayjs(endDate).format("D MMM")
      }`;
    } else {
      return `Mes ${
        dayjs(startDate).format("D MMM") +
        " - " +
        dayjs(endDate).format("D MMM")
      }`;
    }
  }

  function getStartOfWeek(date) {
    console.log(dayjs(date).startOf("week"));
    return dayjs(date).startOf("week").add(1, "day").format("YYYY-MM-DD");
  }

  // Función para obtener la fecha de fin (domingo) de la semana actual
  function getEndOfWeek(date) {
    console.log(dayjs(date).endOf("week"));
    return dayjs(date).endOf("week").add(1, "day").format("YYYY-MM-DD");
  }
  function semanaGrafico() {
    var fechaActual = dayjs().format("YYYY-MM-DD");

    // Obtener la fecha de inicio (lunes) de la semana actual
    var fechaInicioSemana = getStartOfWeek(fechaActual);

    // Obtener la fecha de fin (domingo) de la semana actual
    var fechaFinSemana = getEndOfWeek(fechaInicioSemana);
    $("#fecha-inicio-search").val(fechaInicioSemana);
    $("#fecha-fin-search").val(fechaFinSemana);

    pintar_grafico(fechaInicioSemana, fechaFinSemana);
    leads_subidos(fechaInicioSemana, fechaFinSemana);
    leads_asignados(fechaInicioSemana, fechaFinSemana);

    console.log(
      "Fecha de inicio de la semana actual (lunes):",
      fechaInicioSemana
    );
    console.log("Fecha de fin de la semana actual (domingo):", fechaFinSemana);
  }
  $(".icon-filter").on("click", function () {
    $(".icon-filter").toggleClass("rotate-180");
    $("#menu-filtros-box").toggleClass("invisible");
    $("#menu-filtros-box").toggleClass("h-auto");
    $("#menu-filtros-box").toggleClass("py-3");
  });
  $("#proyecto-active").on("click", function () {
    $(".icon-proyecto-down").toggleClass("rotate-180");
    $("#list-proyectos").toggleClass("invisible");
  });
  $(document).on("click", "#list-proyectos li", function (e) {
    let idProyecto = $(this).attr("key_proyecto");
    console.log(idProyecto);
    if (idProyecto !== "Todos") {
      let data = proyectosList.find((p) => p.id === idProyecto);
      $("#span-proyecto").text(data.nombreProyecto);
      $("#span-proyecto").attr("key_proyecto", idProyecto);
    } else {
      $("#span-proyecto").text("Todos");
      $("#span-proyecto").attr("key_proyecto", "Todos");
    }
    $("#list-proyectos").addClass("invisible");
    $(".icon-proyecto-down").removeClass("rotate-180");
  });
  $("#filter_static").on("change", function (e) {
    const valor = e.target.value;
    let actualdia;
    let fecha_inicio;
    switch (valor) {
      case "last-month":
        actualdia = dayjs();
        $("#fecha-fin-search").val(actualdia.format("YYYY-MM-DD"));
        fecha_inicio = actualdia.subtract(1, "month");
        $("#fecha-inicio-search").val(fecha_inicio.format("YYYY-MM-DD"));

        break;
      case "last-week":
        actualdia = dayjs();
        $("#fecha-fin-search").val(actualdia.format("YYYY-MM-DD"));
        fecha_inicio = actualdia.subtract(7, "days");
        $("#fecha-inicio-search").val(fecha_inicio.format("YYYY-MM-DD"));
        break;

      default:
        break;
    }
  });
  function leads_subidos(fecha_inicio, fecha_fin) {
    // let usuario = $("#asesor-search").attr("keyAsesor");
    // console.log(usuario);
    let sede_id = $("#filter-sede").val();
    let asesores = asesoresArray.filter((a) => a.sede_id === sede_id);

    let funcion = "buscar_group_clientes_fecha";
    $.post(
      "../../controlador/UsuarioController.php",
      {
        funcion,
        fecha_inicio,
        fecha_fin,
        asesores: JSON.stringify({ asesores: asesores }),
      },
      (response) => {
        var lead_subidos = document.getElementById("leads-subidos");
        var myChartSubidos = echarts.init(lead_subidos);
        var option;

        // Configura colores para las series
        var coloresSeries = [
          "#5470C6",
          "#91CC75",
          "#EE6666",
          "#EE9966",
          "#73C0DE",
          "#3BA272",
          "#FC8452",
          "#9A60B4",
          "#FAD860",
          "#F3A43B",
        ];
        let data = [];
        if (response.trim() === "no-register-clientes") {
          asesores.forEach((asesor) => {
            let newData = {
              nombre: asesor.nombre + " " + asesor.apellido,
              valor: 0,
            };
            data.push(newData);
          });
        } else {
          var clientes = JSON.parse(response);
          asesores.forEach((asesor) => {
            const dataclientes = clientes.filter(
              (c) => c.usuario_id === asesor.id_usuario
            );
            console.log(dataclientes);
            let newData = {
              nombre: asesor.nombre + " " + asesor.apellido,
              valor: dataclientes.length,
            };
            data.push(newData);
          });
        }

        // Configura los datos para el gráfico de barras
        var nombresAsesores = data.map(function (item) {
          return item.nombre;
        });
        // var valoresAsesores = data.map(function (item) {
        //   return item.valor;
        // });

        // Opciones del gráfico
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: nombresAsesores,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            // Deja el eje X vacío porque no necesitamos etiquetas en este caso
            data: [],
          },
          yAxis: {
            type: "value",
          },
          series: data.map(function (asesor, index) {
            return {
              name: asesor.nombre,
              type: "bar",
              data: [{ value: asesor.valor, name: asesor.nombre }],
              itemStyle: {
                // Configura colores para cada serie
                color: coloresSeries[index],
              },
              label: {
                show: true,
                position: "top",
                formatter: function (params) {
                  return params.value + " leads";
                },
              },
            };
          }),
        };

        option && myChartSubidos.setOption(option);
      }
    );
  }
  function leads_asignados(fecha_inicio, fecha_fin) {
    // let usuario = $("#asesor-search").attr("keyAsesor");
    // console.log(usuario);

    let sede_id = $("#filter-sede").val();
    let asesores = asesoresArray.filter((a) => a.sede_id === sede_id);

    let funcion = "buscar_group_asignados_fecha";
    $.post(
      "../../controlador/UsuarioController.php",
      {
        funcion,
        fecha_inicio,
        fecha_fin,
        asesores: JSON.stringify({ asesores: asesores }),
      },
      (response) => {
        var lead_no_subidos = document.getElementById("leads-no-subidos");

        var myChartNoSubidos = echarts.init(lead_no_subidos);
        var option;

        // Configura colores para las series
        var coloresSeries = [
          "#5470C6",
          "#91CC75",
          "#EE6666",
          "#EE9966",
          "#73C0DE",
          "#3BA272",
          "#FC8452",
          "#9A60B4",
          "#FAD860",
          "#F3A43B",
        ];
        let data = [];
        if (response.trim() === "no-register-clientes") {
          asesores.forEach((asesor) => {
            let newData = {
              nombre: asesor.nombre + " " + asesor.apellido,
              valor: 0,
            };
            data.push(newData);
          });
        } else {
          var clientes = JSON.parse(response);
          asesores.forEach((asesor) => {
            const dataclientes = clientes.filter(
              (c) => c.usuario_id === asesor.id_usuario
            );
            console.log(dataclientes);
            let newData = {
              nombre: asesor.nombre + " " + asesor.apellido,
              valor: dataclientes.length,
            };
            data.push(newData);
          });
        }

        // Configura los datos para el gráfico de barras
        var nombresAsesores = data.map(function (item) {
          return item.nombre;
        });
        // var valoresAsesores = data.map(function (item) {
        //   return item.valor;
        // });

        // Opciones del gráfico
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: nombresAsesores,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            // Deja el eje X vacío porque no necesitamos etiquetas en este caso
            data: [],
          },
          yAxis: {
            type: "value",
          },
          series: data.map(function (asesor, index) {
            return {
              name: asesor.nombre,
              type: "bar",
              data: [{ value: asesor.valor, name: asesor.nombre }],
              itemStyle: {
                // Configura colores para cada serie
                color: coloresSeries[index],
              },
              label: {
                show: true,
                position: "top",
                formatter: function (params) {
                  return params.value + " leads";
                },
              },
            };
          }),
        };

        option && myChartNoSubidos.setOption(option);
      }
    );
  }
  $("#asesor-search").click(function () {
    $("#listUsuarios").toggleClass("hidden");
    if ($("#listUsuarios").hasClass("hidden")) {
      console.log("entro");
      $("#icon-drop-asesor").attr("name", "chevron-down");
    } else {
      $("#icon-drop-asesor").attr("name", "chevron-up");
    }
  });
  $(document).on("click", "#selectAsesor", function () {
    let id_usuario = $(this).attr("keyASesor");
    console.log(id_usuario);
    if (id_usuario === "Todos") {
      $("#asesor-search span").html("Comparar Todos");
      $("#asesor-search").attr("keyAsesor", id_usuario);
    } else {
      let asesor = asesoresArray.filter((e) => e.id_usuario === id_usuario);

      $("#asesor-search span").html(
        asesor[0].nombre + " " + asesor[0].apellido
      );
    }
    $("#listUsuarios").addClass("hidden");
    if ($("#listUsuarios").hasClass("hidden")) {
      console.log("entro");
      $("#icon-drop-asesor").attr("name", "chevron-down");
    } else {
      $("#icon-drop-asesor").attr("name", "chevron-up");
    }
    $("#asesor-search").attr("keyAsesor", id_usuario);
  });
  $("#search-asesor-input").on("keyup search", function () {
    let name = $(this).val().toLowerCase();
    let template = "";
    template += `
          <li id="selectAsesor" keyAsesor= "Todos" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src="https://t3.ftcdn.net/jpg/02/99/06/22/360_F_299062215_VpZk4Ng8h5JpPWsBblyiVEWfAFwESfon.jpg" alt="Neil image">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Comparar
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Todos
                    </p>
                </div>
            </div>
        </li>`;
    if (name === "") {
      asesoresArray.forEach((asesor) => {
        template += `
              <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          ${asesor.nombre}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          ${asesor.apellido}
                      </p>
                  </div>
              </div>
          </li>`;
      });

      $("#listAsesores").html(template);
    } else {
      console.log(asesoresArray);
      let asesores = asesoresArray.filter((persona) => {
        const nombreCompleto = `${persona.nombre} ${persona.apellido}`;
        // console.log(nombreCompleto.toLowerCase().includes(name));
        return nombreCompleto.toLowerCase().includes(name);
      });
      console.log(asesores);

      if (asesores.length > 0) {
        asesores.forEach((asesor) => {
          template += `
                <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            ${asesor.nombre}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            ${asesor.apellido}
                        </p>
                    </div>
                </div>
            </li>`;
        });
      } else {
        template += `
        <p class="py-3 px-4 text-sm font-medium text-gray-900 truncate dark:text-white">
        No hay registros
        </p>
        `;
      }
      $("#listAsesores").html(template);
    }
  });
});
