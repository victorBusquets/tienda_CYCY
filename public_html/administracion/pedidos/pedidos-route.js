app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/pedidos', {
            templateUrl: "pedidos/pedidos.html",
            controller: "PedidosController"
        });
    }]);