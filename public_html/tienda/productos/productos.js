app.controller("ProductosController", ["$location", "$scope", "$http", "$routeParams", function MainController($location, $scope, $http, $routeParams) {

        $scope.valoresSelect = [{valor:'idProducto', orden:false},
                                {valor:'nombreProducto', orden:false},
                                {valor:'nombreProducto', orden:true},
                                {valor:'precioUnidad', orden:false},
                                {valor:'precioUnidad', orden:true}];
        $scope.indice="0";
        $scope.sinStock=false;

        $scope.cargarProductos = function() {
            $http({
                method: "GET",
                url: 'productos/productos.php?dato=' + $routeParams.idCategoria
            }).success(function(data, status, headers, config) {
                $scope.productos = data;
                $scope.nombreCategoria = data[0].nombreCategoria;

            }).error(function(data, status, headers, config) {
                alert("Error ");
            });
        };
        $scope.cargarProductos();


    }]);