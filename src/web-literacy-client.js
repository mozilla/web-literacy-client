function WebLiteracyClient(options) {

  var DEFAULT_LANG = 'en';

  var self = this;

  // Options
  self.options = options = options || {};
  options.descriptionSuffix = options.descriptionSuffix || '_desc';

  // Set language to English be default
  self.strings = self.langs.en;

  // Allow users to set language
  self.lang = function(l) {
    if (l) {
      self.strings = self.langs[l];
    }
    return self.strings;
  };

  self.term = function(tag) {
    return self.strings[tag] || self.langs[DEFAULT_LANG][tag];
  };

  self.description = function(tag) {
    return self.strings[tag + options.descriptionSuffix];
  };

  self.all = function() {
    return self.template.map(function(item) {
      return {
        term: self.strings[item.tag] || self.langs[DEFAULT_LANG][item.tag],
        tag: item.tag
      };
    });
  };

};

// Set up languages
WebLiteracyClient.prototype.langs = {};
