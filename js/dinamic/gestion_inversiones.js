$(document).ready(async function () {
  var inversionesList = [];
  var proyectosList = [];
  var idProyecto;

  var dataTableInversiones = $("#managerInversionesList").DataTable({
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
      {
        data: null,
        render: function (data) {
          return `${data.nombre_proyecto}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `S/${Math.round(data.monto_acumulado).toFixed(2)}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `S/${Math.round(data.ultima_inversion).toFixed(2)}`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <div class="flex-actions"> 
            <button id="newInversion" data-id="${data.id_proyecto}" type="button" class="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Nueva inversion</button>
            <button data-id="${data.id_proyecto}"  id="historial_version_proyecto" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">Historial</button>
  
            
            </div>
  
            `;
        },
      },
    ],
  });
  async function buscar_inversiones_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_inversiones_proyecto";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
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
  $(document).on("click", "#historial_version_proyecto", async function () {
    let proyecto_id = $(this).data("id");
    console.log(proyecto_id);
    let inversiones_proyecto = await buscar_inversiones_proyecto(proyecto_id);
    console.log(inversiones_proyecto);
  });
  async function registrar_inversion(inversion) {
    return new Promise((resolve, reject) => {
      let funcion = "registrar_inversion";
      let fecha_created = dayjs().format("YYYY-MM-DD HH:ms:ss");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, inversion: JSON.stringify(inversion), fecha_created },
        (response) => {
          let mensaje = JSON.parse(response);
          console.log(mensaje);
          resolve(mensaje);
        }
      );
    });
  }
  $(document).on("click", "#newInversion", function () {
    let id_proyecto = $(this).data("id");
    idProyecto = id_proyecto;
    console.log(id_proyecto);
    $("#modal_inversion").removeClass("md-hidden");
    setTimeout(() => {
      $("#modal_inversion .form-create").addClass("modal-show");
    }, 300);
  });
  $("#registrar_inversion").on("click", async function () {
    let proyecto_id = idProyecto;
    let tipo_inversion = $("#tipo_inversion").val();
    let monto_inversion = $("#monto_inversion").val();
    let descripcion_inversion = $("#descripcion_inversion").val();
    if (tipo_inversion !== "" && monto_inversion !== "") {
      let newInversion = {
        proyecto_id,
        tipo_inversion,
        monto_inversion,
        descripcion_inversion,
      };
      let send_inversion = await registrar_inversion(newInversion);
      console.log(send_inversion);
      if (send_inversion.msg === "add-inversion") {
        let proyectos_admin = await buscar_proyectos_admin();

        let inversiones_admin = await buscar_inversiones_admin();
        let proyectos_estructurados = reestructurar_proyectos(proyectos_admin);
        let compilado = compilado_inversiones(
          proyectos_estructurados,
          inversiones_admin
        );

        pintar_inversiones(compilado);
        add_toast("success", "Se ha registrado tu inversion");
        $("#tipo_inversion").val("CAPITAL");
        $("#monto_inversion").val("");
        $("#descripcion_inversion").val("");
        $("#modal_inversion .form-create").removeClass("modal-show");
        setTimeout(() => {
          $("#modal_inversion").addClass("md-hidden");
        }, 300);
      } else {
        console.log(send_inversion.error);
      }
    }
  });
  async function buscar_proyectos_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() == "no-register") {
            proyectosList = [];
            resolve([]);
          } else {
            const data = JSON.parse(response);
            proyectosList = data;
            resolve(data);
          }
        }
      );
    });
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
  function pintar_inversiones(inversiones) {
    dataTableInversiones.clear().rows.add(inversiones).draw();
  }
  function compilado_inversiones(proyectos, inversiones) {
    let newData = [];
    console.log(inversiones);
    proyectos.forEach((p) => {
      let monto_acumulado = 0;
      let ultima_inversion = 0;
      if (inversiones.length > 0) {
        let inversiones_proyecto = inversiones.filter(
          (i) => i.proyecto_id === p.id
        );
        inversiones_proyecto.forEach((i) => {
          monto_acumulado = monto_acumulado + Number(i.monto_inversion);
        });
        let last = inversiones_proyecto.sort((a, b) =>
          dayjs(b.fecha_created).diff(dayjs(a.fecha_created))
        );
        console.log(last);
        if (last.length > 0) {
          ultima_inversion = last[0].monto_inversion;
          console.log(ultima_inversion);
        }
      }
      // La última inversión será el primer elemento del array ordenado
      let newInversion = {
        logo: p.logo,
        id_proyecto: p.id,
        nombre_proyecto: p.nombre_proyecto,
        monto_acumulado: monto_acumulado,
        ultima_inversion: ultima_inversion,
      };
      newData.push(newInversion);
    });
    return newData;
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
  let proyectos_admin = await buscar_proyectos_admin();
  let proyectos_estructurados = reestructurar_proyectos(proyectos_admin);
  console.log(proyectos_estructurados);

  let inversiones_admin = await buscar_inversiones_admin();
  let compilado = compilado_inversiones(
    proyectos_estructurados,
    inversiones_admin
  );
  console.log(compilado);
  pintar_inversiones(compilado);

  $("#modal_inversion .close-modal").on("click", function () {
    idProyecto = null;
    $("#modal_inversion .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#modal_inversion").addClass("md-hidden");
    }, 300);
  });
});
