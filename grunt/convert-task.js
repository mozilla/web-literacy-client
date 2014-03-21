var path = require('path');

// Prepare the transifex-formatted file given template json
function specToTransifex(json) {
  var output = {};
  // Title
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

module.exports = function(grunt) {
  return function() {
    this.files.forEach(function(file) {
      file.src.forEach(function(filepath) {
        var spec = grunt.file.readJSON(filepath);
        var transifex = specToTransifex(spec);

        // Write transifex file
        var transifexFileName = path.basename(filepath, '.json') + '_strings.' + spec.version + '.json';
        grunt.file.write(file.dest + transifexFileName, JSON.stringify(transifex, null, '  '));
        grunt.log.writeln('File "' + file.dest + transifexFileName + '" created.');
      });
    });
  };
};
