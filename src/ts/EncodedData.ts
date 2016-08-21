namespace bazinga64 {
  export class EncodedData implements IData {
    public asBytes: Uint8Array;
    public asString: string;

    constructor(asBytes: Uint8Array, asString: string) {
      this.asBytes = asBytes;
      this.asString = asString;
    }
  }
}
