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
            <!-- <span class="route">
                > Home > Ventas
            </span> -->
            <div id="pago_cuota_modal" class="modal-create md-hidden">
                <div class="form-create" style="width:850px !important">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Resumen de cuotas</h1>
                    <table id="cronogramaList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                        <thead>
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    fecha programada
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    monto
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    fecha de pago
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    status
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    acciones
                                </th>
                            </tr>
                        </thead>
                    </table>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div><!-- modal print cronograma-->
            <div id="modalprintCuota" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden z-[50000]">
                <div class="bg-white p-8 rounded shadow-lg overflow-y-auto h-[600px]">
                    <h2 class="text-sm font-bold mb-4">Recibo de Cuota</h2>
                    <div id="reciboPagoCuota" class="mb-4">
                        <div id="datosBusinessRecibo">


                        </div>
                        <div class="my-4">
                            <h3 class="font-bold text-center block text-xl courier-prime">Recibo de Pago</h3>
                        </div>
                        <p class="font-bold text-start courier-prime">Cliente: <span class="inline-block font-normal" id="datos_cliente_cuota"></span></p>
                        <p class="font-bold text-start courier-prime">DNI: <span class="inline-block font-normal"></span></p>
                        <p class="font-bold text-start courier-prime">Direccion: <span class="inline-block font-normal"></span></p>

                        <table class="table-auto w-full mb-4">
                            <thead class="courier-prime">
                                <tr>
                                    <th class="px-4 py-2">NUMERO</th>
                                    <th class="px-4 py-2">FECHA</th>
                                    <th class="px-4 py-2">MONTO</th>
                                    <th class="px-4 py-2">STATUS</th>
                                </tr>
                            </thead>
                            <tbody id="detalleCuota" class="courier-prime">

                            </tbody>
                        </table>
                        <p class="font-bold text-3xl courier-prime">TOTAL PAGADO: <span class="inline-block" id="totalpagadocuota"></span></p>

                        <div class="mt-8">
                            <h3 class="font-bold text-center block text-xl courier-prime">¡Gracias por su preferencia!</h3>
                            <p class="text-center courier-prime">Representación impresa de nota de venta electrónica.</p>
                        </div>

                    </div>
                    <div id="pdfoutputCuota" class="h-[500px]"></div>
                </div>
            </div>
            <!-- modal pagar cuota -->
            <div id="generarcomision_modal" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Genear comision</h1>
                    <p class="text-xs">En esta seccion se configura la comision que deberia recibir el asesor por la venta</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="group">
                            <label for="" class="text-sm font-bold">Tipo de Comision</label>
                            <select class="px-3 py-2 rounded bg-gray-200 w-full" name="" id="tipoComision">
                                <option value="0" disabled>Seleccione un tipo de comision</option>
                                <option value="%">%</option>
                                <option value="MONTO_FIJO">MONTO FIJO</option>
                            </select>
                        </div>
                        <div class="group" id="container_monto_tipo">
                            <label for="" class="text-sm font-bold">Monto Tipo</label>
                            <input class="px-3 py-2 rounded bg-gray-200 w-full" id="monto_tipo_comision" type="number" placeholder="0">
                        </div>

                        <div class="group">
                            <label for="" class="text-sm font-bold">Total Venta</label>
                            <input class="px-3 py-2 rounded bg-gray-200 w-full" id="total_venta_comision" placeholder="0.00" type="number" disabled>
                        </div>
                        <div class="group">
                            <label for="" class="text-sm font-bold">Monto Comision</label>
                            <input class="px-3 py-2 rounded bg-gray-200 w-full" id="monto_comision" type="number" step="0.01" placeholder="0.00" disabled>
                        </div>
                        <div class="group">
                            <label for="" class="text-sm font-bold">Tipo Pago</label>
                            <select class="px-3 py-2 rounded bg-gray-200 w-full" name="tipo_pago_comision" id="tipo_pago_comision">
                                <option value="PAGO_PARCIAL">PARCIAL</option>
                                <option value="PAGO_COMPLETO">COMPLETO</option>
                            </select>
                        </div>
                    </div>
                    <button id="generate_comision_btn" class="px-3 py-2 rounded text-white bg-[#310ecd]">Generar Comision</button>
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
            <div id="popup-modal-pagar" tabindex="-1" class="z-[5000] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full h-full ">
                <div class="overlay absolute bg-gray-500 opacity-50 blur-md top-0 left-0 w-full h-full"></div>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button id="close-confirm" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal-pagar">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas Seguro de realizar este pago?</h3>
                            <button data-modal-hide="popup-modal-pagar" id="confirm_pagar_cuota" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Si, adelante
                            </button>
                            <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <h1 class="font-bold">Filtros avanzados</h1>
            <div class="w-full grid grid-cols-5">
                <div class="group">
                    <label for="" class="text-sm font-bold">STATUS</label>
                    <select class="px-3 py-2 rounded bg-gray-200 w-full" name="tipo_pago_comision" id="tipo_pago_comision">
                        <option value="GENERADOS">GENERADOS</option>
                        <option value="NO GENERADOS">NO GENERADOS</option>
                    </select>
                </div>
            </div> -->
            <div class="datatable-main bg-white px-4 py-3 rounded shadow">
                <table id="ventasList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                    <thead>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                cliente
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proyecto
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                fecha
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                tipo pago
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                total
                            </th>
                            <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                monto inicial
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                N cuotas
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                pagado
                            </th> -->
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                status comision
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                monto comision
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
    <script src="../../js/dinamic/gestion_comisiones_admin.js"></script>

    </html>
<?php } ?>