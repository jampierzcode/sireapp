<?php
// Verificar si se ha enviado alguna imagen
function crearCarpeta($carpeta)
{
    if (!file_exists($carpeta)) {
        mkdir($carpeta, 0777, true);
    }
}

if (isset($_FILES['imagen'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = count($_FILES['imagen']['name']);
    $carpeta = $_POST["carpeta"];
    $proyecto = $_POST["proyecto"];

    crearCarpeta("../imagenes/" . $carpeta . "/" . $proyecto);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {
        for ($i = 0; $i < $totalImagenes; $i++) {
            $nombreImagen = $_FILES['imagen']['name'][$i];
            $tmpImagen = $_FILES['imagen']['tmp_name'][$i];
            $rutaDestino = "../imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            $rutas = "imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            // Mover la imagen a la carpeta de destino
            move_uploaded_file($tmpImagen, $rutaDestino);
        }
        echo $rutas;
    } catch (\Throwable $th) {
        echo $th;
    }
}
if (isset($_FILES['imagengallery'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = count($_FILES['imagengallery']['name']);
    $carpeta = $_POST["carpeta"];
    $proyecto = $_POST["proyecto"];

    crearCarpeta("../imagenes/" . $carpeta . "/" . $proyecto);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {
        for ($i = 0; $i < $totalImagenes; $i++) {
            $nombreImagen = $_FILES['imagengallery']['name'][$i];
            $tmpImagen = $_FILES['imagengallery']['tmp_name'][$i];
            $rutaDestino = "../imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            $rutas[] = "imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            // Mover la imagen a la carpeta de destino
            move_uploaded_file($tmpImagen, $rutaDestino);
        }

        echo json_encode($rutas);
    } catch (\Throwable $th) {
        echo $th;
    }
}
// imagenes de empresa business
if (isset($_FILES['businesslogo'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = $_FILES['businesslogo']['name'];
    $carpeta = $_POST["carpeta"];

    crearCarpeta("../imagenes/" . $carpeta);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {

        $nombreImagen = uniqid() . '-' . $_FILES['businesslogo']['name'];
        $tmpImagen = $_FILES['businesslogo']['tmp_name'];
        $rutaDestino = "../imagenes/" . $carpeta . "/" . $nombreImagen;

        $rutas = "imagenes/" . $carpeta . "/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } catch (\Throwable $th) {
        echo $th;
    }
}

if (isset($_POST["funcion"]) && $_POST["funcion"] === "delete_image_business") {
    $route =  "../" . $_POST["route"];
    if (file_exists($route)) {
        unlink($route);
        echo "delete-sucess";
        // if (unlink($route)) {
        //     echo "delete-sucess";
        // } else {
        //     echo "error-delete";
        // }
    } else {
        echo "no-existe";
    }
}
if (isset($_POST["funcion"]) && $_POST["funcion"] === "update_image_business") {
    $route =  "../" . $_POST["route"];
    if (file_exists($route)) {
        unlink($route);
        $nombreImagen = uniqid() . '-' . $_FILES['businessimagenupdate']['name'];
        $tmpImagen = $_FILES['businessimagenupdate']['tmp_name'];
        $rutaDestino = "../imagenes/business/" . $nombreImagen;

        $rutas = "imagenes/business/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } else {
        echo "no-existe";
    }
}



// imagenes de targets socials
if (isset($_FILES['targetimagen'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = $_FILES['targetimagen']['name'];
    $carpeta = $_POST["carpeta"];

    crearCarpeta("../imagenes/" . $carpeta);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {

        $nombreImagen = uniqid() . '-' . $_FILES['targetimagen']['name'];
        $tmpImagen = $_FILES['targetimagen']['tmp_name'];
        $rutaDestino = "../imagenes/" . $carpeta . "/" . $nombreImagen;

        $rutas = "imagenes/" . $carpeta . "/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } catch (\Throwable $th) {
        echo $th;
    }
}
if (isset($_POST["funcion"]) && $_POST["funcion"] === "update_logo_proyecto") {
    $route =  "../" . $_POST["route"];
    if (file_exists($route)) {
        unlink($route);
        $nombreImagen = uniqid() . '-' . $_FILES['targetimagenupdate']['name'];
        $tmpImagen = $_FILES['targetimagenupdate']['tmp_name'];
        $rutaDestino = "../imagenes/logos/" . $nombreImagen;

        $rutas = "imagenes/logos/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } else {
        echo "no-existe";
    }
}

if (isset($_POST["funcion"]) && $_POST["funcion"] === "delete_image") {
    $route =  "../" . $_POST["route"];
    if (file_exists($route)) {
        unlink($route);
        echo "delete-sucess";
        // if (unlink($route)) {
        //     echo "delete-sucess";
        // } else {
        //     echo "error-delete";
        // }
    } else {
        echo "no-existe";
    }
}
if (isset($_POST["funcion"]) && $_POST["funcion"] === "update_image") {
    $route =  "../" . $_POST["route"];
    if (file_exists($route)) {
        unlink($route);
        $nombreImagen = uniqid() . '-' . $_FILES['targetimagenupdate']['name'];
        $tmpImagen = $_FILES['targetimagenupdate']['tmp_name'];
        $rutaDestino = "../imagenes/targets/" . $nombreImagen;

        $rutas = "imagenes/targets/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } else {
        echo "no-existe";
    }
}

// Enviar respuesta al cliente si es necesario
