var values = {
  helloDecodedArray: [72, 101, 108, 108, 111],
  helloDecodedString: 'Hello',
  helloEncodedArray: [83, 71, 86, 115, 98, 71, 56, 61],
  helloEncodedString: 'SGVsbG8=',
  numberDecoded: 1337,
  numberEncoded: 'MTMzNw==',
  numberString: '1337'
};

var instance = undefined;

if (typeof window === 'object') {
  window.bazinga64 = window.bazinga64;
  window.sodium = window.sodium;
  instance = window;
} else {
  global.bazinga64 = require('../../../dist/commonjs/bazinga64');
  global.sodium = require('libsodium-wrappers-sumo');
  instance = global;
}

for (var key in values) {
  instance[key] = values[key];
}
