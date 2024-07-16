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
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/habitaciones.css">
        <link rel="stylesheet" href="../../css/productos.css">
        <link rel="stylesheet" href="../../css/card-user.css">
        <link rel="stylesheet" href="../../css/sortablelist.css">
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
            <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
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
            <div class="ml-3 text-sm font-normal">Debe seleccionar el tipo</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>

        <div class="container-dashboard">
            <span class="route">
                > Home > Target User
            </span>
            <div id="generar-link" class="modal-create md-hidden">
                <div class="form-create" style="max-width: 500px !important; width: 100%">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Generar link</h1>
                    <div class="grid">
                        <div class="group">
                            <label for="numerp">Numero de celular</label>
                            <input id="numero_link" class="px-3 py-2 rounded bg-gray-200 w-full" type="text" placeholder="Ingresa tu numero aqui ejm: +51999999999">
                        </div>
                        <div class="group">
                            <label for="numerp">Ingresa tu mensaje</label>
                            <textarea name="mensaje" id="mensaje_link" class="px-3 py-2 rounded bg-gray-200 w-full" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button id="generar-link-btn" class="px-4 flex items-center gap-2 rounded py-3 bg-violet-700 text-white text-sm font-bold"><ion-icon name="link-outline"></ion-icon> Generar link</button>
                        <button id="cancelar-link-btn" class="border-2 border-gray-900 px-4 flex items-center gap-2 rounded py-3 bg-white text-gray-800 text-sm font-bold">Cancelar</button>
                    </div>
                </div>
            </div>
            <div class="w-full">

                <div class="flex flex-wrap md:flex-nowrap">
                    <div class="w-full md:w-[200px] flex flex-wrap md:flex-nowrap bg-white border-r-[2px] border-gray-100">
                        <div class="p-3">
                            <ul class="flex md:flex-col gap-1">
                                <li class="w-full">
                                    <a class="page-target actived w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="../target_user/">
                                        <ion-icon name="apps-outline"></ion-icon>
                                        Contenido
                                    </a>
                                </li>
                                <li class="w-full">
                                    <a class="page-target w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="about.php">
                                        <ion-icon name="person-outline"></ion-icon>
                                        Sobre mi
                                    </a>
                                </li>
                                <li class="w-full">
                                    <a class="page-target w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="share.php">
                                        <ion-icon name="share-social"></ion-icon>
                                        Compartir
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-r-[2px] border-gray-100 grow w-full bg-white p-6 md:w-[500px] shadow-md space-y-4">

                        <!-- links -->
                        <h1 class="text-sm text-black font-bold">redes sociales</h1>


                        <ul id="redesSociales" class="sortable-list">

                        </ul>
                        <div class="flex items-center gap-4 justify-end">
                            <button disable="true" id="cancelar_submit" class="rounded-full text-[12px] px-5 py-2 border-gray-300 border-solid border-2 text-gray-300 bg-white ">Cancelar</button>
                            <button disable="true" id="send_submit" class="rounded-full text-[12px] px-5 py-2 text-gray-500 bg-gray-300 ">Actualizar</button>
                        </div>
                    </div>
                    <div class="grow w-full bg-white p-6 justify-center flex md:max-w-[400px] shadow-md">
                        <div class="card-movil">
                            <div class="absolute top-0">
                                <svg width="145" height="20" fill="none" viewBox="0 0 145 20">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M144.516 0H0C2.49419 0 4.51613 2.02194 4.51613 4.51613C4.17977 13.0429 10.8623 19.8833 19.5482 20L20 20H124.516L124.962 20C133.526 19.8833 140.211 13.0429 140 4.51613C140 2.02194 142.022 0 144.516 0Z" fill="#E0E0E0"></path>
                                </svg>
                            </div>
                            <div class="w-full flex justify-between pt-[8px] pr-[3px] pb-[14px] pl-[14px] rounded-[25px]" style="background-color: rgb(255, 255, 255); display: flex;">
                                <div class="text-[10px] w-[36px]">6:25</div>
                                <div class="flex items-center">
                                    <svg width="16" height="9" fill="none" viewBox="0 0 12 9">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9742 0.966309H10.2968C9.92273 0.966309 9.61948 1.26956 9.61948 1.64365V7.51393C9.61948 7.88801 9.92273 8.19127 10.2968 8.19127H10.9742C11.3482 8.19127 11.6515 7.88801 11.6515 7.51393V1.64365C11.6515 1.26956 11.3482 0.966309 10.9742 0.966309ZM7.13634 2.54688H7.81368C8.18776 2.54688 8.49102 2.85013 8.49102 3.22422V7.51404C8.49102 7.88812 8.18776 8.19138 7.81368 8.19138H7.13634C6.76225 8.19138 6.459 7.88812 6.459 7.51404V3.22422C6.459 2.85013 6.76225 2.54688 7.13634 2.54688ZM4.65188 4.12712H3.97454C3.60045 4.12712 3.2972 4.43037 3.2972 4.80446V7.51382C3.2972 7.8879 3.60045 8.19116 3.97454 8.19116H4.65188C5.02596 8.19116 5.32922 7.8879 5.32922 7.51382V4.80446C5.32922 4.43037 5.02596 4.12712 4.65188 4.12712ZM1.4914 5.4818H0.814059C0.439974 5.4818 0.136719 5.78505 0.136719 6.15914V7.51382C0.136719 7.8879 0.439974 8.19116 0.814059 8.19116H1.4914C1.86548 8.19116 2.16874 7.8879 2.16874 7.51382V6.15914C2.16874 5.78505 1.86548 5.4818 1.4914 5.4818Z" fill="black"></path>
                                    </svg><svg width="11" height="8" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23227 2.28614C6.73917 2.2862 8.18845 2.86473 9.28056 3.90214C9.3628 3.98223 9.49425 3.98122 9.57525 3.89987L10.3614 3.10716C10.4024 3.0659 10.4253 3.01001 10.4249 2.95186C10.4246 2.89372 10.4011 2.8381 10.3596 2.79732C7.49312 0.0525852 2.97098 0.0525852 0.104532 2.79732C0.0630094 2.83807 0.0394501 2.89367 0.0390672 2.95182C0.0386844 3.00997 0.0615095 3.06587 0.102492 3.10716L0.888847 3.89987C0.969791 3.98134 1.10134 3.98235 1.18353 3.90214C2.27578 2.86466 3.72523 2.28613 5.23227 2.28614ZM5.23206 4.86522C6.06 4.86516 6.8584 5.17265 7.47212 5.72791C7.55512 5.80672 7.68588 5.80501 7.7668 5.72406L8.55202 4.93135C8.59338 4.88977 8.61632 4.83336 8.61572 4.77475C8.61513 4.71614 8.59104 4.66021 8.54885 4.61948C6.67996 2.8825 3.78574 2.8825 1.91685 4.61948C1.87464 4.66021 1.85055 4.71616 1.85 4.7748C1.84945 4.83343 1.87247 4.88983 1.91391 4.93135L2.6989 5.72406C2.77982 5.80501 2.91058 5.80672 2.99359 5.72791C3.6069 5.17301 4.40466 4.86556 5.23206 4.86522ZM6.80446 6.60047C6.80566 6.65925 6.78254 6.71592 6.74054 6.7571L5.38227 8.12668C5.34246 8.16693 5.28817 8.18958 5.23153 8.18958C5.17489 8.18958 5.1206 8.16693 5.08079 8.12668L3.72229 6.7571C3.68032 6.71589 3.65724 6.6592 3.65848 6.60043C3.65973 6.54165 3.68519 6.48599 3.72886 6.44659C4.59631 5.71352 5.86675 5.71352 6.7342 6.44659C6.77784 6.48602 6.80326 6.5417 6.80446 6.60047Z" fill="black"></path>
                                    </svg><svg width="17" height="8" fill="none">
                                        <rect opacity="0.35" x="1.15117" y="1.07939" width="14.2241" height="6.99918" rx="1.46757" stroke="black" stroke-width="0.67734"></rect>
                                        <path opacity="0.4" d="M16.3906 3.22412V5.93348C16.9357 5.70401 17.2902 5.17021 17.2902 4.5788C17.2902 3.98739 16.9357 3.45359 16.3906 3.22412Z" fill="black"></path>
                                        <rect x="2.16797" y="2.09521" width="12.1921" height="4.96716" rx="0.90312" fill="black"></rect>
                                    </svg>
                                </div>

                            </div>
                            <div data-testid="scrollabel-container" class="jss791 overflow-auto w-[247px] flex flex-col rounded-b-[25px] grow items-center " style="background-color: rgb(255, 255, 255); overflow: auto;">
                                <div class="w-full relative rounded-[18px] bg-cover h-[118px]">
                                    <img id="preview_cover_photo" class="bg-gray-400 h-[95px] top-0 left-0 w-full relative" alt="banner" src="https://static.thenounproject.com/png/5647816-200.png" style="object-fit: cover;">
                                    <div class="left-1/2 translate-x-[-50%] absolute bottom-[-35px] rounded-full border-[6px] border-[#fff]">
                                        <img class="bg-gray-400" data-testid="company-logo" alt="logo" src="https://static.thenounproject.com/png/5647816-200.png" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; position: absolute; bottom: 0px; right: 0px; z-index: 5; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;">
                                        <div class="jss104" style="width: 87px; height: 87px;">
                                            <img id="preview_perfil_photo" class="bg-gray-400 cursor-default target-element" data-testid="img" src="https://static.thenounproject.com/png/5647816-200.png" style="width: 87px; height: 87px; border-radius: 50%; object-fit: cover; position: absolute; top: 0px; left: 0px; z-index: 2;">
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-[43px] w-[75%] flex min-w-[121px] items-center flex-col">
                                    <div data-testid="name" class="text-[13px]" style="min-height: 23px;"><span id="preview_nameuser">Jampier Vasquez</span></div>
                                    <div data-testid="business-job-company" class="text-[8px]" id="preview_job">Ing. en Informática y Sistemas at Quiky</div>
                                    <div class="jss798"></div>
                                    <div data-testid="location" class="jss796 jss798" style="padding: 0px;"></div>
                                    <div class="jss799">
                                        <div class="text-[8px] text-center font-medium" data-testid="bio" style="width: 100%; word-break: break-word; min-height: 27px; padding-top: 10px;" id="preview_custom">Soy un profesional de la informacion, actualmente trabajo con todos los asociados... <br></div>
                                    </div>
                                </div>
                                <div data-testid="button" class="w-full pt-[20px] pb-[20px] flex justify-center" style="background: linear-gradient(rgba(255, 255, 255, 0) 15%, rgb(255, 255, 255) 100%) rgb(255, 255, 255);">
                                    <div data-testid="button-text-cont" class="rounded-[48px] text-[10px] text-white flex items-center justify-center w-[170px] h-[38px] font-bold" color="primary" variant="contained" style="background-color: rgb(0, 0, 0);">Guardar Contacto</div>
                                </div>
                                <div class="px-3" style="background-color: rgb(255, 255, 255); flex-grow: 1;">
                                    <div id="links-container" class="flex justify-center gap-2 flex-wrap" style="background-color: rgb(255, 255, 255);">
                                        cargando...

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- </div> -->
        </div>
        </div>

    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>




    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <!-- <script src="../../js/dinamic/gestion-clientes-as.js"></script> -->
    <!-- <script src="../../js/dinamic/emojiapp.js"></script> -->
    <script src="../../js/dinamic/gestion-target.js" defer></script>

    </html>
<?php } ?>