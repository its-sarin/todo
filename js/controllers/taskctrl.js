app.controller('TaskCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {
	var ref = new Firebase('https://tonyrecchia.firebaseio.com/todotest');
	$scope.tasks = [];
	newTodo = {};
	angularFire(ref, $scope, "tasks");

	$scope.addTask = function(e)	{
		if (e.keyCode != 13) return;
		console.log(e.srcElement.value);
		
		newTodo.value = $scope.todo;
		newTodo.id = new Date().getUTCMilliseconds();
		console.log(newTodo.id);
		
		$scope.tasks.push({task: newTodo.value, id: newTodo.id});
		$scope.todo = "";
	}

	$scope.removeTask = function(index)	{
		$scope.tasks.splice(index, 1);	
	}
}])