(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/joe/dev/kicky/index.js":[function(require,module,exports){
module.exports = function(context) {
  var osc = context.createOscillator();
  osc.frequency.value = 54;
  var gain = context.createGain();
  osc.connect(gain);

  gain.start = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
    osc.start(when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(1, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + .3);
  };

  gain.stop = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
  };

  return gain;
};

},{}],"/Users/joe/dev/kicky/main.js":[function(require,module,exports){
var context = new AudioContext();
var kicky = require('./index');
document.getElementById('kick').addEventListener('click', function(e) {
  kickNode = kicky(context);
  kickNode.connect(context.destination);
  kickNode.start(context.currentTime + 0.01);
});

},{"./index":"/Users/joe/dev/kicky/index.js"}]},{},["/Users/joe/dev/kicky/main.js"]);
