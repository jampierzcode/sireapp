<?php

$currentUrlView = $_SERVER['REQUEST_URI'];
$currentUrl = basename($_SERVER['REQUEST_URI']);
$activeGestion;
if ($currentUrl === "business" || $currentUrl === "proyectos" || $currentUrl === "sedes") {
    $activeGestion = true;
} else {
    $activeGestion = false;
}
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
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="w-full">
                        <div class="menu-wrapper rounded-md flex items-center justify-between py-2 pr-3 pl-[16px] <?php echo ($activeGestion) ? ' font-bold text-[#310ecd]' : ' font-[500]  text-[#637381]'; ?> cursor-pointer">
                            <ion-icon class="text-[18px] min-w-[40px] font-bold" name="home"></ion-icon>
                            <p class="whitespace-nowrap text-[12px]">Empresas</p>
                            <span class="inline-fex justify-end text-end w-[40px] pl-3"><ion-icon name="chevron-down"></ion-icon></span>
                        </div>
                        <div class="dropdown_menu w-full">
                            <a class="w-full whitespace-nowrap pl-[46px] h-[46px] text-start flex items-center text-xs hover:bg-gray-100 transition-all duration-300 rounded <?php echo ($currentUrl === "business") ? ' active-link font-bold' : ''; ?>"" href=" ../business">

                                <p class=" w-full inline-block text-xs ">Mis Empresas</p>
                            </a>
                            <a class=" w-full whitespace-nowrap pl-[46px] h-[46px] text-start flex items-center text-xs hover:bg-gray-100 transition-all duration-300 rounded <?php echo ($currentUrl === "proyectos") ? ' active-link font-bold' : ''; ?>"" href=" ../proyectos">

                                <p class="w-full inline-block text-xs ">Proyectos</p>
                            </a>
                            <a class=" w-full whitespace-nowrap pl-[46px] h-[46px] text-start flex items-center text-xs hover:bg-gray-100 transition-all duration-300 rounded <?php echo ($currentUrl === "sedes") ? ' active-link font-bold' : ''; ?>"" href=" ../sedes">

                                <p class="w-full inline-block text-xs ">Sedes</p>
                            </a>

                        </div>
                    </div>
                </div>
            </li>
            <?php if ($_SESSION["us_tipo"] == 1) { ?>
                <li class="links-menu-dashboard">
                    <div class="link-block">
                        <div class="left-link">
                            <a class="toggle-drop <?php echo ($currentUrl === "Usuarios") ? ' active-link' : ''; ?>" href="../Usuarios">
                                <ion-icon name="people-sharp"></ion-icon>
                                <p>Usuarios</p>
                            </a>
                        </div>
                    </div>
                </li>
            <?php } ?>
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