<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 2 && $_SESSION["us_tipo"] != 5) {
    header("Location: ../../index.php");
} else {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/main.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/habitaciones.css">
        <link rel="stylesheet" href="../../css/productos.css">
        <link rel="icon" href="../../img/logo.jpg">

        <link type="text/css" href="//gyrocode.github.io/jquery-datatables-checkboxes/1.2.12/css/dataTables.checkboxes.css" rel="stylesheet" />
        <!-- bootsttrap
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script> -->
        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>
        <div class="container-dashboard">
            <span class="route">
                > Home > Configuracion Business </span>

            <div class="confirm-popup md-hidden">
                <div class="form-confirm">
                    <span class="title-confirm">Estas seguro de eliminar el usuario</span>
                    <div class="footerConfirm">
                        <button id="cancelConfirm" class="btnJsvm ">No</button>
                        <button id="okConfirm" class="btnJsvm ">Si</button>

                    </div>
                </div>
            </div>
            <!-- <div class="mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4">Registro de Empresa</h2>
                <form action="#" method="post" enctype="multipart/form-data">
                    <div class="mb-4">
                        <label for="nombre_empresa" class="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
                        <input type="text" id="nombre_empresa" name="nombre_empresa" class="mt-1 p-2 w-full border rounded-md" required>
                    </div>
                    <div class="mb-4">
                        <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
                        <input type="text" id="direccion" name="direccion" class="mt-1 p-2 w-full border rounded-md" required>
                    </div>
                    <div class="mb-4">
                        <label for="numero_contacto" class="block text-sm font-medium text-gray-700">Número de Contacto</label>
                        <input type="text" id="numero_contacto" name="numero_contacto" class="mt-1 p-2 w-full border rounded-md" required>
                    </div>
                    <div class="mb-4">
                        <label for="logo" class="block text-sm font-medium text-gray-700">Logo</label>
                        <div class="flex items-center mt-1">
                            <label for="logo_input" class="cursor-pointer">
                                <div class="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    <img id="logo_preview" src="#" alt="Logo" class="h-full w-full object-cover" style="display: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </div>
                            </label>
                            <input type="file" id="logo_input" name="logo" class="hidden">
                        </div>
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Registrar</button>
                </form>
            </div> -->
            <div class="">
                <div class="w-full flex gap-5">
                    <div class="flex  flex-col gap-3 text-sm text-black font-bold">
                        <label for="img">Logo Business</label>
                        <div class="relative" id="content-perfil">
                            <div id=" img-profile" class="w-[80px]">
                                <input id="perfil_upload" class="hidden" type="file" accept=".jpg,.jpeg,.png,.heic,.heif">
                                <div id="perfil_overlay" class="w-[90px] h-[90px] p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-500 flex items-center flex-col bg-gray-100 text-gray-400 gap-2 justify-center cursor-pointer" src="#" alt="rofile picture">
                                    <ion-icon class="text-[25px]" name="business-outline"></ion-icon>
                                    <p class="text-[8px] w-[70%] text-center">Selecciona un logo para tu empresa</p>
                                </div>

                                <!-- <img class="w-[80px] h-[80px] p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-500" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/photos%2F1496665_bwwSLwwSw1bw?alt=media" alt="rofile picture"> -->
                            </div>
                            <!-- <span class="inline-block rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span> -->
                        </div>

                    </div>
                </div>
                <h1 class="text-sm text-black font-bold">Nombre o razon social</h1>
                <input id="name_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: NOMBRE O RAZON SOCIAL SAC"></input>
                <h1 class="text-sm text-black font-bold">Correo electronico</h1>
                <input id="email_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: micorreo@email.com"></input>
                <h1 class="text-sm text-black font-bold">Numero de contacto</h1>
                <input id="phone_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: +51999999999"></input>
                <h1 class="text-sm text-black font-bold">Sitio web</h1>
                <input id="website_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="www.tusitiowebaqui.com"></input>
                <div class="flex items-center gap-4 justify-end">
                    <button disable="true" id="cancelar_submit" class="rounded-full text-[12px] px-5 py-2 border-gray-300 border-solid border-2 text-gray-300 bg-white ">Cancelar</button>
                    <button disable="true" id="send_submit" class="rounded-full text-[12px] px-5 py-2 text-gray-500 bg-gray-300 ">Actualizar</button>
                </div>

            </div>
        </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>

    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="../../js/dinamic/gestion-business.js"></script>

    </html>
<?php } ?>