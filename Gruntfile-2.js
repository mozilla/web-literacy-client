module.exports = function(grunt) {

  var ARCHIVE_DIR = 'archive/';
  var LOCALE_DIR = 'locale/';
  var SRC_DIR = 'src/';
  var DIST_DIR = 'dist/';

  grunt.initConfig({
    clean: [ DIST_DIR, LOCALE_DIR ],
    convert: {
      options: [
        archiveDir: ARCHIVE_DIR
      ],
      strings: {
        src: SRC_DIR + 'weblitmap.json',
        dest: DIST_DIR
      }
    },
    concat: {
      options: {
        banner: grunt.file.read('./grunt/umd.header.js'),
        footer: grunt.file.read('./grunt/umd.footer.js'),
        process: function(src, filepath) {

          // Format the template
          if (filepath.match(BASE_FILENAME)) {
            var json = JSON.parse(src);
            return FUNCTION_NAME + '.prototype.template = ' + JSON.stringify(json.literacies, null, '  ') + ';';

          // Format each locale file
          } else if (filepath.match(STRINGS_FOLDER)) {
            var lang = filepath.replace(STRINGS_FOLDER, '').split('/')[0];
            return FUNCTION_NAME + '.prototype.langs["'+ lang +'"] = ' + src + ';';

          // Return as is
          } else {
            return src;
          }
        }
      },
      dist: {
        src: ['src/web-literacy-client.js', BASE_FILENAME, STRINGS_FOLDER + '**/*.json'],
        dest: 'dist/web-literacy-client.with-langs.js',
      }
    }
  });

  grunt.registerTask('convert', 'Convert map to locale files', require('./grunt/convert-task.js');

};
