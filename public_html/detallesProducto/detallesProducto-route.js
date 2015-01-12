app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/detallesProducto/:idProducto', {
            templateUrl: "detallesProducto/detallesProducto.html",
            controller: "DetallesProductoController"
        });
    }]);