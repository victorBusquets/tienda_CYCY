<?php
$cuentaOrigen = $_POST['cuentaOrigen'];
$cuentaDestino = $_POST['cuentaDestino'];
$pin = $_POST['pin'];
$cantidad =$_POST['cantidad'];
$concepto = $_POST['concepto'];

$transaccion = new stdClass();

$transaccion = array(
    "cuentaOrigen" => $cuentaOrigen,
    "cuentaDestino" => $cuentaDestino,
    "pin" => $pin,
    "cantidad" => $cantidad,
    "concepto" => $concepto
);

$jsonSalida = json_encode($transaccion);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://tomcat-cycycorpstore.rhcloud.com/api/Transaccion");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonSalida);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));
curl_exec($ch);
curl_close($ch);
?>
