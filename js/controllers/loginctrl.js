app.controller('LoginCtrl', ["$scope", "$rootScope", "authService", function ($scope, $rootScope, authService) {

    authService.auth.login('anonymous', {
        rememberMe: true
    });

    // listen for user auth events
    $rootScope.$on("login", function(event, user) {
        console.log('authorized');
        $scope.showAlert = false;
    });
    $rootScope.$on("loginError", function(event, error) {
        $scope.showAlert = true;
    });
    $rootScope.$on("logout", function(event) {
        console.log('unauthorized');
        $scope.showAlert = true;
    });
}]);