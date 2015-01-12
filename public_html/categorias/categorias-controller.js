app.controller("CategoriasController", ["$scope", "$http", function MainController( $scope, $http) {

        $scope.cargarCategorias = function() {
            $http({
                method: "GET",
                url: 'categorias/categorias.php'
            }).success(function(data, status, headers, config) {
                $scope.categorias = data;
            }).error(function(data, status, headers, config) {
                alert("Error ");
            });
        };
        $scope.cargarCategorias();
    }]);