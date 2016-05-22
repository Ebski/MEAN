var app = angular.module("sampleApp", ["firebase"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray",
    function ($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase("https://3-waydatabinding.firebaseio.com/" + 1);

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.factory("chatUsers", ["$firebaseArray",
    function ($firebaseArray) {
        var ref = new Firebase("https://3-waydatabinding.firebaseio.com/users");
        return $firebaseArray(ref);
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages", "chatUsers",
    // we pass our new chatMessages factory into the controller
    function ($scope, chatMessages, chatUsers) {
        $scope.user = "Guest " + Math.round(Math.random() * 100);
        $scope.users = chatUsers;
        var newClient = true;

        var randomId = Math.round(Math.random() * 100000000);
        var ref = new Firebase("https://3-waydatabinding.firebaseio.com/users");
        (function addNewUser2() {
            if (newClient) {
                ref.child(randomId).set({
                    name: $scope.user
                })
            }
        })();

        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.messages = chatMessages;

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function () {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.messages.$add({
                from: $scope.user,
                content: $scope.message
            });

            // reset the message input
            $scope.message = "";
        };

        // if the messages are empty, add something for fun!
        $scope.messages.$loaded(function () {
            if ($scope.messages.length === 0) {
                $scope.messages.$add({
                    from: "Firebase Docs",
                    content: "Hello world!"
                });
            }
        });

        $(window).bind("beforeunload", function () {
            ref.child(randomId).remove();
        })
    }
]);