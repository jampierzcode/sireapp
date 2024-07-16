<?php
include_once "Conexion.php";

class Caja
{
    var $datos;
    var $mensaje;
    public $conexion;

    public function __construct()
    {
        // se va a conectar a la base de datos
        $db = new Conexion(); // $db ya no es una variable es un objeto
        $this->conexion = $db->pdo;
        // $this hace referencia al objeto que se crea en una instancia de clase
    }
    function buscar_cajas($sede_id)
    {
        $sql = "SELECT * FROM caja where sede_id=:sede_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':sede_id' => $sede_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_historial_caja($caja_id)
    {
        $sql = "SELECT * FROM turno_caja where caja_id=:caja_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':caja_id' => $caja_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_caja_abierta($id_usuario)
    {
        $sql = "SELECT tc.*, c.nombre, u.nombre as nombre_cajero, u.apellido as apellido_cajero FROM turno_caja tc inner join caja c on tc.caja_id=c.id inner join usuario u on tc.user_id=u.id_usuario where tc.user_id=:id_usuario AND tc.status = 'ABIERTO'";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_finanzas_turno($caja_id)
    {
        $sql = "SELECT t.*, c.nombres as nombre_cliente, c.apellidos as apellido_cliente, c.documento, p.nombreProyecto as nombre_proyecto FROM transacciones t inner join ventas_financiero v on t.venta_id=v.id inner join proyectos p on v.proyecto_id=p.id inner join cliente c on v.cliente_id=c.id_cliente where t.turno_id=:turno_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':turno_id' => $caja_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_finanzas_admin($user, $fecha_inicio, $fecha_fin)
    {
        $sql = "SELECT t.*, c.nombres as nombre_cliente, c.apellidos as apellido_cliente, c.documento, p.nombreProyecto as nombre_proyecto, p.id as proyecto_id, v.sede_id FROM transacciones t inner join ventas_financiero v on t.venta_id=v.id inner join user_sede us on v.sede_id=us.sede_id inner join proyectos p on v.proyecto_id=p.id inner join cliente c on v.cliente_id=c.id_cliente where us.user_id=:id_usuario AND t.fecha >= :fecha_inicio AND t.fecha <= :fecha_fin";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $user, ":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_gastos_admin($user, $fecha_inicio, $fecha_fin)
    {
        $sql = "SELECT g.*, c.sede_id FROM gastos g INNER JOIN turno_caja tc ON g.turno_id = tc.id
        INNER JOIN caja c ON tc.caja_id = c.id
        INNER JOIN user_sede us ON c.sede_id = us.sede_id
        WHERE us.user_id = :id_usuario AND g.fecha >= :fecha_inicio AND g.fecha <= :fecha_fin";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $user, ":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ingresos_admin($user, $fecha_inicio, $fecha_fin)
    {
        $sql = "SELECT i.*, c.sede_id FROM ingresos i INNER JOIN turno_caja tc ON i.turno_id = tc.id
        INNER JOIN caja c ON tc.caja_id = c.id
        INNER JOIN user_sede us ON c.sede_id = us.sede_id
        WHERE us.user_id = :id_usuario AND i.fecha >= :fecha_inicio AND i.fecha <= :fecha_fin";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $user, ":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_gastos_turno($caja_id)
    {
        $sql = "SELECT * FROM gastos where turno_id=:turno_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':turno_id' => $caja_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ingresos_turno($caja_id)
    {
        $sql = "SELECT * FROM ingresos where turno_id=:turno_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':turno_id' => $caja_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ventas_caja($user)
    {
        $sql = "SELECT v.*, p.nombreProyecto as nombre_proyecto, c.nombres as nombre_cliente, c.apellidos as apellido_cliente, c.documento FROM ventas_financiero v inner join cliente c on v.cliente_id=c.id_cliente inner join proyectos p on v.proyecto_id=p.id where v.cajero_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ventas_admin($user)
    {
        $sql = "SELECT v.*, p.nombreProyecto as nombre_proyecto, c.nombres as nombre_cliente, c.apellidos as apellido_cliente, c.documento FROM ventas_financiero v join user_sede us on v.sede_id=us.sede_id join usuario u on us.user_id=u.id_usuario inner join proyectos p on v.proyecto_id=p.id inner join cliente c on v.cliente_id=c.id_cliente WHERE us.user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_detalle_venta($venta_id)
    {
        $sql = "SELECT d.*, l.* FROM detalle_venta d inner join lotes l on d.producto_id=l.id  WHERE venta_id=:venta_id ";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':venta_id' => $venta_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_gastos_caja($user)
    {
        $sql = "SELECT g.* FROM gastos g where g.user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ingresos_caja($user)
    {
        $sql = "SELECT i.* FROM ingresos i where i.user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_cronograma_pagos($user)
    {
        $sql = "SELECT p.* FROM ventas_financiero v join pagos  p on v.id = p.venta_id where v.tipo_pago=1 AND v.status = 'VENTA'  AND v.cajero_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_cronograma_pagos_admin($user)
    {
        $sql = "SELECT p.* FROM ventas_financiero v join pagos  p on v.id = p.venta_id JOIN user_proyect up on v.proyecto_id=up.proyecto_id join usuario u on up.user_id=u.id_usuario where v.tipo_pago=1 AND v.status = 'VENTA'  AND u.id_usuario=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_cronograma_pagos_venta($id_venta)
    {
        $sql = "SELECT p.* FROM pagos p where p.venta_id=:venta_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':venta_id' => $id_venta));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function registrar_turno($caja_id, $fecha, $monto_apertura, $user)
    {
        $sql = "INSERT INTO turno_caja (fecha_apertura, monto_apertura, user_id, caja_id, status) VALUES (:fecha_apertura, :monto_apertura, :user_id, :caja_id, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(':caja_id' => $caja_id, ':fecha_apertura' => $fecha, ':monto_apertura' => $monto_apertura, ':user_id' => $user, ':status' => "ABIERTO"));
            $this->mensaje = "add-turno";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function cerrar_turno($id, $monto_cierre, $fecha_cierre)
    {
        $sql = "UPDATE turno_caja SET monto_cierre=:monto_cierre, fecha_cierre=:fecha_cierre, status='CERRADO' WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":monto_cierre" => $monto_cierre, ":fecha_cierre" => $fecha_cierre, ":id" => $id));
            $this->mensaje = "add-cierre";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-cierre";
            return $this->mensaje;
        }
    }
    function registrar_venta_financiero($monto_separacion, $fecha_programacion, $tipo_pago, $monto_inicial, $fecha, $hora, $proyecto_id, $sede_id, $cliente_id, $asesor_id, $tipo_venta, $total, $user, $status)
    {
        $response = [];
        $sql = "INSERT INTO ventas_financiero (cliente_id, asesor_id, cajero_id, proyecto_id, sede_id, fecha, hora, tipo_venta, total, tipo_pago, monto_inicial, monto_separado, fecha_programacion, status) VALUES (:cliente_id, :asesor_id, :cajero_id, :proyecto_id, :sede_id, :fecha, :hora, :tipo_venta, :total, :tipo_pago, :monto_inicial, :monto_separado, :fecha_programacion, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":cliente_id" => $cliente_id, ":asesor_id" => $asesor_id, ":cajero_id" => $user, ":proyecto_id" => $proyecto_id, ":sede_id" => $sede_id, ":fecha" => $fecha, ":hora" => $hora, ":tipo_venta" => $tipo_venta, ":total" => $total, ":tipo_pago" => $tipo_pago, ":monto_inicial" => $monto_inicial, ":monto_separado" => $monto_separacion, ":fecha_programacion" => $fecha_programacion, ":status" => $status));
            $venta_id = $this->conexion->lastInsertId();
            $response[] = [
                "venta_id" => $venta_id,
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function actualizar_venta($tipo_pago, $monto_change, $status, $id_venta)
    {
        $response = [];
        $sql = "UPDATE ventas_financiero SET monto_inicial=:monto_inicial, tipo_pago=:tipo_pago, status=:status WHERE id=:id_venta";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":monto_inicial" => $monto_change, ":tipo_pago" => $tipo_pago, ":status" => $status, ":id_venta" => $id_venta));
            $response[] = [
                "msg" => "update-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_gasto_admin($sede_id, $fecha, $proyecto_id, $tipo_gasto, $monto_gasto, $descripcion, $user)
    {
        $response = [];
        $sql = "INSERT INTO gastos_admin (sede_id, monto_gasto, tipo_gasto, proyecto_id, fecha, descripcion, user_id) VALUES (:sede_id, :monto_gasto, :tipo_gasto, :proyecto_id, :fecha, :descripcion, :user_id)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":sede_id" => $sede_id, ":monto_gasto" => $monto_gasto, ":tipo_gasto" => $tipo_gasto, ":proyecto_id" => $proyecto_id, ":fecha" => $fecha, ":descripcion" => $descripcion, ":user_id" => $user));
            $response[] = [
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_gasto_financiero($fecha, $proyecto_id, $tipo_gasto, $monto_gasto, $descripcion, $turno_id, $user)
    {
        $response = [];
        $sql = "INSERT INTO gastos (turno_id, monto_gasto, tipo_gasto, proyecto_id, fecha, descripcion, user_id) VALUES (:turno_id, :monto_gasto, :tipo_gasto, :proyecto_id, :fecha, :descripcion, :user_id)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":turno_id" => $turno_id, ":monto_gasto" => $monto_gasto, ":tipo_gasto" => $tipo_gasto, ":proyecto_id" => $proyecto_id, ":fecha" => $fecha, ":descripcion" => $descripcion, ":user_id" => $user));
            $response[] = [
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_ingreso_financiero($fecha, $proyecto_id, $tipo_ingreso, $monto_ingreso, $descripcion, $turno_id, $user)
    {
        $response = [];
        $sql = "INSERT INTO ingresos (turno_id, monto_ingreso, tipo_ingreso, proyecto_id, fecha, descripcion, user_id) VALUES (:turno_id, :monto_ingreso, :tipo_ingreso, :proyecto_id, :fecha, :descripcion, :user_id)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":turno_id" => $turno_id, ":monto_ingreso" => $monto_ingreso, ":tipo_ingreso" => $tipo_ingreso, ":proyecto_id" => $proyecto_id, ":fecha" => $fecha, ":descripcion" => $descripcion, ":user_id" => $user));
            $response[] = [
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_transaccion($venta_id, $turno, $suma, $metodo_pago, $numero_operacion, $fecha, $motivo_operacion)
    {
        $response = [];
        $sql = "INSERT INTO transacciones (monto, metodo_pago, numero_operacion, turno_id, venta_id, fecha, motivo_operacion) VALUES (:monto, :metodo_pago, :numero_operacion, :turno_id, :venta_id, :fecha, :motivo_operacion)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":monto" => $suma, ":metodo_pago" => $metodo_pago, ":numero_operacion" => $numero_operacion, ":turno_id" => $turno, ":venta_id" => $venta_id, ":fecha" => $fecha, ":motivo_operacion" => $motivo_operacion));
            $response[] = [
                "msg" => "add-transaccion"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function pagar_cuota($id, $fecha_pagada, $monto, $status)
    {
        $response = [];
        $sql = "INSERT INTO cuotas_pago(monto, fecha_pago, status, cuota_id) VALUES(?,?,?,?)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array($monto, $fecha_pagada, $status, $id));
            $response[] = [
                "msg" => "add-pago"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function update_cuota($id, $fecha_pagada, $status)
    {
        $response = [];
        $sql = "UPDATE pagos SET fecha_pagada = :fecha_pagada, status=:status WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":fecha_pagada" => $fecha_pagada, ":status" => $status, ":id" => $id));
            $response[] = [
                "msg" => "add-pago"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function get_pagos_cuota($id)
    {
        $sql = "SELECT * FROM cuotas_pago WHERE cuota_id=?";
        $query = $this->conexion->prepare($sql);

        $query->execute(array($id));
        $this->datos = $query->fetchAll(); // retorna objetos o no


        return $this->datos;
    }
    // COMISIONES
    function generar_comision(
        $user_id,
        $id_venta,
        $asesor_id,
        $tipo_comision,
        $monto_tipo_comision,
        $monto_comision,
        $tipo_pago_comision,
        $fecha
    ) {
        $response = [];
        $sql = "INSERT INTO comisiones (user_id, monto_comision, venta_id, tipo_comision, monto_tipo_comision, tipo_pago, asesor_id, fecha) VALUES (:user_id, :monto_comision, :venta_id, :tipo_comision, :monto_tipo_comision, :tipo_pago, :asesor_id, :fecha)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":user_id" => $user_id, ":monto_comision" => $monto_comision, ":venta_id" => $id_venta, ":tipo_comision" => $tipo_comision, ":monto_tipo_comision" => $monto_tipo_comision, ":tipo_pago" => $tipo_pago_comision, ":asesor_id" => $asesor_id, ":fecha" => $fecha));
            $response[] = [
                "msg" => "add-comision"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function buscar_comisiones_admin($user_id)
    {
        $sql = "SELECT * FROM comisiones where user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    // fin de comisiones
    function registrar_detalle_venta($data, $venta_id)
    {
        $response = [];

        try {
            $sql = "INSERT INTO detalle_venta(producto_id, cantidad, total, precio_final, venta_id) VALUES (?,?,?,?,?)";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $producto) {
                $values = array(
                    $producto->id,
                    $producto->quantity,
                    $producto->price,
                    $producto->price_final,
                    $venta_id,
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al registrar detalle: " . implode(", ", $query->errorInfo()));
                }
            }
            $response[] = [
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_cronograma_pagos($data, $venta_id)
    {
        $response = [];

        try {
            $sql = "INSERT INTO pagos(n_cuota, monto_pago, fecha_pago, tipo_pago, venta_id, status) VALUES (?,?,?,?,?,?)";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $pago) {
                $values = array(
                    $pago->n_cuota,
                    $pago->monto,
                    $pago->fecha,
                    $pago->tipo,
                    $venta_id,
                    $pago->status
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al registrar cronograma: " . implode(", ", $query->errorInfo()));
                }
            }
            $response[] = [
                "msg" => "add-cronograma"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function cambiar_estado($data, $estado)
    {
        $response = [];
        try {
            $idLotes = array_map(function ($lote) {
                return $lote->id;
            }, $data);
            $sql = "UPDATE lotes SET estado=:estado WHERE id IN (" . implode(',', $idLotes) . ")";
            $query = $this->conexion->prepare($sql);
            if (!$query->execute(array(":estado" => $estado))) {
                throw new Exception("Error al cambiar estado: " . implode(", ", $query->errorInfo()));
            }
            $response[] = [
                "msg" => "change_estado"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
}
