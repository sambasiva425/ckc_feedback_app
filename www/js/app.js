// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;
angular.module('CKC', ['ionic', 'CKC.controllers', 'CKC.services', 'ngCordova'])

  .run(function($ionicPlatform, $cordovaSQLite, $http, $ionicHistory, $rootScope, $cordovaSms, $cordovaNetwork, $rootScope, $timeout, $cordovaSQLite, $q, $window, $location, $httpParamSerializerJQLike, $cordovaNetwork, $state) {

    $ionicPlatform.registerBackButtonAction(function() {

      if ($ionicHistory.currentStateName() === "walkIn" || $ionicHistory.currentStateName() === "survey" || $ionicHistory.currentStateName() === "thanks" || $ionicHistory.currentStateName() === "materialSurvey" || $ionicHistory.currentStateName() === "materialForm") {} else if ($ionicHistory.currentStateName() === "Main") {
        navigator.app.exitApp();
      } else {
        $ionicHistory.goBack();
      }
    }, 100);


    $ionicPlatform.ready(function() {



      if (window) {
        db = window.openDatabase("my.db", '1.0', 'sqlitedemo', 1024 * 1024 * 100); // browser 

        // db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
        // $cordovaSQLite.execute(db, "DROP TABLE adminshop1");
        // $cordovaSQLite.execute(db, "DELETE FROM materialform");
        $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer primary key UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback json)");
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json,priority varchar(50))");

      } else {

        db = $cordovaSQLite.openDB({ name: "my.db",location : "default" });
        $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer primary key UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback json)");
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json,,priority varchar(50))");

      }


      $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetShopName').then(function(response) {
        console.log("response:", response.data);
        angular.forEach(response.data, function(res) {
          console.log(res);
          // $scope.result = res;
          var query = "INSERT OR REPLACE INTO adminshop1(shopid,url,shopname,Description,type) VALUES (?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [res.shopid, res.url, res.shopname, res.Description, res.type]).then(function(res) {
            console.log(res);
          }, function(err) {
            console.error(err);
          });
        })
      });

      $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetFeeds').then(function(response) {
        console.log("response:",response.data);
        angular.forEach(response.data, function(res) {
          var query = "INSERT OR REPLACE INTO feeds(id,shopname,selectedtype,questions,selection,options,priority) VALUES (?,?,?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [res.id, res.shopname, res.selectedtype, res.questions, res.selection, res.options,res.priority]).then(function(res) {}, function(err) {
            console.error(err);
          });
        })
      });

      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM adminshop1";
      $cordovaSQLite.execute(db, query).then(function(res) {
        console.log("res:", res.rows.length);
        $rootScope.shopdata = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            $rootScope.shopdata.push({
              shopid: res.rows.item(i).shopid,
              url: res.rows.item(i).url,
              shopname: res.rows.item(i).shopname,
              Description: res.rows.item(i).Description,
              type: res.rows.item(i).type,
            });
          }
          console.log("dataaaa:", $rootScope.shopdata.length);
        } else {
          $rootScope.spinner = true;
          setTimeout(function() {
            if ($rootScope.shopdata.length <= res.rows.length) {
              $rootScope.spinner = false;
              $window.location.reload(true);
            }
          }, 4000);

          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });


      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          console.log("Internet is disconnected on your device");

        } else {
          console.log("Internet working");

          walkin();

          function walkin() {
            db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
            var query = "SELECT * FROM walkindata1";
            $cordovaSQLite.execute(db, query).then(function(res) {
              var walkindata = [];
              if (res.rows.length >= 1) {
                console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
                for (var i = 0; i < res.rows.length; i++) {

                  datas = $httpParamSerializerJQLike({
                    'customer': res.rows.item(i).customer,
                    'phone': res.rows.item(i).phone,
                    'email': res.rows.item(i).email,
                    'address1': res.rows.item(i).address1,
                    'address2': res.rows.item(i).address2,
                    'rm': res.rows.item(i).rm,
                    'shopname': res.rows.item(i).shopname,
                    'shoptype': res.rows.item(i).shoptype,
                    'feed': res.rows.item(i).feedback

                  });

          //         var newsms = {
          //           feedback: res.rows.item(i).feedback,
          //           customer: res.rows.item(i).customer,
          //           phone: res.rows.item(i).phone,
          //            email: res.rows.item(i).email,
          //         }
          //  sendFeedback()

          // $rootScope.body = JSON.stringify(newsms.feedback);
          // console.log("$rootScope.body:", $rootScope.body);
          // function sendFeedback() {
          //                  cordova.plugins.email.open({
          //     to:      newsms.email,
          //     cc:      'asambasivarao@saptalabs.com',
          //     bcc:     ['asambasivarao@saptalabs.com', 'asiva325@gmail.com'],
          //     subject: 'Greetings',
          //      body:   JSON.stringify(newsms.feedback)
          // });   
          //     }


                  // $scope.shopDetail = [];
                  // allFeedBack = angular.copy($scope.feedbacks);
                  // angular.forEach(allFeedBack, function(feeds) {
                  //   var impQuestionDetail = [];
                  //   angular.forEach(feeds.feedback, function(options) {
                  //     if (options.priority && (options.priority).trim() === "imp") {
                  //       impQuestionDetail.push(options);
                  //     }
                  //   });
                  //   if (impQuestionDetail.length >= 0) {
                  //     feeds.feedback = impQuestionDetail
                  //     $scope.shopDetail.push(feeds);
                  //   }
                  // })
// console.log(newsms);


                  // var options = {
                  //   replaceLineBreaks: JSON.stringify(newsms), // true to replace \n by a new line, false by default
                  //   android: {
                  //     intent: '' // send SMS with the native android SMS messaging
                  //     //intent: '' // send SMS without open any other app
                  //     //intent: 'INTENT' // send SMS inside a default SMS app
                  //   }
                  // };

                  // console.log(options)


                  // sendSMS()

                  // function sendSMS() {

                  //   $cordovaSms
                  //     .send('8050510017', 'This is some dummy text', options)
                  //     .then(function() {
                  //       alert('Success');
                  //       // Success! SMS was sent
                  //     }, function(error) {
                  //       alert('Error');
                  //       // An error occurred
                  //     });
                  // }


                  // console.log("data:", datas);
                  var config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                  }

                  var url = 'http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/InsertWalkInData'
                  $http.post(url, datas, config)
                    .success(function(data, status, headers, config) {
                      console.log(datas)
                      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
                      $cordovaSQLite.execute(db, "DROP TABLE walkindata1");
                      $cordovaSQLite.execute(db, "DELETE FROM walkindata1");
                      $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback json)");

                    })

                    .error(function(data, status, header, config) {
                      console.log("error")
                    });
                }
                console.log("walkindata", datas);
              } else {
                console.log("No results found");
              }
            }, function(err) {
              console.error("error=>" + err);
            });
          }

        }
      }

      if (window) {

        db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
        // $cordovaSQLite.execute(db, "DROP TABLE feeds");
        // $cordovaSQLite.execute(db, "DELETE FROM materialform");
        $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer primary key UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback json)");
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json)");

      } else {

        $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetShopName').then(function(response) {
          console.log("response:", response.data);
          angular.forEach(response.data, function(res) {
            console.log(res);
            // $scope.result = res;
            var query = "INSERT OR REPLACE INTO adminshop1(shopid,url,shopname,Description,type) VALUES (?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [res.shopid, res.url, res.shopname, res.Description, res.type]).then(function(res) {
              console.log(res);
            }, function(err) {
              console.error(err);
            });
          })
        });

        db = $cordovaSQLite.openDB({ name: "my.db" });
        $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer primary key UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback json)");
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json)");

      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('Main', {
        url: '/Main',
        cache: false,
        templateUrl: 'templates/Main.html',
        controller: 'mainController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      })

      .state('options', {
        url: '/options',
        templateUrl: 'templates/options.html',
        controller: 'optionsController'
      })

      .state('materialSurvey', {
        url: '/materialSurvey',
        templateUrl: 'templates/materialSurvey.html',
        controller: 'materialSurvey'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'templates/admin.html',
        controller: 'adminController',
        // resolve: {
        //   security: [ '$q', '$location', function ( $q, authenticateService, $location ) {
        //     if ( authenticateService.checkPermission( ) ) {
        //       console.log( 'allowed' );
        //     } else {
        //       console.log( 'Not allowed' );
        //       // $location.path('/');
        //       return $q.reject( "Not Authorized" );
        //     }
        //   } ]
        // }
      })

      .state('walkIn', {
        url: '/walkIn',
        templateUrl: 'templates/walkInForm.html',
        controller: 'walkInController'
      })
      .state('thanks', {
        url: '/thanks',
        templateUrl: 'templates/thanks.html',
        controller: 'thanksController'
      })
      .state('materialForm', {
        url: '/materialForm',
        templateUrl: 'templates/materialised.html',
        controller: 'materialisedController'
      })

      .state('survey', {
        url: '/survey',
        templateUrl: 'templates/survey.html',
        controller: 'surveyController'
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/Main');

  });
