describe('Converter', function() {

  describe('arrayBufferViewToStringUTF8', function() {

    it('handles UTF-8 conversions', function() {
      var cyrillicCapitalLetterDje = '\u0402';
      var encoded = bazinga64.Converter.stringToArrayBufferViewUTF8(cyrillicCapitalLetterDje);
      var decoded = bazinga64.Converter.arrayBufferViewToStringUTF8(encoded);

      expect(encoded.constructor.name).toBe('Uint8Array');
      expect(encoded.length).toBe(2);

      expect(decoded.constructor.name).toBe('String');
      expect(decoded).toBe(cyrillicCapitalLetterDje);
    });

    it('converts an array buffer view into an unicode string', function() {
      var view = new Uint8Array(helloDecodedArray);
      var utf8 = bazinga64.Converter.arrayBufferViewToStringUTF8(view);
      expect(utf8.constructor.name).toBe('String');
      expect(utf8).toBe('Hello');
    });

  });

  describe('jsonToArrayBufferView', function() {

    it('maps a JSON object to an array buffer', function() {
      // @formatter:off
      var json = {"0":163,"1":0,"2":1,"3":1,"4":25,"5":255,"6":255,"7":2,"8":162,"9":0,"10":161,"11":0,"12":88,"13":64,"14":196,"15":95,"16":69,"17":14,"18":12,"19":131,"20":100,"21":96,"22":49,"23":219,"24":187,"25":190,"26":173,"27":191,"28":94,"29":227,"30":97,"31":5,"32":253,"33":72,"34":27,"35":111,"36":114,"37":86,"38":4,"39":67,"40":190,"41":250,"42":229,"43":205,"44":186,"45":93,"46":223,"47":96,"48":247,"49":64,"50":65,"51":101,"52":58,"53":43,"54":111,"55":234,"56":7,"57":182,"58":10,"59":143,"60":80,"61":157,"62":143,"63":12,"64":165,"65":155,"66":253,"67":117,"68":220,"69":65,"70":176,"71":226,"72":80,"73":71,"74":167,"75":69,"76":101,"77":37,"78":1,"79":161,"80":0,"81":88,"82":32,"83":223,"84":96,"85":247,"86":64,"87":65,"88":101,"89":58,"90":43,"91":111,"92":234,"93":7,"94":182,"95":10,"96":143,"97":80,"98":157,"99":143,"100":12,"101":165,"102":155,"103":253,"104":117,"105":220,"106":65,"107":176,"108":226,"109":80,"110":71,"111":167,"112":69,"113":101,"114":37};
      // @formatter:on
      var arrayBufferView = bazinga64.Converter.jsonToArrayBufferView(json);
      var expectedLength = Object.keys(json).length;
      expect(arrayBufferView.length).toBe(expectedLength);
      expect(arrayBufferView[0]).toBe(163);
      expect(arrayBufferView[expectedLength - 1]).toBe(37);
    });

  });

  describe('numberArrayToArrayBufferView', function() {

    it('converts an array of numbers into an array buffer view', function() {
      var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(helloDecodedArray);
      expect(arrayBufferView).toEqual(new Uint8Array(helloDecodedArray));
    });

    if (typeof global === 'object') {
      it('works with plain Buffers', function() {
        var decoded = Buffer.from(helloEncodedString, 'base64');
        var arrayBufferView = bazinga64.Converter.numberArrayToArrayBufferView(decoded);
        expect(arrayBufferView).toEqual(new Uint8Array(helloDecodedArray));
      });
    }

  });

  describe('stringToArrayBufferViewUTF16', function() {

    it('handles UTF-16 conversions', function() {
      var cyrillicCapitalLetterDje = '\u0402';
      var encoded = bazinga64.Converter.stringToArrayBufferViewUTF16(cyrillicCapitalLetterDje);
      expect(encoded.constructor.name).toBe('Uint16Array');
      expect(encoded.length).toBe(1);
    });

    it('converts a string into an array buffer view', function() {
      var data = helloEncodedString;
      var view = bazinga64.Converter.stringToArrayBufferViewUTF16(data);
      var expectedView = new Uint16Array(helloEncodedArray);
      expect(view.constructor.name).toBe('Uint16Array');
      expect(view).toEqual(expectedView);
    });

  });

  describe('stringToArrayBufferViewUTF16', function() {

    it('handles UTF-16 conversions', function() {
      var cyrillicCapitalLetterDje = '\u0402';
      var encoded = bazinga64.Converter.stringToArrayBufferViewUTF16(cyrillicCapitalLetterDje);
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

    it('handles numbers', function() {
      var data = numberDecoded;
      var view = bazinga64.Converter.toArrayBufferView(data);
      expect(view.constructor.name).toBe('Uint8Array');
    });

    it('throws an error on unexpected inputs', function() {
      expect(function() {
        bazinga64.Converter.toArrayBufferView(new Error());
      }).toThrowError("Error is unsupported. Please provide a 'String', 'Uint8Array' or 'Array'.");
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
      }).toThrowError("Error is unsupported. Please provide a 'String', 'Uint8Array' or 'Array'.");
    });

  });

  describe('stringToArrayBufferViewUTF8', function() {

    it('handles UTF-8 conversions', function() {
      var cyrillicCapitalLetterDje = '\u0402';
      var encoded = bazinga64.Converter.stringToArrayBufferViewUTF8(cyrillicCapitalLetterDje);
      expect(encoded.length).toBe(2);
    });

    it('converts between a string and an array buffer view', function() {
      var encoded = bazinga64.Converter.stringToArrayBufferViewUTF8(helloDecodedString);
      var decoded = bazinga64.Converter.arrayBufferViewToStringUTF8(encoded);

      expect(encoded.constructor.name).toBe('Uint8Array');
      expect(encoded).toEqual(new Uint8Array(helloDecodedArray));
      expect(decoded).toBe(helloDecodedString);
    });

  });

});
