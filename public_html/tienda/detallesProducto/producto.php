<?php
session_start();
	require_once('../../commons/php/conexion.php');
	mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
	mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
	$SQL="SELECT *,(SELECT nombreCategoria FROM `categoria` WHERE idCategoria = categoria)as nombreCategoria "
                . "FROM  `producto` "
                . "WHERE idProducto = ". $_GET["dato"] .";"; 
	
	$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
	$contador = 0;
	
	while($fila =  mysql_fetch_array($result,MYSQL_ASSOC)){
		$datos[$contador]=array('idProducto'=>$fila["idProducto"],
                                        'nombreProducto'=>$fila["nombreProducto"],
                                        'descripcion'=>$fila["descripcion"],
                                        'precioUnidad'=>$fila["precioUnidad"],
                                        'imagen'=>$fila["imagen"],
                                        'categoria'=>$fila["categoria"],
                                        'nombreCategoria'=>$fila["nombreCategoria"],
                                        'stock'=>$fila["stock"]);
		$contador++;
	};
	//echo json_encode($datos);
require_once('../../commons/php/Services_JSON.php');
        $oJson = new Services_JSON();
        echo $oJson->encode($datos);
?>