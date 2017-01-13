describe('Decoder', function() {

  describe('fromBase64', function() {

    it('decodes arrays', function() {
      var decoded = bazinga64.Decoder.fromBase64(helloEncodedArray);
      var arrayBufferView = new Uint8Array(helloDecodedArray);
      expect(decoded.constructor.name).toBe('DecodedData');
      expect(decoded.asBytes).toEqual(arrayBufferView);
      expect(decoded.asString).toBe(helloDecodedString);
    });

    it('does not decode from an array with an invalid length', function() {
      expect(function() {
        bazinga64.Decoder.fromBase64(helloDecodedArray);
      }).toThrowError("Invalid string. Length must be a multiple of 4.");
    });

    it('decodes into a byte array', function() {
      var decoded = bazinga64.Decoder.fromBase64(helloEncodedString);
      var arrayBufferView = new Uint8Array(helloDecodedArray);
      expect(decoded.constructor.name).toBe('DecodedData');
      expect(decoded.asBytes).toEqual(arrayBufferView);
      expect(decoded.asString).toBe(helloDecodedString);
    });

    it('decodes into a string', function() {
      var encoded = 'SGVsbG8sIHdvcmxk';
      var decoded = bazinga64.Decoder.fromBase64(encoded);
      expect(decoded.constructor.name).toBe('DecodedData');
      expect(decoded.asString).toBe('Hello, world');
    });

    it('decodes numbers', function() {
      var decoded = bazinga64.Decoder.fromBase64(numberEncoded);
      expect(decoded.constructor.name).toBe('DecodedData');
      expect(decoded.asString).toBe('1337');
    });

    xit('handles inputs with non-printable characters', function() {

    });

  });

});
