function quicksort(array) {

   if (array.length <= 1) {
      return array;
   }

   // Choose pivot
   var pivotRandIndex = getRandomNumber(0, array.length - 1);
   // Swap pivot to the 1st element in the array -- to ease the algoritm.
   array.swap(0, pivotRandIndex);

   var pivotIndex = 0;
   var pivot = partition(array, pivotIndex);

   // Create before-pivot and after-pivot arrays
   var left  = array.slice(0, pivot);
   var right = array.slice(pivot, array.length);
   left.swap(0, left.length-1);

   return quicksort(left).concat(quicksort(right));
}

function partition(array, pivotIndex) {
   var i = pivotIndex + 1;
   for (var j = pivotIndex + 1; j < array.length; j++) {
      if (array[j] < array[pivotIndex]) {
         array.swap(i, j);
         i++;
      }
   }
   return i;
}

function getRandomNumber(min, max) {
   return Math.floor((Math.random()*max)+min); 
}

Array.prototype.swap = function(a, b) {
   var tmp=this[a];
   this[a]=this[b];
   this[b]=tmp;
}

document.write(quicksort([5, 2, 3, 1, 4, 6, 0, 2, 5, 6, 7, 9, 4, 3, 1, 7, 10, 12, 15, 17, 18, 11, 14, 13, 16]));