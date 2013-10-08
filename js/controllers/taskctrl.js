app.controller('TaskCtrl', ['$scope', '$rootScope', '$location', 'angularFire', '$window', 'authService', function ($scope, $rootScope, $location, angularFire, $window, authService) {	
	console.log($location.host());

	// Store location path to use for creating list in database
	var listId = $location.path();
	console.log(listId);

	// Create Firebase reference to 'incomplete' items
	var tasksRef = new Firebase('https://listify.firebaseio.com/lists' +listId + '/incomplete');
	$scope.tasks = [];
	angularFire(tasksRef, $scope, "tasks");

	// Create Firebase reference to 'completed' items
	var completedTasksRef = new Firebase('https://listify.firebaseio.com/lists' + listId + '/completed');
	$scope.completedTasks = [];		
	angularFire(completedTasksRef, $scope, "completedTasks");

	// Create Firebase reference to 'users' if user authenticates
	$rootScope.$on("login", function(event, user) {		
        var userRef = new Firebase('https://listify.firebaseio.com/lists' +listId + '/users/')
        console.log(user.uid);
        $scope.users = [];
        $scope.users.push({user: user.uid});
		angularFire(userRef, $scope, "users");        
    });

	var newTodo = {};
	$scope.newListName = '';

	// Creates a new list
	$scope.createNewList = function()	{
		if (/^ *$/.test($scope.newListName)) return;

		// Filters out symbols and whitespace and builds list name
		var input = $scope.newListName.replace(/[^\w]/gi, ''),
			ms = new Date().getUTCMilliseconds(),
			dt = new Date().getUTCDay(),
			rn = Math.floor(Math.random()*10);
			list = input + '-' + ms + dt + rn;

		// Open new list in new window
		$window.open('/#' + list);
		$scope.newListName = '';
	}

	// Adds a task to $scope.tasks and attaches a timestamped id
	$scope.addTask = function(event)	{
		var key = event.char || event.keyCode,	// Firefox support
			target = event.target || event.srcElement;

		if (key != 13 || (/^ *$/.test(target.value))) return;
		
		newTodo.value = $scope.todo;
		newTodo.id = new Date().getUTCMilliseconds() + (Math.floor(Math.random()*10));

		$scope.tasks.push({task: newTodo.value, id: newTodo.id});
		$scope.todo = "";
	}

	// Marks a task as complete and pushes it to $scope.completedTasks
	$scope.completeTask = function(index)	{
		$scope.tasks.splice(index, 1);
		$scope.completedTasks.push(this.task);		
	}

	$scope.undoComplete = function(index)	{
		console.log('click!');
		$scope.completedTasks.splice(index, 1);
		$scope.tasks.push(this.completedTask);
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