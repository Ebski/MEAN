/**
 * Created by Ebbe on 21-05-2016.
 */
// Anonymous callback
var friends = ["Andreas, Dennis, Rune"];

friends.forEach(function (eachName, index){
    console.log(index + 1 + ". " + eachName);
});

//Named callback
var allUserData = [];

function logStuff(userData){
    if(typeof userData === "string") {
        console.log(userData);
    } else if (typeof userData === "object") {
        for(var item in userData) {
            console.log(item + ": " + userData[item]);
        }
    }
}
function getInput(options, callback) {
    allUserData.push(options);
    callback(options);
}
getInput({name: "Ebbe", exam: "MEAN"}, logStuff);