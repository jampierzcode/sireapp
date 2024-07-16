<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 1) {
    header("Location: ../../../index.php");
} else {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/main.css">
        <link rel="stylesheet" href="../../css/datatablesmith.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/drag-drop.css">
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

        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar.php"
        ?>

        <div class="container-dashboard">
            <span class="route">
                > Home > Proyectos
            </span>
            <div id="modal-asigned" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="title-modal">Asignar Usuario</h1>
                    <div class="fileProyect">
                        <p class="text-center w-full">Proyecto: <span id="nombre_proyecto"></span></p>
                    </div>
                    <div id="list-campos" style="display: flex; flex-direction: row; gap: 15px">
                        <select id="user-proyect" style="width: 100%" class="users_proyect" name="state">

                        </select>
                        <button id="update-asigned-form" class="btn-add">Agregar</button>
                    </div>

                    <span class="route" style="margin-bottom: 0px !important">
                        Usuarios Registrados
                    </span>
                    <div class="listUsuarios">
                        <div class="main-datatable">
                            <div class="overflow-x">
                                <table style="width:100% !important;" id="usersASigneds" class="table cust-datatable dataTable no-footer">
                                    <thead>
                                        <tr>
                                            <th style="min-width:30px;"># id</th>
                                            <th style="min-width:80px;">Cliente asignado</th>
                                            <th style="min-width:80px;">Asignado</th>
                                            <th style="min-width:80px;">Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
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
                    <h1 class="title-modal">Administrar Lotes</h1>
                    <div class="fileProyect">
                        <p class="text-start w-full">Proyecto: <span id="nombre_proyecto_lotes"></span></p>
                    </div>
                    <!-- <div id="list-campos" style="display: flex; flex-direction: row; gap: 15px">
                        <select id="user-proyect" style="width: 100%" class="users_proyect" name="state">

                        </select>
                        <button id="update-asigned-form" class="btn-add">Agregar</button>
                    </div> -->

                    <span class="route" style="margin-bottom: 0px !important">
                        Lotes Registrados
                    </span>
                    <div class="flex gap-4">
                        <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"><ion-icon name="create"></ion-icon> Editar Todos</button>
                        <!-- <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button> -->
                    </div>
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


                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <!-- Crear la habitacion vista -->
            <?php if (!empty($_GET["view"]) && $_GET["view"] === "new-proyecto" && $_SESSION["us_tipo"] == 1) { ?>
                <div class="create-habs">
                    <h1 class="title-action">Crear Proyecto</h1>
                    <div class="form-add" id="form-habs">
                        <div class="content-form grid-3-column">
                            <div class="group-date">
                                <span>Nombre Proyecto</span>
                                <input id="nombreProyecto" type="text" placeholder="Ingrese el nombre del proyecto">
                            </div>
                            <div class="group-date">
                                <span>Cantidad de Lotes</span>
                                <input id="lotesProyecto" type="number" placeholder="Ingrese el nombre del proyecto">
                            </div>
                        </div>
                        <div class="container-images">
                            <h1 class="title-action">Subir Plano</h1>
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
                        <div class="actions-button">
                            <button id="proyecto-btn-add" class="btn-add-create">Agregar</button>
                            <a href="../Proyectos/" class="btn-cancel-create">Cancelar</a>
                        </div>

                    </div>
                </div>
            <?php } else { ?>

                <?php if ($_SESSION["us_tipo"] == 1) { ?>
                    <div class="links-container">
                        <a href="?view=new-proyecto" id="ancla-add-hab" class="btn-add">
                            + Nuevo Proyecto
                        </a>
                        <!-- <a href="?view=new-piso" id="ancla-add-cat" class="btn-add">
                        + Nuevo Piso
                    </a> -->
                    </div>

                <?php } ?>
                <div class="main-datatable">
                    <div class="overflow-x">
                        <!-- <h1 class="title-table">Proyectos</h1> -->
                        <!-- <div class="section-search">
                        <input type="text" placeholder="Ingrese el nombre del cliente">
                        <ion-icon id="search-btn" name="search-sharp"></ion-icon>
                    </div> -->

                        <table style="width:100% !important;" id="proyectosList" class="table cust-datatable dataTable no-footer">
                            <thead>
                                <tr>
                                    <th style="min-width:30px;"># id</th>
                                    <th style="min-width:80px;">Nombre Proyecto</th>
                                    <th style="min-width:80px;">imgUrl</th>
                                    <th style="min-width:80px;">Cliente asignado</th>
                                    <th style="min-width:80px;">Status</th>
                                    <?php if ($_SESSION["us_tipo"] == 1) { ?>
                                        <th style="min-width:80px;">Creador por</th>
                                    <?php } ?>
                                    <th style="min-width:80px;">Acciones</th>
                                </tr>
                            </thead>
                        </table>


                    </div>
                </div>
            <?php } ?>

            <!-- Crear el piso de la habitacion -->



        </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>

    <script src="../../components/sidebar.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    <?php if (!empty($_GET["view"])) { ?>
        <?php if ($_GET["view"] == "new-proyecto" && $_SESSION["us_tipo"] == 1) { ?>
            <script src="../../js/static/drag-drop.js"></script>
            <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->
            <script src="../../js/dinamic/create-hab.js"></script>

        <?php }
    } else if ($_SESSION["us_tipo"] == 1) { ?>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
        <script src="../../js/dinamic/gestion_proyectos_sa.js"></script>

    <?php } else if ($_SESSION["us_tipo"] == 2) { ?>
        <script src="../../js/dinamic/gestion_proyectos_a.js"></script>

<?php }
} ?>

    </html>