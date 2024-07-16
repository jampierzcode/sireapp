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
            <div id="modal_caja" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Creacion de caja</h1>
                    <div class="group w-full">
                        <label class="font-bold text-sm text-gray-900" for="">Nombre de la caja</label>
                        <input placeholder="Caja 1 COMPUTADOR 1" id="name_caja" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                    </div>
                    <div class="h-[3px] w-full bg-gray-200"></div>

                    <button id="registrar_caja" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                        Registrar caja
                    </button>
                </div>
            </div>
            <div id="modal_asigned_proyecto" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Asignar Proyecto</h1>

                    <div id="listProyectosNoAsignados" class="grid gap-4">



                    </div>
                </div>
            </div>
            <div id="modal_asigned_usuario" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Asignar Usuario</h1>

                    <div id="listUsuariosNoAsignados" class="grid gap-4">



                    </div>
                </div>
            </div>

            <div class="grid grid-cols-3">
                <div class="py-6 px-6 h-[500px] overflow-y-auto bg-white shadow-md rounded w-full">
                    <div class="w-full">
                        <div class="w-full">
                            <button id="newSede" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                                + Nueva Sede
                            </button>
                        </div>
                        <label class="text-sm font-bold text-gray-900 my-4 inline-block">Empresas</label>
                        <select name="empresasList" id="empresasList" class="mb-4 w-full bg-gray-100 text-sm text-gray-900 px-3 py-2 rounded">
                            <option value="0">

                                Selecciona una empresa
                            </option>

                        </select>
                        <div class="flex relative w-full my-4">
                            <div class="absolute flex items-center justify-center top-0 lef-0 bottom-0 w-[40px]">
                                <ion-icon name="search"></ion-icon>
                            </div>

                            <input id="search_sede" type="text" placeholder="Buscar por nombre de sede o empresa" class="w-full pr-2 pl-[50px] py-3 bg-gray-200 text-sm text-gray-900 rounded">
                        </div>
                        <div id="sedesList" class="grid gap-3 grid-cols-1">
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
                    <div class="main-sedes">
                        <div key_sede="" id="datos_sede" class="flex items-center gap-4 px-4 py-3 bg-gray-200 rounded">

                        </div>
                        <div class="my-4"></div>
                        <div class="w-full">
                            <div class="flex tab_box border-b border-gray-200 relative">
                                <button id="proyectosBtn" class="bg-white px-4 py-3 text-sm font-bold tab_btn text-[#310ecd]">Proyectos</button>
                                <button id="usuariosBtn" class="bg-white px-4 py-3 text-sm font-bold tab_btn">Usuarios</button>
                                <button id="cajasBtn" class="bg-white px-4 py-3 text-sm font-bold tab_btn">Cajas</button>
                                <div class="line transition-all duration-300 absolute left-0 w-[105px] bottom-0 h-[5px] bg-[#310ecd]"></div>
                            </div>
                            <div class="container_proyectos hidden">

                                <div class="w-full my-4">
                                    <button id="newAsignedProyecto" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                        Asignar un Proyecto
                                    </button>
                                </div>
                                <div id="proyectosListSede" class="divide-y flex flex-col">

                                </div>
                            </div>
                            <div class="container_usuarios hidden">

                                <div class="w-full my-4">
                                    <button id="newAsignedUsuario" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                        Asignar usuario
                                    </button>
                                </div>
                                <div id="usuariosListSede" class="divide-y flex flex-col">

                                </div>
                            </div>
                            <div class="container_cajas hidden">

                                <div class="w-full my-4">
                                    <button id="newCaja" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                        Crear Caja
                                    </button>
                                </div>
                                <div id="cajasListSede" class="divide-y flex flex-col">

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
    <script src="../../js/dinamic/sedes_manage.js"></script>

<?php
} ?>

    </html>