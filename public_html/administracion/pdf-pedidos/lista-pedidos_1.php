
<?php

header('Content-Type: text/html; charset=utf-8');

require_once('../../lib/fpdf/fpdf.php');
require_once('../../commons/php/conexion.php');


$conexion = mysqli_connect(host(), usuario(), contrasenya(), 'tienda');

$query = "SELECT * FROM pedido";
$pedidos = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());

$i=0;
while($row = mysqli_fetch_array($pedidos, MYSQL_ASSOC)){
    echo "<div style='border: 1px solid black; width: 30%; margin: 15pt; padding: 10pt;'>";
    echo "id: " . $row['idPedido'] . "<br/>";
    echo "Fecha Pedido: " . $row['fechaPedido'] . "<br/>";
    echo "Cliente num: " . $row['cliente'] . "<br/>";
    echo "Precio total: " . $row['precioTotal'] . "<br/>";
    echo "</div>";
    
    $query = "SELECT * FROM detallepedido WHERE numPedido = " . $row['idPedido'];
    $detalle = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());
    
    while($rowd = mysqli_fetch_array($detalle, MYSQL_ASSOC)){
            echo "<div style='border: 1px solid red; width: 30%; margin: 15pt; padding: 10pt;'>";
            echo "id detalle: " . $rowd['idDetallePedido'] . "<br/>";
            echo "Producto num: " . $rowd['producto'] . "<br/>";
            echo "Precio unidad: " . $rowd['precioUnidad'] . "<br/>";
            echo "Cantidad: " . $rowd['unidades'] . "<br/>";
            echo "</div>";
    }
    
    echo "<br/><br/><br/>";
    
    
}