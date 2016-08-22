var bazinga64;
(function (bazinga64) {
    var Encoder = (function () {
        function Encoder() {
        }
        Encoder.toBase64 = function (data) {
            var decoded = bazinga64.Converter.toArrayBufferView(data);
            var asString = bazinga64.Encoder.fromByteArray(decoded);
            var asBytes = bazinga64.Converter.stringToArrayBufferViewUTF8(asString);
            var encoded = new bazinga64.EncodedData(asBytes, asString);
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
