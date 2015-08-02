"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");

module.exports = function(config) {

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];

      if (minimatch(file, "**/*.html")) {

        if (!data.path) {
          data.isIndex = true;
        }
        data.shortpath = (typeof data.path === "string" ? data.path : file).replace(/\/?index\.html$/, "");

        // add an ID if it doesn't exist
        data.id = data.id || ((data.shortpath || "homepage").replace(/[^a-z0-9_-]/gi, "_"));

        // expose everything on a `page` sub node
        data.page = data.page ? merge(data.page, data) : data;
      }
    });
    done();
  };
};
