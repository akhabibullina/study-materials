/* 
 * Hash Table Quic'n'Dirty, just for study pursposes.
 */

var HashTable = function (inputArray) {
   this.arrayOfBuckets = []; // Allocate array (of buckets)
   var that = this;
   if (typeof inputArray !== 'undefined') {
      $.each(inputArray, function (key, value) {
         that.add(key, value);
      });
      return this;
   }

}

   // Put value (provided key, value)
   HashTable.prototype.add = function (key, value) {
   var step = 5;
   var that = this;
   var hashCode = this.getHashCode(key); // bucket index
   // Hash function uses open addressing for solving the collisions
   // If bucket is empty put key, value into the bucket.
   var openAddressing = function(hashCode) {
      if (typeof that.arrayOfBuckets[hashCode] === 'undefined') {
         that.arrayOfBuckets[hashCode] = [key, value];
         return;
      } else {
         // Collision has happened. Handle it according to one of two solution methods:
         // either open addressing or chaning. Now we use *open addressing*.
         console.log('Collision has happened :( with hash code ' + hashCode);
         openAddressing(hashCode + step);
      }
   }
   openAddressing(hashCode);
}

   // Get value (provided key)
HashTable.prototype.get = function (key) {
   var step = 5;
   var that = this;
   var hashCode = this.getHashCode(key); // bucket index
   // Check whether we have that hash code in bucket array. Halt if key was not found.
   if (typeof this.arrayOfBuckets[hashCode] === 'undefined') {
      console.log('Unable to find value for such a key: ' + key);
      return false;
   }

   // Check if provided key equal to key from the bucket;
   // if yes then return value from the bucket.
   var openAddressing = function (hashCode, key) {
      var keyAndValue = that.arrayOfBuckets[hashCode];
      var newKey = keyAndValue[0];
      if (+key === +newKey) {
         var value = keyAndValue[1];
         return value;
      } else {
      // Continue search according to collision resolution method until you find the key.
      openAddressing(hashCode + step, key);
      }
   }
   return openAddressing(hashCode, key);
}

   // Hash function: calculate hash code using key; it will be used as bucket index.
   HashTable.prototype.getHashCode = function (key) {
      return key % 5;
   }
