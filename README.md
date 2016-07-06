# Wire

This repository is part of the source code of Wire. You can find more information at [wire.com](https://wire.com) or by contacting opensource@wire.com.

You can find the published source code at [github.com/wireapp/wire](https://github.com/wireapp/wire).

For licensing information, see the attached LICENSE file and the list of third-party licenses at [wire.com/legal/licenses/](https://wire.com/legal/licenses/).

## Build Status

[![Build Status](https://travis-ci.org/wireapp/bazinga64.svg?branch=master)](https://travis-ci.org/wireapp/bazinga64)

## Instructions

### Run project

```bash
npm install
gulp default
```

### Use project

**Node.js or CommonJS**

```javascript
var bazinga64 = require('bazinga64');
var encoded = 'AQIDBAUGBwg=';
var decoded = bazinga64.toByteArray(encoded);
// decoded: Uint8Array {'0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6, '6': 7, '7': 8}
```
