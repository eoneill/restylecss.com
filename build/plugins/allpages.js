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

    metadata.pages = pages.sort(function(a, b) {
      a = (a && (a.shortpath || a.path)) || "";
      b = (b && (b.shortpath || b.path)) || "";

      return (a === b) ? 0 : ((a < b) ? -1 : 1);
    });

    metalsmith.metadata(metadata);

    done();
  };
};
