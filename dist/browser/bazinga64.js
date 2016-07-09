/**
 * bazinga64 - Base64 encoding and decoding with ASCII string representation
 * @version v2.0.0
 * @link https://github.com/wireapp/bazinga64#readme
 * @license GPL-3.0
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.bazinga64 = require('./node/bazinga64');

},{"./node/bazinga64":5}],2:[function(require,module,exports){
"use strict";
var DecodedData = (function () {
    function DecodedData(asBytes, asString) {
        this.asBytes = asBytes;
        this.asString = asString;
    }
    return DecodedData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DecodedData;

},{}],3:[function(require,module,exports){
"use strict";
var EncodedData = (function () {
    function EncodedData(asBytes, asString) {
        this.asBytes = asBytes;
        this.asString = asString;
    }
    return EncodedData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EncodedData;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnexpectedInput = (function (_super) {
    __extends(UnexpectedInput, _super);
    function UnexpectedInput(message) {
        _super.call(this, message);
        this.message = message;
        this.name = "UnexpectedInput";
        this.stack = (new Error()).stack;
    }
    UnexpectedInput.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    UnexpectedInput.UNSUPPORTED_TYPE = "Please provide a 'String', 'Uint8Array' or 'Array'.";
    return UnexpectedInput;
}(Error));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnexpectedInput;

},{}],5:[function(require,module,exports){
"use strict";
var DecodedData_1 = require("./DecodedData");
var EncodedData_1 = require("./EncodedData");
var UnexpectedInput_1 = require("./UnexpectedInput");
var base64 = require("base64-js");
var bazinga64;
(function (bazinga64) {
    var Converter;
    (function (Converter) {
        function arrayBufferViewToString(arrayBufferView) {
            return String.fromCharCode.apply(null, new Uint16Array(arrayBufferView));
        }
        Converter.arrayBufferViewToString = arrayBufferViewToString;
        function arrayBufferViewToUnicodeString(arrayBufferView) {
            var binaryString = Array.prototype.map.call(arrayBufferView, function (index) {
                return String.fromCharCode(index);
            }).join("");
            var escapedString = binaryString.replace(/(.)/g, function (match) {
                var code = match.charCodeAt(0).toString(16).toUpperCase();
                if (code.length < 2) {
                    return "0" + code;
                }
                else {
                    return "%" + code;
                }
            });
            return decodeURIComponent(escapedString);
        }
        Converter.arrayBufferViewToUnicodeString = arrayBufferViewToUnicodeString;
        function numberArrayToArrayBufferView(array) {
            var arrayBuffer = new ArrayBuffer(array.length);
            var arrayBufferView = new Uint8Array(arrayBuffer);
            for (var i = 0; i < arrayBufferView.length; i++) {
                arrayBufferView[i] = array[i];
            }
            return arrayBufferView;
        }
        Converter.numberArrayToArrayBufferView = numberArrayToArrayBufferView;
        function stringToArrayBufferView(data) {
            var arrayBuffer = new ArrayBuffer(data.length * 2);
            var arrayBufferView = new Uint16Array(arrayBuffer);
            for (var i = 0, strLen = data.length; i < strLen; i++) {
                arrayBufferView[i] = data.charCodeAt(i);
            }
            return arrayBufferView;
        }
        Converter.stringToArrayBufferView = stringToArrayBufferView;
        function toArrayBufferView(data) {
            switch (data.constructor.name) {
                case "Array":
                    return this.numberArrayToArrayBufferView(data);
                case "String":
                    return this.unicodeStringToArrayBufferView(data);
                case "Uint8Array":
                    return data;
                default:
                    throw new UnexpectedInput_1.default(UnexpectedInput_1.default.UNSUPPORTED_TYPE);
            }
        }
        Converter.toArrayBufferView = toArrayBufferView;
        function toString(data) {
            switch (data.constructor.name) {
                case "Array":
                    var arrayBufferView = this.numberArrayToArrayBufferView(data);
                    return this.arrayBufferViewToUnicodeString(arrayBufferView);
                case "EncodedData":
                    return data.asString;
                case "Number":
                    return data.toString();
                case "String":
                    return data;
                case "Uint8Array":
                    return this.arrayBufferViewToUnicodeString(data);
                default:
                    throw new UnexpectedInput_1.default(UnexpectedInput_1.default.UNSUPPORTED_TYPE);
            }
        }
        Converter.toString = toString;
        function unicodeStringToArrayBufferView(data) {
            var escapedString = encodeURIComponent(data);
            var binaryString = escapedString.replace(/%([0-9A-F]{2})/g, function (match, position) {
                var code = parseInt("0x" + position, 16);
                return String.fromCharCode(code);
            });
            var arrayBufferView = new Uint8Array(binaryString.length);
            Array.prototype.forEach.call(binaryString, function (character, index) {
                arrayBufferView[index] = character.charCodeAt(0);
            });
            return arrayBufferView;
        }
        Converter.unicodeStringToArrayBufferView = unicodeStringToArrayBufferView;
    })(Converter = bazinga64.Converter || (bazinga64.Converter = {}));
    var Decoder;
    (function (Decoder) {
        function fromBase64(data) {
            var encoded = bazinga64.Converter.toString(data);
            var asBytes = base64.toByteArray(encoded);
            var asString = bazinga64.Converter.arrayBufferViewToUnicodeString(asBytes);
            var decoded = new DecodedData_1.default(asBytes, asString);
            return decoded;
        }
        Decoder.fromBase64 = fromBase64;
    })(Decoder = bazinga64.Decoder || (bazinga64.Decoder = {}));
    var Encoder;
    (function (Encoder) {
        function toBase64(data) {
            var decoded = bazinga64.Converter.toArrayBufferView(data);
            var asString = base64.fromByteArray(decoded);
            var asBytes = bazinga64.Converter.unicodeStringToArrayBufferView(asString);
            var encoded = new EncodedData_1.default(asBytes, asString);
            return encoded;
        }
        Encoder.toBase64 = toBase64;
    })(Encoder = bazinga64.Encoder || (bazinga64.Encoder = {}));
})(bazinga64 || (bazinga64 = {}));
module.exports = bazinga64;

},{"./DecodedData":2,"./EncodedData":3,"./UnexpectedInput":4,"base64-js":6}],6:[function(require,module,exports){
'use strict';

exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

function init() {
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

init();

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

},{}]},{},[1])