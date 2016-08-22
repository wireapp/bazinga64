var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bazinga64;
(function (bazinga64) {
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
    bazinga64.UnexpectedInput = UnexpectedInput;
})(bazinga64 || (bazinga64 = {}));
