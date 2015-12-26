(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/joe/dev/kick-eight/index.js":[function(require,module,exports){
var NoiseBuffer = require('noise-buffer');

module.exports = function(context, parameters) {

  parameters = parameters || {};
  parameters.tone = typeof parameters.tone === 'number' ? parameters.tone : 64;
  parameters.decay = typeof parameters.decay === 'number' ? parameters.decay : 64;
  parameters.level = typeof parameters.level === 'number' ? parameters.level : 100;

  return function() {
    var osc = context.createOscillator();
    osc.frequency.value = 54;
    var gain = context.createGain();
    var oscGain = context.createGain();
    oscGain.connect(gain);
    osc.connect(oscGain);

    max = 2.2;
    min = 0.09;
    duration = (max - min) * (parameters.decay / 127) + min;

    var noise = context.createBufferSource();
    noise.buffer = NoiseBuffer(duration);
    var noiseGain = context.createGain();
    var noiseFilter = context.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1380 * 2;
    noiseFilter.Q.value = 20;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(gain);


    gain.start = function(when) {
      if (typeof when !== 'number') {
        when = context.currentTime;
      }
      noise.start(when);

      noiseGain.gain.setValueAtTime(2 * Math.max((parameters.tone / 127), 0.0001), when);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.01);
      noise.stop(when + duration);

      osc.start(when);
      osc.stop(when + duration);

      oscGain.gain.setValueAtTime(0.0001, when);
      oscGain.gain.exponentialRampToValueAtTime(1, when + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    };

    gain.stop = function(when) {
      if (typeof when !== 'number') {
        when = context.currentTime;
      }
    };

    return gain;
  };
};

},{"noise-buffer":"/Users/joe/dev/kick-eight/node_modules/noise-buffer/index.js"}],"/Users/joe/dev/kick-eight/main.js":[function(require,module,exports){
var Kick8 = require('./index');

var context = new AudioContext();
document.getElementById('kick').addEventListener('click', function(e) {
  var kick = Kick8(context, {
    level: 100,
    tone: parseInt(document.getElementsByTagName('input')[0].value),
    decay: parseInt(document.getElementsByTagName('input')[1].value)
  });
  kickNode = kick();
  kickNode.connect(context.destination);
  kickNode.start(context.currentTime + 0.01);
});

},{"./index":"/Users/joe/dev/kick-eight/index.js"}],"/Users/joe/dev/kick-eight/node_modules/noise-buffer/index.js":[function(require,module,exports){
// courtesy of http://noisehack.com/generate-noise-web-audio-api/
module.exports = function(length) {
  var sampleRate = 44100;
  var samples = length * sampleRate;
  var context = new OfflineAudioContext(1, samples, sampleRate);
  var noiseBuffer = context.createBuffer(1, samples, sampleRate);

  var output = noiseBuffer.getChannelData(0);
  for (var i = 0; i < samples; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
};

},{}]},{},["/Users/joe/dev/kick-eight/main.js"]);
