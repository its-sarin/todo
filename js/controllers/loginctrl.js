app.controller('LoginCtrl', ["$scope", "$rootScope", "authService", function ($scope, $rootScope, authService) {

    authService.auth.login('anonymous', {
        rememberMe: true
    });

    // listen for user auth events
    $rootScope.$on("login", function(event, user) {

    });
    $rootScope.$on("loginError", function(event, error) {

    });
    $rootScope.$on("logout", function(event) {

    });
}]);