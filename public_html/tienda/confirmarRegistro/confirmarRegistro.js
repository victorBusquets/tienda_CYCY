app.controller("ConfirmarRegistroController",  ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {	
	$scope.comprobarRegistro = function() {
		if((!isNaN($routeParams.num))&&(!isNaN($routeParams.id))){
            $http({
                method: "GET",
                url: "confirmarRegistro/comprobarRegistro.php?num="+$routeParams.num+"&id="+$routeParams.id,
            }).success(function(data) {
                $scope.ocultar=false;
				$scope.usuario=data;
					$http({
					method: "GET",
					url: "confirmarRegistro/confirmarRegistro.php?num="+$routeParams.num+"&id="+$routeParams.id,
					}).success(function() {
						
					}).error(function() {
						
					});
            }).error(function() {
                $scope.ocultar=true;
            });
		}else{
			window.location.assign("#/");
		}
        };
	
	$scope.comprobarRegistro();
    }]);