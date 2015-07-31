"use strict";

var shell = require("gulp-shell");

module.exports = function(gulp, depends) {
  var serve = shell.task("npm run-script build");

  gulp.task("serve:dev", depends, shell.task("npm run-script start"));

  gulp.task("serve:staging", shell.task("npm run-script staging"));

  gulp.task("serve", ["serve:dev"]);
};
