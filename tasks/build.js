"use strict";

var shell = require("gulp-shell");

module.exports = function(gulp, depends) {
  var builder = shell.task("npm run-script build");
  gulp.task("build", depends, builder);
};
