var exports;

if (module && module.exports) {
  exports = module.exports;
} else {
  exports = this;
}

(function (exports) {

  function WebLiteracyClient(options) {

    var self = this;
    options = options || {};

    self.defaultLang = 'en';
    self.lang = options.lang | self.defaultLang;
    self.descriptionSuffix = options.descriptionSuffix | '_desc';

    self.all = function(l) {
      var language = l | self.lang;
      return self.template.map(function(item) {
        return {
          term: self.langs[self.lang] | self.langs[self.defaultLang] | item.term,
          tag: item.tag
        };
      });
    };

  };

  WebLiteracyClient.prototype.langs = {};
  WebLiteracyClient.prototype.template = [];

  exports.WebLiteracyClient = WebLiteracyClient;

})(exports);


(function(WebLiteracyClient) {

  WebLiteracyClient.prototype.template = [
    {
        "term": "Navigation",
        "description": "Using software tools to browse the Web",
        "tag": "weblit-Navigation",
        "deprecates": []
    },
    {
        "term": "Web Mechanics",
        "description": "Understanding the Web ecosystem",
        "tag": "weblit-WebMechanics",
        "deprecates": []
    },
    {
        "term": "Search",
        "description": "Locating information, people and resources via the Web",
        "tag": "weblit-Search",
        "deprecates": []
    },
    {
        "term": "Credibility",
        "description": "Critically evaluating information found on the Web",
        "tag": "weblit-Credibility",
        "deprecates": []
    },
    {
        "term": "Security",
        "description": "Keeping systems, identities, and content safe",
        "tag": "weblit-Security",
        "deprecates": []
    },
    {
        "term": "Composing for the Web",
        "description": "Creating and curating content for the Web",
        "tag": "weblit-Composing",
        "deprecates": []
    },
    {
        "term": "Remixing",
        "description": "Modifying existing Web resources to create something new",
        "tag": "weblit-Remix",
        "deprecates": []
    },
    {
        "term": "Design and Accessibility",
        "description": "Creating universally effective communications through Web resources",
        "tag": "weblit-DesignAccessibility",
        "deprecates": []
    },
    {
        "term": "Coding/Scripting",
        "description": "Creating interactive experiences on the Web",
        "tag": "weblitCodingScripting",
        "deprecates": []
    },
    {
        "term": "Infrastructure",
        "description": "Understanding the Internet stack",
        "tag": "weblit-Infrastructure",
        "deprecates": []
    },
    {
        "term": "Sharing",
        "description": "Providing access to Web resources",
        "tag": "weblit-Sharing",
        "deprecates": ["weblit-SharingCollaborating"]
    },
    {
        "term": "Collaborating",
        "description": "Creating Web resources with others",
        "tag": "weblit-Collaborating",
        "deprecates": []
    },
    {
        "term": "Community Participation",
        "description": "Getting involved in web communities and understanding their practices",
        "tag": "weblit-Community",
        "deprecates": []
    },
    {
        "term": "Privacy",
        "description": "Examining the consequences of sharing data online",
        "tag": "weblit-Privacy",
        "deprecates": []
    },
    {
        "term": "Open Practices",
        "description": "Helping to keep the Web democratic and universally accessible",
        "tag": "weblit-OpenPractices",
        "deprecates": []
    }
  ];

})(exports.WebLiteracyClient);

(function(WebLiteracyClient) {
  WebLiteracyClient.prototype.langs.en = {
    "WBLIT-MAP": "Web Literacy Map",
    "weblit-Navigation": "Navigation",
    "weblit-Navigation_desc": "Using software tools to browse the Web",
    "weblit-WebMechanics": "Web Mechanics",
    "weblit-WebMechanics_desc": "Understanding the Web ecosystem",
    "weblit-Search": "Search",
    "weblit-Search_desc": "Locating information, people and resources via the Web",
    "weblit-Credibility": "Credibility",
    "weblit-Credibility_desc": "Critically evaluating information found on the Web",
    "weblit-Security": "Security",
    "weblit-Security_desc": "Keeping systems, identities, and content safe",
    "weblit-Composing": "Composing for the Web",
    "weblit-Composing_desc": "Creating and curating content for the Web",
    "weblit-Remix": "Remixing",
    "weblit-Remix_desc": "Modifying existing Web resources to create something new",
    "weblit-DesignAccessibility": "Design and Accessibility",
    "weblit-DesignAccessibility_desc": "Creating universally effective communications through Web resources",
    "weblitCodingScripting": "Coding/Scripting",
    "weblitCodingScripting_desc": "Creating interactive experiences on the Web",
    "weblit-Infrastructure": "Infrastructure",
    "weblit-Infrastructure_desc": "Understanding the Internet stack",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Providing access to Web resources",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Providing access to Web resources",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Creating Web resources with others",
    "weblit-Community": "Community Participation",
    "weblit-Community_desc": "Getting involved in web communities and understanding their practices",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "Examining the consequences of sharing data online",
    "weblit-OpenPractices": "Open Practices",
    "weblit-OpenPractices_desc": "Helping to keep the Web democratic and universally accessible"
  };
})(exports.WebLiteracyClient);
