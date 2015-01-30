<?php

require_once('../../conexion.php');

$connection = mysqli_connect(host(), usuario(), contrasenya(), "tienda") or die("Connection Error: " . mysql_error());

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$idCliente = $_POST["id"];


$query = "DELETE FROM cliente WHERE idCliente = $idCliente";

mysqli_query($connection, $query);

mysqli_close($connection);


