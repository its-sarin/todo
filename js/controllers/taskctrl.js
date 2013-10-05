app.controller('TaskCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {
	var ref = new Firebase('https://tonyrecchia.firebaseio.com/todotest');
	$scope.tasks = [];
	angularFire(ref, $scope, "tasks");

	$scope.addTask = function(e)	{
		if (e.keyCode != 13) return;

		$scope.tasks.push({task: $scope.todo});
		$scope.todo = "";
	}

	$scope.removeTask = function(index)	{
		$scope.tasks.splice(index, 1);	
	}
}])