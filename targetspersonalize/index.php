<?php ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/navdashboard.css">
    <link rel="stylesheet" href="../css/container-dashboard.css">
    <link rel="stylesheet" href="../css/habitaciones.css">
    <link rel="stylesheet" href="../css/productos.css">
    <link rel="stylesheet" href="../css/card-user.css">
    <link rel="stylesheet" href="../css/sortablelist.css">
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
    <title>...</title>
    <link rel="icon" type="image/png" href="favicon.png" id="favicon">
    <meta name="description" content="Descripción por defecto">
    <meta property="og:title" content="Título OG por defecto">
    <meta property="og:description" content="Descripción OG por defecto">
    <meta property="og:image" content="URL_de_la_imagen_por_defecto">
</head>

<body>
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

    <div class="w-full h-[100vh] flex items-center justify-center px-0 md:px-12 py-10 overflow-hidden">
        <div class="w-full max-w-[600px] mx-auto h-[100%]">

            <div class="flex items-center flex-wrap md:flex-nowrap h-[100%]">

                <div class="grow w-full bg-white justify-center flex h-[100%]">
                    <div class="h-full shadow-md relative flex rounded-lg overflow-hidden w-full">
                        <div data-testid="scrollabel-container" class="jss791 overflow-auto w-full flex flex-col grow items-center " style="background-color: rgb(255, 255, 255); overflow: auto;">

                            <div class="w-full relative rounded-[18px] bg-cover h-[200px]">
                                <img id="preview_cover_photo" class="bg-gray-400 h-full top-0 left-0 w-full relative" alt="banner" src="" style="object-fit: cover;">
                                <div class="left-1/2 translate-x-[-50%] absolute bottom-[-50px] rounded-full border-[6px] border-[#fff]">
                                    <img id="photo_proyect" class="bg-gray-400" data-testid="company-logo" alt="logo" src="" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; position: absolute; bottom: 0px; right: 0px; z-index: 5; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;">
                                    <div class="jss104" style="width: 87px; height: 87px;">
                                        <img id="preview_perfil_photo" class="bg-gray-400 cursor-default target-element" data-testid="img" src="" style="width: 87px; height: 87px; border-radius: 50%; object-fit: cover; position: absolute; top: 0px; left: 0px; z-index: 2;">
                                    </div>
                                </div>
                            </div>
                            <div class="pt-[43px] w-[75%] flex min-w-[121px] items-center flex-col">
                                <div data-testid="name" class="lg:text-[17px] mt-3 font-medium text-[13px]" style="min-height: 23px;"><span id="preview_nameuser">...</span></div>
                                <div data-testid="business-job-company" class="lg:text-[12px] text-center text-[8px]" id="preview_job">...</div>
                                <!-- <div class="jss798" id="preview_description">...</div> -->
                                <div data-testid="location" class="jss796 jss798" style="padding: 0px;"></div>
                                <div class="jss799">
                                    <div class="text-[8px] lg:text-[12px] text-center font-medium" data-testid="bio" style="width: 100%; word-break: break-word; min-height: 27px; padding-top: 10px;" id="preview_custom">Soy un profesional de la informacion, actualmente trabajo con todos los asociados... <br></div>
                                </div>
                            </div>


                            <div class="w-[100%]" style="padding: 15px 23px; margin-bottom: 5px;">
                                <!-- <span style="display: inline-block; white-space: pre-line; font-size: 13px; font-weight: 600; margin: 0px; line-height: 1.5; color: rgb(0, 0, 0);">
                                    Proyectos Inmobiliarios
                                </span> -->
                                <p class="text-xl font-bold my-4 text-center">Proyecto <span id="nameProyecto"></span></p>
                                <p class="text-sm px-[20px] my-4 text-center" id="descriptionProyecto"></p>


                                <div class="w-full">
                                    <iframe class="hidden w-full max-w-[500px] mx-auto h-[200px] md:h-[355px]" id="urlvideoY" height="355" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div>

                                <p id="title-amenidades" class="text-xl font-bold my-4 text-center w-full">Beneficios y amenidades</p>
                                <div class="amenidades my-4 grid grid-cols-2 md:grid-cols-4 items-center gap-4">

                                </div>

                                <p class="text-xl font-bold my-4 text-center w-full">Imagenes referenciales</p>
                                <p class="text-lg my-4 text-center w-full">(Galeria)</p>
                                <div class="gallery grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <!-- <h1 class="text-lg font-bold">Galeria</h1> -->
                                </div>
                                <p class="text-xl font-bold my-4 text-center w-full">Lotización del proyecto</p>
                                <div class="flex justify-center flex-col items-center w-full">
                                    <!-- <img src="../img/plano.png" alt="" class="w-[100px]"> -->
                                    <a id="urlLotizador" href="" class="px-4 py-4 text-white bg-[#310ecd] font-medium rounded">Ver lotes disponibles</a>
                                </div>
                            </div>

                            <div class="w-full" style="background-color: rgb(255, 255, 255); flex-grow: 1;">
                                <p class="text-xl font-bold my-4 text-center w-full">Contactame</p>
                                <div id="links-container" class="w-full" style="display: flex; justify-content: center; flex-wrap: wrap; background-color: rgb(255, 255, 255);">

                                    cargando...
                                </div>
                            </div>
                            <div data-testid="button" class="w-full pt-[20px] py-[40px] flex justify-center" style="background: linear-gradient(rgba(255, 255, 255, 0) 15%, rgb(255, 255, 255) 100%) rgb(255, 255, 255);">
                                <div id="save_contact" data-testid="button-text-cont" class="cursor-pointer rounded-[48px] text-[14px] text-white flex gap-2 items-center justify-center w-[170px] h-[38px] font-bold" color="primary" variant="contained" style="background-color: rgb(0, 0, 0);"><ion-icon name="call"></ion-icon> Llamar</div>
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

<script src="../js/jquery.min.js"></script>
<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>



<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
<!-- <script src="../../js/dinamic/gestion-clientes-as.js"></script> -->
<!-- <script src="../../js/dinamic/emojiapp.js"></script> -->
<script src="./change_targets.js" defer></script>

</html>