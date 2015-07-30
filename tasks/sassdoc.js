"use strict";

var sassdoc = require("sassdoc");

module.exports = function(gulp, depends) {
  gulp.task("sassdoc", depends || [], function () {
    return gulp.src("./node_modules/eyeglass-restyle/sass/**/*.s[ac]ss")
      .pipe(sassdoc({
      dest: "./dist/api"
    }));
  });
};
