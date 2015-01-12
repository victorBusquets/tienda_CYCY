<?php
session_start();
	require_once('conexion.php');
	mysql_connect(host(),usuario(),contrasenya()) or die("Conection Error: " . mysql_error);
	mysql_select_db ("tienda") or die("Error connecting to db(" . mysql_error .")");
	
	//Hacemos un select union para sacar tanto las categorias como los productos de nuestra tienda
	$SQL="SELECT idCategoria as id, imagen, nombreCategoria as nombre,'categoria'as tipo, ''as ruta "
                . "FROM categoria "
                . "WHERE nombreCategoria like '%". $_GET["dato"] ."%' "
                . "UNION "
                . "SELECT idProducto, imagen, nombreProducto as nombre,'producto'as tipo, "
                . "(SELECT nombreCategoria FROM `categoria` WHERE idCategoria = categoria) as ruta "
                . "FROM producto "
                . "WHERE nombreProducto like '%". $_GET["dato"] ."%';";
	
	$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error .")");
	$contador = 0;
	$datos="";
	while($fila =  mysql_fetch_array($result,MYSQL_ASSOC)){
		$datos[$contador]=array('nombre'=>$fila["nombre"],
                                        'tipo'=>$fila["tipo"],
                                        'imagen'=>$fila["imagen"],
                                        'ruta'=>$fila["ruta"],
                                        'id'=>$fila["id"]);
		$contador++;
	};

        require_once('Services_JSON.php');
        $oJson = new Services_JSON();
        echo $oJson->encode($datos);
?>