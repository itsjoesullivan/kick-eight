## Usage

`npm install --save kick-eight`

```javascript
var Kick8 = require('kick-eight');

// Initialize AudioContext
var context = new AudioContext();

// Initialize instrument
var kick = Kick8(context);

// Create kick audio node (one time use only)
var kickNode = kick();

// Connect to target node
kickNode.connect(context.destination);

// Start
kickNode.start(context.currentTime);

// You can create another kick with different parameters
// Accepted optional parameters are: decay and tone
kickNode = kick({ decay: 100, tone: 60 })
```
