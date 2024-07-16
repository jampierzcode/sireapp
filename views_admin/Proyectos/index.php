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
        <link rel="stylesheet" href="../../css/drag-drop.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />

        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .image-container {
                position: relative;
                margin: 10px;
                overflow: hidden;
            }

            .image-container:hover .overlay {
                transform: translateY(0);
            }

            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.192);
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translateY(100%);
                transition: all 0.3s;
                z-index: 1000;
            }

            .overlay button {
                background-color: #ff0000;
                color: #fff;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }

            .image-container:hover .overlay {
                opacity: 1;
            }
        </style>
        <title>AppLotizador</title>

    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>

        <div class="container-dashboard">
            <div class="grid grid-cols-4 mb-4 gap-4">
                <div class="w-full">
                    <label for="sedes" class="text-sm font-bold">Sedes Asignadas</label>
                    <select name="sedes" class="w-full px-3 py-2 rounded bg-gray-200 text-sm" id="sedesList">

                    </select>
                </div>
            </div>
            <div id="modal-asigned" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="title-modal">Asignar Usuario: </h1>
                    <div class="fileProyect">
                        <p class="text-center w-full">Proyecto:</p>
                        <p class="text-center" id="nombre_proyecto"></p>
                    </div>
                    <div id="list-campos" style="display: flex; flex-direction: column; gap: 15px">
                        <select id="user-proyect" class="users_proyect" name="state">

                        </select>
                    </div>
                    <div class="mt-4">
                        <h4>Usuarios Registrados</h4>
                    </div>
                    <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                        <button id="update-asigned-form" class="btn-create">Actualizar</button>
                    </div>
                    <!-- </form> -->
                </div>
            </div>

            <div id="modal-manager-lotes" class="modal-create md-hidden">
                <div class="form-create" style="width: 1000px;">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold text-sm">Administrar Lotes</h1>
                    <!-- <div class="fileProyect">
                        <p class="text-start w-full">Proyecto: <span id="nombre_proyecto_lotes"></span></p>
                    </div> -->
                    <!-- <div id="list-campos" style="display: flex; flex-direction: row; gap: 15px">
                        <select id="user-proyect" style="width: 100%" class="users_proyect" name="state">

                        </select>
                        <button id="update-asigned-form" class="btn-add">Agregar</button>
                    </div> -->

                    <span class="route" style="margin-bottom: 0px !important">
                        Lotes Registrados
                    </span>
                    <!-- <div class="flex gap-4">
                        <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"><ion-icon name="create"></ion-icon> Editar Todos</button>
                    </div> -->
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
                                            <th style="min-width:80px;">Costo Lote</th>
                                            <th style="min-width:80px;">Precio</th>
                                            <th style="min-width:80px;">Estado</th>
                                            <th style="min-width:80px;">Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>


                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>

            <!-- Modal para seleccionar icono -->
            <div id="modalIconos" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[50000]">
                <div class="bg-white max-w-[400px] mx-auto p-4 rounded shadow-lg">
                    <h2 class="text-xl mb-4">Selecciona un ícono</h2>
                    <div class="grid grid-cols-5 gap-4">
                        <!-- Se generan manualmente 4 botones con iconos de Ionicons -->
                        <button class="p-2 border-[1px] rounded icono" data-icon="agua">
                            <img class="w-full" src="../../imagenes/amenidades/agua.png" alt="agua" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="luz">
                            <img class="w-full" src="../../imagenes/amenidades/luz.png" alt="luz" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="desague">
                            <img class="w-full" src="../../imagenes/amenidades/desague.png" alt="desague" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="carreteras">
                            <img class="w-full" src="../../imagenes/amenidades/carreteras.png" alt="carreteras" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="portico">
                            <img class="w-full" src="../../imagenes/amenidades/portico.png" alt="portico" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="pistas-afirmadas">
                            <img class="w-full" src="../../imagenes/amenidades/pistas-afirmadas.png" alt="pistas-afirmadas" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="parrilla">
                            <img class="w-full" src="../../imagenes/amenidades/parrilla.png" alt="parrilla" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="pistas">
                            <img class="w-full" src="../../imagenes/amenidades/pistas.png" alt="pistas" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="parques">
                            <img class="w-full" src="../../imagenes/amenidades/parques.png" alt="parques" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="jardin">
                            <img class="w-full" src="../../imagenes/amenidades/jardin.png" alt="jardin" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="areas-comunes">
                            <img class="w-full" src="../../imagenes/amenidades/areas-comunes.png" alt="areas-comunes" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="biodigestor">
                            <img class="w-full" src="../../imagenes/amenidades/biodigestor.png" alt="biodigestor" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono" data-icon="colegio">
                            <img class="w-full" src="../../imagenes/amenidades/colegio.png" alt="colegio" />
                        </button>
                    </div>
                    <div class="flex gap-3">
                        <button id="btnContinuarIconos" class="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                            Continuar
                        </button>
                        <button id="btnCancelarIconos" class="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <!-- Nuevo modal para editar icono -->
            <div id="editarAmenidad" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[50000]">
                <div class="bg-white p-4 max-w-[400px] mx-auto rounded shadow-lg">
                    <h2 class="text-xl mb-4">Editar amenidad</h2>
                    <div class="flex items-center gap-3">
                        <img class="w-[50px] cursor-pointer" id="iconoAmenidadEdit" src="../../imagenes/amenidades/luz.png" alt="luz">
                        <input class="p-2 rounded bg-gray-200 text-gray-700" type="text" id="nombreAmenidadEdit" placeholder="Escribe la amenidad">
                    </div>
                    <div class=" flex items-center gap-3">

                        <button id="cancelarEditAmenidad" class="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button id="saveEditAmenidad" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <!-- Nuevo modal para editar icono -->
            <div id="modalEditarIcono" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[50000]">
                <div class="bg-white p-4 max-w-[400px] mx-auto rounded shadow-lg">
                    <h2 class="text-xl mb-4">Selecciona un nuevo ícono</h2>
                    <div class="grid grid-cols-5 gap-4">
                        <!-- Se generan manualmente 4 botones con iconos de Ionicons -->
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="agua">
                            <img class="w-full" src="../../imagenes/amenidades/agua.png" alt="agua" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="luz">
                            <img class="w-full" src="../../imagenes/amenidades/luz.png" alt="luz" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="desague">
                            <img class="w-full" src="../../imagenes/amenidades/desague.png" alt="desague" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="carreteras">
                            <img class="w-full" src="../../imagenes/amenidades/carreteras.png" alt="carreteras" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="portico">
                            <img class="w-full" src="../../imagenes/amenidades/portico.png" alt="portico" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="pistas-afirmadas">
                            <img class="w-full" src="../../imagenes/amenidades/pistas-afirmadas.png" alt="pistas-afirmadas" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="parrilla">
                            <img class="w-full" src="../../imagenes/amenidades/parrilla.png" alt="parrilla" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="pistas">
                            <img class="w-full" src="../../imagenes/amenidades/pistas.png" alt="pistas" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="parques">
                            <img class="w-full" src="../../imagenes/amenidades/parques.png" alt="parques" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="jardin">
                            <img class="w-full" src="../../imagenes/amenidades/jardin.png" alt="jardin" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="areas-comunes">
                            <img class="w-full" src="../../imagenes/amenidades/areas-comunes.png" alt="areas-comunes" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="biodigestor">
                            <img class="w-full" src="../../imagenes/amenidades/biodigestor.png" alt="biodigestor" />
                        </button>
                        <button class="p-2 border-[1px] rounded icono-editar" data-icon="colegio">
                            <img class="w-full" src="../../imagenes/amenidades/colegio.png" alt="colegio" />
                        </button>
                    </div>
                    <div class="flex gap-4">
                        <button id="cancelarIconoEditado" class="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button id="btnGuardarIconoEditado" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal para ingresar nombre de amenidad -->
            <div id="modalNombreAmenidad" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[50000]">
                <div class="bg-white p-4 max-w-[400px] mx-auto rounded shadow-lg">
                    <h2 class="text-xl mb-4">Ingresa el nombre de la amenidad</h2>
                    <input type="text" id="inputNombreAmenidad" class="border p-2 mb-4 w-full" />
                    <div class="flex gap-3">

                        <button id="btnRegresarIconoAmenidad" class="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                            Regresar
                        </button>
                        <button id="btnGuardarAmenidad" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Crear Amenidad
                        </button>
                    </div>
                </div>
            </div>
            <div id="change_load_imagenes" class="fixed z-[50000] hidden top-0 left-0 w-full h-[100vh] flex items-center justify-center">
                <p class="text-white relative z-[60000] text-3xl font-bold">Subiendo imagenes ...</p>
                <div class="bg-black absolute opacity-50 w-full h-full"></div>
            </div>
            <div id="modal-manager-proyect" class="modal-create md-hidden">
                <div class="form-create" style="width: 85%; min-height:80vh">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Configuración Proyecto</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="w-full md:px-[20px] border-r-2">
                            <span class="route" style="margin-bottom: 0px !important">
                                Logo
                            </span>
                            <div class="flex" id="content-logo">
                                <div>
                                    <div class="relative" id="content-avatar-logo">
                                        <img id="logo-preview" class="w-[60px] h-[60px] rounded-full object-cover" src="../../img/avatar_default.jpg" alt="">
                                        <span id="edit-logo" class="bottom-0 cursor-pointer left-7 absolute flex items-center jutify-center  w-[30px] h-[30px] bg-[#ffde00] border-2 border-white dark:border-gray-800 rounded-full">
                                            <ion-icon class="w-full" aria-hidden="true" name="create"></ion-icon>

                                        </span>
                                    </div>
                                    <span class="text-[10px]  tex-gray-300">Max 15 MB</span>
                                </div>

                                <input class="hidden" type="file" name="logo_proyect" id="upload_logo">
                            </div>
                            <span class="text-sm block font-bold my-4">
                                Galeria
                            </span>
                            <div id="botones-event-gallery" class="flex items-center gap-3 hidden">
                                <button id="save_img_gallery" class="p-2 rounded-lg text-[10px] inline-block max-h-max text-white bg-green-600">Guardar</button>
                                <button id="cancelar_img_gallery" class="p-2 rounded-lg border-1 border-[#ececec] text-[10px] inline-block max-h-max bg-white text-gray-500">Cancelar</button>
                            </div>

                            <div id="multimedia_photos_preview" class="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div>
                                    <div id="drag-gallery" class="p-3 cursor-pointer justify-center items-center rounded-lg border-2 border-dashed border-[#ececec] flex flex-col gap-3">
                                        <ion-icon name="add-outline" class="font-bold"></ion-icon>
                                        <span class="text-sm text-center font-bold">Agregar fotos</span>
                                    </div>
                                    <input accept="image/*" multiple type="file" class="hidden" id="upload-gallery">
                                </div>
                            </div>

                            <span class="text-sm block font-bold my-4">
                                Video URL
                            </span>
                            <div class="my-3 w-full">
                                <input class="w-full bg-gray-200 rounded p-2" placeholder="Ingresa la url del video de Youtube" type="text" id="videoUrlProyecto">
                                <iframe class="hidden w-full" id="iframeVideoY" height="315" src="" frameborder="0" allowfullscreen></iframe>

                                <div id="viewbuttonsvideo" class="w-full hidden items-center flex gap-4">
                                    <button class="bg-gray-100 text-gray-900 text-sm rounded p-3 border cursor-pointer" id="cancelarvideo">Cancelar</button>
                                    <button class="bg-green-500 text-white text-sm rounded p-3 border cursor-pointer" id="savevideo">Guardar cambios</button>
                                </div>
                            </div>

                        </div>
                        <div class="w-full md:px-[20px]">

                            <span class="route" style="margin-bottom: 0px !important">
                                Descripcion del proyecto
                            </span>
                            <div class="w-full my-3">
                                <textarea id="description-proyect" class="rounded p-2 bg-gray-200 text-sm w-full" placeholder="Max 600 letras" id="" maxlength="600" cols="200" rows="4"></textarea>
                                <div id="viewbuttonsdescription" class="w-full hidden items-center flex gap-4">
                                    <button class="bg-gray-100 text-gray-900 text-sm rounded p-3 border cursor-pointer" id="cancelardescription">Cancelar</button>
                                    <button class="bg-green-500 text-white text-sm rounded p-3 border cursor-pointer" id="savedescription">Guardar cambios</button>
                                </div>
                            </div>
                            <span class="route" style="margin-bottom: 0px !important">
                                Amenidades
                            </span>
                            <button id="btnAgregarAmenidad" class="bg-[#310ecd] text-white text-sm px-4 py-2 rounded my-3">
                                Agregar Amenidad
                            </button>
                            <ul id="amenidadesList" class="flex flex-col gap-3"></ul>
                            <!-- fin de amenidades -->
                            <div id="changeBtn" class="hidden">
                                <button id="cancelarCambiosAmenidades" class="px-2 py-3 rounded bg-white text-gray-700 text-xs border border-gray-300">Cancelar</button>
                                <button id="subirCambiosAmenidades" class="px-2 py-3 rounded bg-green-600 text-white text-xs">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>


                </div>
                <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                    </div> -->
                <!-- </form> -->

            </div>
            <div class="main-datatable p-4 bg-white shadow">
                <div class="overflow-x">
                    <!-- <h1 class="title-table">Proyectos</h1> -->
                    <!-- <div class="section-search">
                        <input type="text" placeholder="Ingrese el nombre del cliente">
                        <ion-icon id="search-btn" name="search-sharp"></ion-icon>
                    </div> -->

                    <table style="width:100% !important;" id="proyectosList" class="table cust-datatable dataTable no-footer">
                        <thead>
                            <tr>
                                <th style="min-width:80px;">Nombre Proyecto</th>
                                <th style="min-width:80px;">Sedes asignadas</th>
                                <th style="min-width:80px;">Status</th>
                                <th style="min-width:80px;">Acciones</th>
                            </tr>
                        </thead>
                    </table>


                </div>
            </div>
        </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>

    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="../../components/sidebar.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    <script src="../../js/dinamic/gestion_proyectos_a.js"></script>
    <script src="./script.js"></script>

<?php } ?>

    </html>