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
            <!-- Modal print historial-->
            <div id="modalPrintHistorial" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden z-[50000]">
                <div class="bg-white p-8 rounded shadow-lg overflow-y-auto h-[500px] w-[850px]">
                    <h2 class="text-lg font-bold mb-4">Reporte de caja</h2>
                    <div id="boletaContent" class="mb-4">
                        <div id="datosBusiness">


                        </div>
                        <h1 class="font-bold text-center block text-3xl">RESUMEN FINANZAS</h1>
                        <p class="font-bold text-center">Fecha: <span class="inline-block" id="rango_fecha_reporte"></span></p>
                        <p class="font-bold text-center">Proyecto(s): <span class="inline-block" id="proyectos_reporte"></span></p>
                        <h1 class="font-bold">TRANSACCIONES</h1>
                        <p class="font-normal text-sm">(ventas, separaciones, pagos de cuotas)</p>
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
                        <h1 class="font-bold">COMISIONES PAGADAS</h1>
                        <table class="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 text-xs">TIPO PAGO</th>
                                    <th class="px-4 py-2 text-xs">FECHA</th>
                                    <th class="px-4 py-2 text-xs">TIPO COMISION</th>
                                    <th class="px-4 py-2 text-xs">MONTO TIPO COMISION</th>
                                    <th class="px-4 py-2 text-xs">ASESOR</th>
                                    <th class="px-4 py-2 text-xs">MONTO COMISION</th>
                                </tr>
                            </thead>
                            <tbody id="comisiones">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5" class="border px-4 py-2 text-right">Total:</td>
                                    <td id="total_comisiones" class="border px-4 py-2 font-bold"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <h1 class="font-bold">GASTOS SEDE</h1>
                        <table class="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">Descripcion</th>
                                    <th class="px-4 py-2">Fecha</th>
                                    <th class="px-4 py-2">Tipo Gasto</th>
                                    <th class="px-4 py-2">Monto Gastado</th>
                                </tr>
                            </thead>
                            <tbody id="gastos_sede">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="border px-4 py-2 text-right">Total:</td>
                                    <td id="total_gastos_sede" class="border px-4 py-2 font-bold"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <h1 class="font-bold">INGRESOS A CAJA</h1>
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
                                    <td id="total_ingresos" class="border px-4 py-2 font-bold"></td>
                                </tr>
                            </tfoot>
                        </table>

                        <h1 class="font-bold">GASTOS DE CAJA</h1>
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
                                    <td id="total_gastos" class="border px-4 py-2 font-bold"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <p class="font-bold">Ganancias: <span class="inline-block text-lg" id="rendirTotal"></span></p>
                        <p class="font-normal">(Ingresos/Transacciones - Gastos - Comisiones)</p>
                        <p class="font-bold">Ganancias en efectivo: <span class="inline-block" id="rendirTotalEfectivo"></span></p>
                    </div>
                    <div id="pdfoutput" class="h-[500px]"></div>
                </div>
            </div>
            <div class="md:z-[1000] top-0 md:sticky md:top-[-40px] bg-[#f5f7fb]">
                <div class="relativew-full md:w-full">
                    <div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-6 mb-4">
                        <div class="w-full">

                            <label class="text-sm font-bold" for="Proyectos">Sedes</label>

                            <select id="filter-sede" class="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white ">
                            </select>
                        </div>
                    </div>
                    <div id="menu-filtros-box" class="ease-in duration-300 w-full top-[105%] left-0 right-0">
                        <div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-6 gap-4">
                            <div class="mb-4 h-max relative ">

                                <label class="text-sm font-bold" for="Proyectos">Proyectos</label>
                                <div id="proyecto-active" class="flex items-center cursor-pointer shadow-md max-w-max px-4 py-3 bg-[#e9e4ff] rounded-full">
                                    <img src="" alt="">
                                    <p id="span-proyecto" key_proyecto="Todos" class="text-sm font-bold text-[#5208dd] whitespace-nowrap overflow-hidden overflow-ellipsis">Todos Los proyectos</p>
                                    <div class="icon-proyecto-down duration-300 flex items-center px-3 cursor-pointer text-[#5208dd]"><ion-icon name="chevron-down-outline"></ion-icon></div>
                                </div>
                                <ul class="z-[20000] invisible animation-[invisible] duration-100 absolute mt-3 shadow-md bg-white py-3 px-3 rounded top-full lef-0  w-[200%] flex flex-col gap-2" id="list-proyectos">

                                </ul>
                            </div>
                            <div class="h-auto flex items-center">
                                <select id="filter_static" class="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white ">
                                    <option class="py-3 px-2" value="0" disabled>Seleccione un filtro</option>
                                    <option class="py-3 px-2" value="this-week">Esta semana</option>
                                    <option class="py-3 px-2" value="this-month">Esta mes</option>
                                    <option class="py-3 px-2" value="last-month">Mes Anterior</option>
                                    <option class="py-3 px-2" value="last-week">Semana Anterior</option>
                                </select>
                            </div>
                            <div class="h-auto">
                                <label class="text-sm font-bold" for="Fecha Inicio">Fecha Inicio</label>
                                <input type="date" id="fecha-inicio-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                            </div>
                            <div class="h-auto">
                                <label class="text-sm font-bold" for="Fecha Inicio">Fecha Termino</label>
                                <input type="date" id="fecha-fin-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                            </div>

                            <div class="flex items-center gap-2">
                                <button id="search_date_finanzas" type="button" class="text-white bg-[#310ecd] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Buscar</button>
                                <button id="refresh_date_finanzas" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Reset</button>
                                <button id="reporte_resumen" type="button" class="text-white bg-[#310ecd] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"><ion-icon name="print"></ion-icon></button>

                            </div>
                        </div>
                        <!-- <span class="text-xs">El filtro funciona de acuerdo a un rango de fechas (con/sin) asesor</span> -->
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                <div class="col-span-1 md:col-span-3">
                    <h5 class="mb-8 text-lg font-bold">Inversion/Saldo</h5>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="card px-6 py-4 bg-[#310ecd]">
                            <h2 class="text-white font-bold text-lg">Inversion Total</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-white" id="resumen_inversion">S/0.00</h3>
                            <p class="text-xs font-normal text-white">Capital, Reinversion</p>
                            <button class="px-3 py-2 rounded-full text-black font-bold bg-white text-sm mt-4" id="detail_inversion">Ver detalles</button>
                        </div>
                        <div class="card px-6 py-4 bg-[#e9e4ff] shadow">
                            <h2 class="text-[#310ecd] font-bold text-lg">Saldo Actual</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-[#310ecd]" id="resumen_saldo">S/0.00</h3>
                            <p class="text-xs font-normal text-gray-800">(Inversion - Gastos)</p>
                        </div>

                    </div>
                    <h5 class="my-8 text-lg font-bold">Resumen</h5>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div class="card px-6 py-4 bg-yellow-100">
                            <h2 class="text-orange-500 font-bold text-lg">Comisiones</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-orange-500" id="resumen_comisiones">S/0.00</h3>
                            <p class="text-xs font-normal text-orange-500">(pago de comisiones)</p>
                            <button class="px-3 py-2 rounded-full text-white font-bold bg-orange-500 text-sm mt-4" id="detail_comisiones">Ver detalles</button>
                        </div>
                        <div class="card px-6 py-4 bg-green-100">
                            <h2 class="text-green-700 font-bold text-lg">Transacciones / Ingresos</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-green-700" id="resumen_ingresos">S/0.00</h3>
                            <p class="text-xs font-normal text-green-700">(ventas, separaciones, pagos de cuota, ingresos a caja)</p>
                            <button class="px-3 py-2 rounded-full text-white font-bold bg-green-700 text-sm mt-4" id="detail_ingresos">Ver detalles</button>
                        </div>
                        <div class="card px-6 py-4 bg-red-100">
                            <h2 class="text-red-500 font-bold text-lg">Gastos</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-red-500" id="resumen_gastos">S/0.00</h3>
                            <p class="text-xs font-normal text-red-500">(gastos de caja, gastos de sede)</p>
                            <button class="px-3 py-2 rounded-full text-white font-bold bg-red-500 text-sm mt-4" id="detail_gastos">Ver detalles</button>
                        </div>
                        <div class="card px-6 py-4 bg-[#310ecd]">
                            <h2 class="text-white font-bold text-lg">Ganancias</h2>
                            <h3 class="font-bold text-md md:text-lg lg:text-xl text-white" id="resumen_ganancias">S/0.00</h3>
                            <p class="text-xs font-normal text-white">(Ingresos - Gastos)</p>
                        </div>
                    </div>
                    <!-- graficos -->
                    <div class="w-full mt-10">
                        <h5 class="mb-8 text-lg font-bold leading-none text-gray-900 dark:text-white">Comparacion</h5>

                        <div id="comparacion_general" class="w-full border-gray-200 rounded border-1" style="height:400px;"></div>
                    </div>
                </div>
                <!-- <div class="col-span-1 bg-gray-300">
                    <div class="p-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="col-span-1 bg-white p-4">
                                <h3 class="text-2xl text-center font-bold text-green-500">3</h2>
                                    <h2 class="text-sm text-center font-bold font-bold">Lotes vendidos</h2>
                            </div>
                            <div class="col-span-1 bg-white p-4">Columna B</div>
                        </div>
                    </div>
                </div> -->
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
    <script src="../../js/dinamic/gestion_finanzas.js"></script>

    </html>
<?php } ?>