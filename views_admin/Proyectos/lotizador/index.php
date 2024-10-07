<?php
session_start();
if (empty($_SESSION["us_tipo"])) {
    header("Location: ../../../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lotizador</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />

    <link rel="stylesheet" href="../../../css/Lotizador.css" />
    <link rel="stylesheet" href="../../../css/toast.css">
    <link rel="stylesheet" href="../../../css/main.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <!-- tailwin css -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .select2-container {
            z-index: 50000;
        }
    </style>
</head>

<body>
    <div id="loading_lotizador" style="z-index: 40000;" class="w-full gap-4 bg-blue-600 flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 h-100" role="status">
        <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <h1 class="text-sm text-white">Cargando Lotizador...</h1>
    </div>
    <div id="map1"></div>

    <!-- <div id="map2"></div> -->
    <?php if ($_SESSION["us_tipo"] == 1) { ?>
        <div class="containerLotizador">
            <div class="contentCreated">
                <button id="creaCotizacion" class="btnOptions">
                    Crear Poligono +
                </button>
                <div class="createdZone addLote">
                    <h3>Crear poligono</h3>
                    <p style="font-size: 10px">El (.) es la separacion decimal</p>
                    <div class="formCreated">
                        <div class="bodyForm">
                            <div class="cardGroup">
                                <label for="">Ancho</label>
                                <input id="loteAncho" type="number" placeholder="0" />
                            </div>
                            <div class="cardGroup">
                                <label for="">Largo</label>
                                <input id="loteLargo" type="number" placeholder="0" />
                            </div>
                            <div class="cardGroup">
                                <label for="">Area</label>
                                <input id="loteArea" type="number" placeholder="0" />
                            </div>
                            <div class="cardGroup">
                                <label for="">Mz</label>
                                <input id="loteMz" type="text" placeholder="0" />
                            </div>
                            <div class="cardGroup">
                                <label for="">N Lote</label>
                                <input id="loteNumero" type="number" placeholder="0" />
                            </div>
                            <div class="cardGroup">
                                <label for="">Precio</label>
                                <input id="lotePrecio" type="number" placeholder="0" />
                            </div>
                        </div>
                        <div class="footerForm">
                            <button id="crearLote" class="btnLotizador">
                                Crear Lote
                            </button>
                        </div>
                    </div>
                    <div class="closeForm">
                        <button id="closeCreated" class="btnLotizador">X</button>
                    </div>
                </div>
            </div>
            <button class="btnOptions" onclick="copiarPoligono()">
                Copiar Polígono
            </button>
            <div class="contentCreated">
                <button id="addCarritoLotes" class="btnOptions showCarrito">
                    Agregar al Carrito +
                </button>
                <div class="createdZone carrito">
                    <h3>Lotes Dibujados</h3>
                    <p style="font-size: 10px">Aqui se muestran todos lotes creados en tiempo real</p>
                    <div class="formCreated">
                        <div class="listLotes" id="listCarrito">

                        </div>
                        <div class="footerForm">
                            <button id="guardarLotizador" class="btnLotizador">
                                Add Carrito
                            </button>
                        </div>
                    </div>
                    <div class="closeForm">
                        <button id="closeCarrito" class="btnLotizador">X</button>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>
    <?php if ($_SESSION["us_tipo"] == 1) { ?>
        <div class="containerLotes">
            <h3>Mis lotes</h3>

            <div id="listLotes" class="listLotes"></div>
        </div>
        <div class="containerCopyLotes"></div>
    <?php } else if ($_SESSION["us_tipo"] == 2 || $_SESSION["us_tipo"] == 5) { ?>
        <div id="modal-manager-duplicar" class="modal-create md-hidden">
            <div class="form-create" style="width: 1000px;">
                <div class="close-modal">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </div>
                <h1 class="text-sm font-bold">Informacion</h1>
                <div id="data_info" class="grid grid-cols-1 md:grid-cols-3 w-full gap-4">

                </div>
            </div>
        </div>
        <div id="modal-manager-venta" class="modal-create md-hidden">
            <div class="form-create">
                <!-- <form id="form_producto_add"> -->
                <div class="close-modal">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <h1 class="font-bold">Registrar Venta</h1>
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg">Tipo</label>
                        <select class="w-full rounded p-3 bg-gray-200 text-sm" id="ventaTipo">
                            <option value="0" disabled selected>Seleccione un tipo de venta</option>
                            <option value="SEPARACION">SEPARACION</option>
                            <option value="VENTA">VENTA</option>
                        </select>
                    </div>

                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg">Sede</label>
                        <select class="w-full rounded p-3 bg-gray-200 text-sm" id="sedesListModal">
                            <option value="0" disabled selected>Seleccione una sede</option>

                        </select>
                    </div>
                    <div class="h-[3px] w-full bg-gray-300"></div>

                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg">Lote seleccionado</label>
                        <span class="block p-2 w-full" id="detalle_selected_lote"></span>

                    </div>
                    <div class="w-full">
                        <label for="Precio" class="font-bold text-lg">Precio</label>
                        <input type="number" step="0.01" class="w-full rounded p-3 bg-gray-200 text-sm" id="precio_final_modal" />

                    </div>
                    <div class="h-[3px] w-full bg-gray-300"></div>
                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg w-full block">Cliente</label>
                        <div class="flex gap-2">

                            <select style="width: 100%" class="w-full rounded p-3 bg-gray-200 text-sm" id="clientesList">
                                <option value="0" disabled selected>Seleccione un cliente</option>

                            </select>
                            <button id="add-cliente" class="p-2 rounded bg-green-600 text-white font-bold h-max">+</button>
                        </div>
                    </div>
                    <div class="h-[3px] w-full bg-gray-300"></div>
                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg w-full block">Asesor</label>
                        <select style="width: 100%" class="w-full rounded p-3 bg-gray-200 text-sm" id="select_asesor">
                            <option value="No" selected>No</option>
                            <option value="SI">SI</option>

                        </select>
                    </div>
                    <div class="w-full hidden" id="viewListAsesores">
                        <select style="width: 100%" class="w-full rounded p-3 bg-gray-200 text-sm" id="asesoresList">
                            <option value="0" disabled selected>Seleccione un asesor</option>

                        </select>
                    </div>
                    <div class="w-full">
                        <label for="Lote" class="font-bold text-lg w-full block">Observaciones</label>

                        <textarea class="w-full rounded p-3 bg-gray-200 text-sm" name="observacionesModal" id="observacionesModal"></textarea>
                    </div>


                </div>
                <div class="w-full">
                    <button id="register_venta" class="bg-[#310ecd] text-white rounded p-2">Registrar</button>
                </div>
                <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                <!-- </form> -->
            </div>
        </div>
        <div class="container-loteActual">
            <h3>Manzana: <span numberKey="" key="" id="manzana"></span> Lote: <span numberKey="" key="" id="lote"></span></h3>
            <div class="listDetail">
                <p>Ancho: <span id="ancho"></span></p>
                <p>Largo: <span id="largo"></span></p>
                <p>Area: <span id="area"></span></p>
                <p>Precio: <span id="precio"></span></p>

            </div>
            <p class="container-estado" id="estadoLote">
            </p>
            <div class="container-edit-status md-hidden">
                <select id="selectStatus" name="estado">
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="SIN PUBLICAR">SIN PUBLICAR</option>
                    <option value="SEPARADO">SEPARADO</option>
                    <option value="OCUPADO">OCUPADO</option>
                </select>
                <button id="cancelEdit" class="btnLotizador">Cancelar</button>
                <button id="changeEdit" class="btnLotizador">cambiar</button>

            </div>
            <!-- <div>
            <button class="btnLotizador">Me interesa</button>
        </div> -->
        </div>
    <?php } ?>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>

    <script src="../../../js/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
    <?php if ($_SESSION["us_tipo"] == 1) { ?>
        <script src="./lotizador.js"></script>
    <?php } else if ($_SESSION["us_tipo"] == 2 || $_SESSION["us_tipo"] == 5) { ?>

        <script src="../../../js/dinamic/toastmith.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


        <script src="./lotizador_admin.js"></script>

    <?php } ?>
</body>

</html>