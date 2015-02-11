<?php
session_start();
require_once('../../commons/php/conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
$SQL =
"SELECT '-Ya hay un cliente registrado con este email.' AS mensaje "
."FROM cliente "
."WHERE email='" .$_GET['email']. "' "
."UNION "
."SELECT '-Este email tiene una cuenta pendiente de confirmacion.' "
."FROM clientependiente "
."WHERE email='" .$_GET['email']. "';"; 
$result=mysql_query($SQL) or die("Couldn�t execute query(" . mysql_error . ")");
$fila =  mysql_fetch_array($result,MYSQL_ASSOC);
echo $fila["mensaje"];
?>