// Format date string 30 Jan 2011 => 30.01.11 // dd.mm.yy
function formatDate(date) {
    var day =  date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var year = date.getFullYear();
    year = +year.toString().substring(2);
    year = year < 10 ? '0' + year : year;

    return day + '.' + month + '.' + year;
}

//dd.mm.yy.
function outputDate(date) {
   if (!date) {
      return;
   }
   var toClass = ({}).toString.call(date); // borrow method from Object
   var type = toClass.slice(8,-1);
   var resultDate = '';
   switch (type) {
      case 'String': // yyyy-mm-dd
         date = new Date(date);
         resultDate = formatDate(date);
         break;
      case 'Number': // number of seconds
        date = new Date(date * 1000);
        resultDate = formatDate(date);
        break;
      case 'Date':
         resultDate = formatDate(date);
         break;
      default:
         console.log('Unknown type of argument' + date);
         break;
   }
   console.log(resultDate);
}

//outputDate( '2011-10-02' );  // 02.10.11
//outputDate( 1234567890 );  // 14.02.09
//outputDate( new Date(2000,0,1) ); // 01.01.00

// Set Interval

(function () {
   var i = 0;
   var timer = setInterval(function() {
      if (i == 20) {
         clearInterval(timer);
      }
      console.log(i++);
   } ,100);
})();

// Set Timeout
(function () {
   var i = 0;
   var timer = setTimeout(function run() {
      if (i < 20) setTimeout(run, 100);
      console.log(i++);
   }, 100);
})();

//(function () {
//   var i = 0;
//   var timer = setTimeout(function run() {
//      console.log(++i);
//      timer = setTimeout(run, 100);
//      if (i >= 20) {
//         clearTimeout(timer);
//      }
//   }, 100);
//})();

(function () {

   var a = 5;
   console.log('before');
   setTimeout(function() {
      console.log('bla-bla-bla');
   }, 0);
   console.log('after');
   outputDate( '2011-10-02' );  // 02.10.11
   outputDate( 1234567890 );  // 14.02.09
   outputDate( new Date(2000,0,1) ); // 01.01.00

   return a;
})();