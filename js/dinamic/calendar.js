$(document).ready(function () {
  $("#from").val("Ingreso");
  $("#to").val("Salida");
  (from = $("#from")
    .datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      dateFormat: "dd/mm/yy",
      minDate: 0,
    })
    .on("change", function () {
      to.datepicker("option", "minDate", getDate(this));
    })),
    (to = $("#to")
      .datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
      })
      .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
      }));

  function getDate(element) {
    return element.value;
  }

  $("#date_children").attr("min", "0");
  $("#date_children").attr("max", "2");
  $("#date_adults").attr("min", "0");
  $("#date_adults").attr("max", "2");
});
