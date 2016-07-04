"use strict";
var base64 = require("base64-js");
var bazinga64;
(function (bazinga64) {
    function fromByteArray(decoded) {
        return base64.fromByteArray(decoded);
    }
    bazinga64.fromByteArray = fromByteArray;
    function toByteArray(encoded) {
        return base64.toByteArray(encoded);
    }
    bazinga64.toByteArray = toByteArray;
})(bazinga64 || (bazinga64 = {}));
module.exports = bazinga64;
