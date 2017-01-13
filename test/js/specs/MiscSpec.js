describe('Misc', function() {

  describe('Test Vectors from RFC 4648', function() {

    it('handles empty strings', function() {
      var text = '';
      var expected = '';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('handles "f"', function() {
      var text = 'f';
      var expected = 'Zg==';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('handles "fo"', function() {
      var text = 'fo';
      var expected = 'Zm8=';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('handles "foo"', function() {
      var text = 'foo';
      var expected = 'Zm9v';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('foob', function() {
      var text = 'foob';
      var expected = 'Zm9vYg==';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('handles "fooba"', function() {
      var text = 'fooba';
      var expected = 'Zm9vYmE=';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

    it('handles "foobar"', function() {
      var text = 'foobar';
      var expected = 'Zm9vYmFy';
      var encoded = bazinga64.Encoder.toBase64(text).asString;
      var decoded = bazinga64.Decoder.fromBase64(encoded).asString;
      expect(encoded).toBe(expected);
      expect(decoded).toBe(text);
    });

  });

  describe('Special cases', function() {

    it('handles malformed URIs', function() {
      var serialised = 'owABAaEAWEAfHNWiDY1dv3AmX8F3SVnrKy1T8rO07mMswqDDy4FYzzS7Nw9JWSxFA1Ithb/mJubaZBvhBJgLAIV0amINi5OAAqEAoQBYIDS7Nw9JWSxFA1Ithb/mJubaZBvhBJgLAIV0amINi5OA';
      var decoded = bazinga64.Decoder.fromBase64(serialised);
      expect(decoded.asBytes).toBeDefined();
      expect(decoded.asString).toBeDefined();
    });

  });

});
