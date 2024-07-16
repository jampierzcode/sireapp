$(document).ready(async function () {
  var funcion = "";
  var id;
  var numero;
  buscar_proyectos();
  var dominio2 = "https://appsire.mcsolucionesti.com";
  // var dominio2 = "https://lotizador.vivelainmobiliaria.pe/";

  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          let template = "";
          if (response.trim() == "no-register") {
            template += "No hay registros";
            resolve([]);
          } else {
            const proyectos = JSON.parse(response);
            resolve(proyectos);
          }
          $("#listProyectos").html(template);
        }
      );
    });
  }
  function pintar_proyectos(proyectos, user) {
    let template = "";
    proyectos.forEach((proyecto) => {
      template += `
      <div class="card-habs" style="background: #310ecd;">
      <div class="body-card">
      <div class="flex items-center gap-4">
          <img src="../../${proyecto.logo}" class="w-10 h-10 object-cover object-center border-2 border-gray-200 rounded-full" alt="">
                          
          <h1 class="text-white text-sm md:text-md font-bold">${proyecto.nombre_proyecto}</h1>
          </div>
          <div class="proyectos_cards_link">
              <a id="rutaEnlace" style="color: #5b5b5b;" href="${dominio2}/views/Lotizador/?proyect=${proyecto.id}&&phoneNumber=${user[0].phone_number}&&agent=${user[0].id_usuario}" target="_blank" rel="noopener noreferrer">Copiar Enlace</a>
          </div>
          <div class="flex gap-4">
            <button class="btnJsvm default" agent="${user[0].id_usuario}" key="${proyecto.id}" numberAgent="${usuario[0].phone_number}" id="compartirBtn">Compartir en <ion-icon name="logo-whatsapp"></ion-icon></button>
            <a target="_blank" class="btnJsvm default" key="${proyecto.id}" href="../schemalotizador.php?proyect=${proyecto.id}">PDF <ion-icon name="document-text-outline"></ion-icon></a>
          </div>
      </div>
      </div>`;
    });
    $("#listProyectos").html(template);
  }
  async function buscar_datos_usuario() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_datos_usuario";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let datos = JSON.parse(response);
            resolve(datos);
          }
        }
      );
    });
  }
  var proyectos = await buscar_proyectos();
  var usuario = await buscar_datos_usuario();
  console.log(proyectos, usuario);
  pintar_proyectos(proyectos, usuario);
  $(document).on("click", "#rutaEnlace", function (event) {
    event.preventDefault(); // Evita la acción de navegación predeterminada

    // Copiar la ruta al portapapeles
    var ruta = $(this).attr("href");
    navigator.clipboard
      .writeText(ruta)
      .then(function () {
        alert("La ruta se ha copiado al portapapeles.");
      })
      .catch(function (error) {
        console.error("Error al copiar la ruta: ", error);
      });
  });
  $(document).on("click", "#compartirBtn", function () {
    let proyecto = $(this).attr("key");
    let number_agente = $(this).attr("numberAgent");
    let agente = $(this).attr("agent");
    var ruta = `${dominio2}/views/Lotizador/?proyect=${proyecto}&&phoneNumber=${number_agente}&&agent=${agente}`;
    if (navigator.share) {
      // Comprobar si la API Web Share es compatible
      navigator
        .share({
          title: "Título de tu enlace",
          text: "Descripción de tu enlace",
          url: ruta,
        })
        .then(function () {
          console.log("Enlace compartido con éxito.");
        })
        .catch(function (error) {
          console.error("Error al compartir el enlace: ", error);
        });
    } else {
      // Si la API Web Share no es compatible, redirigir a una página de compartir alternativa
      var mobileDetect =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (mobileDetect) {
        window.location.href =
          "whatsapp://send?text=" + encodeURIComponent(ruta);
      } else {
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(ruta)
        );
      }
    }
  });
});
