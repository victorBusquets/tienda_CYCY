app.controller("MainController", ["$location", "$scope", "$http", function MainController($location, $scope, $http) {

        $scope.cargarPromocion = function() {
            $http({
                method: "GET",
                url: 'promocion.php'
            }).success(function(data, status, headers, config) {
                $scope.articulosPromocion = data;
            }).error(function(data, status, headers, config) {
                alert("Error ");
            });
        };
        $scope.cargarPromocion();
    }]);