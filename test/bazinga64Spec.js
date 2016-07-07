describe('Base64', function() {

  function buildArrayBuffer(array) {
    var arrayBuffer = new ArrayBuffer(array.length);
    var arrayBufferView = new Uint8Array(arrayBuffer);

    for (var i = 0; i < arrayBufferView.length; i++) {
      arrayBufferView[i] = array[i];
    }

    return arrayBufferView;
  }

  describe('Encoding', function() {

    it('encodes from a byte array', function() {
      var arrayBufferView = buildArrayBuffer([1, 2, 3, 4, 5, 6, 7, 8]);
      var encoded = bazinga64.fromByteArray(arrayBufferView);
      expect(encoded).toBe('AQIDBAUGBwg=');
    });

  });

  describe('Decoding', function() {

    it('decodes into a byte array', function() {
      var encoded = 'AQIDBAUGBwg=';
      var decoded = bazinga64.toByteArray(encoded);
      var arrayBufferView = buildArrayBuffer([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(decoded).toEqual(arrayBufferView);
    });

    it('decodes into a string', function() {
      var encoded = 'SGVsbG8sIHdvcmxk';
      var decoded = bazinga64.toByteArray(encoded);
      var decodedString = String.fromCharCode.apply(null, new Uint16Array(decoded));
      expect(decodedString).toEqual('Hello, world');
    });

  });
});
