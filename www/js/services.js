angular.module('brainbuild.services', [])

.factory('GoogleEvents', function(){
  var athlete = {
    fullName: "Bo Jackson",
    school: "San Jose State University",
    sport: "Baseball",
    timeZone: "Pacific Time Zone",
    email: "exercisetime2016@gmail.com",
    tzOffset: 7*hourUTC
  };

  var title = athlete.fullName+" - "+athlete.school+" "+athlete.sport+" (Brainbuild)";

  // Events
  if(localStorage.events){
    var events = localStorage.events;
  }
  else {
    var events = [];
  }

  var workoutDefault = {

   "kind": "calendar#event",
   "status": "confirmed",
   "created": today,
   "updated": today,
   "summary": "",
   "colorId": "9",
   "creator": {
    "email": ourEmail
   },
   "organizer": {
    "email": athlete.email,
    "displayName": title,
    "self": true
   },
   "start": {
    "dateTime": today,
    "timeZone": timeZone
   },
   "end": {
    "dateTime": hourLater,
    "timeZone": timeZone
   },
   "recurrence": [
    repeatAllFalse
   ],
   "sequence": 1,
   "reminders": {
    "useDefault": true
   },
   "description": allFalse,

  };

  var breakfast = {

   "kind": "calendar#event",
   "status": "confirmed",
   "created": today,
   "updated": today,
   "summary": "Have a great breakfast",
   "colorId": "11",
   "creator": {
    "email": ourEmail
   },
   "organizer": {
    "email": calendarId,
    "displayName": title,
    "self": true
   },
   "start": {
    "dateTime": breakfastStart,
    "timeZone": timeZone
   },
   "end": {
    "dateTime": breakfastEnd,
    "timeZone": timeZone
   },
   "recurrence": [
    repeatAllTrue
   ],
   "sequence": 1,
   "reminders": {
    "useDefault": false,
    "overrides": [
     {
      "method": "popup",
      "minutes": 10
     }
    ]
   },
   "description": allTrue,

  };

  var lunch = {

   "kind": "calendar#event",
   "status": "confirmed",
   "created": today,
   "updated": today,
   "summary": "Best time to grab lunch",
   "colorId": "11",
   "creator": {
    "email": ourEmail
   },
   "organizer": {
    "email": calendarId,
    "displayName": title,
    "self": true
   },
   "start": {
    "dateTime": lunchStart,
    "timeZone": timeZone
   },
   "end": {
    "dateTime": lunchEnd,
    "timeZone": timeZone
   },
   "recurrence": [
    repeatAllTrue
   ],
   "sequence": 0,
   "reminders": {
    "useDefault": false,
    "overrides": [
     {
      "method": "popup",
      "minutes": 10
     }
    ]
   },
   "description": allTrue,

  };

  var snack = {

   "kind": "calendar#event",
   "status": "confirmed",
   "created": today,
   "updated": today,
   "summary": "Snack if you feel hungry",
   "colorId": "6",
   "creator": {
    "email": ourEmail
   },
   "organizer": {
    "email": calendarId,
    "displayName": title,
    "self": true
   },
   "start": {
    "dateTime": snackStart,
    "timeZone": timeZone
   },
   "end": {
    "dateTime": snackEnd,
    "timeZone": timeZone
   },
   "recurrence": [
    repeatAllTrue
   ],
   "sequence": 2,
   "reminders": {
    "useDefault": false,
    "overrides": [
     {
      "method": "popup",
      "minutes": 10
     }
    ]
   },
   "description": allTrue,

  };

  var dinner = {

   "kind": "calendar#event",
   "status": "confirmed",
   "created": today,
   "updated": today,  
   "summary": "Time to eat dinner",
   "colorId": "11",
   "creator": {
    "email": ourEmail
   },
   "organizer": {
    "email": calendarId,
    "displayName": title,
    "self": true
   },
   "start": {
    "dateTime": dinnerStart,
    "timeZone": timeZone
   },
   "end": {
    "dateTime": dinnerEnd,
    "timeZone": timeZone
   },
   "recurrence": [
    repeatAllTrue
   ],
   "sequence": 1,
   "reminders": {
    "useDefault": false,
    "overrides": [
     {
      "method": "popup",
      "minutes": 10
     }
    ]
   },
   "description": allTrue,

  }

  return {
    athlete: function(){
      return athlete;
    },
    classes: function(){
      return classes;
    },
    defaultMeals: function(){
      return [breakfast, lunch, snack, dinner];
    },
    defaultWorkout: function(){
      return workoutDefault;
    },
    workouts: function(){
      return workouts;
    }
  }

  var preEvent = {
    'summary': 'Grab a snack & hydrate',
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

  // colorRGBboolean=true in URL
  var updateCalendar = {
    "selected": true,
    "backgroundColor": "#4986e7",
    "foregroundColor": "#FFFFFF"
  }

  var otherEvents = [
    {

     "kind": "calendar#event",
     "etag": "\"2932403150755000\"",
     "id": "g2ce3277956itmlpep0vfgmk64",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=ZzJjZTMyNzc5NTZpdG1scGVwMHZmZ21rNjRfMjAxNjA2MTNUMTIzMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:12:55.000Z",
     "updated": "2016-06-17T22:12:55.414Z",
     "summary": "Grab a snack & hydrate",
     "colorId": "6",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-13T05:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-13T06:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR"
     ],
     "iCalUID": "g2ce3277956itmlpep0vfgmk64@google.com",
     "sequence": 0,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932404013448000\"",
     "id": "99n1mj8qhfqh40k1rp9c0b47dk",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=OTluMW1qOHFoZnFoNDBrMXJwOWMwYjQ3ZGtfMjAxNjA2MTNUMTQzMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:19:59.000Z",
     "updated": "2016-06-17T22:20:13.943Z",
     "summary": "Eat properly to recover",
     "colorId": "6",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-13T07:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-13T08:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
     ],
     "iCalUID": "99n1mj8qhfqh40k1rp9c0b47dk@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932404104617000\"",
     "id": "snjjn8ei4gcj0rrls5io9t5jac",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=c25qam44ZWk0Z2NqMHJybHM1aW85dDVqYWNfMjAxNjA2MTRUMTMwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:20:32.000Z",
     "updated": "2016-06-17T22:20:52.340Z",
     "summary": "Grab a snack & hydrate",
     "colorId": "6",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-14T06:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-14T07:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=TU,TH"
     ],
     "iCalUID": "snjjn8ei4gcj0rrls5io9t5jac@google.com",
     "sequence": 3,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932406941844000\"",
     "id": "90ok5po1qdgbi3bc39ugisp7ks",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=OTBvazVwbzFxZGdiaTNiYzM5dWdpc3A3a3NfMjAxNjA2MThUMjAwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:44:30.000Z",
     "updated": "2016-06-17T22:44:30.949Z",
     "summary": "Eat properly to recover",
     "colorId": "6",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-18T13:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-18T14:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=SA"
     ],
     "iCalUID": "90ok5po1qdgbi3bc39ugisp7ks@google.com",
     "sequence": 0,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932407143629000\"",
     "id": "hu68m97ntphdhjn7t4trp8jgo0",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=aHU2OG05N250cGhkaGpuN3Q0dHJwOGpnbzBfMjAxNjA2MTVUMDIwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:45:59.000Z",
     "updated": "2016-06-17T22:46:11.848Z",
     "summary": "Recover with dinner",
     "colorId": "11",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-14T19:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-14T20:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=TU,TH"
     ],
     "iCalUID": "hu68m97ntphdhjn7t4trp8jgo0@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932407380757000\"",
     "id": "m1ih90r1l2e662o52sjjgafdo8",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=bTFpaDkwcjFsMmU2NjJvNTJzampnYWZkbzhfMjAxNjA2MTRUMjMzMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:48:10.000Z",
     "updated": "2016-06-17T22:48:10.416Z",
     "summary": "Grab a snack & hydrate",
     "colorId": "6",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-14T16:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-14T17:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=TU,TH"
     ],
     "iCalUID": "m1ih90r1l2e662o52sjjgafdo8@google.com",
     "sequence": 0,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932414478693000\"",
     "id": "sijj9cbimc09dqvjrefv495fm4",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=c2lqajljYmltYzA5ZHF2anJlZnY0OTVmbTRfMjAxNjA2MTNUMDQwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T23:47:01.000Z",
     "updated": "2016-06-17T23:47:19.420Z",
     "summary": "Sleep soon, you deserve it",
     "colorId": "8",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-12T21:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-12T22:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=SU,TU,TH"
     ],
     "iCalUID": "sijj9cbimc09dqvjrefv495fm4@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932414545316000\"",
     "id": "2gu22md5it3tumpqborjts5i0c",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=Mmd1MjJtZDVpdDN0dW1wcWJvcmp0czVpMGNfMjAxNjA2MTRUMDQzMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T23:47:40.000Z",
     "updated": "2016-06-17T23:47:52.685Z",
     "summary": "Sleep soon, you deserve it",
     "colorId": "8",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-13T21:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-13T22:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO,WE"
     ],
     "iCalUID": "2gu22md5it3tumpqborjts5i0c@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": false,
      "overrides": [
       {
        "method": "popup",
        "minutes": 10
       }
      ]
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932416006186000\"",
     "id": "5a8nv6npms6qojp675d7i496hg",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=NWE4bnY2bnBtczZxb2pwNjc1ZDdpNDk2aGdfMjAxNjA2MTRUMTQwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:09:05.000Z",
     "updated": "2016-06-18T00:00:03.093Z",
     "summary": "Run - Workout",
     "colorId": "9",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-14T07:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-14T07:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=TU,TH"
     ],
     "iCalUID": "5a8nv6npms6qojp675d7i496hg@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": true
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932416026818000\"",
     "id": "rd1gg9nbfacu5njc7be62d4tu0",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=cmQxZ2c5bmJmYWN1NW5qYzdiZTYyZDR0dTBfMjAxNjA2MTVUMDAzMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:09:56.000Z",
     "updated": "2016-06-18T00:00:13.409Z",
     "summary": "Basketball Drills - Practice",
     "colorId": "9",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-14T17:30:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-14T19:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=TU,TH"
     ],
     "iCalUID": "rd1gg9nbfacu5njc7be62d4tu0@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": true
     }
    },
    {

     "kind": "calendar#event",
     "etag": "\"2932416053862000\"",
     "id": "dql21sph24crmj2ece0etd3548",
     "status": "confirmed",
     "htmlLink": "https://www.google.com/calendar/event?eid=ZHFsMjFzcGgyNGNybWoyZWNlMGV0ZDM1NDhfMjAxNjA2MThUMTgwMDAwWiBqb212dG1sdm90c2gwaTM4NGMxOTdlYXNwc0Bn",
     "created": "2016-06-17T22:10:41.000Z",
     "updated": "2016-06-18T00:00:26.931Z",
     "summary": "Shooting Practice",
     "colorId": "9",
     "creator": {
      "email": "brainbuildlabs@gmail.com"
     },
     "organizer": {
      "email": "jomvtmlvotsh0i384c197easps@group.calendar.google.com",
      "displayName": "Taylor Tanita - UCSD Women's Basketball (Brainbuild)",
      "self": true
     },
     "start": {
      "dateTime": "2016-06-18T11:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "end": {
      "dateTime": "2016-06-18T13:00:00-07:00",
      "timeZone": "America/Los_Angeles"
     },
     "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=SA"
     ],
     "iCalUID": "dql21sph24crmj2ece0etd3548@google.com",
     "sequence": 1,
     "reminders": {
      "useDefault": true
     }
    }
   ]
})