<?php

session_start();
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
    <link rel="stylesheet" href="../../css/clientes.css">
    <link rel="icon" href="../../img/logo.jpg">
    <title>AppLotizador</title>
</head>

<body>
    <?php
    include_once "../../components/Sidebar.php"
    ?>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../Dashboard">
                    <ion-icon name="pie-chart"></ion-icon>
                    <p>Dashboard</p>
                </a>
            </div>
        </div>
    </li>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../Proyectos">
                    <ion-icon name="home-outline"></ion-icon>
                    <p>Proyectos</p>
                </a>
            </div>
        </div>
    </li>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop active-link" href="../Clients">
                    <ion-icon name="people-sharp"></ion-icon>
                    <p>Usuarios</p>
                </a>
            </div>
        </div>
    </li>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../../controlador/LogoutController.php">
                    <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                    <p>Cerrar sesión</p>
                </a>
            </div>
        </div>
    </li>
    </ul>
    </div>
    </aside>
    <div class="container-dashboard">
        <span class="route">
            > Home > Clientes
        </span>

        <div class="modal-create md-hidden">
            <div class="form-create">
                <!-- <form id="form_producto_add"> -->
                <div class="close-modal">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <h1>Crear Cliente</h1>
                <div class="card-input">
                    <span>Tipo de documento</span>
                    <div class="input-group">
                        <select name="type-register" id="tipo-documento-modal">
                            <option value="0">Seleccione el tipo de documento</option>
                            <option value="1">DNI</option>
                            <option value="2">RUC</option>
                        </select>
                    </div>
                </div>
                <div class="card-input">
                    <span>Documento</span>
                    <div class="input-group">
                        <i class="fas fa-address-card"></i>
                        <input id="documento-modal" disabled type="number" placeholder="Ingrese el numero">
                        <i id="search-client" class="fas fa-search"></i>
                    </div>
                </div>
                <div class="card-input">
                    <span>Nombres</span>
                    <div class="input-group">

                        <ion-icon name="person-circle-outline"></ion-icon>
                        <input id="nombres-modal" type="text" placeholder="Ingrese los nombres o razon social">
                    </div>
                </div>
                <div class="card-input buttons-modal">
                    <button id="cancel-form" class="btn-cancel">Cancelar</button>
                    <button id="add-cliente-form" class="btn-create">Crear</button>
                </div>
                <!-- </form> -->
            </div>
        </div>
        <div class="create-productos">
            <button id="create-clients" class="btn-add">+ Crear</button>
        </div>
        <div class="list-productos">
            <p>Lista de usuarios</p>
            <div class="productos-header-table">
                <p class=" campo_tabla">Nombres / Razon Social</p>
                <p class="campo_tabla">Tipo Documento</p>
                <p class="campo_tabla">Documento</p>
                <p class="campo_tabla">Acciones</p>
            </div>
            <div id="clientes-body-table">
            </div>
        </div>

    </div>
    </div>
</body>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="../../js/jquery.min.js"></script>
<script src="../../components/sidebar.js"></script>
<script src="../../js/dinamic/gestion-clientes.js"></script>

</html>