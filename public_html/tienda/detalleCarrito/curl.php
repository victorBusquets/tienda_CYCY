<?php
$cuentaOrigen = $_POST['cuentaOrigen'];
$cuentaDestino = $_POST['cuentaDestino'];
$pin = $_POST['pin'];
$cantidad =$_POST['cantidad'];
$concepto = $_POST['concepto'];

$json = array(
    "cuentaOrigen" => $cuentaOrigen,
    "cuentaDestino" => $cuentaDestino,
    "pin" => $pin,
    "cantidad" => $cantidad,
    "concepto" => $concepto
);

$jsonEntrada = json_encode($json);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://tomcat-cycycorpstore.rhcloud.com/api/Transaccion");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonEntrada);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8'); 
curl_exec($ch);
curl_close($ch);
?>