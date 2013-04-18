<!-- The 2-SUM Problem
Input : unsorted array A of n integers. Target sum t.
Goal : determine whether or not there are two numbers x,y in A with
x + y = t
-->

<?php
set_time_limit(0);

// Globals: interval edge values.
$minLimit = 2500;
$maxLimit = 4000;

// Open file for read and string modification
$contents = array();
$file = "HashInt.txt"; 

$handle = @fopen($file, "r");

if ($handle) {
    while (($singleLineBuffer = fgets($handle, 4096)) !== false) {
       $contents[] = (int) $singleLineBuffer; // hash table
    }
    if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($handle);
}

// Main
sort($contents); // sort an array
$result = twoSum($contents);
var_dump($result);

function twoSum($A) {
   $min = $GLOBALS['minLimit'];
   $max = $GLOBALS['maxLimit'];
   $targetValues = 0; // # of target values t in the interval such that there are distinct numbers x,y
   for ($t = $min; $t <= $max; $t++) { // inclusive interval edges
      // for each x in A into hash table H lookup t-x
      $exploredX = array();
      //$middleIndex = round(count($A) / 2);
      for ($i = 0; $i < count($A); $i++) {
         $x = $A[$i];
         if ($t <= $x) {
            continue;
         }
         $y = $t - $x;
         if (in_array($y, $A) && !in_array($y, $exploredX) && $x !== $y) { // distinct x and y
             // var_dump('t: ' . $t . ' ' . 'x: ' . $x . ' ' . 'y: ' . $y . ' ');
             $exploredX[] = $x;
             $targetValues += count($exploredX);
             break;
         }
      }
   }
   return $targetValues;
}