<?php
session_start();
if(isset($_SESSION["email"])){
$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction

if (!$sidx) {
    $sidx = 1;
}

require_once('../../../commons/php/conexion.php');
// Connect to database
mysql_connect(host(), usuario(), contrasenya())
        or die("Connection Error: " . mysql_error());

mysql_select_db("tienda") or die("Error conecting to db.");

$result = mysql_query("SELECT COUNT(*) AS count FROM cliente");
$row = mysql_fetch_array($result, MYSQL_ASSOC);
$count = $row['count'];



if ($count > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages) {
    $page = $total_pages;
}
$start = $limit * $page - $limit;
$SQL = "SELECT `idCliente`, `email`, `contrasenya`,  `nombre`,  "
        . "`apellido`,  `dni`,  `telefono` "
        . "FROM cliente ORDER BY $sidx $sord  LIMIT $start , $limit";
$result2 = mysql_query($SQL) or die("Couldn't execute query." . mysql_error());


$responce = new stdClass();
$responce->page = $page;
$responce->total = $total_pages;
$responce->records = $count;
$i = 0;

while ($row = mysql_fetch_array($result2, MYSQL_ASSOC)) {
    $responce->rows[$i]['id'] = $row['idCliente'];
    $responce->rows[$i]['cell'] = array($row['idCliente'], $row['email'], $row['contrasenya'], $row['nombre'], $row['apellido'], $row['dni'], $row['telefono']);
    $i++;
}
echo json_encode($responce);
}else{
	http_response_code(403);	
}
