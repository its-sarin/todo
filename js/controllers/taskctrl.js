app.controller('TaskCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {
	var tasksRef = new Firebase('https://tonyrecchia.firebaseio.com/todotest');
	$scope.tasks = [];
	angularFire(tasksRef, $scope, "tasks");

	var completedTasksRef = new Firebase('https://tonyrecchia.firebaseio.com/completed');
	$scope.completedTasks = [];		
	angularFire(completedTasksRef, $scope, "completedTasks");

	var newTodo = {};

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
		$scope.completedTasks.push(this.task);
	}
}])