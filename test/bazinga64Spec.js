describe('Base64', function() {

  describe('Converter', function() {

    describe('arrayBufferViewToString', function() {

      it('handles UTF-16 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.stringToArrayBufferView(cyrillicCapitalLetterDje);
        var decoded = bazinga64.Converter.arrayBufferViewToString(encoded);
        expect(encoded.length).toBe(1);
        expect(decoded).toBe(cyrillicCapitalLetterDje);
      });

    });

    describe('arrayBufferViewToUnicodeString', function() {

      it('handles UTF-8 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(cyrillicCapitalLetterDje);
        var decoded = bazinga64.Converter.arrayBufferViewToUnicodeString(encoded);
        expect(encoded.length).toBe(2);
        expect(decoded).toBe(cyrillicCapitalLetterDje);
      });

    });

    describe('numberArrayToArrayBufferView', function() {

      it('converts an array of numbers into an array buffer view', function() {
        var array = [72, 101, 108, 108, 111];
        var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(array);
        expect(arrayBufferView).toEqual(new Uint8Array(array));
      });

    });

    describe('stringToArrayBufferView', function() {

      it('handles UTF-16 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.stringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.length).toBe(1);
      });

    });

    describe('stringToArrayBufferView', function() {

      it('handles UTF-16 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.stringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.length).toBe(1);
      });

    });

    describe('toArrayBufferView', function() {

      it('converts strings to array buffer views', function() {
        var data = 'Thomas M\u00FCller';
        var view = bazinga64.Converter.toArrayBufferView(data);
        expect(view.constructor.name).toBe('Uint8Array');
      });

      it('does not convert array buffer views', function() {
        var data = new Uint8Array([72, 101, 108, 108, 111]);
        var view = bazinga64.Converter.toArrayBufferView(data);
        expect(view.constructor.name).toBe('Uint8Array');
        expect(view).toBe(data);
      });

    });

    describe('toString', function() {

      it('converts array buffer views into strings', function() {
        var data = new Uint8Array([72, 101, 108, 108, 111]);
        var text = bazinga64.Converter.toString(data);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe('Hello');
      });

      it('does not convert strings', function() {
        var data = 'Hello';
        var text = bazinga64.Converter.toString(data);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe('Hello');
      });

    });

    describe('unicodeStringToArrayBufferView', function() {

      it('handles UTF-8 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.length).toBe(2);
      });

      it('converts between a string and an array buffer view', function() {
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

  describe('Decoder', function() {

    describe('fromBase64', function() {

      it('decodes into a byte array', function() {
        var encoded = 'SGVsbG8=';
        var decoded = bazinga64.Decoder.fromBase64(encoded);
        var arrayBufferView = new Uint8Array([72, 101, 108, 108, 111]);
        expect(decoded.asBytes).toEqual(arrayBufferView);
        expect(decoded.asString).toBe('Hello');
      });

      it('decodes into a string', function() {
        var encoded = 'SGVsbG8sIHdvcmxk';
        var decoded = bazinga64.Decoder.fromBase64(encoded);
        expect(decoded.asString).toBe('Hello, world');
      });

    });

  });

  describe('Encoder', function() {

    var helloString = 'Hello';
    var helloArray = [72, 101, 108, 108, 111];
    var helloBase64 = 'SGVsbG8=';

    describe('toBase64', function() {

      it('encodes from a byte array', function() {
        var arrayBufferView = new Uint8Array(helloArray);
        var encoded = bazinga64.Encoder.toBase64(arrayBufferView);
        expect(encoded.asString).toBe(helloBase64);
      });

      it('encodes from a string', function() {
        var encoded = bazinga64.Encoder.toBase64(helloString);
        expect(encoded.asString).toBe(helloBase64);
      });

    });

  });

});
