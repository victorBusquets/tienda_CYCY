<?php
session_start();
	require_once('conexion.php');
	mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
	mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
	$SQL="SELECT *,(SELECT nombreCategoria FROM `categoria` WHERE idCategoria = categoria) as nombreCategoria "
                . " FROM producto"
                . " WHERE idProducto in(SELECT producto FROM promocion);";	
	
	$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
	$contador = 0;
	//Inicializamos la variable para que si no hay datos la devuelva vacia pero la devuelva

	while($fila =  mysql_fetch_array($result,MYSQL_ASSOC)){
		$datos[$contador]=array('idProducto'=>$fila["idProducto"],
                                        'nombreCategoria'=>$fila["nombreCategoria"],
                                        'nombreProducto'=>$fila["nombreProducto"],
					'descripcion'=>$fila["descripcion"],
					'precioUnidad'=>$fila["precioUnidad"],
					'imagen'=>$fila["imagen"],
					'categoria'=>$fila["categoria"],
					'stock'=>$fila["stock"]);
		$contador++;
	};
	//echo json_encode($datos);
	        require_once('Services_JSON.php');
        $oJson = new Services_JSON();
        echo $oJson->encode($datos);
?>