app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/productos/:idCategoria', {
            templateUrl: "productos/productos.html",
            controller: "ProductosController"
        });
    }]);