"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");

module.exports = function(options) {

  // merge in the options
  options = merge({
    pattern: "**/*.html"
  }, options);

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];

      // if the file pattern matches...
      if (minimatch(file, options.pattern)) {
        data.permaname = data.permaname || data.title;
      }
    });
    done();
  };
};
