var NoiseBuffer = require('noise-buffer');
var noiseBuffer = NoiseBuffer(1);

module.exports = function(context, parameters) {

  parameters = parameters || {};
  parameters.tone = typeof parameters.tone === 'number' ? parameters.tone : 64;
  parameters.decay = typeof parameters.decay === 'number' ? parameters.decay : 64;
  parameters.level = typeof parameters.level === 'number' ? parameters.level : 100;

  var playingNodes = [];

  return function() {

    var osc = context.createOscillator();
    osc.frequency.value = 54;
    var gain = context.createGain();
    var oscGain = context.createGain();
    osc.connect(oscGain);

    gain.decay = parameters.decay;
    gain.tone = parameters.tone;

    var choke = context.createGain();
    choke.gain.value = 0;

    oscGain.connect(choke);
    choke.connect(gain);


    gain.start = function(when) {
      if (typeof when !== 'number') {
        when = context.currentTime;
      }

      while (playingNodes.length) {
        playingNodes.pop().stop(when);
      }
      playingNodes.push(gain);

      choke.gain.setValueAtTime(0, when + 0.0001);
      choke.gain.linearRampToValueAtTime(1, when + 0.0002);

      max = 2.2;
      min = 0.09;
      duration = (max - min) * (gain.decay / 127) + min;

      var noise = context.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      var noiseGain = context.createGain();
      var noiseFilter = context.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1380 * 2;
      noiseFilter.Q.value = 20;
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(choke);


      noiseGain.gain.setValueAtTime(2 * Math.max((gain.tone / 127), 0.0001), when);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.01);
      noise.start(when);
      noise.stop(when + duration);

      osc.start(when);
      osc.stop(when + duration);
      osc.onended = function() {
        gain.disconnect();
      }

      oscGain.gain.setValueAtTime(0.0001, when);
      oscGain.gain.exponentialRampToValueAtTime(1, when + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    };

    gain.stop = function(when) {
      if (typeof when !== 'number') {
        when = context.currentTime;
      }

      choke.gain.setValueAtTime(1, when);
      choke.gain.linearRampToValueAtTime(0, when + 0.0001);
      choke.gain.cancelScheduledValues(when + 0.001);
    };

    return gain;
  };
};
