// Double list

var LinkedList = function(array) {
  this.head = null;
  this.tail = null;
  this.list = [];
  if (array) {
    for (var i= 0; i < array.length; i++) {
      this.add(array[i]);
    }

  }
};

var Node = function(value) {
  this.next = null;
  this.prev = null;
  this.value = value;
};

LinkedList.prototype.add = function(node) {
  if (!node) {
    return; // nothing to add
  }

  var node = new Node(node);

  if (this.list.length === 0) {
    // this is the first item in the list
    this.head = node;
    this.tail = node;
  } else {
    // add in the end of list
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  this.list.push(node);
};

LinkedList.prototype.get = function (key) {

  if (this.list.length) {
    var node;
    for (i=0; i<this.list.length; i++) {
      var node = this.list[i];
      if(key === node.value) {
        break;
      }
    }
    return node;
  }

};

LinkedList.prototype.removeByValue = function (value) {

  var node;

  if (this.list.length) {
    node = this.get(value);

    if (!node) {
      return null; // nothing found to delete
    }

    var nextNode, prevNode;

    if (this.list.length === 1) {

      // one element
      this.head = null;
      this.tail = null;
      this.list.pop();

    } else {

      if (this.head === node) {
        nextNode = node.next;
        nextNode.prev = null;
        this.head = nextNode;
      } else if (this.tail === node) {
        prevNode = node.prev;
        prevNode.next = null;
        this.tail = prevNode;
      } else {
        prevNode = node.prev;
        nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
      }

      this.list.splice(this.list.indexOf(node), 1);

    }
    return node;
  }

};