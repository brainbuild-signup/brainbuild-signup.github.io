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

	.state('meal', {
		url: "/meal",
		templateUrl: "templates/meal.html",
		controller: "MealCtrl"
	})

	.state('list', {
		url: "/list",
		templateUrl: "templates/list.html",
		controller: "ListCtrl"
	})

	.state('done', {
		url: "/done",
		templateUrl: "templates/done.html",
		controller: "DoneCtrl"
	})
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
})
