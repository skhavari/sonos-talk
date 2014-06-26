// recognizer is a service that collects speech input from the user
// and converts it to text.  

// call start to begin recognizing speech input
// call stop  to stop  recognizing speech input
var recMod = angular.module("recognizer", []);


// create a service that returns a new SpeechRecognizer object
recMod.service('speechRecognizer', SpeechRecognizer );


function SpeechRecognizer() {

	var self = this;
	var started = false;
	
	self.speechRecognition = new webkitSpeechRecognition();
	self.speechRecognition.continuous = false;
	self.speechRecognition.interimResults = false;

	self.speechRecognition.onaudiostart = function(){
		console.log("listening...");
	};
	self.speechRecognition.onsoundstart = function(){
		console.log("i hear something...");
	};
	self.speechRecognition.onspeechstart = function(event){
		console.log("its you talking....");
	};
	self.speechRecognition.onspeechend = function(){
		console.log("you finished talking...");
	};
	self.speechRecognition.onsoundend = function(){
		console.log("its quiet now....");
	};
	self.speechRecognition.onaudioend = function(){
		console.log("plugging my ears...");
	};
	self.speechRecognition.onresult = function(event){
		for( var r = event.resultIndex; r < event.results.length; r++ ){
			console.log("***********************    " + event.results[r][0].transcript);
		}
	};
	self.speechRecognition.onerror = function(event){
		console.log("SR: error");
		console.log(event);
	};
	self.speechRecognition.onend = function(){
		if( started )
			self.speechRecognition.start();
	};




	self.start = function(){
		started = true;
		self.speechRecognition.start();
	}
	//stop now, and try to convert the existing sound buffer
	self.stop = function(){
		started = false;
		self.speechRecognition.stop();
	}

	//stop immediatly
	self.abort = function(){
		started = false;
		self.speechRecognition.abort();
	}
}