app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/productos/:idCategoria,:orden', {
            templateUrl: "productos/productos.html",
            controller: "ProductosController"
        });
    }]);