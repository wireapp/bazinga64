export class Converter {
  static arrayBufferToArrayBufferView(arrayBuffer: ArrayBuffer): Uint8Array;
  static arrayBufferToJSON(arrayBuffer: ArrayBuffer): JSON;
  static arrayBufferToJSONString(arrayBuffer: ArrayBuffer): string;
  static arrayBufferViewToString(arrayBufferView: Uint16Array): string;
  static arrayBufferViewToUnicodeString(arrayBufferView: Uint8Array): string;
  static jsonToArrayBufferView(json: JSON): Uint8Array;
  static numberArrayToArrayBufferView(array: number[]): Uint8Array;
  static stringToArrayBufferView(data: string): Uint16Array;
  static toArrayBufferView(data: any): Uint8Array;
  static toString(data: any): string;
  static unicodeStringToArrayBufferView(data: string): Uint8Array;
}

export class DecodedData {
  public asBytes: Uint8Array;
  public asString: string;
}

export class Decoder {
  static fromBase64(data: any): DecodedData;
}

export class EncodedData {
  public asBytes: Uint8Array;
  public asString: string;
}

export class Encoder {
  static toBase64(data: any): EncodedData;
}
