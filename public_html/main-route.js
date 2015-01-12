app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: "main.html",
            controller: "MainController"
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);