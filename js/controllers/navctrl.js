app.controller('NavCtrl', ['$scope', function ($scope) {
	$scope.toggleNav = function()	{
		var elem = angular.element(document.querySelector('#navbar-ex1-collapse'));
		if (elem.css('display') == 'none')	{
			elem.css('display', 'block');
		}
		else {
			elem.css('display', 'none');	
		}
	}
}]);