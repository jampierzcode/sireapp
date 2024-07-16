<?php
session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 1) {
    header("Location: ../../../index.php");
} else {
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
        <link rel="stylesheet" href="../../../css/main.css">
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
    </head>

    <body>
        <div id="loading_lotizador" style="z-index: 40000;" class="w-full gap-4 bg-blue-600 flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 h-100" role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <h1 class="text-sm text-white">Cargando Lotizador...</h1>
        </div>
        <div id="map1" style="border: 30px solid #5b5b5b;"></div>
        <!-- <div id="map2"></div> -->
        <?php if ($_SESSION["us_tipo"] == 1) { ?>
            <div id="modal-manager-duplicar" class="modal-create md-hidden">
                <div class="form-create" style="width: 1000px;">
                    <div class="close-modal">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                    <h1 class="text-sm font-bold">Dupllicar Lote</h1>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Numero de copias</label>
                            <input id="number_duplicados" value="1" type="number" class="w-full px-3 py-2 rounded bg-gray-100" placeholder="Ingresa la cantidad de copias a duplucar">
                        </div>
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Direccion</label>
                            <div class="w-full grid grid-cols-4 gap-3">
                                <button keyDirection="izquierda" class="direcction-btn px-3 py-2 text-sm rounded bg-white shadow"><ion-icon name="arrow-back-outline"></ion-icon></button>
                                <button keyDirection="derecha" class="direcction-btn px-3 py-2 text-sm rounded bg-white shadow"><ion-icon name="arrow-forward-outline"></ion-icon></button>
                                <button keyDirection="arriba" class="direcction-btn px-3 py-2 text-sm rounded bg-white shadow"><ion-icon name="arrow-up-outline"></ion-icon></button>
                                <button keyDirection="abajo" class="direcction-btn px-3 py-2 text-sm rounded bg-white shadow"><ion-icon name="arrow-down-outline"></ion-icon></button>
                            </div>
                        </div>
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Rango de numeros de lote</label>
                            <input id="rango_numero_lote" type="text" class="w-full px-3 py-2 rounded bg-gray-100" placeholder="Ingresa la cantidad de copias a duplucar">

                        </div>
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Manzana</label>
                            <input id="rango_manzaba_lote" type="text" class="w-full px-3 py-2 rounded bg-gray-100" placeholder="Ingresa la cantidad de copias a duplucar">

                        </div>
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Precio</label>
                            <input id="rango_precios_lote" type="text" class="w-full px-3 py-2 rounded bg-gray-100" placeholder="Ingresa la cantidad de copias a duplucar">

                        </div>
                        <div class="w-full">
                            <label for="numero_duplicados" class="font-bold text-sm">Area</label>
                            <input id="rango_precios_lote" type="text" class="w-full px-3 py-2 rounded bg-gray-100" placeholder="Ingresa la cantidad de copias a duplucar">

                        </div>
                    </div>
                    <div class="w-full">
                        <button id="duplicar_lotes" class="direcction-btn px-3 py-2 text-sm rounded text-white bg-blue-700 shadow">Duplicar</button>

                    </div>
                </div>
            </div>
            <div class="containerLotizador">
                <div class="contentCreated">
                    <button id="creaCotizacion" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Crear Poligono +
                    </button>
                    <div class="createdZone addLote">
                        <h3>Crear poligono</h3>
                        <p style="font-size: 10px">El (.) es la separacion decimal</p>
                        <div class="formCreated">
                            <div class="bodyForm">
                                <div class="cardGroup">
                                    <label for="">Ancho</label>
                                    <input value="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="loteAncho" step="0.01" type="number" placeholder="0" />
                                </div>
                                <div class="cardGroup">
                                    <label for="">Largo</label>
                                    <input value="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="loteLargo" step="0.01" type="number" placeholder="0" />
                                </div>
                                <div class="cardGroup">
                                    <label for="">Area</label>
                                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="loteArea" step="0.01" type="number" placeholder="0" />
                                </div>
                                <div class="cardGroup">
                                    <label for="">Mz</label>
                                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="loteMz" type="text" placeholder="0" />
                                </div>
                                <div class="cardGroup">
                                    <label for="">N Lote</label>
                                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="loteNumero" type="text" placeholder="0" />
                                </div>
                                <div class="cardGroup">
                                    <label for="">Precio</label>
                                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="lotePrecio" type="number" step="0.01" placeholder="0" />
                                </div>
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione el estado</label>
                                <select id="loteEstado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="SIN PUBLICAR">SIN PUBLICAR</option>
                                    <option value="DISPONIBLE">DISPONIBLE</option>
                                    <option value="SEPARADO">SEPARADO</option>
                                    <option value="OCUPADO">OCUPADO</option>
                                </select>
                            </div>
                            <div class="footerForm">
                                <button id="crearLote" style="background-color: #310ecd !important;" class="focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                    Crear Lote
                                </button>
                            </div>
                        </div>
                        <div class="closeForm">
                            <button id="closeCreated" class="btnLotizador">X</button>
                        </div>
                    </div>
                </div>
                <button style="background-color: #310ecd !important;" class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onclick="copiarPoligono()">
                    Copiar Polígono
                </button>
                <div class="contentCreated">
                    <button id="addCarritoLotes" style="background-color: #310ecd !important;" class="showCarrito focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Agregar al Carrito +
                    </button>
                    <div class="createdZone carrito">
                        <h3>Lotes Dibujados</h3>
                        <p style="font-size: 10px">Aqui se muestran todos lotes creados en tiempo real</p>
                        <div class="formCreated">
                            <div class="listLotes w-full" id="listCarrito">

                            </div>
                            <div class="footerForm">
                                <button id="guardarLotizador" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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
            <div class="containerLotes  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h3>Lotes guardados</h3>

                <div id="listLotes" class="listLotes w-full"></div>
            </div>
            <div class="containerCopyLotes"></div>
        <?php } else if ($_SESSION["us_tipo"] == 2) { ?>
            <div class="container-loteActual">
                <h3>Lote: <span numberKey="" key="" id="lote"></span></h3>
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

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>

        <script src="../../../js/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
        <?php if ($_SESSION["us_tipo"] == 1) { ?>
            <script src="./lotizador.js"></script>
        <?php } else if ($_SESSION["us_tipo"] == 2) { ?>
            <script src="./lotizador_admin.js"></script>

        <?php } ?>
    </body>

    </html>
<?php } ?>