"use strict";

var copy = require("gulp-copy");

var restylePath = "../node_modules/eyeglass-restyle/";
var restyleVersion = require(restylePath + "package.json").version;

module.exports = function(gulp, depends) {
  gulp.task("doc", depends || [], function () {
    return gulp.src("./src/api/**/*")
      .pipe(copy("./src/api/v" + restyleVersion, {
        prefix: 2
      }));
  });
};
