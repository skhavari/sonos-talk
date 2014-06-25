//
//  A directive to visualizer the audio coming in through the mic
//  
//  TODO: lots of cleaning up and generalizing
//

var vizMod = angular.module('visualizer', []);

// a directive to visualize voice
// requires on bootstrap
// viz-canvas & viz-canvas-copy are used as styles <- fix
vizMod.directive('visualizeMicAudio', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {}, //one per element
    templateUrl: 'visualizer/visualizer.html',
    link: function(scope, element, attrs){
      //todo: this should be controlled by a style...
      var barCfg = {};
      barCfg.barColor = attrs.barColor || '#d42536';
      barCfg.barWidth = parseInt(attrs.barWidth || '4');
      barCfg.barGap   = parseInt(attrs.barGap   || '3');
      init(barCfg);
    }
  }
})



// globals
var audioContext, analyser, microphone, temp;

// fix vendor prefixes
function normalizeNames(){

    // fix getUserMedia
    navigator.getUserMedia =  navigator.getUserMedia || 
        navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia || navigator.msGetUserMedia;

    // fix requestAnimationFrame
    window.requestAnimationFrame =  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

    // return true if all prefixes are supported, false otherwise
    return (navigator.getUserMedia && window.requestAnimationFrame);
}


// init the mic, wire up audio nodes
function init(barCfg){

  var self = this;

  if (! normalizeNames() ) return;    

  temp = document.querySelector("#banner");

  // called when the audio stream is ready for use
  // wire up all the audio nodes and prepare for animation
  var onMicReady = function ( stream ){

      // create an audio context
      audioContext = new webkitAudioContext();

      // create an alayser
      analyser = audioContext.createAnalyser();

      // create the microphone media stream source
      microphone = audioContext.createMediaStreamSource(stream);

      // connect the mcrophone input to the analyser node
      microphone.connect(analyser);

      //setup the visualizer
      var viz = new simpleViz(barCfg);

      //init the visualizer
      new doVisualizer( viz['update'], analyser );
  }

  navigator.getUserMedia({audio: true}, onMicReady, function(err){
      console.log("getUserMedia failed");
      console.log(err);
  });
}


//
//
//stole the visualization from cbrandolino's local-audio-visualizer
//credit to him: https://github.com/cbrandolino/local-audio-visualizer
//
//

// Calls the `visualization` function every time a new frame is available.
function doVisualizer(visualization, analyser) {

    var self = this;
    this.visualization = visualization;
    var last = Date.now();
    
    var loop = function() {
        var dt = Date.now() - last;
        var byteFreq = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(byteFreq);
        
        last = Date.now();
        
        self.visualization(byteFreq, dt);
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);
}


// does the vizualization of the data
function simpleViz(barCfg) {
  
  var self = this;
  this.canvas = document.querySelector('#viz-canvas');
  this.ctx = this.canvas.getContext("2d");
  this.copyCtx = document.querySelector('#viz-canvas-copy').getContext("2d");
  
  this.ctx.fillStyle = barCfg.barColor;
  this.barWidth = barCfg.barWidth;
  this.barGap = barCfg.barGap;

  //to compensate for voices being predominantly much lower pitch
  //pretend like there are nFudge more bars, but only paint the first 1/nFudge
  var nFudge = 8;
  
  this.bars = Math.floor( (this.canvas.width) / (this.barWidth + this.barGap)) * nFudge;
  
  this.update = function(byteFreq) {
    
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);    
    var step = Math.floor(byteFreq.length / self.bars);

    for (var i = 0; i < (self.bars/(nFudge-1)); i++) {
      
      var barHeight = byteFreq[i*step];
      self.ctx.fillRect(
        i * (self.barWidth + self.barGap), 
        self.canvas.height - barHeight, 
        self.barWidth, 
        barHeight);
      self.copyCtx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.copyCtx.drawImage(self.canvas, 0, 0);
    }
  }
}