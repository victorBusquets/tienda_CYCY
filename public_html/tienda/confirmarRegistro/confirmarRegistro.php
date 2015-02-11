<?php
session_start();
require_once('../../commons/php/conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
$SQL ="INSERT INTO cliente "
		."(email,contrasenya,nombre,apellido,dni,telefono) "
		."SELECT email,contrasenya,nombre,apellido,dni,telefono "
		."FROM clientependiente "
		."WHERE idCliente=".$_GET['id']
		." AND num_confirmacion=".$_GET['num'].";";
$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
if($result==1){		
	$SQL="DELETE FROM clientependiente "
			."WHERE idCliente=".$_GET['id']
			." AND num_confirmacion=".$_GET['num'].";";	
	mysql_query($SQL) or die("Couldn�t execute query(" . mysql_error . ")");
}else{
		http_response_code(404);	
}
//mysql_insert_id()
?>