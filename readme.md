##Usage

`npm install --save kicky`

```javascript
var kicky = require('kicky');

// Initialize AudioContext
var context = new AudioContext();

// Create clap audio node (one time use only)
var kickNode = kicky(context);

// Connect to target node
kickNode.connect(context.destination);

// Start
kickNode.start(context.currentTime);
```
