# Wire

This repository is part of the source code of Wire. You can find more information at [wire.com](https://wire.com) or by contacting opensource@wire.com.

You can find the published source code at [github.com/wireapp/wire](https://github.com/wireapp/wire).

For licensing information, see the attached LICENSE file and the list of third-party licenses at [wire.com/legal/licenses/](https://wire.com/legal/licenses/).

## Build Status

[![Build Status](https://travis-ci.org/wireapp/bazinga64.svg?branch=master)](https://travis-ci.org/wireapp/bazinga64)

### Run project

```bash
npm install
gulp default
```

## Use project

### In Browser

```bash
bower install bazinga64
```

```html
<script src="bower_components/system.js/dist/system.js"></script>
```

```javascript
SystemJS.import('bower_components/bazinga64/dist/browser/bazinga64.js')
.then(function(module) {
  var bazinga64 = module;
});
```

### In Node.js

```bash
npm install bazinga64
```

```javascript
var bazinga64 = require('bazinga64');
```

### Usage

```javascript
// Encoding
var encoded = bazinga64.Encoder.toBase64('Hello');
var base64 = encoded.asString;
console.log(base64); // "SGVsbG8="

// Decoding
var decoded = bazinga64.Decoder.fromBase64('SGVsbG8=');
var text = decoded.asString;
console.log(text); // "Hello"
```

## API

### `Converter`

- `arrayBufferToArrayBufferView`
- `arrayBufferToJSON`
- `arrayBufferToJSONString`
- `arrayBufferViewToStringUTF16`
- `arrayBufferViewToStringUTF8`
- `jsonToArrayBufferView`
- `numberArrayToArrayBufferView`
- `stringToArrayBufferViewUTF16`
- `stringToArrayBufferViewUTF8`
- `toArrayBufferView`
- `toString`

### `Decoder`

- `fromBase64`

### `Encoder`

- `toBase64`
