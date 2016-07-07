"use strict";
var base64 = require("base64-js");
var DecodedData_1 = require("./DecodedData");
var bazinga64;
(function (bazinga64) {
    function byteArrayToString(byteArray) {
        return String.fromCharCode.apply(null, new Uint16Array(byteArray));
    }
    function fromByteArray(decoded) {
        return base64.fromByteArray(decoded);
    }
    bazinga64.fromByteArray = fromByteArray;
    function toByteArray(encoded) {
        var decodedByteArray = base64.toByteArray(encoded);
        var decodedString = byteArrayToString(decodedByteArray);
        var decodedData = new DecodedData_1.default(decodedString, decodedByteArray);
        return decodedData.decodedByteArray;
    }
    bazinga64.toByteArray = toByteArray;
})(bazinga64 || (bazinga64 = {}));
module.exports = bazinga64;
