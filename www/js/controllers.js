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
  $scope.athlete.email = person.email;
  $scope.athlete.picture = person.picture;

  Smooch.updateUser({
      givenName: person.name,
      email: person.email
  })

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };

  $scope.addProfile = function() {
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
})

.controller('WorkoutCtrl', function($scope, $state, GoogleEvents){
  $scope.wcms = GoogleEvents.wcms();
  var template = GoogleEvents.defaultWorkout();
  $scope.workout = angular.copy(template);

  // // add offset
  // var offset = (today.getTimezoneOffset()/60)*hourUTC;
  // HACO: Extra hour to offset
  if(today.getTimezoneOffset() > 0){
    var offset = (today.getTimezoneOffset()/60)*hourUTC+hourUTC;
  }
  else{
    var offset = (today.getTimezoneOffset()/60)*hourUTC;
  }

  $scope.workout.start.dateTime.setTime($scope.workout.start.dateTime.getTime()+offset);
  $scope.workout.end.dateTime.setTime($scope.workout.end.dateTime.getTime()+offset);

  $scope.addWorkout = function(){
    // remove offset
    console.log("Today: "+today);
    console.log("milisecond offset: "+offset);
    console.log("With offset: "+$scope.workout.start.dateTime);
    $scope.workout.start.dateTime.setTime($scope.workout.start.dateTime.getTime()-offset);
    $scope.workout.end.dateTime.setTime($scope.workout.end.dateTime.getTime()-offset);
    console.log("Without offset: "+$scope.workout.start.dateTime);
    // add UTC version to stack & save
    console.log($scope.wcms);
    $scope.wcms.push(angular.copy($scope.workout)); 
    console.log($scope.wcms);
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

  // // add offset
  // var offset = (today.getTimezoneOffset()/60)*hourUTC;
  // HACO: Extra hour to offset
  if(today.getTimezoneOffset() > 0){
    var offset = (today.getTimezoneOffset()/60)*hourUTC+hourUTC;
  }
  else{
    var offset = (today.getTimezoneOffset()/60)*hourUTC;
  }

  console.log(offset);
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

  // // add offset
  // var offset = (today.getTimezoneOffset()/60)*hourUTC;
  // HACO: Extra hour to offset
  if(today.getTimezoneOffset() > 0){
    var offset = (today.getTimezoneOffset()/60)*hourUTC+hourUTC;
  }
  else{
    var offset = (today.getTimezoneOffset()/60)*hourUTC;
  }
  
  console.log(offset);
  $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()+offset);
  $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()+offset);

  $scope.addMeal = function(){
    // remove offset
    $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()-offset);
    $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()-offset);

    // add UTC version to stack & save
    console.log($scope.wcms);
    $scope.wcms.push(angular.copy($scope.meal)); 
    console.log($scope.wcms);
    localStorage.wcms = JSON.stringify($scope.wcms);

    // reset template & offset
    $scope.meal = angular.copy(template[0]);
    $scope.meal.start.dateTime.setTime($scope.meal.start.dateTime.getTime()+offset);
    $scope.meal.end.dateTime.setTime($scope.meal.end.dateTime.getTime()+offset);

    // go back
    $state.go('list');
  }
})

.controller('ListCtrl', function($scope, $state, GoogleEvents, auth, store, $ionicLoading){
  // scope variables
  $scope.athlete = GoogleEvents.athlete();
  $scope.wcms = GoogleEvents.wcms();
  $scope.dayFilter = [true,true,true,true,true,true,true];
  console.log($scope.wcms);

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

  // TODO: Filter by type: W C M - with a button bar?
  $scope.filterType = function(event){

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

  $scope.clearLocalStorage = function(){
    localStorage.removeItem("athlete");
    localStorage.removeItem("calendarId");
    localStorage.removeItem("cls");
    localStorage.removeItem("events");
    localStorage.removeItem("meals");
    localStorage.removeItem("wcms");
    localStorage.removeItem("wos");
    location.reload();
    $state.go('welcome');
  }

  $scope.generateSchedule = function() {
    localStorage.wcms = JSON.stringify($scope.wcms);
    openTheFloodGates();
  };

  function openTheFloodGates(){
    // $ionicLoading.show()

    // update meals (all based on Z)
    allGoRhythm();

    // set title
    brainbuild = {
      summary: $scope.athlete.fullName+" - "+$scope.athlete.school+" "+$scope.athlete.sport+" (Brainbuild)"
    };

    // post calendar
    console.log(brainbuild);
    insertCalendar();
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
  }
  
  // TOREMOVE: for testing
  $scope.deleteCalendar = function(){
    localStorage.wcms = JSON.stringify($scope.wcms);
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
    var findSunday = new Date();
    findSunday.setUTCHours(0,0,0,0);
    var daySinceSun = findSunday.getDay();
    findSunday.setTime(findSunday.getTime()-(daySinceSun*24*60*60*1000)); 
    var baseSunday = new Date("1993-12-19T00:00:00Z");
    var sundayDiff = findSunday.getTime() - baseSunday.getTime();
    console.log("Number of milliseconds between sundays: "+sundayDiff);
    // HACO: subract full day
    var sfoffset = 0;
    if(today.getTimezoneOffset() > 0){
      sfoffset = -(24*60*60*1000);
    } 
    console.log("San Fransico offset: "+sfoffset);

    // These come in as dates on December 19, 1993
    // TODO: Change all these for loops to maps 
    for(let i = 0; i < $scope.events.length; i++){
      $scope.events[i].start.dateTime = new Date($scope.events[i].start.dateTime);
      $scope.events[i].end.dateTime = new Date($scope.events[i].end.dateTime);

      // Day of the Week Offset
      // When does the day start repeating
      var sundayOffset = 0;
      for(let j = 0; j < 7; j++){
        if($scope.events[i].description[j]){
          sundayOffset = (j*24*60*60*1000);
          console.log("\nEvent #"+i+": "+$scope.events[i].summary + " has an offset of: " + j);
          break;
        }
      }

      // // TimeZone Offset + Sunday Offset (Days after this Sunday) + Sunday Difference (Days between this Sunday(2016) and base Sunday (1993))
      // console.log($scope.events[i].start.dateTime);
      // $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()+$scope.athlete.tzOffset+sundayOffset+sundayDiff);
      // $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()+$scope.athlete.tzOffset+sundayOffset+sundayDiff);
      // console.log($scope.events[i].start.dateTime);
      // $scope.events[i].start.timeZone = $scope.athlete.tzGAPI;
      // $scope.events[i].end.timeZone = $scope.athlete.tzGAPI;

      // HACO: SF Offset - substract a day
      console.log($scope.events[i].start.dateTime);
      $scope.events[i].start.dateTime.setTime($scope.events[i].start.dateTime.getTime()+$scope.athlete.tzOffset+sundayOffset+sundayDiff+sfoffset);
      $scope.events[i].end.dateTime.setTime($scope.events[i].end.dateTime.getTime()+$scope.athlete.tzOffset+sundayOffset+sundayDiff+sfoffset);
      console.log($scope.events[i].start.dateTime);
      $scope.events[i].start.timeZone = $scope.athlete.tzGAPI;
      $scope.events[i].end.timeZone = $scope.athlete.tzGAPI;

      // TODO: add a timeout here
      setTimeout( function timer(){
        postGAPI($scope.events[i]);
      }, i*200 );
      // postGAPI($scope.events[i]);
    }
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
                    console.log(event);
                    console.error(parseErr);
                });
        } else {
            console.error(res); // comes back but not HTTP 200
            res.json()
                .then(function(data) {
                    console.log(event);
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