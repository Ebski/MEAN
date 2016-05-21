/**
 * Created by Ebbe on 21-05-2016.
 */
function createGreeting(firstName, lastName) {
    var greeting = "Hello ";

    // makeFullName has access to both parameters and variables of the createGreeting function
    function makeFullName() {
        return greeting + firstName + " " + lastName;
    }

    return makeFullName();
}

console.log(createGreeting("Ebbe", "Nielsen"));

function sayHello(firstName) {
    var greeting = "Hello ";

    function lastName(theLastName) {
        return greeting + firstName + " " + theLastName;
    }

    return lastName;
}

var hello = sayHello("Ebbe");
console.log(hello("Nielsen"));

