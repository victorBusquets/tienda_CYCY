
<?php

header('Content-Type: text/html; charset=utf-8');

require_once('../../lib/fpdf/fpdf.php');
require_once('../../commons/php/conexion.php');
define('EURO'," " . chr(128));

$conexion = mysqli_connect(host(), usuario(), contrasenya(), 'tienda');
$query = "SELECT MAX(numPedido) FROM detallepedido";
$result = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());
$pedido = mysqli_fetch_array($result)[0];

$query = "SELECT * FROM detallepedido WHERE numPedido = " . $pedido;
$articulos = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());


$data = array();
$i = 0;
while ($row = mysqli_fetch_array($articulos, MYSQL_ASSOC)) {

    $query = "SELECT nombreProducto FROM producto WHERE idProducto = " . $row['producto'];
    $result = mysqli_query($conexion, $query) or die("Couldn t execute query." . mysql_error());
    $articulo = mysqli_fetch_array($result)[0];
    

    $precio = doubleval($row['precioUnidad']) * intval($row['unidades']);
    $data[$i] = array($articulo, $row['precioUnidad'], $row['unidades'], $precio);
    $i++;
}



$pdf = new FPDF();

$pdf->AddPage();

//CABECERA
$pdf->SetFont('Arial', '', 30);
$pdf->Cell(180, 25, "CyCy Store", 0, 1);


//DATOS DEL PEDIDO
$pdf->SetFont('Arial', '', 16);
$pdf->Cell(180, 20, "Pedido num: " . $pedido, 0, 1);


$pdf->SetFont('Arial', 'b', 14);
// Colores, ancho de línea y fuente en negrita
$pdf->SetFillColor(25, 100, 170);
$pdf->SetTextColor(250);
$pdf->SetDrawColor(0);
$pdf->SetLineWidth(.3);

// Títulos de las columnas
$header = array('Articulo', 'Precio/ud', 'Cantidad', 'Precio Total');
// Carga de datos
$w = array(60, 35, 35, 40);
for ($i = 0; $i < count($header); $i++) {
    $pdf->Cell($w[$i], 7, $header[$i], 1, 0, 'C', true);
}
$pdf->Ln();
// Restauración de colores y fuentes
$pdf->SetFillColor(224, 235, 255);
$pdf->SetTextColor(0);
$pdf->SetFont('');

// Datos
$fill = false;
$preciototal = 0.0;
foreach ($data as $row) {
    $pdf->Cell($w[0], 6, $row[0], 'LR', 0, 'L', $fill);
    $pdf->Cell($w[1], 6, $row[1] . EURO, 'LR', 0, 'R', $fill);
    $pdf->Cell($w[2], 6, number_format($row[2]), 'LR', 0, 'R', $fill);
    $pdf->Cell($w[3], 6, $row[3] . EURO, 'LR', 0, 'R', $fill);
    $pdf->Ln();
    $fill = !$fill;
    $preciototal = $preciototal + doubleval($row[3]);
}
// Línea de cierre
$pdf->Cell(array_sum($w), 0, '', 'T');
$pdf->Ln(5);
$pdf->Cell(80, 10, " TOTAL: " . $preciototal . EURO, 1);

$pdf->Output();
