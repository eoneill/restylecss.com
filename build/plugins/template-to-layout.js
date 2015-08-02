"use strict";

module.exports = function(config) {

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      if (data.template) {
        data.layout = data.template;
      }
    });

    done();
  };
};
