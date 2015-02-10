app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/info', {
            templateUrl: "nosotros/nosotros.html",
            controller: "NosotrosController"
        });
    }]);