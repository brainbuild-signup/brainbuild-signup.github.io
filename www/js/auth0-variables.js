var AUTH0_CLIENT_ID='02z0GFTFYXwqA3tmgMZabeRKyhfOXK8M'; 
var AUTH0_DOMAIN='brendobrien.auth0.com'; 
var AUTH0_CALLBACK_URL=location.href;

var today = new Date();
// today = today.getUTCDate();
var timeZone = "America/Los_Angeles";
var repeatAllFalse = "RRULE:FREQ=WEEKLY;BYDAY=";
var repeatAllTrue = "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA";

var allFalse = [false,false,false,false,false,false,false];
var allTrue = [true,true,true,true,true,true,true];
var dayNames = ["SU","MO","TU","WE","TH","FR","SA"];

// date parsing
today.setUTCMinutes(0,0,0);
var hourUTC = 3600000;
var hourLater = new Date(today.getTime()+hourUTC);
var calendarId = "jomvtmlvotsh0i384c197easps@group.calendar.google.com";
var ourEmail = "bbprimtetime2016@gmail.com";

// meal defaults
var breakfastTime = new Date("1993-12-19T09:00:00Z");
var lunchTime = new Date("1993-12-19T12:00:00Z");
var snackTime = new Date("1993-12-19T15:30:00Z");
var dinnerTime = new Date("1993-12-19T18:30:00Z");
// workout default
var workoutTime = new Date("1993-12-19T06:00:00Z")
// class default
var classTime = new Date("1993-12-19T11:00:00Z")

// And their date objects
// Changed to not today
// var breakfastStart = new Date(today.toISOString().substring(0,11)+breakfastTime.toISOString().substring(11));
var breakfastStart = breakfastTime;
var breakfastEnd = new Date(breakfastStart.getTime()+hourUTC);

// var lunchStart = new Date(today.toISOString().substring(0,11)+lunchTime.toISOString().substring(11));
var lunchStart = lunchTime;
var lunchEnd = new Date(lunchStart.getTime()+hourUTC);

// var snackStart = new Date(today.toISOString().substring(0,11)+snackTime.toISOString().substring(11));
var snackStart = snackTime;
var snackEnd = new Date(snackStart.getTime()+hourUTC);

// var dinnerStart = new Date(today.toISOString().substring(0,11)+dinnerTime.toISOString().substring(11));
var dinnerStart = dinnerTime;
var dinnerEnd = new Date(dinnerStart.getTime()+(1.5*hourUTC));

// var workoutStart = new Date(today.toISOString().substring(0,11)+workoutTime.toISOString().substring(11));
var workoutStart = workoutTime;
var workoutEnd = new Date(workoutStart.getTime()+hourUTC);

// var classStart = new Date(today.toISOString().substring(0,11)+classTime.toISOString().substring(11));
var classStart = classTime;
var classEnd = new Date(classStart.getTime()+hourUTC);
