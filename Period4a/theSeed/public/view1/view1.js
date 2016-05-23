'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
        var url = "/users/authenticate";
        $scope.login = function () {
            $http.post(url, $scope.user).success(function (res) {
                $scope.user.token = res;
            });
        }

        $scope.getName = function () {
            $.ajax({
                url: "http://localhost:8080/api/names",
                headers: {
                    Authorization: $scope.user.token.token
                },
                type: "GET",
                dataType: "json",
                success: function(res) {
                    $scope.userlist = res;
                }
            });
        }
    }]);