module.exports = function(grunt) {

  // Directories
  var ARCHIVE_DIR = 'archive/';
  var LOCALE_DIR = 'locale/';
  var SRC_DIR = 'src/';
  var DIST_DIR = 'dist/';

  // File names
  var TEMPLATE_FILENAME = 'weblitmap.json';
  var JS_FILENAME = 'web-literacy-client.js'

  // Transifex
  // TODO: add correct locales
  var TRANSIFEX_APP = 'webmaker';

  // For JS processing
  var FUNCTION_NAME = 'WebLiteracyClient';

  grunt.initConfig({
    clean: [ DIST_DIR, LOCALE_DIR ],
    convert: {
      dist: {
        src: SRC_DIR + TEMPLATE_FILENAME,
        dest: DIST_DIR
      }
    },
    concat: {
      options: {
        banner: grunt.file.read('./grunt/umd.header.js'),
        footer: grunt.file.read('./grunt/umd.footer.js'),
        process: function(src, filepath) {


          // Template file (weblitmap.json)
          if (filepath.match(SRC_DIR + TEMPLATE_FILENAME)) {
            var json = JSON.parse(src);
            return FUNCTION_NAME + '.prototype.template = ' + JSON.stringify(json.literacies, null, '  ') + ';';

          // Downloaded locales
          } else if (filepath.match(LOCALE_DIR)) {
            var lang = filepath.split('/').splice(-2, 1);
            return FUNCTION_NAME + '.prototype.langs["'+ lang +'"] = ' + src + ';';

          // Other
          } else {
            return src;
          }
        }
      },
      dist: {
        src: [SRC_DIR + JS_FILENAME, SRC_DIR + TEMPLATE_FILENAME, LOCALE_DIR + '**/*.json'],
        dest: DIST_DIR + 'web-literacy-client.with-langs.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerMultiTask('convert', 'Convert map to locale files', require('./grunt/convert-task.js')(grunt));
  grunt.registerTask('transifex', 'Download files from transifex', require('./grunt/transifex-task.js')(grunt, TRANSIFEX_APP, LOCALE_DIR));

  // MAIN GRUNT TASKS
  grunt.registerTask('generate', ['clean', 'convert']);
  grunt.registerTask('build', ['clean', 'transifex', 'concat']);

};
