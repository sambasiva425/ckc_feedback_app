angular.module('CKC.controllers')


  .controller('materialisedController', function($scope, $state, $ionicModal, $cordovaSQLite, $rootScope, $ionicPopup) {

    $scope.materialFormdata = [];
    $scope.material = function(data) {
      $scope.materialFormdata = data;
    }

    $scope.materialformpopup = function(materialFormdata) {
      console.log("materialdata:", materialFormdata)
      console.log('inside dta:', $scope.shopname);
      console.log('inside dta:', $scope.optionntypeselect);
      // console.log("Data:",customerid,name,number,email,address1,address2,rm)
      var query = "INSERT INTO materialform (customerid,name,number,email,address1,address2,rm,shopname,shopType,feedback) VALUES (?,?,?,?,?,?,?,?,?,?)";
      $cordovaSQLite.execute(db, query, [materialFormdata.customerid, materialFormdata.name, materialFormdata.number, materialFormdata.email, materialFormdata.address1, materialFormdata.address2, materialFormdata.rm, $scope.shopname, $scope.optionntypeselect, '[]']).then(function(res) {
        console.log("insertId:" + res.insertId);
        $rootScope.materialinsertId = res.insertId;
        console.log("ok")
        $scope.modal.hide();
        $scope.shows = true;
        $scope.showss = false;
      }, function(err) {
        console.error(err);
      });
    }

    $scope.materialisedpopupform = function(data) {
      console.log(data)

      if (data.customer == null || data.customer == "" || data.name == null || data.name == "" || data.number == null || data.number == "" || data.address == null || data.address == "" || data.rm == null || data.rm == "") {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter materialised Details',
          template: 'Please Fill All Fields'
        });
        alertPopup.then(function(res) {});
      } else {
        $ionicModal.fromTemplateUrl('materialpopupForm.html', {
          scope: $scope,
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }

    }



    $scope.data = {};

    $scope.materialised = function(data) {
      console.log("materuialform:", data);
      $scope.data = {};
    }


    $scope.shows = false;
    $scope.showss = true;
    $scope.continue = function() {
      $scope.modal.hide();
      $scope.shows = true;
      $scope.showss = false;

    }
    $scope.optionspage = function() {
      $scope.modal.hide();
      $state.go('materialForm');
    }

    $scope.materialsurvey = function() {
      $state.go('materialSurvey');
      $scope.shows = false;
      $scope.showss = true;

    }

    material()

    function material() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM materialform";
      $cordovaSQLite.execute(db, query).then(function(res) {
        console.log(res)
        $scope.materialdata = [];
        if (res.rows.length > 0) {
          // console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.materialdata.push({
              id: res.rows.item(i).id,
              customer: res.rows.item(i).customerid,
              name: res.rows.item(i).name,
              shopname: res.rows.item(i).shopname,
              number: res.rows.item(i).number,
              rm: res.rows.item(i).rm,
              feedback: JSON.parse(res.rows.item(i).feedback),
              email: res.rows.item(i).email,
              address: res.rows.item(i).address1,
              shopType: res.rows.item(i).shopType
            });
          }
          console.log("materialdata", $scope.materialdata)

        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    $scope.getvalues = function(data) {
      console.log(data)

      $scope.save = data;
      angular.forEach($scope.materialdata, function(res) {
        console.log(res.customer);
        if ($scope.save == res.customer) {
          console.log("true", res);
          $scope.data = res;
          console.log($scope.data)

        }
        console.log(res.customer);
      })
      console.log($scope.materialdata);
    }

  })
