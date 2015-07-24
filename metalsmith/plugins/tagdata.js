"use strict";

var minimatch = require("minimatch");

module.exports = function(options) {

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    var collections = metadata.collections;

    var tagpages;
    var alltags;

    Object.keys(collections).forEach(function(name) {
      var collection = collections[name];
      collection.forEach(function(page) {
        if (page.tag) {
          tagpages = tagpages || {};
          tagpages[page.tag] = data;
        }
        else if (page.tags) {
          alltags = alltags || {};
          page.tags.forEach(function(tag) {
            alltags[tag] = alltags[tag] || [];
            alltags[tag].push(page);
          });
        }
      });
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
