angular.module('starter', ['ionic', 'LocalStorageModule'])
.controller('main', function ($scope, $ionicModal, localStorageService, $http, $interval) {

var configKey = 'configs';


function getCurrentCash(){
  var url = $scope.config.url+"/cash/current";
  var config = $scope.config;
  $http.get(url).then( function(response) {
           $scope.current = response.data;
  },function(response) {
      $scope.config = null;
  });
}

$ionicModal.fromTemplateUrl('new-config.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.newConfig = modal;
});

$scope.openNewConfigModal = function() {
    $scope.newConfig.show();
};

$scope.closeNewConfigModal = function() {
   $scope.newConfig.hide();
};

$interval(function(){
  getCurrentCash();
},30000);

$scope.setUpConfigs = function(){
 if (localStorageService.get(configKey)) {
       $scope.configs = localStorageService.get(configKey);
       if(!$scope.config){
          $scope.config = $scope.configs[0];
          getCurrentCash();
       }
  } else {
       $scope.configs = [];
  }
}

$scope.createConfig = function () {
   $scope.configs.push($scope.config);
          localStorageService.set(configKey, $scope.configs);
          $scope.config = {};
          $scope.newConfig.hide();
}

$scope.removeConfig = function () {
  $scope.configs.splice(index, 1);
  localStorageService.set(configKey, $scope.config);
}

$scope.selectConfig = function(index){
var configs = $scope.configs;
  $scope.config = $scope.configs[index];
  getCurrentCash();
}
});
