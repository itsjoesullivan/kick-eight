var Kicky = require('./index');

var context = new AudioContext();
var kick = Kicky(context);
document.getElementById('kick').addEventListener('click', function(e) {
  kickNode = kick();
  kickNode.connect(context.destination);
  kickNode.start(context.currentTime + 0.01);
});
