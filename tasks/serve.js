"use strict";

var shell = require("gulp-shell");

module.exports = function(gulp, depends) {
  gulp.task("serve:dev", depends, shell.task("node build.js --serve"));

  gulp.task("serve:staging", shell.task("node build.js --serve --env=staging"));

  gulp.task("serve", ["serve:dev"]);
};
