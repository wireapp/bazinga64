"use strict";
var base64 = require("base64-js");
var bazinga64;
(function (bazinga64) {
    function fromByteArray(arrayBufferView) {
        return base64.fromByteArray(arrayBufferView);
    }
    bazinga64.fromByteArray = fromByteArray;
})(bazinga64 || (bazinga64 = {}));
module.exports = bazinga64;
