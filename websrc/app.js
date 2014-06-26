var app = angular.module('sonosTalkApp', ['visualizer', 'recognizer']);


app.controller('actionsCtrl', ['$scope', 'speechRecognizer', function ($scope, SpeechRecognizer) {
		$scope.actions = ["Play", "pause", "mute", "unmute", "group"];
		$scope.listening = false;
		$scope.recognizer = SpeechRecognizer;
	}
]);