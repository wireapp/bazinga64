"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnexpectedInput = (function (_super) {
    __extends(UnexpectedInput, _super);
    function UnexpectedInput(message) {
        _super.call(this, message);
        this.message = message;
    }
    UnexpectedInput.UNSUPPORTED_TYPE = "Please provide a 'String', 'Uint8Array' or 'Array'.";
    return UnexpectedInput;
}(Error));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnexpectedInput;
