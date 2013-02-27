<?php
// Global variables
$s = null; // # current source vertex
$processedNodes = 0; // # of nodes processed so far
$finishingTimes = array(); // store the finishing times
$leader = array(); // store the leaders
$exploredNodes = array(); // if the node already seen

// Open file for read and string modification 
$file = "scc1.txt"; 
$fh = fopen($file, 'r+'); 
$contents = fread($fh, filesize($file)); 
fclose($fh);

// Main
$result = scc($contents);

var_dump($result);

function scc($data) {
	$G = prepareData($data);
	$Grev = reverseGraph($G);

	/* Run DFS-Loop on Grev to compute 'magical ordering' of nodes */
    dfs_loop($Grev);

    /* Run DFS-Loop on G to discover the SCCs one-by-one */
	// Cleanup variables
    $GLOBALS['leader'] = array();
    $GLOBALS['exploredNodes'] = array();
	$GmagicalOrder = replaceNodesWithFinishingTimes($G);
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
    $Gnodes = getNodesOfGraph($G);
	$Glength = count($Gnodes);
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

// Find all the nodes in the graph given.
function getNodesOfGraph($G) {
    $Gnodes = array();
	foreach ($G as $key => $edge) {
		foreach ($edge as $node) {
			if (!in_array($node, $Gnodes)) {
				$Gnodes[] = $node;
			}
		}
	}

    return $Gnodes;
}
	
// Replace node names with finishing times.
function replaceNodesWithFinishingTimes($G) {
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

// Reverse all arcs.
function reverseGraph($G) {
	foreach ($G as $key => $edges) {
		$revGraph[$key] = array_reverse($edges); 
	}
    return $revGraph;
}

function prepareData($data) {
	$dataEdgesArray = explode( "\n", $data );

	foreach ($dataEdgesArray as $key => $edge) {
		$vertices = explode(' ', trim($edge));
		foreach ($vertices as $k => $vertex) {
			$node = trim($vertex);
			$formattedEdge[$k] = (int) $node;
		}
		$resultDataStructure[$key] = $formattedEdge;

	}
	return $resultDataStructure;

}