$(document).ready(function () {
  $(".task-msg").addClass("show-task");
  setInterval(() => {
    $(".task-msg").removeClass("show-task");
  }, 5000);
});
