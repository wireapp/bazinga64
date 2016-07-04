/// <reference path="../typings/index.d.ts" />
import * as base64 from "base64-js";

module bazinga64 {
  export function fromByteArray(arrayBufferView: Uint8Array) {
    return base64.fromByteArray(arrayBufferView);
  }
}

module.exports = bazinga64;
