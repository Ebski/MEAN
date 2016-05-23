'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
  var url = '/users/signup';
  $scope.createUser = function() {
    $http.post(url, $scope.user).succes(function(res) {
      alert(res);
      console.log(res);
    })
  }


}]);