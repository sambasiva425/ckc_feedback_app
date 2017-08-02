angular.module('CKC.controllers', [])


  .controller('mainController', function($scope, $state, $window, $cordovaNetwork, $httpParamSerializerJQLike, $ionicModal, $cordovaSQLite, $rootScope, $timeout, $http, $location) {

    // selectAll();  
    $scope.doRefresh = function() {
      console.log('Refreshing!');
      $timeout(function() {
        $cordovaSQLite.execute(db, "DELETE FROM adminshop1");
        $cordovaSQLite.execute(db, "DELETE FROM feeds");
        $cordovaSQLite.execute(db, "DELETE FROM walkindata");
        console.log('Refreshing!');
        $window.location.reload(true)
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };


    $scope.selectAll = selectAll;
    $rootScope.shopNameOptions = '';

    function selectAll() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM adminshop1";
      $cordovaSQLite.execute(db, query).then(function(res) {
        console.log("res:", res.rows.length);
        $scope.shopdata = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            $scope.shopdata.push({
              shopid: res.rows.item(i).shopid,
              url: res.rows.item(i).url,
              shopname: res.rows.item(i).shopname,
              Description: res.rows.item(i).Description,
              type: res.rows.item(i).type,
            });
          }
          console.log("dataaaa:", $scope.shopdata.length);
        } else {
          $scope.spinner = true;
          setTimeout(function() {
            if ($scope.shopdata.length <= res.rows.length) {
              $scope.spinner = false;
              $window.location.reload(true);
            }
          }, 2000);

          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    $scope.optionsapage = function(data) {
      console.log("data:", data);
      $state.go('options');
      $rootScope.duplicate = data;
      console.log($rootScope.duplicate.shopid);
      $rootScope.questions = data.questions;
      $rootScope.shopname = data.shopname;
      $rootScope.shopNameOptions = data.type;
    }


  });
