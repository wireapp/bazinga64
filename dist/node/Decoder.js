var bazinga64;
(function (bazinga64) {
    var Decoder = (function () {
        function Decoder() {
        }
        Decoder.fromBase64 = function (data) {
            var encoded = bazinga64.Converter.toString(data);
            var asBytes = bazinga64.Decoder.toByteArray(encoded);
            var asString = bazinga64.Converter.arrayBufferViewToStringUTF8(asBytes);
            var decoded = new bazinga64.DecodedData(asBytes, asString);
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
    bazinga64.Decoder = Decoder;
})(bazinga64 || (bazinga64 = {}));
