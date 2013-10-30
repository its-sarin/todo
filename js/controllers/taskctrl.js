app.controller('TaskCtrl', ['$scope', '$rootScope', '$location', 'angularFire', 'authService', function ($scope, $rootScope, $location, angularFire, authService) {	

	// Store location path to use for creating list in database
	var listId = $location.path()
	$scope.list = listId.split('-',1).toString().replace(/[^\w\s]/gi, '');


	// Create Firebase reference to 'incomplete' items
	var tasksRef = new Firebase('https://listify.firebaseio.com/lists/' + listId + '/incomplete');
	$scope.tasks = [];
	angularFire(tasksRef, $scope, "tasks");

	// Create Firebase reference to 'completed' items
	var completedTasksRef = new Firebase('https://listify.firebaseio.com/lists/' + listId + '/completed');
	$scope.completedTasks = [];		
	angularFire(completedTasksRef, $scope, "completedTasks");

	// Create Firebase reference to 'users' if user authenticates
	$rootScope.$on("login", function(event, user) {		
        var userRef = new Firebase('https://listify.firebaseio.com/lists/' + listId + '/users/'),
        	timestamp = new Date();
        console.log(timestamp);
        $scope.users = [];
        $scope.users.push({user: user.uid, timestamp: timestamp.toString()});
		angularFire(userRef, $scope, "users");        
    });

	// Adds a task to $scope.tasks and attaches a timestamped id
	$scope.addTask = function(event)	{
		var key = event.keyCode || event.char,	// Firefox support
			target = event.target || event.srcElement,
			newTodo = {};

		if (key != 13 || (/^ *$/.test(target.value))) {
			return;
		}
		
		newTodo.value = $scope.todo;
		newTodo.time = new Date();
		newTodo.id = new Date().getUTCMilliseconds() + (Math.floor(Math.random()*100));

		$scope.tasks.push({
			task: newTodo.value, 
			id: newTodo.id,
			time: newTodo.time.toString()
		});
		$scope.todo = "";
	}

	// Marks a task as complete and pushes it to $scope.completedTasks
	$scope.completeTask = function(index)	{
		$scope.tasks.splice(index, 1);
		$scope.completedTasks.push(this.task);		
	}

	$scope.undoComplete = function(index)	{
		$scope.completedTasks.splice(index, 1);
		$scope.tasks.push(this.completedTask);
	}

	// Deletes a task from the list
	$scope.removeTask = function(index)	{
		$scope.tasks.splice(index, 1);
	}

	// Deletes a task from the list
	$scope.removeCompletedTask = function(index)	{
		$scope.completedTasks.splice(index, 1);
	}

	// Removes all archived completed tasks
	$scope.clearCompletedTasks = function(event)	{
		event.preventDefault();
		$scope.completedTasks = [];
	}
}]);