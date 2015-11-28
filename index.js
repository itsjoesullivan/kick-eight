module.exports = function(context) {
  var osc = context.createOscillator();
  var gain = context.createGain();
  osc.connect(gain);

  gain.start = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
    osc.start(when);
    gain.setValueAtTime(0.0001, when);
    gain.exponentialRampToValueAtTime(1, when + 0.01);
    gain.exponentialRampToValueAtTime(0.0001, when + 1);
  };

  gain.stop = function(when) {
    if (typeof when !== 'number') {
      when = context.currentTime;
    }
  };

  return gain;
};
