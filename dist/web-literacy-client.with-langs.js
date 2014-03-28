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






WebLiteracyClient.prototype.langs["bn-BD"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "ন্যাভিগেশন",
    "weblit-Navigation_desc": "ওয়েব ব্রাউজ করার জন্য সফটওয়্যার ব্যবহার করা",
    "weblit-WebMechanics": "ওয়েব কৌশল",
    "weblit-WebMechanics_desc": "ওয়েবের পরিবেশ ব্যবস্থা বুঝা",
    "weblit-Search": "অনুসন্ধান",
    "weblit-Search_desc": "ওয়েবের মাধ্যমের তথ্য, মানুষ এবং উপাদান জানা",
    "weblit-Credibility": "বিশ্বাসযোগ্যতা",
    "weblit-Credibility_desc": "ওয়েবে প্রাপ্ত তথ্য নিবিড়ভাবে পর্যবেক্ষণ করা",
    "weblit-Security": "নিরাপত্তা",
    "weblit-Security_desc": "সিস্টেম, আইডেনটিটি এবং বিষয়বস্তু নিরাপদে রাখা",
    "weblit-Composing": "ওয়েবের জন্য লেখা",
    "weblit-Composing_desc": "ওয়েবের বিষয়বস্তু তৈরী করা এবং তা দেখাশুনা করা",
    "weblit-Remix": "রিমিক্স করা",
    "weblit-Remix_desc": "নতুন কিছু করতে বিদ্যমান ওয়েব উপাদান পরিবর্তন করা",
    "weblit-DesignAccessibility": "পরিকল্পনা এবং প্রবেশযোগ্যতা",
    "weblit-DesignAccessibility_desc": "ওয়েব উপাদান ব্যবহার করে সর্বজনীন কার্যকরী যোগাযোগ তৈরী করা",
    "weblit-CodingScripting": "কোড/স্ক্রিপ্ট লেখা",
    "weblit-CodingScripting_desc": "ওয়েবে মিথস্ক্রিয় অভিজ্ঞতা তৈরী করা",
    "weblit-Infrastructure": "অবকাঠামো",
    "weblit-Infrastructure_desc": "ইন্টারনেটের স্ট্যাক বোঝা",
    "weblit-Sharing": " ছড়িয়ে দিন",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "ছড়িয়ে দিন",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "সম্প্রদায়ে অংশগ্রহন",
    "weblit-Community_desc": "ওয়েব সম্প্রদায়ের সাথে সংযুক্ত হওয়া এবং তাদের পরিবেশ বুঝা",
    "weblit-Privacy": "গোপনীয়তা",
    "weblit-Privacy_desc": "অনলাইনে তথ্য শেয়ার করার ফলাফল পরীক্ষা করা",
    "weblit-OpenPractices": "মুক্ত চর্চা",
    "weblit-OpenPractices_desc": "ওয়েবকে গণতান্ত্রিক ও সর্বজনীন প্রবেশযোগ্য রাখতে সাহায্য করা",
    "Exploring_strand": "বিশ্লেষণ করা",
    "Building_strand": "তৈরী করা",
    "Connecting_strand": "সংযুক্ত"
};
WebLiteracyClient.prototype.langs["bn-IN"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "ন্যাভিগেশন",
    "weblit-Navigation_desc": "সফটওয়্যার সরঞ্জাম ব্যবহার করে ওয়েব ব্রাউস করা",
    "weblit-WebMechanics": "ওয়েব কৌশলসমূহ",
    "weblit-WebMechanics_desc": "ওয়েবের বাস্তুতন্ত্র অনুধাবন করা ",
    "weblit-Search": "অনুসন্ধান",
    "weblit-Search_desc": "ওয়েবের মাধ্যমের তথ্য, মানুষ এবং উপাদান জানা",
    "weblit-Credibility": "বিশ্বাসযোগ্যতা",
    "weblit-Credibility_desc": "ওয়েবে প্রাপ্ত তথ্য নিবিড়ভাবে পর্যবেক্ষণ করা",
    "weblit-Security": "সুরক্ষা ",
    "weblit-Security_desc": "সিস্টেম, আইডেনটিটি এবং বিষয়বস্তু নিরাপদে রাখা",
    "weblit-Composing": "ওয়েবের জন্য তৈরি করা",
    "weblit-Composing_desc": "ওয়েবের বিষয়বস্তু তৈরী করা এবং তা দেখাশোনা করা",
    "weblit-Remix": "রিমিক্স করা",
    "weblit-Remix_desc": "নতুন কিছু তৈরি করার জন্য বর্তমানে উপস্থিত ওয়েব রিসোর্সের পরিবর্তন করা হয়েছে",
    "weblit-DesignAccessibility": "ডিজাইন এবং বিশেষ ব্যবহারকারীদের জন্য সুযোগ",
    "weblit-DesignAccessibility_desc": "ওয়েব উপাদান ব্যবহার করে সর্বজনীন কার্যকরী যোগাযোগ তৈরী করা",
    "weblit-CodingScripting": "কোডিং / স্ক্রিপ্টিং",
    "weblit-CodingScripting_desc": "ওয়েবে মিথস্ক্রিয় অভিজ্ঞতা তৈরি করা",
    "weblit-Infrastructure": "পরিকাঠামো",
    "weblit-Infrastructure_desc": "ইন্টারনেট স্ট্যাক বোঝা",
    "weblit-Sharing": "বণ্টন করা",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "বণ্টন করা",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "যৌথ প্রচেষ্টা করা",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "কমিউনিটি অংশগ্রহণ",
    "weblit-Community_desc": "ওয়েব সম্প্রদায়ের সাথে সংযুক্ত হওয়া এবং তাদের পরিবেশ বোঝা",
    "weblit-Privacy": "গোপনীয়তা ",
    "weblit-Privacy_desc": "অনলাইনে তথ্য শেয়ারিং এর পরিণতির পূর্বানুমান ",
    "weblit-OpenPractices": "মুক্ত অনুশীলনসমূহ",
    "weblit-OpenPractices_desc": "ওয়েবকে গণতান্ত্রিক ও সর্বজনীন প্রবেশযোগ্য রাখতে সাহায্য করা  ",
    "Exploring_strand": "অন্বেষণ",
    "Building_strand": "গড়ে তোলা",
    "Connecting_strand": "সংযোজন "
};



WebLiteracyClient.prototype.langs["de"] = {
    "WBLIT-MAP": "Standard für Webkenntnisse",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigation",
    "weblit-Navigation_desc": "Software nutzen, um durch das Web zu navigieren",
    "weblit-WebMechanics": "Funktionsweise des Web",
    "weblit-WebMechanics_desc": "Das Ökosystem des Webs verstehen",
    "weblit-Search": "Suche",
    "weblit-Search_desc": "Informationen, Menschen und Ressourcen über das Web finden",
    "weblit-Credibility": "Glaubwürdigkeit",
    "weblit-Credibility_desc": "Im Web gefundenen Informationen kritisch bewerten",
    "weblit-Security": "Sicherheit",
    "weblit-Security_desc": "Systeme, Identitäten und Inhalte sicher halten",
    "weblit-Composing": "Für das Web entwerfen",
    "weblit-Composing_desc": "Inhalte für das Web erschaffen und zusammenstellen",
    "weblit-Remix": "Remixen",
    "weblit-Remix_desc": "Existierende Webressourcen verändern, um etwas neues zu erschaffen",
    "weblit-DesignAccessibility": "Design und Barrierefreiheit",
    "weblit-DesignAccessibility_desc": "Universell effektive Kommunikationen durch Webressourcen erstellen",
    "weblit-CodingScripting": "Programmieren",
    "weblit-CodingScripting_desc": "Interaktive Inhalte im Web erstellen",
    "weblit-Infrastructure": "Infrastruktur",
    "weblit-Infrastructure_desc": "Den Aufbau des Internets verstehen",
    "weblit-Sharing": "Teilen",
    "weblit-Sharing_desc": "Web-Ressourcen mit Anderen gemeinsam erstellen",
    "weblit-SharingCollaborating": "Teilen",
    "weblit-SharingCollaborating_desc": "Web-Ressourcen mit Anderen gemeinsam erstellen",
    "weblit-Collaborating": "Zusammenarbeiten",
    "weblit-Collaborating_desc": "Zugriff auf Web-Ressourcen anbieten",
    "weblit-Community": "Community Teilnahme",
    "weblit-Community_desc": "An Webcommunities teilhaben und deren Methoden verstehen",
    "weblit-Privacy": "Privatsphäre",
    "weblit-Privacy_desc": "Die Konsequenzen von Online Datenteilung untersuchen",
    "weblit-OpenPractices": "Offene Vorgehensweisen",
    "weblit-OpenPractices_desc": "Mithelfen, das Web demokratisch und allgemein zugänglich zu halten",
    "Exploring_strand": "Entdecken",
    "Building_strand": "Erstellen",
    "Connecting_strand": "Verbindet"
};




WebLiteracyClient.prototype.langs["en-CA"] = {
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
WebLiteracyClient.prototype.langs["en-GB"] = {
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

WebLiteracyClient.prototype.langs["es"] = {
    "WBLIT-MAP": "Mapa de Alfabetización Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navegación",
    "weblit-Navigation_desc": "Usando herramientas de software para navegar en la web",
    "weblit-WebMechanics": "Mecánica de la Web",
    "weblit-WebMechanics_desc": "Comprendiendo el ecosistema de la web",
    "weblit-Search": "Búsqueda",
    "weblit-Search_desc": "Ubicando personas, recursos e información a través de la web",
    "weblit-Credibility": "Credibilidad",
    "weblit-Credibility_desc": "Evaluando críticamente la información encontrada en la web",
    "weblit-Security": "Seguridad",
    "weblit-Security_desc": "Manteniendo sistemas, identidades y contenido seguro",
    "weblit-Composing": "Composición para la web",
    "weblit-Composing_desc": "Creando y curando contenido para la web",
    "weblit-Remix": "Remezclar",
    "weblit-Remix_desc": "Modificando recursos existentes en la web para crear algo nuevo",
    "weblit-DesignAccessibility": "Diseño y Accesibilidad",
    "weblit-DesignAccessibility_desc": "Creando comunicaciones universalmente eficaces a través de recursos de web",
    "weblit-CodingScripting": "Coding/scripting",
    "weblit-CodingScripting_desc": "Creando experiencias interactivas en la web",
    "weblit-Infrastructure": "Infraestructura",
    "weblit-Infrastructure_desc": "Comprendiendo la estructura de Internet",
    "weblit-Sharing": "Compartir",
    "weblit-Sharing_desc": "Crear recursos web con otros",
    "weblit-SharingCollaborating": "Compartir",
    "weblit-SharingCollaborating_desc": "Crear recursos web con otros",
    "weblit-Collaborating": "Colaborar",
    "weblit-Collaborating_desc": "Proveer acceso a recursos web",
    "weblit-Community": "Participación Comunitaria",
    "weblit-Community_desc": "Involucrarse en las comunidades web y comprender sus prácticas",
    "weblit-Privacy": "Privacidad",
    "weblit-Privacy_desc": "Examinando las consecuencias de compartir información en línea",
    "weblit-OpenPractices": "Prácticas Abiertas",
    "weblit-OpenPractices_desc": "Ayudando a mantener la web democrática y universalmente accesible",
    "Exploring_strand": "Exploración",
    "Building_strand": "Construcción",
    "Connecting_strand": "Conexión"
};


WebLiteracyClient.prototype.langs["es-CL"] = {
    "WBLIT-MAP": "Mapa de alfabetización web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navegación",
    "weblit-Navigation_desc": "- Usando herramientas de software para navegar la web",
    "weblit-WebMechanics": "Mecánica de la web",
    "weblit-WebMechanics_desc": "- Entendiendo el ecosistema web",
    "weblit-Search": "Búsqueda",
    "weblit-Search_desc": "- Ubicando personas, recursos e información a través de la web",
    "weblit-Credibility": "Credibilidad",
    "weblit-Credibility_desc": "- Evaluando críticamente la información encontrada en la web",
    "weblit-Security": "Seguridad",
    "weblit-Security_desc": "- Manteniendo sistemas, identidades y contenido seguros",
    "weblit-Composing": "Componiendo para la web",
    "weblit-Composing_desc": "Creando y curando contenido para la web",
    "weblit-Remix": "Mezclando",
    "weblit-Remix_desc": "Modificando recursos existentes en la web para crear algo nuevo",
    "weblit-DesignAccessibility": "Diseño y accesibilidad",
    "weblit-DesignAccessibility_desc": "Creando comunicaciones universalmente eficaces a través de recursos de web",
    "weblit-CodingScripting": "Programando código/secuencias",
    "weblit-CodingScripting_desc": "Creando experiencias interactivas en la web",
    "weblit-Infrastructure": "Infraestructura",
    "weblit-Infrastructure_desc": "Comprendiendo la estructura de internet",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Participación de la comunidad",
    "weblit-Community_desc": "Involucrándose en comunidades web y entendiendo sus prácticas",
    "weblit-Privacy": "Privacidad",
    "weblit-Privacy_desc": "Examinando las consecuencias de compartir información en línea",
    "weblit-OpenPractices": "Prácticas abiertas",
    "weblit-OpenPractices_desc": "Ayudando a mantener la web democrática y universalmente accesible",
    "Exploring_strand": "Explorando",
    "Building_strand": "Construyendo",
    "Connecting_strand": "Conectando"
};
WebLiteracyClient.prototype.langs["es-MX"] = {
    "WBLIT-MAP": "Mapa de Alfabetización Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navegación",
    "weblit-Navigation_desc": "Usar herramientas del software para navegar en la web",
    "weblit-WebMechanics": "Mecánica de la web",
    "weblit-WebMechanics_desc": "Comprender el ecosistema de la web",
    "weblit-Search": "Buscar",
    "weblit-Search_desc": "Localizar información, personas y recursos a través de la web",
    "weblit-Credibility": "Credibilidad",
    "weblit-Credibility_desc": "Evaluar críticamente la información encontrada en la web",
    "weblit-Security": "Seguridad",
    "weblit-Security_desc": "Mantener sistemas, identidades y contenidos seguros",
    "weblit-Composing": "Redactar para la web",
    "weblit-Composing_desc": "Crear y organizar contenidos para la web ",
    "weblit-Remix": "Remezclar",
    "weblit-Remix_desc": "Modificar recursos existentes en la web para crear algo nuevo",
    "weblit-DesignAccessibility": "Diseño y accesibilidad",
    "weblit-DesignAccessibility_desc": "Crear comunicaciones universalmente eficaces a través de recursos web",
    "weblit-CodingScripting": "Codificación y scripting",
    "weblit-CodingScripting_desc": "Crear experiencias interactivas en la web",
    "weblit-Infrastructure": "Infraestructura",
    "weblit-Infrastructure_desc": "Comprender la pila de Internet",
    "weblit-Sharing": "Compartir",
    "weblit-Sharing_desc": "Crear recursos web con los demás",
    "weblit-SharingCollaborating": "Compartir",
    "weblit-SharingCollaborating_desc": "Crear recursos web con los demás",
    "weblit-Collaborating": "Colaborar",
    "weblit-Collaborating_desc": "Permitir el acceso a recursos web",
    "weblit-Community": "Participación comunitaria",
    "weblit-Community_desc": "Involucrarse en las comunidades web y comprender sus prácticas",
    "weblit-Privacy": "Privacidad",
    "weblit-Privacy_desc": "Examinar las consecuencias de compartir información en línea",
    "weblit-OpenPractices": "Prácticas abiertas",
    "weblit-OpenPractices_desc": "Ayudar a mantener la web democrática y accesible para todos",
    "Exploring_strand": "Exploración",
    "Building_strand": "Construir",
    "Connecting_strand": "Conexión"
};




WebLiteracyClient.prototype.langs["fa"] = {
    "WBLIT-MAP": "نقشه آموزش وب سایت",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "پیمایش",
    "weblit-Navigation_desc": "استفاده از ابزارهای نرم افزاری برای مرور صفحات وب",
    "weblit-WebMechanics": "مهندسی وب",
    "weblit-WebMechanics_desc": "فهمِ اکوسیستم وب",
    "weblit-Search": "جستجو",
    "weblit-Search_desc": "مکان یابی اطلاعات، افراد و منابع از طریق وب",
    "weblit-Credibility": "اعتبار",
    "weblit-Credibility_desc": "اطلاعات بحرانی ارزیابی ها بر روی وب",
    "weblit-Security": "امنیت",
    "weblit-Security_desc": "سالم نگه داشتن سیستم ها، هویت ها و محتوا",
    "weblit-Composing": "نوشتن برای وب",
    "weblit-Composing_desc": "ایجاد و بهینه کردن مطالب برای وب",
    "weblit-Remix": "بازترکیبی",
    "weblit-Remix_desc": "تغییر منابع وب موجود برای ایجاد چیزی جدید",
    "weblit-DesignAccessibility": "طراحی و قابلیت دسترسی",
    "weblit-DesignAccessibility_desc": "ایجاد ارتباطات جهانی موثر از منابع وب",
    "weblit-CodingScripting": "برنامه نویسی/اسکریپت نویسی",
    "weblit-CodingScripting_desc": "ایجاد تجربه های تعاملی در وب",
    "weblit-Infrastructure": "زیرساخت",
    "weblit-Infrastructure_desc": "آشنایی با پشته ی اینترنت",
    "weblit-Sharing": "به اشتراک گذاری",
    "weblit-Sharing_desc": "ایجاد منابع وب با دیگران",
    "weblit-SharingCollaborating": "به اشتراک گذاری",
    "weblit-SharingCollaborating_desc": "ایجاد منابع وب با دیگران",
    "weblit-Collaborating": "همکاری",
    "weblit-Collaborating_desc": "فراهم کردن دسترسی به منابع وب",
    "weblit-Community": "مشارکت اجتماعی",
    "weblit-Community_desc": "مشارکت در اجتماعات وب و درک روش های خود ",
    "weblit-Privacy": "حریم خصوصی",
    "weblit-Privacy_desc": "بررسی عواقب ناشی از داده های به اشتراک گذاری آنلاین",
    "weblit-OpenPractices": "روش های بازکردن",
    "weblit-OpenPractices_desc": "کمک به نگه داشتن وب دموکراتیک و جهانی قابل دسترس",
    "Exploring_strand": "کاوش گری",
    "Building_strand": "ساختمان",
    "Connecting_strand": "اتصال"
};



WebLiteracyClient.prototype.langs["fr"] = {
    "WBLIT-MAP": "Carte de la Littéracie Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigation",
    "weblit-Navigation_desc": "Utiliser des outils logiciels pour naviguer sur le Web",
    "weblit-WebMechanics": "Mécanismes du web",
    "weblit-WebMechanics_desc": "Comprendre l‘écosystème du web",
    "weblit-Search": "Recherche",
    "weblit-Search_desc": "Trouver de l‘information, des gens et des ressources via le web",
    "weblit-Credibility": "Crédibilité",
    "weblit-Credibility_desc": "Évaluer avec esprit critique les informations trouvées sur le web",
    "weblit-Security": "Sécurité",
    "weblit-Security_desc": "S‘assurer de la sûreté des systèmes, des identités et du contenu",
    "weblit-Composing": "Composer pour le web",
    "weblit-Composing_desc": "Créer et maintenir du contenu en ligne",
    "weblit-Remix": "Remixer",
    "weblit-Remix_desc": "Modifier des ressources en ligne existantes pour créer de nouvelles choses",
    "weblit-DesignAccessibility": "Design et accessibilité",
    "weblit-DesignAccessibility_desc": "Créer des communications universellement efficaces grâce à des ressources web",
    "weblit-CodingScripting": "Coder et scripter",
    "weblit-CodingScripting_desc": "Créer des expériences interactives sur le web",
    "weblit-Infrastructure": "Infrastructure",
    "weblit-Infrastructure_desc": "Comprendre le modèle Internet",
    "weblit-Sharing": "Partage",
    "weblit-Sharing_desc": "Créer des ressources web à plusieurs",
    "weblit-SharingCollaborating": "Partage",
    "weblit-SharingCollaborating_desc": "crée  des ressources web avec les autres",
    "weblit-Collaborating": "Collabore",
    "weblit-Collaborating_desc": "Fourniture d'accès à des ressources Web",
    "weblit-Community": "Participation communautaire",
    "weblit-Community_desc": "Rejoindre des communautés en ligne et comprendre leurs usages",
    "weblit-Privacy": "Vie privée",
    "weblit-Privacy_desc": "Considérer les conséquences du partage de données en ligne",
    "weblit-OpenPractices": "Pratiques ouvertes",
    "weblit-OpenPractices_desc": "Contribuer à garder le Web démocratique et accessible universellement",
    "Exploring_strand": "Explorer",
    "Building_strand": "Créer",
    "Connecting_strand": "Coopérer"
};





WebLiteracyClient.prototype.langs["hi-IN"] = {
    "WBLIT-MAP": "वेब साक्षरता का नक्शा",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "नेविगेशन",
    "weblit-Navigation_desc": "वेब ब्राउज़ करने के लिए सॉफ्टवेयर उपकरण का उपयोग करना",
    "weblit-WebMechanics": "वेब मैकेनिक्स",
    "weblit-WebMechanics_desc": "वेब पारिस्थितिकी तंत्र को समझना",
    "weblit-Search": "खोजें",
    "weblit-Search_desc": "Locating information, people and resources via the web",
    "weblit-Credibility": "विश्वसनीयता",
    "weblit-Credibility_desc": "वेब पर पायी समीक्षा कि मूल्यांकन जानकारी\n",
    "weblit-Security": "सुरक्षा",
    "weblit-Security_desc": "Keeping systems, identities, and content safe",
    "weblit-Composing": "वेब के लिए रचना",
    "weblit-Composing_desc": "Creating and curating content for the web",
    "weblit-Remix": "मिश्रण",
    "weblit-Remix_desc": "कुछ नया बनाने के लिए मौजूदा वेब संसाधनों को संशोधित करना",
    "weblit-DesignAccessibility": "बनावट और पहुँच",
    "weblit-DesignAccessibility_desc": "वेब संसाधनों के माध्यम से सार्वभौमिक प्रभावी संचार बनाना",
    "weblit-CodingScripting": "कोडिंग / पटकथा",
    "weblit-CodingScripting_desc": "वेब पर इंटरैक्टिव अनुभव का निर्माण",
    "weblit-Infrastructure": "आधारिक संरचना",
    "weblit-Infrastructure_desc": "इंटरनेट ढेर को समझना",
    "weblit-Sharing": "साझा करें",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "साझा करें",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "सामुदायिक भागीदारी",
    "weblit-Community_desc": "Getting involved in web communities and understanding their practices",
    "weblit-Privacy": "गोपनीयता",
    "weblit-Privacy_desc": "Examining the consequences of sharing data online",
    "weblit-OpenPractices": "खुला अभ्यास",
    "weblit-OpenPractices_desc": "वेब लोकतांत्रिक और सर्वत्र सुलभ रखने के लिए मदद",
    "Exploring_strand": "\nतलाश",
    "Building_strand": " निर्माण",
    "Connecting_strand": "कनेक्ट कर"
};


WebLiteracyClient.prototype.langs["id"] = {
    "WBLIT-MAP": "Peta Literasi Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigasi",
    "weblit-Navigation_desc": "Menggunakan perangkat lunak untuk menjelajahi web",
    "weblit-WebMechanics": "Mekanika Web",
    "weblit-WebMechanics_desc": "Memahami ekosistem web",
    "weblit-Search": "Cari",
    "weblit-Search_desc": "Menemukan informasi, orang, dan sumber daya melalui web",
    "weblit-Credibility": "Kredibilitas",
    "weblit-Credibility_desc": "Kritis dalam mengevaluasi informasi yang ditemukan pada web",
    "weblit-Security": "Keamanan",
    "weblit-Security_desc": "Menjaga keamanan sistem, identitas, dan konten",
    "weblit-Composing": "Menulis untuk web",
    "weblit-Composing_desc": "Membuat dan mengkurasi konten dari web",
    "weblit-Remix": "Me-remix",
    "weblit-Remix_desc": "Memodifikasi sumber daya web yang ada untuk membuat sesuatu yang baru",
    "weblit-DesignAccessibility": "Desain dan Aksesibilitas",
    "weblit-DesignAccessibility_desc": "Membuat komunikasi yang efektif secara universal melalui sumber daya web",
    "weblit-CodingScripting": "Membuar program/skrip",
    "weblit-CodingScripting_desc": "Membangun pengalaman interaktif di web",
    "weblit-Infrastructure": "Infrastruktur",
    "weblit-Infrastructure_desc": "Memahami lapisan Internet",
    "weblit-Sharing": "Berbagi",
    "weblit-Sharing_desc": "Membuat sumber daya dengan orang lain",
    "weblit-SharingCollaborating": "Bagikan",
    "weblit-SharingCollaborating_desc": "Membuat sumber daya dengan orang lain",
    "weblit-Collaborating": "Berkolaborasi",
    "weblit-Collaborating_desc": "Menyediakan akses ke sumber daya web",
    "weblit-Community": "Partisipasi Komunitas",
    "weblit-Community_desc": "Terlibat dalam komunitas web dan memahami praktik mereka",
    "weblit-Privacy": "Privasi",
    "weblit-Privacy_desc": "Meneliti konsekuensi dari berbagi data secara online",
    "weblit-OpenPractices": "Praktik Terbuka",
    "weblit-OpenPractices_desc": "Membantu menjaga agar web tetap demokratis dan dapat diakses secara universal",
    "Exploring_strand": "Menjelajahi",
    "Building_strand": "Membangun",
    "Connecting_strand": "Menghubungkan"
};

WebLiteracyClient.prototype.langs["it"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigazione",
    "weblit-Navigation_desc": "Utilizzare strumenti software per navigare nel web",
    "weblit-WebMechanics": "Funzionamento del web",
    "weblit-WebMechanics_desc": "Comprendere l'ecosistema web",
    "weblit-Search": "Cerca",
    "weblit-Search_desc": "Individuare informazioni, persone e risorse attraverso il web",
    "weblit-Credibility": "Credibilità",
    "weblit-Credibility_desc": "Valutare criticamente le informazioni trovate sul web",
    "weblit-Security": "Sicurezza",
    "weblit-Security_desc": "Mantenere sicuri i sistemi, le identità e i contenuti",
    "weblit-Composing": "Creare per il web",
    "weblit-Composing_desc": "Creare e curare contenuto per il web",
    "weblit-Remix": "Remixare",
    "weblit-Remix_desc": "Modificare le risorse web esistenti per creare qualcosa di nuovo",
    "weblit-DesignAccessibility": "Design e Accessibilità",
    "weblit-DesignAccessibility_desc": "Creare comunicazioni universalmente efficaci mediante risorse web",
    "weblit-CodingScripting": "Creare Codice/Script",
    "weblit-CodingScripting_desc": "Creare esperienze interattive nel web",
    "weblit-Infrastructure": "Infrastruttura",
    "weblit-Infrastructure_desc": "Comprendere lo stack Internet",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Partecipazione alla Comunità",
    "weblit-Community_desc": "Partecipare alle comunità web e comprendere le loro dinamiche",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "Esaminare le conseguenze della condivisione online dei dati",
    "weblit-OpenPractices": "Pratiche aperte",
    "weblit-OpenPractices_desc": "Aiutare a mantenere il web democratico e universalmente accessibile",
    "Exploring_strand": "Esplorare",
    "Building_strand": "Costruire",
    "Connecting_strand": "Connettere"
};


WebLiteracyClient.prototype.langs["km"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "ការ​រុករក",
    "weblit-Navigation_desc": "ប្រើ​ឧបករណ៍​កម្មវិធី​ដើម្បី​រកមើល​បណ្ដាញ​",
    "weblit-WebMechanics": "យន្ត​ការី​បណ្ដាញ",
    "weblit-WebMechanics_desc": "ការ​យល់​ពី​ប្រព័ន្ធ​អេកូ​បណ្ដាញ",
    "weblit-Search": "ស្វែង​រក",
    "weblit-Search_desc": "រក​ឃើញ​ព័ត៌មាន, មនុស្ស និង​ធនធាន​តាម​រយៈ​បណ្ដាញ",
    "weblit-Credibility": "ភាព​ជឿជាក់",
    "weblit-Credibility_desc": "ការ​វាយតម្លៃ​ព័ត៌មាន​រក​ឃើញ​មាន​នៅ​លើ​​បណ្ដាញ",
    "weblit-Security": "សន្តិសុខ",
    "weblit-Security_desc": "ការ​រក្សាទុក​ប្រព័ន្ធ, ការ​កំណត់ និង​សុវត្ថិភាព​​​មាតិកា",
    "weblit-Composing": "ការ​ចងក្រង​បណ្ដាញ",
    "weblit-Composing_desc": "ការ​បង្កើត​មាតិកា​សម្រាប់​បណ្ដាញ",
    "weblit-Remix": "បញ្ចូល​គ្នា​",
    "weblit-Remix_desc": "ការ​កែប្រែ​ធនធាន​បណ្ដាញ​ដែល​មាន​ស្រាប់​ដើម្បី​​បង្កើត​អ្វី​មួយ​ថ្មី",
    "weblit-DesignAccessibility": "រចនា និង​ភាព​ជឿជាក់",
    "weblit-DesignAccessibility_desc": "ការ​បង្កើត​ទំនាក់ទំនង​មាន​ប្រសិទ្ធភាព​ជា​សកល​តាម​រយៈ​ធនធាន​បណ្ដាញ",
    "weblit-CodingScripting": "ការ​កូដ/ការ​ស្គ្រីប",
    "weblit-CodingScripting_desc": "ការ​បង្កើត​បទពិសោធន៍​​នៃ​អន្តរកម្ម​នៅ​លើ​បណ្ដាញ",
    "weblit-Infrastructure": "ហេដ្ឋារចនាសម្ព័ន្ធ",
    "weblit-Infrastructure_desc": "ការ​យល់​ពី​ជង់​អ៊ីនធឺណិត​",
    "weblit-Sharing": "ការ​ចែករំលែក",
    "weblit-Sharing_desc": "បង្កើត​ធនធាន​បណ្ដាញ​ជាមួយ​អ្នក​ផ្សេង",
    "weblit-SharingCollaborating": "ការ​ចែករំលែក",
    "weblit-SharingCollaborating_desc": "បង្កើត​ធនធាន​បណ្ដាញ​ជាមួយ​អ្នក​ដទៃ",
    "weblit-Collaborating": "ការ​សហការ",
    "weblit-Collaborating_desc": "អនុញ្ញាត​ឲ្យ​ចូល​ទៅ​កាន់​ធនធាន​បណ្ដាញ",
    "weblit-Community": "ការ​ចូលរួម​សហគមន៍",
    "weblit-Community_desc": "ទាក់ទង​សហគមន៍​បណ្ដាញ និង​យល់​ពី​ការ​អនុវត្ត​របស់​ពួកគេ",
    "weblit-Privacy": "ភាព​ឯកជន",
    "weblit-Privacy_desc": "ការ​ពិនិត្យមើល​លទ្ធផល​នៃ​ការ​ចែករំលែក​ទិន្នន័យ​លើ​បណ្ដាញ",
    "weblit-OpenPractices": "បើក​ការ​​អនុវត្ត",
    "weblit-OpenPractices_desc": "ជំនួយ​ក្នុង​ការ​រក្សា​បណ្ដាញ​ទូទៅ និង​អាច​ចូល​ដំណើរការ​បាន​ជា​សកល",
    "Exploring_strand": "ការ​រុករក",
    "Building_strand": "ការ​ស្ថាបនា",
    "Connecting_strand": "ការ​តភ្ជាប់"
};
















WebLiteracyClient.prototype.langs["nl"] = {
    "WBLIT-MAP": "Webeducatiekaart",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigatie",
    "weblit-Navigation_desc": "Softwarehulpmiddelen gebruiken om te browsen op het web",
    "weblit-WebMechanics": "Webmonteurs",
    "weblit-WebMechanics_desc": "Het web-ecosysteem begrijpen",
    "weblit-Search": "Zoeken",
    "weblit-Search_desc": "Informatie, mensen en bronnen via het web lokaliseren",
    "weblit-Credibility": "Geloofwaardigheid",
    "weblit-Credibility_desc": "Informatie van het internet kritisch beoordelen",
    "weblit-Security": "Veiligheid",
    "weblit-Security_desc": "Systemen, identiteiten en inhoud veilig houden",
    "weblit-Composing": "Creëren voor het web",
    "weblit-Composing_desc": "Inhoud voor het web maken en beschermen",
    "weblit-Remix": "Remixen",
    "weblit-Remix_desc": "Bestaande webbronnen bewerken om iets nieuws te maken",
    "weblit-DesignAccessibility": "Ontwerp en toegankelijkheid",
    "weblit-DesignAccessibility_desc": "Universeel effectieve communicaties maken met webbronnen",
    "weblit-CodingScripting": "Coderen/scripten",
    "weblit-CodingScripting_desc": "Interactieve belevenissen op het web maken",
    "weblit-Infrastructure": "Infrastructuur",
    "weblit-Infrastructure_desc": "De Internetstructuur begrijpen",
    "weblit-Sharing": "Delen",
    "weblit-Sharing_desc": "Webbronnen maken met anderen",
    "weblit-SharingCollaborating": "Delen",
    "weblit-SharingCollaborating_desc": "Webbronnen maken met anderen",
    "weblit-Collaborating": "Samenwerking",
    "weblit-Collaborating_desc": "Toegang tot webbronnen bieden",
    "weblit-Community": "Gemeenschapsparticipatie",
    "weblit-Community_desc": "Betrokken raken bij webgemeenschappen en hun werkzaamheden begrijpen",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "De consequenties van gegevens online delen onderzoeken",
    "weblit-OpenPractices": "Open technieken",
    "weblit-OpenPractices_desc": "Helpen om het web democratisch en universeel toegankelijk te houden",
    "Exploring_strand": "Ontdekken",
    "Building_strand": "Maken",
    "Connecting_strand": "Verbinden"
};


WebLiteracyClient.prototype.langs["pa-IN"] = {
    "WBLIT-MAP": "ਵੈੱਬ ਸਾਖਰਤਾ ਨਕਸ਼ਾ",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "ਨੇਵੀਗੇਸ਼ਨ",
    "weblit-Navigation_desc": "ਵੈੱਬ ਬਰਾਊਜ਼ ਕਰਨ ਲਈ ਸਾਫਟਵੇਅਰ ਟੂਲ ਦਾ ਇਸਤੇਮਾਲ ਕਰਨਾ",
    "weblit-WebMechanics": "ਵੈੱਬ ਮਕੈਨਿਕਸ",
    "weblit-WebMechanics_desc": "ਵੈੱਬ ਪਾਰਿਸਥਿਤੀਕੀ ਨੂੰ ਸਮਝਣਾ",
    "weblit-Search": "ਖੋਜ",
    "weblit-Search_desc": "ਵੈੱਬ ਦੁਆਰਾ ਜਾਣਕਾਰੀ, ਲੋਕ ਅਤੇ ਸ੍ਰੋਤ ਦਾ ਪਤਾ ਲਗਾਉਣਾ",
    "weblit-Credibility": "ਭਰੋਸੇਯੋਗਤਾ",
    "weblit-Credibility_desc": "ਵੈੱਬ ਉੱਤੇ ਲੱਭੀ ਨਾਜ਼ੁਕ ਜਾਣਕਾਰੀ ਨੂੰ ਪਤਾ ਕਰੋ ",
    "weblit-Security": "ਸੁਰੱਖਿਆ",
    "weblit-Security_desc": "ਸਿਸਟਮ, ਸ਼ਨਾਖਤ, ਅਤੇ ਸਮੱਗਰੀ ਸੁਰੱਖਿਅਤ ਰੱਖਣਾ ",
    "weblit-Composing": "ਵੈੱਬ ਲਈ ਰਚਨਾ",
    "weblit-Composing_desc": "ਵੈੱਬ ਲਈ ਸਮੱਗਰੀ ਬਣਾਉਣਾ ਅਤੇ ਸੰਭਾਲਣਾ",
    "weblit-Remix": "ਰਲਾਉਣਾ",
    "weblit-Remix_desc": "ਕਿਸੇ ਨਵੀ ਚੀਜ਼ ਨੂੰ ਬਣਾਉਣ ਲਈ ਮੌਜੂਦਾ ਵੈਬ ਸ੍ਰੋਤ ਨੂੰ ਤਬਦੀਲ ਕਰਨਾ ",
    "weblit-DesignAccessibility": "ਡਿਜ਼ਾਈਨ ਅਤੇ ਸਹੂਲਤ",
    "weblit-DesignAccessibility_desc": "ਵੈੱਬ ਸਰੋਤ ਦੁਆਰਾ ਵਿਆਪਕ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸੰਚਾਰ ਬਣਾਉਣਾ",
    "weblit-CodingScripting": "ਕੋਡਿੰਗ / ਸਕਰਿਪਟਿੰਗ",
    "weblit-CodingScripting_desc": "ਵੈੱਬ ਤੇ ਦਿਲਚਸਪ ਅਨੁਭਵ ਬਣਾਉਣਾ",
    "weblit-Infrastructure": "ਇਨਫਰਾਸਟਰੱਕਚਰ",
    "weblit-Infrastructure_desc": "ਇੰਟਰਨੈੱਟ ਦੇ ਢੇਰ ਨੂੰ ਸਮਝਣਾ",
    "weblit-Sharing": "ਸ਼ੇਅਰਿੰਗ",
    "weblit-Sharing_desc": "ਹੋਰਾ ਨਾਲ ਵੈੱਬ ਸ੍ਰੋਤ ਬਣਾਉਣਾ",
    "weblit-SharingCollaborating": "ਸ਼ੇਅਰਿੰਗ",
    "weblit-SharingCollaborating_desc": "ਹੋਰਾ ਨਾਲ ਵੈੱਬ ਸ੍ਰੋਤ ਬਣਾਉਣਾ",
    "weblit-Collaborating": "ਸਖਿਯੋਗ ਕਰਨਾ",
    "weblit-Collaborating_desc": "ਵੈੱਬ ਸ੍ਰੋਤ ਨੂੰ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਨਾ",
    "weblit-Community": "ਸਮੁਦਾਇਕ ਪਾਰਟੀਸੀਪੇਸ਼ਨ",
    "weblit-Community_desc": "ਵੈੱਬ ਭਾਈਚਾਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣਾ ਅਤੇ ਆਪਣੇ ਅਭਿਆਸ ਨੂੰ ਸਮਝਣਾ",
    "weblit-Privacy": "ਗੁਪਤ",
    "weblit-Privacy_desc": "ਆਨਲਾਈਨ ਸ਼ੇਅਰਿੰਗ ਡਾਟਾ ਦੇ ਨਤੀਜੇ ਦੀ ਪੜਤਾਲ ",
    "weblit-OpenPractices": "ਖੁੱਲੇ ਤਜਰਬੇ",
    "weblit-OpenPractices_desc": "ਲੋਕਤੰਤਰ ਅਤੇ ਵਿਆਪਕ ਦੁਆਰਾ ਵਰਤਣ ਯੋਗ ਵੈੱਬ ਨੂੰ ਰੱਖਣ ਲਈ ਮਦਦ ਕਰਨਾ ",
    "Exploring_strand": "ਲਭਣਾ",
    "Building_strand": "ਇਮਾਰਤ",
    "Connecting_strand": "Connecting"
};

WebLiteracyClient.prototype.langs["pt"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navegação",
    "weblit-Navigation_desc": "Usar ferramentas de software para navegar na web",
    "weblit-WebMechanics": "Mecânica da web",
    "weblit-WebMechanics_desc": "Compreender o ecossistema da web",
    "weblit-Search": "Buscar",
    "weblit-Search_desc": "Encontrar informação, pessoas e recursos pela web",
    "weblit-Credibility": "Credibilidade",
    "weblit-Credibility_desc": "Avaliar criticamente informações encontradas na web",
    "weblit-Security": "Segurança",
    "weblit-Security_desc": "Manter sistemas, identidades e conteúdo seguros",
    "weblit-Composing": "Compor para a web",
    "weblit-Composing_desc": "Criar e curar conteúdo para a web",
    "weblit-Remix": "Remixando",
    "weblit-Remix_desc": "Modificar os recursos existentes na web para criar algo novo",
    "weblit-DesignAccessibility": "Design e Acessibilidade",
    "weblit-DesignAccessibility_desc": "Criar comunicações universalmente efetivas por meio de recursos web",
    "weblit-CodingScripting": "Escrever códigos/scripts",
    "weblit-CodingScripting_desc": "Criar experiências interativas na web",
    "weblit-Infrastructure": "Infraestrutura",
    "weblit-Infrastructure_desc": "Compreender a pilha da Internet",
    "weblit-Sharing": "Compartilhar",
    "weblit-Sharing_desc": "Criar recursos web conjuntamente",
    "weblit-SharingCollaborating": "Compartilhar",
    "weblit-SharingCollaborating_desc": "Criar recursos web conjuntamente",
    "weblit-Collaborating": "Colaboração",
    "weblit-Collaborating_desc": "Prover acesso a recursos web",
    "weblit-Community": "Participação da Comunidade",
    "weblit-Community_desc": "Envolver-se com comunidades web e entender suas práticas",
    "weblit-Privacy": "Privacidade",
    "weblit-Privacy_desc": "Examinar as consequências de compartilhar dados online",
    "weblit-OpenPractices": "Práticas abertas",
    "weblit-OpenPractices_desc": "Ajudar a manter a web democrática e universalmente acessível",
    "Exploring_strand": "Explorar",
    "Building_strand": "Construir",
    "Connecting_strand": "Conectar"
};
WebLiteracyClient.prototype.langs["pt-BR"] = {
    "WBLIT-MAP": "Padrão de Alfabetização para a Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navegação",
    "weblit-Navigation_desc": "Utilizando ferramentas de software para navegar na web",
    "weblit-WebMechanics": "Mecânica da web",
    "weblit-WebMechanics_desc": "Entendendo o ecossistema web",
    "weblit-Search": "Busca",
    "weblit-Search_desc": "Encontrar informações, pessoas e recursos através da web",
    "weblit-Credibility": "Credibilidade",
    "weblit-Credibility_desc": "Avaliar criticamente informações encontradas na web",
    "weblit-Security": "Segurança",
    "weblit-Security_desc": "Mantendo sistemas, identidades e conteúdo seguros",
    "weblit-Composing": "Compor para a web",
    "weblit-Composing_desc": "Criar e manter conteúdo para a web",
    "weblit-Remix": "Remixando",
    "weblit-Remix_desc": "Modificar os recursos existentes na web para criar algo novo",
    "weblit-DesignAccessibility": "Design e Acessibilidade",
    "weblit-DesignAccessibility_desc": "Criar comunicações universalmente efetivas por meio de recursos web",
    "weblit-CodingScripting": "Escrever códigos/scripts",
    "weblit-CodingScripting_desc": "Criando experiências interativas na web",
    "weblit-Infrastructure": "Infraestrutura",
    "weblit-Infrastructure_desc": "Entender a pilha da Internet",
    "weblit-Sharing": "Compartilhando",
    "weblit-Sharing_desc": "Criar recursos para web com outras pessoas",
    "weblit-SharingCollaborating": "Compartilhando",
    "weblit-SharingCollaborating_desc": "Criar recursos web com outras pessoas",
    "weblit-Collaborating": "Colaboração",
    "weblit-Collaborating_desc": "Provendo acesso a recursos web",
    "weblit-Community": "Participação da Comunidade",
    "weblit-Community_desc": "Envolver-se com comunidades web e entender suas práticas",
    "weblit-Privacy": "Privacidade",
    "weblit-Privacy_desc": "Examinar as consequências de compartilhar dados online",
    "weblit-OpenPractices": "Práticas abertas",
    "weblit-OpenPractices_desc": "Ajudar a manter a Web democrática e universalmente acessível",
    "Exploring_strand": "Explorando",
    "Building_strand": "Construindo",
    "Connecting_strand": "Conectando"
};

WebLiteracyClient.prototype.langs["ru"] = {
    "WBLIT-MAP": "Стандарт веб-грамотности",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Навигация",
    "weblit-Navigation_desc": "Использование программных средств для просмотра сети",
    "weblit-WebMechanics": "Принципы действия сети",
    "weblit-WebMechanics_desc": "Понимание экосистемы сети",
    "weblit-Search": "Поиск",
    "weblit-Search_desc": "Определение местонахождения информации, людей и ресурсов через сеть",
    "weblit-Credibility": "Заслуженное доверие",
    "weblit-Credibility_desc": "Критическая оценка информации, найденой в сети",
    "weblit-Security": "Обеспечение безопасности",
    "weblit-Security_desc": "Сохранение безопасности системы, удостоверений и содержания",
    "weblit-Composing": "Сочинительство для сети",
    "weblit-Composing_desc": "Создание и курирование содержание для сети",
    "weblit-Remix": "Создание ремиксов",
    "weblit-Remix_desc": "Изменение существующих веб-ресурсов для создания чего-то нового",
    "weblit-DesignAccessibility": "Дизайн и \"читабельность\"",
    "weblit-DesignAccessibility_desc": "Создание универсально-эффективного обмена информацией через веб-ресурсы",
    "weblit-CodingScripting": "Кодирование/Написание скриптов",
    "weblit-CodingScripting_desc": "Создание интерактивных событий в сети",
    "weblit-Infrastructure": "Инфраструктура",
    "weblit-Infrastructure_desc": "Понимание стека протоколов TCP/IP",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Участие сообщества",
    "weblit-Community_desc": "Участие в веб-сообществах и понимание их методов работы",
    "weblit-Privacy": "Конфиденциальность",
    "weblit-Privacy_desc": "Исследование последствий разделения данных онлайн",
    "weblit-OpenPractices": "\"Открытые\" методы работы",
    "weblit-OpenPractices_desc": "Помощь в сохранении сети демократичной и универсально доступной",
    "Exploring_strand": "Исследование",
    "Building_strand": "Разработка",
    "Connecting_strand": "Соединение"
};

WebLiteracyClient.prototype.langs["sl"] = {
    "WBLIT-MAP": "Zemljevid spletne pismenosti",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigacija",
    "weblit-Navigation_desc": "Z uporabo programskih orodij lahko brskate po spletu",
    "weblit-WebMechanics": "Spletni mehaniki",
    "weblit-WebMechanics_desc": "Razumevanje spletnega ekosistema",
    "weblit-Search": "Poišči",
    "weblit-Search_desc": "Na spletu poiščite informacije, osebe in sredstva",
    "weblit-Credibility": "Verodostojnost",
    "weblit-Credibility_desc": "Kritična presoja informacij, ki ste jih našli na spletu",
    "weblit-Security": "Varnost",
    "weblit-Security_desc": "Ohranjanje  varnih sistemov, identitet in vsebine ",
    "weblit-Composing": "Sestavljanje za splet",
    "weblit-Composing_desc": "Ustvarjanje in negovanje spletne vsebine",
    "weblit-Remix": "Predelava ",
    "weblit-Remix_desc": "Spreminjanje obstoječih sredstev omogoča ustvarjanje novega",
    "weblit-DesignAccessibility": "Oblikovanje in dostopnost",
    "weblit-DesignAccessibility_desc": "stvarjanje univerzalno učinkovite komunikacije preko spletnih virov",
    "weblit-CodingScripting": "Kodiranje/Skriptanje",
    "weblit-CodingScripting_desc": "Ustvarjanje interaktivnih izkušenj na spletu",
    "weblit-Infrastructure": "Infrastruktura",
    "weblit-Infrastructure_desc": "Razumevanje internetnih skladovnic",
    "weblit-Sharing": "Deljenje",
    "weblit-Sharing_desc": "Soustvarjanje spleta z drugimi ",
    "weblit-SharingCollaborating": "Deljenje",
    "weblit-SharingCollaborating_desc": "Soustvarjanje spleta z drugimi ",
    "weblit-Collaborating": "Sodelovanje",
    "weblit-Collaborating_desc": "Zagotavljanje dostopa do spletnih vsebin",
    "weblit-Community": "Sodelovanje skupnosti",
    "weblit-Community_desc": "Vključevanje v spletne skupnosti in razumevanje njihovih praks",
    "weblit-Privacy": "Zasebnost",
    "weblit-Privacy_desc": "Preučevanje posledic za izmenjavo podatkov na spletu",
    "weblit-OpenPractices": "Praksa",
    "weblit-OpenPractices_desc": "Pomagajte nam ohraniti splet demokratičen in splošno dostopen",
    "Exploring_strand": "Raziskovanje",
    "Building_strand": "Gradnja",
    "Connecting_strand": "Povezovanje"
};
WebLiteracyClient.prototype.langs["sq"] = {
    "WBLIT-MAP": "Harta e Alfabetizmit Web",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Lëvizje",
    "weblit-Navigation_desc": "Përdorimi i mjeteve software për shfletim në web",
    "weblit-WebMechanics": "Mekanika e Web-it",
    "weblit-WebMechanics_desc": "Të kuptuarit e ekosistemit të web-it",
    "weblit-Search": "Kërkim",
    "weblit-Search_desc": "Gjetje informacionesh, njerëzish dhe burimesh përmes web-it",
    "weblit-Credibility": "Besueshmëria",
    "weblit-Credibility_desc": "Vlerësimi kritik i informacionit të gjetur në web",
    "weblit-Security": "Siguri",
    "weblit-Security_desc": "Mbajtja e sistemeve, identiteteve dhe lëndës të sigurt",
    "weblit-Composing": "Të krijosh për web-in",
    "weblit-Composing_desc": "Krijim dhe përkujdesje për lëndë në web",
    "weblit-Remix": "Ripërzierje",
    "weblit-Remix_desc": "Modifikim burimesh ekzistuese web për të krijuar diçka të re",
    "weblit-DesignAccessibility": "Dizajn dhe Aksesibilitet",
    "weblit-DesignAccessibility_desc": "Krijim përmes burimesh web i komunikimeve universalisht të efektshme",
    "weblit-CodingScripting": "Programim/skriptim",
    "weblit-CodingScripting_desc": "Krijim përvojash ndërvepruese në web",
    "weblit-Infrastructure": "Infrastrukturë",
    "weblit-Infrastructure_desc": "Të kuptuarit e shtresave të Internetit",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Pjesëmarrje Në Bashkësi",
    "weblit-Community_desc": "Përfshirja në bashkësitë web dhe të kuptuarit e praktikave të tyre",
    "weblit-Privacy": "Privatësia",
    "weblit-Privacy_desc": "Shqyrtim i pasojave të ndarjes me të tjerët të të dhënave online",
    "weblit-OpenPractices": "Praktika të Hapura",
    "weblit-OpenPractices_desc": "Si të ndihmohet në ruajtjen e web-it demokratik dhe të përdorshëm nga gjithkush",
    "Exploring_strand": "Eksplorim",
    "Building_strand": "Ndërtim",
    "Connecting_strand": "Lidhje"
};


WebLiteracyClient.prototype.langs["sv"] = {
    "WBLIT-MAP": "Upptäck  Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Navigation ",
    "weblit-Navigation_desc": "Använda program verktyg för att surfa på webben",
    "weblit-WebMechanics": "Web mekanik",
    "weblit-WebMechanics_desc": "Förstå webb ekosystemet",
    "weblit-Search": "Sök",
    "weblit-Search_desc": "Hitta information, människor och resurser med hjälp av webben ",
    "weblit-Credibility": "Trovärdighet",
    "weblit-Credibility_desc": "Kritiskt utvärdera information som hittas på webben.",
    "weblit-Security": "Säkerhet",
    "weblit-Security_desc": "Hålla system, identiteter och innehåll säkra  ",
    "weblit-Composing": "Komponera för webben",
    "weblit-Composing_desc": "Skapa och underhåll innehåll för webben",
    "weblit-Remix": "Remix",
    "weblit-Remix_desc": "Modifiera existerande web resurser för att skapa något nytt.",
    "weblit-DesignAccessibility": "Design och tillgänglighet ",
    "weblit-DesignAccessibility_desc": "Skapa universella effektiva kommunikationer genom webb resurser",
    "weblit-CodingScripting": "koda/scripta ",
    "weblit-CodingScripting_desc": "Skapa interaktiva upplevelser på webben",
    "weblit-Infrastructure": "Infrastruktur ",
    "weblit-Infrastructure_desc": "Förstå Internet stacken",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Gemenskap deltagande ",
    "weblit-Community_desc": "Bli involverad i webbkommunikation och förstå dess tillämpning. ",
    "weblit-Privacy": "Integritet",
    "weblit-Privacy_desc": "Utvärdera konsekvenserna av att dela data online",
    "weblit-OpenPractices": "Öppna principer ",
    "weblit-OpenPractices_desc": "Hjälpa till att bevara webben demokratisk och universellt tillgänglig ",
    "Exploring_strand": "Upptäck",
    "Building_strand": "Bygga",
    "Connecting_strand": "Kontakta"
};


WebLiteracyClient.prototype.langs["te"] = {
    "WBLIT-MAP": "వెబ్ అక్షరాస్యత మ్యాప్",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "పయనం ",
    "weblit-Navigation_desc": "సాఫ్ట్ వేర్ ఉపకరణాలు తో వెబ్ ను ఉపయోగించట ",
    "weblit-WebMechanics": "వెబ్ యొక్క పనితీరు ",
    "weblit-WebMechanics_desc": "వెబ్ మరియు దాని అనుభంద ఉపకరణాలు ",
    "weblit-Search": "వెతకడం",
    "weblit-Search_desc": "వెబ్ ద్వారా సమాచారం, వ్యక్తులను , మరియు వనరులను గుర్తించటం",
    "weblit-Credibility": "విశ్వసనీయత",
    "weblit-Credibility_desc": "వెబ్ లో దొరికిన సమాచారాన్ని క్లిష్టంగా మూల్యాంకనం చేస్తోంది",
    "weblit-Security": "భద్రత ",
    "weblit-Security_desc": "సిస్టమ్, గుర్తింపు మరియు కాంటెంటును సురక్షితముగా కాపాడుతోంది",
    "weblit-Composing": "జాలం కొరకు వ్రాయడం",
    "weblit-Composing_desc": "వెబ్ కొరకు కాంటెంటును సృష్టిస్తోంది మరియు క్యూరెటింగ్",
    "weblit-Remix": "కలియగలుపు ",
    "weblit-Remix_desc": "ప్రస్తుతం వెబ్ లో అందుబాటులో ఉన్న వనరులను మార్పులు చేసి కొత్తవాటిని తయ్యారు చెయ్యటం ",
    "weblit-DesignAccessibility": "రూపకల్పన మరియు ప్రవేశ సౌలభ్యం",
    "weblit-DesignAccessibility_desc": "వెబ్ లోని వనరులు ద్వారా విశ్వవ్యాప్త ప్రభావవంతమైన సమాచారం ను సృష్టించటం ",
    "weblit-CodingScripting": "కోడింగ్/స్ర్కిప్టింగ్",
    "weblit-CodingScripting_desc": "వెబ్చ లో చక్కటి ప్రతిస్పందన మరియు విషయజ్ఞానం ఇచ్చే ఉపకరణాలను సృష్టించుట ",
    "weblit-Infrastructure": "మౌళికవసతులు ",
    "weblit-Infrastructure_desc": "అంతర్జాలం లో కలిగి ఉన్న పలువిధాల క్రియలను, ఉపకరణాలు అర్ధం చేసుకొనుట ",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "సంఘాలో భాగస్వామ్యం ",
    "weblit-Community_desc": "వెబ్ లో పొందుపరిచిన సమాచారం యొక్క మూల స్తలం నుంచి దాని వేరొక చోటుకు మార్చటం ",
    "weblit-Privacy": "అంతరంగికత",
    "weblit-Privacy_desc": "అంతర్జాలంలో సమాచారం ను అందుబాటులో ఉంచటం వల్ల కలిగే పరిణామాలను పరీక్షించటం ",
    "weblit-OpenPractices": "పదువురికి ఉపయోగపడే కార్యాలు ",
    "weblit-OpenPractices_desc": "వెబ్ ను ఒక ప్రజాస్వామ్యంగా ఉంచుతూ అదే విధంగా దానిని విశ్వవ్యాప్తంగా అందుబాటులో ఉంచుటకు సహాయపడుట ",
    "Exploring_strand": "శోధన ",
    "Building_strand": "తయ్యారుచేయుట ",
    "Connecting_strand": "అనుసంధానించటం "
};

WebLiteracyClient.prototype.langs["th-TH"] = {
    "WBLIT-MAP": "แผนที่ความรู้เว็บ",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "การนำทาง",
    "weblit-Navigation_desc": "ใช้เครื่องมือซอฟต์แวร์ในการเรียกค้นและสำรวจเว็บ",
    "weblit-WebMechanics": "ช่างกลเว็บ",
    "weblit-WebMechanics_desc": "การทำความเข้าใจกับระบบนิเวศของเว็บ",
    "weblit-Search": "ค้นหา",
    "weblit-Search_desc": "ระบุข้อมูล, ผู้คนและทรัพยากรต่าง ๆ ผ่านเว็บ",
    "weblit-Credibility": "ความน่าเชื่อถือ",
    "weblit-Credibility_desc": "การประเมินผลข้อมูลที่พบบนเว็บอย่างแน่นอน",
    "weblit-Security": "ความปลอดภัย",
    "weblit-Security_desc": "การเก็บระบบ, สถานะและข้อมูลให้ปลอดภัย",
    "weblit-Composing": "การเขียนสำหรับเว็บ",
    "weblit-Composing_desc": "การสร้างและรักษาเนื้อหาสำหรับเว็บ",
    "weblit-Remix": "เรียบเรียง",
    "weblit-Remix_desc": "แก้ไขทรัพยากรเว็บที่มีอยู่เพื่อสร้างสรรค์สิ่งใหม่",
    "weblit-DesignAccessibility": "การออกแบบและการเข้าถึง",
    "weblit-DesignAccessibility_desc": "การสร้างการสื่อสารที่มีประสิทธิภาพในระดับสากลผ่านข้อมูลบนเว็บ",
    "weblit-CodingScripting": "การโค๊ด/สคริป",
    "weblit-CodingScripting_desc": "การสร้างประสบการณ์การโต้ตอบบนเว็บ",
    "weblit-Infrastructure": "โครงสร้างพื้นฐาน",
    "weblit-Infrastructure_desc": "เข้าใจแต่ละชั้นของอินเตอร์เน็ท",
    "weblit-Sharing": "แบ่งปัน",
    "weblit-Sharing_desc": "การสร้างทรัพยากรของเว็บกับคนอื่น",
    "weblit-SharingCollaborating": "แบ่งปัน",
    "weblit-SharingCollaborating_desc": "การสร้างทรัพยากรของเว็บกับคนอื่น",
    "weblit-Collaborating": "ร่วมมือ",
    "weblit-Collaborating_desc": "การเข้าถึงทรัพยากรของเว็บ",
    "weblit-Community": "การมีส่วนร่วมในชุมชน",
    "weblit-Community_desc": "การมีส่วนร่วมในชุมชนบนเว็บและเข้าใจการปฏิบัติของพวกเขา",
    "weblit-Privacy": "ความเป็นส่วนตัว",
    "weblit-Privacy_desc": "ตรวจสอบผลที่ตามมาของการแบ่งปันข้อมูลออนไลน์",
    "weblit-OpenPractices": "การปฏิบัติแบบเปิดเผย",
    "weblit-OpenPractices_desc": "ช่วยให้เว็บเป็นแบบระบบประชาธิปไตยและสามารถเข้าถึงได้ในระดับสากล",
    "Exploring_strand": "สำรวจ",
    "Building_strand": "สร้าง",
    "Connecting_strand": "การเชื่อมต่อ"
};






WebLiteracyClient.prototype.langs["vi-VN"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "Định hướng",
    "weblit-Navigation_desc": "Sử dụng phần mềm để lướt web",
    "weblit-WebMechanics": "Những thợ cơ khí Web",
    "weblit-WebMechanics_desc": "Hiểu hệ sinh thái web",
    "weblit-Search": "Tìm kiếm",
    "weblit-Search_desc": "Định vị thông tin, con người và nguồn lực thông qua web",
    "weblit-Credibility": "Độ tin cậy",
    "weblit-Credibility_desc": "Đánh giá nghiêm túc những thông tin tìm được trên Web",
    "weblit-Security": "Bảo mật",
    "weblit-Security_desc": "Giữ cho hệ thống, danh tính, và nội dung được an toàn",
    "weblit-Composing": "Tổng hợp cho web",
    "weblit-Composing_desc": "Tạo ra và đóng góp nội dung cho web",
    "weblit-Remix": "Phối lại",
    "weblit-Remix_desc": "Chỉnh sửa những tài nguyên web hiện có để tạo nên thứ mới",
    "weblit-DesignAccessibility": "Thiết kế và Khả năng truy cập",
    "weblit-DesignAccessibility_desc": "Tạo nên những liên lạc hiệu quả toàn cầu qua nguồn tài nguyên web",
    "weblit-CodingScripting": "Lập trình/viết mã",
    "weblit-CodingScripting_desc": "Tạo ra những trải nghiệm tương tác trên web",
    "weblit-Infrastructure": "Cơ sở hạ tầng",
    "weblit-Infrastructure_desc": "Hiểu thông tin về Internet",
    "weblit-Sharing": "Sharing",
    "weblit-Sharing_desc": "Creating web resources with others",
    "weblit-SharingCollaborating": "Sharing",
    "weblit-SharingCollaborating_desc": "Creating web resources with others",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Providing access to web resources",
    "weblit-Community": "Sự tham gia vào cộng đồng:",
    "weblit-Community_desc": "Tham gia các cộng đồng web và hiểu những hoạt động của họ",
    "weblit-Privacy": "Riêng tư",
    "weblit-Privacy_desc": "Xem xét những hậu quả của việc chia sẻ dữ liệu trực tuyến",
    "weblit-OpenPractices": "Những thực tập mở",
    "weblit-OpenPractices_desc": "Giúp giữ cho mạng có tính dân chủ và có thể sử dụng được toàn cầu",
    "Exploring_strand": "Khám phá",
    "Building_strand": "cấu trúc",
    "Connecting_strand": "Kết nối"
};



WebLiteracyClient.prototype.langs["zh-TW"] = {
    "WBLIT-MAP": "Web 素養一覽",
    "WBLIT-VERSION": "1.1.0",
    "weblit-Navigation": "瀏覽",
    "weblit-Navigation_desc": "使用軟體工具瀏覽網站",
    "weblit-WebMechanics": "Web 原理與操作",
    "weblit-WebMechanics_desc": "瞭解網路生態",
    "weblit-Search": "搜尋",
    "weblit-Search_desc": "透過網路找出資訊、人、以及資源。",
    "weblit-Credibility": "網路資訊可信度查驗",
    "weblit-Credibility_desc": "謹慎地評估在網路上找到的資訊",
    "weblit-Security": "資訊安全",
    "weblit-Security_desc": "保持系統、帳號、以及內容的安全性",
    "weblit-Composing": "在網路上撰寫作品",
    "weblit-Composing_desc": "在 Web 上建立並編選內容",
    "weblit-Remix": "混搭重組",
    "weblit-Remix_desc": "修改現有的網路資源，並用來創造一些新的東西",
    "weblit-DesignAccessibility": "設計與無障礙",
    "weblit-DesignAccessibility_desc": "透過網站資源建立無疆界的溝通",
    "weblit-CodingScripting": "程式寫作、腳本語言",
    "weblit-CodingScripting_desc": "打造 Web 上的互動體驗",
    "weblit-Infrastructure": "基礎架構",
    "weblit-Infrastructure_desc": "了解網際網路架構",
    "weblit-Sharing": "分享",
    "weblit-Sharing_desc": "與他人合作打造 Web 資源",
    "weblit-SharingCollaborating": "分享",
    "weblit-SharingCollaborating_desc": "與他人合作打造 Web 資源",
    "weblit-Collaborating": "協作",
    "weblit-Collaborating_desc": "提供 Web 資源的存取",
    "weblit-Community": "社群參與",
    "weblit-Community_desc": "參與網路社群並且瞭解他們的作法",
    "weblit-Privacy": "隱私政策",
    "weblit-Privacy_desc": "評估在線上分享資料後的影響",
    "weblit-OpenPractices": "實踐開放",
    "weblit-OpenPractices_desc": "協助讓 Web 保持民主、隨處可用",
    "Exploring_strand": "探索",
    "Building_strand": "打造",
    "Connecting_strand": "連結"
};
return WebLiteracyClient;

}));
