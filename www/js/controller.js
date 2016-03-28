angular.module('starter', ['ionic', 'LocalStorageModule'])
.controller('main', function ($scope, $ionicModal, localStorageService) {

var configKey = 'configs';

$scope.configs = [];

$scope.config = {};

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


$scope.getConfigs = function () {
  if (localStorageService.get(configKey)) {
       $scope.configs = localStorageService.get(configKey);
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

$scope.getCurrentConfig = function () {
//  getConfigs().foreach{ config ->
//    {if(config.current){
//        $scope.config = config
//      }
//    }
//  }
}
});
