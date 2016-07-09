angular.module('brainbuild.controllers', [])
.controller('LoginCtrl', function($scope, auth, store, $state) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      if(localStorage.workouts){
        $state.go('welcome');
      }
      else {
        $state.go('welcome');
      }
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  // auth.show({
  //   socialBigButtons: true
  // });

  doAuth();
})

.controller('WelcomeCtrl', function($scope, auth, store, $state, GoogleEvents){
  $scope.athlete = GoogleEvents.athlete();

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };


  var person = JSON.parse(localStorage.getItem('profile'));
  var token = person['identities'][0]['access_token'];
  var header = new Headers();
  header.append("Access-Control-Allow-Origin", "*");
  
  console.log(GoogleEvents);

  listCalendars();

  // calendar list retrieval
  function listCalendars() {
    fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token='+token, {
      method: 'GET',
      headers: header,
      mode: 'cors',
      cache: 'default',
    })
    .then(function(res) {
      if (res.status === 200) {
            res.json()
                .then(function(data) {
                    processCalendars(data);
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        } else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log('not 200', data);
                    if (data.error.code === 401){
                      $state.go('login');
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        }
    })
    .catch(function(err) {
      console.error("network error", err);
    });
  };

  var sentCals = 0;
  var returnedCals = 0;

  function processCalendars(data){
    console.log(data);
    for(var i = 0; i < data.items.length; i++){
      listACL(data.items[i].accessRole, data.items[i].id)
    }
  }

  function listACL(role, calendarId){
    console.log(calendarId);
    if(!(role == 'owner')){
      return;
    }
    else {
      sentCals++;
      console.log(sentCals);
      fetch('https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/acl?access_token='+token, {
        method: 'GET',
        headers: header,
        mode: 'cors',
        cache: 'default',
      })
      .then(function(res) {
        if (res.status === 200) {
              res.json()
                  .then(function(data) {
                      checkACL(calendarId, data);
                      returnedCals++;
                      if(returnedCals == sentCals){
                        console.log(returnedCals);
                      }
                  })
                  .catch(function(parseErr) {
                      console.error(parseErr);
                  });
          } else {
              res.json()
                  .then(function(data) {
                      console.warn(calendarId);
                      if (data.error.code === 401){
                        $state.go('login');
                      }
                  })
                  .catch(function(parseErr) {
                      console.warn(calendarId);
                      console.error(parseErr);
                  });
          }
      })
      .catch(function(err) {
        // console.error("network error", err);
      });
    }
  }

  var ours = [];
  var ourEmail = "user:brainbuildlabs@gmail.com";

  function checkACL(calendarId, data){
    console.log(calendarId);
    for(var i = 0; i < data.items.length; i++){
      if(data.items[i].id == ourEmail){
        ours.push(calendarId);
      }
    }
    if(ours.length > 0){
      $state.go('wait');
    }
  }

})

.controller('WaitCtrl', function ($scope, $state){

})

.controller('WorkoutCtrl', function($scope, $state, GoogleEvents){

})

.controller('ListCtrl', function($scope, $state, GoogleEvents, $ionicLoading){
  $scope.events = GoogleEvents.athlete();
  $scope.events = GoogleEvents.defaultEvents();

  console.log($scope.events);
  var response = 0;

  $scope.generateSchedule = function() {
    $ionicLoading.show()
    hideSpinner();
  };

  function hideSpinner(){
    setTimeout(function(){ 
      $ionicLoading.hide();
      $state.go('done');
    }, 3000);
  }

  var person = JSON.parse(localStorage.getItem('profile'));
  var token = person['identities'][0]['access_token'];

  function createNewCalendar(){

  }

  function postGAPI(i) {
    var header = new Headers();
    header.append("Content-Type", "application/json");

    fetch('https://www.googleapis.com/calendar/v3/calendars/'+localStorage.calendarId+'/events?access_token='+token, {
      method: "POST",
      headers: header,
      body: JSON.stringify($scope.events[i]),
    })
    .then(function(res) {
        if (res.status === 200) {
            res.json()
                .then(function(data) {
                    console.log(data);

                    responses++
                    console.log(responses);
                    if(responses == $scope.events.length){
                      hideSpinner();
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        } else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log('not 200', data);
                    if (data.error.code === 401){
                      $state.go('login');
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        }
      })
    .catch(function(err) {
        console.error("network error", err);
    });
  }
})

.controller('DoneCtrl', function($scope, $state){

})