////////////////////// 7 Dates
'use strict';
//Mon Feb 20 2012 03:12:00 GMT+0200 (FLE Standard Time) 
console.log(new Date(2012, 1, 20, 3, 12)); //20 Feb, 2012 year, 3 h 12 min. 

// Display current day of week
function getWeekDay(date) {
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return week[date.getDay()];
}

console.log( getWeekDay(new Date('2013-02-15')) );      // 'Fri'

// Display European number of current day of week
function getLocalDay(date) {
    var dayNo = date.getDay();
    if (dayNo === 0) {
        dayNo = 7; 
    }
    return dayNo;
}

console.log( getLocalDay(new Date('2013-02-11')) );      // Tue => 2

// Display the date and day number 100 days ago
function getDataInfo(date) {
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // case 1:
//    var currDate = new Date();
//    var minus100Days = currDate.setDate(currDate.getDate() - 1);
//    // var minus100Days = new Date(+currDate - 100*24*60*60*1000); // 100 days per 24 hours 60 minutes each, containing 60 seconds
//    return {
//        date: minus100Days.getDate(),
//        day:  week[minus100Days.getDay()]
//    }
    
    // case 2:
    var date = new Date();
    date.setDate(date.getDate() - 1);
        return {
        date: date.getDate(),
        day:  week[date.getDay()]
    }
    
}

console.log( JSON.stringify(getDataInfo()));

// Display the last day of the month
function getLastDayInMonth(year, month) {
    var date = new Date(year, month + 1);
    date.setDate(0);
    return date.getDate();
}

console.log( getLastDayInMonth(2012, 1)); // 29

// Display No of seconds passed from the beginning of the day
function getSecondsFromYestarday() {
    var today = new Date(),
        yestarday = new Date();
    yestarday.setDate(yestarday.getDate() -1);
    yestarday.setHours(0, 0, 0, 0);
    return (today - yestarday)/1000;
}

function getSecondsToTomorrow() {
    var today = new Date(),
        tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);
    return (tomorrow - today)/1000 ;
}

console.log( getSecondsFromYestarday());
console.log( getSecondsToTomorrow());

// Benchmarking
function floorMath(x) { return Math.floor(x); }
function floorXor(x) { return x^0; }

function bench(f) {
  var d = new Date();
  for (var i=0.5; i<1000000; i++) f(i);
  return new Date() - d;
}

//console.log('Time getSecondsFromYestarday: ' + bench(getSecondsFromYestarday) + 'ms');
//console.log('Time getSecondsToTomorrow: ' + bench(getSecondsToTomorrow) + 'ms');

// Format date string 30 Jan 2011 => 30.01.2011
function formatDate(date) {
    var day =  date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var year = date.getFullYear();
    year = +year.toString().substring(2);
    year = year < 10 ? '0' + year : year;

    return day + '.' + month + '.' + year;
}

console.log( formatDate(new Date(2011, 0, 1)) );

// Format date accoring to dates:
function outputDate(date) {
    var now = new Date();
    var diff = (now - date)/1000;
    if (diff < 1) { // less than a second
        return 'just now';
    }
    if (diff < 60) { // less than a minute
        return diff + ' sec ago';
    }
    if (diff < 60 * 60) { // less than an hour
        return diff / 60 + ' min ago';
    }
    return formatDate(date);
}

console.log( outputDate( new Date(new Date - 1) ) ); // "just now"

console.log( outputDate( new Date(new Date - 30*1000) ) ); // "30 sec ago"

console.log( outputDate( new Date(new Date- 5*60*1000) ) ); // "5 min ago"

console.log( outputDate( new Date(new Date - 86400*1000) ) ); // yestarday formatted as "dd.mm.yy"
