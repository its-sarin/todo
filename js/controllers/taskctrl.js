app.controller('TaskCtrl', ['$scope', '$location', 'angularFire', function ($scope, $location, angularFire) {	
	var listId = $location.path();
	console.log(listId);

	var tasksRef = new Firebase('https://tonyrecchia.firebaseio.com/lists' +listId + '/incomplete');
	$scope.tasks = [];
	angularFire(tasksRef, $scope, "tasks");

	var completedTasksRef = new Firebase('https://tonyrecchia.firebaseio.com/lists' + listId + '/completed');
	$scope.completedTasks = [];		
	angularFire(completedTasksRef, $scope, "completedTasks");

	var newTodo = {};

	// Adds a task to $scope.tasks and attaches a timestamped id
	$scope.addTask = function(event)	{
		var key = event.char || event.keyCode,	// Firefox support
			target = event.target || event.srcElement;

		if (key != 13 || (/^ *$/.test(target.value))) return;
		
		newTodo.value = $scope.todo;
		newTodo.id = new Date().getUTCMilliseconds() + Math.floor(Math.random())*2;

		$scope.tasks.push({task: newTodo.value, id: newTodo.id});
		$scope.todo = "";
	}

	// Marks a task as complete and pushes it to $scope.completedTasks
	$scope.completeTask = function(index)	{
		$scope.tasks.splice(index, 1);
		$scope.completedTasks.push(this.task);		
	}

	// Deletes a task from the list
	$scope.removeTask = function(index)	{
		$scope.tasks.splice(index, 1);
	}

	// Removes all archived completed tasks
	$scope.clearCompletedTasks = function(event)	{
		event.preventDefault();
		$scope.completedTasks = [];
	}
}]);