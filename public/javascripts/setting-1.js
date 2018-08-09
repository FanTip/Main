

var fantipperApp = angular.module('fantipperApp', ["ngRoute"]);

fantipperApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


fantipperApp.controller('DemoController', function() {
  this.label = "This binding is brought you by {[{ }]} interpolation symbols.";
  this.chh = 'uses';

});

fantipperApp.controller('myCtrl', function($scope, $parse, ) {
  $scope.configg = 'dfdgfd';
  console.log($scope.person);

  $scope.edit = function(user){
    console.log(user);
    $scope.header = user.creator.creatorName;
    $scope.image = user.creator.creatorTileImage;
    // $scope.creatorEmail = user.creator.creatorEmail;
    $scope.creatorEmail = user.creator.creatorEmail;

  }

  $scope.showGuest = function(){
    $scope.showForm = true;
  }

  $scope.hideGuest = function(){
    $scope.showForm = false;
  }

});

fantipperApp.controller('usernameCtrl', function($scope){
  var getUsername = document.getElementById('username').value;
  console.log(getUsername);
  // console.log($scope.creator_username);
});


