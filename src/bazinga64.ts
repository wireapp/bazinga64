//<editor-fold desc="License">
/*
 * Wire
 * Copyright (C) 2016 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
//</editor-fold>
/// <reference path="../typings/index.d.ts" />
import DecodedData from "./DecodedData";
import * as base64 from "base64-js";

namespace bazinga64 {
  /**
   * @see https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
   * @returns {any}
   */
  function byteArrayToString(byteArray) {
    return String.fromCharCode.apply(null, new Uint16Array(byteArray));
  }

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
    let decodedByteArray: Uint8Array = base64.toByteArray(encoded);
    let decodedString: string = byteArrayToString(decodedByteArray);
    let decodedData = new DecodedData(decodedString, decodedByteArray);
    return decodedData.decodedByteArray;
  }
}

module.exports = bazinga64;
