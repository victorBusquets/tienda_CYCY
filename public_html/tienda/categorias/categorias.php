<?php
session_start();
	require_once('../../commons/php/conexion.php');
	mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
	mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
	$SQL="SELECT * FROM  `categoria`;"; 
	
	$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
	$contador = 0;
	while($fila =  mysql_fetch_array($result,MYSQL_ASSOC)){
		$datos[$contador]=array('idCategoria'=>$fila["idCategoria"],
                                        'nombreCategoria'=>$fila["nombreCategoria"],
                                        'descripcion'=>$fila["descripcion"],
                                        'imagen'=>$fila["imagen"]);
		$contador++;
	};
	 
	require_once('../../commons/php/Services_JSON.php');
        $oJson = new Services_JSON();
        echo $oJson->encode($datos);
?>