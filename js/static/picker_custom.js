$('input[name="fecha"]').daterangepicker({
    timePicker: false,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'DD/MM/YYYY',
    }
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('DD-MM-YYYY') + ' to ' + end.format('YYYY-MM-DD'));
  });