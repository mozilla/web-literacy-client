function WebLiteracyClient(options) {

var DEFAULT_LANG = 'en';

var self = this;
options = options || {};

self.lang = DEFAULT_LANG;
self.descriptionSuffix = options.descriptionSuffix | '_desc';

self.all = function() {
  var strings = self.langs[self.lang];
  return self.template.map(function(item) {
    return {
      term: strings[item.tag] || self.langs[DEFAULT_LANG][item.tag],
      tag: item.tag
    };
  });
};

};

// Set up languages
WebLiteracyClient.prototype.langs = {};
