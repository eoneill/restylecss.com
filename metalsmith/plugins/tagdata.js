"use strict";

var minimatch = require("minimatch");

module.exports = function(options) {

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    var tagpages;
    var alltags;

    Object.keys(files).forEach(function(file) {
      var data = files[file];
      // if the file pattern matches...
      if (minimatch(file, "**/*.html")) {
        if (data.tag) {
          tagpages = tagpages || {};
          tagpages[data.tag] = data;
        }
        else if (data.tags) {
          alltags = alltags || {};
          data.tags.forEach(function(tag) {
            alltags[tag] = alltags[tag] || [];
            alltags[tag].push(data);
          });
        }
      }
    });

    if (tagpages) {
      metadata.tagpages = tagpages;
    }

    if (alltags) {
      metadata.alltags = alltags;
    }

    if (tagpages || alltags) {
      metalsmith.metadata(metadata);
    }

    done();
  }
};
