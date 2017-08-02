angular.module('CKC.controllers')


  .controller('adminController', function($scope, $state, $ionicModal, $timeout, $cordovaSQLite, $q, $filter, $window, $location, $ionicPopup, $http, $httpParamSerializerJQLike) {
    $scope.doRefresh = function() {

      console.log('Refreshing!');
      $cordovaSQLite.execute(db, "DROP TABLE walkindata");
      $cordovaSQLite.execute(db, "DROP FROM adminshop1");
      $cordovaSQLite.execute(db, "DROP TABLE feeds");
      $timeout(function() {
        $cordovaSQLite.execute(db, "DROP TABLE feeds");
        $window.location.reload(true)
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

 $scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem
 }
    $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetWalkInData').then(function(response) {
      console.log("response:", response.data);
      $scope.feedbacks = [];
      angular.forEach(response.data, function(res) {
        $scope.feedbacks.push({
          id: res.id,
          customer: res.customer,
          rm: res.rm,
          shopname: res.shopname,
          shoptype: res.shoptype,
          feedback: JSON.parse(res.feedback)
        });
        $scope.result = res;
        var query = "INSERT OR REPLACE INTO walkindata (id,customer,phone,email,address1,address2,rm ,shopname,shoptype,feedback) VALUES (?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [res.id, res.customer, res.phone, res.email, res.address1, res.address2, res.rm, res.shopname, res.shoptype, res.feedback]).then(function(res) {}, function(err) {
          console.error(err);
        });
      })

      console.log('$scope.feedbacks before', $scope.feedbacks);
        $scope.shopDetail = [];
        allFeedBack = angular.copy($scope.feedbacks);
      angular.forEach(allFeedBack, function(feeds) {
          $scope.impQuestionDetail = [];
        angular.forEach(feeds.feedback, function(options) {
          if (options.priority && options.priority.trim() === "1"  && options.ans === "No" ) {
            $scope.impQuestionDetail.push(options);
            console.log(options)
            console.log('impQuestionDetail:',$scope.impQuestionDetail  );

          }
        });
        if ($scope.impQuestionDetail.length > 0) {
          feeds.feedback = $scope.impQuestionDetail;
          console.log(feeds.feedback)
          $scope.shopDetail.push(feeds);
        }
      })


      console.log('shopDetail', $scope.shopDetail);
      console.log('$scope.feedbacks after', $scope.feedbacks);
    });

    $scope.expression = true;
    $scope.expression1 = false;
    $scope.expression2 = false;
    $scope.expression3 = false;
    $scope.expression4 = false;
    $scope.expression5 = false;
    $scope.expression6 = false;
    $scope.expression7 = false;
    $scope.data = { url: "", shopname: "", Description: "" };

    selectShop();
    walkin();
    fetchdata();
    material();

    $scope.exp = function() {
      $scope.expression = true;
      $scope.expression1 = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression5 = false;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }

    $scope.exp1 = function() {
      $scope.expression1 = true;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression5 = false;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }
    $scope.exp2 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = true;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }
    $scope.exp3 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = true;
      $scope.expression4 = false;
      $scope.expression5 = false;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }
    $scope.exp4 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = true;
      $scope.expression5 = false;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }
    $scope.exp5 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression5 = true;
      $scope.expression6 = false;
       $scope.expression7 = false;

    }

    $scope.exp6 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression5 = false;
      $scope.expression6 = true;
       $scope.expression7 = false;

    }
        $scope.exp7 = function() {
      $scope.expression1 = false;
      $scope.expression = false;
      $scope.expression2 = false;
      $scope.expression3 = false;
      $scope.expression4 = false;
      $scope.expression5 = false;
      $scope.expression6 = false;
       $scope.expression7 = true;

    }

    $scope.adminshop = function(data) {
      if (data.url == null || data.url == "" || data.shopname == '' || data.shopname == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Shop Details',
          template: 'Fill All Fields'
        });
        alertPopup.then(function(res) {});
      } else {

        // server
var full = "/android_asset/www/img/"+data.url;
        var datas = $httpParamSerializerJQLike({
          'shopname': data.shopname,
          'url': full,
          'Description': data.Description,
          'type': ''
        });
        console.log("data:", datas);
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        }

        $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/InsertShopName', datas, config)
          .success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
          })
          .error(function(data, status, header, config) {
            console.log("error")
          });

        $scope.data = { url: "", shopname: "", Description: "" };
      }
    }

    $scope.admintype = function(data, selectedName, shopname) {
      if (selectedName == '' || selectedName == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Select ShopType',
          template: 'Select Shop type'
        });
        alertPopup.then(function(res) {});
      } else if (data.type == null || data.type == undefined || data.type == "") {
        var alertPopup = $ionicPopup.alert({
          title: 'Enter Data',
          template: 'Fill Input field'
        });
        alertPopup.then(function(res) {});

      } else {
        console.log("id:", selectedName.id)
        var data = $httpParamSerializerJQLike({
          'id': selectedName.id,
          'type': data.type
        });

        console.log("data:", data)

        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        }
        $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/UpdateShopNameType', data, config)
          .success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
          })
          .error(function(data, status, header, config) {
            console.log("error")
          });

        $scope.data = { type: "" };
      }
    }

    $scope.optionstype = [];

    function selectShop() {
      selectAll('adminshop1').then(function(res) {
        console.log(res)
        var shopName = res;
        $scope.shopdata = [];
        if (shopName)
          for (var i = 0; i < shopName.length; i++) {
            $scope.shopdata.push({
              id: shopName.item(i).shopid,
              url: shopName.item(i).url,
              shopname: shopName.item(i).shopname,
              Description: shopName.item(i).Description,
              type: shopName.item(i).type,

            });
          }
        $scope.typevalue = function(selectedName) {
          console.log(selectedName.type)
          $scope.types = selectedName.type;
          $scope.optionstype = $scope.types.split(",");
          console.log($scope.optionstype)
        }
      });
    }

    function selectAll(tableName) {
      var deferred = $q.defer();
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM " + tableName;
      $cordovaSQLite.execute(db, query).then(function(res) {
        if (res.rows.length > 0) {
          deferred.resolve(res.rows);
        } else {
          console.log("No results found");
          deferred.resolve(false);
        }
        // console.log("selectAll dataaaa:", res)
      }, function(err) {
        console.error("error=>" + err);
      });
      return deferred.promise;
    }

    $scope.inputs = [];
    $scope.addfield = function() {
      $scope.inputs.push('');
    }
    $scope.remove = function(item) {
      var lastItem = $scope.inputs.length - 1;
      $scope.inputs.splice(lastItem);
    }

    $scope.radioadd = false;
    $scope.radiooption = function(s) {
      console.log("radio", s)
      $scope.radioadd = true;
    }

    $scope.add = function(selectedName, selectedtype, data, selection,priority) {
      console.log(priority)
      $scope.lastSubmit = angular.copy($scope.inputs);
      $scope.optionsdata = JSON.stringify($scope.lastSubmit);
      console.log($scope.optionsdata)
      if (selectedName == '' || selectedName == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Shop Name',
          template: 'select Shop Name'
        });
        alertPopup.then(function(res) {});
      } else if (selectedtype == '' || selectedtype == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Select ShopType',
          template: 'Select Shop type'
        });
        alertPopup.then(function(res) {});

      } else if (selection == '' || selection == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Select QuestionType',
          template: 'Select Question type'
        });
        alertPopup.then(function(res) {});
      } else if (data.questions == null || data.questions == "") {
       
         var alertPopup = $ionicPopup.alert({
          title: 'Question',
          template: 'Please Fill the Question '
        });
        alertPopup.then(function(res) {});
      }  else {

        var datas = $httpParamSerializerJQLike({
          'shopname': selectedName.shopname,
          'selectedtype': selectedtype,
          'questions': data.questions,
          'selection': selection,
          'options': $scope.optionsdata,
          'priority':priority
        });
        console.log("data:", datas);
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        }

        // $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/InsertFeeds', datas, config)
        //   .success(function(data, status, headers, config) {
        //     console.log("data:", data)
        //   })
        //   .error(function(data, status, header, config) {
        //     console.log("error")
        //   });
        $scope.radioadd = false;
        $scope.inputs = [];
      }
    }

    $scope.choices = ["QuestionType", "RadioType"]
    $scope.Priority = ["1", "0"]
    $scope.qun = true;
    $scope.chage = function(selection) {
      switch (selection) {
        case 'QuestionType':
          $scope.radioadd = false;
          break;
        case 'RadioType':
          $scope.radioadd = true;
          break;
        default:
          break;
      }
    }


    $scope.delect = function(item) {
      id = item.id
      console.log("item:", item)
      var data = $httpParamSerializerJQLike({
        'id': item.id

      });
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/DeleteFeeds', data, config)
        .success(function(data, status, headers, config) {
          console.log("data:", data);
        })
        .error(function(data, status, header, config) {
          console.log("error")
        });

    }



    function walkin() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM walkindata";
      $cordovaSQLite.execute(db, query).then(function(res) {
        // console.log(res)
        $scope.walkindata = [];
        if (res.rows.length > 0) {
          // console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.walkindata.push({
              id: res.rows.item(i).id,
              customer: res.rows.item(i).customer,
              shopname: res.rows.item(i).shopname,
              rm: res.rows.item(i).rm,
              feedback: JSON.parse(res.rows.item(i).feedback),
              phone: res.rows.item(i).phone,
              email: res.rows.item(i).email,
              address: res.rows.item(i).address2,
              shopType: res.rows.item(i).shopType
            });
          }

        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    function material() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM materialform";
      $cordovaSQLite.execute(db, query).then(function(res) {
        $scope.materialdata = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            $scope.materialdata.push({
              id: res.rows.item(i).id,
              customer: res.rows.item(i).customerid,
              name: res.rows.item(i).name,
              shopname: res.rows.item(i).shopname,
              rm: res.rows.item(i).rm,
              feedback: JSON.parse(res.rows.item(i).feedback),
              email: res.rows.item(i).email,
              address: res.rows.item(i).address2,
              shopType: res.rows.item(i).shopType
            });
          }
          // console.log("materialdata", $scope.materialdata)

        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    function fetchdata() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM feeds";
      $cordovaSQLite.execute(db, query).then(function(res) {
        $scope.getshopdata = [];
        if (res.rows.length > 0) {
          // console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.getshopdata.push({
              id: res.rows.item(i).id,
              selectedtype: res.rows.item(i).selectedtype,
              shopname: res.rows.item(i).shopname,
              questions: res.rows.item(i).questions,
              selection: res.rows.item(i).selection,
               options: res.rows.item(i).options,
              priority: res.rows.item(i).priority

            });
          }
          console.log("getshopdata", $scope.getshopdata)
        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    $scope.questions = false;
    $scope.radioquestions = false;
    $scope.question = function() {
      $scope.questions = true;
      $scope.radioquestions = false;
    }

    $scope.radio = function() {
      $scope.radioquestions = true;
      $scope.questions = false;
    }
    $scope.logout = function() {
      $location.path('login')
    }

    $scope.home = function() {
      console.log("mainpage");
      $location.path('Main')
    }

    $scope.shopadmin = function(item) {
      $scope.newdata = [];
      $scope.duplicate = item;
      angular.forEach(JSON.parse($scope.duplicate.options), function(res) {
        $scope.event = res;
        $scope.newdata.push($scope.event);
      })
      $ionicModal.fromTemplateUrl('shopadmin.html', {
        scope: $scope,
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    $scope.newdatas = function(inputs) {
      console.log("fererejn")
      console.log("data:", inputs)
    }

    $scope.updatedata = function(data) {

      console.log("data:", data)
      $scope.newda = JSON.stringify($scope.newdata);
      types = $scope.newda;
      console.log("types:", types)
      var datas = $httpParamSerializerJQLike({
        'id': data.id,
        'questions': data.questions,
        'options': types,
        'shopname': data.shopname,
        'selectedtype': data.selectedtype,
        'selection': data.selection,
        'priority':data.priority
      });

      console.log("datad:", datas)
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/UpdateFeeds', datas, config)
        .success(function(data, status, headers, config) {
          console.log("data:", datas);
        })
        .error(function(data, status, header, config) {
          console.log("error")
        });
    }

    fetchshopdata();

    function fetchshopdata() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM adminshop1";
      $cordovaSQLite.execute(db, query).then(function(res) {
        $scope.shopdatatype = [];
        if (res.rows.length > 0) {
          // console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {
            $scope.shopdatatype.push({
              id: res.rows.item(i).shopid,
              url: res.rows.item(i).url,
              shopname: res.rows.item(i).shopname,
              type: res.rows.item(i).type,
            });
          }
          // console.log("data", $scope.shopdatatype)
        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

    $scope.delectshop = function(item) {}

    $scope.shoptype = function(item) {
      $scope.newdata = [];
      $scope.duplicate = item;
      console.log("$scope.duplicate :", $scope.duplicate);
      $ionicModal.fromTemplateUrl('shopatype.html', {
        scope: $scope,
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    $scope.shoptypeupdate = function(duplicate) {
      console.log("duplicate:", duplicate)
      var data = $httpParamSerializerJQLike({
        'id': duplicate.id,
        'shopname': duplicate.shopname,
        'type': duplicate.type,
        'url': duplicate.url
      });
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/UpdateShopName', data, config)
        .success(function(data, status, headers, config) {
          console.log("data:", data);
        })
        .error(function(data, status, header, config) {
          console.log("error")
        });

    }

    $scope.delectshop = function(item) {
      console.log("item:", item)


      var data = $httpParamSerializerJQLike({
        'id': item.id

      });
      // console.log("id:",id)
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/DeleteShopName', data, config)
        .success(function(data, status, headers, config) {
          console.log("data:", data);
        })
        .error(function(data, status, header, config) {
          console.log("error")
        });
    }


    $scope.delectWalkIn = function(item) {
      console.log("item:", item)
      var data = $httpParamSerializerJQLike({
        'id': item.id
      });
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/DeleteWalkInData', data, config)
        .success(function(data, status, headers, config) {
          console.log("data:", data);
        })
        .error(function(data, status, header, config) {
          console.log("error")
        });

    }


  });
