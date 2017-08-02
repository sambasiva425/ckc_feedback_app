angular.module('CKC.controllers')

  .controller('optionsController', function($scope, $state, $ionicPopup, $ionicModal, $cordovaSQLite, $rootScope, $timeout) {

    $scope.walkInCustomer = function(walkin) {
      $state.go('walkIn');
      console.log("options[$index]", walkin);
      $rootScope.optionntypeselect = walkin;
    }

    $scope.showPopup = function(materialised) {
      $ionicModal.fromTemplateUrl('materialpopup.html', {
        scope: $scope,
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
        console.log("options[$index]", materialised);
        console.log("invoicedata:", $scope.xyz)
        $rootScope.optionntypeselect = materialised;
      });
    }


    $scope.Proceed = function(invoice) {
     console.log(invoice)
      if (invoice == null || invoice == '' || invoice <= 1000000000 || invoice > 9999999999) {
        var alertPopup = $ionicPopup.alert({
          title: 'Ivoice',
          template: 'Enter 10 Digit Invoice number'
        });
        alertPopup.then(function(res) {});
      }
      else {
        console.log("xyz:", invoice.length)
        $rootScope.invoice = invoice;
        console.log("invoicedata:", $rootScope.invoice)
        $scope.modal.hide()

        $state.go('materialForm');
        $scope.invoice = ''
      }

    }


    $scope.count = $rootScope.shopNameOptions;
    console.log("$scope.count", $scope.count)

    if ($scope.count == null || $scope.count == '') {

      console.log("no data");


    } else {
      // options geting from main controller 

      console.log('$rootScope.shopNameOptions:', $rootScope.shopNameOptions);
      $scope.options = $rootScope.shopNameOptions.split(",");

      if ($scope.options[0] == "" && $scope.options.length == 1) {
        $scope.options = '';
      }

    }
    console.log("$scope.options:", $scope.options)

  });
