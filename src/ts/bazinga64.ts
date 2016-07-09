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
/// <reference path="../../typings/index.d.ts" />
import DecodedData from "./DecodedData";
import EncodedData from "./EncodedData";
import UnexpectedInput from "./UnexpectedInput";
import * as base64 from "base64-js";

namespace bazinga64 {

  export namespace Converter {

    // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
    export function arrayBufferViewToString(arrayBufferView: Uint16Array): string {
      return String.fromCharCode.apply(null, new Uint16Array(arrayBufferView));
    }

    // https://gist.github.com/mathiasbynens/1243213
    export function arrayBufferViewToUnicodeString(arrayBufferView: Uint8Array): string {
      let binaryString = Array.prototype.map.call(arrayBufferView, function (index: number) {
        return String.fromCharCode(index);
      }).join("");

      let escapedString = binaryString.replace(/(.)/g, function (match: string) {
        let code: string = match.charCodeAt(0).toString(16).toUpperCase();

        if (code.length < 2) {
          return `0${code}`;
        } else {
          return `%${code}`;
        }
      });

      return decodeURIComponent(escapedString);
    }

    export function numberArrayToArrayBufferView(array: number[]): Uint8Array {
      let arrayBuffer = new ArrayBuffer(array.length);
      let arrayBufferView = new Uint8Array(arrayBuffer);

      for (let i = 0; i < arrayBufferView.length; i++) {
        arrayBufferView[i] = array[i];
      }

      return arrayBufferView;
    }

    // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
    export function stringToArrayBufferView(data: string): Uint16Array {
      let arrayBuffer = new ArrayBuffer(data.length * 2);
      let arrayBufferView = new Uint16Array(arrayBuffer);

      for (let i = 0, strLen = data.length; i < strLen; i++) {
        arrayBufferView[i] = data.charCodeAt(i);
      }

      return arrayBufferView;
    }

    export function toArrayBufferView(data: any): Uint8Array {
      switch (data.constructor.name) {
        case "Array":
          return this.numberArrayToArrayBufferView(data);
        case "String":
          return this.unicodeStringToArrayBufferView(data);
        case "Uint8Array":
          return data;
        default:
          throw new UnexpectedInput(UnexpectedInput.UNSUPPORTED_TYPE);
      }
    }

    export function toString(data: any): string {
      switch (data.constructor.name) {
        case "Array":
          let arrayBufferView: Uint8Array = this.numberArrayToArrayBufferView(data);
          return this.arrayBufferViewToUnicodeString(arrayBufferView);
        case "Number":
          return data.toString();
        case "String":
          return data;
        case "Uint8Array":
          return this.arrayBufferViewToUnicodeString(data);
        default:
          throw new UnexpectedInput(UnexpectedInput.UNSUPPORTED_TYPE);
      }
    }

    // https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
    export function unicodeStringToArrayBufferView(data: string): Uint8Array {
      let escapedString = encodeURIComponent(data);

      let binaryString = escapedString.replace(/%([0-9A-F]{2})/g, function (match, position) {
        let code: number = parseInt(`0x${position}`, 16);
        return String.fromCharCode(code);
      });

      let arrayBufferView = new Uint8Array(binaryString.length);

      Array.prototype.forEach.call(binaryString, function (character: string, index: number) {
        arrayBufferView[index] = character.charCodeAt(0);
      });

      return arrayBufferView;
    }

  }

  export namespace Decoder {

    export function fromBase64(data: any): DecodedData {
      let encoded: string = bazinga64.Converter.toString(data);
      let asBytes: Uint8Array = base64.toByteArray(encoded);
      let asString = bazinga64.Converter.arrayBufferViewToUnicodeString(asBytes);
      let decoded: DecodedData = new DecodedData(asBytes, asString);
      return decoded;
    }

  }

  export namespace Encoder {

    export function toBase64(data: any): EncodedData {
      let decoded: Uint8Array = bazinga64.Converter.toArrayBufferView(data);
      let asString = base64.fromByteArray(decoded);
      let asBytes = bazinga64.Converter.unicodeStringToArrayBufferView(asString);
      let encoded: EncodedData = new EncodedData(asBytes, asString);
      return encoded;
    }

  }

}

module.exports = bazinga64;
