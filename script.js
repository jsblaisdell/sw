var spaceshipEmporium = angular.module('spaceshipEmporium', ['ngRoute']);

spaceshipEmporium.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/spaceship/:shipId', {
            templateUrl : 'pages/spaceship.html',
            controller  : 'spaceshipCtrl'
        })
});

spaceshipEmporium.factory('spaceshipData', function ($http) {
    return {
        getSpaceships: function () {
            return $http({method: 'GET', url: 'http://demo7475333.mockable.io/spaceships'})
        }
    }
})

spaceshipEmporium.controller('mainController', function($scope, spaceshipData) {
    spaceshipData.getSpaceships().success(function (spaceships) {
        $scope.spaceships = spaceships.products
    });
});

spaceshipEmporium.controller('spaceshipCtrl', function($scope, $routeParams, spaceshipData) {
    $scope.shipId = $routeParams.shipId;
    spaceshipData.getSpaceships().success(function (spaceships) {
        $scope.spaceship = spaceships.products[$scope.shipId]
    });
});
