<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($fecha_actual >= $fecha_envio) {
    // Datos del correo
    $cliente = $_POST["cliente"];
    $lote = $_POST["lote"];
    $tipo_venta = $_POST["tipo_venta"];
    $asesor = $_POST["asesor"];
    $proyecto = $_POST["proyecto"];
    $observaciones = $_POST["observaciones"];
    $precio_final = $_POST["precio_final"];
    $email_admin = $_POST["email_admin"];

    // Crear una instancia de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();                                            // Enviar usando SMTP
        $mail->Host       = 'mail.mcsolucionesti.com';                     // Configura el servidor SMTP
        $mail->SMTPAuth   = true;                                   // Habilitar autenticación SMTP
        $mail->Username   = 'ventas@mcsolucionesti.com';                     // Nombre de usuario SMTP
        $mail->Password   = 'ventas2024%';                               // Contraseña SMTP
        $mail->SMTPSecure = 'ssl';            // Habilitar encriptación TLS implícita
        $mail->Port       = 465;                                    // Puerto TCP para conectar; usa 587 si tienes `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        // Destinatarios
        $mail->addReplyTo($email);
        $mail->setFrom('ventas@mcsolucionesti.com', 'APPSIRE | McSolucionesTi');
        $mail->addAddress($email_admin, $name);     // Añadir un destinatario
        $mail->addBCC('ventas@mcsolucionesti.com'); // Copia oculta

        // Contenido
        $email_template = 'mail_template.html';
        $mensaje = file_get_contents($email_template);
        $mensaje = str_replace('%cliente%', $cliente, $mensaje);
        $mensaje = str_replace('%lote%', $lote, $mensaje);
        $mensaje = str_replace('%tipo_venta%', $tipo_venta, $mensaje);
        $mensaje = str_replace('%proyecto%', $proyecto, $mensaje);
        $mensaje = str_replace('%observaciones%', $observaciones, $mensaje);
        $mensaje = str_replace('%precio_finak%', $precio_finak, $mensaje);

        $mail->isHTML(true);                                  // Establecer formato de correo a HTML
        $mail->Subject = $name . ' Nuevo cliente interesado en APPSIRE';
        $mail->MsgHTML($mensaje);

        // Enviar el correo
        $mail->send();
        echo 'El mensaje ha sido enviado correctamente';
    } catch (Exception $e) {
        echo "El mensaje no fue enviado por Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Aún no ha llegado la fecha de envío.';
}
