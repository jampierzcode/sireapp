<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Configuración de la fecha y hora de envío
$fecha_envio = "2024-08-07 09:20:00";
$fecha_actual = date("Y-m-d H:i:s");

if ($fecha_actual >= $fecha_envio) {
    // Datos del correo
    $name = "Jampier Vasquez";
    $telefono = "946943998";
    $message = "Visita programada para las 9:10 pm";
    $email = "jbohorquez2299@gmail.com";
    
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
        $mail->addAddress($email, $name);     // Añadir un destinatario
        $mail->addBCC('ventas@mcsolucionesti.com'); // Copia oculta

        // Contenido
        $email_template = 'mail_template.html';
        $mensaje = file_get_contents($email_template);
        $mensaje = str_replace('%name%', $name, $mensaje);
        $mensaje = str_replace('%telefono%', $telefono, $mensaje);
        $mensaje = str_replace('%message%', $message, $mensaje);

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
?>
