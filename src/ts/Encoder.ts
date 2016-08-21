namespace bazinga64 {
  export class Encoder {
    public static toBase64(data: any): EncodedData {
      let decoded: Uint8Array = bazinga64.Converter.toArrayBufferView(data);
      let asString: string = bazinga64.Encoder.fromByteArray(decoded);
      let asBytes = bazinga64.Converter.stringToArrayBufferViewUTF8(asString);
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
}
