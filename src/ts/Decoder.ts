namespace bazinga64 {
  export class Decoder {
    public static fromBase64(data: any): DecodedData {
      let encoded: string = bazinga64.Converter.toString(data);
      let asBytes: Uint8Array = bazinga64.Decoder.toByteArray(encoded);
      let asString = bazinga64.Converter.arrayBufferViewToStringUTF8(asBytes);
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
}
