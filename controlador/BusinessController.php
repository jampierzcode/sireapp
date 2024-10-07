<?php
include_once '../modelo/Business.php';
$empresa = new Business();
session_start();
$id_usuario = $_SESSION['id_usuario'];

// SECTION BUSINESS MODULE
if ($_POST["funcion"] == "buscar_empresas") {
    $empresa->buscar_empresas();
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "register_empresa") {
    $data = json_decode($_POST["data"]);
    $empresa->register_empresa($data, $id_usuario);
    echo json_encode($empresa->mensaje);
}
if ($_POST["funcion"] == "register_sede") {
    $data = json_decode($_POST["data"]);
    $empresa->register_sede($data);
    $created_by = $id_usuario;
    echo json_encode($empresa->mensaje);
}
if ($_POST["funcion"] == "register_caja") {
    $data = json_decode($_POST["data"]);
    $created_by = $id_usuario;
    $empresa->register_caja($data, $created_by);
    echo json_encode($empresa->mensaje);
}
if ($_POST["funcion"] == "register_proyecto") {
    $data = json_decode($_POST["data"]);
    $empresa->register_proyecto($data, $id_usuario);
    echo json_encode($empresa->mensaje);
}
if ($_POST["funcion"] == "buscar_proyectos_by_empresa") {
    $empresa_id = $_POST["empresa_id"];
    $empresa->buscar_proyectos_by_empresa($empresa_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_by_empresa") {
    $empresa_id = $_POST["empresa_id"];
    $empresa->buscar_usuarios_by_empresa($empresa_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_sedes_by_empresa") {
    $empresa_id = $_POST["empresa_id"];
    $empresa->buscar_sedes_by_empresa($empresa_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
// nivel de sedes
if ($_POST["funcion"] == "buscar_proyectos_by_sede") {
    $sede_id = $_POST["sede_id"];
    $empresa->buscar_proyectos_by_sede($sede_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_by_sede") {
    $sede_id = $_POST["sede_id"];
    $empresa->buscar_usuarios_by_sede($sede_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cajas_by_sede") {
    $sede_id = $_POST["sede_id"];
    $empresa->buscar_cajas_by_sede($sede_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_sedes_by_usuario") {
    $user_id = $id_usuario;
    $empresa->buscar_sedes_by_usuario($user_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_sedes_by_proyecto") {
    $proyecto_id = $_POST["id"];
    $empresa->buscar_sedes_by_proyecto($proyecto_id);
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_admin") {
    $empresa->buscar_usuarios_admin();
    if ($empresa->mensaje) {
        echo $empresa->mensaje;
    }
    if ($empresa->datos) {
        $jsonstring = json_encode($empresa->datos);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "asignar_proyecto_sede") {
    $sede_id = $_POST["sede_id"];
    $proyecto_id = $_POST["proyecto_id"];
    $fecha_asigned = $_POST["fecha_asigned"];
    $empresa->asignar_proyecto_sede($sede_id, $proyecto_id, $fecha_asigned, $id_usuario);
    echo json_encode($empresa->mensaje);
}
if ($_POST["funcion"] == "asignar_usuario_sede") {
    $sede_id = $_POST["sede_id"];
    $user_id = $_POST["usuario_id"];
    $fecha_asigned = $_POST["fecha_asigned"];
    $empresa->asignar_usuario_sede($sede_id, $user_id, $fecha_asigned, $id_usuario);
    echo json_encode($empresa->mensaje);
}
