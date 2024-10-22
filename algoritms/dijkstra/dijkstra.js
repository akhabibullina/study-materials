var s = 0; // # current source vertex
var exploredNodes  = [], // if the node already seen
    shortestPaths  = []; // shortest paths distances

var dijkstra = function (G) {
   // init
   s = 1;
   exploredNodes.push(s);
   shortestPaths[s]  = 0;
   // main loop
   while (exploredNodes.length < Object.keys(G).length) { // javascript sets 1st index of an array to zero
      var weights = [];
      // iterate over all the nodes in the explored area
      $.each(exploredNodes, function(index, node) {
         var headAndWeghts = G[node];
         // iterate over all the edges of the current node
         $.each(headAndWeghts, function(i, headAndWeght){
             var head = +headAndWeght[0],
                 weight = +headAndWeght[1];
                 if (!isAlreadyExplored(head)) {
                    if (head in weights) {
                       // update only if new weight is less
                       var updateWeightForNode = weight + (shortestPaths[node] || 0);
                       weights[head] = (weights[head] < updateWeightForNode) ? weights[head] : updateWeightForNode;
                    } else {
                     weights[head] = weight + (shortestPaths[node] || 0);
                    }
                 }
         });
      });
      // all the weight values for arcs that connect explored and non-explored areas.
      var justWeights = weights.slice(0);
      justWeights.sort(function(a,b){return a - b});
      var minWeight = justWeights[0];

      // debugger

      s = weights.indexOf(minWeight);
      shortestPaths[s] = minWeight || 1000000; // +infinity
      exploredNodes.push(s);
   }
   
   return shortestPaths;
}

/* Input data example:
   1 2,10 4,30 5,100
   2 3,50
   3 5,10
   4 3,20 5,60
   5
   Every row indicates an edge, the vertex label in first column is the tail and the vertex label in second column is the head.
   Result data example: {1: [[2, 10], [4, 30], [5, 10]], 2: [3, 50], 3: [5, 10], 4: [[3, 20], [5, 60]], 5: []} */
var prepareInputData = function (data) {
   /* inputOfStrings example: ["1 5", "2 4", "3 14", "3 2"] */
   var inputOfStrings = data.split('\n'),
   inputOfNumbers = {},
   rowPartsOfStrings = [];

   // Reorganize array so as to use it easily.
   $.each(inputOfStrings, function (index, value) {
      var currentVertex = +index + 1;
      var oneEnd = [];
      rowPartsOfStrings = value.split(' '); // ["1", "2,10", "4,30", "5,100"]
      // Convert strings to numbers

      $.each(rowPartsOfStrings, function (key, value) {
         /* rowPartsOfNumbers example: [1, 5] */
         var currentValue = $.trim(value);
         var rowPartsOfNumbers = [];
         if (typeof currentValue !== 'undefined' && currentValue !== '') {
            var edgeLengthParts = currentValue.split(',')
            if (edgeLengthParts.length > 1) {
               // process head and length part which looks like "2,10"
               $.each(edgeLengthParts, function(i, val){
                  rowPartsOfNumbers[i] = parseInt(val);
               });
               oneEnd.push(rowPartsOfNumbers);
            }
         }
      })
      // Copy sub-arrays to main array such that:
      inputOfNumbers[currentVertex] = oneEnd;
   })
   console.log(inputOfNumbers);
   return inputOfNumbers;
}

function getKey(data) {
   for (var prop in data)
      if (data.propertyIsEnumerable(prop))
         return parseInt(prop);
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
