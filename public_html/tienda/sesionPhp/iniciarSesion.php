<?php
session_start();
$email = $_POST['email'];
$contrasenya = $_POST['contrasenya'];
require_once('../../commons/php/conexion.php');


	mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
	mysql_select_db("tienda") or die("Error conecting to db.");
	$result = mysql_query("SELECT * FROM cliente WHERE email='" .$email. "';");
	$contrasenyaBD="";
	while($fila =  mysql_fetch_array($result,MYSQL_ASSOC)){
		$contrasenyaBD=$fila["contrasenya"];
		$idUsuario=$fila["idCliente"];
	}
	if($contrasenya==$contrasenyaBD){
		$_SESSION["user"]=$email;
		$_SESSION["idUser"]=$idUsuario;
	}else{
		http_response_code(403);
	}
?>