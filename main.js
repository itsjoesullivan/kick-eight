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
