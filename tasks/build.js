"use strict";

var shell = require("gulp-shell");

module.exports = function(gulp, depends) {
  var builder = shell.task("node ./build.js --env=production");
  gulp.task("build", depends, builder);
};
