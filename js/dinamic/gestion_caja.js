$(document).ready(async function () {
  var caja;
  var sedeId;
  var rendirTotalState = 0;
  const meses = [
    { espanol: "Enero", ingles: "January" },
    { espanol: "Febrero", ingles: "February" },
    { espanol: "Marzo", ingles: "March" },
    { espanol: "Abril", ingles: "April" },
    { espanol: "Mayo", ingles: "May" },
    { espanol: "Junio", ingles: "June" },
    { espanol: "Julio", ingles: "July" },
    { espanol: "Agosto", ingles: "August" },
    { espanol: "Septiembre", ingles: "September" },
    { espanol: "Octubre", ingles: "October" },
    { espanol: "Noviembre", ingles: "November" },
    { espanol: "Diciembre", ingles: "December" },
  ];
  async function buscar_by_user_info_empresa() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_by_user_info_empresa";
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
    data_turno,
    data_empresa,
    data_finanzas,
    data_gastos,
    data_ingresos
  ) {
    $("#boletaContent").removeClass("hidden");
    var total_finanzas = 0;
    var monto_inicial = data_turno.monto_apertura;
    var total_finanzas_efectivo = 0;
    var total_finanzas_transferencias = 0;
    var total_rendir = 0;
    var total_rendir_efectivo = 0;
    var total_gastos = 0;
    var total_ingresos = 0;
    var template_business = "";
    var template_transacciones = "";
    var template_gastos = "";
    var template_ingresos = "";
    $("#monto_inicial").html(
      `S/${((data_turno.monto_apertura * 100) / 100).toFixed(2)}`
    );
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
              <td class="border px-2 py-2 text-xs">${data.fecha}</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_cliente} ${
          data.apellido_cliente
        } <br/> ${data.documento}</td>
              <td class="border px-2 py-2 text-xs">${data.nombre_proyecto}</td>
              <td class="border px-2 py-2 font-bold text-xs">${
                data.metodo_pago
              } ${
          data?.numero_operacion !== null ? data?.numero_operacion : ""
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
    $("#ingresos").html(template_ingresos);
    $("#total_gastos").html(`S/${((total_gastos * 100) / 100).toFixed(2)}`);
    $("#total_ingresos").html(`S/${((total_ingresos * 100) / 100).toFixed(2)}`);
    total_rendir =
      Number(monto_inicial) + total_finanzas - total_gastos + total_ingresos;
    total_rendir_efectivo =
      Number(monto_inicial) +
      total_finanzas_efectivo +
      total_ingresos -
      total_gastos;
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
        filename: "boleta.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        // Mostrar PDF en el visor
        const pdfDataUri = pdf.output("datauristring");
        $("#pdfoutput").html(
          `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        );
        $("#boletaContent").addClass("hidden");
      });
  }
  $("#reporte_caja").on("click", async function () {
    let data_turno = caja;
    const data_empresa = await buscar_by_user_info_empresa();
    const data_finanzas = await finanzas();
    const data_gastos = await gastos();
    const data_ingresos = await ingresos();
    console.log(data_gastos);
    generatePDF(
      data_turno,
      data_empresa,
      data_finanzas,
      data_gastos,
      data_ingresos
    );
    $("#modalPrintHistorial").removeClass("hidden");
  });
  // Cerrar modal al hacer clic fuera de él
  $(document).on("click", function (event) {
    console.log(event.target);
    if ($(event.target).attr("id") === "modalPrintHistorial") {
      console.log("click");
      $("#modalPrintHistorial").addClass("hidden");
    }
  });
  async function finanzas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_finanzas_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: caja.id },
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
  async function gastos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_gastos_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: caja.id },
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
  async function ingresos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_ingresos_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: caja.id },
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
  async function pintarCaja() {
    const mes = dayjs(caja?.fecha).format("MMMM");
    const mesSpanish = meses.find((m) => m.ingles === mes);
    const fechaFormateada = dayjs(caja?.fecha_apertura).format(
      `DD [de] [${mesSpanish.espanol}] [a las] HH:mm`
    );
    const monto_apertura = Number(caja?.monto_apertura);

    $("#name_caja").text(caja.nombre);
    $("#fecha_apertura_caja").text(fechaFormateada);
    $("#responsable_caja").text(
      caja?.nombre_cajero + " " + caja?.apellido_cajero
    );
    const data_finanzas = await finanzas();
    const data_gastos = await gastos();
    const data_ingresos = await ingresos();
    console.log(data_gastos);
    let rendir_total = 0;
    let rendir_efectivo = 0;
    let ventas_total = 0;
    let ventas_efectivo = 0;
    let ventas_transferencias = 0;
    let gastos_total = 0;
    let ingresos_total = 0;

    if (data_finanzas.length > 0) {
      data_finanzas.forEach((f) => {
        ventas_total = ventas_total + Number(f.monto);
        switch (f.metodo_pago) {
          case "EFECTIVO":
            ventas_efectivo = ventas_efectivo + Number(f.monto);
            break;
          case "TRANSFERENCIA":
            ventas_transferencias = ventas_transferencias + Number(f.monto);
            break;

          default:
            break;
        }
      });
    }
    if (data_gastos.length > 0) {
      data_gastos.forEach((g) => {
        gastos_total = gastos_total + Number(g.monto_gasto);
      });
    }
    if (data_ingresos.length > 0) {
      data_ingresos.forEach((i) => {
        ingresos_total = ingresos_total + Number(i.monto_ingreso);
      });
    }
    rendir_total =
      rendir_total -
      gastos_total +
      ingresos_total +
      monto_apertura +
      ventas_total;
    rendir_efectivo =
      rendir_efectivo -
      gastos_total +
      ingresos_total +
      monto_apertura +
      ventas_efectivo;

    rendirTotalState = rendir_total;
    let in_gas = ingresos_total - gastos_total;
    $("#saldo_inicial").text("S/" + ((monto_apertura * 100) / 100).toFixed(2));
    // ventas
    $("#ventas_total").text("S/" + ((ventas_total * 100) / 100).toFixed(2));
    $("#ventas_efectivo").text(
      "S/" + ((ventas_efectivo * 100) / 100).toFixed(2)
    );
    $("#ventas_transferencias").text(
      "S/" + ((ventas_transferencias * 100) / 100).toFixed(2)
    );
    //   gastos
    $("#gastos_total").text("S/" + ((gastos_total * 100) / 100).toFixed(2));
    $("#ingresos_total").text("S/" + ((ingresos_total * 100) / 100).toFixed(2));
    $("#saldo_in_gas_total").text("S/" + ((in_gas * 100) / 100).toFixed(2));
    //   rendir
    $("#rendir_total").text("S/" + ((rendir_total * 100) / 100).toFixed(2));
    $("#rendir_efectivo").text(
      "S/" + ((rendir_efectivo * 100) / 100).toFixed(2)
    );
  }
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            $("#registra-caja-abierta").removeClass("md-hidden");
            setTimeout(() => {
              $("#registra-caja-abierta .form-create").addClass("modal-show");
            }, 300);
            add_toast("error", "No haz abierto ninguna caja");
            resolve("no-register");
            $("#sectionopencaja").removeClass("hidden");
          } else {
            add_toast("success", "tienes una caja abierta");
            let data = JSON.parse(response);
            caja = data[0];
            pintarCaja();
            resolve("si-register");
            $("#cajaAbierta").removeClass("hidden");
            $("#sectionopencaja").addClass("hidden");
          }
        }
      );
    });
  }
  async function buscar_cajas(sede_id) {
    let funcion = "buscar_cajas";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, sede_id },
        (response) => {
          console.log(response);
          if (response.trim() === "no-register") {
            add_toast(
              "error",
              "No hay cajas registradas, contacta al administrador"
            );
            resolve({ error: response });
          } else {
            let cajas = JSON.parse(response);
            let template = "";
            cajas.forEach((caja) => {
              template += `
              <option value="${caja.id}">${caja.nombre}</option>`;
            });
            $("#cajasList").html(template);
            resolve(cajas);
          }
        }
      );
    });
  }
  async function cerrar_caja(id, monto_cierre, fecha_cierre) {
    let funcion = "cerrar_turno";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id, monto_cierre, fecha_cierre },
        (response) => {
          if (response.trim() === "no-cierre") {
            reject({ error: response });
          } else {
            resolve({ msj: response });
          }
        }
      );
    });
  }

  $("#registra-caja-abierta .close-modal").on("click", function () {
    $("#registra-caja-abierta .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#registra-caja-abierta").addClass("md-hidden");
    }, 300);
  });
  $("#open-caja").on("click", function () {
    $("#registra-caja-abierta").removeClass("md-hidden");
    setTimeout(() => {
      $("#registra-caja-abierta .form-create").addClass("modal-show");
    }, 300);
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
  var mysede = await buscar_sedes_by_usuario();
  sedeId = mysede[0].id;
  var cajas = await buscar_cajas(sedeId);
  await buscar_caja_abierta();
  $("#registrar_turno").on("click", function () {
    let id_caja = $("#cajasList").val();
    let monto_apertura = $("#monto_apertura").val();
    let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let funcion = "registrar_turno";

    try {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: id_caja, fecha, monto_apertura },
        async (response) => {
          if (response.trim() === "no-register") {
            add_toast(
              "error",
              "No se pudo abrir la caja, sonctactar a soporte"
            );
          } else {
            add_toast("success", "Se aperturo la caja correctamente");
            $("#registra-caja-abierta .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#registra-caja-abierta").addClass("md-hidden");
            }, 300);
            await buscar_caja_abierta();
          }
        }
      );
    } catch (error) {
      console.log(error);
      add_toast("error", "Ocurrio un error contacte a soporte");
    }
  });
  // corte de caja
  $("[data-modal-toggle]").click(function () {
    const target = $(this).data("modal-toggle");
    $(`#${target}`).removeClass("hidden");
  });
  $("#confirm_cerrar_caja").on("click", async function () {
    let monto_cierre = rendirTotalState;
    let fecha_cierre = dayjs().format("YYYY-MM-DD");
    try {
      await cerrar_caja(caja.id, monto_cierre, fecha_cierre);
      caja = null;
      rendirTotalState = 0;
      await buscar_caja_abierta();
      $("#cajaAbierta").removeClass("hidden");
    } catch (error) {
      console.log(error);
      add_toast(
        "error",
        "Ocurrio un error, mo se pudo cerrar caja, contacta ala dministrador"
      );
    }
  });
  $("[data-modal-hide]").click(function () {
    const target = $(this).data("modal-hide");
    $(`#${target}`).addClass("hidden");
  });
  // Cerrar modal al hacer clic fuera del contenido del modal
  $(document).mouseup(function (e) {
    const modals = $("[data-modal-toggle]").map(function () {
      return $(`#${$(this).data("modal-toggle")}`);
    });

    modals.each(function () {
      const modal = $(this);
      const overlay = modal.find(".overlay");

      if (overlay.is(e.target)) {
        modal.addClass("hidden");
      }
    });
  });
  // Cerrar modal al presionar la tecla "ESC"
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("[data-modal-toggle]").each(function () {
        $(`#${$(this).data("modal-toggle")}`).addClass("hidden");
      });
    }
  });
});
