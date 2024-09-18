<?php
include_once '../modelo/Usuario.php';
$usuario = new Usuario();
session_start();
$id_usuario = $_SESSION['id_usuario'];

// SECTION DASHBOARD CONTABILIDAD
if ($_POST["funcion"] == "buscar_datos_contabilidad") {
    $json = array();
    $id_usuario = $_SESSION["id_usuario"];
    $usuario->buscar_datos_contabilidad($id_usuario);
    // echo $usuario->datos;
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'proyectos' => $dato->proyectos,
                'asesores' => $dato->asesores,
                // 'habitaciones' => $dato->habitaciones,
                // 'ventas' => $dato->ventas
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

// SECTION ROLES

if ($_POST["funcion"] == "buscar_roles") {
    $json = array();
    $usuario->buscar_roles();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}


// SECTION DE CLIENTES
if ($_POST["funcion"] == "buscar_cliente") {
    $documento = $_POST["documento"];
    $json = array();
    $usuario->buscar_cliente($documento);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_cliente' => $dato->id_cliente,
                'nombres' => $dato->nombres,
                'documento' => $dato->documento
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_cliente_id") {
    $id_producto = $_POST["id_producto"];
    $json = array();
    $usuario->buscar_producto_id($id_producto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cliente_proyecto") {
    $proyecto_id = $_POST["id"];
    $usuario->buscar_cliente_proyecto($proyecto_id);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "borrar_cliente") {
    $id_cliente = $_POST["id_cliente"];
    $usuario->borrar_cliente($id_cliente);
    echo $usuario->mensaje;
}

// FIN DE SECTION DE CLIENTES

// seccion usuarios
if ($_POST["funcion"] == "add_user") {
    $user = intval($_SESSION["id_usuario"]);
    $documento = intval($_POST["documento"]);
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $phone = $_POST["phone"];
    $username = $_POST["username"];
    $password = md5($_POST["password"]);
    $rol_id = $_POST["rol_id"];
    $usuario->add_user($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password, $rol_id);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "buscar_datos_usuario") {
    $user = intval($_SESSION["id_usuario"]);
    $usuario->buscar_datos_usuario($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "add_user_asesor") {
    $user = intval($_SESSION["id_usuario"]);
    $documento = intval($_POST["documento"]);
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $phone = $_POST["phone"];
    $username = $_POST["username"];
    $password = md5($_POST["password"]);
    $usuario->add_user_asesor($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "registar_servicios") {
    $permisos = json_decode($_POST["permisos"]);
    $user_id = $_POST["id"];
    $usuario->add_permisos($user_id, $permisos);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "registar_usuario_empresa") {
    $empresa_id = $_POST["empresa_id"];
    $usuario_id = $_POST["usuario_id"];
    $fecha = $_POST["fecha"];
    $created_by = $id_usuario;
    $usuario->registar_usuario_empresa($usuario_id, $empresa_id, $fecha, $created_by);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "add_user_proyect") {
    $proyectos = $_POST["proyectos"];
    $id_usuario = $_POST["id"];
    $usuario->add_user_proyect($id_usuario, $proyectos);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_asigned_etiqueta") {
    $etiquetas = $_POST["etiquetas"];
    $id_cliente = $_POST["cliente"];
    $fecha = $_POST["fecha"];
    $usuario->update_asigned_etiqueta($etiquetas, $fecha, $id_cliente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_user_cliente") {
    $asesor = $_POST["asesor"];
    $data = json_decode($_POST["ids_clientes"]);
    $fecha = $_POST["fecha_now"];
    $hora = $_POST["hora_now"];
    $usuario->add_user_cliente($data, $asesor, $fecha, $hora);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "asignar_actividad_user") {
    $asesor_id = $_POST["asesor_id"];
    $id_task = $_POST["id_task"];
    $usuario->asignar_actividad_user($asesor_id, $id_task);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "add_user_cliente_asesor") {
    $asesor = $_SESSION["id_usuario"];
    $data = json_decode($_POST["ids_clientes"]);
    $fecha = $_POST["fecha_now"];
    $hora = $_POST["hora_now"];
    $usuario->add_user_cliente($data, $asesor, $fecha, $hora);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "archived_multiple_clientes") {

    $data = json_decode($_POST["ids_clientes"]);
    $usuario->archived_multiple_clientes($data);
    echo $usuario->mensaje;
}
// fin de seccion usuarios

// SECTION DE RESERVAS
if ($_POST["funcion"] == "buscar_reserva") {
    $id_habitacion = $_POST["id_habitacion"];
    $json = array();
    $usuario->buscar_reserva($id_habitacion);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_reservas' => $dato->id_reservas,
                'cliente' => $dato->cliente,
                'documento' => $dato->documento,
                'id_habitaciones' => $dato->id_habitaciones,
                'precio' => $dato->precio,
                'n_cuarto' => $dato->n_cuarto,
                'nombre_categoria' => $dato->nombre_categoria,
                'fecha_entrada' => $dato->fecha_entrada,
                'fecha_salida' => $dato->fecha_salida,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
// SECTION DE DETAIL RESERVAS
if ($_POST["funcion"] == "buscar_detail_reserva") {
    $id_reserva = $_POST["id_reserva"];
    $json = array();
    $usuario->buscar_detail_reserva($id_reserva);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_reservas' => $dato->id_reservas,
                'total' => $dato->total,
                'descuento' => $dato->descuento,
                'adelanto' => $dato->adelanto,
                'total_descuento' => $dato->total_descuento
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
// SECTION DE DETAIL CONSUMO
if ($_POST["funcion"] == "buscar_detail_consumo") {
    $id_reserva = $_POST["id_reserva"];
    $json = array();
    $usuario->buscar_detail_consumo($id_reserva);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_detalle_venta' => $dato->id_detalle_venta,
                'cantidad' => $dato->cantidad,
                'estado_pago' => $dato->estado_pago,
                'subtotal' => $dato->subtotal,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "subir_foto_producto") {
    if (($_FILES['imagen_producto']['type'] == 'image/jpeg') || ($_FILES['imagen_producto']['type'] == 'image/png') || ($_FILES['imagen_producto']['type'] == 'image/jpg')) {
        $nombre = uniqid() . '-' . $_FILES['imagen_producto']['name'];
        $ruta = '../img/productos/' . $nombre;
        move_uploaded_file($_FILES['imagen_producto']['tmp_name'], $ruta);
        echo $ruta;
    } else {
        echo "no_format_imagen";
    }
}

// FIN DE SECTION DE RESERVAS

// SECTION PRODUCTOS
if ($_POST["funcion"] == "crear_productos") {
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $inventario = $_POST["inventario"];
    $usuario->crear_productos($nombre, $precio, $inventario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "buscar_productos") {
    $json = array();
    $usuario->buscar_productos();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_producto_id") {
    $id_producto = $_POST["id_producto"];
    $json = array();
    $usuario->buscar_producto_id($id_producto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "borrar_producto") {
    $id_producto = $_POST["id_producto"];
    $usuario->borrar_producto($id_producto);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "edit_producto") {
    $id_producto = $_POST["id_producto"];
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $inventario = $_POST["inventario"];
    $usuario->edit_producto($id_producto, $nombre, $precio, $inventario);
    echo $usuario->mensaje;
}
// FIN DE SECTION PRODUCTOS

// SECTION DE VENTAS DE PRODUCTOS
if ($_POST["funcion"] == "registrar_ventas_productos") {
    $json = array();
    $productos = $_POST["carrito"];
    $id_reserva = $_POST["id_reserva"];
    $option = $_POST["option"];
    $usuario->registrar_ventas_productos($productos, $id_reserva, $option);
    echo $usuario->mensaje;
}
// FIN DE SECTION DE VENTAS DE PRODUCTOS



// SECTION PROYECTOS
if ($_POST["funcion"] == "crear_proyecto") {
    $created = intval($_SESSION['id_usuario']);
    $galeria = $_POST["galeria"];
    $proyecto_nombre = $_POST["proyecto_nombre"];
    $proyecto_lotes = intval($_POST["proyecto_lotes"]);
    $usuario->crear_proyecto($created, $proyecto_nombre, $proyecto_lotes, $galeria);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_user") {
    $data_user = $_POST["data_user"];
    $nombres = $data_user["user_nombres"];
    $id = $data_user["id"];
    $apellidos = $data_user["user_apellidos"];
    $documento = $data_user["user_documento"];
    $correo = $data_user["user_correo"];
    $phone = $data_user["user_phone"];
    $usuario->update_user($id, $nombres, $apellidos, $documento, $correo, $phone);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "asigned_user_proyecto") {
    $user = intVal($_POST["user"]);
    $id_proyecto = intVal($_POST["id_proyecto"]);
    $usuario->asigned_user_proyecto($id_proyecto, $user);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "removed_asigned_user") {
    $id_proyecto = intVal($_POST["id_proyecto"]);
    $user_id = intVal($_POST["id_usuario"]);
    $usuario->remove_user_proyecto($id_proyecto, $user_id);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "removed_asigned_asesor") {
    $id_cliente = intVal($_POST["cliente"]);
    $user_id = intVal($_POST["usuario"]);
    $usuario->remove_cliente_asesor($id_cliente, $user_id);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "delete_user") {
    $id = $_POST["id"];
    $usuario->delete_user($id);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "delete_msg_plantilla") {
    $id = $_POST["id"];
    $usuario->delete_msg_plantilla($id);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "removed_proyecto") {
    $id_proyect = $_POST["id_proyect"];
    $usuario->removed_proyecto($id_proyect);
    echo $usuario->mensaje;
}

if ($_POST["funcion"] == "buscar_proyectos") {
    $usuario->buscar_proyectos();
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
if ($_POST["funcion"] == "buscar_lotes_by_proyecto") {
    $id_proyecto = $_POST["id_proyecto"];
    $usuario->buscar_lotes_by_proyecto($id_proyecto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_msg_template") {
    $user = $id_usuario;
    $usuario->buscar_msg_template($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "register-msg") {
    $user = $id_usuario;
    $nombre = $_POST["nombre"];
    $msg = $_POST["msg"];
    $usuario->register_msg($user, $nombre, $msg);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "edit-msg-plantilla") {
    $id_plantilla = $_POST["id"];
    $nombre = $_POST["nombre"];
    $msg = $_POST["msg"];
    $usuario->editmsgplantilla($id_plantilla, $nombre, $msg);
    echo $usuario->mensaje;
}

if ($_POST["funcion"] == "buscar_proyectos_user") {
    $json = array();
    $id_usuario = $_POST["id_cliente"];
    $usuario->buscar_proyectos_user($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id,
                'nombreProyecto' => $dato->proyecto_nombre,
                'asignado_usuario' => $dato->asignado_usuario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_mi_creator") {

    $user = $_SESSION["creator"];
    $usuario->buscar_proyectos_mi_creator($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_etiquetas_cliente") {
    $json = array();
    $id_cliente = $_POST["id_cliente"];
    $usuario->buscar_etiquetas_cliente($id_cliente);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        echo json_encode($usuario->datos);
    }
}
if ($_POST["funcion"] == "buscar_asesor_cliente") {
    $json = array();
    $id_cliente = $_POST["id_cliente"];
    $sede_id = $_POST["sede_id"];
    $usuario->buscar_asesor_cliente($sede_id, $id_cliente);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->usuario_id,
                'nombreAsesor' => $dato->asesor_nombre,
                'apellidoAsesor' => $dato->asesor_apellido,
                'asignado_usuario' => $dato->asignado_usuario,
                'sede_id' => $dato->sede_id
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_asesores") {

    $usuario->buscar_asesores($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_asesores_by_id") {
    $user = $_SESSION["creator"];
    $usuario->buscar_asesores($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_visitas_date") {
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $usuario->buscar_visitas_date($fecha_inicio, $fecha_fin);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_visitas_date_asesor") {
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $user = $_POST["usuario"];
    $usuario->buscar_visitas_date_asesor($fecha_inicio, $fecha_fin, $user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_resumen_eficiencia") {
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $usuario->buscar_resumen_eficiencia($fecha_inicio, $fecha_fin);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_resumen_eficiencia_asesor") {
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $user = $_POST["usuario"];
    $usuario->buscar_resumen_eficiencia_asesor($fecha_inicio, $fecha_fin, $user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_resumen_eficiencia_group_asesor") {
    $fecha_inicio = $_POST["fecha_inicio"];
    $data =  json_decode($_POST["asesores"]);
    $asesores = $data->asesores;
    // echo $data["asesores"];
    $fecha_fin = $_POST["fecha_fin"];
    $usuario->buscar_resumen_eficiencia_group_asesor($fecha_inicio, $fecha_fin, $asesores);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_resumen_eficiencia_usuario") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $user = $id_usuario;
    $usuario->buscar_resumen_eficiencia_asesor($fecha_inicio, $fecha_fin, $user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_resumen_eficiencia_usuario_proyecto") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $proyecto = $_POST["proyecto"];
    $user = $id_usuario;
    $usuario->buscar_resumen_eficiencia_usuario_proyecto($fecha_inicio, $fecha_fin, $user, $proyecto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_rendimiento") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $user = $id_usuario;
    $usuario->buscar_clientes_rendimiento($fecha_inicio, $fecha_fin, $user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_rendimiento_by_asesor") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $user = $_POST["usuario"];
    $usuario->buscar_clientes_rendimiento($fecha_inicio, $fecha_fin, $user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_rendimiento_group_asesor") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $data =  json_decode($_POST["asesores"]);
    $asesores = $data->asesores;
    $usuario->buscar_clientes_rendimiento_group_asesor($fecha_inicio, $fecha_fin, $asesores);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
// modulo de inversiones

if ($_POST["funcion"] == "buscar_inversiones_admin") {
    $usuario->buscar_inversiones_admin($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_inversiones_proyecto") {
    $proyecto_id = $_POST["id"];
    $usuario->buscar_inversiones_proyecto($proyecto_id);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "registrar_inversion") {
    $inversion = json_decode($_POST["inversion"]);
    $created_by = $id_usuario;
    $fecha_created = $_POST["fecha_created"];
    $usuario->registrar_inversion($inversion, $created_by, $fecha_created);

    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "buscar_gastos_total_admin") {
    $user = $id_usuario;
    $usuario->buscar_gastos_total_admin($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_gastos_admin_sede") {
    $user = $id_usuario;
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $usuario->buscar_gastos_admin_sede($user, $fecha_inicio, $fecha_fin);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_comisiones_admin") {
    $user = $id_usuario;
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $usuario->buscar_comisiones_admin($user, $fecha_inicio, $fecha_fin);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_proyectos_agentes") {
    $json = array();
    $id_usuario = $_SESSION["id_usuario"];
    $usuario->buscar_proyectos_agentes($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id,
                'nombreProyecto' => $dato->nombre_proyecto,
                'logo' => $dato->logo,
                'img_lotizador' => $dato->img_lotizador,
                "phone_number" => $dato->phone_number,
                "id_agente" => $dato->id_agente,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_empresa_usuario") {
    $user = $id_usuario;
    $usuario->buscar_empresa_usuario($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_sedes_empresa") {
    $empresa_id = $_POST["id"];
    $usuario->buscar_sedes_empresa($empresa_id);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_admin") {
    $json = array();
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_proyectos_admin($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_asesor") {

    $user = $_SESSION["id_usuario"];
    $usuario->buscar_proyectos_asesor($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_user_proyect") { //busca a usuarios con respecto a un proyecto
    $json = array();
    $id_proyecto = $_POST["id_proyecto"];
    $usuario->buscar_user_proyect($id_proyecto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id_usuario,
                'rol' => $dato->rol,
                'clienteNombre' => $dato->cliente_nombre,
                'clienteApellido' => $dato->cliente_apellido,
                'asignado_proyecto' => $dato->asignado_proyecto
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_admin") { //busca a usuarios  de admin
    $json = array();
    $usuario->buscar_usuarios_admin();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios") { //busca a usuarios  de admin
    $json = array();
    $usuario->buscar_usuarios($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_asesores") {
    $json = array();
    $id_usuario = $_SESSION["id_usuario"];
    $usuario->buscar_usuarios_asesores($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_visitas_usuarios") {
    $json = array();

    $id_usuario = intVal($_SESSION["id_usuario"]);
    $usuario->buscar_visitas_usuarios($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id_usuario' => $dato->id_usuario,
                'nombres' => $dato->nombres,
                'numero_visitas' => $dato->numero_visitas,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_servicios") {
    $json = array();
    $usuario->buscar_servicios();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id' => $dato->id,
                'nombre' => $dato->nombre_servicio,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_permisos_usuario") {
    $user_id = $_POST["id"];
    $usuario->buscar_permisos_usuario($user_id);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        echo json_encode($usuario->datos);
    }
}
if ($_POST["funcion"] == "delete_permiso_user") {
    $servicio = $_POST["id_servicio"];
    $cliente = $_POST["id_cliente"];
    $usuario->delete_permiso_user($servicio, $cliente);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "add_permiso_user") {
    $servicio = $_POST["id_servicio"];
    $cliente = $_POST["id_cliente"];
    $usuario->add_permiso_user($servicio, $cliente);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "buscar-imagen-proyect") {
    $id = $_POST["id_proyect"];
    $usuario->buscar_imagen_proyect($id);
    $json = array();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'imgURL' => $dato->img_url,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "agregar_lotes") {
    $id = $_POST['id']; //id del ptoyecto
    $lotes = $_POST['lotes'];
    $lotesArray = json_decode($lotes, true);
    // $usuario->crear_lote($id, $lote);
    foreach ($lotesArray as $lote) {
        # code..
        $loteAncho = $lote["loteAncho"];
        $loteLargo = $lote["loteLargo"];
        $loteArea = $lote["loteArea"];
        $loteMz = $lote["loteMz"];
        $loteNumero = $lote["loteNumero"];
        $lotePrecio = $lote["lotePrecio"];
        $tipo = $lote["tipo"];
        $coordenadas = json_encode($lote["coordenadas"]);
        $estado = $lote["estado"];
        $usuario->crear_lote($id, $loteAncho, $loteLargo, $loteArea, $loteMz, $loteNumero, $lotePrecio, $tipo, $estado, $coordenadas);
        echo $usuario->mensaje;
    }
}
if ($_POST["funcion"] == "editar_lotes") {
    $lote = $_POST["lote"];
    $id_lote = $lote["id"];
    $coordenadas = json_encode($lote["coordenadas"]);
    $usuario->editar_lote_coordenadas($id_lote, $coordenadas);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "editar_lote_info") {
    $data = json_decode($_POST['data'], true);
    $id = $data['id'];
    $numero = $data['numero'];
    $precio = $data['precio'];
    $costo = $data['costo'];
    $area = $data['area'];
    $ancho = $data['ancho'];
    $largo = $data['largo'];
    $mz_zona = $data['mz_zona'];
    $estado = $data['estado'];
    $usuario->editar_lote_info($id, $numero, $precio, $costo, $ancho, $largo, $area, $mz_zona, $estado);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "eliminar_lote") {
    $id_lote = $_POST['id_layer'];
    $usuario->eliminar_lote($id_lote);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "buscar_lotes") {
    $id = $_POST["id"];
    $usuario->buscar_lotes($id);
    $json = array();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id' => $dato->id,
                'ancho' => $dato->ancho,
                'largo' => $dato->largo,
                'area' => $dato->area,
                'numero' => $dato->numero,
                'mz_zona' => $dato->mz_zona,
                'precio' => $dato->precio,
                'tipo' => $dato->tipo,
                'cordinates' => json_decode($dato->cordinates),
                'estado' => $dato->estado
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "edit_lote") {
    $id = $_POST["id_lote"];
    $estado = $_POST["select"];
    $usuario->edit_lote($id, $estado);
    $usuario->mensaje;
}

// fin de section proyectos


if ($_POST["funcion"] == "buscar_piso_hab") {
    $json = array();
    $usuario->buscar_piso_hab();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_piso' => $dato->id_piso,
                'numero_piso' => $dato->numero_piso
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_habs_ocupaded") {
    $json = array();
    $usuario->buscar_ocupaded_habs();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_habitaciones' => $dato->id_habitaciones,
                'n_cuarto' => $dato->n_cuarto,
                'precio' => $dato->precio,
                'nombre_categoria' => $dato->nombre_categoria,
                'numero_piso' => $dato->numero_piso,
                'estado' => $dato->nombre_estado
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

// FIN DE HABITACIONES

// SECTION RESERVAS
if ($_POST["funcion"] == "crear_reserva") {
    $cliente = $_POST["cliente"];
    $documento = $_POST["documento"];
    $ingreso = $_POST["ingreso"];
    $salida = $_POST["salida"];
    $descuento = $_POST["descuento"];
    $adelanto = $_POST["adelanto"];
    $observacion = $_POST["observacion"];
    $total = $_POST["total"];
    $id_hab = $_POST["id_hab"];
    $total_descuento = $_POST["total_descuento"];
    $usuario->crear_reserva($cliente, $documento, $id_hab, $ingreso, $salida, $descuento, $adelanto, $observacion, $total, $total_descuento);
    $_SESSION["msg-reserva"] = "add-reserva";
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "cerrar_reserva") {
    $total_pagar = $_POST["total_pagar"];
    $id_reserva = $_POST["id_reserva"];
    $id_hab = $_POST["id_hab"];
    $fecha_today = $_POST["fecha_today"];
    $usuario->cerrar_reserva($total_pagar, $id_reserva, $id_hab, $fecha_today, $id_usuario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "habitacion_limpieza_terminada") {
    $key = $_POST["key"];
    $usuario->habitacion_limpieza_terminada($key);
    echo $usuario->mensaje;
}

// FIN DE SECTION RESERVAS

// SECTION DE CLIENTES 
// CREAR CLIENTES DESDE RECEPCION

if ($_POST["funcion"] == "buscar_visitas_programadas") {
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_visitas_programadas($user);
    echo json_encode($usuario->datos);
    // echo $usuario->mensaje;
}
if ($_POST["funcion"] == "buscar_etiquetas") {
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_etiquetas($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        echo json_encode($usuario->datos);
    }
    // echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_visita_cliente") {
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $cliente = $_POST["cliente"];
    $user = $_SESSION["id_usuario"];
    $tipo = $_POST["tipo"];
    $pendiente = $_POST["pendiente"];
    $usuario->add_visita_cliente($fecha, $hora, $cliente, $user, $tipo, $pendiente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "register_venta") {
    $fecha = $_POST["fecha"];
    $cliente = $_POST["cliente"];
    $status = $_POST["status"];
    $lote_id = $_POST["lote_id"];
    $precio_final = $_POST["precio_final"];
    $observaciones = $_POST["observaciones"];
    $created_by = $id_usuario;
    $user = $id_usuario;
    $usuario->register_venta($fecha, $cliente, $user, $status, $lote_id, $precio_final, $observaciones, $created_by);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "register_venta_admin") {
    // Accedemos a los datos de venta
    $data_venta = $_POST['data_venta'];

    // Acceder a los campos específicos
    $tipo = $data_venta['tipo'];
    $lote_id = $data_venta['lote_id'];
    $user_id = $data_venta['user_id'];
    $cliente_id = $data_venta['cliente_id'];
    $precio = $data_venta['precio'];
    $fecha_venta = $data_venta['fecha_venta'];
    $status = $data_venta['status'];
    $observaciones = $data_venta['observaciones'];

    $created_by = $id_usuario;
    $usuario->register_venta_admin($tipo, $fecha_venta, $cliente_id, $user_id, $status, $lote_id, $precio, $observaciones, $created_by);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_cliente") {
    $resultado = $_POST["result"];
    $proyect_id = $_POST["proyecto_id"];
    $sede_id = $_POST["sede_id"];
    $usuario->add_cliente($resultado, $proyect_id, $sede_id, $_SESSION["id_usuario"]);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_cliente2") {
    $jsonData = $_POST["result"];
    $data = json_decode($jsonData);
    $proyect_id = $_POST["proyecto_id"];
    $sede_id = $_POST["sede_id"];
    $origen_name = $_POST["origen_name"];
    $usuario->add_cliente2($data, $proyect_id, $sede_id, $origen_name, $_SESSION["id_usuario"]);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "add_etiqueta") {
    $nombre = $_POST["nombre"];
    $fecha = $_POST["fecha"];
    $usuario->add_etiqueta($nombre, $fecha,  $id_usuario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "edit_cliente") {
    $resultado = $_POST["result"];
    $proyect_id = $_POST["proyecto_id"];
    $cliente = $_POST["cliente"];
    $usuario->edit_cliente($resultado, $proyect_id, $cliente);
    echo $usuario->mensaje;
}

if ($_POST["funcion"] == "archived_cliente_asesor") {
    $cliente = intVal($_POST["id_cliente"]);
    $usuario->archived_cliente_asesor($cliente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "restaurar_cliente") {
    $cliente = intVal($_POST["cliente"]);
    $usuario->restaurar_cliente($cliente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "delete_cliente_asesor") {
    $cliente = intVal($_POST["id_cliente"]);
    $asesor = intVal($_SESSION["id_usuario"]);
    $usuario->delete_cliente_asesor($cliente, $asesor);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "unassign_my_asesor") {
    $cliente = intVal($_POST["id_cliente"]);
    $asesor = intVal($_SESSION["id_usuario"]);
    $usuario->unassign_my_asesor($cliente, $asesor);
    echo $usuario->mensaje;
}
// BUSCAR CLIENTES
if ($_POST["funcion"] == "buscar_pendientes") {

    $user = $_SESSION["id_usuario"];
    $usuario->buscar_pendientes($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_clientes") {
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_clientes($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_empresa") {
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_clientes_empresa($user);

    $jsonstring = json_encode($usuario->datos);
    echo $jsonstring;
}
// buscar_leads_subidos_by_asesores

if ($_POST["funcion"] == "buscar_leads_subidos_by_asesores") {
    $user = $_SESSION["id_usuario"]; //ID ADMIN
    $usuario->buscar_leads_subidos_by_asesores($user);
    $jsonstring = json_encode($usuario->datos);
    echo $jsonstring;
}
if ($_POST["funcion"] == "buscar_eventos_by_asesores") {
    $user = $_SESSION["id_usuario"]; //ID ADMIN
    $fecha_inicio = $_POST["fecha_inicio"]; //ID ADMIN
    $fecha_fin = $_POST["fecha_fin"]; //ID ADMIN
    $usuario->buscar_eventos_by_asesores($fecha_inicio, $fecha_fin, $user);
    $jsonstring = json_encode($usuario->datos);
    echo $jsonstring;
}
if ($_POST["funcion"] == "buscar_ventas_by_asesores") {
    $user = $_SESSION["id_usuario"]; //ID ADMIN
    $fecha_inicio = $_POST["fecha_inicio"]; //ID ADMIN
    $fecha_fin = $_POST["fecha_fin"]; //ID ADMIN
    $usuario->buscar_ventas_by_asesores($fecha_inicio, $fecha_fin, $user);
    $jsonstring = json_encode($usuario->datos);
    echo $jsonstring;
}
if ($_POST["funcion"] == "buscar_venta_by_lote") {
    $lote_id = $_POST["id"]; //ID LOTE
    $usuario->buscar_venta_by_lote($lote_id);
    $jsonstring = json_encode($usuario->datos);
    echo $jsonstring;
}
if ($_POST["funcion"] == "buscar_clientes_validar") {
    $json = array();
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_clientes_validados($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        echo json_encode($usuario->datos);
    }
}
if ($_POST["funcion"] == "buscar_ventas_empresa") {
    $json = array();
    $user = $_SESSION["id_usuario"];
    $usuario->buscar_ventas_empresa($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        echo json_encode($usuario->datos);
    }
}
if ($_POST["funcion"] == "buscar_group_clientes_fecha") {

    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $data =  json_decode($_POST["asesores"]);
    $asesores = $data->asesores;
    $usuario->buscar_group_clientes_fecha($fecha_inicio, $fecha_fin, $asesores);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_group_asignados_fecha") {
    $adminuser = $_SESSION["id_usuario"];
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $data =  json_decode($_POST["asesores"]);
    $asesores = $data->asesores;
    $usuario->buscar_group_asignados_fecha($adminuser, $fecha_inicio, $fecha_fin, $asesores);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "completar_tarea") {
    $id_task = $_POST["id_task"];
    $usuario->completar_tarea($id_task);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "validar_tarea") {
    $id_task = $_POST["id_task"];
    $usuario->validar_tarea($id_task);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "validar_interaccion") {
    $id_task = $_POST["id_task"];
    $status = $_POST["status"];
    $usuario->validar_interaccion($id_task, $status);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "validar_venta") {
    $id_task = $_POST["id_task"];
    $status = $_POST["status"];
    $usuario->validar_venta($id_task, $status);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_lote_venta") {
    $id_task = $_POST["id_task"];
    $lote_id = $_POST["lote_id"];
    $precio = $_POST["precio"];
    $usuario->update_lote_venta($id_task, $lote_id, $precio);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_lote") {
    $id = $_POST["id"];
    $status = $_POST["status"];
    $usuario->update_lote($id, $status);
    echo json_encode($usuario->mensaje);
}
if ($_POST["funcion"] == "register_visita_agenda") {
    $id_task = $_POST["task"];
    $cliente = $_POST["cliente"];
    $status = $_POST["status"];
    $usuario->register_visita_agenda($id_task, $cliente, $status);
    echo $usuario->mensaje;
}
// target user
if ($_POST["funcion"] == "buscar_user_target") {
    $json = array();
    $usuario->buscar_user_target($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_user_asesor") {
    $json = array();
    $usuario->buscar_user_asesor($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
// business controller
if ($_POST["funcion"] == "buscar_user_info_empresa") {
    $json = array();
    $usuario->buscar_user_info_empresa($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_by_user_info_empresa") {
    $json = array();
    $user = $_SESSION["creator"];
    $usuario->buscar_user_info_empresa($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {

        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
// targets controller
if ($_POST["funcion"] == "buscar_user_target_socials") {
    $json = array();
    $usuario->buscar_user_target_socials($_SESSION["id_usuario"]);
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
if ($_POST["funcion"] == "update_social_networks") {
    $user_id = $id_usuario;
    $redes_sociales = json_decode($_POST["redes_sociales"]);
    $usuario->update_social_networks($user_id, $redes_sociales);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_social_networks_id") {
    $user_id = $id_usuario;
    $redes_sociales = json_decode($_POST["redes_sociales"]);
    $usuario->update_social_networks_id($user_id, $redes_sociales);
    echo $usuario->mensaje;
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
if ($_POST["funcion"] == "update_img_proyect") {
    $ruta = $_POST["ruta"];
    $id = $_POST["id"];
    $usuario->update_img_proyect($id, $ruta);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "subirimagenesgallery") {
    $galeria = $_POST["galeria"];
    $id = $_POST["id"];
    $usuario->subirimagenesgallery($id, $galeria);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "subir_amenidades") {
    $amenidades = json_decode($_POST["amenidades"]);

    $id = $_POST["id"];
    $usuario->subir_amenidades($id, $amenidades);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_amenidad") {
    $amenidad = json_decode($_POST["data"]);

    $usuario->update_amenidad($amenidad);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "eliminar_amenidad") {
    $id = $_POST["id"];
    $usuario->eliminar_amenidad($id);
    echo $usuario->mensaje;
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
if ($_POST["funcion"] == "subir_maps_proyect") {
    $id = $_POST["id"];
    $maps_url = $_POST["maps_url"];
    $usuario->subir_maps_proyect($id, $maps_url);

    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "subir_description_proyect") {
    $id = $_POST["id"];
    $description = $_POST["description"];
    $usuario->subir_description_proyect($id, $description);

    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "subir_video_proyect") {
    $id = $_POST["id"];
    $video = $_POST["video"];
    $usuario->subir_video_proyect($id, $video);

    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "multimedia_proyecto") {
    $id = $_POST["id"];
    $json_resultado = $usuario->multimedia_proyecto($id);

    // Devuelve el JSON al cliente
    echo $json_resultado;
}
if ($_POST["funcion"] == "eliminar_img") {
    $id = $_POST["id"];
    $usuario->eliminar_img($id);

    // Devuelve el JSON al cliente
    echo $usuario->mensaje;
}

if ($_POST["funcion"] == "update_user_target") {
    $json = array();
    $data = json_decode($_POST["data"]);
    $usuario->update_user_target($data, $id_usuario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_user_business") {
    $json = array();
    $data = json_decode($_POST["data"]);
    $usuario->update_user_business($data, $id_usuario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_business") {
    $json = array();
    $data = json_decode($_POST["data"]);
    $id = $_POST["id"];
    $usuario->update_business($data, $id);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "buscar_clientes_by_asesor") {
    $json = array();
    $usuario->buscar_clientes_by_asesor($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            if ($dato->asigned === $id_usuario) {
                $asigned = "si";
            } else {
                $asigned = "no";
            }
            $json[] = array(
                'id' => $dato->id_cliente,
                'nombres' => $dato->nombres,
                'apellidos' => $dato->apellidos,
                'documento' => $dato->documento,
                'correo' => $dato->correo,
                'celular' => $dato->celular,
                'telefono' => $dato->telefono,
                'status' => $dato->status,
                'origen' => $dato->origen,
                'ciudad' => $dato->ciudad,
                'createdBy' => $dato->asigned,
                'campania' => $dato->campania,
                'Pais' => $dato->pais,
                'nombre_proyecto' => $dato->nombre_proyecto,
                'fecha_creacion' => $dato->fecha_creation,
                'hora_creacion' => $dato->hora_creation,
                'proyecto_id' => $dato->proyet_id,
                'id_task' => $dato->id_task,
                'task_status' => $dato->task_status,
                'fecha_visita' => $dato->fecha_visita,
                'hora_visita' => $dato->hora_visita,
                'etiquetas' => $dato->etiquetas,
                'asignedUser' => $asigned,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_by_admin_papelera") {
    $json = array();
    $usuario->buscar_clientes_by_admin_papelera($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        $jsonstring = json_encode($usuario->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_clientes_by_asesor_papelera") {
    $json = array();
    $usuario->buscar_clientes_by_asesor_papelera($_SESSION["id_usuario"]);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id_cliente,
                'nombres' => $dato->nombres,
                'apellidos' => $dato->apellidos,
                'documento' => $dato->documento,
                'correo' => $dato->correo,
                'celular' => $dato->celular,
                'telefono' => $dato->telefono,
                'status' => $dato->status,
                'origen' => $dato->origen,
                'ciudad' => $dato->ciudad,
                // 'created_cliente' => $dato->created_cliente,
                'campania' => $dato->campania,
                'Pais' => $dato->pais,
                'nombre_proyecto' => $dato->nombre_proyecto,
                'id_task' => $dato->id_task,
                'task_status' => $dato->task_status,
                'fecha_visita' => $dato->fecha_visita,
                'hora_visita' => $dato->hora_visita,
                'etiquetas' => $dato->etiquetas,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
// funciones de seguimiento
if ($_POST["funcion"] == "remove_etiqueta_lead") {
    $id_etiqueta = $_POST["id_etiqueta"];
    $cliente = $_POST["cliente"];
    $usuario->remove_etiqueta_lead($id_etiqueta, $cliente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "seguimiento_cliente") {
    $observacion = $_POST["observacion"];
    $user = intVal($_SESSION["id_usuario"]);
    $cliente = intval($_POST["cliente"]);
    $status = $_POST["status"];
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $usuario->seguimiento_cliente($user, $cliente, $observacion, $status, $fecha, $hora);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "buscar_historial_seguimiento") {
    $cliente = intval($_POST["cliente"]);
    $usuario->buscar_historial_seguimiento($cliente);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'observacion' => $dato->observacion,
                'status' => $dato->status,
                'fecha' => $dato->fecha_register,
                'hora' => $dato->hora_register,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_historial_status") {
    $user = $id_usuario;
    $usuario->buscar_historial_status($user);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'observacion' => $dato->observacion,
                'cliente_id' => $dato->cliente_id,
                'status' => $dato->status,
                'fecha' => $dato->fecha_register,
                'hora' => $dato->hora_register,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

// FIN DE SECTION DE CLIENTES CREAR CLIENTES DESDE RECEPCION