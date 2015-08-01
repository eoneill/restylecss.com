"use strict";

var shell = require("gulp-shell");
var config = require("../config");
var nodetree = require("nodetree");

module.exports = function(gulp, depends) {
  gulp.task("test", depends, function() {
    nodetree(config().dest);
  });
};
