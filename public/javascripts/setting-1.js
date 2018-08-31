

var fantipperApp = angular.module('fantipperApp', []);

fantipperApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


fantipperApp.controller('myCtrl',function($scope, $parse, ) {
  $scope.configg = 'dfdgfd';
  console.log($scope.person);

  $scope.edit = function(user){
    console.log(user);
    $scope.header = user.creator.creatorName;
    
    $scope.image = user.creator.creatorTileImage;
    $scope.creatorEmail = user.creator.creatorEmail;
    console.log($scope.header,$scope.image,$scope.creatorEmail);
    console.log($scope.tip);
  }

  console.log($scope.showForm);

  $scope.showGuest = function(){
    console.log('what the hell');

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


