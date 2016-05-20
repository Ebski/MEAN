/**
 * Created by Ebbe on 20-05-2016.
 */
"use strict";

x = 3.14; // not allowed as x is not declared
o = {name: "Adam", age: 25}; // not allowed as o is not declared

var y = 3.14;
delete y; // not allowed to delete variables
function f(x,y){};
delete f; // not allowed to delete functions

function f2(x,x){}; // not allowed to have duplicate parameters

var obj = {};
Object.defineProperties(obj, "x", {value:0, writable: false});
obj.x = 3.14; // writing to a get only property is not allowed

var obje = {get x() {return 0}};
obje.x = 3.14; // writing to a read only property is not allowed.

var c = 010; // not allowed to do Octal numbers
var z = \3.14; // not allowed to use 'escape' characters

var eval = 3.14 // eval is not allowed as a variable name
var arguments = 3.14 // arguments is not allowed as a variable name

with(Math){var d = cos(2)} // with statement is not allowed

