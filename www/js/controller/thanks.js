angular.module('CKC.controllers')

.controller('thanksController', function($scope, $state,$rootScope, $ionicModal,$timeout, $cordovaSQLite, $q, $filter,$window, $location, $ionicPopup, $http,$httpParamSerializerJQLike, $cordovaNetwork) {
   
$scope.Main = function() {
    $state.go('Main');
    $window.location.reload(true)
}
})
