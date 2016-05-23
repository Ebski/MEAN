/**
 * Created by Ebbe on 22-05-2016.
 */
var calculater = {
    add: function add(num1, num2) {
        return num1+num2;
    },
    substract: function substract(num1, num2) {
        return num1 - num2;
    },
    multiply: function multiply(num1, num2) {
        return num1*num2;
    },
    devide: function devide(num1,num2) {
        return num1/num2;
    },
    caret: function caret(num1, num2) {
        return Math.pow(num1, num2);
    }
}

exports.calculater = calculater;