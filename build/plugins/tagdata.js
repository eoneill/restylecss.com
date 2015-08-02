"use strict";

module.exports = function(options) {

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    var tagpages;
    var alltags;

    Object.keys(files).forEach(function(file) {
      var page = files[file];

      if (page.tag) {
        tagpages = tagpages || {};
        tagpages[page.tag] = page;
      }
      else if (page.tags) {
        alltags = alltags || {};
        page.tags.forEach(function(tag) {
          alltags[tag] = alltags[tag] || [];
          alltags[tag].push(page);
        });
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
  };
};
