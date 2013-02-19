// todo: cleanup the empty objects
var min_cut = function (inputArray) {

    // Remove empty leaves
    $.each(inputArray, function (index, subArray) {
        if (subArray.length === 0) {
            delete inputArray[index];
        }
    })

    var length = Object.keys(inputArray).length;

    if (length <= 2) {
        // Cut represented by final number of vertices / cut edges.
        return inputArray;
    }

    /* Pick a remaining edge (u,v) uniformly at random. */

    // Get random vertex start - 'u'.

    var vertexStartRandIndex, verticesStartRowSubArray = [];

    while (verticesStartRowSubArray.length === 0) {
        vertexStartRandIndex = getRandomArbitary(1, length);
        verticesStartRowSubArray = inputArray[vertexStartRandIndex];
    }
    var  vertexStartValue = vertexStartRandIndex;
    
    // Get random vertex end - 'v' - from those in the appropriate row.
     var vertexEndRandIndex  = getRandomArbitary(1, verticesStartRowSubArray.length),
         vertexEndValue = verticesStartRowSubArray[vertexEndRandIndex - 1]; // since arrays are counted starting from zero index.

    /* Merge u and v into a single vertex. */

    var mergedVertexValue = Math.min(vertexStartValue, vertexEndValue),   // keep one of two vertices
        contractedVertexValue = Math.max(vertexStartValue, vertexEndValue);

    // Copy edges to a merged vertex's adjacency list before removal.
    $.each(inputArray, function (currentVertexIndex, subArray) {
        if (parseInt(currentVertexIndex) === contractedVertexValue) {
            
            $.each(subArray, function (index, value) {
                inputArray[mergedVertexValue].push(value);
            })
            // Remove contracted vertex.
            delete inputArray[currentVertexIndex];
        }
    })

    // Remove contracted vertex mention(s) in rows
    $.each(inputArray, function (currentVertexIndex, subArray) {
        // Remove all the mentions of the contracted vertex in the other vertices.
        $.each(subArray, function (index, value) {
            if (value === contractedVertexValue) {
                subArray.remove(index);
            }
            // Remove self-loops
            if (value === currentVertexIndex) {
                subArray.remove(index);
            }
        })
    })

    // Recursively call.
    min_cut(inputArray);
}

// Returns a random number between min and max
function getRandomArbitary(min, max) {
    return  Math.round(Math.random() * (max - min) + min);
}

/* Input data example:
   1 2 4
   2 1 3 4
   3 2 4
   4 1 2 3
   Result data example: {[2, 4], [1, 3, 4], [2, 4], [1, 2, 3]} */

var prepareData = function (data) {
    /* inputArrayOfRows example: ["1 2 4", "2 1 3 4", "3 2 4", "4 1 2 3"] */
    var inputOfStrings = data.split('\n');
    inputOfNumbers = {},
    rowPartsOfStrings = [];
    // Reorganize array so as to use it easily.
    $.each(inputOfStrings, function (index, value) {
        rowPartsOfStrings = value.split(' ');
        // Convert strings to numbers
        var rowPartsOfNumbers = [];
        $.each(rowPartsOfStrings, function (index, value) {
            /* rowPartsOfNumbers example: [1, 2, 4] */
            rowPartsOfNumbers[index] = parseInt(value);
        })
        // Copy sub-arrays to main array such that:
        // index equals to vertixNumber + 1;
        inputOfNumbers[index + 1] = rowPartsOfNumbers.slice(1);
    })

    return inputOfNumbers;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};