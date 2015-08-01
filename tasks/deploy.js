"use strict";

var ghPages = require("gulp-gh-pages");
var merge = require("lodash.merge");
var config = require("../config");

module.exports = function(gulp, depends) {
  function createTask(name, options) {
    gulp.task(name, depends, function() {
      return gulp.src(config().dest + "/**/*")
        .pipe(ghPages(merge({
          cacheDir: "./tmp/.ghpages"
        }, options)));
    });
  }

  createTask("deploy");
  createTask("deploy:dry", {
    push: false
  });
};
