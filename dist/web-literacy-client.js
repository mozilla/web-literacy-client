// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.WebLiteracyClient = factory();
  }
}(this, function() {
function WebLiteracyClient(options) {

  var DEFAULT_LANG = 'en';

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

  // Set language to English be default
  self.strings = self.langs.en;

  // Allow users to set language
  self.lang = function(l) {
    if (l && self.supportedLangs().indexOf(l) <= -1 ) {
      return console.error('Sorry, ' + l + 'is not a supported language in this release.');
    }
    else if (l) {
      self.strings = self.langs[l];
    }
    return self.strings;
  };

  self.term = function(tag) {
    return self.strings[tag] || self.langs[DEFAULT_LANG][tag];
  };

  self.description = function(tag) {
    return self.strings[tag + options.descriptionSuffix] || self.langs[DEFAULT_LANG][tag + options.descriptionSuffix];
  };

  self.color = function(tag) {
    var literacy = self.template.filter(function(item) {
      return item.tag === tag;
    })[0];
    if (literacy) {
      return literacy.color;
    }
  };
  // O Canada!
  self.colour = self.color;

  self.all = function() {
    return self.template.map(function(item) {
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

WebLiteracyClient.prototype.template = [
  {
    "term": "Navigation",
    "description": "Using software tools to browse the web",
    "tag": "weblit-Navigation",
    "deprecates": [],
    "color": "#ff4e1f"
  },
  {
    "term": "Web Mechanics",
    "description": "Understanding the web ecosystem",
    "tag": "weblit-WebMechanics",
    "deprecates": [],
    "color": "#ff6969"
  },
  {
    "term": "Search",
    "description": "Locating information, people and resources via the web",
    "tag": "weblit-Search",
    "deprecates": [],
    "color": "#fe4040"
  },
  {
    "term": "Credibility",
    "description": "Critically evaluating information found on the web",
    "tag": "weblit-Credibility",
    "deprecates": [],
    "color": "#ff5984"
  },
  {
    "term": "Security",
    "description": "Keeping systems, identities, and content safe",
    "tag": "weblit-Security",
    "deprecates": [],
    "color": "#ff004e"
  },
  {
    "term": "Composing for the web",
    "description": "Creating and curating content for the web",
    "tag": "weblit-Composing",
    "deprecates": [],
    "color": "#01bc85"
  },
  {
    "term": "Remixing",
    "description": "Modifying existing web resources to create something new",
    "tag": "weblit-Remix",
    "deprecates": [],
    "color": "#00ceb8"
  },
  {
    "term": "Design and Accessibility",
    "description": "Creating universally effective communications through web resources",
    "tag": "weblit-DesignAccessibility",
    "deprecates": [],
    "color": "#6ecba9"
  },
  {
    "term": "Coding/scripting",
    "description": "Creating interactive experiences on the web",
    "tag": "weblit-CodingScripting",
    "deprecates": [],
    "color": "#00967f"
  },
  {
    "term": "Infrastructure",
    "description": "Understanding the Internet stack",
    "tag": "weblit-Infrastructure",
    "deprecates": [],
    "color": "#09b773"
  },
  {
    "term": "Sharing",
    "description": "Creating web resources with others",
    "tag": "weblit-Sharing",
    "deprecates": [
      "weblit-SharingCollaborating"
    ],
    "color": "#739ab1"
  },
  {
    "term": "Collaborating",
    "description": "Providing access to web resources",
    "tag": "weblit-Collaborating",
    "deprecates": [],
    "color": "#506b7b"
  },
  {
    "term": "Community Participation",
    "description": "Getting involved in web communities and understanding their practices",
    "tag": "weblit-Community",
    "deprecates": [],
    "color": "#63cfea"
  },
  {
    "term": "Privacy",
    "description": "Examining the consequences of sharing data online",
    "tag": "weblit-Privacy",
    "deprecates": [],
    "color": "#00bad6"
  },
  {
    "term": "Open Practices",
    "description": "Helping to keep the web democratic and universally accessible",
    "tag": "weblit-OpenPractices",
    "deprecates": [],
    "color": "#0097d6"
  }
];
WebLiteracyClient.prototype.langs["en"] = {
  "WBLIT-MAP": "Web Literacy Map",
  "WBLIT-VERSION": "1.1.0",
  "weblit-Navigation": "Navigation",
  "weblit-Navigation_desc": "Using software tools to browse the web",
  "weblit-WebMechanics": "Web Mechanics",
  "weblit-WebMechanics_desc": "Understanding the web ecosystem",
  "weblit-Search": "Search",
  "weblit-Search_desc": "Locating information, people and resources via the web",
  "weblit-Credibility": "Credibility",
  "weblit-Credibility_desc": "Critically evaluating information found on the web",
  "weblit-Security": "Security",
  "weblit-Security_desc": "Keeping systems, identities, and content safe",
  "weblit-Composing": "Composing for the web",
  "weblit-Composing_desc": "Creating and curating content for the web",
  "weblit-Remix": "Remixing",
  "weblit-Remix_desc": "Modifying existing web resources to create something new",
  "weblit-DesignAccessibility": "Design and Accessibility",
  "weblit-DesignAccessibility_desc": "Creating universally effective communications through web resources",
  "weblit-CodingScripting": "Coding/scripting",
  "weblit-CodingScripting_desc": "Creating interactive experiences on the web",
  "weblit-Infrastructure": "Infrastructure",
  "weblit-Infrastructure_desc": "Understanding the Internet stack",
  "weblit-Sharing": "Sharing",
  "weblit-Sharing_desc": "Creating web resources with others",
  "weblit-SharingCollaborating": "Sharing",
  "weblit-SharingCollaborating_desc": "Creating web resources with others",
  "weblit-Collaborating": "Collaborating",
  "weblit-Collaborating_desc": "Providing access to web resources",
  "weblit-Community": "Community Participation",
  "weblit-Community_desc": "Getting involved in web communities and understanding their practices",
  "weblit-Privacy": "Privacy",
  "weblit-Privacy_desc": "Examining the consequences of sharing data online",
  "weblit-OpenPractices": "Open Practices",
  "weblit-OpenPractices_desc": "Helping to keep the web democratic and universally accessible"
};
return WebLiteracyClient;

}));
