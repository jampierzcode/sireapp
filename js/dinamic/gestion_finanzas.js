$(document).ready(async function () {
  var transaccionesList = [];
  var ingresosList = [];
  var gastosList = [];
  var gastosSedeList = [];
  var proyectosList = [];
  var comisionesList = [];

  // proyectos
  await buscar_proyectos();
  async function buscar_proyectos() {
    funcion = "buscar_proyectos_admin";
    const response = await $.post("../../controlador/UsuarioController.php", {
      funcion,
    });
    const proyectos = JSON.parse(response);
    console.log(proyectos);
    proyectosList = proyectos;
  }

  $("#proyecto-active").on("click", function () {
    $(".icon-proyecto-down").toggleClass("rotate-180");
    $("#list-proyectos").toggleClass("invisible");
  });
  $(document).on("click", "#list-proyectos li", function (e) {
    let idProyecto = $(this).attr("key_proyecto");
    console.log(idProyecto);
    if (idProyecto !== "Todos") {
      let data = proyectosList.find((p) => p.id === idProyecto);
      $("#span-proyecto").text(data.nombre_proyecto);
      $("#span-proyecto").attr("key_proyecto", idProyecto);
    } else {
      $("#span-proyecto").text("Todos los proyectos");
      $("#span-proyecto").attr("key_proyecto", "Todos");
    }
    $("#list-proyectos").addClass("invisible");
    $(".icon-proyecto-down").removeClass("rotate-180");
  });
  /************************************** */
  // FILTRO DE ESTA SEMANA
  // ESTA SEMANA
  function getStartOfWeek(date) {
    return dayjs(date).startOf("week").add(1, "day").format("YYYY-MM-DD");
  }
  // Función para obtener la fecha de fin (domingo) de la semana actual
  function getEndOfWeek(date) {
    return dayjs(date).endOf("week").add(1, "day").format("YYYY-MM-DD");
  }
  // ESTA MES
  function getStartOfMonth(date) {
    return dayjs(date).startOf("month").format("YYYY-MM-DD");
  }
  // Función para obtener la fecha de fin del mes actual
  function getEndOfMonth(date) {
    return dayjs(date).endOf("month").format("YYYY-MM-DD");
  }
  // MES ANTERIOR
  function getStartOfLastMonth(date) {
    return dayjs(date)
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
  }
  // Función para obtener la fecha de fin del mes actual
  function getEndOfLastMonth(date) {
    return dayjs(date).endOf("month").format("YYYY-MM-DD");
  }

  /************************************** */
  $("#filter_static").on("change", function (e) {
    const valor = e.target.value;
    let actualdia;
    let fecha_inicio;
    switch (valor) {
      case "this-week":
        var fechaActual = dayjs().format("YYYY-MM-DD");
        console.log(fechaActual);
        // Obtener la fecha de inicio (lunes) de la semana actual
        var fechaInicioSemana = getStartOfWeek(fechaActual);
        console.log("hola");
        // Obtener la fecha de fin (domingo) de la semana actual
        var fechaFinSemana = getEndOfWeek(fechaInicioSemana);
        $("#fecha-inicio-search").val(fechaInicioSemana);
        $("#fecha-fin-search").val(fechaFinSemana);

        break;
      case "this-month":
        var fechaActual = dayjs().format("YYYY-MM-DD");
        console.log(fechaActual);
        // Obtener la fecha de inicio (lunes) de la semana actual
        var fechaInicioSemana = getStartOfMonth(fechaActual);
        console.log("hola");
        // Obtener la fecha de fin (domingo) de la semana actual
        var fechaFinSemana = getEndOfMonth(fechaInicioSemana);
        $("#fecha-inicio-search").val(fechaInicioSemana);
        $("#fecha-fin-search").val(fechaFinSemana);

        break;
      case "last-month":
        var fechaActual = dayjs().format("YYYY-MM-DD");
        console.log(fechaActual);
        // Obtener la fecha de inicio (lunes) de la semana actual
        var fechaInicioSemana = getStartOfLastMonth(fechaActual);
        console.log("hola");
        // Obtener la fecha de fin (domingo) de la semana actual
        var fechaFinSemana = getEndOfLastMonth(fechaInicioSemana);
        $("#fecha-inicio-search").val(fechaInicioSemana);
        $("#fecha-fin-search").val(fechaFinSemana);

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
  //   proyectos fin
  async function buscar_transacciones(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_finanzas_admin";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            transaccionesList = [];
          } else {
            let data = JSON.parse(response);
            transaccionesList = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_ingresos(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_ingresos_admin";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            ingresosList = [];
          } else {
            let data = JSON.parse(response);
            ingresosList = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_gastos(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_gastos_admin";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          if (response.trim() === "no-register") {
            gastosList = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            gastosList = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_gastos_total_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_gastos_total_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
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
  async function buscar_gastos_admin_sede(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_gastos_admin_sede";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          if (response.trim() === "no-register") {
            gastosSedeList = [];
            resolve([]);
          } else {
            let data = JSON.parse(response);
            gastosSedeList = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_user_info_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_user_info_empresa";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register-business") {
            resolve({ msg: "No se encontraron registros" });
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
        }
      );
    });
  }
  // Generar PDF y cargar en el visor al abrir el modal
  function generatePDF(
    data_empresa,
    data_finanzas,
    data_gastos,
    data_gastos_sede,
    data_ingresos,
    data_comisiones
  ) {
    $("#boletaContent").removeClass("hidden");
    let proyectos = $("#span-proyecto").attr("key_proyecto");
    let nombre_proyecto;
    if (proyectos === "Todos") {
      nombre_proyecto = "Todos los proyectos";
    } else {
      let search_proyecto = proyectosList.find((p) => p.id === proyectos);
      console.log(search_proyecto);
      nombre_proyecto = search_proyecto.nombreProyecto;
    }
    $("#proyectos_reporte").html(nombre_proyecto);
    let rango_fecha = "";
    let fecha_inicio = $("#fecha-inicio-search").val();
    let fecha_fin = $("#fecha-fin-search").val();
    console.log(fecha_inicio, fecha_fin);
    rango_fecha += `${dayjs(fecha_inicio).format("DD/MM/YYYY")} - ${dayjs(
      fecha_fin
    ).format("DD/MM/YYYY")}`;
    $("#rango_fecha_reporte").html(rango_fecha);
    var total_finanzas = 0;
    var total_finanzas_efectivo = 0;
    var total_finanzas_transferencias = 0;
    var total_rendir = 0;
    var total_rendir_efectivo = 0;
    var total_gastos = 0;
    var total_gastos_sede = 0;
    var total_comisiones = 0;
    var total_ingresos = 0;
    var template_business = "";
    var template_transacciones = "";
    var template_gastos = "";
    var template_gastos_sede = "";
    var template_ingresos = "";
    var template_comisiones = "";
    template_business += `
        <img width="80px" class="mx-auto block" src="../../${data_empresa[0].logo}" alt="">
        <h1 class="text-center w-full block text-sm">${data_empresa[0].nombre_razon}</h1>
        <h1 class="text-center w-full block text-sm">${data_empresa[0].email}</h1>
        <h1 class="text-center w-full block text-sm">${data_empresa[0].phone_contact}</h1>
        `;
    if (data_finanzas.length > 0) {
      data_finanzas.forEach((data) => {
        total_finanzas = total_finanzas + Number(data.monto);
        switch (data.metodo_pago) {
          case "EFECTIVO":
            total_finanzas_efectivo =
              total_finanzas_efectivo + Number(data.monto);
            break;
          case "TRANSFERENCIA":
            total_finanzas_transferencias =
              total_finanzas_transferencias + Number(data.monto);
            break;

          default:
            break;
        }
        template_transacciones += `
              <tr>
              <td class="border px-2 py-2 text-xs">${data.motivo_operacion}</td>
              <td class="border px-2 py-2 text-xs">${dayjs(data.fecha).format(
                "DD/MM/YYYY"
              )} <br/> ${dayjs(data.fecha).format("HH:mm:ss")}</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_cliente} ${
          data.apellido_cliente
        }</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_proyecto}</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.metodo_pago
              }</td>
              <td class="border px-2 py-2 font-bold text-xs">S/${(
                (data.monto * 100) /
                100
              ).toFixed(2)}</td>
                  
                  </tr>
                  `;
      });
    }
    $("#transacciones").html(template_transacciones);

    $("#total_finanzas").html(`S/${((total_finanzas * 100) / 100).toFixed(2)}`);
    $("#total_finanzas_efectivo").html(
      `S/${((total_finanzas_efectivo * 100) / 100).toFixed(2)}`
    );
    $("#total_finanzas_transferencias").html(
      `S/${((total_finanzas_transferencias * 100) / 100).toFixed(2)}`
    );
    if (data_gastos_sede.length > 0) {
      data_gastos_sede.forEach((data) => {
        total_gastos_sede = total_gastos_sede + Number(data.monto_gasto);
        template_gastos_sede += `
            <tr>
              <td class="border px-2 py-2 text-xs">${data.descripcion}</td>
              <td class="border px-2 py-2 text-xs">${dayjs(data.fecha).format(
                "DD/MM/YYYY"
              )} <br/> ${dayjs(data.fecha).format("HH:mm:ss")}</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.tipo_gasto
              }</td>
              <td class="border px-2 py-2 font-bold text-xs">S/${(
                (data.monto_gasto * 100) /
                100
              ).toFixed(2)}</td>
              
            </tr>
              `;
      });
    }
    if (data_comisiones.length > 0) {
      data_comisiones.forEach((data) => {
        total_comisiones = total_comisiones + Number(data.monto_comision);
        template_comisiones += `
            <tr>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.tipo_pago
              }</td>
              <td class="border px-2 py-2 font-bold text-xs">${dayjs(
                data?.fecha
              ).format("DD/MM/YYYY")}</td>
              <td class="border px-2 py-2 text-xs">${data.tipo_comision}</td>
              <td class="border px-2 py-2 text-xs">${
                data.monto_tipo_comision
              }</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data?.nombre_asesor
              } ${data?.apellido_asesor}</td>
              <td class="border px-2 py-2 text-xs font-bold">S/${(
                (data.monto_comision * 100) /
                100
              ).toFixed(2)}</td>
              
              
            </tr>
              `;
      });
    }
    if (data_gastos.length > 0) {
      data_gastos.forEach((data) => {
        total_gastos = total_gastos + Number(data.monto_gasto);
        template_gastos += `
            <tr>
              <td class="border px-2 py-2 text-xs">${data.descripcion}</td>
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.tipo_gasto
              }</td>
              <td class="border px-2 py-2 font-bold text-xs">S/${(
                (data.monto_gasto * 100) /
                100
              ).toFixed(2)}</td>
              
            </tr>
              `;
      });
    }
    if (data_ingresos.length > 0) {
      data_ingresos.forEach((data) => {
        total_ingresos = total_ingresos + Number(data.monto_ingreso);
        template_ingresos += `
            <tr>
              <td class="border px-2 py-2 text-xs">${data.descripcion}</td>
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.tipo_ingreso
              }</td>
              <td class="border px-4 py-2 font-bold text-xs">S/${(
                (data.monto_ingreso * 100) /
                100
              ).toFixed(2)}</td>
              
            </tr>
              `;
      });
    }

    $("#gastos").html(template_gastos);
    $("#gastos_sede").html(template_gastos_sede);
    $("#ingresos").html(template_ingresos);
    $("#comisiones").html(template_comisiones);
    $("#total_gastos").html(`S/${((total_gastos * 100) / 100).toFixed(2)}`);
    $("#total_gastos_sede").html(
      `S/${((total_gastos_sede * 100) / 100).toFixed(2)}`
    );
    $("#total_comisiones").html(
      `S/${((total_comisiones * 100) / 100).toFixed(2)}`
    );
    $("#total_ingresos").html(`S/${((total_ingresos * 100) / 100).toFixed(2)}`);
    total_rendir =
      total_finanzas -
      total_gastos -
      total_gastos_sede -
      total_comisiones +
      total_ingresos;
    total_rendir_efectivo =
      total_finanzas_efectivo +
      total_ingresos -
      total_gastos -
      total_gastos_sede -
      total_comisiones;
    $("#datosBusiness").html(template_business);
    $("#rendirTotal").html(`S/${((total_rendir * 100) / 100).toFixed(2)}`);
    $("#rendirTotalEfectivo").html(
      `S/${((total_rendir_efectivo * 100) / 100).toFixed(2)}`
    );

    const element = document.getElementById("boletaContent");

    // Generar PDF con html2pdf
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `REPORTE_RESUMEN${rango_fecha}.pdf"`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        // Guardar el PDF con el nombre deseado
        pdf.save(`REPORTE-RESUMEN-DATE-${rango_fecha}.pdf`);
        // Mostrar PDF en el visor
        const pdfDataUri = pdf.output("datauristring");
        $("#pdfoutput").html(
          `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        );
        $("#boletaContent").addClass("hidden");
      });
  }
  $("#reporte_resumen").on("click", async function () {
    const data_empresa = await buscar_user_info_empresa();
    console.log(data_empresa, transaccionesList, gastosList, ingresosList);
    generatePDF(
      data_empresa,
      transaccionesList,
      gastosList,
      gastosSedeList,
      ingresosList,
      comisionesList
    );
    $("#modalPrintHistorial").removeClass("hidden");
  });
  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    if ($(event.target).attr("id") === "modalPrintHistorial") {
      console.log("click");
      $("#modalPrintHistorial").addClass("hidden");
    }
  });

  function pintar_comparacion(ingresos, gastos) {
    var comparacion = document.getElementById("comparacion_general");
    var muChartComparacion = echarts.init(comparacion);
    var option;

    // Obtener todas las fechas únicas de data1 y data2
    const allDates = [
      ...new Set([
        ...ingresos.map((item) => dayjs(item.fecha).format("DD/MM/YYYY")),
        ...gastos.map((item) => dayjs(item.fecha).format("DD/MM/YYYY")),
      ]),
    ];

    // Obtener un objeto con las sumas de los montos por fecha
    const sumByDateIngresos = ingresos.reduce((acc, item) => {
      const date = dayjs(item.fecha).format("DD/MM/YYYY");
      acc[date] = (acc[date] || 0) + Number(item.monto_ingreso);
      return acc;
    }, {});
    const sumByDateGastos = gastos.reduce((acc, item) => {
      const date = dayjs(item.fecha).format("DD/MM/YYYY");
      acc[date] = (acc[date] || 0) + Number(item.monto_gasto);
      return acc;
    }, {});

    // Completar los datos para que cada serie tenga todas las fechas
    const completeData1 = allDates.map((date) => ({
      fecha: date,
      monto: sumByDateIngresos[date] || 0,
    }));
    const completeData2 = allDates.map((date) => ({
      fecha: date,
      monto: sumByDateGastos[date] || 0,
    }));

    option = {
      xAxis: {
        type: "category",
        data: allDates,
      },
      yAxis: {
        type: "value",
      },
      legend: {
        top: 10,
        data: ["Ingresos", "Gastos"],
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          const date = params[0].axisValue;
          let content = `<p class="font-bold text-xs">fecha: ${date}</p>`;
          params.forEach((param) => {
            if (param.data !== undefined) {
              let colortext =
                param.seriesName === "Ingresos"
                  ? "text-green-700"
                  : "text-red-500";
              content += `<p class="font-bold ${colortext} text-xs">${
                param.seriesName
              }: S/${((param.data * 100) / 100).toFixed(2)}</p>`;
            }
          });
          return content;
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          type: "slider",
          show: true,
          start: 0,
          end: 100,
          handleSize: 8,
          move: true, // Habilita el desplazamiento del gráfico al arrastrar
        },
      ],
      series: [
        {
          name: "Ingresos",
          type: "line",
          data: completeData1.map((item) => item.monto),
          lineStyle: {
            color: "green",
          },
          itemStyle: {
            color: "green",
          },
          smooth: true,
          emphasis: {
            focus: "series", // Destaca solo la serie en la que se posó el mouse
          },
          areaStyle: {
            color: "rgba(21, 128, 0, 0.3)", // Color del área debajo de la línea de gastos
          },
        },
        {
          name: "Gastos",
          type: "line",
          data: completeData2.map((item) => item.monto),
          lineStyle: {
            color: "red",
          },
          itemStyle: {
            color: "red",
          },
          smooth: true,
          emphasis: {
            focus: "series", // Destaca solo la serie en la que se posó el mouse
          },
          areaStyle: {
            color: "rgba(255, 0, 0, 0.3)", // Color del área debajo de la línea de gastos
          },
        },

        // {
        //   name: "Data 2",
        //   type: "line",
        //   data: completeData2.map((item) => item.monto),
        //   lineStyle: {
        //     color: "blue",
        //   },
        // },
      ],
    };

    option && muChartComparacion.setOption(option);
  }
  function pintar_resumen(
    ingresos,
    gastos,
    inversiones,
    gastos_total_admin,
    comisiones
  ) {
    let suma_ingresos = 0;
    let suma_gastos = 0;
    let suma_gastos_total_admin = 0;
    let suma_ganancias = 0;
    let suma_inversiones = 0;
    let suma_comisiones = 0;

    // estos estados serviran para filtrar segun el proyecto
    inversiones.forEach((i) => {
      suma_inversiones = suma_inversiones + Number(i.monto_inversion);
    });
    gastos_total_admin.forEach((g) => {
      suma_gastos_total_admin = suma_gastos_total_admin + Number(g.monto_gasto);
    });
    comisiones.forEach((c) => {
      suma_comisiones = suma_comisiones + Number(c.monto_comision);
    });
    if (ingresos.length > 0) {
      ingresos.forEach((i) => {
        suma_ingresos = suma_ingresos + Number(i.monto_ingreso);
      });
    }
    if (gastos.length > 0) {
      gastos.forEach((i) => {
        suma_gastos = suma_gastos + Number(i.monto_gasto);
      });
    }

    suma_ganancias = suma_ingresos - suma_gastos - suma_comisiones;
    $("#resumen_comisiones").html(
      `S/${((suma_comisiones * 100) / 100).toFixed(2)}`
    );
    $("#resumen_ingresos").html(
      `S/${((suma_ingresos * 100) / 100).toFixed(2)}`
    );
    $("#resumen_gastos").html(`S/${((suma_gastos * 100) / 100).toFixed(2)}`);
    $("#resumen_ganancias").html(
      `S/${((suma_ganancias * 100) / 100).toFixed(2)}`
    );
    $("#resumen_inversion").html(
      `S/${((suma_inversiones * 100) / 100).toFixed(2)}`
    );
    $("#resumen_saldo").html(
      `S/${(((suma_inversiones - suma_gastos_total_admin) * 100) / 100).toFixed(
        2
      )}`
    );
  }
  async function buscar_inversiones_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_inversiones_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() == "no-register") {
            inversionesList = [];
            resolve([]);
          } else {
            const data = JSON.parse(response);
            inversionesList = data;
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_comisiones_admin(fecha_inicio, fecha_fin) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_comisiones_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
            comisionesList = [];
          } else {
            let data = JSON.parse(response);
            resolve(data);
            comisionesList = data;
          }
        }
      );
    });
  }
  async function pintar_grafico(fecha_inicio, fecha_fin) {
    let sede_id = $("#filter-sede").val();
    let proyectos = $("#span-proyecto").attr("key_proyecto");
    let transacciones = await buscar_transacciones(fecha_inicio, fecha_fin);
    console.log(transacciones);
    let ingresos_caja = await buscar_ingresos(fecha_inicio, fecha_fin);
    console.log(ingresos_caja);
    let gastos = await buscar_gastos(fecha_inicio, fecha_fin);
    console.log(gastos);
    let gastos_sede = await buscar_gastos_admin_sede(fecha_inicio, fecha_fin);
    let gastos_total_admin = await buscar_gastos_total_admin();
    let inversiones = await buscar_inversiones_admin();
    let comisiones = await buscar_comisiones_admin(fecha_inicio, fecha_fin);
    console.log(comisiones);
    let filterInversiones;
    let filterComisiones;
    let filterIngresos;
    let filtergastos;
    let filtergastosTotalAdmin;
    let data_ingresos;
    let data_gastos;
    if (transacciones.length > 0 || ingresos_caja.length > 0) {
      let formatedDataTran = transacciones.map((t) => {
        const { monto, ...rest } = t; // extraer el campo monto y almacenar el resto en rest
        return {
          ...rest, // mantener todos los datos excepto monto
          monto_ingreso: monto, // renombrar monto a monto_ingreso
        };
      });
      data_ingresos = formatedDataTran.concat(ingresos_caja);
    } else {
      data_ingresos = [];
    }
    if (gastos.length > 0 || gastos_sede.length > 0) {
      data_gastos = gastos.concat(gastos_sede);
    } else {
      data_gastos = [];
    }
    console.log(data_gastos);
    if (proyectos !== "Todos") {
      filterIngresos = data_ingresos.filter(
        (i) => i.proyecto_id === proyectos && i.sede_id === sede_id
      );
      // separar transacciones e ingresos para reportes
      transaccionesList = transacciones.filter(
        (t) => t.proyecto_id === proyectos && t.sede_id === sede_id
      );
      ingresosList = ingresos_caja.filter(
        (t) => t.proyecto_id === proyectos && t.sede_id === sede_id
      );
      gastosList = gastos.filter(
        (t) => t.proyecto_id === proyectos && t.sede_id === sede_id
      );
      gastosSedeList = gastos_sede.filter(
        (t) => t.proyecto_id === proyectos && t.sede_id === sede_id
      );
      // fin de separacion
      filtergastos = data_gastos.filter(
        (i) => i.proyecto_id === proyectos && i.sede_id === sede_id
      );
      filtergastosTotalAdmin = gastos_total_admin.filter(
        (i) => i.proyecto_id === proyectos && i.sede_id === sede_id
      );
      filterInversiones = inversiones.filter(
        (i) => i.proyecto_id === proyectos
      );
      filterComisiones = comisiones.filter((c) => c.proyecto_id === proyectos);
    } else {
      filterIngresos = data_ingresos.filter((i) => i.sede_id === sede_id);
      filtergastos = data_gastos.filter((g) => g.sede_id === sede_id);
      filtergastosTotalAdmin = gastos_total_admin.filter(
        (g) => g.sede_id === sede_id
      );
      filterInversiones = inversiones;
      filterComisiones = comisiones.filter((c) => c.sede_id === sede_id);
    }
    pintar_resumen(
      filterIngresos,
      filtergastos,
      filterInversiones,
      filtergastosTotalAdmin,
      filterComisiones
    );
    pintar_comparacion(filterIngresos, filtergastos);
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
  }
  $("#filter-sede").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos_sede(sede_id);
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
  var sedes = await buscar_sedes_by_usuario();
  console.log(sedes);
  pintar_sedes(sedes);
  mesGrafico();
  function mesGrafico() {
    var fechaActual = dayjs().format("YYYY-MM-DD");

    // Obtener la fecha de inicio (lunes) de la semana actual
    var fecha_inicio = getStartOfMonth(fechaActual);

    // Obtener la fecha de fin (domingo) de la semana actual
    var fecha_fin = getEndOfMonth(fecha_inicio);
    $("#fecha-inicio-search").val(fecha_inicio);
    $("#fecha-fin-search").val(fecha_fin);
    $("#filter_static").val("this-month");
    pintar_grafico(fecha_inicio, fecha_fin);
  }
  $("#search_date_finanzas").click(function () {
    let fecha_inicio = dayjs(
      $("#fecha-inicio-search").val(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let fecha_fin = dayjs($("#fecha-fin-search").val(), "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    if (fecha_inicio && fecha_fin) {
      pintar_grafico(fecha_inicio, fecha_fin);
    }
  });
  $("#refresh_date_finanzas").click(function () {
    mesGrafico();
  });
  //   let transacciones = await buscar_transacciones();
  //   console.log(transacciones);
});
