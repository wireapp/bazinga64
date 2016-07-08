describe('Base64', function() {

  var helloDecodedArray = [72, 101, 108, 108, 111];
  var helloDecodedString = 'Hello';

  var helloEncodedArray = [83, 71, 86, 115, 98, 71, 56, 61];
  var helloEncodedString = 'SGVsbG8=';

  var numberDecoded = 1337;
  var numberEncoded = 'MTMzNw==';
  var numberString = '1337';

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

        expect(encoded.constructor.name).toBe('Uint8Array');
        expect(encoded.length).toBe(2);

        expect(decoded.constructor.name).toBe('String');
        expect(decoded).toBe(cyrillicCapitalLetterDje);
      });

      it('converts an array buffer view into an unicode string', function() {
        var view = new Uint8Array(helloDecodedArray);
        var utf8 = bazinga64.Converter.arrayBufferViewToUnicodeString(view);
        expect(utf8.constructor.name).toBe('String');
        expect(utf8).toBe('Hello');
      });

    });

    describe('numberArrayToArrayBufferView', function() {

      it('converts an array of numbers into an array buffer view', function() {
        var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(helloDecodedArray);
        expect(arrayBufferView).toEqual(new Uint8Array(helloDecodedArray));
      });

    });

    describe('stringToArrayBufferView', function() {

      it('handles UTF-16 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.stringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.constructor.name).toBe('Uint16Array');
        expect(encoded.length).toBe(1);
      });

      it('converts a string into an array buffer view', function() {
        var data = helloEncodedString;
        var view = bazinga64.Converter.stringToArrayBufferView(data);
        var expectedView = new Uint16Array(helloEncodedArray);
        expect(view.constructor.name).toBe('Uint16Array');
        expect(view).toEqual(expectedView);
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

      it('handles arrays', function() {
        var data = new Uint8Array(helloDecodedArray);
        var view = bazinga64.Converter.toArrayBufferView(helloDecodedArray);
        expect(view.constructor.name).toBe('Uint8Array');
        expect(view).toEqual(data);
      });

      it('handles array buffer views', function() {
        var data = new Uint8Array(helloDecodedArray);
        var view = bazinga64.Converter.toArrayBufferView(data);
        expect(view.constructor.name).toBe('Uint8Array');
        expect(view).toBe(data);
      });

      it('handles strings', function() {
        var data = 'Thomas M\u00FCller';
        var view = bazinga64.Converter.toArrayBufferView(data);
        expect(view.constructor.name).toBe('Uint8Array');
      });

      it('does not handle numbers', function() {
        expect(function() {
          bazinga64.Converter.toArrayBufferView(numberDecoded);
        }).toThrowError("Please provide a 'String', 'Uint8Array' or 'Array'.");
      });

      it('throws an error on unexpected inputs', function() {
        expect(function() {
          bazinga64.Converter.toArrayBufferView(new Error());
        }).toThrowError("Please provide a 'String', 'Uint8Array' or 'Array'.");
      });

    });

    describe('toString', function() {

      it('handles arrays', function() {
        var data = helloDecodedArray;
        var text = bazinga64.Converter.toString(data);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(helloDecodedString);
      });

      it('handles array buffer views', function() {
        var data = new Uint8Array(helloDecodedArray);
        var text = bazinga64.Converter.toString(data);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(helloDecodedString);
      });

      it('handles numbers', function() {
        var text = bazinga64.Converter.toString(numberDecoded);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(numberString);
      });

      it('handles strings', function() {
        var text = bazinga64.Converter.toString(helloDecodedString);
        expect(text.constructor.name).toBe('String');
        expect(text).toBe(helloDecodedString);
      });

      it('throws an error on unexpected inputs', function() {
        expect(function() {
          bazinga64.Converter.toString(new Error());
        }).toThrowError("Please provide a 'String', 'Uint8Array' or 'Array'.");
      });

    });

    describe('unicodeStringToArrayBufferView', function() {

      it('handles UTF-8 conversions', function() {
        var cyrillicCapitalLetterDje = '\u0402';
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(cyrillicCapitalLetterDje);
        expect(encoded.length).toBe(2);
      });

      it('converts between a string and an array buffer view', function() {
        var encoded = bazinga64.Converter.unicodeStringToArrayBufferView(helloDecodedString);
        var decoded = bazinga64.Converter.arrayBufferViewToUnicodeString(encoded);

        expect(encoded.constructor.name).toBe('Uint8Array');
        expect(encoded).toEqual(new Uint8Array(helloDecodedArray));
        expect(decoded).toBe(helloDecodedString);
      });

    });

  });

  describe('Decoder', function() {

    describe('fromBase64', function() {

      it('decodes from an array', function() {
        var decoded = bazinga64.Decoder.fromBase64(helloEncodedArray);
        var arrayBufferView = new Uint8Array(helloDecodedArray);
        expect(decoded.constructor.name).toBe('DecodedData');
        expect(decoded.asBytes).toEqual(arrayBufferView);
        expect(decoded.asString).toBe(helloDecodedString);
      });

      it('does not decode from an array with an invalid length', function() {
        expect(function() {
          bazinga64.Decoder.fromBase64(helloDecodedArray);
        }).toThrowError("Invalid string. Length must be a multiple of 4");
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

      it('decodes encoded numbers', function() {
        var decoded = bazinga64.Decoder.fromBase64(numberEncoded);
        expect(decoded.constructor.name).toBe('DecodedData');
        expect(decoded.asString).toBe('1337');
      });

    });

  });

  describe('Encoder', function() {

    describe('toBase64', function() {

      // TODO: Implement this functionality
      xit('encodes numbers', function() {
        var encoded = bazinga64.Encoder.toBase64(numberDecoded);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(numberEncoded);
      });

      it('does not encode numbers', function() {
        expect(function() {
          bazinga64.Encoder.toBase64(numberDecoded);
        }).toThrowError("Please provide a 'String', 'Uint8Array' or 'Array'.");
      });

      it('encodes arrays', function() {
        var encoded = bazinga64.Encoder.toBase64(helloDecodedArray);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(helloEncodedString);
      });

      it('encodes byte arrays', function() {
        var data = new Uint8Array(helloDecodedArray);
        var encoded = bazinga64.Encoder.toBase64(data);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(helloEncodedString);
      });

      it('encodes strings', function() {
        var encoded = bazinga64.Encoder.toBase64(helloDecodedString);
        expect(encoded.constructor.name).toBe('EncodedData');
        expect(encoded.asString).toBe(helloEncodedString);
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

      it('encodes texts with unicode symbols', function() {
        var text = 'foo ♥ bar';
        var expected = 'Zm9vIOKZpSBiYXI=';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

    });

    describe('Custom Test Values', function() {

      it('empty string', function() {
        var text = '';
        var expected = '';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('f', function() {
        var text = 'f';
        var expected = 'Zg==';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('fo', function() {
        var text = 'fo';
        var expected = 'Zm8=';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('foo', function() {
        var text = 'foo';
        var expected = 'Zm9v';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('foob', function() {
        var text = 'foob';
        var expected = 'Zm9vYg==';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('fooba', function() {
        var text = 'fooba';
        var expected = 'Zm9vYmE=';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

      it('foobar', function() {
        var text = 'foobar';
        var expected = 'Zm9vYmFy';
        var actual = bazinga64.Encoder.toBase64(text).asString;
        expect(actual).toBe(expected);
      });

    });

  });

});
