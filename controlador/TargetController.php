<?php
include_once '../modelo/Usuario.php';
$usuario = new Usuario();


// buscar usuario
if ($_POST["funcion"] == "get_usuario") {
    $user  = $_POST["id"];
    $usuario->getUsuario($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_amenidades") {
    $id = $_POST["id"];
    $usuario->buscar_amenidades($id);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_by_user_target_socials") {
    $json = array();
    $user = $_POST["user"];
    $usuario->buscar_user_target_socials($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "search_target_user_uuid") {
    $json = array();
    $user = $_POST["id"];
    $usuario->buscar_user_target($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_id") {
    $json = array();
    $proyecto = $_POST["proyecto"];
    $usuario->buscar_proyectos_id($proyecto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "multimedia_proyecto") {
    $id = $_POST["id"];
    $json_resultado = $usuario->multimedia_proyecto($id);

    // Devuelve el JSON al cliente
    echo $json_resultado;
}
