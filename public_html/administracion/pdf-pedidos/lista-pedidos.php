
<?php

header('Content-Type: text/html; charset=utf-8');

require_once('../../lib/fpdf/fpdf.php');
require_once('../../commons/php/conexion.php');
define('EURO', " " . chr(128));

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

    $pdf->SetTextColor(255);
    $pdf->SetFont('', 'B');
    $pdf->SetFillColor(124, 135, 175);
    //cabecera tabla detalles
    for ($i = 0; $i < count($header); $i++) {
        $pdf->Cell($w[$i], 7, $header[$i], 1, 0, 'C', true);
    }
    $pdf->SetFont('', '');
    $pdf->SetFillColor(224, 235, 255);
    $pdf->SetTextColor(0);
    while ($rowd = mysqli_fetch_array($detalle, MYSQL_ASSOC)) {

        $query = "SELECT nombreProducto FROM producto WHERE idProducto = " . $rowd['producto'];
        $result = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());
        $articulo = mysqli_fetch_array($result)[0];

        $pdf->Ln();
        $pdf->Cell($w[0], 6, $articulo, 'LR', 0, 'L', $fill);
        $pdf->Cell($w[1], 6, $rowd['precioUnidad'] . EURO, 'LR', 0, 'R', $fill);
        $pdf->Cell($w[2], 6, number_format($rowd['unidades']), 'LR', 0, 'R', $fill);
        $pdf->Cell($w[3], 6, $rowd['precioUnidad'] * number_format($rowd['unidades']) . EURO, 'LR', 0, 'R', $fill);
        $fill = !$fill;
    }
    $pdf->Ln();
    $pdf->Cell(array_sum($w), 0, '', 'T');
}

$pdf->Output();
