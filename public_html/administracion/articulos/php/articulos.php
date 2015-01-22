<?php
    require_once('../../../tienda/conexion.php');
    //Crear conexión
    $conexion = new mysqli(host(),usuario(), contrasenya());
    
    $query = "SELECT * FROM productos";
    $resultado = mysqli_query($conexion, $query);
    
    $datos = array();
    if(mysqli_num_rows($resultado) > 0) {
        while($fila = mysqli_fetch_assoc($resultado)){
            $datos[]= $fila;
        }
    }
    
    mysqli_close($conexion);
    echo json_encode($datos);
?>