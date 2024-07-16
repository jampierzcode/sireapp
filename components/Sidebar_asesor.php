<?php
// Obtén la URL actual
$currentUrl = basename($_SERVER['REQUEST_URI']);

// Define los enlaces de tu sidebar con sus respectivas URLs
$links = [
    [
        'url' => '../Dashboard',
        'icon' => 'pie-chart',
        'text' => 'Dashboard'
    ],
    [
        'url' => '../crm',
        'icon' => 'people-sharp',
        'text' => 'CRM'
    ],
    // Agrega más enlaces aquí si es necesario
];

?>
<nav class="navbar-dashboard justify-between">
    <div class="drop-down-menu">
        <ion-icon name="reorder-three-outline"></ion-icon>
    </div>
    <div class="relative">
        <img class="w-10 h-10 rounded-full" src="../../img/avatar_default.jpg" alt="">
        <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
    </div>
</nav>
<div class="overlay-sidebar"></div>
<aside class="aside-dashboard">
    <div class="header-aside">
        <div class="logo">
            <!-- <img src="../img/logo.jpg" alt="logo-img" class="logo-icon" /> -->
            <ion-icon name="home"></ion-icon>
            <p>App Lotizador</p>
        </div>
    </div>
    <div class="main">
        <div class="perfil-user">
            <img src="../../img/avatar_default.jpg" alt="img_avatar_user" />

            <div class="info-perfil">

                <p><?php echo $_SESSION["nombres"] ?></p>
                <span><?php switch ($_SESSION["us_tipo"]) {
                            case 1:
                                echo "superadmin";
                                break;
                            case 2:
                                echo "admin";
                                break;
                            case 3:
                                echo "asesor";
                                break;

                            default:
                                echo "null";
                                break;
                        } ?></span>
            </div>
        </div>
        <ul class="nav-links">
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop <?php echo ($currentUrl === "Dashboard") ? ' active-link' : ''; ?>" href="../Dashboard">
                            <ion-icon name="pie-chart"></ion-icon>
                            <p>Dashboard</p>
                        </a>
                    </div>
                </div>
            </li>
            <?php
            if (!empty($_SESSION["permiso_crm"])) {

            ?>
                <li class="links-menu-dashboard">
                    <div class="link-block">
                        <div class="left-link">
                            <a class="toggle-drop <?php echo ($currentUrl === "crm" || $currentUrl === "msj-plantilla" || $currentUrl === "importar.php") ? ' active-link' : ''; ?>" href="../crm">
                                <ion-icon name="people-sharp"></ion-icon>
                                <p>CRM</p>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="links-menu-dashboard">
                    <div class="link-block">
                        <div class="left-link">
                            <a class="toggle-drop <?php echo ($currentUrl === "target_user" || $currentUrl === "about.php" || $currentUrl === "share.php") ? ' active-link' : ''; ?>" href="../target_user">
                                <ion-icon name="id-card"></ion-icon>
                                <p>Tarjeta Asesor</p>
                            </a>
                        </div>
                    </div>
                </li>
            <?php
            }
            ?>
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop" href="../../controlador/LogoutController.php">
                            <ion-icon name="log-out-outline"></ion-icon>
                            <p>Cerrar sesion</p>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</aside>