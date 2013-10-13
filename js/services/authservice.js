app.service('authService', ["$rootScope", function ($rootScope) {
    var ref = new Firebase("https://listify.firebaseio.com");
    this.auth = new FirebaseSimpleLogin(ref, function (error, user) {
        if (user) {
            $rootScope.$emit("login", user);
        }
        else if (error) {
            $rootScope.$emit("loginError", error);
        }
        else {
            $rootScope.$emit("logout");
        }
    });
}]);