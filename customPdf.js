// Landscape export, 2×4 inches
$(document).ready(function () {
  // const doc = new jsPDF({
  //   orientation: "landscape",
  //   unit: "in",
  //   format: [4, 2],
  // });

  // doc.text("Hello world!", 1, 1);
  //   doc.save("two-by-four.pdf");

  // Incluir las bibliotecas jsPDF y jsPDF-AutoTable en tu proyecto

  // Crear un nuevo documento jsPDF
  var doc = new jsPDF();

  // Obtener el elemento HTML que deseas convertir en PDF
  var element = document.getElementById("table");

  // Configurar opciones para jsPDF-AutoTable (si deseas personalizar la apariencia de la tabla)
  var options = {
    margin: { top: 20, bottom: 20 },
    startY: false,
  };

  // Convertir el contenido HTML en una tabla en el documento PDF
  doc.autoTable({
    html: element,
    ...options,
  });

  // Guardar el archivo PDF
  doc.save("archivo.pdf");
});
