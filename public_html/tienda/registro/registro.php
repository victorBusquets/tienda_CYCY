<?php
session_start();
if($_POST["telefono"]==""){
	$telefono="null";
}else{
	$telefono=$_POST["telefono"];
}


 $num_confirmacion=rand(100,999).rand(100,999);
require_once('../conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
$SQL = "INSERT INTO clientependiente (email, contrasenya, nombre, apellido, dni, telefono, num_confirmacion) "
		."VALUES ('" .$_POST["email"]. "','" .$_POST["pass"]. "', '" .$_POST["nombre"]. "', '" .$_POST["apellidos"]. "', '" .$_POST["dni"]. "',".$telefono.", " .$num_confirmacion. ");";
mysql_query($SQL) or die("Couldn�t execute query(" . mysql_error . ")");
$datos=array("nombre"=>$_POST["nombre"],
            "num"=>$num_confirmacion,
            "id"=>mysql_insert_id(),);
header('Content-Type: application/json');
echo json_encode($datos);
//mysql_insert_id()
?>