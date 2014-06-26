var app = angular.module('sonosTalkApp', ['visualizer', 'recognizer']);


app.controller('actionsCtrl', ['$scope', function ($scope) {
		$scope.actions = ["Play", "pause", "mute", "unmute", "group"];
	}
]);



app.controller('speechRecognitionCtrl', ['$scope', 'speechRecognizer', function($scope, SpeechRecognizer){
	$scope.recognizer = SpeechRecognizer;
	$scope.recognizedText = "uninitialized";
	$scope.recognizer.start( function onRecognizedSpeech( text ){
		$scope.recognizedText = text;
		$scope.$apply();
	})
}])