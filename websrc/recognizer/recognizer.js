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
	var callback = null;
	var empty_callback = function(){};
	
	var speechRecognition = new webkitSpeechRecognition();
	speechRecognition.continuous = false;
	speechRecognition.interimResults = false;

	speechRecognition.onresult = function(event){
		for( var r = event.resultIndex; r < event.results.length; r++ ){
			callback( event.results[r][0].transcript );
		}
	};

	speechRecognition.onend = function(){
		if( started ){
			speechRecognition.start();
		}
	};

	// start recognizer
	self.start = function(user_callback){
		callback = user_callback || empty_callback;
		started = true;
		speechRecognition.start();
	}

	//stop now, and try to convert the existing sound buffer
	self.stop = function(){
		callback = empty_callback;
		started = false;
		speechRecognition.stop();
	}

	//stop immediatly
	self.abort = function(){
		callback = empty_callback;
		started = false;
		speechRecognition.abort();
	}
}


// in case we want to do something fancier in the future
	// speechRecognition.onaudiostart = function(){
	// 	//console.log("listening...");
	// };
	// speechRecognition.onsoundstart = function(){
	// 	//console.log("i hear something...");
	// };
	// speechRecognition.onspeechstart = function(event){
	// 	//console.log("its you talking....");
	// };
	// speechRecognition.onspeechend = function(){
	// 	//console.log("you finished talking...");
	// };
	// speechRecognition.onsoundend = function(){
	// 	//console.log("its quiet now....");
	// };
	// speechRecognition.onaudioend = function(){
	// 	//console.log("plugging my ears...");
	// };
	// speechRecognition.onresult = function(event){
	// 	for( var r = event.resultIndex; r < event.results.length; r++ ){
	// 		//console.log("***********************    " + event.results[r][0].transcript);
	// 		callback( event.results[r][0].transcript );
	// 	}
	// };
	// speechRecognition.onerror = function(event){
	// 	//console.log("SR: error");
	// 	//console.log(event);
	// };
	// speechRecognition.onend = function(){
	// 	if( started )
	// 		speechRecognition.start();
	// };