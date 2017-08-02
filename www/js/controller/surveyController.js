angular.module('CKC.controllers')

  .controller('surveyController', function($scope, $state, $timeout, $rootScope, $ionicPopup, $cordovaSQLite, $filter, $window, $http, $q, $httpParamSerializerJQLike) {
    console.log("shopname", $rootScope.duplicate.shopname);
    console.log("type", $rootScope.duplicate.type);

    console.log("$rootScope.optionntypeselect:", $rootScope.optionntypeselect)
    selectAll();

    $scope.radiooptions = [];
    $scope.radioques = [];

    function selectAll() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM feeds";
      $cordovaSQLite.execute(db, query).then(function(res) {
        $scope.shopdata = [];
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.shopdata.push({
              id: res.rows.item(i).id,
              questions: res.rows.item(i).questions,
              shopname: res.rows.item(i).shopname,
              selectedtype: res.rows.item(i).selectedtype,
              selection: res.rows.item(i).selection,
              options: res.rows.item(i).options,
              priority: res.rows.item(i).priority
            });
          }
          console.log("dataaaa:", $scope.shopdata);
          $scope.datafiltered = [];
          angular.forEach($scope.shopdata, function(res) {
            console.log('$rootScope.duplicate.shopname == res.shopname', $rootScope.duplicate.shopname == res.shopname);
            if ($rootScope.duplicate.shopname == res.shopname) {
              $scope.datafiltered.push(res);
            }
          })
          console.log('$scope.datafiltered.', $scope.datafiltered);
          console.log("id", $scope.datafiltered)
          $scope.datatype = $filter('filter')($scope.datafiltered, { selectedtype: $rootScope.optionntypeselect });
          $scope.questiontype = $filter('filter')($scope.datatype, { selection: "QuestionType" });
          $scope.radiotype = $filter('filter')($scope.datatype, { selection: "RadioType" });

          $scope.optionsdata = [];
          angular.forEach($scope.radiotype, function(res, key) {
            console.log(res);
            $scope.radiooptions.push(JSON.parse(res.options));
            $scope.radioques.push(res.questions)
            var readData = {
              priority:res.priority,
              ans: JSON.parse(res.options),
              qn: res.questions
            }

            $scope.optionsdata.push(readData);
            console.log($scope.optionsdata);

          })
        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }


    $scope.selectAnswers = function(selectedtype) {
      console.log(selectedtype)
    }

    $scope.survey1 = true;
    $scope.survey2 = false;
    $scope.survey3 = false;

    $scope.selectedtype = {};


    $scope.limit = 5;


    $scope.page1 = function(myform) {
      if (!myform) {

        $scope.survey1 = false;
        $scope.survey2 = true;
        $scope.survey3 = false;
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Feedback Details',
          template: 'Please Select all options'
        });
        alertPopup.then(function(res) {});
      }

    }

    $scope.page2 = function(myform1) {
      $scope.final = JSON.stringify($scope.selectedtype);
      if (!myform1) {
        $scope.survey1 = false;
        $scope.survey2 = false;
        $scope.survey3 = true;
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Feedback Details',
          template: 'Please Select all options'
        });
        alertPopup.then(function(res) {});
      }

    }
    $scope.page3 = function(myform2) {
      if (!myform2) {
        console.log($rootScope.walkin)
        var newkeys = [];
        angular.forEach($scope.selectedtype, function(val, key) {
          var fields = val.split('~');
          var feeds = {
            priority: fields[1],
            ques: key,
            ans: fields[0]
          }
          newkeys.push(feeds);
          console.log(feeds);
        });
        $scope.types = JSON.stringify(newkeys);
        console.log($scope.types);
        console.log($rootScope.insertId)
        var query = "UPDATE walkindata1 SET feedback = '" + $scope.types + "'  WHERE id ='" + $rootScope.insertId + "'";
        // var query = "UPDATE adminshop1 SET type=" + types[0] + " WHERE shopname =" + shopname;
        $cordovaSQLite.execute(db, query).then(function(res) {
          console.log("insertId: ", res);
          console.log("ok");
        }, function(err) {
          console.error(err);
        });
        $scope.survey1 = false;
        $scope.survey2 = false;
        $scope.survey3 = false;
        $state.go('thanks');
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Feedback Details',
          template: 'Please Fill all Fields'
        });
        alertPopup.then(function(res) {});
      }
    }
  })
