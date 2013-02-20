var min_cut = function (inputArray) {

    var length = Object.keys(inputArray).length;

    if (length <= 2) {
        // Cut represented by final number of cut edges.
        var result = 0;
        $.each(inputArray, function (vertex, subArray) {
            result += subArray.length;
        })
        return result;
    }

    /* Pick a remaining edge (u,v) uniformly at random. */

    // Get random vertex start - 'u'.

    var min_of_array = getKey(inputArray),
        max_of_array = min_of_array + length - 1;

    var vertexStartRandIndex, verticesStartRowSubArray = [];

    while (typeof verticesStartRowSubArray === 'undefined' || verticesStartRowSubArray.length === 0) {
        vertexStartRandIndex = getRandomArbitary(min_of_array, max_of_array);
        verticesStartRowSubArray = inputArray[vertexStartRandIndex];
    }
    var vertexStartValue = vertexStartRandIndex;
    
    
    // Get random vertex end - 'v' - from those in the appropriate row.
    var vertexEndRandIndex, vertexEndValue = vertexStartValue;
    while (vertexEndValue === vertexStartValue || typeof vertexEndValue === 'undefined') {
        vertexEndRandIndex = getRandomArbitary(0, verticesStartRowSubArray.length - 1), // since arrays are counted starting from zero index.
        // todo when length < 5 then subarray is of size 21 and full of undefined
        vertexEndValue = verticesStartRowSubArray[vertexEndRandIndex];
    }

    console.log('u, v: ' + vertexStartValue + ',' + vertexEndValue);

    /* Merge u and v into a single vertex. */

    // Choose between two values randomly.
    var mergedVertexValue = Math.random() < 0.5 ? vertexStartValue : vertexEndValue;
        contractedVertexValue = mergedVertexValue === vertexStartValue ? vertexEndValue : vertexStartValue;

    //todo: merged vertex: NaN, contracted vertex: 5 
    console.log('merged vertex: ' + mergedVertexValue + ', contracted vertex: ' + contractedVertexValue);

    // Copy edges to a merged vertex's adjacency list before removal.
    $.each(inputArray, function (currentVertexIndex, subArray) {
        if (parseInt(currentVertexIndex) === contractedVertexValue) {
            $.each(subArray, function (index, value) {
                // todo: undefined
                inputArray[mergedVertexValue].push(value);
            })
            // Remove contracted vertex.
            delete inputArray[parseInt(currentVertexIndex)];
        }
    })
    
    // Remove all the mentions of the contracted vertex in the other vertices.
    $.each(inputArray, function (currentVertexIndex, subArray) {
        $.each(subArray, function (index, value) {
            if (value === contractedVertexValue) {
                subArray.remove(parseInt(index));
            }
        })
    })

    // Remove self-loops
    $.each(inputArray, function (currentVertexIndex, subArray) {
        $.each(subArray, function (index, value) {
            if (value === parseInt(currentVertexIndex)) {
                subArray.remove(parseInt(index));
            }
        })
    })

    // Remove empty leaves
    $.each(inputArray, function (index, subArray) {
        if (subArray.length === 0) {
            delete inputArray[parseInt(index)];
        }
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
   Result data example: {1: [2, 4], 2: [1, 3, 4], 3: [2, 4], 4: [1, 2, 3]} */

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
            var i = $.trim(index),
                v = $.trim(value);
            if (i !== '' && v!== '') {
                rowPartsOfNumbers[parseInt(i)] = parseInt(v);
            }
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

function getKey(data) {
  for (var prop in data)
    if (data.propertyIsEnumerable(prop))
      return parseInt(prop);
}