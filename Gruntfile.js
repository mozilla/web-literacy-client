module.exports = function(grunt) {

  grunt.initConfig({
    convert: {
      strings: {
        src: 'latest/weblitmap.json',
        dest: 'latest/'
      }
    }
  });

  grunt.registerMultiTask('convert', 'Convert map to locale files', function() {

    var path = require('path');

    function specToTransifex(json) {
      var output = {};

      // Add title
      output[json.titleKey] = json.title;

      json.literacies.forEach(function(item) {
        // Check duplicate keys
        if (output[item.key]) {
          grunt.fail.fatal('There was a duplicate key found in ' + f + ', ' + item.key + ' cannot be both "' + output[item.key] + '" and "' + item.term + '"');
        }
        output[item.key] = item.term;
        output[item.key + json.descriptionSuffix] = item.description;
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
        var transifexFileName = 'strings/' + path.basename(filepath, '.json') + '_strings_default' + '.json';
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

  grunt.registerTask('build', ['convert']);

};
