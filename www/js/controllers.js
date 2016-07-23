angular.module('brainbuild.controllers', [])
.controller('LoginCtrl', function($scope, auth, store, $state, $ionicLoading) {
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
      $state.go('welcome');
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

  if($ionicLoading){
    $ionicLoading.hide();
  }

  doAuth();
})

.controller('WelcomeCtrl', function($scope, auth, store, $state, GoogleEvents){
  $scope.athlete = GoogleEvents.athlete();

  // auth0 Profile
  var person = JSON.parse(localStorage.getItem('profile'));
  // GAPI
  var token = person['identities'][0]['access_token'];
  var header = new Headers();
  header.append("Access-Control-Allow-Origin", "*");
  // Info from auth0
  // $scope.athlete.fullName = person.name;
  $scope.athlete.email = person.email;
  $scope.athlete.picture = person.picture;

  Smooch.updateUser({
      givenName: person.name,
      email: person.email
  })

  localStorage.athlete = JSON.stringify($scope.athlete);

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };

  $scope.addProfile = function() {
    console.log($scope.athlete.timeZone);

    switch($scope.athlete.timeZone){
      case "Pacific Time Zone":
        $scope.athlete.tzOffset = 7*hourUTC;
        $scope.athlete.tzGAPI = "America/Los_Angeles";
        break;
      case "Mountain Time Zone":
        $scope.athlete.tzOffset = 6*hourUTC;
        $scope.athlete.tzGAPI = "America/Denver";
        break;
      case "Central Time Zone":
        $scope.athlete.tzOffset = 5*hourUTC;
        $scope.athlete.tzGAPI = "America/Chicago";
        break;
      case "Eastern Time Zone":
        $scope.athlete.tzOffset = 4*hourUTC;
        $scope.athlete.tzGAPI = "America/New_York";
        break;
      case "Alaskan Time Zone":
        $scope.athlete.tzOffset = 8*hourUTC;
        $scope.athlete.tzGAPI = "America/Anchorage";
        break;
      case "Hawaiian Time Zone":
        $scope.athlete.tzOffset = 10*hourUTC;
        $scope.athlete.tzGAPI = "Pacific/Honolulu";
        break;
    };
    
    localStorage.athlete = JSON.stringify($scope.athlete);

    $state.go('list');
  }

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
                      auth.signout();
                      store.remove('token');
                      store.remove('profile');
                      store.remove('refreshToken');
                      $state.go('login', {}, {reload: true});
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
    for(var i = 0; i < data.items.length; i++){
      listACL(data.items[i].accessRole, data.items[i].id)
    }
  }

  function listACL(role, calendarId){
    if(!(role == 'owner')){
      return;
    }
    else {
      sentCals++;
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
                        auth.signout();
                        store.remove('token');
                        store.remove('profile');
                        store.remove('refreshToken');
                        $state.go('login', {}, {reload: true});
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
    for(var i = 0; i < data.items.length; i++){
      if(data.items[i].id == ourEmail){
        ours.push(calendarId);
      }
    }
    if(ours.length > 0){
      console.log("state.go('wait')");
      // $state.go('wait');
    }
  }
})

.controller('WaitCtrl', function ($scope, $state){
})

.controller('WorkoutCtrl', function($scope, $state, GoogleEvents){
  $scope.wcms = GoogleEvents.wcms();
  var template = GoogleEvents.defaultWorkout();
  $scope.workout = angular.copy(template);

  // add offset
  var offset = (today.getTimezoneOffset()/60)*hourUTC;
  $scope.workout.start.dateTime.setTime($scope.workout.start.dateTime.getTime()+offset);
  $scope.workout.end.dateTime.setTime($scope.workout.end.dateTime.getTime()+offset);

  $scope.addWorkout = function(){
    // remove offset
    $scope.workout.start.dateTime.setTime($scope.workout.start.dateTime.getTime()-offset);
    $scope.workout.end.dateTime.setTime($scope.workout.end.dateTime.getTime()-offset);

    // add UTC version to stack & save
    $scope.wcms.push(angular.copy($scope.workout)); 
    localStorage.wcms = JSON.stringify($scope.wcms);

    // reset template & offset
    $scope.workout = angular.copy(template);
    $scope.workout.start.dateTime.setTime($scope.workout.start.dateTime.getTime()+offset);
    $scope.workout.end.dateTime.setTime($scope.workout.end.dateTime.getTime()+offset);

    // go back
    $state.go('list');
  }
})

.controller('ClassCtrl', function($scope, $state, GoogleEvents){
  $scope.wcms = GoogleEvents.wcms();
  var template = GoogleEvents.defaultClass();
  $scope.class = angular.copy(template);

  // add offset
  var offset = (today.getTimezoneOffset()/60)*hourUTC;
  $scope.class.start.dateTime.setTime($scope.class.start.dateTime.getTime()+offset);
  $scope.class.end.dateTime.setTime($scope.class.end.dateTime.getTime()+offset);

  $scope.addClass = function(){
    // remove offset
    $scope.class.start.dateTime.setTime($scope.class.start.dateTime.getTime()-offset);
    $scope.class.end.dateTime.setTime($scope.class.end.dateTime.getTime()-offset);

    // add UTC version to stack & save
    console.log($scope.wcms);
    $scope.wcms.push(angular.copy($scope.class));
    console.log($scope.wcms);
    localStorage.wcms = JSON.stringify($scope.wcms);

    // reset template & offset
    $scope.class = angular.copy(template);
    $scope.class.start.dateTime.setTime($scope.class.start.dateTime.getTime()+offset);
    $scope.class.end.dateTime.setTime($scope.class.end.dateTime.getTime()+offset);

    // go back
    $state.go('list');
  }
})

.controller('MealCtrl', function($scope, $state, GoogleEvents){
  $scope.wcms = GoogleEvents.wcms();
  var template = GoogleEvents.defaultMeals();
  $scope.meal = angular.copy(template[0]);

  // add offset
  var offset = (today.getTimezoneOffset()/60)*hourUTC;
  $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()+offset);
  $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()+offset);

  $scope.addMeal = function(){
    // remove offset
    $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()-offset);
    $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()-offset);
    $scope.meal.timeOfDay = $scope.meal.start.dateTime.getTime();

    // add UTC version to stack & save
    $scope.wcms.push(angular.copy($scope.meal)); 
    localStorage.wcms = JSON.stringify($scope.wcms);

    // reset template & offset
    $scope.meal = angular.copy(template[0]);
    $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()+offset);
    $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()+offset);

    // go back
    $scope.$evalAsync();
    $state.go('list');
  }
})

.controller('ListCtrl', function($scope, $state, GoogleEvents, $ionicLoading){
  // scope variables
  $scope.athlete = GoogleEvents.athlete();
  $scope.wcms = GoogleEvents.wcms();
  
  $scope.dayFilter = [true,true,true,true,true,true,true];

  $scope.dayClick = function(i){
    $scope.dayFilter[i]=!$scope.dayFilter[i];
  }

  $scope.filterDay = function(event){
    for(var i = 0; i < 7; i++){
      if(event.description[i] == true && $scope.dayFilter[i] == true){
        return true;
      }
    }
    return false;
  }

  // other variables
  var responses = 0;
  var person = JSON.parse(localStorage.getItem('profile'));
  var token = person['identities'][0]['access_token'];
  var header = new Headers();
  header.append("Content-Type", "application/json");
  var brainbuild = {
    summary: $scope.athlete.fullName+" - "+$scope.athlete.school+" "+$scope.athlete.sport+" (Brainbuild)"
  };
  if(localStorage.calendarId){
    var calendarId = localStorage.calendarId;
  }
  else{ 
    var calendarId = "No calendar ID right now";
  }
  $scope.calendarId = calendarId;

  $scope.deleteEvent = function(type, summary){
    for(var i = 0; i < $scope[type].length; i++){
      if($scope[type][i].summary == summary){
        $scope[type].splice(i,1);
        localStorage[type] = JSON.stringify($scope[type]);
        return;
      }
    }
  }

  $scope.addNewWorkout = function(){
    $state.go('workout')
  }

  $scope.addNewClass = function(){
    $state.go('class')
  }

  $scope.addNewMeal = function(){
    $state.go('meal')
  }

  $scope.restoreDefaultMeals = function(){
    localStorage.wcms = [];
    $scope.wcms = GoogleEvents.defaultMeals();
    localStorage.wcms = JSON.stringify($scope.wcms);
    // $state.go('list')
  }

  $scope.clearLocalStorage = function(){
    localStorage.removeItem("athlete");
    localStorage.removeItem("calendarId");
    localStorage.removeItem("cls");
    localStorage.removeItem("events");
    localStorage.removeItem("meals");
    localStorage.removeItem("wcms");
    localStorage.removeItem("wos");
    $state.go('welcome');
  }

  $scope.generateSchedule = function() {
    openTheFloodGates();
  };

  function openTheFloodGates(){
    // $ionicLoading.show()

    // update meals (all based on Z)
    allGoRhythm();

    // store events array locally
    // localStorage.events = $scope.meals;

    // delete previoues calendar (if there is one)
    // if(localStorage.calendarId){
    //   console.log(localStorage.calendarId);
    //   deleteCalendar();
    // }

    // post to new calendar to GCal
    brainbuild = {
      summary: $scope.athlete.fullName+" - "+$scope.athlete.school+" "+$scope.athlete.sport+" (Brainbuild)"
    };
    console.log(brainbuild);
    insertCalendar();

    // close spinner
    // closeTheFloodGates();

    // for(i = 0; i < $scope.events.length; i++){
    //   $scope.events[i].start.dateTime = new Date($scope.events[i].start.dateTime);
    //   $scope.events[i].end.dateTime = new Date($scope.events[i].end.dateTime);


    //   $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()+$scope.athlete.tzOffset);
    //   $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()+$scope.athlete.tzOffset);
      
    //   var tzOffsetCurrent = ($scope.events[0].start.dateTime.getTimezoneOffset()/60)*hourUTC;
    //   if(tzOffsetCurrent < 0){
    //     $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()-(24*hourUTC));
    //     $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()-(24*hourUTC));
    //   }
      
    //   // $scope.events[i].description = $scope.events[i].description.toString();
      
    //   postGAPI($scope.events[i]);
    // }
  }

  function closeTheFloodGates(){
    setTimeout(function(){ 
      $ionicLoading.hide();
      // $state.go('done');
      $state.go('generate')
    }, 3000);
  }

  function allGoRhythm(wos, calendarId){
    // create meals from workouts based on the days they occur
    // update the repeat of the default meals

    // concat all these into $scope.events
    $scope.events = [];
    $scope.events = angular.copy($scope.wcms);
    
    // $scope.events = [];
    // $scope.events = $scope.events.concat(angular.copy($scope.meals));
    // if($scope.wos.length > 0)    
    //   $scope.events = $scope.events.concat(angular.copy($scope.wos));
    // if($scope.cls.length > 0)
    //   $scope.events = $scope.events.concat(angular.copy($scope.cls));
    
    // convert description into a string
    var repeat = "RRULE:FREQ=WEEKLY;BYDAY=";
    var dayNames = ["SU,","MO,","TU,","WE,","TH,","FR,","SA"];
    $scope.events.map((x)=>{    
      x.recurrence[0] = repeat;
      for(var i = 0; i < 7; i++){
        if(x.description[i]){
          x.recurrence[0]+=dayNames[i];
        }
      }
      if(x.recurrence[0].substring(x.recurrence[0].length-1)===","){
        x.recurrence[0] = x.recurrence[0].substring(0,x.recurrence[0].length-1);
      }
      if(x.summary.search(/snack/i)>-1){
        x.colorId = 6;
      }
      if(x.summary.search(/sleep/i)>-1){
        x.colorId = 8;
      }
      if(x.summary.search(/recovery/i)>-1){
        x.colorId = 6;
      }
      if(x.summary.search(/hydrate/i)>-1){
        x.colorId = 6;
      }
    })

    console.log($scope.events);
    // setTimeZone
    // setTimeZone();
  }
  
  // TOREMOVE: for testing
  $scope.deleteCalendar = function(){
    deleteCalendar();
  }

  function deleteCalendar(){
    fetch('https://www.googleapis.com/calendar/v3/calendars/'+localStorage.getItem('calendarId')+'?access_token='+token, {
      method: "DELETE",
      // headers: header,
      // body: JSON.stringify(brainbuild),
    })
    .then(function(res) {
        if (res.status === 204) {
          console.log(res);
          localStorage.removeItem("calendarId");
        } 
        else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log('not 204', data);
                    if (data.error.code === 401){
                      auth.signout();
                      store.remove('token');
                      store.remove('profile');
                      store.remove('refreshToken');
                      $state.go('login', {}, {reload: true});
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        }
      })
    .catch(function(err) {
        console.error('network error');
    });
  }

  function insertCalendar(){
    fetch('https://www.googleapis.com/calendar/v3/calendars?access_token='+token, {
      method: "POST",
      headers: header,
      body: JSON.stringify(brainbuild),
    })
    .then(function(res) {
        if (res.status === 200) {
            res.json()
                .then(function(data) {
                    console.log(data);
                    calendarId = data.id;
                    localStorage.calendarId = calendarId;
                    $scope.calendarId = calendarId
                    console.log(calendarId);
                    updateCalendar();
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        } 
        else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log('not 200', data);
                    if (data.error.code === 401){
                      auth.signout();
                      store.remove('token');
                      store.remove('profile');
                      store.remove('refreshToken');
                      $state.go('login', {}, {reload: true});
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        }
      })
    .catch(function(err) {
        console.error('network error');
    })
  }

  function updateCalendar(){
    var load = {
      "foregroundColor": "#ffffff",
      "backgroundColor": "#4986e7",
      "selected":true
    }

    fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList/'+calendarId+'?colorRgbFormat=true&access_token='+token, {
      method: "PUT",
      headers: header,
      body: JSON.stringify(load),
    })
    .then(function(res) {
        if (res.status === 200) {
            res.json()
                .then(function(data) {
                    console.log("Update Data Response: ", data);
                    postEvents();
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        } 
        else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log('not 200', data);
                    if (data.error.code === 401){
                      auth.signout();
                      store.remove('token');
                      store.remove('profile');
                      store.remove('refreshToken');
                      $state.go('login', {}, {reload: true});
                    }
                })
                .catch(function(parseErr) {
                    console.error(parseErr);
                });
        }
      })
    .catch(function(err) {
        console.error('network error');
    })
  }

  function postEvents(){
    // for(var i = 0; i < $scope.workouts.length; i++){
    //   $scope.workouts[i].organizer.email = calendarId;
    // }
    // $scope.events = $scope.events.concat($scope.workouts);
    // $scope.events = $scope.events.concat($scope.snacks);
    // console.log($scope.events); 

    // closeTheFloodGates();

    console.log($scope.meals);

    for(i = 0; i < $scope.events.length; i++){
      $scope.events[i].start.dateTime = new Date($scope.events[i].start.dateTime);
      $scope.events[i].end.dateTime = new Date($scope.events[i].end.dateTime);

      $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()+$scope.athlete.tzOffset);
      $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()+$scope.athlete.tzOffset);
      

      // TODO: Is this what is causing the all events on one day problem?
      var tzOffsetCurrent = ($scope.events[0].start.dateTime.getTimezoneOffset()/60)*hourUTC;
      if(tzOffsetCurrent < 0){
        $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()-(24*hourUTC));
        $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()-(24*hourUTC));
      }
      
      $scope.events[i].start.timeZone = $scope.athlete.tzGAPI;
      $scope.events[i].end.timeZone = $scope.athlete.tzGAPI;

      // $scope.events[i].description = $scope.events[i].description.toString();
      
      postGAPI($scope.events[i]);
    }

    console.log($scope.meals);

    // closeTheFloodGates();
  }


  function postGAPI(event) {
    fetch('https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events?access_token='+token, {
      method: "POST",
      headers: header,
      body: JSON.stringify(event),
    })
    .then(function(res) {
        if (res.status === 200) {
            res.json()
                .then(function(data) {
                    console.log(data);

                    // responses++
                    // console.log(responses);
                    // if(responses == $scope.events.length){
                    // closeTheFloodGates();
                    // }
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
                      auth.signout();
                      store.remove('token');
                      store.remove('profile');
                      store.remove('refreshToken');
                      $state.go('login', {}, {reload: true});
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

.controller('GenerateCtrl', function($scope, $state, GoogleEvents){
  $scope.athlete = GoogleEvents.athlete();
  $scope.events = GoogleEvents.events();
  $scope.day = allFalse;
  $scope.day[3] = true;
  $scope.dayChosen = 3;

  $scope.dayChange = function(i){
    for(var j = 0; j < $scope.day.length; j++){
      if(j==i){
        $scope.day[j] = true;
        $scope.dayChosen = i;
      }
      else{
        $scope.day[j] = false;
      }
    }
    console.log($scope.dayChosen);
  }

  $scope.dayFilter = function(event){
    // console.log($scope.dayChosen);
    return event.description[$scope.dayChosen];
  }

  $scope.brainbuild = {
    summary: $scope.athlete.fullName+" - "+$scope.athlete.school+" "+$scope.athlete.sport+" (Brainbuild)"
  };
})