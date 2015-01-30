app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/detalleCarrito',{
        templateUrl: "detalleCarrito/detalleCarrito.html",
        controller: "DetalleCarritoController"
    })
}]);