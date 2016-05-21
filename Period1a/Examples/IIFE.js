/**
 * Created by Ebbe on 21-05-2016.
 */
(function() {
    console.log("I invoked myself");
})();

// Without IIFE
var counter1 = function() {
    var i = 0;
    return {
        get: function() {
            return i;
        },
        set: function(x) {
            i = x;
        },
        increment: function() {
            return ++i;
        }
    };
};

// With IIFE
var counter2 = (function() {
    var i = 0;
    return {
        get: function() {
            return i;
        },
        set: function(x) {
            i = x;
        },
        increment: function() {
            return ++i;
        }
    };
})();

console.log(counter1().get() + " Value of counter 1" );
counter1().set(3);
console.log(counter1().increment() + " Value of counter 1 increment");
console.log(counter1().increment() + " Value of counter 1 increment");

console.log(counter2.get() + " Value of counter 2");
counter2.set(3);
console.log(counter2.increment() + " Value of counter 2 increment");