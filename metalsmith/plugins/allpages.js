"use strict";

var minimatch = require("minimatch");
var merge = require("lodash.merge");

module.exports = function(options) {
  options = merge({
    pattern: "**/*.html",
    exclude: null
  }, options);

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    var pages = [];

    Object.keys(files).forEach(function(file) {

      var isExcluded;

      if (minimatch(file, options.pattern)) {

        isExcluded = options.exclude && options.exclude.some(function(exclude) {
          if (minimatch(file, exclude)) {
            return true;
          }
        });

        if (!isExcluded) {
          pages.push(files[file]);
        }
      }
    });

    metadata.pages = pages;

    metalsmith.metadata(metadata);

    done();
  }
};
