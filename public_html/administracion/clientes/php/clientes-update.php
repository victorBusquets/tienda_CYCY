<?php

require_once('../../conexion.php');

$connection = mysqli_connect(host(), usuario(), contrasenya(), "tienda") or die("Connection Error: " . mysql_error());

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$id = $_POST["id"];
$email = $_POST["email"];
$contrasenya = $_POST["contrasenya"];
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$dni = $_POST["dni"];
$telefono = $_POST["telefono"];


$query = "UPDATE cliente SET email = '$email', contrasenya = '$contrasenya', nombre = '$nombre', apellido = '$apellido', dni = '$dni', telefono = '$telefono' WHERE idCliente = $id";

echo $query;
echo mysqli_query($connection, $query);

mysqli_close($connection);


