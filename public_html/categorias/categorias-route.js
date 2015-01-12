app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/categorias', {
            templateUrl: "categorias/categorias.html",
            controller: "CategoriasController"
        });
    }]);