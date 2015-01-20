<?php

session_start();
unset($_SESSION["carrito"]);

$codigo= $_GET["codigo"];
$codigo=explode(",",$codigo);
$numeroArticulos= $_GET["numArticulos"];

        for ($i=0;$numeroArticulos>$i;$i++){
            $x=$i*7;
            $_SESSION["carrito"][$i] = array('idProducto' => $codigo[$x],
                                            'nombreCategoria' => $codigo[$x+1],
                                            'imagen' => $codigo[$x+2],
                                            'nombreProducto' =>$codigo[$x+3],
                                            'precioUnidad' =>$codigo[$x+4],
                                            'stock' =>$codigo[$x+5],
                                            'unidades' =>$codigo[$x+6]);
        }
?>