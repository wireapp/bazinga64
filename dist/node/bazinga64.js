"use strict";
var DecodedData_1 = require("./DecodedData");
var EncodedData_1 = require("./EncodedData");
var base64 = require("base64-js");
var bazinga64;
(function (bazinga64) {
    var Converter = (function () {
        function Converter() {
        }
        Converter.unicodeStringToArrayBufferView = function (data) {
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
            return String.fromCharCode.apply(null, new Uint16Array(arrayBufferView));
        };
        Converter.arrayBufferViewToUnicodeString = function (arrayBufferView) {
            var binaryString = Array.prototype.map.call(arrayBufferView, function (index) {
                return String.fromCharCode(index);
            }).join("");
            var escapedString = binaryString.replace(/(.)/g, function (match, position) {
                var code = position.charCodeAt(parseInt(position, 10)).toString(16).toUpperCase();
                if (code.length < 2) {
                    code = "0" + code;
                }
                return "%" + code;
            });
            return decodeURIComponent(escapedString);
        };
        Converter.numberArrayToArrayBufferView = function (array) {
            var arrayBuffer = new ArrayBuffer(array.length);
            var arrayBufferView = new Uint8Array(arrayBuffer);
            for (var i = 0; i < arrayBufferView.length; i++) {
                arrayBufferView[i] = array[i];
            }
            return arrayBufferView;
        };
        Converter.stringToArrayBufferView = function (data) {
            var arrayBuffer = new ArrayBuffer(data.length * 2);
            var arrayBufferView = new Uint16Array(arrayBuffer);
            for (var i = 0, strLen = data.length; i < strLen; i++) {
                arrayBufferView[i] = data.charCodeAt(i);
            }
            return arrayBufferView;
        };
        Converter.toArrayBufferView = function (data) {
            if (data.constructor.name === "String") {
                return this.unicodeStringToArrayBufferView(data);
            }
            else {
                return data;
            }
        };
        Converter.toString = function (data) {
            if (data.constructor.name === "String") {
                return data;
            }
            else {
                return this.arrayBufferViewToUnicodeString(data);
            }
        };
        return Converter;
    }());
    bazinga64.Converter = Converter;
    var Decoder = (function () {
        function Decoder() {
        }
        Decoder.fromBase64 = function (encoded) {
            var asBytes = base64.toByteArray(encoded);
            var asString = bazinga64.Converter.arrayBufferViewToUnicodeString(asBytes);
            var decoded = new DecodedData_1.default(asBytes, asString);
            return decoded;
        };
        return Decoder;
    }());
    bazinga64.Decoder = Decoder;
    var Encoder = (function () {
        function Encoder() {
        }
        Encoder.toBase64 = function (data) {
            var decoded = bazinga64.Converter.toArrayBufferView(data);
            var asString = base64.fromByteArray(decoded);
            var asBytes = bazinga64.Converter.unicodeStringToArrayBufferView(asString);
            var encoded = new EncodedData_1.default(asBytes, asString);
            return encoded;
        };
        return Encoder;
    }());
    bazinga64.Encoder = Encoder;
})(bazinga64 || (bazinga64 = {}));
module.exports = bazinga64;
