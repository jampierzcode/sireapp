<?php
// Obtener el ID de la empresa desde la URL
$empresa_id = isset($_GET['id']) ? $_GET['id'] : null;

// Lógica para obtener los detalles de la empresa con el ID proporcionado
// Por ejemplo:
if ($empresa_id) {
    // Realizar consulta a la base de datos y mostrar los detalles de la empresa
} else {
    // Manejar caso donde no se proporciona un ID de empresa válido
}
