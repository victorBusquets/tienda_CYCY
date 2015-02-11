<?php
session_start();

require_once('../../commons/php/conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
$SQL="SELECT concat(nombre,' ',apellido) AS Nombre "
."FROM clientependiente "
."WHERE idCliente=" .$_GET['id']
." AND num_confirmacion=" .$_GET["num"]. ";";
$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
$fila =  mysql_fetch_array($result,MYSQL_ASSOC);
if($fila["Nombre"]==""){
	http_response_code(404);	
}else{
echo $fila["Nombre"];
}

/*ENSEÑAR SALVA
$a=(int) $_GET["num"];
$b=(int) $_GET["id"];
if(($a==$_GET["num"])&&($b==$_GET["id"])){
	echo "Igual ".$a." ".$b." ".$_GET["num"]." ".$_GET["id"];
}else{
	echo "Distinto ".$a." ".$b." ".$_GET["num"]." ".$_GET["id"];
}
*/

?>