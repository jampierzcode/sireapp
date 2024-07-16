<?php
// Obtén la URL actual
$currentUrlView = $_SERVER['REQUEST_URI'];
$currentUrl = basename($_SERVER['REQUEST_URI']);
$activeGestion;
if (strpos($currentUrlView, 'views_cajero') !== false) {
    $activeGestion = true;
} else {
    $activeGestion = false;
}

// Define los enlaces de tu sidebar con sus respectivas URLs
$links = [
    [
        'url' => '../caja',
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
<nav class="navbar-dashboard">
    <div class="drop-down-menu">
        <ion-icon name="reorder-three-outline"></ion-icon>
    </div>
    <div class="user-login" style="gap: 20px">
        <!-- <FaBell /> campanas-->
        <!-- <img src="../../img/jampier.jpg" alt="img_avatar_user" /> -->
        <img src="../../img/avatar_default.jpg" alt="img_avatar_user" />
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
                            case 4:
                                echo "cajero";
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
                    <div class="w-full">
                        <div class="menu-wrapper rounded-md flex items-center justify-between py-2 px-3 <?php echo ($activeGestion) ? ' active-link' : ''; ?> gap-4 cursor-pointer">
                            <p class="whitespace-nowrap font-bold pl-[16px] text-[12px]">Gestion Caja</p>
                            <span class="inline-fex justify-end text-end w-[40px] pl-3"><ion-icon name="chevron-down"></ion-icon></span>
                        </div>
                        <div class="dropdown_menu px-3">
                            <a class="pl-4 w-full py-3 whitespace-nowrap text-start flex items-center text-xs <?php echo ($currentUrl === "caja") ? ' active-link' : ''; ?>"" href=" ../caja">

                                <ion-icon class="w-[40px] text-[18px]" name="briefcase"></ion-icon>
                                <p class="w-full text-xs">Abrir Caja</p>
                            </a>
                            <a class="pl-4 w-full py-3 whitespace-nowrap text-start flex items-center text-[12px] <?php echo ($currentUrl === "historialcaja") ? ' active-link' : ''; ?>""  href=" ../historialcaja">
                                <ion-icon class="w-[40px] text-[18px]" name="file-tray-full"></ion-icon>

                                <p class="w-full text-xs">Historial Caja</p>
                            </a>
                            <a class="pl-4 w-full py-3 whitespace-nowrap text-start flex items-center text-[12px] <?php echo ($currentUrl === "ingresos") ? ' active-link' : ''; ?>""  href=" ../ingresos">
                                <ion-icon class="w-[40px] text-[18px]" name="bag-check"></ion-icon>
                                <p class="w-full text-xs">Ingresos</p>
                            </a>
                            <a class="pl-4 w-full py-3 whitespace-nowrap text-start flex items-center text-[12px] <?php echo ($currentUrl === "gastos") ? ' active-link' : ''; ?>""  href=" ../gastos">
                                <ion-icon class="w-[40px] text-[18px]" name="bag-remove"></ion-icon>
                                <p class="w-full text-xs">Gastos</p>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop <?php echo ($currentUrl === "separar" || $currentUrl === "ventas") ? ' active-link' : ''; ?>" href="../ventas">
                            <ion-icon name="bag-handle"></ion-icon>
                            <p>Ventas</p>
                        </a>
                    </div>
                </div>
            </li>
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop <?php echo ($currentUrl === "pagos" || $currentUrl === "cuotas") ? ' active-link' : ''; ?>" href="../pagos">
                            <ion-icon name="card"></ion-icon>
                            <p>Pagos</p>
                        </a>
                    </div>
                </div>
            </li>
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop" href="../../controlador/LogoutController.php">
                            <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                            <p>Cerrar sesion</p>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</aside>