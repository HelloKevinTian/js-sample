//	reference from : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        console.log (name); // displayName() uses variable declared in the parent function    
    }
    displayName();    
}
init();

//////////////////////////////////////////////////////////////////
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();

//////////////////////////////////////////////////////////////////
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
//////////////////////////////////////////////////////////////////
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(Counter.value()); /* Alerts 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* Alerts 2 */
Counter.decrement();
console.log(Counter.value()); /* Alerts 1 */

//////////////////////////////////////////////////////////////////
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};
var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* Alerts 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* Alerts 2 */
Counter1.decrement();
console.log(Counter1.value()); /* Alerts 1 */
console.log(Counter2.value()); /* Alerts 0 */