test('Main functions exist', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc.all === 'function', 'Passed!');
  ok(typeof wlc.term === 'function', 'Passed!');
  ok(typeof wlc.description === 'function', 'Passed!');
});

test('Langs exist, default en lang exists', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc.langs === 'object');
  ok(typeof wlc.langs.en === 'object');
});

test('Template exists', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc.template === 'object');
});

test('Set options works', function() {
  var wlc = new WebLiteracyClient({
    descriptionSuffix: '-descy'
  });
  console.log(wlc);
  ok(wlc.options.descriptionSuffix === '-descy');
  // TODO: more options
});

test('Set lang works', function() {
  var wlc = new WebLiteracyClient();
  ok(wlc.strings);
  wlc.lang('en')
  ok(wlc.strings);
  // TODO: test when languages are not supported
});

test('supportedLangs works and contains en', function() {
  var wlc = new WebLiteracyClient();
  var langlist = wlc.supportedLangs();

  for (var i = 0; i < langlist.length; i++) {
    if (langlist[i] === 'en') {
      return ok(true);
    }
  }
  throws('en not found in supportedLangs');

});

test('Get term works', function() {
  var wlc = new WebLiteracyClient();
  var tag = wlc.all()[0].tag;
  var term = wlc.all()[0].term;

  ok(wlc.term(tag) === term);
});

test('Get description works', function() {
  var wlc = new WebLiteracyClient();
  var desc = wlc.template[0].description;
  var tag = wlc.template[0].tag;

  ok(wlc.description(tag) === desc);
});

