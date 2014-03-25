var TESTLANG = 'fr';

test('new WebLiteracyClient() should create an object with .langs and should have .template on its prototype', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc === 'object');
  ok(typeof WebLiteracyClient.prototype.langs === 'object');
  ok(WebLiteracyClient.prototype.template.length);
});

test('The default "en" lang should exist', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc.langs.en === 'object');
});

test('Setting options in the constructor should work', function() {
  var wlc = new WebLiteracyClient({
    descriptionSuffix: '-descy'
  });
  ok(wlc.options.descriptionSuffix === '-descy');
  // TODO: more options
});

test('.lang(language) should set the language', function() {
  var wlc = new WebLiteracyClient();
  ok(wlc.strings);
  wlc.lang('en')
  ok(wlc.strings);
  // TODO: test when languages are not supported
});

test('.supportedLangs() should return an array containing "en"', function() {
  var wlc = new WebLiteracyClient();
  var langlist = wlc.supportedLangs();

  for (var i = 0; i < langlist.length; i++) {
    if (langlist[i] === 'en') {
      return ok(true);
    }
  }
  throws('en not found in supportedLangs');

});

test('.term works', function() {
  var wlc = new WebLiteracyClient();
  var tag = wlc.all()[0].tag;
  var term = wlc.all()[0].term;

  ok(wlc.term(tag) === term);
});

test('.description works', function() {
  var wlc = new WebLiteracyClient();
  var desc = wlc.template[0].description;
  var tag = wlc.template[0].tag;

  ok(wlc.description(tag) === desc);
});

test('.colo[u]r works', function() {
  var wlc = new WebLiteracyClient();
  var color = wlc.template[0].color;
  var tag = wlc.template[0].tag;

  ok(wlc.color(tag) === color);
  ok(wlc.colour(tag) === color);
});

test('.all works', function() {
  var wlc = new WebLiteracyClient();
  var testIndex = 2;

  wlc.lang(TESTLANG);
  var tag = wlc.template[testIndex].tag;
  var color = wlc.template[testIndex].color;
  var strings = wlc.langs[TESTLANG];
  var enStrings = wlc.langs.en;

  var allTest = wlc.all()[testIndex];

  ok(allTest.term === strings[tag]);
  ok(allTest.color === color);
  ok(allTest.colour === color);
  ok(allTest.description === strings[tag + wlc.options.descriptionSuffix]);

  // Patch in a fake language to test English fall-backs
  wlc.langs['girbberish'] = [];
  wlc.lang('girbberish');

  var fakeLangTest = wlc.all()[testIndex];
  ok(fakeLangTest.term === enStrings[tag]);
  ok(fakeLangTest.description === enStrings[tag + wlc.options.descriptionSuffix]);
});

