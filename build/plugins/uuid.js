"use strict";

var uuid = require("node-uuid");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    Object.keys(files).forEach(function(file) {
      files[file].uuid = uuid.v4();
    });

    done();
  };
};
