import {Converter} from "./Converter";
import {EncodedData} from "./EncodedData";

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
