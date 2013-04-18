<?php
// Global variables
$s = null; // # current source vertex
$processedNodes = 0; // # of nodes processed so far
$finishingTimes = array(); // store the finishing times
$leader = array(); // store the leaders
$exploredNodes = array(); // if the node already seen
$n = 875714; # Number of nodes
$Grev = array();
$G = array();

// Open file for read and string modification 
$file = "scc1.txt"; 

$handle = @fopen($file, "r");
// Read file line-by-line
if ($handle) {
    while (($singleLineBuffer = fgets($handle, 4096)) !== false) {
        $vertices = explode(' ', trim($singleLineBuffer));
        foreach ($vertices as $k => $vertex) {
            $node = trim($vertex);
            $formattedEdge[$k] = (int) $node;
        }
        // Populate graph contents.
        $G[] = $formattedEdge;
        $Grev[] = array_reverse($formattedEdge);
    }
    if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($handle);
}

// Main
$result = scc($Grev);
var_dump($result);

/* Auxilary functions come below */

// Start point of the algorithm.
function scc($data) {

    /* Run DFS-Loop on Grev to compute 'magical ordering' of nodes */
    dfs_loop($data);

    /* Run DFS-Loop on G to discover the SCCs one-by-one */
	// Cleanup variables
    $GLOBALS['leader'] = array();
    $GLOBALS['exploredNodes'] = array();
	$GmagicalOrder = replaceNodesWithFinishingTimes();
	dfs_loop($GmagicalOrder);
	
	$result = array();
	foreach ($GLOBALS['leader'] as $k => $value) {
		if (!isset($result[$value])) {
			$result[$value] = 1;
		} else {
			$result[$value] += 1;
		}
	}
	natsort($result);
    return $result;
	
}

// Iterates over nodes.
function dfs_loop ($G) {
    $Gnodes = $GLOBALS['n']; //getNodesOfGraph($G);
	// $Glength = count($Gnodes);
        $Glength = $GLOBALS['n'];
	for ($i = $Glength; $i > 1; $i--) {
		if (!isAlreadyExplored($i)) {
			$GLOBALS['s'] = $i;
			dfs($G, $i);
		}
	}
}

// Iterates over edges for certain node.
function dfs($G, $node) {
    // Mark i as explored
    array_push($GLOBALS['exploredNodes'], $node);
    // Set leader
    $GLOBALS['leader'][$node] = $GLOBALS['s'];
	foreach ($G as $key => $edge) {
		$tail = $edge[0];
		$head = $edge[1];
		if ($tail === $node) {
			// If head not explored yet, run depth first search.
			if (!isAlreadyExplored($head)) {
               dfs($G, $head); 
            }
		}
	}

    $GLOBALS['processedNodes']++;
    $GLOBALS['finishingTimes'][$node] = $GLOBALS['processedNodes'];
}

function isAlreadyExplored($node) {
	return in_array($node, $GLOBALS['exploredNodes']);
}
	
// Replace node names with finishing times.
function replaceNodesWithFinishingTimes() {
    $G = $GLOBALS['G'];
    $magicalEdge = array();
	$GmagicalOrder = array();
	foreach ($G as $key => $edge) {
		foreach ($edge as $node) {
			$magicalEdge[] = $GLOBALS['finishingTimes'][$node];
		}
		$GmagicalOrder[$key] = $magicalEdge;
	}

    return $GmagicalOrder;
}