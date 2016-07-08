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
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
})