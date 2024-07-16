var fecha_now = new Date(Date.now()).toLocaleDateString()
var fecha_array = fecha_now.split("/")
let dia = fecha_array[0];
let mes = fecha_array[1];
let year = fecha_array[2];

// fecha last day
var last_fecha_now = fecha_array
var last_fecha_array = fecha_now.split("/")
let last_dia = Number(last_fecha_array[0])+1;
let last_mes = fecha_array[1];
let last_year = fecha_array[2];

$("#date-ida").daterangepicker({
  singleDatePicker: true,
  autoUpdateInput: false,
  "minDate": mes+"/"+dia+"/"+year,
  locale: {
    cancelLabel: "Clear",
  },
});

$("#date-ida").on("apply.daterangepicker", function (ev, picker) {
  $(this).val(
    picker.startDate.format("DD/MM/YYYY")
    //   " - " +
    //   picker.endDate.format("DD/MM/YYYY")
  );
});

$("#date-ida").on("cancel.daterangepicker", function (ev, picker) {
  $(this).val("");
});

// salida date range
$("#date-salida").daterangepicker({
  singleDatePicker: true,
  autoUpdateInput: false,
  "minDate": last_mes+"/"+last_dia+"/"+last_year,
  locale: {
    cancelLabel: "Clear",
  },
});

$("#date-salida").on("apply.daterangepicker", function (ev, picker) {
  $(this).val(
    picker.startDate.format("DD/MM/YYYY")
    //   " - " +
    //   picker.endDate.format("DD/MM/YYYY")
  );
});

$("#date-salida").on("cancel.daterangepicker", function (ev, picker) {
  $(this).val("");
});