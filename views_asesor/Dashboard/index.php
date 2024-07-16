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
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="stylesheet" href="../../css/recepcion.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_asesor.php"
        ?>

        <div class="container-dashboard">
            <span class="route">
                > Home
            </span>
            <div class="cards-admin">
                <div class="card-count">
                    <div class="left-card">
                        <h1>N° Proyectos</h1>
                        <span id="data-reservas">0</span>
                    </div>
                    <!-- <ion-icon name="calendar-outline"></ion-icon> -->
                    <ion-icon name="home-outline"></ion-icon>
                </div>
                <div class="card-count">
                    <div class="left-card">
                        <h1>N° Clientes</h1>
                        <span id="data-clients">0</span>
                    </div>
                    <ion-icon name="people-outline"></ion-icon>
                </div>
                <div class="card-count ventas">
                    <div class="left-card">
                        <h1>Venta Total</h1>
                        <span id="data-ventas">S/00.00</span>
                    </div>
                    <ion-icon name="cash-outline"></ion-icon>
                </div>
            </div>
            <div class="mt-6">
                <span class="route">
                    Mis proyetos asignados
                </span>
                <div id="listProyectos" class="grid-3-column" style="gap:10px">

                </div>
            </div>
            <!-- <canvas id="myChart" width="150"></canvas> -->
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- <script src="../../js/dinamic/gestion_contabilidad.js"></script> -->
    <script src="../../js/dinamic/gestion_recepcion.js"></script>

    </html>
<?php } ?>