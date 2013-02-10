var totalNumberOfComparisons = 0;

function quicksort(array) {
  console.log('input array: '+array);
    if (array.length <= 1) {
        return array;
    }

  // var pivotIndex = choosePivot(array.length-1, 'first');
  // array.swap(0, pivotIndex);

   var pivotIndex = 0;
   var pivot = partition(array, pivotIndex);
   console.log('pivot index: '+pivot);
   console.log('pivot value: '+array[pivotIndex]);

   // Create before-pivot and after-pivot arrays
   var left  = array.slice(1, pivot);
   var right = array.slice(pivot);
   
   console.log('left: '+left);console.log('right: '+right);
   
   totalNumberOfComparisons += array.length - 1;
   console.log('# of comparisons: '+totalNumberOfComparisons);
   return quicksort(left).concat(array[pivotIndex], quicksort(right));
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

function getTotalNumberOfComparisons() {
   return totalNumberOfComparisons;
}
function setTotalNumberOfComparisons() {
	totalNumberOfComparisons = 0;
}

function choosePivot(length, position) {
   var pivotIndex;
   switch (position) {
      case 'first':
         pivotIndex = 0;
         break;
      case 'final':
         pivotIndex = length;
         break;
      case 'randrom':
         pivotIndex = getRandomNumber(0, length);
        break;
      default:
         alert ('choose pivot failed');
   }
   return pivotIndex;
}

Array.prototype.swap = function(a, b) {
   var tmp=this[a];
   this[a]=this[b];
   this[b]=tmp;
}