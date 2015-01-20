app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/articulos', {
            templateUrl: "articulos/articulos.html",
            controller: "ArticulosController"
        });
    }]);