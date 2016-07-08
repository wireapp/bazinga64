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
