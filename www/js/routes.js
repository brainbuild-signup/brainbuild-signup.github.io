angular.module('brainbuild.routes', [])

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('login', {
		url: "/login",
		templateUrl: "templates/login.html",
		controller: 'LoginCtrl'
	})

	.state('welcome', {
		url: "/welcome",
		templateUrl: "templates/welcome.html",
		controller: 'WelcomeCtrl'
	})

	.state('wait',{
		url: "/wait",
		templateUrl: "templates/wait.html",
		controller: "WaitCtrl"
	})

	.state('workout', {
		url: "/workout",
		templateUrl: "templates/workout.html",
		controller: "WorkoutCtrl"
	})

	.state('class', {
		url: "/class",
		templateUrl: "templates/class.html",
		controller: "ClassCtrl"
	})

	.state('list', {
		url: "/list",
		templateUrl: "templates/list.html",
		controller: "ListCtrl"
	})

	.state('generate', {
		url: "/generate",
		templateUrl: "templates/generate.html",
		controller: "GenerateCtrl"
	})

	.state('done', {
		url: "/done",
		templateUrl: "templates/done.html",
		controller: "DoneCtrl"
	})
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
})
