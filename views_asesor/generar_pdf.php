<?php
require_once "dompdf/autoload.inc.php";

use Dompdf\Dompdf;

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["contenido"])) {
    $contenido = $_POST["contenido"];

    $dompdf = new Dompdf();
    $dompdf->loadHtml($contenido);
    $dompdf->render();

    // Guardar el PDF en una ubicación temporal
    $pdfFilePath = 'temp/' . uniqid() . '.pdf';
    file_put_contents($pdfFilePath, $dompdf->output());

    echo $pdfFilePath; // Devolver la ruta del PDF al cliente
}
