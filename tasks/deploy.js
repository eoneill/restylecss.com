"use strict";

var ghPages = require("gulp-gh-pages");
var merge = require("lodash.merge");
var config = require("../config");
var fs = require("fs-extra");

module.exports = function(gulp, depends) {
  function createTask(name, options) {
    options = merge({
      cacheDir: "./tmp/.ghpages"
    }, options);

    gulp.task(name, depends, function() {
      if (options.clean && options.cacheDir) {
        fs.removeSync(options.cacheDir);
      }

      return gulp.src(config().dest + "/**/*")
        .pipe(ghPages(options));
    });
  }

  createTask("deploy", {
    push: true,
    clean: true
  });
  createTask("deploy:dry", {
    push: false
  });
};
