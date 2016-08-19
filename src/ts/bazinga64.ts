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

namespace bazinga64 {
  export class Converter {
    public static arrayBufferToArrayBufferView(arrayBuffer: ArrayBuffer): Uint8Array {
      let view = new DataView(arrayBuffer);
      let arrayBufferView = new Uint8Array(arrayBuffer);

      for (let i = 0, len = arrayBufferView.length; i < len; i++) {
        arrayBufferView[i] = view.getUint8(i);
      }

      return arrayBufferView;
    }

    public static arrayBufferToJSON(arrayBuffer: ArrayBuffer): JSON {
      return JSON.parse(this.arrayBufferToJSONString(arrayBuffer));
    }

    public static arrayBufferToJSONString(arrayBuffer: ArrayBuffer): string {
      let arrayBufferView = this.arrayBufferToArrayBufferView(arrayBuffer);
      return JSON.stringify(arrayBufferView);
    }
  }
}

if (typeof window !== "object") {
  module.exports = bazinga64;
}
