app.controller("ProductosController", ["$location", "$scope", "$http","$routeParams", function MainController($location, $scope, $http,$routeParams) {
        $scope.orden=parseInt($routeParams.orden);
        $scope.categoria=parseInt($routeParams.idCategoria);
        $scope.seleccionado=0;
        
        $scope.cargarProductos = function() {
            $http({
                method: "GET",
                url: 'productos/productos.php?dato='+$routeParams.idCategoria+'&dato2='+$routeParams.orden
            }).success(function(data, status, headers, config) {
                $scope.productos = data;
                $scope.nombreCategoria=data[0].nombreCategoria;

            }).error(function(data, status, headers, config) {
                alert("Error ");
            });
        };
        $scope.cargarProductos();
        
        $scope.hola = function(e){
             $location.url("/productos/"+$scope.categoria+","+e);
        };
    }]);