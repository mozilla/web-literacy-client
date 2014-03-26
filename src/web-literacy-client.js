function WebLiteracyClient(options) {

  var DEFAULT_LANG = 'en-US';

  var self = this;

  // Options
  self.options = options = options || {};
  self.options.descriptionSuffix = options.descriptionSuffix || '_desc';

  // Get supported languages
  self.supportedLangs = function() {
    var keys = [];
    for (var lang in self.langs) {
      keys.push(lang);
    }
    return keys;
  };

  // Version
  self.version = self.template.version;

  // Set language to English be default
  self.strings = self.langs[DEFAULT_LANG];

  // Allow users to set language
  self.lang = function(l) {
    if (l && self.supportedLangs().indexOf(l) <= -1 ) {
      return console.error('Sorry, ' + l + ' is not a supported language in this release.');
    }
    else if (l) {
      self.strings = self.langs[l];
    }
    return self.strings;
  };

  self.title = function() {
    return self.strings[self.template.titleKey] || self.langs[DEFAULT_LANG][self.template.titleKey];
  };

  self.term = function(tag) {
    return self.strings[tag] || self.langs[DEFAULT_LANG][tag];
  };

  self.description = function(tag) {
    return self.strings[tag + options.descriptionSuffix] || self.langs[DEFAULT_LANG][tag + options.descriptionSuffix];
  };

  self.color = function(tag) {
    var literacy = self.template.literacies.filter(function(item) {
      return item.tag === tag;
    })[0];
    if (literacy) {
      return literacy.color;
    }
  };
  // O Canada!
  self.colour = self.color;

  self.all = function() {
    return self.template.literacies.map(function(item) {
      return {
        term: self.term(item.tag),
        tag: item.tag,
        color: item.color,
        colour: item.color,
        description: self.description(item.tag)
      };
    });
  };

};

// Set up languages
WebLiteracyClient.prototype.langs = {};
