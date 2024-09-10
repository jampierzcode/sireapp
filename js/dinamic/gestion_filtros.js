$(document).ready(async function () {
  var asesoresArray;
  var proyectosList;
  var listClientesSubidos;
  var eventosList;
  var ventasList;
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
    $("#asesor-search").attr("keyasesor", "Todos");
    $("#asesor-search span").text("Comparar Todos");
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
        </li>
    `;
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

  pintar_sedes(sedes);
  semanaGrafico();
  // pintar_asesores();
  $("#search_date_visitas").click(async function () {
    let fecha_inicio = dayjs(
      $("#fecha-inicio-search").val(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let fecha_fin = dayjs($("#fecha-fin-search").val(), "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    console.log(fecha_inicio, fecha_fin);
    if (fecha_inicio && fecha_fin) {
      await leads_subidos(fecha_inicio, fecha_fin);
      await pintar_grafico(fecha_inicio, fecha_fin);
      // leads_asignados(fecha_inicio, fecha_fin);
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
    $("#asesor-search").attr("keyAsesor", "Todos");
    $("#asesor-search span").html("Comparar Todos");
    semanaGrafico();
  });
  function buscar_eventos_asesores(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_eventos_by_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  function buscar_ventas_asesores(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_ventas_by_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  function pintar_leads_subidos_rendimiento(eventos, ventas) {
    const eventosFiltrados = eventos.filter((evento) =>
      listClientesSubidos.some(
        (cliente) => cliente.id_cliente === evento.cliente_id
      )
    );
    const ventasFiltrados = ventas.filter((evento) =>
      listClientesSubidos.some(
        (cliente) => cliente.id_cliente === evento.cliente_id
      )
    );
    let visitas_concretadas = eventosFiltrados.filter(
      (e) => e.status === "ASISTIO"
    ).length;
    console.log(visitas_concretadas);
    let visitas_no_concretadas = eventosFiltrados.filter(
      (e) => e.status === "NO ASISTIO"
    ).length;
    let ventas_a = ventasFiltrados.filter((v) => v.tipo === "VENTA").length;
    let separaciones = ventasFiltrados.filter(
      (v) => v.tipo === "SEPARACION"
    ).length;
    let totalLeadsSubidos = listClientesSubidos.length;

    console.log(totalLeadsSubidos);
    // Calcular los porcentajes
    const porcentajeVisitas = (
      (visitas_concretadas / totalLeadsSubidos) *
      100
    ).toFixed(2);
    console.log(porcentajeVisitas);
    const porcentajeSeparaciones = (
      (separaciones / totalLeadsSubidos) *
      100
    ).toFixed(2);
    const porcentajeVentas = ((ventas_a / totalLeadsSubidos) * 100).toFixed(2);

    // Datos para el gráfico
    const categorias = ["Visitas", "Separacion", "Ventas"];
    const porcentajes = [
      porcentajeVisitas,
      porcentajeSeparaciones,
      porcentajeVentas,
    ];
    const resultados = [visitas_concretadas, separaciones, ventas_a];

    // Referencia al contenedor del gráfico
    const chartContainer = document.getElementById("resultadosLeads");
    chartContainer.innerHTML = "";
    // Crear y agregar elementos del gráfico
    categorias.forEach((categoria, index) => {
      const barContainer = document.createElement("div");
      barContainer.className = "mb-4";

      const label = document.createElement("div");
      label.className = "text-gray-700 mb-2 text-sm font-bold";
      label.textContent = `${categoria}: ${resultados[index]} leads`;

      const bar = document.createElement("div");
      bar.className = "bg-[#5e3def] h-8 rounded text-white flex justify-center";
      bar.style.width = `${porcentajes[index]}%`;
      const textBar = document.createElement("p");
      textBar.textContent = `${porcentajes[index]}%`;
      barContainer.appendChild(label);
      bar.appendChild(textBar);
      barContainer.appendChild(bar);
      chartContainer.appendChild(barContainer);
    });
  }
  function pintar_leads_subidos_rendimiento_pdf(eventos, ventas) {
    const eventosFiltrados = eventos.filter((evento) =>
      listClientesSubidos.some(
        (cliente) => cliente.id_cliente === evento.cliente_id
      )
    );
    const ventasFiltrados = ventas.filter((evento) =>
      listClientesSubidos.some(
        (cliente) => cliente.id_cliente === evento.cliente_id
      )
    );
    let visitas_concretadas = eventosFiltrados.filter(
      (e) => e.status === "ASISTIO"
    ).length;
    console.log(visitas_concretadas);
    let visitas_no_concretadas = eventosFiltrados.filter(
      (e) => e.status === "NO ASISTIO"
    ).length;
    let ventas_a = ventasFiltrados.filter((v) => v.tipo === "VENTA").length;
    let separaciones = ventasFiltrados.filter(
      (v) => v.tipo === "SEPARACION"
    ).length;
    let totalLeadsSubidos = listClientesSubidos.length;

    console.log(totalLeadsSubidos);
    // Calcular los porcentajes
    const porcentajeVisitas = (
      (visitas_concretadas / totalLeadsSubidos) *
      100
    ).toFixed(2);
    console.log(porcentajeVisitas);
    const porcentajeSeparaciones = (
      (separaciones / totalLeadsSubidos) *
      100
    ).toFixed(2);
    const porcentajeVentas = ((ventas_a / totalLeadsSubidos) * 100).toFixed(2);

    // Datos para el gráfico
    const categorias = ["Visitas", "Separacion", "Ventas"];
    const porcentajes = [
      porcentajeVisitas,
      porcentajeSeparaciones,
      porcentajeVentas,
    ];
    const resultados = [visitas_concretadas, separaciones, ventas_a];

    return { categorias, porcentajes, resultados };
  }
  async function pintar_grafico(fecha_inicio, fecha_fin) {
    let sede_id = $("#filter-sede").val();

    let usuario = $("#asesor-search").attr("keyAsesor");
    let proyecto = $("#span-proyecto").attr("key_proyecto");
    return new Promise(async (resolve, reject) => {
      const eventos_asesores = await buscar_eventos_asesores(
        fecha_inicio,
        fecha_fin
      );
      const ventas_asesores = await buscar_ventas_asesores(
        fecha_inicio,
        fecha_fin
      );
      let asesores;
      let proyectosfilter;
      // filter para usuarios all or one
      if (usuario === "Todos") {
        asesores = asesoresArray.filter((a) => a.sede_id === sede_id);
      } else {
        asesores = asesoresArray.filter((a) => a.id_usuario === usuario);
      }
      // filter para proyectos all or one
      if (proyecto === "Todos") {
        proyectosfilter = proyectosList.filter((p) => p.sede_id === sede_id);
      } else {
        proyectosfilter = proyectosList.filter(
          (p) => p.id === proyecto && p.sede_id === sede_id
        );
      }
      // Obtener un array con solo los id_usuario
      const idsPermitidos = asesores.map((usuario) => usuario.id_usuario);
      const proyectosIdsPermitidos = proyectosfilter.map((p) => p.id);
      let filterData = eventos_asesores.filter((e) =>
        idsPermitidos.includes(e.user_id)
      );
      let filterproyectData = filterData.filter((f) =>
        proyectosIdsPermitidos.includes(f.proyet_id)
      );
      // filter data ventas
      let filterDataVentas = ventas_asesores.filter((e) =>
        idsPermitidos.includes(e.user_id)
      );
      let filterproyectDataVentas = filterDataVentas.filter((f) =>
        proyectosIdsPermitidos.includes(f.proyet_id)
      );
      // console.log(filterproyectDataVentas);
      // console.log(filterproyectData);

      // status de registro
      let contactado = filterproyectData.filter(
        (f) => f.status === "CONTACTADO"
      ).length;
      let no_repondio = filterproyectData.filter(
        (f) => f.status === "NO RESPONDIO"
      ).length;
      let no_interesado = filterproyectData.filter(
        (f) => f.status === "NO INTERESADO"
      ).length;
      let visitas_concretadas = filterproyectData.filter(
        (f) => f.status === "ASISTIO"
      ).length;
      let visitas_no_concretadas = filterproyectData.filter(
        (f) => f.status === "NO ASISTIO"
      ).length;
      let ventas = filterproyectDataVentas.filter(
        (f) => f.tipo === "VENTA"
      ).length;
      let separaciones = filterproyectDataVentas.filter(
        (f) => f.tipo === "SEPARACION"
      ).length;
      let template = "";
      template += `
    
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-black text-white inline-block w-max">
                                                CONTACTAR
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${contactado}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-yellow-400 text-white inline-block w-max">
                                                NO RESPONDIO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${no_repondio}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-orange-600 text-white inline-block w-max">
                                                NO INTERESADO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${no_interesado}
                                        </div>
                                    </div>
                                </li>

                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-green-600 text-white inline-block w-max">
                                                VISITAS CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${visitas_concretadas}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-red-300 text-white inline-block w-max">
                                                VISITAS NO CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${visitas_no_concretadas}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-green-800 text-white inline-block w-max">
                                                SEPARACIONES
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${separaciones}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-[#310ecd] text-white inline-block w-max">
                                                VENTAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${ventas}
                                        </div>
                                    </div>
                                </li>
    `;
      eventosList = filterproyectData;
      ventasList = filterproyectDataVentas;
      $("#listTotalesEventos").html(template);
      pintar_leads_subidos_rendimiento(
        filterproyectData,
        filterproyectDataVentas
      );

      resolve("resuelto");
    });
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
    return dayjs(date).startOf("week").add(1, "day").format("YYYY-MM-DD");
  }

  // Función para obtener la fecha de fin (domingo) de la semana actual
  function getEndOfWeek(date) {
    return dayjs(date).endOf("week").add(1, "day").format("YYYY-MM-DD");
  }
  async function semanaGrafico() {
    var fechaActual = dayjs().format("YYYY-MM-DD");

    // Obtener la fecha de inicio (lunes) de la semana actual
    var fechaInicioSemana = getStartOfWeek(fechaActual);

    // Obtener la fecha de fin (domingo) de la semana actual
    var fechaFinSemana = getEndOfWeek(fechaInicioSemana);
    $("#fecha-inicio-search").val(fechaInicioSemana);
    $("#fecha-fin-search").val(fechaFinSemana);

    await leads_subidos(fechaInicioSemana, fechaFinSemana);
    // await leads_asignados(fechaInicioSemana, fechaFinSemana);
    await pintar_grafico(fechaInicioSemana, fechaFinSemana);
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
      let data = proyectosList.find((p) => Number(p.id) === Number(idProyecto));
      console.log(data);
      $("#span-proyecto").text(data.nombre_proyecto);
      $("#span-proyecto").attr("key_proyecto", idProyecto);
    } else {
      $("#span-proyecto").text("Todos los proyectos");
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
  async function leads_subidos(fecha_inicio, fecha_fin) {
    // let usuario = $("#asesor-search").attr("keyAsesor");
    // console.log(usuario);
    let sede_id = $("#filter-sede").val();

    let usuario = $("#asesor-search").attr("keyAsesor");
    let proyecto = $("#span-proyecto").attr("key_proyecto");

    let asesores;
    let proyectosfilter;
    if (usuario === "Todos") {
      asesores = asesoresArray.filter((a) => a.sede_id === sede_id);
    } else {
      asesores = asesoresArray.filter((a) => a.id_usuario === usuario);
    }
    // filter para proyectos all or one
    if (proyecto === "Todos") {
      proyectosfilter = proyectosList.filter((p) => p.sede_id === sede_id);
    } else {
      proyectosfilter = proyectosList.filter(
        (p) => p.id === proyecto && p.sede_id === sede_id
      );
    }
    // Obtener un array con solo los id_usuario
    const proyectosIdsPermitidos = proyectosfilter.map((p) => p.id);

    let funcion = "buscar_group_clientes_fecha";
    return new Promise((resolve, reject) => {
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
          let data = [];
          let clientes;
          if (response.trim() === "no-register-clientes") {
            asesores.forEach((asesor) => {
              let newData = {
                nombre: asesor.nombre + " " + asesor.apellido,
                valor: 0,
              };
              data.push(newData);
            });
            clientes = [];
            listClientesSubidos = [];
          } else {
            clientes = JSON.parse(response);

            var totalLeadsCaptados = 0;

            listClientesSubidos = clientes.filter((f) =>
              proyectosIdsPermitidos.includes(f.proyet_id)
            );
            asesores.forEach((asesor) => {
              const dataclientes = clientes.filter(
                (c) => c.createdby === asesor.id_usuario
              );
              let filterproyectData = dataclientes.filter((f) =>
                proyectosIdsPermitidos.includes(f.proyet_id)
              );
              totalLeadsCaptados += filterproyectData.length;
              let newData = {
                nombre: asesor.nombre + " " + asesor.apellido,
                valor: filterproyectData.length,
              };
              data.push(newData);
            });
          }

          $("#containerTotalLeads").html(
            ` <p class="p-2 bg-gray-200">Total Leads Captados: <span><b>${totalLeadsCaptados} leads</b></span></p>`
          );
          crear_grafico(clientes);
          var top1 = data.reduce((max, d) => {
            return d.valor > max.valor ? d : max;
          }, data[0]);
          $("#top1leadssubidos").html(
            `<p class="text-sm my-4 font-bold">Top 1: ${top1.nombre} : ${top1.valor} leads </p>`
          );
          // Opciones del gráfico
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
                name: "Leads Subidos",
                type: "pie",
                radius: ["30%", "50%"],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                label: {
                  show: true,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: true,
                },
                data: data.map(function (asesor, index) {
                  return {
                    value: asesor.valor,
                    name: `${asesor.nombre}`,
                  };
                }),
              },
            ],
          };

          option && myChartSubidos.setOption(option);
          resolve("resuelto");
        }
      );
    });
  }
  async function leads_asignados(fecha_inicio, fecha_fin) {
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
    let sede_id = $("#filter-sede").val();
    let asesoresfilter = asesoresArray.filter((a) => a.sede_id === sede_id);
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
      asesoresfilter.forEach((asesor) => {
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
      let asesores = asesoresfilter.filter((persona) => {
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
  async function buscar_leads_subidos_by_asesores() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_leads_subidos_by_asesores";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }
  async function crear_grafico(clientes) {
    // const data_leads = await buscar_leads_subidos_by_asesores();
    // console.log(data_leads);
    const conteoOrígenes = clientes.reduce((acc, cliente) => {
      const origen = cliente.origen;
      acc[origen] = (acc[origen] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(conteoOrígenes).map((origen) => {
      return { categoria: origen, cantidad: conteoOrígenes[origen] };
    });
    console.log(data);
    // Tu array de objetos

    // Extraer categorías y cantidades
    const categorias = data.map((item) => item.categoria);
    const cantidades = data.map((item) => item.cantidad);

    // Inicializar el gráfico en el contenedor
    var myChart = echarts.init(document.getElementById("leadGrafico"));

    // Configuración del gráfico
    var option = {
      title: {
        text: "Leads Captados por Origen",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: categorias,
        axisLabel: {
          interval: 0, // Mostrar todas las etiquetas
          rotate: 30, // Rotar etiquetas para evitar solapamientos
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Leads",
          type: "bar",
          data: cantidades,
          itemStyle: {
            color: "#310ecd",
          },
        },
      ],
    };

    // Mostrar el gráfico

    myChart.setOption(option);
  }
  function crear_grafico_totales() {
    // Simulación de datos obtenidos de la base de datos
    const data = [
      {
        categoria: "Facebook Ads",
        cantidad: 10,
        visitas: 7,
        separaciones: 3,
        ventas: 1,
      },
      {
        categoria: "WhatsApp",
        cantidad: 15,
        visitas: 10,
        separaciones: 5,
        ventas: 3,
      },
      {
        categoria: "Marketplace",
        cantidad: 8,
        visitas: 5,
        separaciones: 2,
        ventas: 2,
      },
      {
        categoria: "Messenger",
        cantidad: 7,
        visitas: 4,
        separaciones: 1,
        ventas: 0,
      },
      {
        categoria: "Tiktok",
        cantidad: 12,
        visitas: 8,
        separaciones: 3,
        ventas: 2,
      },
      {
        categoria: "Instagram",
        cantidad: 9,
        visitas: 6,
        separaciones: 2,
        ventas: 1,
      },
      {
        categoria: "Llamada",
        cantidad: 6,
        visitas: 4,
        separaciones: 1,
        ventas: 1,
      },
      {
        categoria: "Otro",
        cantidad: 3,
        visitas: 2,
        separaciones: 0,
        ventas: 0,
      },
    ];

    // Calcular el total de leads
    const totalLeads = data.reduce((sum, item) => sum + item.cantidad, 0);

    // Calcular el total de visitas, separaciones y ventas
    const totalVisitas = data.reduce((sum, item) => sum + item.visitas, 0);
    const totalSeparaciones = data.reduce(
      (sum, item) => sum + item.separaciones,
      0
    );
    const totalVentas = data.reduce((sum, item) => sum + item.ventas, 0);

    // Calcular los porcentajes
    const porcentajeVisitas = ((totalVisitas / totalLeads) * 100).toFixed(0);
    const porcentajeSeparaciones = (
      (totalSeparaciones / totalLeads) *
      100
    ).toFixed(0);
    const porcentajeVentas = ((totalVentas / totalLeads) * 100).toFixed(0);

    // Datos para el gráfico
    const categorias = ["Visitas", "Separacion", "Ventas"];
    const porcentajes = [
      porcentajeVisitas,
      porcentajeSeparaciones,
      porcentajeVentas,
    ];
    const resultados = [totalVisitas, totalSeparaciones, totalVentas];

    // Referencia al contenedor del gráfico
    const chartContainer = document.getElementById("resultadosLeads");
    console.log(chartContainer);

    // Crear y agregar elementos del gráfico
    categorias.forEach((categoria, index) => {
      const barContainer = document.createElement("div");
      barContainer.className = "mb-4";

      const label = document.createElement("div");
      label.className = "text-gray-700 mb-2 text-sm font-bold";
      label.textContent = `${categoria}: ${resultados[index]} leads`;

      const bar = document.createElement("div");
      bar.className = "bg-[#5e3def] h-8 rounded text-white flex justify-center";
      bar.style.width = `${porcentajes[index]}%`;
      const textBar = document.createElement("p");
      textBar.textContent = `${porcentajes[index]}%`;
      barContainer.appendChild(label);
      bar.appendChild(textBar);
      barContainer.appendChild(bar);
      chartContainer.appendChild(barContainer);
    });
  }
  // crear_grafico_totales();

  // imprimir contenido de reportes dashboard
  $("#report_resume").on("click", function () {
    $("#modalPrintHistorial").removeClass("hidden");
    $("#boletaContent").removeClass("hidden");
    let template = "";
    let usuario = $("#asesor-search").attr("keyAsesor");
    let sede_id = $("#filter-sede").val();
    let asesores;
    if (usuario === "Todos") {
      asesores = asesoresArray.filter((a) => a.sede_id === sede_id);
    } else {
      asesores = asesoresArray.filter((a) => a.id_usuario === usuario);
    }
    console.log(listClientesSubidos);
    template += `
    
      <h1 class="text-lg font-bold mb-4">REPORTE DE EFICIENCIA - ASESORES</h1>
    `;
    asesores.forEach((a, index) => {
      let totalLeads = listClientesSubidos.filter(
        (l) => l.createdby === a.id_usuario
      );
      const dataClientes = listClientesSubidos.filter(
        (l) => l.createdby === a.id_usuario
      );
      console.log(dataClientes);
      const conteoOrígenes = dataClientes.reduce((acc, cliente) => {
        const origen = cliente.origen;
        acc[origen] = (acc[origen] || 0) + 1;
        return acc;
      }, {});

      const dataOrigenes = Object.keys(conteoOrígenes).map((origen) => {
        return { categoria: origen, cantidad: conteoOrígenes[origen] };
      });
      console.log(dataOrigenes);
      let templateOrigenes = "";
      templateOrigenes += `
      <ul role="list" class="w-full divide-y divide-gray-200 dark:divide-gray-700">
      `;

      dataOrigenes.forEach((o) => {
        templateOrigenes += `
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          ${o.categoria}
                      </p>
                  </div>
                  <div id="resumen-visitas" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  ${o.cantidad}
                  </div>
              </div>
          </li>
        `;
      });
      templateOrigenes += `
            </ul>
      `;

      // visitas concretadas separaciones y ventas

      const eventosAsesor = eventosList.filter(
        (e) => e.user_id === a.id_usuario
      );
      const ventasAsesor = ventasList.filter((e) => e.user_id === a.id_usuario);
      const { categorias, porcentajes, resultados } =
        pintar_leads_subidos_rendimiento_pdf(eventosAsesor, ventasAsesor);

      let templateDatosSepVen = "";
      categorias.forEach((categoria, index) => {
        templateDatosSepVen += `
          <div class="mb-4">
            <div class="text-gray-700 mb-2 text-sm font-bold">
              ${categoria}: ${resultados[index]} leads
              <div style="width: ${porcentajes[index]}%;" class="bg-[#5e3def] h-8 rounded text-white flex justify-center">
                <p>${porcentajes[index]}%</p>
              
              </div>  
            </div>
          </div>
        `;
      });
      // PLANTILLA FINAL

      template += `
      <div>
        <div class="h-[2px] bg-gray-100"></div>
        <div class="flex flex-col items-center justify-center mb-4">
        <img class="rounded-full" src="../../img/avatar_default.jpg" alt="">
        <p>${a.nombre + " " + a.apellido}</p>
        <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Analisis por leads subidos</h1>
        <div class="flex bg-white shadow-md justify-between px-4 py-3 items-center w-full">
            <div class=" rounded">
                <h1 class="text-sm text-gray-500 font-bold">Leads Subidos</h1>
                <span class="text-[#5208dd] font-bold text-3xl" id="data-proyectos">${
                  totalLeads.length
                }</span>
            </div>
            <ion-icon name="pricetag-outline" class="text-3xl font-bold text-[#5208dd]"></ion-icon>
        </div>
        <h1 class="text-sm text-gray-500 font-bold my-4">Leads Captados por Origen</h1>
        ${templateOrigenes}
        </div>
        <h1 class="text-sm text-gray-500 font-bold my-4">VISITAS VENTAS Y SEPARACIONES</h1>
        ${templateDatosSepVen}
        </div>
      </div>
      `;
    });
    $("#boletaContent").html(template);
  });
  $("#pdf-report").on("click", function () {
    // Generar PDF con html2pdf

    const element = document.getElementById("boletaContent");
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `REPORTE_RESUMEN.pdf"`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        console.log(pdf);
        // Guardar el PDF con el nombre deseado
        pdf.save(`REPORTE-RESUMEN-DATE.pdf`);
        // Mostrar PDF en el visor
        // const pdfDataUri = pdf.output("datauristring");
        // $("#boletaContent").addClass("hidden");
        // $("#pdfoutput").html(
        //   `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        // );
      });
  });
  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    if ($(event.target).attr("id") === "modalPrintHistorial") {
      console.log("click");
      $("#modalPrintHistorial").addClass("hidden");
    }
  });
});
