<?php
if ($_POST["funcion"] == "dni") {
    $dni = $_POST["documento"];
    $data = file_get_contents("https://api.apis.net.pe/v1/dni?numero=" . $dni);
    // $json = json_decode($data);
    echo $data;
}
if ($_POST["funcion"] == "ruc") {
    $ruc = $_POST["documento"];
    $data = file_get_contents("https://dniruc.apisperu.com/api/v1/ruc/" . $ruc . "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImphbXBpZXJ2MTI3QGdtYWlsLmNvbSJ9.c5i7nDGv357b_CXah-_vGdoxWBZhuvu9Lx-XnhxaUGE");
    echo $data;
}
