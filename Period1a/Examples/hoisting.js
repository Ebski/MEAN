/**
 * Created by Ebbe on 20-05-2016.
 */
console.log(declaredLater); // declaredLater is hoisted to the top of the scope but not initialized before next line
var declaredLater = "Now I'm defined"; // declaredLater is now initialized
console.log(declaredLater)

var name = "ImBubber";
(function hoist() {
    console.log(name); // Not defined as it uses the name from the scope which is not initialized yet.
    var name = "NoI'MBubber"; // Now it's initialized
    console.log(name); // Writes the right thing
})();

gotoSchool();
workHard();

function gotoSchool() {
    console.log("Im going to school");
}
function workHard() {
    console.log("And I 'work' very hard");
}

sleepLong(); // Works as a variable and only the name is hoisted. Does not know this is a function yet.
var sleepLong = function() {
    console.log("I slept very long today")
} // Now it's a function
sleepLong(); // Here it works
