$(document).ready(function () {
  var imagenesCargadas = [];
  $("#cat-habs-btn-add").click(() => {
    funcion = "crear_cat-habitacion";
    let categoria_nombre = $("#categoria-nombre").val();
    let categoria_precio = $("#categoria-precio").val();

    if (categoria_nombre && categoria_precio) {
      const result = enviarImagenes(categoria_nombre);
      result
        .then(function (galeria) {
          $.post(
            "../../controlador/UsuarioController.php",
            {
              funcion,
              categoria_nombre,
              categoria_precio,
              galeria,
            },
            (response) => {
              console.log(response);
              $("#categoria-nombre").val("");
              $("#categoria-precio").val("");
              template = `
              <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
              <header class="title-drag">Drag & Drop to Upload File</header>
              <span>OR</span>
              `;
              $(".drag-area").html(template);
              $(".drag-area").removeClass("list-imagens");
            }
          );
        })
        .catch(function (error) {
          console.log("Error: " + error);
        });
    } else {
      let template = "";
      if (!categoria_nombre) {
        template += "Falta registrar nombre, ";
      }
      if (!categoria_precio) {
        template += "Falta registrar precio";
      }
      alert(template);
    }
  });
  function enviarImagenes(categoria_nombre) {
    return new Promise((resolve, reject) => {
      const carpeta = "categorias";
      const formData = new FormData();

      for (let i = 0; i < imagenesCargadas.length; i++) {
        formData.append("imagen[]", imagenesCargadas[i]);
      }
      formData.append("carpeta", carpeta);
      formData.append("categoria", categoria_nombre);

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
