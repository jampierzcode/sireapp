<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 4) {
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
        include_once "../../components/Sidebar_cajero.php"
        ?>
        <div class="container-dashboard h-screen">
            <!-- <span class="route">
                > Home > Ventas
            </span> -->
            <div id="crear-gasto" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Nueva Gasto</h1>
                    <div>
                        <div class="grid grid-cols-1 gap-3">
                            <div class="group flex flex-col">
                                <label class="text-sm font-bold" for="tipogasto">Tipo de gasto</label>
                                <select style="width: 100%; background: #ececec" id="tipo_gasto" class="text-sm w-full px-3 py-2 rounded bg-gray-200" name="state">
                                    <option disabled value="0">Seleccione el tipo de gasto</option>
                                    <option value="OFICINA">OFICINA</option>
                                    <option value="PROYECTO">PROYECTO</option>
                                </select>
                            </div>
                            <div id="proyectoShow" class="hidden group flex flex-col">
                                <label class="text-sm font-bold" for="proyecto">Proyecto</label>
                                <select style="width: 100%; background: #ececec" id="proyectoList" class="js-example-placeholder-single js-states form-control" name="state">
                                    <option></option>
                                </select>
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="cliente">Descripcion</label>
                                <input placeholder="Escribe aqui el detalle de venta" type="text" id="descripcion_gasto" class="text-sm w-full px-3 py-2 rounded bg-gray-100">
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="cliente">Monto</label>
                                <input placeholder="Escribe aqui monto" type="number" step="0.01" id="monto_gasto" class="text-sm w-full px-3 py-2 rounded bg-gray-100">
                            </div>

                        </div>

                        <button type="submit" id="registrar_gasto_btn" class="text-white bg-[#310ecd] px-3 py-2 rounded text-sm mt-6">Registrar</button>
                    </div>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <!-- modal abrir caja -->
            <div id="aperturar_caja" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">No hay una caja abierta</h1>

                    <div class="w-full">
                        <h1 class="text-sm mb-4">Debes aperturar una caja para poder vender</h1>
                        <a href="../caja/" class="inline-block px-4 py-3 text-sm text-white bg-red-500">Abrir caja</a>
                    </div>
                </div>
            </div>
            <!-- modal print -->
            <div id="pdf-modal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center hidden z-[50000]">
                <div class="w-[500px]  bg-white p-4 rounded shadow-lg">
                    <h1 class="text-cnter text-xl font-bold">Imprimir PDF</h1>
                    <div class="w-full h-[400px]" id="pdf-content">
                        <table id="pdf-table" class="w-full mb-4">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="pdf-table-body">
                                <!-- Aquí se agregarán las filas de la tabla de forma dinámica -->
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" class="text-right">TOTAL</td>
                                    <td id="pdf-total">0</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button id="close-pdf-modal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded">
                        Cerrar PDF
                    </button>
                </div>
            </div>
            <!-- fin de modal print -->
            <div class="flex w-full">
                <button id="new-gasto" class="px-3 py-2 text-white bg-[#310ecd] rounded">+ Nuevo Gasto</button>
            </div>
            <div class="datatable-main mt-4 bg-white px-4 py-3 rounded shadow">
                <table id="gastosList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                    <thead>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                descripcion
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                monto
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                fecha
                            </th>
                            <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                monto inicial
                            </th> -->
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                tipo de gasto
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                acciones
                            </th>
                        </tr>
                    </thead>
                </table>
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
    <script src="../../js/dinamic/gestion_gastos.js"></script>

    </html>
<?php } ?>