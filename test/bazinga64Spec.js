describe('Base64', function() {

  var helloString = 'Hello';
  var helloArray = [72, 101, 108, 108, 111];
  var helloBase64 = 'SGVsbG8=';

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
        var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(helloArray);
        expect(arrayBufferView).toEqual(new Uint8Array(helloArray));
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
        var data = new Uint8Array(helloArray);
        var view = bazinga64.Converter.toArrayBufferView(data);
        expect(view.constructor.name).toBe('Uint8Array');
        expect(view).toBe(data);
      });

    });

    describe('toString', function() {

      it('converts array buffer views into strings', function() {
        var data = new Uint8Array(helloArray);
        var text = bazinga64.Converter.toString(data);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(helloString);
      });

      it('does not convert strings', function() {
        var text = bazinga64.Converter.toString(helloString);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(helloString);
      });

    });

    describe('unicodeStringToArrayBufferView', function() {

      it('handles UTF-8 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.length).toBe(2);
      });

      it('converts between a string and an array buffer view', function() {
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(helloString);
        var decoded = bazinga64.Converter.arrayBufferViewToUnicodeString(encoded);

        expect(encoded.constructor.name).toBe('Uint8Array');
        expect(encoded).toEqual(new Uint8Array(helloArray));
        expect(decoded).toBe(helloString);
      });

    });

  });

  describe('Decoder', function() {

    describe('fromBase64', function() {

      it('decodes into a byte array', function() {
        var decoded = bazinga64.Decoder.fromBase64(helloBase64);
        var arrayBufferView = new Uint8Array(helloArray);
        expect(decoded.constructor.name).toBe('DecodedData');
        expect(decoded.asBytes).toEqual(arrayBufferView);
        expect(decoded.asString).toBe(helloString);
      });

      it('decodes into a string', function() {
        var encoded = 'SGVsbG8sIHdvcmxk';
        var decoded = bazinga64.Decoder.fromBase64(encoded);
        expect(decoded.constructor.name).toBe('DecodedData');
        expect(decoded.asString).toBe('Hello, world');
      });

    });

  });

  describe('Encoder', function() {

    describe('toBase64', function() {

      it('encodes from a byte array', function() {
        var arrayBufferView = new Uint8Array(helloArray);
        var encoded = bazinga64.Encoder.toBase64(arrayBufferView);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(helloBase64);
      });

      it('encodes from a string', function() {
        var encoded = bazinga64.Encoder.toBase64(helloString);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(helloBase64);
      });

      it('encodes texts', function() {
        var text = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
        var expected = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected)
      });

      it('encodes texts with umlauts', function() {
        var text = 'Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark';
        var expected = 'UG9seWZvbiB6d2l0c2NoZXJuZCBhw59lbiBNw6R4Y2hlbnMgVsO2Z2VsIFLDvGJlbiwgSm9naHVydCB1bmQgUXVhcms=';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

    });

  });

});
