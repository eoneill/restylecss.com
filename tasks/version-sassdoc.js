"use strict";

var copy = require('gulp-copy');

var restylePath = "../node_modules/eyeglass-restyle/";
var restyleVersion = require(restylePath + "package.json").version;

module.exports = function(gulp, depends) {
  gulp.task("version-sassdoc", depends || [], function () {
    return gulp.src("./tmp/dist/api/**/*")
      .pipe(copy("./tmp/dist/api/v" + restyleVersion, {
        prefix: 3
      }));
  });
};
