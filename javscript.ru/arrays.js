///////////////////////// 1 Find unique string in an array given
'use strict'
function unique(strings) {
    var result = [];
    for (var i = 0; i < strings.length; i++) {
        result[strings[i]] = true;
    }
    return result;
}

var strings = ["foo", "foo", "bee", "bee", "bee", "bee", "foo", "foo", "8-()"];
console.log(unique(strings));

/////////////////////// 2 Add a class name if not in the string
function addClass(obj, cls) {
    for (var prop in obj) {
        var propParts = obj[prop].split(' ');
        if (propParts[cls] !== undefined) {
            return;
        }
        // case 1:
        //propParts.push(cls);
        //prop = propParts.join(' ');
        //obj.prop = prop;
        
        // case 2:
        obj[prop] += (!obj[prop]) ? cls : ' ' + cls;
    }
}

var obj = {className: 'open menu'}

addClass(obj, 'new');   // obj.className='open menu new'
addClass(obj, 'open');  // ??? ????????? (????? ??? ??????????)
addClass(obj, 'me');    // obj.className='open menu new me'

console.log(obj.className);  // "open menu new me"

///////////////////////// 3 Format string from 'my-cool-string' to 'myCoolString'
function camelize(str) {
    var wordParts = str.split('-');
    var newString = wordParts[0];
    for (var i = 1; i < wordParts.length; i++) {
        newString += wordParts[i].charAt(0).toUpperCase() + wordParts[i].slice(1);
    }
    return newString;
}

console.log(camelize("background-color") == 'backgroundColor');
console.log(camelize("list-style-image") == 'listStyleImage');

/////////////////////// 4 Remove class name from propety

function removeClass(obj, cls) {
    for (var prop in obj) {
        // case 1:
        var propParts = obj[prop].split(' ');
        if (propParts.indexOf(cls) === -1) {
            return;
        }

        var prString = obj[prop];
        var reg = new RegExp(cls, "g")
        var match = prString.match(reg);
        if (match.length >= 1) {
            for (var i = 0; i < match.length; i++) {
                //case 1:
                propParts.splice(propParts.indexOf(cls), 1);
                // case 2:
                //prString = prString.replace(' '+cls, '') || prString.replace(cls, '');
            }
        }
       var propString = propParts.join(' ');
       obj[prop] = '"'+propString.trim()+'"';
       // obj[prop] = '"'+prString.trim()+'"';
    }
}

var obj2 = { className: 'my menu menu' };

removeClass(obj2, 'menu');
console.log(obj2.className); // 'my'

//////////////////////// 5 Sort in reverse order
var arr = [ 5, 2, 1, -10, 8];
var arrCopy = arr.slice(0);
arrCopy.sort(function(a, b) { return (a > b) ? -1 : 1});

console.log(arr);      // 5, 2, 1, -10, 8
console.log(arrCopy);  // 8, 5, 2, 1, -10

// Sort by 'age' field - Why this works?
var vasya = { name: "vasya", age: 23 };
var masha = { name: "masha", age: 18 };
var vovochka = { name: "vovochka", age: 6 };

var people = [ vasya , masha , vovochka ];

people.sort(function(a, b) { return (a > b) ? -1 : 1});
console.log(people) // [vovochka, masha, vasya]


/////////////////////// 6 Print list
var list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
    if (list === null) {
        return;
    }

    for (key in list) {
        if (typeof list[key] === 'number') {
            console.log(list[key]);
        } else {
            printList(list[key]);
            delete list[key];
        }
    }

}

printList(list);
