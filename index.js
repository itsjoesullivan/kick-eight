module.exports = function(context) {
  var osc = context.createOscillator();
  osc.frequency.value = 55;
  var gain = context.createGain();
  osc.connect(gain);

  gain.start = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
    osc.start(when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(1, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.5, when + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.5);
  };

  gain.stop = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
  };

  return gain;
};
