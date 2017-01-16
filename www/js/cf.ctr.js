angular.module('starter.controllers', [])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      setTimeout(function() {
        navigator.splashscreen.hide();
      }, 300);
    });
  })
