function f(x) { 
console.log(arguments.length === 0? 0: 1);
}

f(undefined); // 1
f(); // 0

function sum() {
   var sum= 0;
   for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
   }
   return sum;
}
console.log(sum());
console.log(sum(1));
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));
