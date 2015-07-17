"use strict";

var merge = require("lodash.merge");

module.exports = function() {
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];

      if (typeof data.path === "string") {
        // add an ID if it doesn't exist
        data.id = data.id || ((data.path || "index").replace(/[^a-z0-9_-]/gi, "--"));
      }


      // expose everything on a `page` sub node
      data.page = merge(data.page || {}, data);
    });
    done();
  }
};
