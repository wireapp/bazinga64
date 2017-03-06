describe('Compliance', function() {

  describe('decode Base64', function() {

    it('is compliant with libsodium on short sequences', function() {
      var encoded = 'SGVsbG8=';

      var decodedWithBazinga64 = bazinga64.Decoder.fromBase64(encoded).asBytes;
      var decodedWithSodium = sodium.from_base64(encoded);

      expect(decodedWithBazinga64).toEqual(decodedWithSodium);
    });

    it('is compliant with libsodium on long sequences', function() {
      var encoded = 'pQABARn//wKhAFgg5fwzzahXsFp99ChcRC0/0qIr4vLCujkcRSOkziiTz8gDoQChAFggaK10DY60iH38gbXc9GoOrv+SqQ0p3AEsR0WjHQLkV5kE9g==';

      var decodedWithBazinga64 = bazinga64.Decoder.fromBase64(encoded).asBytes;
      var decodedWithSodium = sodium.from_base64(encoded);

      expect(decodedWithBazinga64).toEqual(decodedWithSodium);
    });

  });

});
