module.exports = function(grunt) {

  // Directories
  var ARCHIVE_DIR = 'archive/';
  var LOCALE_DIR = 'locale/';
  var SRC_DIR = 'src/';
  var DIST_DIR = 'dist/';

  // File names
  var TEMPLATE_FILENAME = 'weblitmap.json';
  var JS_FILENAME = 'web-literacy-client.js'
  var JS_FILENAME_WITH_LANGS ='web-literacy-client.with-langs.js'

  // Transifex
  var TRANSIFEX_APP = 'webliteracymap';
  var SUPPORTED_LANGS = [ 'en_US', 'fr', 'zh_TW', 'th_TH', 'pt_BR', 'id', 'nl', 'km', 'en_CA', 'en_GB'];

  // For JS processing
  var FUNCTION_NAME = 'WebLiteracyClient';

  grunt.initConfig({
    clean: {
      locales: [ LOCALE_DIR ],
      dist: [ DIST_DIR]
    },
    convert: {
      dist: {
        src: SRC_DIR + TEMPLATE_FILENAME,
        dest: DIST_DIR
      }
    },
    concat: {
      options: {
        banner: grunt.file.read('./grunt/umd.header.js'),
        footer: grunt.file.read('./grunt/umd.footer.js')
      },
      basic: {
        src: [SRC_DIR + JS_FILENAME, SRC_DIR + TEMPLATE_FILENAME, DIST_DIR + '*.json'],
        dest: DIST_DIR + JS_FILENAME,
        options: {
          process: function(src, filepath) {

            // Template file (weblitmap.json)
            if (filepath.match(SRC_DIR + TEMPLATE_FILENAME)) {
              var json = JSON.parse(src);
              return FUNCTION_NAME + '.prototype.template = ' + JSON.stringify(json.literacies, null, '  ') + ';';

            // English strings
            } else if (filepath.match(DIST_DIR)) {
              return FUNCTION_NAME + '.prototype.langs["en"] = ' + src + ';';

            // Other
            } else {
              return src;
            }
          }
        }
      },
      withLocales: {
        src: [SRC_DIR + JS_FILENAME, SRC_DIR + TEMPLATE_FILENAME, DIST_DIR + '*.json', LOCALE_DIR + '**/weblitmap.json'],
        dest: DIST_DIR + JS_FILENAME_WITH_LANGS,
        options: {
          process: function(src, filepath) {

            // Template file (weblitmap.json)
            if (filepath.match(SRC_DIR + TEMPLATE_FILENAME)) {
              var json = JSON.parse(src);
              return FUNCTION_NAME + '.prototype.template = ' + JSON.stringify(json.literacies, null, '  ') + ';';

            // English strings
            } else if (filepath.match(DIST_DIR) && filepath.match('json')) {
              return FUNCTION_NAME + '.prototype.langs["en"] = ' + src + ';';

            // Downloaded locales
            } else if (filepath.match(LOCALE_DIR)) {
              var lang = filepath.split('/').splice(-2, 1)[0];
              if (SUPPORTED_LANGS.indexOf(lang) >= 0) {
                grunt.log.writeln('Language "' + lang + '" added.');
                return FUNCTION_NAME + '.prototype.langs["'+ lang.replace("_", "-") +'"] = ' + src + ';';
              }

            // Other
            } else {
              return src;
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerMultiTask('convert', 'Convert map to locale files', require('./grunt/convert-task.js')(grunt));
  grunt.registerTask('transifex', 'Download files from transifex', require('./grunt/transifex-task.js')(grunt, TRANSIFEX_APP, LOCALE_DIR));

  // MAIN GRUNT TASKS
  grunt.registerTask('generate', ['clean:dist', 'convert']);
  grunt.registerTask('build', ['clean:locales', 'transifex', 'concat:basic', 'concat:withLocales']);
};
