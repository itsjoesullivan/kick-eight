##Usage

`npm install --save kick-eight`

```javascript
var Kick8 = require('kick-eight');

// Initialize AudioContext
var context = new AudioContext();

// Initialize instrument
var kick = Kick8(context);

// Create clap audio node (one time use only)
var kickNode = kick();

// Connect to target node
kickNode.connect(context.destination);

// Start
kickNode.start(context.currentTime);
```
