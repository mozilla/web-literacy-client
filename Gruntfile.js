module.exports = function(grunt) {

  var path = require('path');

  var BASE_FILENAME = 'latest/weblitmap.json';
  var STRINGS_FOLDER = 'latest/strings/';
  var FUNCTION_NAME = 'WebLiteracyClient';

  grunt.initConfig({
    clean: ['latest/strings', 'dist'],
    convert: {
      strings: {
        src: 'latest/weblitmap.json',
        dest: 'latest/'
      }
    },
    concat: {
      options: {
        banner: grunt.file.read('./src/umd.header.js'),
        footer: grunt.file.read('./src/umd.footer.js'),
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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('transifex', 'Download files from transifex', function() {
    var download = require('webmaker-download-locales');
    var done = this.async();
    download('webmaker', 'latest/strings', function(err, data) {
      done();
    });
  });

  grunt.registerMultiTask('convert', 'Convert map to locale files', function() {

    function specToTransifex(json) {
      var output = {};

      // Add title
      output[json.titleKey] = json.title;

      json.literacies.forEach(function(item) {
        // Check duplicate keys
        if (output[item.tag]) {
          grunt.fail.fatal('There was a duplicate tag found : ' + item.tag + ' cannot be both "' + output[item.tag] + '" and "' + item.term + '"');
        }
        output[item.tag] = item.term;
        output[item.tag + json.descriptionSuffix] = item.description;
        if (item.deprecates.length) {
          item.deprecates.forEach(function(alternate) {
            output[alternate] = item.term;
            output[alternate + json.descriptionSuffix] = item.description;
          });
        }
      });
      return output;
    }

    this.files.forEach(function(file) {
      var contents = file.src.filter(function(filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        var json = grunt.file.readJSON(filepath);
        var transifex = specToTransifex(json);

        var archiveDir = 'archive/' + json.version + '/';

        // Write transifex file
        var transifexFileName = 'weblitmap_strings.json';
        grunt.file.write(file.dest + transifexFileName, JSON.stringify(transifex, null, '  '));
        grunt.log.writeln('File "' + file.dest + transifexFileName + '" created.');

        // Archive
        // Copy main file to archive
        var specFileName = path.basename(filepath, '.json') + '.json';

        grunt.file.write(archiveDir + specFileName, JSON.stringify(json, null, '  '));
        grunt.log.writeln('File "' + archiveDir + specFileName + '" created.');

        grunt.file.write(archiveDir + transifexFileName, JSON.stringify(transifex, null, '  '));
        grunt.log.writeln('File "' + archiveDir + transifexFileName + '" created.');

      });

    });

  });

  grunt.registerTask('build', ['clean', 'convert', 'transifex', 'concat']);
  grunt.registerTask('download', ['clean', 'transifex']);

};
