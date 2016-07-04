/// <reference path="../typings/index.d.ts" />
import * as base64 from "base64-js";

module bazinga64 {
  /**
   * Base64-encodes an array buffer view.
   *
   * @param decoded Array buffer view
   * @returns {string}
   */
  export function fromByteArray(decoded: Uint8Array) {
    return base64.fromByteArray(decoded);
  }

  /**
   * Decodes a Base64-encoded String.
   *
   * @param encoded Serialized encoding
   * @returns {Uint8Array}
   */
  export function toByteArray(encoded: string) {
    return base64.toByteArray(encoded);
  }
}

module.exports = bazinga64;
