class UnexpectedInput extends Error {

  public static UNSUPPORTED_TYPE: string = "Please provide a 'String', 'Uint8Array' or 'Array'.";

  constructor(public message: string) {
    super(message);
  }

}

export default UnexpectedInput;
