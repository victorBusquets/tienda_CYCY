app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/clientes', {
            templateUrl: "clientes/clientes.html",
            controller: "ClientesController"
        });
    }]);