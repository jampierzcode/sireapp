<?php
session_start();
if (!empty($_SESSION["id_usuario"])) {
    switch ($_SESSION["us_tipo"]) {
        case 1:
            header("Location: views/Dashboard");
            break;
        case 2:
            header("Location: views_admin/Dashboard");
            break;
        case 3:
            header("Location: views_asesor/Dashboard");
            break;
        case 4:
            header("Location: views_cajero/caja");
            break;
        case 5:
            header("Location: views_admin/Dashboard");
            break;
        case 6:
            header("Location: views_manager_lotes/ventas");
            break;

        default:
            # code...
            break;
    }
} else {
?>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/login.css">
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>

        <title>SIRE - Login</title>
    </head>

    <body>
        <div class="container-login">
            <div class="form-login">

                <form action="./controlador/LoginController.php" method="post">
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold text-center md:text-5xl">SIRE</h1>
                        <p class="flex text-sm justify-center items-center gap-1">Sistema Informático Real State
                        </p>
                        <!-- <img src="img/logo.jpg" alt="logo"> -->
                    </div>
                    <div class="body-form">

                        <div class="group-date">
                            <ion-icon name="person-sharp"></ion-icon>
                            <input name="username" type="text" placeholder="Ingresa el usuario">
                        </div>
                        <div class="group-date">
                            <ion-icon name="lock-closed"></ion-icon>
                            <input id="password_login" name="password" type="password" placeholder="Ingresa la contraseña">
                            <div class="view-password" key_actived="false"><ion-icon name="eye-off-outline"></ion-icon></div>
                        </div>
                        <button class="bg-[#310ecd] px-4 py-3 text-white rounded-md" type="submit">Iniciar Sesion</button>
                        <?php

                        if (!empty($_SESSION["error"])) {
                            $error = $_SESSION["error"];

                        ?>
                            <div class="bg-red-100 text-red-600 border-2 border-red-600 rounded w-full text-center">
                                <p><?php echo $_SESSION["error"] ?></p>
                            </div>
                        <?php
                            session_destroy();
                        }
                        ?>
                        <div class="mt-4">
                            <p class="flex text-sm justify-center items-center gap-1">Sistema creado por
                                <img style="width: 60px" src="./img/logo.png" alt="">
                            </p>
                            <!-- <img src="img/logo.jpg" alt="logo"> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>

    <script src="js/jquery.min.js"></script>
    <script>
        $(document).on("click", ".view-password", function() {
            if ($(this).attr("key_actived") === "false") {
                $(this).attr("key_actived", "true")
                $("#password_login").attr("type", "text")
                $(this).html(`<ion-icon name="eye-outline"></ion-icon>`)
            } else {
                $(this).attr("key_actived", "false")
                $("#password_login").attr("type", "password")
                $(this).html(`<ion-icon name="eye-off-outline"></ion-icon>`)
            }
        })
    </script>

    </html>
<?php } ?>