<?php
include_once '../modelo/Caja.php';
$caja = new Caja();
session_start();
$id_usuario = $_SESSION['id_usuario'];

if ($_POST["funcion"] == "buscar_cajas") {
    $sede_id = $_POST["sede_id"];
    $caja->buscar_cajas($sede_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_caja_abierta") {
    $user = $id_usuario;
    $caja->buscar_caja_abierta($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        if (!isset($_SESSION["caja_abierta"])) {
            $_SESSION["caja_abierta"] = $caja->datos[0]->id;
        }
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
// ventas financiero
if ($_POST["funcion"] == "registrar_venta_financiero") {
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $proyecto_id = $_POST["proyecto_id"];
    $sede_id = $_POST["sede_id"];
    $cliente_id = $_POST["cliente_id"];
    $asesor_id = $_POST["asesor_id"];
    $tipo_venta = $_POST["tipo_venta"];
    $tipo_pago = $_POST["tipo_pago"];
    $monto_inicial = $_POST["monto_inicial"];
    $monto_separacion = $_POST["monto_separacion"];
    $fecha_programacion = $_POST["fecha_programacion"];
    $status = $_POST["status"];
    $total = $_POST["suma"];
    $user = $id_usuario;
    $caja->registrar_venta_financiero($monto_separacion, $fecha_programacion, $tipo_pago, $monto_inicial, $fecha, $hora, $proyecto_id, $sede_id, $cliente_id, $asesor_id, $tipo_venta, $total, $user, $status);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "actualizar_venta") {
    $tipo_pago = $_POST["tipo_pago"];
    $monto_change = $_POST["monto_change"];
    $status = $_POST["status"];
    $id_venta = $_POST["id_venta"];
    $caja->actualizar_venta($tipo_pago, $monto_change, $status, $id_venta);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_gasto_admin") {
    $sede_id = $_POST["sede_id"];
    $fecha = $_POST["fecha"];
    $proyecto_id = $_POST["proyecto_id"];
    $tipo_gasto = $_POST["tipo_gasto"];
    $monto_gasto = $_POST["monto_gasto"];
    $descripcion = $_POST["descripcion"];
    $user = $id_usuario;
    $caja->registrar_gasto_admin($sede_id, $fecha, $proyecto_id, $tipo_gasto, $monto_gasto, $descripcion, $user);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_gasto_financiero") {
    $fecha = $_POST["fecha"];
    $proyecto_id = $_POST["proyecto_id"];
    $tipo_gasto = $_POST["tipo_gasto"];
    $monto_gasto = $_POST["monto_gasto"];
    $descripcion = $_POST["descripcion"];
    $turno_id = $_POST["turno_id"];
    $user = $id_usuario;
    $caja->registrar_gasto_financiero($fecha, $proyecto_id, $tipo_gasto, $monto_gasto, $descripcion, $turno_id, $user);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_ingreso_financiero") {
    $fecha = $_POST["fecha"];
    $proyecto_id = $_POST["proyecto_id"];
    $tipo_ingreso = $_POST["tipo_ingreso"];
    $monto_ingreso = $_POST["monto_ingreso"];
    $descripcion = $_POST["descripcion"];
    $turno_id = $_POST["turno_id"];
    $user = $id_usuario;
    $caja->registrar_ingreso_financiero($fecha, $proyecto_id, $tipo_ingreso, $monto_ingreso, $descripcion, $turno_id, $user);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_detalle_venta") {
    $venta_id = $_POST["venta_id"];
    $data = json_decode($_POST["cart_items"]);
    $caja->registrar_detalle_venta($data, $venta_id);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_cronograma_pagos") {
    $venta_id = $_POST["venta_id"];
    $data = json_decode($_POST["cronograma"]);
    $caja->registrar_cronograma_pagos($data, $venta_id);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "cambiar_estado") {
    $data = json_decode($_POST["cart_items"]);
    $estado = $_POST["tipo_venta"];
    $caja->cambiar_estado($data, $estado);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_transaccion") {
    $venta_id = $_POST["venta_id"];
    $turno = $_POST["turno"];
    $suma = $_POST["suma"];
    $metodo_pago = $_POST["metodo_pago"];
    $numero_operacion = $_POST["numero_operacion"];
    $fecha = $_POST["fecha"];
    $motivo_operacion = $_POST["motivo_operacion"];
    $caja->registrar_transaccion($venta_id, $turno, $suma, $metodo_pago, $numero_operacion, $fecha, $motivo_operacion);
    echo json_encode($caja->mensaje);
}
// pago de cuotas
if ($_POST["funcion"] == "pagar_cuota") {
    $fecha_pagada = $_POST["fecha_pagada"];
    $id = $_POST["id"];
    $monto = $_POST["monto"];
    $status = $_POST["status"];
    $caja->pagar_cuota($id, $fecha_pagada, $monto, $status);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "update_cuota") {
    $fecha_pagada = $_POST["fecha_pagada"];
    $id = $_POST["id"];
    $status = $_POST["status"];
    $caja->update_cuota($id, $fecha_pagada, $status);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "get_pagos_cuota") {
    $id = $_POST["id"];
    $caja->get_pagos_cuota($id);
    echo json_encode($caja->datos);
}
// comisiones
if ($_POST["funcion"] == "generar_comision") {
    $user_id = $id_usuario;
    $id_venta = $_POST["id_venta"];
    $asesor_id = $_POST["asesor_id"];
    $tipo_comision = $_POST["tipo_comision"];
    $monto_tipo_comision = $_POST["monto_tipo_comision"];
    $monto_comision = $_POST["monto_comision"];
    $tipo_pago_comision = $_POST["tipo_pago_comision"];
    $fecha = $_POST["fecha"];
    $caja->generar_comision(
        $user_id,
        $id_venta,
        $asesor_id,
        $tipo_comision,
        $monto_tipo_comision,
        $monto_comision,
        $tipo_pago_comision,
        $fecha
    );
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "buscar_comisiones_admin") {
    $user_id = $id_usuario;
    $caja->buscar_comisiones_admin($user_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
// find e comisiones
if ($_POST["funcion"] == "buscar_gastos_turno") {
    $caja_id = $_POST["id"];
    $caja->buscar_gastos_turno($caja_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ingresos_turno") {
    $caja_id = $_POST["id"];
    $caja->buscar_ingresos_turno($caja_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_finanzas_turno") {
    $caja_id = $_POST["id"];
    $caja->buscar_finanzas_turno($caja_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_finanzas_admin") {
    $user = $id_usuario;
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $caja->buscar_finanzas_admin($user, $fecha_inicio, $fecha_fin);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_gastos_admin") {
    $user = $id_usuario;
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $caja->buscar_gastos_admin($user, $fecha_inicio, $fecha_fin);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ingresos_admin") {
    $user = $id_usuario;
    $fecha_inicio = $_POST["fecha_inicio"];
    $fecha_fin = $_POST["fecha_fin"];
    $caja->buscar_ingresos_admin($user, $fecha_inicio, $fecha_fin);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ventas_caja") {
    $user = $id_usuario;
    $caja->buscar_ventas_caja($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ventas_admin") {
    $user = $id_usuario;
    $caja->buscar_ventas_admin($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_detalle_venta") {
    $venta_id = $_POST["id"];
    $caja->buscar_detalle_venta($venta_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_gastos_caja") {
    $user = $id_usuario;
    $caja->buscar_gastos_caja($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ingresos_caja") {
    $user = $id_usuario;
    $caja->buscar_ingresos_caja($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_historial_caja") {
    $caja_id = $_POST["id"];
    $caja->buscar_historial_caja($caja_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cronograma_pagos") {
    $user = $id_usuario;
    $caja->buscar_cronograma_pagos($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cronograma_pagos_admin") {
    $user = $id_usuario;
    $caja->buscar_cronograma_pagos_admin($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cronograma_pagos_venta") {
    $id_venta = $_POST["id_venta"];
    $caja->buscar_cronograma_pagos_venta($id_venta);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "registrar_turno") {
    $caja_id = $_POST["id"];
    $fecha = $_POST["fecha"];
    $monto_apertura = $_POST["monto_apertura"];
    $user = $id_usuario;
    $caja->registrar_turno($caja_id, $fecha, $monto_apertura, $user);
    echo $caja->mensaje;
}
if ($_POST["funcion"] == "cerrar_turno") {
    $id = $_POST["id"];
    $monto_cierre = $_POST["monto_cierre"];
    $fecha_cierre = $_POST["fecha_cierre"];
    $caja->cerrar_turno($id, $monto_cierre, $fecha_cierre);
    echo $caja->mensaje;
}
