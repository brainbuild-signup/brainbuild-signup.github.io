angular.module('starter.services', [])

.factory('Workouts', function(){

  var workoutDefault = {
    woId:0,
    sport: "Baseball",
    status: "Pre-Season (High Intensity)",
    startTime: new Date(),
    endTime: new Date(),
    endDate: new Date(),
    repeat:[
      { text: "SUN", checked: false },
      { text: "MON", checked: false },
      { text: "TUE", checked: false },
      { text: "WED", checked: false },
      { text: "THU", checked: false },
      { text: "FRI", checked: false },
      { text: "SAT", checked: false }
    ]
  };

  var defaultEvent = {
    'summary': 'Brainbuild Even',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2015-05-28T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'bbprimetime'}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
      ]
    }
  };
  
  if(localStorage.workouts){
    var workouts = JSON.parse(localStorage.workouts);
  }
  else {
    var workouts = [
    ];
}

  return {
    defaults: function() {
      return workoutDefault;
    },
    wos: function() {
      return workouts;
    },
    get: function(woId){
      for (var i = 0; i < workouts.length; i++){
        if(workouts[i].woId === parseInt(woId)) {
          return workouts[i];
        }
      }
      return null;
    }
    // put: function
  };
})

.factory('Meals', function(){
  var breakfast =
  {
    end: 
    {
      dateTime: "2016-05-25T14:00:00.000Z",
      timeZone: ""
    },
    start: 
    {
      dateTime: "2016-05-25T13:00:00.000Z",
      timeZone: ""
    },
    summary: "Breakfast",
    recurrence: [
      "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA"
    ]
  };

  var lunch =
  {
    end: 
    {
      dateTime: "2016-05-25T18:00:00.000Z",
      timeZone: ""
    },
    start: 
    {
      dateTime: "2016-05-25T17:00:00.000Z",
      timeZone: ""
    },
    summary: "Lunch",
    recurrence: [
      "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA"
    ]
  };

  var dinner =
  {
    end: 
    {
      dateTime: "2016-05-26T00:00:00.000Z",
      timeZone: ""
    },
    start: 
    {
      dateTime: "2016-05-25T22:30:00.000Z",
      timeZone: ""
    },
    summary: "Dinner",
    recurrence: [
      "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA"
    ]
  };

  return {
    breakfast: function(){
      return breakfast;
    },
    lunch: function(){
      return lunch;
    },
    dinner: function(){
      return dinner;
    },
    all: function(){
      return [breakfast, lunch, dinner];
    }
  }

})

.factory('Snacks', function(){
  var snacks = [];

  return {
    all: function(){
      return snacks;
    }
  }
})

.factory('Events', function(){
  var events = [];

  return {
    all: function() {
      return events;
    }
  }
})