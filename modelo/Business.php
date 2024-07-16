<?php
include_once "Conexion.php";

class Business
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
    function buscar_empresas()
    {
        $sql = "SELECT * FROM business";
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
    function register_empresa($data, $user_id)
    {
        try {
            $sql = "INSERT INTO business (nombre_razon, website, documento, phone_contact, email, logo, fecha_created, created_by) VALUES (:nombre_razon, :website, :documento, :phone_contact, :email, :logo, :fecha_created, :created_by)
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":created_by" => $user_id, ":logo" => $data->logo, ":nombre_razon" => $data->name, ":website" => $data->website, ":documento" => $data->documento, ":phone_contact" => $data->phone_contact, ":email" => $data->email, ":fecha_created" => $data->fecha_created));
            $business_id = $this->conexion->lastInsertId();
            $response = (object) [
                'msg' => 'add-business',
                'empresa_id' => $business_id,
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
    function register_sede($data)
    {
        try {
            $sql = "INSERT INTO sede (direccion, phone_contact, ciudad, ubicacion_google, empresa_id, name_reference) VALUES (:direccion, :phone_contact, :ciudad, :ubicacion_google, :empresa_id, :name_reference)
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":direccion" => $data->direccion, ":phone_contact" => $data->phone_contact, ":ciudad" => $data->ciudad, ":ubicacion_google" => $data->ubicacion_google, ":empresa_id" => $data->empresa_id, ":name_reference" => $data->name_reference));
            $sede_id = $this->conexion->lastInsertId();
            $response = (object) [
                'msg' => 'add-sede',
                'sede_id' => $sede_id,
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
    function register_caja($data, $created_by)
    {
        try {
            $sql = "INSERT INTO caja (nombre, fecha_creation, created_by, sede_id) VALUES (:nombre, :fecha_creation, :created_by, :sede_id)
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":nombre" => $data->nombre, ":fecha_creation" => $data->fecha_creation, ":created_by" => $created_by, ":sede_id" => $data->sede_id));
            $caja_id = $this->conexion->lastInsertId();
            $response = (object) [
                'msg' => 'add-caja',
                'caja_id' => $caja_id,
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
    function register_proyecto($data)
    {
        try {
            $sql = "INSERT INTO proyectos (nombreProyecto, logo, imgUrl, empresa_id, cantLotes) VALUES (:nombreProyecto, :logo, :imgUrl, :empresa_id, :cantLotes)
            ";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":nombreProyecto" => $data->nombreProyecto, ":logo" => $data->logo, ":imgUrl" => $data->imgUrl, ":empresa_id" => $data->empresa_id, ":cantLotes" => $data->cantLotes));
            $proyecto_id = $this->conexion->lastInsertId();
            $response = (object) [
                'msg' => 'add-proyecto',
                'sede_id' => $proyecto_id,
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
    function buscar_proyectos_by_empresa($empresa_id)
    {
        $sql = "SELECT * FROM proyectos WHERE empresa_id=:empresa_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":empresa_id" => $empresa_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_by_empresa($empresa_id)
    {
        $sql = "SELECT u.*, r.nombreRol as nombre_rol FROM user_business ub inner join usuario u on ub.user_id=u.id_usuario inner join roles r on u.usuarioRol=r.id WHERE ub.business_id=:empresa_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":empresa_id" => $empresa_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_sedes_by_empresa($empresa_id)
    {
        $sql = "SELECT * FROM sede WHERE empresa_id=:empresa_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":empresa_id" => $empresa_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    // nivel de sedes
    function buscar_proyectos_by_sede($sede_id)
    {
        $sql = "SELECT ps.*, p.* FROM proyecto_sede ps inner join proyectos p on ps.proyecto_id=p.id WHERE ps.sede_id=:sede_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":sede_id" => $sede_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_cajas_by_sede($sede_id)
    {
        $sql = "SELECT * FROM caja WHERE sede_id=:sede_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":sede_id" => $sede_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_by_sede($sede_id)
    {
        $sql = "SELECT us.*, u.* FROM user_sede us inner join usuario u on us.user_id=u.id_usuario WHERE us.sede_id=:sede_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":sede_id" => $sede_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_sedes_by_usuario($user_id)
    {
        $sql = "SELECT s.* FROM user_sede us inner join sede s on us.sede_id=s.id WHERE us.user_id=:user_id";
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
    function buscar_usuarios_admin()
    {
        $sql = "SELECT u.*, r.nombreRol as nombre_rol FROM usuario u inner join roles r on u.usuarioRol=r.id WHERE u.usuarioRol=:rol";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":rol" => 2));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function asignar_proyecto_sede($sede_id, $proyecto_id, $fecha_asigned, $created_by)
    {
        try {
            $sql = "INSERT INTO proyecto_sede(proyecto_id, sede_id, fecha_asigned, created_by) VALUES(:proyecto_id, :sede_id, :fecha_asigned, :created_by)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":sede_id" => $sede_id, ":proyecto_id" => $proyecto_id, ":fecha_asigned" => $fecha_asigned, ":created_by" => $created_by));
            $response = (object) [
                'msg' => 'add-asigned',
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
    function asignar_usuario_sede($sede_id, $user_id, $fecha_asigned, $created_by)
    {
        try {
            $sql = "INSERT INTO user_sede(user_id, sede_id, fecha_asigned, created_by) VALUES(:user_id, :sede_id, :fecha_asigned, :created_by)";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":sede_id" => $sede_id, ":user_id" => $user_id, ":fecha_asigned" => $fecha_asigned, ":created_by" => $created_by));
            $response = (object) [
                'msg' => 'add-asigned',
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
}
