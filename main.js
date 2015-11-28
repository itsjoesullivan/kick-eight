var context = new AudioContext();
var kicky = require('./index');
document.getElementById('kick').addEventListener('click', function(e) {
  kickNode = kicky(context);
  kickNode.connect(context.destination);
  kickNode.start(context.currentTime + 0.01);
});
