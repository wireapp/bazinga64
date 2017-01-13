/// <reference path="../../typings/index.d.ts" />

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

  // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  public static arrayBufferViewToStringUTF16(arrayBufferView: Uint16Array): string {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBufferView));
  }

  // https://gist.github.com/mathiasbynens/1243213
  public static arrayBufferViewToStringUTF8(arrayBufferView: Uint8Array): string {
    let unicodeString: string;

    try {
      unicodeString = this.arrayBufferViewToString(arrayBufferView);
    } catch (error) {
      if (typeof window === "object" && "TextDecoder" in window) {
        unicodeString = new TextDecoder("utf-8").decode(arrayBufferView);
      } else {
        unicodeString = String.fromCharCode.apply(null, arrayBufferView);
      }
    }

    return unicodeString;
  }

  public static jsonToArrayBufferView(json: JSON): Uint8Array {
    const length = Object.keys(json).length;
    let arrayBufferView = new Uint8Array(length);

    let objectSource: any = json;
    for (let key in objectSource) {
      if (objectSource.hasOwnProperty(key)) {
        let value: number = objectSource[key];
        arrayBufferView[parseInt(key, 10)] = value;
      }
    }

    return arrayBufferView;
  }

  public static numberArrayToArrayBufferView(array: number[]): Uint8Array {
    let arrayBuffer = new ArrayBuffer(array.length);
    let arrayBufferView = new Uint8Array(arrayBuffer);

    for (let i = 0; i < arrayBufferView.length; i++) {
      arrayBufferView[i] = array[i];
    }

    return arrayBufferView;
  }

  // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  public static stringToArrayBufferViewUTF16(data: string): Uint16Array {
    let arrayBuffer = new ArrayBuffer(data.length * 2);
    let arrayBufferView = new Uint16Array(arrayBuffer);

    for (let i = 0, strLen = data.length; i < strLen; i++) {
      arrayBufferView[i] = data.charCodeAt(i);
    }

    return arrayBufferView;
  }

  public static toArrayBufferView(data: any): Uint8Array {
    switch (data.constructor.name) {
      case "ArrayBuffer":
        return this.arrayBufferToArrayBufferView(data);
      case "Array":
        return this.numberArrayToArrayBufferView(data);
      case "Number":
        return this.stringToArrayBufferViewUTF8(data.toString());
      case "String":
        return this.stringToArrayBufferViewUTF8(data);
      case "Uint8Array":
        return data;
      default:
        throw new Error(`${data.constructor.name} is unsupported.`
          + ` Please provide a 'String', 'Uint8Array' or 'Array'.`);
    }
  }

  public static toString(data: any): string {
    switch (data.constructor.name) {
      case "Array":
        let arrayBufferView: Uint8Array = this.numberArrayToArrayBufferView(data);
        return this.arrayBufferViewToStringUTF8(arrayBufferView);
      case "Number":
        return data.toString();
      case "String":
        return data;
      case "Uint8Array":
        return this.arrayBufferViewToStringUTF8(data);
      default:
        throw new Error(`${data.constructor.name} is unsupported.`
          + ` Please provide a 'String', 'Uint8Array' or 'Array'.`);
    }
  }

  // https://coolaj86.com/articles/unicode-string-to-a-utf-8-typed-array-buffer-in-javascript/
  public static stringToArrayBufferViewUTF8(data: string): Uint8Array {
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

  private static arrayBufferViewToString(arrayBufferView: Uint8Array) {
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
}

export class DecodedData implements IData {
  public asBytes: Uint8Array;
  public asString: string;

  constructor(asBytes: Uint8Array, asString: string) {
    this.asBytes = asBytes;
    this.asString = asString;
  }
}

export class Decoder {
  public static fromBase64(data: any): DecodedData {
    let nonPrintableCharacters: RegExp = new RegExp("[^\x20-\x7E]", "igm");
    let encoded: string = Converter.toString(data).replace(nonPrintableCharacters, "");
    let asBytes: Uint8Array = Decoder.toByteArray(encoded);
    let asString = Converter.arrayBufferViewToStringUTF8(asBytes);
    let decoded: DecodedData = new DecodedData(asBytes, asString);
    return decoded;
  }

  private static toByteArray(encoded: string): Uint8Array {
    if (encoded.length % 4 !== 0) {
      throw new Error("Invalid string. Length must be a multiple of 4.");
    }

    let decoded: string = undefined;

    if (typeof window === "object") {
      decoded = window.atob(encoded);
    } else {
      decoded = new Buffer(encoded, "base64").toString();
    }

    let rawLength: number = decoded.length;
    let arrayBufferView: Uint8Array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0, len = arrayBufferView.length; i < len; i++) {
      arrayBufferView[i] = decoded.charCodeAt(i);
    }

    return arrayBufferView;
  }
}

export class EncodedData implements IData {
  public asBytes: Uint8Array;
  public asString: string;

  constructor(asBytes: Uint8Array, asString: string) {
    this.asBytes = asBytes;
    this.asString = asString;
  }
}

export class Encoder {
  public static toBase64(data: any): EncodedData {
    let decoded: Uint8Array = Converter.toArrayBufferView(data);
    let asString: string = Encoder.fromByteArray(decoded);
    let asBytes = Converter.stringToArrayBufferViewUTF8(asString);
    let encoded: EncodedData = new EncodedData(asBytes, asString);
    return encoded;
  }

  private static fromByteArray(decoded: Uint8Array): string {
    let base64EncodedString: string = undefined;

    if (typeof window === "object") {
      base64EncodedString = window.btoa(String.fromCharCode.apply(null, decoded));
    } else {
      base64EncodedString = new Buffer(decoded).toString("base64");
    }

    return base64EncodedString;
  }
}

export interface IData {
  asBytes: Uint8Array;
  asString: string;
}
