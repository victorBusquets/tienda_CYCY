app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/quienessomos', {
            templateUrl: "nosotros/nosotros.html",
            controller: "NosotrosController"
        });
    }]);