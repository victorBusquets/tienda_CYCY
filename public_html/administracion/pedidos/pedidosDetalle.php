<?php
$examp = $_GET["q"]; //query number

$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction
$id = $_GET['id'];
if(!$sidx) $sidx =1;

// connect to the database
require_once('../conexion.php');
mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);

mysql_select_db("tienda") or die("Error conecting to db.");

switch ($examp) {
    case 1:
		$result = mysql_query("SELECT count(*) AS count FROM detallepedido WHERE numPedido=".$id);
		$row = mysql_fetch_array($result,MYSQL_ASSOC);
		$count = $row['count'];

		if( $count >0 ) {
			$total_pages = ceil($count/$limit);
		} else {
			$total_pages = 0;
		}
        if ($page > $total_pages) $page=$total_pages;
		$start = $limit*$page - $limit; // do not put $limit*($page - 1)
		if ($start<0) $start = 0;
        $SQL = "SELECT idDetallePedido,numPedido,producto,precioUnidad,unidades FROM detallepedido WHERE numPedido=".$id." ORDER BY $sidx $sord LIMIT $start , $limit";
		$result = mysql_query( $SQL ) or die("Couldnt execute query.".mysql_error());
		$responce = new stdClass();
        $responce->page = $page;
        $responce->total = $total_pages;
        $responce->records = $count;
        $i=0;
		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
			$responce->rows[$i]['id']=$row["idDetallePedido"];
            $responce->rows[$i]['cell']=array($row["idDetallePedido"],$row["numPedido"],$row["producto"],$row["precioUnidad"],$row["unidades"]);
            $i++;
		}        
        echo json_encode($responce);
           
        break;
}
?>