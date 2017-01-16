// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cfAssistant', ['ionic', 'ngAnimate'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })




    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('home', {
            url: '/home',
            // abstract: true,
            templateUrl: 'templates/home.html'
          })

          .state('/treatments', {
            url: '/treatments',
            templateUrl: 'templates/treatments.html'
          })

          .state('cfinfo', {
              url: '/cf',
              // abstract: true,
              templateUrl: 'templates/cf.html'
          })

        .state('recommendations', {
          url: '/recommendations',
          templateUrl: 'templates/accordion.html',
          controller: 'accordionCtrl'
        })

        .state('medcine', {
          url: '/meds',
          templateUrl: 'templates/meds.html',
          controller: 'cfmedsCtrl',
          controllerAs: 'vm'
        })

        .state('appointments', {
          url: '/appointments',
          templateUrl: 'templates/appointments.html',
          controller: 'cfAppointmentsCtrl',
          controllerAs: 'vm'
        })

        .state('contacts', {
          url: '/contacts',
          templateUrl: 'templates/contacts.html',
          controller: 'cfContactsCtrl',
          controllerAs: 'vm'
        })


        .state('tasks', {
          url: '/tasks',
          templateUrl: 'templates/tasks.html',
          controller: 'cfTasksCtrl',
          controllerAs: 'vm'
        });




      $urlRouterProvider.otherwise('/home');
    })

// .controller('CalendarController', ['$scope', '$http', '$state',
//     function($scope, $http, $state) {
//         $http.get('js/cfassistant.json').success(function(data) {
//             $scope.calendar = data.calendar;
//
//             $scope.onItemDelete = function(dayIndex, item) {
//                 $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
//             }
//
//             $scope.doRefresh =function() {
//                 $http.get('js/cfassistant.json').success(function(data) {
//                     $scope.calendar = data.calendar;
//                     $scope.$broadcast('scroll.refreshComplete');
//                 });
//             }
//
//             $scope.toggleStar = function(item) {
//                 item.star = !item.star;
//             }
//
//         });
//     }])

    .controller('ListController', ['$scope', '$http', '$state',
        function($scope, $http, $state) {
            $http.get('js/cfassistant.json').success(function(data) {
                $scope.artists = data.artists;
                $scope.whichartist=$state.params.aId;
                $scope.data = { showDelete: false, showReorder: false };

                $scope.onItemDelete = function(item) {
                    $scope.artists.splice($scope.artists.indexOf(item), 1);
                }

                $scope.doRefresh =function() {
                    $http.get('js/cfassistant.json').success(function(data) {
                        $scope.artists = data;
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }

                $scope.toggleStar = function(item) {
                    item.star = !item.star;
                }

                $scope.moveItem = function(item, fromIndex, toIndex) {
                    $scope.artists.splice(fromIndex, 1);
                    $scope.artists.splice(toIndex, 0, item);
                };
            });
        }]);

