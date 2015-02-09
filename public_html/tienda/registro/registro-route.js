app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/registro', {
            templateUrl: "registro/registro.html",
            controller: "RegistroController"
        });
    }]);