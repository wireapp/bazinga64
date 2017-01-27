/*! bazinga64 v5.0.1 */
var bazinga64 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Converter = (function () {
    function Converter() {
    }
    Converter.arrayBufferViewToStringUTF8 = function (arrayBufferView) {
        var unicodeString;
        try {
            unicodeString = this.arrayBufferViewToString(arrayBufferView);
        }
        catch (error) {
            if (typeof window === "object" && "TextDecoder" in window) {
                unicodeString = new TextDecoder("utf-8").decode(arrayBufferView);
            }
            else {
                unicodeString = String.fromCharCode.apply(null, arrayBufferView);
            }
        }
        return unicodeString;
    };
    Converter.jsonToArrayBufferView = function (json) {
        var length = Object.keys(json).length;
        var arrayBufferView = new Uint8Array(length);
        var objectSource = json;
        for (var key in objectSource) {
            if (objectSource.hasOwnProperty(key)) {
                var value = objectSource[key];
                arrayBufferView[parseInt(key, 10)] = value;
            }
        }
        return arrayBufferView;
    };
    Converter.numberArrayToArrayBufferView = function (array) {
        var arrayBuffer = new ArrayBuffer(array.length);
        var arrayBufferView = new Uint8Array(arrayBuffer);
        for (var i = 0; i < arrayBufferView.length; i++) {
            arrayBufferView[i] = array[i];
        }
        return arrayBufferView;
    };
    Converter.stringToArrayBufferViewUTF16 = function (data) {
        var arrayBuffer = new ArrayBuffer(data.length * 2);
        var arrayBufferView = new Uint16Array(arrayBuffer);
        for (var i = 0, strLen = data.length; i < strLen; i++) {
            arrayBufferView[i] = data.charCodeAt(i);
        }
        return arrayBufferView;
    };
    Converter.toArrayBufferView = function (data) {
        switch (data.constructor.name) {
            case "ArrayBuffer":
                return new Uint8Array(data);
            case "Array":
                return this.numberArrayToArrayBufferView(data);
            case "Number":
                return this.stringToArrayBufferViewUTF8(data.toString());
            case "String":
                return this.stringToArrayBufferViewUTF8(data);
            case "Uint8Array":
                return data;
            default:
                throw new Error(data.constructor.name + " is unsupported."
                    + " Please provide a 'String', 'Uint8Array' or 'Array'.");
        }
    };
    Converter.toString = function (data) {
        switch (data.constructor.name) {
            case "Array":
                var arrayBufferView = this.numberArrayToArrayBufferView(data);
                return this.arrayBufferViewToStringUTF8(arrayBufferView);
            case "Number":
                return data.toString();
            case "String":
                return data;
            case "Uint8Array":
                return this.arrayBufferViewToStringUTF8(data);
            default:
                throw new Error(data.constructor.name + " is unsupported."
                    + " Please provide a 'String', 'Uint8Array' or 'Array'.");
        }
    };
    Converter.stringToArrayBufferViewUTF8 = function (data) {
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
    };
    Converter.arrayBufferViewToString = function (arrayBufferView) {
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
    };
    return Converter;
}());
exports.Converter = Converter;
var DecodedData = (function () {
    function DecodedData(asBytes, asString) {
        this.asBytes = asBytes;
        this.asString = asString;
    }
    return DecodedData;
}());
exports.DecodedData = DecodedData;
var Decoder = (function () {
    function Decoder() {
    }
    Decoder.fromBase64 = function (data) {
        var nonBase64Alphabet = new RegExp("[^-A-Za-z0-9+/=]|=[^=]|={3,}$", "igm");
        var encoded = Converter.toString(data).replace(nonBase64Alphabet, "");
        var asBytes = Decoder.toByteArray(encoded);
        var asString = Converter.arrayBufferViewToStringUTF8(asBytes);
        var decoded = new DecodedData(asBytes, asString);
        return decoded;
    };
    Decoder.toByteArray = function (encoded) {
        if (encoded.length % 4 !== 0) {
            throw new Error("Invalid string. Length must be a multiple of 4.");
        }
        var decoded = undefined;
        if (typeof window === "object") {
            decoded = window.atob(encoded);
        }
        else {
            decoded = new Buffer(encoded, "base64").toString();
        }
        var rawLength = decoded.length;
        var arrayBufferView = new Uint8Array(new ArrayBuffer(rawLength));
        for (var i = 0, len = arrayBufferView.length; i < len; i++) {
            arrayBufferView[i] = decoded.charCodeAt(i);
        }
        return arrayBufferView;
    };
    return Decoder;
}());
exports.Decoder = Decoder;
var EncodedData = (function () {
    function EncodedData(asBytes, asString) {
        this.asBytes = asBytes;
        this.asString = asString;
    }
    return EncodedData;
}());
exports.EncodedData = EncodedData;
var Encoder = (function () {
    function Encoder() {
    }
    Encoder.toBase64 = function (data) {
        var decoded = Converter.toArrayBufferView(data);
        var asString = Encoder.fromByteArray(decoded);
        var asBytes = Converter.stringToArrayBufferViewUTF8(asString);
        var encoded = new EncodedData(asBytes, asString);
        return encoded;
    };
    Encoder.fromByteArray = function (decoded) {
        var base64EncodedString = undefined;
        if (typeof window === "object") {
            base64EncodedString = window.btoa(String.fromCharCode.apply(null, decoded));
        }
        else {
            base64EncodedString = new Buffer(decoded).toString("base64");
        }
        return base64EncodedString;
    };
    return Encoder;
}());
exports.Encoder = Encoder;


/***/ })
/******/ ]);
//# sourceMappingURL=bazinga64.js.map