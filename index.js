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
