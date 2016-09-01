/// <reference path="../../typings/index.d.ts" />
export declare class Converter {
  static arrayBufferToArrayBufferView(arrayBuffer: ArrayBuffer): Uint8Array;
  static arrayBufferToJSON(arrayBuffer: ArrayBuffer): JSON;
  static arrayBufferToJSONString(arrayBuffer: ArrayBuffer): string;
  static arrayBufferViewToStringUTF16(arrayBufferView: Uint16Array): string;
  static arrayBufferViewToStringUTF8(arrayBufferView: Uint8Array): string;
  static jsonToArrayBufferView(json: JSON): Uint8Array;
  static numberArrayToArrayBufferView(array: number[]): Uint8Array;
  static stringToArrayBufferViewUTF16(data: string): Uint16Array;
  static toArrayBufferView(data: any): Uint8Array;
  static toString(data: any): string;
  static stringToArrayBufferViewUTF8(data: string): Uint8Array;
}

export declare class DecodedData implements IData {
  asBytes: Uint8Array;
  asString: string;
  constructor(asBytes: Uint8Array, asString: string);
}

export declare class Decoder {
  static fromBase64(data: any): DecodedData;
  private static toByteArray(encoded);
}

export declare class EncodedData implements IData {
  asBytes: Uint8Array;
  asString: string;
  constructor(asBytes: Uint8Array, asString: string);
}

export declare class Encoder {
  static toBase64(data: any): EncodedData;
  private static fromByteArray(decoded);
}

export interface IData {
  asBytes: Uint8Array;
  asString: string;
}
