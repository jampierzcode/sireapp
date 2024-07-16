<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 1) {
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
        <link rel="stylesheet" href="../../css/drag-drop.css">
        <link rel="stylesheet" href="../../css/datatablesmith.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />

        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>

        <title>SireApp</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar.php"
        ?>

        <div class="container-dashboard">
            <!-- <span class="route">
                > Home > Business
            </span> -->
            <div id="modal_sede" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Creacion de sede</h1>
                    <div class="group w-full">
                        <label class="font-bold text-sm text-gray-900" for="">Nombre de Referencia</label>
                        <input placeholder="Oficina 1 ..." id="namereference_sede" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                    </div>
                    <div class="h-[3px] w-full bg-gray-200"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Direccion</label>
                            <input placeholder="ingresa aqui la direccion" id="direction_sede" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Telefono/Celular</label>
                            <input placeholder="ingresa aqui el numero de contacto" id="phonecontact_sede" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Ciudad</label>
                            <input placeholder="ingresa aqui la ciudad de la sede" id="ciudad_sede" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Google Maps</label>
                            <input placeholder="ingresa aqui el link de google maps" id="googlemaps_sede" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                    </div>
                    <button id="registrar_sede" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                        Registrar Sede
                    </button>
                </div>
            </div>
            <div id="modal_proyecto" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Creacion de proyecto</h1>
                    <div class="w-full relative">
                        <div id="change_register_proyecto" class="hidden z-[5000] bg-[#310ecdcf] absolute top-0 bottom-0 left-0 w-full">
                            <div class="flex items-center justify-center h-full">

                                <p class="text-white font-bold text-center text-sm">
                                    ...Registrando proyecto
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-1-column gap-4">
                            <div class="group-date">
                                <label class="text-sm font-bold text-gray-900">Logo</label>
                                <input class="px-3 py-2 rounded text-sm bg-gray-200 w-full" id="logoProyecto" type="file" placeholder="Ingrese el nombre del proyecto">
                            </div>
                            <div class="group-date">
                                <label class="text-sm font-bold text-gray-900">Nombre Proyecto</label>
                                <input class="px-3 py-2 rounded text-sm bg-gray-200 w-full" id="nombreProyecto" type="text" placeholder="Ingrese el nombre del proyecto">
                            </div>
                            <div class="group-date">
                                <label class="text-sm font-bold text-gray-900">Cantidad de Lotes</label>
                                <input class="px-3 py-2 rounded text-sm bg-gray-200 w-full" id="lotesProyecto" type="number" placeholder="Ingrese el nombre del proyecto">
                            </div>
                            <div class="container-images">
                                <h1 class="text-sm font-bold text-gray-900">Subir plano</h1>
                                <!-- <p>Sube una imagen de portada de la habitacion</p> -->
                                <div class="container-drag">
                                    <div class="drag-area">
                                        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
                                        <header class="title-drag">Drag & Drop to Upload File</header>
                                        <span>OR</span>

                                    </div>
                                    <button class="drag-btn">Browse File</button>
                                </div>
                                <input id="img_dsct" type="file" hidden>
                                <!-- <button id="save_img" class="drag-btn">Subir imagen</button> -->
                            </div>
                        </div>
                        <button id="registrar_proyecto" class="text-sm text-white px-3 py-2 bg-[#310ecdcf] rounded font-bold">Agregar</button>

                    </div>
                </div>
            </div>
            <div id="modal_business" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <div class="w-full relative">
                        <div id="change_register_empresa" class="hidden z-[5000] bg-[#310ecdcf] absolute top-0 bottom-0 left-0 w-full">
                            <div class="flex items-center justify-center h-full">

                                <p class="text-white font-bold text-center text-sm">
                                    ...Registrando empresa
                                </p>
                            </div>
                        </div>
                        <h1 class="text-sm font-bold">Crear nueva empresa</h1>
                        <div class="grow w-full bg-white space-y-4">
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
                            <h1 class="text-sm text-black font-bold">Documento RUC</h1>
                            <input id="documento_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: 20111111111"></input>
                            <h1 class="text-sm text-black font-bold">Nombre o razon social</h1>
                            <input id="name_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: NOMBRE O RAZON SOCIAL SAC"></input>
                            <h1 class="text-sm text-black font-bold">Correo electronico</h1>
                            <input id="email_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: micorreo@email.com"></input>
                            <h1 class="text-sm text-black font-bold">Numero de contacto</h1>
                            <input id="phone_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ejm: +51999999999"></input>
                            <h1 class="text-sm text-black font-bold">Sitio web</h1>
                            <input id="website_business" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="www.tusitiowebaqui.com"></input>
                            <div class="flex items-center gap-4 justify-end">
                                <button disable="true" id="cancelar_business" class="rounded text-[12px] px-5 py-2 border-gray-300 border-solid border-2 text-gray-500 bg-white ">Cancelar</button>
                                <button disable="true" id="registrar_business" class="rounded text-[12px] px-5 py-2 text-white bg-[#310ecd] ">Registrar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-3">
                <div class="py-6 px-6 h-[500px] overflow-y-auto bg-white shadow-md rounded w-full">
                    <div class="w-full">
                        <div class="w-full">
                            <button id="newBusiness" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                                + Nueva Empresa
                            </button>
                        </div>
                        <div class="flex relative w-full my-4">
                            <div class="absolute flex items-center justify-center top-0 lef-0 bottom-0 w-[40px]">
                                <ion-icon name="search"></ion-icon>
                            </div>

                            <input id="search_empresa" type="text" placeholder="Buscar por nombre de proyecto o empresa" class="w-full pr-2 pl-[50px] py-3 bg-gray-200 text-sm text-gray-900 rounded">
                        </div>
                        <div id="empresasList" class="grid gap-3 grid-cols-1">
                            <div class="cargando"></div>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 h-[500px] overflow-y-auto py-6 px-6 bg-white shadow-md rounded w-full">
                    <div id="no-search" class="w-full h-full flex justify-center items-center hidden">
                        <div class="flex justify-center flex-col items-center">
                            <img src="https://lf-tt4b.tiktokcdn.com/obj/static-sg/business_center/bc-vue/img/common-empty-data.ff4ae1bc.png" class="h-12 object-contain" alt="">
                            <h1>No hay coincidencias exactas. Realiza otra búsqueda.</h1>
                        </div>
                    </div>
                    <div class="main-empresas">
                        <div key_business="" id="datos_empresa" class="flex items-center gap-4 px-4 py-3 bg-gray-200 rounded">

                        </div>
                        <div class="my-4"></div>
                        <div class="w-full">
                            <div class="flex tab_box border-b border-gray-200 relative">
                                <button id="sedesBtn" class="bg-white px-4 py-3 text-sm font-bold tab_btn text-[#310ecd]">Sedes</button>
                                <button id="proyectosBtn" class="bg-white px-4 py-3 text-sm font-bold tab_btn">Proyectos</button>
                                <div class="line transition-all duration-300 absolute left-0 w-[76px] bottom-0 h-[5px] bg-[#310ecd]"></div>
                            </div>
                            <div class="container_sedes hidden">

                                <div class="w-full my-4">
                                    <button id="newSede" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                        Crear nueva Sede
                                    </button>
                                </div>
                                <div id="sedesListEmpresa" class="divide-y flex flex-col">

                                </div>
                            </div>
                            <div class="container_proyectos hidden">

                                <div class="w-full my-4">
                                    <button id="newProyecto" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                        Crear nuevo proyecto
                                    </button>
                                </div>
                                <div id="proyectosListEmpresa" class="divide-y flex flex-col">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>

    <script src="../../components/sidebar.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="../../js/static/drag-drop.js"></script>
    <script src="../../js/dinamic/business_manage.js"></script>

<?php
} ?>

    </html>