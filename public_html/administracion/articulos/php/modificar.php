<?php
require_once '../../conexion.php';

$idProducto = $_POST['idProducto'];
$nombreProducto = $_POST['nombreProducto'];
$descripcion = $_POST['descripcion'];
$precioUnidad = $_POST['precioUnidad'];
$imagen = $_POST['imagen'];
$categoria = $_POST['categoria'];
$stock = $_POST['stock'];

$conexion = mysqli_connect(host(),usuario(), contrasenya(),'tienda');

$query;
if($imagen!=null){
    $query = "UPDATE producto SET nombreProducto='$nombreProducto', descripcion='$descripcion', precioUnidad='$precioUnidad', imagen='$imagen',categoria='$categoria', stock='$stock' WHERE idProducto='$idProducto';";
}else{
    $query = "UPDATE producto SET nombreProducto='$nombreProducto', descripcion='$descripcion', precioUnidad='$precioUnidad',categoria='$categoria', stock='$stock' WHERE idProducto='$idProducto';";
}

echo mysqli_query($conexion,$query);
mysqli_close($conexion);
?>