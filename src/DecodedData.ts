class DecodedData implements IData {
  public asBytes: Uint8Array;
  public asString: string;

  constructor(asBytes: Uint8Array, asString: string) {
    this.asBytes = asBytes;
    this.asString = asString;
  }
}

export default DecodedData;
