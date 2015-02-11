<?php

require_once('../../../commons/php/conexion.php');

$nombreProducto = $_POST['nombreProducto'];
$descripcion = $_POST['descripcion'];
$precioUnidad = $_POST['precioUnidad'];
$imagen = $_POST['imagen'];
$categoria = $_POST['categoria'];
$stock = $_POST['stock'];

$conexion = mysqli_connect(host(), usuario(), contrasenya(),'tienda');

if(!$conexion){
    die("Conexión Fallida:"+mysqli_connect_error());
}

$query = "INSERT INTO producto VALUES (null,'$nombreProducto','$descripcion','$precioUnidad','$imagen','$categoria','$stock');";

mysqli_query($conexion,$query);

$respuesta = array(
   'nombreProducto'=>$nombreProducto,
   'descripcion'=>$descripcion,
   'precioUnidad'=>$precioUnidad,
   'imagen'=>$imagen,
   'categoria'=>$categoria,
   'stock'=>$stock
);

mysqli_close($conexion);
echo json_encode($respuesta);


?>