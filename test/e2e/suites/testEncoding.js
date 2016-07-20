module.exports = {
  'Input value': function(browser) {
    browser
      .url(browser.launch_url)
      .setValue("//*[@data-test-name='input-decoded']", browser.globals.decoded);
  },
  'Encode value': function(browser) {
    browser
      .click("//*[@data-test-name='button-encode']");
  },
  'Validate encoded value': function(browser) {
    browser.assert.value("//*[@data-test-name='input-encoded']", browser.globals.encoded);
  }
};
