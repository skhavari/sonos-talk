var app = angular.module('sonosTalkApp', ['visualizer']);


app.controller('actionsCtrl', ['$scope', function ($scope) {
    $scope.actions = ["Play", "pause", "mute", "unmute", "group"];
    $scope.listening = false;
}]);