var Kick8 = require('./index');

var context = new AudioContext();
var kick = Kick8(context);
document.getElementById('kick').addEventListener('click', function(e) {
  kickNode = kick();
  kickNode.connect(context.destination);
  kickNode.start(context.currentTime + 0.01);
});
