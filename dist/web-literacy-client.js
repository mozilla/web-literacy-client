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

  var DEFAULT_LANG = 'en-US';

  var self = this;

  // Options
  self.options = options = options || {};

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
    return self.strings[tag + self.template.descriptionSuffix] || self.langs[DEFAULT_LANG][tag + self.template.descriptionSuffix];
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

  // Get an individual strand strand key
  self.strand = function(strandTag) {
    var strandKey = strandTag + self.template.strandSuffix;
    return self.strings[strandKey] || self.langs[DEFAULT_LANG][strandKey];
  };

  self.strands = function() {
    return self.template.strands.map(function(strand) {
      return self.strings[strand + self.template.strandSuffix] || self.langs[DEFAULT_LANG][strand + self.template.strandSuffix];
    });
  };

  // Returns an array of all literacies
  self.all = function() {
    return self.template.literacies.map(function(item) {
      return {
        term: self.term(item.tag),
        tag: item.tag,
        color: item.color,
        colour: item.color,
        description: self.description(item.tag),
        strand: self.strand(item.strand)
      };
    });
  };

  // Returns an object, keyed on Strand (localized name)
  self.allByStrand = function() {
    var output = {};

    self.strands().forEach(function(strand) {
      output[strand] = [];
    });

    self.all().forEach(function(literacy) {
      output[literacy.strand].push(literacy);
    });

    return output;
  };

};

// Set up languages
WebLiteracyClient.prototype.langs = {};

WebLiteracyClient.prototype.template = {
  "title": "Web Literacy Map",
  "titleKey": "WBLIT-MAP",
  "versionKey": "WBLIT-VERSION",
  "version": "1.1.0",
  "descriptionSuffix": "_desc",
  "strandSuffix": "_strand",
  "strands": [
    "Exploring",
    "Building",
    "Connecting"
  ],
  "literacies": [
    {
      "term": "Navigation",
      "description": "Using software tools to browse the web",
      "tag": "weblit-Navigation",
      "deprecates": [],
      "color": "#ff4e1f",
      "strand": "Exploring"
    },
    {
      "term": "Web Mechanics",
      "description": "Understanding the web ecosystem",
      "tag": "weblit-WebMechanics",
      "deprecates": [],
      "color": "#ff6969",
      "strand": "Exploring"
    },
    {
      "term": "Search",
      "description": "Locating information, people and resources via the web",
      "tag": "weblit-Search",
      "deprecates": [],
      "color": "#fe4040",
      "strand": "Exploring"
    },
    {
      "term": "Credibility",
      "description": "Critically evaluating information found on the web",
      "tag": "weblit-Credibility",
      "deprecates": [],
      "color": "#ff5984",
      "strand": "Exploring"
    },
    {
      "term": "Security",
      "description": "Keeping systems, identities, and content safe",
      "tag": "weblit-Security",
      "deprecates": [],
      "color": "#ff004e",
      "strand": "Exploring"
    },
    {
      "term": "Composing for the web",
      "description": "Creating and curating content for the web",
      "tag": "weblit-Composing",
      "deprecates": [],
      "color": "#01bc85",
      "strand": "Building"
    },
    {
      "term": "Remixing",
      "description": "Modifying existing web resources to create something new",
      "tag": "weblit-Remix",
      "deprecates": [],
      "color": "#00ceb8",
      "strand": "Building"
    },
    {
      "term": "Design and Accessibility",
      "description": "Creating universally effective communications through web resources",
      "tag": "weblit-DesignAccessibility",
      "deprecates": [],
      "color": "#6ecba9",
      "strand": "Building"
    },
    {
      "term": "Coding/scripting",
      "description": "Creating interactive experiences on the web",
      "tag": "weblit-CodingScripting",
      "deprecates": [],
      "color": "#00967f",
      "strand": "Building"
    },
    {
      "term": "Infrastructure",
      "description": "Understanding the Internet stack",
      "tag": "weblit-Infrastructure",
      "deprecates": [],
      "color": "#09b773",
      "strand": "Building"
    },
    {
      "term": "Sharing",
      "description": "Creating web resources with others",
      "tag": "weblit-Sharing",
      "deprecates": [
        "weblit-SharingCollaborating"
      ],
      "color": "#739ab1",
      "strand": "Connecting"
    },
    {
      "term": "Collaborating",
      "description": "Providing access to web resources",
      "tag": "weblit-Collaborating",
      "deprecates": [],
      "color": "#506b7b",
      "strand": "Connecting"
    },
    {
      "term": "Community Participation",
      "description": "Getting involved in web communities and understanding their practices",
      "tag": "weblit-Community",
      "deprecates": [],
      "color": "#63cfea",
      "strand": "Connecting"
    },
    {
      "term": "Privacy",
      "description": "Examining the consequences of sharing data online",
      "tag": "weblit-Privacy",
      "deprecates": [],
      "color": "#00bad6",
      "strand": "Connecting"
    },
    {
      "term": "Open Practices",
      "description": "Helping to keep the web democratic and universally accessible",
      "tag": "weblit-OpenPractices",
      "deprecates": [],
      "color": "#0097d6",
      "strand": "Connecting"
    }
  ]
};
WebLiteracyClient.prototype.langs["en-US"] = {
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
  "weblit-OpenPractices_desc": "Helping to keep the web democratic and universally accessible",
  "Exploring_strand": "Exploring",
  "Building_strand": "Building",
  "Connecting_strand": "Connecting"
};
return WebLiteracyClient;

}));
