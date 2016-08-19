var bazinga64;
(function (bazinga64) {
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
        return Converter;
    }());
    bazinga64.Converter = Converter;
})(bazinga64 || (bazinga64 = {}));
if (typeof window !== "object") {
    module.exports = bazinga64;
}
