angular.module('CKC.controllers')

  .controller('walkInController', function($scope, $state, $ionicModal, $cordovaSQLite, $rootScope, $http, $q, $ionicPopup, $httpParamSerializerJQLike) {


    $scope.walkinformdata = [];


    $scope.formdata = function(data) {
      $scope.walkinformdata = data;
      console.log("data", data)
    }

    $scope.wakinpopup = function(walkinformdata) {

      if (walkinformdata == null || walkinformdata== "" || walkinformdata == undefined) {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Walkin Details',
          template: 'Please Fill Customer Name Field'
        });
        alertPopup.then(function(res) {});
      } else if (walkinformdata.customer == null || walkinformdata.customer == "" || walkinformdata.email == null || walkinformdata.email == "" || walkinformdata.phone == null || walkinformdata.phone == "" || walkinformdata.email == null || walkinformdata.email == "" || walkinformdata.rm == null || walkinformdata.rm == "") {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Walkin Details',
          template: 'Please Fill All Fields'
        });
        alertPopup.then(function(res) {});
      } else {
        $ionicModal.fromTemplateUrl('walkinpopupForm.html', {
          scope: $scope,
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }
    }
    $scope.walkinFormdata = function(walkinformdata) {
      $rootScope.walkin = walkinformdata;

      $rootScope.customername = walkinformdata.customer;
      console.log($rootScope.customername);
      console.log('inside dta:', $scope.shopname);
      console.log('inside dta:', $scope.optionntypeselect);
      var query = "INSERT INTO walkindata1 (customer,phone,email,address1,address2,rm,shopname,shoptype,feedback) VALUES (?,?,?,?,?,?,?,?,?)";
      console.log("query:", query)
      $cordovaSQLite.execute(db, query, [walkinformdata.customer, walkinformdata.phone, walkinformdata.email, walkinformdata.address1, walkinformdata.address2, walkinformdata.rm, $scope.shopname, $scope.optionntypeselect, '[]']).then(function(res) {
        console.log("insertId: " + res);
        console.log("ok")
        $rootScope.insertId = res.insertId;
        $scope.data = { customer: "", phone: "", email: "", address1: "", address2: "", rm: "" };
        $scope.modal.hide();
        $scope.shows = true;
        $scope.showss = false;
      }, function(err) {
        console.error(err);
      });

    }

    $scope.optionspage = function() {
      $state.go('walkIn');
      $scope.modal.hide();
    }

    $scope.shows = false;
    $scope.showss = true;
    $scope.survey = function() {
      $scope.modal.hide();
      $scope.shows = true;
      $scope.showss = false;
    }

    $scope.proceed = function() {
      $state.go('survey');
      $scope.shows = false;
      $scope.showss = true;

    }
  })
