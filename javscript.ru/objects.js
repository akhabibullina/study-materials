////////////////////// 8 Objects
var calculator = {
a: 0,
b: 0,
readValues: function() {
    //this.a = +prompt('Type first value', 0);
    //this.b = +prompt('Type first value', 0);
},
sum: function () {
return this.a+this.b;
},
mul: function(){
return this.a*this.b;
}
}

calculator.readValues();
console.log( calculator.sum() );
console.log( calculator.mul() );

var ladder = {
  step: 0,
  up: function() {  // вверх по лестнице
    this.step++;
    return this;
  },
  down: function() {  // вниз по лестнице
    this.step--;
    return this;
  },
  showStep: function() { // вывести текущую ступеньку
    console.log('step:'+this.step);
  }
};

ladder.up().up().down().up().down().showStep();  // 1

var obj ={};
function A() {return 1};
function B() {return 1}

var a = new A;
var b = new B;

console.log( a == b ); // true

function Summator () {
return {
    run: function() {
        var a = +prompt('Type summator first value', 0);
        var b = +prompt('Type summator second value', 0);
        console.log(this.sum(a, b));
    },
    sum: function(a, b) {
        return a+b;
    }

};
}

new Summator().run();

function Adder(startingValue) {
    this.value = +startingValue;
    this.addInput = function() {
        this.value += +prompt('Type adder value', 0);

    };
    this.showValue = function() {
        console.log('added: '+this.value);
    };
}
var adder = new Adder(1); // начальное значение 1
adder.addInput(); // прибавит ввод prompt к текущему значению
adder.addInput(); // прибавит ввод prompt к текущему значению
adder.showValue(); // выведет текущее значение

