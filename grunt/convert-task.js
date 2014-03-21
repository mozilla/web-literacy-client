module.exports = function convert() {
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
  };

  var filepath = BASE_FILENAME;
  var spec = grunt.file.readJSON(filepath);
  var transifex = specToTransifex(spec);

  // Write transifex file
  var transifexFileName = 'weblitmap_strings.json';
  grunt.file.write(file.dest + transifexFileName, JSON.stringify(transifex, null, '  '));
  grunt.log.writeln('File "' + file.dest + transifexFileName + '" created.');
};
