var totalNumberOfComparisons = 0;

function quicksort(array) {

    if (array.length < 2) {
        return array;
    }

   var pivotIndex = 0;
   var pivot = array[pivotIndex];

   var rightMostElIndex = partition(array, pivotIndex);

   array.swap(0, rightMostElIndex);

   // Create before-pivot and after-pivot arrays
   var left  = array.slice(0, rightMostElIndex);
   var right = array.slice(rightMostElIndex+1);

   totalNumberOfComparisons += array.length - 1;

   return quicksort(left).concat(pivot, quicksort(right));
}

function partition(array, pivotIndex) {
   var i = pivotIndex + 1;
   for (var j = pivotIndex + 1; j < array.length; j++) {
      if (array[j] < array[pivotIndex]) {
         array.swap(i, j);
         i++;
      }
   }
   return i-1;
}

function getRandomNumber(min, max) {
   return Math.floor((Math.random()*max)+min); 
}

function getTotalNumberOfComparisons() {
   return totalNumberOfComparisons;
}

function setTotalNumberOfComparisons() {
    totalNumberOfComparisons = 0;
}

Array.prototype.swap = function(a, b) {
   var tmp=this[a];
   this[a]=this[b];
   this[b]=tmp;
}