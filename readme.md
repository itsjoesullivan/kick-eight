##Usage

`npm install --save kicky`

```javascript
var Kicky = require('kicky');

// Initialize AudioContext
var context = new AudioContext();

// Initialize instrument
var kick = Kicky(context);

// Create clap audio node (one time use only)
var kickNode = kick();

// Connect to target node
kickNode.connect(context.destination);

// Start
kickNode.start(context.currentTime);
```
