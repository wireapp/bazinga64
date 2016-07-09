class UnexpectedInput extends Error {

  public static UNSUPPORTED_TYPE: string = "Please provide a 'String', 'Uint8Array' or 'Array'.";

  constructor(public message?: string) {
    super(message);
    this.name = "UnexpectedInput";
    this.stack = (<any> new Error()).stack;
  }

  public toString() {
    return `${this.name}: ${this.message}`;
  }

}

export default UnexpectedInput;
