app.controller('ListCtrl', ['$scope', '$window', 'angularFire', function ($scope, $window, angularFire) {
	// Creates a new list
	$scope.createNewList = function()	{
		if (/^ *$/.test($scope.newListName)) return;

		// Filters out symbols and whitespace and builds list name
		var input = $scope.newListName.replace(/-/g,' ').replace(/[^\w\s]/gi, ''),
			ms = new Date().getUTCMilliseconds(),
			dt = new Date().getUTCDay(),
			rn = Math.floor(Math.random()*10);
			list = input + '-' + ms + dt + rn;

		var authRef = new Firebase('https://listify.firebaseio.com/lists/' + list + '/auth');
		authRef.set({authorized: 'true', time: new Date().toString()});
		// Open new list in new window
		$window.open('/#' + list);
		$scope.newListName = '';
	}
}]);