<?php
session_start();
//Comprobamos como se han de ordenar los datos
switch ($_GET["dato2"]) {
    case 0:
    $orden= "ORDER BY idProducto ASC";
        break;
    case 1:
    $orden= "ORDER BY nombreProducto ASC";
        break;
    case 2:
    $orden= "ORDER BY nombreProducto DESC";
        break;
    case 3:
    $orden= "ORDER BY precioUnidad ASC";
        break;
    case 4:
    $orden= "ORDER BY precioUnidad DESC";
        break;
}

require_once('../conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
$SQL = "SELECT *,(SELECT nombreCategoria FROM `categoria` WHERE idCategoria = " . $_GET["dato"] . ")"
        . " as nombreCategoria "
        . "FROM  `producto` "
        . "WHERE categoria = " . $_GET["dato"] . " " .$orden. ";";

$result = mysql_query($SQL) or die("Couldn´t execute query(" . mysql_error . ")");
$contador = 0;
//Inicializamos la variable para que si no hay datos la devuelva vacia pero la devuelva
$datos = "";
while ($fila = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $datos[$contador] = array('idProducto' => $fila["idProducto"],
        'nombreProducto' => $fila["nombreProducto"],
        'descripcion' => $fila["descripcion"],
        'precioUnidad' => $fila["precioUnidad"],
        'imagen' => $fila["imagen"],
        'categoria' => $fila["categoria"],
        'nombreCategoria' => $fila["nombreCategoria"]);
    $contador++;
};

require_once('../Services_JSON.php');
$oJson = new Services_JSON();
echo $oJson->encode($datos);
?>