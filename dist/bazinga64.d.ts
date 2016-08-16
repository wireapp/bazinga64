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
