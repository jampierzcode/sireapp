<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 2) {
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
        <link rel="stylesheet" href="../../css/datatablesmith.css">
        <link rel="stylesheet" href="../../css/selectsinput.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.4.0/css/fixedHeader.dataTables.min.css" />

        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Soluciones Caja</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>
        <div class="container-dashboard h-screen">
            <div id="modal_inversion" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Nueva Inversión</h1>
                    <div class="group w-full">
                        <label class="font-bold text-sm text-gray-900" for="">Tipo de Inversion</label>
                        <select class="w-full px-3 py-2 rounded bg-gray-100" name="tipo" id="tipo_inversion">
                            <option value="0" disabled>Seleccione el tipo de inversión</option>
                            <option value="CAPITAL">CAPITAL</option>
                            <option value="INYECCION DE CAPITAL">INYECCION DE CAPITAL</option>
                            <option value="NUEVO INVERSIONISTA">NUEVO INVERSIONISTA</option>
                        </select>
                    </div>
                    <div class="h-[3px] w-full bg-gray-200"></div>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Monto Inversión</label>
                            <input type="number" step="0.01" placeholder="ingresa aqui el monto de inversion" id="monto_inversion" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                        <div class="group w-full">
                            <label class="font-bold text-sm text-gray-500" for="">Descripcion</label>
                            <input placeholder="ingresa aqui el por que de la ivnersion" id="descripcion_inversion" type="text" class="w-full px-3 py-2 rounded bg-gray-100">
                        </div>
                    </div>
                    <button id="registrar_inversion" class="px-3 py-2 rounded bg-[#310ecd] text-white text-sm">
                        Registrar Inversión
                    </button>
                </div>
            </div>
            <div class="">
                <div class="main-datatable">
                    <div class="overflow-x">
                        <table style="width:100% !important;" id="managerInversionesList" class="table cust-datatable dataTable no-footer">
                            <thead>
                                <tr>
                                    <th style="min-width:30px;">Proyecto</th>
                                    <th style="min-width:80px;">Inversion Total</th>
                                    <th style="min-width:80px;">Ultima Inversion</th>
                                    <th style="min-width:80px;">Acciones</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>




        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <!-- pdf generate -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>




    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion_inversiones.js"></script>

    </html>
<?php } ?>