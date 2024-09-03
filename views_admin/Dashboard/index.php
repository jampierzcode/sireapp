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
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>

        <div class="container-dashboard h-screen">
            <!-- <span class="route">
                > Home
            </span> -->
            <div class="w-full flex justify-end">

            </div>
            <!-- <span class="route mb-6">
                Resumen de actividades
            </span>
            <div style="margin: 0px !important;" class="grid gap-4 grid-cols-1 md:grid-cols-5">
                <div class="flex bg-white shadow-md justify-between px-4 py-3 items-center w-full">
                    <div class=" rounded">
                        <h1 class="text-sm text-gray-500">VISITAS CONCRETADAS</h1>
                        <span class="text-[#5208dd] font-bold text-3xl" id="data-proyectos">0</span>
                    </div>
                    <ion-icon name="home-outline" class="text-3xl font-bold text-[#5208dd]"></ion-icon>
                </div>
                <div class="flex bg-white shadow-md justify-between px-4 py-3 items-center w-full">
                    <div class=" rounded">
                        <h1 class="text-sm text-gray-500">SEPARACIONES</h1>
                        <span class="text-[#5208dd] font-bold text-3xl" id="data-proyectos">0</span>
                    </div>
                    <ion-icon name="golf-outline" class="text-3xl font-bold text-[#5208dd]"></ion-icon>
                </div>
                <div class="flex bg-white shadow-md justify-between px-4 py-3 items-center w-full">
                    <div class=" rounded">
                        <h1 class="text-sm text-gray-500">VENTAS</h1>
                        <span class="text-[#5208dd] font-bold text-3xl" id="data-proyectos">0</span>
                    </div>
                    <ion-icon name="pricetag-outline" class="text-3xl font-bold text-[#5208dd]"></ion-icon>
                </div>

                <div class="flex bg-white shadow-md justify-between px-4 py-3 items-center w-full">
                    <div class=" rounded">
                        <h1 class="text-sm text-gray-500">Clientes</h1>
                        <span class="text-[#5208dd] font-bold text-3xl" id="data-asesores">0</span>
                    </div>
                    <ion-icon name="people-outline" class="text-3xl font-bold text-[#5208dd]"></ion-icon>
                </div>
            </div> -->
            <!-- <span class="route mt-6">
                Trabajo de asesores
            </span> -->

            <div class="grid gap-4 w-full">

                <div class="md:z-[1000] top-0 md:sticky md:top-[-40px] bg-[#f5f7fb]">
                    <div class="relativew-full md:w-full flex items-center">
                        <!-- <div class="flex items-center max-w-max justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Filtros avanzados</h5>
                            <div class="icon-filter ease-in duration-300 px-4 cursor-pointer">
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </div>
                        </div> -->
                        <div id="menu-filtros-box" class="ease-in duration-300 w-full top-[105%] left-0 right-0 bg-white shadow-md p-4">
                            <div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-6 gap-4">
                                <div class="w-full">
                                    <label class="text-sm" for="Sedes">Sedes</label>
                                    <select id="filter-sede" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-6 gap-4">
                                <div class="mb-4 h-max relative ">

                                    <label class="text-sm" for="Proyectos">Proyectos</label>
                                    <div id="proyecto-active" class="flex items-center cursor-pointer shadow-md max-w-max px-4 py-3 bg-[#e9e4ff] rounded-full">
                                        <img src="" alt="">
                                        <p id="span-proyecto" key_proyecto="Todos" class="text-sm font-bold text-[#5208dd] whitespace-nowrap overflow-hidden overflow-ellipsis">Todos Los proyectos</p>
                                        <div class="icon-proyecto-down duration-300 flex items-center px-3 cursor-pointer text-[#5208dd]"><ion-icon name="chevron-down-outline"></ion-icon></div>
                                    </div>
                                    <ul class="z-[20000] invisible animation-[invisible] duration-100 absolute mt-3 shadow-md bg-white py-3 px-3 rounded top-full lef-0 right-0 flex flex-col gap-2" id="list-proyectos">

                                    </ul>
                                </div>
                                <div class="h-auto flex items-center">
                                    <select id="filter_static" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option class="py-3 px-2" value="0">Seleccione un filtro</option>
                                        <option class="py-3 px-2" value="last-month">Ultimos 30 dias</option>
                                        <option class="py-3 px-2" value="last-week">Hace 7 dias</option>
                                    </select>
                                </div>
                                <div class="h-auto">
                                    <label class="text-sm" for="Fecha Inicio">Fecha Inicio</label>
                                    <input type="date" id="fecha-inicio-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                </div>
                                <div class="h-auto">
                                    <label class="text-sm" for="Fecha Inicio">Fecha Termino</label>
                                    <input type="date" id="fecha-fin-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                </div>
                                <div class="h-auto">

                                    <label class="text-sm" for="Fecha Inicio">Asesor</label>


                                    <div class="relative mb-6">
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ion-icon id="icon-drop-asesor" name="chevron-down"></ion-icon>

                                        </div>
                                        <div id="asesor-search" keyAsesor="Todos" class="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <span>Comparar Todos</span>

                                        </div>

                                        <div id="listUsuarios" style="top: calc(100% + 5px)" class="hidden cursor-pointer absolute w-full max-w-md bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                                            <div class="relative">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input id="search-asesor-input" type="search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                            </div>
                                            <div class="flow-root">
                                                <ul id="listAsesores" role="list" class="max-h-[200px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                                                    <li class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
                                                        <div class="flex items-center space-x-4">
                                                            <div class="flex-shrink-0">
                                                                <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                                                            </div>
                                                            <div class="flex-1 min-w-0">
                                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    Nombres
                                                                </p>
                                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                    Apellidos
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button id="search_date_visitas" type="button" class="text-white bg-[#310ecd] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Buscar</button>
                                    <button id="refresh_date_visitas" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Reset</button>

                                </div>
                            </div>
                            <span class="text-xs">El filtro funciona de acuerdo a un rango de fechas (con/sin) asesor</span>
                        </div>
                    </div>
                </div>
                <span class="text-xl font-bold text-gray-800 mt-6">
                    Estadisticas CRM
                </span>

                <!-- <div class="overflow-hidden flex flex-wrap md:flex-nowrap gap-4">
                    <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Cuadro de Eficiencia</h5>

                        </div>
                        <div class="flex gap-4 overflow-x-auto w-full mb-4" id="allAsesoresResumen"></div>

                        <div id="estadistics-box" class="flow-root overflow-x-auto">

                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS CONCRETADAS
                                            </p>


                                        </div>
                                        <div id="resumen-visitas" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>


                                        </div>
                                        <div id="resumen-separaciones" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>


                                        </div>
                                        <div id="resumen-ventas" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="overflow-hidden flex flex-wrap md:flex-nowrap gap-4">
                    <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Reporte</h5>
                        </div>
                        <div class="w-full max-w-[500px]">
                            <div class="flex gap-4 flex-start mb-4">
                                <p>Proyecto</p>
                                <div class="p-2 bg-[#310ecd] text-white font-bold text-sm rounded-full">Buenos aires</div>
                            </div>
                            <div class="flex flex-col items-center justify-center mb-4">

                                <img class="rounded-full" src="../../img/avatar_default.jpg" alt="">
                                <p>Nombre del asesor</p>
                            </div>
                            <div id="fechas" class=" flex gap-2 justify-center">
                                Del
                                <div class="flex">
                                    <b>10 Junio del 2024</b>
                                </div>
                                al
                                <div class="flex">
                                    <b>10 Junio del 2024</b>
                                </div>
                            </div>
                            <div class="h-[2px] bg-gray-100"></div>
                            <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Analisis por leads subidos</h1>
                            <div id="containerTotalLeads" class="w-full my-4">
                            </div>
                            <div id="leadGrafico" style="height:400px;"></div>
                            <div id="resultadosLeads"></div>

                            <div class="h-[2px] bg-gray-100"></div>
                            <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Analisis de eventos totales</h1>

                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                CONTACTAR
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                NO RESPONDIO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                NO INTERESADO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>

                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS NO CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="flex gap-4 overflow-x-auto w-full mb-4" id="allAsesoresResumesn"></div>

                    </div>
                </div> -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div class="col-span-2 overflow-hidden flex flex-wrap md:flex-nowrap gap-4">
                        <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                            <div class="w-full">

                                <div class="h-[2px] bg-gray-100"></div>
                                <!-- Contenedor del gráfico -->
                                <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Analisis por leads subidos</h1>
                                <div class="flex gap-5 my-4">

                                    <div class="flex flex-col items-center justify-center mb-4">

                                        <img class="rounded-full w-16 h-16 object-cover" src="../../img/avatar_default.jpg" alt="">
                                        <p class="text-sm font-bold text-gray-800">Nombre del asesor</p>
                                    </div>
                                    <div class="flex flex-col items-center justify-center mb-4">

                                        <img class="rounded-full w-16 h-16 object-cover" src="../../img/avatar_default.jpg" alt="">
                                        <p class="text-sm font-bold text-gray-800">Nombre del asesor</p>
                                    </div>
                                </div>
                                <div id="containerTotalLeads" class="w-full my-4">
                                </div>
                                <div id="leadGrafico" style="height:400px;"></div>
                                <div id="resultadosLeads"></div>

                                <div class="h-[2px] bg-gray-100"></div>

                            </div>
                            <div class="flex gap-4 overflow-x-auto w-full mb-4" id="allAsesoresResumesn"></div>

                        </div>
                    </div>
                    <div class="overflow-hidden flex flex-wrap md:flex-nowrap gap-4 h-max">
                        <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Analisis de eventos totales</h1>
                            <div class="flex gap-5 my-4">

                                <div class="flex flex-col items-center justify-center mb-4">

                                    <img class="rounded-full w-16 h-16 object-cover" src="../../img/avatar_default.jpg" alt="">
                                    <p class="text-sm font-bold text-gray-800">Nombre del asesor</p>
                                </div>
                                <div class="flex flex-col items-center justify-center mb-4">

                                    <img class="rounded-full w-16 h-16 object-cover" src="../../img/avatar_default.jpg" alt="">
                                    <p class="text-sm font-bold text-gray-800">Nombre del asesor</p>
                                </div>
                            </div>
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-black text-white inline-block w-max">
                                                CONTACTAR
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-yellow-400 text-white inline-block w-max">
                                                NO RESPONDIO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-orange-600 text-white inline-block w-max">
                                                NO INTERESADO
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>

                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-green-600 text-white inline-block w-max">
                                                VISITAS NO CONCRETADAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-green-800 text-white inline-block w-max">
                                                SEPARACIONES
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white p-2 rounded-full bg-[#310ecd] text-white inline-block w-max">
                                                VENTAS
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            ${0}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-2 overflow-hidden flex flex-wrap md:flex-nowrap gap-4">

                        <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h1 class="text-lg font-bold my-4 w-full text-center bg-gray-800 text-white">Total leads Asignados</h1>
                            <div class="flex items-center justify-between mb-4">

                            </div>

                            <div class="w-full p-3 border-gray-200 border-2">
                                <h5 class="mb-8 text-lg font-bold leading-none text-gray-900 dark:text-white">Leads Asignados</h5>

                                <div id="leads-no-subidos" class="w-full border-gray-200 rounded border-1" style="height:400px;"></div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="overflow-hidden flex flex-wrap md:flex-nowrap gap-4">
                    <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">

                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4" id="allAsesoresResumen">
                            <div class="w-full p-3 border-gray-200 border-2">
                                <h5 class="mb-8 text-lg font-bold leading-none text-gray-900 dark:text-white">Leads Subidos</h5>

                                <div id="leads-subidos" class="w-full border-gray-200 rounded border-1" style="height:400px;"></div>
                            </div>
                            <div class="w-full p-3 border-gray-200 border-2">
                                <h5 class="mb-8 text-lg font-bold leading-none text-gray-900 dark:text-white">Leads Asignados</h5>

                                <div id="leads-no-subidos" class="w-full border-gray-200 rounded border-1" style="height:400px;"></div>
                            </div>
                        </div>

                    </div>
                </div>


                <!-- <div class="w-full md:w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">


                </div> -->

                <span class="text-xl font-bold text-gray-800 mt-6">
                    Estadisticas Lotizador
                </span>
                <div class="flex gap-4">
                    <div class="w-full md:w-1/3 max-w-md p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                        <canvas id="visitas" width="150"></canvas>
                    </div>
                    <div class="w-full md:w-2/3 max-w-md p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                        <canvas id="circleVisitas" width="150"></canvas>
                    </div>
                </div>





                <!-- <div class="grid-2-column gap-10">

                <div class="listAgentes">

                </div>
                <div class="dayAgentes">

                </div>
            </div> -->
            </div>

        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- <script src="../../js/dinamic/gestion_contabilidad.js"></script> -->
    <script src="../../js/dinamic/graficos-admin.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion_filtros.js"></script>

    </html>
<?php } ?>