<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 4) {
    header("Location: ../../index.php");
} else {
?>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/main.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
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
                > Home > Caja Abierta
            </span> -->
            <div id="sectionopencaja" class="w-full flex hidden">
                <button id="open-caja" class="px-4 py-3 rounded bg-[#310ecd] text-sm text-white">Abrir Caja</button>
            </div>
            <!-- Modal print historial-->
            <div id="modalPrintHistorial" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden z-[50000]">
                <div class="bg-white p-8 rounded shadow-lg overflow-y-auto h-[500px] w-[850px]">
                    <h2 class="text-lg font-bold mb-4">Reporte de caja</h2>
                    <div id="boletaContent" class="mb-4">
                        <div id="datosBusiness">


                        </div>
                        <h1 class="font-bold text-center block text-3xl">HISTORIAL CAJA</h1>
                        <p class="font-bold">Saldo Inicial: <span class="inline-block" id="monto_inicial"></span></p>
                        <h1 class="font-bold">TRANSACCIONES</h1>
                        <table class="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 text-xs">MOTIVO</th>
                                    <th class="px-4 py-2 text-xs">FECHA</th>
                                    <th class="px-4 py-2 text-xs">CLIENTE</th>
                                    <th class="px-4 py-2 text-xs">PROYECTO</th>
                                    <th class="px-4 py-2 text-xs">METODO PAGO</th>
                                    <th class="px-4 py-2 text-xs">MONTO</th>
                                </tr>
                            </thead>
                            <tbody id="transacciones">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5" class="border px-4 py-2 text-right">Total:</td>
                                    <td id="total_finanzas" class="border px-4 py-2 font-bold"></td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="border px-4 py-2 text-right">Total Efectivo:</td>
                                    <td id="total_finanzas_efectivo" class="border px-4 py-2 font-bold"></td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="border px-4 py-2 text-right">Total Transferencias:</td>
                                    <td id="total_finanzas_transferencias" class="border px-4 py-2 font-bold"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <h1 class="font-bold">GASTOS</h1>
                        <table class="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">Descripcion</th>
                                    <th class="px-4 py-2">Fecha</th>
                                    <th class="px-4 py-2">Tipo Gasto</th>
                                    <th class="px-4 py-2">Monto Gastado</th>
                                </tr>
                            </thead>
                            <tbody id="gastos">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="border px-4 py-2 text-right">Total:</td>
                                    <td id="total_gastos" class="border px-4 py-2"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <h1 class="font-bold">INGRESOS</h1>
                        <table class="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">Descripcion</th>
                                    <th class="px-4 py-2">Fecha</th>
                                    <th class="px-4 py-2">Tipo Ingreso</th>
                                    <th class="px-4 py-2">Monto Ingreso</th>
                                </tr>
                            </thead>
                            <tbody id="ingresos">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="border px-4 py-2 text-right">Total:</td>
                                    <td id="total_ingresos" class="border px-4 py-2"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <p class="font-bold">Total a rendir: <span class="inline-block" id="rendirTotal"></span></p>
                        <p class="font-bold">Total a rendir efectivo: <span class="inline-block" id="rendirTotalEfectivo"></span></p>
                    </div>
                    <div id="pdfoutput" class="h-[500px]"></div>
                </div>
            </div>
            <div id="registra-caja-abierta" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Abrir caja</h1>

                    <div class="w-full">
                        <label class="text-sm" for="">Cajas</label>
                        <select name="" class="px-3 py-2 w-full bg-gray-200 text-sm" id="cajasList">

                        </select>
                    </div>
                    <div class="w-full">
                        <label class="text-sm" for="">Monto apertura</label>
                        <input class="bg-gray-200 text-sm px-3 py-2 w-full" id="monto_apertura" type="text" placeholder="ejm: 100 o 100.00">
                    </div>
                    <button type="button" id="registrar_turno" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Abrir esta Caja</button>


                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="popup-modal" tabindex="-1" class="z-[5000] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full h-full ">
                <div class="overlay absolute bg-gray-500 opacity-50 blur-md top-0 left-0 w-full h-full"></div>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button id="close-confirm" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas Seguro de Cerrar Caja?</h3>
                            <button data-modal-hide="popup-modal" id="confirm_cerrar_caja" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Si, adelante
                            </button>
                            <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full hidden" id="cajaAbierta">
                <div class="flex justify-between px-4 py-3 shadow bg-white rounded-lg">
                    <div class="w-full flex gap-3">
                        <ion-icon class="text-3xl" name="albums-outline"></ion-icon>
                        <div>
                            <h1 class="text-sm">Caja : <b id="name_caja">...</b></h1>
                            <span class="text-xs font-bold px-2 py-1 inline-block bg-green-200 rounded border border-green-700 text-green-700">ABIERTO</span>
                            <h1 class="text-sm">Responsable : <b id="responsable_caja"></b></h1>
                            <h1 class="text-sm">Apertura : <b id="fecha_apertura_caja">...</b></h1>

                        </div>
                    </div>
                    <div class="w-full flex gap-4 flex-col items-end">
                        <div class="flex flex-col gap-2">

                            <button data-modal-toggle="popup-modal" id="corte_caja" class="font-bold bg-red-500 px-3 py-2 rounded text-white text-sm flex items-center gap-3">
                                <ion-icon name="briefcase-outline"></ion-icon>
                                Hacer corte de caja
                            </button>
                            <button id="reporte_caja" class="font-bold bg-blue-500 px-3 py-2 rounded text-white text-sm flex items-center gap-3">
                                <ion-icon name="briefcase-outline"></ion-icon>
                                Ver reporte
                            </button>
                        </div>
                    </div>

                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">

                    <div class="w-full">
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-green-700">Saldo inicial</p>
                            <div class="flex gap-3 justify-between">
                                <h1 class="text-sm font-bold" id="saldo_inicial">S/200.00</h1>
                                <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos">
                            </div>
                        </div>

                    </div>
                    <div class="w-full flex flex-col gap-3">
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-[#310ecd]">Total Ventas</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="ventas_total">S/00.00</h1>
                                    <p class="text-xs">Resultados de ventas y separaciones</p>
                                </div>
                                <ion-icon name="wallet-outline" class="text-[#310ecd] text-[30px]"></ion-icon>
                                <!-- <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos"> -->
                            </div>
                        </div>
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-[#310ecd]">Total Efectivo</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="ventas_efectivo">S/00.00</h1>
                                </div>
                                <ion-icon name="cash-outline" class="text-[#310ecd] text-[30px]"></ion-icon>

                                <!-- <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos"> -->
                            </div>
                        </div>
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-[#310ecd]">Total transferencias</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="ventas_transferencias">S/00.00</h1>
                                </div>
                                <ion-icon name="arrow-undo-circle-outline" class="text-[#310ecd] text-[30px]"></ion-icon>
                            </div>
                        </div>

                    </div>
                    <div class="w-full flex flex-col gap-3">
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-red-500">Gastos de caja</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="gastos_total">S/00.00</h1>
                                    <p class="text-xs">Gastos que salen de caja chica</p>
                                </div>
                                <ion-icon name="cash-outline" class="text-[30px] text-red-500"></ion-icon>

                                <!-- <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos"> -->
                            </div>
                        </div>
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-[#310ecd]">Ingresos de caja</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="ingresos_total">S/00.00</h1>
                                    <p class="text-xs">Ingresos que entrar de caja chica</p>
                                </div>
                                <ion-icon name="cash-outline" class="text-[30px] text-[#310ecd]"></ion-icon>

                                <!-- <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos"> -->
                            </div>
                        </div>
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-[#310ecd]">Saldo de Ingresos - Gastos</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="saldo_in_gas_total">S/00.00</h1>
                                    <p class="text-xs">Saldo de efectivo que entra y sale de caja chica</p>
                                </div>
                                <ion-icon name="cash-outline" class="text-[30px] text-[#310ecd]"></ion-icon>

                                <!-- <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos"> -->
                            </div>
                        </div>

                    </div>
                    <div class="w-full flex flex-col gap-3">
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-green-700">Total a rendir</p>
                            <div class="flex gap-3 justify-between">
                                <h1 class="text-sm font-bold" id="rendir_total">S/00.00</h1>
                                <img src="../../img/moneda.png" class="w-[30px]" alt="solesperuanos">
                            </div>
                        </div>
                        <div class="w-full shadow bg-white rounded-lg px-4 py-3">
                            <p class="font-bold text-sm text-green-700">Rendir en efectivo</p>
                            <div class="flex gap-3 justify-between">
                                <div>
                                    <h1 class="text-sm font-bold" id="rendir_efectivo">S/00.00</h1>
                                </div>

                                <ion-icon name="cash-outline" class="text-[30px] text-green-700"></ion-icon>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    <script src="../../components/sidebar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- pdf generate -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion_caja.js"></script>

    </html>
<?php } ?>