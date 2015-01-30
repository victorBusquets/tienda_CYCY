<?php

require_once '../../conexion.php';
$idProducto = $_POST['idProducto'];

$conexion = mysqli_connect(host(), usuario(), contrasenya(),'tienda');

$query = "DELETE FROM producto WHERE idProducto='$idProducto';";

echo mysqli_query($conexion,$query);

mysqli_close($conexion);

?>