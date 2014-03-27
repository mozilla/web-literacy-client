var TESTLANG = 'fr';
var DEFAULT_LANG = 'en-US';

test('new WebLiteracyClient() should create an object with .langs and should have .template on its prototype', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc === 'object');
  ok(typeof WebLiteracyClient.prototype.langs === 'object');
  ok(WebLiteracyClient.prototype.template.literacies.length);
});

test('The default lang should exist', function() {
  var wlc = new WebLiteracyClient();
  ok(typeof wlc.langs[DEFAULT_LANG] === 'object');
});

test('.lang(language) should set the language', function() {
  var wlc = new WebLiteracyClient();
  ok(wlc.strings);
  wlc.lang(DEFAULT_LANG)
  ok(wlc.strings);
  // TODO: test when languages are not supported
});

test('.supportedLangs() should return an array containing ' + DEFAULT_LANG, function() {
  var wlc = new WebLiteracyClient();
  var langlist = wlc.supportedLangs();

  for (var i = 0; i < langlist.length; i++) {
    if (langlist[i] === DEFAULT_LANG) {
      return ok(true);
    }
  }
  throws(DEFAULT_LANG + ' not found in supportedLangs');

});


test('.version exists', function() {
  var wlc = new WebLiteracyClient();
  equal(wlc.template.version, wlc.version);
});

test('.title works', function() {
  var wlc = new WebLiteracyClient();
  var title = wlc.template.title;
  var term = wlc.all()[0].term;

  equal(wlc.template.title, wlc.title());

  // Test french
  wlc.lang(TESTLANG);
  equal(wlc.strings[wlc.template.titleKey], wlc.title());
});

test('.strands(), .strand(), .allByStrand() work', function() {
  var wlc = new WebLiteracyClient();
  deepEqual(wlc.template.strands, wlc.strands(), '.strands() returns localized array of strands');
  deepEqual(wlc.template.strands, Object.keys(wlc.allByStrand()), '.allByStrands() returns an object keyed on strand');
});

test('.term works', function() {
  var wlc = new WebLiteracyClient();
  var tag = wlc.all()[0].tag;
  var term = wlc.all()[0].term;

  equal(term, wlc.term(tag));
});

test('.description works', function() {
  var wlc = new WebLiteracyClient();
  var desc = wlc.template.literacies[0].description;
  var tag = wlc.template.literacies[0].tag;

  equal(desc, wlc.description(tag));
});

test('.colo[u]r works', function() {
  var wlc = new WebLiteracyClient();
  var color = wlc.template.literacies[0].color;
  var tag = wlc.template.literacies[0].tag;

  equal(color, wlc.color(tag));
  equal(color, wlc.colour(tag));
});

test('.all works', function() {
  var wlc = new WebLiteracyClient();
  var testIndex = 2;

  wlc.lang(TESTLANG);
  var tag = wlc.template.literacies[testIndex].tag;
  var color = wlc.template.literacies[testIndex].color;
  var strand = wlc.template.literacies[testIndex].strand;
  var strings = wlc.langs[TESTLANG];
  var enStrings = wlc.langs[DEFAULT_LANG];

  var allTest = wlc.all()[testIndex];

  equal(strings[tag], allTest.term);
  equal(color, allTest.color);
  equal(color, allTest.colour);
  equal(strings[tag + wlc.template.descriptionSuffix], allTest.description);
  // Needs to be included in transifex
  // ok(allTest.strand, strings[strand + wlc.template.strandSuffix]);

  // Patch in a fake language to test English fall-backs
  wlc.langs['girbberish'] = [];
  wlc.lang('girbberish');

  var fakeLangTest = wlc.all()[testIndex];
  equal(enStrings[tag], fakeLangTest.term);
  equal(enStrings[tag + wlc.template.descriptionSuffix], fakeLangTest.description);
  equal(enStrings[strand + wlc.template.strandSuffix], fakeLangTest.strand);
});

