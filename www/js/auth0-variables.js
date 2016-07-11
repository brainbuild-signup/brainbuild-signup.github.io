var AUTH0_CLIENT_ID='02z0GFTFYXwqA3tmgMZabeRKyhfOXK8M'; 
var AUTH0_DOMAIN='brendobrien.auth0.com'; 
var AUTH0_CALLBACK_URL=location.href;

var today = new Date();
var timeZone = "America/Los_Angeles";
var repeatAllFalse = "RRULE:FREQ=WEEKLY;BYDAY=";
var repeatAllTrue = "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA";
var allFalse = "[ { text: 'SUN', checked: false }, { text: 'MON', checked: false }, { text: 'TUE', checked: false }, { text: 'WED', checked: false }, { text: 'THU', checked: false }, { text: 'FRI', checked: false }, { text: 'SAT', checked: false } ]";
var allTrue = "[ { text: 'SUN', checked: true }, { text: 'MON', checked: true }, { text: 'TUE', checked: true }, { text: 'WED', checked: true }, { text: 'THU', checked: true }, { text: 'FRI', checked: true }, { text: 'SAT', checked: true } ]";

// date parsing
today.setUTCMinutes(0,0,0);
var hourUTC = 3600000;
var hourLater = new Date(today.getTime()+hourUTC);
var calendarId = "jomvtmlvotsh0i384c197easps@group.calendar.google.com";
var ourEmail = "bbprimtetime2016@gmail.com";

// meal defaults
var breakfastTime = new Date("1993-06-17T09:00:00");
var lunchTime = new Date("1993-06-17T12:00:00");
var snackTime = new Date("1993-06-17T15:30:00");
var dinnerTime = new Date("1993-06-17T18:30:00");

// And their date objects
var breakfastStart = new Date(today.toISOString().substring(0,11)+breakfastTime.toISOString().substring(11));
var breakfastEnd = new Date(breakfastStart.getTime()+hourUTC);

var lunchStart = new Date(today.toISOString().substring(0,11)+lunchTime.toISOString().substring(11));
var lunchEnd = new Date(lunchStart.getTime()+hourUTC);

var snackStart = new Date(today.toISOString().substring(0,11)+snackTime.toISOString().substring(11));
var snackEnd = new Date(snackStart.getTime()+hourUTC);

var dinnerStart = new Date(today.toISOString().substring(0,11)+dinnerTime.toISOString().substring(11));
var dinnerEnd = new Date(dinnerStart.getTime()+(1.5*hourUTC));

// arrays to hold events
var workouts = [];
var classes = [];