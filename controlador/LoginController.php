<?php
include_once "../modelo/Usuario.php";
session_start();
$username = $_POST["username"];
$password = md5($_POST["password"]);

$usuario = new Usuario();

$usuario->Loguearse($username, $password);

if (!empty($usuario->datos)) {

    // print_r($usuario->datos);
    // echo $usuario->datos[0]->creator;

    foreach ($usuario->datos as $dato) {
        $_SESSION["id_usuario"] = $dato->id_usuario;
        $_SESSION["creator"] = $dato->creator;
        $_SESSION["nombres"] = $dato->nombre . " " . $dato->apellido;
        $_SESSION["us_tipo"] = $dato->tipo;
    }
    if ($_SESSION["us_tipo"] == 2) {
        $usuario->view_permisos($_SESSION["id_usuario"]);
        $_SESSION["permisos"] = $usuario->datos;
        header("Location: ../views_admin/Dashboard/");
    } elseif ($_SESSION["us_tipo"] == 3) {

        // $usuario->view_creador_permiso($usuario->datos[0]->creator);
        // if ($usuario->datos[0]->service_crm == "SI") {

        //     $_SESSION["permiso_crm"] = "SI";
        // }
        $_SESSION["permiso_crm"] = "SI";
        header("Location: ../views_asesor/Dashboard/");
        # code...
    } elseif ($_SESSION["us_tipo"] == 5) {
        $usuario->view_permisos($_SESSION["creator"]);
        $_SESSION["permisos"] = $usuario->datos;
        header("Location: ../views_admin/Dashboard/");
    } elseif ($_SESSION["us_tipo"] == 6) {

        header("Location: ../views_manager_lotes/ventas/");
    } else {
        header("Location: ../views/Dashboard/");
    }
} else {
    $_SESSION["error"] = "EL usuario o contraseña es incorrecto";
    header("Location: ../index.php");
}
