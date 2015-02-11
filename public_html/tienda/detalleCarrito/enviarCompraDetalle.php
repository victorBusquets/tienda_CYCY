<?php
session_start();
require_once('../../commons/php/conexion.php');
$datos=$_POST["datos"];
$datos=json_decode($datos);
mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
$SQL="INSERT INTO detallepedido (`numPedido`, `producto`, `precioUnidad`, `unidades`)
	VALUES ((SELECT max(idPedido)+1 FROM pedido), ".$datos->idProducto.", ".$datos->precioUnidad.", ".$datos->unidades.");"; 
mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
//Restamos unidades
$SQL="UPDATE producto SET stock=stock-".$datos->unidades." WHERE  idProducto=".$datos->idProducto.";";
mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
//echo $datos->nombreProducto;
//echo gettype($datos);
?>