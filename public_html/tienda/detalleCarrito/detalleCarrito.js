app.controller("DetalleCarritoController", ["$location", "$scope", "$http", "$routeParams", function MainController($location, $scope, $http, $routeParams) {
        
        $scope.cargarTabla = function(){
            $http({
                method: "GET",
                url: "sesionPhp/cargarCarrito.php"
                }).success(function(datos){
					if(datos[0].nombreProducto==undefined){
					$scope.carrito=null;
					}else{
					$scope.carrito=datos;
					}
					$scope.precioFinal=0.00;	
					for(i=0;datos.length>i;i++){
						$scope.carrito[i].precioTotal=($scope.carrito[i].precioUnidad*$scope.carrito[i].unidades);
						$scope.precioFinal+=$scope.carrito[i].precioTotal;
					}
				});
        };
        
        $scope.cargarTabla();
		
        $("#realizarCompra").click(function(){
		$.ajax({
			url: 'sesionPhp/verUsuario.php',
			method: 'get',
			success: function(datos){
			idUsuario=datos.split("//")[0];
				if(idUsuario!=-1){
					$scope.enviarCompra();
				}else{
					$("#mensajeLoginNecesario").text("*Es necesario loguearse para comprar");
					desplegar_login();
				};
			}
		});
		});
		
		$scope.enviarCompra= function(){
		for(i=0;$scope.carrito.length>i;i++){
			$.ajax({
				url:'detalleCarrito/enviarCompraDetalle.php',
				method: 'post',
				data: 'datos='+JSON.stringify($scope.carrito[i]),
				success: function(){

				}
				});
			};
			$.ajax({
				url:'detalleCarrito/enviarCompraPedido.php',
				method: 'post',
				data: 'precioFinal='+$scope.precioFinal,
				success: function(){
				alert("Compra realiza");
				},
				error: function(){
				alert("ERROR");
				}
				});
		}
		
        
}]);