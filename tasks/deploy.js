"use strict";

var ghPages = require("gulp-gh-pages");

module.exports = function(gulp, depends) {
  gulp.task("deploy", depends, function() {
    return gulp.src("./tmp/dist/**/*")
      .pipe(ghPages({
        cacheDir: "./tmp/.ghpages",
        force: true
      }));
  });
};
