app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/confirmarRegistro/:id/:num', {
            templateUrl: "confirmarRegistro/confirmarRegistro.html",
            controller: "ConfirmarRegistroController"
        });
    }]);