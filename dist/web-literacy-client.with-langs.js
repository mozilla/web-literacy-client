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















WebLiteracyClient.prototype.langs["en-CA"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Sharing and Collaborating",
    "weblit-SharingCollaborating_desc": "Jointly creating and providing access to web resources",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Creating web resources with others",
    "weblit-Community": "Community Participation",
    "weblit-Community_desc": "Getting involved in web communities and understanding their practices",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "Examining the consequences of sharing data online",
    "weblit-OpenPractices": "Open Practices",
    "weblit-OpenPractices_desc": "Helping to keep the Web democratic and universally accessible"
};
WebLiteracyClient.prototype.langs["en-GB"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Sharing and Collaborating",
    "weblit-SharingCollaborating_desc": "Jointly creating and providing access to web resources",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Creating web resources with others",
    "weblit-Community": "Community Participation",
    "weblit-Community_desc": "Getting involved in web communities and understanding their practices",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "Examining the consequences of sharing data online",
    "weblit-OpenPractices": "Open Practices",
    "weblit-OpenPractices_desc": "Helping to keep the Web democratic and universally accessible"
};














WebLiteracyClient.prototype.langs["fr"] = {
    "WBLIT-MAP": "Carte de la Littéracie Web",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Partager et collaborer",
    "weblit-SharingCollaborating_desc": "Créer et publier ensemble des ressources web",
    "weblit-Collaborating": "Collaborating",
    "weblit-Collaborating_desc": "Creating web resources with others",
    "weblit-Community": "Participation communautaire",
    "weblit-Community_desc": "Rejoindre des communautés en ligne et comprendre leurs usages",
    "weblit-Privacy": "Vie privée",
    "weblit-Privacy_desc": "Considérer les conséquences du partage de données en ligne",
    "weblit-OpenPractices": "Pratiques ouvertes",
    "weblit-OpenPractices_desc": "Helping to keep the Web democratic and universally accessible"
};








WebLiteracyClient.prototype.langs["id"] = {
    "WBLIT-MAP": "Peta Literasi Web",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Berbagi dan Berkolaborasi",
    "weblit-SharingCollaborating_desc": "Bersama menciptakan dan menyediakan akses ke sumber daya web",
    "weblit-Collaborating": "Berkolaborasi",
    "weblit-Collaborating_desc": "Membuat sumber daya dengan orang lain",
    "weblit-Community": "Partisipasi Komunitas",
    "weblit-Community_desc": "Terlibat dalam komunitas web dan memahami praktik mereka",
    "weblit-Privacy": "Privasi",
    "weblit-Privacy_desc": "Meneliti konsekuensi dari berbagi data secara online",
    "weblit-OpenPractices": "Praktik Terbuka",
    "weblit-OpenPractices_desc": "Membantu menjaga demokrasi Web dan kemampuan untuk dapat diakses secara universal"
};




WebLiteracyClient.prototype.langs["km"] = {
    "WBLIT-MAP": "Web Literacy Map",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-DesignAccessibility_desc": "ការ​បង្កើត​ទំនាក់ទំនង​មាន​ប្រសិទ្ធភាព​ជា​សកល​តាម​រយៈ​ធនធាន",
    "weblit-CodingScripting": "ការ​កូដ/ការ​ស្គ្រីប",
    "weblit-CodingScripting_desc": "ការ​បង្កើត​បទពិសោធន៍​​នៃ​អន្តរកម្ម​នៅ​លើ​បណ្ដាញ",
    "weblit-Infrastructure": "ហេដ្ឋារចនាសម្ព័ន្ធ",
    "weblit-Infrastructure_desc": "ការ​យល់​ពី​ជង់​អ៊ីនធឺណិត​",
    "weblit-SharingCollaborating": "ការ​ចែករំលែក និង​ការ​សហការ",
    "weblit-SharingCollaborating_desc": "ដោយ​ចូលរួម​បង្កើត និង​ផ្ដល់​​ការ​ចូល​ដំណើរការ​ធនធាន​បណ្ដាញ",
    "weblit-Collaborating": "ការ​សហការ",
    "weblit-Collaborating_desc": "បង្កើត​ធនធាន​បណ្ដាញ​ជាមួយ​អ្នក​ដទៃ",
    "weblit-Community": "ការ​ចូលរួម​សហគមន៍",
    "weblit-Community_desc": "ទាក់ទង​សហគមន៍​បណ្ដាញ និង​យល់​ពី​ការ​អនុវត្ត​របស់​ពួកគេ",
    "weblit-Privacy": "ភាព​ឯកជន",
    "weblit-Privacy_desc": "ការ​ពិនិត្យមើល​លទ្ធផល​នៃ​ការ​ចែករំលែក​ទិន្នន័យ​លើ​បណ្ដាញ",
    "weblit-OpenPractices": "បើក​ការ​​អនុវត្ត",
    "weblit-OpenPractices_desc": "ជួយ​ធ្វើ​ឲ្យ​បណ្ដាញអាចចូលដំណើរការ​ដោយ​សេរី និង​​ជា​សកល"
};















WebLiteracyClient.prototype.langs["nl"] = {
    "WBLIT-MAP": "Webeducatiekaart",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Delen en samenwerken",
    "weblit-SharingCollaborating_desc": "Gezamenlijk webbronnen creëren en toegankelijk maken",
    "weblit-Collaborating": "Samenwerking",
    "weblit-Collaborating_desc": "Webbronnen maken met anderen",
    "weblit-Community": "Gemeenschapsparticipatie",
    "weblit-Community_desc": "Betrokken raken bij webgemeenschappen en hun werkzaamheden begrijpen",
    "weblit-Privacy": "Privacy",
    "weblit-Privacy_desc": "De consequenties van gegevens online delen onderzoeken",
    "weblit-OpenPractices": "Open technieken",
    "weblit-OpenPractices_desc": "Helpen om het web democratisch en universeel toegankelijk te houden"
};





WebLiteracyClient.prototype.langs["pt-BR"] = {
    "WBLIT-MAP": "Padrão de Alfabetização para a Web",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "Compartilhar e Colaborar",
    "weblit-SharingCollaborating_desc": "Criar e prover acesso conjunto a recursos web",
    "weblit-Collaborating": "Colaboração",
    "weblit-Collaborating_desc": "Criar recursos para web com outras pessoas",
    "weblit-Community": "Participação da Comunidade",
    "weblit-Community_desc": "Envolver-se com comunidades web e entender suas práticas",
    "weblit-Privacy": "Privacidade",
    "weblit-Privacy_desc": "Examinar as consequências de compartilhar dados online",
    "weblit-OpenPractices": "Práticas abertas",
    "weblit-OpenPractices_desc": "Ajudar a manter a Web democrática e universalmente acessível"
};












WebLiteracyClient.prototype.langs["th-TH"] = {
    "WBLIT-MAP": "แผนที่ความรู้เว็บ",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "แบ่งปันและการทำงานร่วมกัน",
    "weblit-SharingCollaborating_desc": "ร่วมกันสร้างและทำให้การเข้าถึงทรัพยากรของเว็บ",
    "weblit-Collaborating": "ร่วมมือ",
    "weblit-Collaborating_desc": "การสร้างทรัพยากรของเว็บกับคนอื่น",
    "weblit-Community": "การมีส่วนร่วมในชุมชน",
    "weblit-Community_desc": "การมีส่วนร่วมในชุมชนบนเว็บและเข้าใจการปฏิบัติของพวกเขา",
    "weblit-Privacy": "ความเป็นส่วนตัว",
    "weblit-Privacy_desc": "ตรวจสอบผลที่ตามมาของการแบ่งปันข้อมูลออนไลน์",
    "weblit-OpenPractices": "การปฏิบัติแบบเปิดเผย",
    "weblit-OpenPractices_desc": "ช่วยให้เว็บเป็นแบบระบบประชาธิปไตยและสามารถเข้าถึงได้ในระดับสากล"
};










WebLiteracyClient.prototype.langs["zh-TW"] = {
    "WBLIT-MAP": "Web 素養一覽",
    "WBLIT-VERSION": "1.0.0",
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
    "weblit-SharingCollaborating": "分享和協作",
    "weblit-SharingCollaborating_desc": "共同建立並提供網路資源",
    "weblit-Collaborating": "協作",
    "weblit-Collaborating_desc": "與他人合作打造 Web 資源",
    "weblit-Community": "社群參與",
    "weblit-Community_desc": "參與網路社群並且瞭解他們的作法",
    "weblit-Privacy": "隱私政策",
    "weblit-Privacy_desc": "評估在線上分享資料後的影響",
    "weblit-OpenPractices": "實踐開放",
    "weblit-OpenPractices_desc": "協助讓 Web 保持民主、舉世皆可取用"
};
return WebLiteracyClient;

}));
