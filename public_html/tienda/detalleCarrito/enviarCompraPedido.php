<?php
session_start();
require_once('../../commons/php/conexion.php');
$precioFinal=$_POST["precioFinal"];
mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
$SQL="INSERT INTO pedido 
	(SELECT max(idPedido)+1,CURDATE(), ".$_SESSION["idUser"].", ".$precioFinal." 
	FROM pedido);"; 
mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
//echo $datos->nombreProducto;
//echo gettype($datos);
?>