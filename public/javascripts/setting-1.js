// var app = angular.module('app', []);
// app.config(function($interpolateProvider){
//     $interpolateProvider.startSymbol('{[{');
//     $interpolateProvider.endSymbol('}]}');
// });
var customInterpolationApp = angular.module('customInterpolationApp', []);

      customInterpolationApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
      });


      customInterpolationApp.controller('DemoController', function() {
          this.label = "This binding is brought you by {[{ }]} interpolation symbols.";
      });