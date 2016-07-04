describe('Base64', function () {

  describe('Encoding', function () {

    it('can encode a byte array', function () {
      var array = [1, 2, 3, 4, 5, 6, 7, 8];
      var arrayBuffer = new ArrayBuffer(array.length);
      var arrayBufferView = new Uint8Array(arrayBuffer);

      for (var i = 0; i < arrayBufferView.length; i++) {
        arrayBufferView[i] = array[i];
      }

      var encoded = bazinga64.fromByteArray(arrayBufferView);
      expect(encoded).toBe('AQIDBAUGBwg=');
    });

  });

  describe('Decoding', function () {

  });
});
