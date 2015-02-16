<?php

    require_once ('../../commons/php/conexion.php');
    
    mysql_connect(host(), usuario(), contrasenya()) or die("Conection Error: " . mysql_error);
    mysql_select_db("tienda") or die("Error connecting to db(" . mysql_error . ")");
   
    
    $SQL = "SELECT valor FROM config WHERE clave = pin";
    $SQL2 = "SELECT valor FROM config WHERE clave = cuenta";
    
    $pin = mysql_query($SQL)[0] or die("No se ha podido ejecutar la query(" . mysql_error .")");
    $cuenta = mysql_query($SQL2)[0] or die("No se ha podido ejecutar la query(" . mysql_error .")");
    
    $array = array(
        "pin" => $pin,
        "cuenta"=> $cuenta,
    );
    
    echo $array;
?>