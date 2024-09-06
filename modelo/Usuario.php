<?php
include_once "Conexion.php";

class Usuario
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
    function buscar_roles()
    {
        try {
            $sql = "SELECT * FROM  roles";
            $query = $this->conexion->prepare($sql);
            $query->execute();
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {

                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {

            $this->mensaje = "error:" + $error->getMessage();
        }
    }

    function view_permisos($id_usuario)
    {
        $sql = "SELECT SER.nombre_servicio FROM permisos as PER inner join servicios as SER on PER.id_servicio=SER.id inner join usuario as USER on PER.id_usuario=USER.id_usuario WHERE PER.id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }
    function view_creador_permiso($creador)
    {
        $sql = "SELECT
        CASE WHEN EXISTS (
            SELECT 1
            FROM permisos
            WHERE id_servicio = 3
            AND id_usuario = :id_usuario
        ) THEN 'SI' ELSE 'NO' END AS service_crm";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $creador));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }
    function Loguearse($username, $password)
    {
        $sql = "SELECT id_usuario, nombre, apellido, createdBy as creator, usuarioRol as tipo FROM usuario WHERE user=:username and password=:password and usuarioStatus = 1";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':username' => $username, ':password' => $password));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }
    function getUsuario($id_usuario)
    {
        $sql = "SELECT * FROM usuario WHERE id_usuario=:id and usuarioStatus = 1";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id' => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }

    function buscar_datos_contabilidad($id_usuario)
    {
        $sql = "SELECT count(*) as proyectos, (SELECT count(*) FROM usuario WHERE usuario.createdBy=:id_usuario) as asesores FROM user_proyect where user_proyect.user_id=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario" => $id_usuario));
        $this->datos = $query->fetchAll();
        // $this->datos = $query->fetchColumn();
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = 0;
            return $this->mensaje;
        }
    }
    function buscar_piso_hab()
    {
        $sql = "SELECT id_piso, numero_piso FROM piso";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "Falta crear pisos";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_admin()
    {
        $sql = "SELECT ADMIN.id_usuario, ADMIN.nombre, ADMIN.apellido, ADMIN.dni, ADMIN.correo, ADMIN.user, CREATOR.nombre as creator, r.nombreRol as nombre_rol FROM usuario as ADMIN inner join usuario as CREATOR on ADMIN.createdBy=CREATOR.id_usuario inner join roles as r on ADMIN.usuarioRol=r.id WHERE ADMIN.usuarioRol=2 AND ADMIN.usuarioStatus = 1";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-users-admin";
            return $this->mensaje;
        }
    }
    function buscar_usuarios($user_id)
    {
        $sql = "SELECT DISTINCT u.*, r.nombreRol, us.sede_id, s.direccion, s.ciudad, s.name_reference
        FROM usuario u
        INNER JOIN user_sede us ON u.id_usuario = us.user_id inner join roles r  on u.usuarioRol=r.id inner join sede s on us.sede_id=s.id
        WHERE us.sede_id IN (
            SELECT us2.sede_id
            FROM user_sede us2
            WHERE us2.user_id = :id_usuario
        ) AND u.id_usuario != :id_usuario
        AND u.usuarioRol != 2;";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario" => $user_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_asesores($id_usuario)
    {
        $sql = "SELECT DISTINCT u.*, r.nombreRol, us.sede_id, s.direccion, s.ciudad, s.name_reference
        FROM usuario u
        INNER JOIN user_sede us ON u.id_usuario = us.user_id inner join roles r  on u.usuarioRol=r.id inner join sede s on us.sede_id=s.id
        WHERE us.sede_id IN (
            SELECT us2.sede_id
            FROM user_sede us2
            WHERE us2.user_id = :id_usuario
        ) AND u.id_usuario != :id_usuario
        AND u.usuarioRol = 3 AND u.usuarioStatus = 1;";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario" => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-users-asesor";
            return $this->mensaje;
        }
    }
    function buscar_visitas_usuarios($id_usuario)
    {
        $sql = "SELECT usuario.id_usuario, CONCAT(usuario.nombre, ' ', usuario.apellido) as nombres, IFNULL(visitas.numero_visitas, 0) AS numero_visitas
        FROM usuario LEFT JOIN visitas ON usuario.id_usuario = visitas.agente_id WHERE usuario.usuarioRol=3 AND usuario.createdBy=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario" => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-users-asesor";
            return $this->mensaje;
        }
    }
    function buscar_servicios()
    {
        $sql = "SELECT id, nombre_servicio FROM servicios";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-services";
            return $this->mensaje;
        }
    }
    function buscar_permisos_usuario($user_id)
    {
        $sql = "SELECT s.* FROM permisos p inner join servicios s on p.id_servicio=s.id  WHERE p.id_usuario = :user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":user_id" => $user_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function delete_permiso_user($servicio, $cliente)
    {
        $response = [];
        try {
            $sql = "DELETE FROM permisos WHERE id_usuario = :cliente AND id_servicio=:servicio";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":cliente" => $cliente, ":servicio" => $servicio));
            $response[] = [
                "msg" => "delete-permiso"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function add_permiso_user($servicio, $cliente)
    {
        $response = [];
        try {
            $sql = "INSERT INTO permisos (id_usuario, id_servicio) VALUES(:cliente, :servicio)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":cliente" => $cliente, ":servicio" => $servicio));
            $permiso_id = $this->conexion->lastInsertId();
            $response[] = [
                "msg" => "add-permiso",
                "permiso_id" => $permiso_id
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }

    function buscar_imagen_proyect($id)
    {
        $sql = "SELECT imgUrl as img_url FROM proyectos WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id" => $id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }


    function crear_lote($id, $loteAncho, $loteLargo, $loteArea, $loteMz, $loteNumero, $lotePrecio, $tipo, $estado, $coordenadas)
    {
        $sql = "INSERT INTO lotes(proyectoID, ancho, largo, area, numero, mz_zona, precio, tipo, cordinates, estado ) VALUES (:proyectoID, :ancho, :largo, :area, :numero, :mz_zona, :precio, :tipo, :cordinates, :estado)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":proyectoID" => $id, ":ancho" => $loteAncho, ":largo" => $loteLargo, ":area" => $loteArea, ":numero" => $loteNumero, ":mz_zona" => $loteMz, ":precio" => $lotePrecio, ":tipo" => $tipo, ":cordinates" => $coordenadas, ":estado" => $estado));
            $this->mensaje = "add-lotes";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-lotes";
            return $this->mensaje;
        }
    }
    function editar_lote_coordenadas($id, $coordenadas)
    {
        $sql = "UPDATE lotes SET cordinates=:cordinates WHERE id=:id_lote";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_lote" => $id, ":cordinates" => $coordenadas));
            $this->mensaje = "update-lote";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-lote" . $error;
            return $this->mensaje;
        }
    }
    function editar_lote_info($id, $numero, $precio, $costo, $ancho, $largo, $area, $mz_zona, $estado)
    {
        $sql = "UPDATE lotes SET numero = :numero, precio = :precio, costo=:costo, mz_zona = :mz_zona, ancho = :ancho, largo = :largo, area = :area, estado = :estado WHERE id=:id_lote";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_lote" => $id, ":numero" => $numero, ":precio" => $precio, ":costo" => $costo, ":mz_zona" => $mz_zona, ":ancho" => $ancho, ":largo" => $largo, ":area" => $area, ":estado" => $estado));
            $this->mensaje = "edit-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-edit-sucess" . $error;
            return $this->mensaje;
        }
    }
    function eliminar_lote($id_lote)
    {
        $response = [];
        $sql = "DELETE FROM lotes WHERE id=:id_lote";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_lote" => $id_lote));
            $response[] = [
                "msg" => "remove_lote"
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        } catch (\Throwable $error) {
            $response[] = [
                "msg" => "error",
                "error" => $error
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        }
    }

    function buscar_lotes($id)
    {
        $sql = "SELECT * FROM lotes WHERE proyectoID=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id" => $id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function edit_lote($id, $estado)
    {
        $sql = "UPDATE lotes SET estado=:estado WHERE id=:id_lote";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_lote" => $id, ":estado" => $estado));
            $this->mensaje = "update-lote";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-lote" . $error;
            return $this->mensaje;
        }
    }

    function crear_habitaciones($n_habitacion, $habs_piso, $habs_cat, $caracteristicas)
    {
        $sql = "INSERT INTO habitaciones(n_cuarto, categoria, piso, estado, caracteristicas) VALUES (:n_cuarto, :categoria, :piso, :estado, :caracteristicas)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":n_cuarto" => $n_habitacion, ":categoria" => $habs_cat, ":piso" => $habs_piso, ":estado" => 1, ":caracteristicas" => $caracteristicas));
            $this->mensaje = "add-habs";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-habs";
            return $this->mensaje;
        }
    }
    function crear_proyecto($created, $proyecto_nombre, $proyecto_lotes, $galeria)
    {
        $sql = "INSERT INTO proyectos(nombreProyecto, imgUrl, cantLotes, createdBy, proyectStatus) VALUES (:nombre, :img, :lotes, :created, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $proyecto_nombre, ":img" => $galeria, ":lotes" => $proyecto_lotes, ":created" => $created, ":status" => "CREADA"));
            $this->mensaje = "add-proyecto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-proyecto" . $error;
            return $this->mensaje;
        }
    }
    function update_user($id, $nombres, $apellidos, $documento, $correo, $phone)
    {
        $sql = "UPDATE usuario SET nombre=:nombre, apellido=:apellido, dni=:dni, correo=:correo, phone_number=:phone_number WHERE id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombres, ":apellido" => $apellidos, ":dni" => $documento, ":correo" => $correo, ':phone_number' => $phone, ":id_usuario" => $id));
            $this->mensaje = "update-usuario";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-usuario" . $error;
            return $this->mensaje;
        }
    }
    function asigned_user_proyecto($id_proyecto, $id_user)
    {
        $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:user_id, :proyecto_id)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":user_id" => $id_user, ":proyecto_id" => $id_proyecto));
            $this->mensaje = "user-asigned";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-user-signed" . $error;
            return $this->mensaje;
        }
    }
    function remove_user_proyecto($id_proyecto, $id_usuario)
    {
        $sql = "DELETE FROM user_proyect WHERE user_id = :user_id AND proyecto_id = :proyecto_id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":user_id" => $id_usuario, ":proyecto_id" => $id_proyecto));
            $this->mensaje = "remove-asigned";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-asigned" . $error;
            return $this->mensaje;
        }
    }
    function remove_cliente_asesor($id_cliente, $id_usuario)
    {
        $sql = "DELETE FROM user_cliente WHERE user_id = :user_id AND cliente_id = :cliente_id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":user_id" => $id_usuario, ":cliente_id" => $id_cliente));
            $this->mensaje = "remove-asigned";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-asigned" . $error;
            return $this->mensaje;
        }
    }
    function remove_etiqueta_lead($id_etiqueta, $cliente)
    {
        $sql = "DELETE FROM etiqueta_cliente WHERE etiqueta_id = :etiqueta AND cliente_id = :cliente";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":etiqueta" => $id_etiqueta, ":cliente" => $cliente));
            $this->mensaje = "remove-asigned";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-asigned" . $error;
            return $this->mensaje;
        }
    }
    function delete_user($id)
    {
        $sql = "UPDATE usuario SET usuarioStatus = 0 WHERE id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_usuario" => $id));
            $this->mensaje = "delete-usuario";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-usuario" . $error;
            return $this->mensaje;
        }
    }
    function removed_proyecto($id_proyect)
    {
        $sql = "DELETE FROM proyectos
        WHERE id = :proyecto_id;
        
        DELETE FROM lotes
        WHERE proyectoID = :proyecto_id;
        DELETE FROM user_proyect WHERE proyecto_id = :proyecto_id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":proyecto_id" => $id_proyect));
            $this->mensaje = "delete-proyect";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-proyect" . $error;
            return $this->mensaje;
        }
    }
    function delete_msg_plantilla($id)
    {
        $sql = "DELETE FROM template_user
        WHERE id = :id_msg";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_msg" => $id));
            $this->mensaje = "delete-msg";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-msg" . $error;
            return $this->mensaje;
        }
    }




    function crear_piso_habitaciones($piso_nombre)
    {
        $sql = "INSERT INTO piso(numero_piso) VALUES (:numero_piso)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":numero_piso" => $piso_nombre));
            $this->mensaje = "add-piso-habs";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-piso-habs";
            return $this->mensaje;
        }
    }
    function register_visitas($agente)
    {
        // Verificar si ya existe un registro para el agente
        $selectSql = "SELECT numero_visitas FROM visitas WHERE agente_id = :agente";
        $selectQuery = $this->conexion->prepare($selectSql);
        $selectQuery->execute(array(":agente" => $agente));
        $row = $selectQuery->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // Existe un registro para el agente, incrementar el contador
            $contador = $row['numero_visitas'] + 1;

            $updateSql = "UPDATE visitas SET numero_visitas = :contador WHERE agente_id = :agente";
            $updateQuery = $this->conexion->prepare($updateSql);
            $updateQuery->execute(array(":contador" => $contador, ":agente" => $agente));

            $this->mensaje = "update-visita";
        } else {
            // No existe un registro para el agente, agregar uno nuevo con contador 1
            $insertSql = "INSERT INTO visitas(agente_id, numero_visitas) VALUES (:agente, 1)";
            $insertQuery = $this->conexion->prepare($insertSql);
            $insertQuery->execute(array(":agente" => $agente));

            $this->mensaje = "add-visita";
        }

        return $this->mensaje;
    }



    function buscar_proyectos()
    {
        $sql = "SELECT * FROM proyectos";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_proyectos_id($proyecto)
    {
        $sql = "SELECT * FROM proyectos WHERE id=:proyecto";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":proyecto" => $proyecto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_lotes_by_proyecto($id_proyecto)
    {
        $sql = "SELECT * FROM lotes WHERE proyectoID = :proyecto_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":proyecto_id" => $id_proyecto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_msg_template($user)
    {
        $sql = "SELECT * FROM template_user WHERE user_id = :user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":user_id" => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }

    function register_msg($user, $nombre, $msg)
    {
        $sql = "INSERT INTO template_user(user_id, nombre, mensaje) VALUES (:user_id, :nombre, :msg)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombre, ":msg" => $msg, ":user_id" => $user));
            $this->mensaje = "add-msg";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-msg";
            return $this->mensaje;
        }
    }
    function editmsgplantilla($id_plantilla, $nombre, $msg)
    {
        $sql = "UPDATE template_user SET nombre=:nombre, mensaje=:msg WHERE id=:id_plantilla";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombre, ":msg" => $msg, ":id_plantilla" => $id_plantilla));
            $this->mensaje = "edit-msg";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-edit-msg" + $error;
            return $this->mensaje;
        }
    }
    // function buscar_proyectos_user($id_usuario, $proyectos)
    // {
    //     foreach ($proyectos as $proyecto) {
    //         try{
    //             # code...
    //             $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:id_usuario, :id_proyecto)";
    //             $query = $this->conexion->prepare($sql);
    //             $query->execute(array(":id_usuario" =>$id_usuario, ':id_proyecto'=>$proyecto));
    //         }catch(\Throwable $error){
    //             $this->mensaje = "no-add-services" . $error;
    //             return $this->mensaje;
    //         }            
    //     }
    //     $this->mensaje = "add-proyectos";
    //     return $this->mensaje;
    // }
    function buscar_proyectos_user($id_usuario)
    {
        try {
            # code...
            $sql = "SELECT PROYECTO.id, PROYECTO.nombreProyecto AS proyecto_nombre, CASE WHEN PROUSER.user_id IS NULL THEN 'No asignado' ELSE 'Asignado' END AS asignado_usuario
            FROM proyectos AS PROYECTO
            LEFT JOIN (SELECT * FROM user_proyect WHERE user_id = :id) AS PROUSER ON PROUSER.proyecto_id = PROYECTO.id
            INNER JOIN user_proyect AS USRPROY ON USRPROY.proyecto_id = PROYECTO.id
            WHERE USRPROY.user_id = :id_creator;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id_usuario, ":id_creator" => $_SESSION['id_usuario']));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "no-proyectos" . $error;
            return $this->mensaje;
        }
    }
    function buscar_proyectos_mi_creator($user)
    {
        try {
            # code...
            $sql = "SELECT up.*, p.NombreProyecto as nombre_proyecto FROM user_proyect up inner join proyectos p on up.proyecto_id=p.id  WHERE up.user_id=:id_usuario;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "no-proyectos" . $error;
            return $this->mensaje;
        }
    }
    function buscar_etiquetas_cliente($id_cliente)
    {
        try {
            # code...
            $sql = "SELECT et.*, CASE WHEN ec.cliente_id IS NOT NULL THEN 'asignado' ELSE 'no asignado' END AS asignado_cliente FROM etiqueta et LEFT JOIN ( SELECT DISTINCT etiqueta_id, cliente_id FROM etiqueta_cliente WHERE cliente_id = :id_cliente ) ec ON et.id = ec.etiqueta_id WHERE et.user_id = :id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_cliente" => $id_cliente, ":id_usuario" => $_SESSION['id_usuario']));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "no-register" . $error;
            return $this->mensaje;
        }
    }
    function buscar_asesores($id_usuario)
    {
        try {
            # code...
            $sql = "SELECT DISTINCT u.*, r.nombreRol, us.sede_id, s.direccion, s.ciudad, s.name_reference
            FROM usuario u
            INNER JOIN user_sede us ON u.id_usuario = us.user_id inner join roles r  on u.usuarioRol=r.id inner join sede s on us.sede_id=s.id
            WHERE us.sede_id IN (
                SELECT us2.sede_id
                FROM user_sede us2
                WHERE us2.user_id = :id_usuario
            ) AND u.id_usuario != :id_usuario
            AND u.usuarioRol = 3;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = $error;
            return $this->mensaje;
        }
    }
    function buscar_asesor_cliente($sede_id, $id_cliente)
    {
        try {
            # code...
            $sql = "SELECT
            USUARIO.id_usuario AS usuario_id,
            USUARIO.nombre AS asesor_nombre,
            USUARIO.apellido AS asesor_apellido, USSEDE.sede_id,
            CASE
                WHEN USRCLIENTE.cliente_id IS NULL THEN 'No asignado'
                ELSE 'Asignado'
            END AS asignado_usuario
        FROM
            usuario AS USUARIO
            LEFT JOIN (
                SELECT *
                FROM user_cliente
                WHERE cliente_id = :id
            ) AS USRCLIENTE ON USUARIO.id_usuario = USRCLIENTE.user_id INNER JOIN user_sede as USSEDE on USUARIO.id_usuario=USSEDE.user_id
        WHERE
            USUARIO.usuarioRol = 3 AND USSEDE.sede_id=$sede_id
        
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id_cliente));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "no-proyectos" . $error;
            return $this->mensaje;
        }
    }
    function buscar_visitas_date($fecha_inicio, $fecha_fin)
    {
        try {
            # code...
            $sql = "SELECT fecha_visita, cliente_id, cantidad_visitas, status FROM ( SELECT IC.fecha_visita, IC.cliente_id, COUNT(*) AS cantidad_visitas, 'ASISTIO' AS status FROM visitas_agenda AS VA INNER JOIN interaccion_cliente AS IC ON VA.interaccion_id = IC.id INNER JOIN usuario as US on IC.user_id=US.id_usuario WHERE US.createdBy=:id_usuario AND IC.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin AND VA.status = 'ASISTIO' GROUP BY IC.fecha_visita UNION ALL SELECT IC.fecha_visita, IC.cliente_id, COUNT(*) AS cantidad_visitas, 'NO ASISTIO' AS status FROM visitas_agenda AS VA INNER JOIN interaccion_cliente AS IC ON VA.interaccion_id = IC.id WHERE IC.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin AND VA.status = 'NO ASISTIO' GROUP BY IC.fecha_visita ) AS subquery ORDER BY fecha_visita DESC, status";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin, ":id_usuario" => $_SESSION["id_usuario"]));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_resumen_eficiencia($fecha_inicio, $fecha_fin)
    {
        try {
            # code...
            $sql = "SELECT
            SUM(CASE WHEN va.status = 'ASISTIO' THEN 1 ELSE 0 END) AS visitas_concretadas,
            (SELECT COUNT(*) FROM interaccion_cliente ic WHERE ic.tipo = 'SEPARACION' AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin AND ic.user_id IN (SELECT id_usuario FROM usuario WHERE createdBy = :id_usuario)) AS separaciones,
            COUNT(DISTINCT v.id) AS ventas
        FROM
            visitas_agenda va
        JOIN
            interaccion_cliente ic ON va.interaccion_id = ic.id
        LEFT JOIN
            ventas v ON ic.cliente_id = v.cliente_id AND v.fecha_venta BETWEEN :fecha_inicio AND :fecha_fin
        WHERE
            ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin
            AND ic.user_id IN (
                SELECT id_usuario
                FROM usuario
                WHERE createdBy = :id_usuario
            );
        ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin, ":id_usuario" => $_SESSION["id_usuario"]));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_resumen_eficiencia_asesor($fecha_inicio, $fecha_fin, $id_usuario)
    {
        try {
            # code...
            $sql = "SELECT 
            (SELECT COUNT(*) FROM interaccion_cliente ic inner join visitas_agenda va on ic.id=va.interaccion_id WHERE va.interaccion_id=ic.id AND va.status ='ASISTIO' AND ic.status='VALIDADO'  AND ic.user_id =:id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) as visitas_concretadas,
            (SELECT COUNT(*) FROM interaccion_cliente ic inner join visitas_agenda va on ic.id=va.interaccion_id WHERE va.interaccion_id=ic.id AND va.status ='NO ASISTIO'  AND ic.user_id =:id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) as visitas_no_concretadas,
            (SELECT COUNT(*) FROM interaccion_cliente ic WHERE ic.tipo = 'SEPARACION' AND ic.status='VALIDADO' AND ic.user_id = :id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) AS separaciones,
            (SELECT COUNT(*) FROM ventas v WHERE v.user_id = :id_usuario AND v.status='VALIDADO' AND v.fecha_venta BETWEEN :fecha_inicio AND :fecha_fin) AS ventas;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin, ":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_resumen_eficiencia_usuario_proyecto($fecha_inicio, $fecha_fin, $id_usuario, $proyecto)
    {
        try {
            # code...
            $sql = "SELECT 
            (SELECT COUNT(*) FROM interaccion_cliente ic inner join visitas_agenda va on ic.id=va.interaccion_id inner join cliente c on ic.cliente_id=c.id_cliente WHERE c.proyet_id=:proyecto AND va.interaccion_id=ic.id AND va.status ='ASISTIO'  AND ic.user_id =:id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) as visitas_concretadas,
            (SELECT COUNT(*) FROM interaccion_cliente ic inner join visitas_agenda va on ic.id=va.interaccion_id inner join cliente c on ic.cliente_id=c.id_cliente WHERE c.proyet_id=:proyecto AND va.interaccion_id=ic.id AND va.status ='NO ASISTIO'  AND ic.user_id =:id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) as visitas_no_concretadas,
            (SELECT COUNT(*) FROM interaccion_cliente ic inner join cliente c on ic.cliente_id=c.id_cliente WHERE c.proyet_id=:proyecto AND ic.tipo = 'SEPARACION' AND ic.user_id = :id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin) AS separaciones,
            (SELECT COUNT(*) FROM ventas v inner join cliente c on v.cliente_id=c.id_cliente WHERE c.proyet_id=:proyecto AND v.user_id = :id_usuario AND v.fecha_venta BETWEEN :fecha_inicio AND :fecha_fin) AS ventas;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin, ":id_usuario" => $id_usuario, ":proyecto" => $proyecto));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_clientes_rendimiento($fecha_inicio, $fecha_fin, $id_usuario)
    {
        try {
            # code...
            $sql = "SELECT c.id_cliente, c.proyet_id, p.nombreProyecto as proyecto, c.nombres, c.apellidos, ic.status, ic.fecha_visita as fecha_registro, ic.tipo, va.status as asistencia FROM interaccion_cliente ic inner join cliente c on ic.cliente_id=c.id_cliente left join proyectos p on c.proyet_id=p.id left join visitas_agenda va on ic.id=va.interaccion_id WHERE ic.user_id=:id_usuario AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin UNION ALL SELECT c.id_cliente, c.proyet_id, p.nombreProyecto, c.nombres, c.apellidos,  v.status, v.fecha_venta as fecha_registro, 'VENTA' as tipo, '' as asistencia FROM ventas v inner join cliente c on v.cliente_id=c.id_cliente left join proyectos p on c.proyet_id=p.id WHERE v.user_id = :id_usuario AND v.fecha_venta BETWEEN :fecha_inicio AND :fecha_fin";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin, ":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_clientes_rendimiento_group_asesor($fecha_inicio, $fecha_fin, $asesores)
    {
        try {
            $idUsuarios = array_map(function ($asesor) {
                return $asesor->id_usuario;
            }, $asesores);
            # code...
            $sql = "SELECT c.id_cliente, c.proyet_id, ic.user_id, p.nombreProyecto as proyecto, c.nombres, c.apellidos, ic.status, ic.fecha_visita as fecha_registro, ic.tipo, va.status as asistencia FROM interaccion_cliente ic inner join cliente c on ic.cliente_id=c.id_cliente left join proyectos p on c.proyet_id=p.id left join visitas_agenda va on ic.id=va.interaccion_id WHERE ic.user_id IN (" . implode(',', $idUsuarios) . ") AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin UNION ALL SELECT c.id_cliente, c.proyet_id, v.user_id, p.nombreProyecto, c.nombres, c.apellidos, v.status, v.fecha_venta as fecha_registro, 'VENTA' as tipo, '' as asistencia FROM ventas v inner join cliente c on v.cliente_id=c.id_cliente left join proyectos p on c.proyet_id=p.id WHERE v.user_id IN (" . implode(',', $idUsuarios) . ") AND v.fecha_venta BETWEEN :fecha_inicio AND :fecha_fin";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_resumen_eficiencia_group_asesor($fecha_inicio, $fecha_fin, $asesores)
    {
        try {
            # code...
            // Extraer los ID de usuario del array de JSON
            $idUsuarios = array_map(function ($asesor) {
                return $asesor->id_usuario;
            }, $asesores);

            // Construcción de la lista de parámetros para la cláusula IN
            $sql = "SELECT
            ic.user_id AS id_usuario,
            COUNT(DISTINCT CASE WHEN va.status = 'ASISTIO' THEN va.interaccion_id END) AS visitas_concretadas,
            COUNT(DISTINCT CASE WHEN ic.tipo = 'SEPARACION' THEN ic.id END) AS separaciones,
            COUNT(DISTINCT CASE WHEN v.user_id IS NOT NULL THEN v.id END) AS ventas
        FROM
            interaccion_cliente ic
        LEFT JOIN
            visitas_agenda va ON ic.id = va.interaccion_id AND va.status = 'ASISTIO'
        LEFT JOIN
            ventas v ON ic.cliente_id = v.cliente_id
        WHERE
            ic.user_id IN (" . implode(',', $idUsuarios) . ") AND ic.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin
        GROUP BY
            ic.user_id;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    // function buscar_resumen_eficiencia_usuario($id_usuario)
    // {
    //     try {
    //         # code...
    //         $sql = "SELECT
    //         SUM(CASE WHEN va.status = 'ASISTIO' THEN 1 ELSE 0 END) AS visitas_concretadas,
    //         (SELECT COUNT(*) FROM interaccion_cliente ic WHERE ic.tipo = 'SEPARACION' AND ic.user_id=:id_usuario) AS separaciones,
    //         COUNT(DISTINCT v.id) AS ventas
    //     FROM
    //         visitas_agenda va
    //     JOIN
    //         interaccion_cliente ic ON va.interaccion_id = ic.id
    //     LEFT JOIN
    //         ventas v ON ic.cliente_id = v.cliente_id
    //     WHERE ic.user_id = :id_usuario
    //     ";
    //         $query = $this->conexion->prepare($sql);
    //         $query->execute(array(":id_usuario" => $id_usuario));
    //         $this->datos = $query->fetchAll(); // retorna objetos o no
    //         if (!empty($this->datos)) {
    //             return $this->datos;
    //         } else {
    //             $this->mensaje = "no-register";
    //             return $this->mensaje;
    //         }
    //     } catch (\Throwable $error) {
    //         $this->mensaje = "fatal-error" . $error;
    //         return $this->mensaje;
    //     }
    // }
    function buscar_visitas_date_asesor($fecha_inicio, $fecha_fin, $id_usuario)
    {
        try {
            # code...
            $sql = "SELECT fecha_visita, cliente_id, cantidad_visitas, status FROM ( SELECT IC.fecha_visita, IC.cliente_id, COUNT(*) AS cantidad_visitas, 'ASISTIO' AS status FROM visitas_agenda AS VA INNER JOIN interaccion_cliente AS IC ON VA.interaccion_id = IC.id  WHERE IC.user_id=:id_usuario AND IC.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin AND VA.status = 'ASISTIO' GROUP BY IC.fecha_visita UNION ALL SELECT IC.fecha_visita, IC.cliente_id, COUNT(*) AS cantidad_visitas, 'NO ASISTIO' AS status FROM visitas_agenda AS VA INNER JOIN interaccion_cliente AS IC ON VA.interaccion_id = IC.id WHERE IC.user_id=:id_usuario AND IC.fecha_visita BETWEEN :fecha_inicio AND :fecha_fin AND VA.status = 'NO ASISTIO' GROUP BY IC.fecha_visita ) AS subquery ORDER BY fecha_visita DESC, status";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario, ':fecha_inicio' => $fecha_inicio, ':fecha_fin' => $fecha_fin));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal-error" . $error;
            return $this->mensaje;
        }
    }
    // MODULO DE INVERSIONES

    function buscar_inversiones_admin($id_usuario)
    {
        try {
            # code...
            $sql = "SELECT * FROM inversiones WHERE created_by  = :user";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":user" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "error" . $error;
            return $this->mensaje;
        }
    }
    function buscar_inversiones_proyecto($proyecto_id)
    {
        try {
            # code...
            $sql = "SELECT * FROM inversiones WHERE proyecto_id  = :proyecto_id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":proyecto_id" => $proyecto_id));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "error" . $error;
            return $this->mensaje;
        }
    }
    function registrar_inversion($inversion, $created_by, $fecha_created)
    {
        try {
            # code...
            $sql = "INSERT INTO inversiones(tipo_inversion, descripcion_inversion, monto_inversion, proyecto_id, created_by, fecha_created) VALUES (:tipo_inversion, :descripcion_inversion, :monto_inversion, :proyecto_id, :created_by, :fecha_created)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":tipo_inversion" => $inversion->tipo_inversion, ":descripcion_inversion" => $inversion->descripcion_inversion,  ":monto_inversion" => $inversion->monto_inversion, ":proyecto_id" => $inversion->proyecto_id, ":created_by" => $created_by, ":fecha_created" => $fecha_created));
            $response = (object) [
                'msg' => 'add-inversion',
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        } catch (\Throwable $error) {
            $response = (object) [
                'msg' => 'error',
                'error' => $error,
            ];
            $this->mensaje = $response;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_gastos_total_admin($user)
    {
        $sql = "SELECT g.* FROM gastos_admin g inner join user_sede us on g.sede_id=us.sede_id WHERE us.user_id=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_gastos_admin_sede($user, $fecha_inicio, $fecha_fin)
    {
        $sql = "SELECT g.* FROM gastos_admin g inner join user_sede us on g.sede_id=us.sede_id WHERE us.user_id=:id_usuario AND g.fecha >= :fecha_inicio AND g.fecha <= :fecha_fin";
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
    function buscar_comisiones_admin($user_id, $fecha_inicio, $fecha_fin)
    {
        $sql = "SELECT c.*, v.proyecto_id, v.sede_id, u.nombre as nombre_asesor, u.apellido as apellido_asesor FROM comisiones c inner join ventas_financiero v on c.venta_id=v.id inner join user_sede us on v.sede_id=us.sede_id inner join usuario u on c.asesor_id=u.id_usuario where us.user_id=:user_id AND c.fecha >= :fecha_inicio AND c.fecha <= :fecha_fin";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user_id, ":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    // MODULO PROYECTOS
    function buscar_proyectos_agentes($id_usuario)
    {
        try {
            # code...
            $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.logo, PRO.imgUrl as img_lotizador, USPRO.user_id as id_agente, USER.phone_number FROM user_proyect as USPRO inner join usuario as USER on USPRO.user_id=USER.id_usuario inner join proyectos as PRO on USPRO.proyecto_id=PRO.id WHERE USPRO.user_id=:id_usuario";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            // if (!empty($this->datos)) {
            return $this->datos;
            // } else {
            //     $this->mensaje = "no-register";
            //     return $this->mensaje;
            // }
        } catch (\Throwable $error) {
            $this->mensaje = "no-proyectos" . $error;
            return $this->mensaje;
        }
    }
    function buscar_proyectos_mapa($proyecto)
    {
        $sql = "SELECT * FROM proyectos WHERE id=:id_proyecto";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_proyecto" => $proyecto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_proyectos_admin($user)
    {
        // $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.logo, PRO.description, PRO.video_url, PRO.imgUrl as img_url, PRO.proyectStatus as proyect_status, USER.nombre as cliente_nombre, USER.apellido as cliente_apellido FROM user_proyect as USPRO inner join proyectos as PRO on USPRO.proyecto_id=PRO.id inner join usuario as USER on USPRO.user_id=USER.id_usuario WHERE USPRO.user_id=:id";
        //  actualizacion aqui
        $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.maps_url, PRO.logo, PRO.description, PRO.video_url, PRO.imgUrl as img_url, PRO.proyectStatus as proyect_status, USSED.sede_id, s.direccion, s.ciudad, s.name_reference FROM proyectos PRO inner join proyecto_sede PROSED on PRO.id=PROSED.proyecto_id inner join user_sede USSED on PROSED.sede_id=USSED.sede_id inner join sede s on USSED.sede_id=s.id WHERE USSED.user_id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id" => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_empresa_usuario($user_id)
    {
        $sql = "SELECT b.* FROM user_business ub inner join business b on ub.business_id=b.id WHERE ub.user_id=:user_id";
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
    function buscar_sedes_empresa($empresa_id)
    {
        $sql = "SELECT * FROM sede WHERE empresa_id=:empresa_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':empresa_id' => $empresa_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_proyectos_asesor($user)
    {
        $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.description, PRO.video_url, PRO.imgUrl as img_url FROM user_proyect as USPRO inner join proyectos as PRO on USPRO.proyecto_id=PRO.id WHERE USPRO.user_id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id" => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_user_proyect($id_proyecto)
    {
        $sql = "SELECT CLIENTE.id_usuario, CLIENTE.usuarioRol AS rol, CLIENTE.nombre AS cliente_nombre, CLIENTE.apellido AS cliente_apellido, CASE WHEN PROUSER.user_id IS NULL THEN 'No asignado' ELSE 'Asignado' END AS asignado_proyecto FROM usuario AS CLIENTE LEFT JOIN (SELECT * FROM user_proyect WHERE proyecto_id = :id) AS PROUSER ON PROUSER.user_id = CLIENTE.id_usuario WHERE CLIENTE.UsuarioRol = 2;
      ";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id" => $id_proyecto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ocupaded_habs()
    {
        $sql = "SELECT HAB.id_habitaciones, C_HAB.precio, ES.nombre_estado, HAB.n_cuarto, C_HAB.nombre_categoria, PS.numero_piso FROM habitaciones as HAB inner join cat_habitaciones as C_HAB on HAB.categoria=C_HAB.id_cat_habitaciones inner join piso as PS on HAB.piso=PS.id_piso inner join estado_habitacion as ES on HAB.estado=ES.id_estado_habitacion WHERE HAB.estado=:estado";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":estado" => 2));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registro de habitaciones";
            return $this->mensaje;
        }
    }


    // SECTION DE RESERVAS
    function buscar_reserva($id_habitacion)
    {
        $sql = "SELECT HAB.id_habitaciones, C_HAB.precio, HAB.n_cuarto, C_HAB.nombre_categoria, RE.id_reservas, RE.cliente, RE.documento, RE.fecha_entrada, RE.fecha_salida FROM reservas as RE inner join habitaciones as HAB on RE.habitacion=HAB.id_habitaciones inner join cat_habitaciones as C_HAB on HAB.categoria=C_HAB.id_cat_habitaciones  WHERE habitacion=:id_habitacion AND RE.estado_reserva='creado'";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_habitacion" => $id_habitacion));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen reservas en esta habitacion";
            return $this->mensaje;
        }
    }
    function buscar_detail_reserva($id_reserva)
    {
        $sql = "SELECT id_reservas, total, adelanto, descuento, total_descuento FROM reservas WHERE id_reservas=:id_reserva";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_reserva" => $id_reserva));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen  esta reserva";
            return $this->mensaje;
        }
    }
    function buscar_detail_consumo($id_reserva)
    {
        $sql = "SELECT RE.id_detalle_venta, RE.cantidad, RE.estado_pago, RE.subtotal, PRO.nombre, PRO.precio FROM detalle_venta as RE inner join productos as PRO on RE.id_producto=PRO.id_productos WHERE id_reserva=:id_reserva";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_reserva" => $id_reserva));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registros de ventas para esta habitacion";
            return $this->mensaje;
        }
    }
    // FIN DE SECTION DE RESERVAS


    // SECTION PRODUCTOS
    function crear_productos($nombre, $precio, $inventario)
    {
        $sql = "INSERT INTO productos(nombre, precio, inventario) VALUES (:nombre, :precio, :inventario)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombre, ":precio" => $precio, ":inventario" => $inventario));
            $this->mensaje = "add-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-producto";
            return $this->mensaje;
        }
    }
    function edit_producto($id_producto, $nombre, $precio, $inventario)
    {
        $sql = "UPDATE productos SET nombre=:nombre, precio=:precio, inventario=:inventario WHERE id_productos=:id_producto";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_producto" => $id_producto, ":nombre" => $nombre, ":precio" => $precio, ":inventario" => $inventario));
            $this->mensaje = "update-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-producto" . $error;
            return $this->mensaje;
        }
    }
    function buscar_productos()
    {
        $sql = "SELECT * FROM productos";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-create-products";
            return $this->mensaje;
        }
    }
    function buscar_producto_id($id_producto)
    {
        $sql = "SELECT * FROM productos WHERE id_productos=:id_producto";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_producto" => $id_producto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-existe-products";
            return $this->mensaje;
        }
    }
    function borrar_producto($id_producto)
    {
        $sql = "DELETE FROM productos WHERE id_productos=:id_productos";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_productos" => $id_producto));
            $this->mensaje = "remove-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-producto";
            return $this->mensaje;
        }
    }
    // FIN DE SECTION PRODUCOTS

    // SECTION DE REGISTRO DE VENTAS DE PRODUCTOS A LAS HABITACIONES
    function registrar_ventas_productos($productos, $id_reserva, $option)
    {
        if ($option == 0) {
            $estado = "PAGADO";
        } else {
            $estado = "NO PAGADO";
        }
        for ($i = 0; $i < count($productos); $i++) {

            $sql = "INSERT INTO detalle_venta(id_reserva,id_producto,cantidad,subtotal, estado_pago) VALUES (:id_reserva,:id_producto,:cantidad,:subtotal, :estado_pago)";
            $query = $this->conexion->prepare($sql);

            $query->execute(array(":id_reserva" => $id_reserva, ":id_producto" => $productos[$i]["id"], ":cantidad" => $productos[$i]["cantidad"], ":subtotal" => $productos[$i]["cantidad"] * $productos[$i]["precio"], ":estado_pago" => $estado));
        }
        $this->mensaje = "add-producto";
        return $this->mensaje;
    }
    // FIN DE SECTION DE REGISTRO DE VENTAS DE PRODUCTOS A LAS HABITACIONES








    // SECTION CLIENTES
    function buscar_cliente($documento)
    {
        $sql = "SELECT id_cliente, nombres, documento FROM cliente WHERE documento=:documento";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":documento" => $documento));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registro de este cliente cree uno nuevo";
            return $this->mensaje;
        }
    }
    function buscar_cliente_proyecto($proyecto_id)
    {
        $sql = "SELECT c.* FROM cliente c where c.proyet_id = :proyecto";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":proyecto" => $proyecto_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function add_cliente2($data, $proyect_id, $sede_id, $origen_name, $created_by)
    {
        try {
            $sql = "INSERT INTO cliente(nombres, apellidos, documento, correo, celular, telefono, Pais, createdBy, origen, campania, ciudad, proyet_id, fecha_creation, hora_creation, status, sede_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->conexion->prepare($sql);

            if ($stmt === false) {
                throw new Exception("Error en la preparación de la consulta: " . implode(", ", $this->conexion->errorInfo()));
            }
            $inserted_ids = array(); // Array para almacenar los IDs insertados

            foreach ($data as $cliente) {
                $values = array(
                    $cliente->nombre,
                    $cliente->apellido,
                    $cliente->documento,
                    $cliente->correo,
                    $cliente->celular,
                    $cliente->telefono,
                    $cliente->Pais,
                    $created_by,
                    $origen_name,
                    $cliente->campaña,
                    $cliente->ciudad,
                    $proyect_id,
                    $cliente->fecha,
                    $cliente->hora,
                    "NO CONTACTADO",
                    $sede_id
                );

                if (!$stmt->execute($values)) {
                    throw new Exception("Error al insertar cliente: " . implode(", ", $stmt->errorInfo()));
                }
                // Recuperar el ID insertado y almacenarlo en el array
                $inserted_ids[] = $this->conexion->lastInsertId();
            }
            $this->mensaje = array("ids_clientes" => $inserted_ids, "message" => "Se insertaron correctamente los clientes");
            return $this->mensaje;
        } catch (Exception $error) {
            $response = array("error" => $error->getMessage());
            $this->mensaje = $response;
        }
    }







    function add_cliente($resultado, $proyect_id, $sede_id, $created_by)
    {
        $dato = $resultado;
        try {
            # code...
            $sql = "INSERT INTO cliente(nombres, apellidos, documento, correo, celular, telefono, Pais, createdBy, origen, campania, ciudad, sede_id, proyet_id, fecha_creation, hora_creation, status) VALUES(:nombres, :apellidos, :documento, :correo, :celular, :telefono, :Pais, :createdBy, :origen, :campania, :ciudad, :sede_id, :proyet_id, :fecha, :hora, :status)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":nombres" => $dato["nombre"], ":apellidos" => $dato["apellido"], ":documento" => $dato["documento"], ":correo" => $dato["correo"], ":celular" => $dato["celular"], ":telefono" => $dato["telefono"], ":Pais" => $dato["Pais"], ":origen" => $dato["origen"], ":campania" => $dato["campaña"], ":ciudad" => $dato["ciudad"], ":sede_id" => $sede_id, ":proyet_id" => $proyect_id, ":fecha" => $dato["fecha"], ":hora" => $dato["hora"], ":createdBy" => $created_by, ":status" => "NO CONTACTADO"));
            // Obtener el ID del cliente insertado
            $cliente_id = $this->conexion->lastInsertId();
            // Devolver el ID del cliente como respuesta
            $response = array("id" => $cliente_id);
            echo json_encode($response);
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $response = array("error" => $error);
            echo json_encode($response);
        }
    }
    function add_etiqueta($nombre, $fecha, $id_usuario)
    {
        try {
            # code...
            $sql = "INSERT INTO etiqueta(nombre, user_id, fecha_created) VALUES(:nombre, :usuario, :fecha)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":nombre" => $nombre, ":usuario" => $id_usuario, ":fecha" => $fecha));
            $this->mensaje = "add-etiqueta";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-etiqueta" . $error;
            return $this->mensaje;
        }
    }
    function add_visita_cliente($fecha, $hora, $cliente, $usuario, $tipo, $pendiente)
    {
        try {
            # code...
            $sql = "INSERT INTO interaccion_cliente(fecha_visita, hora_visita, cliente_id, user_id, tipo, status) VALUES(:fecha, :hora, :cliente, :usuario, :tipo, :status)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":fecha" => $fecha, ":hora" => $hora, ":cliente" => $cliente, ":usuario" => $usuario, ":tipo" => $tipo, ":status" => $pendiente));

            $this->mensaje = "add-register-visita";
            return $this->mensaje;
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $this->mensaje = "no-gesiter-visita" . $error;
            return $this->mensaje;
        }
    }
    function register_venta($fecha, $cliente, $user)
    {
        try {
            # code...
            $sql = "INSERT INTO ventas(cliente_id, user_id, fecha_venta, status) VALUES(:cliente, :usuario, :fecha, :status)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":cliente" => $cliente, ":usuario" => $user, ":fecha" => $fecha, ":status" => "SEND_VALIDAR"));

            $this->mensaje = "add-register-venta";
            return $this->mensaje;
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $this->mensaje = "no-gesiter-venta" . $error;
            return $this->mensaje;
        }
    }
    function buscar_visitas_programadas($usuario)
    {
        try {
            # code...
            $sql = "SELECT ic.*, uc.*, va.status as asistio FROM interaccion_cliente ic INNER JOIN user_cliente uc  ON ic.cliente_id = uc.cliente_id INNER JOIN cliente c ON uc.cliente_id=c.id_cliente LEFT JOIN visitas_agenda va ON ic.id = va.interaccion_id WHERE ic.user_id =:usuario AND uc.user_id=:usuario AND c.archived=0;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":usuario" => $usuario));
            $this->datos = $query->fetchAll();
            return $this->datos;
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $this->mensaje = $error;
            return $this->mensaje;
        }
    }
    function buscar_etiquetas($usuario)
    {
        try {
            # code...
            $sql = "SELECT * FROM etiqueta WHERE user_id =:usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":usuario" => $usuario));
            $this->datos = $query->fetchAll();
            return $this->datos;
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $this->mensaje = $error;
            return $this->mensaje;
        }
    }
    function edit_cliente($resultado, $proyect_id, $cliente)
    {
        $dato = $resultado;
        try {
            # code...
            $sql = "UPDATE cliente SET nombres=:nombres, apellidos=:apellidos, documento=:documento, correo=:correo, celular=:celular, telefono=:telefono, Pais=:Pais, origen=:origen, campania=:campania, ciudad=:ciudad, proyet_id=:proyet_id WHERE id_cliente=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":nombres" => $dato["nombre"], ":apellidos" => $dato["apellido"], ":documento" => $dato["documento"], ":correo" => $dato["correo"], ":celular" => $dato["celular"], ":telefono" => $dato["telefono"], ":Pais" => $dato["Pais"], ":origen" => $dato["origen"], ":campania" => $dato["campaña"], ":ciudad" => $dato["ciudad"], ":proyet_id" => $proyect_id, ":id_cliente" => $cliente));
            // Obtener el ID del cliente insertado
            $cliente_id = $this->conexion->lastInsertId();
            // Devolver el ID del cliente como respuesta
            $response = array("id" => $cliente_id);
            echo json_encode($response);
        } catch (\Throwable $error) {
            // Devolver un mensaje de error en caso de excepción
            $response = array("error" => $error);
            echo json_encode($response);
        }
    }
    function buscar_datos_usuario($user_id)
    {
        $sql = "SELECT * FROM usuario WHERE id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario" => $user_id));
        $this->datos = $query->fetchAll();
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function add_user($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password, $rol_id)
    {
        $response = [];
        $sql = "SELECT * FROM usuario WHERE user=:username";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":username" => $username));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            $response[] = [
                "msg" => "exist-user"
            ];

            $this->mensaje = $response;
            return $this->mensaje;
        } else {
            try {
                $this->conexion->beginTransaction();
                $sql = "INSERT INTO usuario(nombre, apellido, dni, correo, phone_number, user, password, usuarioRol, createdBy, usuarioStatus) VALUES(:nombre, :apellido, :dni, :correo, :phone_number, :username, :password, :usuarioRol, :createdBy, :usuarioStatus)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(
                    ":nombre" => $nombres,
                    ':apellido' => $apellidos,
                    ':dni' => $documento,
                    ':correo' => $correo,
                    ":phone_number" => $phone,
                    ":username" => $username,
                    ":password" => $password,
                    ":usuarioRol" => $rol_id,
                    ":createdBy" => $user,
                    ":usuarioStatus" => 1
                ));

                $usuarioId = $this->conexion->lastInsertId(); // Obtener el ID del usuario insertado
                $response[] = [
                    "msg" => "add-user",
                    "usuario_id" => $usuarioId
                ];
                $this->conexion->commit(); // Confirmar la transacción

                $this->mensaje = $response;
                return $this->mensaje;
            } catch (\Throwable $error) {
                $response[] = [
                    "msg" => "error",
                    "error" => $error
                ];
                $this->mensaje = $response;
                return $this->mensaje;
            }
        }
    }
    function add_user_asesor($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password)
    {
        $sql = "SELECT * FROM usuario WHERE user=:username";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":username" => $username));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            $this->mensaje = "Existe el usuario";
            return $this->mensaje;
        } else {
            try {
                $sql = "INSERT INTO usuario(nombre, apellido, dni, correo, phone_number, user, password, usuarioRol, createdBy, usuarioStatus) VALUES(:nombre, :apellido, :dni, :correo, :phone_number, :username, :password, :usuarioRol, :createdBy, :usuarioStatus)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(
                    ":nombre" => $nombres,
                    ':apellido' => $apellidos,
                    ':dni' => $documento,
                    ':correo' => $correo,
                    ':phone_number' => $phone,
                    ":username" => $username,
                    ":password" => $password,
                    ":usuarioRol" => 3,
                    ":createdBy" => $user,
                    ":usuarioStatus" => true
                )); // Confirmar la transacción

                $this->mensaje = "add-user-asesor";
                return $this->mensaje;
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-cliente" . $error;
                return $this->mensaje;
            }
        }
    }
    function seguimiento_cliente($usuario, $cliente, $observacion, $status, $fecha, $hora)
    {
        try {
            # code...
            $sql = "INSERT INTO registro_contact(user_id, cliente_id, observacion, status, fecha_register, hora_register) VALUES (:user_id, :cliente_id, :observacion, :status, :fecha_register, :hora_register)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":user_id" => $usuario, ":cliente_id" => $cliente, ":observacion" => $observacion, ":status" => $status, ":fecha_register" => $fecha, ":hora_register" => $hora));

            // modificando el status de cliente
            $sql = "UPDATE cliente SET status=:status WHERE id_cliente=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_cliente" => $cliente, ":status" => $status));

            $this->mensaje = "add-register-contact";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-register-contact" . $error;
            return $this->mensaje;
        }
    }
    function buscar_historial_seguimiento($cliente)
    {
        try {
            # code...
            $sql = "SELECT * FROM registro_contact WHERE cliente_id=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_cliente" => $cliente));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-data";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = $error;
            return $this->mensaje;
        }
    }
    function buscar_historial_status($user)
    {
        try {
            # code...
            $sql = "SELECT rc.* FROM registro_contact as rc join user_cliente as uc on rc.cliente_id=uc.cliente_id inner join cliente as c on rc.cliente_id=c.id_cliente WHERE uc.user_id=:id_user AND c.archived=0;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_user" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-data";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = $error;
            return $this->mensaje;
        }
    }
    function add_permisos($id_usuario, $permisos)
    {
        $response = [];
        try {
            # code...
            $sql = "INSERT INTO permisos(id_usuario, id_servicio) VALUES (?,?)";
            foreach ($permisos as $permiso) {
                $query = $this->conexion->prepare($sql);
                $query->execute(array($id_usuario, $permiso));
            }
            $response[] = [
                "msg" => "add-permisos"
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        } catch (\Throwable $error) {
            $response[] = [
                "msg" => "error",
                "error" => $error
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        }
    }
    function registar_usuario_empresa($usuario_id, $empresa_id, $fecha, $created_by)
    {
        $response = [];
        try {
            # code...
            $sql = "INSERT INTO user_business(user_id, business_id, fecha, created_by) VALUES (?, ?, ?, ?)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array($usuario_id, $empresa_id, $fecha, $created_by));
            $response[] = [
                "msg" => "add-business"
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        } catch (\Throwable $error) {
            $response[] = [
                "msg" => "error",
                "error" => $error
            ];
            $this->mensaje = $response;
            return $this->mensaje;
        }
    }
    function add_user_proyect($id_usuario, $proyectos)
    {
        foreach ($proyectos as $proyecto) {
            try {
                # code...
                $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:id_usuario, :id_proyecto)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":id_usuario" => $id_usuario, ':id_proyecto' => $proyecto));
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-proyectos" . $error;
                return $this->mensaje;
            }
        }
        $this->mensaje = "add-user-proyects";
        return $this->mensaje;
    }
    function update_asigned_etiqueta($etiquetas, $fecha, $id_cliente)
    {
        foreach ($etiquetas as $etiqueta) {
            try {
                # code...
                $sql = "INSERT INTO etiqueta_cliente(etiqueta_id, cliente_id, fecha_created) VALUES (:etiqueta, :cliente, :fecha)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":etiqueta" => $etiqueta, ':cliente' => $id_cliente, ":fecha" => $fecha));
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-etiquetas" . $error;
                return $this->mensaje;
            }
        }
        $this->mensaje = "add-etiquetas-lead";
        return $this->mensaje;
    }
    function add_user_cliente($data, $asesor, $fecha, $hora)
    {
        try {
            # code...
            $sql = "INSERT INTO user_cliente(user_id, cliente_id, fecha_asigned, hora_asigned) VALUES (?,?,?,?)";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $cliente) {
                $values = array(
                    $asesor,
                    $cliente,
                    $fecha,
                    $hora
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al asignar cliente: " . implode(", ", $query->errorInfo()));
                }
            }
            $this->mensaje = "add-user-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-asigned-clientes" . $error;
            return $this->mensaje;
        }
    }
    function archived_multiple_clientes($data)
    {
        try {
            # code...
            $sql = "UPDATE cliente SET archived=1 WHERE id_cliente=?";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $cliente) {
                $values = array(
                    $cliente->id,
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al archivar cliente: " . implode(", ", $query->errorInfo()));
                }
            }
            $this->mensaje = "archived-clientes";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-archived-clientes" . $error;
            return $this->mensaje;
        }
    }
    function asignar_actividad_user($asesor_id, $id_task)
    {
        $response = [];
        try {
            # code...
            $sql = "UPDATE interaccion_cliente SET user_id=? WHERE id=?";
            $query = $this->conexion->prepare($sql);
            $query->execute(array($asesor_id, $id_task));
            $response[] = [
                "msg" => "update_task"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "msg" => "error",
                "error" => $error
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function delete_cliente_asesor($cliente, $asesor)
    {
        try {
            # code...
            $sql = "DELETE FROM user_cliente WHERE user_id=:id_usuario AND cliente_id=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $asesor, ':id_cliente' => $cliente));
            $this->mensaje = "delete-user-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-user-cliente" . $error;
            return $this->mensaje;
        }
    }
    function unassign_my_asesor($cliente, $asesor)
    {
        try {
            # code...
            $sql = "DELETE FROM user_cliente WHERE user_id=:id_usuario AND cliente_id=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $asesor, ':id_cliente' => $cliente));
            $this->mensaje = "delete-user-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-user-cliente" . $error;
            return $this->mensaje;
        }
    }
    function archived_cliente_asesor($cliente)
    {
        try {
            # code...
            $sql = "UPDATE cliente SET archived=1 WHERE id_cliente=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':id_cliente' => $cliente));
            $this->mensaje = "archived-user-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-archived-user-cliente" . $error;
            return $this->mensaje;
        }
    }
    function restaurar_cliente($cliente)
    {
        try {
            # code...
            $sql = "UPDATE cliente SET archived=0 WHERE id_cliente=:id_cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(':id_cliente' => $cliente));
            $this->mensaje = "restaurar-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-restaurar-cliente" . $error;
            return $this->mensaje;
        }
    }
    function borrar_cliente($id_cliente)
    {
        $sql = "DELETE FROM cliente WHERE id_cliente=:id_cliente";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_cliente" => $id_cliente));
            $this->mensaje = "remove-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-cliente";
            return $this->mensaje;
        }
    }
    // GESTION DE CLIENTES BUSCAR CLIENTE
    function buscar_pendientes($user)
    {
        try {
            $sql = "SELECT COUNT(*) AS pendientes
            FROM interaccion_cliente ic
            INNER JOIN user_cliente uc ON ic.cliente_id = uc.cliente_id
            WHERE ic.status = :status AND uc.user_id = :id_usuario;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user, ":status" => "PENDIENTE"));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error" . $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_clientes($user)
    {
        try {
            $sql = "SELECT
                CLIENTE.*,ic.id AS id_task,
                ic.status AS task_status,
                ic.fecha_visita,
                ic.hora_visita,
                CASE
                    WHEN UC.cliente_id IS NULL THEN 'No asignado'
                    ELSE CONCAT(USUARIO.nombre, ' ', USUARIO.apellido)
                END AS asignado_usuario,
                PROYECTO.nombreProyecto AS nombre_proyecto, SEDE.id as sede_id, SEDE.direccion, SEDE.ciudad as ciudad_sede, SEDE.name_reference
            FROM
                cliente AS CLIENTE
                INNER JOIN user_sede AS US ON CLIENTE.sede_id = US.sede_id    
                LEFT JOIN user_cliente AS UC ON CLIENTE.id_cliente = UC.cliente_id
                LEFT JOIN usuario AS USUARIO ON UC.user_id = USUARIO.id_usuario
                LEFT JOIN proyectos AS PROYECTO ON CLIENTE.proyet_id = PROYECTO.id LEFT JOIN sede as SEDE ON CLIENTE.sede_id=SEDE.id
                LEFT JOIN (
        SELECT ic1.id,
               ic1.cliente_id,
               ic1.status,
               ic1.fecha_visita,
               ic1.hora_visita
        FROM interaccion_cliente ic1
        JOIN (
            SELECT cliente_id, MAX(CONCAT(fecha_visita, ' ', hora_visita)) AS ultima_interaccion
            FROM interaccion_cliente
            GROUP BY cliente_id
        ) ic2 ON ic1.cliente_id = ic2.cliente_id AND CONCAT(ic1.fecha_visita, ' ', ic1.hora_visita) = ic2.ultima_interaccion
    ) ic ON ic.cliente_id = CLIENTE.id_cliente
            WHERE
                US.user_id = :id_usuario AND CLIENTE.archived=0 ORDER BY CLIENTE.id_cliente;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error";
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_leads_subidos_by_asesores($user)
    {
        try {
            $sql = "SELECT c.* FROM cliente c JOIN usuario u ON c.createdBy = u.id_usuario JOIN user_business ub ON u.id_usuario = ub.user_id JOIN business b ON ub.business_id = b.id WHERE ub.business_id IN ( SELECT ub.business_id FROM user_business ub WHERE ub.user_id = :id_usuario ) AND c.fecha_creation BETWEEN '2024-01-01' AND '2024-09-30' AND c.createdBy!=:id_usuario AND u.usuarioRol=3;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no

            return $this->datos;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error";
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_eventos_by_asesores($fecha_inicio, $fecha_fin, $user)
    {
        try {
            $sql = "SELECT rc.*, c.proyet_id
                    FROM registro_contact rc
                    inner join cliente c on rc.cliente_id=c.id_cliente
                    JOIN usuario u ON rc.user_id = u.id_usuario
                    JOIN user_business ub ON u.id_usuario = ub.user_id
                    JOIN business b ON ub.business_id = b.id
                    WHERE ub.business_id IN (
                        SELECT ub.business_id 
                        FROM user_business ub 
                        WHERE ub.user_id = :id_usuario
                    )
                    AND u.usuarioRol = 3
                    AND STR_TO_DATE(rc.fecha_register, '%d/%m/%Y') BETWEEN :fecha_inicio AND :fecha_fin;

                    ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user, ":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
            $this->datos = $query->fetchAll(); // retorna objetos o no

            return $this->datos;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error";
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_clientes_validar($user)
    {
        try {
            $sql = "SELECT ic.id as id, CASE WHEN ic.cliente_id IS NULL THEN 'No asignado' ELSE CONCAT(u.nombre, ' ', u.apellido) END AS asignado_usuario, c.proyet_id as proyecto_id, ic.fecha_visita as fecha, ic.hora_visita as hora, ic.user_id, ic.tipo, ic.cliente_id, c.nombres, c.apellidos, c.correo, c.celular, u.nombre as nombre_asesor, u.apellido as apellido_asesor, p.nombreProyecto as nombre_proyecto FROM interaccion_cliente ic inner join cliente c on ic.cliente_id=c.id_cliente inner join usuario u on ic.user_id=u.id_usuario INNER JOIN user_proyect AS UP ON c.proyet_id = UP.proyecto_id INNER JOIN proyectos as p on c.proyet_id=p.id WHERE UP.user_id=:id_usuario AND ic.status='SEND_VALIDAR'
            UNION ALL SELECT v.id as id, CASE WHEN v.cliente_id IS NULL THEN 'No asignado' ELSE CONCAT(u.nombre, ' ', u.apellido) END AS asignado_usuario, c.proyet_id as proyecto_id, v.fecha_venta as fecha, '00:00:00', v.user_id, 'VENTA', v.cliente_id, c.nombres, c.apellidos,  c.correo, c.celular, u.nombre as nombre_asesor, u.apellido as apellido_asesor, p.nombreProyecto as nombre_proyecto FROM ventas v inner join cliente c on v.cliente_id=c.id_cliente inner join usuario u on v.user_id=u.id_usuario INNER JOIN user_proyect AS UP ON c.proyet_id = UP.proyecto_id INNER JOIN proyectos as p on c.proyet_id=p.id WHERE UP.user_id=:id_usuario AND v.status='SEND_VALIDAR';";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error" . $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_clientes_validados($user)
    {
        try {
            $sql = "SELECT ic.id as id, ic.status, c.sede_id, s.name_reference, s.ciudad as ciudad_sede, s.direccion, CASE WHEN ic.cliente_id IS NULL THEN 'No asignado' ELSE CONCAT(u.nombre, ' ', u.apellido) END AS asignado_usuario, c.proyet_id as proyecto_id, ic.fecha_visita as fecha, ic.hora_visita as hora, ic.user_id, ic.tipo, ic.cliente_id, c.nombres, c.apellidos, c.correo, c.celular, u.nombre as nombre_asesor, u.apellido as apellido_asesor, p.nombreProyecto as nombre_proyecto FROM interaccion_cliente ic inner join cliente c on ic.cliente_id=c.id_cliente inner join usuario u on ic.user_id=u.id_usuario INNER JOIN user_sede AS US ON c.sede_id = US.sede_id INNER JOIN sede s on US.sede_id=s.id INNER JOIN proyectos as p on c.proyet_id=p.id WHERE US.user_id=:id_usuario AND (ic.status='SEND_VALIDAR' OR ic.status='VALIDADO' OR ic.status='NO VALIDADO')
            
            UNION ALL SELECT v.id as id, v.status, c.sede_id, s.name_reference, s.ciudad as ciudad_sede, s.direccion, CASE WHEN v.cliente_id IS NULL THEN 'No asignado' ELSE CONCAT(u.nombre, ' ', u.apellido) END AS asignado_usuario, c.proyet_id as proyecto_id, v.fecha_venta as fecha, '00:00:00', v.user_id, 'VENTA', v.cliente_id, c.nombres, c.apellidos,  c.correo, c.celular, u.nombre as nombre_asesor, u.apellido as apellido_asesor, p.nombreProyecto as nombre_proyecto FROM ventas v inner join cliente c on v.cliente_id=c.id_cliente inner join usuario u on v.user_id=u.id_usuario INNER JOIN user_sede AS US ON c.sede_id = US.sede_id INNER JOIN sede s on US.sede_id=s.id INNER JOIN proyectos as p on c.proyet_id=p.id WHERE US.user_id=:id_usuario AND (v.status = 'SEND_VALIDAR' OR v.status = 'VALIDADO' OR v.status = 'NO VALIDADO');";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $user));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error" . $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_group_clientes_fecha($fecha_inicio, $fecha_fin, $asesores)
    {
        try {
            $idUsuarios = array_map(function ($asesor) {
                return $asesor->id_usuario;
            }, $asesores);
            $sql = "SELECT c.* FROM cliente c WHERE 
            c.createdBy IN (" . implode(',', $idUsuarios) . ")
            AND c.fecha_creation BETWEEN :fecha_inicio AND :fecha_fin;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error" . $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_group_asignados_fecha($adminuser, $fecha_inicio, $fecha_fin, $asesores)
    {
        try {
            $idUsuarios = array_map(function ($asesor) {
                return $asesor->id_usuario;
            }, $asesores);
            $sql = "SELECT c.nombres, c.apellidos, uc.user_id as usuario_id, c.proyet_id FROM user_cliente uc inner join cliente c on uc.cliente_id=c.id_cliente WHERE  uc.user_id IN (" . implode(',', $idUsuarios) . ") AND c.createdBy=:admin AND uc.fecha_asigned BETWEEN :fecha_inicio AND :fecha_fin;";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":fecha_inicio" => $fecha_inicio, ":fecha_fin" => $fecha_fin, ":admin" => $adminuser));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error" . $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function completar_tarea($id_task)
    {
        try {
            //code...
            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE interaccion_cliente SET status=:status WHERE id=:id_task";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":status" => "COMPLETADO", ":id_task" => $id_task));
            $this->mensaje = "COMPLETADO";
            return $this->mensaje;
        } catch (\Throwable $th) {
            //throw $th;
            $this->mensaje = "fatal_error " . $th;
            return $this->mensaje;
        }
    }
    function validar_interaccion($id_task, $status)
    {
        try {
            //code...
            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE interaccion_cliente SET status=:status WHERE id=:id_task";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":status" => $status, ":id_task" => $id_task));
            $this->mensaje = $status;
            return $this->mensaje;
        } catch (\Throwable $th) {
            //throw $th;
            $this->mensaje = "fatal_error " . $th;
            return $this->mensaje;
        }
    }
    function validar_tarea($id_task)
    {
        try {
            //code...
            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE interaccion_cliente SET status=:status WHERE id=:id_task";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":status" => "SEND_VALIDAR", ":id_task" => $id_task));
            $this->mensaje = "SEND_VALIDAR";
            return $this->mensaje;
        } catch (\Throwable $th) {
            //throw $th;
            $this->mensaje = "fatal_error " . $th;
            return $this->mensaje;
        }
    }
    function validar_venta($id_task, $status)
    {
        try {
            //code...
            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE ventas SET status=:status WHERE id=:id_task";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":status" => $status, ":id_task" => $id_task));
            $this->mensaje = $status;
            return $this->mensaje;
        } catch (\Throwable $th) {
            //throw $th;
            $this->mensaje = "fatal_error " . $th;
            return $this->mensaje;
        }
    }
    function register_visita_agenda($id_task, $cliente, $status)
    {
        try {
            //code...
            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "INSERT INTO visitas_agenda(cliente_id, interaccion_id, status) VALUES (:cliente, :task, :status)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":status" => $status, ":task" => $id_task, ":cliente" => $cliente));
            $this->mensaje = "register";
            return $this->mensaje;
        } catch (\Throwable $th) {
            //throw $th;
            $this->mensaje = "fatal_error " . $th;
            return $this->mensaje;
        }
    }
    // target user
    function buscar_user_asesor($id_usuario)
    {
        try {
            $sql = "SELECT id_usuario, nombre, apellido, correo, phone_number FROM usuario WHERE id_usuario=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-target";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_user_target($id_usuario)
    {
        try {
            $sql = "SELECT * FROM target_user WHERE user_id=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-target";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    // funcion business info
    function buscar_user_info_empresa($id_usuario)
    {
        try {
            $sql = "SELECT b.* FROM user_sede us inner join sede s on us.sede_id=s.id inner join business b on s.empresa_id=b.id  WHERE us.user_id=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-business";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    // funcion targets socials
    function buscar_user_target_socials($id_usuario)
    {
        try {
            $sql = "SELECT * FROM social_networks WHERE user_id=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-socials";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_user_business($data, $id_usuario)
    {
        try {
            // consultar existencia
            $sql = "SELECT * FROM business WHERE user_id=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                $sql = "UPDATE business SET nombre_razon=:nombre_razon, website=:website, phone_contact=:phone_contact, email=:email, logo=:logo WHERE user_id=:id_usuario
            ";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":id_usuario" => $id_usuario, ":logo" => $data->logo, ":nombre_razon" => $data->nombre_razon, ":website" => $data->website, ":phone_contact" => $data->phone_contact, ":email" => $data->email));
            } else {
                $sql = "INSERT INTO business (user_id, nombre_razon, website, phone_contact, email, logo) VALUES (:id_usuario, :nombre_razon, :website, :phone_contact, :email, :logo)
            ";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":id_usuario" => $id_usuario, ":logo" => $data->logo, ":nombre_razon" => $data->nombre_razon, ":website" => $data->website, ":phone_contact" => $data->phone_contact, ":email" => $data->email));
            }

            $this->mensaje = "update-sucess";
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_business($data, $id_business)
    {
        try {
            // consultar existencia
            $sql = "UPDATE business SET nombre_razon=:nombre_razon, website=:website, phone_contact=:phone_contact, email=:email, logo=:logo WHERE id=:id_business
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_business" => $id_business, ":logo" => $data->logo, ":nombre_razon" => $data->nombre_razon, ":website" => $data->website, ":phone_contact" => $data->phone_contact, ":email" => $data->email));


            $this->mensaje = "update-sucess";
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_user_target($data, $id_usuario)
    {
        try {
            // consultar existencia
            $sql = "SELECT * FROM target_user WHERE user_id=:id_usuario
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                $sql = "UPDATE target_user SET picture_perfil=:picture, cover_photo=:cover, name_user=:name, job=:job, custom_description=:custom WHERE user_id=:id_usuario
            ";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":picture" => $data->picture_perfil, ":cover" => $data->cover_photo, ":name" => $data->name_user, ":job" => $data->job, ":custom" => $data->custom_description, ":id_usuario" => $id_usuario));
            } else {
                $sql = "INSERT INTO target_user (user_id, name_user, job, custom_description) VALUES (:id_usuario, :name, :job, :custom)
            ";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":name" => $data->name_user, ":job" => $data->job, ":custom" => $data->custom_description, ":id_usuario" => $id_usuario));
            }

            $this->mensaje = "update-sucess";
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_social_networks($user_id, $redes_sociales)
    {
        try {
            $sql = "INSERT INTO social_networks(url, username, user_id, status, placeholder, social) VALUES (:url, :username, :user_id, :status, :placeholder, :social)";
            $query = $this->conexion->prepare($sql);
            foreach ($redes_sociales as $red) {
                # code...
                $query->execute(array(":user_id" => $user_id, ":url" => $red->url, ":username" => $red->username, ":status" => $red->status, ":placeholder" => $red->placeholder, ":social" => $red->social));
            }

            $this->mensaje = "create-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_social_networks_id($user_id, $redes_sociales)
    {
        try {
            $sql = "UPDATE social_networks SET url=:url, username=:username, status=:status WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            foreach ($redes_sociales as $red) {
                # code...
                $query->execute(array(":url" => $red->url, ":username" => $red->username, ":status" => $red->status, ":id" => $red->id));
            }

            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_img_proyect($id, $ruta)
    {
        try {
            $sql = "UPDATE proyectos SET logo=:logo WHERE id=:id
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id, ":logo" => $ruta));

            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function subirimagenesgallery($id, $galeria)
    {
        try {
            $sql = "INSERT INTO multimedia(url, type, proyecto_id) VALUES (:url, :type, :id)";
            $query = $this->conexion->prepare($sql);
            foreach ($galeria as $ga) {
                # code...
                $query->execute(array(":id" => $id, ":url" => $ga, ":type" => "imagen"));
            }

            $this->mensaje = "create-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_amenidades($id)
    {
        try {
            $sql = "SELECT * FROM amenidades WHERE proyecto_id=:proyecto";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":proyecto" => $id));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-amenidades";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function subir_amenidades($id, $amenidades)
    {
        try {
            $sql = "INSERT INTO amenidades(icono,	nombre,	activo,	proyecto_id) VALUES (:icono, :nombre, :activo, :proyecto)";
            $query = $this->conexion->prepare($sql);
            foreach ($amenidades as $a) {
                # code...
                $query->execute(array(":icono" => $a->icono, ":nombre" => $a->nombre, ":activo" => $a->activo, ":proyecto" => $id));
            }

            $this->mensaje = "create-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function update_amenidad($amenidad)
    {
        try {
            $sql = "UPDATE amenidades SET icono=:icono, nombre=:nombre WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":icono" => $amenidad->icono, ":nombre" => $amenidad->nombre, ":id" => $amenidad->id));
            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function eliminar_amenidad($id)
    {
        try {
            $sql = "DELETE FROM amenidades WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id));
            $this->mensaje = "delete-amenidad";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-amenidad " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function subir_description_proyect($id, $description)
    {
        try {
            $sql = "UPDATE  proyectos SET description=:description WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id, ":description" => $description));

            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function subir_maps_proyect($id, $maps_url)
    {
        try {
            $sql = "UPDATE  proyectos SET maps_url=:maps_url WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id, ":maps_url" => $maps_url));

            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function subir_video_proyect($id, $video)
    {
        try {
            $sql = "UPDATE  proyectos SET video_url=:video WHERE id=:id";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id" => $id, ":video" => $video));

            $this->mensaje = "update-sucess";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function multimedia_proyecto($id)
    {
        $resultado = array(); // Crear un arreglo para almacenar los resultados

        // Consulta preparada para obtener el logo del proyecto
        $sql_logo = "SELECT logo FROM proyectos WHERE id = :id";
        $query_logo = $this->conexion->prepare($sql_logo);
        $query_logo->execute(array(":id" => $id));
        $logo = $query_logo->fetch(PDO::FETCH_ASSOC);

        // Agregar el logo al resultado si existe
        if (!empty($logo['logo'])) {
            $resultado['logo'] = $logo['logo'];
        } else {
            $resultado['logo'] = "";
        }

        // Consulta preparada para obtener el contenido multimedia (selecciona todos los campos con *)
        $sql_multimedia = "SELECT * FROM multimedia WHERE proyecto_id = :id";
        $query_multimedia = $this->conexion->prepare($sql_multimedia);
        $query_multimedia->execute(array(":id" => $id));
        $multimedia = $query_multimedia->fetchAll(PDO::FETCH_ASSOC);

        // Agregar la multimedia al resultado si existe
        if (!empty($multimedia)) {
            $resultado['multimedia'] = $multimedia;
        } else {
            $resultado['multimedia'] = [];
        }

        // Devolver el resultado como JSON
        return json_encode($resultado);
    }
    function eliminar_img($id)
    {

        try {
            $sql_multimedia = "DELETE FROM multimedia  WHERE id = :id";
            $query_multimedia = $this->conexion->prepare($sql_multimedia);
            $query_multimedia->execute(array(":id" => $id));
            $multimedia = $query_multimedia->fetchAll(PDO::FETCH_ASSOC);
            $this->mensaje = "deleted-success";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-deleted" . $error;
            return $this->mensaje;
        }
    }

    function buscar_clientes_by_asesor($id_usuario)
    {
        try {
            $sql = "SELECT 
            c.*, c.createdBy as asigned,
            p.nombreProyecto AS nombre_proyecto,
            ic.id AS id_task,
            ic.status AS task_status,
            ic.fecha_visita,
            ic.hora_visita,
            CONCAT('[', GROUP_CONCAT(CONCAT('{\"nombre\":\"', et.nombre, '\"}') SEPARATOR ', '), ']') AS etiquetas
            FROM cliente c
            INNER JOIN proyectos p ON c.proyet_id = p.id
            LEFT JOIN user_cliente uc on c.id_cliente=uc.cliente_id
            LEFT JOIN (
            SELECT ec.cliente_id, GROUP_CONCAT(et.nombre SEPARATOR ', ') AS nombre
            FROM etiqueta_cliente ec
            JOIN etiqueta et ON ec.etiqueta_id = et.id AND et.user_id = :id_usuario
            GROUP BY ec.cliente_id
        ) et ON c.id_cliente = et.cliente_id
            LEFT JOIN interaccion_cliente ic ON ic.cliente_id = c.id_cliente AND ic.status = 'PENDIENTE'
            WHERE 
                uc.user_id = :id_usuario AND c.archived=0
            GROUP BY 
            c.id_cliente;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_clientes_by_asesor_papelera($id_usuario)
    {
        try {
            $sql = "SELECT
            c.*,
            p.nombreProyecto AS nombre_proyecto,
            ic.id AS id_task,
            ic.status AS task_status,
            ic.fecha_visita,
            ic.hora_visita,
            CONCAT('[', GROUP_CONCAT(CONCAT('{\"nombre\":\"', et.nombre, '\"}') SEPARATOR ', '), ']') AS etiquetas
            FROM
            usuario u
        JOIN user_cliente uc ON u.id_usuario = uc.user_id
        JOIN cliente c ON uc.cliente_id = c.id_cliente
        LEFT JOIN proyectos p ON c.proyet_id = p.id
        LEFT JOIN interaccion_cliente ic ON ic.cliente_id = c.id_cliente AND ic.status = 'PENDIENTE'
        LEFT JOIN (
            SELECT ec.cliente_id, GROUP_CONCAT(et.nombre SEPARATOR ', ') AS nombre
            FROM etiqueta_cliente ec
            JOIN etiqueta et ON ec.etiqueta_id = et.id AND et.user_id = :id_usuario
            GROUP BY ec.cliente_id
        ) et ON c.id_cliente = et.cliente_id
        WHERE
            u.id_usuario = :id_usuario
            AND u.usuarioRol = 3 AND c.archived=1
        GROUP BY c.id_cliente, p.nombreProyecto, ic.id, ic.status, ic.fecha_visita, ic.hora_visita;
        
     
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }
    function buscar_clientes_by_admin_papelera($id_usuario)
    {
        try {
            $sql = "SELECT
                CLIENTE.*,ic.id AS id_task,
                ic.status AS task_status,
                ic.fecha_visita,
                ic.hora_visita,
                CASE
                    WHEN UC.cliente_id IS NULL THEN 'No asignado'
                    ELSE CONCAT(USUARIO.nombre, ' ', USUARIO.apellido)
                END AS asignado_usuario,
                PROYECTO.nombreProyecto AS nombre_proyecto, SEDE.id as sede_id, SEDE.direccion, SEDE.ciudad as ciudad_sede, SEDE.name_reference
            FROM
                cliente AS CLIENTE
                INNER JOIN user_sede AS US ON CLIENTE.sede_id = US.sede_id    
                LEFT JOIN user_cliente AS UC ON CLIENTE.id_cliente = UC.cliente_id
                LEFT JOIN usuario AS USUARIO ON UC.user_id = USUARIO.id_usuario
                LEFT JOIN proyectos AS PROYECTO ON CLIENTE.proyet_id = PROYECTO.id LEFT JOIN sede as SEDE ON CLIENTE.sede_id=SEDE.id
                LEFT JOIN (
        SELECT ic1.id,
               ic1.cliente_id,
               ic1.status,
               ic1.fecha_visita,
               ic1.hora_visita
        FROM interaccion_cliente ic1
        JOIN (
            SELECT cliente_id, MAX(CONCAT(fecha_visita, ' ', hora_visita)) AS ultima_interaccion
            FROM interaccion_cliente
            GROUP BY cliente_id
        ) ic2 ON ic1.cliente_id = ic2.cliente_id AND CONCAT(ic1.fecha_visita, ' ', ic1.hora_visita) = ic2.ultima_interaccion
    ) ic ON ic.cliente_id = CLIENTE.id_cliente
            WHERE
                US.user_id = :id_usuario AND CLIENTE.archived=1 ORDER BY CLIENTE.id_cliente;
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" => $id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error " + $error;
            return $this->mensaje;
            //throw $th;
        }
    }

    // FIN DE SECTION DE CLIENTES

    // SECTION DE RESERVAS
    function crear_reserva($cliente, $documento, $id_hab, $ingreso, $salida, $descuento, $adelanto, $observacion, $total, $total_descuento)
    {
        $sql = "INSERT INTO reservas(cliente, documento, habitacion, fecha_entrada, fecha_salida, observacion, adelanto, descuento, total, total_descuento, estado_reserva) VALUES (:cliente, :documento, :habitacion, :fecha_entrada, :fecha_salida, :observacion, :adelanto, :descuento, :total, :total_descuento, :estado)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":cliente" => $cliente, ":documento" => $documento, ":habitacion" => $id_hab, ":fecha_entrada" => $ingreso, ":fecha_salida" => $salida, ":observacion" => $observacion, ":adelanto" => $adelanto, ":descuento" => $descuento, ":total" => $total, ":total_descuento" => $total_descuento, ":estado" => 'creado'));
            $this->mensaje = "add-reserva";

            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 2, "id_hab" => $id_hab));
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-reserva" . $error;
            return $this->mensaje;
        }
    }
    function cerrar_reserva($total_pagar, $id_reserva, $id_hab, $fecha_today, $id_usuario)
    {
        $sql = "INSERT INTO ventas(id_usuario, id_reserva, total, fecha) VALUES (:id_usuario, :id_reserva, :total, :fecha)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_usuario" => $id_usuario, ":id_reserva" => $id_reserva, ":total" => $total_pagar, ":fecha" => $fecha_today));
            $this->mensaje = "venta_close";

            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 3, ":id_hab" => $id_hab));


            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE reservas SET estado_reserva=:estado_reserva WHERE id_reservas=:id_reserva";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado_reserva" => "finalizado", ":id_reserva" => $id_reserva));

            // ACTUALIZAR ESTADO DE DETALLES DE VENTA
            if (!empty($_POST["carrito_consumo"])) {
                $carrito_consumo = $_POST["carrito_consumo"];
                $length = count($carrito_consumo);
                for ($i = 0; $i < $length; $i++) {
                    $sql = "UPDATE detalle_venta SET estado_pago=:estado_pago WHERE id_detalle_venta=:id_detalle_venta";
                    $query = $this->conexion->prepare($sql);
                    $query->execute(array(":estado_pago" => "PAGADO", ":id_detalle_venta" => $carrito_consumo[$i]["id"]));
                }
            }

            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-reserva" . $error;
            return $this->mensaje;
        }
    }
    function habitacion_limpieza_terminada($key)
    {
        try {
            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 1, "id_hab" => $key));
            $this->mensaje = "change_exito";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "change_fracaso" . $error;
            return $this->mensaje;
        }
    }
}
