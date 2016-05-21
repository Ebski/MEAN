/**
 * Created by Ebbe on 21-05-2016.
 */
var person = Object.create(null);
person.fullName = function () {
    return this.firstName + ' ' + this.lastName;
}

var man = Object.create(person);
man.sex = "male";


var ebbe = Object.create(man);
ebbe.firstName = "Ebbe";
ebbe.lastName = "Nielsen";

console.log(ebbe.firstName);
console.log(ebbe.sex);
console.log(ebbe.fullName());
console.log(Object.getPrototypeOf(man));
console.log(Object.getPrototypeOf(ebbe));

var fromPrototype = function (prototype, object) {
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
    return newObject
};

var animal = {
    toString: function () {
        return this.name + " the " + this.nickname;
    }
};

var dog = fromPrototype(animal, {
    sound: "barks"
});

var vuffi = fromPrototype(dog, {
    name: "vuffi",
    nickname: "beast"
});

console.log(vuffi.name);
console.log(vuffi.sound);
console.log(vuffi.toString());
console.log(Object.getPrototypeOf(vuffi));
console.log(Object.getPrototypeOf(dog));

var Woman = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
};

Woman.prototype = {
    toString: function() {
        return this.firstName + ' ' + this.lastName;
    },
    sex: "female"
};

var hans = new Woman("Jytte", "Hansen");
console.log(hans.toString());
console.log(Object.getPrototypeOf(hans));
