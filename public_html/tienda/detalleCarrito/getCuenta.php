<?php

    session_start();
    require_once('../../commons/php/conexion.php');

    mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
    mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
    
    $SQL = "SELECT valor FROM config WHERE clave = 'cuenta'";
    $SQL2 = "SELECT valor FROM config WHERE clave = 'pin'";
    
    $cuenta = mysql_query($SQL) or die("Couldn't execute query(" . mysql_error .")");
    $pin = mysql_query($SQL2) or die("Couldn't execute query(" . mysql_error .")");
    
    $cuenta =  mysql_fetch_array($cuenta,MYSQL_ASSOC);
     $pin =  mysql_fetch_array($pin,MYSQL_ASSOC); 
     
    $resultado = array(
        "cuenta" => $cuenta["valor"],
        "pin" => $pin["valor"],
    );
    
    header('Content-Type: application/json');
    echo json_encode($resultado);
?>