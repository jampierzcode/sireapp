$(document).ready(async function () {
  var proyectosList = [];
  const columnsTratedData = [
    {
      readCol: "nombre",
    },
    { readCol: "apellido" },
    { readCol: "celular" },
    { readCol: "telefono" },
    { readCol: "campaña" },
    { readCol: "ciudad" },
    { readCol: "origen" },
    { readCol: "direccion" },
    { readCol: "correo" },
  ];
  class Contactos {
    constructor(content) {
      this.content = content;
    }
    header() {
      return this.content[0];
    }
    rows() {
      return this.content.slice(1, this.content.lenght);
    }
  }
  var subir = document.getElementById("upload-clients-fields");
  var input = document.getElementById("fileExcel");
  var data;
  subir.addEventListener("click", async function () {
    const result = await readXlsxFile(input.files[0]);
    if (result) {
      $(".main-file").addClass("md-hidden");
      data = new Contactos(result);
      //   console.log(data);
      $(".container-asignedTables").removeClass("md-hidden");
      let template = "";

      console.log(data.header());
      // console.log(data.header());
      console.log(data.rows());
      const dataHead = data.header();
      let count = 1;
      let templateoptions = `
      <option value="0">Seleccione una columna</option>
      
      `;
      columnsTratedData.map((item) => {
        templateoptions += `
        <option value="${item.readCol}">${item.readCol}</option>
                          
        `;
      });
      for (const [index, dato] of dataHead.entries()) {
        template += `
        <div class="group-asiggned">
                    <div class="ofDate">
                        <span>Asignar: </span>
                        <div class="map-user-field">
                            "${dato}"
                        </div>
                    </div>
                    <div class="toDate">
                        <span>Para: </span>
                        <select propPosition=${index} propKey=${dato} name="etiqueta-field-data" id="etiqueta-field-${count}">
`;
        template += templateoptions;
        template += `
                            </select>
                    </div>
                </div>
        `;
        count++;
      }
      $(".list-groups").html(template);
      // for (const dato of dataHead) {
      //     dato.map((dat) => {
      //         if(dat)
      //     })

      // }
    } else {
      alert("Hubo un error al cargar el archivo refresque la pagina");
    }
  });
  $("body").on("change", 'select[name="etiqueta-field-data"]', function () {
    var selectedOption = $(this).val(); // Obtiene la opción seleccionada

    // Busca el select que tiene la opción seleccionada en otros select y establece su valor a 0
    $('select[name="etiqueta-field-data"]')
      .not(this)
      .each(function () {
        if ($(this).val() === selectedOption) {
          $(this).val("0");
        }
      });
  });
  $("#regresarData").click(() => {
    console.log("click");
    $(".main-file").removeClass("md-hidden");
    $(".container-asignedTables").addClass("md-hidden");
  });
  // Crear una función que realizará la solicitud post y devolverá una promesa
  function performPostRequest(
    result,
    funcion,
    proyecto_id,
    sede_id,
    origen_name
  ) {
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, sede_id, origen_name },
        (response) => {
          console.log(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            reject(data.error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  $("body").on("click", "#subirData", function () {
    $("#subirData").prop("disabled", true);
    $("#subirData").html("cargando ...");
    const asignaciones = [];
    const proyecto_id = $("#listMyProyects").val();
    const sede_id = $("#sedesList").val();

    const origen_name = $("#listOrigen").val();
    let contadorAsignacion = 0;
    $('select[name="etiqueta-field-data"]').each(function () {
      const position = $(this).attr("propPosition");
      const key = $(this).attr("propKey");
      const value = $(this).val();

      contadorAsignacion++;
      if (position !== undefined && value !== "0") {
        console.log("Entro a asinacion");
        asignaciones.push({
          position,
          key,
          value,
        });
      }
    });

    const camposPredefinidos = {
      nombre: "",
      apellido: "",
      documento: "",
      correo: "",
      celular: "",
      telefono: "",
      Pais: "",
      origen: "",
      campaña: "",
      ciudad: "",
    };

    const resultado = data.rows().map((registro) => {
      const obj = { ...camposPredefinidos };
      asignaciones.forEach((asignacion) => {
        const { position, key, value } = asignacion;
        obj[value] =
          registro[position] === null || registro[position] === ""
            ? ""
            : registro[position];
      });
      return obj;
    });
    console.log(asignaciones);
    console.log(contadorAsignacion);
    let fechaActual = dayjs().format("YYYY-MM-DD");
    let horaActual = dayjs().format("HH:mm:ss");
    resultado.forEach((objeto) => {
      objeto.fecha = fechaActual;
      objeto.hora = horaActual;
    });
    console.log(resultado);
    if (asignaciones.length === contadorAsignacion) {
      if (proyecto_id !== "0") {
        if (origen_name !== "0") {
          let funcion = "add_cliente2";
          const jsonData = JSON.stringify(resultado);
          console.log(jsonData);
          // Realizar una única solicitud con todos los datos
          performPostRequest(
            jsonData,
            funcion,
            proyecto_id,
            sede_id,
            origen_name
          )
            .then((response) => {
              console.log(response);
              alert("Se subieron correctamente todos los datos");
              var urlActual = window.location.href;
              var urlPadre = urlActual.substring(0, urlActual.lastIndexOf("/"));
              console.log(urlPadre);
              window.location.href = urlPadre;
            })
            .catch((error) => {
              $("#subirData").prop("disabled", false);
              $("#subirData").html("Subir data");
              alert("Se produjo un error: " + error);
            });
        } else {
          $("#subirData").prop("disabled", false);
          $("#subirData").html("Subir data");
          alert("Debes seleccionar un origen de donde provienen los clientes");
        }
      } else {
        $("#subirData").prop("disabled", false);
        $("#subirData").html("Subir data");
        alert("Debes seleccionar un proyecto a donde asignar los clientes");
      }
    } else {
      $("#subirData").prop("disabled", false);
      $("#subirData").html("Subir data");
      alert("Te faltan agregar asignaciones");
    }
  });

  async function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          console.log(response);
          let template = "";
          if (response.trim() == "no-register") {
            proyectosList = [];
            resolve([]);
          } else {
            const proyectos = JSON.parse(response);
            // Reestructurar los proyectos para consolidar las sedes

            proyectosList = proyectos;
            resolve(proyectos);
          }
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
    console.log(template);
    $("#sedesList").html(template);
    llenar_proyectos(sedes[0].id);
  }
  $("#sedesList").on("change", function (e) {
    let sede_id = e.target.value;
    llenar_proyectos(sede_id);
  });
  var proyectos = await buscar_proyectos();
  var sedes = await buscar_sedes_by_usuario();
  pintar_sedes(sedes);

  function llenar_proyectos(sede_id) {
    let proyectos = proyectosList.filter((p) => p.sede_id === sede_id);
    console.log(proyectos);
    let template = "";
    template += `<option value="" disabled>Seleccione un proyecto</option>`;
    // console.log(proyectosList);
    proyectos.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`;
    });
    $("#listMyProyects").html(template);
  }
});
