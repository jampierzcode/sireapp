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
            <div id="modal-manager-lotes" class="modal-create md-hidden">
                <div class="form-create" style="width: 1000px;">
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Administrar Lotes</h1>
                    <div class="fileProyect">
                        <p class="text-start text-sm font-bold w-full">Proyecto: <span id="nombre_proyecto_lotes" class="font-medium text-sm"></span></p>
                    </div>

                    <span class="route" style="margin-bottom: 0px !important">
                        Lotes Registrados
                    </span>
                    <div class="listUsuarios">
                        <div class="main-datatable">
                            <div class="overflow-x">
                                <table style="width:100% !important;" id="managerLotesList" class="table cust-datatable dataTable no-footer">
                                    <thead>
                                        <tr>
                                            <th style="min-width:30px;"># Numero</th>
                                            <th style="min-width:80px;">Manzana</th>
                                            <th style="min-width:80px;">Ancho</th>
                                            <th style="min-width:80px;">Largo</th>
                                            <th style="min-width:80px;">Area</th>
                                            <th style="min-width:80px;">Precio</th>
                                            <th style="min-width:80px;">Estado</th>
                                            <th style="min-width:80px;">Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
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


            <div class="grid grid-cols-3">
                <div class="py-6 px-6 bg-white shadow-md rounded w-full h-[500px] overflow-y-auto">
                    <div class="w-full">
                        <div class="w-full">
                            <button id="newProyecto" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                                + Nuevo proyecto
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

                            <input type="text" placeholder="Buscar por nombre de proyecto o empresa" class="w-full pr-2 pl-[50px] py-3 bg-gray-200 text-sm text-gray-900 rounded">
                        </div>
                        <div id="proyectosList" class="grid gap-3 grid-cols-1">
                            <div class="cargando"></div>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 py-6 px-6 bg-white shadow-md rounded w-full h-[500px] overflow-y-auto">
                    <div id="no-search" class="w-full h-full flex justify-center items-center hidden">
                        <div class="flex justify-center flex-col items-center">
                            <img src="https://lf-tt4b.tiktokcdn.com/obj/static-sg/business_center/bc-vue/img/common-empty-data.ff4ae1bc.png" class="h-12 object-contain" alt="">
                            <h1>No hay coincidencias exactas. Realiza otra búsqueda.</h1>
                        </div>
                    </div>
                    <div class="main-proyectos">
                        <div id="datos_proyecto" key_proyecto="" class="flex items-center gap-4 px-4 py-3 bg-gray-200 rounded">
                            <img class="rounded h-12 w-12 object-contain" src="http://localhost/sireapp/imagenes/proyectos/pruebalotees/plano.jpeg" alt="">
                            <div class="w-full">
                                <p class="font-bold text-sm">Nombre Proyecto</p>
                                <p class="font-medium text-sm">Emoresa: <span>nombre?empresa</span></p>
                                <div class="flex gap-4">
                                    <button class="bg-white font-bold rounded inline-flex px-3 py-2 text-sm">Ver lotes</button>
                                    <button class="bg-white font-bold rounded inline-flex px-3 py-2 text-sm">Editar</button>
                                </div>
                            </div>
                        </div>
                        <div class="my-4"></div>
                        <!-- <div class="w-full">
                            <h1 class="text-sm font-bold">Sedes</h1>
                            <div class="w-full">
                                <button id="newBusiness" class="px-3 py-2 rounded bg-gray-100 text-gray-900 text-sm">
                                    Asignar a una sede
                                </button>
                            </div>
                            <div id="listSedesAsigneds " class="divide-y flex flex-col">
                                <div key="${index} data-id=" ${ p.id }" class="w-full px-4 py-3 rounded">
                                    <div class="flex items-center gap-4">
                                        <img class="rounded h-8 w-8 object-contain" src="" alt="${p.nombreProyecto}">
                                        <p class="font-bold text-sm">${p.nombreProyecto}</p>
                                    </div>
                                </div>
                                <div key="${index} data-id=" ${ p.id }" class="w-full px-4 py-3 rounded">
                                    <div class="flex items-center gap-4">
                                        <img class="rounded h-8 w-8 object-contain" src="" alt="${p.nombreProyecto}">
                                        <p class="font-bold text-sm">${p.nombreProyecto}</p>
                                    </div>
                                </div>
                            </div>
                        </div> -->
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
    <script src="../../js/dinamic/gestion_proyectos_sa.js"></script>

<?php
} ?>

    </html>