<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 3) {
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

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/habitaciones.css">
        <link rel="stylesheet" href="../../css/productos.css">
        <link rel="stylesheet" href="../../css/proforma.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.4.0/css/fixedHeader.dataTables.min.css" />
        <!-- bootsttrap -->
        <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"> -->
        </script>
        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_asesor.php"
        ?>
        <!-- <div style="z-index: 50000;" id="toast-success" class="fixed top-8 right-0 translate-x-full flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-[12px] font-normal">Item moved successfully.</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div> -->
        <div style="z-index: 50000;" id="toast-warning" class="fixed top-8 right-0 translate-x-full flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span class="sr-only">Debe seleccionar el tipo</span>
            </div>
            <div class="ml-3 text-[12px] font-normal">Debe seleccionar el tipo</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>

        <div class="container-dashboard">
            <div class="flex items-center mb-3 gap-3">

                <span class="font-bold text-nowrap inline-block">
                    > Home > CRM
                </span>
                <div class="w-full text-end font-bold">Mes actual: <span id="mesNow"></span></div>
                <div class="justify-center items-center flex gap-4">
                    <div class="flex bg-blue-600 p-2 rounded-lg gap-4 items-center text-white">
                        <h1 class="text-[12px] text-nowrap">Visitas Concretadas</h1>
                        <span id="visits_concretadas" class="text-white">0</span>
                    </div>
                    <div class="flex bg-yellow-600 p-2 rounded-lg gap-4 items-center text-white">
                        <h1 class="text-[12px] text-nowrap">Separaciones</h1>
                        <span id="separaciones_count" class="text-white">0</span>
                    </div>
                    <div class="flex bg-green-600 p-2 rounded-lg gap-4 items-center text-white">
                        <h1 class="text-[12px] text-nowrap">Ventas</h1>
                        <span id="ventas_count" class="text-white">0</span>
                    </div>
                    <button id="analysis-leads" class="p-2 max-w-max flex items-center bg-white rounded text-sm font-bold gap-2 hover:bg-violet-200 duration-300"><ion-icon class="text-xl" name="trending-up-outline"></ion-icon> Rendimiento</button>
                </div>
            </div>
            <div class="confirm-popup md-hidden">
                <div class="form-confirm">
                    <span class="title-confirm">Estas seguro de eliminar el usuario</span>
                    <div class="footerConfirm">
                        <button id="cancelConfirm" class="btnJsvm ">No</button>
                        <button id="okConfirm" class="btnJsvm ">Si</button>

                    </div>
                </div>
            </div>
            <!-- <div class="progreessbar" keyTop="10">
                <span>Visitas</span>
                <div class="bar">
                    <div class="barSize">
                    </div>
                </div>
                <p><span id="numberVisit"></span> visitas</p>
            </div> -->
            <div id="generar-proforma" class="modal-create md-hidden">
                <div class="form-create" style="max-width: 850px !important; width: 100%">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Generar proforma</h1>
                    <div class="formulario grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="h-auto">

                            <label for="description">Descripcion</label>
                            <input id="description-proforma" type="text" class="w-full text-sm px-4 py-2 rounded bg-gray-100" placeholder="Ingresa una breve descripcion">
                        </div>
                        <div class="h-auto">

                            <label for="precio">Precio</label>
                            <div class="flex items-center gap-4">
                                <div class="campo">
                                    <select id="tipomoneda" class="text-sm px-4 py-2 rounded bg-gray-100">
                                        <option value="$">$</option>
                                        <option value="S/">S/</option>
                                    </select>
                                </div>
                                <div class="campo">

                                    <input id="precio-proforma" type="text" class="w-full text-sm px-4 py-2 rounded bg-gray-100" placeholder="Ingresa un precio">
                                </div>
                            </div>
                        </div>
                        <div class="h-auto flex items-end rounded">
                            <button id="cart-proforma" class="px-3 py-2 bg-yellow-400 text-black font-bold">Agregar</button>
                        </div>

                    </div>
                    <table class="w-full border cart-proforma">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2">#</th>
                                <th class="px-4 py-2">Descripción</th>
                                <th class="px-4 py-2">Cantidad</th>
                                <th class="px-4 py-2">Precio</th>
                                <th class="px-4 py-2">Subtotal</th>
                                <th class="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="cart-items">
                            <!-- Aquí se generan las filas dinámicamente -->
                        </tbody>
                    </table>
                    <div>
                        <div class="flex items-center mb-4">
                            <input id="financiamiento_check" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="financiamiento_check" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Financiamento?</label>
                        </div>
                        <div id="container-financiamento" class="hidden grid gap-4 grid-cols-1 md:grid-cols-3">

                            <div>
                                <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="inicial">Monto Inicia</label>
                                <input id="monto_inicial_fn" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Ingrese el monto inicial">
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="cuotas">N-cuotas</label>
                                <input id="numero_cuotas_fn" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Numero de cuotas">
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="cuotas">Monto por cuota</label>
                                <input id="monto_cuotas_fn" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Numero de cuotas">
                            </div>
                        </div>
                    </div>
                    <div class="bg-violet-800 w-full py-2 mt-[40px] flex items-center justify-center">
                        <h1 class="text-sm font-bold text-white tet-center">Vista Previa</h1>
                    </div>
                    <!-- Creating an HTML element to be converted to a PDF -->
                    <div class="">
                        <div class="invoice-wrapper">
                            <div id="proforma-print" class="invoice">
                                <div class="invoice-container">
                                    <div class="invoice-head">
                                        <div class="grid grid-cols-2 mb-[60px]">
                                            <div class="invoice-head-top-left text-start">
                                                <img class="h-[60px] object-contain" id="logoproyecto-proforma" src="">

                                                <p id="name-proyecto-proforma" class="text-sm">...</p>
                                            </div>
                                            <div id="info_empresa" class="justify-end text-end flex  items-center gap-2">
                                                <div>
                                                    <p id="name-business-proforma" class="text-sm">...</p>
                                                    <p id="email-business-proforma" class="text-sm">...</p>
                                                    <p id="phonecontact-business-proforma" class="text-sm">...</p>
                                                    <p id="website-business-proforma" class="text-sm">...</p>
                                                </div>
                                                <img class="h-[80px] object-contain" id="logobusiness-proforma" src="">
                                            </div>
                                        </div>
                                        <h1 class="w-full text-center text-3xl font-bold mt-8 pb-8 text-gray-800">PROFORMA</h1>
                                        <div class="hr"></div>
                                        <div class="invoice-head-middle">
                                            <div class="invoice-head-middle-left text-start">
                                                <p><span class="text-bold text-sm">Fecha</span>: <span id="fecha-proforma" class="text-sm">05/12/2020</span> </p>
                                            </div>
                                            <div class="invoice-head-middle-right text-end">
                                                <p>
                                                    <spanf class="text-bold">Proforma No:</span>16789
                                                </p>
                                            </div>
                                        </div>
                                        <div class="hr"></div>
                                        <div class="invoice-head-bottom">
                                            <div class="invoice-head-bottom-left">
                                                <ul>
                                                    <li class='text-bold'>Cliente:</li>
                                                    <li id="name-cliente-proforma" class="text-sm">Smith Rhodes</li>
                                                    <li id="contact-cliente-proforma" class="text-sm">Smith Rhodes</li>
                                                </ul>
                                            </div>
                                            <div class="invoice-head-bottom-right">
                                                <ul class="text-end">
                                                    <div id="datos-asesor" class="flex gap-4">
                                                        <img class="w-4 h-4 rounded-full" src="" alt="">
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overflow-view">
                                        <div class="invoice-body">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="text-bold">Descripcion</td>
                                                        <td class="text-bold">Precio</td>
                                                        <td class="text-bold">Cantidad</td>
                                                        <td class="text-bold">Subtotal</td>
                                                    </tr>
                                                </thead>
                                                <tbody id="carrito-proforma">

                                                </tbody>
                                            </table>
                                            <div class="invoice-body-bottom">

                                                <div class="invoice-body-info-item">
                                                    <div class="info-item-td text-end text-bold">Total:</div>
                                                    <div class="info-item-td text-end" id="total-proforma">$00.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div id="proforma_financiamiento" class="hidden">
                                    <h1 class="w-full text-sm font-bold my-8 text-gray-800">Financiamiento</h1>
                                    <div class="flex w-full">
                                        <div class="flex gap-4 text-sm">Monto Inicial: <span class="font-bold" id="inicial_fn_pr"></span></div>
                                    </div>
                                    <div class="flex w-full">
                                        <div class="flex gap-4 text-sm">Numero de cuotas: <span class="font-bold" id="ncuotas_fn_pr"></span></div>
                                    </div>
                                    <div class="flex w-full">
                                        <div class="flex gap-4 text-sm">Monto Cuotas: <span class="font-bold" id="montocuotas_fn_pr"></span></div>
                                    </div>

                                </div>
                                <div class="view-amenidades mt-8 hidden">

                                    <h1 class="w-full text-sm font-bold my-8 text-gray-800">Amenidades del proyecto</h1>

                                    <div id="list-amenidades-proforma" class="w-full grid grid-cols-6 gap-3">

                                    </div>

                                </div>

                            </div>
                            <!-- <div id="text-lotizador" class="py-8">
                                <h1 class="w-full text-sm font-bold my-8 text-gray-800">Plano lotizador</h1>
                            </div> -->
                        </div>
                        <div id="mapacontainer" class="relative w-full">
                            <div id="loading_lotizador" style="z-index: 40000;" class="w-full gap-4 bg-blue-600 flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 h-100" role="status">
                                <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <h1 class="text-sm text-white">Cargando Lotizador...</h1>
                            </div>
                            <h1 class="w-full text-sm font-bold my-8 pb-8 text-gray-800">Plano lotizador</h1>
                            <div id="map1" class="rounded h-[500px]"></div>
                        </div>
                    </div>

                    <div>
                        <button id="generar-proforma-pdf" class="px-4 mt-4 py-3 bg-violet-700 text-white text-sm font-bold">Generar proforma</button>
                    </div>
                </div>
            </div>
            <div id="crear-lead" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Crear Lead</h1>
                    <form id="registerLead">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="mb-6">
                                <label for="nombres" class="block mb-2 text-[12px] font-bold text-gray-900 ">Nombres</label>
                                <input type="text" id="nombre-lead" placeholder="Ingrese el nombre del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="apellidos" class="block mb-2 text-[12px] font-bold text-gray-900 ">Apellidos</label>
                                <input type="text" id="apellido-lead" placeholder="Ingrese los apellidos del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="documento" class="block mb-2 text-[12px] font-bold text-gray-900 ">Documento</label>
                                <input type="text" id="documento-lead" placeholder="Ingrese su nro documento" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-bold text-gray-900 ">Email</label>
                                <input type="email" id="email-lead" placeholder="Ingrese su correo electrónico" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="celular" class="block mb-2 text-[12px] font-bold text-gray-900 ">Celular</label>
                                <input type="text" id="celular-lead" placeholder="Ingrese su celular" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="telefono" class="block mb-2 text-[12px] font-bold text-gray-900 ">Telefono</label>
                                <input type="text" id="telefono-lead" placeholder="Ingrese su telefono" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="pais" class="block mb-2 text-[12px] font-bold text-gray-900 ">Pais</label>
                                <input type="text" id="pais-lead" placeholder="Ingrese el pais del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="origen" class="block mb-2 text-[12px] font-bold text-gray-900 ">Medio Contactado</label>
                                <select class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="origen-lead">
                                    <option value="0">Seleccionar Origen</option>
                                    <option value="Facebook Ads">Facebook Ads</option>
                                    <option value="Marketplace">Marketplace</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Messenger">Messenger</option>
                                    <option value="Tiktok">Tiktok</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Llamada">Llamada</option>
                                    <option value="Prospección">Prospección</option>
                                    <option value="Oficina">Oficina</option>
                                    <option value="otro">otro</option>
                                </select>
                            </div>
                            <div class="mb-6">
                                <label for="campania" class="block mb-2 text-[12px] font-bold text-gray-900 ">Campaña</label>
                                <input type="text" id="campania-lead" placeholder="Ingrese si pertenece a una campaña" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="ciudad" class="block mb-2 text-[12px] font-bold text-gray-900 ">Ciudad</label>
                                <input type="text" id="ciudad-lead" placeholder="Ingrese ciudad" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="proyecto" class="block mb-2 text-[12px] font-bold text-gray-900 ">Proyecto</label>
                                <select type="text" id="proyecto-lead" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
                            </div>
                        </div>
                        <button type="submit" id="registrar_lead_btn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="rendimiento-asesor" class="modal-create md-hidden">
                <div style="width:100%; max-width: 900px !important;" class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>

                    <h1 class="font-bold">Mi rendimiento</h1>
                    <div class="grid gap-3 grid-cols-1 md:grid-cols-4">
                        <div class="w-full relative">
                            <span class="text-sm font-bold mb-2"> -</span>
                            <select id="filter_date_analisis" type="date" class="w-full p-3 bg-white rounded-md text-sm border border-gray-300">
                                <option value="this-month">Este Mes</option>
                                <option value="last-month">Ultimos 30 dias</option>
                                <option value="last-week">Hace 7 dias</option>
                            </select>
                        </div>
                        <div class="w-full relative">
                            <span class="text-sm font-bold mb-2"> Proyectos</span>
                            <select id="proyectos_analisis" type="date" class="w-full p-3 bg-white rounded-md text-sm border border-gray-300">
                                <option value="Todos">Todos</option>
                            </select>
                        </div>
                        <div class="w-full relative">
                            <span class="text-sm font-bold mb-2"> Fecha Inicio</span>
                            <input id="fecha_analisis_start" type="date" class="w-full p-3 bg-white rounded-md text-sm border border-gray-300">
                        </div>
                        <div class="w-full relative">
                            <span class="text-sm font-bold mb-2"> Fecha fin</span>
                            <input id="fecha_analisis_end" type="date" class="w-full p-3 bg-white rounded-md text-sm border border-gray-300">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="flex flex-col gap-3 divide-y">
                            <div class="flex items-center justify-between">
                                <h1 class="text-sm font-bold">VISITAS CONCRETADAS</h1>
                                <span id="visitas_analisis">0</span>
                            </div>
                            <!-- lista de visitas concretadas -->
                            <div class="w-full">
                                <div class="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-x-auto">
                                    <table id="table-visitas-concretadas" class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nombres
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <!-- Agrega más columnas según sea necesario -->
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <!-- Filas de datos -->

                                            <!-- Agrega más filas según sea necesario -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <h1 class="text-sm font-bold">VISITAS NO CONCRETADAS</h1>
                                <span id="no_visitas_analisis">0</span>
                            </div>
                            <!-- lista de visitas no concretadas -->
                            <div class="w-full">
                                <div class="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-x-auto">
                                    <table id="table-visitas-no-concretadas" class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nombres
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <!-- Agrega más columnas según sea necesario -->
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <!-- Filas de datos -->

                                            <!-- Agrega más filas según sea necesario -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <h1 class="text-sm font-bold">SEPARACIONES</h1>
                                <span id="separaciones_analisis">0</span>
                            </div>
                            <!-- lista de separaciones -->
                            <div class="w-full">
                                <div class="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-x-auto">
                                    <table id="table-separaciones" class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nombres
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <!-- Agrega más columnas según sea necesario -->
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <!-- Filas de datos -->

                                            <!-- Agrega más filas según sea necesario -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <h1 class="text-sm font-bold">VENTAS</h1>
                                <span id="ventas_analisis">0</span>
                            </div>

                            <!-- lista de ventas -->
                            <div class="w-full">
                                <div class="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-x-auto">
                                    <table id="table-ventas" class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nombres
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Proyecto
                                                </th>
                                                <!-- Agrega más columnas según sea necesario -->
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <!-- Filas de datos -->

                                            <!-- Agrega más filas según sea necesario -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="resumen-vsv" class="w-full -mt-3" style="height:500px;"></div>

                    </div>
                </div>
            </div>
            <div id="crear-etiqueta" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Crear etiqueta</h1>
                    <form id="registerEtiqueta">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="mb-6">
                                <label for="nombre" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input type="text" id="nombre-etiqueta" placeholder="Escribe un nombre para la etiqueta" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
                    </form>
                    <table id="etiquetasList" class="table cust-datatable dataTable no-footer" style="width:100%;">

                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Acciones</th>
                                <!-- <th>
                                <div style="width: 200px !important">Acciones</div>
                            </th> -->
                            </tr>
                        </thead>
                    </table>
                </div>


                <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                <!-- </form> -->

            </div>
            <div id="ver-etiquetas-clientes" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Mis etiquetas</h1>
                    <div id="list-etiquetas" style="display: flex; flex-direction: row; gap: 15px">
                        <select name="etiquetas[]" multiple="multiple" id="etiquetas-user" style="width: 100%" class="users_proyect" name="state">

                        </select>
                        <button id="update-asigned-etiqueta" class="btn-add">Agregar</button>
                    </div>
                    <div class="main-datatable">
                        <table id="etiquetasClienteList" class="" style="width:100%;">

                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Asignacion</th>
                                    <th>Acciones</th>
                                    <!-- <th>
                                <div style="width: 200px !important">Acciones</div>
                            </th> -->
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>


                <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                <!-- </form> -->

            </div>
            <div id="editar-lead" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Editar Lead</h1>
                    <span class="inline-block tetx-sm font-bold" id="asignedcliente_user"></span>
                    <form id="editLead">
                        <div class="grid grid-cols-2 gap-2 mb-4">
                            <div>
                                <label for="nombres" class="block mb-2 text-[12px] font-medium text-gray-900 ">Nombres</label>
                                <input type="text" id="nombre-lead" placeholder="Ingrese el nombre del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="apellidos" class="block mb-2 text-[12px] font-medium text-gray-900 ">Apellidos</label>
                                <input type="text" id="apellido-lead" placeholder="Ingrese los apellidos del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="documento" class="block mb-2 text-[12px] font-medium text-gray-900 ">Documento</label>
                                <input type="text" id="documento-lead" placeholder="Ingrese su nro documento" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900 ">Email</label>
                                <input type="email" id="email-lead" placeholder="Ingrese su correo electrónico" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="celular" class="block mb-2 text-[12px] font-medium text-gray-900 ">Celular</label>
                                <input type="text" id="celular-lead" placeholder="Ingrese su celular" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="telefono" class="block mb-2 text-[12px] font-medium text-gray-900 ">Telefono</label>
                                <input type="text" id="telefono-lead" placeholder="Ingrese su telefono" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="pais" class="block mb-2 text-[12px] font-medium text-gray-900 ">Pais</label>
                                <input type="text" id="pais-lead" placeholder="Ingrese el pais del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="origen" class="block mb-2 text-[12px] font-medium text-gray-900 ">Medio Contactado</label>
                                <input type="text" id="origen-lead" placeholder="ejm: Facebook, Instagram, Capacitaciones, etc." class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="campania" class="block mb-2 text-[12px] font-medium text-gray-900 ">Campaña</label>
                                <input type="text" id="campania-lead" placeholder="Ingrese si pertenece a una campaña" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="ciudad" class="block mb-2 text-[12px] font-medium text-gray-900 ">Ciudad</label>
                                <input type="text" id="ciudad-lead" placeholder="Ingrese ciudad de origen" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="proyecto" class="block mb-2 text-[12px] font-medium text-gray-900 ">Proyecto</label>
                                <select type="text" id="proyecto-lead" placeholder="Ingrese ciudad de origen" class="bg-gray-100 border border-gray-600 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
                                <label id="detalle_lead_asignado" class="block mt-2 text-xs text-gray-900 dark:text-white"></label>
                            </div>
                        </div>
                        <button type="submit" class="btnJsvm info text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="crear-event" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Registrar Evento</h1>
                    <div class="flex items-center gap-4">
                        <p class="text-[12px]">Estado Cliente:
                            <!-- <div id="status-now"></div> -->
                    </div>
                    <div>
                        <div class="w-full">
                            <div class="flex items-center space-x-4 border-b-2 pb-4 border-dashed">
                                <div class="flex-shrink-0">
                                    <img id="img-now-status" class="w-8 h-8 rounded-full" src="" alt="cliente...">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p id="name-now-status" class="text-[12px] font-medium text-gray-900 truncate ">
                                        Neil Sims
                                    </p>
                                    <p id="contact-now-status" class="text-[12px] text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 ">
                                    <div id="status-now"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form id="registerFormEvento">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900 ">Tipo de Evento</label>
                            <select id="status-evento" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected value="0">Selecciona una opcion</option>
                                <option value="NO RESPONDIO">NO RESPONDIO</option>
                                <option value="VISITA">VISITA</option>
                                <option value="REPROGRAMACION CONTACTO">REPROGRAMACION CONTACTO</option>
                                <option value="REPROGRAMACION VISITA">REPROGRAMACION VISITA</option>
                                <option value="SEPARACION">SEPARACION</option>
                                <option value="VENTA">VENTA</option>
                                <option value="NO INTERESADO">NO INTERESADO</option>
                            </select>

                        </div>
                        <div id="fecha_visita" class="grid gap-4 grid-cols-2 hidden">

                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900">Fecha</label>
                                <input type="date" id="date-visita" rows="4" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></input>

                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900 ">Hora</label>
                                <input type="time" id="time-visita" rows="4" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></input>

                            </div>
                        </div>
                        <div id="sectionlotes" class="grid gap-4 grid-cols-2 hidden">

                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900">Lote</label>
                                <select name="" id="lisLotesCliente" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                </select>
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900 ">Precio Final</label>
                                <input type="number" step="0.01" id="precio_final_lote_cliente" rows="4" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"></input>

                            </div>
                        </div>
                        <div id="addcalendar" class="hidden">
                            <div class="flex items-center mb-4">
                                <input id="registercalendar" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 flex items-center gap-1 dark:text-gray-300">

                                    Agregar a <img src="../../img/googlecalendar.png" alt="" class="w-12 bg-white"> Google Calendar</label>
                            </div>
                        </div>
                        <div class="mb-6">

                            <label for="observaciones" class="block mb-2 text-[12px] font-medium text-gray-900 ">Observaciones</label>
                            <textarea id="observaciones-evento" rows="4" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></textarea>

                        </div>
                        <div class="flex justify-end w-full">

                            <button id="register_event_btn" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btnJsvm info">Registrar</button>
                        </div>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="historial-event" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Historial de Eventos</h1>
                    <div class="flex items-center gap-4">
                        <p class="text-xl">Estado Actual:
                        <div id="status-nowhistorial"></div>
                    </div>

                    <ol id="list-historial" class="relative border-l border-gray-200 dark:border-gray-700">
                    </ol>

                </div>
            </div>
            <div id="send-modal-event" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>

                    <h1 class="font-bold">Enviar message template</h1>

                    <label for="countries" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Mis plantillas</label>
                    <select id="listPlantillas" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Seleccione una plantilla</option>
                    </select>

                    <label for="message" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message-modal-plantilla" rows="4" class="block p-2 w-full text-[12px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>


                    <a target="_blank" class="text-center w-max-content p-2 text-white bg-green-500 rounded-md text-[12px] inline-block" id="link-w-send" href="">Enviar</a>

                </div>
            </div>
            <div style="display: flex; gap:10px; margin-bottom: 20px">
                <div class="relative inline-block text-left">
                    <div>
                        <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-[#310ecd] px-3 py-2 text-[12px] font-semibold shadow-sm text-white" id="menu-button" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="people-sharp"></ion-icon>

                            Leads
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div id="expand_file" class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <li id="modal-lead" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-[12px]" role="menuitem" tabindex="-1" id="menu-item-0"><ion-icon name="add-outline"></ion-icon> Agregar Lead</li>
                            <a href="./importar.php" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-[12px]" role="menuitem" tabindex="-1" id="menu-item-0"> <ion-icon name="cloud-upload-outline"></ion-icon> Importar</a>

                        </div>
                    </div>
                </div>
                <div class="relative inline-block text-left">
                    <div>
                        <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-[#310ecd] px-3 py-2 text-[12px] font-semibold shadow-sm text-white" id="menu-button-etiqueta" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="pricetags"></ion-icon>

                            Etiquetas
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div id="expand-etiqueta" class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <li id="modal-etiqueta" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-[12px]" role="menuitem" tabindex="-1" id="menu-item-0"><ion-icon name="add-outline"></ion-icon> Crear etiqueta</li>

                        </div>
                    </div>
                </div>
                <div class="relative inline-block text-left">
                    <div>
                        <a href="../msj-plantilla/" type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-[#310ecd] px-3 py-2 text-[12px] font-semibold shadow-sm text-white" id="menu-button-etiqueta" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="mail"></ion-icon>
                            Template MSJ
                        </a>
                    </div>
                </div>
                <div class="relative inline-block text-left">
                    <div>
                        <a href="../papelera/" type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[12px] font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white text-red-600" id="menu-button-etiqueta" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="trash"></ion-icon>
                            Ver Archivados
                        </a>
                    </div>
                </div>
                <div>
                    <button type="button" class="flex max-w-max items-center justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-[12px] font-semibold shadow-sm ring-1 ring-inset ring-gray-300 bg-green-600 hover:bg-blue-900 text-[12px]" id="export_leads" aria-expanded="false" aria-haspopup="true">

                        <img style="width: 16px;" src="../../img/archivo-excel.png" alt="">

                        <p class="text-[12px] text-nowrap">Exportar</p>

                    </button>
                </div>

                <!-- <input type="color" value="#5b5b5b"> -->
            </div>
            <div>
                <!-- <p class="text-[12px] text-black">Filtro Avanzado:</p> -->
            </div>
            <div class="main-datatable px-10 py-10 rounded bg-white">
                <!-- <form> -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="default-search" class="mb-2 text-[12px] font-medium text-gray-900 font-bold">Nombre</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="cliente-search" class="block w-full p-2 pl-10 text-[12px] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre de cliente">
                        </div>
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-[12px] font-medium text-gray-900 font-bold">Proyectos</label>
                        <select id="filter-proyecto" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="Todos">Todos</option>
                        </select>
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-[12px] font-medium text-gray-900 font-bold">Etiquetas</label>
                        <select id="filter-etiqueta" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Todos" selected>Todos</option>
                        </select>
                    </div>

                    <div class="relative inline-block">
                        <div class="flex gap-4 w-full overflow-x-auto">
                            <div>

                                <label for="pendientes-search" class="mb-2 text-[12px] font-medium text-gray-900 font-bold"></label> <br>
                                <div class="flex items-center gap-4">

                                    <button type="button" class="flex max-w-max items-center justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-[12px] font-semibold shadow-sm bg-[#310ecd] text-[12px]" id="meusers-filtros" aria-expanded="false" aria-haspopup="true">

                                        <img style="width: 16px;" src="../../img/corona.png" alt="">

                                        <p class="text-[12px] text-nowrap">Mis leads</p>

                                    </button>
                                    <button type="button" class="flex max-w-max items-center justify-center gap-x-1.5 rounded-md text-gray-700 px-3 py-2 font-semibold shadow-sm bg-gray-300 text-[12px]" id="asignedusers-filtros" aria-expanded="false" aria-haspopup="true">

                                        <img style="width: 16px;" src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-users-up-upload-user-arrow-picture-image_7996791.png" alt="">

                                        <p class="text-[12px] text-nowrap">Asignados</p>

                                    </button>

                                </div>
                            </div>

                            <div>

                                <label for="pendientes-search" class="mb-2 text-[12px] font-medium text-gray-900  dark:text-white"></label> <br>
                                <button type="button" class="flex max-w-max items-center justify-center gap-x-1.5 rounded-md text-black px-3 py-2 text-[12px] font-semibold shadow-sm bg-yellow-500" id="reset_filtros" aria-expanded="false" aria-haspopup="true">

                                    <ion-icon name="refresh"></ion-icon>


                                    <p class="text-[12px] text-nowrap">Resetear</p>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <p class="mt-4 text-[12px] text-black">Filtro de Ultimos Estados:</p> -->

                <!-- <form> -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                    <div class="h-auto">
                        <label class="text-[12px] font-medium" for="Fecha Inicio">Rango Fecha (creacion) </label>
                        <input type="date" id="fecha-inicio-status" class="block w-full p-2 text-[12px] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                    </div>
                    <div class="h-auto">
                        <label for="pendientes-search" class="mb-2 text-[12px] font-medium text-gray-900  dark:text-white">-</label>
                        <input disabled type="date" id="fecha-fin-status" class="block w-full p-2 text-[12px] text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-[12px] font-medium text-gray-900  dark:text-white">Status(último)</label>
                        <select id="filter-status" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Todas" selected>Todas</option>
                            <option value="VISITA">VISITA</option>
                            <option value="CONTACTADO">CONTACTADO</option>
                            <option value="NO CONTACTADO">NO CONTACTADO</option>
                            <option value="ASISTIO">ASISTIO</option>
                            <option value="NO ASISTIO">NO ASISTIO</option>
                            <option value="NO INTERESADO">NO INTERESADO</option>
                            <option value="NO RESPONDIO">NO RESPONDIO</option>
                            <option value="SEPARACION">SEPARACION</option>
                            <option value="VENTA">VENTA</option>
                            <option value="REPROGRAMACION CONTACTO">REPROGRAMACION CONTACTO</option>
                            <option value="REPROGRAMACION VISITA">REPROGRAMACION VISITA</option>
                        </select>
                    </div>

                    <div class="relative inline-block text-left">

                        <label for="pendientes-search" class="mb-2 text-[12px] font-medium text-gray-900  dark:text-white">Pendientes</label>
                        <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-red-600 text-white px-3 py-2 text-[12px] font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700" id="menu-pendientes" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="warning"></ion-icon>

                            Pendientes: 0

                        </button>

                    </div>
                </div>
                <div class="bg-gray-300 h-[2px] w-full my-3"></div>

                <table id="usuariosList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                    <thead>
                        <tr>
                            <!-- <th>
                                <div style="width: 50px !important">Nombres</div>
                            </th> -->
                            <!-- <th colspan="6" style="text-align: center">Apellidos</th> -->
                            <!-- <th>Nombres</th> -->
                            <!-- <th>
                                <div style="width: 50px !important">Apellidos</div>
                            </th> -->
                            <th>Fecha Hora Creacion</th>
                            <th>Nombres</th>
                            <th>Documento</th>
                            <!-- <th>Apellidos</th> -->
                            <th>Proyecto</th>
                            <th>Etiquetas</th>
                            <!-- <th>Correo</th> -->
                            <th>Celular</th>
                            <!-- <th>Telefono</th>
                            <th>Origen</th>
                            <th>Ciudad</th> -->
                            <th>Estado</th>
                            <th>Message</th>
                            <th>Acciones</th>
                            <!-- <th>
                                <div style="width: 200px !important">Acciones</div>
                            </th> -->
                        </tr>
                    </thead>
                </table>
                <div id="spin-load">
                    <div role="status" class="flex items-center justify-center" style="height: 200px;">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <!-- </div> -->
            </div>
        </div>
        </div>
        <script>
            // Obtiene el botón y el menú desplegable
            var button = document.getElementById('menu-button');
            var menu = document.getElementById('expand_file');

            // Agrega un evento de clic al botón para mostrar/ocultar el menú desplegable
            menu.addEventListener('click', function() {
                var expanded = button.getAttribute('aria-expanded') === 'true' || false;
                button.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu.style.transformOrigin = 'left top';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu.style.transform = 'scale(1)';
                        menu.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu.style.transformOrigin = 'left top';
                    menu.style.opacity = '1';
                    menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.classList.add('hidden');
                    }, 300);
                }
            });
            button.addEventListener('click', function() {
                var expanded = button.getAttribute('aria-expanded') === 'true' || false;
                button.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu.style.transformOrigin = 'left top';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu.style.transform = 'scale(1)';
                        menu.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu.style.transformOrigin = 'left top';
                    menu.style.opacity = '1';
                    menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.classList.add('hidden');
                    }, 300);
                }
            });
            // Obtiene el botón y el menú desplegable etiqueta
            var button_etiqueta = document.getElementById('menu-button-etiqueta');
            var menu_etiqueta = document.getElementById('expand-etiqueta');

            // Agrega un evento de clic al botón para mostrar/ocultar el menú desplegable
            menu_etiqueta.addEventListener('click', function() {
                var expanded = button_etiqueta.getAttribute('aria-expanded') === 'true' || false;
                button_etiqueta.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu_etiqueta.style.transform = 'scale(1)';
                        menu_etiqueta.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.opacity = '1';
                    menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.classList.add('hidden');
                    }, 300);
                }
            });
            button_etiqueta.addEventListener('click', function() {
                var expanded = button_etiqueta.getAttribute('aria-expanded') === 'true' || false;
                button_etiqueta.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu_etiqueta.style.transform = 'scale(1)';
                        menu_etiqueta.style.opacity = '1';
                    }, 0);
                    menu_etiqueta.classList.remove('hidden');
                } else {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.opacity = '1';
                    menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.classList.add('hidden');
                    }, 300);
                }
            });
        </script>

    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../js/dinamic/toastmith.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    <!-- leafletjs -->

    <script src="https://unpkg.com/leaflet-snap"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
    <!-- Asegúrate de incluir la biblioteca SheetJS -->
    <!-- use version 0.20.1 -->
    <script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>

    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Adding the html2pdf.js library -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script>
    <script src="../../js/dinamic/html2canvas.js"></script>
    <script src="../../js/dinamic/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js" integrity="sha512-YcsIPGdhPK4P/uRW6/sruonlYj+Q7UHWeKfTAkBW+g83NKM+jMJFJ4iAPfSnVp7BKD4dKMHmVSvICUbE/V1sSw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../../js/dinamic/addcalendar.js"></script>
    <script src="../../js/dinamic/gestion-clientes-as.js"></script>
    <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
    <script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>


    </html>
<?php } ?>