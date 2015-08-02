"use strict";

var minimatch = require("minimatch");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var aside = data.aside;

      if (aside || minimatch(file, "**/*.html")) {
        if (aside === true || aside === undefined) {
          aside = data.isIndex ? data.shortpath : data.collection;
        }

        if (aside) {
          aside = [].concat(aside).map(function(name) {
            var collection = metalsmith.metadata().collections[name];
            return {
              title: config.site.collections && config.site.collections[name] || name,
              topics: collection.topics
            };
          });
        }
        else {
          aside = false;
        }

        data.aside = aside;

        // play nicely with pagedata
        if (data.page) {
          data.page.aside = data.aside;
        }
      }
    });

    done();
  };
};
