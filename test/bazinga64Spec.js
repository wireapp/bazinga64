describe('Base64', function() {

  describe('Converter', function() {
    describe('numberArrayToArrayBufferView', function() {
      it('converts an array of numbers into an Array Buffer View', function() {
        var array = [72, 101, 108, 108, 111];
        var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(array);
        expect(arrayBufferView).toEqual(new Uint8Array(array));
      });
    });

    describe('Unicode', function() {
      it('handles UTF-8 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(cyrillicCapitalLetterDje);
        var decoded = bazinga64.Converter.arrayBufferViewToUnicodeString(encoded);
        expect(encoded.length).toBe(2);
        expect(decoded).toBe(cyrillicCapitalLetterDje);
      });

      it('handles UTF-16 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.stringToArrayBufferView(cyrillicCapitalLetterDje);
        var decoded = bazinga64.Converter.arrayBufferViewToString(encoded);
        expect(encoded.length).toBe(1);
        expect(decoded).toBe(cyrillicCapitalLetterDje);
      });
    });

    describe('String <> Array Buffer View', function() {
      it('converts between a String and an Array Buffer View', function() {
        var hello = 'Hello';
        var asciiHello = [72, 101, 108, 108, 111];

        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(hello);
        var decoded = bazinga64.Converter.arrayBufferViewToUnicodeString(encoded);

        expect(encoded.constructor.name).toBe('Uint8Array');
        expect(encoded).toEqual(new Uint8Array(asciiHello));
        expect(decoded).toBe(hello);
      });
    });
  });

  describe('Encoding', function() {
    it('encodes from a byte array', function() {
      var arrayBufferView = new Uint8Array([72, 101, 108, 108, 111]);
      var encoded = bazinga64.Encoder.toBase64(arrayBufferView);
      expect(encoded.asString).toBe('SGVsbG8=');
    });

    it('encodes from a string', function() {
      var string = 'Hello';
      var encoded = bazinga64.Encoder.toBase64(string);
      expect(encoded.asString).toBe('SGVsbG8=');
    });

  });

  describe('Decoding', function() {

    it('decodes into a byte array', function() {
      var encoded = 'SGVsbG8=';
      var decoded = bazinga64.Decoder.fromBase64(encoded);
      var arrayBufferView = new Uint8Array([72, 101, 108, 108, 111]);
      expect(decoded.asBytes).toEqual(arrayBufferView);
    });

    it('decodes into a string', function() {
      var encoded = 'SGVsbG8sIHdvcmxk';
      var decoded = bazinga64.Decoder.fromBase64(encoded);
      expect(decoded.asString).toBe('Hello, world');
    });

  });
});
