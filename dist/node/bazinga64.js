var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bazinga64;
(function (bazinga64) {
    var EncodedData = (function () {
        function EncodedData(asBytes, asString) {
            this.asBytes = asBytes;
            this.asString = asString;
        }
        return EncodedData;
    }());
    var DecodedData = (function () {
        function DecodedData(asBytes, asString) {
            this.asBytes = asBytes;
            this.asString = asString;
        }
        return DecodedData;
    }());
    var UnexpectedInput = (function (_super) {
        __extends(UnexpectedInput, _super);
        function UnexpectedInput(message) {
            _super.call(this, message);
            this.message = message;
            this.name = "UnexpectedInput";
            this.stack = (new Error()).stack;
        }
        UnexpectedInput.UNSUPPORTED_TYPE = "Please provide a 'String', 'Uint8Array' or 'Array'.";
        return UnexpectedInput;
    }(Error));
    var Converter = (function () {
        function Converter() {
        }
        Converter.arrayBufferToArrayBufferView = function (arrayBuffer) {
            var view = new DataView(arrayBuffer);
            var arrayBufferView = new Uint8Array(arrayBuffer);
            for (var i = 0, len = arrayBufferView.length; i < len; i++) {
                arrayBufferView[i] = view.getUint8(i);
            }
            return arrayBufferView;
        };
        Converter.arrayBufferToJSON = function (arrayBuffer) {
            return JSON.parse(this.arrayBufferToJSONString(arrayBuffer));
        };
        Converter.arrayBufferToJSONString = function (arrayBuffer) {
            var arrayBufferView = this.arrayBufferToArrayBufferView(arrayBuffer);
            return JSON.stringify(arrayBufferView);
        };
        Converter.arrayBufferViewToStringUTF16 = function (arrayBufferView) {
            return String.fromCharCode.apply(null, new Uint16Array(arrayBufferView));
        };
        Converter.arrayBufferViewToStringUTF8 = function (arrayBufferView) {
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
                    return this.arrayBufferToArrayBufferView(data);
                case "Array":
                    return this.numberArrayToArrayBufferView(data);
                case "Number":
                    return this.stringToArrayBufferViewUTF8(data.toString());
                case "String":
                    return this.stringToArrayBufferViewUTF8(data);
                case "Uint8Array":
                    return data;
                default:
                    throw new UnexpectedInput((data.constructor.name + " is unsupported. ")
                        + UnexpectedInput.UNSUPPORTED_TYPE);
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
                    throw new UnexpectedInput((data.constructor.name + " is unsupported. ")
                        + UnexpectedInput.UNSUPPORTED_TYPE);
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
        return Converter;
    }());
    bazinga64.Converter = Converter;
    var Decoder = (function () {
        function Decoder() {
        }
        Decoder.fromBase64 = function (data) {
            var encoded = bazinga64.Converter.toString(data);
            var asBytes = bazinga64.Decoder.toByteArray(encoded);
            var asString = bazinga64.Converter.arrayBufferViewToStringUTF8(asBytes);
            var decoded = new DecodedData(asBytes, asString);
            return decoded;
        };
        Decoder.toByteArray = function (encoded) {
            if (encoded.length % 4 !== 0) {
                throw new UnexpectedInput("Invalid string. Length must be a multiple of 4.");
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
    bazinga64.Decoder = Decoder;
    var Encoder = (function () {
        function Encoder() {
        }
        Encoder.toBase64 = function (data) {
            var decoded = bazinga64.Converter.toArrayBufferView(data);
            var asString = bazinga64.Encoder.fromByteArray(decoded);
            var asBytes = bazinga64.Converter.stringToArrayBufferViewUTF8(asString);
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
    bazinga64.Encoder = Encoder;
})(bazinga64 || (bazinga64 = {}));
if (typeof window !== "object") {
    module.exports = bazinga64;
}
