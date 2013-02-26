// incorrect 57031,704,143,140,126
// The total number of SCCs is 371762 / 875714 nodes in graph / 5105031 edges / correct answer starts from 434821 ?
// The next batch of 5 largest SCCs is 205 197 177 162 152

var s = 0; // # current source vertex
var processedNodes = 0; // # of nodes processed so far
var finishingTimes = {}; // store the finishing times
var leader = {}; // store the leaders
var exploredNodes = []; // if the node already seen

var scc = function (Grev) {
    /* Run DFSLoop on Grev to compute 'magical ordering' of nodes */
    dfs_loop(Grev);
    /* Run DFSLoop on G to discover the SCCs onebyone */
    dfs_loop(finishingTimes);
    return leader;
}

// Iterates over nodes.
function dfs_loop (G) {
    var Gnodes = getNodesOfGraph($.extend(true, {}, G));
    var Glength = Object.keys(Gnodes).length;
    for (var i = Glength; i > 1; i--) {
        // If i not explored yet then
        if (!isAlreadyExplored(i)) {
            s = i;
            dfs(G, i);
        }
    }
}

// Iterates over edges for certain node.
function dfs(G, i) {
    // Mark i as explored
    exploredNodes.push(i);
    // Set leader
    leader[i] = s;
    $.each(G, function(index, edge) {
        var tail = edge[0],
            head = edge[1];
        if (tail === i) {
            // If head not explored yet, run depth first search.
            if (!isAlreadyExplored(head)) {
                console.log(exploredNodes);
               dfs(G, head); 
            }
        }
    });
    processedNodes++;
    finishingTimes[i] = processedNodes;
}

// Find all the nodes in the graph given.
function getNodesOfGraph (G) {
    var Gnodes = [];
    $.each(G, function (index, edge) {
        $.each(edge, function(index, nodeValue) {
            if ($.inArray(nodeValue, Gnodes) === -1) { // not found
                Gnodes.push(nodeValue);
            }
        });
    });
    return Gnodes;
}

function isAlreadyExplored(node) {
    return $.inArray(node, exploredNodes) === -1 ? false : true;
}

/* Input data example:
    1 5
    2 4
    3 1
    3 2
    3 6
    4 10
    Every row indicates an edge, the vertex label in first column is the tail and the vertex label in second column is the head.
   Result data example: {0=>[1, 5], 1=>[2, 4], 2=>[3, 1], 3=>[3, 2], 4=>[3, 6], 5=>[4, 10]} */
var prepareInputData = function (data) {
    /* inputOfStrings example: ["1 5", "2 4", "3 14", "3 2"] */
    var inputOfStrings = data.split('\r\n'),
    inputOfNumbers = {},
    rowPartsOfStrings = [];
    // Reorganize array so as to use it easily.
    $.each(inputOfStrings, function (index, value) {
        rowPartsOfStrings = value.split(' ');
        // Convert strings to numbers
        var rowPartsOfNumbers = [];
        $.each(rowPartsOfStrings, function (index, value) {
            /* rowPartsOfNumbers example: [1, 5] */
            var v = $.trim(value);
            if (typeof v !== 'undefined' && v !== '') {
                rowPartsOfNumbers[index] = parseInt(v);
            }
        })
        // Copy sub-arrays to main array such that:
        inputOfNumbers[index] = rowPartsOfNumbers;
    })

    return inputOfNumbers;
}

// Reverse all arcs.
var prepareRevData = function (data) {
    var revGraph = {};
    $.each(data, function(index, value) {
        revGraph[index] = value.reverse();
    })
    return revGraph;
}

function getKey(data) {
  for (var prop in data)
    if (data.propertyIsEnumerable(prop))
      return parseInt(prop);
}

