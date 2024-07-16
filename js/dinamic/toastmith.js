$(document).on("click", ".close-toast", function () {
  var toast = $(this).parent();
  console.log(toast);
  var contenedor = document.querySelector(".container-toasts");

  contenedor.removeChild(toast[0]);
});
function add_toast(tipo, titulo) {
  let template = "";
  var toastcontainer;
  if ($(".container-toasts").length > 0) {
    toastcontainer = document.querySelector(".container-toasts");

    console.log(toastcontainer);
  } else {
    toastcontainer = document.createElement("div");
    toastcontainer.classList.add(
      "container-toasts",
      "fixed",
      "top-0",
      "right-0",
      "translate-x-full",
      "flex",
      "flex-col",
      "gap-4",
      "w-full",
      "h-[100vh]",
      "max-w-xs",
      "p-4",
      "z-[50000]"
    );
    const contenedor = document.querySelector("body");
    contenedor.appendChild(toastcontainer);
  }
  const toast = document.createElement("div");

  switch (tipo) {
    case "warning":
      toast.classList.add(
        "toast-app",
        "warning",
        "toastsmith",
        "relative",
        "top-8",
        "right-0",
        "flex",
        "items-center",
        "w-full",
        "max-w-xs",
        "p-4",
        "text-gray-500",
        "bg-white",
        "rounded-lg",
        "shadow",
        "dark:text-gray-400",
        "dark:bg-gray-800"
      );

      template += `
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <ion-icon name="warning-outline"></ion-icon>
                      <span class="sr-only">${titulo}</span>
                  </div>
                  <div class="ml-3 text-[12px] font-normal">${titulo}</div>
                  <button type="button" class="close-toast ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                  </button>
              `;
      break;
    case "success":
      toast.classList.add(
        "toast-app",
        "success",
        "toastsmith",
        "relative",
        "top-8",
        "right-0",
        "flex",
        "items-center",
        "w-full",
        "max-w-xs",
        "p-4",
        "text-gray-500",
        "bg-white",
        "rounded-lg",
        "shadow",
        "dark:text-gray-400",
        "dark:bg-gray-800"
      );

      template += `
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-700 dark:text-green-200">
                  <ion-icon name="checkmark-outline"></ion-icon>
                      <span class="sr-only">${titulo}</span>
                  </div>
                  <div class="ml-3 text-[12px] font-normal">${titulo}</div>
                  <button type="button" class="close-toast ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                  </button>
              `;
      break;
    case "error":
      toast.classList.add(
        "toast-app",
        "error",
        "toastsmith",
        "relative",
        "top-8",
        "right-0",
        "flex",
        "items-center",
        "w-full",
        "max-w-xs",
        "p-4",
        "text-gray-500",
        "bg-white",
        "rounded-lg",
        "shadow",
        "dark:text-gray-400",
        "dark:bg-gray-800"
      );

      template += `
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-700 dark:text-red-200">
                  <ion-icon name="sad-outline"></ion-icon>
                      <span class="sr-only">${titulo}</span>
                  </div>
                  <div class="ml-3 text-[12px] font-normal">${titulo}</div>
                  <button type="button" class="close-toast ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                  </button>
              `;
      break;

    default:
      break;
  }

  toast.innerHTML = template; // Establece el contenido HTML del elemento
  toastcontainer.appendChild(toast);

  toast.classList.add("toast-app");
  setTimeout(() => {
    toast.classList.remove("toast-app");
    if (toastcontainer.contains(toast)) {
      toastcontainer.removeChild(toast); // Elimina el toast después de 3 segundos solo si todavía está presente
    }
  }, 3000);
}
