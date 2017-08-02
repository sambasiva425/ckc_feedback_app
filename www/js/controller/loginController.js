angular.module('CKC.controllers')


  .controller('loginController', function($scope, $state, $location, $rootScope) {
    $scope.msg = '';
    $scope.submit = function(data) {
      $scope.msg = '';
      $rootScope.username = data.username;
      console.log("login", data.username, data.password)
      if (data.username == data.password) {
        console.log("success")
        $location.path('admin');
      } else {
        console.log("error")
        $scope.msg = "wrong Credientials"
      }
    }



  });
