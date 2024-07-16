$(document).ready(function () {
  // variables de imagenes de file
  var profileFile;
  var idBusiness;

  var dataTargetUser;
  var stateNewDAtaTarget;

  var imgPerfil = $("#perfil_upload");

  // change img profile
  $("#perfil_overlay").click(function () {
    $(imgPerfil).click();
  });
  $(imgPerfil).change(function (e) {
    const file = e.target.files[0];
    profileFile = file;

    mostrarVistaPreviaPerfil(file);
  });
  function mostrarVistaPreviaPerfil(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#perfil_overlay").html(
          `<img class="w-[80px] h-[80px] p-1 rounded-full" src="${e.target.result}" alt="rofile picture">`
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
    stateNewDAtaTarget.logo = "";
    viewActivationChane();
  });
  // --------fin de change img profile---------

  // profile y portada activar btn
  $(document).on("change", "#perfil_upload", function (e) {
    // stateNewDAtaTarget;

    const etiqueta = $(this).attr("id");
    switch (etiqueta) {
      case "perfil_upload":
        stateNewDAtaTarget.logo = e.target.files[0].name;
        break;

      default:
        break;
    }

    viewActivationChane();
  });
  function viewActivationChane() {
    // console.log(stateNewDAtaTarget);
    // console.log(dataTargetUser);
    if (JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)) {
      enabled_update_acces_btn();
    } else {
      disabled_update_acces_btn();
    }
  }
  buscar_info_business();
  function buscar_info_business() {
    let funcion = "buscar_user_info_empresa";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        setInterval(() => {
          $("#content-about").removeClass("hidden");
          $("#spinner-load").addClass("hidden");
        }, 3000);
        if (response.trim() === "no-register-business") {
          dataTargetUser = {
            logo: "",
            user_id: "",
            nombre_razon: "",
            website: "",
            phone_contact: "",
            email: "",
          };
          stateNewDAtaTarget = {
            logo: "",
            user_id: "",
            nombre_razon: "",
            website: "",
            phone_contact: "",
            email: "",
          };
        } else {
          const business = JSON.parse(response);
          console.log(business);
          idBusiness = business[0].id;
          let info_business = {
            logo: business[0].logo ? business[0].logo : "",
            user_id: business[0].user_id ? business[0].user_id : "",
            nombre_razon: business[0].nombre_razon
              ? business[0].nombre_razon
              : "",
            website: business[0].website ? business[0].website : "",
            phone_contact: business[0].phone_contact
              ? business[0].phone_contact
              : "",
            email: business[0].email ? business[0].email : "",
          };

          dataTargetUser = { ...info_business };
          stateNewDAtaTarget = { ...info_business };
          updateCamposform();
          //   update_preview(dataTargetUser);
        }
      }
    );
  }
  $("#name_business, #email_business, #phone_business, #website_business").on(
    "keyup",
    function () {
      const etiqueta = $(this).attr("id");
      switch (etiqueta) {
        case "name_business":
          stateNewDAtaTarget.nombre_razon = $(this).val();
          break;
        case "email_business":
          stateNewDAtaTarget.email = $(this).val();
          break;
        case "phone_business":
          stateNewDAtaTarget.phone_contact = $(this).val();
          break;
        case "website_business":
          stateNewDAtaTarget.website = $(this).val();
          break;

        default:
          break;
      }
      if (
        JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)
      ) {
        enabled_update_acces_btn();
      } else {
        disabled_update_acces_btn();
      }
    }
  );
  function updateCamposform() {
    $("#name_business").val(dataTargetUser.nombre_razon);
    $("#email_business").val(dataTargetUser.email);
    $("#website_business").val(dataTargetUser.website);
    $("#phone_business").val(dataTargetUser.phone_contact);

    // perfil foto
    if (dataTargetUser.logo === "") {
      $("#perfil_overlay").html(`
        <ion-icon class="text-[25px]" name="business-outline"></ion-icon>
        <p class="text-[8px] w-[70%] text-center">Selecciona un logo para tu empresa</p>
    `);
      //   $(imgPortada).val("");
    } else {
      $("#perfil_overlay").html(
        `<img class="w-[80px] h-[80px] object-contain p-1 rounded-full" src="../../${dataTargetUser.logo}" alt="rofile picture">`
      );
      $("#content-perfil").append(
        `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
      );
    }
  }
  $("#cancelar_submit").click(function () {
    const disabled = $(this).attr("disable");
    if (disabled === "false") {
      // cancelar boton
      updateCamposform();
      $("#cancelar_submit").addClass("text-gray-300");
      $("#cancelar_submit").removeClass("text-gray-600");
      $("#cancelar_submit").removeClass("cursor-pointer");
      $("#cancelar_submit").addClass("cursor-default");
      $("#cancelar_submit").removeClass("hover:shadow-lg");
      $("#cancelar_submit").attr("disable", "true");
      // boton send info
      $("#send_submit").addClass("bg-gray-300");
      $("#send_submit").addClass("text-gray-500");
      $("#send_submit").removeClass("text-white");
      $("#send_submit").removeClass("bg-[#310ecd]");
      $("#send_submit").removeClass("cursor-pointer");
      $("#send_submit").addClass("cursor-default");
      $("#send_submit").removeClass("hover:shadow-lg");
      $("#send_submit").attr("disable", "true");
    }
  });
  $("#send_submit").click(function () {
    const disabled = $(this).attr("disable");

    if (disabled === "false") {
      let newData = stateNewDAtaTarget;
      // Inicializa las promesas a null
      let profilePromise = null;
      // casos para perfil de imagen
      if (dataTargetUser.logo !== stateNewDAtaTarget.logo) {
        if (dataTargetUser.logo === "") {
          profilePromise = enviarImagenes(profileFile);
        } else {
          if (stateNewDAtaTarget.logo === "") {
            // eliminar mi image
            profilePromise = eliminarImagenes(dataTargetUser.logo);
          } else {
            // actualizo la imagen

            profilePromise = updateImagenes(dataTargetUser.logo, profileFile);
          }
        }
      }
      // Crea un arreglo de promesas para esperar a ambas
      const promisesToWaitFor = [];

      if (profilePromise !== null) {
        promisesToWaitFor.push(
          profilePromise.then((response) => {
            if (response === "delete-sucess") {
              newData.logo = "";
              add_toast("success", "Se elimino el logo correctamente");
            } else {
              if (response === "no-existe") {
                add_toast("warning", "No se ubico la imagen");
              }
              if (response !== "no-existe") {
                add_toast("success", "Se actualizo el logo correctamente");
                newData.logo = response;
              }
            }
          })
        );
      }
      console.log(newData);

      // Espera a que ambas promesas se resuelvan
      Promise.all(promisesToWaitFor)
        .then(() => {
          let funcion = "update_business";
          $.post(
            "../../controlador/UsuarioController.php",
            { funcion, data: JSON.stringify(newData), id: idBusiness },
            (response) => {
              console.log(response);
              if (response.trim() == "update-sucess") {
                add_toast(
                  "success",
                  "Se actualizo la informacion de tu empresa"
                );
                disabled_update_acces_btn();
                buscar_info_business();
              } else {
                add_toast(
                  "error",
                  "Ocurrio un error al registrar empresa, intente de nuevo"
                );
              }
            }
          );
        })
        .catch((error) => console.log(error));
    }
  });
  function enabled_update_acces_btn() {
    // cambios para boton cancelar
    $("#cancelar_submit").removeClass("text-gray-300");
    $("#cancelar_submit").addClass("text-gray-600");
    $("#cancelar_submit").addClass("cursor-pointer");
    $("#cancelar_submit").addClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "false");
    // cambios para boton send info
    $("#send_submit").removeClass("bg-gray-300");
    $("#send_submit").removeClass("text-gray-500");
    $("#send_submit").addClass("text-white");
    $("#send_submit").addClass("bg-[#310ecd]");
    $("#send_submit").addClass("cursor-pointer");
    $("#send_submit").addClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "false");
  }
  function disabled_update_acces_btn() {
    // cancelar boton
    // $("#name_profile, #name_job, #name_custom").val("");
    $("#cancelar_submit").addClass("text-gray-300");
    $("#cancelar_submit").removeClass("text-gray-600");
    $("#cancelar_submit").removeClass("cursor-pointer");
    $("#cancelar_submit").addClass("cursor-default");
    $("#cancelar_submit").removeClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "true");
    // boton send info
    $("#send_submit").addClass("bg-gray-300");
    $("#send_submit").addClass("text-gray-500");
    $("#send_submit").removeClass("text-white");
    $("#send_submit").removeClass("bg-[#310ecd]");
    $("#send_submit").removeClass("cursor-pointer");
    $("#send_submit").addClass("cursor-default");
    $("#send_submit").removeClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "true");
  }
  // funcion de subir imagnes
  function enviarImagenes(file) {
    return new Promise((resolve, reject) => {
      const carpeta = "business";
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
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  // funcion de update imagnes
  function updateImagenes(route, file) {
    return new Promise((resolve, reject) => {
      const funcion = "update_image_business";
      const formData = new FormData();
      formData.append("funcion", funcion);
      formData.append("route", route);
      formData.append("businessimagenupdate", file);

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

  // funcion eliminar imagenes
  function eliminarImagenes(route) {
    return new Promise((resolve, reject) => {
      let funcion = "delete_image_business";
      $.post(
        "../../controlador/subirimagenes.php",
        { funcion, route },
        (response) => {
          resolve(response);
        }
      );
    });
  }
  //   const result = eliminarImagenes(
  //     // "imagenes/targets/6503bc2d95ef9-meprofile.jpg"
  //     "imagenes/targets/6503bc2d95ef9-meprofile.jpg"
  //   );
  //   result
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch();
});
