$(document).ready(function () {
  var funcion = "";
  var imgUrl = "";
  // function crear proeycto
  var imagenesCargadas = [];
  $("#proyecto-btn-add").click(() => {
    funcion = "crear_proyecto";
    let proyecto_nombre = $("#nombreProyecto").val();
    let proyecto_lotes = $("#lotesProyecto").val();
    if (proyecto_nombre && proyecto_lotes) {
      const result = enviarImagenes(proyecto_nombre);
      result
        .then(function (galeria) {
          console.log(galeria);
          $.post(
            "../../controlador/UsuarioController.php",
            {
              funcion,
              proyecto_nombre,
              proyecto_lotes,
              galeria,
            },
            (response) => {
              console.log(response);
              template = `
            <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
            <header class="title-drag">Drag & Drop to Upload File</header>
            <span>OR</span>
            `;
              $(".drag-area").html(template);
              $(".drag-area").removeClass("list-imagens");
              alert("Se creo el proyecto");
              window.location.href = "../Proyectos";
            }
          );
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    } else {
      let template = "";
      if (!proyecto_nombre) {
        template += "Falta registrar nombre, ";
      }
      if (!proyecto_lotes) {
        template += "Falta registrar precio";
      }
      alert(template);
    }
  });

  // imagense

  function enviarImagenes(proyecto_nombre) {
    return new Promise((resolve, reject) => {
      const carpeta = "proyectos";
      const formData = new FormData();

      for (let i = 0; i < imagenesCargadas.length; i++) {
        formData.append("imagen[]", imagenesCargadas[i]);
      }
      formData.append("carpeta", carpeta);
      formData.append("proyecto", proyecto_nombre);

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
});
