
<?php

header('Content-Type: text/html; charset=utf-8');

require_once('../../lib/fpdf/fpdf.php');
require_once('../../commons/php/conexion.php');


$conexion = mysqli_connect(host(), usuario(), contrasenya(), 'tienda');

$query = "SELECT * FROM pedido";
$pedidos = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());


$pdf = new FPDF();
$pdf->AddPage();

//CABECERA
$pdf->SetFont('Arial', '', 30);
$pdf->Cell(180, 40, "CyCy Store", 0, 1);


$pdf->SetFillColor(224, 235, 255);

$header = array('Articulo', 'Precio/ud', 'Cantidad', 'Precio Total');
// Carga de datos
$w = array(60, 35, 35, 40);



while ($row = mysqli_fetch_array($pedidos, MYSQL_ASSOC)) {
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(180, 10, "Pedido num: " . $row['idPedido'], 0);
    $pdf->Ln();
    $pdf->SetFont('Arial', '', 15);
    $pdf->Cell(180, 10, "Fecha Pedido: " . $row['fechaPedido'], 0);
    $pdf->Ln();
    $pdf->Cell(180, 10, "Cliente: " . $row['cliente'], 0);
    $pdf->Ln();
    $pdf->Cell(180, 10, "Precio Total: " . $row['precioTotal'], 0);


    $query = "SELECT * FROM detallepedido WHERE numPedido = " . $row['idPedido'];
    $detalle = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());
    $fill = false;
    $preciototal = 0.0;
    $pdf->Ln(15);
    
    $pdf->SetTextColor(0);
    $pdf->SetFont('');
    //cabecera tabla detalles
    for ($i = 0; $i < count($header); $i++) {
        $pdf->Cell($w[$i], 7, $header[$i], 1, 0, 'C', true);
    }
    while ($rowd = mysqli_fetch_array($detalle, MYSQL_ASSOC)) {
        
        $pdf->Ln();
        $pdf->Cell($w[0], 6, $rowd['producto'], 'LR', 0, 'L', $fill);
        $pdf->Cell($w[1], 6, $rowd['precioUnidad'] . "e", 'LR', 0, 'R', $fill);
        $pdf->Cell($w[2], 6, number_format($rowd['unidades']), 'LR', 0, 'R', $fill);
        $pdf->Cell($w[3], 6, $rowd['precioUnidad']*number_format($rowd['unidades']) . "e", 'LR', 0, 'R', $fill);
//        $pdf->Ln();
//        $fill = !$fill;
//        $preciototal = $preciototal + doubleval($row[3]);
//
//            echo "<div style='border: 1px solid red; width: 30%; margin: 15pt; padding: 10pt;'>";
//            echo "id detalle: " . $rowd['idDetallePedido'] . "<br/>";
//            echo "Producto num: " . $rowd['producto'] . "<br/>";
//            echo "Precio unidad: " . $rowd['precioUnidad'] . "<br/>";
//            echo "Cantidad: " . $rowd['unidades'] . "<br/>";
//            echo "</div>";
    }
    $pdf->Ln();
    $pdf->Cell(array_sum($w), 0, '', 'T');

}

    $pdf->Output();
