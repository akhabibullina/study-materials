<?php
// Calculate the number of split inversions.
function merge($arr, $left, $right) {
   $i = 0;
   $j = 0;
   $count = 0;
   while ($i < count($left) || $j < count($right)) {
      if ($i == count($left)) {
         $arr[$i + $j] = $right[$j];
         $j++;
      } else if ($j == count($right)) {
         $arr[$i + $j] = $left[$i];
         $i++;
      } else if ($left[$i] < $right[$j]) {
         $arr[$i + $j] = $left[$i];
         $i++;
      } else {
         $arr[$i + $j] = $right[$j];
         $count += count($left) - $i;
         $j++;
      }
   }
   return $count;
}

// Count the number of inversions.
function countInv($arr) {
   $length = sizeof($arr);
   if ($length < 2) {
      return 0;
   }

   $left  = array();
   $right = array();
   $left  = array_slice($arr, 0, round($length / 2));
   $right = array_slice($arr, round($length / 2));

   return countInv($left) + countInv($right) + merge($arr, $left, $right);
}

$a = array(2, 5, 6, 7, 9, 4, 3, 1, 7, 10, 12, 15, 17, 18, 11, 14, 13, 16);
echo countInv($a);